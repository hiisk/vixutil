/**
 * 천체별 몸무게 화면의 문구 — 열 언어.
 *
 * 이 표가 계속 짚는 것은 질량과 무게의 차이다. 몸이 가진 물질의 양은 어디서나
 * 같고, 달라지는 것은 그 물질을 끌어당기는 힘이다. "달에서 몸무게가 6분의 1"은
 * 저울 눈금 이야기이지 몸이 가벼워졌다는 뜻이 아니다.
 *
 * 천체 이름은 언어마다 다르다. 한자문화권은 화성·목성처럼 오행에서 왔고,
 * 유럽 언어는 로마 신 이름에서 왔다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { GravityFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface GravityUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  bodyName: (key: string) => string;
  weightLabel: string;
  gravityLabel: string;
  ratioLabel: string;
  scaleLabel: string;
  newtonLabel: string;
  massTitle: string;
  massNote: string;
  jumpTitle: string;
  jumpNote: string;
  heavyTitle: string;
  heavyNote: string;
  gasTitle: string;
  gasNote: string;
  allTitle: string;
  neighbourTitle: string;
  desc: (f: GravityFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: GravityFacts) => string;
  metaDesc: (f: GravityFacts) => string;
  hubFaq: FaqItem[];
  gravityFaq: (f: GravityFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 천체 이름 — 열한 개를 한 줄로 받는다 */
const body = (...names: string[]) => (key: string): string => {
  const keys = ['sun', 'mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];
  const i = keys.indexOf(key);
  return i >= 0 ? names[i] : key;
};

type Spec = { [K in keyof GravityUI]: L<GravityUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('천체별 몸무게', 'Weight on other worlds', 'Peso en otros mundos', 'Peso em outros mundos', '天体別の体重', 'Gewicht auf anderen Welten', 'Poids sur d’autres mondes', 'अन्य लोकों पर वज़न', '各天体上的体重', '各天體上的體重'),

  bodyName: T<(key: string) => string>(
    body('태양', '수성', '금성', '지구', '달', '화성', '목성', '토성', '천왕성', '해왕성', '명왕성'),
    body('the Sun', 'Mercury', 'Venus', 'Earth', 'the Moon', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'),
    body('el Sol', 'Mercurio', 'Venus', 'la Tierra', 'la Luna', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Neptuno', 'Plutón'),
    body('o Sol', 'Mercúrio', 'Vênus', 'a Terra', 'a Lua', 'Marte', 'Júpiter', 'Saturno', 'Urano', 'Netuno', 'Plutão'),
    body('太陽', '水星', '金星', '地球', '月', '火星', '木星', '土星', '天王星', '海王星', '冥王星'),
    body('die Sonne', 'Merkur', 'Venus', 'die Erde', 'der Mond', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptun', 'Pluto'),
    body('le Soleil', 'Mercure', 'Vénus', 'la Terre', 'la Lune', 'Mars', 'Jupiter', 'Saturne', 'Uranus', 'Neptune', 'Pluton'),
    body('सूर्य', 'बुध', 'शुक्र', 'पृथ्वी', 'चंद्रमा', 'मंगल', 'बृहस्पति', 'शनि', 'अरुण', 'वरुण', 'यम'),
    body('太阳', '水星', '金星', '地球', '月球', '火星', '木星', '土星', '天王星', '海王星', '冥王星'),
    body('太陽', '水星', '金星', '地球', '月球', '火星', '木星', '土星', '天王星', '海王星', '冥王星'),
  ),

  hubTitle: T(
    '천체별 몸무게 101가지 — 30kg부터 130kg까지',
    '101 body weights — how they read on other worlds',
    '101 pesos — cómo se leen en otros mundos',
    '101 pesos — como aparecem em outros mundos',
    '天体別の体重101種 — 30kgから130kgまで',
    '101 Körpergewichte — was die Waage anderswo zeigt',
    '101 poids — ce qu’affiche la balance ailleurs',
    '101 वज़न — अन्य लोकों पर तराज़ू क्या दिखाएगा',
    '101 种体重 — 在其他天体上称是多少',
    '101 種體重 — 在其他天體上稱是多少',
  ),

  hubLead: T(
    '몸이 가진 물질의 양은 어디서나 같습니다. 달라지는 것은 끌어당기는 힘이고, 저울은 그 힘을 잽니다 — 달에서는 6분의 1, 목성에서는 두 배 반으로 찍힙니다.',
    'The amount of matter in a body never changes. What changes is the pull on it, and a scale measures that pull — one sixth of it on the Moon, two and a half times on Jupiter.',
    'La cantidad de materia de un cuerpo no cambia. Lo que cambia es la atracción, y la balanza mide esa atracción: un sexto en la Luna, dos veces y media en Júpiter.',
    'A quantidade de matéria de um corpo não muda. O que muda é a atração, e a balança mede essa atração: um sexto na Lua, duas vezes e meia em Júpiter.',
    '体が持つ物質の量はどこでも同じです。変わるのは引く力で、はかりはその力を量ります——月では6分の1、木星では2.5倍と出ます。',
    'Die Menge an Materie in einem Körper bleibt gleich. Was sich ändert, ist die Anziehung — und die Waage misst genau die: ein Sechstel auf dem Mond, das Zweieinhalbfache auf Jupiter.',
    'La quantité de matière d’un corps ne change pas. Ce qui change, c’est l’attraction, et la balance mesure cette attraction : un sixième sur la Lune, deux fois et demie sur Jupiter.',
    'शरीर में पदार्थ की मात्रा हर जगह वही रहती है। बदलता है खिंचाव, और तराज़ू उसी खिंचाव को नापता है — चंद्रमा पर छठा हिस्सा, बृहस्पति पर ढाई गुना।',
    '身体里的物质多少到哪儿都一样，变的是引力，而秤量的正是引力——在月球上只剩六分之一，在木星上是两倍半。',
    '身體裡的物質多少到哪兒都一樣，變的是引力，而秤量的正是引力——在月球上只剩六分之一，在木星上是兩倍半。',
  ),

  weightLabel: T('지구에서', 'On Earth', 'En la Tierra', 'Na Terra', '地球で', 'Auf der Erde', 'Sur Terre', 'पृथ्वी पर', '在地球', '在地球'),
  gravityLabel: T('중력가속도', 'Surface gravity', 'Gravedad superficial', 'Gravidade superficial', '表面重力', 'Oberflächenschwerkraft', 'Gravité de surface', 'सतही गुरुत्व', '表面重力', '表面重力'),
  ratioLabel: T('지구를 1로 보면', 'Earth = 1', 'Tierra = 1', 'Terra = 1', '地球を1とすると', 'Erde = 1', 'Terre = 1', 'पृथ्वी = 1', '以地球为 1', '以地球為 1'),
  scaleLabel: T('저울에 찍히는 값', 'What the scale reads', 'Lo que marca la balanza', 'O que a balança marca', 'はかりの表示', 'Waagenanzeige', 'Ce qu’affiche la balance', 'तराज़ू का पाठ', '秤上的读数', '秤上的讀數'),
  newtonLabel: T('끌어당기는 힘', 'Force of gravity', 'Fuerza de gravedad', 'Força da gravidade', '引く力', 'Gewichtskraft', 'Force de gravité', 'गुरुत्व बल', '引力大小', '引力大小'),

  massTitle: T('질량은 그대로, 무게만 달라집니다', 'The mass stays; only the weight moves', 'La masa se queda; solo cambia el peso', 'A massa fica; só o peso muda', '質量はそのまま、重さだけ変わります', 'Die Masse bleibt, nur das Gewicht ändert sich', 'La masse reste, seul le poids change', 'द्रव्यमान वही, केवल भार बदलता है', '质量不变，变的只是重量', '質量不變，變的只是重量'),

  massNote: T(
    '몸을 이루는 물질의 양이 질량이고, 그것을 끌어당기는 힘이 무게입니다. 달에 간다고 살이 빠지지는 않습니다 — 저울 눈금만 6분의 1로 내려갑니다. 그래서 과학에서는 무게의 단위로 킬로그램이 아니라 뉴턴을 씁니다.',
    'Mass is the matter you are made of; weight is the pull on it. Nobody loses matter by flying to the Moon — only the needle drops to one sixth. That is why physics measures weight in newtons rather than kilograms.',
    'La masa es la materia de la que estás hecho; el peso es la atracción sobre ella. Nadie pierde materia por ir a la Luna: solo la aguja baja a un sexto. Por eso la física mide el peso en newtons y no en kilogramos.',
    'A massa é a matéria de que você é feito; o peso é a atração sobre ela. Ninguém perde matéria indo à Lua — só o ponteiro cai para um sexto. Por isso a física mede peso em newtons, não em quilogramas.',
    '体をつくる物質の量が質量で、それを引く力が重さです。月へ行っても痩せはしません——はかりの目盛りが6分の1になるだけです。だから物理では重さの単位にキログラムではなくニュートンを使います。',
    'Masse ist die Materie, aus der du bestehst; Gewicht ist die Kraft darauf. Auf dem Mond verliert niemand Materie — nur die Anzeige fällt auf ein Sechstel. Deshalb misst die Physik Gewicht in Newton statt in Kilogramm.',
    'La masse, c’est la matière dont on est fait ; le poids, c’est l’attraction exercée sur elle. Personne ne perd de matière en allant sur la Lune : seule l’aiguille tombe au sixième. C’est pourquoi la physique mesure le poids en newtons, pas en kilogrammes.',
    'द्रव्यमान वह पदार्थ है जिससे आप बने हैं; भार उस पर लगने वाला खिंचाव। चंद्रमा जाकर कोई पदार्थ नहीं खोता — बस सुई छठे हिस्से पर आ जाती है। इसीलिए भौतिकी भार को किलोग्राम नहीं, न्यूटन में नापती है।',
    '质量是构成身体的物质，重量是作用在它上面的引力。去月球不会真的瘦——只是指针掉到六分之一。所以物理学用牛顿而不是千克来量重量。',
    '質量是構成身體的物質，重量是作用在它上面的引力。去月球不會真的瘦——只是指針掉到六分之一。所以物理學用牛頓而不是公斤來量重量。',
  ),

  jumpTitle: T('뛰는 높이는 반대로 갑니다', 'Jump height goes the other way', 'El salto va al revés', 'O salto vai ao contrário', '跳べる高さは逆になります', 'Die Sprunghöhe geht andersherum', 'La hauteur de saut fait l’inverse', 'छलाँग उल्टी दिशा में', '跳跃高度正好相反', '跳躍高度正好相反'),

  jumpNote: T(
    '같은 힘으로 굴러 올라가는 높이는 중력에 반비례합니다. 지구에서 50cm를 뛴다면 달에서는 3m 넘게 떠오릅니다 — 몸무게와는 상관이 없습니다.',
    'For the same push, the height you rise is inversely proportional to gravity. A 50 cm jump on Earth becomes over three metres on the Moon — and it does not depend on how much you weigh.',
    'Con el mismo impulso, la altura que alcanzas es inversamente proporcional a la gravedad. Un salto de 50 cm en la Tierra pasa de tres metros en la Luna, y no depende de lo que peses.',
    'Com o mesmo impulso, a altura que você alcança é inversamente proporcional à gravidade. Um salto de 50 cm na Terra vira mais de três metros na Lua — e não depende do quanto você pesa.',
    '同じ力で上がる高さは重力に反比例します。地球で50cm跳べるなら月では3mを超えます——体重とは関係ありません。',
    'Bei gleichem Absprung ist die Steighöhe umgekehrt proportional zur Schwerkraft. Aus 50 cm auf der Erde werden auf dem Mond über drei Meter — unabhängig vom Gewicht.',
    'À poussée égale, la hauteur atteinte est inversement proportionnelle à la gravité. Un saut de 50 cm sur Terre dépasse trois mètres sur la Lune — et cela ne dépend pas du poids.',
    'समान धक्के से उठने की ऊँचाई गुरुत्व के व्युत्क्रमानुपाती होती है। पृथ्वी पर 50 सेमी की छलाँग चंद्रमा पर तीन मीटर से ऊपर हो जाती है — और यह वज़न पर निर्भर नहीं।',
    '同样的蹬地力，跳起的高度与重力成反比。地球上跳 50 厘米，在月球上能超过三米——而且和体重无关。',
    '同樣的蹬地力，跳起的高度與重力成反比。地球上跳 50 公分，在月球上能超過三公尺——而且和體重無關。',
  ),

  heavyTitle: T('지구보다 무겁게 재는 곳', 'Where the scale reads higher', 'Donde la balanza marca más', 'Onde a balança marca mais', '地球より重く出る場所', 'Wo die Waage mehr zeigt', 'Où la balance affiche plus', 'जहाँ तराज़ू अधिक दिखाता है', '秤读数比地球大的地方', '秤讀數比地球大的地方'),

  heavyNote: T(
    '태양·목성·토성·해왕성 넷뿐입니다. 토성은 지구의 여덟 배나 무거운데도 표면 중력은 6%밖에 세지 않습니다 — 그만큼 부풀어 있어 표면이 중심에서 멀기 때문입니다.',
    'Only four: the Sun, Jupiter, Saturn and Neptune. Saturn has eight times Earth’s mass yet only 6% more surface gravity — it is so puffed up that its surface sits far from the centre.',
    'Solo cuatro: el Sol, Júpiter, Saturno y Neptuno. Saturno tiene ocho veces la masa de la Tierra y apenas un 6% más de gravedad superficial: está tan hinchado que su superficie queda lejos del centro.',
    'Só quatro: o Sol, Júpiter, Saturno e Netuno. Saturno tem oito vezes a massa da Terra e apenas 6% mais gravidade superficial — é tão inchado que sua superfície fica longe do centro.',
    '太陽・木星・土星・海王星の4つだけです。土星は地球の8倍も重いのに表面重力は6%しか強くありません——それだけ膨らんでいて表面が中心から遠いからです。',
    'Nur vier: Sonne, Jupiter, Saturn und Neptun. Saturn hat die achtfache Erdmasse, aber nur 6 % mehr Oberflächenschwerkraft — er ist so aufgebläht, dass seine Oberfläche weit vom Zentrum liegt.',
    'Quatre seulement : le Soleil, Jupiter, Saturne et Neptune. Saturne pèse huit fois la Terre mais n’a que 6 % de gravité de surface en plus — il est si gonflé que sa surface est loin du centre.',
    'केवल चार: सूर्य, बृहस्पति, शनि और वरुण। शनि का द्रव्यमान पृथ्वी से आठ गुना है फिर भी सतही गुरुत्व केवल 6% अधिक — वह इतना फूला हुआ है कि सतह केंद्र से दूर पड़ती है।',
    '只有四个：太阳、木星、土星、海王星。土星质量是地球的八倍，表面重力却只强 6%——因为它膨胀得厉害，表面离中心很远。',
    '只有四個：太陽、木星、土星、海王星。土星質量是地球的八倍，表面重力卻只強 6%——因為它膨脹得厲害，表面離中心很遠。',
  ),

  gasTitle: T('설 수 없는 표면도 있습니다', 'Some of these have no ground', 'Algunos no tienen suelo', 'Alguns não têm chão', '立てない表面もあります', 'Manche haben gar keinen Boden', 'Certains n’ont pas de sol', 'कुछ पर ज़मीन ही नहीं', '有些天体没有可以站的地面', '有些天體沒有可以站的地面'),

  gasNote: T(
    '목성·토성·천왕성·해왕성은 단단한 표면이 없어 구름 꼭대기를 기준으로 잰 값입니다. 태양은 말할 것도 없습니다 — 저울을 놓을 자리가 아니라 계산으로만 나오는 값입니다.',
    'Jupiter, Saturn, Uranus and Neptune have no solid ground; their figures are taken at the cloud tops. The Sun needs no explanation — nothing could stand there, so the number is arithmetic only.',
    'Júpiter, Saturno, Urano y Neptuno no tienen suelo sólido: sus valores se toman en la cima de las nubes. Del Sol sobra decirlo: nada podría posarse allí, así que el número es puro cálculo.',
    'Júpiter, Saturno, Urano e Netuno não têm chão sólido: seus valores são medidos no topo das nuvens. Do Sol nem se fala — nada poderia pousar ali, então o número é só cálculo.',
    '木星・土星・天王星・海王星は固い表面がなく、雲の上端を基準にした値です。太陽は言うまでもありません——はかりを置ける場所ではなく、計算の上でだけ出る値です。',
    'Jupiter, Saturn, Uranus und Neptun haben keinen festen Boden; ihre Werte gelten an der Wolkenobergrenze. Bei der Sonne erübrigt sich das — dort könnte nichts stehen, die Zahl ist reine Rechnung.',
    'Jupiter, Saturne, Uranus et Neptune n’ont pas de sol solide : leurs valeurs sont prises au sommet des nuages. Pour le Soleil, inutile de préciser : rien ne pourrait s’y poser, le chiffre n’est qu’un calcul.',
    'बृहस्पति, शनि, अरुण और वरुण पर ठोस सतह नहीं है; उनके मान बादलों के शीर्ष पर लिए गए हैं। सूर्य का तो कहना ही क्या — वहाँ कुछ टिक ही नहीं सकता, संख्या केवल गणना है।',
    '木星、土星、天王星、海王星没有坚硬表面，数值取自云顶。太阳更不用说——那里根本站不住，这个数字只存在于计算里。',
    '木星、土星、天王星、海王星沒有堅硬表面，數值取自雲頂。太陽更不用說——那裡根本站不住，這個數字只存在於計算裡。',
  ),

  allTitle: T('30kg부터 130kg까지', 'From 30 to 130 kg', 'De 30 a 130 kg', 'De 30 a 130 kg', '30kgから130kgまで', 'Von 30 bis 130 kg', 'De 30 à 130 kg', '30 से 130 किग्रा तक', '从 30 到 130 公斤', '從 30 到 130 公斤'),
  neighbourTitle: T('가까운 몸무게', 'Nearby weights', 'Pesos cercanos', 'Pesos próximos', '近い体重', 'Gewichte daneben', 'Poids voisins', 'पास के वज़न', '相邻体重', '相鄰體重'),

  desc: T<(f: GravityFacts) => string>(
    f => `지구에서 ${f.kg}kg인 몸은 달에서 ${f.bodies[4].kg}kg, 화성에서 ${f.bodies[5].kg}kg, 목성에서 ${f.bodies[6].kg}kg으로 찍힙니다. 물질의 양은 그대로이고 끌어당기는 힘만 달라집니다.`,
    f => `A body that weighs ${f.kg} kg on Earth reads ${f.bodies[4].kg} kg on the Moon, ${f.bodies[5].kg} kg on Mars and ${f.bodies[6].kg} kg on Jupiter. The matter is unchanged; only the pull differs.`,
    f => `Un cuerpo de ${f.kg} kg en la Tierra marca ${f.bodies[4].kg} kg en la Luna, ${f.bodies[5].kg} kg en Marte y ${f.bodies[6].kg} kg en Júpiter. La materia es la misma; solo cambia la atracción.`,
    f => `Um corpo de ${f.kg} kg na Terra marca ${f.bodies[4].kg} kg na Lua, ${f.bodies[5].kg} kg em Marte e ${f.bodies[6].kg} kg em Júpiter. A matéria é a mesma; só muda a atração.`,
    f => `地球で${f.kg}kgの体は、月では${f.bodies[4].kg}kg、火星では${f.bodies[5].kg}kg、木星では${f.bodies[6].kg}kgと出ます。物質の量はそのままで、引く力だけが変わります。`,
    f => `Ein Körper mit ${f.kg} kg auf der Erde zeigt auf dem Mond ${f.bodies[4].kg} kg, auf dem Mars ${f.bodies[5].kg} kg und auf Jupiter ${f.bodies[6].kg} kg. Die Materie bleibt, nur die Anziehung ändert sich.`,
    f => `Un corps de ${f.kg} kg sur Terre affiche ${f.bodies[4].kg} kg sur la Lune, ${f.bodies[5].kg} kg sur Mars et ${f.bodies[6].kg} kg sur Jupiter. La matière ne change pas, seule l’attraction diffère.`,
    f => `पृथ्वी पर ${f.kg} किग्रा का शरीर चंद्रमा पर ${f.bodies[4].kg}, मंगल पर ${f.bodies[5].kg} और बृहस्पति पर ${f.bodies[6].kg} किग्रा दिखाता है। पदार्थ वही रहता है, केवल खिंचाव बदलता है।`,
    f => `在地球上 ${f.kg} 公斤的身体，在月球上称 ${f.bodies[4].kg} 公斤，火星 ${f.bodies[5].kg} 公斤，木星 ${f.bodies[6].kg} 公斤。物质没变，变的只是引力。`,
    f => `在地球上 ${f.kg} 公斤的身體，在月球上稱 ${f.bodies[4].kg} 公斤，火星 ${f.bodies[5].kg} 公斤，木星 ${f.bodies[6].kg} 公斤。物質沒變，變的只是引力。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '저울 값 = 지구 몸무게 × (그 천체 중력 ÷ 지구 중력).',
      '지구 중력은 9.80665m/s²이고, 이 표의 모든 비가 그 값을 기준으로 합니다.',
      '힘(뉴턴) = 질량 × 중력가속도. 70kg인 사람은 지구에서 약 686N을 받습니다.',
      '뛰는 높이는 중력에 반비례하므로, 달에서는 여섯 배쯤 떠오릅니다.',
    ],
    [
      'Scale reading = Earth weight × (that world’s gravity ÷ Earth’s gravity).',
      'Earth’s gravity is 9.80665 m/s², and every ratio here is measured against it.',
      'Force in newtons = mass × gravity. A 70 kg person feels about 686 N on Earth.',
      'Jump height is inversely proportional to gravity, so the Moon lifts you six times higher.',
    ],
    [
      'Lectura de la balanza = peso terrestre × (gravedad del mundo ÷ gravedad terrestre).',
      'La gravedad terrestre es 9,80665 m/s², y todas las razones aquí se miden contra ella.',
      'Fuerza en newtons = masa × gravedad. Una persona de 70 kg siente unos 686 N en la Tierra.',
      'La altura de salto es inversamente proporcional a la gravedad: la Luna te eleva seis veces más.',
    ],
    [
      'Leitura da balança = peso terrestre × (gravidade do mundo ÷ gravidade terrestre).',
      'A gravidade terrestre é 9,80665 m/s², e todas as razões aqui se medem contra ela.',
      'Força em newtons = massa × gravidade. Uma pessoa de 70 kg sente cerca de 686 N na Terra.',
      'A altura do salto é inversamente proporcional à gravidade: a Lua te eleva seis vezes mais.',
    ],
    [
      'はかりの値 = 地球での体重 × (その天体の重力 ÷ 地球の重力)。',
      '地球の重力は9.80665m/s²で、この表の比はすべてその値を基準にします。',
      '力(ニュートン) = 質量 × 重力加速度。70kgの人は地球で約686Nを受けます。',
      '跳べる高さは重力に反比例するので、月では6倍ほど浮き上がります。',
    ],
    [
      'Waagenwert = Erdgewicht × (Schwerkraft dort ÷ Schwerkraft der Erde).',
      'Die Erdschwerkraft beträgt 9,80665 m/s²; alle Verhältnisse hier beziehen sich darauf.',
      'Kraft in Newton = Masse × Schwerkraft. Eine 70-kg-Person erfährt auf der Erde rund 686 N.',
      'Die Sprunghöhe ist umgekehrt proportional zur Schwerkraft — auf dem Mond kommt man sechsmal höher.',
    ],
    [
      'Valeur affichée = poids terrestre × (gravité du monde ÷ gravité terrestre).',
      'La gravité terrestre vaut 9,80665 m/s², et tous les rapports ici s’y réfèrent.',
      'Force en newtons = masse × gravité. Une personne de 70 kg subit environ 686 N sur Terre.',
      'La hauteur de saut est inversement proportionnelle à la gravité : la Lune vous soulève six fois plus haut.',
    ],
    [
      'तराज़ू का पाठ = पृथ्वी का वज़न × (उस लोक का गुरुत्व ÷ पृथ्वी का गुरुत्व)।',
      'पृथ्वी का गुरुत्व 9.80665 मी/से² है, और यहाँ के सभी अनुपात उसी से नापे गए हैं।',
      'बल (न्यूटन) = द्रव्यमान × गुरुत्व। 70 किग्रा व्यक्ति पर पृथ्वी पर लगभग 686 N लगता है।',
      'छलाँग की ऊँचाई गुरुत्व के व्युत्क्रमानुपाती है, इसलिए चंद्रमा पर छह गुना ऊपर उठते हैं।',
    ],
    [
      '秤上的读数 = 地球体重 × (该天体重力 ÷ 地球重力)。',
      '地球重力为 9.80665 米/秒²，本表所有比值都以它为准。',
      '力（牛顿）= 质量 × 重力加速度。70 公斤的人在地球上约受 686 N。',
      '跳跃高度与重力成反比，所以在月球上能跳高约六倍。',
    ],
    [
      '秤上的讀數 = 地球體重 × (該天體重力 ÷ 地球重力)。',
      '地球重力為 9.80665 公尺/秒²，本表所有比值都以它為準。',
      '力（牛頓）= 質量 × 重力加速度。70 公斤的人在地球上約受 686 N。',
      '跳躍高度與重力成反比，所以在月球上能跳高約六倍。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '천체별 몸무게표 — 달·화성·목성에서 몇 kg인가',
    'Weight on other worlds — kilograms on the Moon, Mars and Jupiter',
    'Peso en otros mundos — kilos en la Luna, Marte y Júpiter',
    'Peso em outros mundos — quilos na Lua, Marte e Júpiter',
    '天体別の体重表 — 月・火星・木星では何kgか',
    'Gewicht auf anderen Welten — Kilogramm auf Mond, Mars und Jupiter',
    'Poids sur d’autres mondes — kilos sur la Lune, Mars et Jupiter',
    'अन्य लोकों पर वज़न — चंद्रमा, मंगल और बृहस्पति पर कितने किलो',
    '各天体上的体重表 — 在月球、火星、木星上是多少公斤',
    '各天體上的體重表 — 在月球、火星、木星上是多少公斤',
  ),

  hubMetaDesc: T(
    '지구에서 30kg부터 130kg까지, 태양과 여덟 행성과 달·명왕성에서 저울에 얼마로 찍히는지 계산했습니다. 질량은 그대로이고 달라지는 것은 중력입니다.',
    'For every Earth weight from 30 to 130 kg, what the scale would read on the Sun, the eight planets, the Moon and Pluto. The mass never changes — only the gravity does.',
    'Para cada peso terrestre de 30 a 130 kg, lo que marcaría la balanza en el Sol, los ocho planetas, la Luna y Plutón. La masa no cambia; solo la gravedad.',
    'Para cada peso terrestre de 30 a 130 kg, o que a balança marcaria no Sol, nos oito planetas, na Lua e em Plutão. A massa não muda; só a gravidade.',
    '地球で30kgから130kgまで、太陽と八惑星、月・冥王星ではかりに何と出るかを計算しました。質量はそのままで、変わるのは重力です。',
    'Für jedes Erdgewicht von 30 bis 130 kg, was die Waage auf der Sonne, den acht Planeten, dem Mond und Pluto zeigen würde. Die Masse bleibt — nur die Schwerkraft ändert sich.',
    'Pour chaque poids terrestre de 30 à 130 kg, ce qu’afficherait la balance sur le Soleil, les huit planètes, la Lune et Pluton. La masse ne change pas, seule la gravité.',
    '30 से 130 किग्रा तक हर पृथ्वी-वज़न के लिए सूर्य, आठ ग्रहों, चंद्रमा और यम पर तराज़ू क्या दिखाएगा। द्रव्यमान वही रहता है, बदलता है केवल गुरुत्व।',
    '从 30 到 130 公斤的每个地球体重，在太阳、八大行星、月球与冥王星上秤会显示多少。质量不变，变的只是重力。',
    '從 30 到 130 公斤的每個地球體重，在太陽、八大行星、月球與冥王星上秤會顯示多少。質量不變，變的只是重力。',
  ),

  metaTitle: T<(f: GravityFacts) => string>(
    f => `${f.kg}kg — 달에서 ${f.bodies[4].kg}kg, 화성에서 ${f.bodies[5].kg}kg`,
    f => `${f.kg} kg — ${f.bodies[4].kg} kg on the Moon, ${f.bodies[5].kg} kg on Mars`,
    f => `${f.kg} kg — ${f.bodies[4].kg} kg en la Luna, ${f.bodies[5].kg} kg en Marte`,
    f => `${f.kg} kg — ${f.bodies[4].kg} kg na Lua, ${f.bodies[5].kg} kg em Marte`,
    f => `${f.kg}kg — 月で${f.bodies[4].kg}kg、火星で${f.bodies[5].kg}kg`,
    f => `${f.kg} kg — ${f.bodies[4].kg} kg auf dem Mond, ${f.bodies[5].kg} kg auf dem Mars`,
    f => `${f.kg} kg — ${f.bodies[4].kg} kg sur la Lune, ${f.bodies[5].kg} kg sur Mars`,
    f => `${f.kg} किग्रा — चंद्रमा पर ${f.bodies[4].kg}, मंगल पर ${f.bodies[5].kg} किग्रा`,
    f => `${f.kg} 公斤 — 月球 ${f.bodies[4].kg} 公斤，火星 ${f.bodies[5].kg} 公斤`,
    f => `${f.kg} 公斤 — 月球 ${f.bodies[4].kg} 公斤，火星 ${f.bodies[5].kg} 公斤`,
  ),

  metaDesc: T<(f: GravityFacts) => string>(
    f => `지구에서 ${f.kg}kg이면 달 ${f.bodies[4].kg}kg, 화성 ${f.bodies[5].kg}kg, 금성 ${f.bodies[2].kg}kg, 목성 ${f.bodies[6].kg}kg, 명왕성 ${f.bodies[10].kg}kg입니다. 지구에서 받는 힘은 ${f.earthNewton}N입니다.`,
    f => `${f.kg} kg on Earth reads ${f.bodies[4].kg} kg on the Moon, ${f.bodies[5].kg} kg on Mars, ${f.bodies[2].kg} kg on Venus, ${f.bodies[6].kg} kg on Jupiter and ${f.bodies[10].kg} kg on Pluto. On Earth that is a pull of ${f.earthNewton} N.`,
    f => `${f.kg} kg en la Tierra marcan ${f.bodies[4].kg} kg en la Luna, ${f.bodies[5].kg} en Marte, ${f.bodies[2].kg} en Venus, ${f.bodies[6].kg} en Júpiter y ${f.bodies[10].kg} en Plutón. En la Tierra son ${f.earthNewton} N de atracción.`,
    f => `${f.kg} kg na Terra marcam ${f.bodies[4].kg} kg na Lua, ${f.bodies[5].kg} em Marte, ${f.bodies[2].kg} em Vênus, ${f.bodies[6].kg} em Júpiter e ${f.bodies[10].kg} em Plutão. Na Terra são ${f.earthNewton} N de atração.`,
    f => `地球で${f.kg}kgなら、月${f.bodies[4].kg}kg、火星${f.bodies[5].kg}kg、金星${f.bodies[2].kg}kg、木星${f.bodies[6].kg}kg、冥王星${f.bodies[10].kg}kgです。地球で受ける力は${f.earthNewton}Nです。`,
    f => `${f.kg} kg auf der Erde zeigen ${f.bodies[4].kg} kg auf dem Mond, ${f.bodies[5].kg} auf dem Mars, ${f.bodies[2].kg} auf der Venus, ${f.bodies[6].kg} auf Jupiter und ${f.bodies[10].kg} auf Pluto. Auf der Erde sind das ${f.earthNewton} N.`,
    f => `${f.kg} kg sur Terre donnent ${f.bodies[4].kg} kg sur la Lune, ${f.bodies[5].kg} sur Mars, ${f.bodies[2].kg} sur Vénus, ${f.bodies[6].kg} sur Jupiter et ${f.bodies[10].kg} sur Pluton. Sur Terre, cela fait ${f.earthNewton} N.`,
    f => `पृथ्वी पर ${f.kg} किग्रा का अर्थ है चंद्रमा ${f.bodies[4].kg}, मंगल ${f.bodies[5].kg}, शुक्र ${f.bodies[2].kg}, बृहस्पति ${f.bodies[6].kg} और यम ${f.bodies[10].kg} किग्रा। पृथ्वी पर यह ${f.earthNewton} N का बल है।`,
    f => `在地球上 ${f.kg} 公斤，则月球 ${f.bodies[4].kg}、火星 ${f.bodies[5].kg}、金星 ${f.bodies[2].kg}、木星 ${f.bodies[6].kg}、冥王星 ${f.bodies[10].kg} 公斤。在地球上受到的引力为 ${f.earthNewton} N。`,
    f => `在地球上 ${f.kg} 公斤，則月球 ${f.bodies[4].kg}、火星 ${f.bodies[5].kg}、金星 ${f.bodies[2].kg}、木星 ${f.bodies[6].kg}、冥王星 ${f.bodies[10].kg} 公斤。在地球上受到的引力為 ${f.earthNewton} N。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '달에 가면 정말 살이 빠지나요?', a: '아닙니다. 몸을 이루는 물질의 양은 그대로이고 저울 눈금만 6분의 1로 내려갑니다. 지구로 돌아오면 그대로입니다.' },
      { q: '왜 킬로그램이 아니라 뉴턴으로 재나요?', a: '킬로그램은 질량의 단위이고 무게는 힘이기 때문입니다. 저울이 킬로그램을 보여 주는 것은 지구 중력을 미리 나눠 둔 덕입니다 — 달에 그대로 가져가면 6분의 1이 찍힙니다.' },
      { q: '토성은 왜 지구와 비슷한가요?', a: '질량은 여덟 배지만 그만큼 부풀어 있어 표면이 중심에서 훨씬 멉니다. 중력은 거리의 제곱에 반비례하므로 두 효과가 거의 상쇄되어 6%만 세집니다.' },
      { q: '목성에 서 있을 수 있나요?', a: '없습니다. 단단한 표면이 없어 이 표의 값은 구름 꼭대기 기준입니다. 그 아래로 내려가면 압력과 온도가 급격히 올라갑니다.' },
      { q: '달에서 얼마나 높이 뛸 수 있나요?', a: '같은 힘으로 굴러 올라가는 높이는 중력에 반비례하므로 여섯 배쯤입니다. 지구에서 50cm를 뛰면 달에서는 3m 넘게 뜹니다.' },
    ],
    [
      { q: 'Do you actually lose weight on the Moon?', a: 'No. The matter in your body is unchanged; only the reading drops to a sixth. Come back to Earth and the scale is where it was.' },
      { q: 'Why measure weight in newtons rather than kilograms?', a: 'Kilograms measure mass, and weight is a force. A bathroom scale shows kilograms only because Earth’s gravity is already divided out — take it to the Moon and it reads one sixth.' },
      { q: 'Why is Saturn so close to Earth?', a: 'It has eight times the mass but is puffed up so far that its surface sits much further from the centre. Gravity falls off with the square of distance, so the two effects nearly cancel and only 6% is left.' },
      { q: 'Could you stand on Jupiter?', a: 'No. There is no solid ground, so the figure here is taken at the cloud tops. Below that, pressure and temperature climb sharply.' },
      { q: 'How high could you jump on the Moon?', a: 'About six times as high, since jump height is inversely proportional to gravity. A 50 cm jump on Earth clears three metres there.' },
    ],
    [
      { q: '¿De verdad se adelgaza en la Luna?', a: 'No. La materia de tu cuerpo sigue igual; solo la lectura baja a un sexto. Al volver a la Tierra la balanza marca lo mismo de antes.' },
      { q: '¿Por qué medir el peso en newtons y no en kilos?', a: 'El kilogramo mide masa y el peso es una fuerza. La báscula muestra kilos porque ya divide por la gravedad terrestre; llévala a la Luna y marcará un sexto.' },
      { q: '¿Por qué Saturno se parece tanto a la Tierra?', a: 'Tiene ocho veces la masa, pero está tan hinchado que su superficie queda mucho más lejos del centro. La gravedad cae con el cuadrado de la distancia, así que ambos efectos casi se anulan y solo queda un 6%.' },
      { q: '¿Se puede estar de pie en Júpiter?', a: 'No. No hay suelo sólido, así que la cifra se toma en la cima de las nubes. Más abajo, la presión y la temperatura suben de golpe.' },
      { q: '¿Cuánto se salta en la Luna?', a: 'Unas seis veces más alto, porque la altura del salto es inversamente proporcional a la gravedad. Un salto de 50 cm en la Tierra supera allí los tres metros.' },
    ],
    [
      { q: 'Emagrece mesmo na Lua?', a: 'Não. A matéria do corpo continua a mesma; só a leitura cai para um sexto. De volta à Terra, a balança marca o mesmo de antes.' },
      { q: 'Por que medir peso em newtons e não em quilos?', a: 'O quilograma mede massa, e peso é força. A balança mostra quilos porque já divide pela gravidade da Terra; leve-a à Lua e marcará um sexto.' },
      { q: 'Por que Saturno é tão parecido com a Terra?', a: 'Tem oito vezes a massa, mas é tão inchado que a superfície fica bem mais longe do centro. A gravidade cai com o quadrado da distância, então os efeitos quase se anulam e sobram 6%.' },
      { q: 'Dá para ficar de pé em Júpiter?', a: 'Não. Não há chão sólido, então o número aqui é medido no topo das nuvens. Mais abaixo, pressão e temperatura sobem de repente.' },
      { q: 'Quão alto dá para pular na Lua?', a: 'Cerca de seis vezes mais, pois a altura do salto é inversamente proporcional à gravidade. Um salto de 50 cm na Terra passa de três metros lá.' },
    ],
    [
      { q: '月へ行くと本当に痩せますか？', a: 'いいえ。体をつくる物質の量はそのままで、はかりの目盛りだけが6分の1になります。地球に戻れば元どおりです。' },
      { q: 'なぜキログラムではなくニュートンで量るのですか？', a: 'キログラムは質量の単位で、重さは力だからです。体重計がキログラムを示すのは地球の重力であらかじめ割ってあるためで、月へ持って行けば6分の1と出ます。' },
      { q: '土星はなぜ地球と近いのですか？', a: '質量は8倍ですが、それだけ膨らんでいて表面が中心からずっと遠いからです。重力は距離の二乗に反比例するので二つの効果がほぼ打ち消し合い、6%しか残りません。' },
      { q: '木星に立てますか？', a: '立てません。固い表面がないので、この表の値は雲の上端が基準です。その下では圧力も温度も急に上がります。' },
      { q: '月ではどれくらい跳べますか？', a: '跳べる高さは重力に反比例するので6倍ほどです。地球で50cm跳べる人は月で3mを超えます。' },
    ],
    [
      { q: 'Nimmt man auf dem Mond wirklich ab?', a: 'Nein. Die Materie im Körper bleibt gleich, nur die Anzeige fällt auf ein Sechstel. Zurück auf der Erde steht die Waage wieder dort, wo sie war.' },
      { q: 'Warum Gewicht in Newton statt in Kilogramm?', a: 'Kilogramm misst Masse, Gewicht ist eine Kraft. Die Personenwaage zeigt Kilogramm nur, weil die Erdschwerkraft schon herausgerechnet ist — auf dem Mond zeigte sie ein Sechstel.' },
      { q: 'Warum liegt Saturn so nah an der Erde?', a: 'Er hat die achtfache Masse, ist aber so aufgebläht, dass seine Oberfläche viel weiter vom Zentrum entfernt liegt. Schwerkraft nimmt mit dem Quadrat des Abstands ab, beide Effekte heben sich fast auf — es bleiben 6 %.' },
      { q: 'Könnte man auf Jupiter stehen?', a: 'Nein. Es gibt keinen festen Boden, deshalb gilt der Wert an der Wolkenobergrenze. Darunter steigen Druck und Temperatur steil an.' },
      { q: 'Wie hoch springt man auf dem Mond?', a: 'Rund sechsmal so hoch, denn die Sprunghöhe ist umgekehrt proportional zur Schwerkraft. Aus 50 cm auf der Erde werden dort über drei Meter.' },
    ],
    [
      { q: 'Maigrit-on vraiment sur la Lune ?', a: 'Non. La matière du corps ne change pas ; seule l’affichage tombe au sixième. De retour sur Terre, la balance indique la même chose qu’avant.' },
      { q: 'Pourquoi mesurer le poids en newtons plutôt qu’en kilos ?', a: 'Le kilogramme mesure la masse, et le poids est une force. Le pèse-personne affiche des kilos parce que la gravité terrestre est déjà divisée ; sur la Lune il indiquerait un sixième.' },
      { q: 'Pourquoi Saturne ressemble-t-elle tant à la Terre ?', a: 'Sa masse est huit fois plus grande, mais elle est si gonflée que sa surface est bien plus loin du centre. La gravité décroît comme le carré de la distance : les deux effets se compensent presque, il ne reste que 6 %.' },
      { q: 'Peut-on se tenir debout sur Jupiter ?', a: 'Non. Il n’y a pas de sol solide, donc la valeur donnée ici vaut au sommet des nuages. En dessous, pression et température grimpent brutalement.' },
      { q: 'Jusqu’où saute-t-on sur la Lune ?', a: 'Six fois plus haut environ, la hauteur de saut étant inversement proportionnelle à la gravité. Un saut de 50 cm sur Terre y dépasse trois mètres.' },
    ],
    [
      { q: 'क्या चंद्रमा पर सचमुच वज़न घटता है?', a: 'नहीं। शरीर का पदार्थ वही रहता है; केवल पाठ छठे हिस्से पर आ जाता है। पृथ्वी लौटते ही तराज़ू पहले जैसा।' },
      { q: 'भार न्यूटन में क्यों नापते हैं, किलो में क्यों नहीं?', a: 'किलोग्राम द्रव्यमान की इकाई है और भार एक बल है। तराज़ू किलो दिखाता है क्योंकि पृथ्वी का गुरुत्व पहले ही भाग दिया गया है — उसे चंद्रमा ले जाइए तो छठा हिस्सा दिखेगा।' },
      { q: 'शनि पृथ्वी के इतना पास क्यों है?', a: 'उसका द्रव्यमान आठ गुना है, पर वह इतना फूला है कि सतह केंद्र से कहीं दूर पड़ती है। गुरुत्व दूरी के वर्ग के व्युत्क्रमानुपाती है, इसलिए दोनों प्रभाव लगभग कट जाते हैं और केवल 6% बचता है।' },
      { q: 'क्या बृहस्पति पर खड़े हो सकते हैं?', a: 'नहीं। वहाँ ठोस ज़मीन नहीं है, इसलिए यह मान बादलों के शीर्ष का है। उसके नीचे दाब और तापमान तेज़ी से बढ़ते हैं।' },
      { q: 'चंद्रमा पर कितना ऊँचा कूद सकते हैं?', a: 'लगभग छह गुना, क्योंकि छलाँग की ऊँचाई गुरुत्व के व्युत्क्रमानुपाती है। पृथ्वी पर 50 सेमी कूदने वाला वहाँ तीन मीटर से ऊपर जाएगा।' },
    ],
    [
      { q: '去月球真的会变瘦吗？', a: '不会。身体里的物质一点没少，只是读数掉到六分之一。回到地球，秤还是原来的数。' },
      { q: '为什么用牛顿而不是千克量重量？', a: '千克量的是质量，而重量是力。体重秤显示千克，是因为已经除掉了地球重力；把它拿到月球，就会显示六分之一。' },
      { q: '土星为什么和地球差不多？', a: '它的质量是地球的八倍，但膨胀得厉害，表面离中心远得多。重力与距离平方成反比，两个效应几乎抵消，只剩下 6%。' },
      { q: '能站在木星上吗？', a: '不能。那里没有坚硬地面，本表数值取自云顶。再往下，压力和温度都会急剧升高。' },
      { q: '在月球上能跳多高？', a: '大约六倍，因为跳跃高度与重力成反比。地球上跳 50 厘米的人，在那里能跳过三米。' },
    ],
    [
      { q: '去月球真的會變瘦嗎？', a: '不會。身體裡的物質一點沒少，只是讀數掉到六分之一。回到地球，秤還是原來的數。' },
      { q: '為什麼用牛頓而不是公斤量重量？', a: '公斤量的是質量，而重量是力。體重秤顯示公斤，是因為已經除掉了地球重力；把它拿到月球，就會顯示六分之一。' },
      { q: '土星為什麼和地球差不多？', a: '它的質量是地球的八倍，但膨脹得厲害，表面離中心遠得多。重力與距離平方成反比，兩個效應幾乎抵消，只剩下 6%。' },
      { q: '能站在木星上嗎？', a: '不能。那裡沒有堅硬地面，本表數值取自雲頂。再往下，壓力和溫度都會急劇升高。' },
      { q: '在月球上能跳多高？', a: '大約六倍，因為跳躍高度與重力成反比。地球上跳 50 公分的人，在那裡能跳過三公尺。' },
    ],
  ),

  gravityFaq: T<(f: GravityFacts) => FaqItem[]>(
    f => [
      { q: `지구에서 ${f.kg}kg이면 달에서는 몇 kg인가요?`, a: `${f.bodies[4].kg}kg으로 찍힙니다. 달 중력이 지구의 ${f.bodies[4].ratio}배이기 때문입니다.` },
      { q: `화성에서는요?`, a: `${f.bodies[5].kg}kg입니다. 금성은 ${f.bodies[2].kg}kg, 목성은 ${f.bodies[6].kg}kg입니다.` },
      { q: `힘으로는 얼마인가요?`, a: `지구에서 ${f.earthNewton}N을 받습니다. 질량 ${f.kg}kg에 중력가속도 9.80665를 곱한 값입니다.` },
      { q: `살이 빠진 건가요?`, a: `아닙니다. 물질의 양은 어디서나 ${f.kg}kg 그대로이고, 저울이 재는 힘만 달라집니다.` },
    ],
    f => [
      { q: `What would ${f.kg} kg read on the Moon?`, a: `${f.bodies[4].kg} kg, because lunar gravity is ${f.bodies[4].ratio} of Earth’s.` },
      { q: `And on Mars?`, a: `${f.bodies[5].kg} kg. Venus gives ${f.bodies[2].kg} kg and Jupiter ${f.bodies[6].kg} kg.` },
      { q: `What is that as a force?`, a: `On Earth it is ${f.earthNewton} N — ${f.kg} kg of mass times 9.80665.` },
      { q: `Have you actually lost anything?`, a: `No. The matter is still ${f.kg} kg everywhere; only the pull the scale measures changes.` },
    ],
    f => [
      { q: `¿Cuánto marcarían ${f.kg} kg en la Luna?`, a: `${f.bodies[4].kg} kg, porque la gravedad lunar es ${f.bodies[4].ratio} de la terrestre.` },
      { q: `¿Y en Marte?`, a: `${f.bodies[5].kg} kg. En Venus serían ${f.bodies[2].kg} kg y en Júpiter ${f.bodies[6].kg} kg.` },
      { q: `¿Cuánto es en fuerza?`, a: `En la Tierra son ${f.earthNewton} N: ${f.kg} kg de masa por 9,80665.` },
      { q: `¿Has perdido algo realmente?`, a: `No. La materia sigue siendo ${f.kg} kg en cualquier sitio; solo cambia la atracción que mide la balanza.` },
    ],
    f => [
      { q: `Quanto ${f.kg} kg marcariam na Lua?`, a: `${f.bodies[4].kg} kg, porque a gravidade lunar é ${f.bodies[4].ratio} da terrestre.` },
      { q: `E em Marte?`, a: `${f.bodies[5].kg} kg. Em Vênus seriam ${f.bodies[2].kg} kg e em Júpiter ${f.bodies[6].kg} kg.` },
      { q: `Quanto é isso em força?`, a: `Na Terra são ${f.earthNewton} N: ${f.kg} kg de massa vezes 9,80665.` },
      { q: `Você perdeu alguma coisa?`, a: `Não. A matéria continua ${f.kg} kg em qualquer lugar; muda só a atração que a balança mede.` },
    ],
    f => [
      { q: `地球で${f.kg}kgなら月では何kgですか？`, a: `${f.bodies[4].kg}kgと出ます。月の重力が地球の${f.bodies[4].ratio}倍だからです。` },
      { q: `火星では？`, a: `${f.bodies[5].kg}kgです。金星は${f.bodies[2].kg}kg、木星は${f.bodies[6].kg}kgです。` },
      { q: `力ではいくつですか？`, a: `地球で${f.earthNewton}Nを受けます。質量${f.kg}kgに9.80665を掛けた値です。` },
      { q: `痩せたのですか？`, a: `いいえ。物質の量はどこでも${f.kg}kgのままで、はかりが量る力だけが変わります。` },
    ],
    f => [
      { q: `Was zeigen ${f.kg} kg auf dem Mond?`, a: `${f.bodies[4].kg} kg, denn die Mondschwerkraft beträgt das ${f.bodies[4].ratio}-Fache der irdischen.` },
      { q: `Und auf dem Mars?`, a: `${f.bodies[5].kg} kg. Auf der Venus wären es ${f.bodies[2].kg} kg, auf Jupiter ${f.bodies[6].kg} kg.` },
      { q: `Wie viel ist das als Kraft?`, a: `Auf der Erde ${f.earthNewton} N — ${f.kg} kg Masse mal 9,80665.` },
      { q: `Hat man wirklich etwas verloren?`, a: `Nein. Die Materie bleibt überall ${f.kg} kg; nur die Kraft, die die Waage misst, ändert sich.` },
    ],
    f => [
      { q: `Que donneraient ${f.kg} kg sur la Lune ?`, a: `${f.bodies[4].kg} kg, car la gravité lunaire vaut ${f.bodies[4].ratio} de celle de la Terre.` },
      { q: `Et sur Mars ?`, a: `${f.bodies[5].kg} kg. Sur Vénus ce serait ${f.bodies[2].kg} kg et sur Jupiter ${f.bodies[6].kg} kg.` },
      { q: `Cela fait quelle force ?`, a: `Sur Terre, ${f.earthNewton} N : ${f.kg} kg de masse fois 9,80665.` },
      { q: `A-t-on perdu quelque chose ?`, a: `Non. La matière reste ${f.kg} kg partout ; seule l’attraction mesurée par la balance change.` },
    ],
    f => [
      { q: `पृथ्वी पर ${f.kg} किग्रा चंद्रमा पर कितना?`, a: `${f.bodies[4].kg} किग्रा, क्योंकि चंद्र गुरुत्व पृथ्वी का ${f.bodies[4].ratio} गुना है।` },
      { q: `और मंगल पर?`, a: `${f.bodies[5].kg} किग्रा। शुक्र पर ${f.bodies[2].kg} और बृहस्पति पर ${f.bodies[6].kg} किग्रा।` },
      { q: `बल में यह कितना है?`, a: `पृथ्वी पर ${f.earthNewton} N — ${f.kg} किग्रा द्रव्यमान × 9.80665।` },
      { q: `क्या सचमुच कुछ घटा?`, a: `नहीं। पदार्थ हर जगह ${f.kg} किग्रा ही रहता है; बदलता है केवल वह खिंचाव जिसे तराज़ू नापता है।` },
    ],
    f => [
      { q: `地球上 ${f.kg} 公斤，在月球上是多少？`, a: `${f.bodies[4].kg} 公斤，因为月球重力是地球的 ${f.bodies[4].ratio} 倍。` },
      { q: `火星上呢？`, a: `${f.bodies[5].kg} 公斤。金星 ${f.bodies[2].kg} 公斤，木星 ${f.bodies[6].kg} 公斤。` },
      { q: `换成力是多少？`, a: `在地球上受 ${f.earthNewton} N，即 ${f.kg} 公斤质量乘以 9.80665。` },
      { q: `是真的变轻了吗？`, a: `不是。物质到哪儿都还是 ${f.kg} 公斤，变的只是秤所量的引力。` },
    ],
    f => [
      { q: `地球上 ${f.kg} 公斤，在月球上是多少？`, a: `${f.bodies[4].kg} 公斤，因為月球重力是地球的 ${f.bodies[4].ratio} 倍。` },
      { q: `火星上呢？`, a: `${f.bodies[5].kg} 公斤。金星 ${f.bodies[2].kg} 公斤，木星 ${f.bodies[6].kg} 公斤。` },
      { q: `換成力是多少？`, a: `在地球上受 ${f.earthNewton} N，即 ${f.kg} 公斤質量乘以 9.80665。` },
      { q: `是真的變輕了嗎？`, a: `不是。物質到哪兒都還是 ${f.kg} 公斤，變的只是秤所量的引力。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const GRAVITY_UI: L<GravityUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<GravityUI>;
