import type { CalcLang, CalcTable } from './types.ts';
import { DEV_UI } from './dev-tools.ts';

function withUi(lang: CalcLang, extra: Record<string, string>): Record<string, string> {
  return { ...DEV_UI[lang], ...extra };
}

/**
 * Unix 타임스탬프 변환기.
 *
 * 한국어판은 결과를 KST로 보여준다. 다국어판에서 그걸 그대로 쓰면 독일 사람이
 * 자기 시각이 아닌 한국 시각을 읽게 되므로, 여기서는 **브라우저의 현지 시간대**와
 * UTC 둘을 나란히 보여준다. 어느 나라에서 열어도 자기 시각이 먼저 보인다.
 */
export const DEV_TIMESTAMP: CalcTable = {
  en: {
    title: 'Unix timestamp converter',
    desc: 'Convert between Unix timestamps and dates, in your local time and UTC',
    short: 'Timestamp ↔ date',
    intro: [
      { h: 'Seconds or milliseconds', p: 'A Unix timestamp counts from 1 January 1970 UTC. Most systems count seconds; JavaScript counts milliseconds. Ten digits is seconds, thirteen is milliseconds — this tool guesses from the length and shows both.' },
      { h: 'Your time and UTC, side by side', p: 'The timestamp itself has no timezone; it is a single instant. What differs is how you write it down. Both your browser’s local time and UTC are shown so you can see which one a log or an API actually meant.' },
    ],
    faq: [
      { q: 'Why does my timestamp look ten digits long?', a: 'Because it is in seconds. Multiply by 1000 for milliseconds. A thirteen-digit number is already milliseconds.' },
      { q: 'What is the 2038 problem?', a: 'A signed 32-bit timestamp overflows on 19 January 2038. Modern systems use 64-bit values, which last longer than the Sun will.' },
      { q: 'Do timestamps account for leap seconds?', a: 'No. Unix time pretends every day has exactly 86,400 seconds, which is why it never has to know about leap seconds.' },
    ],
    ui: withUi('en', {
      toDate: 'Timestamp → date', toStamp: 'Date → timestamp', now: 'Now',
      stampInput: 'Unix timestamp (seconds or milliseconds)', dateInput: 'Date and time',
      local: 'Your local time', utc: 'UTC', seconds: 'Seconds', millis: 'Milliseconds', iso: 'ISO 8601',
    }),
  },
  es: {
    title: 'Conversor de timestamp Unix',
    desc: 'Convierte entre timestamps Unix y fechas, en tu hora local y en UTC',
    short: 'Timestamp ↔ fecha',
    intro: [
      { h: 'Segundos o milisegundos', p: 'Un timestamp Unix cuenta desde el 1 de enero de 1970 UTC. La mayoría de los sistemas cuentan segundos; JavaScript cuenta milisegundos. Diez dígitos son segundos, trece son milisegundos: la herramienta lo deduce del tamaño y muestra ambos.' },
      { h: 'Tu hora y UTC, una al lado de la otra', p: 'El timestamp no tiene zona horaria: es un instante único. Lo que cambia es cómo se escribe. Se muestran la hora local de tu navegador y UTC para que veas cuál quería decir realmente un log o una API.' },
    ],
    faq: [
      { q: '¿Por qué mi timestamp tiene diez dígitos?', a: 'Porque está en segundos. Multiplica por 1000 para pasarlo a milisegundos. Un número de trece dígitos ya está en milisegundos.' },
      { q: '¿Qué es el problema del 2038?', a: 'Un timestamp de 32 bits con signo desborda el 19 de enero de 2038. Los sistemas actuales usan 64 bits, que duran más que el Sol.' },
      { q: '¿Los timestamps tienen en cuenta los segundos intercalares?', a: 'No. El tiempo Unix hace como si todos los días tuvieran exactamente 86.400 segundos, y por eso nunca necesita saber de ellos.' },
    ],
    ui: withUi('es', {
      toDate: 'Timestamp → fecha', toStamp: 'Fecha → timestamp', now: 'Ahora',
      stampInput: 'Timestamp Unix (segundos o milisegundos)', dateInput: 'Fecha y hora',
      local: 'Tu hora local', utc: 'UTC', seconds: 'Segundos', millis: 'Milisegundos', iso: 'ISO 8601',
    }),
  },
  'pt-br': {
    title: 'Conversor de timestamp Unix',
    desc: 'Converta entre timestamps Unix e datas, no seu horário local e em UTC',
    short: 'Timestamp ↔ data',
    intro: [
      { h: 'Segundos ou milissegundos', p: 'Um timestamp Unix conta desde 1º de janeiro de 1970 UTC. A maioria dos sistemas conta segundos; o JavaScript conta milissegundos. Dez dígitos são segundos, treze são milissegundos — a ferramenta deduz pelo tamanho e mostra os dois.' },
      { h: 'Seu horário e UTC, lado a lado', p: 'O timestamp em si não tem fuso: é um instante único. O que muda é como você o escreve. Mostramos o horário local do seu navegador e o UTC para você ver qual deles um log ou uma API realmente quis dizer.' },
    ],
    faq: [
      { q: 'Por que meu timestamp tem dez dígitos?', a: 'Porque está em segundos. Multiplique por 1000 para milissegundos. Um número de treze dígitos já está em milissegundos.' },
      { q: 'O que é o problema de 2038?', a: 'Um timestamp de 32 bits com sinal estoura em 19 de janeiro de 2038. Sistemas atuais usam 64 bits, que duram mais que o Sol.' },
      { q: 'Timestamps consideram segundos bissextos?', a: 'Não. O tempo Unix finge que todo dia tem exatamente 86.400 segundos, por isso nunca precisa saber deles.' },
    ],
    ui: withUi('pt-br', {
      toDate: 'Timestamp → data', toStamp: 'Data → timestamp', now: 'Agora',
      stampInput: 'Timestamp Unix (segundos ou milissegundos)', dateInput: 'Data e hora',
      local: 'Seu horário local', utc: 'UTC', seconds: 'Segundos', millis: 'Milissegundos', iso: 'ISO 8601',
    }),
  },
  ja: {
    title: 'Unix タイムスタンプ変換',
    desc: 'Unix タイムスタンプと日時を、現地時刻と UTC で相互変換',
    short: 'タイムスタンプ ↔ 日時',
    intro: [
      { h: '秒かミリ秒か', p: 'Unix タイムスタンプは1970年1月1日 UTC からの経過を数えます。多くのシステムは秒、JavaScript はミリ秒です。10桁なら秒、13桁ならミリ秒 — この道具は桁数から推し量り、両方を表示します。' },
      { h: '現地時刻と UTC を並べて', p: 'タイムスタンプ自体に時間帯はありません。ひとつの瞬間です。違うのは書き表し方だけ。ブラウザの現地時刻と UTC を並べて出すので、ログや API がどちらのつもりだったかが見えます。' },
    ],
    faq: [
      { q: '手元のタイムスタンプが10桁なのはなぜですか。', a: '秒だからです。ミリ秒にするには1000を掛けます。13桁ならすでにミリ秒です。' },
      { q: '2038年問題とは何ですか。', a: '符号付き32ビットのタイムスタンプが2038年1月19日にあふれる問題です。いまのシステムは64ビットを使っており、そちらは太陽より長持ちします。' },
      { q: 'うるう秒は反映されますか。', a: 'されません。Unix 時間はどの日も86,400秒ちょうどだという建前で動いており、だからうるう秒を知らずに済みます。' },
    ],
    ui: withUi('ja', {
      toDate: 'タイムスタンプ → 日時', toStamp: '日時 → タイムスタンプ', now: '現在時刻',
      stampInput: 'Unix タイムスタンプ（秒またはミリ秒）', dateInput: '日付・時刻',
      local: '現地時刻', utc: 'UTC', seconds: '秒', millis: 'ミリ秒', iso: 'ISO 8601',
    }),
  },
  de: {
    title: 'Unix-Timestamp-Umrechner',
    desc: 'Zwischen Unix-Timestamps und Datum umrechnen, in Ortszeit und UTC',
    short: 'Timestamp ↔ Datum',
    intro: [
      { h: 'Sekunden oder Millisekunden', p: 'Ein Unix-Timestamp zählt ab dem 1. Januar 1970 UTC. Die meisten Systeme zählen Sekunden, JavaScript zählt Millisekunden. Zehn Stellen sind Sekunden, dreizehn sind Millisekunden — dieses Werkzeug schließt aus der Länge und zeigt beides.' },
      { h: 'Deine Zeit und UTC nebeneinander', p: 'Der Timestamp selbst hat keine Zeitzone, er ist ein einzelner Augenblick. Unterschiedlich ist nur die Schreibweise. Ortszeit des Browsers und UTC stehen nebeneinander, damit du siehst, was ein Log oder eine API tatsächlich gemeint hat.' },
    ],
    faq: [
      { q: 'Warum hat mein Timestamp zehn Stellen?', a: 'Weil er in Sekunden ist. Mal 1000 ergibt Millisekunden. Eine dreizehnstellige Zahl ist bereits in Millisekunden.' },
      { q: 'Was ist das Jahr-2038-Problem?', a: 'Ein vorzeichenbehafteter 32-Bit-Timestamp läuft am 19. Januar 2038 über. Heutige Systeme verwenden 64 Bit, das hält länger als die Sonne.' },
      { q: 'Berücksichtigen Timestamps Schaltsekunden?', a: 'Nein. Unix-Zeit tut so, als hätte jeder Tag genau 86.400 Sekunden — deshalb muss sie von Schaltsekunden gar nichts wissen.' },
    ],
    ui: withUi('de', {
      toDate: 'Timestamp → Datum', toStamp: 'Datum → Timestamp', now: 'Jetzt',
      stampInput: 'Unix-Timestamp (Sekunden oder Millisekunden)', dateInput: 'Datum und Uhrzeit',
      local: 'Deine Ortszeit', utc: 'UTC', seconds: 'Sekunden', millis: 'Millisekunden', iso: 'ISO 8601',
    }),
  },
  fr: {
    title: 'Convertisseur de timestamp Unix',
    desc: 'Convertir entre timestamps Unix et dates, en heure locale et en UTC',
    short: 'Timestamp ↔ date',
    intro: [
      { h: 'Secondes ou millisecondes', p: 'Un timestamp Unix compte depuis le 1er janvier 1970 UTC. La plupart des systèmes comptent en secondes ; JavaScript compte en millisecondes. Dix chiffres, ce sont des secondes ; treize, des millisecondes — l’outil devine d’après la longueur et affiche les deux.' },
      { h: 'Votre heure et UTC, côte à côte', p: 'Le timestamp n’a pas de fuseau : c’est un instant unique. Ce qui change, c’est la façon de l’écrire. L’heure locale de votre navigateur et l’UTC sont affichées ensemble pour voir laquelle un journal ou une API voulait dire.' },
    ],
    faq: [
      { q: 'Pourquoi mon timestamp fait-il dix chiffres ?', a: 'Parce qu’il est en secondes. Multipliez par 1000 pour des millisecondes. Un nombre à treize chiffres est déjà en millisecondes.' },
      { q: 'Qu’est-ce que le problème de 2038 ?', a: 'Un timestamp 32 bits signé déborde le 19 janvier 2038. Les systèmes actuels utilisent 64 bits, ce qui tiendra plus longtemps que le Soleil.' },
      { q: 'Les timestamps tiennent-ils compte des secondes intercalaires ?', a: 'Non. Le temps Unix fait comme si chaque jour comptait exactement 86 400 secondes : il n’a donc jamais à en entendre parler.' },
    ],
    ui: withUi('fr', {
      toDate: 'Timestamp → date', toStamp: 'Date → timestamp', now: 'Maintenant',
      stampInput: 'Timestamp Unix (secondes ou millisecondes)', dateInput: 'Date et heure',
      local: 'Votre heure locale', utc: 'UTC', seconds: 'Secondes', millis: 'Millisecondes', iso: 'ISO 8601',
    }),
  },
  hi: {
    title: 'Unix टाइमस्टैंप कन्वर्टर',
    desc: 'Unix टाइमस्टैंप और तारीख़ के बीच बदलें — अपने स्थानीय समय और UTC में',
    short: 'टाइमस्टैंप ↔ तारीख़',
    intro: [
      { h: 'सेकंड या मिलीसेकंड', p: 'Unix टाइमस्टैंप 1 जनवरी 1970 UTC से गिनता है। ज़्यादातर सिस्टम सेकंड गिनते हैं; JavaScript मिलीसेकंड। दस अंक यानी सेकंड, तेरह यानी मिलीसेकंड — यह टूल लंबाई से अंदाज़ा लगाकर दोनों दिखाता है।' },
      { h: 'आपका समय और UTC, साथ-साथ', p: 'टाइमस्टैंप का अपना कोई समय-क्षेत्र नहीं होता; वह एक ही क्षण है। बदलता सिर्फ़ लिखने का ढंग है। ब्राउज़र का स्थानीय समय और UTC दोनों दिखाए जाते हैं ताकि पता चले कि लॉग या API का मतलब कौन-सा था।' },
    ],
    faq: [
      { q: 'मेरा टाइमस्टैंप दस अंक का क्यों है?', a: 'क्योंकि वह सेकंड में है। मिलीसेकंड के लिए 1000 से गुणा कीजिए। तेरह अंक वाला पहले से मिलीसेकंड में है।' },
      { q: '2038 की समस्या क्या है?', a: 'साइन वाला 32-बिट टाइमस्टैंप 19 जनवरी 2038 को भर जाता है। आज के सिस्टम 64-बिट इस्तेमाल करते हैं, जो सूरज से भी ज़्यादा चलेगा।' },
      { q: 'क्या टाइमस्टैंप में लीप सेकंड गिने जाते हैं?', a: 'नहीं। Unix समय मानकर चलता है कि हर दिन ठीक 86,400 सेकंड का है — इसीलिए उसे लीप सेकंड जानने की ज़रूरत ही नहीं पड़ती।' },
    ],
    ui: withUi('hi', {
      toDate: 'टाइमस्टैंप → तारीख़', toStamp: 'तारीख़ → टाइमस्टैंप', now: 'अभी',
      stampInput: 'Unix टाइमस्टैंप (सेकंड या मिलीसेकंड)', dateInput: 'तारीख़ और समय',
      local: 'आपका स्थानीय समय', utc: 'UTC', seconds: 'सेकंड', millis: 'मिलीसेकंड', iso: 'ISO 8601',
    }),
  },
  'zh-hans': {
    title: 'Unix 时间戳转换',
    desc: '在本地时间和 UTC 之间转换 Unix 时间戳与日期',
    short: '时间戳 ↔ 日期',
    intro: [
      { h: '秒还是毫秒', p: 'Unix 时间戳从 1970 年 1 月 1 日 UTC 开始计数。多数系统按秒计，JavaScript 按毫秒计。十位是秒，十三位是毫秒——这个工具按位数判断，两个都给出来。' },
      { h: '本地时间和 UTC 并排', p: '时间戳本身没有时区，它就是一个瞬间。不同的只是写法。这里把浏览器的本地时间和 UTC 并排放着，好让你看出日志或接口到底指的是哪一个。' },
    ],
    faq: [
      { q: '我的时间戳为什么是十位？', a: '因为它是秒。乘以 1000 就是毫秒。十三位的已经是毫秒了。' },
      { q: '2038 年问题是什么？', a: '带符号的 32 位时间戳会在 2038 年 1 月 19 日溢出。现在的系统用 64 位，能撑得比太阳还久。' },
      { q: '时间戳算闰秒吗？', a: '不算。Unix 时间假定每天正好 86,400 秒，所以它根本不需要知道闰秒的存在。' },
    ],
    ui: withUi('zh-hans', {
      toDate: '时间戳 → 日期', toStamp: '日期 → 时间戳', now: '当前时间',
      stampInput: 'Unix 时间戳（秒或毫秒）', dateInput: '日期和时间',
      local: '本地时间', utc: 'UTC', seconds: '秒', millis: '毫秒', iso: 'ISO 8601',
    }),
  },
  'zh-hant': {
    title: 'Unix 時間戳轉換',
    desc: '在本地時間和 UTC 之間轉換 Unix 時間戳與日期',
    short: '時間戳 ↔ 日期',
    intro: [
      { h: '秒還是毫秒', p: 'Unix 時間戳從 1970 年 1 月 1 日 UTC 開始計數。多數系統按秒計，JavaScript 按毫秒計。十位是秒，十三位是毫秒——這個工具按位數判斷，兩個都給出來。' },
      { h: '本地時間和 UTC 並排', p: '時間戳本身沒有時區，它就是一個瞬間。不同的只是寫法。這裡把瀏覽器的本地時間和 UTC 並排放著，好讓你看出記錄檔或 API 到底指的是哪一個。' },
    ],
    faq: [
      { q: '我的時間戳為什麼是十位？', a: '因為它是秒。乘以 1000 就是毫秒。十三位的已經是毫秒了。' },
      { q: '2038 年問題是什麼？', a: '帶符號的 32 位元時間戳會在 2038 年 1 月 19 日溢位。現在的系統用 64 位元，能撐得比太陽還久。' },
      { q: '時間戳算閏秒嗎？', a: '不算。Unix 時間假定每天正好 86,400 秒，所以它根本不需要知道閏秒的存在。' },
    ],
    ui: withUi('zh-hant', {
      toDate: '時間戳 → 日期', toStamp: '日期 → 時間戳', now: '目前時間',
      stampInput: 'Unix 時間戳（秒或毫秒）', dateInput: '日期和時間',
      local: '本地時間', utc: 'UTC', seconds: '秒', millis: '毫秒', iso: 'ISO 8601',
    }),
  },
};

/** 글자수 세기. 바이트 수는 UTF-8 기준이라 언어마다 값이 다르게 나온다. */
export const DEV_WORD_COUNT: CalcTable = {
  en: {
    title: 'Word and character counter',
    desc: 'Count characters, words, sentences, paragraphs, lines and bytes as you type',
    short: 'Characters · words · sentences · bytes',
    intro: [
      { h: 'Counted as you type', p: 'Nothing is sent anywhere and there is no button to press. Paste or type and every figure updates immediately, which makes it usable for trimming something down to a limit.' },
      { h: 'Characters and bytes are different numbers', p: 'A byte count uses UTF-8, where a Latin letter takes one byte but an accented letter takes two and a CJK character three. If a field limit is stated in bytes rather than characters, that is the number to watch.' },
    ],
    faq: [
      { q: 'How are words counted?', a: 'By runs of non-whitespace, so hyphenated compounds count as one. For scripts written without spaces the character count is the more useful figure.' },
      { q: 'How are sentences detected?', a: 'By full stops, question marks and exclamation marks. Abbreviations with periods will inflate the count slightly — treat it as an estimate.' },
      { q: 'Why is the byte count higher than the character count?', a: 'Because UTF-8 uses more than one byte for anything outside basic Latin. Two bytes for most accented and Cyrillic letters, three for CJK, four for most emoji.' },
    ],
    ui: withUi('en', {
      text: 'Your text', live: 'Counts update as you type', detail: 'Breakdown',
      chars: 'Characters', charsNoSpace: 'Characters (no spaces)', words: 'Words',
      sentences: 'Sentences', paragraphs: 'Paragraphs', lines: 'Lines', bytes: 'Bytes (UTF-8)',
      byWhitespace: 'by whitespace', byPunct: 'by . ! ?', byBlank: 'by blank lines', byNewline: 'by line breaks',
    }),
  },
  es: {
    title: 'Contador de palabras y caracteres',
    desc: 'Cuenta caracteres, palabras, frases, párrafos, líneas y bytes mientras escribes',
    short: 'Caracteres · palabras · frases · bytes',
    intro: [
      { h: 'Se cuenta mientras escribes', p: 'No se envía nada a ninguna parte y no hay botón que pulsar. Pega o escribe y todas las cifras se actualizan al momento, lo que va bien para recortar un texto hasta un límite.' },
      { h: 'Caracteres y bytes son cifras distintas', p: 'El recuento de bytes usa UTF-8: una letra latina ocupa un byte, una acentuada dos y un carácter CJK tres. Si un límite viene dado en bytes y no en caracteres, esa es la cifra que importa.' },
    ],
    faq: [
      { q: '¿Cómo se cuentan las palabras?', a: 'Por bloques sin espacios, de modo que un compuesto con guion cuenta como uno. Para escrituras sin espacios, la cifra útil es el número de caracteres.' },
      { q: '¿Cómo se detectan las frases?', a: 'Por puntos, interrogaciones y exclamaciones. Las abreviaturas con punto inflan un poco la cuenta: tómalo como una estimación.' },
      { q: '¿Por qué hay más bytes que caracteres?', a: 'Porque UTF-8 usa más de un byte para todo lo que sale del latín básico: dos para acentuadas y cirílico, tres para CJK, cuatro para la mayoría de emoji.' },
    ],
    ui: withUi('es', {
      text: 'Tu texto', live: 'Las cifras se actualizan al escribir', detail: 'Desglose',
      chars: 'Caracteres', charsNoSpace: 'Caracteres (sin espacios)', words: 'Palabras',
      sentences: 'Frases', paragraphs: 'Párrafos', lines: 'Líneas', bytes: 'Bytes (UTF-8)',
      byWhitespace: 'por espacios', byPunct: 'por . ! ?', byBlank: 'por líneas en blanco', byNewline: 'por saltos de línea',
    }),
  },
  'pt-br': {
    title: 'Contador de palavras e caracteres',
    desc: 'Conte caracteres, palavras, frases, parágrafos, linhas e bytes enquanto digita',
    short: 'Caracteres · palavras · frases · bytes',
    intro: [
      { h: 'Conta enquanto você digita', p: 'Nada é enviado e não há botão para apertar. Cole ou digite e todos os números se atualizam na hora, o que ajuda quando você precisa encaixar um texto num limite.' },
      { h: 'Caracteres e bytes são números diferentes', p: 'A contagem de bytes usa UTF-8: uma letra latina ocupa um byte, uma acentuada dois e um caractere CJK três. Se um limite está em bytes e não em caracteres, é esse o número que importa.' },
    ],
    faq: [
      { q: 'Como as palavras são contadas?', a: 'Por blocos sem espaço, então um composto com hífen conta como um. Para escritas sem espaço, o número de caracteres é a medida útil.' },
      { q: 'Como as frases são detectadas?', a: 'Por ponto final, interrogação e exclamação. Abreviações com ponto inflam um pouco a conta — trate como estimativa.' },
      { q: 'Por que há mais bytes que caracteres?', a: 'Porque o UTF-8 usa mais de um byte para tudo que sai do latim básico: dois para acentuadas e cirílico, três para CJK, quatro para a maioria dos emoji.' },
    ],
    ui: withUi('pt-br', {
      text: 'Seu texto', live: 'Os números mudam enquanto você digita', detail: 'Detalhamento',
      chars: 'Caracteres', charsNoSpace: 'Caracteres (sem espaços)', words: 'Palavras',
      sentences: 'Frases', paragraphs: 'Parágrafos', lines: 'Linhas', bytes: 'Bytes (UTF-8)',
      byWhitespace: 'por espaços', byPunct: 'por . ! ?', byBlank: 'por linhas em branco', byNewline: 'por quebras de linha',
    }),
  },
  ja: {
    title: '文字数・単語数カウント',
    desc: '入力しながら文字・単語・文・段落・行・バイト数を数える',
    short: '文字・単語・文・バイト',
    intro: [
      { h: '打ちながら数えます', p: 'どこにも送りませんし、押すボタンもありません。貼るか打つかすれば数字がその場で変わるので、字数制限に収める作業に向いています。' },
      { h: '文字数とバイト数は別の数字です', p: 'バイト数は UTF-8 で数えます。ラテン文字は1バイト、アクセント付きは2バイト、日本語や中国語の文字は3バイトです。制限が文字数ではなくバイト数で書かれているときは、こちらを見てください。' },
    ],
    faq: [
      { q: '単語はどう数えていますか。', a: '空白で区切られたかたまりを1語としています。日本語のように空白で区切らない文章では、文字数のほうが役に立ちます。' },
      { q: '文の区切りはどう判定していますか。', a: '。! ? を区切りとしています。略語の点があると少し多めに出るので、目安として見てください。' },
      { q: 'バイト数が文字数より多いのはなぜですか。', a: 'UTF-8 が基本ラテン文字以外に2バイト以上を使うためです。多くのアクセント付き文字とキリル文字は2バイト、日本語・中国語は3バイト、絵文字の多くは4バイトです。' },
    ],
    ui: withUi('ja', {
      text: 'テキスト', live: '入力するとその場で数えます', detail: '詳しい内訳',
      chars: '文字数', charsNoSpace: '文字数（空白を除く）', words: '単語数',
      sentences: '文の数', paragraphs: '段落数', lines: '行数', bytes: 'バイト数（UTF-8）',
      byWhitespace: '空白区切り', byPunct: '。! ? 区切り', byBlank: '空行区切り', byNewline: '改行区切り',
    }),
  },
  de: {
    title: 'Wort- und Zeichenzähler',
    desc: 'Zeichen, Wörter, Sätze, Absätze, Zeilen und Bytes beim Tippen zählen',
    short: 'Zeichen · Wörter · Sätze · Bytes',
    intro: [
      { h: 'Zählt beim Tippen mit', p: 'Es wird nichts verschickt und es gibt keinen Knopf. Einfügen oder tippen — alle Zahlen aktualisieren sich sofort, was praktisch ist, wenn du einen Text auf ein Limit kürzen musst.' },
      { h: 'Zeichen und Bytes sind zwei Zahlen', p: 'Die Byte-Zählung nutzt UTF-8: ein lateinischer Buchstabe ein Byte, ein Umlaut zwei, ein CJK-Zeichen drei. Steht ein Limit in Bytes statt in Zeichen, ist das die Zahl, auf die es ankommt.' },
    ],
    faq: [
      { q: 'Wie werden Wörter gezählt?', a: 'Als zusammenhängende Blöcke ohne Leerzeichen; ein Bindestrichwort zählt also als eins. Bei Schriften ohne Wortabstand ist die Zeichenzahl aussagekräftiger.' },
      { q: 'Wie werden Sätze erkannt?', a: 'An Punkt, Frage- und Ausrufezeichen. Abkürzungen mit Punkt treiben die Zahl leicht hoch — sieh es als Schätzung.' },
      { q: 'Warum sind es mehr Bytes als Zeichen?', a: 'Weil UTF-8 für alles außerhalb des lateinischen Grundbestands mehr als ein Byte braucht: zwei für Umlaute und Kyrillisch, drei für CJK, vier für die meisten Emoji.' },
    ],
    ui: withUi('de', {
      text: 'Dein Text', live: 'Zahlen aktualisieren sich beim Tippen', detail: 'Aufschlüsselung',
      chars: 'Zeichen', charsNoSpace: 'Zeichen (ohne Leerzeichen)', words: 'Wörter',
      sentences: 'Sätze', paragraphs: 'Absätze', lines: 'Zeilen', bytes: 'Bytes (UTF-8)',
      byWhitespace: 'nach Leerzeichen', byPunct: 'nach . ! ?', byBlank: 'nach Leerzeilen', byNewline: 'nach Zeilenumbrüchen',
    }),
  },
  fr: {
    title: 'Compteur de mots et de caractères',
    desc: 'Compter caractères, mots, phrases, paragraphes, lignes et octets à la frappe',
    short: 'Caractères · mots · phrases · octets',
    intro: [
      { h: 'Compté au fil de la frappe', p: 'Rien n’est envoyé et il n’y a pas de bouton. Collez ou tapez : tous les chiffres se mettent à jour aussitôt, ce qui aide à ramener un texte sous une limite.' },
      { h: 'Caractères et octets sont deux nombres', p: 'Le comptage d’octets utilise UTF-8 : une lettre latine fait un octet, une lettre accentuée deux, un caractère CJK trois. Si une limite est donnée en octets et non en caractères, c’est ce nombre-là qu’il faut suivre.' },
    ],
    faq: [
      { q: 'Comment les mots sont-ils comptés ?', a: 'Par blocs sans espace : un mot composé avec trait d’union compte pour un. Pour les écritures sans espaces, le nombre de caractères est plus parlant.' },
      { q: 'Comment les phrases sont-elles repérées ?', a: 'Aux points, points d’interrogation et d’exclamation. Les abréviations pointées gonflent un peu le compte — à prendre comme une estimation.' },
      { q: 'Pourquoi y a-t-il plus d’octets que de caractères ?', a: 'Parce qu’UTF-8 utilise plus d’un octet pour tout ce qui sort du latin de base : deux pour les accents et le cyrillique, trois pour le CJK, quatre pour la plupart des emoji.' },
    ],
    ui: withUi('fr', {
      text: 'Votre texte', live: 'Les chiffres se mettent à jour à la frappe', detail: 'Détail',
      chars: 'Caractères', charsNoSpace: 'Caractères (sans espaces)', words: 'Mots',
      sentences: 'Phrases', paragraphs: 'Paragraphes', lines: 'Lignes', bytes: 'Octets (UTF-8)',
      byWhitespace: 'par espaces', byPunct: 'par . ! ?', byBlank: 'par lignes vides', byNewline: 'par sauts de ligne',
    }),
  },
  hi: {
    title: 'शब्द और अक्षर गिनती',
    desc: 'लिखते-लिखते अक्षर, शब्द, वाक्य, अनुच्छेद, पंक्तियाँ और बाइट गिनें',
    short: 'अक्षर · शब्द · वाक्य · बाइट',
    intro: [
      { h: 'लिखते ही गिनती चलती है', p: 'कुछ भी कहीं नहीं भेजा जाता और दबाने को कोई बटन नहीं। चिपकाइए या टाइप कीजिए — सारे आँकड़े तुरंत बदलते हैं, जो किसी सीमा तक टेक्स्ट छाँटने में काम आता है।' },
      { h: 'अक्षर और बाइट अलग-अलग संख्याएँ हैं', p: 'बाइट गिनती UTF-8 पर चलती है: लैटिन अक्षर एक बाइट, देवनागरी का अक्षर तीन बाइट तक। अगर कोई सीमा अक्षरों में नहीं बल्कि बाइट में दी गई हो, तो यही संख्या देखनी है।' },
    ],
    faq: [
      { q: 'शब्द कैसे गिने जाते हैं?', a: 'बिना ख़ाली जगह वाले टुकड़ों के हिसाब से, इसलिए हाइफ़न वाला जोड़ एक ही गिना जाता है। जिन लिपियों में शब्दों के बीच जगह नहीं होती, वहाँ अक्षर-गिनती ज़्यादा काम की है।' },
      { q: 'वाक्य कैसे पहचाने जाते हैं?', a: 'पूर्ण विराम, प्रश्नवाचक और विस्मयादिबोधक चिह्न से। बिंदु वाले संक्षेप गिनती थोड़ी बढ़ा देते हैं — इसे अनुमान मानिए।' },
      { q: 'बाइट अक्षरों से ज़्यादा क्यों हैं?', a: 'क्योंकि UTF-8 बुनियादी लैटिन के बाहर हर चीज़ के लिए एक से ज़्यादा बाइट लेता है: उच्चारण-चिह्न और सिरिलिक के लिए दो, देवनागरी और CJK के लिए तीन, अधिकतर इमोजी के लिए चार।' },
    ],
    ui: withUi('hi', {
      text: 'आपका टेक्स्ट', live: 'लिखते ही आँकड़े बदलते हैं', detail: 'विस्तृत ब्योरा',
      chars: 'अक्षर', charsNoSpace: 'अक्षर (ख़ाली जगह छोड़कर)', words: 'शब्द',
      sentences: 'वाक्य', paragraphs: 'अनुच्छेद', lines: 'पंक्तियाँ', bytes: 'बाइट (UTF-8)',
      byWhitespace: 'ख़ाली जगह से', byPunct: '. ! ? से', byBlank: 'ख़ाली पंक्ति से', byNewline: 'नई पंक्ति से',
    }),
  },
  'zh-hans': {
    title: '字数统计',
    desc: '一边输入一边统计字符、词、句子、段落、行数和字节数',
    short: '字符 · 词 · 句 · 字节',
    intro: [
      { h: '边打边数', p: '什么都不上传，也没有要按的按钮。粘贴或输入，所有数字立刻更新——需要把文字压到某个上限时特别顺手。' },
      { h: '字符数和字节数是两个数', p: '字节数按 UTF-8 算：拉丁字母一个字节，带音标的两个，汉字三个。如果某个字段的上限写的是字节而不是字符，那就要看这个数。' },
    ],
    faq: [
      { q: '词是怎么数的？', a: '按不含空格的连续片段来数，所以带连字符的组合算一个。对不用空格分词的文字，字符数更有参考价值。' },
      { q: '句子怎么识别？', a: '按句号、问号、叹号切分。带点的缩写会让数字略微偏大——当作估算看。' },
      { q: '为什么字节数比字符数多？', a: '因为 UTF-8 对基本拉丁以外的字符都用一个以上的字节：带音标字母和西里尔字母两个，汉字三个，多数表情符号四个。' },
    ],
    ui: withUi('zh-hans', {
      text: '你的文本', live: '输入时实时统计', detail: '详细统计',
      chars: '字符数', charsNoSpace: '字符数（不含空格）', words: '词数',
      sentences: '句子数', paragraphs: '段落数', lines: '行数', bytes: '字节数（UTF-8）',
      byWhitespace: '按空格', byPunct: '按 。! ?', byBlank: '按空行', byNewline: '按换行',
    }),
  },
  'zh-hant': {
    title: '字數統計',
    desc: '一邊輸入一邊統計字元、詞、句子、段落、行數和位元組數',
    short: '字元 · 詞 · 句 · 位元組',
    intro: [
      { h: '邊打邊數', p: '什麼都不上傳，也沒有要按的按鈕。貼上或輸入，所有數字立刻更新——需要把文字壓到某個上限時特別順手。' },
      { h: '字元數和位元組數是兩個數', p: '位元組數按 UTF-8 算：拉丁字母一個位元組，帶音標的兩個，漢字三個。如果某個欄位的上限寫的是位元組而不是字元，那就要看這個數。' },
    ],
    faq: [
      { q: '詞是怎麼數的？', a: '按不含空格的連續片段來數，所以帶連字號的組合算一個。對不用空格分詞的文字，字元數更有參考價值。' },
      { q: '句子怎麼辨識？', a: '按句號、問號、驚嘆號切分。帶點的縮寫會讓數字略微偏大——當作估算看。' },
      { q: '為什麼位元組數比字元數多？', a: '因為 UTF-8 對基本拉丁以外的字元都用一個以上的位元組：帶音標字母和西里爾字母兩個，漢字三個，多數表情符號四個。' },
    ],
    ui: withUi('zh-hant', {
      text: '你的文字', live: '輸入時即時統計', detail: '詳細統計',
      chars: '字元數', charsNoSpace: '字元數（不含空格）', words: '詞數',
      sentences: '句子數', paragraphs: '段落數', lines: '行數', bytes: '位元組數（UTF-8）',
      byWhitespace: '按空格', byPunct: '按 。! ?', byBlank: '按空行', byNewline: '按換行',
    }),
  },
};
