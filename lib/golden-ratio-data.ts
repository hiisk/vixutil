/**
 * 황금비율 테스트 — 실제 얼굴 랜드마크로 이목구비 비례를 측정해 미의
 * 황금비(φ≈1.618)에 얼마나 가까운지를 점수화한다. 무작위가 아니라 실측
 * 좌표에서 계산한 비율이며, "황금비=미의 절대 기준"은 아니라는 점은 오락
 * 콘텐츠로서 분명히 밝힌다.
 */

import { hashString, mix32, pick } from './ratio-pick';

export const PHI = 1.618;

/** 측정 비율이 φ에 가까울수록 100에 근접하는 점수(0~100) */
export function ratioScore(r: number): number {
  return Math.max(0, Math.min(100, Math.round(100 - (Math.abs(r - PHI) / PHI) * 150)));
}

export const OVERALL_POOL: string[] = [
  '이목구비 비례가 황금비에 상당히 가까운 편이에요. 균형 잡힌 조화로움이 안정적인 인상을 만들어주는 얼굴이에요.',
  '전체적으로 비율 밸런스가 좋은 얼굴이에요. 어느 한쪽으로 치우치지 않은 조화로운 비례가 매력 포인트예요.',
  '이목구비가 균형감 있게 자리 잡은 얼굴이에요. 안정적이면서도 편안한 인상을 주는 비율이에요.',
  '조화로운 비례가 돋보이는 얼굴이에요. 각 부위가 서로 잘 어우러져 자연스러운 인상을 만들어줘요.',
  '개성이 살아있는 비율의 얼굴이에요. 황금비에 얽매이지 않는 나만의 매력이 뚜렷한 인상이에요.',
  '독특하고 개성 있는 비례를 가진 얼굴이에요. 정형화되지 않은 매력이 오히려 기억에 남는 인상을 줘요.',
];

export const TIP_POOL: string[] = [
  '황금비는 미의 참고 기준일 뿐, 진짜 매력은 표정과 분위기에서 나온다고 해요.',
  '오늘은 자신 있게 웃는 사진 한 장 남겨보세요. 비율보다 미소가 인상을 좌우해요.',
  '사진 각도만 살짝 바꿔도 이목구비 비율은 달라 보여요. 나에게 맞는 각도를 찾아봐요.',
  '헤어스타일에 따라 얼굴 비율이 다르게 보이기도 해요. 오늘은 새로운 스타일에 도전해봐요.',
  '비율은 참고만, 표정 관리가 인상의 8할이라는 말도 있어요.',
  '정면보다 살짝 3/4 각도가 비율이 예쁘게 나오는 경우가 많아요.',
  '조명이 위에서 은은하게 비치면 이목구비가 더 또렷하고 균형 있어 보여요.',
  '오늘은 거울 보며 가장 마음에 드는 나의 각도를 한 번 찾아보세요.',
];

export interface GoldenRatioMetric {
  key: string;
  label: string;
  ratio: number;
  score: number;
  desc: string;
}

export interface GoldenRatioResult {
  totalScore: number;
  overall: string;
  metrics: GoldenRatioMetric[];
  tip: string;
}

export const METRIC_LABELS: Record<string, { label: string; desc: string }> = {
  faceThirds: { label: '얼굴 세로 비율', desc: '눈썹~코끝 대 코끝~턱끝의 비율' },
  faceWidth: { label: '얼굴 가로세로 비율', desc: '얼굴 길이 대 광대 너비의 비율' },
  eyeMouth: { label: '눈~입 균형', desc: '두 눈 사이 간격 대 입 너비의 비율' },
  noseMouth: { label: '코~입 균형', desc: '코 너비 대 입 너비의 비율' },
};

export function getGoldenRatio(ratios: Record<string, number>): GoldenRatioResult {
  const metrics: GoldenRatioMetric[] = Object.entries(ratios).map(([key, ratio]) => ({
    key,
    label: METRIC_LABELS[key]?.label ?? key,
    desc: METRIC_LABELS[key]?.desc ?? '',
    ratio,
    score: ratioScore(ratio),
  }));

  const totalScore = Math.round(metrics.reduce((s, m) => s + m.score, 0) / metrics.length);

  const seed = mix32(Math.floor(totalScore * 99991) >>> 0);
  const overall = totalScore >= 80
    ? pick(OVERALL_POOL.slice(0, 4), seed)
    : pick(OVERALL_POOL.slice(4), seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(TIP_POOL, tipSeed);

  return { totalScore, overall, metrics, tip };
}
