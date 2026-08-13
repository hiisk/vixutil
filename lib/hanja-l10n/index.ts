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
import { GLOSS_EN } from '../hanja/gloss-en.ts';

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
/*
 * ── 영어가 여기 없어서 한국어 훈음이 나가고 있었다 (2026-08-13) ──
 * lib/hanja/gloss-en.ts에 영어 새김 496개(성어 124 × 글자 4)가 다 채워져 있는데
 * 이 표에 en 칸이 없었다. idiomGloss가 `?? i.chars[n]`로 떨어지므로 **영어 낱장
 * 124장이 "있을 유 / 갖출 비 / 없을 무 / 근심 환"을 그대로 내보내고 있었다.**
 *
 * 검사가 못 잡은 까닭: tests/hanja-tools.test.ts는 gloss-en.ts **자료만** 본다
 * ("영어 새김이 성어마다 네 개씩 있고 한글이 없다"). 자료는 완벽했고 배선이 없었다.
 * 그래서 아래에 idiomGloss를 실제로 불러 보는 검사를 함께 세웠다.
 */
export const GLOSS_L10N: Partial<Record<Exclude<AnyLocale10, 'ko'>, Record<string, [string, string, string, string]>>> = {
  en: GLOSS_EN,
  es: GLOSS_ES, 'pt-br': GLOSS_PT_BR, ja: GLOSS_JA, de: GLOSS_DE, fr: GLOSS_FR, hi: GLOSS_HI,
  'zh-hans': GLOSS_ZH_HANS, 'zh-hant': GLOSS_ZH_HANT,
};
