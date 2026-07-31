// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { FormulaText } from './types.ts';
import type { IntlLocale } from '../locales.ts';
import { RATE_ES } from '../rate-l10n/es.ts';
import { RATE_PT_BR } from '../rate-l10n/pt-br.ts';
import { RATE_JA } from '../rate-l10n/ja.ts';
import { RATE_DE } from '../rate-l10n/de.ts';
import { RATE_FR } from '../rate-l10n/fr.ts';
import { RATE_HI } from '../rate-l10n/hi.ts';
import { BODY_ES } from '../body-l10n/es.ts';
import { BODY_PT_BR } from '../body-l10n/pt-br.ts';
import { BODY_JA } from '../body-l10n/ja.ts';
import { BODY_DE } from '../body-l10n/de.ts';
import { BODY_FR } from '../body-l10n/fr.ts';
import { BODY_HI } from '../body-l10n/hi.ts';
import { GEO_ES } from '../geo-l10n/es.ts';
import { GEO_PT_BR } from '../geo-l10n/pt-br.ts';
import { GEO_JA } from '../geo-l10n/ja.ts';
import { GEO_DE } from '../geo-l10n/de.ts';
import { GEO_FR } from '../geo-l10n/fr.ts';
import { GEO_HI } from '../geo-l10n/hi.ts';

/**
 * 도구 문구의 번역을 언어별로 한 표에 모은다.
 *
 * 세 섹션(rate·body·geometry)이 같은 엔진을 쓰고 slug가 서로 겹치지 않으므로
 * 한 표에 담아도 된다. 섹션을 옮길 때마다 여기 한 줄씩 늘리면 된다.
 */
export const TOOL_L10N: Partial<Record<IntlLocale, Record<string, FormulaText>>> = {
  es: { ...RATE_ES, ...BODY_ES, ...GEO_ES },
  'pt-br': { ...RATE_PT_BR, ...BODY_PT_BR, ...GEO_PT_BR },
  ja: { ...RATE_JA, ...BODY_JA, ...GEO_JA },
  de: { ...RATE_DE, ...BODY_DE, ...GEO_DE },
  fr: { ...RATE_FR, ...BODY_FR, ...GEO_FR },
  hi: { ...RATE_HI, ...BODY_HI, ...GEO_HI },
};
