/**
 * 얼굴 대칭 분석 — 실제 얼굴 랜드마크로 좌우 밸런스를 측정하는 참여형
 * 콘텐츠다. 완벽한 좌우 대칭인 얼굴은 실제로는 거의 없고, 자연스러운
 * 비대칭이 오히려 개성 있는 인상을 만든다는 게 일반적인 견해라, 점수가
 * 낮게 나와도 부정적으로 느껴지지 않도록 모든 구간을 긍정적으로 서술한다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick';

export const SYMMETRY_POOL: string[] = [
  '자연스러운 비대칭이 살아있는 편이에요. 좌우가 완벽히 똑같은 얼굴은 오히려 드물고, 이런 자연스러운 비대칭이 표정에 생동감을 더해준다는 이야기가 많습니다.',
  '은은한 비대칭이 느껴지는 얼굴이에요. 사진마다 조금씩 다른 매력이 드러나는 타입으로, 각도에 따라 인상이 다채롭게 바뀌는 편입니다.',
  '살짝 비대칭이 있지만 그게 오히려 개성으로 느껴지는 얼굴이에요. 좌우 어느 쪽에서 찍어도 나름의 매력이 살아나는 편입니다.',
  '적당한 균형감이 느껴지는 얼굴이에요. 살짝의 비대칭이 오히려 표정을 더 자연스럽고 생기 있게 만들어주는 타입입니다.',
  '무난하게 균형 잡힌 인상이에요. 좌우 밸런스가 안정적이라 어떤 각도에서 찍어도 무난하게 잘 나오는 편입니다.',
  '균형감이 좋은 얼굴이에요. 정면 사진에서 특히 안정적이고 편안한 인상을 주는 타입으로 해석됩니다.',
  '좌우 균형이 꽤 잘 맞는 얼굴이에요. 사진을 찍을 때 어느 쪽에서 찍어도 인상이 크게 달라지지 않는 편입니다.',
  '대칭이 잘 맞는 편안한 인상이에요. 정돈되고 안정적인 느낌을 주는 얼굴형으로, 신뢰감 있는 인상을 만든다는 이야기가 많습니다.',
  '대칭이 상당히 잘 맞는 얼굴이에요. 좌우 균형이 뛰어나 사진이 유독 안정적으로 잘 나오는 편이라는 평이 많습니다.',
  '대칭이 매우 잘 맞는 얼굴이에요. 어느 각도에서 찍어도 균형 잡힌 인상을 유지하는, 사진발이 좋은 타입으로 꼽힙니다.',
];

export const PHOTO_TIP_POOL: string[] = [
  '오늘 사진을 찍는다면 정면보다 살짝 3/4 각도가 더 자연스럽게 나올 수 있어요.',
  '조명이 얼굴 한쪽에서만 비치면 비대칭이 더 도드라져 보일 수 있으니, 정면광을 활용해보세요.',
  '살짝 미소를 지으면 좌우 균형과 상관없이 훨씬 편안한 인상을 만들 수 있어요.',
  '평소 잘 나온다고 느끼는 쪽 얼굴이 있다면, 그 각도를 기억해두는 것도 좋은 팁이에요.',
  '카메라를 눈높이보다 살짝 위에 두면 전체적인 비율이 더 안정적으로 나와요.',
  '거울 셀카보다 카메라로 직접 찍은 사진이 실제 인상에 더 가까워요.',
  '자연광이 있는 창가에서 찍으면 이목구비가 훨씬 또렷하게 나오는 편이에요.',
  '연속 촬영으로 여러 장 찍고 그중 표정이 편안한 컷을 고르는 것도 좋은 방법이에요.',
  '고개를 아주 살짝만 기울여도 인상이 한결 부드러워 보일 수 있어요.',
  '사진 찍기 직전 크게 한 번 웃었다가 힘을 빼면 자연스러운 표정이 나오기 쉬워요.',
];

export interface FaceSymmetryResult {
  percent: number;
  text: string;
  tip: string;
}

export function getFaceSymmetry(symmetryRatio: number): FaceSymmetryResult {
  const text = pickByRatio(SYMMETRY_POOL, symmetryRatio);
  const percent = toPercent(symmetryRatio);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const seed = mix32(Math.floor(symmetryRatio * 99991) >>> 0);
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(PHOTO_TIP_POOL, tipSeed);

  return { percent, text, tip };
}
