import type { CalcLang, CalcTable } from './types.ts';

/**
 * 개발자 도구 문구 — 한 파일에 모았다.
 *
 * 도구마다 화면이 단순하고 쓰는 말이 겹친다(입력·결과·복사·복사됨). 파일을
 * 열세 개로 쪼개면 같은 낱말을 아홉 언어 × 열세 번 적게 되므로, 공통 낱말은
 * DEV_UI 한 벌로 두고 도구마다 다른 것만 따로 적는다.
 *
 * 손으로 적는 것을 줄이면 그만큼 어긋날 자리가 준다 — 실제로 "복사" 한 낱말이
 * 언어마다 다르게 번역돼 있으면 화면이 들쭉날쭉해진다.
 */
export const DEV_UI: Record<CalcLang, Record<string, string>> = {
  en: { input: 'Input', result: 'Result', copy: 'Copy', copied: 'Copied ✓', run: 'Run', clear: 'Clear', invalid: 'That input is not valid.' },
  es: { input: 'Entrada', result: 'Resultado', copy: 'Copiar', copied: 'Copiado ✓', run: 'Ejecutar', clear: 'Limpiar', invalid: 'Esa entrada no es válida.' },
  'pt-br': { input: 'Entrada', result: 'Resultado', copy: 'Copiar', copied: 'Copiado ✓', run: 'Executar', clear: 'Limpar', invalid: 'Essa entrada não é válida.' },
  ja: { input: '入力', result: '結果', copy: 'コピー', copied: 'コピーしました ✓', run: '実行', clear: 'クリア', invalid: 'この入力は正しくありません。' },
  de: { input: 'Eingabe', result: 'Ergebnis', copy: 'Kopieren', copied: 'Kopiert ✓', run: 'Ausführen', clear: 'Leeren', invalid: 'Diese Eingabe ist nicht gültig.' },
  fr: { input: 'Entrée', result: 'Résultat', copy: 'Copier', copied: 'Copié ✓', run: 'Exécuter', clear: 'Effacer', invalid: 'Cette entrée n’est pas valide.' },
  hi: { input: 'इनपुट', result: 'परिणाम', copy: 'कॉपी', copied: 'कॉपी हो गया ✓', run: 'चलाएँ', clear: 'साफ़ करें', invalid: 'यह इनपुट मान्य नहीं है।' },
  'zh-hans': { input: '输入', result: '结果', copy: '复制', copied: '已复制 ✓', run: '执行', clear: '清空', invalid: '这个输入无效。' },
  'zh-hant': { input: '輸入', result: '結果', copy: '複製', copied: '已複製 ✓', run: '執行', clear: '清空', invalid: '這個輸入無效。' },
};

/** 공통 낱말에 도구별 낱말을 얹는다. */
function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

export const DEV_JSON: CalcTable = {
  en: {
    title: 'JSON formatter',
    desc: 'Pretty-print, validate and minify JSON in the browser',
    short: 'Format · validate · minify',
    intro: [
      { h: 'Nothing leaves the page', p: 'Parsing happens in your browser with the built-in JSON parser. Nothing is uploaded, which matters when the payload you are debugging has real customer data in it.' },
      { h: 'Where the error message points', p: 'When JSON is invalid the parser reports the character position it gave up at. That is usually just after the real mistake — a trailing comma or an unquoted key on the line above.' },
    ],
    faq: [
      { q: 'Are trailing commas allowed?', a: 'No. JSON forbids them, even though JavaScript object literals allow them. This is the single most common reason a hand-edited file fails to parse.' },
      { q: 'Can keys use single quotes?', a: 'No. JSON requires double quotes on both keys and string values. Single quotes are valid JavaScript but not valid JSON.' },
      { q: 'Is key order preserved?', a: 'Yes, the order you pasted is kept. JSON itself does not guarantee object key order, but parsers in practice preserve it.' },
    ],
    ui: withUi('en', { indent: 'Indent', minify: 'Minify', placeholder: 'Paste JSON here' }),
  },
  es: {
    title: 'Formateador de JSON',
    desc: 'Formatea, valida y minifica JSON en el navegador',
    short: 'Formatear · validar · minificar',
    intro: [
      { h: 'Nada sale de la página', p: 'El análisis ocurre en tu navegador con el parser nativo de JSON. No se sube nada, lo que importa cuando el payload que depuras lleva datos reales de clientes.' },
      { h: 'A dónde apunta el error', p: 'Cuando el JSON no es válido, el parser indica la posición del carácter donde se rindió. Suele estar justo después del fallo real: una coma sobrante o una clave sin comillas en la línea anterior.' },
    ],
    faq: [
      { q: '¿Se permiten comas finales?', a: 'No. JSON las prohíbe, aunque los literales de objeto de JavaScript sí las acepten. Es el motivo más habitual de que un archivo editado a mano no pase.' },
      { q: '¿Puedo usar comillas simples en las claves?', a: 'No. JSON exige comillas dobles tanto en claves como en cadenas. Las simples son JavaScript válido pero no JSON válido.' },
      { q: '¿Se conserva el orden de las claves?', a: 'Sí, se mantiene el orden que pegaste. JSON no garantiza el orden de las claves, pero en la práctica los parsers lo conservan.' },
    ],
    ui: withUi('es', { indent: 'Sangría', minify: 'Minificar', placeholder: 'Pega aquí el JSON' }),
  },
  'pt-br': {
    title: 'Formatador de JSON',
    desc: 'Formate, valide e minifique JSON no navegador',
    short: 'Formatar · validar · minificar',
    intro: [
      { h: 'Nada sai da página', p: 'A análise acontece no seu navegador com o parser nativo de JSON. Nada é enviado, o que importa quando o payload que você está depurando tem dados reais de clientes.' },
      { h: 'Para onde o erro aponta', p: 'Quando o JSON é inválido, o parser informa a posição do caractere em que desistiu. Costuma ser logo depois do erro real — uma vírgula sobrando ou uma chave sem aspas na linha anterior.' },
    ],
    faq: [
      { q: 'Vírgula no final é permitida?', a: 'Não. JSON proíbe, mesmo que literais de objeto em JavaScript aceitem. É o motivo mais comum de um arquivo editado à mão não passar.' },
      { q: 'Posso usar aspas simples nas chaves?', a: 'Não. JSON exige aspas duplas em chaves e em strings. Aspas simples são JavaScript válido, mas não JSON válido.' },
      { q: 'A ordem das chaves é preservada?', a: 'Sim, a ordem colada é mantida. O JSON em si não garante ordem de chaves, mas na prática os parsers preservam.' },
    ],
    ui: withUi('pt-br', { indent: 'Indentação', minify: 'Minificar', placeholder: 'Cole o JSON aqui' }),
  },
  ja: {
    title: 'JSON フォーマッター',
    desc: 'ブラウザ内で JSON を整形・検証・圧縮',
    short: '整形・検証・圧縮',
    intro: [
      { h: 'ページの外に出ません', p: '解析はブラウザ内の JSON パーサーで行います。どこにも送らないので、実際の顧客データが入ったペイロードを見るときでも安心です。' },
      { h: 'エラー位置の読み方', p: 'JSON が不正なとき、パーサーは諦めた文字位置を返します。それはたいてい本当の誤りの少し後ろです — 前の行の末尾カンマや、引用符のないキーが原因のことが多いです。' },
    ],
    faq: [
      { q: '末尾のカンマは使えますか。', a: '使えません。JavaScript のオブジェクトリテラルでは許されますが、JSON では禁止です。手で編集したファイルが通らない原因はたいていこれです。' },
      { q: 'キーをシングルクォートで囲めますか。', a: '囲めません。JSON はキーも文字列もダブルクォートを要求します。シングルクォートは JavaScript としては正しくても JSON としては不正です。' },
      { q: 'キーの順序は保たれますか。', a: '貼り付けた順序のまま保たれます。JSON 自体は順序を保証しませんが、実際のパーサーは保持します。' },
    ],
    ui: withUi('ja', { indent: 'インデント', minify: '圧縮', placeholder: 'ここに JSON を貼り付け' }),
  },
  de: {
    title: 'JSON-Formatierer',
    desc: 'JSON im Browser formatieren, prüfen und minifizieren',
    short: 'Formatieren · prüfen · minifizieren',
    intro: [
      { h: 'Nichts verlässt die Seite', p: 'Das Parsen läuft im Browser mit dem eingebauten JSON-Parser. Nichts wird hochgeladen — wichtig, wenn im Payload, den du debuggst, echte Kundendaten stehen.' },
      { h: 'Worauf die Fehlermeldung zeigt', p: 'Bei ungültigem JSON nennt der Parser die Zeichenposition, an der er aufgegeben hat. Der eigentliche Fehler liegt meist knapp davor — ein Komma zu viel oder ein Schlüssel ohne Anführungszeichen eine Zeile höher.' },
    ],
    faq: [
      { q: 'Sind abschließende Kommas erlaubt?', a: 'Nein. JSON verbietet sie, obwohl JavaScript-Objektliterale sie zulassen. Das ist der häufigste Grund, warum eine handbearbeitete Datei nicht durchgeht.' },
      { q: 'Dürfen Schlüssel einfache Anführungszeichen haben?', a: 'Nein. JSON verlangt doppelte Anführungszeichen bei Schlüsseln und Zeichenketten. Einfache sind gültiges JavaScript, aber kein gültiges JSON.' },
      { q: 'Bleibt die Reihenfolge der Schlüssel erhalten?', a: 'Ja, die eingefügte Reihenfolge bleibt. JSON garantiert keine Schlüsselreihenfolge, in der Praxis behalten Parser sie aber bei.' },
    ],
    ui: withUi('de', { indent: 'Einrückung', minify: 'Minifizieren', placeholder: 'JSON hier einfügen' }),
  },
  fr: {
    title: 'Formateur JSON',
    desc: 'Mettre en forme, valider et minifier du JSON dans le navigateur',
    short: 'Formater · valider · minifier',
    intro: [
      { h: 'Rien ne quitte la page', p: 'L’analyse se fait dans votre navigateur avec l’analyseur JSON natif. Rien n’est envoyé, ce qui compte quand la charge utile que vous déboguez contient de vraies données clients.' },
      { h: 'Où pointe le message d’erreur', p: 'Quand le JSON est invalide, l’analyseur indique la position du caractère où il a renoncé. C’est en général juste après la vraie faute : une virgule en trop ou une clé sans guillemets à la ligne précédente.' },
    ],
    faq: [
      { q: 'Les virgules finales sont-elles autorisées ?', a: 'Non. JSON les interdit, alors que les littéraux d’objet JavaScript les acceptent. C’est la première cause d’échec d’un fichier édité à la main.' },
      { q: 'Peut-on mettre les clés entre apostrophes ?', a: 'Non. JSON exige des guillemets doubles pour les clés comme pour les chaînes. Les apostrophes sont du JavaScript valide, pas du JSON valide.' },
      { q: 'L’ordre des clés est-il conservé ?', a: 'Oui, l’ordre collé est conservé. JSON ne garantit pas l’ordre des clés, mais en pratique les analyseurs le préservent.' },
    ],
    ui: withUi('fr', { indent: 'Indentation', minify: 'Minifier', placeholder: 'Collez le JSON ici' }),
  },
  hi: {
    title: 'JSON फ़ॉर्मैटर',
    desc: 'ब्राउज़र में ही JSON सजाएँ, जाँचें और छोटा करें',
    short: 'फ़ॉर्मैट · जाँच · मिनिफ़ाई',
    intro: [
      { h: 'कुछ भी पन्ने से बाहर नहीं जाता', p: 'पार्सिंग आपके ब्राउज़र के अंदर JSON पार्सर से होती है। कुछ भी अपलोड नहीं होता — यह तब मायने रखता है जब जिस पेलोड को आप देख रहे हैं उसमें असली ग्राहक डेटा हो।' },
      { h: 'ग़लती का पता कहाँ बताता है', p: 'JSON ग़लत होने पर पार्सर वह अक्षर-स्थान बताता है जहाँ उसने हार मानी। असली ग़लती आम तौर पर उससे ठीक पहले होती है — पिछली पंक्ति में एक अतिरिक्त कॉमा या बिना उद्धरण वाली कुंजी।' },
    ],
    faq: [
      { q: 'क्या आख़िर में कॉमा चल सकता है?', a: 'नहीं। JSON इसे मना करता है, जबकि JavaScript के ऑब्जेक्ट लिटरल में चलता है। हाथ से बदली गई फ़ाइल फ़ेल होने की सबसे आम वजह यही है।' },
      { q: 'क्या कुंजी में सिंगल कोट चल सकते हैं?', a: 'नहीं। JSON कुंजी और स्ट्रिंग दोनों में डबल कोट माँगता है। सिंगल कोट सही JavaScript है, सही JSON नहीं।' },
      { q: 'क्या कुंजियों का क्रम बना रहता है?', a: 'हाँ, आपने जिस क्रम में चिपकाया वही रहता है। JSON ख़ुद क्रम की गारंटी नहीं देता, पर व्यवहार में पार्सर उसे बनाए रखते हैं।' },
    ],
    ui: withUi('hi', { indent: 'इंडेंट', minify: 'मिनिफ़ाई', placeholder: 'यहाँ JSON चिपकाएँ' }),
  },
  'zh-hans': {
    title: 'JSON 格式化',
    desc: '在浏览器里格式化、校验、压缩 JSON',
    short: '格式化 · 校验 · 压缩',
    intro: [
      { h: '什么都不会离开这个页面', p: '解析用的是浏览器内置的 JSON 解析器，不上传任何内容。当你正在排查的报文里有真实客户数据时，这一点很要紧。' },
      { h: '报错位置指向哪里', p: 'JSON 不合法时，解析器会给出它放弃的那个字符位置。真正的错误通常在它之前一点——上一行多了个逗号，或者键没加引号。' },
    ],
    faq: [
      { q: '末尾能加逗号吗？', a: '不能。JSON 禁止，尽管 JavaScript 的对象字面量允许。手改的文件解析失败，多半就是因为这个。' },
      { q: '键可以用单引号吗？', a: '不可以。JSON 要求键和字符串都用双引号。单引号是合法的 JavaScript，但不是合法的 JSON。' },
      { q: '键的顺序会保留吗？', a: '会，粘贴时的顺序保持不变。JSON 本身不保证键的顺序，但实际的解析器都会保留。' },
    ],
    ui: withUi('zh-hans', { indent: '缩进', minify: '压缩', placeholder: '把 JSON 粘贴到这里' }),
  },
  'zh-hant': {
    title: 'JSON 格式化',
    desc: '在瀏覽器裡格式化、驗證、壓縮 JSON',
    short: '格式化 · 驗證 · 壓縮',
    intro: [
      { h: '什麼都不會離開這個頁面', p: '解析用的是瀏覽器內建的 JSON 解析器，不上傳任何內容。當你正在排查的封包裡有真實客戶資料時，這一點很要緊。' },
      { h: '錯誤位置指向哪裡', p: 'JSON 不合法時，解析器會給出它放棄的那個字元位置。真正的錯誤通常在它之前一點——上一行多了個逗號，或者鍵沒加引號。' },
    ],
    faq: [
      { q: '結尾能加逗號嗎？', a: '不能。JSON 禁止，儘管 JavaScript 的物件實字允許。手改的檔案解析失敗，多半就是因為這個。' },
      { q: '鍵可以用單引號嗎？', a: '不可以。JSON 要求鍵和字串都用雙引號。單引號是合法的 JavaScript，但不是合法的 JSON。' },
      { q: '鍵的順序會保留嗎？', a: '會，貼上時的順序保持不變。JSON 本身不保證鍵的順序，但實際的解析器都會保留。' },
    ],
    ui: withUi('zh-hant', { indent: '縮排', minify: '壓縮', placeholder: '把 JSON 貼到這裡' }),
  },
};

export const DEV_BASE64: CalcTable = {
  en: {
    title: 'Base64 encoder and decoder',
    desc: 'Encode text to Base64 and decode it back, in the browser',
    short: 'Encode · decode',
    intro: [
      { h: 'Base64 is not encryption', p: 'It turns bytes into 64 printable characters so they survive channels that only carry text. Anyone can reverse it in a second. Never use it to hide anything.' },
      { h: 'Why it grows by a third', p: 'Every three bytes become four characters, so encoded data is about 33% larger than the original. That is the cost of squeezing arbitrary bytes through a text-only pipe.' },
    ],
    faq: [
      { q: 'Does it handle non-Latin text?', a: 'Yes. The text is converted to UTF-8 bytes first, so Japanese, Arabic, emoji and anything else round-trip correctly.' },
      { q: 'What is URL-safe Base64?', a: 'A variant that uses - and _ instead of + and /, so the result can sit in a URL without escaping. JWTs use it. This tool handles the standard alphabet.' },
      { q: 'Why does decoding fail?', a: 'Usually a truncated string or one that picked up whitespace or a stray character. Base64 length must be a multiple of four, padded with = if needed.' },
    ],
    ui: withUi('en', { encode: 'Encode', decode: 'Decode', source: 'Text', encoded: 'Base64', placeholderEnc: 'Text to encode', placeholderDec: 'Base64 string' }),
  },
  es: {
    title: 'Codificador y decodificador Base64',
    desc: 'Codifica texto a Base64 y vuelve atrás, en el navegador',
    short: 'Codificar · decodificar',
    intro: [
      { h: 'Base64 no es cifrado', p: 'Convierte bytes en 64 caracteres imprimibles para que sobrevivan a canales que solo transportan texto. Cualquiera lo revierte en un segundo. No lo uses nunca para ocultar nada.' },
      { h: 'Por qué crece un tercio', p: 'Cada tres bytes se convierten en cuatro caracteres, así que el resultado ocupa un 33% más. Es el precio de meter bytes arbitrarios por una tubería que solo admite texto.' },
    ],
    faq: [
      { q: '¿Funciona con texto no latino?', a: 'Sí. El texto se pasa antes a bytes UTF-8, de modo que japonés, árabe, emoji y cualquier otra cosa vuelven intactos.' },
      { q: '¿Qué es el Base64 seguro para URL?', a: 'Una variante que usa - y _ en lugar de + y /, para que el resultado quepa en una URL sin escapar. Los JWT lo usan. Esta herramienta trabaja con el alfabeto estándar.' },
      { q: '¿Por qué falla la decodificación?', a: 'Casi siempre por una cadena cortada o con espacios o algún carácter suelto. La longitud debe ser múltiplo de cuatro, rellenando con = si hace falta.' },
    ],
    ui: withUi('es', { encode: 'Codificar', decode: 'Decodificar', source: 'Texto', encoded: 'Base64', placeholderEnc: 'Texto a codificar', placeholderDec: 'Cadena Base64' }),
  },
  'pt-br': {
    title: 'Codificador e decodificador Base64',
    desc: 'Codifique texto em Base64 e volte atrás, no navegador',
    short: 'Codificar · decodificar',
    intro: [
      { h: 'Base64 não é criptografia', p: 'Ele transforma bytes em 64 caracteres imprimíveis para que sobrevivam a canais que só carregam texto. Qualquer um reverte em um segundo. Nunca use para esconder nada.' },
      { h: 'Por que cresce um terço', p: 'Cada três bytes viram quatro caracteres, então o resultado fica cerca de 33% maior. É o preço de passar bytes arbitrários por um cano que só aceita texto.' },
    ],
    faq: [
      { q: 'Funciona com texto não latino?', a: 'Funciona. O texto vira bytes UTF-8 antes, então japonês, árabe, emoji e o que mais houver voltam intactos.' },
      { q: 'O que é Base64 seguro para URL?', a: 'Uma variante que usa - e _ no lugar de + e /, para o resultado caber numa URL sem escape. Os JWTs usam. Esta ferramenta trabalha com o alfabeto padrão.' },
      { q: 'Por que a decodificação falha?', a: 'Quase sempre por uma string cortada ou com espaços e caracteres soltos. O comprimento precisa ser múltiplo de quatro, completado com = quando necessário.' },
    ],
    ui: withUi('pt-br', { encode: 'Codificar', decode: 'Decodificar', source: 'Texto', encoded: 'Base64', placeholderEnc: 'Texto para codificar', placeholderDec: 'String Base64' }),
  },
  ja: {
    title: 'Base64 エンコード・デコード',
    desc: 'ブラウザ内でテキストを Base64 に変換し、元に戻す',
    short: 'エンコード・デコード',
    intro: [
      { h: 'Base64 は暗号ではありません', p: 'バイト列を64種類の印字可能な文字に置き換え、テキストしか通さない経路でも壊れないようにするものです。誰でも一瞬で元に戻せます。隠したいものに使ってはいけません。' },
      { h: '3分の1ほど大きくなる理由', p: '3バイトが4文字になるので、エンコード後は約33%大きくなります。テキストしか通らない管に任意のバイト列を通すための代価です。' },
    ],
    faq: [
      { q: '日本語も扱えますか。', a: '扱えます。先に UTF-8 のバイト列に変換するので、日本語もアラビア語も絵文字も往復して元通りになります。' },
      { q: 'URLセーフな Base64 とは何ですか。', a: '+ と / の代わりに - と _ を使う変種で、エスケープなしで URL に入れられます。JWT がこれを使います。このツールは標準の文字集合を扱います。' },
      { q: 'デコードが失敗するのはなぜですか。', a: 'たいていは文字列が途中で切れているか、空白や余計な文字が混ざっています。長さは4の倍数で、足りない分は = で埋めます。' },
    ],
    ui: withUi('ja', { encode: 'エンコード', decode: 'デコード', source: 'テキスト', encoded: 'Base64', placeholderEnc: '変換するテキスト', placeholderDec: 'Base64 文字列' }),
  },
  de: {
    title: 'Base64 kodieren und dekodieren',
    desc: 'Text im Browser nach Base64 kodieren und zurück',
    short: 'Kodieren · dekodieren',
    intro: [
      { h: 'Base64 ist keine Verschlüsselung', p: 'Es macht aus Bytes 64 druckbare Zeichen, damit sie Kanäle überstehen, die nur Text transportieren. Jeder kann das in einer Sekunde umkehren. Nutze es niemals, um etwas zu verbergen.' },
      { h: 'Warum es um ein Drittel wächst', p: 'Aus je drei Bytes werden vier Zeichen, kodierte Daten sind also rund 33% größer. Das ist der Preis dafür, beliebige Bytes durch eine reine Textleitung zu schieben.' },
    ],
    faq: [
      { q: 'Funktioniert das mit nicht-lateinischem Text?', a: 'Ja. Der Text wird zuerst in UTF-8-Bytes umgewandelt, damit kommen Japanisch, Arabisch, Emoji und alles andere unverändert zurück.' },
      { q: 'Was ist URL-sicheres Base64?', a: 'Eine Variante mit - und _ statt + und /, damit das Ergebnis ohne Escaping in eine URL passt. JWTs nutzen sie. Dieses Werkzeug arbeitet mit dem Standardalphabet.' },
      { q: 'Warum schlägt das Dekodieren fehl?', a: 'Meist ist die Zeichenkette abgeschnitten oder hat Leerzeichen bzw. ein fremdes Zeichen aufgeschnappt. Die Länge muss ein Vielfaches von vier sein, notfalls mit = aufgefüllt.' },
    ],
    ui: withUi('de', { encode: 'Kodieren', decode: 'Dekodieren', source: 'Text', encoded: 'Base64', placeholderEnc: 'Zu kodierender Text', placeholderDec: 'Base64-Zeichenkette' }),
  },
  fr: {
    title: 'Encodeur et décodeur Base64',
    desc: 'Encoder du texte en Base64 et revenir en arrière, dans le navigateur',
    short: 'Encoder · décoder',
    intro: [
      { h: 'Base64 n’est pas du chiffrement', p: 'Cela transforme des octets en 64 caractères imprimables pour qu’ils survivent aux canaux qui ne transportent que du texte. N’importe qui l’inverse en une seconde. Ne vous en servez jamais pour cacher quoi que ce soit.' },
      { h: 'Pourquoi cela grossit d’un tiers', p: 'Trois octets deviennent quatre caractères : les données encodées pèsent environ 33% de plus. C’est le prix à payer pour faire passer des octets quelconques dans un tuyau réservé au texte.' },
    ],
    faq: [
      { q: 'Cela gère-t-il le texte non latin ?', a: 'Oui. Le texte est d’abord converti en octets UTF-8, donc japonais, arabe, emoji et le reste font l’aller-retour sans dommage.' },
      { q: 'Qu’est-ce que le Base64 compatible URL ?', a: 'Une variante qui utilise - et _ au lieu de + et /, pour tenir dans une URL sans échappement. Les JWT l’utilisent. Cet outil traite l’alphabet standard.' },
      { q: 'Pourquoi le décodage échoue-t-il ?', a: 'Le plus souvent la chaîne est tronquée ou contient des espaces ou un caractère parasite. La longueur doit être un multiple de quatre, complétée par = si besoin.' },
    ],
    ui: withUi('fr', { encode: 'Encoder', decode: 'Décoder', source: 'Texte', encoded: 'Base64', placeholderEnc: 'Texte à encoder', placeholderDec: 'Chaîne Base64' }),
  },
  hi: {
    title: 'Base64 एन्कोडर और डिकोडर',
    desc: 'ब्राउज़र में ही टेक्स्ट को Base64 में बदलें और वापस लाएँ',
    short: 'एन्कोड · डिकोड',
    intro: [
      { h: 'Base64 एन्क्रिप्शन नहीं है', p: 'यह बाइट्स को 64 छपने-योग्य अक्षरों में बदल देता है ताकि वे सिर्फ़ टेक्स्ट ढोने वाले रास्तों से सही-सलामत गुज़र जाएँ। कोई भी इसे एक पल में उलट सकता है। कुछ छिपाने के लिए इसका इस्तेमाल कभी न करें।' },
      { h: 'आकार एक-तिहाई क्यों बढ़ता है', p: 'हर तीन बाइट चार अक्षर बन जाते हैं, इसलिए एन्कोड किया डेटा लगभग 33% बड़ा होता है। सिर्फ़ टेक्स्ट वाली नली से मनमानी बाइट्स गुज़ारने की यही क़ीमत है।' },
    ],
    faq: [
      { q: 'क्या ग़ैर-लैटिन टेक्स्ट चलता है?', a: 'हाँ। टेक्स्ट पहले UTF-8 बाइट्स में बदलता है, इसलिए देवनागरी, अरबी, इमोजी — सब ज्यों का त्यों वापस आता है।' },
      { q: 'URL-सुरक्षित Base64 क्या है?', a: 'एक रूप जिसमें + और / की जगह - और _ आते हैं, ताकि नतीजा बिना एस्केप किए URL में बैठ जाए। JWT यही इस्तेमाल करता है। यह टूल मानक वर्णमाला संभालता है।' },
      { q: 'डिकोड क्यों विफल होता है?', a: 'आम तौर पर स्ट्रिंग अधूरी होती है या उसमें ख़ाली जगह या कोई फालतू अक्षर आ गया होता है। लंबाई चार का गुणज होनी चाहिए, ज़रूरत हो तो = से भरी हुई।' },
    ],
    ui: withUi('hi', { encode: 'एन्कोड', decode: 'डिकोड', source: 'टेक्स्ट', encoded: 'Base64', placeholderEnc: 'एन्कोड करने का टेक्स्ट', placeholderDec: 'Base64 स्ट्रिंग' }),
  },
  'zh-hans': {
    title: 'Base64 编码解码',
    desc: '在浏览器里把文本编码成 Base64，再解回来',
    short: '编码 · 解码',
    intro: [
      { h: 'Base64 不是加密', p: '它把字节换成 64 个可打印字符，好让它们能通过只传文本的通道。任何人一秒钟就能还原。千万不要拿它来藏东西。' },
      { h: '为什么会大三分之一', p: '每三个字节变成四个字符，所以编码后大约大 33%。这是把任意字节塞进只走文本的管道所要付的代价。' },
    ],
    faq: [
      { q: '中文可以吗？', a: '可以。文本会先转成 UTF-8 字节，所以中文、阿拉伯文、表情符号都能原样往返。' },
      { q: 'URL 安全的 Base64 是什么？', a: '它用 - 和 _ 代替 + 和 /，这样结果不用转义就能放进 URL。JWT 用的就是这种。本工具处理的是标准字符集。' },
      { q: '解码为什么会失败？', a: '多半是字符串被截断，或者混进了空格和多余字符。长度必须是 4 的倍数，不够的用 = 补齐。' },
    ],
    ui: withUi('zh-hans', { encode: '编码', decode: '解码', source: '文本', encoded: 'Base64', placeholderEnc: '要编码的文本', placeholderDec: 'Base64 字符串' }),
  },
  'zh-hant': {
    title: 'Base64 編碼解碼',
    desc: '在瀏覽器裡把文字編碼成 Base64，再解回來',
    short: '編碼 · 解碼',
    intro: [
      { h: 'Base64 不是加密', p: '它把位元組換成 64 個可列印字元，好讓它們能通過只傳文字的通道。任何人一秒鐘就能還原。千萬不要拿它來藏東西。' },
      { h: '為什麼會大三分之一', p: '每三個位元組變成四個字元，所以編碼後大約大 33%。這是把任意位元組塞進只走文字的管道所要付的代價。' },
    ],
    faq: [
      { q: '中文可以嗎？', a: '可以。文字會先轉成 UTF-8 位元組，所以中文、阿拉伯文、表情符號都能原樣往返。' },
      { q: 'URL 安全的 Base64 是什麼？', a: '它用 - 和 _ 代替 + 和 /，這樣結果不用跳脫就能放進 URL。JWT 用的就是這種。本工具處理的是標準字元集。' },
      { q: '解碼為什麼會失敗？', a: '多半是字串被截斷，或者混進了空格和多餘字元。長度必須是 4 的倍數，不夠的用 = 補齊。' },
    ],
    ui: withUi('zh-hant', { encode: '編碼', decode: '解碼', source: '文字', encoded: 'Base64', placeholderEnc: '要編碼的文字', placeholderDec: 'Base64 字串' }),
  },
};
