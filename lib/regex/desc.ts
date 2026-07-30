/**
 * 식마다 "무엇에 맞는가"를 한 마디로 — 여덟 언어.
 *
 * 문장 전체를 133개 × 여덟 언어로 적으면 천 줄이 넘고, 그중 한 줄이 식과
 * 어긋나도 아무도 못 잡는다. 그래서 여기에는 대상만 적는다. "앞뒤가 묶여
 * 통째로 맞아야 한다", "잡는 묶음이 둘이다" 같은 말은 식에서 계산해 붙인다
 * (ui.ts). 계산으로 나오는 말은 틀릴 수가 없다.
 */
import { LANG8_CODES, type Lang8 } from '../i18n/lang8.ts';

/** ko·en·es·pt·ja·de·fr·hi 여덟 칸 */
export type Eight = [string, string, string, string, string, string, string, string];

export const WHAT: Record<string, Eight> = {
  /* ── 문자 하나를 가리키는 표기 ── */
  digit: ['숫자 한 글자', 'a single digit', 'un dígito', 'um dígito', '数字1文字', 'eine Ziffer', 'un chiffre', 'एक अंक'],
  'non-digit': ['숫자가 아닌 글자', 'anything but a digit', 'todo menos un dígito', 'tudo menos um dígito', '数字以外の文字', 'alles außer einer Ziffer', 'tout sauf un chiffre', 'अंक के अलावा कुछ भी'],
  'word-char': ['글자·숫자·밑줄', 'a letter, digit or underscore', 'letra, dígito o guion bajo', 'letra, dígito ou sublinhado', '英数字とアンダースコア', 'Buchstabe, Ziffer oder Unterstrich', 'lettre, chiffre ou tiret bas', 'अक्षर, अंक या अंडरस्कोर'],
  'non-word-char': ['글자·숫자·밑줄이 아닌 것', 'anything that is not a word character', 'lo que no es carácter de palabra', 'o que não é caractere de palavra', '英数字とアンダースコア以外', 'kein Wortzeichen', 'tout sauf un caractère de mot', 'शब्द-वर्ण के अलावा'],
  whitespace: ['공백 한 칸', 'a whitespace character', 'un espacio en blanco', 'um espaço em branco', '空白1文字', 'ein Leerraumzeichen', 'un caractère blanc', 'एक रिक्त स्थान'],
  'non-whitespace': ['공백이 아닌 글자', 'anything but whitespace', 'todo menos un espacio', 'tudo menos um espaço', '空白以外の文字', 'alles außer Leerraum', 'tout sauf un blanc', 'रिक्त स्थान के अलावा'],
  'any-char': ['아무 글자 하나', 'any single character', 'un carácter cualquiera', 'um caractere qualquer', '任意の1文字', 'ein beliebiges Zeichen', "n'importe quel caractère", 'कोई भी एक वर्ण'],
  'lower-range': ['영어 소문자만', 'lowercase letters only', 'solo minúsculas', 'só minúsculas', '英小文字だけ', 'nur Kleinbuchstaben', 'minuscules seulement', 'सिर्फ़ छोटे अक्षर'],
  'upper-range': ['영어 대문자만', 'uppercase letters only', 'solo mayúsculas', 'só maiúsculas', '英大文字だけ', 'nur Großbuchstaben', 'majuscules seulement', 'सिर्फ़ बड़े अक्षर'],
  'alnum-class': ['영문자와 숫자만', 'letters and digits only', 'solo letras y dígitos', 'só letras e dígitos', '英数字だけ', 'nur Buchstaben und Ziffern', 'lettres et chiffres seulement', 'सिर्फ़ अक्षर और अंक'],
  'negated-class': ['숫자가 하나도 없는 글', 'text with no digits at all', 'texto sin ningún dígito', 'texto sem nenhum dígito', '数字を含まない文字列', 'Text ganz ohne Ziffern', 'texte sans aucun chiffre', 'बिना किसी अंक वाला पाठ'],
  'hangul-range': ['한글만', 'Hangul only', 'solo hangul', 'só hangul', 'ハングルだけ', 'nur Hangeul', 'hangeul seulement', 'सिर्फ़ हंगुल'],
  'kana-range': ['가나만', 'kana only', 'solo kana', 'só kana', 'かなだけ', 'nur Kana', 'kana seulement', 'सिर्फ़ काना'],
  'cjk-range': ['한자만', 'Chinese characters only', 'solo caracteres chinos', 'só caracteres chineses', '漢字だけ', 'nur chinesische Zeichen', 'sinogrammes seulement', 'सिर्फ़ चीनी वर्ण'],
  'escaped-dot': ['점 자체', 'a literal dot', 'un punto literal', 'um ponto literal', 'ピリオドそのもの', 'ein echter Punkt', 'un point littéral', 'वास्तविक बिंदु'],
  'escaped-slash': ['빗금이 들어간 글', 'a literal forward slash', 'una barra literal', 'uma barra literal', 'スラッシュそのもの', 'ein echter Schrägstrich', 'une barre oblique littérale', 'वास्तविक स्लैश'],
  tab: ['탭 문자', 'a tab character', 'un tabulador', 'uma tabulação', 'タブ文字', 'ein Tabulator', 'une tabulation', 'एक टैब'],
  newline: ['줄바꿈 문자', 'a line break', 'un salto de línea', 'uma quebra de linha', '改行文字', 'ein Zeilenumbruch', 'un saut de ligne', 'एक लाइन ब्रेक'],
  'carriage-return': ['윈도식 줄바꿈', 'a Windows line ending', 'un fin de línea de Windows', 'uma quebra de linha do Windows', 'Windows形式の改行', 'ein Windows-Zeilenende', 'une fin de ligne Windows', 'विंडोज़ की लाइन ब्रेक'],
  'unicode-escape': ['코드로 적은 글자', 'a character written by code point', 'un carácter escrito por punto de código', 'um caractere escrito por ponto de código', 'コードで書いた文字', 'ein per Codepunkt geschriebenes Zeichen', 'un caractère écrit par point de code', 'कोड पॉइंट से लिखा वर्ण'],
  'start-anchor': ['이 말로 시작하는 글', 'text that starts with this word', 'texto que empieza por esta palabra', 'texto que começa com esta palavra', 'この語で始まる文字列', 'Text, der so beginnt', 'texte qui commence par ce mot', 'इस शब्द से शुरू होता पाठ'],
  'end-anchor': ['이 말로 끝나는 글', 'text that ends with this word', 'texto que termina en esta palabra', 'texto que termina nesta palavra', 'この語で終わる文字列', 'Text, der so endet', 'texte qui finit par ce mot', 'इस शब्द से ख़त्म होता पाठ'],
  'whole-string': ['이 말 하나뿐인 글', 'exactly this word and nothing else', 'exactamente esta palabra y nada más', 'exatamente esta palavra e nada mais', 'この語だけの文字列', 'genau dieses Wort und sonst nichts', 'exactement ce mot et rien de plus', 'ठीक यही शब्द, और कुछ नहीं'],
  'word-boundary': ['낱말로 떨어진 자리', 'the word on its own, not inside another', 'la palabra suelta, no dentro de otra', 'a palavra sozinha, não dentro de outra', '単語として独立している位置', 'das Wort für sich, nicht in einem anderen', 'le mot isolé, pas à l’intérieur d’un autre', 'अलग खड़ा शब्द, किसी दूसरे के भीतर नहीं'],
  'non-boundary': ['낱말 안쪽에 붙은 자리', 'the word only inside another word', 'la palabra solo dentro de otra', 'a palavra só dentro de outra', '単語の内側にある位置', 'das Wort nur innerhalb eines anderen', 'le mot seulement à l’intérieur d’un autre', 'सिर्फ़ किसी शब्द के भीतर'],
  'case-insensitive': ['대소문자를 가리지 않는 맞춤', 'a match that ignores capitals', 'una coincidencia que ignora mayúsculas', 'uma correspondência que ignora maiúsculas', '大文字小文字を区別しない一致', 'ein Treffer ohne Rücksicht auf Groß- und Kleinschreibung', 'une correspondance insensible à la casse', 'बड़े-छोटे अक्षर की परवाह किए बिना मिलान'],
  'multiline-anchor': ['줄마다의 첫머리', 'the start of each line, not just the text', 'el inicio de cada línea, no solo del texto', 'o início de cada linha, não só do texto', '各行の先頭', 'der Anfang jeder Zeile, nicht nur des Texts', 'le début de chaque ligne, pas seulement du texte', 'हर पंक्ति की शुरुआत'],
  dotall: ['줄바꿈까지 포함한 아무 글자', 'any character, line breaks included', 'cualquier carácter, saltos de línea incluidos', 'qualquer caractere, quebras de linha incluídas', '改行も含む任意の文字', 'jedes Zeichen, auch Zeilenumbrüche', "n'importe quel caractère, sauts de ligne compris", 'हर वर्ण, लाइन ब्रेक समेत'],

  /* ── 되풀이를 정하는 표기 ── */
  star: ['없거나 여러 번', 'none or many', 'ninguna o muchas veces', 'nenhuma ou muitas vezes', '0回以上', 'keinmal oder mehrmals', 'zéro fois ou plus', 'शून्य या अधिक बार'],
  plus: ['한 번 이상', 'once or more', 'una vez o más', 'uma vez ou mais', '1回以上', 'einmal oder öfter', 'une fois ou plus', 'एक या अधिक बार'],
  question: ['있어도 되고 없어도 되는 글자', 'a letter that may or may not be there', 'una letra que puede estar o no', 'uma letra que pode estar ou não', 'あってもなくてもよい文字', 'ein Buchstabe, der da sein kann', 'une lettre facultative', 'वैकल्पिक अक्षर'],
  'exact-count': ['정확히 네 자리 숫자', 'exactly four digits', 'exactamente cuatro dígitos', 'exatamente quatro dígitos', 'ちょうど4桁', 'genau vier Ziffern', 'exactement quatre chiffres', 'ठीक चार अंक'],
  'range-count': ['두 자리에서 네 자리까지', 'between two and four digits', 'entre dos y cuatro dígitos', 'entre dois e quatro dígitos', '2桁から4桁まで', 'zwei bis vier Ziffern', 'de deux à quatre chiffres', 'दो से चार अंक'],
  'at-least': ['두 자리 이상', 'two digits or more', 'dos dígitos o más', 'dois dígitos ou mais', '2桁以上', 'zwei Ziffern oder mehr', 'deux chiffres ou plus', 'दो या अधिक अंक'],
  'lazy-tag': ['가장 짧게 잡는 태그 하나', 'one tag, taken as short as possible', 'una etiqueta, lo más corta posible', 'uma etiqueta, o mais curta possível', 'できるだけ短く取るタグ1つ', 'ein Tag, so kurz wie möglich', 'une balise, la plus courte possible', 'जितना छोटा हो सके, एक टैग'],
  'greedy-tag': ['가장 길게 잡는 한 덩어리', 'one chunk, taken as long as possible', 'un bloque, lo más largo posible', 'um bloco, o mais longo possível', 'できるだけ長く取るひと塊', 'ein Block, so lang wie möglich', 'un bloc, le plus long possible', 'जितना बड़ा हो सके, एक हिस्सा'],
  alternation: ['둘 중 하나', 'either one of two words', 'una de dos palabras', 'uma de duas palavras', '二つのうちどちらか', 'eins von zwei Wörtern', "l'un ou l'autre des deux mots", 'दो में से कोई एक'],
  'group-repeat': ['두 글자 묶음의 되풀이', 'a two-letter group, repeated', 'un grupo de dos letras, repetido', 'um grupo de duas letras, repetido', '2文字のまとまりの繰り返し', 'eine Zweiergruppe, wiederholt', 'un groupe de deux lettres, répété', 'दो अक्षरों का समूह, दोहराया हुआ'],
  'capture-group': ['앞뒤 두 토막을 따로 잡기', 'two parts caught separately', 'dos partes capturadas por separado', 'duas partes capturadas separadamente', '前後二つを別々に取り出す', 'zwei Teile getrennt gefangen', 'deux parties capturées séparément', 'दो हिस्से अलग-अलग पकड़े'],
  'non-capturing': ['묶기만 하고 잡지는 않기', 'grouping without catching', 'agrupar sin capturar', 'agrupar sem capturar', 'まとめるだけで取り出さない', 'gruppieren ohne zu fangen', 'grouper sans capturer', 'समूह बनाना, पर पकड़ना नहीं'],
  'named-group': ['이름을 붙여 잡기', 'catching with a name attached', 'capturar con un nombre', 'capturar com um nome', '名前を付けて取り出す', 'mit Namen fangen', 'capturer avec un nom', 'नाम देकर पकड़ना'],
  backreference: ['같은 글자가 두 번 이어질 때', 'the same character twice in a row', 'el mismo carácter dos veces seguidas', 'o mesmo caractere duas vezes seguidas', '同じ文字が二度続くところ', 'dasselbe Zeichen zweimal hintereinander', 'le même caractère deux fois de suite', 'लगातार दो बार वही वर्ण'],
  'repeated-word': ['같은 낱말이 두 번 이어질 때', 'the same word typed twice', 'la misma palabra escrita dos veces', 'a mesma palavra escrita duas vezes', '同じ語が二度続くところ', 'dasselbe Wort doppelt getippt', 'le même mot tapé deux fois', 'दो बार लिखा गया वही शब्द'],
  'optional-group': ['앞머리가 있어도 되고 없어도 되는 주소', 'an address with or without the scheme', 'una dirección con o sin el esquema', 'um endereço com ou sem o esquema', 'スキームがあってもなくてもよいアドレス', 'eine Adresse mit oder ohne Schema', 'une adresse avec ou sans le schéma', 'स्कीम के साथ या बिना पता'],
  'nested-quantifier': ['네 토막으로 된 주소', 'an address made of four parts', 'una dirección de cuatro partes', 'um endereço de quatro partes', '4つに区切られたアドレス', 'eine Adresse aus vier Teilen', 'une adresse en quatre parties', 'चार हिस्सों वाला पता'],

  /* ── 앞뒤를 살펴보되 잡아먹지 않는 표기 ── */
  lookahead: ['뒤에 특정 말이 오는 숫자', 'a number followed by a certain word', 'un número seguido de cierta palabra', 'um número seguido de certa palavra', '後ろに特定の語が続く数字', 'eine Zahl, auf die ein bestimmtes Wort folgt', "un nombre suivi d'un mot donné", 'जिसके बाद कोई ख़ास शब्द हो, वह संख्या'],
  'negative-lookahead': ['이 말만 아니면 통과', 'anything except this one word', 'cualquier cosa menos esta palabra', 'qualquer coisa menos esta palavra', 'この語でなければ通す', 'alles außer diesem einen Wort', 'tout sauf ce mot précis', 'इस एक शब्द को छोड़कर सब'],
  lookbehind: ['앞에 특정 기호가 붙은 숫자', 'a number preceded by a certain sign', 'un número precedido de cierto signo', 'um número precedido de certo sinal', '前に特定の記号が付く数字', 'eine Zahl mit bestimmtem Zeichen davor', "un nombre précédé d'un signe donné", 'जिसके पहले कोई ख़ास चिह्न हो, वह संख्या'],
  'negative-lookbehind': ['앞에 그 기호가 없는 숫자', 'a number without that sign in front', 'un número sin ese signo delante', 'um número sem esse sinal na frente', '前にその記号が付かない数字', 'eine Zahl ohne dieses Zeichen davor', 'un nombre sans ce signe devant', 'जिसके पहले वह चिह्न न हो, वह संख्या'],
  'password-rule': ['대문자·소문자·숫자를 모두 갖춘 여덟 자 이상', 'eight or more characters with upper, lower and a digit', 'ocho o más con mayúscula, minúscula y dígito', 'oito ou mais com maiúscula, minúscula e dígito', '大文字・小文字・数字をすべて含む8文字以上', 'acht Zeichen mit Groß, Klein und Ziffer', 'huit caractères ou plus avec majuscule, minuscule et chiffre', 'बड़े, छोटे अक्षर और अंक सहित आठ या अधिक वर्ण'],
  'no-double-space': ['공백이 두 번 이어지지 않는 글', 'text with no double space anywhere', 'texto sin ningún espacio doble', 'texto sem nenhum espaço duplo', '空白が二つ続かない文字列', 'Text ohne doppeltes Leerzeichen', 'texte sans double espace', 'जिसमें कहीं दोहरा स्थान न हो'],
  'must-contain': ['이 기호를 반드시 품은 글', 'text that must contain this sign', 'texto que debe contener este signo', 'texto que precisa conter este sinal', 'この記号を必ず含む文字列', 'Text, der dieses Zeichen enthalten muss', 'texte contenant obligatoirement ce signe', 'जिसमें यह चिह्न होना ही चाहिए'],
  'thousand-separator': ['세 자리마다 쉼표를 넣을 자리', 'the spot where a thousands comma goes', 'el punto donde va la coma de millar', 'o ponto onde entra a vírgula de milhar', '3桁ごとにカンマを入れる位置', 'die Stelle für das Tausendertrennzeichen', "l'endroit où placer le séparateur de milliers", 'जहाँ हज़ार का अल्पविराम लगेगा'],
};

/** 통째로 맞는지 보는 식들 */
const VALIDATE_WHAT: Record<string, Eight> = {
  email: ['이메일 주소', 'an email address', 'una dirección de correo', 'um endereço de e-mail', 'メールアドレス', 'eine E-Mail-Adresse', 'une adresse e-mail', 'एक ईमेल पता'],
  url: ['웹 주소', 'a web address', 'una dirección web', 'um endereço web', 'ウェブアドレス', 'eine Webadresse', 'une adresse web', 'एक वेब पता'],
  domain: ['도메인 이름', 'a domain name', 'un nombre de dominio', 'um nome de domínio', 'ドメイン名', 'ein Domainname', 'un nom de domaine', 'एक डोमेन नाम'],
  ipv4: ['IPv4 주소', 'an IPv4 address', 'una dirección IPv4', 'um endereço IPv4', 'IPv4アドレス', 'eine IPv4-Adresse', 'une adresse IPv4', 'एक IPv4 पता'],
  'ipv6-full': ['생략 없이 적은 IPv6 주소', 'an IPv6 address written out in full', 'una dirección IPv6 escrita completa', 'um endereço IPv6 escrito por extenso', '省略しないIPv6アドレス', 'eine voll ausgeschriebene IPv6-Adresse', 'une adresse IPv6 écrite en entier', 'पूरा लिखा IPv6 पता'],
  'mac-address': ['MAC 주소', 'a MAC address', 'una dirección MAC', 'um endereço MAC', 'MACアドレス', 'eine MAC-Adresse', 'une adresse MAC', 'एक MAC पता'],
  'port-number': ['포트 번호', 'a port number', 'un número de puerto', 'um número de porta', 'ポート番号', 'eine Portnummer', 'un numéro de port', 'एक पोर्ट नंबर'],
  uuid: ['UUID', 'a UUID', 'un UUID', 'um UUID', 'UUID', 'eine UUID', 'un UUID', 'एक UUID'],
  'hex-colour': ['16진수 색상 코드', 'a hex colour code', 'un código de color hexadecimal', 'um código de cor hexadecimal', '16進数のカラーコード', 'ein Hex-Farbcode', 'un code couleur hexadécimal', 'हेक्स रंग कोड'],
  'rgb-colour': ['rgb() 색상 표기', 'an rgb() colour value', 'un valor de color rgb()', 'um valor de cor rgb()', 'rgb() 形式の色', 'ein rgb()-Farbwert', 'une couleur au format rgb()', 'rgb() रंग मान'],
  'iso-date': ['ISO 형식 날짜', 'a date in ISO form', 'una fecha en formato ISO', 'uma data em formato ISO', 'ISO形式の日付', 'ein Datum im ISO-Format', 'une date au format ISO', 'ISO रूप में तारीख़'],
  'slash-date': ['빗금으로 적은 날짜', 'a date written with slashes', 'una fecha escrita con barras', 'uma data escrita com barras', 'スラッシュ区切りの日付', 'ein Datum mit Schrägstrichen', 'une date écrite avec des barres', 'स्लैश से लिखी तारीख़'],
  'time-24h': ['24시간제 시각', 'a time on the 24-hour clock', 'una hora en formato de 24 horas', 'uma hora no formato de 24 horas', '24時間制の時刻', 'eine Uhrzeit im 24-Stunden-Format', 'une heure au format 24 heures', '24 घंटे वाला समय'],
  'time-12h': ['오전·오후를 붙인 시각', 'a time with am or pm', 'una hora con am o pm', 'uma hora com am ou pm', '午前・午後付きの時刻', 'eine Uhrzeit mit am oder pm', 'une heure avec am ou pm', 'am/pm सहित समय'],
  'iso-datetime': ['ISO 형식 날짜와 시각', 'a full ISO timestamp', 'una marca de tiempo ISO completa', 'um carimbo de tempo ISO completo', 'ISO形式の日時', 'ein vollständiger ISO-Zeitstempel', 'un horodatage ISO complet', 'पूरा ISO टाइमस्टैम्प'],
  'duration-iso': ['ISO 형식 기간', 'an ISO duration', 'una duración ISO', 'uma duração ISO', 'ISO形式の期間', 'eine ISO-Dauer', 'une durée ISO', 'ISO अवधि'],
  semver: ['유의적 버전 번호', 'a semantic version number', 'un número de versión semántica', 'um número de versão semântica', 'セマンティックバージョン番号', 'eine semantische Versionsnummer', 'un numéro de version sémantique', 'सिमैंटिक संस्करण संख्या'],
  integer: ['부호 없는 정수', 'a whole number with no sign', 'un entero sin signo', 'um inteiro sem sinal', '符号なしの整数', 'eine ganze Zahl ohne Vorzeichen', 'un entier sans signe', 'बिना चिह्न वाला पूर्णांक'],
  'signed-integer': ['부호가 붙을 수 있는 정수', 'a whole number that may carry a sign', 'un entero que puede llevar signo', 'um inteiro que pode ter sinal', '符号が付きうる整数', 'eine ganze Zahl mit möglichem Vorzeichen', 'un entier pouvant porter un signe', 'चिह्न ले सकने वाला पूर्णांक'],
  decimal: ['소수점이 있을 수 있는 수', 'a number that may have a decimal part', 'un número que puede tener decimales', 'um número que pode ter decimais', '小数点が付きうる数', 'eine Zahl mit möglichem Nachkommateil', 'un nombre pouvant avoir des décimales', 'दशमलव वाला संभावित अंक'],
  scientific: ['지수 표기로 적은 수', 'a number in scientific notation', 'un número en notación científica', 'um número em notação científica', '指数表記の数', 'eine Zahl in Exponentialschreibweise', 'un nombre en notation scientifique', 'वैज्ञानिक संकेतन में संख्या'],
  percentage: ['0에서 100까지의 백분율', 'a percentage from 0 to 100', 'un porcentaje de 0 a 100', 'uma porcentagem de 0 a 100', '0から100までの百分率', 'ein Prozentsatz von 0 bis 100', 'un pourcentage de 0 à 100', '0 से 100 तक प्रतिशत'],
  'thousands-number': ['세 자리마다 쉼표를 찍은 수', 'a number grouped with commas', 'un número agrupado con comas', 'um número agrupado com vírgulas', '3桁ごとにカンマを打った数', 'eine Zahl mit Tausendertrennzeichen', 'un nombre séparé par des virgules', 'अल्पविराम से समूहित संख्या'],
  'currency-amount': ['통화 기호가 붙은 금액', 'an amount with a currency sign', 'un importe con símbolo de moneda', 'um valor com símbolo de moeda', '通貨記号の付いた金額', 'ein Betrag mit Währungszeichen', 'un montant avec symbole monétaire', 'मुद्रा चिह्न सहित राशि'],
  'hex-string': ['16진수 문자열', 'a hexadecimal string', 'una cadena hexadecimal', 'uma cadeia hexadecimal', '16進数の文字列', 'eine Hexadezimalfolge', 'une chaîne hexadécimale', 'हेक्साडेसिमल स्ट्रिंग'],
  'binary-string': ['0과 1로만 된 문자열', 'a string of nothing but 0 and 1', 'una cadena solo de 0 y 1', 'uma cadeia só de 0 e 1', '0と1だけの文字列', 'eine Folge nur aus 0 und 1', 'une chaîne faite de 0 et 1', 'सिर्फ़ 0 और 1 की स्ट्रिंग'],
  'octal-string': ['8진수 문자열', 'an octal string', 'una cadena octal', 'uma cadeia octal', '8進数の文字列', 'eine Oktalfolge', 'une chaîne octale', 'ऑक्टल स्ट्रिंग'],
  base64: ['base64로 인코딩한 문자열', 'a base64-encoded string', 'una cadena codificada en base64', 'uma cadeia codificada em base64', 'base64でエンコードした文字列', 'eine base64-codierte Zeichenfolge', 'une chaîne encodée en base64', 'base64 में एन्कोडेड स्ट्रिंग'],
  jwt: ['점 두 개로 나뉜 JWT', 'a JWT split by two dots', 'un JWT dividido por dos puntos', 'um JWT dividido por dois pontos', 'ドット二つで区切られたJWT', 'ein JWT mit zwei Punkten', 'un JWT découpé par deux points', 'दो बिंदुओं से बँटा JWT'],
  'e164-phone': ['국제 표준 전화번호', 'a phone number in international form', 'un número de teléfono en forma internacional', 'um número de telefone em forma internacional', '国際標準の電話番号', 'eine Telefonnummer in internationaler Form', 'un numéro de téléphone au format international', 'अंतरराष्ट्रीय रूप में फ़ोन नंबर'],
  username: ['영문자로 시작하는 아이디', 'a username that starts with a letter', 'un usuario que empieza por letra', 'um usuário que começa com letra', '英字で始まるユーザー名', 'ein Benutzername, der mit einem Buchstaben beginnt', "un identifiant commençant par une lettre", 'अक्षर से शुरू होने वाला यूज़रनेम'],
  slug: ['주소에 쓰는 낱말 잇기', 'a URL slug', 'un slug de URL', 'um slug de URL', 'URLに使う語のつなぎ', 'ein URL-Slug', 'un slug d’URL', 'URL स्लग'],
  filename: ['확장자가 있는 파일 이름', 'a file name with an extension', 'un nombre de archivo con extensión', 'um nome de arquivo com extensão', '拡張子付きのファイル名', 'ein Dateiname mit Endung', 'un nom de fichier avec extension', 'एक्सटेंशन सहित फ़ाइल नाम'],
  'image-extension': ['그림 파일 확장자', 'an image file extension', 'una extensión de archivo de imagen', 'uma extensão de arquivo de imagem', '画像ファイルの拡張子', 'eine Bilddatei-Endung', 'une extension de fichier image', 'छवि फ़ाइल एक्सटेंशन'],
  'unix-path': ['유닉스식 경로', 'a Unix-style path', 'una ruta estilo Unix', 'um caminho estilo Unix', 'UNIX形式のパス', 'ein Unix-Pfad', 'un chemin de style Unix', 'यूनिक्स शैली का पथ'],
  'windows-path': ['윈도식 경로', 'a Windows path', 'una ruta de Windows', 'um caminho do Windows', 'Windows形式のパス', 'ein Windows-Pfad', 'un chemin Windows', 'विंडोज़ पथ'],
  'html-tag': ['HTML 태그 한 개', 'a single HTML tag', 'una etiqueta HTML', 'uma etiqueta HTML', 'HTMLタグ1つ', 'ein einzelnes HTML-Tag', 'une balise HTML', 'एक HTML टैग'],
  'css-class': ['CSS 클래스 선택자', 'a CSS class selector', 'un selector de clase CSS', 'um seletor de classe CSS', 'CSSのクラスセレクタ', 'ein CSS-Klassenselektor', 'un sélecteur de classe CSS', 'CSS क्लास सेलेक्टर'],
  'roman-numeral': ['로마 숫자', 'a Roman numeral', 'un número romano', 'um numeral romano', 'ローマ数字', 'eine römische Zahl', 'un chiffre romain', 'रोमन अंक'],
  latitude: ['위도 값', 'a latitude value', 'un valor de latitud', 'um valor de latitude', '緯度の値', 'ein Breitengrad', 'une latitude', 'अक्षांश मान'],
  longitude: ['경도 값', 'a longitude value', 'un valor de longitud', 'um valor de longitude', '経度の値', 'ein Längengrad', 'une longitude', 'देशांतर मान'],
  'no-leading-zero': ['앞에 0이 붙지 않은 수', 'a number with no leading zero', 'un número sin cero a la izquierda', 'um número sem zero à esquerda', '先頭に0が付かない数', 'eine Zahl ohne führende Null', 'un nombre sans zéro initial', 'बिना शुरुआती शून्य वाली संख्या'],
  'even-number': ['짝수', 'an even number', 'un número par', 'um número par', '偶数', 'eine gerade Zahl', 'un nombre pair', 'सम संख्या'],
  'blank-line': ['빈 줄', 'a blank line', 'una línea en blanco', 'uma linha em branco', '空行', 'eine leere Zeile', 'une ligne vide', 'ख़ाली पंक्ति'],
};

/** 골라내거나 다듬을 때 쓰는 식들 */
const EXTRACT_WHAT: Record<string, Eight> = {
  'trailing-space': ['줄 끝에 남은 공백', 'space left at the end of a line', 'espacio sobrante al final', 'espaço sobrando no fim', '行末に残った空白', 'Leerraum am Zeilenende', 'espace resté en fin de ligne', 'पंक्ति के अंत में बचा स्थान'],
  'leading-space': ['줄 앞에 붙은 공백', 'space at the start of a line', 'espacio al principio', 'espaço no início', '行頭の空白', 'Leerraum am Zeilenanfang', 'espace en début de ligne', 'पंक्ति की शुरुआत का स्थान'],
  'outer-space': ['앞뒤 공백', 'space at either end', 'espacio en ambos extremos', 'espaço nas duas pontas', '前後の空白', 'Leerraum an beiden Enden', 'espace aux deux bouts', 'दोनों सिरों का स्थान'],
  'repeated-space': ['두 칸 이상 이어진 공백', 'two or more spaces in a row', 'dos o más espacios seguidos', 'dois ou mais espaços seguidos', '2つ以上続く空白', 'zwei oder mehr Leerzeichen hintereinander', 'deux espaces ou plus à la suite', 'लगातार दो या अधिक स्थान'],
  'empty-lines': ['빈 줄', 'an empty line between two lines', 'una línea vacía entre dos', 'uma linha vazia entre duas', '行間の空行', 'eine Leerzeile zwischen zwei Zeilen', 'une ligne vide entre deux lignes', 'दो पंक्तियों के बीच ख़ाली पंक्ति'],
  'non-digit-strip': ['숫자가 아닌 부분', 'everything that is not a digit', 'todo lo que no es dígito', 'tudo o que não é dígito', '数字でない部分', 'alles, was keine Ziffer ist', 'tout ce qui n’est pas un chiffre', 'जो अंक नहीं है'],
  'non-ascii': ['아스키가 아닌 글자', 'a character outside ASCII', 'un carácter fuera de ASCII', 'um caractere fora do ASCII', 'ASCII以外の文字', 'ein Zeichen außerhalb von ASCII', 'un caractère hors ASCII', 'ASCII से बाहर का वर्ण'],
  'control-char': ['눈에 보이지 않는 제어 문자', 'an invisible control character', 'un carácter de control invisible', 'um caractere de controle invisível', '目に見えない制御文字', 'ein unsichtbares Steuerzeichen', 'un caractère de contrôle invisible', 'अदृश्य नियंत्रण वर्ण'],
  'html-tags-strip': ['HTML 태그 부분', 'the HTML tags in a text', 'las etiquetas HTML de un texto', 'as etiquetas HTML de um texto', '文中のHTMLタグ', 'die HTML-Tags in einem Text', 'les balises HTML d’un texte', 'पाठ के HTML टैग'],
  'html-comment': ['HTML 주석', 'an HTML comment', 'un comentario HTML', 'um comentário HTML', 'HTMLのコメント', 'ein HTML-Kommentar', 'un commentaire HTML', 'HTML टिप्पणी'],
  'line-comment': ['두 빗금으로 시작하는 주석', 'a comment that starts with two slashes', 'un comentario que empieza con dos barras', 'um comentário que começa com duas barras', 'スラッシュ2つで始まるコメント', 'ein Kommentar mit zwei Schrägstrichen', 'un commentaire commençant par deux barres', 'दो स्लैश से शुरू टिप्पणी'],
  'block-comment': ['여러 줄에 걸친 주석', 'a comment that spans lines', 'un comentario de varias líneas', 'um comentário de várias linhas', '複数行にわたるコメント', 'ein mehrzeiliger Kommentar', 'un commentaire sur plusieurs lignes', 'कई पंक्तियों की टिप्पणी'],
  'double-quoted': ['큰따옴표로 감싼 부분', 'text inside double quotes', 'texto entre comillas dobles', 'texto entre aspas duplas', '二重引用符で囲んだ部分', 'Text in doppelten Anführungszeichen', 'texte entre guillemets doubles', 'दोहरे उद्धरण में पाठ'],
  'single-quoted': ['작은따옴표로 감싼 부분', 'text inside single quotes', 'texto entre comillas simples', 'texto entre aspas simples', '単一引用符で囲んだ部分', 'Text in einfachen Anführungszeichen', 'texte entre guillemets simples', 'एकल उद्धरण में पाठ'],
  'markdown-link': ['마크다운 링크', 'a Markdown link', 'un enlace Markdown', 'um link Markdown', 'Markdownのリンク', 'ein Markdown-Link', 'un lien Markdown', 'मार्कडाउन लिंक'],
  'markdown-heading': ['마크다운 제목 줄', 'a Markdown heading line', 'una línea de encabezado Markdown', 'uma linha de título Markdown', 'Markdownの見出し行', 'eine Markdown-Überschrift', 'une ligne de titre Markdown', 'मार्कडाउन शीर्षक पंक्ति'],
  hashtag: ['해시태그', 'a hashtag', 'una etiqueta con almohadilla', 'uma hashtag', 'ハッシュタグ', 'ein Hashtag', 'un mot-dièse', 'हैशटैग'],
  mention: ['골뱅이로 부르는 이름', 'an @ mention', 'una mención con arroba', 'uma menção com arroba', '@付きのメンション', 'eine @-Erwähnung', 'une mention avec arobase', '@ मेंशन'],
  'query-param': ['주소 뒤의 물음표 값', 'a query parameter in a URL', 'un parámetro de consulta de una URL', 'um parâmetro de consulta de uma URL', 'URLのクエリパラメータ', 'ein Query-Parameter in einer URL', "un paramètre de requête d'une URL", 'URL का क्वेरी पैरामीटर'],
  'url-in-text': ['글 속에 섞인 주소', 'a URL sitting inside ordinary text', 'una URL dentro de un texto normal', 'uma URL dentro de um texto comum', '文中に混じったURL', 'eine URL mitten im Text', 'une URL au milieu du texte', 'सामान्य पाठ में छिपी URL'],
  'domain-from-url': ['주소에서 도메인만', 'just the domain out of a URL', 'solo el dominio de una URL', 'só o domínio de uma URL', 'URLからドメインだけ', 'nur die Domain aus einer URL', "seulement le domaine d'une URL", 'URL से सिर्फ़ डोमेन'],
  'file-extension': ['파일 이름의 확장자', 'the extension of a file name', 'la extensión de un nombre de archivo', 'a extensão de um nome de arquivo', 'ファイル名の拡張子', 'die Endung eines Dateinamens', "l'extension d'un nom de fichier", 'फ़ाइल नाम का एक्सटेंशन'],
  'camel-boundary': ['낙타 표기의 낱말 경계', 'the seam between words in camelCase', 'la junta entre palabras en camelCase', 'a junção entre palavras em camelCase', 'キャメルケースの語の切れ目', 'die Naht zwischen Wörtern in camelCase', 'la jointure entre mots en camelCase', 'camelCase में शब्दों की संधि'],
  'snake-part': ['밑줄 뒤에 오는 글자', 'the letter that follows an underscore', 'la letra que sigue a un guion bajo', 'a letra que segue um sublinhado', 'アンダースコアの次の文字', 'der Buchstabe nach einem Unterstrich', 'la lettre après un tiret bas', 'अंडरस्कोर के बाद का अक्षर'],
  'kebab-part': ['붙임표 뒤에 오는 글자', 'the letter that follows a hyphen', 'la letra que sigue a un guion', 'a letra que segue um hífen', 'ハイフンの次の文字', 'der Buchstabe nach einem Bindestrich', 'la lettre après un trait d’union', 'हाइफ़न के बाद का अक्षर'],
  'csv-field': ['쉼표로 나뉜 칸 하나', 'one comma-separated field', 'un campo separado por comas', 'um campo separado por vírgulas', 'カンマで区切られた1項目', 'ein durch Komma getrenntes Feld', 'un champ séparé par une virgule', 'अल्पविराम से अलग एक फ़ील्ड'],
  'key-value': ['등호로 나뉜 이름과 값', 'a name and value split by an equals sign', 'un nombre y valor separados por igual', 'um nome e valor separados por igual', '等号で分けた名前と値', 'Name und Wert, getrennt durch ein Gleichheitszeichen', "un nom et une valeur séparés par un signe égal", 'बराबर चिह्न से बँटा नाम और मान'],
  'first-word': ['첫 낱말', 'the first word', 'la primera palabra', 'a primeira palavra', '最初の語', 'das erste Wort', 'le premier mot', 'पहला शब्द'],
  'last-word': ['마지막 낱말', 'the last word', 'la última palabra', 'a última palavra', '最後の語', 'das letzte Wort', 'le dernier mot', 'आख़िरी शब्द'],
  'digits-in-text': ['글 속의 숫자 덩어리', 'runs of digits inside a text', 'grupos de dígitos dentro de un texto', 'grupos de dígitos dentro de um texto', '文中の数字のかたまり', 'Ziffernfolgen in einem Text', 'les suites de chiffres dans un texte', 'पाठ में अंकों के समूह'],
  'word-count': ['낱말 하나하나', 'each word, one by one', 'cada palabra, una a una', 'cada palavra, uma a uma', '語を一つずつ', 'jedes Wort einzeln', 'chaque mot, un par un', 'हर शब्द, एक-एक करके'],
  'bracket-content': ['대괄호 안의 내용', 'what sits inside square brackets', 'lo que hay entre corchetes', 'o que está entre colchetes', '角かっこの中身', 'was in eckigen Klammern steht', 'ce qui est entre crochets', 'वर्ग कोष्ठक के भीतर की सामग्री'],
  'paren-content': ['괄호 안의 내용', 'what sits inside round brackets', 'lo que hay entre paréntesis', 'o que está entre parênteses', 'かっこの中身', 'was in runden Klammern steht', 'ce qui est entre parenthèses', 'गोल कोष्ठक के भीतर की सामग्री'],
  'emoji-surrogate': ['두 칸을 차지하는 이모지', 'an emoji that takes two code units', 'un emoji que ocupa dos unidades', 'um emoji que ocupa duas unidades', '2つ分を占める絵文字', 'ein Emoji aus zwei Codeeinheiten', 'un emoji occupant deux unités', 'दो कोड यूनिट वाला इमोजी'],
  'repeated-char': ['같은 글자가 세 번 이상', 'the same character three times or more', 'el mismo carácter tres veces o más', 'o mesmo caractere três vezes ou mais', '同じ文字が3回以上', 'dasselbe Zeichen dreimal oder öfter', 'le même caractère trois fois ou plus', 'लगातार तीन या अधिक बार वही वर्ण'],
  'trailing-comma': ['닫기 전에 남은 쉼표', 'a comma left before a closing bracket', 'una coma antes de cerrar', 'uma vírgula antes de fechar', '閉じかっこ前に残ったカンマ', 'ein Komma vor der schließenden Klammer', 'une virgule avant la fermeture', 'बंद करने से पहले बची अल्पविराम'],
};

Object.assign(WHAT, VALIDATE_WHAT, EXTRACT_WHAT);

const INDEX: Record<Lang8, number> = { ko: 0, en: 1, es: 2, pt: 3, ja: 4, de: 5, fr: 6, hi: 7 };

/** 이 식이 무엇에 맞는지 — 한 언어로 */
export const whatOf = (slug: string, lang: Lang8): string => WHAT[slug]?.[INDEX[lang]] ?? '';

/** 여덟 칸이 모두 채워졌는지 확인할 때 쓴다 */
export const LANG_ORDER = LANG8_CODES;
