/**
 * 반지 사이즈 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "나라별 표를 외울 일이 아니다"이다. 손가락에 감기는
 * 내주 하나만 있으면 미국 번호·일본·한국 호수·EU(ISO 8653)가 산식으로 나온다.
 * 그래서 문구도 표를 읽는 법이 아니라 **규칙**을 적는다.
 *
 * 영국 문자 표기는 비워 두었고, 왜 비웠는지를 ukNote가 화면에서 밝힌다 —
 * 없는 것을 조용히 없애면 읽는 사람은 우리가 잊은 줄 안다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { RingFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface RingUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  mmLabel: string;
  diameterLabel: string;
  inchLabel: string;
  usLabel: string;
  jpLabel: string;
  isoLabel: string;
  nearestLabel: string;
  gapLabel: string;
  bandLabel: string;
  /** 손가락 자리 네 구간의 이름 — list.ts의 BANDS와 같은 순서다 */
  bandNames: string[];

  ruleTitle: string;
  ruleNote: string;
  usTitle: string;
  usNote: string;
  jpTitle: string;
  jpNote: string;
  isoTitle: string;
  isoNote: string;
  ukTitle: string;
  ukNote: string;
  measureTitle: string;
  measureNote: string;

  tableTitle: string;
  neighbourTitle: string;
  stepTitle: string;
  prevLabel: string;
  nextLabel: string;

  desc: (f: RingFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: RingFacts) => string;
  metaDesc: (f: RingFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: RingFacts) => FaqItem[];
}

/** 차이는 부호를 붙여 적는다 — "+0.14mm"와 "-0.13mm"가 올릴지 내릴지를 말해 준다 */
export const signed = (x: number): string => (x > 0 ? `+${x}` : `${x}`);

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/**
 * 손가락 자리 네 구간의 이름 — list.ts의 BANDS와 같은 순서다.
 *
 * SPEC 밖에 둔 이유는 낱장 문답이 이 이름을 문장 안에 넣기 때문이다. SPEC 안에서
 * 자기를 가리키면 읽는 사람이 초기화 순서를 따져 봐야 한다.
 */
const BAND_NAMES: L<string[]> = T<string[]>(
  ['아동·새끼손가락', '가장 흔한 구간', '큰 손·남성 약손가락', '엄지·확장 규격'],
  ['Children and little finger', 'The common range', 'Larger hands', 'Thumb and extended sizes'],
  ['Niños y dedo pequeño', 'El tramo más común', 'Manos grandes', 'Pulgar y tallas extendidas'],
  ['Crianças e dedo mínimo', 'A faixa mais comum', 'Mãos grandes', 'Polegar e tamanhos estendidos'],
  ['子ども・小指', 'もっとも多い範囲', '大きな手・男性の薬指', '親指・拡張サイズ'],
  ['Kinder und kleiner Finger', 'Der häufigste Bereich', 'Große Hände', 'Daumen und erweiterte Größen'],
  ['Enfants et petit doigt', 'La plage la plus courante', 'Grandes mains', 'Pouce et tailles étendues'],
  ['बच्चे और छोटी उँगली', 'सबसे आम दायरा', 'बड़े हाथ', 'अंगूठा और विस्तारित नाप'],
  ['儿童·小指', '最常见的区间', '大手·男性无名指', '拇指·扩展号'],
  ['兒童·小指', '最常見的區間', '大手·男性無名指', '拇指·擴展號'],
);

type Spec = { [K in keyof RingUI]: L<RingUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('반지 사이즈', 'Ring size', 'Talla de anillo', 'Tamanho de anel', '指輪のサイズ', 'Ringgröße', 'Taille de bague', 'अंगूठी का नाप', '戒指尺寸', '戒指尺寸'),

  hubTitle: T(
    '반지 사이즈 101칸 — 내주 52mm는 미국 6, 일본 12호',
    '101 ring sizes — 52 mm inside is US 6 and Japan 12',
    '101 tallas de anillo — 52 mm de interior son la 6 de EE. UU. y la 12 de Japón',
    '101 tamanhos de anel — 52 mm por dentro são o 6 dos EUA e o 12 do Japão',
    '指輪サイズ101マス — 内周52mmはUS 6、日本12号',
    '101 Ringgrößen — 52 mm Innenumfang sind US 6 und Japan 12',
    '101 tailles de bague — 52 mm de tour intérieur font du 6 US et du 12 japonais',
    'अंगूठी के 101 नाप — भीतरी घेरा 52 mm यानी US 6 और जापान 12',
    '戒指尺寸 101 格 — 内周 52mm 是美国 6 号、日本 12 号',
    '戒指尺寸 101 格 — 內周 52mm 是美國 6 號、日本 12 號',
  ),

  hubLead: T(
    '나라마다 부르는 법이 다르지만 재는 것은 하나입니다 — 손가락에 감기는 내주입니다. 그 값 하나에서 미국 번호와 일본·한국 호수, EU(ISO 8653)가 규칙으로 나옵니다. 내주 40.0mm부터 90.0mm까지 0.5mm 눈금으로 101칸을 계산해 두었습니다.',
    'Every country calls it something different, but only one thing is being measured — the inside circumference that wraps the finger. From that single number the US number, the Japanese and Korean size, and the EU (ISO 8653) size all follow by rule. All 101 cells from 40.0 mm to 90.0 mm in 0.5 mm steps are worked out here.',
    'Cada país lo llama de otra manera, pero lo que se mide es una sola cosa: la circunferencia interior que rodea el dedo. De ese único número salen por regla la talla de EE. UU., la de Japón y Corea y la de la UE (ISO 8653). Aquí están las 101 casillas, de 40,0 mm a 90,0 mm en pasos de 0,5 mm.',
    'Cada país chama de um jeito, mas o que se mede é uma coisa só: a circunferência interna que envolve o dedo. Desse único número saem por regra o tamanho dos EUA, o do Japão e da Coreia e o da UE (ISO 8653). Aqui estão as 101 casas, de 40,0 mm a 90,0 mm em passos de 0,5 mm.',
    '国ごとに呼び方は違いますが、測るものはひとつです — 指に巻きつく内周です。その数ひとつからUSの番号、日本・韓国の号数、EU(ISO 8653)がすべて規則で出ます。内周40.0mmから90.0mmまで0.5mm刻みで101マスを計算しました。',
    'Jedes Land nennt es anders, gemessen wird aber nur eines — der Innenumfang, der um den Finger läuft. Aus dieser einen Zahl folgen die US-Nummer, die Größe in Japan und Korea und die EU-Größe (ISO 8653) allein durch Rechnung. Alle 101 Zellen von 40,0 mm bis 90,0 mm in Schritten von 0,5 mm stehen hier.',
    'Chaque pays a son appellation, mais on ne mesure qu’une seule chose : le tour intérieur qui entoure le doigt. De ce seul nombre découlent par règle la taille US, celle du Japon et de la Corée, et celle de l’UE (ISO 8653). Les 101 cases, de 40,0 mm à 90,0 mm par pas de 0,5 mm, sont calculées ici.',
    'हर देश इसे अलग नाम से पुकारता है, पर नापी जाती है एक ही चीज़ — उँगली के चारों ओर का भीतरी घेरा। उसी एक संख्या से US का नंबर, जापान और कोरिया का नाप और EU (ISO 8653) का नाप नियम से निकल आते हैं। भीतरी घेरे के 40.0 mm से 90.0 mm तक, 0.5 mm के अंतर पर, पूरे 101 खाने यहाँ निकाले गए हैं।',
    '各国的叫法不一样，但量的只有一件事 — 绕住手指的内周。有了这一个数，美国号、日本和韩国号数、欧盟（ISO 8653）都能按规则算出来。内周从 40.0mm 到 90.0mm，每 0.5mm 一格，共 101 格都算好了。',
    '各國的叫法不一樣，但量的只有一件事 — 繞住手指的內周。有了這一個數，美國號、日本和韓國號數、歐盟（ISO 8653）都能按規則算出來。內周從 40.0mm 到 90.0mm，每 0.5mm 一格，共 101 格都算好了。',
  ),

  mmLabel: T('내주', 'Inside circumference', 'Circunferencia interior', 'Circunferência interna', '内周', 'Innenumfang', 'Tour intérieur', 'भीतरी घेरा', '内周', '內周'),
  diameterLabel: T('내경 지름', 'Inside diameter', 'Diámetro interior', 'Diâmetro interno', '内径', 'Innendurchmesser', 'Diamètre intérieur', 'भीतरी व्यास', '内径', '內徑'),
  inchLabel: T('지름(인치)', 'Diameter in inches', 'Diámetro en pulgadas', 'Diâmetro em polegadas', '内径(インチ)', 'Durchmesser in Zoll', 'Diamètre en pouces', 'व्यास (इंच)', '内径（英寸）', '內徑（英寸）'),
  usLabel: T('미국·캐나다', 'US and Canada', 'EE. UU. y Canadá', 'EUA e Canadá', '米国・カナダ', 'USA und Kanada', 'États-Unis et Canada', 'अमेरिका और कनाडा', '美国·加拿大', '美國·加拿大'),
  jpLabel: T('일본·한국 호수', 'Japan and Korea', 'Japón y Corea', 'Japão e Coreia', '日本・韓国の号数', 'Japan und Korea', 'Japon et Corée', 'जापान और कोरिया', '日本·韩国号数', '日本·韓國號數'),
  isoLabel: T('EU · ISO 8653', 'EU · ISO 8653', 'UE · ISO 8653', 'UE · ISO 8653', 'EU · ISO 8653', 'EU · ISO 8653', 'UE · ISO 8653', 'EU · ISO 8653', '欧盟 · ISO 8653', '歐盟 · ISO 8653'),
  nearestLabel: T('가장 가까운 미국 반 사이즈', 'Nearest US half size', 'Media talla US más cercana', 'Meio tamanho US mais próximo', '最も近いUSハーフサイズ', 'Nächste halbe US-Größe', 'Demi-taille US la plus proche', 'निकटतम US आधा नाप', '最接近的美国半号', '最接近的美國半號'),
  gapLabel: T('그 표기와의 차이', 'Gap to that size', 'Diferencia con esa talla', 'Diferença para esse tamanho', 'その表記との差', 'Abstand zu dieser Größe', 'Écart avec cette taille', 'उस नाप से अंतर', '与该号的差', '與該號的差'),
  bandLabel: T('손가락 자리', 'Where it sits', 'Dónde encaja', 'Onde se encaixa', '指の位置', 'Wo sie sitzt', 'Où elle se situe', 'कहाँ बैठता है', '手指位置', '手指位置'),

  bandNames: BAND_NAMES,

  ruleTitle: T('재는 것은 내주 하나다', 'One measurement: the inside circumference', 'Una sola medida: la circunferencia interior', 'Uma só medida: a circunferência interna', '測るのは内周ひとつ', 'Gemessen wird nur der Innenumfang', 'Une seule mesure : le tour intérieur', 'नाप एक ही है: भीतरी घेरा', '要量的只有内周', '要量的只有內周'),
  ruleNote: T(
    '내주를 π로 나누면 내경 지름이 나오고, 그 지름에서 미국 번호가 나옵니다. 일본·한국 호수와 EU 사이즈는 내주에서 바로 나옵니다. 표를 옮겨 적을 것이 없다는 뜻입니다 — 내주 하나가 나머지 셋을 정합니다. 거꾸로도 됩니다: 미국 6이라고만 알아도 지름을 거쳐 내주 51.9mm가 나오고, 그러면 호수와 EU 사이즈까지 따라옵니다.',
    'Divide the inside circumference by pi and you have the inside diameter; the US number comes from that diameter. The Japanese, Korean and EU sizes come straight from the circumference. Nothing here is copied from a chart — one measurement fixes the other three. It runs backwards too: knowing only US 6 gives a diameter, then 51.9 mm of circumference, and from there the other scales.',
    'Divide la circunferencia interior entre pi y tienes el diámetro interior; de ese diámetro sale la talla de EE. UU. Las de Japón, Corea y la UE salen directamente de la circunferencia. Nada de esto se copia de una tabla: una sola medida fija las otras tres. También funciona al revés: sabiendo solo la 6 de EE. UU. sale el diámetro, luego 51,9 mm de circunferencia y de ahí las demás escalas.',
    'Divida a circunferência interna por pi e você tem o diâmetro interno; desse diâmetro sai o tamanho dos EUA. Os do Japão, da Coreia e da UE saem direto da circunferência. Nada aqui é copiado de tabela: uma medida fixa as outras três. Funciona ao contrário também: sabendo só o 6 dos EUA sai o diâmetro, depois 51,9 mm de circunferência e daí as outras escalas.',
    '内周をπで割れば内径が出て、その内径からUSの番号が出ます。日本・韓国の号数とEUのサイズは内周からそのまま出ます。表を写す必要がないという意味です — 内周ひとつが残りの三つを決めます。逆もできます。US 6とだけ分かっていても内径を経て内周51.9mmが出て、そこから号数とEUサイズまでついてきます。',
    'Teile den Innenumfang durch Pi, und du hast den Innendurchmesser; aus diesem Durchmesser folgt die US-Nummer. Die Größen für Japan, Korea und die EU folgen direkt aus dem Umfang. Nichts davon ist aus einer Tabelle abgeschrieben — eine Messung legt die anderen drei fest. Es geht auch rückwärts: Allein aus US 6 folgt der Durchmesser, dann 51,9 mm Umfang und daraus die übrigen Skalen.',
    'Divisez le tour intérieur par pi et vous avez le diamètre intérieur ; de ce diamètre sort la taille US. Celles du Japon, de la Corée et de l’UE sortent directement du tour. Rien ici n’est recopié d’un tableau : une seule mesure fixe les trois autres. Cela marche aussi à l’envers : du seul 6 US on tire le diamètre, puis 51,9 mm de tour, et de là les autres échelles.',
    'भीतरी घेरे को पाई से भाग दें तो भीतरी व्यास मिलता है, और उसी व्यास से US का नंबर निकलता है। जापान, कोरिया और EU के नाप सीधे घेरे से निकलते हैं। मतलब यहाँ कोई तालिका नकल नहीं की गई — एक नाप बाक़ी तीनों को तय कर देता है। उलटा भी चलता है: सिर्फ़ US 6 पता हो तो व्यास, फिर 51.9 mm घेरा, और उससे बाक़ी नाप।',
    '把内周除以 π 就得到内径，美国号是从这个内径算出来的。日本、韩国的号数和欧盟尺寸直接就是内周。也就是说这里没有抄任何对照表 — 一个内周定下另外三种。反过来也成立：只知道美国 6 号，也能先得内径，再得内周 51.9mm，然后其余标法都跟着出来。',
    '把內周除以 π 就得到內徑，美國號是從這個內徑算出來的。日本、韓國的號數和歐盟尺寸直接就是內周。也就是說這裡沒有抄任何對照表 — 一個內周定下另外三種。反過來也成立：只知道美國 6 號，也能先得內徑，再得內周 51.9mm，然後其餘標法都跟著出來。',
  ),

  usTitle: T('미국 번호는 인치로 정해져 있다', 'The US scale is defined in inches', 'La escala de EE. UU. está definida en pulgadas', 'A escala dos EUA é definida em polegadas', 'USの番号はインチで決まっている', 'Die US-Skala ist in Zoll festgelegt', 'L’échelle US est définie en pouces', 'US का नाप इंच में तय है', '美国号是按英寸定的', '美國號是按英寸定的'),
  usNote: T(
    'US 0의 내경이 0.458인치(11.63mm)이고, 한 번호마다 0.032인치(0.8128mm)가 붙습니다. 그래서 지름 = 11.63 + 0.8128 × 번호이고, 거꾸로 번호 = (지름 − 11.63) ÷ 0.8128입니다. 둘레로 치면 한 번호가 2.55mm라 "한 사이즈가 0.1인치"라는 말이 돌아다니지만, 그것은 어림이고 정의는 지름 쪽입니다. 가게가 부르는 눈금은 반 사이즈까지이므로 이 표는 계산값과 가장 가까운 반 사이즈를 나란히 적습니다.',
    'US 0 has an inside diameter of 0.458 inch (11.63 mm) and each size adds 0.032 inch (0.8128 mm). So diameter = 11.63 + 0.8128 × size, and backwards, size = (diameter − 11.63) ÷ 0.8128. In circumference one size is 2.55 mm, which is where the saying “a size is a tenth of an inch” comes from — that is an approximation; the definition lives on the diameter. Shops only call half sizes, so this table prints the computed value next to the nearest half size.',
    'La talla 0 de EE. UU. tiene 0,458 pulgadas (11,63 mm) de diámetro interior y cada talla suma 0,032 pulgadas (0,8128 mm). Así que diámetro = 11,63 + 0,8128 × talla, y al revés, talla = (diámetro − 11,63) ÷ 0,8128. En circunferencia una talla son 2,55 mm, de ahí el dicho de que «una talla es un décimo de pulgada»: es una aproximación, la definición está en el diámetro. Las tiendas solo nombran medias tallas, así que esta tabla pone el valor calculado junto a la media talla más cercana.',
    'O tamanho 0 dos EUA tem 0,458 polegada (11,63 mm) de diâmetro interno e cada tamanho soma 0,032 polegada (0,8128 mm). Então diâmetro = 11,63 + 0,8128 × tamanho, e ao contrário, tamanho = (diâmetro − 11,63) ÷ 0,8128. Em circunferência um tamanho dá 2,55 mm, daí a frase de que “um tamanho é um décimo de polegada”: é aproximação, a definição está no diâmetro. As lojas só falam meios tamanhos, então esta tabela põe o valor calculado ao lado do meio tamanho mais próximo.',
    'US 0の内径が0.458インチ(11.63mm)で、番号がひとつ上がるごとに0.032インチ(0.8128mm)増えます。だから内径 = 11.63 + 0.8128 × 番号、逆に番号 = (内径 − 11.63) ÷ 0.8128です。周で言えば1番号が2.55mmなので「1サイズは0.1インチ」という言い方が広まりましたが、それは近似で、定義は内径の側にあります。店で呼ぶ刻みはハーフサイズまでなので、この表は計算値ともっとも近いハーフサイズを並べて書きます。',
    'US 0 hat einen Innendurchmesser von 0,458 Zoll (11,63 mm), und jede Größe legt 0,032 Zoll (0,8128 mm) zu. Also Durchmesser = 11,63 + 0,8128 × Größe, und umgekehrt Größe = (Durchmesser − 11,63) ÷ 0,8128. Im Umfang sind das 2,55 mm je Größe — daher der Satz, eine Größe sei ein Zehntelzoll. Das ist eine Näherung; definiert ist es über den Durchmesser. Läden nennen nur halbe Größen, deshalb steht hier der berechnete Wert neben der nächsten halben Größe.',
    'Le 0 US a un diamètre intérieur de 0,458 pouce (11,63 mm), et chaque taille ajoute 0,032 pouce (0,8128 mm). Donc diamètre = 11,63 + 0,8128 × taille, et à l’envers, taille = (diamètre − 11,63) ÷ 0,8128. En tour cela fait 2,55 mm par taille, d’où la formule « une taille, c’est un dixième de pouce » : c’est une approximation, la définition porte sur le diamètre. Les boutiques ne nomment que des demi-tailles, alors ce tableau met la valeur calculée à côté de la demi-taille la plus proche.',
    'US 0 का भीतरी व्यास 0.458 इंच (11.63 mm) है और हर नाप पर 0.032 इंच (0.8128 mm) जुड़ता है। इसलिए व्यास = 11.63 + 0.8128 × नाप, और उलटकर नाप = (व्यास − 11.63) ÷ 0.8128। घेरे में एक नाप 2.55 mm बनता है, इसी से यह कहावत चली कि “एक नाप दसवाँ इंच है” — वह अनुमान है, परिभाषा व्यास पर टिकी है। दुकानें आधे नाप तक ही बोलती हैं, इसलिए यह तालिका गणना का मान और निकटतम आधा नाप साथ-साथ लिखती है।',
    '美国 0 号的内径是 0.458 英寸（11.63mm），每上一号加 0.032 英寸（0.8128mm）。所以内径 = 11.63 + 0.8128 × 号数，反过来号数 =（内径 − 11.63）÷ 0.8128。折成周长，一号是 2.55mm，于是就有了“一号等于十分之一英寸”的说法 — 那是近似，定义在内径这一边。店里只叫到半号，所以这张表把算出来的值和最接近的半号并排写着。',
    '美國 0 號的內徑是 0.458 英寸（11.63mm），每上一號加 0.032 英寸（0.8128mm）。所以內徑 = 11.63 + 0.8128 × 號數，反過來號數 =（內徑 − 11.63）÷ 0.8128。折成周長，一號是 2.55mm，於是就有了「一號等於十分之一英寸」的說法 — 那是近似，定義在內徑這一邊。店裡只叫到半號，所以這張表把算出來的值和最接近的半號並排寫著。',
  ),

  jpTitle: T('일본·한국 호수는 내주에서 40을 뺀 수다', 'Japan and Korea: circumference minus 40', 'Japón y Corea: la circunferencia menos 40', 'Japão e Coreia: a circunferência menos 40', '日本・韓国の号数は内周から40を引いた数', 'Japan und Korea: Umfang minus 40', 'Japon et Corée : le tour moins 40', 'जापान और कोरिया: घेरा घटा 40', '日本·韩国号数是内周减 40', '日本·韓國號數是內周減 40'),
  jpNote: T(
    '호수 = 내주(mm) − 40입니다. 13호면 53mm이고 그것이 미국 6.5쯤, 9호면 49mm로 미국 5쯤입니다. 한국도 같은 호수를 씁니다. 인쇄된 표는 대개 1호(41mm)에서 27호(67mm)까지이고, 이 표의 양 끝은 같은 규칙을 그 밖으로 늘린 값입니다 — 가게에 없는 호수일 수 있으니 그때는 내주 밀리미터로 말하는 쪽이 낫습니다.',
    'Size = inside circumference in mm − 40. Size 13 is 53 mm, which lands near US 6.5; size 9 is 49 mm, near US 5. Korea uses the same numbering. Printed charts usually run from 1 (41 mm) to 27 (67 mm), so the two ends of this table are the same rule extended past what is printed — a shop may not stock those, and millimetres are the safer thing to say.',
    'Talla = circunferencia interior en mm − 40. La 13 son 53 mm, que caen cerca de la 6,5 de EE. UU.; la 9 son 49 mm, cerca de la 5. Corea usa la misma numeración. Las tablas impresas suelen ir de la 1 (41 mm) a la 27 (67 mm), así que los extremos de esta tabla son la misma regla estirada más allá de lo impreso: puede que la tienda no la maneje, y ahí es más seguro decir los milímetros.',
    'Tamanho = circunferência interna em mm − 40. O 13 são 53 mm, que caem perto do 6,5 dos EUA; o 9 são 49 mm, perto do 5. A Coreia usa a mesma numeração. As tabelas impressas costumam ir do 1 (41 mm) ao 27 (67 mm), então as pontas desta tabela são a mesma regra estendida além do impresso: a loja pode não ter, e aí é mais seguro dizer os milímetros.',
    '号数 = 内周(mm) − 40です。13号なら53mmで、US 6.5あたりに当たります。9号なら49mmでUS 5あたりです。韓国も同じ号数を使います。印刷された表はおおむね1号(41mm)から27号(67mm)までなので、この表の両端は同じ規則を印刷の外まで伸ばした値です — 店に置いていない号数のこともあるので、そのときは内周のミリで伝えるほうが確実です。',
    'Größe = Innenumfang in mm − 40. Größe 13 sind 53 mm und liegen bei etwa US 6,5; Größe 9 sind 49 mm, etwa US 5. Korea nutzt dieselbe Zählung. Gedruckte Tabellen reichen meist von 1 (41 mm) bis 27 (67 mm) — die beiden Enden dieser Tabelle sind dieselbe Regel über das Gedruckte hinaus verlängert. Ein Laden führt das vielleicht nicht, dann sind Millimeter die sicherere Angabe.',
    'Taille = tour intérieur en mm − 40. La 13 fait 53 mm, soit environ du 6,5 US ; la 9 fait 49 mm, environ du 5. La Corée emploie la même numérotation. Les tableaux imprimés vont en général de 1 (41 mm) à 27 (67 mm) : les deux extrémités de cette table sont donc la même règle prolongée au-delà de l’imprimé. Une boutique ne les aura pas forcément, et les millimètres restent plus sûrs.',
    'नाप = भीतरी घेरा (mm) − 40। नाप 13 यानी 53 mm, जो US 6.5 के आसपास पड़ता है; नाप 9 यानी 49 mm, US 5 के आसपास। कोरिया भी यही गिनती चलाता है। छपी तालिकाएँ आम तौर पर 1 (41 mm) से 27 (67 mm) तक जाती हैं, इसलिए इस तालिका के दोनों सिरे उसी नियम को छपे दायरे से आगे बढ़ाकर निकाले गए हैं — दुकान पर वे न मिलें तो मिलीमीटर कहना ज़्यादा सुरक्षित है।',
    '号数 = 内周（mm）− 40。13 号是 53mm，落在美国 6.5 号附近；9 号是 49mm，接近美国 5 号。韩国用的是同一套号数。印出来的对照表一般只到 1 号（41mm）至 27 号（67mm），所以这张表的两头是把同一条规则往外延长的结果 — 店里可能没有这些号，那就直接说内周毫米更稳。',
    '號數 = 內周（mm）− 40。13 號是 53mm，落在美國 6.5 號附近；9 號是 49mm，接近美國 5 號。韓國用的是同一套號數。印出來的對照表一般只到 1 號（41mm）至 27 號（67mm），所以這張表的兩頭是把同一條規則往外延長的結果 — 店裡可能沒有這些號，那就直接說內周毫米更穩。',
  ),

  isoTitle: T('EU 사이즈는 내주 그대로다', 'The EU size is the circumference itself', 'La talla de la UE es la propia circunferencia', 'O tamanho da UE é a própria circunferência', 'EUのサイズは内周そのもの', 'Die EU-Größe ist der Umfang selbst', 'La taille UE est le tour lui-même', 'EU का नाप घेरा ही है', '欧盟尺寸就是内周本身', '歐盟尺寸就是內周本身'),
  isoNote: T(
    'ISO 8653은 내주를 밀리미터로 그대로 부릅니다 — 52mm면 52입니다. 프랑스·독일·이탈리아가 이 표기를 쓰고, 소수 첫째 자리까지 부르는 곳도 있습니다. 이 섹션의 주소를 iso-52처럼 둔 것도 그래서입니다: 규격 이름이면서 곧 밀리미터라, 어느 언어에서 열어도 같은 뜻입니다.',
    'ISO 8653 names the inside circumference in millimetres and nothing else — 52 mm is size 52. France, Germany and Italy use it, and some jewellers quote it to one decimal. That is also why the addresses here look like iso-52: the number is both the standard size and the millimetres, so it reads the same in every language.',
    'La ISO 8653 nombra la circunferencia interior en milímetros y nada más: 52 mm es la talla 52. Francia, Alemania e Italia la usan, y algunas joyerías la dan con un decimal. Por eso las direcciones aquí son del tipo iso-52: el número es a la vez la talla del estándar y los milímetros, así que se lee igual en cualquier idioma.',
    'A ISO 8653 nomeia a circunferência interna em milímetros e nada mais: 52 mm é o tamanho 52. França, Alemanha e Itália usam essa marcação, e algumas joalherias dão com uma decimal. É também por isso que os endereços aqui são do tipo iso-52: o número é ao mesmo tempo o tamanho do padrão e os milímetros, então se lê igual em qualquer idioma.',
    'ISO 8653は内周をミリでそのまま呼びます — 52mmならサイズ52です。フランス・ドイツ・イタリアがこの表記を使い、小数第一位まで言う店もあります。このセクションのアドレスをiso-52のようにしたのもそのためです。規格のサイズでありながらそのままミリなので、どの言語で開いても同じ意味になります。',
    'ISO 8653 benennt den Innenumfang in Millimetern und sonst nichts — 52 mm ist Größe 52. Frankreich, Deutschland und Italien nutzen das, manche Juweliere nennen eine Dezimalstelle. Deshalb sehen die Adressen hier aus wie iso-52: Die Zahl ist gleichzeitig die Normgröße und die Millimeter, sie liest sich also in jeder Sprache gleich.',
    'L’ISO 8653 nomme le tour intérieur en millimètres, rien d’autre : 52 mm, c’est la taille 52. La France, l’Allemagne et l’Italie l’emploient, et certains bijoutiers donnent une décimale. C’est aussi pourquoi les adresses ici ressemblent à iso-52 : le nombre est à la fois la taille normalisée et les millimètres, donc il se lit pareil dans toutes les langues.',
    'ISO 8653 भीतरी घेरे को मिलीमीटर में ही नाम देता है — 52 mm यानी नाप 52। फ़्रांस, जर्मनी और इटली यही चलाते हैं, और कुछ जौहरी एक दशमलव तक बोलते हैं। इसी वजह से यहाँ के पते iso-52 जैसे हैं: संख्या एक साथ मानक का नाप भी है और मिलीमीटर भी, इसलिए हर भाषा में एक ही अर्थ रहता है।',
    'ISO 8653 直接把内周的毫米数当号数 — 52mm 就是 52 号。法国、德国、意大利用这套标法，有些珠宝店还会报到小数一位。本节的网址写成 iso-52 也是这个原因：这个数既是标准号又是毫米，任何语言打开都是同一个意思。',
    'ISO 8653 直接把內周的毫米數當號數 — 52mm 就是 52 號。法國、德國、義大利用這套標法，有些珠寶店還會報到小數一位。本節的網址寫成 iso-52 也是這個原因：這個數既是標準號又是毫米，任何語言打開都是同一個意思。',
  ),

  ukTitle: T('영국 문자 표기는 넣지 않았다', 'The British letter scale is left out', 'La escala británica de letras no está', 'A escala britânica de letras ficou de fora', '英国の文字表記は入れていない', 'Die britische Buchstabenskala fehlt hier', 'L’échelle britannique en lettres est absente', 'ब्रिटिश अक्षर वाली शृंखला नहीं दी गई', '英国字母标法没有收进来', '英國字母標法沒有收進來'),
  ukNote: T(
    '영국·아일랜드·호주는 A부터 Z까지 문자로 부르고 반 치수에 ½를 붙입니다. 이 표의 다른 표기는 모두 하나의 산식에서 나오는데, 문자 표기는 그만큼 확실한 규칙을 확인하지 못했습니다. 어림한 규칙을 적어 두면 반 치수가 어긋나고, 반 치수 하나면 반지가 안 들어갑니다. 그래서 비워 두었습니다 — 그 나라 가게에도 내주 밀리미터를 그대로 말하는 것이 가장 정확합니다.',
    'Britain, Ireland and Australia call sizes with letters from A to Z, with a half mark for the steps between. Every other scale on this page follows from one formula; for the letter scale no rule of the same reliability was confirmed. Writing down an approximation would put the half sizes out, and half a size is enough to stop a ring going on. So the column stays empty — telling a British jeweller the millimetres is the exact answer anyway.',
    'El Reino Unido, Irlanda y Australia nombran las tallas con letras de la A a la Z y añaden media marca para los pasos intermedios. Todas las demás escalas de esta página salen de una fórmula; de la escala en letras no se confirmó una regla igual de fiable. Anotar una aproximación desplazaría las medias tallas, y media talla basta para que el anillo no entre. Por eso la columna se queda vacía: decirle los milímetros a una joyería británica es de todos modos la respuesta exacta.',
    'Reino Unido, Irlanda e Austrália nomeiam os tamanhos com letras de A a Z e acrescentam meia marca para os passos do meio. Todas as outras escalas desta página saem de uma fórmula; para a escala de letras não se confirmou uma regra igualmente confiável. Anotar uma aproximação desalinharia os meios tamanhos, e meio tamanho basta para o anel não entrar. Por isso a coluna fica vazia: dizer os milímetros a um joalheiro britânico é, de qualquer modo, a resposta exata.',
    '英国・アイルランド・オーストラリアはAからZまでの文字で呼び、あいだの刻みに½を付けます。このページの他の表記はすべてひとつの式から出ますが、文字表記についてはそれと同じだけ確かな規則を確認できませんでした。近い規則を書いてしまうとハーフサイズがずれ、ハーフひとつで指輪は入らなくなります。だから空けてあります — 現地の店でも内周のミリをそのまま伝えるのがいちばん正確です。',
    'Großbritannien, Irland und Australien benennen Größen mit Buchstaben von A bis Z und setzen für die Zwischenschritte ein Halbzeichen. Jede andere Skala auf dieser Seite folgt aus einer Formel; für die Buchstabenskala wurde keine gleich verlässliche Regel bestätigt. Eine Näherung würde die halben Größen verschieben, und eine halbe Größe genügt, damit der Ring nicht mehr passt. Darum bleibt die Spalte leer — dem Juwelier dort die Millimeter zu nennen ist ohnehin die genaue Antwort.',
    'Le Royaume-Uni, l’Irlande et l’Australie nomment les tailles par des lettres de A à Z, avec une demi-marque pour les pas intermédiaires. Toutes les autres échelles de cette page découlent d’une formule ; pour l’échelle en lettres, aucune règle aussi fiable n’a été confirmée. Noter une approximation décalerait les demi-tailles, et une demi-taille suffit pour qu’une bague ne passe plus. La colonne reste donc vide — donner les millimètres à un bijoutier britannique est de toute façon la réponse exacte.',
    'ब्रिटेन, आयरलैंड और ऑस्ट्रेलिया नाप को A से Z तक के अक्षरों से पुकारते हैं और बीच के पायदानों पर आधे का निशान लगाते हैं। इस पन्ने के बाक़ी सारे नाप एक सूत्र से निकलते हैं, पर अक्षर वाली शृंखला के लिए उतना पक्का नियम पुष्ट नहीं हुआ। अनुमान लिख देने से आधे नाप खिसक जाते हैं, और आधा नाप ही अंगूठी को न चढ़ने के लिए काफ़ी है। इसलिए यह खाना खाली छोड़ा है — वहाँ के जौहरी को भी मिलीमीटर बताना ही सटीक जवाब है।',
    '英国、爱尔兰和澳大利亚用 A 到 Z 的字母叫号，中间的一档加半号记号。这一页其他标法都从一条公式出来，可字母标法没能确认同样可靠的规则。写个大概会让半号错位，而错半号戒指就戴不进去。所以这一栏留空 — 对当地珠宝店直接说内周毫米，本来就是最准的答案。',
    '英國、愛爾蘭和澳洲用 A 到 Z 的字母叫號，中間的一檔加半號記號。這一頁其他標法都從一條公式出來，可字母標法沒能確認同樣可靠的規則。寫個大概會讓半號錯位，而錯半號戒指就戴不進去。所以這一欄留空 — 對當地珠寶店直接說內周毫米，本來就是最準的答案。',
  ),

  measureTitle: T('재는 법, 그리고 흔들리는 폭', 'How to measure, and how much it moves', 'Cómo medir y cuánto se mueve', 'Como medir e quanto isso varia', '測り方と、ぶれる幅', 'Wie man misst — und wie stark es schwankt', 'Comment mesurer, et de combien ça bouge', 'कैसे नापें, और यह कितना बदलता है', '怎么量，以及会晃多少', '怎麼量，以及會晃多少'),
  measureNote: T(
    '종이띠를 손가락에 감아 겹친 자리를 표시하고 자로 재면 내주가 그대로 나옵니다. 맞는 반지가 이미 있으면 안쪽 지름을 재서 π를 곱합니다. 손가락은 아침에 가늘고 저녁에 굵으며 더울 때 붓기 때문에, 하루 중 두 번쯤 재서 큰 쪽을 씁니다. 폭이 넓은 밴드는 같은 내주에서도 더 끼므로 반 사이즈쯤 올려 잡고, 마디가 굵으면 마디를 넘는 둘레도 재서 큰 쪽을 씁니다.',
    'Wrap a strip of paper around the finger, mark where it overlaps, and measure the strip — that length is the inside circumference. If a ring already fits, measure its inside diameter and multiply by pi. Fingers are thinner in the morning, thicker in the evening and swell in heat, so measure twice in a day and take the larger figure. A wide band sits tighter at the same circumference, so allow about half a size, and if the knuckle is the wide part, measure over it too and use whichever is bigger.',
    'Enrolla una tira de papel en el dedo, marca dónde se solapa y mide la tira: ese largo es la circunferencia interior. Si ya tienes un anillo que te queda, mide su diámetro interior y multiplícalo por pi. Los dedos están más finos por la mañana, más gruesos al anochecer y se hinchan con el calor, así que mide dos veces en el día y quédate con la mayor. Una banda ancha aprieta más con la misma circunferencia: deja media talla. Y si el nudillo es la parte gruesa, mide también por encima y usa la medida mayor.',
    'Enrole uma tira de papel no dedo, marque onde ela se sobrepõe e meça a tira: esse comprimento é a circunferência interna. Se um anel já serve, meça o diâmetro interno dele e multiplique por pi. Os dedos ficam mais finos de manhã, mais grossos à noite e incham no calor, então meça duas vezes no dia e fique com a maior. Uma aliança larga aperta mais na mesma circunferência: deixe meio tamanho. E se a articulação for a parte grossa, meça por cima dela também e use a maior das duas.',
    '紙の帯を指に巻き、重なったところに印をつけて定規で測れば、それがそのまま内周です。合う指輪があるなら内径を測ってπを掛けます。指は朝は細く夕方は太く、暑いと浮腫むので、一日に二度ほど測って大きいほうを使います。幅の広いリングは同じ内周でもきつく感じるので、ハーフサイズほど上に取ります。関節が太い場合は関節を越える周も測り、大きいほうを採ります。',
    'Wickle einen Papierstreifen um den Finger, markiere die Überlappung und miss den Streifen — diese Länge ist der Innenumfang. Passt schon ein Ring, miss dessen Innendurchmesser und multipliziere mit Pi. Finger sind morgens dünner, abends dicker und schwellen bei Hitze, also zweimal am Tag messen und den größeren Wert nehmen. Ein breiter Ring sitzt bei gleichem Umfang enger, dafür etwa eine halbe Größe zugeben. Ist der Knöchel die dickste Stelle, auch darüber messen und den größeren Wert verwenden.',
    'Enroulez une bande de papier autour du doigt, marquez le chevauchement et mesurez la bande : cette longueur est le tour intérieur. Si une bague va déjà, mesurez son diamètre intérieur et multipliez par pi. Les doigts sont plus fins le matin, plus épais le soir et gonflent à la chaleur : mesurez deux fois dans la journée et gardez la plus grande valeur. Un anneau large serre davantage à tour égal, comptez donc une demi-taille. Et si l’articulation est l’endroit le plus large, mesurez par-dessus et prenez le plus grand des deux.',
    'काग़ज़ की पट्टी उँगली पर लपेटें, जहाँ वह चढ़ती है वहाँ निशान लगाएँ और पट्टी को नापें — वही लंबाई भीतरी घेरा है। अगर कोई अंगूठी पहले से ठीक बैठती है तो उसका भीतरी व्यास नापकर पाई से गुणा कर लें। उँगलियाँ सुबह पतली, शाम को मोटी होती हैं और गर्मी में सूज जाती हैं, इसलिए दिन में दो बार नापें और बड़ा नाप लें। चौड़ा बैंड उसी घेरे पर ज़्यादा कसता है, तो आधा नाप बड़ा रखें। और अगर गाँठ ही मोटी जगह है तो उसके ऊपर से भी नापें और दोनों में जो बड़ा हो वही लें।',
    '拿一条纸带绕在手指上，在搭接处做记号，再用尺量这条纸带 — 这个长度就是内周。如果已有戴得合适的戒指，量它的内径再乘 π 即可。手指早上细、晚上粗，天热还会肿，所以一天量两次，取大的那个。宽戒圈在同样内周下更紧，要多留半号左右。要是指节才是粗的地方，就连指节一起量，取两者中较大的。',
    '拿一條紙帶繞在手指上，在搭接處做記號，再用尺量這條紙帶 — 這個長度就是內周。如果已有戴得合適的戒指，量它的內徑再乘 π 即可。手指早上細、晚上粗，天熱還會腫，所以一天量兩次，取大的那個。寬戒圈在同樣內周下更緊，要多留半號左右。要是指節才是粗的地方，就連指節一起量，取兩者中較大的。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby sizes', 'Tallas cercanas', 'Tamanhos próximos', '近いサイズ', 'Nahe Größen', 'Tailles voisines', 'पास के नाप', '相邻尺寸', '相鄰尺寸'),
  stepTitle: T('한 눈금 아래위', 'One step either way', 'Un paso a cada lado', 'Um passo para cada lado', '一目盛り上と下', 'Ein Schritt nach oben und unten', 'Un cran de chaque côté', 'एक पायदान ऊपर-नीचे', '上下各一格', '上下各一格'),
  prevLabel: T('0.5mm 작게', '0.5 mm smaller', '0,5 mm menos', '0,5 mm menor', '0.5mm小さく', '0,5 mm kleiner', '0,5 mm de moins', '0.5 mm छोटा', '小 0.5mm', '小 0.5mm'),
  nextLabel: T('0.5mm 크게', '0.5 mm larger', '0,5 mm más', '0,5 mm maior', '0.5mm大きく', '0,5 mm größer', '0,5 mm de plus', '0.5 mm बड़ा', '大 0.5mm', '大 0.5mm'),

  desc: T<(f: RingFacts) => string>(
    f => `내주 ${f.mm}mm이면 내경 지름이 ${f.diameter}mm입니다. 미국은 계산값 ${f.us}이라 부르는 눈금으로는 ${f.usHalf}, 일본·한국은 ${f.jpWhole}호, EU(ISO 8653)는 ${f.iso}입니다.`,
    f => `An inside circumference of ${f.mm} mm is an inside diameter of ${f.diameter} mm. The US formula gives ${f.us}, so the size called in shops is ${f.usHalf}; Japan and Korea say ${f.jpWhole}, and the EU (ISO 8653) size is ${f.iso}.`,
    f => `Una circunferencia interior de ${f.mm} mm es un diámetro interior de ${f.diameter} mm. La fórmula de EE. UU. da ${f.us}, así que en tienda se pide la ${f.usHalf}; en Japón y Corea es la ${f.jpWhole} y en la UE (ISO 8653) la ${f.iso}.`,
    f => `Uma circunferência interna de ${f.mm} mm é um diâmetro interno de ${f.diameter} mm. A fórmula dos EUA dá ${f.us}, então na loja se pede ${f.usHalf}; no Japão e na Coreia é ${f.jpWhole} e na UE (ISO 8653) é ${f.iso}.`,
    f => `内周${f.mm}mmなら内径は${f.diameter}mmです。USは計算値が${f.us}なので店で呼ぶ刻みでは${f.usHalf}、日本・韓国は${f.jpWhole}号、EU(ISO 8653)は${f.iso}です。`,
    f => `Ein Innenumfang von ${f.mm} mm ergibt ${f.diameter} mm Innendurchmesser. Die US-Formel liefert ${f.us}, im Laden heißt das ${f.usHalf}; Japan und Korea sagen ${f.jpWhole}, die EU-Größe (ISO 8653) ist ${f.iso}.`,
    f => `Un tour intérieur de ${f.mm} mm donne un diamètre intérieur de ${f.diameter} mm. La formule US donne ${f.us}, donc en boutique on demande du ${f.usHalf} ; le Japon et la Corée disent ${f.jpWhole}, et la taille UE (ISO 8653) est ${f.iso}.`,
    f => `भीतरी घेरा ${f.mm} mm हो तो भीतरी व्यास ${f.diameter} mm होता है। US का सूत्र ${f.us} देता है, इसलिए दुकान पर ${f.usHalf} माँगा जाता है; जापान और कोरिया में ${f.jpWhole} और EU (ISO 8653) में ${f.iso}।`,
    f => `内周 ${f.mm}mm 的内径是 ${f.diameter}mm。按美国公式算出 ${f.us}，店里叫的号是 ${f.usHalf}；日本、韩国是 ${f.jpWhole} 号，欧盟（ISO 8653）是 ${f.iso}。`,
    f => `內周 ${f.mm}mm 的內徑是 ${f.diameter}mm。按美國公式算出 ${f.us}，店裡叫的號是 ${f.usHalf}；日本、韓國是 ${f.jpWhole} 號，歐盟（ISO 8653）是 ${f.iso}。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '내주 ÷ π가 내경 지름입니다 — 이 표의 모든 표기가 그 값에서 나옵니다.',
      '미국 번호 = (내경 지름 − 11.63) ÷ 0.8128이고, 지름은 밀리미터입니다.',
      '일본·한국 호수 = 내주(mm) − 40이고, EU(ISO 8653)는 내주를 그대로 부릅니다.',
      '영국 문자 표기는 확실한 규칙을 확인하지 못해 비워 두었습니다 — 가게에는 내주 밀리미터로 말하십시오.',
    ],
    [
      'Inside circumference divided by pi is the inside diameter — every size here comes from that number.',
      'US number = (inside diameter in mm − 11.63) ÷ 0.8128.',
      'Japan and Korea: size = inside circumference in mm − 40. The EU (ISO 8653) uses the circumference itself.',
      'The British letter scale is left out because no rule of the same reliability was confirmed — give the shop the millimetres.',
    ],
    [
      'La circunferencia interior dividida entre pi es el diámetro interior: de ahí sale todo lo demás.',
      'Talla de EE. UU. = (diámetro interior en mm − 11,63) ÷ 0,8128.',
      'Japón y Corea: talla = circunferencia interior en mm − 40. La UE (ISO 8653) usa la circunferencia tal cual.',
      'La escala británica de letras no está porque no se confirmó una regla igual de fiable: di los milímetros en la tienda.',
    ],
    [
      'A circunferência interna dividida por pi é o diâmetro interno: todo o resto sai daí.',
      'Tamanho dos EUA = (diâmetro interno em mm − 11,63) ÷ 0,8128.',
      'Japão e Coreia: tamanho = circunferência interna em mm − 40. A UE (ISO 8653) usa a própria circunferência.',
      'A escala britânica de letras ficou de fora porque não se confirmou uma regra igualmente confiável: diga os milímetros na loja.',
    ],
    [
      '内周 ÷ π が内径です — この表のすべての表記はその値から出ます。',
      'USの番号 = (内径mm − 11.63) ÷ 0.8128。',
      '日本・韓国の号数 = 内周mm − 40。EU(ISO 8653)は内周そのままです。',
      '英国の文字表記は確かな規則を確認できなかったため入れていません — 店には内周のミリで伝えます。',
    ],
    [
      'Innenumfang geteilt durch Pi ergibt den Innendurchmesser — daraus folgt jede Angabe hier.',
      'US-Nummer = (Innendurchmesser in mm − 11,63) ÷ 0,8128.',
      'Japan und Korea: Größe = Innenumfang in mm − 40. Die EU (ISO 8653) nennt den Umfang selbst.',
      'Die britische Buchstabenskala fehlt, weil keine gleich verlässliche Regel bestätigt wurde — nennt im Laden die Millimeter.',
    ],
    [
      'Le tour intérieur divisé par pi donne le diamètre intérieur : tout le reste en découle.',
      'Taille US = (diamètre intérieur en mm − 11,63) ÷ 0,8128.',
      'Japon et Corée : taille = tour intérieur en mm − 40. L’UE (ISO 8653) utilise le tour lui-même.',
      'L’échelle britannique en lettres est absente faute de règle aussi fiable — donnez les millimètres en boutique.',
    ],
    [
      'भीतरी घेरा ÷ पाई = भीतरी व्यास — यहाँ के सारे नाप उसी से निकलते हैं।',
      'US नाप = (भीतरी व्यास mm − 11.63) ÷ 0.8128।',
      'जापान और कोरिया: नाप = भीतरी घेरा mm − 40। EU (ISO 8653) घेरे को ही नाप कहता है।',
      'ब्रिटिश अक्षर वाली शृंखला नहीं दी गई क्योंकि उतना पक्का नियम पुष्ट नहीं हुआ — दुकान पर मिलीमीटर बताइए।',
    ],
    [
      '内周 ÷ π 就是内径 — 这一页所有标法都从这个数出来。',
      '美国号 =（内径 mm − 11.63）÷ 0.8128。',
      '日本·韩国号数 = 内周 mm − 40；欧盟（ISO 8653）直接用内周。',
      '英国字母标法没有收，因为没能确认同样可靠的规则 — 到店里就说内周毫米。',
    ],
    [
      '內周 ÷ π 就是內徑 — 這一頁所有標法都從這個數出來。',
      '美國號 =（內徑 mm − 11.63）÷ 0.8128。',
      '日本·韓國號數 = 內周 mm − 40；歐盟（ISO 8653）直接用內周。',
      '英國字母標法沒有收，因為沒能確認同樣可靠的規則 — 到店裡就說內周毫米。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '반지 사이즈 대조표 101칸 — 내주 mm로 미국·일본·EU 사이즈',
    'Ring size chart — inside millimetres to US, Japanese and EU sizes',
    'Tabla de tallas de anillo — de milímetros interiores a tallas de EE. UU., Japón y la UE',
    'Tabela de tamanhos de anel — de milímetros internos aos tamanhos dos EUA, Japão e UE',
    '指輪サイズ換算表101マス — 内周mmからUS・日本号数・EU',
    'Ringgrößen-Tabelle — vom Innenumfang in mm zu US-, japanischer und EU-Größe',
    'Tableau des tailles de bague — du tour intérieur en mm aux tailles US, japonaise et UE',
    'अंगूठी नाप तालिका — भीतरी मिलीमीटर से US, जापानी और EU नाप',
    '戒指尺寸对照表 101 格 — 从内周毫米到美国、日本、欧盟号',
    '戒指尺寸對照表 101 格 — 從內周毫米到美國、日本、歐盟號',
  ),
  hubMetaDesc: T(
    '내주 40.0~90.0mm를 0.5mm 눈금으로 101칸. 내경 지름, 미국 번호와 가장 가까운 반 사이즈, 일본·한국 호수, EU(ISO 8653)를 함께 보고, 종이띠로 재는 법과 밴드 폭·부기가 흔드는 폭까지 적었습니다.',
    'All 101 cells from 40.0 to 90.0 mm of inside circumference in 0.5 mm steps: inside diameter, the US number and the nearest half size, the Japanese and Korean size, and the EU (ISO 8653) size — plus how to measure with a paper strip and how much band width and swelling move the answer.',
    'Las 101 casillas de 40,0 a 90,0 mm de circunferencia interior en pasos de 0,5 mm: diámetro interior, talla de EE. UU. y la media talla más cercana, talla de Japón y Corea y talla de la UE (ISO 8653), además de cómo medir con una tira de papel y cuánto mueven el ancho de la banda y la hinchazón.',
    'As 101 casas de 40,0 a 90,0 mm de circunferência interna em passos de 0,5 mm: diâmetro interno, tamanho dos EUA e o meio tamanho mais próximo, tamanho do Japão e da Coreia e tamanho da UE (ISO 8653), além de como medir com uma tira de papel e quanto a largura da aliança e o inchaço mudam a resposta.',
    '内周40.0〜90.0mmを0.5mm刻みで101マス。内径、USの番号ともっとも近いハーフサイズ、日本・韓国の号数、EU(ISO 8653)を並べ、紙の帯で測る方法や、リング幅と浮腫みがぶらす幅まで書きました。',
    'Alle 101 Zellen von 40,0 bis 90,0 mm Innenumfang in 0,5-mm-Schritten: Innendurchmesser, US-Nummer und nächste halbe Größe, Größe in Japan und Korea sowie EU-Größe (ISO 8653) — dazu das Messen mit einem Papierstreifen und wie stark Ringbreite und Schwellung das Ergebnis verschieben.',
    'Les 101 cases de 40,0 à 90,0 mm de tour intérieur par pas de 0,5 mm : diamètre intérieur, taille US et demi-taille la plus proche, taille du Japon et de la Corée, taille UE (ISO 8653) — plus la mesure à la bande de papier et l’écart dû à la largeur de l’anneau et au gonflement.',
    'भीतरी घेरे के 40.0 से 90.0 mm तक, 0.5 mm के अंतर पर पूरे 101 खाने: भीतरी व्यास, US नंबर और निकटतम आधा नाप, जापान और कोरिया का नाप, EU (ISO 8653) का नाप — साथ में काग़ज़ की पट्टी से नापने का तरीक़ा और बैंड की चौड़ाई व सूजन से कितना फ़र्क़ पड़ता है।',
    '内周 40.0 到 90.0mm，每 0.5mm 一格，共 101 格：内径、美国号与最接近的半号、日本和韩国号数、欧盟（ISO 8653），还写了用纸带量的方法，以及戒圈宽度和手指浮肿会让答案晃多少。',
    '內周 40.0 到 90.0mm，每 0.5mm 一格，共 101 格：內徑、美國號與最接近的半號、日本和韓國號數、歐盟（ISO 8653），還寫了用紙帶量的方法，以及戒圈寬度和手指浮腫會讓答案晃多少。',
  ),

  metaTitle: T<(f: RingFacts) => string>(
    f => `내주 ${f.mm}mm 반지 — 미국 ${f.usHalf}, 일본 ${f.jpWhole}호`,
    f => `${f.mm} mm inside — US ${f.usHalf}, Japan ${f.jpWhole}`,
    f => `${f.mm} mm de interior — talla ${f.usHalf} de EE. UU., ${f.jpWhole} de Japón`,
    f => `${f.mm} mm por dentro — tamanho ${f.usHalf} dos EUA, ${f.jpWhole} do Japão`,
    f => `内周${f.mm}mmの指輪 — US ${f.usHalf}、日本${f.jpWhole}号`,
    f => `${f.mm} mm Innenumfang — US ${f.usHalf}, Japan ${f.jpWhole}`,
    f => `${f.mm} mm de tour intérieur — ${f.usHalf} US, ${f.jpWhole} japonais`,
    f => `भीतरी घेरा ${f.mm} mm — US ${f.usHalf}, जापान ${f.jpWhole}`,
    f => `内周 ${f.mm}mm 的戒指 — 美国 ${f.usHalf} 号、日本 ${f.jpWhole} 号`,
    f => `內周 ${f.mm}mm 的戒指 — 美國 ${f.usHalf} 號、日本 ${f.jpWhole} 號`,
  ),

  metaDesc: T<(f: RingFacts) => string>(
    f => `내주 ${f.mm}mm은 내경 지름 ${f.diameter}mm(${f.inch}인치)입니다. 미국 ${f.usHalf}(계산값 ${f.us}), 일본·한국 ${f.jpWhole}호, EU(ISO 8653) ${f.iso}. 미국 ${f.usHalf}의 내주가 ${f.usHalfMm}mm이라 ${signed(f.usGap)}mm 차이입니다.`,
    f => `${f.mm} mm of inside circumference is ${f.diameter} mm (${f.inch} in) of inside diameter. US ${f.usHalf} from a computed ${f.us}, Japan and Korea ${f.jpWhole}, EU (ISO 8653) ${f.iso}. US ${f.usHalf} measures ${f.usHalfMm} mm, a gap of ${signed(f.usGap)} mm.`,
    f => `${f.mm} mm de circunferencia interior son ${f.diameter} mm (${f.inch} pulgadas) de diámetro interior. Talla ${f.usHalf} de EE. UU. desde un ${f.us} calculado, ${f.jpWhole} en Japón y Corea, ${f.iso} en la UE (ISO 8653). La ${f.usHalf} mide ${f.usHalfMm} mm, una diferencia de ${signed(f.usGap)} mm.`,
    f => `${f.mm} mm de circunferência interna são ${f.diameter} mm (${f.inch} pol) de diâmetro interno. Tamanho ${f.usHalf} dos EUA a partir de um ${f.us} calculado, ${f.jpWhole} no Japão e na Coreia, ${f.iso} na UE (ISO 8653). O ${f.usHalf} mede ${f.usHalfMm} mm, diferença de ${signed(f.usGap)} mm.`,
    f => `内周${f.mm}mmは内径${f.diameter}mm(${f.inch}インチ)です。計算値${f.us}からUS ${f.usHalf}、日本・韓国${f.jpWhole}号、EU(ISO 8653)${f.iso}。US ${f.usHalf}の内周は${f.usHalfMm}mmなので差は${signed(f.usGap)}mmです。`,
    f => `${f.mm} mm Innenumfang sind ${f.diameter} mm (${f.inch} Zoll) Innendurchmesser. US ${f.usHalf} aus berechneten ${f.us}, Japan und Korea ${f.jpWhole}, EU (ISO 8653) ${f.iso}. US ${f.usHalf} misst ${f.usHalfMm} mm, Abstand ${signed(f.usGap)} mm.`,
    f => `${f.mm} mm de tour intérieur font ${f.diameter} mm (${f.inch} pouce) de diamètre intérieur. ${f.usHalf} US à partir d’un ${f.us} calculé, ${f.jpWhole} au Japon et en Corée, ${f.iso} dans l’UE (ISO 8653). Le ${f.usHalf} US mesure ${f.usHalfMm} mm, soit ${signed(f.usGap)} mm d’écart.`,
    f => `भीतरी घेरा ${f.mm} mm यानी भीतरी व्यास ${f.diameter} mm (${f.inch} इंच)। गणना ${f.us} से US ${f.usHalf}, जापान और कोरिया ${f.jpWhole}, EU (ISO 8653) ${f.iso}। US ${f.usHalf} का घेरा ${f.usHalfMm} mm है, अंतर ${signed(f.usGap)} mm।`,
    f => `内周 ${f.mm}mm 的内径是 ${f.diameter}mm（${f.inch} 英寸）。算出 ${f.us}，对应美国 ${f.usHalf} 号，日本和韩国 ${f.jpWhole} 号，欧盟（ISO 8653）${f.iso}。美国 ${f.usHalf} 号的内周是 ${f.usHalfMm}mm，相差 ${signed(f.usGap)}mm。`,
    f => `內周 ${f.mm}mm 的內徑是 ${f.diameter}mm（${f.inch} 英寸）。算出 ${f.us}，對應美國 ${f.usHalf} 號，日本和韓國 ${f.jpWhole} 號，歐盟（ISO 8653）${f.iso}。美國 ${f.usHalf} 號的內周是 ${f.usHalfMm}mm，相差 ${signed(f.usGap)}mm。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '반지 사이즈는 어떻게 재나요?', a: '종이띠를 손가락에 감아 겹친 자리를 표시하고 자로 재면 그 길이가 내주입니다. 맞는 반지가 이미 있으면 안쪽 지름을 재서 3.14를 곱합니다. 손가락은 저녁에 굵어지고 더울 때 부으니 두 번쯤 재서 큰 쪽을 쓰는 것이 안전합니다.' },
      { q: '미국 6호는 몇 밀리미터인가요?', a: '내경 지름 16.5mm, 내주 51.9mm입니다. 일본·한국으로는 12호, EU로는 52에 해당합니다. 미국 한 사이즈가 내주로 2.55mm이므로 반 사이즈는 1.3mm쯤입니다 — 종이띠로 재면 이 정도 차이가 읽히는 한계입니다.' },
      { q: '영국 문자 사이즈는 왜 없나요?', a: '미국·일본·EU 표기는 내주 하나에서 산식으로 나오지만, 영국 문자 표기는 그만큼 확실한 규칙을 확인하지 못했습니다. 어림해서 적으면 반 치수가 어긋나므로 비워 두었습니다. 영국 가게에서도 내주 밀리미터를 말하면 그대로 통합니다.' },
    ],
    [
      { q: 'How do I measure my ring size?', a: 'Wrap a strip of paper around the finger, mark where it overlaps and measure it — that length is the inside circumference. If a ring already fits, measure its inside diameter and multiply by 3.14. Fingers thicken towards evening and swell in heat, so measure twice and take the larger figure.' },
      { q: 'How many millimetres is US size 6?', a: 'An inside diameter of 16.5 mm and an inside circumference of 51.9 mm. That is size 12 in Japan and Korea and 52 in the EU. One full US size is 2.55 mm of circumference, so a half size is about 1.3 mm — roughly the finest difference a paper strip can show.' },
      { q: 'Why is there no British letter size?', a: 'The US, Japanese and EU numbers all follow by formula from one circumference, but for the letter scale no rule of the same reliability was confirmed. An approximation would put the half sizes out, so the column is left empty. British jewellers understand millimetres perfectly well.' },
    ],
    [
      { q: '¿Cómo mido mi talla de anillo?', a: 'Enrolla una tira de papel en el dedo, marca dónde se solapa y mídela: ese largo es la circunferencia interior. Si ya tienes un anillo que te queda, mide su diámetro interior y multiplícalo por 3,14. Los dedos engordan al anochecer y se hinchan con el calor, así que mide dos veces y quédate con la mayor.' },
      { q: '¿Cuántos milímetros son la talla 6 de EE. UU.?', a: 'Un diámetro interior de 16,5 mm y una circunferencia interior de 51,9 mm. Equivale a la 12 de Japón y Corea y a la 52 de la UE. Una talla entera son 2,55 mm de circunferencia, así que media talla ronda 1,3 mm: más o menos lo más fino que se lee con una tira de papel.' },
      { q: '¿Por qué no está la talla británica en letras?', a: 'Las tallas de EE. UU., Japón y la UE salen por fórmula de una sola circunferencia, pero de la escala en letras no se confirmó una regla igual de fiable. Una aproximación desplazaría las medias tallas, así que la columna se deja vacía. En una joyería británica los milímetros se entienden igual de bien.' },
    ],
    [
      { q: 'Como meço o meu tamanho de anel?', a: 'Enrole uma tira de papel no dedo, marque onde ela se sobrepõe e meça: esse comprimento é a circunferência interna. Se um anel já serve, meça o diâmetro interno dele e multiplique por 3,14. Os dedos engrossam à noite e incham no calor, então meça duas vezes e fique com a maior.' },
      { q: 'Quantos milímetros são o tamanho 6 dos EUA?', a: 'Um diâmetro interno de 16,5 mm e uma circunferência interna de 51,9 mm. Equivale ao 12 do Japão e da Coreia e ao 52 da UE. Um tamanho inteiro são 2,55 mm de circunferência, então meio tamanho fica em 1,3 mm: quase o limite do que uma tira de papel mostra.' },
      { q: 'Por que não há o tamanho britânico em letras?', a: 'Os tamanhos dos EUA, do Japão e da UE saem por fórmula de uma só circunferência, mas para a escala de letras não se confirmou uma regra igualmente confiável. Uma aproximação desalinharia os meios tamanhos, então a coluna fica vazia. Joalheiros britânicos entendem milímetros sem problema.' },
    ],
    [
      { q: '指輪のサイズはどう測りますか。', a: '紙の帯を指に巻き、重なったところに印をつけて定規で測れば、その長さが内周です。合う指輪があるなら内径を測って3.14を掛けます。指は夕方に太くなり暑いと浮腫むので、二度ほど測って大きいほうを使うと安全です。' },
      { q: 'US 6号は何ミリですか。', a: '内径16.5mm、内周51.9mmです。日本・韓国では12号、EUでは52に当たります。USの1サイズは内周で2.55mmなので、ハーフサイズは1.3mmほどです — 紙の帯で読み取れる差はだいたいここまでです。' },
      { q: '英国の文字サイズがないのはなぜですか。', a: 'US・日本・EUの表記は内周ひとつから式で出ますが、英国の文字表記についてはそれと同じだけ確かな規則を確認できませんでした。近い値で書くとハーフサイズがずれるので空けてあります。現地の店でも内周のミリでそのまま通ります。' },
    ],
    [
      { q: 'Wie messe ich meine Ringgröße?', a: 'Einen Papierstreifen um den Finger wickeln, die Überlappung markieren und den Streifen messen — diese Länge ist der Innenumfang. Passt schon ein Ring, dessen Innendurchmesser messen und mit 3,14 multiplizieren. Finger werden abends dicker und schwellen bei Hitze, also zweimal messen und den größeren Wert nehmen.' },
      { q: 'Wie viele Millimeter ist US-Größe 6?', a: '16,5 mm Innendurchmesser und 51,9 mm Innenumfang. Das ist Größe 12 in Japan und Korea und 52 in der EU. Eine ganze US-Größe sind 2,55 mm Umfang, eine halbe also etwa 1,3 mm — ungefähr der feinste Unterschied, den ein Papierstreifen zeigt.' },
      { q: 'Warum fehlt die britische Buchstabengröße?', a: 'Die Größen für die USA, Japan und die EU folgen per Formel aus einem einzigen Umfang; für die Buchstabenskala wurde keine gleich verlässliche Regel bestätigt. Eine Näherung würde die halben Größen verschieben, deshalb bleibt die Spalte leer. Britische Juweliere verstehen Millimeter ohne Weiteres.' },
    ],
    [
      { q: 'Comment mesurer ma taille de bague ?', a: 'Enroulez une bande de papier autour du doigt, marquez le chevauchement et mesurez-la : cette longueur est le tour intérieur. Si une bague va déjà, mesurez son diamètre intérieur et multipliez par 3,14. Les doigts grossissent le soir et gonflent à la chaleur : mesurez deux fois et gardez la plus grande valeur.' },
      { q: 'Combien de millimètres fait le 6 US ?', a: 'Un diamètre intérieur de 16,5 mm et un tour intérieur de 51,9 mm. C’est la taille 12 au Japon et en Corée, et 52 dans l’UE. Une taille US entière fait 2,55 mm de tour, une demi-taille environ 1,3 mm — à peu près la plus petite différence lisible avec une bande de papier.' },
      { q: 'Pourquoi la taille britannique en lettres est-elle absente ?', a: 'Les tailles US, japonaise et UE découlent d’une formule à partir d’un seul tour ; pour l’échelle en lettres, aucune règle aussi fiable n’a été confirmée. Une approximation décalerait les demi-tailles, la colonne reste donc vide. Les bijoutiers britanniques comprennent très bien les millimètres.' },
    ],
    [
      { q: 'अंगूठी का नाप कैसे लें?', a: 'काग़ज़ की पट्टी उँगली पर लपेटें, जहाँ वह चढ़ती है वहाँ निशान लगाकर उसे नापें — वही लंबाई भीतरी घेरा है। कोई अंगूठी पहले से ठीक बैठती हो तो उसका भीतरी व्यास नापकर 3.14 से गुणा करें। उँगलियाँ शाम को मोटी होती हैं और गर्मी में सूजती हैं, इसलिए दो बार नापकर बड़ा नाप लेना सुरक्षित है।' },
      { q: 'US 6 नाप कितने मिलीमीटर है?', a: 'भीतरी व्यास 16.5 mm और भीतरी घेरा 51.9 mm। जापान और कोरिया में यह 12 और EU में 52 है। US का एक पूरा नाप घेरे में 2.55 mm है, तो आधा नाप क़रीब 1.3 mm — काग़ज़ की पट्टी से इतना ही अंतर पढ़ा जा सकता है।' },
      { q: 'ब्रिटिश अक्षर वाला नाप क्यों नहीं है?', a: 'US, जापान और EU के नाप एक ही घेरे से सूत्र द्वारा निकलते हैं, पर अक्षर वाली शृंखला के लिए उतना पक्का नियम पुष्ट नहीं हुआ। अनुमान लिखने से आधे नाप खिसक जाते, इसलिए यह खाना खाली छोड़ा है। ब्रिटिश जौहरी मिलीमीटर आसानी से समझ लेते हैं।' },
    ],
    [
      { q: '戒指尺寸怎么量？', a: '拿一条纸带绕在手指上，在搭接处做记号，再量这条纸带 — 这个长度就是内周。如果已有戴得合适的戒指，量它的内径再乘 3.14。手指到傍晚会变粗，天热还会肿，所以量两次取大的更稳。' },
      { q: '美国 6 号是多少毫米？', a: '内径 16.5mm，内周 51.9mm。相当于日本、韩国的 12 号，欧盟的 52。美国整一号在内周上是 2.55mm，所以半号约 1.3mm — 用纸带能读出的差别大概也就到这里。' },
      { q: '为什么没有英国字母号？', a: '美国、日本、欧盟的号数都能从一个内周按公式算出来，可字母标法没能确认同样可靠的规则。写个大概会让半号错位，所以这一栏留空。英国的珠宝店也完全看得懂毫米。' },
    ],
    [
      { q: '戒指尺寸怎麼量？', a: '拿一條紙帶繞在手指上，在搭接處做記號，再量這條紙帶 — 這個長度就是內周。如果已有戴得合適的戒指，量它的內徑再乘 3.14。手指到傍晚會變粗，天熱還會腫，所以量兩次取大的更穩。' },
      { q: '美國 6 號是多少毫米？', a: '內徑 16.5mm，內周 51.9mm。相當於日本、韓國的 12 號，歐盟的 52。美國整一號在內周上是 2.55mm，所以半號約 1.3mm — 用紙帶能讀出的差別大概也就到這裡。' },
      { q: '為什麼沒有英國字母號？', a: '美國、日本、歐盟的號數都能從一個內周按公式算出來，可字母標法沒能確認同樣可靠的規則。寫個大概會讓半號錯位，所以這一欄留空。英國的珠寶店也完全看得懂毫米。' },
    ],
  ),

  cellFaq: T<(f: RingFacts) => FaqItem[]>(
    f => [
      { q: `내주 ${f.mm}mm는 미국 몇 사이즈인가요?`, a: `산식으로는 ${f.us}이고, 가게에서 부르는 반 사이즈로는 ${f.usHalf}입니다. 미국 ${f.usHalf}의 내주가 ${f.usHalfMm}mm이라 ${signed(f.usGap)}mm 차이입니다.` },
      { q: '일본·한국 호수와 EU 사이즈는 얼마인가요?', a: `${f.jpWhole}호이고 EU(ISO 8653)는 ${f.iso}입니다. 호수는 내주에서 40을 뺀 수라 ${f.jpWhole}호의 내주는 ${f.jpWholeMm}mm이고, EU 사이즈는 내주를 그대로 부르는 값입니다.` },
      { q: '이 크기는 어느 손가락인가요?', a: `‘${BAND_NAMES.ko[f.band]}’ 쪽입니다. 내주 ${f.mm}mm은 내경 ${f.diameter}mm(${f.inch}인치)이고, 어른의 약손가락은 대개 46~62mm 사이입니다. 78mm 위는 엄지나 확장 규격의 자리입니다.` },
    ],
    f => [
      { q: `What US size is ${f.mm} mm inside?`, a: `The formula gives ${f.us}, and the half size a shop would call is ${f.usHalf}. US ${f.usHalf} measures ${f.usHalfMm} mm, so this cell sits ${signed(f.usGap)} mm from it.` },
      { q: 'What are the Japanese, Korean and EU sizes?', a: `Size ${f.jpWhole}, and ${f.iso} in the EU (ISO 8653). The Japanese and Korean number is the circumference minus 40, so size ${f.jpWhole} is ${f.jpWholeMm} mm, while the EU size is the circumference itself.` },
      { q: 'Which finger is this size for?', a: `It sits in the band called “${BAND_NAMES.en[f.band]}”. ${f.mm} mm of circumference is ${f.diameter} mm (${f.inch} in) across, and adult ring fingers mostly land between 46 and 62 mm. Above 78 mm you are in thumb and extended sizes.` },
    ],
    f => [
      { q: `¿Qué talla de EE. UU. son ${f.mm} mm de interior?`, a: `La fórmula da ${f.us} y la media talla que se pide en tienda es la ${f.usHalf}. La ${f.usHalf} mide ${f.usHalfMm} mm, así que esta casilla queda a ${signed(f.usGap)} mm de ella.` },
      { q: '¿Cuáles son las tallas de Japón, Corea y la UE?', a: `La ${f.jpWhole}, y la ${f.iso} en la UE (ISO 8653). El número japonés y coreano es la circunferencia menos 40, así que la ${f.jpWhole} son ${f.jpWholeMm} mm; la talla de la UE es la circunferencia misma.` },
      { q: '¿Para qué dedo es esta medida?', a: `Está en la franja «${BAND_NAMES.es[f.band]}». ${f.mm} mm de circunferencia son ${f.diameter} mm (${f.inch} pulgadas) de diámetro, y los anulares adultos suelen quedar entre 46 y 62 mm. Por encima de 78 mm ya se trata de pulgar y tallas extendidas.` },
    ],
    f => [
      { q: `Que tamanho dos EUA são ${f.mm} mm por dentro?`, a: `A fórmula dá ${f.us} e o meio tamanho que se pede na loja é ${f.usHalf}. O ${f.usHalf} mede ${f.usHalfMm} mm, então esta casa fica a ${signed(f.usGap)} mm dele.` },
      { q: 'Quais são os tamanhos do Japão, da Coreia e da UE?', a: `${f.jpWhole}, e ${f.iso} na UE (ISO 8653). O número japonês e coreano é a circunferência menos 40, então o ${f.jpWhole} dá ${f.jpWholeMm} mm; o tamanho da UE é a própria circunferência.` },
      { q: 'Para qual dedo é esta medida?', a: `Está na faixa “${BAND_NAMES.pt[f.band]}”. ${f.mm} mm de circunferência são ${f.diameter} mm (${f.inch} pol) de diâmetro, e os anelares adultos ficam quase sempre entre 46 e 62 mm. Acima de 78 mm já é polegar e tamanhos estendidos.` },
    ],
    f => [
      { q: `内周${f.mm}mmはUSの何サイズですか。`, a: `式では${f.us}で、店で呼ぶハーフサイズなら${f.usHalf}です。US ${f.usHalf}の内周は${f.usHalfMm}mmなので、このマスはそこから${signed(f.usGap)}mmの位置にあります。` },
      { q: '日本・韓国の号数とEUサイズはいくつですか。', a: `${f.jpWhole}号で、EU(ISO 8653)は${f.iso}です。日本・韓国の号数は内周から40を引いた数なので${f.jpWhole}号は${f.jpWholeMm}mm、EUサイズは内周そのままの値です。` },
      { q: 'この大きさはどの指ですか。', a: `「${BAND_NAMES.ja[f.band]}」のあたりです。内周${f.mm}mmは内径${f.diameter}mm(${f.inch}インチ)で、大人の薬指はおおむね46〜62mmに収まります。78mmより上は親指や拡張サイズの領域です。` },
    ],
    f => [
      { q: `Welche US-Größe sind ${f.mm} mm Innenumfang?`, a: `Die Formel liefert ${f.us}, die im Laden genannte halbe Größe ist ${f.usHalf}. US ${f.usHalf} misst ${f.usHalfMm} mm, diese Zelle liegt also ${signed(f.usGap)} mm davon entfernt.` },
      { q: 'Wie lauten die Größen für Japan, Korea und die EU?', a: `Größe ${f.jpWhole}, und ${f.iso} in der EU (ISO 8653). Die japanische und koreanische Zahl ist der Umfang minus 40, Größe ${f.jpWhole} sind also ${f.jpWholeMm} mm; die EU-Größe ist der Umfang selbst.` },
      { q: 'Für welchen Finger ist diese Größe?', a: `Sie liegt im Bereich „${BAND_NAMES.de[f.band]}“. ${f.mm} mm Umfang sind ${f.diameter} mm (${f.inch} Zoll) Durchmesser, und Ringfinger von Erwachsenen liegen meist zwischen 46 und 62 mm. Über 78 mm geht es um Daumen und erweiterte Größen.` },
    ],
    f => [
      { q: `Quelle taille US font ${f.mm} mm de tour intérieur ?`, a: `La formule donne ${f.us}, et la demi-taille demandée en boutique est le ${f.usHalf}. Le ${f.usHalf} US mesure ${f.usHalfMm} mm : cette case en est à ${signed(f.usGap)} mm.` },
      { q: 'Quelles sont les tailles japonaise, coréenne et UE ?', a: `La ${f.jpWhole}, et ${f.iso} dans l’UE (ISO 8653). Le nombre japonais et coréen est le tour moins 40, donc la ${f.jpWhole} fait ${f.jpWholeMm} mm ; la taille UE est le tour lui-même.` },
      { q: 'Pour quel doigt cette taille convient-elle ?', a: `Elle relève de « ${BAND_NAMES.fr[f.band]} ». ${f.mm} mm de tour font ${f.diameter} mm (${f.inch} pouce) de diamètre, et les annulaires adultes se situent le plus souvent entre 46 et 62 mm. Au-delà de 78 mm, on est sur le pouce et les tailles étendues.` },
    ],
    f => [
      { q: `भीतरी घेरा ${f.mm} mm का US नाप क्या है?`, a: `सूत्र से ${f.us} निकलता है और दुकान पर बोला जाने वाला आधा नाप ${f.usHalf} है। US ${f.usHalf} का घेरा ${f.usHalfMm} mm है, इसलिए यह खाना उससे ${signed(f.usGap)} mm पर पड़ता है।` },
      { q: 'जापान, कोरिया और EU के नाप क्या हैं?', a: `${f.jpWhole}, और EU (ISO 8653) में ${f.iso}। जापानी और कोरियाई संख्या घेरा घटा 40 है, इसलिए नाप ${f.jpWhole} का घेरा ${f.jpWholeMm} mm बनता है; EU का नाप घेरा ही है।` },
      { q: 'यह नाप किस उँगली का है?', a: `यह “${BAND_NAMES.hi[f.band]}” वाले हिस्से में आता है। ${f.mm} mm घेरे का व्यास ${f.diameter} mm (${f.inch} इंच) है, और बड़ों की अनामिका अक्सर 46 से 62 mm के बीच रहती है। 78 mm से ऊपर अंगूठे और विस्तारित नाप का इलाक़ा है।` },
    ],
    f => [
      { q: `内周 ${f.mm}mm 是美国几号？`, a: `按公式算是 ${f.us}，店里叫的半号是 ${f.usHalf}。美国 ${f.usHalf} 号的内周为 ${f.usHalfMm}mm，所以这一格离它 ${signed(f.usGap)}mm。` },
      { q: '日本、韩国号数和欧盟尺寸是多少？', a: `${f.jpWhole} 号，欧盟（ISO 8653）是 ${f.iso}。日本和韩国的号数是内周减 40，所以 ${f.jpWhole} 号的内周是 ${f.jpWholeMm}mm；欧盟尺寸就是内周本身。` },
      { q: '这个尺寸戴在哪根手指？', a: `落在“${BAND_NAMES.zh[f.band]}”这一段。内周 ${f.mm}mm 的内径是 ${f.diameter}mm（${f.inch} 英寸），成年人的无名指大多在 46 到 62mm 之间。78mm 以上是拇指和扩展号的地盘。` },
    ],
    f => [
      { q: `內周 ${f.mm}mm 是美國幾號？`, a: `按公式算是 ${f.us}，店裡叫的半號是 ${f.usHalf}。美國 ${f.usHalf} 號的內周為 ${f.usHalfMm}mm，所以這一格離它 ${signed(f.usGap)}mm。` },
      { q: '日本、韓國號數和歐盟尺寸是多少？', a: `${f.jpWhole} 號，歐盟（ISO 8653）是 ${f.iso}。日本和韓國的號數是內周減 40，所以 ${f.jpWhole} 號的內周是 ${f.jpWholeMm}mm；歐盟尺寸就是內周本身。` },
      { q: '這個尺寸戴在哪根手指？', a: `落在「${BAND_NAMES.tw[f.band]}」這一段。內周 ${f.mm}mm 的內徑是 ${f.diameter}mm（${f.inch} 英寸），成年人的無名指大多在 46 到 62mm 之間。78mm 以上是拇指和擴展號的地盤。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const RING_UI: L<RingUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<RingUI>;
