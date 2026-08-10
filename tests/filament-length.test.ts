/**
 * 필라멘트 길이 — 셈을 다른 길로 되짚는다.
 *
 * 길이는 무게를 1미터의 무게로 나눈 값이므로, 길이에 1미터 무게를 도로 곱하면
 * 스풀 무게가 나와야 한다. 부피는 무게를 밀도로 나눈 것이라 지름과 무관해야
 * 하고, 지름별 길이에 단면적을 곱한 부피가 그 값과 같아야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CELLS, DIAMETERS, MATERIALS, SPOOLS, cellOf, materialOf, slugOf } from '../lib/filament/list.ts';
import { filamentFacts, gramsPerMetre, metresOf } from '../lib/filament/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return filamentFacts(c);
};

test('칸은 재료 8가지 × 스풀 6가지', () => {
  assert.equal(MATERIALS.length, 8);
  assert.equal(SPOOLS.length, 6);
  assert.equal(CELLS.length, 48);
  assert.equal(new Set(CELLS.map(slugOf)).size, 48);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < SPOOLS.length; i++) assert.ok(SPOOLS[i] > SPOOLS[i - 1]);
  // 밀도는 전부 0.9~1.5 사이의 그럴듯한 값이어야 한다 — 자릿수 실수를 잡는다
  for (const m of MATERIALS) assert.ok(m.density > 0.9 && m.density < 1.5, `${m.key}: ${m.density}`);
  assert.equal(cellOf('pla'), undefined);
  assert.equal(cellOf('wood-1000g'), undefined, '축에 없는 재료가 열리면 안 된다');
  assert.equal(cellOf('pla-1234g'), undefined, '축에 없는 무게가 열리면 안 된다');
});

test('길이에 1미터 무게를 도로 곱하면 스풀 무게다', () => {
  for (const c of CELLS) {
    const mat = materialOf(c.material)!;
    for (const d of DIAMETERS) {
      const back = metresOf(c.grams, d, mat.density) * gramsPerMetre(d, mat.density);
      assert.ok(Math.abs(back - c.grams) < 1e-9, `${slugOf(c)} ${d}mm`);
    }
  }
  // 널리 알려진 값 — PLA 1.75mm 1kg은 330m 남짓이다
  const pla = facts('pla-1000g').diameters.find(d => d.diameter === 1.75)!;
  assert.ok(pla.metres > 320 && pla.metres < 345, `PLA 1kg이 ${pla.metres}m`);
  // 1m의 무게도 널리 알려진 3g 언저리다
  assert.ok(pla.gramsPerMetre > 2.8 && pla.gramsPerMetre < 3.1, `${pla.gramsPerMetre}g/m`);
});

test('부피는 지름과 무관하고, 단면적을 곱해 되짚으면 같다', () => {
  for (const c of CELLS) {
    const f = filamentFacts(c);
    assert.ok(Math.abs(f.volume - c.grams / f.density) < 0.01, f.slug);
    for (const d of f.diameters) {
      // 길이(m) × 단면적(mm²) × 1000 = 부피(mm³) → cm³로 나누면 f.volume
      const mat = materialOf(c.material)!;
      const exactM = metresOf(c.grams, d.diameter, mat.density);
      const vol = (exactM * Math.PI * (d.diameter / 2) ** 2 * 1000) / 1000;
      assert.ok(Math.abs(vol - c.grams / f.density) < 0.01, `${f.slug} ${d.diameter}mm: ${vol}`);
    }
  }
});

test('굵은 필라멘트는 같은 무게에서 짧다', () => {
  for (const c of CELLS) {
    const f = filamentFacts(c);
    const thin = f.diameters.find(d => d.diameter === 1.75)!;
    const thick = f.diameters.find(d => d.diameter === 2.85)!;
    assert.ok(thick.metres < thin.metres, f.slug);
    // 길이 비는 단면적 비의 역수다 — (2.85/1.75)² ≈ 2.65
    const want = (2.85 / 1.75) ** 2;
    assert.ok(Math.abs(thin.metres / thick.metres - want) < 0.03, `${f.slug}: ${thin.metres / thick.metres}`);
  }
});

test('밀도가 큰 재료는 같은 무게에서 짧다', () => {
  // PETG(1.27)가 ABS(1.04)보다 짧다
  const petg = facts('petg-1000g').diameters[0].metres;
  const abs = facts('abs-1000g').diameters[0].metres;
  assert.ok(petg < abs, `PETG ${petg}m vs ABS ${abs}m`);
  // 이웃이 실제로 밀도 차례를 따른다
  for (const c of CELLS) {
    const f = filamentFacts(c);
    if (f.denser) assert.ok(filamentFacts(cellOf(f.denser.slug)!).density >= f.density, f.slug);
    if (f.lighter) assert.ok(filamentFacts(cellOf(f.lighter.slug)!).density <= f.density, f.slug);
    if (f.bigger) assert.ok(f.bigger.grams > c.grams, f.slug);
    if (f.smaller) assert.ok(f.smaller.grams < c.grams, f.slug);
  }
});

test('무게가 두 배면 길이도 두 배다', () => {
  for (const m of MATERIALS) {
    const a = facts(`${m.key}-500g`).diameters[0].metres;
    const b = facts(`${m.key}-1000g`).diameters[0].metres;
    assert.ok(Math.abs(b / a - 2) < 0.01, `${m.key}: ${b / a}`);
  }
  // 10g당 길이 × 무게/10 = 전체 길이
  for (const c of CELLS) {
    const f = filamentFacts(c);
    for (const d of f.diameters) {
      assert.ok(Math.abs(d.metresPer10g * (c.grams / 10) - d.metres) < d.metres * 0.01 + 0.5, `${f.slug} ${d.diameter}`);
    }
  }
});

test('축에 없는 값을 넣으면 조용히 답하지 않는다', () => {
  assert.throws(() => filamentFacts({ material: 'wood', grams: 1000 }), /모르는 재료/);
  assert.throws(() => filamentFacts({ material: 'pla', grams: 1234 }), /모르는 스풀/);
});
