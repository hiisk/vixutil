/**
 * 브래지어 표기 — 계산한 값을 다른 길로 되짚는다.
 *
 * 표기는 두 치수의 결과이므로, 컵 이름에서 차이로 되돌려 제자리에 오는지
 * 본다. 컵 눈금이 AA 7.5cm에서 2.5cm씩이라는 것이 이 표의 전제라, 그 눈금이
 * 흔들리면 검사가 여러 군데서 깨지도록 걸어 둔다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  AA_DIFF, BAND_STEP, CELLS, CM_PER_INCH, CUPS, CUP_STEP, DIFFS, UNDERS,
  cellOf, slugOf,
} from '../lib/bra/list.ts';
import { bandOf, braFacts, cupIndexOf, cupOf, diffOfCup } from '../lib/bra/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return braFacts(c);
};

test('칸은 밑가슴 10가지 × 차이 10가지', () => {
  assert.equal(UNDERS.length, 10);
  assert.equal(DIFFS.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  // 두 목록 다 고른 눈금이다
  for (let i = 1; i < UNDERS.length; i++) assert.equal(UNDERS[i] - UNDERS[i - 1], BAND_STEP);
  for (let i = 1; i < DIFFS.length; i++) assert.ok(Math.abs(DIFFS[i] - DIFFS[i - 1] - CUP_STEP) < 1e-9);
  assert.equal(cellOf('75'), undefined);
  assert.equal(cellOf('75-13'), undefined);
});

test('컵은 AA 7.5cm에서 2.5cm씩 올라간다', () => {
  assert.equal(AA_DIFF, 7.5);
  assert.equal(CUP_STEP, 2.5);
  assert.equal(cupOf(7.5), 'AA');
  assert.equal(cupOf(10), 'A');
  assert.equal(cupOf(12.5), 'B');
  assert.equal(cupOf(15), 'C');
  assert.equal(cupOf(17.5), 'D');
  // 널리 쓰이는 보기 — 윗가슴 82에서 밑가슴 70을 빼면 12, 반올림해 B다
  assert.equal(cupOf(82 - 70), 'B');
  assert.equal(cupIndexOf(AA_DIFF), 0);
  for (const diff of DIFFS) {
    // 컵 이름에서 차이로 되돌리면 반 칸 안으로 들어온다
    const back = diffOfCup(cupOf(diff));
    assert.ok(Math.abs(back - diff) <= CUP_STEP / 2 + 1e-9, `${diff} → ${cupOf(diff)} → ${back}`);
  }
});

test('표기 앞의 숫자는 밑가슴을 5cm 눈금으로 읽은 값', () => {
  assert.equal(bandOf(75), 75);
  assert.equal(bandOf(73), 75);
  assert.equal(bandOf(72), 70);
  for (const c of CELLS) {
    const f = braFacts(c);
    assert.equal(f.band % BAND_STEP, 0, f.slug);
    assert.ok(Math.abs(f.band - c.under) <= BAND_STEP / 2, f.slug);
    // 표기는 앞 숫자와 컵을 이어 붙인 것이다
    assert.equal(f.label, `${f.band}${f.cup}`, f.slug);
  }
  assert.equal(facts('75-12-5').label, '75B');
  assert.equal(facts('80-15').label, '80C');
});

test('윗가슴은 밑가슴에 차이를 더한 값', () => {
  for (const c of CELLS) {
    const f = braFacts(c);
    assert.ok(Math.abs(f.bust - (c.under + c.diff)) < 1e-9, f.slug);
    // 되돌려 빼면 차이가 나온다
    assert.ok(Math.abs(f.bust - c.under - c.diff) < 1e-9, f.slug);
    // 인치는 2.54로 나눈 값이다
    assert.ok(Math.abs(f.underInch * CM_PER_INCH - c.under) <= CM_PER_INCH * 0.05 + 1e-9, f.slug);
  }
  assert.equal(facts('75-12-5').bust, 87.5);
});

test('잰 값과 표기가 어긋난 폭을 함께 낸다', () => {
  for (const c of CELLS) {
    const f = braFacts(c);
    assert.ok(Math.abs(f.off - Math.abs(c.diff - f.cupDiff)) < 1e-9, f.slug);
    // 눈금 위의 값이면 어긋남이 없다
    assert.ok(f.off <= CUP_STEP / 2 + 1e-9, f.slug);
    assert.equal(f.span, CUP_STEP, f.slug);
  }
  // 목록의 차이는 모두 눈금 위라 딱 맞는다
  for (const c of CELLS) assert.equal(braFacts(c).off, 0, slugOf(c));
});

test('차이가 커지면 컵도 커진다', () => {
  const order = (cup: string) => CUPS.indexOf(cup as (typeof CUPS)[number]);
  for (const under of UNDERS) {
    let last = -1;
    for (const diff of DIFFS) {
      const i = order(braFacts({ under, diff }).cup);
      assert.ok(i > last, `${under}-${diff}`);
      last = i;
    }
  }
  // 밑가슴이 달라도 차이가 같으면 컵은 같다
  assert.equal(facts('65-15').cup, facts('95-15').cup);
});

test('앞뒤 칸은 한 단계씩만 움직인다', () => {
  const f = facts('75-12-5');
  assert.equal(f.looser?.under, 80);
  assert.equal(f.tighter?.under, 70);
  assert.equal(f.bigger?.diff, 15);
  assert.equal(f.smaller?.diff, 10);
  assert.equal(facts('60-5').tighter, null);
  assert.equal(facts('60-5').smaller, null);
  assert.equal(facts('105-27-5').looser, null);
  assert.equal(facts('105-27-5').bigger, null);
  for (const c of CELLS) {
    const g = braFacts(c);
    if (g.bigger) assert.equal(g.bigger.under, c.under, g.slug);
    if (g.looser) assert.equal(g.looser.diff, c.diff, g.slug);
  }
});
