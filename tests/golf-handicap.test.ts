/**
 * 골프 핸디캡 — 보정이 하는 일을 성질로 되짚는다.
 *
 * 식 자체는 곱셈 하나지만, 이 표가 보이려는 것은 **슬로프가 무엇을 바꾸는가**다.
 * 그래서 검사는 값보다 방향과 고정점에 선다 — 표준 난이도(113)에서는 아무것도
 * 바뀌지 않아야 하고, 어려운 코스일수록 같은 타수가 더 좋은 값이 되어야 한다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  CELLS, COURSE_RATING, PAR, SCORES, SLOPES, SLOPE_MAX, SLOPE_MIN, STANDARD_SLOPE,
  cellOf, slugOf,
} from '../lib/golf/list.ts';
import { courseHandicapOf, differentialOf, golfFacts } from '../lib/golf/facts.ts';

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return golfFacts(c);
};

test('칸은 스코어 10가지 × 슬로프 10가지', () => {
  assert.equal(SCORES.length, 10);
  assert.equal(SLOPES.length, 10);
  assert.equal(CELLS.length, 100);
  assert.equal(new Set(CELLS.map(slugOf)).size, 100);
  for (const c of CELLS) assert.deepEqual(cellOf(slugOf(c)), c, slugOf(c));
  for (let i = 1; i < SCORES.length; i++) assert.ok(SCORES[i] > SCORES[i - 1]);
  for (let i = 1; i < SLOPES.length; i++) assert.ok(SLOPES[i] > SLOPES[i - 1]);
  // 슬로프는 규정이 두는 범위 안에 있고 표준값을 포함한다
  for (const s of SLOPES) assert.ok(s >= SLOPE_MIN && s <= SLOPE_MAX, `${s}`);
  assert.ok(SLOPES.includes(STANDARD_SLOPE));
  assert.equal(cellOf('90-160'), undefined);
  assert.equal(cellOf('91-113'), undefined);
});

test('표준 난이도에서는 보정이 아무것도 바꾸지 않는다', () => {
  // 113이 식의 분자이자 표준 슬로프다
  assert.equal(STANDARD_SLOPE, 113);
  for (const score of SCORES) {
    const f = golfFacts({ score, slope: STANDARD_SLOPE });
    assert.equal(f.factor, 1, `${score}`);
    // 디퍼렌셜이 파 초과 타수와 같아진다(코스 레이팅이 파와 같으므로)
    assert.equal(COURSE_RATING, PAR);
    assert.ok(Math.abs(f.differential - f.overPar) < 0.05, `${score}`);
  }
  assert.equal(facts('90-113').differential, 18);
  assert.equal(facts('90-113').overPar, 18);
});

test('어려운 코스일수록 같은 타수가 더 좋은 값이 된다', () => {
  for (const score of SCORES) {
    if (score === COURSE_RATING) continue;
    let last = Infinity;
    for (const slope of SLOPES) {
      const f = golfFacts({ score, slope });
      // 슬로프가 커질수록 디퍼렌셜은 작아진다
      assert.ok(f.differential < last, `${score}-${slope}`);
      last = f.differential;
    }
  }
  // 같은 90타라도 쉬운 코스와 어려운 코스가 크게 갈린다
  assert.ok(facts('90-55').differential > facts('90-155').differential * 2);
  // 보정값은 113을 슬로프로 나눈 것이다
  for (const c of CELLS) {
    const f = golfFacts(c);
    assert.ok(Math.abs(f.factor - STANDARD_SLOPE / c.slope) < 0.001, f.slug);
    assert.equal(f.factor > 1, c.slope < STANDARD_SLOPE, f.slug);
  }
});

test('디퍼렌셜은 파에 견준 타수에 보정을 곱한 값', () => {
  for (const c of CELLS) {
    const f = golfFacts(c);
    // 되짚어 나누면 파 초과 타수가 나온다 — 반올림 전 값으로 잰다
    const raw = differentialOf(c.score, COURSE_RATING, c.slope);
    assert.ok(Math.abs(raw / (STANDARD_SLOPE / c.slope) - f.overPar) < 1e-9, f.slug);
    assert.ok(Math.abs(f.differential - raw) <= 0.05 + 1e-9, f.slug);
    // 파와 같은 타수면 디퍼렌셜이 0이다
    if (c.score === COURSE_RATING) assert.equal(f.differential, 0, f.slug);
  }
  // 널리 쓰이는 자리 — 슬로프 130 코스의 90타는 15.6이다
  assert.equal(facts('90-130').differential, 15.6);
  assert.equal(facts('72-113').differential, 0);
});

test('코스 핸디캡은 디퍼렌셜을 되돌린다', () => {
  /*
   * 디퍼렌셜은 코스의 난이도를 걷어낸 값이고, 코스 핸디캡은 그것을 다시
   * 그 코스에 입히는 값이다. 코스 레이팅이 파와 같은 이 표에서는 둘이
   * 정확히 서로를 지워 원래 파 초과 타수로 돌아온다.
   */
  for (const c of CELLS) {
    const f = golfFacts(c);
    assert.ok(Math.abs(f.courseHandicap - f.overPar) <= 0.05 + 1e-9, f.slug);
  }
  // 코스 레이팅이 파보다 크면 그 차이만큼 더해진다
  assert.ok(Math.abs(courseHandicapOf(10, 113, 74, 72) - 12) < 1e-9);
  assert.ok(Math.abs(courseHandicapOf(10, 113, 72, 72) - 10) < 1e-9);
  // 슬로프가 두 배면 코스 핸디캡의 첫 항도 두 배다
  assert.ok(Math.abs(courseHandicapOf(10, 226, 72, 72) / courseHandicapOf(10, 113, 72, 72) - 2) < 1e-9);
});

test('표준 코스로 옮겨 보면 같은 스코어끼리 견줄 수 있다', () => {
  for (const c of CELLS) {
    const f = golfFacts(c);
    // 표준 코스 값은 슬로프와 무관하다
    assert.equal(f.atStandard, facts(`${c.score}-113`).differential, f.slug);
    assert.ok(Math.abs(f.atStandard - f.overPar) < 0.05, f.slug);
  }
  assert.equal(facts('100-155').atStandard, 28);
  assert.equal(facts('100-55').atStandard, 28);
});

test('앞뒤 칸은 슬로프 한 단계씩만 움직인다', () => {
  const f = facts('90-113');
  assert.equal(f.easier?.slope, 105);
  assert.equal(f.harder?.slope, 120);
  assert.equal(facts('90-55').easier, null);
  assert.equal(facts('90-155').harder, null);
  for (const c of CELLS) {
    const g = golfFacts(c);
    if (g.harder) {
      assert.equal(g.harder.score, c.score, g.slug);
      if (c.score !== COURSE_RATING) assert.ok(facts(g.harder.slug).differential < g.differential, g.slug);
    }
  }
});
