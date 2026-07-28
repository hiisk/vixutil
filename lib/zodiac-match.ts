/**
 * 띠 궁합 — 십이지의 전통적 상성(삼합·육합·충)에 기반한다.
 *
 * 명리에서 지지(띠) 사이엔 잘 맞는 관계와 부딪치는 관계가 정해져 있다. 이 계산기는
 * 그중 가장 널리 쓰이는 세 가지를 쓴다. 별점처럼 임의로 뽑는 게 아니라 규칙이 있어,
 * 누가 계산해도 같은 결과가 나온다. 다만 이것은 오락·전통 참고용이며, 두 사람의
 * 실제 관계를 결정하는 것은 띠가 아니라 서로를 대하는 방식이라는 점을 페이지에서 밝힌다.
 *
 *  - 육합(六合): 짝을 이뤄 서로 끌어당기는 최고의 궁합.
 *  - 삼합(三合): 셋이 무리 지어 잘 어울리는 좋은 궁합.
 *  - 충(沖): 정반대에 놓여 부딪치기 쉬운 궁합(노력이 필요한 관계).
 *  - 같은 띠, 그 외는 무난한 관계로 본다.
 *
 * 형(刑)·해(害)·파(破) 같은 더 세밀한 관계는 다루지 않는다 — 해석이 갈리고 대중적으로
 * 덜 쓰인다.
 */

/** ANIMALS 순서(쥐0 … 돼지11)에 맞춘 인덱스 기준 관계표 */

/** 육합 6쌍 — [작은 인덱스, 큰 인덱스] */
const YUKHAP: [number, number][] = [
  [0, 1],   // 자축 쥐-소
  [2, 11],  // 인해 범-돼지
  [3, 10],  // 묘술 토끼-개
  [4, 9],   // 진유 용-닭
  [5, 8],   // 사신 뱀-원숭이
  [6, 7],   // 오미 말-양
];

/** 삼합 4묶음 */
const SAMHAP: number[][] = [
  [8, 0, 4],   // 신자진 원숭이-쥐-용
  [5, 9, 1],   // 사유축 뱀-닭-소
  [2, 6, 10],  // 인오술 범-말-개
  [11, 3, 7],  // 해묘미 돼지-토끼-양
];

export type MatchType = 'yukhap' | 'samhap' | 'same' | 'clash' | 'neutral';

export interface MatchInfo {
  type: MatchType;
  label: string;
  emoji: string;
  /** 기본 점수 (표시 점수는 두 띠로 약간 변주된다) */
  baseScore: number;
  headline: string;
}

export const MATCH_INFO: Record<MatchType, MatchInfo> = {
  yukhap:  { type: 'yukhap',  label: '천생연분 (육합)', emoji: '💞', baseScore: 92, headline: '서로를 끌어당기는 최고의 짝' },
  samhap:  { type: 'samhap',  label: '찰떡궁합 (삼합)', emoji: '💛', baseScore: 84, headline: '무리 지어 잘 어울리는 좋은 궁합' },
  same:    { type: 'same',    label: '닮은꼴 궁합',     emoji: '🤝', baseScore: 74, headline: '비슷해서 편하지만 부딪히기도' },
  neutral: { type: 'neutral', label: '무난한 궁합',     emoji: '🙂', baseScore: 68, headline: '서로 맞춰가면 충분히 좋은 사이' },
  clash:   { type: 'clash',   label: '노력이 필요한 궁합', emoji: '⚡', baseScore: 45, headline: '정반대라 부딪치기 쉬운 관계' },
};

function isYukhap(a: number, b: number): boolean {
  return YUKHAP.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
}
function isSamhap(a: number, b: number): boolean {
  return SAMHAP.some(g => g.includes(a) && g.includes(b));
}
/** 충 — 인덱스 차이가 6(정반대) */
function isClash(a: number, b: number): boolean {
  return Math.abs(a - b) === 6;
}

/** 두 띠 인덱스의 관계 유형을 판정한다. 우선순위: 육합 > 삼합 > 충 > 같은 띠 > 무난 */
export function matchType(a: number, b: number): MatchType {
  if (a === b) return 'same';
  if (isYukhap(a, b)) return 'yukhap';
  if (isSamhap(a, b)) return 'samhap';
  if (isClash(a, b)) return 'clash';
  return 'neutral';
}

export interface ZodiacMatchResult {
  type: MatchType;
  info: MatchInfo;
  /** 0~100 표시 점수 */
  score: number;
  /** 관계 원리 한 줄 설명 */
  reason: string;
  loveComment: string;
  adviceComment: string;
}

/**
 * 표시 점수는 기본 점수에 두 띠 인덱스로 만든 작은 변주(±4)를 더해, 같은 유형이라도
 * 조합마다 조금씩 달라 보이게 한다. 결정론적이라 같은 조합은 늘 같은 점수를 준다.
 * 어느 유형의 상·하한을 넘지 않도록 가둔다.
 */
function displayScore(type: MatchType, a: number, b: number): number {
  const base = MATCH_INFO[type].baseScore;
  const lo = Math.min(a, b), hi = Math.max(a, b);
  const jitter = ((lo * 7 + hi * 13) % 9) - 4; // -4 ~ +4, 결정론적
  return Math.max(0, Math.min(100, base + jitter));
}

const REASON: Record<MatchType, string> = {
  yukhap:  '십이지에서 짝을 이루는 육합 관계예요. 서로 부족한 부분을 채워주는 궁합으로 꼽힙니다.',
  samhap:  '십이지에서 셋이 어울리는 삼합 무리에 함께 속해요. 뜻이 잘 통하는 궁합으로 봅니다.',
  same:    '같은 띠라 성향이 닮았어요. 서로를 잘 이해하지만 비슷한 만큼 같은 데서 부딪히기도 합니다.',
  neutral: '특별한 상성 관계는 아니지만, 대부분의 관계가 여기에 속해요. 맞춰가기 나름입니다.',
  clash:   '십이지에서 정반대에 놓인 충(沖) 관계예요. 부딪치기 쉽지만, 서로 다른 만큼 배울 것도 많습니다.',
};

const LOVE: Record<MatchType, string> = {
  yukhap:  '끌림이 자연스럽고 함께 있을 때 편안한 사이예요. 큰 노력 없이도 서로에게 스며듭니다.',
  samhap:  '가치관이 잘 맞아 오래 함께하기 좋은 연애 궁합이에요. 친구처럼 편한 연인이 됩니다.',
  same:    '말하지 않아도 통하는 순간이 많아요. 다만 둘 다 같은 약점을 가질 수 있으니 서로 보완이 필요합니다.',
  neutral: '처음엔 밋밋해도 알아갈수록 정드는 타입이에요. 표현을 아끼지 않으면 깊어집니다.',
  clash:   '초반엔 티격태격할 수 있지만, 차이를 인정하면 오히려 서로를 성장시키는 커플이 됩니다.',
};

const ADVICE: Record<MatchType, string> = {
  yukhap:  '잘 맞는 만큼 서로를 당연하게 여기기 쉬워요. 작은 표현을 꾸준히 하면 오래갑니다.',
  samhap:  '편한 사이일수록 예의를 지키세요. 익숙함이 무심함이 되지 않게 챙기면 됩니다.',
  same:    '닮은 점은 즐기고, 부족한 점은 서로 채워주기로 약속해보세요.',
  neutral: '기대치를 서로 솔직히 나누면 오해가 줄어요. 속도를 맞춰가는 게 핵심입니다.',
  clash:   '다름을 "틀림"으로 받아들이지 않는 게 관건이에요. 한 발씩 양보하면 충은 오히려 매력이 됩니다.',
};

/** 두 띠 인덱스로 궁합 결과를 낸다 */
export function calcZodiacMatch(a: number, b: number): ZodiacMatchResult {
  const type = matchType(a, b);
  return {
    type,
    info: MATCH_INFO[type],
    score: displayScore(type, a, b),
    reason: REASON[type],
    loveComment: LOVE[type],
    adviceComment: ADVICE[type],
  };
}
