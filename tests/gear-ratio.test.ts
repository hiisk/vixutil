/**
 * 자전거 기어 — 셈을 다른 길로 되짚는다.
 *
 * 기어비는 앞니를 뒷니로 나눈 값이므로, 발전거리를 바퀴 둘레로 도로 나누면
 * 기어비가 나와야 한다. 속도는 발전거리에 케이던스를 곱한 것이라 케이던스를
 * 두 배로 하면 속도도 두 배여야 한다 — 곱셈 자리를 잘못 두면 여기서 갈린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CADENCES, CELLS, CHAINRINGS, COGS, WHEEL_MM, cellOf, slugOf,
} from '../lib/gear/list.ts';
import { developmentOf, gearFacts, ratioOf, speedOf } from '../lib/gear/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return gearFacts(c);
};

test('칸은 체인링 12가지 × 스프라켓 14가지', () => {
  assert.equal(CHAINRINGS.length, 12);
  assert.equal(COGS.length, 14);
  assert.equal(CELLS.length, 168);
  assert.equal(new Set(CELLS.map(slugOf)).size, 168);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));

  for (let i = 1; i < CHAINRINGS.length; i++) assert.ok(CHAINRINGS[i] > CHAINRINGS[i - 1]);
  for (let i = 1; i < COGS.length; i++) assert.ok(COGS[i] > COGS[i - 1]);

  assert.equal(cellOf('53'), undefined);
  assert.equal(cellOf('45-19'), undefined, '축에 없는 체인링이 열리면 안 된다');
  assert.equal(cellOf('53-18'), undefined, '축에 없는 스프라켓이 열리면 안 된다');
});

test('발전거리를 바퀴 둘레로 나누면 기어비다', () => {
  for (const c of CELLS) {
    const f = gearFacts(c);
    const back = (f.development * 1000) / WHEEL_MM;
    assert.ok(Math.abs(back - f.ratio) < 0.002, `${f.slug}: ${back} vs ${f.ratio}`);
  }
  // 손으로 셈한 값 — 50×25는 정확히 2:1이고, 한 바퀴에 4.21m 나간다
  assert.equal(facts('50-25').ratio, 2);
  assert.equal(facts('50-25').development, 4.21);
  // 앞뒤가 같으면 기어비 1이다
  assert.ok(Math.abs(ratioOf(36, 36) - 1) < 1e-12);
});

test('케이던스가 두 배면 속도도 두 배다', () => {
  for (const c of CELLS.slice(0, 40)) {
    const f = gearFacts(c);
    assert.equal(f.speeds.length, CADENCES.length);
    const at60 = f.speeds.find(s => s.cadence === 60)!.speed;
    const dev = developmentOf(c.front, c.rear);
    assert.ok(Math.abs(speedOf(dev, 120) - speedOf(dev, 60) * 2) < 1e-9, f.slug);
    // 케이던스가 오르면 속도도 오른다
    for (let i = 1; i < f.speeds.length; i++) assert.ok(f.speeds[i].speed > f.speeds[i - 1].speed, f.slug);
    assert.ok(at60 > 0);
  }
  // 50×25(4.21m)를 90rpm으로 돌리면 시속 22.7km쯤이다
  assert.equal(facts('50-25').speeds.find(s => s.cadence === 90)!.speed, 22.7);
});

test('뒷니가 작을수록 무겁고 앞니가 클수록 무겁다', () => {
  for (const c of CELLS) {
    const f = gearFacts(c);
    if (f.heavier) assert.ok(gearFacts(cellOf(f.heavier.slug)!).ratio > f.ratio, `${f.slug} heavier`);
    if (f.lighter) assert.ok(gearFacts(cellOf(f.lighter.slug)!).ratio < f.ratio, `${f.slug} lighter`);
    if (f.biggerRing) assert.ok(gearFacts(cellOf(f.biggerRing.slug)!).ratio > f.ratio, `${f.slug} biggerRing`);
    if (f.smallerRing) assert.ok(gearFacts(cellOf(f.smallerRing.slug)!).ratio < f.ratio, `${f.slug} smallerRing`);
  }
  // 끝 칸은 바깥을 가리키지 않는다
  assert.equal(facts('50-11').heavier, null);
  assert.equal(facts('50-36').lighter, null);
  assert.equal(facts('53-19').biggerRing, null);
  assert.equal(facts('34-19').smallerRing, null);
});

test('기어비가 같으면 앞뒤가 달라도 같은 기어다', () => {
  /*
   * 이 성질이 이 표의 요점이다. 53×19와 39×14는 앞뒤가 전혀 다른데 기어비가
   * 2.79와 2.79로 거의 같아 페달 한 바퀴에 나아가는 거리도 같다.
   */
  const a = facts('53-19');
  const b = facts('39-14');
  assert.ok(Math.abs(a.ratio - b.ratio) < 0.01, `${a.ratio} vs ${b.ratio}`);
  assert.ok(a.sameFeel.some(n => n.slug === '39-14'), '같은 느낌 목록에 39-14가 없다');

  for (const c of CELLS) {
    const f = gearFacts(c);
    // 자기 자신은 목록에 없다
    assert.ok(!f.sameFeel.some(n => n.slug === f.slug), `${f.slug}: 자기 자신이 들었다`);
    // 목록의 모든 칸은 정말로 1% 안이다
    for (const n of f.sameFeel) {
      const other = gearFacts(cellOf(n.slug)!);
      assert.ok(Math.abs(other.ratio / f.ratio - 1) < 0.011, `${f.slug} vs ${n.slug}`);
    }
  }
});

test('발전거리와 기어인치는 같은 것을 다른 자로 잰 값이다', () => {
  for (const c of CELLS) {
    const f = gearFacts(c);
    // 둘 다 기어비에 비례하므로 그 비가 모든 칸에서 같아야 한다
    assert.ok(Math.abs(f.gearInches / f.ratio - 26.3) < 0.06, f.slug);
  }
  // 기어비가 크면 둘 다 크다
  const heavy = facts('53-11');
  const light = facts('34-36');
  assert.ok(heavy.ratio > light.ratio * 4);
  assert.ok(heavy.development > light.development);
  assert.ok(heavy.gearInches > light.gearInches);
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => gearFacts({ front: 45, rear: 19 }), /모르는 체인링/);
  assert.throws(() => gearFacts({ front: 53, rear: 18 }), /모르는 스프라켓/);
});
test('언어끼리 글자가 섞이지 않는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { GEAR_UI } = await import('../lib/gear/ui.ts');
  const { hanProblem } = await import('./han.ts');
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  // 값이 0이 되는 칸, 큰 칸, 주유가 필요한 칸 — 문장 갈래를 모두 밟는다
  const shown = [
    gearFacts({ front: 50, rear: 25 }),
    gearFacts({ front: 34, rear: 36 }),
    gearFacts({ front: 53, rear: 11 }),
  ];
  for (const lang of LANG_CODES) {
    const ui = GEAR_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
        ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('열 언어 모두 문구가 채워져 있다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { DENSE } = await import('./han.ts');
  const { GEAR_UI } = await import('../lib/gear/ui.ts');
  const f = gearFacts({ front: 50, rear: 25 });
  for (const lang of LANG_CODES) {
    const ui = GEAR_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 질문이 다섯이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 4, `${lang}: 낱장 질문이 넷이 아니다`);
    // 나눗셈의 뜻과 "값을 안 내는 이유" — 전제 둘은 길게 밝혀야 한다
    assert.ok(ui.ratioNote.length >= floor * 6, `${lang}: 기어비 설명이 짧다`);
    assert.ok(ui.sameNote.length >= floor * 6, `${lang}: 같은 기어 설명이 짧다`);
    assert.ok(ui.chooseNote.length >= floor * 6, `${lang}: 고르는 법 설명이 짧다`);
  }
});

test('낱장 문장이 실제 숫자를 담는다', async () => {
  const { LANG_CODES } = await import('../lib/i18n/lang.ts');
  const { GEAR_UI } = await import('../lib/gear/ui.ts');
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = GEAR_UI[lang];
    for (const c of [{ front: 50, rear: 25 }, { front: 39, rear: 14 }]) {
      const f = gearFacts(c);
      assert.ok(ui.desc(f).includes(String(f.ratio)), `${lang}: desc에 기어비가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(c.front)), `${lang}: metaTitle에 앞니 수가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.ratio)), `${lang}: metaDesc에 기어비가 없다`);
    }
    // 칸이 다르면 문장도 달라야 한다
    assert.notEqual(ui.desc(gearFacts({ front: 50, rear: 25 })), ui.desc(gearFacts({ front: 39, rear: 14 })), lang);
  }
});

test('자전거 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  const { GEAR_ICON } = await import('../lib/gear/list.ts');
  assert.ok(ICON_FOR[GEAR_ICON], `${GEAR_ICON} 이모지가 아이콘으로 이어지지 않는다`);
});
