/**
 * 마우스 감도 배선과 열 언어 문구 — 계산이 아니라 이어짐을 본다(계산은 dpi.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 열 언어 문구는 튜플이라 칸이 채워졌는지만 tsc가 본다 — 빈 문자열이나 영어 원문이
 * 남아도 컴파일은 통과하므로, 여기서 값을 직접 센다. 소수점 기호까지 함께 본다:
 * es·pt·de·fr는 쉼표를 쓰는데 문장에 점이 남으면 표와 본문이 다른 얼굴이 된다.
 * 천 단위 구분표는 어느 언어에서도 쓰지 않는다 — eDPI 2078을 "2,078"로 적으면
 * 쉼표 언어에서 소수 2.078로 읽힌다.
 *
 * ── '배선' 검사 하나는 새 섹션을 낸 직후 빨갛다 ─────────────
 * 사이트맵·검색 색인·홈·공유 카드는 여러 섹션이 함께 쓰는 파일이라 섹션을 만든
 * 쪽에서 건드리지 않는다. 그 줄을 넣기 전까지 아래 '배선' 검사가 빠진 곳을 하나하나
 * 이름으로 불러 준다 — 줄을 다 넣으면 초록이 된다. 조건을 붙여 건너뛰게 만들지
 * 않은 것은, 건너뛰는 검사는 아무것도 지키지 않기 때문이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, DPI_ICON, DPI_SLUGS, GAMES, REF_DPI, cellOf } from '../lib/dpi/list.ts';
import { ANCHOR_CM, CM_PER_INCH, REF_CM, dpiFacts, factsOf } from '../lib/dpi/facts.ts';
import { DPI_UI, backText, cellName, factorText, fmtNum } from '../lib/dpi/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/dpi/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

const facts = (slug: string) => {
  const f = factsOf(slug);
  assert.ok(f, `${slug} 칸이 없다`);
  return f;
};

/**
 * 문장 갈래를 두루 밟는 표본.
 *
 * 같은 엔진 계열 쌍을 반드시 넣는다 — 그 칸만 문장이 다른 길로 갈라지므로(곱수 1을
 * 적지 않고 "그대로"라고 말한다), 표본에 없으면 그 약속이 문구 쪽에서 조용히 깨진다.
 * 낱점은 가장 느린 쪽과 가장 빠른 쪽 DPI를 함께 넣는다.
 */
const SHOWN = [
  facts('valorant-to-cs2'),
  facts('cs2-to-valorant'),
  facts('cs2-to-csgo'),
  facts('cs2-to-overwatch2'),
  facts('valorant-800dpi'),
  facts('cs2-400dpi'),
  facts('overwatch2-3200dpi'),
];

test('마우스 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[DPI_ICON], `${DPI_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('접힌 모듈과 낱장 껍데기가 제자리에 있다', () => {
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'dpi.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'dpi__slug.tsx')), '낱장 공유 모듈이 없다');
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'dpi', '[slug]', 'page.tsx');
    assert.ok(existsSync(p), `${lang}에 낱장 껍데기가 없다`);
    const src = readFileSync(p, 'utf8');
    assert.ok(src.includes(`build('${lang}')`), `${lang} 껍데기가 제 언어로 안 부른다`);
    assert.ok(src.includes(`export const dynamic = 'force-dynamic'`), `${lang} 낱장에 force-dynamic이 없다 — ISR 쓰기가 새어 나간다`);
  }
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'dpi', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('dpi');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('dpiParams') || ko.includes('DPI_SLUGS'), '한국어 낱장이 감도 목록을 안 돌린다');
});

test('두 화면이 조준 연습으로 이어진다', () => {
  /*
   * 감도를 바꾼 다음 할 일이 조준 연습이다 — 같은 이야기의 다음 칸이 /game/aim이다.
   * 링크가 빠지면 두 섹션이 서로 모르는 남이 된다.
   */
  for (const f of ['DpiHubPage.tsx', 'DpiPage.tsx']) {
    const src = readFileSync(join(ROOT, 'components', 'dpi', f), 'utf8');
    assert.match(src, /\$\{prefix\}\/game\/aim/, `${f}에 /game/aim 링크가 없다`);
    assert.match(src, /ui\.aimLink/, `${f}에 조준 연습 링크 문구가 없다`);
  }
  for (const lang of LANG_CODES) {
    assert.ok(DPI_UI[lang].aimLink.trim().length > 0, `${lang}: 조준 연습 링크 문구가 비었다`);
  }
});

test('배선 — 등록부·사이트맵·색인·홈·카드에 감도가 걸려 있다', () => {
  /*
   * 여러 섹션이 함께 쓰는 파일이라 섹션을 만든 쪽에서 건드리지 않는다. 아래 목록이
   * 곧 넣어야 할 줄이고, 빠진 것은 이름으로 나온다.
   */
  const missing: string[] = [];
  const want = (ok: boolean, what: string) => {
    if (!ok) missing.push(what);
  };
  const read = (...p: string[]) => readFileSync(join(ROOT, ...p), 'utf8');

  const fold = read('lib', 'fold', 'registry.ts');
  want(fold.includes(`'dpi': () => import('./pages/dpi')`), "lib/fold/registry.ts STATIC_ROUTES: 'dpi': () => import('./pages/dpi'),");
  want(fold.includes(`'dpi': () => import('./pages/dpi__slug')`), "lib/fold/registry.ts SLUG_ROUTES: 'dpi': () => import('./pages/dpi__slug'),");

  const ko = read('lib', 'ko', 'registry.ts');
  want(ko.includes(`'dpi': () => import('./pages/dpi__slug')`), "lib/ko/registry.ts KO_LEAVES: 'dpi': () => import('./pages/dpi__slug'),");

  const sitemap = read('app', 'sitemap.ts');
  want(sitemap.includes(`from "@/lib/dpi/list"`), 'app/sitemap.ts: import { CELLS as DPI_CELLS } from "@/lib/dpi/list";');
  want(/\/dpi`, changeFrequency: weekly, priority: 0\.85/.test(sitemap), 'app/sitemap.ts: 허브 줄(우선순위 0.85)');
  want(/DPI_CELLS\.map/.test(sitemap), 'app/sitemap.ts: 낱장 줄(DPI_CELLS.map)');

  const idx = read('lib', 'search-index.ts');
  want(idx.includes(`from './dpi/list.ts'`), "lib/search-index.ts: import { CELLS as DPI_CELLS, DPI_ICON } from './dpi/list.ts';");
  want(idx.includes(`from './dpi/facts.ts'`), "lib/search-index.ts: import { dpiFacts } from './dpi/facts.ts';");
  want(/export type Section =[^;]*'dpi'/.test(idx), "lib/search-index.ts: Section 합집합에 | 'dpi'");
  want(idx.includes(`section: 'dpi' as const`), "lib/search-index.ts: 낱장 항목의 section: 'dpi' as const");
  want(idx.includes(`{ href: '/dpi',`), "lib/search-index.ts: 허브 항목 { href: '/dpi', … }");
  want(/dpi:\s*\{ label:/.test(idx), 'lib/search-index.ts SECTION_META: dpi: { label: …, icon: …, accent: … }');

  const home = read('lib', 'locale-home.ts');
  want(home.includes(`route: '/dpi'`), "lib/locale-home.ts: route: '/dpi' 카드(아홉 언어 문구)");
  const koHome = read('app', '(ko)', 'page.tsx');
  want(koHome.includes(`href: '/dpi'`), "app/(ko)/page.tsx: href: '/dpi' 카드");

  for (const lang of LANG_CODES) {
    want(CARD_KEYS[lang].includes('dpi'), `lib/og-cards/keys.ts: ${lang} 배열에 'dpi'`);
    const card = read('lib', 'og-cards', `${lang}.tsx`);
    want(card.includes(`'dpi': () => dpiHub('${lang}')`), `lib/og-cards/${lang}.tsx: 'dpi': () => dpiHub('${lang}'),`);
  }

  assert.deepEqual(missing, [], `배선이 빠졌다 (${missing.length}곳):\n  ${missing.join('\n  ')}`);
});

test('사이트맵에 실릴 장수가 허브 1 + 낱장 128의 열 언어다', () => {
  assert.equal(DPI_SLUGS.length, 128);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + DPI_SLUGS.length) * LANGS.length, 1290);
});

test('열 언어 모두 문구가 채워져 있다', () => {
  /* 사전 열쇠를 직접 센다 — 한 언어만 열쇠가 빠지면 폴백이 미번역을 숨긴다 */
  const keyCount = new Set(LANG_CODES.map(lang => Object.keys(DPI_UI[lang]).length));
  assert.equal(keyCount.size, 1, `언어마다 열쇠 수가 다르다: ${[...keyCount].join(', ')}`);
  const keys = Object.keys(DPI_UI.ko).sort().join(',');
  for (const lang of LANG_CODES) {
    assert.equal(Object.keys(DPI_UI[lang]).sort().join(','), keys, `${lang}: 열쇠 목록이 다르다`);
  }

  for (const lang of LANG_CODES) {
    const ui = DPI_UI[lang];
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
    for (const f of SHOWN) assert.equal(ui.cellFaq(f).length, 3, `${lang}: 낱장 질문이 셋이 아니다`);
    // 셈의 전제 다섯 — 식·eDPI·변환·축·빠뜨린 것은 길게 밝혀야 한다
    assert.ok(ui.formulaNote.length >= floor * 6, `${lang}: 식 설명이 짧다`);
    assert.ok(ui.edpiNote.length >= floor * 6, `${lang}: eDPI 설명이 짧다`);
    assert.ok(ui.convertNote.length >= floor * 6, `${lang}: 변환 설명이 짧다`);
    assert.ok(ui.targetNote.length >= floor * 6, `${lang}: 축 설명이 짧다`);
    assert.ok(ui.limitNote.length >= floor * 8, `${lang}: 빠뜨린 것 설명이 짧다`);
    assert.ok(ui.sameNote.length >= floor * 4, `${lang}: 같은 계열 설명이 짧다`);
  }
});

test('문구가 코드와 같은 상수를 말한다', () => {
  /*
   * 문장은 2.54와 yaw 값을 손으로 적어 두었고 셈은 CM_PER_INCH와 GAMES를 쓴다.
   * 코드만 고치면 화면은 옛 숫자를 계속 말하므로, 두 곳을 여기서 묶어 둔다 —
   * 소수점 기호까지 그 언어의 규칙으로 본다.
   */
  const yaws = [...new Set(GAMES.map(g => g.yaw))];
  /** 둘 이상이 나눠 쓰는 yaw — "감도 숫자가 그대로"인 계열이다 */
  const shared = yaws.filter(y => GAMES.filter(g => g.yaw === y).length > 1);
  assert.ok(shared.length > 0, '나눠 쓰는 yaw가 없다 — 같은 계열 문구가 아무 칸에도 안 쓰인다');
  for (const lang of LANG_CODES) {
    const inch = fmtNum(lang, CM_PER_INCH);
    assert.ok(DPI_UI[lang].how[0].includes(inch), `${lang}: 알아 둘 것 첫 줄에 ${inch}가 없다`);
    assert.ok(DPI_UI[lang].formulaNote.includes(inch), `${lang}: 식 설명에 ${inch}가 없다`);
    for (const yaw of yaws) {
      const y = fmtNum(lang, yaw);
      assert.ok(DPI_UI[lang].formulaNote.includes(y), `${lang}: 식 설명에 yaw ${y}가 없다`);
      assert.ok(DPI_UI[lang].how[0].includes(y), `${lang}: 알아 둘 것 첫 줄에 yaw ${y}가 없다`);
    }
    /* 쌍 표의 기준 DPI를 문장이 그대로 말한다 — REF_DPI를 바꾸면 여기서 걸린다 */
    assert.ok(DPI_UI[lang].refDpiNote.includes(String(REF_DPI)), `${lang}: 기준 DPI 안내에 ${REF_DPI}가 없다`);
    /*
     * "같은 엔진 계열" 설명은 여럿이 나눠 쓰는 yaw 값을 손으로 적고 있다. 그 값이
     * 무엇인지는 GAMES가 정하므로, 목록이 바뀌면 설명도 함께 바뀌어야 한다.
     */
    for (const yaw of shared) {
      assert.ok(DPI_UI[lang].sameNote.includes(fmtNum(lang, yaw)), `${lang}: 같은 계열 설명에 ${fmtNum(lang, yaw)}가 없다`);
    }
  }
  /*
   * 큰 제목이 "소스 계열 eDPI 800은 51.95cm"라고 말한다. 그 값은 계산에서 나오므로
   * 2.54·360·yaw 가운데 하나만 바뀌어도 제목이 먼저 거짓이 된다 — 열 언어를 함께 본다.
   */
  for (const lang of LANG_CODES) {
    const anchor = fmtNum(lang, ANCHOR_CM);
    assert.ok(DPI_UI[lang].hubTitle.includes(anchor), `${lang}: 큰 제목이 ${anchor}와 다른 값을 말한다 — ${DPI_UI[lang].hubTitle}`);
    assert.ok(DPI_UI[lang].formulaNote.includes(anchor), `${lang}: 식 설명에 밖에서 아는 값 ${anchor}가 없다`);
  }
});

test('넣지 않은 것을 열 언어가 모두 밝힌다', () => {
  /*
   * 이 표는 마우스 가속이 켜져 있으면 맞지 않고, yaw를 확인하지 못한 게임은 아예
   * 빠져 있다. 그 사실이 한 언어에서만 빠지면 그 언어 독자만 속는다 — 그래서
   * 가속과 뺀 게임을 가리키는 낱말이 열 언어의 limitNote에 다 있는지 센다.
   */
  const WORDS: Record<string, string[]> = {
    ko: ['가속', '레인보우 식스', '포트나이트'],
    en: ['acceleration', 'Rainbow Six', 'Fortnite'],
    es: ['aceleración', 'Rainbow Six', 'Fortnite'],
    pt: ['aceleração', 'Rainbow Six', 'Fortnite'],
    ja: ['加速', 'レインボーシックス', 'フォートナイト'],
    de: ['Mausbeschleunigung', 'Rainbow Six', 'Fortnite'],
    fr: ['accélération', 'Rainbow Six', 'Fortnite'],
    hi: ['त्वरण', 'Rainbow Six', 'Fortnite'],
    zh: ['加速', 'Rainbow Six', 'Fortnite'],
    tw: ['加速', 'Rainbow Six', 'Fortnite'],
  };
  for (const lang of LANG_CODES) {
    const note = DPI_UI[lang].limitNote;
    for (const w of WORDS[lang]) assert.ok(note.includes(w), `${lang}: limitNote에 "${w}"가 없다`);
    assert.ok(note.includes('PUBG'), `${lang}: limitNote에 PUBG가 없다`);
  }
  // 뺀 게임이 목록에 없는 것과 문구가 같은 말을 해야 한다(목록 쪽은 dpi.test.ts가 본다)
  assert.equal(GAMES.length, 8, '게임 수가 여덟이 아니다 — 문구도 함께 고쳐야 한다');
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = DPI_UI[lang];
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...ui.how,
    ...ui.hubFaq.flatMap(q => [q.q, q.a]),
    ...SHOWN.flatMap(f => [
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f), cellName(lang, f),
      ...(f.kind === 'pair' ? [factorText(lang, f), backText(lang, f)] : []),
      ...ui.cellFaq(f).flatMap(q => [q.q, q.a]),
    ]),
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

test('화면 문구에 이모지가 없다', () => {
  /*
   * 섹션 그림은 카드와 목록이 쓰는 DPI_ICON 하나뿐이다. 문장에 이모지가 섞이면
   * 공유 카드에서 컬러 이모지가 그대로 나가고, 화면마다 톤이 어긋난다.
   */
  for (const lang of LANG_CODES) {
    for (const s of stringsOf(lang)) {
      assert.ok(!/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(s), `${lang}: 이모지가 섞였다 — ${s}`);
    }
  }
});

test('소수점 기호가 언어를 따른다', () => {
  /*
   * 0.5443과 0,5443은 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   * 쉼표 없는 언어에서 쉼표를 막는 것은 천 단위 구분표를 걸러 내려는 것이다 —
   * eDPI를 "2,078"로 적으면 쉼표 언어에서 2.078로 읽힌다.
   */
  assert.equal(fmtNum('de', 0.5443), '0,5443');
  assert.equal(fmtNum('fr', 3.182), '3,182');
  assert.equal(fmtNum('en', 2.54), '2.54');
  assert.equal(fmtNum('ko', 0.0066), '0.0066');
  assert.equal(fmtNum('es', 800), '800', '정수에는 손대지 않는다');

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

/** 제목에 반드시 들어야 하는 게임 이름 조각 — 상표라 열 언어가 같은 글자다 */
const gameShortOf = (f: ReturnType<typeof facts>): string =>
  f.kind === 'pair' ? f.from.short : f.game.short;

test('낱장 문장이 실제 숫자를 담는다', () => {
  // 자리표만 채우고 값을 안 넣으면 열 언어가 다 같은 문장이 된다
  for (const lang of LANG_CODES) {
    const ui = DPI_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.metaTitle(f).includes(gameShortOf(f)), `${lang}: metaTitle에 게임 이름이 없다`);
      if (f.kind === 'pair') {
        if (f.same) {
          /* 같은 계열에는 곱수 1을 적지 않는다 — 그 약속을 문구 쪽에서도 지키는지 본다 */
          assert.ok(!/[×x]\s*1\b/.test(ui.desc(f)), `${lang}: ${f.slug}의 요약이 곱수 1을 적었다 — ${ui.desc(f)}`);
          assert.equal(factorText(lang, f), ui.sameNumber, `${lang}: 같은 계열 곱수 문구가 다르다`);
          assert.equal(backText(lang, f), ui.sameNumber, `${lang}: 같은 계열 되돌림 문구가 다르다`);
        } else {
          assert.ok(ui.desc(f).includes(n(f.factor)), `${lang}: ${f.slug} 요약에 곱수가 없다`);
          assert.ok(ui.metaTitle(f).includes(n(f.factor)), `${lang}: ${f.slug} 제목에 곱수가 없다`);
          assert.ok(ui.metaDesc(f).includes(n(f.back)), `${lang}: ${f.slug} 설명에 되돌리는 곱수가 없다`);
          assert.equal(factorText(lang, f), `× ${n(f.factor)}`, `${lang}: 곱수 문구가 다르다`);
        }
        assert.ok(ui.metaDesc(f).includes(String(f.pick.fromEdpi)), `${lang}: ${f.slug} 설명에 eDPI가 없다`);
        assert.ok(ui.metaDesc(f).includes(String(f.pick.toEdpi)), `${lang}: ${f.slug} 설명에 상대 eDPI가 없다`);
        assert.ok(ui.cellFaq(f)[2].a.includes(String(f.pick.fromEdpi)), `${lang}: ${f.slug} eDPI 질문에 값이 없다`);
      } else {
        assert.ok(ui.desc(f).includes(n(f.pick.sens)), `${lang}: ${f.slug} 요약에 감도가 없다`);
        assert.ok(ui.desc(f).includes(String(f.pick.edpi)), `${lang}: ${f.slug} 요약에 eDPI가 없다`);
        assert.ok(ui.metaTitle(f).includes(n(f.pick.sens)), `${lang}: ${f.slug} 제목에 감도가 없다`);
        assert.ok(ui.metaTitle(f).includes(String(f.dpi)), `${lang}: ${f.slug} 제목에 DPI가 없다`);
        assert.ok(ui.metaDesc(f).includes(String(f.pick.counts)), `${lang}: ${f.slug} 설명에 카운트가 없다`);
        assert.ok(ui.metaDesc(f).includes(n(f.rows[0].sens)), `${lang}: ${f.slug} 설명에 20cm 감도가 없다`);
        // DPI 질문은 축의 양 끝을 실제로 적어야 한다
        const dpiAnswer = ui.cellFaq(f)[1].a;
        assert.ok(dpiAnswer.includes(n(f.dpiRows[0].sens)), `${lang}: ${f.slug} DPI 답에 첫 감도가 없다`);
        assert.ok(dpiAnswer.includes(n(f.dpiRows[f.dpiRows.length - 1].sens)), `${lang}: ${f.slug} DPI 답에 끝 감도가 없다`);
        assert.ok(dpiAnswer.includes(String(f.pick.edpi)), `${lang}: ${f.slug} DPI 답에 eDPI가 없다`);
      }
      // 모든 낱장이 대표 거리를 말한다 — REF_CM을 바꾸면 여기서 걸린다
      assert.ok(ui.metaDesc(f).includes(String(REF_CM)), `${lang}: ${f.slug} 설명에 ${REF_CM}cm가 없다`);
    }
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), `${lang}: 반대 방향 요약이 같다`);
    assert.notEqual(ui.desc(SHOWN[4]), ui.desc(SHOWN[5]), lang);
  }
});

test('칸 이름이 128칸에 빠짐없이 붙는다', () => {
  for (const lang of LANG_CODES) {
    const names = new Set<string>();
    for (const c of CELLS) {
      const f = dpiFacts(c);
      const name = cellName(lang, f);
      assert.ok(name.trim().length > 0, `${lang} ${f.slug}: 이름이 비었다`);
      assert.ok(!name.includes('undefined'), `${lang} ${f.slug}: 이름에 undefined가 있다 — ${name}`);
      names.add(name);
    }
    assert.equal(names.size, CELLS.length, `${lang}: 칸 이름이 겹친다`);
  }
  // 방향이 이름에 남아 있어야 한다 — 반대 칸과 같은 이름이면 어느 쪽인지 알 수 없다
  assert.notEqual(cellName('ko', facts('valorant-to-cs2')), cellName('ko', facts('cs2-to-valorant')));
  assert.ok(cellName('en', facts('cs2-800dpi')).includes('800'));
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = DPI_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const c of CELLS) titles.push(ui.metaTitle(dpiFacts(c)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});

test('반대 방향 칸이 서로를 가리킨다', () => {
  /* 곱수가 역수인 두 페이지가 서로 이어져 있지 않으면 한쪽에서 되돌릴 길이 없다 */
  for (const c of CELLS) {
    const f = dpiFacts(c);
    if (f.kind !== 'pair') continue;
    const back = cellOf(f.reverse);
    assert.ok(back, `${f.slug}: 반대 칸 ${f.reverse}이 없다`);
    const bf = dpiFacts(back);
    assert.equal(bf.kind, 'pair');
    if (bf.kind === 'pair') assert.equal(bf.reverse, f.slug, `${f.slug}: 반대 칸이 되짚어지지 않는다`);
  }
  const src = readFileSync(join(ROOT, 'components', 'dpi', 'DpiPage.tsx'), 'utf8');
  assert.match(src, /f\.reverse/, 'DpiPage.tsx가 반대 방향 칸을 안 낸다');
});
