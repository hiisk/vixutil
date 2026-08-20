import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PROFILES } from '../lib/mbti/profiles.ts';
import { functionStack } from '../lib/mbti/functions.ts';
import { MBTI_TYPES, type MbtiType } from '../lib/mbti-match.ts';

/**
 * 유형별 글이 «열여섯 개»인가 — 한 벌을 열여섯 번 적은 것이 아닌가.
 *
 * 이 갈래가 무너지는 방식은 정해져 있다. 형용사를 늘어놓으면 열여섯 중 열에
 * 붙는 문장이 되고, 그러면 페이지가 열여섯 장 있어도 내용은 한 장이다.
 * 형태만 보는 검사는 그것을 못 잡는다 — 필드가 다 차 있으면 초록이다.
 * 그래서 여기서는 **문장이 겹치는지**를 본다.
 */

const ALL = MBTI_TYPES as readonly MbtiType[];

test('열여섯이 다 있고 칸이 비어 있지 않다', () => {
  assert.equal(Object.keys(PROFILES).length, 16);
  for (const t of ALL) {
    const p = PROFILES[t];
    assert.ok(p, `${t}이 없다`);
    assert.equal(p.strengths.length, 3, `${t} 강점`);
    assert.equal(p.pitfalls.length, 3, `${t} 약점`);
    for (const [k, v] of Object.entries(p)) {
      const parts = Array.isArray(v) ? v : [v];
      for (const x of parts) assert.ok(x.trim().length > 5, `${t}.${k}이 비었거나 너무 짧다`);
    }
  }
});

test('한 문장이 두 유형에 겹치지 않는다', () => {
  /* 베껴 붙이면 여기서 걸린다 — 이 갈래가 무너지는 실제 방식이다 */
  const seen = new Map<string, string>();
  const dup: string[] = [];
  for (const t of ALL) {
    const p = PROFILES[t];
    const all = [p.line, p.summary, ...p.strengths, ...p.pitfalls, p.stress, p.work, p.love];
    for (const s of all) {
      const key = s.trim();
      if (seen.has(key)) dup.push(`${seen.get(key)} = ${t}: ${key.slice(0, 40)}`);
      else seen.set(key, t);
    }
  }
  assert.deepEqual(dup, [], `같은 문장이 두 유형에 있다:\n  ${dup.join('\n  ')}`);
});

test('한 줄 요약이 서로 다르고 짧다', () => {
  const lines = ALL.map(t => PROFILES[t].line);
  assert.equal(new Set(lines).size, 16, '겹치는 한 줄이 있다');
  for (const t of ALL) {
    const l = PROFILES[t].line;
    assert.ok(l.length <= 20, `${t}의 한 줄이 ${l.length}자다 — 카드에서 잘린다`);
    /* 유형 글자를 그대로 넣으면 「INFP — INFP형」이 된다 */
    assert.ok(!l.includes(t), `${t}의 한 줄에 유형 이름이 들어 있다`);
  }
});

test('지칠 때 글이 열등기능마다 갈린다', () => {
  /*
    열등기능은 여덟 가지를 두 유형이 나눠 갖는다. 같은 열등기능끼리는 닮아도
    되지만, **다른** 열등기능끼리 같은 말이면 계산을 안 보고 적은 것이다.
  */
  const byInferior = new Map<string, MbtiType[]>();
  for (const t of ALL) {
    const inf = functionStack(t)[3];
    byInferior.set(inf, [...(byInferior.get(inf) ?? []), t]);
  }
  assert.equal(byInferior.size, 8, `열등기능이 ${byInferior.size}가지다`);
  for (const [, pair] of byInferior) assert.equal(pair.length, 2);

  /* 열등기능이 다른데 stress가 같으면 잘못이다 */
  const stress = new Map<string, MbtiType>();
  for (const t of ALL) {
    const s = PROFILES[t].stress.trim();
    const prev = stress.get(s);
    assert.equal(prev, undefined, `${prev}와 ${t}의 지칠 때 글이 같다`);
    stress.set(s, t);
  }
});

test('형용사만 늘어놓지 않았다 — 문장이 실제로 길다', () => {
  /*
    「창의적이고 이상적입니다」 같은 글은 짧다. 길이만으로 좋은 글을 가릴 수는
    없지만, **너무 짧은 것**은 거의 언제나 형용사 나열이다. 바닥만 지킨다.
  */
  for (const t of ALL) {
    const p = PROFILES[t];
    assert.ok(p.summary.length >= 60, `${t} 요약이 ${p.summary.length}자다`);
    assert.ok(p.stress.length >= 40, `${t} 지칠 때가 ${p.stress.length}자다`);
    for (const s of [...p.strengths, ...p.pitfalls]) {
      assert.ok(s.length >= 15, `${t}: 「${s}」가 너무 짧다`);
    }
  }
});

test('이 검사가 실제로 문다', () => {
  const fake = { ...PROFILES, INTJ: { ...PROFILES.INFP } };
  const lines = Object.values(fake).map(p => p.line);
  assert.notEqual(new Set(lines).size, 16, '한 벌을 베껴도 안 걸린다');
});
