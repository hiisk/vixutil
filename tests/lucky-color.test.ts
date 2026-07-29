import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getTodayColor, COLORS } from '../lib/lucky-color.ts';

test('색 데이터가 채워져 있다', () => {
  assert.ok(COLORS.length >= 8);
  for (const c of COLORS) {
    assert.match(c.hex, /^#[0-9a-fA-F]{6}$/, `${c.name} hex 형식 오류`);
    for (const f of ['name', 'meaning', 'tip'] as const) {
      assert.ok(c[f].trim().length > 0, `${c.name}: ${f} 비어 있음`);
    }
    assert.ok(c.keywords.length > 0, `${c.name}: keywords 비어 있음`);
  }
});

test('행운의 색과 피해야 할 색은 서로 다르다', () => {
  for (const name of ['', '철수', '영희', '민수', 'a', 'test']) {
    for (const ymd of ['20260729', '20260730', '20261225']) {
      const r = getTodayColor(name, ymd);
      assert.notEqual(r.lucky.name, r.avoid.name, `${name}/${ymd}에서 같은 색`);
    }
  }
});

test('같은 입력은 항상 같은 결과(결정론적)', () => {
  const a = getTodayColor('철수', '20260729');
  const b = getTodayColor('철수', '20260729');
  assert.deepEqual(a, b);
});

test('날짜가 바뀌면 결과가 달라질 수 있다(시드 반영)', () => {
  const days = ['20260729', '20260730', '20260731', '20260801', '20260802'];
  const set = new Set(days.map(d => getTodayColor('철수', d).lucky.name));
  assert.ok(set.size >= 2, '여러 날에 걸쳐 색이 전혀 바뀌지 않는다');
});
