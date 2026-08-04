/**
 * 부호 화면의 문구 — 열 언어.
 *
 * 모스도 NATO도 점자도 옮기지 않는다. 어느 나라에서도 A는 ·−이고 Alfa이며
 * 점 1이다 — 옮기면 오히려 그 나라 사람이 아는 값과 달라진다. 옮기는 것은
 * "그게 무엇이고 어떻게 읽는가"뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { CellFacts, CharFacts } from './facts.ts';
import type { CodeKind } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface CodeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<CodeKind, string>;
  kindNote: Record<CodeKind, string>;
  morseLabel: string;
  natoLabel: string;
  brailleLabel: string;
  dotsLabel: string;
  unicodeLabel: string;
  asciiLabel: string;
  unitsLabel: string;
  msLabel: string;
  raisedLabel: string;
  usedByLabel: string;
  noneLabel: string;
  morseTitle: string;
  morseNote: string;
  natoNote: string;
  brailleNote: string;
  cellsTitle: string;
  cellsNote: string;
  raisedGroup: (n: number) => string;
  neighbourTitle: string;
  charDesc: (f: CharFacts) => string;
  cellDesc: (f: CellFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  charMetaTitle: (f: CharFacts) => string;
  charMetaDesc: (f: CharFacts) => string;
  cellMetaTitle: (f: CellFacts) => string;
  cellMetaDesc: (f: CellFacts) => string;
  hubFaq: FaqItem[];
  charFaq: (f: CharFacts) => FaqItem[];
  cellFaq: (f: CellFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof CodeUI]: L<CodeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('부호', 'Codes', 'Códigos', 'Códigos', '符号', 'Codes', 'Codes', 'संकेत', '编码', '編碼'),

  hubTitle: T(
    '모스·NATO·점자 116가지',
    'Morse, NATO and braille — 116 signs',
    'Morse, NATO y braille — 116 signos',
    'Morse, NATO e braille — 116 sinais',
    'モールス・NATO・点字 116種',
    'Morse, NATO und Braille — 116 Zeichen',
    'Morse, NATO et braille — 116 signes',
    'मोर्स, NATO और ब्रेल — 116 संकेत',
    '摩尔斯、NATO、盲文 116 种',
    '摩斯、NATO、點字 116 種',
  ),

  hubLead: T(
    '글자 쉰둘을 세 가지 부호로 적고, 점자 셀 예순넷을 따로 폈습니다. 부호 자체는 만국 공통이라 옮기지 않았습니다.',
    'Fifty-two characters written in three codes, plus all sixty-four braille cells laid out. The codes themselves are the same everywhere, so they are left untranslated.',
    'Cincuenta y dos caracteres escritos en tres códigos, más las sesenta y cuatro celdas braille. Los códigos son iguales en todas partes, así que no se traducen.',
    'Cinquenta e dois caracteres escritos em três códigos, mais as sessenta e quatro celas braille. Os códigos são iguais em toda parte, então não são traduzidos.',
    '文字52種を三つの符号で書き、点字のセル64種を並べました。符号そのものは万国共通なので訳していません。',
    'Zweiundfünfzig Zeichen in drei Codes, dazu alle vierundsechzig Braille-Zellen. Die Codes selbst sind überall gleich und bleiben unübersetzt.',
    'Cinquante-deux caractères écrits en trois codes, plus les soixante-quatre cellules braille. Les codes eux-mêmes sont universels : ils ne sont pas traduits.',
    'बावन वर्ण तीन संकेत-प्रणालियों में, और ब्रेल की चौंसठ कोशिकाएँ अलग से। संकेत स्वयं सर्वत्र एक जैसे हैं, इसलिए अनुवाद नहीं किए गए।',
    '五十二个字符用三种编码写出，另外铺开六十四个盲文方。编码本身各国通用，所以不翻译。',
    '五十二個字元用三種編碼寫出，另外鋪開六十四個點字方。編碼本身各國通用，所以不翻譯。',
  ),

  kindLabel: T(
    { letter: '글자', digit: '숫자', punct: '기호' },
    { letter: 'Letters', digit: 'Digits', punct: 'Punctuation' },
    { letter: 'Letras', digit: 'Dígitos', punct: 'Signos' },
    { letter: 'Letras', digit: 'Dígitos', punct: 'Sinais' },
    { letter: '文字', digit: '数字', punct: '記号' },
    { letter: 'Buchstaben', digit: 'Ziffern', punct: 'Satzzeichen' },
    { letter: 'Lettres', digit: 'Chiffres', punct: 'Ponctuation' },
    { letter: 'अक्षर', digit: 'अंक', punct: 'चिह्न' },
    { letter: '字母', digit: '数字', punct: '标点' },
    { letter: '字母', digit: '數字', punct: '標點' },
  ),

  kindNote: T(
    {
      letter: '스물여섯 글자에는 모스와 NATO 낱말과 점자가 모두 있습니다.',
      digit: '모스에서는 다섯 자리이고, 점자에서는 a~j와 같은 셀에 숫자표를 앞세웁니다.',
      punct: '모스에는 있지만 NATO 낱말은 없습니다.',
    },
    {
      letter: 'All twenty-six have a Morse code, a NATO word and a braille cell.',
      digit: 'Five symbols each in Morse; in braille they reuse the cells of a–j behind a number sign.',
      punct: 'They have Morse codes but no NATO words.',
    },
    {
      letter: 'Las veintiséis tienen código Morse, palabra NATO y celda braille.',
      digit: 'Cinco símbolos cada uno en Morse; en braille reutilizan las celdas de la a a la j tras un signo de número.',
      punct: 'Tienen código Morse pero no palabra NATO.',
    },
    {
      letter: 'Todas as vinte e seis têm código Morse, palavra NATO e cela braille.',
      digit: 'Cinco símbolos cada um em Morse; em braille reaproveitam as celas de a a j após um sinal de número.',
      punct: 'Têm código Morse, mas não palavra NATO.',
    },
    {
      letter: '26文字にはモールスもNATOの語も点字もそろっています。',
      digit: 'モールスでは5桁で、点字ではa〜jと同じセルに数符を前置きします。',
      punct: 'モールスにはありますが、NATOの語はありません。',
    },
    {
      letter: 'Alle sechsundzwanzig haben Morsecode, NATO-Wort und Braille-Zelle.',
      digit: 'In Morse je fünf Zeichen; in Braille nutzen sie die Zellen von a–j hinter einem Zahlzeichen.',
      punct: 'Sie haben Morsecodes, aber keine NATO-Wörter.',
    },
    {
      letter: 'Les vingt-six ont un code Morse, un mot NATO et une cellule braille.',
      digit: 'Cinq symboles chacun en Morse ; en braille, ils reprennent les cellules de a à j après un signe numérique.',
      punct: 'Ils ont un code Morse mais pas de mot NATO.',
    },
    {
      letter: 'सभी छब्बीस के पास मोर्स कोड, NATO शब्द और ब्रेल कोशिका है।',
      digit: 'मोर्स में पाँच चिह्न; ब्रेल में ये a–j की कोशिकाएँ ही हैं, आगे अंक-चिह्न लगाकर।',
      punct: 'इनके मोर्स कोड हैं, पर NATO शब्द नहीं।',
    },
    {
      letter: '二十六个字母都有摩尔斯码、NATO 单词和盲文方。',
      digit: '摩尔斯里各占五位；盲文里沿用 a–j 的方，前面加数符。',
      punct: '有摩尔斯码，但没有 NATO 单词。',
    },
    {
      letter: '二十六個字母都有摩斯碼、NATO 單字和點字方。',
      digit: '摩斯裡各佔五位；點字裡沿用 a–j 的方，前面加數符。',
      punct: '有摩斯碼，但沒有 NATO 單字。',
    },
  ),

  morseLabel: T('모스 부호', 'Morse code', 'Código Morse', 'Código Morse', 'モールス符号', 'Morsecode', 'Code Morse', 'मोर्स कोड', '摩尔斯码', '摩斯碼'),
  natoLabel: T('NATO 음성 문자', 'NATO word', 'Palabra NATO', 'Palavra NATO', 'NATOフォネティックコード', 'NATO-Wort', 'Mot NATO', 'NATO शब्द', 'NATO 单词', 'NATO 單字'),
  brailleLabel: T('점자', 'Braille', 'Braille', 'Braille', '点字', 'Braille', 'Braille', 'ब्रेल', '盲文', '點字'),
  dotsLabel: T('점 번호', 'Dot numbers', 'Números de punto', 'Números de ponto', '点の番号', 'Punktnummern', 'Numéros de points', 'बिंदु संख्याएँ', '点号', '點號'),
  unicodeLabel: T('유니코드', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'Unicode', 'यूनिकोड', 'Unicode', 'Unicode'),
  asciiLabel: T('ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII', 'ASCII'),
  unitsLabel: T('단위 시간', 'Time units', 'Unidades de tiempo', 'Unidades de tempo', '単位時間', 'Zeiteinheiten', 'Unités de temps', 'समय इकाइयाँ', '时间单位', '時間單位'),
  msLabel: T('20단어/분에서', 'At 20 wpm', 'A 20 ppm', 'A 20 ppm', '20語/分で', 'Bei 20 WpM', 'À 20 mots/min', '20 शब्द/मिनट पर', '20 词/分时', '20 詞/分時'),
  raisedLabel: T('켜진 점', 'Raised dots', 'Puntos en relieve', 'Pontos em relevo', '出ている点', 'Erhabene Punkte', 'Points en relief', 'उभरे बिंदु', '凸起的点', '凸起的點'),
  usedByLabel: T('이 셀을 쓰는 글자', 'Characters using this cell', 'Caracteres con esta celda', 'Caracteres com esta cela', 'このセルを使う文字', 'Zeichen mit dieser Zelle', 'Caractères utilisant cette cellule', 'इस कोशिका वाले वर्ण', '使用这个方的字符', '使用這個方的字元'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),

  morseTitle: T('길이로 보기', 'Seen as timing', 'Visto como duración', 'Visto como duração', '長さで見る', 'Als Zeitverlauf', 'Vu comme une durée', 'अवधि के रूप में', '按时长看', '按時長看'),

  morseNote: T(
    '점은 한 단위, 선은 세 단위, 부호 사이는 한 단위입니다. 20단어/분에서 한 단위가 60밀리초입니다.',
    'A dot is one unit, a dash three, and the gap between them one. At 20 words per minute a unit is 60 milliseconds.',
    'Un punto es una unidad, una raya tres, y el hueco entre ellos una. A 20 palabras por minuto, una unidad son 60 milisegundos.',
    'Um ponto é uma unidade, um traço três, e o intervalo entre eles uma. A 20 palavras por minuto, uma unidade são 60 milissegundos.',
    '点は1単位、線は3単位、符号の間は1単位です。20語/分では1単位が60ミリ秒になります。',
    'Ein Punkt ist eine Einheit, ein Strich drei, die Lücke dazwischen eine. Bei 20 Wörtern pro Minute dauert eine Einheit 60 Millisekunden.',
    'Un point vaut une unité, un trait trois, et l’espace entre eux une. À 20 mots par minute, une unité fait 60 millisecondes.',
    'बिंदु एक इकाई, डैश तीन, और बीच का अंतराल एक। 20 शब्द प्रति मिनट पर एक इकाई 60 मिलीसेकंड होती है।',
    '点是一个单位，划是三个单位，符号之间空一个单位。每分钟 20 词时，一个单位是 60 毫秒。',
    '點是一個單位，劃是三個單位，符號之間空一個單位。每分鐘 20 詞時，一個單位是 60 毫秒。',
  ),

  natoNote: T(
    '무전에서 글자를 또렷이 전하려고 정한 낱말입니다. Alfa와 Juliett의 철자가 보통과 다른 것은, ph와 끝의 t가 묵음이 되는 언어가 있어서입니다.',
    'Words chosen so a letter survives a bad radio link. Alfa and Juliett are spelled oddly on purpose — some languages would swallow the ph and the final t.',
    'Palabras elegidas para que una letra sobreviva a una radio ruidosa. Alfa y Juliett se escriben así a propósito: en algunas lenguas se perdería la ph y la t final.',
    'Palavras escolhidas para que uma letra sobreviva a um rádio ruim. Alfa e Juliett são escritas assim de propósito: em algumas línguas a ph e o t final se perderiam.',
    '無線で文字を確実に伝えるために決められた語です。AlfaとJuliettの綴りが普通と違うのは、phや語末のtが読まれない言語があるからです。',
    'Wörter, die einen Buchstaben auch über eine schlechte Funkstrecke bringen. Alfa und Juliett sind mit Absicht anders geschrieben — in manchen Sprachen verschwänden ph und das End-t.',
    'Des mots choisis pour qu’une lettre survive à une liaison radio médiocre. Alfa et Juliett s’écrivent ainsi exprès : certaines langues avaleraient le ph et le t final.',
    'रेडियो पर अक्षर साफ़ पहुँचाने के लिए तय शब्द। Alfa और Juliett की वर्तनी जान-बूझकर अलग है — कुछ भाषाओं में ph और अंत का t खो जाता।',
    '为了让字母在嘈杂的无线电里也听得清而定的词。Alfa 和 Juliett 的拼法故意不同——有些语言会吞掉 ph 和词尾的 t。',
    '為了讓字母在嘈雜的無線電裡也聽得清而定的詞。Alfa 和 Juliett 的拼法故意不同——有些語言會吞掉 ph 和詞尾的 t。',
  ),

  brailleNote: T(
    '점자 한 칸은 점 여섯 자리이고, 위에서 아래로 왼쪽이 1·2·3, 오른쪽이 4·5·6입니다. 숫자는 a~j와 같은 칸을 쓰고 앞에 숫자표(⠼)를 세웁니다.',
    'A braille cell has six dot positions: 1, 2, 3 down the left and 4, 5, 6 down the right. Digits reuse the cells of a–j with a number sign (⠼) in front.',
    'Una celda braille tiene seis posiciones: 1, 2, 3 a la izquierda y 4, 5, 6 a la derecha. Los dígitos reutilizan las celdas de la a a la j con un signo de número (⠼) delante.',
    'Uma cela braille tem seis posições: 1, 2, 3 à esquerda e 4, 5, 6 à direita. Os dígitos reaproveitam as celas de a a j com um sinal de número (⠼) na frente.',
    '点字の一マスは6つの点で、左が上から1・2・3、右が4・5・6です。数字はa〜jと同じマスを使い、前に数符(⠼)を置きます。',
    'Eine Braille-Zelle hat sechs Punktplätze: links 1, 2, 3 und rechts 4, 5, 6. Ziffern nutzen die Zellen von a–j mit vorangestelltem Zahlzeichen (⠼).',
    'Une cellule braille compte six positions : 1, 2, 3 à gauche et 4, 5, 6 à droite. Les chiffres reprennent les cellules de a à j précédées du signe numérique (⠼).',
    'ब्रेल की एक कोशिका में छह स्थान होते हैं: बाईं ओर ऊपर से 1, 2, 3 और दाईं ओर 4, 5, 6। अंक a–j की कोशिकाएँ ही हैं, आगे अंक-चिह्न (⠼) के साथ।',
    '一个盲文方有六个点位：左边自上而下是 1、2、3，右边是 4、5、6。数字沿用 a–j 的方，前面加数符（⠼）。',
    '一個點字方有六個點位：左邊自上而下是 1、2、3，右邊是 4、5、6。數字沿用 a–j 的方，前面加數符（⠼）。',
  ),

  cellsTitle: T('점자 셀 예순넷', 'All sixty-four braille cells', 'Las sesenta y cuatro celdas', 'As sessenta e quatro celas', '点字のセル64種', 'Alle vierundsechzig Zellen', 'Les soixante-quatre cellules', 'चौंसठ ब्रेल कोशिकाएँ', '六十四个盲文方', '六十四個點字方'),

  cellsNote: T(
    '점 여섯 자리의 켜짐과 꺼짐이므로 2의 6제곱, 예순네 가지입니다. 빈 칸도 한 자리를 차지합니다 — 낱말 사이의 공백입니다.',
    'Six dots, each up or down: two to the sixth, sixty-four in all. The empty cell counts too — it is the space between words.',
    'Seis puntos, cada uno arriba o abajo: dos elevado a seis, sesenta y cuatro en total. La celda vacía también cuenta: es el espacio entre palabras.',
    'Seis pontos, cada um levantado ou não: dois elevado a seis, sessenta e quatro ao todo. A cela vazia também conta — é o espaço entre palavras.',
    '6つの点それぞれが出るか出ないかなので2の6乗、64通りです。空のマスも一つに数えます——語の間の空白です。',
    'Sechs Punkte, je gehoben oder nicht: zwei hoch sechs, also vierundsechzig. Die leere Zelle zählt mit — sie ist der Wortzwischenraum.',
    'Six points, chacun levé ou non : deux puissance six, soit soixante-quatre. La cellule vide compte aussi — c’est l’espace entre les mots.',
    'छह बिंदु, हर एक उठा या नहीं: दो की छठी घात, कुल चौंसठ। खाली कोशिका भी गिनी जाती है — वह शब्दों के बीच का अंतर है।',
    '六个点各有凸与不凸，2 的 6 次方，共六十四种。空方也算一个——那是词与词之间的空格。',
    '六個點各有凸與不凸，2 的 6 次方，共六十四種。空方也算一個——那是詞與詞之間的空格。',
  ),

  raisedGroup: T<(n: number) => string>(
    n => `점 ${n}개`,
    n => (n === 1 ? '1 dot' : `${n} dots`),
    n => (n === 1 ? '1 punto' : `${n} puntos`),
    n => (n === 1 ? '1 ponto' : `${n} pontos`),
    n => `点${n}つ`,
    n => (n === 1 ? '1 Punkt' : `${n} Punkte`),
    n => (n <= 1 ? `${n} point` : `${n} points`),
    n => `${n} बिंदु`,
    n => `${n} 个点`,
    n => `${n} 個點`,
  ),

  neighbourTitle: T('가까운 글자', 'Nearby characters', 'Caracteres cercanos', 'Caracteres próximos', '近い文字', 'Zeichen daneben', 'Caractères voisins', 'पास के वर्ण', '相邻的字符', '相鄰的字元'),

  charDesc: T<(f: CharFacts) => string>(
    f => `${f.char}는 모스로 ${f.morse}입니다${f.nato ? `. NATO 음성 문자로는 ${f.nato}` : ''}${f.dots ? `, 점자로는 점 ${f.dots}번` : ''}입니다. 치는 데 ${f.units}단위가 듭니다.`,
    f => `${f.char} is ${f.morse} in Morse${f.nato ? `, ${f.nato} in the NATO alphabet` : ''}${f.dots ? `, and dots ${f.dots} in braille` : ''}. Sending it takes ${f.units} time units.`,
    f => `${f.char} es ${f.morse} en Morse${f.nato ? `, ${f.nato} en el alfabeto NATO` : ''}${f.dots ? ` y los puntos ${f.dots} en braille` : ''}. Enviarlo cuesta ${f.units} unidades de tiempo.`,
    f => `${f.char} é ${f.morse} em Morse${f.nato ? `, ${f.nato} no alfabeto NATO` : ''}${f.dots ? ` e os pontos ${f.dots} em braille` : ''}. Enviá-lo leva ${f.units} unidades de tempo.`,
    f => `${f.char}はモールスで${f.morse}${f.nato ? `、NATOでは${f.nato}` : ''}${f.dots ? `、点字では点${f.dots}` : ''}です。打つのに${f.units}単位かかります。`,
    f => `${f.char} ist ${f.morse} im Morsecode${f.nato ? `, ${f.nato} im NATO-Alphabet` : ''}${f.dots ? ` und Punkte ${f.dots} in Braille` : ''}. Das Senden dauert ${f.units} Zeiteinheiten.`,
    f => `${f.char} s’écrit ${f.morse} en Morse${f.nato ? `, ${f.nato} dans l’alphabet NATO` : ''}${f.dots ? ` et points ${f.dots} en braille` : ''}. L’émettre prend ${f.units} unités de temps.`,
    f => `${f.char} मोर्स में ${f.morse} है${f.nato ? `, NATO वर्णमाला में ${f.nato}` : ''}${f.dots ? `, और ब्रेल में बिंदु ${f.dots}` : ''}। भेजने में ${f.units} समय इकाइयाँ लगती हैं।`,
    f => `${f.char} 的摩尔斯码是 ${f.morse}${f.nato ? `，NATO 单词是 ${f.nato}` : ''}${f.dots ? `，盲文是点 ${f.dots}` : ''}。发一次要 ${f.units} 个时间单位。`,
    f => `${f.char} 的摩斯碼是 ${f.morse}${f.nato ? `，NATO 單字是 ${f.nato}` : ''}${f.dots ? `，點字是點 ${f.dots}` : ''}。發一次要 ${f.units} 個時間單位。`,
  ),

  cellDesc: T<(f: CellFacts) => string>(
    f => `점 ${f.dots || '없이 비어 있는'} 칸입니다. 유니코드로는 ${f.codePoint}이고, 켜진 점은 ${f.raised}개입니다.${f.chars.length ? ` ${f.chars.map(c => c.char).join(', ')}가 이 칸을 씁니다.` : ''}`,
    f => `The cell with dots ${f.dots || 'none — it is empty'}. In Unicode it is ${f.codePoint}, with ${f.raised} raised.${f.chars.length ? ` It is used by ${f.chars.map(c => c.char).join(', ')}.` : ''}`,
    f => `La celda con los puntos ${f.dots || 'ninguno: está vacía'}. En Unicode es ${f.codePoint}, con ${f.raised} en relieve.${f.chars.length ? ` La usan ${f.chars.map(c => c.char).join(', ')}.` : ''}`,
    f => `A cela com os pontos ${f.dots || 'nenhum: está vazia'}. Em Unicode é ${f.codePoint}, com ${f.raised} em relevo.${f.chars.length ? ` É usada por ${f.chars.map(c => c.char).join(', ')}.` : ''}`,
    f => `点${f.dots || 'のない空の'}マスです。Unicodeでは${f.codePoint}、出ている点は${f.raised}つです。${f.chars.length ? `${f.chars.map(c => c.char).join('、')}がこのマスを使います。` : ''}`,
    f => `Die Zelle mit den Punkten ${f.dots || 'keinen — sie ist leer'}. In Unicode ${f.codePoint}, mit ${f.raised} erhabenen Punkten.${f.chars.length ? ` Sie wird von ${f.chars.map(c => c.char).join(', ')} genutzt.` : ''}`,
    f => `La cellule aux points ${f.dots || 'aucun : elle est vide'}. En Unicode, ${f.codePoint}, avec ${f.raised} points levés.${f.chars.length ? ` Elle sert à ${f.chars.map(c => c.char).join(', ')}.` : ''}`,
    f => `बिंदु ${f.dots || 'कोई नहीं — यह खाली है'} वाली कोशिका। यूनिकोड में ${f.codePoint}, उभरे बिंदु ${f.raised}।${f.chars.length ? ` इसे ${f.chars.map(c => c.char).join(', ')} उपयोग करते हैं।` : ''}`,
    f => `点为 ${f.dots || '空——一个点也没有'} 的方。Unicode 是 ${f.codePoint}，凸起 ${f.raised} 个点。${f.chars.length ? `${f.chars.map(c => c.char).join('、')} 用这个方。` : ''}`,
    f => `點為 ${f.dots || '空——一個點也沒有'} 的方。Unicode 是 ${f.codePoint}，凸起 ${f.raised} 個點。${f.chars.length ? `${f.chars.map(c => c.char).join('、')} 用這個方。` : ''}`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '모스에서 점은 한 단위, 선은 세 단위입니다. 자주 쓰는 글자일수록 짧습니다 — E가 점 하나입니다.',
      'NATO 낱말은 그 글자로 시작합니다. 무전에서 한 글자씩 또렷이 전할 때 씁니다.',
      '점자 한 칸은 점 여섯 자리라 예순네 가지입니다. 빈 칸은 낱말 사이의 공백입니다.',
      '숫자의 점자는 a~j와 같은 칸이고, 앞에 숫자표를 세워 구별합니다.',
    ],
    [
      'In Morse a dot is one unit and a dash three. The commoner the letter, the shorter the code — E is a single dot.',
      'Each NATO word starts with its own letter. It is for saying a letter clearly over the radio.',
      'A braille cell has six dot positions, so there are sixty-four of them. The empty one is the space between words.',
      'Digits in braille reuse the cells of a–j; a number sign in front tells them apart.',
    ],
    [
      'En Morse el punto vale una unidad y la raya tres. Cuanto más frecuente la letra, más corto el código: la E es un solo punto.',
      'Cada palabra NATO empieza por su propia letra. Sirve para decir una letra con claridad por radio.',
      'Una celda braille tiene seis posiciones, así que hay sesenta y cuatro. La vacía es el espacio entre palabras.',
      'Los dígitos en braille reutilizan las celdas de la a a la j; un signo de número delante los distingue.',
    ],
    [
      'Em Morse o ponto vale uma unidade e o traço três. Quanto mais comum a letra, mais curto o código: o E é um único ponto.',
      'Cada palavra NATO começa com a própria letra. Serve para dizer uma letra com clareza pelo rádio.',
      'Uma cela braille tem seis posições, então existem sessenta e quatro. A vazia é o espaço entre palavras.',
      'Os dígitos em braille reaproveitam as celas de a a j; um sinal de número na frente os distingue.',
    ],
    [
      'モールスでは点が1単位、線が3単位です。よく使う文字ほど短く、Eは点ひとつです。',
      'NATOの語はその文字で始まります。無線で一文字ずつ確実に伝えるためのものです。',
      '点字の一マスは点6つ分なので64通りです。空のマスは語の間の空白です。',
      '数字の点字はa〜jと同じマスで、前に数符を置いて区別します。',
    ],
    [
      'Im Morsecode zählt ein Punkt eine Einheit, ein Strich drei. Je häufiger der Buchstabe, desto kürzer — E ist ein einzelner Punkt.',
      'Jedes NATO-Wort beginnt mit seinem Buchstaben. Es dient dazu, einen Buchstaben über Funk klar zu übermitteln.',
      'Eine Braille-Zelle hat sechs Punktplätze, also gibt es vierundsechzig. Die leere ist der Wortzwischenraum.',
      'Ziffern nutzen in Braille die Zellen von a–j; ein vorangestelltes Zahlzeichen unterscheidet sie.',
    ],
    [
      'En Morse, le point vaut une unité et le trait trois. Plus la lettre est fréquente, plus le code est court : E est un seul point.',
      'Chaque mot NATO commence par sa lettre. Il sert à transmettre une lettre clairement par radio.',
      'Une cellule braille compte six positions : il y en a donc soixante-quatre. La vide est l’espace entre les mots.',
      'En braille, les chiffres reprennent les cellules de a à j ; un signe numérique placé devant les distingue.',
    ],
    [
      'मोर्स में बिंदु एक इकाई और डैश तीन। जो अक्षर जितना आम, कोड उतना छोटा — E एक ही बिंदु है।',
      'हर NATO शब्द अपने ही अक्षर से शुरू होता है। रेडियो पर अक्षर साफ़ कहने के लिए।',
      'ब्रेल की एक कोशिका में छह स्थान हैं, इसलिए चौंसठ कोशिकाएँ बनती हैं। खाली कोशिका शब्दों के बीच का अंतर है।',
      'ब्रेल में अंक a–j की कोशिकाएँ ही हैं; आगे अंक-चिह्न लगाकर उन्हें अलग किया जाता है।',
    ],
    [
      '摩尔斯里点是一个单位，划是三个。越常用的字母码越短——E 就是一个点。',
      '每个 NATO 单词都以自己那个字母开头，用来在无线电里把一个字母说清楚。',
      '一个盲文方有六个点位，所以共六十四个。空方就是词与词之间的空格。',
      '盲文里数字沿用 a–j 的方，靠前面的数符来区分。',
    ],
    [
      '摩斯裡點是一個單位，劃是三個。越常用的字母碼越短——E 就是一個點。',
      '每個 NATO 單字都以自己那個字母開頭，用來在無線電裡把一個字母說清楚。',
      '一個點字方有六個點位，所以共六十四個。空方就是詞與詞之間的空格。',
      '點字裡數字沿用 a–j 的方，靠前面的數符來區分。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '모스 부호표 — NATO 음성 문자와 점자까지',
    'Morse code chart — with the NATO alphabet and braille',
    'Tabla de código Morse — con alfabeto NATO y braille',
    'Tabela de código Morse — com alfabeto NATO e braille',
    'モールス符号表 — NATOフォネティックと点字も',
    'Morsecode-Tabelle — mit NATO-Alphabet und Braille',
    'Table du code Morse — avec l’alphabet NATO et le braille',
    'मोर्स कोड तालिका — NATO वर्णमाला और ब्रेल सहित',
    '摩尔斯码表 — 附 NATO 字母与盲文',
    '摩斯碼表 — 附 NATO 字母與點字',
  ),

  hubMetaDesc: T(
    '글자·숫자·기호 쉰둘의 모스 부호와 NATO 낱말, 점자 점 번호를 한 장씩. 점자 셀 예순넷도 따로 폈습니다.',
    'Morse code, NATO word and braille dots for fifty-two letters, digits and marks — one page each, plus all sixty-four braille cells.',
    'Código Morse, palabra NATO y puntos braille de cincuenta y dos letras, dígitos y signos, una página cada uno, más las sesenta y cuatro celdas.',
    'Código Morse, palavra NATO e pontos braille de cinquenta e dois caracteres, um por página, mais as sessenta e quatro celas.',
    '文字・数字・記号52種のモールス符号とNATOの語、点字の点番号を1ページずつ。点字のセル64種も並べました。',
    'Morsecode, NATO-Wort und Braille-Punkte für zweiundfünfzig Zeichen, je eine Seite, dazu alle vierundsechzig Braille-Zellen.',
    'Code Morse, mot NATO et points braille pour cinquante-deux caractères, une page chacun, plus les soixante-quatre cellules braille.',
    'बावन अक्षरों, अंकों और चिह्नों के मोर्स कोड, NATO शब्द और ब्रेल बिंदु — एक-एक पृष्ठ, साथ में चौंसठ ब्रेल कोशिकाएँ।',
    '五十二个字母、数字和标点的摩尔斯码、NATO 单词与盲文点号，各一页；另有六十四个盲文方。',
    '五十二個字母、數字和標點的摩斯碼、NATO 單字與點字點號，各一頁；另有六十四個點字方。',
  ),

  charMetaTitle: T<(f: CharFacts) => string>(
    f => `${f.char} 모스 부호 — ${f.morse}`,
    f => `${f.char} in Morse code — ${f.morse}`,
    f => `${f.char} en código Morse — ${f.morse}`,
    f => `${f.char} em código Morse — ${f.morse}`,
    f => `${f.char} のモールス符号 — ${f.morse}`,
    f => `${f.char} im Morsecode — ${f.morse}`,
    f => `${f.char} en code Morse — ${f.morse}`,
    f => `${f.char} मोर्स कोड — ${f.morse}`,
    f => `${f.char} 的摩尔斯码 — ${f.morse}`,
    f => `${f.char} 的摩斯碼 — ${f.morse}`,
  ),

  charMetaDesc: T<(f: CharFacts) => string>(
    f => `${f.char}의 모스 부호는 ${f.morse}입니다.${f.nato ? ` NATO 음성 문자는 ${f.nato},` : ''}${f.dots ? ` 점자는 점 ${f.dots}번,` : ''} 치는 데 ${f.units}단위(20단어/분에서 ${f.ms}밀리초)가 듭니다.`,
    f => `${f.char} is ${f.morse} in Morse.${f.nato ? ` NATO word ${f.nato},` : ''}${f.dots ? ` braille dots ${f.dots},` : ''} and it takes ${f.units} units — ${f.ms} ms at 20 wpm.`,
    f => `${f.char} es ${f.morse} en Morse.${f.nato ? ` Palabra NATO ${f.nato},` : ''}${f.dots ? ` puntos braille ${f.dots},` : ''} y ocupa ${f.units} unidades: ${f.ms} ms a 20 ppm.`,
    f => `${f.char} é ${f.morse} em Morse.${f.nato ? ` Palavra NATO ${f.nato},` : ''}${f.dots ? ` pontos braille ${f.dots},` : ''} e ocupa ${f.units} unidades: ${f.ms} ms a 20 ppm.`,
    f => `${f.char}のモールス符号は${f.morse}です。${f.nato ? `NATOの語は${f.nato}、` : ''}${f.dots ? `点字は点${f.dots}、` : ''}打つのに${f.units}単位（20語/分で${f.ms}ミリ秒）かかります。`,
    f => `${f.char} ist ${f.morse} im Morsecode.${f.nato ? ` NATO-Wort ${f.nato},` : ''}${f.dots ? ` Braille-Punkte ${f.dots},` : ''} und braucht ${f.units} Einheiten — ${f.ms} ms bei 20 WpM.`,
    f => `${f.char} s’écrit ${f.morse} en Morse.${f.nato ? ` Mot NATO ${f.nato},` : ''}${f.dots ? ` points braille ${f.dots},` : ''} et prend ${f.units} unités : ${f.ms} ms à 20 mots/min.`,
    f => `${f.char} मोर्स में ${f.morse} है।${f.nato ? ` NATO शब्द ${f.nato},` : ''}${f.dots ? ` ब्रेल बिंदु ${f.dots},` : ''} और इसमें ${f.units} इकाइयाँ लगती हैं — 20 शब्द/मिनट पर ${f.ms} ms।`,
    f => `${f.char} 的摩尔斯码是 ${f.morse}。${f.nato ? `NATO 单词 ${f.nato}，` : ''}${f.dots ? `盲文点 ${f.dots}，` : ''}发送需要 ${f.units} 个单位，20 词/分时为 ${f.ms} 毫秒。`,
    f => `${f.char} 的摩斯碼是 ${f.morse}。${f.nato ? `NATO 單字 ${f.nato}，` : ''}${f.dots ? `點字點 ${f.dots}，` : ''}發送需要 ${f.units} 個單位，20 詞/分時為 ${f.ms} 毫秒。`,
  ),

  cellMetaTitle: T<(f: CellFacts) => string>(
    f => `점자 ${f.char} — 점 ${f.dots || '없음'}`,
    f => `Braille ${f.char} — dots ${f.dots || 'none'}`,
    f => `Braille ${f.char} — puntos ${f.dots || 'ninguno'}`,
    f => `Braille ${f.char} — pontos ${f.dots || 'nenhum'}`,
    f => `点字 ${f.char} — 点 ${f.dots || 'なし'}`,
    f => `Braille ${f.char} — Punkte ${f.dots || 'keine'}`,
    f => `Braille ${f.char} — points ${f.dots || 'aucun'}`,
    f => `ब्रेल ${f.char} — बिंदु ${f.dots || 'कोई नहीं'}`,
    f => `盲文 ${f.char} — 点 ${f.dots || '无'}`,
    f => `點字 ${f.char} — 點 ${f.dots || '無'}`,
  ),

  cellMetaDesc: T<(f: CellFacts) => string>(
    f => `점자 셀 ${f.char}는 점 ${f.dots || '이 하나도 없는 빈 칸'}이고 유니코드 ${f.codePoint}입니다. 켜진 점은 ${f.raised}개입니다.`,
    f => `The braille cell ${f.char} has dots ${f.dots || 'none at all — it is the empty cell'} and sits at ${f.codePoint} in Unicode, with ${f.raised} raised.`,
    f => `La celda braille ${f.char} tiene los puntos ${f.dots || 'ninguno: es la celda vacía'} y está en ${f.codePoint} en Unicode, con ${f.raised} en relieve.`,
    f => `A cela braille ${f.char} tem os pontos ${f.dots || 'nenhum: é a cela vazia'} e fica em ${f.codePoint} no Unicode, com ${f.raised} em relevo.`,
    f => `点字のセル ${f.char} は点${f.dots || 'がひとつもない空のマス'}で、Unicodeでは${f.codePoint}です。出ている点は${f.raised}つです。`,
    f => `Die Braille-Zelle ${f.char} hat die Punkte ${f.dots || 'keine — sie ist die leere Zelle'} und steht in Unicode auf ${f.codePoint}, mit ${f.raised} erhabenen Punkten.`,
    f => `La cellule braille ${f.char} porte les points ${f.dots || 'aucun : c’est la cellule vide'} et se trouve en ${f.codePoint} dans Unicode, avec ${f.raised} points levés.`,
    f => `ब्रेल कोशिका ${f.char} में बिंदु ${f.dots || 'एक भी नहीं — यह खाली कोशिका है'} हैं और यूनिकोड में ${f.codePoint} पर है, उभरे बिंदु ${f.raised}।`,
    f => `盲文方 ${f.char} 的点是 ${f.dots || '一个也没有——这是空方'}，Unicode 为 ${f.codePoint}，凸起 ${f.raised} 个点。`,
    f => `點字方 ${f.char} 的點是 ${f.dots || '一個也沒有——這是空方'}，Unicode 為 ${f.codePoint}，凸起 ${f.raised} 個點。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'SOS는 왜 ···−−−···인가요?', a: 'S가 점 셋, O가 선 셋이기 때문입니다. 뜻이 있는 말이 아니라 치기 쉽고 알아듣기 쉬운 배열로 고른 것입니다.' },
      { q: '모스 부호는 왜 글자마다 길이가 다른가요?', a: '자주 쓰는 글자를 짧게 두었기 때문입니다. E는 점 하나, T는 선 하나입니다.' },
      { q: 'NATO 음성 문자는 어디에 쓰나요?', a: '무전이나 전화로 철자를 불러 줄 때 씁니다. B와 D처럼 소리가 비슷한 글자를 낱말로 갈라 줍니다.' },
      { q: '점자 셀은 왜 예순네 가지인가요?', a: '점 여섯 자리가 각각 켜지거나 꺼지므로 2의 6제곱입니다. 빈 칸도 그중 하나입니다.' },
      { q: '점자에서 숫자는 어떻게 적나요?', a: 'a부터 j까지와 같은 칸을 쓰고, 앞에 숫자표(⠼)를 세워 숫자임을 알립니다.' },
    ],
    [
      { q: 'Why is SOS ···−−−···?', a: 'Because S is three dots and O is three dashes. It stands for nothing — it was picked as an easy pattern to send and to recognise.' },
      { q: 'Why are Morse codes different lengths?', a: 'The commoner letters were given the shorter codes. E is one dot, T is one dash.' },
      { q: 'What is the NATO alphabet for?', a: 'For spelling something out over radio or telephone. Words keep B and D — which sound alike — apart.' },
      { q: 'Why are there sixty-four braille cells?', a: 'Six dot positions, each raised or not: two to the sixth. The empty cell is one of them.' },
      { q: 'How are digits written in braille?', a: 'With the cells of a to j, preceded by a number sign (⠼) that says the next cells are figures.' },
    ],
    [
      { q: '¿Por qué SOS es ···−−−···?', a: 'Porque la S son tres puntos y la O tres rayas. No significa nada: se eligió por ser fácil de enviar y de reconocer.' },
      { q: '¿Por qué los códigos Morse tienen distinta longitud?', a: 'A las letras más frecuentes se les dio el código más corto. La E es un punto y la T una raya.' },
      { q: '¿Para qué sirve el alfabeto NATO?', a: 'Para deletrear por radio o teléfono. Las palabras separan letras que suenan parecido, como B y D.' },
      { q: '¿Por qué hay sesenta y cuatro celdas braille?', a: 'Seis posiciones, cada una en relieve o no: dos elevado a seis. La celda vacía es una de ellas.' },
      { q: '¿Cómo se escriben los dígitos en braille?', a: 'Con las celdas de la a a la j, precedidas de un signo de número (⠼) que avisa de que vienen cifras.' },
    ],
    [
      { q: 'Por que SOS é ···−−−···?', a: 'Porque S são três pontos e O três traços. Não significa nada: foi escolhido por ser fácil de enviar e reconhecer.' },
      { q: 'Por que os códigos Morse têm comprimentos diferentes?', a: 'As letras mais comuns receberam os códigos mais curtos. E é um ponto e T é um traço.' },
      { q: 'Para que serve o alfabeto NATO?', a: 'Para soletrar por rádio ou telefone. As palavras separam letras que soam parecido, como B e D.' },
      { q: 'Por que há sessenta e quatro celas braille?', a: 'Seis posições, cada uma em relevo ou não: dois elevado a seis. A cela vazia é uma delas.' },
      { q: 'Como se escrevem os dígitos em braille?', a: 'Com as celas de a a j, precedidas de um sinal de número (⠼) que avisa que vêm algarismos.' },
    ],
    [
      { q: 'SOSはなぜ···−−−···なのですか？', a: 'Sが点三つ、Oが線三つだからです。意味のある語ではなく、打ちやすく聞き分けやすい並びとして選ばれました。' },
      { q: 'モールス符号の長さが文字ごとに違うのはなぜですか？', a: 'よく使う文字に短い符号を与えたからです。Eは点ひとつ、Tは線ひとつです。' },
      { q: 'NATOフォネティックコードは何に使いますか？', a: '無線や電話で綴りを伝えるときに使います。BとDのように似た音を語で分けます。' },
      { q: '点字のセルはなぜ64種なのですか？', a: '点6つがそれぞれ出るか出ないかなので2の6乗です。空のマスもその一つです。' },
      { q: '点字で数字はどう書きますか？', a: 'a〜jと同じマスを使い、前に数符(⠼)を置いて数字だと知らせます。' },
    ],
    [
      { q: 'Warum ist SOS ···−−−···?', a: 'Weil S drei Punkte und O drei Striche sind. Es steht für nichts — es wurde als leicht zu sendendes und gut erkennbares Muster gewählt.' },
      { q: 'Warum sind Morsecodes verschieden lang?', a: 'Die häufigeren Buchstaben bekamen die kürzeren Codes. E ist ein Punkt, T ein Strich.' },
      { q: 'Wozu dient das NATO-Alphabet?', a: 'Zum Buchstabieren über Funk oder Telefon. Die Wörter halten ähnlich klingende Buchstaben wie B und D auseinander.' },
      { q: 'Warum gibt es vierundsechzig Braille-Zellen?', a: 'Sechs Punktplätze, je gehoben oder nicht: zwei hoch sechs. Die leere Zelle gehört dazu.' },
      { q: 'Wie schreibt man Ziffern in Braille?', a: 'Mit den Zellen von a bis j, davor ein Zahlzeichen (⠼), das ankündigt, dass Ziffern folgen.' },
    ],
    [
      { q: 'Pourquoi SOS s’écrit-il ···−−−··· ?', a: 'Parce que S vaut trois points et O trois traits. Cela ne veut rien dire : le motif a été choisi parce qu’il est facile à émettre et à reconnaître.' },
      { q: 'Pourquoi les codes Morse ont-ils des longueurs différentes ?', a: 'Les lettres les plus fréquentes ont reçu les codes les plus courts. E est un point, T un trait.' },
      { q: 'À quoi sert l’alphabet NATO ?', a: 'À épeler par radio ou par téléphone. Les mots distinguent des lettres qui se ressemblent, comme B et D.' },
      { q: 'Pourquoi soixante-quatre cellules braille ?', a: 'Six positions, chacune levée ou non : deux puissance six. La cellule vide en fait partie.' },
      { q: 'Comment écrit-on les chiffres en braille ?', a: 'Avec les cellules de a à j, précédées d’un signe numérique (⠼) annonçant des chiffres.' },
    ],
    [
      { q: 'SOS ···−−−··· क्यों है?', a: 'क्योंकि S तीन बिंदु और O तीन डैश है। इसका कोई अर्थ नहीं — इसे भेजने और पहचानने में आसान होने के कारण चुना गया।' },
      { q: 'मोर्स कोड की लंबाई अलग-अलग क्यों है?', a: 'अधिक प्रयुक्त अक्षरों को छोटा कोड दिया गया। E एक बिंदु है और T एक डैश।' },
      { q: 'NATO वर्णमाला किस काम आती है?', a: 'रेडियो या फ़ोन पर वर्तनी बताने में। शब्द B और D जैसे मिलते-जुलते अक्षरों को अलग कर देते हैं।' },
      { q: 'ब्रेल की चौंसठ कोशिकाएँ क्यों?', a: 'छह स्थान, हर एक उठा या नहीं: दो की छठी घात। खाली कोशिका भी उनमें से एक है।' },
      { q: 'ब्रेल में अंक कैसे लिखे जाते हैं?', a: 'a से j की कोशिकाओं से, आगे अंक-चिह्न (⠼) लगाकर कि आगे अंक आ रहे हैं।' },
    ],
    [
      { q: 'SOS 为什么是 ···−−−···？', a: '因为 S 是三个点，O 是三个划。它本身没有含义，只是挑了一个好发、好认的排列。' },
      { q: '摩尔斯码为什么长短不一？', a: '常用的字母给了短码。E 是一个点，T 是一个划。' },
      { q: 'NATO 字母表用在哪里？', a: '用来在无线电或电话里拼读。用单词把 B 和 D 这类音近的字母分开。' },
      { q: '盲文方为什么是六十四个？', a: '六个点位各有凸与不凸，2 的 6 次方。空方也是其中之一。' },
      { q: '盲文里的数字怎么写？', a: '用 a 到 j 的方，前面加数符（⠼）表示后面是数字。' },
    ],
    [
      { q: 'SOS 為什麼是 ···−−−···？', a: '因為 S 是三個點，O 是三個劃。它本身沒有含義，只是挑了一個好發、好認的排列。' },
      { q: '摩斯碼為什麼長短不一？', a: '常用的字母給了短碼。E 是一個點，T 是一個劃。' },
      { q: 'NATO 字母表用在哪裡？', a: '用來在無線電或電話裡拼讀。用單字把 B 和 D 這類音近的字母分開。' },
      { q: '點字方為什麼是六十四個？', a: '六個點位各有凸與不凸，2 的 6 次方。空方也是其中之一。' },
      { q: '點字裡的數字怎麼寫？', a: '用 a 到 j 的方，前面加數符（⠼）表示後面是數字。' },
    ],
  ),

  charFaq: T<(f: CharFacts) => FaqItem[]>(
    f => [
      { q: `${f.char}의 모스 부호는 무엇인가요?`, a: `${f.morse}입니다. 점 ${f.dotCount}개와 선 ${f.dashCount}개로 이루어집니다.` },
      { q: `치는 데 얼마나 걸리나요?`, a: `${f.units}단위입니다. 20단어/분에서는 ${f.ms}밀리초입니다.` },
      { q: f.nato ? `무전에서 ${f.char}를 어떻게 부르나요?` : `${f.char}에 NATO 낱말이 있나요?`, a: f.nato ? `${f.nato}라고 부릅니다.` : `없습니다. NATO 음성 문자는 글자와 숫자에만 있습니다.` },
      { q: `점자로는 어떻게 적나요?`, a: f.dots ? `점 ${f.dots}번을 올립니다 — ${f.braille} 입니다.` : `이 기호는 점자 표에 따로 두지 않았습니다.` },
    ],
    f => [
      { q: `What is ${f.char} in Morse code?`, a: `${f.morse} — ${f.dotCount} dots and ${f.dashCount} dashes.` },
      { q: `How long does it take to send?`, a: `${f.units} time units, which is ${f.ms} ms at 20 words per minute.` },
      { q: f.nato ? `How is ${f.char} said over the radio?` : `Does ${f.char} have a NATO word?`, a: f.nato ? `As ${f.nato}.` : `No — the NATO alphabet covers only letters and digits.` },
      { q: `How is it written in braille?`, a: f.dots ? `Dots ${f.dots} are raised: ${f.braille}.` : `This mark is not in the braille table here.` },
    ],
    f => [
      { q: `¿Cómo es ${f.char} en Morse?`, a: `${f.morse}: ${f.dotCount} puntos y ${f.dashCount} rayas.` },
      { q: `¿Cuánto tarda en enviarse?`, a: `${f.units} unidades de tiempo, o sea ${f.ms} ms a 20 palabras por minuto.` },
      { q: f.nato ? `¿Cómo se dice ${f.char} por radio?` : `¿Tiene ${f.char} palabra NATO?`, a: f.nato ? `Se dice ${f.nato}.` : `No: el alfabeto NATO solo cubre letras y dígitos.` },
      { q: `¿Cómo se escribe en braille?`, a: f.dots ? `Se levantan los puntos ${f.dots}: ${f.braille}.` : `Este signo no está en la tabla braille de aquí.` },
    ],
    f => [
      { q: `Como é ${f.char} em Morse?`, a: `${f.morse}: ${f.dotCount} pontos e ${f.dashCount} traços.` },
      { q: `Quanto tempo leva para enviar?`, a: `${f.units} unidades de tempo, ou seja ${f.ms} ms a 20 palavras por minuto.` },
      { q: f.nato ? `Como se diz ${f.char} pelo rádio?` : `${f.char} tem palavra NATO?`, a: f.nato ? `Diz-se ${f.nato}.` : `Não: o alfabeto NATO cobre apenas letras e dígitos.` },
      { q: `Como se escreve em braille?`, a: f.dots ? `Levantam-se os pontos ${f.dots}: ${f.braille}.` : `Este sinal não está na tabela braille daqui.` },
    ],
    f => [
      { q: `${f.char}のモールス符号は？`, a: `${f.morse}です。点${f.dotCount}つと線${f.dashCount}つでできています。` },
      { q: `打つのにどれくらいかかりますか？`, a: `${f.units}単位、20語/分では${f.ms}ミリ秒です。` },
      { q: f.nato ? `無線で${f.char}をどう呼びますか？` : `${f.char}にNATOの語はありますか？`, a: f.nato ? `${f.nato}と呼びます。` : `ありません。NATOフォネティックは文字と数字だけです。` },
      { q: `点字ではどう書きますか？`, a: f.dots ? `点${f.dots}を出します——${f.braille}です。` : `この記号は点字表に載せていません。` },
    ],
    f => [
      { q: `Wie lautet ${f.char} im Morsecode?`, a: `${f.morse} — ${f.dotCount} Punkte und ${f.dashCount} Striche.` },
      { q: `Wie lange dauert das Senden?`, a: `${f.units} Zeiteinheiten, also ${f.ms} ms bei 20 Wörtern pro Minute.` },
      { q: f.nato ? `Wie sagt man ${f.char} über Funk?` : `Hat ${f.char} ein NATO-Wort?`, a: f.nato ? `Als ${f.nato}.` : `Nein — das NATO-Alphabet deckt nur Buchstaben und Ziffern ab.` },
      { q: `Wie schreibt man es in Braille?`, a: f.dots ? `Die Punkte ${f.dots} werden gehoben: ${f.braille}.` : `Dieses Zeichen steht hier nicht in der Braille-Tabelle.` },
    ],
    f => [
      { q: `Comment s’écrit ${f.char} en Morse ?`, a: `${f.morse} : ${f.dotCount} points et ${f.dashCount} traits.` },
      { q: `Combien de temps pour l’émettre ?`, a: `${f.units} unités, soit ${f.ms} ms à 20 mots par minute.` },
      { q: f.nato ? `Comment dit-on ${f.char} à la radio ?` : `${f.char} a-t-il un mot NATO ?`, a: f.nato ? `On dit ${f.nato}.` : `Non : l’alphabet NATO ne couvre que lettres et chiffres.` },
      { q: `Comment l’écrit-on en braille ?`, a: f.dots ? `On lève les points ${f.dots} : ${f.braille}.` : `Ce signe ne figure pas dans la table braille ici.` },
    ],
    f => [
      { q: `${f.char} का मोर्स कोड क्या है?`, a: `${f.morse} — ${f.dotCount} बिंदु और ${f.dashCount} डैश।` },
      { q: `भेजने में कितना समय लगता है?`, a: `${f.units} इकाइयाँ, यानी 20 शब्द/मिनट पर ${f.ms} ms।` },
      { q: f.nato ? `रेडियो पर ${f.char} कैसे बोलते हैं?` : `क्या ${f.char} का NATO शब्द है?`, a: f.nato ? `${f.nato} कहते हैं।` : `नहीं — NATO वर्णमाला केवल अक्षरों और अंकों के लिए है।` },
      { q: `ब्रेल में इसे कैसे लिखें?`, a: f.dots ? `बिंदु ${f.dots} उठाए जाते हैं — ${f.braille}।` : `यह चिह्न यहाँ की ब्रेल तालिका में नहीं है।` },
    ],
    f => [
      { q: `${f.char} 的摩尔斯码是什么？`, a: `${f.morse}，由 ${f.dotCount} 个点和 ${f.dashCount} 个划组成。` },
      { q: `发一次要多久？`, a: `${f.units} 个时间单位，20 词/分时约 ${f.ms} 毫秒。` },
      { q: f.nato ? `无线电里怎么念 ${f.char}？` : `${f.char} 有 NATO 单词吗？`, a: f.nato ? `念作 ${f.nato}。` : `没有，NATO 字母表只收字母和数字。` },
      { q: `盲文里怎么写？`, a: f.dots ? `凸起点 ${f.dots}——就是 ${f.braille}。` : `这个符号没有收进这里的盲文表。` },
    ],
    f => [
      { q: `${f.char} 的摩斯碼是什麼？`, a: `${f.morse}，由 ${f.dotCount} 個點和 ${f.dashCount} 個劃組成。` },
      { q: `發一次要多久？`, a: `${f.units} 個時間單位，20 詞/分時約 ${f.ms} 毫秒。` },
      { q: f.nato ? `無線電裡怎麼念 ${f.char}？` : `${f.char} 有 NATO 單字嗎？`, a: f.nato ? `念作 ${f.nato}。` : `沒有，NATO 字母表只收字母和數字。` },
      { q: `點字裡怎麼寫？`, a: f.dots ? `凸起點 ${f.dots}——就是 ${f.braille}。` : `這個符號沒有收進這裡的點字表。` },
    ],
  ),

  cellFaq: T<(f: CellFacts) => FaqItem[]>(
    f => [
      { q: `이 칸의 점 번호는 무엇인가요?`, a: f.dots ? `${f.dots}번입니다. 켜진 점은 ${f.raised}개입니다.` : `켜진 점이 없는 빈 칸입니다 — 낱말 사이의 공백으로 씁니다.` },
      { q: `유니코드로는 어떻게 적나요?`, a: `${f.codePoint}입니다. ⠀(U+2800)에 점 값을 더하면 나옵니다.` },
      { q: `이 칸을 쓰는 글자가 있나요?`, a: f.chars.length ? `${f.chars.map(c => c.char).join(', ')}가 씁니다.` : `여기 실은 표에는 없습니다. 약자나 다른 나라 점자에서 쓰일 수 있습니다.` },
    ],
    f => [
      { q: `Which dots are raised?`, a: f.dots ? `Dots ${f.dots} — ${f.raised} of them.` : `None. This is the empty cell, used as the space between words.` },
      { q: `How is it written in Unicode?`, a: `${f.codePoint}. Add the dot value to ⠀ (U+2800) and you land on it.` },
      { q: `Does any character use this cell?`, a: f.chars.length ? `Yes: ${f.chars.map(c => c.char).join(', ')}.` : `Not in the table shown here; it may be used by contractions or by braille in other languages.` },
    ],
    f => [
      { q: `¿Qué puntos están en relieve?`, a: f.dots ? `Los puntos ${f.dots}: ${f.raised} en total.` : `Ninguno. Es la celda vacía, el espacio entre palabras.` },
      { q: `¿Cómo se escribe en Unicode?`, a: `${f.codePoint}. Suma el valor de los puntos a ⠀ (U+2800) y llegas ahí.` },
      { q: `¿Algún carácter usa esta celda?`, a: f.chars.length ? `Sí: ${f.chars.map(c => c.char).join(', ')}.` : `No en la tabla de aquí; puede usarse en abreviaturas o en el braille de otras lenguas.` },
    ],
    f => [
      { q: `Quais pontos estão em relevo?`, a: f.dots ? `Os pontos ${f.dots}: ${f.raised} ao todo.` : `Nenhum. É a cela vazia, o espaço entre palavras.` },
      { q: `Como se escreve em Unicode?`, a: `${f.codePoint}. Some o valor dos pontos a ⠀ (U+2800) e você chega lá.` },
      { q: `Algum caractere usa esta cela?`, a: f.chars.length ? `Sim: ${f.chars.map(c => c.char).join(', ')}.` : `Não na tabela daqui; pode aparecer em abreviaturas ou no braille de outras línguas.` },
    ],
    f => [
      { q: `どの点が出ていますか？`, a: f.dots ? `点${f.dots}です。出ている点は${f.raised}つです。` : `ひとつも出ていません。空のマスで、語の間の空白に使います。` },
      { q: `Unicodeではどう書きますか？`, a: `${f.codePoint}です。⠀(U+2800)に点の値を足すと出ます。` },
      { q: `このマスを使う文字はありますか？`, a: f.chars.length ? `${f.chars.map(c => c.char).join('、')}が使います。` : `ここの表にはありません。略字や他の国の点字で使われることがあります。` },
    ],
    f => [
      { q: `Welche Punkte sind gehoben?`, a: f.dots ? `Die Punkte ${f.dots} — ${f.raised} Stück.` : `Keine. Das ist die leere Zelle, der Zwischenraum zwischen Wörtern.` },
      { q: `Wie schreibt man sie in Unicode?`, a: `${f.codePoint}. Man addiert den Punktwert zu ⠀ (U+2800).` },
      { q: `Nutzt ein Zeichen diese Zelle?`, a: f.chars.length ? `Ja: ${f.chars.map(c => c.char).join(', ')}.` : `In dieser Tabelle nicht; Kürzungen oder Braille anderer Sprachen können sie verwenden.` },
    ],
    f => [
      { q: `Quels points sont levés ?`, a: f.dots ? `Les points ${f.dots} — ${f.raised} en tout.` : `Aucun. C’est la cellule vide, l’espace entre les mots.` },
      { q: `Comment l’écrire en Unicode ?`, a: `${f.codePoint}. On ajoute la valeur des points à ⠀ (U+2800).` },
      { q: `Un caractère utilise-t-il cette cellule ?`, a: f.chars.length ? `Oui : ${f.chars.map(c => c.char).join(', ')}.` : `Pas dans la table présentée ici ; les abréviations ou le braille d’autres langues peuvent s’en servir.` },
    ],
    f => [
      { q: `कौन-से बिंदु उभरे हैं?`, a: f.dots ? `बिंदु ${f.dots} — कुल ${f.raised}।` : `कोई नहीं। यह खाली कोशिका है, शब्दों के बीच का अंतर।` },
      { q: `यूनिकोड में कैसे लिखें?`, a: `${f.codePoint}। ⠀ (U+2800) में बिंदु-मान जोड़ने पर यही मिलता है।` },
      { q: `क्या कोई वर्ण इस कोशिका का उपयोग करता है?`, a: f.chars.length ? `हाँ: ${f.chars.map(c => c.char).join(', ')}।` : `यहाँ की तालिका में नहीं; संक्षेपों या अन्य भाषाओं की ब्रेल में हो सकता है।` },
    ],
    f => [
      { q: `哪些点是凸起的？`, a: f.dots ? `点 ${f.dots}，共 ${f.raised} 个。` : `一个也没有。这是空方，用作词与词之间的空格。` },
      { q: `Unicode 里怎么写？`, a: `${f.codePoint}。把点值加到 ⠀（U+2800）上就得到它。` },
      { q: `有字符使用这个方吗？`, a: f.chars.length ? `有：${f.chars.map(c => c.char).join('、')}。` : `这里的表里没有；缩写或其他语言的盲文可能用到。` },
    ],
    f => [
      { q: `哪些點是凸起的？`, a: f.dots ? `點 ${f.dots}，共 ${f.raised} 個。` : `一個也沒有。這是空方，用作詞與詞之間的空格。` },
      { q: `Unicode 裡怎麼寫？`, a: `${f.codePoint}。把點值加到 ⠀（U+2800）上就得到它。` },
      { q: `有字元使用這個方嗎？`, a: f.chars.length ? `有：${f.chars.map(c => c.char).join('、')}。` : `這裡的表裡沒有；縮寫或其他語言的點字可能用到。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const CODE_UI: L<CodeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<CodeUI>;
