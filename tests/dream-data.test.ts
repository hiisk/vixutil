import { test } from 'node:test';
import assert from 'node:assert/strict';

import { DREAM_DATA, CATEGORIES, POPULAR_KEYWORDS, LUCK_INFO } from '../lib/dream-data.ts';

/**
 * 꿈해몽 자료에는 검사가 없었다. 항목을 스물둘 더하면서 함께 붙인다.
 *
 * 여기서 보는 것은 "해몽이 맞는가"가 아니다 — 그건 검사할 수 있는 것이 아니다.
 * 화면이 자료를 그대로 믿고 쓰는 자리(분류 단추, 검색, 관련 낱말 링크)가
 * 조용히 어긋나는 것만 잡는다.
 */

test('id가 겹치지 않는다', () => {
  const ids = DREAM_DATA.map(d => d.id);
  const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
  assert.deepStrictEqual([...new Set(dup)], []);
});

test('낱말이 겹치지 않는다', () => {
  // 검색 결과에 같은 낱말이 두 줄 나오면 어느 쪽을 눌러야 할지 알 수 없다
  const words = DREAM_DATA.map(d => d.keyword);
  const dup = words.filter((w, i) => words.indexOf(w) !== i);
  assert.deepStrictEqual([...new Set(dup)], []);
});

test('분류가 모두 CATEGORIES 안에 있다', () => {
  // 목록에 없는 분류를 쓰면 그 항목은 어떤 단추로도 걸러지지 않아 화면에서 사라진다
  const bad = DREAM_DATA.filter(d => !CATEGORIES.includes(d.category)).map(d => d.id);
  assert.deepStrictEqual(bad, []);
});

test('분류마다 항목이 있다', () => {
  // 빈 분류 단추는 눌러도 아무것도 안 나온다
  const empty = CATEGORIES.filter(c => !DREAM_DATA.some(d => d.category === c));
  assert.deepStrictEqual(empty, []);
});

test('같은 분류가 한 덩이로 모여 있다', () => {
  /*
   * 화면은 배열 차례 그대로 그린다. 새 항목을 뒤에 이어 붙이면 '전체'에서
   * 동물 … 행동 … 동물 … 로 갈라져 보인다. 분류가 두 번 나타나면 안 된다.
   */
  const seen: string[] = [];
  for (const d of DREAM_DATA) if (seen[seen.length - 1] !== d.category) seen.push(d.category);
  assert.strictEqual(seen.length, new Set(seen).size, `분류가 흩어져 있다: ${seen.join(' → ')}`);
});

test('길흉 값이 LUCK_INFO에 있다', () => {
  const bad = DREAM_DATA.filter(d => !LUCK_INFO[String(d.luck)]).map(d => d.id);
  assert.deepStrictEqual(bad, []);
});

test('요약과 풀이가 비어 있지 않다', () => {
  const bad: string[] = [];
  for (const d of DREAM_DATA) {
    if (!d.keyword.trim()) bad.push(`${d.id}: 낱말`);
    if (!d.emoji.trim()) bad.push(`${d.id}: 이모지`);
    if (d.summary.trim().length < 5) bad.push(`${d.id}: 요약이 짧다`);
    // 풀이가 한 문단뿐이면 상세 화면이 허전하다 — 기존 항목은 모두 셋이다
    if (d.detail.length < 2) bad.push(`${d.id}: 풀이가 ${d.detail.length}문단`);
    for (const p of d.detail) if (p.trim().length < 30) bad.push(`${d.id}: 문단이 짧다`);
  }
  assert.deepStrictEqual(bad, []);
});

test('관련 낱말을 누르면 결과가 나온다', () => {
  /*
   * '관련 꿈 더 보기'의 단추는 그 낱말을 검색창에 넣는다. 항목 하나를 콕 집어
   * 여는 것이 아니라 검색이므로, 낱말이 항목 이름과 똑같을 필요는 없다 —
   * 풀이 본문에 걸려도 된다. 다만 아무것도 안 걸리면 빈 화면이 나온다.
   *
   * 그래서 화면과 같은 조건으로 걸러 본다. 여기 적은 조건이 화면 쪽
   * (app/fortune/dream/page.tsx)과 어긋나면 이 검사는 헛돈다.
   *
   * 누르고 온 항목 자신은 세지 않는다. 검색이 related 안까지 뒤지므로,
   * 없는 낱말을 적어 두어도 그 낱말을 적은 항목 자신은 언제나 걸린다 —
   * 그대로 세면 무엇을 적든 통과하는 검사가 된다.
   */
  const matches = (d: (typeof DREAM_DATA)[number], q: string) =>
    d.keyword.includes(q) ||
    d.summary.includes(q) ||
    d.detail.some(t => t.includes(q)) ||
    (d.related ?? []).some(r => r.includes(q));

  const dead: string[] = [];
  for (const from of DREAM_DATA)
    for (const r of from.related ?? [])
      if (!DREAM_DATA.some(d => d.id !== from.id && matches(d, r))) dead.push(`${from.id} → ${r}`);
  assert.deepStrictEqual(dead, []);
});

test('관련 낱말에 자기 자신이 없다', () => {
  // '관련 꿈 더 보기'를 눌렀는데 보고 있던 그 꿈이 나오면 제자리걸음이다
  const bad = DREAM_DATA.filter(d => (d.related ?? []).includes(d.keyword)).map(d => d.id);
  assert.deepStrictEqual(bad, []);
});

test('인기 낱말이 실제 항목을 가리킨다', () => {
  const words = new Set(DREAM_DATA.map(d => d.keyword));
  const bad = POPULAR_KEYWORDS.filter(k => !words.has(k));
  assert.deepStrictEqual(bad, []);
});

test('항목이 일흔 가지를 넘는다', () => {
  // 화면 문구가 개수를 말한다. 줄어들면 그 문구부터 거짓이 된다
  assert.ok(DREAM_DATA.length >= 70, `${DREAM_DATA.length}가지`);
});
