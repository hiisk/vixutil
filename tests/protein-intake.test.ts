import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcProtein, PROTEIN_LEVELS } from '../lib/protein-intake.ts';

test('좌식 70kg의 권장량은 56~70g이다', () => {
  // 0.8~1.0 g/kg
  const r = calcProtein({ weightKg: 70, levelId: 'sedentary' });
  assert.equal(r.minGrams, 56);
  assert.equal(r.maxGrams, 70);
  assert.equal(r.midGrams, 63);
});

test('활동 수준이 높을수록 권장량이 늘어난다', () => {
  const prev = { min: -1, max: -1 };
  for (const level of PROTEIN_LEVELS) {
    const r = calcProtein({ weightKg: 70, levelId: level.id });
    assert.ok(r.minGrams >= prev.min, `${level.label}: 하한이 줄었다`);
    assert.ok(r.maxGrams >= prev.max, `${level.label}: 상한이 줄었다`);
    prev.min = r.minGrams;
    prev.max = r.maxGrams;
  }
});

test('상한이 하한보다 크거나 같다', () => {
  for (const level of PROTEIN_LEVELS) {
    for (const weight of [50, 70, 90]) {
      const r = calcProtein({ weightKg: weight, levelId: level.id });
      assert.ok(r.maxGrams >= r.minGrams, `${level.label}/${weight}kg`);
      assert.ok(r.midGrams >= r.minGrams && r.midGrams <= r.maxGrams);
    }
  }
});

test('끼니당 참고량은 중앙값의 1/3이다', () => {
  const r = calcProtein({ weightKg: 90, levelId: 'strength' });
  assert.equal(r.perMeal, Math.round(r.midGrams / 3));
});

test('알 수 없는 레벨은 좌식으로 폴백한다', () => {
  const r = calcProtein({ weightKg: 70, levelId: 'nonexistent' });
  assert.equal(r.level.id, 'sedentary');
});

test('체중과 권장량이 비례한다', () => {
  const a = calcProtein({ weightKg: 60, levelId: 'active' });
  const b = calcProtein({ weightKg: 120, levelId: 'active' });
  // 체중 2배 → 권장량도 약 2배 (반올림 오차 허용)
  assert.ok(Math.abs(b.minGrams - a.minGrams * 2) <= 1);
});

test('체중 0이나 음수에서 터지지 않는다', () => {
  assert.equal(calcProtein({ weightKg: 0, levelId: 'active' }).midGrams, 0);
  const neg = calcProtein({ weightKg: -10, levelId: 'active' });
  assert.ok(neg.minGrams >= 0);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  const a = calcProtein({ weightKg: 75, levelId: 'cut' });
  const b = calcProtein({ weightKg: 75, levelId: 'cut' });
  assert.deepEqual(a, b);
});
