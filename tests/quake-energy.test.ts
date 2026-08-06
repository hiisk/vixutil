/**
 * 지진 규모 — 로그를 배수 쪽에서 되짚는다.
 *
 * 이 표의 전제는 하나다. log10(에너지) = 1.5 × 규모 + 4.8. 그래서 검사는
 * 에너지 값을 맞추는 대신 **배수**로 선다 — 규모 1 차이가 31.6배, 2 차이가
 * 정확히 1000배가 되는지, 그리고 그 배수가 규모가 어디든 같은지.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  ENERGY_BASE, ENERGY_SLOPE, HIROSHIMA_TNT_TONS, JOULE_PER_TNT_TON,
  MAGNITUDES, MAX_MAGNITUDE, MIN_MAGNITUDE, STEP, magnitudeOf, slugOf,
} from '../lib/quake/list.ts';
import { around, atTenth, energyOf, logEnergyOf, quakeFacts, ratioFor } from '../lib/quake/facts.ts';

const facts = (slug: string) => {
  const m = magnitudeOf(slug);
  assert.ok(m !== undefined, `${slug} 칸이 없다`);
  return quakeFacts(m);
};

test('칸은 4.0에서 9.5까지 0.05 단위', () => {
  assert.equal(MIN_MAGNITUDE, 4);
  assert.equal(MAX_MAGNITUDE, 9.5);
  assert.equal(STEP, 0.05);
  assert.equal(MAGNITUDES.length, 111);
  assert.equal(MAGNITUDES[0], 4);
  assert.equal(MAGNITUDES[MAGNITUDES.length - 1], 9.5);
  assert.equal(new Set(MAGNITUDES.map(slugOf)).size, 111);
  for (const m of MAGNITUDES) assert.equal(magnitudeOf(slugOf(m)), m, `${m}`);
  // 눈금이 고르다
  for (let i = 1; i < MAGNITUDES.length; i++) {
    assert.ok(Math.abs(MAGNITUDES[i] - MAGNITUDES[i - 1] - STEP) < 1e-9, `${i}`);
  }
  assert.equal(magnitudeOf('3-95'), undefined);
  assert.equal(magnitudeOf('4-03'), undefined);
});

test('규모 1 차이는 에너지 31.6배', () => {
  assert.equal(ENERGY_SLOPE, 1.5);
  assert.equal(ENERGY_BASE, 4.8);
  // 10^1.5는 31.62다
  assert.ok(Math.abs(ratioFor(1) - 31.62) < 0.01);
  // 2 차이는 정확히 1000배다 — 10^3이기 때문이다
  assert.ok(Math.abs(ratioFor(2) - 1000) < 1e-9);
  // 배수는 규모가 어디든 같다
  for (const m of MAGNITUDES) {
    if (m + 1 > MAX_MAGNITUDE) continue;
    assert.ok(Math.abs(energyOf(m + 1) / energyOf(m) - ratioFor(1)) / ratioFor(1) < 1e-12, `${m}`);
  }
  // "규모 7이 6의 두 배"라는 어림은 크게 어긋난다
  assert.ok(energyOf(7) / energyOf(6) > 30);
});

test('에너지는 규모의 로그 함수', () => {
  for (const m of MAGNITUDES) {
    const f = quakeFacts(m);
    // 되돌리면 규모가 나온다
    assert.ok(Math.abs((logEnergyOf(m) - ENERGY_BASE) / ENERGY_SLOPE - m) < 1e-9, `${m}`);
    assert.ok(Math.abs(f.logJoule - logEnergyOf(m)) <= 0.0005 + 1e-9, `${m}`);
    // TNT 톤수는 줄을 TNT 한 톤으로 나눈 값이다
    assert.ok(Math.abs(f.tntTons - energyOf(m) / JOULE_PER_TNT_TON) / f.tntTons < 1e-12, `${m}`);
    // 히로시마 환산도 마찬가지다
    assert.ok(Math.abs(f.hiroshima - f.tntTons / HIROSHIMA_TNT_TONS) / f.hiroshima < 1e-12, `${m}`);
  }
  // 규모 6.0은 TNT 15,000톤 언저리 — 히로시마 한 발쯤이다
  const six = facts('6-00');
  assert.ok(six.hiroshima > 0.9 && six.hiroshima < 1.1, `${six.hiroshima}`);
});

test('한 눈금은 어디서나 같은 배수다', () => {
  const step = ratioFor(STEP);
  // 0.05 차이는 10^0.075 = 1.19배다
  assert.ok(Math.abs(step - 1.189) < 0.001);
  for (const m of MAGNITUDES) {
    const f = quakeFacts(m);
    assert.equal(f.stepRatio, Math.round(step * 1000) / 1000, `${m}`);
    if (!f.higher) continue;
    assert.ok(Math.abs(energyOf(f.higher.magnitude) / energyOf(m) - step) / step < 1e-12, `${m}`);
  }
  // 스무 눈금을 밟으면 규모 1이 오르고 31.6배가 된다
  assert.ok(Math.abs(step ** 20 - ratioFor(1)) / ratioFor(1) < 1e-9);
});

test('작은 지진 몇 번을 모아야 하나', () => {
  for (const m of MAGNITUDES) {
    const f = quakeFacts(m);
    // 규모가 1 낮은 지진의 배수는 규모와 무관하게 같다
    assert.equal(f.perOneLower, Math.round(ratioFor(1) * 10) / 10, `${m}`);
  }
  // 규모 7 하나는 규모 6 서른두 번쯤과 같다
  assert.ok(Math.abs(facts('7-00').perOneLower - 31.6) < 0.1);
  // 규모 9 하나는 규모 6 삼만 번쯤과 같다
  assert.ok(Math.abs(ratioFor(3) - 31623) < 10);
});

test('앞뒤와 이웃을 짚는다', () => {
  const f = facts('6-00');
  assert.equal(f.lower?.magnitude, 5.95);
  assert.equal(f.higher?.magnitude, 6.05);
  assert.equal(facts('4-00').lower, null);
  assert.equal(facts('9-50').higher, null);
  // 언저리 목록은 자기를 가운데 두고 앞뒤로 뻗는다
  const near = around(6);
  assert.ok(near.includes(6));
  assert.equal(near.length, 13);
  assert.equal(around(4).length, 7);
  // 소수 첫째 자리가 같은 칸은 둘씩이다(4.3과 4.35)
  assert.deepEqual(atTenth(4.3), [4.3, 4.35]);
  assert.deepEqual(atTenth(9.5), [9.5]);
});

test('에너지는 규모를 따라 늘기만 한다', () => {
  let last = -Infinity;
  for (const m of MAGNITUDES) {
    const e = energyOf(m);
    assert.ok(e > last, `${m}`);
    last = e;
  }
  // 가장 작은 칸과 가장 큰 칸의 배수가 어마어마하다
  assert.ok(Math.abs(energyOf(9.5) / energyOf(4) - ratioFor(5.5)) / ratioFor(5.5) < 1e-9);
  assert.ok(energyOf(9.5) / energyOf(4) > 1e8);
});
