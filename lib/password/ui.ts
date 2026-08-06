/**
 * 비밀번호 세기 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "길이만큼이나 저장 방식이 답을 바꾼다"이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PasswordFacts, TimeParts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PasswordUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  charsetName: (key: string) => string;
  rateName: (key: string) => string;
  timeLabel: (t: TimeParts) => string;
  lengthLabel: string;
  sizeLabel: string;
  perCharLabel: string;
  bitsLabel: string;
  digitsLabel: string;
  asciiLabel: string;
  bitTitle: string;
  bitNote: string;
  storeTitle: string;
  storeNote: string;
  hangulTitle: string;
  hangulNote: string;
  assumeTitle: string;
  assumeNote: string;
  reuseTitle: string;
  reuseNote: string;
  tableTitle: string;
  neighbourTitle: string;
  charsetRowTitle: string;
  lengthRowTitle: string;
  desc: (f: PasswordFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PasswordFacts) => string;
  metaDesc: (f: PasswordFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: PasswordFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const csKo: Names = { digit: '숫자만', hex: '16진수', lower: '소문자만', base32: 'Base32', loweralnum: '소문자+숫자', alpha: '대소문자', alnum: '대소문자+숫자', base64: 'Base64', ascii: '아스키 전체(기호 포함)', hangul: '한글 음절' };
const csEn: Names = { digit: 'digits only', hex: 'hexadecimal', lower: 'lowercase only', base32: 'Base32', loweralnum: 'lowercase + digits', alpha: 'upper + lowercase', alnum: 'letters + digits', base64: 'Base64', ascii: 'full ASCII with symbols', hangul: 'Hangul syllables' };
const csEs: Names = { digit: 'solo dígitos', hex: 'hexadecimal', lower: 'solo minúsculas', base32: 'Base32', loweralnum: 'minúsculas + dígitos', alpha: 'mayúsculas y minúsculas', alnum: 'letras + dígitos', base64: 'Base64', ascii: 'ASCII completo con símbolos', hangul: 'sílabas hangul' };
const csPt: Names = { digit: 'só dígitos', hex: 'hexadecimal', lower: 'só minúsculas', base32: 'Base32', loweralnum: 'minúsculas + dígitos', alpha: 'maiúsculas e minúsculas', alnum: 'letras + dígitos', base64: 'Base64', ascii: 'ASCII completo com símbolos', hangul: 'sílabas hangul' };
const csJa: Names = { digit: '数字のみ', hex: '16進数', lower: '小文字のみ', base32: 'Base32', loweralnum: '小文字+数字', alpha: '大文字と小文字', alnum: '英字+数字', base64: 'Base64', ascii: '記号を含むASCII全体', hangul: 'ハングル音節' };
const csDe: Names = { digit: 'nur Ziffern', hex: 'hexadezimal', lower: 'nur Kleinbuchstaben', base32: 'Base32', loweralnum: 'Kleinbuchstaben + Ziffern', alpha: 'Groß- und Kleinbuchstaben', alnum: 'Buchstaben + Ziffern', base64: 'Base64', ascii: 'volles ASCII mit Sonderzeichen', hangul: 'Hangul-Silben' };
const csFr: Names = { digit: 'chiffres seuls', hex: 'hexadécimal', lower: 'minuscules seules', base32: 'Base32', loweralnum: 'minuscules + chiffres', alpha: 'majuscules et minuscules', alnum: 'lettres + chiffres', base64: 'Base64', ascii: 'ASCII complet avec symboles', hangul: 'syllabes hangeul' };
const csHi: Names = { digit: 'केवल अंक', hex: 'हेक्साडेसिमल', lower: 'केवल छोटे अक्षर', base32: 'Base32', loweralnum: 'छोटे अक्षर + अंक', alpha: 'बड़े और छोटे अक्षर', alnum: 'अक्षर + अंक', base64: 'Base64', ascii: 'चिह्नों सहित पूरा ASCII', hangul: 'हंगुल अक्षर' };
const csZh: Names = { digit: '仅数字', hex: '十六进制', lower: '仅小写字母', base32: 'Base32', loweralnum: '小写字母+数字', alpha: '大小写字母', alnum: '字母+数字', base64: 'Base64', ascii: '含符号的完整 ASCII', hangul: '韩文音节' };
const csTw: Names = { digit: '僅數字', hex: '十六進位', lower: '僅小寫字母', base32: 'Base32', loweralnum: '小寫字母+數字', alpha: '大小寫字母', alnum: '字母+數字', base64: 'Base64', ascii: '含符號的完整 ASCII', hangul: '韓文音節' };

const rtKo: Names = { ntlm: 'NTLM (윈도 암호)', md5: 'MD5', sha256: 'SHA-256', wpa: 'WPA2 와이파이', bcrypt: 'bcrypt' };
const rtEn: Names = { ntlm: 'NTLM (Windows)', md5: 'MD5', sha256: 'SHA-256', wpa: 'WPA2 Wi-Fi', bcrypt: 'bcrypt' };
const rtJa: Names = { ntlm: 'NTLM (Windows)', md5: 'MD5', sha256: 'SHA-256', wpa: 'WPA2 Wi-Fi', bcrypt: 'bcrypt' };
const rtHi: Names = { ntlm: 'NTLM (विंडोज़)', md5: 'MD5', sha256: 'SHA-256', wpa: 'WPA2 वाई-फ़ाई', bcrypt: 'bcrypt' };
const rtZh: Names = { ntlm: 'NTLM（Windows）', md5: 'MD5', sha256: 'SHA-256', wpa: 'WPA2 Wi-Fi', bcrypt: 'bcrypt' };

/** 시간 낱말 — 숫자는 facts가 내고 여기서는 붙이기만 한다 */
const timer = (
  instant: string, sec: (n: number) => string, min: (n: number) => string, hour: (n: number) => string,
  day: (n: number) => string, year: (n: number) => string, exp: (n: number) => string,
) => (t: TimeParts): string => {
  switch (t.unit) {
    case 'instant': return instant;
    case 'second': return sec(t.value);
    case 'minute': return min(t.value);
    case 'hour': return hour(t.value);
    case 'day': return day(t.value);
    case 'year': return year(t.value);
    default: return exp(t.value);
  }
};

type Spec = { [K in keyof PasswordUI]: L<PasswordUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('비밀번호 세기', 'Password strength', 'Fuerza de contraseñas', 'Força de senhas', 'パスワードの強さ', 'Passwortstärke', 'Force des mots de passe', 'पासवर्ड की मज़बूती', '密码强度', '密碼強度'),

  hubTitle: T(
    '비밀번호 100칸 — 길이보다 저장 방식이 답을 더 바꿉니다',
    '100 password cells — how it is stored changes the answer more than length does',
    '100 contraseñas — cómo se guarda cambia la respuesta más que la longitud',
    '100 senhas — como é guardada muda a resposta mais que o comprimento',
    'パスワード100マス — 長さより保存方式が答えを変えます',
    '100 Passwortfelder — die Speicherung ändert mehr als die Länge',
    '100 mots de passe — le stockage change plus la réponse que la longueur',
    '100 पासवर्ड खाने — लंबाई से ज़्यादा भंडारण तरीका उत्तर बदलता है',
    '100 格密码 — 存储方式比长度更能改变答案',
    '100 格密碼 — 儲存方式比長度更能改變答案',
  ),

  hubLead: T(
    '문자 집합 열 가지와 길이 열 가지가 만나는 칸마다 비트와 뚫는 데 걸리는 시간을 계산했습니다. 속도는 지어내지 않고 hashcat을 RTX 4090 한 장에서 돌린 공개 측정값을 썼습니다.',
    'Bits of entropy and time-to-crack for every meeting of 10 character sets and 10 lengths. The speeds are not invented — they are published hashcat measurements on a single RTX 4090.',
    'Bits de entropía y tiempo hasta romperla para cada cruce de 10 conjuntos de caracteres y 10 longitudes. Las velocidades no son inventadas: son medidas publicadas de hashcat en una sola RTX 4090.',
    'Bits de entropia e tempo até quebrar para cada cruzamento de 10 conjuntos de caracteres e 10 comprimentos. As velocidades não são inventadas: são medições publicadas do hashcat numa única RTX 4090.',
    '文字集合10通りと長さ10通りが出会う各マスのビット数と、破るのにかかる時間を計算しました。速度は作らず、hashcatをRTX 4090 1枚で回した公開実測値を使いました。',
    'Entropie-Bits und Knackdauer für jede Begegnung von 10 Zeichensätzen und 10 Längen. Die Geschwindigkeiten sind nicht erfunden, sondern veröffentlichte hashcat-Messungen auf einer einzelnen RTX 4090.',
    'Bits d’entropie et temps de cassage pour chaque croisement de 10 jeux de caractères et 10 longueurs. Les vitesses ne sont pas inventées : ce sont des mesures hashcat publiées sur une seule RTX 4090.',
    '10 वर्ण-समुच्चयों और 10 लंबाइयों के हर मेल के लिए एन्ट्रॉपी बिट और तोड़ने में लगने वाला समय। गति गढ़ी नहीं गई — एक RTX 4090 पर hashcat की प्रकाशित माप है।',
    '10 种字符集与 10 种长度交汇的每一格，都算出熵位数和破解所需时间。速度不是编的，用的是 hashcat 在单张 RTX 4090 上的公开实测值。',
    '10 種字元集與 10 種長度交匯的每一格，都算出熵位數和破解所需時間。速度不是編的，用的是 hashcat 在單張 RTX 4090 上的公開實測值。',
  ),

  charsetName: T<(k: string) => string>(
    namer(csKo), namer(csEn), namer(csEs), namer(csPt), namer(csJa),
    namer(csDe), namer(csFr), namer(csHi), namer(csZh), namer(csTw),
  ),

  rateName: T<(k: string) => string>(
    namer(rtKo), namer(rtEn), namer(rtEn), namer(rtEn), namer(rtJa),
    namer(rtEn), namer(rtEn), namer(rtHi), namer(rtZh), namer(rtZh),
  ),

  timeLabel: T<(t: TimeParts) => string>(
    timer('즉시', n => `${n}초`, n => `${n}분`, n => `${n}시간`, n => `${n}일`, n => `${n}년`, n => `10^${n}년`),
    timer('instantly', n => `${n} s`, n => `${n} min`, n => `${n} h`, n => `${n} days`, n => `${n} years`, n => `10^${n} years`),
    timer('al instante', n => `${n} s`, n => `${n} min`, n => `${n} h`, n => `${n} días`, n => `${n} años`, n => `10^${n} años`),
    timer('na hora', n => `${n} s`, n => `${n} min`, n => `${n} h`, n => `${n} dias`, n => `${n} anos`, n => `10^${n} anos`),
    timer('即座に', n => `${n}秒`, n => `${n}分`, n => `${n}時間`, n => `${n}日`, n => `${n}年`, n => `10^${n}年`),
    timer('sofort', n => `${n} s`, n => `${n} min`, n => `${n} h`, n => `${n} Tage`, n => `${n} Jahre`, n => `10^${n} Jahre`),
    timer('instantanément', n => `${n} s`, n => `${n} min`, n => `${n} h`, n => `${n} jours`, n => `${n} ans`, n => `10^${n} ans`),
    timer('तुरंत', n => `${n} स`, n => `${n} मि`, n => `${n} घं`, n => `${n} दिन`, n => `${n} वर्ष`, n => `10^${n} वर्ष`),
    timer('瞬间', n => `${n} 秒`, n => `${n} 分`, n => `${n} 小时`, n => `${n} 天`, n => `${n} 年`, n => `10^${n} 年`),
    timer('瞬間', n => `${n} 秒`, n => `${n} 分`, n => `${n} 小時`, n => `${n} 天`, n => `${n} 年`, n => `10^${n} 年`),
  ),

  lengthLabel: T('길이', 'Length', 'Longitud', 'Comprimento', '長さ', 'Länge', 'Longueur', 'लंबाई', '长度', '長度'),
  sizeLabel: T('집합 크기', 'Alphabet size', 'Tamaño del alfabeto', 'Tamanho do alfabeto', '集合の大きさ', 'Zeichenvorrat', 'Taille du jeu', 'समुच्चय आकार', '字符集大小', '字元集大小'),
  perCharLabel: T('한 글자가 담는 비트', 'Bits per character', 'Bits por carácter', 'Bits por caractere', '1文字あたりのビット', 'Bits pro Zeichen', 'Bits par caractère', 'प्रति वर्ण बिट', '每个字符的位数', '每個字元的位數'),
  bitsLabel: T('전체 비트', 'Total bits', 'Bits totales', 'Bits totais', '全体のビット', 'Bits insgesamt', 'Bits au total', 'कुल बिट', '总位数', '總位數'),
  digitsLabel: T('경우의 수', 'Number of combinations', 'Número de combinaciones', 'Número de combinações', '組み合わせ数', 'Zahl der Kombinationen', 'Nombre de combinaisons', 'संयोजनों की संख्या', '组合数', '組合數'),
  asciiLabel: T('아스키로 바꾸면', 'Same strength in ASCII', 'Igual fuerza en ASCII', 'Mesma força em ASCII', 'ASCIIに直すと', 'Entspricht in ASCII', 'Équivalent en ASCII', 'ASCII में समकक्ष', '换成 ASCII 相当于', '換成 ASCII 相當於'),

  bitTitle: T('한 글자가 담는 것', 'What one character carries', 'Lo que aporta un carácter', 'O que um caractere carrega', '1文字が担うもの', 'Was ein Zeichen trägt', 'Ce que porte un caractère', 'एक वर्ण क्या रखता है', '一个字符能承载多少', '一個字元能承載多少'),

  bitNote: T(
    '한 글자가 담는 세기는 집합 크기의 로그입니다. 숫자만 쓰면 한 글자가 3.3비트, 소문자까지면 4.7비트, 기호를 넣은 아스키 94자면 6.6비트입니다. 전체 세기는 여기에 길이를 곱한 값이라, 종류를 늘리는 것보다 길이를 늘리는 쪽이 대개 더 큽니다 — 아스키에 한 글자를 더하면 6.6비트가 붙지만, 소문자에서 아스키로 넓혀도 한 글자당 1.9비트가 붙을 뿐입니다.',
    'What one character carries is the logarithm of the alphabet size: 3.3 bits for digits only, 4.7 with lowercase letters, 6.6 for the 94 printable ASCII characters. Total strength is that times the length, which is why adding length usually beats adding variety — one more ASCII character buys 6.6 bits, while widening from lowercase to full ASCII buys only 1.9 bits per character.',
    'Lo que aporta un carácter es el logaritmo del tamaño del alfabeto: 3,3 bits con solo dígitos, 4,7 con minúsculas, 6,6 con los 94 caracteres ASCII imprimibles. La fuerza total es eso por la longitud, y por eso alargar suele ganar a variar: un carácter ASCII más aporta 6,6 bits, mientras que pasar de minúsculas a ASCII completo solo aporta 1,9 bits por carácter.',
    'O que um caractere carrega é o logaritmo do tamanho do alfabeto: 3,3 bits só com dígitos, 4,7 com minúsculas, 6,6 com os 94 caracteres ASCII imprimíveis. A força total é isso vezes o comprimento, por isso alongar costuma vencer variar: mais um caractere ASCII rende 6,6 bits, enquanto ir de minúsculas ao ASCII completo rende só 1,9 bit por caractere.',
    '1文字が担う強さは集合の大きさの対数です。数字だけなら3.3ビット、小文字まで入れて4.7ビット、記号を含むASCII 94文字なら6.6ビットです。全体はこれに長さを掛けた値なので、種類を増やすより長さを伸ばすほうが大きいことが多いです — ASCIIで1文字増やせば6.6ビット付きますが、小文字からASCIIに広げても1文字あたり1.9ビットしか増えません。',
    'Was ein Zeichen trägt, ist der Logarithmus des Zeichenvorrats: 3,3 Bit bei nur Ziffern, 4,7 mit Kleinbuchstaben, 6,6 bei den 94 druckbaren ASCII-Zeichen. Die Gesamtstärke ist das mal Länge — darum schlägt mehr Länge meist mehr Vielfalt: ein weiteres ASCII-Zeichen bringt 6,6 Bit, der Sprung von Kleinbuchstaben zu vollem ASCII nur 1,9 Bit je Zeichen.',
    'Ce qu’un caractère porte est le logarithme de la taille du jeu : 3,3 bits avec les chiffres seuls, 4,7 avec les minuscules, 6,6 pour les 94 caractères ASCII imprimables. La force totale, c’est cela multiplié par la longueur — d’où l’avantage d’allonger plutôt que de varier : un caractère ASCII de plus apporte 6,6 bits, alors que passer des minuscules à l’ASCII complet n’apporte que 1,9 bit par caractère.',
    'एक वर्ण जो रखता है वह समुच्चय आकार का लघुगणक है: केवल अंकों पर 3.3 बिट, छोटे अक्षरों तक 4.7, चिह्नों सहित 94 ASCII वर्णों पर 6.6। कुल मज़बूती इसे लंबाई से गुणा करके मिलती है — इसीलिए लंबाई बढ़ाना विविधता बढ़ाने से आगे रहता है: एक और ASCII वर्ण 6.6 बिट देता है, जबकि छोटे अक्षरों से पूरे ASCII तक जाने पर प्रति वर्ण केवल 1.9 बिट।',
    '一个字符能承载的强度是字符集大小的对数：只用数字是 3.3 位，加上小写字母是 4.7 位，含符号的 94 个 ASCII 字符是 6.6 位。总强度等于它乘以长度，所以加长通常胜过加花样——多一个 ASCII 字符能加 6.6 位，而从小写扩到完整 ASCII 每个字符只多 1.9 位。',
    '一個字元能承載的強度是字元集大小的對數：只用數字是 3.3 位，加上小寫字母是 4.7 位，含符號的 94 個 ASCII 字元是 6.6 位。總強度等於它乘以長度，所以加長通常勝過加花樣——多一個 ASCII 字元能加 6.6 位，而從小寫擴到完整 ASCII 每個字元只多 1.9 位。',
  ),

  storeTitle: T('사이트가 어떻게 저장했느냐', 'How the site stored it', 'Cómo la guardó el sitio', 'Como o site a guardou', 'サイトがどう保存したか', 'Wie die Seite es gespeichert hat', 'Comment le site l’a stocké', 'साइट ने कैसे रखा', '网站是怎么存的', '網站是怎麼存的'),

  storeNote: T(
    '같은 비밀번호라도 저장 방식에 따라 답이 백만 배 넘게 갈립니다. RTX 4090 한 장이 NTLM은 초당 2,885억 번, MD5는 1,641억 번 두드리지만 bcrypt는 18만 4천 번뿐입니다. 일부러 느리게 만든 방식이기 때문입니다. 그래서 기호를 포함한 아스키 여덟 글자가 NTLM으로 저장된 곳에서는 세 시간이 안 되고, bcrypt로 저장된 곳에서는 500년이 넘습니다 — 그리고 어느 쪽인지는 쓰는 사람이 고를 수 없습니다.',
    'The same password can differ by a factor of a million depending on how it was stored. One RTX 4090 tries 288.5 billion NTLM hashes a second and 164.1 billion MD5, but only 184 thousand bcrypt — bcrypt is deliberately slow. So eight ASCII characters with symbols fall in under three hours where NTLM was used, and hold for over 500 years where bcrypt was. And the person typing the password does not get to choose which.',
    'La misma contraseña puede variar por un factor de un millón según cómo se guardó. Una RTX 4090 prueba 288.500 millones de hashes NTLM por segundo y 164.100 millones de MD5, pero solo 184.000 de bcrypt, que es lento a propósito. Ocho caracteres ASCII con símbolos caen en menos de tres horas con NTLM y aguantan más de 500 años con bcrypt. Y quien escribe la contraseña no elige cuál.',
    'A mesma senha pode variar por um fator de um milhão conforme foi guardada. Uma RTX 4090 testa 288,5 bilhões de hashes NTLM por segundo e 164,1 bilhões de MD5, mas só 184 mil de bcrypt — lento de propósito. Oito caracteres ASCII com símbolos caem em menos de três horas com NTLM e aguentam mais de 500 anos com bcrypt. E quem digita a senha não escolhe qual.',
    '同じパスワードでも保存方式で答えが100万倍以上変わります。RTX 4090 1枚がNTLMなら毎秒2,885億回、MD5なら1,641億回叩けますが、bcryptは18万4千回だけです。わざと遅くしてあるからです。だから記号を含むASCII 8文字はNTLMで保存された所では3時間もかからず、bcryptで保存された所では500年を超えます — そしてどちらかは使う人が選べません。',
    'Dasselbe Passwort unterscheidet sich um den Faktor Million, je nach Speicherung. Eine RTX 4090 probiert 288,5 Milliarden NTLM-Hashes pro Sekunde und 164,1 Milliarden MD5, aber nur 184 Tausend bcrypt — bcrypt ist absichtlich langsam. Acht ASCII-Zeichen mit Symbolen fallen bei NTLM in unter drei Stunden und halten bei bcrypt über 500 Jahre. Wer das Passwort tippt, kann sich das nicht aussuchen.',
    'Le même mot de passe varie d’un facteur million selon son stockage. Une RTX 4090 essaie 288,5 milliards de hachages NTLM par seconde et 164,1 milliards de MD5, mais seulement 184 mille bcrypt — bcrypt est lent à dessein. Huit caractères ASCII avec symboles tombent en moins de trois heures avec NTLM et tiennent plus de 500 ans avec bcrypt. Et l’utilisateur ne choisit pas lequel.',
    'एक ही पासवर्ड भंडारण के तरीके से दस लाख गुना तक अलग पड़ता है। एक RTX 4090 प्रति सेकंड 288.5 अरब NTLM और 164.1 अरब MD5 आज़माता है, पर bcrypt केवल 1 लाख 84 हज़ार — bcrypt जानबूझकर धीमा है। इसलिए चिह्नों सहित आठ ASCII वर्ण NTLM वाली जगह तीन घंटे से कम में गिर जाते हैं, और bcrypt वाली जगह 500 वर्ष से ज़्यादा टिकते हैं। और यह चुनाव पासवर्ड लिखने वाले के हाथ में नहीं है।',
    '同一个密码，因存储方式不同，答案可以相差一百万倍以上。一张 RTX 4090 每秒能试 2885 亿次 NTLM、1641 亿次 MD5，而 bcrypt 只有 18.4 万次——bcrypt 是故意做慢的。所以含符号的 8 位 ASCII 密码在用 NTLM 的地方不到三小时就破，在用 bcrypt 的地方能撑五百多年。而用哪种，输密码的人无从选择。',
    '同一個密碼，因儲存方式不同，答案可以相差一百萬倍以上。一張 RTX 4090 每秒能試 2885 億次 NTLM、1641 億次 MD5，而 bcrypt 只有 18.4 萬次——bcrypt 是故意做慢的。所以含符號的 8 位 ASCII 密碼在用 NTLM 的地方不到三小時就破，在用 bcrypt 的地方能撐五百多年。而用哪種，輸密碼的人無從選擇。',
  ),

  hangulTitle: T('한글은 한 글자가 두 글자 몫', 'A Hangul syllable is worth two ASCII characters', 'Una sílaba hangul vale dos caracteres ASCII', 'Uma sílaba hangul vale dois caracteres ASCII', 'ハングルは1文字が2文字分', 'Eine Hangul-Silbe zählt wie zwei ASCII-Zeichen', 'Une syllabe hangeul en vaut deux', 'एक हंगुल अक्षर दो ASCII वर्णों जितना', '一个韩文音节抵两个 ASCII 字符', '一個韓文音節抵兩個 ASCII 字元'),

  hangulNote: T(
    '완성형이 정한 상용 한글 음절은 2,350자입니다. 자모가 아니라 음절 하나를 한 글자로 세므로 한 글자가 11.2비트를 담습니다 — 아스키 한 글자의 1.7배입니다. 그래서 한글 여덟 글자가 아스키 열세 글자보다 세고 열네 글자보다는 약합니다. 다만 쓸 수 있는 곳이 정해져 있고, 입력기가 없는 기기에서는 아예 못 칩니다.',
    'The standard Hangul block holds 2,350 syllables. Counting a whole syllable as one character, each carries 11.2 bits — 1.7 times an ASCII character. Eight Hangul syllables therefore beat thirteen ASCII characters and fall short of fourteen. The catch is that many systems reject them, and without an input method you cannot type them at all.',
    'El bloque estándar de hangul tiene 2.350 sílabas. Contando cada sílaba como un carácter, aporta 11,2 bits: 1,7 veces un carácter ASCII. Ocho sílabas hangul superan a trece caracteres ASCII y no llegan a catorce. El problema es que muchos sistemas no las aceptan y sin teclado adecuado no se pueden escribir.',
    'O bloco padrão de hangul tem 2.350 sílabas. Contando cada sílaba como um caractere, ela carrega 11,2 bits — 1,7 vez um caractere ASCII. Oito sílabas hangul superam treze caracteres ASCII e ficam abaixo de catorze. O porém é que muitos sistemas as rejeitam e sem teclado adequado não dá para digitar.',
    '完成形が定めた常用ハングル音節は2,350字です。字母ではなく音節1つを1文字と数えるので、1文字が11.2ビットを担います — ASCII 1文字の1.7倍です。だからハングル8文字はASCII 13文字より強く、14文字には届きません。ただし受け付けない所が多く、入力機がない端末では打てません。',
    'Der Standard-Hangul-Block umfasst 2.350 Silben. Zählt man eine ganze Silbe als ein Zeichen, trägt sie 11,2 Bit — das 1,7-Fache eines ASCII-Zeichens. Acht Hangul-Silben schlagen daher dreizehn ASCII-Zeichen und bleiben unter vierzehn. Der Haken: viele Systeme lehnen sie ab, und ohne Eingabemethode lassen sie sich gar nicht tippen.',
    'Le bloc hangeul standard compte 2 350 syllabes. En comptant la syllabe entière comme un caractère, elle porte 11,2 bits — 1,7 fois un caractère ASCII. Huit syllabes hangeul battent donc treize caractères ASCII et n’atteignent pas quatorze. Le hic : beaucoup de systèmes les refusent, et sans méthode de saisie on ne peut pas les taper.',
    'मानक हंगुल खंड में 2,350 अक्षर हैं। पूरे अक्षर को एक वर्ण गिनने पर वह 11.2 बिट रखता है — ASCII वर्ण का 1.7 गुना। इसलिए आठ हंगुल अक्षर तेरह ASCII वर्णों से बेहतर और चौदह से कम हैं। अड़चन यह कि कई सिस्टम इन्हें स्वीकार नहीं करते और इनपुट विधि बिना टाइप ही नहीं होते।',
    '标准韩文区共有 2,350 个音节。把一个音节算作一个字符，它就承载 11.2 位——是 ASCII 字符的 1.7 倍。所以八个韩文音节强过十三个 ASCII 字符，又不及十四个。问题在于很多系统不接受，没有输入法的设备根本打不出来。',
    '標準韓文區共有 2,350 個音節。把一個音節算作一個字元，它就承載 11.2 位——是 ASCII 字元的 1.7 倍。所以八個韓文音節強過十三個 ASCII 字元，又不及十四個。問題在於很多系統不接受，沒有輸入法的裝置根本打不出來。',
  ),

  assumeTitle: T('이 표가 세는 것과 세지 않는 것', 'What this table counts and what it does not', 'Lo que esta tabla cuenta y lo que no', 'O que esta tabela conta e o que não', 'この表が数えるものと数えないもの', 'Was diese Tabelle zählt und was nicht', 'Ce que ce tableau compte et ce qu’il ignore', 'यह तालिका क्या गिनती है और क्या नहीं', '这张表算什么、不算什么', '這張表算什麼、不算什麼'),

  assumeNote: T(
    '여기 적힌 시간은 **무작위로 고른 비밀번호**를 처음부터 끝까지 훑을 때의 값입니다. 사람이 지은 비밀번호는 그만큼 못 버팁니다 — 사전에 있는 낱말, 자판 순서, 생일, 뒤에 붙인 !와 1은 공격하는 쪽이 먼저 시도합니다. "P@ssw0rd!"는 아스키 9자로 세면 59비트지만 실제로는 몇 초입니다. 반대로 카드가 여러 장이면 시간은 장수만큼 나뉩니다.',
    'The times here assume a **randomly chosen** password searched from end to end. Human-made passwords do not last that long — dictionary words, keyboard runs, birthdays, and the ! or 1 tacked on the end are tried first. “P@ssw0rd!” counts as 59 bits for nine ASCII characters but falls in seconds. In the other direction, more cards divide the time by however many there are.',
    'Los tiempos aquí suponen una contraseña **elegida al azar** recorrida de principio a fin. Las contraseñas hechas por personas no aguantan tanto: palabras de diccionario, secuencias de teclado, cumpleaños y el ! o el 1 del final se prueban primero. «P@ssw0rd!» cuenta como 59 bits con nueve caracteres ASCII, pero cae en segundos. Al revés, con varias tarjetas el tiempo se divide entre cuantas haya.',
    'Os tempos aqui supõem uma senha **escolhida ao acaso** varrida do início ao fim. Senhas feitas por pessoas não duram tanto: palavras de dicionário, sequências de teclado, datas de nascimento e o ! ou 1 no fim são tentados primeiro. “P@ssw0rd!” conta 59 bits com nove caracteres ASCII, mas cai em segundos. No sentido oposto, várias placas dividem o tempo pelo número delas.',
    'ここの時間は**無作為に選んだ**パスワードを端から端まで探す場合の値です。人が作ったものはそこまで持ちません — 辞書の単語、キーボードの並び、誕生日、末尾に足した!や1は攻める側が先に試します。「P@ssw0rd!」はASCII 9文字で59ビットですが実際は数秒です。逆にカードが何枚もあれば時間は枚数で割られます。',
    'Die Zeiten hier gelten für ein **zufällig gewähltes** Passwort, das komplett durchsucht wird. Menschgemachte Passwörter halten so lange nicht — Wörterbuchwörter, Tastaturreihen, Geburtstage und das angehängte ! oder 1 werden zuerst probiert. „P@ssw0rd!“ zählt als 59 Bit bei neun ASCII-Zeichen, fällt aber in Sekunden. Umgekehrt teilt sich die Zeit durch die Zahl der Karten.',
    'Les durées ici supposent un mot de passe **choisi au hasard** parcouru de bout en bout. Ceux inventés par des humains ne tiennent pas autant : mots du dictionnaire, suites de clavier, dates de naissance et le ! ou le 1 ajouté à la fin sont essayés en premier. « P@ssw0rd! » compte 59 bits pour neuf caractères ASCII, mais tombe en quelques secondes. À l’inverse, plusieurs cartes divisent la durée d’autant.',
    'यहाँ दिए समय **यादृच्छिक रूप से चुने** पासवर्ड को पूरा खंगालने के हैं। इंसान के बनाए पासवर्ड इतना नहीं टिकते — शब्दकोश के शब्द, कीबोर्ड क्रम, जन्मदिन और अंत में जोड़ा ! या 1 पहले आज़माए जाते हैं। “P@ssw0rd!” नौ ASCII वर्णों पर 59 बिट गिना जाता है पर सेकंडों में गिरता है। दूसरी ओर, कई कार्ड होने पर समय उतने से बँट जाता है।',
    '这里的时间假设密码是**随机选取**并从头到尾穷举的。人编的密码撑不了这么久——词典词、键盘顺序、生日，以及结尾加的 ! 和 1，攻击方会先试。"P@ssw0rd!" 按九位 ASCII 算是 59 位，实际几秒就破。反过来，显卡多几张，时间就除以几。',
    '這裡的時間假設密碼是**隨機選取**並從頭到尾窮舉的。人編的密碼撐不了這麼久——詞典詞、鍵盤順序、生日，以及結尾加的 ! 和 1，攻擊方會先試。「P@ssw0rd!」按九位 ASCII 算是 59 位，實際幾秒就破。反過來，顯卡多幾張，時間就除以幾。',
  ),

  reuseTitle: T('가장 흔한 사고는 뚫린 게 아닙니다', 'The usual accident is not cracking', 'El accidente habitual no es el descifrado', 'O acidente comum não é a quebra', 'いちばん多い事故は破られることではありません', 'Der häufigste Unfall ist nicht das Knacken', 'L’accident courant n’est pas le cassage', 'सबसे आम हादसा तोड़ना नहीं है', '最常见的事故不是被破解', '最常見的事故不是被破解'),

  reuseNote: T(
    '한 곳에서 새어 나간 비밀번호를 다른 곳에 그대로 넣어 보는 것이 훨씬 흔합니다. 몇 년이 걸릴 비밀번호라도 두 곳에 같이 쓰면 약한 쪽이 뚫린 날 함께 무너집니다. 길이를 늘리는 것보다 **다시 쓰지 않는 것**과 2단계 인증이 먼저입니다.',
    'Far more common is a password leaked from one site being typed into another. A password that would take years still falls the day the weaker site is breached, if it was used in both places. Not reusing it, and turning on a second factor, come before adding length.',
    'Mucho más común es que una contraseña filtrada en un sitio se pruebe en otro. Una que tardaría años igual cae el día que el sitio más débil sufre una brecha, si se usó en ambos. No reutilizarla y activar un segundo factor van antes que alargarla.',
    'Bem mais comum é uma senha vazada de um site ser testada em outro. Uma que levaria anos cai no dia em que o site mais fraco é invadido, se foi usada nos dois. Não reutilizar e ativar um segundo fator vêm antes de aumentar o comprimento.',
    'ある所から漏れたパスワードを別の所でそのまま試すほうがずっと多いです。何年もかかるはずのパスワードでも、2か所で使い回していれば弱いほうが破られた日に一緒に落ちます。長さを伸ばすことより、**使い回さないこと**と2段階認証が先です。',
    'Weit häufiger ist, dass ein anderswo geleaktes Passwort einfach hier probiert wird. Ein Passwort, das Jahre bräuchte, fällt trotzdem an dem Tag, an dem die schwächere Seite gehackt wird — sofern es dort auch stand. Nicht wiederverwenden und zweiter Faktor kommen vor mehr Länge.',
    'Bien plus courant : un mot de passe fuité ailleurs est simplement essayé ici. Un mot de passe qui tiendrait des années tombe le jour où le site le plus faible est piraté, s’il y servait aussi. Ne pas le réutiliser et activer un second facteur passent avant l’allongement.',
    'कहीं और से लीक हुआ पासवर्ड यहाँ आज़माना कहीं ज़्यादा आम है। वर्षों टिकने वाला पासवर्ड भी उसी दिन गिर जाता है जिस दिन कमज़ोर साइट टूटती है, अगर वही पासवर्ड वहाँ भी था। लंबाई बढ़ाने से पहले **दोबारा इस्तेमाल न करना** और दो-चरणीय सत्यापन आता है।',
    '更常见的是：从一个网站泄露的密码，被原样拿到另一个网站去试。哪怕要几年才能破的密码，只要两处共用，弱的那边被攻破的当天它也一起完了。比加长更优先的是**不重复使用**和开启两步验证。',
    '更常見的是：從一個網站外洩的密碼，被原樣拿到另一個網站去試。哪怕要幾年才能破的密碼，只要兩處共用，弱的那邊被攻破的當天它也一起完了。比加長更優先的是**不重複使用**和開啟兩步驟驗證。',
  ),

  tableTitle: T('집합과 길이로 찾기', 'Find it by alphabet and length', 'Búscalo por alfabeto y longitud', 'Ache por alfabeto e comprimento', '集合と長さから探す', 'Nach Zeichenvorrat und Länge suchen', 'Chercher par jeu et longueur', 'समुच्चय और लंबाई से देखें', '按字符集和长度查找', '按字元集和長度查找'),
  neighbourTitle: T('가까운 길이', 'Nearby lengths', 'Longitudes cercanas', 'Comprimentos próximos', '近い長さ', 'Längen daneben', 'Longueurs voisines', 'पास की लंबाइयाँ', '相邻长度', '相鄰長度'),
  charsetRowTitle: T('같은 집합, 다른 길이', 'Same alphabet, other lengths', 'Mismo alfabeto, otras longitudes', 'Mesmo alfabeto, outros comprimentos', '同じ集合、別の長さ', 'Gleicher Vorrat, andere Längen', 'Même jeu, autres longueurs', 'वही समुच्चय, दूसरी लंबाइयाँ', '同一字符集，不同长度', '同一字元集，不同長度'),
  lengthRowTitle: T('같은 길이, 다른 집합', 'Same length, other alphabets', 'Misma longitud, otros alfabetos', 'Mesmo comprimento, outros alfabetos', '同じ長さ、別の集合', 'Gleiche Länge, andere Vorräte', 'Même longueur, autres jeux', 'वही लंबाई, दूसरे समुच्चय', '同一长度，不同字符集', '同一長度，不同字元集'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '한 글자가 담는 비트 = log2(집합 크기). 전체는 여기에 길이를 곱합니다.',
      '뚫는 시간 = 경우의 수의 절반 ÷ 초당 시도 횟수.',
      '속도는 hashcat을 RTX 4090 한 장에서 돌린 공개 측정값입니다.',
      '무작위 비밀번호를 전제한 값입니다. 사람이 지은 것은 훨씬 빨리 뚫립니다.',
    ],
    [
      'Bits per character = log2(alphabet size). Multiply by length for the total.',
      'Time to crack = half the combinations ÷ guesses per second.',
      'The speeds are published hashcat measurements on a single RTX 4090.',
      'These assume a random password. Human-made ones fall far sooner.',
    ],
    [
      'Bits por carácter = log2(tamaño del alfabeto). Multiplica por la longitud.',
      'Tiempo hasta romperla = la mitad de las combinaciones ÷ intentos por segundo.',
      'Las velocidades son medidas publicadas de hashcat en una RTX 4090.',
      'Suponen una contraseña aleatoria. Las hechas por personas caen mucho antes.',
    ],
    [
      'Bits por caractere = log2(tamanho do alfabeto). Multiplique pelo comprimento.',
      'Tempo até quebrar = metade das combinações ÷ tentativas por segundo.',
      'As velocidades são medições publicadas do hashcat numa RTX 4090.',
      'Supõem senha aleatória. As feitas por pessoas caem bem antes.',
    ],
    [
      '1文字あたりのビット = log2(集合の大きさ)。全体は長さを掛けます。',
      '破る時間 = 組み合わせ数の半分 ÷ 毎秒の試行回数。',
      '速度はhashcatをRTX 4090 1枚で回した公開実測値です。',
      '無作為なパスワードを前提とした値です。人が作ったものはずっと早く落ちます。',
    ],
    [
      'Bits pro Zeichen = log2(Zeichenvorrat). Mal Länge ergibt die Summe.',
      'Knackdauer = halbe Kombinationszahl ÷ Versuche pro Sekunde.',
      'Die Geschwindigkeiten sind veröffentlichte hashcat-Messungen auf einer RTX 4090.',
      'Sie gelten für zufällige Passwörter. Menschgemachte fallen viel früher.',
    ],
    [
      'Bits par caractère = log2(taille du jeu). Multiplié par la longueur pour le total.',
      'Temps de cassage = moitié des combinaisons ÷ essais par seconde.',
      'Les vitesses sont des mesures hashcat publiées sur une RTX 4090.',
      'Elles supposent un mot de passe aléatoire. Ceux inventés tombent bien plus vite.',
    ],
    [
      'प्रति वर्ण बिट = log2(समुच्चय आकार)। कुल के लिए लंबाई से गुणा करें।',
      'तोड़ने का समय = संयोजनों का आधा ÷ प्रति सेकंड प्रयास।',
      'गति एक RTX 4090 पर hashcat की प्रकाशित माप है।',
      'ये यादृच्छिक पासवर्ड मानकर हैं। इंसान के बनाए बहुत पहले गिरते हैं।',
    ],
    [
      '每个字符的位数 = log2(字符集大小)，再乘以长度就是总数。',
      '破解时间 = 组合数的一半 ÷ 每秒尝试次数。',
      '速度取自 hashcat 在单张 RTX 4090 上的公开实测值。',
      '这些数字假设密码是随机的。人编的会早得多被破。',
    ],
    [
      '每個字元的位數 = log2(字元集大小)，再乘以長度就是總數。',
      '破解時間 = 組合數的一半 ÷ 每秒嘗試次數。',
      '速度取自 hashcat 在單張 RTX 4090 上的公開實測值。',
      '這些數字假設密碼是隨機的。人編的會早得多被破。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '비밀번호 세기 계산 — 몇 비트이고 얼마나 버티나',
    'Password strength — how many bits, and how long it holds',
    'Fuerza de contraseñas — cuántos bits y cuánto aguanta',
    'Força de senhas — quantos bits e quanto aguenta',
    'パスワードの強さ計算 — 何ビットで、どれだけ持つか',
    'Passwortstärke — wie viele Bits und wie lange es hält',
    'Force des mots de passe — combien de bits, et combien de temps',
    'पासवर्ड की मज़बूती — कितने बिट और कितना टिकता है',
    '密码强度计算 — 多少位熵，能撑多久',
    '密碼強度計算 — 多少位熵，能撐多久',
  ),

  hubMetaDesc: T(
    '기호를 포함한 아스키 12자는 78.7비트이고, NTLM으로 저장된 곳이면 2만 6천 년, bcrypt로 저장된 곳이면 400억 년입니다. 문자 집합 10가지 × 길이 10가지 100칸의 비트와 시간을 hashcat 실측 속도로 계산했습니다.',
    'Twelve ASCII characters with symbols come to 78.7 bits: 26,000 years against NTLM storage, 41 billion years against bcrypt. Bits and time-to-crack for 10 character sets × 10 lengths, using measured hashcat speeds.',
    'Doce caracteres ASCII con símbolos son 78,7 bits: 26.000 años frente a NTLM, 41.000 millones de años frente a bcrypt. Bits y tiempos para 10 conjuntos × 10 longitudes, con velocidades medidas de hashcat.',
    'Doze caracteres ASCII com símbolos dão 78,7 bits: 26 mil anos contra NTLM, 41 bilhões de anos contra bcrypt. Bits e tempos para 10 conjuntos × 10 comprimentos, com velocidades medidas do hashcat.',
    '記号を含むASCII 12文字は78.7ビットで、NTLM保存なら2万6千年、bcrypt保存なら410億年です。文字集合10通り×長さ10通りの100マスをhashcatの実測速度で計算しました。',
    'Zwölf ASCII-Zeichen mit Symbolen ergeben 78,7 Bit: 26.000 Jahre bei NTLM, 41 Milliarden Jahre bei bcrypt. Bits und Knackdauer für 10 Zeichensätze × 10 Längen mit gemessenen hashcat-Geschwindigkeiten.',
    'Douze caractères ASCII avec symboles font 78,7 bits : 26 000 ans face à NTLM, 41 milliards d’années face à bcrypt. Bits et durées pour 10 jeux × 10 longueurs, à vitesses hashcat mesurées.',
    'चिह्नों सहित बारह ASCII वर्ण 78.7 बिट देते हैं: NTLM पर 26,000 वर्ष, bcrypt पर 41 अरब वर्ष। 10 समुच्चय × 10 लंबाइयों के बिट और समय, hashcat की मापी गति से।',
    '含符号的 12 位 ASCII 密码是 78.7 位熵：存成 NTLM 要 2.6 万年，存成 bcrypt 要 410 亿年。10 种字符集 × 10 种长度共 100 格，按 hashcat 实测速度计算。',
    '含符號的 12 位 ASCII 密碼是 78.7 位熵：存成 NTLM 要 2.6 萬年，存成 bcrypt 要 410 億年。10 種字元集 × 10 種長度共 100 格，按 hashcat 實測速度計算。',
  ),

  desc: T<(f: PasswordFacts) => string>(
    f => `한 글자가 ${f.perChar}비트를 담아 전체 ${f.bits}비트이고, 경우의 수는 10의 ${f.digits}제곱입니다. 아스키 94자로 같은 세기를 내려면 ${f.asciiEquivalent}글자가 필요합니다.`,
    f => `Each character carries ${f.perChar} bits for ${f.bits} in total, or 10^${f.digits} combinations. Matching that with the 94 printable ASCII characters would take ${f.asciiEquivalent} of them.`,
    f => `Cada carácter aporta ${f.perChar} bits, ${f.bits} en total, o 10^${f.digits} combinaciones. Igualarlo con los 94 caracteres ASCII exigiría ${f.asciiEquivalent}.`,
    f => `Cada caractere carrega ${f.perChar} bits, ${f.bits} no total, ou 10^${f.digits} combinações. Igualar isso com os 94 caracteres ASCII exigiria ${f.asciiEquivalent}.`,
    f => `1文字が${f.perChar}ビットを担い全体で${f.bits}ビット、組み合わせは10の${f.digits}乗です。ASCII 94文字で同じ強さを出すには${f.asciiEquivalent}文字必要です。`,
    f => `Jedes Zeichen trägt ${f.perChar} Bit, zusammen ${f.bits} Bit oder 10^${f.digits} Kombinationen. Mit den 94 ASCII-Zeichen bräuchte man dafür ${f.asciiEquivalent} Stück.`,
    f => `Chaque caractère porte ${f.perChar} bits, soit ${f.bits} au total, ou 10^${f.digits} combinaisons. Pour égaler cela avec les 94 caractères ASCII, il en faudrait ${f.asciiEquivalent}.`,
    f => `हर वर्ण ${f.perChar} बिट रखता है, कुल ${f.bits} बिट, यानी 10^${f.digits} संयोजन। 94 ASCII वर्णों से यही मज़बूती पाने को ${f.asciiEquivalent} वर्ण चाहिए।`,
    f => `每个字符承载 ${f.perChar} 位，共 ${f.bits} 位，组合数为 10 的 ${f.digits} 次方。要用 94 个 ASCII 字符达到同样强度，需要 ${f.asciiEquivalent} 个。`,
    f => `每個字元承載 ${f.perChar} 位，共 ${f.bits} 位，組合數為 10 的 ${f.digits} 次方。要用 94 個 ASCII 字元達到同樣強度，需要 ${f.asciiEquivalent} 個。`,
  ),

  metaTitle: T<(f: PasswordFacts) => string>(
    f => `${csKo[f.cell.charset]} ${f.cell.length}자 — ${f.bits}비트`,
    f => `${f.cell.length} characters of ${csEn[f.cell.charset]} — ${f.bits} bits`,
    f => `${f.cell.length} caracteres de ${csEs[f.cell.charset]} — ${f.bits} bits`,
    f => `${f.cell.length} caracteres de ${csPt[f.cell.charset]} — ${f.bits} bits`,
    f => `${csJa[f.cell.charset]}${f.cell.length}文字 — ${f.bits}ビット`,
    f => `${f.cell.length} Zeichen aus ${csDe[f.cell.charset]} — ${f.bits} Bit`,
    f => `${f.cell.length} caractères de ${csFr[f.cell.charset]} — ${f.bits} bits`,
    f => `${csHi[f.cell.charset]} के ${f.cell.length} वर्ण — ${f.bits} बिट`,
    f => `${csZh[f.cell.charset]} ${f.cell.length} 位 — ${f.bits} 位熵`,
    f => `${csTw[f.cell.charset]} ${f.cell.length} 位 — ${f.bits} 位熵`,
  ),

  metaDesc: T<(f: PasswordFacts) => string>(
    f => `${csKo[f.cell.charset]}(${f.size}종)로 만든 ${f.cell.length}자 비밀번호는 ${f.bits}비트, 경우의 수 10의 ${f.digits}제곱입니다. RTX 4090 한 장 기준으로 MD5 저장이면 ${f.bits}비트를 훑는 데 얼마나 걸리는지, bcrypt 저장이면 얼마나 걸리는지 함께 냈습니다.`,
    f => `A ${f.cell.length}-character password from ${csEn[f.cell.charset]} (${f.size} options) is ${f.bits} bits, or 10^${f.digits} combinations. Times are given for MD5 and for bcrypt storage on a single RTX 4090.`,
    f => `Una contraseña de ${f.cell.length} caracteres con ${csEs[f.cell.charset]} (${f.size} opciones) son ${f.bits} bits, o 10^${f.digits} combinaciones. Se dan los tiempos para MD5 y para bcrypt en una RTX 4090.`,
    f => `Uma senha de ${f.cell.length} caracteres com ${csPt[f.cell.charset]} (${f.size} opções) é ${f.bits} bits, ou 10^${f.digits} combinações. Os tempos são dados para MD5 e para bcrypt numa RTX 4090.`,
    f => `${csJa[f.cell.charset]}(${f.size}種)で作った${f.cell.length}文字は${f.bits}ビット、組み合わせは10の${f.digits}乗です。RTX 4090 1枚でMD5保存の場合とbcrypt保存の場合の時間を併記しました。`,
    f => `Ein ${f.cell.length}-Zeichen-Passwort aus ${csDe[f.cell.charset]} (${f.size} Möglichkeiten) hat ${f.bits} Bit, also 10^${f.digits} Kombinationen. Angegeben sind die Zeiten für MD5 und für bcrypt auf einer RTX 4090.`,
    f => `Un mot de passe de ${f.cell.length} caractères en ${csFr[f.cell.charset]} (${f.size} possibilités) fait ${f.bits} bits, soit 10^${f.digits} combinaisons. Les durées sont données pour MD5 et pour bcrypt sur une RTX 4090.`,
    f => `${csHi[f.cell.charset]} (${f.size} विकल्प) से बना ${f.cell.length} वर्ण का पासवर्ड ${f.bits} बिट है, यानी 10^${f.digits} संयोजन। एक RTX 4090 पर MD5 और bcrypt दोनों के समय दिए हैं।`,
    f => `用${csZh[f.cell.charset]}（${f.size} 种）组成的 ${f.cell.length} 位密码是 ${f.bits} 位熵，组合数 10 的 ${f.digits} 次方。文中同时给出单张 RTX 4090 下 MD5 与 bcrypt 两种存储的破解时间。`,
    f => `用${csTw[f.cell.charset]}（${f.size} 種）組成的 ${f.cell.length} 位密碼是 ${f.bits} 位熵，組合數 10 的 ${f.digits} 次方。文中同時給出單張 RTX 4090 下 MD5 與 bcrypt 兩種儲存的破解時間。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '비밀번호는 몇 자가 안전한가요?', a: '저장 방식에 달렸습니다. 기호를 포함한 아스키 12자가 78.7비트인데, NTLM으로 저장된 곳이면 2만 6천 년이고 bcrypt면 400억 년입니다. 여덟 자로 줄이면 NTLM에서는 세 시간이 안 됩니다.' },
      { q: '길이를 늘리는 것과 기호를 넣는 것 중 뭐가 낫나요?', a: '대개 길이입니다. 아스키에서 한 글자를 더하면 6.6비트가 붙지만, 소문자에서 아스키로 넓혀도 한 글자당 1.9비트만 늘어납니다.' },
      { q: '한글로 만들면 더 센가요?', a: '한 글자가 11.2비트로 아스키의 1.7배입니다. 다만 받아 주는 곳이 적고 입력기가 없으면 못 칩니다.' },
      { q: '이 시간이 실제인가요?', a: '무작위로 고른 비밀번호를 처음부터 끝까지 훑을 때의 값입니다. 사람이 지은 비밀번호는 사전 공격에 훨씬 빨리 뚫립니다.' },
      { q: '가장 중요한 것은 무엇인가요?', a: '다시 쓰지 않는 것입니다. 유출된 비밀번호를 다른 곳에 넣어 보는 공격이 훨씬 흔합니다.' },
    ],
    [
      { q: 'How long should a password be?', a: 'It depends on how it is stored. Twelve ASCII characters with symbols is 78.7 bits: 26,000 years against NTLM, 41 billion against bcrypt. Drop to eight and NTLM falls in under three hours.' },
      { q: 'More length or more symbols?', a: 'Usually length. One more ASCII character adds 6.6 bits, while widening from lowercase to full ASCII adds only 1.9 bits per character.' },
      { q: 'Is a Hangul password stronger?', a: 'Each syllable carries 11.2 bits, 1.7 times an ASCII character. But few systems accept them and you cannot type them without an input method.' },
      { q: 'Are these times real?', a: 'They assume a randomly chosen password searched end to end. Human-made passwords fall far sooner to dictionary attacks.' },
      { q: 'What matters most?', a: 'Not reusing it. Typing a leaked password into another site is a far more common attack than cracking one.' },
    ],
    [
      { q: '¿Cuántos caracteres son seguros?', a: 'Depende de cómo se guarde. Doce caracteres ASCII con símbolos son 78,7 bits: 26.000 años con NTLM, 41.000 millones con bcrypt. Con ocho, NTLM cae en menos de tres horas.' },
      { q: '¿Más longitud o más símbolos?', a: 'Normalmente longitud. Un carácter ASCII más suma 6,6 bits; pasar de minúsculas a ASCII completo solo suma 1,9 bits por carácter.' },
      { q: '¿Es más fuerte en hangul?', a: 'Cada sílaba aporta 11,2 bits, 1,7 veces un carácter ASCII. Pero pocos sistemas lo aceptan y sin teclado adecuado no se escribe.' },
      { q: '¿Son reales estos tiempos?', a: 'Suponen una contraseña aleatoria recorrida entera. Las hechas por personas caen mucho antes ante ataques de diccionario.' },
      { q: '¿Qué importa más?', a: 'No reutilizarla. Probar en otro sitio una contraseña filtrada es un ataque mucho más común que descifrarla.' },
    ],
    [
      { q: 'Quantos caracteres são seguros?', a: 'Depende de como é guardada. Doze caracteres ASCII com símbolos são 78,7 bits: 26 mil anos com NTLM, 41 bilhões com bcrypt. Com oito, o NTLM cai em menos de três horas.' },
      { q: 'Mais comprimento ou mais símbolos?', a: 'Em geral comprimento. Mais um caractere ASCII soma 6,6 bits; ir de minúsculas ao ASCII completo soma só 1,9 bit por caractere.' },
      { q: 'Em hangul é mais forte?', a: 'Cada sílaba carrega 11,2 bits, 1,7 vez um caractere ASCII. Mas poucos sistemas aceitam e sem teclado não dá para digitar.' },
      { q: 'Esses tempos são reais?', a: 'Supõem senha aleatória varrida por inteiro. As feitas por pessoas caem bem antes com ataques de dicionário.' },
      { q: 'O que mais importa?', a: 'Não reutilizar. Testar em outro site uma senha vazada é um ataque bem mais comum que quebrar uma.' },
    ],
    [
      { q: 'パスワードは何文字が安全ですか？', a: '保存方式によります。記号を含むASCII 12文字は78.7ビットで、NTLM保存なら2万6千年、bcryptなら410億年です。8文字に減らすとNTLMでは3時間もかかりません。' },
      { q: '長さと記号のどちらが効きますか？', a: '多くは長さです。ASCIIで1文字増やせば6.6ビット付きますが、小文字からASCIIに広げても1文字あたり1.9ビットです。' },
      { q: 'ハングルにすると強いですか？', a: '1文字が11.2ビットでASCIIの1.7倍です。ただし受け付ける所が少なく、入力機がないと打てません。' },
      { q: 'この時間は実際のものですか？', a: '無作為なパスワードを端から端まで探す前提の値です。人が作ったものは辞書攻撃でずっと早く落ちます。' },
      { q: 'いちばん大事なことは？', a: '使い回さないことです。漏れたパスワードを別の所で試す攻撃のほうがはるかに多いです。' },
    ],
    [
      { q: 'Wie lang sollte ein Passwort sein?', a: 'Das hängt von der Speicherung ab. Zwölf ASCII-Zeichen mit Symbolen sind 78,7 Bit: 26.000 Jahre bei NTLM, 41 Milliarden bei bcrypt. Mit acht Zeichen fällt NTLM in unter drei Stunden.' },
      { q: 'Mehr Länge oder mehr Sonderzeichen?', a: 'Meist Länge. Ein ASCII-Zeichen mehr bringt 6,6 Bit; der Sprung von Kleinbuchstaben zu vollem ASCII nur 1,9 Bit je Zeichen.' },
      { q: 'Ist Hangul stärker?', a: 'Jede Silbe trägt 11,2 Bit, das 1,7-Fache eines ASCII-Zeichens. Nur akzeptieren das wenige Systeme, und ohne Eingabemethode geht es gar nicht.' },
      { q: 'Sind diese Zeiten echt?', a: 'Sie gelten für zufällige Passwörter, komplett durchsucht. Menschgemachte fallen Wörterbuchangriffen viel früher zum Opfer.' },
      { q: 'Was zählt am meisten?', a: 'Nicht wiederverwenden. Ein geleaktes Passwort woanders auszuprobieren ist weit häufiger als echtes Knacken.' },
    ],
    [
      { q: 'Combien de caractères faut-il ?', a: 'Cela dépend du stockage. Douze caractères ASCII avec symboles font 78,7 bits : 26 000 ans face à NTLM, 41 milliards face à bcrypt. À huit caractères, NTLM tombe en moins de trois heures.' },
      { q: 'Allonger ou ajouter des symboles ?', a: 'Le plus souvent allonger. Un caractère ASCII de plus apporte 6,6 bits ; passer des minuscules à l’ASCII complet n’apporte que 1,9 bit par caractère.' },
      { q: 'Le hangeul est-il plus fort ?', a: 'Chaque syllabe porte 11,2 bits, 1,7 fois un caractère ASCII. Mais peu de systèmes l’acceptent et sans méthode de saisie on ne peut pas le taper.' },
      { q: 'Ces durées sont-elles réelles ?', a: 'Elles supposent un mot de passe aléatoire parcouru entièrement. Ceux inventés tombent bien plus vite face aux attaques par dictionnaire.' },
      { q: 'Qu’est-ce qui compte le plus ?', a: 'Ne pas le réutiliser. Essayer ailleurs un mot de passe fuité est une attaque bien plus courante que le cassage.' },
    ],
    [
      { q: 'पासवर्ड कितना लंबा हो?', a: 'यह भंडारण पर निर्भर है। चिह्नों सहित 12 ASCII वर्ण 78.7 बिट हैं: NTLM पर 26,000 वर्ष, bcrypt पर 41 अरब। आठ वर्ण पर NTLM तीन घंटे से कम में गिरता है।' },
      { q: 'लंबाई बढ़ाएँ या चिह्न जोड़ें?', a: 'अक्सर लंबाई। एक और ASCII वर्ण 6.6 बिट जोड़ता है, जबकि छोटे अक्षरों से पूरे ASCII तक जाने पर प्रति वर्ण केवल 1.9 बिट।' },
      { q: 'क्या हंगुल में ज़्यादा मज़बूत होगा?', a: 'हर अक्षर 11.2 बिट रखता है, ASCII का 1.7 गुना। पर कम सिस्टम इसे स्वीकारते हैं और इनपुट विधि बिना टाइप नहीं होता।' },
      { q: 'क्या ये समय वास्तविक हैं?', a: 'ये यादृच्छिक पासवर्ड को पूरा खंगालने के हैं। इंसान के बनाए शब्दकोश हमलों में बहुत जल्दी गिरते हैं।' },
      { q: 'सबसे ज़्यादा क्या मायने रखता है?', a: 'दोबारा इस्तेमाल न करना। लीक हुआ पासवर्ड दूसरी जगह आज़माना तोड़ने से कहीं आम हमला है।' },
    ],
    [
      { q: '密码多长才安全？', a: '取决于怎么存。含符号的 12 位 ASCII 是 78.7 位熵：存成 NTLM 要 2.6 万年，存成 bcrypt 要 410 亿年。减到八位，NTLM 不到三小时就破。' },
      { q: '加长度还是加符号？', a: '通常是长度。多一个 ASCII 字符加 6.6 位，而从小写扩到完整 ASCII 每个字符只多 1.9 位。' },
      { q: '用韩文会更强吗？', a: '每个音节 11.2 位，是 ASCII 字符的 1.7 倍。但接受的系统很少，没有输入法也打不出来。' },
      { q: '这些时间是真的吗？', a: '它们假设密码随机且从头穷举。人编的密码在词典攻击下会早得多被破。' },
      { q: '最重要的是什么？', a: '不要重复使用。把泄露的密码拿到别处去试，比真去破解常见得多。' },
    ],
    [
      { q: '密碼多長才安全？', a: '取決於怎麼存。含符號的 12 位 ASCII 是 78.7 位熵：存成 NTLM 要 2.6 萬年，存成 bcrypt 要 410 億年。減到八位，NTLM 不到三小時就破。' },
      { q: '加長度還是加符號？', a: '通常是長度。多一個 ASCII 字元加 6.6 位，而從小寫擴到完整 ASCII 每個字元只多 1.9 位。' },
      { q: '用韓文會更強嗎？', a: '每個音節 11.2 位，是 ASCII 字元的 1.7 倍。但接受的系統很少，沒有輸入法也打不出來。' },
      { q: '這些時間是真的嗎？', a: '它們假設密碼隨機且從頭窮舉。人編的密碼在詞典攻擊下會早得多被破。' },
      { q: '最重要的是什麼？', a: '不要重複使用。把外洩的密碼拿到別處去試，比真去破解常見得多。' },
    ],
  ),

  cellFaq: T<(f: PasswordFacts) => FaqItem[]>(
    f => [
      { q: `${csKo[f.cell.charset]} ${f.cell.length}자는 몇 비트인가요?`, a: `${f.bits}비트입니다. 한 글자가 ${f.perChar}비트를 담고 여기에 ${f.cell.length}을 곱한 값입니다.` },
      { q: `경우의 수는 얼마인가요?`, a: `10의 ${f.digits}제곱입니다. ${f.size}을 ${f.cell.length}번 곱한 값입니다.` },
      { q: `아스키로 바꾸면 몇 자에 해당하나요?`, a: `${f.asciiEquivalent}자입니다. 기호를 포함한 아스키 94자 기준입니다.` },
      { q: `뚫는 데 얼마나 걸리나요?`, a: `저장 방식이 답을 바꿉니다. RTX 4090 한 장이 NTLM은 초당 2,885억 번, bcrypt는 18만 4천 번 두드리므로 시간이 백만 배 넘게 갈립니다.` },
    ],
    f => [
      { q: `How many bits is ${f.cell.length} characters of ${csEn[f.cell.charset]}?`, a: `${f.bits} bits — ${f.perChar} bits per character times ${f.cell.length}.` },
      { q: `How many combinations is that?`, a: `10^${f.digits}, which is ${f.size} multiplied by itself ${f.cell.length} times.` },
      { q: `What is that in ASCII characters?`, a: `${f.asciiEquivalent} of them, counting the 94 printable ASCII characters.` },
      { q: `How long would cracking take?`, a: `Storage decides. One RTX 4090 tries 288.5 billion NTLM hashes a second but only 184 thousand bcrypt, so the times differ by over a million.` },
    ],
    f => [
      { q: `¿Cuántos bits son ${f.cell.length} caracteres de ${csEs[f.cell.charset]}?`, a: `${f.bits} bits: ${f.perChar} bits por carácter por ${f.cell.length}.` },
      { q: `¿Cuántas combinaciones?`, a: `10^${f.digits}, es decir ${f.size} multiplicado por sí mismo ${f.cell.length} veces.` },
      { q: `¿Cuánto es en caracteres ASCII?`, a: `${f.asciiEquivalent}, contando los 94 caracteres ASCII imprimibles.` },
      { q: `¿Cuánto tardaría romperla?`, a: `Lo decide el almacenamiento. Una RTX 4090 prueba 288.500 millones de NTLM por segundo y solo 184.000 de bcrypt: más de un millón de diferencia.` },
    ],
    f => [
      { q: `Quantos bits são ${f.cell.length} caracteres de ${csPt[f.cell.charset]}?`, a: `${f.bits} bits: ${f.perChar} bits por caractere vezes ${f.cell.length}.` },
      { q: `Quantas combinações?`, a: `10^${f.digits}, ou seja ${f.size} multiplicado por si mesmo ${f.cell.length} vezes.` },
      { q: `Quanto é isso em caracteres ASCII?`, a: `${f.asciiEquivalent}, contando os 94 caracteres ASCII imprimíveis.` },
      { q: `Quanto levaria para quebrar?`, a: `Depende do armazenamento. Uma RTX 4090 testa 288,5 bilhões de NTLM por segundo e só 184 mil de bcrypt: mais de um milhão de diferença.` },
    ],
    f => [
      { q: `${csJa[f.cell.charset]}${f.cell.length}文字は何ビットですか？`, a: `${f.bits}ビットです。1文字が${f.perChar}ビットで、これに${f.cell.length}を掛けた値です。` },
      { q: `組み合わせはいくつですか？`, a: `10の${f.digits}乗です。${f.size}を${f.cell.length}回掛けた値です。` },
      { q: `ASCIIなら何文字分ですか？`, a: `${f.asciiEquivalent}文字です。記号を含むASCII 94文字を基準にしています。` },
      { q: `破るのにどれくらいかかりますか？`, a: `保存方式が答えを変えます。RTX 4090 1枚がNTLMは毎秒2,885億回、bcryptは18万4千回なので、時間が100万倍以上変わります。` },
    ],
    f => [
      { q: `Wie viele Bit sind ${f.cell.length} Zeichen aus ${csDe[f.cell.charset]}?`, a: `${f.bits} Bit — ${f.perChar} Bit je Zeichen mal ${f.cell.length}.` },
      { q: `Wie viele Kombinationen sind das?`, a: `10^${f.digits}, also ${f.size} mit sich selbst ${f.cell.length}-mal multipliziert.` },
      { q: `Wie viel ist das in ASCII-Zeichen?`, a: `${f.asciiEquivalent} Stück, gerechnet mit den 94 druckbaren ASCII-Zeichen.` },
      { q: `Wie lange dauerte das Knacken?`, a: `Die Speicherung entscheidet. Eine RTX 4090 schafft 288,5 Milliarden NTLM je Sekunde, aber nur 184 Tausend bcrypt — über eine Million Unterschied.` },
    ],
    f => [
      { q: `Combien de bits font ${f.cell.length} caractères de ${csFr[f.cell.charset]} ?`, a: `${f.bits} bits : ${f.perChar} bits par caractère multipliés par ${f.cell.length}.` },
      { q: `Cela fait combien de combinaisons ?`, a: `10^${f.digits}, soit ${f.size} multiplié par lui-même ${f.cell.length} fois.` },
      { q: `Cela équivaut à combien de caractères ASCII ?`, a: `${f.asciiEquivalent}, sur la base des 94 caractères ASCII imprimables.` },
      { q: `Combien de temps pour le casser ?`, a: `Le stockage décide. Une RTX 4090 essaie 288,5 milliards de NTLM par seconde mais seulement 184 mille bcrypt : plus d’un million d’écart.` },
    ],
    f => [
      { q: `${csHi[f.cell.charset]} के ${f.cell.length} वर्ण कितने बिट हैं?`, a: `${f.bits} बिट — प्रति वर्ण ${f.perChar} बिट को ${f.cell.length} से गुणा करके।` },
      { q: `कितने संयोजन बनते हैं?`, a: `10^${f.digits}, यानी ${f.size} को ${f.cell.length} बार गुणा करने पर।` },
      { q: `ASCII वर्णों में यह कितना है?`, a: `${f.asciiEquivalent} वर्ण, 94 छपने योग्य ASCII वर्णों के हिसाब से।` },
      { q: `तोड़ने में कितना समय लगेगा?`, a: `भंडारण तय करता है। एक RTX 4090 प्रति सेकंड 288.5 अरब NTLM पर केवल 1 लाख 84 हज़ार bcrypt आज़माता है — दस लाख गुना से ज़्यादा अंतर।` },
    ],
    f => [
      { q: `${csZh[f.cell.charset]} ${f.cell.length} 位是多少熵？`, a: `${f.bits} 位。每个字符 ${f.perChar} 位，再乘以 ${f.cell.length}。` },
      { q: `一共有多少种组合？`, a: `10 的 ${f.digits} 次方，也就是 ${f.size} 自乘 ${f.cell.length} 次。` },
      { q: `换成 ASCII 相当于几位？`, a: `${f.asciiEquivalent} 位，按含符号的 94 个 ASCII 字符计。` },
      { q: `破解要多久？`, a: `取决于存储方式。一张 RTX 4090 每秒能试 2885 亿次 NTLM，却只有 18.4 万次 bcrypt，时间相差一百万倍以上。` },
    ],
    f => [
      { q: `${csTw[f.cell.charset]} ${f.cell.length} 位是多少熵？`, a: `${f.bits} 位。每個字元 ${f.perChar} 位，再乘以 ${f.cell.length}。` },
      { q: `一共有多少種組合？`, a: `10 的 ${f.digits} 次方，也就是 ${f.size} 自乘 ${f.cell.length} 次。` },
      { q: `換成 ASCII 相當於幾位？`, a: `${f.asciiEquivalent} 位，按含符號的 94 個 ASCII 字元計。` },
      { q: `破解要多久？`, a: `取決於儲存方式。一張 RTX 4090 每秒能試 2885 億次 NTLM，卻只有 18.4 萬次 bcrypt，時間相差一百萬倍以上。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PASSWORD_UI: L<PasswordUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PasswordUI>;
