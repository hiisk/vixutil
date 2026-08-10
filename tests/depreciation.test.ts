/**
 * 감가상각 — 셈을 다른 길로 되짚는다.
 *
 * 정률은 해마다 같은 비율이 걸리므로, 한 해씩 곱해 내려간 값과 거듭제곱으로
 * 한 번에 센 값이 같아야 한다. 반감기는 그 식을 로그로 뒤집은 것이므로
 * 그 해에 실제로 절반이 되는지 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decliningTable, decliningValue, halfLife, straightValue } from '../lib/depreciation.ts';

test('정률은 한 해씩 곱해 내려간 값과 같다', () => {
  const price = 40_000_000;
  for (const rate of [0.1, 0.15, 0.2, 0.3]) {
    let step = price;
    for (let y = 1; y <= 10; y++) {
      step *= 1 - rate;
      assert.ok(Math.abs(decliningValue(price, rate, y) - step) < 1e-6, `${rate} ${y}년`);
    }
  }
  // 손으로 셈한 값 — 4,000만을 해마다 20%씩 3년
  assert.ok(Math.abs(decliningValue(40_000_000, 0.2, 3) - 20_480_000) < 1e-6);
  // 0년째는 산 값 그대로다
  assert.equal(decliningValue(40_000_000, 0.2, 0), 40_000_000);
});

test('정률은 앞쪽 해가 더 많이 떨어진다', () => {
  const t = decliningTable(40_000_000, 0.2, 8);
  assert.equal(t.length, 9);
  assert.equal(t[0].lost, 0);
  for (let y = 2; y < t.length; y++) {
    assert.ok(t[y].lost < t[y - 1].lost, `${y}년째가 더 많이 떨어졌다`);
  }
  // 잔존가치는 계속 줄지만 0이 되지는 않는다
  for (let y = 1; y < t.length; y++) assert.ok(t[y].value < t[y - 1].value);
  assert.ok(t[t.length - 1].value > 0);
  // 그해 떨어진 값은 앞해와의 차이다
  for (let y = 1; y < t.length; y++) {
    assert.ok(Math.abs(t[y].lost - (t[y - 1].value - t[y].value)) < 1e-6, `${y}년`);
  }
  // 비율은 잔존가치를 산 값으로 나눈 것이다
  for (const r of t) assert.ok(Math.abs(r.ratio * 40_000_000 - r.value) < 1e-6);
});

test('정액은 해마다 같은 금액이 떨어진다', () => {
  const price = 40_000_000, salvage = 4_000_000, life = 10;
  const perYear = (price - salvage) / life;
  for (let y = 1; y <= life; y++) {
    const a = straightValue(price, salvage, life, y - 1);
    const b = straightValue(price, salvage, life, y);
    assert.ok(Math.abs(a - b - perYear) < 1e-6, `${y}년`);
  }
  // 수명을 넘겨도 잔존가치 아래로 안 내려간다
  assert.ok(Math.abs(straightValue(price, salvage, life, life) - salvage) < 1e-6);
  assert.ok(Math.abs(straightValue(price, salvage, life, life + 5) - salvage) < 1e-6);
  // 수명이 0이면 0으로 안 나눈다
  assert.equal(straightValue(price, salvage, 0, 3), price);
});

test('시작과 끝을 맞추면 가운데서 정률이 더 낮다', () => {
  /*
   * 이것이 차를 정률로 보는 이유다. 두 방식의 시작과 끝을 같게 맞춰도,
   * 정률은 앞쪽 해에 훨씬 많이 떨어뜨리므로 가운데 구간에서 정액보다 낮다.
   * "새 차는 사자마자 값이 떨어진다"가 이 모양이다.
   */
  const price = 40_000_000, life = 10, rate = 0.2;
  const salvage = decliningValue(price, rate, life);
  for (const y of [2, 4, 5, 6, 8]) {
    assert.ok(
      decliningValue(price, rate, y) < straightValue(price, salvage, life, y),
      `${y}년째에 정률이 정액보다 높다`,
    );
  }
  // 양 끝은 맞춰 두었으므로 같다
  assert.ok(Math.abs(decliningValue(price, rate, 0) - straightValue(price, salvage, life, 0)) < 1e-6);
  assert.ok(Math.abs(decliningValue(price, rate, life) - straightValue(price, salvage, life, life)) < 1e-6);
});

test('반감기 해에 값이 정확히 절반이 된다', () => {
  for (const rate of [0.05, 0.1, 0.2, 0.35]) {
    const n = halfLife(rate);
    assert.ok(n !== null);
    assert.ok(Math.abs(decliningValue(1, rate, n as number) - 0.5) < 1e-12, `${rate}`);
  }
  // 감가율이 클수록 빨리 절반이 된다
  assert.ok((halfLife(0.3) as number) < (halfLife(0.1) as number));
  // 안 떨어지거나 한 해에 다 떨어지면 반감기가 없다
  assert.equal(halfLife(0), null);
  assert.equal(halfLife(1), null);
  assert.equal(halfLife(-0.1), null);
});
