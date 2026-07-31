/**
 * 정규식 화면의 문구 — 여덟 언어.
 *
 * 식 자체와 보기는 만국 공통이라 옮기지 않는다. 항목마다의 설명은 desc.ts의
 * "무엇에 맞는가" 한 마디에, 식에서 계산한 사실(앞뒤가 묶였는지, 잡는 묶음이
 * 몇 개인지)을 붙여 만든다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { RegexKind } from './list.ts';
import type { RegexFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface RegexUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<RegexKind, string>;
  kindNote: Record<RegexKind, string>;
  flagLabel: Record<string, string>;
  patternLabel: string;
  flagsLabel: string;
  groupsLabel: string;
  anchoredLabel: string;
  anchoredYes: string;
  anchoredNo: string;
  sampleLabel: string;
  okTitle: string;
  noTitle: string;
  tryTitle: string;
  tryNote: string;
  tryPlaceholder: string;
  /** 잡힌 수를 말하는 틀 — 브라우저 쪽에서 {n}을 채운다 (함수는 넘길 수 없다) */
  tryHitOne: string;
  tryHitMany: string;
  tryMiss: string;
  siblingTitle: string;
  desc: (f: RegexFacts, what: string) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (what: string) => string;
  metaDesc: (f: RegexFacts, what: string) => string;
  hubFaq: FaqItem[];
  patternFaq: (f: RegexFacts, what: string, okOne: string, noOne: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof RegexUI]: L<RegexUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('정규식', 'Regular expressions', 'Expresiones regulares', 'Expressões regulares', '正規表現', 'Reguläre Ausdrücke', 'Expressions régulières', 'रेगुलर एक्सप्रेशन', '正则表达式', '正規表示式'),

  hubTitle: T(
    '정규식 133가지',
    '133 regular expressions',
    '133 expresiones regulares',
    '133 expressões regulares',
    '正規表現133種',
    '133 reguläre Ausdrücke',
    '133 expressions régulières',
    '133 रेगुलर एक्सप्रेशन',
    '正则表达式 133 例',
    '正規表示式 133 例',
  ),

  hubLead: T(
    '표기법부터 이메일·날짜·주소 검사까지. 식마다 맞는 보기와 맞지 않는 보기를 함께 실었고, 그 보기가 실제로 그렇게 되는지 검사가 매번 돌려 봅니다.',
    'From the notation itself to checks for email, dates and addresses. Every expression comes with examples that should match and examples that should not — and the test suite actually runs them.',
    'Desde la notación hasta comprobar correos, fechas y direcciones. Cada expresión trae ejemplos que deben coincidir y otros que no, y las pruebas los ejecutan de verdad.',
    'Da notação até verificar e-mails, datas e endereços. Cada expressão vem com exemplos que devem casar e outros que não, e os testes realmente os executam.',
    '表記法からメール・日付・アドレスの検査まで。式ごとに「合うべき例」と「合ってはいけない例」を添え、検査が毎回実際に走らせます。',
    'Von der Notation bis zur Prüfung von E-Mails, Daten und Adressen. Zu jedem Ausdruck gehören Beispiele, die passen sollen, und solche, die nicht passen dürfen — und die Tests führen sie wirklich aus.',
    'De la notation jusqu’aux contrôles d’e-mails, de dates et d’adresses. Chaque expression est livrée avec des exemples qui doivent correspondre et d’autres non — et les tests les exécutent vraiment.',
    'संकेतन से लेकर ईमेल, तारीख़ और पते की जाँच तक। हर एक्सप्रेशन के साथ मिलने वाले और न मिलने वाले उदाहरण हैं, और जाँच उन्हें सचमुच चलाती है।',
    '从写法本身，到电子邮件、日期、地址的校验。每个式子都配了该匹配的例子和不该匹配的例子，而且测试每次都真的跑一遍。',
    '從寫法本身，到電子郵件、日期、位址的檢查。每個式子都配了該符合的例子和不該符合的例子，而且測試每次都真的跑一遍。',
  ),

  kindLabel: T(
    { syntax: '표기법', quantifier: '되풀이와 묶음', lookaround: '앞뒤 살피기', validate: '통째로 검사', extract: '골라내기와 다듬기' },
    { syntax: 'Notation', quantifier: 'Repeats and groups', lookaround: 'Looking around', validate: 'Whole-string checks', extract: 'Finding and cleaning' },
    { syntax: 'Notación', quantifier: 'Repeticiones y grupos', lookaround: 'Mirar alrededor', validate: 'Comprobar la cadena entera', extract: 'Buscar y limpiar' },
    { syntax: 'Notação', quantifier: 'Repetições e grupos', lookaround: 'Olhar em volta', validate: 'Verificar a cadeia inteira', extract: 'Buscar e limpar' },
    { syntax: '表記法', quantifier: '繰り返しとグループ', lookaround: '前後を見る', validate: '全体の検査', extract: '取り出しと整形' },
    { syntax: 'Notation', quantifier: 'Wiederholung und Gruppen', lookaround: 'Umschauen', validate: 'Prüfung der ganzen Zeichenkette', extract: 'Finden und säubern' },
    { syntax: 'Notation', quantifier: 'Répétitions et groupes', lookaround: 'Regarder autour', validate: 'Contrôle de la chaîne entière', extract: 'Trouver et nettoyer' },
    { syntax: 'संकेतन', quantifier: 'दोहराव और समूह', lookaround: 'आगे-पीछे देखना', validate: 'पूरी स्ट्रिंग की जाँच', extract: 'खोजना और साफ़ करना' },
    { syntax: '写法', quantifier: '重复与分组', lookaround: '前后查看', validate: '整串校验', extract: '提取与清理' },
    { syntax: '寫法', quantifier: '重複與分組', lookaround: '前後查看', validate: '整串檢查', extract: '擷取與清理' },
  ),

  kindNote: T(
    {
      syntax: '글자 하나를 어떻게 가리키는지 정하는 표기들입니다. 나머지는 모두 여기서 시작합니다.',
      quantifier: '몇 번 되풀이되는지, 어디까지를 한 묶음으로 볼지 정합니다.',
      lookaround: '앞뒤에 무엇이 있는지 확인만 하고 잡아먹지는 않습니다. 조건을 겹쳐 걸 때 씁니다.',
      validate: '앞뒤가 묶여 있어 문자열 전체가 맞아야 통과합니다. 입력값 검사에 씁니다.',
      extract: '글 안에서 필요한 부분만 찾아내거나 지울 때 씁니다.',
    },
    {
      syntax: 'How to point at a single character. Everything else builds on these.',
      quantifier: 'How many times something repeats, and what counts as one unit.',
      lookaround: 'Checks what sits before or after without consuming it. Useful for stacking conditions.',
      validate: 'Anchored at both ends, so the whole string has to match. This is what input validation uses.',
      extract: 'For picking out or deleting just the part you need from a larger text.',
    },
    {
      syntax: 'Cómo señalar un solo carácter. Todo lo demás se construye sobre esto.',
      quantifier: 'Cuántas veces se repite algo y qué cuenta como una unidad.',
      lookaround: 'Comprueba lo que hay delante o detrás sin consumirlo. Sirve para apilar condiciones.',
      validate: 'Anclado en ambos extremos: la cadena entera debe coincidir. Es lo que usa la validación.',
      extract: 'Para extraer o borrar solo la parte que necesitas de un texto mayor.',
    },
    {
      syntax: 'Como apontar para um único caractere. Todo o resto se apoia nisso.',
      quantifier: 'Quantas vezes algo se repete e o que conta como uma unidade.',
      lookaround: 'Verifica o que está antes ou depois sem consumir. Serve para empilhar condições.',
      validate: 'Ancorado nas duas pontas: a cadeia inteira precisa casar. É o que a validação usa.',
      extract: 'Para extrair ou apagar só a parte de que você precisa de um texto maior.',
    },
    {
      syntax: '1文字をどう指すかを決める表記です。ほかはすべてここから始まります。',
      quantifier: '何回繰り返すか、どこまでをひとまとまりと見るかを決めます。',
      lookaround: '前後に何があるかを確かめるだけで、取り込みはしません。条件を重ねるときに使います。',
      validate: '前後が固定されているので、文字列全体が合わないと通りません。入力検査に使います。',
      extract: '文の中から必要な部分だけを取り出したり消したりするときに使います。',
    },
    {
      syntax: 'Wie man ein einzelnes Zeichen benennt. Alles andere baut darauf auf.',
      quantifier: 'Wie oft sich etwas wiederholt und was als eine Einheit zählt.',
      lookaround: 'Prüft, was davor oder dahinter steht, ohne es zu verbrauchen. Gut zum Stapeln von Bedingungen.',
      validate: 'An beiden Enden verankert — die ganze Zeichenkette muss passen. Das nutzt die Eingabeprüfung.',
      extract: 'Um aus einem größeren Text genau das Gesuchte herauszuholen oder zu löschen.',
    },
    {
      syntax: 'Comment désigner un seul caractère. Tout le reste part de là.',
      quantifier: 'Combien de fois quelque chose se répète, et ce qui compte pour une unité.',
      lookaround: 'Vérifie ce qui précède ou suit sans le consommer. Pratique pour empiler des conditions.',
      validate: 'Ancré aux deux bouts : la chaîne entière doit correspondre. C’est ce qu’utilise la validation.',
      extract: 'Pour extraire ou supprimer uniquement la partie voulue dans un texte plus large.',
    },
    {
      syntax: 'एक वर्ण को कैसे इंगित करें। बाक़ी सब इसी पर टिका है।',
      quantifier: 'कोई चीज़ कितनी बार दोहराती है और एक इकाई क्या मानी जाए।',
      lookaround: 'आगे या पीछे क्या है यह जाँचता है, पर उसे लेता नहीं। शर्तें जोड़ने में काम आता है।',
      validate: 'दोनों सिरों पर लंगर — पूरी स्ट्रिंग मिलनी चाहिए। इनपुट जाँच यही इस्तेमाल करती है।',
      extract: 'बड़े पाठ में से सिर्फ़ ज़रूरी हिस्सा निकालने या हटाने के लिए।',
    },
    {
      syntax: '规定怎样指向单个字符的写法。其余一切都从这里开始。',
      quantifier: '规定重复多少次，以及把哪一段看作一个整体。',
      lookaround: '只查看前后有什么，并不把它吃掉。叠加条件时用得上。',
      validate: '两端都锚住，整个字符串合上才算通过。输入校验用的就是这类。',
      extract: '用来从一段文字里只挑出、或只删掉需要的那部分。',
    },
    {
      syntax: '規定怎樣指向單個字元的寫法。其餘一切都從這裡開始。',
      quantifier: '規定重複多少次，以及把哪一段看作一個整體。',
      lookaround: '只查看前後有什麼，並不把它吃掉。疊加條件時用得上。',
      validate: '兩端都錨住，整個字串合上才算通過。輸入檢查用的就是這類。',
      extract: '用來從一段文字裡只挑出、或只刪掉需要的那部分。',
    },
  ),

  flagLabel: T(
    { i: '대소문자 무시', g: '모두 찾기', m: '줄마다', s: '점이 줄바꿈까지', u: '유니코드', y: '붙은 자리만' },
    { i: 'ignore case', g: 'find all', m: 'per line', s: 'dot matches newline', u: 'unicode', y: 'sticky' },
    { i: 'ignorar mayúsculas', g: 'buscar todas', m: 'por línea', s: 'el punto incluye el salto', u: 'unicode', y: 'pegajoso' },
    { i: 'ignorar maiúsculas', g: 'buscar todas', m: 'por linha', s: 'o ponto inclui a quebra', u: 'unicode', y: 'grudento' },
    { i: '大小文字を無視', g: 'すべて探す', m: '行ごと', s: 'ドットが改行も含む', u: 'ユニコード', y: '連続位置のみ' },
    { i: 'Groß/Klein egal', g: 'alle finden', m: 'je Zeile', s: 'Punkt trifft Zeilenumbruch', u: 'Unicode', y: 'haftend' },
    { i: 'casse ignorée', g: 'tout trouver', m: 'par ligne', s: 'le point inclut le saut', u: 'unicode', y: 'collant' },
    { i: 'केस अनदेखा', g: 'सब खोजें', m: 'प्रति पंक्ति', s: 'बिंदु लाइन ब्रेक भी', u: 'यूनिकोड', y: 'चिपकू' },
    { i: '不分大小写', g: '全部查找', m: '逐行', s: '点号含换行', u: 'Unicode', y: '紧贴上次位置' },
    { i: '不分大小寫', g: '全部尋找', m: '逐行', s: '點號含換行', u: 'Unicode', y: '緊貼上次位置' },
  ),

  patternLabel: T('식', 'Pattern', 'Patrón', 'Padrão', '式', 'Muster', 'Motif', 'पैटर्न', '表达式', '表示式'),
  flagsLabel: T('플래그', 'Flags', 'Banderas', 'Flags', 'フラグ', 'Flags', 'Options', 'फ़्लैग', '标志', '旗標'),
  groupsLabel: T('잡는 묶음', 'Capture groups', 'Grupos de captura', 'Grupos de captura', '取り出すグループ', 'Fanggruppen', 'Groupes capturants', 'कैप्चर समूह', '捕获组', '擷取群組'),
  anchoredLabel: T('맞춤 범위', 'Match scope', 'Alcance', 'Alcance', '一致の範囲', 'Trefferbereich', 'Portée', 'मिलान का दायरा', '匹配范围', '比對範圍'),
  anchoredYes: T('문자열 전체', 'the whole string', 'la cadena entera', 'a cadeia inteira', '文字列全体', 'die ganze Zeichenkette', 'la chaîne entière', 'पूरी स्ट्रिंग', '整个字符串', '整個字串'),
  anchoredNo: T('글 안 어디든', 'anywhere inside the text', 'en cualquier parte del texto', 'em qualquer parte do texto', '文中のどこでも', 'irgendwo im Text', "n'importe où dans le texte", 'पाठ में कहीं भी', '文中任意位置', '文中任意位置'),
  sampleLabel: T('첫 보기에서 잡히는 부분', 'What it catches in the first example', 'Lo que captura en el primer ejemplo', 'O que captura no primeiro exemplo', '最初の例で取れる部分', 'Was es im ersten Beispiel fängt', 'Ce qu’il capture dans le premier exemple', 'पहले उदाहरण में क्या पकड़ता है', '在第一个例子里抓到的部分', '在第一個例子裡抓到的部分'),

  okTitle: T('맞는 보기', 'Examples that match', 'Ejemplos que coinciden', 'Exemplos que casam', '合う例', 'Beispiele, die passen', 'Exemples qui correspondent', 'मिलने वाले उदाहरण', '匹配的例子', '符合的例子'),
  noTitle: T('맞지 않는 보기', 'Examples that do not match', 'Ejemplos que no coinciden', 'Exemplos que não casam', '合わない例', 'Beispiele, die nicht passen', 'Exemples qui ne correspondent pas', 'न मिलने वाले उदाहरण', '不匹配的例子', '不符合的例子'),

  tryTitle: T('직접 넣어 보기', 'Try it yourself', 'Pruébalo', 'Experimente', '試してみる', 'Selbst ausprobieren', 'Essayez', 'ख़ुद आज़माएँ', '自己试一试', '自己試一試'),
  tryNote: T(
    '아무 글이나 넣으면 이 식이 잡는 부분을 표시합니다. 브라우저 안에서만 처리되고 어디에도 보내지 않습니다.',
    'Type any text and the parts this expression catches are highlighted. It runs in your browser and is never sent anywhere.',
    'Escribe cualquier texto y se marcará lo que captura la expresión. Todo ocurre en tu navegador y no se envía a ninguna parte.',
    'Digite qualquer texto e as partes capturadas serão marcadas. Tudo roda no seu navegador e nada é enviado.',
    '好きな文を入れると、この式が取る部分に印が付きます。ブラウザの中だけで動き、どこにも送られません。',
    'Beliebigen Text eingeben — die gefundenen Stellen werden hervorgehoben. Läuft im Browser und wird nirgendwohin gesendet.',
    'Tapez un texte : les parties capturées sont surlignées. Tout se passe dans votre navigateur, rien n’est envoyé.',
    'कोई भी पाठ लिखिए, यह एक्सप्रेशन जो पकड़ता है वह उजागर हो जाएगा। सब कुछ आपके ब्राउज़र में चलता है, कहीं भेजा नहीं जाता।',
    '随便输入一段文字，这个式子抓到的部分就会高亮出来。全部在你的浏览器里运行，不会发往任何地方。',
    '隨便輸入一段文字，這個式子抓到的部分就會標示出來。全部在你的瀏覽器裡執行，不會送往任何地方。',
  ),
  tryPlaceholder: T('여기에 글을 넣어 보세요', 'Type or paste text here', 'Escribe o pega texto aquí', 'Digite ou cole um texto aqui', 'ここに文を入れてください', 'Text hier eingeben oder einfügen', 'Saisissez ou collez un texte', 'यहाँ पाठ लिखें या चिपकाएँ', '在这里输入或粘贴文字', '在這裡輸入或貼上文字'),
  tryHitOne: T('한 군데 잡혔습니다', '1 match', '1 coincidencia', '1 correspondência', '1か所に一致', '1 Treffer', '1 correspondance', '1 मिलान', '匹配到 1 处', '符合 1 處'),
  tryHitMany: T('{n}군데 잡혔습니다', '{n} matches', '{n} coincidencias', '{n} correspondências', '{n}か所に一致', '{n} Treffer', '{n} correspondances', '{n} मिलान', '匹配到 {n} 处', '符合 {n} 處'),
  tryMiss: T('맞는 곳이 없습니다', 'No match', 'Sin coincidencias', 'Sem correspondência', '一致なし', 'Kein Treffer', 'Aucune correspondance', 'कोई मिलान नहीं', '没有匹配', '沒有符合'),

  siblingTitle: T('같은 갈래의 다른 식', 'Other expressions in this group', 'Otras expresiones del grupo', 'Outras expressões do grupo', '同じ組の別の式', 'Andere Ausdrücke dieser Gruppe', 'Autres expressions du groupe', 'इसी समूह के अन्य एक्सप्रेशन', '同一类的其他式子', '同一類的其他式子'),

  desc: T(
    (f: RegexFacts, what: string) => `${what}에 맞습니다. ${f.anchored ? '앞뒤가 묶여 있어 문자열 전체가 맞아야 합니다' : '글 안 어디에 있든 찾아냅니다'}. ${f.groups ? `잡는 묶음이 ${f.groups}개입니다.` : '잡는 묶음은 없습니다.'}`,
    (f: RegexFacts, what: string) => `Matches ${what}. ${f.anchored ? 'It is anchored at both ends, so the whole string has to match' : 'It finds the match anywhere inside the text'}. ${f.groups ? `There ${f.groups === 1 ? 'is 1 capture group' : `are ${f.groups} capture groups`}.` : 'There are no capture groups.'}`,
    (f: RegexFacts, what: string) => `Coincide con ${what}. ${f.anchored ? 'Está anclado en ambos extremos, así que debe coincidir la cadena entera' : 'Lo encuentra en cualquier parte del texto'}. ${f.groups ? `Tiene ${f.groups} grupo${f.groups === 1 ? '' : 's'} de captura.` : 'No tiene grupos de captura.'}`,
    (f: RegexFacts, what: string) => `Casa com ${what}. ${f.anchored ? 'Está ancorado nas duas pontas, então a cadeia inteira precisa casar' : 'Encontra em qualquer parte do texto'}. ${f.groups ? `Tem ${f.groups} grupo${f.groups === 1 ? '' : 's'} de captura.` : 'Não tem grupos de captura.'}`,
    (f: RegexFacts, what: string) => `${what}に一致します。${f.anchored ? '前後が固定されているので文字列全体が合う必要があります' : '文中のどこにあっても見つけます'}。${f.groups ? `取り出すグループは${f.groups}個です。` : '取り出すグループはありません。'}`,
    (f: RegexFacts, what: string) => `Passt auf ${what}. ${f.anchored ? 'Es ist an beiden Enden verankert, die ganze Zeichenkette muss also passen' : 'Es findet die Stelle irgendwo im Text'}. ${f.groups ? `Es gibt ${f.groups} Fanggruppe${f.groups === 1 ? '' : 'n'}.` : 'Es gibt keine Fanggruppen.'}`,
    (f: RegexFacts, what: string) => `Correspond à ${what}. ${f.anchored ? 'Il est ancré aux deux bouts : la chaîne entière doit correspondre' : 'Il trouve la correspondance n’importe où dans le texte'}. ${f.groups ? `Il y a ${f.groups} groupe${f.groups === 1 ? '' : 's'} capturant${f.groups === 1 ? '' : 's'}.` : 'Il n’y a pas de groupe capturant.'}`,
    (f: RegexFacts, what: string) => `${what} से मिलता है। ${f.anchored ? 'यह दोनों सिरों पर लंगर डाले है, इसलिए पूरी स्ट्रिंग मिलनी चाहिए' : 'यह पाठ में कहीं भी मिलान ढूँढ़ लेता है'}। ${f.groups ? `इसमें ${f.groups} कैप्चर समूह हैं।` : 'इसमें कोई कैप्चर समूह नहीं है।'}`,
    (f: RegexFacts, what: string) => `匹配${what}。${f.anchored ? '两端都锚住了，整个字符串合上才算通过' : '文中任何位置都能找出来'}。${f.groups ? `捕获组有 ${f.groups} 个。` : '没有捕获组。'}`,
    (f: RegexFacts, what: string) => `符合${what}。${f.anchored ? '兩端都錨住了，整個字串合上才算通過' : '文中任何位置都能找出來'}。${f.groups ? `擷取群組有 ${f.groups} 個。` : '沒有擷取群組。'}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这些式子', '怎麼看這些式子'),

  how: T(
    [
      '앞뒤에 ^와 $가 있으면 문자열 전체가 맞아야 합니다. 없으면 글 안 어디에서든 찾습니다 — 입력값 검사에는 반드시 붙이세요.',
      '괄호 ( )는 잡아 두는 묶음입니다. 잡을 필요가 없으면 (?: )로 적어야 뒤의 번호가 밀리지 않습니다.',
      '여기 실린 식은 모두 보기와 함께 검사를 거칩니다. 다만 "이메일 형식이 맞다"와 "실제로 받는 주소다"는 다른 이야기입니다.',
      '길이가 정해지지 않은 되풀이가 겹치면(예: (a+)+) 입력에 따라 시간이 폭발할 수 있습니다. 남의 식을 그대로 쓸 때는 이 모양을 먼저 살피세요.',
    ],
    [
      'With ^ and $ around it, the whole string must match; without them the match can sit anywhere. Always anchor an expression you use for validation.',
      'Round brackets ( ) capture what they wrap. When you only need grouping, write (?: ) so the numbering of later groups does not shift.',
      'Every expression here is checked against its examples. Even so, "looks like an email" and "is a real inbox" remain different questions.',
      'Nested open-ended repeats such as (a+)+ can blow up on certain inputs. Look for that shape before pasting someone else’s expression into your code.',
    ],
    [
      'Con ^ y $ alrededor, debe coincidir la cadena entera; sin ellos, la coincidencia puede estar en cualquier parte. Ancla siempre lo que uses para validar.',
      'Los paréntesis ( ) capturan lo que envuelven. Si solo necesitas agrupar, escribe (?: ) para que no se desplace la numeración.',
      'Cada expresión de aquí se comprueba con sus ejemplos. Aun así, "parece un correo" y "es un buzón real" son cosas distintas.',
      'Las repeticiones abiertas anidadas como (a+)+ pueden dispararse con ciertas entradas. Busca esa forma antes de pegar una expresión ajena.',
    ],
    [
      'Com ^ e $ em volta, a cadeia inteira precisa casar; sem eles, a correspondência pode estar em qualquer lugar. Ancore sempre o que usar para validar.',
      'Os parênteses ( ) capturam o que envolvem. Se você só precisa agrupar, escreva (?: ) para a numeração não se deslocar.',
      'Cada expressão aqui é conferida com seus exemplos. Ainda assim, "parece um e-mail" e "é uma caixa real" são coisas diferentes.',
      'Repetições abertas aninhadas como (a+)+ podem explodir com certas entradas. Procure esse formato antes de colar uma expressão alheia.',
    ],
    [
      '前後に ^ と $ があれば文字列全体が合う必要があります。なければ文中のどこでも構いません。入力検査に使う式には必ず付けてください。',
      'かっこ ( ) は中身を取り出します。まとめるだけでよいときは (?: ) と書けば、後ろのグループ番号がずれません。',
      'ここに載せた式はすべて例と突き合わせて検査しています。ただし「メールの形をしている」ことと「実在する宛先」であることは別の話です。',
      '終わりの決まっていない繰り返しが入れ子になると（(a+)+ など）、入力によって時間が爆発することがあります。他人の式を貼る前にこの形を探してください。',
    ],
    [
      'Mit ^ und $ muss die ganze Zeichenkette passen; ohne sie darf der Treffer irgendwo sitzen. Verankern Sie alles, was Sie zur Prüfung einsetzen.',
      'Runde Klammern ( ) fangen, was sie umschließen. Wer nur gruppieren will, schreibt (?: ) — sonst verschiebt sich die Nummerierung.',
      'Jeder Ausdruck hier wird gegen seine Beispiele geprüft. Trotzdem sind „sieht aus wie eine E-Mail“ und „ist ein echtes Postfach“ zweierlei.',
      'Verschachtelte offene Wiederholungen wie (a+)+ können bei manchen Eingaben explodieren. Achten Sie auf diese Form, bevor Sie fremde Ausdrücke übernehmen.',
    ],
    [
      'Avec ^ et $, la chaîne entière doit correspondre ; sans eux, le motif peut se trouver n’importe où. Ancrez toujours ce qui sert à valider.',
      'Les parenthèses ( ) capturent ce qu’elles entourent. Pour seulement grouper, écrivez (?: ) afin que la numérotation ne se décale pas.',
      'Chaque expression ici est confrontée à ses exemples. Cela dit, « ressemble à un e-mail » et « est une vraie boîte » sont deux choses.',
      'Les répétitions ouvertes imbriquées comme (a+)+ peuvent exploser sur certaines entrées. Repérez cette forme avant de coller l’expression d’autrui.',
    ],
    [
      '^ और $ लगे हों तो पूरी स्ट्रिंग मिलनी चाहिए; न हों तो मिलान कहीं भी हो सकता है। जाँच के लिए इस्तेमाल करते समय हमेशा लंगर लगाइए।',
      'गोल कोष्ठक ( ) अपने भीतर की चीज़ पकड़ लेते हैं। सिर्फ़ समूह चाहिए तो (?: ) लिखिए, वरना आगे की संख्या खिसक जाती है।',
      'यहाँ के हर एक्सप्रेशन को उसके उदाहरणों से जाँचा जाता है। फिर भी "ईमेल जैसा दिखता है" और "सचमुच का पता है" अलग बातें हैं।',
      '(a+)+ जैसी खुली-अंत दोहराव वाली नेस्टिंग कुछ इनपुट पर समय को फोड़ सकती है। किसी और का एक्सप्रेशन चिपकाने से पहले यह आकार देख लीजिए।',
    ],
    [
      '两端加上 ^ 和 $，整个字符串就必须合上；不加，匹配落在文中任何位置都行。用来做输入校验的式子，一定要加锚。',
      '圆括号 ( ) 会把括住的部分捕获下来。只是想分组的话写成 (?: )，后面各组的编号才不会往后挪。',
      '这里的每个式子都拿它自己的例子跑过。不过「长得像电子邮件」和「真有这个信箱」始终是两回事。',
      '开放式重复层层嵌套（比如 (a+)+）时，遇到某些输入耗时会爆炸式增长。把别人的式子粘进代码前，先找找有没有这种形状。',
    ],
    [
      '兩端加上 ^ 和 $，整個字串就必須合上；不加，比對落在文中任何位置都行。用來做輸入檢查的式子，一定要加錨。',
      '圓括號 ( ) 會把括住的部分擷取下來。只是想分組的話寫成 (?: )，後面各組的編號才不會往後挪。',
      '這裡的每個式子都拿它自己的例子跑過。不過「長得像電子郵件」和「真有這個信箱」始終是兩回事。',
      '開放式重複層層巢狀（比如 (a+)+）時，遇到某些輸入耗時會爆炸式增長。把別人的式子貼進程式前，先找找有沒有這種形狀。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '정규식 133가지 — 표기법부터 이메일·날짜 검사까지',
    'Regex cheat sheet — 133 tested patterns',
    'Chuleta de regex — 133 patrones probados',
    'Guia de regex — 133 padrões testados',
    '正規表現133種 — 表記法からメール・日付の検査まで',
    'Regex-Spickzettel — 133 geprüfte Muster',
    'Aide-mémoire regex — 133 motifs testés',
    'रेगेक्स संदर्भ — 133 परखे हुए पैटर्न',
    '正则表达式速查 — 133 个跑过测试的式子',
    '正規表示式速查 — 133 個跑過測試的式子',
  ),
  hubMetaDesc: T(
    '이메일·날짜·IP·색상 코드 검사부터 \\d \\w \\b 같은 표기법까지 133가지. 식마다 맞는 보기와 맞지 않는 보기를 함께 실었고, 검사가 133개를 모두 실제로 돌려 확인합니다.',
    'Email, date, IP and colour checks alongside notation such as \\d, \\w and \\b — 133 patterns in all. Each comes with matching and non-matching examples, and the test suite runs every one of them.',
    'Comprobaciones de correo, fecha, IP y color junto a notación como \\d, \\w y \\b: 133 patrones. Cada uno trae ejemplos que coinciden y que no, y las pruebas los ejecutan todos.',
    'Verificações de e-mail, data, IP e cor ao lado de notação como \\d, \\w e \\b: 133 padrões. Cada um traz exemplos que casam e que não casam, e os testes executam todos.',
    'メール・日付・IP・カラーコードの検査から \\d \\w \\b などの表記法まで133種。式ごとに合う例と合わない例を添え、検査がすべて実際に走らせます。',
    'Prüfungen für E-Mail, Datum, IP und Farbe neben Notation wie \\d, \\w und \\b — insgesamt 133 Muster. Jedes mit passenden und unpassenden Beispielen, und die Tests führen alle aus.',
    'Contrôles d’e-mail, de date, d’IP et de couleur, plus la notation \\d, \\w, \\b — 133 motifs. Chacun avec des exemples qui correspondent et d’autres non, tous exécutés par les tests.',
    'ईमेल, तारीख़, IP और रंग की जाँच के साथ \\d, \\w, \\b जैसे संकेतन — कुल 133 पैटर्न। हर एक के साथ मिलने और न मिलने वाले उदाहरण, और जाँच सबको चलाती है।',
    '从电子邮件、日期、IP、颜色代码的校验，到 \\d \\w \\b 这类写法，共 133 个。每个都配了该匹配和不该匹配的例子，测试会把 133 个全部真跑一遍。',
    '從電子郵件、日期、IP、色碼的檢查，到 \\d \\w \\b 這類寫法，共 133 個。每個都配了該符合和不該符合的例子，測試會把 133 個全部真跑一遍。',
  ),

  metaTitle: T(
    (what: string) => `${what}에 맞는 정규식`,
    (what: string) => `Regex for ${what}`,
    (what: string) => `Regex para ${what}`,
    (what: string) => `Regex para ${what}`,
    (what: string) => `${what}に一致する正規表現`,
    (what: string) => `Regex für ${what}`,
    (what: string) => `Regex pour ${what}`,
    (what: string) => `${what} के लिए रेगेक्स`,
    (what: string) => `匹配${what}的正则表达式`,
    (what: string) => `符合${what}的正規表示式`,
  ),

  metaDesc: T(
    (f: RegexFacts, what: string) => `${what}에 맞는 정규식은 ${f.re} 입니다. 맞는 보기와 맞지 않는 보기를 함께 실었고, 브라우저에서 바로 넣어 볼 수 있습니다.`,
    (f: RegexFacts, what: string) => `The regular expression for ${what} is ${f.re}. Matching and non-matching examples are included, and you can try it on your own text right here.`,
    (f: RegexFacts, what: string) => `La expresión regular para ${what} es ${f.re}. Incluye ejemplos que coinciden y que no, y puedes probarla con tu propio texto.`,
    (f: RegexFacts, what: string) => `A expressão regular para ${what} é ${f.re}. Inclui exemplos que casam e que não casam, e você pode testá-la com o seu texto.`,
    (f: RegexFacts, what: string) => `${what}に一致する正規表現は ${f.re} です。合う例と合わない例を添え、その場で自分の文を試せます。`,
    (f: RegexFacts, what: string) => `Der reguläre Ausdruck für ${what} lautet ${f.re}. Passende und unpassende Beispiele sind dabei, und Sie können ihn hier mit eigenem Text ausprobieren.`,
    (f: RegexFacts, what: string) => `L’expression régulière pour ${what} est ${f.re}. Des exemples correspondants et non correspondants sont fournis, et vous pouvez l’essayer sur votre texte.`,
    (f: RegexFacts, what: string) => `${what} के लिए रेगुलर एक्सप्रेशन ${f.re} है। मिलने और न मिलने वाले उदाहरण साथ हैं, और आप इसे अपने पाठ पर आज़मा सकते हैं।`,
    (f: RegexFacts, what: string) => `匹配${what}的正则表达式是 ${f.re}。页面上配了该匹配和不该匹配的例子，你也可以当场用自己的文字试。`,
    (f: RegexFacts, what: string) => `符合${what}的正規表示式是 ${f.re}。頁面上配了該符合和不該符合的例子，你也可以當場用自己的文字試。`,
  ),

  hubFaq: T(
    [
      { q: '정규식이 무엇인가요?', a: '글에서 찾을 모양을 적는 작은 언어입니다. "숫자 네 개" 대신 \\d{4}라고 적으면, 프로그램이 그 모양에 맞는 부분을 찾아 줍니다. 자바스크립트·파이썬·자바 등 대부분의 언어가 거의 같은 표기를 씁니다.' },
      { q: '이메일 검사는 왜 저렇게 짧은가요?', a: '규격을 전부 반영한 이메일 식은 수천 자에 이르고, 그래도 실제로 받는 주소인지는 알 수 없습니다. 오타를 걸러 내는 정도가 정규식이 할 수 있는 일이고, 진짜 확인은 확인 메일을 보내는 것뿐입니다.' },
      { q: '식이 왜 언어마다 조금씩 다른가요?', a: '뼈대는 같지만 세부가 다릅니다. 자바스크립트에는 \\A가 없고, 파이썬은 re.MULTILINE을 따로 켭니다. 여기 실린 식은 자바스크립트에서 그대로 돌아가는 형태로 적었습니다.' },
      { q: '느려질 수 있다는 말은 무슨 뜻인가요?', a: '(a+)+처럼 끝이 열린 되풀이가 겹치면, 맞지 않는 입력에서 되짚어 보는 경우의 수가 폭발합니다. 짧은 문자열에도 몇 초씩 걸릴 수 있어 서버에서는 위험합니다.' },
      { q: '여기 실린 식은 믿어도 되나요?', a: '식마다 맞아야 하는 보기와 맞으면 안 되는 보기를 함께 두고, 검사가 133개를 모두 실제로 돌려 봅니다. 화면에 보이는 보기가 곧 검사에 쓰이는 보기이므로, 설명과 식이 어긋난 채로 남을 수 없습니다.' },
    ],
    [
      { q: 'What is a regular expression?', a: 'A small language for describing a shape to look for in text. Writing \\d{4} instead of "four digits" lets a program find every place that shape occurs. JavaScript, Python, Java and most other languages share nearly the same notation.' },
      { q: 'Why is the email check so short?', a: 'A pattern covering the full specification runs to thousands of characters and still cannot tell you whether the mailbox exists. Catching typos is what a regular expression can do; the only real check is sending a confirmation message.' },
      { q: 'Why do patterns differ between languages?', a: 'The core is shared but the details are not. JavaScript has no \\A, and Python needs re.MULTILINE switched on separately. Everything here is written to run as-is in JavaScript.' },
      { q: 'What does it mean that a pattern can be slow?', a: 'When open-ended repeats nest, as in (a+)+, the number of ways to backtrack explodes on input that does not match. A short string can then take seconds, which is dangerous on a server.' },
      { q: 'Can I trust the patterns here?', a: 'Each one is stored with examples that must match and examples that must not, and the test suite runs all 133 for real. The examples you see on the page are the same ones the tests use, so a description cannot drift away from its pattern.' },
    ],
    [
      { q: '¿Qué es una expresión regular?', a: 'Un pequeño lenguaje para describir la forma que buscas en un texto. Escribir \\d{4} en vez de "cuatro dígitos" permite que el programa encuentre cada sitio con esa forma. JavaScript, Python, Java y casi todos usan la misma notación.' },
      { q: '¿Por qué la comprobación de correo es tan corta?', a: 'Un patrón que cubra toda la especificación ocupa miles de caracteres y aun así no dice si el buzón existe. Detectar erratas es lo que puede hacer una expresión regular; la única comprobación real es enviar un mensaje de confirmación.' },
      { q: '¿Por qué cambian los patrones según el lenguaje?', a: 'El núcleo es común, los detalles no. JavaScript no tiene \\A y Python necesita activar re.MULTILINE. Todo lo de aquí está escrito para funcionar tal cual en JavaScript.' },
      { q: '¿Qué significa que un patrón pueda ser lento?', a: 'Cuando se anidan repeticiones abiertas, como (a+)+, el número de vueltas atrás se dispara con entradas que no coinciden. Una cadena corta puede tardar segundos, lo que es peligroso en un servidor.' },
      { q: '¿Puedo fiarme de estos patrones?', a: 'Cada uno se guarda con ejemplos que deben coincidir y otros que no, y las pruebas ejecutan los 133 de verdad. Los ejemplos que ves son los mismos que usan las pruebas, así que la descripción no puede separarse del patrón.' },
    ],
    [
      { q: 'O que é uma expressão regular?', a: 'Uma pequena linguagem para descrever a forma que você procura num texto. Escrever \\d{4} em vez de "quatro dígitos" faz o programa achar cada lugar com essa forma. JavaScript, Python, Java e quase todas usam a mesma notação.' },
      { q: 'Por que a verificação de e-mail é tão curta?', a: 'Um padrão que cubra toda a especificação tem milhares de caracteres e mesmo assim não diz se a caixa existe. Pegar erros de digitação é o que a expressão regular consegue; a checagem real é enviar uma mensagem de confirmação.' },
      { q: 'Por que os padrões mudam entre linguagens?', a: 'O núcleo é o mesmo, os detalhes não. JavaScript não tem \\A, e Python precisa ligar re.MULTILINE à parte. Tudo aqui foi escrito para rodar como está em JavaScript.' },
      { q: 'O que significa um padrão poder ser lento?', a: 'Quando repetições abertas se aninham, como (a+)+, o número de retrocessos explode com entradas que não casam. Uma cadeia curta pode levar segundos, o que é perigoso num servidor.' },
      { q: 'Posso confiar nestes padrões?', a: 'Cada um é guardado com exemplos que devem casar e outros que não, e os testes rodam os 133 de verdade. Os exemplos que você vê são os mesmos dos testes, então a descrição não pode se afastar do padrão.' },
    ],
    [
      { q: '正規表現とは何ですか。', a: '文の中から探したい「形」を書き表す小さな言語です。「数字4つ」の代わりに \\d{4} と書けば、プログラムがその形の箇所を見つけてくれます。JavaScript・Python・Java などほとんどの言語がほぼ同じ表記を使います。' },
      { q: 'メールの検査式はなぜこんなに短いのですか。', a: '規格を全部反映した式は数千文字になり、それでも実在する宛先かはわかりません。打ち間違いを弾くのが正規表現にできることで、本当の確認は確認メールを送ることだけです。' },
      { q: 'なぜ言語ごとに式が少し違うのですか。', a: '骨格は同じでも細部が違います。JavaScript には \\A がなく、Python は re.MULTILINE を別に立てます。ここに載せた式は JavaScript でそのまま動く形で書いています。' },
      { q: '式が遅くなることがあるとはどういう意味ですか。', a: '(a+)+ のように終わりの決まらない繰り返しが入れ子になると、合わない入力で戻って試す組み合わせが爆発します。短い文字列でも数秒かかることがあり、サーバーでは危険です。' },
      { q: 'ここに載せた式は信じてよいですか。', a: '式ごとに「合うべき例」と「合ってはいけない例」を持たせ、検査が133個すべてを実際に走らせています。画面に見える例がそのまま検査に使う例なので、説明と式が食い違ったまま残ることはありません。' },
    ],
    [
      { q: 'Was ist ein regulärer Ausdruck?', a: 'Eine kleine Sprache, um eine gesuchte Form in Text zu beschreiben. Statt „vier Ziffern“ schreibt man \\d{4}, und das Programm findet jede Stelle dieser Form. JavaScript, Python, Java und die meisten anderen nutzen fast dieselbe Notation.' },
      { q: 'Warum ist die E-Mail-Prüfung so kurz?', a: 'Ein Muster nach vollem Standard umfasst Tausende Zeichen und sagt trotzdem nicht, ob das Postfach existiert. Tippfehler abfangen kann ein regulärer Ausdruck; die einzige echte Prüfung ist eine Bestätigungsmail.' },
      { q: 'Warum unterscheiden sich Muster je nach Sprache?', a: 'Der Kern ist gleich, die Details nicht. JavaScript kennt kein \\A, Python braucht re.MULTILINE separat. Alles hier ist so geschrieben, dass es in JavaScript unverändert läuft.' },
      { q: 'Was heißt, ein Muster könne langsam sein?', a: 'Verschachteln sich offene Wiederholungen wie in (a+)+, explodiert bei nicht passender Eingabe die Zahl der Rücksprünge. Dann dauert schon eine kurze Zeichenkette Sekunden — auf einem Server gefährlich.' },
      { q: 'Kann ich diesen Mustern trauen?', a: 'Zu jedem gehören Beispiele, die passen müssen, und solche, die nicht passen dürfen; die Tests führen alle 133 wirklich aus. Die Beispiele auf der Seite sind dieselben wie im Test — Beschreibung und Muster können nicht auseinanderlaufen.' },
    ],
    [
      { q: 'Qu’est-ce qu’une expression régulière ?', a: 'Un petit langage pour décrire la forme recherchée dans un texte. Écrire \\d{4} plutôt que « quatre chiffres » permet au programme de trouver chaque endroit correspondant. JavaScript, Python, Java et la plupart des langages partagent presque la même notation.' },
      { q: 'Pourquoi le contrôle d’e-mail est-il si court ?', a: 'Un motif couvrant toute la spécification fait des milliers de caractères et ne dit toujours pas si la boîte existe. Attraper les fautes de frappe, voilà ce que peut une expression régulière ; la seule vraie vérification est un message de confirmation.' },
      { q: 'Pourquoi les motifs changent-ils selon le langage ?', a: 'Le noyau est commun, les détails non. JavaScript n’a pas \\A, et Python demande d’activer re.MULTILINE. Tout ici est écrit pour fonctionner tel quel en JavaScript.' },
      { q: 'Que veut dire qu’un motif peut être lent ?', a: 'Quand des répétitions ouvertes s’imbriquent, comme (a+)+, le nombre de retours en arrière explose sur une entrée qui ne correspond pas. Une chaîne courte peut alors prendre des secondes, ce qui est dangereux sur un serveur.' },
      { q: 'Puis-je faire confiance à ces motifs ?', a: 'Chacun est stocké avec des exemples qui doivent correspondre et d’autres non, et les tests exécutent réellement les 133. Les exemples affichés sont ceux des tests : la description ne peut pas s’éloigner du motif.' },
    ],
    [
      { q: 'रेगुलर एक्सप्रेशन क्या है?', a: 'पाठ में जो आकृति खोजनी है उसे लिखने की एक छोटी भाषा। "चार अंक" के बजाय \\d{4} लिखिए और प्रोग्राम हर वैसी जगह ढूँढ़ देगा। JavaScript, Python, Java समेत ज़्यादातर भाषाएँ लगभग यही संकेतन इस्तेमाल करती हैं।' },
      { q: 'ईमेल की जाँच इतनी छोटी क्यों है?', a: 'पूरे मानक को समेटने वाला पैटर्न हज़ारों वर्ण लंबा होता है और फिर भी नहीं बताता कि पता सचमुच है या नहीं। टाइपिंग की ग़लती पकड़ना ही रेगेक्स कर सकता है; असली जाँच पुष्टि-मेल भेजना है।' },
      { q: 'भाषा-भाषा में पैटर्न अलग क्यों होते हैं?', a: 'आधार एक है, ब्योरे अलग। JavaScript में \\A नहीं है और Python में re.MULTILINE अलग से चालू करना पड़ता है। यहाँ के सभी पैटर्न JavaScript में जस के तस चलने के लिए लिखे गए हैं।' },
      { q: 'पैटर्न धीमा हो सकता है, इसका क्या मतलब?', a: '(a+)+ जैसी खुली-अंत दोहराव नेस्ट हो जाए तो न मिलने वाले इनपुट पर पीछे लौटने के रास्ते फट पड़ते हैं। तब छोटी स्ट्रिंग भी कई सेकंड ले सकती है, जो सर्वर पर ख़तरनाक है।' },
      { q: 'क्या इन पैटर्नों पर भरोसा किया जा सकता है?', a: 'हर पैटर्न के साथ मिलने वाले और न मिलने वाले उदाहरण दर्ज हैं, और जाँच सभी 133 को सचमुच चलाती है। पन्ने पर दिखने वाले उदाहरण वही हैं जो जाँच इस्तेमाल करती है, इसलिए विवरण और पैटर्न अलग नहीं हो सकते।' },
    ],
    [
      { q: '什么是正则表达式？', a: '它是一门小语言，用来描述你想在文字里找的「形状」。写 \\d{4} 而不是「四位数字」，程序就能找出每一处符合这个形状的地方。JavaScript、Python、Java 等大多数语言用的写法几乎相同。' },
      { q: '电子邮件的校验式为什么这么短？', a: '完全照标准写的邮件式子长达数千字符，而且照样说不出这个信箱是否真的存在。挡住手滑打错，才是正则表达式能做的事；真正的确认只有发一封验证邮件。' },
      { q: '为什么同一个式子在各语言里略有不同？', a: '骨架一样，细节不同。JavaScript 没有 \\A，Python 要单独打开 re.MULTILINE。这里列出的式子都是按在 JavaScript 里原样能跑的形式写的。' },
      { q: '说式子可能很慢，是什么意思？', a: '像 (a+)+ 这样开放式重复嵌在一起时，遇到匹配不上的输入，回溯的路数会爆炸。这时哪怕很短的字符串也可能耗上好几秒，放在服务器上很危险。' },
      { q: '这里的式子可信吗？', a: '每个式子都带着「必须匹配」和「必须不匹配」两组例子，测试会把 133 个全部真跑一遍。页面上看到的例子就是测试用的例子，所以说明和式子不可能各走各的。' },
    ],
    [
      { q: '什麼是正規表示式？', a: '它是一門小語言，用來描述你想在文字裡找的「形狀」。寫 \\d{4} 而不是「四位數字」，程式就能找出每一處符合這個形狀的地方。JavaScript、Python、Java 等大多數語言用的寫法幾乎相同。' },
      { q: '電子郵件的檢查式為什麼這麼短？', a: '完全照標準寫的郵件式子長達數千字元，而且照樣說不出這個信箱是否真的存在。擋住手滑打錯，才是正規表示式能做的事；真正的確認只有寄一封驗證信。' },
      { q: '為什麼同一個式子在各語言裡略有不同？', a: '骨架一樣，細節不同。JavaScript 沒有 \\A，Python 要單獨打開 re.MULTILINE。這裡列出的式子都是按在 JavaScript 裡原樣能跑的形式寫的。' },
      { q: '說式子可能很慢，是什麼意思？', a: '像 (a+)+ 這樣開放式重複巢在一起時，遇到比對不上的輸入，回溯的路數會爆炸。這時哪怕很短的字串也可能耗上好幾秒，放在伺服器上很危險。' },
      { q: '這裡的式子可信嗎？', a: '每個式子都帶著「必須符合」和「必須不符合」兩組例子，測試會把 133 個全部真跑一遍。頁面上看到的例子就是測試用的例子，所以說明和式子不可能各走各的。' },
    ],
  ),

  patternFaq: T(
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `${what}에 맞는 정규식은?`, a: `${f.re} 입니다.${f.flags ? ` 플래그는 ${f.flags} 를 씁니다.` : ''}` },
      { q: '어떤 글이 맞나요?', a: `${okOne} 같은 글이 맞고, ${noOne} 같은 글은 맞지 않습니다.` },
      { q: '문자열 전체가 맞아야 하나요?', a: f.anchored ? '네. 앞뒤가 ^와 $로 묶여 있어 문자열 전체가 맞아야 통과합니다.' : '아닙니다. 글 안 어디에 있든 그 부분만 찾아냅니다. 전체 검사에 쓰려면 앞뒤에 ^와 $를 붙이세요.' },
      { q: '잡아 온 값을 어떻게 쓰나요?', a: f.groups ? `잡는 묶음이 ${f.groups}개라, match[1]부터 차례로 꺼내 쓸 수 있습니다.` : '잡는 묶음이 없어 맞은 부분 전체(match[0])만 나옵니다. 일부만 필요하면 그 자리를 괄호로 묶으세요.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `What is the regex for ${what}?`, a: `${f.re}${f.flags ? `, with the ${f.flags} flag${f.flags.length > 1 ? 's' : ''}` : ''}.` },
      { q: 'Which strings match?', a: `Text like ${okOne} matches; text like ${noOne} does not.` },
      { q: 'Does the whole string have to match?', a: f.anchored ? 'Yes. It is wrapped in ^ and $, so nothing but a full match passes.' : 'No. It finds the part anywhere inside the text. Add ^ and $ around it if you want a whole-string check.' },
      { q: 'How do I use what it caught?', a: f.groups ? `There ${f.groups === 1 ? 'is one capture group' : `are ${f.groups} capture groups`}, so you can read them from match[1] onwards.` : 'There are no capture groups, so only the whole match (match[0]) comes back. Wrap the part you need in brackets to capture it.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `¿Cuál es la regex para ${what}?`, a: `${f.re}${f.flags ? `, con la bandera ${f.flags}` : ''}.` },
      { q: '¿Qué cadenas coinciden?', a: `Un texto como ${okOne} coincide; uno como ${noOne} no.` },
      { q: '¿Debe coincidir la cadena entera?', a: f.anchored ? 'Sí. Va entre ^ y $, así que solo pasa una coincidencia completa.' : 'No. Encuentra la parte en cualquier lugar del texto. Añade ^ y $ si quieres comprobar la cadena entera.' },
      { q: '¿Cómo uso lo capturado?', a: f.groups ? `Hay ${f.groups} grupo${f.groups === 1 ? '' : 's'} de captura, así que puedes leerlos desde match[1].` : 'No hay grupos de captura, así que solo vuelve la coincidencia completa (match[0]). Envuelve entre paréntesis la parte que necesites.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `Qual é a regex para ${what}?`, a: `${f.re}${f.flags ? `, com a flag ${f.flags}` : ''}.` },
      { q: 'Quais cadeias casam?', a: `Um texto como ${okOne} casa; um como ${noOne} não.` },
      { q: 'A cadeia inteira precisa casar?', a: f.anchored ? 'Sim. Está entre ^ e $, então só passa uma correspondência completa.' : 'Não. Encontra a parte em qualquer lugar do texto. Coloque ^ e $ em volta para verificar a cadeia inteira.' },
      { q: 'Como uso o que foi capturado?', a: f.groups ? `Há ${f.groups} grupo${f.groups === 1 ? '' : 's'} de captura, então dá para ler a partir de match[1].` : 'Não há grupos de captura, então volta só a correspondência inteira (match[0]). Coloque entre parênteses a parte que precisar.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `${what}に一致する正規表現は。`, a: `${f.re} です。${f.flags ? `フラグは ${f.flags} を使います。` : ''}` },
      { q: 'どんな文字列が合いますか。', a: `${okOne} のような文字列は合い、${noOne} のような文字列は合いません。` },
      { q: '文字列全体が合う必要がありますか。', a: f.anchored ? 'はい。^ と $ で囲まれているので、全体が合わないと通りません。' : 'いいえ。文中のどこにあってもその部分だけを見つけます。全体を検査したいときは前後に ^ と $ を付けてください。' },
      { q: '取り出した値はどう使いますか。', a: f.groups ? `取り出すグループが${f.groups}個あるので、match[1] から順に読めます。` : '取り出すグループがないので、一致した全体（match[0]）だけが返ります。一部だけ必要ならその箇所をかっこで囲んでください。' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `Wie lautet der Regex für ${what}?`, a: `${f.re}${f.flags ? ` mit dem Flag ${f.flags}` : ''}.` },
      { q: 'Welche Zeichenketten passen?', a: `Text wie ${okOne} passt, Text wie ${noOne} nicht.` },
      { q: 'Muss die ganze Zeichenkette passen?', a: f.anchored ? 'Ja. Er steht zwischen ^ und $, es passt also nur ein vollständiger Treffer.' : 'Nein. Er findet die Stelle irgendwo im Text. Für eine Ganzprüfung ^ und $ darum setzen.' },
      { q: 'Wie nutze ich das Gefangene?', a: f.groups ? `Es gibt ${f.groups} Fanggruppe${f.groups === 1 ? '' : 'n'}, lesbar ab match[1].` : 'Es gibt keine Fanggruppen, zurück kommt nur der ganze Treffer (match[0]). Setzen Sie den gewünschten Teil in Klammern.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `Quelle est la regex pour ${what} ?`, a: `${f.re}${f.flags ? `, avec l’option ${f.flags}` : ''}.` },
      { q: 'Quelles chaînes correspondent ?', a: `Un texte comme ${okOne} correspond ; un texte comme ${noOne} non.` },
      { q: 'La chaîne entière doit-elle correspondre ?', a: f.anchored ? 'Oui. Elle est encadrée par ^ et $ : seule une correspondance complète passe.' : 'Non. Elle trouve la partie n’importe où dans le texte. Ajoutez ^ et $ pour un contrôle sur la chaîne entière.' },
      { q: 'Comment utiliser ce qui est capturé ?', a: f.groups ? `Il y a ${f.groups} groupe${f.groups === 1 ? '' : 's'} capturant${f.groups === 1 ? '' : 's'} : lisez-les à partir de match[1].` : 'Il n’y a pas de groupe capturant : seule la correspondance entière (match[0]) revient. Mettez entre parenthèses la partie voulue.' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `${what} के लिए रेगेक्स क्या है?`, a: `${f.re}${f.flags ? `, फ़्लैग ${f.flags} के साथ` : ''}।` },
      { q: 'कौन-सी स्ट्रिंग मिलती हैं?', a: `${okOne} जैसा पाठ मिलता है; ${noOne} जैसा नहीं।` },
      { q: 'क्या पूरी स्ट्रिंग मिलनी चाहिए?', a: f.anchored ? 'हाँ। यह ^ और $ के बीच है, इसलिए पूरा मिलान ही पास होता है।' : 'नहीं। यह पाठ में कहीं भी वह हिस्सा ढूँढ़ लेता है। पूरी स्ट्रिंग जाँचनी हो तो आगे-पीछे ^ और $ लगाइए।' },
      { q: 'पकड़े गए हिस्से का उपयोग कैसे करें?', a: f.groups ? `${f.groups} कैप्चर समूह हैं, इसलिए match[1] से आगे पढ़ सकते हैं।` : 'कोई कैप्चर समूह नहीं है, इसलिए सिर्फ़ पूरा मिलान (match[0]) मिलता है। जो हिस्सा चाहिए उसे कोष्ठक में लपेटिए।' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `匹配${what}的正则表达式是什么？`, a: `${f.re}${f.flags ? `，标志用 ${f.flags}` : ''}。` },
      { q: '哪些字符串能匹配？', a: `像 ${okOne} 这样的文字能匹配，像 ${noOne} 这样的不能。` },
      { q: '必须整个字符串都匹配吗？', a: f.anchored ? '是的。它被 ^ 和 $ 括住，只有整串合上才算通过。' : '不必。文中任何位置只要有那一段就能找出来。想校验整串，就在两端加上 ^ 和 $。' },
      { q: '抓到的内容怎么用？', a: f.groups ? `有 ${f.groups} 个捕获组，可以从 match[1] 开始依次取出。` : '没有捕获组，所以只会返回整段匹配（match[0]）。只需要其中一部分的话，把那一段用圆括号括起来。' },
    ],
    (f: RegexFacts, what: string, okOne: string, noOne: string) => [
      { q: `符合${what}的正規表示式是什麼？`, a: `${f.re}${f.flags ? `，旗標用 ${f.flags}` : ''}。` },
      { q: '哪些字串能符合？', a: `像 ${okOne} 這樣的文字能符合，像 ${noOne} 這樣的不能。` },
      { q: '必須整個字串都符合嗎？', a: f.anchored ? '是的。它被 ^ 和 $ 括住，只有整串合上才算通過。' : '不必。文中任何位置只要有那一段就能找出來。想檢查整串，就在兩端加上 ^ 和 $。' },
      { q: '抓到的內容怎麼用？', a: f.groups ? `有 ${f.groups} 個擷取群組，可以從 match[1] 開始依序取出。` : '沒有擷取群組，所以只會回傳整段比對結果（match[0]）。只需要其中一部分的話，把那一段用圓括號括起來。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const REGEX_UI: L<RegexUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<RegexUI>;
