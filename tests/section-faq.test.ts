import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { SECTION_FAQ } from '../lib/section-faq.ts';

const ROOT = join(import.meta.dirname, '..');
const APP = join(ROOT, 'app');
const pagePath = (route: string) => join(APP, route, 'page.tsx');

const routes = Object.keys(SECTION_FAQ);

/** crypto 섹션은 영어 페이지이므로 FAQ도 영어여야 한다. */
const ENGLISH_ROUTES = routes.filter(r => r === 'crypto' || r.startsWith('crypto/'));
const HANGUL = /[가-힣]/;

test('SECTION_FAQ의 모든 키에 대응하는 페이지가 있다', () => {
  const missing = routes.filter(r => !existsSync(pagePath(r)));
  assert.deepEqual(missing, [], `페이지 없는 FAQ 키: ${missing.join(', ')}`);
});

test('FAQ가 정의된 페이지는 실제로 FAQPage를 내보낸다', () => {
  // 데이터만 있고 페이지에 안 붙으면 FAQPage 구조화 데이터가 나가지 않는다.
  //
  // 소스에서 <Faq>를 찾는 대신 빌드 출력을 본다. 페이지가 클라이언트 컴포넌트에
  // 화면을 위임하면(계산기 허브가 그렇다) 소스만 봐서는 놓친다 — 정작 중요한 건
  // "실제로 나가는가"이므로 결과물을 확인하는 편이 정확하다.
  const OUT = join(ROOT, 'out');
  if (!existsSync(OUT)) return; // 빌드 전이면 건너뛴다

  const missing = routes.filter(r => {
    const html = join(OUT, `${r}.html`);
    if (!existsSync(html)) return true;
    return !readFileSync(html, 'utf8').includes('FAQPage');
  });
  assert.deepEqual(missing, [], `FAQPage가 안 나가는 페이지: ${missing.join(', ')}`);
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

test('항상 어두운 페이지는 tone="dark"로 렌더링한다', () => {
  // 밝은 FAQ 카드를 어두운 배경에 올리면 대비가 깨진다.
  //
  // 여기서 말하는 "어두운 페이지"는 다크모드가 아니라 크립토처럼 라이트 테마에서도
  // 항상 어두운 페이지다. 사이트 전체에 다크모드가 들어오면서 모든 페이지에
  // dark:bg-slate-9xx가 붙었으므로, dark: 접두어가 없는 것만 봐야 한다.
  for (const route of routes) {
    const src = readFileSync(pagePath(route), 'utf8');
    const root = src.match(/min-h-screen[^"`]*/)?.[0] ?? '';
    const alwaysDark = /(?<!dark:)bg-slate-9\d\d/.test(root);
    const usesDarkTone = /<Faq[^>]*tone="dark"/.test(src);
    assert.equal(usesDarkTone, alwaysDark, `${route}: 배경(항상 어두움=${alwaysDark})과 FAQ tone(dark=${usesDarkTone}) 불일치`);
  }
});
