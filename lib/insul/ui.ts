/**
 * 단열 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "재료만으로도 두께만으로도 말할 수 없다"이다.
 * 열저항은 둘을 나눈 값 하나이므로, 얇은 좋은 재료와 두꺼운 흔한 재료가 같은
 * 자리에 선다. 콘크리트로 치면 몇 미터인지가 그 값어치를 가장 잘 보여 준다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { InsulFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface InsulUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  materialLabel: string;
  thicknessLabel: string;
  lambdaLabel: string;
  rLabel: string;
  uLabel: string;
  lossLabel: string;
  concreteLabel: string;
  sameLabel: string;
  meetsLabel: string;
  meetsNone: string;
  materialName: (key: string) => string;
  targetName: (key: string) => string;
  lambdaTitle: string;
  lambdaNote: string;
  rTitle: string;
  rNote: string;
  uTitle: string;
  uNote: string;
  concreteTitle: string;
  concreteNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  thicknessRowTitle: string;
  materialRowTitle: string;
  desc: (f: InsulFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: InsulFacts) => string;
  metaDesc: (f: InsulFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: InsulFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 재료 이름은 제목과 질문에서도 같은 것을 쓴다 — SPEC 밖으로 꺼낸다 */
const nameKo = pick({ vacuum: '진공단열재', phenolic: '페놀폼', pur: '경질우레탄', xps: '압출법 스티로폼', eps2: '비드법 2종', eps1: '비드법 1종', glasswool: '글라스울', mineralwool: '미네랄울', cellulose: '셀룰로스', wood: '목재', plaster: '석고보드', concrete: '콘크리트' });
const nameEn = pick({ vacuum: 'vacuum panel', phenolic: 'phenolic foam', pur: 'rigid polyurethane', xps: 'extruded polystyrene', eps2: 'graphite EPS', eps1: 'white EPS', glasswool: 'glass wool', mineralwool: 'mineral wool', cellulose: 'cellulose', wood: 'timber', plaster: 'plasterboard', concrete: 'concrete' });
const nameEs = pick({ vacuum: 'panel de vacío', phenolic: 'espuma fenólica', pur: 'poliuretano rígido', xps: 'poliestireno extruido', eps2: 'EPS con grafito', eps1: 'EPS blanco', glasswool: 'lana de vidrio', mineralwool: 'lana mineral', cellulose: 'celulosa', wood: 'madera', plaster: 'placa de yeso', concrete: 'hormigón' });
const namePt = pick({ vacuum: 'painel a vácuo', phenolic: 'espuma fenólica', pur: 'poliuretano rígido', xps: 'poliestireno extrudado', eps2: 'EPS com grafite', eps1: 'EPS branco', glasswool: 'lã de vidro', mineralwool: 'lã mineral', cellulose: 'celulose', wood: 'madeira', plaster: 'placa de gesso', concrete: 'concreto' });
const nameJa = pick({ vacuum: '真空断熱材', phenolic: 'フェノールフォーム', pur: '硬質ウレタン', xps: '押出法ポリスチレン', eps2: 'ビーズ法2号', eps1: 'ビーズ法1号', glasswool: 'グラスウール', mineralwool: 'ロックウール', cellulose: 'セルロース', wood: '木材', plaster: '石膏ボード', concrete: 'コンクリート' });
const nameDe = pick({ vacuum: 'Vakuumdämmplatte', phenolic: 'Phenolharzschaum', pur: 'PUR-Hartschaum', xps: 'XPS-Hartschaum', eps2: 'Grafit-EPS', eps1: 'weißes EPS', glasswool: 'Glaswolle', mineralwool: 'Steinwolle', cellulose: 'Zellulose', wood: 'Holz', plaster: 'Gipskarton', concrete: 'Beton' });
const nameFr = pick({ vacuum: 'panneau sous vide', phenolic: 'mousse phénolique', pur: 'polyuréthane rigide', xps: 'polystyrène extrudé', eps2: 'PSE graphité', eps1: 'PSE blanc', glasswool: 'laine de verre', mineralwool: 'laine de roche', cellulose: 'cellulose', wood: 'bois', plaster: 'plaque de plâtre', concrete: 'béton' });
const nameHi = pick({ vacuum: 'वैक्यूम पैनल', phenolic: 'फ़ेनोलिक फ़ोम', pur: 'कठोर पॉलीयुरेथेन', xps: 'एक्सट्रूडेड पॉलीस्टाइरीन', eps2: 'ग्रेफ़ाइट EPS', eps1: 'सफ़ेद EPS', glasswool: 'ग्लास वूल', mineralwool: 'मिनरल वूल', cellulose: 'सेल्युलोज़', wood: 'लकड़ी', plaster: 'जिप्सम बोर्ड', concrete: 'कंक्रीट' });
const nameZh = pick({ vacuum: '真空绝热板', phenolic: '酚醛泡沫', pur: '硬质聚氨酯', xps: '挤塑聚苯板', eps2: '石墨聚苯板', eps1: '白色聚苯板', glasswool: '玻璃棉', mineralwool: '岩棉', cellulose: '纤维素', wood: '木材', plaster: '石膏板', concrete: '混凝土' });
const nameTw = pick({ vacuum: '真空絕熱板', phenolic: '酚醛泡棉', pur: '硬質聚氨酯', xps: '擠塑聚苯板', eps2: '石墨聚苯板', eps1: '白色聚苯板', glasswool: '玻璃棉', mineralwool: '岩棉', cellulose: '纖維素', wood: '木材', plaster: '石膏板', concrete: '混凝土' });

type Spec = { [K in keyof InsulUI]: L<InsulUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('단열재', 'Insulation', 'Aislamiento', 'Isolamento', '断熱材', 'Dämmung', 'Isolation', 'इन्सुलेशन', '保温材料', '保溫材料'),

  materialName: T<(key: string) => string>(nameKo, nameEn, nameEs, namePt, nameJa, nameDe, nameFr, nameHi, nameZh, nameTw),

  targetName: T<(key: string) => string>(
    pick({ passive: '패시브하우스 0.15', korea: '한국 중부 외벽 0.17', basic: '느슨한 기준 0.30' }),
    pick({ passive: 'passive house 0.15', korea: 'Korean central-region wall 0.17', basic: 'loose standard 0.30' }),
    pick({ passive: 'casa pasiva 0,15', korea: 'muro central de Corea 0,17', basic: 'estándar laxo 0,30' }),
    pick({ passive: 'casa passiva 0,15', korea: 'parede central da Coreia 0,17', basic: 'padrão frouxo 0,30' }),
    pick({ passive: 'パッシブハウス 0.15', korea: '韓国中部の外壁 0.17', basic: '緩い基準 0.30' }),
    pick({ passive: 'Passivhaus 0,15', korea: 'koreanische Außenwand 0,17', basic: 'lockerer Standard 0,30' }),
    pick({ passive: 'maison passive 0,15', korea: 'mur coréen (centre) 0,17', basic: 'norme souple 0,30' }),
    pick({ passive: 'पैसिव हाउस 0.15', korea: 'कोरिया मध्य दीवार 0.17', basic: 'ढीला मानक 0.30' }),
    pick({ passive: '被动房 0.15', korea: '韩国中部外墙 0.17', basic: '宽松标准 0.30' }),
    pick({ passive: '被動房 0.15', korea: '韓國中部外牆 0.17', basic: '寬鬆標準 0.30' }),
  ),

  hubTitle: T(
    '단열 144칸 — 압출법 100mm는 콘크리트 5.7미터',
    '144 insulation cells — 100 mm of XPS equals 5.7 m of concrete',
    '144 casillas de aislamiento — 100 mm de XPS equivalen a 5,7 m de hormigón',
    '144 células de isolamento — 100 mm de XPS equivalem a 5,7 m de concreto',
    '断熱144マス — 押出法100mmはコンクリート5.7メートル',
    '144 Dämmfelder — 100 mm XPS entsprechen 5,7 m Beton',
    '144 cases d’isolation — 100 mm de XPS valent 5,7 m de béton',
    '144 इन्सुलेशन खाने — 100 mm XPS यानी 5.7 मीटर कंक्रीट',
    '144 格保温 — 100mm 挤塑板相当于 5.7 米混凝土',
    '144 格保溫 — 100mm 擠塑板相當於 5.7 公尺混凝土',
  ),

  hubLead: T(
    '재료 12가지와 두께 12가지가 만나는 칸마다 열저항과 열관류율을 계산했습니다. 단열은 재료만으로도 두께만으로도 말할 수 없고, 둘을 나눈 값 하나로 정해집니다.',
    'A thermal resistance and a U-value for every meeting of 12 materials and 12 thicknesses. Insulation cannot be described by the material alone or the thickness alone — one division settles it.',
    'Una resistencia térmica y una transmitancia para cada cruce de 12 materiales y 12 espesores. El aislamiento no se describe solo por el material ni solo por el espesor: lo decide una división.',
    'Uma resistência térmica e uma transmitância para cada cruzamento de 12 materiais e 12 espessuras. O isolamento não se descreve só pelo material nem só pela espessura — uma divisão resolve.',
    '材料12通りと厚さ12通りが出会う各マスの熱抵抗と熱貫流率を計算しました。断熱は材料だけでも厚さだけでも語れず、両者を割った値ひとつで決まります。',
    'Ein Wärmedurchlasswiderstand und ein U-Wert für jede Begegnung von 12 Materialien und 12 Dicken. Dämmung lässt sich weder allein über das Material noch allein über die Dicke sagen — eine Division entscheidet.',
    'Une résistance thermique et un coefficient U pour chaque croisement de 12 matériaux et 12 épaisseurs. L’isolation ne se dit ni par le seul matériau ni par la seule épaisseur : une division tranche.',
    '12 सामग्रियों और 12 मोटाइयों के हर मेल का तापीय प्रतिरोध और U-मान। इन्सुलेशन न केवल सामग्री से, न केवल मोटाई से बताया जा सकता है — एक भाग ही तय करता है।',
    '12 种材料与 12 种厚度交汇的每一格都算出热阻和传热系数。保温既不能只看材料，也不能只看厚度——一个除法就定下来了。',
    '12 種材料與 12 種厚度交匯的每一格都算出熱阻和傳熱係數。保溫既不能只看材料，也不能只看厚度——一個除法就定下來了。',
  ),

  materialLabel: T('재료', 'Material', 'Material', 'Material', '材料', 'Material', 'Matériau', 'सामग्री', '材料', '材料'),
  thicknessLabel: T('두께', 'Thickness', 'Espesor', 'Espessura', '厚さ', 'Dicke', 'Épaisseur', 'मोटाई', '厚度', '厚度'),
  lambdaLabel: T('열전도율', 'Thermal conductivity', 'Conductividad térmica', 'Condutividade térmica', '熱伝導率', 'Wärmeleitfähigkeit', 'Conductivité thermique', 'तापीय चालकता', '导热系数', '導熱係數'),
  rLabel: T('열저항', 'Thermal resistance', 'Resistencia térmica', 'Resistência térmica', '熱抵抗', 'Wärmedurchlasswiderstand', 'Résistance thermique', 'तापीय प्रतिरोध', '热阻', '熱阻'),
  uLabel: T('열관류율', 'U-value', 'Transmitancia', 'Transmitância', '熱貫流率', 'U-Wert', 'Coefficient U', 'U-मान', '传热系数', '傳熱係數'),
  lossLabel: T('1제곱미터가 잃는 열', 'Heat lost per square metre', 'Calor perdido por metro cuadrado', 'Calor perdido por metro quadrado', '1平方メートルが失う熱', 'Wärmeverlust je Quadratmeter', 'Chaleur perdue par mètre carré', 'प्रति वर्ग मीटर ऊष्मा हानि', '每平方米热损失', '每平方公尺熱損失'),
  concreteLabel: T('콘크리트로 치면', 'As concrete', 'En hormigón', 'Em concreto', 'コンクリートに直すと', 'In Beton', 'En béton', 'कंक्रीट में', '折合混凝土', '折合混凝土'),
  sameLabel: T('같은 성능을 내는 두께', 'Thickness for the same performance', 'Espesor para el mismo resultado', 'Espessura para o mesmo resultado', '同じ性能に必要な厚さ', 'Dicke für dieselbe Leistung', 'Épaisseur pour le même résultat', 'समान प्रदर्शन की मोटाई', '同等性能所需厚度', '同等性能所需厚度'),
  meetsLabel: T('만족하는 기준', 'Standards it meets', 'Normas que cumple', 'Normas que atende', '満たす基準', 'Erfüllte Standards', 'Normes atteintes', 'पूरे होने वाले मानक', '满足的标准', '滿足的標準'),
  meetsNone: T('아직 어느 기준에도 못 미칩니다', 'Not up to any of them yet', 'Todavía no llega a ninguna', 'Ainda não atinge nenhuma', 'まだどの基準にも届きません', 'Noch keiner davon erfüllt', 'Aucune n’est encore atteinte', 'अभी कोई भी पूरा नहीं', '目前一个都达不到', '目前一個都達不到'),

  lambdaTitle: T('열전도율이 재료를 말합니다', 'Conductivity is what a material is', 'La conductividad define el material', 'A condutividade define o material', '熱伝導率が材料を語ります', 'Die Leitfähigkeit ist das Material', 'La conductivité définit le matériau', 'चालकता ही सामग्री बताती है', '导热系数说明材料', '導熱係數說明材料'),

  lambdaNote: T(
    '열전도율은 1미터 두께가 1도 차이에서 1제곱미터당 몇 와트를 흘려보내는가입니다. 작을수록 열을 안 지나 보냅니다. 진공단열재가 0.007이고 콘크리트가 1.6이니 230배 차이인데, 그 차이가 그대로 두께 차이로 나타납니다.',
    'Conductivity says how many watts pass through a square metre of a one-metre-thick slab per degree of difference. Lower is better. A vacuum panel is 0.007 and concrete is 1.6 — a factor of 230, and that factor turns straight into a difference in thickness.',
    'La conductividad dice cuántos vatios atraviesan un metro cuadrado de una placa de un metro por cada grado de diferencia. Cuanto menor, mejor. Un panel de vacío es 0,007 y el hormigón 1,6: un factor de 230 que se traduce directamente en espesor.',
    'A condutividade diz quantos watts atravessam um metro quadrado de uma placa de um metro por grau de diferença. Quanto menor, melhor. Um painel a vácuo é 0,007 e o concreto 1,6 — fator de 230, que vira diferença de espessura.',
    '熱伝導率は、厚さ1メートルの材料が1度の差で1平方メートルあたり何ワットを通すかです。小さいほど熱を通しません。真空断熱材が0.007、コンクリートが1.6なので230倍の差があり、それがそのまま厚さの差になります。',
    'Die Leitfähigkeit sagt, wie viele Watt bei einem Grad Unterschied durch einen Quadratmeter einer ein Meter dicken Schicht gehen. Kleiner ist besser. Vakuumdämmung liegt bei 0,007, Beton bei 1,6 — Faktor 230, und genau dieser Faktor wird zur Dickendifferenz.',
    'La conductivité indique combien de watts traversent un mètre carré d’une couche d’un mètre par degré d’écart. Plus c’est bas, mieux c’est. Un panneau sous vide vaut 0,007 et le béton 1,6 — un facteur 230 qui se traduit directement en épaisseur.',
    'चालकता बताती है कि एक मीटर मोटी परत के प्रति वर्ग मीटर से एक डिग्री अंतर पर कितने वाट निकलते हैं। जितनी कम, उतनी अच्छी। वैक्यूम पैनल 0.007 और कंक्रीट 1.6 — 230 गुना अंतर, और वही अंतर सीधे मोटाई में बदल जाता है।',
    '导热系数说的是一米厚的材料在一度温差下每平方米通过多少瓦。越小越好。真空绝热板是 0.007，混凝土是 1.6，相差 230 倍，而这个倍数会直接变成厚度差。',
    '導熱係數說的是一公尺厚的材料在一度溫差下每平方公尺通過多少瓦。越小越好。真空絕熱板是 0.007，混凝土是 1.6，相差 230 倍，而這個倍數會直接變成厚度差。',
  ),

  rTitle: T('열저항은 나눗셈 하나입니다', 'Resistance is one division', 'La resistencia es una división', 'A resistência é uma divisão', '熱抵抗は割り算ひとつです', 'Der Widerstand ist eine Division', 'La résistance tient en une division', 'प्रतिरोध एक भाग है', '热阻只是一个除法', '熱阻只是一個除法'),

  rNote: T(
    '두께를 미터로 고쳐 열전도율로 나누면 열저항입니다. 100밀리미터 압출법이면 0.1 ÷ 0.028 = 3.57입니다. 두께가 두 배면 열저항도 두 배라, 이 값은 겹쳐 쌓은 층끼리 더할 수 있습니다 — 벽 전체를 셈할 때 쓰는 성질입니다.',
    'Convert the thickness to metres and divide by the conductivity. For 100 mm of XPS that is 0.1 ÷ 0.028 = 3.57. Double the thickness and the resistance doubles, and resistances of stacked layers simply add — which is how a whole wall gets calculated.',
    'Pasa el espesor a metros y divide por la conductividad. Para 100 mm de XPS: 0,1 ÷ 0,028 = 3,57. Al doblar el espesor se dobla la resistencia, y las resistencias de capas apiladas se suman: así se calcula un muro entero.',
    'Converta a espessura para metros e divida pela condutividade. Para 100 mm de XPS: 0,1 ÷ 0,028 = 3,57. Dobrando a espessura dobra a resistência, e resistências de camadas empilhadas simplesmente somam — é assim que se calcula uma parede inteira.',
    '厚さをメートルに直して熱伝導率で割れば熱抵抗です。100ミリの押出法なら0.1 ÷ 0.028 = 3.57です。厚さが2倍なら熱抵抗も2倍で、重ねた層どうしは足せます — 壁全体を計算するときに使う性質です。',
    'Dicke in Meter umrechnen und durch die Leitfähigkeit teilen. Für 100 mm XPS: 0,1 ÷ 0,028 = 3,57. Doppelte Dicke, doppelter Widerstand — und Widerstände gestapelter Schichten addieren sich einfach. So rechnet man eine ganze Wand.',
    'Convertissez l’épaisseur en mètres et divisez par la conductivité. Pour 100 mm de XPS : 0,1 ÷ 0,028 = 3,57. Doubler l’épaisseur double la résistance, et les résistances des couches superposées s’additionnent — c’est ainsi qu’on calcule un mur entier.',
    'मोटाई को मीटर में बदलकर चालकता से भाग दें — यही तापीय प्रतिरोध है। 100 mm XPS के लिए 0.1 ÷ 0.028 = 3.57। मोटाई दोगुनी तो प्रतिरोध भी दोगुना, और परतों के प्रतिरोध जुड़ जाते हैं — पूरी दीवार इसी तरह गिनी जाती है।',
    '把厚度换成米，除以导热系数，就是热阻。100mm 挤塑板即 0.1 ÷ 0.028 = 3.57。厚度加倍热阻也加倍，而且叠层的热阻可以直接相加——整面墙就是这样算的。',
    '把厚度換成公尺，除以導熱係數，就是熱阻。100mm 擠塑板即 0.1 ÷ 0.028 = 3.57。厚度加倍熱阻也加倍，而且疊層的熱阻可以直接相加——整面牆就是這樣算的。',
  ),

  uTitle: T('열관류율은 뒤집은 값입니다', 'The U-value is the other way up', 'La transmitancia es el inverso', 'A transmitância é o inverso', '熱貫流率はひっくり返した値です', 'Der U-Wert ist der Kehrwert', 'Le coefficient U est l’inverse', 'U-मान उलटा मान है', '传热系数是倒过来的值', '傳熱係數是倒過來的值'),

  uNote: T(
    '열저항이 클수록 좋고, 열관류율은 그것을 뒤집은 값이라 작을수록 좋습니다. 뒤집기 전에 벽 안팎 표면이 붙드는 0.13과 0.04를 더합니다 — 아무것도 안 붙인 벽도 이만큼은 막아 주기 때문입니다. 그래서 두께가 0이어도 열관류율이 무한이 되지 않습니다.',
    'A bigger resistance is better; the U-value is its reciprocal, so smaller is better there. Before flipping it, add the 0.13 and 0.04 that the air films on either face of the wall hold back — even a bare wall does that much. It is why zero thickness does not give an infinite U-value.',
    'Una resistencia mayor es mejor; la transmitancia es su inverso, así que ahí menor es mejor. Antes de invertir se suman el 0,13 y el 0,04 que retienen las capas de aire a cada lado del muro: incluso un muro desnudo hace eso. Por eso un espesor cero no da transmitancia infinita.',
    'Uma resistência maior é melhor; a transmitância é o inverso, então ali menor é melhor. Antes de inverter, somam-se os 0,13 e 0,04 que as camadas de ar de cada face seguram — até uma parede nua faz isso. É por isso que espessura zero não dá transmitância infinita.',
    '熱抵抗は大きいほど良く、熱貫流率はそれをひっくり返した値なので小さいほど良いです。ひっくり返す前に、壁の内外の表面が抱える0.13と0.04を足します — 何も貼らない壁でもこれだけは効くからです。だから厚さが0でも熱貫流率は無限になりません。',
    'Ein größerer Widerstand ist besser; der U-Wert ist sein Kehrwert, dort ist klein besser. Vor dem Umkehren addiert man die 0,13 und 0,04 der Luftschichten an beiden Wandseiten — die hat auch eine nackte Wand. Deshalb liefert Dicke null keinen unendlichen U-Wert.',
    'Une résistance plus grande vaut mieux ; le coefficient U en est l’inverse, donc plus petit vaut mieux. Avant d’inverser, on ajoute les 0,13 et 0,04 que retiennent les lames d’air de part et d’autre du mur — même un mur nu les a. C’est pourquoi une épaisseur nulle ne donne pas un U infini.',
    'प्रतिरोध जितना बड़ा उतना अच्छा; U-मान उसका व्युत्क्रम है, इसलिए वहाँ छोटा अच्छा है। उलटने से पहले दीवार के दोनों तलों की हवा वाली 0.13 और 0.04 जोड़ी जाती हैं — नंगी दीवार में भी इतना होता है। इसीलिए शून्य मोटाई पर U-मान अनंत नहीं होता।',
    '热阻越大越好；传热系数是它的倒数，所以越小越好。取倒数之前要加上墙内外表面空气层的 0.13 和 0.04——光墙也有这么多。所以厚度为零时传热系数并不会变成无穷大。',
    '熱阻越大越好；傳熱係數是它的倒數，所以越小越好。取倒數之前要加上牆內外表面空氣層的 0.13 和 0.04——光牆也有這麼多。所以厚度為零時傳熱係數並不會變成無窮大。',
  ),

  concreteTitle: T('콘크리트로 치면 몇 미터인가', 'How many metres of concrete that is', 'Cuántos metros de hormigón serían', 'Quantos metros de concreto seriam', 'コンクリートに直すと何メートルか', 'Wie viele Meter Beton das wären', 'Combien de mètres de béton cela ferait', 'यह कितने मीटर कंक्रीट है', '折合混凝土是几米', '折合混凝土是幾公尺'),

  concreteNote: T(
    '단열재의 값어치를 가장 잘 보여 주는 숫자입니다. 압출법 100밀리미터와 같은 단열을 콘크리트로 내려면 5.7미터가 필요합니다. 벽을 그렇게 두껍게 세울 수는 없으니, 콘크리트 건물은 얇은 단열재를 덧붙여야만 따뜻해집니다.',
    'This is the number that shows what insulation is worth. Matching 100 mm of XPS with concrete alone would take 5.7 metres of it. No one builds a wall like that — which is why a concrete building only gets warm once a thin layer of insulation is added.',
    'Es la cifra que mejor muestra el valor del aislamiento. Igualar 100 mm de XPS solo con hormigón exigiría 5,7 metros. Nadie levanta un muro así: por eso un edificio de hormigón solo se calienta cuando se le añade una capa fina de aislante.',
    'É o número que melhor mostra o valor do isolamento. Igualar 100 mm de XPS só com concreto exigiria 5,7 metros. Ninguém levanta uma parede assim — por isso um prédio de concreto só esquenta quando ganha uma camada fina de isolante.',
    '断熱材の値打ちを最もよく示す数字です。押出法100ミリと同じ断熱をコンクリートだけで出すには5.7メートルが要ります。そんな壁は建てられないので、コンクリートの建物は薄い断熱材を足して初めて暖かくなります。',
    'Diese Zahl zeigt am besten, was Dämmung wert ist. 100 mm XPS allein mit Beton nachzubilden bräuchte 5,7 Meter. So baut niemand eine Wand — deshalb wird ein Betongebäude erst mit einer dünnen Dämmschicht warm.',
    'C’est le chiffre qui montre le mieux ce que vaut l’isolant. Égaler 100 mm de XPS avec du béton seul demanderait 5,7 mètres. Personne ne construit un tel mur : c’est pourquoi un bâtiment en béton ne devient chaud qu’avec une fine couche d’isolant.',
    'यही संख्या इन्सुलेशन का मोल सबसे अच्छे से दिखाती है। 100 mm XPS जितना इन्सुलेशन केवल कंक्रीट से पाने के लिए 5.7 मीटर चाहिए। ऐसी दीवार कोई नहीं बनाता — इसीलिए कंक्रीट की इमारत पतली इन्सुलेशन परत जुड़ने पर ही गर्म होती है।',
    '这是最能说明保温价值的数字。要用混凝土达到 100mm 挤塑板的保温效果，需要 5.7 米厚。没人这样砌墙——所以混凝土建筑只有加上薄薄一层保温层才会暖和。',
    '這是最能說明保溫價值的數字。要用混凝土達到 100mm 擠塑板的保溫效果，需要 5.7 公尺厚。沒人這樣砌牆——所以混凝土建築只有加上薄薄一層保溫層才會暖和。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '열전도율은 제품마다 다르고, 실제 벽은 단열재 한 겹이 아니라 여러 층이 겹쳐 있습니다. 무엇보다 못 하나, 창틀 하나, 발코니 슬래브 하나가 열을 통째로 새게 하는 열교가 됩니다 — 계산보다 시공이 어렵습니다.',
    'Conductivity varies by product, and a real wall is several layers rather than one. Above all, a fastener, a window frame or a balcony slab becomes a thermal bridge that leaks past everything you calculated — the building is harder than the arithmetic.',
    'La conductividad varía según el producto y un muro real son varias capas, no una. Sobre todo, un anclaje, un marco de ventana o un forjado de balcón se convierten en puentes térmicos que dejan escapar todo lo calculado: construir cuesta más que calcular.',
    'A condutividade varia por produto, e uma parede real tem várias camadas, não uma. Acima de tudo, um fixador, um caixilho ou uma laje de sacada viram pontes térmicas que vazam tudo o que se calculou — construir é mais difícil que a conta.',
    '熱伝導率は製品ごとに違い、実際の壁は断熱材1枚ではなく何層も重なっています。何より釘1本、窓枠1つ、バルコニーのスラブ1枚が熱橋になって計算を丸ごと台無しにします — 計算より施工のほうが難しいのです。',
    'Die Leitfähigkeit unterscheidet sich je Produkt, und eine echte Wand besteht aus mehreren Schichten. Vor allem wird ein Dübel, ein Fensterrahmen oder eine Balkonplatte zur Wärmebrücke, die alles Gerechnete unterläuft — die Ausführung ist schwerer als die Rechnung.',
    'La conductivité varie selon le produit, et un vrai mur est fait de plusieurs couches. Surtout, une fixation, un dormant de fenêtre ou une dalle de balcon deviennent des ponts thermiques qui court-circuitent tout le calcul — la mise en œuvre est plus dure que l’arithmétique.',
    'चालकता उत्पाद-दर-उत्पाद बदलती है, और असली दीवार एक नहीं कई परतों की होती है। सबसे बढ़कर, एक कील, एक खिड़की का चौखट या बालकनी का स्लैब थर्मल ब्रिज बन जाता है जो सारा हिसाब बहा ले जाता है — गणना से कठिन है निर्माण।',
    '导热系数因产品而异，真实的墙也不是一层而是多层叠合。更要紧的是，一颗锚栓、一扇窗框、一块阳台楼板都会成为热桥，把算好的一切漏掉——施工比计算难。',
    '導熱係數因產品而異，真實的牆也不是一層而是多層疊合。更要緊的是，一顆錨栓、一扇窗框、一塊陽台樓板都會成為熱橋，把算好的一切漏掉——施工比計算難。',
  ),

  tableTitle: T('재료와 두께로 찾기', 'Find it by material and thickness', 'Búscalo por material y espesor', 'Ache por material e espessura', '材料と厚さから探す', 'Nach Material und Dicke suchen', 'Chercher par matériau et épaisseur', 'सामग्री और मोटाई से देखें', '按材料和厚度查找', '按材料和厚度查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  thicknessRowTitle: T('같은 재료, 다른 두께', 'Same material, other thicknesses', 'Mismo material, otros espesores', 'Mesmo material, outras espessuras', '同じ材料、別の厚さ', 'Gleiches Material, andere Dicken', 'Même matériau, autres épaisseurs', 'वही सामग्री, दूसरी मोटाइयाँ', '同一材料，不同厚度', '同一材料，不同厚度'),
  materialRowTitle: T('같은 두께, 다른 재료', 'Same thickness, other materials', 'Mismo espesor, otros materiales', 'Mesma espessura, outros materiais', '同じ厚さ、別の材料', 'Gleiche Dicke, andere Materialien', 'Même épaisseur, autres matériaux', 'वही मोटाई, दूसरी सामग्री', '同一厚度，不同材料', '同一厚度，不同材料'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '열저항은 두께(m)를 열전도율로 나눈 값입니다. 클수록 좋습니다.',
      '열관류율은 표면 저항 0.17을 더한 뒤 뒤집은 값입니다. 작을수록 좋습니다.',
      '열저항은 층끼리 더할 수 있습니다. 벽 전체는 각 층을 더해서 봅니다.',
      '열전도율은 제품마다 다릅니다. 여기 값은 그 재료의 대표값입니다.',
    ],
    [
      'Thermal resistance is the thickness in metres divided by the conductivity. Bigger is better.',
      'The U-value adds 0.17 of surface resistance and then flips the total. Smaller is better.',
      'Resistances add across layers, so a whole wall is the sum of its parts.',
      'Conductivity varies by product; the values here are typical for the material.',
    ],
    [
      'La resistencia térmica es el espesor en metros dividido por la conductividad. Cuanto mayor, mejor.',
      'La transmitancia suma 0,17 de resistencia superficial y luego invierte el total. Cuanto menor, mejor.',
      'Las resistencias se suman por capas: un muro entero es la suma de sus partes.',
      'La conductividad varía según el producto; aquí figuran valores típicos del material.',
    ],
    [
      'A resistência térmica é a espessura em metros dividida pela condutividade. Quanto maior, melhor.',
      'A transmitância soma 0,17 de resistência superficial e depois inverte o total. Quanto menor, melhor.',
      'As resistências somam entre camadas: uma parede inteira é a soma das partes.',
      'A condutividade varia por produto; aqui estão valores típicos do material.',
    ],
    [
      '熱抵抗は厚さ(m)を熱伝導率で割った値です。大きいほど良いです。',
      '熱貫流率は表面抵抗0.17を足してからひっくり返した値です。小さいほど良いです。',
      '熱抵抗は層どうし足せます。壁全体は各層の合計で見ます。',
      '熱伝導率は製品ごとに違います。ここの値はその材料の代表値です。',
    ],
    [
      'Der Wärmedurchlasswiderstand ist die Dicke in Metern geteilt durch die Leitfähigkeit. Größer ist besser.',
      'Der U-Wert addiert 0,17 Übergangswiderstand und kehrt die Summe um. Kleiner ist besser.',
      'Widerstände addieren sich über Schichten — eine ganze Wand ist die Summe ihrer Lagen.',
      'Die Leitfähigkeit unterscheidet sich je Produkt; hier stehen typische Werte des Materials.',
    ],
    [
      'La résistance thermique est l’épaisseur en mètres divisée par la conductivité. Plus c’est grand, mieux c’est.',
      'Le coefficient U ajoute 0,17 de résistance superficielle puis inverse le total. Plus c’est petit, mieux c’est.',
      'Les résistances s’additionnent entre couches : un mur entier est la somme de ses parties.',
      'La conductivité varie selon le produit ; les valeurs ici sont typiques du matériau.',
    ],
    [
      'तापीय प्रतिरोध यानी मोटाई (मीटर में) को चालकता से भाग देना। जितना बड़ा उतना अच्छा।',
      'U-मान में 0.17 सतही प्रतिरोध जोड़कर कुल को उलटा जाता है। जितना छोटा उतना अच्छा।',
      'प्रतिरोध परतों में जुड़ते हैं — पूरी दीवार अपने हिस्सों का जोड़ है।',
      'चालकता उत्पाद-दर-उत्पाद बदलती है; यहाँ सामग्री के सामान्य मान हैं।',
    ],
    [
      '热阻是厚度（米）除以导热系数，越大越好。',
      '传热系数是加上 0.17 表面阻力后取倒数，越小越好。',
      '热阻可以逐层相加，整面墙就是各层之和。',
      '导热系数因产品而异，这里给的是该材料的典型值。',
    ],
    [
      '熱阻是厚度（公尺）除以導熱係數，越大越好。',
      '傳熱係數是加上 0.17 表面阻力後取倒數，越小越好。',
      '熱阻可以逐層相加，整面牆就是各層之和。',
      '導熱係數因產品而異，這裡給的是該材料的典型值。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '단열재 열저항 계산 — 재료 12가지 × 두께 12가지',
    'Insulation R-value calculator — 12 materials across 12 thicknesses',
    'Calculadora de resistencia térmica — 12 materiales y 12 espesores',
    'Calculadora de resistência térmica — 12 materiais e 12 espessuras',
    '断熱材の熱抵抗計算 — 材料12通り×厚さ12通り',
    'Dämmwert berechnen — 12 Materialien in 12 Dicken',
    'Calcul de résistance thermique — 12 matériaux, 12 épaisseurs',
    'इन्सुलेशन R-मान कैलकुलेटर — 12 सामग्री × 12 मोटाइयाँ',
    '保温热阻计算 — 12 种材料 × 12 种厚度',
    '保溫熱阻計算 — 12 種材料 × 12 種厚度',
  ),

  hubMetaDesc: T(
    '압출법 100mm는 열저항 3.57, 열관류율 0.267입니다. 재료와 두께가 만나는 144칸마다 열저항·열관류율·열손실과 같은 성능을 내는 다른 재료의 두께를 계산했습니다.',
    '100 mm of XPS gives an R-value of 3.57 and a U-value of 0.267. For all 144 pairings of material and thickness: resistance, U-value, heat loss, and the thickness every other material would need to match it.',
    '100 mm de XPS dan una resistencia de 3,57 y una transmitancia de 0,267. Para los 144 cruces de material y espesor: resistencia, transmitancia, pérdida de calor y el espesor que necesitaría cada otro material.',
    '100 mm de XPS dão resistência 3,57 e transmitância 0,267. Para os 144 cruzamentos de material e espessura: resistência, transmitância, perda de calor e a espessura que cada outro material precisaria.',
    '押出法100mmは熱抵抗3.57、熱貫流率0.267です。材料と厚さが出会う144マスの熱抵抗・熱貫流率・熱損失と、同じ性能に必要な他材料の厚さを計算しました。',
    '100 mm XPS ergeben R 3,57 und U 0,267. Für alle 144 Kombinationen aus Material und Dicke: Widerstand, U-Wert, Wärmeverlust und die Dicke, die jedes andere Material dafür bräuchte.',
    '100 mm de XPS donnent R 3,57 et U 0,267. Pour les 144 croisements matériau × épaisseur : résistance, coefficient U, déperdition et l’épaisseur qu’il faudrait à chaque autre matériau.',
    '100 mm XPS का R-मान 3.57 और U-मान 0.267 है। सामग्री और मोटाई के सभी 144 मेलों का प्रतिरोध, U-मान, ऊष्मा हानि और हर दूसरी सामग्री की आवश्यक मोटाई।',
    '100mm 挤塑板的热阻为 3.57，传热系数 0.267。材料与厚度交汇的 144 格，每格的热阻、传热系数、热损失，以及其他材料达到同等效果所需的厚度。',
    '100mm 擠塑板的熱阻為 3.57，傳熱係數 0.267。材料與厚度交匯的 144 格，每格的熱阻、傳熱係數、熱損失，以及其他材料達到同等效果所需的厚度。',
  ),

  desc: T<(f: InsulFacts) => string>(
    f => `${f.cell.mm}밀리미터를 열전도율 ${f.lambda}로 나누면 열저항 ${f.r}입니다. 열관류율은 ${f.u}이고, 1제곱미터가 20도 차이에서 ${f.loss}와트를 잃습니다.`,
    f => `${f.cell.mm} mm divided by a conductivity of ${f.lambda} gives an R-value of ${f.r}. The U-value is ${f.u}, so a square metre leaks ${f.loss} W across a 20-degree difference.`,
    f => `${f.cell.mm} mm entre una conductividad de ${f.lambda} dan una resistencia de ${f.r}. La transmitancia es ${f.u}: un metro cuadrado pierde ${f.loss} W con 20 grados de diferencia.`,
    f => `${f.cell.mm} mm divididos por uma condutividade de ${f.lambda} dão resistência ${f.r}. A transmitância é ${f.u}: um metro quadrado perde ${f.loss} W com 20 graus de diferença.`,
    f => `${f.cell.mm}ミリを熱伝導率${f.lambda}で割ると熱抵抗${f.r}です。熱貫流率は${f.u}で、1平方メートルが20度差で${f.loss}ワットを失います。`,
    f => `${f.cell.mm} mm geteilt durch die Leitfähigkeit ${f.lambda} ergeben R ${f.r}. Der U-Wert liegt bei ${f.u}; ein Quadratmeter verliert bei 20 Grad Unterschied ${f.loss} W.`,
    f => `${f.cell.mm} mm divisés par une conductivité de ${f.lambda} donnent R ${f.r}. Le coefficient U vaut ${f.u} : un mètre carré perd ${f.loss} W sous 20 degrés d’écart.`,
    f => `${f.cell.mm} mm को चालकता ${f.lambda} से भाग देने पर प्रतिरोध ${f.r} मिलता है। U-मान ${f.u} है, यानी 20 डिग्री अंतर पर प्रति वर्ग मीटर ${f.loss} W की हानि।`,
    f => `${f.cell.mm}mm 除以导热系数 ${f.lambda}，热阻为 ${f.r}。传热系数是 ${f.u}，20 度温差下每平方米损失 ${f.loss} 瓦。`,
    f => `${f.cell.mm}mm 除以導熱係數 ${f.lambda}，熱阻為 ${f.r}。傳熱係數是 ${f.u}，20 度溫差下每平方公尺損失 ${f.loss} 瓦。`,
  ),

  metaTitle: T<(f: InsulFacts) => string>(
    f => `${nameKo(f.cell.key)} ${f.cell.mm}mm — 열저항 ${f.r}`,
    f => `${nameEn(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${nameEs(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${namePt(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${nameJa(f.cell.key)} ${f.cell.mm}mm — 熱抵抗 ${f.r}`,
    f => `${nameDe(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${nameFr(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${nameHi(f.cell.key)}, ${f.cell.mm} mm — R ${f.r}`,
    f => `${nameZh(f.cell.key)} ${f.cell.mm}mm — 热阻 ${f.r}`,
    f => `${nameTw(f.cell.key)} ${f.cell.mm}mm — 熱阻 ${f.r}`,
  ),

  metaDesc: T<(f: InsulFacts) => string>(
    f => `${nameKo(f.cell.key)} ${f.cell.mm}밀리미터는 열저항 ${f.r}, 열관류율 ${f.u}입니다. 같은 단열을 콘크리트로 내려면 ${f.concrete}미터가 필요합니다.`,
    f => `${f.cell.mm} mm of ${nameEn(f.cell.key)} gives R ${f.r} and a U-value of ${f.u}. Matching it with concrete alone would take ${f.concrete} m.`,
    f => `${f.cell.mm} mm de ${nameEs(f.cell.key)} dan R ${f.r} y una transmitancia de ${f.u}. Igualarlo solo con hormigón exigiría ${f.concrete} m.`,
    f => `${f.cell.mm} mm de ${namePt(f.cell.key)} dão R ${f.r} e transmitância ${f.u}. Igualar só com concreto exigiria ${f.concrete} m.`,
    f => `${nameJa(f.cell.key)}${f.cell.mm}ミリは熱抵抗${f.r}、熱貫流率${f.u}です。同じ断熱をコンクリートで出すには${f.concrete}メートルが要ります。`,
    f => `${f.cell.mm} mm ${nameDe(f.cell.key)} ergeben R ${f.r} und U ${f.u}. Mit Beton allein bräuchte es dafür ${f.concrete} m.`,
    f => `${f.cell.mm} mm de ${nameFr(f.cell.key)} donnent R ${f.r} et U ${f.u}. L’égaler en béton seul demanderait ${f.concrete} m.`,
    f => `${nameHi(f.cell.key)} की ${f.cell.mm} mm मोटाई से R ${f.r} और U-मान ${f.u} मिलता है। केवल कंक्रीट से यही पाने के लिए ${f.concrete} मीटर चाहिए।`,
    f => `${f.cell.mm}mm 的${nameZh(f.cell.key)}热阻 ${f.r}，传热系数 ${f.u}。要用混凝土达到同样效果需要 ${f.concrete} 米。`,
    f => `${f.cell.mm}mm 的${nameTw(f.cell.key)}熱阻 ${f.r}，傳熱係數 ${f.u}。要用混凝土達到同樣效果需要 ${f.concrete} 公尺。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '열저항은 어떻게 구하나요?', a: '두께를 미터로 고쳐 열전도율로 나눕니다. 100밀리미터 압출법이면 0.1 ÷ 0.028 = 3.57입니다.' },
      { q: '열관류율과 열저항은 무엇이 다른가요?', a: '열관류율은 열저항에 표면 저항 0.17을 더한 뒤 뒤집은 값입니다. 열저항은 클수록, 열관류율은 작을수록 좋습니다.' },
      { q: '단열재 100밀리미터가 콘크리트로 얼마인가요?', a: '압출법이면 5.7미터입니다. 열전도율이 0.028 대 1.6이라 57배 차이가 두께로 나타납니다.' },
      { q: '두께를 두 배로 하면 두 배 따뜻해지나요?', a: '열저항은 두 배가 되지만 열손실은 절반이 되지 않습니다. 표면 저항이 함께 있어서, 얇을 때 더 크게 줄고 두꺼워질수록 효과가 작아집니다.' },
      { q: '어느 기준을 맞춰야 하나요?', a: '외벽 열관류율로 한국 중부가 0.17, 패시브하우스가 0.15입니다. 이 표는 단열재 한 겹만 본 값이라, 실제 벽은 층을 더해 계산해야 합니다.' },
    ],
    [
      { q: 'How do I work out the R-value?', a: 'Divide the thickness in metres by the conductivity. For 100 mm of XPS: 0.1 ÷ 0.028 = 3.57.' },
      { q: 'What is the difference between R and U?', a: 'The U-value adds 0.17 of surface resistance to the R-value and flips the total. Higher R is better; lower U is better.' },
      { q: 'How much concrete equals 100 mm of insulation?', a: 'With XPS, 5.7 metres. The conductivities are 0.028 against 1.6, and that factor of 57 shows up as thickness.' },
      { q: 'Does twice the thickness mean twice as warm?', a: 'The resistance doubles but the heat loss does not halve. The surface resistance is always there, so the first centimetres help far more than the last.' },
      { q: 'Which standard should I aim for?', a: 'For an external wall, 0.17 in central Korea and 0.15 for a passive house. These figures cover one layer of insulation only; a real wall is the sum of its layers.' },
    ],
    [
      { q: '¿Cómo se calcula la resistencia térmica?', a: 'Divide el espesor en metros por la conductividad. Para 100 mm de XPS: 0,1 ÷ 0,028 = 3,57.' },
      { q: '¿Qué diferencia hay entre R y U?', a: 'La transmitancia suma 0,17 de resistencia superficial a la R y luego invierte el total. Mejor R alta y U baja.' },
      { q: '¿Cuánto hormigón equivale a 100 mm de aislante?', a: 'Con XPS, 5,7 metros. Las conductividades son 0,028 frente a 1,6: ese factor 57 aparece como espesor.' },
      { q: '¿El doble de espesor abriga el doble?', a: 'La resistencia se dobla, pero la pérdida no se reduce a la mitad. La resistencia superficial siempre está ahí, así que los primeros centímetros rinden mucho más que los últimos.' },
      { q: '¿Qué norma debo perseguir?', a: 'En muro exterior, 0,17 en la Corea central y 0,15 para casa pasiva. Estas cifras son de una sola capa; un muro real es la suma de sus capas.' },
    ],
    [
      { q: 'Como se calcula a resistência térmica?', a: 'Divida a espessura em metros pela condutividade. Para 100 mm de XPS: 0,1 ÷ 0,028 = 3,57.' },
      { q: 'Qual a diferença entre R e U?', a: 'A transmitância soma 0,17 de resistência superficial ao R e inverte o total. R alto é bom; U baixo é bom.' },
      { q: 'Quanto concreto equivale a 100 mm de isolante?', a: 'Com XPS, 5,7 metros. As condutividades são 0,028 contra 1,6 — esse fator 57 aparece como espessura.' },
      { q: 'O dobro da espessura aquece o dobro?', a: 'A resistência dobra, mas a perda não cai pela metade. A resistência superficial está sempre lá, então os primeiros centímetros rendem muito mais que os últimos.' },
      { q: 'Qual norma perseguir?', a: 'Em parede externa, 0,17 na Coreia central e 0,15 para casa passiva. Estes números cobrem uma camada só; a parede real é a soma das camadas.' },
    ],
    [
      { q: '熱抵抗はどう求めますか？', a: '厚さをメートルに直して熱伝導率で割ります。100ミリの押出法なら0.1 ÷ 0.028 = 3.57です。' },
      { q: '熱貫流率と熱抵抗は何が違いますか？', a: '熱貫流率は熱抵抗に表面抵抗0.17を足してひっくり返した値です。熱抵抗は大きいほど、熱貫流率は小さいほど良いです。' },
      { q: '断熱材100ミリはコンクリートで何メートルですか？', a: '押出法なら5.7メートルです。熱伝導率が0.028対1.6なので、その57倍が厚さとして現れます。' },
      { q: '厚さを2倍にすれば2倍暖かいですか？', a: '熱抵抗は2倍になりますが熱損失は半分になりません。表面抵抗が常にあるので、最初の数センチのほうが効きます。' },
      { q: 'どの基準を目指せばよいですか？', a: '外壁の熱貫流率で韓国中部が0.17、パッシブハウスが0.15です。この表は断熱材1層だけの値なので、実際の壁は層を足して計算します。' },
    ],
    [
      { q: 'Wie berechne ich den R-Wert?', a: 'Dicke in Metern durch die Leitfähigkeit teilen. Für 100 mm XPS: 0,1 ÷ 0,028 = 3,57.' },
      { q: 'Was unterscheidet R- und U-Wert?', a: 'Der U-Wert addiert 0,17 Übergangswiderstand zum R-Wert und kehrt die Summe um. Hoher R ist gut, niedriger U ist gut.' },
      { q: 'Wie viel Beton entspricht 100 mm Dämmung?', a: 'Bei XPS 5,7 Meter. Die Leitfähigkeiten sind 0,028 gegen 1,6 — dieser Faktor 57 erscheint als Dicke.' },
      { q: 'Wärmt doppelte Dicke doppelt?', a: 'Der Widerstand verdoppelt sich, der Verlust halbiert sich aber nicht. Der Übergangswiderstand bleibt, also bringen die ersten Zentimeter weit mehr als die letzten.' },
      { q: 'Welchen Standard sollte ich anpeilen?', a: 'Für die Außenwand 0,17 in Zentralkorea und 0,15 im Passivhaus. Diese Werte gelten für eine Dämmschicht; eine echte Wand ist die Summe ihrer Lagen.' },
    ],
    [
      { q: 'Comment calcule-t-on la résistance thermique ?', a: 'Divisez l’épaisseur en mètres par la conductivité. Pour 100 mm de XPS : 0,1 ÷ 0,028 = 3,57.' },
      { q: 'Quelle différence entre R et U ?', a: 'Le coefficient U ajoute 0,17 de résistance superficielle au R puis inverse le total. Un R élevé est bon, un U bas aussi.' },
      { q: 'Combien de béton pour égaler 100 mm d’isolant ?', a: 'Avec du XPS, 5,7 mètres. Les conductivités valent 0,028 contre 1,6 : ce facteur 57 se lit en épaisseur.' },
      { q: 'Doubler l’épaisseur réchauffe-t-il deux fois plus ?', a: 'La résistance double, mais la déperdition ne diminue pas de moitié. La résistance superficielle demeure : les premiers centimètres rapportent bien plus que les derniers.' },
      { q: 'Quelle norme viser ?', a: 'Pour un mur extérieur, 0,17 en Corée centrale et 0,15 en maison passive. Ces chiffres ne couvrent qu’une couche ; un mur réel est la somme de ses couches.' },
    ],
    [
      { q: 'तापीय प्रतिरोध कैसे निकालें?', a: 'मोटाई को मीटर में बदलकर चालकता से भाग दें। 100 mm XPS के लिए: 0.1 ÷ 0.028 = 3.57।' },
      { q: 'R और U में क्या अंतर है?', a: 'U-मान R में 0.17 सतही प्रतिरोध जोड़कर कुल को उलटता है। R बड़ा अच्छा, U छोटा अच्छा।' },
      { q: '100 mm इन्सुलेशन कितने कंक्रीट के बराबर है?', a: 'XPS हो तो 5.7 मीटर। चालकताएँ 0.028 बनाम 1.6 हैं, और यही 57 गुना अंतर मोटाई में दिखता है।' },
      { q: 'क्या दोगुनी मोटाई दोगुनी गर्मी देती है?', a: 'प्रतिरोध दोगुना होता है पर हानि आधी नहीं होती। सतही प्रतिरोध हमेशा रहता है, इसलिए शुरुआती सेंटीमीटर बाद वालों से कहीं ज़्यादा काम करते हैं।' },
      { q: 'कौन सा मानक अपनाएँ?', a: 'बाहरी दीवार के लिए मध्य कोरिया में 0.17 और पैसिव हाउस में 0.15। ये मान एक परत के हैं; असली दीवार परतों का जोड़ होती है।' },
    ],
    [
      { q: '热阻怎么算？', a: '把厚度换成米，除以导热系数。100mm 挤塑板即 0.1 ÷ 0.028 = 3.57。' },
      { q: '热阻和传热系数有什么区别？', a: '传热系数是在热阻上加 0.17 表面阻力再取倒数。热阻越大越好，传热系数越小越好。' },
      { q: '100mm 保温层相当于多少混凝土？', a: '用挤塑板算是 5.7 米。导热系数 0.028 对 1.6，这 57 倍的差距直接体现为厚度。' },
      { q: '厚度加倍就暖和一倍吗？', a: '热阻会加倍，但热损失不会减半。表面阻力始终存在，所以前几厘米的作用远大于后几厘米。' },
      { q: '该按哪个标准？', a: '外墙传热系数，韩国中部是 0.17，被动房是 0.15。本表只算一层保温，真实的墙要把各层加起来。' },
    ],
    [
      { q: '熱阻怎麼算？', a: '把厚度換成公尺，除以導熱係數。100mm 擠塑板即 0.1 ÷ 0.028 = 3.57。' },
      { q: '熱阻和傳熱係數有什麼區別？', a: '傳熱係數是在熱阻上加 0.17 表面阻力再取倒數。熱阻越大越好，傳熱係數越小越好。' },
      { q: '100mm 保溫層相當於多少混凝土？', a: '用擠塑板算是 5.7 公尺。導熱係數 0.028 對 1.6，這 57 倍的差距直接體現為厚度。' },
      { q: '厚度加倍就暖和一倍嗎？', a: '熱阻會加倍，但熱損失不會減半。表面阻力始終存在，所以前幾公分的作用遠大於後幾公分。' },
      { q: '該按哪個標準？', a: '外牆傳熱係數，韓國中部是 0.17，被動房是 0.15。本表只算一層保溫，真實的牆要把各層加起來。' },
    ],
  ),

  cellFaq: T<(f: InsulFacts) => FaqItem[]>(
    f => [
      { q: `${nameKo(f.cell.key)} ${f.cell.mm}밀리미터의 열저항은 얼마인가요?`, a: `${f.r}입니다. ${f.cell.mm}밀리미터를 미터로 고쳐 열전도율 ${f.lambda}로 나눈 값입니다.` },
      { q: `열관류율은 얼마인가요?`, a: `${f.u}입니다. 열저항에 표면 저항 0.17을 더한 ${f.total}을 뒤집은 값이고, 1제곱미터가 20도 차이에서 ${f.loss}와트를 잃습니다.` },
      { q: `콘크리트로 치면 몇 미터인가요?`, a: `${f.concrete}미터입니다.` },
      { q: `어느 기준을 만족하나요?`, a: `${f.meets.length ? `열관류율 ${f.u}이라 ${f.meets.length}가지 기준을 넘습니다.` : `열관류율 ${f.u}이라 아직 어느 기준에도 못 미칩니다.`}` },
    ],
    f => [
      { q: `What is the R-value of ${f.cell.mm} mm of ${nameEn(f.cell.key)}?`, a: `${f.r} — ${f.cell.mm} mm in metres divided by a conductivity of ${f.lambda}.` },
      { q: `And the U-value?`, a: `${f.u}. That is ${f.total} — the resistance plus 0.17 of surface — turned upside down, and a square metre leaks ${f.loss} W across 20 degrees.` },
      { q: `How much concrete would match it?`, a: `${f.concrete} metres.` },
      { q: `Which standards does it meet?`, a: `${f.meets.length ? `At ${f.u} it clears ${f.meets.length} of them.` : `At ${f.u} it does not clear any of them yet.`}` },
    ],
    f => [
      { q: `¿Cuál es la resistencia de ${f.cell.mm} mm de ${nameEs(f.cell.key)}?`, a: `${f.r}: los ${f.cell.mm} mm en metros divididos por una conductividad de ${f.lambda}.` },
      { q: `¿Y la transmitancia?`, a: `${f.u}. Es ${f.total} —la resistencia más 0,17 de superficie— invertido; un metro cuadrado pierde ${f.loss} W con 20 grados.` },
      { q: `¿Cuánto hormigón lo igualaría?`, a: `${f.concrete} metros.` },
      { q: `¿Qué normas cumple?`, a: `${f.meets.length ? `Con ${f.u} supera ${f.meets.length}.` : `Con ${f.u} todavía no supera ninguna.`}` },
    ],
    f => [
      { q: `Qual a resistência de ${f.cell.mm} mm de ${namePt(f.cell.key)}?`, a: `${f.r} — os ${f.cell.mm} mm em metros divididos por uma condutividade de ${f.lambda}.` },
      { q: `E a transmitância?`, a: `${f.u}. É ${f.total} — a resistência mais 0,17 de superfície — invertido; um metro quadrado perde ${f.loss} W com 20 graus.` },
      { q: `Quanto concreto igualaria?`, a: `${f.concrete} metros.` },
      { q: `Quais normas atende?`, a: `${f.meets.length ? `Com ${f.u} passa em ${f.meets.length}.` : `Com ${f.u} ainda não passa em nenhuma.`}` },
    ],
    f => [
      { q: `${nameJa(f.cell.key)}${f.cell.mm}ミリの熱抵抗はいくつですか？`, a: `${f.r}です。${f.cell.mm}ミリをメートルに直して熱伝導率${f.lambda}で割った値です。` },
      { q: `熱貫流率はいくつですか？`, a: `${f.u}です。熱抵抗に表面抵抗0.17を足した${f.total}をひっくり返した値で、1平方メートルが20度差で${f.loss}ワットを失います。` },
      { q: `コンクリートに直すと何メートルですか？`, a: `${f.concrete}メートルです。` },
      { q: `どの基準を満たしますか？`, a: `${f.meets.length ? `熱貫流率${f.u}なので${f.meets.length}つの基準を超えます。` : `熱貫流率${f.u}なのでまだどの基準にも届きません。`}` },
    ],
    f => [
      { q: `Welchen R-Wert haben ${f.cell.mm} mm ${nameDe(f.cell.key)}?`, a: `${f.r} — die ${f.cell.mm} mm in Metern geteilt durch die Leitfähigkeit ${f.lambda}.` },
      { q: `Und der U-Wert?`, a: `${f.u}. Das ist ${f.total} — Widerstand plus 0,17 Übergang — umgekehrt; ein Quadratmeter verliert bei 20 Grad ${f.loss} W.` },
      { q: `Wie viel Beton wäre gleichwertig?`, a: `${f.concrete} Meter.` },
      { q: `Welche Standards erfüllt es?`, a: `${f.meets.length ? `Mit ${f.u} schafft es ${f.meets.length} davon.` : `Mit ${f.u} schafft es noch keinen davon.`}` },
    ],
    f => [
      { q: `Quelle est la résistance de ${f.cell.mm} mm de ${nameFr(f.cell.key)} ?`, a: `${f.r} — les ${f.cell.mm} mm en mètres divisés par une conductivité de ${f.lambda}.` },
      { q: `Et le coefficient U ?`, a: `${f.u}. C’est ${f.total} — la résistance plus 0,17 de surface — inversé ; un mètre carré perd ${f.loss} W sous 20 degrés.` },
      { q: `Combien de béton l’égalerait ?`, a: `${f.concrete} mètres.` },
      { q: `Quelles normes atteint-il ?`, a: `${f.meets.length ? `À ${f.u}, il en passe ${f.meets.length}.` : `À ${f.u}, il n’en passe encore aucune.`}` },
    ],
    f => [
      { q: `${nameHi(f.cell.key)} की ${f.cell.mm} mm मोटाई का प्रतिरोध कितना है?`, a: `${f.r} — ${f.cell.mm} mm को मीटर में बदलकर चालकता ${f.lambda} से भाग देने पर।` },
      { q: `और U-मान?`, a: `${f.u}। यह ${f.total} — प्रतिरोध और 0.17 सतही — को उलटने पर मिलता है; 20 डिग्री अंतर पर प्रति वर्ग मीटर ${f.loss} W जाता है।` },
      { q: `कंक्रीट में यह कितना होगा?`, a: `${f.concrete} मीटर।` },
      { q: `यह कौन से मानक पूरे करता है?`, a: `${f.meets.length ? `${f.u} पर यह ${f.meets.length} मानक पार करता है।` : `${f.u} पर यह अभी कोई मानक पार नहीं करता।`}` },
    ],
    f => [
      { q: `${f.cell.mm}mm 的${nameZh(f.cell.key)}热阻是多少？`, a: `${f.r}。把 ${f.cell.mm}mm 换成米，再除以导热系数 ${f.lambda}。` },
      { q: `传热系数是多少？`, a: `${f.u}。这是热阻加上 0.17 表面阻力得到 ${f.total} 后取倒数；20 度温差下每平方米损失 ${f.loss} 瓦。` },
      { q: `折合混凝土是多少米？`, a: `${f.concrete} 米。` },
      { q: `能满足哪些标准？`, a: `${f.meets.length ? `传热系数 ${f.u}，可以满足 ${f.meets.length} 项。` : `传热系数 ${f.u}，目前一项都满足不了。`}` },
    ],
    f => [
      { q: `${f.cell.mm}mm 的${nameTw(f.cell.key)}熱阻是多少？`, a: `${f.r}。把 ${f.cell.mm}mm 換成公尺，再除以導熱係數 ${f.lambda}。` },
      { q: `傳熱係數是多少？`, a: `${f.u}。這是熱阻加上 0.17 表面阻力得到 ${f.total} 後取倒數；20 度溫差下每平方公尺損失 ${f.loss} 瓦。` },
      { q: `折合混凝土是多少公尺？`, a: `${f.concrete} 公尺。` },
      { q: `能滿足哪些標準？`, a: `${f.meets.length ? `傳熱係數 ${f.u}，可以滿足 ${f.meets.length} 項。` : `傳熱係數 ${f.u}，目前一項都滿足不了。`}` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const INSUL_UI: L<InsulUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<InsulUI>;
