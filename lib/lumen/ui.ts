/**
 * 조명 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "와트는 밝기가 아니다"이다. 와트는 전기를 얼마나
 * 먹는지이고, 밝기는 루멘이다. LED가 같은 와트로 백열의 여덟 배를 내면서부터
 * 와트로 전구를 고르는 일이 뜻을 잃었다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { LumenFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface LumenUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  luxLabel: string;
  lumenLabel: string;
  areaLabel: string;
  pyeongLabel: string;
  bulbLabel: string;
  monthlyLabel: string;
  wastedLabel: string;
  useLabel: string;
  useName: (key: string) => string;
  sourceName: (key: string) => string;
  wattTitle: string;
  wattNote: string;
  luxTitle: string;
  luxNote: string;
  spreadTitle: string;
  spreadNote: string;
  costTitle: string;
  costNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  useRowTitle: string;
  areaRowTitle: string;
  desc: (f: LumenFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: LumenFacts) => string;
  metaDesc: (f: LumenFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: LumenFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 쓰임 이름은 제목과 질문에서도 같은 것을 써야 한다 — SPEC 밖으로 꺼낸다 */
const useKo = pick({ storage: '창고·다용도실', stairs: '계단', hall: '복도·현관', bedroom: '침실', living: '거실', bath: '욕실', kitchen: '주방', study: '서재·공부방', workshop: '작업실', detail: '정밀 작업' , office: '사무 공간', surgery: '수술·검사대' });
const useEn = pick({ storage: 'storage room', stairs: 'stairs', hall: 'hallway', bedroom: 'bedroom', living: 'living room', bath: 'bathroom', kitchen: 'kitchen', study: 'study or desk', workshop: 'workshop', detail: 'fine detail work' , office: 'office desk', surgery: 'operating table' });
const useEs = pick({ storage: 'trastero', stairs: 'escaleras', hall: 'pasillo', bedroom: 'dormitorio', living: 'salón', bath: 'baño', kitchen: 'cocina', study: 'estudio o escritorio', workshop: 'taller', detail: 'trabajo de precisión' , office: 'mesa de oficina', surgery: 'mesa de operaciones' });
const usePt = pick({ storage: 'depósito', stairs: 'escada', hall: 'corredor', bedroom: 'quarto', living: 'sala', bath: 'banheiro', kitchen: 'cozinha', study: 'escritório ou mesa', workshop: 'oficina', detail: 'trabalho de precisão' , office: 'mesa de escritório', surgery: 'mesa cirúrgica' });
const useJa = pick({ storage: '物置・納戸', stairs: '階段', hall: '廊下・玄関', bedroom: '寝室', living: 'リビング', bath: '浴室', kitchen: '台所', study: '書斎・勉強机', workshop: '作業室', detail: '精密作業' , office: 'オフィスの机', surgery: '手術台' });
const useDe = pick({ storage: 'Abstellraum', stairs: 'Treppe', hall: 'Flur', bedroom: 'Schlafzimmer', living: 'Wohnzimmer', bath: 'Bad', kitchen: 'Küche', study: 'Arbeitszimmer', workshop: 'Werkstatt', detail: 'Feinarbeit' , office: 'Büroarbeitsplatz', surgery: 'Operationstisch' });
const useFr = pick({ storage: 'débarras', stairs: 'escalier', hall: 'couloir', bedroom: 'chambre', living: 'salon', bath: 'salle de bain', kitchen: 'cuisine', study: 'bureau', workshop: 'atelier', detail: 'travail de précision' , office: 'bureau de travail', surgery: 'table d’opération' });
const useHi = pick({ storage: 'भंडार कक्ष', stairs: 'सीढ़ियाँ', hall: 'गलियारा', bedroom: 'शयनकक्ष', living: 'बैठक', bath: 'स्नानघर', kitchen: 'रसोई', study: 'अध्ययन कक्ष', workshop: 'कार्यशाला', detail: 'बारीक काम' , office: 'दफ़्तर की मेज़', surgery: 'ऑपरेशन टेबल' });
const useZh = pick({ storage: '储藏室', stairs: '楼梯', hall: '走廊玄关', bedroom: '卧室', living: '客厅', bath: '卫生间', kitchen: '厨房', study: '书房书桌', workshop: '工作间', detail: '精细作业' , office: '办公桌', surgery: '手术台' });
const useTw = pick({ storage: '儲藏室', stairs: '樓梯', hall: '走廊玄關', bedroom: '臥室', living: '客廳', bath: '衛浴', kitchen: '廚房', study: '書房書桌', workshop: '工作間', detail: '精細作業' , office: '辦公桌', surgery: '手術台' });

type Spec = { [K in keyof LumenUI]: L<LumenUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('방 밝기', 'Room lighting', 'Iluminación', 'Iluminação', '部屋の明るさ', 'Raumbeleuchtung', 'Éclairage', 'कमरे की रोशनी', '房间照明', '房間照明'),

  useName: T<(key: string) => string>(
    useKo, useEn, useEs, usePt, useJa, useDe, useFr, useHi, useZh, useTw,
  ),

  sourceName: T<(key: string) => string>(
    pick({ led: 'LED', fluorescent: '형광등', halogen: '할로겐', incandescent: '백열전구' }),
    pick({ led: 'LED', fluorescent: 'fluorescent', halogen: 'halogen', incandescent: 'incandescent' }),
    pick({ led: 'LED', fluorescent: 'fluorescente', halogen: 'halógena', incandescent: 'incandescente' }),
    pick({ led: 'LED', fluorescent: 'fluorescente', halogen: 'halógena', incandescent: 'incandescente' }),
    pick({ led: 'LED', fluorescent: '蛍光灯', halogen: 'ハロゲン', incandescent: '白熱電球' }),
    pick({ led: 'LED', fluorescent: 'Leuchtstoff', halogen: 'Halogen', incandescent: 'Glühlampe' }),
    pick({ led: 'LED', fluorescent: 'fluorescent', halogen: 'halogène', incandescent: 'incandescence' }),
    pick({ led: 'LED', fluorescent: 'फ़्लोरेसेंट', halogen: 'हैलोजन', incandescent: 'इनकैंडेसेंट' }),
    pick({ led: 'LED', fluorescent: '荧光灯', halogen: '卤素灯', incandescent: '白炽灯' }),
    pick({ led: 'LED', fluorescent: '螢光燈', halogen: '鹵素燈', incandescent: '白熾燈' }),
  ),

  hubTitle: T(
    '방 밝기 160칸 — 20제곱미터 거실은 3000루멘',
    '160 lighting figures — a 20 m² living room needs 3000 lumens',
    '160 cálculos de luz — un salón de 20 m² pide 3000 lúmenes',
    '160 cálculos de luz — uma sala de 20 m² pede 3000 lúmens',
    '部屋の明るさ160マス — 20平方メートルのリビングは3000ルーメン',
    '160 Beleuchtungswerte — ein 20-m²-Wohnzimmer braucht 3000 Lumen',
    '160 calculs d’éclairage — un salon de 20 m² demande 3000 lumens',
    '160 रोशनी गणनाएँ — 20 m² की बैठक को 3000 लुमेन चाहिए',
    '160 个照明数值 — 20 平方米客厅需要 3000 流明',
    '160 個照明數值 — 20 平方公尺客廳需要 3000 流明',
  ),

  hubLead: T(
    '방 넓이 20가지와 쓰임 8가지가 만나는 칸마다 필요한 루멘과 광원별 소비 전력을 계산했습니다. 와트는 밝기가 아니라 전기 먹는 양이라, 시작은 언제나 루멘입니다.',
    'For every meeting of 20 room sizes and 8 uses: the lumens you need and what each kind of lamp burns to make them. Watts measure electricity, not brightness, so the calculation starts from lumens.',
    'Para cada cruce de 20 tamaños de habitación y 8 usos: los lúmenes necesarios y lo que consume cada tipo de lámpara. Los vatios miden electricidad, no brillo, así que se empieza por los lúmenes.',
    'Para cada cruzamento de 20 tamanhos de cômodo e 8 usos: os lúmens necessários e o que cada tipo de lâmpada consome. Watts medem eletricidade, não brilho, então começa-se pelos lúmens.',
    '部屋の広さ20通りと用途8通りが出会う各マスの必要ルーメンと、光源ごとの消費電力を計算しました。ワットは明るさではなく電気の量なので、出発点はいつもルーメンです。',
    'Für jede Begegnung von 20 Raumgrößen und 8 Nutzungen: die nötigen Lumen und was jede Lampenart dafür verbraucht. Watt messen Strom, nicht Helligkeit — gerechnet wird darum ab Lumen.',
    'Pour chaque croisement de 20 surfaces et 8 usages : les lumens nécessaires et ce que chaque type de lampe consomme. Le watt mesure l’électricité, pas la lumière : on part donc des lumens.',
    '20 कमरा आकारों और 8 उपयोगों के हर मेल के लिए ज़रूरी लुमेन और हर तरह के लैंप की खपत। वाट बिजली नापता है, चमक नहीं — इसलिए शुरुआत लुमेन से होती है।',
    '20 种房间面积与 8 种用途交汇的每一格都算出所需流明，以及各类光源为此要耗多少电。瓦数量的是电，不是亮度，所以一切从流明开始。',
    '20 種房間面積與 8 種用途交匯的每一格都算出所需流明，以及各類光源為此要耗多少電。瓦數量的是電，不是亮度，所以一切從流明開始。',
  ),

  luxLabel: T('바닥에 닿는 밝기', 'Light reaching the floor', 'Luz que llega al suelo', 'Luz que chega ao chão', '床に届く明るさ', 'Licht am Boden', 'Lumière au sol', 'फ़र्श तक पहुँचती रोशनी', '照到地面的照度', '照到地面的照度'),
  lumenLabel: T('필요한 빛의 양', 'Light you need', 'Luz que hace falta', 'Luz necessária', '必要な光の量', 'Benötigtes Licht', 'Lumière nécessaire', 'ज़रूरी रोशनी', '所需光通量', '所需光通量'),
  areaLabel: T('방 넓이', 'Room size', 'Tamaño de la habitación', 'Tamanho do cômodo', '部屋の広さ', 'Raumgröße', 'Surface de la pièce', 'कमरे का आकार', '房间面积', '房間面積'),
  pyeongLabel: T('평으로', 'In pyeong', 'En pyeong', 'Em pyeong', '坪で', 'In Pyeong', 'En pyeong', 'प्योंग में', '换成坪', '換成坪'),
  bulbLabel: T('800루멘 전구로', 'In 800-lumen bulbs', 'En bombillas de 800 lúmenes', 'Em lâmpadas de 800 lúmens', '800ルーメンの電球で', 'In 800-Lumen-Lampen', 'En ampoules de 800 lumens', '800 लुमेन बल्बों में', '按 800 流明灯泡', '按 800 流明燈泡'),
  monthlyLabel: T('한 달 전기', 'A month of electricity', 'Electricidad al mes', 'Eletricidade por mês', '1か月の電気', 'Strom im Monat', 'Électricité par mois', 'महीने की बिजली', '每月耗电', '每月耗電'),
  wastedLabel: T('백열이면 더 드는 전력', 'Extra watts if incandescent', 'Vatios de más con incandescente', 'Watts a mais com incandescente', '白熱なら余分な電力', 'Mehrverbrauch mit Glühlampe', 'Watts en plus en incandescence', 'इनकैंडेसेंट पर अतिरिक्त वाट', '换白炽灯多耗的功率', '換白熾燈多耗的功率'),
  useLabel: T('쓰임', 'What the room is for', 'Uso de la habitación', 'Uso do cômodo', '用途', 'Nutzung', 'Usage', 'कमरे का उपयोग', '房间用途', '房間用途'),

  wattTitle: T('와트는 밝기가 아닙니다', 'Watts are not brightness', 'Los vatios no son brillo', 'Watts não são brilho', 'ワットは明るさではありません', 'Watt ist keine Helligkeit', 'Le watt n’est pas la luminosité', 'वाट चमक नहीं है', '瓦数不是亮度', '瓦數不是亮度'),

  wattNote: T(
    '와트는 전기를 얼마나 먹는지이고, 밝기는 루멘입니다. 예전에는 백열전구뿐이라 60W라고 하면 밝기가 짐작됐지만, 지금은 같은 800루멘을 LED가 8W로, 백열이 62W로 냅니다. 전구를 고를 때 봐야 할 숫자는 상자 앞의 와트가 아니라 루멘입니다.',
    'Watts say how much electricity a lamp draws; lumens say how bright it is. When every bulb was incandescent, "60 W" implied a brightness — but today an LED makes the same 800 lumens on 8 W where a filament needs 62 W. The number to read on the box is the lumens.',
    'Los vatios dicen cuánta electricidad consume una lámpara; los lúmenes, cuánto alumbra. Cuando todo era incandescente, «60 W» sugería un brillo, pero hoy un LED da los mismos 800 lúmenes con 8 W frente a los 62 W del filamento. El número a mirar en la caja son los lúmenes.',
    'Watts dizem quanta eletricidade a lâmpada consome; lúmens dizem o quanto ela ilumina. Quando tudo era incandescente, "60 W" sugeria um brilho, mas hoje um LED faz os mesmos 800 lúmens com 8 W, contra 62 W do filamento. O número a ler na caixa são os lúmens.',
    'ワットは電気をどれだけ使うかで、明るさはルーメンです。白熱電球しか無かった頃は60Wと言えば明るさが察せましたが、今は同じ800ルーメンをLEDが8W、白熱が62Wで出します。箱で見るべき数字はワットではなくルーメンです。',
    'Watt sagt, wie viel Strom eine Lampe zieht; Lumen sagt, wie hell sie ist. Als es nur Glühlampen gab, hieß "60 W" eine bestimmte Helligkeit — heute schafft eine LED dieselben 800 Lumen mit 8 W, der Glühfaden braucht 62 W. Auf der Packung zählt die Lumenzahl.',
    'Le watt dit combien d’électricité la lampe consomme ; le lumen, combien elle éclaire. Quand tout était incandescent, « 60 W » évoquait une luminosité — aujourd’hui une LED donne les mêmes 800 lumens avec 8 W contre 62 W pour un filament. Le chiffre à lire sur la boîte, ce sont les lumens.',
    'वाट बताता है कि लैंप कितनी बिजली लेता है; लुमेन बताता है कि वह कितना उजाला देता है। जब सिर्फ़ इनकैंडेसेंट थे तब "60 W" से चमक का अंदाज़ा लगता था, पर आज वही 800 लुमेन LED 8 W में देती है और फ़िलामेंट को 62 W चाहिए। डिब्बे पर देखने लायक संख्या लुमेन है।',
    '瓦数说的是耗电多少，亮度用流明表示。过去只有白炽灯，说“60W”就能猜出亮度；如今同样的 800 流明，LED 用 8W，白炽灯要 62W。挑灯泡该看的是包装上的流明，不是瓦数。',
    '瓦數說的是耗電多少，亮度用流明表示。過去只有白熾燈，說「60W」就能猜出亮度；如今同樣的 800 流明，LED 用 8W，白熾燈要 62W。挑燈泡該看的是包裝上的流明，不是瓦數。',
  ),

  luxTitle: T('넓이가 아니라 바닥이 기준입니다', 'The floor is what gets measured', 'Se mide el suelo, no la habitación', 'Mede-se o chão, não o cômodo', '基準は床に届く明るさです', 'Gemessen wird am Boden', 'C’est le sol que l’on mesure', 'मापा फ़र्श जाता है', '标准是照到地面的亮度', '標準是照到地面的亮度'),

  luxNote: T(
    '럭스는 1제곱미터에 1루멘이 닿은 상태입니다. 그래서 필요한 빛은 럭스에 넓이를 곱하면 나옵니다 — 150럭스가 필요한 20제곱미터 거실은 3000루멘입니다. 같은 방이라도 무엇을 하느냐에 따라 열 배 넘게 달라집니다. 복도는 75럭스면 되고, 바느질이나 납땜은 1000럭스를 봅니다.',
    'One lux is one lumen landing on one square metre, so the light you need is simply lux times area — a 20 m² living room at 150 lux wants 3000 lumens. The same room can differ more than tenfold by task: a hallway is fine at 75 lux, while sewing or soldering wants 1000.',
    'Un lux es un lumen que cae sobre un metro cuadrado, así que la luz necesaria es lux por superficie: un salón de 20 m² a 150 lux pide 3000 lúmenes. La misma habitación varía más de diez veces según la tarea: un pasillo se apaña con 75 lux, coser o soldar pide 1000.',
    'Um lux é um lúmen caindo sobre um metro quadrado, então a luz necessária é lux vezes área: uma sala de 20 m² a 150 lux pede 3000 lúmens. O mesmo cômodo varia mais de dez vezes conforme a tarefa: um corredor se resolve com 75 lux, costurar ou soldar pede 1000.',
    'ルクスは1平方メートルに1ルーメンが届いた状態です。だから必要な光はルクスに広さを掛ければ出ます — 150ルクスが要る20平方メートルのリビングは3000ルーメンです。同じ部屋でも何をするかで10倍以上変わります。廊下は75ルクスで足り、裁縫やはんだ付けは1000ルクスを見ます。',
    'Ein Lux ist ein Lumen auf einem Quadratmeter. Das nötige Licht ist deshalb Lux mal Fläche — ein 20-m²-Wohnzimmer bei 150 Lux will 3000 Lumen. Je nach Tätigkeit unterscheidet sich derselbe Raum um mehr als das Zehnfache: ein Flur reicht mit 75 Lux, Nähen oder Löten verlangt 1000.',
    'Un lux, c’est un lumen reçu sur un mètre carré : la lumière nécessaire vaut donc lux × surface — un salon de 20 m² à 150 lux demande 3000 lumens. Une même pièce varie de plus du décuple selon la tâche : un couloir se contente de 75 lux, coudre ou souder en réclame 1000.',
    'एक लक्स यानी एक वर्ग मीटर पर पड़ता एक लुमेन। इसलिए ज़रूरी रोशनी लक्स गुणा क्षेत्रफल है — 150 लक्स वाली 20 m² बैठक को 3000 लुमेन चाहिए। एक ही कमरा काम के हिसाब से दस गुना से अधिक बदलता है: गलियारे को 75 लक्स काफ़ी है, सिलाई या सोल्डरिंग को 1000।',
    '一勒克斯就是一平方米上落到一流明。所以所需的光就是照度乘面积——需要 150 勒克斯的 20 平方米客厅要 3000 流明。同一个房间因用途不同可差十倍以上：走廊 75 勒克斯就够，缝纫或焊接要看 1000。',
    '一勒克斯就是一平方公尺上落到一流明。所以所需的光就是照度乘面積——需要 150 勒克斯的 20 平方公尺客廳要 3000 流明。同一個房間因用途不同可差十倍以上：走廊 75 勒克斯就夠，縫紉或焊接要看 1000。',
  ),

  spreadTitle: T('한 개보다 여러 개가 낫습니다', 'Several lamps beat one', 'Mejor varias lámparas que una', 'Melhor várias lâmpadas que uma', '1つより複数のほうが良い', 'Mehrere Leuchten schlagen eine', 'Plusieurs lampes valent mieux qu’une', 'एक से बेहतर कई', '多盏胜过一盏', '多盞勝過一盞'),

  spreadNote: T(
    '같은 루멘이라도 한 곳에 몰아 두면 그 아래만 밝고 구석은 어둡습니다. 800루멘 전구 여러 개로 나눠 다는 편이 그림자도 덜 지고, 하나가 나가도 방이 깜깜해지지 않습니다.',
    'The same lumens crammed into one fitting light the spot beneath and leave the corners dark. Splitting them across several 800-lumen lamps softens shadows, and one failure no longer means a dark room.',
    'Los mismos lúmenes en un solo punto alumbran debajo y dejan las esquinas oscuras. Repartirlos en varias lámparas de 800 lúmenes suaviza las sombras, y si una falla la habitación no queda a oscuras.',
    'Os mesmos lúmens num único ponto iluminam embaixo e deixam os cantos escuros. Dividi-los em várias lâmpadas de 800 lúmens suaviza sombras, e se uma queimar o cômodo não fica às escuras.',
    '同じルーメンでも1か所に集めると真下だけ明るく隅が暗くなります。800ルーメンの電球を何個かに分けたほうが影も薄く、1つ切れても部屋が真っ暗になりません。',
    'Dieselben Lumen in einer Leuchte erhellen die Stelle darunter und lassen Ecken dunkel. Auf mehrere 800-Lumen-Lampen verteilt, werden Schatten weicher, und ein Ausfall verdunkelt nicht den ganzen Raum.',
    'Les mêmes lumens concentrés en un point éclairent le dessous et laissent les coins sombres. Répartis sur plusieurs lampes de 800 lumens, les ombres s’adoucissent et une panne ne plonge pas la pièce dans le noir.',
    'वही लुमेन एक ही जगह इकट्ठे हों तो नीचे उजाला और कोने अँधेरे रहते हैं। 800 लुमेन के कई लैंप में बाँटने से परछाइयाँ नरम होती हैं और एक बुझने पर कमरा अँधेरा नहीं होता।',
    '同样的流明集中在一处，只有正下方亮、角落发暗。分成几个 800 流明的灯，阴影更柔和，坏掉一个也不至于全屋漆黑。',
    '同樣的流明集中在一處，只有正下方亮、角落發暗。分成幾個 800 流明的燈，陰影更柔和，壞掉一個也不至於全屋漆黑。',
  ),

  costTitle: T('전기는 광원에서 갈립니다', 'The lamp type decides the bill', 'El tipo de lámpara decide la factura', 'O tipo de lâmpada decide a conta', '電気代は光源で決まります', 'Die Lampenart entscheidet die Rechnung', 'Le type de lampe fait la facture', 'बिजली का बिल लैंप तय करता है', '电费由光源决定', '電費由光源決定'),

  costNote: T(
    '루멘이 같으면 밝기는 같고, 달라지는 것은 전기입니다. LED는 1와트로 100루멘을 내고 백열은 13루멘을 냅니다 — 여덟 배 가까이 차이입니다. 아래 한 달 값은 하루 다섯 시간을 서른 날 켠 셈입니다.',
    'Equal lumens mean equal brightness; what changes is the electricity. An LED makes 100 lumens per watt, a filament 13 — nearly eight times apart. The monthly figure below assumes five hours a day for thirty days.',
    'A igualdad de lúmenes, el brillo es el mismo; lo que cambia es la electricidad. Un LED da 100 lúmenes por vatio y un filamento 13: casi ocho veces. La cifra mensual supone cinco horas al día durante treinta días.',
    'Com lúmens iguais, o brilho é o mesmo; o que muda é a eletricidade. Um LED faz 100 lúmens por watt e um filamento 13 — quase oito vezes. O valor mensal supõe cinco horas por dia durante trinta dias.',
    'ルーメンが同じなら明るさは同じで、変わるのは電気です。LEDは1ワットで100ルーメン、白熱は13ルーメンを出します — 8倍近い差です。下の1か月の値は1日5時間を30日つけた場合です。',
    'Gleiche Lumen heißen gleiche Helligkeit; verschieden ist der Strom. Eine LED macht 100 Lumen je Watt, ein Glühfaden 13 — fast das Achtfache. Der Monatswert unten rechnet mit fünf Stunden täglich an dreißig Tagen.',
    'À lumens égaux, la luminosité est la même ; c’est l’électricité qui change. Une LED fait 100 lumens par watt, un filament 13 — près de huit fois moins. Le chiffre mensuel suppose cinq heures par jour pendant trente jours.',
    'लुमेन बराबर हों तो चमक बराबर; बदलती है बिजली। LED एक वाट में 100 लुमेन देती है और फ़िलामेंट 13 — लगभग आठ गुना अंतर। नीचे का मासिक आँकड़ा रोज़ पाँच घंटे, तीस दिन मानकर है।',
    '流明相同，亮度就相同，变的是电。LED 一瓦出 100 流明，白炽灯只有 13 流明，相差近八倍。下面的月度数字按每天五小时、三十天计算。',
    '流明相同，亮度就相同，變的是電。LED 一瓦出 100 流明，白熾燈只有 13 流明，相差近八倍。下面的月度數字按每天五小時、三十天計算。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '천장이 높거나 벽이 어두우면 같은 루멘으로도 어둡게 느껴집니다. 갓이 빛을 가두는 등기구라면 더 필요하고, 책상 스탠드처럼 필요한 곳만 밝히는 방법도 있습니다.',
    'A high ceiling or dark walls make the same lumens feel dimmer. A shade that traps light asks for more, and sometimes a desk lamp on the task beats lighting the whole room.',
    'Un techo alto o paredes oscuras hacen que los mismos lúmenes parezcan menos. Una pantalla que atrapa luz exige más, y a veces un flexo sobre la tarea vale más que iluminar toda la habitación.',
    'Um teto alto ou paredes escuras fazem os mesmos lúmens parecerem menos. Uma cúpula que prende luz exige mais, e às vezes uma luminária de mesa sobre a tarefa vale mais que iluminar o cômodo todo.',
    '天井が高かったり壁が暗かったりすると、同じルーメンでも暗く感じます。光を抱え込む傘の器具ならもっと必要ですし、机の上だけを照らすスタンドという手もあります。',
    'Hohe Decken oder dunkle Wände lassen dieselben Lumen dunkler wirken. Ein Schirm, der Licht einsperrt, verlangt mehr — und manchmal schlägt eine Schreibtischleuchte die Deckenbeleuchtung.',
    'Un plafond haut ou des murs sombres rendent les mêmes lumens plus faibles. Un abat-jour qui retient la lumière en demande davantage, et parfois une lampe de bureau vaut mieux qu’éclairer toute la pièce.',
    'ऊँची छत या गहरे रंग की दीवारें हों तो वही लुमेन कम लगते हैं। रोशनी रोकने वाला शेड हो तो और चाहिए, और कभी-कभी पूरे कमरे के बजाय मेज़ पर लैंप बेहतर रहता है।',
    '天花板高或墙面偏暗时，同样的流明会显得更暗。灯罩会吃掉光，就要多算一些；有时用台灯照亮手边，比把整间点亮更划算。',
    '天花板高或牆面偏暗時，同樣的流明會顯得更暗。燈罩會吃掉光，就要多算一些；有時用檯燈照亮手邊，比把整間點亮更划算。',
  ),

  tableTitle: T('넓이와 쓰임으로 찾기', 'Find it by size and use', 'Búscalo por tamaño y uso', 'Ache por tamanho e uso', '広さと用途から探す', 'Nach Größe und Nutzung suchen', 'Chercher par surface et usage', 'आकार और उपयोग से देखें', '按面积和用途查找', '按面積和用途查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  useRowTitle: T('같은 방, 다른 쓰임', 'Same room, other uses', 'Misma habitación, otros usos', 'Mesmo cômodo, outros usos', '同じ部屋、別の用途', 'Gleicher Raum, andere Nutzung', 'Même pièce, autres usages', 'वही कमरा, दूसरे उपयोग', '同一房间，不同用途', '同一房間，不同用途'),
  areaRowTitle: T('같은 쓰임, 다른 넓이', 'Same use, other sizes', 'Mismo uso, otros tamaños', 'Mesmo uso, outros tamanhos', '同じ用途、別の広さ', 'Gleiche Nutzung, andere Größen', 'Même usage, autres surfaces', 'वही उपयोग, दूसरे आकार', '同一用途，不同面积', '同一用途，不同面積'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '필요한 빛은 럭스에 넓이를 곱한 값입니다. 럭스는 쓰임이 정합니다.',
      '와트는 그 빛을 광원의 효율로 나눈 값일 뿐, 밝기가 아닙니다.',
      '전구 개수는 800루멘 하나를 기준으로 올림한 것입니다.',
      '천장 높이·벽 색·등기구 갓은 이 셈에 들어 있지 않습니다.',
    ],
    [
      'The light you need is lux times floor area; the use decides the lux.',
      'Watts are only that light divided by the lamp’s efficacy — not a measure of brightness.',
      'Bulb counts round up from one 800-lumen lamp.',
      'Ceiling height, wall colour and shades are not in this calculation.',
    ],
    [
      'La luz necesaria es lux por superficie; el uso decide los lux.',
      'Los vatios son solo esa luz dividida por la eficacia de la lámpara, no una medida de brillo.',
      'El número de bombillas se redondea al alza tomando 800 lúmenes por unidad.',
      'La altura del techo, el color de las paredes y las pantallas no entran en el cálculo.',
    ],
    [
      'A luz necessária é lux vezes área; o uso decide os lux.',
      'Watts são só essa luz dividida pela eficácia da lâmpada — não medem brilho.',
      'A contagem de lâmpadas arredonda para cima tomando 800 lúmens por unidade.',
      'Altura do teto, cor das paredes e cúpulas não entram nesta conta.',
    ],
    [
      '必要な光はルクスに広さを掛けた値で、ルクスは用途が決めます。',
      'ワットはその光を光源の効率で割っただけの値で、明るさではありません。',
      '電球の数は800ルーメン1個を基準に切り上げた値です。',
      '天井の高さ・壁の色・器具の傘はこの計算に入っていません。',
    ],
    [
      'Das nötige Licht ist Lux mal Fläche; die Nutzung bestimmt die Lux.',
      'Watt ist nur dieses Licht geteilt durch die Lichtausbeute — kein Maß für Helligkeit.',
      'Die Lampenzahl rundet auf, gerechnet mit 800 Lumen je Stück.',
      'Deckenhöhe, Wandfarbe und Schirme stecken nicht in dieser Rechnung.',
    ],
    [
      'La lumière nécessaire vaut lux × surface ; l’usage fixe les lux.',
      'Le watt n’est que cette lumière divisée par l’efficacité de la lampe, pas une mesure de luminosité.',
      'Le nombre d’ampoules est arrondi au-dessus, à 800 lumens l’unité.',
      'Hauteur sous plafond, couleur des murs et abat-jour ne sont pas dans le calcul.',
    ],
    [
      'ज़रूरी रोशनी लक्स गुणा क्षेत्रफल है; लक्स उपयोग तय करता है।',
      'वाट सिर्फ़ उस रोशनी को लैंप की दक्षता से भाग देने पर मिलता है — यह चमक का माप नहीं।',
      'बल्बों की गिनती 800 लुमेन प्रति बल्ब मानकर ऊपर की ओर की गई है।',
      'छत की ऊँचाई, दीवार का रंग और शेड इस गणना में नहीं हैं।',
    ],
    [
      '所需的光是照度乘面积，照度由用途决定。',
      '瓦数只是把这份光除以光源效率得到的，并不衡量亮度。',
      '灯泡数量按每个 800 流明向上取整。',
      '层高、墙色和灯罩没有算进来。',
    ],
    [
      '所需的光是照度乘面積，照度由用途決定。',
      '瓦數只是把這份光除以光源效率得到的，並不衡量亮度。',
      '燈泡數量按每個 800 流明向上取整。',
      '樓高、牆色和燈罩沒有算進來。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '방 밝기 계산 — 넓이와 쓰임으로 필요한 루멘',
    'Room lighting calculator — lumens by size and use',
    'Calculadora de iluminación — lúmenes por tamaño y uso',
    'Calculadora de iluminação — lúmens por tamanho e uso',
    '部屋の明るさ計算 — 広さと用途で必要ルーメン',
    'Beleuchtung berechnen — Lumen nach Größe und Nutzung',
    'Calcul d’éclairage — lumens selon surface et usage',
    'कमरा रोशनी कैलकुलेटर — आकार और उपयोग से लुमेन',
    '房间照明计算 — 按面积和用途算流明',
    '房間照明計算 — 按面積和用途算流明',
  ),

  hubMetaDesc: T(
    '20제곱미터 거실은 3000루멘, LED로 30와트입니다. 방 넓이와 쓰임이 만나는 160칸마다 필요한 루멘·전구 개수·광원별 소비 전력을 계산했습니다.',
    'A 20 m² living room needs 3000 lumens — 30 watts of LED. For all 160 pairings of room size and use: the lumens, the number of bulbs, and what each lamp type burns.',
    'Un salón de 20 m² pide 3000 lúmenes, 30 vatios de LED. Para los 160 cruces de tamaño y uso: lúmenes, número de bombillas y consumo de cada tipo de lámpara.',
    'Uma sala de 20 m² pede 3000 lúmens — 30 watts de LED. Para os 160 cruzamentos de tamanho e uso: lúmens, número de lâmpadas e consumo de cada tipo.',
    '20平方メートルのリビングは3000ルーメン、LEDなら30ワットです。広さと用途が出会う160マスごとの必要ルーメン・電球の数・光源別の消費電力を計算しました。',
    'Ein 20-m²-Wohnzimmer braucht 3000 Lumen — 30 Watt LED. Für alle 160 Kombinationen aus Raumgröße und Nutzung: Lumen, Lampenzahl und Verbrauch je Lampenart.',
    'Un salon de 20 m² demande 3000 lumens, soit 30 watts de LED. Pour les 160 croisements surface × usage : lumens, nombre d’ampoules et consommation par type de lampe.',
    '20 m² की बैठक को 3000 लुमेन चाहिए — LED में 30 वाट। आकार और उपयोग के सभी 160 मेलों के लुमेन, बल्बों की संख्या और हर लैंप की खपत।',
    '20 平方米客厅需要 3000 流明，用 LED 是 30 瓦。面积与用途交汇的 160 格，每格的所需流明、灯泡数量和各类光源的耗电。',
    '20 平方公尺客廳需要 3000 流明，用 LED 是 30 瓦。面積與用途交匯的 160 格，每格的所需流明、燈泡數量和各類光源的耗電。',
  ),

  desc: T<(f: LumenFacts) => string>(
    f => `${f.lux}럭스가 필요한 방이라 ${f.lumen}루멘이 있어야 합니다. LED로는 ${f.watts[0].watt}와트, 800루멘 전구로는 ${f.bulbs}개입니다.`,
    f => `A room at ${f.lux} lux needs ${f.lumen} lumens. That is ${f.watts[0].watt} watts of LED, or ${f.bulbs} bulbs of 800 lumens.`,
    f => `Una habitación de ${f.lux} lux necesita ${f.lumen} lúmenes: ${f.watts[0].watt} vatios de LED o ${f.bulbs} bombillas de 800 lúmenes.`,
    f => `Um cômodo de ${f.lux} lux precisa de ${f.lumen} lúmens: ${f.watts[0].watt} watts de LED ou ${f.bulbs} lâmpadas de 800 lúmens.`,
    f => `${f.lux}ルクスが要る部屋なので${f.lumen}ルーメンが必要です。LEDなら${f.watts[0].watt}ワット、800ルーメンの電球なら${f.bulbs}個です。`,
    f => `Ein Raum mit ${f.lux} Lux braucht ${f.lumen} Lumen — ${f.watts[0].watt} Watt LED oder ${f.bulbs} Lampen zu 800 Lumen.`,
    f => `Une pièce à ${f.lux} lux demande ${f.lumen} lumens : ${f.watts[0].watt} watts de LED, ou ${f.bulbs} ampoules de 800 lumens.`,
    f => `${f.lux} लक्स वाले कमरे को ${f.lumen} लुमेन चाहिए — LED में ${f.watts[0].watt} वाट, या 800 लुमेन के ${f.bulbs} बल्ब।`,
    f => `需要 ${f.lux} 勒克斯的房间要 ${f.lumen} 流明：LED 约 ${f.watts[0].watt} 瓦，或 ${f.bulbs} 个 800 流明的灯泡。`,
    f => `需要 ${f.lux} 勒克斯的房間要 ${f.lumen} 流明：LED 約 ${f.watts[0].watt} 瓦，或 ${f.bulbs} 個 800 流明的燈泡。`,
  ),

  metaTitle: T<(f: LumenFacts) => string>(
    f => `${f.cell.area}㎡ ${useKo(f.cell.use)} — ${f.lumen}루멘`,
    f => `${f.cell.area} m² ${useEn(f.cell.use)} — ${f.lumen} lumens`,
    f => `${f.cell.area} m² de ${useEs(f.cell.use)} — ${f.lumen} lúmenes`,
    f => `${f.cell.area} m² de ${usePt(f.cell.use)} — ${f.lumen} lúmens`,
    f => `${f.cell.area}㎡の${useJa(f.cell.use)} — ${f.lumen}ルーメン`,
    f => `${f.cell.area} m² ${useDe(f.cell.use)} — ${f.lumen} Lumen`,
    f => `${f.cell.area} m² de ${useFr(f.cell.use)} — ${f.lumen} lumens`,
    f => `${f.cell.area} m² ${useHi(f.cell.use)} — ${f.lumen} लुमेन`,
    f => `${f.cell.area}㎡${useZh(f.cell.use)} — ${f.lumen} 流明`,
    f => `${f.cell.area}㎡${useTw(f.cell.use)} — ${f.lumen} 流明`,
  ),

  metaDesc: T<(f: LumenFacts) => string>(
    f => `${f.cell.area}제곱미터(${f.pyeong}평) ${useKo(f.cell.use)}에는 ${f.lux}럭스, 즉 ${f.lumen}루멘이 필요합니다. LED ${f.watts[0].watt}W면 되고 백열이면 ${f.watts[3].watt}W가 듭니다.`,
    f => `A ${f.cell.area} m² ${useEn(f.cell.use)} wants ${f.lux} lux, or ${f.lumen} lumens. That is ${f.watts[0].watt} W of LED against ${f.watts[3].watt} W of incandescent.`,
    f => `Un ${useEs(f.cell.use)} de ${f.cell.area} m² pide ${f.lux} lux, o sea ${f.lumen} lúmenes: ${f.watts[0].watt} W de LED frente a ${f.watts[3].watt} W de incandescente.`,
    f => `Um ${usePt(f.cell.use)} de ${f.cell.area} m² pede ${f.lux} lux, ou ${f.lumen} lúmens: ${f.watts[0].watt} W de LED contra ${f.watts[3].watt} W de incandescente.`,
    f => `${f.cell.area}平方メートルの${useJa(f.cell.use)}には${f.lux}ルクス、つまり${f.lumen}ルーメンが必要です。LEDなら${f.watts[0].watt}W、白熱なら${f.watts[3].watt}Wかかります。`,
    f => `Ein ${useDe(f.cell.use)} mit ${f.cell.area} m² will ${f.lux} Lux, also ${f.lumen} Lumen: ${f.watts[0].watt} W LED gegenüber ${f.watts[3].watt} W Glühlampe.`,
    f => `Un ${useFr(f.cell.use)} de ${f.cell.area} m² demande ${f.lux} lux, soit ${f.lumen} lumens : ${f.watts[0].watt} W en LED contre ${f.watts[3].watt} W en incandescence.`,
    f => `${f.cell.area} m² के ${useHi(f.cell.use)} को ${f.lux} लक्स यानी ${f.lumen} लुमेन चाहिए — LED में ${f.watts[0].watt} W, इनकैंडेसेंट में ${f.watts[3].watt} W।`,
    f => `${f.cell.area} 平方米的${useZh(f.cell.use)}需要 ${f.lux} 勒克斯，即 ${f.lumen} 流明。LED 约 ${f.watts[0].watt}W，白炽灯要 ${f.watts[3].watt}W。`,
    f => `${f.cell.area} 平方公尺的${useTw(f.cell.use)}需要 ${f.lux} 勒克斯，即 ${f.lumen} 流明。LED 約 ${f.watts[0].watt}W，白熾燈要 ${f.watts[3].watt}W。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '거실에는 몇 루멘이 필요한가요?', a: '20제곱미터라면 3000루멘입니다. 거실 기준 150럭스에 넓이를 곱한 값이고, LED로는 30와트쯤입니다.' },
      { q: '루멘과 와트는 어떻게 다른가요?', a: '루멘이 밝기, 와트는 전기 먹는 양입니다. 같은 800루멘을 LED는 8W로, 백열은 62W로 냅니다.' },
      { q: '예전 60W 전구는 몇 루멘인가요?', a: '800루멘 남짓입니다. 그래서 LED를 살 때는 "60W 대체"보다 800루멘이라는 숫자를 보는 편이 정확합니다.' },
      { q: '공부방은 왜 더 밝아야 하나요?', a: '글자를 보려면 바닥이 아니라 책상이 밝아야 해서, 서재는 500럭스를 봅니다. 복도의 75럭스보다 여섯 배가 넘습니다.' },
      { q: '전구 하나로 몰아 달아도 되나요?', a: '루멘 합은 같지만 그 아래만 밝고 구석이 어두워집니다. 나눠 달면 그림자가 줄고 하나가 나가도 방이 깜깜해지지 않습니다.' },
    ],
    [
      { q: 'How many lumens does a living room need?', a: 'About 3000 for 20 m². The living-room target is 150 lux, multiplied by the floor area — roughly 30 watts of LED.' },
      { q: 'What is the difference between lumens and watts?', a: 'Lumens are brightness; watts are electricity. The same 800 lumens costs 8 W as LED and 62 W as a filament.' },
      { q: 'How many lumens was an old 60 W bulb?', a: 'Around 800. When buying LEDs, reading "800 lumens" is more reliable than "60 W equivalent".' },
      { q: 'Why does a study need more light?', a: 'Reading needs the desk lit, not the floor, so studies are set at 500 lux — more than six times a hallway’s 75.' },
      { q: 'Can I put it all in one fitting?', a: 'The lumens add up the same, but only the spot beneath gets bright. Splitting them softens shadows and one failure will not darken the room.' },
    ],
    [
      { q: '¿Cuántos lúmenes necesita un salón?', a: 'Unos 3000 para 20 m². El objetivo del salón son 150 lux por la superficie: alrededor de 30 vatios de LED.' },
      { q: '¿Qué diferencia hay entre lúmenes y vatios?', a: 'Los lúmenes son brillo; los vatios, electricidad. Los mismos 800 lúmenes cuestan 8 W en LED y 62 W con filamento.' },
      { q: '¿Cuántos lúmenes daba una bombilla de 60 W?', a: 'Unos 800. Al comprar LED conviene mirar «800 lúmenes» antes que «equivale a 60 W».' },
      { q: '¿Por qué un estudio necesita más luz?', a: 'Leer exige iluminar la mesa, no el suelo, así que se toman 500 lux: más de seis veces los 75 de un pasillo.' },
      { q: '¿Puedo poner todo en una sola lámpara?', a: 'La suma de lúmenes es igual, pero solo se ilumina lo de debajo. Repartirlas suaviza sombras y una avería no deja el cuarto a oscuras.' },
    ],
    [
      { q: 'Quantos lúmens uma sala precisa?', a: 'Cerca de 3000 para 20 m². A sala pede 150 lux vezes a área — algo como 30 watts de LED.' },
      { q: 'Qual a diferença entre lúmens e watts?', a: 'Lúmens são brilho; watts, eletricidade. Os mesmos 800 lúmens custam 8 W em LED e 62 W com filamento.' },
      { q: 'Quantos lúmens tinha a lâmpada de 60 W?', a: 'Cerca de 800. Ao comprar LED, ler "800 lúmens" é mais confiável que "equivale a 60 W".' },
      { q: 'Por que um escritório precisa de mais luz?', a: 'Ler exige a mesa iluminada, não o chão, então usa-se 500 lux — mais de seis vezes os 75 de um corredor.' },
      { q: 'Posso concentrar tudo numa lâmpada só?', a: 'A soma de lúmens é a mesma, mas só embaixo fica claro. Dividindo, as sombras suavizam e uma falha não escurece o cômodo.' },
    ],
    [
      { q: 'リビングには何ルーメン必要ですか？', a: '20平方メートルなら3000ルーメンです。リビングの目安150ルクスに広さを掛けた値で、LEDなら30ワットほどです。' },
      { q: 'ルーメンとワットはどう違いますか？', a: 'ルーメンが明るさ、ワットは電気の量です。同じ800ルーメンをLEDは8W、白熱は62Wで出します。' },
      { q: '昔の60W電球は何ルーメンですか？', a: '800ルーメンほどです。LEDを買うときは「60W相当」より800ルーメンという数字を見るほうが確かです。' },
      { q: '勉強部屋はなぜ明るくするのですか？', a: '文字を読むには床ではなく机が明るくなければならず、書斎は500ルクスを見ます。廊下の75ルクスの6倍以上です。' },
      { q: '1つにまとめてもよいですか？', a: 'ルーメンの合計は同じですが真下だけ明るくなります。分けると影が薄くなり、1つ切れても部屋が真っ暗になりません。' },
    ],
    [
      { q: 'Wie viele Lumen braucht ein Wohnzimmer?', a: 'Rund 3000 bei 20 m². Für Wohnzimmer gelten 150 Lux mal Fläche — etwa 30 Watt LED.' },
      { q: 'Was unterscheidet Lumen von Watt?', a: 'Lumen ist Helligkeit, Watt ist Strom. Dieselben 800 Lumen kosten als LED 8 W, als Glühlampe 62 W.' },
      { q: 'Wie viele Lumen hatte eine 60-W-Birne?', a: 'Etwa 800. Beim LED-Kauf ist "800 Lumen" verlässlicher als "entspricht 60 W".' },
      { q: 'Warum braucht ein Arbeitszimmer mehr Licht?', a: 'Lesen verlangt einen hellen Tisch, nicht einen hellen Boden — daher 500 Lux, mehr als das Sechsfache eines Flurs mit 75.' },
      { q: 'Darf alles in eine Leuchte?', a: 'Die Lumen summieren sich gleich, hell wird aber nur die Stelle darunter. Verteilt werden Schatten weicher, und ein Ausfall verdunkelt nicht alles.' },
    ],
    [
      { q: 'Combien de lumens pour un salon ?', a: 'Environ 3000 pour 20 m². Le salon vise 150 lux multipliés par la surface, soit à peu près 30 watts de LED.' },
      { q: 'Quelle différence entre lumens et watts ?', a: 'Le lumen mesure la lumière, le watt l’électricité. Les mêmes 800 lumens coûtent 8 W en LED et 62 W en filament.' },
      { q: 'Combien de lumens faisait une ampoule de 60 W ?', a: 'Environ 800. À l’achat d’une LED, « 800 lumens » est plus fiable que « équivalent 60 W ».' },
      { q: 'Pourquoi un bureau demande-t-il plus de lumière ?', a: 'Lire exige un plan de travail éclairé, pas le sol : on vise 500 lux, plus de six fois les 75 d’un couloir.' },
      { q: 'Puis-je tout mettre dans un seul luminaire ?', a: 'Le total de lumens ne change pas, mais seul le dessous est éclairé. Réparties, les ombres s’adoucissent et une panne ne plonge pas la pièce dans le noir.' },
    ],
    [
      { q: 'बैठक को कितने लुमेन चाहिए?', a: '20 m² के लिए लगभग 3000। बैठक का मानक 150 लक्स है, उसे क्षेत्रफल से गुणा करें — LED में करीब 30 वाट।' },
      { q: 'लुमेन और वाट में क्या अंतर है?', a: 'लुमेन चमक है, वाट बिजली। वही 800 लुमेन LED में 8 W और फ़िलामेंट में 62 W लेते हैं।' },
      { q: 'पुराना 60 W बल्ब कितने लुमेन का था?', a: 'लगभग 800। LED खरीदते समय "60 W के बराबर" से बेहतर है सीधे 800 लुमेन देखना।' },
      { q: 'अध्ययन कक्ष को ज़्यादा रोशनी क्यों?', a: 'पढ़ने के लिए मेज़ रोशन चाहिए, फ़र्श नहीं — इसलिए 500 लक्स, जो गलियारे के 75 से छह गुना से अधिक है।' },
      { q: 'क्या सब कुछ एक ही लैंप में लगा दें?', a: 'लुमेन का जोड़ वही रहता है, पर उजाला सिर्फ़ नीचे होता है। बाँटने से परछाइयाँ नरम होती हैं और एक बुझने पर कमरा अँधेरा नहीं होता।' },
    ],
    [
      { q: '客厅需要多少流明？', a: '20 平方米约 3000 流明。客厅按 150 勒克斯乘面积，用 LED 大约 30 瓦。' },
      { q: '流明和瓦有什么区别？', a: '流明是亮度，瓦是耗电。同样 800 流明，LED 用 8W，白炽灯要 62W。' },
      { q: '以前的 60W 灯泡是多少流明？', a: '大约 800 流明。买 LED 时，看“800 流明”比看“相当于 60W”更准。' },
      { q: '书房为什么要更亮？', a: '看字要亮的是桌面而不是地面，所以书房按 500 勒克斯，是走廊 75 勒克斯的六倍多。' },
      { q: '能不能都装在一盏灯上？', a: '流明总量一样，但只有正下方亮。分开装阴影更柔和，坏一个也不会全屋漆黑。' },
    ],
    [
      { q: '客廳需要多少流明？', a: '20 平方公尺約 3000 流明。客廳按 150 勒克斯乘面積，用 LED 大約 30 瓦。' },
      { q: '流明和瓦有什麼區別？', a: '流明是亮度，瓦是耗電。同樣 800 流明，LED 用 8W，白熾燈要 62W。' },
      { q: '以前的 60W 燈泡是多少流明？', a: '大約 800 流明。買 LED 時，看「800 流明」比看「相當於 60W」更準。' },
      { q: '書房為什麼要更亮？', a: '看字要亮的是桌面而不是地面，所以書房按 500 勒克斯，是走廊 75 勒克斯的六倍多。' },
      { q: '能不能都裝在一盞燈上？', a: '流明總量一樣，但只有正下方亮。分開裝陰影更柔和，壞一個也不會全屋漆黑。' },
    ],
  ),

  cellFaq: T<(f: LumenFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.area}제곱미터 ${useKo(f.cell.use)}에는 몇 루멘이 필요한가요?`, a: `${f.lumen}루멘입니다. ${f.lux}럭스에 넓이를 곱한 값이고, ${f.pyeong}평쯤 되는 방입니다.` },
      { q: `몇 와트짜리를 달아야 하나요?`, a: `LED로 ${f.watts[0].watt}W, 형광등이면 ${f.watts[1].watt}W입니다. 백열이면 ${f.watts[3].watt}W가 들어 ${f.wasted}W를 더 씁니다.` },
      { q: `전구는 몇 개가 필요한가요?`, a: `800루멘짜리로 ${f.bulbs}개입니다. 한 곳에 몰지 말고 나눠 다는 편이 그림자가 덜 집니다.` },
      { q: `전기는 얼마나 드나요?`, a: `LED로 하루 다섯 시간이면 한 달에 ${f.monthlyKwh}kWh입니다.` },
    ],
    f => [
      { q: `How many lumens for a ${f.cell.area} m² ${useEn(f.cell.use)}?`, a: `${f.lumen} lumens — ${f.lux} lux times the floor area.` },
      { q: `How many watts should the lamp be?`, a: `${f.watts[0].watt} W as LED, ${f.watts[1].watt} W as fluorescent. An incandescent would draw ${f.watts[3].watt} W — ${f.wasted} W more.` },
      { q: `How many bulbs do I need?`, a: `${f.bulbs} at 800 lumens each. Spread them out rather than stacking them in one fitting.` },
      { q: `What does it cost to run?`, a: `On LED at five hours a day, ${f.monthlyKwh} kWh a month.` },
    ],
    f => [
      { q: `¿Cuántos lúmenes para un ${useEs(f.cell.use)} de ${f.cell.area} m²?`, a: `${f.lumen} lúmenes: ${f.lux} lux por la superficie.` },
      { q: `¿De cuántos vatios debe ser la lámpara?`, a: `${f.watts[0].watt} W en LED y ${f.watts[1].watt} W en fluorescente. Una incandescente pediría ${f.watts[3].watt} W, ${f.wasted} W más.` },
      { q: `¿Cuántas bombillas hacen falta?`, a: `${f.bulbs} de 800 lúmenes. Mejor repartidas que todas en un mismo punto.` },
      { q: `¿Cuánto consume?`, a: `Con LED y cinco horas al día, ${f.monthlyKwh} kWh al mes.` },
    ],
    f => [
      { q: `Quantos lúmens para um ${usePt(f.cell.use)} de ${f.cell.area} m²?`, a: `${f.lumen} lúmens: ${f.lux} lux vezes a área.` },
      { q: `De quantos watts deve ser a lâmpada?`, a: `${f.watts[0].watt} W em LED e ${f.watts[1].watt} W em fluorescente. Uma incandescente puxaria ${f.watts[3].watt} W — ${f.wasted} W a mais.` },
      { q: `Quantas lâmpadas preciso?`, a: `${f.bulbs} de 800 lúmens. Melhor distribuídas do que todas num ponto só.` },
      { q: `Quanto consome?`, a: `Com LED e cinco horas por dia, ${f.monthlyKwh} kWh por mês.` },
    ],
    f => [
      { q: `${f.cell.area}平方メートルの${useJa(f.cell.use)}には何ルーメン必要ですか？`, a: `${f.lumen}ルーメンです。${f.lux}ルクスに広さを掛けた値です。` },
      { q: `何ワットの器具を付ければよいですか？`, a: `LEDで${f.watts[0].watt}W、蛍光灯で${f.watts[1].watt}Wです。白熱なら${f.watts[3].watt}Wかかり、${f.wasted}W余分に使います。` },
      { q: `電球は何個必要ですか？`, a: `800ルーメンのもので${f.bulbs}個です。1か所に集めず分けて付けるほうが影が薄くなります。` },
      { q: `電気はどれくらいかかりますか？`, a: `LEDで1日5時間なら1か月${f.monthlyKwh}kWhです。` },
    ],
    f => [
      { q: `Wie viele Lumen für ein ${f.cell.area} m² großes ${useDe(f.cell.use)}?`, a: `${f.lumen} Lumen — ${f.lux} Lux mal Fläche.` },
      { q: `Wie viel Watt sollte die Lampe haben?`, a: `${f.watts[0].watt} W als LED, ${f.watts[1].watt} W als Leuchtstoff. Eine Glühlampe zöge ${f.watts[3].watt} W — ${f.wasted} W mehr.` },
      { q: `Wie viele Lampen brauche ich?`, a: `${f.bulbs} mit je 800 Lumen. Besser verteilt als alle in einer Fassung.` },
      { q: `Was kostet der Betrieb?`, a: `Mit LED bei fünf Stunden täglich ${f.monthlyKwh} kWh im Monat.` },
    ],
    f => [
      { q: `Combien de lumens pour un ${useFr(f.cell.use)} de ${f.cell.area} m² ?`, a: `${f.lumen} lumens : ${f.lux} lux multipliés par la surface.` },
      { q: `Quelle puissance choisir ?`, a: `${f.watts[0].watt} W en LED, ${f.watts[1].watt} W en fluorescent. Une incandescente demanderait ${f.watts[3].watt} W, soit ${f.wasted} W de plus.` },
      { q: `Combien d’ampoules faut-il ?`, a: `${f.bulbs} de 800 lumens. Mieux vaut les répartir que les concentrer.` },
      { q: `Quelle consommation ?`, a: `En LED, cinq heures par jour, ${f.monthlyKwh} kWh par mois.` },
    ],
    f => [
      { q: `${f.cell.area} m² के ${useHi(f.cell.use)} को कितने लुमेन चाहिए?`, a: `${f.lumen} लुमेन — ${f.lux} लक्स गुणा क्षेत्रफल।` },
      { q: `कितने वाट का लैंप लगाएँ?`, a: `LED में ${f.watts[0].watt} W, फ़्लोरेसेंट में ${f.watts[1].watt} W। इनकैंडेसेंट ${f.watts[3].watt} W लेता — ${f.wasted} W ज़्यादा।` },
      { q: `कितने बल्ब चाहिए?`, a: `800 लुमेन वाले ${f.bulbs} बल्ब। एक ही जगह इकट्ठा करने के बजाय फैलाकर लगाएँ।` },
      { q: `बिजली कितनी लगेगी?`, a: `LED पर रोज़ पाँच घंटे चलाएँ तो महीने में ${f.monthlyKwh} kWh।` },
    ],
    f => [
      { q: `${f.cell.area} 平方米的${useZh(f.cell.use)}需要多少流明？`, a: `${f.lumen} 流明，即 ${f.lux} 勒克斯乘面积。` },
      { q: `该装多少瓦的灯？`, a: `LED 约 ${f.watts[0].watt}W，荧光灯 ${f.watts[1].watt}W。白炽灯要 ${f.watts[3].watt}W，多耗 ${f.wasted}W。` },
      { q: `需要几个灯泡？`, a: `按 800 流明算是 ${f.bulbs} 个。分散安装比集中一处更好。` },
      { q: `耗电多少？`, a: `用 LED 每天开五小时，一个月约 ${f.monthlyKwh} 度。` },
    ],
    f => [
      { q: `${f.cell.area} 平方公尺的${useTw(f.cell.use)}需要多少流明？`, a: `${f.lumen} 流明，即 ${f.lux} 勒克斯乘面積。` },
      { q: `該裝多少瓦的燈？`, a: `LED 約 ${f.watts[0].watt}W，螢光燈 ${f.watts[1].watt}W。白熾燈要 ${f.watts[3].watt}W，多耗 ${f.wasted}W。` },
      { q: `需要幾個燈泡？`, a: `按 800 流明算是 ${f.bulbs} 個。分散安裝比集中一處更好。` },
      { q: `耗電多少？`, a: `用 LED 每天開五小時，一個月約 ${f.monthlyKwh} 度。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const LUMEN_UI: L<LumenUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<LumenUI>;
