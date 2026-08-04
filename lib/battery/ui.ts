/**
 * 충전 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "mAh만으로는 아무것도 알 수 없다"이다. 전압을
 * 곱해야 에너지가 되고, 충전기 쪽도 와트 하나가 아니라 전압과 전류의 곱이다.
 * 케이블에 칩이 필요한지, 기내에 들고 탈 수 있는지가 모두 거기서 갈린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BatteryFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface BatteryUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  whLabel: string;
  minutesLabel: string;
  to80Label: string;
  crateLabel: string;
  stepLabel: string;
  cableLabel: string;
  flightLabel: string;
  usableLabel: string;
  hourLabel: string;
  capacityLabel: string;
  wattLabel: string;
  cableChip: string;
  cablePlain: string;
  capacityName: (key: string) => string;
  chargerName: (key: string) => string;
  flightName: (key: string) => string;
  clock: (minutes: number) => string;
  mahTitle: string;
  mahNote: string;
  voltTitle: string;
  voltNote: string;
  cableTitle: string;
  cableNote: string;
  flightTitle: string;
  flightNote: string;
  usableTitle: string;
  usableNote: string;
  stepsTitle: string;
  stepsNote: string;
  tableTitle: string;
  neighbourTitle: string;
  wattTitle: string;
  capacityTitle: string;
  desc: (f: BatteryFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BatteryFacts) => string;
  metaDesc: (f: BatteryFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BatteryFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 분을 시간과 분으로 — 한 시간이 안 되면 분만 말한다 */
const clocker = (hour: string, min: string, join = ' ') =>
  (minutes: number): string => {
    if (minutes < 60) return `${minutes}${min}`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}${hour}` : [`${h}${hour}`, `${m}${min}`].join(join);
  };

const ko = clocker('시간', '분');
const en = clocker(' h', ' min');
const ja = clocker('時間', '分', '');
const hi = clocker(' घंटे', ' मिनट');
const zh = clocker('小时', '分', '');
const tw = clocker('小時', '分', '');

type Spec = { [K in keyof BatteryUI]: L<BatteryUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('배터리 충전', 'Battery charging', 'Carga de batería', 'Carga de bateria', 'バッテリー充電', 'Akkuladen', 'Charge de batterie', 'बैटरी चार्जिंग', '电池充电', '電池充電'),

  clock: T<(minutes: number) => string>(ko, en, en, en, ja, en, en, hi, zh, tw),

  capacityName: T<(key: string) => string>(
    pick({ phone: '휴대폰 한 대', powerbank: '흔한 보조배터리', flightLimit: '기내 한도 언저리', laptopBank: '노트북용 보조배터리' }),
    pick({ phone: 'a phone', powerbank: 'a common power bank', flightLimit: 'just under the cabin limit', laptopBank: 'a laptop power bank' }),
    pick({ phone: 'un teléfono', powerbank: 'una batería externa común', flightLimit: 'justo bajo el límite de cabina', laptopBank: 'una batería para portátil' }),
    pick({ phone: 'um celular', powerbank: 'uma bateria externa comum', flightLimit: 'logo abaixo do limite de cabine', laptopBank: 'uma bateria para notebook' }),
    pick({ phone: 'スマホ1台', powerbank: 'よくあるモバイルバッテリー', flightLimit: '機内持ち込みの上限すれすれ', laptopBank: 'ノートPC用バッテリー' }),
    pick({ phone: 'ein Handy', powerbank: 'eine übliche Powerbank', flightLimit: 'knapp unter dem Kabinenlimit', laptopBank: 'eine Laptop-Powerbank' }),
    pick({ phone: 'un téléphone', powerbank: 'une batterie externe courante', flightLimit: 'juste sous la limite en cabine', laptopBank: 'une batterie pour portable' }),
    pick({ phone: 'एक फ़ोन', powerbank: 'आम पावर बैंक', flightLimit: 'केबिन सीमा से ठीक नीचे', laptopBank: 'लैपटॉप पावर बैंक' }),
    pick({ phone: '一部手机', powerbank: '常见充电宝', flightLimit: '刚好在客舱上限之下', laptopBank: '笔记本充电宝' }),
    pick({ phone: '一支手機', powerbank: '常見行動電源', flightLimit: '剛好在客艙上限之下', laptopBank: '筆電行動電源' }),
  ),

  chargerName: T<(key: string) => string>(
    pick({ oldUsb: '옛 USB 충전기', phoneFast: '휴대폰 급속', laptop: '노트북 충전기', proLaptop: '고성능 노트북' }),
    pick({ oldUsb: 'an old USB charger', phoneFast: 'phone fast charging', laptop: 'a laptop charger', proLaptop: 'a workstation laptop' }),
    pick({ oldUsb: 'un cargador USB antiguo', phoneFast: 'carga rápida de teléfono', laptop: 'un cargador de portátil', proLaptop: 'un portátil de gama alta' }),
    pick({ oldUsb: 'um carregador USB antigo', phoneFast: 'carga rápida de celular', laptop: 'um carregador de notebook', proLaptop: 'um notebook de alto desempenho' }),
    pick({ oldUsb: '昔のUSB充電器', phoneFast: 'スマホの急速充電', laptop: 'ノートPCの充電器', proLaptop: '高性能ノートPC' }),
    pick({ oldUsb: 'ein altes USB-Netzteil', phoneFast: 'Handy-Schnellladen', laptop: 'ein Laptop-Netzteil', proLaptop: 'ein Hochleistungs-Laptop' }),
    pick({ oldUsb: 'un vieux chargeur USB', phoneFast: 'charge rapide de téléphone', laptop: 'un chargeur de portable', proLaptop: 'un portable haut de gamme' }),
    pick({ oldUsb: 'पुराना USB चार्जर', phoneFast: 'फ़ोन फ़ास्ट चार्जिंग', laptop: 'लैपटॉप चार्जर', proLaptop: 'हाई-एंड लैपटॉप' }),
    pick({ oldUsb: '老式 USB 充电器', phoneFast: '手机快充', laptop: '笔记本充电器', proLaptop: '高性能笔记本' }),
    pick({ oldUsb: '舊式 USB 充電器', phoneFast: '手機快充', laptop: '筆電充電器', proLaptop: '高效能筆電' }),
  ),

  flightName: T<(key: string) => string>(
    pick({ free: '그냥 들고 탑니다', approval: '항공사 승인이 필요합니다', banned: '여객기에 실을 수 없습니다' }),
    pick({ free: 'carry on freely', approval: 'needs airline approval', banned: 'not allowed on passenger flights' }),
    pick({ free: 'se lleva sin trámite', approval: 'requiere permiso de la aerolínea', banned: 'no se admite en vuelos de pasajeros' }),
    pick({ free: 'leva sem burocracia', approval: 'exige autorização da companhia', banned: 'não é aceita em voos de passageiros' }),
    pick({ free: 'そのまま持ち込めます', approval: '航空会社の承認が要ります', banned: '旅客機には載せられません' }),
    pick({ free: 'ohne Weiteres im Handgepäck', approval: 'braucht Zustimmung der Airline', banned: 'in Passagierflügen nicht erlaubt' }),
    pick({ free: 's’emporte sans formalité', approval: 'nécessite l’accord de la compagnie', banned: 'interdite sur les vols passagers' }),
    pick({ free: 'बिना अनुमति ले जा सकते हैं', approval: 'एयरलाइन की अनुमति चाहिए', banned: 'यात्री विमान में मना है' }),
    pick({ free: '可直接随身携带', approval: '需航空公司批准', banned: '客机不得携带' }),
    pick({ free: '可直接隨身攜帶', approval: '需航空公司核准', banned: '客機不得攜帶' }),
  ),

  hubTitle: T(
    '충전 200칸 — 5000mAh를 20W로 채우면 62분',
    '200 charge times — 5000 mAh at 20 W takes 62 minutes',
    '200 tiempos de carga — 5000 mAh a 20 W tarda 62 minutos',
    '200 tempos de carga — 5000 mAh a 20 W leva 62 minutos',
    '充電200マス — 5000mAhを20Wで62分',
    '200 Ladezeiten — 5000 mAh mit 20 W in 62 Minuten',
    '200 temps de charge — 5000 mAh à 20 W en 62 minutes',
    '200 चार्ज समय — 20 W पर 5000 mAh में 62 मिनट',
    '200 个充电时间 — 20W 给 5000mAh 充满需 62 分钟',
    '200 個充電時間 — 20W 給 5000mAh 充滿需 62 分鐘',
  ),

  hubLead: T(
    '배터리 용량 20가지와 충전기 10가지가 만나는 칸마다 채우는 시간을 계산했습니다. mAh는 전압을 곱해야 에너지가 되고, 충전기 와트도 전압과 전류의 곱입니다.',
    'A charge time for every meeting of 20 battery sizes and 10 chargers. mAh only becomes energy once you multiply by a voltage, and a charger’s watts are a voltage times a current.',
    'Un tiempo de carga para cada cruce de 20 baterías y 10 cargadores. Los mAh solo son energía al multiplicarlos por un voltaje, y los vatios del cargador son voltaje por corriente.',
    'Um tempo de carga para cada cruzamento de 20 baterias e 10 carregadores. Os mAh só viram energia ao multiplicar por uma tensão, e os watts do carregador são tensão vezes corrente.',
    'バッテリー容量20通りと充電器10通りが出会う各マスの充電時間を計算しました。mAhは電圧を掛けて初めてエネルギーになり、充電器のワットも電圧と電流の積です。',
    'Eine Ladezeit für jede Begegnung von 20 Akkugrößen und 10 Netzteilen. mAh werden erst mit einer Spannung zu Energie, und die Watt eines Netzteils sind Spannung mal Strom.',
    'Un temps de charge pour chaque croisement de 20 batteries et 10 chargeurs. Les mAh ne deviennent de l’énergie qu’en les multipliant par une tension, et les watts d’un chargeur sont une tension fois un courant.',
    '20 बैटरी आकार और 10 चार्जर के हर मेल का चार्ज समय। mAh तभी ऊर्जा बनते हैं जब वोल्टेज से गुणा करें, और चार्जर के वाट भी वोल्टेज गुणा करंट हैं।',
    '20 种电池容量与 10 种充电器交汇的每一格都算出充电时间。mAh 要乘以电压才是能量，充电器的瓦数也是电压乘电流。',
    '20 種電池容量與 10 種充電器交匯的每一格都算出充電時間。mAh 要乘以電壓才是能量，充電器的瓦數也是電壓乘電流。',
  ),

  whLabel: T('담긴 에너지', 'Energy stored', 'Energía almacenada', 'Energia armazenada', '蓄えられた電力量', 'Gespeicherte Energie', 'Énergie stockée', 'संचित ऊर्जा', '储存的能量', '儲存的能量'),
  minutesLabel: T('가득 채우기', 'Time to full', 'Tiempo hasta llenar', 'Tempo até encher', '満充電まで', 'Bis voll', 'Jusqu’à la charge pleine', 'पूरा भरने में', '充满所需', '充滿所需'),
  to80Label: T('80%까지', 'Time to 80%', 'Hasta el 80%', 'Até 80%', '80%まで', 'Bis 80 %', 'Jusqu’à 80 %', '80% तक', '到 80%', '到 80%'),
  crateLabel: T('충전 속도', 'Charge rate', 'Tasa de carga', 'Taxa de carga', '充電レート', 'Laderate', 'Taux de charge', 'चार्ज दर', '充电倍率', '充電倍率'),
  stepLabel: T('전압과 전류', 'Voltage and current', 'Voltaje y corriente', 'Tensão e corrente', '電圧と電流', 'Spannung und Strom', 'Tension et courant', 'वोल्टेज और करंट', '电压与电流', '電壓與電流'),
  cableLabel: T('케이블', 'Cable', 'Cable', 'Cabo', 'ケーブル', 'Kabel', 'Câble', 'केबल', '数据线', '傳輸線'),
  flightLabel: T('기내 반입', 'On a plane', 'En el avión', 'No avião', '機内持ち込み', 'Im Flugzeug', 'En avion', 'विमान में', '登机携带', '登機攜帶'),
  usableLabel: T('5V로 옮겨지는 양', 'What moves at 5 V', 'Lo que pasa a 5 V', 'O que passa a 5 V', '5Vで移せる量', 'Was bei 5 V ankommt', 'Ce qui passe en 5 V', '5 V पर जो जाता है', '按 5V 能输出', '按 5V 能輸出'),
  hourLabel: T('한 시간에 채우려면', 'To fill it within an hour', 'Para llenarla en una hora', 'Para encher em uma hora', '1時間で満たすには', 'Um in einer Stunde zu füllen', 'Pour la remplir en une heure', 'एक घंटे में भरने के लिए', '想一小时充满', '想一小時充滿'),
  capacityLabel: T('배터리 용량', 'Battery size', 'Capacidad de la batería', 'Capacidade da bateria', 'バッテリー容量', 'Akkugröße', 'Capacité de la batterie', 'बैटरी क्षमता', '电池容量', '電池容量'),
  wattLabel: T('충전기 출력', 'Charger output', 'Salida del cargador', 'Saída do carregador', '充電器の出力', 'Netzteil-Leistung', 'Puissance du chargeur', 'चार्जर आउटपुट', '充电器输出', '充電器輸出'),

  cableChip: T('칩이 든 케이블이 필요합니다', 'Needs a chipped cable', 'Necesita cable con chip', 'Precisa de cabo com chip', 'チップ入りケーブルが必要', 'Braucht ein Kabel mit Chip', 'Câble à puce nécessaire', 'चिप वाली केबल चाहिए', '需要带芯片的线', '需要帶晶片的線'),
  cablePlain: T('아무 케이블이나 됩니다', 'Any cable will do', 'Sirve cualquier cable', 'Qualquer cabo serve', 'どのケーブルでも大丈夫', 'Jedes Kabel genügt', 'N’importe quel câble suffit', 'कोई भी केबल चलेगी', '普通线就够', '普通線就夠'),

  mahTitle: T('mAh는 에너지가 아닙니다', 'mAh is not energy', 'Los mAh no son energía', 'mAh não é energia', 'mAhはエネルギーではありません', 'mAh ist keine Energie', 'Les mAh ne sont pas de l’énergie', 'mAh ऊर्जा नहीं है', 'mAh 不是能量', 'mAh 不是能量'),

  mahNote: T(
    'mAh는 "몇 밀리암페어를 한 시간 흘릴 수 있나"일 뿐이라, 전압을 곱해야 비로소 에너지가 됩니다. 여기서는 제조사가 Wh를 적을 때 쓰는 3.7V를 씁니다. 5000mAh는 18.5Wh이고, 같은 5000mAh라도 전압이 다른 배터리는 담긴 것이 다릅니다.',
    'mAh only says how many milliamps could flow for an hour; multiply by a voltage and you finally have energy. This page uses 3.7 V, the figure makers themselves use when they print Wh. So 5000 mAh is 18.5 Wh — and two 5000 mAh cells at different voltages hold different amounts.',
    'Los mAh solo dicen cuántos miliamperios podrían fluir durante una hora; al multiplicar por un voltaje aparece la energía. Aquí se usa 3,7 V, el valor que los fabricantes emplean para imprimir los Wh. Así 5000 mAh son 18,5 Wh, y dos celdas de 5000 mAh a distinto voltaje guardan cantidades distintas.',
    'Os mAh só dizem quantos miliampères poderiam fluir por uma hora; multiplicando por uma tensão surge a energia. Aqui usamos 3,7 V, o valor que os fabricantes usam para imprimir os Wh. Então 5000 mAh são 18,5 Wh, e duas células de 5000 mAh em tensões diferentes guardam quantidades diferentes.',
    'mAhは「何ミリアンペアを1時間流せるか」でしかなく、電圧を掛けて初めてエネルギーになります。ここではメーカーがWhを書くときに使う3.7Vを使います。5000mAhは18.5Whで、同じ5000mAhでも電圧が違えば中身は違います。',
    'mAh sagt nur, wie viele Milliampere eine Stunde lang fließen könnten; erst mal Spannung wird daraus Energie. Diese Seite rechnet mit 3,7 V — dem Wert, mit dem Hersteller selbst ihre Wh aufdrucken. 5000 mAh sind also 18,5 Wh, und zwei 5000-mAh-Zellen mit verschiedener Spannung fassen Verschiedenes.',
    'Les mAh disent seulement combien de milliampères pourraient circuler pendant une heure ; c’est en multipliant par une tension qu’apparaît l’énergie. Cette page utilise 3,7 V, la valeur que les fabricants emploient pour imprimer les Wh. 5000 mAh valent donc 18,5 Wh, et deux cellules de 5000 mAh à tensions différentes ne contiennent pas la même chose.',
    'mAh केवल बताता है कि एक घंटे तक कितने मिलीएम्पियर बह सकते हैं; वोल्टेज से गुणा करने पर ही ऊर्जा बनती है। यहाँ 3.7 V लिया गया है, वही जो निर्माता Wh छापते समय इस्तेमाल करते हैं। इसलिए 5000 mAh यानी 18.5 Wh, और अलग वोल्टेज वाली दो 5000 mAh सेल में अलग-अलग ऊर्जा होती है।',
    'mAh 只说明能以多少毫安流一小时，乘上电压才成为能量。本页用 3.7V，也就是厂商标注 Wh 时用的数值。所以 5000mAh 是 18.5Wh，而同样 5000mAh、电压不同的电池装的并不一样多。',
    'mAh 只說明能以多少毫安流一小時，乘上電壓才成為能量。本頁用 3.7V，也就是廠商標註 Wh 時用的數值。所以 5000mAh 是 18.5Wh，而同樣 5000mAh、電壓不同的電池裝的並不一樣多。',
  ),

  voltTitle: T('같은 와트, 다른 전압', 'Same watts, different volts', 'Mismos vatios, distinto voltaje', 'Mesmos watts, tensões diferentes', '同じワット、違う電圧', 'Gleiche Watt, andere Spannung', 'Mêmes watts, tensions différentes', 'वही वाट, अलग वोल्टेज', '同样的瓦数，不同的电压', '同樣的瓦數，不同的電壓'),

  voltNote: T(
    '충전기에 적힌 와트는 전압과 전류의 곱입니다. 20W를 5V로 내면 4A가 되는데 칩 없는 케이블은 3A까지라, 실제로는 9V·2.22A로 흐릅니다. 전압을 올려 전류를 낮추는 것이 USB PD가 하는 일입니다.',
    'The watts on a charger are a voltage times a current. Twenty watts at 5 V would be 4 A, past what a plain cable carries, so it runs 9 V at 2.22 A instead. Raising the voltage to lower the current is exactly what USB PD does.',
    'Los vatios de un cargador son voltaje por corriente. Veinte vatios a 5 V serían 4 A, más de lo que lleva un cable normal, así que funciona a 9 V y 2,22 A. Subir el voltaje para bajar la corriente es justo lo que hace USB PD.',
    'Os watts de um carregador são tensão vezes corrente. Vinte watts a 5 V seriam 4 A, acima do que um cabo comum leva, então ele opera a 9 V e 2,22 A. Elevar a tensão para baixar a corrente é exatamente o que o USB PD faz.',
    '充電器のワットは電圧と電流の積です。20Wを5Vで出すと4Aになり、チップのないケーブルの3Aを超えるので、実際は9V・2.22Aで流れます。電圧を上げて電流を下げるのがUSB PDの仕事です。',
    'Die Watt auf einem Netzteil sind Spannung mal Strom. Zwanzig Watt bei 5 V wären 4 A und damit mehr, als ein einfaches Kabel trägt — also läuft es mit 9 V und 2,22 A. Spannung hoch, Strom runter: genau das macht USB PD.',
    'Les watts d’un chargeur sont une tension fois un courant. Vingt watts en 5 V feraient 4 A, au-delà de ce que porte un câble simple : il fonctionne donc en 9 V à 2,22 A. Monter la tension pour baisser le courant, c’est exactement le rôle de l’USB PD.',
    'चार्जर पर लिखे वाट वोल्टेज गुणा करंट हैं। 20 वाट 5 V पर 4 A बनते, जो साधारण केबल की सीमा से ऊपर है, इसलिए वह 9 V पर 2.22 A चलाता है। वोल्टेज बढ़ाकर करंट घटाना ही USB PD का काम है।',
    '充电器上的瓦数是电压乘电流。20W 若用 5V 就是 4A，超过普通线能承受的电流，所以实际走 9V、2.22A。抬高电压来降低电流，正是 USB PD 在做的事。',
    '充電器上的瓦數是電壓乘電流。20W 若用 5V 就是 4A，超過普通線能承受的電流，所以實際走 9V、2.22A。抬高電壓來降低電流，正是 USB PD 在做的事。',
  ),

  cableTitle: T('60W가 케이블의 갈림길', '60 W is where cables part ways', '60 W separa los cables', '60 W separa os cabos', '60Wがケーブルの分かれ目', 'Bei 60 W trennen sich die Kabel', '60 W, le point de bascule des câbles', '60 W पर केबल बदलती है', '60W 是数据线的分界', '60W 是傳輸線的分界'),

  cableNote: T(
    '칩 없는 케이블은 3A까지 흘립니다. 오래된 규격의 끝인 20V에 3A를 곱하면 60W라, 그 위부터는 케이블 안에 칩이 들어 5A까지 흘릴 수 있다고 알려 줘야 합니다. 65W 충전기를 꽂았는데 속도가 안 나오면 대개 케이블 쪽입니다.',
    'A plain cable carries 3 A. Twenty volts — the ceiling of the older standard — times 3 A is 60 W, so above that the cable needs a chip inside to declare it can carry 5 A. When a 65 W charger fails to speed things up, the cable is usually why.',
    'Un cable normal lleva 3 A. Veinte voltios, el techo del estándar antiguo, por 3 A son 60 W: por encima, el cable necesita un chip que declare que aguanta 5 A. Cuando un cargador de 65 W no acelera nada, casi siempre es el cable.',
    'Um cabo comum leva 3 A. Vinte volts — o teto da norma antiga — vezes 3 A dá 60 W, então acima disso o cabo precisa de um chip que declare suportar 5 A. Quando um carregador de 65 W não acelera nada, normalmente é o cabo.',
    'チップのないケーブルは3Aまでです。古い規格の上限である20Vに3Aを掛けると60Wなので、それより上ではケーブルの中にチップが入って5Aまで流せると伝える必要があります。65W充電器をつないでも速くならないときは、たいていケーブルが理由です。',
    'Ein einfaches Kabel trägt 3 A. Zwanzig Volt — die Obergrenze des älteren Standards — mal 3 A sind 60 W; darüber braucht das Kabel einen Chip, der 5 A meldet. Wenn ein 65-W-Netzteil nichts beschleunigt, liegt es meist am Kabel.',
    'Un câble simple porte 3 A. Vingt volts — le plafond de l’ancienne norme — fois 3 A font 60 W : au-delà, le câble doit contenir une puce déclarant qu’il tient 5 A. Quand un chargeur 65 W n’accélère rien, c’est presque toujours le câble.',
    'साधारण केबल 3 A तक ले जाती है। पुराने मानक की सीमा 20 V को 3 A से गुणा करें तो 60 W — इससे ऊपर केबल में चिप चाहिए जो बताए कि वह 5 A सह सकती है। 65 W चार्जर लगाने पर भी तेज़ी न आए तो अक्सर केबल ही कारण है।',
    '普通线只能过 3A。旧规格上限 20V 乘 3A 正好 60W，再往上线里就得有芯片来声明可以过 5A。插上 65W 充电器却快不起来，多半问题在线上。',
    '普通線只能過 3A。舊規格上限 20V 乘 3A 正好 60W，再往上線裡就得有晶片來聲明可以過 5A。插上 65W 充電器卻快不起來，多半問題在線上。',
  ),

  flightTitle: T('기내에 들고 탈 수 있는 선', 'The line for carrying it on board', 'El límite para llevarla a bordo', 'O limite para levar a bordo', '機内に持ち込める線', 'Die Grenze fürs Handgepäck', 'La limite pour l’emporter en cabine', 'विमान में ले जाने की सीमा', '能否带上飞机的界线', '能否帶上飛機的界線'),

  flightNote: T(
    '100Wh 아래는 그냥 들고 타고, 160Wh까지는 항공사 승인을 받아 두 개까지, 그 위는 여객기에 실을 수 없습니다. 26800mAh 보조배터리가 흔한 것도 3.7V를 곱하면 99.16Wh라 이 선 바로 아래이기 때문입니다.',
    'Under 100 Wh you simply carry it on. Up to 160 Wh you may bring two with the airline’s approval. Above that it does not fly on passenger aircraft. The reason 26,800 mAh power banks are everywhere: times 3.7 V that is 99.16 Wh, right under the line.',
    'Por debajo de 100 Wh se lleva sin más. Hasta 160 Wh se admiten dos con permiso de la aerolínea. Por encima no viaja en aviones de pasajeros. Por eso abundan las baterías de 26 800 mAh: por 3,7 V son 99,16 Wh, justo bajo el límite.',
    'Abaixo de 100 Wh você simplesmente leva. Até 160 Wh pode levar duas com autorização da companhia. Acima disso não viaja em avião de passageiros. É por isso que baterias de 26 800 mAh são tão comuns: vezes 3,7 V dá 99,16 Wh, logo abaixo do limite.',
    '100Wh未満はそのまま持ち込め、160Whまでは航空会社の承認を得て2個まで、それ以上は旅客機に載せられません。26800mAhのモバイルバッテリーが多いのも、3.7Vを掛けると99.16Whでこの線のすぐ下だからです。',
    'Unter 100 Wh nimmt man ihn einfach mit. Bis 160 Wh sind zwei Stück mit Zustimmung der Airline erlaubt. Darüber fliegt er nicht im Passagierflugzeug. Deshalb gibt es so viele 26.800-mAh-Powerbanks: mal 3,7 V sind das 99,16 Wh, knapp unter der Grenze.',
    'Sous 100 Wh, on l’emporte sans formalité. Jusqu’à 160 Wh, deux exemplaires sont admis avec l’accord de la compagnie. Au-delà, elle ne vole pas sur un vol passagers. D’où l’omniprésence des batteries de 26 800 mAh : fois 3,7 V, cela fait 99,16 Wh, juste sous la limite.',
    '100 Wh से नीचे बिना अनुमति ले जा सकते हैं। 160 Wh तक एयरलाइन की अनुमति से दो तक। उससे ऊपर यात्री विमान में नहीं जाती। 26,800 mAh पावर बैंक इतने आम इसीलिए हैं: 3.7 V से गुणा करने पर 99.16 Wh, सीमा से ठीक नीचे।',
    '低于 100Wh 可直接携带；到 160Wh 经航空公司批准最多带两块；再往上客机不得携带。26800mAh 充电宝之所以常见，就是因为乘 3.7V 是 99.16Wh，刚好在界线之下。',
    '低於 100Wh 可直接攜帶；到 160Wh 經航空公司核准最多帶兩顆；再往上客機不得攜帶。26800mAh 行動電源之所以常見，就是因為乘 3.7V 是 99.16Wh，剛好在界線之下。',
  ),

  usableTitle: T('보조배터리 표기와 실제', 'What a power bank really moves', 'Lo que una batería externa mueve de verdad', 'O que uma bateria externa realmente entrega', 'モバイルバッテリーの表記と実際', 'Was eine Powerbank wirklich abgibt', 'Ce qu’une batterie externe transfère vraiment', 'पावर बैंक असल में कितना देता है', '充电宝标注与实际', '行動電源標註與實際'),

  usableNote: T(
    '10000mAh 보조배터리로 5000mAh 휴대폰을 두 번 채우지 못합니다. 안에 든 것은 3.7V 기준이고 나가는 것은 5V라 전압 비만큼 줄고, 올리는 동안 열로도 샙니다. 실제로 옮겨지는 것은 6660mAh 남짓입니다.',
    'A 10,000 mAh power bank will not fill a 5000 mAh phone twice. What is inside is measured at 3.7 V while what leaves is 5 V, so it shrinks by that ratio and leaks more as heat on the way up. About 6660 mAh actually moves.',
    'Una batería externa de 10 000 mAh no llena dos veces un teléfono de 5000 mAh. Lo de dentro se mide a 3,7 V y lo que sale es de 5 V, así que encoge en esa proporción y además se pierde calor al elevarlo. Se transfieren unos 6660 mAh.',
    'Uma bateria externa de 10 000 mAh não enche duas vezes um celular de 5000 mAh. O que está dentro é medido a 3,7 V e o que sai é 5 V, então encolhe nessa proporção e ainda perde calor no caminho. Passam cerca de 6660 mAh.',
    '10000mAhのモバイルバッテリーで5000mAhのスマホを2回は満たせません。中は3.7V基準、出るのは5Vなので電圧比の分だけ減り、上げる途中で熱としても逃げます。実際に移るのは6660mAhほどです。',
    'Eine 10.000-mAh-Powerbank füllt ein 5000-mAh-Handy nicht zweimal. Innen wird bei 3,7 V gezählt, heraus kommen 5 V — also schrumpft es um dieses Verhältnis, und beim Hochsetzen geht weitere Wärme verloren. Tatsächlich wandern etwa 6660 mAh.',
    'Une batterie externe de 10 000 mAh ne remplit pas deux fois un téléphone de 5000 mAh. L’intérieur se compte en 3,7 V et la sortie est en 5 V : le chiffre rétrécit d’autant, et l’élévation dissipe encore de la chaleur. Environ 6660 mAh passent réellement.',
    '10,000 mAh का पावर बैंक 5000 mAh के फ़ोन को दो बार नहीं भरता। अंदर का माप 3.7 V पर है और बाहर आता है 5 V, इसलिए उसी अनुपात में घटता है और बढ़ाते समय गर्मी में भी जाता है। असल में लगभग 6660 mAh ही जाता है।',
    '10000mAh 的充电宝并不能把 5000mAh 的手机充满两次。里面按 3.7V 计，出去的是 5V，按电压比缩水，升压途中还发热损耗。真正搬过去的大约是 6660mAh。',
    '10000mAh 的行動電源並不能把 5000mAh 的手機充滿兩次。裡面按 3.7V 計，出去的是 5V，按電壓比縮水，升壓途中還發熱損耗。真正搬過去的大約是 6660mAh。',
  ),

  stepsTitle: T('이 충전기가 낼 수 있는 단계', 'Steps this charger can offer', 'Escalones que puede dar este cargador', 'Degraus que este carregador pode dar', 'この充電器が出せる段階', 'Stufen, die dieses Netzteil bietet', 'Paliers que ce chargeur peut fournir', 'यह चार्जर जो चरण दे सकता है', '这个充电器能给的档位', '這個充電器能給的檔位'),

  stepsNote: T(
    'USB PD는 아무 전압이나 쓰지 않고 정해진 단계 중 하나를 고릅니다. 같은 와트라도 전압이 높을수록 전류가 낮아지고, 3A를 넘는 단계는 칩이 든 케이블이 있어야 합니다.',
    'USB PD does not use arbitrary voltages; it picks one of the fixed steps. At the same wattage a higher voltage means a lower current, and any step above 3 A needs a chipped cable.',
    'USB PD no usa voltajes arbitrarios: elige uno de los escalones fijos. Con los mismos vatios, más voltaje significa menos corriente, y cualquier escalón por encima de 3 A exige cable con chip.',
    'O USB PD não usa tensões arbitrárias: escolhe um dos degraus fixos. Com os mesmos watts, mais tensão significa menos corrente, e qualquer degrau acima de 3 A exige cabo com chip.',
    'USB PDは任意の電圧を使わず、決められた段階のどれかを選びます。同じワットでも電圧が高いほど電流は低くなり、3Aを超える段階にはチップ入りケーブルが要ります。',
    'USB PD nutzt keine beliebigen Spannungen, sondern eine der festen Stufen. Bei gleicher Leistung bedeutet mehr Spannung weniger Strom, und jede Stufe über 3 A braucht ein Kabel mit Chip.',
    'L’USB PD n’utilise pas n’importe quelle tension : il choisit l’un des paliers fixes. À puissance égale, plus la tension est haute, plus le courant est bas, et tout palier au-delà de 3 A exige un câble à puce.',
    'USB PD मनमाना वोल्टेज नहीं लेता; तय चरणों में से एक चुनता है। समान वाट पर वोल्टेज जितना अधिक, करंट उतना कम — और 3 A से ऊपर के हर चरण के लिए चिप वाली केबल चाहिए।',
    'USB PD 不会用任意电压，只在固定档位里挑一个。瓦数相同时，电压越高电流越低，超过 3A 的档位都需要带芯片的线。',
    'USB PD 不會用任意電壓，只在固定檔位裡挑一個。瓦數相同時，電壓越高電流越低，超過 3A 的檔位都需要帶晶片的線。',
  ),

  tableTitle: T('용량과 충전기로 찾기', 'Find it by battery and charger', 'Búscalo por batería y cargador', 'Ache por bateria e carregador', '容量と充電器から探す', 'Nach Akku und Netzteil suchen', 'Chercher par batterie et chargeur', 'बैटरी और चार्जर से देखें', '按容量和充电器查找', '按容量和充電器查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  wattTitle: T('같은 배터리, 다른 충전기', 'Same battery, other chargers', 'Misma batería, otros cargadores', 'Mesma bateria, outros carregadores', '同じバッテリー、別の充電器', 'Gleicher Akku, andere Netzteile', 'Même batterie, autres chargeurs', 'वही बैटरी, दूसरे चार्जर', '同一电池，不同充电器', '同一電池，不同充電器'),
  capacityTitle: T('같은 충전기, 다른 배터리', 'Same charger, other batteries', 'Mismo cargador, otras baterías', 'Mesmo carregador, outras baterias', '同じ充電器、別のバッテリー', 'Gleiches Netzteil, andere Akkus', 'Même chargeur, autres batteries', 'वही चार्जर, दूसरी बैटरियाँ', '同一充电器，不同电池', '同一充電器，不同電池'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '표의 시간은 충전기 출력이 처음부터 끝까지 유지될 때입니다. 실제로는 80%를 넘으면 눈에 띄게 느려집니다.',
      'mAh에 3.7V를 곱해 Wh로 바꿉니다. 전압이 없으면 서로 다른 배터리를 견줄 수 없습니다.',
      '충전기가 낸 것의 90%가 배터리에 남습니다 — 나머지는 열입니다.',
      '60W를 넘으면 케이블에 칩이 들어야 합니다. 20V·3A가 칩 없는 케이블의 끝입니다.',
    ],
    [
      'These times assume the charger holds its output from start to finish. In practice everything slows noticeably past 80%.',
      'Multiply mAh by 3.7 V to get Wh. Without a voltage you cannot compare two different batteries at all.',
      'About 90% of what the charger delivers ends up in the battery — the rest becomes heat.',
      'Above 60 W the cable needs a chip inside. Twenty volts at 3 A is where a plain cable stops.',
    ],
    [
      'Estos tiempos suponen que el cargador mantiene su salida de principio a fin. En la práctica todo se frena notablemente pasado el 80%.',
      'Multiplica los mAh por 3,7 V para obtener Wh. Sin voltaje no se pueden comparar dos baterías distintas.',
      'Alrededor del 90% de lo que entrega el cargador acaba en la batería; el resto se vuelve calor.',
      'Por encima de 60 W el cable necesita un chip. Veinte voltios a 3 A es donde termina un cable normal.',
    ],
    [
      'Estes tempos supõem que o carregador mantém a saída do início ao fim. Na prática tudo desacelera bastante depois de 80%.',
      'Multiplique os mAh por 3,7 V para obter Wh. Sem tensão não dá para comparar duas baterias diferentes.',
      'Cerca de 90% do que o carregador entrega fica na bateria; o resto vira calor.',
      'Acima de 60 W o cabo precisa de um chip. Vinte volts a 3 A é onde um cabo comum termina.',
    ],
    [
      '表の時間は充電器の出力が最初から最後まで保たれた場合です。実際は80%を超えると目に見えて遅くなります。',
      'mAhに3.7Vを掛けてWhにします。電圧がなければ違うバッテリー同士を比べられません。',
      '充電器が出したうち9割がバッテリーに残ります。残りは熱です。',
      '60Wを超えるとケーブルにチップが要ります。20V・3Aがチップなしケーブルの終わりです。',
    ],
    [
      'Diese Zeiten setzen voraus, dass das Netzteil seine Leistung durchhält. In der Praxis wird es ab 80 % deutlich langsamer.',
      'mAh mal 3,7 V ergibt Wh. Ohne Spannung lassen sich zwei verschiedene Akkus gar nicht vergleichen.',
      'Rund 90 % dessen, was das Netzteil liefert, landen im Akku — der Rest wird Wärme.',
      'Über 60 W braucht das Kabel einen Chip. Zwanzig Volt bei 3 A ist die Grenze eines einfachen Kabels.',
    ],
    [
      'Ces temps supposent que le chargeur tient sa puissance du début à la fin. En pratique, tout ralentit nettement passé 80 %.',
      'Multipliez les mAh par 3,7 V pour obtenir des Wh. Sans tension, impossible de comparer deux batteries différentes.',
      'Environ 90 % de ce que fournit le chargeur finit dans la batterie ; le reste devient de la chaleur.',
      'Au-delà de 60 W, le câble doit contenir une puce. Vingt volts à 3 A, c’est là que s’arrête un câble simple.',
    ],
    [
      'ये समय मानते हैं कि चार्जर शुरू से अंत तक अपना आउटपुट बनाए रखता है। असल में 80% के बाद सब काफ़ी धीमा हो जाता है।',
      'mAh को 3.7 V से गुणा करके Wh पाएँ। वोल्टेज के बिना दो अलग बैटरियों की तुलना ही नहीं हो सकती।',
      'चार्जर जो देता है उसका लगभग 90% बैटरी में जाता है — बाकी गर्मी बन जाता है।',
      '60 W से ऊपर केबल में चिप चाहिए। 20 V पर 3 A ही साधारण केबल की सीमा है।',
    ],
    [
      '表中的时间假设充电器全程保持输出。实际上过了 80% 会明显变慢。',
      'mAh 乘以 3.7V 得到 Wh。没有电压就无法比较两块不同的电池。',
      '充电器输出的约九成留在电池里，其余变成热。',
      '超过 60W，线里就要有芯片。20V、3A 是普通线的尽头。',
    ],
    [
      '表中的時間假設充電器全程保持輸出。實際上過了 80% 會明顯變慢。',
      'mAh 乘以 3.7V 得到 Wh。沒有電壓就無法比較兩顆不同的電池。',
      '充電器輸出的約九成留在電池裡，其餘變成熱。',
      '超過 60W，線裡就要有晶片。20V、3A 是普通線的盡頭。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '배터리 충전 시간 — 용량 20가지 × 충전기 10가지',
    'Battery charging time — 20 capacities across 10 chargers',
    'Tiempo de carga de batería — 20 capacidades y 10 cargadores',
    'Tempo de carga de bateria — 20 capacidades e 10 carregadores',
    'バッテリー充電時間 — 容量20通り×充電器10通り',
    'Akku-Ladezeit — 20 Kapazitäten und 10 Netzteile',
    'Temps de charge — 20 capacités et 10 chargeurs',
    'बैटरी चार्ज समय — 20 क्षमताएँ और 10 चार्जर',
    '电池充电时间 — 20 种容量 × 10 种充电器',
    '電池充電時間 — 20 種容量 × 10 種充電器',
  ),

  hubMetaDesc: T(
    '5000mAh를 20W로 채우면 62분. 용량과 충전기가 만나는 200칸마다 충전 시간, 전압과 전류, 케이블에 칩이 필요한지, 기내 반입까지 계산했습니다.',
    '5000 mAh at 20 W takes 62 minutes. For all 200 pairings of battery and charger: the time, the voltage and current, whether the cable needs a chip, and what flies.',
    '5000 mAh a 20 W tarda 62 minutos. Para los 200 cruces de batería y cargador: el tiempo, voltaje y corriente, si el cable necesita chip y qué puede volar.',
    '5000 mAh a 20 W leva 62 minutos. Para os 200 cruzamentos de bateria e carregador: o tempo, tensão e corrente, se o cabo precisa de chip e o que pode voar.',
    '5000mAhを20Wで62分。容量と充電器が出会う200マスごとの充電時間、電圧と電流、ケーブルにチップが要るか、機内持ち込みまで計算しました。',
    '5000 mAh mit 20 W in 62 Minuten. Für alle 200 Kombinationen aus Akku und Netzteil: Zeit, Spannung und Strom, ob das Kabel einen Chip braucht und was ins Flugzeug darf.',
    '5000 mAh à 20 W en 62 minutes. Pour les 200 croisements batterie × chargeur : le temps, la tension et le courant, si le câble doit avoir une puce, et ce qui peut voler.',
    '20 W पर 5000 mAh में 62 मिनट। बैटरी और चार्जर के सभी 200 मेलों का समय, वोल्टेज और करंट, केबल में चिप चाहिए या नहीं, और विमान में क्या ले जा सकते हैं।',
    '20W 给 5000mAh 充满需 62 分钟。电池与充电器交汇的 200 格，每格的时间、电压电流、线是否需要芯片，以及能否登机。',
    '20W 給 5000mAh 充滿需 62 分鐘。電池與充電器交匯的 200 格，每格的時間、電壓電流、線是否需要晶片，以及能否登機。',
  ),

  desc: T<(f: BatteryFacts) => string>(
    f => `${f.wh}Wh를 ${f.cell.watt}W로 채웁니다. 충전기는 ${f.step.volt}V·${f.step.amp}A로 흐르고, 배터리에 남는 것은 낸 것의 90%입니다.`,
    f => `${f.wh} Wh filled at ${f.cell.watt} W. The charger runs ${f.step.volt} V at ${f.step.amp} A, and about 90% of what it delivers stays in the battery.`,
    f => `${f.wh} Wh cargados a ${f.cell.watt} W. El cargador va a ${f.step.volt} V y ${f.step.amp} A, y cerca del 90% de lo que entrega se queda en la batería.`,
    f => `${f.wh} Wh carregados a ${f.cell.watt} W. O carregador vai a ${f.step.volt} V e ${f.step.amp} A, e cerca de 90% do que entrega fica na bateria.`,
    f => `${f.wh}Whを${f.cell.watt}Wで満たします。充電器は${f.step.volt}V・${f.step.amp}Aで流れ、出したうち9割がバッテリーに残ります。`,
    f => `${f.wh} Wh mit ${f.cell.watt} W geladen. Das Netzteil läuft mit ${f.step.volt} V bei ${f.step.amp} A, und rund 90 % davon bleiben im Akku.`,
    f => `${f.wh} Wh chargés à ${f.cell.watt} W. Le chargeur fonctionne en ${f.step.volt} V à ${f.step.amp} A, et environ 90 % de ce qu’il fournit reste dans la batterie.`,
    f => `${f.wh} Wh को ${f.cell.watt} W से भरा जाता है। चार्जर ${f.step.volt} V पर ${f.step.amp} A चलाता है, और जो देता है उसका लगभग 90% बैटरी में रहता है।`,
    f => `用 ${f.cell.watt}W 充 ${f.wh}Wh。充电器走 ${f.step.volt}V、${f.step.amp}A，输出的约九成留在电池里。`,
    f => `用 ${f.cell.watt}W 充 ${f.wh}Wh。充電器走 ${f.step.volt}V、${f.step.amp}A，輸出的約九成留在電池裡。`,
  ),

  metaTitle: T<(f: BatteryFacts) => string>(
    f => `${f.cell.mah}mAh를 ${f.cell.watt}W로 — ${ko(f.minutes)}`,
    f => `${f.cell.mah} mAh at ${f.cell.watt} W — ${en(f.minutes)}`,
    f => `${f.cell.mah} mAh a ${f.cell.watt} W — ${en(f.minutes)}`,
    f => `${f.cell.mah} mAh a ${f.cell.watt} W — ${en(f.minutes)}`,
    f => `${f.cell.mah}mAhを${f.cell.watt}Wで — ${ja(f.minutes)}`,
    f => `${f.cell.mah} mAh mit ${f.cell.watt} W — ${en(f.minutes)}`,
    f => `${f.cell.mah} mAh à ${f.cell.watt} W — ${en(f.minutes)}`,
    f => `${f.cell.watt} W पर ${f.cell.mah} mAh — ${hi(f.minutes)}`,
    f => `${f.cell.watt}W 充 ${f.cell.mah}mAh — ${zh(f.minutes)}`,
    f => `${f.cell.watt}W 充 ${f.cell.mah}mAh — ${tw(f.minutes)}`,
  ),

  metaDesc: T<(f: BatteryFacts) => string>(
    f => `${f.cell.mah}mAh 배터리를 ${f.cell.watt}W 충전기로 채우면 ${ko(f.minutes)} 걸립니다. ${f.wh}Wh, ${f.step.volt}V·${f.step.amp}A, 80%까지는 ${ko(f.to80)}입니다.`,
    f => `A ${f.cell.mah} mAh battery on a ${f.cell.watt} W charger takes ${en(f.minutes)}. That is ${f.wh} Wh at ${f.step.volt} V and ${f.step.amp} A, with 80% reached in ${en(f.to80)}.`,
    f => `Una batería de ${f.cell.mah} mAh con un cargador de ${f.cell.watt} W tarda ${en(f.minutes)}. Son ${f.wh} Wh a ${f.step.volt} V y ${f.step.amp} A, y el 80% llega en ${en(f.to80)}.`,
    f => `Uma bateria de ${f.cell.mah} mAh num carregador de ${f.cell.watt} W leva ${en(f.minutes)}. São ${f.wh} Wh a ${f.step.volt} V e ${f.step.amp} A, com 80% em ${en(f.to80)}.`,
    f => `${f.cell.mah}mAhのバッテリーを${f.cell.watt}W充電器で満たすと${ja(f.minutes)}かかります。${f.wh}Wh、${f.step.volt}V・${f.step.amp}Aで、80%までは${ja(f.to80)}です。`,
    f => `Ein ${f.cell.mah}-mAh-Akku an einem ${f.cell.watt}-W-Netzteil braucht ${en(f.minutes)}. Das sind ${f.wh} Wh bei ${f.step.volt} V und ${f.step.amp} A; 80 % sind nach ${en(f.to80)} erreicht.`,
    f => `Une batterie de ${f.cell.mah} mAh sur un chargeur de ${f.cell.watt} W demande ${en(f.minutes)}. Soit ${f.wh} Wh en ${f.step.volt} V à ${f.step.amp} A, 80 % atteints en ${en(f.to80)}.`,
    f => `${f.cell.watt} W चार्जर पर ${f.cell.mah} mAh बैटरी में ${hi(f.minutes)} लगते हैं। यानी ${f.wh} Wh, ${f.step.volt} V और ${f.step.amp} A, और 80% ${hi(f.to80)} में।`,
    f => `${f.cell.mah}mAh 电池用 ${f.cell.watt}W 充电器充满需 ${zh(f.minutes)}。合 ${f.wh}Wh，走 ${f.step.volt}V、${f.step.amp}A，到 80% 需 ${zh(f.to80)}。`,
    f => `${f.cell.mah}mAh 電池用 ${f.cell.watt}W 充電器充滿需 ${tw(f.minutes)}。合 ${f.wh}Wh，走 ${f.step.volt}V、${f.step.amp}A，到 80% 需 ${tw(f.to80)}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '5000mAh 휴대폰을 20W로 채우면 얼마나 걸리나요?', a: '62분입니다. 18.5Wh를 20W로 나누면 55분이지만, 충전기가 낸 것의 10%는 열로 빠집니다.' },
      { q: '65W 충전기를 꽂았는데 왜 빨라지지 않나요?', a: '케이블일 때가 많습니다. 60W를 넘으면 3A를 넘겨야 하고, 그러려면 케이블 안에 칩이 들어 있어야 합니다.' },
      { q: '10000mAh 보조배터리로 5000mAh 휴대폰을 두 번 채울 수 있나요?', a: '없습니다. 안은 3.7V, 나가는 것은 5V라 전압 비만큼 줄고 승압하며 열로도 새서 실제로는 6660mAh 남짓 옮겨집니다.' },
      { q: '보조배터리를 비행기에 들고 탈 수 있나요?', a: '100Wh 아래는 그냥 됩니다. 26800mAh가 99.16Wh라 흔한 것이고, 160Wh까지는 항공사 승인을 받아 두 개까지입니다.' },
      { q: '80%에서 충전이 느려지는 이유가 뭔가요?', a: '리튬 배터리는 전압이 차오르면 전류를 줄여야 해서, 남은 20%가 앞의 80%만큼 걸리기도 합니다. 표의 80% 시간이 그래서 따로 있습니다.' },
    ],
    [
      { q: 'How long does a 5000 mAh phone take at 20 W?', a: '62 minutes. Dividing 18.5 Wh by 20 W says 55, but a tenth of what the charger delivers leaves as heat.' },
      { q: 'I plugged in a 65 W charger and nothing got faster.', a: 'Usually the cable. Above 60 W the current must pass 3 A, and that requires a chip inside the cable to declare it.' },
      { q: 'Can a 10,000 mAh power bank fill a 5000 mAh phone twice?', a: 'No. Inside is 3.7 V, out is 5 V, so it shrinks by that ratio and loses more as heat while stepping up — about 6660 mAh actually moves.' },
      { q: 'Can I take a power bank on a plane?', a: 'Under 100 Wh, freely. That is why 26,800 mAh is so common: it comes to 99.16 Wh. Up to 160 Wh you may carry two with airline approval.' },
      { q: 'Why does charging slow down at 80%?', a: 'A lithium cell must taper its current as its voltage rises, so the last 20% can take as long as the first 80%. That is why the table lists the 80% time separately.' },
    ],
    [
      { q: '¿Cuánto tarda un teléfono de 5000 mAh a 20 W?', a: '62 minutos. Dividir 18,5 Wh entre 20 W da 55, pero una décima parte de lo que entrega el cargador se va en calor.' },
      { q: 'Conecté un cargador de 65 W y no fue más rápido.', a: 'Casi siempre es el cable. Por encima de 60 W la corriente debe pasar de 3 A, y eso exige un chip dentro del cable que lo declare.' },
      { q: '¿Una batería externa de 10 000 mAh llena dos veces un teléfono de 5000 mAh?', a: 'No. Dentro son 3,7 V y fuera 5 V, así que encoge en esa proporción y pierde calor al elevar: se transfieren unos 6660 mAh.' },
      { q: '¿Puedo llevar una batería externa en el avión?', a: 'Por debajo de 100 Wh, sin trámite. Por eso 26 800 mAh es tan común: son 99,16 Wh. Hasta 160 Wh puedes llevar dos con permiso de la aerolínea.' },
      { q: '¿Por qué se frena la carga al 80%?', a: 'Una celda de litio debe reducir la corriente según sube su voltaje, así que el último 20% puede tardar lo mismo que el primer 80%. Por eso la tabla da el tiempo hasta el 80% aparte.' },
    ],
    [
      { q: 'Quanto tempo leva um celular de 5000 mAh a 20 W?', a: '62 minutos. Dividir 18,5 Wh por 20 W dá 55, mas um décimo do que o carregador entrega vira calor.' },
      { q: 'Liguei um carregador de 65 W e nada ficou mais rápido.', a: 'Quase sempre é o cabo. Acima de 60 W a corrente precisa passar de 3 A, e isso exige um chip dentro do cabo para declarar.' },
      { q: 'Uma bateria externa de 10 000 mAh enche duas vezes um celular de 5000 mAh?', a: 'Não. Dentro são 3,7 V e fora 5 V, então encolhe nessa proporção e ainda perde calor ao elevar: passam cerca de 6660 mAh.' },
      { q: 'Posso levar uma bateria externa no avião?', a: 'Abaixo de 100 Wh, sem burocracia. Por isso 26 800 mAh é tão comum: dá 99,16 Wh. Até 160 Wh dá para levar duas com autorização da companhia.' },
      { q: 'Por que a carga desacelera aos 80%?', a: 'Uma célula de lítio precisa reduzir a corrente conforme a tensão sobe, então os últimos 20% podem levar o mesmo que os primeiros 80%. Por isso a tabela traz o tempo até 80% à parte.' },
    ],
    [
      { q: '5000mAhのスマホを20Wで充電するとどれくらいですか？', a: '62分です。18.5Whを20Wで割ると55分ですが、充電器が出したうち1割は熱として逃げます。' },
      { q: '65W充電器をつないでも速くなりません。', a: 'たいていケーブルです。60Wを超えると3Aを超える必要があり、そのためにはケーブルの中にチップが要ります。' },
      { q: '10000mAhのモバイルバッテリーで5000mAhのスマホを2回満たせますか？', a: '満たせません。中は3.7V、出るのは5Vなので電圧比の分だけ減り、昇圧中にも熱で逃げて、実際に移るのは6660mAhほどです。' },
      { q: 'モバイルバッテリーは飛行機に持ち込めますか？', a: '100Wh未満ならそのまま持ち込めます。26800mAhが多いのは99.16Whだからです。160Whまでは航空会社の承認を得て2個までです。' },
      { q: '80%で充電が遅くなるのはなぜですか？', a: 'リチウム電池は電圧が上がるにつれ電流を絞る必要があり、残り20%が先の80%と同じくらいかかることもあります。表に80%までの時間を別に載せているのはそのためです。' },
    ],
    [
      { q: 'Wie lange braucht ein 5000-mAh-Handy bei 20 W?', a: '62 Minuten. 18,5 Wh durch 20 W ergäbe 55, doch ein Zehntel dessen, was das Netzteil liefert, geht als Wärme weg.' },
      { q: 'Ich habe ein 65-W-Netzteil angeschlossen und nichts wurde schneller.', a: 'Meist liegt es am Kabel. Über 60 W muss der Strom 3 A überschreiten, und dafür braucht das Kabel einen Chip, der das meldet.' },
      { q: 'Füllt eine 10.000-mAh-Powerbank ein 5000-mAh-Handy zweimal?', a: 'Nein. Innen sind 3,7 V, heraus kommen 5 V — es schrumpft um dieses Verhältnis und verliert beim Hochsetzen weitere Wärme: etwa 6660 mAh wandern wirklich.' },
      { q: 'Darf eine Powerbank ins Flugzeug?', a: 'Unter 100 Wh ohne Weiteres. Deshalb ist 26.800 mAh so verbreitet: das sind 99,16 Wh. Bis 160 Wh dürfen es zwei sein, mit Zustimmung der Airline.' },
      { q: 'Warum wird das Laden ab 80 % langsamer?', a: 'Eine Lithiumzelle muss den Strom drosseln, sobald ihre Spannung steigt; die letzten 20 % können so lange dauern wie die ersten 80 %. Darum steht die Zeit bis 80 % separat in der Tabelle.' },
    ],
    [
      { q: 'Combien de temps pour un téléphone de 5000 mAh à 20 W ?', a: '62 minutes. Diviser 18,5 Wh par 20 W donnerait 55, mais un dixième de ce que fournit le chargeur part en chaleur.' },
      { q: 'J’ai branché un chargeur 65 W et rien n’a accéléré.', a: 'C’est souvent le câble. Au-delà de 60 W, le courant doit dépasser 3 A, ce qui exige une puce dans le câble pour le déclarer.' },
      { q: 'Une batterie de 10 000 mAh remplit-elle deux fois un téléphone de 5000 mAh ?', a: 'Non. L’intérieur est en 3,7 V et la sortie en 5 V : le chiffre rétrécit d’autant et l’élévation dissipe de la chaleur — environ 6660 mAh passent vraiment.' },
      { q: 'Puis-je emporter une batterie externe en avion ?', a: 'Sous 100 Wh, sans formalité. C’est pourquoi 26 800 mAh est si courant : cela fait 99,16 Wh. Jusqu’à 160 Wh, deux exemplaires avec l’accord de la compagnie.' },
      { q: 'Pourquoi la charge ralentit-elle à 80 % ?', a: 'Une cellule au lithium doit réduire son courant à mesure que sa tension monte : les derniers 20 % peuvent prendre autant que les premiers 80 %. D’où le temps jusqu’à 80 % listé à part.' },
    ],
    [
      { q: '20 W पर 5000 mAh फ़ोन में कितना समय लगता है?', a: '62 मिनट। 18.5 Wh को 20 W से भाग दें तो 55 आता है, पर चार्जर जो देता है उसका दसवाँ हिस्सा गर्मी बनकर निकल जाता है।' },
      { q: '65 W चार्जर लगाया पर कुछ तेज़ नहीं हुआ।', a: 'अक्सर केबल की वजह से। 60 W से ऊपर करंट को 3 A पार करना पड़ता है, और इसके लिए केबल में चिप चाहिए जो यह बताए।' },
      { q: 'क्या 10,000 mAh पावर बैंक 5000 mAh फ़ोन को दो बार भर देगा?', a: 'नहीं। अंदर 3.7 V है और बाहर 5 V, इसलिए उसी अनुपात में घटता है और बढ़ाते समय गर्मी में भी जाता है — असल में लगभग 6660 mAh जाता है।' },
      { q: 'क्या पावर बैंक विमान में ले जा सकते हैं?', a: '100 Wh से नीचे बिना अनुमति। इसीलिए 26,800 mAh इतना आम है: वह 99.16 Wh बनता है। 160 Wh तक एयरलाइन की अनुमति से दो तक ले जा सकते हैं।' },
      { q: '80% पर चार्जिंग धीमी क्यों हो जाती है?', a: 'लिथियम सेल को वोल्टेज बढ़ने के साथ करंट घटाना पड़ता है, इसलिए आख़िरी 20% पहले 80% जितना समय ले सकता है। तालिका में 80% तक का समय अलग इसी कारण दिया है।' },
    ],
    [
      { q: '20W 给 5000mAh 手机充满要多久？', a: '62 分钟。18.5Wh 除以 20W 是 55 分钟，但充电器输出的十分之一变成了热。' },
      { q: '插了 65W 充电器却没变快。', a: '多半是线。超过 60W 电流就得越过 3A，而这需要线里有芯片来声明。' },
      { q: '10000mAh 的充电宝能把 5000mAh 手机充满两次吗？', a: '不能。里面按 3.7V，出去是 5V，按电压比缩水，升压途中还发热，真正搬过去的约 6660mAh。' },
      { q: '充电宝能带上飞机吗？', a: '低于 100Wh 可直接携带。26800mAh 之所以常见，正因为它是 99.16Wh。到 160Wh 经航空公司批准可带两块。' },
      { q: '为什么到 80% 就变慢？', a: '锂电池电压升高后必须收小电流，最后的 20% 可能和前面的 80% 一样久。表里单列到 80% 的时间就是这个原因。' },
    ],
    [
      { q: '20W 給 5000mAh 手機充滿要多久？', a: '62 分鐘。18.5Wh 除以 20W 是 55 分鐘，但充電器輸出的十分之一變成了熱。' },
      { q: '插了 65W 充電器卻沒變快。', a: '多半是線。超過 60W 電流就得越過 3A，而這需要線裡有晶片來聲明。' },
      { q: '10000mAh 的行動電源能把 5000mAh 手機充滿兩次嗎？', a: '不能。裡面按 3.7V，出去是 5V，按電壓比縮水，升壓途中還發熱，真正搬過去的約 6660mAh。' },
      { q: '行動電源能帶上飛機嗎？', a: '低於 100Wh 可直接攜帶。26800mAh 之所以常見，正因為它是 99.16Wh。到 160Wh 經航空公司核准可帶兩顆。' },
      { q: '為什麼到 80% 就變慢？', a: '鋰電池電壓升高後必須收小電流，最後的 20% 可能和前面的 80% 一樣久。表裡單列到 80% 的時間就是這個原因。' },
    ],
  ),

  cellFaq: T<(f: BatteryFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.mah}mAh를 ${f.cell.watt}W로 채우면 얼마나 걸리나요?`, a: `${ko(f.minutes)} 걸립니다. 80%까지는 ${ko(f.to80)}이고, 남은 20%는 그보다 더 걸립니다.` },
      { q: `이 충전기는 몇 볼트로 흐르나요?`, a: `${f.step.volt}V·${f.step.amp}A입니다. ${f.needsEmarker ? '3A를 넘으므로 칩이 든 케이블이 있어야 합니다.' : '3A 안에 들어 아무 케이블이나 됩니다.'}` },
      { q: `이 배터리를 비행기에 들고 탈 수 있나요?`, a: `${f.wh}Wh라 ${f.cell.mah}mAh는 ${['그냥 들고 탑니다', '항공사 승인이 필요합니다', '여객기에 실을 수 없습니다'][['free', 'approval', 'banned'].indexOf(f.flight)]}.` },
      { q: `한 시간 안에 채우려면 얼마짜리 충전기가 필요한가요?`, a: `${f.hourWatt}W면 됩니다. 지금 충전기는 ${f.cell.watt}W입니다.` },
    ],
    f => [
      { q: `How long does ${f.cell.mah} mAh take at ${f.cell.watt} W?`, a: `${en(f.minutes)}. It reaches 80% in ${en(f.to80)}, and the remaining fifth takes longer than that.` },
      { q: `What voltage does this charger run at?`, a: `${f.step.volt} V at ${f.step.amp} A. ${f.needsEmarker ? 'That is past 3 A, so the cable needs a chip inside.' : 'That stays within 3 A, so any cable will do.'}` },
      { q: `Can this battery go on a plane?`, a: `At ${f.wh} Wh, ${f.cell.mah} mAh ${['can be carried on freely', 'needs airline approval', 'is not allowed on passenger flights'][['free', 'approval', 'banned'].indexOf(f.flight)]}.` },
      { q: `What charger would fill it within an hour?`, a: `${f.hourWatt} W would. This one is ${f.cell.watt} W.` },
    ],
    f => [
      { q: `¿Cuánto tarda ${f.cell.mah} mAh a ${f.cell.watt} W?`, a: `${en(f.minutes)}. Llega al 80% en ${en(f.to80)}, y el quinto restante tarda más que eso.` },
      { q: `¿A qué voltaje funciona este cargador?`, a: `${f.step.volt} V y ${f.step.amp} A. ${f.needsEmarker ? 'Pasa de 3 A, así que el cable necesita un chip dentro.' : 'Se queda dentro de 3 A, así que sirve cualquier cable.'}` },
      { q: `¿Puede volar esta batería?`, a: `Con ${f.wh} Wh, ${f.cell.mah} mAh ${['se lleva sin trámite', 'requiere permiso de la aerolínea', 'no se admite en vuelos de pasajeros'][['free', 'approval', 'banned'].indexOf(f.flight)]}.` },
      { q: `¿Qué cargador la llenaría en una hora?`, a: `Uno de ${f.hourWatt} W. Este es de ${f.cell.watt} W.` },
    ],
    f => [
      { q: `Quanto tempo leva ${f.cell.mah} mAh a ${f.cell.watt} W?`, a: `${en(f.minutes)}. Chega a 80% em ${en(f.to80)}, e o quinto restante leva mais que isso.` },
      { q: `Em que tensão este carregador funciona?`, a: `${f.step.volt} V e ${f.step.amp} A. ${f.needsEmarker ? 'Passa de 3 A, então o cabo precisa de um chip dentro.' : 'Fica dentro de 3 A, então qualquer cabo serve.'}` },
      { q: `Esta bateria pode viajar de avião?`, a: `Com ${f.wh} Wh, ${f.cell.mah} mAh ${['leva sem burocracia', 'exige autorização da companhia', 'não é aceita em voos de passageiros'][['free', 'approval', 'banned'].indexOf(f.flight)]}.` },
      { q: `Que carregador encheria em uma hora?`, a: `Um de ${f.hourWatt} W. Este é de ${f.cell.watt} W.` },
    ],
    f => [
      { q: `${f.cell.mah}mAhを${f.cell.watt}Wで満たすとどれくらいですか？`, a: `${ja(f.minutes)}かかります。80%までは${ja(f.to80)}で、残りの2割はそれより長くかかります。` },
      { q: `この充電器は何ボルトで流れますか？`, a: `${f.step.volt}V・${f.step.amp}Aです。${f.needsEmarker ? '3Aを超えるのでチップ入りケーブルが要ります。' : '3A以内なのでどのケーブルでも大丈夫です。'}` },
      { q: `このバッテリーは飛行機に持ち込めますか？`, a: `${f.wh}Whなので、${f.cell.mah}mAhは${['そのまま持ち込めます', '航空会社の承認が要ります', '旅客機には載せられません'][['free', 'approval', 'banned'].indexOf(f.flight)]}。` },
      { q: `1時間で満たすには何ワットの充電器が要りますか？`, a: `${f.hourWatt}Wあれば足ります。今は${f.cell.watt}Wです。` },
    ],
    f => [
      { q: `Wie lange braucht ${f.cell.mah} mAh bei ${f.cell.watt} W?`, a: `${en(f.minutes)}. 80 % sind nach ${en(f.to80)} erreicht, das letzte Fünftel dauert länger als das.` },
      { q: `Mit welcher Spannung läuft dieses Netzteil?`, a: `${f.step.volt} V bei ${f.step.amp} A. ${f.needsEmarker ? 'Das liegt über 3 A, also braucht das Kabel einen Chip.' : 'Das bleibt unter 3 A, also genügt jedes Kabel.'}` },
      { q: `Darf dieser Akku ins Flugzeug?`, a: `Mit ${f.wh} Wh ${['darf man ihn ohne Weiteres mitnehmen', 'braucht er die Zustimmung der Airline', 'ist er in Passagierflügen nicht erlaubt'][['free', 'approval', 'banned'].indexOf(f.flight)]} — ${f.cell.mah} mAh.` },
      { q: `Welches Netzteil füllt ihn in einer Stunde?`, a: `${f.hourWatt} W würden reichen. Dieses hat ${f.cell.watt} W.` },
    ],
    f => [
      { q: `Combien de temps pour ${f.cell.mah} mAh à ${f.cell.watt} W ?`, a: `${en(f.minutes)}. Les 80 % sont atteints en ${en(f.to80)}, et le dernier cinquième prend plus longtemps que cela.` },
      { q: `Sous quelle tension ce chargeur fonctionne-t-il ?`, a: `${f.step.volt} V à ${f.step.amp} A. ${f.needsEmarker ? 'C’est au-delà de 3 A, le câble doit donc contenir une puce.' : 'Cela reste sous 3 A, n’importe quel câble suffit.'}` },
      { q: `Cette batterie peut-elle prendre l’avion ?`, a: `À ${f.wh} Wh, ${f.cell.mah} mAh ${['s’emporte sans formalité', 'nécessite l’accord de la compagnie', 'est interdite sur les vols passagers'][['free', 'approval', 'banned'].indexOf(f.flight)]}.` },
      { q: `Quel chargeur la remplirait en une heure ?`, a: `${f.hourWatt} W suffiraient. Celui-ci fait ${f.cell.watt} W.` },
    ],
    f => [
      { q: `${f.cell.watt} W पर ${f.cell.mah} mAh में कितना समय लगेगा?`, a: `${hi(f.minutes)}। 80% तक ${hi(f.to80)} लगते हैं, और बचा हुआ पाँचवाँ हिस्सा उससे भी अधिक लेता है।` },
      { q: `यह चार्जर किस वोल्टेज पर चलता है?`, a: `${f.step.volt} V पर ${f.step.amp} A। ${f.needsEmarker ? 'यह 3 A से ऊपर है, इसलिए केबल में चिप चाहिए।' : 'यह 3 A के भीतर है, इसलिए कोई भी केबल चलेगी।'}` },
      { q: `क्या यह बैटरी विमान में ले जा सकते हैं?`, a: `${f.wh} Wh होने से ${f.cell.mah} mAh ${['बिना अनुमति ले जा सकते हैं', 'एयरलाइन की अनुमति चाहिए', 'यात्री विमान में मना है'][['free', 'approval', 'banned'].indexOf(f.flight)]}।` },
      { q: `एक घंटे में भरने के लिए कौन सा चार्जर चाहिए?`, a: `${f.hourWatt} W काफ़ी होगा। यह वाला ${f.cell.watt} W का है।` },
    ],
    f => [
      { q: `${f.cell.watt}W 充 ${f.cell.mah}mAh 要多久？`, a: `需要 ${zh(f.minutes)}。到 80% 需 ${zh(f.to80)}，剩下的两成比这还久。` },
      { q: `这个充电器走多少伏？`, a: `${f.step.volt}V、${f.step.amp}A。${f.needsEmarker ? '超过 3A，所以线里要有芯片。' : '在 3A 以内，普通线就够。'}` },
      { q: `这块电池能带上飞机吗？`, a: `${f.wh}Wh，所以 ${f.cell.mah}mAh ${['可直接随身携带', '需航空公司批准', '客机不得携带'][['free', 'approval', 'banned'].indexOf(f.flight)]}。` },
      { q: `想一小时充满需要多大的充电器？`, a: `${f.hourWatt}W 就够，这个是 ${f.cell.watt}W。` },
    ],
    f => [
      { q: `${f.cell.watt}W 充 ${f.cell.mah}mAh 要多久？`, a: `需要 ${tw(f.minutes)}。到 80% 需 ${tw(f.to80)}，剩下的兩成比這還久。` },
      { q: `這個充電器走多少伏特？`, a: `${f.step.volt}V、${f.step.amp}A。${f.needsEmarker ? '超過 3A，所以線裡要有晶片。' : '在 3A 以內，普通線就夠。'}` },
      { q: `這顆電池能帶上飛機嗎？`, a: `${f.wh}Wh，所以 ${f.cell.mah}mAh ${['可直接隨身攜帶', '需航空公司核准', '客機不得攜帶'][['free', 'approval', 'banned'].indexOf(f.flight)]}。` },
      { q: `想一小時充滿需要多大的充電器？`, a: `${f.hourWatt}W 就夠，這個是 ${f.cell.watt}W。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BATTERY_UI: L<BatteryUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BatteryUI>;
