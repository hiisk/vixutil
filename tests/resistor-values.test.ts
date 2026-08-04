/**
 * 저항값과 색띠가 스스로 어긋나지 않는지 본다.
 *
 * 적어 둔 자료는 E24 스물넷뿐이다. 그 스물넷이 틀리면 144장이 전부 틀리므로,
 * 검사가 표를 **공식과 견준다** — E계열은 한 자릿수를 로그로 나눈 값이라
 * 10 × 10^(k/24)에 가깝고, 실제로 어긋나는 자리는 손질된 여덟 곳뿐이다.
 *
 * 색띠는 되읽어 확인한다. 값에서 만든 띠를 다시 값으로 풀어 제자리에 오는지
 * 보면, 자릿수를 하나 밀거나 곱하는 수를 잘못 세운 실수가 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DECADES, E6, E12, E24, RESISTOR_ICON, RESISTOR_SLUGS, VALUES, valueOf } from '../lib/resistor/list.ts';
import {
  DIGIT_COLORS, SERIES, TOLERANCE_PERCENT, decodeBands, multiplierOf, neighbours,
  resistorFacts, sameDecade, valuesOfSeries,
} from '../lib/resistor/facts.ts';
import { RESISTOR_UI } from '../lib/resistor/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(VALUES.length >= 100, `${VALUES.length}가지뿐이다`);
  assert.equal(VALUES.length, E24.length * DECADES.length);
  assert.equal(VALUES.length, 144);
  assert.equal(new Set(RESISTOR_SLUGS).size, VALUES.length, 'slug 중복');
  assert.equal(valueOf('4700'), 4700);
  assert.equal(valueOf('04700'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(valueOf('4800'), undefined, 'E24에 없는 값이다');
});

test('E24 표가 공식과 어긋나는 자리는 알려진 여덟 곳뿐이다', () => {
  // E계열은 한 자릿수를 로그로 고르게 나눈 값이다
  const formula = E24.map((_, k) => Math.round(10 * 10 ** (k / 24)));
  const drift = E24.map((v, i) => (v === formula[i] ? null : `${formula[i]}→${v}`)).filter(Boolean);
  assert.deepEqual(drift, ['26→27', '29→30', '32→33', '35→36', '38→39', '42→43', '46→47', '83→82'],
    '표를 잘못 베끼면 어긋나는 자리가 늘어난다');
  // 어긋나도 한 칸을 넘지 않는다
  E24.forEach((v, i) => assert.ok(Math.abs(v - formula[i]) <= 1, `${v}: 공식에서 너무 멀다`));
});

test('E24가 오름차순이고 E12·E6이 한 칸씩 건너뛴다', () => {
  assert.equal(E24.length, 24);
  E24.forEach((v, i) => {
    assert.ok(v >= 10 && v <= 91, `${v}: 두 자리가 아니다`);
    if (i > 0) assert.ok(v > E24[i - 1], `${v}: 오름차순이 아니다`);
  });
  assert.equal(E12.length, 12);
  assert.equal(E6.length, 6);
  assert.deepEqual(E12, [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82]);
  assert.deepEqual(E6, [10, 15, 22, 33, 47, 68]);
  // 성긴 계열은 촘촘한 계열에 통째로 든다
  for (const v of E6) assert.ok(E12.includes(v), `${v}: E6인데 E12에 없다`);
  for (const v of E12) assert.ok(E24.includes(v), `${v}: E12인데 E24에 없다`);
});

test('색띠를 되읽으면 그 값이 나온다', () => {
  for (const ohms of VALUES) {
    const f = resistorFacts(ohms);
    assert.equal(decodeBands(f.bands4), ohms, `${ohms}Ω: 네 띠를 되읽으면 다르다 — ${f.bands4.join(' ')}`);
    assert.equal(decodeBands(f.bands5), ohms, `${ohms}Ω: 다섯 띠를 되읽으면 다르다 — ${f.bands5.join(' ')}`);
    assert.equal(f.bands4.length, 4);
    assert.equal(f.bands5.length, 5);
    assert.equal(f.bands4[3], 'gold', `${ohms}Ω: 오차 띠가 금색이 아니다`);
  }
  // 잘 알려진 몇 개를 못으로 박는다
  assert.deepEqual(resistorFacts(4700).bands4, ['yellow', 'violet', 'red', 'gold']);
  assert.deepEqual(resistorFacts(220).bands4, ['red', 'red', 'brown', 'gold']);
  assert.deepEqual(resistorFacts(10).bands4, ['brown', 'black', 'black', 'gold']);
  assert.deepEqual(resistorFacts(1_000_000).bands4, ['brown', 'black', 'green', 'gold']);
});

test('곱하는 수 띠가 색과 맞는다', () => {
  DIGIT_COLORS.forEach((c, i) => assert.equal(multiplierOf(c), 10 ** i, `${c}: 곱하는 수가 다르다`));
  assert.equal(multiplierOf('gold'), 0.1);
  assert.equal(multiplierOf('silver'), 0.01);
  // 10~91Ω은 다섯 띠에서 금색이 곱하는 자리에 온다 — 자리를 하나 더 읽기 때문이다
  for (const ohms of VALUES) {
    const f = resistorFacts(ohms);
    assert.equal(f.bands5[3], f.exp === 0 ? 'gold' : DIGIT_COLORS[f.exp - 1], `${ohms}Ω: 다섯 띠의 곱하는 수가 다르다`);
  }
});

test('읽는 값과 4k7 표기가 옴 값과 같은 수다', () => {
  for (const ohms of VALUES) {
    const f = resistorFacts(ohms);
    // "4.7 kΩ" 를 다시 숫자로 되돌린다
    const [text, unit] = f.display.split(' ');
    const factor = unit.startsWith('M') ? 1_000_000 : unit.startsWith('k') ? 1_000 : 1;
    // 8.2 × 1_000_000은 부동소수점에서 8200000.000000001이 된다 — 반올림해 견준다
    assert.equal(Math.round(Number(text) * factor), ohms, `${ohms}Ω: 읽는 값이 다르다 — ${f.display}`);
    assert.ok(!f.code.includes('.'), `${ohms}Ω: 4k7 표기에 소수점이 남았다 — ${f.code}`);
    assert.match(f.code, /^[0-9]+[RkM][0-9]*$/, `${ohms}Ω: 표기 꼴이 아니다 — ${f.code}`);
  }
  assert.equal(resistorFacts(4700).display, '4.7 kΩ');
  assert.equal(resistorFacts(4700).code, '4k7');
  assert.equal(resistorFacts(10).code, '10R');
  assert.equal(resistorFacts(1000).code, '1k');
  assert.equal(resistorFacts(9_100_000).code, '9M1');
});

test('계열과 오차가 값에 맞게 붙는다', () => {
  for (const ohms of VALUES) {
    const f = resistorFacts(ohms);
    assert.ok(f.inSeries.includes('E24'), `${ohms}Ω: E24에 들지 않는다`);
    assert.equal(f.series, f.inSeries[0], `${ohms}Ω: 가장 성긴 계열이 앞에 있지 않다`);
    assert.equal(f.tolerance, TOLERANCE_PERCENT);
    assert.equal(f.min, (ohms * 95) / 100, `${ohms}Ω: 아래 끝이 다르다`);
    assert.equal(f.max, (ohms * 105) / 100, `${ohms}Ω: 위 끝이 다르다`);
    assert.ok(f.min < ohms && ohms < f.max, `${ohms}Ω: 범위가 값을 감싸지 않는다`);
  }
  assert.equal(resistorFacts(4700).series, 'E6', '47은 E6에도 든다');
  assert.equal(resistorFacts(5100).series, 'E24', '51은 E24에만 든다');
  assert.equal(resistorFacts(1200).series, 'E12', '12는 E12까지다');
  assert.equal(valuesOfSeries('E6').length, 6 * DECADES.length);
  assert.equal(valuesOfSeries('E24').length, VALUES.length);
});

test('자릿수가 여섯이고 각 자릿수에 스물넷이 있다', () => {
  for (const d of DECADES) {
    const exp = String(d).length - 1;
    const inDecade = VALUES.filter(v => resistorFacts(v).exp === exp);
    assert.equal(inDecade.length, 24, `${d}배 자리가 스물넷이 아니다`);
  }
  assert.equal(resistorFacts(10).exp, 0);
  assert.equal(resistorFacts(4700).exp, 2);
  assert.equal(resistorFacts(9_100_000).exp, 5);
  // 같은 자릿수 목록은 자기 자신을 뺀 스물셋이다
  for (const ohms of VALUES) assert.equal(sameDecade(ohms).length, 23, `${ohms}Ω: 같은 자릿수 목록이 다르다`);
});

test('이웃이 자기 자신을 뺀다', () => {
  for (const ohms of VALUES) {
    const n = neighbours(ohms);
    assert.ok(!n.includes(ohms), `${ohms}Ω: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${ohms}Ω: 이웃이 없다`);
  }
});

test('저항 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[RESISTOR_ICON], 'bolt', '이모지가 번개 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = resistorFacts(4700);
  for (const lang of LANG_CODES) {
    const ui = RESISTOR_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.valueFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const c of DIGIT_COLORS) assert.ok(ui.colorLabel[c], `${lang}: ${c} 이름이 없다`);
    for (const c of ['gold', 'silver', 'none'] as const) assert.ok(ui.colorLabel[c], `${lang}: ${c} 이름이 없다`);
    for (const s of SERIES) {
      assert.ok(ui.seriesName[s], `${lang}: ${s} 이름이 없다`);
      assert.ok(ui.seriesNote[s]?.length >= (DENSE.has(lang) ? 6 : 12), `${lang}: ${s} 설명이 없다`);
    }
  }
});

test('색 이름이 언어마다 다르고 한 언어 안에서 겹치지 않는다', () => {
  for (const lang of LANG_CODES) {
    const names = DIGIT_COLORS.map(c => RESISTOR_UI[lang].colorLabel[c]);
    const dup = [...new Set(names.filter((n, i) => names.indexOf(n) !== i))];
    // 색을 하나 베껴 적다 겹치면 "빨강 빨강 빨강"이 되어 값을 못 읽는다
    assert.deepEqual(dup, [], `${lang}: 색 이름이 겹친다 — ${dup.join(', ')}`);
  }
  assert.equal(RESISTOR_UI.ko.colorLabel.violet, '보라');
  assert.equal(RESISTOR_UI.ja.colorLabel.violet, '紫');
});

test('설명이 144가지 모두에서 만들어지고 색 이름이 그 언어로 들어간다', () => {
  for (const ohms of VALUES) {
    const f = resistorFacts(ohms);
    for (const lang of LANG_CODES) {
      const ui = RESISTOR_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${ohms}: 설명이 너무 짧다 — ${d}`);
      // 영어 색 이름이 그대로 새어 나오면 다른 언어에서 읽을 수 없다
      const first = ui.colorLabel[f.bands4[0]];
      assert.ok(d.includes(first), `${lang}/${ohms}: 설명에 그 언어의 색 이름이 없다 — ${d}`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(f.code), `${lang}/${ohms}: 메타 설명에 4k7 표기가 없다`);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${ohms}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(f).includes(f.code), `${lang}/${ohms}: 제목에 표기가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const ohms of VALUES) {
      const title = RESISTOR_UI[lang].metaTitle(resistorFacts(ohms));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${ohms}가 함께 쓴다`);
      seen.set(title, `${lang}/${ohms}`);
    }
  }
});
