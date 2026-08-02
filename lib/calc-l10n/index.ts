import type { CalcLang, CalcCopy, CalcTable } from './types.ts';
import { UNIT_WEIGHT } from './unit-weight.ts';
import { UNIT_LENGTH } from './unit-length.ts';

export type { CalcLang, CalcCopy } from './types.ts';
export { CALC_SHELL } from './shell.ts';
import { UNIT_TEMP } from './unit-temp.ts';
import { BINARY } from './binary.ts';
import { BMI } from './bmi.ts';
import { PERCENT } from './percent.ts';
import { TIP } from './tip.ts';
import { DUTCH_PAY } from './dutch-pay.ts';
import { DEV_JSON } from './dev-tools.ts';
import { DEV_BASE64 } from './dev-tools.ts';
import { DEV_URL_ENCODE } from './dev-tools2.ts';
import { DEV_HASH } from './dev-tools2.ts';
import { DEV_UUID } from './dev-tools2.ts';
import { DEV_TIMESTAMP } from './dev-tools3.ts';
import { DEV_WORD_COUNT } from './dev-tools3.ts';
import { DEV_JWT } from './dev-tools4.ts';
import { DEV_REGEX } from './dev-tools4.ts';

/**
 * 다국어로 낸 계산기 목록.
 *
 * 여기 있는 슬러그는 한국어에도 같은 주소로 있다 — 열 언어가 짝이 맞는다는
 * 뜻이고, hreflang과 언어 버튼이 그 사실에 기대고 있다. 새로 더할 때는
 * `app/calculator/<슬러그>/page.tsx`가 실재하는지 먼저 확인한다.
 *
 * 한국 법·제도에 묶인 쉰셋은 여기 오지 않는다. 자세한 이유는 types.ts에 적었다.
 */
const TABLES: Record<string, CalcTable> = {
  'dev/regex': DEV_REGEX,
  'dev/jwt': DEV_JWT,
  'dev/word-count': DEV_WORD_COUNT,
  'dev/timestamp': DEV_TIMESTAMP,
  'dev/uuid': DEV_UUID,
  'dev/hash': DEV_HASH,
  'dev/url-encode': DEV_URL_ENCODE,
  'dev/base64': DEV_BASE64,
  'dev/json': DEV_JSON,
  'dutch-pay': DUTCH_PAY,
  'tip': TIP,
  'percent': PERCENT,
  'bmi': BMI,
  'binary': BINARY,
  'unit-temp': UNIT_TEMP,
  'unit-weight': UNIT_WEIGHT,
  'unit-length': UNIT_LENGTH,
};

export const CALC_INTL_SLUGS = Object.keys(TABLES);

export function calcCopy(lang: CalcLang, slug: string): CalcCopy | undefined {
  return TABLES[slug]?.[lang];
}

export function hasCalcIntl(slug: string): boolean {
  return slug in TABLES;
}

/** 같은 언어의 다른 계산기 몇 개 — 상세 아래 "다른 계산기"에 쓴다. */
export function relatedCalcs(lang: CalcLang, slug: string, count = 6) {
  return CALC_INTL_SLUGS
    .filter(s => s !== slug)
    .slice(0, count)
    .map(s => ({ slug: s, title: TABLES[s][lang].title, short: TABLES[s][lang].short }));
}
