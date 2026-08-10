/**
 * 차량 유지비 — 셈을 다른 길로 되짚는다.
 *
 * 합계는 항목의 합이고, 월 평균과 km당은 그 합을 나눈 값이다. 연료비만
 * 주행거리를 따라 움직이고 나머지는 그대로여야 한다 — 뒤섞으면 여기서 갈린다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { carCost, fixedCost } from '../lib/car-cost.ts';

const car = {
  km: 12_000, kmpl: 12, fuelPrice: 1_700,
  tax: 520_000, insurance: 800_000, maintenance: 400_000, parking: 600_000,
};

test('합계는 항목의 합이다', () => {
  const c = carCost(car);
  const sum = c.fuel + c.tax + c.insurance + c.maintenance + c.parking;
  assert.ok(Math.abs(c.yearly - sum) < 1e-9);
  // 연료비는 주행거리 ÷ 연비 × 유가 — 손으로 셈하면 1,000L × 1,700원
  assert.ok(Math.abs(c.fuel - 1_700_000) < 1e-9);
  assert.ok(Math.abs(c.yearly - 4_020_000) < 1e-9);
});

test('월 평균과 km당은 합계를 나눈 값이다', () => {
  const c = carCost(car);
  assert.ok(Math.abs(c.monthly * 12 - c.yearly) < 1e-9);
  assert.ok(Math.abs(c.perKm * car.km - c.yearly) < 1e-6);
  // 0으로 나누지 않는다
  assert.equal(carCost({ ...car, km: 0 }).perKm, 0);
});

test('주행거리를 두 배로 하면 연료비만 두 배다', () => {
  const a = carCost(car);
  const b = carCost({ ...car, km: car.km * 2 });
  assert.ok(Math.abs(b.fuel - a.fuel * 2) < 1e-9, '연료비가 두 배가 아니다');
  assert.equal(b.insurance, a.insurance, '보험료가 주행거리를 따라갔다');
  assert.equal(b.tax, a.tax);
  assert.ok(b.yearly < a.yearly * 2, '고정비까지 두 배가 됐다');
  // 많이 탈수록 km당 비용은 싸진다 — 고정비가 나뉘기 때문이다
  assert.ok(b.perKm < a.perKm);
});

test('연비가 좋을수록 연료비가 준다', () => {
  let prev = Infinity;
  for (const kmpl of [6, 8, 10, 12, 16, 20]) {
    const f = carCost({ ...car, kmpl }).fuel;
    assert.ok(f < prev, `${kmpl}km/L에서 안 줄었다`);
    prev = f;
  }
  // 연비를 0으로 두면 연료비를 빼고 센다(전기차 등 직접 넣는 경우)
  const ev = carCost({ ...car, kmpl: 0 });
  assert.equal(ev.fuel, 0);
  assert.equal(ev.fuelShare, 0);
  assert.ok(Math.abs(ev.yearly - (car.tax + car.insurance + car.maintenance + car.parking)) < 1e-9);
});

test('안 굴려도 나가는 돈은 세금·보험·주차다', () => {
  assert.equal(fixedCost(car), 520_000 + 800_000 + 600_000);
  // 주행거리를 0으로 해도 고정비는 그대로다
  const parked = carCost({ ...car, km: 0 });
  assert.ok(Math.abs(parked.yearly - (fixedCost(car) + car.maintenance)) < 1e-9);
});

test('연료비 비중은 0과 1 사이다', () => {
  for (const km of [0, 5_000, 12_000, 40_000]) {
    const c = carCost({ ...car, km });
    assert.ok(c.fuelShare >= 0 && c.fuelShare <= 1, `${km}km: ${c.fuelShare}`);
    assert.ok(Math.abs(c.fuelShare * c.yearly - c.fuel) < 1e-6);
  }
  // 항목이 모두 0이면 비율도 0이다 — 0으로 나누지 않는다
  assert.equal(carCost({ km: 0, kmpl: 0, fuelPrice: 0, tax: 0, insurance: 0, maintenance: 0, parking: 0 }).fuelShare, 0);
});
