/**
 * 가전 전류 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "함께 꽂아도 되는가는 와트가 아니라 암페어로 묻는다"이다.
 * 차단기도 멀티탭도 전선도 전부 암페어로 견디고, 그 전류는 전압에 따라 두 배씩
 * 달라진다 — 1600W 드라이어가 220V에서는 7.3A, 120V에서는 13.3A다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { AmpereFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface AmpereUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  drawLabel: string;
  lineVoltLabel: string;
  breakerLabel: string;
  flowLabel: string;
  budgetLabel: string;
  togetherLabel: string;
  minWireLabel: string;
  billLabel: string;
  overTag: string;
  fitTag: string;
  stripOkTag: string;
  stripNoTag: string;
  applianceName: (key: string) => string;
  circuitName: (key: string) => string;
  ampTitle: string;
  ampNote: string;
  voltTitle: string;
  voltNote: string;
  ruleTitle: string;
  ruleNote: string;
  stripTitle: string;
  stripNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  circuitRowTitle: string;
  applianceRowTitle: string;
  desc: (f: AmpereFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: AmpereFacts) => string;
  metaDesc: (f: AmpereFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: AmpereFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 가전 이름은 제목과 질문에서도 같은 것을 쓴다 — SPEC 밖으로 꺼낸다 */
const nameKo = pick({ purifier: '공기청정기', laptop: '노트북', fan: '선풍기', tv: 'TV', fridge: '냉장고', blanket: '전기장판', console: '게임기', desktop: '데스크톱', washer: '세탁기', toaster: '토스터', rice: '전기밥솥', microwave: '전자레인지', coffee: '커피머신', iron: '다리미', dryer: '헤어드라이어', vacuum: '청소기', aircon: '에어컨', kettle: '전기포트', heater: '전기히터', induction: '인덕션' });
const nameEn = pick({ purifier: 'air purifier', laptop: 'laptop', fan: 'fan', tv: 'TV', fridge: 'fridge', blanket: 'heated blanket', console: 'game console', desktop: 'desktop PC', washer: 'washing machine', toaster: 'toaster', rice: 'rice cooker', microwave: 'microwave', coffee: 'coffee machine', iron: 'iron', dryer: 'hair dryer', vacuum: 'vacuum cleaner', aircon: 'air conditioner', kettle: 'electric kettle', heater: 'space heater', induction: 'induction hob' });
const nameEs = pick({ purifier: 'purificador de aire', laptop: 'portátil', fan: 'ventilador', tv: 'televisor', fridge: 'nevera', blanket: 'manta eléctrica', console: 'consola', desktop: 'ordenador de mesa', washer: 'lavadora', toaster: 'tostadora', rice: 'arrocera', microwave: 'microondas', coffee: 'cafetera', iron: 'plancha', dryer: 'secador de pelo', vacuum: 'aspiradora', aircon: 'aire acondicionado', kettle: 'hervidor eléctrico', heater: 'estufa eléctrica', induction: 'placa de inducción' });
const namePt = pick({ purifier: 'purificador de ar', laptop: 'notebook', fan: 'ventilador', tv: 'televisor', fridge: 'geladeira', blanket: 'manta elétrica', console: 'console', desktop: 'computador de mesa', washer: 'máquina de lavar', toaster: 'torradeira', rice: 'panela de arroz', microwave: 'micro-ondas', coffee: 'cafeteira', iron: 'ferro de passar', dryer: 'secador de cabelo', vacuum: 'aspirador', aircon: 'ar-condicionado', kettle: 'chaleira elétrica', heater: 'aquecedor elétrico', induction: 'cooktop de indução' });
const nameJa = pick({ purifier: '空気清浄機', laptop: 'ノートPC', fan: '扇風機', tv: 'テレビ', fridge: '冷蔵庫', blanket: '電気毛布', console: 'ゲーム機', desktop: 'デスクトップPC', washer: '洗濯機', toaster: 'トースター', rice: '炊飯器', microwave: '電子レンジ', coffee: 'コーヒーメーカー', iron: 'アイロン', dryer: 'ドライヤー', vacuum: '掃除機', aircon: 'エアコン', kettle: '電気ケトル', heater: '電気ヒーター', induction: 'IHコンロ' });
const nameDe = pick({ purifier: 'Luftreiniger', laptop: 'Laptop', fan: 'Ventilator', tv: 'Fernseher', fridge: 'Kühlschrank', blanket: 'Heizdecke', console: 'Spielkonsole', desktop: 'Desktop-PC', washer: 'Waschmaschine', toaster: 'Toaster', rice: 'Reiskocher', microwave: 'Mikrowelle', coffee: 'Kaffeemaschine', iron: 'Bügeleisen', dryer: 'Haartrockner', vacuum: 'Staubsauger', aircon: 'Klimagerät', kettle: 'Wasserkocher', heater: 'Heizlüfter', induction: 'Induktionskochfeld' });
const nameFr = pick({ purifier: 'purificateur d’air', laptop: 'ordinateur portable', fan: 'ventilateur', tv: 'téléviseur', fridge: 'réfrigérateur', blanket: 'couverture chauffante', console: 'console de jeu', desktop: 'ordinateur de bureau', washer: 'lave-linge', toaster: 'grille-pain', rice: 'cuiseur à riz', microwave: 'micro-ondes', coffee: 'machine à café', iron: 'fer à repasser', dryer: 'sèche-cheveux', vacuum: 'aspirateur', aircon: 'climatiseur', kettle: 'bouilloire électrique', heater: 'radiateur soufflant', induction: 'plaque à induction' });
const nameHi = pick({ purifier: 'एयर प्यूरीफ़ायर', laptop: 'लैपटॉप', fan: 'पंखा', tv: 'टीवी', fridge: 'फ़्रिज', blanket: 'हीटेड कंबल', console: 'गेम कंसोल', desktop: 'डेस्कटॉप', washer: 'वॉशिंग मशीन', toaster: 'टोस्टर', rice: 'राइस कुकर', microwave: 'माइक्रोवेव', coffee: 'कॉफ़ी मशीन', iron: 'इस्त्री', dryer: 'हेयर ड्रायर', vacuum: 'वैक्यूम क्लीनर', aircon: 'एयर कंडीशनर', kettle: 'इलेक्ट्रिक केतली', heater: 'रूम हीटर', induction: 'इंडक्शन चूल्हा' });
const nameZh = pick({ purifier: '空气净化器', laptop: '笔记本电脑', fan: '电风扇', tv: '电视', fridge: '冰箱', blanket: '电热毯', console: '游戏机', desktop: '台式电脑', washer: '洗衣机', toaster: '烤面包机', rice: '电饭煲', microwave: '微波炉', coffee: '咖啡机', iron: '电熨斗', dryer: '吹风机', vacuum: '吸尘器', aircon: '空调', kettle: '电水壶', heater: '电暖器', induction: '电磁炉' });
const nameTw = pick({ purifier: '空氣清淨機', laptop: '筆記型電腦', fan: '電風扇', tv: '電視', fridge: '冰箱', blanket: '電熱毯', console: '遊戲機', desktop: '桌上型電腦', washer: '洗衣機', toaster: '烤麵包機', rice: '電子鍋', microwave: '微波爐', coffee: '咖啡機', iron: '電熨斗', dryer: '吹風機', vacuum: '吸塵器', aircon: '冷氣', kettle: '電熱水壺', heater: '電暖器', induction: '電磁爐' });

type Spec = { [K in keyof AmpereUI]: L<AmpereUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('가전 전류', 'Appliance current', 'Corriente de electrodomésticos', 'Corrente de eletrodomésticos', '家電の電流', 'Gerätestrom', 'Courant des appareils', 'उपकरण करंट', '家电电流', '家電電流'),

  applianceName: T<(key: string) => string>(nameKo, nameEn, nameEs, namePt, nameJa, nameDe, nameFr, nameHi, nameZh, nameTw),

  circuitName: T<(key: string) => string>(
    pick({ jp15: '일본 100V·15A', us15: '북미 120V·15A', us20: '북미 120V·20A', kr16: '한국 220V·16A', kr20: '한국 220V·20A', kr32: '한국 220V·32A', eu16: '유럽 230V·16A', us30: '북미 240V·30A' }),
    pick({ jp15: 'Japan 100 V · 15 A', us15: 'North America 120 V · 15 A', us20: 'North America 120 V · 20 A', kr16: 'Korea 220 V · 16 A', kr20: 'Korea 220 V · 20 A', kr32: 'Korea 220 V · 32 A', eu16: 'Europe 230 V · 16 A', us30: 'North America 240 V · 30 A' }),
    pick({ jp15: 'Japón 100 V · 15 A', us15: 'Norteamérica 120 V · 15 A', us20: 'Norteamérica 120 V · 20 A', kr16: 'Corea 220 V · 16 A', kr20: 'Corea 220 V · 20 A', kr32: 'Corea 220 V · 32 A', eu16: 'Europa 230 V · 16 A', us30: 'Norteamérica 240 V · 30 A' }),
    pick({ jp15: 'Japão 100 V · 15 A', us15: 'América do Norte 120 V · 15 A', us20: 'América do Norte 120 V · 20 A', kr16: 'Coreia 220 V · 16 A', kr20: 'Coreia 220 V · 20 A', kr32: 'Coreia 220 V · 32 A', eu16: 'Europa 230 V · 16 A', us30: 'América do Norte 240 V · 30 A' }),
    pick({ jp15: '日本 100V・15A', us15: '北米 120V・15A', us20: '北米 120V・20A', kr16: '韓国 220V・16A', kr20: '韓国 220V・20A', kr32: '韓国 220V・32A', eu16: '欧州 230V・16A', us30: '北米 240V・30A' }),
    pick({ jp15: 'Japan 100 V · 15 A', us15: 'Nordamerika 120 V · 15 A', us20: 'Nordamerika 120 V · 20 A', kr16: 'Korea 220 V · 16 A', kr20: 'Korea 220 V · 20 A', kr32: 'Korea 220 V · 32 A', eu16: 'Europa 230 V · 16 A', us30: 'Nordamerika 240 V · 30 A' }),
    pick({ jp15: 'Japon 100 V · 15 A', us15: 'Amérique du Nord 120 V · 15 A', us20: 'Amérique du Nord 120 V · 20 A', kr16: 'Corée 220 V · 16 A', kr20: 'Corée 220 V · 20 A', kr32: 'Corée 220 V · 32 A', eu16: 'Europe 230 V · 16 A', us30: 'Amérique du Nord 240 V · 30 A' }),
    pick({ jp15: 'जापान 100 V · 15 A', us15: 'उत्तर अमेरिका 120 V · 15 A', us20: 'उत्तर अमेरिका 120 V · 20 A', kr16: 'कोरिया 220 V · 16 A', kr20: 'कोरिया 220 V · 20 A', kr32: 'कोरिया 220 V · 32 A', eu16: 'यूरोप 230 V · 16 A', us30: 'उत्तर अमेरिका 240 V · 30 A' }),
    pick({ jp15: '日本 100V·15A', us15: '北美 120V·15A', us20: '北美 120V·20A', kr16: '韩国 220V·16A', kr20: '韩国 220V·20A', kr32: '韩国 220V·32A', eu16: '欧洲 230V·16A', us30: '北美 240V·30A' }),
    pick({ jp15: '日本 100V·15A', us15: '北美 120V·15A', us20: '北美 120V·20A', kr16: '韓國 220V·16A', kr20: '韓國 220V·20A', kr32: '韓國 220V·32A', eu16: '歐洲 230V·16A', us30: '北美 240V·30A' }),
  ),

  hubTitle: T(
    '가전 전류 160칸 — 1700W 청소기는 220V에서 7.7A',
    '160 current figures — a 1700 W vacuum draws 7.7 A at 220 V',
    '160 corrientes — una aspiradora de 1700 W consume 7,7 A a 220 V',
    '160 correntes — um aspirador de 1700 W puxa 7,7 A a 220 V',
    '家電の電流160マス — 1700Wの掃除機は220Vで7.7A',
    '160 Stromwerte — ein 1700-W-Staubsauger zieht bei 220 V 7,7 A',
    '160 courants — un aspirateur de 1700 W tire 7,7 A en 220 V',
    '160 करंट मान — 1700 W वैक्यूम 220 V पर 7.7 A लेता है',
    '160 个电流数值 — 1700W 吸尘器在 220V 下是 7.7A',
    '160 個電流數值 — 1700W 吸塵器在 220V 下是 7.7A',
  ),

  hubLead: T(
    '가전 20가지와 회로 8가지가 만나는 칸마다 흐르는 전류와 함께 쓸 수 있는 대수를 계산했습니다. 차단기도 멀티탭도 전선도 와트가 아니라 암페어로 견딥니다.',
    'For every meeting of 20 appliances and 8 circuits: the current that flows and how many you can run at once. Breakers, power strips and wire all hold a limit in amps, not watts.',
    'Para cada cruce de 20 electrodomésticos y 8 circuitos: la corriente que circula y cuántos puedes usar a la vez. Los magnetotérmicos, las regletas y el cable aguantan amperios, no vatios.',
    'Para cada cruzamento de 20 eletrodomésticos e 8 circuitos: a corrente que passa e quantos dá para usar juntos. Disjuntores, filtros de linha e fios suportam ampères, não watts.',
    '家電20通りと回路8通りが出会う各マスの電流と、同時に使える台数を計算しました。ブレーカーもテーブルタップも電線も、ワットではなくアンペアで耐えます。',
    'Für jede Begegnung von 20 Geräten und 8 Stromkreisen: der fließende Strom und wie viele gleichzeitig laufen. Sicherung, Steckdosenleiste und Leitung halten Ampere aus, nicht Watt.',
    'Pour chaque croisement de 20 appareils et 8 circuits : le courant qui circule et combien on peut en brancher ensemble. Disjoncteurs, multiprises et câbles tiennent des ampères, pas des watts.',
    '20 उपकरणों और 8 सर्किटों के हर मेल की धारा और एक साथ कितने चल सकते हैं। ब्रेकर, पावर स्ट्रिप और तार — सब एम्पियर सहते हैं, वाट नहीं।',
    '20 种家电与 8 种电路交汇的每一格都算出电流，以及能同时用几台。断路器、插线板和导线承受的都是安培，不是瓦。',
    '20 種家電與 8 種電路交匯的每一格都算出電流，以及能同時用幾台。斷路器、延長線和導線承受的都是安培，不是瓦。',
  ),

  drawLabel: T('소비전력', 'Power draw', 'Consumo', 'Consumo', '消費電力', 'Leistungsaufnahme', 'Puissance absorbée', 'खपत', '功率', '功率'),
  lineVoltLabel: T('전압', 'Voltage', 'Tensión', 'Tensão', '電圧', 'Spannung', 'Tension', 'वोल्टेज', '电压', '電壓'),
  breakerLabel: T('차단기', 'Breaker', 'Magnetotérmico', 'Disjuntor', 'ブレーカー', 'Sicherung', 'Disjoncteur', 'ब्रेकर', '断路器', '斷路器'),
  flowLabel: T('흐르는 전류', 'Current that flows', 'Corriente que circula', 'Corrente que passa', '流れる電流', 'Fließender Strom', 'Courant qui circule', 'बहने वाली धारा', '实际电流', '實際電流'),
  budgetLabel: T('이어 쓸 때 한도', 'Limit for continuous use', 'Límite de uso continuo', 'Limite de uso contínuo', '連続使用の上限', 'Grenze für Dauerbetrieb', 'Limite en usage continu', 'लगातार उपयोग की सीमा', '连续使用上限', '連續使用上限'),
  togetherLabel: T('함께 꽂을 수 있는 대수', 'How many fit at once', 'Cuántos caben a la vez', 'Quantos cabem de uma vez', '同時に使える台数', 'Wie viele gleichzeitig', 'Combien en même temps', 'एक साथ कितने', '可同时使用台数', '可同時使用台數'),
  minWireLabel: T('필요한 전선 굵기', 'Wire it needs', 'Cable que necesita', 'Fio necessário', '必要な電線の太さ', 'Nötiger Leitungsquerschnitt', 'Section de câble requise', 'ज़रूरी तार मोटाई', '所需导线线径', '所需導線線徑'),
  billLabel: T('하루 두 시간이면 한 달', 'Two hours a day, per month', 'Dos horas al día, al mes', 'Duas horas por dia, no mês', '1日2時間で1か月', 'Zwei Stunden täglich, im Monat', 'Deux heures par jour, par mois', 'रोज़ दो घंटे, महीने में', '每天两小时，一个月', '每天兩小時，一個月'),

  overTag: T('이 회로 하나로는 무리입니다', 'Too much for this circuit alone', 'Demasiado para este circuito', 'Demais para este circuito', 'この回路一つでは無理です', 'Zu viel für diesen Stromkreis', 'Trop pour ce seul circuit', 'इस सर्किट के लिए ज़्यादा है', '这一路电路撑不住', '這一路電路撐不住'),
  fitTag: T('이 회로로 됩니다', 'This circuit handles it', 'Este circuito lo aguanta', 'Este circuito dá conta', 'この回路で足ります', 'Dieser Stromkreis trägt es', 'Ce circuit suffit', 'यह सर्किट संभाल लेता है', '这一路电路够用', '這一路電路夠用'),
  stripOkTag: T('멀티탭에 꽂아도 됩니다', 'Fine on a power strip', 'Vale en una regleta', 'Pode em filtro de linha', 'テーブルタップでも大丈夫', 'An der Steckdosenleiste in Ordnung', 'Acceptable sur une multiprise', 'पावर स्ट्रिप पर ठीक है', '可以插插线板', '可以插延長線'),
  stripNoTag: T('벽 콘센트에 바로 꽂으십시오', 'Plug it straight into the wall', 'Enchúfalo directo a la pared', 'Ligue direto na parede', '壁のコンセントに直接つないでください', 'Direkt in die Wandsteckdose', 'Branchez-le directement au mur', 'सीधे दीवार के सॉकेट में लगाएँ', '请直接插墙上插座', '請直接插牆上插座'),

  ampTitle: T('와트가 아니라 암페어로 묻습니다', 'Ask in amps, not watts', 'Pregunta en amperios, no en vatios', 'Pergunte em ampères, não em watts', 'ワットではなくアンペアで問います', 'Gefragt wird in Ampere, nicht Watt', 'La question se pose en ampères', 'सवाल एम्पियर में है, वाट में नहीं', '要问的是安培，不是瓦', '要問的是安培，不是瓦'),

  ampNote: T(
    '차단기는 암페어로 끊고, 멀티탭도 전선도 암페어로 견딥니다. 그래서 "함께 꽂아도 되는가"는 와트를 더해서는 답이 나오지 않습니다 — 전압으로 나눠 전류로 바꾼 뒤에 더해야 합니다. 소비전력을 전압으로 나눈 값이 이 표의 출발점입니다.',
    'A breaker trips on amps; a power strip and a length of wire hold out in amps. So "can I plug these in together?" cannot be answered by adding watts — divide by the voltage first, then add the currents. That division is where this table starts.',
    'Un magnetotérmico salta por amperios; una regleta y un cable aguantan amperios. Así que «¿puedo enchufarlos juntos?» no se responde sumando vatios: divide primero por la tensión y suma las corrientes. Esa división es el punto de partida de esta tabla.',
    'Um disjuntor desarma por ampères; um filtro de linha e um fio suportam ampères. Então "posso ligar juntos?" não se responde somando watts: divida pela tensão e some as correntes. Essa divisão é o ponto de partida desta tabela.',
    'ブレーカーはアンペアで落ち、テーブルタップも電線もアンペアで耐えます。だから「一緒に挿してよいか」はワットを足しても答えが出ません — 電圧で割って電流にしてから足します。その割り算がこの表の出発点です。',
    'Eine Sicherung löst bei Ampere aus; Steckdosenleiste und Leitung halten Ampere aus. "Darf beides zusammen?" lässt sich also nicht durch Addieren von Watt beantworten — erst durch die Spannung teilen, dann die Ströme addieren. Diese Division ist der Anfang dieser Tabelle.',
    'Un disjoncteur saute sur des ampères ; une multiprise et un câble tiennent des ampères. « Puis-je les brancher ensemble ? » ne se règle donc pas en additionnant des watts : divisez d’abord par la tension, puis additionnez les courants. Ce quotient est le point de départ du tableau.',
    'ब्रेकर एम्पियर पर गिरता है; पावर स्ट्रिप और तार भी एम्पियर सहते हैं। इसलिए "क्या साथ लगा सकते हैं" का जवाब वाट जोड़कर नहीं मिलता — पहले वोल्टेज से भाग दें, फिर धाराएँ जोड़ें। यही भाग इस तालिका की शुरुआत है।',
    '断路器按安培跳闸，插线板和导线也按安培承受。所以"能不能一起插"不能靠加瓦数来回答——先除以电压换成电流再相加。这个除法就是本表的起点。',
    '斷路器按安培跳脫，延長線和導線也按安培承受。所以「能不能一起插」不能靠加瓦數來回答——先除以電壓換成電流再相加。這個除法就是本表的起點。',
  ),

  voltTitle: T('전압이 절반이면 전류는 두 배입니다', 'Half the voltage, twice the current', 'La mitad de tensión, el doble de corriente', 'Metade da tensão, o dobro da corrente', '電圧が半分なら電流は倍', 'Halbe Spannung, doppelter Strom', 'Moitié de tension, double courant', 'आधा वोल्टेज, दोगुनी धारा', '电压减半，电流加倍', '電壓減半，電流加倍'),

  voltNote: T(
    '같은 1600W 드라이어가 220V에서는 7.3A, 120V에서는 13.3A를 먹습니다. 그래서 북미의 15A 회로에서는 드라이어 하나로 이미 한도를 넘고, 한국의 16A 회로에서는 두 대까지 갑니다. 가전을 들고 나라를 건너면 답이 통째로 바뀌는 것이 이 때문입니다.',
    'The same 1600 W hair dryer draws 7.3 A at 220 V and 13.3 A at 120 V. On a North American 15 A circuit one dryer already passes the limit; on a Korean 16 A circuit two of them fit. Carry an appliance across a border and the answer changes completely.',
    'El mismo secador de 1600 W consume 7,3 A a 220 V y 13,3 A a 120 V. En un circuito norteamericano de 15 A un solo secador ya pasa el límite; en uno coreano de 16 A caben dos. Cruzar una frontera con un aparato cambia la respuesta por completo.',
    'O mesmo secador de 1600 W puxa 7,3 A a 220 V e 13,3 A a 120 V. Num circuito norte-americano de 15 A um secador já passa do limite; num coreano de 16 A cabem dois. Levar um aparelho para outro país muda a resposta inteira.',
    '同じ1600Wのドライヤーが220Vでは7.3A、120Vでは13.3Aを食います。だから北米の15A回路ではドライヤー1台で既に上限を越え、韓国の16A回路では2台まで入ります。家電を持って国を渡ると答えが丸ごと変わるのはこのためです。',
    'Derselbe 1600-W-Haartrockner zieht bei 220 V 7,3 A und bei 120 V 13,3 A. In einem nordamerikanischen 15-A-Kreis reißt ein Trockner schon die Grenze, in einem koreanischen 16-A-Kreis passen zwei. Mit dem Gerät über die Grenze — und die Antwort ist eine andere.',
    'Le même sèche-cheveux de 1600 W tire 7,3 A en 220 V et 13,3 A en 120 V. Sur un circuit nord-américain de 15 A, un seul sèche-cheveux dépasse déjà la limite ; sur un circuit coréen de 16 A, il en tient deux. Changez de pays avec l’appareil et la réponse change entièrement.',
    'वही 1600 W हेयर ड्रायर 220 V पर 7.3 A और 120 V पर 13.3 A लेता है। उत्तर अमेरिका के 15 A सर्किट पर एक ही ड्रायर सीमा पार कर देता है, कोरिया के 16 A सर्किट पर दो समा जाते हैं। उपकरण लेकर सरहद पार करते ही जवाब पूरा बदल जाता है।',
    '同一台 1600W 吹风机，220V 下吃 7.3A，120V 下要 13.3A。所以北美 15A 电路上一台吹风机就已超限，韩国 16A 电路上能放两台。带着电器跨国，答案会整个变掉。',
    '同一台 1600W 吹風機，220V 下吃 7.3A，120V 下要 13.3A。所以北美 15A 電路上一台吹風機就已超限，韓國 16A 電路上能放兩台。帶著電器跨國，答案會整個變掉。',
  ),

  ruleTitle: T('이어 쓰는 것은 여덟 할까지', 'Continuous loads get eight tenths', 'Las cargas continuas, ocho décimos', 'Cargas contínuas, oito décimos', '連続使用は8割まで', 'Dauerlast nur bis acht Zehntel', 'Les charges continues à huit dixièmes', 'लगातार भार आठ दसवें तक', '连续负载只取八成', '連續負載只取八成'),

  ruleNote: T(
    '차단기는 정격에서 바로 끊기지 않고 한참 버티다 끊깁니다. 그 사이 전선이 먼저 뜨거워지므로, 세 시간 넘게 이어 걸리는 부하는 차단기의 8할까지만 잡는 것이 널리 쓰는 규칙입니다. 16A 차단기라면 12.8A입니다.',
    'A breaker does not trip the instant you reach its rating — it holds for a long while first, and the wire warms up in the meantime. So a load running more than three hours is planned to eight tenths of the breaker. On a 16 A breaker that is 12.8 A.',
    'Un magnetotérmico no salta al llegar a su valor nominal: aguanta un buen rato y, mientras tanto, el cable se calienta. Por eso una carga que dure más de tres horas se planifica al 80% del magnetotérmico. En uno de 16 A son 12,8 A.',
    'Um disjuntor não desarma assim que chega ao valor nominal — segura por um bom tempo, e o fio esquenta nesse meio. Por isso uma carga que passa de três horas é planejada em 80% do disjuntor. Num de 16 A são 12,8 A.',
    'ブレーカーは定格に達した瞬間に落ちるのではなく、しばらく耐えてから落ちます。その間に電線が先に熱くなるので、3時間を超えて続く負荷はブレーカーの8割までにするのが広く使われる目安です。16Aなら12.8Aです。',
    'Eine Sicherung löst nicht sofort beim Nennwert aus — sie hält erst lange durch, und währenddessen wird die Leitung warm. Lasten über drei Stunden plant man deshalb auf acht Zehntel der Sicherung. Bei 16 A sind das 12,8 A.',
    'Un disjoncteur ne saute pas dès sa valeur nominale : il tient longtemps, et le câble chauffe pendant ce temps. Une charge de plus de trois heures se dimensionne donc à huit dixièmes du disjoncteur. Pour 16 A, cela fait 12,8 A.',
    'ब्रेकर अपनी रेटिंग पर तुरंत नहीं गिरता — काफ़ी देर सहता है, और इस बीच तार गरम होता है। इसलिए तीन घंटे से अधिक चलने वाला भार ब्रेकर के आठ दसवें तक ही रखा जाता है। 16 A पर यह 12.8 A है।',
    '断路器不会一到额定值就跳，会先撑很久，而导线在这期间已经发热。所以持续超过三小时的负载只按断路器的八成来算。16A 的断路器就是 12.8A。',
    '斷路器不會一到額定值就跳，會先撐很久，而導線在這期間已經發熱。所以持續超過三小時的負載只按斷路器的八成來算。16A 的斷路器就是 12.8A。',
  ),

  stripTitle: T('멀티탭이 먼저 녹습니다', 'The power strip melts first', 'La regleta se derrite primero', 'O filtro de linha derrete primeiro', '先に溶けるのはテーブルタップです', 'Zuerst schmilzt die Steckdosenleiste', 'C’est la multiprise qui fond en premier', 'पहले पावर स्ट्रिप पिघलती है', '先熔的是插线板', '先熔的是延長線'),

  stripNote: T(
    '흔한 멀티탭은 15A까지 견딥니다. 차단기가 32A짜리여도 멀티탭이 15A면 거기서 막히고, 차단기는 안 내려간 채 탭만 뜨거워집니다. 히터·인덕션처럼 15A를 넘는 것은 벽 콘센트에 바로 꽂아야 합니다.',
    'A common power strip is good for 15 A. Even behind a 32 A breaker, the strip is the ceiling — and the breaker never trips while the strip quietly heats up. Anything over 15 A, like a heater or an induction hob, belongs straight in the wall.',
    'Una regleta común aguanta 15 A. Aunque el magnetotérmico sea de 32 A, el techo lo pone la regleta: el magnetotérmico no salta y la regleta se va calentando. Todo lo que pase de 15 A, como una estufa o una inducción, va directo a la pared.',
    'Um filtro de linha comum aguenta 15 A. Mesmo atrás de um disjuntor de 32 A, o teto é o filtro — e o disjuntor não desarma enquanto ele esquenta em silêncio. O que passa de 15 A, como aquecedor ou indução, vai direto na parede.',
    'よくあるテーブルタップは15Aまでです。ブレーカーが32Aでもタップが15Aならそこで頭打ちで、ブレーカーは落ちないままタップだけが熱くなります。ヒーターやIHのように15Aを超えるものは壁のコンセントに直接つなぎます。',
    'Eine übliche Steckdosenleiste hält 15 A. Selbst hinter einer 32-A-Sicherung ist die Leiste die Obergrenze — die Sicherung löst nicht aus, während die Leiste still heiß wird. Alles über 15 A, etwa Heizlüfter oder Induktionsfeld, gehört direkt in die Wand.',
    'Une multiprise courante tient 15 A. Même derrière un disjoncteur de 32 A, c’est elle le plafond — et le disjoncteur ne saute pas pendant qu’elle chauffe en silence. Au-delà de 15 A, radiateur ou plaque à induction, on branche directement au mur.',
    'आम पावर स्ट्रिप 15 A तक सहती है। ब्रेकर 32 A का हो तब भी छत स्ट्रिप ही तय करती है — ब्रेकर नहीं गिरता और स्ट्रिप चुपचाप गरम होती रहती है। 15 A से ऊपर की चीज़ें, जैसे हीटर या इंडक्शन, सीधे दीवार में लगें।',
    '常见的插线板只到 15A。哪怕断路器是 32A，上限也在插线板——断路器不跳，插线板却在悄悄发热。超过 15A 的电暖器、电磁炉之类，要直接插墙上插座。',
    '常見的延長線只到 15A。哪怕斷路器是 32A，上限也在延長線——斷路器不跳，延長線卻在悄悄發熱。超過 15A 的電暖器、電磁爐之類，要直接插牆上插座。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '소비전력은 그 가전의 대표값입니다. 실제 정격은 제품 뒤나 바닥의 라벨에 적혀 있고, 모터가 든 가전은 켜지는 순간 몇 배를 잠깐 먹습니다. 한 회로에 이미 무엇이 물려 있는지도 함께 봐야 합니다.',
    'The wattage here is typical for that kind of appliance. The real rating is on the label at the back or underneath, and anything with a motor briefly pulls several times as much at start-up. What else is already on the circuit counts too.',
    'El consumo indicado es el típico de ese tipo de aparato. El valor real está en la etiqueta trasera o inferior, y lo que lleva motor pide varias veces más durante el arranque. También cuenta lo que ya cuelga del circuito.',
    'A potência aqui é típica desse tipo de aparelho. O valor real está na etiqueta atrás ou embaixo, e o que tem motor puxa várias vezes mais na partida. O que já está no circuito também conta.',
    'ここでの消費電力はその種類の代表値です。実際の定格は本体の裏や底のラベルにあり、モーターの入った家電は起動の瞬間に数倍を短く食います。その回路に既に何がつながっているかも合わせて見てください。',
    'Die Wattzahl hier ist typisch für die Geräteart. Der echte Wert steht auf dem Typenschild hinten oder unten, und alles mit Motor zieht beim Anlauf kurz ein Vielfaches. Auch was sonst schon am Kreis hängt, zählt mit.',
    'La puissance indiquée est typique de ce type d’appareil. La valeur réelle figure sur l’étiquette à l’arrière ou dessous, et tout ce qui a un moteur tire brièvement plusieurs fois plus au démarrage. Ce qui est déjà branché sur le circuit compte aussi.',
    'यहाँ दी गई खपत उस तरह के उपकरण की सामान्य है। असली रेटिंग पीछे या नीचे लगे लेबल पर होती है, और मोटर वाले उपकरण चालू होते समय कुछ पल के लिए कई गुना खींचते हैं। सर्किट पर पहले से क्या लगा है, वह भी गिनें।',
    '这里的功率是该类电器的典型值。实际额定值印在背面或底部的铭牌上，带电机的电器启动瞬间会短暂拉到数倍。还要看这一路上已经接了什么。',
    '這裡的功率是該類電器的典型值。實際額定值印在背面或底部的銘牌上，帶馬達的電器啟動瞬間會短暫拉到數倍。還要看這一路上已經接了什麼。',
  ),

  tableTitle: T('가전과 회로로 찾기', 'Find it by appliance and circuit', 'Búscalo por aparato y circuito', 'Ache por aparelho e circuito', '家電と回路から探す', 'Nach Gerät und Stromkreis suchen', 'Chercher par appareil et circuit', 'उपकरण और सर्किट से देखें', '按家电和电路查找', '按家電和電路查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  circuitRowTitle: T('같은 가전, 다른 회로', 'Same appliance, other circuits', 'Mismo aparato, otros circuitos', 'Mesmo aparelho, outros circuitos', '同じ家電、別の回路', 'Gleiches Gerät, andere Stromkreise', 'Même appareil, autres circuits', 'वही उपकरण, दूसरे सर्किट', '同一家电，不同电路', '同一家電，不同電路'),
  applianceRowTitle: T('같은 회로, 다른 가전', 'Same circuit, other appliances', 'Mismo circuito, otros aparatos', 'Mesmo circuito, outros aparelhos', '同じ回路、別の家電', 'Gleicher Stromkreis, andere Geräte', 'Même circuit, autres appareils', 'वही सर्किट, दूसरे उपकरण', '同一电路，不同家电', '同一電路，不同家電'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '전류는 소비전력을 전압으로 나눈 값입니다. 나라가 다르면 답도 달라집니다.',
      '함께 쓸 수 있는 대수는 차단기의 8할을 전류로 나눈 것입니다.',
      '멀티탭은 15A까지입니다. 차단기가 커도 탭이 먼저 막습니다.',
      '전선 굵기는 전선 페이지의 값을 그대로 가져온 것입니다.',
    ],
    [
      'Current is the power draw divided by the voltage — a different country gives a different answer.',
      'The number that fits at once is eight tenths of the breaker divided by that current.',
      'A power strip stops at 15 A. A bigger breaker does not help; the strip is the ceiling.',
      'The wire gauge is taken straight from the wire pages.',
    ],
    [
      'La corriente es el consumo dividido por la tensión: otro país, otra respuesta.',
      'Cuántos caben a la vez es el 80% del magnetotérmico dividido por esa corriente.',
      'Una regleta se detiene en 15 A. Un magnetotérmico mayor no ayuda: el techo es la regleta.',
      'El calibre del cable viene tal cual de las páginas de cable.',
    ],
    [
      'A corrente é o consumo dividido pela tensão — outro país, outra resposta.',
      'Quantos cabem juntos é 80% do disjuntor dividido por essa corrente.',
      'Um filtro de linha para em 15 A. Um disjuntor maior não ajuda: o teto é o filtro.',
      'A bitola do fio vem direto das páginas de fio.',
    ],
    [
      '電流は消費電力を電圧で割った値です。国が違えば答えも違います。',
      '同時に使える台数は、ブレーカーの8割をその電流で割ったものです。',
      'テーブルタップは15Aまでです。ブレーカーが大きくてもタップが先に止めます。',
      '電線の太さは電線のページの値をそのまま持ってきています。',
    ],
    [
      'Der Strom ist die Leistung geteilt durch die Spannung — anderes Land, andere Antwort.',
      'Wie viele gleichzeitig passen, sind acht Zehntel der Sicherung geteilt durch diesen Strom.',
      'Eine Steckdosenleiste endet bei 15 A. Eine größere Sicherung hilft nicht, die Leiste ist die Grenze.',
      'Der Leitungsquerschnitt stammt unverändert von den Leitungsseiten.',
    ],
    [
      'Le courant est la puissance divisée par la tension — autre pays, autre réponse.',
      'Le nombre qui tient à la fois vaut huit dixièmes du disjoncteur divisés par ce courant.',
      'Une multiprise s’arrête à 15 A. Un disjoncteur plus gros n’y change rien : c’est elle le plafond.',
      'La section de câble est reprise telle quelle des pages consacrées aux câbles.',
    ],
    [
      'धारा यानी खपत को वोल्टेज से भाग देना — देश बदले तो जवाब भी बदलता है।',
      'एक साथ कितने चलेंगे, यह ब्रेकर के आठ दसवें को उस धारा से भाग देकर मिलता है।',
      'पावर स्ट्रिप 15 A पर रुक जाती है। बड़ा ब्रेकर मदद नहीं करता, छत स्ट्रिप ही है।',
      'तार की मोटाई तार वाले पन्नों से जस की तस ली गई है।',
    ],
    [
      '电流是功率除以电压——换个国家答案就变。',
      '能同时用几台，是断路器的八成除以这个电流。',
      '插线板到 15A 为止。断路器再大也没用，插线板才是上限。',
      '导线线径直接取自导线页面的值。',
    ],
    [
      '電流是功率除以電壓——換個國家答案就變。',
      '能同時用幾台，是斷路器的八成除以這個電流。',
      '延長線到 15A 為止。斷路器再大也沒用，延長線才是上限。',
      '導線線徑直接取自導線頁面的值。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '가전 전류 계산 — 소비전력과 전압으로 몇 암페어인가',
    'Appliance current chart — amps from watts and volts',
    'Corriente de electrodomésticos — amperios a partir de vatios y tensión',
    'Corrente de eletrodomésticos — ampères a partir de watts e tensão',
    '家電の電流計算 — 消費電力と電圧で何アンペアか',
    'Gerätestrom-Tabelle — Ampere aus Watt und Spannung',
    'Courant des appareils — des ampères à partir des watts et de la tension',
    'उपकरण करंट चार्ट — वाट और वोल्टेज से एम्पियर',
    '家电电流计算 — 由功率和电压得出安培',
    '家電電流計算 — 由功率和電壓得出安培',
  ),

  hubMetaDesc: T(
    '2000W 전기포트는 220V에서 9.1A, 120V에서 16.7A입니다. 가전 20가지와 회로 8가지가 만나는 160칸마다 전류·동시 사용 대수·필요한 전선 굵기를 계산했습니다.',
    'A 2000 W kettle draws 9.1 A at 220 V and 16.7 A at 120 V. For all 160 pairings of 20 appliances and 8 circuits: the current, how many fit at once, and the wire it needs.',
    'Un hervidor de 2000 W consume 9,1 A a 220 V y 16,7 A a 120 V. Para los 160 cruces de 20 aparatos y 8 circuitos: la corriente, cuántos caben a la vez y el cable necesario.',
    'Uma chaleira de 2000 W puxa 9,1 A a 220 V e 16,7 A a 120 V. Para os 160 cruzamentos de 20 aparelhos e 8 circuitos: a corrente, quantos cabem juntos e o fio necessário.',
    '2000Wの電気ケトルは220Vで9.1A、120Vで16.7Aです。家電20通りと回路8通りが出会う160マスの電流・同時に使える台数・必要な電線の太さを計算しました。',
    'Ein 2000-W-Wasserkocher zieht bei 220 V 9,1 A und bei 120 V 16,7 A. Für alle 160 Kombinationen aus 20 Geräten und 8 Stromkreisen: Strom, gleichzeitige Zahl und nötiger Querschnitt.',
    'Une bouilloire de 2000 W tire 9,1 A en 220 V et 16,7 A en 120 V. Pour les 160 croisements de 20 appareils et 8 circuits : le courant, le nombre simultané et la section requise.',
    '2000 W की केतली 220 V पर 9.1 A और 120 V पर 16.7 A लेती है। 20 उपकरणों और 8 सर्किटों के सभी 160 मेलों की धारा, एक साथ कितने, और ज़रूरी तार मोटाई।',
    '2000W 电水壶在 220V 下是 9.1A，120V 下是 16.7A。20 种家电与 8 种电路交汇的 160 格，每格的电流、可同时使用台数和所需线径。',
    '2000W 電熱水壺在 220V 下是 9.1A，120V 下是 16.7A。20 種家電與 8 種電路交匯的 160 格，每格的電流、可同時使用台數和所需線徑。',
  ),

  desc: T<(f: AmpereFacts) => string>(
    f => `${f.watt}W를 ${f.volt}V로 나누면 ${f.amp}A입니다. 이 회로의 이어 쓰는 한도는 ${f.budget}A라, ${f.together}대까지 함께 쓸 수 있습니다.`,
    f => `${f.watt} W divided by ${f.volt} V is ${f.amp} A. This circuit allows ${f.budget} A continuously, so ${f.together} of them can run together.`,
    f => `${f.watt} W entre ${f.volt} V son ${f.amp} A. Este circuito admite ${f.budget} A en continuo, así que caben ${f.together}.`,
    f => `${f.watt} W divididos por ${f.volt} V dão ${f.amp} A. Este circuito admite ${f.budget} A contínuos, então cabem ${f.together}.`,
    f => `${f.watt}Wを${f.volt}Vで割ると${f.amp}Aです。この回路の連続使用の上限は${f.budget}Aなので、${f.together}台まで一緒に使えます。`,
    f => `${f.watt} W durch ${f.volt} V ergibt ${f.amp} A. Dieser Kreis erlaubt dauerhaft ${f.budget} A, also laufen ${f.together} gleichzeitig.`,
    f => `${f.watt} W divisés par ${f.volt} V font ${f.amp} A. Ce circuit admet ${f.budget} A en continu : ${f.together} peuvent fonctionner ensemble.`,
    f => `${f.watt} W को ${f.volt} V से भाग देने पर ${f.amp} A। इस सर्किट की लगातार सीमा ${f.budget} A है, इसलिए ${f.together} साथ चल सकते हैं।`,
    f => `${f.watt}W 除以 ${f.volt}V 得 ${f.amp}A。这一路的连续上限是 ${f.budget}A，可以同时用 ${f.together} 台。`,
    f => `${f.watt}W 除以 ${f.volt}V 得 ${f.amp}A。這一路的連續上限是 ${f.budget}A，可以同時用 ${f.together} 台。`,
  ),

  metaTitle: T<(f: AmpereFacts) => string>(
    f => `${nameKo(f.cell.key)} ${f.watt}W — ${f.volt}V에서 ${f.amp}A`,
    f => `${nameEn(f.cell.key)}, ${f.watt} W — ${f.amp} A at ${f.volt} V`,
    f => `${nameEs(f.cell.key)}, ${f.watt} W — ${f.amp} A a ${f.volt} V`,
    f => `${namePt(f.cell.key)}, ${f.watt} W — ${f.amp} A a ${f.volt} V`,
    f => `${nameJa(f.cell.key)} ${f.watt}W — ${f.volt}Vで${f.amp}A`,
    f => `${nameDe(f.cell.key)}, ${f.watt} W — ${f.amp} A bei ${f.volt} V`,
    f => `${nameFr(f.cell.key)}, ${f.watt} W — ${f.amp} A en ${f.volt} V`,
    f => `${nameHi(f.cell.key)}, ${f.watt} W — ${f.volt} V पर ${f.amp} A`,
    f => `${nameZh(f.cell.key)} ${f.watt}W — ${f.volt}V 下 ${f.amp}A`,
    f => `${nameTw(f.cell.key)} ${f.watt}W — ${f.volt}V 下 ${f.amp}A`,
  ),

  metaDesc: T<(f: AmpereFacts) => string>(
    f => `${f.watt}W ${nameKo(f.cell.key)}를 ${f.volt}V·${f.breaker}A 회로에 꽂으면 ${f.amp}A가 흐릅니다. 함께 쓸 수 있는 것은 ${f.together}대이고, 필요한 전선은 ${f.wire}입니다.`,
    f => `A ${f.watt} W ${nameEn(f.cell.key)} on a ${f.volt} V, ${f.breaker} A circuit draws ${f.amp} A. ${f.together} can run together, and it needs ${f.wire} wire.`,
    f => `Un ${nameEs(f.cell.key)} de ${f.watt} W en un circuito de ${f.volt} V y ${f.breaker} A consume ${f.amp} A. Caben ${f.together} a la vez y pide cable ${f.wire}.`,
    f => `Um ${namePt(f.cell.key)} de ${f.watt} W num circuito de ${f.volt} V e ${f.breaker} A puxa ${f.amp} A. Cabem ${f.together} juntos e pede fio ${f.wire}.`,
    f => `${f.watt}Wの${nameJa(f.cell.key)}を${f.volt}V・${f.breaker}Aの回路につなぐと${f.amp}Aが流れます。一緒に使えるのは${f.together}台、必要な電線は${f.wire}です。`,
    f => `Ein ${f.watt}-W-${nameDe(f.cell.key)} an einem ${f.volt}-V-Kreis mit ${f.breaker} A zieht ${f.amp} A. ${f.together} laufen gleichzeitig, nötig ist ${f.wire}.`,
    f => `Un ${nameFr(f.cell.key)} de ${f.watt} W sur un circuit ${f.volt} V et ${f.breaker} A tire ${f.amp} A. ${f.together} peuvent tourner ensemble, avec du câble ${f.wire}.`,
    f => `${f.watt} W का ${nameHi(f.cell.key)} ${f.volt} V, ${f.breaker} A सर्किट पर ${f.amp} A लेता है। ${f.together} साथ चल सकते हैं और ${f.wire} तार चाहिए।`,
    f => `${f.watt}W 的${nameZh(f.cell.key)}接在 ${f.volt}V、${f.breaker}A 电路上会流过 ${f.amp}A。可同时用 ${f.together} 台，需要 ${f.wire} 导线。`,
    f => `${f.watt}W 的${nameTw(f.cell.key)}接在 ${f.volt}V、${f.breaker}A 電路上會流過 ${f.amp}A。可同時用 ${f.together} 台，需要 ${f.wire} 導線。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '전기포트는 몇 암페어인가요?', a: '2000W라면 220V에서 9.1A, 120V에서 16.7A입니다. 소비전력을 전압으로 나눈 값입니다.' },
      { q: '차단기가 자꾸 내려가는데 왜 그런가요?', a: '한 회로에 물린 가전의 전류를 더한 값이 차단기를 넘어서입니다. 히터와 전기포트처럼 큰 것 둘이 같은 회로면 대개 그렇습니다.' },
      { q: '멀티탭에 여러 개 꽂아도 되나요?', a: '더한 전류가 15A를 넘지 않으면 됩니다. 차단기가 32A짜리여도 멀티탭은 15A에서 막히고, 그때는 차단기가 안 내려간 채 탭만 뜨거워집니다.' },
      { q: '왜 여덟 할까지만 잡나요?', a: '차단기는 정격에서 바로 끊기지 않고 한참 버티다 끊기기 때문입니다. 세 시간 넘게 이어 걸리는 부하는 8할까지만 잡는 것이 널리 쓰는 규칙입니다.' },
      { q: '해외에서 쓰던 가전을 그대로 써도 되나요?', a: '전압이 맞아야 합니다. 전압이 다르면 같은 가전이 먹는 전류가 두 배까지 달라져, 회로도 콘센트도 다르게 봐야 합니다.' },
    ],
    [
      { q: 'How many amps is an electric kettle?', a: 'At 2000 W, 9.1 A on 220 V and 16.7 A on 120 V — the wattage divided by the voltage.' },
      { q: 'Why does my breaker keep tripping?', a: 'Because the currents of everything on that circuit add up past its rating. Two big loads on one circuit — a heater and a kettle — usually do it.' },
      { q: 'Can I put several things on one power strip?', a: 'As long as the currents add to under 15 A. Even behind a 32 A breaker the strip stops at 15 A, and then the breaker never trips while the strip heats up.' },
      { q: 'Why plan to only eight tenths?', a: 'A breaker holds well past its rating before tripping. For loads running more than three hours the common rule is to plan at 80% of it.' },
      { q: 'Can I use an appliance brought from abroad?', a: 'Only if the voltage matches. A different voltage changes the current it draws by up to double, so the circuit and the outlet have to be judged again.' },
    ],
    [
      { q: '¿Cuántos amperios tiene un hervidor eléctrico?', a: 'Con 2000 W, 9,1 A a 220 V y 16,7 A a 120 V: el consumo dividido por la tensión.' },
      { q: '¿Por qué salta el magnetotérmico?', a: 'Porque la suma de corrientes de lo conectado a ese circuito supera su valor. Dos cargas grandes juntas —estufa y hervidor— suelen bastar.' },
      { q: '¿Puedo enchufar varias cosas a una regleta?', a: 'Si la suma se queda por debajo de 15 A. Aunque el magnetotérmico sea de 32 A, la regleta se detiene en 15 A y entonces no salta nada mientras ella se calienta.' },
      { q: '¿Por qué solo el 80%?', a: 'Porque el magnetotérmico aguanta bastante por encima de su valor antes de saltar. Para cargas de más de tres horas la regla habitual es planificar al 80%.' },
      { q: '¿Puedo usar un aparato traído del extranjero?', a: 'Solo si coincide la tensión. Con otra tensión la corriente cambia hasta el doble, así que el circuito y el enchufe deben revisarse de nuevo.' },
    ],
    [
      { q: 'Quantos ampères tem uma chaleira elétrica?', a: 'Com 2000 W, 9,1 A a 220 V e 16,7 A a 120 V — o consumo dividido pela tensão.' },
      { q: 'Por que o disjuntor desarma sempre?', a: 'Porque a soma das correntes do que está naquele circuito passa do valor dele. Duas cargas grandes juntas — aquecedor e chaleira — costumam bastar.' },
      { q: 'Posso ligar várias coisas num filtro de linha?', a: 'Se a soma ficar abaixo de 15 A. Mesmo com disjuntor de 32 A o filtro para em 15 A, e aí nada desarma enquanto ele esquenta.' },
      { q: 'Por que só 80%?', a: 'Porque o disjuntor segura bem acima do valor antes de desarmar. Para cargas de mais de três horas a regra comum é planejar em 80%.' },
      { q: 'Posso usar um aparelho trazido de fora?', a: 'Só se a tensão bater. Com outra tensão a corrente muda até o dobro, então o circuito e a tomada precisam ser reavaliados.' },
    ],
    [
      { q: '電気ケトルは何アンペアですか？', a: '2000Wなら220Vで9.1A、120Vで16.7Aです。消費電力を電圧で割った値です。' },
      { q: 'ブレーカーがよく落ちるのはなぜですか？', a: 'その回路につないだ家電の電流の合計がブレーカーを超えているからです。ヒーターと電気ケトルのように大きいものが2つ同じ回路にあると大抵そうなります。' },
      { q: 'テーブルタップに何個も挿してよいですか？', a: '合計が15Aを超えなければ大丈夫です。ブレーカーが32Aでもタップは15Aで頭打ちで、そのときはブレーカーが落ちないままタップだけ熱くなります。' },
      { q: 'なぜ8割までなのですか？', a: 'ブレーカーは定格を超えてもしばらく耐えてから落ちるからです。3時間を超えて続く負荷は8割までにするのが広く使われる目安です。' },
      { q: '海外で使っていた家電をそのまま使えますか？', a: '電圧が合っていれば使えます。電圧が違うと同じ家電の電流が倍まで変わるので、回路もコンセントも見直しが要ります。' },
    ],
    [
      { q: 'Wie viel Ampere hat ein Wasserkocher?', a: 'Bei 2000 W sind es 9,1 A an 220 V und 16,7 A an 120 V — Leistung geteilt durch Spannung.' },
      { q: 'Warum fliegt ständig die Sicherung?', a: 'Weil die Ströme aller Geräte an diesem Kreis zusammen über dem Nennwert liegen. Zwei große Verbraucher — Heizlüfter und Wasserkocher — reichen meist schon.' },
      { q: 'Darf ich mehreres an eine Steckdosenleiste hängen?', a: 'Solange die Summe unter 15 A bleibt. Selbst an einer 32-A-Sicherung endet die Leiste bei 15 A, und dann löst nichts aus, während sie heiß wird.' },
      { q: 'Warum nur acht Zehntel?', a: 'Weil eine Sicherung deutlich über dem Nennwert erst einmal hält. Für Lasten über drei Stunden plant man üblich auf 80 %.' },
      { q: 'Kann ich ein Gerät aus dem Ausland weiterverwenden?', a: 'Nur wenn die Spannung passt. Bei anderer Spannung ändert sich der Strom bis auf das Doppelte, Kreis und Steckdose müssen neu beurteilt werden.' },
    ],
    [
      { q: 'Combien d’ampères pour une bouilloire ?', a: 'À 2000 W, 9,1 A en 220 V et 16,7 A en 120 V — la puissance divisée par la tension.' },
      { q: 'Pourquoi mon disjoncteur saute-t-il sans arrêt ?', a: 'Parce que la somme des courants branchés sur ce circuit dépasse son calibre. Deux gros appareils sur le même circuit — radiateur et bouilloire — y suffisent souvent.' },
      { q: 'Puis-je brancher plusieurs appareils sur une multiprise ?', a: 'Tant que la somme reste sous 15 A. Même derrière un disjoncteur de 32 A, la multiprise plafonne à 15 A : rien ne saute pendant qu’elle chauffe.' },
      { q: 'Pourquoi ne prévoir que huit dixièmes ?', a: 'Parce qu’un disjoncteur tient bien au-delà de son calibre avant de couper. Pour les charges de plus de trois heures, l’usage est de prévoir 80 %.' },
      { q: 'Puis-je utiliser un appareil rapporté de l’étranger ?', a: 'Seulement si la tension correspond. Une autre tension double presque le courant, et le circuit comme la prise doivent être réévalués.' },
    ],
    [
      { q: 'इलेक्ट्रिक केतली कितने एम्पियर की होती है?', a: '2000 W पर 220 V में 9.1 A और 120 V में 16.7 A — खपत को वोल्टेज से भाग देने पर।' },
      { q: 'ब्रेकर बार-बार क्यों गिरता है?', a: 'क्योंकि उस सर्किट पर लगे सब उपकरणों की धाराएँ जुड़कर उसकी सीमा पार कर जाती हैं। हीटर और केतली जैसे दो बड़े भार साथ हों तो अक्सर यही होता है।' },
      { q: 'क्या एक पावर स्ट्रिप पर कई चीज़ें लगा सकते हैं?', a: 'जब तक जोड़ 15 A से नीचे रहे। 32 A ब्रेकर के पीछे भी स्ट्रिप 15 A पर रुकती है, और तब ब्रेकर गिरे बिना स्ट्रिप गरम होती रहती है।' },
      { q: 'सिर्फ़ आठ दसवें ही क्यों?', a: 'क्योंकि ब्रेकर रेटिंग से ऊपर भी काफ़ी देर सह लेता है। तीन घंटे से अधिक चलने वाले भार के लिए 80% पर योजना बनाना प्रचलित नियम है।' },
      { q: 'क्या विदेश से लाया उपकरण चला सकते हैं?', a: 'तभी, जब वोल्टेज मेल खाए। अलग वोल्टेज पर धारा दोगुनी तक बदल जाती है, इसलिए सर्किट और सॉकेट दोनों फिर से देखने होंगे।' },
    ],
    [
      { q: '电水壶是多少安？', a: '2000W 时，220V 下 9.1A，120V 下 16.7A——功率除以电压。' },
      { q: '断路器为什么老跳？', a: '因为这一路上所有电器的电流加起来超过了它的额定值。电暖器和电水壶这样两个大件同在一路，通常就够了。' },
      { q: '插线板能插好几样吗？', a: '只要加起来不超过 15A。哪怕断路器是 32A，插线板也只到 15A，那时断路器不跳而插线板在发热。' },
      { q: '为什么只按八成算？', a: '因为断路器超过额定值后还能撑很久才跳。持续超过三小时的负载，通行做法是按 80% 规划。' },
      { q: '国外带回来的电器能直接用吗？', a: '电压对得上才行。电压不同，同一台电器的电流可差一倍，电路和插座都要重新判断。' },
    ],
    [
      { q: '電熱水壺是多少安？', a: '2000W 時，220V 下 9.1A，120V 下 16.7A——功率除以電壓。' },
      { q: '斷路器為什麼老跳？', a: '因為這一路上所有電器的電流加起來超過了它的額定值。電暖器和電熱水壺這樣兩個大件同在一路，通常就夠了。' },
      { q: '延長線能插好幾樣嗎？', a: '只要加起來不超過 15A。哪怕斷路器是 32A，延長線也只到 15A，那時斷路器不跳而延長線在發熱。' },
      { q: '為什麼只按八成算？', a: '因為斷路器超過額定值後還能撐很久才跳。持續超過三小時的負載，通行做法是按 80% 規劃。' },
      { q: '國外帶回來的電器能直接用嗎？', a: '電壓對得上才行。電壓不同，同一台電器的電流可差一倍，電路和插座都要重新判斷。' },
    ],
  ),

  cellFaq: T<(f: AmpereFacts) => FaqItem[]>(
    f => [
      { q: `${nameKo(f.cell.key)}는 몇 암페어인가요?`, a: `${f.watt}W를 ${f.volt}V로 나눠 ${f.amp}A입니다.` },
      { q: `이 회로에 몇 대까지 꽂을 수 있나요?`, a: `${f.together}대입니다. 차단기 ${f.breaker}A의 8할인 ${f.budget}A를 ${f.amp}A로 나눈 값입니다.` },
      { q: `멀티탭에 꽂아도 되나요?`, a: `${f.stripOk ? '됩니다. 흔한 멀티탭이 견디는 15A 안에 듭니다.' : '안 됩니다. 15A를 넘으므로 벽 콘센트에 바로 꽂으십시오.'}` },
      { q: `전선은 얼마나 굵어야 하나요?`, a: `${f.wire}면 이 전류를 무리 없이 흘립니다. 하루 두 시간 쓰면 한 달에 ${f.monthlyKwh}kWh입니다.` },
    ],
    f => [
      { q: `How many amps does a ${nameEn(f.cell.key)} draw?`, a: `${f.watt} W over ${f.volt} V is ${f.amp} A.` },
      { q: `How many fit on this circuit?`, a: `${f.together}. Eight tenths of the ${f.breaker} A breaker is ${f.budget} A, divided by ${f.amp} A.` },
      { q: `Is a power strip fine?`, a: `${f.stripOk ? 'Yes — it stays within the 15 A a common strip holds.' : 'No. It passes 15 A, so plug it straight into the wall.'}` },
      { q: `What wire does it need?`, a: `${f.wire} carries this current comfortably. Two hours a day comes to ${f.monthlyKwh} kWh a month.` },
    ],
    f => [
      { q: `¿Cuántos amperios consume un ${nameEs(f.cell.key)}?`, a: `${f.watt} W entre ${f.volt} V son ${f.amp} A.` },
      { q: `¿Cuántos caben en este circuito?`, a: `${f.together}. El 80% del magnetotérmico de ${f.breaker} A son ${f.budget} A, divididos por ${f.amp} A.` },
      { q: `¿Vale una regleta?`, a: `${f.stripOk ? 'Sí, se queda dentro de los 15 A que aguanta una regleta común.' : 'No. Pasa de 15 A, así que enchúfalo directo a la pared.'}` },
      { q: `¿Qué cable necesita?`, a: `${f.wire} lleva esta corriente sin apuros. Dos horas al día son ${f.monthlyKwh} kWh al mes.` },
    ],
    f => [
      { q: `Quantos ampères puxa um ${namePt(f.cell.key)}?`, a: `${f.watt} W por ${f.volt} V dão ${f.amp} A.` },
      { q: `Quantos cabem neste circuito?`, a: `${f.together}. Oito décimos do disjuntor de ${f.breaker} A são ${f.budget} A, divididos por ${f.amp} A.` },
      { q: `Pode em filtro de linha?`, a: `${f.stripOk ? 'Pode — fica dentro dos 15 A que um filtro comum aguenta.' : 'Não. Passa de 15 A, então ligue direto na parede.'}` },
      { q: `Que fio ele pede?`, a: `${f.wire} leva essa corrente com folga. Duas horas por dia dão ${f.monthlyKwh} kWh por mês.` },
    ],
    f => [
      { q: `${nameJa(f.cell.key)}は何アンペアですか？`, a: `${f.watt}Wを${f.volt}Vで割って${f.amp}Aです。` },
      { q: `この回路に何台まで挿せますか？`, a: `${f.together}台です。${f.breaker}Aブレーカーの8割である${f.budget}Aを${f.amp}Aで割った値です。` },
      { q: `テーブルタップに挿してよいですか？`, a: `${f.stripOk ? '大丈夫です。よくあるタップが耐える15Aの中に収まります。' : 'いけません。15Aを超えるので壁のコンセントに直接つないでください。'}` },
      { q: `電線はどれくらい太くすべきですか？`, a: `${f.wire}ならこの電流を無理なく流せます。1日2時間使うと1か月${f.monthlyKwh}kWhです。` },
    ],
    f => [
      { q: `Wie viel Ampere zieht ein ${nameDe(f.cell.key)}?`, a: `${f.watt} W durch ${f.volt} V sind ${f.amp} A.` },
      { q: `Wie viele passen an diesen Kreis?`, a: `${f.together}. Acht Zehntel der ${f.breaker}-A-Sicherung sind ${f.budget} A, geteilt durch ${f.amp} A.` },
      { q: `Geht eine Steckdosenleiste?`, a: `${f.stripOk ? 'Ja — es bleibt innerhalb der 15 A, die eine übliche Leiste hält.' : 'Nein. Es geht über 15 A, also direkt in die Wandsteckdose.'}` },
      { q: `Welchen Querschnitt braucht es?`, a: `${f.wire} trägt diesen Strom locker. Zwei Stunden täglich ergeben ${f.monthlyKwh} kWh im Monat.` },
    ],
    f => [
      { q: `Combien d’ampères pour un ${nameFr(f.cell.key)} ?`, a: `${f.watt} W divisés par ${f.volt} V font ${f.amp} A.` },
      { q: `Combien en tiennent sur ce circuit ?`, a: `${f.together}. Huit dixièmes du disjoncteur de ${f.breaker} A font ${f.budget} A, divisés par ${f.amp} A.` },
      { q: `Une multiprise convient-elle ?`, a: `${f.stripOk ? 'Oui — on reste sous les 15 A qu’une multiprise courante supporte.' : 'Non. Cela dépasse 15 A : branchez directement au mur.'}` },
      { q: `Quelle section de câble faut-il ?`, a: `${f.wire} porte ce courant sans peine. Deux heures par jour font ${f.monthlyKwh} kWh par mois.` },
    ],
    f => [
      { q: `${nameHi(f.cell.key)} कितने एम्पियर लेता है?`, a: `${f.watt} W को ${f.volt} V से भाग देने पर ${f.amp} A।` },
      { q: `इस सर्किट पर कितने लग सकते हैं?`, a: `${f.together}। ${f.breaker} A ब्रेकर का आठ दसवाँ यानी ${f.budget} A, उसे ${f.amp} A से भाग देकर।` },
      { q: `क्या पावर स्ट्रिप ठीक है?`, a: `${f.stripOk ? 'हाँ — यह आम स्ट्रिप की 15 A सीमा के भीतर है।' : 'नहीं। यह 15 A से ऊपर है, सीधे दीवार के सॉकेट में लगाएँ।'}` },
      { q: `तार कितना मोटा चाहिए?`, a: `${f.wire} इस धारा को आराम से ले जाता है। रोज़ दो घंटे चलाने पर महीने में ${f.monthlyKwh} kWh।` },
    ],
    f => [
      { q: `${nameZh(f.cell.key)}是多少安？`, a: `${f.watt}W 除以 ${f.volt}V 得 ${f.amp}A。` },
      { q: `这一路能插几台？`, a: `${f.together} 台。${f.breaker}A 断路器的八成是 ${f.budget}A，再除以 ${f.amp}A。` },
      { q: `能插插线板吗？`, a: `${f.stripOk ? '可以，在常见插线板能承受的 15A 之内。' : '不行。超过 15A，请直接插墙上插座。'}` },
      { q: `导线要多粗？`, a: `${f.wire} 能从容通过这个电流。每天用两小时，一个月约 ${f.monthlyKwh} 度。` },
    ],
    f => [
      { q: `${nameTw(f.cell.key)}是多少安？`, a: `${f.watt}W 除以 ${f.volt}V 得 ${f.amp}A。` },
      { q: `這一路能插幾台？`, a: `${f.together} 台。${f.breaker}A 斷路器的八成是 ${f.budget}A，再除以 ${f.amp}A。` },
      { q: `能插延長線嗎？`, a: `${f.stripOk ? '可以，在常見延長線能承受的 15A 之內。' : '不行。超過 15A，請直接插牆上插座。'}` },
      { q: `導線要多粗？`, a: `${f.wire} 能從容通過這個電流。每天用兩小時，一個月約 ${f.monthlyKwh} 度。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const AMPERE_UI: L<AmpereUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<AmpereUI>;
