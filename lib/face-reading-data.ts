/**
 * 관상 테스트 — 실제 얼굴 인식(landmark 검출)으로 이목구비 비율을 측정하되,
 * 그 비율에 붙이는 성격·운세 해석 문구는 관상학에 근거한 오락 콘텐츠다.
 * 사진 자체는 서버로 전송되지 않고 브라우저 안에서만 처리된다(모델도 자체 호스팅).
 */

export type FeatureKey = 'forehead' | 'eyebrow' | 'eye' | 'nose' | 'mouth' | 'chin';

export const FEATURE_META: Record<FeatureKey, { label: string; icon: string }> = {
  forehead: { label: '이마', icon: '🌤️' },
  eyebrow:  { label: '눈썹', icon: '🖊️' },
  eye:      { label: '눈',   icon: '👁️' },
  nose:     { label: '코',   icon: '🗿' },
  mouth:    { label: '입',   icon: '👄' },
  chin:     { label: '턱선', icon: '📐' },
};

export const FEATURE_POOL: Record<FeatureKey, string[]> = {
  forehead: [
    '넓고 시원한 이마는 생각이 트여있고 큰 그림을 보는 힘이 강하다는 인상을 줍니다. 어릴 때부터 총명하다는 말을 자주 들었을 상입니다.',
    '둥글게 솟은 이마는 융통성과 사교성을 상징합니다. 사람들과 어울리는 자리에서 유난히 편안한 분위기를 만드는 타입입니다.',
    '각진 이마는 결단력과 추진력을 나타냅니다. 한번 정한 목표는 끝까지 밀고 나가는 뚝심이 있는 상입니다.',
    '반듯하고 균형 잡힌 이마는 침착함과 신중함을 뜻합니다. 위기 상황에서 오히려 냉정하게 판단하는 편입니다.',
    '살짝 좁고 아담한 이마는 세심함과 집중력을 나타냅니다. 큰 그림보다 디테일을 챙기는 데 강한 상입니다.',
    '이마의 잔주름이 자연스럽게 자리 잡은 관상은 연륜과 통찰이 쌓인 인상을 줍니다. 주변에서 조언을 구하러 오는 일이 많습니다.',
    '완만하게 이어지는 이마 라인은 온화함과 포용력을 상징합니다. 사람을 잘 품어주는 리더형에 가깝습니다.',
    '높이 솟은 이마는 자존감과 자신감이 강한 인상입니다. 새로운 도전 앞에서 주저함이 적은 편입니다.',
  ],
  eyebrow: [
    '짙고 뚜렷한 눈썹은 강한 의지와 추진력을 상징합니다. 결정을 내리면 뒤돌아보지 않는 성격일 가능성이 큽니다.',
    '부드럽게 곡선을 그리는 눈썹은 온화하고 다정한 인상을 줍니다. 주변 사람을 편하게 만드는 재주가 있습니다.',
    '살짝 치켜 올라간 눈썹은 총명함과 재치를 나타냅니다. 순발력 있는 말솜씨로 분위기를 이끄는 타입입니다.',
    '가지런히 정돈된 눈썹은 계획적이고 꼼꼼한 성향을 나타냅니다. 일 처리에 실수가 적은 편입니다.',
    '눈썹 산이 뚜렷한 관상은 카리스마와 리더십을 상징합니다. 무리 안에서 자연스럽게 중심에 서는 편입니다.',
    '자연스럽게 흐트러진 눈썹은 자유분방함과 창의력을 뜻합니다. 틀에 얽매이지 않는 발상이 강점입니다.',
    '눈썹 사이 간격이 넓은 상은 여유와 포용력을 나타냅니다. 웬만한 일에는 크게 동요하지 않는 편입니다.',
    '눈썹 사이 간격이 좁은 상은 집중력과 몰입도가 높다는 뜻입니다. 한 가지에 빠지면 끝까지 파고드는 편입니다.',
  ],
  eye: [
    '또렷하고 큰 눈은 감정 표현이 풍부하고 공감 능력이 뛰어나다는 상입니다. 상대의 마음을 잘 읽어내는 편입니다.',
    '살짝 처진 눈매는 다정하고 편안한 인상을 줍니다. 낯선 사람도 쉽게 마음을 여는 친화력이 있습니다.',
    '또렷하게 올라간 눈매는 야무지고 똑 부러지는 인상을 줍니다. 맡은 일은 확실하게 해내는 타입입니다.',
    '깊고 그윽한 눈빛은 통찰력과 신중함을 상징합니다. 겉으로 드러내지 않아도 속으로는 많은 것을 헤아리는 편입니다.',
    '초롱초롱 빛나는 눈은 호기심과 열정을 나타냅니다. 새로운 것을 배우는 데 망설임이 없는 상입니다.',
    '차분하게 정돈된 눈매는 안정감과 신뢰감을 줍니다. 주변에서 믿고 의지하는 존재가 되는 편입니다.',
    '눈꼬리가 살짝 올라간 스마일아이는 긍정적이고 밝은 에너지를 나타냅니다. 함께 있으면 기분이 좋아지는 상입니다.',
    '깊은 쌍꺼풀의 눈은 감성이 풍부하고 표현력이 좋다는 상입니다. 예술적 감각이 남다를 가능성이 큽니다.',
  ],
  nose: [
    '오뚝하고 곧은 콧대는 자존심과 원칙이 뚜렷한 상입니다. 자신의 기준을 쉽게 굽히지 않는 편입니다.',
    '둥글고 살집 있는 코끝은 재물운과 복이 따르는 관상으로 여겨집니다. 사람과 기회가 잘 모이는 편입니다.',
    '콧대가 부드럽게 이어지는 상은 온화함과 조화를 상징합니다. 갈등보다 화합을 추구하는 편입니다.',
    '콧볼이 적당히 발달한 상은 추진력과 실행력을 나타냅니다. 생각한 것을 바로 행동으로 옮기는 타입입니다.',
    '작고 아담한 코는 섬세함과 배려심을 뜻합니다. 남이 놓치는 디테일까지 살뜰히 챙기는 편입니다.',
    '길게 뻗은 코는 통찰력과 신중함을 상징합니다. 결정을 내리기 전 여러 번 따져보는 스타일입니다.',
    '콧등이 매끈한 상은 처세가 유연하고 사람 관계에서 마찰이 적다는 뜻입니다.',
    '높고 균형 잡힌 코는 리더십과 주도성을 나타냅니다. 무리를 이끄는 자리에 자주 서게 되는 상입니다.',
  ],
  mouth: [
    '입꼬리가 살짝 올라간 입매는 낙천적이고 긍정적인 성격을 나타냅니다. 웬만한 일은 좋게 해석하는 편입니다.',
    '도톰한 입술은 정이 많고 표현이 풍부한 상입니다. 마음에 있는 것을 잘 표현하는 편입니다.',
    '단정하게 다물어진 입매는 신중함과 절제력을 상징합니다. 말보다 행동으로 보여주는 타입입니다.',
    '큰 입은 배포와 포용력을 나타냅니다. 사람을 가리지 않고 두루두루 잘 어울리는 편입니다.',
    '작고 아담한 입은 세심함과 신중한 언행을 뜻합니다. 말 한마디도 신중하게 고르는 편입니다.',
    '뚜렷한 입술선은 자기표현이 확실하고 주관이 뚜렷하다는 상입니다.',
    '부드러운 곡선의 입매는 다정함과 친화력을 상징합니다. 대화를 편안하게 이끄는 재주가 있습니다.',
    '야무지게 다문 입매는 책임감과 성실함을 나타냅니다. 맡은 일은 끝까지 해내는 편입니다.',
  ],
  chin: [
    '둥글고 부드러운 턱선은 온화함과 포용력을 상징합니다. 사람을 편안하게 품어주는 상입니다.',
    '갸름하고 뾰족한 턱선은 섬세함과 예리한 판단력을 나타냅니다. 상황 파악이 빠른 편입니다.',
    '각진 턱선은 강한 의지와 추진력을 상징합니다. 어려움 앞에서 쉽게 물러서지 않는 편입니다.',
    '살짝 넓은 턱선은 안정감과 뚝심을 나타냅니다. 한번 자리 잡으면 오래가는 관계·일을 만드는 상입니다.',
    '이중턱에 가까운 부드러운 턱은 복스러운 인상을 주며, 재물과 인복이 따르는 상으로 여겨집니다.',
    '갸름하게 떨어지는 턱선은 세련되고 감각적인 인상을 줍니다. 트렌드에 민감한 편입니다.',
    '균형 잡힌 턱선은 안정적인 성격과 신뢰감을 상징합니다. 주변에서 믿고 맡기는 일이 많은 편입니다.',
    '살짝 갈라진 턱은 개성과 매력이 강한 상으로 여겨집니다. 어디서든 눈에 띄는 존재감이 있습니다.',
  ],
};

export const OVERALL_POOL: string[] = [
  '전체적으로 균형 잡힌 이목구비가 조화를 이루는 상입니다. 어디서든 무난하고 편안한 인상을 주는 타입입니다.',
  '이목구비 하나하나가 또렷한 인상형입니다. 처음 본 사람도 오래 기억하게 만드는 존재감이 있습니다.',
  '부드러운 인상이 돋보이는 상입니다. 낯선 자리에서도 사람들이 먼저 다가오게 만드는 친화력이 있습니다.',
  '카리스마가 느껴지는 뚜렷한 인상입니다. 자연스럽게 무리 안에서 중심 역할을 맡게 되는 편입니다.',
  '온화하면서도 단단한 느낌을 동시에 주는 상입니다. 부드러움과 강단을 모두 갖춘 균형형입니다.',
  '섬세하고 정돈된 인상입니다. 꼼꼼함과 감각이 돋보이는 타입으로 보입니다.',
  '생기 있고 활력 넘치는 인상입니다. 주변 분위기를 밝게 만드는 에너지를 가진 상입니다.',
  '차분하고 신뢰감을 주는 인상입니다. 중요한 순간에 사람들이 의지하게 되는 타입입니다.',
];

export const TODAY_LUCK_POOL: string[] = [
  '오늘은 첫인상이 유난히 좋게 작용하는 날입니다. 새로운 사람을 만난다면 먼저 웃어보세요.',
  '오늘은 표정 관리만 잘해도 좋은 기회가 따라오는 날입니다. 여유로운 미소를 유지해보세요.',
  '오늘 하루는 평소보다 매력 지수가 올라가는 날입니다. 자신감 있게 행동해도 좋습니다.',
  '오늘은 상대방의 표정을 잘 살피면 뜻밖의 힌트를 얻을 수 있는 날입니다.',
  '오늘의 관상운은 소통운이 특히 좋습니다. 먼저 말을 건네보면 좋은 인연이 시작될 수 있습니다.',
  '오늘은 인상이 부드러워 보이는 날이라 부탁이나 협상에 유리합니다.',
  '오늘은 눈빛에 힘이 실리는 날입니다. 중요한 자리에서 자신 있게 말해보세요.',
  '오늘의 관상운은 재물운과 연결됩니다. 뜻밖의 좋은 제안이 들어올 수 있습니다.',
  '오늘은 표정에서 편안함이 묻어나는 날입니다. 사람들이 먼저 다가오기 좋은 하루입니다.',
  '오늘은 결단력이 얼굴에 드러나는 날입니다. 미뤄뒀던 결정을 내리기에 좋습니다.',
  '오늘의 관상운은 인복이 따르는 흐름입니다. 도움을 청하면 뜻밖의 손길이 닿을 수 있습니다.',
  '오늘은 웃는 얼굴이 유독 매력적으로 보이는 날입니다. 자주 웃어보세요.',
];

export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

/**
 * 32비트 정수 비트 믹서(splitmix32 계열). 작은 배열에 mod 연산을 적용할 때
 * 하위 비트에만 의존해 서로 다른 입력이 같은 결과로 몰리는 것을 방지한다.
 */
function mix32(x: number): number {
  x = x >>> 0;
  x ^= x >>> 16;
  x = Math.imul(x, 0x85ebca6b) >>> 0;
  x ^= x >>> 13;
  x = Math.imul(x, 0xc2b2ae35) >>> 0;
  x ^= x >>> 16;
  return x >>> 0;
}

function pick<T>(arr: T[], seed: number): T {
  return arr[mix32(seed) % arr.length];
}

function clamp01(x: number): number {
  return Math.max(0, Math.min(1, x));
}

/** 0~1 비율값을 풀 안의 인덱스로 매핑한다 (실측값 기반 선택). */
function pickByRatio<T>(arr: T[], ratio: number): T {
  const idx = Math.min(arr.length - 1, Math.floor(clamp01(ratio) * arr.length));
  return arr[idx];
}

/**
 * face-api.js의 68포인트 랜드마크 + 얼굴 박스로부터 계산한 이목구비 비율.
 * 각 값은 대략 0(작음/좁음)~1(큼/넓음) 범위가 되도록 얼굴 크기 대비로 정규화한다.
 * 사람 얼굴의 평균적인 비례를 참고한 경험적 배율이며, 의학적으로 교정된 값은 아니다.
 */
export interface FaceRatios {
  foreheadRatio: number;
  eyebrowArchRatio: number;
  eyeWidthRatio: number;
  noseWidthRatio: number;
  mouthWidthRatio: number;
  jawWidthRatio: number;
}

export interface FaceReadingResult {
  overall: string;
  features: { key: FeatureKey; label: string; icon: string; text: string }[];
  todayLuck: string;
}

/** 측정된 비율들을 하나의 정수 시드로 압축한다 (오늘의 운·전체인상 다양화용). */
function ratioSeed(r: FaceRatios): number {
  const packed =
    r.foreheadRatio * 997 +
    r.eyebrowArchRatio * 7919 +
    r.eyeWidthRatio * 104729 +
    r.noseWidthRatio * 1299709 +
    r.mouthWidthRatio * 15485863 +
    r.jawWidthRatio * 179424673;
  return mix32(Math.floor(packed * 1000) >>> 0);
}

/** 실제로 측정된 얼굴 비율을 기반으로 관상 리딩을 생성한다. */
export function getFaceReading(ratios: FaceRatios): FaceReadingResult {
  const features: FaceReadingResult['features'] = [
    { key: 'forehead', label: FEATURE_META.forehead.label, icon: FEATURE_META.forehead.icon, text: pickByRatio(FEATURE_POOL.forehead, ratios.foreheadRatio) },
    { key: 'eyebrow',  label: FEATURE_META.eyebrow.label,  icon: FEATURE_META.eyebrow.icon,  text: pickByRatio(FEATURE_POOL.eyebrow, ratios.eyebrowArchRatio) },
    { key: 'eye',      label: FEATURE_META.eye.label,      icon: FEATURE_META.eye.icon,      text: pickByRatio(FEATURE_POOL.eye, ratios.eyeWidthRatio) },
    { key: 'nose',     label: FEATURE_META.nose.label,     icon: FEATURE_META.nose.icon,     text: pickByRatio(FEATURE_POOL.nose, ratios.noseWidthRatio) },
    { key: 'mouth',    label: FEATURE_META.mouth.label,    icon: FEATURE_META.mouth.icon,    text: pickByRatio(FEATURE_POOL.mouth, ratios.mouthWidthRatio) },
    { key: 'chin',     label: FEATURE_META.chin.label,     icon: FEATURE_META.chin.icon,     text: pickByRatio(FEATURE_POOL.chin, ratios.jawWidthRatio) },
  ];

  const seed = ratioSeed(ratios);
  const overall = pick(OVERALL_POOL, seed);

  const today = new Date();
  const ymd = `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`;
  const luckSeed = (hashString(ymd) ^ seed) >>> 0;
  const todayLuck = pick(TODAY_LUCK_POOL, luckSeed);

  return { overall, features, todayLuck };
}
