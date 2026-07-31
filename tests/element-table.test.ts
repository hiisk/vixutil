/**
 * 주기율표가 스스로 어긋나지 않는지 본다.
 *
 * 이 자료의 위험은 한 줄 밀림이다. 원자량을 베껴 적다 한 줄이 밀리면 번호와
 * 기호는 멀쩡한데 무게만 옆 원소의 것이 된다 — 눈으로는 잡히지 않는다.
 * 그래서 무게가 번호를 따라 커지는지 보고, 어긋나는 자리는 알려진 몇 곳뿐인지
 * 확인한다.
 *
 * 자리(주기·족·블록·갈래)는 적어 두지 않고 번호에서 계산하므로, 계산이
 * 잘 알려진 값과 맞는지도 함께 못으로 박는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { ELEMENTS, ELEMENT_ICON, ELEMENT_SLUGS, PERIOD_ENDS, elementOf } from '../lib/element/list.ts';
import {
  CATEGORIES, blockOf, categoryOf, configOf, elementFacts, elementsOfCategory,
  groupOf, neighbours, periodOf, sameGroup, valenceOf,
} from '../lib/element/facts.ts';
import { NAMES, nameOf } from '../lib/element/names.ts';
import { ELEMENT_UI } from '../lib/element/ui.ts';
import { LANG8_CODES } from '../lib/i18n/lang.ts';

test('100가지가 넘는다', () => {
  assert.ok(ELEMENTS.length >= 100, `${ELEMENTS.length}가지뿐이다`);
  assert.equal(ELEMENTS.length, 118, '확인된 원소는 118개다');
});

test('번호가 1부터 118까지 빠짐없이 이어진다', () => {
  ELEMENTS.forEach((x, i) => assert.equal(x.z, i + 1, `${i + 1}번 자리에 ${x.z}번이 있다`));
  assert.equal(new Set(ELEMENT_SLUGS).size, ELEMENTS.length, 'slug 중복');
});

test('기호가 겹치지 않고 꼴이 맞는다', () => {
  const syms = ELEMENTS.map(x => x.symbol);
  assert.equal(new Set(syms).size, syms.length, '기호 중복');
  for (const x of ELEMENTS) {
    assert.match(x.symbol, /^[A-Z][a-z]?$/, `${x.z}: 기호 꼴이 아니다 — ${x.symbol}`);
  }
  // 잘 알려진 몇 개를 못으로 박는다 — 한 줄 밀리면 여기서 걸린다
  assert.equal(elementOf('1')!.symbol, 'H');
  assert.equal(elementOf('6')!.symbol, 'C');
  assert.equal(elementOf('26')!.symbol, 'Fe');
  assert.equal(elementOf('79')!.symbol, 'Au');
  assert.equal(elementOf('92')!.symbol, 'U');
  assert.equal(elementOf('118')!.symbol, 'Og');
});

test('원자량이 번호를 따라 커진다', () => {
  // 어긋나는 자리는 알려진 것뿐이어야 한다. 앞의 셋은 표준 원자량의 유명한 역전이고,
  // 뒤의 넷은 표준 원자량과 "가장 오래 사는 동위원소의 질량수"가 섞여 생기는 자리다.
  const known = new Set(['Ar→K', 'Co→Ni', 'Te→I', 'Th→Pa', 'U→Np', 'Pu→Am', 'Bh→Hs']);
  const drops: string[] = [];
  for (let i = 1; i < ELEMENTS.length; i++) {
    if (ELEMENTS[i].mass < ELEMENTS[i - 1].mass) drops.push(`${ELEMENTS[i - 1].symbol}→${ELEMENTS[i].symbol}`);
  }
  for (const d of drops) assert.ok(known.has(d), `알려지지 않은 질량 역전: ${d}`);
  assert.equal(drops.length, known.size, `역전이 ${drops.length}곳 — 알려진 곳은 ${known.size}곳이다`);
});

test('원자량이 번호의 두 배 언저리다', () => {
  // 양성자만큼 중성자가 있으므로 대략 2Z다. 수소만 중성자가 없어 예외다
  for (const x of ELEMENTS) {
    if (x.z === 1) continue;
    assert.ok(x.mass > x.z * 1.9, `${x.symbol}: 원자량이 너무 작다 (${x.mass})`);
    assert.ok(x.mass < x.z * 2.65, `${x.symbol}: 원자량이 너무 크다 (${x.mass})`);
  }
});

test('주기가 정해진 자리에서 바뀐다', () => {
  for (const x of ELEMENTS) {
    const p = periodOf(x.z);
    assert.ok(p >= 1 && p <= 7, `${x.symbol}: 주기 범위 밖 (${p})`);
    assert.ok(x.z <= PERIOD_ENDS[p - 1], `${x.symbol}: 주기 끝을 넘었다`);
    if (p > 1) assert.ok(x.z > PERIOD_ENDS[p - 2], `${x.symbol}: 앞 주기에 걸쳐 있다`);
  }
  assert.equal(periodOf(2), 1);
  assert.equal(periodOf(3), 2);
  assert.equal(periodOf(11), 3);
  assert.equal(periodOf(87), 7);
});

test('족이 잘 알려진 값과 맞는다', () => {
  const pairs: [number, number][] = [
    [1, 1], [2, 18], [3, 1], [6, 14], [8, 16], [10, 18], [11, 1], [17, 17],
    [20, 2], [26, 8], [29, 11], [35, 17], [47, 11], [54, 18], [56, 2],
    [72, 4], [79, 11], [80, 12], [82, 14], [86, 18], [118, 18],
  ];
  for (const [z, group] of pairs) assert.equal(groupOf(z), group, `${z}번의 족이 다르다`);
  // 란타넘·악티늄족은 표 아래로 빠지므로 0이다
  for (const z of [57, 60, 70, 89, 92, 102]) assert.equal(groupOf(z), 0, `${z}번은 표 아래여야 한다`);
  // 루테튬과 로렌슘은 3족으로 돌아온다
  assert.equal(groupOf(71), 3);
  assert.equal(groupOf(103), 3);
});

test('갈래가 빈 곳 없이 덮고, 개수가 알려진 값과 맞는다', () => {
  assert.equal(CATEGORIES.reduce((n, c) => n + elementsOfCategory(c).length, 0), ELEMENTS.length, '갈래 밖 원소가 있다');
  assert.equal(elementsOfCategory('noble').length, 7, '비활성 기체는 일곱이다');
  assert.equal(elementsOfCategory('halogen').length, 6, '할로젠은 여섯이다');
  assert.equal(elementsOfCategory('alkali').length, 6, '알칼리 금속은 여섯이다 — 수소는 빠진다');
  assert.equal(elementsOfCategory('alkaline').length, 6, '알칼리 토금속은 여섯이다');
  assert.equal(elementsOfCategory('lanthanide').length, 14, '란타넘족은 열넷이다');
  assert.equal(elementsOfCategory('actinide').length, 14, '악티늄족은 열넷이다');
  assert.equal(categoryOf(1), 'nonmetal', '수소는 알칼리 금속이 아니다');
  assert.equal(categoryOf(2), 'noble');
  assert.equal(categoryOf(14), 'metalloid');
  assert.equal(categoryOf(26), 'transition');
});

test('블록이 족과 어긋나지 않는다', () => {
  for (const x of ELEMENTS) {
    const b = blockOf(x.z);
    const g = groupOf(x.z);
    if (g === 0) assert.equal(b, 'f', `${x.symbol}: 표 아래인데 f블록이 아니다`);
    else if (g <= 2) assert.equal(b, 's', `${x.symbol}: ${g}족인데 s블록이 아니다`);
    else if (g >= 13) assert.ok(b === 'p' || x.z === 2, `${x.symbol}: ${g}족인데 p블록이 아니다`);
    else assert.equal(b, 'd', `${x.symbol}: ${g}족인데 d블록이 아니다`);
  }
  assert.equal(blockOf(2), 's', '헬륨은 18족이지만 s블록이다');
});

test('전자 배치의 전자 수가 원자번호와 같다', () => {
  for (const x of ELEMENTS) {
    const total = configOf(x.z).split(' ').reduce((n, part) => n + Number(part.replace(/^\d[spdf]/, '')), 0);
    assert.equal(total, x.z, `${x.symbol}: 전자 수가 번호와 다르다`);
  }
  assert.equal(configOf(1), '1s1');
  assert.equal(configOf(6), '1s2 2s2 2p2');
  assert.equal(configOf(10), '1s2 2s2 2p6');
  assert.equal(elementFacts(elementOf('26')!).shortConfig, '[Ar] 4s2 3d6');
});

test('최외각 전자 수가 족과 맞는다', () => {
  for (const x of ELEMENTS) {
    const v = valenceOf(x.z);
    const g = groupOf(x.z);
    if (g === 0 || (g >= 3 && g <= 12)) {
      assert.equal(v, null, `${x.symbol}: 전이·f블록인데 최외각 수가 있다`);
    } else {
      assert.equal(v, x.z === 2 ? 2 : g <= 2 ? g : g - 10, `${x.symbol}: 최외각 수가 족과 어긋난다`);
    }
  }
  assert.equal(valenceOf(8), 6, '산소는 여섯이다');
  assert.equal(valenceOf(17), 7, '염소는 일곱이다');
  assert.equal(valenceOf(2), 2, '헬륨은 둘뿐이다');
});

test('표에서 자리가 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const x of ELEMENTS) {
    const { cell } = elementFacts(x);
    const key = `${cell.row}:${cell.col}`;
    const before = seen.get(key);
    assert.equal(before, undefined, `${x.symbol}와 ${before}가 같은 칸에 있다`);
    assert.ok(cell.col >= 1 && cell.col <= 18, `${x.symbol}: 열이 범위 밖 (${cell.col})`);
    assert.ok(cell.row >= 1 && cell.row <= 10, `${x.symbol}: 행이 범위 밖 (${cell.row})`);
    seen.set(key, x.symbol);
  }
});

test('같은 족과 이웃이 자기 자신을 뺀다', () => {
  for (const x of ELEMENTS) {
    const g = sameGroup(x.z);
    assert.ok(!g.some(o => o.z === x.z), `${x.symbol}: 같은 족에 자기 자신이 있다`);
    for (const o of g) assert.equal(groupOf(o.z), groupOf(x.z), `${x.symbol}: 다른 족이 섞였다`);
    const n = neighbours(x.z);
    assert.ok(!n.some(o => o.z === x.z), `${x.symbol}: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${x.symbol}: 이웃이 없다`);
  }
  // 산소의 같은 족에는 황이 있어야 한다
  assert.ok(sameGroup(8).some(o => o.symbol === 'S'));
});

test('118개 모두 여덟 언어 이름이 있다', () => {
  for (const x of ELEMENTS) {
    const row = NAMES[x.z];
    assert.ok(row, `${x.z}: 이름이 없다`);
    assert.equal(row.length, 8, `${x.z}: 여덟 칸이 아니다`);
    for (const lang of LANG8_CODES) assert.ok(nameOf(x.z, lang).trim().length > 0, `${x.z}/${lang}: 이름이 비었다`);
  }
  const extra = Object.keys(NAMES).filter(k => !ELEMENT_SLUGS.includes(k));
  assert.deepEqual(extra, [], `데이터에 없는 원소의 이름: ${extra.join(', ')}`);
});

test('한 언어 안에서 이름이 겹치지 않는다', () => {
  // 베껴 적다 한 줄 밀리면 같은 이름이 두 번 나온다
  for (const lang of LANG8_CODES) {
    const names = ELEMENTS.map(x => nameOf(x.z, lang));
    const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    assert.deepEqual(dup, [], `${lang}: 이름이 겹친다 — ${dup.join(', ')}`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  for (const x of ELEMENTS) {
    for (const lang of LANG8_CODES) {
      const n = nameOf(x.z, lang);
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(n), `${x.z}/${lang}: 한글이 섞였다 — ${n}`);
      if (lang !== 'ja' && lang !== 'ko') assert.ok(!/[ぁ-んァ-ヶ一-龯]/.test(n), `${x.z}/${lang}: 가나·한자가 섞였다 — ${n}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(n), `${x.z}/${lang}: 데바나가리가 섞였다 — ${n}`);
    }
  }
});

test('여덟 언어 문구가 모두 채워져 있다', () => {
  const f = elementFacts(elementOf('26')!);
  for (const lang of LANG8_CODES) {
    const ui = ELEMENT_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.elementFaq(f, 'x', 'y').length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const c of CATEGORIES) {
      assert.ok(ui.categoryLabel[c], `${lang}: ${c} 이름이 없다`);
      assert.ok(ui.categoryNote[c]?.length >= 10, `${lang}: ${c} 설명이 없다`);
    }
    for (const b of ['s', 'p', 'd', 'f'] as const) assert.ok(ui.blockLabel[b], `${lang}: ${b}블록 이름이 없다`);
  }
});

test('언어마다 소수점 기호가 제자리에 있다', () => {
  // 55.845와 55,845는 다른 수로 읽힌다
  for (const lang of ['de', 'fr', 'es', 'pt'] as const) {
    assert.equal(ELEMENT_UI[lang].fmt(55.845), '55,845', `${lang}: 소수점이 쉼표가 아니다`);
  }
  for (const lang of ['en', 'ko', 'ja', 'hi'] as const) {
    assert.equal(ELEMENT_UI[lang].fmt(55.845), '55.845', `${lang}: 소수점이 점이 아니다`);
  }
});

test('설명이 모든 원소에서 만들어진다', () => {
  for (const x of ELEMENTS) {
    const f = elementFacts(x);
    for (const lang of LANG8_CODES) {
      const d = ELEMENT_UI[lang].desc(f, nameOf(x.z, lang));
      const floor = lang === 'ja' || lang === 'ko' ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${x.z}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(x.symbol), `${lang}/${x.z}: 설명에 기호가 없다`);
    }
  }
});

test('모든 원소가 여덟 언어 메타를 만든다', () => {
  for (const x of ELEMENTS) {
    const f = elementFacts(x);
    for (const lang of LANG8_CODES) {
      const ui = ELEMENT_UI[lang];
      const name = nameOf(x.z, lang);
      assert.ok(ui.metaTitle(name, x.symbol, x.z).includes(name), `${lang}/${x.z}: 제목에 이름이 없다`);
      const desc = ui.metaDesc(f, name, ui.categoryLabel[f.category]);
      assert.ok(desc.includes(x.symbol), `${lang}/${x.z}: 설명에 기호가 없다`);
      const floor = lang === 'ja' || lang === 'ko' ? 25 : 40;
      assert.ok(desc.length > floor, `${lang}/${x.z}: 설명이 너무 짧다`);
    }
  }
});

test('여덟 언어를 통틀어 제목이 겹치지 않는다', () => {
  // 스페인어와 포르투갈어는 이름이 같은 원소가 열둘이라, 제목 틀까지 같으면 통째로 겹친다
  const seen = new Map<string, string>();
  for (const lang of LANG8_CODES) {
    for (const x of ELEMENTS) {
      const ui = ELEMENT_UI[lang];
      const title = `${ui.metaTitle(nameOf(x.z, lang), x.symbol, x.z)} — ${ui.section}`;
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${x.z}가 함께 쓴다`);
      seen.set(title, `${lang}/${x.z}`);
    }
  }
});

test('원소 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[ELEMENT_ICON], 'atom', '이모지가 원자 아이콘으로 이어지지 않는다');
});
