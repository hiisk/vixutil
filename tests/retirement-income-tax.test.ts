import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  serviceYears, serviceDeduction, convertedDeduction, progressiveTax,
  calcRetirementTax, TAX_BRACKETS,
} from '../lib/retirement-income-tax.ts';

test('근속연수는 1년 미만을 올린다', () => {
  assert.equal(serviceYears(0), 0);
  assert.equal(serviceYears(1), 1);
  assert.equal(serviceYears(12), 1);
  assert.equal(serviceYears(13), 2);   // 1년 1개월 → 2년
  assert.equal(serviceYears(63), 6);   // 5년 3개월 → 6년
  assert.equal(serviceYears(120), 10);
});

test('근속연수공제가 구간 경계에서 이어진다', () => {
  // 각 구간의 끝값과 다음 구간의 시작값이 같아야 계단이 안 생긴다.
  assert.equal(serviceDeduction(5), 5_000_000);           // 100만×5
  assert.equal(serviceDeduction(6), 7_000_000);           // 500만 + 200만×1
  assert.equal(serviceDeduction(10), 15_000_000);         // 500만 + 200만×5
  assert.equal(serviceDeduction(11), 17_500_000);         // 1500만 + 250만×1
  assert.equal(serviceDeduction(20), 40_000_000);         // 1500만 + 250만×10
  assert.equal(serviceDeduction(21), 43_000_000);         // 4000만 + 300만×1
  assert.equal(serviceDeduction(30), 70_000_000);         // 4000만 + 300만×10
});

test('환산급여공제가 구간 경계에서 이어진다', () => {
  assert.equal(convertedDeduction(8_000_000), 8_000_000);
  assert.equal(convertedDeduction(70_000_000), 8_000_000 + 62_000_000 * 0.6);   // 45,200,000
  assert.equal(convertedDeduction(100_000_000), 45_200_000 + 30_000_000 * 0.55); // 61,700,000
  assert.equal(convertedDeduction(300_000_000), 61_700_000 + 200_000_000 * 0.45); // 151,700,000
});

test('환산급여공제는 단조 증가한다', () => {
  let prev = -1;
  for (let c = 0; c <= 500_000_000; c += 1_000_000) {
    const d = convertedDeduction(c);
    assert.ok(d >= prev, `${c}에서 공제가 줄었다`);
    prev = d;
  }
});

test('누진세 함수가 알려진 값을 낸다', () => {
  assert.equal(progressiveTax(0), 0);
  assert.equal(progressiveTax(14_000_000), 14_000_000 * 0.06);            // 840,000
  assert.equal(progressiveTax(50_000_000), 50_000_000 * 0.15 - 1_260_000); // 6,240,000
  assert.equal(progressiveTax(100_000_000), 100_000_000 * 0.35 - 15_440_000); // 19,560,000
});

test('누진세는 경계에서 연속이다', () => {
  // 누진공제 방식이 맞다면 각 구간 상한에서 위·아래 세율로 계산한 값이 같아야 한다.
  for (let i = 0; i < TAX_BRACKETS.length - 1; i++) {
    const ceiling = TAX_BRACKETS[i][0];
    const below = ceiling * TAX_BRACKETS[i][1] - TAX_BRACKETS[i][2];
    const above = ceiling * TAX_BRACKETS[i + 1][1] - TAX_BRACKETS[i + 1][2];
    assert.ok(Math.abs(below - above) < 1, `${ceiling} 경계에서 세액 불연속: ${below} vs ${above}`);
  }
});

test('알려진 예시: 근속 10년·퇴직금 5천만원', () => {
  // 손계산:
  //  근속연수공제 = 1,500만
  //  환산급여 = (5000-1500)/10×12 = 4,200만
  //  환산급여공제 = 800만 + (4200-800)×0.6 = 2,840만
  //  과세표준 = 1,360만  → 6% = 81.6만 (환산산출세액)
  //  산출세액 = 81.6만/12×10 = 68만
  const r = calcRetirementTax({ payout: 50_000_000, serviceMonths: 120 });
  assert.equal(r.years, 10);
  assert.equal(r.serviceDeduction, 15_000_000);
  assert.equal(r.convertedSalary, 42_000_000);
  assert.equal(r.convertedDeduction, 28_400_000);
  assert.equal(r.taxBase, 13_600_000);
  assert.equal(r.convertedTax, 816_000);
  assert.equal(r.incomeTax, 680_000);
  assert.equal(r.localTax, 68_000);
  assert.equal(r.totalTax, 748_000);
});

test('오래 일할수록 같은 금액의 세부담이 낮아진다', () => {
  // 연분연승 구조의 핵심. 근속이 길수록 실효세율이 내려가야 한다.
  const short = calcRetirementTax({ payout: 100_000_000, serviceMonths: 60 });
  const long = calcRetirementTax({ payout: 100_000_000, serviceMonths: 360 });
  assert.ok(long.effectiveRate < short.effectiveRate,
    `근속 30년(${long.effectiveRate.toFixed(2)}%)이 5년(${short.effectiveRate.toFixed(2)}%)보다 높다`);
});

test('퇴직급여가 근속연수공제보다 작으면 세금이 0이다', () => {
  // 근속 20년이면 공제가 4천만. 그 이하 퇴직금이면 과세표준이 안 생긴다.
  const r = calcRetirementTax({ payout: 30_000_000, serviceMonths: 240 });
  assert.equal(r.totalTax, 0);
  assert.equal(r.netPayout, 30_000_000);
});

test('지방소득세는 퇴직소득세의 10%다', () => {
  const r = calcRetirementTax({ payout: 200_000_000, serviceMonths: 180 });
  assert.equal(r.localTax, Math.floor(r.incomeTax * 0.1));
  assert.equal(r.totalTax, r.incomeTax + r.localTax);
});

test('세후 실수령 + 총세금 = 퇴직급여', () => {
  const payout = 150_000_000;
  const r = calcRetirementTax({ payout, serviceMonths: 200 });
  assert.equal(r.netPayout + r.totalTax, payout);
});

test('실효세율은 항상 0~퇴직급여 범위 안이다', () => {
  for (const payout of [10_000_000, 50_000_000, 300_000_000, 1_000_000_000]) {
    for (const months of [12, 60, 120, 300, 480]) {
      const r = calcRetirementTax({ payout, serviceMonths: months });
      assert.ok(r.effectiveRate >= 0 && r.effectiveRate < 100, `${payout}/${months}: ${r.effectiveRate}%`);
      assert.ok(r.totalTax >= 0 && r.totalTax < payout, `${payout}/${months}: 세금이 원금 이상`);
    }
  }
});

test('0 또는 음수 입력에서 터지지 않는다', () => {
  // 근속 0개월이면 환산에서 0으로 나눌 뻔한다. 세금 0으로 막는다.
  assert.equal(calcRetirementTax({ payout: 50_000_000, serviceMonths: 0 }).totalTax, 0);
  assert.equal(calcRetirementTax({ payout: 0, serviceMonths: 120 }).totalTax, 0);
  const neg = calcRetirementTax({ payout: -1000, serviceMonths: 120 });
  assert.ok(Number.isFinite(neg.totalTax));
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcRetirementTax({ payout: 88_000_000, serviceMonths: 137 });
  const b = calcRetirementTax({ payout: 88_000_000, serviceMonths: 137 });
  assert.deepEqual(a, b);
});
