/**
 * 표정 감정 분석 — face-api의 감정 인식 모델(faceExpressionNet)로 사진 속
 * 표정에서 7가지 감정(중립·행복·슬픔·분노·놀람·두려움·혐오)의 확률을
 * 실제로 추론한다. 무작위가 아니라 학습된 신경망의 출력이며, 여기에 붙는
 * 코멘트는 그 결과를 재미있게 풀어낸 오락 콘텐츠다.
 */

import { hashString, mix32, pick } from './ratio-pick';

export type EmotionKey = 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised';

export const EMOTION_META: Record<EmotionKey, { label: string; emoji: string; from: string; to: string }> = {
  happy:     { label: '행복',   emoji: '😄', from: '#fbbf24', to: '#f59e0b' },
  neutral:   { label: '무표정', emoji: '😐', from: '#94a3b8', to: '#475569' },
  surprised: { label: '놀람',   emoji: '😲', from: '#38bdf8', to: '#6366f1' },
  sad:       { label: '슬픔',   emoji: '🥲', from: '#60a5fa', to: '#3730a3' },
  angry:     { label: '분노',   emoji: '😠', from: '#f87171', to: '#b91c1c' },
  fearful:   { label: '두려움', emoji: '😨', from: '#a78bfa', to: '#6d28d9' },
  disgusted: { label: '싫음',   emoji: '😖', from: '#4ade80', to: '#15803d' },
};

/** 감정 라벨 순서 — face-api FACE_EXPRESSION_LABELS와 동일 */
export const EMOTION_ORDER: EmotionKey[] = ['neutral', 'happy', 'sad', 'angry', 'fearful', 'disgusted', 'surprised'];

export const EMOTION_POOL: Record<EmotionKey, string[]> = {
  happy: [
    '사진 속에서 행복이 가장 크게 묻어나요. 보는 사람까지 기분 좋아지는 밝은 에너지가 느껴지는 표정이에요.',
    '환한 행복 에너지가 화면 밖까지 전해지는 표정이에요. 이런 사진은 프로필로 두면 첫인상 점수가 올라간다고 하죠.',
    '웃는 표정이 제일 크게 잡혔어요. 긍정적인 기운이 가득해서 함께 있으면 즐거울 것 같은 인상이에요.',
    '행복 지수가 가장 높게 나왔어요. 자연스러운 미소가 매력 포인트인 표정이에요.',
  ],
  neutral: [
    '차분한 무표정이 가장 크게 잡혔어요. 감정을 드러내지 않는 시크하고 담백한 분위기가 매력이에요.',
    '무심한 듯 차분한 표정이 지배적이에요. 이런 무드는 오히려 세련되고 도시적인 인상을 줘요.',
    '감정을 절제한 담백한 표정이에요. 잔잔하면서도 진중한 분위기가 느껴지는 인상이에요.',
    '중립적인 표정이 가장 크게 나왔어요. 속을 알 수 없는 미스터리한 매력이 있는 무드예요.',
  ],
  surprised: [
    '놀란 듯한 표정이 제일 크게 잡혔어요. 눈이 크게 떠진 생동감 있는 순간이 포착된 사진이에요.',
    '놀람 지수가 가장 높게 나왔어요. 리액션이 큰 생기발랄한 인상을 주는 표정이에요.',
    '눈이 커진 놀란 표정이 지배적이에요. 순수하고 호기심 많은 분위기가 느껴져요.',
    '깜짝 놀란 듯한 표정이 매력 포인트예요. 표현력이 풍부한 인상을 주는 사진이에요.',
  ],
  sad: [
    '살짝 아련한 표정이 가장 크게 잡혔어요. 감성적이고 깊이 있는 분위기가 느껴지는 인상이에요.',
    '촉촉하고 서정적인 표정이 지배적이에요. 이런 무드는 오히려 감성 사진으로 잘 어울려요.',
    '조금 쓸쓸한 듯한 감성이 묻어나는 표정이에요. 섬세하고 여린 매력이 느껴지는 순간이에요.',
    '아련한 분위기가 가장 크게 나왔어요. 감정선이 풍부한 인상을 주는 표정이에요.',
  ],
  angry: [
    '살짝 진지하고 강렬한 표정이 잡혔어요. 카리스마 있고 단단한 인상을 주는 순간이에요.',
    '결연한 듯 강한 표정이 지배적이에요. 이런 무드는 오히려 프로페셔널하고 당찬 인상을 줘요.',
    '진지하게 몰입한 듯한 표정이에요. 강단 있고 뚜렷한 존재감이 느껴지는 순간이에요.',
    '단호한 분위기가 가장 크게 나왔어요. 자기 확신이 느껴지는 강렬한 인상이에요.',
  ],
  fearful: [
    '살짝 긴장한 듯한 표정이 잡혔어요. 조심스럽고 섬세한 분위기가 느껴지는 인상이에요.',
    '긴장감이 느껴지는 표정이 지배적이에요. 진지하게 집중한 순간이 포착된 것 같아요.',
    '조심스러운 듯한 표정이 매력 포인트예요. 신중하고 섬세한 인상을 주는 순간이에요.',
    '살짝 떨리는 듯한 감정이 묻어나는 표정이에요. 여리고 섬세한 분위기가 느껴져요.',
  ],
  disgusted: [
    '살짝 찡그린 듯한 표정이 잡혔어요. 솔직한 감정 표현이 오히려 개성 있게 느껴지는 순간이에요.',
    '표정에 솔직함이 묻어나요. 감정을 숨기지 않는 당당한 매력이 느껴지는 인상이에요.',
    '까다로운 듯 진솔한 표정이 지배적이에요. 개성 뚜렷하고 소신 있는 분위기가 느껴져요.',
    '살짝 시크하게 찡그린 표정이 매력 포인트예요. 자기 취향이 확실한 인상을 주는 순간이에요.',
  ],
};

export const EMOTION_TIP_POOL: string[] = [
  '오늘은 거울 보며 가장 자연스러운 미소를 한 번 연습해보면 좋은 날이에요.',
  '표정이 밝으면 하루의 기분도 따라온다고 해요. 오늘은 의식적으로 한 번 더 웃어봐요.',
  '사진 찍을 때 눈으로 먼저 웃으면 훨씬 자연스러운 표정이 나와요.',
  '오늘은 좋아하는 사람과 셀카 한 장 남겨보는 건 어떨까요.',
  '무표정도 매력이지만, 오늘만큼은 활짝 웃는 사진을 남겨봐요.',
  '표정은 전염된다고 하죠. 오늘 당신의 미소가 누군가의 하루를 밝힐 수 있어요.',
  '오늘은 기분 좋았던 순간을 사진으로 기록해두면 나중에 힘이 될 거예요.',
  '카메라 앞에서 긴장된다면, 좋아하는 것을 떠올려보세요. 표정이 부드러워져요.',
  '오늘은 다양한 표정으로 사진을 찍어보며 나만의 각도를 찾아봐요.',
  '거울 속 내 표정에 한 번 웃어주는 것만으로도 기분이 나아질 수 있어요.',
];

export interface ExpressionScore { key: EmotionKey; label: string; emoji: string; percent: number }

export interface ExpressionResult {
  top: EmotionKey;
  label: string;
  emoji: string;
  from: string;
  to: string;
  text: string;
  scores: ExpressionScore[];
  tip: string;
}

/**
 * face-api 감정 확률(각 0~1, 합≈1)을 받아 결과를 만든다.
 * 가장 확률이 높은 감정을 대표로 삼고, 전체 분포를 퍼센트로 함께 보여준다.
 */
export function getExpressionResult(probs: Record<EmotionKey, number>): ExpressionResult {
  const scores: ExpressionScore[] = EMOTION_ORDER
    .map(key => ({
      key,
      label: EMOTION_META[key].label,
      emoji: EMOTION_META[key].emoji,
      percent: Math.round((probs[key] ?? 0) * 100),
    }))
    .sort((a, b) => b.percent - a.percent);

  const top = scores[0].key;
  const meta = EMOTION_META[top];
  const seed = mix32(Math.floor((probs[top] ?? 0) * 99991 + (probs.happy ?? 0) * 7919) >>> 0);
  const text = pick(EMOTION_POOL[top], seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(EMOTION_TIP_POOL, tipSeed);

  return {
    top,
    label: meta.label,
    emoji: meta.emoji,
    from: meta.from,
    to: meta.to,
    text,
    scores,
    tip,
  };
}
