import { test } from 'node:test';
import assert from 'node:assert/strict';
import { starMatchType, calcStarMatch, SIGNS, STAR_MATCH_INFO } from '../lib/star-match.ts';

test('SIGNS는 12별자리이고 원소가 3개씩 균등하다', () => {
  assert.equal(SIGNS.length, 12);
  const counts: Record<string, number> = {};
  for (const s of SIGNS) counts[s.element] = (counts[s.element] ?? 0) + 1;
  for (const e of ['fire', 'earth', 'air', 'water']) assert.equal(counts[e], 3, `${e}: ${counts[e]}`);
});

test('같은 별자리는 same-sign', () => {
  for (let i = 0; i < 12; i++) assert.equal(starMatchType(i, i), 'same-sign');
});

test('같은 원소(다른 별자리)는 same-element', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      if (a !== b && SIGNS[a].element === SIGNS[b].element) {
        assert.equal(starMatchType(a, b), 'same-element', `${a}-${b}`);
      }
    }
  }
});

test('불↔바람, 흙↔물은 보완 관계다', () => {
  // 양자리(0,fire) × 쌍둥이(2,air) → complement
  assert.equal(starMatchType(0, 2), 'complement');
  // 황소(1,earth) × 게자리(3,water) → complement
  assert.equal(starMatchType(1, 3), 'complement');
});

test('불↔물, 흙↔바람은 challenge다', () => {
  // 양자리(0,fire) × 게자리(3,water)
  assert.equal(starMatchType(0, 3), 'challenge');
  // 황소(1,earth) × 쌍둥이(2,air)
  assert.equal(starMatchType(1, 2), 'challenge');
});

test('모든 12x12 조합이 유효한 결과를 낸다', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      const r = calcStarMatch(a, b);
      assert.ok(r.type in STAR_MATCH_INFO);
      assert.ok(r.score >= 0 && r.score <= 100);
      assert.ok(r.reason && r.loveComment && r.adviceComment);
      assert.ok(Math.abs(r.score - STAR_MATCH_INFO[r.type].baseScore) <= 4);
    }
  }
});

test('궁합은 대칭이다', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      assert.deepEqual(calcStarMatch(a, b), calcStarMatch(b, a), `${a}-${b}`);
    }
  }
});

test('같은 원소가 challenge보다 점수가 높다', () => {
  assert.ok(calcStarMatch(0, 4).score > calcStarMatch(0, 3).score); // 양-사자(fire) vs 양-게(challenge)
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  assert.deepEqual(calcStarMatch(2, 6), calcStarMatch(2, 6));
});
