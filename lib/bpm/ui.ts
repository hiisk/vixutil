/**
 * 딜레이 타임 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "한 박이 60000 ÷ BPM이고 나머지는 그 배수"라는 것
 * 하나다. 딜레이도 리버브도 LFO도 전부 그 값에서 나온다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BpmFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface BpmUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  tempoLabel: string;
  noteLabel: string;
  msLabel: string;
  hzLabel: string;
  beatLabel: string;
  barLabel: string;
  perBarLabel: string;
  noteName: (key: string) => string;

  formulaTitle: string;
  formulaNote: string;
  dottedTitle: string;
  dottedNote: string;
  useTitle: string;
  useNote: string;
  barTitle: string;
  barNote: string;

  tableTitle: string;
  neighbourTitle: string;
  tempoRowTitle: string;
  noteRowTitle: string;

  desc: (f: BpmFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BpmFacts) => string;
  metaDesc: (f: BpmFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BpmFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

type Spec = { [K in keyof BpmUI]: L<BpmUI[K]> };

/** 음표 이름 — 나라마다 부르는 말이 다르다(4분음표 / quarter note / noire) */
const noteKo = pick({ '1': '온음표', '2': '2분음표', '4': '4분음표', '8': '8분음표', '16': '16분음표', '32': '32분음표', '2d': '점2분음표', '4d': '점4분음표', '8d': '점8분음표', '4t': '4분 셋잇단', '8t': '8분 셋잇단', '16t': '16분 셋잇단' });
const noteEn = pick({ '1': 'whole note', '2': 'half note', '4': 'quarter note', '8': 'eighth note', '16': 'sixteenth note', '32': 'thirty-second note', '2d': 'dotted half', '4d': 'dotted quarter', '8d': 'dotted eighth', '4t': 'quarter triplet', '8t': 'eighth triplet', '16t': 'sixteenth triplet' });
const noteEs = pick({ '1': 'redonda', '2': 'blanca', '4': 'negra', '8': 'corchea', '16': 'semicorchea', '32': 'fusa', '2d': 'blanca con puntillo', '4d': 'negra con puntillo', '8d': 'corchea con puntillo', '4t': 'tresillo de negra', '8t': 'tresillo de corchea', '16t': 'tresillo de semicorchea' });
const notePt = pick({ '1': 'semibreve', '2': 'mínima', '4': 'semínima', '8': 'colcheia', '16': 'semicolcheia', '32': 'fusa', '2d': 'mínima pontuada', '4d': 'semínima pontuada', '8d': 'colcheia pontuada', '4t': 'tercina de semínima', '8t': 'tercina de colcheia', '16t': 'tercina de semicolcheia' });
const noteJa = pick({ '1': '全音符', '2': '2分音符', '4': '4分音符', '8': '8分音符', '16': '16分音符', '32': '32分音符', '2d': '付点2分音符', '4d': '付点4分音符', '8d': '付点8分音符', '4t': '4分3連符', '8t': '8分3連符', '16t': '16分3連符' });
const noteDe = pick({ '1': 'Ganze', '2': 'Halbe', '4': 'Viertel', '8': 'Achtel', '16': 'Sechzehntel', '32': 'Zweiunddreißigstel', '2d': 'punktierte Halbe', '4d': 'punktiertes Viertel', '8d': 'punktiertes Achtel', '4t': 'Vierteltriole', '8t': 'Achteltriole', '16t': 'Sechzehnteltriole' });
const noteFr = pick({ '1': 'ronde', '2': 'blanche', '4': 'noire', '8': 'croche', '16': 'double croche', '32': 'triple croche', '2d': 'blanche pointée', '4d': 'noire pointée', '8d': 'croche pointée', '4t': 'triolet de noire', '8t': 'triolet de croche', '16t': 'triolet de double croche' });
const noteHi = pick({ '1': 'पूर्ण स्वर', '2': 'आधा स्वर', '4': 'चौथाई स्वर', '8': 'आठवाँ स्वर', '16': 'सोलहवाँ स्वर', '32': 'बत्तीसवाँ स्वर', '2d': 'बिंदुदार आधा', '4d': 'बिंदुदार चौथाई', '8d': 'बिंदुदार आठवाँ', '4t': 'चौथाई त्रिक', '8t': 'आठवाँ त्रिक', '16t': 'सोलहवाँ त्रिक' });
const noteZh = pick({ '1': '全音符', '2': '二分音符', '4': '四分音符', '8': '八分音符', '16': '十六分音符', '32': '三十二分音符', '2d': '附点二分音符', '4d': '附点四分音符', '8d': '附点八分音符', '4t': '四分三连音', '8t': '八分三连音', '16t': '十六分三连音' });
const noteTw = pick({ '1': '全音符', '2': '二分音符', '4': '四分音符', '8': '八分音符', '16': '十六分音符', '32': '三十二分音符', '2d': '附點二分音符', '4d': '附點四分音符', '8d': '附點八分音符', '4t': '四分三連音', '8t': '八分三連音', '16t': '十六分三連音' });

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('딜레이 타임', 'Delay time', 'Tiempo de delay', 'Tempo de delay', 'ディレイタイム', 'Delay-Zeit', 'Temps de delay', 'डिले टाइम', '延迟时间', '延遲時間'),

  noteName: T<(key: string) => string>(noteKo, noteEn, noteEs, notePt, noteJa, noteDe, noteFr, noteHi, noteZh, noteTw),

  hubTitle: T(
    '딜레이 타임 288칸 — 120BPM 점8분음표는 375ms',
    '288 delay times — a dotted eighth at 120 BPM is 375 ms',
    '288 tiempos de delay — una corchea con puntillo a 120 BPM son 375 ms',
    '288 tempos de delay — uma colcheia pontuada a 120 BPM dá 375 ms',
    'ディレイタイム288マス — 120BPMの付点8分音符は375ms',
    '288 Delay-Zeiten — ein punktiertes Achtel bei 120 BPM sind 375 ms',
    '288 temps de delay — une croche pointée à 120 BPM fait 375 ms',
    '288 डिले टाइम — 120 BPM पर बिंदुदार आठवाँ स्वर 375 ms',
    '288 个延迟时间 — 120 BPM 的附点八分音符是 375 毫秒',
    '288 個延遲時間 — 120 BPM 的附點八分音符是 375 毫秒',
  ),

  hubLead: T(
    '템포 24가지와 음표 길이 12가지가 만나는 칸마다 밀리초를 계산했습니다. 한 박이 60000 ÷ BPM이고 나머지는 그 배수라, 딜레이도 리버브도 LFO도 전부 이 한 값에서 나옵니다.',
    'Every pairing of 24 tempos and 12 note lengths, worked out in milliseconds. One beat is 60,000 divided by the tempo and every other length is a multiple of it, so delay, reverb and LFO all come from that single number.',
    'Cada cruce de 24 tempos y 12 figuras, resuelto en milisegundos. Un pulso son 60.000 divididos por el tempo y las demás figuras son múltiplos suyos, así que el delay, la reverb y el LFO salen todos de ese único número.',
    'Cada cruzamento de 24 andamentos e 12 figuras, resolvido em milissegundos. Um tempo é 60.000 dividido pelo andamento e as outras figuras são múltiplos dele, então delay, reverb e LFO saem todos desse único número.',
    'テンポ24通りと音符の長さ12通りが交わるマスごとに、ミリ秒を計算しました。1拍が60000÷BPMで残りはその倍数なので、ディレイもリバーブもLFOも全部この一つの値から出ます。',
    'Jede Paarung aus 24 Tempi und 12 Notenwerten, ausgerechnet in Millisekunden. Ein Schlag ist 60.000 geteilt durch das Tempo, alle anderen Werte sind Vielfache davon — Delay, Hall und LFO kommen alle aus dieser einen Zahl.',
    'Chaque croisement de 24 tempos et 12 valeurs de note, calculé en millisecondes. Un temps vaut 60 000 divisé par le tempo et toutes les autres valeurs en sont des multiples : delay, réverbe et LFO sortent tous de ce seul nombre.',
    '24 टेम्पो और 12 स्वर-लंबाइयों के हर जोड़ पर मिलीसेकंड निकाले गए हैं। एक बीट 60,000 बटा BPM है और बाकी सब उसके गुणज, इसलिए डिले, रिवर्ब और LFO सब उसी एक संख्या से आते हैं।',
    '24 种速度与 12 种音符时值相交的每一格，都算出了毫秒数。一拍是 60000 除以 BPM，其余都是它的倍数，所以延迟、混响和 LFO 全都出自这一个数。',
    '24 種速度與 12 種音符時值相交的每一格，都算出了毫秒數。一拍是 60000 除以 BPM，其餘都是它的倍數，所以延遲、殘響和 LFO 全都出自這一個數。',
  ),

  tempoLabel: T('템포', 'Tempo', 'Tempo', 'Andamento', 'テンポ', 'Tempo', 'Tempo', 'टेम्पो', '速度', '速度'),
  noteLabel: T('음표', 'Note', 'Figura', 'Figura', '音符', 'Notenwert', 'Valeur', 'स्वर', '音符', '音符'),
  msLabel: T('길이', 'Length', 'Duración', 'Duração', '長さ', 'Länge', 'Durée', 'लंबाई', '时长', '時長'),
  hzLabel: T('진동수', 'Frequency', 'Frecuencia', 'Frequência', '周波数', 'Frequenz', 'Fréquence', 'आवृत्ति', '频率', '頻率'),
  beatLabel: T('한 박', 'One beat', 'Un pulso', 'Um tempo', '1拍', 'Ein Schlag', 'Un temps', 'एक बीट', '一拍', '一拍'),
  barLabel: T('한 마디', 'One bar', 'Un compás', 'Um compasso', '1小節', 'Ein Takt', 'Une mesure', 'एक बार', '一小节', '一小節'),
  perBarLabel: T('한 마디에', 'Per bar', 'Por compás', 'Por compasso', '1小節に', 'Je Takt', 'Par mesure', 'प्रति बार', '每小节', '每小節'),

  formulaTitle: T('한 박은 60000 나누기 BPM', 'One beat is 60,000 over the tempo', 'Un pulso son 60.000 entre el tempo', 'Um tempo é 60.000 sobre o andamento', '1拍は60000÷BPM', 'Ein Schlag ist 60.000 durch das Tempo', 'Un temps vaut 60 000 sur le tempo', 'एक बीट यानी 60,000 बटा BPM', '一拍是 60000 除以 BPM', '一拍是 60000 除以 BPM'),
  formulaNote: T(
    'BPM은 1분에 들어가는 박의 수이고 1분은 60,000밀리초입니다. 그래서 한 박은 60000을 BPM으로 나눈 값이고, 8분음표는 그 절반, 16분음표는 4분의 1입니다. 120BPM이면 한 박이 딱 500ms라 셈이 눈에 보입니다.',
    'BPM counts beats in a minute and a minute is 60,000 milliseconds, so one beat is 60,000 divided by the tempo. An eighth is half of that, a sixteenth a quarter. At 120 BPM a beat lands on exactly 500 ms, which makes the arithmetic easy to see.',
    'El BPM cuenta pulsos por minuto y un minuto son 60.000 milisegundos, así que un pulso es 60.000 entre el tempo. La corchea es la mitad y la semicorchea la cuarta parte. A 120 BPM el pulso cae en 500 ms justos, lo que deja la cuenta a la vista.',
    'O BPM conta tempos por minuto e um minuto tem 60.000 milissegundos, então um tempo é 60.000 dividido pelo andamento. A colcheia é metade e a semicolcheia um quarto. A 120 BPM o tempo cai em 500 ms exatos, o que deixa a conta à vista.',
    'BPMは1分に入る拍の数で、1分は60,000ミリ秒です。だから1拍は60000をBPMで割った値で、8分音符はその半分、16分音符は4分の1です。120BPMなら1拍がちょうど500msなので計算が目に見えます。',
    'BPM zählt Schläge je Minute, und eine Minute hat 60.000 Millisekunden — ein Schlag ist also 60.000 geteilt durch das Tempo. Ein Achtel ist die Hälfte, ein Sechzehntel ein Viertel davon. Bei 120 BPM liegt ein Schlag auf genau 500 ms, da sieht man die Rechnung.',
    'Le BPM compte les temps par minute et une minute fait 60 000 millisecondes : un temps vaut donc 60 000 divisé par le tempo. La croche en est la moitié, la double croche le quart. À 120 BPM, un temps tombe pile sur 500 ms, ce qui rend le calcul visible.',
    'BPM एक मिनट में बीट गिनता है और एक मिनट 60,000 मिलीसेकंड का होता है, इसलिए एक बीट 60,000 बटा टेम्पो है। आठवाँ स्वर उसका आधा और सोलहवाँ चौथाई। 120 BPM पर एक बीट ठीक 500 ms पर आता है, जिससे गणित सामने दिख जाता है।',
    'BPM 数的是一分钟里的拍数，而一分钟是 60,000 毫秒，所以一拍就是 60000 除以 BPM。八分音符是它的一半，十六分音符是四分之一。120 BPM 时一拍正好 500 毫秒，算式一眼可见。',
    'BPM 數的是一分鐘裡的拍數，而一分鐘是 60,000 毫秒，所以一拍就是 60000 除以 BPM。八分音符是它的一半，十六分音符是四分之一。120 BPM 時一拍正好 500 毫秒，算式一眼可見。',
  ),

  dottedTitle: T('점음표는 1.5배, 셋잇단은 3분의 2', 'Dotted is 1.5×, triplet is two thirds', 'El puntillo es 1,5× y el tresillo dos tercios', 'O ponto é 1,5× e a tercina dois terços', '付点は1.5倍、3連符は3分の2', 'Punktiert ist 1,5×, Triole zwei Drittel', 'Pointée vaut 1,5×, triolet deux tiers', 'बिंदु 1.5 गुना, त्रिक दो-तिहाई', '附点是 1.5 倍，三连音是三分之二', '附點是 1.5 倍，三連音是三分之二'),
  dottedNote: T(
    '점은 원래 길이의 절반을 더한다는 뜻이라 1.5배가 되고, 셋잇단은 두 박에 셋을 넣는 것이라 3분의 2가 됩니다. 이 둘이 있어야 딜레이가 곡에 붙습니다 — 점8분음표 딜레이는 기타에서 가장 많이 쓰는 설정이고, 8분음표 딜레이와 겹치면 특유의 리듬이 생깁니다.',
    'A dot adds half the note back, making it 1.5×, and a triplet fits three in the space of two, making it two thirds. Both matter for delay: a dotted-eighth delay is the setting guitarists reach for most, and layering it against a straight eighth is what creates that rolling pattern.',
    'El puntillo suma la mitad del valor, de ahí el 1,5×, y el tresillo mete tres donde caben dos, de ahí los dos tercios. Ambos importan en el delay: la corchea con puntillo es el ajuste que más usan los guitarristas, y superponerla a la corchea recta crea ese patrón rodante.',
    'O ponto soma metade do valor, dando 1,5×, e a tercina encaixa três no espaço de duas, dando dois terços. Ambos importam no delay: a colcheia pontuada é o ajuste mais usado por guitarristas, e sobrepô-la à colcheia reta cria aquele padrão rolante.',
    '付点は元の長さの半分を足すという意味なので1.5倍になり、3連符は2拍に3つ入れるので3分の2になります。この2つがあってこそディレイが曲に馴染みます。付点8分ディレイはギターで最もよく使う設定で、8分ディレイと重ねるとあの転がるリズムが生まれます。',
    'Der Punkt hängt die halbe Notenlänge an, macht also 1,5×, und die Triole setzt drei in den Raum von zwei, also zwei Drittel. Beides zählt beim Delay: das punktierte Achtel ist die Lieblingseinstellung an der Gitarre, und über ein gerades Achtel gelegt entsteht daraus dieses rollende Muster.',
    'Le point rajoute la moitié de la valeur, d’où 1,5×, et le triolet en place trois là où il en tient deux, d’où les deux tiers. Les deux comptent pour le delay : la croche pointée est le réglage préféré des guitaristes, et superposée à une croche droite elle crée ce motif roulant.',
    'बिंदु मूल लंबाई का आधा जोड़ देता है, इसलिए 1.5 गुना; और त्रिक दो की जगह तीन बिठाता है, इसलिए दो-तिहाई। डिले के लिए दोनों ज़रूरी हैं — बिंदुदार आठवाँ डिले गिटार पर सबसे ज़्यादा इस्तेमाल होता है, और सीधे आठवें के साथ मिलाने पर वही लुढ़कती लय बनती है।',
    '附点表示加上原时值的一半，所以是 1.5 倍；三连音是在两拍的位置放三个，所以是三分之二。这两个对延迟很关键 — 附点八分延迟是吉他手最常用的设置，与正八分叠在一起就produces那种滚动的律动。',
    '附點表示加上原時值的一半，所以是 1.5 倍；三連音是在兩拍的位置放三個，所以是三分之二。這兩個對延遲很關鍵 — 附點八分延遲是吉他手最常用的設置，與正八分疊在一起就會產生那種滾動的律動。',
  ),

  useTitle: T('리버브와 LFO에도 같은 수를 쓴다', 'Reverb and LFO use the same number', 'La reverb y el LFO usan el mismo número', 'A reverb e o LFO usam o mesmo número', 'リバーブとLFOにも同じ数を使う', 'Hall und LFO nutzen dieselbe Zahl', 'Réverbe et LFO utilisent le même nombre', 'रिवर्ब और LFO भी वही संख्या लेते हैं', '混响和 LFO 也用同一个数', '殘響和 LFO 也用同一個數'),
  useNote: T(
    '리버브의 프리딜레이와 감쇠 시간을 이 값에 맞추면 잔향이 박자 위에 떨어지고, LFO는 밀리초 대신 진동수로 넣는 일이 많아 1000을 그 길이로 나눈 값을 함께 냈습니다. 트레몰로나 오토팬을 8분음표에 맞추려면 그 진동수를 쓰면 됩니다.',
    'Set a reverb’s pre-delay and decay to these figures and the tail lands on the beat. LFOs are often dialled in hertz rather than milliseconds, so the table also gives 1,000 divided by the length — that is the rate to use for a tremolo or auto-pan locked to eighth notes.',
    'Ajusta el pre-delay y la caída de una reverb a estas cifras y la cola cae sobre el pulso. Los LFO suelen marcarse en hercios y no en milisegundos, así que la tabla da también 1.000 entre la duración: esa es la velocidad para un trémolo o un auto-pan atado a corcheas.',
    'Ajuste o pre-delay e o decaimento de uma reverb a estes números e a cauda cai no tempo. LFOs costumam ser ajustados em hertz e não em milissegundos, então a tabela também dá 1.000 dividido pela duração — é essa a taxa para um tremolo ou auto-pan preso às colcheias.',
    'リバーブのプリディレイと減衰をこの値に合わせると残響が拍の上に落ちます。LFOはミリ秒ではなく周波数で入れることが多いので、1000をその長さで割った値も一緒に出しました。トレモロやオートパンを8分音符に合わせるにはその周波数を使います。',
    'Stellt man Pre-Delay und Abklingzeit eines Halls auf diese Werte, fällt die Fahne auf den Schlag. LFOs werden oft in Hertz statt Millisekunden eingestellt, deshalb steht auch 1.000 geteilt durch die Länge dabei — das ist die Rate für ein Tremolo oder Auto-Pan im Achtelraster.',
    'Réglez le pre-delay et la décroissance d’une réverbe sur ces valeurs et la queue tombe sur le temps. Les LFO se règlent souvent en hertz plutôt qu’en millisecondes : le tableau donne donc aussi 1 000 divisé par la durée, la vitesse à utiliser pour un trémolo ou un auto-pan calé sur les croches.',
    'रिवर्ब का प्री-डिले और डिके इन आँकड़ों पर सेट करें तो पूँछ बीट पर गिरती है। LFO अक्सर मिलीसेकंड की जगह हर्ट्ज़ में सेट होते हैं, इसलिए तालिका 1,000 बटा लंबाई भी देती है — आठवें स्वर से बँधे ट्रेमोलो या ऑटो-पैन के लिए वही दर चाहिए।',
    '把混响的预延迟和衰减设成这些数值，尾音就会落在拍点上。LFO 常用赫兹而不是毫秒来设置，所以表里也给出了 1000 除以时长的值 — 想让颤音或自动声像对齐八分音符，用的就是那个频率。',
    '把殘響的預延遲和衰減設成這些數值，尾音就會落在拍點上。LFO 常用赫茲而不是毫秒來設置，所以表裡也給出了 1000 除以時長的值 — 想讓顫音或自動聲像對齊八分音符，用的就是那個頻率。',
  ),

  barTitle: T('한 마디는 4분음표 넷', 'A bar is four quarter notes', 'Un compás son cuatro negras', 'Um compasso são quatro semínimas', '1小節は4分音符4つ', 'Ein Takt sind vier Viertel', 'Une mesure vaut quatre noires', 'एक बार यानी चार चौथाई स्वर', '一小节是四个四分音符', '一小節是四個四分音符'),
  barNote: T(
    '4/4박자를 기준으로 삼았습니다. 3/4이나 6/8을 쓴다면 한 마디 길이만 그 박자에 맞춰 다시 세면 되고, 음표 하나하나의 밀리초는 그대로입니다 — 박자표는 마디를 나누는 방식이지 박의 길이를 바꾸는 것이 아니기 때문입니다.',
    'The bar figures assume 4/4. In 3/4 or 6/8 only the bar length changes; every individual note keeps the same millisecond value, because a time signature groups beats rather than resizing them.',
    'Las cifras de compás suponen 4/4. En 3/4 o 6/8 solo cambia la duración del compás: cada figura conserva sus milisegundos, porque el compás agrupa pulsos en vez de cambiar su tamaño.',
    'Os números de compasso supõem 4/4. Em 3/4 ou 6/8 muda só a duração do compasso: cada figura mantém seus milissegundos, porque a fórmula de compasso agrupa tempos em vez de redimensioná-los.',
    '4/4拍子を基準にしています。3/4や6/8なら1小節の長さだけ数え直せばよく、音符ひとつひとつのミリ秒は変わりません。拍子記号は小節の区切り方であって、拍の長さを変えるものではないからです。',
    'Die Taktwerte gelten für 4/4. In 3/4 oder 6/8 ändert sich nur die Taktlänge; jeder einzelne Notenwert behält seine Millisekunden, denn eine Taktart gruppiert Schläge, statt sie zu verlängern.',
    'Les valeurs de mesure supposent du 4/4. En 3/4 ou 6/8, seule la longueur de la mesure change : chaque valeur de note garde ses millisecondes, car une signature groupe les temps au lieu de les redimensionner.',
    'बार के आँकड़े 4/4 मानकर हैं। 3/4 या 6/8 में सिर्फ़ बार की लंबाई बदलती है; हर स्वर के मिलीसेकंड वही रहते हैं, क्योंकि ताल-चिह्न बीट को समूह में बाँटता है, उनका आकार नहीं बदलता।',
    '小节数值按 4/4 拍计算。若用 3/4 或 6/8，只有小节长度要重算，每个音符的毫秒数不变 — 拍号是划分小节的方式，并不改变每一拍的长短。',
    '小節數值按 4/4 拍計算。若用 3/4 或 6/8，只有小節長度要重算，每個音符的毫秒數不變 — 拍號是劃分小節的方式，並不改變每一拍的長短。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के मामले', '相邻组合', '相鄰組合'),
  tempoRowTitle: T('같은 템포의 다른 음표', 'Same tempo, other notes', 'Mismo tempo, otras figuras', 'Mesmo andamento, outras figuras', '同じテンポの他の音符', 'Gleiches Tempo, andere Werte', 'Même tempo, autres valeurs', 'वही टेम्पो, दूसरे स्वर', '同一速度的其他音符', '同一速度的其他音符'),
  noteRowTitle: T('같은 음표의 다른 템포', 'Same note, other tempos', 'Misma figura, otros tempos', 'Mesma figura, outros andamentos', '同じ音符の他のテンポ', 'Gleicher Wert, andere Tempi', 'Même valeur, autres tempos', 'वही स्वर, दूसरे टेम्पो', '同一音符的其他速度', '同一音符的其他速度'),

  desc: T<(f: BpmFacts) => string>(
    f => `${f.cell.bpm}BPM에서 ${noteKo(f.cell.note)}는 ${f.ms}ms입니다. 한 박이 ${f.beatMs}ms이고 한 마디는 ${f.barMs}ms입니다.`,
    f => `At ${f.cell.bpm} BPM a ${noteEn(f.cell.note)} lasts ${f.ms} ms. One beat is ${f.beatMs} ms and a bar is ${f.barMs} ms.`,
    f => `A ${f.cell.bpm} BPM una ${noteEs(f.cell.note)} dura ${f.ms} ms. Un pulso son ${f.beatMs} ms y un compás ${f.barMs} ms.`,
    f => `A ${f.cell.bpm} BPM uma ${notePt(f.cell.note)} dura ${f.ms} ms. Um tempo são ${f.beatMs} ms e um compasso ${f.barMs} ms.`,
    f => `${f.cell.bpm}BPMで${noteJa(f.cell.note)}は${f.ms}msです。1拍が${f.beatMs}ms、1小節は${f.barMs}msです。`,
    f => `Bei ${f.cell.bpm} BPM dauert eine ${noteDe(f.cell.note)} ${f.ms} ms. Ein Schlag sind ${f.beatMs} ms, ein Takt ${f.barMs} ms.`,
    f => `À ${f.cell.bpm} BPM, une ${noteFr(f.cell.note)} dure ${f.ms} ms. Un temps vaut ${f.beatMs} ms et une mesure ${f.barMs} ms.`,
    f => `${f.cell.bpm} BPM पर ${noteHi(f.cell.note)} ${f.ms} ms का होता है। एक बीट ${f.beatMs} ms और एक बार ${f.barMs} ms।`,
    f => `${f.cell.bpm} BPM 时，${noteZh(f.cell.note)}为 ${f.ms} 毫秒。一拍 ${f.beatMs} 毫秒，一小节 ${f.barMs} 毫秒。`,
    f => `${f.cell.bpm} BPM 時，${noteTw(f.cell.note)}為 ${f.ms} 毫秒。一拍 ${f.beatMs} 毫秒，一小節 ${f.barMs} 毫秒。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '한 박은 60000 ÷ BPM 밀리초이고 나머지 음표는 그 배수입니다.',
      '점음표는 1.5배, 셋잇단음표는 3분의 2입니다.',
      'LFO는 밀리초 대신 진동수로 넣는 일이 많아 함께 적었습니다.',
      '한 마디 값은 4/4박자 기준입니다.',
    ],
    [
      'One beat is 60,000 divided by the tempo; every other note is a multiple of it.',
      'A dot adds half the value back; a triplet is two thirds.',
      'LFOs are often set in hertz rather than milliseconds, so that figure is here too.',
      'The bar figures assume a 4/4 time signature.',
    ],
    [
      'Un pulso son 60.000 entre el tempo; las demás figuras son múltiplos suyos.',
      'El puntillo suma la mitad del valor; el tresillo son dos tercios.',
      'Los LFO suelen ajustarse en hercios y no en milisegundos, así que también está.',
      'Las cifras de compás suponen 4/4.',
    ],
    [
      'Um tempo é 60.000 dividido pelo andamento; as outras figuras são múltiplos dele.',
      'O ponto soma metade do valor; a tercina são dois terços.',
      'LFOs costumam ser ajustados em hertz e não em milissegundos, então isso também está aqui.',
      'Os números de compasso supõem 4/4.',
    ],
    [
      '1拍は60000÷BPMミリ秒で、他の音符はその倍数です。',
      '付点は1.5倍、3連符は3分の2です。',
      'LFOはミリ秒でなく周波数で入れることが多いので併記しました。',
      '1小節の値は4/4拍子が前提です。',
    ],
    [
      'Ein Schlag ist 60.000 geteilt durch das Tempo; alle anderen Werte sind Vielfache davon.',
      'Der Punkt hängt die halbe Länge an, die Triole ergibt zwei Drittel.',
      'LFOs werden oft in Hertz statt Millisekunden gesetzt, deshalb steht das mit dabei.',
      'Die Taktwerte setzen einen 4/4-Takt voraus.',
    ],
    [
      'Un temps vaut 60 000 divisé par le tempo ; les autres valeurs en sont des multiples.',
      'Le point rajoute la moitié de la valeur ; le triolet en fait les deux tiers.',
      'Les LFO se règlent souvent en hertz plutôt qu’en millisecondes, d’où cette colonne.',
      'Les valeurs de mesure supposent une signature en 4/4.',
    ],
    [
      'एक बीट 60,000 बटा टेम्पो मिलीसेकंड है; बाकी स्वर उसके गुणज हैं।',
      'बिंदु आधी लंबाई जोड़ता है; त्रिक दो-तिहाई होता है।',
      'LFO अक्सर मिलीसेकंड की जगह हर्ट्ज़ में सेट होते हैं, इसलिए वह भी दिया है।',
      'बार के आँकड़े 4/4 ताल मानकर हैं।',
    ],
    [
      '一拍是 60000 除以 BPM 毫秒，其余音符都是它的倍数。',
      '附点加上原时值的一半，三连音是三分之二。',
      'LFO 常用赫兹而非毫秒设置，所以一并列出。',
      '小节数值以 4/4 拍为准。',
    ],
    [
      '一拍是 60000 除以 BPM 毫秒，其餘音符都是它的倍數。',
      '附點加上原時值的一半，三連音是三分之二。',
      'LFO 常用赫茲而非毫秒設置，所以一併列出。',
      '小節數值以 4/4 拍為準。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '딜레이 타임표 288칸 — BPM별 음표 길이(ms)',
    'Delay time chart — note lengths in ms by tempo',
    'Tabla de tiempos de delay — figuras en ms por tempo',
    'Tabela de tempos de delay — figuras em ms por andamento',
    'ディレイタイム表288マス — BPM別の音符の長さ(ms)',
    'Delay-Zeit-Tabelle — Notenwerte in ms nach Tempo',
    'Table des temps de delay — valeurs en ms par tempo',
    'डिले टाइम तालिका — टेम्पो के अनुसार स्वर लंबाई (ms)',
    '延迟时间表 288 格 — 按 BPM 的音符时长（毫秒）',
    '延遲時間表 288 格 — 按 BPM 的音符時長（毫秒）',
  ),
  hubMetaDesc: T(
    '템포 24가지와 음표 12가지가 만나는 288칸. 밀리초와 진동수, 한 박과 한 마디 길이를 함께 봅니다. 점음표와 셋잇단음표도 들어 있습니다.',
    'The 288 pairings of 24 tempos and 12 note values: milliseconds, the matching LFO frequency, and the length of one beat and one bar. Dotted and triplet values are included.',
    'Las 288 combinaciones de 24 tempos y 12 figuras: milisegundos, la frecuencia de LFO correspondiente y la duración de un pulso y un compás. Incluye puntillos y tresillos.',
    'As 288 combinações de 24 andamentos e 12 figuras: milissegundos, a frequência de LFO correspondente e a duração de um tempo e um compasso. Inclui pontuadas e tercinas.',
    'テンポ24通りと音符12通りが交わる288マス。ミリ秒と周波数、1拍と1小節の長さをまとめて見ます。付点と3連符も入っています。',
    'Die 288 Paarungen aus 24 Tempi und 12 Notenwerten: Millisekunden, die passende LFO-Frequenz sowie die Länge von Schlag und Takt. Punktierte Werte und Triolen sind dabei.',
    'Les 288 croisements de 24 tempos et 12 valeurs : millisecondes, fréquence de LFO correspondante, durée d’un temps et d’une mesure. Pointées et triolets compris.',
    '24 टेम्पो और 12 स्वर-मानों के 288 जोड़: मिलीसेकंड, मेल खाती LFO आवृत्ति, और एक बीट व एक बार की लंबाई। बिंदुदार और त्रिक भी शामिल।',
    '24 种速度与 12 种音符时值组成的 288 格：毫秒数、对应的 LFO 频率，以及一拍和一小节的长度。含附点与三连音。',
    '24 種速度與 12 種音符時值組成的 288 格：毫秒數、對應的 LFO 頻率，以及一拍和一小節的長度。含附點與三連音。',
  ),

  metaTitle: T<(f: BpmFacts) => string>(
    f => `${f.cell.bpm}BPM ${noteKo(f.cell.note)} — ${f.ms}ms`,
    f => `${f.cell.bpm} BPM ${noteEn(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm} BPM ${noteEs(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm} BPM ${notePt(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm}BPM ${noteJa(f.cell.note)} — ${f.ms}ms`,
    f => `${f.cell.bpm} BPM ${noteDe(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm} BPM ${noteFr(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm} BPM ${noteHi(f.cell.note)} — ${f.ms} ms`,
    f => `${f.cell.bpm} BPM ${noteZh(f.cell.note)} — ${f.ms} 毫秒`,
    f => `${f.cell.bpm} BPM ${noteTw(f.cell.note)} — ${f.ms} 毫秒`,
  ),

  metaDesc: T<(f: BpmFacts) => string>(
    f => `${f.cell.bpm}BPM에서 ${noteKo(f.cell.note)}는 ${f.ms}ms입니다. LFO에 넣을 진동수는 ${f.hz}Hz이고, 한 박 ${f.beatMs}ms·한 마디 ${f.barMs}ms입니다.`,
    f => `At ${f.cell.bpm} BPM a ${noteEn(f.cell.note)} lasts ${f.ms} ms, which is ${f.hz} Hz for an LFO. One beat is ${f.beatMs} ms and a bar is ${f.barMs} ms.`,
    f => `A ${f.cell.bpm} BPM una ${noteEs(f.cell.note)} dura ${f.ms} ms, o ${f.hz} Hz para un LFO. Un pulso son ${f.beatMs} ms y un compás ${f.barMs} ms.`,
    f => `A ${f.cell.bpm} BPM uma ${notePt(f.cell.note)} dura ${f.ms} ms, ou ${f.hz} Hz para um LFO. Um tempo são ${f.beatMs} ms e um compasso ${f.barMs} ms.`,
    f => `${f.cell.bpm}BPMで${noteJa(f.cell.note)}は${f.ms}ms、LFOに入れる周波数は${f.hz}Hzです。1拍${f.beatMs}ms、1小節${f.barMs}msです。`,
    f => `Bei ${f.cell.bpm} BPM dauert eine ${noteDe(f.cell.note)} ${f.ms} ms, für einen LFO ${f.hz} Hz. Ein Schlag sind ${f.beatMs} ms, ein Takt ${f.barMs} ms.`,
    f => `À ${f.cell.bpm} BPM, une ${noteFr(f.cell.note)} dure ${f.ms} ms, soit ${f.hz} Hz pour un LFO. Un temps vaut ${f.beatMs} ms et une mesure ${f.barMs} ms.`,
    f => `${f.cell.bpm} BPM पर ${noteHi(f.cell.note)} ${f.ms} ms का होता है, LFO के लिए ${f.hz} Hz। एक बीट ${f.beatMs} ms और एक बार ${f.barMs} ms।`,
    f => `${f.cell.bpm} BPM 时，${noteZh(f.cell.note)}为 ${f.ms} 毫秒，用于 LFO 是 ${f.hz} 赫兹。一拍 ${f.beatMs} 毫秒，一小节 ${f.barMs} 毫秒。`,
    f => `${f.cell.bpm} BPM 時，${noteTw(f.cell.note)}為 ${f.ms} 毫秒，用於 LFO 是 ${f.hz} 赫茲。一拍 ${f.beatMs} 毫秒，一小節 ${f.barMs} 毫秒。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '딜레이 타임은 어떻게 계산하나요?', a: '60000을 BPM으로 나누면 4분음표 한 박이 나오고, 8분음표는 그 절반, 16분음표는 4분의 1입니다. 120BPM이면 한 박이 500ms, 8분음표가 250ms입니다.' },
      { q: '점8분음표 딜레이가 왜 인기가 많나요?', a: '8분음표 딜레이와 어긋나면서도 박에 맞아 떨어져, 겹치면 원래 없던 리듬이 생기기 때문입니다. 점8분은 8분의 1.5배라 세 번 울리면 정확히 한 마디의 절반을 채웁니다.' },
      { q: '리버브에도 이 값을 쓰나요?', a: '프리딜레이와 감쇠 시간에 씁니다. 잔향이 다음 박에 걸리지 않게 맞추면 소리가 훨씬 깔끔해집니다.' },
      { q: 'LFO는 왜 진동수로 나오나요?', a: '많은 기기가 LFO 속도를 밀리초가 아니라 헤르츠로 받기 때문입니다. 1000을 밀리초로 나누면 그 값이 되고, 표에 함께 적어 두었습니다.' },
      { q: '박자표가 3/4이면 달라지나요?', a: '한 마디 길이만 달라지고 음표 하나하나의 밀리초는 그대로입니다. 박자표는 마디를 나누는 방식이지 박의 길이를 바꾸지 않습니다.' },
    ],
    [
      { q: 'How do I work out a delay time?', a: 'Divide 60,000 by the tempo for a quarter note; an eighth is half of that and a sixteenth a quarter. At 120 BPM a beat is 500 ms and an eighth 250 ms.' },
      { q: 'Why is dotted-eighth delay so popular?', a: 'It sits against a straight eighth while still locking to the beat, so layering the two creates a rhythm that was not played. A dotted eighth is 1.5 times an eighth, so three repeats fill exactly half a bar.' },
      { q: 'Do these numbers work for reverb?', a: 'Yes, for pre-delay and decay. Tuning the tail so it stops before the next beat keeps a mix much cleaner.' },
      { q: 'Why give an LFO frequency?', a: 'Because many devices take LFO rate in hertz rather than milliseconds. Divide 1,000 by the length and you have it — the table lists it alongside.' },
      { q: 'Does a 3/4 time signature change this?', a: 'Only the bar length changes; each note keeps the same millisecond value. A time signature groups beats rather than resizing them.' },
    ],
    [
      { q: '¿Cómo se calcula un tiempo de delay?', a: 'Divide 60.000 entre el tempo para la negra; la corchea es la mitad y la semicorchea la cuarta parte. A 120 BPM el pulso son 500 ms y la corchea 250 ms.' },
      { q: '¿Por qué gusta tanto el delay de corchea con puntillo?', a: 'Va a contrapelo de la corchea recta pero sigue cuadrando con el pulso, así que superponerlos crea un ritmo que nadie tocó. La corchea con puntillo es 1,5 veces la corchea, así que tres repeticiones llenan medio compás exacto.' },
      { q: '¿Sirven estas cifras para la reverb?', a: 'Sí, para el pre-delay y la caída. Ajustar la cola para que acabe antes del siguiente pulso deja la mezcla mucho más limpia.' },
      { q: '¿Por qué dais una frecuencia de LFO?', a: 'Porque muchos aparatos piden la velocidad del LFO en hercios y no en milisegundos. Divide 1.000 entre la duración y ya lo tienes; la tabla lo incluye al lado.' },
      { q: '¿Cambia algo en 3/4?', a: 'Solo la duración del compás; cada figura conserva sus milisegundos. El compás agrupa pulsos, no los alarga.' },
    ],
    [
      { q: 'Como calculo um tempo de delay?', a: 'Divida 60.000 pelo andamento para a semínima; a colcheia é metade e a semicolcheia um quarto. A 120 BPM o tempo é 500 ms e a colcheia 250 ms.' },
      { q: 'Por que o delay de colcheia pontuada é tão usado?', a: 'Ele corre contra a colcheia reta e ainda assim cai no tempo, então sobrepor os dois cria um ritmo que ninguém tocou. A colcheia pontuada é 1,5 vez a colcheia, então três repetições preenchem exatamente meio compasso.' },
      { q: 'Esses números servem para reverb?', a: 'Sim, para pre-delay e decaimento. Ajustar a cauda para acabar antes do próximo tempo deixa a mixagem bem mais limpa.' },
      { q: 'Por que dar uma frequência de LFO?', a: 'Porque muitos aparelhos pedem a taxa do LFO em hertz e não em milissegundos. Divida 1.000 pela duração e pronto — a tabela traz isso ao lado.' },
      { q: 'Muda algo em 3/4?', a: 'Só a duração do compasso; cada figura mantém seus milissegundos. A fórmula de compasso agrupa tempos, não os estica.' },
    ],
    [
      { q: 'ディレイタイムはどう計算しますか。', a: '60000をBPMで割ると4分音符1拍が出て、8分音符はその半分、16分音符は4分の1です。120BPMなら1拍が500ms、8分音符が250msです。' },
      { q: '付点8分ディレイはなぜ人気ですか。', a: '8分音符とずれながらも拍に合うので、重ねると弾いていないリズムが生まれるからです。付点8分は8分の1.5倍なので、3回鳴ればちょうど1小節の半分を埋めます。' },
      { q: 'リバーブにもこの値を使いますか。', a: 'プリディレイと減衰時間に使います。残響が次の拍にかからないように合わせると音がずっと整理されます。' },
      { q: 'なぜ周波数も出しているのですか。', a: '多くの機材がLFOの速さをミリ秒ではなくヘルツで受けるからです。1000をミリ秒で割ればその値になり、表に併記しています。' },
      { q: '3/4拍子だと変わりますか。', a: '1小節の長さだけ変わり、音符ひとつひとつのミリ秒は同じです。拍子記号は小節の区切り方であって拍の長さを変えません。' },
    ],
    [
      { q: 'Wie berechne ich eine Delay-Zeit?', a: '60.000 durch das Tempo teilen ergibt das Viertel; das Achtel ist die Hälfte, das Sechzehntel ein Viertel davon. Bei 120 BPM sind das 500 ms je Schlag und 250 ms je Achtel.' },
      { q: 'Warum ist punktiertes Achtel-Delay so beliebt?', a: 'Es läuft gegen das gerade Achtel und trifft trotzdem den Schlag, sodass beide übereinander ein Muster ergeben, das niemand gespielt hat. Ein punktiertes Achtel ist das 1,5-Fache eines Achtels — drei Wiederholungen füllen genau einen halben Takt.' },
      { q: 'Gelten die Werte auch für Hall?', a: 'Ja, für Pre-Delay und Abklingzeit. Wenn die Fahne vor dem nächsten Schlag endet, bleibt die Mischung deutlich klarer.' },
      { q: 'Warum steht eine LFO-Frequenz dabei?', a: 'Weil viele Geräte die LFO-Rate in Hertz statt Millisekunden erwarten. 1.000 durch die Länge geteilt ergibt sie — die Tabelle führt sie gleich mit.' },
      { q: 'Ändert ein 3/4-Takt etwas?', a: 'Nur die Taktlänge; jeder Notenwert behält seine Millisekunden. Eine Taktart gruppiert Schläge, statt sie zu dehnen.' },
    ],
    [
      { q: 'Comment calculer un temps de delay ?', a: 'Divisez 60 000 par le tempo pour la noire ; la croche en est la moitié et la double croche le quart. À 120 BPM, un temps fait 500 ms et une croche 250 ms.' },
      { q: 'Pourquoi le delay en croche pointée plaît-il tant ?', a: 'Il décale par rapport à la croche droite tout en restant calé sur le temps : superposés, les deux créent un motif que personne n’a joué. Une croche pointée vaut 1,5 croche, donc trois répétitions remplissent exactement une demi-mesure.' },
      { q: 'Ces valeurs servent-elles pour la réverbe ?', a: 'Oui, pour le pre-delay et la décroissance. Régler la queue pour qu’elle s’arrête avant le temps suivant garde un mixage bien plus net.' },
      { q: 'Pourquoi donner une fréquence de LFO ?', a: 'Parce que beaucoup d’appareils demandent la vitesse du LFO en hertz plutôt qu’en millisecondes. Divisez 1 000 par la durée : le tableau l’indique à côté.' },
      { q: 'Une mesure à 3/4 change-t-elle quelque chose ?', a: 'Seule la longueur de la mesure change ; chaque valeur garde ses millisecondes. Une signature groupe les temps sans les allonger.' },
    ],
    [
      { q: 'डिले टाइम कैसे निकालें?', a: '60,000 को टेम्पो से भाग दें तो चौथाई स्वर मिलता है; आठवाँ उसका आधा और सोलहवाँ चौथाई। 120 BPM पर एक बीट 500 ms और आठवाँ 250 ms।' },
      { q: 'बिंदुदार आठवाँ डिले इतना लोकप्रिय क्यों है?', a: 'यह सीधे आठवें से हटकर चलता है फिर भी बीट पर बैठता है, इसलिए दोनों मिलाने पर ऐसी लय बनती है जो बजाई ही नहीं गई। बिंदुदार आठवाँ, आठवें का 1.5 गुना है, तो तीन बार बजने पर ठीक आधा बार भर जाता है।' },
      { q: 'क्या ये आँकड़े रिवर्ब के लिए भी हैं?', a: 'हाँ, प्री-डिले और डिके के लिए। पूँछ अगले बीट से पहले खत्म हो जाए, ऐसा सेट करने से मिक्स कहीं साफ़ रहता है।' },
      { q: 'LFO आवृत्ति क्यों दी है?', a: 'क्योंकि कई उपकरण LFO की दर मिलीसेकंड की जगह हर्ट्ज़ में लेते हैं। 1,000 को लंबाई से भाग दें तो वही मिलता है — तालिका उसे साथ ही देती है।' },
      { q: '3/4 ताल में कुछ बदलता है?', a: 'सिर्फ़ बार की लंबाई; हर स्वर के मिलीसेकंड वही रहते हैं। ताल-चिह्न बीट को समूह में बाँटता है, लंबा नहीं करता।' },
    ],
    [
      { q: '延迟时间怎么算？', a: '用 60000 除以 BPM 得到四分音符一拍，八分音符是它的一半，十六分音符是四分之一。120 BPM 时一拍 500 毫秒，八分音符 250 毫秒。' },
      { q: '为什么附点八分延迟这么常用？', a: '它与正八分错开却仍落在拍上，两者叠在一起就生出没人弹过的节奏。附点八分是八分的 1.5 倍，响三次刚好填满半个小节。' },
      { q: '混响也用这些数值吗？', a: '用于预延迟和衰减。让尾音在下一拍之前结束，混音会干净得多。' },
      { q: '为什么还给出频率？', a: '因为很多设备的 LFO 速率是用赫兹而不是毫秒来设置的。用 1000 除以毫秒数就得到它，表里一并列出。' },
      { q: '3/4 拍会不一样吗？', a: '只有小节长度不同，每个音符的毫秒数不变。拍号是划分小节的方式，并不改变拍的长短。' },
    ],
    [
      { q: '延遲時間怎麼算？', a: '用 60000 除以 BPM 得到四分音符一拍，八分音符是它的一半，十六分音符是四分之一。120 BPM 時一拍 500 毫秒，八分音符 250 毫秒。' },
      { q: '為什麼附點八分延遲這麼常用？', a: '它與正八分錯開卻仍落在拍上，兩者疊在一起就生出沒人彈過的節奏。附點八分是八分的 1.5 倍，響三次剛好填滿半個小節。' },
      { q: '殘響也用這些數值嗎？', a: '用於預延遲和衰減。讓尾音在下一拍之前結束，混音會乾淨得多。' },
      { q: '為什麼還給出頻率？', a: '因為很多設備的 LFO 速率是用赫茲而不是毫秒來設置的。用 1000 除以毫秒數就得到它，表裡一併列出。' },
      { q: '3/4 拍會不一樣嗎？', a: '只有小節長度不同，每個音符的毫秒數不變。拍號是劃分小節的方式，並不改變拍的長短。' },
    ],
  ),

  cellFaq: T<(f: BpmFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.bpm}BPM에서 ${noteKo(f.cell.note)}는 몇 ms인가요?`, a: `${f.ms}ms입니다. 한 박이 ${f.beatMs}ms이므로 그 배수로 나온 값입니다.` },
      { q: 'LFO에는 얼마를 넣나요?', a: `${f.hz}Hz입니다. 1000을 ${f.ms}로 나눈 값이고, 트레몰로나 오토팬을 이 음표에 맞출 때 씁니다.` },
      { q: '한 마디에 몇 번 들어가나요?', a: `${f.perBar}번입니다. 한 마디가 ${f.barMs}ms(4/4 기준)이기 때문입니다.` },
      { q: '한 단계 짧게 하면요?', a: f.faster ? `${noteKo(f.faster.note)}가 되어 더 촘촘해집니다.` : '이 표에서 더 짧은 음표는 없습니다.' },
    ],
    f => [
      { q: `How many milliseconds is a ${noteEn(f.cell.note)} at ${f.cell.bpm} BPM?`, a: `${f.ms} ms. One beat is ${f.beatMs} ms, and this length is a multiple of it.` },
      { q: 'What rate do I give an LFO?', a: `${f.hz} Hz — that is 1,000 divided by ${f.ms}, the rate for a tremolo or auto-pan locked to this note.` },
      { q: 'How many fit in a bar?', a: `${f.perBar}, because a bar runs ${f.barMs} ms in 4/4.` },
      { q: 'What is one step shorter?', a: f.faster ? `A ${noteEn(f.faster.note)}, which tightens the pattern.` : 'There is no shorter value in this table.' },
    ],
    f => [
      { q: `¿Cuántos ms dura una ${noteEs(f.cell.note)} a ${f.cell.bpm} BPM?`, a: `${f.ms} ms. Un pulso son ${f.beatMs} ms y esta duración es múltiplo suyo.` },
      { q: '¿Qué velocidad pongo en el LFO?', a: `${f.hz} Hz: es 1.000 entre ${f.ms}, la velocidad para un trémolo o auto-pan atado a esta figura.` },
      { q: '¿Cuántas caben en un compás?', a: `${f.perBar}, porque un compás dura ${f.barMs} ms en 4/4.` },
      { q: '¿Cuál es un paso más corto?', a: f.faster ? `Una ${noteEs(f.faster.note)}, que aprieta el patrón.` : 'No hay figura más corta en esta tabla.' },
    ],
    f => [
      { q: `Quantos ms dura uma ${notePt(f.cell.note)} a ${f.cell.bpm} BPM?`, a: `${f.ms} ms. Um tempo são ${f.beatMs} ms e esta duração é múltipla dele.` },
      { q: 'Que taxa coloco no LFO?', a: `${f.hz} Hz — é 1.000 dividido por ${f.ms}, a taxa para um tremolo ou auto-pan preso a esta figura.` },
      { q: 'Quantas cabem num compasso?', a: `${f.perBar}, porque um compasso dura ${f.barMs} ms em 4/4.` },
      { q: 'Qual é um passo mais curto?', a: f.faster ? `Uma ${notePt(f.faster.note)}, que aperta o padrão.` : 'Não há figura mais curta nesta tabela.' },
    ],
    f => [
      { q: `${f.cell.bpm}BPMで${noteJa(f.cell.note)}は何msですか。`, a: `${f.ms}msです。1拍が${f.beatMs}msなので、その倍数として出た値です。` },
      { q: 'LFOにはいくつ入れますか。', a: `${f.hz}Hzです。1000を${f.ms}で割った値で、トレモロやオートパンをこの音符に合わせるときに使います。` },
      { q: '1小節に何回入りますか。', a: `${f.perBar}回です。1小節が${f.barMs}ms(4/4基準)だからです。` },
      { q: '1段階短くすると？', a: f.faster ? `${noteJa(f.faster.note)}になり、より細かくなります。` : 'この表にこれより短い音符はありません。' },
    ],
    f => [
      { q: `Wie viele ms hat eine ${noteDe(f.cell.note)} bei ${f.cell.bpm} BPM?`, a: `${f.ms} ms. Ein Schlag sind ${f.beatMs} ms, und dieser Wert ist ein Vielfaches davon.` },
      { q: 'Welche Rate stelle ich am LFO ein?', a: `${f.hz} Hz — das ist 1.000 geteilt durch ${f.ms}, die Rate für ein Tremolo oder Auto-Pan auf diesem Wert.` },
      { q: 'Wie oft passt das in einen Takt?', a: `${f.perBar}-mal, denn ein Takt dauert im 4/4 ${f.barMs} ms.` },
      { q: 'Was ist eine Stufe kürzer?', a: f.faster ? `Eine ${noteDe(f.faster.note)} — das Muster wird enger.` : 'Einen kürzeren Wert führt diese Tabelle nicht.' },
    ],
    f => [
      { q: `Combien de ms dure une ${noteFr(f.cell.note)} à ${f.cell.bpm} BPM ?`, a: `${f.ms} ms. Un temps vaut ${f.beatMs} ms et cette durée en est un multiple.` },
      { q: 'Quelle vitesse donner au LFO ?', a: `${f.hz} Hz, soit 1 000 divisé par ${f.ms} : la vitesse d’un trémolo ou d’un auto-pan calé sur cette valeur.` },
      { q: 'Combien en tiennent dans une mesure ?', a: `${f.perBar}, puisqu’une mesure dure ${f.barMs} ms en 4/4.` },
      { q: 'Quelle est la valeur juste plus courte ?', a: f.faster ? `Une ${noteFr(f.faster.note)}, qui resserre le motif.` : 'Ce tableau ne va pas plus court.' },
    ],
    f => [
      { q: `${f.cell.bpm} BPM पर ${noteHi(f.cell.note)} कितने ms का है?`, a: `${f.ms} ms। एक बीट ${f.beatMs} ms है और यह लंबाई उसी का गुणज है।` },
      { q: 'LFO में कौन सी दर डालूँ?', a: `${f.hz} Hz — यह 1,000 बटा ${f.ms} है, इस स्वर से बँधे ट्रेमोलो या ऑटो-पैन के लिए यही दर है।` },
      { q: 'एक बार में कितनी बार आता है?', a: `${f.perBar} बार, क्योंकि 4/4 में एक बार ${f.barMs} ms का होता है।` },
      { q: 'एक कदम छोटा क्या है?', a: f.faster ? `${noteHi(f.faster.note)}, जिससे पैटर्न और सघन हो जाता है।` : 'इस तालिका में इससे छोटा स्वर नहीं है।' },
    ],
    f => [
      { q: `${f.cell.bpm} BPM 时${noteZh(f.cell.note)}是多少毫秒？`, a: `${f.ms} 毫秒。一拍是 ${f.beatMs} 毫秒，这个时长是它的倍数。` },
      { q: 'LFO 该设多少？', a: `${f.hz} 赫兹 — 也就是 1000 除以 ${f.ms}，用于让颤音或自动声像对齐这个音符。` },
      { q: '一小节里能放几次？', a: `${f.perBar} 次，因为 4/4 拍的一小节是 ${f.barMs} 毫秒。` },
      { q: '短一档是什么？', a: f.faster ? `${noteZh(f.faster.note)}，节奏会更密。` : '本表中没有更短的音符了。' },
    ],
    f => [
      { q: `${f.cell.bpm} BPM 時${noteTw(f.cell.note)}是多少毫秒？`, a: `${f.ms} 毫秒。一拍是 ${f.beatMs} 毫秒，這個時長是它的倍數。` },
      { q: 'LFO 該設多少？', a: `${f.hz} 赫茲 — 也就是 1000 除以 ${f.ms}，用於讓顫音或自動聲像對齊這個音符。` },
      { q: '一小節裡能放幾次？', a: `${f.perBar} 次，因為 4/4 拍的一小節是 ${f.barMs} 毫秒。` },
      { q: '短一檔是什麼？', a: f.faster ? `${noteTw(f.faster.note)}，節奏會更密。` : '本表中沒有更短的音符了。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BPM_UI: L<BpmUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BpmUI>;
