/**
 * 신용카드 등 소득공제 — 문턱과 순서와 한도를 지킨다.
 *
 * 세 자리가 무너지기 쉽다. (1) 총급여 25% 문턱 아래에서 공제가 새어 나오는
 * 것, (2) 문턱을 공제율 높은 수단이 먼저 먹어 공제액이 작아지는 것,
 * (3) 한도가 총급여 구간을 잘못 짚는 것이다. 그래서 문턱은 1원 차이로
 * 밟고, 순서는 다섯 수단의 120가지 순서를 모두 견주고, 한도는 경계를
 * 1원 차이로 넘어 본다.
 *
 * 줄어드는 세금은 lib/retirement-income-tax.ts의 progressiveTax를 빌려 쓴
 * 것이므로, 검사도 같은 함수를 직접 불러 값을 맞춰 본다. 표를 여기 다시
 * 적으면 검사가 아니라 복사가 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BASIC_LIMIT_RULES, DEFAULT_RATES, LOCAL_RATE, MEANS_ORDER, THRESHOLD_RATIO,
  basicLimit, calcCardDeduction, deductByOrder, spendingHeadroom, thresholdOrder,
  type Means, type Spending,
} from '../lib/card-deduction.ts';
import { progressiveTax } from '../lib/retirement-income-tax.ts';
import { earningDeduction } from '../lib/salary.ts';
import { earningDeductionWon } from '../lib/year-end-tax.ts';

const none: Spending = { credit: 0, check: 0, market: 0, transit: 0, culture: 0 };
const spend = (part: Partial<Spending>): Spending => ({ ...none, ...part });

test('문턱 아래에서는 공제가 한 푼도 없다', () => {
  assert.equal(THRESHOLD_RATIO, 0.25);

  // 총급여 4,000만원이면 문턱은 1,000만원이다
  const gross = 40_000_000;
  const at = calcCardDeduction({ grossSalary: gross, spending: spend({ credit: 10_000_000 }) });
  assert.equal(at.threshold, 10_000_000);
  assert.equal(at.eligibleSpending, 0);
  assert.equal(at.rawDeduction, 0);
  assert.equal(at.deduction, 0);
  assert.equal(at.belowThreshold, true);
  assert.equal(at.incomeTaxSaved, 0);

  // 문턱을 1원 넘기면 공제 대상이 정확히 1원이다
  const over = calcCardDeduction({ grossSalary: gross, spending: spend({ credit: 10_000_001 }) });
  assert.equal(over.eligibleSpending, 1);
  assert.equal(over.belowThreshold, false);
  assert.ok(Math.abs(over.rawDeduction - 0.15) < 1e-9);
  // 1원의 15%는 원 단위로 내림하면 0원이다 — 공제액이 있는 척하지 않는다
  assert.equal(over.deduction, 0);

  // 수단을 섞어도 문턱은 총사용액으로 잰다
  const mixed = calcCardDeduction({
    grossSalary: gross,
    spending: spend({ credit: 5_000_000, check: 4_000_000, market: 999_999 }),
  });
  assert.equal(mixed.totalSpending, 9_999_999);
  assert.equal(mixed.eligibleSpending, 0);
  assert.equal(mixed.deduction, 0);
});

test('문턱을 신용카드가 먼저 채운다 — 어떤 순서보다 유리하다', () => {
  const gross = 40_000_000;
  const spending = spend({
    credit: 8_000_000, check: 5_000_000, market: 2_000_000, transit: 1_000_000, culture: 1_000_000,
  });
  const r = calcCardDeduction({ grossSalary: gross, spending });

  // 문턱 1,000만원은 신용카드 800만원이 먼저, 남은 200만원은 체크카드가 먹는다
  const by = Object.fromEntries(r.byMeans.map(m => [m.means, m]));
  assert.equal(by.credit.usedForThreshold, 8_000_000);
  assert.equal(by.credit.eligible, 0);
  assert.equal(by.check.usedForThreshold, 2_000_000);
  assert.equal(by.check.eligible, 3_000_000);
  assert.equal(by.market.usedForThreshold, 0);
  assert.equal(by.transit.usedForThreshold, 0);
  assert.equal(by.culture.usedForThreshold, 0);
  // 체크 300만×30% + 도서 100만×30% + 시장 200만×40% + 교통 100만×40%
  assert.ok(Math.abs(r.rawDeduction - 2_400_000) < 1e-6);
  assert.equal(r.deduction, 2_400_000);

  // 다섯 수단의 120가지 순서를 모두 견준다 — 지금 방식이 늘 크거나 같아야 한다
  const permute = (list: Means[]): Means[][] =>
    list.length <= 1 ? [list]
      : list.flatMap((x, i) =>
        permute([...list.slice(0, i), ...list.slice(i + 1)]).map(rest => [x, ...rest]));

  const raws = permute(MEANS_ORDER).map(order =>
    deductByOrder(spending, DEFAULT_RATES, r.threshold, order)
      .reduce((a, m) => a + m.deduction, 0));
  for (const raw of raws) assert.ok(raw <= r.rawDeduction + 1e-6, `${raw} > ${r.rawDeduction}`);
  // 검사가 헛돌지 않는지 — 실제로 더 나쁜 순서가 있어야 한다
  assert.ok(Math.min(...raws) < r.rawDeduction - 1);

  // 뒤집힌 순서는 40%짜리를 먼저 태워 없앤다 — 신용카드 700만원만 남는다
  const reversed = deductByOrder(spending, DEFAULT_RATES, r.threshold, [...MEANS_ORDER].reverse());
  assert.ok(Math.abs(reversed.reduce((a, m) => a + m.deduction, 0) - 1_050_000) < 1e-6);
});

test('차감 순서는 공제율에서 끌어낸다', () => {
  // 기본 공제율에서는 신용카드(15%)가 맨 앞, 40%짜리가 맨 뒤다
  assert.deepEqual(thresholdOrder(DEFAULT_RATES), ['credit', 'check', 'culture', 'market', 'transit']);
  // 어느 해에 체크카드가 신용카드보다 낮아지면 순서도 따라 바뀐다
  assert.deepEqual(
    thresholdOrder({ ...DEFAULT_RATES, check: 0.1 }),
    ['check', 'credit', 'culture', 'market', 'transit'],
  );
});

test('총급여 구간 한도의 경계를 1원 차이로 밟는다', () => {
  assert.deepEqual(BASIC_LIMIT_RULES[0], [70_000_000, 3_000_000]);
  assert.equal(basicLimit(70_000_000), 3_000_000);
  assert.equal(basicLimit(70_000_001), 2_500_000);
  assert.equal(basicLimit(0), 3_000_000);

  // 한도에 안 걸리는 사람은 경계에서 값이 튀지 않는다.
  // 문턱만 0.25원 움직이므로 원 단위로는 1원 안쪽이다.
  const small = spend({ check: 19_000_000 });
  const a = calcCardDeduction({ grossSalary: 70_000_000, spending: small });
  const b = calcCardDeduction({ grossSalary: 70_000_001, spending: small });
  assert.equal(a.basicLimit, 3_000_000);
  assert.equal(b.basicLimit, 2_500_000);
  assert.equal(a.deduction, 450_000);
  assert.ok(Math.abs(a.deduction - b.deduction) <= 1, `${a.deduction} vs ${b.deduction}`);

  // 한도에 걸리는 사람은 딱 한도 차이(50만원)만큼만 달라진다 — 그 이상 튀면 안 된다
  const big = spend({ check: 30_000_000 });
  const c = calcCardDeduction({ grossSalary: 70_000_000, spending: big });
  const d = calcCardDeduction({ grossSalary: 70_000_001, spending: big });
  assert.equal(c.deduction, 3_000_000);
  assert.equal(d.deduction, 2_500_000);
  assert.equal(c.deduction - d.deduction, 500_000);
  assert.equal(c.cappedByLimit, true);
});

test('사용액을 두 배로 하면 대상은 늘지만 공제는 한도에서 멈춘다', () => {
  const gross = 40_000_000;
  const one = calcCardDeduction({ grossSalary: gross, spending: spend({ check: 16_000_000 }) });
  const two = calcCardDeduction({ grossSalary: gross, spending: spend({ check: 32_000_000 }) });

  assert.equal(one.eligibleSpending, 6_000_000);
  assert.equal(one.deduction, 1_800_000);
  assert.equal(one.cappedByLimit, false);

  // 대상 금액은 두 배보다 더 늘었다 — 문턱이 고정이라 그렇다
  assert.equal(two.eligibleSpending, 22_000_000);
  assert.ok(Math.abs(two.rawDeduction - 6_600_000) < 1e-6);
  // 그런데 공제액은 기본한도 300만원에서 멈춘다
  assert.equal(two.deduction, 3_000_000);
  assert.equal(two.deduction, two.basicLimit);
  assert.ok(two.deduction < one.deduction * 2);
  assert.ok(two.deduction < two.rawDeduction);
  assert.equal(two.cappedByLimit, true);
});

test('전통시장·대중교통은 한도를 넘긴 몫이 추가한도로 되살아난다', () => {
  const gross = 40_000_000;
  // 신용카드 1,000만원이 문턱을 정확히 채우고, 전통시장 2,000만원이 그대로 남는다
  const r = calcCardDeduction({
    grossSalary: gross,
    spending: spend({ credit: 10_000_000, market: 20_000_000 }),
  });
  assert.equal(r.eligibleSpending, 20_000_000);
  assert.ok(Math.abs(r.rawDeduction - 8_000_000) < 1e-6);
  assert.equal(r.basicApplied, 3_000_000);
  assert.equal(r.extraApplied, 3_000_000);
  assert.equal(r.deduction, 6_000_000);

  // 추가한도는 입력이다 — 200만원으로 고치면 그만큼만 되살아난다
  const narrow = calcCardDeduction({
    grossSalary: gross,
    spending: spend({ credit: 10_000_000, market: 20_000_000 }),
    extraLimit: 2_000_000,
  });
  assert.equal(narrow.deduction, 5_000_000);

  // 체크카드는 추가한도가 열리지 않는다 — 기본한도에서 끝난다
  const check = calcCardDeduction({
    grossSalary: gross,
    spending: spend({ credit: 10_000_000, check: 20_000_000 }),
  });
  assert.ok(Math.abs(check.rawDeduction - 6_000_000) < 1e-6);
  assert.equal(check.extraApplied, 0);
  assert.equal(check.deduction, 3_000_000);
});

test('줄어드는 세금은 세율 × 공제액이다', () => {
  // 근로소득공제는 lib/salary.ts의 표를 빌려 온다 — 여기 다시 적지 않았음을 대조한다
  assert.equal(earningDeductionWon(60_000_000), earningDeduction(6_000) * 10_000);
  assert.equal(earningDeductionWon(60_000_000), 12_750_000);

  const r = calcCardDeduction({
    grossSalary: 60_000_000,
    spending: spend({ check: 30_000_000 }),
    otherDeduction: 8_000_000,
  });
  // 근로소득금액 4,725만 − 그 밖의 공제 800만 = 과세표준 3,925만 (15% 구간)
  assert.equal(r.taxBaseBefore, 39_250_000);
  assert.equal(r.deduction, 3_000_000);
  assert.equal(r.taxBaseAfter, 36_250_000);

  // progressiveTax를 재사용했음을 값으로 증명한다
  assert.equal(progressiveTax(39_250_000), 4_627_500);
  assert.ok(Math.abs(r.incomeTaxSaved - (progressiveTax(39_250_000) - progressiveTax(36_250_000))) < 1e-6);
  // 두 과세표준이 같은 구간 안이므로 절감액은 세율 × 공제액과 정확히 맞는다
  assert.ok(Math.abs(r.incomeTaxSaved - 0.15 * 3_000_000) < 1e-6);
  assert.ok(Math.abs(r.marginalRate - 0.15) < 1e-9);
  assert.ok(Math.abs(r.localTaxSaved - 45_000) < 1e-6);
  assert.ok(Math.abs(r.totalSaved - 495_000) < 1e-6);
  assert.equal(LOCAL_RATE, 0.1);

  // 공제가 세율 구간을 걸치면 절감액도 두 세율에 걸린다
  const across = calcCardDeduction({
    grossSalary: 80_000_000,
    spending: spend({ check: 30_000_000 }),
    otherDeduction: 15_250_000,
  });
  assert.equal(across.taxBaseBefore, 51_000_000); // 24% 구간 첫머리
  assert.equal(across.deduction, 2_500_000);      // 총급여 7천만 초과라 한도 250만
  assert.equal(across.taxBaseAfter, 48_500_000);  // 15% 구간으로 내려온다
  assert.ok(Math.abs(across.incomeTaxSaved - 465_000) < 1e-6);
  // 실제로 붙은 세율은 15%와 24% 사이다 — 한쪽 세율만 곱하면 틀린다
  assert.ok(across.marginalRate > 0.15 && across.marginalRate < 0.24);
  assert.ok(Math.abs(across.marginalRate - 0.186) < 1e-9);

  // 같은 공제액도 소득이 낮으면 덜 아낀다 — 소득공제라 그렇다
  const low = calcCardDeduction({
    grossSalary: 30_000_000,
    spending: spend({ check: 20_000_000 }),
    otherDeduction: 7_250_000,
  });
  assert.equal(low.taxBaseBefore, 13_000_000); // 6% 구간 안이다
  assert.equal(low.deduction, 3_000_000);
  assert.ok(low.incomeTaxSaved < r.incomeTaxSaved);
  assert.ok(Math.abs(low.marginalRate - 0.06) < 1e-9);
});

test('얼마를 더 써야 공제가 늘어나는지 되짚는다', () => {
  const gross = 40_000_000;
  const empty = spendingHeadroom({ grossSalary: gross, spending: none });
  assert.equal(empty.toThreshold, 10_000_000);
  assert.equal(empty.overThreshold, 0);
  assert.equal(empty.limitLeft, 3_000_000);
  // 문턱 1,000만원 + 한도 300만원 ÷ 30% = 2,000만원
  assert.equal(empty.moreByCheck, 20_000_000);
  // 신용카드로 채우려면 1,000만 + 300만 ÷ 15% = 3,000만원 — 훨씬 많이 써야 한다
  assert.equal(empty.moreByCredit, 30_000_000);
  assert.ok(empty.moreByCredit > empty.moreByCheck);

  // 되짚은 금액을 실제로 넣으면 한도가 정확히 찬다
  const byCheck: Spending = spend({ check: empty.moreByCheck });
  const byCredit: Spending = spend({ credit: empty.moreByCredit });
  for (const spending of [byCheck, byCredit]) {
    assert.equal(calcCardDeduction({ grossSalary: gross, spending }).deduction, 3_000_000);
    // 다 찼으면 더 써도 늘지 않는다 — 0을 낸다
    const after = spendingHeadroom({ grossSalary: gross, spending });
    assert.equal(after.limitLeft, 0);
    assert.equal(after.moreByCheck, 0);
    assert.equal(after.moreByCredit, 0);
  }

  // 문턱을 이미 넘겼으면 남은 한도만 채우면 된다
  const over = spendingHeadroom({ grossSalary: gross, spending: spend({ check: 12_000_000 }) });
  assert.equal(over.toThreshold, 0);
  assert.equal(over.overThreshold, 2_000_000);
  assert.equal(over.limitLeft, 2_400_000);
  assert.equal(over.moreByCheck, 8_000_000);
});

test('총급여 0·사용액 0 같은 경계에서도 숫자가 깨지지 않는다', () => {
  const zero = calcCardDeduction({ grossSalary: 0, spending: none });
  assert.equal(zero.threshold, 0);
  assert.equal(zero.totalSpending, 0);
  assert.equal(zero.eligibleSpending, 0);
  assert.equal(zero.deduction, 0);
  assert.equal(zero.marginalRate, 0);
  assert.equal(zero.taxBaseBefore, 0);
  assert.equal(zero.incomeTaxSaved, 0);
  assert.equal(zero.totalSaved, 0);
  assert.equal(zero.belowThreshold, true);

  // 총급여가 0이면 문턱도 0이라 공제액은 나오지만, 낼 세금이 없으니 절감액은 0이다
  const noSalary = calcCardDeduction({ grossSalary: 0, spending: spend({ check: 1_000_000 }) });
  assert.equal(noSalary.deduction, 300_000);
  assert.equal(noSalary.incomeTaxSaved, 0);
  assert.equal(noSalary.marginalRate, 0);

  // 음수는 0으로 본다
  const negative = calcCardDeduction({
    grossSalary: -1,
    spending: spend({ credit: -5_000_000, check: 1_000_000 }),
    extraLimit: -1,
    otherDeduction: -1,
  });
  assert.equal(negative.threshold, 0);
  assert.equal(negative.totalSpending, 1_000_000);
  assert.equal(negative.extraLimit, 0);
  assert.equal(negative.deduction, 300_000);

  // 사용액이 0이면 수단별 내역도 모두 0이다 (다섯 줄은 그대로 나온다)
  assert.equal(zero.byMeans.length, 5);
  for (const m of zero.byMeans) {
    assert.equal(m.spending, 0);
    assert.equal(m.eligible, 0);
    assert.equal(m.deduction, 0);
    assert.equal(m.usedForThreshold, 0);
  }
});
