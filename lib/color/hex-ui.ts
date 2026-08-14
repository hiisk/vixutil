/**
 * hex 낱장의 화면 문구 — 열 언어.
 *
 * 표의 라벨(HEX·RGB·대비·보색·명도단계·색약)은 COLOR_UI에 이미 열 언어로 있다.
 * 그래서 여기 적는 것은 **hex 낱장에만 있는 말**뿐이다 — 세 자리 줄임 표기 설명,
 * 가장 가까운 이름 있는 색, 이웃 hex. 겹치는 문구를 다시 적으면 한쪽만 고쳐진다.
 *
 * 계열 이름(빨강·파랑…)도 COLOR_UI.familyLabel을 그대로 쓴다.
 */
import type { L, Lang } from '../i18n/lang.ts';
import type { ColorFacts } from './facts.ts';

export interface HexUI {
  /** 빵부스러기의 갈래 이름 */
  section: string;
  /** 세 자리 줄임 표기 설명 — `#1a2`는 `#11aa22`와 같다 */
  shorthand: (short: string, full: string) => string;
  nearestTitle: string;
  nearestLead: string;
  neighborsTitle: string;
  neighborsLead: string;
  /** "초록 계열" 같은 말을 제목에 넣는다 */
  metaTitle: (full: string, family: string) => string;
  metaDesc: (full: string, f: ColorFacts) => string;
  faq: (full: string, short: string, f: ColorFacts, nearest: string) => { q: string; a: string }[];
}

const ko: HexUI = {
  section: 'hex 색상 코드',
  shorthand: (s, full) => `#${s}는 ${full}의 세 자리 줄임 표기입니다. CSS에서 두 표기는 같은 색입니다.`,
  nearestTitle: '가장 가까운 이름 있는 색',
  nearestLead: '이 색과 눈으로 가장 비슷한 색들입니다. 이름으로 부르고 싶을 때 씁니다.',
  neighborsTitle: '한 칸 옆의 hex',
  neighborsLead: '빨강·초록·파랑을 각각 한 단계씩 올리고 내린 색입니다.',
  metaTitle: (full, family) => `${full} 색상 코드 — ${family}`,
  metaDesc: (full, f) =>
    `${full}은 RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%입니다. 흰 바탕 대비 ${f.onWhite}:1, 보색은 ${f.complement.toUpperCase()}이며 명도 단계와 색약 시뮬레이션도 함께 봅니다.`,
  faq: (full, short, f, nearest) => [
    { q: `#${short}와 ${full}은 같은 색인가요?`, a: `같은 색입니다. CSS는 세 자리 hex의 각 자리를 두 번씩 늘려 읽으므로 #${short}는 ${full}이 됩니다. 세 자리로 쓸 수 있는 색은 4,096가지뿐이고, 이 색이 그중 하나입니다.` },
    { q: `${full} 위에는 어떤 색 글자를 얹어야 하나요?`, a: `${f.textOn === 'white' ? '흰' : '검은'} 글자입니다. 흰색과의 대비가 ${f.onWhite}:1, 검은색과의 대비가 ${f.onBlack}:1이라 큰 쪽을 골라야 본문 크기 글자가 읽힙니다. WCAG 기준은 4.5:1입니다.` },
    { q: `${full}과 가장 비슷한 이름의 색은 무엇인가요?`, a: `${nearest}입니다. 다만 정확히 같은 색은 아니므로, 색이 중요한 곳에서는 이름 대신 hex 코드를 그대로 쓰는 편이 안전합니다.` },
  ],
};

const en: HexUI = {
  section: 'Hex color codes',
  shorthand: (s, full) => `#${s} is the three-digit shorthand for ${full}. In CSS the two notations mean the same color.`,
  nearestTitle: 'Closest named colors',
  nearestLead: 'The named colors that look most like this one — useful when you need a word for it.',
  neighborsTitle: 'One step away',
  neighborsLead: 'Red, green and blue each nudged one step up and down.',
  metaTitle: (full, family) => `${full} color code — ${family}`,
  metaDesc: (full, f) =>
    `${full} is RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%. Contrast on white is ${f.onWhite}:1, the complement is ${f.complement.toUpperCase()}, with shades and color-blindness simulation.`,
  faq: (full, short, f, nearest) => [
    { q: `Are #${short} and ${full} the same color?`, a: `Yes. CSS doubles each digit of a three-digit hex, so #${short} expands to ${full}. Only 4,096 colors can be written in three digits, and this is one of them.` },
    { q: `What text color works on ${full}?`, a: `${f.textOn === 'white' ? 'White' : 'Black'} text. Contrast against white is ${f.onWhite}:1 and against black ${f.onBlack}:1, so pick the larger one — WCAG asks for 4.5:1 at body size.` },
    { q: `Which named color is closest to ${full}?`, a: `${nearest}. It is not an exact match, so where color matters use the hex code itself rather than the name.` },
  ],
};

const es: HexUI = {
  section: 'Códigos de color hex',
  shorthand: (s, full) => `#${s} es la forma abreviada de tres dígitos de ${full}. En CSS ambas notaciones son el mismo color.`,
  nearestTitle: 'Colores con nombre más cercanos',
  nearestLead: 'Los colores con nombre que más se parecen a este, por si necesitas una palabra para él.',
  neighborsTitle: 'Un paso más allá',
  neighborsLead: 'Rojo, verde y azul subidos y bajados un paso cada uno.',
  metaTitle: (full, family) => `Código de color ${full} — ${family}`,
  metaDesc: (full, f) =>
    `${full} es RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%. El contraste sobre blanco es ${f.onWhite}:1, el complementario es ${f.complement.toUpperCase()}, con escala de luminosidad y simulación de daltonismo.`,
  faq: (full, short, f, nearest) => [
    { q: `¿#${short} y ${full} son el mismo color?`, a: `Sí. CSS duplica cada dígito de un hex de tres cifras, así que #${short} se expande a ${full}. Solo 4.096 colores se pueden escribir con tres dígitos y este es uno de ellos.` },
    { q: `¿Qué color de texto funciona sobre ${full}?`, a: `Texto ${f.textOn === 'white' ? 'blanco' : 'negro'}. El contraste con el blanco es ${f.onWhite}:1 y con el negro ${f.onBlack}:1, así que elige el mayor — WCAG pide 4,5:1 en tamaño de texto normal.` },
    { q: `¿Qué color con nombre se parece más a ${full}?`, a: `${nearest}. No es una coincidencia exacta, así que cuando el color importe usa el código hex en lugar del nombre.` },
  ],
};

const pt: HexUI = {
  section: 'Códigos de cor hex',
  shorthand: (s, full) => `#${s} é a forma abreviada de três dígitos de ${full}. No CSS as duas notações são a mesma cor.`,
  nearestTitle: 'Cores nomeadas mais próximas',
  nearestLead: 'As cores com nome mais parecidas com esta — úteis quando você precisa de uma palavra para ela.',
  neighborsTitle: 'Um passo ao lado',
  neighborsLead: 'Vermelho, verde e azul aumentados e diminuídos em um passo cada.',
  metaTitle: (full, family) => `Código de cor ${full} — ${family}`,
  metaDesc: (full, f) =>
    `${full} é RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%. O contraste sobre branco é ${f.onWhite}:1, a complementar é ${f.complement.toUpperCase()}, com escala de luminosidade e simulação de daltonismo.`,
  faq: (full, short, f, nearest) => [
    { q: `#${short} e ${full} são a mesma cor?`, a: `Sim. O CSS duplica cada dígito de um hex de três casas, então #${short} vira ${full}. Só 4.096 cores podem ser escritas com três dígitos, e esta é uma delas.` },
    { q: `Que cor de texto funciona sobre ${full}?`, a: `Texto ${f.textOn === 'white' ? 'branco' : 'preto'}. O contraste com o branco é ${f.onWhite}:1 e com o preto ${f.onBlack}:1, então escolha o maior — a WCAG pede 4,5:1 no tamanho de corpo.` },
    { q: `Qual cor nomeada é a mais próxima de ${full}?`, a: `${nearest}. Não é idêntica, então quando a cor importa use o código hex em vez do nome.` },
  ],
};

const ja: HexUI = {
  section: 'HEXカラーコード',
  shorthand: (s, full) => `#${s} は ${full} の3桁省略表記です。CSSでは同じ色を指します。`,
  nearestTitle: '最も近い名前つきの色',
  nearestLead: 'この色に見た目が最も近い色です。言葉で呼びたいときに使います。',
  neighborsTitle: '一段隣のHEX',
  neighborsLead: '赤・緑・青をそれぞれ一段ずつ上げ下げした色です。',
  metaTitle: (full, family) => `${full} カラーコード — ${family}`,
  metaDesc: (full, f) =>
    `${full} は RGB ${f.rgb.r}・${f.rgb.g}・${f.rgb.b}、HSL ${f.hsl.h}°・${f.hsl.s}%・${f.hsl.l}%、CMYK ${f.cmyk.c}・${f.cmyk.m}・${f.cmyk.y}・${f.cmyk.k}% です。白背景とのコントラストは ${f.onWhite}:1、補色は ${f.complement.toUpperCase()}。明度段階と色覚シミュレーションも見られます。`,
  faq: (full, short, f, nearest) => [
    { q: `#${short} と ${full} は同じ色ですか？`, a: `同じ色です。CSSは3桁HEXの各桁を2回ずつ繰り返して読むため、#${short} は ${full} になります。3桁で書ける色は4,096色だけで、この色はその一つです。` },
    { q: `${full} の上には何色の文字を置きますか？`, a: `${f.textOn === 'white' ? '白' : '黒'}の文字です。白とのコントラストは ${f.onWhite}:1、黒とは ${f.onBlack}:1 なので大きい方を選びます。WCAGの基準は本文サイズで4.5:1です。` },
    { q: `${full} に最も近い名前の色は？`, a: `${nearest} です。完全に同じ色ではないので、色が重要な場面では名前ではなくHEXコードをそのまま使うのが安全です。` },
  ],
};

const de: HexUI = {
  section: 'Hex-Farbcodes',
  shorthand: (s, full) => `#${s} ist die dreistellige Kurzform von ${full}. In CSS meinen beide Schreibweisen dieselbe Farbe.`,
  nearestTitle: 'Nächste benannte Farben',
  nearestLead: 'Die benannten Farben, die dieser am ähnlichsten sehen — nützlich, wenn du ein Wort dafür brauchst.',
  neighborsTitle: 'Einen Schritt daneben',
  neighborsLead: 'Rot, Grün und Blau jeweils einen Schritt hoch und runter.',
  metaTitle: (full, family) => `Farbcode ${full} — ${family}`,
  metaDesc: (full, f) =>
    `${full} ist RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%. Der Kontrast auf Weiß beträgt ${f.onWhite}:1, die Komplementärfarbe ist ${f.complement.toUpperCase()} — dazu Helligkeitsstufen und Farbsehschwäche-Simulation.`,
  faq: (full, short, f, nearest) => [
    { q: `Sind #${short} und ${full} dieselbe Farbe?`, a: `Ja. CSS verdoppelt jede Stelle eines dreistelligen Hex, also wird #${short} zu ${full}. Nur 4.096 Farben lassen sich dreistellig schreiben, und dies ist eine davon.` },
    { q: `Welche Textfarbe passt auf ${full}?`, a: `${f.textOn === 'white' ? 'Weiße' : 'Schwarze'} Schrift. Der Kontrast zu Weiß ist ${f.onWhite}:1, zu Schwarz ${f.onBlack}:1 — nimm den größeren. WCAG verlangt 4,5:1 bei Fließtext.` },
    { q: `Welche benannte Farbe liegt ${full} am nächsten?`, a: `${nearest}. Es ist keine exakte Übereinstimmung; wo Farbe zählt, nimm lieber den Hex-Code als den Namen.` },
  ],
};

const fr: HexUI = {
  section: 'Codes couleur hex',
  shorthand: (s, full) => `#${s} est l’écriture abrégée à trois chiffres de ${full}. En CSS les deux notations désignent la même couleur.`,
  nearestTitle: 'Couleurs nommées les plus proches',
  nearestLead: 'Les couleurs nommées qui ressemblent le plus à celle-ci — pratique quand il faut un mot pour la dire.',
  neighborsTitle: 'À un cran',
  neighborsLead: 'Rouge, vert et bleu montés et descendus d’un cran chacun.',
  metaTitle: (full, family) => `Code couleur ${full} — ${family}`,
  metaDesc: (full, f) =>
    `${full} vaut RVB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, TSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMJN ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%. Le contraste sur blanc est de ${f.onWhite}:1, la complémentaire est ${f.complement.toUpperCase()}, avec les paliers de luminosité et la simulation du daltonisme.`,
  faq: (full, short, f, nearest) => [
    { q: `#${short} et ${full} sont-elles la même couleur ?`, a: `Oui. CSS double chaque chiffre d’un hex à trois positions, donc #${short} devient ${full}. Seules 4 096 couleurs s’écrivent en trois chiffres, et celle-ci en fait partie.` },
    { q: `Quelle couleur de texte sur ${full} ?`, a: `Du texte ${f.textOn === 'white' ? 'blanc' : 'noir'}. Le contraste avec le blanc est de ${f.onWhite}:1 et avec le noir de ${f.onBlack}:1 : prenez le plus grand. WCAG demande 4,5:1 en taille de texte courant.` },
    { q: `Quelle couleur nommée est la plus proche de ${full} ?`, a: `${nearest}. Ce n’est pas une correspondance exacte : quand la couleur compte, utilisez le code hex plutôt que le nom.` },
  ],
};

const hi: HexUI = {
  section: 'हेक्स रंग कोड',
  shorthand: (s, full) => `#${s}, ${full} का तीन अंकों वाला संक्षिप्त रूप है। CSS में दोनों एक ही रंग हैं।`,
  nearestTitle: 'सबसे नज़दीकी नामित रंग',
  nearestLead: 'वे नामित रंग जो इससे सबसे मिलते-जुलते हैं — जब इसे नाम से कहना हो तब काम आते हैं।',
  neighborsTitle: 'एक कदम आगे-पीछे',
  neighborsLead: 'लाल, हरा और नीला — हर एक को एक कदम ऊपर और नीचे किया गया।',
  metaTitle: (full, family) => `${full} रंग कोड — ${family}`,
  metaDesc: (full, f) =>
    `${full} का RGB ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}, HSL ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%, CMYK ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}% है। सफ़ेद पृष्ठभूमि पर कंट्रास्ट ${f.onWhite}:1, पूरक रंग ${f.complement.toUpperCase()} — साथ में शेड्स और वर्णांधता सिमुलेशन।`,
  faq: (full, short, f, nearest) => [
    { q: `क्या #${short} और ${full} एक ही रंग हैं?`, a: `हाँ। CSS तीन अंकों वाले हेक्स के हर अंक को दोहरा देता है, इसलिए #${short} फैलकर ${full} बन जाता है। तीन अंकों में केवल 4,096 रंग लिखे जा सकते हैं और यह उन्हीं में से एक है।` },
    { q: `${full} पर किस रंग का टेक्स्ट रखें?`, a: `${f.textOn === 'white' ? 'सफ़ेद' : 'काला'} टेक्स्ट। सफ़ेद से कंट्रास्ट ${f.onWhite}:1 और काले से ${f.onBlack}:1 है, इसलिए बड़ा वाला चुनें — WCAG सामान्य आकार के लिए 4.5:1 माँगता है।` },
    { q: `${full} के सबसे नज़दीक कौन-सा नामित रंग है?`, a: `${nearest}। यह बिलकुल एक जैसा नहीं है, इसलिए जहाँ रंग मायने रखता है वहाँ नाम की जगह हेक्स कोड ही इस्तेमाल करें।` },
  ],
};

const zh: HexUI = {
  section: 'HEX 颜色代码',
  shorthand: (s, full) => `#${s} 是 ${full} 的三位简写。在 CSS 中两种写法是同一个颜色。`,
  nearestTitle: '最接近的有名颜色',
  nearestLead: '看起来与它最像的有名颜色，需要用词称呼时用得上。',
  neighborsTitle: '相邻一档的 HEX',
  neighborsLead: '把红、绿、蓝各上调和下调一档得到的颜色。',
  metaTitle: (full, family) => `${full} 颜色代码 — ${family}`,
  metaDesc: (full, f) =>
    `${full} 的 RGB 为 ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}，HSL 为 ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%，CMYK 为 ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%。白底对比度 ${f.onWhite}:1，补色为 ${f.complement.toUpperCase()}，另有明度阶梯与色觉障碍模拟。`,
  faq: (full, short, f, nearest) => [
    { q: `#${short} 和 ${full} 是同一个颜色吗？`, a: `是的。CSS 会把三位 HEX 的每一位重复两次，所以 #${short} 展开就是 ${full}。能用三位写出的颜色只有 4,096 种，这是其中之一。` },
    { q: `${full} 上面该配什么颜色的文字？`, a: `配${f.textOn === 'white' ? '白' : '黑'}色文字。与白色的对比度为 ${f.onWhite}:1，与黑色为 ${f.onBlack}:1，取大的一边。WCAG 对正文字号要求 4.5:1。` },
    { q: `与 ${full} 最接近的有名颜色是哪一个？`, a: `${nearest}。但并不完全相同，颜色重要的场合请直接使用 HEX 代码而不是名称。` },
  ],
};

const tw: HexUI = {
  section: 'HEX 顏色代碼',
  shorthand: (s, full) => `#${s} 是 ${full} 的三位簡寫。在 CSS 中兩種寫法是同一個顏色。`,
  nearestTitle: '最接近的有名顏色',
  nearestLead: '看起來與它最像的有名顏色，需要用詞稱呼時用得上。',
  neighborsTitle: '相鄰一階的 HEX',
  neighborsLead: '把紅、綠、藍各上調與下調一階得到的顏色。',
  metaTitle: (full, family) => `${full} 顏色代碼 — ${family}`,
  metaDesc: (full, f) =>
    `${full} 的 RGB 為 ${f.rgb.r}·${f.rgb.g}·${f.rgb.b}，HSL 為 ${f.hsl.h}°·${f.hsl.s}%·${f.hsl.l}%，CMYK 為 ${f.cmyk.c}·${f.cmyk.m}·${f.cmyk.y}·${f.cmyk.k}%。白底對比度 ${f.onWhite}:1，補色為 ${f.complement.toUpperCase()}，另有明度階梯與色覺障礙模擬。`,
  faq: (full, short, f, nearest) => [
    { q: `#${short} 和 ${full} 是同一個顏色嗎？`, a: `是的。CSS 會把三位 HEX 的每一位重複兩次，所以 #${short} 展開就是 ${full}。能用三位寫出的顏色只有 4,096 種，這是其中之一。` },
    { q: `${full} 上面該配什麼顏色的文字？`, a: `配${f.textOn === 'white' ? '白' : '黑'}色文字。與白色的對比度為 ${f.onWhite}:1，與黑色為 ${f.onBlack}:1，取大的一邊。WCAG 對內文字級要求 4.5:1。` },
    { q: `與 ${full} 最接近的有名顏色是哪一個？`, a: `${nearest}。但並不完全相同，顏色重要的場合請直接使用 HEX 代碼而不是名稱。` },
  ],
};

export const HEX_UI: L<HexUI> = { ko, en, es, pt, ja, de, fr, hi, zh, tw };

export const hexUi = (lang: Lang): HexUI => HEX_UI[lang];
