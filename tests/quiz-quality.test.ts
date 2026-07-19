import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * 퀴즈 문항의 "풀지 않고 맞히기" 가능성을 막는다.
 *
 * lib/quiz-data.ts는 하위 파일을 확장자 없이 import해 node로 직접 로드할 수
 * 없다(tests/search-index.test.ts에 같은 제약이 적혀 있다). 그래서 소스를
 * 정규식으로 읽는다.
 *
 * 실제로 발견된 문제: 정답만 자세히 쓰고 오답은 짧게 던져두는 패턴 때문에
 * 문제를 읽지 않고 가장 긴 보기만 골라도 맞는 퀴즈가 7개 있었다
 * (weather, security, real-estate-quiz, jobs, javascript, hacking,
 * finance-quiz — 모두 10문항 전부 정답이 최장). 오답을 정답과 비슷한 분량의
 * 그럴듯한 내용으로 바꿔 길이비를 3.49배에서 1.42배로 낮췄다.
 */

const LIB = join(import.meta.dirname, '..', 'lib');
const STR = String.raw`(?:'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)")`;

interface Q {
  slug: string;
  question: string;
  opts: string[];
  correct: number;
}

function loadQuestions(): Q[] {
  const out: Q[] = [];
  const files = readdirSync(LIB).filter(f => /^quiz-data-[a-z]+\.ts$/.test(f));
  for (const file of files) {
    const src = readFileSync(join(LIB, file), 'utf8');
    const blocks = src.matchAll(new RegExp(String.raw`slug: ${STR},([\s\S]*?)(?=\n    slug: |\n\];)`, 'g'));
    for (const b of blocks) {
      const slug = b[1] ?? b[2];
      const body = b[3];
      const qs = body.matchAll(new RegExp(String.raw`\{ q: ${STR}, opts: \[([\s\S]*?)\], correct: (\d+)`, 'g'));
      for (const q of qs) {
        const opts = [...q[3].matchAll(new RegExp(STR, 'g'))].map(m => m[1] ?? m[2]);
        out.push({ slug, question: q[1] ?? q[2], opts, correct: Number(q[4]) });
      }
    }
  }
  return out;
}

const QUESTIONS = loadQuestions();

test('퀴즈 문항이 수집된다', () => {
  assert.ok(QUESTIONS.length > 1000, `문항 수집 실패 (${QUESTIONS.length}개)`);
});

test('correct 인덱스가 보기 범위 안에 있다', () => {
  // 범위를 벗어나면 정답이 없는 문항이 되어 무엇을 골라도 오답 처리된다.
  const bad = QUESTIONS.filter(q => q.correct < 0 || q.correct >= q.opts.length)
    .map(q => `${q.slug}: ${q.question}`);
  assert.deepEqual(bad, [], `correct 범위 초과: ${bad.join(', ')}`);
});

test('보기에 같은 선택지가 두 번 나오지 않는다', () => {
  const bad = QUESTIONS.filter(q => new Set(q.opts).size !== q.opts.length)
    .map(q => `${q.slug}: ${q.question}`);
  assert.deepEqual(bad, [], `중복 선택지: ${bad.join(', ')}`);
});

test('정답 위치가 특정 번호에 쏠리지 않는다', () => {
  // 한 번호만 찍어도 점수가 나오면 퀴즈가 성립하지 않는다.
  const count = [0, 0, 0, 0];
  for (const q of QUESTIONS) if (q.correct < 4) count[q.correct]++;
  const total = count.reduce((a, b) => a + b, 0);
  for (const [i, n] of count.entries()) {
    const pct = (n / total) * 100;
    assert.ok(pct > 20 && pct < 30, `${i}번 정답 비율 ${pct.toFixed(1)}% — 25%에서 너무 벗어났다`);
  }
});

test('한 퀴즈 안에서 정답이 한 번호에 몰리지 않는다', () => {
  const bySlug = new Map<string, number[]>();
  for (const q of QUESTIONS) {
    const arr = bySlug.get(q.slug) ?? [];
    arr.push(q.correct);
    bySlug.set(q.slug, arr);
  }
  const bad: string[] = [];
  for (const [slug, corrects] of bySlug) {
    const c = new Map<number, number>();
    for (const x of corrects) c.set(x, (c.get(x) ?? 0) + 1);
    const top = Math.max(...c.values());
    if (top / corrects.length >= 0.6) bad.push(`${slug} (${top}/${corrects.length})`);
  }
  assert.deepEqual(bad, [], `정답이 한 번호에 60% 이상 몰린 퀴즈: ${bad.join(', ')}`);
});

test('정답만 유독 길어서 읽지 않고 고를 수 있는 퀴즈가 없다', () => {
  // 정답만 서술형으로 길게 쓰고 오답은 단어로 던져두면, 문제를 안 읽고
  // 가장 긴 보기를 고르는 것만으로 맞힐 수 있다. 한 퀴즈의 모든 문항에서
  // 정답이 최장이면 그 퀴즈는 통째로 그렇게 풀린다.
  const bySlug = new Map<string, Q[]>();
  for (const q of QUESTIONS) {
    const arr = bySlug.get(q.slug) ?? [];
    arr.push(q);
    bySlug.set(q.slug, arr);
  }
  const bad: string[] = [];
  for (const [slug, qs] of bySlug) {
    // 동점이면 "가장 긴 것"을 고를 수 없으니 편향으로 세지 않는다.
    // 정답이 나머지 모두보다 확실히 길 때만 그 전략이 통한다.
    const longest = qs.filter(q => {
      const len = q.opts[q.correct].length;
      return q.opts.every((o, i) => i === q.correct || o.length < len);
    }).length;
    if (longest === qs.length) bad.push(`${slug} (${longest}/${qs.length})`);
  }
  assert.deepEqual(bad, [], `모든 문항에서 정답이 가장 긴 보기인 퀴즈: ${bad.join(', ')}`);
});
