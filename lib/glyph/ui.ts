/**
 * 특수문자 화면의 문구 — 열 언어.
 *
 * 글자마다 이름을 열 언어로 붙이지 않는다. ★의 이름은 ★이고, 이 화면에
 * 오는 사람은 이름이 아니라 글자를 복사하러 온다. 그래서 제목은 글자 자체이고,
 * 옮기는 것은 갈래 이름과 설명뿐이다 — 168 × 8이 아니라 16 × 8로 끝난다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { GlyphKind } from './list.ts';
import type { GlyphFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface GlyphUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<GlyphKind, string>;
  kindNote: Record<GlyphKind, string>;
  copyLabel: string;
  copiedLabel: string;
  unicodeLabel: string;
  entityLabel: string;
  namedEntityLabel: string;
  cssLabel: string;
  jsLabel: string;
  urlLabel: string;
  bytesLabel: string;
  bytesValue: (n: number) => string;
  kindTitle: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (char: string) => string;
  metaDesc: (f: GlyphFacts, kind: string) => string;
  hubFaq: FaqItem[];
  glyphFaq: (f: GlyphFacts, kind: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof GlyphUI]: L<GlyphUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('특수문자', 'Special characters', 'Caracteres especiales', 'Caracteres especiais', '特殊文字', 'Sonderzeichen', 'Caractères spéciaux', 'विशेष वर्ण', '特殊符号', '特殊符號'),

  hubTitle: T(
    '특수문자 168개 복사',
    'Copy any of 168 special characters',
    'Copia cualquiera de 168 caracteres especiales',
    'Copie qualquer um dos 168 caracteres especiais',
    '特殊文字168個をコピー',
    '168 Sonderzeichen zum Kopieren',
    'Copier 168 caractères spéciaux',
    '168 विशेष वर्ण कॉपी करें',
    '168 个特殊符号，点了就复制',
    '168 個特殊符號，點了就複製',
  ),

  hubLead: T(
    '화살표·수학 기호·화폐·별·체크 표시를 눌러서 바로 복사하세요. 유니코드 번호와 HTML 엔티티, CSS 이스케이프도 함께 보여 줍니다.',
    'Tap to copy arrows, maths symbols, currency signs, stars and check marks — with the Unicode code point, HTML entity and CSS escape for each.',
    'Toca para copiar flechas, símbolos matemáticos, monedas, estrellas y marcas de verificación, con su código Unicode, entidad HTML y escape CSS.',
    'Toque para copiar setas, símbolos matemáticos, moedas, estrelas e marcas de verificação, com o código Unicode, a entidade HTML e o escape CSS.',
    '矢印・数学記号・通貨・星・チェックを押すだけでコピーできます。Unicode番号やHTMLエンティティ、CSSエスケープも一緒に表示します。',
    'Pfeile, Mathezeichen, Währungssymbole, Sterne und Häkchen antippen und kopieren — samt Unicode-Codepunkt, HTML-Entity und CSS-Escape.',
    "Touchez pour copier flèches, symboles mathématiques, devises, étoiles et coches, avec le point de code Unicode, l'entité HTML et l'échappement CSS.",
    'तीर, गणितीय चिह्न, मुद्रा, तारे और चेक मार्क छूकर कॉपी करें — साथ में यूनिकोड कोड पॉइंट, HTML एंटिटी और CSS एस्केप।',
    '箭头、数学符号、货币、星星、勾号，点一下直接复制。每个还配了 Unicode 码位、HTML 实体和 CSS 转义。',
    '箭頭、數學符號、貨幣、星星、勾號，點一下直接複製。每個還配了 Unicode 碼位、HTML 實體和 CSS 跳脫。',
  ),

  kindLabel: T(
    { arrow: '화살표', math: '수학 기호', currency: '화폐', punct: '문장부호', shape: '도형', star: '별·하트', check: '체크·경고', bracket: '괄호', greek: '그리스 문자', number: '숫자·분수', music: '음악', weather: '날씨', zodiac: '별자리', game: '카드·주사위', key: '자판', misc: '기타' },
    { arrow: 'Arrows', math: 'Maths', currency: 'Currency', punct: 'Punctuation', shape: 'Shapes', star: 'Stars and hearts', check: 'Checks and warnings', bracket: 'Brackets', greek: 'Greek letters', number: 'Numbers and fractions', music: 'Music', weather: 'Weather', zodiac: 'Zodiac', game: 'Cards and dice', key: 'Keyboard', misc: 'Other' },
    { arrow: 'Flechas', math: 'Matemáticas', currency: 'Monedas', punct: 'Puntuación', shape: 'Formas', star: 'Estrellas y corazones', check: 'Marcas y avisos', bracket: 'Corchetes', greek: 'Letras griegas', number: 'Números y fracciones', music: 'Música', weather: 'Tiempo', zodiac: 'Zodiaco', game: 'Cartas y dados', key: 'Teclado', misc: 'Otros' },
    { arrow: 'Setas', math: 'Matemática', currency: 'Moedas', punct: 'Pontuação', shape: 'Formas', star: 'Estrelas e corações', check: 'Marcas e avisos', bracket: 'Colchetes', greek: 'Letras gregas', number: 'Números e frações', music: 'Música', weather: 'Tempo', zodiac: 'Zodíaco', game: 'Cartas e dados', key: 'Teclado', misc: 'Outros' },
    { arrow: '矢印', math: '数学記号', currency: '通貨', punct: '約物', shape: '図形', star: '星とハート', check: 'チェックと警告', bracket: '括弧', greek: 'ギリシャ文字', number: '数字と分数', music: '音楽', weather: '天気', zodiac: '星座', game: 'カードとサイコロ', key: 'キーボード', misc: 'その他' },
    { arrow: 'Pfeile', math: 'Mathematik', currency: 'Währungen', punct: 'Satzzeichen', shape: 'Formen', star: 'Sterne und Herzen', check: 'Haken und Warnungen', bracket: 'Klammern', greek: 'Griechische Buchstaben', number: 'Zahlen und Brüche', music: 'Musik', weather: 'Wetter', zodiac: 'Sternzeichen', game: 'Karten und Würfel', key: 'Tastatur', misc: 'Sonstiges' },
    { arrow: 'Flèches', math: 'Mathématiques', currency: 'Devises', punct: 'Ponctuation', shape: 'Formes', star: 'Étoiles et cœurs', check: 'Coches et avertissements', bracket: 'Crochets', greek: 'Lettres grecques', number: 'Nombres et fractions', music: 'Musique', weather: 'Météo', zodiac: 'Zodiaque', game: 'Cartes et dés', key: 'Clavier', misc: 'Divers' },
    { arrow: 'तीर', math: 'गणित', currency: 'मुद्रा', punct: 'विराम चिह्न', shape: 'आकृतियाँ', star: 'तारे और दिल', check: 'चेक और चेतावनी', bracket: 'कोष्ठक', greek: 'ग्रीक अक्षर', number: 'संख्याएँ और भिन्न', music: 'संगीत', weather: 'मौसम', zodiac: 'राशि', game: 'ताश और पासे', key: 'कीबोर्ड', misc: 'अन्य' },
    { arrow: '箭头', math: '数学符号', currency: '货币', punct: '标点', shape: '图形', star: '星星与心形', check: '勾号与警告', bracket: '括号', greek: '希腊字母', number: '数字与分数', music: '音乐', weather: '天气', zodiac: '星座', game: '扑克与骰子', key: '键盘', misc: '其他' },
    { arrow: '箭頭', math: '數學符號', currency: '貨幣', punct: '標點', shape: '圖形', star: '星星與心形', check: '勾號與警告', bracket: '括號', greek: '希臘字母', number: '數字與分數', music: '音樂', weather: '天氣', zodiac: '星座', game: '撲克與骰子', key: '鍵盤', misc: '其他' },
  ),

  kindNote: T(
    {
      arrow: '방향을 가리킬 때 씁니다. 표나 안내문에서 글자보다 짧게 뜻이 통합니다.',
      math: '수식에 쓰는 기호입니다. 자판에 없어 복사해 쓰는 일이 많습니다.',
      currency: '나라마다 다른 화폐 기호입니다. 숫자 앞뒤 어느 쪽에 붙는지도 나라마다 다릅니다.',
      punct: '말줄임표나 가운뎃점처럼, 자판에 없지만 문서에서 자주 쓰는 부호입니다.',
      shape: '네모·세모·동그라미입니다. 목록 앞에 붙이거나 표에서 상태를 나타낼 때 씁니다.',
      star: '별과 하트, 꽃입니다. 평점이나 강조에 자주 쓰입니다.',
      check: '체크와 가위표, 경고 표시입니다. 표에서 되고 안 되고를 나타낼 때 쓰입니다.',
      bracket: '한중일 문서에서 쓰는 홑낫표와 겹낫표, 대괄호입니다.',
      greek: '수식과 학술 표기에 쓰는 그리스 문자입니다.',
      number: '동그라미 숫자와 분수, 위 첨자입니다.',
      music: '음표와 올림·내림표입니다.',
      weather: '해·구름·눈처럼 날씨를 나타내는 흑백 기호입니다. 컬러 이모지와는 다른 글자입니다.',
      zodiac: '열두 별자리를 나타내는 기호입니다.',
      game: '카드 무늬와 체스 말, 주사위 눈입니다.',
      key: '맥 자판의 커맨드·옵션처럼 단축키를 적을 때 쓰는 기호입니다.',
      misc: '저작권 표시나 온도처럼 어느 갈래에도 넣기 어려운 기호입니다.',
    },
    {
      arrow: 'For pointing a direction — shorter than a word and understood at a glance in tables and signs.',
      math: 'Symbols for formulas. Most are not on the keyboard, so people copy them.',
      currency: 'Currency signs differ by country, and so does whether the sign goes before or after the number.',
      punct: 'Marks like the ellipsis and the middle dot: absent from the keyboard, common in documents.',
      shape: 'Squares, triangles and circles — used as list markers or to show status in a table.',
      star: 'Stars, hearts and flowers. Common in ratings and for emphasis.',
      check: 'Ticks, crosses and warning signs — the usual way a table says yes or no.',
      bracket: 'Corner and lenticular brackets used in Chinese, Japanese and Korean writing.',
      greek: 'Greek letters as used in formulas and academic notation.',
      number: 'Circled numbers, fractions and superscripts.',
      music: 'Notes, sharps and flats.',
      weather: 'Black-and-white weather symbols — sun, cloud, snow. These are separate characters from the colour emoji.',
      zodiac: 'The signs of the twelve zodiac constellations.',
      game: 'Card suits, chess pieces and dice faces.',
      key: 'Keyboard symbols such as Command and Option, used when writing shortcuts.',
      misc: 'Signs that fit nowhere else, like copyright and temperature marks.',
    },
    {
      arrow: 'Para señalar una dirección: más cortas que una palabra y se entienden al vuelo en tablas y carteles.',
      math: 'Símbolos para fórmulas. Casi ninguno está en el teclado, así que se copian.',
      currency: 'Los símbolos de moneda cambian según el país, igual que si van antes o después del número.',
      punct: 'Signos como los puntos suspensivos o el punto medio: no están en el teclado y aparecen mucho en documentos.',
      shape: 'Cuadrados, triángulos y círculos: sirven de viñeta o para marcar estados en una tabla.',
      star: 'Estrellas, corazones y flores. Habituales en valoraciones y para destacar.',
      check: 'Marcas de verificación, aspas y avisos: la forma normal de decir sí o no en una tabla.',
      bracket: 'Corchetes angulares y lenticulares usados en la escritura china, japonesa y coreana.',
      greek: 'Letras griegas tal como se usan en fórmulas y notación académica.',
      number: 'Números en círculo, fracciones y superíndices.',
      music: 'Notas, sostenidos y bemoles.',
      weather: 'Símbolos meteorológicos en blanco y negro: sol, nube, nieve. Son caracteres distintos de los emojis de color.',
      zodiac: 'Los signos de las doce constelaciones zodiacales.',
      game: 'Palos de la baraja, piezas de ajedrez y caras de dado.',
      key: 'Símbolos de teclado como Command y Option, para escribir atajos.',
      misc: 'Signos que no encajan en otro sitio, como el de copyright o los de temperatura.',
    },
    {
      arrow: 'Para apontar uma direção: mais curtas que uma palavra e entendidas de imediato em tabelas e avisos.',
      math: 'Símbolos para fórmulas. Quase nenhum está no teclado, então são copiados.',
      currency: 'Os símbolos de moeda mudam conforme o país, assim como virem antes ou depois do número.',
      punct: 'Sinais como reticências e ponto médio: fora do teclado, frequentes em documentos.',
      shape: 'Quadrados, triângulos e círculos — servem de marcador de lista ou de status em tabelas.',
      star: 'Estrelas, corações e flores. Comuns em avaliações e para destacar.',
      check: 'Marcas de certo, errado e aviso — o jeito habitual de uma tabela dizer sim ou não.',
      bracket: 'Colchetes angulares e lenticulares usados na escrita chinesa, japonesa e coreana.',
      greek: 'Letras gregas como usadas em fórmulas e notação acadêmica.',
      number: 'Números em círculo, frações e sobrescritos.',
      music: 'Notas, sustenidos e bemóis.',
      weather: 'Símbolos de tempo em preto e branco — sol, nuvem, neve. São caracteres distintos dos emojis coloridos.',
      zodiac: 'Os signos das doze constelações do zodíaco.',
      game: 'Naipes de baralho, peças de xadrez e faces de dado.',
      key: 'Símbolos de teclado como Command e Option, usados ao escrever atalhos.',
      misc: 'Sinais que não cabem em outro lugar, como copyright e marcas de temperatura.',
    },
    {
      arrow: '方向を示すときに使います。表や案内では語より短く、ひと目で伝わります。',
      math: '数式に使う記号です。キーボードにないものが多く、コピーして使われます。',
      currency: '通貨記号は国ごとに違い、数字の前に付くか後に付くかも国によって変わります。',
      punct: '三点リーダーや中黒のように、キーボードにはないのに文書ではよく使う記号です。',
      shape: '四角・三角・丸です。箇条書きの印や、表で状態を示すときに使います。',
      star: '星とハート、花です。評価や強調によく使われます。',
      check: 'チェックとバツ、警告の記号です。表で可否を示すときの定番です。',
      bracket: '中国語・日本語・韓国語の文書で使うかぎ括弧や隅付き括弧です。',
      greek: '数式や学術表記で使うギリシャ文字です。',
      number: '丸囲み数字、分数、上付き文字です。',
      music: '音符とシャープ・フラットです。',
      weather: '太陽・雲・雪など白黒の天気記号です。カラー絵文字とは別の文字です。',
      zodiac: '十二星座を表す記号です。',
      game: 'トランプのマーク、チェスの駒、サイコロの目です。',
      key: 'Macのコマンドやオプションのように、ショートカットを書くときに使う記号です。',
      misc: '著作権表示や温度のように、どの分類にも入れにくい記号です。',
    },
    {
      arrow: 'Um eine Richtung zu zeigen — kürzer als ein Wort und in Tabellen und Schildern sofort verständlich.',
      math: 'Zeichen für Formeln. Die wenigsten liegen auf der Tastatur, also kopiert man sie.',
      currency: 'Währungszeichen unterscheiden sich je nach Land, ebenso ob sie vor oder hinter der Zahl stehen.',
      punct: 'Zeichen wie Auslassungspunkte und Mittelpunkt: nicht auf der Tastatur, in Dokumenten aber häufig.',
      shape: 'Quadrate, Dreiecke und Kreise — als Aufzählungszeichen oder als Statusanzeige in Tabellen.',
      star: 'Sterne, Herzen und Blüten. Üblich bei Bewertungen und zur Hervorhebung.',
      check: 'Haken, Kreuze und Warnzeichen — so sagt eine Tabelle ja oder nein.',
      bracket: 'Ecken- und Linsenklammern aus der chinesischen, japanischen und koreanischen Schrift.',
      greek: 'Griechische Buchstaben, wie sie in Formeln und akademischer Notation vorkommen.',
      number: 'Eingekreiste Zahlen, Brüche und Hochzahlen.',
      music: 'Noten, Kreuz und B.',
      weather: 'Schwarzweiße Wetterzeichen — Sonne, Wolke, Schnee. Sie sind eigene Zeichen, nicht die farbigen Emoji.',
      zodiac: 'Die Zeichen der zwölf Tierkreisbilder.',
      game: 'Kartenfarben, Schachfiguren und Würfelaugen.',
      key: 'Tastaturzeichen wie Command und Option, zum Aufschreiben von Kurzbefehlen.',
      misc: 'Zeichen, die sonst nirgends passen, etwa Copyright und Temperaturangaben.',
    },
    {
      arrow: "Pour indiquer une direction : plus court qu'un mot et compris d'un coup d'œil dans un tableau ou un panneau.",
      math: "Symboles de formules. Presque aucun n'est sur le clavier, on les copie donc.",
      currency: "Les symboles monétaires varient selon le pays, tout comme leur place avant ou après le nombre.",
      punct: "Des signes comme les points de suspension ou le point médian : absents du clavier, fréquents dans les documents.",
      shape: 'Carrés, triangles et cercles — comme puces de liste ou pour marquer un état dans un tableau.',
      star: 'Étoiles, cœurs et fleurs. Courants pour les notes et la mise en valeur.',
      check: "Coches, croix et panneaux d'avertissement — la façon habituelle de dire oui ou non dans un tableau.",
      bracket: "Crochets d'angle et lenticulaires utilisés dans les écritures chinoise, japonaise et coréenne.",
      greek: 'Lettres grecques telles quelles servent dans les formules et la notation académique.',
      number: 'Chiffres entourés, fractions et exposants.',
      music: 'Notes, dièses et bémols.',
      weather: 'Symboles météo en noir et blanc — soleil, nuage, neige. Ce sont des caractères distincts des émojis en couleur.',
      zodiac: 'Les signes des douze constellations du zodiaque.',
      game: 'Couleurs de cartes, pièces d’échecs et faces de dé.',
      key: 'Symboles de clavier comme Command et Option, pour écrire des raccourcis.',
      misc: "Des signes qui ne rentrent nulle part ailleurs, comme le copyright ou les degrés.",
    },
    {
      arrow: 'दिशा दिखाने के लिए — शब्द से छोटे और तालिकाओं व सूचनाओं में एक नज़र में समझ आने वाले।',
      math: 'सूत्रों के चिह्न। ज़्यादातर कीबोर्ड पर नहीं होते, इसलिए कॉपी किए जाते हैं।',
      currency: 'मुद्रा चिह्न देश के अनुसार बदलते हैं, और यह भी कि वे संख्या से पहले आते हैं या बाद में।',
      punct: 'इलिप्सिस और मध्य बिंदु जैसे चिह्न: कीबोर्ड पर नहीं, पर दस्तावेज़ों में आम।',
      shape: 'वर्ग, त्रिभुज और वृत्त — सूची के निशान या तालिका में स्थिति दिखाने के लिए।',
      star: 'तारे, दिल और फूल। रेटिंग और ज़ोर देने में आम।',
      check: 'सही, ग़लत और चेतावनी के निशान — तालिका में हाँ या ना कहने का सामान्य तरीक़ा।',
      bracket: 'चीनी, जापानी और कोरियाई लेखन में इस्तेमाल होने वाले कोने और लेंटिकुलर कोष्ठक।',
      greek: 'सूत्रों और शैक्षणिक संकेतन में इस्तेमाल होने वाले ग्रीक अक्षर।',
      number: 'गोले में संख्याएँ, भिन्न और ऊपरी अंक।',
      music: 'स्वर, तीव्र और कोमल चिह्न।',
      weather: 'श्वेत-श्याम मौसम चिह्न — सूरज, बादल, बर्फ़। ये रंगीन इमोजी से अलग वर्ण हैं।',
      zodiac: 'बारह राशियों के चिह्न।',
      game: 'ताश के रंग, शतरंज के मोहरे और पासे के फलक।',
      key: 'Command और Option जैसे कीबोर्ड चिह्न, शॉर्टकट लिखने के लिए।',
      misc: 'वे चिह्न जो कहीं और नहीं बैठते, जैसे कॉपीराइट और तापमान के निशान।',
    },
    {
      arrow: '用来指方向。在表格和提示里，比写字更短也更清楚。',
      math: '写算式用的符号。键盘上没有，多半靠复制。',
      currency: '各国不同的货币符号。放在数字前面还是后面，也各国不同。',
      punct: '省略号、间隔号这类键盘上没有、文档里却常用的符号。',
      shape: '方块、三角、圆圈。用在列表前面，或者在表格里表示状态。',
      star: '星星、心形和花。常用来打分或强调。',
      check: '勾号、叉号和警告标志。表格里表示行不行，就靠它们。',
      bracket: '中日韩文档里用的单直角引号、双直角引号和方括号。',
      greek: '算式和学术记法里用的希腊字母。',
      number: '带圈数字、分数和上标。',
      music: '各种音符，以及升号、降号、还原号。',
      weather: '太阳、云、雪这类表示天气的黑白符号。它们和彩色表情符号不是同一个字。',
      zodiac: '表示十二星座的符号。',
      game: '扑克花色、国际象棋棋子和骰子点数。',
      key: 'Mac 键盘上 Command、Option 这类写快捷键时用的符号。',
      misc: '版权标记、温度这些放不进其他分类的符号。',
    },
    {
      arrow: '用來指方向。在表格和提示裡，比寫字更短也更清楚。',
      math: '寫算式用的符號。鍵盤上沒有，多半靠複製。',
      currency: '各國不同的貨幣符號。放在數字前面還是後面，也各國不同。',
      punct: '刪節號、間隔號這類鍵盤上沒有、文件裡卻常用的符號。',
      shape: '方塊、三角、圓圈。用在清單前面，或者在表格裡表示狀態。',
      star: '星星、心形和花。常用來打分或強調。',
      check: '勾號、叉號和警告標誌。表格裡表示行不行，就靠它們。',
      bracket: '中日韓文件裡用的單直角引號、雙直角引號和方括號。',
      greek: '算式和學術記法裡用的希臘字母。',
      number: '帶圈數字、分數和上標。',
      music: '各種音符，以及升記號、降記號、還原記號。',
      weather: '太陽、雲、雪這類表示天氣的黑白符號。它們和彩色表情符號不是同一個字。',
      zodiac: '表示十二星座的符號。',
      game: '撲克花色、西洋棋棋子和骰子點數。',
      key: 'Mac 鍵盤上 Command、Option 這類寫快速鍵時用的符號。',
      misc: '版權標記、溫度這些放不進其他分類的符號。',
    },
  ),

  copyLabel: T('복사', 'Copy', 'Copiar', 'Copiar', 'コピー', 'Kopieren', 'Copier', 'कॉपी', '复制', '複製'),
  copiedLabel: T('복사했습니다', 'Copied', 'Copiado', 'Copiado', 'コピーしました', 'Kopiert', 'Copié', 'कॉपी हो गया', '已复制', '已複製'),
  unicodeLabel: T('유니코드', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'यूनिकोड', 'Unicode', 'Unicode'),
  entityLabel: T('HTML 엔티티', 'HTML entity', 'Entidad HTML', 'Entidade HTML', 'HTMLエンティティ', 'HTML-Entity', 'Entité HTML', 'HTML एंटिटी', 'HTML 实体', 'HTML 實體'),
  namedEntityLabel: T('이름 엔티티', 'Named entity', 'Entidad con nombre', 'Entidade nomeada', '名前付きエンティティ', 'Benannte Entity', 'Entité nommée', 'नामित एंटिटी', '具名实体', '具名實體'),
  cssLabel: T('CSS', 'CSS', 'CSS', 'CSS', 'CSS', 'CSS', 'CSS', 'CSS', 'CSS', 'CSS'),
  jsLabel: T('자바스크립트', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'JavaScript', 'जावास्क्रिप्ट', 'JavaScript', 'JavaScript'),
  urlLabel: T('주소 인코딩', 'URL encoded', 'Codificado para URL', 'Codificado para URL', 'URLエンコード', 'URL-kodiert', 'Encodé pour URL', 'URL एन्कोडेड', 'URL 编码', 'URL 編碼'),
  bytesLabel: T('UTF-8 크기', 'UTF-8 size', 'Tamaño UTF-8', 'Tamanho UTF-8', 'UTF-8のサイズ', 'UTF-8-Größe', 'Taille UTF-8', 'UTF-8 आकार', 'UTF-8 大小', 'UTF-8 大小'),
  bytesValue: T(
    (n: number) => `${n}바이트`, (n: number) => `${n} bytes`, (n: number) => `${n} bytes`, (n: number) => `${n} bytes`,
    (n: number) => `${n}バイト`, (n: number) => `${n} Bytes`, (n: number) => `${n} octets`, (n: number) => `${n} बाइट`,
    (n: number) => `${n}字节`,
    (n: number) => `${n}位元組`,
  ),

  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी', '分类', '分類'),
  relatedTitle: T('같은 갈래의 다른 문자', 'Other characters in the same group', 'Otros caracteres del mismo grupo', 'Outros caracteres do mesmo grupo', '同じ分類のほかの文字', 'Weitere Zeichen derselben Gruppe', 'Autres caractères du même groupe', 'उसी समूह के अन्य वर्ण', '同一类的其他符号', '同一類的其他符號'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T(
    [
      '유니코드 번호는 글자마다 하나뿐인 이름표입니다. 글꼴이 달라도 이 번호가 같으면 같은 글자입니다.',
      'HTML에서는 &#번호; 꼴로 쓰면 어디서나 통합니다. &hearts; 같은 이름 엔티티는 보기 좋지만 이름이 있는 글자에만 씁니다.',
      'CSS에서 아이콘처럼 쓸 때는 content: "\\2764"처럼 역슬래시와 열여섯 진수를 씁니다.',
      '글자가 네모로 보이면 복사가 잘못된 것이 아니라, 그 글꼴에 그 글자가 없는 것입니다. 다른 글꼴로 보면 제대로 나옵니다.',
    ],
    [
      'A Unicode code point is a name tag unique to each character. Different fonts, same number — still the same character.',
      'In HTML, the numeric form &#number; works everywhere. Named entities like &hearts; read nicer but exist only for some characters.',
      'In CSS, use a backslash and hexadecimal: content: "\\2764".',
      'If the character shows as a box, the copy did not fail — that font simply has no glyph for it. Another font will show it.',
    ],
    [
      'El punto de código Unicode es una etiqueta única de cada carácter. Con otra tipografía y el mismo número, sigue siendo el mismo carácter.',
      'En HTML, la forma numérica &#número; funciona en todas partes. Las entidades con nombre como &hearts; se leen mejor, pero solo existen para algunos caracteres.',
      'En CSS se escribe con barra invertida y hexadecimal: content: "\\2764".',
      'Si el carácter aparece como un cuadrado, la copia no falló: esa tipografía no tiene ese glifo. Con otra fuente se verá bien.',
    ],
    [
      'O ponto de código Unicode é uma etiqueta única de cada caractere. Fonte diferente, mesmo número — continua o mesmo caractere.',
      'Em HTML, a forma numérica &#número; funciona em qualquer lugar. Entidades nomeadas como &hearts; leem melhor, mas só existem para alguns caracteres.',
      'Em CSS, use barra invertida e hexadecimal: content: "\\2764".',
      'Se o caractere aparecer como um quadrado, a cópia não falhou: aquela fonte não tem esse glifo. Outra fonte mostra certo.',
    ],
    [
      'Unicodeの番号は文字ごとに一つだけの名札です。フォントが違ってもこの番号が同じなら同じ文字です。',
      'HTMLでは &#番号; の形がどこでも通じます。&hearts; のような名前付きエンティティは読みやすいものの、名前のある文字にしか使えません。',
      'CSSではバックスラッシュと十六進数で書きます — content: "\\2764" のように。',
      '文字が四角に見えるのはコピーの失敗ではなく、そのフォントにその文字がないだけです。別のフォントなら正しく表示されます。',
    ],
    [
      'Ein Unicode-Codepunkt ist ein Namensschild, das nur einem Zeichen gehört. Andere Schrift, gleiche Nummer — dasselbe Zeichen.',
      'In HTML funktioniert die numerische Form &#Nummer; überall. Benannte Entities wie &hearts; lesen sich schöner, existieren aber nur für manche Zeichen.',
      'In CSS schreibt man Backslash und Hexadezimalzahl: content: "\\2764".',
      'Erscheint das Zeichen als Kästchen, ist die Kopie nicht misslungen — der Schrift fehlt nur dieses Zeichen. In einer anderen Schrift erscheint es.',
    ],
    [
      "Le point de code Unicode est une étiquette propre à chaque caractère. Police différente, même numéro : c'est le même caractère.",
      "En HTML, la forme numérique &#numéro; fonctionne partout. Les entités nommées comme &hearts; se lisent mieux, mais n'existent que pour certains caractères.",
      'En CSS, on écrit avec une barre oblique inverse et de l’hexadécimal : content: "\\2764".',
      "Si le caractère s'affiche en carré, la copie n'a pas échoué : cette police n'a tout simplement pas ce glyphe. Une autre police l'affichera.",
    ],
    [
      'यूनिकोड कोड पॉइंट हर वर्ण का अपना अनोखा नाम-पत्र है। फ़ॉन्ट बदल जाए पर संख्या वही हो, तो वर्ण भी वही है।',
      'HTML में &#संख्या; वाला रूप हर जगह चलता है। &hearts; जैसी नामित एंटिटी पढ़ने में अच्छी लगती हैं, पर वे कुछ ही वर्णों के लिए हैं।',
      'CSS में बैकस्लैश और हेक्साडेसिमल लिखें: content: "\\2764"।',
      'अगर वर्ण डिब्बे जैसा दिखे तो कॉपी ग़लत नहीं हुई — उस फ़ॉन्ट में वह वर्ण ही नहीं है। दूसरे फ़ॉन्ट में सही दिखेगा।',
    ],
    [
      'Unicode 码位是每个字独一无二的名牌。字体换了也没关系，码位一样就是同一个字。',
      '在 HTML 里写成 &#码位; 的形式，到哪儿都通。&hearts; 这种具名实体好看，但只有部分字才有名字。',
      '在 CSS 里当图标用时，写成 content: "\\2764" 这样，一个反斜杠加十六进制。',
      '字显示成方框，不是复制错了，而是那套字体里没有这个字的字形。换套字体看就正常了。',
    ],
    [
      'Unicode 碼位是每個字獨一無二的名牌。字型換了也沒關係，碼位一樣就是同一個字。',
      '在 HTML 裡寫成 &#碼位; 的形式，到哪兒都通。&hearts; 這種具名實體好看，但只有部分字才有名字。',
      '在 CSS 裡當圖示用時，寫成 content: "\\2764" 這樣，一個反斜線加十六進位。',
      '字顯示成方框，不是複製錯了，而是那套字型裡沒有這個字的字形。換套字型看就正常了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '특수문자 168개 모음 — 화살표·별·체크 복사',
    '168 special characters to copy — arrows, stars, check marks',
    '168 caracteres especiales para copiar — flechas, estrellas, marcas',
    '168 caracteres especiais para copiar — setas, estrelas, marcas',
    '特殊文字168個 — 矢印・星・チェックをコピー',
    '168 Sonderzeichen zum Kopieren — Pfeile, Sterne, Haken',
    '168 caractères spéciaux à copier — flèches, étoiles, coches',
    '168 विशेष वर्ण कॉपी करें — तीर, तारे, चेक मार्क',
    '特殊符号 168 个 — 箭头、星星、勾号一点就复制',
    '特殊符號 168 個 — 箭頭、星星、勾號一點就複製',
  ),
  hubMetaDesc: T(
    '화살표·수학 기호·화폐·별·하트·체크 등 특수문자 168개를 갈래별로 모았습니다. 누르면 바로 복사되고, 유니코드 번호와 HTML 엔티티, CSS 이스케이프도 함께 확인할 수 있습니다.',
    '168 special characters grouped by kind — arrows, maths, currency, stars, hearts, ticks. Tap to copy, and see the Unicode code point, HTML entity and CSS escape for each.',
    '168 caracteres especiales agrupados por tipo: flechas, matemáticas, monedas, estrellas, corazones y marcas. Toca para copiar y consulta el código Unicode, la entidad HTML y el escape CSS.',
    '168 caracteres especiais agrupados por tipo: setas, matemática, moedas, estrelas, corações e marcas. Toque para copiar e veja o código Unicode, a entidade HTML e o escape CSS.',
    '矢印・数学記号・通貨・星・ハート・チェックなど特殊文字168個を分類ごとにまとめました。押すとすぐコピーでき、Unicode番号やHTMLエンティティ、CSSエスケープも確認できます。',
    '168 Sonderzeichen nach Art geordnet — Pfeile, Mathematik, Währungen, Sterne, Herzen, Haken. Antippen kopiert; Codepunkt, HTML-Entity und CSS-Escape stehen dabei.',
    "168 caractères spéciaux classés par type : flèches, mathématiques, devises, étoiles, cœurs, coches. Touchez pour copier et consultez le point de code Unicode, l'entité HTML et l'échappement CSS.",
    '168 विशेष वर्ण श्रेणी के अनुसार — तीर, गणित, मुद्रा, तारे, दिल, चेक। छूकर कॉपी करें और यूनिकोड कोड, HTML एंटिटी व CSS एस्केप देखें।',
    '箭头、数学符号、货币、星星、心形、勾号等 168 个特殊符号，按类别收好。点一下直接复制，Unicode 码位、HTML 实体和 CSS 转义也能一并查到。',
    '箭頭、數學符號、貨幣、星星、心形、勾號等 168 個特殊符號，按類別收好。點一下直接複製，Unicode 碼位、HTML 實體和 CSS 跳脫也能一併查到。',
  ),

  metaTitle: T(
    (c: string) => `${c} 특수문자 복사 — 유니코드와 HTML 엔티티`,
    (c: string) => `${c} special character — copy, Unicode and HTML entity`,
    (c: string) => `Carácter especial ${c} — copiar, Unicode y entidad HTML`,
    (c: string) => `Caractere especial ${c} — copiar, Unicode e entidade HTML`,
    (c: string) => `${c} の特殊文字 — コピーとUnicode・HTMLエンティティ`,
    (c: string) => `Sonderzeichen ${c} — kopieren, Unicode und HTML-Entity`,
    (c: string) => `Caractère spécial ${c} — copier, Unicode et entité HTML`,
    (c: string) => `${c} विशेष वर्ण — कॉपी, यूनिकोड और HTML एंटिटी`,
    (c: string) => `${c} 特殊符号复制 — Unicode 与 HTML 实体`,
    (c: string) => `${c} 特殊符號複製 — Unicode 與 HTML 實體`,
  ),

  metaDesc: T(
    (f: GlyphFacts, kind: string) => `${f.char} 문자를 눌러 바로 복사하세요. 유니코드 ${f.unicode}, HTML 엔티티 ${f.entity}, CSS ${f.cssEscape}이며 ${kind} 갈래에 들어갑니다.`,
    (f: GlyphFacts, kind: string) => `Tap to copy ${f.char}. Its Unicode code point is ${f.unicode}, its HTML entity ${f.entity}, its CSS escape ${f.cssEscape}, and it belongs to the ${kind.toLowerCase()} group.`,
    (f: GlyphFacts, kind: string) => `Toca para copiar ${f.char}. Su punto de código Unicode es ${f.unicode}, su entidad HTML ${f.entity}, su escape CSS ${f.cssEscape}, y pertenece al grupo ${kind.toLowerCase()}.`,
    (f: GlyphFacts, kind: string) => `Toque para copiar ${f.char}. O ponto de código Unicode é ${f.unicode}, a entidade HTML ${f.entity}, o escape CSS ${f.cssEscape}, e ele pertence ao grupo ${kind.toLowerCase()}.`,
    (f: GlyphFacts, kind: string) => `${f.char} を押すとそのままコピーできます。Unicodeは ${f.unicode}、HTMLエンティティは ${f.entity}、CSSでは ${f.cssEscape} で、${kind}の分類に入ります。`,
    (f: GlyphFacts, kind: string) => `${f.char} antippen und kopieren. Der Unicode-Codepunkt ist ${f.unicode}, die HTML-Entity ${f.entity}, das CSS-Escape ${f.cssEscape}; es gehört zur Gruppe ${kind}.`,
    (f: GlyphFacts, kind: string) => `Touchez pour copier ${f.char}. Son point de code Unicode est ${f.unicode}, son entité HTML ${f.entity}, son échappement CSS ${f.cssEscape}, et il appartient au groupe ${kind.toLowerCase()}.`,
    (f: GlyphFacts, kind: string) => `${f.char} को छूकर कॉपी करें। इसका यूनिकोड ${f.unicode}, HTML एंटिटी ${f.entity}, CSS एस्केप ${f.cssEscape} है और यह ${kind} समूह में आता है।`,
    (f: GlyphFacts, kind: string) => `点一下 ${f.char} 就能直接复制。它的 Unicode 是 ${f.unicode}，HTML 实体是 ${f.entity}，CSS 里写作 ${f.cssEscape}，属于${kind}这一类。`,
    (f: GlyphFacts, kind: string) => `點一下 ${f.char} 就能直接複製。它的 Unicode 是 ${f.unicode}，HTML 實體是 ${f.entity}，CSS 裡寫作 ${f.cssEscape}，屬於${kind}這一類。`,
  ),

  hubFaq: T(
    [
      { q: '특수문자를 복사하려면 어떻게 하나요?', a: '문자를 누르면 클립보드에 바로 들어갑니다. 그다음 붙여 넣을 곳에서 붙여넣기만 하면 됩니다. 글꼴이 달라도 같은 글자라 문서·메신저·게임 이름 어디에나 그대로 들어갑니다.' },
      { q: '붙여 넣으면 네모로 보입니다.', a: '복사가 잘못된 것이 아니라, 그 프로그램이 쓰는 글꼴에 그 글자의 그림이 없는 것입니다. 다른 글꼴로 바꾸거나 다른 기기에서 열면 제대로 보입니다. 게임 닉네임처럼 글꼴을 못 바꾸는 곳에서는 다른 문자를 고르는 편이 낫습니다.' },
      { q: '특수문자와 이모지는 다른가요?', a: '둘 다 유니코드 글자지만 쓰임이 다릅니다. ☀ 같은 흑백 기호는 글자 취급이라 글자 색과 크기를 따라가고, ☀️ 같은 컬러 이모지는 그림처럼 따로 그려집니다. 문서에서는 흑백 쪽이 덜 튑니다.' },
      { q: 'HTML에 넣을 때는 어떻게 쓰나요?', a: '&#번호; 꼴을 쓰면 어떤 브라우저에서든 통합니다. &hearts;처럼 이름이 붙은 엔티티도 있지만 일부 글자에만 있어서, 숫자 쪽이 더 안전합니다. 문서 인코딩이 UTF-8이면 글자를 그대로 넣어도 됩니다.' },
      { q: '자판으로 바로 칠 수는 없나요?', a: '한글 자판에서는 자음(ㅁ·ㄴ 등)을 누르고 한자 키를 누르면 관련 기호 목록이 나옵니다. 윈도우는 윈도우 키와 마침표로 기호 창을, 맥은 컨트롤·커맨드·스페이스로 문자 뷰어를 열 수 있습니다.' },
    ],
    [
      { q: 'How do I copy a special character?', a: 'Tap the character and it goes straight to the clipboard, ready to paste anywhere — documents, chat apps, game names. It stays the same character whatever font the destination uses.' },
      { q: 'It pastes as an empty box.', a: 'The copy worked; the font in that app simply has no drawing for the character. Change the font or open it elsewhere and it appears. Where you cannot change the font — a game nickname, say — pick a more common character instead.' },
      { q: 'Are special characters the same as emoji?', a: 'Both are Unicode, but they behave differently. A black-and-white sign like ☀ is treated as text and follows your font colour and size, while the colour emoji ☀️ is drawn as a picture. In documents the text version blends in better.' },
      { q: 'How do I write one in HTML?', a: 'The numeric form &#number; works in every browser. Named entities like &hearts; exist too but only for some characters, so the numeric form is safer. If the page is UTF-8, you can also paste the character itself.' },
      { q: 'Can I type these directly?', a: 'On Windows, the Windows key with a full stop opens a symbol picker; on macOS, Control-Command-Space opens the character viewer. Korean keyboards also list symbols when you press a consonant followed by the Hanja key.' },
    ],
    [
      { q: '¿Cómo copio un carácter especial?', a: 'Toca el carácter y pasa directo al portapapeles, listo para pegar donde quieras: documentos, mensajería, nombres de juego. Sigue siendo el mismo carácter use la tipografía que use el destino.' },
      { q: 'Se pega como un cuadrado vacío.', a: 'La copia funcionó; la tipografía de esa aplicación no tiene dibujo para ese carácter. Cambia la fuente o ábrelo en otro sitio y aparecerá. Donde no puedas cambiarla —un apodo de juego, por ejemplo— elige un carácter más común.' },
      { q: '¿Los caracteres especiales son lo mismo que los emojis?', a: 'Ambos son Unicode, pero se comportan distinto. Un signo en blanco y negro como ☀ se trata como texto y sigue el color y el tamaño de la fuente; el emoji en color ☀️ se dibuja como una imagen. En documentos, la versión de texto encaja mejor.' },
      { q: '¿Cómo lo escribo en HTML?', a: 'La forma numérica &#número; funciona en todos los navegadores. También existen entidades con nombre como &hearts;, pero solo para algunos caracteres, así que la numérica es más segura. Si la página es UTF-8, puedes pegar el carácter tal cual.' },
      { q: '¿Puedo teclearlos directamente?', a: 'En Windows, la tecla Windows con el punto abre un selector de símbolos; en macOS, Control-Comando-Espacio abre el visor de caracteres.' },
    ],
    [
      { q: 'Como copio um caractere especial?', a: 'Toque no caractere e ele vai direto para a área de transferência, pronto para colar onde quiser: documentos, mensageiros, nomes de jogo. Continua o mesmo caractere, qualquer que seja a fonte do destino.' },
      { q: 'Ele cola como um quadrado vazio.', a: 'A cópia funcionou; a fonte daquele aplicativo é que não tem desenho para o caractere. Troque a fonte ou abra em outro lugar e ele aparece. Onde não dá para trocar — um apelido de jogo, por exemplo — escolha um caractere mais comum.' },
      { q: 'Caractere especial é a mesma coisa que emoji?', a: 'Os dois são Unicode, mas se comportam de forma diferente. Um sinal em preto e branco como ☀ é tratado como texto e segue a cor e o tamanho da fonte; o emoji colorido ☀️ é desenhado como imagem. Em documentos, a versão de texto combina melhor.' },
      { q: 'Como escrevo em HTML?', a: 'A forma numérica &#número; funciona em todos os navegadores. Há também entidades nomeadas como &hearts;, mas só para alguns caracteres, então a numérica é mais segura. Se a página for UTF-8, dá para colar o próprio caractere.' },
      { q: 'Dá para digitar direto?', a: 'No Windows, a tecla Windows com ponto abre um seletor de símbolos; no macOS, Control-Command-Espaço abre o visualizador de caracteres.' },
    ],
    [
      { q: '特殊文字はどうやってコピーしますか。', a: '文字を押すとそのままクリップボードに入り、どこにでも貼り付けられます。文書でもメッセンジャーでもゲーム名でも、貼り付け先のフォントが違っても同じ文字のままです。' },
      { q: '貼り付けると四角になります。', a: 'コピーは成功していて、そのアプリのフォントにその文字の絵がないだけです。フォントを変えるか別の場所で開けば表示されます。ゲームの名前のようにフォントを変えられない場所では、より一般的な文字を選ぶほうが確実です。' },
      { q: '特殊文字と絵文字は違いますか。', a: 'どちらもUnicodeの文字ですが、ふるまいが違います。☀ のような白黒の記号は文字として扱われ、文字色や大きさに従います。☀️ のようなカラー絵文字は絵として描かれます。文書では白黒のほうがなじみます。' },
      { q: 'HTMLではどう書きますか。', a: '&#番号; の形はどのブラウザーでも通じます。&hearts; のような名前付きエンティティもありますが一部の文字にしかないので、数字のほうが安全です。ページがUTF-8なら文字をそのまま貼っても構いません。' },
      { q: 'キーボードから直接打てますか。', a: 'Windowsでは Windowsキーとピリオドで記号の一覧が、macOSでは Control+Command+スペースで文字ビューアが開きます。' },
    ],
    [
      { q: 'Wie kopiere ich ein Sonderzeichen?', a: 'Zeichen antippen — es liegt sofort in der Zwischenablage und lässt sich überall einfügen: Dokumente, Messenger, Spielnamen. Es bleibt dasselbe Zeichen, gleich welche Schrift am Ziel verwendet wird.' },
      { q: 'Eingefügt erscheint nur ein Kästchen.', a: 'Das Kopieren hat geklappt; der Schrift in jener App fehlt nur die Zeichnung dafür. Schrift wechseln oder anderswo öffnen, dann erscheint es. Wo sich die Schrift nicht ändern lässt — etwa bei einem Spielnamen — nehmen Sie besser ein geläufigeres Zeichen.' },
      { q: 'Sind Sonderzeichen dasselbe wie Emoji?', a: 'Beides ist Unicode, verhält sich aber anders. Ein schwarzweißes Zeichen wie ☀ gilt als Text und folgt Schriftfarbe und -größe; das farbige Emoji ☀️ wird als Bild gezeichnet. In Dokumenten fügt sich die Textvariante besser ein.' },
      { q: 'Wie schreibe ich es in HTML?', a: 'Die numerische Form &#Nummer; funktioniert in jedem Browser. Benannte Entities wie &hearts; gibt es auch, aber nur für manche Zeichen — numerisch ist sicherer. Ist die Seite UTF-8, können Sie das Zeichen direkt einfügen.' },
      { q: 'Kann man sie direkt tippen?', a: 'Unter Windows öffnet die Windows-Taste mit Punkt eine Zeichenauswahl, unter macOS Strg-Befehl-Leertaste die Zeichenübersicht.' },
    ],
    [
      { q: 'Comment copier un caractère spécial ?', a: "Touchez le caractère : il passe directement dans le presse-papiers, prêt à coller partout — documents, messageries, pseudos de jeu. Il reste le même caractère quelle que soit la police de destination." },
      { q: "Il se colle sous forme de carré vide.", a: "La copie a réussi ; c'est la police de cette application qui n'a pas de dessin pour ce caractère. Changez de police ou ouvrez ailleurs et il apparaîtra. Là où la police n'est pas modifiable — un pseudo de jeu par exemple — choisissez un caractère plus courant." },
      { q: 'Caractères spéciaux et émojis, est-ce pareil ?', a: "Les deux sont de l'Unicode, mais ne se comportent pas pareil. Un signe en noir et blanc comme ☀ est traité comme du texte et suit la couleur et la taille de la police ; l'émoji couleur ☀️ est dessiné comme une image. Dans un document, la version texte s'intègre mieux." },
      { q: "Comment l'écrire en HTML ?", a: "La forme numérique &#numéro; fonctionne dans tous les navigateurs. Il existe aussi des entités nommées comme &hearts;, mais seulement pour certains caractères : le numérique est plus sûr. Si la page est en UTF-8, vous pouvez coller le caractère tel quel." },
      { q: 'Peut-on les taper directement ?', a: "Sous Windows, la touche Windows avec le point ouvre un sélecteur de symboles ; sous macOS, Contrôle-Commande-Espace ouvre la visionneuse de caractères." },
    ],
    [
      { q: 'विशेष वर्ण कैसे कॉपी करें?', a: 'वर्ण को छूते ही वह क्लिपबोर्ड में चला जाता है और कहीं भी चिपकाया जा सकता है — दस्तावेज़, मैसेंजर, गेम के नाम। जहाँ चिपकाएँ वहाँ फ़ॉन्ट कोई भी हो, वर्ण वही रहता है।' },
      { q: 'चिपकाने पर खाली डिब्बा दिखता है।', a: 'कॉपी सही हुई है; उस ऐप के फ़ॉन्ट में उस वर्ण का चित्र ही नहीं है। फ़ॉन्ट बदलें या कहीं और खोलें, वर्ण दिख जाएगा। जहाँ फ़ॉन्ट नहीं बदल सकते — जैसे गेम का नाम — वहाँ कोई आम वर्ण चुनना बेहतर है।' },
      { q: 'क्या विशेष वर्ण और इमोजी एक ही हैं?', a: 'दोनों यूनिकोड हैं, पर व्यवहार अलग है। ☀ जैसा श्वेत-श्याम चिह्न टेक्स्ट माना जाता है और फ़ॉन्ट के रंग-आकार का अनुसरण करता है, जबकि रंगीन इमोजी ☀️ चित्र की तरह बनता है। दस्तावेज़ों में टेक्स्ट वाला रूप ज़्यादा घुल-मिल जाता है।' },
      { q: 'HTML में कैसे लिखें?', a: '&#संख्या; वाला रूप हर ब्राउज़र में चलता है। &hearts; जैसी नामित एंटिटी भी हैं, पर वे कुछ ही वर्णों के लिए हैं, इसलिए संख्या वाला रूप सुरक्षित है। पेज UTF-8 हो तो वर्ण सीधे भी चिपकाया जा सकता है।' },
      { q: 'क्या इन्हें सीधे टाइप किया जा सकता है?', a: 'विंडोज़ में विंडोज़ कुंजी और फ़ुल स्टॉप से चिह्न चुनने की खिड़की खुलती है; macOS में Control-Command-Space से कैरेक्टर व्यूअर खुलता है।' },
    ],
    [
      { q: '特殊符号怎么复制？', a: '点一下那个符号，它就进了剪贴板，之后到要用的地方粘贴即可。字体不同也是同一个字，所以文档、聊天软件、游戏昵称里都能原样放进去。' },
      { q: '粘贴过去显示成方框。', a: '不是复制错了，而是那个程序用的字体里没有这个字的字形。换套字体，或者换台设备打开就正常了。像游戏昵称这种没法换字体的地方，还是另挑一个符号更省事。' },
      { q: '特殊符号和表情符号是一回事吗？', a: '都是 Unicode 字符，但用法不一样。☀ 这种黑白符号按文字处理，会跟着文字的颜色和大小走；☀️ 这种彩色表情则像图片一样单独画出来。写文档时，黑白的那套不那么抢眼。' },
      { q: '放进 HTML 里该怎么写？', a: '写成 &#码位; 的形式，任何浏览器都认。也有 &hearts; 这样的具名实体，但只有一部分字才有，所以数字形式更保险。文档编码是 UTF-8 的话，直接把字放进去也行。' },
      { q: '能不能直接用键盘打出来？', a: 'Windows 按 Win 键加句号可以调出符号面板，Mac 按 Control、Command、空格可以打开字符检视器。中文输入法里也大多带有符号面板。' },
    ],
    [
      { q: '特殊符號怎麼複製？', a: '點一下那個符號，它就進了剪貼簿，之後到要用的地方貼上即可。字型不同也是同一個字，所以文件、聊天軟體、遊戲暱稱裡都能原樣放進去。' },
      { q: '貼過去顯示成方框。', a: '不是複製錯了，而是那個程式用的字型裡沒有這個字的字形。換套字型，或者換台裝置開啟就正常了。像遊戲暱稱這種沒法換字型的地方，還是另挑一個符號更省事。' },
      { q: '特殊符號和表情符號是一回事嗎？', a: '都是 Unicode 字元，但用法不一樣。☀ 這種黑白符號按文字處理，會跟著文字的顏色和大小走；☀️ 這種彩色表情則像圖片一樣單獨畫出來。寫文件時，黑白的那套不那麼搶眼。' },
      { q: '放進 HTML 裡該怎麼寫？', a: '寫成 &#碼位; 的形式，任何瀏覽器都認。也有 &hearts; 這樣的具名實體，但只有一部分字才有，所以數字形式更保險。文件編碼是 UTF-8 的話，直接把字放進去也行。' },
      { q: '能不能直接用鍵盤打出來？', a: 'Windows 按 Win 鍵加句號可以叫出符號面板，Mac 按 Control、Command、空白鍵可以開啟字元檢視器。中文輸入法裡也大多帶有符號表。' },
    ],
  ),

  glyphFaq: T(
    (f: GlyphFacts, kind: string) => [
      { q: `${f.char} 문자의 유니코드는 무엇인가요?`, a: `${f.unicode}입니다. 십진수로는 ${f.code}이고, UTF-8로 저장하면 ${f.utf8Bytes}바이트를 차지합니다.` },
      { q: `${f.char}를 HTML에 넣으려면?`, a: `${f.entity}를 쓰면 어느 브라우저에서든 같은 글자가 나옵니다.${f.namedEntity ? ` 이름이 붙은 ${f.namedEntity}도 쓸 수 있습니다.` : ' 이 글자에는 이름 엔티티가 없어 숫자 꼴을 씁니다.'}` },
      { q: `${f.char}를 CSS나 자바스크립트에서 쓰려면?`, a: `CSS에서는 content: "${f.cssEscape}", 자바스크립트에서는 "${f.jsEscape}"로 씁니다. 주소에 넣을 때는 ${f.urlEncoded}로 바뀝니다.` },
      { q: `${f.char}는 어떤 갈래의 문자인가요?`, a: `${kind} 갈래에 들어갑니다. 같은 갈래의 다른 문자도 이 화면 아래에서 함께 복사할 수 있습니다.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `What is the Unicode code point of ${f.char}?`, a: `${f.unicode}, which is ${f.code} in decimal. Stored as UTF-8 it takes ${f.utf8Bytes} bytes.` },
      { q: `How do I write ${f.char} in HTML?`, a: `Use ${f.entity} and every browser shows the same character.${f.namedEntity ? ` The named form ${f.namedEntity} also works.` : ' This character has no named entity, so the numeric form is the one to use.'}` },
      { q: `How do I use ${f.char} in CSS or JavaScript?`, a: `In CSS, content: "${f.cssEscape}". In JavaScript, "${f.jsEscape}". In a URL it becomes ${f.urlEncoded}.` },
      { q: `What kind of character is ${f.char}?`, a: `It belongs to the ${kind.toLowerCase()} group. The rest of that group is listed further down this page, ready to copy.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `¿Cuál es el punto de código Unicode de ${f.char}?`, a: `${f.unicode}, que en decimal es ${f.code}. Guardado como UTF-8 ocupa ${f.utf8Bytes} bytes.` },
      { q: `¿Cómo escribo ${f.char} en HTML?`, a: `Con ${f.entity} todos los navegadores muestran el mismo carácter.${f.namedEntity ? ` También sirve la forma con nombre ${f.namedEntity}.` : ' Este carácter no tiene entidad con nombre, así que se usa la numérica.'}` },
      { q: `¿Cómo uso ${f.char} en CSS o JavaScript?`, a: `En CSS, content: "${f.cssEscape}". En JavaScript, "${f.jsEscape}". En una URL se convierte en ${f.urlEncoded}.` },
      { q: `¿De qué tipo es el carácter ${f.char}?`, a: `Pertenece al grupo ${kind.toLowerCase()}. El resto del grupo aparece más abajo en esta página, listo para copiar.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `Qual é o ponto de código Unicode de ${f.char}?`, a: `${f.unicode}, que em decimal é ${f.code}. Salvo como UTF-8 ocupa ${f.utf8Bytes} bytes.` },
      { q: `Como escrevo ${f.char} em HTML?`, a: `Com ${f.entity} todos os navegadores mostram o mesmo caractere.${f.namedEntity ? ` A forma nomeada ${f.namedEntity} também funciona.` : ' Este caractere não tem entidade nomeada, então usa-se a numérica.'}` },
      { q: `Como uso ${f.char} em CSS ou JavaScript?`, a: `Em CSS, content: "${f.cssEscape}". Em JavaScript, "${f.jsEscape}". Numa URL vira ${f.urlEncoded}.` },
      { q: `Que tipo de caractere é ${f.char}?`, a: `Ele pertence ao grupo ${kind.toLowerCase()}. O restante do grupo está mais abaixo nesta página, pronto para copiar.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `${f.char} のUnicode番号は何ですか。`, a: `${f.unicode} です。十進数では ${f.code}、UTF-8で保存すると ${f.utf8Bytes} バイトになります。` },
      { q: `${f.char} をHTMLに書くには。`, a: `${f.entity} と書けばどのブラウザーでも同じ文字が出ます。${f.namedEntity ? `名前付きの ${f.namedEntity} も使えます。` : 'この文字には名前付きエンティティがないので数字の形を使います。'}` },
      { q: `${f.char} をCSSやJavaScriptで使うには。`, a: `CSSでは content: "${f.cssEscape}"、JavaScriptでは "${f.jsEscape}" と書きます。URLに入れると ${f.urlEncoded} になります。` },
      { q: `${f.char} はどの分類の文字ですか。`, a: `${kind}の分類に入ります。同じ分類のほかの文字もこのページの下でまとめてコピーできます。` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `Welchen Unicode-Codepunkt hat ${f.char}?`, a: `${f.unicode}, dezimal ${f.code}. Als UTF-8 gespeichert belegt es ${f.utf8Bytes} Bytes.` },
      { q: `Wie schreibe ich ${f.char} in HTML?`, a: `Mit ${f.entity} zeigt jeder Browser dasselbe Zeichen.${f.namedEntity ? ` Auch die benannte Form ${f.namedEntity} funktioniert.` : ' Für dieses Zeichen gibt es keine benannte Entity, also nimmt man die numerische.'}` },
      { q: `Wie verwende ich ${f.char} in CSS oder JavaScript?`, a: `In CSS: content: "${f.cssEscape}". In JavaScript: "${f.jsEscape}". In einer URL wird daraus ${f.urlEncoded}.` },
      { q: `Zu welcher Gruppe gehört ${f.char}?`, a: `Zur Gruppe ${kind}. Der Rest dieser Gruppe steht weiter unten auf dieser Seite, bereit zum Kopieren.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `Quel est le point de code Unicode de ${f.char} ?`, a: `${f.unicode}, soit ${f.code} en décimal. Enregistré en UTF-8, il occupe ${f.utf8Bytes} octets.` },
      { q: `Comment écrire ${f.char} en HTML ?`, a: `Avec ${f.entity}, tous les navigateurs affichent le même caractère.${f.namedEntity ? ` La forme nommée ${f.namedEntity} fonctionne aussi.` : " Ce caractère n'a pas d'entité nommée : on utilise la forme numérique."}` },
      { q: `Comment utiliser ${f.char} en CSS ou en JavaScript ?`, a: `En CSS : content: "${f.cssEscape}". En JavaScript : "${f.jsEscape}". Dans une URL, il devient ${f.urlEncoded}.` },
      { q: `De quel type est le caractère ${f.char} ?`, a: `Il appartient au groupe ${kind.toLowerCase()}. Le reste du groupe figure plus bas sur cette page, prêt à copier.` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `${f.char} का यूनिकोड कोड पॉइंट क्या है?`, a: `${f.unicode}, जो दशमलव में ${f.code} है। UTF-8 में सहेजने पर यह ${f.utf8Bytes} बाइट लेता है।` },
      { q: `${f.char} को HTML में कैसे लिखें?`, a: `${f.entity} लिखने पर हर ब्राउज़र वही वर्ण दिखाता है।${f.namedEntity ? ` नामित रूप ${f.namedEntity} भी चलता है।` : ' इस वर्ण की कोई नामित एंटिटी नहीं है, इसलिए संख्या वाला रूप इस्तेमाल करें।'}` },
      { q: `${f.char} को CSS या जावास्क्रिप्ट में कैसे इस्तेमाल करें?`, a: `CSS में content: "${f.cssEscape}", जावास्क्रिप्ट में "${f.jsEscape}"। URL में यह ${f.urlEncoded} बन जाता है।` },
      { q: `${f.char} किस श्रेणी का वर्ण है?`, a: `यह ${kind} समूह में आता है। उसी समूह के बाक़ी वर्ण इसी पन्ने पर नीचे कॉपी करने के लिए मौजूद हैं।` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `${f.char} 这个字的 Unicode 是多少？`, a: `是 ${f.unicode}。十进制为 ${f.code}，存成 UTF-8 时占 ${f.utf8Bytes} 个字节。` },
      { q: `想把 ${f.char} 放进 HTML 该怎么写？`, a: `写 ${f.entity}，在任何浏览器里都会显示成同一个字。${f.namedEntity ? ` 也可以用具名的 ${f.namedEntity}。` : ' 这个字没有具名实体，所以用数字形式。'}` },
      { q: `在 CSS 或 JavaScript 里怎么写 ${f.char}？`, a: `CSS 里写 content: "${f.cssEscape}"，JavaScript 里写 "${f.jsEscape}"。放进网址时会变成 ${f.urlEncoded}。` },
      { q: `${f.char} 属于哪一类符号？`, a: `属于${kind}这一类。同一类的其他符号列在本页下方，也可以一并复制。` },
    ],
    (f: GlyphFacts, kind: string) => [
      { q: `${f.char} 這個字的 Unicode 是多少？`, a: `是 ${f.unicode}。十進位為 ${f.code}，存成 UTF-8 時占 ${f.utf8Bytes} 個位元組。` },
      { q: `想把 ${f.char} 放進 HTML 該怎麼寫？`, a: `寫 ${f.entity}，在任何瀏覽器裡都會顯示成同一個字。${f.namedEntity ? ` 也可以用具名的 ${f.namedEntity}。` : ' 這個字沒有具名實體，所以用數字形式。'}` },
      { q: `在 CSS 或 JavaScript 裡怎麼寫 ${f.char}？`, a: `CSS 裡寫 content: "${f.cssEscape}"，JavaScript 裡寫 "${f.jsEscape}"。放進網址時會變成 ${f.urlEncoded}。` },
      { q: `${f.char} 屬於哪一類符號？`, a: `屬於${kind}這一類。同一類的其他符號列在本頁下方，也可以一併複製。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const GLYPH_UI: L<GlyphUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<GlyphUI>;
