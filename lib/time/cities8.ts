/**
 * 세계 도시 136곳의 시간대 — 열 언어.
 *
 * 적는 것은 IANA 시간대 이름 하나뿐이다. UTC 오프셋·서머타임 여부·지금 시각·
 * 다른 도시와의 시차가 전부 그 이름에서 계산된다 — 오프셋을 손으로 적으면
 * 서머타임이 바뀔 때마다 136곳을 고쳐야 하고, 나라가 시간대 정책을 바꾸면(터키가
 * 2016년에, 브라질이 2019년에 그랬다) 조용히 틀린 값이 남는다.
 *
 * 시간대 이름은 Intl API가 아는 것만 쓴다. 검사에서 136곳을 모두 실제로 계산해
 * 보므로, 오타나 없어진 시간대는 바로 드러난다.
 *
 * 나라 이름은 도시마다 적지 않는다. 한 나라에 도시가 여럿이라 같은 말을 여덟 벌씩
 * 되풀이하게 되므로, 나라를 열쇠로 한 번만 적고 도시는 열쇠만 참조한다.
 *
 * 중국어 도시 이름은 두 벌이 낱말째로 다른 곳이 많다 — 悉尼/雪梨, 旧金山/舊金山은
 * 글자 변환이 아니라 대륙과 대만이 서로 다른 음역을 쓰는 것이다.
 */
import type { L } from '../i18n/lang.ts';

export interface TimeCountry {
  name: L<string>;
  /** 국기 이모지 — 목록에서 나라를 알아보게 한다 */
  flag: string;
}

/** 순서는 ko · en · es · pt · ja · de · fr · hi · zh · tw */
const c = (flag: string, ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string, zh: string, tw: string): TimeCountry =>
  ({ flag, name: { ko, en, es, pt, ja, de, fr, hi, zh, tw } });

export const TIME_COUNTRIES: Record<string, TimeCountry> = {
  kr: c('🇰🇷', '대한민국', 'South Korea', 'Corea del Sur', 'Coreia do Sul', '韓国', 'Südkorea', 'Corée du Sud', 'दक्षिण कोरिया', '韩国', '韓國'),
  jp: c('🇯🇵', '일본', 'Japan', 'Japón', 'Japão', '日本', 'Japan', 'Japon', 'जापान', '日本', '日本'),
  cn: c('🇨🇳', '중국', 'China', 'China', 'China', '中国', 'China', 'Chine', 'चीन', '中国', '中國'),
  tw: c('🇹🇼', '대만', 'Taiwan', 'Taiwán', 'Taiwan', '台湾', 'Taiwan', 'Taïwan', 'ताइवान', '台湾', '台灣'),
  hk: c('🇭🇰', '홍콩', 'Hong Kong', 'Hong Kong', 'Hong Kong', '香港', 'Hongkong', 'Hong Kong', 'हॉन्ग कॉन्ग', '香港', '香港'),
  sg: c('🇸🇬', '싱가포르', 'Singapore', 'Singapur', 'Singapura', 'シンガポール', 'Singapur', 'Singapour', 'सिंगापुर', '新加坡', '新加坡'),
  th: c('🇹🇭', '태국', 'Thailand', 'Tailandia', 'Tailândia', 'タイ', 'Thailand', 'Thaïlande', 'थाईलैंड', '泰国', '泰國'),
  vn: c('🇻🇳', '베트남', 'Vietnam', 'Vietnam', 'Vietnã', 'ベトナム', 'Vietnam', 'Vietnam', 'वियतनाम', '越南', '越南'),
  ph: c('🇵🇭', '필리핀', 'Philippines', 'Filipinas', 'Filipinas', 'フィリピン', 'Philippinen', 'Philippines', 'फ़िलीपींस', '菲律宾', '菲律賓'),
  id: c('🇮🇩', '인도네시아', 'Indonesia', 'Indonesia', 'Indonésia', 'インドネシア', 'Indonesien', 'Indonésie', 'इंडोनेशिया', '印度尼西亚', '印尼'),
  my: c('🇲🇾', '말레이시아', 'Malaysia', 'Malasia', 'Malásia', 'マレーシア', 'Malaysia', 'Malaisie', 'मलेशिया', '马来西亚', '馬來西亞'),
  in: c('🇮🇳', '인도', 'India', 'India', 'Índia', 'インド', 'Indien', 'Inde', 'भारत', '印度', '印度'),
  pk: c('🇵🇰', '파키스탄', 'Pakistan', 'Pakistán', 'Paquistão', 'パキスタン', 'Pakistan', 'Pakistan', 'पाकिस्तान', '巴基斯坦', '巴基斯坦'),
  bd: c('🇧🇩', '방글라데시', 'Bangladesh', 'Bangladés', 'Bangladesh', 'バングラデシュ', 'Bangladesch', 'Bangladesh', 'बांग्लादेश', '孟加拉国', '孟加拉'),
  ae: c('🇦🇪', '아랍에미리트', 'United Arab Emirates', 'Emiratos Árabes Unidos', 'Emirados Árabes Unidos', 'アラブ首長国連邦', 'Vereinigte Arabische Emirate', 'Émirats arabes unis', 'संयुक्त अरब अमीरात', '阿拉伯联合酋长国', '阿拉伯聯合大公國'),
  sa: c('🇸🇦', '사우디아라비아', 'Saudi Arabia', 'Arabia Saudí', 'Arábia Saudita', 'サウジアラビア', 'Saudi-Arabien', 'Arabie saoudite', 'सऊदी अरब', '沙特阿拉伯', '沙烏地阿拉伯'),
  qa: c('🇶🇦', '카타르', 'Qatar', 'Catar', 'Catar', 'カタール', 'Katar', 'Qatar', 'क़तर', '卡塔尔', '卡達'),
  il: c('🇮🇱', '이스라엘', 'Israel', 'Israel', 'Israel', 'イスラエル', 'Israel', 'Israël', 'इसराइल', '以色列', '以色列'),
  tr: c('🇹🇷', '터키', 'Türkiye', 'Turquía', 'Turquia', 'トルコ', 'Türkei', 'Turquie', 'तुर्किये', '土耳其', '土耳其'),
  ru: c('🇷🇺', '러시아', 'Russia', 'Rusia', 'Rússia', 'ロシア', 'Russland', 'Russie', 'रूस', '俄罗斯', '俄羅斯'),
  gb: c('🇬🇧', '영국', 'United Kingdom', 'Reino Unido', 'Reino Unido', 'イギリス', 'Vereinigtes Königreich', 'Royaume-Uni', 'यूनाइटेड किंगडम', '英国', '英國'),
  ie: c('🇮🇪', '아일랜드', 'Ireland', 'Irlanda', 'Irlanda', 'アイルランド', 'Irland', 'Irlande', 'आयरलैंड', '爱尔兰', '愛爾蘭'),
  fr: c('🇫🇷', '프랑스', 'France', 'Francia', 'França', 'フランス', 'Frankreich', 'France', 'फ़्रांस', '法国', '法國'),
  de: c('🇩🇪', '독일', 'Germany', 'Alemania', 'Alemanha', 'ドイツ', 'Deutschland', 'Allemagne', 'जर्मनी', '德国', '德國'),
  es: c('🇪🇸', '스페인', 'Spain', 'España', 'Espanha', 'スペイン', 'Spanien', 'Espagne', 'स्पेन', '西班牙', '西班牙'),
  pt: c('🇵🇹', '포르투갈', 'Portugal', 'Portugal', 'Portugal', 'ポルトガル', 'Portugal', 'Portugal', 'पुर्तगाल', '葡萄牙', '葡萄牙'),
  it: c('🇮🇹', '이탈리아', 'Italy', 'Italia', 'Itália', 'イタリア', 'Italien', 'Italie', 'इटली', '意大利', '義大利'),
  nl: c('🇳🇱', '네덜란드', 'Netherlands', 'Países Bajos', 'Países Baixos', 'オランダ', 'Niederlande', 'Pays-Bas', 'नेदरलैंड्स', '荷兰', '荷蘭'),
  be: c('🇧🇪', '벨기에', 'Belgium', 'Bélgica', 'Bélgica', 'ベルギー', 'Belgien', 'Belgique', 'बेल्जियम', '比利时', '比利時'),
  ch: c('🇨🇭', '스위스', 'Switzerland', 'Suiza', 'Suíça', 'スイス', 'Schweiz', 'Suisse', 'स्विट्ज़रलैंड', '瑞士', '瑞士'),
  at: c('🇦🇹', '오스트리아', 'Austria', 'Austria', 'Áustria', 'オーストリア', 'Österreich', 'Autriche', 'ऑस्ट्रिया', '奥地利', '奧地利'),
  se: c('🇸🇪', '스웨덴', 'Sweden', 'Suecia', 'Suécia', 'スウェーデン', 'Schweden', 'Suède', 'स्वीडन', '瑞典', '瑞典'),
  no: c('🇳🇴', '노르웨이', 'Norway', 'Noruega', 'Noruega', 'ノルウェー', 'Norwegen', 'Norvège', 'नॉर्वे', '挪威', '挪威'),
  dk: c('🇩🇰', '덴마크', 'Denmark', 'Dinamarca', 'Dinamarca', 'デンマーク', 'Dänemark', 'Danemark', 'डेनमार्क', '丹麦', '丹麥'),
  fi: c('🇫🇮', '핀란드', 'Finland', 'Finlandia', 'Finlândia', 'フィンランド', 'Finnland', 'Finlande', 'फ़िनलैंड', '芬兰', '芬蘭'),
  pl: c('🇵🇱', '폴란드', 'Poland', 'Polonia', 'Polônia', 'ポーランド', 'Polen', 'Pologne', 'पोलैंड', '波兰', '波蘭'),
  cz: c('🇨🇿', '체코', 'Czechia', 'República Checa', 'Tchéquia', 'チェコ', 'Tschechien', 'Tchéquie', 'चेकिया', '捷克', '捷克'),
  hu: c('🇭🇺', '헝가리', 'Hungary', 'Hungría', 'Hungria', 'ハンガリー', 'Ungarn', 'Hongrie', 'हंगरी', '匈牙利', '匈牙利'),
  gr: c('🇬🇷', '그리스', 'Greece', 'Grecia', 'Grécia', 'ギリシャ', 'Griechenland', 'Grèce', 'ग्रीस', '希腊', '希臘'),
  ua: c('🇺🇦', '우크라이나', 'Ukraine', 'Ucrania', 'Ucrânia', 'ウクライナ', 'Ukraine', 'Ukraine', 'यूक्रेन', '乌克兰', '烏克蘭'),
  ro: c('🇷🇴', '루마니아', 'Romania', 'Rumanía', 'Romênia', 'ルーマニア', 'Rumänien', 'Roumanie', 'रोमानिया', '罗马尼亚', '羅馬尼亞'),
  us: c('🇺🇸', '미국', 'United States', 'Estados Unidos', 'Estados Unidos', 'アメリカ', 'Vereinigte Staaten', 'États-Unis', 'संयुक्त राज्य', '美国', '美國'),
  ca: c('🇨🇦', '캐나다', 'Canada', 'Canadá', 'Canadá', 'カナダ', 'Kanada', 'Canada', 'कनाडा', '加拿大', '加拿大'),
  mx: c('🇲🇽', '멕시코', 'Mexico', 'México', 'México', 'メキシコ', 'Mexiko', 'Mexique', 'मेक्सिको', '墨西哥', '墨西哥'),
  br: c('🇧🇷', '브라질', 'Brazil', 'Brasil', 'Brasil', 'ブラジル', 'Brasilien', 'Brésil', 'ब्राज़ील', '巴西', '巴西'),
  ar: c('🇦🇷', '아르헨티나', 'Argentina', 'Argentina', 'Argentina', 'アルゼンチン', 'Argentinien', 'Argentine', 'अर्जेंटीना', '阿根廷', '阿根廷'),
  cl: c('🇨🇱', '칠레', 'Chile', 'Chile', 'Chile', 'チリ', 'Chile', 'Chili', 'चिली', '智利', '智利'),
  pe: c('🇵🇪', '페루', 'Peru', 'Perú', 'Peru', 'ペルー', 'Peru', 'Pérou', 'पेरू', '秘鲁', '秘魯'),
  co: c('🇨🇴', '콜롬비아', 'Colombia', 'Colombia', 'Colômbia', 'コロンビア', 'Kolumbien', 'Colombie', 'कोलंबिया', '哥伦比亚', '哥倫比亞'),
  eg: c('🇪🇬', '이집트', 'Egypt', 'Egipto', 'Egito', 'エジプト', 'Ägypten', 'Égypte', 'मिस्र', '埃及', '埃及'),
  za: c('🇿🇦', '남아프리카', 'South Africa', 'Sudáfrica', 'África do Sul', '南アフリカ', 'Südafrika', 'Afrique du Sud', 'दक्षिण अफ़्रीका', '南非', '南非'),
  ng: c('🇳🇬', '나이지리아', 'Nigeria', 'Nigeria', 'Nigéria', 'ナイジェリア', 'Nigeria', 'Nigeria', 'नाइजीरिया', '尼日利亚', '奈及利亞'),
  ke: c('🇰🇪', '케냐', 'Kenya', 'Kenia', 'Quênia', 'ケニア', 'Kenia', 'Kenya', 'केन्या', '肯尼亚', '肯亞'),
  ma: c('🇲🇦', '모로코', 'Morocco', 'Marruecos', 'Marrocos', 'モロッコ', 'Marokko', 'Maroc', 'मोरक्को', '摩洛哥', '摩洛哥'),
  et: c('🇪🇹', '에티오피아', 'Ethiopia', 'Etiopía', 'Etiópia', 'エチオピア', 'Äthiopien', 'Éthiopie', 'इथियोपिया', '埃塞俄比亚', '衣索比亞'),
  au: c('🇦🇺', '오스트레일리아', 'Australia', 'Australia', 'Austrália', 'オーストラリア', 'Australien', 'Australie', 'ऑस्ट्रेलिया', '澳大利亚', '澳洲'),
  nz: c('🇳🇿', '뉴질랜드', 'New Zealand', 'Nueva Zelanda', 'Nova Zelândia', 'ニュージーランド', 'Neuseeland', 'Nouvelle-Zélande', 'न्यूज़ीलैंड', '新西兰', '紐西蘭'),
  uz: c('🇺🇿', '우즈베키스탄', 'Uzbekistan', 'Uzbekistán', 'Uzbequistão', 'ウズベキスタン', 'Usbekistan', 'Ouzbékistan', 'उज़्बेकिस्तान', '乌兹别克斯坦', '烏茲別克'),
  kz: c('🇰🇿', '카자흐스탄', 'Kazakhstan', 'Kazajistán', 'Cazaquistão', 'カザフスタン', 'Kasachstan', 'Kazakhstan', 'क़ज़ाख़िस्तान', '哈萨克斯坦', '哈薩克'),
  np: c('🇳🇵', '네팔', 'Nepal', 'Nepal', 'Nepal', 'ネパール', 'Nepal', 'Népal', 'नेपाल', '尼泊尔', '尼泊爾'),
  lk: c('🇱🇰', '스리랑카', 'Sri Lanka', 'Sri Lanka', 'Sri Lanka', 'スリランカ', 'Sri Lanka', 'Sri Lanka', 'श्रीलंका', '斯里兰卡', '斯里蘭卡'),
  ir: c('🇮🇷', '이란', 'Iran', 'Irán', 'Irã', 'イラン', 'Iran', 'Iran', 'ईरान', '伊朗', '伊朗'),
  is: c('🇮🇸', '아이슬란드', 'Iceland', 'Islandia', 'Islândia', 'アイスランド', 'Island', 'Islande', 'आइसलैंड', '冰岛', '冰島'),
};

export interface TimeCity {
  slug: string;
  /** IANA 시간대 — 오프셋·서머타임·현재 시각이 여기서 나온다 */
  zone: string;
  /** TIME_COUNTRIES의 열쇠 */
  country: string;
  name: L<string>;
}

const t = (
  slug: string, zone: string, country: string,
  ko: string, en: string, es: string, pt: string, ja: string, de: string, fr: string, hi: string,
  zh: string, tw: string,
): TimeCity => ({ slug, zone, country, name: { ko, en, es, pt, ja, de, fr, hi, zh, tw } });

export const TIME_CITIES: TimeCity[] = [
  /* ───────── 동아시아 ───────── */
  t('seoul', 'Asia/Seoul', 'kr', '서울', 'Seoul', 'Seúl', 'Seul', 'ソウル', 'Seoul', 'Séoul', 'सिओल', '首尔', '首爾'),
  t('busan', 'Asia/Seoul', 'kr', '부산', 'Busan', 'Busan', 'Busan', '釜山', 'Busan', 'Busan', 'बुसान', '釜山', '釜山'),
  t('tokyo', 'Asia/Tokyo', 'jp', '도쿄', 'Tokyo', 'Tokio', 'Tóquio', '東京', 'Tokio', 'Tokyo', 'टोक्यो', '东京', '東京'),
  t('osaka', 'Asia/Tokyo', 'jp', '오사카', 'Osaka', 'Osaka', 'Osaka', '大阪', 'Osaka', 'Osaka', 'ओसाका', '大阪', '大阪'),
  t('sapporo', 'Asia/Tokyo', 'jp', '삿포로', 'Sapporo', 'Sapporo', 'Sapporo', '札幌', 'Sapporo', 'Sapporo', 'साप्पोरो', '札幌', '札幌'),
  t('fukuoka', 'Asia/Tokyo', 'jp', '후쿠오카', 'Fukuoka', 'Fukuoka', 'Fukuoka', '福岡', 'Fukuoka', 'Fukuoka', 'फुकुओका', '福冈', '福岡'),
  t('beijing', 'Asia/Shanghai', 'cn', '베이징', 'Beijing', 'Pekín', 'Pequim', '北京', 'Peking', 'Pékin', 'बीजिंग', '北京', '北京'),
  t('shanghai', 'Asia/Shanghai', 'cn', '상하이', 'Shanghai', 'Shanghái', 'Xangai', '上海', 'Shanghai', 'Shanghai', 'शंघाई', '上海', '上海'),
  t('shenzhen', 'Asia/Shanghai', 'cn', '선전', 'Shenzhen', 'Shenzhen', 'Shenzhen', '深圳', 'Shenzhen', 'Shenzhen', 'शेनज़ेन', '深圳', '深圳'),
  t('taipei', 'Asia/Taipei', 'tw', '타이베이', 'Taipei', 'Taipéi', 'Taipé', '台北', 'Taipeh', 'Taipei', 'ताइपे', '台北', '台北'),
  t('hong-kong', 'Asia/Hong_Kong', 'hk', '홍콩', 'Hong Kong', 'Hong Kong', 'Hong Kong', '香港', 'Hongkong', 'Hong Kong', 'हॉन्ग कॉन्ग', '香港', '香港'),

  /* ───────── 동남·남아시아 ───────── */
  t('singapore', 'Asia/Singapore', 'sg', '싱가포르', 'Singapore', 'Singapur', 'Singapura', 'シンガポール', 'Singapur', 'Singapour', 'सिंगापुर', '新加坡', '新加坡'),
  t('bangkok', 'Asia/Bangkok', 'th', '방콕', 'Bangkok', 'Bangkok', 'Bangkok', 'バンコク', 'Bangkok', 'Bangkok', 'बैंकॉक', '曼谷', '曼谷'),
  t('hanoi', 'Asia/Ho_Chi_Minh', 'vn', '하노이', 'Hanoi', 'Hanói', 'Hanói', 'ハノイ', 'Hanoi', 'Hanoï', 'हनोई', '河内', '河內'),
  t('ho-chi-minh', 'Asia/Ho_Chi_Minh', 'vn', '호찌민', 'Ho Chi Minh City', 'Ciudad Ho Chi Minh', 'Cidade de Ho Chi Minh', 'ホーチミン', 'Ho-Chi-Minh-Stadt', 'Hô Chi Minh-Ville', 'हो ची मिन्ह', '胡志明市', '胡志明市'),
  t('manila', 'Asia/Manila', 'ph', '마닐라', 'Manila', 'Manila', 'Manila', 'マニラ', 'Manila', 'Manille', 'मनीला', '马尼拉', '馬尼拉'),
  t('jakarta', 'Asia/Jakarta', 'id', '자카르타', 'Jakarta', 'Yakarta', 'Jacarta', 'ジャカルタ', 'Jakarta', 'Jakarta', 'जकार्ता', '雅加达', '雅加達'),
  t('bali', 'Asia/Makassar', 'id', '발리', 'Bali', 'Bali', 'Bali', 'バリ', 'Bali', 'Bali', 'बाली', '巴厘岛', '峇里島'),
  t('kuala-lumpur', 'Asia/Kuala_Lumpur', 'my', '쿠알라룸푸르', 'Kuala Lumpur', 'Kuala Lumpur', 'Kuala Lumpur', 'クアラルンプール', 'Kuala Lumpur', 'Kuala Lumpur', 'कुआलालंपुर', '吉隆坡', '吉隆坡'),
  t('delhi', 'Asia/Kolkata', 'in', '델리', 'Delhi', 'Delhi', 'Délhi', 'デリー', 'Delhi', 'Delhi', 'दिल्ली', '德里', '德里'),
  t('mumbai', 'Asia/Kolkata', 'in', '뭄바이', 'Mumbai', 'Bombay', 'Mumbai', 'ムンバイ', 'Mumbai', 'Mumbai', 'मुंबई', '孟买', '孟買'),
  t('bengaluru', 'Asia/Kolkata', 'in', '벵갈루루', 'Bengaluru', 'Bangalore', 'Bengaluru', 'ベンガルール', 'Bengaluru', 'Bangalore', 'बेंगलुरु', '班加罗尔', '邦加羅爾'),
  t('chennai', 'Asia/Kolkata', 'in', '첸나이', 'Chennai', 'Chennai', 'Chennai', 'チェンナイ', 'Chennai', 'Chennai', 'चेन्नई', '金奈', '清奈'),
  t('kolkata', 'Asia/Kolkata', 'in', '콜카타', 'Kolkata', 'Calcuta', 'Calcutá', 'コルカタ', 'Kalkutta', 'Calcutta', 'कोलकाता', '加尔各答', '加爾各答'),
  t('hyderabad', 'Asia/Kolkata', 'in', '하이데라바드', 'Hyderabad', 'Hyderabad', 'Hyderabad', 'ハイデラバード', 'Hyderabad', 'Hyderabad', 'हैदराबाद', '海得拉巴', '海德拉巴'),
  t('karachi', 'Asia/Karachi', 'pk', '카라치', 'Karachi', 'Karachi', 'Karachi', 'カラチ', 'Karatschi', 'Karachi', 'कराची', '卡拉奇', '喀拉蚩'),
  t('lahore', 'Asia/Karachi', 'pk', '라호르', 'Lahore', 'Lahore', 'Lahore', 'ラホール', 'Lahore', 'Lahore', 'लाहौर', '拉合尔', '拉合爾'),
  t('dhaka', 'Asia/Dhaka', 'bd', '다카', 'Dhaka', 'Daca', 'Daca', 'ダッカ', 'Dhaka', 'Dacca', 'ढाका', '达卡', '達卡'),
  t('kathmandu', 'Asia/Kathmandu', 'np', '카트만두', 'Kathmandu', 'Katmandú', 'Katmandu', 'カトマンズ', 'Kathmandu', 'Katmandou', 'काठमांडू', '加德满都', '加德滿都'),
  t('colombo', 'Asia/Colombo', 'lk', '콜롬보', 'Colombo', 'Colombo', 'Colombo', 'コロンボ', 'Colombo', 'Colombo', 'कोलंबो', '科伦坡', '可倫坡'),
  t('tashkent', 'Asia/Tashkent', 'uz', '타슈켄트', 'Tashkent', 'Taskent', 'Tasquente', 'タシケント', 'Taschkent', 'Tachkent', 'ताशकंद', '塔什干', '塔什干'),
  t('almaty', 'Asia/Almaty', 'kz', '알마티', 'Almaty', 'Almatý', 'Almaty', 'アルマトイ', 'Almaty', 'Almaty', 'अल्माटी', '阿拉木图', '阿拉木圖'),

  /* ───────── 중동 ───────── */
  t('dubai', 'Asia/Dubai', 'ae', '두바이', 'Dubai', 'Dubái', 'Dubai', 'ドバイ', 'Dubai', 'Dubaï', 'दुबई', '迪拜', '杜拜'),
  t('abu-dhabi', 'Asia/Dubai', 'ae', '아부다비', 'Abu Dhabi', 'Abu Dabi', 'Abu Dhabi', 'アブダビ', 'Abu Dhabi', 'Abou Dabi', 'अबू धाबी', '阿布扎比', '阿布達比'),
  t('riyadh', 'Asia/Riyadh', 'sa', '리야드', 'Riyadh', 'Riad', 'Riade', 'リヤド', 'Riad', 'Riyad', 'रियाद', '利雅得', '利雅德'),
  t('doha', 'Asia/Qatar', 'qa', '도하', 'Doha', 'Doha', 'Doha', 'ドーハ', 'Doha', 'Doha', 'दोहा', '多哈', '杜哈'),
  t('tel-aviv', 'Asia/Jerusalem', 'il', '텔아비브', 'Tel Aviv', 'Tel Aviv', 'Tel Aviv', 'テルアビブ', 'Tel Aviv', 'Tel-Aviv', 'तेल अवीव', '特拉维夫', '特拉維夫'),
  t('tehran', 'Asia/Tehran', 'ir', '테헤란', 'Tehran', 'Teherán', 'Teerã', 'テヘラン', 'Teheran', 'Téhéran', 'तेहरान', '德黑兰', '德黑蘭'),
  t('istanbul', 'Europe/Istanbul', 'tr', '이스탄불', 'Istanbul', 'Estambul', 'Istambul', 'イスタンブール', 'Istanbul', 'Istanbul', 'इस्तानबुल', '伊斯坦布尔', '伊斯坦堡'),

  /* ───────── 유럽 ───────── */
  t('london', 'Europe/London', 'gb', '런던', 'London', 'Londres', 'Londres', 'ロンドン', 'London', 'Londres', 'लंदन', '伦敦', '倫敦'),
  t('manchester', 'Europe/London', 'gb', '맨체스터', 'Manchester', 'Mánchester', 'Manchester', 'マンチェスター', 'Manchester', 'Manchester', 'मैनचेस्टर', '曼彻斯特', '曼徹斯特'),
  t('edinburgh', 'Europe/London', 'gb', '에든버러', 'Edinburgh', 'Edimburgo', 'Edimburgo', 'エディンバラ', 'Edinburgh', 'Édimbourg', 'एडिनबर्ग', '爱丁堡', '愛丁堡'),
  t('dublin', 'Europe/Dublin', 'ie', '더블린', 'Dublin', 'Dublín', 'Dublin', 'ダブリン', 'Dublin', 'Dublin', 'डबलिन', '都柏林', '都柏林'),
  t('paris', 'Europe/Paris', 'fr', '파리', 'Paris', 'París', 'Paris', 'パリ', 'Paris', 'Paris', 'पेरिस', '巴黎', '巴黎'),
  t('lyon', 'Europe/Paris', 'fr', '리옹', 'Lyon', 'Lyon', 'Lyon', 'リヨン', 'Lyon', 'Lyon', 'ल्योन', '里昂', '里昂'),
  t('nice', 'Europe/Paris', 'fr', '니스', 'Nice', 'Niza', 'Nice', 'ニース', 'Nizza', 'Nice', 'नीस', '尼斯', '尼斯'),
  t('berlin', 'Europe/Berlin', 'de', '베를린', 'Berlin', 'Berlín', 'Berlim', 'ベルリン', 'Berlin', 'Berlin', 'बर्लिन', '柏林', '柏林'),
  t('munich', 'Europe/Berlin', 'de', '뮌헨', 'Munich', 'Múnich', 'Munique', 'ミュンヘン', 'München', 'Munich', 'म्यूनिक', '慕尼黑', '慕尼黑'),
  t('frankfurt', 'Europe/Berlin', 'de', '프랑크푸르트', 'Frankfurt', 'Fráncfort', 'Frankfurt', 'フランクフルト', 'Frankfurt', 'Francfort', 'फ़्रैंकफ़र्ट', '法兰克福', '法蘭克福'),
  t('hamburg', 'Europe/Berlin', 'de', '함부르크', 'Hamburg', 'Hamburgo', 'Hamburgo', 'ハンブルク', 'Hamburg', 'Hambourg', 'हैम्बर्ग', '汉堡', '漢堡'),
  t('madrid', 'Europe/Madrid', 'es', '마드리드', 'Madrid', 'Madrid', 'Madri', 'マドリード', 'Madrid', 'Madrid', 'मैड्रिड', '马德里', '馬德里'),
  t('barcelona', 'Europe/Madrid', 'es', '바르셀로나', 'Barcelona', 'Barcelona', 'Barcelona', 'バルセロナ', 'Barcelona', 'Barcelone', 'बार्सिलोना', '巴塞罗那', '巴塞隆納'),
  t('lisbon', 'Europe/Lisbon', 'pt', '리스본', 'Lisbon', 'Lisboa', 'Lisboa', 'リスボン', 'Lissabon', 'Lisbonne', 'लिस्बन', '里斯本', '里斯本'),
  t('porto', 'Europe/Lisbon', 'pt', '포르투', 'Porto', 'Oporto', 'Porto', 'ポルト', 'Porto', 'Porto', 'पोर्टो', '波尔图', '波多'),
  t('rome', 'Europe/Rome', 'it', '로마', 'Rome', 'Roma', 'Roma', 'ローマ', 'Rom', 'Rome', 'रोम', '罗马', '羅馬'),
  t('milan', 'Europe/Rome', 'it', '밀라노', 'Milan', 'Milán', 'Milão', 'ミラノ', 'Mailand', 'Milan', 'मिलान', '米兰', '米蘭'),
  t('venice', 'Europe/Rome', 'it', '베네치아', 'Venice', 'Venecia', 'Veneza', 'ヴェネツィア', 'Venedig', 'Venise', 'वेनिस', '威尼斯', '威尼斯'),
  t('amsterdam', 'Europe/Amsterdam', 'nl', '암스테르담', 'Amsterdam', 'Ámsterdam', 'Amsterdã', 'アムステルダム', 'Amsterdam', 'Amsterdam', 'एम्स्टर्डम', '阿姆斯特丹', '阿姆斯特丹'),
  t('brussels', 'Europe/Brussels', 'be', '브뤼셀', 'Brussels', 'Bruselas', 'Bruxelas', 'ブリュッセル', 'Brüssel', 'Bruxelles', 'ब्रसेल्स', '布鲁塞尔', '布魯塞爾'),
  t('zurich', 'Europe/Zurich', 'ch', '취리히', 'Zurich', 'Zúrich', 'Zurique', 'チューリッヒ', 'Zürich', 'Zurich', 'ज़्यूरिख', '苏黎世', '蘇黎世'),
  t('geneva', 'Europe/Zurich', 'ch', '제네바', 'Geneva', 'Ginebra', 'Genebra', 'ジュネーブ', 'Genf', 'Genève', 'जिनेवा', '日内瓦', '日內瓦'),
  t('vienna', 'Europe/Vienna', 'at', '빈', 'Vienna', 'Viena', 'Viena', 'ウィーン', 'Wien', 'Vienne', 'वियना', '维也纳', '維也納'),
  t('stockholm', 'Europe/Stockholm', 'se', '스톡홀름', 'Stockholm', 'Estocolmo', 'Estocolmo', 'ストックホルム', 'Stockholm', 'Stockholm', 'स्टॉकहोम', '斯德哥尔摩', '斯德哥爾摩'),
  t('oslo', 'Europe/Oslo', 'no', '오슬로', 'Oslo', 'Oslo', 'Oslo', 'オスロ', 'Oslo', 'Oslo', 'ओस्लो', '奥斯陆', '奧斯陸'),
  t('copenhagen', 'Europe/Copenhagen', 'dk', '코펜하겐', 'Copenhagen', 'Copenhague', 'Copenhague', 'コペンハーゲン', 'Kopenhagen', 'Copenhague', 'कोपेनहेगन', '哥本哈根', '哥本哈根'),
  t('helsinki', 'Europe/Helsinki', 'fi', '헬싱키', 'Helsinki', 'Helsinki', 'Helsinque', 'ヘルシンキ', 'Helsinki', 'Helsinki', 'हेलसिंकी', '赫尔辛基', '赫爾辛基'),
  t('warsaw', 'Europe/Warsaw', 'pl', '바르샤바', 'Warsaw', 'Varsovia', 'Varsóvia', 'ワルシャワ', 'Warschau', 'Varsovie', 'वारसॉ', '华沙', '華沙'),
  t('prague', 'Europe/Prague', 'cz', '프라하', 'Prague', 'Praga', 'Praga', 'プラハ', 'Prag', 'Prague', 'प्राग', '布拉格', '布拉格'),
  t('budapest', 'Europe/Budapest', 'hu', '부다페스트', 'Budapest', 'Budapest', 'Budapeste', 'ブダペスト', 'Budapest', 'Budapest', 'बुडापेस्ट', '布达佩斯', '布達佩斯'),
  t('athens', 'Europe/Athens', 'gr', '아테네', 'Athens', 'Atenas', 'Atenas', 'アテネ', 'Athen', 'Athènes', 'एथेंस', '雅典', '雅典'),
  t('kyiv', 'Europe/Kyiv', 'ua', '키이우', 'Kyiv', 'Kiev', 'Kiev', 'キーウ', 'Kyjiw', 'Kyiv', 'कीव', '基辅', '基輔'),
  t('bucharest', 'Europe/Bucharest', 'ro', '부쿠레슈티', 'Bucharest', 'Bucarest', 'Bucareste', 'ブカレスト', 'Bukarest', 'Bucarest', 'बुख़ारेस्ट', '布加勒斯特', '布加勒斯特'),
  t('moscow', 'Europe/Moscow', 'ru', '모스크바', 'Moscow', 'Moscú', 'Moscou', 'モスクワ', 'Moskau', 'Moscou', 'मॉस्को', '莫斯科', '莫斯科'),
  t('reykjavik', 'Atlantic/Reykjavik', 'is', '레이캬비크', 'Reykjavik', 'Reikiavik', 'Reiquiavique', 'レイキャビク', 'Reykjavík', 'Reykjavik', 'रेक्याविक', '雷克雅未克', '雷克雅維克'),

  /* ───────── 북미 ───────── */
  t('new-york', 'America/New_York', 'us', '뉴욕', 'New York', 'Nueva York', 'Nova York', 'ニューヨーク', 'New York', 'New York', 'न्यूयॉर्क', '纽约', '紐約'),
  t('washington', 'America/New_York', 'us', '워싱턴', 'Washington, D.C.', 'Washington D. C.', 'Washington, D.C.', 'ワシントンD.C.', 'Washington, D.C.', 'Washington', 'वाशिंगटन डीसी', '华盛顿特区', '華盛頓特區'),
  t('boston', 'America/New_York', 'us', '보스턴', 'Boston', 'Boston', 'Boston', 'ボストン', 'Boston', 'Boston', 'बोस्टन', '波士顿', '波士頓'),
  t('miami', 'America/New_York', 'us', '마이애미', 'Miami', 'Miami', 'Miami', 'マイアミ', 'Miami', 'Miami', 'मियामी', '迈阿密', '邁阿密'),
  t('atlanta', 'America/New_York', 'us', '애틀랜타', 'Atlanta', 'Atlanta', 'Atlanta', 'アトランタ', 'Atlanta', 'Atlanta', 'अटलांटा', '亚特兰大', '亞特蘭大'),
  t('chicago', 'America/Chicago', 'us', '시카고', 'Chicago', 'Chicago', 'Chicago', 'シカゴ', 'Chicago', 'Chicago', 'शिकागो', '芝加哥', '芝加哥'),
  t('houston', 'America/Chicago', 'us', '휴스턴', 'Houston', 'Houston', 'Houston', 'ヒューストン', 'Houston', 'Houston', 'ह्यूस्टन', '休斯顿', '休士頓'),
  t('dallas', 'America/Chicago', 'us', '댈러스', 'Dallas', 'Dallas', 'Dallas', 'ダラス', 'Dallas', 'Dallas', 'डलास', '达拉斯', '達拉斯'),
  t('denver', 'America/Denver', 'us', '덴버', 'Denver', 'Denver', 'Denver', 'デンバー', 'Denver', 'Denver', 'डेनवर', '丹佛', '丹佛'),
  t('phoenix', 'America/Phoenix', 'us', '피닉스', 'Phoenix', 'Phoenix', 'Phoenix', 'フェニックス', 'Phoenix', 'Phoenix', 'फ़ीनिक्स', '凤凰城', '鳳凰城'),
  t('los-angeles', 'America/Los_Angeles', 'us', '로스앤젤레스', 'Los Angeles', 'Los Ángeles', 'Los Angeles', 'ロサンゼルス', 'Los Angeles', 'Los Angeles', 'लॉस एंजेलिस', '洛杉矶', '洛杉磯'),
  t('san-francisco', 'America/Los_Angeles', 'us', '샌프란시스코', 'San Francisco', 'San Francisco', 'São Francisco', 'サンフランシスコ', 'San Francisco', 'San Francisco', 'सैन फ़्रांसिस्को', '旧金山', '舊金山'),
  t('seattle', 'America/Los_Angeles', 'us', '시애틀', 'Seattle', 'Seattle', 'Seattle', 'シアトル', 'Seattle', 'Seattle', 'सिएटल', '西雅图', '西雅圖'),
  t('las-vegas', 'America/Los_Angeles', 'us', '라스베이거스', 'Las Vegas', 'Las Vegas', 'Las Vegas', 'ラスベガス', 'Las Vegas', 'Las Vegas', 'लास वेगास', '拉斯维加斯', '拉斯維加斯'),
  t('honolulu', 'Pacific/Honolulu', 'us', '호놀룰루', 'Honolulu', 'Honolulu', 'Honolulu', 'ホノルル', 'Honolulu', 'Honolulu', 'होनोलूलू', '檀香山', '檀香山'),
  t('anchorage', 'America/Anchorage', 'us', '앵커리지', 'Anchorage', 'Anchorage', 'Anchorage', 'アンカレッジ', 'Anchorage', 'Anchorage', 'एंकरेज', '安克雷奇', '安克拉治'),
  t('toronto', 'America/Toronto', 'ca', '토론토', 'Toronto', 'Toronto', 'Toronto', 'トロント', 'Toronto', 'Toronto', 'टोरंटो', '多伦多', '多倫多'),
  t('montreal', 'America/Toronto', 'ca', '몬트리올', 'Montreal', 'Montreal', 'Montreal', 'モントリオール', 'Montreal', 'Montréal', 'मॉन्ट्रियल', '蒙特利尔', '蒙特婁'),
  t('vancouver', 'America/Vancouver', 'ca', '밴쿠버', 'Vancouver', 'Vancouver', 'Vancouver', 'バンクーバー', 'Vancouver', 'Vancouver', 'वैंकूवर', '温哥华', '溫哥華'),
  t('mexico-city', 'America/Mexico_City', 'mx', '멕시코시티', 'Mexico City', 'Ciudad de México', 'Cidade do México', 'メキシコシティ', 'Mexiko-Stadt', 'Mexico', 'मेक्सिको सिटी', '墨西哥城', '墨西哥城'),
  t('cancun', 'America/Cancun', 'mx', '칸쿤', 'Cancún', 'Cancún', 'Cancún', 'カンクン', 'Cancún', 'Cancún', 'कैनकुन', '坎昆', '坎昆'),

  /* ───────── 남미 ───────── */
  t('sao-paulo', 'America/Sao_Paulo', 'br', '상파울루', 'São Paulo', 'São Paulo', 'São Paulo', 'サンパウロ', 'São Paulo', 'São Paulo', 'साओ पाउलो', '圣保罗', '聖保羅'),
  t('rio-de-janeiro', 'America/Sao_Paulo', 'br', '리우데자네이루', 'Rio de Janeiro', 'Río de Janeiro', 'Rio de Janeiro', 'リオデジャネイロ', 'Rio de Janeiro', 'Rio de Janeiro', 'रियो डी जनेरो', '里约热内卢', '里約熱內盧'),
  t('brasilia', 'America/Sao_Paulo', 'br', '브라질리아', 'Brasília', 'Brasilia', 'Brasília', 'ブラジリア', 'Brasília', 'Brasília', 'ब्रासीलिया', '巴西利亚', '巴西利亞'),
  t('manaus', 'America/Manaus', 'br', '마나우스', 'Manaus', 'Manaos', 'Manaus', 'マナウス', 'Manaus', 'Manaus', 'मनौस', '马瑙斯', '瑪瑙斯'),
  t('buenos-aires', 'America/Argentina/Buenos_Aires', 'ar', '부에노스아이레스', 'Buenos Aires', 'Buenos Aires', 'Buenos Aires', 'ブエノスアイレス', 'Buenos Aires', 'Buenos Aires', 'ब्यूनस आयर्स', '布宜诺斯艾利斯', '布宜諾斯艾利斯'),
  t('santiago', 'America/Santiago', 'cl', '산티아고', 'Santiago', 'Santiago de Chile', 'Santiago', 'サンティアゴ', 'Santiago de Chile', 'Santiago', 'सैंटियागो', '圣地亚哥', '聖地牙哥'),
  t('lima', 'America/Lima', 'pe', '리마', 'Lima', 'Lima', 'Lima', 'リマ', 'Lima', 'Lima', 'लीमा', '利马', '利馬'),
  t('bogota', 'America/Bogota', 'co', '보고타', 'Bogotá', 'Bogotá', 'Bogotá', 'ボゴタ', 'Bogotá', 'Bogota', 'बोगोटा', '波哥大', '波哥大'),

  /* ───────── 아프리카 ───────── */
  t('cairo', 'Africa/Cairo', 'eg', '카이로', 'Cairo', 'El Cairo', 'Cairo', 'カイロ', 'Kairo', 'Le Caire', 'क़ाहिरा', '开罗', '開羅'),
  t('johannesburg', 'Africa/Johannesburg', 'za', '요하네스버그', 'Johannesburg', 'Johannesburgo', 'Joanesburgo', 'ヨハネスブルグ', 'Johannesburg', 'Johannesburg', 'जोहानसबर्ग', '约翰内斯堡', '約翰尼斯堡'),
  t('cape-town', 'Africa/Johannesburg', 'za', '케이프타운', 'Cape Town', 'Ciudad del Cabo', 'Cidade do Cabo', 'ケープタウン', 'Kapstadt', 'Le Cap', 'केप टाउन', '开普敦', '開普敦'),
  t('lagos', 'Africa/Lagos', 'ng', '라고스', 'Lagos', 'Lagos', 'Lagos', 'ラゴス', 'Lagos', 'Lagos', 'लागोस', '拉各斯', '拉各斯'),
  t('nairobi', 'Africa/Nairobi', 'ke', '나이로비', 'Nairobi', 'Nairobi', 'Nairóbi', 'ナイロビ', 'Nairobi', 'Nairobi', 'नैरोबी', '内罗毕', '奈洛比'),
  t('casablanca', 'Africa/Casablanca', 'ma', '카사블랑카', 'Casablanca', 'Casablanca', 'Casablanca', 'カサブランカ', 'Casablanca', 'Casablanca', 'कासाब्लांका', '卡萨布兰卡', '卡薩布蘭加'),
  t('addis-ababa', 'Africa/Addis_Ababa', 'et', '아디스아바바', 'Addis Ababa', 'Adís Abeba', 'Adis Abeba', 'アディスアベバ', 'Addis Abeba', 'Addis-Abeba', 'अदीस अबाबा', '亚的斯亚贝巴', '阿迪斯阿貝巴'),

  /* ───────── 오세아니아 ───────── */
  t('sydney', 'Australia/Sydney', 'au', '시드니', 'Sydney', 'Sídney', 'Sydney', 'シドニー', 'Sydney', 'Sydney', 'सिडनी', '悉尼', '雪梨'),
  t('melbourne', 'Australia/Melbourne', 'au', '멜버른', 'Melbourne', 'Melbourne', 'Melbourne', 'メルボルン', 'Melbourne', 'Melbourne', 'मेलबर्न', '墨尔本', '墨爾本'),
  t('brisbane', 'Australia/Brisbane', 'au', '브리즈번', 'Brisbane', 'Brisbane', 'Brisbane', 'ブリスベン', 'Brisbane', 'Brisbane', 'ब्रिस्बेन', '布里斯班', '布里斯本'),
  t('perth', 'Australia/Perth', 'au', '퍼스', 'Perth', 'Perth', 'Perth', 'パース', 'Perth', 'Perth', 'पर्थ', '珀斯', '伯斯'),
  t('adelaide', 'Australia/Adelaide', 'au', '애들레이드', 'Adelaide', 'Adelaida', 'Adelaide', 'アデレード', 'Adelaide', 'Adélaïde', 'एडिलेड', '阿德莱德', '阿得雷德'),
  t('auckland', 'Pacific/Auckland', 'nz', '오클랜드', 'Auckland', 'Auckland', 'Auckland', 'オークランド', 'Auckland', 'Auckland', 'ऑकलैंड', '奥克兰', '奧克蘭'),

  /* ───────── 뒤에 더한 도시들 ───────── */
  t('incheon', 'Asia/Seoul', 'kr', '인천', 'Incheon', 'Incheon', 'Incheon', '仁川', 'Incheon', 'Incheon', 'इंचियोन', '仁川', '仁川'),
  t('daegu', 'Asia/Seoul', 'kr', '대구', 'Daegu', 'Daegu', 'Daegu', '大邱', 'Daegu', 'Daegu', 'डेगू', '大邱', '大邱'),
  t('kyoto', 'Asia/Tokyo', 'jp', '교토', 'Kyoto', 'Kioto', 'Quioto', '京都', 'Kyoto', 'Kyoto', 'क्योटो', '京都', '京都'),
  t('nagoya', 'Asia/Tokyo', 'jp', '나고야', 'Nagoya', 'Nagoya', 'Nagoia', '名古屋', 'Nagoya', 'Nagoya', 'नागोया', '名古屋', '名古屋'),
  t('yokohama', 'Asia/Tokyo', 'jp', '요코하마', 'Yokohama', 'Yokohama', 'Yokohama', '横浜', 'Yokohama', 'Yokohama', 'योकोहामा', '横滨', '橫濱'),
  t('guangzhou', 'Asia/Shanghai', 'cn', '광저우', 'Guangzhou', 'Cantón', 'Cantão', '広州', 'Guangzhou', 'Canton', 'ग्वांगझोउ', '广州', '廣州'),
  t('chengdu', 'Asia/Shanghai', 'cn', '청두', 'Chengdu', 'Chengdú', 'Chengdu', '成都', 'Chengdu', 'Chengdu', 'चेंगदू', '成都', '成都'),
  t('pune', 'Asia/Kolkata', 'in', '푸네', 'Pune', 'Pune', 'Pune', 'プネー', 'Pune', 'Pune', 'पुणे', '浦那', '浦那'),
  t('ahmedabad', 'Asia/Kolkata', 'in', '아마다바드', 'Ahmedabad', 'Ahmedabad', 'Ahmedabad', 'アーメダバード', 'Ahmedabad', 'Ahmedabad', 'अहमदाबाद', '艾哈迈达巴德', '艾哈邁達巴德'),
  t('philadelphia', 'America/New_York', 'us', '필라델피아', 'Philadelphia', 'Filadelfia', 'Filadélfia', 'フィラデルフィア', 'Philadelphia', 'Philadelphie', 'फ़िलाडेल्फ़िया', '费城', '費城'),
  t('san-diego', 'America/Los_Angeles', 'us', '샌디에이고', 'San Diego', 'San Diego', 'San Diego', 'サンディエゴ', 'San Diego', 'San Diego', 'सैन डिएगो', '圣迭戈', '聖地亞哥'),
  t('detroit', 'America/Detroit', 'us', '디트로이트', 'Detroit', 'Detroit', 'Detroit', 'デトロイト', 'Detroit', 'Détroit', 'डेट्रॉयट', '底特律', '底特律'),
  t('cologne', 'Europe/Berlin', 'de', '쾰른', 'Cologne', 'Colonia', 'Colônia', 'ケルン', 'Köln', 'Cologne', 'कोलोन', '科隆', '科隆'),
  t('valencia', 'Europe/Madrid', 'es', '발렌시아', 'Valencia', 'Valencia', 'Valência', 'バレンシア', 'Valencia', 'Valence', 'वालेंसिया', '巴伦西亚', '瓦倫西亞'),
  t('naples', 'Europe/Rome', 'it', '나폴리', 'Naples', 'Nápoles', 'Nápoles', 'ナポリ', 'Neapel', 'Naples', 'नेपल्स', '那不勒斯', '拿坡里'),
  t('marseille', 'Europe/Paris', 'fr', '마르세유', 'Marseille', 'Marsella', 'Marselha', 'マルセイユ', 'Marseille', 'Marseille', 'मार्सेई', '马赛', '馬賽'),
  t('birmingham', 'Europe/London', 'gb', '버밍엄', 'Birmingham', 'Birmingham', 'Birmingham', 'バーミンガム', 'Birmingham', 'Birmingham', 'बर्मिंघम', '伯明翰', '伯明罕'),
  t('saint-petersburg', 'Europe/Moscow', 'ru', '상트페테르부르크', 'Saint Petersburg', 'San Petersburgo', 'São Petersburgo', 'サンクトペテルブルク', 'Sankt Petersburg', 'Saint-Pétersbourg', 'सेंट पीटर्सबर्ग', '圣彼得堡', '聖彼得堡'),
  t('ankara', 'Europe/Istanbul', 'tr', '앙카라', 'Ankara', 'Ankara', 'Ancara', 'アンカラ', 'Ankara', 'Ankara', 'अंकारा', '安卡拉', '安卡拉'),
  t('wellington', 'Pacific/Auckland', 'nz', '웰링턴', 'Wellington', 'Wellington', 'Wellington', 'ウェリントン', 'Wellington', 'Wellington', 'वेलिंगटन', '惠灵顿', '威靈頓'),
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
