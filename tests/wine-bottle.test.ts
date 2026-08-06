/**
 * 와인 병 — 배수와 나머지를 되짚는다.
 *
 * 큰 병의 크기가 표준병의 배수로 정해져 있다는 것이 이 표의 전제다. 그래서
 * 검사는 그 배수가 정수인지, 잔 수와 나머지가 서로 맞물리는지, 그리고 같은
 * 이름이 지방마다 다른 크기를 가리키는 자리가 실제로 갈리는지를 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  BOTTLES, CELLS, GLASSES_PER_PERSON, POURS, STANDARD_ML, bottleOf, cellOf, slugOf,
} from '../lib/wine/list.ts';
import { atBottle, glassesOf, standardsOf, wineFacts } from '../lib/wine/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return wineFacts(c);
};

test('칸은 병 14가지 × 잔 9가지', () => {
  assert.equal(BOTTLES.length, 14);
  assert.equal(POURS.length, 9);
  assert.equal(CELLS.length, 126);
  assert.equal(new Set(CELLS.map(slugOf)).size, 126);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < POURS.length; i++) assert.ok(POURS[i] > POURS[i - 1]);
  // 병은 작은 것부터 큰 것 차례이되 제로보암 둘만 어긋난다(4.5L 레호보암이 사이에 든다)
  assert.equal(BOTTLES[0].ml, 187.5);
  assert.equal(BOTTLES[BOTTLES.length - 1].ml, 27000);
  assert.equal(cellOf('magnum-110'), undefined);
  assert.equal(cellOf('imperial-150'), undefined);
});

test('큰 병은 표준병의 정수 배다', () => {
  assert.equal(STANDARD_ML, 750);
  for (const b of BOTTLES) {
    if (b.ml < STANDARD_ML) continue;
    const n = standardsOf(b.ml);
    // 보르도 제로보암만 정수가 아니다 — 5리터라 6과 3분의 2다
    if (b.key === 'jeroboam-bordeaux') {
      assert.ok(Math.abs(n - 20 / 3) < 1e-9, b.key);
      continue;
    }
    assert.ok(Math.abs(n - Math.round(n)) < 1e-9, `${b.key} ${n}`);
  }
  // 널리 알려진 배수들
  assert.equal(standardsOf(1500), 2);
  assert.equal(standardsOf(6000), 8);
  assert.equal(standardsOf(15000), 20);
  assert.equal(standardsOf(27000), 36);
});

test('제로보암은 지방마다 다른 크기를 가리킨다', () => {
  const burgundy = bottleOf('jeroboam-burgundy');
  const bordeaux = bottleOf('jeroboam-bordeaux');
  assert.ok(burgundy && bordeaux);
  assert.equal(burgundy.ml, 3000);
  assert.equal(bordeaux.ml, 5000);
  assert.notEqual(burgundy.ml, bordeaux.ml);
  // 부르고뉴 제로보암은 보르도에서 더블 매그넘이라 부른다
  assert.equal(burgundy.bordeaux, 'doublemagnum');
  // 매그넘 두 병이 정확히 그 크기다
  assert.equal(bottleOf('magnum')!.ml * 2, burgundy.ml);
  // 다른 이름이 붙은 병은 이 하나뿐이다
  assert.equal(BOTTLES.filter(b => b.bordeaux).length, 1);
  assert.equal(facts('jeroboam-burgundy-150').bordeaux, 'doublemagnum');
  assert.equal(facts('jeroboam-bordeaux-150').bordeaux, null);
});

test('잔 수는 병을 잔으로 나눈 값', () => {
  for (const c of CELLS) {
    const b = bottleOf(c.bottle)!;
    const f = wineFacts(c);
    assert.ok(Math.abs(f.glasses - b.ml / c.pour) <= 0.005 + 1e-9, f.slug);
    // 가득 채운 잔과 나머지를 합치면 병 용량이 된다
    assert.ok(Math.abs(f.fullGlasses * c.pour + f.remainder - b.ml) <= 0.05, f.slug);
    // 나머지는 한 잔보다 적다
    assert.ok(f.remainder >= 0 && f.remainder < c.pour, f.slug);
    // 가득 채운 잔 수는 소수 잔 수를 내림한 값이다
    assert.equal(f.fullGlasses, Math.floor(glassesOf(b.ml, c.pour)), f.slug);
  }
  // 표준병에 150ml씩이면 다섯 잔이 딱 나온다
  const std = facts('standard-150');
  assert.equal(std.fullGlasses, 5);
  assert.equal(std.remainder, 0);
  // 175ml씩이면 네 잔에 50ml가 남는다
  const big = facts('standard-175');
  assert.equal(big.fullGlasses, 4);
  assert.equal(big.remainder, 50);
});

test('사람 수는 한 사람 두 잔으로 어림한다', () => {
  assert.equal(GLASSES_PER_PERSON, 2);
  for (const c of CELLS) {
    const f = wineFacts(c);
    // 반올림 전 잔 수를 두 잔으로 나눠 내림한 값이다
    assert.equal(f.people, Math.floor(glassesOf(f.ml, c.pour) / GLASSES_PER_PERSON), f.slug);
    // 그만큼 따르고 나면 병이 모자라지 않는다
    assert.ok(f.people * GLASSES_PER_PERSON * c.pour <= f.ml + 1e-9, f.slug);
  }
  // 표준병 하나로 150ml씩이면 두 사람이 두 잔씩 마시고 한 잔이 남는다
  assert.equal(facts('standard-150').people, 2);
  // 느부갓네살(15L)이면 150ml씩 쉰 사람이다
  assert.equal(facts('nebuchadnezzar-150').people, 50);
});

test('잔이 커지면 잔 수가 줄어든다', () => {
  for (const b of BOTTLES) {
    let last = Infinity;
    for (const pour of POURS) {
      const f = wineFacts({ bottle: b.key, pour });
      assert.ok(f.glasses < last, `${b.key}-${pour}`);
      last = f.glasses;
    }
  }
  // 병이 커지면 같은 잔에서 잔 수가 는다
  const at150 = BOTTLES.map(b => wineFacts({ bottle: b.key, pour: 150 }));
  for (const f of at150) assert.ok(Math.abs(f.glasses - f.ml / 150) <= 0.005 + 1e-9, f.slug);
  assert.ok(at150[at150.length - 1].glasses > at150[0].glasses * 100);
});

test('앞뒤 칸은 잔 크기만 움직인다', () => {
  const f = facts('magnum-150');
  assert.equal(f.smaller?.pour, 125);
  assert.equal(f.larger?.pour, 175);
  assert.equal(facts('magnum-100').smaller, null);
  assert.equal(facts('magnum-300').larger, null);
  for (const c of CELLS) {
    const g = wineFacts(c);
    if (g.larger) {
      assert.equal(g.larger.bottle, c.bottle, g.slug);
      assert.ok(facts(g.larger.slug).glasses < g.glasses, g.slug);
    }
  }
  assert.equal(atBottle('magnum').length, POURS.length);
});
