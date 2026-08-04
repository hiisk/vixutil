/**
 * CSS 단위 화면의 문구 — 열 언어.
 *
 * 이 표에 오는 사람은 대개 디자인 시안의 px를 코드의 rem으로 옮기는 중이다.
 * 그래서 rem이 맨 앞이고, 나머지 단위는 그다음이다.
 *
 * rem이 왜 16으로 나뉘는지도 계속 짚어 준다 — 브라우저 기본 글자 크기가
 * 16px이기 때문이고, 사용자가 그것을 키우면 rem으로 적은 자리만 함께 커진다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PxFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PxUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  remLabel: string;
  ptLabel: string;
  pcLabel: string;
  inchLabel: string;
  mmLabel: string;
  cmLabel: string;
  percentLabel: string;
  remTitle: string;
  remNote: string;
  absoluteTitle: string;
  absoluteNote: string;
  wholeTitle: string;
  wholeNote: string;
  commonTitle: string;
  commonNote: string;
  allTitle: string;
  neighbourTitle: string;
  exactTag: string;
  desc: (f: PxFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PxFacts) => string;
  metaDesc: (f: PxFacts) => string;
  hubFaq: FaqItem[];
  pxFaq: (f: PxFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof PxUI]: L<PxUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('CSS 단위', 'CSS units', 'Unidades CSS', 'Unidades CSS', 'CSS単位', 'CSS-Einheiten', 'Unités CSS', 'CSS इकाइयाँ', 'CSS 单位', 'CSS 單位'),

  hubTitle: T(
    'px를 rem으로 — CSS 단위표 120가지',
    'px to rem — a CSS unit table of 120 sizes',
    'De px a rem — tabla de unidades CSS con 120 tamaños',
    'De px a rem — tabela de unidades CSS com 120 tamanhos',
    'pxをremへ — CSS単位表120種',
    'px in rem — eine CSS-Einheitentabelle mit 120 Größen',
    'De px à rem — un tableau des unités CSS, 120 tailles',
    'px से rem — 120 आकारों की CSS इकाई तालिका',
    'px 换 rem — 120 种尺寸的 CSS 单位表',
    'px 換 rem — 120 種尺寸的 CSS 單位表',
  ),

  hubLead: T(
    '16px이 1rem이고 12pt입니다. 1px부터 120px까지 rem·pt·pc·인치·밀리미터를 한 줄에 놓았습니다.',
    '16 px is 1 rem and also 12 pt. Every size from 1 to 120 px, with its rem, pt, pc, inch and millimetre value on one line.',
    '16 px son 1 rem y también 12 pt. Cada tamaño de 1 a 120 px, con su valor en rem, pt, pc, pulgadas y milímetros.',
    '16 px são 1 rem e também 12 pt. Cada tamanho de 1 a 120 px, com seu valor em rem, pt, pc, polegadas e milímetros.',
    '16pxは1remであり12ptでもあります。1pxから120pxまで、rem・pt・pc・インチ・ミリメートルを1行に並べました。',
    '16 px sind 1 rem und zugleich 12 pt. Jede Größe von 1 bis 120 px mit ihrem Wert in rem, pt, pc, Zoll und Millimeter.',
    '16 px valent 1 rem et aussi 12 pt. Chaque taille de 1 à 120 px, avec sa valeur en rem, pt, pc, pouces et millimètres.',
    '16 px यानी 1 rem और 12 pt भी। 1 से 120 px तक हर आकार, उसके rem, pt, pc, इंच और मिलीमीटर मान के साथ।',
    '16px 就是 1rem，也是 12pt。1 到 120px 的每个尺寸，rem、pt、pc、英寸与毫米一行列齐。',
    '16px 就是 1rem，也是 12pt。1 到 120px 的每個尺寸，rem、pt、pc、英寸與毫米一行列齊。',
  ),

  remLabel: T('rem (16px 기준)', 'rem (root 16 px)', 'rem (raíz 16 px)', 'rem (raiz 16 px)', 'rem（基準16px）', 'rem (Basis 16 px)', 'rem (base 16 px)', 'rem (आधार 16 px)', 'rem（基准 16px）', 'rem（基準 16px）'),
  ptLabel: T('pt (포인트)', 'pt (points)', 'pt (puntos)', 'pt (pontos)', 'pt（ポイント）', 'pt (Punkt)', 'pt (points)', 'pt (पॉइंट)', 'pt（磅）', 'pt（點）'),
  pcLabel: T('pc (파이카)', 'pc (picas)', 'pc (picas)', 'pc (paicas)', 'pc（パイカ）', 'pc (Pica)', 'pc (picas)', 'pc (पाइका)', 'pc（派卡）', 'pc（派卡）'),
  inchLabel: T('인치', 'inches', 'pulgadas', 'polegadas', 'インチ', 'Zoll', 'pouces', 'इंच', '英寸', '英寸'),
  mmLabel: T('밀리미터', 'millimetres', 'milímetros', 'milímetros', 'ミリメートル', 'Millimeter', 'millimètres', 'मिलीमीटर', '毫米', '毫米'),
  cmLabel: T('센티미터', 'centimetres', 'centímetros', 'centímetros', 'センチメートル', 'Zentimeter', 'centimètres', 'सेंटीमीटर', '厘米', '公分'),
  percentLabel: T('백분율', 'percent of root', 'porcentaje de la raíz', 'porcentagem da raiz', 'ルートに対する％', 'Prozent der Basis', 'pourcentage de la base', 'आधार का प्रतिशत', '相对根字号', '相對根字級'),

  remTitle: T('rem은 왜 16으로 나누나요', 'Why rem divides by 16', 'Por qué rem se divide entre 16', 'Por que rem se divide por 16', 'remを16で割る理由', 'Warum rem durch 16 teilt', 'Pourquoi rem se divise par 16', 'rem 16 से क्यों बँटता है', 'rem 为什么除以 16', 'rem 為什麼除以 16'),

  remNote: T(
    '브라우저 기본 글자 크기가 16px이고 rem은 그 크기에 대한 배수이기 때문입니다. 사용자가 브라우저에서 글자를 키우면 rem으로 적은 자리만 함께 커집니다 — px로 못 박아 둔 자리는 그대로입니다.',
    'Because browsers default the root font size to 16 px, and rem is a multiple of it. When a reader enlarges text in their browser settings, only the parts written in rem grow — anything pinned in px stays put.',
    'Porque los navegadores fijan el tamaño de fuente raíz en 16 px y rem es un múltiplo de él. Si el lector aumenta el texto en su navegador, solo crece lo escrito en rem; lo fijado en px se queda igual.',
    'Porque os navegadores definem o tamanho de fonte raiz em 16 px e rem é um múltiplo dele. Se o leitor aumentar o texto no navegador, só cresce o que está em rem; o que foi fixado em px permanece.',
    'ブラウザの既定の文字サイズが16pxで、remはその倍数だからです。利用者がブラウザで文字を大きくすると、remで書いた部分だけが一緒に大きくなります——pxで固定した部分はそのままです。',
    'Weil Browser die Wurzelschriftgröße auf 16 px setzen und rem ein Vielfaches davon ist. Vergrößert jemand die Schrift im Browser, wächst nur, was in rem steht — alles in px Festgenagelte bleibt.',
    'Parce que les navigateurs fixent la taille de police racine à 16 px et que rem en est un multiple. Si le lecteur agrandit le texte dans son navigateur, seules les valeurs en rem suivent ; ce qui est figé en px ne bouge pas.',
    'क्योंकि ब्राउज़र की डिफ़ॉल्ट रूट फ़ॉन्ट साइज़ 16 px है और rem उसी का गुणज है। पाठक ब्राउज़र में अक्षर बड़े करे तो केवल rem में लिखे हिस्से बढ़ते हैं — px में जड़े हिस्से वैसे ही रहते हैं।',
    '因为浏览器默认根字号是 16px，而 rem 是它的倍数。读者在浏览器里调大字号时，只有用 rem 写的部分会跟着变大，写死成 px 的地方纹丝不动。',
    '因為瀏覽器預設根字級是 16px，而 rem 是它的倍數。讀者在瀏覽器裡調大字級時，只有用 rem 寫的部分會跟著變大，寫死成 px 的地方紋絲不動。',
  ),

  absoluteTitle: T('pt·인치는 화면에서도 픽셀로 정해집니다', 'On screen, pt and inches are still pixels', 'En pantalla, pt y pulgadas siguen siendo píxeles', 'Na tela, pt e polegadas continuam sendo pixels', '画面ではptもインチも画素で決まります', 'Am Bildschirm sind pt und Zoll ebenfalls Pixel', 'À l’écran, pt et pouces restent des pixels', 'स्क्रीन पर pt और इंच भी पिक्सेल ही हैं', '屏幕上 pt 与英寸也是按像素定的', '螢幕上 pt 與英寸也是按像素定的'),

  absoluteNote: T(
    'CSS는 1인치를 96px로, 1pt를 1/72인치로 못 박아 두었습니다. 그래서 16px은 정확히 12pt이고, 화면에서 자로 재면 1인치가 나오지는 않습니다.',
    'CSS fixes one inch at 96 px and one point at 1/72 inch. So 16 px is exactly 12 pt — but hold a ruler to the screen and that "inch" will not measure an inch.',
    'CSS fija una pulgada en 96 px y un punto en 1/72 de pulgada. Así 16 px son exactamente 12 pt, aunque si pones una regla en la pantalla esa «pulgada» no medirá una pulgada.',
    'O CSS fixa uma polegada em 96 px e um ponto em 1/72 de polegada. Assim, 16 px são exatamente 12 pt — mas encoste uma régua na tela e essa "polegada" não medirá uma polegada.',
    'CSSは1インチを96px、1ptを1/72インチと定めています。だから16pxはちょうど12ptですが、画面に定規を当ててもその「1インチ」は1インチになりません。',
    'CSS legt ein Zoll auf 96 px und einen Punkt auf 1/72 Zoll fest. Deshalb sind 16 px genau 12 pt — hält man aber ein Lineal an den Bildschirm, misst dieses „Zoll“ kein Zoll.',
    'CSS fixe le pouce à 96 px et le point à 1/72 de pouce. Ainsi 16 px valent exactement 12 pt — mais posez une règle sur l’écran et ce « pouce » n’en mesurera pas un.',
    'CSS एक इंच को 96 px और एक पॉइंट को 1/72 इंच मानता है। इसलिए 16 px ठीक 12 pt है — पर स्क्रीन पर पैमाना रखिए तो वह "इंच" इंच नहीं निकलेगा।',
    'CSS 规定 1 英寸等于 96px，1pt 等于 1/72 英寸。所以 16px 正好是 12pt——但把尺子贴到屏幕上，那个“英寸”并不是真的一英寸。',
    'CSS 規定 1 英寸等於 96px，1pt 等於 1/72 英寸。所以 16px 正好是 12pt——但把尺貼到螢幕上，那個「英寸」並不是真的一英寸。',
  ),

  wholeTitle: T('딱 떨어지는 값', 'Sizes that come out whole', 'Tamaños que salen enteros', 'Tamanhos que saem inteiros', '割り切れる値', 'Größen, die glatt aufgehen', 'Tailles qui tombent juste', 'पूरे अंक वाले आकार', '能整除的尺寸', '能整除的尺寸'),

  wholeNote: T(
    'rem이 정수가 되는 것은 16의 배수이고, pt가 정수가 되는 것은 4의 배수입니다 — 4px이 정확히 3pt이기 때문입니다.',
    'The rem comes out whole on multiples of 16, and the pt on multiples of 4 — because 4 px is exactly 3 pt.',
    'El rem sale entero en los múltiplos de 16 y el pt en los de 4, porque 4 px son exactamente 3 pt.',
    'O rem sai inteiro nos múltiplos de 16 e o pt nos de 4, porque 4 px são exatamente 3 pt.',
    'remが整数になるのは16の倍数、ptが整数になるのは4の倍数です——4pxがちょうど3ptだからです。',
    'Das rem geht bei Vielfachen von 16 glatt auf, das pt bei Vielfachen von 4 — denn 4 px sind genau 3 pt.',
    'Le rem tombe juste sur les multiples de 16, et le pt sur ceux de 4, car 4 px valent exactement 3 pt.',
    'rem 16 के गुणजों पर पूरा आता है और pt 4 के गुणजों पर — क्योंकि 4 px ठीक 3 pt है।',
    'rem 在 16 的倍数上是整数，pt 在 4 的倍数上是整数——因为 4px 正好是 3pt。',
    'rem 在 16 的倍數上是整數，pt 在 4 的倍數上是整數——因為 4px 正好是 3pt。',
  ),

  commonTitle: T('자주 쓰는 크기', 'Sizes you meet most', 'Los tamaños más habituales', 'Os tamanhos mais comuns', 'よく使う大きさ', 'Die häufigsten Größen', 'Les tailles les plus courantes', 'सबसे आम आकार', '最常用的尺寸', '最常用的尺寸'),

  commonNote: T(
    '본문 16px, 작은 글씨 14px, 여백 8·24·32px처럼 되풀이되는 값들입니다.',
    'Body text at 16, small text at 14, spacing at 8, 24 and 32 — the values that keep coming back.',
    'Texto base en 16, texto pequeño en 14, espaciados de 8, 24 y 32: los valores que se repiten.',
    'Texto base em 16, texto pequeno em 14, espaçamentos de 8, 24 e 32: os valores que se repetem.',
    '本文16px、小さい文字14px、余白8・24・32pxのように繰り返し出てくる値です。',
    'Fließtext bei 16, kleine Schrift bei 14, Abstände von 8, 24 und 32 — die Werte, die immer wiederkehren.',
    'Texte courant à 16, petit texte à 14, espacements de 8, 24 et 32 : les valeurs qui reviennent sans cesse.',
    'मुख्य पाठ 16, छोटा पाठ 14, स्पेसिंग 8, 24 और 32 — यही मान बार-बार लौटते हैं।',
    '正文 16、小字 14、间距 8/24/32——这些是反复出现的数值。',
    '正文 16、小字 14、間距 8/24/32——這些是反覆出現的數值。',
  ),

  allTitle: T('1px부터 120px까지', 'From 1 px to 120 px', 'De 1 px a 120 px', 'De 1 px a 120 px', '1pxから120pxまで', 'Von 1 px bis 120 px', 'De 1 px à 120 px', '1 px से 120 px तक', '从 1px 到 120px', '從 1px 到 120px'),
  neighbourTitle: T('가까운 크기', 'Nearby sizes', 'Tamaños cercanos', 'Tamanhos próximos', '近い大きさ', 'Größen daneben', 'Tailles voisines', 'पास के आकार', '相邻尺寸', '相鄰尺寸'),
  exactTag: T('딱 떨어집니다', 'exact', 'exacto', 'exato', '割り切れます', 'glatt', 'exact', 'पूरा', '整数', '整數'),

  desc: T<(f: PxFacts) => string>(
    f => `${f.px}px는 ${f.rem}rem이고 ${f.pt}pt입니다. 인치로는 ${f.inch}, 밀리미터로는 ${f.mm}이며, 루트 글자 크기의 ${f.percent}%입니다.`,
    f => `${f.px} px is ${f.rem} rem and ${f.pt} pt — ${f.inch} inches, ${f.mm} mm, and ${f.percent}% of the root font size.`,
    f => `${f.px} px son ${f.rem} rem y ${f.pt} pt: ${f.inch} pulgadas, ${f.mm} mm y el ${f.percent}% del tamaño de fuente raíz.`,
    f => `${f.px} px são ${f.rem} rem e ${f.pt} pt: ${f.inch} polegadas, ${f.mm} mm e ${f.percent}% do tamanho de fonte raiz.`,
    f => `${f.px}pxは${f.rem}remで${f.pt}ptです。インチでは${f.inch}、ミリメートルでは${f.mm}、ルート文字サイズの${f.percent}%にあたります。`,
    f => `${f.px} px sind ${f.rem} rem und ${f.pt} pt — ${f.inch} Zoll, ${f.mm} mm und ${f.percent} % der Wurzelschriftgröße.`,
    f => `${f.px} px valent ${f.rem} rem et ${f.pt} pt : ${f.inch} pouce, ${f.mm} mm, soit ${f.percent} % de la taille de police racine.`,
    f => `${f.px} px यानी ${f.rem} rem और ${f.pt} pt — ${f.inch} इंच, ${f.mm} मिमी, और रूट फ़ॉन्ट साइज़ का ${f.percent}%।`,
    f => `${f.px}px 等于 ${f.rem}rem、${f.pt}pt，合 ${f.inch} 英寸、${f.mm} 毫米，是根字号的 ${f.percent}%。`,
    f => `${f.px}px 等於 ${f.rem}rem、${f.pt}pt，合 ${f.inch} 英寸、${f.mm} 毫米，是根字級的 ${f.percent}%。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      'rem = px ÷ 16. 브라우저 기본 글자 크기가 16px이기 때문입니다.',
      'pt = px × 0.75. CSS가 1인치를 96px, 1pt를 1/72인치로 정해 두었습니다.',
      '1pc는 12pt이고, 1인치는 96px이자 72pt입니다.',
      '글자와 여백은 rem으로, 테두리처럼 얇아야 하는 선은 px로 적는 편이 좋습니다.',
    ],
    [
      'rem = px ÷ 16, because browsers default the root font size to 16 px.',
      'pt = px × 0.75, since CSS fixes an inch at 96 px and a point at 1/72 inch.',
      'One pc is 12 pt, and one inch is both 96 px and 72 pt.',
      'Use rem for text and spacing; keep px for hairlines such as borders.',
    ],
    [
      'rem = px ÷ 16, porque los navegadores fijan la fuente raíz en 16 px.',
      'pt = px × 0,75, ya que CSS fija la pulgada en 96 px y el punto en 1/72 de pulgada.',
      'Un pc son 12 pt, y una pulgada son 96 px y también 72 pt.',
      'Usa rem para texto y espaciados; deja px para líneas finas como los bordes.',
    ],
    [
      'rem = px ÷ 16, porque os navegadores fixam a fonte raiz em 16 px.',
      'pt = px × 0,75, já que o CSS fixa a polegada em 96 px e o ponto em 1/72 de polegada.',
      'Um pc são 12 pt, e uma polegada são 96 px e também 72 pt.',
      'Use rem para texto e espaçamentos; deixe px para linhas finas como bordas.',
    ],
    [
      'rem = px ÷ 16。ブラウザの既定の文字サイズが16pxだからです。',
      'pt = px × 0.75。CSSが1インチを96px、1ptを1/72インチと定めています。',
      '1pcは12pt、1インチは96pxであり72ptでもあります。',
      '文字と余白はremで、境界線のように細くしたい線はpxで書くのがよいです。',
    ],
    [
      'rem = px ÷ 16, denn Browser setzen die Wurzelschriftgröße auf 16 px.',
      'pt = px × 0,75, da CSS ein Zoll auf 96 px und einen Punkt auf 1/72 Zoll festlegt.',
      'Ein pc sind 12 pt, ein Zoll sind 96 px und zugleich 72 pt.',
      'Für Text und Abstände rem nehmen; px bleibt für Haarlinien wie Rahmen.',
    ],
    [
      'rem = px ÷ 16, car les navigateurs fixent la police racine à 16 px.',
      'pt = px × 0,75, puisque CSS fixe le pouce à 96 px et le point à 1/72 de pouce.',
      'Un pc vaut 12 pt, et un pouce vaut 96 px comme 72 pt.',
      'Utilisez rem pour le texte et les espacements ; gardez px pour les filets fins comme les bordures.',
    ],
    [
      'rem = px ÷ 16, क्योंकि ब्राउज़र रूट फ़ॉन्ट साइज़ 16 px रखते हैं।',
      'pt = px × 0.75, क्योंकि CSS एक इंच को 96 px और एक पॉइंट को 1/72 इंच मानता है।',
      'एक pc बराबर 12 pt, और एक इंच बराबर 96 px तथा 72 pt।',
      'पाठ और स्पेसिंग के लिए rem; बॉर्डर जैसी पतली रेखाओं के लिए px रहने दें।',
    ],
    [
      'rem = px ÷ 16，因为浏览器默认根字号是 16px。',
      'pt = px × 0.75，因为 CSS 规定 1 英寸 = 96px、1pt = 1/72 英寸。',
      '1pc 等于 12pt，1 英寸既是 96px 也是 72pt。',
      '文字和间距用 rem，边框这类要细的线保留 px。',
    ],
    [
      'rem = px ÷ 16，因為瀏覽器預設根字級是 16px。',
      'pt = px × 0.75，因為 CSS 規定 1 英寸 = 96px、1pt = 1/72 英寸。',
      '1pc 等於 12pt，1 英寸既是 96px 也是 72pt。',
      '文字和間距用 rem，邊框這類要細的線保留 px。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'px ↔ rem 변환표 — CSS 단위 120가지',
    'px to rem conversion chart — 120 CSS sizes',
    'Tabla de conversión px a rem — 120 tamaños CSS',
    'Tabela de conversão px para rem — 120 tamanhos CSS',
    'px ↔ rem 変換表 — CSS単位120種',
    'px-zu-rem-Tabelle — 120 CSS-Größen',
    'Table de conversion px vers rem — 120 tailles CSS',
    'px से rem रूपांतरण तालिका — 120 CSS आकार',
    'px 转 rem 换算表 — 120 种 CSS 尺寸',
    'px 轉 rem 換算表 — 120 種 CSS 尺寸',
  ),

  hubMetaDesc: T(
    '1px부터 120px까지 rem·pt·pc·인치·밀리미터로 옮겼습니다. 16px = 1rem = 12pt, 96px = 1인치입니다.',
    'Every size from 1 to 120 px converted to rem, pt, pc, inches and millimetres. 16 px = 1 rem = 12 pt, and 96 px = 1 inch.',
    'Cada tamaño de 1 a 120 px convertido a rem, pt, pc, pulgadas y milímetros. 16 px = 1 rem = 12 pt, y 96 px = 1 pulgada.',
    'Cada tamanho de 1 a 120 px convertido em rem, pt, pc, polegadas e milímetros. 16 px = 1 rem = 12 pt, e 96 px = 1 polegada.',
    '1pxから120pxまでをrem・pt・pc・インチ・ミリメートルに換算しました。16px = 1rem = 12pt、96px = 1インチです。',
    'Alle Größen von 1 bis 120 px in rem, pt, pc, Zoll und Millimeter umgerechnet. 16 px = 1 rem = 12 pt, 96 px = 1 Zoll.',
    'Toutes les tailles de 1 à 120 px converties en rem, pt, pc, pouces et millimètres. 16 px = 1 rem = 12 pt, et 96 px = 1 pouce.',
    '1 से 120 px तक हर आकार rem, pt, pc, इंच और मिलीमीटर में। 16 px = 1 rem = 12 pt, और 96 px = 1 इंच।',
    '1 到 120px 的每个尺寸换算成 rem、pt、pc、英寸与毫米。16px = 1rem = 12pt，96px = 1 英寸。',
    '1 到 120px 的每個尺寸換算成 rem、pt、pc、英寸與毫米。16px = 1rem = 12pt，96px = 1 英寸。',
  ),

  metaTitle: T<(f: PxFacts) => string>(
    f => `${f.px}px는 몇 rem — ${f.rem}rem, ${f.pt}pt`,
    f => `${f.px} px in rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px} px en rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px} px em rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px}pxは何rem — ${f.rem}rem、${f.pt}pt`,
    f => `${f.px} px in rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px} px en rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px} px कितने rem — ${f.rem} rem, ${f.pt} pt`,
    f => `${f.px}px 是多少 rem — ${f.rem}rem，${f.pt}pt`,
    f => `${f.px}px 是多少 rem — ${f.rem}rem，${f.pt}pt`,
  ),

  metaDesc: T<(f: PxFacts) => string>(
    f => `${f.px}px는 ${f.rem}rem, ${f.pt}pt, ${f.pc}pc입니다. 인치로는 ${f.inch}, 밀리미터로는 ${f.mm}, 루트 글자 크기의 ${f.percent}%입니다.`,
    f => `${f.px} px equals ${f.rem} rem, ${f.pt} pt and ${f.pc} pc — ${f.inch} inches, ${f.mm} mm, ${f.percent}% of the root font size.`,
    f => `${f.px} px equivalen a ${f.rem} rem, ${f.pt} pt y ${f.pc} pc: ${f.inch} pulgadas, ${f.mm} mm, el ${f.percent}% de la fuente raíz.`,
    f => `${f.px} px equivalem a ${f.rem} rem, ${f.pt} pt e ${f.pc} pc: ${f.inch} polegadas, ${f.mm} mm, ${f.percent}% da fonte raiz.`,
    f => `${f.px}pxは${f.rem}rem、${f.pt}pt、${f.pc}pcです。インチでは${f.inch}、ミリメートルでは${f.mm}、ルート文字サイズの${f.percent}%です。`,
    f => `${f.px} px entsprechen ${f.rem} rem, ${f.pt} pt und ${f.pc} pc — ${f.inch} Zoll, ${f.mm} mm, ${f.percent} % der Wurzelschriftgröße.`,
    f => `${f.px} px valent ${f.rem} rem, ${f.pt} pt et ${f.pc} pc : ${f.inch} pouce, ${f.mm} mm, ${f.percent} % de la police racine.`,
    f => `${f.px} px बराबर ${f.rem} rem, ${f.pt} pt और ${f.pc} pc — ${f.inch} इंच, ${f.mm} मिमी, रूट फ़ॉन्ट का ${f.percent}%।`,
    f => `${f.px}px 等于 ${f.rem}rem、${f.pt}pt、${f.pc}pc，合 ${f.inch} 英寸、${f.mm} 毫米，占根字号的 ${f.percent}%。`,
    f => `${f.px}px 等於 ${f.rem}rem、${f.pt}pt、${f.pc}pc，合 ${f.inch} 英寸、${f.mm} 毫米，佔根字級的 ${f.percent}%。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '1rem은 몇 px인가요?', a: '브라우저 기본값에서는 16px입니다. 다만 사용자가 브라우저 설정에서 글자를 키웠다면 그만큼 커집니다 — 그것이 rem을 쓰는 이유입니다.' },
      { q: 'px와 rem 가운데 뭘 써야 하나요?', a: '글자와 여백은 rem이 좋습니다. 사용자가 글자를 키웠을 때 함께 커지기 때문입니다. 1px 테두리처럼 얇아야 하는 선은 px로 둡니다.' },
      { q: 'html에 font-size: 62.5%를 주는 건 왜인가요?', a: '루트를 10px로 만들어 1.6rem = 16px처럼 계산을 쉽게 하려는 방법입니다. 다만 사용자가 기본 글자 크기를 바꿔 둔 경우 의도와 다르게 작아질 수 있습니다.' },
      { q: 'pt는 왜 아직도 쓰나요?', a: '인쇄에서 온 단위라 인쇄 스타일시트나 메일 템플릿에 남아 있습니다. 화면에서는 16px = 12pt로 환산됩니다.' },
      { q: 'em과 rem은 뭐가 다른가요?', a: 'rem은 항상 루트 글자 크기를 기준으로 삼지만, em은 그 요소의 글자 크기를 기준으로 삼습니다. 그래서 em은 중첩될수록 값이 곱해집니다.' },
    ],
    [
      { q: 'How many pixels is 1 rem?', a: '16 px by default. If the reader has enlarged text in their browser settings, it grows with that — which is exactly why rem is worth using.' },
      { q: 'Should I write px or rem?', a: 'Prefer rem for text and spacing, so everything scales when a reader enlarges type. Keep px for hairlines like a 1 px border.' },
      { q: 'Why do people set font-size: 62.5% on html?', a: 'It makes the root 10 px so 1.6 rem reads as 16 px. The catch is that it also shrinks the page for anyone who deliberately raised their default font size.' },
      { q: 'Why is pt still around?', a: 'It comes from print and survives in print stylesheets and email templates. On screen it converts cleanly: 16 px is 12 pt.' },
      { q: 'What is the difference between em and rem?', a: 'rem always measures against the root font size; em measures against the element’s own font size, so nested ems multiply.' },
    ],
    [
      { q: '¿Cuántos píxeles es 1 rem?', a: '16 px por defecto. Si el lector ha ampliado el texto en su navegador, crece con él, y por eso conviene usar rem.' },
      { q: '¿Escribo px o rem?', a: 'Mejor rem para texto y espaciados, así todo escala cuando alguien agranda la letra. Deja px para líneas finas como un borde de 1 px.' },
      { q: '¿Por qué se pone font-size: 62.5% en html?', a: 'Deja la raíz en 10 px para que 1,6 rem se lea como 16 px. El problema es que también encoge la página para quien subió su tamaño de fuente por decisión propia.' },
      { q: '¿Por qué sigue usándose pt?', a: 'Viene de la imprenta y sobrevive en hojas de estilo para impresión y plantillas de correo. En pantalla la conversión es limpia: 16 px son 12 pt.' },
      { q: '¿Qué diferencia hay entre em y rem?', a: 'rem se mide siempre contra la fuente raíz; em se mide contra la fuente del propio elemento, así que los em anidados se multiplican.' },
    ],
    [
      { q: 'Quantos pixels tem 1 rem?', a: '16 px por padrão. Se o leitor aumentou o texto nas configurações do navegador, cresce junto — e é justamente por isso que rem vale a pena.' },
      { q: 'Devo escrever px ou rem?', a: 'Prefira rem para texto e espaçamentos, assim tudo acompanha quem aumenta a fonte. Deixe px para linhas finas, como uma borda de 1 px.' },
      { q: 'Por que colocam font-size: 62.5% no html?', a: 'Isso deixa a raiz em 10 px para que 1,6 rem seja 16 px. O problema é que também encolhe a página para quem aumentou a fonte padrão de propósito.' },
      { q: 'Por que pt ainda existe?', a: 'Vem da impressão e sobrevive em folhas de estilo de impressão e modelos de e-mail. Na tela a conversão é exata: 16 px são 12 pt.' },
      { q: 'Qual a diferença entre em e rem?', a: 'rem mede sempre contra a fonte raiz; em mede contra a fonte do próprio elemento, então ems aninhados se multiplicam.' },
    ],
    [
      { q: '1remは何pxですか？', a: '既定では16pxです。利用者がブラウザ設定で文字を大きくしていればその分大きくなります——それがremを使う理由です。' },
      { q: 'pxとremのどちらで書くべきですか？', a: '文字と余白はremが向きます。利用者が文字を大きくしたときに一緒に大きくなるからです。1pxの境界線のように細くしたい線はpxのままにします。' },
      { q: 'htmlにfont-size: 62.5%を指定するのはなぜですか？', a: 'ルートを10pxにして1.6rem = 16pxのように計算しやすくする方法です。ただし既定の文字サイズを自分で大きくしている利用者には、意図せず小さく表示されます。' },
      { q: 'ptは今でも使うのですか？', a: '印刷から来た単位で、印刷用スタイルシートやメールのテンプレートに残っています。画面では16px = 12ptに換算されます。' },
      { q: 'emとremの違いは？', a: 'remは常にルートの文字サイズを基準にしますが、emはその要素の文字サイズを基準にします。だからemは入れ子になるほど掛け合わされます。' },
    ],
    [
      { q: 'Wie viele Pixel sind 1 rem?', a: 'Standardmäßig 16 px. Hat jemand die Schrift im Browser vergrößert, wächst rem mit — genau deshalb lohnt sich die Einheit.' },
      { q: 'Lieber px oder rem schreiben?', a: 'Für Text und Abstände rem, dann skaliert alles mit der Leserschrift. Für Haarlinien wie einen 1-px-Rahmen bleibt px.' },
      { q: 'Warum setzt man font-size: 62.5% auf html?', a: 'Damit steht die Wurzel bei 10 px und 1,6 rem liest sich als 16 px. Der Haken: Wer seine Standardschrift bewusst vergrößert hat, bekommt die Seite kleiner.' },
      { q: 'Warum gibt es pt noch?', a: 'Die Einheit stammt aus dem Druck und hält sich in Druck-Stylesheets und E-Mail-Vorlagen. Am Bildschirm rechnet sie sauber: 16 px sind 12 pt.' },
      { q: 'Was unterscheidet em und rem?', a: 'rem misst immer an der Wurzelschriftgröße, em an der Schriftgröße des Elements selbst — verschachtelte em multiplizieren sich.' },
    ],
    [
      { q: 'Combien de pixels fait 1 rem ?', a: '16 px par défaut. Si le lecteur a agrandi le texte dans son navigateur, la valeur suit — et c’est précisément l’intérêt de rem.' },
      { q: 'Faut-il écrire px ou rem ?', a: 'Préférez rem pour le texte et les espacements : tout suit quand le lecteur agrandit la police. Gardez px pour les filets fins, comme une bordure de 1 px.' },
      { q: 'Pourquoi met-on font-size: 62.5% sur html ?', a: 'Cela met la racine à 10 px pour que 1,6 rem se lise 16 px. L’ennui, c’est que la page rétrécit pour qui a délibérément augmenté sa police par défaut.' },
      { q: 'Pourquoi le pt subsiste-t-il ?', a: 'Il vient de l’imprimerie et survit dans les feuilles de style d’impression et les gabarits d’e-mail. À l’écran, la conversion est nette : 16 px valent 12 pt.' },
      { q: 'Quelle différence entre em et rem ?', a: 'rem se mesure toujours à la police racine ; em se mesure à la police de l’élément, si bien que les em imbriqués se multiplient.' },
    ],
    [
      { q: '1 rem कितने px है?', a: 'डिफ़ॉल्ट रूप से 16 px। यदि पाठक ने ब्राउज़र में अक्षर बड़े कर रखे हैं तो यह भी बढ़ जाता है — rem इस्तेमाल करने का कारण यही है।' },
      { q: 'px लिखें या rem?', a: 'पाठ और स्पेसिंग के लिए rem बेहतर है, ताकि पाठक के अक्षर बढ़ाने पर सब साथ बढ़े। 1 px बॉर्डर जैसी पतली रेखाओं के लिए px रखिए।' },
      { q: 'html पर font-size: 62.5% क्यों देते हैं?', a: 'इससे रूट 10 px हो जाता है और 1.6 rem का अर्थ 16 px बनता है। दिक़्क़त यह है कि जिसने जान-बूझकर फ़ॉन्ट बड़ा किया है, उसके लिए पृष्ठ छोटा हो जाता है।' },
      { q: 'pt अब भी क्यों चलता है?', a: 'यह छपाई से आया है और प्रिंट स्टाइलशीट तथा ईमेल टेम्पलेट में बना हुआ है। स्क्रीन पर रूपांतरण साफ़ है: 16 px यानी 12 pt।' },
      { q: 'em और rem में क्या अंतर है?', a: 'rem हमेशा रूट फ़ॉन्ट साइज़ से नापता है, जबकि em उसी तत्व के फ़ॉन्ट साइज़ से — इसलिए नेस्टेड em गुणा होते जाते हैं।' },
    ],
    [
      { q: '1rem 是多少 px？', a: '默认是 16px。如果读者在浏览器里调大了字号，rem 会跟着变大——这正是使用 rem 的理由。' },
      { q: '该写 px 还是 rem？', a: '文字和间距用 rem 更好，读者放大字号时会一起变大；1px 边框这类要细的线保留 px。' },
      { q: '为什么有人给 html 设 font-size: 62.5%？', a: '这样根字号变成 10px，1.6rem 就是 16px，算起来方便。代价是：特意调大过默认字号的人，看到的页面反而变小了。' },
      { q: 'pt 为什么还在用？', a: '它来自印刷，留在打印样式表和邮件模板里。在屏幕上换算很干净：16px 就是 12pt。' },
      { q: 'em 和 rem 有什么区别？', a: 'rem 始终以根字号为基准，em 以元素自身的字号为基准，所以嵌套的 em 会层层相乘。' },
    ],
    [
      { q: '1rem 是多少 px？', a: '預設是 16px。如果讀者在瀏覽器裡調大了字級，rem 會跟著變大——這正是使用 rem 的理由。' },
      { q: '該寫 px 還是 rem？', a: '文字和間距用 rem 更好，讀者放大字級時會一起變大；1px 邊框這類要細的線保留 px。' },
      { q: '為什麼有人給 html 設 font-size: 62.5%？', a: '這樣根字級變成 10px，1.6rem 就是 16px，算起來方便。代價是：特意調大過預設字級的人，看到的頁面反而變小了。' },
      { q: 'pt 為什麼還在用？', a: '它來自印刷，留在列印樣式表和郵件範本裡。在螢幕上換算很乾淨：16px 就是 12pt。' },
      { q: 'em 和 rem 有什麼區別？', a: 'rem 始終以根字級為基準，em 以元素自身的字級為基準，所以巢狀的 em 會層層相乘。' },
    ],
  ),

  pxFaq: T<(f: PxFacts) => FaqItem[]>(
    f => [
      { q: `${f.px}px는 몇 rem인가요?`, a: `${f.rem}rem입니다. ${f.px} ÷ 16으로 나온 값입니다.` },
      { q: `${f.px}px는 몇 pt인가요?`, a: `${f.pt}pt입니다. 1pt가 1/72인치이고 1인치가 96px이라 0.75를 곱한 값입니다.` },
      { q: `실제 길이로는 얼마인가요?`, a: `${f.inch}인치, ${f.mm}mm입니다. 다만 화면에서 자로 재는 길이와는 다릅니다.` },
      { q: `백분율로는 얼마인가요?`, a: `루트 글자 크기의 ${f.percent}%입니다.` },
    ],
    f => [
      { q: `How many rem is ${f.px} px?`, a: `${f.rem} rem — that is ${f.px} divided by 16.` },
      { q: `How many points is ${f.px} px?`, a: `${f.pt} pt. A point is 1/72 inch and an inch is 96 px, so you multiply by 0.75.` },
      { q: `What length is that?`, a: `${f.inch} inches, or ${f.mm} mm — though a ruler on the screen will not agree.` },
      { q: `And as a percentage?`, a: `${f.percent}% of the root font size.` },
    ],
    f => [
      { q: `¿Cuántos rem son ${f.px} px?`, a: `${f.rem} rem, es decir ${f.px} entre 16.` },
      { q: `¿Cuántos puntos son ${f.px} px?`, a: `${f.pt} pt. Un punto es 1/72 de pulgada y una pulgada 96 px, así que se multiplica por 0,75.` },
      { q: `¿Qué longitud es esa?`, a: `${f.inch} pulgadas, o ${f.mm} mm, aunque una regla sobre la pantalla no coincidirá.` },
      { q: `¿Y en porcentaje?`, a: `El ${f.percent}% del tamaño de fuente raíz.` },
    ],
    f => [
      { q: `Quantos rem são ${f.px} px?`, a: `${f.rem} rem, ou seja ${f.px} dividido por 16.` },
      { q: `Quantos pontos são ${f.px} px?`, a: `${f.pt} pt. Um ponto é 1/72 de polegada e uma polegada 96 px, então multiplica-se por 0,75.` },
      { q: `Que comprimento é esse?`, a: `${f.inch} polegadas, ou ${f.mm} mm — embora uma régua na tela não concorde.` },
      { q: `E em porcentagem?`, a: `${f.percent}% do tamanho de fonte raiz.` },
    ],
    f => [
      { q: `${f.px}pxは何remですか？`, a: `${f.rem}remです。${f.px} ÷ 16で出た値です。` },
      { q: `${f.px}pxは何ptですか？`, a: `${f.pt}ptです。1ptが1/72インチ、1インチが96pxなので0.75を掛けた値です。` },
      { q: `実際の長さでは？`, a: `${f.inch}インチ、${f.mm}mmです。ただし画面に定規を当てた長さとは一致しません。` },
      { q: `パーセントでは？`, a: `ルート文字サイズの${f.percent}%です。` },
    ],
    f => [
      { q: `Wie viele rem sind ${f.px} px?`, a: `${f.rem} rem — also ${f.px} geteilt durch 16.` },
      { q: `Wie viele Punkt sind ${f.px} px?`, a: `${f.pt} pt. Ein Punkt ist 1/72 Zoll, ein Zoll 96 px, man multipliziert also mit 0,75.` },
      { q: `Welche Länge ist das?`, a: `${f.inch} Zoll beziehungsweise ${f.mm} mm — ein Lineal am Bildschirm sieht das allerdings anders.` },
      { q: `Und in Prozent?`, a: `${f.percent} % der Wurzelschriftgröße.` },
    ],
    f => [
      { q: `Combien de rem font ${f.px} px ?`, a: `${f.rem} rem, soit ${f.px} divisé par 16.` },
      { q: `Combien de points font ${f.px} px ?`, a: `${f.pt} pt. Un point vaut 1/72 de pouce et un pouce 96 px : on multiplie donc par 0,75.` },
      { q: `Quelle longueur cela fait-il ?`, a: `${f.inch} pouce, soit ${f.mm} mm — une règle posée sur l’écran ne sera pas d’accord.` },
      { q: `Et en pourcentage ?`, a: `${f.percent} % de la taille de police racine.` },
    ],
    f => [
      { q: `${f.px} px कितने rem हैं?`, a: `${f.rem} rem — यानी ${f.px} बटा 16।` },
      { q: `${f.px} px कितने pt हैं?`, a: `${f.pt} pt। एक पॉइंट 1/72 इंच और एक इंच 96 px होता है, इसलिए 0.75 से गुणा।` },
      { q: `यह वास्तविक लंबाई में कितना है?`, a: `${f.inch} इंच, यानी ${f.mm} मिमी — हालाँकि स्क्रीन पर रखा पैमाना इससे सहमत नहीं होगा।` },
      { q: `प्रतिशत में?`, a: `रूट फ़ॉन्ट साइज़ का ${f.percent}%।` },
    ],
    f => [
      { q: `${f.px}px 是多少 rem？`, a: `${f.rem}rem，也就是 ${f.px} 除以 16。` },
      { q: `${f.px}px 是多少 pt？`, a: `${f.pt}pt。1pt 是 1/72 英寸、1 英寸是 96px，所以乘以 0.75。` },
      { q: `换成实际长度呢？`, a: `${f.inch} 英寸，即 ${f.mm} 毫米——不过拿尺子量屏幕并不会一致。` },
      { q: `用百分比表示呢？`, a: `是根字号的 ${f.percent}%。` },
    ],
    f => [
      { q: `${f.px}px 是多少 rem？`, a: `${f.rem}rem，也就是 ${f.px} 除以 16。` },
      { q: `${f.px}px 是多少 pt？`, a: `${f.pt}pt。1pt 是 1/72 英寸、1 英寸是 96px，所以乘以 0.75。` },
      { q: `換成實際長度呢？`, a: `${f.inch} 英寸，即 ${f.mm} 毫米——不過拿尺量螢幕並不會一致。` },
      { q: `用百分比表示呢？`, a: `是根字級的 ${f.percent}%。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PX_UI: L<PxUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PxUI>;
