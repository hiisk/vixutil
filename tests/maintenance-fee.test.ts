import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  calcMaintenance, compareBySqm, SQM_PER_PYEONG,
  COMMON_KEYS, INDIVIDUAL_KEYS, FEE_LABELS,
} from '../lib/maintenance-fee.ts';

test('공용관리비와 개별사용료를 나눠 합산한다', () => {
  const r = calcMaintenance(
    { general: 50_000, security: 30_000, heating: 40_000, electricity: 20_000 },
    84.95,
  );
  assert.equal(r.common, 80_000);
  assert.equal(r.individual, 60_000);
  assert.equal(r.total, 140_000);
});

test('공용관리비 비중을 백분율로 낸다', () => {
  const r = calcMaintenance({ general: 60_000, heating: 40_000 }, 84.95);
  assert.equal(r.commonShare, 60);
});

test('전용면적으로 ㎡당·평당 단가를 낸다', () => {
  const r = calcMaintenance({ general: 100_000 }, 100);
  assert.equal(r.perSqm, 1_000);
  // 100㎡ = 30.25평이므로 평당 단가는 ㎡당의 3.3배 남짓
  assert.ok(Math.abs(r.perPyeong - 100_000 / (100 / SQM_PER_PYEONG)) < 0.001);
  assert.ok(r.perPyeong > r.perSqm);
});

test('면적이 0이거나 음수면 단가를 0으로 둔다', () => {
  // 0으로 나눠 Infinity가 화면에 뜨는 것을 막는다.
  for (const area of [0, -10]) {
    const r = calcMaintenance({ general: 100_000 }, area);
    assert.equal(r.perSqm, 0);
    assert.equal(r.perPyeong, 0);
    assert.ok(Number.isFinite(r.perSqm) && Number.isFinite(r.perPyeong));
  }
});

test('항목을 금액 큰 순으로 정렬하고 0원은 뺀다', () => {
  const r = calcMaintenance(
    { general: 10_000, heating: 90_000, security: 0, water: 50_000 },
    84.95,
  );
  assert.deepEqual(r.items.map(i => i.key), ['heating', 'water', 'general']);
  assert.equal(r.top?.key, 'heating');
  assert.ok(!r.items.some(i => i.key === 'security'), '0원 항목이 남아 있다');
});

test('항목 비율의 합이 100%가 된다', () => {
  const r = calcMaintenance({ general: 33_333, heating: 33_333, water: 33_334 }, 84.95);
  const sum = r.items.reduce((a, b) => a + b.share, 0);
  assert.ok(Math.abs(sum - 100) < 0.0001, `비율 합계 ${sum}`);
});

test('음수 입력은 0으로 처리한다', () => {
  // 입력창에 마이너스가 들어가도 합계가 깎이면 안 된다.
  const r = calcMaintenance({ general: 50_000, heating: -30_000 }, 84.95);
  assert.equal(r.total, 50_000);
  assert.equal(r.individual, 0);
});

test('아무것도 입력하지 않으면 전부 0이고 나눗셈이 터지지 않는다', () => {
  const r = calcMaintenance({}, 84.95);
  assert.equal(r.total, 0);
  assert.equal(r.commonShare, 0);
  assert.equal(r.perSqm, 0);
  assert.equal(r.items.length, 0);
  assert.equal(r.top, null);
});

test('㎡당 단가 차이를 우리 집 면적 기준 금액으로 환산한다', () => {
  // 우리가 1,500원/㎡, 비교 대상이 1,200원/㎡, 84.95㎡면 월 약 25,485원 더 낸다
  const diff = compareBySqm(1_500, 1_200, 84.95);
  assert.ok(Math.abs(diff - 300 * 84.95) < 0.001);
  assert.ok(diff > 0, '더 내는 경우 양수여야 한다');
  assert.ok(compareBySqm(1_000, 1_200, 84.95) < 0, '덜 내는 경우 음수여야 한다');
  assert.equal(compareBySqm(1_500, 1_200, 0), 0, '면적이 없으면 0');
});

test('모든 항목 키에 한글 라벨이 있다', () => {
  for (const key of [...COMMON_KEYS, ...INDIVIDUAL_KEYS]) {
    assert.ok(FEE_LABELS[key]?.trim(), `${key} 라벨 없음`);
  }
});

test('공용과 개별 항목이 겹치지 않는다', () => {
  // 겹치면 총액에 두 번 더해진다.
  const overlap = COMMON_KEYS.filter(k => (INDIVIDUAL_KEYS as readonly string[]).includes(k));
  assert.deepEqual(overlap, []);
});
