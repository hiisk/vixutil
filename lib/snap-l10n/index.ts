import type { SnapCopy } from './types.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';
import { ZH_HANS } from './zh-hans.ts';
import { ZH_HANT } from './zh-hant.ts';

/** 영어는 [[lib/snap-intl.ts]]에 그대로 있다 — 여기 모은 것은 나중에 번역한 여덟 언어다 */
export type SnapL10nLang = 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

/**
 * Partial이 아니라 Record다. 한 언어라도 빠지면 tsc가 잡는다 —
 * Partial로 두면 없는 언어가 조용히 영어로 떨어지고 검사는 통과한다.
 */
export const SNAP_L10N: Record<SnapL10nLang, SnapCopy> = {
  es: ES, 'pt-br': PT, ja: JA, de: DE, fr: FR, hi: HI, 'zh-hans': ZH_HANS, 'zh-hant': ZH_HANT,
};

export const SNAP_L10N_LANGS = ['es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'] as const;

/**
 * 표 하나를 여덟 언어로 펼친다.
 *
 * `{ en: {...}, ...spread('smilePool') }` 꼴로 쓴다. 열쇠를 K로 잡아 두어서
 * 값의 타입이 `SnapCopy[K]`로 정확히 나온다 — 엉뚱한 열쇠를 적으면 tsc가 잡는다.
 */
export function spread<K extends keyof SnapCopy>(key: K): Record<SnapL10nLang, SnapCopy[K]> {
  const out = {} as Record<SnapL10nLang, SnapCopy[K]>;
  for (const lang of SNAP_L10N_LANGS) out[lang] = SNAP_L10N[lang][key];
  return out;
}
