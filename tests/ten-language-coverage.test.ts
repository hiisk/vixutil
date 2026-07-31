/**
 * 열 언어를 내건 자리가 실제로 열 언어인지 센다.
 *
 * Record<Lang, T>는 언어가 빠지면 tsc가 잡아 준다. 위험한 것은
 * Partial<Record<...>>다 — 빠져도 타입이 통과하고, 화면은 영어로 떨어지거나
 * 그냥 조용히 빈다. 길이만 보는 검사도 초록이 뜬다.
 *
 * 이 검사를 세우기 전에 정규식으로 파일을 훑는 스크립트를 두 번 썼는데 두 번 다
 * 틀렸다. 한 줄에 여러 열쇠가 있으면 못 세고, 들여쓰기가 다르면 못 찾는다.
 * 그래서 파일을 읽지 않고 **실제 사전을 불러다** 센다 — 값이 있는지 없는지는
 * 코드가 아는 것이지 텍스트가 아는 것이 아니다.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { ALL_LOCALES10, type AnyLocale10 } from '../lib/locales.ts';

import { FORMULA_L10N } from '../lib/formula/l10n/index.ts';
import { TOOL_L10N } from '../lib/formula/tool-l10n.ts';
import { HANJA_L10N, GLOSS_L10N } from '../lib/hanja-l10n/index.ts';
import { COUNTRY_L10N } from '../lib/country-l10n/index.ts';
import { CONVERT_L10N } from '../lib/convert-i18n.ts';
import { RATE_META_INTL, RATE_CATEGORY_INTL } from '../lib/rate-section.ts';
import { BODY_META_INTL, BODY_CATEGORY_INTL } from '../lib/body-section.ts';
import { GEO_META_INTL, GEO_CATEGORY_INTL } from '../lib/geo-section.ts';
import { HANJA_CATEGORY_INTL } from '../lib/hanja-ui.ts';
import { COUNTRY_REGION_INTL } from '../lib/country-ui.ts';
import { FORTUNE_INTL, SNAP_INTL } from '../lib/search-index-intl.ts';

/** ko는 원본이라 곁사전에 없는 것이 정상. en도 데이터 파일에 붙어 있는 표가 있다. */
const NON_KO = ALL_LOCALES10.filter(l => l !== 'ko');
const NON_KO_EN = NON_KO.filter(l => l !== 'en');

const TABLES: [string, Record<string, unknown>, readonly AnyLocale10[]][] = [
  ['FORMULA_L10N', FORMULA_L10N, NON_KO_EN],
  ['TOOL_L10N', TOOL_L10N, NON_KO_EN],
  ['HANJA_L10N', HANJA_L10N, NON_KO_EN],
  ['GLOSS_L10N', GLOSS_L10N, NON_KO_EN],
  ['COUNTRY_L10N', COUNTRY_L10N, NON_KO_EN],
  ['CONVERT_L10N', CONVERT_L10N, NON_KO],
  ['RATE_META_INTL', RATE_META_INTL, NON_KO_EN],
  ['RATE_CATEGORY_INTL', RATE_CATEGORY_INTL, NON_KO_EN],
  ['BODY_META_INTL', BODY_META_INTL, NON_KO_EN],
  ['BODY_CATEGORY_INTL', BODY_CATEGORY_INTL, NON_KO_EN],
  ['GEO_META_INTL', GEO_META_INTL, NON_KO_EN],
  ['GEO_CATEGORY_INTL', GEO_CATEGORY_INTL, NON_KO_EN],
  ['HANJA_CATEGORY_INTL', HANJA_CATEGORY_INTL, NON_KO_EN],
  ['COUNTRY_REGION_INTL', COUNTRY_REGION_INTL, NON_KO_EN],
  ['FORTUNE_INTL', FORTUNE_INTL, NON_KO],
  ['SNAP_INTL', SNAP_INTL, NON_KO],
];

test('곁사전이 내건 언어를 하나도 빠뜨리지 않는다', () => {
  const bad: string[] = [];
  for (const [name, table, want] of TABLES) {
    const missing = want.filter(l => !table[l]);
    if (missing.length) bad.push(`${name}: ${missing.join(', ')} 없음`);
  }
  assert.deepEqual(
    bad, [],
    `Partial 사전에 빠진 언어가 있다 — 타입은 통과하지만 그 언어는 조용히 빈다:\n  ${bad.join('\n  ')}`,
  );
});

test('곁사전의 항목 수가 언어마다 같다', () => {
  // 언어 하나만 항목이 적으면 그 언어에서만 몇 페이지가 영어로 떨어진다.
  // 언어가 통째로 빠진 것보다 찾기 어렵다.
  const bad: string[] = [];
  for (const [name, table, want] of TABLES) {
    const counts = want
      .filter(l => table[l])
      .map(l => [l, Object.keys(table[l] as object).length] as const);
    if (!counts.length) continue;
    const max = Math.max(...counts.map(([, n]) => n));
    const short = counts.filter(([, n]) => n < max);
    if (short.length) bad.push(`${name}: ${short.map(([l, n]) => `${l} ${n}/${max}`).join(', ')}`);
  }
  assert.deepEqual(bad, [], `언어마다 항목 수가 다르다:\n  ${bad.join('\n  ')}`);
});
