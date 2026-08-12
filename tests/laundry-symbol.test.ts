/**
 * 세탁 기호의 규칙 — 그림의 요소가 뜻을 정하는지 되짚는다(배선은 laundry-wiring).
 *
 * 이 섹션에서 틀리면 옷이 상하는 자리가 셋이다.
 *
 *   1) 점 개수 → 온도    한 단계 어긋나면 40°C 옷을 60°C에 넣는다
 *   2) 밑줄 개수 → 세기  뒤집히면 실크를 보통 코스로 돌린다
 *   3) ×표 → 금지        금지와 허용이 바뀌면 한 번 빨아서 끝난다
 *
 * 그래서 세 가지를 **양쪽에서** 본다. 자료가 규칙대로인지 보고, 규칙을 되짚어도
 * 같은 값에 닿는지 보고, 금지는 열 언어 문구까지 센다. 대조표는 이 파일에 손으로
 * 적어 둔다 — lib에서 가져와 비교하면 lib이 틀렸을 때 함께 틀린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { LANG_CODES } from '../lib/i18n/lang.ts';
import {
  BARS,
  CELLS,
  FAMILIES,
  LAUNDRY_SLUGS,
  WASH_TEMPS,
  IRON_TEMPS,
  atFamily,
  cellOf,
} from '../lib/laundry/list.ts';
import {
  NEAR,
  PRIM_KINDS,
  barsOfStrength,
  dotsOfIronTemp,
  dotsOfWashTemp,
  glyph,
  ironTempOfDots,
  laundryFacts,
  strengthOf,
  washTempOfDots,
} from '../lib/laundry/facts.ts';
import { LAUNDRY_UI } from '../lib/laundry/ui.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');

/** 점 개수 → 물세탁 온도. lib에서 가져오지 않고 여기 적는다 */
const WASH_BY_DOTS = new Map([[1, 30], [2, 40], [3, 50], [4, 60], [5, 70], [6, 95]]);

/** 점 개수 → 다림질 밑판 온도 */
const IRON_BY_DOTS = new Map([[1, 110], [2, 150], [3, 200]]);

/** 밑줄 개수 → 세기 */
const STRENGTH_BY_BARS = new Map([[0, 'normal'], [1, 'mild'], [2, 'very-mild']]);

const facts = CELLS.map(laundryFacts);
const forbidden = facts.filter(f => f.forbidden);
const allowed = facts.filter(f => !f.forbidden);

test('점 개수가 온도 줄의 자리다 — 되짚어도 같은 값이다', () => {
  for (const [dots, temp] of WASH_BY_DOTS) {
    assert.equal(washTempOfDots(dots), temp, `물세탁 점 ${dots}개는 ${temp}°C여야 한다`);
    assert.equal(dotsOfWashTemp(temp), dots, `물세탁 ${temp}°C는 점 ${dots}개여야 한다`);
  }
  for (const [dots, temp] of IRON_BY_DOTS) {
    assert.equal(ironTempOfDots(dots), temp, `다림질 점 ${dots}개는 ${temp}°C여야 한다`);
    assert.equal(dotsOfIronTemp(temp), dots, `다림질 ${temp}°C는 점 ${dots}개여야 한다`);
  }
  // 줄 자체도 본다 — 온도를 하나 끼워 넣으면 위의 자리 잡기가 통째로 밀린다
  assert.deepEqual(WASH_TEMPS, [...WASH_BY_DOTS.values()]);
  assert.deepEqual(IRON_TEMPS, [...IRON_BY_DOTS.values()]);
  assert.equal(washTempOfDots(0), undefined, '점이 없으면 온도가 없다');
  assert.equal(washTempOfDots(7), undefined, '줄 밖의 점 개수에는 온도가 없다');
});

test('칸마다 점 개수와 온도가 맞는다', () => {
  for (const f of facts) {
    if (f.kind === 'wash' && f.notation === 'dot') {
      assert.equal(f.temp, WASH_BY_DOTS.get(f.dots), `${f.slug}: 점 ${f.dots}개의 온도가 어긋난다`);
    }
    if (f.kind === 'iron' && f.dots > 0) {
      assert.equal(f.temp, IRON_BY_DOTS.get(f.dots), `${f.slug}: 다림질 점 ${f.dots}개의 온도가 어긋난다`);
    }
    if (f.notation === 'none' && f.kind !== 'tumble') {
      assert.equal(f.temp, undefined, `${f.slug}: 온도 표시가 없는데 온도가 붙었다`);
    }
  }
});

test('숫자 표기와 점 표기가 같은 온도에 닿는다', () => {
  /*
   * 같은 뜻을 두 그림으로 적으므로 두 칸이다(숫자는 ISO·GINETEX·JIS, 점은 ASTM).
   * 두 칸의 온도가 어긋나면 한쪽 표기가 틀린 것이다.
   */
  for (const t of WASH_TEMPS) {
    for (const s of ['normal', 'mild', 'very-mild']) {
      const num = laundryFacts(cellOf(`wash-${t}-${s}`)!);
      const dot = laundryFacts(cellOf(`wash-${t}-${s}-dots`)!);
      assert.equal(num.temp, t);
      assert.equal(dot.temp, t);
      assert.equal(num.notation, 'num');
      assert.equal(dot.notation, 'dot');
      assert.equal(dot.dots, dotsOfWashTemp(t));
      assert.equal(num.dots, 0, '숫자 표기에는 점이 없다');
      // 이름이 같으면 두 주소가 한 낱장처럼 보인다
      assert.notEqual(LAUNDRY_UI.ko.name(num), LAUNDRY_UI.ko.name(dot));
    }
  }
});

test('밑줄 개수가 세기다 — 되짚어도 같다', () => {
  for (const [bars, name] of STRENGTH_BY_BARS) {
    assert.equal(strengthOf(bars), name, `밑줄 ${bars}줄은 ${name}이어야 한다`);
    assert.equal(barsOfStrength(name as 'normal'), bars, `${name}은 밑줄 ${bars}줄이어야 한다`);
  }
  assert.deepEqual(BARS, [0, 1, 2], '밑줄은 셋까지가 아니라 둘까지다');
  for (const f of facts) {
    assert.equal(f.strength, STRENGTH_BY_BARS.get(f.bars), `${f.slug}: 밑줄 ${f.bars}줄의 세기가 어긋난다`);
  }
});

test('밑줄은 붙을 갈래에만 붙는다', () => {
  /* 표백·다림질·자연건조에는 밑줄이 없다 — 그림에 없는 것을 자료가 만들면 안 된다 */
  const bad = facts.filter(f => f.bars > 0 && !['wash', 'tumble', 'dryclean', 'wetclean'].includes(f.kind));
  assert.deepEqual(bad.map(f => f.slug), []);
});

/**
 * ×표가 얹히는 칸 — 손으로 적어 둔다.
 *
 * 아래 "열 언어" 검사는 **판정과 문구가 맞는지**만 본다. 판정 자체가 뒤집히면
 * 문구도 함께 뒤집혀 그 검사는 그대로 통과한다(실제로 facts.ts의 판정을 !로
 * 바꿔 보니 통과했다). 그래서 어느 칸이 금지인지는 여기 목록으로 못 박는다.
 */
const FORBIDDEN_SLUGS = [
  'wash-do-not',
  'wash-do-not-wring',
  'bleach-do-not',
  'dry-tumble-do-not',
  'iron-do-not',
  'dryclean-do-not',
  'dryclean-w-do-not',
];

test('금지 칸은 이 일곱이고 그림에 ×표가 있다', () => {
  assert.deepEqual([...forbidden.map(f => f.slug)].sort(), [...FORBIDDEN_SLUGS].sort(),
    '금지 판정이 바뀌었다 — 옷을 망치는 자리다');
  for (const c of CELLS) {
    const hasCross = glyph(c).some(p => p.kind === 'cross');
    const shouldBan = FORBIDDEN_SLUGS.includes(c.slug);
    assert.equal(hasCross, shouldBan, `${c.slug}: ×표와 판정이 어긋난다`);
    // 주소와 판정도 서로 맞아야 한다 — 이름만 do-not인 칸이 생기면 안 된다
    assert.equal(c.slug.includes('do-not'), shouldBan, `${c.slug}: 주소와 판정이 어긋난다`);
  }
});

test('금지 기호는 열 언어 모두 하지 말라고 말한다', () => {
  /*
   * 이 섹션에서 가장 세게 두는 검사다. 금지 칸의 이름과 뜻에는 그 언어의 금지
   * 표지가 **반드시** 들어가야 하고, 허용 칸에는 **한 번도** 들어가면 안 된다.
   * 한쪽만 보면 "모든 문장에 금지라고 적기"로도 통과하므로 양쪽을 다 센다.
   */
  assert.ok(forbidden.length >= 7, `금지 칸이 ${forbidden.length}개뿐이다`);
  for (const lang of LANG_CODES) {
    const ui = LAUNDRY_UI[lang];
    const ban = ui.ban.toLowerCase();
    assert.ok(ban.length >= 2, `${lang}: 금지 표지가 없다`);
    for (const f of forbidden) {
      const said = `${ui.name(f)} ${ui.meaning(f)}`.toLowerCase();
      assert.ok(said.includes(ban), `${lang}/${f.slug}: 금지인데 "${ui.ban}"이 없다 — 옷을 망치는 자리다`);
    }
    for (const f of allowed) {
      const said = `${ui.name(f)} ${ui.meaning(f)}`.toLowerCase();
      assert.ok(!said.includes(ban), `${lang}/${f.slug}: 허용인데 "${ui.ban}"이 섞였다 — 하지 말라는 말로 읽힌다`);
    }
  }
});

test('갈래마다 금지 칸이 하나씩 있다', () => {
  /* 라벨에서 가장 먼저 찾는 것이 "하면 안 되는 것"이다 — 갈래마다 있어야 한다 */
  for (const family of FAMILIES) {
    const has = forbidden.some(f => f.family === family);
    assert.ok(has, `${family}에 금지 칸이 없다`);
  }
});

test('갈래마다 칸이 있고 갈래 이름이 열 언어에 다 있다', () => {
  for (const family of FAMILIES) {
    assert.ok(atFamily(family).length > 0, `${family}에 칸이 없다 — 허브에 빈 제목이 남는다`);
    for (const lang of LANG_CODES) {
      const name = LAUNDRY_UI[lang].family[family];
      assert.ok(name && name.trim().length > 0, `${lang}: ${family} 갈래 이름이 없다`);
    }
  }
  // 갈래 이름이 한 언어 안에서 겹치면 허브의 두 묶음을 가릴 수 없다
  for (const lang of LANG_CODES) {
    const names = FAMILIES.map(f => LAUNDRY_UI[lang].family[f]);
    assert.equal(new Set(names).size, FAMILIES.length, `${lang}: 갈래 이름이 겹친다`);
  }
});

test('그림 조각이 점 개수·밑줄 개수만큼 나온다', () => {
  /*
   * 조합이 곧 그림이므로, 자료가 점 세 개라고 말하면 조각도 셋이어야 한다.
   * 여기서 세는 것은 그림 그 자체다 — 컴포넌트는 이 조각을 태그로만 옮긴다.
   */
  for (const c of CELLS) {
    const prims = glyph(c);
    const count = (kind: string) => prims.filter(p => p.kind === kind).length;
    assert.equal(count('dot'), c.dots, `${c.slug}: 점을 ${c.dots}개 그려야 하는데 ${count('dot')}개다`);
    assert.equal(count('bar'), c.bars, `${c.slug}: 밑줄을 ${c.bars}개 그려야 하는데 ${count('bar')}개다`);
    assert.equal(count('cross'), c.forbidden ? 1 : 0, `${c.slug}: ×표가 어긋난다`);
    assert.equal(count('text'), c.text ? 1 : 0, `${c.slug}: 도형 안 글자가 어긋난다`);
    // 바탕 도형 — 짜기만 없다(비틀린 천 하나에 ×표가 얹힌 그림이다)
    const base = count('path') + count('circle');
    if (c.mark === 'wring') assert.equal(count('path'), 2, `${c.slug}: 비틀린 천은 곡선 둘이다`);
    else assert.ok(base >= 1, `${c.slug}: 바탕 도형이 없다`);
    // 점은 겹치면 안 된다 — 좌표가 같으면 개수만 맞고 눈에는 하나로 보인다
    const xs = prims.flatMap(p => (p.kind === 'dot' ? [p.cx] : []));
    assert.equal(new Set(xs).size, xs.length, `${c.slug}: 점이 같은 자리에 겹쳤다`);
  }
});

test('그림 컴포넌트가 조각 종류를 하나도 빠뜨리지 않는다', () => {
  /*
   * facts가 내는 조각을 컴포넌트가 안 그리면 화면에서 조용히 사라진다 — 점을
   * 안 그리면 모든 온도가 같은 그림이 된다. JSX는 node --test가 못 읽으므로
   * 소스에서 그 갈래를 다루는지 글자로 확인한다.
   */
  const src = readFileSync(join(ROOT, 'components', 'laundry', 'LaundrySymbol.tsx'), 'utf8');
  for (const kind of PRIM_KINDS) {
    assert.ok(src.includes(`case '${kind}'`), `LaundrySymbol이 ${kind} 조각을 안 그린다`);
  }
  // 실제로 쓰이는 종류가 목록 밖으로 새지 않는지도 본다
  const used = new Set(CELLS.flatMap(c => glyph(c).map(p => p.kind)));
  for (const kind of used) assert.ok(PRIM_KINDS.includes(kind), `조각 종류 목록에 ${kind}이 없다`);
});

test('칸이 여든여섯이고 slug가 겹치지 않는다', () => {
  /*
   * 86은 규칙이 만드는 조합의 끝이다. 더 늘리려면 어느 규격도 정하지 않은 그림을
   * 지어내야 하므로 여기서 멈춘다 — 셈은 lib/laundry/list.ts 머리말에 적어 두었다.
   * 이 수가 줄면 축 하나가 빠진 것이고, 늘면 없는 기호가 들어온 것이다.
   */
  assert.equal(CELLS.length, 86);
  assert.equal(LAUNDRY_SLUGS.length, 86);
  assert.deepEqual(
    FAMILIES.map(f => atFamily(f).length),
    [42, 3, 21, 9, 11],
    '갈래별 칸 수가 달라졌다 — 축을 고쳤으면 셈도 고치라',
  );
  const dup = LAUNDRY_SLUGS.filter((s, i) => LAUNDRY_SLUGS.indexOf(s) !== i);
  assert.deepEqual([...new Set(dup)], [], '같은 주소가 둘이면 뒤엣것이 화면에서 사라진다');
  const bad = LAUNDRY_SLUGS.filter(s => !/^[a-z0-9][a-z0-9-]*[a-z0-9]$/.test(s));
  assert.deepEqual(bad, [], '소문자·숫자·붙임표만 쓴다');
  // 주소 앞머리가 갈래를 가른다 — 한 주소 공간에 다섯 갈래를 두는 방식이다
  const PREFIX: Record<string, string> = { wash: 'wash-', bleach: 'bleach-', dry: 'dry-', iron: 'iron-', dryclean: 'dryclean-' };
  const stray = CELLS.filter(c => !c.slug.startsWith(PREFIX[c.family]));
  assert.deepEqual(stray.map(c => c.slug), [], '갈래와 주소 앞머리가 어긋난다');
});

test('이웃 링크가 모든 칸에 들어온다', () => {
  const inbound = new Map(LAUNDRY_SLUGS.map(s => [s, 0]));
  for (const f of facts) {
    assert.equal(f.neighbours.length, NEAR, `${f.slug}: 이웃이 ${f.neighbours.length}개다`);
    assert.ok(!f.neighbours.some(n => n.slug === f.slug), `${f.slug}: 자기를 가리킨다`);
    assert.equal(new Set(f.neighbours.map(n => n.slug)).size, NEAR, `${f.slug}: 같은 이웃이 두 번 있다`);
    for (const n of f.neighbours) inbound.set(n.slug, (inbound.get(n.slug) ?? 0) + 1);
  }
  const orphans = [...inbound].filter(([, n]) => n === 0).map(([s]) => s);
  assert.deepEqual(orphans, [], '들어오는 링크가 0인 낱장이다 — 사이트맵에만 있고 아무도 안 가리킨다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const sample = laundryFacts(cellOf('wash-40-mild')!);
  for (const lang of LANG_CODES) {
    const ui = LAUNDRY_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(sample).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 규칙 넷과 규격 갈림은 길게 밝혀야 한다
    for (const key of ['shapeNote', 'dotsNote', 'barsNote', 'crossNote', 'standardNote'] as const) {
      assert.ok(ui[key].length >= floor * 6, `${lang}.${key}: 설명이 짧다`);
    }
  }
});

test('규격에 따라 갈리는 대목을 열 언어로 밝힌다', () => {
  /*
   * 이 섹션의 값은 "규격마다 다르다"를 적는 데 있다. 온도를 숫자로 적는 규격과
   * 점으로 적는 규격이 다르고, 일본은 2016년에 표기를 바꿨다 — 그 사실이 열 언어
   * 어디에서도 빠지지 않게 이름을 직접 센다.
   */
  for (const lang of LANG_CODES) {
    const ui = LAUNDRY_UI[lang];
    for (const token of ['ISO', 'ASTM', '2016']) {
      assert.ok(ui.standardNote.includes(token), `${lang}: 규격 설명에 ${token}이 없다`);
    }
    assert.ok(ui.standardNote.includes('3758'), `${lang}: ISO 3758 번호가 없다`);
    // 낱장 질문에서도 갈림을 짚어 준다 — 허브를 안 보고 들어온 사람이 대부분이다
    const faq = ui.cellFaq(laundryFacts(cellOf('wash-40-normal')!));
    assert.ok(faq.some(q => q.a.includes('ISO') && q.a.includes('2016')), `${lang}: 낱장 질문에 규격 갈림이 없다`);
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = LAUNDRY_UI[lang];
  const shown = ['wash-40-mild-dots', 'dry-drip-flat-shade', 'iron-200-no-steam', 'dryclean-w-mild', 'bleach-do-not']
    .map(s => laundryFacts(cellOf(s)!));
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...Object.values(ui.family),
    ...ui.how,
    ...ui.hubFaq.flatMap(q => [q.q, q.a]),
    ...shown.flatMap(f => [ui.name(f), ui.meaning(f), ui.metaTitle(f), ui.metaDesc(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
  ];
};

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('낱장 문장이 그림의 요소를 실제로 담는다', () => {
  /* 자리표만 채우고 값을 안 넣으면 여든여섯 칸이 다 같은 문장이 된다 */
  for (const lang of LANG_CODES) {
    const ui = LAUNDRY_UI[lang];
    for (const f of facts) {
      if (f.temp !== undefined) {
        assert.ok(ui.meaning(f).includes(String(f.temp)), `${lang}/${f.slug}: 뜻에 온도가 없다`);
      }
      if (f.dots > 0 && !f.forbidden) {
        assert.ok(ui.meaning(f).includes(String(f.dots)), `${lang}/${f.slug}: 뜻에 점 개수가 없다`);
      }
      const faq = ui.cellFaq(f);
      assert.ok(faq[1].a.includes(String(f.dots)) && faq[1].a.includes(String(f.bars)),
        `${lang}/${f.slug}: 질문에 점·밑줄 개수가 없다`);
    }
    assert.notEqual(ui.meaning(facts[0]), ui.meaning(facts[1]), lang);
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은 번역을 옮겨 적다 원문이 남는 실수를 잡기 위해서다 —
   * 간체와 번체는 낱말이 겹치기 쉬워 특히 이 검사가 필요하다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = LAUNDRY_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const f of facts) titles.push(ui.metaTitle(f));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});
