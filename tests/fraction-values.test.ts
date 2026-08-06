/**
 * 분수 사전이 스스로 어긋나지 않는지 본다.
 *
 * 적어 둔 자료가 없으니 위험한 곳은 계산 하나뿐이다 — 손으로 세우는 나눗셈.
 * 0.1(6)처럼 순환마디를 뽑는 자리는 눈으로 보면 늘 그럴듯해서, 한 자리가
 * 밀려도 알아채기 어렵다.
 *
 * 그래서 검사는 **소수에서 분수로 되돌아간다.** 순환소수를 분수로 되돌리는
 * 공식은 나눗셈과 전혀 다른 길이라, 둘이 만나면 두 길 다 맞은 것이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  FRACTIONS, FRACTION_ICON, FRACTION_SLUGS, MAX_DENOMINATOR, fractionOf, slugOf,
} from '../lib/fraction/list.ts';
import {
  DENOMINATORS, decimalOf, fractionFacts, fractionsOfDenominator, isReduced, nearby,
  sameDenominator, terminates,
} from '../lib/fraction/facts.ts';
import { FRACTION_UI } from '../lib/fraction/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(FRACTIONS.length >= 100, `${FRACTIONS.length}가지뿐이다`);
  assert.equal(FRACTIONS.length, 179);
  assert.equal(new Set(FRACTION_SLUGS).size, FRACTIONS.length, 'slug 중복');
  assert.deepEqual(fractionOf('3-8'), { n: 3, d: 8 });
  assert.equal(fractionOf('2-4'), undefined, '약분되는 분수는 내지 않는다');
  assert.equal(fractionOf('1-25'), undefined, '분모 24까지다');
  assert.equal(fractionOf('3/8'), undefined, '슬래시는 주소를 가른다');
});

test('개수가 오일러 파이의 합과 같다', () => {
  // 분모 d의 기약 진분수는 φ(d)개다 — 목록을 만든 방법과 다른 길로 센다
  const phi = (n: number) => {
    let count = 0;
    for (let k = 1; k < n; k++) if (gcd(k, n) === 1) count++;
    return count;
  };
  let total = 0;
  for (let d = 2; d <= MAX_DENOMINATOR; d++) total += phi(d);
  assert.equal(FRACTIONS.length, total, '개수가 파이의 합과 다르다');
  for (const d of DENOMINATORS) assert.equal(fractionsOfDenominator(d).length, phi(d), `분모 ${d}: 개수가 다르다`);
});

test('모두 기약분수이고 1보다 작다', () => {
  for (const f of FRACTIONS) {
    assert.ok(isReduced(f), `${slugOf(f)}: 약분이 남았다`);
    assert.ok(f.n >= 1 && f.n < f.d, `${slugOf(f)}: 진분수가 아니다`);
    assert.ok(f.d >= 2 && f.d <= MAX_DENOMINATOR, `${slugOf(f)}: 분모가 범위 밖이다`);
  }
  // 값이 같은 분수가 둘 있으면 한 답을 두 주소가 나눠 갖는다
  const values = FRACTIONS.map(f => f.n / f.d);
  assert.equal(new Set(values).size, values.length, '값이 겹치는 분수가 있다');
});

test('소수를 분수로 되돌리면 제자리로 온다', () => {
  // 17분의 1은 순환마디가 열여섯 자리라 보통 수로는 자릿수가 모자란다 — BigInt로 센다.
  // 리터럴(0n)은 이 저장소의 컴파일 대상보다 새 문법이라 BigInt()로 만든다
  const ZERO = BigInt(0);
  const ONE = BigInt(1);
  const pow10 = (k: number) => BigInt(`1${'0'.repeat(k)}`);
  const big = (s: string) => (s === '' ? ZERO : BigInt(s));
  const bigGcd = (a: bigint, b: bigint): bigint => (b === ZERO ? a : bigGcd(b, a % b));
  for (const f of FRACTIONS) {
    const dec = decimalOf(f.n, f.d);
    let num: bigint;
    let den: bigint;
    if (dec.terminating) {
      // 0.375 → 375/1000
      num = big(dec.head);
      den = pow10(dec.head.length);
    } else {
      // 0.1(6) → (16 - 1) / 90 — 나눗셈과는 전혀 다른 길이다
      num = big(`${dec.head}${dec.period}`) - big(dec.head);
      den = (pow10(dec.period.length) - ONE) * pow10(dec.head.length);
    }
    const g = bigGcd(num, den);
    assert.equal(Number(num / g), f.n, `${slugOf(f)}: 되돌린 분자가 다르다 — ${dec.text}`);
    assert.equal(Number(den / g), f.d, `${slugOf(f)}: 되돌린 분모가 다르다 — ${dec.text}`);
  }
  assert.equal(decimalOf(3, 8).text, '0.375');
  assert.equal(decimalOf(1, 3).text, '0.(3)');
  assert.equal(decimalOf(1, 6).text, '0.1(6)');
  assert.equal(decimalOf(5, 7).text, '0.(714285)');
  assert.equal(decimalOf(1, 2).text, '0.5');
});

test('딱 떨어지는 소수는 분모에 2와 5만 든 것뿐이다', () => {
  for (const f of FRACTIONS) {
    const dec = decimalOf(f.n, f.d);
    assert.equal(dec.terminating, terminates(f.d), `${slugOf(f)}: 순환 여부가 분모와 어긋난다`);
    if (dec.terminating) assert.equal(dec.period, '', `${slugOf(f)}: 끝나는데 순환마디가 있다`);
    else assert.ok(dec.period.length > 0, `${slugOf(f)}: 순환하는데 마디가 비었다`);
  }
  assert.equal(terminates(8), true);
  assert.equal(terminates(20), true);
  assert.equal(terminates(3), false);
  assert.equal(terminates(6), false, '6은 2와 3이라 순환한다');
});

test('순환마디 길이가 10의 위수와 같다', () => {
  // 분모에서 2와 5를 뽑아낸 나머지 d'에 대해, 10^k ≡ 1 (mod d')가 되는 가장 작은 k다
  const order = (d: number) => {
    let left = d;
    while (left % 2 === 0) left /= 2;
    while (left % 5 === 0) left /= 5;
    if (left === 1) return 0;
    let k = 1;
    let pow = 10 % left;
    while (pow !== 1) { pow = (pow * 10) % left; k++; }
    return k;
  };
  for (const f of FRACTIONS) {
    assert.equal(fractionFacts(f).periodLength, order(f.d), `${slugOf(f)}: 순환마디 길이가 다르다`);
  }
  assert.equal(fractionFacts({ n: 1, d: 7 }).periodLength, 6);
  assert.equal(fractionFacts({ n: 1, d: 3 }).periodLength, 1);
  assert.equal(fractionFacts({ n: 1, d: 8 }).periodLength, 0);
});

test('퍼센트와 각도와 분이 값과 맞는다', () => {
  for (const f of FRACTIONS) {
    const x = fractionFacts(f);
    const value = f.n / f.d;
    const toNumber = (dec: ReturnType<typeof decimalOf>) =>
      // 순환소수는 마디를 여러 번 늘어놓아 견준다
      Number(`${dec.integer}.${dec.head}${dec.period.repeat(dec.period ? 8 : 0)}`);
    assert.ok(Math.abs(toNumber(x.percent) - value * 100) < 1e-6, `${slugOf(f)}: 퍼센트가 어긋난다`);
    assert.ok(Math.abs(toNumber(x.degrees) - value * 360) < 1e-5, `${slugOf(f)}: 각도가 어긋난다`);
    assert.ok(Math.abs(toNumber(x.minutes) - value * 60) < 1e-6, `${slugOf(f)}: 분이 어긋난다`);
  }
  assert.equal(fractionFacts({ n: 1, d: 4 }).percent.text, '25');
  assert.equal(fractionFacts({ n: 1, d: 3 }).percent.text, '33.(3)');
  assert.equal(fractionFacts({ n: 1, d: 2 }).degrees.text, '180');
  assert.equal(fractionFacts({ n: 5, d: 7 }).degrees.text, '257.(142857)');
});

test('동치분수와 역수가 같은 값을 가리킨다', () => {
  for (const f of FRACTIONS) {
    const x = fractionFacts(f);
    for (const e of x.equivalents) {
      assert.equal(e.n / e.d, f.n / f.d, `${slugOf(f)}: 동치분수의 값이 다르다`);
      assert.equal(e.n / gcd(e.n, e.d), f.n, `${slugOf(f)}: 약분하면 제자리로 오지 않는다`);
    }
    const r = x.reciprocal;
    assert.equal(r.n, f.d);
    assert.equal(r.d, f.n);
    // 대분수로 적은 것을 다시 가분수로 되돌린다
    assert.equal(r.whole * r.d + r.rest, r.n, `${slugOf(f)}: 대분수를 되돌리면 다르다`);
    assert.ok(r.rest < r.d, `${slugOf(f)}: 나머지가 분모보다 크다`);
  }
  assert.deepEqual(fractionFacts({ n: 5, d: 7 }).reciprocal, { n: 7, d: 5, whole: 1, rest: 2 });
});

test('가까운 분수가 수직선 순서를 따른다', () => {
  for (const f of FRACTIONS) {
    const n = nearby(f);
    assert.ok(!n.some(o => o.n === f.n && o.d === f.d), `${slugOf(f)}: 이웃에 자기 자신이 있다`);
    assert.ok(n.length > 0, `${slugOf(f)}: 이웃이 없다`);
    const same = sameDenominator(f);
    for (const o of same) assert.equal(o.d, f.d, `${slugOf(f)}: 다른 분모가 섞였다`);
  }
  // 1/2 옆에는 값이 가까운 분수가 온다 — 분모가 같은 분수가 아니다
  const near = nearby({ n: 1, d: 2 }).map(slugOf);
  assert.ok(near.includes('8-17') || near.includes('9-17') || near.includes('7-13') || near.includes('9-19'),
    `1/2의 이웃이 값 순이 아니다 — ${near.join(' ')}`);
});

test('분수 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[FRACTION_ICON], 'plus', '이모지가 셈 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = fractionFacts({ n: 3, d: 8 });
  for (const lang of LANG_CODES) {
    const ui = FRACTION_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.fractionFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
  }
});

test('소수점 기호가 언어마다 제자리에 있다', () => {
  // 0.375를 독일어에서 0.375로 두면 "삼백칠십오"로 읽힌다 — 점이 자릿수 구분 기호이기 때문이다
  const three8 = fractionFacts({ n: 3, d: 8 }).decimal;
  const one6 = fractionFacts({ n: 1, d: 6 }).decimal;
  for (const lang of ['de', 'fr', 'es', 'pt'] as const) {
    assert.equal(FRACTION_UI[lang].dec(three8), '0,375', `${lang}: 쉼표를 쓰지 않는다`);
    assert.equal(FRACTION_UI[lang].dec(one6), '0,1(6)', `${lang}: 순환 표기에서 쉼표를 놓쳤다`);
  }
  for (const lang of ['ko', 'en', 'ja', 'zh', 'tw', 'hi'] as const) {
    assert.equal(FRACTION_UI[lang].dec(three8), '0.375', `${lang}: 점을 쓰지 않는다`);
  }
});

test('한국어 조사가 분수를 읽은 소리를 따른다', () => {
  // 3/8은 "팔분의 삼"이라 끝이 분자다 — 3은 받침이 있어 "3/8은"이다
  const q = (n: number, d: number) => FRACTION_UI.ko.fractionFaq(fractionFacts({ n, d }))[0].q;
  assert.ok(q(3, 8).startsWith('3/8은'), q(3, 8));
  assert.ok(q(2, 5).startsWith('2/5는'), q(2, 5));
  assert.ok(q(4, 7).startsWith('4/7는'), q(4, 7));
  assert.ok(q(1, 2).startsWith('1/2는') === false, q(1, 2));
  assert.ok(q(1, 2).startsWith('1/2은'), q(1, 2));
});

test('설명이 127가지 모두에서 만들어진다', () => {
  for (const fr of FRACTIONS) {
    const f = fractionFacts(fr);
    for (const lang of LANG_CODES) {
      const ui = FRACTION_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${slugOf(fr)}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(`${f.n}/${f.d}`), `${lang}/${slugOf(fr)}: 설명에 분수가 없다`);
      assert.ok(d.includes(ui.dec(f.decimal)), `${lang}/${slugOf(fr)}: 설명에 소수가 없다`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${slugOf(fr)}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(f).includes(`${f.n}/${f.d}`), `${lang}/${slugOf(fr)}: 제목에 분수가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const fr of FRACTIONS) {
      const title = FRACTION_UI[lang].metaTitle(fractionFacts(fr));
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${slugOf(fr)}가 함께 쓴다`);
      seen.set(title, `${lang}/${slugOf(fr)}`);
    }
  }
});
