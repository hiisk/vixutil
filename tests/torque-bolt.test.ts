/**
 * 조임 토크 — 계산한 값을 다른 길로 되짚는다.
 *
 * 토크는 축력에서 나오므로 토크에서 축력을 되돌려 본다. 등급 값은 표를
 * 옮기지 않고 등급 숫자에서 읽어 내므로, 널리 쓰이는 토크표를 검사에만 두고
 * 그 옆에 세운다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, DIAMETERS, FRICTIONS, GRADES, KNOWN, PRELOAD, cellOf, gradeOf, sizeLabel, slugOf,
} from '../lib/torque/list.ts';
import {
  preloadOf, screwOfDiameter, tensileOf, torqueFacts, torqueOf, yieldOf,
} from '../lib/torque/facts.ts';
import { stressAreaOf } from '../lib/screw/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return torqueFacts(c);
};

test('칸은 볼트 19가지 × 등급 8가지', () => {
  assert.equal(DIAMETERS.length, 19);
  assert.equal(GRADES.length, 8);
  assert.equal(CELLS.length, 152);
  assert.equal(new Set(CELLS.map(slugOf)).size, 152);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  assert.equal(slugOf({ d: 3.5, grade: '88' }), 'm3-5-88');
  assert.equal(cellOf('m8'), undefined);
  assert.equal(cellOf('m9-88'), undefined);
});

test('등급 숫자가 그대로 강도다', () => {
  // 8.8은 인장 800MPa, 항복은 그 8할인 640MPa
  const g88 = gradeOf('88')!;
  assert.equal(tensileOf(g88), 800);
  assert.equal(yieldOf(g88), 640);
  assert.equal(tensileOf(gradeOf('129')!), 1200);
  assert.equal(yieldOf(gradeOf('129')!), 1080);
  assert.equal(yieldOf(gradeOf('46')!), 240);
  for (const g of GRADES.filter(x => !x.stainless)) {
    const [a, b] = g.label.split('.').map(Number);
    assert.equal(tensileOf(g), a * 100, g.label);
    assert.ok(Math.abs(yieldOf(g) - a * 100 * (b / 10)) < 1e-9, g.label);
    // 항복은 인장보다 낮다
    assert.ok(yieldOf(g) < tensileOf(g), g.label);
  }
  // 스테인리스는 이 규칙에서 벗어나므로 값을 적어 둔다
  assert.equal(tensileOf(gradeOf('a270')!), 700);
  assert.equal(yieldOf(gradeOf('a270')!), 450);
  assert.ok(gradeOf('a270')!.stainless);
});

test('단면적은 나사 쪽과 같은 값을 쓴다', () => {
  for (const d of DIAMETERS) {
    const screw = screwOfDiameter(d);
    assert.equal(screw.d, d);
    assert.ok(screw.coarse, `M${d}이 굵은 나사가 아니다`);
    const f = torqueFacts({ d, grade: '88' });
    // 나사 섹션이 계산한 유효 단면적을 그대로 쓴다 — 두 번 적지 않는다
    assert.equal(f.area, stressAreaOf(screw), `M${d}`);
    assert.equal(f.pitch, screw.p, `M${d}`);
  }
  assert.equal(facts('m8-88').area, 36.61);
  assert.equal(facts('m8-88').pitch, 1.25);
});

test('토크에서 축력을 되돌릴 수 있다', () => {
  for (const c of CELLS) {
    const f = torqueFacts(c);
    for (const t of f.turns) {
      // T = K·d·F를 뒤집으면 F가 나온다
      const force = (t.nm * 1000) / (t.k * c.d);
      // 보여 주려고 끊은 자리만큼은 어긋난다
      const slack = ((t.nm < 10 ? 0.005 : 0.05) * 1000) / (t.k * c.d);
      assert.ok(Math.abs(force - f.preload) <= slack + 1, `${f.slug} ${t.key}: ${force} vs ${f.preload}`);
    }
    // 축력은 항복의 일곱 할이다
    assert.ok(Math.abs(f.preload - PRELOAD * f.yieldStrength * f.area) < 1, f.slug);
    // 끊어지는 힘은 그보다 크다
    assert.ok(f.breaking > f.preload, f.slug);
  }
  assert.equal(facts('m8-88').preload, 16401);
  assert.equal(PRELOAD, 0.7);
});

test('널리 쓰이는 토크표 옆에 세워 본다', () => {
  // 8.8 등급 건조 상태의 흔한 표 — 여기서만 쓰고 계산에는 넣지 않는다
  const TABLE: [number, number][] = [
    [5, 6], [6, 10], [8, 25], [10, 49], [12, 86], [16, 210], [20, 410], [24, 710],
  ];
  for (const [d, nm] of TABLE) {
    const mine = torqueFacts({ d, grade: '88' }).turns.find(t => t.key === 'dry')!.nm;
    const off = Math.abs(mine - nm) / nm;
    assert.ok(off < 0.15, `M${d}: 계산 ${mine}N·m vs 표 ${nm}N·m (${(off * 100).toFixed(0)}%)`);
  }
});

test('기름 한 방울에 토크가 달라진다', () => {
  const f = facts('m8-88');
  const dry = f.turns.find(t => t.key === 'dry')!;
  const oiled = f.turns.find(t => t.key === 'oiled')!;
  // 마찰이 0.2에서 0.15로 내려가면 토크도 그 비율로 내려간다 — 축력은 같다
  assert.ok(Math.abs(oiled.nm / dry.nm - 0.15 / 0.2) < 0.01, `${oiled.nm} / ${dry.nm}`);
  assert.equal(dry.nm, 26.2);
  assert.equal(oiled.nm < dry.nm, true);
  // 마찰 표는 미끄러운 쪽으로 내려가는 순서다
  assert.deepEqual([...FRICTIONS].sort((a, b) => b.k - a.k), FRICTIONS);
  for (const c of CELLS) {
    const g = torqueFacts(c);
    for (const t of g.turns) {
      // preload는 보여 주려고 정수로 끊은 값이라, 되짚을 때는 끊기 전 축력을 쓴다
      const exact = torqueOf(t.k, c.d, preloadOf(g.area, g.yieldStrength));
      assert.ok(Math.abs(t.nm - exact) <= (exact < 10 ? 0.005 : 0.05) + 1e-9, `${g.slug} ${t.key}: ${t.nm} vs ${exact}`);
    }
  }
});

test('단위를 바꿔도 같은 값이다', () => {
  for (const c of CELLS) {
    const f = torqueFacts(c);
    const dry = f.turns.find(t => t.key === 'dry')!.nm;
    // 1kgf는 9.80665N이므로 나눠 되돌리면 원래 값이다
    assert.ok(Math.abs(f.kgfm * 9.80665 - dry) < Math.max(dry * 0.01, 0.06), `${f.slug}: ${f.kgfm}`);
    assert.ok(Math.abs(f.lbft / 0.73756 - dry) < Math.max(dry * 0.01, 0.1), `${f.slug}: ${f.lbft}`);
  }
  assert.equal(facts('m8-88').kgfm, 2.68);
  assert.equal(facts('m8-88').lbft, 19.4);
});

test('굵을수록, 등급이 높을수록 세게 조인다', () => {
  for (const c of CELLS) {
    const f = torqueFacts(c);
    const dry = (x: { d: number; grade: string }) => torqueFacts(x).turns.find(t => t.key === 'dry')!.nm;
    if (f.bigger) assert.ok(dry(cellOf(f.bigger.slug)!) > dry(c), f.slug);
    if (f.stronger) {
      const next = cellOf(f.stronger.slug)!;
      // 스테인리스는 강도 순서가 강철 등급과 이어지지 않는다
      if (!gradeOf(next.grade)!.stainless && !f.grade.stainless) assert.ok(dry(next) > dry(c), f.slug);
    }
  }
  assert.equal(facts('m3-46').weaker, null);
  assert.equal(facts('m3-46').smaller, null);
  assert.equal(facts('m36-a480').stronger, null);
  assert.equal(facts('m36-a480').bigger, null);
  assert.equal(facts('m8-88').stronger?.label, 'M8 10.9');
  assert.equal(facts('m8-88').bigger?.label, 'M10 8.8');
});

test('이름 붙인 굵기는 목록에 있다', () => {
  for (const d of Object.keys(KNOWN).map(Number)) assert.ok(DIAMETERS.includes(d), `M${d}이 목록에 없다`);
  assert.equal(sizeLabel(8), 'M8');
  assert.equal(sizeLabel(3.5), 'M3.5');
});

test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { TORQUE_UI } = await import('../lib/torque/ui.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  const shown = [torqueFacts({ d: 8, grade: '88' }), torqueFacts({ d: 3, grade: 'a270' }), torqueFacts({ d: 36, grade: '129' })];
  for (const lang of LANG_CODES) {
    const ui = TORQUE_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
      ...FRICTIONS.map(x => ui.frictionName(x.key)),
      ...Object.values(KNOWN).map(k => ui.knownName(k)),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
    }
  }
});

test('이름 붙은 열쇠가 열 언어에 다 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { TORQUE_UI } = await import('../lib/torque/ui.ts');
  for (const lang of LANG_CODES) {
    const ui = TORQUE_UI[lang];
    const groups: [string, string[], (k: string) => string][] = [
      ['마찰', FRICTIONS.map(f => f.key), ui.frictionName],
      ['쓰임', [...new Set(Object.values(KNOWN))], ui.knownName],
    ];
    for (const [name, keys, fn] of groups) {
      const named = keys.map(k => fn(k));
      assert.equal(new Set(named).size, keys.length, `${lang}: ${name} 이름이 겹친다`);
      for (let i = 0; i < keys.length; i++) assert.notEqual(named[i], keys[i], `${lang}: ${name} ${keys[i]} 번역이 없다`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { TORQUE_UI } = await import('../lib/torque/ui.ts');
  const f = torqueFacts({ d: 8, grade: '88' });
  for (const lang of LANG_CODES) {
    const ui = TORQUE_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 토크가 수단이라는 것과 마찰이 대부분이라는 것 — 이 표의 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.whyNote.length >= floor * 6, `${lang}: 축력 설명이 짧다`);
    assert.ok(ui.frictionNote.length >= floor * 6, `${lang}: 마찰 설명이 짧다`);
  }
});

test('렌치 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { TORQUE_ICON } = await import('../lib/torque/list.ts');
  assert.equal(ICON_FOR[TORQUE_ICON], 'tools', '이모지가 아이콘으로 이어지지 않는다');
});
