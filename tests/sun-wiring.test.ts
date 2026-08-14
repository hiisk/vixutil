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
 * ── 2026-08-14: 낱장을 지웠다 ─────────────────────────────
 * 검색 수요가 없어 낱장 224칸(아홉 언어 껍데기·lib/fold/pages/sun__slug·lib/ko/pages·
 * 사이트맵/색인의 낱장 줄·components/sun/SunPage)을 통째로 지웠다. 허브 표가 같은
 * 값을 다 보여 주므로 화면에서 사라진 것은 없다. 그래서 아래 검사들은 낱장이 아니라
 * **허브** 기준으로 다시 세웠다 — 낱장이 있어야만 뜻이 있던 단언은 그 자리에 왜
 * 지웠는지를 남겨 두었다.
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
import { LANG_CODES } from '../lib/i18n/lang.ts';
import { CELLS, SUN_ICON, cellOf } from '../lib/sun/list.ts';
import { AXIAL_TILT, sunFacts } from '../lib/sun/facts.ts';
import {
  SUN_UI, cellName, dateName, dayLengthText, fmtNum, latName, noonSideText, riseSetText, shadowText,
} from '../lib/sun/ui.ts';
import { ICON_FOR } from '../lib/og-icon-map.ts';
import { CARD_KEYS } from '../lib/og-cards/keys.ts';
import { DENSE, hanProblem } from './han.ts';

const ROOT = join(import.meta.dirname, '..');

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

test('접힌 허브 모듈과 한국어 허브가 제자리에 있다', () => {
  assert.ok(existsSync(join(ROOT, 'lib', 'fold', 'pages', 'sun.tsx')), '허브 공유 모듈이 없다');
  // 한국어 허브는 접지 않는다 — 파일이 직접 있다
  assert.ok(existsSync(join(ROOT, 'app', '(ko)', 'sun', 'page.tsx')), '한국어 허브가 없다');
  /*
   * 지운 단언 ─ 낱장이 사라져 지킬 것이 없어졌다(2026-08-14):
   *   · lib/fold/pages/sun__slug.tsx 존재
   *   · 아홉 언어 app/(xx)/xx/sun/[slug]/page.tsx 껍데기 · build('xx') · revalidate=false
   *     · generateStaticParams — ISR 손잡이는 낱장에만 붙던 것이다
   *   · 한국어 낱장 모듈(lib/ko/pages/sun__slug.tsx)의 generateStaticParams·SUN_SLUGS
   * 아홉 언어 허브는 껍데기 파일이 아니라 캐치올이 굽는다 — 그 이어짐은 아래
   * '배선' 검사의 lib/fold/registry.ts 줄이 지킨다.
   */
});

test('허브가 자외선 섹션으로 이어진다', () => {
  /*
   * 태양 고도가 높으면 자외선이 세진다 — 같은 이야기의 다음 칸이 /uv다. 링크가
   * 빠지면 두 섹션이 서로 모르는 남이 된다.
   *
   * 낱장(components/sun/SunPage.tsx)에도 같은 링크가 있었으나 그 화면째 지웠다.
   * 남은 화면은 허브 하나라 허브만 본다.
   */
  const src = readFileSync(join(ROOT, 'components', 'sun', 'SunHubPage.tsx'), 'utf8');
  assert.match(src, /\$\{prefix\}\/uv/, 'SunHubPage.tsx에 /uv 링크가 없다');
  assert.match(src, /ui\.uvLink/, 'SunHubPage.tsx에 자외선 링크 문구가 없다');
  for (const lang of LANG_CODES) {
    assert.ok(SUN_UI[lang].uvLink.trim().length > 0, `${lang}: 자외선 링크 문구가 비었다`);
  }
});

test('배선 — 등록부·사이트맵·색인·홈·카드에 태양 허브가 걸려 있다', () => {
  /*
   * 여러 섹션이 함께 쓰는 파일이라 섹션을 만든 쪽에서 건드리지 않는다. 아래 목록이
   * 곧 넣어야 할 줄이고, 빠진 것은 이름으로 나온다.
   */
  const missing: string[] = [];
  const want = (ok: boolean, what: string) => {
    if (!ok) missing.push(what);
  };
  const read = (...p: string[]) => readFileSync(join(ROOT, ...p), 'utf8');

  /*
   * 지운 단언 ─ 낱장이 사라져 지킬 것이 없어졌다(2026-08-14):
   *   · lib/fold/registry.ts SLUG_ROUTES의 sun__slug
   *   · lib/ko/registry.ts KO_LEAVES의 sun__slug (한국어 허브는 파일이라 여기 안 걸린다)
   *   · app/sitemap.ts의 lib/sun/list import와 SUN_CELLS.map 낱장 줄
   *   · lib/search-index.ts의 sun/facts import와 낱장 항목 section: 'sun' as const
   * 허브 줄은 그대로 남아 아래에서 계속 본다.
   */
  const fold = read('lib', 'fold', 'registry.ts');
  want(fold.includes(`'sun': () => import('./pages/sun')`), "lib/fold/registry.ts STATIC_ROUTES: 'sun': () => import('./pages/sun'),");

  const sitemap = read('app', 'sitemap.ts');
  want(/\/sun`, changeFrequency: weekly, priority: 0\.85/.test(sitemap), 'app/sitemap.ts: 허브 줄(우선순위 0.85)');

  const idx = read('lib', 'search-index.ts');
  want(idx.includes(`from './sun/list.ts'`), "lib/search-index.ts: import { SUN_ICON } from './sun/list.ts';");
  want(/export type Section =[^;]*'sun'/.test(idx), "lib/search-index.ts: Section 합집합에 | 'sun'");
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

/*
 * 지운 검사 ─ '사이트맵에 실릴 장수가 허브 1 + 낱장 224의 열 언어다'(2026-08-14).
 * 낱장을 지운 뒤 사이트맵에 남은 것은 언어마다 허브 한 장뿐이라 SUN_SLUGS.length로
 * 세던 2,250장은 더 이상 사실이 아니다. 남기면 상수끼리 곱해 맞춰 보는, 아무것도
 * 안 지키는 초록 검사가 된다. 허브가 실제로 사이트맵에 걸렸는지는 바로 위 '배선'
 * 검사가 app/sitemap.ts의 /sun 줄로 본다.
 */

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

test('배선 여섯 곳이 다 있다', () => {
  /*
   * ── 이 파일 머리말이 "배선되면 넣어라"고 적어 둔 검사다 (2026-08-13에 넣었다) ──
   * 세 섹션(hardness·steel·sun)이 배선을 마쳤는데 머리말은 「아직 배선이 남았다」로
   * 남아 있었다. 실제로 여섯 곳이 다 채워진 것을 확인하고 약속대로 검사를 세운다.
   *
   * 한 줄만 빠져도 그 섹션은 조용히 죽는다 — 라우트는 열리는데 사이트맵·검색·홈
   * 어디에서도 안 걸려 사람도 크롤러도 못 찾는 상태가 된다.
   */
  const at = (p: string) => readFileSync(join(import.meta.dirname, '..', p), 'utf8');
  const S = 'sun';
  /*
   * 지운 두 곳 ─ 낱장을 지웠다(2026-08-14): lib/fold/registry.ts의 낱장 줄(sun__slug)과
   * lib/ko/registry.ts. 한국어 허브는 접지 않고 app/(ko)/sun/page.tsx 파일이라
   * ko 등록부에는 애초에 낱장만 걸려 있었다. 남은 여섯 곳이 허브가 걸리는 자리 전부다.
   */
  const places: [string, boolean][] = [
    ['lib/fold/registry.ts (허브)', at('lib/fold/registry.ts').includes(`'${S}':`)],
    ['app/sitemap.ts', at('app/sitemap.ts').includes(`/${S}`)],
    ['lib/search-index.ts', at('lib/search-index.ts').includes(`'${S}'`)],
    ['lib/locale-home.ts', at('lib/locale-home.ts').includes(`'/${S}'`)],
    ['app/(ko)/page.tsx', at('app/(ko)/page.tsx').includes(`'/${S}'`)],
    ['lib/og-cards/ko.tsx', at('lib/og-cards/ko.tsx').includes(`'${S}'`)],
  ];
  const missing = places.filter(([, ok]) => !ok).map(([name]) => name);
  assert.deepEqual(missing, [], `${S} 배선이 빠진 곳 ${missing.length}개 — 그 섹션이 사이트에서 조용히 사라진다`);
});
