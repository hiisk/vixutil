import type { MoodKeyIntl, EmotionKeyIntl, ImpressionIdIntl, AnimalKeyIntl, FeatureKeyIntl, SubtypeKeyIntl } from '../snap-intl.ts';

/**
 * 한 언어의 스냅테스트 문구 전부.
 *
 * 원래는 `Record<SnapIntlLang, T>` 표 서른 개에 언어를 한 줄씩 끼워 넣는 구조였다.
 * 언어가 아홉이 되면 한 언어를 손볼 때 서른 곳을 오가야 해서, 언어별로 파일을
 * 하나씩 두고 [[lib/snap-intl.ts]]가 거기서 표를 조립하도록 바꿨다.
 *
 * **배열 길이는 언어마다 달라도 된다.** pickByRatio가 `floor(비율 × 길이)`로
 * 고르므로 길이가 곧 구간 수다. 열 개면 열 구간, 여섯 개면 여섯 구간이 된다.
 * 다만 결과 문장(smilePool·symmetryPool 등)은 구간이 촘촘할수록 좋으므로
 * 영어와 같은 길이로 맞추고, 조언 풀만 짧게 두었다.
 */
export type SnapCopy = {
  smilePool: string[];
  smileTip: string[];
  smileLabels: { curve: string; openness: string; balance: string };
  smileComments: {
    curve: (p: number) => string;
    openness: (p: number) => string;
    balance: (p: number) => string;
  };
  symmetryPool: string[];
  symmetryRegionLabels: Record<string, string>;
  symmetryRegionComment: { min: number; text: string }[];
  symmetryTip: string[];
  goldenOverall: string[];
  goldenMetricLabels: Record<string, { label: string; desc: string }>;
  goldenTip: string[];
  ui: {
    hubTitle: string; hubLead: string; hubKicker: string;
    detail: string; overall: string; breakdown: string; tipLabel: string;
  };
  moodMeta: Record<MoodKeyIntl, { label: string; vibe: string }>;
  moodPool: Record<MoodKeyIntl, string[]>;
  moodCaptionTip: string[];
  emotionLabels: Record<EmotionKeyIntl, string>;
  emotionPool: Record<EmotionKeyIntl, string[]>;
  emotionTip: string[];
  slantPool: string[];
  pressurePool: string[];
  handwritingTip: string[];
  impressionTypes: Record<ImpressionIdIntl, {
    label: string; emoji: string; desc: string; strength: string; keywords: string[]; color: string;
  }>;
  impressionTips: string[];
  animalLabels: Record<AnimalKeyIntl, string>;
  animalPool: Record<AnimalKeyIntl, string[]>;
  animalTip: string[];
  featureLabels: Record<FeatureKeyIntl, string>;
  featurePool: Record<FeatureKeyIntl, string[]>;
  faceReadingOverall: string[];
  faceReadingLuck: string[];
  subtypeLabels: Record<SubtypeKeyIntl, { label: string; vibe: string }>;
  swatchNames: Record<string, string>;
  personalColorPool: string[];
  personalColorTip: string[];
  coupleLabels: Record<string, string>;
  couplePool: string[];
  coupleComment: string[];
  coupleUi: {
    title: string; lead: string; privacy: string;
    photoA: string; photoB: string; pickBoth: string;
    score: string; breakdown: string; comment: string;
    disclaimer: string; reset: string; noFace: string;
  };
};

/** 색 이름의 열쇠는 한국어다 — hex는 한국어 lib이 계산해 주고 이름만 갈아 끼운다 */
export const SWATCH_KEYS = [
  '코랄', '피치핑크', '아이보리', '라이트카멜', '선노랑', '라임그린',
  '머스타드', '테라코타', '카키', '브라운', '올리브', '러스트오렌지',
  '라벤더', '로즈핑크', '파우더블루', '소프트그레이', '더스티로즈', '라일락',
  '로열블루', '퓨어화이트', '버건디', '차콜', '푸시아', '에메랄드',
] as const;
