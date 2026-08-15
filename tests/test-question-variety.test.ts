import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TESTS } from '../lib/test-data.ts';

/**
 * 심리테스트 문항이 테스트끼리 돌려쓰이지 않는지 본다.
 *
 * 2026-08-15 이전에는 2,631문항 중 281개가 다른 테스트와 글자까지 같았다.
 * "더 공감되는 말은?"이 95개 테스트에, "하나만 선택해야 한다면?"이 81개,
 * "친구들이 나한테 하는 말은?"이 58개에 붙어 있었다. 어느 테스트에나 붙는
 * 문장은 그 테스트의 것이 아니다 — 10문항짜리에 채움용이 셋이면 실질 7문항이다.
 *
 * 그 281개를 주제별 상황으로 다시 쓰고 나서 남은 최대 겹침이 2다.
 * 그래서 한계를 2로 박는다. 지금 상태(2)를 그대로 기준으로 두면 검사가
 * 아무것도 안 막으니, 여기서 더 늘어나는 것만 막는 게 이 검사의 뜻이다.
 * 남은 17종(전부 2개씩)은 대개 같은 계열 테스트가 나눠 쓰는 것이라 뒀다.
 */

/** 같은 계열 테스트가 문항 하나를 나눠 쓰는 것까지는 둔다. 셋부터는 채움용이다. */
const MAX_SHARED = 2;

test('한 문항이 세 개 이상의 테스트에 쓰이지 않는다', () => {
  const where = new Map<string, string[]>();
  for (const t of TESTS) {
    for (const q of t.questions) {
      const list = where.get(q.q) ?? [];
      // 같은 테스트 안에서 두 번 세지 않는다 — 테스트 수가 기준이다
      if (!list.includes(t.slug)) list.push(t.slug);
      where.set(q.q, list);
    }
  }

  const over = [...where.entries()]
    .filter(([, slugs]) => slugs.length > MAX_SHARED)
    .sort((a, b) => b[1].length - a[1].length)
    .map(([q, slugs]) => `${slugs.length}개 테스트: "${q.replace(/\n/g, ' ')}" (${slugs.slice(0, 5).join(', ')}…)`);

  assert.deepEqual(over, [], `돌려쓰는 문항:\n${over.join('\n')}`);
});

test('한 테스트 안에서 같은 문항이 두 번 나오지 않는다', () => {
  // MBTI형이 "더 공감되는 말은?"을 축만 바꿔 두 번 쓰고 있었다.
  const bad: string[] = [];
  for (const t of TESTS) {
    const seen = new Set<string>();
    for (const q of t.questions) {
      if (seen.has(q.q)) bad.push(`${t.slug}: "${q.q.replace(/\n/g, ' ')}"`);
      seen.add(q.q);
    }
  }
  assert.deepEqual(bad, [], `한 테스트 안 중복 문항: ${bad.join(', ')}`);
});
