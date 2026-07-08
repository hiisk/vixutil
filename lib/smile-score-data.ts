/**
 * 미소 지수 측정 — 입꼬리가 입 중심보다 얼마나 위로 올라갔는지를 실제
 * 랜드마크로 측정하는 참여형 콘텐츠다. 무표정 사진이 나와도 부정적으로
 * 느껴지지 않도록 모든 구간을 긍정적으로 서술한다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick';

export const SMILE_POOL: string[] = [
  '차분하고 담백한 표정이 담긴 사진이에요. 입꼬리가 거의 수평에 가까워 감정을 절제한 시크한 무드가 느껴집니다. 무표정에 가까운 얼굴은 오히려 도시적이고 세련된 인상을 주며, 프로필이나 컨셉 사진에서 분위기 있게 활용하기 좋은 표정이에요.',
  '편안하고 힘을 뺀 자연스러운 표정이에요. 입꼬리에 살짝만 긴장이 풀려 있어 꾸미지 않은 담백한 매력이 드러납니다. 억지로 웃지 않은 이런 표정이 오히려 진솔하고 편안한 인상을 주는 경우가 많아요.',
  '은은하게 여유가 느껴지는 잔잔한 표정이에요. 입꼬리가 미세하게 올라가 과하지 않은 미소를 만들어내며, 오래 봐도 부담 없는 인상을 줍니다. 차분하면서도 다정한 분위기가 공존하는 표정이에요.',
  '살며시 미소가 번지는 편안한 표정이에요. 입꼬리가 부드럽게 올라가 다정하면서도 은은한 인상을 만들어냅니다. 부담스럽지 않아 상대의 경계를 자연스럽게 풀어주는 매력이 있는 미소예요.',
  '자연스러운 미소가 또렷하게 느껴지는 표정이에요. 입꼬리가 기분 좋게 올라가 억지스럽지 않은 진짜 같은 편안함이 전해집니다. 이런 미소는 사진에서 호감도를 높여주는 대표적인 표정으로 꼽혀요.',
  '기분 좋은 미소가 가득 담긴 사진이에요. 입꼬리가 시원하게 올라가 보는 사람까지 덩달아 미소 짓게 만드는 온화한 에너지가 느껴집니다. 밝고 다가가기 쉬운 인상을 주는 표정이에요.',
  '환하게 웃는 밝은 표정이에요. 입꼬리가 확실히 위로 당겨져 긍정적인 에너지가 화면 밖까지 전해집니다. 이런 웃는 사진은 첫인상 점수를 크게 올려준다고 알려져 있어요.',
  '시원하게 웃는 매력적인 표정이에요. 입꼬리가 큼직하게 올라가 자신감 있고 활기찬 인상을 만들어냅니다. 에너지가 느껴지는 이런 미소는 단체 사진에서도 시선을 끄는 편이에요.',
  '활짝 웃는 사랑스러운 표정이에요. 입꼬리가 시원하게 당겨지고 표정 전체에 웃음이 퍼져 있어, 보는 사람까지 웃게 만드는 전염성 있는 미소가 매력입니다. 밝은 에너지가 돋보이는 순간이에요.',
  '누구보다 환하고 시원한 만개한 미소예요. 입꼬리가 가장 크게 올라가 표정 전체가 웃음으로 가득 차 있어, 사진 한 장만으로도 분위기를 화사하게 밝히는 힘이 있습니다. 긍정적인 기운이 넘치는 최고의 표정이에요.',
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

export interface SmileMetric { key: string; label: string; percent: number; comment: string }

export interface SmileScoreResult {
  percent: number;
  text: string;
  metrics: SmileMetric[];
  tip: string;
}

function curveComment(p: number) {
  return p >= 75 ? '입꼬리가 시원하게 올라감' : p >= 55 ? '입꼬리가 살짝 올라감' : p >= 40 ? '수평에 가까운 입매' : '차분하게 다문 입매';
}
function opennessComment(p: number) {
  return p >= 65 ? '활짝 벌린 환한 웃음' : p >= 35 ? '살짝 벌어진 자연스러운 미소' : '입을 다문 잔잔한 미소';
}
function balanceComment(p: number) {
  return p >= 80 ? '좌우 균형이 잘 맞는 미소' : p >= 60 ? '대체로 균형 잡힌 미소' : '한쪽이 살짝 올라간 개성 있는 미소';
}

/**
 * smileRatio(입꼬리 올라간 정도)를 대표 점수로 삼고, 입 벌어짐·좌우 균형을
 * 보조 지표로 함께 보여준다(모두 0~1 실측값).
 */
export function getSmileScore(smileRatio: number, opennessRatio: number, balanceRatio: number): SmileScoreResult {
  const text = pickByRatio(SMILE_POOL, smileRatio);
  const percent = toPercent(smileRatio);

  const metrics: SmileMetric[] = [
    { key: 'curve', label: '입꼬리 올라감', percent: toPercent(smileRatio), comment: curveComment(toPercent(smileRatio)) },
    { key: 'openness', label: '입 벌어짐', percent: toPercent(opennessRatio), comment: opennessComment(toPercent(opennessRatio)) },
    { key: 'balance', label: '좌우 균형', percent: toPercent(balanceRatio), comment: balanceComment(toPercent(balanceRatio)) },
  ];

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const seed = mix32(Math.floor(smileRatio * 99991 + opennessRatio * 7919) >>> 0);
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(SMILE_TIP_POOL, tipSeed);

  return { percent, text, metrics, tip };
}
