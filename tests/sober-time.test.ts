import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcSoberTime, BAC_LIMITS, ELIMINATION_PER_HOUR } from '../lib/sober-time.ts';

test('알려진 예시: 70kg 남성, 소주 1병', () => {
  // A = 360×0.17×0.789 = 48.28g
  // 최고농도 = 48.28 / (70×0.7×10) = 0.0985%
  const r = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }],
    weightKg: 70, sex: 'male', hoursSince: 0,
  });
  assert.ok(Math.abs(r.alcoholGrams - 48.28) < 0.1, `알코올량 ${r.alcoholGrams}`);
  assert.ok(Math.abs(r.peakBac - 0.0985) < 0.001, `최고농도 ${r.peakBac}`);
});

test('경과 시간만큼 혈중농도가 내려간다', () => {
  const base = { drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male' as const };
  const t0 = calcSoberTime({ ...base, hoursSince: 0 });
  const t3 = calcSoberTime({ ...base, hoursSince: 3 });
  // 3시간이면 0.015×3 = 0.045% 감소
  assert.ok(Math.abs((t0.peakBac - t3.currentBac) - 0.045) < 1e-9);
});

test('충분히 시간이 지나면 0으로 수렴하고 음수가 되지 않는다', () => {
  const r = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 100,
  });
  assert.equal(r.currentBac, 0);
});

test('완전 분해 시간은 최고농도 ÷ 분해율이다', () => {
  const r = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 0,
  });
  assert.ok(Math.abs(r.hoursToZero - r.peakBac / ELIMINATION_PER_HOUR) < 1e-9);
});

test('면허정지 기준까지 시간이 정확하다', () => {
  const r = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 0,
  });
  // (0.0985 − 0.03) / 0.015 ≈ 4.57시간
  const expected = (r.peakBac - BAC_LIMITS.suspend) / ELIMINATION_PER_HOUR;
  assert.ok(Math.abs(r.hoursToSuspendLimit - expected) < 1e-9);
  assert.ok(r.hoursToSuspendLimit > 4 && r.hoursToSuspendLimit < 5);
});

test('여러 잔을 합산한다', () => {
  const one = calcSoberTime({ drinks: [{ volumeMl: 50, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 0 });
  const three = calcSoberTime({
    drinks: [{ volumeMl: 50, abv: 17 }, { volumeMl: 50, abv: 17 }, { volumeMl: 50, abv: 17 }],
    weightKg: 70, sex: 'male', hoursSince: 0,
  });
  assert.ok(Math.abs(three.alcoholGrams - one.alcoholGrams * 3) < 1e-9);
  assert.ok(Math.abs(three.peakBac - one.peakBac * 3) < 1e-9);
});

test('같은 술이면 여성이 남성보다 혈중농도가 높다', () => {
  // 성별계수 r이 작아(0.6) 같은 양이라도 농도가 높게 나온다.
  const base = { drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 60, hoursSince: 0 };
  const male = calcSoberTime({ ...base, sex: 'male' });
  const female = calcSoberTime({ ...base, sex: 'female' });
  assert.ok(female.peakBac > male.peakBac);
});

test('현재 농도로 정지·취소 초과 여부를 판정한다', () => {
  const r = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 0,
  });
  // 0.0985%는 취소(0.08) 이상
  assert.equal(r.overRevokeNow, true);
  assert.equal(r.overSuspendNow, true);

  const later = calcSoberTime({
    drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: 5,
  });
  // 5시간 뒤 0.0985 − 0.075 = 0.0235% → 정지 미만
  assert.equal(later.overSuspendNow, false);
});

test('체중 0이나 안 마신 경우 터지지 않는다', () => {
  assert.equal(calcSoberTime({ drinks: [{ volumeMl: 360, abv: 17 }], weightKg: 0, sex: 'male', hoursSince: 0 }).peakBac, 0);
  assert.equal(calcSoberTime({ drinks: [], weightKg: 70, sex: 'male', hoursSince: 0 }).peakBac, 0);
  const neg = calcSoberTime({ drinks: [{ volumeMl: -100, abv: 17 }], weightKg: 70, sex: 'male', hoursSince: -5 });
  assert.ok(Number.isFinite(neg.peakBac));
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const input = { drinks: [{ volumeMl: 355, abv: 4.5 }], weightKg: 65, sex: 'female' as const, hoursSince: 2 };
  assert.deepEqual(calcSoberTime(input), calcSoberTime(input));
});
