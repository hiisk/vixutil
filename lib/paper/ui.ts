/**
 * 종이 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "A4가 210×297인 데는 이유가 있다"이다. A0을 1제곱
 * 미터로 두고 반씩 접어 내려온 것이고, 접어도 모양이 변하지 않게 하려다 보니
 * 두 변의 비가 √2가 되었다. 복사기의 141%도 여기서 나온다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PaperFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PaperUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  mmLabel: string;
  inchLabel: string;
  pixelLabel: string;
  mpLabel: string;
  rawLabel: string;
  areaLabel: string;
  ratioLabel: string;
  weightLabel: string;
  envelopeLabel: string;
  dpiLabel: string;
  sheetsLabel: string;
  sizeName: (key: string) => string;
  knownName: (key: string) => string;
  familyName: (key: string) => string;
  foldTitle: string;
  foldNote: string;
  rootTitle: string;
  rootNote: string;
  ratioTitle: string;
  ratioNote: string;
  dpiTitle: string;
  dpiNote: string;
  weightTitle: string;
  weightNote: string;
  letterTitle: string;
  letterNote: string;
  tableTitle: string;
  neighbourTitle: string;
  dpiRowTitle: string;
  sizeRowTitle: string;
  desc: (f: PaperFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PaperFacts) => string;
  metaDesc: (f: PaperFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: PaperFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** ISO 규격은 어느 언어에서나 A4다 — 인치 규격만 이름이 다르다 */
const named = (table: Record<string, string>) => (key: string): string => table[key] ?? key.toUpperCase();

/** 인치 규격의 이름만 언어마다 다르다 — 제목과 질문도 같은 이름을 쓴다 */
const nameKo = named({ letter: '레터', legal: '리걸', tabloid: '타블로이드', executive: '이그제큐티브' });
const nameEn = named({ letter: 'Letter', legal: 'Legal', tabloid: 'Tabloid', executive: 'Executive' });
const nameEs = named({ letter: 'Carta', legal: 'Oficio', tabloid: 'Tabloide', executive: 'Ejecutivo' });
const namePt = named({ letter: 'Carta', legal: 'Ofício', tabloid: 'Tabloide', executive: 'Executivo' });
const nameJa = named({ letter: 'レター', legal: 'リーガル', tabloid: 'タブロイド', executive: 'エグゼクティブ' });
const nameDe = named({ letter: 'Letter', legal: 'Legal', tabloid: 'Tabloid', executive: 'Executive' });
const nameFr = named({ letter: 'Letter', legal: 'Legal', tabloid: 'Tabloïd', executive: 'Executive' });
const nameHi = named({ letter: 'लेटर', legal: 'लीगल', tabloid: 'टैब्लॉइड', executive: 'एग्ज़ीक्यूटिव' });
const nameZh = named({ letter: '信纸', legal: '法律纸', tabloid: '小报', executive: '行政纸' });
const nameTw = named({ letter: '信紙', legal: '法律紙', tabloid: '小報', executive: '行政紙' });

type Spec = { [K in keyof PaperUI]: L<PaperUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('종이 규격', 'Paper sizes', 'Tamaños de papel', 'Tamanhos de papel', '紙のサイズ', 'Papierformate', 'Formats de papier', 'कागज़ के आकार', '纸张规格', '紙張規格'),

  sizeName: T<(key: string) => string>(
    nameKo, nameEn, nameEs, namePt, nameJa, nameDe, nameFr, nameHi, nameZh, nameTw,
  ),

  knownName: T<(key: string) => string>(
    pick({ office: '사무용 기본', poster: '작은 포스터', notebook: '수첩·문고', postcard: '엽서', card: '명함보다 조금 큰', book: '단행본', envelope: 'A5가 들어가는 봉투', smallEnvelope: 'A6가 들어가는 봉투', usOffice: '미국 사무용 기본' }),
    pick({ office: 'the office default', poster: 'a small poster', notebook: 'notebooks and pocket books', postcard: 'a postcard', card: 'just bigger than a business card', book: 'a trade paperback', envelope: 'the envelope an A5 fits', smallEnvelope: 'the envelope an A6 fits', usOffice: 'the US office default' }),
    pick({ office: 'el estándar de oficina', poster: 'un póster pequeño', notebook: 'libretas y libros de bolsillo', postcard: 'una postal', card: 'algo mayor que una tarjeta', book: 'un libro de bolsillo', envelope: 'el sobre donde cabe un A5', smallEnvelope: 'el sobre donde cabe un A6', usOffice: 'el estándar de oficina en EE. UU.' }),
    pick({ office: 'o padrão de escritório', poster: 'um cartaz pequeno', notebook: 'cadernos e livros de bolso', postcard: 'um cartão-postal', card: 'pouco maior que um cartão de visita', book: 'um livro de bolso', envelope: 'o envelope onde cabe um A5', smallEnvelope: 'o envelope onde cabe um A6', usOffice: 'o padrão de escritório dos EUA' }),
    pick({ office: 'オフィスの基本', poster: '小さめのポスター', notebook: '手帳・文庫', postcard: 'はがき', card: '名刺より少し大きい', book: '単行本', envelope: 'A5が入る封筒', smallEnvelope: 'A6が入る封筒', usOffice: '米国オフィスの基本' }),
    pick({ office: 'der Bürostandard', poster: 'ein kleines Poster', notebook: 'Notizbücher und Taschenbücher', postcard: 'eine Postkarte', card: 'etwas größer als eine Visitenkarte', book: 'ein Taschenbuch', envelope: 'der Umschlag für ein A5', smallEnvelope: 'der Umschlag für ein A6', usOffice: 'der US-Bürostandard' }),
    pick({ office: 'le standard de bureau', poster: 'une petite affiche', notebook: 'carnets et livres de poche', postcard: 'une carte postale', card: 'un peu plus grand qu’une carte de visite', book: 'un livre de poche', envelope: 'l’enveloppe où entre un A5', smallEnvelope: 'l’enveloppe où entre un A6', usOffice: 'le standard de bureau américain' }),
    pick({ office: 'दफ़्तर का मानक', poster: 'छोटा पोस्टर', notebook: 'नोटबुक और पॉकेट बुक', postcard: 'पोस्टकार्ड', card: 'विज़िटिंग कार्ड से थोड़ा बड़ा', book: 'पेपरबैक किताब', envelope: 'A5 वाला लिफ़ाफ़ा', smallEnvelope: 'A6 वाला लिफ़ाफ़ा', usOffice: 'अमेरिकी दफ़्तर का मानक' }),
    pick({ office: '办公室默认', poster: '小海报', notebook: '笔记本与口袋书', postcard: '明信片', card: '比名片略大', book: '平装书', envelope: '装 A5 的信封', smallEnvelope: '装 A6 的信封', usOffice: '美国办公室默认' }),
    pick({ office: '辦公室預設', poster: '小海報', notebook: '筆記本與口袋書', postcard: '明信片', card: '比名片略大', book: '平裝書', envelope: '裝 A5 的信封', smallEnvelope: '裝 A6 的信封', usOffice: '美國辦公室預設' }),
  ),

  familyName: T<(key: string) => string>(
    pick({ a: 'A 계열 — 종이', b: 'B 계열 — 포스터·책', c: 'C 계열 — 봉투', inch: '인치로 정해진 규격' }),
    pick({ a: 'A series — paper', b: 'B series — posters and books', c: 'C series — envelopes', inch: 'sizes defined in inches' }),
    pick({ a: 'Serie A — papel', b: 'Serie B — carteles y libros', c: 'Serie C — sobres', inch: 'tamaños definidos en pulgadas' }),
    pick({ a: 'Série A — papel', b: 'Série B — cartazes e livros', c: 'Série C — envelopes', inch: 'tamanhos definidos em polegadas' }),
    pick({ a: 'A判 — 紙', b: 'B判 — ポスター・本', c: 'C判 — 封筒', inch: 'インチで決まった規格' }),
    pick({ a: 'A-Reihe — Papier', b: 'B-Reihe — Poster und Bücher', c: 'C-Reihe — Umschläge', inch: 'in Zoll festgelegte Formate' }),
    pick({ a: 'Série A — papier', b: 'Série B — affiches et livres', c: 'Série C — enveloppes', inch: 'formats définis en pouces' }),
    pick({ a: 'A श्रेणी — कागज़', b: 'B श्रेणी — पोस्टर और किताबें', c: 'C श्रेणी — लिफ़ाफ़े', inch: 'इंच में तय आकार' }),
    pick({ a: 'A 系列 — 纸张', b: 'B 系列 — 海报与书籍', c: 'C 系列 — 信封', inch: '按英寸定义的规格' }),
    pick({ a: 'A 系列 — 紙張', b: 'B 系列 — 海報與書籍', c: 'C 系列 — 信封', inch: '按英寸定義的規格' }),
  ),

  hubTitle: T(
    '종이 280칸 — A4 300dpi는 2480×3508',
    '280 paper sizes — A4 at 300 dpi is 2480×3508',
    '280 tamaños de papel — A4 a 300 ppp son 2480×3508',
    '280 tamanhos de papel — A4 a 300 dpi dá 2480×3508',
    '紙280マス — A4の300dpiは2480×3508',
    '280 Papierformate — A4 bei 300 dpi sind 2480×3508',
    '280 formats de papier — A4 à 300 ppp fait 2480×3508',
    '280 कागज़ आकार — 300 dpi पर A4 यानी 2480×3508',
    '280 个纸张规格 — A4 在 300dpi 下是 2480×3508',
    '280 個紙張規格 — A4 在 300dpi 下是 2480×3508',
  ),

  hubLead: T(
    '규격 35가지와 해상도 8가지가 만나는 칸마다 밀리미터·인치·픽셀과 장당 무게를 계산했습니다. A0 한 장이 1제곱미터이고, 나머지는 전부 반으로 접어서 나온 것입니다.',
    'For every meeting of 35 sizes and 8 resolutions: millimetres, inches, pixels and the weight of one sheet. A0 is one square metre, and every other size is that sheet folded in half again.',
    'Para cada cruce de 35 tamaños y 8 resoluciones: milímetros, pulgadas, píxeles y el peso de una hoja. El A0 mide un metro cuadrado y el resto sale de doblarlo por la mitad.',
    'Para cada cruzamento de 35 tamanhos e 8 resoluções: milímetros, polegadas, pixels e o peso de uma folha. O A0 tem um metro quadrado, e todo o resto sai de dobrá-lo ao meio.',
    '規格35通りと解像度8通りが出会う各マスのミリ・インチ・ピクセルと1枚の重さを計算しました。A0が1平方メートルで、残りはすべて半分に折って出てきます。',
    'Für jede Begegnung von 35 Formaten und 8 Auflösungen: Millimeter, Zoll, Pixel und das Gewicht eines Blattes. A0 ist ein Quadratmeter, alles andere entsteht durch Halbieren.',
    'Pour chaque croisement de 35 formats et 8 résolutions : millimètres, pouces, pixels et le poids d’une feuille. Le A0 fait un mètre carré, et tout le reste vient de le plier en deux.',
    '35 आकारों और 8 रिज़ॉल्यूशनों के हर मेल के मिलीमीटर, इंच, पिक्सेल और एक शीट का वज़न। A0 एक वर्ग मीटर है, बाकी सब उसे आधा मोड़ने से बनते हैं।',
    '35 种规格与 8 种分辨率交汇的每一格都算出毫米、英寸、像素和单张重量。A0 正好一平方米，其余全是把它对折出来的。',
    '35 種規格與 8 種解析度交匯的每一格都算出公釐、英寸、像素和單張重量。A0 正好一平方公尺，其餘全是把它對折出來的。',
  ),

  mmLabel: T('밀리미터', 'millimetres', 'milímetros', 'milímetros', 'ミリメートル', 'Millimeter', 'millimètres', 'मिलीमीटर', '毫米', '毫米'),
  inchLabel: T('인치', 'inches', 'pulgadas', 'polegadas', 'インチ', 'Zoll', 'pouces', 'इंच', '英寸', '英寸'),
  pixelLabel: T('픽셀', 'Pixels', 'Píxeles', 'Pixels', 'ピクセル', 'Pixel', 'Pixels', 'पिक्सेल', '像素', '像素'),
  mpLabel: T('픽셀을 다 합치면', 'All the pixels together', 'Todos los píxeles juntos', 'Todos os pixels juntos', 'ピクセルの総数', 'Alle Pixel zusammen', 'Total des pixels', 'कुल पिक्सेल', '像素总数', '像素總數'),
  rawLabel: T('압축 없이 담으면', 'Uncompressed, that is', 'Sin comprimir', 'Sem compressão', '無圧縮なら', 'Unkomprimiert', 'Sans compression', 'बिना संपीड़न', '未压缩约为', '未壓縮約為'),
  areaLabel: T('넓이', 'Area', 'Superficie', 'Área', '面積', 'Fläche', 'Surface', 'क्षेत्रफल', '面积', '面積'),
  ratioLabel: T('두 변의 비', 'Ratio of the sides', 'Relación de los lados', 'Relação dos lados', '辺の比', 'Seitenverhältnis', 'Rapport des côtés', 'भुजाओं का अनुपात', '边长比', '邊長比'),
  weightLabel: T('장당 무게', 'Weight per sheet', 'Peso por hoja', 'Peso por folha', '1枚の重さ', 'Gewicht je Blatt', 'Poids par feuille', 'प्रति शीट वज़न', '每张重量', '每張重量'),
  envelopeLabel: T('들어가는 봉투', 'The envelope it fits', 'El sobre en que cabe', 'O envelope em que cabe', '入る封筒', 'Passender Umschlag', 'Enveloppe adaptée', 'फ़िट होने वाला लिफ़ाफ़ा', '可装入的信封', '可裝入的信封'),
  dpiLabel: T('해상도', 'Resolution', 'Resolución', 'Resolução', '解像度', 'Auflösung', 'Résolution', 'रिज़ॉल्यूशन', '分辨率', '解析度'),
  sheetsLabel: T('편지 한 통에', 'Sheets in one letter', 'Hojas en una carta', 'Folhas em uma carta', '封書1通に', 'Blätter je Brief', 'Feuilles par lettre', 'एक पत्र में शीट', '一封信可装', '一封信可裝'),

  foldTitle: T('전부 반으로 접어서 나옵니다', 'Every size is the one above, folded', 'Cada tamaño es el anterior doblado', 'Cada tamanho é o anterior dobrado', 'すべて半分に折って出てきます', 'Jedes Format ist das größere, gefaltet', 'Chaque format est le précédent plié', 'हर आकार ऊपर वाले को मोड़कर बनता है', '每一个规格都是上一个对折', '每一個規格都是上一個對折'),

  foldNote: T(
    'A3의 긴 변을 반으로 접으면 A4이고, A4를 접으면 A5입니다. 420을 접으면 210, 297을 접으면 148.5가 아니라 148 — 남는 밀리미터는 버립니다. 이 표의 서른 장은 맨 위 세 장에서 접어 내려온 것이라, 외울 표가 아니라 접는 규칙 하나입니다.',
    'Fold an A3 along its long side and you have an A4; fold that and you have an A5. Folding 420 gives 210; folding 297 gives 148, not 148.5 — the leftover millimetre is dropped. The thirty sizes on this page all come from folding three, so there is a rule to know rather than a table to memorise.',
    'Dobla un A3 por su lado largo y tienes un A4; dóblalo y tienes un A5. Doblar 420 da 210; doblar 297 da 148, no 148,5: el milímetro sobrante se descarta. Los treinta tamaños de esta página salen de doblar tres, así que hay una regla que entender, no una tabla que memorizar.',
    'Dobre um A3 pelo lado maior e você tem um A4; dobre esse e tem um A5. Dobrar 420 dá 210; dobrar 297 dá 148, não 148,5 — o milímetro que sobra é descartado. Os trinta tamanhos desta página vêm de dobrar três, então há uma regra a entender, não uma tabela a decorar.',
    'A3の長い辺を半分に折るとA4、それを折るとA5です。420を折れば210、297を折れば148.5ではなく148 — 余ったミリは捨てます。このページの30枚は上の3枚から折り下ろしたもので、覚える表ではなく折る規則ひとつです。',
    'Falte ein A3 an der langen Seite und du hast ein A4; faltest du das, ergibt sich A5. 420 gefaltet ergibt 210, 297 gefaltet ergibt 148 statt 148,5 — der übrige Millimeter fällt weg. Die dreißig Formate hier entstehen aus drei, also gibt es eine Regel statt einer Tabelle.',
    'Pliez un A3 dans sa longueur et vous obtenez un A4 ; pliez-le encore et c’est un A5. Plier 420 donne 210 ; plier 297 donne 148 et non 148,5 — le millimètre restant est laissé. Les trente formats de cette page viennent d’en plier trois : une règle à comprendre, pas un tableau à retenir.',
    'A3 को उसकी लंबी भुजा से मोड़ें तो A4 मिलता है; उसे मोड़ें तो A5। 420 को मोड़ने पर 210, पर 297 को मोड़ने पर 148.5 नहीं बल्कि 148 — बचा हुआ मिलीमीटर छोड़ दिया जाता है। इस पन्ने के तीस आकार तीन को मोड़ने से बने हैं, यानी रटने की तालिका नहीं, समझने का एक नियम।',
    '把 A3 沿长边对折就是 A4，再折就是 A5。420 对折得 210，297 对折得 148 而不是 148.5——多出的毫米直接舍去。本页的三十个规格都是从最上面三张折下来的，需要记的是折法，不是表格。',
    '把 A3 沿長邊對折就是 A4，再折就是 A5。420 對折得 210，297 對折得 148 而不是 148.5——多出的公釐直接捨去。本頁的三十個規格都是從最上面三張折下來的，需要記的是折法，不是表格。',
  ),

  rootTitle: T('A0 한 장이 1제곱미터입니다', 'One A0 is one square metre', 'Un A0 es un metro cuadrado', 'Um A0 é um metro quadrado', 'A0 1枚が1平方メートル', 'Ein A0 ist ein Quadratmeter', 'Un A0 fait un mètre carré', 'एक A0 यानी एक वर्ग मीटर', '一张 A0 就是一平方米', '一張 A0 就是一平方公尺'),

  rootNote: T(
    '넓이를 먼저 1제곱미터로 정하고 거기에 √2 비를 맞춘 것이 A0(841×1189)입니다. 그래서 A4 열여섯 장이 A0 한 장이고, 종이 무게를 g/m²로 적으면 장당 무게가 바로 나옵니다 — 80g 종이 A4 한 장이 5그램인 이유입니다. B0은 짧은 변이 딱 1미터, C0은 그 둘의 사이입니다.',
    'A0 (841×1189) is what you get when you fix the area at one square metre and then impose the √2 ratio. Sixteen A4 sheets make one A0, and because paper weight is printed in g/m², the weight of a single sheet falls straight out — that is why an 80 g A4 weighs 5 grams. B0 has a short side of exactly one metre, and C0 sits between the two.',
    'El A0 (841×1189) es lo que sale al fijar la superficie en un metro cuadrado e imponer la relación √2. Dieciséis hojas A4 hacen un A0 y, como el gramaje se indica en g/m², el peso de una hoja aparece solo: por eso un A4 de 80 g pesa 5 gramos. El B0 tiene el lado corto de un metro exacto y el C0 queda entre ambos.',
    'O A0 (841×1189) é o que sai ao fixar a área em um metro quadrado e impor a relação √2. Dezesseis folhas A4 fazem um A0 e, como a gramatura vem em g/m², o peso de uma folha aparece sozinho: por isso um A4 de 80 g pesa 5 gramas. O B0 tem o lado curto de exatamente um metro e o C0 fica entre os dois.',
    '面積を先に1平方メートルと決め、そこに√2の比を合わせたのがA0(841×1189)です。だからA4が16枚でA0 1枚になり、紙の重さをg/m²で書けば1枚の重さがそのまま出ます — 80gのA4が5グラムなのはそのためです。B0は短い辺がちょうど1メートル、C0はその間です。',
    'A0 (841×1189) entsteht, wenn man die Fläche auf einen Quadratmeter festlegt und darauf das √2-Verhältnis legt. Sechzehn A4-Blätter ergeben ein A0, und da Papiergewicht in g/m² angegeben wird, fällt das Blattgewicht direkt heraus — deshalb wiegt ein 80-g-A4 fünf Gramm. B0 hat exakt einen Meter Schmalseite, C0 liegt dazwischen.',
    'Le A0 (841×1189) naît de fixer la surface à un mètre carré puis d’imposer le rapport √2. Seize feuilles A4 font un A0, et comme le grammage s’écrit en g/m², le poids d’une feuille tombe tout seul : voilà pourquoi un A4 de 80 g pèse 5 grammes. Le B0 a un petit côté d’un mètre pile, et le C0 se place entre les deux.',
    'A0 (841×1189) तब बनता है जब क्षेत्रफल पहले एक वर्ग मीटर तय किया जाए और उस पर √2 अनुपात बिठाया जाए। सोलह A4 शीट मिलकर एक A0 बनती हैं, और चूँकि कागज़ का वज़न g/m² में लिखा होता है, एक शीट का वज़न सीधे निकल आता है — इसीलिए 80 g का A4 पाँच ग्राम का होता है। B0 की छोटी भुजा ठीक एक मीटर है और C0 दोनों के बीच।',
    'A0（841×1189）是先把面积定为一平方米，再套上 √2 比例的结果。十六张 A4 正好等于一张 A0；因为纸重按 g/m² 标注，单张重量直接就能算出——80g 的 A4 重 5 克就是这么来的。B0 的短边正好一米，C0 则在两者之间。',
    'A0（841×1189）是先把面積定為一平方公尺，再套上 √2 比例的結果。十六張 A4 正好等於一張 A0；因為紙重按 g/m² 標註，單張重量直接就能算出——80g 的 A4 重 5 克就是這麼來的。B0 的短邊正好一公尺，C0 則在兩者之間。',
  ),

  ratioTitle: T('복사기의 141%가 이 비입니다', 'The copier’s 141% is this ratio', 'El 141% de la fotocopiadora es esta relación', 'Os 141% da copiadora são essa relação', 'コピー機の141%がこの比です', 'Die 141 % am Kopierer sind dieses Verhältnis', 'Les 141 % du photocopieur, c’est ce rapport', 'कॉपियर का 141% यही अनुपात है', '复印机上的 141% 就是这个比', '影印機上的 141% 就是這個比'),

  ratioNote: T(
    '반으로 접어도 모양이 그대로이려면 긴 변과 짧은 변의 비가 √2, 즉 1.414여야 합니다. A4를 A3로 키우는 141%도, A3를 A4로 줄이는 71%도 이 수와 그 역수입니다. 미국 레터에는 이 성질이 없어서 확대·축소 배율이 규격마다 제각각입니다.',
    'For the shape to survive folding, the long side must be √2 — 1.414 — times the short one. The 141% that turns A4 into A3, and the 71% that turns A3 into A4, are that number and its inverse. US Letter has no such property, so its enlargement ratios differ from size to size.',
    'Para que la forma sobreviva al doblez, el lado largo debe ser √2 —1,414— veces el corto. El 141% que convierte A4 en A3 y el 71% que hace lo contrario son ese número y su inverso. La carta estadounidense no tiene esa propiedad, así que sus factores de ampliación cambian según el tamaño.',
    'Para a forma sobreviver à dobra, o lado maior precisa ser √2 — 1,414 — vezes o menor. Os 141% que transformam A4 em A3 e os 71% que fazem o contrário são esse número e seu inverso. O tamanho Carta não tem essa propriedade, então seus fatores de ampliação mudam conforme o tamanho.',
    '半分に折っても形が変わらないには、長い辺と短い辺の比が√2すなわち1.414でなければなりません。A4をA3にする141%も、A3をA4にする71%もこの数とその逆数です。米国のレターにはこの性質が無いので、拡大・縮小の倍率が規格ごとにばらばらです。',
    'Damit die Form das Falten übersteht, muss die lange Seite das √2-Fache — 1,414 — der kurzen sein. Die 141 %, die aus A4 ein A3 machen, und die 71 % für den Rückweg sind genau diese Zahl und ihr Kehrwert. US-Letter hat diese Eigenschaft nicht, weshalb dort jeder Sprung einen anderen Faktor braucht.',
    'Pour que la forme survive au pliage, le grand côté doit valoir √2 — 1,414 — fois le petit. Les 141 % qui font passer de A4 à A3, et les 71 % pour l’inverse, sont ce nombre et son inverse. Le format Letter n’a pas cette propriété : ses facteurs d’agrandissement changent à chaque saut.',
    'मोड़ने पर आकार वैसा ही रहे, इसके लिए लंबी भुजा छोटी की √2 यानी 1.414 गुना होनी चाहिए। A4 को A3 बनाने वाला 141% और उल्टा करने वाला 71% यही संख्या और उसका व्युत्क्रम हैं। अमेरिकी लेटर में यह गुण नहीं, इसलिए वहाँ हर आकार का अनुपात अलग होता है।',
    '要让对折后形状不变，长边必须是短边的 √2 倍，也就是 1.414。把 A4 放大成 A3 的 141%、把 A3 缩成 A4 的 71%，正是这个数和它的倒数。美国信纸没有这个性质，所以放缩倍率每种规格都不一样。',
    '要讓對折後形狀不變，長邊必須是短邊的 √2 倍，也就是 1.414。把 A4 放大成 A3 的 141%、把 A3 縮成 A4 的 71%，正是這個數和它的倒數。美國信紙沒有這個性質，所以放縮倍率每種規格都不一樣。',
  ),

  dpiTitle: T('인쇄는 300dpi, 화면은 96dpi', 'Print wants 300 dpi, screens use 96', 'La imprenta pide 300 ppp; la pantalla usa 96', 'A gráfica pede 300 dpi; a tela usa 96', '印刷は300dpi、画面は96dpi', 'Druck will 300 dpi, Bildschirme nutzen 96', 'L’impression veut 300 ppp, l’écran en utilise 96', 'प्रिंट को 300 dpi, स्क्रीन को 96', '印刷要 300dpi，屏幕是 96dpi', '印刷要 300dpi，螢幕是 96dpi'),

  dpiNote: T(
    '해상도는 1인치를 몇 점으로 나눌지입니다. 밀리미터를 25.4로 나눠 인치로 바꾼 뒤 그 수를 곱하면 픽셀이 나옵니다. 인쇄소에 넘기는 A4가 2480×3508인 것도 210mm가 8.27인치이고 거기에 300을 곱했기 때문입니다. 해상도를 두 배로 하면 픽셀 수는 네 배가 됩니다.',
    'Resolution is how many dots make up an inch. Divide the millimetres by 25.4 to get inches, multiply by that number, and you have pixels. A print-ready A4 is 2480×3508 because 210 mm is 8.27 inches and 8.27 × 300 is 2480. Double the resolution and the pixel count quadruples.',
    'La resolución es en cuántos puntos se divide una pulgada. Divide los milímetros entre 25,4 para obtener pulgadas, multiplica por ese número y tienes los píxeles. Un A4 listo para imprenta es 2480×3508 porque 210 mm son 8,27 pulgadas y 8,27 × 300 da 2480. Al duplicar la resolución, los píxeles se cuadruplican.',
    'Resolução é em quantos pontos uma polegada se divide. Divida os milímetros por 25,4 para ter polegadas, multiplique por esse número e saem os pixels. Um A4 pronto para gráfica é 2480×3508 porque 210 mm são 8,27 polegadas e 8,27 × 300 dá 2480. Ao dobrar a resolução, os pixels quadruplicam.',
    '解像度は1インチを何点に分けるかです。ミリを25.4で割ってインチにし、その数を掛けるとピクセルになります。印刷所に渡すA4が2480×3508なのも、210mmが8.27インチで300を掛けたからです。解像度を2倍にするとピクセル数は4倍になります。',
    'Auflösung sagt, in wie viele Punkte ein Zoll zerfällt. Millimeter durch 25,4 ergibt Zoll, mal dieser Zahl ergibt Pixel. Ein druckfertiges A4 misst 2480×3508, weil 210 mm 8,27 Zoll sind und 8,27 × 300 = 2480. Doppelte Auflösung heißt vierfache Pixelzahl.',
    'La résolution dit en combien de points se divise un pouce. Divisez les millimètres par 25,4 pour avoir des pouces, multipliez par ce nombre et vous obtenez des pixels. Un A4 prêt à imprimer fait 2480×3508 parce que 210 mm valent 8,27 pouces et 8,27 × 300 = 2480. Doubler la résolution quadruple le nombre de pixels.',
    'रिज़ॉल्यूशन यानी एक इंच कितने बिंदुओं में बँटा है। मिलीमीटर को 25.4 से भाग देकर इंच निकालें, उस संख्या से गुणा करें, पिक्सेल मिल जाते हैं। छपाई के लिए A4 2480×3508 इसलिए है क्योंकि 210 mm यानी 8.27 इंच और 8.27 × 300 = 2480। रिज़ॉल्यूशन दोगुना करने पर पिक्सेल चार गुना हो जाते हैं।',
    '分辨率是把一英寸分成多少个点。把毫米除以 25.4 换成英寸，再乘这个数就是像素。送印的 A4 是 2480×3508，因为 210mm 等于 8.27 英寸，8.27 × 300 就是 2480。分辨率翻倍，像素数变四倍。',
    '解析度是把一英寸分成多少個點。把公釐除以 25.4 換成英寸，再乘這個數就是像素。送印的 A4 是 2480×3508，因為 210mm 等於 8.27 英寸，8.27 × 300 就是 2480。解析度加倍，像素數變四倍。',
  ),

  weightTitle: T('A4 한 장이 5그램인 이유', 'Why an A4 sheet weighs 5 grams', 'Por qué una hoja A4 pesa 5 gramos', 'Por que uma folha A4 pesa 5 gramas', 'A4 1枚が5グラムの理由', 'Warum ein A4-Blatt fünf Gramm wiegt', 'Pourquoi une feuille A4 pèse 5 grammes', 'A4 शीट 5 ग्राम की क्यों', 'A4 一张为什么是 5 克', 'A4 一張為什麼是 5 克'),

  weightNote: T(
    '종이 무게는 g/m², 즉 1제곱미터의 그램으로 적습니다. A4는 A0의 16분의 1이므로 넓이가 0.0625제곱미터이고, 80g 종이라면 5그램입니다. 우편 한 통이 25그램 안에 들어야 한다면 80g 종이로 다섯 장까지입니다.',
    'Paper weight is printed as g/m² — grams for one square metre. An A4 is a sixteenth of an A0, so 0.0625 m²; at 80 g that is 5 grams. If a letter must stay under 25 grams, 80 g paper gives you five sheets.',
    'El gramaje se indica en g/m², gramos por metro cuadrado. Un A4 es la dieciseisava parte de un A0, o sea 0,0625 m²; a 80 g eso son 5 gramos. Si una carta debe quedar bajo 25 gramos, con papel de 80 g caben cinco hojas.',
    'A gramatura vem em g/m² — gramas por metro quadrado. Um A4 é um dezesseis avos de um A0, ou 0,0625 m²; a 80 g isso dá 5 gramas. Se uma carta precisa ficar abaixo de 25 gramas, papel de 80 g permite cinco folhas.',
    '紙の重さはg/m²、つまり1平方メートルのグラムで書きます。A4はA0の16分の1なので面積は0.0625平方メートル、80gの紙なら5グラムです。封書を25グラム以内に収めるなら80gの紙で5枚までです。',
    'Papiergewicht steht als g/m² — Gramm je Quadratmeter. Ein A4 ist ein Sechzehntel eines A0, also 0,0625 m²; bei 80 g sind das fünf Gramm. Soll ein Brief unter 25 Gramm bleiben, sind das mit 80-g-Papier fünf Blatt.',
    'Le grammage s’écrit en g/m² — grammes par mètre carré. Un A4 est un seizième d’un A0, soit 0,0625 m² ; à 80 g cela fait 5 grammes. Si une lettre doit rester sous 25 grammes, du papier 80 g en autorise cinq feuilles.',
    'कागज़ का वज़न g/m² में लिखा जाता है — एक वर्ग मीटर के ग्राम। A4, A0 का सोलहवाँ भाग है यानी 0.0625 m²; 80 g कागज़ पर वह 5 ग्राम बनता है। पत्र को 25 ग्राम के भीतर रखना हो तो 80 g कागज़ की पाँच शीट तक।',
    '纸重按 g/m² 标注，也就是一平方米的克数。A4 是 A0 的十六分之一，面积 0.0625 平方米，80g 的纸就是 5 克。若一封信要控制在 25 克以内，80g 纸最多五张。',
    '紙重按 g/m² 標註，也就是一平方公尺的克數。A4 是 A0 的十六分之一，面積 0.0625 平方公尺，80g 的紙就是 5 克。若一封信要控制在 25 克以內，80g 紙最多五張。',
  ),

  letterTitle: T('레터는 A4보다 짧고 넓습니다', 'Letter is shorter and wider than A4', 'La carta es más corta y ancha que el A4', 'Carta é mais curta e larga que o A4', 'レターはA4より短くて広い', 'Letter ist kürzer und breiter als A4', 'Le Letter est plus court et plus large que l’A4', 'लेटर A4 से छोटा और चौड़ा है', '信纸比 A4 短而宽', '信紙比 A4 短而寬'),

  letterNote: T(
    '레터는 8.5×11인치, 즉 215.9×279.4mm입니다. A4(210×297)보다 6mm 넓고 18mm 짧아서, A4로 만든 문서를 레터에 인쇄하면 아래가 잘리거나 여백이 달라집니다. 인치로 정해진 규격은 접어도 비가 유지되지 않습니다.',
    'Letter is 8.5×11 inches, or 215.9×279.4 mm. That is 6 mm wider and 18 mm shorter than A4, so a document laid out for A4 loses its bottom or its margins when printed on Letter. Sizes defined in inches do not keep their ratio when folded.',
    'La carta mide 8,5×11 pulgadas, o 215,9×279,4 mm: 6 mm más ancha y 18 mm más corta que el A4, así que un documento maquetado en A4 pierde el pie o los márgenes al imprimirse en carta. Los tamaños definidos en pulgadas no conservan su relación al doblarse.',
    'Carta mede 8,5×11 polegadas, ou 215,9×279,4 mm: 6 mm mais larga e 18 mm mais curta que o A4, então um documento diagramado em A4 perde o rodapé ou as margens ao sair em Carta. Tamanhos definidos em polegadas não mantêm a relação ao dobrar.',
    'レターは8.5×11インチ、つまり215.9×279.4mmです。A4(210×297)より6mm広く18mm短いので、A4で組んだ書類をレターに印刷すると下が切れたり余白が変わったりします。インチで決まった規格は折っても比が保たれません。',
    'Letter misst 8,5×11 Zoll, also 215,9×279,4 mm — 6 mm breiter und 18 mm kürzer als A4. Ein für A4 gesetztes Dokument verliert auf Letter den Fuß oder die Ränder. In Zoll definierte Formate behalten ihr Verhältnis beim Falten nicht.',
    'Le Letter fait 8,5×11 pouces, soit 215,9×279,4 mm : 6 mm plus large et 18 mm plus court que l’A4. Un document composé pour A4 y perd son bas de page ou ses marges. Les formats définis en pouces ne conservent pas leur rapport au pliage.',
    'लेटर 8.5×11 इंच यानी 215.9×279.4 mm का है — A4 से 6 mm चौड़ा और 18 mm छोटा, इसलिए A4 के लिए बना दस्तावेज़ लेटर पर छपने पर नीचे से कट जाता है या हाशिये बदल जाते हैं। इंच में तय आकार मोड़ने पर अनुपात नहीं रखते।',
    '信纸是 8.5×11 英寸，即 215.9×279.4mm，比 A4 宽 6mm、短 18mm，所以按 A4 排的文件印在信纸上会切掉底部或改变边距。按英寸定义的规格对折后比例不保持。',
    '信紙是 8.5×11 英寸，即 215.9×279.4mm，比 A4 寬 6mm、短 18mm，所以按 A4 排的文件印在信紙上會切掉底部或改變邊距。按英寸定義的規格對折後比例不保持。',
  ),

  tableTitle: T('규격과 해상도로 찾기', 'Find it by size and resolution', 'Búscalo por tamaño y resolución', 'Ache por tamanho e resolução', 'サイズと解像度から探す', 'Nach Format und Auflösung suchen', 'Chercher par format et résolution', 'आकार और रिज़ॉल्यूशन से देखें', '按规格和分辨率查找', '按規格和解析度查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  dpiRowTitle: T('같은 규격, 다른 해상도', 'Same size, other resolutions', 'Mismo tamaño, otras resoluciones', 'Mesmo tamanho, outras resoluções', '同じ規格、別の解像度', 'Gleiches Format, andere Auflösungen', 'Même format, autres résolutions', 'वही आकार, दूसरे रिज़ॉल्यूशन', '同一规格，不同分辨率', '同一規格，不同解析度'),
  sizeRowTitle: T('같은 해상도, 다른 규격', 'Same resolution, other sizes', 'Misma resolución, otros tamaños', 'Mesma resolução, outros tamanhos', '同じ解像度、別の規格', 'Gleiche Auflösung, andere Formate', 'Même résolution, autres formats', 'वही रिज़ॉल्यूशन, दूसरे आकार', '同一分辨率，不同规格', '同一解析度，不同規格'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '치수는 밀리미터입니다. 접을 때 남는 밀리미터는 규격이 정한 대로 버립니다.',
      '픽셀은 반올림한 값입니다. 인쇄소는 대개 300dpi를 요구합니다.',
      '무게는 종이만 센 것입니다. 봉투와 잉크는 따로 더해야 합니다.',
      '레터·리걸은 인치로 정해진 규격이라 접어도 √2 비가 유지되지 않습니다.',
    ],
    [
      'Dimensions are in millimetres. Leftover fractions are dropped when folding, exactly as the standard says.',
      'Pixel counts are rounded. Printers usually ask for 300 dpi.',
      'The weight is the paper alone. Add the envelope and the ink separately.',
      'Letter and Legal are defined in inches, so folding them does not preserve the √2 ratio.',
    ],
    [
      'Las medidas están en milímetros. Al doblar, la fracción sobrante se descarta tal como manda la norma.',
      'Los píxeles están redondeados. Las imprentas suelen pedir 300 ppp.',
      'El peso es solo del papel. El sobre y la tinta se suman aparte.',
      'Carta y oficio se definen en pulgadas, así que doblarlos no conserva la relación √2.',
    ],
    [
      'As medidas estão em milímetros. Ao dobrar, a fração que sobra é descartada como manda a norma.',
      'Os pixels estão arredondados. Gráficas costumam pedir 300 dpi.',
      'O peso é só do papel. Envelope e tinta entram à parte.',
      'Carta e Ofício são definidos em polegadas, então dobrá-los não preserva a relação √2.',
    ],
    [
      '寸法はミリメートルです。折るときに余るミリは規格の通りに捨てます。',
      'ピクセルは四捨五入した値です。印刷所はたいてい300dpiを求めます。',
      '重さは紙だけです。封筒とインクは別に足してください。',
      'レターやリーガルはインチで決まった規格なので、折っても√2の比は保たれません。',
    ],
    [
      'Die Maße sind in Millimetern. Beim Falten fällt der Rest weg, genau wie es die Norm vorsieht.',
      'Pixelwerte sind gerundet. Druckereien verlangen meist 300 dpi.',
      'Das Gewicht ist nur das Papier. Umschlag und Tinte kommen extra dazu.',
      'Letter und Legal sind in Zoll definiert; Falten erhält dort das √2-Verhältnis nicht.',
    ],
    [
      'Les dimensions sont en millimètres. Au pliage, le reste est abandonné, comme le prévoit la norme.',
      'Les pixels sont arrondis. Les imprimeurs demandent en général 300 ppp.',
      'Le poids ne concerne que le papier. L’enveloppe et l’encre s’ajoutent à part.',
      'Letter et Legal sont définis en pouces : les plier ne conserve pas le rapport √2.',
    ],
    [
      'माप मिलीमीटर में हैं। मोड़ते समय बचा हुआ हिस्सा मानक के अनुसार छोड़ दिया जाता है।',
      'पिक्सेल गोल किए गए हैं। प्रिंटर आम तौर पर 300 dpi माँगते हैं।',
      'वज़न केवल कागज़ का है। लिफ़ाफ़ा और स्याही अलग से जोड़ें।',
      'लेटर और लीगल इंच में तय हैं, इसलिए मोड़ने पर √2 अनुपात नहीं बचता।',
    ],
    [
      '尺寸单位是毫米。对折时多出的部分按标准舍去。',
      '像素是取整后的值。印刷厂通常要求 300dpi。',
      '重量只算纸本身，信封和油墨要另外加。',
      '信纸和法律纸按英寸定义，对折后不保持 √2 比例。',
    ],
    [
      '尺寸單位是公釐。對折時多出的部分按標準捨去。',
      '像素是取整後的值。印刷廠通常要求 300dpi。',
      '重量只算紙本身，信封和油墨要另外加。',
      '信紙和法律紙按英寸定義，對折後不保持 √2 比例。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '종이 규격표 — A·B·C 계열과 레터, 해상도별 픽셀',
    'Paper size chart — A, B, C series and Letter, in pixels at every resolution',
    'Tabla de tamaños de papel — series A, B, C y carta, en píxeles',
    'Tabela de tamanhos de papel — séries A, B, C e Carta, em pixels',
    '紙のサイズ一覧 — A判・B判・C判とレター、解像度別ピクセル',
    'Papierformat-Tabelle — Reihen A, B, C und Letter, in Pixeln',
    'Tableau des formats — séries A, B, C et Letter, en pixels',
    'कागज़ आकार चार्ट — A, B, C श्रेणी और लेटर, पिक्सेल में',
    '纸张规格表 — A、B、C 系列与信纸的各分辨率像素',
    '紙張規格表 — A、B、C 系列與信紙的各解析度像素',
  ),

  hubMetaDesc: T(
    'A4는 210×297mm이고 300dpi로는 2480×3508픽셀입니다. 규격 35가지와 해상도 8가지가 만나는 280칸마다 밀리미터·인치·픽셀·장당 무게를 계산했습니다.',
    'A4 is 210×297 mm, or 2480×3508 pixels at 300 dpi. For all 280 pairings of 35 sizes and 8 resolutions: millimetres, inches, pixels and the weight of a sheet.',
    'El A4 mide 210×297 mm, o 2480×3508 píxeles a 300 ppp. Para los 280 cruces de 35 tamaños y 8 resoluciones: milímetros, pulgadas, píxeles y peso por hoja.',
    'O A4 mede 210×297 mm, ou 2480×3508 pixels a 300 dpi. Para os 280 cruzamentos de 35 tamanhos e 8 resoluções: milímetros, polegadas, pixels e peso por folha.',
    'A4は210×297mm、300dpiなら2480×3508ピクセルです。規格35通りと解像度8通りが出会う280マスごとのミリ・インチ・ピクセル・1枚の重さを計算しました。',
    'A4 misst 210×297 mm, bei 300 dpi 2480×3508 Pixel. Für alle 280 Kombinationen aus 35 Formaten und 8 Auflösungen: Millimeter, Zoll, Pixel und Blattgewicht.',
    'L’A4 fait 210×297 mm, soit 2480×3508 pixels à 300 ppp. Pour les 280 croisements de 35 formats et 8 résolutions : millimètres, pouces, pixels et poids de la feuille.',
    'A4 यानी 210×297 mm, और 300 dpi पर 2480×3508 पिक्सेल। 35 आकार और 8 रिज़ॉल्यूशन के सभी 280 मेलों के मिलीमीटर, इंच, पिक्सेल और शीट का वज़न।',
    'A4 是 210×297mm，300dpi 下为 2480×3508 像素。35 种规格与 8 种分辨率交汇的 280 格，每格的毫米、英寸、像素与单张重量。',
    'A4 是 210×297mm，300dpi 下為 2480×3508 像素。35 種規格與 8 種解析度交匯的 280 格，每格的公釐、英寸、像素與單張重量。',
  ),

  desc: T<(f: PaperFacts) => string>(
    f => `${f.sheet.short}×${f.sheet.long}mm를 ${f.cell.dpi}dpi로 찍으면 ${f.pixels.w}×${f.pixels.h}픽셀입니다. 80g 종이라면 한 장이 ${f.weights[1].grams}그램입니다.`,
    f => `${f.sheet.short}×${f.sheet.long} mm at ${f.cell.dpi} dpi comes to ${f.pixels.w}×${f.pixels.h} pixels. On 80 g paper one sheet weighs ${f.weights[1].grams} grams.`,
    f => `${f.sheet.short}×${f.sheet.long} mm a ${f.cell.dpi} ppp dan ${f.pixels.w}×${f.pixels.h} píxeles. En papel de 80 g una hoja pesa ${f.weights[1].grams} gramos.`,
    f => `${f.sheet.short}×${f.sheet.long} mm a ${f.cell.dpi} dpi dá ${f.pixels.w}×${f.pixels.h} pixels. Em papel de 80 g uma folha pesa ${f.weights[1].grams} gramas.`,
    f => `${f.sheet.short}×${f.sheet.long}mmを${f.cell.dpi}dpiで出力すると${f.pixels.w}×${f.pixels.h}ピクセルです。80gの紙なら1枚${f.weights[1].grams}グラムです。`,
    f => `${f.sheet.short}×${f.sheet.long} mm ergeben bei ${f.cell.dpi} dpi ${f.pixels.w}×${f.pixels.h} Pixel. Auf 80-g-Papier wiegt ein Blatt ${f.weights[1].grams} Gramm.`,
    f => `${f.sheet.short}×${f.sheet.long} mm à ${f.cell.dpi} ppp donnent ${f.pixels.w}×${f.pixels.h} pixels. Sur du papier 80 g, une feuille pèse ${f.weights[1].grams} grammes.`,
    f => `${f.sheet.short}×${f.sheet.long} mm को ${f.cell.dpi} dpi पर लेने से ${f.pixels.w}×${f.pixels.h} पिक्सेल बनते हैं। 80 g कागज़ पर एक शीट ${f.weights[1].grams} ग्राम की होती है।`,
    f => `${f.sheet.short}×${f.sheet.long}mm 在 ${f.cell.dpi}dpi 下是 ${f.pixels.w}×${f.pixels.h} 像素。用 80g 的纸，一张重 ${f.weights[1].grams} 克。`,
    f => `${f.sheet.short}×${f.sheet.long}mm 在 ${f.cell.dpi}dpi 下是 ${f.pixels.w}×${f.pixels.h} 像素。用 80g 的紙，一張重 ${f.weights[1].grams} 克。`,
  ),

  metaTitle: T<(f: PaperFacts) => string>(
    f => `${nameKo(f.cell.size.key)} ${f.cell.dpi}dpi — ${f.pixels.w}×${f.pixels.h}픽셀`,
    f => `${nameEn(f.cell.size.key)} at ${f.cell.dpi} dpi — ${f.pixels.w}×${f.pixels.h} pixels`,
    f => `${nameEs(f.cell.size.key)} a ${f.cell.dpi} ppp — ${f.pixels.w}×${f.pixels.h} píxeles`,
    f => `${namePt(f.cell.size.key)} a ${f.cell.dpi} dpi — ${f.pixels.w}×${f.pixels.h} pixels`,
    f => `${nameJa(f.cell.size.key)} ${f.cell.dpi}dpi — ${f.pixels.w}×${f.pixels.h}ピクセル`,
    f => `${nameDe(f.cell.size.key)} bei ${f.cell.dpi} dpi — ${f.pixels.w}×${f.pixels.h} Pixel`,
    f => `${nameFr(f.cell.size.key)} à ${f.cell.dpi} ppp — ${f.pixels.w}×${f.pixels.h} pixels`,
    f => `${nameHi(f.cell.size.key)} ${f.cell.dpi} dpi — ${f.pixels.w}×${f.pixels.h} पिक्सेल`,
    f => `${nameZh(f.cell.size.key)} ${f.cell.dpi}dpi — ${f.pixels.w}×${f.pixels.h} 像素`,
    f => `${nameTw(f.cell.size.key)} ${f.cell.dpi}dpi — ${f.pixels.w}×${f.pixels.h} 像素`,
  ),

  metaDesc: T<(f: PaperFacts) => string>(
    f => `${nameKo(f.cell.size.key)}는 ${f.sheet.short}×${f.sheet.long}mm(${f.inches.short}×${f.inches.long}인치)입니다. ${f.cell.dpi}dpi로는 ${f.pixels.w}×${f.pixels.h}픽셀, 80g 종이 한 장은 ${f.weights[1].grams}그램입니다.`,
    f => `${nameEn(f.cell.size.key)} is ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} in). At ${f.cell.dpi} dpi that is ${f.pixels.w}×${f.pixels.h} pixels, and one 80 g sheet weighs ${f.weights[1].grams} g.`,
    f => `${nameEs(f.cell.size.key)} mide ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} pulgadas). A ${f.cell.dpi} ppp son ${f.pixels.w}×${f.pixels.h} píxeles y una hoja de 80 g pesa ${f.weights[1].grams} g.`,
    f => `${namePt(f.cell.size.key)} mede ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} pol). A ${f.cell.dpi} dpi são ${f.pixels.w}×${f.pixels.h} pixels e uma folha de 80 g pesa ${f.weights[1].grams} g.`,
    f => `${nameJa(f.cell.size.key)}は${f.sheet.short}×${f.sheet.long}mm(${f.inches.short}×${f.inches.long}インチ)です。${f.cell.dpi}dpiでは${f.pixels.w}×${f.pixels.h}ピクセル、80gの紙1枚は${f.weights[1].grams}グラムです。`,
    f => `${nameDe(f.cell.size.key)} misst ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} Zoll). Bei ${f.cell.dpi} dpi sind das ${f.pixels.w}×${f.pixels.h} Pixel, ein 80-g-Blatt wiegt ${f.weights[1].grams} g.`,
    f => `${nameFr(f.cell.size.key)} fait ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} po). À ${f.cell.dpi} ppp cela donne ${f.pixels.w}×${f.pixels.h} pixels, et une feuille de 80 g pèse ${f.weights[1].grams} g.`,
    f => `${nameHi(f.cell.size.key)} का माप ${f.sheet.short}×${f.sheet.long} mm (${f.inches.short}×${f.inches.long} इंच) है। ${f.cell.dpi} dpi पर यह ${f.pixels.w}×${f.pixels.h} पिक्सेल है, और 80 g की एक शीट ${f.weights[1].grams} g की होती है।`,
    f => `${nameZh(f.cell.size.key)} 为 ${f.sheet.short}×${f.sheet.long}mm（${f.inches.short}×${f.inches.long} 英寸）。${f.cell.dpi}dpi 下是 ${f.pixels.w}×${f.pixels.h} 像素，80g 一张重 ${f.weights[1].grams} 克。`,
    f => `${nameTw(f.cell.size.key)} 為 ${f.sheet.short}×${f.sheet.long}mm（${f.inches.short}×${f.inches.long} 英寸）。${f.cell.dpi}dpi 下是 ${f.pixels.w}×${f.pixels.h} 像素，80g 一張重 ${f.weights[1].grams} 克。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'A4는 몇 mm인가요?', a: '210×297mm입니다. A0(841×1189)을 네 번 접은 크기이고, 인치로는 8.27×11.69입니다.' },
      { q: 'A4를 300dpi로 만들면 몇 픽셀인가요?', a: '2480×3508픽셀입니다. 210mm는 8.27인치이고 거기에 300을 곱한 값입니다.' },
      { q: '복사기의 141%는 무슨 숫자인가요?', a: '√2입니다. A4를 A3로 키우는 배율이고, 거꾸로 줄일 때는 그 역수인 71%를 씁니다.' },
      { q: 'A4 한 장은 몇 그램인가요?', a: '80g 종이면 약 5그램입니다. 넓이가 0.0625제곱미터라서 평량에 그 값을 곱하면 나옵니다.' },
      { q: 'A4는 어떤 봉투에 들어가나요?', a: 'C4 봉투(229×324mm)에 접지 않고 들어갑니다. 반으로 접으면 C5, 셋으로 접으면 DL 봉투에 들어갑니다.' },
    ],
    [
      { q: 'How big is A4?', a: '210×297 mm — an A0 (841×1189) folded four times, or 8.27×11.69 inches.' },
      { q: 'How many pixels is A4 at 300 dpi?', a: '2480×3508. 210 mm is 8.27 inches, and 8.27 × 300 is 2480.' },
      { q: 'What is the 141% on a copier?', a: '√2. It is the factor that turns A4 into A3; going the other way you use its inverse, 71%.' },
      { q: 'How much does one A4 sheet weigh?', a: 'About 5 grams on 80 g paper. The area is 0.0625 m², so multiply that by the grammage.' },
      { q: 'What envelope does A4 fit?', a: 'A C4 envelope (229×324 mm) takes it unfolded. Folded once it fits C5; folded in three it fits a DL envelope.' },
    ],
    [
      { q: '¿Cuánto mide un A4?', a: '210×297 mm: un A0 (841×1189) doblado cuatro veces, o 8,27×11,69 pulgadas.' },
      { q: '¿Cuántos píxeles tiene un A4 a 300 ppp?', a: '2480×3508. 210 mm son 8,27 pulgadas y 8,27 × 300 da 2480.' },
      { q: '¿Qué es el 141% de la fotocopiadora?', a: '√2. Es el factor que convierte A4 en A3; en sentido contrario se usa su inverso, 71%.' },
      { q: '¿Cuánto pesa una hoja A4?', a: 'Unos 5 gramos en papel de 80 g. La superficie es 0,0625 m², basta multiplicarla por el gramaje.' },
      { q: '¿En qué sobre cabe un A4?', a: 'En un sobre C4 (229×324 mm) sin doblar. Doblado una vez cabe en C5; en tres partes, en un sobre DL.' },
    ],
    [
      { q: 'Quanto mede um A4?', a: '210×297 mm: um A0 (841×1189) dobrado quatro vezes, ou 8,27×11,69 polegadas.' },
      { q: 'Quantos pixels tem um A4 a 300 dpi?', a: '2480×3508. 210 mm são 8,27 polegadas e 8,27 × 300 dá 2480.' },
      { q: 'O que são os 141% da copiadora?', a: '√2. É o fator que transforma A4 em A3; no sentido inverso usa-se 71%.' },
      { q: 'Quanto pesa uma folha A4?', a: 'Cerca de 5 gramas em papel de 80 g. A área é 0,0625 m²; basta multiplicar pela gramatura.' },
      { q: 'Em que envelope cabe um A4?', a: 'Num envelope C4 (229×324 mm) sem dobrar. Dobrado uma vez cabe no C5; em três partes, num envelope DL.' },
    ],
    [
      { q: 'A4は何ミリですか？', a: '210×297mmです。A0(841×1189)を4回折った大きさで、インチでは8.27×11.69です。' },
      { q: 'A4を300dpiにすると何ピクセルですか？', a: '2480×3508ピクセルです。210mmは8.27インチで、それに300を掛けた値です。' },
      { q: 'コピー機の141%は何の数字ですか？', a: '√2です。A4をA3にする倍率で、縮めるときは逆数の71%を使います。' },
      { q: 'A4 1枚は何グラムですか？', a: '80gの紙なら約5グラムです。面積が0.0625平方メートルなので、坪量にこれを掛けます。' },
      { q: 'A4はどの封筒に入りますか？', a: 'C4封筒(229×324mm)に折らずに入ります。半分に折ればC5、三つ折りならDL封筒に入ります。' },
    ],
    [
      { q: 'Wie groß ist A4?', a: '210×297 mm — ein viermal gefaltetes A0 (841×1189), also 8,27×11,69 Zoll.' },
      { q: 'Wie viele Pixel hat A4 bei 300 dpi?', a: '2480×3508. 210 mm sind 8,27 Zoll, und 8,27 × 300 ergibt 2480.' },
      { q: 'Was bedeuten die 141 % am Kopierer?', a: '√2. Es ist der Faktor von A4 auf A3; in die andere Richtung nimmt man den Kehrwert, 71 %.' },
      { q: 'Wie schwer ist ein A4-Blatt?', a: 'Etwa fünf Gramm bei 80-g-Papier. Die Fläche beträgt 0,0625 m² — mal Grammatur.' },
      { q: 'In welchen Umschlag passt A4?', a: 'Ungefaltet in einen C4 (229×324 mm). Einmal gefaltet passt es in C5, dreifach gefaltet in einen DL-Umschlag.' },
    ],
    [
      { q: 'Quelle est la taille d’un A4 ?', a: '210×297 mm — un A0 (841×1189) plié quatre fois, soit 8,27×11,69 pouces.' },
      { q: 'Combien de pixels fait un A4 à 300 ppp ?', a: '2480×3508. 210 mm valent 8,27 pouces, et 8,27 × 300 = 2480.' },
      { q: 'Que représente le 141 % du photocopieur ?', a: '√2. C’est le facteur qui fait passer de A4 à A3 ; dans l’autre sens on prend son inverse, 71 %.' },
      { q: 'Combien pèse une feuille A4 ?', a: 'Environ 5 grammes en papier 80 g. Sa surface est de 0,0625 m² : il suffit de multiplier par le grammage.' },
      { q: 'Dans quelle enveloppe entre un A4 ?', a: 'Dans une C4 (229×324 mm) sans le plier. Plié en deux il entre en C5 ; plié en trois, dans une enveloppe DL.' },
    ],
    [
      { q: 'A4 कितने mm का होता है?', a: '210×297 mm — A0 (841×1189) को चार बार मोड़ने पर, यानी 8.27×11.69 इंच।' },
      { q: '300 dpi पर A4 कितने पिक्सेल का है?', a: '2480×3508। 210 mm यानी 8.27 इंच, और 8.27 × 300 = 2480।' },
      { q: 'कॉपियर पर 141% क्या है?', a: '√2। यही A4 को A3 बनाता है; उल्टी दिशा में इसका व्युत्क्रम 71% लिया जाता है।' },
      { q: 'A4 की एक शीट का वज़न कितना है?', a: '80 g कागज़ पर लगभग 5 ग्राम। क्षेत्रफल 0.0625 m² है, बस उसे ग्रामेज से गुणा करें।' },
      { q: 'A4 किस लिफ़ाफ़े में आता है?', a: 'C4 लिफ़ाफ़े (229×324 mm) में बिना मोड़े। एक बार मोड़ने पर C5 में और तीन में मोड़ने पर DL लिफ़ाफ़े में।' },
    ],
    [
      { q: 'A4 是多少毫米？', a: '210×297mm，是把 A0（841×1189）对折四次得到的，合 8.27×11.69 英寸。' },
      { q: 'A4 在 300dpi 下是多少像素？', a: '2480×3508。210mm 等于 8.27 英寸，乘以 300 就是 2480。' },
      { q: '复印机上的 141% 是什么数？', a: '是 √2。它把 A4 放大成 A3；反过来缩小时用它的倒数 71%。' },
      { q: '一张 A4 有多重？', a: '80g 的纸约 5 克。面积是 0.0625 平方米，乘以克重即可。' },
      { q: 'A4 能装进什么信封？', a: '不折叠可装进 C4 信封（229×324mm）。对折一次装 C5，折成三折装 DL 信封。' },
    ],
    [
      { q: 'A4 是多少公釐？', a: '210×297mm，是把 A0（841×1189）對折四次得到的，合 8.27×11.69 英寸。' },
      { q: 'A4 在 300dpi 下是多少像素？', a: '2480×3508。210mm 等於 8.27 英寸，乘以 300 就是 2480。' },
      { q: '影印機上的 141% 是什麼數？', a: '是 √2。它把 A4 放大成 A3；反過來縮小時用它的倒數 71%。' },
      { q: '一張 A4 有多重？', a: '80g 的紙約 5 克。面積是 0.0625 平方公尺，乘以克重即可。' },
      { q: 'A4 能裝進什麼信封？', a: '不折疊可裝進 C4 信封（229×324mm）。對折一次裝 C5，折成三折裝 DL 信封。' },
    ],
  ),

  cellFaq: T<(f: PaperFacts) => FaqItem[]>(
    f => [
      { q: `${nameKo(f.cell.size.key)}는 몇 mm인가요?`, a: `${f.sheet.short}×${f.sheet.long}mm이고 인치로는 ${f.inches.short}×${f.inches.long}입니다.` },
      { q: `${f.cell.dpi}dpi로는 몇 픽셀인가요?`, a: `${f.pixels.w}×${f.pixels.h}픽셀입니다. 다 합치면 ${f.megapixels}백만 화소이고, 압축 없이 담으면 ${f.rawMb}MB입니다.` },
      { q: `한 장이 몇 그램인가요?`, a: `80g 종이로 ${f.weights[1].grams}그램, 120g 종이로 ${f.weights[3].grams}그램입니다. 25그램 편지에는 ${f.lettersheets}장까지 들어갑니다.` },
      { q: `${f.envelope ? '어떤 봉투에 들어가나요?' : '접으면 어떤 크기가 되나요?'}`, a: `${f.envelope ? `${f.envelope.key.toUpperCase()} 봉투(${f.envelope.short}×${f.envelope.long}mm)에 들어갑니다.` : `${f.smaller ? `${f.smaller.key.toUpperCase()}(${f.smaller.short}×${f.smaller.long}mm)가 됩니다.` : '더 접는 규격이 없습니다.'}`}` },
    ],
    f => [
      { q: `How big is ${nameEn(f.cell.size.key)}?`, a: `${f.sheet.short}×${f.sheet.long} mm, or ${f.inches.short}×${f.inches.long} inches.` },
      { q: `How many pixels at ${f.cell.dpi} dpi?`, a: `${f.pixels.w}×${f.pixels.h}. That is ${f.megapixels} megapixels, or ${f.rawMb} MB uncompressed.` },
      { q: `What does one sheet weigh?`, a: `${f.weights[1].grams} g on 80 g paper, ${f.weights[3].grams} g on 120 g. A 25 g letter takes ${f.lettersheets} of them.` },
      { q: `${f.envelope ? 'What envelope does it fit?' : 'What does it become when folded?'}`, a: `${f.envelope ? `A ${f.envelope.key.toUpperCase()} envelope, ${f.envelope.short}×${f.envelope.long} mm.` : `${f.smaller ? `${f.smaller.key.toUpperCase()}, ${f.smaller.short}×${f.smaller.long} mm.` : 'There is no smaller size in this series.'}`}` },
    ],
    f => [
      { q: `¿Cuánto mide ${nameEs(f.cell.size.key)}?`, a: `${f.sheet.short}×${f.sheet.long} mm, o ${f.inches.short}×${f.inches.long} pulgadas.` },
      { q: `¿Cuántos píxeles a ${f.cell.dpi} ppp?`, a: `${f.pixels.w}×${f.pixels.h}. Son ${f.megapixels} megapíxeles, o ${f.rawMb} MB sin comprimir.` },
      { q: `¿Cuánto pesa una hoja?`, a: `${f.weights[1].grams} g en papel de 80 g y ${f.weights[3].grams} g en 120 g. En una carta de 25 g caben ${f.lettersheets}.` },
      { q: `${f.envelope ? '¿En qué sobre cabe?' : '¿En qué se convierte al doblarlo?'}`, a: `${f.envelope ? `En un sobre ${f.envelope.key.toUpperCase()}, de ${f.envelope.short}×${f.envelope.long} mm.` : `${f.smaller ? `En ${f.smaller.key.toUpperCase()}, ${f.smaller.short}×${f.smaller.long} mm.` : 'No hay un tamaño menor en esta serie.'}`}` },
    ],
    f => [
      { q: `Quanto mede ${namePt(f.cell.size.key)}?`, a: `${f.sheet.short}×${f.sheet.long} mm, ou ${f.inches.short}×${f.inches.long} polegadas.` },
      { q: `Quantos pixels a ${f.cell.dpi} dpi?`, a: `${f.pixels.w}×${f.pixels.h}. São ${f.megapixels} megapixels, ou ${f.rawMb} MB sem compressão.` },
      { q: `Quanto pesa uma folha?`, a: `${f.weights[1].grams} g em papel de 80 g e ${f.weights[3].grams} g em 120 g. Numa carta de 25 g cabem ${f.lettersheets}.` },
      { q: `${f.envelope ? 'Em que envelope cabe?' : 'No que se transforma ao dobrar?'}`, a: `${f.envelope ? `Num envelope ${f.envelope.key.toUpperCase()}, de ${f.envelope.short}×${f.envelope.long} mm.` : `${f.smaller ? `Em ${f.smaller.key.toUpperCase()}, ${f.smaller.short}×${f.smaller.long} mm.` : 'Não há tamanho menor nesta série.'}`}` },
    ],
    f => [
      { q: `${nameJa(f.cell.size.key)}は何ミリですか？`, a: `${f.sheet.short}×${f.sheet.long}mm、インチでは${f.inches.short}×${f.inches.long}です。` },
      { q: `${f.cell.dpi}dpiでは何ピクセルですか？`, a: `${f.pixels.w}×${f.pixels.h}ピクセルです。合計${f.megapixels}メガピクセル、無圧縮なら${f.rawMb}MBです。` },
      { q: `1枚は何グラムですか？`, a: `80gの紙で${f.weights[1].grams}グラム、120gで${f.weights[3].grams}グラムです。25グラムの封書には${f.lettersheets}枚まで入ります。` },
      { q: `${f.envelope ? 'どの封筒に入りますか？' : '折るとどの大きさになりますか？'}`, a: `${f.envelope ? `${f.envelope.key.toUpperCase()}封筒(${f.envelope.short}×${f.envelope.long}mm)に入ります。` : `${f.smaller ? `${f.smaller.key.toUpperCase()}(${f.smaller.short}×${f.smaller.long}mm)になります。` : 'これ以上小さい規格はありません。'}`}` },
    ],
    f => [
      { q: `Wie groß ist ${nameDe(f.cell.size.key)}?`, a: `${f.sheet.short}×${f.sheet.long} mm, also ${f.inches.short}×${f.inches.long} Zoll.` },
      { q: `Wie viele Pixel bei ${f.cell.dpi} dpi?`, a: `${f.pixels.w}×${f.pixels.h}. Das sind ${f.megapixels} Megapixel oder ${f.rawMb} MB unkomprimiert.` },
      { q: `Wie schwer ist ein Blatt?`, a: `${f.weights[1].grams} g bei 80-g-Papier, ${f.weights[3].grams} g bei 120 g. In einen 25-g-Brief passen ${f.lettersheets} davon.` },
      { q: `${f.envelope ? 'In welchen Umschlag passt es?' : 'Was wird daraus, wenn man es faltet?'}`, a: `${f.envelope ? `In einen ${f.envelope.key.toUpperCase()}-Umschlag, ${f.envelope.short}×${f.envelope.long} mm.` : `${f.smaller ? `${f.smaller.key.toUpperCase()}, ${f.smaller.short}×${f.smaller.long} mm.` : 'Ein kleineres Format gibt es in dieser Reihe nicht.'}`}` },
    ],
    f => [
      { q: `Quelle est la taille de ${nameFr(f.cell.size.key)} ?`, a: `${f.sheet.short}×${f.sheet.long} mm, soit ${f.inches.short}×${f.inches.long} pouces.` },
      { q: `Combien de pixels à ${f.cell.dpi} ppp ?`, a: `${f.pixels.w}×${f.pixels.h}. Cela fait ${f.megapixels} mégapixels, ou ${f.rawMb} Mo sans compression.` },
      { q: `Combien pèse une feuille ?`, a: `${f.weights[1].grams} g en papier 80 g, ${f.weights[3].grams} g en 120 g. Une lettre de 25 g en accepte ${f.lettersheets}.` },
      { q: `${f.envelope ? 'Dans quelle enveloppe entre-t-elle ?' : 'Que devient-elle une fois pliée ?'}`, a: `${f.envelope ? `Dans une enveloppe ${f.envelope.key.toUpperCase()}, ${f.envelope.short}×${f.envelope.long} mm.` : `${f.smaller ? `En ${f.smaller.key.toUpperCase()}, ${f.smaller.short}×${f.smaller.long} mm.` : 'Il n’y a pas de format plus petit dans cette série.'}`}` },
    ],
    f => [
      { q: `${nameHi(f.cell.size.key)} कितने mm का है?`, a: `${f.sheet.short}×${f.sheet.long} mm, यानी ${f.inches.short}×${f.inches.long} इंच।` },
      { q: `${f.cell.dpi} dpi पर कितने पिक्सेल?`, a: `${f.pixels.w}×${f.pixels.h}। कुल ${f.megapixels} मेगापिक्सेल, बिना संपीड़न ${f.rawMb} MB।` },
      { q: `एक शीट का वज़न कितना है?`, a: `80 g कागज़ पर ${f.weights[1].grams} g और 120 g पर ${f.weights[3].grams} g। 25 g के पत्र में ${f.lettersheets} शीट आती हैं।` },
      { q: `${f.envelope ? 'यह किस लिफ़ाफ़े में आता है?' : 'मोड़ने पर यह क्या बनता है?'}`, a: `${f.envelope ? `${f.envelope.key.toUpperCase()} लिफ़ाफ़े में (${f.envelope.short}×${f.envelope.long} mm)।` : `${f.smaller ? `${f.smaller.key.toUpperCase()} (${f.smaller.short}×${f.smaller.long} mm)।` : 'इस श्रेणी में इससे छोटा आकार नहीं है।'}`}` },
    ],
    f => [
      { q: `${nameZh(f.cell.size.key)} 是多少毫米？`, a: `${f.sheet.short}×${f.sheet.long}mm，合 ${f.inches.short}×${f.inches.long} 英寸。` },
      { q: `${f.cell.dpi}dpi 下是多少像素？`, a: `${f.pixels.w}×${f.pixels.h}。合计 ${f.megapixels} 百万像素，未压缩约 ${f.rawMb}MB。` },
      { q: `一张有多重？`, a: `80g 纸为 ${f.weights[1].grams} 克，120g 为 ${f.weights[3].grams} 克。25 克的信可装 ${f.lettersheets} 张。` },
      { q: `${f.envelope ? '能装进什么信封？' : '对折后变成什么规格？'}`, a: `${f.envelope ? `可装进 ${f.envelope.key.toUpperCase()} 信封（${f.envelope.short}×${f.envelope.long}mm）。` : `${f.smaller ? `变成 ${f.smaller.key.toUpperCase()}（${f.smaller.short}×${f.smaller.long}mm）。` : '这一系列没有更小的规格了。'}`}` },
    ],
    f => [
      { q: `${nameTw(f.cell.size.key)} 是多少公釐？`, a: `${f.sheet.short}×${f.sheet.long}mm，合 ${f.inches.short}×${f.inches.long} 英寸。` },
      { q: `${f.cell.dpi}dpi 下是多少像素？`, a: `${f.pixels.w}×${f.pixels.h}。合計 ${f.megapixels} 百萬像素，未壓縮約 ${f.rawMb}MB。` },
      { q: `一張有多重？`, a: `80g 紙為 ${f.weights[1].grams} 克，120g 為 ${f.weights[3].grams} 克。25 克的信可裝 ${f.lettersheets} 張。` },
      { q: `${f.envelope ? '能裝進什麼信封？' : '對折後變成什麼規格？'}`, a: `${f.envelope ? `可裝進 ${f.envelope.key.toUpperCase()} 信封（${f.envelope.short}×${f.envelope.long}mm）。` : `${f.smaller ? `變成 ${f.smaller.key.toUpperCase()}（${f.smaller.short}×${f.smaller.long}mm）。` : '這一系列沒有更小的規格了。'}`}` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PAPER_UI: L<PaperUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PaperUI>;
