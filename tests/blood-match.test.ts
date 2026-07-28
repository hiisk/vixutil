import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calcBloodMatch, BLOOD_TYPES, type BloodType } from '../lib/blood-match.ts';

const IDS = BLOOD_TYPES.map(b => b.id);

test('모든 조합이 유효한 결과를 낸다', () => {
  for (const a of IDS) {
    for (const b of IDS) {
      const r = calcBloodMatch(a, b);
      assert.ok(r.score >= 0 && r.score <= 100, `${a}-${b}: ${r.score}`);
      assert.ok(r.label && r.headline && r.reason && r.love && r.advice, `${a}-${b}: 빈 필드`);
    }
  }
});

test('궁합은 대칭이다 (a-b == b-a, 주체만 반대)', () => {
  for (const a of IDS) {
    for (const b of IDS) {
      const ab = calcBloodMatch(a, b);
      const ba = calcBloodMatch(b, a);
      assert.equal(ab.score, ba.score, `${a}-${b} 점수 비대칭`);
      assert.equal(ab.label, ba.label);
    }
  }
});

test('네 가지 혈액형이 정의돼 있다', () => {
  assert.deepEqual([...IDS].sort(), ['A', 'AB', 'B', 'O']);
});

test('같은 입력은 항상 같은 결과를 준다', () => {
  assert.deepEqual(calcBloodMatch('A', 'O'), calcBloodMatch('A', 'O'));
});

test('알려진 조합의 점수가 기대대로다', () => {
  assert.equal(calcBloodMatch('A', 'O').score, 85);
  assert.equal(calcBloodMatch('O', 'A').score, 85); // 대칭
  assert.equal(calcBloodMatch('A', 'B').score, 71);
});

test('모든 10개 쌍이 서로 다른 조합을 다룬다', () => {
  const seen = new Set<number>();
  const pairs: [BloodType, BloodType][] = [
    ['A','A'],['A','B'],['A','O'],['A','AB'],['B','B'],['B','O'],['B','AB'],['O','O'],['O','AB'],['AB','AB'],
  ];
  for (const [a, b] of pairs) {
    const r = calcBloodMatch(a, b);
    assert.ok(r.label.length > 0, `${a}-${b} 누락`);
    seen.add(r.score);
  }
  assert.ok(seen.size >= 8, '점수가 지나치게 겹친다');
});
