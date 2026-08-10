/**
 * 계약갱신 인상 한도 — 셈을 다른 길로 되짚는다.
 *
 * 상한은 5%이므로 올린 값을 1.05로 도로 나누면 원래 값이 나와야 한다.
 * 전월세 전환은 두 방향이 서로 역이어야 한다 — 보증금을 월세로 바꿨다가
 * 도로 바꾸면 처음 값으로 돌아온다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CAP_RATIO, allAsMonthly, conversionRate, depositToMonthly, monthlyToDeposit, renewalCap,
} from '../lib/lease-renewal.ts';

test('상한은 20분의 1이다', () => {
  assert.equal(CAP_RATIO, 0.05);

  // 전세 3억이면 3억 1,500만이 상한이다
  const jeonse = renewalCap({ deposit: 300_000_000, monthly: 0 });
  assert.equal(jeonse.maxDeposit, 315_000_000);
  assert.equal(jeonse.depositRise, 15_000_000);
  assert.equal(jeonse.maxMonthly, 0);
  assert.equal(jeonse.monthlyRise, 0);

  // 보증금 5,000 / 월세 50만이면 각각 5%씩이다
  const wolse = renewalCap({ deposit: 50_000_000, monthly: 500_000 });
  assert.equal(wolse.maxDeposit, 52_500_000);
  assert.equal(wolse.maxMonthly, 525_000);
});

test('올린 값을 도로 나누면 원래 값이다', () => {
  for (const deposit of [10_000_000, 123_456_789, 900_000_000]) {
    for (const monthly of [0, 350_000, 1_200_000]) {
      const c = renewalCap({ deposit, monthly });
      assert.ok(Math.abs(c.maxDeposit / (1 + CAP_RATIO) - deposit) < 1e-6, `${deposit}`);
      assert.ok(Math.abs(c.maxMonthly / (1 + CAP_RATIO) - monthly) < 1e-6, `${monthly}`);
      // 증액분은 상한에서 지금 값을 뺀 것이다
      assert.ok(Math.abs(c.depositRise - (c.maxDeposit - deposit)) < 1e-9);
      assert.ok(Math.abs(c.monthlyRise - (c.maxMonthly - monthly)) < 1e-9);
      // 한쪽만 크게 올리는 것은 상한을 넘는다 — 5%는 각각에 걸린다
      assert.ok(c.depositRise <= deposit * CAP_RATIO + 1e-6);
    }
  }
});

test('전월세 전환은 두 방향이 서로 역이다', () => {
  for (const rate of [0.02, 0.045, 0.055, 0.1]) {
    for (const amount of [10_000_000, 15_000_000, 50_000_000]) {
      const monthly = depositToMonthly(amount, rate);
      assert.ok(Math.abs(monthlyToDeposit(monthly, rate) - amount) < 1e-6, `${amount} @ ${rate}`);
    }
  }
  // 손으로 셈한 값 — 보증금 1,000만을 연 5.5%로 돌리면 월 45,833원
  assert.ok(Math.abs(depositToMonthly(10_000_000, 0.055) - 45_833.33) < 0.5);
  // 전환율이 0이면 보증금으로 되돌릴 수 없다 — 0으로 나누지 않는다
  assert.equal(monthlyToDeposit(500_000, 0), 0);
});

test('전환율은 기준금리에 더한 값과 상한 중 낮은 쪽이다', () => {
  // 기준금리 2.5% + 2% = 4.5%, 상한 10%보다 낮으므로 4.5%
  assert.ok(Math.abs(conversionRate(0.025, 0.02, 0.1) - 0.045) < 1e-9);
  // 기준금리가 크게 오르면 상한에 걸린다
  assert.equal(conversionRate(0.09, 0.02, 0.1), 0.1);
  assert.equal(conversionRate(0.2, 0.02, 0.1), 0.1);
});

test('증액분을 모두 월세로 돌리면 월 부담이 얼마 느나', () => {
  const lease = { deposit: 100_000_000, monthly: 300_000 };
  const rate = 0.055;
  const a = allAsMonthly(lease, rate);

  // 월세만 5% 올리면 315,000원
  assert.equal(a.monthlyOnly, 315_000);
  // 보증금 증액분 500만을 월세로 돌리면 월 22,916원이 더 붙는다
  const fromDeposit = depositToMonthly(5_000_000, rate);
  assert.ok(Math.abs(a.depositAsMonthly - (315_000 + fromDeposit)) < 1e-6);
  // 늘어나는 월 부담은 월세 증액분과 보증금 환산분의 합이다
  assert.ok(Math.abs(a.extraPerMonth - (15_000 + fromDeposit)) < 1e-6);
  // 보증금을 안 올리는 쪽이 월 부담은 늘 적다
  assert.ok(a.monthlyOnly < a.depositAsMonthly);

  // 전세(월세 0)라도 보증금 증액분은 월세로 환산된다
  const jeonse = allAsMonthly({ deposit: 300_000_000, monthly: 0 }, rate);
  assert.equal(jeonse.monthlyOnly, 0);
  assert.ok(Math.abs(jeonse.depositAsMonthly - depositToMonthly(15_000_000, rate)) < 1e-6);
});
