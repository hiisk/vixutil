import type { CalcLang, CalcTable } from './types.ts';
import { DEV_UI } from './dev-tools.ts';

function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

export const DEV_JWT: CalcTable = {
  en: {
    title: 'JWT decoder',
    desc: 'Read the header and payload of a JSON Web Token',
    short: 'Decode header and payload',
    intro: [
      { h: 'Decoding is not verifying', p: 'A JWT is three Base64url pieces joined by dots, and anyone can read the first two without a key. This tool shows you what is inside. It does not — and cannot — tell you whether the signature is genuine; only a server holding the key can do that.' },
      { h: 'What the standard claims mean', p: 'exp is when the token stops being valid, iat when it was issued, nbf the earliest it may be used, iss who issued it, sub who it is about, aud who it is for. All the time fields are Unix seconds, not milliseconds.' },
    ],
    faq: [
      { q: 'Is my token sent anywhere?', a: 'No. The split and Base64 decode happen in your browser. Still, treat any token you paste anywhere as compromised and rotate it if it was a live one.' },
      { q: 'Why does the payload look readable?', a: 'Because a JWT is signed, not encrypted. Base64url is an encoding, not a secret. Never put anything private in a payload.' },
      { q: 'Can you check the signature here?', a: 'No. That needs the signing key, and a key pasted into a web page stops being a key. Verify server-side.' },
    ],
    ui: withUi('en', {
      token: 'JWT token', header: 'Header', payload: 'Payload', signature: 'Signature',
      valid: '✓ Not expired (by exp)', expired: '⚠ Expired', noExp: 'No exp claim',
      malformed: 'A JWT must look like header.payload.signature',
      notice: 'Signature verification is not supported. The payload is just Base64-decoded — verify it on your server.',
    }),
  },
  es: {
    title: 'Decodificador de JWT',
    desc: 'Lee la cabecera y el payload de un JSON Web Token',
    short: 'Decodificar cabecera y payload',
    intro: [
      { h: 'Decodificar no es verificar', p: 'Un JWT son tres bloques Base64url unidos por puntos, y cualquiera puede leer los dos primeros sin clave. Esta herramienta te enseña qué hay dentro. No te dice —ni puede— si la firma es auténtica; eso solo lo hace un servidor con la clave.' },
      { h: 'Qué significan los claims estándar', p: 'exp es cuándo deja de valer el token, iat cuándo se emitió, nbf lo antes que puede usarse, iss quién lo emitió, sub sobre quién trata, aud para quién es. Todos los campos de tiempo van en segundos Unix, no en milisegundos.' },
    ],
    faq: [
      { q: '¿Se envía mi token a algún sitio?', a: 'No. La división y la decodificación Base64 ocurren en tu navegador. Aun así, da por comprometido cualquier token que pegues en cualquier parte y rótalo si era real.' },
      { q: '¿Por qué el payload se lee tan fácil?', a: 'Porque un JWT va firmado, no cifrado. Base64url es una codificación, no un secreto. Nunca metas nada privado en el payload.' },
      { q: '¿Podéis comprobar la firma aquí?', a: 'No. Haría falta la clave de firma, y una clave pegada en una página web deja de ser una clave. Verifica en el servidor.' },
    ],
    ui: withUi('es', {
      token: 'Token JWT', header: 'Cabecera', payload: 'Payload', signature: 'Firma',
      valid: '✓ No caducado (según exp)', expired: '⚠ Caducado', noExp: 'Sin claim exp',
      malformed: 'Un JWT debe tener la forma cabecera.payload.firma',
      notice: 'No se verifica la firma. El payload es solo el resultado de decodificar Base64: verifícalo en tu servidor.',
    }),
  },
  'pt-br': {
    title: 'Decodificador de JWT',
    desc: 'Leia o cabeçalho e o payload de um JSON Web Token',
    short: 'Decodificar cabeçalho e payload',
    intro: [
      { h: 'Decodificar não é verificar', p: 'Um JWT são três blocos Base64url unidos por pontos, e qualquer um lê os dois primeiros sem chave. Esta ferramenta mostra o que há dentro. Ela não diz — nem pode — se a assinatura é legítima; só um servidor com a chave faz isso.' },
      { h: 'O que significam os claims padrão', p: 'exp é quando o token deixa de valer, iat quando foi emitido, nbf o mais cedo que pode ser usado, iss quem emitiu, sub sobre quem é, aud para quem é. Todos os campos de tempo são segundos Unix, não milissegundos.' },
    ],
    faq: [
      { q: 'Meu token é enviado para algum lugar?', a: 'Não. A divisão e a decodificação Base64 acontecem no seu navegador. Ainda assim, considere comprometido qualquer token que você cole em qualquer lugar e troque-o se era real.' },
      { q: 'Por que o payload é legível?', a: 'Porque um JWT é assinado, não criptografado. Base64url é codificação, não segredo. Nunca coloque nada privado no payload.' },
      { q: 'Dá para conferir a assinatura aqui?', a: 'Não. Isso exige a chave, e uma chave colada numa página web deixa de ser chave. Verifique no servidor.' },
    ],
    ui: withUi('pt-br', {
      token: 'Token JWT', header: 'Cabeçalho', payload: 'Payload', signature: 'Assinatura',
      valid: '✓ Não expirado (pelo exp)', expired: '⚠ Expirado', noExp: 'Sem claim exp',
      malformed: 'Um JWT precisa ter a forma cabeçalho.payload.assinatura',
      notice: 'A assinatura não é verificada. O payload é apenas o Base64 decodificado — confira no seu servidor.',
    }),
  },
  ja: {
    title: 'JWT デコーダー',
    desc: 'JSON Web Token のヘッダーとペイロードを読む',
    short: 'ヘッダー・ペイロードの復号',
    intro: [
      { h: '復号は検証ではありません', p: 'JWT はドットでつないだ三つの Base64url です。前の二つは鍵がなくても誰でも読めます。この道具は中身を見せるだけで、署名が本物かどうかは告げませんし、告げられません。それができるのは鍵を持つサーバーだけです。' },
      { h: '標準クレームの意味', p: 'exp は有効期限、iat は発行時刻、nbf はこれ以前は使えないという時刻、iss は発行者、sub は誰についてか、aud は誰宛てか。時刻はいずれも Unix 秒で、ミリ秒ではありません。' },
    ],
    faq: [
      { q: 'トークンはどこかに送られますか。', a: '送られません。分割と Base64 復号はブラウザ内で行います。ただしどこかに貼ったトークンは漏れたものとみなし、実運用のものなら差し替えてください。' },
      { q: 'ペイロードが読めてしまうのはなぜですか。', a: 'JWT は署名されているだけで、暗号化はされていないからです。Base64url は符号化であって秘匿ではありません。秘密の情報をペイロードに入れてはいけません。' },
      { q: 'ここで署名を検証できますか。', a: 'できません。署名鍵が要りますが、ウェブページに貼った鍵はもう鍵ではありません。検証はサーバー側で行ってください。' },
    ],
    ui: withUi('ja', {
      token: 'JWT トークン', header: 'ヘッダー', payload: 'ペイロード', signature: '署名',
      valid: '✓ 期限内（exp 基準）', expired: '⚠ 期限切れ', noExp: 'exp クレームなし',
      malformed: 'JWT は header.payload.signature の形でなければなりません',
      notice: '署名の検証はしません。ペイロードは Base64 を復号しただけです — 検証はサーバーで行ってください。',
    }),
  },
  de: {
    title: 'JWT-Decoder',
    desc: 'Header und Payload eines JSON Web Token lesen',
    short: 'Header und Payload dekodieren',
    intro: [
      { h: 'Dekodieren ist kein Prüfen', p: 'Ein JWT besteht aus drei mit Punkten verbundenen Base64url-Teilen; die ersten beiden kann jeder ohne Schlüssel lesen. Dieses Werkzeug zeigt, was drinsteht. Ob die Signatur echt ist, sagt es nicht — und kann es nicht. Das kann nur ein Server, der den Schlüssel hat.' },
      { h: 'Was die Standard-Claims bedeuten', p: 'exp ist der Ablauf, iat der Ausstellungszeitpunkt, nbf der früheste Nutzungszeitpunkt, iss der Aussteller, sub worum es geht, aud für wen es gilt. Alle Zeitfelder sind Unix-Sekunden, keine Millisekunden.' },
    ],
    faq: [
      { q: 'Wird mein Token irgendwohin geschickt?', a: 'Nein. Zerlegen und Base64-Dekodieren passieren im Browser. Trotzdem: Betrachte jedes irgendwo eingefügte Token als kompromittiert und tausche es aus, wenn es ein echtes war.' },
      { q: 'Warum ist der Payload lesbar?', a: 'Weil ein JWT signiert und nicht verschlüsselt ist. Base64url ist eine Kodierung, kein Geheimnis. Niemals Vertrauliches in den Payload schreiben.' },
      { q: 'Könnt ihr hier die Signatur prüfen?', a: 'Nein. Dafür bräuchte es den Signaturschlüssel, und ein in eine Webseite eingefügter Schlüssel ist keiner mehr. Prüfe serverseitig.' },
    ],
    ui: withUi('de', {
      token: 'JWT-Token', header: 'Header', payload: 'Payload', signature: 'Signatur',
      valid: '✓ Nicht abgelaufen (laut exp)', expired: '⚠ Abgelaufen', noExp: 'Kein exp-Claim',
      malformed: 'Ein JWT muss die Form header.payload.signature haben',
      notice: 'Die Signatur wird nicht geprüft. Der Payload ist nur Base64-dekodiert — prüfe ihn auf deinem Server.',
    }),
  },
  fr: {
    title: 'Décodeur JWT',
    desc: 'Lire l’en-tête et la charge utile d’un JSON Web Token',
    short: 'Décoder en-tête et payload',
    intro: [
      { h: 'Décoder n’est pas vérifier', p: 'Un JWT, ce sont trois blocs Base64url reliés par des points ; n’importe qui lit les deux premiers sans clé. Cet outil montre ce qu’il y a dedans. Il ne dit pas — et ne peut pas dire — si la signature est authentique ; seul un serveur détenant la clé le peut.' },
      { h: 'Ce que veulent dire les claims standard', p: 'exp est la date d’expiration, iat celle d’émission, nbf le plus tôt où le jeton est utilisable, iss l’émetteur, sub le sujet, aud le destinataire. Tous les champs de temps sont en secondes Unix, pas en millisecondes.' },
    ],
    faq: [
      { q: 'Mon jeton part-il quelque part ?', a: 'Non. Le découpage et le décodage Base64 se font dans votre navigateur. Considérez tout de même comme compromis un jeton collé où que ce soit, et changez-le s’il était réel.' },
      { q: 'Pourquoi la charge utile est-elle lisible ?', a: 'Parce qu’un JWT est signé, pas chiffré. Base64url est un encodage, pas un secret. Ne mettez jamais d’information privée dans le payload.' },
      { q: 'Pouvez-vous vérifier la signature ici ?', a: 'Non. Cela demanderait la clé de signature, et une clé collée dans une page web n’en est plus une. Vérifiez côté serveur.' },
    ],
    ui: withUi('fr', {
      token: 'Jeton JWT', header: 'En-tête', payload: 'Charge utile', signature: 'Signature',
      valid: '✓ Non expiré (selon exp)', expired: '⚠ Expiré', noExp: 'Pas de claim exp',
      malformed: 'Un JWT doit avoir la forme entête.payload.signature',
      notice: 'La signature n’est pas vérifiée. Le payload est simplement décodé en Base64 — vérifiez-le sur votre serveur.',
    }),
  },
  hi: {
    title: 'JWT डिकोडर',
    desc: 'JSON Web Token का हेडर और पेलोड पढ़ें',
    short: 'हेडर और पेलोड डिकोड करें',
    intro: [
      { h: 'डिकोड करना जाँचना नहीं है', p: 'JWT बिंदुओं से जुड़े तीन Base64url हिस्से हैं, और पहले दो को बिना कुंजी कोई भी पढ़ सकता है। यह टूल दिखाता है कि अंदर क्या है। यह नहीं बताता — बता भी नहीं सकता — कि हस्ताक्षर असली है या नहीं; वह सिर्फ़ कुंजी रखने वाला सर्वर कर सकता है।' },
      { h: 'मानक क्लेम का मतलब', p: 'exp यानी कब तक वैध, iat यानी कब जारी हुआ, nbf यानी इससे पहले इस्तेमाल नहीं, iss यानी किसने जारी किया, sub यानी किसके बारे में, aud यानी किसके लिए। समय के सारे खाने Unix सेकंड में हैं, मिलीसेकंड में नहीं।' },
    ],
    faq: [
      { q: 'क्या मेरा टोकन कहीं भेजा जाता है?', a: 'नहीं। बाँटना और Base64 डिकोड करना आपके ब्राउज़र में ही होता है। फिर भी, कहीं भी चिपकाए गए टोकन को समझौता हुआ मानिए और असली हो तो बदल दीजिए।' },
      { q: 'पेलोड पढ़ने लायक क्यों दिखता है?', a: 'क्योंकि JWT पर हस्ताक्षर होता है, एन्क्रिप्शन नहीं। Base64url एन्कोडिंग है, गोपनीयता नहीं। पेलोड में कभी निजी जानकारी मत डालिए।' },
      { q: 'क्या यहाँ हस्ताक्षर जाँचा जा सकता है?', a: 'नहीं। उसके लिए साइनिंग कुंजी चाहिए, और वेब पन्ने पर चिपकाई गई कुंजी कुंजी नहीं रह जाती। जाँच सर्वर पर कीजिए।' },
    ],
    ui: withUi('hi', {
      token: 'JWT टोकन', header: 'हेडर', payload: 'पेलोड', signature: 'हस्ताक्षर',
      valid: '✓ समाप्त नहीं हुआ (exp के अनुसार)', expired: '⚠ समय समाप्त', noExp: 'exp क्लेम नहीं है',
      malformed: 'JWT का रूप header.payload.signature होना चाहिए',
      notice: 'हस्ताक्षर की जाँच नहीं होती। पेलोड सिर्फ़ Base64 से डिकोड किया गया है — अपने सर्वर पर जाँचिए।',
    }),
  },
  'zh-hans': {
    title: 'JWT 解码器',
    desc: '读取 JSON Web Token 的头部和载荷',
    short: '解码头部与载荷',
    intro: [
      { h: '解码不等于验签', p: 'JWT 是用点连起来的三段 Base64url，前两段任何人不用密钥就能读。这个工具只是把里面的内容摊开给你看。它不会——也做不到——告诉你签名是不是真的；只有握着密钥的服务器能判断。' },
      { h: '标准 claim 的含义', p: 'exp 是失效时间，iat 是签发时间，nbf 是最早可用时间，iss 是签发者，sub 是主体，aud 是受众。所有时间字段都是 Unix 秒，不是毫秒。' },
    ],
    faq: [
      { q: '我的 token 会被上传吗？', a: '不会。切分和 Base64 解码都在你的浏览器里完成。但不管在哪里粘贴过的 token，都应视为已泄露；如果是线上的，请轮换。' },
      { q: '为什么载荷是可读的？', a: '因为 JWT 是签名的，不是加密的。Base64url 是编码，不是保密手段。永远不要把私密信息放进载荷。' },
      { q: '这里能验签吗？', a: '不能。验签需要签名密钥，而粘贴到网页里的密钥就不再是密钥了。请在服务端验证。' },
    ],
    ui: withUi('zh-hans', {
      token: 'JWT 令牌', header: '头部', payload: '载荷', signature: '签名',
      valid: '✓ 未过期（按 exp）', expired: '⚠ 已过期', noExp: '没有 exp 字段',
      malformed: 'JWT 必须是 header.payload.signature 的形式',
      notice: '不做签名验证。载荷只是 Base64 解码的结果——请在你的服务端校验。',
    }),
  },
  'zh-hant': {
    title: 'JWT 解碼器',
    desc: '讀取 JSON Web Token 的標頭和內容',
    short: '解碼標頭與內容',
    intro: [
      { h: '解碼不等於驗簽', p: 'JWT 是用點連起來的三段 Base64url，前兩段任何人不用金鑰就能讀。這個工具只是把裡面的內容攤開給你看。它不會——也做不到——告訴你簽章是不是真的；只有握著金鑰的伺服器能判斷。' },
      { h: '標準 claim 的含義', p: 'exp 是失效時間，iat 是簽發時間，nbf 是最早可用時間，iss 是簽發者，sub 是主體，aud 是受眾。所有時間欄位都是 Unix 秒，不是毫秒。' },
    ],
    faq: [
      { q: '我的 token 會被上傳嗎？', a: '不會。切分和 Base64 解碼都在你的瀏覽器裡完成。但不管在哪裡貼過的 token，都應視為已外洩；如果是線上的，請輪換。' },
      { q: '為什麼內容是可讀的？', a: '因為 JWT 是簽章的，不是加密的。Base64url 是編碼，不是保密手段。永遠不要把私密資訊放進內容。' },
      { q: '這裡能驗簽嗎？', a: '不能。驗簽需要簽章金鑰，而貼到網頁裡的金鑰就不再是金鑰了。請在伺服器端驗證。' },
    ],
    ui: withUi('zh-hant', {
      token: 'JWT 權杖', header: '標頭', payload: '內容', signature: '簽章',
      valid: '✓ 未過期（按 exp）', expired: '⚠ 已過期', noExp: '沒有 exp 欄位',
      malformed: 'JWT 必須是 header.payload.signature 的形式',
      notice: '不做簽章驗證。內容只是 Base64 解碼的結果——請在你的伺服器端校驗。',
    }),
  },
};

export const DEV_REGEX: CalcTable = {
  en: {
    title: 'Regex tester',
    desc: 'Test a regular expression against sample text and see every match',
    short: 'Pattern · flags · matches',
    intro: [
      { h: 'Write the pattern without slashes', p: 'Enter the pattern itself, not /pattern/flags. Flags go in their own boxes. This avoids the usual confusion about whether a slash in the middle needs escaping.' },
      { h: 'Groups are where the value usually is', p: 'The match is the whole hit; capture groups are the parts you actually wanted. Every group is listed under its match, numbered from one, so you can see straight away whether the parentheses landed where you thought.' },
    ],
    faq: [
      { q: 'Which flavour of regex is this?', a: 'JavaScript’s. Most of it matches PCRE, but lookbehind support and some Unicode property escapes differ from Python or PHP.' },
      { q: 'Why does my pattern only match once?', a: 'Without the global flag, matching stops at the first hit. Turn on g to find them all.' },
      { q: 'How do I match a literal dot?', a: 'Escape it as \\. — an unescaped dot means “any character except a line break”.' },
    ],
    ui: withUi('en', {
      pattern: 'Pattern (without the slashes)', flags: 'Flags', test: 'Test string',
      matches: 'Matches', noMatch: 'No matches', match: 'Match', position: 'Position', groups: 'Groups',
      gGlobal: 'g — all matches', gIgnore: 'i — ignore case', gMulti: 'm — ^ $ per line', gDotAll: 's — . matches newline',
    }),
  },
  es: {
    title: 'Probador de expresiones regulares',
    desc: 'Prueba una expresión regular sobre un texto y mira todas las coincidencias',
    short: 'Patrón · flags · coincidencias',
    intro: [
      { h: 'Escribe el patrón sin barras', p: 'Introduce el patrón en sí, no /patrón/flags. Los flags van en sus propias casillas. Así se evita la duda habitual sobre si una barra en medio hay que escaparla.' },
      { h: 'Los grupos suelen ser lo que buscas', p: 'La coincidencia es el acierto completo; los grupos de captura son las partes que en realidad querías. Cada grupo aparece bajo su coincidencia, numerado desde uno, para ver al momento si los paréntesis cayeron donde pensabas.' },
    ],
    faq: [
      { q: '¿Qué dialecto de regex es?', a: 'El de JavaScript. Coincide en gran parte con PCRE, pero el soporte de lookbehind y algunos escapes de propiedades Unicode difieren de Python o PHP.' },
      { q: '¿Por qué mi patrón solo coincide una vez?', a: 'Sin el flag global, la búsqueda se detiene en el primer acierto. Activa g para encontrarlas todas.' },
      { q: '¿Cómo busco un punto literal?', a: 'Escápalo como \\. — un punto sin escapar significa «cualquier carácter salvo salto de línea».' },
    ],
    ui: withUi('es', {
      pattern: 'Patrón (sin las barras)', flags: 'Flags', test: 'Texto de prueba',
      matches: 'Coincidencias', noMatch: 'Sin coincidencias', match: 'Coincidencia', position: 'Posición', groups: 'Grupos',
      gGlobal: 'g — todas', gIgnore: 'i — ignora mayúsculas', gMulti: 'm — ^ $ por línea', gDotAll: 's — . incluye salto de línea',
    }),
  },
  'pt-br': {
    title: 'Testador de expressões regulares',
    desc: 'Teste uma expressão regular num texto e veja todas as ocorrências',
    short: 'Padrão · flags · ocorrências',
    intro: [
      { h: 'Escreva o padrão sem as barras', p: 'Digite o padrão em si, não /padrão/flags. As flags têm seus próprios campos. Isso evita a dúvida clássica sobre escapar uma barra no meio.' },
      { h: 'Os grupos costumam ser o que você quer', p: 'A ocorrência é o acerto inteiro; os grupos de captura são as partes que você realmente queria. Cada grupo aparece sob sua ocorrência, numerado a partir de um, para você ver na hora se os parênteses caíram onde imaginava.' },
    ],
    faq: [
      { q: 'Qual dialeto de regex é este?', a: 'O do JavaScript. Boa parte bate com PCRE, mas o suporte a lookbehind e alguns escapes de propriedades Unicode diferem de Python ou PHP.' },
      { q: 'Por que meu padrão só casa uma vez?', a: 'Sem a flag global, a busca para no primeiro acerto. Ligue g para achar todas.' },
      { q: 'Como caso um ponto literal?', a: 'Escape como \\. — um ponto sem escape significa "qualquer caractere exceto quebra de linha".' },
    ],
    ui: withUi('pt-br', {
      pattern: 'Padrão (sem as barras)', flags: 'Flags', test: 'Texto de teste',
      matches: 'Ocorrências', noMatch: 'Nenhuma ocorrência', match: 'Ocorrência', position: 'Posição', groups: 'Grupos',
      gGlobal: 'g — todas', gIgnore: 'i — ignora maiúsculas', gMulti: 'm — ^ $ por linha', gDotAll: 's — . inclui quebra de linha',
    }),
  },
  ja: {
    title: '正規表現テスター',
    desc: '正規表現をテキストに当てて、すべての一致を見る',
    short: 'パターン・フラグ・一致',
    intro: [
      { h: 'スラッシュなしで書きます', p: '/パターン/フラグ ではなく、パターンそのものを入れてください。フラグは別の欄です。こうすると、途中のスラッシュをエスケープすべきかで迷わずに済みます。' },
      { h: '欲しいものはたいていグループの中', p: '一致は当たった全体で、キャプチャグループが本当に取りたかった部分です。グループは一致ごとに1番から並べて表示するので、括弧が思ったところに掛かったかがすぐ分かります。' },
    ],
    faq: [
      { q: 'どの方言の正規表現ですか。', a: 'JavaScript のものです。多くは PCRE と同じですが、後読みの対応や一部の Unicode プロパティエスケープは Python や PHP と違います。' },
      { q: '一度しか一致しないのはなぜですか。', a: 'g フラグがないと最初の一致で止まります。すべて見たいときは g を付けてください。' },
      { q: 'ピリオドそのものに一致させるには。', a: '\\. とエスケープします。エスケープしないピリオドは「改行以外の任意の1文字」の意味です。' },
    ],
    ui: withUi('ja', {
      pattern: 'パターン（スラッシュなし）', flags: 'フラグ', test: 'テスト文字列',
      matches: '一致結果', noMatch: '一致なし', match: '一致', position: '位置', groups: 'グループ',
      gGlobal: 'g — すべて', gIgnore: 'i — 大小を無視', gMulti: 'm — ^ $ を行ごとに', gDotAll: 's — . が改行にも一致',
    }),
  },
  de: {
    title: 'Regex-Tester',
    desc: 'Einen regulären Ausdruck an Beispieltext prüfen und alle Treffer sehen',
    short: 'Muster · Flags · Treffer',
    intro: [
      { h: 'Muster ohne Schrägstriche schreiben', p: 'Gib das Muster selbst ein, nicht /muster/flags. Die Flags haben eigene Felder. So entfällt die übliche Frage, ob ein Schrägstrich in der Mitte escaped werden muss.' },
      { h: 'Was du willst, steckt meist in den Gruppen', p: 'Der Treffer ist das ganze Fundstück; die Fanggruppen sind die Teile, um die es dir eigentlich ging. Jede Gruppe steht unter ihrem Treffer, ab eins durchnummeriert — so siehst du sofort, ob die Klammern dort sitzen, wo du dachtest.' },
    ],
    faq: [
      { q: 'Welcher Regex-Dialekt ist das?', a: 'Der von JavaScript. Vieles deckt sich mit PCRE, aber Lookbehind-Unterstützung und einige Unicode-Property-Escapes weichen von Python oder PHP ab.' },
      { q: 'Warum trifft mein Muster nur einmal?', a: 'Ohne das globale Flag hört die Suche beim ersten Treffer auf. Schalte g ein, um alle zu finden.' },
      { q: 'Wie treffe ich einen echten Punkt?', a: 'Escape ihn als \\. — ein nicht escapeter Punkt bedeutet „ein beliebiges Zeichen außer Zeilenumbruch“.' },
    ],
    ui: withUi('de', {
      pattern: 'Muster (ohne Schrägstriche)', flags: 'Flags', test: 'Testtext',
      matches: 'Treffer', noMatch: 'Keine Treffer', match: 'Treffer', position: 'Position', groups: 'Gruppen',
      gGlobal: 'g — alle', gIgnore: 'i — Groß/Klein egal', gMulti: 'm — ^ $ je Zeile', gDotAll: 's — . trifft Umbruch',
    }),
  },
  fr: {
    title: 'Testeur d’expressions régulières',
    desc: 'Tester une expression régulière sur un texte et voir toutes les correspondances',
    short: 'Motif · options · correspondances',
    intro: [
      { h: 'Écrivez le motif sans les barres', p: 'Saisissez le motif lui-même, pas /motif/options. Les options ont leurs propres cases. On évite ainsi la question habituelle de savoir s’il faut échapper une barre au milieu.' },
      { h: 'Ce que vous cherchez est souvent dans les groupes', p: 'La correspondance, c’est la trouvaille entière ; les groupes de capture sont les morceaux qui vous intéressaient vraiment. Chaque groupe apparaît sous sa correspondance, numéroté à partir de un — on voit tout de suite si les parenthèses sont tombées au bon endroit.' },
    ],
    faq: [
      { q: 'De quelle variante de regex s’agit-il ?', a: 'Celle de JavaScript. L’essentiel rejoint PCRE, mais la prise en charge du lookbehind et certains échappements de propriétés Unicode diffèrent de Python ou PHP.' },
      { q: 'Pourquoi mon motif ne correspond-il qu’une fois ?', a: 'Sans l’option globale, la recherche s’arrête au premier résultat. Activez g pour toutes les trouver.' },
      { q: 'Comment chercher un point littéral ?', a: 'Échappez-le en \\. — un point non échappé signifie « n’importe quel caractère sauf un saut de ligne ».' },
    ],
    ui: withUi('fr', {
      pattern: 'Motif (sans les barres)', flags: 'Options', test: 'Texte de test',
      matches: 'Correspondances', noMatch: 'Aucune correspondance', match: 'Correspondance', position: 'Position', groups: 'Groupes',
      gGlobal: 'g — toutes', gIgnore: 'i — ignore la casse', gMulti: 'm — ^ $ par ligne', gDotAll: 's — . prend le saut de ligne',
    }),
  },
  hi: {
    title: 'रेगेक्स टेस्टर',
    desc: 'किसी टेक्स्ट पर रेगुलर एक्सप्रेशन चलाकर सारे मैच देखें',
    short: 'पैटर्न · फ़्लैग · मैच',
    intro: [
      { h: 'पैटर्न स्लैश के बिना लिखिए', p: '/पैटर्न/फ़्लैग नहीं, सिर्फ़ पैटर्न डालिए। फ़्लैग के अपने खाने हैं। इससे बीच में आए स्लैश को एस्केप करना है या नहीं, यह उलझन नहीं रहती।' },
      { h: 'जो चाहिए वह अक्सर ग्रुप में होता है', p: 'मैच यानी पूरा मिला हुआ हिस्सा; कैप्चर ग्रुप वे टुकड़े हैं जो असल में चाहिए थे। हर ग्रुप अपने मैच के नीचे, एक से गिनकर दिखता है — तुरंत पता चल जाता है कि कोष्ठक वहीं पड़े या नहीं जहाँ आपने सोचा था।' },
    ],
    faq: [
      { q: 'यह किस तरह का रेगेक्स है?', a: 'JavaScript वाला। ज़्यादातर PCRE से मिलता है, पर lookbehind का समर्थन और कुछ Unicode प्रॉपर्टी एस्केप Python या PHP से अलग हैं।' },
      { q: 'मेरा पैटर्न एक ही बार क्यों मिलता है?', a: 'ग्लोबल फ़्लैग के बिना खोज पहले ही मैच पर रुक जाती है। सब देखने के लिए g चालू कीजिए।' },
      { q: 'असली बिंदु कैसे खोजूँ?', a: 'उसे \\. लिखकर एस्केप कीजिए — बिना एस्केप वाला बिंदु का मतलब है "नई पंक्ति को छोड़कर कोई भी अक्षर"।' },
    ],
    ui: withUi('hi', {
      pattern: 'पैटर्न (स्लैश के बिना)', flags: 'फ़्लैग', test: 'परीक्षण टेक्स्ट',
      matches: 'मैच', noMatch: 'कोई मैच नहीं', match: 'मैच', position: 'स्थान', groups: 'ग्रुप',
      gGlobal: 'g — सभी', gIgnore: 'i — छोटे-बड़े का फ़र्क़ नहीं', gMulti: 'm — हर पंक्ति पर ^ $', gDotAll: 's — . नई पंक्ति भी',
    }),
  },
  'zh-hans': {
    title: '正则表达式测试',
    desc: '把正则跑在一段文本上，看到每一处匹配',
    short: '模式 · 标志 · 匹配',
    intro: [
      { h: '模式不用写斜杠', p: '直接填模式本身，不要写成 /模式/标志。标志有各自的选项框。这样就不用纠结中间的斜杠要不要转义。' },
      { h: '你要的东西通常在分组里', p: '匹配是整段命中的内容，捕获分组才是你真正想要的部分。每个分组都列在它所属的匹配下面，从 1 开始编号，一眼就能看出括号是不是落在你以为的位置。' },
    ],
    faq: [
      { q: '这是哪一种正则？', a: 'JavaScript 的。大部分和 PCRE 一致，但后行断言的支持和一些 Unicode 属性转义与 Python、PHP 不同。' },
      { q: '为什么我的模式只匹配一次？', a: '没开全局标志时，匹配到第一个就停了。打开 g 才会全部找出来。' },
      { q: '怎么匹配一个真正的点？', a: '写成 \\. 转义——没转义的点表示"除换行外的任意一个字符"。' },
    ],
    ui: withUi('zh-hans', {
      pattern: '模式（不带斜杠）', flags: '标志', test: '测试文本',
      matches: '匹配结果', noMatch: '没有匹配', match: '匹配', position: '位置', groups: '分组',
      gGlobal: 'g — 全部', gIgnore: 'i — 忽略大小写', gMulti: 'm — 每行 ^ $', gDotAll: 's — . 匹配换行',
    }),
  },
  'zh-hant': {
    title: '正規表示式測試',
    desc: '把正規表示式跑在一段文字上，看到每一處符合',
    short: '樣式 · 旗標 · 符合',
    intro: [
      { h: '樣式不用寫斜線', p: '直接填樣式本身，不要寫成 /樣式/旗標。旗標有各自的選項框。這樣就不用糾結中間的斜線要不要跳脫。' },
      { h: '你要的東西通常在群組裡', p: '符合是整段命中的內容，擷取群組才是你真正想要的部分。每個群組都列在它所屬的符合下面，從 1 開始編號，一眼就能看出括號是不是落在你以為的位置。' },
    ],
    faq: [
      { q: '這是哪一種正規表示式？', a: 'JavaScript 的。大部分和 PCRE 一致，但後行斷言的支援和一些 Unicode 屬性跳脫與 Python、PHP 不同。' },
      { q: '為什麼我的樣式只符合一次？', a: '沒開全域旗標時，符合到第一個就停了。打開 g 才會全部找出來。' },
      { q: '怎麼比對一個真正的點？', a: '寫成 \\. 跳脫——沒跳脫的點表示「除換行外的任意一個字元」。' },
    ],
    ui: withUi('zh-hant', {
      pattern: '樣式（不帶斜線）', flags: '旗標', test: '測試文字',
      matches: '符合結果', noMatch: '沒有符合', match: '符合', position: '位置', groups: '群組',
      gGlobal: 'g — 全部', gIgnore: 'i — 忽略大小寫', gMulti: 'm — 每行 ^ $', gDotAll: 's — . 比對換行',
    }),
  },
};
