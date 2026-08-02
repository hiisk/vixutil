import type { CalcTable } from './types.ts';

/** 퍼센트 계산기 — 비율, 부분, 증감률 세 가지. 나라를 타지 않는다. */
export const PERCENT: CalcTable = {
  en: {
    title: 'Percentage calculator',
    desc: 'Work out a percentage, a part of a whole, and percentage change',
    short: 'Ratio · part · increase and decrease',
    intro: [
      {
        h: 'Three questions, one page',
        p: 'Most percentage problems are one of three: what percent of Y is X, what is X% of Y, and how much did something change. They use the same arithmetic but people mix up which number goes on the bottom, so each has its own tab here.',
      },
      {
        h: 'Percent and percentage point are not the same',
        p: 'If a rate goes from 4% to 5%, that is a rise of one percentage point but of 25 percent. Both statements are true and they describe the same change, which is exactly why headlines are so easy to misread.',
      },
    ],
    faq: [
      { q: 'Why is a 50% rise not undone by a 50% fall?', a: 'Because the base changes. 100 rises by 50% to 150; 150 falls by 50% to 75, not back to 100. To undo a 50% rise you need a 33.3% fall.' },
      { q: 'How is percentage change calculated?', a: '(new − old) ÷ old × 100. The old value is always the denominator, which is why swapping the two gives a different number.' },
      { q: 'What if the starting value is zero?', a: 'Percentage change is undefined — you cannot divide by zero. Growth from nothing has to be described in absolute terms instead.' },
    ],
    ui: {
      tabRatio: 'X is what % of Y', tabPart: 'X% of Y', tabChange: 'Increase / decrease',
      calc: 'Calculate', up: '▲ increase', down: '▼ decrease', result: 'Result',
      from: 'From', to: 'To', valueX: 'X', valueY: 'Y', percent: 'Percent (%)',
    },
  },
  es: {
    title: 'Calculadora de porcentajes',
    desc: 'Calcula un porcentaje, la parte de un total y la variación porcentual',
    short: 'Proporción · parte · subida y bajada',
    intro: [
      {
        h: 'Tres preguntas en una página',
        p: 'Casi todo problema de porcentajes es uno de estos tres: qué porcentaje de Y es X, cuánto es el X% de Y, y cuánto ha variado algo. La aritmética es la misma, pero la gente confunde qué número va debajo, así que cada caso tiene su propia pestaña.',
      },
      {
        h: 'Por ciento y punto porcentual no son lo mismo',
        p: 'Si una tasa pasa del 4% al 5%, ha subido un punto porcentual pero un 25 por ciento. Las dos frases son ciertas y describen el mismo cambio; por eso los titulares se malinterpretan tan fácilmente.',
      },
    ],
    faq: [
      { q: '¿Por qué una bajada del 50% no deshace una subida del 50%?', a: 'Porque la base cambia. 100 sube un 50% hasta 150; 150 baja un 50% hasta 75, no vuelve a 100. Para deshacer una subida del 50% hace falta una bajada del 33,3%.' },
      { q: '¿Cómo se calcula la variación porcentual?', a: '(nuevo − antiguo) ÷ antiguo × 100. El valor antiguo va siempre en el denominador, y por eso intercambiarlos da otro número.' },
      { q: '¿Y si el valor inicial es cero?', a: 'La variación porcentual no está definida: no se puede dividir entre cero. El crecimiento desde cero hay que describirlo en términos absolutos.' },
    ],
    ui: {
      tabRatio: 'X es qué % de Y', tabPart: 'El X% de Y', tabChange: 'Subida / bajada',
      calc: 'Calcular', up: '▲ subida', down: '▼ bajada', result: 'Resultado',
      from: 'Desde', to: 'Hasta', valueX: 'X', valueY: 'Y', percent: 'Porcentaje (%)',
    },
  },
  'pt-br': {
    title: 'Calculadora de porcentagem',
    desc: 'Calcule uma porcentagem, a parte de um total e a variação percentual',
    short: 'Proporção · parte · aumento e queda',
    intro: [
      {
        h: 'Três perguntas numa página',
        p: 'Quase todo problema de porcentagem é um destes três: que porcentagem de Y é X, quanto é X% de Y, e quanto algo variou. A conta é a mesma, mas as pessoas confundem qual número vai embaixo, então cada caso tem sua própria aba.',
      },
      {
        h: 'Por cento e ponto percentual não são a mesma coisa',
        p: 'Se uma taxa vai de 4% para 5%, subiu um ponto percentual, mas 25 por cento. As duas frases são verdadeiras e descrevem a mesma mudança — é por isso que manchetes são tão fáceis de ler errado.',
      },
    ],
    faq: [
      { q: 'Por que uma queda de 50% não desfaz uma alta de 50%?', a: 'Porque a base muda. 100 sobe 50% e vira 150; 150 cai 50% e vira 75, não volta para 100. Para desfazer uma alta de 50% é preciso cair 33,3%.' },
      { q: 'Como se calcula a variação percentual?', a: '(novo − antigo) ÷ antigo × 100. O valor antigo é sempre o denominador, por isso trocar os dois dá outro número.' },
      { q: 'E se o valor inicial for zero?', a: 'A variação percentual fica indefinida — não dá para dividir por zero. Crescimento a partir do nada precisa ser descrito em termos absolutos.' },
    ],
    ui: {
      tabRatio: 'X é quantos % de Y', tabPart: 'X% de Y', tabChange: 'Aumento / queda',
      calc: 'Calcular', up: '▲ aumento', down: '▼ queda', result: 'Resultado',
      from: 'De', to: 'Para', valueX: 'X', valueY: 'Y', percent: 'Porcentagem (%)',
    },
  },
  ja: {
    title: 'パーセント計算機',
    desc: '割合・全体に対する部分・増減率をまとめて計算',
    short: '割合・部分・増減',
    intro: [
      {
        h: '三つの問いをひとつの画面に',
        p: 'パーセントの問題はたいてい三つのどれかです。XはYの何%か、Yの X% はいくつか、どれだけ変わったか。計算そのものは同じですが、どの数を分母に置くかで迷いやすいので、ここでは別のタブに分けています。',
      },
      {
        h: '「%」と「ポイント」は別物',
        p: '率が4%から5%になったとき、上がったのは1ポイントであり、同時に25パーセントです。どちらの言い方も正しく、同じ変化を指しています。見出しの数字が誤解されやすいのはこのためです。',
      },
    ],
    faq: [
      { q: '50%上がってから50%下がると元に戻らないのはなぜですか。', a: '基準が変わるからです。100は50%上がって150、150は50%下がって75で、100には戻りません。50%の上げを打ち消すには33.3%下げる必要があります。' },
      { q: '増減率はどう計算しますか。', a: '（新しい値 − 元の値）÷ 元の値 × 100 です。分母はつねに元の値で、入れ替えると別の数字になります。' },
      { q: '元の値が0のときは。', a: '増減率は定義できません。0では割れないからです。ゼロからの増加は割合ではなく実数で述べるしかありません。' },
    ],
    ui: {
      tabRatio: 'XはYの何%', tabPart: 'Yの X%', tabChange: '増減',
      calc: '計算する', up: '▲ 増加', down: '▼ 減少', result: '計算結果',
      from: '元の値', to: '新しい値', valueX: 'X', valueY: 'Y', percent: '割合 (%)',
    },
  },
  de: {
    title: 'Prozentrechner',
    desc: 'Prozentsatz, Anteil an einem Ganzen und prozentuale Veränderung',
    short: 'Anteil · Prozentwert · Zu- und Abnahme',
    intro: [
      {
        h: 'Drei Fragen auf einer Seite',
        p: 'Fast jede Prozentaufgabe ist eine von dreien: Wie viel Prozent von Y ist X, wie viel sind X% von Y, und wie stark hat sich etwas verändert. Die Rechnung ist dieselbe, aber man verwechselt leicht, welche Zahl unten steht — deshalb hat jeder Fall hier einen eigenen Reiter.',
      },
      {
        h: 'Prozent und Prozentpunkt sind zweierlei',
        p: 'Steigt ein Satz von 4% auf 5%, ist das ein Prozentpunkt mehr und zugleich ein Anstieg um 25 Prozent. Beide Aussagen stimmen und meinen dieselbe Veränderung. Genau deshalb lassen sich Schlagzeilen so leicht falsch lesen.',
      },
    ],
    faq: [
      { q: 'Warum hebt ein Minus von 50% ein Plus von 50% nicht auf?', a: 'Weil sich die Bezugsgröße ändert. 100 steigt um 50% auf 150; 150 fällt um 50% auf 75, nicht zurück auf 100. Um ein Plus von 50% aufzuheben, braucht es ein Minus von 33,3%.' },
      { q: 'Wie wird die prozentuale Veränderung berechnet?', a: '(neu − alt) ÷ alt × 100. Der alte Wert steht immer im Nenner; vertauscht man beide, kommt eine andere Zahl heraus.' },
      { q: 'Und wenn der Ausgangswert null ist?', a: 'Dann ist die prozentuale Veränderung nicht definiert — durch null lässt sich nicht teilen. Wachstum aus dem Nichts muss man absolut beschreiben.' },
    ],
    ui: {
      tabRatio: 'X ist wie viel % von Y', tabPart: 'X% von Y', tabChange: 'Zu- / Abnahme',
      calc: 'Berechnen', up: '▲ Zunahme', down: '▼ Abnahme', result: 'Ergebnis',
      from: 'Von', to: 'Auf', valueX: 'X', valueY: 'Y', percent: 'Prozent (%)',
    },
  },
  fr: {
    title: 'Calculateur de pourcentage',
    desc: 'Calculer un pourcentage, une part d’un total et une variation',
    short: 'Proportion · part · hausse et baisse',
    intro: [
      {
        h: 'Trois questions sur une page',
        p: 'Presque tout problème de pourcentage est l’un de ces trois : quel pourcentage de Y représente X, combien font X% de Y, et de combien une valeur a varié. Le calcul est le même, mais on confond vite quel nombre va au dénominateur — d’où un onglet par cas.',
      },
      {
        h: 'Pour cent et point de pourcentage, ce n’est pas pareil',
        p: 'Si un taux passe de 4% à 5%, c’est un point de pourcentage de plus et, en même temps, une hausse de 25 pour cent. Les deux formulations sont exactes et décrivent le même mouvement. C’est précisément ce qui rend les titres si trompeurs.',
      },
    ],
    faq: [
      { q: 'Pourquoi une baisse de 50% n’annule-t-elle pas une hausse de 50% ?', a: 'Parce que la base change. 100 monte de 50% à 150 ; 150 baisse de 50% à 75, et non pas à 100. Pour annuler une hausse de 50%, il faut une baisse de 33,3%.' },
      { q: 'Comment calcule-t-on une variation en pourcentage ?', a: '(nouveau − ancien) ÷ ancien × 100. L’ancienne valeur est toujours au dénominateur ; les intervertir donne un autre résultat.' },
      { q: 'Et si la valeur de départ est nulle ?', a: 'La variation en pourcentage n’est pas définie : on ne divise pas par zéro. Une croissance partant de rien se décrit en valeur absolue.' },
    ],
    ui: {
      tabRatio: 'X représente quel % de Y', tabPart: 'X% de Y', tabChange: 'Hausse / baisse',
      calc: 'Calculer', up: '▲ hausse', down: '▼ baisse', result: 'Résultat',
      from: 'De', to: 'À', valueX: 'X', valueY: 'Y', percent: 'Pourcentage (%)',
    },
  },
  hi: {
    title: 'प्रतिशत कैलकुलेटर',
    desc: 'प्रतिशत, कुल का हिस्सा और प्रतिशत बदलाव निकालें',
    short: 'अनुपात · हिस्सा · वृद्धि और कमी',
    intro: [
      {
        h: 'तीन सवाल, एक पन्ना',
        p: 'प्रतिशत के ज़्यादातर सवाल इन्हीं तीन में से एक होते हैं: X, Y का कितने प्रतिशत है; Y का X% कितना है; और कोई चीज़ कितनी बदली। गणित एक ही है, पर कौन-सी संख्या नीचे जाएगी इसमें गड़बड़ होती है, इसलिए यहाँ हर सवाल का अलग टैब है।',
      },
      {
        h: 'प्रतिशत और प्रतिशत बिंदु अलग हैं',
        p: 'अगर कोई दर 4% से 5% हो जाए, तो वह एक प्रतिशत बिंदु की बढ़त है और साथ ही 25 प्रतिशत की। दोनों बातें सही हैं और एक ही बदलाव बता रही हैं — इसीलिए सुर्ख़ियाँ इतनी आसानी से ग़लत पढ़ी जाती हैं।',
      },
    ],
    faq: [
      { q: '50% की बढ़त 50% की गिरावट से क्यों नहीं मिटती?', a: 'क्योंकि आधार बदल जाता है। 100 पर 50% बढ़कर 150; 150 पर 50% घटकर 75, 100 नहीं। 50% की बढ़त मिटाने के लिए 33.3% गिरावट चाहिए।' },
      { q: 'प्रतिशत बदलाव कैसे निकलता है?', a: '(नया − पुराना) ÷ पुराना × 100। पुराना मान हमेशा हर में रहता है, इसीलिए दोनों को उलटने पर दूसरा जवाब आता है।' },
      { q: 'अगर शुरुआती मान शून्य हो तो?', a: 'तब प्रतिशत बदलाव परिभाषित नहीं होता — शून्य से भाग नहीं दिया जा सकता। शून्य से हुई बढ़त को निरपेक्ष संख्या में ही बताना पड़ता है।' },
    ],
    ui: {
      tabRatio: 'X, Y का कितने %', tabPart: 'Y का X%', tabChange: 'वृद्धि / कमी',
      calc: 'गणना करें', up: '▲ वृद्धि', down: '▼ कमी', result: 'परिणाम',
      from: 'से', to: 'तक', valueX: 'X', valueY: 'Y', percent: 'प्रतिशत (%)',
    },
  },
  'zh-hans': {
    title: '百分比计算器',
    desc: '算比例、算部分、算增减幅度',
    short: '比例 · 部分 · 增减',
    intro: [
      {
        h: '三个问题放在一页',
        p: '百分比的问题基本上就是三种：X 是 Y 的百分之几、Y 的 X% 是多少、变化了多少。算法是一样的，但人们容易搞混哪个数当分母，所以这里分成三个页签。',
      },
      {
        h: '百分比和百分点不是一回事',
        p: '一个比率从 4% 变到 5%，是上升了一个百分点，同时也是上升了 25%。两句话都对，说的是同一件事——新闻标题之所以容易被误读，原因就在这里。',
      },
    ],
    faq: [
      { q: '为什么涨 50% 之后跌 50% 回不到原点？', a: '因为基数变了。100 涨 50% 到 150；150 跌 50% 到 75，不是回到 100。要抵消 50% 的上涨，需要跌 33.3%。' },
      { q: '增减幅度怎么算？', a: '（新值 − 旧值）÷ 旧值 × 100。旧值永远在分母上，两者对调结果就不一样了。' },
      { q: '起始值是 0 怎么办？', a: '这时增减幅度没有定义——不能除以零。从零开始的增长只能用绝对数来说。' },
    ],
    ui: {
      tabRatio: 'X 是 Y 的百分之几', tabPart: 'Y 的 X%', tabChange: '增减',
      calc: '计算', up: '▲ 增加', down: '▼ 减少', result: '计算结果',
      from: '原值', to: '新值', valueX: 'X', valueY: 'Y', percent: '百分比 (%)',
    },
  },
  'zh-hant': {
    title: '百分比計算機',
    desc: '算比例、算部分、算增減幅度',
    short: '比例 · 部分 · 增減',
    intro: [
      {
        h: '三個問題放在一頁',
        p: '百分比的問題基本上就是三種：X 是 Y 的百分之幾、Y 的 X% 是多少、變化了多少。算法是一樣的，但人們容易搞混哪個數當分母，所以這裡分成三個頁籤。',
      },
      {
        h: '百分比和百分點不是一回事',
        p: '一個比率從 4% 變到 5%，是上升了一個百分點，同時也是上升了 25%。兩句話都對，說的是同一件事——新聞標題之所以容易被誤讀，原因就在這裡。',
      },
    ],
    faq: [
      { q: '為什麼漲 50% 之後跌 50% 回不到原點？', a: '因為基數變了。100 漲 50% 到 150；150 跌 50% 到 75，不是回到 100。要抵消 50% 的上漲，需要跌 33.3%。' },
      { q: '增減幅度怎麼算？', a: '（新值 − 舊值）÷ 舊值 × 100。舊值永遠在分母上，兩者對調結果就不一樣了。' },
      { q: '起始值是 0 怎麼辦？', a: '這時增減幅度沒有定義——不能除以零。從零開始的成長只能用絕對數來說。' },
    ],
    ui: {
      tabRatio: 'X 是 Y 的百分之幾', tabPart: 'Y 的 X%', tabChange: '增減',
      calc: '計算', up: '▲ 增加', down: '▼ 減少', result: '計算結果',
      from: '原值', to: '新值', valueX: 'X', valueY: 'Y', percent: '百分比 (%)',
    },
  },
};
