/**
 * 혈액형 유전 — 퍼넷 계산이 널리 실린 표와 맞는지 본다.
 *
 * lib/heredity 는 대립유전자에서 시작해 퍼넷 사각형으로 답을 만든다. 여기서는
 * 그 길을 쓰지 않고, 교과서와 혈액원 안내에 실려 있는 "부모 혈액형 조합에서
 * 나올 수 있는 아이의 혈액형" 표를 그대로 적어 두고 대조한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TYPES, HEREDITY_SLUGS, cellOf, labelOf, slugOf, typeOf } from '../lib/heredity/list.ts';
import {
  aboGenotypesFor, aboPhenotype, childrenOf, heredityFacts, rhGenotypesFor, rhPhenotype,
} from '../lib/heredity/facts.ts';

/**
 * 널리 실린 ABO 표 — 열쇠는 부모 두 혈액형을 사전순으로 붙인 것이다.
 * 옮겨 적은 자료라 계산과 겹치지 않는다.
 */
const ABO_TABLE: Record<string, string[]> = {
  'O+O': ['O'],
  'A+O': ['O', 'A'],
  'B+O': ['O', 'B'],
  'AB+O': ['A', 'B'],
  'A+A': ['O', 'A'],
  'A+B': ['O', 'A', 'B', 'AB'],
  'A+AB': ['A', 'B', 'AB'],
  'B+B': ['O', 'B'],
  'AB+B': ['A', 'B', 'AB'],
  'AB+AB': ['A', 'B', 'AB'],
};

/** Rh는 D가 우성이니 표가 세 줄이면 끝난다 */
const RH_TABLE: Record<string, boolean[]> = {
  'false+false': [false],
  'false+true': [false, true],
  'true+true': [false, true],
};

const key2 = (a: string, b: string) => [a, b].sort().join('+');

const PAIRS = TYPES.flatMap(f => TYPES.map(m => [f, m] as const));

test('칸이 512개이고 슬러그가 겹치지 않는다', () => {
  assert.equal(HEREDITY_SLUGS.length, 8 * 8 * 8);
  assert.equal(new Set(HEREDITY_SLUGS).size, HEREDITY_SLUGS.length);
  for (const slug of HEREDITY_SLUGS) {
    const c = cellOf(slug);
    assert.ok(c, `되돌아오지 않는다: ${slug}`);
    assert.equal(slugOf(c), slug);
  }
});

test('유전자형이 ABO 여섯 가지와 Rh 세 가지로 나온다', () => {
  assert.deepEqual(aboGenotypesFor('A').map(g => g.join('')).sort(), ['AA', 'AO']);
  assert.deepEqual(aboGenotypesFor('B').map(g => g.join('')).sort(), ['BB', 'BO']);
  assert.deepEqual(aboGenotypesFor('AB').map(g => g.join('')), ['AB']);
  assert.deepEqual(aboGenotypesFor('O').map(g => g.join('')), ['OO']);
  assert.deepEqual(rhGenotypesFor(true).map(g => g.join('')).sort(), ['DD', 'Dd']);
  assert.deepEqual(rhGenotypesFor(false).map(g => g.join('')), ['dd']);
  // 여섯과 셋을 합치면 유전자형 열여덟 가지다
  const all = ['A', 'B', 'AB', 'O'].flatMap(a => aboGenotypesFor(a));
  assert.equal(all.length, 6);
  assert.equal(all.length * (rhGenotypesFor(true).length + rhGenotypesFor(false).length), 18);
});

test('우성 관계가 A·B 공동우성, D 우성이다', () => {
  assert.equal(aboPhenotype(['A', 'O']), 'A');
  assert.equal(aboPhenotype(['B', 'O']), 'B');
  assert.equal(aboPhenotype(['A', 'B']), 'AB');
  assert.equal(aboPhenotype(['O', 'O']), 'O');
  assert.equal(rhPhenotype(['D', 'd']), true);
  assert.equal(rhPhenotype(['d', 'd']), false);
});

test('나올 수 있는 아이가 널리 실린 표와 하나도 어긋나지 않는다', () => {
  for (const [f, m] of PAIRS) {
    const abo = ABO_TABLE[key2(f.abo, m.abo)];
    const rh = RH_TABLE[key2(String(f.rh), String(m.rh))];
    assert.ok(abo, `ABO 표에 없다: ${f.abo} × ${m.abo}`);
    assert.ok(rh, `Rh 표에 없다: ${f.rh} × ${m.rh}`);

    const want = TYPES
      .filter(t => abo.includes(t.abo) && rh.includes(t.rh))
      .map(t => t.key);
    assert.deepEqual(
      childrenOf(f, m).sort(),
      want.sort(),
      `${labelOf(f)} × ${labelOf(m)}`,
    );
  }
});

test('AB형과 O형 사이에서는 AB형도 O형도 나오지 않는다', () => {
  const kids = childrenOf(typeOf('ab-pos')!, typeOf('o-pos')!).map(k => typeOf(k)!.abo);
  assert.deepEqual([...new Set(kids)].sort(), ['A', 'B']);
  assert.equal(heredityFacts(cellOf('ab-pos-x-o-pos-to-ab-pos')!).possible, false);
  assert.equal(heredityFacts(cellOf('ab-pos-x-o-pos-to-o-pos')!).possible, false);
  assert.equal(heredityFacts(cellOf('ab-pos-x-o-pos-to-a-pos')!).possible, true);
});

test('O형끼리는 O형만, Rh−끼리는 Rh−만 나온다', () => {
  for (const f of TYPES.filter(t => t.abo === 'O')) {
    for (const m of TYPES.filter(t => t.abo === 'O')) {
      for (const k of childrenOf(f, m)) assert.equal(typeOf(k)!.abo, 'O', `${labelOf(f)} × ${labelOf(m)}`);
    }
  }
  for (const f of TYPES.filter(t => !t.rh)) {
    for (const m of TYPES.filter(t => !t.rh)) {
      for (const k of childrenOf(f, m)) assert.equal(typeOf(k)!.rh, false, `${labelOf(f)} × ${labelOf(m)}`);
    }
  }
  // O− 부모 둘에게서는 O− 하나뿐이다
  assert.deepEqual(childrenOf(typeOf('o-neg')!, typeOf('o-neg')!), ['o-neg']);
});

test('부모를 바꿔도 답이 같다', () => {
  for (const slug of HEREDITY_SLUGS) {
    const f = heredityFacts(cellOf(slug)!);
    const swapped = heredityFacts(cellOf(f.swapSlug)!);
    assert.equal(swapped.possible, f.possible, slug);
    assert.deepEqual(swapped.possibleChildren, f.possibleChildren, slug);
    assert.equal(swapped.maxChance, f.maxChance, slug);
    assert.equal(swapped.minChance, f.minChance, slug);
  }
});

test('되는 칸에만 길이 있고 확률이 붙는다', () => {
  for (const slug of HEREDITY_SLUGS) {
    const f = heredityFacts(cellOf(slug)!);
    assert.equal(f.possible, f.routes.length > 0, slug);
    assert.equal(f.possible, f.possibleChildren.includes(f.cell.child), slug);
    assert.equal(f.possibleChildren.length + f.impossibleChildren.length, 8, slug);
    for (const r of f.routes) {
      assert.equal(r.denominator, 16);
      assert.ok(r.numerator >= 1 && r.numerator <= 16, slug);
    }
    if (f.possible) {
      assert.ok(f.minChance > 0 && f.maxChance >= f.minChance, slug);
      assert.ok(f.maxChance <= 100, slug);
    } else {
      assert.equal(f.maxChance, 0, slug);
    }
  }
});

test('확률이 퍼넷 사각형 그대로 나온다', () => {
  // AO × BO — 넷 중 하나씩 A·B·AB·O다. Rh는 dd × dd라 −가 확실하니 그대로 25%다
  const abo = heredityFacts(cellOf('a-neg-x-b-neg-to-o-neg')!);
  assert.deepEqual(abo.routes, [{ father: 'AO · dd', mother: 'BO · dd', numerator: 4, denominator: 16 }]);
  assert.equal(abo.maxChance, 25);

  // AA × BB 이면 AB밖에 안 나온다 — A형 아버지의 유전자형이 갈리는 자리다
  const ab = heredityFacts(cellOf('a-neg-x-b-neg-to-ab-neg')!);
  assert.equal(ab.routes.length, 4);
  assert.equal(ab.maxChance, 100);
  assert.equal(ab.minChance, 25);

  // O− × O− 는 유전자형이 하나뿐이라 O− 가 100%다
  const oo = heredityFacts(cellOf('o-neg-x-o-neg-to-o-neg')!);
  assert.equal(oo.routes.length, 1);
  assert.equal(oo.maxChance, 100);
  assert.equal(oo.fatherFixed, true);
  assert.equal(oo.motherFixed, true);

  // AB형과 O− 는 유전자형이 하나로 정해지고, A형·Rh+ 는 갈린다
  assert.equal(heredityFacts(cellOf('ab-neg-x-o-neg-to-a-neg')!).fatherFixed, true);
  assert.equal(heredityFacts(cellOf('a-pos-x-o-neg-to-a-neg')!).fatherFixed, false);
});

test('화면에 찍는 확률은 최댓값이 아니라 범위다', () => {
  // 최댓값만 보이면 "AB+ 가능 100%"가 확정처럼 읽힌다. 갈래가 여럿이면 범위로 낸다.
  for (const slug of HEREDITY_SLUGS) {
    const f = heredityFacts(cellOf(slug)!);
    if (!f.possible) {
      assert.equal(f.chanceText, '0%', slug);
    } else if (f.minChance === f.maxChance) {
      assert.equal(f.chanceText, `${f.maxChance}%`, slug);
    } else {
      assert.equal(f.chanceText, `${f.minChance}~${f.maxChance}%`, slug);
      assert.ok(f.chanceText.includes('~'), slug);
    }
  }
  // A+ × B+ 에서 AB+ 는 부모 유전자형에 따라 크게 갈린다 — 100%로만 적으면 안 된다
  const ab = heredityFacts(cellOf('a-pos-x-b-pos-to-ab-pos')!);
  assert.ok(ab.minChance < ab.maxChance, 'A+ × B+ → AB+ 는 갈래가 여럿이어야 한다');
  assert.equal(ab.chanceText, `${ab.minChance}~${ab.maxChance}%`);
  // 유전자형이 하나로 정해지는 자리는 값 하나로 나온다
  assert.equal(heredityFacts(cellOf('o-neg-x-o-neg-to-o-neg')!).chanceText, '100%');
});

test('512칸 가운데 될 수 있는 칸이 280개다', () => {
  const facts = HEREDITY_SLUGS.map(s => heredityFacts(cellOf(s)!));
  assert.equal(facts.filter(f => f.possible).length, 280);

  // 두 유전자리가 따로 노니 곱으로 갈라진다 — 옮겨 적은 표에서 세어 확인한다
  const aboSum = ['O', 'A', 'B', 'AB'].flatMap(a =>
    ['O', 'A', 'B', 'AB'].map(b => ABO_TABLE[key2(a, b)].length),
  ).reduce((x, y) => x + y, 0);
  const rhSum = [false, true].flatMap(a =>
    [false, true].map(b => RH_TABLE[key2(String(a), String(b))].length),
  ).reduce((x, y) => x + y, 0);
  assert.equal(aboSum, 40);
  assert.equal(rhSum, 7);
  assert.equal(aboSum * rhSum, 280);
  // 부모 한 쌍이 낳을 수 있는 혈액형은 한 가지부터 여덟 가지까지다
  const spans = facts.map(f => f.possibleChildren.length);
  assert.equal(Math.min(...spans), 1);
  assert.equal(Math.max(...spans), 8);
  // 여덟 가지가 다 나오는 것은 A형과 B형이 만나고 적어도 한쪽이 Rh+ 일 때다.
  // Rh+ 는 Dd일 수 있어 Rh− 아이도 나오지만, Rh− 끼리는 Rh− 만 나온다.
  const wide = facts.filter(f => f.possibleChildren.length === 8);
  const pairs = new Set(wide.map(f => `${f.father.key}×${f.mother.key}`));
  assert.deepEqual([...pairs].sort(), [
    'a-neg×b-pos', 'a-pos×b-neg', 'a-pos×b-pos',
    'b-neg×a-pos', 'b-pos×a-neg', 'b-pos×a-pos',
  ]);
  for (const f of wide) {
    assert.ok(f.father.rh || f.mother.rh, f.slug);
    assert.deepEqual([f.father.abo, f.mother.abo].sort(), ['A', 'B']);
  }
});
