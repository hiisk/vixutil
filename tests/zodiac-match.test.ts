import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchType, calcZodiacMatch, MATCH_INFO } from '../lib/zodiac-match.ts';

// 인덱스: 쥐0 소1 범2 토끼3 용4 뱀5 말6 양7 원숭이8 닭9 개10 돼지11

test('육합 6쌍을 정확히 판정한다', () => {
  const pairs: [number, number][] = [[0,1],[2,11],[3,10],[4,9],[5,8],[6,7]];
  for (const [a, b] of pairs) {
    assert.equal(matchType(a, b), 'yukhap', `${a}-${b}`);
    assert.equal(matchType(b, a), 'yukhap', `${b}-${a} (순서 무관)`);
  }
});

test('삼합 무리를 정확히 판정한다', () => {
  // 신자진(8,0,4), 사유축(5,9,1), 인오술(2,6,10), 해묘미(11,3,7)
  const groups = [[8,0,4],[5,9,1],[2,6,10],[11,3,7]];
  for (const g of groups) {
    for (let i = 0; i < g.length; i++) {
      for (let j = i + 1; j < g.length; j++) {
        assert.equal(matchType(g[i], g[j]), 'samhap', `${g[i]}-${g[j]}`);
      }
    }
  }
});

test('충(정반대, 차이 6)을 판정한다', () => {
  for (let a = 0; a < 6; a++) {
    assert.equal(matchType(a, a + 6), 'clash', `${a}-${a+6}`);
  }
});

test('같은 띠는 same으로 판정한다', () => {
  for (let a = 0; a < 12; a++) assert.equal(matchType(a, a), 'same');
});

test('육합이 삼합·충보다 우선한다', () => {
  // 오미(6-7)는 육합. 차이 1이라 충 아님. 판정이 육합이어야 한다.
  assert.equal(matchType(6, 7), 'yukhap');
  // 자축(0-1) 육합. 삼합 신자진에 0이 있지만 1은 사유축이라 삼합 아님 → 육합.
  assert.equal(matchType(0, 1), 'yukhap');
});

test('모든 12x12 조합이 유효한 유형과 점수를 낸다', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      const r = calcZodiacMatch(a, b);
      assert.ok(r.type in MATCH_INFO, `${a}-${b}: 알 수 없는 유형`);
      assert.ok(r.score >= 0 && r.score <= 100, `${a}-${b}: 점수 ${r.score}`);
      assert.ok(r.reason.length > 0 && r.loveComment.length > 0 && r.adviceComment.length > 0);
    }
  }
});

test('점수는 유형별 기본점 ±4 범위 안이다', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      const r = calcZodiacMatch(a, b);
      const base = MATCH_INFO[r.type].baseScore;
      assert.ok(Math.abs(r.score - base) <= 4, `${a}-${b}: ${r.score} vs base ${base}`);
    }
  }
});

test('궁합은 대칭이다 (a-b와 b-a가 같다)', () => {
  for (let a = 0; a < 12; a++) {
    for (let b = 0; b < 12; b++) {
      assert.deepEqual(calcZodiacMatch(a, b), calcZodiacMatch(b, a), `${a}-${b}`);
    }
  }
});

test('육합이 충보다 점수가 높다', () => {
  const yukhap = calcZodiacMatch(0, 1).score;   // 자축
  const clash = calcZodiacMatch(0, 6).score;    // 자오 충
  assert.ok(yukhap > clash);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  assert.deepEqual(calcZodiacMatch(4, 9), calcZodiacMatch(4, 9));
});
