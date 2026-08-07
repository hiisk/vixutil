import type { Test } from '../types.ts';
import type { AnyLocale10 } from '../locales.ts';
import { TESTS_EN, TESTS_EN_MAP } from '../test-en.ts';
import { TESTS_ES, TESTS_ES_MAP } from './es.ts';
import { TESTS_PT, TESTS_PT_MAP } from './pt-br.ts';
import { TESTS_JA, TESTS_JA_MAP } from './ja.ts';
import { TESTS_DE, TESTS_DE_MAP } from './de.ts';
import { TESTS_FR, TESTS_FR_MAP } from './fr.ts';
import { TESTS_HI, TESTS_HI_MAP } from './hi.ts';
import { TESTS_ZH_HANS, TESTS_ZH_HANS_MAP } from './zh-hans.ts';
import { TESTS_ZH_HANT, TESTS_ZH_HANT_MAP } from './zh-hant.ts';

/**
 * 한국어를 뺀 아홉 언어의 심리테스트.
 *
 * 한국어 264종(2026-08-07)은 회사 문화·연애 관습처럼 한국 맥락에 묶여 있어 옮기지 않는다
 * ([[lib/test-en.ts]] 주석). 대신 어느 언어권에서도 그대로 통하는 다섯 주제만
 * 골라 아홉 언어로 옮겼다. 그래서 이 표의 슬러그는 아홉 언어가 모두 같고,
 * 한국어와는 겹치지 않는다 — hreflang을 [[lib/locale-alternates.ts]]가 실제
 * 맵에서 뽑는 이유가 이것이다.
 *
 * Partial이 아니라 Record다. 언어가 빠지면 tsc가 잡는다.
 */
export type TestIntlLang = Exclude<AnyLocale10, 'ko'>;

export const TESTS_INTL: Record<TestIntlLang, Test[]> = {
  'en': TESTS_EN,
  'es': TESTS_ES,
  'pt-br': TESTS_PT,
  'ja': TESTS_JA,
  'de': TESTS_DE,
  'fr': TESTS_FR,
  'hi': TESTS_HI,
  'zh-hans': TESTS_ZH_HANS,
  'zh-hant': TESTS_ZH_HANT,
};

export const TESTS_INTL_MAP: Record<TestIntlLang, Record<string, Test>> = {
  'en': TESTS_EN_MAP,
  'es': TESTS_ES_MAP,
  'pt-br': TESTS_PT_MAP,
  'ja': TESTS_JA_MAP,
  'de': TESTS_DE_MAP,
  'fr': TESTS_FR_MAP,
  'hi': TESTS_HI_MAP,
  'zh-hans': TESTS_ZH_HANS_MAP,
  'zh-hant': TESTS_ZH_HANT_MAP,
};
