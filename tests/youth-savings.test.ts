/**
 * 정부 기여금 적금 — 일반 적금으로 되짚는다.
 *
 * 이 계산의 뼈대는 "일반 적금 + 얹어 준 돈"이다. 그래서 가장 중요한 되짚기는
 * **기여금을 0으로, 비과세를 끄면 일반 적금과 값이 정확히 같아야 한다**는 것이다.
 * 사이트의 적금 계산기가 쓰는 식을 여기 따로 한 번 더 적어 두고 그 값과 맞춘다 —
 * 같은 파일을 불러 비교하면 식이 틀려도 둘이 나란히 틀려서 검사가 통과한다.
 *
 * 나머지는 규칙만 본다. 비율·한도·소득 구간은 상품마다 다르고 해마다 바뀌므로
 * 검사에서도 값을 직접 넣는다 — 여기 적힌 숫자는 어느 상품의 고시값도 아니다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { WITHHOLDING_RATE } from '../lib/interest-tax.ts';
import {
  calcYouthSavings, monthlyMatch, pickTier, plainSavings, savingsInterest,
  type MatchTier,
} from '../lib/youth-savings.ts';

/**
 * 적금 계산기(app/(ko)/calculator/savings/page.tsx)의 식을 그대로 옮긴 것.
 * 비교 대상이므로 lib을 부르지 않고 손으로 적는다.
 */
function refSavings(m: number, n: number, rate: number) {
  const principal = m * n;
  const interest = ((m * n * (n + 1)) / 2) * (rate / 100 / 12);
  const tax = interest * 0.154;
  return { principal, interest, tax, total: principal + interest - tax };
}

/** 검사용 구간표 — 임의의 값이다. 실제 상품의 비율·한도가 아니다 */
const tiers: MatchTier[] = [
  { label: '낮은 구간', incomeCeiling: 24_000_000, matchRate: 0.06, matchLimit: 400_000 },
  { label: '중간 구간', incomeCeiling: 48_000_000, matchRate: 0.03, matchLimit: 600_000 },
  { label: '높은 구간', incomeCeiling: 75_000_000, matchRate: 0.01, matchLimit: 700_000 },
];

const base = {
  monthly: 700_000,
  months: 60,
  annualRate: 5,
  annualIncome: 30_000_000,
  tiers,
  taxFree: false,
};

test('기여금 0 · 비과세 아님이면 일반 적금과 정확히 같다', () => {
  /* 구간표를 비우면 얹어 줄 돈이 없다 — 그러면 이건 그냥 적금이다 */
  for (const monthly of [100_000, 500_000, 700_000]) {
    for (const months of [6, 12, 24, 36, 60]) {
      for (const rate of [2, 4.5, 6]) {
        const r = calcYouthSavings({ ...base, monthly, months, annualRate: rate, tiers: [] });
        const ref = refSavings(monthly, months, rate);

        assert.equal(r.tier, null);
        assert.equal(r.monthlyMatch, 0);
        assert.equal(r.matchTotal, 0);
        assert.equal(r.matchInterest, 0);

        // 사이트의 적금 계산기와 같은 값이어야 한다
        assert.ok(Math.abs(r.principal - ref.principal) < 1e-6, `원금 ${monthly}/${months}`);
        assert.ok(Math.abs(r.grossInterest - ref.interest) < 1e-6, `이자 ${monthly}/${months}/${rate}`);
        assert.ok(Math.abs(r.tax - ref.tax) < 1e-6, `세금 ${monthly}/${months}/${rate}`);
        assert.ok(Math.abs(r.maturity - ref.total) < 1e-6, `만기 ${monthly}/${months}/${rate}`);

        // 비교 기준과도 한 푼도 어긋나지 않는다 — 차액이 정확히 0이다
        assert.equal(r.maturity, r.plainMaturity);
        assert.equal(r.gap, 0);
      }
    }
  }

  /* 비율이 0인 구간에 들어도 마찬가지다 — 구간은 잡히지만 기여금은 없다 */
  const zero = calcYouthSavings({
    ...base,
    tiers: [{ label: '기여금 없음', incomeCeiling: Infinity, matchRate: 0, matchLimit: 700_000 }],
  });
  assert.equal(zero.monthlyMatch, 0);
  assert.equal(zero.gap, 0);
  assert.equal(zero.maturity, refSavings(base.monthly, base.months, base.annualRate).total);
});

test('적금 이자는 회차별 예치 기간을 더한 값이다', () => {
  // 월 10만 × 12개월 × 연 12% → 10만 × 1%/월 × 78 = 78,000원
  assert.ok(Math.abs(savingsInterest(100_000, 12, 12) - 78_000) < 1e-9);
  // 첫 회차는 n개월, 마지막 회차는 1개월치를 받는다 — 1개월 적금은 한 달치뿐이다
  assert.ok(Math.abs(savingsInterest(100_000, 1, 12) - 1_000) < 1e-9);
  // 같은 금리 예금(원금 전체를 12개월)보다 늘 적다
  assert.ok(savingsInterest(100_000, 12, 12) < 100_000 * 12 * 0.12);
  // 개월 수는 정수로 자른다 — 반 달치 회차는 없다
  assert.equal(savingsInterest(100_000, 12.7, 12), savingsInterest(100_000, 12, 12));
});

test('소득 구간은 상한이 낮은 쪽부터 잡힌다', () => {
  assert.equal(pickTier(tiers, 0)?.label, '낮은 구간');
  assert.equal(pickTier(tiers, 24_000_000)?.label, '낮은 구간'); // 경계는 그 구간에 든다
  assert.equal(pickTier(tiers, 24_000_001)?.label, '중간 구간');
  assert.equal(pickTier(tiers, 48_000_000)?.label, '중간 구간');
  assert.equal(pickTier(tiers, 60_000_000)?.label, '높은 구간');

  // 모든 상한을 넘으면 구간 밖이다 — 0원이 아니라 null로 구분한다
  assert.equal(pickTier(tiers, 100_000_000), null);
  assert.equal(pickTier([], 0), null);

  // 넣는 순서가 답을 바꾸지 않는다
  const shuffled = [tiers[2], tiers[0], tiers[1]];
  for (const income of [0, 30_000_000, 50_000_000, 99_000_000]) {
    assert.equal(pickTier(shuffled, income)?.label ?? null, pickTier(tiers, income)?.label ?? null);
  }

  // 맨 위 구간을 Infinity로 적으면 소득이 아무리 높아도 잡힌다
  const openTop: MatchTier[] = [...tiers.slice(0, 2), { ...tiers[2], incomeCeiling: Infinity }];
  assert.equal(pickTier(openTop, 500_000_000)?.label, '높은 구간');
});

test('비율을 두 배로 하면 기여금도 두 배다', () => {
  const tier = { label: '검사', incomeCeiling: Infinity, matchRate: 0.03, matchLimit: 600_000 };
  const doubled = { ...tier, matchRate: 0.06 };

  /* 한도에 안 걸리는 납입액에서 본다 — 걸리면 비례가 깨지는 게 정상이다 */
  for (const monthly of [100_000, 300_000, 600_000]) {
    const a = calcYouthSavings({ ...base, monthly, tiers: [tier] });
    const b = calcYouthSavings({ ...base, monthly, tiers: [doubled] });
    assert.ok(Math.abs(b.monthlyMatch - a.monthlyMatch * 2) < 1e-9, `월 기여금 ${monthly}`);
    assert.ok(Math.abs(b.matchTotal - a.matchTotal * 2) < 1e-9, `기여금 합계 ${monthly}`);
    // 기여금에 붙는 이자도 함께 두 배가 된다
    assert.ok(Math.abs(b.matchInterest - a.matchInterest * 2) < 1e-9, `기여금 이자 ${monthly}`);
    assert.ok(b.gap > a.gap);
  }

  // 손으로 셈한 값 — 월 30만의 3%는 9,000원, 6%면 18,000원
  assert.ok(Math.abs(monthlyMatch(tier, 300_000) - 9_000) < 1e-9);
  assert.ok(Math.abs(monthlyMatch(doubled, 300_000) - 18_000) < 1e-9);
  assert.equal(monthlyMatch(null, 300_000), 0);
});

test('한도를 넘게 넣어도 기여금은 안 늘어난다', () => {
  const tier: MatchTier = { label: '검사', incomeCeiling: Infinity, matchRate: 0.06, matchLimit: 400_000 };

  // 한도까지는 납입액에 비례해 늘어난다
  assert.ok(Math.abs(monthlyMatch(tier, 200_000) - 12_000) < 1e-9);
  assert.ok(Math.abs(monthlyMatch(tier, 400_000) - 24_000) < 1e-9);

  // 한도 위로는 한 푼도 안 늘어난다
  const atLimit = monthlyMatch(tier, 400_000);
  for (const monthly of [400_001, 500_000, 700_000, 10_000_000]) {
    assert.equal(monthlyMatch(tier, monthly), atLimit, `${monthly}`);
  }

  // 한도에 걸린 것을 결과에서 알려 준다
  assert.equal(calcYouthSavings({ ...base, monthly: 400_000, tiers: [tier] }).matchCapped, false);
  assert.equal(calcYouthSavings({ ...base, monthly: 700_000, tiers: [tier] }).matchCapped, true);

  /*
   * 한도를 넘긴 뒤에는 더 넣어도 기여금 합계와 기여금 이자가 그대로여야 한다.
   * 원금과 만기 수령액은 당연히 늘지만, 늘어난 몫은 전부 내 돈이다.
   */
  const a = calcYouthSavings({ ...base, monthly: 500_000, tiers: [tier] });
  const b = calcYouthSavings({ ...base, monthly: 900_000, tiers: [tier] });
  assert.equal(b.matchTotal, a.matchTotal);
  assert.equal(b.matchInterest, a.matchInterest);
  assert.ok(b.maturity > a.maturity);
  // 더 넣을수록 실효 수익률은 오히려 떨어진다 — 기여금이 안 따라오니까
  assert.ok(b.equivalentRate < a.equivalentRate);
});

test('비과세를 켜면 이자소득세만큼 더 받는다', () => {
  for (const monthly of [200_000, 700_000]) {
    for (const rate of [0, 3, 6]) {
      const taxed = calcYouthSavings({ ...base, monthly, annualRate: rate, taxFree: false });
      const free = calcYouthSavings({ ...base, monthly, annualRate: rate, taxFree: true });

      // 이자는 같고 세금만 사라진다
      assert.equal(free.grossInterest, taxed.grossInterest);
      assert.equal(free.tax, 0);
      assert.ok(Math.abs(taxed.tax - taxed.grossInterest * WITHHOLDING_RATE) < 1e-9);

      // 늘어난 만큼이 정확히 그 세금이다
      assert.ok(Math.abs(free.maturity - taxed.maturity - taxed.tax) < 1e-6, `${monthly}/${rate}`);
      assert.ok(Math.abs(free.gap - taxed.gap - taxed.tax) < 1e-6, `차액 ${monthly}/${rate}`);
    }
  }

  // 이율이 0이면 이자가 없으니 비과세도 아무것도 안 바꾼다
  const zero = calcYouthSavings({ ...base, annualRate: 0 });
  assert.equal(zero.grossInterest, 0);
  assert.equal(calcYouthSavings({ ...base, annualRate: 0, taxFree: true }).maturity, zero.maturity);
});

test('기여금과 그 이자가 일반 적금과의 차액을 만든다', () => {
  const r = calcYouthSavings(base);

  /*
   * 차액 = 기여금 + 기여금 이자 − (늘어난 세금)
   * 과세라면 기여금 이자에도 15.4%가 붙으니 그만큼 덜 남는다.
   */
  assert.ok(Math.abs(r.gap - (r.matchTotal + r.matchInterest - (r.tax - r.plainTax))) < 1e-6);
  assert.ok(Math.abs(r.gap - (r.matchTotal + r.matchInterest * (1 - WITHHOLDING_RATE))) < 1e-6);

  // 내 원금에 붙는 이자는 일반 적금과 똑같다 — 달라지는 건 얹어 준 몫뿐이다
  const plain = plainSavings(base.monthly, base.months, base.annualRate);
  assert.ok(Math.abs(r.principalInterest - plain.interest) < 1e-9);
  assert.ok(Math.abs(r.grossInterest - (plain.interest + r.matchInterest)) < 1e-9);

  // 비과세까지 켜면 아낀 세금이 차액에 그대로 더해진다
  const free = calcYouthSavings({ ...base, taxFree: true });
  assert.ok(Math.abs(free.gap - (free.matchTotal + free.matchInterest + plain.tax)) < 1e-6);
});

test('연 환산 수익률을 되짚으면 만기 수령액이 나온다', () => {
  for (const monthly of [100_000, 400_000, 700_000]) {
    for (const months of [12, 36, 60]) {
      for (const taxFree of [false, true]) {
        const r = calcYouthSavings({ ...base, monthly, months, taxFree });

        // 만기 = 원금 × (1 + 연환산수익률 × 연수)
        const back = r.principal * (1 + (r.annualReturn / 100) * (months / 12));
        assert.ok(Math.abs(back - r.maturity) < 1e-6, `연환산 ${monthly}/${months}/${taxFree}`);

        // 같은 만기를 내는 일반 과세 적금 이율을 넣으면 같은 만기가 나온다
        const same = plainSavings(monthly, months, r.equivalentRate);
        assert.ok(Math.abs(same.maturity - r.maturity) < 1e-6, `환산이율 ${monthly}/${months}/${taxFree}`);

        // 기여금이 있으니 실효 이율은 약정 이율보다 늘 높다
        assert.ok(r.equivalentRate > base.annualRate, `${monthly}/${months}/${taxFree}`);
      }
    }
  }

  /* 기여금이 없으면 환산 이율은 약정 이율 그대로다 */
  const plainOnly = calcYouthSavings({ ...base, tiers: [] });
  assert.ok(Math.abs(plainOnly.equivalentRate - base.annualRate) < 1e-9);
});

test('납입액 0 · 기간 0 · 이율 0에서 무너지지 않는다', () => {
  const cases = [
    { ...base, monthly: 0 },
    { ...base, months: 0 },
    { ...base, annualRate: 0 },
    { ...base, monthly: 0, months: 0, annualRate: 0 },
    { ...base, monthly: 0, months: 0, annualRate: 0, tiers: [] },
    { ...base, monthly: -500_000, months: -12, annualRate: -3 },
    { ...base, annualIncome: -1 },
  ];

  for (const input of cases) {
    const r = calcYouthSavings(input);
    for (const [k, v] of Object.entries(r)) {
      if (typeof v === 'number') assert.ok(Number.isFinite(v), `${k}가 유한하지 않다: ${JSON.stringify(input)}`);
    }
    assert.ok(r.principal >= 0);
    assert.ok(r.matchTotal >= 0);
    assert.ok(r.grossInterest >= 0);
    assert.ok(r.maturity >= 0);
    assert.ok(r.gap >= 0); // 기여금은 빼앗아 가지 않는다 — 차액은 음수가 될 수 없다
  }

  // 납입액이 0이면 전부 0이고 나눗셈이 터지지 않는다
  const none = calcYouthSavings({ ...base, monthly: 0 });
  assert.equal(none.maturity, 0);
  assert.equal(none.annualReturn, 0);
  assert.equal(none.equivalentRate, 0);

  // 기간이 0이면 아직 아무것도 안 넣은 것이다
  const notYet = calcYouthSavings({ ...base, months: 0 });
  assert.equal(notYet.principal, 0);
  assert.equal(notYet.matchTotal, 0);
  assert.equal(notYet.maturity, 0);
  assert.equal(notYet.equivalentRate, 0);

  // 이율이 0이면 이자는 없어도 기여금은 그대로 받는다
  const noRate = calcYouthSavings({ ...base, annualRate: 0 });
  assert.equal(noRate.grossInterest, 0);
  assert.ok(noRate.matchTotal > 0);
  assert.ok(Math.abs(noRate.gap - noRate.matchTotal) < 1e-9);
});
