// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { IdiomText } from '../hanja/types.ts';
import type { AnyLocale10 } from '../locales.ts';
import { HANJA_ES, GLOSS_ES } from './es.ts';
import { HANJA_PT_BR, GLOSS_PT_BR } from './pt-br.ts';
import { HANJA_JA, GLOSS_JA } from './ja.ts';
import { HANJA_DE, GLOSS_DE } from './de.ts';
import { HANJA_FR, GLOSS_FR } from './fr.ts';
import { HANJA_HI, GLOSS_HI } from './hi.ts';
import { HANJA_ZH_HANS, GLOSS_ZH_HANS } from './zh-hans.ts';
import { HANJA_ZH_HANT, GLOSS_ZH_HANT } from './zh-hant.ts';

/** 사자성어 문구의 번역 — slug가 열쇠다 */
export const HANJA_L10N: Partial<Record<Exclude<AnyLocale10, 'ko'>, Record<string, IdiomText>>> = {
  es: HANJA_ES, 'pt-br': HANJA_PT_BR, ja: HANJA_JA, de: HANJA_DE, fr: HANJA_FR, hi: HANJA_HI,
  'zh-hans': HANJA_ZH_HANS, 'zh-hant': HANJA_ZH_HANT,
};

/**
 * 글자별 새김의 번역.
 *
 * 한국어 새김("넉 사")은 훈과 음을 붙여 읽는 우리 방식이라 다른 언어에서는
 * 읽히지 않는다. 번역 언어에서는 글자의 뜻만 한 낱말로 적는다.
 */
export const GLOSS_L10N: Partial<Record<Exclude<AnyLocale10, 'ko'>, Record<string, [string, string, string, string]>>> = {
  es: GLOSS_ES, 'pt-br': GLOSS_PT_BR, ja: GLOSS_JA, de: GLOSS_DE, fr: GLOSS_FR, hi: GLOSS_HI,
  'zh-hans': GLOSS_ZH_HANS, 'zh-hant': GLOSS_ZH_HANT,
};
