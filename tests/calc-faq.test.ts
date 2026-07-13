import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
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

test('모든 계산기가 카탈로그와 사이트맵에 등록돼 있다', async () => {
  // 카탈로그에 없으면 인덱스와 "관련 계산기"에서 안 보이고,
  // 사이트맵에 없으면 검색엔진이 찾아오지 못한다. 새 계산기를 만들고
  // 등록을 빠뜨리면 아무도 그 페이지에 닿지 못한다.
  const catalog = readFileSync(join(import.meta.dirname, '..', 'lib', 'calculator-catalog.ts'), 'utf8');
  const sitemap = readFileSync(join(import.meta.dirname, '..', 'app', 'sitemap.ts'), 'utf8');

  // 개발자 도구는 별도 목록(devRoutes)으로 관리되고 카탈로그에도 들어 있다.
  const missingFromCatalog = slugs.filter(s => !catalog.includes(`/calculator/${s}'`));
  const missingFromSitemap = slugs.filter(s => !sitemap.includes(`/calculator/${s}"`));

  assert.deepEqual(missingFromCatalog, [], `카탈로그 누락: ${missingFromCatalog.join(', ')}`);
  assert.deepEqual(missingFromSitemap, [], `사이트맵 누락: ${missingFromSitemap.join(', ')}`);
});

test('모든 계산기가 고유한 title/description 메타데이터를 갖는다', () => {
  // 계산기 페이지는 'use client'라 metadata를 직접 export할 수 없다.
  // layout.tsx가 없으면 title이 사이트 기본값으로 나가고, 검색 결과에서
  // 다른 계산기와 구분되지 않는다. 온페이지 SEO에서 가장 큰 손실이다.
  const missing = slugs.filter(s => {
    const layout = join(CALC_DIR, s, 'layout.tsx');
    if (!existsSync(layout)) return true;
    const src = readFileSync(layout, 'utf8');
    return !src.includes('title:') || !src.includes('description:');
  });
  assert.deepEqual(missing, [], `layout.tsx 메타데이터 누락: ${missing.join(', ')}`);
});

test('FAQ는 계산기당 2개 이상이다', () => {
  // FAQPage 구조화 데이터는 항목이 하나뿐이면 리치 결과로 노출될 가치가 떨어진다.
  const thin = Object.entries(CALC_FAQ).filter(([, items]) => items.length < 2).map(([s]) => s);
  assert.deepEqual(thin, [], `FAQ가 2개 미만인 계산기: ${thin.join(', ')}`);
});
