/**
 * 텍스트 도구 여섯(가리기·줄바꿈·세로쓰기·뒤집기·슬러그·표)의 화면 문구.
 *
 * lib/text-ui-intl.ts가 이미 구백 줄이라 새 도구는 여기 따로 둔다 — 계산을
 * lib/text-clean.ts와 lib/text-more.ts로 나눈 것과 같은 이유다.
 *
 * 여섯 다 언어에 매이지 않는 조작이라 열 언어에 모두 낸다. 주민등록번호만
 * 한국 것이라, 다른 언어에서는 그 토글의 이름을 "국가 식별번호"로 적었다.
 */
import type { TextLang } from './text-intl.ts';

export interface MaskUi {
  inputLabel: string; placeholder: string;
  name: string; nameHint: string;
  phone: string; phoneHint: string;
  rrn: string; rrnHint: string;
  card: string; cardHint: string;
  email: string; emailHint: string;
  charTitle: string;
  masked: string; outputLabel: string;
}

export interface WrapUi {
  inputLabel: string; placeholder: string;
  modeTitle: string; modes: [string, string];
  widthLabel: string; keepWords: string; keepWordsHint: string;
  lines: string; longest: string; outputLabel: string;
}

export interface VerticalUi {
  inputLabel: string; placeholder: string;
  gapTitle: string; rtl: string; rtlHint: string; outputLabel: string;
}

export interface ReverseUi {
  inputLabel: string; placeholder: string;
  unitTitle: string; units: [string, string, string]; outputLabel: string;
}

export interface SlugUi {
  inputLabel: string; placeholder: string;
  sepTitle: string; lower: string; romanize: string; romanizeHint: string;
  maxTitle: string; noLimit: string; outputLabel: string;
}

export interface TableUi {
  inputLabel: string; placeholder: string;
  inputTitle: string; inputs: [string, string, string, string];
  formatTitle: string;
  header: string; headerHint: string; align: string; alignHint: string;
  rows: string; cols: string; outputLabel: string;
}

export const MASK_UI: Record<TextLang, MaskUi> = {
  ko: {
    inputLabel: '가릴 글을 붙여 넣으세요', placeholder: '홍길동 010-1234-5678\nhong@example.com\n900101-1234567',
    name: '이름', nameHint: '한글 두~네 글자의 가운데를 가립니다',
    phone: '전화번호', phoneHint: '010-****-5678처럼 가운데만 가립니다',
    rrn: '주민등록번호', rrnHint: '성별 자리까지 남기고 뒤를 가립니다',
    card: '카드번호', cardHint: '앞뒤 네 자리만 남깁니다',
    email: '이메일', emailHint: '도메인은 남기고 아이디를 가립니다',
    charTitle: '가릴 글자', masked: '가린 개수', outputLabel: '가린 결과',
  },
  en: {
    inputLabel: 'Paste the text you want to redact', placeholder: 'John Smith 010-1234-5678\njohn@example.com\n1234-5678-9012-3456',
    name: 'Names', nameHint: 'Masks the middle of two- to four-character Korean names',
    phone: 'Phone numbers', phoneHint: 'Keeps the last four digits, hides the middle',
    rrn: 'National ID number', rrnHint: 'Korean resident registration number — keeps the date, hides the rest',
    card: 'Card numbers', cardHint: 'Keeps only the first and last four digits',
    email: 'Email addresses', emailHint: 'Keeps the domain, hides the local part',
    charTitle: 'Mask character', masked: 'Redacted', outputLabel: 'Redacted text',
  },
  es: {
    inputLabel: 'Pega el texto que quieres censurar', placeholder: 'Juan Pérez 010-1234-5678\njuan@ejemplo.com\n1234-5678-9012-3456',
    name: 'Nombres', nameHint: 'Oculta el centro de los nombres coreanos de dos a cuatro sílabas',
    phone: 'Teléfonos', phoneHint: 'Conserva los últimos cuatro dígitos y oculta el resto',
    rrn: 'Número de identidad', rrnHint: 'Número de residente coreano: conserva la fecha y oculta lo demás',
    card: 'Tarjetas', cardHint: 'Conserva solo los cuatro primeros y los cuatro últimos dígitos',
    email: 'Correos', emailHint: 'Conserva el dominio y oculta el usuario',
    charTitle: 'Carácter de máscara', masked: 'Censurados', outputLabel: 'Texto censurado',
  },
  'pt-br': {
    inputLabel: 'Cole o texto que deseja ocultar', placeholder: 'João Silva 010-1234-5678\njoao@exemplo.com\n1234-5678-9012-3456',
    name: 'Nomes', nameHint: 'Oculta o meio de nomes coreanos de duas a quatro sílabas',
    phone: 'Telefones', phoneHint: 'Mantém os últimos quatro dígitos e esconde o meio',
    rrn: 'Número de identidade', rrnHint: 'Registro de residente coreano: mantém a data e esconde o resto',
    card: 'Cartões', cardHint: 'Mantém apenas os quatro primeiros e os quatro últimos dígitos',
    email: 'E-mails', emailHint: 'Mantém o domínio e esconde o usuário',
    charTitle: 'Caractere de máscara', masked: 'Ocultados', outputLabel: 'Texto ocultado',
  },
  ja: {
    inputLabel: '伏せたい文章を貼り付けてください', placeholder: '山田太郎 010-1234-5678\nyamada@example.com\n1234-5678-9012-3456',
    name: '氏名', nameHint: '2〜4文字の韓国語の名前の中央を伏せます',
    phone: '電話番号', phoneHint: '下4桁を残して中央を伏せます',
    rrn: '身分証番号', rrnHint: '韓国の住民登録番号。日付を残して後半を伏せます',
    card: 'カード番号', cardHint: '先頭と末尾の4桁だけ残します',
    email: 'メールアドレス', emailHint: 'ドメインを残してユーザー名を伏せます',
    charTitle: '伏せ字', masked: '伏せた数', outputLabel: '伏せた結果',
  },
  de: {
    inputLabel: 'Text einfügen, der geschwärzt werden soll', placeholder: 'Max Mustermann 010-1234-5678\nmax@beispiel.de\n1234-5678-9012-3456',
    name: 'Namen', nameHint: 'Schwärzt die Mitte koreanischer Namen mit zwei bis vier Silben',
    phone: 'Telefonnummern', phoneHint: 'Behält die letzten vier Ziffern, verdeckt die Mitte',
    rrn: 'Ausweisnummer', rrnHint: 'Koreanische Meldenummer — Datum bleibt, der Rest wird verdeckt',
    card: 'Kartennummern', cardHint: 'Behält nur die ersten und letzten vier Ziffern',
    email: 'E-Mail-Adressen', emailHint: 'Behält die Domain, verdeckt den Benutzernamen',
    charTitle: 'Platzhalterzeichen', masked: 'Geschwärzt', outputLabel: 'Geschwärzter Text',
  },
  fr: {
    inputLabel: 'Collez le texte à masquer', placeholder: 'Jean Dupont 010-1234-5678\njean@exemple.fr\n1234-5678-9012-3456',
    name: 'Noms', nameHint: 'Masque le milieu des noms coréens de deux à quatre syllabes',
    phone: 'Numéros de téléphone', phoneHint: 'Garde les quatre derniers chiffres et masque le milieu',
    rrn: 'Numéro d’identité', rrnHint: 'Numéro de résident coréen : garde la date et masque le reste',
    card: 'Numéros de carte', cardHint: 'Ne garde que les quatre premiers et quatre derniers chiffres',
    email: 'Adresses e-mail', emailHint: 'Garde le domaine et masque l’identifiant',
    charTitle: 'Caractère de masque', masked: 'Masqués', outputLabel: 'Texte masqué',
  },
  hi: {
    inputLabel: 'जिस पाठ को छिपाना है उसे चिपकाएँ', placeholder: 'राहुल शर्मा 010-1234-5678\nrahul@example.com\n1234-5678-9012-3456',
    name: 'नाम', nameHint: 'दो से चार अक्षर वाले कोरियाई नामों का बीच छिपाता है',
    phone: 'फ़ोन नंबर', phoneHint: 'आख़िरी चार अंक रखता है, बीच छिपाता है',
    rrn: 'पहचान संख्या', rrnHint: 'कोरियाई निवासी संख्या — तारीख़ रखता है, बाक़ी छिपाता है',
    card: 'कार्ड नंबर', cardHint: 'केवल पहले और आख़िरी चार अंक रखता है',
    email: 'ईमेल पते', emailHint: 'डोमेन रखता है, उपयोक्ता नाम छिपाता है',
    charTitle: 'छिपाने का चिह्न', masked: 'छिपाए गए', outputLabel: 'छिपाया गया पाठ',
  },
  'zh-hans': {
    inputLabel: '粘贴需要遮蔽的文字', placeholder: '张伟 010-1234-5678\nzhang@example.com\n1234-5678-9012-3456',
    name: '姓名', nameHint: '遮蔽两到四字韩文姓名的中间部分',
    phone: '电话号码', phoneHint: '保留后四位，遮蔽中间',
    rrn: '身份证号', rrnHint: '韩国居民登记号——保留日期，遮蔽其余部分',
    card: '卡号', cardHint: '只保留前四位和后四位',
    email: '电子邮箱', emailHint: '保留域名，遮蔽用户名',
    charTitle: '遮蔽字符', masked: '已遮蔽', outputLabel: '遮蔽结果',
  },
  'zh-hant': {
    inputLabel: '貼上需要遮蔽的文字', placeholder: '張偉 010-1234-5678\nzhang@example.com\n1234-5678-9012-3456',
    name: '姓名', nameHint: '遮蔽兩到四字韓文姓名的中間部分',
    phone: '電話號碼', phoneHint: '保留後四位，遮蔽中間',
    rrn: '身分證號', rrnHint: '韓國居民登記號——保留日期，遮蔽其餘部分',
    card: '卡號', cardHint: '只保留前四位與後四位',
    email: '電子郵件', emailHint: '保留網域，遮蔽使用者名稱',
    charTitle: '遮蔽字元', masked: '已遮蔽', outputLabel: '遮蔽結果',
  },
};

export const WRAP_UI: Record<TextLang, WrapUi> = {
  ko: {
    inputLabel: '정리할 글을 붙여 넣으세요', placeholder: '문단 안에서 줄이 끊긴 글을 붙여 넣으면\n한 문단으로 이어 붙입니다.',
    modeTitle: '무엇을 할까요', modes: ['폭에 맞춰 접기', '끊긴 줄 이어 붙이기'],
    widthLabel: '한 줄 글자 수', keepWords: '낱말 중간에서 자르지 않기', keepWordsHint: '접을 자리가 없으면 그냥 자릅니다',
    lines: '줄 수', longest: '가장 긴 줄', outputLabel: '정리된 글',
  },
  en: {
    inputLabel: 'Paste the text you want to reflow', placeholder: 'Paste text whose lines break\nin the middle of a paragraph\nand it joins them back up.',
    modeTitle: 'What should it do', modes: ['Wrap to a width', 'Join broken lines'],
    widthLabel: 'Characters per line', keepWords: 'Never split a word', keepWordsHint: 'Falls back to a hard cut when there is nowhere to break',
    lines: 'Lines', longest: 'Longest line', outputLabel: 'Reflowed text',
  },
  es: {
    inputLabel: 'Pega el texto que quieres reajustar', placeholder: 'Pega texto cuyas líneas se cortan\nen medio de un párrafo\ny las vuelve a unir.',
    modeTitle: 'Qué hacer', modes: ['Ajustar a un ancho', 'Unir líneas cortadas'],
    widthLabel: 'Caracteres por línea', keepWords: 'No partir palabras', keepWordsHint: 'Corta igualmente si no hay dónde partir',
    lines: 'Líneas', longest: 'Línea más larga', outputLabel: 'Texto reajustado',
  },
  'pt-br': {
    inputLabel: 'Cole o texto que deseja reorganizar', placeholder: 'Cole um texto cujas linhas quebram\nno meio do parágrafo\ne ele volta a juntá-las.',
    modeTitle: 'O que fazer', modes: ['Quebrar em uma largura', 'Juntar linhas quebradas'],
    widthLabel: 'Caracteres por linha', keepWords: 'Nunca dividir uma palavra', keepWordsHint: 'Corta mesmo assim quando não há onde quebrar',
    lines: 'Linhas', longest: 'Linha mais longa', outputLabel: 'Texto reorganizado',
  },
  ja: {
    inputLabel: '整えたい文章を貼り付けてください', placeholder: '段落の途中で改行された文章を貼ると\n一つの段落につなぎ直します。',
    modeTitle: '何をしますか', modes: ['幅に合わせて折り返す', '切れた行をつなぐ'],
    widthLabel: '1行の文字数', keepWords: '単語の途中で切らない', keepWordsHint: '切る場所がなければそのまま切ります',
    lines: '行数', longest: '最長の行', outputLabel: '整えた文章',
  },
  de: {
    inputLabel: 'Text einfügen, der neu umbrochen werden soll', placeholder: 'Text einfügen, dessen Zeilen mitten\nim Absatz umbrechen — er wird\nwieder zusammengefügt.',
    modeTitle: 'Was soll passieren', modes: ['Auf eine Breite umbrechen', 'Zerrissene Zeilen zusammenfügen'],
    widthLabel: 'Zeichen pro Zeile', keepWords: 'Wörter nie trennen', keepWordsHint: 'Trennt trotzdem, wenn es keine Umbruchstelle gibt',
    lines: 'Zeilen', longest: 'Längste Zeile', outputLabel: 'Umbrochener Text',
  },
  fr: {
    inputLabel: 'Collez le texte à remettre en forme', placeholder: 'Collez un texte dont les lignes\nse coupent au milieu d’un paragraphe :\nelles seront rejointes.',
    modeTitle: 'Que faire', modes: ['Couper à une largeur', 'Rejoindre les lignes coupées'],
    widthLabel: 'Caractères par ligne', keepWords: 'Ne jamais couper un mot', keepWordsHint: 'Coupe quand même s’il n’y a pas d’endroit où couper',
    lines: 'Lignes', longest: 'Ligne la plus longue', outputLabel: 'Texte remis en forme',
  },
  hi: {
    inputLabel: 'जिस पाठ को व्यवस्थित करना है उसे चिपकाएँ', placeholder: 'ऐसा पाठ चिपकाएँ जिसकी पंक्तियाँ\nअनुच्छेद के बीच टूटती हैं —\nयह उन्हें फिर से जोड़ देगा।',
    modeTitle: 'क्या करना है', modes: ['चौड़ाई के अनुसार तोड़ें', 'टूटी पंक्तियाँ जोड़ें'],
    widthLabel: 'प्रति पंक्ति अक्षर', keepWords: 'शब्द बीच में न तोड़ें', keepWordsHint: 'तोड़ने की जगह न हो तो फिर भी काटता है',
    lines: 'पंक्तियाँ', longest: 'सबसे लंबी पंक्ति', outputLabel: 'व्यवस्थित पाठ',
  },
  'zh-hans': {
    inputLabel: '粘贴需要重排的文字', placeholder: '粘贴段落中间被换行打断的文字，\n它会重新接成一段。',
    modeTitle: '要做什么', modes: ['按宽度换行', '把断开的行接起来'],
    widthLabel: '每行字数', keepWords: '不在词中间断开', keepWordsHint: '没有可断处时仍会直接切断',
    lines: '行数', longest: '最长的行', outputLabel: '重排结果',
  },
  'zh-hant': {
    inputLabel: '貼上需要重排的文字', placeholder: '貼上段落中間被換行打斷的文字，\n它會重新接成一段。',
    modeTitle: '要做什麼', modes: ['按寬度換行', '把斷開的行接起來'],
    widthLabel: '每行字數', keepWords: '不在詞中間斷開', keepWordsHint: '沒有可斷處時仍會直接切斷',
    lines: '行數', longest: '最長的行', outputLabel: '重排結果',
  },
};

export const VERTICAL_UI: Record<TextLang, VerticalUi> = {
  ko: {
    inputLabel: '세로로 세울 글을 입력하세요', placeholder: '가나다라\n마바사아',
    gapTitle: '줄 사이 칸', rtl: '오른쪽에서 왼쪽으로', rtlHint: '전통 세로쓰기 차례입니다', outputLabel: '세로쓰기',
  },
  en: {
    inputLabel: 'Type the text to stand up vertically', placeholder: 'HELLO\nWORLD',
    gapTitle: 'Gap between columns', rtl: 'Right to left', rtlHint: 'The traditional vertical order', outputLabel: 'Vertical text',
  },
  es: {
    inputLabel: 'Escribe el texto para ponerlo en vertical', placeholder: 'HOLA\nMUNDO',
    gapTitle: 'Espacio entre columnas', rtl: 'De derecha a izquierda', rtlHint: 'El orden vertical tradicional', outputLabel: 'Texto vertical',
  },
  'pt-br': {
    inputLabel: 'Escreva o texto para ficar na vertical', placeholder: 'OLA\nMUNDO',
    gapTitle: 'Espaço entre colunas', rtl: 'Da direita para a esquerda', rtlHint: 'A ordem vertical tradicional', outputLabel: 'Texto vertical',
  },
  ja: {
    inputLabel: '縦にする文章を入力してください', placeholder: 'あいうえ\nかきくけ',
    gapTitle: '行間の空き', rtl: '右から左へ', rtlHint: '伝統的な縦書きの順です', outputLabel: '縦書き',
  },
  de: {
    inputLabel: 'Text eingeben, der senkrecht stehen soll', placeholder: 'HALLO\nWELT',
    gapTitle: 'Abstand zwischen Spalten', rtl: 'Von rechts nach links', rtlHint: 'Die traditionelle senkrechte Reihenfolge', outputLabel: 'Senkrechter Text',
  },
  fr: {
    inputLabel: 'Saisissez le texte à dresser à la verticale', placeholder: 'BONJOUR\nMONDE',
    gapTitle: 'Espace entre les colonnes', rtl: 'De droite à gauche', rtlHint: 'L’ordre vertical traditionnel', outputLabel: 'Texte vertical',
  },
  hi: {
    inputLabel: 'लंबवत करने के लिए पाठ लिखें', placeholder: 'नमस्ते\nदुनिया',
    gapTitle: 'स्तंभों के बीच जगह', rtl: 'दाएँ से बाएँ', rtlHint: 'पारंपरिक लंबवत क्रम', outputLabel: 'लंबवत पाठ',
  },
  'zh-hans': {
    inputLabel: '输入要竖排的文字', placeholder: '春眠不觉\n处处闻啼',
    gapTitle: '列间空格', rtl: '从右到左', rtlHint: '传统竖排顺序', outputLabel: '竖排结果',
  },
  'zh-hant': {
    inputLabel: '輸入要直排的文字', placeholder: '春眠不覺\n處處聞啼',
    gapTitle: '欄間空格', rtl: '從右到左', rtlHint: '傳統直排順序', outputLabel: '直排結果',
  },
};

export const REVERSE_UI: Record<TextLang, ReverseUi> = {
  ko: {
    inputLabel: '뒤집을 글을 입력하세요', placeholder: '안녕하세요 반갑습니다',
    unitTitle: '무엇을 뒤집을까요', units: ['글자', '낱말', '줄'], outputLabel: '뒤집은 글',
  },
  en: {
    inputLabel: 'Type the text to reverse', placeholder: 'Hello there, nice to meet you',
    unitTitle: 'What to reverse', units: ['Characters', 'Words', 'Lines'], outputLabel: 'Reversed text',
  },
  es: {
    inputLabel: 'Escribe el texto a invertir', placeholder: 'Hola, encantado de conocerte',
    unitTitle: 'Qué invertir', units: ['Caracteres', 'Palabras', 'Líneas'], outputLabel: 'Texto invertido',
  },
  'pt-br': {
    inputLabel: 'Escreva o texto a inverter', placeholder: 'Olá, prazer em conhecer você',
    unitTitle: 'O que inverter', units: ['Caracteres', 'Palavras', 'Linhas'], outputLabel: 'Texto invertido',
  },
  ja: {
    inputLabel: '逆にする文章を入力してください', placeholder: 'こんにちは はじめまして',
    unitTitle: '何を逆にしますか', units: ['文字', '単語', '行'], outputLabel: '逆さ文',
  },
  de: {
    inputLabel: 'Text zum Umkehren eingeben', placeholder: 'Hallo, schön dich kennenzulernen',
    unitTitle: 'Was umkehren', units: ['Zeichen', 'Wörter', 'Zeilen'], outputLabel: 'Umgekehrter Text',
  },
  fr: {
    inputLabel: 'Saisissez le texte à inverser', placeholder: 'Bonjour, ravi de vous rencontrer',
    unitTitle: 'Quoi inverser', units: ['Caractères', 'Mots', 'Lignes'], outputLabel: 'Texte inversé',
  },
  hi: {
    inputLabel: 'उलटने के लिए पाठ लिखें', placeholder: 'नमस्ते, आपसे मिलकर अच्छा लगा',
    unitTitle: 'क्या उलटना है', units: ['अक्षर', 'शब्द', 'पंक्तियाँ'], outputLabel: 'उलटा पाठ',
  },
  'zh-hans': {
    inputLabel: '输入要倒转的文字', placeholder: '你好 很高兴认识你',
    unitTitle: '倒转什么', units: ['字符', '词', '行'], outputLabel: '倒转结果',
  },
  'zh-hant': {
    inputLabel: '輸入要倒轉的文字', placeholder: '你好 很高興認識你',
    unitTitle: '倒轉什麼', units: ['字元', '詞', '行'], outputLabel: '倒轉結果',
  },
};

export const SLUG_UI: Record<TextLang, SlugUi> = {
  ko: {
    inputLabel: '주소로 만들 제목을 입력하세요', placeholder: '안녕하세요 첫 번째 글입니다!',
    sepTitle: '잇는 글자', lower: '소문자로', romanize: '한글을 로마자로', romanizeHint: '끄면 한글이 그대로 남아 주소창에서 %로 바뀝니다',
    maxTitle: '최대 길이', noLimit: '제한 없음', outputLabel: '슬러그',
  },
  en: {
    inputLabel: 'Type the title to turn into a URL', placeholder: 'Hello World — my first post!',
    sepTitle: 'Word separator', lower: 'Lowercase', romanize: 'Romanise Korean', romanizeHint: 'Off leaves Hangul in place, which the address bar turns into %-escapes',
    maxTitle: 'Maximum length', noLimit: 'No limit', outputLabel: 'Slug',
  },
  es: {
    inputLabel: 'Escribe el título para convertir en URL', placeholder: '¡Hola mundo — mi primera entrada!',
    sepTitle: 'Separador de palabras', lower: 'Minúsculas', romanize: 'Romanizar el coreano', romanizeHint: 'Si lo desactivas, el hangul queda tal cual y la barra de direcciones lo convierte en %',
    maxTitle: 'Longitud máxima', noLimit: 'Sin límite', outputLabel: 'Slug',
  },
  'pt-br': {
    inputLabel: 'Escreva o título para virar URL', placeholder: 'Olá mundo — meu primeiro post!',
    sepTitle: 'Separador de palavras', lower: 'Minúsculas', romanize: 'Romanizar o coreano', romanizeHint: 'Desligado, o hangul permanece e a barra de endereços o converte em %',
    maxTitle: 'Comprimento máximo', noLimit: 'Sem limite', outputLabel: 'Slug',
  },
  ja: {
    inputLabel: 'URLにする題名を入力してください', placeholder: 'こんにちは — 最初の記事です！',
    sepTitle: '区切り文字', lower: '小文字にする', romanize: '韓国語をローマ字に', romanizeHint: 'オフにするとハングルがそのまま残り、アドレス欄で%になります',
    maxTitle: '最大の長さ', noLimit: '制限なし', outputLabel: 'スラッグ',
  },
  de: {
    inputLabel: 'Titel eingeben, der zur URL werden soll', placeholder: 'Hallo Welt — mein erster Beitrag!',
    sepTitle: 'Worttrenner', lower: 'Kleinschreibung', romanize: 'Koreanisch umschreiben', romanizeHint: 'Aus lässt Hangul stehen, was die Adressleiste in %-Codes umwandelt',
    maxTitle: 'Maximale Länge', noLimit: 'Ohne Begrenzung', outputLabel: 'Slug',
  },
  fr: {
    inputLabel: 'Saisissez le titre à transformer en URL', placeholder: 'Bonjour le monde — mon premier billet !',
    sepTitle: 'Séparateur de mots', lower: 'Minuscules', romanize: 'Romaniser le coréen', romanizeHint: 'Désactivé, le hangul reste tel quel et la barre d’adresse le convertit en %',
    maxTitle: 'Longueur maximale', noLimit: 'Sans limite', outputLabel: 'Slug',
  },
  hi: {
    inputLabel: 'URL बनाने के लिए शीर्षक लिखें', placeholder: 'नमस्ते दुनिया — मेरी पहली पोस्ट!',
    sepTitle: 'शब्द विभाजक', lower: 'छोटे अक्षर', romanize: 'कोरियाई को रोमन में', romanizeHint: 'बंद करने पर हंगुल वैसा ही रहता है और पता-पट्टी उसे % में बदल देती है',
    maxTitle: 'अधिकतम लंबाई', noLimit: 'कोई सीमा नहीं', outputLabel: 'स्लग',
  },
  'zh-hans': {
    inputLabel: '输入要转成网址的标题', placeholder: '你好世界 — 我的第一篇文章！',
    sepTitle: '连接符', lower: '转为小写', romanize: '韩文转罗马字', romanizeHint: '关闭后韩文原样保留，地址栏会把它变成%编码',
    maxTitle: '最大长度', noLimit: '不限制', outputLabel: '别名',
  },
  'zh-hant': {
    inputLabel: '輸入要轉成網址的標題', placeholder: '你好世界 — 我的第一篇文章！',
    sepTitle: '連接符', lower: '轉為小寫', romanize: '韓文轉羅馬字', romanizeHint: '關閉後韓文原樣保留，網址列會把它變成%編碼',
    maxTitle: '最大長度', noLimit: '不限制', outputLabel: '別名',
  },
};

export const TABLE_UI: Record<TextLang, TableUi> = {
  ko: {
    inputLabel: '표로 만들 자료를 붙여 넣으세요', placeholder: '이름\t나이\t지역\n김철수\t30\t서울\n이영희\t28\t부산',
    inputTitle: '나뉜 방식', inputs: ['알아서', '탭', '쉼표', '두 칸 이상 공백'],
    formatTitle: '만들 꼴',
    header: '첫 줄이 제목 줄', headerHint: '끄면 열1·열2로 제목을 만들어 줍니다',
    align: '칸 너비 맞추기', alignHint: '소스도 표처럼 보이게 여백을 채웁니다',
    rows: '줄', cols: '열', outputLabel: '만들어진 표',
  },
  en: {
    inputLabel: 'Paste the data to turn into a table', placeholder: 'Name\tAge\tCity\nAlice\t30\tSeoul\nBob\t28\tBusan',
    inputTitle: 'How it is separated', inputs: ['Detect', 'Tab', 'Comma', 'Two or more spaces'],
    formatTitle: 'Output format',
    header: 'First row is the header', headerHint: 'Off builds Column 1, Column 2 headers for you',
    align: 'Pad columns to equal width', alignHint: 'Makes the source itself line up like a table',
    rows: 'Rows', cols: 'Columns', outputLabel: 'Generated table',
  },
  es: {
    inputLabel: 'Pega los datos para convertir en tabla', placeholder: 'Nombre\tEdad\tCiudad\nAna\t30\tMadrid\nBruno\t28\tLima',
    inputTitle: 'Cómo está separado', inputs: ['Detectar', 'Tabulador', 'Coma', 'Dos o más espacios'],
    formatTitle: 'Formato de salida',
    header: 'La primera fila es el encabezado', headerHint: 'Si lo desactivas, crea Columna 1, Columna 2',
    align: 'Igualar el ancho de las columnas', alignHint: 'Hace que el propio código se vea como una tabla',
    rows: 'Filas', cols: 'Columnas', outputLabel: 'Tabla generada',
  },
  'pt-br': {
    inputLabel: 'Cole os dados para virar tabela', placeholder: 'Nome\tIdade\tCidade\nAna\t30\tSão Paulo\nBruno\t28\tRecife',
    inputTitle: 'Como está separado', inputs: ['Detectar', 'Tabulação', 'Vírgula', 'Dois ou mais espaços'],
    formatTitle: 'Formato de saída',
    header: 'A primeira linha é o cabeçalho', headerHint: 'Desligado, cria Coluna 1, Coluna 2',
    align: 'Igualar a largura das colunas', alignHint: 'Faz o próprio código parecer uma tabela',
    rows: 'Linhas', cols: 'Colunas', outputLabel: 'Tabela gerada',
  },
  ja: {
    inputLabel: '表にしたいデータを貼り付けてください', placeholder: '名前\t年齢\t地域\n山田\t30\t東京\n鈴木\t28\t大阪',
    inputTitle: '区切り方', inputs: ['自動判別', 'タブ', 'カンマ', '2つ以上の空白'],
    formatTitle: '出力形式',
    header: '1行目が見出し', headerHint: 'オフにすると列1・列2の見出しを作ります',
    align: '桁幅をそろえる', alignHint: 'ソースそのものが表のように見えます',
    rows: '行', cols: '列', outputLabel: 'できた表',
  },
  de: {
    inputLabel: 'Daten einfügen, die zur Tabelle werden sollen', placeholder: 'Name\tAlter\tStadt\nAnna\t30\tBerlin\nBernd\t28\tKöln',
    inputTitle: 'Wie es getrennt ist', inputs: ['Erkennen', 'Tabulator', 'Komma', 'Zwei oder mehr Leerzeichen'],
    formatTitle: 'Ausgabeformat',
    header: 'Erste Zeile ist die Kopfzeile', headerHint: 'Aus erzeugt Spalte 1, Spalte 2 als Kopf',
    align: 'Spalten auf gleiche Breite bringen', alignHint: 'Lässt schon den Quelltext wie eine Tabelle aussehen',
    rows: 'Zeilen', cols: 'Spalten', outputLabel: 'Erzeugte Tabelle',
  },
  fr: {
    inputLabel: 'Collez les données à transformer en tableau', placeholder: 'Nom\tÂge\tVille\nAnne\t30\tParis\nBruno\t28\tLyon',
    inputTitle: 'Comment c’est séparé', inputs: ['Détecter', 'Tabulation', 'Virgule', 'Deux espaces ou plus'],
    formatTitle: 'Format de sortie',
    header: 'La première ligne est l’en-tête', headerHint: 'Désactivé, il crée Colonne 1, Colonne 2',
    align: 'Égaliser la largeur des colonnes', alignHint: 'Fait que la source elle-même ressemble à un tableau',
    rows: 'Lignes', cols: 'Colonnes', outputLabel: 'Tableau généré',
  },
  hi: {
    inputLabel: 'तालिका बनाने के लिए डेटा चिपकाएँ', placeholder: 'नाम\tउम्र\tशहर\nराहुल\t30\tदिल्ली\nप्रिया\t28\tमुंबई',
    inputTitle: 'कैसे अलग किया गया है', inputs: ['स्वतः पहचानें', 'टैब', 'अल्पविराम', 'दो या अधिक रिक्त स्थान'],
    formatTitle: 'आउटपुट प्रारूप',
    header: 'पहली पंक्ति शीर्षक है', headerHint: 'बंद करने पर स्तंभ 1, स्तंभ 2 बना देता है',
    align: 'स्तंभों की चौड़ाई बराबर करें', alignHint: 'स्रोत भी तालिका जैसा दिखने लगता है',
    rows: 'पंक्तियाँ', cols: 'स्तंभ', outputLabel: 'बनी तालिका',
  },
  'zh-hans': {
    inputLabel: '粘贴要做成表格的数据', placeholder: '姓名\t年龄\t城市\n张伟\t30\t北京\n李娜\t28\t上海',
    inputTitle: '分隔方式', inputs: ['自动识别', '制表符', '逗号', '两个以上空格'],
    formatTitle: '输出格式',
    header: '第一行是表头', headerHint: '关闭后自动生成"列1、列2"表头',
    align: '把各列补到同宽', alignHint: '让源码本身看起来也像表格',
    rows: '行', cols: '列', outputLabel: '生成的表格',
  },
  'zh-hant': {
    inputLabel: '貼上要做成表格的資料', placeholder: '姓名\t年齡\t城市\n張偉\t30\t臺北\n李娜\t28\t高雄',
    inputTitle: '分隔方式', inputs: ['自動辨識', '定位字元', '逗號', '兩個以上空格'],
    formatTitle: '輸出格式',
    header: '第一列是標題列', headerHint: '關閉後自動產生「欄1、欄2」標題',
    align: '把各欄補到同寬', alignHint: '讓原始碼本身看起來也像表格',
    rows: '列', cols: '欄', outputLabel: '產生的表格',
  },
};
