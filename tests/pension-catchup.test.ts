/**
 * 추납·임의가입 — 낸 돈과 늘어난 연금을 양쪽에서 맞대 본다.
 *
 * 이 계산의 값은 국민연금 식에서 파생되므로, 되짚을 자리가 분명하다.
 *  - 보험료는 기준소득월액의 9%다
 *  - 추납은 119개월을 넘길 수 없다
 *  - 10년을 갓 넘기는 자리에서 회수 기간이 **뚝 떨어진다**(없던 연금이 생긴다)
 *  - 회수 기간 × 늘어난 월 연금 = 낸 돈
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CONTRIBUTION_RATE, MAX_CATCHUP_MONTHS,
  calcCatchup, catchupTable, monthsToUnlock,
} from '../lib/pension-catchup.ts';
import { MIN_MONTHS } from '../lib/national-pension.ts';

const base = {
  avgIncome: 3_000_000,
  myIncome: 3_000_000,
  months: 180,          // 15년 가입
  year: 2026,
  shiftYears: 0,
  familyAnnual: 0,
  addMonths: 60,
  contributionBase: 3_000_000,
  isCatchup: true,
};

test('보험료는 기준소득월액의 9%다', () => {
  const r = calcCatchup(base);
  assert.equal(r.monthlyContribution, 3_000_000 * CONTRIBUTION_RATE);
  assert.equal(r.monthlyContribution, 270_000);
  assert.equal(r.totalPaid, 270_000 * 60);
});

test('추납은 119개월에서 잘린다', () => {
  const over = calcCatchup({ ...base, addMonths: 200 });
  assert.equal(over.addedMonths, MAX_CATCHUP_MONTHS);

  // 임의가입은 그 한도가 없다
  const voluntary = calcCatchup({ ...base, addMonths: 200, isCatchup: false });
  assert.equal(voluntary.addedMonths, 200);
  assert.ok(voluntary.gainMonthly > over.gainMonthly, '기간이 더 긴데 연금이 안 늘었다');
});

test('회수 기간 × 늘어난 월 연금 = 낸 돈', () => {
  /* 회수 기간의 정의를 그대로 되짚는다 — 나누고 곱해 제자리로 돌아와야 한다 */
  for (const addMonths of [12, 36, 60, 119]) {
    const r = calcCatchup({ ...base, addMonths });
    assert.ok(r.paybackMonths !== null);
    assert.ok(
      Math.abs(r.paybackMonths! * r.gainMonthly - r.totalPaid) < 1e-6,
      `${addMonths}개월: ${r.paybackMonths! * r.gainMonthly} vs ${r.totalPaid}`,
    );
  }
});

test('10년을 채우는 추납이 가장 이득이다', () => {
  /*
   * 9년 11개월 가입자는 연금이 0이다. 한 달만 채우면 연금이 생기므로 그 한
   * 달의 값이 압도적이다 — 계단이 실제로 있는지 본다. 없다면 eligible 판정이
   * 계산에 안 물려 있는 것이다.
   */
  const notYet = { ...base, months: MIN_MONTHS - 1 };
  const oneMonth = calcCatchup({ ...notYet, addMonths: 1 });

  assert.equal(oneMonth.unlocksPension, true);
  assert.equal(oneMonth.beforeMonthly, 0);
  assert.ok(oneMonth.afterMonthly > 0);
  assert.equal(monthsToUnlock(MIN_MONTHS - 1), 1);
  assert.equal(monthsToUnlock(MIN_MONTHS), 0);
  assert.equal(monthsToUnlock(240), 0);

  // 한 달 넣어 연금이 생기는 쪽이, 이미 자격이 있는 사람이 한 달 넣는 것보다
  // 낸 돈 1만원당 효과가 훨씬 크다
  const already = calcCatchup({ ...base, addMonths: 1 });
  assert.ok(
    oneMonth.gainPerTenThousand > already.gainPerTenThousand * 10,
    `계단이 없다: ${oneMonth.gainPerTenThousand} vs ${already.gainPerTenThousand}`,
  );
});

test('자격이 없는 사람이 한 달로는 못 채우면 연금이 그대로 0이다', () => {
  /* 지어낸 이득을 내놓지 않는다 — 10년에 두 달 남았는데 한 달만 넣은 경우 */
  const r = calcCatchup({ ...base, months: MIN_MONTHS - 2, addMonths: 1 });
  assert.equal(r.afterMonthly, 0);
  assert.equal(r.gainMonthly, 0);
  assert.equal(r.paybackMonths, null, '늘지도 않았는데 회수 기간이 나왔다');
  assert.equal(r.unlocksPension, false);
});

test('많이 넣을수록 늘어나는 연금도 는다', () => {
  const table = catchupTable(base, [0, 12, 24, 36, 48, 60, 119]);
  assert.equal(table.length, 7);
  assert.equal(table[0].gainMonthly, 0);

  for (let i = 1; i < table.length; i++) {
    assert.ok(
      table[i].gainMonthly > table[i - 1].gainMonthly,
      `${table[i].months}개월에서 줄었다`,
    );
    assert.ok(table[i].totalPaid > table[i - 1].totalPaid);
  }
});

test('기준소득월액을 올려 넣으면 낸 돈만 늘고 연금은 그대로다', () => {
  /*
   * 흔한 오해를 짚는 자리다. 추납 보험료를 높게 잡아도 **그 기간의 B값**이
   * 오르는 것이지, 이 계산기가 받는 B값(생애 평균)은 입력이라 그대로다.
   * 그래서 여기서는 낸 돈만 늘어나며, 그 사실을 검사가 못 박아 둔다.
   */
  const low = calcCatchup(base);
  const high = calcCatchup({ ...base, contributionBase: 5_000_000 });

  assert.ok(high.totalPaid > low.totalPaid);
  assert.equal(high.gainMonthly, low.gainMonthly);
  assert.ok(high.paybackMonths! > low.paybackMonths!, '많이 냈는데 회수가 안 늦어졌다');
});
