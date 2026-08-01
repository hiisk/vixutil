import type { MatchType } from '../zodiac-match.ts';
import type { StarMatchType } from '../star-match.ts';
import type { MatchBand } from '../mbti-match.ts';

/**
 * 궁합 네 종(띠·별자리·MBTI·혈액형)의 한 언어 문구.
 *
 * 판정은 각 lib의 순수 함수가 하고 여기 있는 건 결과에 붙일 말뿐이다 — 그래서
 * 열 언어가 같은 조합에 같은 점수·같은 유형을 낸다.
 *
 * 혈액형 열쇠는 blood-match.ts의 key()와 같은 규칙(A<B<O<AB)이라 문자열 정렬에
 * 기대면 안 된다 — 그렇게 하면 'AB'가 'B' 앞에 온다.
 */
export interface Texts {
  label: string; headline: string; reason: string; love: string; advice: string;
}

export type BloodPair =
  | 'A-A' | 'A-B' | 'A-O' | 'A-AB'
  | 'B-B' | 'B-O' | 'B-AB'
  | 'O-O' | 'O-AB' | 'AB-AB';

export interface AxisText {
  nsSame: string; nsDiff: string; tfSame: string; tfDiff: string;
  eiDiff: string; jpDiff: string; join: string; end: string;
}

export interface MatchUi {
  pickBoth: string; you: string; partner: string; score: string;
  why: string; love: string; advice: string; reset: string; disclaimer: string;
}

export type MatchCopy = {
  zodiac: Record<MatchType, Texts>;
  star: Record<StarMatchType, Texts>;
  /** MBTI의 reason은 축별로 조립하므로 빈 문자열이다 — axis가 그 자리를 채운다 */
  mbti: Record<MatchBand, Texts>;
  axis: AxisText;
  blood: Record<BloodPair, Texts>;
  ui: MatchUi;
};
