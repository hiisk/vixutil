/**
 * 자전거 기어 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "앞니와 뒷니는 따로 보면 뜻이 없고, 나눈 값 하나가
 * 기어를 정한다"이다. 53×19와 39×14가 같은 기어인 까닭이 그것이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { GearFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface GearUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  frontLabel: string;
  rearLabel: string;
  ratioLabel: string;
  developmentLabel: string;
  inchLabel: string;
  cadenceLabel: string;
  speedLabel: string;
  teeth: string;

  ratioTitle: string;
  ratioNote: string;
  sameTitle: string;
  sameNote: string;
  wheelTitle: string;
  wheelNote: string;
  chooseTitle: string;
  chooseNote: string;

  tableTitle: string;
  neighbourTitle: string;
  frontRowTitle: string;
  rearRowTitle: string;
  heavierLabel: string;
  lighterLabel: string;

  desc: (f: GearFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: GearFacts) => string;
  metaDesc: (f: GearFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: GearFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 90rpm에서의 속도 — 문장 여러 곳에서 같은 값을 쓴다 */
const at90 = (f: GearFacts): number => f.speeds.find(s => s.cadence === 90)?.speed ?? 0;

type Spec = { [K in keyof GearUI]: L<GearUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('자전거 기어', 'Bike gearing', 'Desarrollos', 'Relação de marchas', '自転車のギア', 'Fahrrad-Übersetzung', 'Développement vélo', 'साइकिल गियर', '自行车齿比', '自行車齒比'),

  hubTitle: T(
    '자전거 기어 168칸 — 50×25는 페달 한 바퀴에 4.21m',
    '168 bike gears — 50×25 carries you 4.21 m per pedal stroke',
    '168 desarrollos — 50×25 avanza 4,21 m por pedalada',
    '168 relações — 50×25 avança 4,21 m por pedalada',
    '自転車のギア168マス — 50×25はペダル1回転で4.21m',
    '168 Übersetzungen — 50×25 bringt 4,21 m je Kurbelumdrehung',
    '168 développements — 50×25 avance de 4,21 m par tour de pédale',
    '168 गियर — 50×25 एक पैडल चक्र में 4.21 m',
    '168 个齿比组合 — 50×25 每踩一圈前进 4.21 米',
    '168 個齒比組合 — 50×25 每踩一圈前進 4.21 公尺',
  ),

  hubLead: T(
    '앞 체인링 12가지와 뒤 스프라켓 14가지가 만나는 칸마다 기어비와 페달 한 바퀴에 나아가는 거리를 계산했습니다. 앞니와 뒷니는 따로 보면 뜻이 없고, 나눈 값 하나가 기어를 정합니다.',
    'Every pairing of 12 chainrings and 14 sprockets, worked out as a ratio and as the distance one pedal stroke carries you. Neither tooth count means anything on its own — the gear is set by the one number you get from dividing them.',
    'Cada cruce de 12 platos y 14 piñones, resuelto como relación y como distancia que avanza una pedalada. Ninguno de los dos números dice nada por separado: la marcha la fija el cociente.',
    'Cada cruzamento de 12 coroas e 14 pinhões, resolvido como relação e como distância que uma pedalada avança. Nenhum dos dois números diz nada sozinho: a marcha é definida pelo quociente.',
    'フロント12通りとリア14通りが交わるマスごとに、ギア比とペダル1回転で進む距離を計算しました。前後の歯数は別々に見ても意味がなく、割った値ひとつがギアを決めます。',
    'Jede Paarung aus 12 Kettenblättern und 14 Ritzeln, ausgerechnet als Übersetzung und als Weg je Kurbelumdrehung. Keine Zähnezahl sagt für sich allein etwas — den Gang bestimmt allein ihr Quotient.',
    'Chaque croisement de 12 plateaux et 14 pignons, calculé en rapport et en distance parcourue par tour de pédale. Aucun des deux nombres ne dit rien seul : c’est leur quotient qui fixe le braquet.',
    '12 चेनरिंग और 14 स्प्रॉकेट के हर जोड़ पर गियर अनुपात और एक पैडल चक्र में तय दूरी निकाली गई है। दोनों दाँतों की संख्या अलग-अलग कुछ नहीं कहती — गियर उनके भागफल से तय होता है।',
    '12 种牙盘与 14 种飞轮相交的每一格，都算出了齿比和每踩一圈前进的距离。前后齿数单看都没有意义，决定挡位的是它们相除的那一个数。',
    '12 種牙盤與 14 種飛輪相交的每一格，都算出了齒比和每踩一圈前進的距離。前後齒數單看都沒有意義，決定檔位的是它們相除的那一個數。',
  ),

  frontLabel: T('앞 체인링', 'Chainring', 'Plato', 'Coroa', 'フロント', 'Kettenblatt', 'Plateau', 'चेनरिंग', '牙盘', '牙盤'),
  rearLabel: T('뒤 스프라켓', 'Sprocket', 'Piñón', 'Pinhão', 'リア', 'Ritzel', 'Pignon', 'स्प्रॉकेट', '飞轮', '飛輪'),
  ratioLabel: T('기어비', 'Gear ratio', 'Relación', 'Relação', 'ギア比', 'Übersetzung', 'Rapport', 'गियर अनुपात', '齿比', '齒比'),
  developmentLabel: T('페달 한 바퀴', 'Per pedal stroke', 'Por pedalada', 'Por pedalada', 'ペダル1回転', 'Je Kurbelumdrehung', 'Par tour de pédale', 'प्रति पैडल चक्र', '每踩一圈', '每踩一圈'),
  inchLabel: T('기어인치', 'Gear inches', 'Pulgadas de desarrollo', 'Polegadas de desenvolvimento', 'ギアインチ', 'Entfaltung in Zoll', 'Développement en pouces', 'गियर इंच', '齿轮英寸', '齒輪英吋'),
  cadenceLabel: T('케이던스', 'Cadence', 'Cadencia', 'Cadência', 'ケイデンス', 'Trittfrequenz', 'Cadence', 'कैडेंस', '踏频', '踏頻'),
  speedLabel: T('속도', 'Speed', 'Velocidad', 'Velocidade', '速度', 'Geschwindigkeit', 'Vitesse', 'गति', '速度', '速度'),
  teeth: T('T', 'T', 'd', 'd', 'T', 'Z', 'd', 'T', 'T', 'T'),

  ratioTitle: T('기어비 하나가 전부를 정한다', 'One ratio decides everything', 'La relación lo decide todo', 'A relação decide tudo', 'ギア比ひとつが全部を決める', 'Eine Übersetzung entscheidet alles', 'Un seul rapport décide de tout', 'एक अनुपात सब तय करता है', '一个齿比决定一切', '一個齒比決定一切'),
  ratioNote: T(
    '체인은 늘어나지 않으므로 앞 체인링이 한 바퀴 돌면 뒤 스프라켓은 잇수의 비만큼 돕니다. 뒷바퀴는 스프라켓에 물려 있으니 그대로 따라 돕니다. 그래서 앞니를 뒷니로 나눈 값에 바퀴 둘레를 곱하면 페달 한 바퀴에 나아가는 거리가 나옵니다.',
    'A chain does not stretch, so one turn of the chainring turns the sprocket by the ratio of their teeth, and the rear wheel simply follows. Multiply that ratio by the wheel circumference and you have the distance one pedal stroke carries you.',
    'La cadena no se estira, así que una vuelta del plato hace girar el piñón según la razón de sus dientes, y la rueda trasera sigue sin más. Multiplica esa razón por el perímetro de la rueda y tienes lo que avanza una pedalada.',
    'A corrente não estica, então uma volta da coroa gira o pinhão na razão de seus dentes, e a roda traseira apenas acompanha. Multiplique essa razão pelo perímetro da roda e você tem o que uma pedalada avança.',
    'チェーンは伸びないので、フロントが1回転するとリアは歯数の比だけ回ります。後輪はスプロケットに噛んでいるのでそのまま従います。だから前歯を後歯で割った値にホイール周長を掛ければ、ペダル1回転で進む距離が出ます。',
    'Eine Kette dehnt sich nicht: Eine Kurbelumdrehung dreht das Ritzel im Verhältnis der Zähnezahlen, und das Hinterrad folgt einfach. Dieses Verhältnis mal Radumfang ergibt den Weg je Kurbelumdrehung.',
    'Une chaîne ne s’étire pas : un tour de plateau fait tourner le pignon selon le rapport des dents, et la roue arrière suit. Multipliez ce rapport par la circonférence de la roue et vous avez la distance parcourue par tour de pédale.',
    'चेन खिंचती नहीं, इसलिए चेनरिंग का एक चक्कर स्प्रॉकेट को दाँतों के अनुपात जितना घुमाता है और पिछला पहिया बस साथ चलता है। उस अनुपात को पहिये की परिधि से गुणा करें तो एक पैडल चक्र की दूरी मिल जाती है।',
    '链条不会伸长，所以牙盘转一圈，飞轮就按齿数之比转动，后轮只是跟着走。把这个比值乘以车轮周长，就得到每踩一圈前进的距离。',
    '鏈條不會伸長，所以牙盤轉一圈，飛輪就按齒數之比轉動，後輪只是跟著走。把這個比值乘以車輪周長，就得到每踩一圈前進的距離。',
  ),

  sameTitle: T('앞뒤가 달라도 같은 기어', 'Different teeth, same gear', 'Dientes distintos, misma marcha', 'Dentes diferentes, mesma marcha', '前後が違っても同じギア', 'Andere Zähne, gleicher Gang', 'Dents différentes, même braquet', 'अलग दाँत, वही गियर', '前后不同，挡位相同', '前後不同，檔位相同'),
  sameNote: T(
    '53×19와 39×14는 앞뒤가 전혀 다른데 기어비가 거의 같아, 페달 한 바퀴에 나아가는 거리도 같습니다. 그래서 "몇 단"이라는 말은 자전거마다 뜻이 다르고, 견줄 수 있는 것은 기어비뿐입니다. 각 칸에서 같은 느낌의 다른 조합을 함께 보여 줍니다.',
    'A 53×19 and a 39×14 share almost the same ratio, so one pedal stroke carries you the same distance despite wholly different tooth counts. That is why "which gear" means something different on every bike, and why the ratio is the only thing you can compare. Each cell lists the other combinations that feel the same.',
    'Un 53×19 y un 39×14 tienen casi la misma relación, así que una pedalada avanza lo mismo pese a dientes muy distintos. Por eso «qué marcha» significa algo distinto en cada bici y la relación es lo único comparable. Cada casilla muestra las otras combinaciones que se sienten igual.',
    'Um 53×19 e um 39×14 têm quase a mesma relação, então uma pedalada avança o mesmo apesar de dentes bem diferentes. Por isso «que marcha» significa algo diferente em cada bike e a relação é a única coisa comparável. Cada caso lista as outras combinações que dão a mesma sensação.',
    '53×19と39×14は前後がまったく違うのにギア比がほぼ同じで、ペダル1回転で進む距離も同じです。だから「何速」という言い方は自転車ごとに意味が違い、比べられるのはギア比だけです。各マスで同じ感触になる他の組み合わせも並べています。',
    'Ein 53×19 und ein 39×14 haben fast dieselbe Übersetzung — eine Kurbelumdrehung bringt gleich weit, obwohl die Zähnezahlen völlig verschieden sind. Deshalb bedeutet „welcher Gang“ an jedem Rad etwas anderes, und vergleichbar ist allein die Übersetzung. Jede Zelle nennt die anderen Kombinationen mit gleichem Gefühl.',
    'Un 53×19 et un 39×14 ont presque le même rapport : un tour de pédale avance d’autant, malgré des dentures très différentes. C’est pourquoi « quelle vitesse » veut dire autre chose sur chaque vélo, et que seul le rapport se compare. Chaque case liste les autres combinaisons au même ressenti.',
    '53×19 और 39×14 का अनुपात लगभग एक है, इसलिए दाँत बिलकुल अलग होने पर भी एक पैडल चक्र उतनी ही दूरी तय करता है। इसीलिए "कौन सा गियर" हर साइकिल पर अलग मतलब रखता है और तुलना सिर्फ़ अनुपात से होती है। हर खाने में वैसी ही लगने वाली दूसरी जोड़ियाँ भी दी हैं।',
    '53×19 和 39×14 前后齿数完全不同，齿比却几乎一样，每踩一圈前进的距离也相同。所以「几档」在每辆车上含义都不同，能拿来比较的只有齿比。每一格都列出了感觉相同的其他组合。',
    '53×19 和 39×14 前後齒數完全不同，齒比卻幾乎一樣，每踩一圈前進的距離也相同。所以「幾檔」在每輛車上含義都不同，能拿來比較的只有齒比。每一格都列出了感覺相同的其他組合。',
  ),

  wheelTitle: T('바퀴는 700×25C 기준', 'Wheels are taken as 700×25C', 'Ruedas 700×25C', 'Rodas 700×25C', 'ホイールは700×25C基準', 'Laufräder als 700×25C gerechnet', 'Roues en 700×25C', 'पहिये 700×25C मानकर', '车轮按 700×25C 计算', '車輪按 700×25C 計算'),
  wheelNote: T(
    '둘레 2,105mm로 셈했습니다. 타이어 폭과 공기압에 따라 몇 mm씩 다르지만, 기어끼리 견주는 데에는 같은 값을 쓰면 되므로 하나로 고정했습니다. 650B나 26인치를 쓴다면 나오는 거리와 속도가 그 비율만큼 줄어듭니다.',
    'Figures use a 2,105 mm circumference. Tyre width and pressure shift that by a few millimetres, but comparing gears only needs one consistent value, so it is fixed. On 650B or 26-inch wheels every distance and speed here shrinks by the same proportion.',
    'Las cifras usan un perímetro de 2.105 mm. El ancho y la presión del neumático lo mueven unos milímetros, pero comparar marchas solo necesita un valor constante, así que queda fijo. Con 650B o 26 pulgadas, cada distancia y velocidad se reduce en la misma proporción.',
    'Os números usam perímetro de 2.105 mm. Largura e pressão do pneu mudam isso em alguns milímetros, mas comparar marchas só precisa de um valor constante, então ele é fixo. Com 650B ou 26 polegadas, cada distância e velocidade encolhe na mesma proporção.',
    '周長2,105mmで計算しました。タイヤ幅と空気圧で数mm変わりますが、ギア同士を比べるには同じ値を使えばよいので固定しています。650Bや26インチなら、ここの距離と速度はその比率だけ小さくなります。',
    'Gerechnet wird mit 2.105 mm Umfang. Reifenbreite und Druck verschieben das um wenige Millimeter, doch zum Vergleich der Gänge genügt ein einheitlicher Wert. Auf 650B oder 26 Zoll schrumpfen alle Wege und Geschwindigkeiten im selben Verhältnis.',
    'Les valeurs partent d’une circonférence de 2 105 mm. La largeur et la pression du pneu la déplacent de quelques millimètres, mais comparer des braquets ne demande qu’une valeur constante. En 650B ou 26 pouces, toutes les distances et vitesses diminuent dans la même proportion.',
    'गणना 2,105 mm परिधि पर है। टायर की चौड़ाई और हवा से यह कुछ मिलीमीटर बदलता है, पर गियरों की तुलना के लिए एक ही मान काफ़ी है, इसलिए इसे स्थिर रखा है। 650B या 26 इंच पर यहाँ की हर दूरी और गति उसी अनुपात में घट जाती है।',
    '按周长 2,105 毫米计算。轮胎宽度和气压会让它差几毫米，但比较齿比只需要一个统一的值，所以固定不变。若用 650B 或 26 寸，这里的距离和速度都会按同样比例缩小。',
    '按周長 2,105 公釐計算。輪胎寬度和氣壓會讓它差幾公釐，但比較齒比只需要一個統一的值，所以固定不變。若用 650B 或 26 吋，這裡的距離和速度都會按同樣比例縮小。',
  ),

  chooseTitle: T('무거운 기어가 빠른 것은 아니다', 'A big gear is not a fast gear', 'Un desarrollo grande no es rápido', 'Uma marcha pesada não é rápida', '重いギアが速いわけではない', 'Ein großer Gang ist kein schneller Gang', 'Un grand braquet n’est pas rapide', 'भारी गियर तेज़ नहीं होता', '重挡不等于快', '重檔不等於快'),
  chooseNote: T(
    '속도는 기어비와 케이던스의 곱입니다. 무거운 기어를 낮은 케이던스로 밟는 것과 가벼운 기어를 빠르게 돌리는 것이 같은 속도를 냅니다. 다리는 오래 쓸수록 후자를 좋아하므로, 대개 분당 80~90회를 유지할 수 있는 기어를 고릅니다.',
    'Speed is the ratio multiplied by cadence. Grinding a big gear slowly and spinning a small one quickly give the same speed, but legs last far longer doing the second — which is why most riders pick the gear that keeps them near 80 to 90 revolutions a minute.',
    'La velocidad es la relación por la cadencia. Machacar un desarrollo grande despacio y girar uno pequeño rápido dan la misma velocidad, pero las piernas aguantan mucho más con lo segundo: por eso se elige la marcha que permita mantener entre 80 y 90 pedaladas por minuto.',
    'A velocidade é a relação vezes a cadência. Forçar uma marcha pesada devagar e girar uma leve rápido dão a mesma velocidade, mas as pernas duram muito mais no segundo caso — por isso escolhe-se a marcha que mantenha 80 a 90 pedaladas por minuto.',
    '速度はギア比とケイデンスの積です。重いギアを低いケイデンスで踏むのと、軽いギアを速く回すのは同じ速度になります。脚は長く使うほど後者を好むので、たいてい毎分80〜90回を保てるギアを選びます。',
    'Geschwindigkeit ist Übersetzung mal Trittfrequenz. Einen großen Gang langsam zu drücken und einen kleinen schnell zu drehen ergibt dasselbe Tempo — nur halten die Beine das Zweite viel länger durch. Deshalb wählt man den Gang, der 80 bis 90 Umdrehungen je Minute erlaubt.',
    'La vitesse est le rapport multiplié par la cadence. Écraser un grand braquet lentement et mouliner un petit vite donnent la même vitesse, mais les jambes tiennent bien plus longtemps ainsi — d’où le choix du braquet qui permet de tourner à 80-90 tours par minute.',
    'गति अनुपात और कैडेंस का गुणनफल है। भारी गियर धीरे दबाना और हल्का गियर तेज़ घुमाना एक ही गति देते हैं, पर टाँगें दूसरे तरीके से कहीं ज़्यादा देर चलती हैं — इसीलिए ज़्यादातर लोग वह गियर चुनते हैं जिसमें 80–90 चक्कर प्रति मिनट बना रहे।',
    '速度是齿比乘以踏频。用重挡慢踩和用轻挡快踩能得到相同的速度，但腿在后一种方式下能撑得久得多 — 所以多数人会选能维持每分钟 80 到 90 转的挡位。',
    '速度是齒比乘以踏頻。用重檔慢踩和用輕檔快踩能得到相同的速度，但腿在後一種方式下能撐得久得多 — 所以多數人會選能維持每分鐘 80 到 90 轉的檔位。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के मामले', '相邻组合', '相鄰組合'),
  frontRowTitle: T('같은 체인링의 다른 스프라켓', 'Same chainring, other sprockets', 'Mismo plato, otros piñones', 'Mesma coroa, outros pinhões', '同じフロントの他のリア', 'Gleiches Kettenblatt, andere Ritzel', 'Même plateau, autres pignons', 'वही चेनरिंग, दूसरे स्प्रॉकेट', '同一牙盘的其他飞轮', '同一牙盤的其他飛輪'),
  rearRowTitle: T('같은 스프라켓의 다른 체인링', 'Same sprocket, other chainrings', 'Mismo piñón, otros platos', 'Mesmo pinhão, outras coroas', '同じリアの他のフロント', 'Gleiches Ritzel, andere Kettenblätter', 'Même pignon, autres plateaux', 'वही स्प्रॉकेट, दूसरी चेनरिंग', '同一飞轮的其他牙盘', '同一飛輪的其他牙盤'),
  heavierLabel: T('더 무겁게', 'Heavier', 'Más duro', 'Mais pesado', 'もっと重く', 'Schwerer', 'Plus dur', 'भारी', '更重', '更重'),
  lighterLabel: T('더 가볍게', 'Lighter', 'Más suave', 'Mais leve', 'もっと軽く', 'Leichter', 'Plus souple', 'हल्का', '更轻', '更輕'),

  desc: T<(f: GearFacts) => string>(
    f => `${f.cell.front}T 체인링에 ${f.cell.rear}T 스프라켓이면 기어비 ${f.ratio}입니다. 페달 한 바퀴에 ${f.development}m 나아가고, 분당 90회로 돌리면 시속 ${at90(f)}km가 됩니다.`,
    f => `A ${f.cell.front}-tooth chainring with a ${f.cell.rear}-tooth sprocket gives a ratio of ${f.ratio}. One pedal stroke carries you ${f.development} m, and at 90 rpm that is ${at90(f)} km/h.`,
    f => `Un plato de ${f.cell.front} dientes con un piñón de ${f.cell.rear} da una relación de ${f.ratio}. Una pedalada avanza ${f.development} m, y a 90 rpm son ${at90(f)} km/h.`,
    f => `Uma coroa de ${f.cell.front} dentes com pinhão de ${f.cell.rear} dá relação de ${f.ratio}. Uma pedalada avança ${f.development} m, e a 90 rpm são ${at90(f)} km/h.`,
    f => `${f.cell.front}Tのフロントに${f.cell.rear}Tのリアならギア比${f.ratio}です。ペダル1回転で${f.development}m進み、毎分90回で時速${at90(f)}kmになります。`,
    f => `Ein ${f.cell.front}-Zähne-Kettenblatt mit ${f.cell.rear}-Zähne-Ritzel ergibt ${f.ratio}. Eine Kurbelumdrehung bringt ${f.development} m, bei 90 min⁻¹ sind das ${at90(f)} km/h.`,
    f => `Un plateau de ${f.cell.front} dents avec un pignon de ${f.cell.rear} donne un rapport de ${f.ratio}. Un tour de pédale avance de ${f.development} m, soit ${at90(f)} km/h à 90 tr/min.`,
    f => `${f.cell.front}T चेनरिंग और ${f.cell.rear}T स्प्रॉकेट से अनुपात ${f.ratio} बनता है। एक पैडल चक्र ${f.development} m ले जाता है, और 90 rpm पर यह ${at90(f)} km/h है।`,
    f => `${f.cell.front}T 牙盘配 ${f.cell.rear}T 飞轮，齿比为 ${f.ratio}。每踩一圈前进 ${f.development} 米，踏频 90 时约为 ${at90(f)} 公里每小时。`,
    f => `${f.cell.front}T 牙盤配 ${f.cell.rear}T 飛輪，齒比為 ${f.ratio}。每踩一圈前進 ${f.development} 公尺，踏頻 90 時約為 ${at90(f)} 公里每小時。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '기어비는 앞니를 뒷니로 나눈 값입니다. 클수록 무겁고 멀리 나갑니다.',
      '기어비가 같으면 앞뒤 조합이 달라도 같은 기어입니다.',
      '속도는 기어비와 케이던스의 곱이라 둘 중 하나만으로는 정해지지 않습니다.',
      '이 표는 700×25C(둘레 2,105mm) 기준입니다.',
    ],
    [
      'The ratio is the chainring divided by the sprocket — bigger means harder and further.',
      'Two combinations with the same ratio are the same gear, whatever the tooth counts.',
      'Speed is ratio times cadence, so neither number settles it alone.',
      'These figures assume 700×25C wheels with a 2,105 mm circumference.',
    ],
    [
      'La relación es el plato dividido por el piñón: cuanto mayor, más duro y más lejos.',
      'Dos combinaciones con la misma relación son la misma marcha, sean cuales sean los dientes.',
      'La velocidad es relación por cadencia, así que ninguna cifra la fija por sí sola.',
      'Las cifras suponen ruedas 700×25C con 2.105 mm de perímetro.',
    ],
    [
      'A relação é a coroa dividida pelo pinhão: quanto maior, mais pesada e mais longe.',
      'Duas combinações com a mesma relação são a mesma marcha, sejam quais forem os dentes.',
      'A velocidade é relação vezes cadência, então nenhum número a define sozinho.',
      'Os números supõem rodas 700×25C com 2.105 mm de perímetro.',
    ],
    [
      'ギア比は前歯を後歯で割った値です。大きいほど重く、遠くまで進みます。',
      'ギア比が同じなら、前後の組み合わせが違っても同じギアです。',
      '速度はギア比とケイデンスの積なので、どちらか一方では決まりません。',
      'この表は700×25C(周長2,105mm)基準です。',
    ],
    [
      'Die Übersetzung ist Kettenblatt geteilt durch Ritzel — größer heißt schwerer und weiter.',
      'Zwei Kombinationen mit gleicher Übersetzung sind derselbe Gang, egal welche Zähnezahlen.',
      'Geschwindigkeit ist Übersetzung mal Trittfrequenz; keine Zahl allein entscheidet.',
      'Die Werte gelten für 700×25C mit 2.105 mm Umfang.',
    ],
    [
      'Le rapport est le plateau divisé par le pignon : plus il est grand, plus c’est dur et loin.',
      'Deux combinaisons de même rapport sont le même braquet, quelles que soient les dentures.',
      'La vitesse est le rapport multiplié par la cadence ; aucun des deux ne suffit seul.',
      'Les valeurs supposent des roues 700×25C de 2 105 mm de circonférence.',
    ],
    [
      'अनुपात चेनरिंग को स्प्रॉकेट से भाग देने पर मिलता है — जितना बड़ा, उतना भारी और दूर।',
      'एक ही अनुपात वाली दो जोड़ियाँ वही गियर हैं, दाँत चाहे जो हों।',
      'गति अनुपात गुणा कैडेंस है, इसलिए अकेला कोई अंक इसे तय नहीं करता।',
      'ये आँकड़े 700×25C (परिधि 2,105 mm) मानकर हैं।',
    ],
    [
      '齿比是牙盘除以飞轮，越大越重、前进越远。',
      '齿比相同的两种组合就是同一个挡位，齿数如何并不重要。',
      '速度是齿比乘以踏频，任何一个数字单独都定不了。',
      '本表按 700×25C（周长 2,105 毫米）计算。',
    ],
    [
      '齒比是牙盤除以飛輪，越大越重、前進越遠。',
      '齒比相同的兩種組合就是同一個檔位，齒數如何並不重要。',
      '速度是齒比乘以踏頻，任何一個數字單獨都定不了。',
      '本表按 700×25C（周長 2,105 公釐）計算。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '자전거 기어비표 168칸 — 체인링과 스프라켓별 발전거리',
    'Bike gear ratio chart — development by chainring and sprocket',
    'Tabla de desarrollos — por plato y piñón',
    'Tabela de relações — por coroa e pinhão',
    '自転車ギア比表168マス — フロントとリア別の進む距離',
    'Übersetzungstabelle — Entfaltung nach Kettenblatt und Ritzel',
    'Tableau de braquets — développement par plateau et pignon',
    'साइकिल गियर अनुपात तालिका — चेनरिंग और स्प्रॉकेट के अनुसार',
    '自行车齿比表 168 格 — 按牙盘和飞轮的前进距离',
    '自行車齒比表 168 格 — 按牙盤和飛輪的前進距離',
  ),
  hubMetaDesc: T(
    '앞 체인링 12가지와 뒤 스프라켓 14가지가 만나는 168칸. 기어비와 페달 한 바퀴에 나아가는 거리, 케이던스별 속도, 기어비가 같은 다른 조합을 함께 봅니다.',
    'The 168 pairings of 12 chainrings and 14 sprockets: gear ratio, metres per pedal stroke, speed at four cadences, and the other combinations that share the same ratio.',
    'Las 168 combinaciones de 12 platos y 14 piñones: relación, metros por pedalada, velocidad a cuatro cadencias y las demás combinaciones con la misma relación.',
    'As 168 combinações de 12 coroas e 14 pinhões: relação, metros por pedalada, velocidade em quatro cadências e as outras combinações com a mesma relação.',
    'フロント12通りとリア14通りが交わる168マス。ギア比、ペダル1回転で進む距離、ケイデンス別の速度、ギア比が同じ他の組み合わせをまとめて見ます。',
    'Die 168 Paarungen aus 12 Kettenblättern und 14 Ritzeln: Übersetzung, Meter je Kurbelumdrehung, Tempo bei vier Trittfrequenzen und die Kombinationen mit gleicher Übersetzung.',
    'Les 168 croisements de 12 plateaux et 14 pignons : rapport, mètres par tour de pédale, vitesse à quatre cadences et les autres combinaisons de même rapport.',
    '12 चेनरिंग और 14 स्प्रॉकेट के 168 जोड़: गियर अनुपात, प्रति पैडल चक्र मीटर, चार कैडेंस पर गति, और वही अनुपात रखने वाली दूसरी जोड़ियाँ।',
    '12 种牙盘与 14 种飞轮组成的 168 格：齿比、每踩一圈的米数、四种踏频下的速度，以及齿比相同的其他组合。',
    '12 種牙盤與 14 種飛輪組成的 168 格：齒比、每踩一圈的公尺數、四種踏頻下的速度，以及齒比相同的其他組合。',
  ),

  metaTitle: T<(f: GearFacts) => string>(
    f => `${f.cell.front}×${f.cell.rear} 기어비 ${f.ratio} — 한 바퀴에 ${f.development}m`,
    f => `${f.cell.front}×${f.cell.rear} ratio ${f.ratio} — ${f.development} m per stroke`,
    f => `${f.cell.front}×${f.cell.rear} relación ${f.ratio} — ${f.development} m por pedalada`,
    f => `${f.cell.front}×${f.cell.rear} relação ${f.ratio} — ${f.development} m por pedalada`,
    f => `${f.cell.front}×${f.cell.rear} ギア比${f.ratio} — 1回転で${f.development}m`,
    f => `${f.cell.front}×${f.cell.rear} Übersetzung ${f.ratio} — ${f.development} m je Umdrehung`,
    f => `${f.cell.front}×${f.cell.rear} rapport ${f.ratio} — ${f.development} m par tour`,
    f => `${f.cell.front}×${f.cell.rear} अनुपात ${f.ratio} — प्रति चक्र ${f.development} m`,
    f => `${f.cell.front}×${f.cell.rear} 齿比 ${f.ratio} — 每圈 ${f.development} 米`,
    f => `${f.cell.front}×${f.cell.rear} 齒比 ${f.ratio} — 每圈 ${f.development} 公尺`,
  ),

  metaDesc: T<(f: GearFacts) => string>(
    f => `${f.cell.front}T 체인링에 ${f.cell.rear}T 스프라켓이면 기어비 ${f.ratio}, 기어인치 ${f.gearInches}입니다. 페달 한 바퀴에 ${f.development}m 나아가고 분당 90회로 시속 ${at90(f)}km가 됩니다.`,
    f => `A ${f.cell.front}-tooth chainring with a ${f.cell.rear}-tooth sprocket gives a ratio of ${f.ratio} and ${f.gearInches} gear inches. One pedal stroke covers ${f.development} m, or ${at90(f)} km/h at 90 rpm.`,
    f => `Un plato de ${f.cell.front} con piñón de ${f.cell.rear} da relación ${f.ratio} y ${f.gearInches} pulgadas. Una pedalada cubre ${f.development} m, o ${at90(f)} km/h a 90 rpm.`,
    f => `Uma coroa de ${f.cell.front} com pinhão de ${f.cell.rear} dá relação ${f.ratio} e ${f.gearInches} polegadas. Uma pedalada cobre ${f.development} m, ou ${at90(f)} km/h a 90 rpm.`,
    f => `${f.cell.front}Tのフロントに${f.cell.rear}Tのリアでギア比${f.ratio}、ギアインチ${f.gearInches}です。ペダル1回転で${f.development}m進み、毎分90回で時速${at90(f)}kmです。`,
    f => `Ein ${f.cell.front}er Kettenblatt mit ${f.cell.rear}er Ritzel ergibt ${f.ratio} und ${f.gearInches} Zoll Entfaltung. Eine Kurbelumdrehung bringt ${f.development} m, bei 90 min⁻¹ ${at90(f)} km/h.`,
    f => `Un plateau de ${f.cell.front} avec un pignon de ${f.cell.rear} donne ${f.ratio} et ${f.gearInches} pouces. Un tour couvre ${f.development} m, soit ${at90(f)} km/h à 90 tr/min.`,
    f => `${f.cell.front}T चेनरिंग और ${f.cell.rear}T स्प्रॉकेट से अनुपात ${f.ratio} और ${f.gearInches} गियर इंच बनते हैं। एक चक्र ${f.development} m तय करता है, 90 rpm पर ${at90(f)} km/h।`,
    f => `${f.cell.front}T 牙盘配 ${f.cell.rear}T 飞轮，齿比 ${f.ratio}，齿轮英寸 ${f.gearInches}。每踩一圈前进 ${f.development} 米，踏频 90 时 ${at90(f)} 公里每小时。`,
    f => `${f.cell.front}T 牙盤配 ${f.cell.rear}T 飛輪，齒比 ${f.ratio}，齒輪英吋 ${f.gearInches}。每踩一圈前進 ${f.development} 公尺，踏頻 90 時 ${at90(f)} 公里每小時。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '기어비는 어떻게 계산하나요?', a: '앞 체인링 잇수를 뒤 스프라켓 잇수로 나눕니다. 50T에 25T면 2.0입니다. 여기에 바퀴 둘레를 곱하면 페달 한 바퀴에 나아가는 거리가 나옵니다.' },
      { q: '"몇 단"으로 견주면 안 되나요?', a: '자전거마다 뜻이 달라 견줄 수 없습니다. 같은 3단이라도 앞뒤 잇수가 다르면 전혀 다른 기어입니다. 견줄 수 있는 것은 기어비뿐입니다.' },
      { q: '무거운 기어를 쓰면 빨라지나요?', a: '속도는 기어비와 케이던스의 곱이라 그렇지 않습니다. 무거운 기어를 천천히 밟는 것과 가벼운 기어를 빠르게 돌리는 것이 같은 속도를 냅니다. 다리는 후자를 훨씬 오래 견딥니다.' },
      { q: '적당한 케이던스는 얼마인가요?', a: '오래 달릴 때는 분당 80~90회를 흔히 씁니다. 그보다 낮으면 무릎에 힘이 몰리고, 높으면 숨이 먼저 찹니다. 그 사이를 지킬 수 있는 기어를 고르는 것이 요령입니다.' },
      { q: '바퀴 크기가 다르면요?', a: '거리와 속도가 바퀴 둘레에 비례하므로 그만큼 줄거나 늡니다. 기어비 자체는 바퀴와 무관하게 앞뒤 잇수로만 정해집니다.' },
    ],
    [
      { q: 'How is a gear ratio worked out?', a: 'Divide the chainring teeth by the sprocket teeth — 50 over 25 is 2.0. Multiply that by the wheel circumference and you get the distance one pedal stroke carries you.' },
      { q: 'Why not just compare "which gear"?', a: 'Because it means something different on every bike. Third gear with one pair of tooth counts is a completely different gear from third with another. The ratio is the only comparable number.' },
      { q: 'Does a bigger gear make you faster?', a: 'Not on its own. Speed is ratio times cadence, so grinding a big gear slowly and spinning a small one quickly give the same speed — and legs hold the second far longer.' },
      { q: 'What cadence should I aim for?', a: 'Around 80 to 90 revolutions a minute for long rides. Below that the load piles onto the knees; above it the breathing gives out first. Pick the gear that keeps you between the two.' },
      { q: 'What changes with a different wheel size?', a: 'Distance and speed scale with the circumference, so both shrink or grow in proportion. The ratio itself has nothing to do with wheels — only the tooth counts set it.' },
    ],
    [
      { q: '¿Cómo se calcula la relación?', a: 'Se divide el número de dientes del plato entre el del piñón: 50 entre 25 es 2,0. Multiplicado por el perímetro de la rueda da lo que avanza una pedalada.' },
      { q: '¿Por qué no comparar «qué marcha»?', a: 'Porque significa algo distinto en cada bici. La tercera con unos dientes es una marcha completamente distinta de la tercera con otros. Lo único comparable es la relación.' },
      { q: '¿Un desarrollo mayor da más velocidad?', a: 'No por sí solo. La velocidad es relación por cadencia: machacar un desarrollo grande despacio y girar uno pequeño rápido dan lo mismo, y las piernas aguantan mucho más lo segundo.' },
      { q: '¿Qué cadencia conviene?', a: 'Entre 80 y 90 pedaladas por minuto en salidas largas. Por debajo la carga se concentra en las rodillas; por encima falla antes la respiración. Elige la marcha que te mantenga en medio.' },
      { q: '¿Y si la rueda es de otro tamaño?', a: 'La distancia y la velocidad son proporcionales al perímetro, así que suben o bajan igual. La relación no depende de la rueda: la fijan solo los dientes.' },
    ],
    [
      { q: 'Como se calcula a relação?', a: 'Divide-se os dentes da coroa pelos do pinhão: 50 por 25 dá 2,0. Multiplicando pelo perímetro da roda, obtém-se o que uma pedalada avança.' },
      { q: 'Por que não comparar «que marcha»?', a: 'Porque significa algo diferente em cada bike. A terceira com certos dentes é uma marcha completamente diferente da terceira com outros. Só a relação é comparável.' },
      { q: 'Uma marcha maior deixa mais rápido?', a: 'Não por si só. A velocidade é relação vezes cadência: forçar uma marcha pesada devagar e girar uma leve rápido dão o mesmo, e as pernas aguentam muito mais a segunda.' },
      { q: 'Qual cadência buscar?', a: 'Entre 80 e 90 pedaladas por minuto em pedais longos. Abaixo disso a carga vai para os joelhos; acima, a respiração falha antes. Escolha a marcha que mantenha você no meio.' },
      { q: 'E se a roda for de outro tamanho?', a: 'Distância e velocidade são proporcionais ao perímetro, então sobem ou descem junto. A relação não depende da roda: só os dentes a definem.' },
    ],
    [
      { q: 'ギア比はどう計算しますか。', a: 'フロントの歯数をリアの歯数で割ります。50Tと25Tなら2.0です。これにホイール周長を掛ければ、ペダル1回転で進む距離が出ます。' },
      { q: '「何速」で比べてはだめですか。', a: '自転車ごとに意味が違うので比べられません。同じ3速でも前後の歯数が違えばまったく別のギアです。比べられるのはギア比だけです。' },
      { q: '重いギアを使えば速くなりますか。', a: '速度はギア比とケイデンスの積なのでそうとは限りません。重いギアをゆっくり踏むのと軽いギアを速く回すのは同じ速度です。脚は後者のほうがずっと長くもちます。' },
      { q: '適したケイデンスはどれくらいですか。', a: '長く走るなら毎分80〜90回がよく使われます。それより低いと膝に力が集まり、高いと息が先に上がります。その間を保てるギアを選ぶのがこつです。' },
      { q: 'ホイールの大きさが違うと？', a: '距離と速度は周長に比例するのでその分だけ増減します。ギア比自体はホイールと関係なく前後の歯数だけで決まります。' },
    ],
    [
      { q: 'Wie rechnet man die Übersetzung?', a: 'Zähne des Kettenblatts geteilt durch die des Ritzels — 50 zu 25 ergibt 2,0. Mal Radumfang genommen erhält man den Weg je Kurbelumdrehung.' },
      { q: 'Warum nicht einfach „welcher Gang“ vergleichen?', a: 'Weil das an jedem Rad etwas anderes heißt. Der dritte Gang bei einer Zähnekombination ist ein völlig anderer als der dritte bei einer anderen. Vergleichbar ist nur die Übersetzung.' },
      { q: 'Macht ein größerer Gang schneller?', a: 'Nicht für sich. Geschwindigkeit ist Übersetzung mal Trittfrequenz — großen Gang langsam drücken und kleinen schnell drehen ergibt dasselbe, nur hält man Zweiteres viel länger durch.' },
      { q: 'Welche Trittfrequenz ist sinnvoll?', a: 'Auf langen Fahrten 80 bis 90 Umdrehungen je Minute. Darunter lastet alles auf den Knien, darüber geht die Luft zuerst aus. Wählen Sie den Gang, der Sie dazwischen hält.' },
      { q: 'Was ändert eine andere Radgröße?', a: 'Weg und Tempo hängen am Umfang und ändern sich im selben Verhältnis. Die Übersetzung selbst hat mit dem Rad nichts zu tun — sie steht allein durch die Zähnezahlen fest.' },
    ],
    [
      { q: 'Comment calcule-t-on le rapport ?', a: 'On divise les dents du plateau par celles du pignon : 50 sur 25 fait 2,0. Multiplié par la circonférence de la roue, cela donne la distance parcourue par tour de pédale.' },
      { q: 'Pourquoi ne pas comparer « quelle vitesse » ?', a: 'Parce que cela veut dire autre chose sur chaque vélo. La troisième avec une denture est un braquet tout autre que la troisième avec une autre. Seul le rapport se compare.' },
      { q: 'Un plus grand braquet rend-il plus rapide ?', a: 'Pas à lui seul. La vitesse est le rapport multiplié par la cadence : écraser un grand braquet lentement ou mouliner un petit vite donne la même chose, mais les jambes tiennent bien mieux la seconde.' },
      { q: 'Quelle cadence viser ?', a: 'Entre 80 et 90 tours par minute sur les longues sorties. En dessous, tout pèse sur les genoux ; au-dessus, le souffle lâche en premier. Prenez le braquet qui vous garde entre les deux.' },
      { q: 'Et avec une autre taille de roue ?', a: 'Distance et vitesse suivent la circonférence et varient dans la même proportion. Le rapport, lui, ne dépend pas de la roue : seules les dentures le fixent.' },
    ],
    [
      { q: 'गियर अनुपात कैसे निकालें?', a: 'चेनरिंग के दाँतों को स्प्रॉकेट के दाँतों से भाग दें — 50 बटा 25 यानी 2.0। इसे पहिये की परिधि से गुणा करें तो एक पैडल चक्र की दूरी मिल जाती है।' },
      { q: '"कौन सा गियर" से तुलना क्यों नहीं?', a: 'क्योंकि हर साइकिल पर उसका मतलब अलग है। एक जोड़ी दाँतों वाला तीसरा गियर दूसरी जोड़ी वाले तीसरे से बिलकुल अलग है। तुलना सिर्फ़ अनुपात से होती है।' },
      { q: 'क्या भारी गियर से तेज़ चलते हैं?', a: 'अकेले नहीं। गति अनुपात गुणा कैडेंस है — भारी गियर धीरे दबाना और हल्का तेज़ घुमाना एक ही गति देते हैं, और टाँगें दूसरे को कहीं ज़्यादा देर झेलती हैं।' },
      { q: 'कैडेंस कितना रखें?', a: 'लंबी राइड में 80 से 90 चक्कर प्रति मिनट। इससे कम पर भार घुटनों पर आता है, ज़्यादा पर साँस पहले फूलती है। वह गियर चुनें जो बीच में रखे।' },
      { q: 'पहिया दूसरे आकार का हो तो?', a: 'दूरी और गति परिधि के अनुपात में घटती-बढ़ती हैं। अनुपात का पहिये से कोई लेना-देना नहीं — वह सिर्फ़ दाँतों से तय होता है।' },
    ],
    [
      { q: '齿比怎么算？', a: '用牙盘齿数除以飞轮齿数，50 比 25 就是 2.0。再乘以车轮周长，就得到每踩一圈前进的距离。' },
      { q: '为什么不能用「几档」来比？', a: '因为每辆车上的含义都不同。同样是三档，前后齿数不一样就是完全不同的挡位。能比较的只有齿比。' },
      { q: '用重挡会更快吗？', a: '单靠重挡不会。速度是齿比乘以踏频，重挡慢踩和轻挡快踩得到同样的速度，而腿在后一种方式下能撑得久得多。' },
      { q: '踏频保持多少合适？', a: '长距离骑行常用每分钟 80 到 90 转。低于这个区间，力量都压在膝盖上；高于它，呼吸先跟不上。选能让你停在中间的挡位。' },
      { q: '车轮尺寸不同会怎样？', a: '距离和速度与周长成正比，会按同样比例增减。齿比本身与车轮无关，只由前后齿数决定。' },
    ],
    [
      { q: '齒比怎麼算？', a: '用牙盤齒數除以飛輪齒數，50 比 25 就是 2.0。再乘以車輪周長，就得到每踩一圈前進的距離。' },
      { q: '為什麼不能用「幾檔」來比？', a: '因為每輛車上的含義都不同。同樣是三檔，前後齒數不一樣就是完全不同的檔位。能比較的只有齒比。' },
      { q: '用重檔會更快嗎？', a: '單靠重檔不會。速度是齒比乘以踏頻，重檔慢踩和輕檔快踩得到同樣的速度，而腿在後一種方式下能撐得久得多。' },
      { q: '踏頻保持多少合適？', a: '長距離騎行常用每分鐘 80 到 90 轉。低於這個區間，力量都壓在膝蓋上；高於它，呼吸先跟不上。選能讓你停在中間的檔位。' },
      { q: '車輪尺寸不同會怎樣？', a: '距離和速度與周長成正比，會按同樣比例增減。齒比本身與車輪無關，只由前後齒數決定。' },
    ],
  ),

  cellFaq: T<(f: GearFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.front}×${f.cell.rear}는 기어비가 얼마인가요?`, a: `${f.ratio}입니다. 페달 한 바퀴에 ${f.development}m 나아가고, 기어인치로는 ${f.gearInches}입니다.` },
      { q: '이 기어로 얼마나 빠른가요?', a: `분당 90회로 돌리면 시속 ${at90(f)}km입니다. 속도는 케이던스에 비례하므로 60회면 그 3분의 2, 100회면 그보다 조금 빠릅니다.` },
      { q: '이것과 같은 느낌의 다른 조합이 있나요?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')}이 기어비가 거의 같습니다.` : '이 표 안에서는 기어비가 1% 안에 드는 다른 조합이 없습니다.' },
      { q: '한 단 가볍게 하면요?', a: f.lighter ? `${f.lighter.front}×${f.lighter.rear}가 되어 페달이 가벼워지는 대신 한 바퀴에 나아가는 거리가 줄어듭니다.` : '이 표에서 더 가벼운 스프라켓은 없습니다. 오르막이 더 필요하다면 체인링을 작은 쪽으로 바꿔야 합니다.' },
    ],
    f => [
      { q: `What is the ratio of ${f.cell.front}×${f.cell.rear}?`, a: `${f.ratio}. One pedal stroke carries you ${f.development} m, which is ${f.gearInches} gear inches.` },
      { q: 'How fast is this gear?', a: `At 90 rpm it works out to ${at90(f)} km/h. Speed scales with cadence, so 60 rpm gives two thirds of that and 100 rpm a little more.` },
      { q: 'Is there another combination that feels the same?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} share almost the same ratio.` : 'No other combination in this table sits within 1 % of this ratio.' },
      { q: 'What happens one sprocket lighter?', a: f.lighter ? `You land on ${f.lighter.front}×${f.lighter.rear}: the pedals ease off, but each stroke carries you less far.` : 'There is no lighter sprocket in this table. For steeper climbs you would drop to a smaller chainring.' },
    ],
    f => [
      { q: `¿Qué relación tiene ${f.cell.front}×${f.cell.rear}?`, a: `${f.ratio}. Una pedalada avanza ${f.development} m, que son ${f.gearInches} pulgadas de desarrollo.` },
      { q: '¿A qué velocidad va esta marcha?', a: `A 90 rpm sale ${at90(f)} km/h. La velocidad va con la cadencia, así que a 60 rpm son dos tercios y a 100 algo más.` },
      { q: '¿Hay otra combinación que se sienta igual?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} tienen casi la misma relación.` : 'Ninguna otra combinación de esta tabla queda dentro del 1 % de esta relación.' },
      { q: '¿Y un piñón más suave?', a: f.lighter ? `Pasas a ${f.lighter.front}×${f.lighter.rear}: el pedaleo se suaviza, pero cada pedalada avanza menos.` : 'No hay piñón más suave en esta tabla. Para rampas más duras habría que bajar de plato.' },
    ],
    f => [
      { q: `Qual a relação de ${f.cell.front}×${f.cell.rear}?`, a: `${f.ratio}. Uma pedalada avança ${f.development} m, o que dá ${f.gearInches} polegadas.` },
      { q: 'Que velocidade essa marcha dá?', a: `A 90 rpm dá ${at90(f)} km/h. A velocidade acompanha a cadência, então 60 rpm rende dois terços e 100 rpm um pouco mais.` },
      { q: 'Existe outra combinação com a mesma sensação?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} têm relação quase igual.` : 'Nenhuma outra combinação desta tabela fica a menos de 1 % desta relação.' },
      { q: 'E um pinhão mais leve?', a: f.lighter ? `Você vai para ${f.lighter.front}×${f.lighter.rear}: a pedalada alivia, mas cada volta avança menos.` : 'Não há pinhão mais leve nesta tabela. Para subidas mais duras seria preciso reduzir a coroa.' },
    ],
    f => [
      { q: `${f.cell.front}×${f.cell.rear}のギア比はどれだけですか。`, a: `${f.ratio}です。ペダル1回転で${f.development}m進み、ギアインチでは${f.gearInches}です。` },
      { q: 'このギアでどれくらい速いですか。', a: `毎分90回で時速${at90(f)}kmです。速度はケイデンスに比例するので、60回ならその3分の2、100回なら少し速くなります。` },
      { q: '同じ感触の組み合わせはありますか。', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join('、')}がほぼ同じギア比です。` : 'この表の中に、ギア比が1%以内の他の組み合わせはありません。' },
      { q: '1枚軽くするとどうなりますか。', a: f.lighter ? `${f.lighter.front}×${f.lighter.rear}になり、ペダルは軽くなる代わりに1回転で進む距離が減ります。` : 'この表にこれより軽いリアはありません。もっと登りたいならフロントを小さくします。' },
    ],
    f => [
      { q: `Welche Übersetzung hat ${f.cell.front}×${f.cell.rear}?`, a: `${f.ratio}. Eine Kurbelumdrehung bringt ${f.development} m, das sind ${f.gearInches} Zoll Entfaltung.` },
      { q: 'Wie schnell ist dieser Gang?', a: `Bei 90 min⁻¹ ergibt das ${at90(f)} km/h. Das Tempo geht mit der Trittfrequenz: 60 min⁻¹ bringen zwei Drittel, 100 etwas mehr.` },
      { q: 'Gibt es eine gleich wirkende Kombination?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} liegen fast gleichauf.` : 'In dieser Tabelle liegt keine andere Kombination innerhalb von 1 % dieser Übersetzung.' },
      { q: 'Was bringt ein Ritzel leichter?', a: f.lighter ? `Sie landen bei ${f.lighter.front}×${f.lighter.rear}: die Kurbel geht leichter, dafür bringt jede Umdrehung weniger Weg.` : 'Ein leichteres Ritzel führt diese Tabelle nicht. Für steilere Anstiege müsste ein kleineres Kettenblatt her.' },
    ],
    f => [
      { q: `Quel est le rapport de ${f.cell.front}×${f.cell.rear} ?`, a: `${f.ratio}. Un tour de pédale avance de ${f.development} m, soit ${f.gearInches} pouces de développement.` },
      { q: 'Quelle vitesse donne ce braquet ?', a: `À 90 tr/min, cela fait ${at90(f)} km/h. La vitesse suit la cadence : 60 tr/min en donnent les deux tiers, 100 un peu plus.` },
      { q: 'Une autre combinaison au même ressenti ?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} ont un rapport quasi identique.` : 'Aucune autre combinaison de ce tableau ne tient dans 1 % de ce rapport.' },
      { q: 'Et un pignon plus souple ?', a: f.lighter ? `Vous passez à ${f.lighter.front}×${f.lighter.rear} : le pédalage s’allège, mais chaque tour avance moins.` : 'Ce tableau ne va pas plus souple. Pour des pentes plus raides, il faudrait un plus petit plateau.' },
    ],
    f => [
      { q: `${f.cell.front}×${f.cell.rear} का अनुपात क्या है?`, a: `${f.ratio}। एक पैडल चक्र ${f.development} m ले जाता है, यानी ${f.gearInches} गियर इंच।` },
      { q: 'इस गियर से कितनी गति मिलती है?', a: `90 rpm पर ${at90(f)} km/h। गति कैडेंस के अनुपात में चलती है, इसलिए 60 rpm पर दो-तिहाई और 100 rpm पर थोड़ा ज़्यादा।` },
      { q: 'क्या वैसी ही लगने वाली कोई और जोड़ी है?', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join(', ')} का अनुपात लगभग यही है।` : 'इस तालिका में इस अनुपात के 1% के भीतर कोई दूसरी जोड़ी नहीं है।' },
      { q: 'एक स्प्रॉकेट हल्का करें तो?', a: f.lighter ? `${f.lighter.front}×${f.lighter.rear} मिलता है: पैडल हल्का हो जाता है, पर हर चक्र कम दूरी तय करता है।` : 'इस तालिका में इससे हल्का स्प्रॉकेट नहीं है। ज़्यादा चढ़ाई के लिए छोटी चेनरिंग चाहिए।' },
    ],
    f => [
      { q: `${f.cell.front}×${f.cell.rear} 的齿比是多少？`, a: `${f.ratio}。每踩一圈前进 ${f.development} 米，换成齿轮英寸是 ${f.gearInches}。` },
      { q: '这个挡位能跑多快？', a: `踏频 90 时约 ${at90(f)} 公里每小时。速度与踏频成正比，60 时是它的三分之二，100 时略快一些。` },
      { q: '有没有感觉相同的其他组合？', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join('、')} 的齿比几乎一样。` : '本表中没有齿比在 1% 以内的其他组合。' },
      { q: '换轻一档会怎样？', a: f.lighter ? `会变成 ${f.lighter.front}×${f.lighter.rear}：踩起来更轻，但每圈前进的距离变少。` : '本表中没有更轻的飞轮。想应付更陡的坡就要换更小的牙盘。' },
    ],
    f => [
      { q: `${f.cell.front}×${f.cell.rear} 的齒比是多少？`, a: `${f.ratio}。每踩一圈前進 ${f.development} 公尺，換成齒輪英吋是 ${f.gearInches}。` },
      { q: '這個檔位能跑多快？', a: `踏頻 90 時約 ${at90(f)} 公里每小時。速度與踏頻成正比，60 時是它的三分之二，100 時略快一些。` },
      { q: '有沒有感覺相同的其他組合？', a: f.sameFeel.length ? `${f.sameFeel.slice(0, 3).map(n => `${n.front}×${n.rear}`).join('、')} 的齒比幾乎一樣。` : '本表中沒有齒比在 1% 以內的其他組合。' },
      { q: '換輕一檔會怎樣？', a: f.lighter ? `會變成 ${f.lighter.front}×${f.lighter.rear}：踩起來更輕，但每圈前進的距離變少。` : '本表中沒有更輕的飛輪。想應付更陡的坡就要換更小的牙盤。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const GEAR_UI: L<GearUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<GearUI>;
