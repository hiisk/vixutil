/**
 * ASCII 화면의 문구 — 열 언어.
 *
 * 제어문자의 약칭(ESC)과 이름(Escape)은 옮기지 않는다. 대신 "그게 무엇을 하는
 * 글자인가"를 갈래로 묶어 갈래 설명만 열 언어로 둔다 — 33자를 하나하나 옮기면
 * 330줄이고, 그중 한 줄이 틀려도 아무도 못 찾는다.
 *
 * 항목 설명은 계산한 값에서 만든다. 대소문자가 32 차이라는 것도, Ctrl+I가
 * 탭이라는 것도 facts.ts가 이미 알고 있으므로 문장은 그것을 받아 쓴다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { AsciiFacts, Kind } from './facts.ts';
import type { Control } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface AsciiUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  tableTitle: string;
  tableNote: string;
  kindLabel: Record<Kind, string>;
  kindNote: Record<Kind, string>;
  groupTitle: string;
  groupLabel: Record<Control, string>;
  groupNote: Record<Control, string>;
  decLabel: string;
  hexLabel: string;
  octLabel: string;
  binLabel: string;
  entityLabel: string;
  namedEntityLabel: string;
  urlLabel: string;
  cssLabel: string;
  escapeLabel: string;
  escapeNote: string;
  ctrlLabel: string;
  ctrlOfLabel: string;
  pairLabel: string;
  digitValueLabel: string;
  kindRowLabel: string;
  noneLabel: string;
  bitsTitle: string;
  bitsNote: string;
  caseBitNote: string;
  neighbourTitle: string;
  controlTitle: string;
  /** 제어문자는 화면에 글자를 못 보여 준다 — 그 자리에 적는 말 */
  invisible: string;
  desc: (f: AsciiFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: AsciiFacts) => string;
  metaDesc: (f: AsciiFacts) => string;
  hubFaq: FaqItem[];
  charFaq: (f: AsciiFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof AsciiUI]: L<AsciiUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('아스키 코드', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII 码', 'ASCII 碼'),

  hubTitle: T(
    'ASCII 코드표 128자',
    'The 128 ASCII codes',
    'Los 128 códigos ASCII',
    'Os 128 códigos ASCII',
    'ASCIIコード表 128字',
    'Die 128 ASCII-Codes',
    'Les 128 codes ASCII',
    '128 ASCII कोड',
    'ASCII 码表 128 个字符',
    'ASCII 碼表 128 個字元',
  ),

  hubLead: T(
    '십진수·16진수·2진수부터 HTML 엔티티와 Ctrl 조합까지, 번호 하나에서 계산했습니다. 대문자와 소문자가 왜 32 차이인지도 표에서 보입니다.',
    'Decimal, hex and binary through to HTML entities and Ctrl keys — all worked out from the code. The table also shows why upper and lower case sit exactly 32 apart.',
    'De decimal, hex y binario a entidades HTML y combinaciones con Ctrl, todo calculado desde el código. La tabla enseña por qué mayúsculas y minúsculas distan justo 32.',
    'De decimal, hex e binário a entidades HTML e combinações com Ctrl, tudo calculado a partir do código. A tabela mostra por que maiúsculas e minúsculas ficam a exatos 32 de distância.',
    '10進数・16進数・2進数からHTMLエンティティやCtrl組み合わせまで、番号ひとつから計算しています。大文字と小文字がちょうど32違う理由も表で見えます。',
    'Dezimal, hex und binär bis hin zu HTML-Entities und Ctrl-Tasten — alles aus dem Code berechnet. Die Tabelle zeigt auch, warum Groß- und Kleinbuchstaben genau 32 auseinanderliegen.',
    'Du décimal, de l’hexadécimal et du binaire jusqu’aux entités HTML et aux touches Ctrl : tout est calculé à partir du code. Le tableau montre aussi pourquoi majuscules et minuscules sont à 32 d’écart.',
    'दशमलव, हेक्स और द्विआधारी से लेकर HTML एंटिटी और Ctrl संयोजन तक — सब कोड से निकाला गया। तालिका यह भी दिखाती है कि बड़े और छोटे अक्षर ठीक 32 दूर क्यों हैं।',
    '从十进制、十六进制、二进制，到 HTML 实体和 Ctrl 组合，全部由编号算出。表里还能看出大小写为什么正好差 32。',
    '從十進位、十六進位、二進位，到 HTML 實體和 Ctrl 組合，全部由編號算出。表裡還能看出大小寫為什麼正好差 32。',
  ),

  tableTitle: T('코드표', 'The chart', 'La tabla', 'A tabela', 'コード表', 'Die Tabelle', 'Le tableau', 'कोड तालिका', '码表', '碼表'),

  tableNote: T(
    '가로 여덟 칸이 위 세 비트, 세로 열여섯 줄이 아래 네 비트입니다. 대문자 열 바로 옆이 소문자 열인 것이 이 표의 생김새입니다.',
    'Eight columns for the top three bits, sixteen rows for the bottom four. The capitals column sits right beside the lowercase one — that is the shape of the table.',
    'Ocho columnas para los tres bits altos y dieciséis filas para los cuatro bajos. La columna de mayúsculas queda justo al lado de la de minúsculas: esa es la forma de la tabla.',
    'Oito colunas para os três bits de cima e dezesseis linhas para os quatro de baixo. A coluna das maiúsculas fica bem ao lado da das minúsculas — é essa a forma da tabela.',
    '横8列が上位3ビット、縦16行が下位4ビットです。大文字の列のすぐ隣が小文字の列——それがこの表の形です。',
    'Acht Spalten für die oberen drei Bits, sechzehn Zeilen für die unteren vier. Die Spalte der Großbuchstaben steht direkt neben der der Kleinbuchstaben — das ist die Form dieser Tabelle.',
    'Huit colonnes pour les trois bits de poids fort, seize lignes pour les quatre de poids faible. La colonne des majuscules jouxte celle des minuscules : voilà la forme du tableau.',
    'आठ स्तंभ ऊपरी तीन बिट के, सोलह पंक्तियाँ निचले चार बिट की। बड़े अक्षरों का स्तंभ ठीक छोटे अक्षरों के बगल में है — यही इस तालिका का आकार है।',
    '横向八列是高三位，纵向十六行是低四位。大写那一列紧挨着小写那一列——这就是这张表的样子。',
    '橫向八欄是高三位，縱向十六列是低四位。大寫那一欄緊挨著小寫那一欄——這就是這張表的樣子。',
  ),

  kindLabel: T(
    { control: '제어문자', space: '공백', digit: '숫자', upper: '대문자', lower: '소문자', punct: '기호' },
    { control: 'Control', space: 'Space', digit: 'Digits', upper: 'Uppercase', lower: 'Lowercase', punct: 'Punctuation' },
    { control: 'Control', space: 'Espacio', digit: 'Dígitos', upper: 'Mayúsculas', lower: 'Minúsculas', punct: 'Signos' },
    { control: 'Controle', space: 'Espaço', digit: 'Dígitos', upper: 'Maiúsculas', lower: 'Minúsculas', punct: 'Sinais' },
    { control: '制御文字', space: '空白', digit: '数字', upper: '大文字', lower: '小文字', punct: '記号' },
    { control: 'Steuerzeichen', space: 'Leerzeichen', digit: 'Ziffern', upper: 'Großbuchstaben', lower: 'Kleinbuchstaben', punct: 'Satzzeichen' },
    { control: 'Contrôle', space: 'Espace', digit: 'Chiffres', upper: 'Majuscules', lower: 'Minuscules', punct: 'Ponctuation' },
    { control: 'नियंत्रण', space: 'स्पेस', digit: 'अंक', upper: 'बड़े अक्षर', lower: 'छोटे अक्षर', punct: 'चिह्न' },
    { control: '控制字符', space: '空格', digit: '数字', upper: '大写字母', lower: '小写字母', punct: '标点符号' },
    { control: '控制字元', space: '空格', digit: '數字', upper: '大寫字母', lower: '小寫字母', punct: '標點符號' },
  ),

  kindNote: T(
    {
      control: '화면에 그려지지 않고 장치에 무엇을 하라고 시키는 글자입니다.',
      space: '아무것도 그리지 않지만 자리는 차지하는 글자입니다.',
      digit: '0의 코드가 48이라, 아래 네 비트가 곧 그 숫자입니다.',
      upper: 'A가 65부터 시작해 스물여섯 자가 이어집니다.',
      lower: 'a가 97부터 시작합니다 — 대문자에 32를 더한 자리입니다.',
      punct: '숫자와 글자 사이사이에 흩어져 있는 기호들입니다.',
    },
    {
      control: 'Characters that draw nothing and instead tell the device to do something.',
      space: 'It draws nothing, yet it takes up a column.',
      digit: 'Zero sits at 48, so the bottom four bits are the digit itself.',
      upper: 'A starts at 65 and twenty-six letters follow.',
      lower: 'a starts at 97 — the capital plus 32.',
      punct: 'The marks scattered between the digits and the letters.',
    },
    {
      control: 'Caracteres que no dibujan nada y ordenan algo al dispositivo.',
      space: 'No dibuja nada, pero ocupa una columna.',
      digit: 'El cero está en 48, así que los cuatro bits bajos son el propio dígito.',
      upper: 'La A empieza en 65 y le siguen veintiséis letras.',
      lower: 'La a empieza en 97: la mayúscula más 32.',
      punct: 'Los signos repartidos entre los dígitos y las letras.',
    },
    {
      control: 'Caracteres que não desenham nada e mandam o aparelho fazer algo.',
      space: 'Não desenha nada, mas ocupa uma coluna.',
      digit: 'O zero fica em 48, então os quatro bits de baixo são o próprio dígito.',
      upper: 'O A começa em 65 e vêm mais vinte e seis letras.',
      lower: 'O a começa em 97 — a maiúscula mais 32.',
      punct: 'Os sinais espalhados entre os dígitos e as letras.',
    },
    {
      control: '画面には出ず、装置に何かをさせるための文字です。',
      space: '何も描きませんが、一文字分の場所は取ります。',
      digit: '0が48なので、下位4ビットがそのまま数字になります。',
      upper: 'Aが65から始まり、26字が続きます。',
      lower: 'aは97から始まります——大文字に32を足した位置です。',
      punct: '数字と文字のあいだに散らばっている記号です。',
    },
    {
      control: 'Zeichen, die nichts zeichnen, sondern dem Gerät etwas auftragen.',
      space: 'Es zeichnet nichts und belegt doch eine Stelle.',
      digit: 'Die Null steht auf 48, also sind die unteren vier Bits die Ziffer selbst.',
      upper: 'A beginnt bei 65, danach folgen sechsundzwanzig Buchstaben.',
      lower: 'a beginnt bei 97 — der Großbuchstabe plus 32.',
      punct: 'Die Zeichen, die zwischen Ziffern und Buchstaben verstreut liegen.',
    },
    {
      control: 'Des caractères qui n’affichent rien et demandent quelque chose à l’appareil.',
      space: 'Il n’affiche rien mais occupe une place.',
      digit: 'Le zéro est à 48 : les quatre bits de poids faible donnent le chiffre.',
      upper: 'A commence à 65, suivi de vingt-six lettres.',
      lower: 'a commence à 97 — la majuscule plus 32.',
      punct: 'Les signes dispersés entre les chiffres et les lettres.',
    },
    {
      control: 'ये वर्ण कुछ नहीं दिखाते, बल्कि उपकरण को कुछ करने को कहते हैं।',
      space: 'कुछ नहीं दिखता, फिर भी जगह घेरता है।',
      digit: 'शून्य 48 पर है, इसलिए निचले चार बिट ही वह अंक हैं।',
      upper: 'A 65 से शुरू होता है और छब्बीस अक्षर चलते हैं।',
      lower: 'a 97 से शुरू होता है — बड़ा अक्षर जमा 32।',
      punct: 'अंकों और अक्षरों के बीच बिखरे हुए चिह्न।',
    },
    {
      control: '不显示在屏幕上，而是让设备去做某件事的字符。',
      space: '什么都不画，却要占一格。',
      digit: '0 在 48，所以低四位正好就是那个数字。',
      upper: 'A 从 65 开始，往后二十六个字母。',
      lower: 'a 从 97 开始——大写加 32。',
      punct: '散落在数字和字母之间的符号。',
    },
    {
      control: '不顯示在螢幕上，而是讓裝置去做某件事的字元。',
      space: '什麼都不畫，卻要佔一格。',
      digit: '0 在 48，所以低四位正好就是那個數字。',
      upper: 'A 從 65 開始，往後二十六個字母。',
      lower: 'a 從 97 開始——大寫加 32。',
      punct: '散落在數字和字母之間的符號。',
    },
  ),

  groupTitle: T('제어문자 33자', 'The 33 control codes', 'Los 33 códigos de control', 'Os 33 códigos de controle', '制御文字33字', 'Die 33 Steuerzeichen', 'Les 33 codes de contrôle', '33 नियंत्रण कोड', '33 个控制字符', '33 個控制字元'),

  groupLabel: T(
    { transmission: '전송 제어', format: '서식 제어', device: '장치 제어', separator: '구분자', other: '그 밖' },
    { transmission: 'Transmission', format: 'Formatting', device: 'Device', separator: 'Separators', other: 'Others' },
    { transmission: 'Transmisión', format: 'Formato', device: 'Dispositivo', separator: 'Separadores', other: 'Otros' },
    { transmission: 'Transmissão', format: 'Formatação', device: 'Dispositivo', separator: 'Separadores', other: 'Outros' },
    { transmission: '伝送制御', format: '書式制御', device: '装置制御', separator: '区切り', other: 'その他' },
    { transmission: 'Übertragung', format: 'Formatierung', device: 'Gerät', separator: 'Trenner', other: 'Sonstige' },
    { transmission: 'Transmission', format: 'Mise en forme', device: 'Appareil', separator: 'Séparateurs', other: 'Autres' },
    { transmission: 'संचरण', format: 'स्वरूपण', device: 'उपकरण', separator: 'विभाजक', other: 'अन्य' },
    { transmission: '传输控制', format: '格式控制', device: '设备控制', separator: '分隔符', other: '其他' },
    { transmission: '傳輸控制', format: '格式控制', device: '裝置控制', separator: '分隔符', other: '其他' },
  ),

  groupNote: T(
    {
      transmission: '메시지가 어디서 시작하고 끝나는지, 잘 받았는지를 알리던 글자입니다.',
      format: '줄을 바꾸고 칸을 띄우고 종이를 넘기는, 지금도 쓰이는 글자입니다.',
      device: '종을 울리거나 문자판을 바꾸는 등 장치를 부리던 글자입니다.',
      separator: '자료를 파일·묶음·레코드·항목으로 나누는 네 층의 구분자입니다.',
      other: '지우기, 취소, 그리고 다른 뜻을 여는 열쇠 ESC가 여기 듭니다.',
    },
    {
      transmission: 'Codes that marked where a message began and ended, and whether it arrived.',
      format: 'Line breaks, tabs and page feeds — the ones still in daily use.',
      device: 'Codes that rang a bell or switched the character set on a device.',
      separator: 'Four nested separators: file, group, record, unit.',
      other: 'Deleting, cancelling, and ESC — the key that opens a second meaning.',
    },
    {
      transmission: 'Códigos que marcaban dónde empezaba y acababa un mensaje, y si llegó.',
      format: 'Saltos de línea, tabuladores y avances de página: los que se siguen usando.',
      device: 'Códigos que hacían sonar un timbre o cambiaban el juego de caracteres.',
      separator: 'Cuatro separadores anidados: archivo, grupo, registro, unidad.',
      other: 'Borrar, cancelar y ESC, la tecla que abre un segundo significado.',
    },
    {
      transmission: 'Códigos que marcavam onde uma mensagem começava e terminava, e se chegou.',
      format: 'Quebras de linha, tabulações e avanços de página — os que ainda se usam.',
      device: 'Códigos que tocavam uma campainha ou trocavam o conjunto de caracteres.',
      separator: 'Quatro separadores encaixados: arquivo, grupo, registro, unidade.',
      other: 'Apagar, cancelar e ESC, a tecla que abre um segundo sentido.',
    },
    {
      transmission: 'メッセージの始まりと終わり、受け取ったかどうかを伝えていた文字です。',
      format: '改行・タブ・改ページ——今も毎日使われている文字です。',
      device: 'ベルを鳴らしたり文字セットを切り替えたり、装置を操っていた文字です。',
      separator: 'ファイル・グループ・レコード・ユニットの四層の区切りです。',
      other: '削除、取り消し、そして別の意味を開く鍵であるESCがここに入ります。',
    },
    {
      transmission: 'Codes, die Anfang und Ende einer Nachricht markierten und den Empfang bestätigten.',
      format: 'Zeilenumbruch, Tabulator, Seitenvorschub — die bis heute gebrauchten.',
      device: 'Codes, die eine Glocke läuteten oder den Zeichensatz umschalteten.',
      separator: 'Vier ineinandergeschachtelte Trenner: Datei, Gruppe, Datensatz, Einheit.',
      other: 'Löschen, Abbrechen und ESC — die Taste, die eine zweite Bedeutung öffnet.',
    },
    {
      transmission: 'Des codes qui marquaient le début et la fin d’un message, et son bon arrivée.',
      format: 'Retour à la ligne, tabulation, saut de page : ceux qui servent encore.',
      device: 'Des codes qui faisaient sonner une cloche ou changeaient le jeu de caractères.',
      separator: 'Quatre séparateurs emboîtés : fichier, groupe, enregistrement, unité.',
      other: 'Effacer, annuler, et ESC — la touche qui ouvre un second sens.',
    },
    {
      transmission: 'ये कोड बताते थे कि संदेश कहाँ शुरू और खत्म हुआ, और पहुँचा या नहीं।',
      format: 'नई पंक्ति, टैब और पेज बदलना — जो आज भी रोज काम आते हैं।',
      device: 'घंटी बजाने या वर्ण-सेट बदलने जैसे उपकरण के काम।',
      separator: 'चार स्तरों के विभाजक: फाइल, समूह, रिकॉर्ड, इकाई।',
      other: 'मिटाना, रद्द करना, और ESC — दूसरा अर्थ खोलने वाली कुंजी।',
    },
    {
      transmission: '标记消息从哪里开始、到哪里结束、有没有收到的那些码。',
      format: '换行、制表、换页——今天仍在天天使用的那几个。',
      device: '让设备响铃或切换字符集的那些码。',
      separator: '四层嵌套的分隔符：文件、组、记录、单元。',
      other: '删除、取消，以及打开另一层含义的 ESC。',
    },
    {
      transmission: '標記訊息從哪裡開始、到哪裡結束、有沒有收到的那些碼。',
      format: '換行、定位、換頁——今天仍在天天使用的那幾個。',
      device: '讓裝置響鈴或切換字元集的那些碼。',
      separator: '四層巢狀的分隔符：檔案、群組、記錄、單元。',
      other: '刪除、取消，以及打開另一層含義的 ESC。',
    },
  ),

  decLabel: T('십진수', 'Decimal', 'Decimal', 'Decimal', '10進数', 'Dezimal', 'Décimal', 'दशमलव', '十进制', '十進位'),
  hexLabel: T('16진수', 'Hexadecimal', 'Hexadecimal', 'Hexadecimal', '16進数', 'Hexadezimal', 'Hexadécimal', 'षोडश आधारी', '十六进制', '十六進位'),
  octLabel: T('8진수', 'Octal', 'Octal', 'Octal', '8進数', 'Oktal', 'Octal', 'अष्टाधारी', '八进制', '八進位'),
  binLabel: T('2진수', 'Binary', 'Binario', 'Binário', '2進数', 'Binär', 'Binaire', 'द्विआधारी', '二进制', '二進位'),
  entityLabel: T('HTML 엔티티', 'HTML entity', 'Entidad HTML', 'Entidade HTML', 'HTMLエンティティ', 'HTML-Entity', 'Entité HTML', 'HTML एंटिटी', 'HTML 实体', 'HTML 實體'),
  namedEntityLabel: T('이름 엔티티', 'Named entity', 'Entidad con nombre', 'Entidade nomeada', '名前つきエンティティ', 'Benannte Entity', 'Entité nommée', 'नामित एंटिटी', '命名实体', '具名實體'),
  urlLabel: T('URL 인코딩', 'URL encoding', 'Codificación URL', 'Codificação de URL', 'URLエンコード', 'URL-Kodierung', 'Encodage URL', 'URL एन्कोडिंग', 'URL 编码', 'URL 編碼'),
  cssLabel: T('CSS 이스케이프', 'CSS escape', 'Escape CSS', 'Escape CSS', 'CSSエスケープ', 'CSS-Escape', 'Échappement CSS', 'CSS एस्केप', 'CSS 转义', 'CSS 跳脫'),
  escapeLabel: T('짧은 이스케이프', 'Short escape', 'Escape corto', 'Escape curto', '短いエスケープ', 'Kurz-Escape', 'Échappement court', 'छोटा एस्केप', '短转义', '短跳脫'),

  escapeNote: T(
    '\\e만 표준 C에는 없고 GCC와 셸·정규식에서 통합니다.',
    'Only \\e is missing from standard C; GCC, shells and regex engines take it.',
    'Solo \\e falta en el C estándar; GCC, las shells y los motores de regex lo aceptan.',
    'Só \\e não está no C padrão; GCC, shells e motores de regex aceitam.',
    '\\eだけは標準Cになく、GCCやシェル・正規表現で通ります。',
    'Nur \\e fehlt im Standard-C; GCC, Shells und Regex-Engines nehmen es an.',
    'Seul \\e manque au C standard ; GCC, les shells et les moteurs regex l’acceptent.',
    'केवल \\e मानक C में नहीं है; GCC, शेल और रेगेक्स इसे मानते हैं।',
    '只有 \\e 不在标准 C 里，但 GCC、shell 和正则引擎都认。',
    '只有 \\e 不在標準 C 裡，但 GCC、shell 和正規表示式都認。',
  ),

  ctrlLabel: T('Ctrl 조합', 'Ctrl key', 'Con Ctrl', 'Com Ctrl', 'Ctrl組み合わせ', 'Ctrl-Taste', 'Touche Ctrl', 'Ctrl संयोजन', 'Ctrl 组合', 'Ctrl 組合'),
  ctrlOfLabel: T('Ctrl과 누르면', 'With Ctrl held', 'Con Ctrl pulsado', 'Com Ctrl pressionado', 'Ctrlと押すと', 'Mit Ctrl gedrückt', 'Avec Ctrl enfoncé', 'Ctrl के साथ', '按住 Ctrl 时', '按住 Ctrl 時'),
  pairLabel: T('대소문자 짝', 'Case pair', 'Par de caja', 'Par de caixa', '大小文字の相方', 'Groß-/Kleinpaar', 'Paire de casse', 'केस जोड़ा', '大小写配对', '大小寫配對'),
  digitValueLabel: T('나타내는 값', 'Digit value', 'Valor del dígito', 'Valor do dígito', '表す値', 'Ziffernwert', 'Valeur du chiffre', 'अंक का मान', '表示的数值', '表示的數值'),
  kindRowLabel: T('갈래', 'Kind', 'Tipo', 'Tipo', '種類', 'Art', 'Type', 'प्रकार', '类别', '類別'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  bitsTitle: T('일곱 비트', 'Seven bits', 'Siete bits', 'Sete bits', '7ビット', 'Sieben Bits', 'Sept bits', 'सात बिट', '七个比特', '七個位元'),

  bitsNote: T(
    'ASCII는 일곱 비트라 128자입니다. 여덟 번째 비트는 오랫동안 검사용으로 비워 두었습니다.',
    'ASCII is seven bits wide, which is why there are 128 of them. The eighth bit was long left for parity.',
    'ASCII ocupa siete bits, y por eso hay 128. El octavo bit se dejó mucho tiempo para la paridad.',
    'ASCII tem sete bits, por isso são 128. O oitavo bit ficou muito tempo reservado à paridade.',
    'ASCIIは7ビットなので128字です。8ビット目は長らく検査用に空けてありました。',
    'ASCII ist sieben Bit breit — daher 128 Zeichen. Das achte Bit blieb lange für die Parität frei.',
    'ASCII tient sur sept bits, d’où 128 caractères. Le huitième bit est longtemps resté pour la parité.',
    'ASCII सात बिट का है, इसीलिए 128 वर्ण हैं। आठवाँ बिट लंबे समय तक पैरिटी के लिए खाली रखा गया।',
    'ASCII 是七位，所以只有 128 个字符。第八位很长时间留作校验用。',
    'ASCII 是七位，所以只有 128 個字元。第八位很長時間留作校驗用。',
  ),

  caseBitNote: T(
    '여섯 번째 비트(32) 하나가 대문자와 소문자를 가릅니다. 그 비트를 끄면 대문자, 켜면 소문자입니다.',
    'One bit — the sixth, worth 32 — separates the cases. Off gives a capital, on gives a lowercase letter.',
    'Un solo bit, el sexto, que vale 32, separa las cajas: apagado da mayúscula y encendido, minúscula.',
    'Um único bit — o sexto, que vale 32 — separa as caixas: desligado dá maiúscula, ligado dá minúscula.',
    '6番目のビット（32）ひとつが大文字と小文字を分けます。落とせば大文字、立てれば小文字です。',
    'Ein einziges Bit — das sechste, Wert 32 — trennt die Schreibweisen: aus ergibt Groß, an ergibt Klein.',
    'Un seul bit — le sixième, qui vaut 32 — sépare les casses : éteint donne une majuscule, allumé une minuscule.',
    'एक ही बिट — छठा, मान 32 — केस को अलग करता है: बंद हो तो बड़ा अक्षर, चालू हो तो छोटा।',
    '只有第六个比特（值 32）在分大小写：关掉是大写，打开是小写。',
    '只有第六個位元（值 32）在分大小寫：關掉是大寫，打開是小寫。',
  ),

  neighbourTitle: T('앞뒤의 글자', 'Codes either side', 'Códigos vecinos', 'Códigos vizinhos', '前後の文字', 'Codes daneben', 'Codes voisins', 'आस-पास के कोड', '相邻的码', '相鄰的碼'),
  controlTitle: T('이 제어문자가 하던 일', 'What this control code did', 'Qué hacía este código', 'O que este código fazia', 'この制御文字の役目', 'Wozu dieses Steuerzeichen diente', 'Le rôle de ce code', 'यह नियंत्रण कोड क्या करता था', '这个控制字符的用处', '這個控制字元的用處'),
  invisible: T('보이지 않는 글자', 'Not a visible character', 'No se ve', 'Não se vê', '見えない文字', 'Nicht sichtbar', 'Caractère invisible', 'दिखाई न देने वाला वर्ण', '看不见的字符', '看不見的字元'),

  desc: T<(f: AsciiFacts) => string>(
    /*
      한국어 조사를 일부러 피했다. 약칭 뒤에 붙는 은/는은 읽은 소리가 정하는데
      ESC는 "이에스시", NUL은 "널"이라 규칙으로 고를 수가 없다. 128장에
      "ESC은(는)"이라고 적어 둘 수는 없어서 문장을 조사 없이 끊는다.
    */
    f => (f.kind === 'control'
      ? `제어문자 ${f.label} — 십진수 ${f.code}, 16진수 ${f.hex}입니다. ${f.ctrl}로 입력하고${f.escape ? `, 짧게는 ${f.escape}로 적습니다` : ' 화면에는 그려지지 않습니다'}.`
      : `${f.label} — 십진수 ${f.code}, 16진수 ${f.hex}, 2진수 ${f.bin}입니다.${f.pair !== undefined ? ` ${String.fromCharCode(f.pair)}와는 32 차이입니다.` : f.digitValue !== undefined ? ` 아래 네 비트가 그대로 숫자 ${f.digitValue}입니다.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} is control code ${f.code}, hex ${f.hex}. You type it as ${f.ctrl}${f.escape ? `, and write it short as ${f.escape}` : ', and it draws nothing on screen'}.`
      : `${f.label} is ${f.code} in decimal, ${f.hex} in hex and ${f.bin} in binary.${f.pair !== undefined ? ` It sits 32 away from ${String.fromCharCode(f.pair)}.` : f.digitValue !== undefined ? ` Its bottom four bits are the digit ${f.digitValue} itself.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} es el código de control ${f.code}, hex ${f.hex}. Se teclea como ${f.ctrl}${f.escape ? ` y se abrevia ${f.escape}` : ' y no dibuja nada en pantalla'}.`
      : `${f.label} es ${f.code} en decimal, ${f.hex} en hex y ${f.bin} en binario.${f.pair !== undefined ? ` Está a 32 de ${String.fromCharCode(f.pair)}.` : f.digitValue !== undefined ? ` Sus cuatro bits bajos son el dígito ${f.digitValue}.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} é o código de controle ${f.code}, hex ${f.hex}. Digita-se como ${f.ctrl}${f.escape ? ` e abrevia-se ${f.escape}` : ' e não desenha nada na tela'}.`
      : `${f.label} é ${f.code} em decimal, ${f.hex} em hex e ${f.bin} em binário.${f.pair !== undefined ? ` Fica a 32 de ${String.fromCharCode(f.pair)}.` : f.digitValue !== undefined ? ` Seus quatro bits de baixo são o dígito ${f.digitValue}.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label}は10進数${f.code}、16進数${f.hex}の制御文字です。${f.ctrl}で入力し${f.escape ? `、短くは${f.escape}と書きます` : '、画面には出ません'}。`
      : `${f.label}は10進数${f.code}、16進数${f.hex}、2進数${f.bin}です。${f.pair !== undefined ? `${String.fromCharCode(f.pair)}とは32違いです。` : f.digitValue !== undefined ? `下位4ビットがそのまま数字${f.digitValue}です。` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} ist Steuerzeichen ${f.code}, hex ${f.hex}. Man tippt es als ${f.ctrl}${f.escape ? ` und schreibt es kurz ${f.escape}` : ' und es zeichnet nichts'}.`
      : `${f.label} ist dezimal ${f.code}, hex ${f.hex} und binär ${f.bin}.${f.pair !== undefined ? ` Es liegt 32 von ${String.fromCharCode(f.pair)} entfernt.` : f.digitValue !== undefined ? ` Die unteren vier Bits sind die Ziffer ${f.digitValue} selbst.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} est le code de contrôle ${f.code}, hex ${f.hex}. On le tape avec ${f.ctrl}${f.escape ? ` et on l’abrège ${f.escape}` : ' et il n’affiche rien'}.`
      : `${f.label} vaut ${f.code} en décimal, ${f.hex} en hexadécimal et ${f.bin} en binaire.${f.pair !== undefined ? ` Il est à 32 de ${String.fromCharCode(f.pair)}.` : f.digitValue !== undefined ? ` Ses quatre bits de poids faible donnent le chiffre ${f.digitValue}.` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} नियंत्रण कोड ${f.code} है, हेक्स ${f.hex}। इसे ${f.ctrl} से टाइप करते हैं${f.escape ? ` और छोटा रूप ${f.escape} है` : ' और यह स्क्रीन पर कुछ नहीं दिखाता'}।`
      : `${f.label} दशमलव में ${f.code}, हेक्स में ${f.hex} और द्विआधारी में ${f.bin} है।${f.pair !== undefined ? ` यह ${String.fromCharCode(f.pair)} से 32 दूर है।` : f.digitValue !== undefined ? ` इसके निचले चार बिट ही अंक ${f.digitValue} हैं।` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} 是控制字符 ${f.code}，十六进制 ${f.hex}。用 ${f.ctrl} 输入${f.escape ? `，简写作 ${f.escape}` : '，屏幕上什么也不显示'}。`
      : `${f.label} 的十进制是 ${f.code}，十六进制 ${f.hex}，二进制 ${f.bin}。${f.pair !== undefined ? `它和 ${String.fromCharCode(f.pair)} 相差 32。` : f.digitValue !== undefined ? `低四位正好就是数字 ${f.digitValue}。` : ''}`),
    f => (f.kind === 'control'
      ? `${f.label} 是控制字元 ${f.code}，十六進位 ${f.hex}。用 ${f.ctrl} 輸入${f.escape ? `，簡寫作 ${f.escape}` : '，螢幕上什麼也不顯示'}。`
      : `${f.label} 的十進位是 ${f.code}，十六進位 ${f.hex}，二進位 ${f.bin}。${f.pair !== undefined ? `它和 ${String.fromCharCode(f.pair)} 相差 32。` : f.digitValue !== undefined ? `低四位正好就是數字 ${f.digitValue}。` : ''}`),
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '대문자에 32를 더하면 소문자입니다. 비트 하나만 켜고 끄면 됩니다.',
      '숫자 글자는 48부터라, 코드에서 48을 빼면 그 숫자가 됩니다.',
      'Ctrl과 함께 누르면 위 세 비트가 지워집니다 — Ctrl+I가 탭인 이유입니다.',
      '32 아래와 127은 화면에 그려지지 않습니다. 그 자리에는 약칭을 적었습니다.',
    ],
    [
      'Add 32 to a capital and you get the lowercase letter — one bit flips.',
      'Digits start at 48, so subtracting 48 from the code gives the number.',
      'Holding Ctrl clears the top three bits — that is why Ctrl+I is a tab.',
      'Everything under 32, plus 127, draws nothing. Those show their abbreviation instead.',
    ],
    [
      'Suma 32 a una mayúscula y obtienes la minúscula: cambia un solo bit.',
      'Los dígitos empiezan en 48, así que restar 48 al código da el número.',
      'Pulsar Ctrl borra los tres bits altos: por eso Ctrl+I es un tabulador.',
      'Todo lo que baja de 32, y el 127, no dibuja nada; ahí va la abreviatura.',
    ],
    [
      'Some 32 a uma maiúscula e sai a minúscula — muda um único bit.',
      'Os dígitos começam em 48, então subtrair 48 do código dá o número.',
      'Segurar Ctrl zera os três bits de cima — por isso Ctrl+I é uma tabulação.',
      'Tudo abaixo de 32, e o 127, não desenha nada; ali fica a abreviação.',
    ],
    [
      '大文字に32を足すと小文字になります。ビットひとつを立てるだけです。',
      '数字は48から始まるので、コードから48を引けばその数になります。',
      'Ctrlと押すと上位3ビットが落ちます——Ctrl+Iがタブなのはそのためです。',
      '32未満と127は画面に出ません。その場所には約称を書いています。',
    ],
    [
      'Plus 32 auf einen Großbuchstaben ergibt den Kleinbuchstaben — ein Bit kippt.',
      'Ziffern beginnen bei 48; Code minus 48 ergibt die Zahl.',
      'Ctrl löscht die oberen drei Bits — darum ist Ctrl+I ein Tabulator.',
      'Alles unter 32 und die 127 zeichnen nichts; dort steht die Abkürzung.',
    ],
    [
      'Ajoutez 32 à une majuscule et vous obtenez la minuscule : un bit bascule.',
      'Les chiffres commencent à 48 : code moins 48 donne le nombre.',
      'Ctrl efface les trois bits de poids fort — d’où Ctrl+I pour une tabulation.',
      'Tout ce qui est sous 32, et le 127, n’affiche rien ; on y met l’abréviation.',
    ],
    [
      'बड़े अक्षर में 32 जोड़ें तो छोटा अक्षर मिलता है — एक ही बिट बदलता है।',
      'अंक 48 से शुरू होते हैं, इसलिए कोड में से 48 घटाने पर संख्या मिलती है।',
      'Ctrl दबाने पर ऊपरी तीन बिट मिट जाते हैं — इसीलिए Ctrl+I टैब है।',
      '32 से नीचे सब और 127 कुछ नहीं दिखाते; वहाँ संक्षेप लिखा है।',
    ],
    [
      '大写加 32 就是小写，只翻一个比特。',
      '数字从 48 开始，所以用编码减 48 就得到那个数。',
      '按住 Ctrl 会把高三位清零——这就是 Ctrl+I 是制表符的原因。',
      '32 以下和 127 都不显示，那里写的是缩写。',
    ],
    [
      '大寫加 32 就是小寫，只翻一個位元。',
      '數字從 48 開始，所以用編碼減 48 就得到那個數。',
      '按住 Ctrl 會把高三位清零——這就是 Ctrl+I 是定位字元的原因。',
      '32 以下和 127 都不顯示，那裡寫的是縮寫。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'ASCII 코드표 — 128자의 십진수·16진수·2진수',
    'ASCII table — all 128 codes in decimal, hex and binary',
    'Tabla ASCII — los 128 códigos en decimal, hex y binario',
    'Tabela ASCII — os 128 códigos em decimal, hex e binário',
    'ASCIIコード表 — 128字の10進数・16進数・2進数',
    'ASCII-Tabelle — alle 128 Codes dezimal, hex und binär',
    'Table ASCII — les 128 codes en décimal, hexadécimal et binaire',
    'ASCII तालिका — सभी 128 कोड दशमलव, हेक्स और द्विआधारी में',
    'ASCII 码表 — 128 个字符的十进制、十六进制与二进制',
    'ASCII 碼表 — 128 個字元的十進位、十六進位與二進位',
  ),

  hubMetaDesc: T(
    '제어문자 33자를 포함한 128자를 한 장씩. 진법과 HTML 엔티티, URL 인코딩, Ctrl 조합까지 코드에서 계산했습니다.',
    'All 128 codes, control characters included, one page each: bases, HTML entities, URL encoding and Ctrl keys, worked out from the code.',
    'Los 128 códigos, con los de control, uno por página: bases, entidades HTML, codificación URL y teclas Ctrl, calculados desde el código.',
    'Os 128 códigos, com os de controle, um por página: bases, entidades HTML, codificação de URL e teclas Ctrl, calculados a partir do código.',
    '制御文字33字を含む128字を1ページずつ。進法・HTMLエンティティ・URLエンコード・Ctrl組み合わせまでコードから計算しました。',
    'Alle 128 Codes samt Steuerzeichen, je eine Seite: Zahlensysteme, HTML-Entities, URL-Kodierung und Ctrl-Tasten, aus dem Code berechnet.',
    'Les 128 codes, caractères de contrôle compris, une page chacun : bases, entités HTML, encodage URL et touches Ctrl, calculés depuis le code.',
    'सभी 128 कोड, नियंत्रण वर्णों सहित, एक-एक पृष्ठ: आधार, HTML एंटिटी, URL एन्कोडिंग और Ctrl संयोजन — कोड से निकाले गए।',
    '128 个字符（含 33 个控制字符）各一页：进制、HTML 实体、URL 编码和 Ctrl 组合，全部由编码算出。',
    '128 個字元（含 33 個控制字元）各一頁：進位、HTML 實體、URL 編碼和 Ctrl 組合，全部由編碼算出。',
  ),

  metaTitle: T<(f: AsciiFacts) => string>(
    f => `ASCII ${f.code} — ${f.label} 문자 코드`,
    f => `ASCII ${f.code} — the ${f.label} character`,
    f => `ASCII ${f.code} — el carácter ${f.label}`,
    f => `ASCII ${f.code} — o caractere ${f.label}`,
    f => `ASCII ${f.code} — 文字 ${f.label}`,
    f => `ASCII ${f.code} — das Zeichen ${f.label}`,
    f => `ASCII ${f.code} — le caractère ${f.label}`,
    f => `ASCII ${f.code} — वर्ण ${f.label}`,
    f => `ASCII ${f.code} — 字符 ${f.label}`,
    f => `ASCII ${f.code} — 字元 ${f.label}`,
  ),

  metaDesc: T<(f: AsciiFacts) => string>(
    f => `${f.label}의 십진수는 ${f.code}, 16진수 ${f.hex}, 8진수 ${f.oct}, 2진수 ${f.bin}입니다. HTML 엔티티는 ${f.entity}${f.ctrl ? `, 입력은 ${f.ctrl}` : ''}.`,
    f => `${f.label} is decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binary ${f.bin}. HTML entity ${f.entity}${f.ctrl ? `, typed as ${f.ctrl}` : ''}.`,
    f => `${f.label} es decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binario ${f.bin}. Entidad HTML ${f.entity}${f.ctrl ? `, se teclea ${f.ctrl}` : ''}.`,
    f => `${f.label} é decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binário ${f.bin}. Entidade HTML ${f.entity}${f.ctrl ? `, digitado ${f.ctrl}` : ''}.`,
    f => `${f.label}は10進数${f.code}、16進数${f.hex}、8進数${f.oct}、2進数${f.bin}です。HTMLエンティティは${f.entity}${f.ctrl ? `、入力は${f.ctrl}` : ''}。`,
    f => `${f.label} ist dezimal ${f.code}, hex ${f.hex}, oktal ${f.oct}, binär ${f.bin}. HTML-Entity ${f.entity}${f.ctrl ? `, getippt als ${f.ctrl}` : ''}.`,
    f => `${f.label} vaut ${f.code} en décimal, ${f.hex} en hex, ${f.oct} en octal, ${f.bin} en binaire. Entité HTML ${f.entity}${f.ctrl ? `, tapé ${f.ctrl}` : ''}.`,
    f => `${f.label} दशमलव ${f.code}, हेक्स ${f.hex}, अष्टाधारी ${f.oct}, द्विआधारी ${f.bin} है। HTML एंटिटी ${f.entity}${f.ctrl ? `, टाइप ${f.ctrl}` : ''}।`,
    f => `${f.label} 的十进制是 ${f.code}，十六进制 ${f.hex}，八进制 ${f.oct}，二进制 ${f.bin}。HTML 实体 ${f.entity}${f.ctrl ? `，输入用 ${f.ctrl}` : ''}。`,
    f => `${f.label} 的十進位是 ${f.code}，十六進位 ${f.hex}，八進位 ${f.oct}，二進位 ${f.bin}。HTML 實體 ${f.entity}${f.ctrl ? `，輸入用 ${f.ctrl}` : ''}。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'ASCII는 왜 128자인가요?', a: '일곱 비트로 적기 때문입니다. 2의 7제곱이 128입니다.' },
      { q: '대문자와 소문자가 왜 32 차이인가요?', a: '여섯 번째 비트 하나로 가르도록 표를 짰기 때문입니다. 그 비트만 켜고 끄면 대소문자가 바뀝니다.' },
      { q: 'Ctrl+I는 왜 탭이 되나요?', a: 'Ctrl은 위 세 비트를 지웁니다. I는 73이고 아래 다섯 비트만 남기면 9, 곧 탭입니다.' },
      { q: '제어문자는 지금도 쓰나요?', a: '줄바꿈(10)·캐리지 리턴(13)·탭(9)·ESC(27)는 매일 쓰입니다. 나머지는 대부분 전신 시절의 자리입니다.' },
      { q: '128 위의 글자는요?', a: 'ASCII가 아닙니다. 한글·한자·이모지는 유니코드에서 다루고, UTF-8은 ASCII를 그대로 품습니다.' },
    ],
    [
      { q: 'Why are there only 128 ASCII codes?', a: 'Because the code is seven bits wide, and two to the seventh is 128.' },
      { q: 'Why do upper and lower case differ by 32?', a: 'The table was laid out so a single bit — the sixth — separates them. Flip it and the case changes.' },
      { q: 'Why does Ctrl+I give a tab?', a: 'Ctrl clears the top three bits. I is 73; keep the bottom five and you get 9, which is tab.' },
      { q: 'Are control codes still used?', a: 'Line feed (10), carriage return (13), tab (9) and ESC (27) are used daily. Most of the rest belong to the teleprinter era.' },
      { q: 'What about characters above 128?', a: 'They are not ASCII. Unicode covers them, and UTF-8 keeps ASCII unchanged in its first 128 slots.' },
    ],
    [
      { q: '¿Por qué solo hay 128 códigos ASCII?', a: 'Porque el código ocupa siete bits, y dos elevado a siete es 128.' },
      { q: '¿Por qué mayúsculas y minúsculas distan 32?', a: 'La tabla se diseñó para que las separe un solo bit, el sexto. Al cambiarlo cambia la caja.' },
      { q: '¿Por qué Ctrl+I da un tabulador?', a: 'Ctrl borra los tres bits altos. La I es 73; con los cinco bajos queda 9, el tabulador.' },
      { q: '¿Se siguen usando los códigos de control?', a: 'Salto de línea (10), retorno de carro (13), tabulador (9) y ESC (27) se usan a diario. El resto es de la época del teletipo.' },
      { q: '¿Y los caracteres por encima de 128?', a: 'No son ASCII. De ellos se ocupa Unicode, y UTF-8 conserva ASCII intacto en sus primeras 128 posiciones.' },
    ],
    [
      { q: 'Por que só há 128 códigos ASCII?', a: 'Porque o código tem sete bits, e dois elevado a sete é 128.' },
      { q: 'Por que maiúsculas e minúsculas diferem em 32?', a: 'A tabela foi montada para que um único bit, o sexto, as separe. Trocando esse bit, troca a caixa.' },
      { q: 'Por que Ctrl+I dá uma tabulação?', a: 'Ctrl zera os três bits de cima. O I é 73; ficando os cinco de baixo dá 9, a tabulação.' },
      { q: 'Os códigos de controle ainda são usados?', a: 'Quebra de linha (10), retorno de carro (13), tabulação (9) e ESC (27) são usados todo dia. O resto é da era do teletipo.' },
      { q: 'E os caracteres acima de 128?', a: 'Não são ASCII. Unicode cuida deles, e o UTF-8 mantém o ASCII intacto nas primeiras 128 posições.' },
    ],
    [
      { q: 'ASCIIはなぜ128字なのですか？', a: '7ビットで表すからです。2の7乗が128です。' },
      { q: '大文字と小文字はなぜ32違うのですか？', a: '6番目のビットひとつで分かれるように表を組んだからです。そのビットを切り替えれば大小が入れ替わります。' },
      { q: 'Ctrl+Iがタブになるのはなぜですか？', a: 'Ctrlは上位3ビットを落とします。Iは73で、下位5ビットだけ残すと9——タブです。' },
      { q: '制御文字は今も使いますか？', a: '改行(10)・復帰(13)・タブ(9)・ESC(27)は毎日使います。残りの多くは電信の時代の名残です。' },
      { q: '128より上の文字は？', a: 'ASCIIではありません。Unicodeが扱い、UTF-8は先頭128字をASCIIのまま保ちます。' },
    ],
    [
      { q: 'Warum gibt es nur 128 ASCII-Codes?', a: 'Weil der Code sieben Bit breit ist und zwei hoch sieben 128 ergibt.' },
      { q: 'Warum liegen Groß und Klein 32 auseinander?', a: 'Die Tabelle ist so gebaut, dass ein einziges Bit — das sechste — sie trennt. Kippt es, kippt die Schreibweise.' },
      { q: 'Warum ergibt Ctrl+I einen Tabulator?', a: 'Ctrl löscht die oberen drei Bits. I ist 73; bleiben die unteren fünf, ergibt das 9 — den Tabulator.' },
      { q: 'Werden Steuerzeichen noch benutzt?', a: 'Zeilenvorschub (10), Wagenrücklauf (13), Tabulator (9) und ESC (27) täglich. Der Rest stammt aus der Fernschreiberzeit.' },
      { q: 'Und Zeichen über 128?', a: 'Die sind kein ASCII. Dafür ist Unicode da, und UTF-8 lässt die ersten 128 Plätze unverändert.' },
    ],
    [
      { q: 'Pourquoi seulement 128 codes ASCII ?', a: 'Parce que le code tient sur sept bits, et deux puissance sept fait 128.' },
      { q: 'Pourquoi 32 d’écart entre majuscule et minuscule ?', a: 'La table a été conçue pour qu’un seul bit — le sixième — les sépare. On le bascule, la casse change.' },
      { q: 'Pourquoi Ctrl+I donne-t-il une tabulation ?', a: 'Ctrl efface les trois bits de poids fort. I vaut 73 ; il reste 9 sur cinq bits, c’est la tabulation.' },
      { q: 'Les codes de contrôle servent-ils encore ?', a: 'Saut de ligne (10), retour chariot (13), tabulation (9) et ESC (27) servent tous les jours. Le reste date du téléscripteur.' },
      { q: 'Et les caractères au-dessus de 128 ?', a: 'Ce n’est plus de l’ASCII. Unicode s’en charge, et UTF-8 garde les 128 premiers tels quels.' },
    ],
    [
      { q: 'ASCII में सिर्फ 128 कोड क्यों हैं?', a: 'क्योंकि कोड सात बिट का है, और दो की सातवीं घात 128 होती है।' },
      { q: 'बड़े और छोटे अक्षर में 32 का अंतर क्यों?', a: 'तालिका ऐसी बनी है कि एक ही बिट — छठा — उन्हें अलग करता है। बिट बदलिए, केस बदल जाता है।' },
      { q: 'Ctrl+I टैब क्यों देता है?', a: 'Ctrl ऊपरी तीन बिट मिटा देता है। I 73 है; निचले पाँच बिट रखें तो 9 मिलता है, यानी टैब।' },
      { q: 'क्या नियंत्रण कोड आज भी काम आते हैं?', a: 'लाइन फीड (10), कैरिज रिटर्न (13), टैब (9) और ESC (27) रोज काम आते हैं। बाकी अधिकतर टेलीप्रिंटर युग के हैं।' },
      { q: '128 से ऊपर के वर्ण?', a: 'वे ASCII नहीं हैं। उन्हें Unicode संभालता है, और UTF-8 पहले 128 स्थान ज्यों के त्यों रखता है।' },
    ],
    [
      { q: 'ASCII 为什么只有 128 个？', a: '因为它用七位表示，2 的 7 次方就是 128。' },
      { q: '大小写为什么差 32？', a: '这张表就是按“第六个比特分大小写”排的。翻这一位，大小写就换了。' },
      { q: 'Ctrl+I 为什么是制表符？', a: 'Ctrl 会清掉高三位。I 是 73，只留低五位得到 9，就是制表符。' },
      { q: '控制字符现在还用吗？', a: '换行(10)、回车(13)、制表(9)、ESC(27) 天天在用，其余多半是电报时代留下的。' },
      { q: '128 以上的字符呢？', a: '那不是 ASCII。它们归 Unicode 管，而 UTF-8 把前 128 位原样保留给 ASCII。' },
    ],
    [
      { q: 'ASCII 為什麼只有 128 個？', a: '因為它用七位表示，2 的 7 次方就是 128。' },
      { q: '大小寫為什麼差 32？', a: '這張表就是按「第六個位元分大小寫」排的。翻這一位，大小寫就換了。' },
      { q: 'Ctrl+I 為什麼是定位字元？', a: 'Ctrl 會清掉高三位。I 是 73，只留低五位得到 9，就是定位字元。' },
      { q: '控制字元現在還用嗎？', a: '換行(10)、歸位(13)、定位(9)、ESC(27) 天天在用，其餘多半是電報時代留下的。' },
      { q: '128 以上的字元呢？', a: '那不是 ASCII。它們歸 Unicode 管，而 UTF-8 把前 128 位原樣保留給 ASCII。' },
    ],
  ),

  charFaq: T<(f: AsciiFacts) => FaqItem[]>(
    f => [
      { q: `${f.label}의 ASCII 코드는 몇 번인가요?`, a: `십진수 ${f.code}, 16진수 ${f.hex}, 8진수 ${f.oct}, 2진수 ${f.bin}입니다.` },
      { q: `${f.label} — HTML에는 어떻게 적나요?`, a: `${f.entity}로 적습니다${f.namedEntity ? `. 이름으로는 ${f.namedEntity}도 됩니다` : ''}.` },
      { q: `주소에 넣으려면 어떻게 하나요?`, a: `${f.urlEncoded === f.char ? '그대로 두어도 됩니다 — 인코딩이 필요 없는 글자입니다.' : `${f.urlEncoded}로 인코딩합니다.`}` },
      f.kind === 'control'
        ? { q: `${f.label} — 어떻게 입력하나요?`, a: `${f.ctrl}입니다${f.escape ? `. 문자열 안에서는 ${f.escape}로 적습니다` : ''}.` }
        : { q: `짝이 되는 글자가 있나요?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)}입니다 — 코드가 32 차이입니다.` : `대소문자 짝은 없습니다. 글자가 아니라 ${f.kind === 'digit' ? '숫자' : '기호'}이기 때문입니다.` },
    ],
    f => [
      { q: `What is the ASCII code for ${f.label}?`, a: `Decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binary ${f.bin}.` },
      { q: `How do I write ${f.label} in HTML?`, a: `As ${f.entity}${f.namedEntity ? `, or by name as ${f.namedEntity}` : ''}.` },
      { q: `How does it go in a URL?`, a: f.urlEncoded === f.char ? 'It can stay as it is — this character needs no encoding.' : `It is encoded as ${f.urlEncoded}.` },
      f.kind === 'control'
        ? { q: `How do I type ${f.label}?`, a: `${f.ctrl}${f.escape ? `. In a string you write it ${f.escape}` : ''}.` }
        : { q: `Does ${f.label} have a partner?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)} — the codes are 32 apart.` : `No case partner: it is not a letter but a ${f.kind === 'digit' ? 'digit' : 'symbol'}.` },
    ],
    f => [
      { q: `¿Cuál es el código ASCII de ${f.label}?`, a: `Decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binario ${f.bin}.` },
      { q: `¿Cómo escribo ${f.label} en HTML?`, a: `Como ${f.entity}${f.namedEntity ? `, o por nombre ${f.namedEntity}` : ''}.` },
      { q: `¿Y dentro de una URL?`, a: f.urlEncoded === f.char ? 'Puede ir tal cual: este carácter no necesita codificarse.' : `Se codifica como ${f.urlEncoded}.` },
      f.kind === 'control'
        ? { q: `¿Cómo se teclea ${f.label}?`, a: `${f.ctrl}${f.escape ? `. En una cadena se escribe ${f.escape}` : ''}.` }
        : { q: `¿${f.label} tiene pareja?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)}: los códigos distan 32.` : `No tiene pareja de caja: no es una letra sino un ${f.kind === 'digit' ? 'dígito' : 'signo'}.` },
    ],
    f => [
      { q: `Qual é o código ASCII de ${f.label}?`, a: `Decimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binário ${f.bin}.` },
      { q: `Como escrevo ${f.label} em HTML?`, a: `Como ${f.entity}${f.namedEntity ? `, ou pelo nome ${f.namedEntity}` : ''}.` },
      { q: `E dentro de uma URL?`, a: f.urlEncoded === f.char ? 'Pode ficar como está: este caractere não precisa de codificação.' : `É codificado como ${f.urlEncoded}.` },
      f.kind === 'control'
        ? { q: `Como se digita ${f.label}?`, a: `${f.ctrl}${f.escape ? `. Numa string escreve-se ${f.escape}` : ''}.` }
        : { q: `${f.label} tem par?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)} — os códigos ficam a 32.` : `Não tem par de caixa: não é letra, é ${f.kind === 'digit' ? 'dígito' : 'sinal'}.` },
    ],
    f => [
      { q: `${f.label}のASCIIコードは？`, a: `10進数${f.code}、16進数${f.hex}、8進数${f.oct}、2進数${f.bin}です。` },
      { q: `${f.label}をHTMLでどう書きますか？`, a: `${f.entity}と書きます${f.namedEntity ? `。名前では${f.namedEntity}も使えます` : ''}。` },
      { q: `URLに入れるときは？`, a: f.urlEncoded === f.char ? 'そのままで大丈夫です——エンコードのいらない文字です。' : `${f.urlEncoded}にエンコードします。` },
      f.kind === 'control'
        ? { q: `${f.label}はどう入力しますか？`, a: `${f.ctrl}です${f.escape ? `。文字列の中では${f.escape}と書きます` : ''}。` }
        : { q: `${f.label}に相方はありますか？`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)}です——コードが32違います。` : `大小文字の相方はありません。文字ではなく${f.kind === 'digit' ? '数字' : '記号'}だからです。` },
    ],
    f => [
      { q: `Welchen ASCII-Code hat ${f.label}?`, a: `Dezimal ${f.code}, hex ${f.hex}, oktal ${f.oct}, binär ${f.bin}.` },
      { q: `Wie schreibt man ${f.label} in HTML?`, a: `Als ${f.entity}${f.namedEntity ? `, oder mit Namen ${f.namedEntity}` : ''}.` },
      { q: `Und in einer URL?`, a: f.urlEncoded === f.char ? 'Es kann so bleiben — dieses Zeichen braucht keine Kodierung.' : `Es wird als ${f.urlEncoded} kodiert.` },
      f.kind === 'control'
        ? { q: `Wie tippt man ${f.label}?`, a: `${f.ctrl}${f.escape ? `. In einer Zeichenkette schreibt man ${f.escape}` : ''}.` }
        : { q: `Hat ${f.label} einen Partner?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)} — die Codes liegen 32 auseinander.` : `Keinen Fallpartner: Es ist kein Buchstabe, sondern ${f.kind === 'digit' ? 'eine Ziffer' : 'ein Zeichen'}.` },
    ],
    f => [
      { q: `Quel est le code ASCII de ${f.label} ?`, a: `Décimal ${f.code}, hex ${f.hex}, octal ${f.oct}, binaire ${f.bin}.` },
      { q: `Comment écrire ${f.label} en HTML ?`, a: `Avec ${f.entity}${f.namedEntity ? `, ou par son nom ${f.namedEntity}` : ''}.` },
      { q: `Et dans une URL ?`, a: f.urlEncoded === f.char ? 'Il peut rester tel quel : ce caractère n’a pas besoin d’encodage.' : `Il s’encode en ${f.urlEncoded}.` },
      f.kind === 'control'
        ? { q: `Comment taper ${f.label} ?`, a: `${f.ctrl}${f.escape ? `. Dans une chaîne, on écrit ${f.escape}` : ''}.` }
        : { q: `${f.label} a-t-il un partenaire ?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)} — les codes sont à 32 d’écart.` : `Pas de partenaire de casse : ce n’est pas une lettre mais ${f.kind === 'digit' ? 'un chiffre' : 'un signe'}.` },
    ],
    f => [
      { q: `${f.label} का ASCII कोड क्या है?`, a: `दशमलव ${f.code}, हेक्स ${f.hex}, अष्टाधारी ${f.oct}, द्विआधारी ${f.bin}।` },
      { q: `${f.label} को HTML में कैसे लिखें?`, a: `${f.entity} के रूप में${f.namedEntity ? `, या नाम से ${f.namedEntity}` : ''}।` },
      { q: `URL में कैसे जाता है?`, a: f.urlEncoded === f.char ? 'वैसे ही रह सकता है — इस वर्ण को एन्कोडिंग नहीं चाहिए।' : `${f.urlEncoded} के रूप में एन्कोड होता है।` },
      f.kind === 'control'
        ? { q: `${f.label} कैसे टाइप करें?`, a: `${f.ctrl}${f.escape ? `। स्ट्रिंग में इसे ${f.escape} लिखते हैं` : ''}।` }
        : { q: `क्या ${f.label} का कोई जोड़ा है?`, a: f.pair !== undefined ? `${String.fromCharCode(f.pair)} — कोड 32 दूर हैं।` : `केस जोड़ा नहीं है: यह अक्षर नहीं, ${f.kind === 'digit' ? 'अंक' : 'चिह्न'} है।` },
    ],
    f => [
      { q: `${f.label} 的 ASCII 码是多少？`, a: `十进制 ${f.code}，十六进制 ${f.hex}，八进制 ${f.oct}，二进制 ${f.bin}。` },
      { q: `${f.label} 在 HTML 里怎么写？`, a: `写成 ${f.entity}${f.namedEntity ? `，也可以用名字 ${f.namedEntity}` : ''}。` },
      { q: `放进网址里呢？`, a: f.urlEncoded === f.char ? '可以原样放着——这个字符不需要编码。' : `要编码成 ${f.urlEncoded}。` },
      f.kind === 'control'
        ? { q: `${f.label} 怎么输入？`, a: `${f.ctrl}${f.escape ? `。在字符串里写作 ${f.escape}` : ''}。` }
        : { q: `${f.label} 有配对的字符吗？`, a: f.pair !== undefined ? `是 ${String.fromCharCode(f.pair)}——两者相差 32。` : `没有大小写配对，因为它不是字母，而是${f.kind === 'digit' ? '数字' : '符号'}。` },
    ],
    f => [
      { q: `${f.label} 的 ASCII 碼是多少？`, a: `十進位 ${f.code}，十六進位 ${f.hex}，八進位 ${f.oct}，二進位 ${f.bin}。` },
      { q: `${f.label} 在 HTML 裡怎麼寫？`, a: `寫成 ${f.entity}${f.namedEntity ? `，也可以用名字 ${f.namedEntity}` : ''}。` },
      { q: `放進網址裡呢？`, a: f.urlEncoded === f.char ? '可以原樣放著——這個字元不需要編碼。' : `要編碼成 ${f.urlEncoded}。` },
      f.kind === 'control'
        ? { q: `${f.label} 怎麼輸入？`, a: `${f.ctrl}${f.escape ? `。在字串裡寫作 ${f.escape}` : ''}。` }
        : { q: `${f.label} 有配對的字元嗎？`, a: f.pair !== undefined ? `是 ${String.fromCharCode(f.pair)}——兩者相差 32。` : `沒有大小寫配對，因為它不是字母，而是${f.kind === 'digit' ? '數字' : '符號'}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const ASCII_UI: L<AsciiUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<AsciiUI>;
