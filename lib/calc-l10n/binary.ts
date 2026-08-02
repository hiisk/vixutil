import type { CalcTable } from './types.ts';

/**
 * 진수 변환기 — 2·8·10·16진수.
 *
 * 진법 이름은 언어마다 다르지만 자릿수 자체는 어디서나 같다. 힌트("0과 1만
 * 입력")는 진법마다 다른 문구가 붙으므로 hint2·hint8·hint10·hint16으로 나눴다.
 */
export const BINARY: CalcTable = {
  en: {
    title: 'Number base converter',
    desc: 'Convert between binary, octal, decimal and hexadecimal',
    short: 'Binary · octal · decimal · hex',
    intro: [
      {
        h: 'Why 8 and 16 and not 100',
        p: 'Octal and hexadecimal exist because they line up neatly with binary: one octal digit is exactly three bits, one hex digit exactly four. That is why a byte is two hex digits and why hex is the everyday way to write memory addresses and colours.',
      },
      {
        h: 'Reading binary in groups of four',
        p: 'The binary result is shown in groups of four bits. Each group maps to one hex digit, so 1010 1111 reads straight off as AF. Once you see the pairing, converting by eye stops being work.',
      },
    ],
    faq: [
      { q: 'Why do colours use hex?', a: 'A colour is three bytes — red, green, blue. Each byte is exactly two hex digits, so #1A2B3C packs all three into six characters with no ambiguity about where one ends.' },
      { q: 'Are hex letters case sensitive?', a: 'No. A–F and a–f mean the same digits. Enter either; the result is shown in uppercase.' },
      { q: 'Can I convert negative numbers?', a: 'Negative values are accepted in decimal. Binary, octal and hex here represent magnitudes, so enter the digits without a sign.' },
    ],
    ui: {
      input: 'Input', base: 'Base', convert: 'Convert', result: 'Result', entered: '(entered)',
      table: 'Quick reference (0–15)', empty: 'Enter a value.', invalid: 'That is not a valid value for this base.',
      b2: 'Binary (base 2)', b8: 'Octal (base 8)', b10: 'Decimal (base 10)', b16: 'Hexadecimal (base 16)',
      hint2: '(0 and 1 only)', hint8: '(digits 0–7)', hint10: '(digits, minus sign allowed)', hint16: '(0–9 and A–F, no 0x prefix)',
    },
  },
  es: {
    title: 'Conversor de bases numéricas',
    desc: 'Convierte entre binario, octal, decimal y hexadecimal',
    short: 'Binario · octal · decimal · hex',
    intro: [
      {
        h: 'Por qué 8 y 16, y no 100',
        p: 'El octal y el hexadecimal existen porque encajan con el binario: un dígito octal son exactamente tres bits y un dígito hexadecimal, cuatro. Por eso un byte son dos dígitos hex, y por eso el hex es la forma habitual de escribir direcciones de memoria y colores.',
      },
      {
        h: 'Leer binario de cuatro en cuatro',
        p: 'El resultado binario se muestra en grupos de cuatro bits. Cada grupo corresponde a un dígito hexadecimal, así que 1010 1111 se lee directamente como AF. En cuanto ves la correspondencia, convertir a ojo deja de costar.',
      },
    ],
    faq: [
      { q: '¿Por qué los colores se escriben en hexadecimal?', a: 'Un color son tres bytes: rojo, verde y azul. Cada byte son exactamente dos dígitos hex, así que #1A2B3C mete los tres en seis caracteres sin ambigüedad sobre dónde acaba cada uno.' },
      { q: '¿Distingue mayúsculas en hexadecimal?', a: 'No. A–F y a–f son los mismos dígitos. Escribe como prefieras; el resultado se muestra en mayúsculas.' },
      { q: '¿Puedo convertir números negativos?', a: 'Se aceptan valores negativos en decimal. En binario, octal y hexadecimal aquí se representan magnitudes, así que introduce los dígitos sin signo.' },
    ],
    ui: {
      input: 'Entrada', base: 'Base', convert: 'Convertir', result: 'Resultado', entered: '(introducido)',
      table: 'Tabla rápida (0–15)', empty: 'Introduce un valor.', invalid: 'Ese valor no es válido en esta base.',
      b2: 'Binario (base 2)', b8: 'Octal (base 8)', b10: 'Decimal (base 10)', b16: 'Hexadecimal (base 16)',
      hint2: '(solo 0 y 1)', hint8: '(dígitos 0–7)', hint10: '(dígitos, se permite el signo menos)', hint16: '(0–9 y A–F, sin prefijo 0x)',
    },
  },
  'pt-br': {
    title: 'Conversor de bases numéricas',
    desc: 'Converta entre binário, octal, decimal e hexadecimal',
    short: 'Binário · octal · decimal · hex',
    intro: [
      {
        h: 'Por que 8 e 16, e não 100',
        p: 'Octal e hexadecimal existem porque casam certinho com o binário: um dígito octal são exatamente três bits e um dígito hex, quatro. É por isso que um byte são dois dígitos hex, e por isso o hex é o jeito comum de escrever endereços de memória e cores.',
      },
      {
        h: 'Ler binário de quatro em quatro',
        p: 'O resultado binário aparece em grupos de quatro bits. Cada grupo corresponde a um dígito hexadecimal, então 1010 1111 se lê direto como AF. Depois que você enxerga esse par, converter de cabeça deixa de dar trabalho.',
      },
    ],
    faq: [
      { q: 'Por que cores usam hexadecimal?', a: 'Uma cor são três bytes: vermelho, verde e azul. Cada byte são exatamente dois dígitos hex, então #1A2B3C junta os três em seis caracteres sem dúvida sobre onde cada um termina.' },
      { q: 'O hexadecimal diferencia maiúsculas?', a: 'Não. A–F e a–f são os mesmos dígitos. Digite como quiser; o resultado sai em maiúsculas.' },
      { q: 'Dá para converter números negativos?', a: 'Valores negativos são aceitos em decimal. Em binário, octal e hexadecimal aqui se representam magnitudes, então digite os dígitos sem sinal.' },
    ],
    ui: {
      input: 'Entrada', base: 'Base', convert: 'Converter', result: 'Resultado', entered: '(digitado)',
      table: 'Tabela rápida (0–15)', empty: 'Digite um valor.', invalid: 'Esse valor não é válido nesta base.',
      b2: 'Binário (base 2)', b8: 'Octal (base 8)', b10: 'Decimal (base 10)', b16: 'Hexadecimal (base 16)',
      hint2: '(só 0 e 1)', hint8: '(dígitos 0–7)', hint10: '(dígitos, sinal de menos permitido)', hint16: '(0–9 e A–F, sem prefixo 0x)',
    },
  },
  ja: {
    title: '基数変換',
    desc: '2進数・8進数・10進数・16進数を相互に変換',
    short: '2進・8進・10進・16進',
    intro: [
      {
        h: 'なぜ8と16なのか',
        p: '8進数と16進数があるのは、2進数ときれいに揃うからです。8進1桁がちょうど3ビット、16進1桁がちょうど4ビット。だから1バイトは16進2桁で書けますし、メモリアドレスや色を16進で書くのが普通になっています。',
      },
      {
        h: '4桁ずつ区切って読む',
        p: '2進数の結果は4ビットずつ区切って表示します。1区切りが16進1桁に対応するので、1010 1111 はそのまま AF と読めます。この対応が見えると、目で変換するのが苦でなくなります。',
      },
    ],
    faq: [
      { q: '色に16進数を使うのはなぜですか。', a: '色は赤・緑・青の3バイトです。1バイトはちょうど16進2桁なので、#1A2B3C と6文字で三つを詰められ、どこで区切れるかも迷いません。' },
      { q: '16進の大文字と小文字は区別しますか。', a: 'しません。A〜F と a〜f は同じ桁です。どちらで入れても構いません。結果は大文字で表示します。' },
      { q: '負の数も変換できますか。', a: '10進では負の値を受け付けます。ここでの2進・8進・16進は大きさを表すので、符号を付けずに桁だけ入れてください。' },
    ],
    ui: {
      input: '入力', base: '基数', convert: '変換する', result: '変換結果', entered: '（入力）',
      table: '早見表（0〜15）', empty: '値を入力してください。', invalid: 'この基数では使えない値です。',
      b2: '2進数', b8: '8進数', b10: '10進数', b16: '16進数',
      hint2: '（0と1のみ）', hint8: '（0〜7）', hint10: '（数字、マイナス可）', hint16: '（0〜9とA〜F、0xは不要）',
    },
  },
  de: {
    title: 'Zahlensystem-Umrechner',
    desc: 'Zwischen Binär, Oktal, Dezimal und Hexadezimal umrechnen',
    short: 'Binär · Oktal · Dezimal · Hex',
    intro: [
      {
        h: 'Warum 8 und 16 und nicht 100',
        p: 'Oktal und Hexadezimal gibt es, weil sie sauber zum Binärsystem passen: eine Oktalziffer sind genau drei Bits, eine Hexziffer genau vier. Deshalb ist ein Byte zwei Hexziffern lang, und deshalb schreibt man Speicheradressen und Farben hexadezimal.',
      },
      {
        h: 'Binär in Vierergruppen lesen',
        p: 'Das Binärergebnis wird in Vierergruppen angezeigt. Jede Gruppe entspricht einer Hexziffer, 1010 1111 liest sich also direkt als AF. Wenn man diese Zuordnung einmal sieht, ist Umrechnen im Kopf keine Arbeit mehr.',
      },
    ],
    faq: [
      { q: 'Warum werden Farben hexadezimal geschrieben?', a: 'Eine Farbe sind drei Bytes — Rot, Grün, Blau. Jedes Byte sind genau zwei Hexziffern, so passen alle drei als #1A2B3C in sechs Zeichen, ohne dass unklar wäre, wo eines endet.' },
      { q: 'Ist Hex groß-/kleinschreibungsempfindlich?', a: 'Nein. A–F und a–f sind dieselben Ziffern. Gib ein, was du willst; das Ergebnis erscheint in Großbuchstaben.' },
      { q: 'Kann ich negative Zahlen umrechnen?', a: 'Im Dezimalsystem werden negative Werte angenommen. Binär, Oktal und Hex stehen hier für Beträge — bitte die Ziffern ohne Vorzeichen eingeben.' },
    ],
    ui: {
      input: 'Eingabe', base: 'Basis', convert: 'Umrechnen', result: 'Ergebnis', entered: '(eingegeben)',
      table: 'Kurzübersicht (0–15)', empty: 'Bitte einen Wert eingeben.', invalid: 'Dieser Wert ist in dieser Basis nicht gültig.',
      b2: 'Binär (Basis 2)', b8: 'Oktal (Basis 8)', b10: 'Dezimal (Basis 10)', b16: 'Hexadezimal (Basis 16)',
      hint2: '(nur 0 und 1)', hint8: '(Ziffern 0–7)', hint10: '(Ziffern, Minus erlaubt)', hint16: '(0–9 und A–F, ohne 0x)',
    },
  },
  fr: {
    title: 'Convertisseur de bases',
    desc: 'Convertir entre binaire, octal, décimal et hexadécimal',
    short: 'Binaire · octal · décimal · hex',
    intro: [
      {
        h: 'Pourquoi 8 et 16, et pas 100',
        p: 'L’octal et l’hexadécimal existent parce qu’ils s’alignent proprement sur le binaire : un chiffre octal vaut exactement trois bits, un chiffre hexadécimal quatre. D’où le fait qu’un octet s’écrive avec deux chiffres hex, et que l’hexadécimal serve à écrire adresses mémoire et couleurs.',
      },
      {
        h: 'Lire le binaire par groupes de quatre',
        p: 'Le résultat binaire est affiché par groupes de quatre bits. Chaque groupe correspond à un chiffre hexadécimal : 1010 1111 se lit donc directement AF. Une fois cette correspondance vue, convertir de tête ne demande plus d’effort.',
      },
    ],
    faq: [
      { q: 'Pourquoi les couleurs sont-elles en hexadécimal ?', a: 'Une couleur, ce sont trois octets — rouge, vert, bleu. Chaque octet fait exactement deux chiffres hex, donc #1A2B3C tient les trois en six caractères sans ambiguïté sur les séparations.' },
      { q: 'L’hexadécimal distingue-t-il la casse ?', a: 'Non. A–F et a–f désignent les mêmes chiffres. Saisissez comme vous voulez ; le résultat s’affiche en majuscules.' },
      { q: 'Puis-je convertir des nombres négatifs ?', a: 'Les valeurs négatives sont acceptées en décimal. Ici, binaire, octal et hexadécimal représentent des grandeurs : saisissez les chiffres sans signe.' },
    ],
    ui: {
      input: 'Entrée', base: 'Base', convert: 'Convertir', result: 'Résultat', entered: '(saisi)',
      table: 'Table rapide (0–15)', empty: 'Saisissez une valeur.', invalid: 'Cette valeur n’est pas valide dans cette base.',
      b2: 'Binaire (base 2)', b8: 'Octal (base 8)', b10: 'Décimal (base 10)', b16: 'Hexadécimal (base 16)',
      hint2: '(0 et 1 uniquement)', hint8: '(chiffres 0–7)', hint10: '(chiffres, signe moins accepté)', hint16: '(0–9 et A–F, sans 0x)',
    },
  },
  hi: {
    title: 'संख्या पद्धति कन्वर्टर',
    desc: 'बाइनरी, ऑक्टल, दशमलव और हेक्साडेसिमल के बीच बदलें',
    short: 'बाइनरी · ऑक्टल · दशमलव · हेक्स',
    intro: [
      {
        h: '8 और 16 ही क्यों, 100 क्यों नहीं',
        p: 'ऑक्टल और हेक्साडेसिमल इसलिए हैं कि वे बाइनरी के साथ ठीक बैठते हैं: एक ऑक्टल अंक बिल्कुल तीन बिट का है और एक हेक्स अंक चार बिट का। इसीलिए एक बाइट दो हेक्स अंकों में लिखा जाता है, और इसीलिए मेमोरी पते और रंग हेक्स में लिखे जाते हैं।',
      },
      {
        h: 'बाइनरी को चार-चार में पढ़ना',
        p: 'बाइनरी परिणाम चार बिट के समूहों में दिखाया जाता है। हर समूह एक हेक्स अंक के बराबर है, इसलिए 1010 1111 सीधे AF पढ़ा जाता है। यह जोड़ी एक बार दिख जाए तो आँखों से बदलना मेहनत नहीं रह जाता।',
      },
    ],
    faq: [
      { q: 'रंगों में हेक्स क्यों इस्तेमाल होता है?', a: 'एक रंग तीन बाइट का होता है — लाल, हरा, नीला। हर बाइट ठीक दो हेक्स अंक का है, इसलिए #1A2B3C तीनों को छह अक्षरों में समेट लेता है और कहाँ कौन सा ख़त्म हुआ, इसमें कोई संदेह नहीं रहता।' },
      { q: 'क्या हेक्स में छोटे-बड़े अक्षर मायने रखते हैं?', a: 'नहीं। A–F और a–f एक ही अंक हैं। जैसे चाहें डालें; परिणाम बड़े अक्षरों में दिखेगा।' },
      { q: 'क्या ऋणात्मक संख्याएँ बदल सकते हैं?', a: 'दशमलव में ऋणात्मक मान चलते हैं। यहाँ बाइनरी, ऑक्टल और हेक्स परिमाण दिखाते हैं, इसलिए चिह्न के बिना केवल अंक डालें।' },
    ],
    ui: {
      input: 'इनपुट', base: 'आधार', convert: 'बदलें', result: 'परिणाम', entered: '(डाला हुआ)',
      table: 'त्वरित तालिका (0–15)', empty: 'कोई मान डालें।', invalid: 'इस आधार में यह मान मान्य नहीं है।',
      b2: 'बाइनरी (आधार 2)', b8: 'ऑक्टल (आधार 8)', b10: 'दशमलव (आधार 10)', b16: 'हेक्साडेसिमल (आधार 16)',
      hint2: '(केवल 0 और 1)', hint8: '(अंक 0–7)', hint10: '(अंक, ऋण चिह्न चलेगा)', hint16: '(0–9 और A–F, 0x नहीं)',
    },
  },
  'zh-hans': {
    title: '进制转换',
    desc: '二进制、八进制、十进制、十六进制互相转换',
    short: '二进制 · 八进制 · 十进制 · 十六进制',
    intro: [
      {
        h: '为什么是 8 和 16，不是 100',
        p: '八进制和十六进制之所以存在，是因为它们和二进制对得整整齐齐：一个八进制位正好三个比特，一个十六进制位正好四个。所以一个字节写成两位十六进制，内存地址和颜色也就习惯用十六进制来写。',
      },
      {
        h: '二进制四位一组地读',
        p: '二进制结果按四个比特一组显示。每一组对应一位十六进制，所以 1010 1111 直接读作 AF。看出这个对应之后，用眼睛换算就不费劲了。',
      },
    ],
    faq: [
      { q: '颜色为什么用十六进制？', a: '一个颜色是三个字节——红、绿、蓝。每个字节正好两位十六进制，所以 #1A2B3C 用六个字符装下三个通道，也不会分不清哪一段到哪里结束。' },
      { q: '十六进制区分大小写吗？', a: '不区分。A–F 和 a–f 是同样的数字。随便输入哪种，结果统一用大写显示。' },
      { q: '可以转换负数吗？', a: '十进制接受负值。这里的二进制、八进制、十六进制表示的是大小，请不带符号只输入数字。' },
    ],
    ui: {
      input: '输入', base: '进制', convert: '转换', result: '转换结果', entered: '（输入）',
      table: '速查表（0–15）', empty: '请输入一个值。', invalid: '这个值在该进制下无效。',
      b2: '二进制', b8: '八进制', b10: '十进制', b16: '十六进制',
      hint2: '（只能是 0 和 1）', hint8: '（0–7）', hint10: '（数字，可带负号）', hint16: '（0–9 和 A–F，不要 0x）',
    },
  },
  'zh-hant': {
    title: '進位制轉換',
    desc: '二進位、八進位、十進位、十六進位互相轉換',
    short: '二進位 · 八進位 · 十進位 · 十六進位',
    intro: [
      {
        h: '為什麼是 8 和 16，不是 100',
        p: '八進位和十六進位之所以存在，是因為它們和二進位對得整整齊齊：一個八進位數字正好三個位元，一個十六進位數字正好四個。所以一個位元組寫成兩位十六進位，記憶體位址和顏色也就習慣用十六進位來寫。',
      },
      {
        h: '二進位四位一組地讀',
        p: '二進位結果按四個位元一組顯示。每一組對應一位十六進位，所以 1010 1111 直接讀作 AF。看出這個對應之後，用眼睛換算就不費勁了。',
      },
    ],
    faq: [
      { q: '顏色為什麼用十六進位？', a: '一個顏色是三個位元組——紅、綠、藍。每個位元組正好兩位十六進位，所以 #1A2B3C 用六個字元裝下三個通道，也不會分不清哪一段到哪裡結束。' },
      { q: '十六進位區分大小寫嗎？', a: '不區分。A–F 和 a–f 是同樣的數字。隨便輸入哪種，結果統一用大寫顯示。' },
      { q: '可以轉換負數嗎？', a: '十進位接受負值。這裡的二進位、八進位、十六進位表示的是大小，請不帶符號只輸入數字。' },
    ],
    ui: {
      input: '輸入', base: '進位制', convert: '轉換', result: '轉換結果', entered: '（輸入）',
      table: '速查表（0–15）', empty: '請輸入一個值。', invalid: '這個值在該進位制下無效。',
      b2: '二進位', b8: '八進位', b10: '十進位', b16: '十六進位',
      hint2: '（只能是 0 和 1）', hint8: '（0–7）', hint10: '（數字，可帶負號）', hint16: '（0–9 和 A–F，不要 0x）',
    },
  },
};
