/**
 * 미소 지수 측정 — 입꼬리가 입 중심보다 얼마나 위로 올라갔는지를 실제
 * 랜드마크로 측정하는 참여형 콘텐츠다. 무표정 사진이 나와도 부정적으로
 * 느껴지지 않도록 모든 구간을 긍정적으로 서술한다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick';

export const SMILE_POOL: string[] = [
  '차분하고 담백한 표정이 담긴 사진이에요. 무표정에 가까울수록 오히려 분위기 있고 세련된 인상을 줄 수 있어요.',
  '편안하고 자연스러운 표정이에요. 힘을 뺀 표정이 오히려 더 자연스러운 매력을 만들어주는 편입니다.',
  '은은하게 여유가 느껴지는 표정이에요. 잔잔한 미소는 과하지 않아서 오래 봐도 편안한 인상을 줍니다.',
  '살짝 미소가 번지는 편안한 표정이에요. 부담스럽지 않으면서도 다정한 느낌을 주는 표정입니다.',
  '자연스러운 미소가 느껴지는 표정이에요. 억지스럽지 않아서 훨씬 진짜 같은 편안함이 느껴집니다.',
  '기분 좋은 미소가 담긴 사진이에요. 보는 사람도 같이 기분이 좋아지는 온화한 표정입니다.',
  '환하게 웃는 밝은 표정이에요. 입꼬리가 확실히 올라가 있어 긍정적인 에너지가 느껴집니다.',
  '시원하게 웃는 매력적인 표정이에요. 자신감 있는 느낌을 주는 밝은 미소입니다.',
  '활짝 웃는 사랑스러운 표정이에요. 보는 사람까지 웃게 만드는 전염성 있는 미소입니다.',
  '누구보다 환하고 시원한 미소예요. 사진 속 표정만으로도 분위기를 화사하게 만드는 힘이 있습니다.',
];

export const SMILE_TIP_POOL: string[] = [
  '눈으로 먼저 웃으면(스마이즈) 입만 웃을 때보다 훨씬 자연스러운 미소가 나와요.',
  '사진 찍기 직전 짧게 숨을 내쉬면 표정에서 힘이 빠져 더 편안하게 나와요.',
  '거울 앞에서 내가 가장 자연스럽다고 느끼는 미소를 미리 한 번 연습해보는 것도 좋아요.',
  '입꼬리만 올리기보다 볼 전체를 살짝 올린다는 느낌으로 웃으면 더 자연스러워요.',
  '카메라를 오래 응시하기보다 살짝 다른 곳을 보다가 찍으면 표정이 더 자연스럽게 나와요.',
  '연속 촬영으로 여러 장을 찍고 자연스러운 순간을 골라보세요.',
  '친한 사람과 이야기하면서 찍으면 훨씬 편안한 미소가 나오는 편이에요.',
  '입을 살짝 벌리고 웃으면 더 시원하고 밝은 인상을 줄 수 있어요.',
  '무표정 사진도 분위기 있는 매력이 있으니, 표정에 너무 힘주지 않아도 괜찮아요.',
  '좋아하는 생각을 떠올리면서 찍으면 표정이 훨씬 자연스럽게 풀려요.',
];

export interface SmileScoreResult {
  percent: number;
  text: string;
  tip: string;
}

export function getSmileScore(smileRatio: number): SmileScoreResult {
  const text = pickByRatio(SMILE_POOL, smileRatio);
  const percent = toPercent(smileRatio);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const seed = mix32(Math.floor(smileRatio * 99991) >>> 0);
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(SMILE_TIP_POOL, tipSeed);

  return { percent, text, tip };
}
