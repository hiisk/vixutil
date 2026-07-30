/**
 * 여덟 언어 열쇠가 언어 레지스트리와 어긋나지 않는지 본다.
 *
 * lib/locales.ts가 언어 목록의 원천이고, lib/i18n/lang8.ts는 데이터 파일이 쓸
 * 짧은 열쇠(ko·en·es·pt…)만 붙인 얇은 층이다. 그 사이에 남은 것은 경로→열쇠
 * 표 한 벌인데, 레지스트리에 언어를 더하면서 그 표를 빼먹으면 lang이 undefined가
 * 되고 화면은 빈 문자열만 남긴다 — 에러도 안 나고 페이지도 뜬다.
 *
 * 그래서 개수·순서·태그를 여기서 붙들어 둔다. 언어를 늘릴 때 이 검사가 먼저
 * 깨지는 것이 목적이다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { LOCALES, localeLabel, localePrefix, localeTag, type AnyLocale } from '../lib/locales.ts';
import { LANG8_CODES, LANGS8, alternates8, lang8Info } from '../lib/i18n/lang8.ts';

test('레지스트리와 언어 수·순서가 같다', () => {
  assert.equal(LANGS8.length, LOCALES.length, '언어 수가 다르다');
  LANGS8.forEach((l, i) => {
    assert.equal(l.hreflang, LOCALES[i].tag, `${i}번째 언어의 태그가 다르다`);
    assert.equal(l.label, LOCALES[i].label, `${i}번째 언어의 이름이 다르다`);
  });
});

test('열쇠가 모두 채워져 있다', () => {
  // 경로→열쇠 표에서 한 줄이 빠지면 여기서 undefined가 나온다
  for (const l of LANGS8) {
    assert.ok(l.lang, `열쇠가 없는 언어: ${l.hreflang}`);
    assert.match(l.lang, /^[a-z]{2}$/, `열쇠가 두 글자 소문자가 아니다: ${l.lang}`);
  }
  assert.equal(new Set(LANG8_CODES).size, LANG8_CODES.length, '열쇠 중복');
});

test('주소와 선언이 레지스트리와 같다', () => {
  for (const l of LANGS8) {
    const locale = (l.prefix === '' ? 'ko' : l.prefix.slice(1)) as AnyLocale;
    assert.equal(l.prefix, localePrefix(locale), `${l.lang}: 경로가 다르다`);
    assert.equal(l.hreflang, localeTag(locale), `${l.lang}: 태그가 다르다`);
    assert.equal(l.label, localeLabel(locale), `${l.lang}: 이름이 다르다`);
  }
});

test('포르투갈어는 경로와 선언이 다르다', () => {
  // 경로는 소문자 pt-br, 선언은 BCP 47의 pt-BR — 이 둘이 같아지면 한쪽이 틀린 것이다
  const pt = lang8Info('pt');
  assert.equal(pt.prefix, '/pt-br');
  assert.equal(pt.hreflang, 'pt-BR');
  assert.equal(pt.htmlLang, 'pt-BR');
});

test('hreflang 묶음은 언어 수 + x-default다', () => {
  const a = alternates8('/color/red');
  assert.equal(Object.keys(a).length, LOCALES.length + 1);
  for (const l of LOCALES) {
    const want = `${l.path === '' ? '' : `/${l.path}`}/color/red`;
    assert.equal(a[l.tag], want, `${l.tag} 주소가 다르다`);
  }
  assert.equal(a['x-default'], '/en/color/red');
});
