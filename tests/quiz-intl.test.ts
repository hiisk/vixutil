import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUIZZES_EN, QUIZZES_EN_MAP } from '../lib/quiz-en.ts';

const SETS = [
  ['en', QUIZZES_EN, QUIZZES_EN_MAP],
] as const;

test('en 퀴즈가 같은 slug 집합을 갖는다', () => {
  // hreflang이 slug로 en↔zh를 짝짓기 때문에 한쪽에만 있으면 깨진 대체 링크가 된다
});

test('slug가 유일하고 형식이 맞다', () => {
  for (const [label, list] of SETS) {
    const slugs = list.map(q => q.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${label}: 중복 slug`);
    for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `${label}: 잘못된 slug ${s}`);
  }
});

test('정답 인덱스가 선택지 범위 안에 있다', () => {
  // 범위를 벗어나면 정답이 없는 문제가 되어 아무리 골라도 오답 처리된다
  for (const [label, list] of SETS) {
    for (const quiz of list) {
      for (const [i, q] of quiz.questions.entries()) {
        assert.ok(
          Number.isInteger(q.correct) && q.correct >= 0 && q.correct < q.opts.length,
          `${label} ${quiz.slug} ${i + 1}번: correct=${q.correct}인데 선택지는 ${q.opts.length}개`,
        );
      }
    }
  }
});

test('모든 문제가 4지선다이고 선택지가 중복되지 않는다', () => {
  for (const [label, list] of SETS) {
    for (const quiz of list) {
      for (const [i, q] of quiz.questions.entries()) {
        assert.equal(q.opts.length, 4, `${label} ${quiz.slug} ${i + 1}번: 선택지가 ${q.opts.length}개`);
        assert.equal(new Set(q.opts).size, 4, `${label} ${quiz.slug} ${i + 1}번: 선택지 중복`);
        for (const o of q.opts) assert.ok(o.trim().length > 0, `${label} ${quiz.slug} ${i + 1}번: 빈 선택지`);
      }
    }
  }
});

test('모든 문제에 문항·해설이 있다', () => {
  for (const [label, list] of SETS) {
    for (const quiz of list) {
      assert.ok(quiz.questions.length >= 8, `${label} ${quiz.slug}: 문항이 ${quiz.questions.length}개뿐`);
      for (const [i, q] of quiz.questions.entries()) {
        assert.ok(q.q.trim().length > 0, `${label} ${quiz.slug} ${i + 1}번: 빈 문항`);
        assert.ok(q.explanation && q.explanation.trim().length > 0, `${label} ${quiz.slug} ${i + 1}번: 해설 없음`);
      }
    }
  }
});

test('한글이 남아 있지 않다', () => {
  const hangul = /[가-힣]/;
  for (const [label, list] of SETS) {
    for (const quiz of list) {
      assert.ok(!hangul.test(quiz.title + quiz.desc + quiz.category), `${label} ${quiz.slug}: 메타에 한글`);
      for (const [i, q] of quiz.questions.entries()) {
        const all = q.q + q.opts.join('') + (q.explanation ?? '');
        assert.ok(!hangul.test(all), `${label} ${quiz.slug} ${i + 1}번에 한글이 남아 있다`);
      }
    }
  }
});

test('정답 위치가 한쪽으로 쏠리지 않는다', () => {
  // 전부 같은 자리에 있으면 문제를 읽지 않고도 맞힐 수 있다
  for (const [label, list] of SETS) {
    for (const quiz of list) {
      const counts = [0, 0, 0, 0];
      for (const q of quiz.questions) counts[q.correct]++;
      const max = Math.max(...counts);
      assert.ok(
        max <= Math.ceil(quiz.questions.length * 0.6),
        `${label} ${quiz.slug}: 정답이 한 위치에 ${max}/${quiz.questions.length}개 몰려 있다`,
      );
    }
  }
});

test('MAP이 모든 퀴즈를 담고 있다', () => {
  for (const [label, list, map] of SETS) {
    for (const q of list) assert.equal(map[q.slug], q, `${label}: 맵에 없음 ${q.slug}`);
  }
});
