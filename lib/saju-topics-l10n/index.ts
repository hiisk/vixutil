import type { AnyLocale10 } from '../locales.ts';
import type { TopicCopy } from './types.ts';
import { KO } from './ko.ts';
import { EN } from './en.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';
import { ZH_HANS } from './zh-hans.ts';
import { ZH_HANT } from './zh-hant.ts';

/**
 * 주제 낱장 열 언어.
 *
 * lib/saju-l10n/은 한국어를 뺀 아홉이다 — 한국어 문구가 lib/saju-fortune.ts 안에
 * 코드와 섞여 있어서다. 주제 낱장은 처음부터 열 언어가 같은 화면을 쓰므로 여기에
 * 열을 다 둔다.
 */
export const TOPIC_L10N: Record<AnyLocale10, TopicCopy> = {
  ko: KO, en: EN, es: ES, 'pt-br': PT, ja: JA, de: DE, fr: FR, hi: HI,
  'zh-hans': ZH_HANS, 'zh-hant': ZH_HANT,
};
