/**
 * 학자금 대출 — 두 방식을 각각 다른 길로 되짚는다.
 *
 * 일반 상환은 lib/loan-schedule.ts의 값과 **직접 대조**한다. 같은 식을 새 파일에
 * 또 적으면 한쪽만 고쳐지는 날이 오므로, 원문을 읽어 그 식이 다시 적혀 있지
 * 않은지도 본다 — 값만 맞으면 통과하는 검사는 복사를 못 잡는다.
 *
 * 취업 후 상환은 잔액으로 되짚는다. 해마다 붙은 이자를 더하고 갚은 돈을 빼면
 * 원금이 정확히 0이 되어야 한다. 유예된 해에도 이자가 붙는다는 것, 소득이 계속
 * 기준 아래면 완료 연도를 지어내지 않고 null을 낸다는 것을 따로 지킨다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { MAX_YEARS, compare, icl, standard } from '../lib/student-loan.ts';
import { equalPayment, monthlyRate } from '../lib/loan-schedule.ts';

/** 흔한 학자금 대출 한 건 — 원금 3,000만원, 연 1.7%, 10년 */
const LOAN = { principal: 30_000_000, annualRate: 1.7, months: 120 };
/** 취업 후 상환의 고시값 자리 — 검사에서 쓰는 예시일 뿐 실제 고시값이 아니다 */
const ICL = {
  ...LOAN, annualIncome: 30_000_000, threshold: 25_000_000, repayRate: 20, incomeGrowth: 3,
};

test('일반 상환의 월 상환액은 loan-schedule의 값과 같다', () => {
  const s = standard(LOAN);
  // 새로 셈하지 않고 원리금균등 함수의 값과 맞댄다
  assert.equal(s.monthlyAfterGrace, equalPayment(30_000_000, 1.7, 120));
  assert.equal(s.monthlyDuringGrace, 30_000_000 * monthlyRate(1.7));
  assert.equal(s.repayMonths, 120);
  assert.equal(s.finishYear, 10);

  // 총액도 그 월 상환액에서만 나온다
  assert.ok(Math.abs(s.totalPaid - s.monthlyAfterGrace * 120) < 1e-6);
  assert.ok(Math.abs(s.totalInterest - (s.totalPaid - 30_000_000)) < 1e-6);
  // 손으로 셈한 값 — 3,000만원을 연 1.7% 10년이면 월 27만원대다
  assert.ok(s.monthlyAfterGrace > 270_000 && s.monthlyAfterGrace < 275_000, `${s.monthlyAfterGrace}`);

  // 거치기간이 있으면 원금은 남은 개월에 몰아 갚는다 — 그 값도 같은 함수로 맞댄다
  const grace = standard({ ...LOAN, graceMonths: 24 });
  assert.equal(grace.repayMonths, 96);
  assert.equal(grace.monthlyAfterGrace, equalPayment(30_000_000, 1.7, 96));
  assert.ok(grace.monthlyAfterGrace > s.monthlyAfterGrace, '거치가 끝나면 더 무거워야 한다');
  assert.ok(
    Math.abs(grace.totalPaid - (grace.monthlyDuringGrace * 24 + grace.monthlyAfterGrace * 96)) < 1e-6,
  );
  // 거치 동안 원금이 안 줄므로 총 이자는 더 많다
  assert.ok(grace.totalInterest > s.totalInterest);

  // 거치가 기간을 다 먹으면 만기일시다 — 이자만 내다가 원금을 한 번에 갚는다
  const all = standard({ ...LOAN, graceMonths: 120 });
  assert.equal(all.repayMonths, 0);
  assert.equal(all.monthlyAfterGrace, all.monthlyDuringGrace);
  assert.ok(Math.abs(all.totalPaid - (all.monthlyDuringGrace * 120 + 30_000_000)) < 1e-6);
});

test('원리금균등 식이 새 파일에 다시 적혀 있지 않다', () => {
  const src = readFileSync(new URL('../lib/student-loan.ts', import.meta.url), 'utf8');
  assert.ok(
    /from '\.\/loan-schedule\.ts'/.test(src),
    'loan-schedule을 안 불러온다 — 원리금균등 식을 어디선가 새로 적었다',
  );
  assert.ok(src.includes('equalPayment('), 'equalPayment를 안 쓴다');
  assert.ok(src.includes('monthlyRate('), 'monthlyRate를 안 쓴다 — 월이율을 따로 셈했다');
  // A = P × i ÷ (1 − (1+i)^−n) 의 분모를 다시 적었으면 걸린다
  assert.ok(!/1 - \(1 \+/.test(src), '원리금균등 식의 분모가 다시 적혀 있다');
  assert.ok(!/Math\.pow\(1 \+/.test(src), '원리금균등 식의 분모가 다시 적혀 있다');
  // 월이율을 손으로 나눈 자리도 없어야 한다
  assert.ok(!/\/ 100 \/ 12/.test(src), '월이율을 다시 셈했다 — monthlyRate를 써야 한다');
});

test('취업 후 상환은 잔액으로 되짚으면 정확히 0이 된다', () => {
  const r = icl(ICL);
  assert.notEqual(r.finishYear, null);
  assert.equal(r.years.length, r.finishYear);

  // 해마다: 앞 해 잔액 + 그 해 이자 − 그 해 상환액 = 그 해 말 잔액
  let balance = ICL.principal;
  let interest = 0;
  let paid = 0;
  for (const y of r.years) {
    assert.ok(Math.abs(y.interest - balance * (ICL.annualRate / 100)) < 1e-6, `${y.year}년 이자`);
    assert.ok(Math.abs(y.balance - (balance + y.interest - y.payment)) < 1e-6, `${y.year}년 잔액`);
    balance = y.balance;
    interest += y.interest;
    paid += y.payment;
  }
  // 마지막 해에 잔액이 정확히 0이다 — 남은 것보다 더 내지 않는다
  assert.equal(r.years[r.years.length - 1].balance, 0);
  assert.ok(Math.abs(r.totalInterest - interest) < 1e-6);
  assert.ok(Math.abs(r.totalPaid - paid) < 1e-6);
  // 원금 + 붙은 이자 = 낸 돈
  assert.ok(
    Math.abs(ICL.principal + r.totalInterest - r.totalPaid) < 1e-6,
    `원금 ${ICL.principal} + 이자 ${r.totalInterest} ≠ 낸 돈 ${r.totalPaid}`,
  );

  // 소득이 오르면 갚는 금액도 해마다 커진다
  for (let n = 1; n < r.years.length - 1; n++) {
    assert.ok(r.years[n].payment > r.years[n - 1].payment, `${n + 1}년 상환액이 안 늘었다`);
  }
});

test('소득이 기준 이하인 해는 상환액이 0이고 잔액이 이자만큼 늘어난다', () => {
  // 첫해 소득이 기준보다 낮고, 3년째에 기준을 넘도록 소득을 올린다
  const r = icl({ ...ICL, annualIncome: 24_000_000, threshold: 25_000_000, incomeGrowth: 3 });

  const first = r.years[0];
  assert.equal(first.payment, 0, '유예된 해에 돈을 냈다');
  assert.equal(first.deferred, true);
  // 유예는 면제가 아니다 — 잔액이 이자만큼 늘어난다
  assert.equal(first.interest, 30_000_000 * 0.017);
  assert.equal(first.balance, 30_000_000 + 30_000_000 * 0.017);
  assert.ok(first.balance > 30_000_000, '유예된 해에 잔액이 안 늘었다');

  // 유예된 해가 몇인지 세는 값도 맞아야 한다
  assert.equal(r.deferredYears, r.years.filter(y => y.payment === 0).length);
  assert.ok(r.deferredYears >= 2, `기준을 넘기 전 두 해는 유예다 — ${r.deferredYears}`);
  // 유예 중에도 이자는 붙는다
  for (const y of r.years.filter(y => y.deferred)) {
    assert.ok(y.interest > 0, `${y.year}년 유예인데 이자가 0이다`);
    assert.ok(y.balance > 0);
  }
  // 기준을 넘는 첫 해부터 잔액이 줄기 시작한다
  const paying = r.years.filter(y => !y.deferred);
  assert.ok(paying.length > 0);
  assert.ok(paying[0].income > 25_000_000);
  assert.ok(Math.abs(paying[0].payment - (paying[0].income - 25_000_000) * 0.2) < 1e-6);
});

test('소득이 계속 기준 아래면 완료 연도가 null이다', () => {
  // 소득이 오르지 않고 기준 아래에 머문다 — 갚는 해가 한 해도 없다
  const stuck = icl({ ...ICL, annualIncome: 20_000_000, threshold: 25_000_000, incomeGrowth: 0 });
  assert.equal(stuck.finishYear, null, '갚지 못하는데 완료 연도를 지어냈다');
  assert.equal(stuck.totalPaid, 0);
  assert.equal(stuck.years.length, MAX_YEARS);
  assert.equal(stuck.deferredYears, MAX_YEARS);
  // 잔액은 줄지 않고 오히려 늘어난다
  assert.equal(stuck.growing, true);
  const last = stuck.years[stuck.years.length - 1];
  assert.ok(last.balance > 30_000_000, `잔액이 안 늘었다 — ${last.balance}`);
  assert.ok(Math.abs(30_000_000 + stuck.totalInterest - last.balance) < 1e-6);

  // 금리가 0이면 잔액이 늘지도 줄지도 않는다 — 그래도 완료 연도는 없다
  const flat = icl({ ...ICL, annualRate: 0, annualIncome: 20_000_000, incomeGrowth: 0 });
  assert.equal(flat.finishYear, null);
  assert.equal(flat.growing, false, '늘지 않았는데 늘었다고 한다');
  assert.equal(flat.years[flat.years.length - 1].balance, 30_000_000);

  // 소득이 기준과 정확히 같아도 갚을 몫이 없다
  const equal = icl({ ...ICL, annualIncome: 25_000_000, threshold: 25_000_000, incomeGrowth: 0 });
  assert.equal(equal.finishYear, null);
  assert.equal(equal.years[0].payment, 0);
});

test('소득 증가율이 높으면 빨리 끝나고 이자가 줄어든다', () => {
  let prevYear = Infinity;
  let prevInterest = Infinity;
  for (const incomeGrowth of [0, 2, 4, 6, 8, 10]) {
    const r = icl({ ...ICL, incomeGrowth });
    assert.notEqual(r.finishYear, null, `증가율 ${incomeGrowth}%에서 끝나지 않았다`);
    assert.ok(r.finishYear! <= prevYear, `증가율 ${incomeGrowth}%에서 기간이 늘었다`);
    assert.ok(r.totalInterest < prevInterest, `증가율 ${incomeGrowth}%에서 이자가 늘었다`);
    // 원금은 그대로이므로 이자가 줄면 총액도 줄어든다
    assert.ok(Math.abs(r.totalPaid - (30_000_000 + r.totalInterest)) < 1e-6);
    prevYear = r.finishYear!;
    prevInterest = r.totalInterest;
  }
  // 0%와 10%는 확실히 벌어져야 한다 — 단조성만으로는 붙어 있어도 통과한다
  assert.ok(icl({ ...ICL, incomeGrowth: 0 }).finishYear! > icl({ ...ICL, incomeGrowth: 10 }).finishYear! + 5);
});

test('상환율을 두 배로 하면 그 해 상환액도 두 배다', () => {
  const one = icl({ ...ICL, repayRate: 20 });
  const two = icl({ ...ICL, repayRate: 40 });
  // 첫해 소득 3,000만 − 기준 2,500만 = 500만의 20%와 40%
  assert.ok(Math.abs(one.years[0].payment - 1_000_000) < 1e-6, `${one.years[0].payment}`);
  assert.ok(Math.abs(two.years[0].payment - one.years[0].payment * 2) < 1e-6);
  // 이자는 같은 잔액에 붙으므로 첫해는 같다
  assert.equal(two.years[0].interest, one.years[0].interest);
  // 많이 갚으면 빨리 끝나고 이자가 적다
  assert.ok(two.finishYear! < one.finishYear!);
  assert.ok(two.totalInterest < one.totalInterest);

  // 상환율이 0이면 갚는 해가 없다 — 유예와 같은 모양이 된다
  const none = icl({ ...ICL, repayRate: 0 });
  assert.equal(none.finishYear, null);
  assert.equal(none.totalPaid, 0);
});

test('금리 0·원금 0·소득 0에서 무너지지 않는다', () => {
  // 금리 0% — 일반 상환은 원금을 개월로 나눈 값이고 이자가 없다
  const zeroRate = standard({ ...LOAN, annualRate: 0 });
  assert.equal(zeroRate.monthlyAfterGrace, 30_000_000 / 120);
  assert.equal(zeroRate.monthlyDuringGrace, 0);
  assert.ok(Math.abs(zeroRate.totalInterest) < 1e-6);
  const zeroRateIcl = icl({ ...ICL, annualRate: 0 });
  assert.equal(zeroRateIcl.totalInterest, 0);
  assert.equal(zeroRateIcl.totalPaid, 30_000_000);
  assert.ok(zeroRateIcl.finishYear! > 0);

  // 원금 0 — 갚을 것이 없다. 굴릴 해도 없다
  const noLoan = standard({ ...LOAN, principal: 0 });
  assert.equal(noLoan.monthlyAfterGrace, 0);
  assert.equal(noLoan.totalPaid, 0);
  assert.equal(noLoan.totalInterest, 0);
  const noLoanIcl = icl({ ...ICL, principal: 0 });
  assert.equal(noLoanIcl.finishYear, 0);
  assert.deepEqual(noLoanIcl.years, []);
  assert.equal(noLoanIcl.growing, false);

  // 소득 0 — 한 해도 갚지 못한다
  const noIncome = icl({ ...ICL, annualIncome: 0 });
  assert.equal(noIncome.finishYear, null);
  assert.equal(noIncome.totalPaid, 0);
  assert.equal(noIncome.years[0].income, 0);

  // 기간 0 — 나눌 개월이 없다
  const noMonths = standard({ ...LOAN, months: 0 });
  assert.equal(noMonths.repayMonths, 0);
  assert.equal(noMonths.finishYear, 0);
  assert.ok(Number.isFinite(noMonths.totalPaid));

  // 기준소득 0 — 첫 원부터 상환율이 걸린다
  const noThreshold = icl({ ...ICL, threshold: 0 });
  assert.ok(Math.abs(noThreshold.years[0].payment - 30_000_000 * 0.2) < 1e-6);
  assert.ok(noThreshold.finishYear! < icl(ICL).finishYear!);
});

test('두 방식을 맞대면 총액 차이와 유리한 쪽이 나온다', () => {
  const c = compare(LOAN, ICL);
  assert.ok(Math.abs(c.totalDiff - (c.icl.totalPaid - c.standard.totalPaid)) < 1e-6);
  assert.equal(c.cheaper, c.totalDiff > 0 ? 'standard' : 'icl');
  // 두 방식 모두 원금은 같이 갚는다 — 갈리는 것은 이자와 기간이다
  assert.ok(Math.abs(c.icl.totalPaid - c.standard.totalPaid - (c.icl.totalInterest - c.standard.totalInterest)) < 1e-6);

  // 취업 후 상환은 3년 만에 끝나는 10년 일반 상환보다 오래 끌어 이자가 더 붙는다
  assert.ok(c.icl.finishYear! > 10, `${c.icl.finishYear}`);
  assert.ok(c.icl.totalInterest > c.standard.totalInterest);
  assert.equal(c.cheaper, 'standard');

  // 소득이 빨리 오르면 취업 후 상환이 더 일찍 끝나 총액이 적어질 수 있다
  const rich = compare(LOAN, { ...ICL, annualIncome: 60_000_000, incomeGrowth: 5 });
  assert.ok(rich.icl.finishYear! < 10);
  assert.equal(rich.cheaper, 'icl');
  assert.ok(rich.totalDiff < 0);

  // 갚지 못하면 맞댈 총액이 없다 — 한쪽을 고르지 않는다
  const stuck = compare(LOAN, { ...ICL, annualIncome: 20_000_000, incomeGrowth: 0 });
  assert.equal(stuck.icl.finishYear, null);
  assert.equal(stuck.cheaper, null, '갚지도 못하는데 유리한 쪽을 골랐다');
  assert.equal(stuck.icl.growing, true);
});
