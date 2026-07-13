import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SECTION_FAQ } from '../lib/section-faq.ts';

const APP = join(import.meta.dirname, '..', 'app');
const pagePath = (route: string) => join(APP, route, 'page.tsx');

const routes = Object.keys(SECTION_FAQ);

/** crypto 섹션은 영어 페이지이므로 FAQ도 영어여야 한다. */
const ENGLISH_ROUTES = routes.filter(r => r === 'crypto' || r.startsWith('crypto/'));
const HANGUL = /[가-힣]/;

test('SECTION_FAQ의 모든 키에 대응하는 페이지가 있다', () => {
  const missing = routes.filter(r => !existsSync(pagePath(r)));
  assert.deepEqual(missing, [], `페이지 없는 FAQ 키: ${missing.join(', ')}`);
});

test('FAQ가 정의된 페이지는 실제로 Faq를 렌더링한다', () => {
  // 데이터만 있고 페이지에 안 붙으면 FAQPage 구조화 데이터가 나가지 않는다.
  const unwired = routes.filter(r => {
    const src = readFileSync(pagePath(r), 'utf8');
    return !src.includes("from '@/components/Faq'") || !src.includes('<Faq');
  });
  assert.deepEqual(unwired, [], `Faq를 렌더링하지 않는 페이지: ${unwired.join(', ')}`);
});

test('FAQ 항목에 빈 질문·짧은 답변이 없다', () => {
  for (const [route, items] of Object.entries(SECTION_FAQ)) {
    for (const { q, a } of items) {
      assert.ok(q.trim().length > 0, `${route}: 빈 질문`);
      assert.ok(a.trim().length >= 20, `${route}: 답변이 너무 짧음 — "${q}"`);
    }
  }
});

test('한 페이지 안에 중복 질문이 없다', () => {
  for (const [route, items] of Object.entries(SECTION_FAQ)) {
    const qs = items.map(i => i.q);
    assert.equal(new Set(qs).size, qs.length, `${route}: 중복 질문 존재`);
  }
});

test('페이지당 FAQ가 2개 이상이다', () => {
  const thin = Object.entries(SECTION_FAQ).filter(([, i]) => i.length < 2).map(([r]) => r);
  assert.deepEqual(thin, [], `FAQ가 2개 미만: ${thin.join(', ')}`);
});

test('crypto 섹션 FAQ는 영어로 작성된다', () => {
  // 영어 페이지에 한국어 FAQ가 섞이면 페이지가 깨져 보인다.
  assert.ok(ENGLISH_ROUTES.length > 0, 'crypto 라우트를 찾지 못함');
  for (const route of ENGLISH_ROUTES) {
    for (const { q, a } of SECTION_FAQ[route]) {
      assert.ok(!HANGUL.test(q), `${route}: 질문에 한글 — "${q}"`);
      assert.ok(!HANGUL.test(a), `${route}: 답변에 한글 — "${q}"`);
    }
  }
});

test('한국어 섹션 FAQ에는 한글이 있다', () => {
  for (const route of routes.filter(r => !ENGLISH_ROUTES.includes(r))) {
    const joined = SECTION_FAQ[route].map(i => i.q + i.a).join('');
    assert.ok(HANGUL.test(joined), `${route}: 한글이 없음`);
  }
});

test('다크 테마 페이지는 tone="dark"로 렌더링한다', () => {
  // 밝은 FAQ 카드를 어두운 배경에 올리면 대비가 깨진다.
  for (const route of routes) {
    const src = readFileSync(pagePath(route), 'utf8');
    const isDark = /min-h-screen[^"]*bg-slate-9\d\d/.test(src);
    const usesDarkTone = /<Faq[^>]*tone="dark"/.test(src);
    assert.equal(usesDarkTone, isDark, `${route}: 배경(dark=${isDark})과 FAQ tone(dark=${usesDarkTone}) 불일치`);
  }
});
