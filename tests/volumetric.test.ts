/**
 * 택배 부피무게 — 셈을 다른 길로 되짚는다.
 *
 * 부피무게는 부피를 계수로 나눈 값이므로, 거꾸로 곱하면 부피가 나와야 한다.
 * 요금 무게는 둘 중 큰 값이라는 성질도 경계에서 따로 짚는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { DIVISORS, maxVolumeFor, volumetricWeight } from '../lib/volumetric.ts';

const box = { width: 40, depth: 30, height: 20, actual: 3 };

test('계수 목록이 제자리에 있다', () => {
  assert.equal(DIVISORS.length, 2);
  const by = Object.fromEntries(DIVISORS.map(d => [d.key, d.value]));
  assert.equal(by.air, 5000);
  assert.equal(by.domestic, 6000);
  // 계수가 클수록 부피무게가 작다 — 유리한 쪽이다
  const a = volumetricWeight(box, 5000).volumetric;
  const b = volumetricWeight(box, 6000).volumetric;
  assert.ok(b < a, '계수가 큰데 부피무게가 안 줄었다');
});

test('부피무게에 계수를 도로 곱하면 부피다', () => {
  for (const d of [5000, 6000]) {
    const v = volumetricWeight(box, d);
    assert.ok(Math.abs(v.volumetric * d - v.volume) < 1e-9, `계수 ${d}`);
    assert.equal(v.volume, 40 * 30 * 20);
  }
  // 손으로 셈한 값 — 40×30×20 = 24,000㎤, 6000으로 나누면 4kg
  assert.equal(volumetricWeight(box, 6000).volumetric, 4);
  assert.equal(volumetricWeight(box, 5000).volumetric, 4.8);
});

test('요금 무게는 둘 중 큰 값이다', () => {
  // 실제 3kg, 부피 4kg → 부피가 이긴다
  const heavy = volumetricWeight(box, 6000);
  assert.equal(heavy.billable, 4);
  assert.equal(heavy.byVolume, true);

  // 실제 10kg이면 실제가 이긴다
  const dense = volumetricWeight({ ...box, actual: 10 }, 6000);
  assert.equal(dense.billable, 10);
  assert.equal(dense.byVolume, false);

  // 딱 같으면 부피 탓이 아니다 — 경계를 어느 쪽으로 잡았는지 박아 둔다
  const tie = volumetricWeight({ ...box, actual: 4 }, 6000);
  assert.equal(tie.billable, 4);
  assert.equal(tie.byVolume, false);
});

test('한 변을 줄이면 부피무게가 그만큼 준다', () => {
  const a = volumetricWeight(box, 6000).volumetric;
  const b = volumetricWeight({ ...box, height: 10 }, 6000).volumetric;
  assert.ok(Math.abs(b - a / 2) < 1e-9, '높이를 반으로 줄였는데 절반이 아니다');
});

test('세 변의 합은 따로 센다', () => {
  assert.equal(volumetricWeight(box, 6000).girth, 90);
  // 부피가 같아도 모양이 다르면 합은 다르다 — 택배사가 따로 거는 제한이다
  const flat = volumetricWeight({ width: 120, depth: 10, height: 20, actual: 3 }, 6000);
  const cube = volumetricWeight({ width: 40, depth: 30, height: 20, actual: 3 }, 6000);
  assert.equal(flat.volume, cube.volume);
  assert.ok(flat.girth > cube.girth);
});

test('실제 무게로 부치려면 부피가 얼마 아래여야 하나', () => {
  /*
   * 세제곱근으로 상자를 만들면 부동소수 오차가 남아 경계가 흔들린다.
   * 세 변을 곱해 한계 부피가 딱 떨어지는 상자를 골라 쓴다.
   */
  const cases: [number, number, [number, number, number]][] = [
    [3, 6000, [30, 30, 20]],    // 18,000㎤
    [10, 5000, [50, 50, 20]],   // 50,000㎤
    [0.5, 6000, [30, 10, 10]],  // 3,000㎤
  ];
  for (const [kg, d, [width, depth, height]] of cases) {
    const limit = maxVolumeFor(kg, d);
    assert.equal(width * depth * height, limit, `${kg}kg 계수 ${d}: 상자가 한계와 다르다`);
    const v = volumetricWeight({ width, depth, height, actual: kg }, d);
    assert.equal(v.volumetric, kg, '한계 부피에서는 부피무게가 실제 무게와 같다');
    assert.equal(v.byVolume, false, '경계에서는 부피 탓이 아니다');
    // 한 눈금만 커져도 부피가 이긴다
    const over = volumetricWeight({ width: width + 1, depth, height, actual: kg }, d);
    assert.equal(over.byVolume, true);
  }
});
