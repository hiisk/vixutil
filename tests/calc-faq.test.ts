import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { CALC_FAQ } from '../lib/calc-faq.ts';

const CALC_DIR = join(import.meta.dirname, '..', 'app', 'calculator');

/** FAQ 대상이 아닌 경로 — 계산기가 아니라 색인·로컬라이즈 랜딩 페이지다. */
const NOT_A_CALCULATOR = new Set(['en', 'ja']);

/** app/calculator 아래 page.tsx가 있는 실제 계산기 slug를 파일시스템에서 수집한다. */
function calculatorSlugs(dir = CALC_DIR, prefix = ''): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const slug = prefix ? `${prefix}/${entry.name}` : entry.name;
    const children = readdirSync(join(dir, entry.name), { withFileTypes: true });
    if (children.some(c => c.isFile() && c.name === 'page.tsx')) out.push(slug);
    if (children.some(c => c.isDirectory())) out.push(...calculatorSlugs(join(dir, entry.name), slug));
  }
  return out;
}

const slugs = calculatorSlugs().filter(s => !NOT_A_CALCULATOR.has(s));

test('계산기 페이지가 하나라도 수집된다', () => {
  assert.ok(slugs.length > 50, `계산기 slug 수집 실패 (${slugs.length}개)`);
});

test('모든 계산기에 FAQ가 있다', () => {
  const missing = slugs.filter(s => !CALC_FAQ[s]?.length);
  assert.deepEqual(missing, [], `FAQ 없는 계산기: ${missing.join(', ')}`);
});

test('FAQ 키가 실제 계산기 경로와 일치한다', () => {
  const known = new Set(slugs);
  const orphans = Object.keys(CALC_FAQ).filter(k => !known.has(k));
  assert.deepEqual(orphans, [], `대응 페이지가 없는 FAQ 키: ${orphans.join(', ')}`);
});

test('FAQ 항목에 빈 질문·답변이 없다', () => {
  for (const [slug, items] of Object.entries(CALC_FAQ)) {
    for (const { q, a } of items) {
      assert.ok(q.trim().length > 0, `${slug}: 빈 질문`);
      assert.ok(a.trim().length >= 20, `${slug}: 답변이 너무 짧음 — "${q}"`);
    }
  }
});

test('한 계산기 안에 중복 질문이 없다', () => {
  for (const [slug, items] of Object.entries(CALC_FAQ)) {
    const qs = items.map(i => i.q);
    assert.equal(new Set(qs).size, qs.length, `${slug}: 중복 질문 존재`);
  }
});

test('FAQ는 계산기당 2개 이상이다', () => {
  // FAQPage 구조화 데이터는 항목이 하나뿐이면 리치 결과로 노출될 가치가 떨어진다.
  const thin = Object.entries(CALC_FAQ).filter(([, items]) => items.length < 2).map(([s]) => s);
  assert.deepEqual(thin, [], `FAQ가 2개 미만인 계산기: ${thin.join(', ')}`);
});
