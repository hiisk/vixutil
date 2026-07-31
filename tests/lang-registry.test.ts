/**
 * 언어 레지스트리 검사 — lib/locales.ts(목록)와 lib/i18n/lang.ts(자료 열쇠)가
 * 어긋나지 않는지 지킨다.
 *
 * 둘이 갈라지는 사고가 실제로 났다. 레지스트리는 포르투갈어 경로를 pt-br로 적어
 * 뒀는데 라우트는 app/pt에 있었고, 레지스트리를 읽는 코드가 없어서 빌드도 테스트도
 * 통과했다. 그래서 이 파일은 "선언"과 "실제"를 양쪽에서 맞춰 본다.
 *
 * 예전에는 여덟 언어용과 열 언어용 검사가 파일 둘로 나뉘어 있었다. 모듈을 하나로
 * 합치면서 검사도 합친다 — 같은 것을 두 곳에서 지키면 한 곳만 고치게 된다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LOCALES, NEXT_LOCALES, ALL_LOCALES10, alternateLanguages10, localeLabel, localePrefix, localeTag, type AnyLocale } from '../lib/locales.ts';
import {
  LANGS, LANG_CODES, LOCALE_PATHS,
  alternates, langInfo, langOfLocale, langPrefix, localeOfLang,
} from '../lib/i18n/lang.ts';

test('중국어 둘이 뒤에 붙어 있다', () => {
  // 앞 여덟은 기존 순서 그대로여야 한다 — 자료 파일 수백 곳이 이 순서로 적혀 있다
  assert.equal(LANG_CODES.length, LOCALES.length + NEXT_LOCALES.length);
  assert.deepEqual(LANG_CODES.slice(0, LOCALES.length), ['ko', 'en', 'es', 'pt', 'ja', 'de', 'fr', 'hi']);
  assert.deepEqual(LANG_CODES.slice(-2), ['zh', 'tw']);
  assert.equal(new Set(LANG_CODES).size, LANG_CODES.length, '열쇠 중복');
});

test('레지스트리와 개수·순서가 같다', () => {
  const rows = [...LOCALES, ...NEXT_LOCALES];
  assert.equal(LANGS.length, rows.length);
  LANGS.forEach((l, i) => {
    assert.equal(l.hreflang, rows[i].tag, `${i}번째 태그가 다르다`);
    assert.equal(l.label, rows[i].label, `${i}번째 이름이 다르다`);
    assert.ok(l.lang, `열쇠가 없는 언어: ${l.hreflang}`);
    assert.match(l.lang, /^[a-z]{2}$/, `열쇠가 두 글자 소문자가 아니다: ${l.lang}`);
  });
});

test('경로와 선언이 레지스트리와 같다', () => {
  for (const l of LANGS) {
    assert.equal(l.prefix, localePrefix(l.locale), `${l.lang}: 경로가 다르다`);
    assert.equal(l.hreflang, localeTag(l.locale), `${l.lang}: 태그가 다르다`);
    assert.equal(l.label, localeLabel(l.locale), `${l.lang}: 이름이 다르다`);
    assert.equal(langPrefix(l.lang), l.prefix);
    assert.equal(localeOfLang(l.lang), l.locale);
    assert.equal(langOfLocale(l.locale), l.lang, `${l.locale}: 되돌아오지 않는다`);
  }
  assert.deepEqual(LOCALE_PATHS, [...ALL_LOCALES10]);
});

test('중국어는 경로와 선언이 다르다', () => {
  // 경로는 소문자, 선언은 BCP 47의 zh-Hans·zh-Hant다. 둘이 같아지면 한쪽이 틀린 것이다
  const zh = LANGS.find(l => l.lang === 'zh')!;
  const tw = LANGS.find(l => l.lang === 'tw')!;
  assert.equal(zh.prefix, '/zh-hans');
  assert.equal(zh.hreflang, 'zh-Hans');
  assert.equal(tw.prefix, '/zh-hant');
  assert.equal(tw.hreflang, 'zh-Hant');
  assert.notEqual(zh.label, tw.label);
});

test('hreflang 묶음은 언어 수 + x-default다', () => {
  const a = alternates('/game/chess/sicilian-najdorf');
  assert.equal(Object.keys(a).length, LANGS.length + 1);
  for (const l of LANGS) {
    assert.equal(a[l.hreflang], `${l.prefix}/game/chess/sicilian-najdorf`, `${l.hreflang} 주소가 다르다`);
  }
  assert.equal(a['x-default'], '/en/game/chess/sicilian-najdorf');
});




test('열쇠가 모두 채워져 있다', () => {
  // 경로→열쇠 표에서 한 줄이 빠지면 여기서 undefined가 나온다
  for (const l of LANGS) {
    assert.ok(l.lang, `열쇠가 없는 언어: ${l.hreflang}`);
    assert.match(l.lang, /^[a-z]{2}$/, `열쇠가 두 글자 소문자가 아니다: ${l.lang}`);
  }
  assert.equal(new Set(LANG_CODES).size, LANG_CODES.length, '열쇠 중복');
});

test('주소와 선언이 레지스트리와 같다', () => {
  for (const l of LANGS) {
    const locale = (l.prefix === '' ? 'ko' : l.prefix.slice(1)) as AnyLocale;
    assert.equal(l.prefix, localePrefix(locale), `${l.lang}: 경로가 다르다`);
    assert.equal(l.hreflang, localeTag(locale), `${l.lang}: 태그가 다르다`);
    assert.equal(l.label, localeLabel(locale), `${l.lang}: 이름이 다르다`);
  }
});

test('포르투갈어는 경로와 선언이 다르다', () => {
  // 경로는 소문자 pt-br, 선언은 BCP 47의 pt-BR — 이 둘이 같아지면 한쪽이 틀린 것이다
  const pt = langInfo('pt');
  assert.equal(pt.prefix, '/pt-br');
  assert.equal(pt.hreflang, 'pt-BR');
  assert.equal(pt.htmlLang, 'pt-BR');
});

test('hreflang 묶음은 언어 수 + x-default다', () => {
  const a = alternates('/color/red');
  assert.equal(Object.keys(a).length, LOCALES.length + NEXT_LOCALES.length + 1);
  for (const l of [...LOCALES, ...NEXT_LOCALES]) {
    const want = `${l.path === '' ? '' : `/${l.path}`}/color/red`;
    assert.equal(a[l.tag], want, `${l.tag} 주소가 다르다`);
  }
  assert.equal(a['x-default'], '/en/color/red');
});

test('두 방식으로 만든 hreflang 표가 한 글자도 다르지 않다', () => {
  /*
    같은 경로의 대안 목록을 alternates(i18n/lang)와 alternateLanguages10(locales)이
    각각 만든다. 둘 중 하나만 고쳐지면 섹션에 따라 hreflang이 갈라지는데, 페이지는
    멀쩡히 떠서 사이트맵을 대조해 보기 전까지 드러나지 않는다.
  */
  for (const path of ['/color', '/metro/seoul-line-2', '/music/c-major']) {
    assert.deepEqual(
      Object.entries(alternates(path)).sort(),
      Object.entries(alternateLanguages10(path)).sort(),
      `${path}: 두 표가 다르다`,
    );
  }
});
