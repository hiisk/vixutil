import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { TESTS } from '../lib/test-data.ts';
import { TESTS_INTL } from '../lib/test-l10n/index.ts';
import type { Test } from '../lib/types.ts';

/**
 * 결과가 실제로 갈리는지 전수로 센다.
 *
 * 빈틈·겹침만 보던 [[tests/test-data-quality.test.ts]]는 이 병을 못 봤다.
 * 구간이 빈틈없이 이어져도, 10문항 × 1~4점의 합은 25 근처에 몰리기 때문에
 * 점수 범위를 균등하게 4등분한 10-17 / 18-25 / 26-33 / 34-40 은 실제로는
 * 1.6% / 54% / 44% / 0.7% 로 갈렸다. 맨 위 결과(대개 🏆가 붙은 것)는
 * 답 조합 1,000개 중 7개에서만 나왔다 — 사실상 아무도 못 보는 결과다.
 *
 * 그래서 구간이 아니라 **답 조합의 몫**을 센다. 모든 답 조합을 실제로
 * 만들어 보는 대신 점수합의 분포를 DP로 정확히 구한다(4^10 = 104만 조합을
 * 낱개로 세는 것과 결과가 같다).
 */

/** 점수합마다 그 합을 만드는 답 조합이 몇 가지인지 — 정확한 값이다 */
function scoreDist(t: Test): Map<number, number> {
  let d = new Map<number, number>([[0, 1]]);
  for (const q of t.questions) {
    const n = new Map<number, number>();
    for (const [s, c] of d) for (const o of q.opts) n.set(s + o.score, (n.get(s + o.score) ?? 0) + c);
    d = n;
  }
  return d;
}

/** TestEngine과 같은 규칙으로 결과를 고른 뒤, 결과마다 조합 몫을 낸다 */
function shares(t: Test): number[] {
  const d = scoreDist(t);
  const total = [...d.values()].reduce((a, b) => a + b, 0);
  const hit = t.results.map(() => 0);
  for (const [s, c] of d) {
    let i = t.results.findIndex(r => s >= r.min && s <= r.max);
    if (i < 0) i = t.results.length - 1; // 엔진의 폴백과 같다
    hit[i] += c;
  }
  return hit.map(c => c / total);
}

const ALL: Array<[string, Test]> = [
  ...TESTS.map(t => [`ko/${t.slug}`, t] as [string, Test]),
  ...Object.entries(TESTS_INTL).flatMap(([lang, list]) =>
    list.map(t => [`${lang}/${t.slug}`, t] as [string, Test])),
];

/** 점수합 → 구간을 쓰는 것들 (type이 없는 기본형) */
const SCORE_TESTS = ALL.filter(([, t]) => !t.type);
const CATEGORY_TESTS = ALL.filter(([, t]) => t.type === 'category');
const QUADRANT_TESTS = ALL.filter(([, t]) => t.type === 'quadrant');

/**
 * 범주형·사분면의 몫도 DP로 정확히 센다.
 *
 * 점수합 대신 "상태"를 쌓는다 — 범주형은 유형별 표, 사분면은 축별 합이다.
 * 상태를 문자열 열쇠로 눌러 담기 때문에 문항마다 보기 배치가 달라도 맞는다.
 */
function stateDist(t: Test, init: number[], step: (s: number[], oi: number, qi: number) => number[]): Map<string, number> {
  let d = new Map<string, number>([[init.join(','), 1]]);
  for (let qi = 0; qi < t.questions.length; qi++) {
    const n = new Map<string, number>();
    for (const [s, c] of d) {
      const v = s.split(',').map(Number);
      for (let oi = 0; oi < t.questions[qi].opts.length; oi++) {
        const k = step(v, oi, qi).join(',');
        n.set(k, (n.get(k) ?? 0) + c);
      }
    }
    d = n;
  }
  return d;
}

/**
 * components/TestEngine.tsx의 byVotes와 같은 규칙 — 동점이면 마지막에 고른 쪽.
 *
 * 상태의 앞 절반은 유형별 표, 뒷 절반은 "마지막으로 고른 순서"의 등수다(0이 가장 최근).
 * 몇 번째 문항에서 골랐는지가 아니라 등수만 있으면 동점 판정이 되므로,
 * 상태 수가 표 조합(286) × 등수 순열(24) 안으로 묶인다.
 */
function categoryShares(t: Test): number[] {
  const keys = t.results.map(r => r.k!);
  const n = keys.length;
  const init = [...keys.map(() => 0), ...keys.map((_, i) => i)]; // 아무도 안 골랐으면 앞에 적은 쪽이 이긴다
  const d = stateDist(t, init, (v, oi, qi) => {
    const i = keys.indexOf(t.questions[qi].opts[oi].k!);
    const next = [...v];
    if (i >= 0) {
      next[i]++;
      const rank = v[n + i];
      for (let j = 0; j < n; j++) if (v[n + j] < rank) next[n + j]++;
      next[n + i] = 0;
    }
    return next;
  });
  const hit = keys.map(() => 0);
  let total = 0;
  for (const [s, c] of d) {
    const v = s.split(',').map(Number);
    let best = 0;
    for (let i = 1; i < n; i++) if (v[i] > v[best] || (v[i] === v[best] && v[n + i] < v[n + best])) best = i;
    hit[best] += c;
    total += c;
  }
  return hit.map(c => c / total);
}

/** components/TestEngine.tsx의 byAxes와 같은 규칙 — 축 합이 0이면 '-' */
function quadrantShares(t: Test): number[] {
  const width = t.questions[0].opts[0].ax!.length;
  const d = stateDist(t, Array(width).fill(0), (v, oi, qi) =>
    v.map((x, i) => x + (t.questions[qi].opts[oi].ax![i] ?? 0)));
  const hit = t.results.map(() => 0);
  let total = 0;
  for (const [s, c] of d) {
    const key = s.split(',').map(Number).map(x => (x > 0 ? '+' : '-')).join('');
    let i = t.results.findIndex(r => r.k === key);
    if (i < 0) i = t.results.length - 1; // 엔진의 폴백과 같다
    hit[i] += c;
    total += c;
  }
  return hit.map(c => c / total);
}

test('DP로 센 조합 수가 손으로 아는 값과 맞는다', () => {
  // 10문항 × 1·2·3·4점: 합이 10인 조합은 전부 1점을 고른 1가지,
  // 11인 조합은 한 문항만 2점인 10가지, 12인 조합은 C(11,2) = 55가지다.
  const fake = {
    slug: 'x', title: 'x', desc: 'x', icon: 'x', category: 'x',
    questions: Array.from({ length: 10 }, () => ({ q: 'q', opts: [1, 2, 3, 4].map(score => ({ text: 't', score })) })),
    results: [],
  } as unknown as Test;
  const d = scoreDist(fake);
  assert.equal(d.get(10), 1);
  assert.equal(d.get(11), 10);
  assert.equal(d.get(12), 55);
  assert.equal([...d.values()].reduce((a, b) => a + b, 0), 4 ** 10);
});

test('결과가 모아 놓은 테스트가 실제로 수집된다', () => {
  assert.ok(SCORE_TESTS.length > 280, `수집 실패 (${SCORE_TESTS.length}개)`);
});

test('실제로 나올 수 있는 모든 점수에 결과가 정확히 하나씩 있다', () => {
  /*
   * [[tests/test-intl.test.ts]]는 아홉 언어에 이 검사가 있는데 한국어 264종에는
   * 없었다 — [[tests/test-data-quality.test.ts]]는 적어 놓은 구간끼리만 비교해서
   * 구간 전체가 실제 점수 범위를 벗어나도 통과한다. 그러면 TestEngine이
   * 마지막 결과로 떨어뜨려(폴백) 아무 점수에나 같은 결과가 뜬다.
   */
  const bad: string[] = [];
  for (const [label, t] of SCORE_TESTS) {
    for (const s of scoreDist(t).keys()) {
      const n = t.results.filter(r => s >= r.min && s <= r.max).length;
      if (n !== 1) bad.push(`${label}: ${s}점에 걸리는 결과가 ${n}개`);
    }
  }
  assert.deepEqual(bad, [], `점수에 결과가 없거나 겹친다:\n  ${bad.join('\n  ')}`);
});

test('어떤 결과도 답 조합의 12% 아래로 떨어지지 않는다', () => {
  // 12%는 넉넉한 하한이다. 지금 가장 좁은 결과가 20.2%이고, 고치기 전에는
  // 0.49%였다. 새 테스트를 점수 범위 균등 4등분으로 만들면 여기서 걸린다.
  const bad: string[] = [];
  for (const [label, t] of SCORE_TESTS) {
    for (const [i, p] of shares(t).entries()) {
      if (p < 0.12) bad.push(`${label} #${i} "${t.results[i].title}" ${(p * 100).toFixed(2)}%`);
    }
  }
  assert.deepEqual(bad, [], `사실상 도달 불가한 결과:\n  ${bad.join('\n  ')}`);
});

test('한 결과가 답 조합의 절반을 먹지 않는다', () => {
  const bad: string[] = [];
  for (const [label, t] of SCORE_TESTS) {
    for (const [i, p] of shares(t).entries()) {
      if (p > 0.45) bad.push(`${label} #${i} "${t.results[i].title}" ${(p * 100).toFixed(2)}%`);
    }
  }
  assert.deepEqual(bad, [], `한 결과로 쏠린 테스트:\n  ${bad.join('\n  ')}`);
});

test('범주형·사분면이 실제로 수집된다', () => {
  // 데이터에서 type이 빠지면 조용히 점수합으로 돌아가고 아래 검사들이 0개를 돈다
  assert.ok(CATEGORY_TESTS.length >= 10, `범주형 수집 실패 (${CATEGORY_TESTS.length}개)`);
  assert.ok(QUADRANT_TESTS.length >= 3, `사분면 수집 실패 (${QUADRANT_TESTS.length}개)`);
});

test('범주형은 보기와 결과의 유형 열쇠가 서로 맞는다', () => {
  /*
   * 열쇠 하나가 어긋나면 그 유형은 표를 한 장도 못 받아 영영 안 나오는데,
   * 화면에는 다른 결과가 멀쩡히 뜨기 때문에 눈으로는 안 잡힌다.
   */
  const bad: string[] = [];
  for (const [label, t] of CATEGORY_TESTS) {
    const keys = t.results.map(r => r.k);
    if (keys.some(k => !k)) bad.push(`${label}: k 없는 결과`);
    if (new Set(keys).size !== keys.length) bad.push(`${label}: 결과 열쇠가 겹친다`);
    for (const q of t.questions) {
      for (const o of q.opts) {
        if (!o.k) bad.push(`${label}: k 없는 보기 "${o.text}"`);
        else if (!keys.includes(o.k)) bad.push(`${label}: 보기 열쇠 ${o.k}에 맞는 결과가 없다`);
      }
    }
  }
  assert.deepEqual(bad, [], `범주형 열쇠 어긋남:\n  ${bad.join('\n  ')}`);
});

test('사분면은 축 개수가 고르고 부호 조합이 모두 결과를 갖는다', () => {
  const bad: string[] = [];
  for (const [label, t] of QUADRANT_TESTS) {
    const width = t.questions[0].opts[0].ax?.length ?? 0;
    assert.ok(width >= 2, `${label}: 축이 ${width}개`);
    for (const q of t.questions) {
      for (const o of q.opts) {
        if (o.ax?.length !== width) bad.push(`${label}: 보기 "${o.text}"의 축이 ${o.ax?.length}개`);
      }
    }
    // 2^축 가지 부호 조합이 전부 결과로 있어야 폴백(마지막 결과)으로 안 샌다
    const want = Array.from({ length: 2 ** width }, (_, n) =>
      Array.from({ length: width }, (_, i) => ((n >> i) & 1 ? '+' : '-')).join(''));
    const have = t.results.map(r => r.k ?? '');
    for (const k of want) if (!have.includes(k)) bad.push(`${label}: 부호 ${k}에 맞는 결과가 없다`);
    for (const k of have) if (!want.includes(k)) bad.push(`${label}: 결과 열쇠 ${k}는 나올 수 없는 부호다`);
  }
  assert.deepEqual(bad, [], `사분면 구조 문제:\n  ${bad.join('\n  ')}`);
});

test('범주형·사분면도 어떤 결과가 12%~45% 안에 든다', () => {
  // 점수합형과 같은 잣대다. 동점 처리가 한쪽으로 쏠리면 여기서 걸린다.
  const bad: string[] = [];
  for (const [label, t] of CATEGORY_TESTS) {
    for (const [i, p] of categoryShares(t).entries()) {
      if (p < 0.12 || p > 0.45) bad.push(`${label} #${i} "${t.results[i].title}" ${(p * 100).toFixed(2)}%`);
    }
  }
  for (const [label, t] of QUADRANT_TESTS) {
    for (const [i, p] of quadrantShares(t).entries()) {
      if (p < 0.12 || p > 0.45) bad.push(`${label} #${i} "${t.results[i].title}" ${(p * 100).toFixed(2)}%`);
    }
  }
  assert.deepEqual(bad, [], `치우친 결과:\n  ${bad.join('\n  ')}`);
});

test('TestEngine의 범주형·사분면 규칙이 이 검사와 같다', () => {
  /*
   * 위 두 함수는 엔진의 채점을 손으로 다시 적은 것이다. 엔진 쪽만 바뀌면
   * 검사는 초록인 채로 실제 배분이 달라진다 — MBTI 임계값에 같은 장치가 있다.
   */
  const src = readFileSync(join(import.meta.dirname, '..', 'components', 'TestEngine.tsx'), 'utf8');
  assert.match(src, /v > bv \|\| \(v === bv && \(last\[r\.k!\] \?\? -1\) > \(last\[best\.k!\] \?\? -1\)\)/,
    '범주형 동점 규칙(마지막에 고른 쪽이 이긴다)이 바뀌었다');
  assert.match(src, /sums\.map\(v => \(v > 0 \? '\+' : '-'\)\)/,
    "사분면 부호 규칙(합 0은 '-')이 바뀌었다");
});

test('MBTI형은 축 임계값 8이 축 점수의 한가운데다', () => {
  /*
   * TestEngine의 getMbtiType이 축 합계가 8 이상이면 E/S/T/J로 본다. 이 8은
   * "축마다 3문항 × 1~4점"이라는 지금 데이터에만 맞는 숫자다. 축 문항을
   * 하나만 늘려도(합 4~16, 한가운데 10) 8은 한쪽으로 치우친 값이 된다 —
   * 그러면 거의 모두가 ESTJ가 된다. 데이터가 움직이면 여기서 걸린다.
   */
  const THRESHOLD = 8; // components/TestEngine.tsx getMbtiType
  const src = readFileSync(join(import.meta.dirname, '..', 'components', 'TestEngine.tsx'), 'utf8');
  const found = [...src.matchAll(/>= (\d+) \? '/g)].map(m => Number(m[1]));
  assert.ok(found.length === 4 && found.every(n => n === THRESHOLD),
    `TestEngine의 축 임계값이 ${JSON.stringify(found)}로 바뀌었다 — 이 검사의 ${THRESHOLD}도 같이 봐야 한다`);

  const mbti = [...TESTS, ...Object.values(TESTS_INTL).flat()].filter(t => t.type === 'mbti');
  assert.ok(mbti.length > 0, 'MBTI형 테스트가 없다');
  for (const t of mbti) {
    for (const axis of ['EI', 'SN', 'TF', 'JP'] as const) {
      const qs = t.questions.filter(q => q.axis === axis);
      const lo = qs.reduce((s, q) => s + Math.min(...q.opts.map(o => o.score)), 0);
      const hi = qs.reduce((s, q) => s + Math.max(...q.opts.map(o => o.score)), 0);
      // 임계값이 한가운데면 두 글자가 반반으로 갈린다
      assert.ok(THRESHOLD > lo && THRESHOLD <= hi,
        `${t.slug} ${axis}: 축 점수 ${lo}~${hi}인데 임계값이 ${THRESHOLD}`);
      assert.equal(2 * THRESHOLD - 1, lo + hi,
        `${t.slug} ${axis}: 축 점수 ${lo}~${hi}의 한가운데는 ${(lo + hi + 1) / 2}인데 임계값은 ${THRESHOLD}`);
    }
  }
});
