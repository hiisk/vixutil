/**
 * 요리 도구가 쓰는 데이터의 세 언어 이름표.
 *
 * lib/food.ts의 밀도·온도·비율은 언어와 무관한 숫자다. 그래서 그쪽은 건드리지
 * 않고, id(또는 배열 순서)를 열쇠로 이름과 설명만 여기서 갈아 끼운다.
 *
 * 재료 이름은 번역이 아니라 그 언어의 부엌에서 쓰는 말로 적는다 — 고추장을
 * 'red pepper paste'로 풀어 쓰는 대신 gochujang으로 두는 것이 실제로 찾기 쉽다.
 */
export type FoodLang = 'ko' | 'en';

/** INGREDIENTS의 id → 이름·주의 */
export const INGREDIENT_INTL: Record<FoodLang, Record<string, { name: string; note?: string }>> = {
  ko: {
    water: { name: '물·우유' },
    flour: { name: '밀가루(박력·중력)', note: '체에 쳐서 수북이 담지 말고 깎아 재세요' },
    sugar: { name: '설탕(백설탕)' },
    'brown-sugar': { name: '황설탕(눌러 담기)' },
    salt: { name: '소금(꽃소금)' },
    rice: { name: '쌀(생쌀)' },
    oil: { name: '식용유·올리브유' },
    butter: { name: '버터(녹인 것)' },
    honey: { name: '꿀·물엿' },
    soy: { name: '간장' },
    gochujang: { name: '고추장' },
    cocoa: { name: '코코아 가루' },
    oat: { name: '오트밀' },
    breadcrumb: { name: '빵가루' },
  },
  en: {
    water: { name: 'Water or milk' },
    flour: { name: 'Flour (plain, cake)', note: 'Sift it and level the cup off — do not heap or pack it' },
    sugar: { name: 'Sugar (white, granulated)' },
    'brown-sugar': { name: 'Brown sugar (packed)' },
    salt: { name: 'Salt (fine)' },
    rice: { name: 'Rice (uncooked)' },
    oil: { name: 'Cooking or olive oil' },
    butter: { name: 'Butter (melted)' },
    honey: { name: 'Honey or syrup' },
    soy: { name: 'Soy sauce' },
    gochujang: { name: 'Gochujang (Korean chilli paste)' },
    cocoa: { name: 'Cocoa powder' },
    oat: { name: 'Rolled oats' },
    breadcrumb: { name: 'Breadcrumbs' },
  },
};

/** DONENESS의 id → 이름·설명 */
export const DONENESS_INTL: Record<FoodLang, Record<string, { name: string; desc: string }>> = {
  ko: {
    rare: { name: '레어', desc: '가운데가 붉고 차갑습니다' },
    'medium-rare': { name: '미디엄 레어', desc: '가장 많이 권하는 굽기입니다' },
    medium: { name: '미디엄', desc: '분홍빛이 남고 육즙이 있습니다' },
    'medium-well': { name: '미디엄 웰던', desc: '분홍빛이 거의 사라집니다' },
    well: { name: '웰던', desc: '속까지 완전히 익습니다' },
  },
  en: {
    rare: { name: 'Rare', desc: 'Red and cool in the middle' },
    'medium-rare': { name: 'Medium rare', desc: 'The most commonly recommended' },
    medium: { name: 'Medium', desc: 'Still pink, still juicy' },
    'medium-well': { name: 'Medium well', desc: 'Almost no pink left' },
    well: { name: 'Well done', desc: 'Cooked through' },
  },
};

/** BREW_RATIOS의 id → 이름·설명 */
export const BREW_INTL: Record<FoodLang, Record<string, { name: string; note: string }>> = {
  ko: {
    'filter-light': { name: '핸드드립 (연하게)', note: '물 17 : 원두 1' },
    filter: { name: '핸드드립 (보통)', note: '가장 무난한 비율입니다' },
    'filter-strong': { name: '핸드드립 (진하게)', note: '산미가 줄고 바디가 올라갑니다' },
    french: { name: '프렌치프레스', note: '굵게 갈아 4분 담급니다' },
    coldbrew: { name: '콜드브루 원액', note: '희석해서 마십니다' },
    espresso: { name: '에스프레소', note: '원두 1 : 추출량 2' },
  },
  en: {
    'filter-light': { name: 'Pour over (light)', note: '17 parts water to 1 coffee' },
    filter: { name: 'Pour over (standard)', note: 'The safest ratio to start from' },
    'filter-strong': { name: 'Pour over (strong)', note: 'Less acidity, more body' },
    french: { name: 'French press', note: 'Coarse grind, steeped four minutes' },
    coldbrew: { name: 'Cold brew concentrate', note: 'Dilute before drinking' },
    espresso: { name: 'Espresso', note: '1 part coffee to 2 out' },
  },
};

/** 원두 분쇄도·시간 안내 (커피 도구) */
export const GRIND_INTL: Record<FoodLang, Record<string, string>> = {
  ko: {
    'filter-light': '중간 굵기 · 2분 30초~3분',
    filter: '중간 굵기 · 2분 30초~3분',
    'filter-strong': '중간보다 조금 곱게 · 3분',
    french: '아주 굵게 · 4분 담근 뒤 눌러 내리기',
    coldbrew: '굵게 · 냉장 12~16시간',
    espresso: '아주 곱게 · 25~30초 추출',
  },
  en: {
    'filter-light': 'Medium grind · 2:30–3:00',
    filter: 'Medium grind · 2:30–3:00',
    'filter-strong': 'Slightly finer than medium · 3:00',
    french: 'Very coarse · steep 4 minutes, then press',
    coldbrew: 'Coarse · 12–16 hours in the fridge',
    espresso: 'Very fine · 25–30 second shot',
  },
};

/** STORAGE 배열 순서 → 이름·분류·기간·요령 */
export const STORAGE_INTL: Record<FoodLang, { name: string; category: string; fridge: string; freezer: string; tip: string }[]> = {
  ko: [
    { name: '생닭', category: '육류', fridge: '1~2일', freezer: '9개월', tip: '핏물을 닦아 밀폐해 두면 냄새가 덜합니다' },
    { name: '다진 고기', category: '육류', fridge: '1~2일', freezer: '3~4개월', tip: '표면적이 넓어 가장 빨리 상합니다' },
    { name: '소·돼지 덩어리', category: '육류', fridge: '3~5일', freezer: '6~12개월', tip: '한 번 쓸 만큼 나눠 얼리세요' },
    { name: '생선(흰살)', category: '수산물', fridge: '1~2일', freezer: '6개월', tip: '내장을 빼고 물기를 없앤 뒤 보관하세요' },
    { name: '새우·조개', category: '수산물', fridge: '1~2일', freezer: '3~6개월', tip: '해동 후 재냉동하지 마세요' },
    { name: '우유', category: '유제품', fridge: '개봉 후 2~3일', freezer: '권장하지 않음', tip: '문쪽은 온도가 높아 안쪽에 두세요' },
    { name: '치즈(경성)', category: '유제품', fridge: '3~4주', freezer: '6개월', tip: '얼리면 부스러지므로 요리용으로만' },
    { name: '달걀', category: '유제품', fridge: '3~5주', freezer: '푼 것만 1년', tip: '씻지 말고 뾰족한 쪽을 아래로 두세요' },
    { name: '밥(지은 것)', category: '조리식품', fridge: '1일', freezer: '1개월', tip: '따뜻할 때 바로 얼려야 맛이 남습니다' },
    { name: '국·찌개', category: '조리식품', fridge: '2~3일', freezer: '2~3개월', tip: '식힌 뒤 넣고, 다시 데울 때 팔팔 끓이세요' },
    { name: '두부(개봉)', category: '조리식품', fridge: '2~3일', freezer: '3개월', tip: '물에 담가 매일 물을 갈아 주세요' },
    { name: '잎채소', category: '채소·과일', fridge: '3~7일', freezer: '데쳐서 8개월', tip: '물기를 없애고 키친타월과 함께 넣으세요' },
    { name: '감자·양파', category: '채소·과일', fridge: '넣지 마세요', freezer: '조리 후 3개월', tip: '서늘하고 어두운 곳에 따로 보관하세요' },
    { name: '바나나·토마토', category: '채소·과일', fridge: '익은 뒤 2~3일', freezer: '으깨서 3개월', tip: '덜 익었으면 실온에 두세요' },
  ],
  en: [
    { name: 'Raw chicken', category: 'Meat', fridge: '1–2 days', freezer: '9 months', tip: 'Pat off the blood and seal it — it smells far less' },
    { name: 'Minced meat', category: 'Meat', fridge: '1–2 days', freezer: '3–4 months', tip: 'All that surface area makes it spoil the fastest' },
    { name: 'Beef or pork joint', category: 'Meat', fridge: '3–5 days', freezer: '6–12 months', tip: 'Freeze it in portions you will use at once' },
    { name: 'White fish', category: 'Seafood', fridge: '1–2 days', freezer: '6 months', tip: 'Gut it and dry it off before storing' },
    { name: 'Prawns and shellfish', category: 'Seafood', fridge: '1–2 days', freezer: '3–6 months', tip: 'Never refreeze after thawing' },
    { name: 'Milk', category: 'Dairy', fridge: '2–3 days once open', freezer: 'Not recommended', tip: 'The door is the warmest spot — keep it further in' },
    { name: 'Hard cheese', category: 'Dairy', fridge: '3–4 weeks', freezer: '6 months', tip: 'Freezing makes it crumbly, so use it for cooking' },
    { name: 'Eggs', category: 'Dairy', fridge: '3–5 weeks', freezer: '1 year, beaten only', tip: 'Do not wash them, and store pointed end down' },
    { name: 'Cooked rice', category: 'Cooked food', fridge: '1 day', freezer: '1 month', tip: 'Freeze it while still warm to keep the texture' },
    { name: 'Soups and stews', category: 'Cooked food', fridge: '2–3 days', freezer: '2–3 months', tip: 'Cool it before it goes in, and boil it hard when reheating' },
    { name: 'Tofu (opened)', category: 'Cooked food', fridge: '2–3 days', freezer: '3 months', tip: 'Keep it under water and change the water daily' },
    { name: 'Leafy greens', category: 'Produce', fridge: '3–7 days', freezer: '8 months blanched', tip: 'Dry them off and store with a paper towel' },
    { name: 'Potatoes and onions', category: 'Produce', fridge: 'Do not refrigerate', freezer: '3 months once cooked', tip: 'Store them apart, somewhere cool and dark' },
    { name: 'Bananas and tomatoes', category: 'Produce', fridge: '2–3 days once ripe', freezer: '3 months mashed', tip: 'Leave them at room temperature until ripe' },
  ],
};

/** 보관 도구의 분류 탭 — 첫 항목은 '전체' */
export const STORAGE_CATEGORIES: Record<FoodLang, string[]> = {
  ko: ['전체', '육류', '수산물', '유제품', '조리식품', '채소·과일'],
  en: ['All', 'Meat', 'Seafood', 'Dairy', 'Cooked food', 'Produce'],
};
