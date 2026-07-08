/**
 * 사진 감성 분석 — 업로드한 사진의 실제 픽셀(밝기·채도·대비·색온도)을
 * 캔버스에서 측정해 감성 타입을 안내하는 참여형 콘텐츠다. 얼굴 인식이
 * 필요 없어 어떤 사진(인물·풍경·소품 등)이든 업로드할 수 있고, 사진은
 * 서버로 전송되지 않고 브라우저 안에서만 처리된다.
 */

import { hashString, mix32, pick } from './ratio-pick';

export type MoodKey = 'pastel' | 'vivid' | 'moody' | 'neon';

export const MOOD_META: Record<MoodKey, { label: string; emoji: string; from: string; to: string; vibe: string }> = {
  pastel: { label: '화이트톤 감성', emoji: '☁️', from: '#f8fafc', to: '#cbd5e1', vibe: '밝고 채도 낮은 미니멀 무드' },
  vivid:  { label: '청량 비비드 감성', emoji: '🌈', from: '#38bdf8', to: '#22c55e', vibe: '밝고 채도 높은 상쾌한 무드' },
  moody:  { label: '무드 그레이 감성', emoji: '🌫️', from: '#475569', to: '#1e293b', vibe: '어둡고 채도 낮은 시네마틱 무드' },
  neon:   { label: '다크 네온 감성', emoji: '🌃', from: '#7c3aed', to: '#db2777', vibe: '어둡고 채도 높은 드라마틱 무드' },
};

export const MOOD_POOL: Record<MoodKey, string[]> = {
  pastel: [
    '화사하고 부드러운 화이트톤 감성 사진입니다. 채도를 낮춘 밝은 톤이 편안하고 정돈된 분위기를 만들어주며, 인물·소품 할 것 없이 깔끔한 느낌을 살려줍니다.',
    '은은하고 포근한 파스텔 감성이 돋보이는 사진입니다. 과하지 않은 색감이 보는 사람에게 편안함을 주는 스타일로, 데일리 무드 사진에 잘 어울립니다.',
    '미니멀하고 정돈된 화이트톤 사진입니다. 여백이 많고 색이 절제된 구도일수록 이 감성이 더 살아나는 편입니다.',
    '포근하고 사랑스러운 감성이 담긴 사진입니다. 채도를 살짝만 낮춰도 훨씬 감성적인 무드가 완성되는 타입입니다.',
    '차분하고 우아한 화이트·파스텔 조합이 돋보이는 사진입니다. 잡티 없는 깔끔한 배경과 함께라면 이 감성이 배가됩니다.',
    '밝고 은은한 톤이 자연스러운 신뢰감을 주는 사진입니다. SNS 피드 전체를 통일감 있게 꾸미기에 특히 좋은 무드입니다.',
    '포근한 아이보리·베이지 계열 감성이 강한 사진입니다. 소품 사진이나 무드보드 컨셉에 잘 어울리는 톤입니다.',
    '부드럽고 몽환적인 파스텔 무드가 느껴지는 사진입니다. 역광이나 흐린 날 촬영에서 자주 나타나는 감성이기도 합니다.',
    '정갈하고 여백이 있는 화이트톤 사진입니다. 색보다 구도와 여백으로 분위기를 만드는 스타일에 가깝습니다.',
    '은은한 광량과 낮은 채도가 만드는 편안한 감성 사진입니다. 꾸안꾸(꾸민 듯 안 꾸민 듯) 무드를 연출하기 좋은 톤입니다.',
  ],
  vivid: [
    '청량하고 생동감 넘치는 비비드 감성 사진입니다. 선명한 색감이 시원하고 밝은 인상을 만들어주며, 여름·야외 사진에 특히 잘 어울립니다.',
    '화사하고 톡톡 튀는 색감이 돋보이는 사진입니다. 배경과 피사체의 색 대비가 뚜렷할수록 이 감성이 더 잘 살아납니다.',
    '생기 넘치고 활기찬 비비드 무드입니다. 쨍한 하늘, 선명한 원색 소품과 함께라면 감성이 배가되는 타입입니다.',
    '산뜻하고 경쾌한 팝 컬러 감성이 강한 사진입니다. 필터 없이도 컬러감이 살아있는 사진일 확률이 높습니다.',
    '밝고 선명한 색채가 인상적인 사진입니다. 채도가 높은 만큼 활동적이고 긍정적인 분위기를 전달하는 힘이 있습니다.',
    '청량감이 물씬 느껴지는 비비드 사진입니다. 파랑·초록 계열의 자연광 사진에서 자주 나타나는 감성입니다.',
    '컬러감이 살아있는 생기발랄한 사진입니다. SNS에서 시선을 확 끄는 섬네일 사진으로 특히 강점이 있는 톤입니다.',
    '톡톡 튀는 색 조합이 눈길을 사로잡는 사진입니다. 여러 장을 이어붙이면 화사한 무드보드가 완성되는 타입입니다.',
    '화창하고 밝은 기운이 가득한 비비드 감성입니다. 야외 활동, 여행 사진에서 유독 매력적으로 나타나는 톤입니다.',
    '선명한 색감과 밝은 노출이 만드는 상쾌한 사진입니다. 보정 없이도 눈에 띄는 팝한 매력을 가진 타입입니다.',
  ],
  moody: [
    '차분하고 깊이 있는 무드 감성 사진입니다. 어둡게 눌린 톤과 낮은 채도가 시네마틱한 분위기를 만들어줍니다.',
    '그레이·다크 톤이 만드는 고급스러운 무드입니다. 감정을 절제하면서도 진하게 전달하는 사진에 잘 어울리는 감성입니다.',
    '묵직하고 차분한 저채도 무드 사진입니다. 인물 사진에서는 진중하고 사색적인 인상을 만들어줍니다.',
    '필름 카메라 특유의 감성이 느껴지는 무드 톤입니다. 살짝 어둡게 눌린 노출이 깊이감을 더해줍니다.',
    '고요하고 사색적인 분위기가 강한 사진입니다. 실내·저녁 시간대 촬영에서 자주 나타나는 감성입니다.',
    '차분한 흑백에 가까운 무드가 돋보이는 사진입니다. 색보다 명암 대비로 이야기를 전달하는 스타일에 가깝습니다.',
    '깊이 있고 진중한 다크 그레이 톤 사진입니다. 감정선이 있는 스토리텔링형 사진에 특히 잘 어울립니다.',
    '은은하게 가라앉은 톤이 만드는 시네마틱 무드입니다. 빈티지 필름 느낌을 내고 싶을 때 참고하기 좋은 감성입니다.',
    '절제된 색감이 고급스러움을 더하는 무드 사진입니다. 과한 보정 없이도 분위기 있는 인상을 남깁니다.',
    '묵직한 그림자와 낮은 채도가 만드는 감성 사진입니다. 여운이 남는 한 장을 원할 때 잘 어울리는 톤입니다.',
  ],
  neon: [
    '강렬하고 드라마틱한 네온 감성 사진입니다. 어두운 배경 속 선명한 색이 도드라지며 시선을 확 사로잡는 힘이 있습니다.',
    '화려하고 자극적인 다크·비비드 조합이 돋보이는 사진입니다. 야경, 조명이 있는 공간에서 유독 매력적으로 나타납니다.',
    '도시적이고 시크한 네온 무드입니다. 어둠 속에서 빛나는 컬러 포인트가 세련되고 강렬한 인상을 만들어줍니다.',
    '밤 분위기와 잘 어울리는 강렬한 색감의 사진입니다. 클럽·야시장·네온사인 배경에서 이 감성이 극대화됩니다.',
    '대비가 강하고 인상적인 다크 비비드 사진입니다. 짧은 순간에도 시선을 확 붙잡는 힘이 있는 톤입니다.',
    '화려한 조명과 짙은 그림자가 공존하는 드라마틱한 사진입니다. 스토리성이 강한 스냅 사진에 잘 어울립니다.',
    '선명한 컬러 포인트가 어둠 속에서 빛나는 감성 사진입니다. 도시 야경 사진에서 자주 나타나는 무드입니다.',
    '강렬한 색 대비가 만드는 임팩트 있는 사진입니다. SNS 피드에서 확실히 눈에 띄는 힘이 있는 톤입니다.',
    '짙은 배경과 쨍한 색 포인트가 만드는 개성 있는 사진입니다. 개성 강한 컨셉 사진에 잘 어울리는 감성입니다.',
    '어둠과 화려함이 공존하는 강렬한 네온 무드입니다. 한번 보면 기억에 남는 인상적인 톤입니다.',
  ],
};

export const CAPTION_TIP_POOL: string[] = [
  '짧고 담백한 한 줄이 이 사진엔 더 잘 어울려요. 설명보다 여백을 남겨보세요.',
  '색감이 좋은 사진일수록 캡션은 짧게, 이모지 하나 정도만 더하는 게 좋아요.',
  '지금 이 순간의 감정을 한 단어로 표현해보는 것도 좋은 캡션이 됩니다.',
  '날짜나 장소보다 그 순간의 분위기를 담은 문장이 더 오래 기억에 남아요.',
  '해시태그는 3~4개만 골라도 충분해요. 너무 많으면 오히려 산만해 보일 수 있어요.',
  '친구를 태그하고 싶다면 사진 설명보다 댓글에 남기는 게 더 자연스러워요.',
  '오늘은 색감을 살려주는 밝은 배경 사진과 함께 올리면 반응이 더 좋을 수 있어요.',
  '긴 설명보다 질문형 캡션이 댓글 반응을 이끌어내기 좋아요.',
  '이 사진은 첫 장으로 올렸을 때 피드 전체의 톤을 잘 살려줄 수 있어요.',
  '오늘은 필터보다 자연광을 살린 원본이 더 감성 있게 느껴질 수 있어요.',
  '비슷한 톤의 사진 2~3장과 묶어서 올리면 통일감 있는 피드가 완성돼요.',
  '가끔은 캡션 없이 사진만 올리는 것도 하나의 감성이 될 수 있어요.',
];

export interface ColorSwatch { hex: string }

export interface PhotoMoodResult {
  mood: MoodKey;
  label: string;
  emoji: string;
  from: string;
  to: string;
  vibe: string;
  text: string;
  brightnessPercent: number;
  saturationPercent: number;
  warmthPercent: number;
  contrastPercent: number;
  captionTip: string;
}

/**
 * 실측된 밝기·채도(0~1)로 4가지 감성 사분면을 정하고, 웜/쿨·대비 지수는
 * 보조 지표로 함께 보여준다. 텍스트는 네 지표를 모두 반영한 시드로 고른다.
 */
export function getPhotoMood(
  brightnessRatio: number,
  saturationRatio: number,
  warmthRatio: number,
  contrastRatio: number
): PhotoMoodResult {
  const bright = brightnessRatio >= 0.5;
  const vivid = saturationRatio >= 0.5;
  const mood: MoodKey = bright ? (vivid ? 'vivid' : 'pastel') : (vivid ? 'neon' : 'moody');

  const meta = MOOD_META[mood];
  const seed = mix32(
    Math.floor(brightnessRatio * 997 + saturationRatio * 7919 + warmthRatio * 104729 + contrastRatio * 500009) >>> 0
  );
  const text = pick(MOOD_POOL[mood], seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const captionTip = pick(CAPTION_TIP_POOL, tipSeed);

  const clamp = (x: number) => Math.max(0, Math.min(1, x));
  return {
    mood,
    label: meta.label,
    emoji: meta.emoji,
    from: meta.from,
    to: meta.to,
    vibe: meta.vibe,
    text,
    brightnessPercent: Math.round(clamp(brightnessRatio) * 100),
    saturationPercent: Math.round(clamp(saturationRatio) * 100),
    warmthPercent: Math.round(clamp(warmthRatio) * 100),
    contrastPercent: Math.round(clamp(contrastRatio) * 100),
    captionTip,
  };
}
