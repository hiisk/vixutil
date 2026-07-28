/**
 * MBTI 궁합 — 네 지표(E/I, N/S, T/F, J/P)의 상성을 투명한 규칙으로 계산한다.
 *
 * MBTI 궁합에는 공식 기준이 없다. 여기서는 널리 통용되는 "핵심은 닮고 곁은 다르면
 * 좋다"는 통념을 규칙으로 옮겼다:
 *   - 세상을 보는 방식(N/S)과 판단하는 방식(T/F)이 같으면 대화가 잘 통한다(가점 큼).
 *   - 에너지 방향(E/I)과 생활 방식(J/P)은 다를 때 서로를 보완한다(가점).
 * 별점처럼 무작위가 아니라 규칙이 있어, 같은 조합은 늘 같은 결과가 나온다.
 * 물론 오락·참고용이며, 관계를 정하는 건 유형이 아니라 서로를 대하는 태도다.
 */

export const MBTI_TYPES = [
  'ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP',
  'ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ',
] as const;
export type MbtiType = typeof MBTI_TYPES[number];

export function isMbti(s: string): s is MbtiType {
  return (MBTI_TYPES as readonly string[]).includes(s.toUpperCase());
}

export type MatchBand = 'best' | 'good' | 'ok' | 'work';

export interface BandInfo {
  band: MatchBand;
  label: string;
  emoji: string;
  headline: string;
}

const BAND: Record<MatchBand, BandInfo> = {
  best: { band: 'best', label: '천생연분 궁합', emoji: '💞', headline: '보는 눈이 통하고 서로를 채워주는 사이' },
  good: { band: 'good', label: '잘 맞는 궁합',   emoji: '💛', headline: '대화가 잘 통하는 좋은 궁합' },
  ok:   { band: 'ok',   label: '무난한 궁합',     emoji: '🙂', headline: '맞춰가면 충분히 좋은 사이' },
  work: { band: 'work', label: '노력이 필요한 궁합', emoji: '⚡', headline: '다른 만큼 배울 것도 많은 사이' },
};

interface AxisResult { same: boolean; }

function axes(a: MbtiType, b: MbtiType): { ei: AxisResult; ns: AxisResult; tf: AxisResult; jp: AxisResult } {
  return {
    ei: { same: a[0] === b[0] },
    ns: { same: a[1] === b[1] },
    tf: { same: a[2] === b[2] },
    jp: { same: a[3] === b[3] },
  };
}

/** 규칙: N/S·T/F는 같을수록, E/I·J/P는 다를수록 가점 */
export function mbtiScore(a: MbtiType, b: MbtiType): number {
  const x = axes(a, b);
  let s = 60;
  s += x.ns.same ? 14 : -8;   // 세상 보는 방식
  s += x.tf.same ? 10 : -6;   // 판단하는 방식
  s += x.ei.same ? 2 : 8;     // 에너지 방향 (다르면 보완)
  s += x.jp.same ? 3 : 6;     // 생활 방식 (다르면 보완)
  if (a === b) s -= 2;        // 완전히 같은 유형은 편하지만 자극이 덜하다
  return Math.max(0, Math.min(100, s));
}

export function mbtiBand(score: number): MatchBand {
  if (score >= 84) return 'best';
  if (score >= 74) return 'good';
  if (score >= 64) return 'ok';
  return 'work';
}

export interface MbtiMatchResult {
  a: MbtiType;
  b: MbtiType;
  score: number;
  info: BandInfo;
  reason: string;
  loveComment: string;
  adviceComment: string;
}

function reasonText(a: MbtiType, b: MbtiType): string {
  const x = axes(a, b);
  const parts: string[] = [];
  if (x.ns.same) parts.push('세상을 보는 방식(N/S)이 같아 대화가 잘 통해요');
  else parts.push('세상을 보는 방식(N/S)이 달라 관점 차이가 있을 수 있어요');
  if (x.tf.same) parts.push('판단 기준(T/F)도 비슷해 결정이 매끄러워요');
  else parts.push('판단 기준(T/F)이 달라 부딪히기도 하지만 서로 보완돼요');
  if (!x.ei.same) parts.push('에너지 방향(E/I)이 반대라 서로의 리듬을 채워줍니다');
  if (!x.jp.same) parts.push('생활 방식(J/P)이 달라 유연함과 계획성이 어우러져요');
  return parts.join('. ') + '.';
}

const LOVE: Record<MatchBand, string> = {
  best: '가치관과 대화가 잘 맞아 편안하면서도 설레는 연애를 해요. 서로가 서로의 안식처가 됩니다.',
  good: '통하는 지점이 많아 대화가 즐거운 연애예요. 다른 부분은 오히려 신선한 자극이 됩니다.',
  ok:   '처음엔 조율이 필요해도, 서로를 알아갈수록 정드는 타입이에요.',
  work: '다른 점이 많아 초반엔 티격태격할 수 있지만, 차이를 존중하면 함께 성장하는 커플이 됩니다.',
};

const ADVICE: Record<MatchBand, string> = {
  best: '잘 맞는 만큼 서로를 당연하게 여기기 쉬워요. 작은 표현을 꾸준히 하면 오래갑니다.',
  good: '통하는 부분은 즐기고, 다른 부분은 바꾸려 하기보다 인정해보세요.',
  ok:   '기대치를 솔직히 나누면 오해가 줄어요. 속도를 맞춰가는 게 핵심입니다.',
  work: '"틀림"이 아니라 "다름"으로 보는 게 관건이에요. 한 발씩 맞추면 충돌이 케미가 됩니다.',
};

export function calcMbtiMatch(a: MbtiType, b: MbtiType): MbtiMatchResult {
  const score = mbtiScore(a, b);
  const band = mbtiBand(score);
  return {
    a, b, score,
    info: BAND[band],
    reason: reasonText(a, b),
    loveComment: LOVE[band],
    adviceComment: ADVICE[band],
  };
}
