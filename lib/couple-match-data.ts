/**
 * 커플 관상 궁합 — 두 사람의 얼굴 사진에서 각각 이목구비 비율을 실측하고,
 * 두 사람의 인상 벡터가 얼마나 닮았는지(관상 궁합)를 거리 계산으로 점수화한다.
 * "닮은 커플이 잘 어울린다"는 속설을 재미로 풀어낸 오락 콘텐츠이며, 무작위가
 * 아니라 두 얼굴의 실제 측정값 차이에 기반한다.
 */

import { hashString, mix32, pick } from './ratio-pick';

/** 관상/동물상에서 쓰는 것과 동일한 6개 인상 지표 */
export interface FaceVector {
  faceShape: number;
  eyeTilt: number;
  eyeWidth: number;
  jawWidth: number;
  noseWidth: number;
  mouthWidth: number;
}

export const MATCH_POOL: string[] = [
  '서로 무척 닮은 인상의 커플이에요. 첫인상부터 편안하게 어우러지는, 오래 봐도 질리지 않는 짝이에요.',
  '분위기가 잘 맞는 조화로운 커플이에요. 함께 있으면 자연스럽게 잘 어울린다는 이야기를 들을 것 같아요.',
  '닮은 듯 다른 매력이 균형을 이루는 커플이에요. 서로의 다른 점이 오히려 보완이 되는 관계예요.',
  '서로 다른 개성이 뚜렷한 커플이에요. 정반대의 매력이 부딪히며 만들어내는 케미가 재밌는 조합이에요.',
  '독특하고 개성 넘치는 조합의 커플이에요. 남들과는 다른 우리만의 스타일이 있는 짝이에요.',
];

export const COMMENT_POOL: string[] = [
  '닮은 커플이 오래 간다는 말이 있죠. 서로의 표정을 자주 보고 웃어주세요.',
  '오늘은 둘이 같은 각도로 셀카를 찍어보면 재밌는 결과가 나올 거예요.',
  '커플은 함께 지낼수록 표정과 인상이 닮아간다고 해요.',
  '서로 다른 점이 있다면, 그게 바로 오래 설렐 수 있는 이유예요.',
  '오늘은 둘만의 특별한 사진 한 장 남겨보는 건 어떨까요.',
  '잘 어울리는 커플의 비결은 닮은 외모보다 닮아가려는 마음이래요.',
  '함께 찍은 사진이 많을수록 추억도 인상도 더 닮아간다고 해요.',
  '오늘은 서로의 매력 포인트를 한 가지씩 말해주는 시간을 가져봐요.',
];

export interface CoupleMatchResult {
  score: number;
  headline: string;
  comment: string;
  breakdown: { label: string; score: number }[];
}

const LABELS: Record<keyof FaceVector, string> = {
  faceShape: '얼굴형',
  eyeTilt: '눈매',
  eyeWidth: '눈 크기',
  jawWidth: '턱선',
  noseWidth: '코',
  mouthWidth: '입',
};

/**
 * 두 얼굴 벡터의 각 지표별 유사도(1 - |차이|)를 0~100으로 환산하고,
 * 평균을 최종 궁합 점수로 삼는다. 완전히 같으면 100, 정반대면 0에 가깝다.
 */
export function getCoupleMatch(a: FaceVector, b: FaceVector): CoupleMatchResult {
  const keys = Object.keys(LABELS) as (keyof FaceVector)[];
  const breakdown = keys.map(key => {
    const diff = Math.abs(a[key] - b[key]);
    // 지표 유사도를 살짝 완만하게(궁합 점수가 너무 박하지 않게) 보정
    const sim = Math.max(0, Math.min(100, Math.round((1 - diff) * 100)));
    return { label: LABELS[key], score: sim };
  });

  const rawAvg = breakdown.reduce((s, m) => s + m.score, 0) / breakdown.length;
  // 55~99 범위로 리스케일 — 오락 콘텐츠 특성상 지나치게 낮은 점수는 피한다
  const score = Math.round(55 + (rawAvg / 100) * 44);

  const seed = mix32(Math.floor(rawAvg * 99991) >>> 0);
  const headline = score >= 88
    ? pick(MATCH_POOL.slice(0, 2), seed)
    : score >= 75
      ? pick(MATCH_POOL.slice(2, 3), seed)
      : pick(MATCH_POOL.slice(3), seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const commentSeed = (hashString(ymd) ^ seed) >>> 0;
  const comment = pick(COMMENT_POOL, commentSeed);

  return { score, headline, comment, breakdown };
}
