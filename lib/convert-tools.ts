/**
 * 단위 변환(/convert) 섹션의 카탈로그.
 *
 * 쉰 개를 각각 손으로 만들지 않는다. 변환은 전부 "곱하고 더한다"는 같은 모양이라
 * 엔진 하나와 데이터 쉰 줄이면 끝난다 — 계산기·심리테스트·퀴즈가 이미 쓰는 방식이다.
 * 손으로 쉰 개를 만들면 반드시 몇 개는 다른 화면이 되고, 계수 하나를 고칠 때
 * 쉰 군데를 뒤져야 한다.
 *
 * 계수는 정의값(1인치 = 2.54cm처럼 국제적으로 딱 정해진 값)과 관습값(1근 = 600g)이
 * 섞여 있다. 관습값은 지역·품목에 따라 다르므로 note에 그 사실을 적는다 —
 * 숫자만 보여주고 넘어가면 잘못 쓰는 사람이 생긴다.
 */
import { CONVERT_TOOLS2, CONVERT_CATEGORIES2 } from './convert-tools2.ts';
import { CONVERT_TOOLS3 } from './convert-tools3.ts';
import { CONVERT_TOOLS4 } from './convert-tools4.ts';
import { relatedFor } from './related-rotate.ts';

export interface ConvertTool {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  /** 기준 단위(왼쪽) */
  from: string;
  /** 대상 단위(오른쪽) */
  to: string;
  /** 1 from = factor × to (+ offset) */
  factor: number;
  offset?: number;
  /**
   * 반비례 변환 — to = factor ÷ from.
   *
   * 달리기 페이스(분/km)와 시속, 음악 BPM과 한 박의 길이가 그렇다. 곱셈으로는
   * 표현이 안 되므로 이 표시를 보고 나누기로 바꾼다. 자기 자신이 역변환이라
   * 왕복하면 원래 값으로 돌아온다.
   */
  reciprocal?: boolean;
  /** 결과 소수 자리 */
  digits: number;
  /** 자주 찾는 값 — 표로 미리 보여준다 */
  quick: number[];
  metaTitle: string;
  long: string;
  /** 이 단위를 언제 쓰는지, 주의할 점은 무엇인지 */
  note: string;
}

const LENGTH: ConvertTool[] = [
  {
    slug: 'cm-inch', title: 'cm ↔ 인치', desc: '센티미터와 인치를 서로 바꿉니다', icon: '📏',
    category: '길이', from: 'cm', to: 'inch', factor: 0.3937007874, digits: 3, quick: [1, 5, 10, 20, 30, 50, 100],
    metaTitle: 'cm ↔ 인치 변환 - 센티미터를 인치로',
    long: '센티미터와 인치를 서로 바꿉니다. 모니터·TV 크기, 옷 치수, 바퀴 지름처럼 인치로 표기된 것을 실제 길이로 가늠할 때 씁니다.',
    note: '1인치는 정확히 2.54cm로 정의돼 있습니다. 모니터의 인치는 가로가 아니라 대각선 길이입니다.',
  },
  {
    slug: 'm-feet', title: '미터 ↔ 피트', desc: '미터와 피트를 서로 바꿉니다', icon: '📐',
    category: '길이', from: 'm', to: 'ft', factor: 3.280839895, digits: 3, quick: [1, 2, 5, 10, 30, 50, 100],
    metaTitle: '미터 ↔ 피트 변환 - m를 ft로',
    long: '미터와 피트를 서로 바꿉니다. 항공기 고도, 건물 높이, 해외 부동산 표기에서 자주 마주칩니다.',
    note: '1피트는 정확히 0.3048m입니다. 비행기 기내 방송의 "3만 5천 피트"는 약 10.7km입니다.',
  },
  {
    slug: 'km-mile', title: '킬로미터 ↔ 마일', desc: '거리 단위를 서로 바꿉니다', icon: '🛣️',
    category: '길이', from: 'km', to: 'mi', factor: 0.6213711922, digits: 3, quick: [1, 5, 10, 21.0975, 42.195, 100],
    metaTitle: '킬로미터 ↔ 마일 변환 - km를 mile로',
    long: '킬로미터와 마일을 서로 바꿉니다. 해외 도로 표지판, 러닝·자전거 기록, 자동차 주행거리에서 씁니다.',
    note: '1마일은 1.609344km입니다. 마라톤 42.195km는 약 26.2마일이고, 하프는 약 13.1마일입니다.',
  },
  {
    slug: 'mm-inch', title: 'mm ↔ 인치', desc: '밀리미터와 인치를 서로 바꿉니다', icon: '🔩',
    category: '길이', from: 'mm', to: 'inch', factor: 0.03937007874, digits: 4, quick: [1, 5, 10, 25.4, 50, 100],
    metaTitle: 'mm ↔ 인치 변환 - 밀리미터를 인치로',
    long: '밀리미터와 인치를 서로 바꿉니다. 나사·공구·부품 규격은 인치로 적힌 것이 많아 실제 치수와 맞춰 봐야 합니다.',
    note: '공구에서 자주 보는 1/2인치는 12.7mm, 3/8인치는 9.525mm입니다. 인치 규격과 미터 규격 나사는 서로 맞지 않습니다.',
  },
  {
    slug: 'yard-m', title: '야드 ↔ 미터', desc: '야드와 미터를 서로 바꿉니다', icon: '⛳',
    category: '길이', from: 'yd', to: 'm', factor: 0.9144, digits: 3, quick: [1, 50, 100, 150, 200, 250, 300],
    metaTitle: '야드 ↔ 미터 변환 - 골프 거리 환산',
    long: '야드와 미터를 서로 바꿉니다. 골프 코스 거리와 미식축구 표기가 야드를 쓰므로 실제 거리를 가늠할 때 필요합니다.',
    note: '1야드는 정확히 0.9144m입니다. 골프에서 200야드는 약 183m로, 미터로 표기된 코스와 헷갈리면 클럽 선택이 어긋납니다.',
  },
  {
    slug: 'nautical-mile-km', title: '해리 ↔ 킬로미터', desc: '바다·하늘의 거리 단위', icon: '⚓',
    category: '길이', from: 'nmi', to: 'km', factor: 1.852, digits: 3, quick: [1, 5, 10, 50, 100, 200],
    metaTitle: '해리 ↔ 킬로미터 변환 - 해상 거리 환산',
    long: '해리(nautical mile)와 킬로미터를 서로 바꿉니다. 배와 비행기의 거리, 영해 범위가 해리로 표기됩니다.',
    note: '1해리는 정확히 1.852km로, 지구 위도 1분에 해당하는 거리에서 나왔습니다. 영해 12해리는 약 22km입니다.',
  },
  {
    slug: 'foot-cm', title: '피트 ↔ 센티미터', desc: '키를 피트·인치로 표기할 때', icon: '🧍',
    category: '길이', from: 'ft', to: 'cm', factor: 30.48, digits: 2, quick: [4.5, 5, 5.5, 5.8, 6, 6.2],
    metaTitle: '피트 ↔ 센티미터 변환 - 키 환산',
    long: '피트와 센티미터를 서로 바꿉니다. 해외 서류나 프로필에서 키를 피트·인치로 적어야 할 때 씁니다.',
    note: '키 표기는 보통 5\'9"처럼 피트와 인치를 함께 씁니다. 5피트 9인치는 175.3cm입니다.',
  },
  {
    slug: 'micron-mm', title: '마이크로미터 ↔ mm', desc: '아주 작은 길이 단위', icon: '🔬',
    category: '길이', from: 'µm', to: 'mm', factor: 0.001, digits: 4, quick: [1, 10, 50, 100, 500, 1000],
    metaTitle: '마이크로미터 ↔ mm 변환 - 미크론 환산',
    long: '마이크로미터(미크론)와 밀리미터를 서로 바꿉니다. 필터 성능, 도금 두께, 미세먼지 크기에서 씁니다.',
    note: '머리카락 굵기가 약 70µm(0.07mm)입니다. 미세먼지 PM10은 10µm 이하, 초미세먼지 PM2.5는 2.5µm 이하를 뜻합니다.',
  },
  {
    slug: 'ri-km', title: '리(里) ↔ 킬로미터', desc: '옛 거리 단위를 오늘의 거리로', icon: '🏞️',
    category: '길이', from: '리', to: 'km', factor: 0.3927, digits: 3, quick: [1, 5, 10, 100, 1000],
    metaTitle: '리(里) ↔ 킬로미터 변환 - 십리는 몇 km',
    long: '옛 거리 단위인 리(里)를 킬로미터로 바꿉니다. "십리도 못 가서 발병 난다", "삼천리 강산" 같은 표현이 실제로 얼마인지 알 수 있습니다.',
    note: '조선 후기 기준 1리는 약 392.7m입니다. 십리는 약 3.9km, 삼천리는 약 1,178km로 한반도를 세로로 가로지르는 거리와 비슷합니다.',
  },
  {
    slug: 'ja-cm', title: '자(척) ↔ 센티미터', desc: '한복·가구에 쓰는 옛 길이 단위', icon: '🪡',
    category: '길이', from: '자', to: 'cm', factor: 30.303, digits: 2, quick: [1, 2, 3, 5, 10],
    metaTitle: '자(척) ↔ 센티미터 변환 - 한 자는 몇 cm',
    long: '자(척)를 센티미터로 바꿉니다. 한복 원단, 전통 가구, 이불 크기를 자로 이야기하는 곳이 아직 많습니다.',
    note: '1자는 약 30.3cm입니다. 다만 옷감을 재는 포목자(약 55cm)는 다른 단위이니, 어느 자인지 먼저 확인해야 합니다.',
  },
];

const WEIGHT: ConvertTool[] = [
  {
    slug: 'kg-lb', title: '킬로그램 ↔ 파운드', desc: '몸무게·수하물 무게 환산', icon: '⚖️',
    category: '무게', from: 'kg', to: 'lb', factor: 2.2046226218, digits: 3, quick: [1, 5, 10, 20, 23, 50, 70],
    metaTitle: '킬로그램 ↔ 파운드 변환 - kg를 lb로',
    long: '킬로그램과 파운드를 서로 바꿉니다. 해외 항공 수하물 규정, 운동기구 중량, 해외 몸무게 표기에서 씁니다.',
    note: '1파운드는 정확히 0.45359237kg입니다. 항공 수하물 23kg은 약 50.7파운드로, 50파운드 제한인 항공사에서는 초과됩니다.',
  },
  {
    slug: 'g-oz', title: '그램 ↔ 온스', desc: '작은 무게 단위 환산', icon: '🥄',
    category: '무게', from: 'g', to: 'oz', factor: 0.03527396195, digits: 3, quick: [10, 28.35, 50, 100, 250, 500],
    metaTitle: '그램 ↔ 온스 변환 - g를 oz로',
    long: '그램과 온스를 서로 바꿉니다. 해외 레시피, 화장품 용량, 우편 요금 계산에서 마주칩니다.',
    note: '1온스는 28.3495g입니다. 액체를 재는 fl oz(액량온스)는 부피 단위라 이것과 다릅니다.',
  },
  {
    slug: 'ton-kg', title: '톤 ↔ 킬로그램', desc: '큰 무게 단위 환산', icon: '🚛',
    category: '무게', from: 't', to: 'kg', factor: 1000, digits: 1, quick: [0.5, 1, 2.5, 5, 11, 25],
    metaTitle: '톤 ↔ 킬로그램 변환 - t를 kg로',
    long: '톤과 킬로그램을 서로 바꿉니다. 화물 적재량, 차량 총중량, 건축 자재 무게에서 씁니다.',
    note: '여기서 톤은 1,000kg인 미터톤입니다. 미국 단위 short ton(907kg)과 영국 long ton(1,016kg)은 다르니 출처를 확인하세요.',
  },
  {
    slug: 'don-g', title: '돈 ↔ 그램', desc: '금·은 무게 단위', icon: '💍',
    category: '무게', from: '돈', to: 'g', factor: 3.75, digits: 2, quick: [0.5, 1, 3.75, 5, 10, 37.5],
    metaTitle: '돈 ↔ 그램 변환 - 금 한 돈은 몇 그램',
    long: '금·은의 무게 단위인 돈을 그램으로 바꿉니다. 금값은 그램 단위로 고시되므로 돈으로 산 금의 시세를 계산하려면 필요합니다.',
    note: '1돈은 3.75g입니다. 돌반지 한 돈이 3.75g, 열 돈이 한 냥(37.5g)입니다. 순금 시세는 보통 3.75g 기준으로 이야기합니다.',
  },
  {
    slug: 'nyang-g', title: '냥 ↔ 그램', desc: '한 냥은 몇 그램인가', icon: '🪙',
    category: '무게', from: '냥', to: 'g', factor: 37.5, digits: 2, quick: [0.5, 1, 2, 5, 10],
    metaTitle: '냥 ↔ 그램 변환 - 한 냥은 몇 그램',
    long: '냥을 그램으로 바꿉니다. 금은방에서 금·은 무게를 말할 때와 한약재 처방에서 아직 쓰이는 단위라, 그램으로 바꿔 봐야 실제 양이 가늠됩니다.',
    note: '1냥은 37.5g으로 열 돈에 해당합니다. 다만 중국·홍콩의 냥(37.8g 안팎)과는 조금 다릅니다.',
  },
  {
    slug: 'geun-g', title: '근 ↔ 그램', desc: '고기 한 근은 몇 그램', icon: '🥩',
    category: '무게', from: '근', to: 'g', factor: 600, digits: 0, quick: [0.5, 1, 2, 3, 5],
    metaTitle: '근 ↔ 그램 변환 - 고기 한 근은 몇 그램',
    long: '근을 그램으로 바꿉니다. 정육점과 시장에서 아직 근으로 파는 곳이 많아 실제 양을 가늠할 때 필요합니다.',
    note: '고기 한 근은 600g이지만 채소·과일 한 근은 375g으로 다릅니다. 같은 "한 근"이라도 품목에 따라 무게가 다르니 확인하세요.',
  },
  {
    slug: 'kwan-kg', title: '관 ↔ 킬로그램', desc: '농수산물 도매 단위', icon: '🐟',
    category: '무게', from: '관', to: 'kg', factor: 3.75, digits: 2, quick: [1, 2, 5, 10, 20],
    metaTitle: '관 ↔ 킬로그램 변환 - 한 관은 몇 kg',
    long: '관을 킬로그램으로 바꿉니다. 수산물·농산물 도매 시장에서 아직 쓰이는 단위입니다.',
    note: '1관은 3.75kg으로 백 돈에 해당합니다. 무게 단위 이름이 돈·냥·근·관으로 이어지며 각각 10배씩 커집니다.',
  },
  {
    slug: 'carat-g', title: '캐럿 ↔ 그램', desc: '보석 무게 단위', icon: '💎',
    category: '무게', from: 'ct', to: 'g', factor: 0.2, digits: 3, quick: [0.3, 0.5, 1, 1.5, 2, 3],
    metaTitle: '캐럿 ↔ 그램 변환 - 다이아 1캐럿은 몇 그램',
    long: '보석의 무게 단위인 캐럿을 그램으로 바꿉니다. 다이아몬드 가격이 캐럿 단위로 매겨지므로 실제 크기를 가늠할 때 씁니다.',
    note: '1캐럿은 정확히 0.2g입니다. 금의 순도를 나타내는 캐럿(K)은 이것과 전혀 다른 단위이니 헷갈리지 마세요.',
  },
  {
    slug: 'stone-kg', title: '스톤 ↔ 킬로그램', desc: '영국식 몸무게 단위', icon: '🇬🇧',
    category: '무게', from: 'st', to: 'kg', factor: 6.35029318, digits: 2, quick: [8, 9, 10, 11, 12, 14],
    metaTitle: '스톤 ↔ 킬로그램 변환 - 영국 몸무게 단위',
    long: '영국에서 몸무게를 말할 때 쓰는 스톤을 킬로그램으로 바꿉니다. 영국 드라마나 기사에서 자주 나옵니다.',
    note: '1스톤은 14파운드, 약 6.35kg입니다. "11스톤"은 약 70kg입니다.',
  },
];

const VOLUME: ConvertTool[] = [
  {
    slug: 'l-gallon', title: '리터 ↔ 갤런', desc: '기름·음료 부피 환산', icon: '⛽',
    category: '부피', from: 'L', to: 'gal', factor: 0.2641720524, digits: 3, quick: [1, 5, 10, 20, 40, 60],
    metaTitle: '리터 ↔ 갤런 변환 - L를 gal로',
    long: '리터와 미국 갤런을 서로 바꿉니다. 해외 주유소 가격, 수입 제품 용량에서 씁니다.',
    note: '미국 갤런은 3.785L, 영국 갤런은 4.546L로 20%나 차이 납니다. 여기서는 미국 갤런 기준입니다.',
  },
  {
    slug: 'ml-floz', title: '밀리리터 ↔ 액량온스', desc: '해외 레시피의 fl oz', icon: '🧴',
    category: '부피', from: 'mL', to: 'fl oz', factor: 0.0338140227, digits: 3, quick: [15, 30, 100, 200, 250, 500],
    metaTitle: '밀리리터 ↔ 액량온스 변환 - ml를 fl oz로',
    long: '밀리리터와 미국 액량온스를 서로 바꿉니다. 해외 화장품·음료 용량과 레시피에 자주 나옵니다.',
    note: '미국 액량온스는 29.57mL입니다. 무게 단위 온스(28.35g)와 이름이 비슷하지만 전혀 다른 단위입니다.',
  },
  {
    slug: 'doe-l', title: '되 ↔ 리터', desc: '곡물을 재던 부피 단위', icon: '🌾',
    category: '부피', from: '되', to: 'L', factor: 1.8039, digits: 3, quick: [1, 2, 5, 10],
    metaTitle: '되 ↔ 리터 변환 - 한 되는 몇 리터',
    long: '되를 리터로 바꿉니다. 쌀·콩·참기름을 되로 파는 곳이 아직 있어 실제 양을 가늠할 때 필요합니다.',
    note: '1되는 약 1.8L입니다. 쌀 한 되는 무게로 약 1.6kg인데, 곡물마다 밀도가 달라 무게는 달라집니다.',
  },
  {
    slug: 'mal-l', title: '말 ↔ 리터', desc: '한 말은 열 되', icon: '🪣',
    category: '부피', from: '말', to: 'L', factor: 18.039, digits: 2, quick: [0.5, 1, 2, 5, 10],
    metaTitle: '말 ↔ 리터 변환 - 한 말은 몇 리터',
    long: '말을 리터로 바꿉니다. 쌀·막걸리·젓갈을 말 단위로 거래하는 곳에서 씁니다.',
    note: '1말은 열 되로 약 18L입니다. 쌀 한 말은 무게로 약 16kg, 흔히 파는 20kg 포대는 한 말 반이 조금 안 됩니다.',
  },
  {
    slug: 'cup-ml', title: '컵 ↔ 밀리리터', desc: '계량컵 단위 환산', icon: '☕',
    category: '부피', from: '컵', to: 'mL', factor: 200, digits: 1, quick: [0.25, 0.5, 1, 1.5, 2, 3],
    metaTitle: '컵 ↔ 밀리리터 변환 - 한 컵은 몇 ml',
    long: '계량컵과 밀리리터를 서로 바꿉니다. 레시피의 "한 컵"이 실제로 얼마인지 확인할 때 씁니다.',
    note: '한국 계량컵은 200mL, 미국은 240mL입니다. 20% 차이라 베이킹에서는 결과가 달라지니 레시피 출처를 확인하세요.',
  },
  {
    slug: 'barrel-l', title: '배럴 ↔ 리터', desc: '원유 거래 단위', icon: '🛢️',
    category: '부피', from: 'bbl', to: 'L', factor: 158.987, digits: 2, quick: [1, 5, 10, 100, 1000],
    metaTitle: '배럴 ↔ 리터 변환 - 원유 1배럴은 몇 리터',
    long: '원유 거래에 쓰는 배럴을 리터로 바꿉니다. 유가 뉴스의 "배럴당 몇 달러"가 실제로 얼마인지 가늠할 수 있습니다.',
    note: '원유 1배럴은 158.987L(42 미국 갤런)입니다. 맥주 배럴 등 다른 배럴은 용량이 달라 섞어 쓰면 안 됩니다.',
  },
  {
    slug: 'cubicm-l', title: '세제곱미터 ↔ 리터', desc: '수도·가스 요금의 ㎥', icon: '🚰',
    category: '부피', from: 'm³', to: 'L', factor: 1000, digits: 1, quick: [0.5, 1, 5, 10, 20, 30],
    metaTitle: '세제곱미터 ↔ 리터 변환 - 1㎥는 몇 리터',
    long: '세제곱미터와 리터를 서로 바꿉니다. 수도·도시가스 요금이 ㎥ 단위로 매겨지므로 실제 사용량을 가늠할 때 씁니다.',
    note: '1㎥는 정확히 1,000L입니다. 4인 가구 한 달 수도 사용량이 대략 20㎥(2만 리터) 안팎입니다.',
  },
];

const AREA: ConvertTool[] = [
  {
    slug: 'pyeong-m2', title: '평 ↔ 제곱미터', desc: '집 넓이를 평으로', icon: '🏠',
    category: '넓이', from: '평', to: 'm²', factor: 3.305785, digits: 2, quick: [10, 18, 24, 25, 32, 34, 45],
    metaTitle: '평 ↔ 제곱미터 변환 - 몇 평인지 계산',
    long: '평과 제곱미터를 서로 바꿉니다. 부동산 표기는 제곱미터인데 사람들은 평으로 이야기하므로 가장 자주 필요한 변환입니다.',
    note: '1평은 약 3.3058㎡입니다. 흔히 말하는 "84㎡ 아파트"가 약 25.4평입니다. 공급면적과 전용면적은 다른 값이니 어느 쪽인지 확인하세요.',
  },
  {
    slug: 'm2-sqft', title: '제곱미터 ↔ 제곱피트', desc: '해외 부동산 넓이', icon: '🌍',
    category: '넓이', from: 'm²', to: 'ft²', factor: 10.7639104, digits: 2, quick: [10, 33, 50, 84, 100, 200],
    metaTitle: '제곱미터 ↔ 제곱피트 변환 - ㎡를 sqft로',
    long: '제곱미터와 제곱피트를 서로 바꿉니다. 해외 부동산 매물과 사무실 임대 면적이 제곱피트로 표기됩니다.',
    note: '1㎡는 약 10.76제곱피트입니다. 미국 원룸 매물의 "500 sqft"는 약 46㎡, 우리 기준 14평 정도입니다.',
  },
  {
    slug: 'acre-m2', title: '에이커 ↔ 제곱미터', desc: '해외 토지 넓이', icon: '🌾',
    category: '넓이', from: 'ac', to: 'm²', factor: 4046.8564, digits: 1, quick: [0.25, 0.5, 1, 2, 5, 10],
    metaTitle: '에이커 ↔ 제곱미터 변환 - 1에이커는 몇 ㎡',
    long: '에이커와 제곱미터를 서로 바꿉니다. 해외 농지·부지 면적이 에이커로 표기됩니다.',
    note: '1에이커는 약 4,047㎡, 우리 단위로 약 1,224평입니다. 축구장 한 면이 대략 1.8에이커입니다.',
  },
  {
    slug: 'hectare-m2', title: '헥타르 ↔ 제곱미터', desc: '산림·농지 면적 단위', icon: '🌲',
    category: '넓이', from: 'ha', to: 'm²', factor: 10000, digits: 1, quick: [0.1, 0.5, 1, 5, 10, 100],
    metaTitle: '헥타르 ↔ 제곱미터 변환 - 1헥타르는 몇 ㎡',
    long: '헥타르와 제곱미터를 서로 바꿉니다. 산불 피해 면적, 농지 규모, 공원 크기가 헥타르로 발표됩니다.',
    note: '1헥타르는 10,000㎡(100m × 100m)로 약 3,025평입니다. 뉴스의 "축구장 몇 개 면적"에서 축구장 하나는 대략 0.7헥타르입니다.',
  },
  {
    slug: 'danbo-m2', title: '단보 ↔ 제곱미터', desc: '논밭 면적 단위', icon: '🌱',
    category: '넓이', from: '단보', to: 'm²', factor: 991.736, digits: 1, quick: [1, 2, 5, 10, 20],
    metaTitle: '단보 ↔ 제곱미터 변환 - 한 단보는 몇 ㎡',
    long: '단보를 제곱미터로 바꿉니다. 농지 거래와 수확량 통계에서 아직 쓰이는 단위입니다.',
    note: '1단보는 300평, 약 991.7㎡입니다. 10단보가 1정보(약 9,917㎡)로 헥타르와 비슷한 크기입니다.',
  },
  {
    slug: 'majigi-pyeong', title: '마지기 ↔ 평', desc: '논 한 마지기는 몇 평', icon: '🚜',
    category: '넓이', from: '마지기', to: '평', factor: 200, digits: 1, quick: [1, 2, 5, 10, 20],
    metaTitle: '마지기 ↔ 평 변환 - 논 한 마지기는 몇 평',
    long: '마지기를 평으로 바꿉니다. 농지를 이야기할 때 여전히 가장 많이 쓰이는 단위입니다.',
    note: '논 한 마지기는 보통 200평이지만 지역에 따라 150~300평으로 다릅니다. 밭 한 마지기는 대개 100평으로 논과 또 다릅니다.',
  },
];

const TEMPERATURE: ConvertTool[] = [
  {
    slug: 'celsius-fahrenheit', title: '섭씨 ↔ 화씨', desc: '온도 단위 환산', icon: '🌡️',
    category: '온도', from: '℃', to: '℉', factor: 1.8, offset: 32, digits: 2, quick: [-10, 0, 20, 25, 36.5, 100, 180],
    metaTitle: '섭씨 ↔ 화씨 변환 - ℃를 ℉로',
    long: '섭씨와 화씨를 서로 바꿉니다. 해외 일기예보, 외국 레시피의 오븐 온도에서 씁니다.',
    note: '화씨 = 섭씨 × 1.8 + 32입니다. 물이 어는 0℃가 32℉, 끓는 100℃가 212℉이고, 체온 36.5℃는 97.7℉입니다.',
  },
  {
    slug: 'celsius-kelvin', title: '섭씨 ↔ 켈빈', desc: '절대온도 환산', icon: '❄️',
    category: '온도', from: '℃', to: 'K', factor: 1, offset: 273.15, digits: 2, quick: [-273.15, -40, 0, 25, 100, 1000],
    metaTitle: '섭씨 ↔ 켈빈 변환 - ℃를 K로',
    long: '섭씨와 켈빈(절대온도)을 서로 바꿉니다. 과학 계산과 조명 색온도에서 씁니다.',
    note: '켈빈은 섭씨에 273.15를 더한 값입니다. 0K은 절대영도(-273.15℃)로 그보다 낮은 온도는 없습니다.',
  },
];

const SPEED: ConvertTool[] = [
  {
    slug: 'kmh-mph', title: 'km/h ↔ mph', desc: '자동차 속도 단위', icon: '🚗',
    category: '속도', from: 'km/h', to: 'mph', factor: 0.6213711922, digits: 2, quick: [30, 50, 60, 80, 100, 110, 120],
    metaTitle: 'km/h ↔ mph 변환 - 시속 단위 환산',
    long: '시속 킬로미터와 시속 마일을 서로 바꿉니다. 해외 도로 제한속도와 수입차 계기판에서 씁니다.',
    note: '미국 고속도로의 65mph는 약 105km/h입니다. 렌터카 계기판이 mph면 제한속도를 넘기기 쉬우니 주의하세요.',
  },
  {
    slug: 'ms-kmh', title: 'm/s ↔ km/h', desc: '초속과 시속', icon: '💨',
    category: '속도', from: 'm/s', to: 'km/h', factor: 3.6, digits: 2, quick: [1, 5, 10, 14, 20, 30],
    metaTitle: 'm/s ↔ km/h 변환 - 초속을 시속으로',
    long: '초속과 시속을 서로 바꿉니다. 기상청 풍속은 초속으로 발표되므로 체감을 가늠하려면 시속으로 바꿔 보는 편이 낫습니다.',
    note: '초속에 3.6을 곱하면 시속입니다. 태풍 기준인 초속 17m는 시속 61km, 초속 30m는 시속 108km로 지붕이 날아가는 수준입니다.',
  },
  {
    slug: 'knot-kmh', title: '노트 ↔ km/h', desc: '배·비행기 속도', icon: '🛥️',
    category: '속도', from: 'kn', to: 'km/h', factor: 1.852, digits: 2, quick: [1, 10, 20, 50, 100, 500],
    metaTitle: '노트 ↔ km/h 변환 - 해상 속도 환산',
    long: '노트와 시속 킬로미터를 서로 바꿉니다. 배와 비행기의 속도, 기상 예보의 풍속에서 씁니다.',
    note: '1노트는 시속 1.852km(한 시간에 1해리)입니다. 여객기 순항 속도는 대략 470노트로 시속 870km 정도입니다.',
  },
  {
    slug: 'mach-kmh', title: '마하 ↔ km/h', desc: '음속의 몇 배인가', icon: '✈️',
    category: '속도', from: 'Mach', to: 'km/h', factor: 1225, digits: 1, quick: [0.8, 1, 1.5, 2, 3, 5],
    metaTitle: '마하 ↔ km/h 변환 - 마하 1은 시속 몇 km',
    long: '마하와 시속 킬로미터를 서로 바꿉니다. 전투기 속도와 초음속 이야기를 실제 속도로 가늠할 수 있습니다.',
    note: '마하 1은 해수면 15℃에서 시속 약 1,225km입니다. 음속은 공기 온도에 따라 달라져서 고도가 높으면 마하 1의 실제 속도도 느려집니다.',
  },
];

const DATA: ConvertTool[] = [
  {
    slug: 'mb-gb', title: 'MB ↔ GB', desc: '파일 용량 단위', icon: '💾',
    category: '데이터', from: 'MB', to: 'GB', factor: 1 / 1024, digits: 4, quick: [100, 512, 1024, 2048, 5000, 10240],
    metaTitle: 'MB ↔ GB 변환 - 메가바이트를 기가바이트로',
    long: '메가바이트와 기가바이트를 서로 바꿉니다. 파일 용량, 데이터 사용량, 저장공간을 비교할 때 씁니다.',
    note: '여기서는 1GB = 1,024MB(2진법) 기준입니다. 저장장치 제조사는 1GB를 1,000MB로 계산해 표기하므로, 1TB SSD가 컴퓨터에서 931GB로 보이는 것이 이 차이 때문입니다.',
  },
  {
    slug: 'gb-tb', title: 'GB ↔ TB', desc: '저장장치 용량 단위', icon: '🗄️',
    category: '데이터', from: 'GB', to: 'TB', factor: 1 / 1024, digits: 4, quick: [256, 512, 1024, 2048, 4096],
    metaTitle: 'GB ↔ TB 변환 - 기가바이트를 테라바이트로',
    long: '기가바이트와 테라바이트를 서로 바꿉니다. 하드디스크·SSD·클라우드 용량을 비교할 때 씁니다.',
    note: '1TB = 1,024GB(2진법) 기준입니다. 제조사 표기(1TB = 1,000GB)와 달라 실제 용량이 적어 보이는 것은 정상입니다.',
  },
  {
    slug: 'mbps-mbs', title: 'Mbps ↔ MB/s', desc: '인터넷 속도의 실제 다운로드 속도', icon: '📶',
    category: '데이터', from: 'Mbps', to: 'MB/s', factor: 0.125, digits: 3, quick: [10, 100, 200, 500, 1000],
    metaTitle: 'Mbps ↔ MB/s 변환 - 인터넷 속도 실제 다운로드',
    long: '통신사가 광고하는 Mbps를 실제 파일 다운로드 속도(MB/s)로 바꿉니다. 두 값이 8배 차이 나서 "속도가 느리다"는 오해가 자주 생깁니다.',
    note: '소문자 b는 비트, 대문자 B는 바이트이고 1바이트는 8비트입니다. 100Mbps 회선의 최대 다운로드 속도는 12.5MB/s입니다.',
  },
  {
    slug: 'kb-mb', title: 'KB ↔ MB', desc: '작은 파일 용량 단위', icon: '📄',
    category: '데이터', from: 'KB', to: 'MB', factor: 1 / 1024, digits: 4, quick: [100, 500, 1024, 2048, 5120],
    metaTitle: 'KB ↔ MB 변환 - 킬로바이트를 메가바이트로',
    long: '킬로바이트와 메가바이트를 서로 바꿉니다. 첨부파일 용량 제한을 확인할 때 자주 필요합니다.',
    note: '1MB = 1,024KB 기준입니다. 이메일 첨부 제한이 흔히 25MB인데, 이는 25,600KB입니다.',
  },
  {
    slug: 'byte-bit', title: '바이트 ↔ 비트', desc: '가장 작은 데이터 단위', icon: '🔢',
    category: '데이터', from: 'B', to: 'bit', factor: 8, digits: 1, quick: [1, 8, 64, 128, 1024],
    metaTitle: '바이트 ↔ 비트 변환 - 1바이트는 몇 비트',
    long: '바이트와 비트를 서로 바꿉니다. 통신 속도는 비트, 파일 크기는 바이트로 재기 때문에 둘을 오갈 일이 많습니다.',
    note: '1바이트는 8비트입니다. 영문 한 글자가 1바이트, 한글 한 글자는 UTF-8에서 3바이트를 차지합니다.',
  },
];

const ENERGY: ConvertTool[] = [
  {
    slug: 'kcal-kj', title: '칼로리 ↔ 킬로줄', desc: '식품 열량 단위', icon: '🍎',
    category: '에너지', from: 'kcal', to: 'kJ', factor: 4.184, digits: 2, quick: [100, 300, 500, 1000, 2000, 2500],
    metaTitle: '칼로리 ↔ 킬로줄 변환 - kcal을 kJ로',
    long: '킬로칼로리와 킬로줄을 서로 바꿉니다. 유럽·호주 식품 포장은 킬로줄로 표기돼 있어 우리 기준으로 바꿔 봐야 합니다.',
    note: '1kcal은 4.184kJ입니다. 성인 하루 권장 섭취량 2,000kcal은 약 8,368kJ입니다. 식품 포장의 "칼로리"는 사실 킬로칼로리를 뜻합니다.',
  },
  {
    slug: 'kw-hp', title: '킬로와트 ↔ 마력', desc: '자동차 출력 단위', icon: '🏎️',
    category: '에너지', from: 'kW', to: 'PS', factor: 1.359621617, digits: 2, quick: [50, 100, 150, 200, 300, 500],
    metaTitle: '킬로와트 ↔ 마력 변환 - kW를 마력으로',
    long: '킬로와트와 마력을 서로 바꿉니다. 전기차는 kW, 내연기관차는 마력으로 출력을 표기해 서로 비교하려면 필요합니다.',
    note: '여기서는 유럽식 마력(PS) 기준으로 1kW = 1.36PS입니다. 영국식 마력(HP)은 1kW = 1.341HP로 조금 다릅니다.',
  },
  {
    slug: 'kwh-mj', title: '킬로와트시 ↔ 메가줄', desc: '전력량 단위', icon: '🔌',
    category: '에너지', from: 'kWh', to: 'MJ', factor: 3.6, digits: 2, quick: [1, 10, 100, 200, 300, 500],
    metaTitle: '킬로와트시 ↔ 메가줄 변환 - kWh를 MJ로',
    long: '킬로와트시와 메가줄을 서로 바꿉니다. 전기요금 고지서의 kWh를 다른 에너지원과 비교할 때 씁니다.',
    note: '1kWh는 3.6MJ입니다. 4인 가구 월 전기 사용량이 대략 300kWh로 1,080MJ에 해당합니다.',
  },
  {
    slug: 'joule-cal', title: '줄 ↔ 칼로리', desc: '기본 에너지 단위', icon: '⚡',
    category: '에너지', from: 'J', to: 'cal', factor: 0.2390057361, digits: 3, quick: [100, 1000, 4184, 10000],
    metaTitle: '줄 ↔ 칼로리 변환 - J를 cal로',
    long: '줄과 칼로리를 서로 바꿉니다. 물리 계산과 영양 표기 사이를 오갈 때 씁니다.',
    note: '1칼로리는 4.184줄로, 물 1g을 1℃ 올리는 데 드는 열량입니다. 식품의 "1칼로리"는 이것의 1,000배인 킬로칼로리입니다.',
  },
];

const PRESSURE: ConvertTool[] = [
  {
    slug: 'bar-psi', title: 'bar ↔ psi', desc: '타이어 공기압 단위', icon: '🛞',
    category: '압력·기타', from: 'bar', to: 'psi', factor: 14.503773773, digits: 2, quick: [1, 2, 2.2, 2.5, 3, 8],
    metaTitle: 'bar ↔ psi 변환 - 타이어 공기압 환산',
    long: 'bar와 psi를 서로 바꿉니다. 타이어 공기압은 나라와 제조사에 따라 두 단위가 섞여 쓰입니다.',
    note: '승용차 적정 공기압은 보통 2.2~2.5bar(32~36psi)입니다. 운전석 문 안쪽 스티커에 적힌 값이 기준입니다.',
  },
  {
    slug: 'hpa-mmhg', title: 'hPa ↔ mmHg', desc: '기압 단위 환산', icon: '🌪️',
    category: '압력·기타', from: 'hPa', to: 'mmHg', factor: 0.7500616827, digits: 2, quick: [950, 980, 1000, 1013, 1030],
    metaTitle: 'hPa ↔ mmHg 변환 - 기압 단위 환산',
    long: '헥토파스칼과 수은주밀리미터를 서로 바꿉니다. 일기예보는 hPa, 혈압계는 mmHg를 써서 두 단위를 다 보게 됩니다.',
    note: '표준 대기압은 1,013hPa(760mmHg)입니다. 태풍 중심기압이 950hPa 아래로 내려가면 매우 강한 태풍입니다.',
  },
  {
    slug: 'mpg-kmpl', title: 'mpg ↔ km/L', desc: '연비 단위 환산', icon: '🚙',
    category: '압력·기타', from: 'mpg', to: 'km/L', factor: 0.4251437075, digits: 2, quick: [20, 25, 30, 35, 40, 50],
    metaTitle: 'mpg ↔ km/L 변환 - 미국 연비를 km/L로',
    long: '미국식 연비(mpg)와 우리 기준 연비(km/L)를 서로 바꿉니다. 해외 자동차 리뷰의 연비를 비교할 때 씁니다.',
    note: '미국 갤런 기준입니다. 30mpg는 약 12.8km/L입니다. 영국 갤런 기준 mpg는 값이 20%쯤 크게 나오니 출처를 확인하세요.',
  },
];

export const CONVERT_TOOLS: ConvertTool[] = [
  ...LENGTH, ...WEIGHT, ...VOLUME, ...AREA, ...TEMPERATURE, ...SPEED, ...DATA, ...ENERGY, ...PRESSURE,
  ...CONVERT_TOOLS2,
  ...CONVERT_TOOLS3,
  ...CONVERT_TOOLS4,
];

export const CONVERT_MAP: Record<string, ConvertTool> = Object.fromEntries(
  CONVERT_TOOLS.map(t => [t.slug, t]),
);

export const CONVERT_CATEGORIES = ['길이', '무게', '부피', '넓이', '온도', '속도', '데이터', '에너지', '압력·기타', ...CONVERT_CATEGORIES2];

/** from → to */
export function convert(value: number, tool: ConvertTool): number {
  if (tool.reciprocal) return value === 0 ? 0 : tool.factor / value;
  return value * tool.factor + (tool.offset ?? 0);
}

/** to → from (역방향) */
export function convertBack(value: number, tool: ConvertTool): number {
  // 반비례는 자기 자신이 역변환이다
  if (tool.reciprocal) return value === 0 ? 0 : tool.factor / value;
  return (value - (tool.offset ?? 0)) / tool.factor;
}

/**
 * 자릿수를 맞춰 문자열로. 소수점 뒤의 꼬리 0만 지운다 —
 * 정수부의 0까지 지우면 600g이 6g이 된다(실제로 그렇게 만들었다가 잡았다).
 */
export function format(value: number, digits: number): string {
  if (!Number.isFinite(value)) return '—';
  const fixed = value.toFixed(digits);
  if (!fixed.includes('.')) return fixed;
  return fixed.replace(/\.?0+$/, '') || '0';
}

export function findConvertTool(slug: string): ConvertTool | undefined {
  return CONVERT_MAP[slug];
}

/** 같은 분류를 먼저, 그다음 나머지에서 채운다. */
export function relatedConvertTools(slug: string, limit = 6): ConvertTool[] {
  const current = CONVERT_MAP[slug];
  if (!current) return [];
  // 갈래 안의 자리부터 돌려 고른다 — 앞 여섯만 뽑으면 목록 뒤쪽은 들어오는 링크가 0이 된다
  return relatedFor(CONVERT_TOOLS, current, t => t.category === current.category, limit);
}
