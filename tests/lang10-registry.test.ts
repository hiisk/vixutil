/**
 * 열 언어 층이 언어 레지스트리와 어긋나지 않는지 본다.
 *
 * lib/i18n/lang10.ts는 lang8 옆에 세운 층이다. 여덟 언어 자료 파일 수백 개를
 * 한꺼번에 고치지 않으려고 둘을 나눠 두었는데, 나눠 둔 사이에 표가 어긋나면
 * 그 언어에서 글자가 빈 채로 페이지가 나간다 — 에러도 안 나고 빌드도 통과한다.
 *
 * 그래서 여기서 두 가지를 붙든다.
 *  - lang10은 lang8을 그대로 품고, 뒤에 중국어 둘이 붙는다
 *  - 경로·hreflang·이름이 레지스트리와 같다
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import { LOCALES, NEXT_LOCALES, ALL_LOCALES10, localeLabel, localePrefix, localeTag } from '../lib/locales.ts';
import { LANG8_CODES } from '../lib/i18n/lang8.ts';
import { LANG10_CODES, LANGS10, LOCALES10, alternates10, lang10OfLocale, localeOfLang10, prefix10 } from '../lib/i18n/lang10.ts';

test('여덟 언어를 그대로 품고 둘이 더 있다', () => {
  assert.equal(LANG10_CODES.length, LANG8_CODES.length + 2);
  assert.deepEqual(LANG10_CODES.slice(0, LANG8_CODES.length), LANG8_CODES, '앞쪽 순서가 lang8과 다르다');
  assert.deepEqual(LANG10_CODES.slice(-2), ['zh', 'tw']);
  assert.equal(new Set(LANG10_CODES).size, LANG10_CODES.length, '열쇠 중복');
});

test('레지스트리와 개수·순서가 같다', () => {
  const rows = [...LOCALES, ...NEXT_LOCALES];
  assert.equal(LANGS10.length, rows.length);
  LANGS10.forEach((l, i) => {
    assert.equal(l.hreflang, rows[i].tag, `${i}번째 태그가 다르다`);
    assert.equal(l.label, rows[i].label, `${i}번째 이름이 다르다`);
    assert.ok(l.lang, `열쇠가 없는 언어: ${l.hreflang}`);
    assert.match(l.lang, /^[a-z]{2}$/, `열쇠가 두 글자 소문자가 아니다: ${l.lang}`);
  });
});

test('경로와 선언이 레지스트리와 같다', () => {
  for (const l of LANGS10) {
    assert.equal(l.prefix, localePrefix(l.locale), `${l.lang}: 경로가 다르다`);
    assert.equal(l.hreflang, localeTag(l.locale), `${l.lang}: 태그가 다르다`);
    assert.equal(l.label, localeLabel(l.locale), `${l.lang}: 이름이 다르다`);
    assert.equal(prefix10(l.lang), l.prefix);
    assert.equal(localeOfLang10(l.lang), l.locale);
    assert.equal(lang10OfLocale(l.locale), l.lang, `${l.locale}: 되돌아오지 않는다`);
  }
  assert.deepEqual(LOCALES10, [...ALL_LOCALES10]);
});

test('중국어는 경로와 선언이 다르다', () => {
  // 경로는 소문자, 선언은 BCP 47의 zh-Hans·zh-Hant다. 둘이 같아지면 한쪽이 틀린 것이다
  const zh = LANGS10.find(l => l.lang === 'zh')!;
  const tw = LANGS10.find(l => l.lang === 'tw')!;
  assert.equal(zh.prefix, '/zh-hans');
  assert.equal(zh.hreflang, 'zh-Hans');
  assert.equal(tw.prefix, '/zh-hant');
  assert.equal(tw.hreflang, 'zh-Hant');
  assert.notEqual(zh.label, tw.label);
});

test('hreflang 묶음은 언어 수 + x-default다', () => {
  const a = alternates10('/game/chess/sicilian-najdorf');
  assert.equal(Object.keys(a).length, LANGS10.length + 1);
  for (const l of LANGS10) {
    assert.equal(a[l.hreflang], `${l.prefix}/game/chess/sicilian-najdorf`, `${l.hreflang} 주소가 다르다`);
  }
  assert.equal(a['x-default'], '/en/game/chess/sicilian-najdorf');
});
