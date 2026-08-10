/**
 * 필라멘트 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "무게만으로는 길이가 안 나온다"이다. 재료의 밀도가
 * 1미터의 무게를 정하고, 스풀 무게를 그것으로 나눠야 몇 미터인지 나온다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { FilamentFacts, PerDiameter } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface FilamentUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  materialLabel: string;
  spoolLabel: string;
  densityLabel: string;
  diameterLabel: string;
  lengthLabel: string;
  gramsPerMetreLabel: string;
  per10gLabel: string;
  volumeLabel: string;

  densityTitle: string;
  densityNote: string;
  diameterTitle: string;
  diameterNote: string;
  netTitle: string;
  netNote: string;
  remainTitle: string;
  remainNote: string;

  tableTitle: string;
  neighbourTitle: string;
  materialRowTitle: string;
  spoolRowTitle: string;
  denserLabel: string;
  lighterLabel: string;

  desc: (f: FilamentFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: FilamentFacts) => string;
  metaDesc: (f: FilamentFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: FilamentFacts) => FaqItem[];
}

/** 재료 이름은 열 언어 모두 라틴 표기 그대로다 — PLA를 옮겨 적는 언어가 없다 */
const NAME: Record<string, string> = {
  pla: 'PLA', abs: 'ABS', petg: 'PETG', tpu: 'TPU', asa: 'ASA', nylon: 'Nylon', pc: 'PC', hips: 'HIPS',
};
export const materialName = (key: string): string => NAME[key] ?? key.toUpperCase();

/** 1000g부터는 kg으로 — 상자에 적힌 표기를 따른다 */
export const kgOf = (grams: number): string => (grams >= 1000 ? `${grams / 1000}kg` : `${grams}g`);

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 문장 여러 곳에서 같은 값을 쓴다 */
const d175 = (f: FilamentFacts): PerDiameter => f.diameters.find(d => d.diameter === 1.75)!;
const d285 = (f: FilamentFacts): PerDiameter => f.diameters.find(d => d.diameter === 2.85)!;
const label = (f: FilamentFacts): string => `${materialName(f.cell.material)} ${kgOf(f.cell.grams)}`;
/** 100g으로 뽑는 길이(m) — "저울에 100g 남았다"에 바로 답한다 */
const per100 = (f: FilamentFacts): number => Math.round(d175(f).metresPer10g * 100) / 10;

type Spec = { [K in keyof FilamentUI]: L<FilamentUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('필라멘트 길이', 'Filament length', 'Longitud de filamento', 'Comprimento de filamento', 'フィラメントの長さ', 'Filamentlänge', 'Longueur de filament', 'फ़िलामेंट लंबाई', '线材长度', '線材長度'),

  hubTitle: T(
    '필라멘트 48칸 — PLA 1kg은 1.75mm로 335m',
    '48 filament spools — 1 kg of PLA is 335 m at 1.75 mm',
    '48 bobinas de filamento — 1 kg de PLA son 335 m en 1,75 mm',
    '48 carretéis de filamento — 1 kg de PLA são 335 m em 1,75 mm',
    'フィラメント48マス — PLA 1kgは1.75mmで335m',
    '48 Filamentspulen — 1 kg PLA sind 335 m bei 1,75 mm',
    '48 bobines de filament — 1 kg de PLA fait 335 m en 1,75 mm',
    'फ़िलामेंट के 48 खाने — 1.75 mm में PLA 1kg यानी 335 m',
    '48 种线材组合 — PLA 1kg 在 1.75mm 下约 335 米',
    '48 種線材組合 — PLA 1kg 在 1.75mm 下約 335 公尺',
  ),

  hubLead: T(
    '재료 8가지와 스풀 무게 6가지가 만나는 칸마다 감긴 길이를 계산했습니다. 무게만으로는 답이 안 나옵니다 — 재료의 밀도가 1미터의 무게를 정하고, 스풀 무게를 그것으로 나눠야 몇 미터인지 나옵니다.',
    'Every pairing of 8 materials and 6 spool weights, worked out as metres of filament. Weight alone answers nothing — the material’s density sets what one metre weighs, and only dividing the spool weight by that number gives you a length.',
    'Cada cruce de 8 materiales y 6 pesos de bobina, resuelto en metros de filamento. El peso solo no responde nada: la densidad del material fija lo que pesa un metro, y solo dividiendo el peso de la bobina entre esa cifra sale una longitud.',
    'Cada cruzamento de 8 materiais e 6 pesos de carretel, resolvido em metros de filamento. O peso sozinho não responde nada: a densidade do material define quanto pesa um metro, e só dividindo o peso do carretel por esse número sai um comprimento.',
    '材料8種とスプール重量6種が交わるマスごとに、巻かれている長さを計算しました。重さだけでは答えが出ません — 材料の密度が1メートルの重さを決め、スプールの重さをそれで割ってはじめて長さになります。',
    'Jede Paarung aus 8 Materialien und 6 Spulengewichten, ausgerechnet als Meter Filament. Das Gewicht allein sagt nichts — die Dichte des Materials legt fest, was ein Meter wiegt, und erst das Spulengewicht geteilt durch diese Zahl ergibt eine Länge.',
    'Chaque croisement de 8 matériaux et 6 poids de bobine, résolu en mètres de filament. Le poids seul ne répond à rien : la densité du matériau fixe ce que pèse un mètre, et seul le poids de la bobine divisé par ce nombre donne une longueur.',
    '8 सामग्रियों और स्पूल के 6 वज़नों के हर जोड़ पर, कितने मीटर लिपटे हैं यह निकाला गया है। अकेला वज़न कुछ नहीं बताता — सामग्री का घनत्व तय करता है कि एक मीटर कितना भारी है, और स्पूल के वज़न को उसी से भाग देने पर ही लंबाई मिलती है।',
    '8 种材料与 6 种料盘净重相交的每一格，都算出了盘上绕着多少米。只看重量得不出答案 — 材料的密度决定一米有多重，把整盘净重除以它才是长度。',
    '8 種材料與 6 種料捲淨重相交的每一格，都算出了捲上繞著多少公尺。只看重量得不出答案 — 材料的密度決定一公尺有多重，把整捲淨重除以它才是長度。',
  ),

  materialLabel: T('재료', 'Material', 'Material', 'Material', '材料', 'Material', 'Matériau', 'सामग्री', '材料', '材料'),
  spoolLabel: T('순 무게', 'Net weight', 'Peso neto', 'Peso líquido', '正味重量', 'Nettogewicht', 'Poids net', 'शुद्ध वज़न', '净重', '淨重'),
  densityLabel: T('밀도', 'Density', 'Densidad', 'Densidade', '密度', 'Dichte', 'Densité', 'घनत्व', '密度', '密度'),
  diameterLabel: T('지름', 'Diameter', 'Diámetro', 'Diâmetro', '直径', 'Durchmesser', 'Diamètre', 'व्यास', '直径', '直徑'),
  lengthLabel: T('감긴 길이', 'Length on the spool', 'Metros en la bobina', 'Metros no carretel', '巻かれている長さ', 'Meter auf der Spule', 'Mètres sur la bobine', 'स्पूल पर मीटर', '盘上长度', '捲上長度'),
  gramsPerMetreLabel: T('1m의 무게', 'Weight of 1 m', 'Peso de 1 m', 'Peso de 1 m', '1mの重さ', 'Gewicht von 1 m', 'Poids de 1 m', '1 m का वज़न', '每米重量', '每公尺重量'),
  per10gLabel: T('10g의 길이', 'Length per 10 g', 'Longitud por 10 g', 'Comprimento por 10 g', '10gの長さ', 'Länge je 10 g', 'Longueur par 10 g', '10 g की लंबाई', '每 10 克长度', '每 10 克長度'),
  volumeLabel: T('부피', 'Volume', 'Volumen', 'Volume', '体積', 'Volumen', 'Volume', 'आयतन', '体积', '體積'),

  densityTitle: T('길이를 정하는 것은 밀도다', 'Density decides the length', 'La densidad decide la longitud', 'A densidade decide o comprimento', '長さを決めるのは密度', 'Die Dichte entscheidet die Länge', 'La densité décide de la longueur', 'लंबाई घनत्व से तय होती है', '长度由密度决定', '長度由密度決定'),
  densityNote: T(
    '필라멘트는 단면이 원인 긴 줄이라 1미터의 부피가 정해져 있고, 그 무게는 부피에 밀도를 곱한 값입니다. 그래서 같은 1kg이라도 ABS(1.04g/cm³)는 400m 가까이, PETG(1.27g/cm³)는 327m쯤 감겨 있습니다. 스풀 무게를 1미터의 무게로 나누는 것 — 이 표의 셈은 그것이 전부입니다.',
    'Filament is a long strand with a round cross-section, so the volume of one metre is fixed — its weight is that volume times the density. That is why the same 1 kg holds nearly 400 m of ABS (1.04 g/cm³) but only about 327 m of PETG (1.27 g/cm³). Dividing the spool weight by the weight of one metre is all this table does.',
    'El filamento es un hilo de sección circular, así que el volumen de un metro está fijado y su peso es ese volumen por la densidad. Por eso el mismo kilo guarda casi 400 m de ABS (1,04 g/cm³) y solo unos 327 m de PETG (1,27 g/cm³). Dividir el peso de la bobina entre el peso de un metro: eso es todo lo que hace esta tabla.',
    'O filamento é um fio de seção circular: o volume de um metro é fixo e o peso é esse volume vezes a densidade. Por isso o mesmo quilo guarda quase 400 m de ABS (1,04 g/cm³) e só uns 327 m de PETG (1,27 g/cm³). Dividir o peso do carretel pelo peso de um metro — é tudo o que esta tabela faz.',
    'フィラメントは断面が円の長い糸なので、1メートルの体積は決まっていて、重さはそれに密度を掛けた値です。だから同じ1kgでもABS(1.04g/cm³)は400m近く、PETG(1.27g/cm³)は327mほどしか巻かれていません。スプールの重さを1メートルの重さで割る — この表の計算はそれだけです。',
    'Filament ist ein Strang mit rundem Querschnitt: Das Volumen eines Meters steht fest, sein Gewicht ist dieses Volumen mal Dichte. Deshalb stecken im selben Kilo fast 400 m ABS (1,04 g/cm³), aber nur rund 327 m PETG (1,27 g/cm³). Spulengewicht geteilt durch das Gewicht eines Meters — mehr rechnet diese Tabelle nicht.',
    'Le filament est un fil de section circulaire : le volume d’un mètre est fixé, son poids est ce volume multiplié par la densité. Voilà pourquoi le même kilo contient près de 400 m d’ABS (1,04 g/cm³) mais seulement 327 m environ de PETG (1,27 g/cm³). Diviser le poids de la bobine par le poids d’un mètre — cette table ne fait rien d’autre.',
    'फ़िलामेंट गोल काट वाला लंबा तार है, इसलिए एक मीटर का आयतन तय है और उसका वज़न उस आयतन को घनत्व से गुणा करने पर मिलता है। इसीलिए वही 1 kg ABS (1.04 g/cm³) में क़रीब 400 m और PETG (1.27 g/cm³) में सिर्फ़ 327 m के आसपास होता है। स्पूल के वज़न को एक मीटर के वज़न से भाग देना — यह तालिका बस यही करती है।',
    '线材是截面为圆的长丝，一米的体积是固定的，重量等于体积乘以密度。所以同样是 1kg，ABS（1.04g/cm³）能绕近 400 米，PETG（1.27g/cm³）只有 327 米左右。把料盘净重除以一米的重量 — 这张表算的就是这一步。',
    '線材是截面為圓的長絲，一公尺的體積是固定的，重量等於體積乘以密度。所以同樣是 1kg，ABS（1.04g/cm³）能繞近 400 公尺，PETG（1.27g/cm³）只有 327 公尺左右。把料捲淨重除以一公尺的重量 — 這張表算的就是這一步。',
  ),

  diameterTitle: T('1.75mm와 2.85mm를 나란히 놓았다', '1.75 mm and 2.85 mm side by side', '1,75 mm y 2,85 mm lado a lado', '1,75 mm e 2,85 mm lado a lado', '1.75mmと2.85mmを並べて見せる', '1,75 mm und 2,85 mm nebeneinander', '1,75 mm et 2,85 mm côte à côte', '1.75 mm और 2.85 mm साथ-साथ', '1.75mm 与 2.85mm 并排着看', '1.75mm 與 2.85mm 並排著看'),
  diameterNote: T(
    '2.85mm는 단면적이 1.75mm의 2.65배라, 같은 무게에서 길이가 그 비율만큼 짧습니다. 지름을 축으로 삼으면 칸만 늘고 묻는 말은 같아서, 한 칸 안에 두 지름을 나란히 보여 줍니다. 어느 쪽인지는 프린터가 정합니다 — 요즘은 1.75mm가 사실상 표준이고 2.85mm는 볼든 계열에 남아 있습니다.',
    'A 2.85 mm strand has 2.65 times the cross-section of 1.75 mm, so the same weight winds that much shorter. Making diameter an axis would only multiply the cells without changing the question, so each cell shows both. Which one you need is set by the printer — 1.75 mm is the de facto standard today, with 2.85 mm surviving on Bowden-style machines.',
    'Un hilo de 2,85 mm tiene 2,65 veces la sección de uno de 1,75 mm, así que el mismo peso rinde una longitud proporcionalmente menor. Hacer del diámetro un eje solo multiplicaría las casillas sin cambiar la pregunta, de modo que cada casilla muestra ambos. Cuál necesitas lo decide la impresora: 1,75 mm es el estándar de hecho y 2,85 mm sobrevive en las máquinas tipo Bowden.',
    'Um fio de 2,85 mm tem 2,65 vezes a seção de um de 1,75 mm, então o mesmo peso rende um comprimento proporcionalmente menor. Fazer do diâmetro um eixo só multiplicaria as casas sem mudar a pergunta, então cada casa mostra os dois. Qual você precisa é a impressora que decide: 1,75 mm é o padrão de fato e 2,85 mm sobrevive nas máquinas tipo Bowden.',
    '2.85mmは断面積が1.75mmの2.65倍なので、同じ重さなら長さはその分だけ短くなります。直径を軸にするとマスが増えるだけで問いは同じなので、ひとつのマスに両方を並べています。どちらを使うかはプリンターが決めます — いまは1.75mmが事実上の標準で、2.85mmはボーデン系に残っています。',
    'Ein 2,85-mm-Strang hat den 2,65-fachen Querschnitt von 1,75 mm, dasselbe Gewicht wickelt sich also entsprechend kürzer. Den Durchmesser zur Achse zu machen würde nur die Zellen vervielfachen, ohne die Frage zu ändern — darum zeigt jede Zelle beide. Welchen man braucht, bestimmt der Drucker: 1,75 mm ist heute der De-facto-Standard, 2,85 mm hält sich an Bowden-Maschinen.',
    'Un fil de 2,85 mm a 2,65 fois la section d’un 1,75 mm : le même poids s’enroule donc d’autant plus court. Faire du diamètre un axe ne ferait que multiplier les cases sans changer la question, alors chaque case montre les deux. Lequel il vous faut, c’est l’imprimante qui le dit — 1,75 mm est le standard de fait, 2,85 mm survit sur les machines de type Bowden.',
    '2.85 mm के तार की काट 1.75 mm से 2.65 गुना है, इसलिए वही वज़न उतना ही छोटा लिपटता है। व्यास को धुरी बनाने से खाने ही बढ़ते, सवाल वही रहता — इसलिए हर खाने में दोनों साथ दिखते हैं। कौन सा चाहिए यह प्रिंटर तय करता है: आज 1.75 mm व्यावहारिक मानक है और 2.85 mm बोडेन शैली की मशीनों में बचा है।',
    '2.85mm 的截面积是 1.75mm 的 2.65 倍，同样的重量绕出的长度就按这个比例变短。把直径当作一条轴只会让格子翻倍而问题不变，所以每一格把两种直径放在一起。用哪种由打印机决定 — 如今 1.75mm 是事实标准，2.85mm 留在鲍登式机器上。',
    '2.85mm 的截面積是 1.75mm 的 2.65 倍，同樣的重量繞出的長度就按這個比例變短。把直徑當作一條軸只會讓格子翻倍而問題不變，所以每一格把兩種直徑放在一起。用哪種由印表機決定 — 如今 1.75mm 是事實標準，2.85mm 留在鮑登式機器上。',
  ),

  netTitle: T('스풀째 무게가 아니라 순 무게다', 'Net weight, not the weight with the spool', 'Peso neto, no el peso con la bobina', 'Peso líquido, não o peso com o carretel', 'スプール込みではなく正味の重さ', 'Nettogewicht, nicht das Gewicht samt Spule', 'Le poids net, pas le poids bobine comprise', 'स्पूल समेत नहीं, शुद्ध वज़न', '是净重，不是连料盘的重量', '是淨重，不是連料捲的重量'),
  netNote: T(
    '상자에 적힌 1kg은 필라멘트만의 무게입니다. 빈 스풀이 따로 130~250g쯤 나가므로, 저울에 스풀째 올린 값은 그만큼 무겁습니다. 남은 양을 잴 때는 잰 값에서 빈 스풀 무게를 빼야 합니다 — 새 스풀일 때 전체 무게를 한 번 적어 두면 표기와의 차이가 곧 그 스풀의 빈 무게입니다.',
    'The 1 kg on the box is the filament alone. An empty spool weighs another 130 to 250 g, so a kitchen scale reads that much heavy. To measure what is left, subtract the empty spool’s weight from the reading — weigh a fresh spool once, and the difference from the labelled weight is that spool’s tare.',
    'El kilo de la caja es solo el filamento. La bobina vacía pesa otros 130 a 250 g, así que la báscula marca ese tanto de más. Para medir lo que queda, resta el peso de la bobina vacía a la lectura — pesa una bobina nueva una vez y la diferencia con lo etiquetado es su tara.',
    'O quilo da caixa é só o filamento. O carretel vazio pesa outros 130 a 250 g, então a balança marca isso a mais. Para medir o que resta, subtraia o peso do carretel vazio da leitura — pese um carretel novo uma vez e a diferença para o rótulo é a tara do seu.',
    '箱に書かれた1kgはフィラメントだけの重さです。空のスプールは別に130〜250gほどあるので、はかりにスプールごと乗せた値はその分だけ重く出ます。残量を測るときは、読みから空スプールの重さを引きます — 新品のときに全体の重さを一度控えておけば、表示との差がそのスプールの風袋です。',
    'Das Kilo auf der Schachtel ist das Filament allein. Eine leere Spule wiegt weitere 130 bis 250 g, die Waage zeigt also entsprechend mehr. Wer den Rest messen will, zieht das Leergewicht der Spule ab — eine neue Spule einmal wiegen, und die Differenz zum Etikett ist die Tara.',
    'Le kilo inscrit sur la boîte, c’est le filament seul. La bobine vide pèse encore 130 à 250 g, la balance affiche donc d’autant plus. Pour mesurer ce qui reste, soustrayez le poids de la bobine vide — pesez une bobine neuve une fois, et l’écart avec l’étiquette est votre tare.',
    'डिब्बे पर लिखा 1 kg सिर्फ़ फ़िलामेंट का है। खाली स्पूल अलग से 130–250 g का होता है, इसलिए तराज़ू उतना ज़्यादा दिखाता है। बची मात्रा नापनी हो तो पढ़े गए वज़न में से खाली स्पूल का वज़न घटाएँ — नया स्पूल एक बार तौल लें, लेबल से अंतर ही उसका ख़ाली वज़न है।',
    '盒子上写的 1kg 只是线材本身。空料盘另有 130 到 250 克，秤上的读数会重出这一截。要量剩余量，就从读数里减去空盘重量 — 新料盘时整盘称一次，与标注的差值就是这个盘的皮重。',
    '盒子上寫的 1kg 只是線材本身。空料捲另有 130 到 250 克，秤上的讀數會重出這一截。要量剩餘量，就從讀數裡減去空捲重量 — 新料捲時整捲秤一次，與標註的差值就是這個捲的皮重。',
  ),

  remainTitle: T('남은 무게로 남은 길이를 되짚는다', 'Read remaining length off remaining weight', 'Leer la longitud restante en el peso restante', 'Ler o comprimento restante no peso restante', '残りの重さから残りの長さを割り出す', 'Restlänge am Restgewicht ablesen', 'Lire la longueur restante sur le poids restant', 'बचे वज़न से बची लंबाई', '用剩余重量读出剩余长度', '用剩餘重量讀出剩餘長度'),
  remainNote: T(
    '같은 셈을 거꾸로 쓰면 저울이 자가 됩니다. 10g으로 뽑을 수 있는 길이를 알면, 남은 무게에 그 값을 곱해 남은 길이가 나옵니다. PLA 1.75mm면 10g에 3.35m — 슬라이서가 말하는 소모량과 견주면, 이 출력이 끝까지 갈지를 저울만으로 판단할 수 있습니다.',
    'Run the same sum backwards and a scale becomes a ruler. Knowing the length 10 g yields, multiply the remaining weight by it: PLA at 1.75 mm gives 3.35 m per 10 g. Compare that with what the slicer says a print consumes, and the scale alone tells you whether the job will finish.',
    'La misma cuenta al revés convierte la báscula en regla. Sabiendo lo que rinden 10 g, multiplica el peso restante por ello: el PLA en 1,75 mm da 3,35 m por cada 10 g. Compáralo con lo que el laminador dice que consume la pieza y sabrás con solo la báscula si la impresión llegará al final.',
    'A mesma conta ao contrário transforma a balança em régua. Sabendo o que rendem 10 g, multiplique o peso restante: PLA em 1,75 mm dá 3,35 m a cada 10 g. Compare com o consumo que o fatiador anuncia e você sabe, só com a balança, se a impressão chega ao fim.',
    '同じ計算を逆に使えば、はかりが物差しになります。10gで引き出せる長さが分かれば、残りの重さに掛けるだけです。PLAの1.75mmなら10gで3.35m — スライサーが示す消費量と見比べれば、この出力が最後までもつかを、はかりだけで判断できます。',
    'Dieselbe Rechnung rückwärts macht die Waage zum Maßstab. Wer weiß, wie viel Länge 10 g ergeben, multipliziert das Restgewicht damit: PLA bei 1,75 mm ergibt 3,35 m je 10 g. Verglichen mit dem Verbrauch, den der Slicer nennt, sagt allein die Waage, ob der Druck durchhält.',
    'Le même calcul à l’envers fait de la balance une règle. Connaissant la longueur que donnent 10 g, multipliez le poids restant : le PLA en 1,75 mm donne 3,35 m par 10 g. Comparez avec la consommation annoncée par le slicer, et la balance suffit à dire si l’impression ira au bout.',
    'वही गणना उलटी करें तो तराज़ू ही पैमाना बन जाता है। 10 g से कितनी लंबाई निकलती है यह पता हो, तो बचे वज़न से गुणा कर दें: 1.75 mm के PLA में 10 g पर 3.35 m। स्लाइसर जितनी खपत बताता है उससे मिलाइए — सिर्फ़ तराज़ू से पता चल जाता है कि प्रिंट पूरा होगा या नहीं।',
    '同一笔账倒着算，秤就成了尺子。知道 10 克能抽出多长，拿剩余重量一乘即可：1.75mm 的 PLA 每 10 克是 3.35 米。再对照切片软件给出的耗量，光靠一台秤就能判断这次打印能不能到头。',
    '同一筆帳倒著算，秤就成了尺。知道 10 克能抽出多長，拿剩餘重量一乘即可：1.75mm 的 PLA 每 10 克是 3.35 公尺。再對照切片軟體給出的耗量，光靠一臺秤就能判斷這次列印能不能到頭。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  materialRowTitle: T('같은 재료의 다른 스풀', 'Same material, other spools', 'Mismo material, otras bobinas', 'Mesmo material, outros carretéis', '同じ材料の他のスプール', 'Gleiches Material, andere Spulen', 'Même matériau, autres bobines', 'वही सामग्री, दूसरे स्पूल', '同一材料的其他料盘', '同一材料的其他料捲'),
  spoolRowTitle: T('같은 무게의 다른 재료', 'Same weight, other materials', 'Mismo peso, otros materiales', 'Mesmo peso, outros materiais', '同じ重さの他の材料', 'Gleiches Gewicht, andere Materialien', 'Même poids, autres matériaux', 'वही वज़न, दूसरी सामग्री', '同一净重的其他材料', '同一淨重的其他材料'),
  denserLabel: T('더 무거운 재료', 'Denser material', 'Material más denso', 'Material mais denso', 'より重い材料', 'Dichteres Material', 'Matériau plus dense', 'ज़्यादा घनी सामग्री', '更致密的材料', '更緻密的材料'),
  lighterLabel: T('더 가벼운 재료', 'Lighter material', 'Material más ligero', 'Material mais leve', 'より軽い材料', 'Leichteres Material', 'Matériau plus léger', 'हल्की सामग्री', '更轻的材料', '更輕的材料'),

  desc: T<(f: FilamentFacts) => string>(
    f => `${label(f)}(밀도 ${f.density}g/cm³)이면 1.75mm로 ${d175(f).metres}m, 2.85mm로 ${d285(f).metres}m 감겨 있습니다. 1m가 ${d175(f).gramsPerMetre}g이라 10g이면 ${d175(f).metresPer10g}m를 뽑습니다.`,
    f => `${label(f)} at ${f.density} g/cm³ holds ${d175(f).metres} m of 1.75 mm filament, or ${d285(f).metres} m at 2.85 mm. One metre weighs ${d175(f).gramsPerMetre} g, so 10 g draws out ${d175(f).metresPer10g} m.`,
    f => `${label(f)} con ${f.density} g/cm³ guarda ${d175(f).metres} m en 1,75 mm y ${d285(f).metres} m en 2,85 mm. Un metro pesa ${d175(f).gramsPerMetre} g, así que 10 g rinden ${d175(f).metresPer10g} m.`,
    f => `${label(f)} com ${f.density} g/cm³ guarda ${d175(f).metres} m em 1,75 mm e ${d285(f).metres} m em 2,85 mm. Um metro pesa ${d175(f).gramsPerMetre} g, então 10 g rendem ${d175(f).metresPer10g} m.`,
    f => `${label(f)}(密度${f.density}g/cm³)なら1.75mmで${d175(f).metres}m、2.85mmで${d285(f).metres}m巻かれています。1mが${d175(f).gramsPerMetre}gなので、10gで${d175(f).metresPer10g}m引き出せます。`,
    f => `${label(f)} mit ${f.density} g/cm³ fasst ${d175(f).metres} m bei 1,75 mm und ${d285(f).metres} m bei 2,85 mm. Ein Meter wiegt ${d175(f).gramsPerMetre} g, 10 g ergeben also ${d175(f).metresPer10g} m.`,
    f => `${label(f)} à ${f.density} g/cm³ contient ${d175(f).metres} m en 1,75 mm et ${d285(f).metres} m en 2,85 mm. Un mètre pèse ${d175(f).gramsPerMetre} g, 10 g donnent donc ${d175(f).metresPer10g} m.`,
    f => `${label(f)} (घनत्व ${f.density} g/cm³) में 1.75 mm पर ${d175(f).metres} m और 2.85 mm पर ${d285(f).metres} m लिपटे हैं। 1 m का वज़न ${d175(f).gramsPerMetre} g है, इसलिए 10 g से ${d175(f).metresPer10g} m निकलते हैं।`,
    f => `${label(f)}（密度 ${f.density}g/cm³）在 1.75mm 下绕有 ${d175(f).metres} 米，2.85mm 下为 ${d285(f).metres} 米。每米重 ${d175(f).gramsPerMetre} 克，10 克能抽出 ${d175(f).metresPer10g} 米。`,
    f => `${label(f)}（密度 ${f.density}g/cm³）在 1.75mm 下繞有 ${d175(f).metres} 公尺，2.85mm 下為 ${d285(f).metres} 公尺。每公尺重 ${d175(f).gramsPerMetre} 克，10 克能抽出 ${d175(f).metresPer10g} 公尺。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '길이는 스풀 무게를 1m의 무게로 나눈 값이고, 1m의 무게는 단면적 × 밀도입니다.',
      '같은 무게라면 밀도가 큰 재료일수록 짧게 감겨 있습니다.',
      '2.85mm는 단면적이 1.75mm의 2.65배라 같은 무게에서 그만큼 짧습니다.',
      '표의 무게는 필라멘트 순 무게입니다 — 빈 스풀 무게는 들어 있지 않습니다.',
    ],
    [
      'Length is the spool weight divided by the weight of one metre — cross-section times density.',
      'At the same weight, a denser material winds shorter.',
      'A 2.85 mm strand has 2.65 times the cross-section of 1.75 mm, and is that much shorter per kilogram.',
      'Weights here are net filament — the empty spool is not included.',
    ],
    [
      'La longitud es el peso de la bobina entre el peso de un metro: sección por densidad.',
      'A igual peso, un material más denso rinde menos metros.',
      'El hilo de 2,85 mm tiene 2,65 veces la sección del de 1,75 mm y es ese tanto más corto por kilo.',
      'Los pesos son netos: la bobina vacía no está incluida.',
    ],
    [
      'O comprimento é o peso do carretel dividido pelo peso de um metro: seção vezes densidade.',
      'No mesmo peso, um material mais denso rende menos metros.',
      'O fio de 2,85 mm tem 2,65 vezes a seção do de 1,75 mm e é isso mais curto por quilo.',
      'Os pesos são líquidos: o carretel vazio não está incluído.',
    ],
    [
      '長さはスプールの重さを1mの重さで割った値で、1mの重さは断面積 × 密度です。',
      '同じ重さなら、密度が大きい材料ほど短く巻かれています。',
      '2.85mmは断面積が1.75mmの2.65倍なので、同じ重さでその分だけ短くなります。',
      '表の重さはフィラメントの正味です — 空スプールの重さは入っていません。',
    ],
    [
      'Die Länge ist das Spulengewicht geteilt durch das Gewicht eines Meters — Querschnitt mal Dichte.',
      'Bei gleichem Gewicht wickelt sich ein dichteres Material kürzer.',
      'Ein 2,85-mm-Strang hat den 2,65-fachen Querschnitt von 1,75 mm und ist je Kilo entsprechend kürzer.',
      'Die Gewichte sind netto — die leere Spule zählt nicht mit.',
    ],
    [
      'La longueur est le poids de la bobine divisé par le poids d’un mètre : section fois densité.',
      'À poids égal, un matériau plus dense s’enroule plus court.',
      'Le fil de 2,85 mm a 2,65 fois la section du 1,75 mm et est d’autant plus court par kilo.',
      'Les poids sont nets — la bobine vide n’est pas comptée.',
    ],
    [
      'लंबाई = स्पूल का वज़न ÷ 1 m का वज़न, और 1 m का वज़न = काट × घनत्व।',
      'वज़न बराबर हो तो ज़्यादा घनी सामग्री उतनी ही छोटी लिपटती है।',
      '2.85 mm की काट 1.75 mm से 2.65 गुना है, इसलिए उसी वज़न में उतना छोटा।',
      'यहाँ के वज़न शुद्ध फ़िलामेंट के हैं — खाली स्पूल शामिल नहीं।',
    ],
    [
      '长度是料盘净重除以每米重量，每米重量是截面积乘以密度。',
      '重量相同，密度越大的材料绕得越短。',
      '2.85mm 的截面积是 1.75mm 的 2.65 倍，同样重量就短这么多。',
      '表中的重量是线材净重 — 不含空料盘。',
    ],
    [
      '長度是料捲淨重除以每公尺重量，每公尺重量是截面積乘以密度。',
      '重量相同，密度越大的材料繞得越短。',
      '2.85mm 的截面積是 1.75mm 的 2.65 倍，同樣重量就短這麼多。',
      '表中的重量是線材淨重 — 不含空料捲。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '필라멘트 길이표 48칸 — 재료와 스풀 무게별 몇 미터',
    'Filament length chart — metres per spool by material and weight',
    'Tabla de longitud de filamento — metros por bobina según material y peso',
    'Tabela de comprimento de filamento — metros por carretel, por material e peso',
    'フィラメント長さ表48マス — 材料とスプール重量別の巻き長',
    'Filamentlängen-Tabelle — Meter je Spule nach Material und Gewicht',
    'Table des longueurs de filament — mètres par bobine selon matériau et poids',
    'फ़िलामेंट लंबाई तालिका — सामग्री और स्पूल वज़न के अनुसार मीटर',
    '线材长度表 48 格 — 按材料和料盘净重的米数',
    '線材長度表 48 格 — 按材料和料捲淨重的公尺數',
  ),
  hubMetaDesc: T(
    '재료 8가지와 스풀 무게 6가지가 만나는 48칸. 1.75mm와 2.85mm의 길이, 1m의 무게, 10g으로 뽑는 길이, 남은 무게로 남은 길이 되짚는 법까지 함께 봅니다.',
    'The 48 pairings of 8 materials and 6 spool weights: metres at 1.75 mm and 2.85 mm, the weight of one metre, the length 10 g yields, and how to read remaining length off a scale.',
    'Los 48 cruces de 8 materiales y 6 pesos de bobina: metros en 1,75 y 2,85 mm, el peso de un metro, lo que rinden 10 g y cómo leer la longitud restante con una báscula.',
    'Os 48 cruzamentos de 8 materiais e 6 pesos de carretel: metros em 1,75 e 2,85 mm, o peso de um metro, o que rendem 10 g e como ler o comprimento restante com uma balança.',
    '材料8種とスプール重量6種が交わる48マス。1.75mmと2.85mmの長さ、1mの重さ、10gで引き出せる長さ、残りの重さから残りの長さを割り出す方法まで。',
    'Die 48 Paarungen aus 8 Materialien und 6 Spulengewichten: Meter bei 1,75 und 2,85 mm, das Gewicht eines Meters, die Länge je 10 g und wie man die Restlänge von der Waage abliest.',
    'Les 48 croisements de 8 matériaux et 6 poids de bobine : mètres en 1,75 et 2,85 mm, le poids d’un mètre, la longueur de 10 g et comment lire la longueur restante à la balance.',
    '8 सामग्रियों और 6 स्पूल वज़नों के 48 जोड़: 1.75 और 2.85 mm की लंबाई, 1 m का वज़न, 10 g से निकलने वाली लंबाई, और तराज़ू से बची लंबाई पढ़ने का तरीक़ा।',
    '8 种材料与 6 种料盘净重组成的 48 格：1.75mm 与 2.85mm 各自的长度、每米重量、每 10 克的长度，以及用秤读出剩余长度的方法。',
    '8 種材料與 6 種料捲淨重組成的 48 格：1.75mm 與 2.85mm 各自的長度、每公尺重量、每 10 克的長度，以及用秤讀出剩餘長度的方法。',
  ),

  metaTitle: T<(f: FilamentFacts) => string>(
    f => `${label(f)} 필라멘트 — 1.75mm로 ${d175(f).metres}m`,
    f => `${label(f)} filament — ${d175(f).metres} m at 1.75 mm`,
    f => `Filamento ${label(f)} — ${d175(f).metres} m en 1,75 mm`,
    f => `Filamento ${label(f)} — ${d175(f).metres} m em 1,75 mm`,
    f => `${label(f)}フィラメント — 1.75mmで${d175(f).metres}m`,
    f => `${label(f)} Filament — ${d175(f).metres} m bei 1,75 mm`,
    f => `Filament ${label(f)} — ${d175(f).metres} m en 1,75 mm`,
    f => `${label(f)} फ़िलामेंट — 1.75 mm पर ${d175(f).metres} m`,
    f => `${label(f)} 线材 — 1.75mm 下 ${d175(f).metres} 米`,
    f => `${label(f)} 線材 — 1.75mm 下 ${d175(f).metres} 公尺`,
  ),

  metaDesc: T<(f: FilamentFacts) => string>(
    f => `${label(f)}(밀도 ${f.density}g/cm³)은 1.75mm로 ${d175(f).metres}m, 2.85mm로 ${d285(f).metres}m입니다. 1m가 ${d175(f).gramsPerMetre}g, 10g이면 ${d175(f).metresPer10g}m, 부피는 ${f.volume}cm³입니다.`,
    f => `${label(f)} at ${f.density} g/cm³ is ${d175(f).metres} m of 1.75 mm filament and ${d285(f).metres} m of 2.85 mm. One metre weighs ${d175(f).gramsPerMetre} g, 10 g gives ${d175(f).metresPer10g} m, and the volume is ${f.volume} cm³.`,
    f => `${label(f)} con ${f.density} g/cm³ son ${d175(f).metres} m en 1,75 mm y ${d285(f).metres} m en 2,85 mm. Un metro pesa ${d175(f).gramsPerMetre} g, 10 g dan ${d175(f).metresPer10g} m y el volumen es ${f.volume} cm³.`,
    f => `${label(f)} com ${f.density} g/cm³ são ${d175(f).metres} m em 1,75 mm e ${d285(f).metres} m em 2,85 mm. Um metro pesa ${d175(f).gramsPerMetre} g, 10 g dão ${d175(f).metresPer10g} m e o volume é ${f.volume} cm³.`,
    f => `${label(f)}(密度${f.density}g/cm³)は1.75mmで${d175(f).metres}m、2.85mmで${d285(f).metres}mです。1mが${d175(f).gramsPerMetre}g、10gで${d175(f).metresPer10g}m、体積は${f.volume}cm³です。`,
    f => `${label(f)} mit ${f.density} g/cm³ sind ${d175(f).metres} m bei 1,75 mm und ${d285(f).metres} m bei 2,85 mm. Ein Meter wiegt ${d175(f).gramsPerMetre} g, 10 g ergeben ${d175(f).metresPer10g} m, das Volumen ist ${f.volume} cm³.`,
    f => `${label(f)} à ${f.density} g/cm³ fait ${d175(f).metres} m en 1,75 mm et ${d285(f).metres} m en 2,85 mm. Un mètre pèse ${d175(f).gramsPerMetre} g, 10 g donnent ${d175(f).metresPer10g} m, le volume est de ${f.volume} cm³.`,
    f => `${label(f)} (घनत्व ${f.density} g/cm³) 1.75 mm पर ${d175(f).metres} m और 2.85 mm पर ${d285(f).metres} m है। 1 m का वज़न ${d175(f).gramsPerMetre} g, 10 g से ${d175(f).metresPer10g} m, आयतन ${f.volume} cm³।`,
    f => `${label(f)}（密度 ${f.density}g/cm³）在 1.75mm 下是 ${d175(f).metres} 米，2.85mm 下是 ${d285(f).metres} 米。每米 ${d175(f).gramsPerMetre} 克，10 克 ${d175(f).metresPer10g} 米，体积 ${f.volume}cm³。`,
    f => `${label(f)}（密度 ${f.density}g/cm³）在 1.75mm 下是 ${d175(f).metres} 公尺，2.85mm 下是 ${d285(f).metres} 公尺。每公尺 ${d175(f).gramsPerMetre} 克，10 克 ${d175(f).metresPer10g} 公尺，體積 ${f.volume}cm³。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '1kg 스풀에는 몇 미터 감겨 있나요?', a: '재료에 따라 다릅니다. 1.75mm 기준 PLA는 335m, ABS는 400m, PETG는 327m쯤입니다. 무게가 같아도 밀도가 다르면 길이가 달라집니다.' },
      { q: '남은 필라멘트 길이는 어떻게 재나요?', a: '스풀째 저울에 올리고 빈 스풀 무게를 뺀 다음, 10g당 길이를 곱합니다. PLA 1.75mm면 10g에 3.35m입니다. 빈 스풀 무게는 제조사마다 다르니 새 스풀일 때 전체 무게를 한 번 적어 두면 됩니다.' },
      { q: '밀도 값은 어느 제조사나 같나요?', a: '거의 같습니다. 밀도는 재료의 물성이라 제조사가 달라도 대표값에서 채색제에 따라 몇 % 흔들리는 정도이고, 그 오차는 길이에도 같은 비율로만 옮겨 갑니다.' },
    ],
    [
      { q: 'How many metres are on a 1 kg spool?', a: 'It depends on the material. At 1.75 mm, PLA runs about 335 m, ABS about 400 m and PETG about 327 m. Equal weight does not mean equal length — density sets the difference.' },
      { q: 'How do I measure what is left on a spool?', a: 'Weigh the spool, subtract the empty spool’s weight, then multiply by the length per 10 g — 3.35 m for PLA at 1.75 mm. Tare weights differ by maker, so weigh a fresh spool once and note the difference.' },
      { q: 'Is the density the same from every maker?', a: 'Nearly. Density is a property of the material itself, so published values shift by only a few percent with pigments — and any error carries into the length in the same proportion, no more.' },
    ],
    [
      { q: '¿Cuántos metros trae una bobina de 1 kg?', a: 'Depende del material. En 1,75 mm el PLA ronda los 335 m, el ABS los 400 m y el PETG los 327 m. El mismo peso no significa la misma longitud: la diferencia la pone la densidad.' },
      { q: '¿Cómo mido lo que queda en la bobina?', a: 'Pesa la bobina, resta el peso de la bobina vacía y multiplica por la longitud de cada 10 g — 3,35 m para PLA en 1,75 mm. La tara cambia según el fabricante, así que pesa una bobina nueva una vez y anota la diferencia.' },
      { q: '¿La densidad es igual en todos los fabricantes?', a: 'Casi. Es una propiedad del material: los valores publicados apenas varían unos puntos porcentuales con los pigmentos, y ese error pasa a la longitud en la misma proporción, no más.' },
    ],
    [
      { q: '1 kg de filamento tem quantos metros?', a: 'Depende do material. Em 1,75 mm o PLA fica perto de 335 m, o ABS de 400 m e o PETG de 327 m. O mesmo peso não significa o mesmo comprimento: quem manda é a densidade.' },
      { q: 'Como meço o que resta no carretel?', a: 'Pese o carretel, subtraia o peso do carretel vazio e multiplique pelo comprimento de cada 10 g — 3,35 m para PLA em 1,75 mm. A tara varia por fabricante, então pese um carretel novo uma vez e anote a diferença.' },
      { q: 'A densidade é igual em todo fabricante?', a: 'Quase. É propriedade do material: os valores publicados variam só uns pontos percentuais com os pigmentos, e esse erro passa ao comprimento na mesma proporção, nada mais.' },
    ],
    [
      { q: '1kgのスプールには何メートル巻かれていますか。', a: '材料によります。1.75mmならPLAは335m、ABSは400m、PETGは327mほどです。重さが同じでも密度が違えば長さは変わります。' },
      { q: '残りのフィラメントはどう測りますか。', a: 'スプールごとはかりに乗せ、空スプールの重さを引いてから、10gあたりの長さを掛けます。PLAの1.75mmなら10gで3.35mです。風袋はメーカーごとに違うので、新品のときに一度控えておくと確実です。' },
      { q: '密度はどのメーカーでも同じですか。', a: 'ほぼ同じです。密度は材料の物性なので、公表値から顔料などで数%揺れる程度です。その誤差は長さにも同じ割合でしか伝わりません。' },
    ],
    [
      { q: 'Wie viele Meter sind auf einer 1-kg-Spule?', a: 'Das hängt vom Material ab. Bei 1,75 mm sind es rund 335 m PLA, 400 m ABS und 327 m PETG. Gleiches Gewicht heißt nicht gleiche Länge — den Unterschied macht die Dichte.' },
      { q: 'Wie messe ich, was auf der Spule übrig ist?', a: 'Spule wiegen, das Leergewicht abziehen und mit der Länge je 10 g multiplizieren — 3,35 m für PLA bei 1,75 mm. Die Tara ist je Hersteller anders; eine neue Spule einmal wiegen und die Differenz notieren.' },
      { q: 'Ist die Dichte bei jedem Hersteller gleich?', a: 'Fast. Sie ist eine Eigenschaft des Materials selbst: Die veröffentlichten Werte schwanken mit Pigmenten nur um wenige Prozent, und dieser Fehler überträgt sich im selben Verhältnis auf die Länge — nicht mehr.' },
    ],
    [
      { q: 'Combien de mètres sur une bobine de 1 kg ?', a: 'Cela dépend du matériau. En 1,75 mm, le PLA fait environ 335 m, l’ABS 400 m et le PETG 327 m. Même poids ne veut pas dire même longueur : c’est la densité qui fait l’écart.' },
      { q: 'Comment mesurer ce qui reste sur la bobine ?', a: 'Pesez la bobine, soustrayez le poids de la bobine vide, puis multipliez par la longueur de chaque 10 g — 3,35 m pour le PLA en 1,75 mm. La tare varie selon le fabricant : pesez une bobine neuve une fois et notez l’écart.' },
      { q: 'La densité est-elle la même chez tous les fabricants ?', a: 'Presque. C’est une propriété du matériau : les valeurs publiées ne bougent que de quelques pour cent avec les pigments, et cette erreur se reporte sur la longueur dans la même proportion, pas davantage.' },
    ],
    [
      { q: '1 kg स्पूल पर कितने मीटर होते हैं?', a: 'सामग्री पर निर्भर है। 1.75 mm में PLA क़रीब 335 m, ABS 400 m और PETG 327 m। वज़न बराबर होने पर भी घनत्व अलग हो तो लंबाई अलग होती है।' },
      { q: 'स्पूल पर बचा फ़िलामेंट कैसे नापें?', a: 'स्पूल समेत तौलें, खाली स्पूल का वज़न घटाएँ, फिर हर 10 g की लंबाई से गुणा करें — 1.75 mm के PLA में 3.35 m। खाली स्पूल का वज़न हर निर्माता का अलग है, नया स्पूल एक बार तौलकर अंतर लिख लें।' },
      { q: 'क्या घनत्व हर निर्माता में एक-सा है?', a: 'लगभग। घनत्व सामग्री का गुण है: प्रकाशित मान रंगों के साथ बस कुछ प्रतिशत हिलते हैं, और वह अंतर लंबाई में भी उसी अनुपात में ही जाता है, उससे ज़्यादा नहीं।' },
    ],
    [
      { q: '1kg 的料盘上有多少米？', a: '看材料。1.75mm 下 PLA 约 335 米，ABS 约 400 米，PETG 约 327 米。重量相同、密度不同，长度就不同。' },
      { q: '怎么量料盘上还剩多少？', a: '连盘称重，减去空盘重量，再乘以每 10 克的长度 — 1.75mm 的 PLA 是 3.35 米。空盘重量各家不同，新料盘时称一次记下差值即可。' },
      { q: '密度每家厂商都一样吗？', a: '几乎一样。密度是材料本身的性质，公开值随色料只差百分之几，这点误差也只按同样比例带进长度，不会放大。' },
    ],
    [
      { q: '1kg 的料捲上有多少公尺？', a: '看材料。1.75mm 下 PLA 約 335 公尺，ABS 約 400 公尺，PETG 約 327 公尺。重量相同、密度不同，長度就不同。' },
      { q: '怎麼量料捲上還剩多少？', a: '連捲秤重，減去空捲重量，再乘以每 10 克的長度 — 1.75mm 的 PLA 是 3.35 公尺。空捲重量各家不同，新料捲時秤一次記下差值即可。' },
      { q: '密度每家廠商都一樣嗎？', a: '幾乎一樣。密度是材料本身的性質，公開值隨色料只差百分之幾，這點誤差也只按同樣比例帶進長度，不會放大。' },
    ],
  ),

  cellFaq: T<(f: FilamentFacts) => FaqItem[]>(
    f => [
      { q: `${label(f)}은 몇 미터인가요?`, a: `1.75mm로 ${d175(f).metres}m, 2.85mm로 ${d285(f).metres}m입니다. 밀도 ${f.density}g/cm³에서 1m의 무게가 각각 ${d175(f).gramsPerMetre}g과 ${d285(f).gramsPerMetre}g이기 때문입니다.` },
      { q: '남은 무게로 남은 길이를 알 수 있나요?', a: `있습니다. 1.75mm 기준 10g에 ${d175(f).metresPer10g}m이므로, 저울 값에서 빈 스풀 무게를 뺀 그램수에 곱하면 됩니다. 100g이 남았다면 ${per100(f)}m쯤입니다.` },
      { q: '2.85mm도 길이가 같나요?', a: `아니요. 단면적이 2.65배라 1m의 무게가 ${d285(f).gramsPerMetre}g으로 늘고, 같은 ${kgOf(f.cell.grams)}에서 ${d285(f).metres}m로 짧아집니다.` },
    ],
    f => [
      { q: `How many metres is ${label(f)}?`, a: `${d175(f).metres} m at 1.75 mm and ${d285(f).metres} m at 2.85 mm. At ${f.density} g/cm³ one metre weighs ${d175(f).gramsPerMetre} g and ${d285(f).gramsPerMetre} g respectively.` },
      { q: 'Can I get the remaining length from the remaining weight?', a: `Yes. Each 10 g holds ${d175(f).metresPer10g} m at 1.75 mm, so multiply the grams left after subtracting the empty spool: 100 g left is about ${per100(f)} m.` },
      { q: 'Is the length the same at 2.85 mm?', a: `No. The cross-section is 2.65 times larger, one metre weighs ${d285(f).gramsPerMetre} g, and the same ${kgOf(f.cell.grams)} shortens to ${d285(f).metres} m.` },
    ],
    f => [
      { q: `¿Cuántos metros son ${label(f)}?`, a: `${d175(f).metres} m en 1,75 mm y ${d285(f).metres} m en 2,85 mm. Con ${f.density} g/cm³, un metro pesa ${d175(f).gramsPerMetre} g y ${d285(f).gramsPerMetre} g respectivamente.` },
      { q: '¿Puedo sacar la longitud restante del peso restante?', a: `Sí. Cada 10 g guardan ${d175(f).metresPer10g} m en 1,75 mm: multiplica los gramos que queden tras restar la bobina vacía. Con 100 g restantes son unos ${per100(f)} m.` },
      { q: '¿En 2,85 mm la longitud es la misma?', a: `No. La sección es 2,65 veces mayor, un metro pesa ${d285(f).gramsPerMetre} g y el mismo ${kgOf(f.cell.grams)} se queda en ${d285(f).metres} m.` },
    ],
    f => [
      { q: `Quantos metros são ${label(f)}?`, a: `${d175(f).metres} m em 1,75 mm e ${d285(f).metres} m em 2,85 mm. Com ${f.density} g/cm³, um metro pesa ${d175(f).gramsPerMetre} g e ${d285(f).gramsPerMetre} g respectivamente.` },
      { q: 'Dá para tirar o comprimento restante do peso restante?', a: `Dá. Cada 10 g guardam ${d175(f).metresPer10g} m em 1,75 mm: multiplique os gramas que sobram depois de descontar o carretel vazio. Com 100 g restantes são uns ${per100(f)} m.` },
      { q: 'Em 2,85 mm o comprimento é o mesmo?', a: `Não. A seção é 2,65 vezes maior, um metro pesa ${d285(f).gramsPerMetre} g e o mesmo ${kgOf(f.cell.grams)} encolhe para ${d285(f).metres} m.` },
    ],
    f => [
      { q: `${label(f)}は何メートルですか。`, a: `1.75mmで${d175(f).metres}m、2.85mmで${d285(f).metres}mです。密度${f.density}g/cm³で1mの重さがそれぞれ${d175(f).gramsPerMetre}gと${d285(f).gramsPerMetre}gだからです。` },
      { q: '残りの重さから長さを出せますか。', a: `出せます。1.75mmなら10gで${d175(f).metresPer10g}mなので、空スプール分を引いたグラム数に掛けるだけです。100g残っていれば${per100(f)}mほどです。` },
      { q: '2.85mmでも長さは同じですか。', a: `いいえ。断面積が2.65倍で1mの重さが${d285(f).gramsPerMetre}gになり、同じ${kgOf(f.cell.grams)}でも${d285(f).metres}mに縮みます。` },
    ],
    f => [
      { q: `Wie viele Meter sind ${label(f)}?`, a: `${d175(f).metres} m bei 1,75 mm und ${d285(f).metres} m bei 2,85 mm. Bei ${f.density} g/cm³ wiegt ein Meter ${d175(f).gramsPerMetre} g beziehungsweise ${d285(f).gramsPerMetre} g.` },
      { q: 'Ergibt das Restgewicht die Restlänge?', a: `Ja. Je 10 g stecken ${d175(f).metresPer10g} m bei 1,75 mm darin — die Gramm nach Abzug der leeren Spule damit multiplizieren. 100 g Rest sind etwa ${per100(f)} m.` },
      { q: 'Ist die Länge bei 2,85 mm dieselbe?', a: `Nein. Der Querschnitt ist 2,65-mal so groß, ein Meter wiegt ${d285(f).gramsPerMetre} g, und dasselbe ${kgOf(f.cell.grams)} schrumpft auf ${d285(f).metres} m.` },
    ],
    f => [
      { q: `Combien de mètres fait ${label(f)} ?`, a: `${d175(f).metres} m en 1,75 mm et ${d285(f).metres} m en 2,85 mm. À ${f.density} g/cm³, un mètre pèse respectivement ${d175(f).gramsPerMetre} g et ${d285(f).gramsPerMetre} g.` },
      { q: 'Peut-on déduire la longueur restante du poids restant ?', a: `Oui. Chaque 10 g contiennent ${d175(f).metresPer10g} m en 1,75 mm : multipliez les grammes restants après déduction de la bobine vide. À 100 g restants, cela fait environ ${per100(f)} m.` },
      { q: 'La longueur est-elle la même en 2,85 mm ?', a: `Non. La section est 2,65 fois plus grande, un mètre pèse ${d285(f).gramsPerMetre} g, et le même ${kgOf(f.cell.grams)} tombe à ${d285(f).metres} m.` },
    ],
    f => [
      { q: `${label(f)} कितने मीटर है?`, a: `1.75 mm पर ${d175(f).metres} m और 2.85 mm पर ${d285(f).metres} m। ${f.density} g/cm³ पर 1 m का वज़न क्रमशः ${d175(f).gramsPerMetre} g और ${d285(f).gramsPerMetre} g है।` },
      { q: 'क्या बचे वज़न से बची लंबाई निकलती है?', a: `हाँ। 1.75 mm में हर 10 g पर ${d175(f).metresPer10g} m — खाली स्पूल घटाने के बाद बचे ग्राम से गुणा करें। 100 g बचा हो तो क़रीब ${per100(f)} m।` },
      { q: 'क्या 2.85 mm में लंबाई वही रहती है?', a: `नहीं। काट 2.65 गुना बड़ी है, 1 m का वज़न ${d285(f).gramsPerMetre} g हो जाता है और वही ${kgOf(f.cell.grams)} घटकर ${d285(f).metres} m रह जाता है।` },
    ],
    f => [
      { q: `${label(f)} 有多少米？`, a: `1.75mm 下 ${d175(f).metres} 米，2.85mm 下 ${d285(f).metres} 米。密度 ${f.density}g/cm³ 时，每米分别重 ${d175(f).gramsPerMetre} 克和 ${d285(f).gramsPerMetre} 克。` },
      { q: '能用剩余重量算剩余长度吗？', a: `能。1.75mm 下每 10 克是 ${d175(f).metresPer10g} 米，把减去空盘后的克数乘上去即可。剩 100 克约为 ${per100(f)} 米。` },
      { q: '2.85mm 的长度一样吗？', a: `不一样。截面积大 2.65 倍，每米重 ${d285(f).gramsPerMetre} 克，同样的 ${kgOf(f.cell.grams)} 缩短到 ${d285(f).metres} 米。` },
    ],
    f => [
      { q: `${label(f)} 有多少公尺？`, a: `1.75mm 下 ${d175(f).metres} 公尺，2.85mm 下 ${d285(f).metres} 公尺。密度 ${f.density}g/cm³ 時，每公尺分別重 ${d175(f).gramsPerMetre} 克和 ${d285(f).gramsPerMetre} 克。` },
      { q: '能用剩餘重量算剩餘長度嗎？', a: `能。1.75mm 下每 10 克是 ${d175(f).metresPer10g} 公尺，把減去空捲後的克數乘上去即可。剩 100 克約為 ${per100(f)} 公尺。` },
      { q: '2.85mm 的長度一樣嗎？', a: `不一樣。截面積大 2.65 倍，每公尺重 ${d285(f).gramsPerMetre} 克，同樣的 ${kgOf(f.cell.grams)} 縮短到 ${d285(f).metres} 公尺。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const FILAMENT_UI: L<FilamentUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<FilamentUI>;
