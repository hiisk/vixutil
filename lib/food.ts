/**
 * 요리 계량·환산 데이터와 계산.
 *
 * 부피를 무게로 바꾸는 일이 이 파일의 핵심이다. 밀가루 1컵은 120g, 설탕 1컵은
 * 200g으로 서로 다르다 — 같은 부피라도 재료마다 밀도가 다르기 때문이다. 이걸
 * 무시하고 "1컵 = 200g"으로 퉁치면 베이킹은 반드시 실패한다.
 *
 * 기본은 한국 계량 기준이다: 1컵 200ml, 1큰술 15ml, 1작은술 5ml.
 * 다만 영어권 레시피의 1컵은 240ml라 값이 20% 어긋난다 — 그래서 toSpoons는
 * 컵 크기를 인자로 받고, 화면에서 어느 기준인지 고를 수 있게 해 둔다.
 */

export const CUP_ML = 200;
/** 미국식 컵 — 영어권 레시피는 대개 이쪽이다 */
export const US_CUP_ML = 240;
export const TBSP_ML = 15;
export const TSP_ML = 5;

export interface Ingredient {
  id: string;
  name: string;
  /** g/ml — 물을 1로 본 상대 밀도 */
  density: number;
  note?: string;
}

/** 계량컵에 담아 깎아 잰 기준 값들 */
export const INGREDIENTS: Ingredient[] = [
  { id: 'water', name: '물·우유', density: 1.0 },
  { id: 'flour', name: '밀가루(박력·중력)', density: 0.6, note: '체에 쳐서 수북이 담지 말고 깎아 재세요' },
  { id: 'sugar', name: '설탕(백설탕)', density: 1.0 },
  { id: 'brown-sugar', name: '황설탕(눌러 담기)', density: 1.1 },
  { id: 'salt', name: '소금(꽃소금)', density: 1.2 },
  { id: 'rice', name: '쌀(생쌀)', density: 0.85 },
  { id: 'oil', name: '식용유·올리브유', density: 0.92 },
  { id: 'butter', name: '버터(녹인 것)', density: 0.91 },
  { id: 'honey', name: '꿀·물엿', density: 1.42 },
  { id: 'soy', name: '간장', density: 1.15 },
  { id: 'gochujang', name: '고추장', density: 1.25 },
  { id: 'cocoa', name: '코코아 가루', density: 0.42 },
  { id: 'oat', name: '오트밀', density: 0.4 },
  { id: 'breadcrumb', name: '빵가루', density: 0.35 },
];

export const findIngredient = (id: string) => INGREDIENTS.find(i => i.id === id);

/** 부피(ml) → 무게(g) */
export function volumeToGram(ml: number, density: number): number {
  return Math.round(ml * density * 10) / 10;
}

/** 무게(g) → 부피(ml) */
export function gramToVolume(g: number, density: number): number {
  return Math.round((g / density) * 10) / 10;
}

/** ml을 컵·큰술·작은술로 쪼갠다 — 계량도구로 실제로 재려면 이 형태가 필요하다 */
export function toSpoons(ml: number, cupMl: number = CUP_ML): { cup: number; tbsp: number; tsp: number } {
  let left = ml;
  const cup = Math.floor(left / cupMl);
  left -= cup * cupMl;
  const tbsp = Math.floor(left / TBSP_ML);
  left -= tbsp * TBSP_ML;
  return { cup, tbsp, tsp: Math.round((left / TSP_ML) * 10) / 10 };
}

/* ────────────────────────────────
   오븐 온도
   ──────────────────────────────── */

export const cToF = (c: number) => Math.round((c * 9) / 5 + 32);
export const fToC = (f: number) => Math.round(((f - 32) * 5) / 9);

/** 영국식 가스마크 — 오래된 레시피에 종종 나온다 */
export function gasMark(celsius: number): string {
  const table: [number, string][] = [
    [135, '1'], [150, '2'], [165, '3'], [180, '4'], [190, '5'],
    [200, '6'], [220, '7'], [230, '8'], [245, '9'],
  ];
  const hit = table.find(([c]) => celsius <= c);
  return hit ? hit[1] : '9 이상';
}

/**
 * 에어프라이어 환산 — 온도를 20도 낮추고 시간을 20% 줄이는 것이 통설이다.
 * 뜨거운 바람이 직접 닿아 같은 온도라도 훨씬 빨리 익기 때문이다.
 */
export function toAirFryer(celsius: number, minutes: number): { celsius: number; minutes: number } {
  return { celsius: celsius - 20, minutes: Math.round(minutes * 0.8) };
}

/* ────────────────────────────────
   고기 굽기
   ──────────────────────────────── */

export interface Doneness {
  id: string;
  name: string;
  /** 불에서 꺼낼 때의 중심 온도(℃) */
  pull: number;
  /** 휴지 후 최종 온도(℃) */
  final: number;
  desc: string;
}

/**
 * 꺼내는 온도가 최종 온도보다 낮은 것은 잔열 때문이다. 불에서 내린 뒤에도
 * 겉의 열이 안으로 퍼지며 3~5도가 더 오른다 — 목표 온도에서 꺼내면 한 단계
 * 더 익은 고기가 된다.
 */
export const DONENESS: Doneness[] = [
  { id: 'rare', name: '레어', pull: 49, final: 52, desc: '가운데가 붉고 차갑습니다' },
  { id: 'medium-rare', name: '미디엄 레어', pull: 54, final: 57, desc: '가장 많이 권하는 굽기입니다' },
  { id: 'medium', name: '미디엄', pull: 60, final: 63, desc: '분홍빛이 남고 육즙이 있습니다' },
  { id: 'medium-well', name: '미디엄 웰던', pull: 65, final: 68, desc: '분홍빛이 거의 사라집니다' },
  { id: 'well', name: '웰던', pull: 71, final: 74, desc: '속까지 완전히 익습니다' },
];

/** 두께에 따른 한 면 굽기 시간(분) — 센 불 팬 기준 어림값 */
export function searMinutes(thicknessCm: number, doneness: string): number {
  const base = { rare: 1.0, 'medium-rare': 1.5, medium: 2.0, 'medium-well': 2.5, well: 3.0 }[doneness] ?? 1.5;
  return Math.round(base * thicknessCm * 10) / 10;
}

/* ────────────────────────────────
   커피
   ──────────────────────────────── */

export const BREW_RATIOS: { id: string; name: string; ratio: number; note: string }[] = [
  { id: 'filter-light', name: '핸드드립 (연하게)', ratio: 17, note: '물 17 : 원두 1' },
  { id: 'filter', name: '핸드드립 (보통)', ratio: 15, note: '가장 무난한 비율입니다' },
  { id: 'filter-strong', name: '핸드드립 (진하게)', ratio: 13, note: '산미가 줄고 바디가 올라갑니다' },
  { id: 'french', name: '프렌치프레스', ratio: 14, note: '굵게 갈아 4분 담급니다' },
  { id: 'coldbrew', name: '콜드브루 원액', ratio: 8, note: '희석해서 마십니다' },
  { id: 'espresso', name: '에스프레소', ratio: 2, note: '원두 1 : 추출량 2' },
];

/* ────────────────────────────────
   식품 보관
   ──────────────────────────────── */

export interface StorageItem {
  name: string;
  category: string;
  fridge: string;
  freezer: string;
  tip: string;
}

export const STORAGE: StorageItem[] = [
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
];

/* ────────────────────────────────
   베이킹 팬
   ──────────────────────────────── */

/** 원형 팬 넓이 — 반죽량은 넓이에 비례한다 */
export const roundArea = (diameterCm: number) => Math.PI * (diameterCm / 2) ** 2;
export const rectArea = (w: number, h: number) => w * h;

/** 팬을 바꿀 때 반죽을 몇 배로 할지 */
export function panScale(fromArea: number, toArea: number): number {
  return Math.round((toArea / fromArea) * 100) / 100;
}
