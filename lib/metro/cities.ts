/**
 * 도시와 나라 이름 — 여덟 언어.
 *
 * 노선마다 도시·나라 이름을 적으면 서울 노선 열 개에 같은 말을 여덟 벌씩 열 번
 * 쓰게 된다. 도시를 열쇠로 한 번만 적고 노선은 열쇠만 참조한다.
 *
 * 수도가 아닌 도시도 넣는다 — 지하철은 수도에만 있는 것이 아니고, 부산·오사카·
 * 바르셀로나·뮌헨·리옹·상파울루·뭄바이·시카고에도 각자의 노선이 있다.
 */
import type { L8 } from './lang.ts';

export interface CityInfo {
  /** 국기 이모지 — 공유 카드 아이콘으로 쓴다 */
  icon: string;
  /** 수도가 아닌 도시인가 — 허브에서 갈라 보여준다 */
  secondCity?: boolean;
  name: L8<string>;
  country: L8<string>;
}

export const CITIES: Record<string, CityInfo> = {
  seoul: {
    icon: '🇰🇷',
    name: { ko: '서울', en: 'Seoul', es: 'Seúl', pt: 'Seul', ja: 'ソウル', de: 'Seoul', fr: 'Séoul', hi: 'सिओल' },
    country: { ko: '한국', en: 'South Korea', es: 'Corea del Sur', pt: 'Coreia do Sul', ja: '韓国', de: 'Südkorea', fr: 'Corée du Sud', hi: 'दक्षिण कोरिया' },
  },
  busan: {
    icon: '🇰🇷', secondCity: true,
    name: { ko: '부산', en: 'Busan', es: 'Busan', pt: 'Busan', ja: '釜山', de: 'Busan', fr: 'Busan', hi: 'बुसान' },
    country: { ko: '한국', en: 'South Korea', es: 'Corea del Sur', pt: 'Coreia do Sul', ja: '韓国', de: 'Südkorea', fr: 'Corée du Sud', hi: 'दक्षिण कोरिया' },
  },
  tokyo: {
    icon: '🇯🇵',
    name: { ko: '도쿄', en: 'Tokyo', es: 'Tokio', pt: 'Tóquio', ja: '東京', de: 'Tokio', fr: 'Tokyo', hi: 'टोक्यो' },
    country: { ko: '일본', en: 'Japan', es: 'Japón', pt: 'Japão', ja: '日本', de: 'Japan', fr: 'Japon', hi: 'जापान' },
  },
  osaka: {
    icon: '🇯🇵', secondCity: true,
    name: { ko: '오사카', en: 'Osaka', es: 'Osaka', pt: 'Osaka', ja: '大阪', de: 'Osaka', fr: 'Osaka', hi: 'ओसाका' },
    country: { ko: '일본', en: 'Japan', es: 'Japón', pt: 'Japão', ja: '日本', de: 'Japan', fr: 'Japon', hi: 'जापान' },
  },
  london: {
    icon: '🇬🇧',
    name: { ko: '런던', en: 'London', es: 'Londres', pt: 'Londres', ja: 'ロンドン', de: 'London', fr: 'Londres', hi: 'लंदन' },
    country: { ko: '영국', en: 'United Kingdom', es: 'Reino Unido', pt: 'Reino Unido', ja: 'イギリス', de: 'Vereinigtes Königreich', fr: 'Royaume-Uni', hi: 'यूनाइटेड किंगडम' },
  },
  newyork: {
    icon: '🇺🇸',
    name: { ko: '뉴욕', en: 'New York', es: 'Nueva York', pt: 'Nova York', ja: 'ニューヨーク', de: 'New York', fr: 'New York', hi: 'न्यूयॉर्क' },
    country: { ko: '미국', en: 'United States', es: 'Estados Unidos', pt: 'Estados Unidos', ja: 'アメリカ', de: 'Vereinigte Staaten', fr: 'États-Unis', hi: 'संयुक्त राज्य' },
  },
  chicago: {
    icon: '🇺🇸', secondCity: true,
    name: { ko: '시카고', en: 'Chicago', es: 'Chicago', pt: 'Chicago', ja: 'シカゴ', de: 'Chicago', fr: 'Chicago', hi: 'शिकागो' },
    country: { ko: '미국', en: 'United States', es: 'Estados Unidos', pt: 'Estados Unidos', ja: 'アメリカ', de: 'Vereinigte Staaten', fr: 'États-Unis', hi: 'संयुक्त राज्य' },
  },
  paris: {
    icon: '🇫🇷',
    name: { ko: '파리', en: 'Paris', es: 'París', pt: 'Paris', ja: 'パリ', de: 'Paris', fr: 'Paris', hi: 'पेरिस' },
    country: { ko: '프랑스', en: 'France', es: 'Francia', pt: 'França', ja: 'フランス', de: 'Frankreich', fr: 'France', hi: 'फ़्रांस' },
  },
  lyon: {
    icon: '🇫🇷', secondCity: true,
    name: { ko: '리옹', en: 'Lyon', es: 'Lyon', pt: 'Lyon', ja: 'リヨン', de: 'Lyon', fr: 'Lyon', hi: 'ल्योन' },
    country: { ko: '프랑스', en: 'France', es: 'Francia', pt: 'França', ja: 'フランス', de: 'Frankreich', fr: 'France', hi: 'फ़्रांस' },
  },
  berlin: {
    icon: '🇩🇪',
    name: { ko: '베를린', en: 'Berlin', es: 'Berlín', pt: 'Berlim', ja: 'ベルリン', de: 'Berlin', fr: 'Berlin', hi: 'बर्लिन' },
    country: { ko: '독일', en: 'Germany', es: 'Alemania', pt: 'Alemanha', ja: 'ドイツ', de: 'Deutschland', fr: 'Allemagne', hi: 'जर्मनी' },
  },
  munich: {
    icon: '🇩🇪', secondCity: true,
    name: { ko: '뮌헨', en: 'Munich', es: 'Múnich', pt: 'Munique', ja: 'ミュンヘン', de: 'München', fr: 'Munich', hi: 'म्यूनिक' },
    country: { ko: '독일', en: 'Germany', es: 'Alemania', pt: 'Alemanha', ja: 'ドイツ', de: 'Deutschland', fr: 'Allemagne', hi: 'जर्मनी' },
  },
  madrid: {
    icon: '🇪🇸',
    name: { ko: '마드리드', en: 'Madrid', es: 'Madrid', pt: 'Madri', ja: 'マドリード', de: 'Madrid', fr: 'Madrid', hi: 'मैड्रिड' },
    country: { ko: '스페인', en: 'Spain', es: 'España', pt: 'Espanha', ja: 'スペイン', de: 'Spanien', fr: 'Espagne', hi: 'स्पेन' },
  },
  barcelona: {
    icon: '🇪🇸', secondCity: true,
    name: { ko: '바르셀로나', en: 'Barcelona', es: 'Barcelona', pt: 'Barcelona', ja: 'バルセロナ', de: 'Barcelona', fr: 'Barcelone', hi: 'बार्सिलोना' },
    country: { ko: '스페인', en: 'Spain', es: 'España', pt: 'Espanha', ja: 'スペイン', de: 'Spanien', fr: 'Espagne', hi: 'स्पेन' },
  },
  saopaulo: {
    icon: '🇧🇷', secondCity: true,
    name: { ko: '상파울루', en: 'São Paulo', es: 'São Paulo', pt: 'São Paulo', ja: 'サンパウロ', de: 'São Paulo', fr: 'São Paulo', hi: 'साओ पाउलो' },
    country: { ko: '브라질', en: 'Brazil', es: 'Brasil', pt: 'Brasil', ja: 'ブラジル', de: 'Brasilien', fr: 'Brésil', hi: 'ब्राज़ील' },
  },
  rio: {
    icon: '🇧🇷', secondCity: true,
    name: { ko: '리우데자네이루', en: 'Rio de Janeiro', es: 'Río de Janeiro', pt: 'Rio de Janeiro', ja: 'リオデジャネイロ', de: 'Rio de Janeiro', fr: 'Rio de Janeiro', hi: 'रियो डी जनेरो' },
    country: { ko: '브라질', en: 'Brazil', es: 'Brasil', pt: 'Brasil', ja: 'ブラジル', de: 'Brasilien', fr: 'Brésil', hi: 'ब्राज़ील' },
  },
  delhi: {
    icon: '🇮🇳',
    name: { ko: '델리', en: 'Delhi', es: 'Delhi', pt: 'Délhi', ja: 'デリー', de: 'Delhi', fr: 'Delhi', hi: 'दिल्ली' },
    country: { ko: '인도', en: 'India', es: 'India', pt: 'Índia', ja: 'インド', de: 'Indien', fr: 'Inde', hi: 'भारत' },
  },
  mumbai: {
    icon: '🇮🇳', secondCity: true,
    name: { ko: '뭄바이', en: 'Mumbai', es: 'Bombay', pt: 'Mumbai', ja: 'ムンバイ', de: 'Mumbai', fr: 'Mumbai', hi: 'मुंबई' },
    country: { ko: '인도', en: 'India', es: 'India', pt: 'Índia', ja: 'インド', de: 'Indien', fr: 'Inde', hi: 'भारत' },
  },
  beijing: {
    icon: '🇨🇳',
    name: { ko: '베이징', en: 'Beijing', es: 'Pekín', pt: 'Pequim', ja: '北京', de: 'Peking', fr: 'Pékin', hi: 'बीजिंग' },
    country: { ko: '중국', en: 'China', es: 'China', pt: 'China', ja: '中国', de: 'China', fr: 'Chine', hi: 'चीन' },
  },
  hongkong: {
    icon: '🇭🇰',
    name: { ko: '홍콩', en: 'Hong Kong', es: 'Hong Kong', pt: 'Hong Kong', ja: '香港', de: 'Hongkong', fr: 'Hong Kong', hi: 'हॉन्ग कॉन्ग' },
    country: { ko: '홍콩', en: 'Hong Kong', es: 'Hong Kong', pt: 'Hong Kong', ja: '香港', de: 'Hongkong', fr: 'Hong Kong', hi: 'हॉन्ग कॉन्ग' },
  },
  singapore: {
    icon: '🇸🇬',
    name: { ko: '싱가포르', en: 'Singapore', es: 'Singapur', pt: 'Singapura', ja: 'シンガポール', de: 'Singapur', fr: 'Singapour', hi: 'सिंगापुर' },
    country: { ko: '싱가포르', en: 'Singapore', es: 'Singapur', pt: 'Singapura', ja: 'シンガポール', de: 'Singapur', fr: 'Singapour', hi: 'सिंगापुर' },
  },
};

export const cityInfo = (city: string): CityInfo | undefined => CITIES[city];
