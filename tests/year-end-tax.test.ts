/**
 * 연말정산 — 구간의 경계를 1원 차이로 밟아 본다.
 *
 * 이 계산에는 꺾이는 자리가 많다. 근로소득공제가 네 번, 근로소득세액공제의
 * 한도가 네 번, 기본세율이 여덟 번 꺾인다. 구간식을 옮겨 적을 때 흔히
 * 나는 실수는 **경계에서 값이 튀는 것**이다 — 총급여 3,300만원과
 * 3,300만 1원 사이에 몇 만원이 사라지면 그 자리에 선 사람만 틀린 답을
 * 받는다. 그래서 경계마다 양쪽을 나란히 놓고 이어지는지 본다.
 *
 * 다른 하나는 표를 두 곳에 적었는지다. 근로소득공제는 lib/salary.ts,
 * 기본세율은 lib/retirement-income-tax.ts에 이미 있다. 값을 직접 대조하고,
 * 그 표의 숫자가 lib/year-end-tax.ts 안에 다시 적혀 있지 않은지 원문까지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { calcSalary, earningDeduction } from '../lib/salary.ts';
import { TAX_BRACKETS, progressiveTax } from '../lib/retirement-income-tax.ts';
import {
  BASIC_DEDUCTION, CREDIT_STEP, DISABLED_DEDUCTION, ELDERLY_DEDUCTION, LOCAL_RATE,
  calcYearEnd, childCredit, earnedIncomeCredit, earnedIncomeCreditLimit,
  earningDeductionWon, estimatePremiums, personalDeduction,
} from '../lib/year-end-tax.ts';

/** 본인만 있고 공제도 안 넣은 기본 입력 — 필요한 칸만 바꿔 쓴다 */
const base = {
  grossSalary: 40_000_000,
  dependents: 0,
  elderly: 0,
  disabled: 0,
  children: 0,
  pensionPremium: 1_800_000,
  insurancePremium: 1_960_000,
  otherIncomeDeduction: 0,
  taxCredits: 0,
  prepaid: 1_200_000,
};

test('근로소득공제는 lib/salary.ts의 값과 같다', () => {
  for (const man of [300, 500, 1500, 2400, 4500, 8000, 10000, 15000, 30000]) {
    const won = man * 10_000;
    assert.ok(
      Math.abs(earningDeductionWon(won) - earningDeduction(man) * 10_000) < 1e-6,
      `${man}만원`,
    );
  }
  assert.equal(earningDeductionWon(0), 0);
  assert.equal(earningDeductionWon(-1_000_000), 0);

  // 손으로 셈한 값 — 총급여 4,000만원이면 750 + 2,500 × 15% = 1,125만원
  assert.equal(earningDeductionWon(40_000_000), 11_250_000);
  // 공제는 2,000만원에서 멈춘다 — 총급여가 아무리 커도 더 늘지 않는다
  assert.equal(earningDeductionWon(1_000_000_000), 20_000_000);
});

test('근로소득공제는 구간 경계에서 튀지 않는다', () => {
  // 500만·1,500만·4,500만·1억에서 공제율이 꺾인다
  for (const edge of [5_000_000, 15_000_000, 45_000_000, 100_000_000]) {
    const before = earningDeductionWon(edge);
    const after = earningDeductionWon(edge + 1);
    // 1원 더 벌었는데 공제가 1원 넘게 달라지면 구간을 잘못 이은 것이다
    assert.ok(Math.abs(after - before) <= 1, `${edge}원 경계: ${before} → ${after}`);
    // 소득이 늘면 공제도 줄지 않는다
    assert.ok(after >= before, `${edge}원 경계에서 공제가 줄었다`);
  }

  // 경계 앞뒤를 손으로 셈해 맞춰 본다
  assert.equal(earningDeductionWon(5_000_000), 3_500_000);   // 500 × 70%
  assert.equal(earningDeductionWon(15_000_000), 7_500_000);  // 350 + 1,000 × 40%
  assert.equal(earningDeductionWon(45_000_000), 12_000_000); // 750 + 3,000 × 15%
  assert.equal(earningDeductionWon(100_000_000), 14_750_000); // 1,200 + 5,500 × 5%
});

test('근로소득세액공제 한도는 총급여 구간 경계에서 이어진다', () => {
  // 3,300만 / 7,000만 / 1억2천만에서 산식이 바뀐다
  for (const edge of [33_000_000, 70_000_000, 120_000_000]) {
    const before = earnedIncomeCreditLimit(edge);
    const after = earnedIncomeCreditLimit(edge + 1);
    assert.ok(Math.abs(after - before) <= 1, `${edge}원 경계: ${before} → ${after}`);
  }

  // 구간마다 손으로 셈한 값
  assert.equal(earnedIncomeCreditLimit(30_000_000), 740_000);
  assert.equal(earnedIncomeCreditLimit(33_000_000), 740_000);
  // 3,300만 초과분의 0.8% — 4,000만이면 74만 − 5.6만 = 68.4만
  assert.equal(earnedIncomeCreditLimit(40_000_000), 684_000);
  // 4,300만부터는 바닥 66만원에 걸려 평평해진다
  assert.equal(earnedIncomeCreditLimit(43_000_000), 660_000);
  assert.equal(earnedIncomeCreditLimit(70_000_000), 660_000);
  // 7,000만 초과분의 절반 — 8,000만이면 66만 − 500만이라 바닥 50만원
  assert.equal(earnedIncomeCreditLimit(80_000_000), 500_000);
  assert.equal(earnedIncomeCreditLimit(120_000_000), 500_000);
  assert.equal(earnedIncomeCreditLimit(300_000_000), 200_000);

  // 총급여가 오를 때 한도는 절대 늘지 않는다
  let prev = Infinity;
  for (let g = 0; g <= 200_000_000; g += 1_000_000) {
    const limit = earnedIncomeCreditLimit(g);
    assert.ok(limit <= prev + 1e-9, `${g}원에서 한도가 늘었다`);
    assert.ok(limit >= 200_000, `${g}원에서 한도가 바닥 아래로 갔다`);
    prev = limit;
  }
});

test('근로소득세액공제는 130만원에서 55%와 30%로 갈린다', () => {
  // 한도가 가장 큰 총급여(3,300만 이하)에서 산식만 본다
  const g = 30_000_000;
  assert.equal(earnedIncomeCredit(1_000_000, g), 550_000);          // 100만 × 55%
  assert.equal(earnedIncomeCredit(CREDIT_STEP, g), 715_000);        // 130만 × 55%
  assert.equal(earnedIncomeCredit(1_350_000, g), 730_000);          // 71.5만 + 5만 × 30%

  // 경계에서 이어진다 — 130만원과 130만 1원 사이에 값이 튀면 안 된다
  const before = earnedIncomeCredit(CREDIT_STEP, g);
  const after = earnedIncomeCredit(CREDIT_STEP + 1, g);
  assert.ok(after >= before && after - before <= 1, `${before} → ${after}`);

  // 산출세액이 없으면 공제도 없고, 한도를 넘겨 받지도 못한다
  assert.equal(earnedIncomeCredit(0, g), 0);
  assert.equal(earnedIncomeCredit(-500_000, g), 0);
  assert.equal(earnedIncomeCredit(100_000_000, g), earnedIncomeCreditLimit(g));
  assert.equal(earnedIncomeCredit(100_000_000, 200_000_000), 200_000);
});

test('인적공제와 자녀세액공제는 법이 정한 금액이다', () => {
  // 본인만이면 150만원
  assert.equal(personalDeduction({ dependents: 0, elderly: 0, disabled: 0 }), BASIC_DEDUCTION);
  // 배우자와 자녀 둘이면 본인까지 네 명 × 150만원
  assert.equal(personalDeduction({ dependents: 3, elderly: 0, disabled: 0 }), 6_000_000);
  // 추가공제는 기본공제에 얹는다 — 70세 부모 한 명이면 150 + 100만원이 더 붙는다
  assert.equal(
    personalDeduction({ dependents: 1, elderly: 1, disabled: 0 }),
    BASIC_DEDUCTION * 2 + ELDERLY_DEDUCTION,
  );
  assert.equal(
    personalDeduction({ dependents: 1, elderly: 0, disabled: 1 }),
    BASIC_DEDUCTION * 2 + DISABLED_DEDUCTION,
  );
  // 음수를 넣어도 본인 몫보다 줄지 않는다
  assert.equal(personalDeduction({ dependents: -5, elderly: -2, disabled: -1 }), BASIC_DEDUCTION);

  // 첫째 15만, 둘째 20만, 셋째부터 30만원씩
  assert.equal(childCredit(0), 0);
  assert.equal(childCredit(1), 150_000);
  assert.equal(childCredit(2), 350_000);
  assert.equal(childCredit(3), 650_000);
  assert.equal(childCredit(4), 950_000);
  // 자녀가 늘 때 공제가 줄지 않는다
  for (let n = 1; n <= 8; n++) assert.ok(childCredit(n) > childCredit(n - 1), `${n}명`);
});

test('세율표와 보험요율을 여기 다시 적지 않았다', () => {
  const src = readFileSync(join(import.meta.dirname, '..', 'lib', 'year-end-tax.ts'), 'utf8');

  // 기본세율표의 누진공제액이 이 파일에 있으면 표를 옮겨 적은 것이다
  for (const [, , deduct] of TAX_BRACKETS) {
    if (deduct === 0) continue;
    const literal = deduct.toLocaleString('en-US').replace(/,/g, '_');
    assert.ok(!src.includes(literal), `기본세율표의 ${literal}이 다시 적혀 있다`);
  }
  // 4대보험 요율도 lib/salary.ts에만 있어야 한다
  for (const rate of ['0.045', '0.03545', '0.1295', '0.009']) {
    assert.ok(!src.includes(rate), `보험요율 ${rate}이 다시 적혀 있다`);
  }

  // 산출세액은 progressiveTax가 낸 값 그대로여야 한다
  for (const gross of [24_000_000, 40_000_000, 68_000_000, 130_000_000]) {
    const r = calcYearEnd({ ...base, grossSalary: gross });
    assert.equal(r.calculatedTax, progressiveTax(r.taxBase), `${gross}원`);
    assert.equal(r.earningDeduction, earningDeduction(gross / 10_000) * 10_000, `${gross}원`);
  }

  // 보험료 어림값도 calcSalary에서 온다
  for (const gross of [30_000_000, 60_000_000, 120_000_000]) {
    const s = calcSalary(gross, 1, false);
    const p = estimatePremiums(gross);
    assert.equal(p.pension, s.pension * 12, `${gross}원 국민연금`);
    assert.equal(p.insurance, (s.health + s.longCare + s.employment) * 12, `${gross}원 보험료`);
  }
  assert.deepEqual(estimatePremiums(0), { pension: 0, insurance: 0 });
});

test('총급여 4,000만원 한 사람을 끝까지 셈해 본다', () => {
  const r = calcYearEnd(base);

  assert.equal(r.earningDeduction, 11_250_000);
  assert.equal(r.earnedIncome, 28_750_000);            // 4,000만 − 1,125만
  assert.equal(r.personalDeduction, 1_500_000);
  assert.equal(r.incomeDeductions, 5_260_000);         // 150만 + 180만 + 196만
  assert.equal(r.taxBase, 23_490_000);                 // 2,875만 − 526만
  assert.equal(r.calculatedTax, 2_263_500);            // 2,349만 × 15% − 126만
  assert.equal(r.creditLimit, 684_000);
  assert.equal(r.earnedIncomeCredit, 684_000);         // 100.4만이지만 한도에 걸린다
  assert.equal(r.finalTax, 1_579_500);                 // 226.35만 − 68.4만
  assert.equal(r.localTax, 157_950);                   // 결정세액의 10%

  // 기납부 120만 < 결정 157.95만 → 37.95만원을 더 내야 한다
  assert.equal(r.refund, -379_500);
  assert.ok(Math.abs(r.localRefund - -37_950) < 1e-9);
  assert.ok(Math.abs(r.totalRefund - -417_450) < 1e-9);
  assert.ok(Math.abs(r.effectiveRate - 3.94875) < 1e-9);
});

test('기납부세액이 많으면 환급, 적으면 추가납부로 부호가 뒤집힌다', () => {
  const decided = calcYearEnd({ ...base, prepaid: 0 }).finalTax;
  assert.ok(decided > 0);

  const more = calcYearEnd({ ...base, prepaid: decided + 500_000 });
  assert.equal(more.refund, 500_000);
  assert.ok(more.refund > 0, '더 냈는데 환급이 아니다');
  assert.ok(Math.abs(more.totalRefund - 550_000) < 1e-9, '지방소득세 10%가 같이 따라온다');

  const less = calcYearEnd({ ...base, prepaid: decided - 500_000 });
  assert.equal(less.refund, -500_000);
  assert.ok(less.refund < 0, '덜 냈는데 추가납부가 아니다');

  const same = calcYearEnd({ ...base, prepaid: decided });
  assert.equal(same.refund, 0);
  assert.equal(same.totalRefund, 0);

  // 결정세액은 기납부세액과 무관하다 — 낸 만큼이 아니라 벌고 공제받은 만큼 정해진다
  assert.equal(more.finalTax, less.finalTax);
  assert.equal(more.finalTax, decided);
  // 환급액은 기납부와 결정의 차이 그대로다
  assert.equal(more.refund, decided + 500_000 - more.finalTax);
});

test('공제가 많아 결정세액이 0이면 환급이 기납부세액을 넘지 않는다', () => {
  // 총급여가 적어 과세표준부터 0인 경우 — 근로소득공제와 인적공제만으로 소득이 다 덮인다
  const tiny = estimatePremiums(5_000_000);
  const small = calcYearEnd({
    ...base, grossSalary: 5_000_000, prepaid: 300_000,
    pensionPremium: tiny.pension, insurancePremium: tiny.insurance,
  });
  // 500만 − 근로소득공제 350만 = 150만인데 인적공제만 150만이다
  assert.equal(small.earnedIncome, 1_500_000);
  assert.ok(small.incomeDeductions > small.earnedIncome);
  assert.equal(small.taxBase, 0);
  assert.equal(small.calculatedTax, 0);
  assert.equal(small.finalTax, 0);
  assert.equal(small.localTax, 0);
  assert.equal(small.refund, 300_000, '낸 것을 그대로 돌려받는 것이 최대다');

  // 세액공제를 산출세액보다 크게 넣어도 결정세액은 0에서 멈춘다
  const over = calcYearEnd({ ...base, taxCredits: 100_000_000, prepaid: 900_000 });
  assert.equal(over.finalTax, 0);
  assert.ok(over.creditTotal <= over.calculatedTax, '세액공제가 산출세액을 넘었다');
  assert.equal(over.refund, 900_000);

  // 어떤 입력에서도 환급은 기납부세액을 넘지 못한다 — 안 낸 돈을 돌려받을 수는 없다
  for (const gross of [8_000_000, 20_000_000, 45_000_000, 90_000_000]) {
    for (const prepaid of [0, 200_000, 3_000_000]) {
      for (const credits of [0, 1_000_000, 50_000_000]) {
        const r = calcYearEnd({ ...base, grossSalary: gross, prepaid, taxCredits: credits });
        assert.ok(r.refund <= prepaid, `${gross}/${prepaid}/${credits}: 환급 ${r.refund}`);
        assert.ok(r.finalTax >= 0 && r.localTax >= 0);
      }
    }
  }
});

test('총급여를 올리면 결정세액이 줄지 않는다', () => {
  // 공제를 고정한 채 총급여만 올린다
  let prev = -1;
  for (let gross = 0; gross <= 300_000_000; gross += 1_000_000) {
    const r = calcYearEnd({ ...base, grossSalary: gross });
    assert.ok(r.finalTax >= prev, `${gross}원에서 결정세액이 줄었다 (${prev} → ${r.finalTax})`);
    assert.ok(r.taxBase <= r.earnedIncome);
    prev = r.finalTax;
  }

  // 보험료까지 총급여에 맞춰 늘려도 마찬가지다
  prev = -1;
  for (let gross = 10_000_000; gross <= 200_000_000; gross += 5_000_000) {
    const p = estimatePremiums(gross);
    const r = calcYearEnd({
      ...base, grossSalary: gross, pensionPremium: p.pension, insurancePremium: p.insurance,
    });
    assert.ok(r.finalTax >= prev, `${gross}원(보험료 연동)에서 결정세액이 줄었다`);
    prev = r.finalTax;
  }

  // 지방소득세는 늘 결정세액의 10%다
  for (const gross of [25_000_000, 55_000_000, 110_000_000]) {
    const r = calcYearEnd({ ...base, grossSalary: gross });
    assert.equal(r.localTax, Math.floor(r.finalTax * LOCAL_RATE), `${gross}원`);
  }
});

test('부양가족과 자녀를 넣으면 세금이 줄어든다', () => {
  const alone = calcYearEnd(base);
  const family = calcYearEnd({ ...base, dependents: 2, children: 2 });

  assert.ok(family.incomeDeductions > alone.incomeDeductions, '인적공제가 안 늘었다');
  assert.ok(family.taxBase < alone.taxBase);
  assert.ok(family.finalTax < alone.finalTax, '가족이 늘었는데 세금이 안 줄었다');
  assert.equal(family.childCredit, 350_000);
  // 소득공제로 줄어든 몫과 세액공제로 줄어든 몫이 함께 반영된다
  assert.ok(family.creditTotal > alone.creditTotal);
});
