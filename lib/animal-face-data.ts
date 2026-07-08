/**
 * 동물상 테스트 — 실제 얼굴 랜드마크로 측정한 눈매(처짐/올라감)·얼굴형
 * (갸름/둥근)·눈 크기 세 지표를, 동물별로 미리 정의한 기준 벡터와
 * 최근접 이웃 방식으로 비교해 가장 가까운 동물상을 찾는다. 무작위가
 * 아니라 실측 좌표 기반의 거리 계산 결과다.
 */

import { hashString, mix32, pick } from './ratio-pick';

export type AnimalKey = 'dog' | 'cat' | 'fox' | 'rabbit' | 'bear' | 'deer';

/** [눈매(0=처짐~1=올라감), 얼굴형(0=갸름~1=둥근/각진), 눈 크기(0=작음~1=큼)] */
export const ANIMAL_ARCHETYPE: Record<AnimalKey, [number, number, number]> = {
  dog:    [0.25, 0.55, 0.60],
  cat:    [0.80, 0.30, 0.45],
  fox:    [0.90, 0.20, 0.35],
  rabbit: [0.45, 0.40, 0.85],
  bear:   [0.35, 0.80, 0.50],
  deer:   [0.40, 0.35, 0.75],
};

export const ANIMAL_META: Record<AnimalKey, { label: string; emoji: string; from: string; to: string }> = {
  dog:    { label: '강아지상', emoji: '🐶', from: '#fbbf24', to: '#f59e0b' },
  cat:    { label: '고양이상', emoji: '🐱', from: '#64748b', to: '#334155' },
  fox:    { label: '여우상',   emoji: '🦊', from: '#f97316', to: '#c2410c' },
  rabbit: { label: '토끼상',   emoji: '🐰', from: '#fda4af', to: '#ec4899' },
  bear:   { label: '곰상',     emoji: '🐻', from: '#a16207', to: '#78350f' },
  deer:   { label: '사슴상',   emoji: '🦌', from: '#a8a29e', to: '#78716c' },
};

export const ANIMAL_POOL: Record<AnimalKey, string[]> = {
  dog: [
    '누구에게나 편안하고 친근한 강아지상입니다. 순수하고 다정한 인상으로 처음 만난 사람도 금방 마음을 여는 편입니다.',
    '장난기 가득하면서도 다정한 강아지상입니다. 함께 있으면 즐겁고 편안한 분위기를 만드는 타입으로 통합니다.',
    '밝고 애교 많은 강아지상입니다. 표정 하나하나가 살아있어 감정이 풍부하다는 이야기를 자주 듣는 편입니다.',
    '충성심 강하고 다정한 강아지상입니다. 한번 마음을 준 사람에게는 끝까지 잘해주는 타입으로 여겨집니다.',
    '순둥순둥한 매력의 강아지상입니다. 편안하고 친근한 분위기로 주변 사람들을 쉽게 무장해제시키는 편입니다.',
    '활기차고 사랑스러운 강아지상입니다. 어디서든 분위기 메이커 역할을 자연스럽게 맡게 되는 타입입니다.',
    '정 많고 살가운 강아지상입니다. 상대를 편안하게 만드는 힘이 있어 친구가 많은 편이라는 평이 많습니다.',
    '귀엽고 붙임성 좋은 강아지상입니다. 낯가림 없이 먼저 다가가는 친화력이 매력 포인트로 꼽힙니다.',
  ],
  cat: [
    '도도하고 세련된 매력의 고양이상입니다. 시크한 첫인상과 달리 알고 보면 은근히 다정한 반전 매력이 있는 편입니다.',
    '독립적이고 자기주관이 뚜렷한 고양이상입니다. 혼자 있는 시간도 즐길 줄 아는 여유가 매력으로 꼽힙니다.',
    '세련되고 우아한 고양이상입니다. 도시적인 분위기로 어디서든 시선을 끄는 존재감이 있는 타입입니다.',
    '새침하면서도 매력적인 고양이상입니다. 쉽게 곁을 내주지 않아 더 궁금해지는 타입으로 통합니다.',
    '도발적이고 매혹적인 눈매의 고양이상입니다. 자신감 있는 분위기가 자연스러운 카리스마로 이어지는 편입니다.',
    '쿨하고 시크한 고양이상입니다. 겉보기와 달리 친해지면 은근히 살가운 반전이 있는 타입입니다.',
    '우아하고 자유분방한 고양이상입니다. 자기만의 페이스를 지키는 독립적인 매력이 돋보입니다.',
    '매력적이고 신비로운 고양이상입니다. 알 듯 모를 듯한 분위기가 사람을 끌어당기는 힘이 있습니다.',
  ],
  fox: [
    '영리하고 매혹적인 여우상입니다. 날렵한 눈매가 총명한 인상을 주며, 눈치가 빠르고 재치 있는 성격으로 통합니다.',
    '매력적이고 신비로운 여우상입니다. 치켜 올라간 눈매가 강한 자기주장과 카리스마를 상징한다고 여겨집니다.',
    '세련되고 날카로운 매력의 여우상입니다. 첫인상부터 강렬해서 한번 보면 잊히지 않는 타입입니다.',
    '영악할 정도로 눈치 빠른 여우상입니다. 상황 판단이 빠르고 위기 대처 능력이 좋다는 평이 많습니다.',
    '매혹적이고 도발적인 여우상입니다. 도도한 매력 속에 은근한 다정함이 숨어있는 반전 있는 타입입니다.',
    '총명하고 야무진 여우상입니다. 어디서든 눈에 띄는 세련된 분위기를 지닌 편입니다.',
    '치명적인 매력의 여우상입니다. 강렬한 눈빛 하나로 분위기를 압도하는 힘이 있는 타입입니다.',
    '재기발랄하고 영리한 여우상입니다. 순발력 있는 말솜씨로 주변을 사로잡는 매력이 있습니다.',
  ],
  rabbit: [
    '사랑스럽고 순수한 토끼상입니다. 크고 동그란 눈이 귀여운 매력을 자연스럽게 뿜어내는 타입입니다.',
    '여리여리하고 청순한 토끼상입니다. 보호본능을 자극하는 순한 인상으로 주변의 사랑을 듬뿍 받는 편입니다.',
    '밝고 사랑스러운 토끼상입니다. 순수하고 다정한 분위기로 누구에게나 호감을 얻기 쉬운 타입입니다.',
    '귀엽고 애교 많은 토끼상입니다. 잘 놀라는 듯 순한 눈빛이 오히려 사랑스러운 매력 포인트로 꼽힙니다.',
    '청순하고 사랑스러운 토끼상입니다. 순진무구한 인상 덕분에 친근하게 다가가고 싶어지는 타입입니다.',
    '말랑말랑하고 부드러운 매력의 토끼상입니다. 다정하고 순한 분위기로 편안함을 주는 편입니다.',
    '생기 넘치고 사랑스러운 토끼상입니다. 밝은 에너지로 주변 분위기를 화사하게 만드는 타입입니다.',
    '순하고 귀여운 토끼상입니다. 여린 듯하면서도 은근히 야무진 반전 매력이 있는 편입니다.',
  ],
  bear: [
    '듬직하고 편안한 곰상입니다. 넉넉한 인상 덕분에 주변 사람들이 믿고 의지하게 되는 타입으로 통합니다.',
    '포근하고 다정한 곰상입니다. 편안한 분위기로 함께 있으면 마음이 놓인다는 말을 자주 듣는 편입니다.',
    '우직하고 신뢰감 있는 곰상입니다. 겉보기와 달리 섬세하고 다정한 반전 매력이 있는 타입입니다.',
    '여유롭고 넉넉한 인상의 곰상입니다. 웬만한 일에는 크게 동요하지 않는 안정감 있는 성격으로 여겨집니다.',
    '포근하고 든든한 곰상입니다. 곁에 있으면 편안해지는 존재감으로 인복이 많은 편이라는 평이 많습니다.',
    '순박하고 다정한 곰상입니다. 꾸밈없는 매력으로 오래 알수록 정이 깊어지는 타입입니다.',
    '믿음직스럽고 따뜻한 곰상입니다. 편안한 인상 덕분에 고민 상담을 자주 받는 타입으로 통합니다.',
    '묵직하면서도 사랑스러운 곰상입니다. 든든함과 귀여움을 동시에 지닌 매력적인 타입입니다.',
  ],
  deer: [
    '청초하고 우아한 사슴상입니다. 크고 맑은 눈망울이 순수하고 여린 인상을 자연스럽게 만들어줍니다.',
    '여리여리하고 기품 있는 사슴상입니다. 우아한 분위기로 은근한 존재감을 드러내는 타입입니다.',
    '순하고 우아한 매력의 사슴상입니다. 맑은 눈빛이 신뢰감과 편안함을 동시에 전달하는 편입니다.',
    '청순하면서도 세련된 사슴상입니다. 여린 듯하면서도 우아한 분위기가 매력 포인트로 꼽힙니다.',
    '고요하고 기품 있는 사슴상입니다. 조용한 카리스마로 은은하게 시선을 끄는 타입입니다.',
    '맑고 순한 눈빛의 사슴상입니다. 다가가기 편안하면서도 우아한 분위기를 함께 지닌 편입니다.',
    '우아하고 여린 매력의 사슴상입니다. 섬세한 감성과 배려심이 돋보이는 타입으로 여겨집니다.',
    '청순하고 기품 있는 사슴상입니다. 조용하지만 깊은 인상을 남기는 은은한 매력이 있습니다.',
  ],
};

export const TIP_POOL: string[] = [
  '오늘은 표정 하나로 분위기를 확 바꿀 수 있는 날입니다. 자연스러운 웃음이 매력 포인트가 될 거예요.',
  '오늘은 평소보다 눈빛에 힘이 실리는 날입니다. 중요한 자리에서 자신감 있게 임해보세요.',
  '오늘은 첫인상이 유독 좋게 작용하는 날입니다. 새로운 사람을 만난다면 먼저 말을 걸어보세요.',
  '오늘은 사진이 잘 나오는 각도를 찾기 좋은 날입니다. 평소와 다른 각도로 셀카를 찍어보세요.',
  '오늘은 자신만의 매력 포인트를 살리는 스타일링을 시도해보기 좋은 날입니다.',
  '오늘은 편안한 표정이 최고의 무기가 되는 날입니다. 힘 빼고 자연스럽게 있어보세요.',
  '오늘은 목소리 톤에도 신경 써보세요. 표정만큼이나 인상에 영향을 주는 요소예요.',
  '오늘은 좋아하는 사람에게 먼저 연락해보기 좋은 타이밍입니다.',
  '오늘은 새로운 스타일에 도전해보기 좋은 날입니다. 작은 변화가 큰 인상 차이를 만들 수 있어요.',
  '오늘은 자신감 있는 태도 하나로 매력 지수가 확 올라가는 날입니다.',
];

export interface AnimalFaceResult {
  animal: AnimalKey;
  label: string;
  emoji: string;
  from: string;
  to: string;
  text: string;
  matchPercent: number;
  runnerUp: { label: string; emoji: string; percent: number };
  tip: string;
}

function distance(a: [number, number, number], b: [number, number, number]) {
  return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
}

/**
 * 실측된 (눈매, 얼굴형, 눈 크기) 벡터를 6개 동물 기준 벡터와 비교해
 * 최근접 이웃을 찾는다. 두 번째로 가까운 동물도 함께 보여줘 결과에
 * 입체감을 더한다.
 */
export function getAnimalFace(eyeTiltRatio: number, faceShapeRatio: number, eyeWidthRatio: number): AnimalFaceResult {
  const v: [number, number, number] = [eyeTiltRatio, faceShapeRatio, eyeWidthRatio];
  const ranked = (Object.entries(ANIMAL_ARCHETYPE) as [AnimalKey, [number, number, number]][])
    .map(([key, arch]) => ({ key, d: distance(v, arch) }))
    .sort((a, b) => a.d - b.d);

  const best = ranked[0];
  const second = ranked[1];
  const meta = ANIMAL_META[best.key];
  const secondMeta = ANIMAL_META[second.key];

  const matchPercent = Math.round(Math.max(55, Math.min(99, 100 - best.d * 130)));
  const runnerUpPercent = Math.round(Math.max(20, Math.min(matchPercent - 5, 100 - second.d * 130)));

  const seed = mix32(Math.floor(eyeTiltRatio * 997 + faceShapeRatio * 7919 + eyeWidthRatio * 104729) >>> 0);
  const text = pick(ANIMAL_POOL[best.key], seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const tip = pick(TIP_POOL, tipSeed);

  return {
    animal: best.key,
    label: meta.label,
    emoji: meta.emoji,
    from: meta.from,
    to: meta.to,
    text,
    matchPercent,
    runnerUp: { label: secondMeta.label, emoji: secondMeta.emoji, percent: runnerUpPercent },
    tip,
  };
}
