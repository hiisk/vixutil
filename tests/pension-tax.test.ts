/**
 * 연금소득세 — 구간이 이어지는지, 나이 문턱이 제자리인지 본다.
 *
 * 연금소득공제는 네 구간이라 경계에서 튈 수 있다. 한 칸이 틀려도 "그럴듯한
 * 금액"이 나와 눈으로는 안 잡히므로, 경계마다 양쪽에서 다가가 재 본다.
 *
 * 사적연금 세율은 70세와 80세에서 내려가고 1,500만원에서 올라간다. 문턱을
 * 한 살 또는 1원 차이로 밟아 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  LOCAL_TAX_RATE, PENSION_DEDUCTION_CAP, PRIVATE_OVER_RATE, PRIVATE_SEPARATE_LIMIT,
  calcPensionTax, pensionDeduction, privateRate, spreadTable,
} from '../lib/pension-tax.ts';
import { progressiveTax } from '../lib/retirement-income-tax.ts';

const base = {
  publicAnnual: 0,
  privateAnnual: 0,
  age: 65,
  otherIncome: 0,
  personalDeduction: 1_500_000,
};

test('연금소득공제 구간이 경계에서 이어진다', () => {
  /* 구간이 끊기면 그 자리에서 공제액이 뛰거나 준다 — 1원 차이로 밟는다 */
  for (const edge of [3_500_000, 7_000_000, 14_000_000]) {
    const before = pensionDeduction(edge - 1);
    const at = pensionDeduction(edge);
    const after = pensionDeduction(edge + 1);
    assert.ok(before < at && at < after, `${edge}에서 끊겼다: ${before} · ${at} · ${after}`);
    // 경계를 1원 넘었다고 공제가 1원 넘게 움직이면 구간식이 틀린 것이다
    assert.ok(after - at <= 1, `${edge} 위쪽에서 튀었다: ${after - at}`);
  }
  // 350만원까지는 전액이다
  assert.equal(pensionDeduction(2_000_000), 2_000_000);
  assert.equal(pensionDeduction(3_500_000), 3_500_000);
  // 구간의 시작값을 직접 확인한다
  assert.equal(pensionDeduction(7_000_000), 4_900_000);
  assert.equal(pensionDeduction(14_000_000), 6_300_000);
});

test('연금소득공제는 900만원에서 멈춘다', () => {
  assert.equal(pensionDeduction(41_000_000), PENSION_DEDUCTION_CAP);
  assert.equal(pensionDeduction(100_000_000), PENSION_DEDUCTION_CAP);
  // 한도에 닿기 직전은 아직 한도보다 작다
  assert.ok(pensionDeduction(40_000_000) < PENSION_DEDUCTION_CAP);
});

test('공제가 커서 공적연금만 적게 받으면 세금이 0이다', () => {
  /* 국민연금만 받는 분이 세금을 안 내는 경우가 실제로 흔하다 */
  const r = calcPensionTax({ ...base, publicAnnual: 6_000_000 });
  assert.equal(r.publicTax, 0);
  assert.equal(r.totalTax, 0);
  assert.equal(r.netAnnual, 6_000_000);
});

test('사적연금 세율이 70세와 80세에서 내려간다', () => {
  assert.equal(privateRate(69), 0.055);
  assert.equal(privateRate(70), 0.044);
  assert.equal(privateRate(79), 0.044);
  assert.equal(privateRate(80), 0.033);
  assert.equal(privateRate(95), 0.033);

  // 한 살 차이로 세금이 실제로 줄어든다
  const at69 = calcPensionTax({ ...base, privateAnnual: 12_000_000, age: 69 }).privateTax;
  const at70 = calcPensionTax({ ...base, privateAnnual: 12_000_000, age: 70 }).privateTax;
  assert.ok(at70 < at69, `${at70} < ${at69}가 아니다`);
});

test('사적연금 1,500만원을 넘기면 세율이 16.5%로 뛴다', () => {
  const at = calcPensionTax({ ...base, privateAnnual: PRIVATE_SEPARATE_LIMIT, age: 65 });
  const over = calcPensionTax({ ...base, privateAnnual: PRIVATE_SEPARATE_LIMIT + 1, age: 65 });

  assert.equal(at.privateOverLimit, false);
  assert.equal(at.privateRate, 0.055);
  assert.equal(over.privateOverLimit, true);
  assert.equal(over.privateRate, PRIVATE_OVER_RATE);
  // 1원 더 받았는데 세금이 크게 뛴다 — 이 문턱이 이 계산기의 요점이다
  assert.ok(over.privateTax > at.privateTax * 2.5, `문턱이 없다: ${at.privateTax} → ${over.privateTax}`);

  // 나이가 많아도 한도를 넘기면 16.5%다
  assert.equal(calcPensionTax({ ...base, privateAnnual: 20_000_000, age: 85 }).privateRate, PRIVATE_OVER_RATE);
});

test('나눠 받으면 세금이 줄어든다', () => {
  /*
   * 같은 총액을 몇 해에 나누느냐가 세금을 정한다. 해를 늘리면 한 해 금액이
   * 1,500만원 밑으로 내려가고, 게다가 나이가 들어 세율이 또 내려간다.
   */
  const table = spreadTable({ ...base, age: 68 }, 90_000_000, [3, 6, 9, 12]);
  assert.equal(table.length, 4);

  for (let i = 1; i < table.length; i++) {
    assert.ok(
      table[i].totalTax <= table[i - 1].totalTax,
      `${table[i].years}년으로 나눴는데 세금이 늘었다: ${table[i - 1].totalTax} → ${table[i].totalTax}`,
    );
  }
  // 3년에 나누면 한 해 3천만원이라 한도를 넘고, 9년이면 1천만원이라 안 넘는다
  assert.equal(table[0].rate, PRIVATE_OVER_RATE);
  assert.ok(table[2].rate < PRIVATE_OVER_RATE);
  // 총액은 그대로다
  for (const row of table) {
    assert.ok(Math.abs(row.perYear * row.years - 90_000_000) < 1e-6);
  }
});

test('지방소득세는 소득세의 10%다', () => {
  const r = calcPensionTax({ ...base, publicAnnual: 40_000_000, personalDeduction: 3_000_000 });
  assert.ok(r.publicTax > 0, '세금이 안 나왔다 — 입력을 잘못 잡았다');
  assert.ok(Math.abs(r.publicLocalTax - r.publicTax * LOCAL_TAX_RATE) < 1e-9);
});

test('과세표준과 산출세액이 공유하는 표와 맞는다', () => {
  /* 세율표를 여기서 또 적지 않고 lib/retirement-income-tax.ts의 것을 되짚는다 */
  const r = calcPensionTax({ ...base, publicAnnual: 30_000_000, personalDeduction: 2_000_000 });
  assert.equal(r.publicIncome, 30_000_000 - pensionDeduction(30_000_000));
  assert.equal(r.taxBase, r.publicIncome - 2_000_000);
  assert.equal(r.publicTax, progressiveTax(r.taxBase));
});

test('세후 금액과 실효세율이 서로 맞는다', () => {
  const r = calcPensionTax({ ...base, publicAnnual: 24_000_000, privateAnnual: 12_000_000, age: 72 });
  const gross = 24_000_000 + 12_000_000;
  assert.ok(Math.abs(r.netAnnual - (gross - r.totalTax)) < 1e-9);
  assert.ok(Math.abs(r.netMonthly * 12 - r.netAnnual) < 1e-9);
  assert.ok(Math.abs(r.effectiveRate - (r.totalTax / gross) * 100) < 1e-9);
  // 연금은 다른 소득보다 세금이 가볍다 — 실효세율이 두 자리를 넘으면 뭔가 틀렸다
  assert.ok(r.effectiveRate < 10, `실효세율 ${r.effectiveRate}%`);
});
