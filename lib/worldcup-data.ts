/**
 * 이상형 월드컵(토너먼트) 데이터.
 *
 * 한국 웹에서 가장 바이럴한 포맷 중 하나 — 둘 중 하나 고르기를 반복해
 * 16강 → 8강 → 준결승 → 결승 → 우승을 가린다. 공유·재플레이율이 높다.
 *
 * 이미지 대신 이모지를 써서 정적 배포(외부 리소스 0)와도 잘 맞는다.
 * 규칙: items 길이는 반드시 2의 거듭제곱(여기선 전부 16). 이름은 월드컵 안에서 유일.
 */
export interface WorldcupItem {
  name: string;
  emoji: string;
}

export interface Worldcup {
  slug: string;
  title: string;
  desc: string;
  icon: string;
  category: string;
  items: WorldcupItem[];
}

const WORLDCUPS: Worldcup[] = [
  {
    slug: 'food',
    title: '전국민 음식 월드컵',
    desc: '치킨부터 삼겹살까지 — 최애 음식은 결국 하나',
    icon: '🍚',
    category: '음식',
    items: [
      { name: '후라이드 치킨', emoji: '🍗' }, { name: '삼겹살', emoji: '🥓' },
      { name: '떡볶이', emoji: '🌶️' }, { name: '김치찌개', emoji: '🍲' },
      { name: '피자', emoji: '🍕' }, { name: '초밥', emoji: '🍣' },
      { name: '냉면', emoji: '🍜' }, { name: '곱창', emoji: '🔥' },
      { name: '순대국밥', emoji: '🍚' }, { name: '햄버거', emoji: '🍔' },
      { name: '마라탕', emoji: '🥘' }, { name: '보쌈', emoji: '🥬' },
      { name: '돈까스', emoji: '🍤' }, { name: '갈비', emoji: '🍖' },
      { name: '비빔밥', emoji: '🥗' }, { name: '짜장면', emoji: '🍝' },
    ],
  },
  {
    slug: 'chicken',
    title: '치킨 월드컵',
    desc: '오늘 밤 시킬 단 하나의 치킨을 골라라',
    icon: '🍗',
    category: '음식',
    items: [
      { name: '후라이드', emoji: '🍗' }, { name: '양념치킨', emoji: '🌶️' },
      { name: '간장치킨', emoji: '🟤' }, { name: '반반', emoji: '☯️' },
      { name: '마늘치킨', emoji: '🧄' }, { name: '허니버터', emoji: '🍯' },
      { name: '뿌링클', emoji: '🧀' }, { name: '파닭', emoji: '🥬' },
      { name: '치즈볼', emoji: '🧀' }, { name: '순살치킨', emoji: '🍤' },
      { name: '불닭', emoji: '🔥' }, { name: '치밥', emoji: '🍚' },
      { name: '레몬치킨', emoji: '🍋' }, { name: '깐풍기', emoji: '🥢' },
      { name: '똥집튀김', emoji: '🍢' }, { name: '닭강정', emoji: '🍬' },
    ],
  },
  {
    slug: 'ramen',
    title: '라면 월드컵',
    desc: '무인도에 딱 하나만 가져간다면?',
    icon: '🍜',
    category: '음식',
    items: [
      { name: '신라면', emoji: '🌶️' }, { name: '진라면', emoji: '🍜' },
      { name: '너구리', emoji: '🦝' }, { name: '짜파게티', emoji: '🖤' },
      { name: '불닭볶음면', emoji: '🔥' }, { name: '안성탕면', emoji: '🥘' },
      { name: '삼양라면', emoji: '🟠' }, { name: '열라면', emoji: '♨️' },
      { name: '틈새라면', emoji: '😈' }, { name: '팔도비빔면', emoji: '🥬' },
      { name: '사리곰탕면', emoji: '🍲' }, { name: '오징어짬뽕', emoji: '🦑' },
      { name: '컵누들', emoji: '🥤' }, { name: '왕뚜껑', emoji: '🎩' },
      { name: '육개장', emoji: '🌶️' }, { name: '치즈라면', emoji: '🧀' },
    ],
  },
  {
    slug: 'snack',
    title: '편의점 간식 월드컵',
    desc: '편의점 털 때 손이 먼저 가는 그것',
    icon: '🍫',
    category: '음식',
    items: [
      { name: '허니버터칩', emoji: '🍯' }, { name: '포카칩', emoji: '🥔' },
      { name: '꼬북칩', emoji: '🐢' }, { name: '홈런볼', emoji: '⚾' },
      { name: '초코파이', emoji: '🥧' }, { name: '빼빼로', emoji: '🥢' },
      { name: '오예스', emoji: '🍫' }, { name: '새우깡', emoji: '🍤' },
      { name: '카스타드', emoji: '🍮' }, { name: '몽쉘', emoji: '🎂' },
      { name: '자갈치', emoji: '🐟' }, { name: '콘칩', emoji: '🌽' },
      { name: '죠리퐁', emoji: '🌾' }, { name: '스윙칩', emoji: '💃' },
      { name: '초코송이', emoji: '🍄' }, { name: '오징어땅콩', emoji: '🥜' },
    ],
  },
  {
    slug: 'late-night',
    title: '야식 월드컵',
    desc: '자정의 유혹, 이길 수 없는 단 하나',
    icon: '🌙',
    category: '음식',
    items: [
      { name: '치킨', emoji: '🍗' }, { name: '족발', emoji: '🐷' },
      { name: '떡볶이', emoji: '🌶️' }, { name: '라면', emoji: '🍜' },
      { name: '피자', emoji: '🍕' }, { name: '곱창', emoji: '🔥' },
      { name: '보쌈', emoji: '🥬' }, { name: '마라탕', emoji: '🥘' },
      { name: '순대', emoji: '🌭' }, { name: '닭발', emoji: '🐔' },
      { name: '햄버거', emoji: '🍔' }, { name: '만두', emoji: '🥟' },
      { name: '김밥', emoji: '🍙' }, { name: '군만두', emoji: '🥠' },
      { name: '컵라면', emoji: '🥤' }, { name: '치즈볼', emoji: '🧀' },
    ],
  },
  {
    slug: 'dessert',
    title: '디저트 월드컵',
    desc: '배불러도 들어가는 디저트 배는 따로 있다',
    icon: '🍰',
    category: '음식',
    items: [
      { name: '티라미수', emoji: '🍰' }, { name: '마카롱', emoji: '🌈' },
      { name: '크로플', emoji: '🧇' }, { name: '붕어빵', emoji: '🐟' },
      { name: '팥빙수', emoji: '🍧' }, { name: '아이스크림', emoji: '🍦' },
      { name: '도넛', emoji: '🍩' }, { name: '와플', emoji: '🧇' },
      { name: '츄러스', emoji: '🥖' }, { name: '치즈케이크', emoji: '🧀' },
      { name: '탕후루', emoji: '🍬' }, { name: '푸딩', emoji: '🍮' },
      { name: '호떡', emoji: '🥞' }, { name: '초콜릿', emoji: '🍫' },
      { name: '약과', emoji: '🍪' }, { name: '젤리', emoji: '🍬' },
    ],
  },
  {
    slug: 'drink',
    title: '카페 음료 월드컵',
    desc: '카페 가면 늘 시키는 인생 음료 찾기',
    icon: '☕',
    category: '음식',
    items: [
      { name: '아메리카노', emoji: '☕' }, { name: '카페라떼', emoji: '🥛' },
      { name: '바닐라라떼', emoji: '🍦' }, { name: '카푸치노', emoji: '☕' },
      { name: '아이스티', emoji: '🧊' }, { name: '자몽에이드', emoji: '🍊' },
      { name: '녹차라떼', emoji: '🍵' }, { name: '초코라떼', emoji: '🍫' },
      { name: '딸기라떼', emoji: '🍓' }, { name: '카라멜마끼아또', emoji: '🍯' },
      { name: '아인슈페너', emoji: '🌪️' }, { name: '레몬에이드', emoji: '🍋' },
      { name: '흑당버블티', emoji: '🧋' }, { name: '핫초코', emoji: '🍫' },
      { name: '망고스무디', emoji: '🥭' }, { name: '콜드브루', emoji: '🧊' },
    ],
  },
  {
    slug: 'travel',
    title: '국내 여행지 월드컵',
    desc: '다음 휴가, 딱 한 곳만 간다면?',
    icon: '🏝️',
    category: '여행',
    items: [
      { name: '제주도', emoji: '🍊' }, { name: '부산', emoji: '🌊' },
      { name: '강릉', emoji: '☕' }, { name: '경주', emoji: '🏯' },
      { name: '전주', emoji: '🍲' }, { name: '여수', emoji: '🌉' },
      { name: '속초', emoji: '🐟' }, { name: '가평', emoji: '🏕️' },
      { name: '통영', emoji: '⛴️' }, { name: '남해', emoji: '🌅' },
      { name: '안동', emoji: '🎭' }, { name: '춘천', emoji: '🚵' },
      { name: '거제', emoji: '🏖️' }, { name: '태안', emoji: '🏜️' },
      { name: '울릉도', emoji: '🗻' }, { name: '서울', emoji: '🏙️' },
    ],
  },
];

export default WORLDCUPS;
export { WORLDCUPS };
export const WORLDCUPS_MAP: Record<string, Worldcup> = Object.fromEntries(
  WORLDCUPS.map(w => [w.slug, w]),
);
