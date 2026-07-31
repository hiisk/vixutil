/**
 * 세계 도시 116곳의 시간대 — 여덟 언어.
 *
 * 적는 것은 IANA 시간대 이름 하나뿐이다. UTC 오프셋·서머타임 여부·지금 시각·
 * 다른 도시와의 시차가 전부 그 이름에서 계산된다 — 오프셋을 손으로 적으면
 * 서머타임이 바뀔 때마다 116곳을 고쳐야 하고, 나라가 시간대 정책을 바꾸면(터키가
 * 2016년에, 브라질이 2019년에 그랬다) 조용히 틀린 값이 남는다.
 *
 * 시간대 이름은 Intl API가 아는 것만 쓴다. 검사에서 116곳을 모두 실제로 계산해
 * 보므로, 오타나 없어진 시간대는 바로 드러난다.
 *
 * 나라 이름은 도시마다 적지 않는다. 한 나라에 도시가 여럿이라 같은 말을 여덟 벌씩
 * 되풀이하게 되므로, 나라를 열쇠로 한 번만 적고 도시는 열쇠만 참조한다.
 */
import type { L8 } from '../i18n/lang.ts';

export interface TimeCountry {
  name: L8<string>;
  /** 국기 이모지 — 목록에서 나라를 알아보게 한다 */
  flag: string;
}

/** 순서는 ko · en · es · pt · ja · de · fr · hi */
const c = (flag: string, ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string): TimeCountry =>
  ({ flag, name: { ko, en, es, pt, ja, de, fr, hi } });

export const TIME_COUNTRIES: Record<string, TimeCountry> = {
  kr: c('🇰🇷', '대한민국', 'South Korea', 'Corea del Sur', 'Coreia do Sul', '韓国', 'Südkorea', 'Corée du Sud', 'दक्षिण कोरिया'),
  jp: c('🇯🇵', '일본', 'Japan', 'Japón', 'Japão', '日本', 'Japan', 'Japon', 'जापान'),
  cn: c('🇨🇳', '중국', 'China', 'China', 'China', '中国', 'China', 'Chine', 'चीन'),
  tw: c('🇹🇼', '대만', 'Taiwan', 'Taiwán', 'Taiwan', '台湾', 'Taiwan', 'Taïwan', 'ताइवान'),
  hk: c('🇭🇰', '홍콩', 'Hong Kong', 'Hong Kong', 'Hong Kong', '香港', 'Hongkong', 'Hong Kong', 'हॉन्ग कॉन्ग'),
  sg: c('🇸🇬', '싱가포르', 'Singapore', 'Singapur', 'Singapura', 'シンガポール', 'Singapur', 'Singapour', 'सिंगापुर'),
  th: c('🇹🇭', '태국', 'Thailand', 'Tailandia', 'Tailândia', 'タイ', 'Thailand', 'Thaïlande', 'थाईलैंड'),
  vn: c('🇻🇳', '베트남', 'Vietnam', 'Vietnam', 'Vietnã', 'ベトナム', 'Vietnam', 'Vietnam', 'वियतनाम'),
  ph: c('🇵🇭', '필리핀', 'Philippines', 'Filipinas', 'Filipinas', 'フィリピン', 'Philippinen', 'Philippines', 'फ़िलीपींस'),
  id: c('🇮🇩', '인도네시아', 'Indonesia', 'Indonesia', 'Indonésia', 'インドネシア', 'Indonesien', 'Indonésie', 'इंडोनेशिया'),
  my: c('🇲🇾', '말레이시아', 'Malaysia', 'Malasia', 'Malásia', 'マレーシア', 'Malaysia', 'Malaisie', 'मलेशिया'),
  in: c('🇮🇳', '인도', 'India', 'India', 'Índia', 'インド', 'Indien', 'Inde', 'भारत'),
  pk: c('🇵🇰', '파키스탄', 'Pakistan', 'Pakistán', 'Paquistão', 'パキスタン', 'Pakistan', 'Pakistan', 'पाकिस्तान'),
  bd: c('🇧🇩', '방글라데시', 'Bangladesh', 'Bangladés', 'Bangladesh', 'バングラデシュ', 'Bangladesch', 'Bangladesh', 'बांग्लादेश'),
  ae: c('🇦🇪', '아랍에미리트', 'United Arab Emirates', 'Emiratos Árabes Unidos', 'Emirados Árabes Unidos', 'アラブ首長国連邦', 'Vereinigte Arabische Emirate', 'Émirats arabes unis', 'संयुक्त अरब अमीरात'),
  sa: c('🇸🇦', '사우디아라비아', 'Saudi Arabia', 'Arabia Saudí', 'Arábia Saudita', 'サウジアラビア', 'Saudi-Arabien', 'Arabie saoudite', 'सऊदी अरब'),
  qa: c('🇶🇦', '카타르', 'Qatar', 'Catar', 'Catar', 'カタール', 'Katar', 'Qatar', 'क़तर'),
  il: c('🇮🇱', '이스라엘', 'Israel', 'Israel', 'Israel', 'イスラエル', 'Israel', 'Israël', 'इसराइल'),
  tr: c('🇹🇷', '터키', 'Türkiye', 'Turquía', 'Turquia', 'トルコ', 'Türkei', 'Turquie', 'तुर्किये'),
  ru: c('🇷🇺', '러시아', 'Russia', 'Rusia', 'Rússia', 'ロシア', 'Russland', 'Russie', 'रूस'),
  gb: c('🇬🇧', '영국', 'United Kingdom', 'Reino Unido', 'Reino Unido', 'イギリス', 'Vereinigtes Königreich', 'Royaume-Uni', 'यूनाइटेड किंगडम'),
  ie: c('🇮🇪', '아일랜드', 'Ireland', 'Irlanda', 'Irlanda', 'アイルランド', 'Irland', 'Irlande', 'आयरलैंड'),
  fr: c('🇫🇷', '프랑스', 'France', 'Francia', 'França', 'フランス', 'Frankreich', 'France', 'फ़्रांस'),
  de: c('🇩🇪', '독일', 'Germany', 'Alemania', 'Alemanha', 'ドイツ', 'Deutschland', 'Allemagne', 'जर्मनी'),
  es: c('🇪🇸', '스페인', 'Spain', 'España', 'Espanha', 'スペイン', 'Spanien', 'Espagne', 'स्पेन'),
  pt: c('🇵🇹', '포르투갈', 'Portugal', 'Portugal', 'Portugal', 'ポルトガル', 'Portugal', 'Portugal', 'पुर्तगाल'),
  it: c('🇮🇹', '이탈리아', 'Italy', 'Italia', 'Itália', 'イタリア', 'Italien', 'Italie', 'इटली'),
  nl: c('🇳🇱', '네덜란드', 'Netherlands', 'Países Bajos', 'Países Baixos', 'オランダ', 'Niederlande', 'Pays-Bas', 'नेदरलैंड्स'),
  be: c('🇧🇪', '벨기에', 'Belgium', 'Bélgica', 'Bélgica', 'ベルギー', 'Belgien', 'Belgique', 'बेल्जियम'),
  ch: c('🇨🇭', '스위스', 'Switzerland', 'Suiza', 'Suíça', 'スイス', 'Schweiz', 'Suisse', 'स्विट्ज़रलैंड'),
  at: c('🇦🇹', '오스트리아', 'Austria', 'Austria', 'Áustria', 'オーストリア', 'Österreich', 'Autriche', 'ऑस्ट्रिया'),
  se: c('🇸🇪', '스웨덴', 'Sweden', 'Suecia', 'Suécia', 'スウェーデン', 'Schweden', 'Suède', 'स्वीडन'),
  no: c('🇳🇴', '노르웨이', 'Norway', 'Noruega', 'Noruega', 'ノルウェー', 'Norwegen', 'Norvège', 'नॉर्वे'),
  dk: c('🇩🇰', '덴마크', 'Denmark', 'Dinamarca', 'Dinamarca', 'デンマーク', 'Dänemark', 'Danemark', 'डेनमार्क'),
  fi: c('🇫🇮', '핀란드', 'Finland', 'Finlandia', 'Finlândia', 'フィンランド', 'Finnland', 'Finlande', 'फ़िनलैंड'),
  pl: c('🇵🇱', '폴란드', 'Poland', 'Polonia', 'Polônia', 'ポーランド', 'Polen', 'Pologne', 'पोलैंड'),
  cz: c('🇨🇿', '체코', 'Czechia', 'República Checa', 'Tchéquia', 'チェコ', 'Tschechien', 'Tchéquie', 'चेकिया'),
  hu: c('🇭🇺', '헝가리', 'Hungary', 'Hungría', 'Hungria', 'ハンガリー', 'Ungarn', 'Hongrie', 'हंगरी'),
  gr: c('🇬🇷', '그리스', 'Greece', 'Grecia', 'Grécia', 'ギリシャ', 'Griechenland', 'Grèce', 'ग्रीस'),
  ua: c('🇺🇦', '우크라이나', 'Ukraine', 'Ucrania', 'Ucrânia', 'ウクライナ', 'Ukraine', 'Ukraine', 'यूक्रेन'),
  ro: c('🇷🇴', '루마니아', 'Romania', 'Rumanía', 'Romênia', 'ルーマニア', 'Rumänien', 'Roumanie', 'रोमानिया'),
  us: c('🇺🇸', '미국', 'United States', 'Estados Unidos', 'Estados Unidos', 'アメリカ', 'Vereinigte Staaten', 'États-Unis', 'संयुक्त राज्य'),
  ca: c('🇨🇦', '캐나다', 'Canada', 'Canadá', 'Canadá', 'カナダ', 'Kanada', 'Canada', 'कनाडा'),
  mx: c('🇲🇽', '멕시코', 'Mexico', 'México', 'México', 'メキシコ', 'Mexiko', 'Mexique', 'मेक्सिको'),
  br: c('🇧🇷', '브라질', 'Brazil', 'Brasil', 'Brasil', 'ブラジル', 'Brasilien', 'Brésil', 'ब्राज़ील'),
  ar: c('🇦🇷', '아르헨티나', 'Argentina', 'Argentina', 'Argentina', 'アルゼンチン', 'Argentinien', 'Argentine', 'अर्जेंटीना'),
  cl: c('🇨🇱', '칠레', 'Chile', 'Chile', 'Chile', 'チリ', 'Chile', 'Chili', 'चिली'),
  pe: c('🇵🇪', '페루', 'Peru', 'Perú', 'Peru', 'ペルー', 'Peru', 'Pérou', 'पेरू'),
  co: c('🇨🇴', '콜롬비아', 'Colombia', 'Colombia', 'Colômbia', 'コロンビア', 'Kolumbien', 'Colombie', 'कोलंबिया'),
  eg: c('🇪🇬', '이집트', 'Egypt', 'Egipto', 'Egito', 'エジプト', 'Ägypten', 'Égypte', 'मिस्र'),
  za: c('🇿🇦', '남아프리카', 'South Africa', 'Sudáfrica', 'África do Sul', '南アフリカ', 'Südafrika', 'Afrique du Sud', 'दक्षिण अफ़्रीका'),
  ng: c('🇳🇬', '나이지리아', 'Nigeria', 'Nigeria', 'Nigéria', 'ナイジェリア', 'Nigeria', 'Nigeria', 'नाइजीरिया'),
  ke: c('🇰🇪', '케냐', 'Kenya', 'Kenia', 'Quênia', 'ケニア', 'Kenia', 'Kenya', 'केन्या'),
  ma: c('🇲🇦', '모로코', 'Morocco', 'Marruecos', 'Marrocos', 'モロッコ', 'Marokko', 'Maroc', 'मोरक्को'),
  et: c('🇪🇹', '에티오피아', 'Ethiopia', 'Etiopía', 'Etiópia', 'エチオピア', 'Äthiopien', 'Éthiopie', 'इथियोपिया'),
  au: c('🇦🇺', '오스트레일리아', 'Australia', 'Australia', 'Austrália', 'オーストラリア', 'Australien', 'Australie', 'ऑस्ट्रेलिया'),
  nz: c('🇳🇿', '뉴질랜드', 'New Zealand', 'Nueva Zelanda', 'Nova Zelândia', 'ニュージーランド', 'Neuseeland', 'Nouvelle-Zélande', 'न्यूज़ीलैंड'),
  uz: c('🇺🇿', '우즈베키스탄', 'Uzbekistan', 'Uzbekistán', 'Uzbequistão', 'ウズベキスタン', 'Usbekistan', 'Ouzbékistan', 'उज़्बेकिस्तान'),
  kz: c('🇰🇿', '카자흐스탄', 'Kazakhstan', 'Kazajistán', 'Cazaquistão', 'カザフスタン', 'Kasachstan', 'Kazakhstan', 'क़ज़ाख़िस्तान'),
  np: c('🇳🇵', '네팔', 'Nepal', 'Nepal', 'Nepal', 'ネパール', 'Nepal', 'Népal', 'नेपाल'),
  lk: c('🇱🇰', '스리랑카', 'Sri Lanka', 'Sri Lanka', 'Sri Lanka', 'スリランカ', 'Sri Lanka', 'Sri Lanka', 'श्रीलंका'),
  ir: c('🇮🇷', '이란', 'Iran', 'Irán', 'Irã', 'イラン', 'Iran', 'Iran', 'ईरान'),
  is: c('🇮🇸', '아이슬란드', 'Iceland', 'Islandia', 'Islândia', 'アイスランド', 'Island', 'Islande', 'आइसलैंड'),
};

export interface TimeCity {
  slug: string;
  /** IANA 시간대 — 오프셋·서머타임·현재 시각이 여기서 나온다 */
  zone: string;
  /** TIME_COUNTRIES의 열쇠 */
  country: string;
  name: L8<string>;
}

const t = (
  slug: string, zone: string, country: string,
  ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string,
): TimeCity => ({ slug, zone, country, name: { ko, en, es, pt, ja, de, fr, hi } });

export const TIME_CITIES: TimeCity[] = [
  /* ───────── 동아시아 ───────── */
  t('seoul', 'Asia/Seoul', 'kr', '서울', 'Seoul', 'Seúl', 'Seul', 'ソウル', 'Seoul', 'Séoul', 'सिओल'),
  t('busan', 'Asia/Seoul', 'kr', '부산', 'Busan', 'Busan', 'Busan', '釜山', 'Busan', 'Busan', 'बुसान'),
  t('tokyo', 'Asia/Tokyo', 'jp', '도쿄', 'Tokyo', 'Tokio', 'Tóquio', '東京', 'Tokio', 'Tokyo', 'टोक्यो'),
  t('osaka', 'Asia/Tokyo', 'jp', '오사카', 'Osaka', 'Osaka', 'Osaka', '大阪', 'Osaka', 'Osaka', 'ओसाका'),
  t('sapporo', 'Asia/Tokyo', 'jp', '삿포로', 'Sapporo', 'Sapporo', 'Sapporo', '札幌', 'Sapporo', 'Sapporo', 'साप्पोरो'),
  t('fukuoka', 'Asia/Tokyo', 'jp', '후쿠오카', 'Fukuoka', 'Fukuoka', 'Fukuoka', '福岡', 'Fukuoka', 'Fukuoka', 'फुकुओका'),
  t('beijing', 'Asia/Shanghai', 'cn', '베이징', 'Beijing', 'Pekín', 'Pequim', '北京', 'Peking', 'Pékin', 'बीजिंग'),
  t('shanghai', 'Asia/Shanghai', 'cn', '상하이', 'Shanghai', 'Shanghái', 'Xangai', '上海', 'Shanghai', 'Shanghai', 'शंघाई'),
  t('shenzhen', 'Asia/Shanghai', 'cn', '선전', 'Shenzhen', 'Shenzhen', 'Shenzhen', '深圳', 'Shenzhen', 'Shenzhen', 'शेनज़ेन'),
  t('taipei', 'Asia/Taipei', 'tw', '타이베이', 'Taipei', 'Taipéi', 'Taipé', '台北', 'Taipeh', 'Taipei', 'ताइपे'),
  t('hong-kong', 'Asia/Hong_Kong', 'hk', '홍콩', 'Hong Kong', 'Hong Kong', 'Hong Kong', '香港', 'Hongkong', 'Hong Kong', 'हॉन्ग कॉन्ग'),

  /* ───────── 동남·남아시아 ───────── */
  t('singapore', 'Asia/Singapore', 'sg', '싱가포르', 'Singapore', 'Singapur', 'Singapura', 'シンガポール', 'Singapur', 'Singapour', 'सिंगापुर'),
  t('bangkok', 'Asia/Bangkok', 'th', '방콕', 'Bangkok', 'Bangkok', 'Bangkok', 'バンコク', 'Bangkok', 'Bangkok', 'बैंकॉक'),
  t('hanoi', 'Asia/Ho_Chi_Minh', 'vn', '하노이', 'Hanoi', 'Hanói', 'Hanói', 'ハノイ', 'Hanoi', 'Hanoï', 'हनोई'),
  t('ho-chi-minh', 'Asia/Ho_Chi_Minh', 'vn', '호찌민', 'Ho Chi Minh City', 'Ciudad Ho Chi Minh', 'Cidade de Ho Chi Minh', 'ホーチミン', 'Ho-Chi-Minh-Stadt', 'Hô Chi Minh-Ville', 'हो ची मिन्ह'),
  t('manila', 'Asia/Manila', 'ph', '마닐라', 'Manila', 'Manila', 'Manila', 'マニラ', 'Manila', 'Manille', 'मनीला'),
  t('jakarta', 'Asia/Jakarta', 'id', '자카르타', 'Jakarta', 'Yakarta', 'Jacarta', 'ジャカルタ', 'Jakarta', 'Jakarta', 'जकार्ता'),
  t('bali', 'Asia/Makassar', 'id', '발리', 'Bali', 'Bali', 'Bali', 'バリ', 'Bali', 'Bali', 'बाली'),
  t('kuala-lumpur', 'Asia/Kuala_Lumpur', 'my', '쿠알라룸푸르', 'Kuala Lumpur', 'Kuala Lumpur', 'Kuala Lumpur', 'クアラルンプール', 'Kuala Lumpur', 'Kuala Lumpur', 'कुआलालंपुर'),
  t('delhi', 'Asia/Kolkata', 'in', '델리', 'Delhi', 'Delhi', 'Délhi', 'デリー', 'Delhi', 'Delhi', 'दिल्ली'),
  t('mumbai', 'Asia/Kolkata', 'in', '뭄바이', 'Mumbai', 'Bombay', 'Mumbai', 'ムンバイ', 'Mumbai', 'Mumbai', 'मुंबई'),
  t('bengaluru', 'Asia/Kolkata', 'in', '벵갈루루', 'Bengaluru', 'Bangalore', 'Bengaluru', 'ベンガルール', 'Bengaluru', 'Bangalore', 'बेंगलुरु'),
  t('chennai', 'Asia/Kolkata', 'in', '첸나이', 'Chennai', 'Chennai', 'Chennai', 'チェンナイ', 'Chennai', 'Chennai', 'चेन्नई'),
  t('kolkata', 'Asia/Kolkata', 'in', '콜카타', 'Kolkata', 'Calcuta', 'Calcutá', 'コルカタ', 'Kalkutta', 'Calcutta', 'कोलकाता'),
  t('hyderabad', 'Asia/Kolkata', 'in', '하이데라바드', 'Hyderabad', 'Hyderabad', 'Hyderabad', 'ハイデラバード', 'Hyderabad', 'Hyderabad', 'हैदराबाद'),
  t('karachi', 'Asia/Karachi', 'pk', '카라치', 'Karachi', 'Karachi', 'Karachi', 'カラチ', 'Karatschi', 'Karachi', 'कराची'),
  t('lahore', 'Asia/Karachi', 'pk', '라호르', 'Lahore', 'Lahore', 'Lahore', 'ラホール', 'Lahore', 'Lahore', 'लाहौर'),
  t('dhaka', 'Asia/Dhaka', 'bd', '다카', 'Dhaka', 'Daca', 'Daca', 'ダッカ', 'Dhaka', 'Dacca', 'ढाका'),
  t('kathmandu', 'Asia/Kathmandu', 'np', '카트만두', 'Kathmandu', 'Katmandú', 'Katmandu', 'カトマンズ', 'Kathmandu', 'Katmandou', 'काठमांडू'),
  t('colombo', 'Asia/Colombo', 'lk', '콜롬보', 'Colombo', 'Colombo', 'Colombo', 'コロンボ', 'Colombo', 'Colombo', 'कोलंबो'),
  t('tashkent', 'Asia/Tashkent', 'uz', '타슈켄트', 'Tashkent', 'Taskent', 'Tasquente', 'タシケント', 'Taschkent', 'Tachkent', 'ताशकंद'),
  t('almaty', 'Asia/Almaty', 'kz', '알마티', 'Almaty', 'Almatý', 'Almaty', 'アルマトイ', 'Almaty', 'Almaty', 'अल्माटी'),

  /* ───────── 중동 ───────── */
  t('dubai', 'Asia/Dubai', 'ae', '두바이', 'Dubai', 'Dubái', 'Dubai', 'ドバイ', 'Dubai', 'Dubaï', 'दुबई'),
  t('abu-dhabi', 'Asia/Dubai', 'ae', '아부다비', 'Abu Dhabi', 'Abu Dabi', 'Abu Dhabi', 'アブダビ', 'Abu Dhabi', 'Abou Dabi', 'अबू धाबी'),
  t('riyadh', 'Asia/Riyadh', 'sa', '리야드', 'Riyadh', 'Riad', 'Riade', 'リヤド', 'Riad', 'Riyad', 'रियाद'),
  t('doha', 'Asia/Qatar', 'qa', '도하', 'Doha', 'Doha', 'Doha', 'ドーハ', 'Doha', 'Doha', 'दोहा'),
  t('tel-aviv', 'Asia/Jerusalem', 'il', '텔아비브', 'Tel Aviv', 'Tel Aviv', 'Tel Aviv', 'テルアビブ', 'Tel Aviv', 'Tel-Aviv', 'तेल अवीव'),
  t('tehran', 'Asia/Tehran', 'ir', '테헤란', 'Tehran', 'Teherán', 'Teerã', 'テヘラン', 'Teheran', 'Téhéran', 'तेहरान'),
  t('istanbul', 'Europe/Istanbul', 'tr', '이스탄불', 'Istanbul', 'Estambul', 'Istambul', 'イスタンブール', 'Istanbul', 'Istanbul', 'इस्तानबुल'),

  /* ───────── 유럽 ───────── */
  t('london', 'Europe/London', 'gb', '런던', 'London', 'Londres', 'Londres', 'ロンドン', 'London', 'Londres', 'लंदन'),
  t('manchester', 'Europe/London', 'gb', '맨체스터', 'Manchester', 'Mánchester', 'Manchester', 'マンチェスター', 'Manchester', 'Manchester', 'मैनचेस्टर'),
  t('edinburgh', 'Europe/London', 'gb', '에든버러', 'Edinburgh', 'Edimburgo', 'Edimburgo', 'エディンバラ', 'Edinburgh', 'Édimbourg', 'एडिनबर्ग'),
  t('dublin', 'Europe/Dublin', 'ie', '더블린', 'Dublin', 'Dublín', 'Dublin', 'ダブリン', 'Dublin', 'Dublin', 'डबलिन'),
  t('paris', 'Europe/Paris', 'fr', '파리', 'Paris', 'París', 'Paris', 'パリ', 'Paris', 'Paris', 'पेरिस'),
  t('lyon', 'Europe/Paris', 'fr', '리옹', 'Lyon', 'Lyon', 'Lyon', 'リヨン', 'Lyon', 'Lyon', 'ल्योन'),
  t('nice', 'Europe/Paris', 'fr', '니스', 'Nice', 'Niza', 'Nice', 'ニース', 'Nizza', 'Nice', 'नीस'),
  t('berlin', 'Europe/Berlin', 'de', '베를린', 'Berlin', 'Berlín', 'Berlim', 'ベルリン', 'Berlin', 'Berlin', 'बर्लिन'),
  t('munich', 'Europe/Berlin', 'de', '뮌헨', 'Munich', 'Múnich', 'Munique', 'ミュンヘン', 'München', 'Munich', 'म्यूनिक'),
  t('frankfurt', 'Europe/Berlin', 'de', '프랑크푸르트', 'Frankfurt', 'Fráncfort', 'Frankfurt', 'フランクフルト', 'Frankfurt', 'Francfort', 'फ़्रैंकफ़र्ट'),
  t('hamburg', 'Europe/Berlin', 'de', '함부르크', 'Hamburg', 'Hamburgo', 'Hamburgo', 'ハンブルク', 'Hamburg', 'Hambourg', 'हैम्बर्ग'),
  t('madrid', 'Europe/Madrid', 'es', '마드리드', 'Madrid', 'Madrid', 'Madri', 'マドリード', 'Madrid', 'Madrid', 'मैड्रिड'),
  t('barcelona', 'Europe/Madrid', 'es', '바르셀로나', 'Barcelona', 'Barcelona', 'Barcelona', 'バルセロナ', 'Barcelona', 'Barcelone', 'बार्सिलोना'),
  t('lisbon', 'Europe/Lisbon', 'pt', '리스본', 'Lisbon', 'Lisboa', 'Lisboa', 'リスボン', 'Lissabon', 'Lisbonne', 'लिस्बन'),
  t('porto', 'Europe/Lisbon', 'pt', '포르투', 'Porto', 'Oporto', 'Porto', 'ポルト', 'Porto', 'Porto', 'पोर्टो'),
  t('rome', 'Europe/Rome', 'it', '로마', 'Rome', 'Roma', 'Roma', 'ローマ', 'Rom', 'Rome', 'रोम'),
  t('milan', 'Europe/Rome', 'it', '밀라노', 'Milan', 'Milán', 'Milão', 'ミラノ', 'Mailand', 'Milan', 'मिलान'),
  t('venice', 'Europe/Rome', 'it', '베네치아', 'Venice', 'Venecia', 'Veneza', 'ヴェネツィア', 'Venedig', 'Venise', 'वेनिस'),
  t('amsterdam', 'Europe/Amsterdam', 'nl', '암스테르담', 'Amsterdam', 'Ámsterdam', 'Amsterdã', 'アムステルダム', 'Amsterdam', 'Amsterdam', 'एम्स्टर्डम'),
  t('brussels', 'Europe/Brussels', 'be', '브뤼셀', 'Brussels', 'Bruselas', 'Bruxelas', 'ブリュッセル', 'Brüssel', 'Bruxelles', 'ब्रसेल्स'),
  t('zurich', 'Europe/Zurich', 'ch', '취리히', 'Zurich', 'Zúrich', 'Zurique', 'チューリッヒ', 'Zürich', 'Zurich', 'ज़्यूरिख'),
  t('geneva', 'Europe/Zurich', 'ch', '제네바', 'Geneva', 'Ginebra', 'Genebra', 'ジュネーブ', 'Genf', 'Genève', 'जिनेवा'),
  t('vienna', 'Europe/Vienna', 'at', '빈', 'Vienna', 'Viena', 'Viena', 'ウィーン', 'Wien', 'Vienne', 'वियना'),
  t('stockholm', 'Europe/Stockholm', 'se', '스톡홀름', 'Stockholm', 'Estocolmo', 'Estocolmo', 'ストックホルム', 'Stockholm', 'Stockholm', 'स्टॉकहोम'),
  t('oslo', 'Europe/Oslo', 'no', '오슬로', 'Oslo', 'Oslo', 'Oslo', 'オスロ', 'Oslo', 'Oslo', 'ओस्लो'),
  t('copenhagen', 'Europe/Copenhagen', 'dk', '코펜하겐', 'Copenhagen', 'Copenhague', 'Copenhague', 'コペンハーゲン', 'Kopenhagen', 'Copenhague', 'कोपेनहेगन'),
  t('helsinki', 'Europe/Helsinki', 'fi', '헬싱키', 'Helsinki', 'Helsinki', 'Helsinque', 'ヘルシンキ', 'Helsinki', 'Helsinki', 'हेलसिंकी'),
  t('warsaw', 'Europe/Warsaw', 'pl', '바르샤바', 'Warsaw', 'Varsovia', 'Varsóvia', 'ワルシャワ', 'Warschau', 'Varsovie', 'वारसॉ'),
  t('prague', 'Europe/Prague', 'cz', '프라하', 'Prague', 'Praga', 'Praga', 'プラハ', 'Prag', 'Prague', 'प्राग'),
  t('budapest', 'Europe/Budapest', 'hu', '부다페스트', 'Budapest', 'Budapest', 'Budapeste', 'ブダペスト', 'Budapest', 'Budapest', 'बुडापेस्ट'),
  t('athens', 'Europe/Athens', 'gr', '아테네', 'Athens', 'Atenas', 'Atenas', 'アテネ', 'Athen', 'Athènes', 'एथेंस'),
  t('kyiv', 'Europe/Kyiv', 'ua', '키이우', 'Kyiv', 'Kiev', 'Kiev', 'キーウ', 'Kyjiw', 'Kyiv', 'कीव'),
  t('bucharest', 'Europe/Bucharest', 'ro', '부쿠레슈티', 'Bucharest', 'Bucarest', 'Bucareste', 'ブカレスト', 'Bukarest', 'Bucarest', 'बुख़ारेस्ट'),
  t('moscow', 'Europe/Moscow', 'ru', '모스크바', 'Moscow', 'Moscú', 'Moscou', 'モスクワ', 'Moskau', 'Moscou', 'मॉस्को'),
  t('reykjavik', 'Atlantic/Reykjavik', 'is', '레이캬비크', 'Reykjavik', 'Reikiavik', 'Reiquiavique', 'レイキャビク', 'Reykjavík', 'Reykjavik', 'रेक्याविक'),

  /* ───────── 북미 ───────── */
  t('new-york', 'America/New_York', 'us', '뉴욕', 'New York', 'Nueva York', 'Nova York', 'ニューヨーク', 'New York', 'New York', 'न्यूयॉर्क'),
  t('washington', 'America/New_York', 'us', '워싱턴', 'Washington, D.C.', 'Washington D. C.', 'Washington, D.C.', 'ワシントンD.C.', 'Washington, D.C.', 'Washington', 'वाशिंगटन डीसी'),
  t('boston', 'America/New_York', 'us', '보스턴', 'Boston', 'Boston', 'Boston', 'ボストン', 'Boston', 'Boston', 'बोस्टन'),
  t('miami', 'America/New_York', 'us', '마이애미', 'Miami', 'Miami', 'Miami', 'マイアミ', 'Miami', 'Miami', 'मियामी'),
  t('atlanta', 'America/New_York', 'us', '애틀랜타', 'Atlanta', 'Atlanta', 'Atlanta', 'アトランタ', 'Atlanta', 'Atlanta', 'अटलांटा'),
  t('chicago', 'America/Chicago', 'us', '시카고', 'Chicago', 'Chicago', 'Chicago', 'シカゴ', 'Chicago', 'Chicago', 'शिकागो'),
  t('houston', 'America/Chicago', 'us', '휴스턴', 'Houston', 'Houston', 'Houston', 'ヒューストン', 'Houston', 'Houston', 'ह्यूस्टन'),
  t('dallas', 'America/Chicago', 'us', '댈러스', 'Dallas', 'Dallas', 'Dallas', 'ダラス', 'Dallas', 'Dallas', 'डलास'),
  t('denver', 'America/Denver', 'us', '덴버', 'Denver', 'Denver', 'Denver', 'デンバー', 'Denver', 'Denver', 'डेनवर'),
  t('phoenix', 'America/Phoenix', 'us', '피닉스', 'Phoenix', 'Phoenix', 'Phoenix', 'フェニックス', 'Phoenix', 'Phoenix', 'फ़ीनिक्स'),
  t('los-angeles', 'America/Los_Angeles', 'us', '로스앤젤레스', 'Los Angeles', 'Los Ángeles', 'Los Angeles', 'ロサンゼルス', 'Los Angeles', 'Los Angeles', 'लॉस एंजेलिस'),
  t('san-francisco', 'America/Los_Angeles', 'us', '샌프란시스코', 'San Francisco', 'San Francisco', 'São Francisco', 'サンフランシスコ', 'San Francisco', 'San Francisco', 'सैन फ़्रांसिस्को'),
  t('seattle', 'America/Los_Angeles', 'us', '시애틀', 'Seattle', 'Seattle', 'Seattle', 'シアトル', 'Seattle', 'Seattle', 'सिएटल'),
  t('las-vegas', 'America/Los_Angeles', 'us', '라스베이거스', 'Las Vegas', 'Las Vegas', 'Las Vegas', 'ラスベガス', 'Las Vegas', 'Las Vegas', 'लास वेगास'),
  t('honolulu', 'Pacific/Honolulu', 'us', '호놀룰루', 'Honolulu', 'Honolulu', 'Honolulu', 'ホノルル', 'Honolulu', 'Honolulu', 'होनोलूलू'),
  t('anchorage', 'America/Anchorage', 'us', '앵커리지', 'Anchorage', 'Anchorage', 'Anchorage', 'アンカレッジ', 'Anchorage', 'Anchorage', 'एंकरेज'),
  t('toronto', 'America/Toronto', 'ca', '토론토', 'Toronto', 'Toronto', 'Toronto', 'トロント', 'Toronto', 'Toronto', 'टोरंटो'),
  t('montreal', 'America/Toronto', 'ca', '몬트리올', 'Montreal', 'Montreal', 'Montreal', 'モントリオール', 'Montreal', 'Montréal', 'मॉन्ट्रियल'),
  t('vancouver', 'America/Vancouver', 'ca', '밴쿠버', 'Vancouver', 'Vancouver', 'Vancouver', 'バンクーバー', 'Vancouver', 'Vancouver', 'वैंकूवर'),
  t('mexico-city', 'America/Mexico_City', 'mx', '멕시코시티', 'Mexico City', 'Ciudad de México', 'Cidade do México', 'メキシコシティ', 'Mexiko-Stadt', 'Mexico', 'मेक्सिको सिटी'),
  t('cancun', 'America/Cancun', 'mx', '칸쿤', 'Cancún', 'Cancún', 'Cancún', 'カンクン', 'Cancún', 'Cancún', 'कैनकुन'),

  /* ───────── 남미 ───────── */
  t('sao-paulo', 'America/Sao_Paulo', 'br', '상파울루', 'São Paulo', 'São Paulo', 'São Paulo', 'サンパウロ', 'São Paulo', 'São Paulo', 'साओ पाउलो'),
  t('rio-de-janeiro', 'America/Sao_Paulo', 'br', '리우데자네이루', 'Rio de Janeiro', 'Río de Janeiro', 'Rio de Janeiro', 'リオデジャネイロ', 'Rio de Janeiro', 'Rio de Janeiro', 'रियो डी जनेरो'),
  t('brasilia', 'America/Sao_Paulo', 'br', '브라질리아', 'Brasília', 'Brasilia', 'Brasília', 'ブラジリア', 'Brasília', 'Brasília', 'ब्रासीलिया'),
  t('manaus', 'America/Manaus', 'br', '마나우스', 'Manaus', 'Manaos', 'Manaus', 'マナウス', 'Manaus', 'Manaus', 'मनौस'),
  t('buenos-aires', 'America/Argentina/Buenos_Aires', 'ar', '부에노스아이레스', 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', 'ブエノスアイレス', 'Buenos Aires', 'Buenos Aires', 'ब्यूनस आयर्स'),
  t('santiago', 'America/Santiago', 'cl', '산티아고', 'Santiago', 'Santiago de Chile', 'Santiago', 'サンティアゴ', 'Santiago de Chile', 'Santiago', 'सैंटियागो'),
  t('lima', 'America/Lima', 'pe', '리마', 'Lima', 'Lima', 'Lima', 'リマ', 'Lima', 'Lima', 'लीमा'),
  t('bogota', 'America/Bogota', 'co', '보고타', 'Bogotá', 'Bogotá', 'Bogotá', 'ボゴタ', 'Bogotá', 'Bogota', 'बोगोटा'),

  /* ───────── 아프리카 ───────── */
  t('cairo', 'Africa/Cairo', 'eg', '카이로', 'Cairo', 'El Cairo', 'Cairo', 'カイロ', 'Kairo', 'Le Caire', 'क़ाहिरा'),
  t('johannesburg', 'Africa/Johannesburg', 'za', '요하네스버그', 'Johannesburg', 'Johannesburgo', 'Joanesburgo', 'ヨハネスブルグ', 'Johannesburg', 'Johannesburg', 'जोहानसबर्ग'),
  t('cape-town', 'Africa/Johannesburg', 'za', '케이프타운', 'Cape Town', 'Ciudad del Cabo', 'Cidade do Cabo', 'ケープタウン', 'Kapstadt', 'Le Cap', 'केप टाउन'),
  t('lagos', 'Africa/Lagos', 'ng', '라고스', 'Lagos', 'Lagos', 'Lagos', 'ラゴス', 'Lagos', 'Lagos', 'लागोस'),
  t('nairobi', 'Africa/Nairobi', 'ke', '나이로비', 'Nairobi', 'Nairobi', 'Nairóbi', 'ナイロビ', 'Nairobi', 'Nairobi', 'नैरोबी'),
  t('casablanca', 'Africa/Casablanca', 'ma', '카사블랑카', 'Casablanca', 'Casablanca', 'Casablanca', 'カサブランカ', 'Casablanca', 'Casablanca', 'कासाब्लांका'),
  t('addis-ababa', 'Africa/Addis_Ababa', 'et', '아디스아바바', 'Addis Ababa', 'Adís Abeba', 'Adis Abeba', 'アディスアベバ', 'Addis Abeba', 'Addis-Abeba', 'अदीस अबाबा'),

  /* ───────── 오세아니아 ───────── */
  t('sydney', 'Australia/Sydney', 'au', '시드니', 'Sydney', 'Sídney', 'Sydney', 'シドニー', 'Sydney', 'Sydney', 'सिडनी'),
  t('melbourne', 'Australia/Melbourne', 'au', '멜버른', 'Melbourne', 'Melbourne', 'Melbourne', 'メルボルン', 'Melbourne', 'Melbourne', 'मेलबर्न'),
  t('brisbane', 'Australia/Brisbane', 'au', '브리즈번', 'Brisbane', 'Brisbane', 'Brisbane', 'ブリスベン', 'Brisbane', 'Brisbane', 'ब्रिस्बेन'),
  t('perth', 'Australia/Perth', 'au', '퍼스', 'Perth', 'Perth', 'Perth', 'パース', 'Perth', 'Perth', 'पर्थ'),
  t('adelaide', 'Australia/Adelaide', 'au', '애들레이드', 'Adelaide', 'Adelaida', 'Adelaide', 'アデレード', 'Adelaide', 'Adélaïde', 'एडिलेड'),
  t('auckland', 'Pacific/Auckland', 'nz', '오클랜드', 'Auckland', 'Auckland', 'Auckland', 'オークランド', 'Auckland', 'Auckland', 'ऑकलैंड'),
];

export const TIME_CITY_SLUGS = TIME_CITIES.map(c => c.slug);

export const timeCity = (slug: string): TimeCity | undefined =>
  TIME_CITIES.find(c => c.slug === slug);

export const timeCountry = (code: string): TimeCountry | undefined => TIME_COUNTRIES[code];

/** 대륙 대신 시간대 앞머리로 묶는다 — Asia/·Europe/·America/ 가 그대로 갈래가 된다 */
export const zoneRegion = (city: TimeCity): string => city.zone.split('/')[0];

export const TIME_REGIONS = ['Asia', 'Europe', 'America', 'Africa', 'Australia', 'Pacific', 'Atlantic'];

export const citiesOfRegion = (region: string): TimeCity[] =>
  TIME_CITIES.filter(c => zoneRegion(c) === region);
