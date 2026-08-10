/**
 * 필라멘트 배선 — 계산이 아니라 이어짐을 본다(계산은 filament-length.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { FILAMENT_ICON, FILAMENT_SLUGS } from '../lib/filament/list.ts';
import { filamentFacts } from '../lib/filament/facts.ts';
import { FILAMENT_UI } from '../lib/filament/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

test('실 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[FILAMENT_ICON], `${FILAMENT_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('등록부에 필라멘트 두 줄이 있다 — 빠지면 아홉 언어에서 조용히 404다', () => {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(src.includes(`'filament': () => import('./pages/filament')`), 'STATIC_ROUTES에 filament가 없다 — 아홉 언어 허브가 404다');
  assert.ok(src.includes(`'filament': () => import('./pages/filament__slug')`), 'SLUG_ROUTES에 filament가 없다 — 아홉 언어 낱장이 404다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'filament.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'filament__slug.tsx')), '낱장 공유 모듈이 없다');
});

test('사이트맵이 허브와 낱장 48칸을 열 언어로 내건다', () => {
  /*
   * 등록부와 사이트맵은 서로 모른다 — 한쪽에만 있으면 크롤러가 404를 받거나
   * 페이지가 색인에서 빠진다. 낱장 수는 데이터에서 세므로 칸을 늘리면 따라온다.
   */
  const src = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(src.includes(`from "@/lib/filament/list"`), '사이트맵이 필라멘트 목록을 안 불러온다');
  assert.match(src, /\/filament`, changeFrequency: weekly, priority: 0\.85/, '허브 줄(우선순위 .85)이 없다');
  assert.match(src, /FILAMENT_CELLS\.map/, '낱장 줄이 없다 — 48칸이 사이트맵에서 빠진다');
  // 허브 1 + 낱장 48이 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(FILAMENT_SLUGS.length, 48);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + FILAMENT_SLUGS.length) * LANGS.length, 490);
});

test('낱장 껍데기가 아홉 언어에 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'filament', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    assert.ok(src.includes(`export const dynamic = 'force-dynamic'`), `${lang} 낱장에 force-dynamic이 없다 — ISR 쓰기가 새어 나간다`);
  }
  // 한국어는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'filament', 'page.tsx')), '한국어 허브가 없다');
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'filament', '[slug]', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`export const dynamic = 'force-dynamic'`), '한국어 낱장에 force-dynamic이 없다');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
});

test('공유 카드 열쇠가 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('filament'), `${lang} 카드 열쇠에 filament가 없다 — 그 언어만 상위 카드를 물려받는다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'filament': () => filamentHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다 — keys.ts와 어긋나 /og가 404다`);
  }
});

test('홈과 한국어 검색 색인이 필라멘트를 건다', () => {
  // 홈에서 안 걸리면 낱장 480장이 사이트맵에만 있는 상태가 된다
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`href: '/filament'`), '한국어 홈에 카드가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/filament'`), '아홉 언어 홈에 카드가 없다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'filament' as const`), '검색 색인에 필라멘트 항목이 없다');
  assert.ok(idx.includes(`{ href: '/filament',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/filament:\s*\{ label:/.test(idx), 'SECTION_META에 필라멘트 이름표가 없다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = filamentFacts({ material: 'pla', grams: 1000 });
  for (const lang of LANG_CODES) {
    const ui = FILAMENT_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 셈의 전제 둘 — 밀도가 길이를 정하는 것과 순 무게라는 것은 길게 밝혀야 한다
    assert.ok(ui.densityNote.length >= floor * 6, `${lang}: 밀도 설명이 짧다`);
    assert.ok(ui.netNote.length >= floor * 6, `${lang}: 순 무게 설명이 짧다`);
    assert.ok(ui.remainNote.length >= floor * 6, `${lang}: 남은 길이 설명이 짧다`);
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  // 가벼운 재료·무거운 재료·끝 칸 — 문장 갈래를 모두 밟는다
  const shown = [
    filamentFacts({ material: 'pla', grams: 1000 }),
    filamentFacts({ material: 'abs', grams: 250 }),
    filamentFacts({ material: 'petg', grams: 3000 }),
  ];
  for (const lang of LANG_CODES) {
    const ui = FILAMENT_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ...shown.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
        ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
    ];
    for (const s of strings) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('낱장 문장이 실제 숫자를 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = FILAMENT_UI[lang];
    for (const c of [{ material: 'pla', grams: 1000 }, { material: 'abs', grams: 500 }]) {
      const f = filamentFacts(c);
      const d = f.diameters[0];
      assert.ok(ui.desc(f).includes(String(d.metres)), `${lang}: desc에 길이가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(d.metres)), `${lang}: metaTitle에 길이가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.volume)), `${lang}: metaDesc에 부피가 없다`);
    }
    assert.notEqual(
      ui.desc(filamentFacts({ material: 'pla', grams: 1000 })),
      ui.desc(filamentFacts({ material: 'abs', grams: 500 })),
      lang,
    );
  }
});
