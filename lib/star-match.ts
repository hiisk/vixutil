/**
 * 별자리 궁합 — 서양 점성술의 원소(4원소) 상성에 기반한다.
 *
 * 점성술에서 12별자리는 각각 불·흙·바람·물 네 원소 중 하나에 속하고, 원소끼리의
 * 관계로 궁합을 본다. 이것은 널리 통용되는 규칙이라 별점처럼 임의로 뽑지 않고
 * 결정론적으로 계산된다. 물론 오락·참고용이며, 관계를 결정하는 건 별자리가 아니라
 * 서로를 대하는 태도라는 점은 페이지에서 밝힌다.
 *
 * 상성 규칙(일반적 통설):
 *  - 같은 원소: 잘 통하는 최고의 궁합.
 *  - 불↔바람, 흙↔물: 서로를 북돋는 보완 관계(좋은 궁합).
 *  - 불↔물, 흙↔바람: 성질이 어긋나 노력이 필요한 관계.
 *  - 같은 별자리: 닮아서 편하지만 같은 약점을 공유.
 */

export type ElementKey = 'fire' | 'earth' | 'air' | 'water';

export interface StarSign {
  id: string;
  name: string;
  emoji: string;
  period: string;
  element: ElementKey;
}

/** SIGNS 순서는 양자리(춘분)부터 — 화면 배치와 계산 모두 이 순서를 쓴다 */
export const SIGNS: StarSign[] = [
  { id: 'aries',       name: '양자리',     emoji: '♈', period: '3.21~4.19',  element: 'fire'  },
  { id: 'taurus',      name: '황소자리',   emoji: '♉', period: '4.20~5.20',  element: 'earth' },
  { id: 'gemini',      name: '쌍둥이자리', emoji: '♊', period: '5.21~6.21',  element: 'air'   },
  { id: 'cancer',      name: '게자리',     emoji: '♋', period: '6.22~7.22',  element: 'water' },
  { id: 'leo',         name: '사자자리',   emoji: '♌', period: '7.23~8.22',  element: 'fire'  },
  { id: 'virgo',       name: '처녀자리',   emoji: '♍', period: '8.23~9.22',  element: 'earth' },
  { id: 'libra',       name: '천칭자리',   emoji: '♎', period: '9.23~10.23', element: 'air'   },
  { id: 'scorpio',     name: '전갈자리',   emoji: '♏', period: '10.24~11.22',element: 'water' },
  { id: 'sagittarius', name: '사수자리',   emoji: '♐', period: '11.23~12.21',element: 'fire'  },
  { id: 'capricorn',   name: '염소자리',   emoji: '♑', period: '12.22~1.19', element: 'earth' },
  { id: 'aquarius',    name: '물병자리',   emoji: '♒', period: '1.20~2.18',  element: 'air'   },
  { id: 'pisces',      name: '물고기자리', emoji: '♓', period: '2.19~3.20',  element: 'water' },
];

export const ELEMENT_LABEL: Record<ElementKey, { label: string; emoji: string }> = {
  fire:  { label: '불',   emoji: '🔥' },
  earth: { label: '흙',   emoji: '🌱' },
  air:   { label: '바람', emoji: '💨' },
  water: { label: '물',   emoji: '💧' },
};

export type StarMatchType = 'same-sign' | 'same-element' | 'complement' | 'challenge';

export interface StarMatchInfo {
  type: StarMatchType;
  label: string;
  emoji: string;
  baseScore: number;
  headline: string;
}

export const STAR_MATCH_INFO: Record<StarMatchType, StarMatchInfo> = {
  'same-element': { type: 'same-element', label: '천생연분 (같은 원소)', emoji: '💞', baseScore: 90, headline: '같은 결이라 말이 잘 통하는 사이' },
  'complement':   { type: 'complement',   label: '찰떡궁합 (보완 원소)', emoji: '💛', baseScore: 82, headline: '서로를 북돋아 주는 좋은 궁합' },
  'same-sign':    { type: 'same-sign',    label: '닮은꼴 궁합',          emoji: '🤝', baseScore: 74, headline: '닮아서 편하지만 약점도 닮은 사이' },
  'challenge':    { type: 'challenge',    label: '노력이 필요한 궁합',   emoji: '⚡', baseScore: 52, headline: '성질이 달라 맞춰가야 하는 관계' },
};

/** 원소 상성: 불↔바람, 흙↔물이 서로 보완 */
const COMPLEMENT: Record<ElementKey, ElementKey> = {
  fire: 'air',
  air: 'fire',
  earth: 'water',
  water: 'earth',
};

export function starMatchType(aIdx: number, bIdx: number): StarMatchType {
  if (aIdx === bIdx) return 'same-sign';
  const ea = SIGNS[aIdx].element;
  const eb = SIGNS[bIdx].element;
  if (ea === eb) return 'same-element';
  if (COMPLEMENT[ea] === eb) return 'complement';
  return 'challenge';
}

export interface StarMatchResult {
  type: StarMatchType;
  info: StarMatchInfo;
  score: number;
  reason: string;
  loveComment: string;
  adviceComment: string;
}

/** 같은 유형이라도 조합마다 조금씩 달라 보이게 하는 결정론적 변주(±4) */
function displayScore(type: StarMatchType, a: number, b: number): number {
  const base = STAR_MATCH_INFO[type].baseScore;
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const jitter = ((lo * 5 + hi * 11) % 9) - 4;
  return Math.max(0, Math.min(100, base + jitter));
}

const REASON: Record<StarMatchType, string> = {
  'same-element': '두 별자리가 같은 원소에 속해요. 세상을 비슷한 방식으로 느껴 서로를 쉽게 이해합니다.',
  'complement':   '서로를 북돋아 주는 보완 원소 관계예요(불↔바람, 흙↔물). 부족한 부분을 채워주는 궁합입니다.',
  'same-sign':    '같은 별자리라 기질이 닮았어요. 편하지만 같은 약점을 공유할 수 있어 서로 보완이 필요합니다.',
  'challenge':    '성질이 다른 원소끼리라 처음엔 어긋나기 쉬워요. 다만 다른 만큼 서로에게 배울 것도 많습니다.',
};

const LOVE: Record<StarMatchType, string> = {
  'same-element': '공감대가 넓어 대화가 잘 통하는 연애를 해요. 큰 마찰 없이 편안하게 흘러갑니다.',
  'complement':   '한쪽의 열정과 다른 쪽의 여유가 어우러지는 커플이에요. 서로에게 자극이자 안식이 됩니다.',
  'same-sign':    '취향과 리듬이 비슷해 처음부터 편해요. 다만 둘 다 같은 부분에서 서툴 수 있습니다.',
  'challenge':    '초반엔 티격태격해도, 차이를 존중하면 오히려 오래가는 연애가 됩니다.',
};

const ADVICE: Record<StarMatchType, string> = {
  'same-element': '너무 비슷해 안일해지지 않게, 새로운 경험을 함께 만들어보세요.',
  'complement':   '서로의 다름이 매력이에요. 상대의 방식을 바꾸려 하기보다 그대로 즐기세요.',
  'same-sign':    '닮은 점은 즐기되, 부족한 부분은 서로 채워주기로 정해두면 좋아요.',
  'challenge':    '다름을 "틀림"으로 받아들이지 마세요. 한 발씩 맞춰가면 충돌은 케미가 됩니다.',
};

export function calcStarMatch(a: number, b: number): StarMatchResult {
  const type = starMatchType(a, b);
  return {
    type,
    info: STAR_MATCH_INFO[type],
    score: displayScore(type, a, b),
    reason: REASON[type],
    loveComment: LOVE[type],
    adviceComment: ADVICE[type],
  };
}
