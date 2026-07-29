import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TESTS_EN, TESTS_EN_MAP } from '../lib/test-en.ts';
import { TESTS_ZH, TESTS_ZH_MAP } from '../lib/test-zh.ts';

const SETS = [
  ['en', TESTS_EN, TESTS_EN_MAP],
  ['zh', TESTS_ZH, TESTS_ZH_MAP],
] as const;

test('en·zh 테스트가 같은 slug 집합을 갖는다', () => {
  assert.deepEqual(TESTS_ZH.map(t => t.slug).sort(), TESTS_EN.map(t => t.slug).sort());
});

test('결과 구간이 0점부터 만점까지 빈틈없이 이어진다', () => {
  // 구간이 비면 그 점수를 받은 사람에게 보여줄 결과가 없어 화면이 비어버린다
  for (const [label, list] of SETS) {
    for (const t of list) {
      const maxScore = t.questions.reduce((s, q) => s + Math.max(...q.opts.map(o => o.score)), 0);
      const sorted = [...t.results].sort((a, b) => a.min - b.min);
      assert.equal(sorted[0].min, 0, `${label} ${t.slug}: 첫 구간이 0에서 시작하지 않는다`);
      for (let i = 1; i < sorted.length; i++) {
        assert.equal(
          sorted[i].min, sorted[i - 1].max + 1,
          `${label} ${t.slug}: ${sorted[i - 1].max}점과 ${sorted[i].min}점 사이가 비었거나 겹친다`,
        );
      }
      assert.ok(
        sorted[sorted.length - 1].max >= maxScore,
        `${label} ${t.slug}: 만점 ${maxScore}점이 마지막 구간(${sorted[sorted.length - 1].max})을 넘는다`,
      );
    }
  }
});

test('모든 점수에 대응하는 결과가 정확히 하나씩 있다', () => {
  for (const [label, list] of SETS) {
    for (const t of list) {
      const maxScore = t.questions.reduce((s, q) => s + Math.max(...q.opts.map(o => o.score)), 0);
      for (let score = 0; score <= maxScore; score++) {
        const hits = t.results.filter(r => score >= r.min && score <= r.max);
        assert.equal(hits.length, 1, `${label} ${t.slug}: ${score}점에 해당하는 결과가 ${hits.length}개`);
      }
    }
  }
});

test('문항·선택지 구조가 갖춰져 있다', () => {
  for (const [label, list] of SETS) {
    for (const t of list) {
      assert.ok(t.questions.length >= 8, `${label} ${t.slug}: 문항이 ${t.questions.length}개뿐`);
      for (const [i, q] of t.questions.entries()) {
        assert.ok(q.q.trim().length > 0, `${label} ${t.slug} ${i + 1}번: 빈 문항`);
        assert.ok(q.opts.length >= 2, `${label} ${t.slug} ${i + 1}번: 선택지가 부족하다`);
        assert.equal(new Set(q.opts.map(o => o.text)).size, q.opts.length, `${label} ${t.slug} ${i + 1}번: 선택지 중복`);
        for (const o of q.opts) {
          assert.ok(o.text.trim().length > 0, `${label} ${t.slug} ${i + 1}번: 빈 선택지`);
          assert.ok(Number.isInteger(o.score) && o.score >= 0, `${label} ${t.slug} ${i + 1}번: 점수가 이상하다`);
        }
      }
    }
  }
});

test('결과마다 제목·설명·특징이 있다', () => {
  for (const [label, list] of SETS) {
    for (const t of list) {
      assert.ok(t.results.length >= 3, `${label} ${t.slug}: 결과가 ${t.results.length}개뿐`);
      for (const r of t.results) {
        assert.ok(r.title.trim().length > 0, `${label} ${t.slug}: 결과 제목 없음`);
        assert.ok(r.desc.trim().length >= 40, `${label} ${t.slug}/${r.title}: 설명이 너무 짧다`);
        assert.ok(r.traits && r.traits.length >= 3, `${label} ${t.slug}/${r.title}: 특징이 부족하다`);
      }
    }
  }
});

test('한글이 남아 있지 않다', () => {
  const hangul = /[가-힣]/;
  for (const [label, list] of SETS) {
    for (const t of list) {
      assert.ok(!hangul.test(t.title + t.desc + t.category), `${label} ${t.slug}: 메타에 한글`);
      for (const q of t.questions) {
        assert.ok(!hangul.test(q.q + q.opts.map(o => o.text).join('')), `${label} ${t.slug}: 문항에 한글`);
      }
      for (const r of t.results) {
        assert.ok(!hangul.test(r.title + r.desc + (r.traits ?? []).join('')), `${label} ${t.slug}: 결과에 한글`);
      }
    }
  }
});

test('en·zh 같은 slug끼리 문항 수와 점수 구조가 일치한다', () => {
  // 어긋나면 같은 답을 골라도 언어별로 다른 결과가 나온다
  for (const en of TESTS_EN) {
    const zh = TESTS_ZH_MAP[en.slug];
    assert.equal(zh.questions.length, en.questions.length, `${en.slug}: 문항 수가 다르다`);
    assert.equal(zh.results.length, en.results.length, `${en.slug}: 결과 수가 다르다`);
    for (let i = 0; i < en.questions.length; i++) {
      assert.deepEqual(
        zh.questions[i].opts.map(o => o.score),
        en.questions[i].opts.map(o => o.score),
        `${en.slug} ${i + 1}번: 점수 배열이 다르다`,
      );
    }
  }
});

test('MAP이 모든 테스트를 담고 있다', () => {
  for (const [label, list, map] of SETS) {
    for (const t of list) assert.equal(map[t.slug], t, `${label}: 맵에 없음 ${t.slug}`);
  }
});
