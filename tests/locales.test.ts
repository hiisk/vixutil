import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import {
  ALL_LOCALES, INTL_LOCALES, LOCALES,
  alternateLanguages, localeHref, localeLabel, localePrefix, localeTag,
} from '../lib/locales.ts';
import { HOME_UI, homeSections } from '../lib/locale-home.ts';
import { appEntries, appJoin } from './app-path.ts';

const APP = 'app';

/**
 * 언어 레지스트리와 실제 라우트가 어긋나지 않는지 본다.
 *
 * 한 번 어긋난 적이 있다. 레지스트리는 포르투갈어 경로를 pt-br로 적었는데 라우트는
 * app/pt에 깔려 있었고, 그 파일을 읽는 코드가 없어서 빌드가 통과했다. 선언과
 * 라우트가 갈라진 채로 섹션을 더 얹으면 나중에 URL을 통째로 옮겨야 한다.
 */
test('여덟 언어가 정확히 등록돼 있다', () => {
  assert.equal(ALL_LOCALES.length, 8, '언어가 여덟 개가 아니다');
  assert.equal(INTL_LOCALES.length, 7, '번역 언어가 일곱 개가 아니다 (한국어는 원본)');
  assert.equal(ALL_LOCALES[0], 'ko', '한국어가 첫 항목이어야 한다');
  assert.deepEqual(
    [...ALL_LOCALES].sort(),
    ['de', 'en', 'es', 'fr', 'hi', 'ja', 'ko', 'pt-br'],
    '언어 구성이 정한 것과 다르다',
  );
});

test('경로는 모두 소문자다', () => {
  // 브라우저는 경로의 대소문자를 구분한다. /pt-BR과 /pt-br은 서로 다른 주소다.
  for (const l of LOCALES) {
    assert.equal(l.path, l.path.toLowerCase(), `${l.path}: 경로에 대문자가 있다`);
  }
});

test('hreflang 표기는 BCP 47이고 경로와 짝이 맞는다', () => {
  const byTag = new Map(LOCALES.map(l => [l.tag, l.path]));
  assert.equal(byTag.get('pt-BR'), 'pt-br', '포르투갈어: 경로는 pt-br, 선언은 pt-BR이어야 한다');
  assert.equal(byTag.get('ko'), '', '한국어는 접두어가 없어야 한다');
  for (const l of LOCALES) {
    assert.match(l.tag, /^[a-z]{2}(-[A-Z]{2})?$/, `${l.tag}: BCP 47 표기가 아니다`);
  }
});

test('언어 이름은 그 언어로 적혀 있다', () => {
  // 영어로 'Spanish'라고 적으면 스페인어만 읽는 사람이 자기 언어를 못 찾는다
  const pairs: [string, string][] = [
    ['ko', '한국어'], ['en', 'English'], ['es', 'Español'],
    ['pt-br', 'Português'], ['ja', '日本語'], ['de', 'Deutsch'], ['fr', 'Français'],
  ];
  for (const [locale, label] of pairs) {
    assert.equal(localeLabel(locale as never), label, `${locale}: 자기 언어 이름이 아니다`);
  }
  assert.ok(localeLabel('hi').length > 0, 'hi: 이름이 비었다');
  assert.equal(new Set(ALL_LOCALES.map(l => localeLabel(l))).size, 8, '언어 이름이 겹친다');
});

test('경로 조립이 언어별로 맞는다', () => {
  assert.equal(localePrefix('ko'), '', '한국어에 접두어가 붙었다');
  assert.equal(localeHref('ko', '/color/palette'), '/color/palette');
  assert.equal(localeHref('en', '/color/palette'), '/en/color/palette');
  assert.equal(localeHref('pt-br', '/color/palette'), '/pt-br/color/palette');
  assert.equal(localeHref('ko', '/'), '/', '한국어 루트가 빈 문자열이 됐다');
  assert.equal(localeHref('ja', '/'), '/ja');
});

test('hreflang 표는 여덟 언어와 x-default를 낸다', () => {
  const a = alternateLanguages('/color/palette');
  assert.equal(Object.keys(a).length, 9, '여덟 언어 + x-default가 아니다');
  assert.equal(a['x-default'], '/en/color/palette', 'x-default가 영어를 가리키지 않는다');
  assert.equal(a['pt-BR'], '/pt-br/color/palette', '포르투갈어 대안 경로가 다르다');
  assert.equal(a['ko'], '/color/palette');
  for (const l of ALL_LOCALES) {
    assert.ok(a[localeTag(l)], `${l}: 대안 목록에 없다`);
  }
});

test('app 아래 언어 폴더가 레지스트리에 등록된 것뿐이다', () => {
  // 레지스트리에 없는 언어 폴더가 있으면 그 라우트는 어떤 hreflang도 가리키지 않는다
  const known = new Set<string>(ALL_LOCALES.filter(l => l !== 'ko'));
  // 언어 폴더는 두 글자 또는 두 글자-두 글자 형태다. 섹션 폴더(color, fortune 등)와 구분한다
  const localeLike = /^[a-z]{2}(-[a-z]{2})?$/;
  /*
   * app/og는 언어가 아니라 공유 카드를 그리는 라우트다(app/og/[...slug]/route.tsx).
   * 하필 두 글자라 위 규칙에 걸린다 — 이 검사가 쓰이던 때에는 "섹션 이름이
   * 우연히 두 글자인 경우는 없다"고 적혀 있었는데, 생겼다.
   */
  const NOT_A_LOCALE = new Set(['og']);
  const stray = readdirSync(APP, { withFileTypes: true })
    .filter(d => d.isDirectory() && localeLike.test(d.name) && !known.has(d.name))
    .filter(d => !NOT_A_LOCALE.has(d.name))
    .map(d => d.name);
  assert.deepEqual(
    stray, [],
    `레지스트리에 없는 언어 폴더다. lib/locales.ts에 넣거나 폴더를 옮겨라:\n  ${stray.join('\n  ')}`,
  );
});

test('번역 언어마다 첫 화면이 있다', () => {
  // 섹션 허브의 로고가 /es를 가리키므로, 이 페이지가 없으면 끊어진 내부 링크가 된다
  const missing = INTL_LOCALES.filter(l => !existsSync(appJoin(l, 'page.tsx')));
  assert.deepEqual(missing, [], `첫 화면이 없는 언어다: ${missing.join(', ')}`);
  for (const l of INTL_LOCALES) assert.ok(HOME_UI[l], `${l}: HOME_UI에 문구가 없다`);
});

test('첫 화면이 싣는 섹션은 그 언어에 실제로 있다', () => {
  // copy에 언어를 적어 두고 라우트를 안 만들면 첫 화면이 404를 링크한다
  const dead: string[] = [];
  for (const l of INTL_LOCALES) {
    for (const s of homeSections(l)) {
      if (!existsSync(appJoin(l, s.route.slice(1)))) dead.push(`/${l}${s.route}`);
    }
  }
  assert.deepEqual(dead, [], `라우트가 없는 섹션을 첫 화면에 실었다:\n  ${dead.join('\n  ')}`);
});

test('번역한 섹션은 첫 화면에서 빠지지 않는다', () => {
  // 라우트만 만들고 lib/locale-home.ts에 안 적으면 그 언어에서만 섹션이 안 보인다.
  // 링크가 깨지는 게 아니라 그냥 없어서, 화면을 열어 보기 전까지 드러나지 않는다.
  const orphan: string[] = [];
  for (const l of INTL_LOCALES) {
    const listed = new Set(homeSections(l).map(s => s.route.slice(1)));
    const routes = readdirSync(appJoin(l), { withFileTypes: true })
      .filter(d => d.isDirectory() && existsSync(appJoin(l, d.name, 'page.tsx')))
      .map(d => d.name)
      // 통합 검색은 카드가 아니라 위쪽 검색 줄이 링크한다
      .filter(d => d !== 'search');
    for (const r of routes) if (!listed.has(r)) orphan.push(`/${l}/${r}`);
  }
  assert.deepEqual(orphan, [], `첫 화면에 없는 섹션이다. lib/locale-home.ts의 copy에 넣어라:\n  ${orphan.join('\n  ')}`);
});

test('등록된 언어 폴더는 실제로 페이지를 갖는다', () => {
  // 폴더만 만들고 페이지를 안 넣으면 사이트맵과 hreflang이 없는 곳을 가리킨다
  const empty = ALL_LOCALES
    .filter(l => l !== 'ko')
    .filter(l => existsSync(appJoin(l)))
    .filter(l => !existsSync(appJoin(l, 'page.tsx')) && readdirSync(appJoin(l)).length === 0);
  assert.deepEqual(empty, [], `빈 언어 폴더다: ${empty.join(', ')}`);
});
