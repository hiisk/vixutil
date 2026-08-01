import type { SajuCopy } from './types.ts';
import { EN } from './en.ts';
import { ES } from './es.ts';
import { PT } from './pt-br.ts';
import { JA } from './ja.ts';

/**
 * 사주 아홉 언어.
 *
 * 다른 섹션과 달리 영어까지 여기 있다 — 영역별 운세 생성기가 문장을 코드 사이에
 * 끼워 두고 있어서, 언어를 더하려면 어차피 영어부터 표로 빼야 했다.
 */
export type SajuL10nLang = 'en' | 'es' | 'pt-br' | 'ja' | 'de' | 'fr' | 'hi' | 'zh-hans' | 'zh-hant';

export const SAJU_L10N: Record<SajuL10nLang, SajuCopy> = {
  en: EN, es: ES, 'pt-br': PT, ja: JA,
} as Record<SajuL10nLang, SajuCopy>;

/** 표 하나를 아홉 언어로 펼친다 */
export function spreadSaju<K extends keyof SajuCopy>(key: K): Record<SajuL10nLang, SajuCopy[K]> {
  const out = {} as Record<SajuL10nLang, SajuCopy[K]>;
  for (const lang of Object.keys(SAJU_L10N) as SajuL10nLang[]) out[lang] = SAJU_L10N[lang][key];
  return out;
}
