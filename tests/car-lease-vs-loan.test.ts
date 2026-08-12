/**
 * 현금·할부·리스 비교 — 셈을 다른 길로 되짚는다.
 *
 * 가장 중요한 되짚기는 **선수금 100%·금리 0%면 할부가 현금과 똑같아진다**는
 * 것이다. 빌린 돈이 없으면 첫날에 차값 전액을 내는 셈이라 두 방식이 같은 돈을
 * 같은 날에 내고, 기간 말에 같은 차가 남는다. 이 둘이 어긋나면 총비용을 세는
 * 길 어딘가가 방식마다 다르게 굴러가고 있다는 뜻이다.
 *
 * 기간 말 환산도 두 길로 확인한다 — 닫힌 식(streamAtEnd)과 한 달씩 옮겨 더한
 * 값이 같아야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  atEnd, comparePlans, loanPart, residualValue, streamAtEnd,
  type CarPlanInput, type Comparison, type PlanKey,
} from '../lib/car-lease-vs-loan.ts';

/**
 * 4,000만원짜리 차를 3년 보는 자리.
 *
 * 리스는 보증금·선수금 없이 월 70만원에 취등록세·보험을 리스료가 안고, 만기에
 * 반납하는 가장 단순한 모양으로 둔다. 검사마다 필요한 칸만 바꿔 쓴다.
 */
const base: CarPlanInput = {
  price: 40_000_000,
  months: 36,
  upfrontFee: 2_800_000,
  annualDepreciation: 15,
  opportunityRate: 0,
  annualInsurance: 0,
  loanDown: 0,
  loanRate: 0,
  leaseDeposit: 0,
  leaseDepositReturned: false,
  leasePrepaid: 0,
  leaseMonthly: 700_000,
  leaseIncludesFee: true,
  leaseIncludesInsurance: true,
  leaseBuyout: null,
};

const mk = (over: Partial<CarPlanInput>): CarPlanInput => ({ ...base, ...over });
const of = (c: Comparison, key: PlanKey) => c.plans.find(p => p.key === key)!;

test('선수금 100%에 금리 0%면 현금과 할부가 같다', () => {
  const c = comparePlans(mk({ loanDown: 40_000_000, loanRate: 0 }));
  // 빌린 것이 없으니 갚을 것도 없다
  assert.equal(c.loan.principal, 0);
  assert.equal(c.loan.monthly, 0);
  assert.equal(of(c, 'loan').monthly, 0);
  assert.ok(Math.abs(of(c, 'cash').total - of(c, 'loan').total) < 1e-9);
  // 손으로 셈한 값 — 차값 4,000만 + 초기비용 280만에서 잔가를 뺀 것
  assert.ok(Math.abs(of(c, 'cash').total - (42_800_000 - c.residual)) < 1e-6);
  assert.equal(of(c, 'cash').paidOut, 42_800_000);

  // 선수금이 전액이면 금리를 올려도 붙을 이자가 없다 — 여전히 현금과 같다
  for (const loanRate of [0, 3.9, 5.9, 12]) {
    const r = comparePlans(mk({ loanDown: 40_000_000, loanRate }));
    assert.equal(r.loan.totalInterest, 0);
    assert.ok(Math.abs(of(r, 'cash').total - of(r, 'loan').total) < 1e-9, `금리 ${loanRate}`);
  }

  // 기회수익률을 올려도 같다 — 같은 돈이 같은 날 나가므로 기회비용까지 같다
  for (const opportunityRate of [0, 3, 7.5, 12]) {
    const r = comparePlans(mk({
      loanDown: 40_000_000, loanRate: 0, opportunityRate, annualInsurance: 1_200_000,
    }));
    const cash = of(r, 'cash');
    const loan = of(r, 'loan');
    assert.ok(Math.abs(cash.total - loan.total) < 1e-9, `기회수익률 ${opportunityRate}`);
    assert.ok(Math.abs(cash.opportunityCost - loan.opportunityCost) < 1e-9);
    if (opportunityRate > 0) assert.ok(cash.opportunityCost > 0);
  }

  // 선수금이 조금이라도 모자라면 이자가 붙어 할부가 더 비싸진다
  const partial = comparePlans(mk({ loanDown: 30_000_000, loanRate: 5.9 }));
  assert.ok(partial.loan.totalInterest > 0);
  assert.ok(of(partial, 'loan').total > of(partial, 'cash').total);
});

test('잔존가치를 0으로 두면 그만큼 총비용이 커진다', () => {
  const kept = comparePlans(mk({ annualDepreciation: 15 }));
  // 감가율 100%면 기간 말에 아무 값도 안 남는다
  const gone = comparePlans(mk({ annualDepreciation: 100 }));
  assert.equal(gone.residual, 0);
  assert.ok(kept.residual > 0);
  assert.ok(kept.residual < 40_000_000);
  // 3년에 해마다 15%면 산 값의 61.4%가 남는다
  assert.ok(Math.abs(kept.residual - 40_000_000 * 0.85 ** 3) < 1e-6);

  for (const key of ['cash', 'loan'] as const) {
    const a = of(kept, key);
    const b = of(gone, key);
    // 차이는 정확히 잔가만큼이다
    assert.ok(Math.abs(b.total - a.total - kept.residual) < 1e-6, key);
    // 나간 돈은 똑같다 — 달라진 것은 손에 남는 값뿐이다
    assert.equal(a.paidOut, b.paidOut);
    assert.equal(a.opportunityCost, b.opportunityCost);
  }

  // 감가율이 높을수록 남는 값이 적고 총비용이 크다
  let prevResidual = Infinity;
  let prevTotal = -Infinity;
  for (const annualDepreciation of [5, 10, 15, 25, 40]) {
    const r = comparePlans(mk({ annualDepreciation }));
    assert.ok(r.residual < prevResidual, `${annualDepreciation}% 잔가`);
    assert.ok(of(r, 'cash').total > prevTotal, `${annualDepreciation}% 총비용`);
    prevResidual = r.residual;
    prevTotal = of(r, 'cash').total;
  }

  // 잔가는 개월수를 해로 바꿔 정률법에 넣은 값이다
  assert.ok(Math.abs(residualValue(40_000_000, 15, 18) - 40_000_000 * 0.85 ** 1.5) < 1e-6);
  assert.equal(residualValue(40_000_000, 15, 0), 40_000_000);
});

test('리스를 반납하면 잔존가치가 총비용에서 빠지지 않는다', () => {
  const back = comparePlans(mk({ leaseBuyout: null }));
  // 인수금 0원 — 나간 돈은 반납과 똑같고, 차가 내 것이 되는 것만 다르다
  const free = comparePlans(mk({ leaseBuyout: 0 }));

  assert.equal(of(back, 'lease').residual, 0);
  assert.equal(of(free, 'lease').residual, back.residual);
  assert.equal(of(back, 'lease').paidOut, of(free, 'lease').paidOut);
  // 반납하는 쪽이 정확히 잔가만큼 비싸다 — 이 한 줄이 리스 비교의 핵심이다
  assert.ok(Math.abs(of(back, 'lease').total - of(free, 'lease').total - back.residual) < 1e-6);

  // 현금·할부는 인수 여부와 아무 상관이 없다
  assert.equal(of(back, 'cash').total, of(free, 'cash').total);
  assert.equal(of(back, 'loan').total, of(free, 'loan').total);

  // 인수금을 내면 그만큼 총비용이 늘어난다
  const buy = comparePlans(mk({ leaseBuyout: 12_000_000 }));
  assert.ok(Math.abs(of(buy, 'lease').total - of(free, 'lease').total - 12_000_000) < 1e-6);
  // 만기에 내는 돈이라 기회비용은 붙지 않는다 — 수익률을 올려도 차액이 그대로다
  const buy8 = comparePlans(mk({ leaseBuyout: 12_000_000, opportunityRate: 8 }));
  const free8 = comparePlans(mk({ leaseBuyout: 0, opportunityRate: 8 }));
  assert.ok(Math.abs(of(buy8, 'lease').total - of(free8, 'lease').total - 12_000_000) < 1e-6);

  // 잔가보다 비싼 값에 인수하면 반납하는 것보다 손해다
  const overpay = comparePlans(mk({ leaseBuyout: Math.ceil(back.residual) + 1_000_000 }));
  assert.ok(of(overpay, 'lease').total > of(back, 'lease').total);
});

test('기간을 늘리면 월 상환액은 줄고 총 이자는 는다', () => {
  let prevMonthly = Infinity;
  let prevInterest = -Infinity;
  for (const months of [24, 36, 48, 60, 72, 84]) {
    const p = loanPart(mk({ months, loanDown: 5_000_000, loanRate: 5.9 }));
    assert.equal(p.principal, 35_000_000);
    assert.ok(p.monthly < prevMonthly, `${months}개월 월 상환액`);
    assert.ok(p.totalInterest > prevInterest, `${months}개월 총 이자`);
    // 갚는 돈의 합은 원금과 이자의 합이다
    assert.ok(Math.abs(p.totalPaid - (p.principal + p.totalInterest)) < 1e-6);
    prevMonthly = p.monthly;
    prevInterest = p.totalInterest;
  }

  // 금리가 0이면 기간을 늘려도 이자가 안 붙는다 — 원금을 개월로 나눈 값뿐이다
  for (const months of [24, 84]) {
    const p = loanPart(mk({ months, loanDown: 5_000_000, loanRate: 0 }));
    assert.ok(Math.abs(p.totalInterest) < 1e-6, `${months}개월`);
    assert.ok(Math.abs(p.monthly - 35_000_000 / months) < 1e-9);
  }

  // 선수금은 차값을 넘길 수 없다 — 넘겨 넣어도 빌릴 것이 0이 될 뿐이다
  const over = loanPart(mk({ loanDown: 90_000_000, loanRate: 5.9 }));
  assert.equal(over.principal, 0);
  assert.equal(over.monthly, 0);
  assert.equal(of(comparePlans(mk({ loanDown: 90_000_000 })), 'loan').upfront, 42_800_000);
});

test('순위는 총비용 순서와 같다', () => {
  const cases: Partial<CarPlanInput>[] = [
    {},
    { leaseMonthly: 300_000 },
    { leaseMonthly: 1_500_000 },
    { loanDown: 10_000_000, loanRate: 5.9 },
    { loanDown: 0, loanRate: 12, opportunityRate: 9 },
    { opportunityRate: 15, annualDepreciation: 30 },
    { leaseBuyout: 15_000_000, leaseDeposit: 5_000_000, leaseDepositReturned: true },
    { leasePrepaid: 8_000_000, leaseIncludesFee: false, annualInsurance: 1_500_000 },
    { months: 84, loanRate: 7.5, leaseMonthly: 550_000, opportunityRate: 4 },
  ];

  for (const over of cases) {
    const r = comparePlans(mk(over));
    const totals = r.plans.map(p => p.total);
    const sorted = [...totals].sort((a, b) => a - b);
    const label = JSON.stringify(over);

    // ranked는 오름차순이고, 세 방식을 하나도 잃지 않는다
    assert.deepEqual(r.ranked.map(p => p.total), sorted, label);
    assert.deepEqual([...r.ranked.map(p => p.key)].sort(), ['cash', 'lease', 'loan'], label);
    assert.equal(r.best.total, sorted[0], label);
    assert.equal(r.best.rank, 1, label);
    assert.equal(r.best.gap, 0, label);

    for (const p of r.plans) {
      // 순위는 ranked에서의 자리와 같다
      assert.equal(p.rank, r.ranked.findIndex(x => x.key === p.key) + 1, `${label} ${p.key}`);
      assert.ok(Math.abs(p.gap - (p.total - sorted[0])) < 1e-9, `${label} ${p.key} 차액`);
      assert.ok(p.gap >= 0, `${label} ${p.key}`);
      // 앞선 순위가 더 싸다
      for (const q of r.plans) {
        if (p.rank < q.rank) assert.ok(p.total <= q.total, `${label} ${p.key} < ${q.key}`);
      }
    }
  }

  // 리스료를 올리면 리스가 순위에서 밀린다
  const cheap = comparePlans(mk({ leaseMonthly: 300_000 }));
  const dear = comparePlans(mk({ leaseMonthly: 1_500_000 }));
  assert.equal(of(cheap, 'lease').rank, 1);
  assert.equal(of(dear, 'lease').rank, 3);
  assert.ok(of(dear, 'lease').gap > 0);
});

test('기회수익률 0이면 총비용은 나간 돈에서 남는 것을 뺀 것이다', () => {
  const r = comparePlans(mk({
    opportunityRate: 0,
    loanDown: 5_000_000, loanRate: 5.9,
    leaseDeposit: 5_000_000, leaseDepositReturned: true, leasePrepaid: 3_000_000,
    leaseBuyout: 12_000_000, leaseIncludesFee: false, annualInsurance: 1_200_000,
  }));
  for (const p of r.plans) {
    assert.equal(p.opportunityCost, 0, p.key);
    assert.ok(Math.abs(p.total - (p.paidOut - p.residual - p.refund)) < 1e-6, p.key);
    // 나간 돈은 첫날 목돈 + 매달 × 개월수 + 만기 인수금이다
    assert.ok(Math.abs(p.paidOut - (p.upfront + p.monthly * 36 + p.endPayment)) < 1e-6, p.key);
  }
  // 리스 첫날 목돈은 보증금 + 선수금 + (리스료에 안 든) 초기비용이다
  assert.equal(of(r, 'lease').upfront, 5_000_000 + 3_000_000 + 2_800_000);
  assert.equal(of(r, 'lease').refund, 5_000_000);
  assert.equal(of(r, 'lease').endPayment, 12_000_000);
});

test('기회수익률을 올리면 앞당겨 낸 돈이 많은 쪽이 더 불리해진다', () => {
  const over = { loanDown: 5_000_000, loanRate: 5.9 };
  const lo = comparePlans(mk({ ...over, opportunityRate: 0 }));
  const hi = comparePlans(mk({ ...over, opportunityRate: 10 }));

  const rise = (key: PlanKey) => of(hi, key).total - of(lo, key).total;
  // 현금은 첫날에 전액을 내므로 가장 크게 불리해진다
  assert.ok(rise('cash') > rise('loan'), '현금 > 할부');
  assert.ok(rise('loan') > rise('lease'), '할부 > 리스');
  assert.ok(rise('lease') > 0);
  // 나간 돈은 그대로다 — 늘어난 것은 기회비용뿐이다
  assert.equal(of(hi, 'cash').paidOut, of(lo, 'cash').paidOut);
  assert.ok(Math.abs(rise('cash') - of(hi, 'cash').opportunityCost) < 1e-6);
  // 현금의 기회비용은 첫날에 낸 돈을 그 기간 굴렸을 때의 차액이다
  const m = 10 / 100 / 12;
  assert.ok(Math.abs(of(hi, 'cash').opportunityCost - (atEnd(42_800_000, 36, m) - 42_800_000)) < 1e-6);
});

test('돌려받는 보증금은 기회비용만 남긴다', () => {
  const none = comparePlans(mk({ leaseDeposit: 0, leaseDepositReturned: true }));
  const returned = comparePlans(mk({ leaseDeposit: 10_000_000, leaseDepositReturned: true }));
  const kept = comparePlans(mk({ leaseDeposit: 10_000_000, leaseDepositReturned: false }));

  // 기회수익률이 0이면 돌려받는 보증금은 총비용에 아무 일도 하지 않는다
  assert.ok(Math.abs(of(returned, 'lease').total - of(none, 'lease').total) < 1e-6);
  // 그래도 첫날에 나가는 목돈에는 잡힌다
  assert.equal(of(returned, 'lease').upfront - of(none, 'lease').upfront, 10_000_000);
  // 못 돌려받으면 그만큼 그대로 비용이다
  assert.ok(Math.abs(of(kept, 'lease').total - of(none, 'lease').total - 10_000_000) < 1e-6);

  // 수익률이 있으면 묶인 값만큼 기회비용이 붙는다
  const m = 8 / 100 / 12;
  const r8 = comparePlans(mk({ leaseDeposit: 10_000_000, leaseDepositReturned: true, opportunityRate: 8 }));
  const n8 = comparePlans(mk({ leaseDeposit: 0, leaseDepositReturned: true, opportunityRate: 8 }));
  const extra = of(r8, 'lease').total - of(n8, 'lease').total;
  assert.ok(extra > 0);
  assert.ok(Math.abs(extra - (atEnd(10_000_000, 36, m) - 10_000_000)) < 1e-6);
});

test('리스료에 무엇이 들었는지가 비교를 바꾼다', () => {
  const included = comparePlans(mk({
    leaseIncludesFee: true, leaseIncludesInsurance: true, annualInsurance: 1_200_000,
  }));
  const excluded = comparePlans(mk({
    leaseIncludesFee: false, leaseIncludesInsurance: false, annualInsurance: 1_200_000,
  }));

  // 포함이면 리스가 그만큼 싸다
  assert.ok(of(included, 'lease').total < of(excluded, 'lease').total);
  // 차이는 초기비용 280만 + 3년 보험료 360만이다
  const diff = of(excluded, 'lease').total - of(included, 'lease').total;
  assert.ok(Math.abs(diff - (2_800_000 + 1_200_000 * 3)) < 1e-6);
  // 현금·할부는 포함 여부와 무관하다 — 어차피 내가 낸다
  assert.equal(of(included, 'cash').total, of(excluded, 'cash').total);
  assert.equal(of(included, 'loan').total, of(excluded, 'loan').total);

  // 보험료를 세면 현금·할부의 총비용이 그만큼 늘어난다
  const noIns = comparePlans(mk({ annualInsurance: 0 }));
  assert.ok(Math.abs(of(included, 'cash').total - of(noIns, 'cash').total - 1_200_000 * 3) < 1e-6);
  // 리스가 보험을 안고 있으면 리스 쪽은 그대로다
  assert.equal(of(included, 'lease').total, of(noIns, 'lease').total);
});

test('기간 말 환산은 한 달씩 옮겨 더한 것과 같다', () => {
  for (const rate of [0, 2, 5.5, 12]) {
    const m = rate / 100 / 12;
    for (const months of [1, 12, 36, 60]) {
      let byHand = 0;
      // 매달 말에 내므로 t개월째 낸 돈은 남은 (months − t)개월을 굴린다
      for (let t = 1; t <= months; t++) byHand += atEnd(500_000, months - t, m);
      assert.ok(Math.abs(streamAtEnd(500_000, months, m) - byHand) < 1e-6, `${rate}% ${months}개월`);
    }
  }
  // 낼 달이 없으면 0, 만기에 낸 돈은 굴릴 시간이 없어 제 액수 그대로다
  assert.equal(streamAtEnd(500_000, 0, 0.01), 0);
  assert.equal(atEnd(1_000_000, 0, 0.01), 1_000_000);
  // 수익률 0이면 그냥 단순 합이다
  assert.equal(streamAtEnd(500_000, 36, 0), 18_000_000);
});
