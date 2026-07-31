/**
 * 세계 시계·시차 계산에 쓰는 도시 목록.
 *
 * 시차를 숫자로 저장하지 않고 IANA 시간대 이름(Asia/Seoul)만 둔다. 서머타임은
 * 나라마다 시작·종료일이 다르고 해마다 바뀌는데, 브라우저의 Intl이 그 규칙을
 * 이미 알고 있다. 직접 +9 같은 숫자를 적으면 3월과 11월에 반드시 틀린다.
 */
// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import type { AnyLocale } from './locales.ts';

export interface City {
  id: string;
  city: string;
  country: string;
  zone: string;
  flag: string;
}

export const CITIES: City[] = [
  { id: 'seoul', city: '서울', country: '대한민국', zone: 'Asia/Seoul', flag: '🇰🇷' },
  { id: 'tokyo', city: '도쿄', country: '일본', zone: 'Asia/Tokyo', flag: '🇯🇵' },
  { id: 'beijing', city: '베이징', country: '중국', zone: 'Asia/Shanghai', flag: '🇨🇳' },
  { id: 'hongkong', city: '홍콩', country: '홍콩', zone: 'Asia/Hong_Kong', flag: '🇭🇰' },
  { id: 'singapore', city: '싱가포르', country: '싱가포르', zone: 'Asia/Singapore', flag: '🇸🇬' },
  { id: 'bangkok', city: '방콕', country: '태국', zone: 'Asia/Bangkok', flag: '🇹🇭' },
  { id: 'hanoi', city: '하노이', country: '베트남', zone: 'Asia/Ho_Chi_Minh', flag: '🇻🇳' },
  { id: 'delhi', city: '뉴델리', country: '인도', zone: 'Asia/Kolkata', flag: '🇮🇳' },
  { id: 'dubai', city: '두바이', country: 'UAE', zone: 'Asia/Dubai', flag: '🇦🇪' },
  { id: 'moscow', city: '모스크바', country: '러시아', zone: 'Europe/Moscow', flag: '🇷🇺' },
  { id: 'london', city: '런던', country: '영국', zone: 'Europe/London', flag: '🇬🇧' },
  { id: 'paris', city: '파리', country: '프랑스', zone: 'Europe/Paris', flag: '🇫🇷' },
  { id: 'berlin', city: '베를린', country: '독일', zone: 'Europe/Berlin', flag: '🇩🇪' },
  { id: 'newyork', city: '뉴욕', country: '미국', zone: 'America/New_York', flag: '🇺🇸' },
  { id: 'chicago', city: '시카고', country: '미국', zone: 'America/Chicago', flag: '🇺🇸' },
  { id: 'losangeles', city: 'LA', country: '미국', zone: 'America/Los_Angeles', flag: '🇺🇸' },
  { id: 'saopaulo', city: '상파울루', country: '브라질', zone: 'America/Sao_Paulo', flag: '🇧🇷' },
  { id: 'sydney', city: '시드니', country: '호주', zone: 'Australia/Sydney', flag: '🇦🇺' },
  { id: 'auckland', city: '오클랜드', country: '뉴질랜드', zone: 'Pacific/Auckland', flag: '🇳🇿' },
];

export const DEFAULT_CITY_IDS = ['seoul', 'newyork', 'london', 'tokyo', 'losangeles'];

/**
 * 세계 시계가 쓰는 언어 — AnyLocale에 중국어 둘을 더한다.
 * 공용 IntlLocale을 넓히지 않는 이유는 lib/food-intl.ts에 적어 두었다.
 */
export type CityLang = AnyLocale | 'zh-hans' | 'zh-hant';

/**
 * 도시·국가 이름의 언어별 표기. id·zone·flag는 열 언어가 공유하므로 여기엔 이름만 둔다.
 * 표기가 없는 id는 한국어를 그대로 쓴다 — 도시를 추가해도 화면이 깨지지 않는다.
 */
const CITY_NAMES: Record<Exclude<CityLang, 'ko'>, Record<string, { city: string; country: string }>> = {
  en: {
    seoul: { city: 'Seoul', country: 'South Korea' },
    tokyo: { city: 'Tokyo', country: 'Japan' },
    beijing: { city: 'Beijing', country: 'China' },
    hongkong: { city: 'Hong Kong', country: 'Hong Kong' },
    singapore: { city: 'Singapore', country: 'Singapore' },
    bangkok: { city: 'Bangkok', country: 'Thailand' },
    hanoi: { city: 'Hanoi', country: 'Vietnam' },
    delhi: { city: 'New Delhi', country: 'India' },
    dubai: { city: 'Dubai', country: 'UAE' },
    moscow: { city: 'Moscow', country: 'Russia' },
    london: { city: 'London', country: 'United Kingdom' },
    paris: { city: 'Paris', country: 'France' },
    berlin: { city: 'Berlin', country: 'Germany' },
    newyork: { city: 'New York', country: 'United States' },
    chicago: { city: 'Chicago', country: 'United States' },
    losangeles: { city: 'Los Angeles', country: 'United States' },
    saopaulo: { city: 'São Paulo', country: 'Brazil' },
    sydney: { city: 'Sydney', country: 'Australia' },
    auckland: { city: 'Auckland', country: 'New Zealand' },
  },
  es: {
    seoul: { city: 'Seúl', country: 'Corea del Sur' },
    tokyo: { city: 'Tokio', country: 'Japón' },
    beijing: { city: 'Pekín', country: 'China' },
    hongkong: { city: 'Hong Kong', country: 'Hong Kong' },
    singapore: { city: 'Singapur', country: 'Singapur' },
    bangkok: { city: 'Bangkok', country: 'Tailandia' },
    hanoi: { city: 'Hanói', country: 'Vietnam' },
    delhi: { city: 'Nueva Delhi', country: 'India' },
    dubai: { city: 'Dubái', country: 'EAU' },
    moscow: { city: 'Moscú', country: 'Rusia' },
    london: { city: 'Londres', country: 'Reino Unido' },
    paris: { city: 'París', country: 'Francia' },
    berlin: { city: 'Berlín', country: 'Alemania' },
    newyork: { city: 'Nueva York', country: 'Estados Unidos' },
    chicago: { city: 'Chicago', country: 'Estados Unidos' },
    losangeles: { city: 'Los Ángeles', country: 'Estados Unidos' },
    saopaulo: { city: 'São Paulo', country: 'Brasil' },
    sydney: { city: 'Sídney', country: 'Australia' },
    auckland: { city: 'Auckland', country: 'Nueva Zelanda' },
  },
  'pt-br': {
    seoul: { city: 'Seul', country: 'Coreia do Sul' },
    tokyo: { city: 'Tóquio', country: 'Japão' },
    beijing: { city: 'Pequim', country: 'China' },
    hongkong: { city: 'Hong Kong', country: 'Hong Kong' },
    singapore: { city: 'Singapura', country: 'Singapura' },
    bangkok: { city: 'Bangkok', country: 'Tailândia' },
    hanoi: { city: 'Hanói', country: 'Vietnã' },
    delhi: { city: 'Nova Délhi', country: 'Índia' },
    dubai: { city: 'Dubai', country: 'Emirados Árabes' },
    moscow: { city: 'Moscou', country: 'Rússia' },
    london: { city: 'Londres', country: 'Reino Unido' },
    paris: { city: 'Paris', country: 'França' },
    berlin: { city: 'Berlim', country: 'Alemanha' },
    newyork: { city: 'Nova York', country: 'Estados Unidos' },
    chicago: { city: 'Chicago', country: 'Estados Unidos' },
    losangeles: { city: 'Los Angeles', country: 'Estados Unidos' },
    saopaulo: { city: 'São Paulo', country: 'Brasil' },
    sydney: { city: 'Sydney', country: 'Austrália' },
    auckland: { city: 'Auckland', country: 'Nova Zelândia' },
  },
  ja: {
    seoul: { city: 'ソウル', country: '韓国' },
    tokyo: { city: '東京', country: '日本' },
    beijing: { city: '北京', country: '中国' },
    hongkong: { city: '香港', country: '香港' },
    singapore: { city: 'シンガポール', country: 'シンガポール' },
    bangkok: { city: 'バンコク', country: 'タイ' },
    hanoi: { city: 'ハノイ', country: 'ベトナム' },
    delhi: { city: 'ニューデリー', country: 'インド' },
    dubai: { city: 'ドバイ', country: 'UAE' },
    moscow: { city: 'モスクワ', country: 'ロシア' },
    london: { city: 'ロンドン', country: 'イギリス' },
    paris: { city: 'パリ', country: 'フランス' },
    berlin: { city: 'ベルリン', country: 'ドイツ' },
    newyork: { city: 'ニューヨーク', country: 'アメリカ' },
    chicago: { city: 'シカゴ', country: 'アメリカ' },
    losangeles: { city: 'ロサンゼルス', country: 'アメリカ' },
    saopaulo: { city: 'サンパウロ', country: 'ブラジル' },
    sydney: { city: 'シドニー', country: 'オーストラリア' },
    auckland: { city: 'オークランド', country: 'ニュージーランド' },
  },
  de: {
    seoul: { city: 'Seoul', country: 'Südkorea' },
    tokyo: { city: 'Tokio', country: 'Japan' },
    beijing: { city: 'Peking', country: 'China' },
    hongkong: { city: 'Hongkong', country: 'Hongkong' },
    singapore: { city: 'Singapur', country: 'Singapur' },
    bangkok: { city: 'Bangkok', country: 'Thailand' },
    hanoi: { city: 'Hanoi', country: 'Vietnam' },
    delhi: { city: 'Neu-Delhi', country: 'Indien' },
    dubai: { city: 'Dubai', country: 'VAE' },
    moscow: { city: 'Moskau', country: 'Russland' },
    london: { city: 'London', country: 'Vereinigtes Königreich' },
    paris: { city: 'Paris', country: 'Frankreich' },
    berlin: { city: 'Berlin', country: 'Deutschland' },
    newyork: { city: 'New York', country: 'Vereinigte Staaten' },
    chicago: { city: 'Chicago', country: 'Vereinigte Staaten' },
    losangeles: { city: 'Los Angeles', country: 'Vereinigte Staaten' },
    saopaulo: { city: 'São Paulo', country: 'Brasilien' },
    sydney: { city: 'Sydney', country: 'Australien' },
    auckland: { city: 'Auckland', country: 'Neuseeland' },
  },
  fr: {
    seoul: { city: 'Séoul', country: 'Corée du Sud' },
    tokyo: { city: 'Tokyo', country: 'Japon' },
    beijing: { city: 'Pékin', country: 'Chine' },
    hongkong: { city: 'Hong Kong', country: 'Hong Kong' },
    singapore: { city: 'Singapour', country: 'Singapour' },
    bangkok: { city: 'Bangkok', country: 'Thaïlande' },
    hanoi: { city: 'Hanoï', country: 'Vietnam' },
    delhi: { city: 'New Delhi', country: 'Inde' },
    dubai: { city: 'Dubaï', country: 'Émirats arabes unis' },
    moscow: { city: 'Moscou', country: 'Russie' },
    london: { city: 'Londres', country: 'Royaume-Uni' },
    paris: { city: 'Paris', country: 'France' },
    berlin: { city: 'Berlin', country: 'Allemagne' },
    newyork: { city: 'New York', country: 'États-Unis' },
    chicago: { city: 'Chicago', country: 'États-Unis' },
    losangeles: { city: 'Los Angeles', country: 'États-Unis' },
    saopaulo: { city: 'São Paulo', country: 'Brésil' },
    sydney: { city: 'Sydney', country: 'Australie' },
    auckland: { city: 'Auckland', country: 'Nouvelle-Zélande' },
  },
  hi: {
    seoul: { city: 'सियोल', country: 'दक्षिण कोरिया' },
    tokyo: { city: 'टोक्यो', country: 'जापान' },
    beijing: { city: 'बीजिंग', country: 'चीन' },
    hongkong: { city: 'हांगकांग', country: 'हांगकांग' },
    singapore: { city: 'सिंगापुर', country: 'सिंगापुर' },
    bangkok: { city: 'बैंकॉक', country: 'थाईलैंड' },
    hanoi: { city: 'हनोई', country: 'वियतनाम' },
    delhi: { city: 'नई दिल्ली', country: 'भारत' },
    dubai: { city: 'दुबई', country: 'यूएई' },
    moscow: { city: 'मॉस्को', country: 'रूस' },
    london: { city: 'लंदन', country: 'यूनाइटेड किंगडम' },
    paris: { city: 'पेरिस', country: 'फ़्रांस' },
    berlin: { city: 'बर्लिन', country: 'जर्मनी' },
    newyork: { city: 'न्यूयॉर्क', country: 'संयुक्त राज्य अमेरिका' },
    chicago: { city: 'शिकागो', country: 'संयुक्त राज्य अमेरिका' },
    losangeles: { city: 'लॉस एंजेलिस', country: 'संयुक्त राज्य अमेरिका' },
    saopaulo: { city: 'साओ पाउलो', country: 'ब्राज़ील' },
    sydney: { city: 'सिडनी', country: 'ऑस्ट्रेलिया' },
    auckland: { city: 'ऑकलैंड', country: 'न्यूज़ीलैंड' },
  },
  'zh-hans': {
    seoul: { city: '首尔', country: '韩国' },
    tokyo: { city: '东京', country: '日本' },
    beijing: { city: '北京', country: '中国' },
    hongkong: { city: '香港', country: '中国香港' },
    singapore: { city: '新加坡', country: '新加坡' },
    bangkok: { city: '曼谷', country: '泰国' },
    hanoi: { city: '河内', country: '越南' },
    delhi: { city: '新德里', country: '印度' },
    dubai: { city: '迪拜', country: '阿联酋' },
    moscow: { city: '莫斯科', country: '俄罗斯' },
    london: { city: '伦敦', country: '英国' },
    paris: { city: '巴黎', country: '法国' },
    berlin: { city: '柏林', country: '德国' },
    newyork: { city: '纽约', country: '美国' },
    chicago: { city: '芝加哥', country: '美国' },
    losangeles: { city: '洛杉矶', country: '美国' },
    saopaulo: { city: '圣保罗', country: '巴西' },
    sydney: { city: '悉尼', country: '澳大利亚' },
    auckland: { city: '奥克兰', country: '新西兰' },
  },
  'zh-hant': {
    seoul: { city: '首爾', country: '韓國' },
    tokyo: { city: '東京', country: '日本' },
    beijing: { city: '北京', country: '中國' },
    hongkong: { city: '香港', country: '中國香港' },
    singapore: { city: '新加坡', country: '新加坡' },
    bangkok: { city: '曼谷', country: '泰國' },
    hanoi: { city: '河內', country: '越南' },
    delhi: { city: '新德里', country: '印度' },
    dubai: { city: '杜拜', country: '阿聯' },
    moscow: { city: '莫斯科', country: '俄羅斯' },
    london: { city: '倫敦', country: '英國' },
    paris: { city: '巴黎', country: '法國' },
    berlin: { city: '柏林', country: '德國' },
    newyork: { city: '紐約', country: '美國' },
    chicago: { city: '芝加哥', country: '美國' },
    losangeles: { city: '洛杉磯', country: '美國' },
    saopaulo: { city: '聖保羅', country: '巴西' },
    sydney: { city: '雪梨', country: '澳洲' },
    auckland: { city: '奧克蘭', country: '紐西蘭' },
  },
};

/** 언어별 도시 목록 */
export function citiesIn(lang: CityLang): City[] {
  if (lang === 'ko') return CITIES;
  const names = CITY_NAMES[lang];
  return CITIES.map(c => (names[c.id] ? { ...c, ...names[c.id] } : c));
}

export function findCityIn(lang: CityLang, id: string): City | undefined {
  return citiesIn(lang).find(c => c.id === id);
}

/**
 * 시차를 비교할 기준 시간대.
 *
 * 한국어는 서울을 기준으로 둔다(기존 동작). 다른 언어에서 "서울보다 3시간 빠름"은
 * 의미가 약하므로, 방문자 브라우저의 시간대를 기준으로 삼는다.
 */
export function baseZoneFor(lang: CityLang): string {
  if (lang === 'ko') return 'Asia/Seoul';
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
  } catch {
    return 'UTC';
  }
}

const LOCALE: Record<CityLang, string> = {
  ko: 'ko-KR', en: 'en-US', es: 'es-ES', 'pt-br': 'pt-BR',
  ja: 'ja-JP', de: 'de-DE', fr: 'fr-FR', hi: 'hi-IN',
  'zh-hans': 'zh-CN', 'zh-hant': 'zh-TW',
};

export const findCity = (id: string) => CITIES.find(c => c.id === id);

/** 그 시간대의 현재 시:분:초 */
export function timeIn(zone: string, at: number, lang: CityLang = 'ko'): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: zone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false,
  }).format(at);
}

/** 그 시간대의 날짜(월/일 요일) */
export function dateIn(zone: string, at: number, lang: CityLang = 'ko'): string {
  return new Intl.DateTimeFormat(LOCALE[lang], {
    timeZone: zone, month: 'long', day: 'numeric', weekday: 'short',
  }).format(at);
}

/** 그 시간대의 시(0~23) — 업무 시간인지 판단하는 데 쓴다 */
export function hourIn(zone: string, at: number): number {
  return Number(
    new Intl.DateTimeFormat('en-US', { timeZone: zone, hour: '2-digit', hour12: false }).format(at),
  ) % 24;
}

/** 기준 시간대 대비 시차(시간). 서머타임이 반영된 실제 차이다. */
export function offsetHours(zone: string, base: string, at: number): number {
  const read = (z: string) =>
    new Date(new Date(at).toLocaleString('en-US', { timeZone: z })).getTime();
  return Math.round(((read(zone) - read(base)) / 3600000) * 10) / 10;
}

export type DayPart = 'night' | 'morning' | 'work' | 'evening';

/** 연락해도 되는 시간인지 — 색으로 구분하려고 나눈다 */
export function dayPart(hour: number): DayPart {
  if (hour < 6) return 'night';
  if (hour < 9) return 'morning';
  if (hour < 18) return 'work';
  if (hour < 23) return 'evening';
  return 'night';
}

export const DAY_PART_LABEL: Record<DayPart, string> = {
  night: '한밤중',
  morning: '이른 아침',
  work: '업무 시간',
  evening: '저녁',
};

export const DAY_PART_LABEL_INTL: Record<CityLang, Record<DayPart, string>> = {
  ko: DAY_PART_LABEL,
  en: { night: 'Middle of the night', morning: 'Early morning', work: 'Working hours', evening: 'Evening' },
  es: { night: 'Plena noche', morning: 'Primera hora', work: 'Horario laboral', evening: 'Tarde-noche' },
  'pt-br': { night: 'Madrugada', morning: 'Começo da manhã', work: 'Horário de trabalho', evening: 'Fim do dia' },
  ja: { night: '真夜中', morning: '早朝', work: '勤務時間', evening: '夕方' },
  de: { night: 'Mitten in der Nacht', morning: 'Früher Morgen', work: 'Arbeitszeit', evening: 'Abend' },
  fr: { night: 'Milieu de la nuit', morning: 'Tôt le matin', work: 'Heures de travail', evening: 'Soirée' },
  hi: { night: 'आधी रात', morning: 'तड़के', work: 'कामकाजी घंटे', evening: 'शाम' },
  'zh-hans': { night: '深夜', morning: '清晨', work: '上班时间', evening: '傍晚' },
  'zh-hant': { night: '深夜', morning: '清晨', work: '上班時間', evening: '傍晚' },
};
