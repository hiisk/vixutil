/**
 * 주택용 전기요금 — 누진 계산을 다른 길로 되짚는다.
 *
 * 표를 lib으로 옮기면서 두 페이지가 같은 값을 쓰게 됐다. 그러니 표가 틀리면
 * 두 곳이 함께 틀린다 — 여기서 막는다.
 *
 * 되짚는 방법은 셋이다. 구간 경계에서 손으로 센 값과 맞추고, 사용량을 잘게
 * 쪼개 더한 값이 한 번에 센 값과 같은지 보고, 늘어나는 금액이 두 총액의
 * 차이와 같은지 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  FUND_RATE, TIERS, VAT_RATE,
  calcElectricity, extraCost, tierOf, toNextTier,
} from '../lib/electricity-tariff.ts';

test('구간은 오르는 차례이고 마지막이 무한대다', () => {
  assert.equal(TIERS.length, 3);
  for (let i = 1; i < TIERS.length; i++) {
    assert.ok(TIERS[i].limit > TIERS[i - 1].limit, `${i}번째 상한이 안 올랐다`);
    assert.ok(TIERS[i].rate > TIERS[i - 1].rate, `${i}번째 단가가 안 올랐다`);
    assert.ok(TIERS[i].basic > TIERS[i - 1].basic, `${i}번째 기본요금이 안 올랐다`);
  }
  assert.equal(TIERS[TIERS.length - 1].limit, Infinity);
});

test('구간을 가르는 자리가 정확하다', () => {
  assert.equal(tierOf(0), 0);
  assert.equal(tierOf(200), 0, '200kWh는 아직 1구간이다');
  assert.equal(tierOf(200.1), 1);
  assert.equal(tierOf(400), 1, '400kWh는 아직 2구간이다');
  assert.equal(tierOf(400.1), 2);
  assert.equal(tierOf(10_000), 2);

  assert.equal(toNextTier(150), 50);
  assert.equal(toNextTier(200), 0);
  assert.equal(toNextTier(390), 10);
  assert.equal(toNextTier(500), null, '마지막 구간에는 다음이 없다');
});

test('손으로 센 값과 맞는다', () => {
  // 100kWh: 기본 910 + 100 × 120.0 = 12,910
  const a = calcElectricity(100);
  assert.equal(a.basicFee, 910);
  assert.ok(Math.abs(a.usageFee - 12_000) < 1e-9);
  assert.ok(Math.abs(a.subtotal - 12_910) < 1e-9);

  // 300kWh: 기본 1,600 + 200×120 + 100×214.6 = 1,600 + 24,000 + 21,460 = 47,060
  const b = calcElectricity(300);
  assert.equal(b.basicFee, 1600);
  assert.ok(Math.abs(b.usageFee - 45_460) < 1e-9);
  assert.ok(Math.abs(b.subtotal - 47_060) < 1e-9);

  // 500kWh: 기본 7,300 + 200×120 + 200×214.6 + 100×307.3
  const c = calcElectricity(500);
  assert.equal(c.basicFee, 7300);
  assert.ok(Math.abs(c.usageFee - (24_000 + 42_920 + 30_730)) < 1e-9);
});

test('부가세와 기금은 소계에 붙는다', () => {
  for (const kwh of [1, 100, 200, 201, 400, 401, 800]) {
    const b = calcElectricity(kwh);
    assert.ok(Math.abs(b.subtotal - (b.basicFee + b.usageFee)) < 1e-9, `${kwh}: 소계`);
    assert.ok(Math.abs(b.vat - b.subtotal * VAT_RATE) < 1e-9, `${kwh}: 부가세`);
    assert.ok(Math.abs(b.fund - b.subtotal * FUND_RATE) < 1e-9, `${kwh}: 기금`);
    assert.ok(Math.abs(b.total - (b.subtotal + b.vat + b.fund)) < 1e-9, `${kwh}: 합계`);
  }
});

test('잘게 쪼개 더해도 사용량 요금이 같다', () => {
  /*
   * 구간을 넘긴 만큼만 비싼 단가가 붙는다는 것은, 1kWh씩 쌓아 올린 값과
   * 한 번에 센 값이 같다는 뜻이다. 구간 경계를 잘못 잡으면 여기서 갈린다.
   * (기본요금은 최종 구간 하나로 정해지므로 사용량 요금만 견준다)
   */
  for (const kwh of [50, 199, 200, 201, 350, 400, 401, 600]) {
    let piecewise = 0;
    for (let i = 1; i <= kwh; i++) {
      piecewise += calcElectricity(i).usageFee - calcElectricity(i - 1).usageFee;
    }
    assert.ok(Math.abs(piecewise - calcElectricity(kwh).usageFee) < 1e-6, `${kwh}kWh`);
  }
  assert.equal(calcElectricity(0).usageFee, 0);
});

test('사용량이 늘면 요금도 는다', () => {
  let prev = -1;
  for (let kwh = 0; kwh <= 800; kwh += 10) {
    const t = calcElectricity(kwh).total;
    assert.ok(t > prev, `${kwh}kWh에서 줄었다`);
    prev = t;
  }
});

test('늘어나는 금액은 두 총액의 차이다', () => {
  for (const [base, add] of [[0, 100], [150, 100], [350, 100], [390, 20], [500, 100]] as const) {
    const want = calcElectricity(base + add).total - calcElectricity(base).total;
    assert.ok(Math.abs(extraCost(base, add) - want) < 1e-9, `${base}+${add}`);
  }
});

test('같은 사용량도 이미 쓴 양에 따라 값이 다르다', () => {
  /*
   * 이 성질이 가전별 요금 계산기의 이유다. 에어컨 100kWh는 홀로 정해지지
   * 않는다 — 1구간에 얹히는 것과 3구간에 얹히는 것이 두 배 넘게 차이 난다.
   */
  const low = extraCost(50, 100);
  const high = extraCost(450, 100);
  assert.ok(high > low * 2, `1구간 ${low}원 vs 3구간 ${high}원 — 차이가 너무 작다`);

  // 구간을 넘기는 순간 기본요금이 한 번에 뛴다
  const jump = extraCost(399, 2);
  const flat = extraCost(300, 2);
  assert.ok(jump > flat + 5_000, `구간을 넘겼는데 기본요금이 안 뛰었다: ${jump} vs ${flat}`);
});
