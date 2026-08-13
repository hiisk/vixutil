/**
 * 철근 배선 — 계산이 아니라 이어짐을 본다(계산은 rebar-weight.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 열 언어 문구는 튜플이라 칸이 채워졌는지만 tsc가 본다 — 빈 문자열이나 영어 원문이
 * 남아도 컴파일은 통과하므로, 여기서 값을 직접 센다. 소수점 기호까지 함께 본다:
 * es·pt·de·fr는 쉼표를 쓰는데 문장에 점이 남으면 표와 본문이 다른 얼굴이 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, REBAR_ICON, REBAR_SLUGS } from '../lib/rebar/list.ts';
import { rebarFacts } from '../lib/rebar/facts.ts';
import { REBAR_UI, barName, fmtNum } from '../lib/rebar/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/rebar/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

/** 문장 갈래를 두루 밟는 표본 — 가장 얇은 것, 가장 굵은 것, 널리 쓰는 것 */
const SHOWN = [
  rebarFacts({ d: 13, length: 6 }),
  rebarFacts({ d: 6, length: 1 }),
  rebarFacts({ d: 51, length: 12 }),
];

test('공사 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[REBAR_ICON], `${REBAR_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('등록부에 철근 두 줄이 있다 — 빠지면 아홉 언어에서 조용히 404다', () => {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(src.includes(`'rebar': () => import('./pages/rebar')`), 'STATIC_ROUTES에 rebar가 없다 — 아홉 언어 허브가 404다');
  assert.ok(src.includes(`'rebar': () => import('./pages/rebar__slug')`), 'SLUG_ROUTES에 rebar가 없다 — 아홉 언어 낱장이 404다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'rebar.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'rebar__slug.tsx')), '낱장 공유 모듈이 없다');
  // 한국어 낱장은 lib/ko/registry.ts가 부른다 — 빠지면 한국어에서만 404다
  const ko = readFileSync(join(ROOT, 'lib', 'ko', 'registry.ts'), 'utf8');
  assert.ok(ko.includes(`'rebar': () => import('./pages/rebar__slug')`), 'KO_LEAVES에 rebar가 없다 — 한국어 낱장이 404다');
});

test('사이트맵이 허브와 낱장 117칸을 열 언어로 내건다', () => {
  /*
   * 등록부와 사이트맵은 서로 모른다 — 한쪽에만 있으면 크롤러가 404를 받거나
   * 페이지가 색인에서 빠진다. 낱장 수는 데이터에서 세므로 칸을 늘리면 따라온다.
   */
  const src = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(src.includes(`from "@/lib/rebar/list"`), '사이트맵이 철근 목록을 안 불러온다');
  assert.match(src, /\/rebar`, changeFrequency: weekly, priority: 0\.85/, '허브 줄(우선순위 .85)이 없다');
  assert.match(src, /REBAR_CELLS\.map/, '낱장 줄이 없다 — 117칸이 사이트맵에서 빠진다');
  // 허브 1 + 낱장 117이 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(REBAR_SLUGS.length, 117);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + REBAR_SLUGS.length) * LANGS.length, 1180);
});

test('낱장 껍데기가 아홉 언어에 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'rebar', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13 두 번째 고침: ISR → CDN 캐시. 낱장은 동적으로 그리고 캐시는
       next.config의 headers()가 붙인 s-maxage로 CDN이 든다. 까닭은
       tests/prerender-budget.test.ts 머리말과 next.config.ts. */
    assert.ok(src.includes("export const dynamic = 'force-dynamic'"), `${lang} 낱장이 force-dynamic이 아니다 — ISR로 두면 크롤 한 바퀴에 쓰기 한도의 240~343%가 든다`);
  }
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'rebar', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('rebar');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('REBAR_SLUGS') || ko.includes('rebarParams'), '한국어 낱장이 철근 목록을 안 돌린다');
});

test('공유 카드 열쇠가 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('rebar'), `${lang} 카드 열쇠에 rebar가 없다 — 그 언어만 상위 카드를 물려받는다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'rebar': () => rebarHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다 — keys.ts와 어긋나 /og가 404다`);
  }
});

test('홈과 한국어 검색 색인이 철근을 건다', () => {
  // 홈에서 안 걸리면 낱장 1,170장이 사이트맵에만 있는 상태가 된다
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`href: '/rebar'`), '한국어 홈에 카드가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/rebar'`), '아홉 언어 홈에 카드가 없다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'rebar' as const`), '검색 색인에 철근 항목이 없다');
  assert.ok(idx.includes(`{ href: '/rebar',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/rebar:\s*\{ label:/.test(idx), 'SECTION_META에 철근 이름표가 없다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = SHOWN[0];
  for (const lang of LANG_CODES) {
    const ui = REBAR_UI[lang];
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
    // 셈의 전제 넷 — 밀도·공칭지름·곱셈·발주는 길게 밝혀야 한다
    assert.ok(ui.densityNote.length >= floor * 6, `${lang}: 밀도 설명이 짧다`);
    assert.ok(ui.nominalNote.length >= floor * 6, `${lang}: 공칭지름 설명이 짧다`);
    assert.ok(ui.countNote.length >= floor * 6, `${lang}: 총중량 설명이 짧다`);
    assert.ok(ui.orderNote.length >= floor * 6, `${lang}: 발주 설명이 짧다`);
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = REBAR_UI[lang];
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...ui.how,
    ...ui.hubFaq.flatMap(q => [q.q, q.a]),
    ...SHOWN.flatMap(f => [ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a])]),
  ];
};

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      if (lang !== 'ko') assert.ok(!/[가-힣]/.test(s), `${lang}: 한글이 섞였다 — ${s}`);
      if (lang !== 'ja') assert.ok(!/[ぁ-んァ-ヶ]/.test(s), `${lang}: 가나가 섞였다 — ${s}`);
      if (!HAN_OK.has(lang)) assert.ok(!/[一-龯]/.test(s), `${lang}: 한자가 섞였다 — ${s}`);
      if (lang !== 'hi') assert.ok(!/[ऀ-ॿ]/.test(s), `${lang}: 데바나가리가 섞였다 — ${s}`);
      const han = hanProblem(lang, s);
      assert.equal(han, '', `${lang}: ${han} — ${s}`);
    }
  }
});

test('소수점 기호가 언어를 따른다', () => {
  /*
   * 0.995와 0,995는 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   */
  assert.equal(fmtNum('de', 1.56), '1,56');
  assert.equal(fmtNum('fr', 0.995), '0,995');
  assert.equal(fmtNum('en', 1.56), '1.56');
  assert.equal(fmtNum('ko', 0.995), '0.995');
  assert.equal(fmtNum('hi', 12.7), '12.7');

  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      if (COMMA_LANGS.has(lang)) {
        assert.ok(!/\d\.\d/.test(s), `${lang}: 소수점이 점으로 남았다 — ${s}`);
      } else {
        assert.ok(!/\d,\d/.test(s), `${lang}: 숫자에 쉼표가 끼었다 — ${s}`);
      }
    }
  }
});

test('낱장 문장이 실제 숫자를 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = REBAR_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(n(f.perBar)), `${lang}: desc에 한 가닥 무게가 없다`);
      assert.ok(ui.desc(f).includes(n(f.unit)), `${lang}: desc에 단위중량이 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.perBar)), `${lang}: metaTitle에 무게가 없다`);
      assert.ok(ui.metaTitle(f).includes(barName(f.cell.d)), `${lang}: metaTitle에 규격이 없다`);
      assert.ok(ui.metaDesc(f).includes(n(f.area)), `${lang}: metaDesc에 단면적이 없다`);
      assert.ok(ui.metaDesc(f).includes(n(f.lapMetres)), `${lang}: metaDesc에 이음 길이가 없다`);
      // 호칭을 넣으면 나오는 틀린 값을 낱장 질문이 짚어 준다
      assert.ok(ui.cellFaq(f)[2].a.includes(n(f.nameUnit)), `${lang}: 낱장 질문에 호칭 값이 없다`);
    }
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = REBAR_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const c of CELLS) titles.push(ui.metaTitle(rebarFacts(c)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});
