/**
 * 계량·요리(/food) 섹션의 도구 메타데이터.
 *
 * 이 섹션의 전제: 요리에서 검색하게 되는 것은 대개 "얼마나"다. 밀가루 한 컵이
 * 몇 그램인지, 2인분 레시피를 5인분으로 어떻게 늘리는지, 오븐 350°F가 몇 도인지.
 * 전부 표와 산수라 브라우저에서 끝난다.
 */
export interface FoodTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  gradient: string;
  og: [string, string];
  long: string;
  metaTitle: string;
  features: string[];
}

export const FOOD_TOOLS: FoodTool[] = [
  {
    slug: 'measure',
    title: '계량 변환',
    desc: '컵·큰술을 그램으로 (재료별로 다릅니다)',
    icon: '🥄',
    category: '계량',
    gradient: 'from-amber-500 to-orange-600',
    og: ['#f59e0b', '#ea580c'],
    metaTitle: '계량 변환 - 컵·큰술을 그램으로 바꾸기',
    long: '밀가루 1컵은 120g, 설탕 1컵은 200g입니다. 같은 부피라도 재료마다 무게가 다르므로 재료를 골라야 정확합니다. 저울이 없을 때는 반대로 그램을 컵·큰술로 바꿔 볼 수도 있습니다.',
    features: ['재료별 밀도 반영', '컵·큰술·작은술 ↔ g·ml', '계량도구 조합으로 표시', '한국식 200ml 컵 기준'],
  },
  {
    slug: 'recipe-scale',
    title: '레시피 배율',
    desc: '2인분 레시피를 원하는 인분으로',
    icon: '📖',
    category: '계량',
    gradient: 'from-rose-500 to-pink-600',
    og: ['#f43f5e', '#db2777'],
    metaTitle: '레시피 배율 계산 - 인분 수에 맞춰 재료 늘리기',
    long: '레시피를 붙여 넣고 인분만 바꾸면 재료 양을 전부 다시 계산해 줍니다. 숫자와 단위를 알아서 찾아 바꾸므로 한 줄씩 곱하지 않아도 됩니다.',
    features: ['레시피 붙여넣고 인분만 변경', '숫자·분수 자동 인식', '결과 한 번에 복사', '소수점 정리'],
  },
  {
    slug: 'salt',
    title: '소금물 염도',
    desc: '김장·장아찌용 소금물 만들기',
    icon: '🧂',
    category: '계량',
    gradient: 'from-sky-500 to-cyan-600',
    og: ['#0ea5e9', '#0891b2'],
    metaTitle: '소금물 염도 계산 - 김장·장아찌 절임물',
    long: '원하는 염도(%)와 물의 양을 넣으면 소금이 몇 그램 필요한지 계산합니다. 배추 절이기·장아찌·피클처럼 염도가 결과를 좌우하는 요리에서 감으로 하지 않게 해줍니다.',
    features: ['염도(%)로 소금량 계산', '용도별 권장 염도 안내', '소금 종류별 부피 환산', '반대로 염도 역산'],
  },
  {
    slug: 'oven',
    title: '오븐 온도 변환',
    desc: '화씨·가스마크·에어프라이어 환산',
    icon: '🔥',
    category: '가열',
    gradient: 'from-orange-500 to-red-600',
    og: ['#f97316', '#dc2626'],
    metaTitle: '오븐 온도 변환 - 화씨·가스마크·에어프라이어',
    long: '외국 레시피의 350°F가 몇 도인지, 가스마크 4가 얼마인지 바꿔 줍니다. 같은 요리를 에어프라이어로 할 때의 온도와 시간도 함께 계산합니다.',
    features: ['섭씨 ↔ 화씨 변환', '영국식 가스마크 표시', '에어프라이어 온도·시간 환산', '자주 쓰는 온도 프리셋'],
  },
  {
    slug: 'steak',
    title: '고기 굽기 온도',
    desc: '미디엄 레어는 중심 몇 도인가',
    icon: '🥩',
    category: '가열',
    gradient: 'from-red-500 to-rose-700',
    og: ['#ef4444', '#be123c'],
    metaTitle: '고기 굽기 온도 - 스테이크 중심 온도와 시간',
    long: '굽기 단계별 중심 온도와, 잔열을 감안해 불에서 언제 꺼내야 하는지 알려줍니다. 두께를 넣으면 한 면당 대략 몇 분 구워야 하는지도 계산합니다.',
    features: ['굽기 5단계 중심 온도', '잔열 감안한 꺼내는 온도', '두께별 굽는 시간 어림', '휴지 시간 안내'],
  },
  {
    slug: 'rice',
    title: '밥물 계산',
    desc: '쌀 몇 컵에 물은 얼마나',
    icon: '🍚',
    category: '가열',
    gradient: 'from-lime-500 to-emerald-600',
    og: ['#84cc16', '#059669'],
    metaTitle: '밥물 계산 - 쌀 양에 맞는 물의 양',
    long: '쌀의 양과 원하는 밥의 질기에 따라 물을 얼마나 넣어야 하는지 계산합니다. 백미·현미·잡곡이 서로 다르고, 묵은쌀은 물을 더 넣어야 한다는 것까지 반영합니다.',
    features: ['백미·현미·잡곡별 물 비율', '진밥·고슬밥 조절', '컵·ml·손등 기준 안내', '불리는 시간 안내'],
  },
  {
    slug: 'pasta',
    title: '파스타 물·소금',
    desc: '면 200g에 물과 소금은 얼마나',
    icon: '🍝',
    category: '가열',
    gradient: 'from-yellow-500 to-amber-600',
    og: ['#eab308', '#d97706'],
    metaTitle: '파스타 물·소금 계산 - 면 삶는 황금비율',
    long: '면 100g에 물 1L, 소금 10g이 기본 비율입니다. 면 양을 넣으면 물과 소금을 계산해 주고, 면 종류별 삶는 시간도 함께 알려줍니다.',
    features: ['면 양에 맞는 물·소금', '면 종류별 삶는 시간', '알덴테 기준 시간 조정', '면수 활용 안내'],
  },
  {
    slug: 'coffee',
    title: '커피 비율',
    desc: '원두와 물의 황금비율',
    icon: '☕',
    category: '음료',
    gradient: 'from-amber-700 to-orange-800',
    og: ['#b45309', '#9a3412'],
    metaTitle: '커피 비율 계산 - 원두와 물의 황금비율',
    long: '핸드드립·프렌치프레스·콜드브루마다 다른 원두와 물의 비율을 계산합니다. 마실 양을 정하면 원두 몇 그램을 갈아야 하는지 바로 나옵니다.',
    features: ['추출 방식별 비율', '마실 양 기준으로 원두량 계산', '반대로 원두량 기준 계산', '분쇄도·시간 안내'],
  },
  {
    slug: 'baking-pan',
    title: '베이킹 팬 환산',
    desc: '틀 크기가 다를 때 반죽량 조절',
    icon: '🎂',
    category: '베이킹',
    gradient: 'from-pink-500 to-fuchsia-600',
    og: ['#ec4899', '#c026d3'],
    metaTitle: '베이킹 팬 환산 - 틀 크기 바꿀 때 반죽량',
    long: '레시피는 15cm 원형인데 집에는 18cm 사각틀뿐일 때, 반죽을 몇 배로 해야 하는지 계산합니다. 넓이 비율로 계산하므로 높이가 비슷한 틀끼리는 그대로 맞습니다.',
    features: ['원형·사각·파운드틀 넓이 비교', '반죽 배율 계산', '굽는 시간 조정 안내', '자주 쓰는 틀 크기 프리셋'],
  },
  {
    slug: 'storage',
    title: '식품 보관 기간',
    desc: '냉장·냉동 며칠까지 괜찮을까',
    icon: '🧊',
    category: '보관',
    gradient: 'from-cyan-500 to-blue-700',
    og: ['#06b6d4', '#1d4ed8'],
    metaTitle: '식품 보관 기간 - 냉장·냉동 보관일 확인',
    long: '고기·생선·유제품·조리식품이 냉장과 냉동에서 각각 며칠까지 괜찮은지, 어떻게 두어야 오래 가는지 정리했습니다. 애매해서 버리거나, 애매한데 먹는 일을 줄여줍니다.',
    features: ['재료별 냉장·냉동 기간', '보관 요령', '냉장고에 넣으면 안 되는 것', '분류별 검색'],
  },
];

/** 같은 카테고리를 먼저, 그다음 나머지에서 채운다. */
export function relatedFoodTools(slug: string, limit = 4): FoodTool[] {
  const current = FOOD_TOOLS.find(t => t.slug === slug);
  if (!current) return [];
  const others = FOOD_TOOLS.filter(t => t.slug !== slug);
  const same = others.filter(t => t.category === current.category);
  const rest = others.filter(t => t.category !== current.category);
  return [...same, ...rest].slice(0, limit);
}

export function findFoodTool(slug: string): FoodTool | undefined {
  return FOOD_TOOLS.find(t => t.slug === slug);
}
