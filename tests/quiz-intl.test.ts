/**
 * 한국어를 뺀 아홉 언어 퀴즈 검사.
 *
 * 전에는 영어 하나만 봤고, 중국어를 걷어내면서 남은 빈 test() 하나가
 * 아무것도 검사하지 않은 채 초록으로 세어지고 있었다. 아홉 언어로 넓히면서
 * 그것도 지웠다.
 *
 * correct는 opts의 **번호**다. 번역하면서 보기 순서를 바꾸면 정답이 조용히
 * 다른 보기를 가리킨다 — 화면도 멀쩡하고 타입도 통과한다. 그래서 아홉 언어의
 * correct 배열이 영어와 같은지 직접 맞춰 본다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { QUIZZES_INTL, QUIZZES_INTL_MAP, type QuizIntlLang } from '../lib/quiz-l10n/index.ts';
import { hanProblem } from './han.ts';
import type { Quiz } from '../lib/types.ts';

const SETS = Object.entries(QUIZZES_INTL) as [QuizIntlLang, Quiz[]][];

/** 그 퀴즈에서 사람 눈에 보이는 문자열을 전부 모은다 */
function textOf(q: Quiz): string[] {
  return [q.title, q.desc, q.category,
    ...q.questions.flatMap(x => [x.q, ...x.opts, x.explanation ?? ''])];
}

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
  for (const [label, list] of SETS) {
    for (const q of list) assert.equal(QUIZZES_INTL_MAP[label][q.slug], q, `${label}: 맵에 없음 ${q.slug}`);
  }
});

test('아홉 언어가 같은 여섯 종을 가진다', () => {
  const en = QUIZZES_INTL.en.map(q => q.slug).sort();
  for (const [label, list] of SETS) {
    assert.deepEqual(list.map(q => q.slug).sort(), en, `${label}의 슬러그가 영어와 다르다`);
  }
});

test('정답 번호와 문항 수가 아홉 언어에서 같다', () => {
  // 보기 순서를 바꾸면 correct가 다른 보기를 가리킨다 — 조용히 틀린다
  for (const en of QUIZZES_INTL.en) {
    const shape = en.questions.map(q => q.correct);
    for (const [label, list] of SETS) {
      if (label === 'en') continue;
      const q = list.find(x => x.slug === en.slug);
      assert.ok(q, `${label}: ${en.slug}가 없다`);
      assert.deepEqual(q.questions.map(x => x.correct), shape, `${label} ${en.slug}: 정답 번호가 영어와 다르다`);
    }
  }
});

test('번역이 영어를 그대로 물려받지 않는다', () => {
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    if (label === 'en') continue;
    for (const q of list) {
      const en = QUIZZES_INTL.en.find(e => e.slug === q.slug)!;
      if (q.title === en.title && q.desc === en.desc) bad.push(`${label}/${q.slug}`);
    }
  }
  assert.deepEqual(bad, [], `영어 그대로인 항목:\n  ${bad.join('\n  ')}`);
});

test('번체 자리에 간체가 섞이지 않았다', () => {
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    const key = label === 'zh-hant' ? 'tw' : label === 'zh-hans' ? 'zh' : null;
    if (!key) continue;
    for (const q of list) {
      for (const s of textOf(q)) {
        const p = hanProblem(key, s);
        if (p) bad.push(`${label} ${q.slug}: ${p}`);
      }
    }
  }
  assert.deepEqual(bad, [], `글자가 섞인 자리:\n  ${bad.join('\n  ')}`);
});
