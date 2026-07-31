/**
 * HTTP 화면의 문구 — 열 언어.
 *
 * 항목마다 다른 설명은 desc.ts에 있고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 코드 번호와 헤더 이름은 표준이 정한 것이라 옮기지 않는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { StatusClass } from './list.ts';
import type { HttpFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface HttpUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  statusTitle: string;
  headerTitle: string;
  classLabel: Record<StatusClass, string>;
  classNote: Record<StatusClass, string>;
  sideLabel: Record<'request' | 'response' | 'both', string>;
  sideNote: Record<'request' | 'response' | 'both', string>;
  writeLabel: string;
  kindTitle: string;
  codeLabel: string;
  errorLabel: string;
  errorYes: string;
  errorNo: string;
  docLabel: string;
  relatedTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string) => string;
  metaDesc: (name: string, desc: string) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: HttpFacts, desc: string, kind: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof HttpUI]: L<HttpUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('HTTP 코드와 헤더', 'HTTP codes and headers', 'Códigos y cabeceras HTTP', 'Códigos e cabeçalhos HTTP', 'HTTPコードとヘッダー', 'HTTP-Codes und -Header', 'Codes et en-têtes HTTP', 'HTTP कोड और हेडर', 'HTTP 状态码与标头', 'HTTP 狀態碼與標頭'),

  hubTitle: T(
    'HTTP 상태 코드와 헤더 132가지',
    '132 HTTP status codes and headers',
    '132 códigos de estado y cabeceras HTTP',
    '132 códigos de status e cabeçalhos HTTP',
    'HTTPステータスコードとヘッダー132種',
    '132 HTTP-Statuscodes und -Header',
    '132 codes de statut et en-têtes HTTP',
    '132 HTTP स्थिति कोड और हेडर',
    'HTTP 状态码与标头 132 项',
    'HTTP 狀態碼與標頭 132 項',
  ),

  hubLead: T(
    '404와 500이 무슨 뜻인지, Content-Type과 Cache-Control이 무엇을 하는지 한 줄로 정리했습니다.',
    'What 404 and 500 actually mean, and what Content-Type or Cache-Control do — one line each.',
    'Qué significan de verdad 404 y 500, y qué hacen Content-Type o Cache-Control, en una línea.',
    'O que 404 e 500 realmente significam e o que Content-Type ou Cache-Control fazem, em uma linha.',
    '404や500が何を意味するのか、Content-TypeやCache-Controlが何をするのかを一行でまとめました。',
    'Was 404 und 500 wirklich bedeuten und was Content-Type oder Cache-Control tun — je eine Zeile.',
    "Ce que veulent dire 404 et 500, et ce que font Content-Type ou Cache-Control — une ligne chacun.",
    '404 और 500 का असल अर्थ, और Content-Type या Cache-Control क्या करते हैं — एक-एक पंक्ति में।',
    '404 和 500 到底是什么意思，Content-Type 和 Cache-Control 各管什么，一行说清。',
    '404 和 500 到底是什麼意思，Content-Type 和 Cache-Control 各管什麼，一行說清。',
  ),

  statusTitle: T('상태 코드', 'Status codes', 'Códigos de estado', 'Códigos de status', 'ステータスコード', 'Statuscodes', 'Codes de statut', 'स्थिति कोड', '状态码', '狀態碼'),
  headerTitle: T('헤더', 'Headers', 'Cabeceras', 'Cabeçalhos', 'ヘッダー', 'Header', 'En-têtes', 'हेडर', '标头', '標頭'),

  classLabel: T(
    { '1xx': '1xx 정보', '2xx': '2xx 성공', '3xx': '3xx 넘김', '4xx': '4xx 요청 잘못', '5xx': '5xx 서버 잘못' },
    { '1xx': '1xx Informational', '2xx': '2xx Success', '3xx': '3xx Redirection', '4xx': '4xx Client error', '5xx': '5xx Server error' },
    { '1xx': '1xx Informativos', '2xx': '2xx Éxito', '3xx': '3xx Redirección', '4xx': '4xx Error del cliente', '5xx': '5xx Error del servidor' },
    { '1xx': '1xx Informativos', '2xx': '2xx Sucesso', '3xx': '3xx Redirecionamento', '4xx': '4xx Erro do cliente', '5xx': '5xx Erro do servidor' },
    { '1xx': '1xx 情報', '2xx': '2xx 成功', '3xx': '3xx 転送', '4xx': '4xx 要求の誤り', '5xx': '5xx サーバーの誤り' },
    { '1xx': '1xx Information', '2xx': '2xx Erfolg', '3xx': '3xx Umleitung', '4xx': '4xx Client-Fehler', '5xx': '5xx Server-Fehler' },
    { '1xx': '1xx Information', '2xx': '2xx Succès', '3xx': '3xx Redirection', '4xx': '4xx Erreur client', '5xx': '5xx Erreur serveur' },
    { '1xx': '1xx सूचना', '2xx': '2xx सफलता', '3xx': '3xx पुनर्निर्देश', '4xx': '4xx क्लाइंट त्रुटि', '5xx': '5xx सर्वर त्रुटि' },
    { '1xx': '1xx 信息', '2xx': '2xx 成功', '3xx': '3xx 重定向', '4xx': '4xx 请求有误', '5xx': '5xx 服务器有误' },
    { '1xx': '1xx 資訊', '2xx': '2xx 成功', '3xx': '3xx 重新導向', '4xx': '4xx 請求有誤', '5xx': '5xx 伺服器有誤' },
  ),

  classNote: T(
    {
      '1xx': '아직 진행 중이라는 알림입니다. 최종 응답이 뒤따릅니다.',
      '2xx': '요청이 제대로 처리됐다는 뜻입니다.',
      '3xx': '다른 곳으로 가라는 뜻입니다. 영구인지 임시인지가 갈립니다.',
      '4xx': '요청 쪽에 문제가 있다는 뜻입니다. 같은 요청을 그대로 보내면 또 실패합니다.',
      '5xx': '서버 쪽에 문제가 있다는 뜻입니다. 잠시 뒤 다시 시도해 볼 만합니다.',
    },
    {
      '1xx': 'A progress note; the real answer follows.',
      '2xx': 'The request went through.',
      '3xx': 'Go somewhere else — the distinction is permanent versus temporary.',
      '4xx': 'The problem is on the request side; sending the same thing again will fail again.',
      '5xx': 'The problem is on the server side; retrying later is often worth it.',
    },
    {
      '1xx': 'Un aviso de progreso; la respuesta real llega después.',
      '2xx': 'La petición salió bien.',
      '3xx': 'Ve a otro lugar: lo que cambia es si es permanente o temporal.',
      '4xx': 'El problema está en la petición; repetirla igual volverá a fallar.',
      '5xx': 'El problema está en el servidor; suele valer la pena reintentar.',
    },
    {
      '1xx': 'Um aviso de progresso; a resposta real vem depois.',
      '2xx': 'O pedido deu certo.',
      '3xx': 'Vá para outro lugar: o que muda é ser permanente ou temporário.',
      '4xx': 'O problema está no pedido; repeti-lo igual vai falhar de novo.',
      '5xx': 'O problema está no servidor; costuma valer a pena tentar depois.',
    },
    {
      '1xx': '進行中の知らせです。本当の応答はこの後に来ます。',
      '2xx': '要求が問題なく通ったという意味です。',
      '3xx': '別の場所へ行くようにという意味です。恒久か一時かで分かれます。',
      '4xx': '要求側に問題があるという意味です。同じものを送ればまた失敗します。',
      '5xx': 'サーバー側に問題があるという意味です。しばらくして試す価値があります。',
    },
    {
      '1xx': 'Ein Zwischenstand; die eigentliche Antwort folgt.',
      '2xx': 'Die Anfrage ging durch.',
      '3xx': 'Woanders hingehen — dauerhaft oder vorübergehend ist der Unterschied.',
      '4xx': 'Das Problem liegt bei der Anfrage; unverändert erneut gesendet scheitert sie wieder.',
      '5xx': 'Das Problem liegt beim Server; ein späterer Versuch lohnt oft.',
    },
    {
      '1xx': "Une note d'avancement ; la vraie réponse suit.",
      '2xx': 'La requête a abouti.',
      '3xx': 'Allez ailleurs — la différence tient au caractère permanent ou temporaire.',
      '4xx': 'Le problème vient de la requête ; la renvoyer telle quelle échouera encore.',
      '5xx': 'Le problème vient du serveur ; réessayer plus tard en vaut souvent la peine.',
    },
    {
      '1xx': 'प्रगति की सूचना; असली उत्तर बाद में आता है।',
      '2xx': 'अनुरोध सफल रहा।',
      '3xx': 'कहीं और जाइए — फ़र्क़ बस स्थायी और अस्थायी का है।',
      '4xx': 'समस्या अनुरोध की ओर है; वही दोबारा भेजने पर फिर विफल होगा।',
      '5xx': 'समस्या सर्वर की ओर है; कुछ देर बाद फिर कोशिश करना अक्सर काम आता है।',
    },
    {
      '1xx': '只是告诉你还在进行中，真正的答复随后就到。',
      '2xx': '请求已经妥善处理完了。',
      '3xx': '让你去别的地方 —— 区别在于是永久还是临时。',
      '4xx': '问题出在请求这一侧。原样再发一次，还是会失败。',
      '5xx': '问题出在服务器那一侧。过一会儿再试往往值得。',
    },
    {
      '1xx': '只是告訴你還在進行中，真正的答覆隨後就到。',
      '2xx': '請求已經妥善處理完了。',
      '3xx': '讓你去別的地方 —— 區別在於是永久還是暫時。',
      '4xx': '問題出在請求這一側。原樣再發一次，還是會失敗。',
      '5xx': '問題出在伺服器那一側。過一會兒再試往往值得。',
    },
  ),

  sideLabel: T(
    { request: '요청 헤더', response: '응답 헤더', both: '요청·응답 공통' },
    { request: 'Request headers', response: 'Response headers', both: 'Both directions' },
    { request: 'Cabeceras de petición', response: 'Cabeceras de respuesta', both: 'En ambos sentidos' },
    { request: 'Cabeçalhos de pedido', response: 'Cabeçalhos de resposta', both: 'Nos dois sentidos' },
    { request: 'リクエストヘッダー', response: 'レスポンスヘッダー', both: '双方で使う' },
    { request: 'Request-Header', response: 'Response-Header', both: 'In beide Richtungen' },
    { request: 'En-têtes de requête', response: 'En-têtes de réponse', both: 'Dans les deux sens' },
    { request: 'अनुरोध हेडर', response: 'प्रतिक्रिया हेडर', both: 'दोनों दिशाओं में' },
    { request: '请求标头', response: '响应标头', both: '两边通用' },
    { request: '請求標頭', response: '回應標頭', both: '兩邊通用' },
  ),

  sideNote: T(
    {
      request: '브라우저가 서버에 보낼 때 붙이는 헤더들입니다.',
      response: '서버가 브라우저에 돌려줄 때 붙이는 헤더들입니다.',
      both: '요청과 응답 어느 쪽에나 붙을 수 있는 헤더들입니다.',
    },
    {
      request: 'Headers the browser attaches when it sends to the server.',
      response: 'Headers the server attaches when it answers.',
      both: 'Headers that can appear on either side.',
    },
    {
      request: 'Cabeceras que añade el navegador al enviar al servidor.',
      response: 'Cabeceras que añade el servidor al responder.',
      both: 'Cabeceras que pueden aparecer en cualquiera de los dos lados.',
    },
    {
      request: 'Cabeçalhos que o navegador anexa ao enviar ao servidor.',
      response: 'Cabeçalhos que o servidor anexa ao responder.',
      both: 'Cabeçalhos que podem aparecer nos dois lados.',
    },
    {
      request: 'ブラウザーがサーバーへ送るときに付けるヘッダーです。',
      response: 'サーバーがブラウザーへ返すときに付けるヘッダーです。',
      both: '要求にも応答にも付きうるヘッダーです。',
    },
    {
      request: 'Header, die der Browser beim Senden anfügt.',
      response: 'Header, die der Server bei der Antwort anfügt.',
      both: 'Header, die auf beiden Seiten auftreten können.',
    },
    {
      request: "En-têtes ajoutés par le navigateur à l'envoi.",
      response: 'En-têtes ajoutés par le serveur à la réponse.',
      both: "En-têtes pouvant figurer des deux côtés.",
    },
    {
      request: 'सर्वर को भेजते समय ब्राउज़र जो हेडर जोड़ता है।',
      response: 'उत्तर देते समय सर्वर जो हेडर जोड़ता है।',
      both: 'ऐसे हेडर जो दोनों ओर आ सकते हैं।',
    },
    {
      request: '浏览器往服务器发的时候带上的标头。',
      response: '服务器答复浏览器的时候带上的标头。',
      both: '请求和响应两边都可能出现的标头。',
    },
    {
      request: '瀏覽器往伺服器發的時候帶上的標頭。',
      response: '伺服器答覆瀏覽器的時候帶上的標頭。',
      both: '請求和回應兩邊都可能出現的標頭。',
    },
  ),

  writeLabel: T('실제 줄', 'On the wire', 'En la línea', 'Na linha', '実際の行', 'In der Leitung', 'Sur le fil', 'असली पंक्ति', '实际的一行', '實際的一行'),
  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी', '分类', '分類'),
  codeLabel: T('코드', 'Code', 'Código', 'Código', 'コード', 'Code', 'Code', 'कोड', '代码', '代碼'),
  errorLabel: T('오류 여부', 'Is it an error', '¿Es un error?', 'É um erro?', 'エラーかどうか', 'Fehler?', 'Est-ce une erreur ?', 'क्या यह त्रुटि है', '是不是错误', '是不是錯誤'),
  errorYes: T('오류입니다', 'Yes — this is an error', 'Sí, es un error', 'Sim, é um erro', 'はい — エラーです', 'Ja — ein Fehler', 'Oui — une erreur', 'हाँ — यह त्रुटि है', '是 —— 这是错误', '是 —— 這是錯誤'),
  errorNo: T('오류가 아닙니다', 'No — not an error', 'No, no es un error', 'Não, não é um erro', 'いいえ — エラーではありません', 'Nein — kein Fehler', 'Non — pas une erreur', 'नहीं — त्रुटि नहीं', '不是错误', '不是錯誤'),
  docLabel: T('표준 문서', 'Reference docs', 'Documentación', 'Documentação', '標準ドキュメント', 'Referenzdoku', 'Documentation', 'संदर्भ दस्तावेज़', '标准文档', '標準文件'),
  relatedTitle: T('같은 갈래', 'Same group', 'Mismo grupo', 'Mesmo grupo', '同じ分類', 'Gleiche Gruppe', 'Même groupe', 'वही समूह', '同一分类', '同一分類'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T(
    [
      '상태 코드는 첫 자리가 뜻을 정합니다. 4로 시작하면 요청 쪽, 5로 시작하면 서버 쪽 문제입니다.',
      '404는 "없다", 403은 "있지만 안 된다"입니다. 둘을 바꿔 쓰면 원인을 찾는 데 시간이 더 걸립니다.',
      '헤더 이름은 대소문자를 가리지 않습니다. Content-Type과 content-type은 같은 헤더입니다.',
      '캐시와 CORS 문제는 대개 헤더 한 줄에서 갈립니다. 브라우저 개발자 도구의 네트워크 탭에서 그대로 볼 수 있습니다.',
    ],
    [
      'The first digit of a status code carries the meaning: 4 means the request, 5 means the server.',
      '404 means "not there"; 403 means "there, but not for you". Swapping them makes debugging slower.',
      'Header names are case-insensitive — Content-Type and content-type are the same header.',
      'Caching and CORS problems usually come down to one header line, visible in the browser’s network tab.',
    ],
    [
      'El primer dígito del código lleva el significado: 4 apunta a la petición, 5 al servidor.',
      '404 significa "no está"; 403, "está pero no para ti". Confundirlos alarga la depuración.',
      'Los nombres de cabecera no distinguen mayúsculas: Content-Type y content-type son la misma.',
      'Los problemas de caché y CORS suelen reducirse a una línea de cabecera, visible en la pestaña de red.',
    ],
    [
      'O primeiro dígito do código carrega o sentido: 4 aponta para o pedido, 5 para o servidor.',
      '404 quer dizer "não existe"; 403, "existe, mas não para você". Trocar os dois atrasa a investigação.',
      'Nomes de cabeçalho não diferenciam maiúsculas: Content-Type e content-type são o mesmo.',
      'Problemas de cache e CORS costumam caber numa linha de cabeçalho, visível na aba de rede.',
    ],
    [
      'ステータスコードは最初の数字が意味を決めます。4なら要求側、5ならサーバー側の問題です。',
      '404は「ない」、403は「あるが許されない」です。取り違えると原因探しに時間がかかります。',
      'ヘッダー名は大文字小文字を区別しません。Content-Typeとcontent-typeは同じヘッダーです。',
      'キャッシュやCORSの問題はたいていヘッダー一行で決まります。ブラウザーのネットワークタブでそのまま見られます。',
    ],
    [
      'Die erste Ziffer des Statuscodes trägt die Bedeutung: 4 heißt Anfrage, 5 heißt Server.',
      '404 heißt „nicht da", 403 heißt „da, aber nicht für Sie". Wer sie vertauscht, sucht länger.',
      'Header-Namen unterscheiden keine Groß- und Kleinschreibung — Content-Type und content-type sind dasselbe.',
      'Cache- und CORS-Probleme hängen meist an einer Header-Zeile, sichtbar im Netzwerk-Tab.',
    ],
    [
      "Le premier chiffre du code porte le sens : 4 désigne la requête, 5 le serveur.",
      "404 veut dire « absent » ; 403, « présent mais interdit ». Les confondre rallonge le débogage.",
      "Les noms d'en-tête sont insensibles à la casse : Content-Type et content-type sont identiques.",
      "Les soucis de cache et de CORS tiennent souvent à une ligne d'en-tête, visible dans l'onglet réseau.",
    ],
    [
      'स्थिति कोड का पहला अंक ही अर्थ तय करता है: 4 यानी अनुरोध, 5 यानी सर्वर।',
      '404 का अर्थ है "नहीं है"; 403 का "है, पर आपके लिए नहीं"। दोनों को गड्डमगड्ड करने से जाँच लंबी होती है।',
      'हेडर नामों में अक्षर-भेद नहीं होता — Content-Type और content-type एक ही हैं।',
      'कैश और CORS की दिक़्क़तें अक्सर एक हेडर पंक्ति पर टिकी होती हैं, जो नेटवर्क टैब में दिखती है।',
    ],
    [
      '状态码的第一位定了大方向：4 开头是请求那侧的问题，5 开头是服务器那侧的问题。',
      '404 是「没有」，403 是「有，但不给你」。两个混着用，排查起来只会更慢。',
      '标头名不分大小写。Content-Type 和 content-type 是同一个标头。',
      '缓存和 CORS 的毛病，多半就差一行标头。在浏览器开发者工具的网络面板里能直接看到。',
    ],
    [
      '狀態碼的第一位定了大方向：4 開頭是請求那側的問題，5 開頭是伺服器那側的問題。',
      '404 是「沒有」，403 是「有，但不給你」。兩個混著用，排查起來只會更慢。',
      '標頭名不分大小寫。Content-Type 和 content-type 是同一個標頭。',
      '快取和 CORS 的毛病，多半就差一行標頭。在瀏覽器開發者工具的網路面板裡能直接看到。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'HTTP 상태 코드와 헤더 132가지 — 404·500의 뜻',
    'HTTP status codes and headers — what 404, 500 and 132 others mean',
    'Códigos y cabeceras HTTP — qué significan 404, 500 y otros 132',
    'Códigos e cabeçalhos HTTP — o que significam 404, 500 e outros 132',
    'HTTPステータスコードとヘッダー132種 — 404や500の意味',
    'HTTP-Statuscodes und -Header — was 404, 500 und 132 weitere bedeuten',
    'Codes et en-têtes HTTP — ce que signifient 404, 500 et 132 autres',
    'HTTP स्थिति कोड और हेडर — 404, 500 और 132 अन्य का अर्थ',
    'HTTP 状态码与标头 132 项 — 404、500 是什么意思',
    'HTTP 狀態碼與標頭 132 項 — 404、500 是什麼意思',
  ),
  hubMetaDesc: T(
    '404·403·500·503처럼 자주 만나는 상태 코드와 Content-Type·Cache-Control 같은 헤더 132가지를 갈래별로 정리했습니다. 각 항목이 무슨 뜻인지, 실제 줄에서 어떻게 생겼는지 확인하세요.',
    'A reference to 132 HTTP status codes and headers grouped by purpose — 404, 403, 500, 503, Content-Type, Cache-Control and the rest — with what each means and how it looks on the wire.',
    'Referencia de 132 códigos y cabeceras HTTP agrupados por propósito —404, 403, 500, 503, Content-Type, Cache-Control y demás— con su significado y su forma en la línea.',
    'Referência de 132 códigos e cabeçalhos HTTP agrupados por propósito — 404, 403, 500, 503, Content-Type, Cache-Control e os demais — com o significado e a forma na linha.',
    '404・403・500・503などよく出会うステータスコードと、Content-TypeやCache-Controlなどのヘッダー132種を分類ごとにまとめました。意味と実際の行の形を確認できます。',
    'Eine Referenz zu 132 HTTP-Statuscodes und -Headern nach Zweck geordnet — 404, 403, 500, 503, Content-Type, Cache-Control und mehr — mit Bedeutung und Zeilenform.',
    "Une référence de 132 codes et en-têtes HTTP classés par usage — 404, 403, 500, 503, Content-Type, Cache-Control et les autres — avec leur sens et leur forme sur le fil.",
    '132 HTTP स्थिति कोड और हेडर उद्देश्य के अनुसार — 404, 403, 500, 503, Content-Type, Cache-Control और बाक़ी — अर्थ और असली पंक्ति के रूप के साथ।',
    '404、403、500、503 这些常遇到的状态码，加上 Content-Type、Cache-Control 等标头，共 132 项按用途分好类。每一项是什么意思、在实际的一行里长什么样，都能查到。',
    '404、403、500、503 這些常遇到的狀態碼，加上 Content-Type、Cache-Control 等標頭，共 132 項按用途分好類。每一項是什麼意思、在實際的一行裡長什麼樣，都能查到。',
  ),

  metaTitle: T(
    (n: string) => `${n} — 무슨 뜻인가`,
    (n: string) => `${n} — what it means`,
    (n: string) => `${n} — qué significa`,
    (n: string) => `${n} — o que significa`,
    (n: string) => `${n} — 意味`,
    (n: string) => `${n} — was es bedeutet`,
    (n: string) => `${n} — ce que cela signifie`,
    (n: string) => `${n} — इसका अर्थ`,
    (n: string) => `${n} — 是什么意思`,
    (n: string) => `${n} — 是什麼意思`,
  ),

  metaDesc: T(
    (n: string, d: string) => `HTTP ${n}의 뜻과 쓰임입니다. ${d}`,
    (n: string, d: string) => `What HTTP ${n} means and when you meet it. ${d}`,
    (n: string, d: string) => `Qué significa HTTP ${n} y cuándo aparece. ${d}`,
    (n: string, d: string) => `O que significa HTTP ${n} e quando aparece. ${d}`,
    (n: string, d: string) => `HTTPの ${n} の意味と使われ方です。${d}`,
    (n: string, d: string) => `Was HTTP ${n} bedeutet und wann es auftritt. ${d}`,
    (n: string, d: string) => `Ce que signifie HTTP ${n} et quand on le rencontre. ${d}`,
    (n: string, d: string) => `HTTP ${n} का अर्थ और यह कब मिलता है। ${d}`,
    (n: string, d: string) => `HTTP ${n} 的含义和用处。${d}`,
    (n: string, d: string) => `HTTP ${n} 的含義和用處。${d}`,
  ),

  hubFaq: T(
    [
      { q: '404와 403은 뭐가 다른가요?', a: '404는 그 주소에 아무것도 없다는 뜻이고, 403은 있지만 볼 권한이 없다는 뜻입니다. 다만 자원이 있다는 사실 자체를 숨기려고 일부러 404를 주는 서버도 있습니다.' },
      { q: '500 오류가 나면 제가 할 수 있는 게 있나요?', a: '5로 시작하는 코드는 서버 쪽 문제라 대개 기다리는 것 말고 할 일이 없습니다. 다만 502·504는 앞단과 뒷단 사이의 문제라 잠시 뒤 다시 시도하면 풀리는 일이 많습니다.' },
      { q: '301과 302는 어떻게 고르나요?', a: '주소를 완전히 옮겼으면 301, 잠시만 다른 곳으로 보낼 거면 302입니다. 301은 브라우저와 검색엔진이 오래 기억하므로 되돌리기 어렵다는 점을 염두에 두세요.' },
      { q: '헤더 이름은 대소문자를 가리나요?', a: '가리지 않습니다. Content-Type과 content-type은 같은 헤더이고, HTTP/2부터는 아예 소문자로 보내도록 정해져 있습니다.' },
      { q: 'CORS 오류는 왜 나나요?', a: '브라우저가 다른 출처의 응답을 읽으려 할 때, 서버가 Access-Control-Allow-Origin으로 허락하지 않으면 막습니다. 서버가 응답은 보냈지만 브라우저가 읽기를 거부한 상태라, 네트워크 탭에서는 응답이 보이는데 코드에서는 못 읽는 일이 생깁니다.' },
    ],
    [
      { q: 'What is the difference between 404 and 403?', a: '404 says nothing is at that address; 403 says something is, but you may not see it. Some servers deliberately answer 404 to hide the fact that a resource exists at all.' },
      { q: 'Can I do anything about a 500?', a: 'Codes starting with 5 are the server’s problem, so usually only waiting helps. A 502 or 504 sits between a front and back server, though, and often clears on a retry a moment later.' },
      { q: 'How do I choose between 301 and 302?', a: 'Use 301 when the address has moved for good and 302 when it is temporary. Remember that browsers and search engines remember a 301 for a long time, which makes it hard to undo.' },
      { q: 'Are header names case-sensitive?', a: 'No. Content-Type and content-type are the same header, and since HTTP/2 they are sent lowercase by definition.' },
      { q: 'Why do CORS errors happen?', a: 'When a page tries to read a response from another origin, the browser blocks it unless the server allowed it with Access-Control-Allow-Origin. The server did answer — the browser simply refuses to hand the body to your code, which is why the network tab shows a response your script cannot read.' },
    ],
    [
      { q: '¿En qué se diferencian 404 y 403?', a: '404 dice que no hay nada en esa dirección; 403 dice que sí lo hay, pero no puedes verlo. Algunos servidores responden 404 a propósito para ocultar que el recurso existe.' },
      { q: '¿Puedo hacer algo ante un 500?', a: 'Los códigos que empiezan por 5 son problema del servidor, así que suele quedar solo esperar. Un 502 o un 504 está entre dos servidores y a menudo se resuelve al reintentar poco después.' },
      { q: '¿Cómo elijo entre 301 y 302?', a: 'Usa 301 cuando la dirección se movió definitivamente y 302 cuando es temporal. Ten en cuenta que navegadores y buscadores recuerdan un 301 mucho tiempo, y cuesta revertirlo.' },
      { q: '¿Las cabeceras distinguen mayúsculas?', a: 'No. Content-Type y content-type son la misma, y desde HTTP/2 se envían en minúsculas por definición.' },
      { q: '¿Por qué aparecen errores CORS?', a: 'Cuando una página intenta leer una respuesta de otro origen, el navegador la bloquea salvo que el servidor lo permita con Access-Control-Allow-Origin. El servidor sí respondió: es el navegador quien no entrega el cuerpo a tu código, de ahí que la pestaña de red muestre algo que tu script no puede leer.' },
    ],
    [
      { q: 'Qual a diferença entre 404 e 403?', a: '404 diz que não há nada nesse endereço; 403 diz que há, mas você não pode ver. Alguns servidores respondem 404 de propósito para esconder que o recurso existe.' },
      { q: 'Dá para fazer algo diante de um 500?', a: 'Códigos que começam com 5 são problema do servidor, então em geral só resta esperar. Já um 502 ou 504 fica entre dois servidores e costuma passar ao tentar de novo.' },
      { q: 'Como escolher entre 301 e 302?', a: 'Use 301 quando o endereço mudou de vez e 302 quando é temporário. Lembre que navegadores e buscadores guardam um 301 por muito tempo, o que dificulta voltar atrás.' },
      { q: 'Os nomes de cabeçalho diferenciam maiúsculas?', a: 'Não. Content-Type e content-type são o mesmo, e desde o HTTP/2 são enviados em minúsculas por definição.' },
      { q: 'Por que ocorrem erros de CORS?', a: 'Quando a página tenta ler uma resposta de outra origem, o navegador bloqueia a menos que o servidor permita com Access-Control-Allow-Origin. O servidor respondeu: é o navegador que não entrega o corpo ao seu código, e por isso a aba de rede mostra algo que o script não lê.' },
    ],
    [
      { q: '404と403は何が違いますか。', a: '404はその住所に何もないという意味で、403はあるけれど見る権限がないという意味です。ただし資源の存在自体を隠すためにわざと404を返すサーバーもあります。' },
      { q: '500エラーのとき自分にできることはありますか。', a: '5で始まるコードはサーバー側の問題なので、たいていは待つしかありません。ただし502や504は前段と後段のあいだの問題で、少し待って再試行すると解けることが多いです。' },
      { q: '301と302はどう選びますか。', a: '住所を完全に移したなら301、一時的に別へ送るなら302です。301はブラウザーも検索エンジンも長く覚えるため、取り消しにくい点に注意してください。' },
      { q: 'ヘッダー名は大文字小文字を区別しますか。', a: '区別しません。Content-Typeとcontent-typeは同じヘッダーで、HTTP/2以降は小文字で送ると定められています。' },
      { q: 'CORSエラーはなぜ起きますか。', a: 'ページが別出所の応答を読もうとしたとき、サーバーがAccess-Control-Allow-Originで許可していなければブラウザーが遮ります。サーバーは応答していて、ブラウザーが本文をコードに渡さないだけなので、ネットワークタブには見えるのにスクリプトからは読めないという状態になります。' },
    ],
    [
      { q: 'Was unterscheidet 404 von 403?', a: '404 sagt: An dieser Adresse liegt nichts. 403 sagt: Es liegt etwas da, aber nicht für Sie. Manche Server antworten absichtlich mit 404, um die Existenz überhaupt zu verbergen.' },
      { q: 'Kann ich bei einem 500 etwas tun?', a: 'Codes mit 5 sind Sache des Servers, meist hilft nur Warten. Ein 502 oder 504 steckt jedoch zwischen zwei Servern und löst sich oft beim erneuten Versuch kurz darauf.' },
      { q: 'Wann 301, wann 302?', a: '301, wenn die Adresse endgültig umgezogen ist, 302 bei einem vorübergehenden Umweg. Browser und Suchmaschinen merken sich ein 301 lange — das lässt sich schwer zurücknehmen.' },
      { q: 'Sind Header-Namen case-sensitiv?', a: 'Nein. Content-Type und content-type sind derselbe Header, und seit HTTP/2 werden sie ohnehin klein geschrieben übertragen.' },
      { q: 'Warum entstehen CORS-Fehler?', a: 'Will eine Seite eine Antwort fremder Herkunft lesen, blockt der Browser, sofern der Server es nicht mit Access-Control-Allow-Origin erlaubt. Der Server hat geantwortet — der Browser reicht den Body nur nicht an Ihren Code weiter. Deshalb zeigt der Netzwerk-Tab eine Antwort, die das Skript nicht lesen kann.' },
    ],
    [
      { q: 'Quelle différence entre 404 et 403 ?', a: "404 dit qu'il n'y a rien à cette adresse ; 403 dit qu'il y a quelque chose, mais pas pour vous. Certains serveurs renvoient volontairement 404 pour masquer l'existence même de la ressource." },
      { q: 'Puis-je faire quelque chose face à un 500 ?', a: "Les codes commençant par 5 relèvent du serveur : le plus souvent, il ne reste qu'à attendre. Un 502 ou un 504 se situe entre deux serveurs et se résout souvent en réessayant peu après." },
      { q: 'Comment choisir entre 301 et 302 ?', a: "301 quand l'adresse a changé définitivement, 302 pour un détour temporaire. Navigateurs et moteurs retiennent longtemps un 301 : difficile de revenir en arrière." },
      { q: "Les noms d'en-tête sont-ils sensibles à la casse ?", a: "Non. Content-Type et content-type désignent le même en-tête, et depuis HTTP/2 ils circulent en minuscules par définition." },
      { q: 'Pourquoi les erreurs CORS surviennent-elles ?', a: "Quand une page tente de lire une réponse d'une autre origine, le navigateur bloque, sauf autorisation du serveur via Access-Control-Allow-Origin. Le serveur a bien répondu : c'est le navigateur qui refuse de transmettre le corps à votre code, d'où une réponse visible dans l'onglet réseau mais illisible par le script." },
    ],
    [
      { q: '404 और 403 में क्या फ़र्क़ है?', a: '404 कहता है कि उस पते पर कुछ नहीं है; 403 कहता है कि है, पर आप देख नहीं सकते। कुछ सर्वर जानबूझकर 404 देते हैं ताकि संसाधन के होने का पता ही न चले।' },
      { q: '500 आने पर मैं कुछ कर सकता हूँ?', a: '5 से शुरू होने वाले कोड सर्वर की समस्या हैं, इसलिए आमतौर पर प्रतीक्षा ही रास्ता है। हालाँकि 502 और 504 दो सर्वरों के बीच की बात है और थोड़ी देर बाद दोबारा कोशिश करने पर अक्सर सुलझ जाती है।' },
      { q: '301 और 302 में से क्या चुनें?', a: 'पता हमेशा के लिए बदला हो तो 301, अस्थायी हो तो 302। ध्यान रखें कि ब्राउज़र और खोज इंजन 301 को लंबे समय तक याद रखते हैं, जिससे उसे पलटना कठिन होता है।' },
      { q: 'क्या हेडर नामों में अक्षर-भेद होता है?', a: 'नहीं। Content-Type और content-type एक ही हेडर हैं, और HTTP/2 से तो वे छोटे अक्षरों में ही भेजे जाते हैं।' },
      { q: 'CORS त्रुटियाँ क्यों आती हैं?', a: 'जब कोई पन्ना दूसरे मूल का उत्तर पढ़ना चाहे और सर्वर ने Access-Control-Allow-Origin से अनुमति न दी हो, तो ब्राउज़र रोक देता है। सर्वर ने उत्तर तो भेजा — ब्राउज़र बस उसे आपके कोड तक नहीं पहुँचाता, इसलिए नेटवर्क टैब में दिखता है पर स्क्रिप्ट पढ़ नहीं पाती।' },
    ],
    [
      { q: '404 和 403 有什么区别？', a: '404 说的是那个地址上什么都没有；403 说的是东西在，但你没资格看。不过也有服务器故意回 404，好把「这里存在一个资源」这件事本身藏起来。' },
      { q: '碰到 500 我能做点什么？', a: '5 开头的都是服务器那侧的问题，多半只能等。不过 502 和 504 是前后两台服务器之间的事，隔一会儿重试常常就好了。' },
      { q: '301 和 302 怎么选？', a: '地址永久搬走用 301，只是临时绕道用 302。要留意浏览器和搜索引擎会把 301 记很久，改回来很麻烦。' },
      { q: '标头名分大小写吗？', a: '不分。Content-Type 和 content-type 是同一个标头；从 HTTP/2 起，干脆规定一律用小写发送。' },
      { q: 'CORS 错误是怎么来的？', a: '页面想读另一个源的响应，而服务器没用 Access-Control-Allow-Origin 放行，浏览器就会拦下来。服务器其实已经把响应发回来了，只是浏览器不肯把正文交给你的代码 —— 所以网络面板里看得见，脚本里却读不到。' },
    ],
    [
      { q: '404 和 403 有什麼區別？', a: '404 說的是那個位址上什麼都沒有；403 說的是東西在，但你沒資格看。不過也有伺服器故意回 404，好把「這裡存在一個資源」這件事本身藏起來。' },
      { q: '碰到 500 我能做點什麼？', a: '5 開頭的都是伺服器那側的問題，多半只能等。不過 502 和 504 是前後兩台伺服器之間的事，隔一會兒重試常常就好了。' },
      { q: '301 和 302 怎麼選？', a: '位址永久搬走用 301，只是暫時繞道用 302。要留意瀏覽器和搜尋引擎會把 301 記很久，改回來很麻煩。' },
      { q: '標頭名分大小寫嗎？', a: '不分。Content-Type 和 content-type 是同一個標頭；從 HTTP/2 起，乾脆規定一律用小寫傳送。' },
      { q: 'CORS 錯誤是怎麼來的？', a: '頁面想讀另一個來源的回應，而伺服器沒用 Access-Control-Allow-Origin 放行，瀏覽器就會攔下來。伺服器其實已經把回應發回來了，只是瀏覽器不肯把正文交給你的程式 —— 所以網路面板裡看得見，腳本裡卻讀不到。' },
    ],
  ),

  itemFaq: T(
    (f: HttpFacts, d: string, kind: string) => [
      { q: `HTTP ${f.name}은 무슨 뜻인가요?`, a: d },
      { q: `${f.name}은 실제로 어떻게 생겼나요?`, a: `${f.example} 꼴로 오갑니다.` },
      { q: f.kind === 'status' ? `${f.name}은 오류인가요?` : `${f.name}은 어디에 붙나요?`, a: f.kind === 'status' ? (f.isError ? '오류로 다루는 코드입니다. 4로 시작하면 요청 쪽, 5로 시작하면 서버 쪽 문제입니다.' : '오류가 아닙니다. 정상 흐름의 일부로 오는 응답입니다.') : `${kind}입니다.` },
      { q: `${f.name}은 어느 갈래인가요?`, a: `${kind} 갈래입니다. 같은 갈래의 다른 항목도 이 화면 아래에 있습니다.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `What does HTTP ${f.name} mean?`, a: d },
      { q: `What does ${f.name} look like on the wire?`, a: `It travels as ${f.example}` },
      { q: f.kind === 'status' ? `Is ${f.name} an error?` : `Where does ${f.name} appear?`, a: f.kind === 'status' ? (f.isError ? 'Yes. A code starting with 4 blames the request; one starting with 5 blames the server.' : 'No — it is part of a normal exchange, not a failure.') : `In ${kind.toLowerCase()}.` },
      { q: `What group does ${f.name} belong to?`, a: `The ${kind.toLowerCase()} group; the rest of that group is listed further down.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `¿Qué significa HTTP ${f.name}?`, a: d },
      { q: `¿Cómo se ve ${f.name} en la línea?`, a: `Viaja así: ${f.example}` },
      { q: f.kind === 'status' ? `¿${f.name} es un error?` : `¿Dónde aparece ${f.name}?`, a: f.kind === 'status' ? (f.isError ? 'Sí. Un código que empieza por 4 culpa a la petición; por 5, al servidor.' : 'No: forma parte de un intercambio normal, no de un fallo.') : `En ${kind.toLowerCase()}.` },
      { q: `¿A qué grupo pertenece ${f.name}?`, a: `Al grupo ${kind.toLowerCase()}; el resto aparece más abajo.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `O que significa HTTP ${f.name}?`, a: d },
      { q: `Como ${f.name} aparece na linha?`, a: `Trafega assim: ${f.example}` },
      { q: f.kind === 'status' ? `${f.name} é um erro?` : `Onde ${f.name} aparece?`, a: f.kind === 'status' ? (f.isError ? 'Sim. Um código iniciado em 4 responsabiliza o pedido; em 5, o servidor.' : 'Não: faz parte de uma troca normal, não de uma falha.') : `Em ${kind.toLowerCase()}.` },
      { q: `A que grupo pertence ${f.name}?`, a: `Ao grupo ${kind.toLowerCase()}; o restante está mais abaixo.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `HTTPの ${f.name} はどんな意味ですか。`, a: d },
      { q: `${f.name} は実際どんな行になりますか。`, a: `${f.example} の形でやり取りされます。` },
      { q: f.kind === 'status' ? `${f.name} はエラーですか。` : `${f.name} はどこに付きますか。`, a: f.kind === 'status' ? (f.isError ? 'はい。4で始まれば要求側、5で始まればサーバー側の問題です。' : 'いいえ。失敗ではなく、通常のやり取りの一部です。') : `${kind}です。` },
      { q: `${f.name} はどの分類ですか。`, a: `${kind}の分類です。同じ分類のほかの項目もこのページの下にあります。` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `Was bedeutet HTTP ${f.name}?`, a: d },
      { q: `Wie sieht ${f.name} in der Leitung aus?`, a: `Es läuft als ${f.example}` },
      { q: f.kind === 'status' ? `Ist ${f.name} ein Fehler?` : `Wo erscheint ${f.name}?`, a: f.kind === 'status' ? (f.isError ? 'Ja. Eine 4 am Anfang weist auf die Anfrage, eine 5 auf den Server.' : 'Nein — es gehört zum normalen Ablauf, nicht zu einem Fehler.') : `In ${kind}.` },
      { q: `Zu welcher Gruppe gehört ${f.name}?`, a: `Zur Gruppe ${kind}; der Rest steht weiter unten.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `Que signifie HTTP ${f.name} ?`, a: d },
      { q: `À quoi ressemble ${f.name} sur le fil ?`, a: `Il circule sous la forme ${f.example}` },
      { q: f.kind === 'status' ? `${f.name} est-il une erreur ?` : `Où apparaît ${f.name} ?`, a: f.kind === 'status' ? (f.isError ? "Oui. Un code commençant par 4 met en cause la requête ; par 5, le serveur." : "Non : il fait partie d'un échange normal, pas d'un échec.") : `Dans ${kind.toLowerCase()}.` },
      { q: `À quel groupe appartient ${f.name} ?`, a: `Au groupe ${kind.toLowerCase()} ; le reste figure plus bas.` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `HTTP ${f.name} का क्या अर्थ है?`, a: d },
      { q: `${f.name} असली पंक्ति में कैसा दिखता है?`, a: `यह ${f.example} रूप में आता-जाता है।` },
      { q: f.kind === 'status' ? `क्या ${f.name} त्रुटि है?` : `${f.name} कहाँ लगता है?`, a: f.kind === 'status' ? (f.isError ? 'हाँ। 4 से शुरू होने पर दोष अनुरोध का, 5 से शुरू होने पर सर्वर का।' : 'नहीं — यह सामान्य आदान-प्रदान का हिस्सा है, विफलता नहीं।') : `${kind} में।` },
      { q: `${f.name} किस समूह का है?`, a: `${kind} समूह का; उसी समूह के बाक़ी नीचे दिए हैं।` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `HTTP ${f.name} 是什么意思？`, a: d },
      { q: `${f.name} 实际长什么样？`, a: `以 ${f.example} 这样的形式来回。` },
      { q: f.kind === 'status' ? `${f.name} 算错误吗？` : `${f.name} 加在哪一边？`, a: f.kind === 'status' ? (f.isError ? '算错误。4 开头是请求那侧的问题，5 开头是服务器那侧的问题。' : '不算错误。它是正常流程里会出现的响应。') : `属于${kind}。` },
      { q: `${f.name} 属于哪一类？`, a: `属于${kind}这一类。同类的其他条目列在本页下方。` },
    ],
    (f: HttpFacts, d: string, kind: string) => [
      { q: `HTTP ${f.name} 是什麼意思？`, a: d },
      { q: `${f.name} 實際長什麼樣？`, a: `以 ${f.example} 這樣的形式來回。` },
      { q: f.kind === 'status' ? `${f.name} 算錯誤嗎？` : `${f.name} 加在哪一邊？`, a: f.kind === 'status' ? (f.isError ? '算錯誤。4 開頭是請求那側的問題，5 開頭是伺服器那側的問題。' : '不算錯誤。它是正常流程裡會出現的回應。') : `屬於${kind}。` },
      { q: `${f.name} 屬於哪一類？`, a: `屬於${kind}這一類。同類的其他條目列在本頁下方。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const HTTP_UI: L<HttpUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<HttpUI>;
