import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import { DENSE, hanProblem } from './han.ts';
import { APP_DIR } from './app-path.ts';
import { LANG_CODES, localeOfLang, type Lang } from '../lib/i18n/lang.ts';
import { ALL_LOCALES10, localeTag } from '../lib/locales.ts';
import {
  ADS_SETTINGS_URL, LEGAL_CHROME, LEGAL_EMAIL, LEGAL_KINDS, LEGAL_LOOK, LEGAL_REVISED,
  legalCopy, legalMetadata, legalRoute, legalRoutes, type LegalCopy, type LegalKind,
} from '../lib/legal/index.ts';

/**
 * 소개·문의·개인정보 처리방침·이용약관 — 애드센스가 반드시 보는 네 장.
 *
 * ── 무엇이 조용히 깨지나 ───────────────────────────────────────
 * 이 네 장은 사람이 거의 안 열어 본다. 그래서 다음 셋이 다 조용하다.
 *  1. 라우트 파일 한 장이 빠져도 그 언어에서만 404다. 빌드는 통과한다.
 *  2. 열 언어 문구 가운데 한 언어가 영어 원문으로 남아도 타입은 string이라
 *     통과하고, 화면도 글자가 있으니 멀쩡해 보인다.
 *  3. 광고·쿠키 고지가 한 언어에서 빠지면 그 언어에서 애드센스 정책 위반이
 *     되는데, 그 사실을 알려 주는 것은 아무것도 없다.
 * 그래서 값을 직접 센다 — 파일이 있는지, 글자가 그 언어인지, 고지가 열 언어에
 * 다 있는지, 길이가 하한을 넘는지.
 *
 * 날짜와 이메일은 상수 하나씩이다. 열 언어 문구에 흩어지면 한 곳이 남고,
 * 그 언어만 옛 개정일이나 죽은 주소를 주장한다. 그 자리도 아래에서 본다.
 */

const ROOT = join(import.meta.dirname, '..');
const LEGAL_DIR = join(ROOT, 'lib', 'legal');

/** 그 갈래·언어의 라우트 파일 경로 — 한국어는 앞머리가 없다 */
function pageFile(locale: string, kind: LegalKind): string {
  return locale === 'ko'
    ? join(APP_DIR, '(ko)', kind, 'page.tsx')
    : join(APP_DIR, `(${locale})`, locale, kind, 'page.tsx');
}

/** 화면에 글자로 나가는 것 전부 — 길이와 글자체를 볼 때 쓴다 */
function allText(c: LegalCopy): string {
  return [
    c.title, c.description, c.h1, c.lead,
    ...c.sections.flatMap(s => [s.h2, ...s.body, ...(s.list ?? [])]),
  ].join(' ');
}

const PAIRS: { kind: LegalKind; lang: Lang }[] =
  LEGAL_KINDS.flatMap(kind => LANG_CODES.map(lang => ({ kind, lang })));

test('검사가 볼 것이 실제로 마흔 짝이다', () => {
  // 목록이 비면 아래 검사가 전부 초록으로 통과한다 — 그것부터 막는다
  assert.equal(LEGAL_KINDS.length, 4, `갈래가 ${LEGAL_KINDS.length}개다`);
  assert.equal(LANG_CODES.length, 10, `언어가 ${LANG_CODES.length}개다`);
  assert.equal(PAIRS.length, 40);
  assert.deepEqual([...LEGAL_KINDS], ['about', 'contact', 'privacy', 'terms']);
});

test('마흔 장의 라우트 파일이 실재한다', () => {
  const missing: string[] = [];
  for (const kind of LEGAL_KINDS) {
    for (const locale of ALL_LOCALES10) {
      if (!existsSync(pageFile(locale, kind))) missing.push(`${locale}/${kind}`);
    }
  }
  assert.deepEqual(missing, [], `라우트 파일이 없다 — 그 언어에서 404다:\n  ${missing.join('\n  ')}`);
});

test('라우트 파일이 제 갈래·제 언어를 넘긴다', () => {
  /*
   * 40장을 기계로 만들었으므로 베끼다 한 칸이 남는 실수가 곧 나온다 —
   * app/(de)/de/terms가 locale="fr"을 넘기면 독일어 주소에 프랑스어 약관이
   * 뜨고, canonical은 프랑스어를 가리킨다. 화면도 빌드도 멀쩡하다.
   */
  const bad: string[] = [];
  for (const kind of LEGAL_KINDS) {
    for (const locale of ALL_LOCALES10) {
      const src = readFileSync(pageFile(locale, kind), 'utf8');
      if (!src.includes(`legalMetadata('${kind}', '${locale}')`)) bad.push(`${locale}/${kind}: metadata 인자가 다르다`);
      if (!src.includes(`kind="${kind}"`)) bad.push(`${locale}/${kind}: kind가 다르다`);
      if (!src.includes(`locale="${locale}"`)) bad.push(`${locale}/${kind}: locale이 다르다`);
    }
  }
  assert.deepEqual(bad, [], `라우트 파일이 남의 갈래·언어를 그린다:\n  ${bad.join('\n  ')}`);
});

test('마흔 장이 metadata와 canonical·hreflang을 갖는다', () => {
  const bad: string[] = [];
  for (const kind of LEGAL_KINDS) {
    for (const locale of ALL_LOCALES10) {
      const m = legalMetadata(kind, locale);
      const want = locale === 'ko' ? `/${kind}` : `/${locale}/${kind}`;
      if (!m.title) bad.push(`${locale}/${kind}: title이 없다`);
      if (!m.description) bad.push(`${locale}/${kind}: description이 없다`);
      if (m.alternates?.canonical !== want) bad.push(`${locale}/${kind}: canonical이 ${m.alternates?.canonical}`);

      const langs = m.alternates?.languages as Record<string, string> | undefined;
      // 열 언어가 서로를 가리켜야 짝으로 인정된다 — 한쪽만 걸리면 묶음이 무시된다
      for (const l of ALL_LOCALES10) {
        const tag = localeTag(l);
        const expected = l === 'ko' ? `/${kind}` : `/${l}/${kind}`;
        if (langs?.[tag] !== expected) bad.push(`${locale}/${kind}: hreflang ${tag}가 ${langs?.[tag]}`);
      }
      if (langs?.['x-default'] !== `/en/${kind}`) bad.push(`${locale}/${kind}: x-default가 ${langs?.['x-default']}`);
    }
  }
  assert.deepEqual(bad, [], `메타데이터가 어긋난다:\n  ${bad.join('\n  ')}`);
});

test('공유 카드가 붙는다 — 첫 화면 카드를 물려받는다', () => {
  /*
   * 네 장은 제 카드가 없다. SNS로 공유되는 물건이 아니고, 공유될 때 보여야 하는
   * 것은 "vixutil이라는 사이트"라서 첫 화면 카드가 맞다. 다만 **아무 카드도 안
   * 붙는 것**과는 다르다 — canonical을 빼먹으면 withCard가 조용히 아무것도 안
   * 붙이므로, 붙은 주소가 그 언어의 첫 화면 카드인지 확인한다.
   */
  const bad: string[] = [];
  for (const kind of LEGAL_KINDS) {
    for (const lang of LANG_CODES) {
      const locale = localeOfLang(lang);
      const m = legalMetadata(kind, locale);
      const images = m.openGraph?.images as { url: string }[] | undefined;
      const seg = lang === 'ko' ? 'ko' : locale;
      if (images?.[0]?.url !== `/og/${seg}`) bad.push(`${locale}/${kind}: og:image가 ${images?.[0]?.url}`);
    }
  }
  assert.deepEqual(bad, [], `공유 카드가 안 붙었다:\n  ${bad.join('\n  ')}`);
});

test('열 언어 문구가 비어 있지 않다', () => {
  const bad: string[] = [];
  for (const { kind, lang } of PAIRS) {
    const c = legalCopy(kind, lang);
    for (const [name, v] of [['title', c.title], ['description', c.description], ['h1', c.h1], ['lead', c.lead]]) {
      if (!v || !v.trim()) bad.push(`${kind}.${lang}.${name}이 비었다`);
    }
    if (c.sections.length < 4) bad.push(`${kind}.${lang}: 항목이 ${c.sections.length}개뿐이다`);
    c.sections.forEach((s, i) => {
      if (!s.h2.trim()) bad.push(`${kind}.${lang}.sections[${i}].h2가 비었다`);
      if (!s.body.length || s.body.some(p => !p.trim())) bad.push(`${kind}.${lang}.sections[${i}].body가 비었다`);
      if (s.list && s.list.some(x => !x.trim())) bad.push(`${kind}.${lang}.sections[${i}].list에 빈 줄이 있다`);
    });
  }
  assert.deepEqual(bad, [], `문구가 비었다:\n  ${bad.join('\n  ')}`);
});

test('언어마다 같은 구조다 — 한 언어에서 항목이 빠지지 않았다', () => {
  /*
   * 번역을 옮기다 문단이나 목록 한 줄이 빠지는 실수가 가장 흔하다. 그 언어만
   * 짧아지는데, 길이 하한은 넉넉하게 잡혀 있어 걸리지 않는다. 한국어를 기준으로
   * 모양을 맞대면 빠진 자리를 정확히 짚을 수 있다.
   */
  const bad: string[] = [];
  for (const kind of LEGAL_KINDS) {
    const base = legalCopy(kind, 'ko');
    const shape = (c: LegalCopy) => c.sections.map(s => `${s.body.length}/${s.list?.length ?? 0}`).join(' ');
    for (const lang of LANG_CODES) {
      const c = legalCopy(kind, lang);
      if (c.sections.length !== base.sections.length) {
        bad.push(`${kind}.${lang}: 항목 ${c.sections.length}개 (한국어는 ${base.sections.length}개)`);
        continue;
      }
      if (shape(c) !== shape(base)) bad.push(`${kind}.${lang}: 문단·목록 수가 다르다 — ${shape(c)} vs ${shape(base)}`);
      // mail·ads 자리가 어긋나면 그 언어에서만 메일 주소나 광고 설정 링크가 사라진다
      c.sections.forEach((s, i) => {
        if (!!s.mail !== !!base.sections[i].mail) bad.push(`${kind}.${lang}.sections[${i}]: mail 자리가 한국어와 다르다`);
        if (!!s.ads !== !!base.sections[i].ads) bad.push(`${kind}.${lang}.sections[${i}]: ads 자리가 한국어와 다르다`);
      });
    }
  }
  assert.deepEqual(bad, [], `언어마다 구조가 다르다:\n  ${bad.join('\n  ')}`);
});

test('간체와 번체에 반대쪽 글자가 섞이지 않았다', () => {
  const bad: string[] = [];
  for (const kind of LEGAL_KINDS) {
    for (const lang of ['zh', 'tw'] as Lang[]) {
      const p = hanProblem(lang, allText(legalCopy(kind, lang)));
      if (p) bad.push(`${kind} — ${p}`);
    }
  }
  assert.deepEqual(bad, [], `글자체가 섞였다:\n  ${bad.join('\n  ')}`);
});

test('화면의 낱말도 간체·번체가 섞이지 않았다', () => {
  const bad: string[] = [];
  for (const lang of ['zh', 'tw'] as Lang[]) {
    const c = LEGAL_CHROME[lang];
    const p = hanProblem(lang, [c.home, c.revised, c.mailLabel, ...LEGAL_KINDS.map(k => c.nav[k])].join(' '));
    if (p) bad.push(p);
  }
  assert.deepEqual(bad, [], `화면 낱말에 글자체가 섞였다:\n  ${bad.join('\n  ')}`);
});

/**
 * 길이 하한.
 *
 * 애드센스 심사에서 정책 문서가 한두 줄이면 없는 것과 같이 읽힌다. 그래서 한 장에
 * 실제 내용이 있는지 길이로 본다. 하한의 목적은 문장이 아예 안 만들어진 것과
 * 영어 원문을 지우고 빈 채로 둔 것을 잡는 데 있지, 길이를 재는 데 있지 않다.
 *
 * 한글·가나·한자는 같은 내용을 로마자의 절반 남짓으로 적으므로 DENSE 층을 둔다 —
 * 하한을 하나로 두면 멀쩡한 중국어 문서가 걸린다.
 *
 * DENSE 안에서 한 층을 더 갈랐다. 처음에는 DENSE 하나로 뒀는데, 그 하한을 정하는
 * 것이 가장 짧은 중국어(문의 648자)라서 **일본어를 셋으로 줄여도 통과했다** —
 * 일부러 깨뜨려 보고 알았다. 지금 잰 값이 근거다.
 *
 *   로마자   영어 2,163〜3,296 · 힌디 1,931〜2,964   → 하한 1,100
 *   한글·가나 한국어 1,007〜1,443 · 일본어 923〜1,359 → 하한   850
 *   한자     중국어 648〜967                        → 하한   600
 *
 * 여유가 넉넉하지 않은 것은 일부러다. 글이 이보다 짧아지는 일은 문단을 지우거나
 * 토막으로 남겼을 때뿐이고, 그것이 바로 잡아야 하는 것이다.
 */
const MIN_CHARS = 1_100;
const MIN_CHARS_KANA = 850;
const MIN_CHARS_HAN = 600;

/** 한 글자가 한 낱말인 데다 조사도 없는 쪽 — DENSE 안에서 다시 갈린다 */
const HAN_ONLY = new Set<Lang>(['zh', 'tw']);

test('문구가 언어마다 최소 길이를 넘는다', () => {
  const short: string[] = [];
  for (const { kind, lang } of PAIRS) {
    const n = allText(legalCopy(kind, lang)).length;
    const min = HAN_ONLY.has(lang) ? MIN_CHARS_HAN : DENSE.has(lang) ? MIN_CHARS_KANA : MIN_CHARS;
    if (n < min) short.push(`${kind}.${lang}: ${n}자 (하한 ${min})`);
  }
  assert.deepEqual(short, [], `내용이 모자란다 — 빈 껍데기는 없는 것보다 나쁘다:\n  ${short.join('\n  ')}`);
});

test('본문이 h1 하나와 h2 여럿으로 구조를 갖는다', () => {
  const src = readFileSync(join(ROOT, 'components', 'LegalPage.tsx'), 'utf8');
  assert.equal((src.match(/<h1/g) ?? []).length, 1, 'h1이 하나가 아니다');
  assert.match(src, /<h2/, 'h2가 없다 — 항목 제목이 문단으로 흘러간다');
  // 항목마다 h2가 하나씩 나가야 한다. 갈래마다 넷 이상은 위 검사가 이미 봤다
  for (const { kind, lang } of PAIRS) {
    const hs = legalCopy(kind, lang).sections.map(s => s.h2);
    assert.equal(new Set(hs).size, hs.length, `${kind}.${lang}: 같은 h2가 두 번 있다 — key가 겹쳐 화면에서 한쪽이 사라진다`);
  }
});

/** 언어별 "쿠키"를 뭐라고 적는가 — 없는 언어가 있으면 그 언어에서 고지가 끊긴다 */
const COOKIE_WORD: Record<Lang, string> = {
  ko: '쿠키', en: 'cookie', es: 'cookie', pt: 'cookie', ja: 'クッキー',
  de: 'Cookie', fr: 'cookie', hi: 'कुकी', zh: 'Cookie', tw: 'Cookie',
};

test('개인정보 처리방침에 애드센스·쿠키 고지가 열 언어에 다 있다', () => {
  /*
   * 애드센스를 쓰는 사이트가 밝혀야 하는 것은 넷이다 — 제3자가 광고를 게재한다,
   * 그들이 쿠키로 방문 기록에 기반한 광고를 보여 준다, 개인 맞춤 광고를 끌 수
   * 있다, 브라우저에서 쿠키를 차단할 수 있다. 한 언어에서 빠지면 그 언어에서만
   * 정책을 안 지키는 상태가 되고, 알려 주는 것이 아무것도 없다.
   */
  const bad: string[] = [];
  for (const lang of LANG_CODES) {
    const c = legalCopy('privacy', lang);
    const text = allText(c);
    if (!text.includes('AdSense')) bad.push(`${lang}: AdSense를 밝히지 않았다`);
    if (!text.toLowerCase().includes(COOKIE_WORD[lang].toLowerCase())) bad.push(`${lang}: 쿠키(${COOKIE_WORD[lang]})를 밝히지 않았다`);
    if (!text.includes('Google')) bad.push(`${lang}: 제3자 공급업체(구글)를 밝히지 않았다`);

    const ads = c.sections.filter(s => s.ads);
    if (ads.length !== 1) bad.push(`${lang}: 광고 항목이 ${ads.length}개다 — 광고 설정 링크가 붙는 자리다`);
    // 네 가지 고지를 목록으로 둔다. 문단으로 풀어 쓰면 하나가 빠져도 안 보인다
    const items = ads[0]?.list ?? [];
    if (items.length < 4) bad.push(`${lang}: 광고 고지가 ${items.length}줄뿐이다 (제3자 게재·쿠키·맞춤 끄기·차단)`);
    const cookieLines = items.filter(x => x.toLowerCase().includes(COOKIE_WORD[lang].toLowerCase())).length;
    if (cookieLines < 2) bad.push(`${lang}: 쿠키를 말하는 줄이 ${cookieLines}개뿐이다 — 게재와 차단 둘 다 밝혀야 한다`);
  }
  assert.deepEqual(bad, [], `애드센스 고지가 빠졌다:\n  ${bad.join('\n  ')}`);
});

test('광고 설정 주소가 상수 하나이고 화면이 그것을 건다', () => {
  assert.match(ADS_SETTINGS_URL, /^https:\/\/www\.google\.com\/settings\/ads$/);
  const view = readFileSync(join(ROOT, 'components', 'LegalPage.tsx'), 'utf8');
  assert.match(view, /href=\{ADS_SETTINGS_URL\}/, '화면이 상수를 안 건다 — 언어마다 주소를 적으면 한 곳이 죽는다');
  // 문구 파일에 주소가 글자로 흩어져 있으면 상수를 고쳐도 그쪽은 안 바뀐다
  const strays: string[] = [];
  for (const f of ['about.ts', 'contact.ts', 'privacy.ts', 'terms.ts']) {
    if (/google\.com\/settings\/ads/.test(readFileSync(join(LEGAL_DIR, f), 'utf8'))) strays.push(f);
  }
  assert.deepEqual(strays, [], `문구에 광고 설정 주소가 글자로 적혀 있다: ${strays.join(', ')}`);
});

test('문의 메일이 상수 하나다', () => {
  assert.equal(LEGAL_EMAIL, 'jadexqz0@gmail.com');
  const contact = legalCopy('contact', 'ko');
  assert.ok(contact.sections.some(s => s.mail), '문의 페이지에 메일 자리가 없다');
  const strays: string[] = [];
  for (const f of ['about.ts', 'contact.ts', 'privacy.ts', 'terms.ts']) {
    if (readFileSync(join(LEGAL_DIR, f), 'utf8').includes(LEGAL_EMAIL)) strays.push(f);
  }
  assert.deepEqual(strays, [], `문구에 메일 주소가 글자로 적혀 있다 — 바꿀 때 한 곳이 남는다: ${strays.join(', ')}`);
});

test('개정일이 상수 하나이고 문구에 날짜가 박혀 있지 않다', () => {
  assert.match(LEGAL_REVISED, /^\d{4}-\d{2}-\d{2}$/, '개정일 꼴이 아니다');

  /* 날짜가 문구로 흩어지면 한 언어만 옛 날짜를 주장한다 — 정책 문서에서는 내용이 갈리는 것과 같다 */
  const bad: string[] = [];
  const files = ['about.ts', 'contact.ts', 'privacy.ts', 'terms.ts', 'index.ts']
    .map(f => [f, join(LEGAL_DIR, f)] as const)
    .concat([['components/LegalPage.tsx', join(ROOT, 'components', 'LegalPage.tsx')]]);
  for (const [name, path] of files) {
    const src = readFileSync(path, 'utf8');
    for (const m of src.matchAll(/\d{4}-\d{2}-\d{2}|\b20\d{2}\b/g)) {
      // 주석에 적은 날짜는 문구가 아니다 — 화면에 나가는 문자열만 본다
      const line = src.slice(src.lastIndexOf('\n', m.index) + 1, src.indexOf('\n', m.index));
      if (/^\s*(\*|\/\*|\/\/)/.test(line)) continue;
      bad.push(`${name}: ${m[0]}`);
    }
  }
  assert.deepEqual(bad, [], `문구에 날짜가 박혀 있다 — LEGAL_REVISED 하나만 쓰라:\n  ${bad.join('\n  ')}`);

  const view = readFileSync(join(ROOT, 'components', 'LegalPage.tsx'), 'utf8');
  assert.match(view, /\{LEGAL_REVISED\}/, '화면이 상수를 안 쓴다');
  for (const lang of LANG_CODES) {
    assert.ok(LEGAL_CHROME[lang].revised.trim(), `${lang}: 개정일 이름표가 비었다`);
  }
});

test('푸터가 네 주소를 모두 가리킨다', () => {
  const src = readFileSync(join(ROOT, 'components', 'SiteFooter.tsx'), 'utf8');
  /*
   * 주소를 푸터에 손으로 적으면 열 언어 가운데 한 곳이 빠지거나 한국어 주소를
   * 그대로 내보낸다(SECTIONS_EN이 생긴 사정과 같다). 그래서 갈래 목록을 돌며
   * localeHref로 만드는지 원문에서 확인한다 — 갈래 목록이 넷인 것과 그 넷에
   * 라우트 파일이 있는 것은 위 검사들이 이미 봤다.
   */
  assert.match(src, /from '@\/lib\/legal\/common'/, '푸터가 lib/legal을 안 본다');
  assert.match(src, /LEGAL_KINDS\.map/, '푸터가 갈래 목록을 안 돈다 — 손으로 적으면 한 장이 빠진다');
  assert.match(src, /localeHref\(lang, legalRoute\(/, '푸터가 그 언어의 주소를 만들지 않는다');
  assert.match(src, /legalNav\[k\]/, '푸터가 그 언어의 이름을 안 쓴다');
});

test('푸터 이름표가 열 언어에 다 있다', () => {
  const bad: string[] = [];
  for (const lang of LANG_CODES) {
    for (const kind of LEGAL_KINDS) {
      const v = LEGAL_CHROME[lang].nav[kind];
      if (!v || !v.trim()) bad.push(`${lang}.${kind}이 비었다`);
      // 푸터 한 줄에 넷이 들어간다 — 문장을 적으면 줄이 넘친다
      if (v && v.length > 24) bad.push(`${lang}.${kind}: ${v.length}자로 너무 길다`);
    }
    if (!LEGAL_CHROME[lang].home.trim()) bad.push(`${lang}.home이 비었다`);
    if (!LEGAL_CHROME[lang].mailLabel.trim()) bad.push(`${lang}.mailLabel이 비었다`);
  }
  assert.deepEqual(bad, [], `푸터·머리글 낱말이 비었다:\n  ${bad.join('\n  ')}`);
});

test('갈래마다 다른 색이고 PageGlow가 아는 이름이다', () => {
  const glow = readFileSync(join(ROOT, 'components', 'PageGlow.tsx'), 'utf8');
  const known = new Set([...glow.matchAll(/^ {2}(\w+):\s*\[/gm)].map(m => m[1]));
  const accents = LEGAL_KINDS.map(k => LEGAL_LOOK[k].accent);
  assert.equal(new Set(accents).size, accents.length, '갈래끼리 색이 같다 — 옮겨 다닐 때 화면이 안 바뀐 것처럼 보인다');
  for (const a of accents) assert.ok(known.has(a), `PageGlow가 모르는 accent: ${a}`);
});

test('사이트맵에 걸 주소 마흔 개를 낸다', () => {
  /*
   * 배선(app/sitemap.ts)은 이 목록을 그대로 쓴다. 여기서 세는 이유는, 목록이
   * 줄어도 라우트 파일은 남아 있어 빌드가 통과하기 때문이다 — 사이트맵에서만
   * 빠지고, 구글은 그 장을 늦게 찾거나 못 찾는다.
   */
  const routes = legalRoutes();
  assert.equal(routes.length, 40, `주소가 ${routes.length}개다`);
  assert.equal(new Set(routes).size, 40, '주소가 겹친다');
  for (const kind of LEGAL_KINDS) {
    assert.ok(routes.includes(`/${kind}`), `한국어 /${kind}가 없다`);
    assert.ok(routes.includes(`/zh-hant${legalRoute(kind)}`), `번체 /${kind}가 없다`);
  }
});
