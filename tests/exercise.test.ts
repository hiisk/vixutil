import { test } from 'node:test';
import assert from 'node:assert/strict';

import { EXERCISES, WEIGHTS, MINUTES, kcal, exerciseBySlug, relatedExercises } from '../lib/body/exercise.ts';
import { ALL_LOCALES10 } from '../lib/locales.ts';

/** 운동 MET 표 — 값이 틀리면 사람이 칼로리를 두 배로 잘못 안다 */

test('열 언어 이름이 다 있고 슬러그가 겹치지 않는다', () => {
  assert.equal(new Set(EXERCISES.map(x => x.slug)).size, EXERCISES.length, '슬러그가 겹친다');
  for (const x of EXERCISES) {
    for (const l of ALL_LOCALES10) assert.ok(x.name[l]?.trim(), `${x.slug}에 ${l} 이름이 없다`);
    assert.match(x.slug, /^[a-z0-9-]+$/, `${x.slug}가 주소로 못 쓸 꼴이다`);
  }
});

test('MET이 그럴듯한 범위에 있고 강도 순서가 맞다', () => {
  for (const x of EXERCISES) assert.ok(x.met >= 2 && x.met <= 15, `${x.slug}의 MET ${x.met}이 범위 밖이다`);
  const met = (s: string) => exerciseBySlug(s)!.met;
  /* 빠를수록 커야 한다 — 표를 옮겨 적다 뒤집히는 자리다 */
  assert.ok(met('walking-slow') < met('walking') && met('walking') < met('walking-fast'));
  assert.ok(met('running-8') < met('running-10') && met('running-10') < met('running-12') && met('running-12') < met('running-14'));
  assert.ok(met('cycling-16') < met('cycling-22'));
  assert.ok(met('swimming-slow') < met('swimming-fast'));
  assert.ok(met('weight-light') < met('weight-hard'));
  assert.ok(met('yoga') < met('crossfit'));
});

test('칼로리 식을 손으로 못 박는다', () => {
  /* MET 8.3 · 70kg · 30분 = 8.3 × 3.5 × 70 ÷ 200 × 30 = 305 kcal */
  assert.equal(kcal(8.3, 70, 30), 305);
  /* 걷기 3.5 MET · 60kg · 60분 = 220.5 → 221 */
  assert.equal(kcal(3.5, 60, 60), 221);
  /* 0분이면 0 */
  assert.equal(kcal(10, 70, 0), 0);
});

test('무거울수록·오래할수록 칼로리가 는다', () => {
  for (const x of EXERCISES.slice(0, 5)) {
    for (let i = 1; i < WEIGHTS.length; i++) {
      assert.ok(kcal(x.met, WEIGHTS[i], 30) > kcal(x.met, WEIGHTS[i - 1], 30), `${x.slug}: 체중이 늘었는데 칼로리가 안 는다`);
    }
    for (let i = 1; i < MINUTES.length; i++) {
      assert.ok(kcal(x.met, 70, MINUTES[i]) > kcal(x.met, 70, MINUTES[i - 1]), `${x.slug}: 시간이 늘었는데 칼로리가 안 는다`);
    }
  }
});

test('이웃이 서로를 가리켜 고아가 없다', () => {
  const inbound = new Map(EXERCISES.map(x => [x.slug, 0]));
  for (const x of EXERCISES) {
    for (const r of relatedExercises(x.slug)) {
      assert.notEqual(r.slug, x.slug, `${x.slug}가 자기를 이웃으로 든다`);
      inbound.set(r.slug, (inbound.get(r.slug) ?? 0) + 1);
    }
  }
  assert.deepEqual([...inbound].filter(([, n]) => n === 0).map(([s]) => s), []);
});
