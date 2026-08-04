/**
 * 나사 규격 화면의 문구 — 열 언어.
 *
 * 이 표를 찾는 자리는 대개 둘이다. 탭을 내려고 드릴 지름을 확인하거나, 볼트가
 * 얼마나 버티는지 알려고 응력단면적을 찾거나. 그래서 문구도 그 둘을 가장
 * 앞에 둔다.
 *
 * M8×1.25의 1.25가 "굵기"가 아니라 "산 사이 거리"라는 것도 계속 짚어 준다 —
 * 가는 나사가 오히려 골지름이 굵다는 것이 여기서 갈린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { ScrewFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ScrewUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  diameterLabel: string;
  pitchLabel: string;
  pitchDiaLabel: string;
  minorMaleLabel: string;
  minorFemaleLabel: string;
  tapDrillLabel: string;
  threadHeightLabel: string;
  stressAreaLabel: string;
  tpiLabel: string;
  coarseTag: string;
  fineTag: string;
  threadTitle: string;
  threadNote: string;
  tapTitle: string;
  tapNote: string;
  stressTitle: string;
  stressNote: string;
  coarseTitle: string;
  coarseNote: string;
  fineTitle: string;
  fineNote: string;
  siblingTitle: string;
  neighbourTitle: string;
  desc: (f: ScrewFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: ScrewFacts) => string;
  metaDesc: (f: ScrewFacts) => string;
  hubFaq: FaqItem[];
  screwFaq: (f: ScrewFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof ScrewUI]: L<ScrewUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('나사 규격', 'Metric threads', 'Roscas métricas', 'Roscas métricas', 'ねじ規格', 'Metrische Gewinde', 'Filetages métriques', 'मीट्रिक थ्रेड', '公制螺纹', '公制螺紋'),

  hubTitle: T(
    '미터 나사 114가지 — 탭 드릴과 골지름, 응력단면적',
    '114 metric threads — tap drills, minor diameters and stress areas',
    '114 roscas métricas — brocas de macho, diámetros de fondo y áreas resistentes',
    '114 roscas métricas — brocas para macho, diâmetros de fundo e áreas resistentes',
    'メートルねじ114種 — 下穴径・谷径・有効断面積',
    '114 metrische Gewinde — Kernlochbohrer, Kerndurchmesser, Spannungsquerschnitte',
    '114 filetages métriques — forets de taraudage, diamètres de fond et sections résistantes',
    '114 मीट्रिक थ्रेड — टैप ड्रिल, माइनर व्यास और स्ट्रेस एरिया',
    '114 种公制螺纹 — 底孔钻头、小径与应力截面积',
    '114 種公制螺紋 — 底孔鑽頭、小徑與應力截面積',
  ),

  hubLead: T(
    'M8×1.25에서 1.25는 굵기가 아니라 산과 산 사이 거리입니다. 외경과 피치만 있으면 골지름도 탭 드릴도 계산됩니다.',
    'In M8×1.25 the 1.25 is not a thickness — it is the distance from one thread crest to the next. Given the outside diameter and that pitch, every other dimension follows.',
    'En M8×1,25 el 1,25 no es un grosor: es la distancia entre crestas de rosca. Con el diámetro exterior y ese paso, el resto de medidas se calcula.',
    'Em M8×1,25 o 1,25 não é espessura: é a distância entre cristas do filete. Com o diâmetro externo e esse passo, o resto sai por cálculo.',
    'M8×1.25の1.25は太さではなく、山から山までの距離です。外径とピッチさえあれば谷径も下穴径も計算できます。',
    'Bei M8×1,25 ist die 1,25 keine Dicke, sondern der Abstand von Gewindespitze zu Gewindespitze. Aus Außendurchmesser und Steigung folgt alles Übrige.',
    'Dans M8×1,25, le 1,25 n’est pas une épaisseur : c’est la distance entre deux sommets de filet. Avec le diamètre extérieur et ce pas, tout le reste se calcule.',
    'M8×1.25 में 1.25 मोटाई नहीं, बल्कि एक चूड़ी से अगली चूड़ी तक की दूरी है। बाहरी व्यास और यही पिच मिल जाए तो बाक़ी सब गणना से निकलता है।',
    'M8×1.25 中的 1.25 不是粗细，而是相邻牙尖之间的距离。有了外径和螺距，其余尺寸都能算出来。',
    'M8×1.25 中的 1.25 不是粗細，而是相鄰牙尖之間的距離。有了外徑和螺距，其餘尺寸都能算出來。',
  ),

  diameterLabel: T('외경', 'Outside diameter', 'Diámetro exterior', 'Diâmetro externo', '外径', 'Außendurchmesser', 'Diamètre extérieur', 'बाहरी व्यास', '外径', '外徑'),
  pitchLabel: T('피치', 'Pitch', 'Paso', 'Passo', 'ピッチ', 'Steigung', 'Pas', 'पिच', '螺距', '螺距'),
  pitchDiaLabel: T('유효지름', 'Pitch diameter', 'Diámetro medio', 'Diâmetro médio', '有効径', 'Flankendurchmesser', 'Diamètre sur flancs', 'पिच व्यास', '中径', '中徑'),
  minorMaleLabel: T('수나사 골지름', 'Minor diameter (bolt)', 'Diámetro de fondo (tornillo)', 'Diâmetro de fundo (parafuso)', 'おねじ谷径', 'Kerndurchmesser (Bolzen)', 'Diamètre de fond (vis)', 'माइनर व्यास (बोल्ट)', '外螺纹小径', '外螺紋小徑'),
  minorFemaleLabel: T('암나사 골지름', 'Minor diameter (nut)', 'Diámetro de fondo (tuerca)', 'Diâmetro de fundo (porca)', 'めねじ谷径', 'Kerndurchmesser (Mutter)', 'Diamètre de fond (écrou)', 'माइनर व्यास (नट)', '内螺纹小径', '內螺紋小徑'),
  tapDrillLabel: T('탭 드릴 지름', 'Tap drill', 'Broca para macho', 'Broca para macho', '下穴径', 'Kernlochbohrer', 'Foret de taraudage', 'टैप ड्रिल', '底孔钻头', '底孔鑽頭'),
  threadHeightLabel: T('나사산 높이', 'Thread height', 'Altura del filete', 'Altura do filete', 'ねじ山の高さ', 'Gewindetiefe', 'Hauteur du filet', 'चूड़ी की ऊँचाई', '牙高', '牙高'),
  stressAreaLabel: T('응력단면적', 'Stress area', 'Área resistente', 'Área resistente', '有効断面積', 'Spannungsquerschnitt', 'Section résistante', 'स्ट्रेस एरिया', '应力截面积', '應力截面積'),
  tpiLabel: T('1인치당 산 수', 'Threads per inch', 'Hilos por pulgada', 'Fios por polegada', '1インチあたりの山数', 'Gänge je Zoll', 'Filets par pouce', 'प्रति इंच चूड़ियाँ', '每英寸牙数', '每英寸牙數'),
  coarseTag: T('보통 나사', 'Coarse', 'Paso grueso', 'Passo grosso', '並目', 'Regelgewinde', 'Pas gros', 'कोर्स', '粗牙', '粗牙'),
  fineTag: T('가는 나사', 'Fine', 'Paso fino', 'Passo fino', '細目', 'Feingewinde', 'Pas fin', 'फ़ाइन', '细牙', '細牙'),

  threadTitle: T('나사산은 60도 삼각형입니다', 'The thread is a 60° triangle', 'El filete es un triángulo de 60°', 'O filete é um triângulo de 60°', 'ねじ山は60度の三角形です', 'Das Gewindeprofil ist ein 60°-Dreieck', 'Le filet est un triangle à 60°', 'चूड़ी 60° का त्रिभुज है', '牙型是 60 度三角形', '牙型是 60 度三角形'),

  threadNote: T(
    'ISO는 나사산을 꼭지각 60도인 정삼각형으로 정해 두었습니다. 그 삼각형의 높이 H는 피치의 0.866배이고, 골지름과 유효지름은 H를 정해진 몫만큼 깎아 낸 값입니다.',
    'ISO defines the thread profile as an equilateral 60° triangle. Its height H is 0.866 × pitch, and every other diameter is that triangle cut back by a fixed fraction of H.',
    'ISO define el perfil de rosca como un triángulo equilátero de 60°. Su altura H es 0,866 × paso, y los demás diámetros son ese triángulo recortado en una fracción fija de H.',
    'A ISO define o perfil da rosca como um triângulo equilátero de 60°. Sua altura H é 0,866 × passo, e os demais diâmetros são esse triângulo cortado por uma fração fixa de H.',
    'ISOはねじ山を頂角60度の正三角形と定めています。その高さHはピッチの0.866倍で、谷径も有効径もHを決まった割合だけ削った値です。',
    'Die ISO legt das Gewindeprofil als gleichseitiges 60°-Dreieck fest. Seine Höhe H beträgt 0,866 × Steigung, und alle weiteren Durchmesser sind dieses Dreieck, um feste Bruchteile von H gekürzt.',
    'L’ISO définit le profil du filet comme un triangle équilatéral à 60°. Sa hauteur H vaut 0,866 × pas, et tous les autres diamètres sont ce triangle rogné d’une fraction fixe de H.',
    'ISO चूड़ी के प्रोफ़ाइल को 60° के समबाहु त्रिभुज के रूप में तय करता है। उसकी ऊँचाई H = 0.866 × पिच है, और बाक़ी सभी व्यास उसी त्रिभुज को H के निश्चित अंश तक काटकर मिलते हैं।',
    'ISO 把牙型定为顶角 60 度的等边三角形。它的高 H = 0.866 × 螺距，其余各径都是把这个三角形按 H 的固定比例削去后的结果。',
    'ISO 把牙型定為頂角 60 度的等邊三角形。它的高 H = 0.866 × 螺距，其餘各徑都是把這個三角形按 H 的固定比例削去後的結果。',
  ),

  tapTitle: T('탭 드릴 지름 고르기', 'Choosing the tap drill', 'Elegir la broca para macho', 'Escolher a broca para macho', '下穴径の選び方', 'Den Kernlochbohrer wählen', 'Choisir le foret de taraudage', 'टैप ड्रिल कैसे चुनें', '如何选底孔钻头', '如何選底孔鑽頭'),

  tapNote: T(
    '현장에서는 외경에서 피치를 뺍니다 — M8×1.25면 6.75mm이고 가장 가까운 6.8mm 드릴을 씁니다. 이 값은 암나사 골지름보다 굵어서 탭이 부러지지 않고 들어갑니다.',
    'The shop rule is outside diameter minus pitch: M8×1.25 gives 6.75 mm, so you reach for a 6.8 mm drill. That is wider than the nut’s minor diameter, which is why the tap cuts without snapping.',
    'La regla de taller es diámetro exterior menos paso: M8×1,25 da 6,75 mm, así que se usa una broca de 6,8 mm. Queda por encima del diámetro de fondo de la tuerca, y por eso el macho corta sin romperse.',
    'A regra de oficina é diâmetro externo menos passo: M8×1,25 dá 6,75 mm, então usa-se broca de 6,8 mm. Fica acima do diâmetro de fundo da porca, e por isso o macho corta sem quebrar.',
    '現場では外径からピッチを引きます——M8×1.25なら6.75mmで、一番近い6.8mmのドリルを使います。この値はめねじ谷径より大きいので、タップが折れずに切れます。',
    'Die Werkstattregel lautet Außendurchmesser minus Steigung: M8×1,25 ergibt 6,75 mm, man greift also zum 6,8-mm-Bohrer. Das liegt über dem Kerndurchmesser der Mutter — deshalb schneidet der Gewindebohrer, ohne zu brechen.',
    'La règle d’atelier : diamètre extérieur moins pas. M8×1,25 donne 6,75 mm, on prend donc un foret de 6,8 mm. C’est plus large que le diamètre de fond de l’écrou, et c’est pourquoi le taraud coupe sans casser.',
    'वर्कशॉप का नियम है बाहरी व्यास घटाओ पिच: M8×1.25 पर 6.75 मिमी, यानी 6.8 मिमी ड्रिल। यह नट के माइनर व्यास से बड़ा होता है, इसलिए टैप टूटे बिना काटता है।',
    '车间的做法是外径减螺距：M8×1.25 得 6.75 毫米，于是选最接近的 6.8 毫米钻头。这个值大于内螺纹小径，所以丝锥能切进去而不折断。',
    '車間的做法是外徑減螺距：M8×1.25 得 6.75 毫米，於是選最接近的 6.8 毫米鑽頭。這個值大於內螺紋小徑，所以絲攻能切進去而不折斷。',
  ),

  stressTitle: T('응력단면적이 힘을 정합니다', 'The stress area sets the strength', 'El área resistente marca la fuerza', 'A área resistente define a força', '有効断面積が強さを決めます', 'Der Spannungsquerschnitt bestimmt die Festigkeit', 'La section résistante fixe la résistance', 'स्ट्रेस एरिया ही ताक़त तय करता है', '应力截面积决定承载力', '應力截面積決定承載力'),

  stressNote: T(
    '볼트가 견디는 힘은 외경이 아니라 이 넓이로 계산합니다. 유효지름과 골지름의 평균을 지름으로 삼은 원의 넓이입니다.',
    'A bolt’s load capacity is worked out from this area, not from the outside diameter. It is the area of a circle whose diameter is the average of the pitch and minor diameters.',
    'La carga que aguanta un tornillo se calcula con esta área, no con el diámetro exterior. Es el área de un círculo cuyo diámetro es la media del diámetro medio y el de fondo.',
    'A carga que um parafuso aguenta é calculada com esta área, não com o diâmetro externo. É a área de um círculo cujo diâmetro é a média do diâmetro médio e o de fundo.',
    'ボルトが耐える力は外径ではなくこの面積で計算します。有効径と谷径の平均を直径とする円の面積です。',
    'Die Tragfähigkeit einer Schraube rechnet man mit dieser Fläche, nicht mit dem Außendurchmesser. Es ist die Fläche eines Kreises, dessen Durchmesser der Mittelwert aus Flanken- und Kerndurchmesser ist.',
    'La charge qu’une vis supporte se calcule avec cette section, non avec le diamètre extérieur. C’est l’aire d’un cercle dont le diamètre est la moyenne du diamètre sur flancs et du diamètre de fond.',
    'बोल्ट कितना भार सहेगा, यह बाहरी व्यास से नहीं बल्कि इसी क्षेत्रफल से निकाला जाता है। यह उस वृत्त का क्षेत्रफल है जिसका व्यास पिच और माइनर व्यास का औसत है।',
    '螺栓能承受多大力，是用这个面积算的，而不是外径。它是以中径与小径的平均值为直径的圆面积。',
    '螺栓能承受多大力，是用這個面積算的，而不是外徑。它是以中徑與小徑的平均值為直徑的圓面積。',
  ),

  coarseTitle: T('보통 나사 35가지', 'The 35 coarse threads', 'Las 35 roscas de paso grueso', 'As 35 roscas de passo grosso', '並目ねじ35種', 'Die 35 Regelgewinde', 'Les 35 pas gros', '35 कोर्स थ्रेड', '35 种粗牙螺纹', '35 種粗牙螺紋'),

  coarseNote: T(
    '지름마다 기본이 되는 피치가 하나씩 정해져 있습니다. 그냥 M8이라고 하면 M8×1.25를 뜻합니다.',
    'Each diameter has one default pitch. When someone just says “M8”, they mean M8×1.25.',
    'Cada diámetro tiene un paso por defecto. Cuando alguien dice solo «M8», se refiere a M8×1,25.',
    'Cada diâmetro tem um passo padrão. Quando alguém diz só “M8”, quer dizer M8×1,25.',
    '径ごとに基本となるピッチが1つ決まっています。単にM8と言えばM8×1.25のことです。',
    'Zu jedem Durchmesser gehört eine Standardsteigung. Wer einfach „M8“ sagt, meint M8×1,25.',
    'Chaque diamètre a un pas par défaut. Quand on dit simplement « M8 », il s’agit de M8×1,25.',
    'हर व्यास के लिए एक मानक पिच तय है। कोई केवल “M8” कहे तो मतलब M8×1.25 है।',
    '每个直径都有一个默认螺距。有人只说“M8”，指的就是 M8×1.25。',
    '每個直徑都有一個預設螺距。有人只說「M8」，指的就是 M8×1.25。',
  ),

  fineTitle: T('가는 나사 79가지', 'The 79 fine threads', 'Las 79 roscas de paso fino', 'As 79 roscas de passo fino', '細目ねじ79種', 'Die 79 Feingewinde', 'Les 79 pas fins', '79 फ़ाइन थ्रेड', '79 种细牙螺纹', '79 種細牙螺紋'),

  fineNote: T(
    '피치가 좁으면 골이 얕아 골지름이 굵어집니다. 그래서 얇은 판이나 진동이 심한 자리에 씁니다.',
    'A tighter pitch cuts shallower, leaving a thicker core. That is why fine threads suit thin walls and places that vibrate.',
    'Un paso más estrecho corta menos hondo y deja un núcleo más grueso. Por eso las roscas finas convienen en paredes delgadas y donde hay vibración.',
    'Um passo mais estreito corta mais raso e deixa o núcleo mais grosso. Por isso as roscas finas servem para paredes finas e locais com vibração.',
    'ピッチが狭いと谷が浅くなり、谷径は太くなります。だから薄い板や振動の多い場所に使います。',
    'Eine engere Steigung schneidet flacher und lässt einen dickeren Kern. Deshalb passen Feingewinde zu dünnen Wänden und Stellen mit Vibration.',
    'Un pas plus serré creuse moins et laisse un noyau plus épais. D’où l’usage des pas fins dans les parois minces et les zones vibrantes.',
    'पिच छोटी होने पर कटाई कम गहरी होती है और कोर मोटा रह जाता है। इसीलिए फ़ाइन थ्रेड पतली दीवारों और कंपन वाली जगहों के लिए ठीक रहते हैं।',
    '螺距越小，切得越浅，芯部就越粗。所以细牙适合薄壁和振动大的地方。',
    '螺距越小，切得越淺，芯部就越粗。所以細牙適合薄壁和振動大的地方。',
  ),

  siblingTitle: T('같은 외경의 다른 피치', 'Other pitches at this diameter', 'Otros pasos en este diámetro', 'Outros passos neste diâmetro', '同じ外径の別ピッチ', 'Andere Steigungen bei diesem Durchmesser', 'Autres pas pour ce diamètre', 'इसी व्यास की अन्य पिच', '同一外径的其他螺距', '同一外徑的其他螺距'),
  neighbourTitle: T('한 치수 위아래', 'One size up and down', 'Una medida arriba y abajo', 'Uma medida acima e abaixo', '一つ上と下の径', 'Eine Größe größer und kleiner', 'Une taille au-dessus et en dessous', 'एक नाप ऊपर और नीचे', '上下一号', '上下一號'),

  desc: T<(f: ScrewFacts) => string>(
    f => `${f.label}은 외경 ${f.screw.d}mm에 피치 ${f.screw.p}mm인 ${f.screw.coarse ? '보통' : '가는'} 나사입니다. 수나사 골지름은 ${f.minorMale}mm, 탭 드릴은 ${f.tapDrill}mm, 응력단면적은 ${f.stressArea}mm²입니다.`,
    f => `${f.label} is a ${f.screw.coarse ? 'coarse' : 'fine'} thread: ${f.screw.d} mm across with a ${f.screw.p} mm pitch. The bolt’s minor diameter is ${f.minorMale} mm, the tap drill ${f.tapDrill} mm and the stress area ${f.stressArea} mm².`,
    f => `${f.label} es una rosca de paso ${f.screw.coarse ? 'grueso' : 'fino'}: ${f.screw.d} mm de diámetro con paso de ${f.screw.p} mm. El diámetro de fondo del tornillo es ${f.minorMale} mm, la broca ${f.tapDrill} mm y el área resistente ${f.stressArea} mm².`,
    f => `${f.label} é uma rosca de passo ${f.screw.coarse ? 'grosso' : 'fino'}: ${f.screw.d} mm de diâmetro com passo de ${f.screw.p} mm. O diâmetro de fundo do parafuso é ${f.minorMale} mm, a broca ${f.tapDrill} mm e a área resistente ${f.stressArea} mm².`,
    f => `${f.label}は外径${f.screw.d}mm、ピッチ${f.screw.p}mmの${f.screw.coarse ? '並目' : '細目'}ねじです。おねじ谷径は${f.minorMale}mm、下穴径は${f.tapDrill}mm、有効断面積は${f.stressArea}mm²です。`,
    f => `${f.label} ist ein ${f.screw.coarse ? 'Regelgewinde' : 'Feingewinde'}: ${f.screw.d} mm Außendurchmesser bei ${f.screw.p} mm Steigung. Der Kerndurchmesser des Bolzens beträgt ${f.minorMale} mm, das Kernloch ${f.tapDrill} mm, der Spannungsquerschnitt ${f.stressArea} mm².`,
    f => `${f.label} est un filetage à pas ${f.screw.coarse ? 'gros' : 'fin'} : ${f.screw.d} mm de diamètre pour un pas de ${f.screw.p} mm. Le diamètre de fond de la vis vaut ${f.minorMale} mm, le foret ${f.tapDrill} mm et la section résistante ${f.stressArea} mm².`,
    f => `${f.label} एक ${f.screw.coarse ? 'कोर्स' : 'फ़ाइन'} थ्रेड है: बाहरी व्यास ${f.screw.d} मिमी, पिच ${f.screw.p} मिमी। बोल्ट का माइनर व्यास ${f.minorMale} मिमी, टैप ड्रिल ${f.tapDrill} मिमी और स्ट्रेस एरिया ${f.stressArea} मिमी² है।`,
    f => `${f.label} 是${f.screw.coarse ? '粗牙' : '细牙'}螺纹：外径 ${f.screw.d} 毫米，螺距 ${f.screw.p} 毫米。外螺纹小径 ${f.minorMale} 毫米，底孔 ${f.tapDrill} 毫米，应力截面积 ${f.stressArea} 平方毫米。`,
    f => `${f.label} 是${f.screw.coarse ? '粗牙' : '細牙'}螺紋：外徑 ${f.screw.d} 毫米，螺距 ${f.screw.p} 毫米。外螺紋小徑 ${f.minorMale} 毫米，底孔 ${f.tapDrill} 毫米，應力截面積 ${f.stressArea} 平方毫米。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      'M 뒤의 숫자가 외경(mm), × 뒤의 숫자가 피치(mm)입니다.',
      'H = 0.866 × 피치. 유효지름은 외경 − 0.75H, 암나사 골지름은 외경 − 1.25H입니다.',
      '탭 드릴은 외경 − 피치로 잡고 가장 가까운 드릴을 씁니다.',
      '볼트가 견디는 힘은 외경이 아니라 응력단면적으로 계산합니다.',
    ],
    [
      'The number after M is the outside diameter in mm; the number after × is the pitch in mm.',
      'H = 0.866 × pitch. The pitch diameter is d − 0.75H, the nut’s minor diameter d − 1.25H.',
      'Take the tap drill as outside diameter minus pitch, then pick the nearest drill you own.',
      'Load capacity comes from the stress area, not from the outside diameter.',
    ],
    [
      'El número tras la M es el diámetro exterior en mm; el que sigue a × es el paso en mm.',
      'H = 0,866 × paso. El diámetro medio es d − 0,75H y el de fondo de la tuerca d − 1,25H.',
      'Toma la broca como diámetro exterior menos paso y usa la más cercana que tengas.',
      'La carga admisible sale del área resistente, no del diámetro exterior.',
    ],
    [
      'O número após o M é o diâmetro externo em mm; o que vem depois do × é o passo em mm.',
      'H = 0,866 × passo. O diâmetro médio é d − 0,75H e o de fundo da porca d − 1,25H.',
      'Calcule a broca como diâmetro externo menos passo e use a mais próxima que tiver.',
      'A carga admissível vem da área resistente, não do diâmetro externo.',
    ],
    [
      'Mの後ろの数字が外径(mm)、×の後ろの数字がピッチ(mm)です。',
      'H = 0.866 × ピッチ。有効径は外径 − 0.75H、めねじ谷径は外径 − 1.25Hです。',
      '下穴径は外径 − ピッチで見当をつけ、手元で一番近いドリルを使います。',
      'ボルトが耐える力は外径ではなく有効断面積で計算します。',
    ],
    [
      'Die Zahl nach dem M ist der Außendurchmesser in mm, die Zahl nach dem × die Steigung in mm.',
      'H = 0,866 × Steigung. Der Flankendurchmesser ist d − 0,75H, der Kerndurchmesser der Mutter d − 1,25H.',
      'Das Kernloch ergibt sich aus Außendurchmesser minus Steigung; dann den nächstliegenden Bohrer nehmen.',
      'Die Tragfähigkeit folgt aus dem Spannungsquerschnitt, nicht aus dem Außendurchmesser.',
    ],
    [
      'Le nombre après le M est le diamètre extérieur en mm ; celui après le × est le pas en mm.',
      'H = 0,866 × pas. Le diamètre sur flancs vaut d − 0,75H, le diamètre de fond de l’écrou d − 1,25H.',
      'Prenez le foret égal au diamètre extérieur moins le pas, puis le plus proche dont vous disposez.',
      'La charge admissible se calcule sur la section résistante, pas sur le diamètre extérieur.',
    ],
    [
      'M के बाद का अंक बाहरी व्यास (मिमी) है, × के बाद का अंक पिच (मिमी)।',
      'H = 0.866 × पिच। पिच व्यास = d − 0.75H, नट का माइनर व्यास = d − 1.25H।',
      'टैप ड्रिल को बाहरी व्यास घटाओ पिच मानिए, फिर सबसे नज़दीकी ड्रिल लीजिए।',
      'भार क्षमता स्ट्रेस एरिया से निकलती है, बाहरी व्यास से नहीं।',
    ],
    [
      'M 后面的数字是外径（毫米），× 后面的数字是螺距（毫米）。',
      'H = 0.866 × 螺距。中径 = 外径 − 0.75H，内螺纹小径 = 外径 − 1.25H。',
      '底孔按外径减螺距估算，再选手边最接近的钻头。',
      '承载力用应力截面积计算，不是用外径。',
    ],
    [
      'M 後面的數字是外徑（毫米），× 後面的數字是螺距（毫米）。',
      'H = 0.866 × 螺距。中徑 = 外徑 − 0.75H，內螺紋小徑 = 外徑 − 1.25H。',
      '底孔按外徑減螺距估算，再選手邊最接近的鑽頭。',
      '承載力用應力截面積計算，不是用外徑。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '미터 나사 규격표 — M1부터 M64까지 탭 드릴과 골지름',
    'Metric thread chart — tap drills and minor diameters, M1 to M64',
    'Tabla de roscas métricas — brocas y diámetros de fondo, de M1 a M64',
    'Tabela de roscas métricas — brocas e diâmetros de fundo, de M1 a M64',
    'メートルねじ規格表 — M1からM64までの下穴径と谷径',
    'Metrische Gewindetabelle — Kernlöcher und Kerndurchmesser, M1 bis M64',
    'Tableau des filetages métriques — forets et diamètres de fond, de M1 à M64',
    'मीट्रिक थ्रेड चार्ट — M1 से M64 तक टैप ड्रिल और माइनर व्यास',
    '公制螺纹规格表 — M1 到 M64 的底孔与小径',
    '公制螺紋規格表 — M1 到 M64 的底孔與小徑',
  ),

  hubMetaDesc: T(
    'M1×0.25부터 M64×6까지 114가지. 외경과 피치에서 유효지름·골지름·탭 드릴·응력단면적을 ISO 68-1대로 계산했습니다.',
    'All 114 combinations from M1×0.25 to M64×6, with pitch diameter, minor diameters, tap drill and stress area computed straight from ISO 68-1.',
    'Las 114 combinaciones de M1×0,25 a M64×6, con diámetro medio, diámetros de fondo, broca y área resistente calculados según ISO 68-1.',
    'As 114 combinações de M1×0,25 a M64×6, com diâmetro médio, diâmetros de fundo, broca e área resistente calculados conforme a ISO 68-1.',
    'M1×0.25からM64×6までの114種。外径とピッチからISO 68-1どおりに有効径・谷径・下穴径・有効断面積を計算しました。',
    'Alle 114 Kombinationen von M1×0,25 bis M64×6 — Flanken- und Kerndurchmesser, Kernloch und Spannungsquerschnitt direkt nach ISO 68-1 berechnet.',
    'Les 114 combinaisons de M1×0,25 à M64×6, avec diamètre sur flancs, diamètres de fond, foret et section résistante calculés selon l’ISO 68-1.',
    'M1×0.25 से M64×6 तक सभी 114 संयोजन — पिच व्यास, माइनर व्यास, टैप ड्रिल और स्ट्रेस एरिया, ISO 68-1 के अनुसार गणना।',
    '从 M1×0.25 到 M64×6 共 114 种，按 ISO 68-1 由外径与螺距算出中径、小径、底孔与应力截面积。',
    '從 M1×0.25 到 M64×6 共 114 種，按 ISO 68-1 由外徑與螺距算出中徑、小徑、底孔與應力截面積。',
  ),

  metaTitle: T<(f: ScrewFacts) => string>(
    f => `${f.label} 나사 — 탭 드릴 ${f.tapDrill}mm, 골지름 ${f.minorMale}mm`,
    f => `${f.label} thread — ${f.tapDrill} mm tap drill, ${f.minorMale} mm minor diameter`,
    f => `Rosca ${f.label} — broca ${f.tapDrill} mm, diámetro de fondo ${f.minorMale} mm`,
    f => `Rosca ${f.label} — broca ${f.tapDrill} mm, diâmetro de fundo ${f.minorMale} mm`,
    f => `${f.label}ねじ — 下穴径${f.tapDrill}mm、谷径${f.minorMale}mm`,
    f => `Gewinde ${f.label} — Kernloch ${f.tapDrill} mm, Kerndurchmesser ${f.minorMale} mm`,
    f => `Filetage ${f.label} — foret ${f.tapDrill} mm, diamètre de fond ${f.minorMale} mm`,
    f => `${f.label} थ्रेड — टैप ड्रिल ${f.tapDrill} मिमी, माइनर व्यास ${f.minorMale} मिमी`,
    f => `${f.label} 螺纹 — 底孔 ${f.tapDrill} 毫米，小径 ${f.minorMale} 毫米`,
    f => `${f.label} 螺紋 — 底孔 ${f.tapDrill} 毫米，小徑 ${f.minorMale} 毫米`,
  ),

  metaDesc: T<(f: ScrewFacts) => string>(
    f => `${f.label}의 유효지름은 ${f.pitchDia}mm, 수나사 골지름 ${f.minorMale}mm, 암나사 골지름 ${f.minorFemale}mm입니다. 탭 드릴은 ${f.tapDrill}mm, 응력단면적은 ${f.stressArea}mm², 1인치에 ${f.tpi}산입니다.`,
    f => `${f.label} has a ${f.pitchDia} mm pitch diameter, ${f.minorMale} mm minor diameter on the bolt and ${f.minorFemale} mm in the nut. Tap drill ${f.tapDrill} mm, stress area ${f.stressArea} mm², ${f.tpi} threads per inch.`,
    f => `${f.label} tiene diámetro medio de ${f.pitchDia} mm, fondo del tornillo ${f.minorMale} mm y de la tuerca ${f.minorFemale} mm. Broca ${f.tapDrill} mm, área resistente ${f.stressArea} mm², ${f.tpi} hilos por pulgada.`,
    f => `${f.label} tem diâmetro médio de ${f.pitchDia} mm, fundo do parafuso ${f.minorMale} mm e da porca ${f.minorFemale} mm. Broca ${f.tapDrill} mm, área resistente ${f.stressArea} mm², ${f.tpi} fios por polegada.`,
    f => `${f.label}の有効径は${f.pitchDia}mm、おねじ谷径${f.minorMale}mm、めねじ谷径${f.minorFemale}mmです。下穴径${f.tapDrill}mm、有効断面積${f.stressArea}mm²、1インチあたり${f.tpi}山です。`,
    f => `${f.label} hat ${f.pitchDia} mm Flankendurchmesser, ${f.minorMale} mm Kerndurchmesser am Bolzen und ${f.minorFemale} mm in der Mutter. Kernloch ${f.tapDrill} mm, Spannungsquerschnitt ${f.stressArea} mm², ${f.tpi} Gänge je Zoll.`,
    f => `${f.label} présente un diamètre sur flancs de ${f.pitchDia} mm, un fond de vis de ${f.minorMale} mm et d’écrou de ${f.minorFemale} mm. Foret ${f.tapDrill} mm, section résistante ${f.stressArea} mm², ${f.tpi} filets par pouce.`,
    f => `${f.label} का पिच व्यास ${f.pitchDia} मिमी, बोल्ट माइनर ${f.minorMale} मिमी और नट माइनर ${f.minorFemale} मिमी है। टैप ड्रिल ${f.tapDrill} मिमी, स्ट्रेस एरिया ${f.stressArea} मिमी², प्रति इंच ${f.tpi} चूड़ियाँ।`,
    f => `${f.label} 的中径 ${f.pitchDia} 毫米，外螺纹小径 ${f.minorMale} 毫米，内螺纹小径 ${f.minorFemale} 毫米；底孔 ${f.tapDrill} 毫米，应力截面积 ${f.stressArea} 平方毫米，每英寸 ${f.tpi} 牙。`,
    f => `${f.label} 的中徑 ${f.pitchDia} 毫米，外螺紋小徑 ${f.minorMale} 毫米，內螺紋小徑 ${f.minorFemale} 毫米；底孔 ${f.tapDrill} 毫米，應力截面積 ${f.stressArea} 平方毫米，每英寸 ${f.tpi} 牙。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'M8이라고만 하면 어느 피치인가요?', a: '보통 나사인 M8×1.25입니다. 지름마다 기본 피치가 하나씩 정해져 있어서, 따로 적지 않으면 그것을 뜻합니다.' },
      { q: '가는 나사는 왜 쓰나요?', a: '골이 얕아 골지름이 굵어지므로 얇은 부품에 낼 수 있고, 한 바퀴에 덜 풀려 진동에도 덜 헐거워집니다. 대신 나사산이 얕아 더 잘 뭉개집니다.' },
      { q: '탭 드릴 지름은 어떻게 고르나요?', a: '외경에서 피치를 빼면 됩니다. M6×1이면 5mm, M8×1.25면 6.75mm라 6.8mm 드릴을 씁니다.' },
      { q: '수나사 골지름과 암나사 골지름이 왜 다른가요?', a: '수나사는 골을 더 깊게 깎아야 암나사 산이 들어갈 자리가 생기기 때문입니다. 그래서 수나사 쪽이 더 가늡니다.' },
      { q: '볼트 굵기로 힘을 계산하면 안 되나요?', a: '안 됩니다. 끊어지는 자리는 골이라 외경이 아니라 응력단면적으로 계산합니다. M8이면 50.3mm²가 아니라 36.6mm²입니다.' },
    ],
    [
      { q: 'If someone just says M8, which pitch is it?', a: 'The coarse thread, M8×1.25. Every diameter has one default pitch, and that is what an unqualified size means.' },
      { q: 'Why use a fine thread?', a: 'It cuts shallower, so the core stays thicker and the thread fits into thin parts; it also backs off less per turn, which helps against vibration. The trade-off is a shallower thread that strips more easily.' },
      { q: 'How do I pick the tap drill?', a: 'Subtract the pitch from the outside diameter. M6×1 gives 5 mm; M8×1.25 gives 6.75 mm, so you use a 6.8 mm drill.' },
      { q: 'Why do bolt and nut have different minor diameters?', a: 'The bolt is cut deeper so the nut’s crests have somewhere to sit. That is why the bolt’s minor diameter is the smaller of the two.' },
      { q: 'Can I size a bolt from its outside diameter?', a: 'No. It breaks at the root, so the strength calculation uses the stress area. For M8 that is 36.6 mm², not the 50.3 mm² of the full circle.' },
    ],
    [
      { q: 'Si alguien dice solo M8, ¿qué paso es?', a: 'El paso grueso, M8×1,25. Cada diámetro tiene un paso por defecto, y eso significa una medida sin más datos.' },
      { q: '¿Para qué sirve el paso fino?', a: 'Corta menos hondo, así el núcleo queda más grueso y la rosca cabe en piezas delgadas; además afloja menos por vuelta ante vibración. A cambio, el filete es más superficial y se pasa antes.' },
      { q: '¿Cómo elijo la broca para el macho?', a: 'Resta el paso al diámetro exterior. M6×1 da 5 mm; M8×1,25 da 6,75 mm, así que se usa broca de 6,8 mm.' },
      { q: '¿Por qué difieren los diámetros de fondo de tornillo y tuerca?', a: 'El tornillo se corta más hondo para dejar sitio a las crestas de la tuerca. Por eso el fondo del tornillo es el menor de los dos.' },
      { q: '¿Puedo calcular la carga con el diámetro exterior?', a: 'No. Rompe por el fondo, así que se calcula con el área resistente. En M8 son 36,6 mm², no los 50,3 mm² del círculo completo.' },
    ],
    [
      { q: 'Se alguém diz só M8, qual é o passo?', a: 'O passo grosso, M8×1,25. Cada diâmetro tem um passo padrão, e é isso que uma medida sem complemento significa.' },
      { q: 'Para que serve o passo fino?', a: 'Corta mais raso, então o núcleo fica mais grosso e a rosca cabe em peças finas; também afrouxa menos por volta com vibração. Em troca, o filete é mais raso e espana antes.' },
      { q: 'Como escolho a broca para o macho?', a: 'Subtraia o passo do diâmetro externo. M6×1 dá 5 mm; M8×1,25 dá 6,75 mm, então usa-se broca de 6,8 mm.' },
      { q: 'Por que parafuso e porca têm diâmetros de fundo diferentes?', a: 'O parafuso é cortado mais fundo para dar lugar às cristas da porca. Por isso o fundo do parafuso é o menor dos dois.' },
      { q: 'Posso dimensionar pelo diâmetro externo?', a: 'Não. A ruptura ocorre no fundo, então usa-se a área resistente. No M8 são 36,6 mm², não os 50,3 mm² do círculo cheio.' },
    ],
    [
      { q: '単にM8と言ったらどのピッチですか？', a: '並目のM8×1.25です。径ごとに基本ピッチが1つ決まっていて、何も書かなければそれを指します。' },
      { q: '細目ねじは何のために使いますか？', a: '谷が浅く谷径が太くなるので薄い部品にも切れますし、1回転で戻る量が少ないため振動でも緩みにくいです。その代わりねじ山が浅く、なめやすくなります。' },
      { q: '下穴径はどう選びますか？', a: '外径からピッチを引きます。M6×1なら5mm、M8×1.25なら6.75mmなので6.8mmのドリルを使います。' },
      { q: 'おねじとめねじで谷径が違うのはなぜですか？', a: 'おねじは、めねじの山が入る場所をつくるため深く削るからです。だからおねじ側のほうが細くなります。' },
      { q: '外径で強さを計算してはいけませんか？', a: 'いけません。切れるのは谷なので有効断面積で計算します。M8なら50.3mm²ではなく36.6mm²です。' },
    ],
    [
      { q: 'Wenn jemand nur „M8“ sagt — welche Steigung?', a: 'Das Regelgewinde M8×1,25. Zu jedem Durchmesser gehört eine Standardsteigung, und genau die ist gemeint, wenn nichts dabeisteht.' },
      { q: 'Wozu ein Feingewinde?', a: 'Es schneidet flacher, der Kern bleibt dicker und passt in dünne Teile; außerdem löst es sich je Umdrehung weniger, was bei Vibration hilft. Dafür ist das Gewinde flacher und reißt leichter aus.' },
      { q: 'Wie wähle ich den Kernlochbohrer?', a: 'Außendurchmesser minus Steigung. M6×1 ergibt 5 mm, M8×1,25 ergibt 6,75 mm — also der 6,8-mm-Bohrer.' },
      { q: 'Warum haben Bolzen und Mutter verschiedene Kerndurchmesser?', a: 'Der Bolzen wird tiefer geschnitten, damit die Gewindespitzen der Mutter Platz finden. Deshalb ist sein Kerndurchmesser der kleinere.' },
      { q: 'Darf ich mit dem Außendurchmesser rechnen?', a: 'Nein. Gerissen wird am Gewindegrund, also rechnet man mit dem Spannungsquerschnitt. Bei M8 sind das 36,6 mm², nicht die 50,3 mm² des vollen Kreises.' },
    ],
    [
      { q: 'Si l’on dit simplement M8, quel pas est-ce ?', a: 'Le pas gros, M8×1,25. Chaque diamètre a un pas par défaut, et c’est lui qu’on désigne quand rien n’est précisé.' },
      { q: 'À quoi sert un pas fin ?', a: 'Il creuse moins, le noyau reste plus épais et le filetage tient dans des pièces minces ; il se desserre aussi moins par tour, utile contre les vibrations. En contrepartie, le filet est moins profond et s’arrache plus vite.' },
      { q: 'Comment choisir le foret de taraudage ?', a: 'Diamètre extérieur moins le pas. M6×1 donne 5 mm ; M8×1,25 donne 6,75 mm, on prend donc un foret de 6,8 mm.' },
      { q: 'Pourquoi vis et écrou n’ont-ils pas le même diamètre de fond ?', a: 'La vis est creusée plus profond pour laisser place aux sommets de l’écrou. C’est pourquoi son diamètre de fond est le plus petit des deux.' },
      { q: 'Peut-on dimensionner sur le diamètre extérieur ?', a: 'Non. La rupture se produit au fond du filet : on calcule sur la section résistante. Pour M8, cela fait 36,6 mm² et non les 50,3 mm² du cercle plein.' },
    ],
    [
      { q: 'कोई सिर्फ़ M8 कहे तो कौन-सी पिच?', a: 'कोर्स थ्रेड, यानी M8×1.25। हर व्यास की एक मानक पिच तय है, और बिना कुछ लिखे वही समझी जाती है।' },
      { q: 'फ़ाइन थ्रेड क्यों इस्तेमाल करें?', a: 'कटाई कम गहरी होने से कोर मोटा रहता है और पतले पुर्ज़ों में भी चूड़ी बनती है; हर चक्कर में कम ढीली होने के कारण कंपन में भी टिकती है। बदले में चूड़ी उथली होती है और जल्दी घिस जाती है।' },
      { q: 'टैप ड्रिल कैसे चुनें?', a: 'बाहरी व्यास में से पिच घटाइए। M6×1 पर 5 मिमी; M8×1.25 पर 6.75 मिमी, यानी 6.8 मिमी ड्रिल।' },
      { q: 'बोल्ट और नट के माइनर व्यास अलग क्यों हैं?', a: 'बोल्ट को गहरा काटा जाता है ताकि नट की चूड़ियों को जगह मिले। इसीलिए बोल्ट का माइनर व्यास छोटा होता है।' },
      { q: 'क्या बाहरी व्यास से ताक़त निकाल सकते हैं?', a: 'नहीं। टूटन जड़ में होती है, इसलिए गणना स्ट्रेस एरिया से होती है। M8 के लिए वह 36.6 मिमी² है, पूरे वृत्त के 50.3 मिमी² नहीं।' },
    ],
    [
      { q: '只说 M8 是指哪种螺距？', a: '粗牙 M8×1.25。每个直径都有一个默认螺距，不另注明时就是它。' },
      { q: '细牙螺纹用在哪里？', a: '切得浅，芯部更粗，能用在薄壁件上；每转退回的量也小，抗振动更好。代价是牙浅，更容易滑丝。' },
      { q: '底孔钻头怎么选？', a: '外径减螺距。M6×1 得 5 毫米；M8×1.25 得 6.75 毫米，所以用 6.8 毫米钻头。' },
      { q: '为什么外螺纹和内螺纹的小径不同？', a: '外螺纹要切得更深，好给内螺纹的牙尖留位置，所以外螺纹的小径更小。' },
      { q: '能用外径算强度吗？', a: '不能。断裂发生在牙底，所以要用应力截面积。M8 是 36.6 平方毫米，而不是整圆的 50.3 平方毫米。' },
    ],
    [
      { q: '只說 M8 是指哪種螺距？', a: '粗牙 M8×1.25。每個直徑都有一個預設螺距，不另註明時就是它。' },
      { q: '細牙螺紋用在哪裡？', a: '切得淺，芯部更粗，能用在薄壁件上；每轉退回的量也小，抗振動更好。代價是牙淺，更容易滑牙。' },
      { q: '底孔鑽頭怎麼選？', a: '外徑減螺距。M6×1 得 5 毫米；M8×1.25 得 6.75 毫米，所以用 6.8 毫米鑽頭。' },
      { q: '為什麼外螺紋和內螺紋的小徑不同？', a: '外螺紋要切得更深，好給內螺紋的牙尖留位置，所以外螺紋的小徑更小。' },
      { q: '能用外徑算強度嗎？', a: '不能。斷裂發生在牙底，所以要用應力截面積。M8 是 36.6 平方毫米，而不是整圓的 50.3 平方毫米。' },
    ],
  ),

  screwFaq: T<(f: ScrewFacts) => FaqItem[]>(
    f => [
      { q: `${f.label} 탭을 내려면 몇 mm 드릴이 필요한가요?`, a: `${f.tapDrill}mm입니다. 외경 ${f.screw.d}mm에서 피치 ${f.screw.p}mm를 뺀 값이고, 가장 가까운 드릴을 쓰면 됩니다.` },
      { q: `${f.label}의 골지름은 얼마인가요?`, a: `수나사가 ${f.minorMale}mm, 암나사가 ${f.minorFemale}mm입니다. 유효지름은 그 사이인 ${f.pitchDia}mm입니다.` },
      { q: `보통 나사인가요, 가는 나사인가요?`, a: f.screw.coarse ? `보통 나사입니다. 그냥 M${f.screw.d}이라고 하면 이 규격을 뜻합니다.` : `가는 나사입니다. 보통 나사는 따로 있으니 피치를 꼭 적어야 합니다.` },
      { q: `얼마나 버티나요?`, a: `응력단면적이 ${f.stressArea}mm²입니다. 볼트의 강도 등급에 이 넓이를 곱하면 견디는 힘이 나옵니다.` },
    ],
    f => [
      { q: `What drill do I need to tap ${f.label}?`, a: `${f.tapDrill} mm — the ${f.screw.d} mm outside diameter minus the ${f.screw.p} mm pitch. Use the nearest drill you have.` },
      { q: `What is the minor diameter of ${f.label}?`, a: `${f.minorMale} mm on the bolt and ${f.minorFemale} mm in the nut, with the pitch diameter between them at ${f.pitchDia} mm.` },
      { q: `Is it a coarse or a fine thread?`, a: f.screw.coarse ? `Coarse — plain “M${f.screw.d}” means exactly this size.` : `Fine. There is a coarse pitch for this diameter too, so the pitch must always be written out.` },
      { q: `How much load does it take?`, a: `Its stress area is ${f.stressArea} mm². Multiply that by the bolt’s strength grade to get the load it carries.` },
    ],
    f => [
      { q: `¿Qué broca necesito para roscar ${f.label}?`, a: `${f.tapDrill} mm: el diámetro exterior de ${f.screw.d} mm menos el paso de ${f.screw.p} mm. Usa la broca más cercana que tengas.` },
      { q: `¿Cuál es el diámetro de fondo de ${f.label}?`, a: `${f.minorMale} mm en el tornillo y ${f.minorFemale} mm en la tuerca, con el diámetro medio entre ambos, ${f.pitchDia} mm.` },
      { q: `¿Es de paso grueso o fino?`, a: f.screw.coarse ? `Grueso: decir solo «M${f.screw.d}» ya significa esta medida.` : `Fino. Este diámetro también tiene paso grueso, así que hay que escribir siempre el paso.` },
      { q: `¿Cuánta carga aguanta?`, a: `Su área resistente es ${f.stressArea} mm². Multiplícala por la clase de resistencia del tornillo para obtener la carga.` },
    ],
    f => [
      { q: `Que broca preciso para roscar ${f.label}?`, a: `${f.tapDrill} mm: o diâmetro externo de ${f.screw.d} mm menos o passo de ${f.screw.p} mm. Use a broca mais próxima que tiver.` },
      { q: `Qual é o diâmetro de fundo de ${f.label}?`, a: `${f.minorMale} mm no parafuso e ${f.minorFemale} mm na porca, com o diâmetro médio entre eles, ${f.pitchDia} mm.` },
      { q: `É passo grosso ou fino?`, a: f.screw.coarse ? `Grosso: dizer só “M${f.screw.d}” já significa esta medida.` : `Fino. Este diâmetro também tem passo grosso, então o passo precisa ser sempre escrito.` },
      { q: `Quanta carga aguenta?`, a: `A área resistente é ${f.stressArea} mm². Multiplique pela classe de resistência do parafuso para obter a carga.` },
    ],
    f => [
      { q: `${f.label}のタップを立てるには何mmのドリルですか？`, a: `${f.tapDrill}mmです。外径${f.screw.d}mmからピッチ${f.screw.p}mmを引いた値で、一番近いドリルを使えば構いません。` },
      { q: `${f.label}の谷径はいくつですか？`, a: `おねじが${f.minorMale}mm、めねじが${f.minorFemale}mmで、有効径はその間の${f.pitchDia}mmです。` },
      { q: `並目ですか、細目ですか？`, a: f.screw.coarse ? `並目です。単にM${f.screw.d}と言えばこの規格を指します。` : `細目です。この径には並目もあるので、ピッチを必ず書きます。` },
      { q: `どれくらいの力に耐えますか？`, a: `有効断面積は${f.stressArea}mm²です。ボルトの強度区分にこの面積を掛ければ耐える力が出ます。` },
    ],
    f => [
      { q: `Welchen Bohrer brauche ich für ${f.label}?`, a: `${f.tapDrill} mm — Außendurchmesser ${f.screw.d} mm minus Steigung ${f.screw.p} mm. Nimm den nächstliegenden Bohrer.` },
      { q: `Wie groß ist der Kerndurchmesser von ${f.label}?`, a: `${f.minorMale} mm am Bolzen, ${f.minorFemale} mm in der Mutter, dazwischen der Flankendurchmesser mit ${f.pitchDia} mm.` },
      { q: `Regel- oder Feingewinde?`, a: f.screw.coarse ? `Regelgewinde — schlicht „M${f.screw.d}“ meint genau diese Größe.` : `Feingewinde. Zu diesem Durchmesser gibt es auch ein Regelgewinde, deshalb muss die Steigung immer mitgeschrieben werden.` },
      { q: `Wie viel hält sie aus?`, a: `Der Spannungsquerschnitt beträgt ${f.stressArea} mm². Mal der Festigkeitsklasse ergibt das die tragbare Last.` },
    ],
    f => [
      { q: `Quel foret pour tarauder ${f.label} ?`, a: `${f.tapDrill} mm : le diamètre extérieur de ${f.screw.d} mm moins le pas de ${f.screw.p} mm. Prenez le foret le plus proche.` },
      { q: `Quel est le diamètre de fond de ${f.label} ?`, a: `${f.minorMale} mm côté vis et ${f.minorFemale} mm côté écrou, le diamètre sur flancs se plaçant entre les deux à ${f.pitchDia} mm.` },
      { q: `Pas gros ou pas fin ?`, a: f.screw.coarse ? `Pas gros : dire simplement « M${f.screw.d} » désigne cette dimension.` : `Pas fin. Ce diamètre existe aussi en pas gros, donc le pas doit toujours être précisé.` },
      { q: `Quelle charge supporte-t-elle ?`, a: `Sa section résistante vaut ${f.stressArea} mm². Multipliez-la par la classe de résistance de la vis pour obtenir la charge.` },
    ],
    f => [
      { q: `${f.label} टैप करने के लिए कौन-सी ड्रिल चाहिए?`, a: `${f.tapDrill} मिमी — बाहरी व्यास ${f.screw.d} मिमी में से पिच ${f.screw.p} मिमी घटाकर। सबसे नज़दीकी ड्रिल ले लीजिए।` },
      { q: `${f.label} का माइनर व्यास कितना है?`, a: `बोल्ट पर ${f.minorMale} मिमी और नट में ${f.minorFemale} मिमी; बीच में पिच व्यास ${f.pitchDia} मिमी।` },
      { q: `यह कोर्स है या फ़ाइन?`, a: f.screw.coarse ? `कोर्स — केवल “M${f.screw.d}” कहने का अर्थ यही नाप है।` : `फ़ाइन। इस व्यास का कोर्स थ्रेड भी है, इसलिए पिच हमेशा लिखनी चाहिए।` },
      { q: `यह कितना भार सहता है?`, a: `इसका स्ट्रेस एरिया ${f.stressArea} मिमी² है। बोल्ट के ग्रेड से गुणा करने पर भार क्षमता मिलती है।` },
    ],
    f => [
      { q: `攻 ${f.label} 螺纹要用多大的钻头？`, a: `${f.tapDrill} 毫米——外径 ${f.screw.d} 毫米减去螺距 ${f.screw.p} 毫米，取手边最接近的钻头即可。` },
      { q: `${f.label} 的小径是多少？`, a: `外螺纹 ${f.minorMale} 毫米，内螺纹 ${f.minorFemale} 毫米，中径居中为 ${f.pitchDia} 毫米。` },
      { q: `它是粗牙还是细牙？`, a: f.screw.coarse ? `粗牙——只说“M${f.screw.d}”就是指这个规格。` : `细牙。这个直径也有粗牙，所以必须写明螺距。` },
      { q: `它能承受多大力？`, a: `应力截面积为 ${f.stressArea} 平方毫米，乘以螺栓的强度等级即得承载力。` },
    ],
    f => [
      { q: `攻 ${f.label} 螺紋要用多大的鑽頭？`, a: `${f.tapDrill} 毫米——外徑 ${f.screw.d} 毫米減去螺距 ${f.screw.p} 毫米，取手邊最接近的鑽頭即可。` },
      { q: `${f.label} 的小徑是多少？`, a: `外螺紋 ${f.minorMale} 毫米，內螺紋 ${f.minorFemale} 毫米，中徑居中為 ${f.pitchDia} 毫米。` },
      { q: `它是粗牙還是細牙？`, a: f.screw.coarse ? `粗牙——只說「M${f.screw.d}」就是指這個規格。` : `細牙。這個直徑也有粗牙，所以必須寫明螺距。` },
      { q: `它能承受多大力？`, a: `應力截面積為 ${f.stressArea} 平方毫米，乘以螺栓的強度等級即得承載力。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SCREW_UI: L<ScrewUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<ScrewUI>;
