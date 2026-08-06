/**
 * 수 사전이 스스로 어긋나지 않는지 본다.
 *
 * 이 섹션은 적어 둔 자료가 없어서 "표를 잘못 베꼈다"는 실수는 일어나지 않는다.
 * 대신 계산이 조용히 틀릴 수 있다 — 약수를 하나 빠뜨려도 목록은 그럴듯하고,
 * 로마 숫자가 IIII로 나와도 읽는 데는 지장이 없다.
 *
 * 그래서 검사는 값을 다시 적지 않고 **다른 길로 같은 값에 이른다.** 약수의 합은
 * 소인수의 지수에서 곱으로 구하고, 파이는 실제로 서로소를 세어 보고, 로마 숫자는
 * 거꾸로 파싱해 되돌린다. 두 길이 갈리면 그 자리가 틀린 자리다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { GRID_MAX, NUMBERS, NUMBER_ICON, NUMBER_SLUGS, POWERS, numberOf } from '../lib/number/list.ts';
import {
  FAMILIES, collatz, divisorsOf, factorize, familiesOf, isPrime, membersOf, numberFacts, romanOf, totient,
} from '../lib/number/facts.ts';
import { NUMBER_UI } from '../lib/number/ui.ts';
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { DENSE, hanProblem } from './han.ts';

test('100가지가 넘고 주소가 겹치지 않는다', () => {
  assert.ok(NUMBERS.length >= 100, `${NUMBERS.length}가지뿐이다`);
  assert.equal(NUMBERS.length, GRID_MAX + POWERS.length);
  assert.equal(new Set(NUMBER_SLUGS).size, NUMBERS.length, 'slug 중복');
  assert.equal(numberOf('42'), 42);
  assert.equal(numberOf('042'), undefined, '앞에 0이 붙은 주소는 받지 않는다');
  assert.equal(numberOf('241'), undefined);
  assert.equal(numberOf('65536'), 65536);
});

test('1부터 200까지 빠짐없이 잇고, 뒤에 2의 거듭제곱 아홉이 붙는다', () => {
  for (let i = 0; i < GRID_MAX; i++) assert.equal(NUMBERS[i], i + 1, `${i + 1}번 자리가 어긋났다`);
  assert.deepEqual(POWERS, [256, 512, 1024, 2048, 4096, 8192, 16384, 32768, 65536]);
  for (const p of POWERS) assert.equal(numberFacts(p).power2, Math.log2(p));
});

test('소수 판정이 체와 같다', () => {
  // 에라토스테네스의 체 — 판정과 다른 길이다
  const max = 65536;
  const sieve = new Uint8Array(max + 1).fill(1);
  sieve[0] = sieve[1] = 0;
  for (let p = 2; p * p <= max; p++) {
    if (!sieve[p]) continue;
    for (let m = p * p; m <= max; m += p) sieve[m] = 0;
  }
  for (const n of NUMBERS) assert.equal(isPrime(n), sieve[n] === 1, `${n}: 소수 판정이 체와 다르다`);
  // π(240) = 52 — 200까지 46개에 211·223·227·229·233·239 여섯이 더 있다
  assert.equal(NUMBERS.filter(n => n <= GRID_MAX && isPrime(n)).length, 52, '240 이하의 소수는 52개다');
});

test('소인수를 곱하면 자기 자신이 된다', () => {
  for (const n of NUMBERS) {
    const f = factorize(n);
    const product = f.reduce((acc, { p, e }) => acc * p ** e, 1);
    assert.equal(product, n, `${n}: 소인수의 곱이 자기 자신이 아니다`);
    for (const { p, e } of f) {
      assert.ok(isPrime(p), `${n}: ${p}는 소수가 아니다`);
      assert.ok(e >= 1, `${n}: 지수가 0이다`);
    }
    // 같은 소수가 두 번 나오면 지수를 안 묶은 것이다
    assert.equal(new Set(f.map(x => x.p)).size, f.length, `${n}: 소인수가 겹친다`);
  }
  assert.deepEqual(factorize(1), []);
  assert.deepEqual(factorize(200), [{ p: 2, e: 3 }, { p: 5, e: 2 }]);
});

test('약수 목록이 나눠떨어지는 수 전부다', () => {
  // 200까지는 하나하나 나눠 보고 견준다 — 짝으로 주워 담는 쪽이 빠뜨렸는지 본다
  for (let n = 1; n <= GRID_MAX; n++) {
    const brute: number[] = [];
    for (let d = 1; d <= n; d++) if (n % d === 0) brute.push(d);
    assert.deepEqual(divisorsOf(n), brute, `${n}: 약수 목록이 다르다`);
  }
  for (const n of NUMBERS) {
    const f = numberFacts(n);
    // 개수는 지수에 1을 더해 곱한 값이다
    const count = f.factors.reduce((acc, { e }) => acc * (e + 1), 1);
    assert.equal(f.divisors.length, count, `${n}: 약수 개수가 지수에서 나온 값과 다르다`);
    assert.ok(f.divisors.every((d, i) => i === 0 || d > f.divisors[i - 1]), `${n}: 약수가 오름차순이 아니다`);
  }
});

test('약수의 합이 소인수에서 구한 값과 같다', () => {
  for (const n of NUMBERS) {
    const f = numberFacts(n);
    const sigma = f.factors.reduce((acc, { p, e }) => acc * ((p ** (e + 1) - 1) / (p - 1)), 1);
    assert.equal(f.divisorSum, sigma, `${n}: 약수의 합이 곱셈 공식과 다르다`);
    assert.equal(f.properSum, f.divisorSum - n);
  }
  assert.equal(numberFacts(6).kind, 'perfect');
  assert.equal(numberFacts(28).kind, 'perfect');
  assert.equal(numberFacts(12).kind, 'abundant');
  assert.equal(numberFacts(1).kind, 'deficient');
  const perfect = NUMBERS.filter(n => numberFacts(n).kind === 'perfect');
  assert.deepEqual(perfect, [6, 28], '이 범위의 완전수는 6과 28뿐이다');
});

test('오일러 파이가 실제로 센 값과 같다', () => {
  const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : a);
  for (let n = 1; n <= GRID_MAX; n++) {
    let count = 0;
    for (let k = 1; k <= n; k++) if (gcd(n, k) === 1) count++;
    assert.equal(totient(n), count, `${n}: 파이가 센 값과 다르다`);
  }
  // 약수들의 파이를 다 더하면 자기 자신이 된다
  for (const n of NUMBERS) {
    const sum = divisorsOf(n).reduce((acc, d) => acc + totient(d), 0);
    assert.equal(sum, n, `${n}: 약수의 파이 합이 자기 자신이 아니다`);
  }
});

test('로마 숫자를 되돌리면 제자리로 온다', () => {
  const VALUE: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const parse = (s: string): number => {
    let out = 0;
    for (let i = 0; i < s.length; i++) {
      const cur = VALUE[s[i]];
      const next = VALUE[s[i + 1]] ?? 0;
      out += cur < next ? -cur : cur;
    }
    return out;
  };
  for (const n of NUMBERS) {
    const r = romanOf(n);
    if (n > 3999) {
      assert.equal(r, null, `${n}: 3999를 넘는데 로마 숫자가 있다`);
      continue;
    }
    assert.ok(r, `${n}: 로마 숫자가 없다`);
    assert.equal(parse(r), n, `${n}: 되돌리면 ${parse(r)}가 된다 — ${r}`);
    // 같은 글자를 넷 이어 쓰지 않는다(IIII가 아니라 IV)
    assert.ok(!/(.)\1{3}/.test(r), `${n}: 같은 글자가 넷 이어졌다 — ${r}`);
  }
  assert.equal(romanOf(4), 'IV');
  assert.equal(romanOf(9), 'IX');
  assert.equal(romanOf(40), 'XL');
  assert.equal(romanOf(90), 'XC');
  assert.equal(romanOf(1987), 'MCMLXXXVII');
  assert.equal(romanOf(4000), null);
});

test('진법 표기를 되돌리면 제자리로 온다', () => {
  for (const n of NUMBERS) {
    const f = numberFacts(n);
    assert.equal(parseInt(f.bin, 2), n, `${n}: 2진수가 어긋난다`);
    assert.equal(parseInt(f.oct, 8), n, `${n}: 8진수가 어긋난다`);
    assert.equal(parseInt(f.hex, 16), n, `${n}: 16진수가 어긋난다`);
    assert.equal(parseInt(f.base36, 36), n, `${n}: 36진수가 어긋난다`);
    assert.equal(f.bits, f.bin.length, `${n}: 비트 수가 2진수 길이와 다르다`);
    assert.ok(!f.bin.startsWith('0'), `${n}: 2진수 앞에 0이 붙었다`);
    assert.equal(f.hex, f.hex.toUpperCase(), `${n}: 16진수가 대문자가 아니다`);
  }
  assert.equal(numberFacts(255).hex, 'FF');
  assert.equal(numberFacts(65535 > 200 ? 65536 : 1).hex, '10000');
  assert.equal(numberFacts(10).bin, '1010');
});

test('자릿수 합과 디지털 루트가 9와 맞물린다', () => {
  for (const n of NUMBERS) {
    const f = numberFacts(n);
    assert.equal(f.digitSum, String(n).split('').reduce((a, c) => a + Number(c), 0), `${n}: 자릿수 합이 다르다`);
    assert.equal(f.digitalRoot % 9, n % 9, `${n}: 디지털 루트가 9로 나눈 나머지와 어긋난다`);
    assert.ok(f.digitalRoot >= 1 && f.digitalRoot <= 9, `${n}: 디지털 루트가 한 자리가 아니다`);
    assert.equal(f.palindrome, String(n) === [...String(n)].reverse().join(''));
  }
  assert.equal(numberFacts(121).palindrome, true);
  assert.equal(numberFacts(120).palindrome, false);
});

test('콜라츠가 모두 1에 닿는다', () => {
  for (const n of NUMBERS) {
    const c = collatz(n);
    assert.ok(c.peak >= n, `${n}: 최고점이 자기보다 작다`);
    assert.ok(c.steps >= 0, `${n}: 걸음 수가 음수다`);
  }
  assert.deepEqual(collatz(1), { steps: 0, peak: 1 });
  assert.deepEqual(collatz(27), { steps: 111, peak: 9232 });
  // 2의 거듭제곱은 반으로만 줄어드니 걸음 수가 곧 지수다
  for (const p of POWERS) assert.equal(collatz(p).steps, Math.log2(p), `${p}: 걸음 수가 지수와 다르다`);
});

test('점을 늘어놓은 직사각형이 실제로 그 수만큼이다', () => {
  for (const n of NUMBERS) {
    const { rect, prime } = numberFacts(n);
    assert.equal(rect.rows * rect.cols, n, `${n}: 칸 수가 다르다`);
    assert.ok(rect.rows <= rect.cols, `${n}: 세로가 가로보다 길다`);
    if (prime) assert.equal(rect.rows, 1, `${n}: 소수인데 한 줄이 아니다`);
  }
  assert.deepEqual(numberFacts(12).rect, { rows: 3, cols: 4 });
  assert.deepEqual(numberFacts(16).rect, { rows: 4, cols: 4 });
  assert.deepEqual(numberFacts(13).rect, { rows: 1, cols: 13 });
});

test('갈래가 알려진 목록과 맞는다', () => {
  const members = (f: (typeof FAMILIES)[number]) => NUMBERS.filter(n => familiesOf(n).includes(f));
  assert.deepEqual(members('perfect'), [6, 28]);
  assert.deepEqual(members('triangular').filter(n => n <= 60), [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]);
  assert.deepEqual(members('fibonacci'), [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233]);
  // 512는 8의 세제곱이다 — 2의 거듭제곱 중에 지수가 3의 배수면 세제곱수이기도 하다
  assert.deepEqual(members('cube'), [1, 8, 27, 64, 125, 216, 512, 4096, 32768]);
  assert.deepEqual(members('power2').filter(n => n <= GRID_MAX), [1, 2, 4, 8, 16, 32, 64, 128]);
  // 64는 제곱수이면서 세제곱수이면서 2의 거듭제곱이다 — 갈래는 겹칠 수 있다
  assert.deepEqual(familiesOf(64), ['square', 'cube', 'power2']);
  assert.deepEqual(familiesOf(2), ['prime', 'fibonacci', 'power2']);
  for (const f of FAMILIES) assert.ok(members(f).length > 0, `${f}: 아무도 들지 않았다`);
});

test('앞뒤 소수가 실제로 앞뒤에 있는 소수다', () => {
  for (const n of NUMBERS) {
    const { prevPrime, nextPrime } = numberFacts(n);
    if (prevPrime !== null) {
      assert.ok(isPrime(prevPrime) && prevPrime < n, `${n}: 앞 소수가 아니다`);
      for (let i = prevPrime + 1; i < n; i++) assert.ok(!isPrime(i), `${n}: ${i}를 건너뛰었다`);
    }
    assert.ok(nextPrime !== null && isPrime(nextPrime) && nextPrime > n, `${n}: 뒤 소수가 없다`);
    for (let i = n + 1; i < nextPrime!; i++) assert.ok(!isPrime(i), `${n}: ${i}를 건너뛰었다`);
  }
  assert.equal(numberFacts(1).prevPrime, null);
  assert.equal(numberFacts(2).prevPrime, null);
  assert.equal(numberFacts(200).nextPrime, 211);
});

test('수 아이콘은 목록과 카드가 같은 그림을 쓴다', async () => {
  const { ICON_FOR } = await import('../lib/og-icon-map.ts');
  assert.equal(ICON_FOR[NUMBER_ICON], 'numbers', '이모지가 숫자 아이콘으로 이어지지 않는다');
});

/* ───────── 화면 문구 ───────── */

test('열 언어 문구가 모두 채워져 있다', () => {
  const f = numberFacts(60);
  for (const lang of LANG_CODES) {
    const ui = NUMBER_UI[lang];
    for (const [key, val] of Object.entries(ui)) {
      assert.ok(val != null, `${lang}.${key}가 비었다`);
      if (typeof val === 'string') {
        assert.ok(val.trim().length > 0, `${lang}.${key}가 빈 문자열이다`);
        assert.equal(hanProblem(lang, val), '', `${lang}.${key}: ${hanProblem(lang, val)}`);
      }
    }
    assert.equal(ui.how.length, 4, `${lang}: 읽는 방법 수가 다르다`);
    assert.equal(ui.hubFaq.length, 5, `${lang}: 허브 FAQ 수가 다르다`);
    assert.equal(ui.numberFaq(f).length, 4, `${lang}: 상세 FAQ 수가 다르다`);
    for (const fam of FAMILIES) {
      assert.ok(ui.familyLabel[fam], `${lang}: ${fam} 이름이 없다`);
      assert.ok(ui.familyNote[fam]?.length >= 10, `${lang}: ${fam} 설명이 없다`);
    }
    for (const k of ['perfect', 'abundant', 'deficient'] as const) {
      assert.ok(ui.kindLabel[k], `${lang}: ${k} 이름이 없다`);
      assert.ok(ui.kindNote[k]?.length >= 10, `${lang}: ${k} 설명이 없다`);
    }
  }
});

test('언어마다 자릿수 구분 기호가 제자리에 있다', () => {
  // 65,536과 65.536은 같은 수가 아니게 읽힌다
  for (const lang of ['ko', 'en', 'ja', 'zh', 'tw'] as const) {
    assert.equal(NUMBER_UI[lang].fmt(65536), '65,536', `${lang}: 쉼표로 끊지 않는다`);
  }
  for (const lang of ['de', 'es', 'pt'] as const) {
    assert.equal(NUMBER_UI[lang].fmt(65536), '65.536', `${lang}: 마침표로 끊지 않는다`);
  }
  const fr = NUMBER_UI.fr.fmt(65536);
  assert.ok(!fr.includes(',') && !fr.includes('.'), `프랑스어는 사이를 띄운다 — ${fr}`);
  assert.match(fr, /^65.536$/, `프랑스어 자릿수 구분이 이상하다 — ${fr}`);
});

test('단수와 복수가 1과 0에서 무너지지 않는다', () => {
  // 1은 약수가 하나뿐이고, 1의 콜라츠는 0걸음이다 — 생성 문장이 실제로 만나는 값이다
  assert.equal(NUMBER_UI.en.divisorCount(1), '1 divisor');
  assert.equal(NUMBER_UI.en.divisorCount(2), '2 divisors');
  assert.equal(NUMBER_UI.fr.divisorCount(1), '1 diviseur');
  assert.equal(NUMBER_UI.fr.divisorCount(4), '4 diviseurs');
  assert.equal(NUMBER_UI.en.bitsValue(1), '1 bit');
  assert.equal(NUMBER_UI.de.bitsValue(1), '1 Bit');
  // 프랑스어는 0도 단수다
  assert.ok(NUMBER_UI.fr.collatzValue(0, 1).startsWith('0 étape ·'), NUMBER_UI.fr.collatzValue(0, 1));
  assert.ok(NUMBER_UI.fr.collatzValue(2, 4).startsWith('2 étapes'), NUMBER_UI.fr.collatzValue(2, 4));
  assert.ok(NUMBER_UI.en.collatzValue(1, 2).startsWith('1 step '), NUMBER_UI.en.collatzValue(1, 2));
  assert.ok(NUMBER_UI.en.collatzValue(0, 1).startsWith('0 steps'), NUMBER_UI.en.collatzValue(0, 1));
});

test('한국어 조사가 수를 읽은 소리를 따른다', () => {
  // "42은"도 "47는"도 아니다. 끝자리가 2·4·5·9면 받침이 없다
  const q = (n: number) => NUMBER_UI.ko.numberFaq(numberFacts(n))[0].q;
  assert.ok(q(2).startsWith('2는'), q(2));
  assert.ok(q(3).startsWith('3은'), q(3));
  assert.ok(q(42).startsWith('42는'), q(42));
  assert.ok(q(47).startsWith('47은'), q(47));
  assert.ok(q(10).startsWith('10은'), q(10));
  assert.ok(q(100).startsWith('100은'), q(100));
  assert.ok(q(1024).startsWith('1,024는'), q(1024));
});

test('설명이 209개 모두에서 만들어진다', () => {
  for (const n of NUMBERS) {
    const f = numberFacts(n);
    for (const lang of LANG_CODES) {
      const ui = NUMBER_UI[lang];
      const d = ui.desc(f);
      const floor = DENSE.has(lang) ? 20 : 35;
      assert.ok(d.length > floor, `${lang}/${n}: 설명이 너무 짧다 — ${d}`);
      assert.ok(d.includes(ui.fmt(n)), `${lang}/${n}: 설명에 그 수가 없다 — ${d}`);
      const meta = ui.metaDesc(f);
      assert.ok(meta.includes(f.bin), `${lang}/${n}: 메타 설명에 2진수가 없다`);
      assert.ok(meta.length > (DENSE.has(lang) ? 25 : 40), `${lang}/${n}: 메타 설명이 너무 짧다`);
      assert.ok(ui.metaTitle(n).includes(String(n)), `${lang}/${n}: 제목에 수가 없다`);
    }
  }
});

test('열 언어를 통틀어 제목이 겹치지 않는다', () => {
  const seen = new Map<string, string>();
  for (const lang of LANG_CODES) {
    for (const n of NUMBERS) {
      const title = NUMBER_UI[lang].metaTitle(n);
      const before = seen.get(title);
      assert.equal(before, undefined, `"${title}"를 ${before}와 ${lang}/${n}가 함께 쓴다`);
      seen.set(title, `${lang}/${n}`);
    }
  }
});

test('갈래마다 목록이 비어 있지 않고 허브가 209개를 모두 건다', () => {
  // 격자(1~200)와 2의 거듭제곱 목록을 합치면 빠지는 수가 없어야 한다 — 고아 페이지가 생긴다
  const linked = new Set([...Array.from({ length: GRID_MAX }, (_, i) => i + 1), ...POWERS]);
  for (const n of NUMBERS) assert.ok(linked.has(n), `${n}: 허브에서 걸리지 않는다`);
  for (const fam of FAMILIES) assert.ok(membersOf(fam).length > 0, `${fam}: 목록이 비었다`);
});
