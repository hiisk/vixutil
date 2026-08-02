import type { CalcLang, CalcTable } from './types.ts';
import { DEV_UI } from './dev-tools.ts';

/** 공통 낱말에 도구별 낱말을 얹는다. dev-tools.ts와 같은 방식이다. */
function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

export const DEV_URL_ENCODE: CalcTable = {
  en: {
    title: 'URL encoder and decoder',
    desc: 'Percent-encode text for URLs and decode it back',
    short: 'Percent-encode · decode',
    intro: [
      { h: 'Why URLs need escaping', p: 'A URL may only carry a limited set of ASCII characters. Everything else — spaces, accents, non-Latin scripts, and the reserved characters like ? & = # — has to be written as %XX, one pair per byte of UTF-8.' },
      { h: 'A space is not always %20', p: 'In a path a space is %20. In a query string, form submissions traditionally write it as +. Both decode back to a space, but they are not interchangeable everywhere, so check which part of the URL you are building.' },
    ],
    faq: [
      { q: 'Why does one character become several %XX pairs?', a: 'Because encoding works on bytes, not characters. A character outside ASCII takes two to four bytes in UTF-8, and each byte gets its own pair.' },
      { q: 'Should I encode the whole URL?', a: 'No. Encoding the whole thing would escape the slashes and colon that give the URL its structure. Encode only the individual values you are dropping into it.' },
      { q: 'Which characters are reserved?', a: 'The ones with a job in the syntax — : / ? # [ ] @ ! $ & \' ( ) * + , ; =. Encode them whenever they appear inside a value rather than as separators.' },
    ],
    ui: withUi('en', { encode: 'Encode', decode: 'Decode', source: 'Text', encoded: 'Encoded', table: 'Common characters', character: 'Character', code: 'Encoded as' }),
  },
  es: {
    title: 'Codificador y decodificador de URL',
    desc: 'Codifica texto en formato porcentaje para URLs y vuelve atrás',
    short: 'Codificación porcentual · decodificar',
    intro: [
      { h: 'Por qué hay que escapar en las URLs', p: 'Una URL solo admite un conjunto limitado de caracteres ASCII. Todo lo demás —espacios, tildes, alfabetos no latinos y los reservados como ? & = #— debe escribirse como %XX, un par por cada byte de UTF-8.' },
      { h: 'Un espacio no siempre es %20', p: 'En la ruta, un espacio es %20. En la cadena de consulta, los formularios lo escriben tradicionalmente como +. Ambos se decodifican como espacio, pero no son intercambiables en todas partes: fíjate en qué parte de la URL estás.' },
    ],
    faq: [
      { q: '¿Por qué un carácter se convierte en varios %XX?', a: 'Porque la codificación trabaja con bytes, no con caracteres. Un carácter fuera de ASCII ocupa de dos a cuatro bytes en UTF-8, y cada byte lleva su propio par.' },
      { q: '¿Debo codificar la URL entera?', a: 'No. Hacerlo escaparía las barras y los dos puntos que le dan estructura. Codifica solo los valores concretos que insertas en ella.' },
      { q: '¿Cuáles son los caracteres reservados?', a: 'Los que cumplen una función sintáctica: : / ? # [ ] @ ! $ & \' ( ) * + , ; =. Codifícalos cuando aparezcan dentro de un valor y no como separadores.' },
    ],
    ui: withUi('es', { encode: 'Codificar', decode: 'Decodificar', source: 'Texto', encoded: 'Codificado', table: 'Caracteres frecuentes', character: 'Carácter', code: 'Se codifica como' }),
  },
  'pt-br': {
    title: 'Codificador e decodificador de URL',
    desc: 'Codifique texto em porcentagem para URLs e volte atrás',
    short: 'Codificação percentual · decodificar',
    intro: [
      { h: 'Por que URLs precisam de escape', p: 'Uma URL só carrega um conjunto limitado de caracteres ASCII. Todo o resto — espaços, acentos, alfabetos não latinos e os reservados como ? & = # — precisa virar %XX, um par por byte de UTF-8.' },
      { h: 'Espaço nem sempre é %20', p: 'No caminho, espaço é %20. Na query string, formulários tradicionalmente escrevem +. Os dois voltam a ser espaço, mas não são intercambiáveis em todo lugar — veja em que parte da URL você está.' },
    ],
    faq: [
      { q: 'Por que um caractere vira vários %XX?', a: 'Porque a codificação trabalha com bytes, não com caracteres. Um caractere fora do ASCII ocupa de dois a quatro bytes em UTF-8, e cada byte ganha seu par.' },
      { q: 'Devo codificar a URL inteira?', a: 'Não. Isso escaparia as barras e os dois-pontos que dão estrutura à URL. Codifique apenas os valores que você insere nela.' },
      { q: 'Quais caracteres são reservados?', a: 'Os que têm função na sintaxe: : / ? # [ ] @ ! $ & \' ( ) * + , ; =. Codifique-os quando aparecerem dentro de um valor, e não como separadores.' },
    ],
    ui: withUi('pt-br', { encode: 'Codificar', decode: 'Decodificar', source: 'Texto', encoded: 'Codificado', table: 'Caracteres comuns', character: 'Caractere', code: 'Vira' }),
  },
  ja: {
    title: 'URL エンコード・デコード',
    desc: 'URL 用のパーセントエンコードと、その復元',
    short: 'パーセントエンコード・デコード',
    intro: [
      { h: 'URL に変換が要る理由', p: 'URL に置ける文字は限られた ASCII だけです。それ以外 — 空白、アクセント記号、日本語などの非ラテン文字、そして ? & = # のような予約文字 — は %XX の形で書きます。UTF-8 の1バイトにつき1組です。' },
      { h: '空白はいつも %20 とは限らない', p: 'パスの中では %20 ですが、クエリ文字列ではフォーム送信の慣習で + と書きます。どちらも復元すると空白ですが、どこでも入れ替えられるわけではないので、URL のどの部分を組み立てているか確かめてください。' },
    ],
    faq: [
      { q: '1文字が %XX 何組にもなるのはなぜですか。', a: '変換の単位が文字ではなくバイトだからです。ASCII 外の文字は UTF-8 で2〜4バイトになり、バイトごとに1組ずつ付きます。' },
      { q: 'URL 全体を変換してよいですか。', a: 'いけません。全体を変換すると、構造を作っている / や : まで置き換わってしまいます。中に差し込む値だけを変換してください。' },
      { q: '予約文字はどれですか。', a: '構文上の役割を持つもの — : / ? # [ ] @ ! $ & \' ( ) * + , ; = です。区切りとしてではなく値の中に現れるときは変換します。' },
    ],
    ui: withUi('ja', { encode: 'エンコード', decode: 'デコード', source: 'テキスト', encoded: '変換後', table: 'よく使う文字', character: '文字', code: '変換結果' }),
  },
  de: {
    title: 'URL kodieren und dekodieren',
    desc: 'Text prozentkodieren für URLs und wieder zurück',
    short: 'Prozentkodierung · dekodieren',
    intro: [
      { h: 'Warum URLs Escaping brauchen', p: 'Eine URL darf nur einen begrenzten Satz an ASCII-Zeichen tragen. Alles andere — Leerzeichen, Umlaute, nichtlateinische Schriften und die reservierten Zeichen wie ? & = # — muss als %XX geschrieben werden, ein Paar je UTF-8-Byte.' },
      { h: 'Ein Leerzeichen ist nicht immer %20', p: 'Im Pfad ist ein Leerzeichen %20. In der Query schreiben Formulare es traditionell als +. Beides wird zu einem Leerzeichen zurückgelesen, austauschbar ist es aber nicht überall — schau, welchen Teil der URL du baust.' },
    ],
    faq: [
      { q: 'Warum wird ein Zeichen zu mehreren %XX-Paaren?', a: 'Weil kodiert wird, was in Bytes steht, nicht was in Zeichen steht. Ein Zeichen außerhalb von ASCII braucht in UTF-8 zwei bis vier Bytes, und jedes Byte bekommt sein eigenes Paar.' },
      { q: 'Soll ich die ganze URL kodieren?', a: 'Nein. Dann würden auch Schrägstriche und Doppelpunkt escaped, die der URL ihre Struktur geben. Kodiere nur die einzelnen Werte, die du einsetzt.' },
      { q: 'Welche Zeichen sind reserviert?', a: 'Die mit einer Aufgabe in der Syntax: : / ? # [ ] @ ! $ & \' ( ) * + , ; =. Kodiere sie, wenn sie innerhalb eines Werts stehen statt als Trenner.' },
    ],
    ui: withUi('de', { encode: 'Kodieren', decode: 'Dekodieren', source: 'Text', encoded: 'Kodiert', table: 'Häufige Zeichen', character: 'Zeichen', code: 'Wird zu' }),
  },
  fr: {
    title: 'Encodeur et décodeur d’URL',
    desc: 'Encoder du texte en pourcentage pour les URL et revenir en arrière',
    short: 'Encodage pourcent · décodage',
    intro: [
      { h: 'Pourquoi les URL exigent un échappement', p: 'Une URL ne peut porter qu’un jeu restreint de caractères ASCII. Tout le reste — espaces, accents, écritures non latines et les caractères réservés comme ? & = # — doit s’écrire %XX, une paire par octet UTF-8.' },
      { h: 'Un espace n’est pas toujours %20', p: 'Dans le chemin, un espace vaut %20. Dans la chaîne de requête, les formulaires l’écrivent traditionnellement +. Les deux se décodent en espace, mais ne sont pas interchangeables partout : vérifiez quelle partie de l’URL vous construisez.' },
    ],
    faq: [
      { q: 'Pourquoi un caractère donne-t-il plusieurs %XX ?', a: 'Parce que l’encodage porte sur les octets, pas sur les caractères. Un caractère hors ASCII occupe deux à quatre octets en UTF-8, et chaque octet reçoit sa paire.' },
      { q: 'Faut-il encoder l’URL entière ?', a: 'Non. Cela échapperait les barres obliques et les deux-points qui lui donnent sa structure. N’encodez que les valeurs que vous y insérez.' },
      { q: 'Quels caractères sont réservés ?', a: 'Ceux qui ont un rôle syntaxique : : / ? # [ ] @ ! $ & \' ( ) * + , ; =. Encodez-les lorsqu’ils apparaissent dans une valeur et non comme séparateurs.' },
    ],
    ui: withUi('fr', { encode: 'Encoder', decode: 'Décoder', source: 'Texte', encoded: 'Encodé', table: 'Caractères courants', character: 'Caractère', code: 'Devient' }),
  },
  hi: {
    title: 'URL एन्कोडर और डिकोडर',
    desc: 'URL के लिए टेक्स्ट को प्रतिशत-एन्कोड करें और वापस लाएँ',
    short: 'प्रतिशत एन्कोडिंग · डिकोड',
    intro: [
      { h: 'URL में बदलाव क्यों ज़रूरी है', p: 'URL में सीमित ASCII अक्षर ही चल सकते हैं। बाक़ी सब — ख़ाली जगह, मात्राएँ, देवनागरी जैसी ग़ैर-लैटिन लिपियाँ, और ? & = # जैसे आरक्षित अक्षर — %XX के रूप में लिखने पड़ते हैं, UTF-8 के हर बाइट पर एक जोड़ा।' },
      { h: 'ख़ाली जगह हमेशा %20 नहीं होती', p: 'पथ में ख़ाली जगह %20 होती है। क्वेरी स्ट्रिंग में फ़ॉर्म परंपरागत रूप से + लिखते हैं। दोनों वापस ख़ाली जगह बनते हैं, पर हर जगह अदल-बदल नहीं चलता — देख लीजिए कि आप URL का कौन-सा हिस्सा बना रहे हैं।' },
    ],
    faq: [
      { q: 'एक अक्षर कई %XX क्यों बन जाता है?', a: 'क्योंकि एन्कोडिंग बाइट पर चलती है, अक्षर पर नहीं। ASCII से बाहर का अक्षर UTF-8 में दो से चार बाइट लेता है, और हर बाइट का अपना जोड़ा बनता है।' },
      { q: 'क्या पूरा URL एन्कोड करना चाहिए?', a: 'नहीं। ऐसा करने पर वे स्लैश और कोलन भी बदल जाएँगे जो URL को ढाँचा देते हैं। सिर्फ़ उन मानों को एन्कोड कीजिए जो आप उसमें डाल रहे हैं।' },
      { q: 'आरक्षित अक्षर कौन-से हैं?', a: 'जिनका वाक्य-रचना में काम है: : / ? # [ ] @ ! $ & \' ( ) * + , ; =। जब ये विभाजक के बजाय किसी मान के भीतर आएँ, तब इन्हें एन्कोड कीजिए।' },
    ],
    ui: withUi('hi', { encode: 'एन्कोड', decode: 'डिकोड', source: 'टेक्स्ट', encoded: 'एन्कोडेड', table: 'आम अक्षर', character: 'अक्षर', code: 'बनता है' }),
  },
  'zh-hans': {
    title: 'URL 编码解码',
    desc: '把文本做百分号编码放进 URL，再解回来',
    short: '百分号编码 · 解码',
    intro: [
      { h: 'URL 为什么要转义', p: 'URL 里只能放有限的 ASCII 字符。其余的——空格、带音标的字母、汉字这类非拉丁文字，以及 ? & = # 这些保留字符——都得写成 %XX，UTF-8 的每个字节对应一组。' },
      { h: '空格不一定是 %20', p: '在路径里空格是 %20。在查询串里，表单提交历来写成 +。两者解码回来都是空格，但并非到处可以互换——要看你正在拼 URL 的哪一段。' },
    ],
    faq: [
      { q: '一个字为什么变成好几组 %XX？', a: '因为编码作用在字节上，不是字符上。非 ASCII 字符在 UTF-8 里占两到四个字节，每个字节各出一组。' },
      { q: '要把整个 URL 都编码吗？', a: '不要。那样连撑起结构的斜杠和冒号也会被转义。只编码你往里塞的那些值。' },
      { q: '哪些是保留字符？', a: '在语法里有职责的那些：: / ? # [ ] @ ! $ & \' ( ) * + , ; =。当它们出现在值里面而不是当分隔符时，就要编码。' },
    ],
    ui: withUi('zh-hans', { encode: '编码', decode: '解码', source: '文本', encoded: '编码结果', table: '常见字符', character: '字符', code: '编码为' }),
  },
  'zh-hant': {
    title: 'URL 編碼解碼',
    desc: '把文字做百分號編碼放進 URL，再解回來',
    short: '百分號編碼 · 解碼',
    intro: [
      { h: 'URL 為什麼要轉義', p: 'URL 裡只能放有限的 ASCII 字元。其餘的——空格、帶音標的字母、漢字這類非拉丁文字，以及 ? & = # 這些保留字元——都得寫成 %XX，UTF-8 的每個位元組對應一組。' },
      { h: '空格不一定是 %20', p: '在路徑裡空格是 %20。在查詢字串裡，表單送出歷來寫成 +。兩者解碼回來都是空格，但並非到處可以互換——要看你正在拼 URL 的哪一段。' },
    ],
    faq: [
      { q: '一個字為什麼變成好幾組 %XX？', a: '因為編碼作用在位元組上，不是字元上。非 ASCII 字元在 UTF-8 裡佔兩到四個位元組，每個位元組各出一組。' },
      { q: '要把整個 URL 都編碼嗎？', a: '不要。那樣連撐起結構的斜線和冒號也會被轉義。只編碼你往裡塞的那些值。' },
      { q: '哪些是保留字元？', a: '在語法裡有職責的那些：: / ? # [ ] @ ! $ & \' ( ) * + , ; =。當它們出現在值裡面而不是當分隔符時，就要編碼。' },
    ],
    ui: withUi('zh-hant', { encode: '編碼', decode: '解碼', source: '文字', encoded: '編碼結果', table: '常見字元', character: '字元', code: '編碼為' }),
  },
};

export const DEV_HASH: CalcTable = {
  en: {
    title: 'SHA-256 and SHA-512 generator',
    desc: 'Hash text with SHA-256 or SHA-512 in the browser',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'A hash is one-way', p: 'The same input always produces the same digest, and there is no way back. That is what makes hashes useful for checking that a file arrived intact, and useless as a way to store something you need to read again.' },
      { h: 'Do not hash passwords this way', p: 'Plain SHA-256 is far too fast for password storage — a modern GPU tries billions per second. Passwords want a slow, salted function built for the job: bcrypt, scrypt or Argon2.' },
    ],
    faq: [
      { q: 'Why is the digest always the same length?', a: 'By design. SHA-256 always returns 256 bits, written as 64 hex characters, whether the input was one letter or a gigabyte.' },
      { q: 'Can two inputs give the same hash?', a: 'In principle yes — there are more possible inputs than digests. In practice no one has produced a SHA-256 collision, and finding one deliberately is considered infeasible.' },
      { q: 'Does the text leave my browser?', a: 'No. The Web Crypto API in your browser does the hashing. Nothing is sent anywhere.' },
    ],
    ui: withUi('en', { text: 'Text to hash', auto: '(hashes as you type)', bits256: '256 bits (64 chars)', bits512: '512 bits (128 chars)' }),
  },
  es: {
    title: 'Generador SHA-256 y SHA-512',
    desc: 'Calcula el hash SHA-256 o SHA-512 de un texto en el navegador',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'Un hash va en un solo sentido', p: 'La misma entrada da siempre el mismo resumen y no hay camino de vuelta. Eso es lo que hace útiles los hashes para comprobar que un archivo llegó intacto, e inútiles para guardar algo que necesitas volver a leer.' },
      { h: 'No guardes contraseñas así', p: 'SHA-256 a secas es demasiado rápido para almacenar contraseñas: una GPU actual prueba miles de millones por segundo. Las contraseñas piden una función lenta y con sal, pensada para eso: bcrypt, scrypt o Argon2.' },
    ],
    faq: [
      { q: '¿Por qué el resumen mide siempre lo mismo?', a: 'Por diseño. SHA-256 devuelve siempre 256 bits, escritos como 64 caracteres hexadecimales, tanto si la entrada era una letra como un gigabyte.' },
      { q: '¿Pueden dos entradas dar el mismo hash?', a: 'En principio sí: hay más entradas posibles que resúmenes. En la práctica nadie ha producido una colisión de SHA-256 y encontrarla a propósito se considera inviable.' },
      { q: '¿El texto sale de mi navegador?', a: 'No. El cálculo lo hace la Web Crypto API de tu navegador. No se envía nada a ninguna parte.' },
    ],
    ui: withUi('es', { text: 'Texto a procesar', auto: '(se calcula mientras escribes)', bits256: '256 bits (64 caracteres)', bits512: '512 bits (128 caracteres)' }),
  },
  'pt-br': {
    title: 'Gerador SHA-256 e SHA-512',
    desc: 'Calcule o hash SHA-256 ou SHA-512 de um texto no navegador',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'Hash é via de mão única', p: 'A mesma entrada sempre gera o mesmo resumo, e não há volta. É isso que torna hashes úteis para conferir se um arquivo chegou íntegro, e inúteis para guardar algo que você precisa ler de novo.' },
      { h: 'Não guarde senhas assim', p: 'SHA-256 puro é rápido demais para armazenar senhas — uma GPU atual testa bilhões por segundo. Senha pede função lenta e com sal, feita para isso: bcrypt, scrypt ou Argon2.' },
    ],
    faq: [
      { q: 'Por que o resumo tem sempre o mesmo tamanho?', a: 'É por projeto. SHA-256 devolve sempre 256 bits, escritos como 64 caracteres hexadecimais, seja a entrada uma letra ou um gigabyte.' },
      { q: 'Duas entradas podem dar o mesmo hash?', a: 'Em princípio sim: há mais entradas possíveis do que resumos. Na prática ninguém produziu uma colisão de SHA-256, e achar uma de propósito é considerado inviável.' },
      { q: 'O texto sai do meu navegador?', a: 'Não. O cálculo é feito pela Web Crypto API do próprio navegador. Nada é enviado.' },
    ],
    ui: withUi('pt-br', { text: 'Texto para o hash', auto: '(calcula enquanto você digita)', bits256: '256 bits (64 caracteres)', bits512: '512 bits (128 caracteres)' }),
  },
  ja: {
    title: 'SHA-256 / SHA-512 生成',
    desc: 'ブラウザ内でテキストの SHA-256・SHA-512 を求める',
    short: 'SHA-256・SHA-512',
    intro: [
      { h: 'ハッシュは一方通行です', p: '同じ入力からはいつも同じ値が出て、そこから戻る道はありません。ファイルが壊れずに届いたかを確かめるのに向いているのはそのためで、あとで読み返したいものを保存する用途には使えません。' },
      { h: 'パスワードをこれで保存してはいけません', p: '素の SHA-256 はパスワード保存には速すぎます。いまの GPU は毎秒何十億回も試せます。パスワードには、そのために作られた遅くてソルト付きの関数 — bcrypt、scrypt、Argon2 — を使ってください。' },
    ],
    faq: [
      { q: '出力の長さがいつも同じなのはなぜですか。', a: 'そう設計されているからです。SHA-256 は入力が1文字でも1ギガバイトでも、常に256ビット（16進64文字）を返します。' },
      { q: '違う入力から同じ値が出ることはありますか。', a: '理屈のうえではあります。入力のほうが出力より多いからです。ただ SHA-256 の衝突を実際に作った人はまだおらず、意図して見つけるのは現実的でないとされています。' },
      { q: '入力したテキストは外に出ますか。', a: '出ません。計算はブラウザの Web Crypto API が行います。どこにも送りません。' },
    ],
    ui: withUi('ja', { text: '対象のテキスト', auto: '（入力すると自動で計算します）', bits256: '256ビット（64文字）', bits512: '512ビット（128文字）' }),
  },
  de: {
    title: 'SHA-256- und SHA-512-Generator',
    desc: 'Text im Browser mit SHA-256 oder SHA-512 hashen',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'Ein Hash ist eine Einbahnstraße', p: 'Dieselbe Eingabe ergibt immer denselben Wert, und es führt kein Weg zurück. Genau deshalb taugen Hashes dafür zu prüfen, ob eine Datei unversehrt angekommen ist — und nicht dafür, etwas zu speichern, das man wieder lesen muss.' },
      { h: 'So keine Passwörter speichern', p: 'Reines SHA-256 ist für Passwörter viel zu schnell — eine moderne GPU probiert Milliarden pro Sekunde. Passwörter brauchen eine langsame, gesalzene Funktion, die dafür gebaut ist: bcrypt, scrypt oder Argon2.' },
    ],
    faq: [
      { q: 'Warum ist der Hash immer gleich lang?', a: 'So ist er entworfen. SHA-256 liefert stets 256 Bit, geschrieben als 64 Hexzeichen — egal ob die Eingabe ein Buchstabe oder ein Gigabyte war.' },
      { q: 'Können zwei Eingaben denselben Hash ergeben?', a: 'Grundsätzlich ja, es gibt mehr mögliche Eingaben als Hashwerte. In der Praxis hat noch niemand eine SHA-256-Kollision erzeugt; gezielt eine zu finden gilt als undurchführbar.' },
      { q: 'Verlässt der Text meinen Browser?', a: 'Nein. Gerechnet wird mit der Web Crypto API im Browser. Es wird nichts verschickt.' },
    ],
    ui: withUi('de', { text: 'Zu hashender Text', auto: '(wird beim Tippen berechnet)', bits256: '256 Bit (64 Zeichen)', bits512: '512 Bit (128 Zeichen)' }),
  },
  fr: {
    title: 'Générateur SHA-256 et SHA-512',
    desc: 'Hacher du texte en SHA-256 ou SHA-512 dans le navigateur',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'Un hachage va dans un seul sens', p: 'La même entrée donne toujours la même empreinte, et rien ne permet de revenir en arrière. C’est ce qui rend les hachages utiles pour vérifier qu’un fichier est arrivé intact, et inutiles pour stocker ce qu’on devra relire.' },
      { h: 'Ne stockez pas des mots de passe ainsi', p: 'SHA-256 brut est bien trop rapide pour stocker des mots de passe : un GPU actuel en essaie des milliards par seconde. Un mot de passe demande une fonction lente et salée, conçue pour cela : bcrypt, scrypt ou Argon2.' },
    ],
    faq: [
      { q: 'Pourquoi l’empreinte fait-elle toujours la même longueur ?', a: 'C’est voulu. SHA-256 renvoie toujours 256 bits, écrits en 64 caractères hexadécimaux, que l’entrée fasse une lettre ou un gigaoctet.' },
      { q: 'Deux entrées peuvent-elles donner le même hachage ?', a: 'En principe oui : il y a plus d’entrées possibles que d’empreintes. En pratique personne n’a produit de collision SHA-256, et en trouver une volontairement est jugé hors de portée.' },
      { q: 'Le texte quitte-t-il mon navigateur ?', a: 'Non. Le calcul est fait par l’API Web Crypto du navigateur. Rien n’est envoyé.' },
    ],
    ui: withUi('fr', { text: 'Texte à hacher', auto: '(calculé à la frappe)', bits256: '256 bits (64 caractères)', bits512: '512 bits (128 caractères)' }),
  },
  hi: {
    title: 'SHA-256 और SHA-512 जनरेटर',
    desc: 'ब्राउज़र में ही टेक्स्ट का SHA-256 या SHA-512 निकालें',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: 'हैश एकतरफ़ा होता है', p: 'एक ही इनपुट से हमेशा वही आउटपुट आता है, और वापस लौटने का रास्ता नहीं। इसीलिए हैश यह जाँचने के काम आता है कि फ़ाइल सही-सलामत पहुँची या नहीं, और उस चीज़ को रखने के काम नहीं आता जिसे दोबारा पढ़ना हो।' },
      { h: 'पासवर्ड इस तरह मत रखिए', p: 'सादा SHA-256 पासवर्ड रखने के लिए बहुत तेज़ है — आज का GPU हर सेकंड अरबों कोशिशें करता है। पासवर्ड के लिए धीमा और सॉल्ट वाला फलन चाहिए जो इसी काम के लिए बना हो: bcrypt, scrypt या Argon2।' },
    ],
    faq: [
      { q: 'आउटपुट की लंबाई हमेशा एक-सी क्यों होती है?', a: 'यह डिज़ाइन ही ऐसा है। SHA-256 हमेशा 256 बिट लौटाता है, यानी 64 हेक्स अक्षर — चाहे इनपुट एक अक्षर हो या एक गीगाबाइट।' },
      { q: 'क्या दो इनपुट का हैश एक हो सकता है?', a: 'सिद्धांत रूप में हाँ, क्योंकि संभव इनपुट आउटपुट से ज़्यादा हैं। व्यवहार में SHA-256 की कोई टक्कर अब तक किसी ने नहीं बनाई, और जानबूझकर खोजना असंभव-सा माना जाता है।' },
      { q: 'क्या टेक्स्ट मेरे ब्राउज़र से बाहर जाता है?', a: 'नहीं। गणना ब्राउज़र की Web Crypto API करती है। कुछ भी कहीं नहीं भेजा जाता।' },
    ],
    ui: withUi('hi', { text: 'हैश करने का टेक्स्ट', auto: '(लिखते ही अपने आप बनता है)', bits256: '256 बिट (64 अक्षर)', bits512: '512 बिट (128 अक्षर)' }),
  },
  'zh-hans': {
    title: 'SHA-256 / SHA-512 生成器',
    desc: '在浏览器里算出文本的 SHA-256 或 SHA-512',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: '哈希是单向的', p: '同样的输入永远得到同样的结果，而且没有回头路。正因如此，哈希适合用来核对文件是否完好送达，而不适合用来保存以后还要读回来的东西。' },
      { h: '不要用它存密码', p: '纯 SHA-256 对存密码来说太快了——现在一块 GPU 每秒能试几十亿次。密码要用专门为此设计的、慢且加盐的函数：bcrypt、scrypt 或 Argon2。' },
    ],
    faq: [
      { q: '为什么结果长度总是一样？', a: '设计如此。不管输入是一个字还是一个 GB，SHA-256 永远返回 256 位，写成 64 个十六进制字符。' },
      { q: '两个不同的输入会得到同样的哈希吗？', a: '理论上会，因为可能的输入比输出多。但实际上还没有人造出 SHA-256 的碰撞，刻意去找被认为不可行。' },
      { q: '文本会离开我的浏览器吗？', a: '不会。计算由浏览器的 Web Crypto API 完成，什么都不上传。' },
    ],
    ui: withUi('zh-hans', { text: '要计算的文本', auto: '（边输入边计算）', bits256: '256 位（64 个字符）', bits512: '512 位（128 个字符）' }),
  },
  'zh-hant': {
    title: 'SHA-256 / SHA-512 產生器',
    desc: '在瀏覽器裡算出文字的 SHA-256 或 SHA-512',
    short: 'SHA-256 · SHA-512',
    intro: [
      { h: '雜湊是單向的', p: '同樣的輸入永遠得到同樣的結果，而且沒有回頭路。正因如此，雜湊適合用來核對檔案是否完好送達，而不適合用來保存以後還要讀回來的東西。' },
      { h: '不要用它存密碼', p: '純 SHA-256 對存密碼來說太快了——現在一張 GPU 每秒能試幾十億次。密碼要用專門為此設計的、慢且加鹽的函式：bcrypt、scrypt 或 Argon2。' },
    ],
    faq: [
      { q: '為什麼結果長度總是一樣？', a: '設計如此。不管輸入是一個字還是一個 GB，SHA-256 永遠回傳 256 位元，寫成 64 個十六進位字元。' },
      { q: '兩個不同的輸入會得到同樣的雜湊嗎？', a: '理論上會，因為可能的輸入比輸出多。但實際上還沒有人造出 SHA-256 的碰撞，刻意去找被認為不可行。' },
      { q: '文字會離開我的瀏覽器嗎？', a: '不會。計算由瀏覽器的 Web Crypto API 完成，什麼都不上傳。' },
    ],
    ui: withUi('zh-hant', { text: '要計算的文字', auto: '（邊輸入邊計算）', bits256: '256 位元（64 個字元）', bits512: '512 位元（128 個字元）' }),
  },
};

export const DEV_UUID: CalcTable = {
  en: {
    title: 'UUID generator',
    desc: 'Generate random version 4 UUIDs',
    short: 'Random v4 UUIDs',
    intro: [
      { h: 'Version 4 is pure randomness', p: 'A v4 UUID is 122 random bits with six bits reserved to mark the version and variant. Nothing about it encodes the time or the machine, which is exactly why two systems can mint them independently without ever agreeing on anything.' },
      { h: 'Why collisions are not a worry', p: 'With 122 random bits, you would need to generate about a billion UUIDs per second for a century before a duplicate became likely. The randomness here comes from the browser’s cryptographic generator, not Math.random.' },
    ],
    faq: [
      { q: 'Are these safe to use as database keys?', a: 'Yes, though random keys scatter writes across an index. If insert throughput matters, look at UUIDv7 or a sortable scheme instead.' },
      { q: 'Does case matter?', a: 'No. UUIDs are case-insensitive; lowercase is the conventional form and what most libraries emit.' },
      { q: 'Where does the randomness come from?', a: 'crypto.getRandomValues in your browser — the same source used for cryptographic keys, not the weaker Math.random.' },
    ],
    ui: withUi('en', { count: 'How many', uppercase: 'Uppercase', generate: 'Generate', generated: 'Generated UUIDs' }),
  },
  es: {
    title: 'Generador de UUID',
    desc: 'Genera UUID aleatorios de versión 4',
    short: 'UUID v4 aleatorios',
    intro: [
      { h: 'La versión 4 es azar puro', p: 'Un UUID v4 son 122 bits aleatorios con seis reservados para marcar versión y variante. No codifica ni la hora ni la máquina, y por eso dos sistemas pueden emitirlos por su cuenta sin ponerse de acuerdo en nada.' },
      { h: 'Por qué las colisiones no preocupan', p: 'Con 122 bits aleatorios harían falta unos mil millones de UUID por segundo durante un siglo para que un duplicado fuera probable. El azar aquí viene del generador criptográfico del navegador, no de Math.random.' },
    ],
    faq: [
      { q: '¿Sirven como claves de base de datos?', a: 'Sí, aunque las claves aleatorias dispersan las escrituras por el índice. Si el rendimiento de inserción importa, mira UUIDv7 o un esquema ordenable.' },
      { q: '¿Importan las mayúsculas?', a: 'No. Los UUID no distinguen mayúsculas; la forma habitual es en minúsculas y es la que emiten casi todas las bibliotecas.' },
      { q: '¿De dónde sale la aleatoriedad?', a: 'De crypto.getRandomValues del navegador, la misma fuente que se usa para claves criptográficas, no del más débil Math.random.' },
    ],
    ui: withUi('es', { count: 'Cuántos', uppercase: 'Mayúsculas', generate: 'Generar', generated: 'UUID generados' }),
  },
  'pt-br': {
    title: 'Gerador de UUID',
    desc: 'Gere UUIDs aleatórios da versão 4',
    short: 'UUIDs v4 aleatórios',
    intro: [
      { h: 'A versão 4 é puro acaso', p: 'Um UUID v4 são 122 bits aleatórios, com seis reservados para marcar versão e variante. Nada nele codifica a hora ou a máquina — e é justamente por isso que dois sistemas podem emiti-los por conta própria sem combinar nada.' },
      { h: 'Por que colisão não é preocupação', p: 'Com 122 bits aleatórios, seriam necessários cerca de um bilhão de UUIDs por segundo durante um século para que uma repetição ficasse provável. O acaso aqui vem do gerador criptográfico do navegador, não do Math.random.' },
    ],
    faq: [
      { q: 'Dá para usar como chave de banco de dados?', a: 'Dá, embora chaves aleatórias espalhem as escritas pelo índice. Se a taxa de inserção importa, olhe UUIDv7 ou algum esquema ordenável.' },
      { q: 'Maiúsculas fazem diferença?', a: 'Não. UUIDs não diferenciam maiúsculas; minúsculo é a forma convencional e o que a maioria das bibliotecas produz.' },
      { q: 'De onde vem a aleatoriedade?', a: 'De crypto.getRandomValues no navegador — a mesma fonte usada para chaves criptográficas, não o Math.random mais fraco.' },
    ],
    ui: withUi('pt-br', { count: 'Quantos', uppercase: 'Maiúsculas', generate: 'Gerar', generated: 'UUIDs gerados' }),
  },
  ja: {
    title: 'UUID 生成',
    desc: 'ランダムなバージョン4の UUID を作る',
    short: 'ランダムな v4 UUID',
    intro: [
      { h: 'バージョン4は純粋な乱数です', p: 'v4 の UUID は122ビットの乱数で、うち6ビットがバージョンとバリアントの印に使われます。時刻も機器も埋め込まれていません。だからこそ、二つのシステムが何の取り決めもなく別々に発行できます。' },
      { h: '衝突を心配しなくてよい理由', p: '122ビットの乱数だと、重複が起こりそうになるまでに毎秒10億個を一世紀ほど作り続ける必要があります。ここでの乱数はブラウザの暗号用生成器から取っており、Math.random ではありません。' },
    ],
    faq: [
      { q: 'データベースの主キーに使えますか。', a: '使えます。ただしランダムな鍵は書き込みが索引全体に散らばります。挿入性能が重要なら UUIDv7 や並べ替え可能な方式を検討してください。' },
      { q: '大文字と小文字は区別しますか。', a: 'しません。UUID は大小を区別せず、慣習は小文字です。多くのライブラリも小文字で出します。' },
      { q: '乱数はどこから来ますか。', a: 'ブラウザの crypto.getRandomValues です。暗号鍵にも使う生成器で、弱い Math.random ではありません。' },
    ],
    ui: withUi('ja', { count: '生成する個数', uppercase: '大文字', generate: '生成する', generated: '生成された UUID' }),
  },
  de: {
    title: 'UUID-Generator',
    desc: 'Zufällige UUIDs der Version 4 erzeugen',
    short: 'Zufällige v4-UUIDs',
    intro: [
      { h: 'Version 4 ist reiner Zufall', p: 'Eine v4-UUID besteht aus 122 Zufallsbits, sechs davon markieren Version und Variante. Weder Zeit noch Maschine stecken darin — genau deshalb können zwei Systeme sie unabhängig ausgeben, ohne sich je abzustimmen.' },
      { h: 'Warum Kollisionen kein Thema sind', p: 'Bei 122 Zufallsbits müsste man rund eine Milliarde UUIDs pro Sekunde ein Jahrhundert lang erzeugen, bevor eine Dopplung wahrscheinlich wird. Der Zufall kommt hier vom kryptografischen Generator des Browsers, nicht von Math.random.' },
    ],
    faq: [
      { q: 'Taugen sie als Datenbankschlüssel?', a: 'Ja, allerdings streuen zufällige Schlüssel die Schreibzugriffe über den ganzen Index. Wenn Einfügeleistung zählt, sieh dir UUIDv7 oder ein sortierbares Schema an.' },
      { q: 'Spielt Groß-/Kleinschreibung eine Rolle?', a: 'Nein. UUIDs sind unabhängig davon; kleingeschrieben ist die übliche Form und das, was die meisten Bibliotheken ausgeben.' },
      { q: 'Woher kommt der Zufall?', a: 'Aus crypto.getRandomValues im Browser — derselben Quelle wie für kryptografische Schlüssel, nicht aus dem schwächeren Math.random.' },
    ],
    ui: withUi('de', { count: 'Anzahl', uppercase: 'Großbuchstaben', generate: 'Erzeugen', generated: 'Erzeugte UUIDs' }),
  },
  fr: {
    title: 'Générateur d’UUID',
    desc: 'Générer des UUID aléatoires de version 4',
    short: 'UUID v4 aléatoires',
    intro: [
      { h: 'La version 4, c’est du hasard pur', p: 'Un UUID v4 tient en 122 bits aléatoires, dont six réservés pour marquer version et variante. Ni l’heure ni la machine n’y sont encodées — c’est précisément pour cela que deux systèmes peuvent en émettre chacun de leur côté sans jamais se concerter.' },
      { h: 'Pourquoi les collisions ne sont pas un souci', p: 'Avec 122 bits aléatoires, il faudrait générer environ un milliard d’UUID par seconde pendant un siècle avant qu’un doublon devienne probable. Le hasard vient ici du générateur cryptographique du navigateur, pas de Math.random.' },
    ],
    faq: [
      { q: 'Peut-on s’en servir comme clés de base de données ?', a: 'Oui, mais des clés aléatoires dispersent les écritures dans l’index. Si le débit d’insertion compte, regardez UUIDv7 ou un schéma triable.' },
      { q: 'La casse compte-t-elle ?', a: 'Non. Les UUID sont insensibles à la casse ; les minuscules sont la forme d’usage, celle que produisent la plupart des bibliothèques.' },
      { q: 'D’où vient l’aléa ?', a: 'De crypto.getRandomValues dans le navigateur — la même source que pour les clés cryptographiques, pas le Math.random plus faible.' },
    ],
    ui: withUi('fr', { count: 'Combien', uppercase: 'Majuscules', generate: 'Générer', generated: 'UUID générés' }),
  },
  hi: {
    title: 'UUID जनरेटर',
    desc: 'संस्करण 4 के यादृच्छिक UUID बनाएँ',
    short: 'यादृच्छिक v4 UUID',
    intro: [
      { h: 'संस्करण 4 विशुद्ध यादृच्छिकता है', p: 'v4 UUID में 122 यादृच्छिक बिट होते हैं, जिनमें छह संस्करण और वैरिएंट बताने के लिए रखे जाते हैं। उसमें न समय बंधा है न मशीन — इसीलिए दो सिस्टम बिना किसी तालमेल के अलग-अलग UUID बना सकते हैं।' },
      { h: 'टकराव की चिंता क्यों नहीं', p: '122 यादृच्छिक बिट के साथ, दोहराव की संभावना बनने से पहले आपको एक सदी तक हर सेकंड लगभग एक अरब UUID बनाने पड़ेंगे। यहाँ यादृच्छिकता ब्राउज़र के क्रिप्टोग्राफ़िक जनरेटर से आती है, Math.random से नहीं।' },
    ],
    faq: [
      { q: 'क्या इन्हें डेटाबेस की कुंजी बनाया जा सकता है?', a: 'हाँ, हालाँकि यादृच्छिक कुंजियाँ लिखाई को पूरे इंडेक्स में बिखेर देती हैं। अगर इंसर्ट की गति मायने रखती है तो UUIDv7 या कोई क्रम में लगने वाली योजना देखिए।' },
      { q: 'क्या छोटे-बड़े अक्षर मायने रखते हैं?', a: 'नहीं। UUID में फ़र्क़ नहीं पड़ता; चलन छोटे अक्षरों का है और अधिकतर लाइब्रेरी वही देती हैं।' },
      { q: 'यादृच्छिकता कहाँ से आती है?', a: 'ब्राउज़र के crypto.getRandomValues से — वही स्रोत जो क्रिप्टोग्राफ़िक कुंजियों के लिए इस्तेमाल होता है, कमज़ोर Math.random नहीं।' },
    ],
    ui: withUi('hi', { count: 'कितने', uppercase: 'बड़े अक्षर', generate: 'बनाएँ', generated: 'बनाए गए UUID' }),
  },
  'zh-hans': {
    title: 'UUID 生成器',
    desc: '生成第 4 版的随机 UUID',
    short: '随机 v4 UUID',
    intro: [
      { h: '第 4 版就是纯随机', p: 'v4 UUID 是 122 个随机位，另有六位用来标记版本和变体。里面既不含时间也不含机器信息——正因如此，两套系统才能各自独立生成，事先不必约定任何事。' },
      { h: '为什么不用担心撞号', p: '122 个随机位意味着，要让重复变得可能，你得每秒生成十亿个 UUID 连续生成一个世纪。这里的随机数来自浏览器的密码学随机源，不是 Math.random。' },
    ],
    faq: [
      { q: '可以拿来当数据库主键吗？', a: '可以，不过随机主键会把写入分散到整个索引上。如果插入吞吐量要紧，可以看看 UUIDv7 或者别的可排序方案。' },
      { q: '大小写有区别吗？', a: '没有。UUID 不区分大小写；小写是惯例，多数库输出的也是小写。' },
      { q: '随机数从哪来？', a: '浏览器的 crypto.getRandomValues——和生成密钥用的是同一个源，不是较弱的 Math.random。' },
    ],
    ui: withUi('zh-hans', { count: '生成个数', uppercase: '大写', generate: '生成', generated: '生成的 UUID' }),
  },
  'zh-hant': {
    title: 'UUID 產生器',
    desc: '產生第 4 版的隨機 UUID',
    short: '隨機 v4 UUID',
    intro: [
      { h: '第 4 版就是純隨機', p: 'v4 UUID 是 122 個隨機位元，另有六位用來標記版本和變體。裡面既不含時間也不含機器資訊——正因如此，兩套系統才能各自獨立產生，事先不必約定任何事。' },
      { h: '為什麼不用擔心撞號', p: '122 個隨機位元意味著，要讓重複變得可能，你得每秒產生十億個 UUID 連續產生一個世紀。這裡的亂數來自瀏覽器的密碼學亂數源，不是 Math.random。' },
    ],
    faq: [
      { q: '可以拿來當資料庫主鍵嗎？', a: '可以，不過隨機主鍵會把寫入分散到整個索引上。如果插入吞吐量要緊，可以看看 UUIDv7 或者別的可排序方案。' },
      { q: '大小寫有區別嗎？', a: '沒有。UUID 不區分大小寫；小寫是慣例，多數函式庫輸出的也是小寫。' },
      { q: '亂數從哪來？', a: '瀏覽器的 crypto.getRandomValues——和產生金鑰用的是同一個來源，不是較弱的 Math.random。' },
    ],
    ui: withUi('zh-hant', { count: '產生個數', uppercase: '大寫', generate: '產生', generated: '產生的 UUID' }),
  },
};
