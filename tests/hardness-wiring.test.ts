/**
 * 물 경도 배선 — 계산이 아니라 이어짐을 본다(계산은 hardness-unit.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 껍데기·모듈·문구가
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
 *   1. lib/fold/registry.ts   `'hardness': () => import('./pages/hardness')`
 *                             `'hardness': () => import('./pages/hardness__slug')`
 *   2. lib/ko/registry.ts     `'hardness': () => import('./pages/hardness__slug')`
 *   3. app/sitemap.ts         `from "@/lib/hardness/list"` · `/hardness` 허브 줄 · `HARDNESS_CELLS.map`
 *   4. lib/search-index.ts    `section: 'hardness' as const` · `{ href: '/hardness',` · SECTION_META
 *   5. lib/locale-home.ts     `route: '/hardness'` · app/(ko)/page.tsx `href: '/hardness'`
 *   6. lib/og-cards/*.tsx     `'hardness': () => hardnessHub('<lang>')` + keys.ts 열 언어
 *
 * 그때 tests/og-cards.test.ts의 WANT와 tests/og-fonts.test.ts의 카드 수도 함께
 * 열 장 올라간다. 배선 전까지는 tests/ko-leaf-fold.test.ts가 'hardness'를
 * "등록부에 없는 모듈"로 함께 세운다 — steel·sun이 지금 그 상태다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { HARDNESS_ICON, HARDNESS_SLUGS, CELLS, UNITS } from '../lib/hardness/list.ts';
import { hardnessFacts, valueOf } from '../lib/hardness/facts.ts';
import { HARDNESS_UI, fmtNum } from '../lib/hardness/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/hardness/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

/**
 * 문장 갈래를 두루 밟는 표본.
 *
 * 150ppm을 넣는 것은 두 기준이 서로 다른 답을 내는 자리라서다 — 이 표에서는
 * "경수"이고 독일 WRMG로는 "연수"이므로, 등급 이름이 두 벌 다 문장에 박힌다.
 */
const SHOWN = [hardnessFacts(150), hardnessFacts(5), hardnessFacts(1000)];

test('물 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(
    ICON_FOR[HARDNESS_ICON],
    `${HARDNESS_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`,
  );
});

test('공유 모듈과 낱장 껍데기가 제자리에 있다', () => {
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'hardness.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'hardness__slug.tsx')), '낱장 공유 모듈이 없다');

  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'hardness', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    /* 2026-08-13: force-dynamic → ISR. 둘이 함께 있어야 캐시가 걸린다 —
       revalidate만 있으면 라우트가 동적으로 잡혀 아무 효과가 없다(실측 확인).
       까닭은 tests/prerender-budget.test.ts 머리말. */
    assert.ok(/export const revalidate = \d+/.test(src), `${lang} 낱장에 revalidate가 없다 — 캐시가 안 걸린다`);
    assert.ok(src.includes('generateStaticParams'), `${lang} 낱장이 generateStaticParams를 안 내보낸다`);
    assert.ok(src.includes('lib/fold/pages/hardness__slug'), `${lang} 껍데기가 다른 모듈을 부른다`);
  }

  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'hardness', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('hardness');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('hardnessParams'), '한국어 낱장이 경도 목록을 안 돌린다');
});

test('낱장 수가 열 언어를 곱해 맞는다', () => {
  assert.equal(HARDNESS_SLUGS.length, 120);
  assert.equal(LANGS.length, 10);
  // 허브 1 + 낱장 120이 열 언어씩 — 사이트맵에 걸릴 장수다
  assert.equal((1 + HARDNESS_SLUGS.length) * LANGS.length, 1210);
});

test('열 언어 모두 문구가 채워져 있다', () => {
  const f = SHOWN[0];
  for (const lang of LANG_CODES) {
    const ui = HARDNESS_UI[lang];
    const floor = DENSE.has(lang) ? 6 : 12;
    for (const [key, val] of Object.entries(ui)) {
      if (typeof val !== 'string') continue;
      assert.ok(val.trim().length > 0, `${lang}.${key}: 비어 있다`);
    }
    assert.ok(ui.hubLead.length >= (DENSE.has(lang) ? 20 : 35), `${lang}: hubLead가 짧다`);
    assert.equal(ui.how.length, 4, `${lang}: 알아 둘 것이 네 줄이 아니다`);
    assert.equal(ui.hubFaq.length, 3, `${lang}: 질문이 셋이 아니다`);
    for (const h of ui.how) assert.ok(h.length >= floor, `${lang}: 너무 짧다 — ${h}`);
    for (const q of ui.hubFaq) assert.ok(q.q.length >= floor && q.a.length >= floor * 2, `${lang}: 답이 짧다 — ${q.q}`);
    assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);

    // 셈의 전제 넷 — 기준·계수·등급·쓰임은 길게 밝혀야 한다
    assert.ok(ui.baseNote.length >= floor * 6, `${lang}: ppm 기준 설명이 짧다`);
    assert.ok(ui.factorNote.length >= floor * 6, `${lang}: 계수 설명이 짧다`);
    assert.ok(ui.bandNote.length >= floor * 6, `${lang}: 등급 설명이 짧다`);
    assert.ok(ui.useNote.length >= floor * 6, `${lang}: 쓰임 설명이 짧다`);
    assert.ok(ui.anchorNote.length >= floor * 4, `${lang}: 되짚기 색인 설명이 짧다`);

    // 단위 이름은 여섯 다, 등급 이름은 넷과 셋이 다 있어야 한다
    assert.equal(Object.keys(ui.unitNames).length, UNITS.length, `${lang}: 단위 이름 수가 다르다`);
    for (const u of UNITS) {
      assert.ok(ui.unitNames[u.key]?.trim().length > 0, `${lang}: ${u.key} 단위 이름이 비었다`);
    }
    assert.equal(new Set(Object.values(ui.unitNames)).size, UNITS.length, `${lang}: 단위 이름이 겹친다`);
    assert.equal(ui.bandNames.length, 4, `${lang}: 등급 이름이 넷이 아니다`);
    assert.equal(ui.wrmgNames.length, 3, `${lang}: WRMG 등급 이름이 셋이 아니다`);
    assert.equal(new Set(ui.bandNames).size, 4, `${lang}: 등급 이름이 겹친다`);
    for (const b of [...ui.bandNames, ...ui.wrmgNames]) assert.ok(b.trim().length > 0, `${lang}: 등급 이름이 비었다`);
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = HARDNESS_UI[lang];
  return [
    ...Object.values(ui).filter((s): s is string => typeof s === 'string'),
    ...Object.values(ui.unitNames),
    ...ui.bandNames,
    ...ui.wrmgNames,
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
   * 8.4와 8,4는 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   */
  assert.equal(fmtNum('de', 8.4), '8,4');
  assert.equal(fmtNum('fr', 17.12), '17,12');
  assert.equal(fmtNum('en', 8.4), '8.4');
  assert.equal(fmtNum('ko', 100.09), '100.09');
  assert.equal(fmtNum('hi', 8.76), '8.76');
  assert.equal(fmtNum('es', 150), '150', '정수는 그대로 둔다');

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

test('낱장 문장이 실제 숫자와 등급 이름을 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = HARDNESS_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(n(valueOf(f, 'dh'))), `${lang}: desc에 °dH가 없다`);
      assert.ok(ui.desc(f).includes(n(valueOf(f, 'gpg'))), `${lang}: desc에 gpg가 없다`);
      assert.ok(ui.desc(f).includes(ui.bandNames[f.band]), `${lang}: desc에 등급 이름이 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.ppm)), `${lang}: metaTitle에 ppm이 없다`);
      assert.ok(ui.metaTitle(f).includes(n(valueOf(f, 'dh'))), `${lang}: metaTitle에 °dH가 없다`);
      assert.ok(ui.metaDesc(f).includes(n(valueOf(f, 'fh'))), `${lang}: metaDesc에 °fH가 없다`);
      assert.ok(ui.metaDesc(f).includes(n(valueOf(f, 'e'))), `${lang}: metaDesc에 °e가 없다`);
      assert.ok(ui.metaDesc(f).includes(n(valueOf(f, 'mmol'))), `${lang}: metaDesc에 mmol/L가 없다`);

      const faq = ui.cellFaq(f);
      assert.ok(faq[0].a.includes(n(valueOf(f, 'dh'))), `${lang}: 첫 질문에 °dH가 없다`);
      /*
       * 두 기준의 등급 이름이 둘 다 문장에 있어야 한다. 하나만 있으면 화면이
       * "기준마다 다르다"고 말하면서 정작 다른 답은 안 보여 주는 셈이 된다.
       */
      assert.ok(faq[1].a.includes(ui.bandNames[f.band]), `${lang}: 등급 질문에 이 표의 등급이 없다`);
      assert.ok(faq[1].a.includes(ui.wrmgNames[f.wrmgBand]), `${lang}: 등급 질문에 WRMG 등급이 없다`);
      assert.ok(faq[2].a.includes(n(f.doublePpm)), `${lang}: 선형 질문에 두 배 값이 없다`);
      assert.ok(faq[2].a.includes(n(f.halfPpm)), `${lang}: 선형 질문에 절반 값이 없다`);
    }
    // 칸이 다르면 문장도 달라야 한다
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
    assert.notEqual(ui.metaDesc(SHOWN[0]), ui.metaDesc(SHOWN[2]), lang);
  }
});

test('두 기준이 다른 답을 내는 것을 열 언어가 보여 준다', () => {
  /*
   * 150ppm은 이 표에서 "경수"이고 독일 WRMG로는 "연수"다. 등급 이름 두 벌이
   * 같은 낱말이면 화면에서 그 어긋남이 안 보이므로, 언어마다 서로 다른지 본다.
   */
  const f = hardnessFacts(150);
  assert.notEqual(f.band, f.wrmgBand, '표본이 두 기준에서 같은 자리라 검사가 뜻을 잃었다');
  for (const lang of LANG_CODES) {
    const ui = HARDNESS_UI[lang];
    assert.notEqual(
      ui.bandNames[f.band],
      ui.wrmgNames[f.wrmgBand],
      `${lang}: 두 기준의 등급 이름이 같은 낱말이라 어긋남이 안 보인다`,
    );
  }
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다 —
   * 간체와 번체는 낱말이 겹치기 쉬워 특히 잘 걸린다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = HARDNESS_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const ppm of CELLS) titles.push(ui.metaTitle(hardnessFacts(ppm)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});
