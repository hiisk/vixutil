import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getLuckyLotto } from '../lib/lucky-lotto.ts';

test('번호는 1~45 중 6개, 중복 없이 오름차순', () => {
  const r = getLuckyLotto(1995, 3, 15, '20260728');
  assert.equal(r.numbers.length, 6);
  assert.equal(new Set(r.numbers).size, 6);
  for (const n of r.numbers) assert.ok(n >= 1 && n <= 45, `범위 밖: ${n}`);
  const sorted = [...r.numbers].sort((a, b) => a - b);
  assert.deepEqual(r.numbers, sorted);
});

test('보너스는 1~45이고 6개와 겹치지 않는다', () => {
  const r = getLuckyLotto(2001, 12, 31, '20260728');
  assert.ok(r.bonus >= 1 && r.bonus <= 45);
  assert.ok(!r.numbers.includes(r.bonus));
});

test('같은 입력은 항상 같은 결과(결정론적)', () => {
  const a = getLuckyLotto(1988, 7, 7, '20260728');
  const b = getLuckyLotto(1988, 7, 7, '20260728');
  assert.deepEqual(a, b);
});

test('날짜가 바뀌면 번호가 달라진다', () => {
  const a = getLuckyLotto(1990, 1, 1, '20260728');
  const b = getLuckyLotto(1990, 1, 1, '20260729');
  assert.notDeepEqual(a.numbers, b.numbers);
});

test('생년월일이 다르면 대체로 다른 번호가 나온다', () => {
  const a = getLuckyLotto(1995, 5, 5, '20260728');
  const b = getLuckyLotto(1996, 5, 5, '20260728');
  assert.notDeepEqual(a.numbers, b.numbers);
});

test('행운 요소(방향·요일·시간대)가 채워진다', () => {
  const r = getLuckyLotto(1999, 9, 9, '20260728');
  for (const f of [r.direction, r.weekday, r.timeSlot]) {
    assert.ok(typeof f === 'string' && f.length > 0);
  }
});
