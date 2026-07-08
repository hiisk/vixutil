/**
 * 얼굴 대칭 분석 — 실제 얼굴 랜드마크로 좌우 밸런스를 부위별(눈·눈썹·입·턱)로
 * 나눠 측정하는 참여형 콘텐츠다. 완벽한 좌우 대칭인 얼굴은 실제로는 거의 없고,
 * 자연스러운 비대칭이 오히려 개성 있는 인상을 만든다는 게 일반적인 견해라,
 * 점수가 낮게 나와도 부정적으로 느껴지지 않도록 모든 구간을 긍정적으로 서술한다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick';

export const SYMMETRY_POOL: string[] = [
  '자연스러운 비대칭이 뚜렷하게 살아있는 얼굴이에요. 좌우가 완벽히 똑같은 얼굴은 오히려 인위적으로 느껴지기 쉬운데, 이런 자연스러운 좌우 차이가 표정에 생동감과 입체감을 더해줍니다. 실제로 배우·모델 중에도 비대칭이 매력 포인트인 경우가 많아요.',
  '은은한 비대칭이 개성으로 느껴지는 얼굴이에요. 웃을 때와 무표정일 때의 인상이 조금씩 달라, 사진마다 다른 매력이 드러나는 타입입니다. 각도에 따라 분위기가 다채롭게 바뀌어 표현할 수 있는 인상의 폭이 넓은 편이에요.',
  '살짝의 좌우 차이가 오히려 생기를 주는 얼굴이에요. 완벽한 대칭보다 이런 미세한 비대칭이 사람을 더 자연스럽고 친근하게 보이게 한다는 연구도 있습니다. 어느 쪽에서 찍어도 나름의 매력이 살아나는 편이에요.',
  '적당한 균형감 속에 자연스러운 개성이 공존하는 얼굴이에요. 좌우가 크게 다르지 않으면서도 미세한 차이가 있어, 표정이 딱딱하지 않고 부드럽게 느껴지는 타입입니다. 사진에서 편안한 인상을 주는 밸런스예요.',
  '전반적으로 무난하게 균형 잡힌 인상이에요. 좌우 밸런스가 안정적이라 어떤 각도에서 찍어도 인상이 크게 흔들리지 않고 무난하게 잘 나오는 편입니다. 신뢰감을 주는 정돈된 얼굴형으로 해석돼요.',
  '균형감이 좋아 안정적인 인상을 주는 얼굴이에요. 정면 사진에서 특히 편안하고 단정한 느낌을 주며, 이목구비가 좌우로 고르게 자리 잡아 차분한 인상을 만들어냅니다.',
  '좌우 균형이 꽤 잘 맞는 얼굴이에요. 사진을 찍을 때 어느 쪽에서 찍어도 인상이 크게 달라지지 않아, 셀카든 남이 찍어주든 결과가 일정하게 잘 나오는 편입니다. 안정적인 사진발의 비결이에요.',
  '대칭이 잘 맞아 정돈된 인상을 주는 얼굴이에요. 좌우가 고르게 균형을 이뤄 신뢰감 있고 단정한 느낌을 주며, 증명사진이나 프로필 사진처럼 정면을 강조하는 사진에서 특히 강점을 보이는 타입입니다.',
  '대칭이 상당히 잘 맞는 얼굴이에요. 좌우 이목구비가 거울처럼 고르게 자리 잡아, 사진이 유독 안정적이고 균형 있게 나온다는 평이 많습니다. 정석적인 조화로움이 돋보이는 인상이에요.',
  '대칭이 매우 잘 맞는 보기 드문 얼굴이에요. 어느 각도에서 찍어도 균형 잡힌 인상을 유지하는, 이른바 사진발이 좋은 타입으로 꼽힙니다. 좌우 조화가 뛰어나 어떤 헤어스타일이나 각도에도 안정적으로 잘 어울려요.',
];

/** 부위별 대칭도 구간별 한 줄 코멘트 */
export const REGION_COMMENT: { min: number; text: string }[] = [
  { min: 85, text: '거의 완벽하게 대칭' },
  { min: 70, text: '균형이 잘 맞는 편' },
  { min: 55, text: '무난한 균형' },
  { min: 40, text: '살짝 비대칭이 있는 편' },
  { min: 0, text: '개성 있는 비대칭' },
];

export function regionComment(percent: number): string {
  return (REGION_COMMENT.find(r => percent >= r.min) ?? REGION_COMMENT[REGION_COMMENT.length - 1]).text;
}

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

export interface SymmetryRegion { key: string; label: string; percent: number; comment: string }

export interface FaceSymmetryResult {
  percent: number;
  text: string;
  regions: SymmetryRegion[];
  bestRegion: string;
  tip: string;
}

const REGION_LABELS: Record<string, string> = {
  eye: '눈 높이',
  brow: '눈썹',
  mouth: '입꼬리',
  jaw: '턱선',
};

/**
 * 부위별 대칭 비율(각 0~1, 1=완벽대칭)을 받아 전체 점수와 부위별 상세를 만든다.
 * 전체 점수는 부위별 평균으로, 페이지의 종합 판정과 일치한다.
 */
export function getFaceSymmetry(regionRatios: Record<string, number>): FaceSymmetryResult {
  const regions: SymmetryRegion[] = Object.entries(REGION_LABELS).map(([key, label]) => {
    const percent = toPercent(regionRatios[key] ?? 0.5);
    return { key, label, percent, comment: regionComment(percent) };
  });

  const avgRatio = Object.keys(REGION_LABELS).reduce((s, k) => s + (regionRatios[k] ?? 0.5), 0) / Object.keys(REGION_LABELS).length;
  const percent = toPercent(avgRatio);
  const text = pickByRatio(SYMMETRY_POOL, avgRatio);
  const bestRegion = [...regions].sort((a, b) => b.percent - a.percent)[0].label;

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const seed = mix32(Math.floor(avgRatio * 99991) >>> 0);
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(PHOTO_TIP_POOL, tipSeed);

  return { percent, text, regions, bestRegion, tip };
}
