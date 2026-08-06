/**
 * 목재 공칭 대 실측 — 규칙을 성질로 되짚는다.
 *
 * 깎이는 양이 세 갈래라는 것이 이 표의 전제다. 그래서 검사는 표를 옮겨 적어
 * 맞추지 않고, 갈래가 갈리는 자리(1인치와 8인치)에서 값이 바뀌는지, 그리고
 * 실측이 공칭에서 차지하는 몫이 얇을수록 작아지는지를 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, CUT_MID, CUT_THICK, CUT_THIN, INCH_PER_FOOT, LENGTHS, MM_PER_INCH, SIZES,
  THICK_FROM, cellOf, sizeOf, slugOf,
} from '../lib/lumber/list.ts';
import { actualOf, boardFeet, cutFor, lumberFacts, toMm } from '../lib/lumber/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return lumberFacts(c);
};

test('칸은 규격 10가지 × 길이 10가지', () => {
  assert.equal(SIZES.length, 10);
  assert.equal(LENGTHS.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < LENGTHS.length; i++) assert.ok(LENGTHS[i] > LENGTHS[i - 1]);
  // 규격 이름이 공칭 치수와 어긋나지 않는다
  for (const s of SIZES) assert.equal(s.key, `${s.t}x${s.w}`, s.key);
  assert.equal(cellOf('2x4-9ft'), undefined);
  assert.equal(cellOf('3x5-8ft'), undefined);
});

test('깎이는 양은 세 갈래로 갈린다', () => {
  assert.equal(cutFor(1), CUT_THIN);
  assert.equal(cutFor(2), CUT_MID);
  assert.equal(cutFor(6), CUT_MID);
  assert.equal(cutFor(7), CUT_MID);
  assert.equal(cutFor(8), CUT_THICK);
  assert.equal(cutFor(12), CUT_THICK);
  // 경계에서만 값이 바뀐다
  assert.notEqual(cutFor(THICK_FROM - 1), cutFor(THICK_FROM));
  assert.notEqual(cutFor(1), cutFor(2));
  // 세 값이 서로 다르고 커지는 차례다
  assert.ok(CUT_THIN < CUT_MID && CUT_MID < CUT_THICK);
  // 널리 알려진 자리 — 2×4는 1.5 × 3.5인치다
  assert.equal(actualOf(2), 1.5);
  assert.equal(actualOf(4), 3.5);
  assert.equal(actualOf(10), 9.25);
  assert.equal(actualOf(1), 0.75);
});

test('밀리미터로 옮기면 알려진 값이 나온다', () => {
  assert.equal(MM_PER_INCH, 25.4);
  const f = facts('2x4-8ft');
  assert.equal(f.mmT, 38.1);
  assert.equal(f.mmW, 88.9);
  assert.equal(facts('2x10-8ft').mmW, 235);
  for (const c of CELLS) {
    const g = lumberFacts(c);
    // 되돌려 나누면 인치가 나온다 — 반올림 전 값으로 잰다
    assert.ok(Math.abs(toMm(g.actT) / MM_PER_INCH - g.actT) < 1e-9, g.slug);
    assert.ok(Math.abs(g.mmW - toMm(g.actW)) <= 0.05 + 1e-9, g.slug);
  }
});

test('실측이 공칭에서 차지하는 몫은 얇을수록 작다', () => {
  for (const c of CELLS) {
    const f = lumberFacts(c);
    assert.equal(f.nomArea, f.nomT * f.nomW, f.slug);
    assert.ok(Math.abs(f.area - f.actT * f.actW) <= 0.005 + 1e-9, f.slug);
    // 실측은 늘 공칭보다 작다
    assert.ok(f.area < f.nomArea, f.slug);
    assert.ok(f.share < 100, f.slug);
    // 몫은 길이와 무관하다
    assert.equal(f.share, facts(`${c.size}-24ft`).share, f.slug);
  }
  // 가장 얇은 2×2가 가장 손해고, 가장 두꺼운 6×6이 가장 덜 손해다
  const shares = SIZES.map(s => ({ key: s.key, share: lumberFacts({ size: s.key, feet: 8 }).share }));
  const worst = shares.reduce((a, b) => (a.share <= b.share ? a : b));
  const best = shares.reduce((a, b) => (a.share >= b.share ? a : b));
  assert.equal(worst.key, '2x2');
  assert.equal(best.key, '6x6');
  assert.equal(facts('2x4-8ft').share, 65.6);
  assert.equal(facts('2x2-8ft').share, 56.3);
});

test('재적은 실측이 아니라 공칭으로 센다', () => {
  // 두께 × 너비 × 길이 ÷ 12
  assert.equal(boardFeet(2, 4, 12), 8);
  assert.equal(boardFeet(1, 12, 1), 1);
  for (const c of CELLS) {
    const f = lumberFacts(c);
    assert.ok(Math.abs(f.bf - (f.nomT * f.nomW * c.feet) / INCH_PER_FOOT) <= 0.005 + 1e-9, f.slug);
    /*
     * 실측으로 셌다면 더 작았을 값이다. 재적이 공칭으로 계산된다는 것을
     * 여기서 못 박는다 — 실측으로 센 값과 같아지면 규칙이 바뀐 것이다.
     */
    const asActual = (f.actT * f.actW * c.feet) / INCH_PER_FOOT;
    assert.ok(f.bf > asActual, f.slug);
    /*
     * 두 값의 비는 곧 실측이 공칭에서 차지하는 몫이다. 화면에 내는 재적은
     * 소수 둘째 자리에서 반올림한 것이라 반올림 전 값으로 잰다.
     */
    const raw = boardFeet(f.nomT, f.nomW, c.feet);
    assert.ok(Math.abs(asActual / raw - f.share / 100) < 0.001, f.slug);
  }
  // 길이가 두 배면 재적도 두 배다 — 반올림 전 값으로 잰다
  assert.ok(Math.abs(boardFeet(2, 4, 16) / boardFeet(2, 4, 8) - 2) < 1e-12);
});

test('부피와 미터 길이가 서로 맞는다', () => {
  for (const c of CELLS) {
    const f = lumberFacts(c);
    // 길이는 피트에 12인치와 25.4밀리미터를 곱한 값이다
    assert.ok(Math.abs(f.metres - (c.feet * INCH_PER_FOOT * MM_PER_INCH) / 1000) <= 0.0005 + 1e-9, f.slug);
    // 부피는 실측 단면적에 길이를 곱한 값이다
    const raw = f.actT * f.actW * MM_PER_INCH ** 2 * (c.feet * INCH_PER_FOOT * MM_PER_INCH);
    assert.ok(Math.abs(f.litres - raw / 1e6) <= 0.05 + 1e-9, f.slug);
  }
  // 8피트는 2.438미터다
  assert.equal(facts('2x4-8ft').metres, 2.438);
});

test('앞뒤 칸은 길이 한 단계씩만 움직인다', () => {
  const f = facts('2x4-12ft');
  assert.equal(f.shorter?.feet, 10);
  assert.equal(f.longer?.feet, 14);
  assert.equal(facts('2x4-6ft').shorter, null);
  assert.equal(facts('2x4-24ft').longer, null);
  for (const c of CELLS) {
    const g = lumberFacts(c);
    if (g.longer) {
      assert.equal(g.longer.size, c.size, g.slug);
      assert.ok(facts(g.longer.slug).bf > g.bf, g.slug);
    }
  }
  assert.equal(sizeOf('nope'), undefined);
});
