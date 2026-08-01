import type { Quiz } from '../types.ts';
import type { AnyLocale10 } from '../locales.ts';
import { QUIZZES_EN, QUIZZES_EN_MAP } from '../quiz-en.ts';
import { QUIZZES_ES, QUIZZES_ES_MAP } from './es.ts';
import { QUIZZES_PT, QUIZZES_PT_MAP } from './pt-br.ts';
import { QUIZZES_JA, QUIZZES_JA_MAP } from './ja.ts';
import { QUIZZES_DE, QUIZZES_DE_MAP } from './de.ts';
import { QUIZZES_FR, QUIZZES_FR_MAP } from './fr.ts';
import { QUIZZES_HI, QUIZZES_HI_MAP } from './hi.ts';
import { QUIZZES_ZH_HANS, QUIZZES_ZH_HANS_MAP } from './zh-hans.ts';
import { QUIZZES_ZH_HANT, QUIZZES_ZH_HANT_MAP } from './zh-hant.ts';

/**
 * 한국어를 뺀 아홉 언어의 퀴즈.
 *
 * 한국어 182종은 한국사·K-POP처럼 문화 의존이 커서 옮기지 않는다
 * ([[lib/quiz-en.ts]] 주석). 영어판 여섯 종은 세계 지리·과학·세계사처럼
 * 어디서도 통하는 주제라 그대로 아홉 언어로 옮겼다.
 *
 * **보기 순서는 아홉 언어가 같아야 한다** — correct는 opts의 번호다.
 * 검사가 이것을 강제한다([[tests/quiz-intl.test.ts]]).
 */
export type QuizIntlLang = Exclude<AnyLocale10, 'ko'>;

export const QUIZZES_INTL: Record<QuizIntlLang, Quiz[]> = {
  'en': QUIZZES_EN,
  'es': QUIZZES_ES,
  'pt-br': QUIZZES_PT,
  'ja': QUIZZES_JA,
  'de': QUIZZES_DE,
  'fr': QUIZZES_FR,
  'hi': QUIZZES_HI,
  'zh-hans': QUIZZES_ZH_HANS,
  'zh-hant': QUIZZES_ZH_HANT,
};

export const QUIZZES_INTL_MAP: Record<QuizIntlLang, Record<string, Quiz>> = {
  'en': QUIZZES_EN_MAP,
  'es': QUIZZES_ES_MAP,
  'pt-br': QUIZZES_PT_MAP,
  'ja': QUIZZES_JA_MAP,
  'de': QUIZZES_DE_MAP,
  'fr': QUIZZES_FR_MAP,
  'hi': QUIZZES_HI_MAP,
  'zh-hans': QUIZZES_ZH_HANS_MAP,
  'zh-hant': QUIZZES_ZH_HANT_MAP,
};
