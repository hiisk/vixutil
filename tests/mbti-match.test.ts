import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcMbtiMatch, mbtiScore, mbtiBand, MBTI_TYPES, isMbti } from '../lib/mbti-match.ts';

test('16가지 MBTI 유형이 모두 유효하다', () => {
  assert.equal(MBTI_TYPES.length, 16);
  assert.equal(new Set(MBTI_TYPES).size, 16, '중복 유형 존재');
});

test('isMbti가 유효/무효 문자열을 구분한다', () => {
  assert.ok(isMbti('ENFP'));
  assert.ok(isMbti('enfp'));
  assert.ok(!isMbti('XXXX'));
  assert.ok(!isMbti('EN'));
});

test('모든 256 조합이 유효한 결과를 낸다', () => {
  for (const a of MBTI_TYPES) {
    for (const b of MBTI_TYPES) {
      const r = calcMbtiMatch(a, b);
      assert.ok(r.score >= 0 && r.score <= 100, `${a}-${b}: ${r.score}`);
      assert.ok(r.reason && r.loveComment && r.adviceComment, `${a}-${b}: 빈 필드`);
      assert.ok(['best', 'good', 'ok', 'work'].includes(r.info.band));
    }
  }
});

test('궁합은 대칭이다', () => {
  for (const a of MBTI_TYPES) {
    for (const b of MBTI_TYPES) {
      assert.equal(mbtiScore(a, b), mbtiScore(b, a), `${a}-${b} 비대칭`);
    }
  }
});

test('N/S와 T/F가 같으면 다를 때보다 점수가 높다', () => {
  // ENFP vs ESFP: N/S만 다름 → ENFP vs ENTP(T/F만 다름)와 비교
  const nsSame = mbtiScore('ENFP', 'ENTP'); // N 같음, F/T 다름
  const nsDiff = mbtiScore('ENFP', 'ESFP'); // N/S 다름, F 같음
  // N/S 축이 T/F 축보다 가중치가 커서, N/S가 갈리는 쪽이 더 낮아야 한다
  assert.ok(nsSame > nsDiff, `${nsSame} vs ${nsDiff}`);
});

test('E/I·J/P가 반대면 보완 가점이 붙는다', () => {
  // 핵심(N,F) 같고 E/I·J/P만 반대 → best 근처
  const s = mbtiScore('INFJ', 'ENFP'); // I↔E, N=N, F=F, J↔P
  assert.ok(s >= 84, `INFJ-ENFP 점수 ${s} — best 기대`);
});

test('밴드 경계가 점수와 일치한다', () => {
  assert.equal(mbtiBand(84), 'best');
  assert.equal(mbtiBand(83), 'good');
  assert.equal(mbtiBand(74), 'good');
  assert.equal(mbtiBand(73), 'ok');
  assert.equal(mbtiBand(64), 'ok');
  assert.equal(mbtiBand(63), 'work');
});

test('완전히 같은 유형은 편안하되 최고점은 아니다', () => {
  const same = mbtiScore('INFP', 'INFP');
  const complement = mbtiScore('INFP', 'ENFJ'); // 핵심 공유 + E/I,J/P 보완
  assert.ok(complement > same, `보완(${complement})이 동일유형(${same})보다 높아야`);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  assert.deepEqual(calcMbtiMatch('INTJ', 'ENFP'), calcMbtiMatch('INTJ', 'ENFP'));
});
