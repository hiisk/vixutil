import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TESTS } from '../lib/test-data.ts';
import { explainTest } from '../lib/test-why.ts';
import { resolveResult } from '../lib/test-score.ts';

/**
 * 결과 되짚기가 288종 전부에서 성립하는지.
 *
 * 한 종만 눌러 보고 「잘 나온다」로 넘기면 뜻이 없다. 채점 방식이 넷이고 종마다
 * 문항 수·점수 폭·유형 개수가 다 달라서, 어딘가에서 0으로 나누거나 빈 배열을
 * 내는 경우가 반드시 생긴다. 전부 돌린다.
 */

/** 답을 정해진 방식으로 고른다 — 무작위면 실패를 재현할 수 없다 */
const pickAll = (n: number, f: (qi: number) => number) => Array.from({ length: n }, (_, i) => f(i));

test('288종 전부에서 설명이 나온다', () => {
  const broken: string[] = [];
  for (const t of TESTS) {
    /* 첫 보기만 고르기 / 마지막만 고르기 / 번갈아 고르기 — 세 가지 길 */
    const paths = [
      pickAll(t.questions.length, () => 0),
      pickAll(t.questions.length, qi => t.questions[qi].opts.length - 1),
      pickAll(t.questions.length, qi => qi % t.questions[qi].opts.length),
    ];
    for (const picks of paths) {
      const why = explainTest(t, picks);
      if (!why) { broken.push(`${t.slug}: 설명이 null`); continue; }
      if (!why.headline.trim()) broken.push(`${t.slug}: 한 줄 요약이 비었다`);
      if (!why.axes.length) broken.push(`${t.slug}(${why.kind}): 축이 하나도 없다`);
      for (const a of why.axes) {
        if (!Number.isFinite(a.percent)) broken.push(`${t.slug}: percent가 ${a.percent}`);
        if (a.percent < 0 || a.percent > 100) broken.push(`${t.slug}: percent가 ${a.percent}`);
        if (!a.label.trim() || !a.side.trim()) broken.push(`${t.slug}: 축 이름이 비었다`);
      }
      for (const s of why.swings) {
        if (!Number.isFinite(s.push)) broken.push(`${t.slug}: push가 ${s.push}`);
        if (!s.q.trim() || !s.answer.trim()) broken.push(`${t.slug}: 문항/답이 비었다`);
      }
      if (why.margin && !Number.isFinite(why.margin.gap)) broken.push(`${t.slug}: gap이 ${why.margin.gap}`);
    }
  }
  assert.deepEqual(broken.slice(0, 12), [], `${broken.length}건:\n  ${broken.slice(0, 12).join('\n  ')}`);
});

test('설명이 화면과 같은 결과를 가리킨다', () => {
  /* 여기서 결과를 따로 계산하면 «설명은 A인데 결과는 B»가 된다 */
  const bad: string[] = [];
  for (const t of TESTS.filter(x => x.type === 'category')) {
    const picks = pickAll(t.questions.length, qi => qi % t.questions[qi].opts.length);
    const why = explainTest(t, picks)!;
    const result = resolveResult(t, picks);
    if (!why.headline.includes(result.title)) bad.push(`${t.slug}: «${result.title}»을 안 가리킨다`);
  }
  assert.deepEqual(bad, [], bad.join('\n'));
});

test('크게 민 답이 실제로 끝쪽 보기다', () => {
  /*
   * push는 «그 문항 보기들의 한가운데에서 얼마나 벗어났나»다. 그러니 모든
   * 문항에서 최고점을 고르면 push가 최대여야 하고, 한가운데를 고르면 0에
   * 가까워야 한다. 그게 안 되면 이 수는 아무 뜻이 없다.
   */
  const t = TESTS.find(x => x.questions.every(q => q.opts.length >= 3))!;
  assert.ok(t, '보기 셋 이상인 테스트가 없다');

  const extreme = explainTest(t, pickAll(t.questions.length, () => 0))!;
  const middle = explainTest(
    t, pickAll(t.questions.length, qi => Math.floor(t.questions[qi].opts.length / 2)),
  )!;
  const sum = (w: typeof extreme) => w.swings.reduce((s, x) => s + x.push, 0);
  assert.ok(sum(extreme) >= sum(middle),
    `끝쪽(${sum(extreme)})이 가운데(${sum(middle)})보다 덜 밀었다고 나온다`);
});

test('점수합은 옆 구간과의 차이를 말해 준다', () => {
  const t = TESTS.find(x => !x.type || x.type === 'score')!;
  const why = explainTest(t, pickAll(t.questions.length, () => 0))!;
  assert.equal(why.kind, 'score');
  assert.ok(why.margin, '옆 구간 정보가 없다');
  assert.ok(why.margin!.gap >= 0, `gap이 음수다: ${why.margin!.gap}`);
  assert.equal(why.margin!.unit, '점');
  assert.match(why.headline, /\d+점/);
});

test('MBTI는 축 넷을 각각 낸다', () => {
  const t = TESTS.find(x => x.type === 'mbti')!;
  const why = explainTest(t, pickAll(t.questions.length, () => 0))!;
  assert.equal(why.kind, 'mbti');
  assert.equal(why.axes.length, 4, `축이 ${why.axes.length}개다`);
  for (const a of why.axes) assert.match(a.label, /↔/, `축 이름에 양끝이 없다: ${a.label}`);
});

test('문항을 다 안 풀면 설명하지 않는다', () => {
  /* 반만 푼 상태로 설명을 내면 없는 문항을 읽다가 터진다 */
  const t = TESTS[0];
  assert.equal(explainTest(t, []), null);
  assert.equal(explainTest(t, [0]), null);
  assert.ok(explainTest(t, pickAll(t.questions.length, () => 0)));
});

test('이 검사가 실제로 문다', () => {
  assert.ok(TESTS.length > 250, `테스트가 ${TESTS.length}종뿐이다`);
  /* 네 채점 방식이 실제로 다 쓰이는지 — 하나라도 0이면 그 갈래는 안 재고 있다 */
  const kinds = new Set(TESTS.map(t => {
    const why = explainTest(t, pickAll(t.questions.length, () => 0));
    return why?.kind;
  }));
  assert.ok(kinds.has('score'), '점수합 테스트를 하나도 안 쟀다');
  assert.ok(kinds.has('mbti'), 'MBTI 테스트를 하나도 안 쟀다');
  assert.ok(kinds.has('category'), '범주형 테스트를 하나도 안 쟀다');

  /* push 계산이 상수를 내지 않는지 */
  const t = TESTS.find(x => x.questions.some(q => new Set(q.opts.map(o => o.score)).size > 1))!;
  const pushes = new Set(explainTest(t, pickAll(t.questions.length, () => 0))!.swings.map(s => s.push));
  assert.ok(pushes.size >= 1 && ![...pushes].every(p => p === 0), 'push가 전부 0이다');
});
