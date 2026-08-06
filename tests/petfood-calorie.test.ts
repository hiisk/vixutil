/**
 * 반려동물 하루 열량 — 계산을 다른 길로 되짚는다.
 *
 * 이 표의 전제는 둘이다. 기초대사량이 체중의 0.75제곱에 비례한다는 것과,
 * 국내 글이 자주 쓰는 선형 어림식이 그 곡선과 두 번 만난다는 것. 두 전제를
 * 곱셈이 아닌 성질 쪽에서 확인한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, DENSITIES, LINEAR_BASE, LINEAR_SLOPE, RER_COEF, RER_POWER, STATES, WEIGHTS,
  cellOf, slugOf, stateOf,
} from '../lib/petfood/list.ts';
import { gramsOf, linearHigher, linearOf, petFacts, rerOf, statesOf } from '../lib/petfood/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return petFacts(c);
};

test('칸은 상태 10가지 × 종별 체중 10가지', () => {
  assert.equal(STATES.length, 10);
  assert.equal(WEIGHTS.dog.length, 10);
  assert.equal(WEIGHTS.cat.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 종마다 다섯 상태씩이다
  assert.equal(statesOf('dog').length, 5);
  assert.equal(statesOf('cat').length, 5);
  // 체중 사다리는 오름차순이고 종마다 다르다
  for (const list of [WEIGHTS.dog, WEIGHTS.cat]) {
    for (let i = 1; i < list.length; i++) assert.ok(list[i] > list[i - 1]);
  }
  assert.ok(Math.max(...WEIGHTS.cat) < Math.max(...WEIGHTS.dog));
  assert.equal(cellOf('dog-neutered-11'), undefined);
  assert.equal(cellOf('cat-neutered-40'), undefined);
});

test('기초대사량은 체중의 0.75제곱에 비례한다', () => {
  assert.equal(RER_COEF, 70);
  assert.equal(RER_POWER, 0.75);
  // 체중이 2배면 기초대사량은 2^0.75배 — 곱셈을 안 쓰고 비율로 확인한다
  const ratio = 2 ** RER_POWER;
  for (const kg of [1.5, 2, 4, 10, 20]) {
    assert.ok(Math.abs(rerOf(kg * 2) / rerOf(kg) - ratio) < 1e-9, `${kg}kg`);
  }
  // 16배 무거우면 8배 먹는다(16^0.75 = 8)
  assert.ok(Math.abs(rerOf(32) / rerOf(2) - 8) < 1e-9);
  assert.equal(Math.round(rerOf(10)), 394);
});

test('선형 어림식은 지수 곡선과 두 번 만난다', () => {
  assert.equal(LINEAR_SLOPE, 30);
  assert.equal(LINEAR_BASE, 70);
  for (const kg of WEIGHTS.dog) {
    assert.equal(linearHigher(kg), linearOf(kg) > rerOf(kg), `${kg}kg`);
  }
  // 개 사다리를 따라가면 부호가 딱 두 번 뒤집힌다
  const signs = WEIGHTS.dog.map(linearHigher);
  const flips = signs.filter((v, i) => i > 0 && v !== signs[i - 1]).length;
  assert.equal(flips, 2, signs.join(','));
  // 양 끝에서는 선형식이 높고, 가운데에서는 낮다
  assert.equal(linearHigher(2), true);
  assert.equal(linearHigher(10), false);
  assert.equal(linearHigher(40), true);
  // 40kg에서 벌어지는 폭이 10%를 넘는다 — 어느 식을 썼는지가 답을 바꾼다
  assert.ok(Math.abs(facts('dog-neutered-40').gap) > 10);
});

test('상태 계수는 범위이고 단계 순서를 지킨다', () => {
  for (const s of STATES) {
    assert.ok(s.lo <= s.hi, s.key);
    assert.ok(s.lo > 0 && s.hi <= 3, s.key);
  }
  const at = (key: string) => {
    const s = stateOf(key);
    assert.ok(s, key);
    return s;
  };
  // 성장기 > 비중성화 성체 > 중성화 성체 > 감량, 종마다
  for (const [grow, junior, intact, neutered, diet] of [
    ['dog-puppy', 'dog-junior', 'dog-intact', 'dog-neutered', 'dog-diet'],
    ['cat-kitten', 'cat-junior', 'cat-intact', 'cat-neutered', 'cat-diet'],
  ]) {
    assert.ok(at(grow).hi > at(junior).hi, grow);
    assert.ok(at(junior).hi > at(intact).hi, junior);
    assert.ok(at(intact).lo > at(neutered).lo, intact);
    assert.ok(at(neutered).lo > at(diet).lo, neutered);
  }
  // 같은 단계에서 고양이가 개보다 낮다
  assert.ok(at('cat-neutered').lo < at('dog-neutered').lo);
  assert.ok(at('cat-intact').hi < at('dog-intact').hi);
});

test('하루 열량은 기초대사량에 계수를 곱한 범위', () => {
  for (const c of CELLS) {
    const f = petFacts(c);
    const s = stateOf(c.state)!;
    assert.ok(Math.abs(f.kcalLo - rerOf(c.kg) * s.lo) <= 0.5, f.slug);
    assert.ok(Math.abs(f.kcalHi - rerOf(c.kg) * s.hi) <= 0.5, f.slug);
    assert.ok(f.kcalLo <= f.kcalHi, f.slug);
    // 감량 상태가 아니면 기초대사량보다 많이 먹는다
    if (!c.state.endsWith('-diet')) assert.ok(f.kcalLo >= f.rer - 0.5, f.slug);
  }
  const f = facts('dog-neutered-10');
  assert.equal(f.kcalLo, 551);
  assert.equal(f.kcalHi, 630);
});

test('사료 그램은 열량을 밀도로 나눈 값', () => {
  assert.deepEqual([...DENSITIES], [3.5, 4.0]);
  for (const c of CELLS) {
    const f = petFacts(c);
    for (const b of f.bowls) {
      // 되돌려 곱하면 열량으로 돌아온다
      assert.ok(Math.abs(b.lo * b.density - f.kcalLo) <= b.density, `${f.slug} ${b.density}`);
      assert.ok(Math.abs(b.hi * b.density - f.kcalHi) <= b.density, `${f.slug} ${b.density}`);
    }
    // 밀도가 높을수록 같은 열량에 그램은 적다
    assert.ok(f.bowls[0].lo >= f.bowls[1].lo, f.slug);
  }
  assert.equal(Math.round(gramsOf(400, 4)), 100);
});

test('앞뒤 칸은 체중 한 단계씩만 움직인다', () => {
  const f = facts('dog-neutered-10');
  assert.equal(f.lighter?.kg, 8);
  assert.equal(f.heavier?.kg, 15);
  assert.equal(facts('dog-neutered-2').lighter, null);
  assert.equal(facts('dog-neutered-40').heavier, null);
  assert.equal(facts('cat-neutered-1-5').lighter, null);
  assert.equal(facts('cat-neutered-7').heavier, null);
  for (const c of CELLS) {
    const g = petFacts(c);
    // 이웃은 상태를 바꾸지 않는다 — 더 무거우면 더 많이 먹는다
    if (g.heavier) {
      assert.equal(g.heavier.state, c.state, g.slug);
      assert.ok(petFacts({ state: c.state, kg: g.heavier.kg }).kcalLo > g.kcalLo, g.slug);
    }
  }
});
