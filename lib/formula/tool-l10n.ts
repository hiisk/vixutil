// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { FormulaText } from './types.ts';
import type { IntlLocale } from '../locales.ts';
import { RATE_ES } from '../rate-l10n/es.ts';
import { RATE_PT_BR } from '../rate-l10n/pt-br.ts';
import { RATE_JA } from '../rate-l10n/ja.ts';
import { RATE_DE } from '../rate-l10n/de.ts';
import { RATE_FR } from '../rate-l10n/fr.ts';
import { RATE_HI } from '../rate-l10n/hi.ts';

/**
 * 도구 문구의 번역을 언어별로 한 표에 모은다.
 *
 * 세 섹션(rate·body·geometry)이 같은 엔진을 쓰고 slug가 서로 겹치지 않으므로
 * 한 표에 담아도 된다. 섹션을 옮길 때마다 여기 한 줄씩 늘리면 된다.
 */
export const TOOL_L10N: Partial<Record<IntlLocale, Record<string, FormulaText>>> = {
  es: { ...RATE_ES },
  'pt-br': { ...RATE_PT_BR },
  ja: { ...RATE_JA },
  de: { ...RATE_DE },
  fr: { ...RATE_FR },
  hi: { ...RATE_HI },
};
