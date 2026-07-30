// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { IntlLocale } from '../../locales.ts';
import { ES } from './es.ts';
import { PT_BR } from './pt-br.ts';
import { JA } from './ja.ts';
import { DE } from './de.ts';
import { FR } from './fr.ts';
import { HI } from './hi.ts';

/**
 * 공식 도구가 쓰는 용어·단위·뜻풀이의 번역.
 *
 * lib/formula/terms.ts의 표는 ko·en 두 칸이고 555개나 된다. 그 표를 여덟 칸으로
 * 바꾸면 555개가 한꺼번에 깨져서 한 섹션씩 옮길 수가 없다. 그래서 번역은 여기
 * 언어별 파일에 열쇠로 덧씌우고, 없는 열쇠는 영어로 되돌린다.
 *
 * 되돌아간 자리는 그 페이지에서 유일하게 영어인 칸이 되므로, 섹션을 내보내기 전에
 * tests/formula-l10n.test.ts가 그 섹션이 쓰는 열쇠를 모두 세어 빠진 것을 막는다.
 */
export interface FormulaL10n {
  /** 입력·결과 라벨 */
  TERMS: Record<string, string>;
  /** 단위 기호 */
  UNITS: Record<string, string>;
  /** 라벨 옆에 붙는 한 줄 뜻풀이 */
  DESC: Record<string, string>;
}

export const FORMULA_L10N: Record<Exclude<IntlLocale, 'en'>, FormulaL10n> = {
  es: ES,
  'pt-br': PT_BR,
  ja: JA,
  de: DE,
  fr: FR,
  hi: HI,
};
