/**
 * 퍼스널컬러 진단 — 실제 얼굴 인식(landmark 검출)으로 볼 부위의 피부 톤을
 * 실측하되, 그 값에 붙는 웜/쿨 해석과 컬러 추천은 참고용 오락 콘텐츠다.
 * 사진 자체는 서버로 전송되지 않고 브라우저 안에서만 처리된다.
 *
 * 실제 퍼스널컬러 진단(드레이핑)은 조명·전문가 판단까지 포함하는 복합적인
 * 과정이라, 사진 한 장의 픽셀 평균값만으로는 완벽히 재현할 수 없다. 그래서
 * 여기서는 웜/쿨(hue) · 선명도(chroma) · 명도(lightness) 세 축을 실측해
 * 12계절 유형으로 세분화하고, 추천 팔레트도 고정 목록이 아니라 그 사람의
 * 실제 측정값으로 색상마다 채도·명도를 재계산해 보여준다.
 */

import { hashString, mix32, pick } from './ratio-pick';
import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from './color-convert';

export type MainSeason = 'spring' | 'summer' | 'autumn' | 'winter';

export type SubtypeKey =
  | 'warmSpring' | 'trueSpring' | 'lightSpring'
  | 'softSummer' | 'trueSummer' | 'lightSummer'
  | 'deepAutumn' | 'trueAutumn' | 'softAutumn'
  | 'deepWinter' | 'trueWinter' | 'brightWinter';

export const SUBTYPE_META: Record<SubtypeKey, { label: string; emoji: string; from: string; to: string; vibe: string; mainSeason: MainSeason }> = {
  warmSpring:   { label: '웜 스프링',   emoji: '🌷', from: '#fb923c', to: '#ea580c', vibe: '선명하고 화사한 웜톤', mainSeason: 'spring' },
  trueSpring:   { label: '트루 스프링', emoji: '🌸', from: '#fb923c', to: '#f59e0b', vibe: '화사하고 생기 있는 웜톤', mainSeason: 'spring' },
  lightSpring:  { label: '라이트 스프링', emoji: '🌼', from: '#fdba74', to: '#fbbf24', vibe: '밝고 맑은 웜톤', mainSeason: 'spring' },
  softSummer:   { label: '소프트 서머', emoji: '🌫️', from: '#94a3b8', to: '#64748b', vibe: '차분하고 은은한 쿨톤', mainSeason: 'summer' },
  trueSummer:   { label: '트루 서머',   emoji: '🌊', from: '#38bdf8', to: '#818cf8', vibe: '부드럽고 우아한 쿨톤', mainSeason: 'summer' },
  lightSummer:  { label: '라이트 서머', emoji: '💧', from: '#7dd3fc', to: '#c4b5fd', vibe: '밝고 여린 쿨톤', mainSeason: 'summer' },
  deepAutumn:   { label: '딥 어텀',     emoji: '🍁', from: '#78350f', to: '#451a03', vibe: '묵직하고 깊이 있는 웜톤', mainSeason: 'autumn' },
  trueAutumn:   { label: '트루 어텀',   emoji: '🍂', from: '#b45309', to: '#78350f', vibe: '차분하고 세련된 웜톤', mainSeason: 'autumn' },
  softAutumn:   { label: '소프트 어텀', emoji: '🌰', from: '#c9a877', to: '#92764f', vibe: '부드럽고 은은한 웜톤', mainSeason: 'autumn' },
  deepWinter:   { label: '딥 윈터',     emoji: '🖤', from: '#312e81', to: '#0f172a', vibe: '강렬하고 깊은 쿨톤', mainSeason: 'winter' },
  trueWinter:   { label: '트루 윈터',   emoji: '❄️', from: '#4f46e5', to: '#1e293b', vibe: '선명하고 또렷한 쿨톤', mainSeason: 'winter' },
  brightWinter: { label: '브라이트 윈터', emoji: '💎', from: '#818cf8', to: '#4f46e5', vibe: '밝고 선명한 쿨톤', mainSeason: 'winter' },
};

export interface ColorSwatch { name: string; hex: string }

/** 각 메인 계절의 색상 이론 기반 앵커 팔레트. 색상(hue)의 출처로만 쓰이고,
 *  실제 채도·명도는 사용자의 실측값으로 다시 계산된다. */
const ANCHOR_PALETTE: Record<MainSeason, ColorSwatch[]> = {
  spring: [
    { name: '코랄',       hex: '#FF7F50' },
    { name: '피치핑크',   hex: '#FFB6A3' },
    { name: '아이보리',   hex: '#FFF3E0' },
    { name: '라이트카멜', hex: '#D9A066' },
    { name: '선노랑',     hex: '#FFD873' },
    { name: '라임그린',   hex: '#C6E377' },
  ],
  autumn: [
    { name: '머스타드',     hex: '#C9A227' },
    { name: '테라코타',     hex: '#C0603A' },
    { name: '카키',         hex: '#7A6A3F' },
    { name: '브라운',       hex: '#6B4423' },
    { name: '올리브',       hex: '#6E7A3D' },
    { name: '러스트오렌지', hex: '#B5502E' },
  ],
  summer: [
    { name: '라벤더',       hex: '#C9B6E4' },
    { name: '로즈핑크',     hex: '#E8A0BF' },
    { name: '파우더블루',   hex: '#A9C6E8' },
    { name: '소프트그레이', hex: '#C7CBD1' },
    { name: '더스티로즈',   hex: '#D9A6A0' },
    { name: '라일락',       hex: '#C9A8D4' },
  ],
  winter: [
    { name: '트루레드',     hex: '#C8102E' },
    { name: '퓨어화이트',   hex: '#FDFDFD' },
    { name: '사파이어블루', hex: '#1F4E8C' },
    { name: '버건디',       hex: '#6E0F26' },
    { name: '딥퍼플',       hex: '#4B2E83' },
    { name: '아이시핑크',   hex: '#F4B8C8' },
  ],
};

const OPPOSITE_SEASON: Record<MainSeason, MainSeason> = {
  spring: 'winter',
  winter: 'spring',
  autumn: 'summer',
  summer: 'autumn',
};

function clamp(x: number, lo: number, hi: number) {
  return Math.max(lo, Math.min(hi, x));
}

/**
 * 앵커 컬러의 색상(hue)은 그대로 두고, 채도·명도만 이 사람의 실측
 * 선명도(clarityRatio)·명도(valueRatio)에 맞춰 다시 계산한다. 앵커 자체의
 * 상대적 채도·명도 특징(예: 아이보리는 원래도 밝다)도 40% 반영해 팔레트
 * 안에서의 색상 간 개성을 유지한다.
 */
function personalizeSwatch(anchor: ColorSwatch, clarityRatio: number, valueRatio: number): ColorSwatch {
  const rgb = hexToRgb(anchor.hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const targetS = 30 + clamp(clarityRatio, 0, 1) * 55;
  const targetL = 35 + clamp(valueRatio, 0, 1) * 45;
  const s = clamp(hsl.s * 0.4 + targetS * 0.6, 20, 95);
  const l = clamp(hsl.l * 0.4 + targetL * 0.6, 20, 88);
  const out = hslToRgb(hsl.h, s, l);
  return { name: anchor.name, hex: rgbToHex(out.r, out.g, out.b) };
}

export function getPersonalizedPalette(mainSeason: MainSeason, clarityRatio: number, valueRatio: number): ColorSwatch[] {
  return ANCHOR_PALETTE[mainSeason].map(a => personalizeSwatch(a, clarityRatio, valueRatio));
}

export function getAvoidPalette(mainSeason: MainSeason, clarityRatio: number, valueRatio: number): ColorSwatch[] {
  const opposite = OPPOSITE_SEASON[mainSeason];
  // 피해야 할 팔레트는 반대 계절의 색상을, 반대쪽 채도·명도 성향으로 보여준다.
  return ANCHOR_PALETTE[opposite].slice(0, 3).map(a => personalizeSwatch(a, 1 - clarityRatio, 1 - valueRatio));
}

export const SUBTYPE_POOL: Record<SubtypeKey, string[]> = {
  warmSpring: [
    '선명하고 화사한 웜 스프링입니다. 밝은 오렌지·코랄처럼 채도 높은 웜톤이 피부에 생기를 더해주는 타입으로, 진한 컬러도 화사하게 소화하는 편입니다.',
    '생동감 넘치는 웜 스프링 타입입니다. 쨍한 옐로우베이스 컬러가 인상을 환하게 밝혀주며, 자칫 칙칙해 보일 수 있는 다크 컬러는 피하는 게 좋습니다.',
    '또렷하고 화사한 웜 스프링입니다. 선명한 피치·멜론 컬러의 메이크업이 혈색을 확실히 살려주는 타입입니다.',
    '따뜻하고 선명한 컬러가 잘 받는 웜 스프링입니다. 골드 주얼리와 밝은 웜톤 컬러 조합이 화사함을 극대화해줍니다.',
    '생기 넘치는 웜 스프링 타입입니다. 원색에 가까운 밝은 웜 컬러를 과감하게 소화할 수 있는 타입입니다.',
    '화사하면서도 선명한 웜 스프링입니다. 쨍한 오렌지·코랄 포인트가 이 타입의 매력을 가장 잘 살려줍니다.',
  ],
  trueSpring: [
    '균형 잡힌 표준 봄 웜톤입니다. 코랄·피치 계열의 화사한 컬러가 자연스럽게 잘 어울리는, 봄의 전형적인 타입입니다.',
    '화사하고 사랑스러운 트루 스프링입니다. 아이보리·라이트 카멜 같은 밝은 뉴트럴이 전체적인 톤을 살려줍니다.',
    '생기 있고 화사한 인상의 트루 스프링입니다. 웜 브라이트 계열 컬러를 두루 소화할 수 있는 균형형입니다.',
    '산뜻한 웜톤이 돋보이는 트루 스프링입니다. 옐로우베이스 파스텔부터 선명한 컬러까지 폭넓게 어울립니다.',
    '화사한 봄의 정석, 트루 스프링입니다. 골드 액세서리와 밝은 웜 컬러 조합이 안정적으로 잘 어울립니다.',
    '생동감과 화사함을 겸비한 트루 스프링입니다. 코랄·피치·옐로우 계열이 두루 잘 받는 균형 잡힌 타입입니다.',
  ],
  lightSpring: [
    '밝고 화사한 라이트 스프링입니다. 크림 아이보리, 연한 피치처럼 맑고 가벼운 웜톤이 피부를 화사하게 밝혀줍니다.',
    '투명하고 맑은 광채가 도는 라이트 스프링입니다. 파스텔에 가까운 옅은 웜 컬러가 가장 화사하게 어울립니다.',
    '밝은 웜톤의 정수, 라이트 스프링입니다. 진하고 어두운 컬러보다 밝고 여린 웜 컬러가 훨씬 잘 어울립니다.',
    '여리여리하고 화사한 라이트 스프링입니다. 연한 살구빛, 라이트 옐로우 계열이 자연스러운 생기를 더해줍니다.',
    '밝고 사랑스러운 라이트 스프링 타입입니다. 무거운 다크 컬러보다 가볍고 맑은 웜 톤이 이 타입의 매력을 살려줍니다.',
    '화사하고 맑은 인상의 라이트 스프링입니다. 옅은 코랄, 라이트 베이지 컬러가 화사함을 더해줍니다.',
  ],
  softSummer: [
    '차분하고 은은한 소프트 서머입니다. 그레이시한 뮤트 쿨톤이 편안하고 우아한 분위기를 만들어줍니다.',
    '부드럽고 차분한 소프트 서머 타입입니다. 더스티 로즈, 그레이시 라벤더 같은 저채도 쿨톤이 잘 어울립니다.',
    '은은한 무드가 매력인 소프트 서머입니다. 과하지 않은 채도의 쿨톤이 자연스러운 우아함을 더해줍니다.',
    '차분한 쿨톤이 돋보이는 소프트 서머입니다. 로즈 그레이, 소프트 모브 계열이 편안한 인상을 완성해줍니다.',
    '부드러운 뮤트 쿨톤의 소프트 서머입니다. 진하고 쨍한 컬러보다 은은하게 가라앉은 톤이 훨씬 잘 어울립니다.',
    '우아하고 차분한 소프트 서머 타입입니다. 그레이시 핑크, 더스티 블루 조합이 매력을 배가시켜줍니다.',
  ],
  trueSummer: [
    '부드럽고 우아한 트루 서머입니다. 라벤더·로즈 핑크 같은 파스텔 쿨톤이 자연스러운 혈색을 더해줍니다.',
    '청순하고 여리여리한 트루 서머 타입입니다. 소프트한 쿨톤 파스텔이 두루 잘 어울리는 균형형입니다.',
    '은은하게 화사한 트루 서머입니다. 로즈 핑크, 파우더 블루 계열이 편안하면서도 우아한 분위기를 만들어줍니다.',
    '부드러운 쿨톤의 정석, 트루 서머입니다. 라일락, 더스티 로즈 컬러가 자연스럽게 잘 받는 타입입니다.',
    '청량하고 부드러운 트루 서머 타입입니다. 채도를 낮춘 쿨톤 컬러 전반이 조화롭게 어울립니다.',
    '우아한 파스텔 쿨톤의 트루 서머입니다. 실버 주얼리와 소프트한 쿨 컬러 조합이 잘 어울립니다.',
  ],
  lightSummer: [
    '밝고 여린 라이트 서머입니다. 파우더 핑크, 라이트 라벤더처럼 맑고 가벼운 쿨톤이 화사함을 더해줍니다.',
    '투명하고 뽀얀 라이트 서머 타입입니다. 연한 파스텔 쿨톤이 가장 화사하게 어울리는 타입입니다.',
    '맑고 여리여리한 라이트 서머입니다. 진한 컬러보다 밝고 옅은 쿨톤이 훨씬 자연스럽게 어울립니다.',
    '화사하고 뽀얀 광채가 도는 라이트 서머입니다. 스카이블루, 라이트 로즈 계열이 잘 받는 편입니다.',
    '여리여리한 매력의 라이트 서머 타입입니다. 옅은 라벤더, 파우더 블루가 청순한 분위기를 완성해줍니다.',
    '밝고 청순한 라이트 서머입니다. 연한 쿨톤 파스텔이 이 타입의 매력을 가장 잘 살려줍니다.',
  ],
  deepAutumn: [
    '묵직하고 깊이 있는 딥 어텀입니다. 다크 브라운, 딥 테라코타처럼 진한 웜톤이 고급스러운 분위기를 만들어줍니다.',
    '중후하고 깊은 딥 어텀 타입입니다. 카키, 버건디 브라운 계열이 안정감 있는 인상을 완성해줍니다.',
    '깊이감 있는 웜톤의 딥 어텀입니다. 밝고 가벼운 컬러보다 짙고 깊은 웜 컬러가 훨씬 잘 어울립니다.',
    '고급스러운 무드의 딥 어텀 타입입니다. 다크 머스타드, 딥 브라운 조합이 세련된 분위기를 완성해줍니다.',
    '깊고 중후한 딥 어텀입니다. 골드·브론즈 주얼리와 짙은 웜 컬러가 잘 어우러지는 타입입니다.',
    '묵직한 매력의 딥 어텀 타입입니다. 딥 올리브, 초콜릿 브라운 계열이 안정적으로 잘 어울립니다.',
  ],
  trueAutumn: [
    '차분하고 세련된 트루 어텀입니다. 카멜·머스타드 같은 톤 다운된 웜톤이 자연스럽게 잘 어울립니다.',
    '고급스러운 웜톤의 트루 어텀 타입입니다. 브라운, 테라코타 계열이 균형 잡힌 매력을 완성해줍니다.',
    '은은한 골드빛의 트루 어텀입니다. 올리브, 카키 계열도 자연스럽게 소화하는 균형형입니다.',
    '세련되고 안정적인 트루 어텀 타입입니다. 러스트 오렌지, 브릭 레드 컬러가 잘 어울립니다.',
    '차분한 웜톤의 정석, 트루 어텀입니다. 골드 주얼리와 뉴트럴 브라운 조합이 조화롭습니다.',
    '우아하고 성숙한 트루 어텀 타입입니다. 머스타드·카키·브라운이 두루 잘 받는 균형 잡힌 타입입니다.',
  ],
  softAutumn: [
    '부드럽고 은은한 소프트 어텀입니다. 뮤트한 베이지, 소프트 카키처럼 채도 낮은 웜톤이 편안한 매력을 더해줍니다.',
    '온화한 소프트 어텀 타입입니다. 톤 다운된 살구빛, 뉴트럴 브라운이 자연스럽게 잘 어울립니다.',
    '은은한 웜 무드의 소프트 어텀입니다. 진하고 쨍한 컬러보다 부드럽게 가라앉은 웜톤이 훨씬 잘 받습니다.',
    '편안하고 우아한 소프트 어텀 타입입니다. 소프트 카멜, 뮤트 코랄 컬러가 자연스러운 매력을 더해줍니다.',
    '부드러운 웜톤의 소프트 어텀입니다. 은은한 베이지·브라운 계열이 편안한 인상을 완성해줍니다.',
    '온화하고 자연스러운 소프트 어텀 타입입니다. 뮤트한 웜 뉴트럴이 이 타입의 매력을 가장 잘 살려줍니다.',
  ],
  deepWinter: [
    '강렬하고 깊은 딥 윈터입니다. 블랙, 딥 버건디처럼 짙고 선명한 쿨톤이 카리스마 있는 분위기를 만들어줍니다.',
    '묵직하고 시크한 딥 윈터 타입입니다. 다크 네이비, 딥 퍼플 계열이 세련된 인상을 완성해줍니다.',
    '깊이감 있는 쿨톤의 딥 윈터입니다. 밝고 가벼운 컬러보다 짙고 선명한 쿨 컬러가 훨씬 잘 어울립니다.',
    '강렬한 존재감의 딥 윈터 타입입니다. 실버 주얼리와 블랙 베이스 스타일링이 잘 어우러집니다.',
    '카리스마 있는 딥 윈터입니다. 딥 사파이어, 와인 컬러 조합이 도시적인 분위기를 완성해줍니다.',
    '묵직하고 강렬한 딥 윈터 타입입니다. 트루 블랙, 딥 버건디 계열이 안정적으로 잘 어울립니다.',
  ],
  trueWinter: [
    '선명하고 또렷한 트루 윈터입니다. 트루 레드, 사파이어 블루 같은 채도 높은 쿨톤이 카리스마를 더해줍니다.',
    '차갑고 세련된 트루 윈터 타입입니다. 블랙&화이트 조합이 가장 잘 어울리는 균형형입니다.',
    '또렷한 쿨톤의 트루 윈터입니다. 마젠타, 로열퍼플 계열을 과감하게 소화할 수 있는 타입입니다.',
    '시크하고 도시적인 트루 윈터 타입입니다. 쿨 그레이, 딥 블루 컬러가 세련된 분위기를 완성해줍니다.',
    '선명한 쿨톤의 정석, 트루 윈터입니다. 실버 주얼리와 선명한 쿨 컬러 조합이 조화롭습니다.',
    '강렬하면서도 균형 잡힌 트루 윈터 타입입니다. 트루 레드·사파이어·퍼플이 두루 잘 받는 타입입니다.',
  ],
  brightWinter: [
    '밝고 선명한 브라이트 윈터입니다. 아이시 핑크, 트루 화이트처럼 맑고 채도 높은 쿨톤이 화사함을 더해줍니다.',
    '또렷하고 화사한 브라이트 윈터 타입입니다. 밝은 쿨톤 중에서도 채도가 높은 컬러가 가장 잘 어울립니다.',
    '맑고 강렬한 브라이트 윈터입니다. 아이시 블루, 프로즌 로즈 계열이 화사하면서도 또렷한 인상을 만들어줍니다.',
    '화사하고 선명한 브라이트 윈터 타입입니다. 퓨어 화이트와 비비드 쿨 컬러 조합이 잘 어울립니다.',
    '밝은 쿨톤의 매력, 브라이트 윈터입니다. 아이시 라벤더, 콜드 핑크가 화사함을 극대화해줍니다.',
    '또렷하고 화사한 브라이트 윈터 타입입니다. 채도 높은 파스텔 쿨톤이 이 타입의 매력을 가장 잘 살려줍니다.',
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
  subtype: SubtypeKey;
  mainSeason: MainSeason;
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
  valuePercent: number;
  styleTip: string;
}

/**
 * 웜/쿨(warmthRatio) · 선명도(clarityRatio) · 명도(valueRatio) 세 축(모두 0~1)을
 * 조합해 12계절 유형으로 분류한다. 팔레트는 고정 목록이 아니라 이 세 값으로
 * 매번 새로 계산되므로, 같은 유형이라도 사람마다 색상의 채도·명도가 달라진다.
 */
export function getPersonalColor(warmthRatio: number, clarityRatio: number, valueRatio: number): PersonalColorResult {
  const warm = warmthRatio >= 0.5;
  const clear = clarityRatio >= 0.5;
  const mainSeason: MainSeason = warm ? (clear ? 'spring' : 'autumn') : (clear ? 'winter' : 'summer');

  // 같은 메인 계절 안에서 명도(valueRatio)로 라이트/트루/딥(혹은 웜·소프트·브라이트) 세분화
  const band = valueRatio < 1 / 3 ? 'low' : valueRatio < 2 / 3 ? 'mid' : 'high';
  const SUBTYPE_BY_BAND: Record<MainSeason, Record<'low' | 'mid' | 'high', SubtypeKey>> = {
    spring: { low: 'warmSpring', mid: 'trueSpring', high: 'lightSpring' },
    summer: { low: 'softSummer', mid: 'trueSummer', high: 'lightSummer' },
    autumn: { low: 'deepAutumn', mid: 'trueAutumn', high: 'softAutumn' },
    winter: { low: 'deepWinter', mid: 'trueWinter', high: 'brightWinter' },
  };
  const subtype = SUBTYPE_BY_BAND[mainSeason][band];

  const meta = SUBTYPE_META[subtype];
  const seed = mix32(
    Math.floor(warmthRatio * 99991 + clarityRatio * 15485863 + valueRatio * 1299709) >>> 0
  );
  const text = pick(SUBTYPE_POOL[subtype], seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const tipSeed = (hashString(ymd) ^ seed) >>> 0;
  const styleTip = pick(STYLE_TIP_POOL, tipSeed);

  return {
    subtype,
    mainSeason,
    label: meta.label,
    emoji: meta.emoji,
    from: meta.from,
    to: meta.to,
    vibe: meta.vibe,
    text,
    palette: getPersonalizedPalette(mainSeason, clarityRatio, valueRatio),
    avoidPalette: getAvoidPalette(mainSeason, clarityRatio, valueRatio),
    warmthPercent: Math.round(clamp(warmthRatio, 0, 1) * 100),
    clarityPercent: Math.round(clamp(clarityRatio, 0, 1) * 100),
    valuePercent: Math.round(clamp(valueRatio, 0, 1) * 100),
    styleTip,
  };
}
