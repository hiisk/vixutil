import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ALL_LOCALES, localeHref, localeTag } from '../lib/locales.ts';

/**
 * 번역이 있는 페이지가 여덟 언어를 서로 가리키는지 본다.
 *
 * hreflang은 짝이 맞아야 인정된다. /es/image가 /image를 가리키는데 /image가
 * /es/image를 가리키지 않으면 구글은 그 짝을 무시하고, 두 페이지를 서로 남남으로
 * 본다 — 최악의 경우 중복 페이지로 묶어 한쪽을 색인에서 뺀다.
 *
 * 이 검사가 없어서 한 번 놓쳤다. 새 언어를 만들 때 그쪽 라우트에는 여덟 언어 표를
 * 넣었지만, 이미 있던 한국어 라우트 73장은 'ko'와 'en' 두 줄만 든 옛 표를 그대로
 * 들고 있었다. 빌드도 테스트도 통과했고, 화면도 멀쩡했다. 빌드된 <head>를 직접
 * 읽어야만 드러나는 종류의 문제다.
 *
 * out/이 없으면 건너뛴다 — npm run build 뒤에만 의미가 있다.
 */
const OUT = join(import.meta.dirname, '..', 'out');
const built = existsSync(OUT);

/** 여덟 언어 모두에 페이지가 있는 섹션 */
const SECTIONS = ['convert', 'rate', 'color', 'image', 'sound', 'food', 'game', 'device', 'text', 'time'];

/** 그 언어의 그 경로에 해당하는 빌드 산출물 */
function pageFor(locale: (typeof ALL_LOCALES)[number], route: string): string {
  const href = localeHref(locale, route);
  return join(OUT, `${href === '/' ? 'index' : href.slice(1)}.html`);
}

/** <head>에 선언된 hreflang 값 — 속성 이름은 hrefLang으로 나온다(대소문자 무시) */
function hreflangs(file: string): string[] {
  const html = readFileSync(file, 'utf8');
  return [...html.matchAll(/hreflang="([^"]+)"/gi)].map(m => m[1]);
}

test('여덟 언어가 서로를 가리킨다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  const wrong: string[] = [];
  const want = ALL_LOCALES.map(l => localeTag(l));

  for (const sec of SECTIONS) {
    for (const locale of ALL_LOCALES) {
      const file = pageFor(locale, `/${sec}`);
      if (!existsSync(file)) { wrong.push(`${relative(OUT, file)}: 없다`); continue; }
      const tags = hreflangs(file);
      const missing = want.filter(t => !tags.includes(t));
      if (missing.length) wrong.push(`${relative(OUT, file)}: ${missing.join(', ')} 없음`);
      if (!tags.includes('x-default')) wrong.push(`${relative(OUT, file)}: x-default 없음`);
    }
  }

  assert.deepEqual(
    wrong.slice(0, 15), [],
    `hreflang이 여덟 언어를 다 가리키지 않는 페이지 ${wrong.length}장. ` +
    'metadata.alternates.languages에 alternateLanguages(경로)를 쓰라',
  );
});

test('canonical이 자기 주소를 가리킨다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  // canonical이 다른 언어를 가리키면 그 페이지는 색인에서 사라진다
  const wrong: string[] = [];
  for (const sec of SECTIONS) {
    for (const locale of ALL_LOCALES) {
      const file = pageFor(locale, `/${sec}`);
      if (!existsSync(file)) continue;
      const html = readFileSync(file, 'utf8');
      const canon = html.match(/rel="canonical" href="([^"]+)"/i)?.[1];
      const want = `https://vixutil.com${localeHref(locale, `/${sec}`)}`;
      if (canon !== want) wrong.push(`${relative(OUT, file)}: ${canon} (기대 ${want})`);
    }
  }
  assert.deepEqual(wrong.slice(0, 10), [], `canonical이 틀린 페이지 ${wrong.length}장`);
});

test('번역 페이지가 자기 언어의 og:locale을 낸다', { skip: built ? false : 'out/ 없음 — npm run build 필요' }, () => {
  /*
    og:locale은 페이스북·링크드인·슬랙이 미리보기를 어느 언어로 그릴지 읽는 값이다.
    app/layout.tsx의 전역 기본값 하나가 여덟 언어에 모두 실려서, 한때 스페인어 글을
    공유하면 한국어 미리보기가 떴다.
  */
  const OG: Record<string, string> = {
    ko: 'ko_KR', en: 'en_US', es: 'es_ES', 'pt-br': 'pt_BR',
    ja: 'ja_JP', de: 'de_DE', fr: 'fr_FR', hi: 'hi_IN',
  };
  const wrong: string[] = [];
  for (const sec of SECTIONS) {
    for (const locale of ALL_LOCALES) {
      const file = pageFor(locale, `/${sec}`);
      if (!existsSync(file)) continue;
      const html = readFileSync(file, 'utf8');
      const og = html.match(/property="og:locale" content="([^"]+)"/i)?.[1];
      if (og !== OG[locale]) wrong.push(`${relative(OUT, file)}: ${og} (기대 ${OG[locale]})`);
    }
  }
  assert.deepEqual(wrong.slice(0, 10), [], `og:locale이 틀린 페이지 ${wrong.length}장`);
});
