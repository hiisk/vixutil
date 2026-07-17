/**
 * 첫인상 분석 — 얼굴 랜드마크에서 실제로 잰 세 가지 비율로 인상 유형을 나눈다.
 *
 *  - 눈 크기 비율 (눈 높이 / 얼굴 높이): 크면 또렷·활발, 작으면 차분·시크
 *  - 얼굴 가로세로 비율: 넓으면 편안·친근, 길면 우아·세련
 *  - 입꼬리 각도: 올라가면 다정, 수평이면 담백
 *
 * 관상이 아니라 "사진 속 인상"을 다루는 오락 콘텐츠다. 그래서 어떤 결과도
 * 우열이 없도록 전부 긍정적으로 서술한다 — 얼굴로 사람을 평가하는 톤이
 * 되면 그 순간 이 콘텐츠는 재미가 아니라 상처가 된다.
 */

import { hashString, mix32, pick, pickByRatio, toPercent } from './ratio-pick.ts';

export interface ImpressionType {
  id: string;
  label: string;
  emoji: string;
  /** 이 유형의 인상을 한 문단으로 */
  desc: string;
  /** 이 인상이 강점이 되는 상황 */
  strength: string;
  keywords: string[];
  color: string;
}

/**
 * 눈 크기 × 얼굴 비율의 2×2 조합에 입꼬리를 더해 유형을 정한다.
 * 조합이 실측에서 나오므로 사진마다 결과가 달라진다.
 */
export const IMPRESSION_TYPES: ImpressionType[] = [
  {
    id: 'bright',
    label: '환하게 다가오는 인상',
    emoji: '☀️',
    desc: '눈이 또렷하고 입꼬리에 여유가 있어 처음 봐도 말을 걸기 쉬운 얼굴이에요. 표정에서 경계심이 느껴지지 않아 상대가 먼저 다가오는 편입니다. 사진 한 장으로도 "좋은 사람일 것 같다"는 인상을 만드는 타입이에요.',
    strength: '면접 첫인사, 소개팅 첫 만남처럼 짧은 순간에 호감을 남겨야 하는 자리',
    keywords: ['친근함', '또렷함', '접근성', '밝음'],
    color: 'from-amber-400 to-orange-500',
  },
  {
    id: 'calm',
    label: '차분하게 신뢰를 주는 인상',
    emoji: '🌿',
    desc: '눈매가 과하지 않고 표정에 힘이 빠져 있어 편안한 안정감을 주는 얼굴이에요. 처음엔 조용해 보여도 오래 볼수록 편해지는 타입입니다. 말보다 태도로 신뢰를 쌓는 인상이라 시간이 지날수록 평가가 올라가는 편이에요.',
    strength: '오래 함께 일해야 하는 관계, 상대를 안심시켜야 하는 상담·설득 자리',
    keywords: ['안정감', '신뢰', '편안함', '진중함'],
    color: 'from-emerald-400 to-teal-600',
  },
  {
    id: 'chic',
    label: '또렷하고 시크한 인상',
    emoji: '🖤',
    desc: '눈매가 선명하고 얼굴선이 정돈돼 있어 도시적인 분위기를 풍기는 얼굴이에요. 표정을 절제한 만큼 쉽게 읽히지 않아 궁금증을 남기는 타입입니다. 사진에서 특히 강한 인상을 남기고, 무표정일 때 오히려 매력이 살아나는 편이에요.',
    strength: '프로필 사진, 강한 인상을 남겨야 하는 발표나 무대',
    keywords: ['시크함', '도시적', '절제', '존재감'],
    color: 'from-slate-500 to-slate-700',
  },
  {
    id: 'soft',
    label: '부드럽고 다정한 인상',
    emoji: '🌸',
    desc: '얼굴선이 둥글고 입꼬리가 자연스럽게 올라가 있어 온기가 느껴지는 얼굴이에요. 상대의 긴장을 풀어주는 힘이 있어 처음 만나는 자리에서도 대화가 쉽게 이어집니다. 오래 봐도 부담이 없는 인상이에요.',
    strength: '사람을 자주 만나는 일, 상대가 마음을 열어야 하는 자리',
    keywords: ['다정함', '온화함', '포용', '편안함'],
    color: 'from-rose-400 to-pink-500',
  },
  {
    id: 'elegant',
    label: '단정하고 우아한 인상',
    emoji: '🕊️',
    desc: '얼굴선이 길고 이목구비가 균형 있게 자리 잡아 정돈된 인상을 주는 얼굴이에요. 화려하게 튀기보다 은은하게 눈에 남는 타입입니다. 격식 있는 자리에서 특히 잘 어울리고, 나이가 들수록 매력이 깊어지는 인상이에요.',
    strength: '격식 있는 자리, 신뢰와 품위가 중요한 관계',
    keywords: ['단정함', '균형', '우아함', '절제된 매력'],
    color: 'from-violet-400 to-purple-600',
  },
  {
    id: 'energetic',
    label: '생기 있고 활발한 인상',
    emoji: '⚡',
    desc: '눈이 크고 표정이 살아 있어 에너지가 먼저 전해지는 얼굴이에요. 가만히 있어도 활기가 느껴져 분위기를 띄우는 역할을 자주 맡게 되는 타입입니다. 단체 사진에서 시선이 먼저 가는 인상이에요.',
    strength: '팀 분위기를 이끌어야 하는 자리, 활력이 필요한 순간',
    keywords: ['활기', '에너지', '생동감', '주목'],
    color: 'from-sky-400 to-blue-600',
  },
];

/** 첫인상을 좋게 만드는 팁 — 얼굴이 아니라 태도와 촬영에 관한 것만 */
export const IMPRESSION_TIPS: string[] = [
  '첫인상은 얼굴보다 표정에서 결정된다는 연구가 많아요. 만나기 직전 숨을 한 번 내쉬고 힘을 빼보세요.',
  '눈을 마주치는 시간이 1초만 길어져도 호감도가 올라간다고 알려져 있어요.',
  '사진에서는 카메라보다 살짝 위를 보면 눈이 더 또렷하게 담겨요.',
  '어깨를 펴는 것만으로도 인상이 크게 달라져요. 표정보다 자세가 먼저 보이거든요.',
  '자연광에서 찍으면 얼굴 그림자가 부드러워져 인상이 훨씬 편안해 보여요.',
  '정면보다 15도 정도 몸을 틀면 얼굴선이 자연스럽게 살아나요.',
  '말할 때 고개를 살짝 끄덕이면 듣고 있다는 신호가 되어 호감이 올라가요.',
  '첫 만남에서 상대의 이름을 한 번 불러주면 인상이 훨씬 오래 남아요.',
  '입꼬리만 올리는 미소보다 눈가까지 움직이는 미소가 진짜로 읽혀요.',
  '사진 찍기 전 혀를 입천장에 살짝 붙이면 턱선이 정리돼요.',
  '밝은 색 상의를 입으면 얼굴에 빛이 반사돼 인상이 화사해져요.',
  '긴장되면 손보다 발에 힘을 주면 표정이 덜 굳어요.',
];

export interface FirstImpressionResult {
  type: ImpressionType;
  /** 눈 크기 비율 → 0~100 */
  eyeScore: number;
  /** 얼굴 가로세로 → 0~100 (높을수록 갸름) */
  faceScore: number;
  /** 입꼬리 각도 → 0~100 (높을수록 올라감) */
  mouthScore: number;
  tip: string;
}

/**
 * 실측 비율 세 개로 유형을 정한다.
 * @param eyeRatio   눈 높이 / 얼굴 높이 (0~1로 정규화된 값)
 * @param faceRatio  얼굴 세로 / 가로 (0~1로 정규화된 값)
 * @param mouthRatio 입꼬리 올라간 정도 (0~1)
 */
export function analyzeFirstImpression(
  eyeRatio: number,
  faceRatio: number,
  mouthRatio: number,
): FirstImpressionResult {
  // 랜드마크 좌표가 겹치면 0으로 나눠 NaN이 나온다. 그대로 두면 화면에
  // "NaN점"이 찍히므로 여기서 막는다 — 측정 실패는 중간값으로 본다.
  const safe = (x: number) => (Number.isFinite(x) ? Math.max(0, Math.min(1, x)) : 0.5);
  eyeRatio = safe(eyeRatio);
  faceRatio = safe(faceRatio);
  mouthRatio = safe(mouthRatio);

  const bigEyes = eyeRatio >= 0.5;
  const longFace = faceRatio >= 0.5;
  const smiling = mouthRatio >= 0.5;

  // 세 축의 조합으로 유형을 고른다. 실측이 바뀌면 결과도 바뀐다.
  let id: string;
  if (bigEyes && smiling) id = longFace ? 'energetic' : 'bright';
  else if (bigEyes && !smiling) id = longFace ? 'chic' : 'energetic';
  else if (!bigEyes && smiling) id = longFace ? 'elegant' : 'soft';
  else id = longFace ? 'elegant' : 'calm';

  const type = IMPRESSION_TYPES.find(t => t.id === id)!;

  // 팁은 측정값을 시드로 골라 사진마다 다르게 나오되, 같은 사진이면 같게 나온다.
  const seed = hashString(`${eyeRatio.toFixed(3)}-${faceRatio.toFixed(3)}-${mouthRatio.toFixed(3)}`);

  return {
    type,
    eyeScore: toPercent(eyeRatio),
    faceScore: toPercent(faceRatio),
    mouthScore: toPercent(mouthRatio),
    tip: pick(IMPRESSION_TIPS, seed),
  };
}

// pickByRatio, mix32는 다른 스냅과의 일관성을 위해 re-export한다.
export { pickByRatio, mix32 };
