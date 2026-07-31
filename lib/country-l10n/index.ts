// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { CountryText } from '../country/types.ts';
import type { IntlLocale } from '../locales.ts';
import { COUNTRY_ES } from './es.ts';
import { COUNTRY_PT_BR } from './pt-br.ts';
import { COUNTRY_JA } from './ja.ts';
import { COUNTRY_DE } from './de.ts';
import { COUNTRY_FR } from './fr.ts';
import { COUNTRY_HI } from './hi.ts';

/**
 * 나라 문구의 번역을 언어별로 모은다 — slug가 열쇠다.
 *
 * ko·en은 lib/country/*.ts 안에 그대로 두고 여기에는 번역만 둔다. 나라를 하나
 * 추가할 때 여섯 파일을 다 고쳐야 하는 건 맞지만, 빠뜨려도 영어로 떨어질 뿐
 * 화면이 비지는 않는다.
 */
export const COUNTRY_L10N: Partial<Record<IntlLocale, Record<string, CountryText>>> = {
  es: COUNTRY_ES,
  'pt-br': COUNTRY_PT_BR,
  ja: COUNTRY_JA,
  de: COUNTRY_DE,
  fr: COUNTRY_FR,
  hi: COUNTRY_HI,
};
