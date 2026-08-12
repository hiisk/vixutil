/**
 * 월세 세액공제 — 절벽과 한도와 결정세액 상한을 못 박는다.
 *
 * ── 이 검사가 무엇을 상대로 두나 ───────────────────────────
 * 이 셈에는 값이 꺾이거나 끊기는 자리가 넷 있고, 그 넷이 계산기의 전부다.
 *
 *   ① 총급여 구간 경계 — 공제율이 **절벽처럼** 갈린다(초과누진이 아니다)
 *   ② 연 한도 — 월세를 더 내도 공제 대상이 안 늘어난다
 *   ③ 결정세액 상한 — 낼 세금이 없으면 공제도 사라진다
 *   ④ 요건 — 하나만 못 채워도 공제가 0이 된다
 *
 * 넷 다 "값이 끊기는" 자리라서, 가운데 한 점만 맞춰 보면 넷 중 어느 것이
 * 빠져도 통과한다. 그래서 경계를 **1원 차이로** 밟고, 절벽의 높이를 셈과
 * 따로 세워 둔 식으로 되짚는다.
 *
 * ── 손으로 셈한 사례는 같은 함수를 다시 부르지 않는다 ─────
 * 결정세액 어림은 lib/year-end-tax.ts의 calcYearEnd를 빌려 쓴다. 검사가 그
 * 함수를 다시 불러 맞대면 둘이 나란히 틀려도 통과한다. 그래서 아래
 * '결정세액 어림을 법대로 손으로 되짚는다'는 근로소득공제 → 과세표준 →
 * 산출세액 → 근로소득세액공제를 **법의 숫자로 다시 세워** 값을 만든다.
 * 보험료 요율만은 lib/salary.ts의 것을 가져다 쓴다 — 요율은 해마다 바뀌므로
 * 그것까지 여기 적으면 요율이 바뀔 때마다 이 검사가 거짓으로 빨개진다.
 *
 * ── 절벽이 있는 것이 맞다 ─────────────────────────────────
 * lib/holding-tax.ts는 경계에서 세금이 튀는 것을 버그로 잡아냈다(종부세는
 * 초과누진이다). 월세 세액공제는 **반대**다. 조특법이 총급여 구간마다 하나의
 * 공제율을 통째로 매기므로 1원 차이로 20만원이 날아가는 것이 법이 적힌 대로다.
 * 그래서 이 검사는 절벽을 없애면 걸리고, 절벽의 높이가 달라져도 걸린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  ALL_MET, CASH_RECEIPT_RATE, DEFAULT_RATE_RULES, LOCAL_RATE, REQUIREMENT_KEYS, RENT_LIMIT,
  calcMonthlyRentDeduction, creditRate, estimateFinalTax, rentUsingAllTax, unmetRequirements,
  type Requirements,
} from '../lib/monthly-rent-deduction.ts';
import { DEFAULT_RATES } from '../lib/card-deduction.ts';
import { estimatePremiums } from '../lib/year-end-tax.ts';

const ROOT = join(import.meta.dirname, '..');

/** 요건을 하나만 꺼 본다 */
const without = (key: keyof Requirements): Requirements => ({ ...ALL_MET, [key]: false });

test('공제율 표는 상한 오름차순 · 공제율 내림차순이어야 한다', () => {
  /*
   * 표를 위에서 아래로 훑어 **처음 맞는 줄**을 쓰므로 차례가 값을 정한다.
   * 두 줄을 뒤바꾸면 낮은 율이 먼저 걸려 모두가 15%를 받게 되는데, 값의
   * 단조성만 보면 그것이 안 걸린다(여전히 단조롭다). 그래서 정렬을 직접 본다.
   */
  assert.ok(DEFAULT_RATE_RULES.length >= 2, '구간이 하나면 절벽을 검사할 것이 없다');
  for (let i = 1; i < DEFAULT_RATE_RULES.length; i++) {
    const prev = DEFAULT_RATE_RULES[i - 1];
    const now = DEFAULT_RATE_RULES[i];
    assert.ok(now.salaryUpTo > prev.salaryUpTo, `${i}번째 줄의 총급여 상한이 앞줄보다 작다`);
    assert.ok(now.incomeUpTo > prev.incomeUpTo, `${i}번째 줄의 종합소득금액 상한이 앞줄보다 작다`);
    assert.ok(now.rate < prev.rate, `${i}번째 줄의 공제율이 앞줄보다 크거나 같다`);
  }
  /* 소득이 가장 낮은 사람이 가장 높은 율을 받는다 — 두 줄을 뒤바꾸면 여기서 걸린다 */
  assert.equal(creditRate(0, 0), Math.max(...DEFAULT_RATE_RULES.map(r => r.rate)));
  /* 마지막 줄을 넘으면 대상이 아니다 */
  const last = DEFAULT_RATE_RULES[DEFAULT_RATE_RULES.length - 1];
  assert.equal(creditRate(last.salaryUpTo + 1, 0), 0);
  assert.equal(creditRate(0, last.incomeUpTo + 1), 0);
});

test('총급여나 종합소득금액이 오르면 공제율이 오르지 않는다', () => {
  let prev = Infinity;
  for (let gross = 0; gross <= 100_000_000; gross += 250_000) {
    const rate = creditRate(gross, 0);
    assert.ok(rate <= prev, `총급여 ${gross.toLocaleString()}원에서 공제율이 올랐다`);
    prev = rate;
  }
  prev = Infinity;
  for (let income = 0; income <= 100_000_000; income += 250_000) {
    const rate = creditRate(30_000_000, income);
    assert.ok(rate <= prev, `종합소득금액 ${income.toLocaleString()}원에서 공제율이 올랐다`);
    prev = rate;
  }
});

test('총급여 구간 경계에서 공제액이 절벽처럼 뛴다 — 초과누진이 아니다', () => {
  /*
   * 첫 구간 상한(지금 5,500만원)에서 1원을 더 벌면 공제율이 통째로 다음 줄로
   * 갈린다. 절벽의 높이를 셈과 따로 세운 식으로 되짚는다:
   *   높이 = 공제 대상 월세액 × (앞 구간 율 − 뒷 구간 율)
   * 어딘가에서 율을 구간별로 안 나누고 하나만 쓰면 높이가 0이 되어 걸린다.
   */
  const [first, second] = DEFAULT_RATE_RULES;
  const monthlyRent = 900_000; // 한 해 1,080만원 — 한도(1,000만원)를 넘겨 대상이 한도로 고정된다

  const at = calcMonthlyRentDeduction({ grossSalary: first.salaryUpTo, monthlyRent, taxBeforeCredit: 9_999_999 });
  const over = calcMonthlyRentDeduction({ grossSalary: first.salaryUpTo + 1, monthlyRent, taxBeforeCredit: 9_999_999 });

  assert.equal(at.rate, first.rate);
  assert.equal(over.rate, second.rate);
  assert.equal(at.eligibleRent, over.eligibleRent, '경계에서 대상 월세액까지 달라졌다');
  assert.equal(
    at.credit - over.credit,
    Math.floor(at.eligibleRent * first.rate) - Math.floor(at.eligibleRent * second.rate),
    '절벽의 높이가 두 공제율의 차이와 맞지 않는다',
  );
  /* 지금 값으로는 170만원 → 150만원, 1원 차이로 20만원이 날아간다 */
  assert.equal(at.credit, 1_700_000);
  assert.equal(over.credit, 1_500_000);
  assert.equal(at.credit - over.credit, 200_000);

  /* 마지막 구간을 넘으면 절벽이 아니라 낭떠러지다 — 공제가 아예 없다 */
  const last = DEFAULT_RATE_RULES[DEFAULT_RATE_RULES.length - 1];
  const edge = calcMonthlyRentDeduction({ grossSalary: last.salaryUpTo, monthlyRent, taxBeforeCredit: 9_999_999 });
  const out = calcMonthlyRentDeduction({ grossSalary: last.salaryUpTo + 1, monthlyRent, taxBeforeCredit: 9_999_999 });
  assert.equal(edge.credit, 1_500_000);
  assert.equal(out.rate, 0);
  assert.equal(out.rawCredit, 0);
  assert.equal(out.credit, 0);
  assert.equal(out.overIncomeLimit, true);
  assert.equal(out.qualified, true, '소득이 넘은 것은 요건 미달과 다른 이유다');
  /* 그래도 소득공제 갈래는 남는다 — 이 사람이 갈 곳이 여기다 */
  assert.ok(out.incomeRoute.incomeTaxSaved > 0);
  assert.equal(out.better, 'income');
});

test('근로소득만 있는 사람은 종합소득금액 조건에 걸리지 않는다', () => {
  /*
   * 첫 줄의 종합소득금액 조건(4,500만원)은 근로 말고 다른 소득이 있는 사람을
   * 걸러내는 장치다. 총급여 5,500만원의 근로소득금액은 4,250만원이라 순수
   * 근로자는 이 조건에 절대 안 걸린다 — 그 사실을 구간 전체에서 확인한다.
   */
  const [first] = DEFAULT_RATE_RULES;
  for (let gross = 0; gross <= first.salaryUpTo; gross += 250_000) {
    const r = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 500_000 });
    assert.equal(r.rate, first.rate, `총급여 ${gross.toLocaleString()}원에서 첫 구간 율이 아니다`);
  }

  /* 다른 소득이 있으면 총급여가 낮아도 다음 줄로 내려가고, 더 크면 대상이 아니다 */
  const mid = { grossSalary: 50_000_000, monthlyRent: 500_000 };
  assert.equal(calcMonthlyRentDeduction(mid).rate, first.rate);
  assert.equal(calcMonthlyRentDeduction({ ...mid, totalIncome: first.incomeUpTo }).rate, first.rate);
  assert.equal(calcMonthlyRentDeduction({ ...mid, totalIncome: first.incomeUpTo + 1 }).rate, DEFAULT_RATE_RULES[1].rate);
  const last = DEFAULT_RATE_RULES[DEFAULT_RATE_RULES.length - 1];
  assert.equal(calcMonthlyRentDeduction({ ...mid, totalIncome: last.incomeUpTo + 1 }).rate, 0);
});

test('연 한도 바로 위·아래를 1원 차이로 밟는다', () => {
  /*
   * 한도는 공제액이 아니라 **공제 대상 월세액**에 걸린다. 한도를 없애면
   * 월세를 두 배 낸 사람의 공제액도 두 배가 되므로 아래 마지막 줄에서 걸린다.
   */
  const gross = 30_000_000;
  const tax = 9_999_999;
  const at = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: RENT_LIMIT / 12, taxBeforeCredit: tax });
  assert.equal(at.annualRent, RENT_LIMIT);
  assert.equal(at.eligibleRent, RENT_LIMIT);
  assert.equal(at.overLimit, 0);

  /* 한 해 월세가 한도를 1원 넘으면 그 1원만 버려진다 */
  const over = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: (RENT_LIMIT + 1) / 12, taxBeforeCredit: tax });
  assert.equal(over.annualRent, RENT_LIMIT + 1);
  assert.equal(over.eligibleRent, RENT_LIMIT);
  assert.equal(over.overLimit, 1);
  assert.equal(over.rawCredit, at.rawCredit, '한도를 넘긴 1원이 공제액을 늘렸다');

  /* 월세를 두 배로 해도 공제액은 한도에서 멈춘다 */
  const twice = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: RENT_LIMIT / 6, taxBeforeCredit: tax });
  assert.equal(twice.annualRent, RENT_LIMIT * 2);
  assert.equal(twice.eligibleRent, RENT_LIMIT);
  assert.equal(twice.overLimit, RENT_LIMIT);
  assert.equal(twice.rawCredit, at.rawCredit, '한도가 없다 — 월세를 두 배 내니 공제도 늘었다');

  /* 한도를 넘지 않는 사람은 월세에 정확히 비례한다 */
  const half = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: RENT_LIMIT / 24, taxBeforeCredit: tax });
  assert.equal(half.eligibleRent, RENT_LIMIT / 2);
  assert.equal(half.rawCredit * 2, at.rawCredit);

  /* 한도는 인자다 — 갈아 끼우면 그 값이 이긴다 */
  const narrow = calcMonthlyRentDeduction({
    grossSalary: gross, monthlyRent: RENT_LIMIT / 12, taxBeforeCredit: tax, rentLimit: 7_500_000,
  });
  assert.equal(narrow.eligibleRent, 7_500_000);
  assert.equal(narrow.overLimit, 2_500_000);
});

test('결정세액을 넘겨 환급되지 않는다 — 결정세액이 0이면 공제도 0이다', () => {
  const gross = 30_000_000;
  const monthlyRent = 600_000;
  /* 한 해 720만원 × 17% = 122.4만원. 여기까지는 결정세액과 무관하다 */
  const raw = 1_224_000;

  const none = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent, taxBeforeCredit: 0 });
  assert.equal(none.rawCredit, raw);
  assert.equal(none.credit, 0, '결정세액이 0인데 공제를 받았다');
  assert.equal(none.wasted, raw);
  assert.equal(none.creditRoute.totalSaved, 0);
  /* 소득공제로 돌려도 낼 세금이 없으면 아낄 것이 없다 */
  assert.equal(none.incomeRoute.incomeTaxSaved, 0);
  assert.equal(none.better, 'same');

  /* 결정세액이 공제액보다 적으면 그만큼만 받고 나머지는 사라진다 */
  const small = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent, taxBeforeCredit: 500_000 });
  assert.equal(small.credit, 500_000);
  assert.equal(small.wasted, raw - 500_000);
  assert.equal(small.creditRoute.totalSaved, 550_000); // 지방소득세 10%가 함께 준다

  /* 결정세액이 넉넉하면 공제액을 다 받고 사라지는 것이 없다 */
  const enough = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent, taxBeforeCredit: 2_000_000 });
  assert.equal(enough.credit, raw);
  assert.equal(enough.wasted, 0);

  /* 결정세액을 1원 올릴 때마다 받는 공제도 1원씩 는다 — 상한을 지우면 평평해진다 */
  const a = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent, taxBeforeCredit: 700_000 });
  const b = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent, taxBeforeCredit: 700_001 });
  assert.equal(b.credit - a.credit, 1, '결정세액 상한이 없다 — 세금이 늘어도 공제가 그대로다');
});

test('결정세액 어림을 법대로 손으로 되짚는다', () => {
  /*
   * calcYearEnd를 다시 부르지 않고 법의 숫자로 다시 세운다. 총급여 3,000만원,
   * 부양가족 없음.
   *
   *   근로소득공제  750 + (3000 − 1500) × 15% = 975만원
   *   근로소득금액  3,000만 − 975만 = 2,025만원
   *   소득공제      본인 기본공제 150만 + 국민연금 + 건강·장기요양·고용보험
   *   산출세액      과세표준 × 15% − 누진공제 126만  (1,400만~5,000만 구간)
   *   근로소득세액공제  산출세액 × 55%, 한도 74만원 (총급여 3,300만원 이하)
   *   결정세액      산출세액 − 근로소득세액공제, 원 단위 절사
   *
   * 보험료 요율만 lib/salary.ts의 것을 가져온다 — 해마다 바뀌는 값이라 여기
   * 적으면 요율이 바뀔 때마다 이 검사가 거짓으로 빨개진다.
   */
  const gross = 30_000_000;
  const premiums = estimatePremiums(gross);
  const earned = gross - 9_750_000;
  const taxBase = earned - 1_500_000 - premiums.pension - premiums.insurance;
  assert.ok(taxBase > 14_000_000 && taxBase <= 50_000_000, '과세표준이 15% 구간을 벗어났다 — 손셈을 고쳐야 한다');
  const calculated = taxBase * 0.15 - 1_260_000;
  const workCredit = Math.min(calculated * 0.55, 740_000);
  const want = Math.floor(calculated - workCredit);

  assert.equal(estimateFinalTax({ grossSalary: gross }), want);
  /* 어림이 실제로 쓰이는지 — 안 넘기면 이 값이 상한이 되고 taxEstimated가 선다 */
  const r = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 600_000 });
  assert.equal(r.taxEstimated, true);
  assert.equal(r.taxBeforeCredit, want);
  assert.equal(r.credit, Math.min(1_224_000, want));
  assert.ok(r.wasted > 0, '결정세액이 122만원보다 적은데 사라진 공제가 없다');

  /* 결정세액을 직접 넣으면 어림을 쓰지 않는다 */
  const given = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 600_000, taxBeforeCredit: 3_000_000 });
  assert.equal(given.taxEstimated, false);
  assert.equal(given.taxBeforeCredit, 3_000_000);

  /* 부양가족이 늘면 결정세액이 줄고, 그래서 사라지는 공제가 늘어난다 */
  const alone = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 600_000, dependents: 0 });
  const family = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 600_000, dependents: 3 });
  assert.ok(family.taxBeforeCredit < alone.taxBeforeCredit);
  assert.ok(family.wasted > alone.wasted);
  /* 이미 받는 세액공제가 있으면 상한이 그만큼 낮아진다 */
  const withCredits = calcMonthlyRentDeduction({
    grossSalary: gross, monthlyRent: 600_000, otherCredits: 300_000,
  });
  assert.equal(withCredits.taxBeforeCredit, Math.max(0, alone.taxBeforeCredit - 300_000));
});

test('요건을 하나만 못 채워도 공제가 0이 되고 소득공제 길만 남는다', () => {
  const base = { grossSalary: 45_000_000, monthlyRent: 700_000 };
  const met = calcMonthlyRentDeduction({ ...base, requirements: ALL_MET });
  assert.equal(met.qualified, true);
  assert.deepEqual(met.unmet, []);
  assert.ok(met.credit > 0);

  /* 다섯 요건을 하나씩 꺼 본다 — 어느 하나라도 안 보고 있으면 걸린다 */
  assert.ok(REQUIREMENT_KEYS.length === 5, '요건 수가 바뀌었다 — 화면 안내도 함께 보라');
  for (const key of REQUIREMENT_KEYS) {
    const r = calcMonthlyRentDeduction({ ...base, requirements: without(key) });
    assert.equal(r.qualified, false, `${key}를 껐는데 요건을 채운 것으로 본다`);
    assert.deepEqual(r.unmet, [key]);
    assert.equal(r.rate, 0, `${key}를 껐는데 공제율이 남았다`);
    assert.equal(r.rawCredit, 0);
    assert.equal(r.credit, 0);
    assert.equal(r.creditRoute.totalSaved, 0);
    /* 대상 월세액과 소득공제 갈래는 그대로다 — 요건 미달자가 갈 곳이 그쪽이다 */
    assert.equal(r.eligibleRent, met.eligibleRent);
    assert.equal(r.incomeRoute.incomeTaxSaved, met.incomeRoute.incomeTaxSaved);
    assert.ok(r.incomeRoute.incomeTaxSaved > 0);
    assert.equal(r.better, 'income');
    /* 요건 미달은 소득 초과와 다른 이유다 — 화면이 다른 말을 해야 한다 */
    assert.equal(r.overIncomeLimit, false);
  }

  /* 둘을 함께 끄면 둘 다 적힌다 */
  const two = calcMonthlyRentDeduction({
    ...base, requirements: { ...ALL_MET, noHouse: false, address: false },
  });
  assert.deepEqual(two.unmet, ['noHouse', 'address']);
  assert.deepEqual(unmetRequirements(ALL_MET), []);
});

test('세액공제가 소득공제보다 크게 유리하다 — 요건을 채울 수 있으면 그쪽이다', () => {
  /*
   * 세액공제는 대상 월세액의 15~17%를 세금에서 바로 뺀다. 소득공제는 월세의
   * 30%를 과세표준에서 빼는 것이라 실제 절세액은 그 사람의 세율만큼이다.
   * 그러니 어느 소득에서도 세액공제가 크거나 같아야 한다 — 소득 구간을 훑는다.
   */
  const last = DEFAULT_RATE_RULES[DEFAULT_RATE_RULES.length - 1];
  for (let gross = 20_000_000; gross <= last.salaryUpTo; gross += 1_000_000) {
    const r = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 700_000 });
    assert.ok(r.rate > 0, `총급여 ${gross.toLocaleString()}원에서 공제율이 0이다`);
    assert.ok(
      r.credit >= r.incomeRoute.incomeTaxSaved,
      `총급여 ${gross.toLocaleString()}원에서 소득공제가 더 컸다`,
    );
    assert.ok(['credit', 'same'].includes(r.better));
    /*
     * 월세 1원당 아끼는 돈으로 견준다. 소득공제는 월세의 30%만 공제액이 되고 거기에
     * 세율이 붙으니 월세 1원당 절세가 공제율보다 작다 — marginalRate 자체는 공제액
     * 1원당이라 세율(최대 24%)이 그대로 나오므로 공제율과 바로 견주면 안 된다.
     */
    assert.ok(
      r.incomeRoute.incomeTaxSaved / r.eligibleRent < r.rate,
      `총급여 ${gross.toLocaleString()}원에서 월세 1원당 소득공제 절세가 공제율보다 크다`,
    );
  }

  /*
   * 소득공제 갈래는 근로소득세액공제가 함께 줄어드는 것까지 센다.
   * 산출세액이 130만원 아래인 사람은 소득공제로 산출세액을 1원 줄일 때
   * 근로소득세액공제도 0.55원 줄어 실제 절세는 0.45원뿐이다. 그래서 붙는
   * 세율이 과세표준의 세율보다 훨씬 낮게 나온다 — 세율만 곱하면 부풀려진다.
   */
  const low = calcMonthlyRentDeduction({ grossSalary: 30_000_000, monthlyRent: 600_000 });
  assert.ok(low.incomeRoute.deduction > 0);
  assert.ok(
    low.incomeRouteMarginalRate < 0.15 * 0.5,
    `근로소득세액공제가 함께 줄어드는 것을 안 셌다 (${low.incomeRouteMarginalRate})`,
  );

  /* 소득공제 갈래의 공제액을 직접 넣을 수 있다 — 카드 계산기에서 나온 증가분 */
  const given = calcMonthlyRentDeduction({
    grossSalary: 45_000_000, monthlyRent: 700_000, cashDeduction: 0,
  });
  assert.equal(given.incomeRoute.deduction, 0);
  assert.equal(given.incomeRoute.incomeTaxSaved, 0);
  assert.equal(given.incomeRouteMarginalRate, 0);
});

test('지방소득세가 같은 방향으로 10% 따라 준다', () => {
  assert.equal(LOCAL_RATE, 0.1);
  const r = calcMonthlyRentDeduction({ grossSalary: 45_000_000, monthlyRent: 700_000 });
  for (const route of [r.creditRoute, r.incomeRoute]) {
    assert.equal(route.localTaxSaved, route.incomeTaxSaved * LOCAL_RATE);
    assert.equal(route.totalSaved, route.incomeTaxSaved * 1.1);
  }

  /* 지방소득세율을 이 파일에 다시 적지 않았다 — 두 곳에 있으면 한쪽만 고쳐진다 */
  const lib = readFileSync(join(ROOT, 'lib', 'monthly-rent-deduction.ts'), 'utf8');
  const code = lib.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/LOCAL_RATE\s*=\s*[\d.]/.test(code), '지방소득세율이 되살아났다');
  assert.match(code, /from '\.\/year-end-tax\.ts'/, '연말정산 lib을 안 가져온다');
});

test('현금영수증 공제율이 카드 계산기와 갈리지 않았다', () => {
  /*
   * 월세를 현금영수증으로 돌린다는 것은 카드 등 사용금액 공제에 넣는다는
   * 뜻이다. 그 공제율이 두 파일에서 갈리면 두 계산기가 다른 답을 낸다.
   */
  assert.equal(CASH_RECEIPT_RATE, DEFAULT_RATES.check);
});

test('결정세액을 남김없이 쓰는 월세액을 되짚는다', () => {
  /*
   * 되짚은 월세액을 그대로 넣으면 사라지는 공제가 없어야 하고, 거기서 조금만
   * 올리면 사라져야 한다. 상한을 지우면 사라지는 일이 없어져 걸린다.
   */
  const gross = 30_000_000;
  const tax = 600_000;
  const rate = creditRate(gross, 20_250_000);
  const monthly = rentUsingAllTax(tax, rate, 12);
  assert.ok(monthly > 0 && monthly * 12 < RENT_LIMIT, '한도가 먼저 걸리는 값이라 되짚기를 못 본다');

  const at = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: monthly, taxBeforeCredit: tax });
  assert.ok(at.wasted <= 1, `되짚은 월세인데 ${at.wasted}원이 사라졌다`);
  assert.ok(Math.abs(at.credit - tax) <= 1);
  assert.ok(Math.abs(at.fullCreditMonthlyRent - monthly) < 1e-6);

  const more = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: monthly + 10_000, taxBeforeCredit: tax });
  assert.ok(more.wasted > 0, '월세를 더 냈는데 사라지는 공제가 없다 — 결정세액 상한이 사라졌다');
  assert.equal(more.credit, tax);

  /* 결정세액이 0이거나 공제율이 0이면 되짚을 것이 없다 */
  assert.equal(rentUsingAllTax(0, rate, 12), 0);
  assert.equal(rentUsingAllTax(tax, 0, 12), 0);
  assert.equal(rentUsingAllTax(tax, rate, 0), 0);
});

test('개월 수와 0·음수 경계에서 숫자가 깨지지 않는다', () => {
  const gross = 40_000_000;
  /* 개월 수만큼만 센다 — 6개월이면 절반이다 */
  const half = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 500_000, months: 6, taxBeforeCredit: 9_999_999 });
  const full = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 500_000, months: 12, taxBeforeCredit: 9_999_999 });
  assert.equal(half.annualRent, 3_000_000);
  assert.equal(half.rawCredit * 2, full.rawCredit);

  /* 개월 수가 0이면 낸 월세가 없다 */
  const zeroMonths = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 500_000, months: 0 });
  assert.equal(zeroMonths.annualRent, 0);
  assert.equal(zeroMonths.credit, 0);
  assert.equal(zeroMonths.fullCreditMonthlyRent, 0);

  /* 12개월을 넘겨 넣어도 한도가 막는다 */
  const tooMany = calcMonthlyRentDeduction({ grossSalary: gross, monthlyRent: 500_000, months: 36, taxBeforeCredit: 9_999_999 });
  assert.equal(tooMany.annualRent, 18_000_000);
  assert.equal(tooMany.eligibleRent, RENT_LIMIT);

  /* 음수는 0으로 본다 */
  const negative = calcMonthlyRentDeduction({
    grossSalary: -1, monthlyRent: -500_000, months: -6, rentLimit: -1, taxBeforeCredit: -1,
  });
  assert.equal(negative.annualRent, 0);
  assert.equal(negative.rentLimit, 0);
  assert.equal(negative.taxBeforeCredit, 0);
  assert.equal(negative.credit, 0);

  /* 어떤 입력에서도 결과의 숫자는 유한하고 음수가 아니다 */
  for (const monthlyRent of [0, 1, 500_000, 5_000_000]) {
    for (const grossSalary of [0, 1, 30_000_000, 80_000_001, 500_000_000]) {
      const r = calcMonthlyRentDeduction({ grossSalary, monthlyRent });
      for (const [k, v] of Object.entries(r)) {
        if (typeof v !== 'number') continue;
        assert.ok(Number.isFinite(v) && v >= 0, `총급여 ${grossSalary} 월세 ${monthlyRent}: ${k}가 ${v}다`);
      }
      assert.equal(r.credit + r.wasted, r.rawCredit, '받은 공제와 사라진 공제의 합이 공제액과 다르다');
      assert.equal(r.eligibleRent + r.overLimit, r.annualRent);
    }
  }
});

test('페이지에 셈이 되살아나지 않았다', () => {
  const page = readFileSync(
    join(ROOT, 'app', '(ko)', 'calculator', 'monthly-rent-deduction', 'page.tsx'), 'utf8');
  assert.match(page, /from '@\/lib\/monthly-rent-deduction'/, '페이지가 lib을 안 쓴다');
  assert.match(page, /calcMonthlyRentDeduction/, '페이지가 lib 함수를 안 부른다');
  const code = page.split('\n').filter(l => !/^\s*(\*|\/\*|\/\/)/.test(l)).join('\n');
  assert.ok(!/0\.17|0\.15/.test(code), '페이지에 공제율이 되살아났다');
  assert.ok(!/10_000_000|10000000/.test(code), '페이지에 월세 한도가 되살아났다');
  /* 요건 라벨도 lib이 갖고 있다 — 두 곳에 적으면 화면과 셈이 갈린다 */
  assert.match(code, /REQUIREMENT_LABEL/, '페이지가 요건 라벨을 따로 적었다');
});
