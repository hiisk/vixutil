/**
 * 로마 숫자 화면의 문구 — 열 언어.
 *
 * 이 표를 찾는 자리가 나라마다 크게 다르지 않다. 문신에 새길 생일, 영화 끝의
 * 저작권 연도, 시계 문자판. 그래서 문구도 "왜 이 글자인가"를 같은 순서로
 * 설명한다 — 큰 값부터 빼고, 넷 이상 잇지 않고, 뺄셈 꼴은 여섯 가지뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import { toRoman, type RomanFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface RomanUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  romanLabel: string;
  partsLabel: string;
  digitsLabel: string;
  lengthLabel: string;
  subtractiveLabel: string;
  usedTag: string;
  noneTag: string;
  letterUnit: (n: number) => string;
  tableTitle: string;
  tableNote: string;
  subtractiveTitle: string;
  subtractiveNote: string;
  decadeTitle: string;
  decadeNote: string;
  decadeName: (from: number) => string;
  longestTitle: string;
  longestNote: string;
  allTitle: string;
  neighbourTitle: string;
  desc: (f: RomanFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: RomanFacts) => string;
  metaDesc: (f: RomanFacts) => string;
  hubFaq: FaqItem[];
  yearFaq: (f: RomanFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof RomanUI]: L<RomanUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('로마 숫자', 'Roman numerals', 'Números romanos', 'Algarismos romanos', 'ローマ数字', 'Römische Zahlen', 'Chiffres romains', 'रोमन अंक', '罗马数字', '羅馬數字'),

  hubTitle: T(
    '로마 숫자 연도 201해 — 1900년부터 2100년까지',
    'Years in Roman numerals — 1900 to 2100',
    'Años en números romanos — de 1900 a 2100',
    'Anos em algarismos romanos — de 1900 a 2100',
    'ローマ数字の年201年分 — 1900年から2100年まで',
    'Jahreszahlen in römischen Zahlen — 1900 bis 2100',
    'Les années en chiffres romains — de 1900 à 2100',
    'रोमन अंकों में वर्ष — 1900 से 2100 तक',
    '罗马数字年份 — 1900 到 2100',
    '羅馬數字年份 — 1900 到 2100',
  ),

  hubLead: T(
    '문신에 새길 생일, 영화 끝의 저작권 연도, 시계 문자판. 한 해씩 글자를 조각내어 왜 그렇게 적히는지까지 보입니다.',
    'A birth year for a tattoo, the copyright line at the end of a film, a watch face. Each year is broken into its pieces so you can see why it is written that way.',
    'El año de nacimiento para un tatuaje, el copyright al final de una película, la esfera de un reloj. Cada año se descompone en sus piezas para ver por qué se escribe así.',
    'O ano de nascimento para uma tatuagem, o copyright no fim de um filme, o mostrador de um relógio. Cada ano é dividido em pedaços para mostrar por que se escreve assim.',
    'タトゥーに刻む生年、映画の最後の著作権表示、時計の文字盤。1年ずつ文字を分解して、なぜそう書くのかまで見せます。',
    'Ein Geburtsjahr fürs Tattoo, die Copyright-Zeile am Filmende, ein Zifferblatt. Jedes Jahr wird in seine Bausteine zerlegt, damit sichtbar wird, warum es so geschrieben wird.',
    'Une année de naissance pour un tatouage, le copyright à la fin d’un film, un cadran de montre. Chaque année est décomposée pour montrer pourquoi elle s’écrit ainsi.',
    'टैटू के लिए जन्म का वर्ष, फ़िल्म के अंत की कॉपीराइट पंक्ति, घड़ी का डायल। हर वर्ष को टुकड़ों में बाँटकर दिखाया है कि वह ऐसा क्यों लिखा जाता है।',
    '纹身上的出生年份、片尾的版权年份、手表的表盘。每一年都拆成部件，让你看清它为什么这样写。',
    '刺青上的出生年份、片尾的版權年份、手錶的錶盤。每一年都拆成部件，讓你看清它為什麼這樣寫。',
  ),

  romanLabel: T('로마 숫자', 'Roman numeral', 'Número romano', 'Algarismo romano', 'ローマ数字', 'Römische Zahl', 'Chiffre romain', 'रोमन अंक', '罗马数字', '羅馬數字'),
  partsLabel: T('조각내면', 'Broken up', 'En piezas', 'Em pedaços', '分解すると', 'Zerlegt', 'Décomposé', 'टुकड़ों में', '拆开看', '拆開看'),
  digitsLabel: T('자릿수별', 'By place value', 'Por posición', 'Por casa decimal', '位ごと', 'Nach Stellenwert', 'Par rang', 'स्थानमान से', '按数位', '按數位'),
  lengthLabel: T('글자 수', 'Letters', 'Letras', 'Letras', '文字数', 'Buchstaben', 'Lettres', 'अक्षर', '字母数', '字母數'),
  subtractiveLabel: T('뺄셈 꼴', 'Subtractive pairs', 'Pares sustractivos', 'Pares subtrativos', '引き算の形', 'Subtraktive Paare', 'Paires soustractives', 'घटाव के जोड़े', '减法组合', '減法組合'),
  usedTag: T('썼습니다', 'Used', 'Se usan', 'Usados', '使っています', 'Verwendet', 'Utilisées', 'प्रयुक्त', '有', '有'),
  noneTag: T('없습니다', 'None', 'Ninguno', 'Nenhum', 'ありません', 'Keine', 'Aucune', 'कोई नहीं', '无', '無'),

  letterUnit: T<(n: number) => string>(
    n => `${n}자`,
    n => `${n} letters`,
    n => `${n} letras`,
    n => `${n} letras`,
    n => `${n}文字`,
    n => `${n} Buchstaben`,
    n => `${n} lettres`,
    n => `${n} अक्षर`,
    n => `${n} 个字母`,
    n => `${n} 個字母`,
  ),

  tableTitle: T('글자 일곱 개와 뺄셈 꼴 여섯 개', 'Seven letters and six subtractive pairs', 'Siete letras y seis pares sustractivos', 'Sete letras e seis pares subtrativos', '7つの文字と6つの引き算の形', 'Sieben Buchstaben und sechs subtraktive Paare', 'Sept lettres et six paires soustractives', 'सात अक्षर और छह घटाव जोड़े', '七个字母与六个减法组合', '七個字母與六個減法組合'),

  tableNote: T(
    '이 열세 줄이 전부입니다. 값이 큰 것부터 뺄 수 있을 때까지 빼면 어떤 해든 적힙니다.',
    'These thirteen rows are the whole system. Subtract the largest value you can, over and over, and any year falls out.',
    'Estas trece filas son todo el sistema. Resta el mayor valor posible una y otra vez y sale cualquier año.',
    'Estas treze linhas são o sistema inteiro. Subtraia o maior valor possível, repetidamente, e sai qualquer ano.',
    'この13行がすべてです。大きい値から引けるだけ引いていけば、どの年も書けます。',
    'Diese dreizehn Zeilen sind das ganze System. Ziehe immer wieder den größten möglichen Wert ab, und jedes Jahr ergibt sich.',
    'Ces treize lignes forment tout le système. Retirez la plus grande valeur possible, encore et encore, et n’importe quelle année en sort.',
    'ये तेरह पंक्तियाँ ही पूरी प्रणाली हैं। हर बार सबसे बड़ा संभव मान घटाते जाइए, कोई भी वर्ष बन जाएगा।',
    '这十三行就是全部规则。每次减去能减的最大值，任何年份都能写出来。',
    '這十三行就是全部規則。每次減去能減的最大值，任何年份都能寫出來。',
  ),

  subtractiveTitle: T('왜 IIII가 아니라 IV인가', 'Why IV and not IIII', 'Por qué IV y no IIII', 'Por que IV e não IIII', 'なぜIIIIではなくIVなのか', 'Warum IV und nicht IIII', 'Pourquoi IV et non IIII', 'IIII नहीं, IV क्यों', '为什么是 IV 而不是 IIII', '為什麼是 IV 而不是 IIII'),

  subtractiveNote: T(
    '같은 글자를 넷 이상 잇지 않기 때문입니다. 작은 글자를 큰 글자 앞에 놓아 빼는 꼴이 여섯 가지 있습니다 — IV(4), IX(9), XL(40), XC(90), CD(400), CM(900).',
    'Because the same letter is never repeated four times. Six pairs put a smaller letter first so it is subtracted: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
    'Porque una misma letra nunca se repite cuatro veces. Seis pares colocan la letra menor delante para restarla: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
    'Porque a mesma letra nunca se repete quatro vezes. Seis pares põem a letra menor à frente para subtraí-la: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
    '同じ文字を4つ以上並べないからです。小さい文字を前に置いて引く形が6つあります——IV（4）、IX（9）、XL（40）、XC（90）、CD（400）、CM（900）。',
    'Weil derselbe Buchstabe nie viermal wiederholt wird. Sechs Paare stellen den kleineren Buchstaben voran, damit er abgezogen wird: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
    'Parce qu’une même lettre ne se répète jamais quatre fois. Six paires placent la plus petite lettre devant pour la soustraire : IV (4), IX (9), XL (40), XC (90), CD (400), CM (900).',
    'क्योंकि एक ही अक्षर चार बार नहीं दोहराया जाता। छह जोड़े छोटे अक्षर को आगे रखकर घटाते हैं: IV (4), IX (9), XL (40), XC (90), CD (400), CM (900)।',
    '因为同一个字母不会连写四次。有六个组合把小字母放在前面表示相减：IV（4）、IX（9）、XL（40）、XC（90）、CD（400）、CM（900）。',
    '因為同一個字母不會連寫四次。有六個組合把小字母放在前面表示相減：IV（4）、IX（9）、XL（40）、XC（90）、CD（400）、CM（900）。',
  ),

  decadeTitle: T('십 년씩 묶어 보기', 'Decade by decade', 'Década a década', 'Década a década', '10年ごとに見る', 'Jahrzehnt für Jahrzehnt', 'Décennie par décennie', 'दशक दर दशक', '按十年查看', '按十年查看'),

  decadeNote: T(
    '찾는 해가 어느 언저리인지 알면 여기서 바로 짚을 수 있습니다.',
    'If you know roughly when, you can pick the year straight from here.',
    'Si sabes más o menos cuándo, puedes elegir el año directamente aquí.',
    'Se você sabe mais ou menos quando, dá para escolher o ano direto daqui.',
    'おおよその年代が分かれば、ここから直接選べます。',
    'Wenn du ungefähr weißt, wann, kannst du das Jahr hier direkt greifen.',
    'Si vous savez à peu près quand, vous pouvez choisir l’année directement ici.',
    'यदि मोटे तौर पर समय पता है तो वर्ष यहीं से चुन लीजिए।',
    '只要知道大概年代，就能直接在这里点到那一年。',
    '只要知道大概年代，就能直接在這裡點到那一年。',
  ),

  decadeName: T<(from: number) => string>(
    from => `${from}년대`,
    from => `${from}s`,
    from => `Años ${from}`,
    from => `Anos ${from}`,
    from => `${from}年代`,
    from => `${from}er-Jahre`,
    from => `Années ${from}`,
    from => `${from} का दशक`,
    from => `${from} 年代`,
    from => `${from} 年代`,
  ),

  longestTitle: T('가장 길고 가장 짧은 해', 'The longest and the shortest', 'El más largo y el más corto', 'O mais longo e o mais curto', '一番長い年と短い年', 'Das längste und das kürzeste Jahr', 'La plus longue et la plus courte', 'सबसे लंबा और सबसे छोटा', '最长与最短的年份', '最長與最短的年份'),

  longestNote: T(
    '1988년은 MCMLXXXVIII로 열한 자입니다. 2000년은 MM 두 자로 끝납니다 — 두 해가 열두 해밖에 떨어져 있지 않습니다.',
    '1988 is MCMLXXXVIII, eleven letters. The year 2000 is just MM, two letters — and they are only twelve years apart.',
    '1988 es MCMLXXXVIII, once letras. El año 2000 es solo MM, dos letras, y los separan apenas doce años.',
    '1988 é MCMLXXXVIII, onze letras. O ano 2000 é apenas MM, duas letras — e há só doze anos entre eles.',
    '1988年はMCMLXXXVIIIで11文字です。2000年はMMの2文字だけ——たった12年しか離れていません。',
    '1988 lautet MCMLXXXVIII, elf Buchstaben. Das Jahr 2000 ist nur MM, zwei Buchstaben — und dazwischen liegen bloß zwölf Jahre.',
    '1988 s’écrit MCMLXXXVIII, onze lettres. L’an 2000 tient en MM, deux lettres — douze ans seulement les séparent.',
    '1988 यानी MCMLXXXVIII — ग्यारह अक्षर। वर्ष 2000 केवल MM, दो अक्षर — और दोनों में सिर्फ़ बारह साल का फ़ासला है।',
    '1988 写作 MCMLXXXVIII，十一个字母；2000 只有 MM 两个字母——两者仅相隔十二年。',
    '1988 寫作 MCMLXXXVIII，十一個字母；2000 只有 MM 兩個字母——兩者僅相隔十二年。',
  ),

  allTitle: T('1900년부터 2100년까지', 'From 1900 to 2100', 'De 1900 a 2100', 'De 1900 a 2100', '1900年から2100年まで', 'Von 1900 bis 2100', 'De 1900 à 2100', '1900 से 2100 तक', '从 1900 到 2100', '從 1900 到 2100'),
  neighbourTitle: T('가까운 해', 'Nearby years', 'Años cercanos', 'Anos próximos', '近い年', 'Jahre daneben', 'Années voisines', 'पास के वर्ष', '相邻的年份', '相鄰的年份'),

  desc: T<(f: RomanFacts) => string>(
    f => `${f.year}년은 로마 숫자로 ${f.roman}입니다. ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')}를 더한 값이라 ${f.length}자로 적힙니다.`,
    f => `The year ${f.year} is ${f.roman} in Roman numerals — ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} added together, ${f.length} letters in all.`,
    f => `El año ${f.year} es ${f.roman} en números romanos: ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} sumados, ${f.length} letras en total.`,
    f => `O ano ${f.year} é ${f.roman} em algarismos romanos: ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} somados, ${f.length} letras ao todo.`,
    f => `${f.year}年はローマ数字で${f.roman}です。${f.parts.map(p => `${p.letters}=${p.value}`).join('、')}を足した値なので${f.length}文字になります。`,
    f => `Das Jahr ${f.year} lautet ${f.roman} — ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} zusammengezählt, insgesamt ${f.length} Buchstaben.`,
    f => `L’année ${f.year} s’écrit ${f.roman} : ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} additionnés, soit ${f.length} lettres.`,
    f => `वर्ष ${f.year} रोमन अंकों में ${f.roman} है — ${f.parts.map(p => `${p.letters}=${p.value}`).join(', ')} जोड़ने पर, कुल ${f.length} अक्षर।`,
    f => `${f.year} 年的罗马数字是 ${f.roman}，由 ${f.parts.map(p => `${p.letters}=${p.value}`).join('、')} 相加而成，共 ${f.length} 个字母。`,
    f => `${f.year} 年的羅馬數字是 ${f.roman}，由 ${f.parts.map(p => `${p.letters}=${p.value}`).join('、')} 相加而成，共 ${f.length} 個字母。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '왼쪽부터 더하되, 작은 글자가 큰 글자 앞에 오면 뺍니다.',
      'M=1000, D=500, C=100, L=50, X=10, V=5, I=1 일곱 글자뿐입니다.',
      '같은 글자는 셋까지만 잇습니다 — 넷째부터는 뺄셈 꼴로 적습니다.',
      '0은 적을 수 없고, 큰 자리부터 차례로 씁니다.',
    ],
    [
      'Add from the left, but subtract when a smaller letter comes before a larger one.',
      'There are only seven letters: M=1000, D=500, C=100, L=50, X=10, V=5, I=1.',
      'The same letter repeats at most three times — the fourth becomes a subtractive pair.',
      'There is no zero, and the largest place value is always written first.',
    ],
    [
      'Suma de izquierda a derecha, pero resta cuando una letra menor va delante de una mayor.',
      'Solo hay siete letras: M=1000, D=500, C=100, L=50, X=10, V=5, I=1.',
      'Una letra se repite como mucho tres veces; la cuarta se convierte en un par sustractivo.',
      'No existe el cero y siempre se escribe primero la posición mayor.',
    ],
    [
      'Some da esquerda para a direita, mas subtraia quando uma letra menor vem antes de uma maior.',
      'Existem só sete letras: M=1000, D=500, C=100, L=50, X=10, V=5, I=1.',
      'Uma letra se repete no máximo três vezes; a quarta vira um par subtrativo.',
      'Não há zero, e a casa maior é sempre escrita primeiro.',
    ],
    [
      '左から足していき、小さい文字が大きい文字の前に来たら引きます。',
      '文字はM=1000、D=500、C=100、L=50、X=10、V=5、I=1の7つだけです。',
      '同じ文字は3つまで——4つ目からは引き算の形で書きます。',
      'ゼロは書けず、大きい位から順に書きます。',
    ],
    [
      'Von links addieren, aber subtrahieren, wenn ein kleinerer Buchstabe vor einem größeren steht.',
      'Es gibt nur sieben Buchstaben: M=1000, D=500, C=100, L=50, X=10, V=5, I=1.',
      'Derselbe Buchstabe steht höchstens dreimal — ab dem vierten wird subtraktiv geschrieben.',
      'Eine Null gibt es nicht, und die größte Stelle steht immer zuerst.',
    ],
    [
      'On additionne de gauche à droite, mais on soustrait quand une petite lettre précède une grande.',
      'Il n’y a que sept lettres : M=1000, D=500, C=100, L=50, X=10, V=5, I=1.',
      'Une même lettre se répète au plus trois fois ; la quatrième devient une paire soustractive.',
      'Le zéro n’existe pas, et le rang le plus élevé s’écrit toujours en premier.',
    ],
    [
      'बाएँ से जोड़िए, पर जब छोटा अक्षर बड़े से पहले आए तो घटाइए।',
      'केवल सात अक्षर हैं: M=1000, D=500, C=100, L=50, X=10, V=5, I=1।',
      'एक ही अक्षर अधिकतम तीन बार आता है — चौथी बार घटाव जोड़ा बन जाता है।',
      'शून्य लिखा नहीं जाता, और सबसे बड़ा स्थान हमेशा पहले आता है।',
    ],
    [
      '从左往右相加，但小字母在大字母前面时要相减。',
      '字母只有七个：M=1000、D=500、C=100、L=50、X=10、V=5、I=1。',
      '同一字母最多连写三次，第四次改用减法组合。',
      '没有零，且总是先写最大的数位。',
    ],
    [
      '從左往右相加，但小字母在大字母前面時要相減。',
      '字母只有七個：M=1000、D=500、C=100、L=50、X=10、V=5、I=1。',
      '同一字母最多連寫三次，第四次改用減法組合。',
      '沒有零，且總是先寫最大的數位。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '로마 숫자 연도표 — 1900년부터 2100년까지 한 해씩',
    'Roman numeral years — 1900 to 2100, one page each',
    'Años en números romanos — de 1900 a 2100, uno por página',
    'Anos em algarismos romanos — de 1900 a 2100, um por página',
    'ローマ数字の年表 — 1900年から2100年まで1年ずつ',
    'Römische Jahreszahlen — 1900 bis 2100, Jahr für Jahr',
    'Années en chiffres romains — de 1900 à 2100, une par page',
    'रोमन अंकों में वर्ष — 1900 से 2100 तक, हर वर्ष अलग',
    '罗马数字年份表 — 1900 到 2100，一年一页',
    '羅馬數字年份表 — 1900 到 2100，一年一頁',
  ),

  hubMetaDesc: T(
    '1900년부터 2100년까지 201해를 로마 숫자로. 글자를 조각내어 어떤 값이 더해졌는지, 왜 IIII가 아니라 IV인지까지 보여 줍니다.',
    'All 201 years from 1900 to 2100 in Roman numerals, each broken into the values that were added — and why it is IV, not IIII.',
    'Los 201 años de 1900 a 2100 en números romanos, cada uno descompuesto en los valores sumados, y por qué es IV y no IIII.',
    'Os 201 anos de 1900 a 2100 em algarismos romanos, cada um decomposto nos valores somados, e por que é IV e não IIII.',
    '1900年から2100年までの201年をローマ数字で。文字を分解してどの値が足されたか、なぜIIIIではなくIVなのかまで示します。',
    'Alle 201 Jahre von 1900 bis 2100 in römischen Zahlen, jedes in seine addierten Werte zerlegt — und warum es IV heißt und nicht IIII.',
    'Les 201 années de 1900 à 2100 en chiffres romains, chacune décomposée en valeurs additionnées, et pourquoi c’est IV et non IIII.',
    '1900 से 2100 तक के सभी 201 वर्ष रोमन अंकों में, हर एक जोड़े गए मानों में बँटा हुआ — और IIII नहीं, IV क्यों।',
    '1900 到 2100 共 201 个年份的罗马数字，逐个拆成相加的数值，并说明为什么是 IV 而不是 IIII。',
    '1900 到 2100 共 201 個年份的羅馬數字，逐個拆成相加的數值，並說明為什麼是 IV 而不是 IIII。',
  ),

  metaTitle: T<(f: RomanFacts) => string>(
    f => `${f.year}년 로마 숫자 — ${f.roman}`,
    f => `${f.year} in Roman numerals — ${f.roman}`,
    f => `${f.year} en números romanos — ${f.roman}`,
    f => `${f.year} em algarismos romanos — ${f.roman}`,
    f => `${f.year}年のローマ数字 — ${f.roman}`,
    f => `${f.year} als römische Zahl — ${f.roman}`,
    f => `${f.year} en chiffres romains — ${f.roman}`,
    f => `${f.year} रोमन अंकों में — ${f.roman}`,
    f => `${f.year} 年的罗马数字 — ${f.roman}`,
    f => `${f.year} 年的羅馬數字（繁體） — ${f.roman}`,
  ),

  metaDesc: T<(f: RomanFacts) => string>(
    f => `${f.year}년은 로마 숫자로 ${f.roman}입니다. ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}이고 모두 ${f.length}자입니다.`,
    f => `${f.year} is written ${f.roman}: ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, ${f.length} letters in total.`,
    f => `${f.year} se escribe ${f.roman}: ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, ${f.length} letras en total.`,
    f => `${f.year} escreve-se ${f.roman}: ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, ${f.length} letras ao todo.`,
    f => `${f.year}年は${f.roman}と書きます。${f.parts.map(p => p.letters).join(' + ')} = ${f.year}で、全部で${f.length}文字です。`,
    f => `${f.year} schreibt sich ${f.roman}: ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, insgesamt ${f.length} Buchstaben.`,
    f => `${f.year} s’écrit ${f.roman} : ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, soit ${f.length} lettres.`,
    f => `${f.year} इस तरह लिखा जाता है: ${f.roman} — ${f.parts.map(p => p.letters).join(' + ')} = ${f.year}, कुल ${f.length} अक्षर।`,
    f => `${f.year} 年写作 ${f.roman}：${f.parts.map(p => p.letters).join(' + ')} = ${f.year}，共 ${f.length} 个字母。`,
    f => `${f.year} 年寫作 ${f.roman}：${f.parts.map(p => p.letters).join(' + ')} = ${f.year}，共 ${f.length} 個字母。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '로마 숫자에 0이 있나요?', a: '없습니다. 없는 자리는 글자를 적지 않고 넘어갑니다 — 2000년이 MM 두 자로 끝나는 까닭입니다.' },
      { q: '4를 IIII로 적은 시계를 봤는데요?', a: '시계 문자판에서는 옛 방식인 IIII를 쓰기도 합니다. VIII와 좌우 균형이 맞기 때문이라고 합니다. 표기법으로는 IV가 표준입니다.' },
      { q: '3999보다 큰 수는 어떻게 적나요?', a: '글자 위에 줄을 그어 1000배를 나타냅니다. 다만 연도에는 거의 쓰이지 않아 여기서는 다루지 않습니다.' },
      { q: '문신에 새길 날짜는 어떻게 적나요?', a: '연·월·일을 각각 로마 숫자로 적고 점이나 사선으로 나눕니다. 예를 들어 1994년 3월 7일이면 VII · III · MCMXCIV입니다.' },
      { q: '왜 1900년부터인가요?', a: '작은 수는 이미 숫자 사전에서 한 줄씩 다루고 있어, 여기서는 사람들이 실제로 찾는 연도 구간만 맡았습니다.' },
    ],
    [
      { q: 'Is there a zero in Roman numerals?', a: 'No. An empty place is simply skipped — that is why the year 2000 is only MM.' },
      { q: 'I have seen clocks with IIII for four.', a: 'Clock faces often keep the older IIII, said to balance the VIII opposite it. In writing, IV is the standard.' },
      { q: 'How are numbers above 3999 written?', a: 'A bar over a letter multiplies it by 1000. Years almost never need it, so it is left out here.' },
      { q: 'How do I write a date for a tattoo?', a: 'Write day, month and year each in Roman numerals, separated by dots or slashes: 7 March 1994 becomes VII · III · MCMXCIV.' },
      { q: 'Why start at 1900?', a: 'Small numbers already get a page each in the number reference, so this section covers only the years people actually look up.' },
    ],
    [
      { q: '¿Existe el cero en los números romanos?', a: 'No. Una posición vacía simplemente se salta: por eso el año 2000 es solo MM.' },
      { q: 'He visto relojes con IIII para el cuatro.', a: 'Las esferas suelen conservar el antiguo IIII, se dice que para equilibrar el VIII de enfrente. Al escribir, lo estándar es IV.' },
      { q: '¿Cómo se escriben los números mayores de 3999?', a: 'Una raya sobre la letra la multiplica por 1000. Los años casi nunca lo necesitan, así que aquí no se usa.' },
      { q: '¿Cómo escribo una fecha para un tatuaje?', a: 'Día, mes y año en números romanos, separados por puntos o barras: el 7 de marzo de 1994 es VII · III · MCMXCIV.' },
      { q: '¿Por qué empezar en 1900?', a: 'Los números pequeños ya tienen su propia página en la referencia numérica; aquí solo van los años que la gente consulta de verdad.' },
    ],
    [
      { q: 'Existe zero em algarismos romanos?', a: 'Não. Uma casa vazia é simplesmente pulada — por isso o ano 2000 é apenas MM.' },
      { q: 'Já vi relógios com IIII no lugar do quatro.', a: 'Os mostradores costumam manter o antigo IIII, dizem que para equilibrar o VIII à frente. Na escrita, o padrão é IV.' },
      { q: 'Como se escrevem números acima de 3999?', a: 'Uma barra sobre a letra a multiplica por 1000. Anos quase nunca precisam disso, então não é usado aqui.' },
      { q: 'Como escrevo uma data para tatuagem?', a: 'Dia, mês e ano em algarismos romanos, separados por pontos ou barras: 7 de março de 1994 fica VII · III · MCMXCIV.' },
      { q: 'Por que começar em 1900?', a: 'Números pequenos já têm uma página cada na referência de números; aqui ficam só os anos que as pessoas realmente procuram.' },
    ],
    [
      { q: 'ローマ数字にゼロはありますか？', a: 'ありません。空いた位は文字を書かずに飛ばします——2000年がMMの2文字で済むのはそのためです。' },
      { q: '4をIIIIと書いた時計を見ましたが？', a: '文字盤では古い書き方のIIIIを残すことがあります。向かいのVIIIと釣り合うためだと言われます。表記としてはIVが標準です。' },
      { q: '3999より大きい数はどう書きますか？', a: '文字の上に線を引いて1000倍を表します。年にはほとんど使わないので、ここでは扱いません。' },
      { q: 'タトゥーの日付はどう書きますか？', a: '日・月・年をそれぞれローマ数字にして点や斜線で区切ります。1994年3月7日ならVII · III · MCMXCIVです。' },
      { q: 'なぜ1900年からですか？', a: '小さい数は数の事典が1つずつ扱っているので、ここでは実際に調べられる年だけを引き受けました。' },
    ],
    [
      { q: 'Gibt es eine Null in römischen Zahlen?', a: 'Nein. Eine leere Stelle wird einfach übersprungen — deshalb ist das Jahr 2000 nur MM.' },
      { q: 'Auf Uhren steht doch IIII für vier.', a: 'Zifferblätter behalten oft das ältere IIII, angeblich zum Ausgleich mit dem gegenüberliegenden VIII. Geschrieben gilt IV.' },
      { q: 'Wie schreibt man Zahlen über 3999?', a: 'Ein Strich über dem Buchstaben nimmt ihn mal 1000. Für Jahreszahlen braucht man das fast nie, deshalb fehlt es hier.' },
      { q: 'Wie schreibe ich ein Datum fürs Tattoo?', a: 'Tag, Monat und Jahr je in römischen Zahlen, getrennt durch Punkte oder Schrägstriche: 7. März 1994 wird VII · III · MCMXCIV.' },
      { q: 'Warum erst ab 1900?', a: 'Kleine Zahlen haben in der Zahlen-Referenz schon je eine Seite; hier stehen nur die Jahre, die wirklich nachgeschlagen werden.' },
    ],
    [
      { q: 'Le zéro existe-t-il en chiffres romains ?', a: 'Non. Un rang vide est simplement sauté : voilà pourquoi l’an 2000 se réduit à MM.' },
      { q: 'J’ai vu des horloges avec IIII pour quatre.', a: 'Les cadrans gardent souvent l’ancien IIII, pour équilibrer le VIII qui lui fait face, dit-on. À l’écrit, IV est la norme.' },
      { q: 'Comment écrire les nombres au-delà de 3999 ?', a: 'Une barre au-dessus d’une lettre la multiplie par 1000. Les années n’en ont presque jamais besoin, donc ce n’est pas utilisé ici.' },
      { q: 'Comment écrire une date pour un tatouage ?', a: 'Jour, mois et année en chiffres romains, séparés par des points ou des barres : le 7 mars 1994 donne VII · III · MCMXCIV.' },
      { q: 'Pourquoi commencer en 1900 ?', a: 'Les petits nombres ont déjà chacun leur page dans la référence numérique ; ici ne figurent que les années réellement consultées.' },
    ],
    [
      { q: 'क्या रोमन अंकों में शून्य होता है?', a: 'नहीं। खाली स्थान को छोड़ दिया जाता है — इसीलिए वर्ष 2000 केवल MM है।' },
      { q: 'घड़ियों पर चार के लिए IIII क्यों दिखता है?', a: 'डायल पर पुराना IIII चलता रहा है, कहते हैं सामने के VIII से संतुलन बने। लेखन में IV ही मानक है।' },
      { q: '3999 से बड़ी संख्याएँ कैसे लिखें?', a: 'अक्षर के ऊपर रेखा उसे 1000 से गुणा कर देती है। वर्षों में इसकी ज़रूरत लगभग नहीं पड़ती, इसलिए यहाँ नहीं है।' },
      { q: 'टैटू के लिए तारीख़ कैसे लिखें?', a: 'दिन, महीना और वर्ष अलग-अलग रोमन अंकों में, बिंदु या तिरछी रेखा से अलग: 7 मार्च 1994 यानी VII · III · MCMXCIV।' },
      { q: '1900 से ही क्यों?', a: 'छोटी संख्याओं का पन्ना संख्या-संदर्भ में पहले से है, इसलिए यहाँ केवल वे वर्ष हैं जो सचमुच खोजे जाते हैं।' },
    ],
    [
      { q: '罗马数字里有零吗？', a: '没有。空着的数位直接跳过——所以 2000 年只写作 MM。' },
      { q: '为什么钟表上四写成 IIII？', a: '表盘常沿用旧写法 IIII，据说是为了与对面的 VIII 对称。书写时以 IV 为标准。' },
      { q: '大于 3999 的数怎么写？', a: '在字母上加一横表示乘一千。年份几乎用不到，这里就不涉及。' },
      { q: '纹身上的日期怎么写？', a: '日、月、年各写成罗马数字，用点或斜线隔开：1994 年 3 月 7 日写作 VII · III · MCMXCIV。' },
      { q: '为什么从 1900 年开始？', a: '小数字在数字词典里已经一个一页，这里只承担人们真正会查的年份区间。' },
    ],
    [
      { q: '羅馬數字裡有零嗎？', a: '沒有。空著的數位直接跳過——所以 2000 年只寫作 MM。' },
      { q: '為什麼鐘錶上四寫成 IIII？', a: '錶盤常沿用舊寫法 IIII，據說是為了與對面的 VIII 對稱。書寫時以 IV 為標準。' },
      { q: '大於 3999 的數怎麼寫？', a: '在字母上加一橫表示乘一千。年份幾乎用不到，這裡就不涉及。' },
      { q: '刺青上的日期怎麼寫？', a: '日、月、年各寫成羅馬數字，用點或斜線隔開：1994 年 3 月 7 日寫作 VII · III · MCMXCIV。' },
      { q: '為什麼從 1900 年開始？', a: '小數字在數字詞典裡已經一個一頁，這裡只承擔人們真正會查的年份區間。' },
    ],
  ),

  yearFaq: T<(f: RomanFacts) => FaqItem[]>(
    f => [
      { q: `${f.year}년을 로마 숫자로 어떻게 적나요?`, a: `${f.roman}입니다. ${f.parts.map(p => `${p.letters}(${p.value})`).join(' + ')}을 이어 적은 것입니다.` },
      { q: `${f.roman}은 몇 자인가요?`, a: `${f.length}자입니다.` },
      { q: `뺄셈 꼴이 들어 있나요?`, a: f.hasSubtractive ? `네. ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}이 그렇습니다.` : `아니요. 모두 큰 값부터 더하는 글자뿐입니다.` },
      { q: `앞뒤 해는 어떻게 되나요?`, a: [f.prev !== null ? `${f.prev}년은 ${toRoman(f.prev)}입니다.` : '', f.next !== null ? `${f.next}년은 ${toRoman(f.next)}입니다.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `How do you write ${f.year} in Roman numerals?`, a: `${f.roman} — that is ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} written in a row.` },
      { q: `How many letters is ${f.roman}?`, a: `${f.length}.` },
      { q: `Does it use a subtractive pair?`, a: f.hasSubtractive ? `Yes: ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}.` : `No — every letter is simply added, largest first.` },
      { q: `What about the years either side?`, a: [f.prev !== null ? `${f.prev} is ${toRoman(f.prev)}.` : '', f.next !== null ? `${f.next} is ${toRoman(f.next)}.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `¿Cómo se escribe ${f.year} en números romanos?`, a: `${f.roman}: es ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} escrito seguido.` },
      { q: `¿Cuántas letras tiene ${f.roman}?`, a: `${f.length}.` },
      { q: `¿Lleva algún par sustractivo?`, a: f.hasSubtractive ? `Sí: ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}.` : `No, todas las letras se suman empezando por la mayor.` },
      { q: `¿Y los años vecinos?`, a: [f.prev !== null ? `${f.prev} es ${toRoman(f.prev)}.` : '', f.next !== null ? `${f.next} es ${toRoman(f.next)}.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `Como se escreve ${f.year} em algarismos romanos?`, a: `${f.roman}: é ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} escrito em sequência.` },
      { q: `Quantas letras tem ${f.roman}?`, a: `${f.length}.` },
      { q: `Usa algum par subtrativo?`, a: f.hasSubtractive ? `Usa: ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}.` : `Não — todas as letras são somadas, da maior para a menor.` },
      { q: `E os anos vizinhos?`, a: [f.prev !== null ? `${f.prev} é ${toRoman(f.prev)}.` : '', f.next !== null ? `${f.next} é ${toRoman(f.next)}.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `${f.year}年はローマ数字でどう書きますか？`, a: `${f.roman}です。${f.parts.map(p => `${p.letters}（${p.value}）`).join(' + ')}を続けて書いたものです。` },
      { q: `${f.roman}は何文字ですか？`, a: `${f.length}文字です。` },
      { q: `引き算の形は入っていますか？`, a: f.hasSubtractive ? `はい。${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join('、')}がそうです。` : `いいえ。大きい値から足す文字だけです。` },
      { q: `前後の年はどうなりますか？`, a: [f.prev !== null ? `${f.prev}年は${toRoman(f.prev)}です。` : '', f.next !== null ? `${f.next}年は${toRoman(f.next)}です。` : ''].filter(Boolean).join('') },
    ],
    f => [
      { q: `Wie schreibt man ${f.year} als römische Zahl?`, a: `${f.roman} — also ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} hintereinander.` },
      { q: `Wie viele Buchstaben hat ${f.roman}?`, a: `${f.length}.` },
      { q: `Steckt ein subtraktives Paar darin?`, a: f.hasSubtractive ? `Ja: ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}.` : `Nein — alle Buchstaben werden addiert, größte Werte zuerst.` },
      { q: `Und die Jahre davor und danach?`, a: [f.prev !== null ? `${f.prev} ist ${toRoman(f.prev)}.` : '', f.next !== null ? `${f.next} ist ${toRoman(f.next)}.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `Comment écrit-on ${f.year} en chiffres romains ?`, a: `${f.roman} : c’est ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} écrit à la suite.` },
      { q: `Combien de lettres compte ${f.roman} ?`, a: `${f.length}.` },
      { q: `Y a-t-il une paire soustractive ?`, a: f.hasSubtractive ? `Oui : ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}.` : `Non — toutes les lettres s’additionnent, de la plus grande à la plus petite.` },
      { q: `Et les années voisines ?`, a: [f.prev !== null ? `${f.prev} s’écrit ${toRoman(f.prev)}.` : '', f.next !== null ? `${f.next} s’écrit ${toRoman(f.next)}.` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `${f.year} को रोमन अंकों में कैसे लिखें?`, a: `${f.roman} — यानी ${f.parts.map(p => `${p.letters} (${p.value})`).join(' + ')} एक साथ लिखा हुआ।` },
      { q: `${f.roman} में कितने अक्षर हैं?`, a: `${f.length}।` },
      { q: `क्या इसमें घटाव जोड़ा है?`, a: f.hasSubtractive ? `हाँ: ${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join(', ')}।` : `नहीं — सभी अक्षर बड़े से छोटे क्रम में जुड़ते हैं।` },
      { q: `आसपास के वर्ष क्या होंगे?`, a: [f.prev !== null ? `${f.prev} यानी ${toRoman(f.prev)}।` : '', f.next !== null ? `${f.next} यानी ${toRoman(f.next)}।` : ''].filter(Boolean).join(' ') },
    ],
    f => [
      { q: `${f.year} 年的罗马数字怎么写？`, a: `${f.roman}，也就是 ${f.parts.map(p => `${p.letters}（${p.value}）`).join(' + ')} 依次连写。` },
      { q: `${f.roman} 有几个字母？`, a: `${f.length} 个。` },
      { q: `里面有减法组合吗？`, a: f.hasSubtractive ? `有：${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join('、')}。` : `没有，全部按从大到小相加。` },
      { q: `前后两年呢？`, a: [f.prev !== null ? `${f.prev} 年是 ${toRoman(f.prev)}。` : '', f.next !== null ? `${f.next} 年是 ${toRoman(f.next)}。` : ''].filter(Boolean).join('') },
    ],
    f => [
      { q: `${f.year} 年的羅馬數字怎麼寫？`, a: `${f.roman}，也就是 ${f.parts.map(p => `${p.letters}（${p.value}）`).join(' + ')} 依次連寫。` },
      { q: `${f.roman} 有幾個字母？`, a: `${f.length} 個。` },
      { q: `裡面有減法組合嗎？`, a: f.hasSubtractive ? `有：${f.parts.filter(p => p.subtractive).map(p => `${p.letters}=${p.value}`).join('、')}。` : `沒有，全部按從大到小相加。` },
      { q: `前後兩年呢？`, a: [f.prev !== null ? `${f.prev} 年是 ${toRoman(f.prev)}。` : '', f.next !== null ? `${f.next} 年是 ${toRoman(f.next)}。` : ''].filter(Boolean).join('') },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const ROMAN_UI: L<RomanUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<RomanUI>;
