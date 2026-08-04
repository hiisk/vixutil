/**
 * 조임 토크 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "토크는 목적이 아니라 수단"이다. 원하는 것은 볼트가
 * 늘어나며 두 판을 눌러 붙이는 축력이고, 토크는 그것을 만들려고 돌리는 값이다.
 * 돌린 힘의 90% 가까이가 마찰로 사라지기 때문에, 기름 한 방울에 필요한 토크가
 * 25%씩 달라진다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { TorqueFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface TorqueUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  gradeLabel: string;
  pitchLabel: string;
  areaLabel: string;
  tensileLabel: string;
  yieldLabel: string;
  preloadLabel: string;
  breakingLabel: string;
  torqueLabel: string;
  kgfLabel: string;
  lbftLabel: string;
  frictionName: (key: string) => string;
  knownName: (key: string) => string;
  whyTitle: string;
  whyNote: string;
  gradeTitle: string;
  gradeNote: string;
  frictionTitle: string;
  frictionNote: string;
  preloadTitle: string;
  preloadNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  gradeRowTitle: string;
  sizeRowTitle: string;
  desc: (f: TorqueFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: TorqueFacts) => string;
  metaDesc: (f: TorqueFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: TorqueFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

type Spec = { [K in keyof TorqueUI]: L<TorqueUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('조임 토크', 'Bolt torque', 'Par de apriete', 'Torque de aperto', '締め付けトルク', 'Anzugsmoment', 'Couple de serrage', 'बोल्ट टॉर्क', '拧紧扭矩', '鎖緊扭矩'),

  frictionName: T<(key: string) => string>(
    pick({ zinc: '아연도금 그대로', dry: '기름기 없는 강철', oiled: '기름을 바른', waxed: '왁스·이황화몰리브덴' }),
    pick({ zinc: 'zinc-plated, as it comes', dry: 'plain dry steel', oiled: 'lightly oiled', waxed: 'waxed or moly-coated' }),
    pick({ zinc: 'zincado, tal cual', dry: 'acero seco', oiled: 'ligeramente engrasado', waxed: 'encerado o con molibdeno' }),
    pick({ zinc: 'zincado, como vem', dry: 'aço seco', oiled: 'levemente lubrificado', waxed: 'encerado ou com molibdênio' }),
    pick({ zinc: '亜鉛めっきのまま', dry: '油気のない鋼', oiled: '油を差した', waxed: 'ワックス・二硫化モリブデン' }),
    pick({ zinc: 'verzinkt, wie geliefert', dry: 'trockener Stahl', oiled: 'leicht geölt', waxed: 'gewachst oder MoS₂' }),
    pick({ zinc: 'zingué, tel quel', dry: 'acier sec', oiled: 'légèrement huilé', waxed: 'ciré ou au molybdène' }),
    pick({ zinc: 'ज़िंक कोटेड, जैसा है', dry: 'सूखा स्टील', oiled: 'हल्का तेल लगा', waxed: 'वैक्स या मॉली कोटेड' }),
    pick({ zinc: '镀锌原样', dry: '无油干钢', oiled: '轻微润滑', waxed: '打蜡或二硫化钼' }),
    pick({ zinc: '鍍鋅原樣', dry: '無油乾鋼', oiled: '輕微潤滑', waxed: '打蠟或二硫化鉬' }),
  ),

  knownName: T<(key: string) => string>(
    pick({ small: '가전·전자 기기', bike: '자전거 크랭크', car: '자동차 하체', frame: '기계 프레임', heavy: '중장비·구조물' }),
    pick({ small: 'appliances and electronics', bike: 'bicycle cranks', car: 'car suspension', frame: 'machine frames', heavy: 'heavy equipment and structures' }),
    pick({ small: 'electrodomésticos y electrónica', bike: 'bielas de bicicleta', car: 'suspensión del coche', frame: 'bastidores de máquinas', heavy: 'maquinaria pesada y estructuras' }),
    pick({ small: 'eletrodomésticos e eletrônicos', bike: 'pedivelas de bicicleta', car: 'suspensão do carro', frame: 'estruturas de máquinas', heavy: 'equipamentos pesados e estruturas' }),
    pick({ small: '家電・電子機器', bike: '自転車のクランク', car: '自動車の足回り', frame: '機械のフレーム', heavy: '重機・構造物' }),
    pick({ small: 'Haushalts- und Elektrogeräte', bike: 'Fahrradkurbeln', car: 'Fahrwerk am Auto', frame: 'Maschinenrahmen', heavy: 'Baumaschinen und Tragwerke' }),
    pick({ small: 'électroménager et électronique', bike: 'manivelles de vélo', car: 'suspension automobile', frame: 'châssis de machines', heavy: 'engins lourds et structures' }),
    pick({ small: 'उपकरण और इलेक्ट्रॉनिक्स', bike: 'साइकिल क्रैंक', car: 'कार सस्पेंशन', frame: 'मशीन फ़्रेम', heavy: 'भारी मशीनरी और ढाँचे' }),
    pick({ small: '家电与电子设备', bike: '自行车曲柄', car: '汽车底盘', frame: '机器框架', heavy: '重型设备与结构件' }),
    pick({ small: '家電與電子設備', bike: '自行車曲柄', car: '汽車底盤', frame: '機器框架', heavy: '重型設備與結構件' }),
  ),

  hubTitle: T(
    '조임 토크 152칸 — M8 8.8은 26N·m',
    '152 torque figures — M8 in grade 8.8 takes 26 N·m',
    '152 pares de apriete — un M8 de grado 8.8 pide 26 N·m',
    '152 torques de aperto — um M8 classe 8.8 pede 26 N·m',
    '締め付けトルク152マス — M8の8.8は26N·m',
    '152 Anzugsmomente — M8 in 8.8 braucht 26 N·m',
    '152 couples de serrage — un M8 en 8.8 demande 26 N·m',
    '152 टॉर्क मान — 8.8 ग्रेड का M8 यानी 26 N·m',
    '152 个拧紧扭矩 — 8.8 级 M8 需要 26N·m',
    '152 個鎖緊扭矩 — 8.8 級 M8 需要 26N·m',
  ),

  hubLead: T(
    '볼트 19가지와 등급 8가지가 만나는 칸마다 목표 축력과 조임 토크를 계산했습니다. 표를 옮겨 적은 것이 아니라, 등급 숫자에서 강도를 읽고 나사 단면적을 곱해 낸 값입니다.',
    'A target clamp force and a tightening torque for every meeting of 19 bolt sizes and 8 grades. Nothing is copied from a table: the grade number gives the strength, the thread gives the area, and the rest follows.',
    'Una fuerza de apriete objetivo y un par para cada cruce de 19 diámetros y 8 grados. Nada se copia de una tabla: el número de grado da la resistencia, la rosca da la sección y el resto sale solo.',
    'Uma força de aperto alvo e um torque para cada cruzamento de 19 diâmetros e 8 classes. Nada é copiado de tabela: o número da classe dá a resistência, a rosca dá a área, e o resto sai daí.',
    'ボルト19通りと等級8通りが出会う各マスの目標軸力と締め付けトルクを計算しました。表を写したのではなく、等級の数字から強度を読み、ねじの断面積を掛けて出した値です。',
    'Für jede Begegnung von 19 Schraubengrößen und 8 Festigkeitsklassen eine Zielvorspannkraft und ein Anzugsmoment. Nichts ist abgeschrieben: die Klasse liefert die Festigkeit, das Gewinde die Fläche, der Rest folgt.',
    'Une précharge visée et un couple pour chaque croisement de 19 diamètres et 8 classes. Rien n’est recopié d’un tableau : la classe donne la résistance, le filetage la section, et le reste suit.',
    '19 बोल्ट आकारों और 8 ग्रेडों के हर मेल का लक्ष्य क्लैम्प बल और कसने का टॉर्क। कुछ भी तालिका से नकल नहीं: ग्रेड संख्या से मज़बूती, चूड़ी से क्षेत्रफल, बाकी अपने आप।',
    '19 种螺栓与 8 个强度等级交汇的每一格都算出目标预紧力和拧紧扭矩。没有照抄表格：等级数字给出强度，螺纹给出截面积，其余顺势而来。',
    '19 種螺栓與 8 個強度等級交匯的每一格都算出目標預緊力和鎖緊扭矩。沒有照抄表格：等級數字給出強度，螺紋給出截面積，其餘順勢而來。',
  ),

  gradeLabel: T('강도 등급', 'Strength grade', 'Grado de resistencia', 'Classe de resistência', '強度区分', 'Festigkeitsklasse', 'Classe de résistance', 'मज़बूती ग्रेड', '强度等级', '強度等級'),
  pitchLabel: T('피치', 'Pitch', 'Paso', 'Passo', 'ピッチ', 'Steigung', 'Pas', 'पिच', '螺距', '螺距'),
  areaLabel: T('단면적', 'Cross-section', 'Sección', 'Seção', '断面積', 'Querschnitt', 'Section', 'अनुप्रस्थ काट', '截面积', '截面積'),
  tensileLabel: T('인장강도', 'Tensile strength', 'Resistencia a tracción', 'Resistência à tração', '引張強さ', 'Zugfestigkeit', 'Résistance à la traction', 'तन्य सामर्थ्य', '抗拉强度', '抗拉強度'),
  yieldLabel: T('항복강도', 'Yield strength', 'Límite elástico', 'Limite de escoamento', '降伏強さ', 'Streckgrenze', 'Limite d’élasticité', 'यील्ड सामर्थ्य', '屈服强度', '屈服強度'),
  preloadLabel: T('목표 축력', 'Target clamp force', 'Fuerza de apriete objetivo', 'Força de aperto alvo', '目標軸力', 'Ziel-Vorspannkraft', 'Précharge visée', 'लक्ष्य क्लैम्प बल', '目标预紧力', '目標預緊力'),
  breakingLabel: T('끊어지는 힘', 'Force that breaks it', 'Fuerza que lo rompe', 'Força que o rompe', '破断する力', 'Bruchkraft', 'Force de rupture', 'टूटने का बल', '断裂拉力', '斷裂拉力'),
  torqueLabel: T('조임 토크', 'Tightening torque', 'Par de apriete', 'Torque de aperto', '締め付けトルク', 'Anzugsmoment', 'Couple de serrage', 'कसने का टॉर्क', '拧紧扭矩', '鎖緊扭矩'),
  kgfLabel: T('kgf·m로', 'In kgf·m', 'En kgf·m', 'Em kgf·m', 'kgf·mで', 'In kgf·m', 'En kgf·m', 'kgf·m में', '换成 kgf·m', '換成 kgf·m'),
  lbftLabel: T('lb-ft로', 'In lb-ft', 'En lb-ft', 'Em lb-ft', 'lb-ftで', 'In lb-ft', 'En lb-ft', 'lb-ft में', '换成 lb-ft', '換成 lb-ft'),

  whyTitle: T('토크는 목적이 아닙니다', 'Torque is not the goal', 'El par no es el objetivo', 'O torque não é o objetivo', 'トルクは目的ではありません', 'Das Moment ist nicht das Ziel', 'Le couple n’est pas le but', 'टॉर्क लक्ष्य नहीं है', '扭矩不是目的', '扭矩不是目的'),

  whyNote: T(
    '원하는 것은 볼트가 늘어나며 두 판을 눌러 붙이는 힘, 축력입니다. 볼트는 아주 뻣뻣한 용수철이어서 조금 늘어난 채로 큰 힘을 냅니다. 토크는 그 늘어남을 만들려고 돌리는 값일 뿐이라, 같은 축력이라도 나사면이 미끄러우면 더 작은 토크로 끝납니다.',
    'What you actually want is clamp force — the bolt stretching and pressing two parts together. A bolt is a very stiff spring: it stretches a little and pushes hard. Torque is only how you produce that stretch, so the same clamp force needs less torque on a slipperier thread.',
    'Lo que realmente quieres es la fuerza de apriete: el perno se estira y presiona dos piezas. Un perno es un muelle muy rígido; se estira poco y empuja mucho. El par solo sirve para producir ese estiramiento, así que la misma fuerza necesita menos par si la rosca resbala más.',
    'O que você quer de fato é a força de aperto: o parafuso se estica e prensa duas peças. Um parafuso é uma mola muito rígida — estica pouco e empurra muito. O torque só serve para produzir esse esticamento, então a mesma força pede menos torque numa rosca mais escorregadia.',
    '欲しいのはボルトが伸びて2枚を押し付ける力、軸力です。ボルトはとても硬いばねで、少し伸びた状態で大きな力を出します。トルクはその伸びを作るために回す値でしかないので、同じ軸力でもねじ面が滑れば小さいトルクで済みます。',
    'Gewollt ist die Klemmkraft — die Schraube dehnt sich und presst zwei Teile zusammen. Eine Schraube ist eine sehr steife Feder: wenig Dehnung, große Kraft. Das Moment erzeugt nur diese Dehnung, dieselbe Klemmkraft braucht also weniger Moment, wenn das Gewinde glatter ist.',
    'Ce que l’on veut, c’est la précharge : le boulon s’allonge et serre deux pièces. Un boulon est un ressort très raide — il s’allonge peu et pousse fort. Le couple ne sert qu’à produire cet allongement : à précharge égale, un filetage plus glissant demande moins de couple.',
    'असल में चाहिए क्लैम्प बल — बोल्ट खिंचकर दो हिस्सों को दबाता है। बोल्ट बहुत कड़ा स्प्रिंग है: थोड़ा खिंचता है और ज़ोर से दबाता है। टॉर्क सिर्फ़ वह खिंचाव बनाने का साधन है, इसलिए चिकनी चूड़ी पर उतना ही बल कम टॉर्क में मिल जाता है।',
    '真正想要的是预紧力——螺栓被拉长、把两块件压在一起。螺栓是一根很硬的弹簧，稍微一伸就能产生很大的力。扭矩只是制造这个伸长的手段，所以螺纹越滑，同样的预紧力需要的扭矩就越小。',
    '真正想要的是預緊力——螺栓被拉長、把兩塊件壓在一起。螺栓是一根很硬的彈簧，稍微一伸就能產生很大的力。扭矩只是製造這個伸長的手段，所以螺紋越滑，同樣的預緊力需要的扭矩就越小。',
  ),

  gradeTitle: T('등급 숫자가 그대로 강도입니다', 'The grade number is the strength', 'El número del grado es la resistencia', 'O número da classe é a resistência', '等級の数字がそのまま強度です', 'Die Klassenzahl ist die Festigkeit', 'Le chiffre de la classe est la résistance', 'ग्रेड संख्या ही मज़बूती है', '等级数字就是强度', '等級數字就是強度'),

  gradeNote: T(
    '8.8이라면 앞자리 8은 인장강도 800MPa, 뒷자리 8은 항복이 인장의 8할이라는 뜻입니다 — 640MPa입니다. 12.9는 1200MPa에 항복 1080MPa입니다. 표를 찾을 것 없이 볼트 머리에 찍힌 두 자리에서 읽어 내면 됩니다. A2-70 같은 스테인리스만 규칙이 달라 값을 따로 둡니다.',
    'In 8.8, the first digit means 800 MPa tensile; the second says the yield is eight tenths of that — 640 MPa. A 12.9 is 1200 MPa with a yield of 1080. There is no table to look up: the two digits stamped on the head say it. Only stainless marks like A2-70 follow a different rule.',
    'En un 8.8, el primer dígito son 800 MPa de tracción; el segundo dice que el límite elástico es ocho décimos de eso: 640 MPa. Un 12.9 son 1200 MPa con 1080 de límite. No hay tabla que consultar: los dos dígitos grabados en la cabeza lo dicen. Solo los inoxidables como A2-70 siguen otra regla.',
    'Num 8.8, o primeiro dígito são 800 MPa de tração; o segundo diz que o escoamento é oito décimos disso — 640 MPa. Um 12.9 são 1200 MPa com escoamento de 1080. Não há tabela a consultar: os dois dígitos gravados na cabeça já dizem. Só inoxidáveis como A2-70 seguem outra regra.',
    '8.8なら前の8は引張強さ800MPa、後ろの8は降伏が引張の8割という意味で640MPaです。12.9は1200MPaで降伏1080MPaです。表を引くまでもなく、ボルト頭に刻まれた2桁から読み取れます。A2-70のようなステンレスだけ規則が違うので値を別に置きます。',
    'Bei 8.8 steht die erste Ziffer für 800 MPa Zugfestigkeit, die zweite sagt, dass die Streckgrenze acht Zehntel davon beträgt — 640 MPa. 12.9 heißt 1200 MPa mit 1080 Streckgrenze. Keine Tabelle nötig: die beiden Ziffern auf dem Kopf sagen es. Nur Edelstahl wie A2-70 folgt einer anderen Regel.',
    'Dans 8.8, le premier chiffre vaut 800 MPa en traction ; le second dit que la limite élastique en fait huit dixièmes — 640 MPa. Un 12.9, c’est 1200 MPa et 1080 de limite. Aucun tableau à consulter : les deux chiffres frappés sur la tête le disent. Seuls les inox comme A2-70 suivent une autre règle.',
    '8.8 में पहला अंक 800 MPa तन्य सामर्थ्य है; दूसरा कहता है कि यील्ड उसका आठ दसवाँ यानी 640 MPa है। 12.9 यानी 1200 MPa और यील्ड 1080। तालिका देखने की ज़रूरत नहीं — सिर पर छपे दो अंक ही बता देते हैं। सिर्फ़ A2-70 जैसे स्टेनलेस अलग नियम पर चलते हैं।',
    '8.8 中，前面的 8 表示抗拉强度 800MPa，后面的 8 表示屈服是抗拉的八成，即 640MPa。12.9 就是 1200MPa、屈服 1080MPa。不用查表，螺栓头上打的两个数字已经说明了。只有 A2-70 这类不锈钢另有规则。',
    '8.8 中，前面的 8 表示抗拉強度 800MPa，後面的 8 表示屈服是抗拉的八成，即 640MPa。12.9 就是 1200MPa、屈服 1080MPa。不用查表，螺栓頭上打的兩個數字已經說明了。只有 A2-70 這類不鏽鋼另有規則。',
  ),

  frictionTitle: T('돌린 힘의 90%는 마찰로 갑니다', 'Nine tenths of the effort goes to friction', 'El 90% del esfuerzo se va en rozamiento', '90% do esforço vai para o atrito', '回した力の90%は摩擦に消えます', 'Neun Zehntel gehen in Reibung', 'Neuf dixièmes de l’effort partent en frottement', 'लगाए बल का 90% घर्षण में जाता है', '拧的力有九成花在摩擦上', '鎖的力有九成花在摩擦上'),

  frictionNote: T(
    '돌린 힘의 절반 가까이가 나사산에서, 또 절반이 머리 밑면에서 마찰로 사라집니다. 볼트를 실제로 늘리는 데 쓰이는 것은 10% 남짓입니다. 그래서 기름을 바르면 같은 축력에 필요한 토크가 25% 줄고, 반대로 건조 기준 토크를 기름칠한 볼트에 그대로 쓰면 25% 과하게 조여집니다.',
    'Roughly half the effort is lost to friction in the threads and another half under the head. Only about a tenth actually stretches the bolt. Oil the thread and the same clamp force needs a quarter less torque — and applying a dry-spec torque to an oiled bolt overtightens it by that same quarter.',
    'Casi la mitad del esfuerzo se pierde en la rosca y otra mitad bajo la cabeza. Solo una décima parte estira realmente el perno. Con aceite, la misma fuerza necesita un cuarto menos de par; y aplicar el par de tabla en seco a un perno engrasado lo aprieta un cuarto de más.',
    'Cerca de metade do esforço se perde na rosca e outra metade sob a cabeça. Só um décimo realmente estica o parafuso. Com óleo, a mesma força pede um quarto a menos de torque; aplicar o torque de tabela a seco num parafuso lubrificado aperta um quarto além.',
    '回した力の半分近くがねじ山で、もう半分が頭の下面で摩擦に消えます。実際にボルトを伸ばすのは1割ほどです。油を差すと同じ軸力に必要なトルクが25%減り、逆に乾燥前提のトルクを油の付いたボルトに使うと25%締めすぎになります。',
    'Etwa die Hälfte geht im Gewinde verloren, eine weitere Hälfte unter dem Kopf. Nur rund ein Zehntel dehnt die Schraube wirklich. Geölt braucht dieselbe Klemmkraft ein Viertel weniger Moment — und ein Trockenwert an einer geölten Schraube zieht genau um dieses Viertel zu fest.',
    'Près de la moitié de l’effort se perd dans le filet, l’autre moitié sous la tête. Un dixième seulement allonge vraiment le boulon. Huilé, le même serrage demande un quart de couple en moins — et appliquer un couple « à sec » sur un boulon huilé serre d’autant trop.',
    'लगभग आधा बल चूड़ी में और बाक़ी आधा सिर के नीचे घर्षण में चला जाता है। बोल्ट को वास्तव में खींचने में केवल दसवाँ हिस्सा लगता है। तेल लगाने पर उतने ही बल के लिए टॉर्क एक चौथाई कम चाहिए — और सूखे का टॉर्क तेल लगे बोल्ट पर लगाएँ तो उतना ही ज़्यादा कस जाता है।',
    '拧的力约有一半消耗在螺纹的摩擦上，另一半消耗在头部支承面，真正拉伸螺栓的只有一成左右。上了油，同样的预紧力所需扭矩少四分之一；反过来，把干态扭矩用在上了油的螺栓上，就会拧过头四分之一。',
    '鎖的力約有一半消耗在螺紋的摩擦上，另一半消耗在頭部支承面，真正拉伸螺栓的只有一成左右。上了油，同樣的預緊力所需扭矩少四分之一；反過來，把乾態扭矩用在上了油的螺栓上，就會鎖過頭四分之一。',
  ),

  preloadTitle: T('항복의 일곱 할까지만 당깁니다', 'We pull to seven tenths of yield', 'Se aprieta hasta siete décimos del límite', 'Aperta-se até sete décimos do escoamento', '降伏の7割までにします', 'Gespannt wird auf sieben Zehntel der Streckgrenze', 'On serre à sept dixièmes de la limite élastique', 'यील्ड के सात दसवें तक ही', '只拉到屈服的七成', '只拉到屈服的七成'),

  preloadNote: T(
    '볼트를 항복까지 당기면 늘어난 채로 돌아오지 않아, 다음에 풀었다 조일 때 같은 힘이 나오지 않습니다. 그래서 널리 쓰는 관행이 항복의 70%입니다. 이 표의 축력도 그 값이고, 토크는 거기서 되짚은 것입니다.',
    'Pull a bolt all the way to yield and it stays stretched, so it will not give the same force the next time it is loosened and retightened. Common practice is therefore 70% of yield. Every clamp force here is that figure, and the torque is worked back from it.',
    'Si aprietas un perno hasta el límite elástico, queda estirado y no dará la misma fuerza al volver a montarlo. La práctica habitual es el 70% del límite. Todas las fuerzas de esta tabla son ese valor, y el par se deduce de ahí.',
    'Se apertar um parafuso até o escoamento, ele fica esticado e não dará a mesma força quando for reapertado. A prática comum é 70% do escoamento. Todas as forças aqui são esse valor, e o torque vem dele.',
    'ボルトを降伏まで引くと伸びたまま戻らず、次に緩めて締め直したとき同じ力が出ません。そこで広く使われる目安が降伏の70%です。この表の軸力もその値で、トルクはそこから逆算しています。',
    'Zieht man eine Schraube bis zur Streckgrenze, bleibt sie gedehnt und liefert beim nächsten Anziehen nicht mehr dieselbe Kraft. Üblich sind darum 70 % der Streckgrenze. Alle Kräfte hier sind dieser Wert, das Moment ist daraus zurückgerechnet.',
    'Serrer un boulon jusqu’à la limite élastique le laisse allongé : il ne redonnera pas la même force au remontage. L’usage courant est donc 70 % de la limite. Toutes les préchages ici valent cela, et le couple en découle.',
    'बोल्ट को यील्ड तक खींचें तो वह खिंचा ही रह जाता है और अगली बार खोलकर कसने पर वही बल नहीं देता। इसलिए प्रचलित व्यवहार यील्ड का 70% है। यहाँ के सभी बल वही हैं, और टॉर्क उसी से निकाला गया है।',
    '把螺栓拉到屈服，它就回不去了，下次拆装再拧也给不出同样的力。所以通行做法是取屈服的 70%。本表的预紧力都是这个值，扭矩由它反推。',
    '把螺栓拉到屈服，它就回不去了，下次拆裝再鎖也給不出同樣的力。所以通行做法是取屈服的 70%。本表的預緊力都是這個值，扭矩由它反推。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '제조사가 정한 토크가 있으면 언제나 그쪽이 먼저입니다. 알루미늄에 박히는 볼트, 개스킷을 누르는 볼트, 풀림 방지제를 바른 볼트는 이 셈과 다르게 잡습니다.',
    'Whenever the manufacturer specifies a torque, that number wins. Bolts into aluminium, bolts squeezing a gasket and bolts with thread locker are all set differently from this calculation.',
    'Si el fabricante especifica un par, ese manda. Los pernos en aluminio, los que aprietan una junta y los que llevan fijador de roscas se ajustan de otra forma.',
    'Se o fabricante especifica um torque, é ele que vale. Parafusos em alumínio, os que comprimem junta e os com trava-rosca são ajustados de outra forma.',
    'メーカーが定めたトルクがあるなら必ずそちらが先です。アルミにねじ込むボルト、ガスケットを押さえるボルト、ねじロック剤を塗ったボルトはこの計算とは別に決めます。',
    'Gibt der Hersteller ein Moment vor, gilt dieses. Schrauben in Aluminium, Schrauben auf Dichtungen und Schrauben mit Schraubensicherung werden anders angezogen als hier gerechnet.',
    'Si le fabricant indique un couple, c’est lui qui prime. Les vis dans l’aluminium, celles qui écrasent un joint et celles au frein-filet se serrent autrement que dans ce calcul.',
    'यदि निर्माता ने टॉर्क बताया है तो वही मान्य है। एल्युमिनियम में लगने वाले, गैस्केट दबाने वाले और थ्रेड लॉकर लगे बोल्ट इस गणना से अलग कसे जाते हैं।',
    '只要厂家给了扭矩值，就以厂家为准。拧进铝件的、压密封垫的、涂了螺纹胶的螺栓，都与这里的算法不同。',
    '只要廠家給了扭矩值，就以廠家為準。鎖進鋁件的、壓密封墊的、塗了螺紋膠的螺栓，都與這裡的算法不同。',
  ),

  tableTitle: T('볼트와 등급으로 찾기', 'Find it by size and grade', 'Búscalo por diámetro y grado', 'Ache por diâmetro e classe', 'ボルトと等級から探す', 'Nach Größe und Klasse suchen', 'Chercher par diamètre et classe', 'आकार और ग्रेड से देखें', '按螺栓和等级查找', '按螺栓和等級查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  gradeRowTitle: T('같은 볼트, 다른 등급', 'Same bolt, other grades', 'Mismo perno, otros grados', 'Mesmo parafuso, outras classes', '同じボルト、別の等級', 'Gleiche Schraube, andere Klassen', 'Même boulon, autres classes', 'वही बोल्ट, दूसरे ग्रेड', '同一螺栓，不同等级', '同一螺栓，不同等級'),
  sizeRowTitle: T('같은 등급, 다른 볼트', 'Same grade, other bolts', 'Mismo grado, otros pernos', 'Mesma classe, outros parafusos', '同じ等級、別のボルト', 'Gleiche Klasse, andere Schrauben', 'Même classe, autres boulons', 'वही ग्रेड, दूसरे बोल्ट', '同一等级，不同螺栓', '同一等級，不同螺栓'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '토크는 볼트를 돌리는 힘이고, 원하는 것은 볼트가 늘어나며 내는 축력입니다.',
      '나사면이 미끄러울수록 같은 축력에 필요한 토크가 줄어듭니다 — 상태를 골라 보십시오.',
      '축력은 항복의 70%로 잡았습니다. 제조사 값이 있으면 그쪽을 따릅니다.',
      '굵은 나사 기준입니다. 가는 나사는 단면적이 조금 커서 값이 달라집니다.',
    ],
    [
      'Torque turns the bolt; what you want is the clamp force the stretched bolt provides.',
      'The slipperier the thread, the less torque the same clamp force needs — pick the condition you have.',
      'Clamp force is set at 70% of yield. A manufacturer figure always wins over this one.',
      'These are coarse threads. A fine thread has slightly more area, so its numbers differ.',
    ],
    [
      'El par gira el perno; lo que buscas es la fuerza de apriete que da el perno estirado.',
      'Cuanto más resbala la rosca, menos par hace falta para la misma fuerza: elige tu condición.',
      'La fuerza se fija en el 70% del límite elástico. Si el fabricante da un valor, ese manda.',
      'Son roscas gruesas. Una rosca fina tiene algo más de sección y cambia los números.',
    ],
    [
      'O torque gira o parafuso; o que você quer é a força de aperto que o parafuso esticado dá.',
      'Quanto mais escorregadia a rosca, menos torque a mesma força exige — escolha a sua condição.',
      'A força é fixada em 70% do escoamento. Um valor do fabricante sempre prevalece.',
      'São roscas grossas. Uma rosca fina tem um pouco mais de seção e muda os números.',
    ],
    [
      'トルクはボルトを回す力で、欲しいのは伸びたボルトが出す軸力です。',
      'ねじ面が滑るほど同じ軸力に必要なトルクは減ります。状態を選んでください。',
      '軸力は降伏の70%としています。メーカーの値があればそちらが優先です。',
      '並目ねじが前提です。細目は断面積が少し大きく、値が変わります。',
    ],
    [
      'Das Moment dreht die Schraube; gewollt ist die Klemmkraft der gedehnten Schraube.',
      'Je glatter das Gewinde, desto weniger Moment braucht dieselbe Klemmkraft — Zustand auswählen.',
      'Die Klemmkraft liegt bei 70 % der Streckgrenze. Herstellerangaben gehen immer vor.',
      'Es gilt Regelgewinde. Feingewinde hat etwas mehr Fläche und damit andere Werte.',
    ],
    [
      'Le couple fait tourner le boulon ; ce que l’on veut, c’est la précharge du boulon allongé.',
      'Plus le filet glisse, moins il faut de couple pour la même précharge — choisissez votre cas.',
      'La précharge est fixée à 70 % de la limite élastique. Une valeur constructeur prime toujours.',
      'Ce sont des pas gros. Un pas fin offre un peu plus de section et change les chiffres.',
    ],
    [
      'टॉर्क बोल्ट को घुमाता है; चाहिए वह क्लैम्प बल जो खिंचा हुआ बोल्ट देता है।',
      'चूड़ी जितनी चिकनी, उतने ही कम टॉर्क में वही बल — अपनी स्थिति चुनें।',
      'क्लैम्प बल यील्ड का 70% रखा गया है। निर्माता का मान हमेशा ऊपर रहता है।',
      'ये मोटी चूड़ियाँ हैं। बारीक चूड़ी का क्षेत्रफल थोड़ा अधिक होता है, इसलिए मान बदलते हैं।',
    ],
    [
      '扭矩是拧螺栓的力，真正要的是螺栓被拉长后产生的预紧力。',
      '螺纹越滑，同样预紧力所需的扭矩越小——请按实际状态选择。',
      '预紧力取屈服的 70%。厂家给的值永远优先于此。',
      '这里按粗牙计算。细牙截面积略大，数值会有所不同。',
    ],
    [
      '扭矩是鎖螺栓的力，真正要的是螺栓被拉長後產生的預緊力。',
      '螺紋越滑，同樣預緊力所需的扭矩越小——請按實際狀態選擇。',
      '預緊力取屈服的 70%。廠家給的值永遠優先於此。',
      '這裡按粗牙計算。細牙截面積略大，數值會有所不同。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '볼트 조임 토크표 — M3부터 M36까지, 등급 8가지',
    'Bolt torque chart — M3 to M36 across 8 grades',
    'Tabla de pares de apriete — de M3 a M36 en 8 grados',
    'Tabela de torque — de M3 a M36 em 8 classes',
    'ボルト締め付けトルク表 — M3からM36、等級8種',
    'Anzugsmoment-Tabelle — M3 bis M36 in 8 Klassen',
    'Tableau des couples de serrage — M3 à M36, 8 classes',
    'बोल्ट टॉर्क चार्ट — M3 से M36, 8 ग्रेड',
    '螺栓拧紧扭矩表 — M3 到 M36，8 个等级',
    '螺栓鎖緊扭矩表 — M3 到 M36，8 個等級',
  ),

  hubMetaDesc: T(
    'M8 8.8은 건조 기준 26N·m, 기름을 바르면 20N·m입니다. 볼트 19가지와 등급 8가지가 만나는 152칸마다 목표 축력과 조임 토크를 계산했습니다.',
    'An M8 in grade 8.8 takes 26 N·m dry, 20 N·m oiled. Target clamp force and tightening torque for all 152 pairings of 19 bolt sizes and 8 grades.',
    'Un M8 de grado 8.8 pide 26 N·m en seco y 20 N·m engrasado. Fuerza objetivo y par para los 152 cruces de 19 diámetros y 8 grados.',
    'Um M8 classe 8.8 pede 26 N·m a seco e 20 N·m lubrificado. Força alvo e torque para os 152 cruzamentos de 19 diâmetros e 8 classes.',
    'M8の8.8は乾燥で26N·m、油を差すと20N·mです。ボルト19通りと等級8通りが出会う152マスの目標軸力と締め付けトルクを計算しました。',
    'Ein M8 in 8.8 braucht trocken 26 N·m, geölt 20 N·m. Zielvorspannkraft und Anzugsmoment für alle 152 Kombinationen aus 19 Größen und 8 Klassen.',
    'Un M8 en 8.8 demande 26 N·m à sec, 20 N·m huilé. Précharge visée et couple pour les 152 croisements de 19 diamètres et 8 classes.',
    '8.8 ग्रेड का M8 सूखे में 26 N·m और तेल लगे पर 20 N·m लेता है। 19 आकार और 8 ग्रेड के सभी 152 मेलों का लक्ष्य बल और टॉर्क।',
    '8.8 级 M8 干态需 26N·m，上油后 20N·m。19 种螺栓与 8 个等级交汇的 152 格，每格的目标预紧力与拧紧扭矩。',
    '8.8 級 M8 乾態需 26N·m，上油後 20N·m。19 種螺栓與 8 個等級交匯的 152 格，每格的目標預緊力與鎖緊扭矩。',
  ),

  desc: T<(f: TorqueFacts) => string>(
    f => `단면적 ${f.area}mm²에 항복 ${f.yieldStrength}MPa이라, 목표 축력은 ${f.preload}N입니다. 그만큼 늘리려고 돌리는 값이 이 토크입니다.`,
    f => `${f.area} mm² of thread at ${f.yieldStrength} MPa yield gives a target clamp force of ${f.preload} N. The torque here is what it takes to produce that stretch.`,
    f => `${f.area} mm² de sección con un límite de ${f.yieldStrength} MPa dan una fuerza objetivo de ${f.preload} N. El par es lo que cuesta producir ese estiramiento.`,
    f => `${f.area} mm² de seção com escoamento de ${f.yieldStrength} MPa dão uma força alvo de ${f.preload} N. O torque é o que custa produzir esse esticamento.`,
    f => `断面積${f.area}mm²、降伏${f.yieldStrength}MPaなので目標軸力は${f.preload}Nです。それだけ伸ばすために回す値がこのトルクです。`,
    f => `${f.area} mm² Querschnitt bei ${f.yieldStrength} MPa Streckgrenze ergeben ${f.preload} N Zielvorspannkraft. Das Moment ist, was diese Dehnung kostet.`,
    f => `${f.area} mm² de section à ${f.yieldStrength} MPa de limite donnent une précharge visée de ${f.preload} N. Le couple, c’est ce qu’il faut pour produire cet allongement.`,
    f => `${f.area} mm² क्षेत्रफल और ${f.yieldStrength} MPa यील्ड से लक्ष्य क्लैम्प बल ${f.preload} N बनता है। उतना खींचने के लिए जो घुमाना पड़ता है, वही यह टॉर्क है।`,
    f => `截面积 ${f.area}mm²、屈服 ${f.yieldStrength}MPa，目标预紧力为 ${f.preload}N。这里的扭矩就是制造这个伸长所需要的。`,
    f => `截面積 ${f.area}mm²、屈服 ${f.yieldStrength}MPa，目標預緊力為 ${f.preload}N。這裡的扭矩就是製造這個伸長所需要的。`,
  ),

  metaTitle: T<(f: TorqueFacts) => string>(
    f => `${f.label} 조임 토크 — ${f.turns[1].nm}N·m`,
    f => `${f.label} tightening torque — ${f.turns[1].nm} N·m`,
    f => `Par de apriete de ${f.label} — ${f.turns[1].nm} N·m`,
    f => `Torque de aperto de ${f.label} — ${f.turns[1].nm} N·m`,
    f => `${f.label}の締め付けトルク — ${f.turns[1].nm}N·m`,
    f => `Anzugsmoment ${f.label} — ${f.turns[1].nm} N·m`,
    f => `Couple de serrage ${f.label} — ${f.turns[1].nm} N·m`,
    f => `${f.label} कसने का टॉर्क — ${f.turns[1].nm} N·m`,
    f => `${f.label} 拧紧扭矩 — ${f.turns[1].nm}N·m`,
    f => `${f.label} 鎖緊扭矩 — ${f.turns[1].nm}N·m`,
  ),

  metaDesc: T<(f: TorqueFacts) => string>(
    f => `${f.label} 볼트는 기름기 없는 상태에서 ${f.turns[1].nm}N·m, 기름을 바르면 ${f.turns[2].nm}N·m로 조입니다. 목표 축력 ${f.preload}N, kgf·m로는 ${f.kgfm}입니다.`,
    f => `A ${f.label} bolt takes ${f.turns[1].nm} N·m dry and ${f.turns[2].nm} N·m oiled. Target clamp force ${f.preload} N, or ${f.kgfm} kgf·m in the older unit.`,
    f => `Un perno ${f.label} pide ${f.turns[1].nm} N·m en seco y ${f.turns[2].nm} N·m engrasado. Fuerza objetivo ${f.preload} N, o ${f.kgfm} kgf·m.`,
    f => `Um parafuso ${f.label} pede ${f.turns[1].nm} N·m a seco e ${f.turns[2].nm} N·m lubrificado. Força alvo ${f.preload} N, ou ${f.kgfm} kgf·m.`,
    f => `${f.label}のボルトは油気のない状態で${f.turns[1].nm}N·m、油を差すと${f.turns[2].nm}N·mで締めます。目標軸力${f.preload}N、kgf·mでは${f.kgfm}です。`,
    f => `Eine ${f.label}-Schraube wird trocken mit ${f.turns[1].nm} N·m, geölt mit ${f.turns[2].nm} N·m angezogen. Zielvorspannkraft ${f.preload} N bzw. ${f.kgfm} kgf·m.`,
    f => `Un boulon ${f.label} se serre à ${f.turns[1].nm} N·m à sec et ${f.turns[2].nm} N·m huilé. Précharge visée ${f.preload} N, soit ${f.kgfm} kgf·m.`,
    f => `${f.label} बोल्ट सूखे में ${f.turns[1].nm} N·m और तेल लगे पर ${f.turns[2].nm} N·m पर कसा जाता है। लक्ष्य बल ${f.preload} N, यानी ${f.kgfm} kgf·m।`,
    f => `${f.label} 螺栓干态拧到 ${f.turns[1].nm}N·m，上油后 ${f.turns[2].nm}N·m。目标预紧力 ${f.preload}N，合 ${f.kgfm} kgf·m。`,
    f => `${f.label} 螺栓乾態鎖到 ${f.turns[1].nm}N·m，上油後 ${f.turns[2].nm}N·m。目標預緊力 ${f.preload}N，合 ${f.kgfm} kgf·m。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'M8 볼트는 몇 N·m로 조이나요?', a: '8.8 등급이면 기름기 없는 상태에서 26N·m입니다. 기름을 발랐다면 20N·m로 낮춰야 같은 축력이 됩니다.' },
      { q: '8.8이라는 숫자는 무슨 뜻인가요?', a: '앞의 8은 인장강도 800MPa, 뒤의 8은 항복이 그 8할인 640MPa이라는 뜻입니다. 볼트 머리에 찍혀 있습니다.' },
      { q: '기름을 바르면 토크를 줄여야 하나요?', a: '줄여야 합니다. 마찰이 낮아진 만큼 같은 토크로 더 세게 당겨져, 건조 기준 값을 그대로 쓰면 25%쯤 과하게 조여집니다.' },
      { q: '토크렌치가 없으면 어떻게 하나요?', a: '정확한 대체 방법은 없습니다. 다만 이 표의 축력과 등급을 알면 얼마나 위험한 조임인지 가늠할 수는 있습니다.' },
      { q: '스테인리스 볼트도 같은 표를 쓰나요?', a: '쓰지 않습니다. A2-70은 인장 700MPa에 항복 450MPa이라 강도 규칙이 다르고, 눌어붙기 쉬워 윤활을 함께 봅니다.' },
    ],
    [
      { q: 'What torque does an M8 bolt take?', a: '26 N·m in grade 8.8, dry. Oiled, drop it to 20 N·m to reach the same clamp force.' },
      { q: 'What does the number 8.8 mean?', a: 'The first 8 is 800 MPa tensile strength; the second says yield is eight tenths of that, 640 MPa. It is stamped on the head.' },
      { q: 'Should I lower the torque if the thread is oiled?', a: 'Yes. Less friction means the same torque pulls harder, so a dry-spec figure overtightens an oiled bolt by roughly a quarter.' },
      { q: 'What if I have no torque wrench?', a: 'There is no accurate substitute. Knowing the clamp force and grade at least tells you how far off a guess would be.' },
      { q: 'Do stainless bolts use the same table?', a: 'No. A2-70 is 700 MPa tensile with 450 MPa yield, a different rule, and it galls easily so lubrication matters more.' },
    ],
    [
      { q: '¿Con qué par se aprieta un M8?', a: '26 N·m en grado 8.8 y en seco. Engrasado, baja a 20 N·m para lograr la misma fuerza.' },
      { q: '¿Qué significa el número 8.8?', a: 'El primer 8 son 800 MPa de tracción; el segundo dice que el límite elástico es ocho décimos, 640 MPa. Va grabado en la cabeza.' },
      { q: '¿Hay que bajar el par si la rosca está engrasada?', a: 'Sí. Con menos rozamiento el mismo par estira más, así que un valor en seco aprieta un cuarto de más un perno engrasado.' },
      { q: '¿Y si no tengo llave dinamométrica?', a: 'No hay sustituto exacto. Saber la fuerza y el grado al menos indica cuánto se desvía una estimación.' },
      { q: '¿Los pernos inoxidables usan la misma tabla?', a: 'No. El A2-70 tiene 700 MPa de tracción y 450 de límite, otra regla, y se agarrota con facilidad, así que la lubricación pesa más.' },
    ],
    [
      { q: 'Com que torque se aperta um M8?', a: '26 N·m na classe 8.8, a seco. Lubrificado, baixe para 20 N·m para chegar à mesma força.' },
      { q: 'O que significa o número 8.8?', a: 'O primeiro 8 são 800 MPa de tração; o segundo diz que o escoamento é oito décimos, 640 MPa. Vem gravado na cabeça.' },
      { q: 'Devo reduzir o torque se a rosca estiver lubrificada?', a: 'Sim. Com menos atrito o mesmo torque estica mais, então um valor a seco aperta um quarto além num parafuso lubrificado.' },
      { q: 'E se eu não tiver torquímetro?', a: 'Não há substituto exato. Saber a força e a classe pelo menos mostra o quanto um chute erraria.' },
      { q: 'Parafusos inox usam a mesma tabela?', a: 'Não. O A2-70 tem 700 MPa de tração e 450 de escoamento, regra diferente, e agarra com facilidade, então a lubrificação pesa mais.' },
    ],
    [
      { q: 'M8のボルトは何N·mで締めますか？', a: '8.8等級なら油気のない状態で26N·mです。油を差してあるなら20N·mに下げると同じ軸力になります。' },
      { q: '8.8という数字は何を意味しますか？', a: '前の8は引張強さ800MPa、後ろの8は降伏がその8割で640MPaという意味です。ボルト頭に刻まれています。' },
      { q: '油を差したらトルクを下げるべきですか？', a: '下げるべきです。摩擦が減った分だけ同じトルクで強く引かれるので、乾燥前提の値をそのまま使うと25%ほど締めすぎになります。' },
      { q: 'トルクレンチが無いときは？', a: '正確な代わりはありません。ただ軸力と等級を知っていれば、勘で締めたときのずれ幅は見当がつきます。' },
      { q: 'ステンレスボルトも同じ表ですか？', a: '違います。A2-70は引張700MPaに降伏450MPaで規則が異なり、かじりやすいので潤滑も併せて見ます。' },
    ],
    [
      { q: 'Mit welchem Moment zieht man eine M8 an?', a: 'Mit 26 N·m in 8.8, trocken. Geölt sind es 20 N·m für dieselbe Klemmkraft.' },
      { q: 'Was bedeutet die Zahl 8.8?', a: 'Die erste 8 steht für 800 MPa Zugfestigkeit, die zweite für eine Streckgrenze von acht Zehnteln davon, 640 MPa. Sie steht auf dem Kopf.' },
      { q: 'Muss ich bei geöltem Gewinde weniger anziehen?', a: 'Ja. Weniger Reibung heißt: dasselbe Moment zieht stärker. Ein Trockenwert überzieht eine geölte Schraube um rund ein Viertel.' },
      { q: 'Und ohne Drehmomentschlüssel?', a: 'Es gibt keinen genauen Ersatz. Immerhin zeigen Klemmkraft und Klasse, wie weit ein Schätzwert danebenläge.' },
      { q: 'Gilt die Tabelle auch für Edelstahl?', a: 'Nein. A2-70 hat 700 MPa Zugfestigkeit bei 450 MPa Streckgrenze — andere Regel — und neigt zum Fressen, weshalb Schmierung mehr zählt.' },
    ],
    [
      { q: 'À quel couple serrer un M8 ?', a: '26 N·m en classe 8.8, à sec. Huilé, descendez à 20 N·m pour la même précharge.' },
      { q: 'Que signifie le nombre 8.8 ?', a: 'Le premier 8 vaut 800 MPa en traction ; le second indique une limite élastique de huit dixièmes, soit 640 MPa. C’est frappé sur la tête.' },
      { q: 'Faut-il baisser le couple si le filet est huilé ?', a: 'Oui. Moins de frottement, donc le même couple tire plus fort : une valeur « à sec » serre un boulon huilé d’un quart de trop.' },
      { q: 'Et sans clé dynamométrique ?', a: 'Il n’existe pas de substitut exact. Connaître la précharge et la classe indique au moins l’ampleur de l’erreur possible.' },
      { q: 'Les boulons inox suivent-ils le même tableau ?', a: 'Non. L’A2-70 fait 700 MPa en traction pour 450 de limite — autre règle — et grippe facilement, d’où l’importance du lubrifiant.' },
    ],
    [
      { q: 'M8 बोल्ट कितने N·m पर कसें?', a: '8.8 ग्रेड में सूखे पर 26 N·m। तेल लगा हो तो उतने ही बल के लिए 20 N·m तक घटाएँ।' },
      { q: '8.8 संख्या का क्या अर्थ है?', a: 'पहला 8 यानी 800 MPa तन्य सामर्थ्य; दूसरा कहता है यील्ड उसका आठ दसवाँ, 640 MPa। यह सिर पर छपा होता है।' },
      { q: 'चूड़ी पर तेल हो तो टॉर्क घटाना चाहिए?', a: 'हाँ। घर्षण घटने से उतना ही टॉर्क अधिक खींचता है, इसलिए सूखे का मान तेल लगे बोल्ट को लगभग एक चौथाई ज़्यादा कस देता है।' },
      { q: 'टॉर्क रिंच न हो तो?', a: 'कोई सटीक विकल्प नहीं है। पर बल और ग्रेड जानने से अंदाज़े की चूक कितनी बड़ी होगी, यह पता चल जाता है।' },
      { q: 'क्या स्टेनलेस बोल्ट पर यही तालिका चलती है?', a: 'नहीं। A2-70 में तन्य 700 MPa और यील्ड 450 MPa है — नियम अलग है — और यह आसानी से जाम होता है, इसलिए स्नेहन ज़्यादा मायने रखता है।' },
    ],
    [
      { q: 'M8 螺栓拧多少 N·m？', a: '8.8 级干态 26N·m。若上了油，要降到 20N·m 才能得到同样的预紧力。' },
      { q: '8.8 这个数字是什么意思？', a: '前面的 8 是抗拉强度 800MPa，后面的 8 表示屈服是它的八成，即 640MPa。这两个数打在螺栓头上。' },
      { q: '上了油要不要减小扭矩？', a: '要。摩擦变小，同样的扭矩会拉得更紧，照搬干态数值会把上油的螺栓拧过头约四分之一。' },
      { q: '没有扭力扳手怎么办？', a: '没有精确的替代办法。但知道预紧力和等级，至少能判断凭手感会偏差多少。' },
      { q: '不锈钢螺栓也用这张表吗？', a: '不用。A2-70 抗拉 700MPa、屈服 450MPa，规则不同，而且容易咬死，所以更要看润滑。' },
    ],
    [
      { q: 'M8 螺栓鎖多少 N·m？', a: '8.8 級乾態 26N·m。若上了油，要降到 20N·m 才能得到同樣的預緊力。' },
      { q: '8.8 這個數字是什麼意思？', a: '前面的 8 是抗拉強度 800MPa，後面的 8 表示屈服是它的八成，即 640MPa。這兩個數打在螺栓頭上。' },
      { q: '上了油要不要減小扭矩？', a: '要。摩擦變小，同樣的扭矩會拉得更緊，照搬乾態數值會把上油的螺栓鎖過頭約四分之一。' },
      { q: '沒有扭力扳手怎麼辦？', a: '沒有精確的替代辦法。但知道預緊力和等級，至少能判斷憑手感會偏差多少。' },
      { q: '不鏽鋼螺栓也用這張表嗎？', a: '不用。A2-70 抗拉 700MPa、屈服 450MPa，規則不同，而且容易咬死，所以更要看潤滑。' },
    ],
  ),

  cellFaq: T<(f: TorqueFacts) => FaqItem[]>(
    f => [
      { q: `${f.label} 볼트는 몇 N·m로 조이나요?`, a: `기름기 없는 상태에서 ${f.turns[1].nm}N·m입니다. kgf·m로는 ${f.kgfm}, lb-ft로는 ${f.lbft}입니다.` },
      { q: `기름을 발랐다면 얼마로 조이나요?`, a: `${f.turns[2].nm}N·m입니다. 마찰이 낮아진 만큼 낮춰야 축력이 같아집니다.` },
      { q: `이 볼트는 얼마나 세게 무나요?`, a: `목표 축력이 ${f.preload}N입니다. 끊어지는 힘은 ${f.breaking}N이라, 그 ${Math.round((f.preload / f.breaking) * 100)}% 지점에서 멈추는 셈입니다.` },
      { q: `${f.grade.label} 등급은 얼마나 강한가요?`, a: `인장 ${f.tensile}MPa, 항복 ${f.yieldStrength}MPa입니다. 단면적 ${f.area}mm²를 곱하면 이 볼트가 버티는 힘이 나옵니다.` },
    ],
    f => [
      { q: `What torque does a ${f.label} bolt take?`, a: `${f.turns[1].nm} N·m dry — ${f.kgfm} kgf·m, or ${f.lbft} lb-ft.` },
      { q: `And if the thread is oiled?`, a: `${f.turns[2].nm} N·m. Lower friction means lower torque for the same clamp force.` },
      { q: `How hard does this bolt actually bite?`, a: `The target clamp force is ${f.preload} N. It breaks at ${f.breaking} N, so you stop at ${Math.round((f.preload / f.breaking) * 100)}% of that.` },
      { q: `How strong is grade ${f.grade.label}?`, a: `${f.tensile} MPa tensile, ${f.yieldStrength} MPa yield. Multiply by the ${f.area} mm² of thread and you have what this bolt can hold.` },
    ],
    f => [
      { q: `¿Con qué par se aprieta un ${f.label}?`, a: `${f.turns[1].nm} N·m en seco — ${f.kgfm} kgf·m, o ${f.lbft} lb-ft.` },
      { q: `¿Y si la rosca está engrasada?`, a: `${f.turns[2].nm} N·m. Menos rozamiento, menos par para la misma fuerza.` },
      { q: `¿Con cuánta fuerza muerde este perno?`, a: `La fuerza objetivo es ${f.preload} N. Rompe a ${f.breaking} N, así que te detienes en el ${Math.round((f.preload / f.breaking) * 100)}% de eso.` },
      { q: `¿Qué resistencia tiene el grado ${f.grade.label}?`, a: `${f.tensile} MPa de tracción y ${f.yieldStrength} MPa de límite. Multiplica por los ${f.area} mm² de sección y tienes lo que aguanta.` },
    ],
    f => [
      { q: `Com que torque se aperta um ${f.label}?`, a: `${f.turns[1].nm} N·m a seco — ${f.kgfm} kgf·m, ou ${f.lbft} lb-ft.` },
      { q: `E se a rosca estiver lubrificada?`, a: `${f.turns[2].nm} N·m. Menos atrito, menos torque para a mesma força.` },
      { q: `Com quanta força este parafuso morde?`, a: `A força alvo é ${f.preload} N. Ele rompe a ${f.breaking} N, então você para em ${Math.round((f.preload / f.breaking) * 100)}% disso.` },
      { q: `Quão forte é a classe ${f.grade.label}?`, a: `${f.tensile} MPa de tração e ${f.yieldStrength} MPa de escoamento. Multiplique pelos ${f.area} mm² de seção e tem o que ele aguenta.` },
    ],
    f => [
      { q: `${f.label}のボルトは何N·mで締めますか？`, a: `油気のない状態で${f.turns[1].nm}N·mです。kgf·mでは${f.kgfm}、lb-ftでは${f.lbft}です。` },
      { q: `油を差してある場合は？`, a: `${f.turns[2].nm}N·mです。摩擦が下がった分だけ下げると軸力が同じになります。` },
      { q: `このボルトはどれだけ強く噛みますか？`, a: `目標軸力は${f.preload}Nです。破断は${f.breaking}Nなので、その${Math.round((f.preload / f.breaking) * 100)}%で止める形になります。` },
      { q: `${f.grade.label}等級はどれくらい強いですか？`, a: `引張${f.tensile}MPa、降伏${f.yieldStrength}MPaです。断面積${f.area}mm²を掛けるとこのボルトが耐える力が出ます。` },
    ],
    f => [
      { q: `Mit welchem Moment zieht man ${f.label} an?`, a: `${f.turns[1].nm} N·m trocken — ${f.kgfm} kgf·m bzw. ${f.lbft} lb-ft.` },
      { q: `Und bei geöltem Gewinde?`, a: `${f.turns[2].nm} N·m. Weniger Reibung, weniger Moment für dieselbe Klemmkraft.` },
      { q: `Wie fest greift diese Schraube?`, a: `Die Zielvorspannkraft beträgt ${f.preload} N. Gerissen wird bei ${f.breaking} N — man hält also bei ${Math.round((f.preload / f.breaking) * 100)} % davon.` },
      { q: `Wie stark ist Klasse ${f.grade.label}?`, a: `${f.tensile} MPa Zugfestigkeit, ${f.yieldStrength} MPa Streckgrenze. Mal ${f.area} mm² Querschnitt ergibt, was diese Schraube hält.` },
    ],
    f => [
      { q: `À quel couple serrer un ${f.label} ?`, a: `${f.turns[1].nm} N·m à sec — ${f.kgfm} kgf·m, ou ${f.lbft} lb-ft.` },
      { q: `Et si le filet est huilé ?`, a: `${f.turns[2].nm} N·m. Moins de frottement, moins de couple pour la même précharge.` },
      { q: `Avec quelle force ce boulon mord-il ?`, a: `La précharge visée est de ${f.preload} N. Il casse à ${f.breaking} N : on s’arrête donc à ${Math.round((f.preload / f.breaking) * 100)} % de cette valeur.` },
      { q: `Quelle est la solidité de la classe ${f.grade.label} ?`, a: `${f.tensile} MPa en traction, ${f.yieldStrength} MPa de limite. Multipliez par les ${f.area} mm² de section pour savoir ce qu’il tient.` },
    ],
    f => [
      { q: `${f.label} बोल्ट कितने N·m पर कसें?`, a: `सूखे पर ${f.turns[1].nm} N·m — यानी ${f.kgfm} kgf·m या ${f.lbft} lb-ft।` },
      { q: `और अगर चूड़ी पर तेल हो?`, a: `${f.turns[2].nm} N·m। घर्षण कम, तो उतने ही बल के लिए टॉर्क भी कम।` },
      { q: `यह बोल्ट कितनी ज़ोर से पकड़ता है?`, a: `लक्ष्य क्लैम्प बल ${f.preload} N है। यह ${f.breaking} N पर टूटता है, यानी आप उसके ${Math.round((f.preload / f.breaking) * 100)}% पर रुकते हैं।` },
      { q: `${f.grade.label} ग्रेड कितना मज़बूत है?`, a: `तन्य ${f.tensile} MPa, यील्ड ${f.yieldStrength} MPa। ${f.area} mm² क्षेत्रफल से गुणा करें तो पता चलता है यह बोल्ट कितना सह सकता है।` },
    ],
    f => [
      { q: `${f.label} 螺栓拧多少 N·m？`, a: `干态 ${f.turns[1].nm}N·m，合 ${f.kgfm} kgf·m 或 ${f.lbft} lb-ft。` },
      { q: `如果螺纹上了油呢？`, a: `${f.turns[2].nm}N·m。摩擦小了，同样的预紧力所需扭矩也小。` },
      { q: `这颗螺栓咬得有多紧？`, a: `目标预紧力 ${f.preload}N。它在 ${f.breaking}N 时断裂，也就是停在其 ${Math.round((f.preload / f.breaking) * 100)}% 处。` },
      { q: `${f.grade.label} 级有多强？`, a: `抗拉 ${f.tensile}MPa，屈服 ${f.yieldStrength}MPa。乘上 ${f.area}mm² 的截面积，就是这颗螺栓能承受的力。` },
    ],
    f => [
      { q: `${f.label} 螺栓鎖多少 N·m？`, a: `乾態 ${f.turns[1].nm}N·m，合 ${f.kgfm} kgf·m 或 ${f.lbft} lb-ft。` },
      { q: `如果螺紋上了油呢？`, a: `${f.turns[2].nm}N·m。摩擦小了，同樣的預緊力所需扭矩也小。` },
      { q: `這顆螺栓咬得有多緊？`, a: `目標預緊力 ${f.preload}N。它在 ${f.breaking}N 時斷裂，也就是停在其 ${Math.round((f.preload / f.breaking) * 100)}% 處。` },
      { q: `${f.grade.label} 級有多強？`, a: `抗拉 ${f.tensile}MPa，屈服 ${f.yieldStrength}MPa。乘上 ${f.area}mm² 的截面積，就是這顆螺栓能承受的力。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const TORQUE_UI: L<TorqueUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<TorqueUI>;
