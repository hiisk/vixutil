import type { CalcLang, CalcTable } from './types.ts';
import { DEV_UI } from './dev-tools.ts';

function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

export const DEV_COLOR: CalcTable = {
  en: {
    title: 'Colour converter',
    desc: 'Convert between HEX, RGB and HSL',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'Three ways of writing the same colour', p: 'HEX and RGB are the same numbers in different clothes — six hex digits are three bytes. HSL is a different arrangement of the same space: hue as an angle, saturation and lightness as percentages. Nothing is lost converting between them.' },
      { h: 'HSL is the one you can reason about', p: 'To make a colour lighter in RGB you have to nudge three numbers and hope. In HSL you raise L. That is why design systems tend to define palettes in HSL and ship them as HEX.' },
    ],
    faq: [
      { q: 'Why does my HEX have eight digits?', a: 'The last two are alpha — opacity from 00 to FF. This converter works with the six-digit opaque form.' },
      { q: 'Is #FFF the same as #FFFFFF?', a: 'Yes. The three-digit form doubles each digit, so #FFF expands to #FFFFFF and #1A2 to #11AA22.' },
      { q: 'Why does HSL lightness 50% not look mid-grey?', a: 'Because HSL lightness is arithmetic, not perceptual. Yellow at 50% looks far brighter than blue at 50%. For perceptual work, look at LCH or OKLCH.' },
    ],
    ui: withUi('en', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Preview', pick: 'Pick a colour' }),
  },
  es: {
    title: 'Conversor de color',
    desc: 'Convierte entre HEX, RGB y HSL',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'Tres formas de escribir el mismo color', p: 'HEX y RGB son los mismos números con otra ropa: seis dígitos hexadecimales son tres bytes. HSL es otra manera de recorrer el mismo espacio: el tono como ángulo, saturación y luminosidad como porcentajes. No se pierde nada al pasar de uno a otro.' },
      { h: 'HSL es el que se puede razonar', p: 'Para aclarar un color en RGB hay que mover tres números y cruzar los dedos. En HSL subes la L. Por eso los sistemas de diseño definen paletas en HSL y las entregan en HEX.' },
    ],
    faq: [
      { q: '¿Por qué mi HEX tiene ocho dígitos?', a: 'Los dos últimos son el alfa: la opacidad, de 00 a FF. Este conversor trabaja con la forma opaca de seis dígitos.' },
      { q: '¿#FFF es lo mismo que #FFFFFF?', a: 'Sí. La forma de tres dígitos duplica cada uno, así que #FFF se expande a #FFFFFF y #1A2 a #11AA22.' },
      { q: '¿Por qué una luminosidad HSL del 50% no parece gris medio?', a: 'Porque la luminosidad de HSL es aritmética, no perceptual. Un amarillo al 50% se ve mucho más claro que un azul al 50%. Para trabajo perceptual, mira LCH u OKLCH.' },
    ],
    ui: withUi('es', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Vista previa', pick: 'Elige un color' }),
  },
  'pt-br': {
    title: 'Conversor de cor',
    desc: 'Converta entre HEX, RGB e HSL',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'Três jeitos de escrever a mesma cor', p: 'HEX e RGB são os mesmos números com outra roupa: seis dígitos hexadecimais são três bytes. HSL é outro arranjo do mesmo espaço — matiz como ângulo, saturação e luminosidade como porcentagens. Nada se perde na conversão.' },
      { h: 'HSL é o que dá para raciocinar', p: 'Para clarear uma cor em RGB você mexe em três números e torce. Em HSL você sobe o L. É por isso que design systems definem paletas em HSL e entregam em HEX.' },
    ],
    faq: [
      { q: 'Por que meu HEX tem oito dígitos?', a: 'Os dois últimos são o alfa — opacidade de 00 a FF. Este conversor trabalha com a forma opaca de seis dígitos.' },
      { q: '#FFF é igual a #FFFFFF?', a: 'É. A forma de três dígitos duplica cada um, então #FFF vira #FFFFFF e #1A2 vira #11AA22.' },
      { q: 'Por que luminosidade HSL de 50% não parece cinza médio?', a: 'Porque a luminosidade do HSL é aritmética, não perceptual. Amarelo a 50% parece bem mais claro que azul a 50%. Para trabalho perceptual, olhe LCH ou OKLCH.' },
    ],
    ui: withUi('pt-br', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Prévia', pick: 'Escolha uma cor' }),
  },
  ja: {
    title: 'カラー変換',
    desc: 'HEX・RGB・HSL を相互に変換',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: '同じ色の三つの書き方', p: 'HEX と RGB は同じ数字の着替えです — 16進6桁は3バイトです。HSL は同じ空間の別の並べ方で、色相を角度、彩度と明度を百分率で表します。互いに変換しても失われるものはありません。' },
      { h: '考えやすいのは HSL', p: 'RGB で色を明るくするには三つの数字を勘で動かすことになります。HSL なら L を上げるだけです。デザインシステムがパレットを HSL で定義して HEX で配るのはそのためです。' },
    ],
    faq: [
      { q: 'HEX が8桁なのはなぜですか。', a: '末尾2桁はアルファ、つまり不透明度で 00〜FF です。この変換器は6桁の不透明な形を扱います。' },
      { q: '#FFF と #FFFFFF は同じですか。', a: '同じです。3桁の形は各桁を2回繰り返すので、#FFF は #FFFFFF に、#1A2 は #11AA22 になります。' },
      { q: 'HSL の明度50%が中間の灰色に見えないのはなぜですか。', a: 'HSL の明度は計算上のもので、見た目に合わせたものではないからです。黄の50%は青の50%よりずっと明るく見えます。見た目で揃えたいときは LCH や OKLCH を見てください。' },
    ],
    ui: withUi('ja', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'プレビュー', pick: '色を選ぶ' }),
  },
  de: {
    title: 'Farbumrechner',
    desc: 'Zwischen HEX, RGB und HSL umrechnen',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'Drei Schreibweisen derselben Farbe', p: 'HEX und RGB sind dieselben Zahlen in anderen Kleidern — sechs Hexziffern sind drei Bytes. HSL ordnet denselben Raum anders: Farbton als Winkel, Sättigung und Helligkeit in Prozent. Beim Umrechnen geht nichts verloren.' },
      { h: 'Mit HSL kann man denken', p: 'Um eine Farbe in RGB heller zu machen, schiebt man an drei Zahlen und hofft. In HSL erhöht man L. Deshalb definieren Designsysteme Paletten in HSL und liefern sie als HEX aus.' },
    ],
    faq: [
      { q: 'Warum hat mein HEX acht Stellen?', a: 'Die letzten beiden sind Alpha — die Deckkraft von 00 bis FF. Dieser Umrechner arbeitet mit der sechsstelligen, deckenden Form.' },
      { q: 'Ist #FFF dasselbe wie #FFFFFF?', a: 'Ja. Die dreistellige Form verdoppelt jede Ziffer, #FFF wird also zu #FFFFFF und #1A2 zu #11AA22.' },
      { q: 'Warum wirkt HSL-Helligkeit 50% nicht mittelgrau?', a: 'Weil die Helligkeit in HSL rechnerisch ist, nicht wahrnehmungsbezogen. Gelb bei 50% wirkt deutlich heller als Blau bei 50%. Für wahrnehmungsgerechtes Arbeiten sieh dir LCH oder OKLCH an.' },
    ],
    ui: withUi('de', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Vorschau', pick: 'Farbe wählen' }),
  },
  fr: {
    title: 'Convertisseur de couleur',
    desc: 'Convertir entre HEX, RGB et HSL',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'Trois écritures d’une même couleur', p: 'HEX et RGB, ce sont les mêmes nombres habillés autrement : six chiffres hexadécimaux font trois octets. HSL réorganise le même espace — teinte en angle, saturation et luminosité en pourcentages. Rien ne se perd d’un format à l’autre.' },
      { h: 'HSL, c’est celui avec lequel on raisonne', p: 'Pour éclaircir une couleur en RGB, on pousse trois nombres au jugé. En HSL, on augmente L. C’est pour cela que les design systems définissent les palettes en HSL et les livrent en HEX.' },
    ],
    faq: [
      { q: 'Pourquoi mon HEX fait-il huit chiffres ?', a: 'Les deux derniers sont l’alpha, l’opacité, de 00 à FF. Ce convertisseur traite la forme opaque à six chiffres.' },
      { q: '#FFF est-il identique à #FFFFFF ?', a: 'Oui. La forme à trois chiffres double chacun : #FFF devient #FFFFFF et #1A2 devient #11AA22.' },
      { q: 'Pourquoi une luminosité HSL de 50% ne paraît-elle pas gris moyen ?', a: 'Parce que la luminosité HSL est arithmétique, pas perceptuelle. Un jaune à 50% paraît bien plus clair qu’un bleu à 50%. Pour un travail perceptuel, regardez LCH ou OKLCH.' },
    ],
    ui: withUi('fr', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'Aperçu', pick: 'Choisir une couleur' }),
  },
  hi: {
    title: 'रंग कन्वर्टर',
    desc: 'HEX, RGB और HSL के बीच बदलें',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: 'एक ही रंग लिखने के तीन तरीक़े', p: 'HEX और RGB एक ही संख्याएँ हैं, बस कपड़े अलग — छह हेक्स अंक यानी तीन बाइट। HSL उसी जगह को दूसरी तरह सजाता है: रंगत कोण में, संतृप्ति और चमक प्रतिशत में। एक से दूसरे में जाने पर कुछ नहीं खोता।' },
      { h: 'सोचने लायक HSL ही है', p: 'RGB में रंग हल्का करना हो तो तीन संख्याएँ टटोलनी पड़ती हैं। HSL में बस L बढ़ा दीजिए। यही वजह है कि डिज़ाइन सिस्टम पैलेट HSL में तय करते हैं और HEX में देते हैं।' },
    ],
    faq: [
      { q: 'मेरे HEX में आठ अंक क्यों हैं?', a: 'आख़िरी दो अल्फ़ा हैं — अपारदर्शिता, 00 से FF तक। यह कन्वर्टर छह अंक वाले अपारदर्शी रूप पर चलता है।' },
      { q: 'क्या #FFF और #FFFFFF एक ही हैं?', a: 'हाँ। तीन अंक वाला रूप हर अंक को दोहरा देता है, इसलिए #FFF फैलकर #FFFFFF और #1A2 बनकर #11AA22 हो जाता है।' },
      { q: 'HSL की 50% चमक बीच का धूसर क्यों नहीं लगती?', a: 'क्योंकि HSL की चमक गणितीय है, दृष्टि-आधारित नहीं। 50% पर पीला 50% पर नीले से कहीं ज़्यादा चमकीला दिखता है। दृष्टि के हिसाब से काम करना हो तो LCH या OKLCH देखिए।' },
    ],
    ui: withUi('hi', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: 'झलक', pick: 'रंग चुनें' }),
  },
  'zh-hans': {
    title: '颜色转换',
    desc: '在 HEX、RGB、HSL 之间转换',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: '同一个颜色的三种写法', p: 'HEX 和 RGB 是同一组数字换了件衣服——六位十六进制就是三个字节。HSL 是把同一个空间换个方式摆开：色相是角度，饱和度和亮度是百分比。彼此转换不会丢东西。' },
      { h: 'HSL 是那个能推理的', p: '要在 RGB 里把颜色调亮，你得同时挪三个数字碰运气。在 HSL 里把 L 抬高就行。设计系统之所以用 HSL 定义色板、用 HEX 交付，原因就在这里。' },
    ],
    faq: [
      { q: '我的 HEX 为什么是八位？', a: '最后两位是 alpha，也就是不透明度，从 00 到 FF。这个转换器处理六位的不透明形式。' },
      { q: '#FFF 和 #FFFFFF 一样吗？', a: '一样。三位形式把每一位翻倍，所以 #FFF 展开成 #FFFFFF，#1A2 展开成 #11AA22。' },
      { q: '为什么 HSL 亮度 50% 看着不像中灰？', a: '因为 HSL 的亮度是算术上的，不是知觉上的。50% 的黄看起来比 50% 的蓝亮得多。要按知觉来做，看看 LCH 或 OKLCH。' },
    ],
    ui: withUi('zh-hans', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: '预览', pick: '选个颜色' }),
  },
  'zh-hant': {
    title: '顏色轉換',
    desc: '在 HEX、RGB、HSL 之間轉換',
    short: 'HEX ↔ RGB ↔ HSL',
    intro: [
      { h: '同一個顏色的三種寫法', p: 'HEX 和 RGB 是同一組數字換了件衣服——六位十六進位就是三個位元組。HSL 是把同一個空間換個方式攤開：色相是角度，飽和度和亮度是百分比。彼此轉換不會丟東西。' },
      { h: 'HSL 是那個能推理的', p: '要在 RGB 裡把顏色調亮，你得同時挪三個數字碰運氣。在 HSL 裡把 L 抬高就行。設計系統之所以用 HSL 定義色票、用 HEX 交付，原因就在這裡。' },
    ],
    faq: [
      { q: '我的 HEX 為什麼是八位？', a: '最後兩位是 alpha，也就是不透明度，從 00 到 FF。這個轉換器處理六位的不透明形式。' },
      { q: '#FFF 和 #FFFFFF 一樣嗎？', a: '一樣。三位形式把每一位翻倍，所以 #FFF 展開成 #FFFFFF，#1A2 展開成 #11AA22。' },
      { q: '為什麼 HSL 亮度 50% 看著不像中灰？', a: '因為 HSL 的亮度是算術上的，不是知覺上的。50% 的黃看起來比 50% 的藍亮得多。要按知覺來做，看看 LCH 或 OKLCH。' },
    ],
    ui: withUi('zh-hant', { hex: 'HEX', rgb: 'RGB', hsl: 'HSL', preview: '預覽', pick: '選個顏色' }),
  },
};

export const DEV_SQL: CalcTable = {
  en: {
    title: 'SQL formatter',
    desc: 'Format a SQL query with keywords on their own lines',
    short: 'Format · indent · keyword case',
    intro: [
      { h: 'Readable beats compact', p: 'Putting each major clause on its own line makes the shape of a query visible at a glance — how many joins, where the filtering happens, whether that subquery is doing more than you thought.' },
      { h: 'Formatting only, no parsing', p: 'This lays out the text; it does not understand your schema or check that the query is valid. Run it against the database for that.' },
    ],
    faq: [
      { q: 'Does it change my query?', a: 'Only whitespace and, if you ask, keyword capitalisation. The tokens themselves are untouched, so behaviour does not change.' },
      { q: 'Which dialects work?', a: 'The common clause keywords are shared across MySQL, PostgreSQL, SQLite and SQL Server, so those all format sensibly. Vendor-specific syntax passes through unchanged.' },
      { q: 'Is my query sent anywhere?', a: 'No. Formatting happens in your browser — which matters, because queries often carry table and column names you would rather not publish.' },
    ],
    ui: withUi('en', { sql: 'SQL', formatted: 'Formatted', upper: 'Uppercase keywords' }),
  },
  es: {
    title: 'Formateador de SQL',
    desc: 'Formatea una consulta SQL con las cláusulas en su propia línea',
    short: 'Formatear · sangrar · mayúsculas',
    intro: [
      { h: 'Legible antes que compacto', p: 'Poner cada cláusula principal en su línea deja ver la forma de la consulta de un vistazo: cuántos joins hay, dónde se filtra, si esa subconsulta hace más de lo que creías.' },
      { h: 'Solo formatea, no analiza', p: 'Esto ordena el texto; no entiende tu esquema ni comprueba que la consulta sea válida. Para eso, ejecútala contra la base de datos.' },
    ],
    faq: [
      { q: '¿Cambia mi consulta?', a: 'Solo los espacios y, si lo pides, las mayúsculas de las palabras clave. Los tokens quedan intactos, así que el comportamiento no cambia.' },
      { q: '¿Qué dialectos admite?', a: 'Las palabras clave de cláusula son comunes a MySQL, PostgreSQL, SQLite y SQL Server, así que todas se formatean bien. La sintaxis específica de cada motor pasa sin tocar.' },
      { q: '¿Se envía mi consulta a algún sitio?', a: 'No. El formateo ocurre en tu navegador, y eso importa: las consultas suelen llevar nombres de tablas y columnas que preferirías no publicar.' },
    ],
    ui: withUi('es', { sql: 'SQL', formatted: 'Formateado', upper: 'Palabras clave en mayúsculas' }),
  },
  'pt-br': {
    title: 'Formatador de SQL',
    desc: 'Formate uma consulta SQL com as cláusulas em linhas próprias',
    short: 'Formatar · indentar · maiúsculas',
    intro: [
      { h: 'Legível vale mais que compacto', p: 'Colocar cada cláusula principal na própria linha deixa a forma da consulta visível de relance — quantos joins existem, onde a filtragem acontece, se aquela subconsulta faz mais do que você imaginava.' },
      { h: 'Só formata, não analisa', p: 'Isto arruma o texto; não entende seu esquema nem confere se a consulta é válida. Para isso, rode no banco.' },
    ],
    faq: [
      { q: 'Muda a minha consulta?', a: 'Só o espaçamento e, se você pedir, a caixa das palavras-chave. Os tokens ficam intactos, então o comportamento não muda.' },
      { q: 'Quais dialetos funcionam?', a: 'As palavras-chave de cláusula são comuns a MySQL, PostgreSQL, SQLite e SQL Server, então todas formatam bem. Sintaxe específica de fornecedor passa sem alteração.' },
      { q: 'Minha consulta é enviada para algum lugar?', a: 'Não. A formatação acontece no navegador — e isso importa, porque consultas costumam carregar nomes de tabelas e colunas que você prefere não publicar.' },
    ],
    ui: withUi('pt-br', { sql: 'SQL', formatted: 'Formatado', upper: 'Palavras-chave em maiúsculas' }),
  },
  ja: {
    title: 'SQL 整形',
    desc: '主要な句を行頭に置いて SQL を読みやすく整える',
    short: '整形・字下げ・大文字化',
    intro: [
      { h: '詰めるより読めるほうがよい', p: '主要な句をそれぞれ行頭に置くと、クエリの形がひと目で見えます。結合がいくつあるか、絞り込みがどこで起きるか、その副問い合わせが思ったより仕事をしていないか。' },
      { h: '整形するだけで、解析はしません', p: '文字列を並べ直すだけです。スキーマを理解しませんし、クエリが妥当かどうかも確かめません。それはデータベースに投げて確かめてください。' },
    ],
    faq: [
      { q: 'クエリの内容は変わりますか。', a: '変わるのは空白と、指定したときのキーワードの大文字化だけです。トークン自体は触らないので、動きは変わりません。' },
      { q: 'どの方言に対応していますか。', a: '句のキーワードは MySQL・PostgreSQL・SQLite・SQL Server で共通なので、いずれもきれいに整います。製品固有の構文はそのまま通します。' },
      { q: 'クエリはどこかに送られますか。', a: '送られません。整形はブラウザ内で行います。クエリにはテーブル名や列名が入りがちなので、これは大事な点です。' },
    ],
    ui: withUi('ja', { sql: 'SQL', formatted: '整形結果', upper: 'キーワードを大文字に' }),
  },
  de: {
    title: 'SQL-Formatierer',
    desc: 'Eine SQL-Abfrage mit Schlüsselwörtern auf eigenen Zeilen formatieren',
    short: 'Formatieren · einrücken · Großschreibung',
    intro: [
      { h: 'Lesbar schlägt kompakt', p: 'Jede Hauptklausel auf eine eigene Zeile zu setzen macht die Form der Abfrage auf einen Blick sichtbar — wie viele Joins es gibt, wo gefiltert wird, ob jene Unterabfrage mehr tut als gedacht.' },
      { h: 'Nur Formatierung, kein Parsen', p: 'Hier wird der Text umgebrochen; das Schema wird nicht verstanden und die Gültigkeit nicht geprüft. Dafür lass die Abfrage gegen die Datenbank laufen.' },
    ],
    faq: [
      { q: 'Verändert das meine Abfrage?', a: 'Nur Leerraum und, auf Wunsch, die Großschreibung der Schlüsselwörter. Die Tokens selbst bleiben unangetastet, das Verhalten ändert sich also nicht.' },
      { q: 'Welche Dialekte funktionieren?', a: 'Die üblichen Klausel-Schlüsselwörter sind bei MySQL, PostgreSQL, SQLite und SQL Server gleich, alle formatieren sich also sinnvoll. Herstellerspezifische Syntax läuft unverändert durch.' },
      { q: 'Wird meine Abfrage irgendwohin geschickt?', a: 'Nein. Formatiert wird im Browser — was zählt, denn Abfragen tragen oft Tabellen- und Spaltennamen, die man lieber nicht veröffentlicht.' },
    ],
    ui: withUi('de', { sql: 'SQL', formatted: 'Formatiert', upper: 'Schlüsselwörter groß' }),
  },
  fr: {
    title: 'Formateur SQL',
    desc: 'Mettre en forme une requête SQL avec les clauses en début de ligne',
    short: 'Formater · indenter · majuscules',
    intro: [
      { h: 'Lisible vaut mieux que compact', p: 'Placer chaque clause principale sur sa ligne rend la forme de la requête visible d’un coup d’œil : combien de jointures, où se fait le filtrage, si cette sous-requête en fait plus que prévu.' },
      { h: 'Mise en forme seulement, pas d’analyse', p: 'On réagence le texte ; on ne comprend pas votre schéma et on ne vérifie pas la validité. Pour cela, exécutez la requête sur la base.' },
    ],
    faq: [
      { q: 'Cela modifie-t-il ma requête ?', a: 'Seulement les espaces et, si vous le demandez, la casse des mots-clés. Les jetons eux-mêmes ne bougent pas : le comportement ne change pas.' },
      { q: 'Quels dialectes fonctionnent ?', a: 'Les mots-clés de clause sont communs à MySQL, PostgreSQL, SQLite et SQL Server : tous se mettent en forme correctement. La syntaxe propre à un éditeur passe telle quelle.' },
      { q: 'Ma requête part-elle quelque part ?', a: 'Non. La mise en forme se fait dans votre navigateur — ce qui compte, car les requêtes portent souvent des noms de tables et de colonnes qu’on préfère ne pas publier.' },
    ],
    ui: withUi('fr', { sql: 'SQL', formatted: 'Mis en forme', upper: 'Mots-clés en majuscules' }),
  },
  hi: {
    title: 'SQL फ़ॉर्मैटर',
    desc: 'SQL क्वेरी को इस तरह सजाएँ कि हर मुख्य खंड अपनी पंक्ति में आए',
    short: 'फ़ॉर्मैट · इंडेंट · बड़े अक्षर',
    intro: [
      { h: 'सटा हुआ नहीं, पढ़ने लायक चाहिए', p: 'हर मुख्य खंड को अपनी पंक्ति में रखने से क्वेरी का आकार एक नज़र में दिख जाता है — कितने जॉइन हैं, छँटाई कहाँ हो रही है, वह सबक्वेरी आपके सोचे से ज़्यादा काम तो नहीं कर रही।' },
      { h: 'सिर्फ़ सजावट, कोई विश्लेषण नहीं', p: 'यह टेक्स्ट को क़रीने से रखता है; आपके स्कीमा को नहीं समझता और यह भी नहीं जाँचता कि क्वेरी सही है या नहीं। उसके लिए उसे डेटाबेस पर चलाइए।' },
    ],
    faq: [
      { q: 'क्या यह मेरी क्वेरी बदल देता है?', a: 'सिर्फ़ ख़ाली जगह, और आप कहें तो कीवर्ड के बड़े अक्षर। टोकन ज्यों के त्यों रहते हैं, इसलिए व्यवहार नहीं बदलता।' },
      { q: 'कौन-से डायलेक्ट चलते हैं?', a: 'खंडों के कीवर्ड MySQL, PostgreSQL, SQLite और SQL Server में साझा हैं, इसलिए सब ठीक सजते हैं। किसी एक उत्पाद का ख़ास सिंटैक्स ज्यों का त्यों गुज़र जाता है।' },
      { q: 'क्या मेरी क्वेरी कहीं भेजी जाती है?', a: 'नहीं। सजावट ब्राउज़र में ही होती है — और यह मायने रखता है, क्योंकि क्वेरी में अक्सर टेबल और कॉलम के नाम होते हैं जिन्हें आप बाहर नहीं देना चाहेंगे।' },
    ],
    ui: withUi('hi', { sql: 'SQL', formatted: 'सजाया हुआ', upper: 'कीवर्ड बड़े अक्षरों में' }),
  },
  'zh-hans': {
    title: 'SQL 格式化',
    desc: '把 SQL 查询排成每个主要子句独占一行',
    short: '格式化 · 缩进 · 关键字大写',
    intro: [
      { h: '可读比紧凑重要', p: '把每个主要子句放到单独一行，查询的形状一眼就看得出来——有几个 join，过滤发生在哪里，那个子查询是不是干了比你以为更多的事。' },
      { h: '只排版，不解析', p: '它只是把文本重新摆好，既不理解你的表结构，也不检查查询是否合法。那些要交给数据库去验。' },
    ],
    faq: [
      { q: '会改动我的查询吗？', a: '只动空白，以及你要求时的关键字大小写。词元本身不碰，所以行为不会变。' },
      { q: '支持哪些方言？', a: '常见的子句关键字在 MySQL、PostgreSQL、SQLite 和 SQL Server 里是共通的，所以这些都能排得像样。各家特有的语法原样通过。' },
      { q: '我的查询会被上传吗？', a: '不会。格式化在你的浏览器里完成——这一点很要紧，因为查询里常常带着你不愿公开的表名和列名。' },
    ],
    ui: withUi('zh-hans', { sql: 'SQL', formatted: '格式化结果', upper: '关键字大写' }),
  },
  'zh-hant': {
    title: 'SQL 格式化',
    desc: '把 SQL 查詢排成每個主要子句獨占一行',
    short: '格式化 · 縮排 · 關鍵字大寫',
    intro: [
      { h: '可讀比緊湊重要', p: '把每個主要子句放到單獨一行，查詢的形狀一眼就看得出來——有幾個 join，過濾發生在哪裡，那個子查詢是不是幹了比你以為更多的事。' },
      { h: '只排版，不解析', p: '它只是把文字重新擺好，既不理解你的資料表結構，也不檢查查詢是否合法。那些要交給資料庫去驗。' },
    ],
    faq: [
      { q: '會改動我的查詢嗎？', a: '只動空白，以及你要求時的關鍵字大小寫。詞元本身不碰，所以行為不會變。' },
      { q: '支援哪些方言？', a: '常見的子句關鍵字在 MySQL、PostgreSQL、SQLite 和 SQL Server 裡是共通的，所以這些都能排得像樣。各家特有的語法原樣通過。' },
      { q: '我的查詢會被上傳嗎？', a: '不會。格式化在你的瀏覽器裡完成——這一點很要緊，因為查詢裡常常帶著你不願公開的資料表名和欄位名。' },
    ],
    ui: withUi('zh-hant', { sql: 'SQL', formatted: '格式化結果', upper: '關鍵字大寫' }),
  },
};

export const DEV_DIFF: CalcTable = {
  en: {
    title: 'Text diff',
    desc: 'Compare two texts line by line and see what changed',
    short: 'Line-by-line comparison',
    intro: [
      { h: 'Line by line', p: 'The two texts are lined up by longest common subsequence — the same idea diff and git use. Lines that only exist on one side are marked added or removed; lines present in both are shown unchanged so you keep your bearings.' },
      { h: 'Whitespace counts', p: 'A line that differs only by a trailing space is still a different line. That is usually what you want when comparing config or data; it is occasionally surprising when comparing prose.' },
    ],
    faq: [
      { q: 'Is there a size limit?', a: 'A thousand lines per side. Beyond that the comparison gets slow in a browser, and a real diff tool will serve you better.' },
      { q: 'Does it compare within a line?', a: 'No, the unit is the whole line. A one-character change shows as one line removed and one added.' },
      { q: 'Is anything uploaded?', a: 'No. Both texts stay in the page.' },
    ],
    ui: withUi('en', {
      original: 'Original', modified: 'Modified', compare: 'Compare', diffResult: 'Differences',
      added: 'Added', removed: 'Removed', same: 'Unchanged', identical: 'The two texts are identical.',
      limit: 'Up to 1,000 lines', content: 'Line',
    }),
  },
  es: {
    title: 'Comparador de textos',
    desc: 'Compara dos textos línea a línea y mira qué cambió',
    short: 'Comparación línea a línea',
    intro: [
      { h: 'Línea a línea', p: 'Los dos textos se alinean por subsecuencia común más larga, la misma idea que usan diff y git. Las líneas que solo están en un lado se marcan como añadidas o eliminadas; las que están en ambos se muestran sin marcar para que no pierdas el hilo.' },
      { h: 'Los espacios cuentan', p: 'Una línea que solo se diferencia por un espacio al final sigue siendo otra línea. Suele ser lo que quieres al comparar configuración o datos; sorprende un poco al comparar prosa.' },
    ],
    faq: [
      { q: '¿Hay límite de tamaño?', a: 'Mil líneas por lado. Más allá, la comparación se vuelve lenta en un navegador y te servirá mejor una herramienta de diff de verdad.' },
      { q: '¿Compara dentro de la línea?', a: 'No, la unidad es la línea entera. Un cambio de un carácter aparece como una línea eliminada y otra añadida.' },
      { q: '¿Se sube algo?', a: 'No. Los dos textos se quedan en la página.' },
    ],
    ui: withUi('es', {
      original: 'Original', modified: 'Modificado', compare: 'Comparar', diffResult: 'Diferencias',
      added: 'Añadidas', removed: 'Eliminadas', same: 'Sin cambios', identical: 'Los dos textos son idénticos.',
      limit: 'Hasta 1.000 líneas', content: 'Línea',
    }),
  },
  'pt-br': {
    title: 'Comparador de textos',
    desc: 'Compare dois textos linha a linha e veja o que mudou',
    short: 'Comparação linha a linha',
    intro: [
      { h: 'Linha a linha', p: 'Os dois textos são alinhados pela maior subsequência comum — a mesma ideia que diff e git usam. Linhas que só existem de um lado ficam marcadas como adicionadas ou removidas; as que estão nos dois aparecem sem marca para você não se perder.' },
      { h: 'Espaço em branco conta', p: 'Uma linha que só difere por um espaço no fim continua sendo outra linha. Costuma ser o que você quer ao comparar configuração ou dados; surpreende um pouco ao comparar texto corrido.' },
    ],
    faq: [
      { q: 'Tem limite de tamanho?', a: 'Mil linhas de cada lado. Acima disso a comparação fica lenta no navegador, e uma ferramenta de diff de verdade serve melhor.' },
      { q: 'Compara dentro da linha?', a: 'Não, a unidade é a linha inteira. Uma mudança de um caractere aparece como uma linha removida e uma adicionada.' },
      { q: 'Alguma coisa é enviada?', a: 'Não. Os dois textos ficam na página.' },
    ],
    ui: withUi('pt-br', {
      original: 'Original', modified: 'Modificado', compare: 'Comparar', diffResult: 'Diferenças',
      added: 'Adicionadas', removed: 'Removidas', same: 'Sem mudança', identical: 'Os dois textos são idênticos.',
      limit: 'Até 1.000 linhas', content: 'Linha',
    }),
  },
  ja: {
    title: 'テキスト差分',
    desc: '二つのテキストを行単位で比べ、変わったところを見る',
    short: '行単位の比較',
    intro: [
      { h: '行の単位で並べます', p: '二つのテキストを最長共通部分列で突き合わせます。diff や git と同じ考え方です。片側にしかない行は追加・削除として印を付け、両方にある行はそのまま出すので、どこを見ているかを見失いません。' },
      { h: '空白も違いのうち', p: '末尾の空白ひとつだけ違う行も、別の行として扱います。設定やデータを比べるときはこれが望ましく、文章を比べるときは少し意外に見えます。' },
    ],
    faq: [
      { q: '大きさの上限はありますか。', a: '片側1,000行までです。それを超えるとブラウザでは重くなりますし、本物の差分ツールのほうが役に立ちます。' },
      { q: '行の中まで比べますか。', a: '比べません。単位は行ぜんぶです。1文字の違いでも「1行削除・1行追加」と出ます。' },
      { q: 'どこかに送られますか。', a: '送られません。どちらのテキストもページの中に留まります。' },
    ],
    ui: withUi('ja', {
      original: '元のテキスト', modified: '変更後', compare: '比較する', diffResult: '差分',
      added: '追加された行', removed: '削除された行', same: '同じ行', identical: '二つのテキストは完全に同じです。',
      limit: '1,000行まで', content: '内容',
    }),
  },
  de: {
    title: 'Text-Vergleich',
    desc: 'Zwei Texte zeilenweise vergleichen und Änderungen sehen',
    short: 'Zeilenweiser Vergleich',
    intro: [
      { h: 'Zeile für Zeile', p: 'Die beiden Texte werden über die längste gemeinsame Teilfolge ausgerichtet — dieselbe Idee wie bei diff und git. Zeilen, die es nur auf einer Seite gibt, werden als hinzugefügt oder entfernt markiert; Zeilen in beiden bleiben unmarkiert stehen, damit du die Orientierung behältst.' },
      { h: 'Leerraum zählt mit', p: 'Eine Zeile, die sich nur durch ein Leerzeichen am Ende unterscheidet, ist trotzdem eine andere Zeile. Beim Vergleich von Konfiguration oder Daten will man genau das; beim Vergleich von Fließtext überrascht es gelegentlich.' },
    ],
    faq: [
      { q: 'Gibt es eine Größengrenze?', a: 'Tausend Zeilen je Seite. Darüber wird der Vergleich im Browser zäh, und ein richtiges Diff-Werkzeug hilft dir mehr.' },
      { q: 'Wird auch innerhalb einer Zeile verglichen?', a: 'Nein, die Einheit ist die ganze Zeile. Eine Änderung um ein Zeichen erscheint als eine entfernte und eine hinzugefügte Zeile.' },
      { q: 'Wird etwas hochgeladen?', a: 'Nein. Beide Texte bleiben auf der Seite.' },
    ],
    ui: withUi('de', {
      original: 'Original', modified: 'Geändert', compare: 'Vergleichen', diffResult: 'Unterschiede',
      added: 'Hinzugefügt', removed: 'Entfernt', same: 'Unverändert', identical: 'Die beiden Texte sind identisch.',
      limit: 'Bis 1.000 Zeilen', content: 'Zeile',
    }),
  },
  fr: {
    title: 'Comparateur de textes',
    desc: 'Comparer deux textes ligne à ligne et voir ce qui a changé',
    short: 'Comparaison ligne à ligne',
    intro: [
      { h: 'Ligne à ligne', p: 'Les deux textes sont alignés par plus longue sous-séquence commune — l’idée même de diff et de git. Les lignes présentes d’un seul côté sont marquées ajoutées ou supprimées ; celles présentes des deux côtés restent affichées sans marque, pour garder ses repères.' },
      { h: 'Les espaces comptent', p: 'Une ligne qui ne diffère que par une espace en fin reste une autre ligne. C’est en général ce qu’on veut pour de la configuration ou des données ; c’est parfois surprenant pour de la prose.' },
    ],
    faq: [
      { q: 'Y a-t-il une limite de taille ?', a: 'Mille lignes par côté. Au-delà, la comparaison devient lente dans un navigateur et un vrai outil de diff vous servira mieux.' },
      { q: 'Compare-t-il à l’intérieur d’une ligne ?', a: 'Non, l’unité est la ligne entière. Un changement d’un caractère apparaît comme une ligne supprimée et une ajoutée.' },
      { q: 'Quelque chose est-il envoyé ?', a: 'Non. Les deux textes restent dans la page.' },
    ],
    ui: withUi('fr', {
      original: 'Original', modified: 'Modifié', compare: 'Comparer', diffResult: 'Différences',
      added: 'Ajoutées', removed: 'Supprimées', same: 'Inchangées', identical: 'Les deux textes sont identiques.',
      limit: 'Jusqu’à 1 000 lignes', content: 'Ligne',
    }),
  },
  hi: {
    title: 'टेक्स्ट तुलना',
    desc: 'दो टेक्स्ट की पंक्ति-दर-पंक्ति तुलना करें और देखें क्या बदला',
    short: 'पंक्ति-दर-पंक्ति तुलना',
    intro: [
      { h: 'पंक्ति के हिसाब से', p: 'दोनों टेक्स्ट सबसे लंबे साझा अनुक्रम के आधार पर मिलाए जाते हैं — वही तरीक़ा जो diff और git इस्तेमाल करते हैं। जो पंक्तियाँ सिर्फ़ एक तरफ़ हैं उन पर जुड़ी या हटी का निशान लगता है; जो दोनों तरफ़ हैं वे बिना निशान दिखती हैं ताकि आप राह न भूलें।' },
      { h: 'ख़ाली जगह भी गिनी जाती है', p: 'जो पंक्ति सिर्फ़ आख़िर की एक जगह से अलग हो, वह भी अलग पंक्ति है। कॉन्फ़िग या डेटा मिलाते समय यही चाहिए होता है; गद्य मिलाते समय कभी-कभी चौंकाता है।' },
    ],
    faq: [
      { q: 'क्या आकार की कोई सीमा है?', a: 'हर तरफ़ एक हज़ार पंक्तियाँ। उससे ज़्यादा में ब्राउज़र में तुलना धीमी पड़ जाती है, और असली diff टूल ज़्यादा काम आएगा।' },
      { q: 'क्या पंक्ति के भीतर भी तुलना होती है?', a: 'नहीं, इकाई पूरी पंक्ति है। एक अक्षर का बदलाव भी "एक पंक्ति हटी, एक जुड़ी" के रूप में दिखता है।' },
      { q: 'क्या कुछ अपलोड होता है?', a: 'नहीं। दोनों टेक्स्ट पन्ने के भीतर ही रहते हैं।' },
    ],
    ui: withUi('hi', {
      original: 'मूल', modified: 'बदला हुआ', compare: 'तुलना करें', diffResult: 'अंतर',
      added: 'जुड़ी', removed: 'हटी', same: 'अपरिवर्तित', identical: 'दोनों टेक्स्ट बिल्कुल एक जैसे हैं।',
      limit: '1,000 पंक्तियों तक', content: 'पंक्ति',
    }),
  },
  'zh-hans': {
    title: '文本对比',
    desc: '逐行比较两段文本，看清改了什么',
    short: '逐行对比',
    intro: [
      { h: '按行对齐', p: '两段文本用最长公共子序列对齐——diff 和 git 用的就是这个思路。只在一边出现的行会标为新增或删除；两边都有的行原样显示，好让你不迷失位置。' },
      { h: '空白也算数', p: '只差一个行尾空格的行，仍然是不同的行。比对配置或数据时正是要这样；比对文章时偶尔会让人意外。' },
    ],
    faq: [
      { q: '有大小限制吗？', a: '每边一千行。再多的话浏览器里就慢了，真正的 diff 工具更合适。' },
      { q: '会比较行内的差异吗？', a: '不会，单位是整行。改一个字符也会显示成"删一行、加一行"。' },
      { q: '内容会上传吗？', a: '不会。两段文本都留在这个页面里。' },
    ],
    ui: withUi('zh-hans', {
      original: '原文', modified: '修改后', compare: '比较', diffResult: '差异',
      added: '新增', removed: '删除', same: '未变', identical: '两段文本完全相同。',
      limit: '最多 1,000 行', content: '内容',
    }),
  },
  'zh-hant': {
    title: '文字比對',
    desc: '逐行比較兩段文字，看清改了什麼',
    short: '逐行比對',
    intro: [
      { h: '按行對齊', p: '兩段文字用最長共同子序列對齊——diff 和 git 用的就是這個思路。只在一邊出現的行會標為新增或刪除；兩邊都有的行原樣顯示，好讓你不迷失位置。' },
      { h: '空白也算數', p: '只差一個行尾空格的行，仍然是不同的行。比對設定或資料時正是要這樣；比對文章時偶爾會讓人意外。' },
    ],
    faq: [
      { q: '有大小限制嗎？', a: '每邊一千行。再多的話瀏覽器裡就慢了，真正的 diff 工具更合適。' },
      { q: '會比較行內的差異嗎？', a: '不會，單位是整行。改一個字元也會顯示成「刪一行、加一行」。' },
      { q: '內容會上傳嗎？', a: '不會。兩段文字都留在這個頁面裡。' },
    ],
    ui: withUi('zh-hant', {
      original: '原文', modified: '修改後', compare: '比較', diffResult: '差異',
      added: '新增', removed: '刪除', same: '未變', identical: '兩段文字完全相同。',
      limit: '最多 1,000 行', content: '內容',
    }),
  },
};
