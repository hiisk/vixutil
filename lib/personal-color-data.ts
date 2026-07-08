/**
 * 퍼스널컬러 진단 — 실제 얼굴 인식(landmark 검출)으로 볼 부위의 피부 톤을
 * 실측하되, 그 값에 붙는 웜/쿨 해석과 컬러 추천은 참고용 오락 콘텐츠다.
 * 사진 자체는 서버로 전송되지 않고 브라우저 안에서만 처리된다.
 *
 * 실제 퍼스널컬러 진단(드레이핑)은 조명·전문가 판단까지 포함하는 복합적인
 * 과정이라, 사진 한 장의 픽셀 평균값만으로는 완벽히 재현할 수 없다. 그래서
 * 여기서는 "웜/쿨 지수"와 "선명도 지수" 두 축을 실측하고, 그 결과를 4계절
 * 유형으로 안내하되 참고용임을 분명히 밝힌다.
 */

import { hashString, mix32, pick } from './ratio-pick';

export type SeasonKey = 'springWarm' | 'autumnWarm' | 'summerCool' | 'winterCool';

export const SEASON_META: Record<SeasonKey, { label: string; emoji: string; from: string; to: string; vibe: string }> = {
  springWarm: { label: '봄 웜톤',   emoji: '🌸', from: '#fb923c', to: '#f59e0b', vibe: '화사하고 생기 있는 웜톤' },
  autumnWarm: { label: '가을 웜톤', emoji: '🍂', from: '#b45309', to: '#78350f', vibe: '차분하고 깊이 있는 웜톤' },
  summerCool: { label: '여름 쿨톤', emoji: '🌊', from: '#38bdf8', to: '#6366f1', vibe: '부드럽고 뽀얀 쿨톤' },
  winterCool: { label: '겨울 쿨톤', emoji: '❄️', from: '#4f46e5', to: '#1e293b', vibe: '선명하고 강렬한 쿨톤' },
};

export interface ColorSwatch { name: string; hex: string }

export const SEASON_PALETTE: Record<SeasonKey, ColorSwatch[]> = {
  springWarm: [
    { name: '코랄',        hex: '#FF7F50' },
    { name: '피치핑크',    hex: '#FFB6A3' },
    { name: '아이보리',    hex: '#FFF3E0' },
    { name: '라이트카멜',  hex: '#D9A066' },
    { name: '선노랑',      hex: '#FFD873' },
    { name: '라임그린',    hex: '#C6E377' },
  ],
  autumnWarm: [
    { name: '머스타드',    hex: '#C9A227' },
    { name: '테라코타',    hex: '#C0603A' },
    { name: '카키',        hex: '#7A6A3F' },
    { name: '브라운',      hex: '#6B4423' },
    { name: '올리브',      hex: '#6E7A3D' },
    { name: '러스트오렌지',hex: '#B5502E' },
  ],
  summerCool: [
    { name: '라벤더',      hex: '#C9B6E4' },
    { name: '로즈핑크',    hex: '#E8A0BF' },
    { name: '파우더블루',  hex: '#A9C6E8' },
    { name: '소프트그레이',hex: '#C7CBD1' },
    { name: '더스티로즈',  hex: '#D9A6A0' },
    { name: '라일락',      hex: '#C9A8D4' },
  ],
  winterCool: [
    { name: '트루레드',    hex: '#C8102E' },
    { name: '퓨어화이트',  hex: '#FDFDFD' },
    { name: '사파이어블루',hex: '#1F4E8C' },
    { name: '버건디',      hex: '#6E0F26' },
    { name: '딥퍼플',      hex: '#4B2E83' },
    { name: '아이시핑크',  hex: '#F4B8C8' },
  ],
};

/** 대비되는 계절의 팔레트를 그대로 "피하면 좋은 컬러"로 안내한다. */
const OPPOSITE: Record<SeasonKey, SeasonKey> = {
  springWarm: 'winterCool',
  winterCool: 'springWarm',
  autumnWarm: 'summerCool',
  summerCool: 'autumnWarm',
};

export function getAvoidPalette(season: SeasonKey): ColorSwatch[] {
  return SEASON_PALETTE[OPPOSITE[season]].slice(0, 3);
}

export const SEASON_POOL: Record<SeasonKey, string[]> = {
  springWarm: [
    '화사하고 생기 넘치는 봄 웜톤입니다. 살구·코랄 계열처럼 밝고 따뜻한 색이 피부에 화사한 생기를 더해주는 타입으로, 아이보리·라이트 카멜 같은 밝은 뉴트럴도 잘 어울립니다.',
    '맑고 투명한 광채가 도는 봄 웜톤입니다. 크림색이 섞인 화이트, 연한 옐로우 계열이 얼굴을 화사하게 밝혀주며, 전체적으로 산뜻하고 생기 있는 인상을 만들어줍니다.',
    '따뜻하면서도 밝은 톤이 매력적인 봄 웜톤입니다. 피치·멜론 컬러의 블러셔나 립을 올리면 혈색이 확 살아나는 타입으로, 화사한 인상을 원할 때 제격입니다.',
    '생기발랄한 이미지가 강한 봄 웜톤입니다. 밝은 옐로우베이스 컬러들이 얼굴 전체를 환하게 밝혀주며, 어둡고 탁한 컬러는 상대적으로 얼굴을 칙칙해 보이게 할 수 있습니다.',
    '화사한 산호빛이 잘 받는 봄 웜톤입니다. 따뜻한 오렌지 계열 립스틱이나 코랄 블러셔가 자연스러운 혈색을 더해줘 생동감 있는 이미지를 완성해줍니다.',
    '봄 웜톤 중에서도 밝고 선명한 조합이 잘 어울리는 타입입니다. 비비드한 옐로우·오렌지 포인트를 더하면 화사함이 극대화되는 편입니다.',
    '부드럽고 사랑스러운 인상을 주는 봄 웜톤입니다. 라이트 브라운 헤어컬러와 웜베이지 계열 메이크업이 자연스러운 생기를 더해줍니다.',
    '따뜻한 골드빛 광채가 도는 봄 웜톤입니다. 골드 액세서리가 실버보다 훨씬 잘 어울리며, 웜톤 특유의 화사함을 살려주는 컬러 조합이 강점입니다.',
    '환한 이미지가 매력인 봄 웜톤입니다. 크림 아이보리, 라이트 카키처럼 밝고 따뜻한 뉴트럴 컬러가 자연스럽게 얼굴빛을 살려줍니다.',
    '누구보다 화사하고 사랑스러운 봄 웜톤입니다. 밝은 코랄핑크부터 옐로우 계열까지 다양한 웜 브라이트 컬러를 소화할 수 있는 폭넓은 타입입니다.',
  ],
  autumnWarm: [
    '차분하고 깊이 있는 가을 웜톤입니다. 카멜·머스타드처럼 톤 다운된 따뜻한 컬러가 피부를 편안하게 감싸주며, 세련되고 안정적인 분위기를 완성해줍니다.',
    '은은한 황금빛이 도는 가을 웜톤입니다. 브라운 계열 메이크업과 테라코타 블러셔가 자연스러운 혈색을 살려주는 타입으로, 우아하고 성숙한 이미지를 만들어줍니다.',
    '고급스럽고 중후한 매력의 가을 웜톤입니다. 올리브·카키처럼 톤 다운된 그린 계열도 잘 소화하며, 지나치게 밝고 쨍한 컬러보다는 무게감 있는 톤이 안정적으로 어울립니다.',
    '따뜻하면서도 차분한 무드가 강점인 가을 웜톤입니다. 웜 브라운 아이섀도우와 브릭 레드 립이 세련된 분위기를 완성해줍니다.',
    '빈티지한 감성이 잘 어울리는 가을 웜톤입니다. 머스타드옐로우, 러스트 오렌지 같은 컬러가 특유의 깊이감을 살려주는 타입입니다.',
    '묵직하고 안정된 인상을 주는 가을 웜톤입니다. 다크 브라운, 카키 그린처럼 채도가 낮은 웜톤 컬러들이 편안하고 신뢰감 있는 이미지를 더해줍니다.',
    '가을 웜톤 특유의 짙은 골드빛이 도는 타입입니다. 골드·브론즈 주얼리가 은은한 화려함을 더해주며, 차가운 실버 톤보다 확실히 잘 받는 편입니다.',
    '차분한 우아함이 느껴지는 가을 웜톤입니다. 톤 다운된 코랄, 브릭 레드 계열 립컬러가 자연스럽게 세련된 분위기를 만들어줍니다.',
    '성숙하고 지적인 인상을 주는 가을 웜톤입니다. 카키·카멜·브라운이 만드는 뉴트럴 톤 조합이 안정적이고 신뢰감 있는 이미지를 완성해줍니다.',
    '깊이 있는 웜 컬러가 매력인 가을 웜톤입니다. 딥 오렌지, 브라운 계열의 아우터나 액세서리가 은은하면서도 존재감 있는 분위기를 더해줍니다.',
  ],
  summerCool: [
    '부드럽고 뽀얀 인상의 여름 쿨톤입니다. 라벤더·파우더 핑크처럼 채도가 낮은 파스텔 쿨톤이 피부를 화사하면서도 은은하게 밝혀줍니다.',
    '우아하고 여리여리한 매력의 여름 쿨톤입니다. 로즈 핑크, 소프트 그레이 계열 메이크업이 자연스러운 혈색을 더해주는 타입입니다.',
    '차분하고 청순한 이미지가 강점인 여름 쿨톤입니다. 진하고 채도 높은 컬러보다 뮤트한 파스텔톤이 훨씬 조화롭게 어울립니다.',
    '은은한 우윳빛 광채가 도는 여름 쿨톤입니다. 쿨 베이지, 그레이시 핑크가 부드러운 분위기를 살려주며, 지나치게 어둡거나 탁한 컬러는 피부를 칙칙하게 만들 수 있습니다.',
    '부드러운 무드가 매력인 여름 쿨톤입니다. 라일락, 스카이블루 계열 아이섀도우가 청량하면서도 로맨틱한 인상을 완성해줍니다.',
    '여름 쿨톤 특유의 뽀얀 피부 톤을 살려주는 컬러 조합이 강점입니다. 로즈베리, 소프트 모브 립 컬러가 은은한 화사함을 더해줍니다.',
    '청순하고 단정한 인상을 주는 여름 쿨톤입니다. 실버 액세서리가 골드보다 훨씬 자연스럽게 어울리는 편입니다.',
    '부드러운 파스텔톤이 유독 잘 받는 여름 쿨톤입니다. 라벤더 그레이 헤어컬러나 애쉬 계열 염색이 세련된 분위기를 더해줍니다.',
    '은은하고 차분한 우아함이 돋보이는 여름 쿨톤입니다. 더스티 핑크, 그레이시 블루 조합이 자연스러운 매력을 살려줍니다.',
    '여리여리하면서도 세련된 이미지의 여름 쿨톤입니다. 채도를 낮춘 코랄 대신 로즈 계열을 고르면 훨씬 자연스러운 혈색을 연출할 수 있습니다.',
  ],
  winterCool: [
    '선명하고 강렬한 존재감의 겨울 쿨톤입니다. 트루레드, 퓨어 화이트처럼 채도 높은 쿨톤이 피부를 또렷하고 세련되게 밝혀줍니다.',
    '차갑고 선명한 대비가 매력인 겨울 쿨톤입니다. 블랙과 화이트의 완벽한 조합이 가장 잘 어울리는 타입으로, 뿌옇거나 탁한 컬러는 오히려 인상을 흐리게 만들 수 있습니다.',
    '도시적이고 시크한 이미지가 강점인 겨울 쿨톤입니다. 딥 버건디, 사파이어 블루 같은 쥬얼톤이 카리스마 있는 분위기를 완성해줍니다.',
    '겨울 쿨톤 특유의 또렷한 이목구비 대비를 살려주는 컬러 조합입니다. 실버 주얼리와 쿨 그레이 계열 의상이 세련된 분위기를 더해줍니다.',
    '강렬하고 세련된 매력의 겨울 쿨톤입니다. 마젠타, 로열퍼플처럼 채도 높은 컬러를 과감하게 소화할 수 있는 타입입니다.',
    '선명한 이목구비가 돋보이는 겨울 쿨톤입니다. 트루 블랙 헤어컬러와 화이트 베이스 메이크업이 시크하고 도시적인 분위기를 완성해줍니다.',
    '차가운 화이트 광채가 도는 겨울 쿨톤입니다. 아이시 핑크, 콜드 블루 컬러가 또렷한 존재감을 더욱 살려줍니다.',
    '카리스마 있는 인상을 주는 겨울 쿨톤입니다. 블랙&화이트를 기본으로 포인트 컬러를 강하게 넣는 스타일링이 특히 잘 어울립니다.',
    '쿨톤 중에서도 가장 선명한 대비를 보여주는 겨울 쿨톤입니다. 딥 네이비, 와인 컬러의 아우터가 세련되고 도회적인 무드를 완성해줍니다.',
    '또렷하고 강렬한 매력의 겨울 쿨톤입니다. 프로즌 로즈, 아이시 라벤더처럼 차갑고 선명한 컬러가 특유의 존재감을 배가시켜줍니다.',
  ],
};

export const STYLE_TIP_POOL: string[] = [
  '오늘은 립 컬러 하나만 바꿔도 인상이 확 달라지는 날입니다. 본인 팔레트의 대표 컬러로 포인트를 줘보세요.',
  '오늘은 액세서리의 금속 톤을 챙겨보세요. 웜톤은 골드, 쿨톤은 실버를 고르면 훨씬 자연스러운 광채가 납니다.',
  '오늘 중요한 자리가 있다면 팔레트의 진한 컬러 하나를 상의나 아우터에 넣어보세요. 첫인상이 또렷해집니다.',
  '오늘은 피하면 좋은 컬러 계열의 옷은 잠시 옷장 안쪽으로 미뤄두는 걸 추천합니다.',
  '사진을 찍을 일이 있다면 오늘 팔레트의 밝은 컬러를 얼굴 가까이에 배치해보세요. 화사하게 나올 확률이 높습니다.',
  '오늘은 헤어 액세서리나 스카프처럼 작은 아이템에 포인트 컬러를 넣어보는 것도 좋은 시도입니다.',
  '평소 안 입던 컬러라도 오늘 팔레트에 있다면 과감하게 시도해볼 만한 날입니다.',
  '오늘은 블러셔 톤을 한 번 점검해보세요. 안색이 화사해 보이는 데 생각보다 큰 역할을 합니다.',
  '중요한 미팅이 있다면 팔레트의 뉴트럴 컬러로 안정감 있는 인상을 만들어보세요.',
  '오늘은 네일 컬러 하나로도 분위기를 바꿔볼 수 있는 날입니다. 대표 컬러 중 하나를 골라보세요.',
  '사진발이 중요한 날이라면 배경색과 팔레트 컬러의 대비를 신경 써보세요. 훨씬 또렷하게 나옵니다.',
  '오늘은 안경테나 선글라스 컬러도 한번 점검해보세요. 의외로 인상에 큰 영향을 줍니다.',
];

export interface PersonalColorResult {
  season: SeasonKey;
  label: string;
  emoji: string;
  from: string;
  to: string;
  vibe: string;
  text: string;
  palette: ColorSwatch[];
  avoidPalette: ColorSwatch[];
  warmthPercent: number;
  clarityPercent: number;
  styleTip: string;
}

/**
 * 실측된 웜/쿨 지수(warmthRatio)와 선명도 지수(clarityRatio, 둘 다 0~1)를
 * 4계절 퍼스널컬러 이론의 기본 축(웜/쿨 × 클리어/뮤트)에 대응시킨다.
 * 완벽한 드레이핑 진단을 대체하지는 못하지만, 사진에서 실제로 뽑아낸
 * 값에 근거한 결과다.
 */
export function getPersonalColor(warmthRatio: number, clarityRatio: number): PersonalColorResult {
  const warm = warmthRatio >= 0.5;
  const clear = clarityRatio >= 0.5;
  const season: SeasonKey = warm
    ? (clear ? 'springWarm' : 'autumnWarm')
    : (clear ? 'winterCool' : 'summerCool');

  const meta = SEASON_META[season];
  const seed = mix32(Math.floor(warmthRatio * 99991 + clarityRatio * 15485863) >>> 0);
  const text = pick(SEASON_POOL[season], seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const styleTip = pick(STYLE_TIP_POOL, tipSeed);

  return {
    season,
    label: meta.label,
    emoji: meta.emoji,
    from: meta.from,
    to: meta.to,
    vibe: meta.vibe,
    text,
    palette: SEASON_PALETTE[season],
    avoidPalette: getAvoidPalette(season),
    warmthPercent: Math.round(Math.max(0, Math.min(1, warmthRatio)) * 100),
    clarityPercent: Math.round(Math.max(0, Math.min(1, clarityRatio)) * 100),
    styleTip,
  };
}
