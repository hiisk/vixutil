/**
 * 태양 배선 — 계산이 아니라 이어짐을 본다(계산은 sun-position.test.ts).
 *
 * 접힌 라우트는 등록부에서 한 줄이 빠져도 빌드가 통과하고, 사이트맵은 그 주소를
 * 계속 내걸며, 아홉 언어에서만 조용히 404가 된다. 그래서 등록부·껍데기·사이트맵·
 * 카드·문구가 실제로 이어져 있는지를 파일과 데이터로 되짚는다.
 *
 * 열 언어 문구는 튜플이라 칸이 채워졌는지만 tsc가 본다 — 빈 문자열이나 영어 원문이
 * 남아도 컴파일은 통과하므로, 여기서 값을 직접 센다. 소수점 기호까지 함께 본다:
 * es·pt·de·fr는 쉼표를 쓰는데 문장에 점이 남으면 표와 본문이 다른 얼굴이 된다.
 *
 * ── '배선' 검사 하나는 새 섹션을 낸 직후 빨갛다 ─────────────
 * 등록부·사이트맵·검색 색인·홈·공유 카드는 여러 섹션이 함께 쓰는 파일이라 섹션을
 * 만든 쪽에서 건드리지 않는다. 그 줄을 넣기 전까지 아래 '배선' 검사가 빠진 곳을
 * 하나하나 이름으로 불러 준다 — 줄을 다 넣으면 초록이 된다. 조건을 붙여 건너뛰게
 * 만들지 않은 것은, 건너뛰는 검사는 아무것도 지키지 않기 때문이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { koLeafSrc } from './app-path.ts';

import { LANGS, LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, SUN_ICON, SUN_SLUGS, cellOf } from '../lib/sun/list.ts';
import { AXIAL_TILT, sunFacts } from '../lib/sun/facts.ts';
import {
  SUN_UI, cellName, dateName, dayLengthText, fmtNum, latName, noonSideText, riseSetText, shadowText,
} from '../lib/sun/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');
const FOLD_LANGS = ['en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 소수점에 쉼표를 쓰는 언어 — lib/sun/ui.ts와 같은 목록이어야 한다 */
const COMMA_LANGS = new Set(['es', 'pt', 'de', 'fr']);

const facts = (slug: string) => {
  const c = cellOf(slug);
  assert.ok(c, `${slug} 칸이 없다`);
  return sunFacts(c);
};

/**
 * 문장 갈래를 두루 밟는 표본.
 *
 * 백야와 극야를 반드시 넣는다 — 그 두 칸만 문장이 다른 길로 갈라지므로, 표본에
 * 없으면 "시각을 지어내지 않는다"는 약속이 문구 쪽에서 조용히 깨질 수 있다.
 */
const SHOWN = [
  facts('lat40-jun21'),
  facts('lat-30-dec21'),
  facts('lat0-mar20'),
  facts('lat70-jun21'),
  facts('lat70-dec21'),
];

test('일출 아이콘은 목록과 카드가 같은 그림을 쓴다', () => {
  assert.ok(ICON_FOR[SUN_ICON], `${SUN_ICON} 이모지가 아이콘으로 이어지지 않는다 — 공유 카드에 컬러 이모지가 그대로 나간다`);
});

test('접힌 모듈과 낱장 껍데기가 제자리에 있다', () => {
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'sun.tsx')), '허브 공유 모듈이 없다');
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'sun__slug.tsx')), '낱장 공유 모듈이 없다');
  /*
   * 껍데기는 언어 이름만 다르다. 복사하다 언어를 안 바꾸면 그 언어 낱장 전체가
   * 다른 언어로 그려진다 — 화면은 멀쩡해서 안 드러난다.
   */
  for (const lang of FOLD_LANGS) {
    const p = join(ROOT, 'app', `(${lang})`, lang, 'sun', '[slug]', 'page.tsx');
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
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'sun', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 한국어 낱장은 lib/ko/pages 모듈이다(라우팅 표 2,048 한도). force-dynamic은
   * 모듈이 아니라 디스패처 라우트가 선언하므로 여기서 보지 않는다 —
   * generateStaticParams는 디스패처가 모아 쓰는 손잡이라 여기서 본다.
   */
  const ko = koLeafSrc('sun');
  assert.ok(ko.includes('generateStaticParams'), '한국어 낱장에 generateStaticParams가 없다');
  assert.ok(ko.includes('sunParams') || ko.includes('SUN_SLUGS'), '한국어 낱장이 태양 목록을 안 돌린다');
});

test('두 화면이 자외선 섹션으로 이어진다', () => {
  /*
   * 태양 고도가 높으면 자외선이 세진다 — 같은 이야기의 다음 칸이 /uv다. 링크가
   * 빠지면 두 섹션이 서로 모르는 남이 된다.
   */
  for (const f of ['SunHubPage.tsx', 'SunPage.tsx']) {
    const src = readFileSync(join(ROOT, 'components', 'sun', f), 'utf8');
    assert.match(src, /\$\{prefix\}\/uv/, `${f}에 /uv 링크가 없다`);
    assert.match(src, /ui\.uvLink/, `${f}에 자외선 링크 문구가 없다`);
  }
  for (const lang of LANG_CODES) {
    assert.ok(SUN_UI[lang].uvLink.trim().length > 0, `${lang}: 자외선 링크 문구가 비었다`);
  }
});

test('배선 — 등록부·사이트맵·색인·홈·카드에 태양이 걸려 있다', () => {
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
  want(fold.includes(`'sun': () => import('./pages/sun')`), "lib/fold/registry.ts STATIC_ROUTES: 'sun': () => import('./pages/sun'),");
  want(fold.includes(`'sun': () => import('./pages/sun__slug')`), "lib/fold/registry.ts SLUG_ROUTES: 'sun': () => import('./pages/sun__slug'),");

  const ko = read('lib', 'ko', 'registry.ts');
  want(ko.includes(`'sun': () => import('./pages/sun__slug')`), "lib/ko/registry.ts KO_LEAVES: 'sun': () => import('./pages/sun__slug'),");

  const sitemap = read('app', 'sitemap.ts');
  want(sitemap.includes(`from "@/lib/sun/list"`), 'app/sitemap.ts: import { CELLS as SUN_CELLS, slugOf as sunSlug } from "@/lib/sun/list";');
  want(/\/sun`, changeFrequency: weekly, priority: 0\.85/.test(sitemap), 'app/sitemap.ts: 허브 줄(우선순위 0.85)');
  want(/SUN_CELLS\.map/.test(sitemap), 'app/sitemap.ts: 낱장 줄(SUN_CELLS.map)');

  const idx = read('lib', 'search-index.ts');
  want(idx.includes(`from './sun/list.ts'`), "lib/search-index.ts: import { CELLS as SUN_CELLS, SUN_ICON, slugOf as sunSlug } from './sun/list.ts';");
  want(idx.includes(`from './sun/facts.ts'`), "lib/search-index.ts: import { sunFacts } from './sun/facts.ts';");
  want(/export type Section =[^;]*'sun'/.test(idx), "lib/search-index.ts: Section 합집합에 | 'sun'");
  want(idx.includes(`section: 'sun' as const`), "lib/search-index.ts: 낱장 항목의 section: 'sun' as const");
  want(idx.includes(`{ href: '/sun',`), "lib/search-index.ts: 허브 항목 { href: '/sun', … }");
  want(/sun:\s*\{ label:/.test(idx), 'lib/search-index.ts SECTION_META: sun: { label: …, icon: …, accent: … }');

  const home = read('lib', 'locale-home.ts');
  want(home.includes(`route: '/sun'`), "lib/locale-home.ts: route: '/sun' 카드(아홉 언어 문구)");
  const koHome = read('app', '(ko)', 'page.tsx');
  want(koHome.includes(`href: '/sun'`), "app/(ko)/page.tsx: href: '/sun' 카드");

  for (const lang of LANG_CODES) {
    want(CARD_KEYS[lang].includes('sun'), `lib/og-cards/keys.ts: ${lang} 배열에 'sun'`);
    const card = read('lib', 'og-cards', `${lang}.tsx`);
    want(card.includes(`'sun': () => sunHub('${lang}')`), `lib/og-cards/${lang}.tsx: 'sun': () => sunHub('${lang}'),`);
  }

  assert.deepEqual(missing, [], `배선이 빠졌다 (${missing.length}곳):\n  ${missing.join('\n  ')}`);
});

test('사이트맵에 실릴 장수가 허브 1 + 낱장 224의 열 언어다', () => {
  assert.equal(SUN_SLUGS.length, 224);
  assert.equal(LANGS.length, 10);
  assert.equal((1 + SUN_SLUGS.length) * LANGS.length, 2250);
});

test('열 언어 모두 문구가 채워져 있다', () => {
  for (const lang of LANG_CODES) {
    const ui = SUN_UI[lang];
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
    // 셈의 전제 넷 — 적위·낮 길이·그림자·어림은 길게 밝혀야 한다
    assert.ok(ui.declNote.length >= floor * 6, `${lang}: 적위 설명이 짧다`);
    assert.ok(ui.dayNote.length >= floor * 6, `${lang}: 낮 길이 설명이 짧다`);
    assert.ok(ui.shadowNote.length >= floor * 6, `${lang}: 그림자 설명이 짧다`);
    assert.ok(ui.approxNote.length >= floor * 6, `${lang}: 어림 설명이 짧다`);
    // 절기 이름 넷과 상태 낱말이 다 있어야 한다
    for (const k of ['marEquinox', 'junSolstice', 'sepEquinox', 'decSolstice'] as const) {
      assert.ok(ui.turns[k].trim().length > 0, `${lang}: 절기 ${k} 이름이 없다`);
    }
    assert.ok(ui.midnightSun.trim() && ui.polarNight.trim() && ui.noShadow.trim(), `${lang}: 백야·극야 낱말이 없다`);
  }
});

test('문구가 코드와 같은 기울기를 말한다', () => {
  /*
   * 문장은 23.44°를 손으로 적어 두었고 셈은 AXIAL_TILT를 쓴다. 코드만 고치면
   * 화면은 옛 숫자를 계속 말하므로, 두 곳을 여기서 묶어 둔다 — 소수점 기호까지
   * 그 언어의 규칙으로 본다.
   */
  for (const lang of LANG_CODES) {
    const tilt = fmtNum(lang, AXIAL_TILT);
    assert.ok(SUN_UI[lang].how[0].includes(tilt), `${lang}: 알아 둘 것 첫 줄에 ${tilt}가 없다`);
    assert.ok(SUN_UI[lang].declNote.includes(tilt), `${lang}: 적위 설명에 ${tilt}가 없다`);
  }
  /*
   * 큰 제목이 "북위 40° 하지의 낮은 14시간 51분"이라고 말한다. 그 값은 계산에서
   * 나오는 것이라, 축이나 식이 바뀌면 제목이 먼저 거짓이 된다 — 열 언어를 함께 본다.
   */
  const headline = facts('lat40-jun21');
  for (const lang of LANG_CODES) {
    const day = dayLengthText(lang, headline);
    assert.ok(SUN_UI[lang].hubTitle.includes(day), `${lang}: 큰 제목이 ${day}와 다른 값을 말한다 — ${SUN_UI[lang].hubTitle}`);
  }
});

test('어림이라 뺀 것을 열 언어가 모두 밝힌다', () => {
  /*
   * 이 표의 일출 시각은 시계에 맞춰 쓸 값이 아니다. 그 사실이 한 언어에서만
   * 빠지면 그 언어 독자만 속는다 — 그래서 굴절과 균시차를 가리키는 낱말이
   * 열 언어의 approxNote에 다 들어 있는지 센다.
   */
  const WORDS: Record<string, string[]> = {
    ko: ['굴절', '균시차'],
    en: ['refraction', 'equation of time'],
    es: ['refracción', 'ecuación del tiempo'],
    pt: ['refração', 'equação do tempo'],
    ja: ['大気差', '均時差'],
    de: ['Refraktion', 'Zeitgleichung'],
    fr: ['réfraction', 'équation du temps'],
    hi: ['अपवर्तन', 'समय समीकरण'],
    zh: ['折射', '时差方程'],
    tw: ['折射', '時差方程'],
  };
  for (const lang of LANG_CODES) {
    const note = SUN_UI[lang].approxNote;
    for (const w of WORDS[lang]) {
      assert.ok(note.includes(w), `${lang}: approxNote에 "${w}"가 없다`);
    }
  }
});

/** 그 언어 화면에 나가는 문장 전부 */
const stringsOf = (lang: (typeof LANG_CODES)[number]): string[] => {
  const ui = SUN_UI[lang];
  return [
    ...Object.values(ui).filter((v): v is string => typeof v === 'string'),
    ...Object.values(ui.turns),
    ...ui.how,
    ...ui.hubFaq.flatMap(q => [q.q, q.a]),
    ...SHOWN.flatMap(f => [
      ui.desc(f), ui.metaTitle(f), ui.metaDesc(f),
      cellName(lang, f), dayLengthText(lang, f), riseSetText(lang, f), shadowText(lang, f), noonSideText(lang, f),
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
   * 섹션 그림은 카드와 목록이 쓰는 SUN_ICON 하나뿐이다. 문장에 이모지가 섞이면
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
   * 73.44와 73,44는 같은 값이지만 한 화면에 둘이 섞이면 다른 값처럼 읽힌다.
   * 표는 fmtNum이 찍고 본문은 ui.ts가 찍으므로, 두 곳이 같은 규칙인지 본다.
   */
  assert.equal(fmtNum('de', 73.44), '73,44');
  assert.equal(fmtNum('fr', 0.301), '0,301');
  assert.equal(fmtNum('en', 73.44), '73.44');
  assert.equal(fmtNum('ko', 23.44), '23.44');
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
    const ui = SUN_UI[lang];
    const n = (x: number) => fmtNum(lang, x);
    for (const f of SHOWN) {
      assert.ok(ui.desc(f).includes(n(f.noonAltitude)), `${lang}: desc에 정오 고도가 없다`);
      assert.ok(ui.desc(f).includes(n(f.declination)), `${lang}: desc에 적위가 없다`);
      assert.ok(ui.desc(f).includes(dayLengthText(lang, f)), `${lang}: desc에 낮 길이가 없다`);
      assert.ok(ui.metaTitle(f).includes(n(f.noonAltitude)), `${lang}: metaTitle에 고도가 없다`);
      assert.ok(ui.metaTitle(f).includes(latName(lang, f.cell.lat)), `${lang}: metaTitle에 위도 이름이 없다`);
      assert.ok(ui.metaTitle(f).includes(dateName(lang, f.day)), `${lang}: metaTitle에 날짜가 없다`);
      assert.ok(ui.metaDesc(f).includes(shadowText(lang, f)), `${lang}: metaDesc에 그림자가 없다`);
      assert.ok(ui.metaDesc(f).includes(riseSetText(lang, f)), `${lang}: metaDesc에 일출·일몰이 없다`);
      assert.ok(ui.metaDesc(f).includes(String(f.n)), `${lang}: metaDesc에 그 해의 몇 번째 날이 없다`);
      // 낮 길이 질문은 백야·극야에서 시각을 지어내지 않아야 한다
      const dayAnswer = ui.cellFaq(f)[1].a;
      if (f.polar) {
        assert.ok(!/\d\d:\d\d/.test(dayAnswer), `${lang}: ${f.slug}의 답이 없는 시각을 적었다 — ${dayAnswer}`);
      } else {
        assert.ok(dayAnswer.includes(f.sunrise!), `${lang}: ${f.slug}의 답에 일출 시각이 없다`);
        assert.ok(dayAnswer.includes(f.sunset!), `${lang}: ${f.slug}의 답에 일몰 시각이 없다`);
      }
      // 그림자 질문도 마찬가지 — 해가 안 뜨는 칸에는 길이를 적지 않는다
      const shadowAnswer = ui.cellFaq(f)[2].a;
      if (f.shadow === null) {
        /* 길이를 지어냈는지 본다 — 숫자에 붙은 단위만 잡는다("al mediodía"의 m이 아니다) */
        assert.ok(!/\d\s?(m\b|미터|米|公尺|मीटर)/.test(shadowAnswer), `${lang}: ${f.slug}의 답이 없는 그림자를 적었다 — ${shadowAnswer}`);
      } else {
        assert.ok(shadowAnswer.includes(n(f.shadow)), `${lang}: ${f.slug}의 답에 그림자 길이가 없다`);
      }
    }
    assert.notEqual(ui.desc(SHOWN[0]), ui.desc(SHOWN[1]), lang);
  }
});

test('위도와 날짜 이름이 224칸에 빠짐없이 붙는다', () => {
  for (const lang of LANG_CODES) {
    const names = new Set<string>();
    for (const c of CELLS) {
      const f = sunFacts(c);
      const name = cellName(lang, f);
      assert.ok(name.trim().length > 0, `${lang} ${f.slug}: 이름이 비었다`);
      assert.ok(!name.includes('undefined'), `${lang} ${f.slug}: 이름에 undefined가 있다 — ${name}`);
      names.add(name);
    }
    assert.equal(names.size, CELLS.length, `${lang}: 칸 이름이 겹친다`);
  }
  // 적도와 남반구를 언어마다 제 말로 부른다
  assert.equal(latName('ko', 0), '적도');
  assert.equal(latName('en', -30), '30°S');
  assert.equal(latName('ja', 70), '北緯70度');
  assert.equal(dateName('en', facts('lat40-jun21').day), 'June 21');
  assert.equal(dateName('de', facts('lat40-jun21').day), '21. Juni');
});

test('열 언어 제목이 언어를 통틀어 유일하다', () => {
  /*
   * 같은 제목이 두 장에 붙으면 검색 결과에서 어느 쪽인지 가릴 수 없다. 언어를
   * 가로질러 세는 것은, 번역을 옮겨 적다 원문이 그대로 남는 실수를 잡기 위해서다.
   */
  const titles: string[] = [];
  for (const lang of LANG_CODES) {
    const ui = SUN_UI[lang];
    titles.push(ui.hubTitle, ui.hubMetaTitle);
    for (const c of CELLS) titles.push(ui.metaTitle(sunFacts(c)));
  }
  const seen = new Map<string, number>();
  for (const t of titles) seen.set(t, (seen.get(t) ?? 0) + 1);
  const dup = [...seen].filter(([, n]) => n > 1).map(([t]) => t);
  assert.deepEqual(dup, [], `제목이 겹친다: ${dup.slice(0, 3).join(' / ')}`);
  assert.equal(titles.length, (CELLS.length + 2) * 10);
});
