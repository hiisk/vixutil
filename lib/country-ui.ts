/**
 * 나라 정보 화면의 3언어 문구와 섹션 설정.
 */
import type { Lang, FormulaLang } from './formula/terms.ts';
import { COUNTRIES, COUNTRY_REGIONS } from './country-tools.ts';
import type { Country } from './country/types.ts';
import { countryText } from './country/types.ts';
import { ALL_LOCALES10, alternateLanguagesFor } from './locales.ts';

export const COUNTRY_UI = {
  ko: {
    home: '홈',
    section: '나라 정보',
    hubTitle: '나라별 여행 정보',
    hubLead: '시차·전압·플러그·국가번호·입국 조건을 나라별로 한 장에',
    hubNotice: '🧭 비자와 입국 조건은 자주 바뀝니다. 출발 전 공관 공지를 확인하세요.',
    footNote: '비자·입국 조건은 정책에 따라 수시로 바뀌므로 반드시 해당 국가 공관의 최신 공지를 확인하세요. 전압과 플러그는 숙소에 따라 다를 수 있습니다.',
    metaTitle: '나라별 여행 정보 — 시차·전압·플러그·국가번호 100개국',
    metaDesc:
      '일본·베트남·프랑스·미국·아이슬란드·케냐 등 100개국의 시차와 현재 시각, 전압과 플러그 타입, 국제전화 국가번호, 통행 방향, 긴급 전화, 입국 조건을 한 장에 모았습니다.',
    capital: '수도',
    languages: '공용어',
    currency: '통화',
    timezone: '표준시',
    nowLocal: '현재 시각',
    koreaGap: '한국과의 시차',
    dial: '국가번호',
    volt: '전압',
    plug: '플러그',
    drive: '통행 방향',
    driveLeft: '좌측통행',
    driveRight: '우측통행',
    emergency: '긴급 전화',
    tld: '도메인',
    visaTitle: '입국·비자',
    tipTitle: '알아두면 좋은 것',
    related: '같은 지역의 나라',
    dstYes: '서머타임 적용',
    dstNo: '서머타임 없음',
    sameTime: '시차 없음',
    ahead: (h: string) => `한국보다 ${h}시간 빠름`,
    behind: (h: string) => `한국보다 ${h}시간 느림`,
    faq1: (n: string) => `${n}과 한국의 시차는 몇 시간인가요?`,
    faq2: (n: string) => `${n}에서 한국 전자제품을 쓸 수 있나요?`,
    faq3: (n: string) => `${n}에 갈 때 비자가 필요한가요?`,
  },
  en: {
    home: 'Home',
    section: 'Country Guide',
    hubTitle: 'Country Travel Facts',
    hubLead: 'Time difference, voltage, plugs, dialling codes and entry rules, one page per country',
    hubNotice: '🧭 Visa and entry rules change often — check the official notice before you fly.',
    footNote: 'Visa and entry requirements change with policy, so always confirm the latest official notice for your destination. Voltage and plug types can vary by building.',
    metaTitle: 'Country Travel Facts — Time Zones, Voltage & Plugs for 100 Countries',
    metaDesc:
      'Time difference and current local time, voltage and plug types, international dialling codes, which side they drive on, emergency numbers and entry rules for 100 countries including Japan, Vietnam, France, Iceland and Kenya.',
    capital: 'Capital',
    languages: 'Languages',
    currency: 'Currency',
    timezone: 'Standard time',
    nowLocal: 'Local time now',
    koreaGap: 'Difference from Korea',
    dial: 'Dialling code',
    volt: 'Voltage',
    plug: 'Plug type',
    drive: 'Driving side',
    driveLeft: 'Left-hand traffic',
    driveRight: 'Right-hand traffic',
    emergency: 'Emergency',
    tld: 'Domain',
    visaTitle: 'Entry & visa',
    tipTitle: 'Worth knowing',
    related: 'Countries in the same region',
    dstYes: 'Observes daylight saving',
    dstNo: 'No daylight saving',
    sameTime: 'Same time as Korea',
    ahead: (h: string) => `${h} hours ahead of Korea`,
    behind: (h: string) => `${h} hours behind Korea`,
    faq1: (n: string) => `What is the time difference between ${n} and Korea?`,
    faq2: (n: string) => `Will Korean electronics work in ${n}?`,
    faq3: (n: string) => `Do I need a visa for ${n}?`,
  },
  es: {
    home: 'Inicio',
    section: 'Guía de países',
    hubTitle: 'Datos de viaje por país',
    hubLead: 'Diferencia horaria, voltaje, enchufes, prefijos y normas de entrada, una página por país',
    hubNotice: '🧭 Las normas de visado y entrada cambian a menudo: consulta el aviso oficial antes de volar.',
    footNote: 'Los requisitos de entrada dependen de tu pasaporte y cambian con la política, así que confirma siempre el aviso oficial del país de destino. El voltaje y el tipo de enchufe pueden variar según el edificio. La diferencia horaria se da en hora estándar; el horario de verano la mueve en cualquiera de los dos extremos.',
    metaTitle: 'Datos de viaje por país — husos, voltaje y enchufes de 100 países',
    metaDesc: 'Diferencia horaria y hora local actual, voltaje y tipo de enchufe, prefijo telefónico, por qué lado se conduce, teléfonos de emergencia y normas de entrada de 100 países, entre ellos Japón, Vietnam, Francia, Islandia y Kenia.',
    capital: 'Capital',
    languages: 'Idiomas',
    currency: 'Moneda',
    timezone: 'Hora estándar',
    nowLocal: 'Hora local ahora',
    koreaGap: 'Diferencia con Madrid',
    dial: 'Prefijo',
    volt: 'Voltaje',
    plug: 'Enchufe',
    drive: 'Sentido de circulación',
    driveLeft: 'Por la izquierda',
    driveRight: 'Por la derecha',
    emergency: 'Emergencias',
    tld: 'Dominio',
    visaTitle: 'Entrada y visado',
    tipTitle: 'Conviene saber',
    related: 'Países de la misma región',
    dstYes: 'Aplica horario de verano',
    dstNo: 'Sin horario de verano',
    sameTime: 'La misma hora que Madrid',
    ahead: (h: string) => `${h} horas por delante de Madrid`,
    behind: (h: string) => `${h} horas por detrás de Madrid`,
    faq1: (n: string) => `¿Cuánta diferencia horaria hay entre ${n} y España?`,
    faq2: (n: string) => `¿Funcionarán mis aparatos en ${n}?`,
    faq3: (n: string) => `¿Necesito visado para ${n}?`,
  },
  'pt-br': {
    home: 'Início',
    section: 'Guia de países',
    hubTitle: 'Informações de viagem por país',
    hubLead: 'Fuso, voltagem, tomadas, código telefônico e regras de entrada, uma página por país',
    hubNotice: '🧭 Regras de visto e entrada mudam com frequência — confira o aviso oficial antes de viajar.',
    footNote: 'As exigências de entrada dependem do seu passaporte e mudam conforme a política, então confirme sempre o aviso oficial do país de destino. Voltagem e tipo de tomada podem variar de prédio para prédio. A diferença de fuso é dada em hora padrão; o horário de verão desloca qualquer uma das duas pontas.',
    metaTitle: 'Informações de viagem por país — fuso, voltagem e tomadas de 100 países',
    metaDesc: 'Diferença de fuso e hora local atual, voltagem e tipo de tomada, código telefônico internacional, de que lado se dirige, telefones de emergência e regras de entrada de 100 países, entre eles Japão, Vietnã, França, Islândia e Quênia.',
    capital: 'Capital',
    languages: 'Idiomas',
    currency: 'Moeda',
    timezone: 'Hora padrão',
    nowLocal: 'Hora local agora',
    koreaGap: 'Diferença para São Paulo',
    dial: 'Código do país',
    volt: 'Voltagem',
    plug: 'Tomada',
    drive: 'Mão de direção',
    driveLeft: 'Mão inglesa',
    driveRight: 'Mão direita',
    emergency: 'Emergência',
    tld: 'Domínio',
    visaTitle: 'Entrada e visto',
    tipTitle: 'Bom saber',
    related: 'Países da mesma região',
    dstYes: 'Adota horário de verão',
    dstNo: 'Sem horário de verão',
    sameTime: 'Mesma hora de São Paulo',
    ahead: (h: string) => `${h} horas à frente de São Paulo`,
    behind: (h: string) => `${h} horas atrás de São Paulo`,
    faq1: (n: string) => `Qual é a diferença de fuso entre ${n} e o Brasil?`,
    faq2: (n: string) => `Meus aparelhos vão funcionar em ${n}?`,
    faq3: (n: string) => `Preciso de visto para ${n}?`,
  },
  ja: {
    home: 'ホーム',
    section: '国の情報',
    hubTitle: '国別の旅行情報',
    hubLead: '時差・電圧・プラグ・国番号・入国条件を国ごとに一枚で',
    hubNotice: '🧭 ビザと入国条件はよく変わります。出発前に公式の案内を確認してください。',
    footNote: '入国の条件は持っている旅券によって違い、方針しだいで変わります。渡航先の公式案内を必ず確認してください。電圧とプラグは建物によって違うことがあります。時差は標準時での値で、サマータイムがあるとどちらの側でも一時間ずれます。',
    metaTitle: '国別の旅行情報 — 時差・電圧・プラグ・国番号100か国',
    metaDesc: '日本・ベトナム・フランス・アイスランド・ケニアなど100か国の時差と現地時刻、電圧とプラグの形、国際電話の国番号、通行の左右、緊急電話、入国条件を一枚にまとめました。',
    capital: '首都',
    languages: '公用語',
    currency: '通貨',
    timezone: '標準時',
    nowLocal: '現地の時刻',
    koreaGap: '日本との時差',
    dial: '国番号',
    volt: '電圧',
    plug: 'プラグ',
    drive: '通行',
    driveLeft: '左側通行',
    driveRight: '右側通行',
    emergency: '緊急電話',
    tld: 'ドメイン',
    visaTitle: '入国・ビザ',
    tipTitle: '知っておくと役立つこと',
    related: '同じ地域の国',
    dstYes: 'サマータイムあり',
    dstNo: 'サマータイムなし',
    sameTime: '時差なし',
    ahead: (h: string) => `日本より${h}時間進んでいます`,
    behind: (h: string) => `日本より${h}時間遅れています`,
    faq1: (n: string) => `${n}と日本の時差は何時間ですか。`,
    faq2: (n: string) => `${n}で日本の電化製品は使えますか。`,
    faq3: (n: string) => `${n}に行くのにビザは必要ですか。`,
  },
  de: {
    home: 'Start',
    section: 'Länderinfos',
    hubTitle: 'Reisefakten nach Land',
    hubLead: 'Zeitverschiebung, Spannung, Stecker, Vorwahl und Einreiseregeln — eine Seite je Land',
    hubNotice: '🧭 Visa- und Einreiseregeln ändern sich oft — prüf vor dem Abflug die amtliche Auskunft.',
    footNote: 'Die Einreisebedingungen hängen von deinem Pass ab und ändern sich mit der Politik, prüf also immer die amtliche Auskunft des Ziellandes. Spannung und Steckertyp können je nach Gebäude abweichen. Die Zeitverschiebung gilt für Normalzeit; die Sommerzeit verschiebt sie auf jeder der beiden Seiten.',
    metaTitle: 'Reisefakten nach Land — Zeitzonen, Spannung und Stecker für 100 Länder',
    metaDesc: 'Zeitverschiebung und aktuelle Ortszeit, Spannung und Steckertyp, Ländervorwahl, Verkehrsseite, Notrufnummern und Einreiseregeln für 100 Länder, darunter Japan, Vietnam, Frankreich, Island und Kenia.',
    capital: 'Hauptstadt',
    languages: 'Sprachen',
    currency: 'Währung',
    timezone: 'Normalzeit',
    nowLocal: 'Ortszeit jetzt',
    koreaGap: 'Unterschied zu Berlin',
    dial: 'Vorwahl',
    volt: 'Spannung',
    plug: 'Stecker',
    drive: 'Verkehrsseite',
    driveLeft: 'Linksverkehr',
    driveRight: 'Rechtsverkehr',
    emergency: 'Notruf',
    tld: 'Domain',
    visaTitle: 'Einreise und Visum',
    tipTitle: 'Gut zu wissen',
    related: 'Länder derselben Region',
    dstYes: 'Mit Sommerzeit',
    dstNo: 'Ohne Sommerzeit',
    sameTime: 'Gleiche Zeit wie Berlin',
    ahead: (h: string) => `${h} Stunden vor Berlin`,
    behind: (h: string) => `${h} Stunden hinter Berlin`,
    faq1: (n: string) => `Wie groß ist die Zeitverschiebung zwischen ${n} und Deutschland?`,
    faq2: (n: string) => `Funktionieren meine Geräte in ${n}?`,
    faq3: (n: string) => `Brauche ich ein Visum für ${n}?`,
  },
  fr: {
    home: 'Accueil',
    section: 'Fiches pays',
    hubTitle: 'Infos voyage par pays',
    hubLead: 'Décalage horaire, tension, prises, indicatif et conditions d’entrée — une page par pays',
    hubNotice: '🧭 Les règles de visa et d’entrée changent souvent — vérifie l’avis officiel avant de partir.',
    footNote: 'Les conditions d’entrée dépendent de ton passeport et changent selon la politique du pays : vérifie toujours l’avis officiel de la destination. La tension et le type de prise peuvent varier d’un bâtiment à l’autre. Le décalage est donné en heure standard ; l’heure d’été le déplace d’un côté comme de l’autre.',
    metaTitle: 'Infos voyage par pays — fuseaux, tension et prises de 100 pays',
    metaDesc: 'Décalage horaire et heure locale, tension et type de prise, indicatif téléphonique, côté de circulation, numéros d’urgence et conditions d’entrée pour 100 pays, dont le Japon, le Vietnam, la France, l’Islande et le Kenya.',
    capital: 'Capitale',
    languages: 'Langues',
    currency: 'Monnaie',
    timezone: 'Heure standard',
    nowLocal: 'Heure locale',
    koreaGap: 'Décalage avec Paris',
    dial: 'Indicatif',
    volt: 'Tension',
    plug: 'Prise',
    drive: 'Sens de circulation',
    driveLeft: 'Conduite à gauche',
    driveRight: 'Conduite à droite',
    emergency: 'Urgences',
    tld: 'Domaine',
    visaTitle: 'Entrée et visa',
    tipTitle: 'Bon à savoir',
    related: 'Pays de la même région',
    dstYes: 'Applique l’heure d’été',
    dstNo: 'Pas d’heure d’été',
    sameTime: 'Même heure qu’à Paris',
    ahead: (h: string) => `${h} heures d’avance sur Paris`,
    behind: (h: string) => `${h} heures de retard sur Paris`,
    faq1: (n: string) => `Quel est le décalage horaire entre ${n} et la France ?`,
    faq2: (n: string) => `Mes appareils fonctionneront-ils en ${n} ?`,
    faq3: (n: string) => `Faut-il un visa pour ${n} ?`,
  },
  hi: {
    home: 'होम',
    section: 'देशों की जानकारी',
    hubTitle: 'देश के हिसाब से यात्रा की जानकारी',
    hubLead: 'समय का फ़र्क़, वोल्टेज, प्लग, देश कोड और प्रवेश के नियम — हर देश का एक पन्ना',
    hubNotice: '🧭 वीज़ा और प्रवेश के नियम अक्सर बदलते हैं — उड़ान से पहले आधिकारिक सूचना देख लें।',
    footNote: 'प्रवेश की शर्तें आपके पासपोर्ट पर निर्भर करती हैं और नीति के साथ बदलती रहती हैं, इसलिए गंतव्य देश की आधिकारिक सूचना हमेशा जाँच लें। वोल्टेज और प्लग इमारत दर इमारत बदल सकते हैं। समय का फ़र्क़ मानक समय के हिसाब से है; डेलाइट सेविंग होने पर यह किसी भी छोर पर खिसक जाता है।',
    metaTitle: 'देशों की यात्रा जानकारी — 100 देशों के समय क्षेत्र, वोल्टेज और प्लग',
    metaDesc: 'जापान, वियतनाम, फ़्रांस, आइसलैंड और केन्या समेत 100 देशों का समय का फ़र्क़ और वहाँ का मौजूदा समय, वोल्टेज और प्लग का प्रकार, अंतरराष्ट्रीय देश कोड, गाड़ी किस ओर चलती है, आपात नंबर और प्रवेश के नियम — सब एक जगह।',
    capital: 'राजधानी',
    languages: 'भाषाएँ',
    currency: 'मुद्रा',
    timezone: 'मानक समय',
    nowLocal: 'वहाँ का समय',
    koreaGap: 'नई दिल्ली से फ़र्क़',
    dial: 'देश कोड',
    volt: 'वोल्टेज',
    plug: 'प्लग',
    drive: 'यातायात की दिशा',
    driveLeft: 'बाएँ चलना',
    driveRight: 'दाएँ चलना',
    emergency: 'आपात नंबर',
    tld: 'डोमेन',
    visaTitle: 'प्रवेश और वीज़ा',
    tipTitle: 'जानने लायक़ बात',
    related: 'इसी क्षेत्र के देश',
    dstYes: 'डेलाइट सेविंग लागू',
    dstNo: 'डेलाइट सेविंग नहीं',
    sameTime: 'नई दिल्ली जैसा ही समय',
    ahead: (h: string) => `नई दिल्ली से ${h} घंटे आगे`,
    behind: (h: string) => `नई दिल्ली से ${h} घंटे पीछे`,
    faq1: (n: string) => `${n} और भारत के बीच कितने घंटे का फ़र्क़ है?`,
    faq2: (n: string) => `क्या ${n} में मेरे उपकरण चलेंगे?`,
    faq3: (n: string) => `${n} जाने के लिए वीज़ा चाहिए?`,
  },
  'zh-hans': {
    home: '首页',
    section: '国家资料',
    hubTitle: '各国旅行资料',
    hubLead: '时差、电压、插头、国际区号、入境条件，一国一页',
    hubNotice: '🧭 签证和入境条件常改。出发前请再看一次官方通告。',
    footNote: '入境条件因所持护照而异，也会随政策改动，出发前请务必查看目的地的官方通告。电压和插头可能因住处而不同。时差按标准时算，任何一边实行夏令时都会差一小时。',
    metaTitle: '各国旅行资料 — 时差·电压·插头·国际区号 100国',
    metaDesc: '日本、越南、法国、美国、冰岛、肯尼亚等100个国家的时差与当地时间、电压与插头形状、国际电话区号、靠哪边行车、紧急电话、入境条件，全在一页里。',
    capital: '首都',
    languages: '官方语言',
    currency: '货币',
    timezone: '标准时',
    nowLocal: '当地时间',
    koreaGap: '与北京的时差',
    dial: '国际区号',
    volt: '电压',
    plug: '插头',
    drive: '行车方向',
    driveLeft: '靠左行驶',
    driveRight: '靠右行驶',
    emergency: '紧急电话',
    tld: '域名',
    visaTitle: '入境·签证',
    tipTitle: '知道了有好处的事',
    related: '同一地区的国家',
    dstYes: '实行夏令时',
    dstNo: '不实行夏令时',
    sameTime: '没有时差',
    ahead: (h: string) => `比北京快${h}小时`,
    behind: (h: string) => `比北京慢${h}小时`,
    faq1: (n: string) => `${n}和北京差几个小时？`,
    faq2: (n: string) => `在${n}能用国内的电器吗？`,
    faq3: (n: string) => `去${n}需要签证吗？`,
  },
  'zh-hant': {
    home: '首頁',
    section: '國家資料',
    hubTitle: '各國旅行資料',
    hubLead: '時差、電壓、插頭、國際區號、入境條件，一國一頁',
    hubNotice: '🧭 簽證和入境條件常改。出發前請再看一次官方公告。',
    footNote: '入境條件因所持護照而異，也會隨政策改動，出發前請務必查看目的地的官方公告。電壓和插頭可能因住處而不同。時差按標準時算，任何一邊實施日光節約時間都會差一小時。',
    metaTitle: '各國旅行資料 — 時差·電壓·插頭·國際區號 100國',
    metaDesc: '日本、越南、法國、美國、冰島、肯亞等100個國家的時差與當地時間、電壓與插頭形狀、國際電話區號、靠哪邊行車、緊急電話、入境條件，全在一頁裡。',
    capital: '首都',
    languages: '官方語言',
    currency: '貨幣',
    timezone: '標準時',
    nowLocal: '當地時間',
    koreaGap: '與台北的時差',
    dial: '國際區號',
    volt: '電壓',
    plug: '插頭',
    drive: '行車方向',
    driveLeft: '靠左行駛',
    driveRight: '靠右行駛',
    emergency: '緊急電話',
    tld: '網域',
    visaTitle: '入境·簽證',
    tipTitle: '知道了有好處的事',
    related: '同一地區的國家',
    dstYes: '實施日光節約時間',
    dstNo: '不實施日光節約時間',
    sameTime: '沒有時差',
    ahead: (h: string) => `比台北快${h}小時`,
    behind: (h: string) => `比台北慢${h}小時`,
    faq1: (n: string) => `${n}和台北差幾個小時？`,
    faq2: (n: string) => `在${n}能用台灣的電器嗎？`,
    faq3: (n: string) => `去${n}需要簽證嗎？`,
  },
} as const;

/**
 * 시차를 재는 기준 도시의 UTC 오프셋.
 *
 * "한국보다 두 시간 빠름"은 독일 독자에게 아무 쓸모가 없다. 언어마다 그 언어를
 * 읽는 사람이 있을 법한 도시를 하나 정하고, 화면 문구도 그 도시 이름으로 쓴다.
 * metro·music 섹션이 이미 같은 방식으로 도시를 언어별로 잡고 있다.
 *
 * en은 한국 기준 그대로 둔다 — 영어 본문 100편이 이미 서울과의 거리·시차를
 * 이야기하고 있어서, 기준만 바꾸면 표와 본문이 서로 어긋난다.
 */
export const REF_UTC: Record<FormulaLang, number> = {
  ko: 9, en: 9, es: 1, 'pt-br': -3, ja: 9, de: 1, fr: 1, hi: 5.5,
  'zh-hans': 8, 'zh-hant': 8,
};

export const COUNTRY_REGION_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '동아시아': '동아시아', '동남아시아': '동남아시아', '서·남아시아': '서·남아시아',
    '유럽': '유럽', '미주': '미주', '오세아니아·아프리카': '오세아니아·아프리카',
  },
  en: {
    '동아시아': 'East Asia', '동남아시아': 'Southeast Asia', '서·남아시아': 'West & South Asia',
    '유럽': 'Europe', '미주': 'Americas', '오세아니아·아프리카': 'Oceania & Africa',
  },
};

export const COUNTRY_REGION_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '동아시아': 'Asia Oriental', '동남아시아': 'Sudeste Asiático', '서·남아시아': 'Asia Occidental y Meridional',
    '유럽': 'Europa', '미주': 'América', '오세아니아·아프리카': 'Oceanía y África',
  },
  'pt-br': {
    '동아시아': 'Ásia Oriental', '동남아시아': 'Sudeste Asiático', '서·남아시아': 'Ásia Ocidental e Meridional',
    '유럽': 'Europa', '미주': 'Américas', '오세아니아·아프리카': 'Oceania e África',
  },
  ja: {
    '동아시아': '東アジア', '동남아시아': '東南アジア', '서·남아시아': '西・南アジア',
    '유럽': 'ヨーロッパ', '미주': '南北アメリカ', '오세아니아·아프리카': 'オセアニア・アフリカ',
  },
  de: {
    '동아시아': 'Ostasien', '동남아시아': 'Südostasien', '서·남아시아': 'West- und Südasien',
    '유럽': 'Europa', '미주': 'Amerika', '오세아니아·아프리카': 'Ozeanien und Afrika',
  },
  fr: {
    '동아시아': 'Asie de l’Est', '동남아시아': 'Asie du Sud-Est', '서·남아시아': 'Asie de l’Ouest et du Sud',
    '유럽': 'Europe', '미주': 'Amériques', '오세아니아·아프리카': 'Océanie et Afrique',
  },
  hi: {
    '동아시아': 'पूर्वी एशिया', '동남아시아': 'दक्षिण-पूर्व एशिया', '서·남아시아': 'पश्चिम और दक्षिण एशिया',
    '유럽': 'यूरोप', '미주': 'अमेरिका महाद्वीप', '오세아니아·아프리카': 'ओशिनिया और अफ़्रीका',
  },
  'zh-hans': {
    '동아시아': '东亚', '동남아시아': '东南亚', '서·남아시아': '西亚·南亚',
    '유럽': '欧洲', '미주': '美洲', '오세아니아·아프리카': '大洋洲·非洲',
  },
  'zh-hant': {
    '동아시아': '東亞', '동남아시아': '東南亞', '서·남아시아': '西亞·南亞',
    '유럽': '歐洲', '미주': '美洲', '오세아니아·아프리카': '大洋洲·非洲',
  },
};

/** 여덟 언어가 다 열려 있다 */
export const COUNTRY_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi', 'zh-hans', 'zh-hant'];

/** 지역 이름 — 번역이 없으면 영어로 떨어뜨린다 */
export const countryRegions = (lang: FormulaLang): Record<string, string> =>
  lang === 'ko' || lang === 'en'
    ? COUNTRY_REGION_LABEL[lang]
    : COUNTRY_REGION_INTL[lang] ?? COUNTRY_REGION_LABEL.en;

export const COUNTRY_SECTION = {
  key: 'country',
  countries: COUNTRIES,
  regions: COUNTRY_REGIONS,
  accent: 'sky' as const,
  grad: 'from-sky-500 to-cyan-600',
  hoverBorder: 'hover:border-sky-300',
  textAccent: 'text-sky-600',
  hoverText: 'group-hover:text-sky-700',
  linkHover: 'hover:text-sky-600',
  ogFrom: '#0ea5e9',
  ogTo: '#0891b2',
};

/** 시차를 사람이 읽는 문장으로 — 30분·45분 단위 나라가 있어 소수를 그대로 못 쓴다 */
export function gapText(c: Country, lang: FormulaLang): string {
  const ui = COUNTRY_UI[lang];
  const diff = c.utc - REF_UTC[lang];
  if (diff === 0) return ui.sameTime;
  const abs = Math.abs(diff);
  const label = Number.isInteger(abs) ? String(abs) : abs.toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
  return diff > 0 ? ui.ahead(label) : ui.behind(label);
}

/** UTC+9:30처럼 표기 — 소수 오프셋을 시:분으로 바꾼다 */
export function utcLabel(utc: number): string {
  // 진짜 마이너스 기호(U+2212)가 보기 좋지만 OG 이미지의 동적 폰트가 이 글자를 받지 못한다
  const sign = utc < 0 ? '-' : '+';
  const abs = Math.abs(utc);
  const h = Math.floor(abs);
  const m = Math.round((abs - h) * 60);
  return `UTC${sign}${h}${m ? `:${String(m).padStart(2, '0')}` : ''}`;
}

export function countryFaq(c: Country, lang: FormulaLang) {
  const ui = COUNTRY_UI[lang];
  const t = countryText(c, lang);
  return [
    { q: ui.faq1(t.name), a: `${gapText(c, lang)} (${utcLabel(c.utc)}). ${c.dst ? ui.dstYes : ui.dstNo}.` },
    { q: ui.faq2(t.name), a: `${ui.volt} ${c.volt} / ${c.hz}, ${ui.plug} ${c.plug}.` },
    { q: ui.faq3(t.name), a: t.visa },
  ];
}

export function countryAlternates(slug?: string) {
  const path = slug ? `/country/${slug}` : '/country';
  return alternateLanguagesFor(path, [...ALL_LOCALES10]);
}
