import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  analyzeFirstImpression, IMPRESSION_TYPES, IMPRESSION_TIPS,
} from '../lib/first-impression-data.ts';

test('유형·팁 풀이 비어 있지 않다', () => {
  assert.ok(IMPRESSION_TYPES.length >= 5, `유형이 ${IMPRESSION_TYPES.length}개뿐`);
  assert.ok(IMPRESSION_TIPS.length >= 8, `팁이 ${IMPRESSION_TIPS.length}개뿐`);
});

test('유형 id가 중복되지 않는다', () => {
  const ids = IMPRESSION_TYPES.map(t => t.id);
  assert.equal(new Set(ids).size, ids.length, '중복 id 존재');
});

test('모든 유형에 설명·강점·키워드가 있다', () => {
  for (const t of IMPRESSION_TYPES) {
    assert.ok(t.desc.length > 50, `${t.id}: 설명이 너무 짧다`);
    assert.ok(t.strength.length > 10, `${t.id}: 강점 설명 없음`);
    assert.ok(t.keywords.length >= 3, `${t.id}: 키워드가 부족하다`);
    assert.ok(t.emoji && t.color, `${t.id}: 이모지/색 누락`);
  }
});

test('같은 사진이면 같은 결과가 나온다 (결정론)', () => {
  // 새로고침할 때마다 인상이 바뀌면 신뢰를 잃는다.
  const a = analyzeFirstImpression(0.7, 0.3, 0.8);
  const b = analyzeFirstImpression(0.7, 0.3, 0.8);
  assert.deepEqual(a, b);
});

test('측정값이 다르면 유형도 갈린다', () => {
  // 무슨 사진을 넣어도 같은 결과가 나오면 측정하는 의미가 없다.
  const seen = new Set<string>();
  for (const eye of [0.2, 0.8]) {
    for (const face of [0.2, 0.8]) {
      for (const mouth of [0.2, 0.8]) {
        seen.add(analyzeFirstImpression(eye, face, mouth).type.id);
      }
    }
  }
  assert.ok(seen.size >= 4, `8가지 조합에서 유형이 ${seen.size}종류만 나온다`);
});

test('선언된 유형이 모두 도달 가능하다', () => {
  // 아무 사진으로도 나올 수 없는 유형이 있으면 그건 죽은 콘텐츠다.
  const reachable = new Set<string>();
  for (let e = 0; e <= 1; e += 0.1) {
    for (let f = 0; f <= 1; f += 0.1) {
      for (let m = 0; m <= 1; m += 0.1) {
        reachable.add(analyzeFirstImpression(e, f, m).type.id);
      }
    }
  }
  const dead = IMPRESSION_TYPES.filter(t => !reachable.has(t.id)).map(t => t.id);
  assert.deepEqual(dead, [], `도달 불가능한 유형: ${dead.join(', ')}`);
});

test('점수는 항상 0~100이다', () => {
  for (const v of [-1, 0, 0.5, 1, 2, NaN]) {
    const r = analyzeFirstImpression(v, v, v);
    for (const s of [r.eyeScore, r.faceScore, r.mouthScore]) {
      assert.ok(s >= 0 && s <= 100, `점수 범위 이탈: ${s} (입력 ${v})`);
    }
  }
});

test('결과에 항상 팁이 붙는다', () => {
  for (let i = 0; i < 50; i++) {
    const r = analyzeFirstImpression(i / 50, (50 - i) / 50, (i % 10) / 10);
    assert.ok(IMPRESSION_TIPS.includes(r.tip), '팁 풀에 없는 값이 나왔다');
  }
});

test('팁이 한 가지에 몰리지 않는다', () => {
  const seen = new Set<string>();
  for (let i = 0; i < 200; i++) {
    seen.add(analyzeFirstImpression(i / 200, (i * 7 % 200) / 200, (i * 13 % 200) / 200).tip);
  }
  assert.ok(seen.size >= 5, `팁이 ${seen.size}종류만 나온다`);
});
