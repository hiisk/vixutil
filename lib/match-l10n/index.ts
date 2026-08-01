import type { MatchCopy } from './types.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';
import { ZH_HANS } from './zh-hans.ts';
import { ZH_HANT } from './zh-hant.ts';

/** 영어는 [[lib/match-intl.ts]]에 그대로 있다 — 나중에 옮긴 여덟 언어만 여기 모은다 */
export type MatchL10nLang = 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

export const MATCH_L10N: Record<MatchL10nLang, MatchCopy> = {
  es: ES, 'pt-br': PT, ja: JA, de: DE, fr: FR, hi: HI, 'zh-hans': ZH_HANS, 'zh-hant': ZH_HANT,
};

const LANGS = ['es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;

/** `{ en: {...}, ...spread('zodiac') }` 꼴로 표 하나를 여덟 언어로 펼친다 */
export function spread<K extends keyof MatchCopy>(key: K): Record<MatchL10nLang, MatchCopy[K]> {
  const out = {} as Record<MatchL10nLang, MatchCopy[K]>;
  for (const lang of LANGS) out[lang] = MATCH_L10N[lang][key];
  return out;
}
