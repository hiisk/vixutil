/**
 * 한국어를 뺀 아홉 언어 심리테스트 검사.
 *
 * 전에는 영어 하나만 봤고, 중국어를 걷어내면서 남은 빈 test() 두 개가 아무것도
 * 검사하지 않은 채 초록으로 세어지고 있었다. 아홉 언어로 넓히면서 그것도 지웠다.
 *
 * 점수·구간은 언어와 무관하게 같아야 한다 — 어긋나면 같은 답을 골라도 언어마다
 * 다른 결과가 나온다. 글자는 언어마다 달라야 한다 — 같으면 옮기다 만 것이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { TESTS_INTL, TESTS_INTL_MAP, type TestIntlLang } from '../lib/test-l10n/index.ts';
import { hanProblem } from './han.ts';
import type { Test } from '../lib/types.ts';

const SETS = Object.entries(TESTS_INTL) as [TestIntlLang, Test[]][];

/** 그 테스트에서 사람 눈에 보이는 문자열을 전부 모은다 */
function textOf(t: Test): string[] {
  return [
    t.title, t.desc, t.category,
    ...t.questions.flatMap(q => [q.q, ...q.opts.map(o => o.text)]),
    ...t.results.flatMap(r => [r.title, r.desc, ...(r.traits ?? [])]),
  ];
}

test('slug가 유일하고 형식이 맞다', () => {
  for (const [label, list] of SETS) {
    const slugs = list.map(t => t.slug);
    assert.equal(new Set(slugs).size, slugs.length, `${label}: 중복 slug`);
    for (const s of slugs) assert.match(s, /^[a-z0-9-]+$/, `${label}: 잘못된 slug ${s}`);
  }
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
  // 글자가 촘촘한 언어는 같은 내용이 짧게 적히므로 기준을 따로 둔다
  const DENSE = new Set<TestIntlLang>(['ja', 'zh-hans', 'zh-hant']);
  for (const [label, list] of SETS) {
    const floor = DENSE.has(label) ? 25 : 40;
    for (const t of list) {
      assert.ok(t.results.length >= 3, `${label} ${t.slug}: 결과가 ${t.results.length}개뿐`);
      for (const r of t.results) {
        assert.ok(r.title.trim().length > 0, `${label} ${t.slug}: 결과 제목 없음`);
        assert.ok(r.desc.trim().length >= floor, `${label} ${t.slug}/${r.title}: 설명이 너무 짧다`);
        assert.ok(r.traits && r.traits.length >= 3, `${label} ${t.slug}/${r.title}: 특징이 부족하다`);
      }
    }
  }
});

test('한글이 남아 있지 않다', () => {
  const hangul = /[가-힣]/;
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    for (const t of list) {
      for (const s of textOf(t)) if (hangul.test(s)) bad.push(`${label} ${t.slug}: ${s.slice(0, 40)}`);
    }
  }
  assert.deepEqual(bad, [], `한국어에서 옮기다 만 자리:\n  ${bad.join('\n  ')}`);
});

test('번체 자리에 간체가 섞이지 않았다', () => {
  // 간체를 그대로 두면 뜻은 통해도 대만·홍콩 사람에게는 남의 글자로 읽힌다
  const bad: string[] = [];
  for (const [label, list] of SETS) {
    const key = label === 'zh-hant' ? 'tw' : label === 'zh-hans' ? 'zh' : null;
    if (!key) continue;
    for (const t of list) {
      for (const s of textOf(t)) {
        const p = hanProblem(key, s);
        if (p) bad.push(`${label} ${t.slug}: ${p}`);
      }
    }
  }
  assert.deepEqual(bad, [], `글자가 섞인 자리:\n  ${bad.join('\n  ')}`);
});

test('같은 slug끼리 문항 수와 점수 구조가 일치한다', () => {
  // 어긋나면 같은 답을 골라도 언어별로 다른 결과가 나온다
  for (const en of TESTS_INTL.en) {
    const shape = en.questions.map(q => q.opts.map(o => o.score).join(','));
    for (const [label, list] of SETS) {
      if (label === 'en') continue;
      const t = list.find(x => x.slug === en.slug);
      assert.ok(t, `${label}: ${en.slug}가 없다`);
      assert.deepEqual(
        t.questions.map(q => q.opts.map(o => o.score).join(',')), shape,
        `${label} ${en.slug}: 점수 배치가 영어와 다르다`,
      );
      assert.deepEqual(
        t.results.map(r => [r.min, r.max]), en.results.map(r => [r.min, r.max]),
        `${label} ${en.slug}: 결과 구간이 영어와 다르다`,
      );
    }
  }
});

test('MAP이 모든 테스트를 담고 있다', () => {
  for (const [label, list] of SETS) {
    for (const t of list) assert.equal(TESTS_INTL_MAP[label][t.slug], t, `${label}: 맵에 없음 ${t.slug}`);
  }
});
