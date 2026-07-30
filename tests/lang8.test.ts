import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LANGS8, LANG8_CODES, alternates8, prefix8 } from '../lib/i18n/lang8.ts';
import { ALL_LOCALES, alternateLanguages, localeHref, localeTag } from '../lib/locales.ts';

/**
 * lang8과 locales가 어긋나지 않는지 본다.
 *
 * 두 세션이 각자 언어 레지스트리를 세워서 한때 목록이 두 벌이었다. 이제 lang8은
 * locales에서 목록을 만들지만, 열쇠 이름이 다르다('pt' vs 'pt-br'). 옮기는 표가
 * 틀리면 그 언어의 경로와 hreflang이 조용히 어긋나므로 여기서 맞춰 본다.
 */
test('lang8과 locales가 같은 언어를 담는다', () => {
  assert.equal(LANGS8.length, ALL_LOCALES.length, '언어 수가 다르다');
  assert.equal(LANG8_CODES.length, 8);
  assert.deepEqual(
    [...LANG8_CODES].sort(),
    ['de', 'en', 'es', 'fr', 'hi', 'ja', 'ko', 'pt'],
    'lang8의 언어 구성이 다르다',
  );
});

test('두 레지스트리가 같은 경로를 낸다', () => {
  // 열쇠 이름은 달라도 주소는 같아야 한다
  const pairs: [string, (typeof ALL_LOCALES)[number]][] = [
    ['ko', 'ko'], ['en', 'en'], ['es', 'es'], ['pt', 'pt-br'],
    ['ja', 'ja'], ['de', 'de'], ['fr', 'fr'], ['hi', 'hi'],
  ];
  for (const [l8, loc] of pairs) {
    const info = LANGS8.find(l => l.lang === l8);
    assert.ok(info, `${l8}: lang8에 없다`);
    assert.equal(
      prefix8(l8 as never), localeHref(loc, '/') === '/' ? '' : localeHref(loc, '/'),
      `${l8}: 경로 앞머리가 다르다`,
    );
    assert.equal(info.hreflang, localeTag(loc), `${l8}: hreflang이 다르다`);
    assert.equal(info.htmlLang, localeTag(loc), `${l8}: html lang이 다르다`);
  }
});

test('두 레지스트리의 hreflang 표가 같다', () => {
  // /metro/seoul-line-2처럼 양쪽 방식으로 만든 표가 한 글자도 다르지 않아야 한다
  const a = alternates8('/color');
  const b = alternateLanguages('/color');
  assert.deepEqual(
    Object.entries(a).sort(),
    Object.entries(b).sort(),
    'alternates8과 alternateLanguages의 결과가 다르다',
  );
});

test('포르투갈어는 경로 pt-br, 선언 pt-BR이다', () => {
  const pt = LANGS8.find(l => l.lang === 'pt');
  assert.ok(pt);
  assert.equal(pt.prefix, '/pt-br', '경로가 /pt-br이 아니다');
  assert.equal(pt.hreflang, 'pt-BR', 'hreflang이 pt-BR이 아니다');
});
