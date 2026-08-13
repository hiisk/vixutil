/**
 * 강재 배선 — 계산이 아니라 이어짐을 본다(계산은 steel-weight.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 껍데기·공유 모듈·문구가
 * 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 열 언어 문구는 튜플이라 칸이 채워졌는지만 tsc가 본다 — 빈 문자열이나 영어 원문이
 * 남아도 컴파일은 통과하므로, 여기서 값을 직접 센다. 소수점 기호까지 함께 본다:
 * es·pt·de·fr는 쉼표를 쓰는데 문장에 점이 남으면 표와 본문이 다른 얼굴이 된다.
 *
 * ── 아직 여기 없는 검사 (배선이 남았다) ─────────────────────
 * 아래 여섯 곳은 이 섹션이 배선되면 그때 이 파일에 함께 들어와야 한다. 지금 넣으면
 * 배선이 안 된 상태라 빨갛게 뜨므로, **넣을 줄을 적어 둔다** — 배선하는 커밋에서
 * 같이 붙이면 그 뒤로는 한 줄이 빠지는 것을 이 파일이 잡는다.
 *
 *   1. lib/fold/registry.ts   `'steel': () => import('./pages/steel')`
 *                             `'steel': () => import('./pages/steel__slug')`
 *   2. lib/ko/registry.ts     `'steel': () => import('./pages/steel__slug')`
 *   3. app/sitemap.ts         `from "@/lib/steel/list"` · `/steel` 허브 줄 · `STEEL_CELLS.map`
 *   4. lib/search-index.ts    `section: 'steel' as const` · `{ href: '/steel',` · SECTION_META
 *   5. lib/locale-home.ts     `route: '/steel'` · app/(ko)/page.tsx `href: '/steel'`
 *   6. lib/og-cards/*.tsx     `'steel': () => steelHub('<lang>')` + keys.ts 열 언어
 *
 * 그때 tests/og-cards.test.ts의 WANT와 tests/og-fonts.test.ts의 카드 수도 함께
 * 열 장 올라간다(2549 → 2559).
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, FORMULA, SHAPES, STEEL_ICON, STEEL_SLUGS, cellOf, slugOf } from '../lib/steel/list.ts';
import { steelFacts } from '../lib/steel/facts.ts';
import { STEEL_UI, fmtNum, steelName } from '../lib/steel/ui.ts';
import { REBAR_SLUGS } from '../lib/rebar/list.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/steel/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

/** 문장 갈래를 두루 밟는 표본 — 형상 일곱을 하나씩 */
const SHOWN = [
  'plate-6mm-1000x2000',
  'flat-6x50mm',
  'square-25mm',
  'round-20mm',
  'round-tube-50x2',
  'square-tube-50x50x2',
  'rect-tube-50x30x2',
].map(slug => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return steelFacts(c);
});

test('섹션 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[STEEL_ICON], `${STEEL_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('철근과 주소가 겹치지 않고 서로 가리킨다', () => {
  /*
   * 두 섹션이 같은 밀도에서 나오므로 주제가 붙어 있다. 주소가 겹치면 한쪽이
   * 다른 쪽을 덮고, 링크가 한 방향뿐이면 그쪽으로 들어오는 링크가 사이트맵밖에
   * 없어진다 — 그래서 겹침과 양방향을 함께 본다.
   */
  const overlap = STEEL_SLUGS.filter(s => REBAR_SLUGS.includes(s));
  assert.deepEqual(overlap, [], `철근과 겹치는 주소: ${overlap.join(', ')}`);

  const steelHub = readFileSync(join(ROOT, 'components', 'steel', 'SteelHubPage.tsx'), 'utf8');
  const steelLeaf = readFileSync(join(ROOT, 'components', 'steel', 'SteelPage.tsx'), 'utf8');
  for (const [name, src] of [['허브', steelHub], ['낱장', steelLeaf]] as [string, string][]) {
    assert.match(src, /\$\{prefix\}\/rebar/, `강재 ${name}이 철근을 안 가리킨다`);
    assert.match(src, /REBAR_UI\[lang\]\.section/, `강재 ${name}의 링크 이름표가 REBAR_UI에서 오지 않는다 — 열 언어가 갈라진다`);
  }
  const rebarHub = readFileSync(join(ROOT, 'components', 'rebar', 'RebarHubPage.tsx'), 'utf8');
  assert.match(rebarHub, /\$\{prefix\}\/steel/, '철근 허브가 강재를 안 가리킨다 — 들어오는 링크가 사이트맵뿐이 된다');
  assert.match(rebarHub, /STEEL_UI\[lang\]\.section/, '철근 쪽 링크 이름표가 STEEL_UI에서 오지 않는다');
});

test('공유 모듈과 낱장 껍데기가 갖춰져 있다', () => {
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'steel.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'steel__slug.tsx')), '낱장 공유 모듈이 없다');
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'steel', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13: force-dynamic → ISR. 둘이 함께 있어야 캐시가 걸린다 —
       revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다(실측 확인).
       까닭은 tests/prerender-budget.test.ts 머리말. */
    assert.ok(/export const revalidate = \d+/.test(src), `${lang} 낱장에 revalidate가 없다 — 캐시가 안 걸린다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다 — revalidate만으로는 안 걸린다`);
  }
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'steel', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('steel');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('steelParams'), '한국어 낱장이 강재 목록을 안 돌린다');
});

test('허브와 낱장 149칸이 열 언어면 1500장이다', () => {
  // 허브 1 + 낱장 149가 열 언어씩 — 사이트맵에 걸 장수의 근거다
  assert.equal(STEEL_SLUGS.length, 149);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + STEEL_SLUGS.length) * LANGS.length, 1500);
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = SHOWN[0];
  for (const lang of LANG_CODES) {
    const ui = STEEL_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, v] of Object.entries(ui)) {
      if (typeof v !== 'string') continue;
      assert.ok(v.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    // 형상 이름 일곱이 다 있고 서로 다르다 — 하나를 옮겨 적다 빠뜨리면 두 형상이 같은 이름이 된다
    assert.equal(Object.keys(ui.shapeLabel).length, 7, `${lang}: 형상 이름이 일곱이 아니다`);
    for (const s of SHAPES) assert.ok(ui.shapeLabel[s]?.trim().length, `${lang}.${s}: 형상 이름이 비어 있다`);
    assert.equal(new Set(SHAPES.map(s => ui.shapeLabel[s])).size, 7, `${lang}: 형상 이름이 겹친다`);

    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 셈의 전제 넷 — 밀도·단면적 식·모서리 라운드·빼기로 한 형상은 길게 밝혀야 한다
    assert.ok(ui.densityNote.length >= floor * 6, `${lang}: 밀도 설명이 짧다`);
    assert.ok(ui.formulaNote.length >= floor * 6, `${lang}: 단면적 식 설명이 짧다`);
    assert.ok(ui.hollowNote.length >= floor * 6, `${lang}: 모서리 라운드 설명이 짧다`);
    assert.ok(ui.excludedNote.length >= floor * 6, `${lang}: 뺀 형상 설명이 짧다`);
  }
});

test('빼기로 한 형상을 열 언어가 화면에서 밝힌다', () => {
  /*
   * 표로만 정해지는 형상을 뺀 것은 이 섹션의 성질을 지키기 위한 결정이다. 코드에서
   * 뺀 것만으로는 읽는 사람이 알 수 없으므로, 열 언어 모두 그 이야기를 적었는지 본다.
   * H는 열 언어가 다 로마자로 쓰는 글자다(H形鋼·H-बीम·H 型钢) — 그것을 닻으로 쓴다.
   */
  for (const lang of LANG_CODES) {
    const ui = STEEL_UI[lang];
    assert.match(ui.excludedTitle, /H/, `${lang}: 제목이 어느 형상을 뺐는지 안 말한다`);
    assert.match(ui.excludedNote, /H/, `${lang}: 설명에 H형강이 없다`);
    // 왜 뺐는지까지 적혀야 한다 — 뺐다는 말만 있으면 판단을 옮겨 적을 수 없다
    assert.ok(ui.excludedNote.length > ui.excludedTitle.length * 4, `${lang}: 까닭 없이 뺐다고만 적혀 있다`);
    // 각관 모서리 라운드를 무시했다는 사실도 화면에 있어야 한다
    assert.match(ui.hollowNote, /2/, `${lang}: 모서리 라운드로 얼마나 어긋나는지 안 적혀 있다`);
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = STEEL_UI[lang];
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...SHAPES.map(s => ui.shapeLabel[s]),
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
   * 47.1과 47,1은 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   */
  assert.equal(fmtNum('de', 47.1), '47,1');
  assert.equal(fmtNum('fr', 2.466), '2,466');
  assert.equal(fmtNum('en', 47.1), '47.1');
  assert.equal(fmtNum('ko', 2.466), '2.466');
  assert.equal(fmtNum('hi', 3.014), '3.014');
  // 치수 표기는 정수뿐이라 언어를 안 가린다 — 갈리기 시작하면 여기서 걸린다
  for (const c of CELLS) assert.ok(!/\d[.,]\d/.test(steelFacts(c).size), slugOf(c));
  for (const s of SHAPES) assert.ok(!/\d[.,]\d/.test(FORMULA[s]), s);

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
    const ui = STEEL_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(n(f.perPiece)), `${lang}: desc에 한 개 무게가 없다`);
      assert.ok(ui.desc(f).includes(n(f.unit)), `${lang}: desc에 단위중량이 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.perPiece)), `${lang}: metaTitle에 무게가 없다`);
      assert.ok(ui.metaTitle(f).includes(f.size), `${lang}: metaTitle에 치수가 없다`);
      assert.ok(ui.metaTitle(f).includes(ui.shapeLabel[f.shape]), `${lang}: metaTitle에 형상 이름이 없다`);
      assert.ok(ui.metaDesc(f).includes(n(f.area)), `${lang}: metaDesc에 단면적이 없다`);
      // 계수가 아니라 식을 보여 준다는 것이 이 섹션의 요점이다
      assert.ok(ui.metaDesc(f).includes(f.formula), `${lang}: metaDesc에 단면적 식이 없다`);
      assert.ok(ui.cellFaq(f)[2].a.includes(f.formula), `${lang}: 낱장 질문에 단면적 식이 없다`);
      // 이름은 형상 + 치수다 — 컴포넌트와 문장이 같은 함수를 본다
      assert.equal(steelName(f, lang), `${ui.shapeLabel[f.shape]} ${f.size}`, lang);
    }
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
    assert.notEqual(ui.desc(SHOWN[4]), ui.desc(SHOWN[5]), `${lang}: 형상이 달라도 같은 문장이다`);
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다.
   * 형상 이름이 겹치는 짝이 있다 — es·pt의 "Barra redonda"와 ja·tw의 "鋼板"이
   * 그렇다. 그래서 제목에 그 언어의 "강재"에 해당하는 낱말을 함께 넣었다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = STEEL_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const c of CELLS) titles.push(ui.metaTitle(steelFacts(c)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});
