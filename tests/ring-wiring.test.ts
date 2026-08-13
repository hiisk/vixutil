/**
 * 반지 사이즈 배선 — 계산이 아니라 이어짐을 본다(계산은 ring-size.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 문구 쪽은 따로 볼 것이 있다. `L<T>`는 열 칸이 채워졌는지까지만 보므로 **빈
 * 문자열이나 영어 원문이 그대로 남아도 tsc가 통과한다.** 그래서 값을 직접 세고,
 * 언어마다 남의 글자가 섞이지 않았는지도 훑는다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { BANDS, RING_ICON, RING_SLUGS } from '../lib/ring/list.ts';
import { ringFacts } from '../lib/ring/facts.ts';
import { RING_UI } from '../lib/ring/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

test('반지 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[RING_ICON], `${RING_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('등록부에 반지 두 줄이 있다 — 빠지면 아홉 언어에서 조용히 404다', () => {
  const src = readFileSync(join(ROOT, 'lib', 'fold', 'registry.ts'), 'utf8');
  assert.ok(src.includes(`'ring': () => import('./pages/ring')`), 'STATIC_ROUTES에 ring이 없다 — 아홉 언어 허브가 404다');
  assert.ok(src.includes(`'ring': () => import('./pages/ring__slug')`), 'SLUG_ROUTES에 ring이 없다 — 아홉 언어 낱장이 404다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'ring.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'ring__slug.tsx')), '낱장 공유 모듈이 없다');
});

test('사이트맵이 허브와 낱장 101칸을 열 언어로 내건다', () => {
  /*
   * 등록부와 사이트맵은 서로 모른다 — 한쪽에만 있으면 크롤러가 404를 받거나
   * 페이지가 색인에서 빠진다. 낱장 수는 데이터에서 세므로 칸을 늘리면 따라온다.
   */
  const src = readFileSync(join(ROOT, 'app', 'sitemap.ts'), 'utf8');
  assert.ok(src.includes(`from "@/lib/ring/list"`), '사이트맵이 반지 목록을 안 불러온다');
  assert.match(src, /\/ring`, changeFrequency: weekly, priority: 0\.85/, '허브 줄(우선순위 .85)이 없다');
  assert.match(src, /RING_CELLS\.map/, '낱장 줄이 없다 — 101칸이 사이트맵에서 빠진다');
  // 허브 1 + 낱장 101이 열 언어씩 — 낱장 수가 틀리면 목록 쪽이 깨진 것이다
  assert.equal(RING_SLUGS.length, 101);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + RING_SLUGS.length) * LANGS.length, 1020);
});

test('낱장 껍데기가 아홉 언어에 있고 제 언어로 부른다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'ring', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 낱장은 ISR이다. revalidate와 generateStaticParams가 **함께** 있어야 캐시가
       걸린다 — revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다.
       CDN 캐시만 쓰는 길은 2026-08-13에 배포해서 재 보고 접었다(proxy.ts 머리말). */
    assert.ok(/export const revalidate = false/.test(src), `${lang} 낱장이 revalidate = false가 아니다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다 — revalidate만으로는 안 걸린다`);
  }
  // 한국어는 접지 않는다 — 허브 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'ring', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * tests/prerender-budget.test.ts가 낱장 라우트 전부를 훑으며 지킨다.
   *
   * generateStaticParams는 여기서 본다. 디스패처가 이 표를 돌며 모아 쓰기 때문에,
   * 모듈에서 그것이 사라지면 굽는 손잡이가 그 갈래에서만 조용히 죽는다.
   */
  const ko = koLeafSrc('ring');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('RING_SLUGS') || ko.includes('ringParams'), '한국어 낱장이 반지 목록을 안 돌린다');
});

test('공유 카드 열쇠가 열 언어에 다 있다', () => {
  for (const lang of LANG_CODES) {
    assert.ok(CARD_KEYS[lang].includes('ring'), `${lang} 카드 열쇠에 ring이 없다 — 그 언어만 상위 카드를 물려받는다`);
    const src = readFileSync(join(ROOT, 'lib', 'og-cards', `${lang}.tsx`), 'utf8');
    assert.ok(src.includes(`'ring': () => ringHub('${lang}')`), `${lang}.tsx에 카드 본체가 없다 — keys.ts와 어긋나 /og가 404다`);
  }
});

test('홈과 한국어 검색 색인이 반지를 건다', () => {
  // 홈에서 안 걸리면 낱장 1,010장이 사이트맵에만 있는 상태가 된다
  const ko = readFileSync(join(ROOT, 'app', '(ko)', 'page.tsx'), 'utf8');
  assert.ok(ko.includes(`href: '/ring'`), '한국어 홈에 카드가 없다');
  const home = readFileSync(join(ROOT, 'lib', 'locale-home.ts'), 'utf8');
  assert.ok(home.includes(`route: '/ring'`), '아홉 언어 홈에 카드가 없다');
  const idx = readFileSync(join(ROOT, 'lib', 'search-index.ts'), 'utf8');
  assert.ok(idx.includes(`section: 'ring' as const`), '검색 색인에 반지 항목이 없다');
  assert.ok(idx.includes(`{ href: '/ring',`), '검색 색인에 허브 항목이 없다');
  assert.ok(/ring:\s*\{ label:/.test(idx), 'SECTION_META에 반지 이름표가 없다');
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = ringFacts(52);
  for (const lang of LANG_CODES) {
    const ui = RING_UI[lang];
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

    // 구간 이름은 짧은 낱말이라 하한을 따로 둔다 — 없으면 화면의 묶음 제목이 빈다
    assert.equal(ui.bandNames.length, BANDS.length, `${lang}: 구간 이름이 넷이 아니다`);
    for (const b of ui.bandNames) assert.ok(b.trim().length >= (DENSE.has(lang) ? 4 : 7), `${lang}: 구간 이름이 짧다 — ${b}`);
    assert.equal(new Set(ui.bandNames).size, BANDS.length, `${lang}: 구간 이름이 겹친다`);

    /*
     * 셈의 전제 넷은 길게 밝혀야 한다. 특히 ukNote는 **없는 것을 왜 없앴는지**를
     * 적는 자리라, 짧아지면 읽는 사람은 우리가 잊은 줄 안다.
     */
    assert.ok(ui.ruleNote.length >= floor * 6, `${lang}: 규칙 설명이 짧다`);
    assert.ok(ui.usNote.length >= floor * 6, `${lang}: 미국 규격 설명이 짧다`);
    assert.ok(ui.jpNote.length >= floor * 6, `${lang}: 호수 설명이 짧다`);
    assert.ok(ui.isoNote.length >= floor * 5, `${lang}: EU 설명이 짧다`);
    assert.ok(ui.ukNote.length >= floor * 6, `${lang}: 영국 표기를 뺀 까닭이 짧다`);
    assert.ok(ui.measureNote.length >= floor * 6, `${lang}: 재는 법 설명이 짧다`);
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 독일어와 프랑스어, 두 중국어가 같아지기 쉽다. 제목이 겹치면 열 장이 서로
   * 중복 페이지가 된다.
   *
   * 짧은 이름표(section·isoLabel 같은 것)는 뺀다 — 'EU · ISO 8653'은 규격 이름이라
   * 여러 언어에서 같은 것이 옳고, 억지로 다르게 적으면 그게 오역이다.
   */
  const f = ringFacts(52);
  for (const key of ['hubTitle', 'hubMetaTitle'] as const) {
    const seen = new Map<string, string>();
    for (const lang of LANG_CODES) {
      const v = RING_UI[lang][key];
      const prev = seen.get(v);
      assert.equal(prev, undefined, `${key}: ${lang}과 ${prev}가 같다 — ${v}`);
      seen.set(v, lang);
    }
  }
  for (const key of ['metaTitle', 'metaDesc', 'desc'] as const) {
    const seen = new Map<string, string>();
    for (const lang of LANG_CODES) {
      const v = RING_UI[lang][key](f);
      const prev = seen.get(v);
      assert.equal(prev, undefined, `${key}: ${lang}과 ${prev}가 같다 — ${v}`);
      seen.set(v, lang);
    }
  }
});

test('언어끼리 글자가 섞이지 않는다', () => {
  const HAN_OK = new Set(['ja', 'zh', 'tw']);
  // 네 구간을 모두 밟는다 — 구간 이름이 문장에 들어가는 갈래가 있다
  const shown = [ringFacts(42), ringFacts(52), ringFacts(69.5), ringFacts(90)];
  for (const lang of LANG_CODES) {
    const ui = RING_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how,
      ...ui.bandNames,
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

test('화면 문구에 이모지가 없다', () => {
  /*
   * 공유 카드가 이모지를 걷어내므로, 문구에 섞여 있으면 카드에서 글자가 사라진다.
   * 섹션 아이콘 하나(list.ts의 RING_ICON)만 쓴다.
   */
  const f = ringFacts(52);
  const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/u;
  for (const lang of LANG_CODES) {
    const ui = RING_UI[lang];
    const strings = [
      ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
      ...ui.how, ...ui.bandNames,
      ...ui.hubFaq.flatMap(q => [q.q, q.a]),
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a]),
    ];
    for (const s of strings) assert.ok(!EMOJI.test(s), `${lang}: 이모지가 섞였다 — ${s}`);
  }
});

test('낱장 문장이 실제 숫자를 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = RING_UI[lang];
    for (const mm of [52, 61.5]) {
      const f = ringFacts(mm);
      assert.ok(ui.desc(f).includes(String(f.mm)), `${lang}: desc에 내주가 없다`);
      assert.ok(ui.desc(f).includes(String(f.usHalf)), `${lang}: desc에 미국 사이즈가 없다`);
      assert.ok(ui.metaTitle(f).includes(String(f.mm)), `${lang}: metaTitle에 내주가 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.diameter)), `${lang}: metaDesc에 지름이 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.usHalfMm)), `${lang}: metaDesc에 반 사이즈의 내주가 없다`);
    }
    assert.notEqual(ui.desc(ringFacts(52)), ui.desc(ringFacts(61.5)), lang);
    // 구간 이름이 낱장 문답에 실제로 들어간다 — 양 끝이 무엇인지 밝히는 자리다
    const thumb = ringFacts(90);
    assert.ok(
      ui.cellFaq(thumb)[2].a.includes(ui.bandNames[thumb.band]),
      `${lang}: 엄지 구간 낱장이 구간 이름을 안 적는다`,
    );
  }
});
