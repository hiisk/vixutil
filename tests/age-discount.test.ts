import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  calcAge, stackedRate, discountFromRate, discountFromPrices, originalFromDiscount,
} from '../lib/global-calc.ts';

/*
 * 나이와 할인의 계산 검사.
 *
 * 둘 다 "쉬워 보여서 아무도 안 세는" 계산이다. 실제로 틀리는 자리는 정해져 있다:
 *  - 나이: 2월 29일생, 생일 당일, 월말(1월 31일 → 3월 1일)
 *  - 할인: 연속 할인을 더해 버리는 것, 역산의 왕복
 * 그 자리들만 못 박는다. 24 - 1994 같은 값은 검사할 것이 없다.
 */

/* ── 나이 ────────────────────────────────────────────────────── */

test('생일이 안 지났으면 해 차이보다 하나 적다', () => {
  assert.equal(calcAge('1990-07-15', '2026-07-14')!.years, 35);
  assert.equal(calcAge('1990-07-15', '2026-07-15')!.years, 36);
});

test('2월 29일생은 평년에 2월 28일로 한 살을 먹는다', () => {
  // 윤년끼리는 다툼이 없다
  assert.equal(calcAge('2000-02-29', '2024-02-29')!.years, 24);
  // 평년: 28일에 이미 채운다. 3월 1일까지 미루면 하루 동안 나이가 어긋난다
  assert.equal(calcAge('2000-02-29', '2023-02-27')!.years, 22);
  assert.equal(calcAge('2000-02-29', '2023-02-28')!.years, 23);
  assert.equal(calcAge('2000-02-29', '2023-03-01')!.years, 23);
});

test('2월 29일생의 다음 생일도 같은 규칙으로 잡힌다', () => {
  const r = calcAge('2000-02-29', '2023-02-28')!;
  // 생일 당일이므로 다음 생일은 내년 — 2024년은 윤년이라 2월 29일이다
  assert.equal(r.toNextBirthday, 366);
  assert.equal(r.nextAge, 24);
  assert.equal(r.leapling, true);

  // 나이와 다음 생일이 서로 다른 규칙을 쓰면 여기서 어긋난다:
  // 27일에는 아직 22살이고 생일이 하루 남아 있어야 한다
  const eve = calcAge('2000-02-29', '2023-02-27')!;
  assert.equal(eve.years, 22);
  assert.equal(eve.toNextBirthday, 1);
});

test('생일 당일은 남은 날이 0이 아니라 한 해다', () => {
  const r = calcAge('1990-07-15', '2026-07-15')!;
  assert.equal(r.toNextBirthday, 365);
  assert.equal(r.nextAge, 37);
});

test('월말에서 다음 달로 넘어갈 때 개월·일수가 음수로 안 샌다', () => {
  // 자릿수로 빼면 -30일이 되는 자리 (date-calc의 span이 푸는 곳)
  const r = calcAge('2000-01-31', '2000-03-01')!;
  assert.equal(r.years, 0);
  assert.equal(r.months, 1);
  assert.equal(r.days, 1);
});

test('일수는 윤일을 포함해 실제로 흐른 날을 센다', () => {
  assert.equal(calcAge('2000-02-28', '2000-03-01')!.totalDays, 2); // 29일이 끼어 있다
  assert.equal(calcAge('2001-02-28', '2001-03-01')!.totalDays, 1);
  const r = calcAge('2020-01-01', '2021-01-01')!;
  assert.equal(r.totalDays, 366);
  assert.equal(r.totalWeeks, 52);
  assert.equal(r.totalMonths, 12);
});

test('말이 안 되는 날짜는 null이다', () => {
  // 기준일을 멀리 둔다 — 바로 다음 날로 잡으면 "태어나기 전"에 걸려 엉뚱한 이유로 통과한다
  assert.equal(calcAge('2026-02-31', '2026-12-01'), null, '2월 31일이 3월 3일로 조용히 넘어갔다');
  assert.equal(calcAge('2026-13-01', '2026-12-01'), null, '13월이 다음 해 1월로 조용히 넘어갔다');
  assert.equal(calcAge('2026-08-20', '2026-08-19'), null, '태어나기 전의 나이');
  assert.equal(calcAge('', '2026-08-20'), null);
  assert.equal(calcAge('20/08/2026', '2026-08-20'), null);
});

/* ── 할인 ────────────────────────────────────────────────────── */

test('연속 할인은 더하는 것이 아니라 곱하는 것이다', () => {
  assert.equal(stackedRate([30, 20]), 44); // 50이 아니다
  assert.equal(stackedRate([50, 50]), 75); // 100이 아니다
  assert.equal(stackedRate([30]), 30);

  const r = discountFromRate(100, [30, 20])!;
  assert.equal(r.final, 56);
  assert.equal(r.saved, 44);
  assert.equal(r.rate, 44);
});

test('정가와 할인율로 할인가를 낸다', () => {
  const r = discountFromRate(50000, [30])!;
  assert.deepEqual([r.final, r.saved, r.rate], [35000, 15000, 30]);
  assert.equal(discountFromRate(80, [100])!.final, 0);
  assert.equal(discountFromRate(80, [0])!.final, 80);
});

test('정가와 할인가로 할인율을 낸다', () => {
  const r = discountFromPrices(100000, 65000)!;
  assert.equal(r.rate, 35);
  assert.equal(r.saved, 35000);
  assert.equal(discountFromPrices(3, 2)!.rate, 33.33);
});

test('역산이 왕복한다 — 할인가에서 되짚은 정가가 처음 값과 같다', () => {
  for (const [orig, rate] of [[100, 35], [50000, 30], [129.99, 15], [3, 33.33]] as const) {
    const down = discountFromRate(orig, [rate])!;
    const up = originalFromDiscount(down.final, rate)!;
    assert.ok(Math.abs(up.original - orig) < 0.02, `${orig} @ ${rate}% → ${down.final} → ${up.original}`);
  }
  assert.equal(originalFromDiscount(65, 35)!.original, 100);
  assert.equal(originalFromDiscount(75000, 25)!.original, 100000);
});

test('되짚을 수 없는 할인은 null이다', () => {
  assert.equal(originalFromDiscount(50, 100), null, '100% 할인은 0으로 나눈다');
  assert.equal(originalFromDiscount(50, 120), null);
  assert.equal(originalFromDiscount(0, 30), null);
  assert.equal(discountFromRate(100, [120]), null);
  assert.equal(discountFromRate(100, []), null);
  assert.equal(discountFromRate(0, [30]), null);
  assert.equal(discountFromPrices(100, 120), null, '할인가가 정가보다 비싸다');
});
