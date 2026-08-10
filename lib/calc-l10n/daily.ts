import type { CalcTable } from './types.ts';

/**
 * 생활 셋 — 평균, 임대수익률, 가전 전기요금.
 *
 * 평균은 한국어판 계산 그대로다. 표본(n−1)과 모집단(n) 표준편차를 둘 다 보여
 * 주는 것도 그대로 — 하나만 보여 주면 자료가 전부인지 일부인지의 구분이 사라진다.
 *
 * 임대수익률은 lib/rental-yield.ts의 계산을 그대로 쓴다. 통화만 뗐다 — 넣은
 * 단위가 그대로 답의 단위다. 보증금 칸은 나라마다 뜻이 달라서, 법으로 맡겨 두는
 * 곳이면 0을 넣으라고 문구에서 밝힌다.
 *
 * 가전 전기요금의 한국어판은 한전 누진제에 묶여 있어 그대로 옮길 수 없다.
 * 누진 계산을 들어내고 kWh 단가를 입력으로 받는다(주유비 프리셋을 지운 것과
 * 같은 손질). 월은 30일, 해는 365일로 잡는다.
 */
export const AVERAGE: CalcTable = {
  en: {
    title: 'Mean, median and standard deviation calculator',
    desc: 'Paste a list of numbers and get the mean, median, mode, range and both standard deviations',
    short: 'Mean · median · standard deviation',
    intro: [
      {
        h: 'The mean alone can mislead',
        p: 'The numbers 0, 0, 0, 0, 100 average out to 20 — yet not one of them is anywhere near 20. When the data piles up on one side or a single large value sneaks in, the mean stops representing anything. That is why the median matters: for that list it is 0, which tells the truer story.',
      },
      {
        h: 'Median and mode',
        p: 'Sort the values and the median is the one in the middle; with an even count it is the average of the middle two. One huge value barely moves it, which is why incomes and house prices are usually quoted as medians. The mode is the value that appears most often — and if every value appears exactly once, there is no mode at all.',
      },
      {
        h: 'Two standard deviations, on purpose',
        p: 'If your numbers are the whole story — every student in the class, every game of the season — divide by n (population). If they are a sample drawn from something larger, divide by n−1 (sample, Bessel’s correction): a sample’s own mean sits closer to the sample than the true mean does, so dividing by n would understate the spread. The smaller the sample, the bigger the difference.',
      },
    ],
    faq: [
      { q: 'Which standard deviation should I use?', a: 'Ask whether the data is everything or a sample. Grading a class of 30 on their own scores: population (n). Polling 30 people to estimate a whole city: sample (n−1). With large n the two nearly agree, so the choice matters most for small datasets.' },
      { q: 'Why are my mean and median so far apart?', a: 'The data is skewed — a few values on one side are dragging the mean while the median stays put. Salaries are the classic case: one executive pay packet lifts the mean of the whole office. When the two disagree, the median is usually the honest summary.' },
      { q: 'What does "no mode" mean?', a: 'Every value in your list appears exactly once, so no value is "most frequent". The mode is mainly useful for data that repeats — shoe sizes, survey answers, dice rolls. For measurements with many decimal places it rarely says anything.' },
    ],
    ui: {
      input: 'Your numbers', placeholder: '85, 92, 78, 95, 88',
      hint: 'Commas, spaces or line breaks all work', clear: 'Clear',
      mean: 'Mean', count: 'Count', sum: 'Sum',
      median: 'Median', mode: 'Mode', noMode: 'none (each value appears once)',
      minMax: 'Min · Max', range: 'Range',
      sampleSd: 'Sample standard deviation (n−1)', needTwo: 'needs at least 2 values',
      popSd: 'Population standard deviation (n)',
      skewNote: 'The mean and the median are far apart here. Something is skewing the data to one side, so the median describes it more honestly than the mean.',
    },
  },
  es: {
    title: 'Calculadora de media, mediana y desviación típica',
    desc: 'Pega una lista de números y obtén la media, la mediana, la moda, el rango y las dos desviaciones típicas',
    short: 'Media · mediana · desviación típica',
    intro: [
      {
        h: 'La media, sola, engaña',
        p: 'Los números 0, 0, 0, 0, 100 tienen media 20, y sin embargo ninguno se acerca a 20. Cuando los datos se amontonan a un lado o se cuela un valor muy grande, la media deja de representar nada. Por eso importa la mediana: en esa lista es 0, y cuenta la historia verdadera.',
      },
      {
        h: 'Mediana y moda',
        p: 'Ordena los valores y la mediana es el del centro; con un número par de datos, el promedio de los dos centrales. Un valor enorme apenas la mueve, y por eso los sueldos y los precios de la vivienda se dan casi siempre como medianas. La moda es el valor que más se repite — y si cada valor aparece una sola vez, no hay moda.',
      },
      {
        h: 'Dos desviaciones típicas, a propósito',
        p: 'Si tus números son el total — todos los alumnos de la clase, todos los partidos de la temporada — divide entre n (población). Si son una muestra de algo mayor, divide entre n−1 (muestra, corrección de Bessel): la media de una muestra queda más cerca de la muestra que la media real, así que dividir entre n subestimaría la dispersión. Cuanto más pequeña la muestra, mayor la diferencia.',
      },
    ],
    faq: [
      { q: '¿Qué desviación típica debo usar?', a: 'Pregúntate si los datos son el total o una muestra. Calificar a una clase de 30 con sus propias notas: población (n). Encuestar a 30 personas para estimar una ciudad entera: muestra (n−1). Con n grande casi coinciden, así que la elección pesa sobre todo en conjuntos pequeños.' },
      { q: '¿Por qué mi media y mi mediana están tan separadas?', a: 'Los datos están sesgados: unos pocos valores de un lado arrastran la media mientras la mediana no se mueve. El caso clásico son los sueldos: la nómina de un directivo sube la media de toda la oficina. Cuando las dos discrepan, la mediana suele ser el resumen honesto.' },
      { q: '¿Qué significa «sin moda»?', a: 'Que cada valor de tu lista aparece exactamente una vez, así que ninguno es «el más frecuente». La moda sirve sobre todo para datos que se repiten: tallas, respuestas de encuesta, tiradas de dado. Para mediciones con muchos decimales rara vez dice algo.' },
    ],
    ui: {
      input: 'Tus números', placeholder: '85, 92, 78, 95, 88',
      hint: 'Valen comas, espacios y saltos de línea', clear: 'Borrar',
      mean: 'Media', count: 'Cantidad', sum: 'Suma',
      median: 'Mediana', mode: 'Moda', noMode: 'no hay (cada valor aparece una vez)',
      minMax: 'Mínimo · Máximo', range: 'Rango',
      sampleSd: 'Desviación típica muestral (n−1)', needTwo: 'hacen falta al menos 2 valores',
      popSd: 'Desviación típica poblacional (n)',
      skewNote: 'La media y la mediana están muy separadas. Algo sesga los datos hacia un lado, así que la mediana los describe con más honestidad que la media.',
    },
  },
  'pt-br': {
    title: 'Calculadora de média, mediana e desvio padrão',
    desc: 'Cole uma lista de números e receba média, mediana, moda, amplitude e os dois desvios padrão',
    short: 'Média · mediana · desvio padrão',
    intro: [
      {
        h: 'A média, sozinha, engana',
        p: 'Os números 0, 0, 0, 0, 100 têm média 20 — e nenhum deles chega perto de 20. Quando os dados se amontoam de um lado ou um valor muito grande se mistura, a média para de representar qualquer coisa. Por isso a mediana importa: nessa lista ela é 0, e conta a história verdadeira.',
      },
      {
        h: 'Mediana e moda',
        p: 'Ordene os valores e a mediana é o do meio; com quantidade par, a média dos dois centrais. Um valor enorme mal a move, e é por isso que renda e preço de imóvel quase sempre aparecem como mediana. A moda é o valor que mais se repete — e se cada valor aparece uma única vez, não há moda.',
      },
      {
        h: 'Dois desvios padrão, de propósito',
        p: 'Se os seus números são o total — todos os alunos da turma, todos os jogos da temporada — divida por n (população). Se são uma amostra de algo maior, divida por n−1 (amostra, correção de Bessel): a média da amostra fica mais perto da amostra do que a média verdadeira, então dividir por n subestimaria a dispersão. Quanto menor a amostra, maior a diferença.',
      },
    ],
    faq: [
      { q: 'Qual desvio padrão eu uso?', a: 'Pergunte se os dados são o total ou uma amostra. Avaliar uma turma de 30 pelas próprias notas: população (n). Entrevistar 30 pessoas para estimar uma cidade inteira: amostra (n−1). Com n grande os dois quase coincidem, então a escolha pesa mais em conjuntos pequenos.' },
      { q: 'Por que minha média e minha mediana estão tão longe?', a: 'Os dados estão enviesados: uns poucos valores de um lado arrastam a média enquanto a mediana fica parada. Salário é o caso clássico: o contracheque de um diretor levanta a média do escritório inteiro. Quando as duas discordam, a mediana costuma ser o resumo honesto.' },
      { q: 'O que significa "sem moda"?', a: 'Cada valor da sua lista aparece exatamente uma vez, então nenhum é "o mais frequente". A moda serve principalmente para dados que se repetem: numeração de calçado, respostas de pesquisa, lançamentos de dado. Para medições com muitas casas decimais ela raramente diz algo.' },
    ],
    ui: {
      input: 'Seus números', placeholder: '85, 92, 78, 95, 88',
      hint: 'Vírgula, espaço e quebra de linha funcionam', clear: 'Limpar',
      mean: 'Média', count: 'Quantidade', sum: 'Soma',
      median: 'Mediana', mode: 'Moda', noMode: 'não há (cada valor aparece uma vez)',
      minMax: 'Mínimo · Máximo', range: 'Amplitude',
      sampleSd: 'Desvio padrão amostral (n−1)', needTwo: 'precisa de pelo menos 2 valores',
      popSd: 'Desvio padrão populacional (n)',
      skewNote: 'A média e a mediana estão bem afastadas. Algo puxa os dados para um lado, então a mediana descreve este conjunto com mais honestidade que a média.',
    },
  },
  ja: {
    title: '平均・中央値・標準偏差の計算機',
    desc: '数字を貼り付けるだけで、平均・中央値・最頻値・範囲と2種類の標準偏差を出します',
    short: '平均・中央値・標準偏差',
    intro: [
      {
        h: '平均だけでは足りません',
        p: '0, 0, 0, 0, 100 の平均は20です。ところが20に近い値はひとつもありません。値が片側に固まっていたり、大きな値がひとつ混ざっていたりすると、平均はデータを代表しなくなります。だから中央値を並べて見ます — この例の中央値は0で、こちらのほうが実態に近い数字です。',
      },
      {
        h: '中央値と最頻値',
        p: '小さい順に並べて真ん中にある値が中央値です。個数が偶数なら真ん中の2つの平均を取ります。飛び抜けた値ひとつではほとんど動かないので、所得や住宅価格のように片側に長いデータでよく使われます。最頻値はいちばん多く現れた値で、全部が1回ずつなら最頻値はありません。',
      },
      {
        h: '標準偏差を2つ出す理由',
        p: '手元の数字がデータの全部なら — クラス全員の点数、シーズン全試合 — nで割ります(母集団)。もっと大きな集まりから抜き出した一部なら n−1 で割ります(標本、ベッセルの補正)。標本の平均は真の平均より標本自身に寄るため、nで割るとばらつきを小さく見積もってしまうのです。個数が少ないほど2つの差は開きます。',
      },
    ],
    faq: [
      { q: 'どちらの標準偏差を使えばいいですか。', a: 'データが全部か一部かで決まります。30人のクラスをその30人の点数で評価するなら母集団(n)。30人に聞いて市全体を推定するなら標本(n−1)。nが大きければ両者はほぼ一致するので、この選択が効くのは小さなデータのときです。' },
      { q: '平均と中央値がこんなに離れるのはなぜですか。', a: 'データが偏っています。片側の少数の値が平均を引っ張り、中央値は動きません。給料が典型で、役員ひとりの報酬がオフィス全体の平均を持ち上げます。2つが食い違うときは、たいてい中央値のほうが正直な要約です。' },
      { q: '「最頻値なし」とはどういう意味ですか。', a: 'リストの値がどれも1回ずつしか現れていない、ということです。最頻値が役に立つのは繰り返しの出るデータ — 靴のサイズ、アンケートの回答、さいころの目。小数点以下が長い測定値では、ほとんど何も語りません。' },
    ],
    ui: {
      input: '数字の入力', placeholder: '85, 92, 78, 95, 88',
      hint: 'カンマ・空白・改行のどれで区切っても読みます', clear: '消す',
      mean: '平均', count: '個数', sum: '合計',
      median: '中央値', mode: '最頻値', noMode: 'なし(すべて1回ずつ)',
      minMax: '最小 · 最大', range: '範囲',
      sampleSd: '標本標準偏差 (n−1)', needTwo: '2個以上必要です',
      popSd: '母集団標準偏差 (n)',
      skewNote: '平均と中央値が大きく離れています。データが片側に偏っているので、このデータは平均より中央値で語るほうが正確です。',
    },
  },
  de: {
    title: 'Rechner für Mittelwert, Median und Standardabweichung',
    desc: 'Zahlenliste einfügen — Mittelwert, Median, Modus, Spannweite und beide Standardabweichungen',
    short: 'Mittelwert · Median · Standardabweichung',
    intro: [
      {
        h: 'Der Mittelwert allein führt in die Irre',
        p: 'Die Zahlen 0, 0, 0, 0, 100 haben den Mittelwert 20 — und doch liegt keine einzige auch nur in der Nähe von 20. Häufen sich die Werte auf einer Seite oder mischt sich ein großer Ausreißer darunter, repräsentiert der Mittelwert nichts mehr. Darum gehört der Median daneben: Für diese Liste ist er 0, und das ist die ehrlichere Zahl.',
      },
      {
        h: 'Median und Modus',
        p: 'Sortiert man die Werte, ist der Median der mittlere; bei gerader Anzahl das Mittel der beiden mittleren. Ein einzelner Riesenwert bewegt ihn kaum — deshalb werden Einkommen und Immobilienpreise fast immer als Median angegeben. Der Modus ist der häufigste Wert; kommt jeder Wert genau einmal vor, gibt es keinen.',
      },
      {
        h: 'Zwei Standardabweichungen, mit Absicht',
        p: 'Sind Ihre Zahlen das Ganze — jeder Schüler der Klasse, jedes Spiel der Saison — teilen Sie durch n (Grundgesamtheit). Sind sie eine Stichprobe aus etwas Größerem, teilen Sie durch n−1 (Bessel-Korrektur): Der Mittelwert einer Stichprobe liegt näher an der Stichprobe als der wahre Mittelwert, sodass Teilen durch n die Streuung unterschätzen würde. Je kleiner die Stichprobe, desto größer der Unterschied.',
      },
    ],
    faq: [
      { q: 'Welche Standardabweichung soll ich nehmen?', a: 'Fragen Sie, ob die Daten alles sind oder eine Stichprobe. Eine Klasse von 30 anhand ihrer eigenen Noten beurteilen: Grundgesamtheit (n). 30 Leute befragen, um eine ganze Stadt zu schätzen: Stichprobe (n−1). Bei großem n stimmen beide fast überein — die Wahl zählt vor allem bei kleinen Datensätzen.' },
      { q: 'Warum liegen Mittelwert und Median so weit auseinander?', a: 'Die Daten sind schief — wenige Werte auf einer Seite ziehen den Mittelwert, während der Median stehen bleibt. Der Klassiker sind Gehälter: Ein einziges Vorstandsgehalt hebt den Schnitt des ganzen Büros. Wenn beide auseinanderfallen, ist meist der Median die ehrliche Zusammenfassung.' },
      { q: 'Was bedeutet „kein Modus"?', a: 'Jeder Wert Ihrer Liste kommt genau einmal vor, also ist keiner „am häufigsten". Der Modus taugt vor allem für Daten, die sich wiederholen — Schuhgrößen, Umfrageantworten, Würfelergebnisse. Bei Messwerten mit vielen Nachkommastellen sagt er selten etwas.' },
    ],
    ui: {
      input: 'Ihre Zahlen', placeholder: '85, 92, 78, 95, 88',
      hint: 'Kommas, Leerzeichen oder Zeilenumbrüche — alles geht', clear: 'Leeren',
      mean: 'Mittelwert', count: 'Anzahl', sum: 'Summe',
      median: 'Median', mode: 'Modus', noMode: 'keiner (jeder Wert einmal)',
      minMax: 'Minimum · Maximum', range: 'Spannweite',
      sampleSd: 'Standardabweichung der Stichprobe (n−1)', needTwo: 'mindestens 2 Werte nötig',
      popSd: 'Standardabweichung der Grundgesamtheit (n)',
      skewNote: 'Mittelwert und Median liegen hier weit auseinander. Etwas zieht die Daten auf eine Seite — der Median beschreibt sie ehrlicher als der Mittelwert.',
    },
  },
  fr: {
    title: 'Calculateur de moyenne, médiane et écart type',
    desc: 'Collez une liste de nombres : moyenne, médiane, mode, étendue et les deux écarts types',
    short: 'Moyenne · médiane · écart type',
    intro: [
      {
        h: 'La moyenne seule peut tromper',
        p: 'Les nombres 0, 0, 0, 0, 100 ont pour moyenne 20 — et pourtant aucun d’eux ne s’approche de 20. Quand les valeurs s’entassent d’un côté ou qu’une grande valeur se glisse dans le lot, la moyenne ne représente plus rien. C’est là que la médiane compte : pour cette liste elle vaut 0, et c’est elle qui dit vrai.',
      },
      {
        h: 'Médiane et mode',
        p: 'Triez les valeurs : la médiane est celle du milieu ; avec un effectif pair, la moyenne des deux du milieu. Une valeur énorme la déplace à peine — c’est pourquoi revenus et prix immobiliers sont presque toujours donnés en médiane. Le mode est la valeur la plus fréquente ; si chaque valeur n’apparaît qu’une fois, il n’y a pas de mode.',
      },
      {
        h: 'Deux écarts types, volontairement',
        p: 'Si vos nombres sont la totalité — tous les élèves de la classe, tous les matchs de la saison — divisez par n (population). S’ils sont un échantillon tiré d’un ensemble plus grand, divisez par n−1 (correction de Bessel) : la moyenne d’un échantillon colle à l’échantillon plus que la vraie moyenne, si bien que diviser par n sous-estimerait la dispersion. Plus l’échantillon est petit, plus l’écart entre les deux grandit.',
      },
    ],
    faq: [
      { q: 'Quel écart type utiliser ?', a: 'Demandez-vous si les données sont tout ou un échantillon. Noter une classe de 30 sur ses propres notes : population (n). Interroger 30 personnes pour estimer une ville entière : échantillon (n−1). Avec un grand n les deux se confondent presque — le choix pèse surtout sur les petits jeux de données.' },
      { q: 'Pourquoi ma moyenne et ma médiane sont-elles si éloignées ?', a: 'Les données sont asymétriques : quelques valeurs d’un côté tirent la moyenne pendant que la médiane ne bouge pas. Les salaires en sont le cas d’école : une seule paie de dirigeant relève la moyenne de tout le bureau. Quand les deux divergent, la médiane est en général le résumé honnête.' },
      { q: 'Que veut dire « pas de mode » ?', a: 'Chaque valeur de votre liste n’apparaît qu’une seule fois : aucune n’est « la plus fréquente ». Le mode sert surtout aux données qui se répètent — pointures, réponses d’enquête, lancers de dé. Pour des mesures à nombreuses décimales, il ne dit presque rien.' },
    ],
    ui: {
      input: 'Vos nombres', placeholder: '85, 92, 78, 95, 88',
      hint: 'Virgules, espaces ou retours à la ligne : tout convient', clear: 'Effacer',
      mean: 'Moyenne', count: 'Effectif', sum: 'Somme',
      median: 'Médiane', mode: 'Mode', noMode: 'aucun (chaque valeur une seule fois)',
      minMax: 'Minimum · Maximum', range: 'Étendue',
      sampleSd: 'Écart type d’échantillon (n−1)', needTwo: 'au moins 2 valeurs nécessaires',
      popSd: 'Écart type de population (n)',
      skewNote: 'La moyenne et la médiane sont très éloignées. Quelque chose tire les données d’un côté : la médiane les décrit plus honnêtement que la moyenne.',
    },
  },
  hi: {
    title: 'औसत, माध्यिका और मानक विचलन कैलकुलेटर',
    desc: 'संख्याओं की सूची चिपकाइए — औसत, माध्यिका, बहुलक, परास और दोनों मानक विचलन एक साथ',
    short: 'औसत · माध्यिका · मानक विचलन',
    intro: [
      {
        h: 'सिर्फ़ औसत धोखा दे सकता है',
        p: '0, 0, 0, 0, 100 का औसत 20 है — मगर इनमें से कोई भी संख्या 20 के आसपास नहीं है। जब आंकड़े एक तरफ़ जमा हों या कोई बहुत बड़ा मान बीच में आ जाए, तो औसत किसी चीज़ का प्रतिनिधित्व नहीं करता। इसीलिए माध्यिका साथ देखनी चाहिए: इस सूची की माध्यिका 0 है, और वही सच्ची कहानी कहती है।',
      },
      {
        h: 'माध्यिका और बहुलक',
        p: 'मानों को क्रम में लगाइए — बीच वाला मान माध्यिका है; संख्या सम हो तो बीच के दो मानों का औसत। एक बहुत बड़ा मान इसे मुश्किल से हिला पाता है, इसीलिए आमदनी और मकान के दाम लगभग हमेशा माध्यिका में बताए जाते हैं। बहुलक वह मान है जो सबसे ज़्यादा बार आया हो — और हर मान एक-एक बार ही आया हो, तो बहुलक होता ही नहीं।',
      },
      {
        h: 'दो मानक विचलन, जान-बूझकर',
        p: 'अगर आपके आंकड़े पूरा समूह हैं — कक्षा के सारे विद्यार्थी, सीज़न के सारे मैच — तो n से भाग दीजिए (समष्टि)। अगर वे किसी बड़े समूह से लिया गया नमूना हैं, तो n−1 से (प्रतिदर्श, बेसेल संशोधन): नमूने का अपना औसत सच्चे औसत के मुक़ाबले नमूने के ज़्यादा क़रीब बैठता है, इसलिए n से भाग देने पर फैलाव असल से कम आंका जाता। नमूना जितना छोटा, दोनों का अंतर उतना बड़ा।',
      },
    ],
    faq: [
      { q: 'कौन-सा मानक विचलन इस्तेमाल करूँ?', a: 'पूछिए कि आंकड़े पूरा समूह हैं या नमूना। 30 बच्चों की कक्षा को उन्हीं के अंकों पर परखना: समष्टि (n)। 30 लोगों से पूछकर पूरे शहर का अनुमान लगाना: प्रतिदर्श (n−1)। n बड़ा हो तो दोनों लगभग बराबर आते हैं — यह चुनाव छोटे आंकड़ों में ही मायने रखता है।' },
      { q: 'मेरा औसत और माध्यिका इतने अलग क्यों हैं?', a: 'आंकड़े एक तरफ़ झुके हैं — एक तरफ़ के थोड़े-से मान औसत को खींच लेते हैं जबकि माध्यिका अपनी जगह रहती है। तनख़्वाह इसकी क्लासिक मिसाल है: एक अफ़सर की मोटी तनख़्वाह पूरे दफ़्तर का औसत उठा देती है। दोनों में फ़र्क़ दिखे तो माध्यिका ही ईमानदार सारांश होती है।' },
      { q: '"बहुलक नहीं" का क्या मतलब है?', a: 'आपकी सूची का हर मान ठीक एक बार आया है, इसलिए कोई "सबसे ज़्यादा बार" नहीं है। बहुलक उन्हीं आंकड़ों में काम आता है जो दोहराते हैं — जूतों के नंबर, सर्वे के जवाब, पासे के अंक। कई दशमलव वाली मापों में यह शायद ही कुछ बताता है।' },
    ],
    ui: {
      input: 'आपकी संख्याएँ', placeholder: '85, 92, 78, 95, 88',
      hint: 'अल्पविराम, स्पेस या नई पंक्ति — कुछ भी चलेगा', clear: 'साफ़ करें',
      mean: 'औसत', count: 'गिनती', sum: 'योग',
      median: 'माध्यिका', mode: 'बहुलक', noMode: 'नहीं है (हर मान एक बार)',
      minMax: 'न्यूनतम · अधिकतम', range: 'परास',
      sampleSd: 'प्रतिदर्श मानक विचलन (n−1)', needTwo: 'कम से कम 2 मान चाहिए',
      popSd: 'समष्टि मानक विचलन (n)',
      skewNote: 'औसत और माध्यिका यहाँ काफ़ी दूर हैं। आंकड़े एक तरफ़ झुके हुए हैं, इसलिए इन्हें औसत के बजाय माध्यिका से बताना ज़्यादा सही रहेगा।',
    },
  },
  'zh-hans': {
    title: '平均数、中位数与标准差计算器',
    desc: '粘贴一串数字，一次算出平均数、中位数、众数、极差和两种标准差',
    short: '平均数 · 中位数 · 标准差',
    intro: [
      {
        h: '只看平均数会被骗',
        p: '0、0、0、0、100 的平均数是 20——可没有一个数靠近 20。当数据挤在一边，或混进一个特别大的值时，平均数就不再代表什么。所以要把中位数摆在旁边看：这组数的中位数是 0，它说的才是实话。',
      },
      {
        h: '中位数和众数',
        p: '把数值从小到大排开，正中间那个就是中位数；个数是偶数时，取中间两个的平均。一个天大的值也几乎挪不动它，所以收入、房价这类一边拖长尾巴的数据，几乎都用中位数来说。众数是出现次数最多的值——如果每个值都只出现一次，就没有众数。',
      },
      {
        h: '故意给出两种标准差',
        p: '如果这些数字就是全部——全班每个人的分数、整个赛季的每场比赛——就除以 n（总体）。如果它们是从更大的群体里抽出来的一部分，就除以 n−1（样本，贝塞尔校正）：样本自己的平均数比真实平均数更贴近样本，除以 n 会把离散程度算小。样本越小，两者差得越多。',
      },
    ],
    faq: [
      { q: '我该用哪种标准差？', a: '问一句：数据是全部，还是抽样？用全班 30 人自己的分数评价这 30 人：总体（n）。问 30 个人来推断整座城市：样本（n−1）。n 很大时两者几乎一样，所以这个选择在小数据里才要紧。' },
      { q: '为什么我的平均数和中位数差这么远？', a: '数据偏了——一侧少数几个值把平均数拽了过去，中位数却纹丝不动。工资是最经典的例子：一位高管的薪水就能抬高整个办公室的平均数。两者不一致时，中位数通常才是诚实的概括。' },
      { q: '"没有众数"是什么意思？', a: '你列表里的每个值都恰好只出现一次，没有哪个"最常见"。众数主要对会重复的数据有用——鞋码、问卷选项、骰子点数。对小数位很多的测量值，它几乎说明不了什么。' },
    ],
    ui: {
      input: '你的数字', placeholder: '85, 92, 78, 95, 88',
      hint: '逗号、空格、换行都可以', clear: '清空',
      mean: '平均数', count: '个数', sum: '总和',
      median: '中位数', mode: '众数', noMode: '没有（每个值只出现一次）',
      minMax: '最小 · 最大', range: '极差',
      sampleSd: '样本标准差 (n−1)', needTwo: '至少需要 2 个值',
      popSd: '总体标准差 (n)',
      skewNote: '平均数和中位数离得很远。数据被拖向了一边，用中位数来描述这组数比平均数更诚实。',
    },
  },
  'zh-hant': {
    title: '平均數、中位數與標準差計算機',
    desc: '貼上一串數字，一次算出平均數、中位數、眾數、全距和兩種標準差',
    short: '平均數 · 中位數 · 標準差',
    intro: [
      {
        h: '只看平均數會被騙',
        p: '0、0、0、0、100 的平均數是 20——可沒有一個數靠近 20。當資料擠在一邊，或混進一個特別大的值時，平均數就不再代表什麼。所以要把中位數擺在旁邊看：這組數的中位數是 0，它說的才是實話。',
      },
      {
        h: '中位數和眾數',
        p: '把數值從小到大排開，正中間那個就是中位數；個數是偶數時，取中間兩個的平均。一個天大的值也幾乎挪不動它，所以收入、房價這類一邊拖長尾巴的資料，幾乎都用中位數來說。眾數是出現次數最多的值——如果每個值都只出現一次，就沒有眾數。',
      },
      {
        h: '刻意給出兩種標準差',
        p: '如果這些數字就是全部——全班每個人的分數、整個賽季的每場比賽——就除以 n（母體）。如果它們是從更大的群體裡抽出來的一部分，就除以 n−1（樣本，貝塞爾校正）：樣本自己的平均數比真實平均數更貼近樣本，除以 n 會把離散程度算小。樣本越小，兩者差得越多。',
      },
    ],
    faq: [
      { q: '我該用哪種標準差？', a: '問一句：資料是全部，還是抽樣？用全班 30 人自己的分數評價這 30 人：母體（n）。問 30 個人來推斷整座城市：樣本（n−1）。n 很大時兩者幾乎一樣，所以這個選擇在小資料裡才要緊。' },
      { q: '為什麼我的平均數和中位數差這麼遠？', a: '資料偏了——一側少數幾個值把平均數拽了過去，中位數卻紋絲不動。薪水是最經典的例子：一位高階主管的薪酬就能抬高整個辦公室的平均數。兩者不一致時，中位數通常才是誠實的概括。' },
      { q: '「沒有眾數」是什麼意思？', a: '你清單裡的每個值都恰好只出現一次，沒有哪個「最常見」。眾數主要對會重複的資料有用——鞋號、問卷選項、骰子點數。對小數位很多的測量值，它幾乎說明不了什麼。' },
    ],
    ui: {
      input: '你的數字', placeholder: '85, 92, 78, 95, 88',
      hint: '逗號、空格、換行都可以', clear: '清空',
      mean: '平均數', count: '個數', sum: '總和',
      median: '中位數', mode: '眾數', noMode: '沒有（每個值只出現一次）',
      minMax: '最小 · 最大', range: '全距',
      sampleSd: '樣本標準差 (n−1)', needTwo: '至少需要 2 個值',
      popSd: '母體標準差 (n)',
      skewNote: '平均數和中位數離得很遠。資料被拖向了一邊，用中位數來描述這組數比平均數更誠實。',
    },
  },
};

export const RENTAL_YIELD: CalcTable = {
  en: {
    title: 'Rental yield calculator',
    desc: 'Gross rental yield and the yield on your actual cash, from price, rent, loan and running costs',
    short: 'Gross yield · yield on cash invested',
    intro: [
      {
        h: 'Two yields, side by side',
        p: 'The yield printed in a property listing is usually the gross one: annual rent divided by the purchase price. Rent of 1,000 a month on a 300,000 property makes 12,000 a year — a 4% gross yield. It is easy to compute and easy to flatter with, because it ignores purchase costs, the loan and every running expense. Use it only to compare listings roughly.',
      },
      {
        h: 'The yield that matters is on your own cash',
        p: 'Take the rent, subtract loan interest and running costs, and divide by the money you actually put in: price plus purchase costs, minus the deposit you hold and the loan. Borrowing shrinks that denominator, so the same property can show a 4% gross yield and a 9% return on your cash — and exactly the same lever swings the other way when rates rise or the place sits empty.',
      },
      {
        h: 'This is a cash-flow estimate, nothing more',
        p: 'Vacancy between tenants, repairs when they leave, property taxes on holding, and the gain or loss when you eventually sell are all outside this calculation. Rental yield only describes the money flowing while you hold — a full investment decision needs the tax and price outlook on top.',
      },
    ],
    faq: [
      { q: 'What belongs in purchase costs?', a: 'Everything paid to acquire beyond the price itself: transfer or stamp taxes, agent commission, legal and registration fees. In many countries these add several percent to the price, and since they raise the cash you invested, they quietly lower the true yield.' },
      { q: 'Why does borrowing more raise the yield?', a: 'Interest reduces the income a little while the loan reduces your invested cash a lot — as long as the loan rate is below the property yield, the return on your remaining cash climbs. When the rate rises above the yield, the same lever reverses and can push the result negative. This calculator shows that minus sign rather than hiding it.' },
      { q: 'What do I put in the deposit field?', a: 'A refundable tenant deposit that you hold reduces the cash you have tied up, which is why it is subtracted. If the deposit in your market is small, or the law requires it to sit in an escrow account you cannot touch, enter 0.' },
    ],
    ui: {
      property: 'The property', price: 'Purchase price', rent: 'Monthly rent',
      deposit: 'Tenant deposit you hold', depositHint: 'Refundable deposit held by you — enter 0 if it sits in escrow or is negligible',
      acqCost: 'Purchase costs', acqHint: 'Taxes, agent, legal fees — everything paid on top of the price',
      financing: 'Loan and running costs (optional)', loan: 'Loan amount', loanRate: 'Loan interest rate (%/yr)',
      monthlyCost: 'Monthly running costs', costHint: 'Management, maintenance reserve — 0 if none',
      calc: 'Calculate', netTitle: 'Yield on cash invested',
      undef: 'Not defined', undefNote: 'Deposit plus loan covers the whole price — no cash of your own is invested (infinite leverage). Only the gross yield is meaningful here.',
      grossLabel: 'Gross yield', investedLabel: 'Cash invested',
      breakdown: 'The arithmetic', annualRent: 'Annual rent (monthly × 12)',
      minusCosts: '− annual running costs', minusInterest: '− annual loan interest',
      netIncome: 'Net annual income', invested: 'Cash invested',
      formula: 'price + purchase costs − deposit − loan',
      payback: 'Payback of cash', yearsSuffix: 'yr',
      note: 'The currency is whatever you enter — every money field must just use the same one. Vacancy, repairs and taxes are not included.',
    },
  },
  es: {
    title: 'Calculadora de rentabilidad del alquiler',
    desc: 'Rentabilidad bruta del alquiler y rentabilidad sobre tu dinero real, con precio, renta, hipoteca y gastos',
    short: 'Rentabilidad bruta · sobre el capital invertido',
    intro: [
      {
        h: 'Dos rentabilidades, una al lado de la otra',
        p: 'La rentabilidad que aparece en un anuncio suele ser la bruta: la renta anual dividida por el precio de compra. Un alquiler de 1.000 al mes sobre un piso de 300.000 son 12.000 al año — un 4% bruto. Es fácil de calcular y fácil de maquillar, porque ignora los gastos de compra, el préstamo y todos los costes corrientes. Sirve solo para comparar anuncios a grandes rasgos.',
      },
      {
        h: 'La que importa es la rentabilidad sobre tu dinero',
        p: 'Toma la renta, resta los intereses del préstamo y los gastos corrientes, y divide por el dinero que pusiste de verdad: precio más gastos de compra, menos la fianza que retienes y el préstamo. Endeudarse encoge ese denominador, así que el mismo piso puede dar un 4% bruto y un 9% sobre tu capital — y exactamente la misma palanca gira en contra cuando suben los tipos o el piso se queda vacío.',
      },
      {
        h: 'Es una estimación de flujo de caja, nada más',
        p: 'Los meses sin inquilino, las reparaciones al cambiarlo, los impuestos por tener el inmueble y la ganancia o pérdida al venderlo quedan fuera de este cálculo. La rentabilidad del alquiler solo describe el dinero que fluye mientras lo tienes — una decisión de inversión completa exige añadir impuestos y perspectiva de precios.',
      },
    ],
    faq: [
      { q: '¿Qué entra en los gastos de compra?', a: 'Todo lo pagado por adquirir además del precio: impuestos de transmisión, comisión de agencia, notaría y registro. En muchos países suman varios puntos porcentuales del precio, y como aumentan el dinero invertido, bajan en silencio la rentabilidad real.' },
      { q: '¿Por qué pedir más préstamo sube la rentabilidad?', a: 'Los intereses recortan un poco el ingreso, pero el préstamo recorta mucho tu capital invertido — mientras el tipo del préstamo esté por debajo de la rentabilidad del inmueble, el rendimiento de tu dinero restante sube. Cuando el tipo supera la rentabilidad, la palanca se invierte y puede dejar el resultado en negativo. Esta calculadora muestra ese signo menos en vez de esconderlo.' },
      { q: '¿Qué pongo en el campo de la fianza?', a: 'Una fianza reembolsable que tú retienes reduce el dinero que tienes inmovilizado, y por eso se resta. Si en tu mercado la fianza es pequeña, o la ley obliga a depositarla en un organismo que no puedes tocar, pon 0.' },
    ],
    ui: {
      property: 'El inmueble', price: 'Precio de compra', rent: 'Renta mensual',
      deposit: 'Fianza que retienes', depositHint: 'Fianza reembolsable en tu poder — pon 0 si está depositada o es simbólica',
      acqCost: 'Gastos de compra', acqHint: 'Impuestos, agencia, notaría — todo lo pagado además del precio',
      financing: 'Préstamo y gastos corrientes (opcional)', loan: 'Importe del préstamo', loanRate: 'Interés del préstamo (%/año)',
      monthlyCost: 'Gastos mensuales', costHint: 'Comunidad, reserva para reparaciones — 0 si no hay',
      calc: 'Calcular', netTitle: 'Rentabilidad sobre el capital invertido',
      undef: 'No definida', undefNote: 'La fianza más el préstamo cubren todo el precio: no hay dinero tuyo invertido (apalancamiento infinito). Aquí solo tiene sentido la rentabilidad bruta.',
      grossLabel: 'Rentabilidad bruta', investedLabel: 'Capital invertido',
      breakdown: 'Las cuentas', annualRent: 'Renta anual (mensual × 12)',
      minusCosts: '− gastos corrientes anuales', minusInterest: '− intereses anuales del préstamo',
      netIncome: 'Ingreso neto anual', invested: 'Capital invertido',
      formula: 'precio + gastos de compra − fianza − préstamo',
      payback: 'Recuperación del capital', yearsSuffix: 'años',
      note: 'La moneda es la que introduzcas: usa la misma en todos los campos de dinero. No incluye vacancia, reparaciones ni impuestos.',
    },
  },
  'pt-br': {
    title: 'Calculadora de rentabilidade do aluguel',
    desc: 'Rentabilidade bruta do aluguel e retorno sobre o dinheiro que você realmente investiu, com preço, aluguel, financiamento e custos',
    short: 'Rentabilidade bruta · sobre o capital investido',
    intro: [
      {
        h: 'Duas rentabilidades, lado a lado',
        p: 'A rentabilidade impressa no anúncio costuma ser a bruta: o aluguel anual dividido pelo preço de compra. Um aluguel de 1.000 por mês num imóvel de 300.000 dá 12.000 por ano — 4% bruto. É fácil de calcular e fácil de enfeitar, porque ignora os custos da compra, o financiamento e toda despesa corrente. Serve só para comparar anúncios por alto.',
      },
      {
        h: 'A que importa é a rentabilidade sobre o seu dinheiro',
        p: 'Pegue o aluguel, subtraia os juros do financiamento e os custos correntes, e divida pelo dinheiro que você de fato colocou: preço mais custos de compra, menos a caução que você retém e o financiamento. A dívida encolhe esse denominador, então o mesmo imóvel pode mostrar 4% bruto e 9% sobre o seu capital — e exatamente a mesma alavanca vira contra você quando os juros sobem ou o imóvel fica vazio.',
      },
      {
        h: 'É uma estimativa de fluxo de caixa, nada além',
        p: 'Os meses sem inquilino, os reparos na troca, os impostos de manter o imóvel e o ganho ou perda na venda futura ficam fora desta conta. A rentabilidade do aluguel só descreve o dinheiro que circula enquanto você é dono — uma decisão de investimento completa precisa somar impostos e perspectiva de preço.',
      },
    ],
    faq: [
      { q: 'O que entra nos custos de compra?', a: 'Tudo o que se paga para adquirir além do preço: imposto de transmissão, corretagem, cartório e registro. Em muitos lugares isso soma vários por cento do preço, e como aumenta o dinheiro investido, reduz em silêncio a rentabilidade verdadeira.' },
      { q: 'Por que financiar mais aumenta a rentabilidade?', a: 'Os juros cortam um pouco a receita, mas o financiamento corta muito o seu capital investido — enquanto a taxa do financiamento estiver abaixo da rentabilidade do imóvel, o retorno sobre o dinheiro que sobrou sobe. Quando a taxa passa da rentabilidade, a alavanca inverte e pode deixar o resultado negativo. Esta calculadora mostra o sinal de menos em vez de escondê-lo.' },
      { q: 'O que coloco no campo da caução?', a: 'Uma caução devolvível que fica com você reduz o dinheiro que você tem parado, por isso é subtraída. Se no seu mercado a caução é pequena, ou a lei manda depositá-la onde você não pode tocar, coloque 0.' },
    ],
    ui: {
      property: 'O imóvel', price: 'Preço de compra', rent: 'Aluguel mensal',
      deposit: 'Caução que fica com você', depositHint: 'Caução devolvível em seu poder — coloque 0 se for depositada ou simbólica',
      acqCost: 'Custos de compra', acqHint: 'Impostos, corretagem, cartório — tudo pago além do preço',
      financing: 'Financiamento e custos correntes (opcional)', loan: 'Valor financiado', loanRate: 'Juros do financiamento (%/ano)',
      monthlyCost: 'Custos mensais', costHint: 'Condomínio, reserva para reparos — 0 se não houver',
      calc: 'Calcular', netTitle: 'Retorno sobre o capital investido',
      undef: 'Não definido', undefNote: 'Caução mais financiamento cobrem o preço inteiro: não há dinheiro seu investido (alavancagem infinita). Aqui só a rentabilidade bruta faz sentido.',
      grossLabel: 'Rentabilidade bruta', investedLabel: 'Capital investido',
      breakdown: 'A conta', annualRent: 'Aluguel anual (mensal × 12)',
      minusCosts: '− custos correntes anuais', minusInterest: '− juros anuais do financiamento',
      netIncome: 'Renda líquida anual', invested: 'Capital investido',
      formula: 'preço + custos de compra − caução − financiamento',
      payback: 'Recuperação do capital', yearsSuffix: 'anos',
      note: 'A moeda é a que você digitar — use a mesma em todos os campos de dinheiro. Vacância, reparos e impostos não estão incluídos.',
    },
  },
  ja: {
    title: '不動産投資の利回り計算機（表面・実質）',
    desc: '価格・家賃・ローン・経費から、表面利回りと自己資金に対する実質の利回りを並べて出します',
    short: '表面利回りと自己資金利回り',
    intro: [
      {
        h: '利回りは2つ並べて見るものです',
        p: '物件広告に載っている利回りはたいてい表面利回り — 年間家賃を物件価格で割った値です。価格30万の物件に月1,000の家賃なら年12,000で、表面4%。計算が簡単なぶん見栄えも良くなります。購入時の諸費用もローンも経費も無視しているからで、物件同士をざっくり比べるときにだけ使う数字です。',
      },
      {
        h: '効くのは自己資金に対する利回りです',
        p: '家賃からローン利息と経費を引き、実際に出した自分のお金 — 価格に諸費用を足し、預かっている敷金とローンを引いた額 — で割ります。借入はこの分母を縮めるので、同じ物件が表面4%なのに自己資金では9%に見えたりします。そして金利が上がるか空室が続くと、まったく同じてこが逆向きに働きます。',
      },
      {
        h: 'これは保有中の現金の流れだけの推計です',
        p: '入居者の入れ替わりの空室、退去時の修繕、保有中の税金、そしていつか売るときの損益は、この計算の外にあります。利回りは持っている間のお金の流れを表すだけの指標なので、投資の判断には税金と価格の見通しを重ねる必要があります。',
      },
    ],
    faq: [
      { q: '諸費用には何を入れますか。', a: '価格のほかに取得のために払ったもの全部です。不動産取得にかかる税金、仲介手数料、登記や司法の費用。国によっては価格の数%になり、投じたお金を増やすぶん、本当の利回りを静かに下げます。' },
      { q: '借入を増やすと利回りが上がるのはなぜですか。', a: '利息は収入を少し減らすだけですが、借入は自己資金を大きく減らします。ローン金利が物件の利回りを下回っている限り、残った自己資金に対する利回りは上がります。金利が利回りを上回ると同じてこが逆回転し、結果がマイナスになることもあります。この計算機はそのマイナスを隠さず表示します。',
      },
      { q: '敷金の欄には何を入れますか。', a: '自分の手元に置ける返還前提の敷金・保証金は、寝かせているお金を減らすので差し引きます。額がわずかだったり、法律で供託先に預けて手を付けられない場合は0を入れてください。' },
    ],
    ui: {
      property: '物件', price: '購入価格', rent: '月額家賃',
      deposit: '預かる敷金・保証金', depositHint: '手元に置ける返還前提の預り金 — 供託される・ごく少額なら0',
      acqCost: '購入時の諸費用', acqHint: '税金・仲介手数料・登記など、価格のほかに払ったもの',
      financing: 'ローンと経費（任意）', loan: '借入額', loanRate: 'ローン金利（%/年）',
      monthlyCost: '月々の経費', costHint: '管理費・修繕の積み立てなど — なければ0',
      calc: '計算する', netTitle: '自己資金に対する利回り',
      undef: '定義できません', undefNote: '敷金とローンで価格全体がまかなえていて、自分のお金が入っていません（無限レバレッジ）。ここでは表面利回りだけが意味を持ちます。',
      grossLabel: '表面利回り', investedLabel: '自己資金',
      breakdown: '内訳', annualRent: '年間家賃（月額 × 12）',
      minusCosts: '− 年間の経費', minusInterest: '− 年間のローン利息',
      netIncome: '年間の手取り', invested: '自己資金',
      formula: '価格 + 諸費用 − 敷金 − 借入',
      payback: '自己資金の回収', yearsSuffix: '年',
      note: '通貨は入力したものです — お金の欄はすべて同じ通貨でそろえてください。空室・修繕・税金は含みません。',
    },
  },
  de: {
    title: 'Mietrendite-Rechner',
    desc: 'Bruttomietrendite und Rendite auf das tatsächlich eingesetzte Eigenkapital — aus Kaufpreis, Miete, Darlehen und Kosten',
    short: 'Mietrendite brutto · auf das Eigenkapital',
    intro: [
      {
        h: 'Zwei Renditen, nebeneinander',
        p: 'Die Rendite im Exposé ist meist die Bruttomietrendite: Jahresmiete geteilt durch den Kaufpreis. 1.000 Miete im Monat auf eine Wohnung für 300.000 sind 12.000 im Jahr — 4% brutto. Sie ist leicht zu rechnen und leicht zu schönen, weil sie Kaufnebenkosten, Darlehen und alle laufenden Kosten ignoriert. Zum groben Vergleich von Angeboten taugt sie, für mehr nicht.',
      },
      {
        h: 'Entscheidend ist die Rendite auf Ihr eigenes Geld',
        p: 'Nehmen Sie die Miete, ziehen Sie Darlehenszinsen und laufende Kosten ab und teilen Sie durch das Geld, das Sie wirklich eingesetzt haben: Kaufpreis plus Nebenkosten, minus die Kaution in Ihrer Hand und das Darlehen. Fremdkapital schrumpft diesen Nenner — dieselbe Wohnung kann 4% brutto und 9% auf Ihr Eigenkapital zeigen. Und exakt derselbe Hebel schlägt zurück, wenn die Zinsen steigen oder die Wohnung leer steht.',
      },
      {
        h: 'Eine Cashflow-Schätzung, nicht mehr',
        p: 'Leerstand zwischen Mietern, Reparaturen beim Wechsel, Steuern während des Haltens und der Gewinn oder Verlust beim späteren Verkauf liegen außerhalb dieser Rechnung. Die Mietrendite beschreibt nur das Geld, das während des Besitzes fließt — eine vollständige Anlageentscheidung braucht Steuern und Preiserwartung obendrauf.',
      },
    ],
    faq: [
      { q: 'Was gehört zu den Kaufnebenkosten?', a: 'Alles, was über den Preis hinaus für den Erwerb gezahlt wird: Grunderwerbsteuer, Maklerprovision, Notar und Grundbuch. Das summiert sich vielerorts auf mehrere Prozent des Preises — und weil es das eingesetzte Geld erhöht, drückt es die wahre Rendite still nach unten.' },
      { q: 'Warum steigt die Rendite, wenn ich mehr leihe?', a: 'Die Zinsen mindern die Einnahmen ein wenig, das Darlehen mindert Ihr eingesetztes Kapital stark — solange der Darlehenszins unter der Objektrendite liegt, klettert die Rendite auf Ihr restliches Geld. Steigt der Zins über die Rendite, dreht derselbe Hebel um und kann das Ergebnis negativ machen. Dieser Rechner zeigt das Minuszeichen, statt es zu verstecken.' },
      { q: 'Was trage ich bei der Kaution ein?', a: 'Eine rückzahlbare Kaution, die bei Ihnen liegt, verringert Ihr gebundenes Geld und wird deshalb abgezogen. Ist die Kaution klein oder muss sie per Gesetz auf ein getrenntes Konto, das Sie nicht anfassen dürfen, tragen Sie 0 ein.' },
    ],
    ui: {
      property: 'Das Objekt', price: 'Kaufpreis', rent: 'Monatsmiete',
      deposit: 'Kaution in Ihrer Hand', depositHint: 'Rückzahlbare Kaution bei Ihnen — 0, wenn sie getrennt verwahrt wird oder gering ist',
      acqCost: 'Kaufnebenkosten', acqHint: 'Steuern, Makler, Notar — alles, was zusätzlich zum Preis anfiel',
      financing: 'Darlehen und laufende Kosten (optional)', loan: 'Darlehensbetrag', loanRate: 'Darlehenszins (%/Jahr)',
      monthlyCost: 'Monatliche Kosten', costHint: 'Verwaltung, Instandhaltungsrücklage — 0, wenn keine',
      calc: 'Berechnen', netTitle: 'Rendite auf das Eigenkapital',
      undef: 'Nicht definiert', undefNote: 'Kaution plus Darlehen decken den ganzen Preis — es steckt kein eigenes Geld im Objekt (unendlicher Hebel). Aussagekräftig ist hier nur die Bruttorendite.',
      grossLabel: 'Bruttomietrendite', investedLabel: 'Eingesetztes Kapital',
      breakdown: 'Die Rechnung', annualRent: 'Jahresmiete (monatlich × 12)',
      minusCosts: '− laufende Kosten im Jahr', minusInterest: '− Darlehenszinsen im Jahr',
      netIncome: 'Jahresüberschuss', invested: 'Eingesetztes Kapital',
      formula: 'Kaufpreis + Nebenkosten − Kaution − Darlehen',
      payback: 'Rückfluss des Kapitals', yearsSuffix: 'J.',
      note: 'Die Währung ist die Ihrer Eingabe — alle Geldfelder müssen nur dieselbe verwenden. Leerstand, Reparaturen und Steuern sind nicht enthalten.',
    },
  },
  fr: {
    title: 'Calculateur de rendement locatif',
    desc: 'Rendement locatif brut et rendement sur les fonds réellement engagés, à partir du prix, du loyer, du prêt et des charges',
    short: 'Rendement locatif brut · sur fonds propres',
    intro: [
      {
        h: 'Deux rendements, côte à côte',
        p: 'Le rendement affiché dans une annonce est presque toujours le brut : le loyer annuel divisé par le prix d’achat. Un loyer de 1 000 par mois sur un bien à 300 000 fait 12 000 par an — 4 % brut. Facile à calculer, facile à embellir : il ignore les frais d’acquisition, le prêt et toutes les charges. Il ne sert qu’à comparer grossièrement des annonces.',
      },
      {
        h: 'Celui qui compte : le rendement sur votre argent',
        p: 'Prenez le loyer, retranchez les intérêts du prêt et les charges, puis divisez par l’argent réellement sorti de votre poche : prix plus frais d’acquisition, moins le dépôt de garantie que vous détenez et le prêt. L’emprunt rétrécit ce dénominateur : le même bien peut afficher 4 % brut et 9 % sur vos fonds propres — et le même levier joue en sens inverse dès que les taux montent ou que le logement reste vide.',
      },
      {
        h: 'Une estimation de trésorerie, rien de plus',
        p: 'La vacance entre deux locataires, les travaux à la sortie, les impôts pendant la détention et la plus ou moins-value à la revente restent hors du calcul. Le rendement locatif ne décrit que l’argent qui circule pendant que vous détenez le bien — une vraie décision d’investissement exige d’y ajouter fiscalité et perspective de prix.',
      },
    ],
    faq: [
      { q: 'Que mettre dans les frais d’acquisition ?', a: 'Tout ce qui est payé pour acquérir au-delà du prix : droits de mutation, commission d’agence, notaire et enregistrement. Dans bien des pays cela ajoute plusieurs pour cent au prix — et comme cela gonfle l’argent investi, cela rabote discrètement le rendement réel.' },
      { q: 'Pourquoi emprunter davantage augmente-t-il le rendement ?', a: 'Les intérêts rognent un peu le revenu, mais le prêt rogne beaucoup vos fonds engagés — tant que le taux du prêt reste sous le rendement du bien, le rendement de l’argent restant grimpe. Quand le taux dépasse le rendement, le levier s’inverse et peut rendre le résultat négatif. Ce calculateur affiche ce signe moins au lieu de le cacher.' },
      { q: 'Que saisir dans le champ du dépôt de garantie ?', a: 'Un dépôt restituable que vous conservez réduit l’argent que vous immobilisez, d’où sa soustraction. S’il est modeste, ou si la loi impose de le consigner sur un compte que vous ne pouvez pas toucher, saisissez 0.' },
    ],
    ui: {
      property: 'Le bien', price: 'Prix d’achat', rent: 'Loyer mensuel',
      deposit: 'Dépôt de garantie détenu', depositHint: 'Dépôt restituable entre vos mains — 0 s’il est consigné ou négligeable',
      acqCost: 'Frais d’acquisition', acqHint: 'Droits, agence, notaire — tout ce qui s’ajoute au prix',
      financing: 'Prêt et charges (facultatif)', loan: 'Montant du prêt', loanRate: 'Taux du prêt (%/an)',
      monthlyCost: 'Charges mensuelles', costHint: 'Gestion, provision pour travaux — 0 si aucune',
      calc: 'Calculer', netTitle: 'Rendement sur fonds propres',
      undef: 'Non défini', undefNote: 'Dépôt plus prêt couvrent tout le prix : aucun argent à vous n’est engagé (levier infini). Seul le rendement brut a un sens ici.',
      grossLabel: 'Rendement brut', investedLabel: 'Fonds engagés',
      breakdown: 'Le détail', annualRent: 'Loyer annuel (mensuel × 12)',
      minusCosts: '− charges annuelles', minusInterest: '− intérêts annuels du prêt',
      netIncome: 'Revenu net annuel', invested: 'Fonds engagés',
      formula: 'prix + frais d’acquisition − dépôt − prêt',
      payback: 'Récupération des fonds', yearsSuffix: 'ans',
      note: 'La devise est celle que vous saisissez — utilisez simplement la même dans tous les champs d’argent. Vacance, travaux et impôts ne sont pas comptés.',
    },
  },
  hi: {
    title: 'रेंटल यील्ड कैलकुलेटर',
    desc: 'दाम, किराया, लोन और ख़र्चों से सकल रेंटल यील्ड और अपने असली लगाए पैसे पर रिटर्न — दोनों एक साथ',
    short: 'सकल यील्ड · लगाए पैसे पर रिटर्न',
    intro: [
      {
        h: 'यील्ड दो हैं, दोनों साथ देखिए',
        p: 'विज्ञापन में छपी यील्ड आमतौर पर सकल (ग्रॉस) होती है: सालाना किराया भाग ख़रीद का दाम। 300,000 के मकान पर महीने का 1,000 किराया यानी साल के 12,000 — सकल 4%। यह गिनने में आसान है और दिखाने में सुंदर, क्योंकि यह ख़रीद के ख़र्चे, लोन और हर चालू ख़र्च को अनदेखा करती है। इसका काम बस मकानों की मोटी तुलना है।',
      },
      {
        h: 'असल चीज़ है अपने पैसे पर रिटर्न',
        p: 'किराए में से लोन का ब्याज और चालू ख़र्चे घटाइए, फिर उस पैसे से भाग दीजिए जो सचमुच आपकी जेब से गया: दाम और ख़रीद के ख़र्चे जोड़कर, आपके पास रखी जमानत राशि और लोन घटाकर। उधार यह हर छोटा कर देता है — वही मकान सकल 4% दिखाते हुए आपके पैसे पर 9% दे सकता है। और ठीक वही उठान उल्टी चल पड़ती है जब ब्याज चढ़ता है या मकान ख़ाली बैठता है।',
      },
      {
        h: 'यह सिर्फ़ नक़दी-प्रवाह का अनुमान है',
        p: 'किराएदारों के बीच के ख़ाली महीने, बदलते वक़्त की मरम्मत, मकान रखने के टैक्स, और आगे बेचने पर होने वाला नफ़ा-नुक़सान — सब इस गिनती के बाहर हैं। रेंटल यील्ड सिर्फ़ मकान रखते हुए बहते पैसे की बात करती है; पूरा निवेश-फ़ैसला करने के लिए टैक्स और दामों का अनुमान ऊपर से जोड़ना पड़ता है।',
      },
    ],
    faq: [
      { q: 'ख़रीद के ख़र्चों में क्या-क्या आता है?', a: 'दाम के अलावा ख़रीदने में जो भी लगा: स्टाम्प ड्यूटी या रजिस्ट्री का टैक्स, दलाली, वकील और पंजीकरण की फ़ीस। कई देशों में ये दाम का कई प्रतिशत बैठते हैं, और लगाया पैसा बढ़ाते हैं, इसलिए असली यील्ड को चुपचाप नीचे खींचते हैं।' },
      { q: 'ज़्यादा लोन लेने से यील्ड क्यों बढ़ती है?', a: 'ब्याज आमदनी थोड़ी घटाता है, पर लोन आपका लगाया पैसा बहुत घटा देता है — जब तक लोन की दर मकान की यील्ड से नीचे है, बचे पैसे पर रिटर्न चढ़ता है। दर यील्ड से ऊपर निकलते ही वही उठान उलट जाती है और नतीजा माइनस में जा सकता है। यह कैलकुलेटर वह माइनस छिपाता नहीं, दिखाता है।' },
      { q: 'जमानत राशि के खाने में क्या भरूँ?', a: 'लौटाई जाने वाली जो जमानत आपके पास रहती है, वह आपका फँसा पैसा घटाती है — इसीलिए घटाई जाती है। अगर आपके यहाँ जमानत मामूली है, या क़ानून उसे ऐसी जगह जमा कराता है जहाँ आप हाथ नहीं लगा सकते, तो 0 भर दीजिए।' },
    ],
    ui: {
      property: 'मकान', price: 'ख़रीद का दाम', rent: 'महीने का किराया',
      deposit: 'आपके पास रखी जमानत राशि', depositHint: 'लौटाने वाली जमानत जो आपके पास रहे — कहीं और जमा हो या मामूली हो तो 0',
      acqCost: 'ख़रीद के ख़र्चे', acqHint: 'टैक्स, दलाली, रजिस्ट्री — दाम के ऊपर जो भी लगा',
      financing: 'लोन और चालू ख़र्चे (वैकल्पिक)', loan: 'लोन की रक़म', loanRate: 'लोन की ब्याज दर (%/साल)',
      monthlyCost: 'महीने के ख़र्चे', costHint: 'रख-रखाव, मरम्मत का कोष — न हों तो 0',
      calc: 'गणना करें', netTitle: 'लगाए पैसे पर रिटर्न',
      undef: 'तय नहीं होता', undefNote: 'जमानत और लोन मिलकर पूरा दाम ढक देते हैं — आपका अपना पैसा लगा ही नहीं (अनंत लीवरेज)। यहाँ सिर्फ़ सकल यील्ड का मतलब है।',
      grossLabel: 'सकल यील्ड', investedLabel: 'लगाया पैसा',
      breakdown: 'हिसाब', annualRent: 'सालाना किराया (महीना × 12)',
      minusCosts: '− साल के चालू ख़र्चे', minusInterest: '− साल का लोन ब्याज',
      netIncome: 'सालाना शुद्ध आमदनी', invested: 'लगाया पैसा',
      formula: 'दाम + ख़रीद के ख़र्चे − जमानत − लोन',
      payback: 'पैसा वापस आने में', yearsSuffix: 'साल',
      note: 'मुद्रा वही है जो आप डालें — बस सभी पैसे वाले खानों में एक ही रखिए। ख़ाली महीने, मरम्मत और टैक्स शामिल नहीं।',
    },
  },
  'zh-hans': {
    title: '租金回报率计算器',
    desc: '按房价、租金、贷款和持有成本，同时算出毛回报率和实际投入资金的回报率',
    short: '租金回报率 · 自有资金回报',
    intro: [
      {
        h: '回报率要两个一起看',
        p: '房源广告里印的回报率通常是毛回报率：年租金除以买入价。30 万的房子月租 1,000，一年 12,000——毛回报 4%。它好算，也好看，因为它无视了购房税费、贷款和一切持有开销。它只配用来在房源之间做粗略比较。',
      },
      {
        h: '真正要紧的，是你自己那笔钱的回报',
        p: '拿租金减去贷款利息和持有开销，再除以你真正掏出去的钱：买入价加购房费用，减去押在你手里的押金和贷款。借款把这个分母缩小，所以同一套房子可以毛回报 4%，自有资金回报却是 9%——而利率一涨、房子一空，同一根杠杆就朝反方向压过来。',
      },
      {
        h: '这只是持有期间的现金流估算',
        p: '换租客之间的空置、退租时的维修、持有期间的税，以及将来卖出的赚赔，都不在这笔账里。租金回报率只描述持有期间流动的钱——完整的投资判断，还得把税和房价走势叠上去。',
      },
    ],
    faq: [
      { q: '购房费用都算哪些？', a: '除了房价之外为买下它付出的一切：契税或印花税、中介佣金、律师和登记费。在很多国家这些加起来是房价的好几个百分点，而且它们增大了你投入的钱，于是悄悄压低了真实回报率。' },
      { q: '为什么多贷款反而回报率更高？', a: '利息只让收入少一点，贷款却让你投入的钱少很多——只要贷款利率低于房子的回报率，剩下那笔自有资金的回报就往上走。一旦利率越过回报率，同一根杠杆倒转，结果可能变成负数。这个计算器会把负号亮出来，不藏。' },
      { q: '押金一栏该填什么？', a: '押在你手里、以后要退还的押金，减少了你占用的资金，所以要减掉。如果你那里押金很小，或者法律要求托管到你动不了的账户，就填 0。' },
    ],
    ui: {
      property: '房子', price: '买入价', rent: '月租金',
      deposit: '押在你手里的押金', depositHint: '由你保管、日后退还的押金——托管或金额很小就填 0',
      acqCost: '购房费用', acqHint: '税费、中介、登记——房价之外付的一切',
      financing: '贷款与持有成本（可选）', loan: '贷款金额', loanRate: '贷款利率（%/年）',
      monthlyCost: '每月持有成本', costHint: '物业、维修准备金——没有就填 0',
      calc: '计算', netTitle: '自有资金回报率',
      undef: '无法定义', undefNote: '押金加贷款盖过了整个房价——里面没有你自己的钱（无限杠杆）。这里只有毛回报率有意义。',
      grossLabel: '毛回报率', investedLabel: '投入资金',
      breakdown: '这笔账', annualRent: '年租金（月租 × 12）',
      minusCosts: '− 全年持有成本', minusInterest: '− 全年贷款利息',
      netIncome: '年净收入', invested: '投入资金',
      formula: '买入价 + 购房费用 − 押金 − 贷款',
      payback: '收回本金需要', yearsSuffix: '年',
      note: '货币就是你填入的那种——所有金额栏用同一种就行。空置、维修和税都没有算进来。',
    },
  },
  'zh-hant': {
    title: '租金報酬率計算機',
    desc: '按房價、租金、貸款和持有成本，同時算出毛報酬率和實際投入資金的報酬率',
    short: '租金報酬率 · 自有資金報酬',
    intro: [
      {
        h: '報酬率要兩個一起看',
        p: '房源廣告裡印的報酬率通常是毛報酬率：年租金除以買入價。30 萬的房子月租 1,000，一年 12,000——毛報酬 4%。它好算，也好看，因為它無視了購屋稅費、貸款和一切持有開銷。它只配用來在物件之間做粗略比較。',
      },
      {
        h: '真正要緊的，是你自己那筆錢的報酬',
        p: '拿租金減去貸款利息和持有開銷，再除以你真正掏出去的錢：買入價加購屋費用，減去押在你手裡的押金和貸款。借款把這個分母縮小，所以同一間房子可以毛報酬 4%，自有資金報酬卻是 9%——而利率一漲、房子一空，同一根槓桿就朝反方向壓過來。',
      },
      {
        h: '這只是持有期間的現金流估算',
        p: '換房客之間的空置、退租時的修繕、持有期間的稅，以及將來賣出的賺賠，都不在這筆帳裡。租金報酬率只描述持有期間流動的錢——完整的投資判斷，還得把稅和房價走勢疊上去。',
      },
    ],
    faq: [
      { q: '購屋費用都算哪些？', a: '除了房價之外為買下它付出的一切：契稅或印花稅、仲介佣金、代書和登記費。在很多國家這些加起來是房價的好幾個百分點，而且它們增大了你投入的錢，於是悄悄壓低了真實報酬率。' },
      { q: '為什麼多貸款反而報酬率更高？', a: '利息只讓收入少一點，貸款卻讓你投入的錢少很多——只要貸款利率低於房子的報酬率，剩下那筆自有資金的報酬就往上走。一旦利率越過報酬率，同一根槓桿倒轉，結果可能變成負數。這個計算機會把負號亮出來，不藏。' },
      { q: '押金一欄該填什麼？', a: '押在你手裡、以後要退還的押金，減少了你占用的資金，所以要減掉。如果你那裡押金很小，或者法律要求信託到你動不了的帳戶，就填 0。' },
    ],
    ui: {
      property: '房子', price: '買入價', rent: '月租金',
      deposit: '押在你手裡的押金', depositHint: '由你保管、日後退還的押金——信託保管或金額很小就填 0',
      acqCost: '購屋費用', acqHint: '稅費、仲介、登記——房價之外付的一切',
      financing: '貸款與持有成本（可選）', loan: '貸款金額', loanRate: '貸款利率（%/年）',
      monthlyCost: '每月持有成本', costHint: '管理費、修繕準備金——沒有就填 0',
      calc: '計算', netTitle: '自有資金報酬率',
      undef: '無法定義', undefNote: '押金加貸款蓋過了整個房價——裡面沒有你自己的錢（無限槓桿）。這裡只有毛報酬率有意義。',
      grossLabel: '毛報酬率', investedLabel: '投入資金',
      breakdown: '這筆帳', annualRent: '年租金（月租 × 12）',
      minusCosts: '− 全年持有成本', minusInterest: '− 全年貸款利息',
      netIncome: '年淨收入', invested: '投入資金',
      formula: '買入價 + 購屋費用 − 押金 − 貸款',
      payback: '收回本金需要', yearsSuffix: '年',
      note: '貨幣就是你填入的那種——所有金額欄用同一種就行。空置、修繕和稅都沒有算進來。',
    },
  },
};

export const APPLIANCE_POWER: CalcTable = {
  en: {
    title: 'Appliance electricity cost calculator',
    desc: 'What one appliance costs to run — kWh and money per day, month and year, from watts, hours and your tariff',
    short: 'Running cost of one appliance',
    intro: [
      {
        h: 'Watts × hours is the whole calculation',
        p: 'A 1,500 W heater running 8 hours uses 12 kWh a day; an 8 W LED bulb over the same 8 hours uses 0.064 kWh. Multiply by your price per kWh and you have the cost — per day, and from there per month and year. The ratio of wattages is the ratio of costs, which is why anything that makes heat dominates the bill.',
      },
      {
        h: 'Your price per kWh is on your bill, nowhere else',
        p: 'Electricity prices differ by country, by utility, and often by time of day or usage tier. The honest number is your own bill: divide the total amount by the kWh billed and you get your effective price, fixed charges included. That figure is what makes the yearly cost here real rather than hypothetical.',
      },
      {
        h: 'The label wattage is a ceiling, not a steady draw',
        p: 'Fridges, air conditioners and heaters cycle on and off around a target temperature — "on for 8 hours" rarely means 8 hours at full power. For those, the result here is an upper bound; a plug-in energy meter or the annual consumption printed on the label gets closer to the truth. A kettle or a hair dryer, by contrast, really does draw its full rating whenever it runs.',
      },
    ],
    faq: [
      { q: 'What do I enter as the price per kWh?', a: 'Read it off your electricity bill — no number here would survive crossing a border, and even neighbours on different tariffs pay differently. For a quick effective rate, divide the bill total by the kWh consumed; that folds fixed charges and taxes into one honest per-kWh price.' },
      { q: 'Does standby power actually matter?', a: 'One box drawing 5 W around the clock uses about 44 kWh a year — enter 5 W and 24 hours here to see it in your money. A single device is small; a shelf of set-top boxes, consoles and chargers becomes a steady, silent line on the bill.' },
      { q: 'Why does a heater cost hundreds of times what an LED does?', a: 'Making or moving heat takes kilowatts; running electronics takes watts. A 2,000 W heater against an 8 W bulb is a factor of 250 at identical hours. That is also where the savings are: one degree less heating outweighs any amount of light-switch discipline.' },
    ],
    ui: {
      section: 'The appliance', watts: 'Power (W)', hours: 'Hours per day',
      price: 'Price per kWh', calc: 'Calculate',
      costMonth: 'Cost per month', period: 'Period', day: 'Day', month: 'Month (30 days)', year: 'Year (365 days)',
      energy: 'Electricity (kWh)', cost: 'Cost',
      note: 'The currency is whatever you enter per kWh. Assumes a constant draw — appliances with thermostats cycle and use less.',
    },
  },
  es: {
    title: 'Calculadora de consumo eléctrico de electrodomésticos',
    desc: 'Lo que cuesta tener un aparato funcionando: kWh y dinero al día, al mes y al año, según vatios, horas y tu tarifa',
    short: 'Coste de uso de un aparato',
    intro: [
      {
        h: 'Vatios × horas: ese es todo el cálculo',
        p: 'Un calefactor de 1.500 W funcionando 8 horas gasta 12 kWh al día; una bombilla LED de 8 W, en esas mismas 8 horas, 0,064 kWh. Multiplica por tu precio del kWh y tienes el coste — al día, y de ahí al mes y al año. La proporción entre vatios es la proporción entre costes, y por eso todo lo que produce calor domina la factura.',
      },
      {
        h: 'Tu precio del kWh está en tu factura, no en otro sitio',
        p: 'El precio de la luz cambia según el país, la compañía y a menudo la hora o el tramo de consumo. El número honesto es el de tu propia factura: divide el importe total entre los kWh facturados y obtienes tu precio efectivo, con cargos fijos incluidos. Con esa cifra el coste anual de aquí deja de ser hipotético.',
      },
      {
        h: 'Los vatios de la etiqueta son un techo, no un consumo constante',
        p: 'Neveras, aires acondicionados y calefactores se encienden y apagan alrededor de una temperatura objetivo — «8 horas encendido» casi nunca son 8 horas a plena potencia. Para esos, el resultado de aquí es una cota superior; un medidor de enchufe o el consumo anual impreso en la etiqueta se acercan más. Un hervidor o un secador, en cambio, sí consumen su potencia completa siempre que funcionan.',
      },
    ],
    faq: [
      { q: '¿Qué pongo como precio del kWh?', a: 'Léelo en tu factura de la luz: ningún número puesto aquí sobreviviría a un cambio de país, y hasta dos vecinos con tarifas distintas pagan diferente. Para un precio efectivo rápido, divide el total de la factura entre los kWh consumidos; así los cargos fijos e impuestos quedan dentro de un solo precio por kWh honesto.' },
      { q: '¿De verdad importa el consumo en espera?', a: 'Una caja que consume 5 W todo el día gasta unos 44 kWh al año — pon aquí 5 W y 24 horas y lo verás en tu moneda. Un aparato solo es poco; una estantería de decodificadores, consolas y cargadores se vuelve una línea silenciosa y constante de la factura.' },
      { q: '¿Por qué un calefactor cuesta cientos de veces más que un LED?', a: 'Producir o mover calor pide kilovatios; la electrónica pide vatios. Un calefactor de 2.000 W frente a una bombilla de 8 W es un factor de 250 a horas iguales. Ahí está también el ahorro: un grado menos de calefacción pesa más que toda la disciplina con los interruptores.' },
    ],
    ui: {
      section: 'El aparato', watts: 'Potencia (W)', hours: 'Horas al día',
      price: 'Precio por kWh', calc: 'Calcular',
      costMonth: 'Coste al mes', period: 'Periodo', day: 'Día', month: 'Mes (30 días)', year: 'Año (365 días)',
      energy: 'Electricidad (kWh)', cost: 'Coste',
      note: 'La moneda es la que introduzcas por kWh. Supone consumo constante: los aparatos con termostato se apagan a ratos y gastan menos.',
    },
  },
  'pt-br': {
    title: 'Calculadora de consumo de energia de eletrodomésticos',
    desc: 'Quanto custa manter um aparelho ligado: kWh e dinheiro por dia, mês e ano, a partir de watts, horas e sua tarifa',
    short: 'Custo de uso de um aparelho',
    intro: [
      {
        h: 'Watts × horas: a conta inteira é essa',
        p: 'Um aquecedor de 1.500 W ligado 8 horas gasta 12 kWh por dia; uma lâmpada LED de 8 W, nas mesmas 8 horas, 0,064 kWh. Multiplique pelo seu preço do kWh e você tem o custo — por dia, e daí por mês e por ano. A proporção entre as potências é a proporção entre os custos, e é por isso que tudo o que produz calor domina a conta de luz.',
      },
      {
        h: 'Seu preço do kWh está na sua conta, e em nenhum outro lugar',
        p: 'O preço da energia muda por país, por distribuidora e muitas vezes por horário ou faixa de consumo. O número honesto é o da sua própria conta: divida o valor total pelos kWh faturados e você tem seu preço efetivo, com encargos fixos incluídos. É esse número que torna o custo anual daqui real em vez de hipotético.',
      },
      {
        h: 'A potência da etiqueta é um teto, não um consumo constante',
        p: 'Geladeiras, ar-condicionado e aquecedores ligam e desligam em torno de uma temperatura alvo — "8 horas ligado" quase nunca são 8 horas a plena potência. Para esses, o resultado daqui é um limite superior; um medidor de tomada ou o consumo anual impresso na etiqueta chegam mais perto. Já uma chaleira elétrica ou um secador de cabelo puxam mesmo a potência cheia sempre que funcionam.',
      },
    ],
    faq: [
      { q: 'O que eu coloco como preço do kWh?', a: 'Leia na sua conta de luz — nenhum número posto aqui sobreviveria a uma fronteira, e até vizinhos em tarifas diferentes pagam diferente. Para um preço efetivo rápido, divida o total da conta pelos kWh consumidos; isso embute encargos fixos e impostos num único preço por kWh honesto.' },
      { q: 'O consumo em espera importa mesmo?', a: 'Uma caixinha puxando 5 W o dia inteiro gasta uns 44 kWh por ano — coloque 5 W e 24 horas aqui e veja na sua moeda. Um aparelho sozinho é pouco; uma prateleira de decodificadores, consoles e carregadores vira uma linha constante e silenciosa da conta.' },
      { q: 'Por que um aquecedor custa centenas de vezes mais que um LED?', a: 'Produzir ou mover calor pede quilowatts; eletrônica pede watts. Um aquecedor de 2.000 W contra uma lâmpada de 8 W é um fator de 250 nas mesmas horas. E é aí que mora a economia: um grau a menos no aquecimento vale mais do que toda a disciplina com interruptores.' },
    ],
    ui: {
      section: 'O aparelho', watts: 'Potência (W)', hours: 'Horas por dia',
      price: 'Preço por kWh', calc: 'Calcular',
      costMonth: 'Custo por mês', period: 'Período', day: 'Dia', month: 'Mês (30 dias)', year: 'Ano (365 dias)',
      energy: 'Energia (kWh)', cost: 'Custo',
      note: 'A moeda é a que você digitar por kWh. Supõe consumo constante — aparelhos com termostato desligam por períodos e gastam menos.',
    },
  },
  ja: {
    title: '家電の電気代計算機',
    desc: '消費電力と使用時間と単価から、1日・1か月・1年の電力量と電気代を出します',
    short: '家電ひとつの電気代',
    intro: [
      {
        h: 'ワット × 時間 — 計算はこれだけです',
        p: '1,500Wのヒーターを8時間つければ1日12kWh。8WのLED電球なら同じ8時間で0.064kWhです。これにkWh単価を掛ければ電気代になり、1日の値から1か月・1年へ広がります。ワット数の比がそのまま電気代の比なので、熱を作る家電が請求書を支配します。',
      },
      {
        h: 'kWh単価は自分の請求書にしかありません',
        p: '電気の単価は国でも電力会社でも違い、時間帯や使用量の段階でも変わります。正直な数字は自分の請求書です。請求額を使用kWhで割れば、基本料金まで含んだ実効単価が出ます。その値を入れてはじめて、ここの年間の電気代が仮の話でなくなります。',
      },
      {
        h: 'ラベルの消費電力は上限で、ずっと使う量ではありません',
        p: '冷蔵庫・エアコン・ヒーターは設定温度のまわりで入り切りを繰り返すので、「8時間つけた」が8時間フル稼働という意味にはなりません。そうした家電では、ここの結果は上限の見積もりです。コンセントに挟む電力計か、ラベルの年間消費電力量のほうが実態に近づきます。逆に電気ケトルやドライヤーは、動いている間は本当に定格いっぱいを使います。',
      },
    ],
    faq: [
      { q: 'kWh単価には何を入れますか。', a: '自分の電気料金の請求書から読み取ってください。国境をまたげば通用しない数字ですし、隣の家でも契約が違えば単価は違います。手早く出すなら請求額を使用kWhで割る方法があり、基本料金や税まで含んだ正直な実効単価になります。' },
      { q: '待機電力は気にするほどですか。', a: '5Wを一日じゅう引き続ける機器は年に約44kWh使います — ここに5Wと24時間を入れると自分の通貨で見えます。1台ならわずかでも、チューナー・ゲーム機・充電器が棚に並ぶと、請求書に静かな固定の一行ができます。' },
      { q: 'ヒーターの電気代がLEDの何百倍にもなるのはなぜですか。', a: '熱を作る・運ぶにはキロワットが要り、電子機器はワットで動くからです。2,000WのヒーターとLED電球8Wなら、同じ時間で250倍。節約もそこにあります — 暖房を1度下げるほうが、どれだけ照明をこまめに消すより効きます。' },
    ],
    ui: {
      section: '家電の条件', watts: '消費電力 (W)', hours: '1日の使用時間',
      price: '1kWhあたりの単価', calc: '計算する',
      costMonth: '1か月の電気代', period: '期間', day: '1日', month: '1か月（30日）', year: '1年（365日）',
      energy: '電力量 (kWh)', cost: '電気代',
      note: '通貨は入力した単価のものです。常に定格で動く前提なので、サーモスタット付きの家電は実際にはこれより少なくなります。',
    },
  },
  de: {
    title: 'Stromkosten-Rechner für Haushaltsgeräte',
    desc: 'Was ein Gerät im Betrieb kostet — kWh und Geld je Tag, Monat und Jahr, aus Watt, Stunden und Ihrem Tarif',
    short: 'Stromkosten eines Geräts',
    intro: [
      {
        h: 'Watt × Stunden — das ist die ganze Rechnung',
        p: 'Ein 1.500-W-Heizlüfter über 8 Stunden verbraucht 12 kWh am Tag; eine 8-W-LED-Lampe in denselben 8 Stunden 0,064 kWh. Mal Ihrem Preis je kWh ergibt das die Kosten — pro Tag, und von dort auf Monat und Jahr hochgerechnet. Das Verhältnis der Wattzahlen ist das Verhältnis der Kosten, weshalb alles, was Wärme erzeugt, die Rechnung beherrscht.',
      },
      {
        h: 'Ihr Preis je kWh steht auf Ihrer Rechnung, nirgendwo sonst',
        p: 'Strompreise unterscheiden sich nach Land, Versorger und oft nach Tageszeit oder Verbrauchsstufe. Die ehrliche Zahl liefert die eigene Rechnung: Gesamtbetrag durch die abgerechneten kWh teilen, und Sie haben Ihren effektiven Preis samt Grundgebühr. Erst mit dieser Zahl werden die Jahreskosten hier real statt hypothetisch.',
      },
      {
        h: 'Die Wattzahl auf dem Etikett ist eine Obergrenze, kein Dauerverbrauch',
        p: 'Kühlschränke, Klimageräte und Heizungen takten um eine Zieltemperatur — „8 Stunden an" heißt selten 8 Stunden Volllast. Für solche Geräte ist das Ergebnis hier eine obere Schranke; ein Zwischenstecker-Messgerät oder der Jahresverbrauch auf dem Etikett kommt der Wahrheit näher. Ein Wasserkocher oder Föhn dagegen zieht tatsächlich seine volle Leistung, solange er läuft.',
      },
    ],
    faq: [
      { q: 'Was trage ich als Preis je kWh ein?', a: 'Lesen Sie ihn von Ihrer Stromrechnung ab — keine hier hinterlegte Zahl würde eine Landesgrenze überleben, und selbst Nachbarn mit verschiedenen Tarifen zahlen verschieden. Für einen schnellen Effektivpreis teilen Sie den Rechnungsbetrag durch die verbrauchten kWh; damit stecken Grundgebühr und Abgaben in einem einzigen ehrlichen kWh-Preis.' },
      { q: 'Fällt Standby wirklich ins Gewicht?', a: 'Ein Kästchen, das rund um die Uhr 5 W zieht, verbraucht etwa 44 kWh im Jahr — geben Sie hier 5 W und 24 Stunden ein und Sie sehen es in Ihrem Geld. Ein einzelnes Gerät ist wenig; ein Regal aus Receivern, Konsolen und Ladegeräten wird zu einem stillen, stetigen Posten auf der Rechnung.' },
      { q: 'Warum kostet ein Heizlüfter hundertmal mehr als eine LED?', a: 'Wärme erzeugen oder bewegen braucht Kilowatt, Elektronik braucht Watt. 2.000 W Heizlüfter gegen 8 W Lampe ist Faktor 250 bei gleichen Stunden. Genau dort sitzt auch das Sparen: ein Grad weniger heizen wiegt mehr als jede Disziplin am Lichtschalter.' },
    ],
    ui: {
      section: 'Das Gerät', watts: 'Leistung (W)', hours: 'Stunden am Tag',
      price: 'Preis je kWh', calc: 'Berechnen',
      costMonth: 'Kosten im Monat', period: 'Zeitraum', day: 'Tag', month: 'Monat (30 Tage)', year: 'Jahr (365 Tage)',
      energy: 'Strom (kWh)', cost: 'Kosten',
      note: 'Die Währung ist die Ihrer kWh-Eingabe. Angenommen wird Dauerbetrieb — Geräte mit Thermostat takten und verbrauchen weniger.',
    },
  },
  fr: {
    title: 'Calculateur de consommation électrique d’un appareil',
    desc: 'Ce que coûte un appareil en marche : kWh et argent par jour, mois et an, à partir des watts, des heures et de votre tarif',
    short: 'Coût d’usage d’un appareil',
    intro: [
      {
        h: 'Watts × heures : tout le calcul tient là',
        p: 'Un radiateur de 1 500 W allumé 8 heures consomme 12 kWh par jour ; une ampoule LED de 8 W, sur les mêmes 8 heures, 0,064 kWh. Multipliez par votre prix du kWh et vous avez le coût — par jour, puis par mois et par an. Le rapport des puissances est le rapport des coûts : voilà pourquoi tout ce qui produit de la chaleur domine la facture.',
      },
      {
        h: 'Votre prix du kWh est sur votre facture, nulle part ailleurs',
        p: 'Le prix de l’électricité change selon le pays, le fournisseur, et souvent l’heure ou la tranche de consommation. Le chiffre honnête est celui de votre propre facture : divisez le montant total par les kWh facturés et vous obtenez votre prix effectif, abonnement compris. C’est cette valeur qui rend réel, et non hypothétique, le coût annuel affiché ici.',
      },
      {
        h: 'La puissance de l’étiquette est un plafond, pas un débit constant',
        p: 'Réfrigérateurs, climatiseurs et radiateurs s’allument et s’éteignent autour d’une température cible — « 8 heures allumé » veut rarement dire 8 heures à pleine puissance. Pour eux, le résultat ci-dessous est un majorant ; un wattmètre de prise ou la consommation annuelle imprimée sur l’étiquette approche mieux la vérité. Une bouilloire ou un sèche-cheveux, en revanche, tire vraiment sa pleine puissance tant qu’il fonctionne.',
      },
    ],
    faq: [
      { q: 'Que saisir comme prix du kWh ?', a: 'Lisez-le sur votre facture d’électricité — aucun chiffre inscrit ici ne survivrait à une frontière, et deux voisins sous des tarifs différents ne paient déjà pas pareil. Pour un prix effectif rapide, divisez le total de la facture par les kWh consommés : abonnement et taxes se retrouvent fondus dans un seul prix au kWh honnête.' },
      { q: 'La veille compte-t-elle vraiment ?', a: 'Un boîtier qui tire 5 W jour et nuit consomme environ 44 kWh par an — saisissez 5 W et 24 heures ici pour le voir dans votre monnaie. Un appareil seul, c’est peu ; une étagère de décodeurs, consoles et chargeurs devient une ligne silencieuse et régulière de la facture.' },
      { q: 'Pourquoi un radiateur coûte-t-il des centaines de fois plus qu’une LED ?', a: 'Produire ou déplacer de la chaleur demande des kilowatts ; l’électronique se contente de watts. Un radiateur de 2 000 W contre une ampoule de 8 W, c’est un facteur 250 à heures égales. C’est aussi là que se trouvent les économies : un degré de chauffage en moins pèse plus que toute la discipline du monde sur les interrupteurs.' },
    ],
    ui: {
      section: 'L’appareil', watts: 'Puissance (W)', hours: 'Heures par jour',
      price: 'Prix au kWh', calc: 'Calculer',
      costMonth: 'Coût par mois', period: 'Période', day: 'Jour', month: 'Mois (30 jours)', year: 'An (365 jours)',
      energy: 'Électricité (kWh)', cost: 'Coût',
      note: 'La devise est celle de votre prix au kWh. Le calcul suppose une puissance constante — les appareils à thermostat s’arrêtent par cycles et consomment moins.',
    },
  },
  hi: {
    title: 'उपकरण बिजली ख़र्च कैलकुलेटर',
    desc: 'वाट, घंटे और आपकी प्रति यूनिट दर से — एक उपकरण का दिन, महीने और साल का kWh और ख़र्च',
    short: 'एक उपकरण का बिजली ख़र्च',
    intro: [
      {
        h: 'वाट × घंटे — पूरी गिनती इतनी ही है',
        p: '1,500 वाट का हीटर 8 घंटे चले तो दिन के 12 यूनिट (kWh); 8 वाट का LED बल्ब उन्हीं 8 घंटों में 0.064 यूनिट। इसे अपनी प्रति यूनिट दर से गुणा कीजिए — दिन का ख़र्च मिला, और उसी से महीने और साल का। वाट का अनुपात ही ख़र्च का अनुपात है, इसीलिए गर्मी पैदा करने वाली चीज़ें बिल पर राज करती हैं।',
      },
      {
        h: 'आपकी प्रति यूनिट दर सिर्फ़ आपके बिल में है',
        p: 'बिजली की दर देश, कंपनी, और अक्सर समय या खपत के स्लैब से बदलती है। ईमानदार आंकड़ा आपका अपना बिल है: कुल रक़म को बिल किए गए यूनिट से भाग दीजिए — फ़िक्स्ड चार्ज समेत आपकी असरदार दर निकल आएगी। वही आंकड़ा डालने पर यहाँ का सालाना ख़र्च कल्पना नहीं, हक़ीक़त बनता है।',
      },
      {
        h: 'लेबल के वाट ऊपरी हद हैं, लगातार खिंचती बिजली नहीं',
        p: 'फ़्रिज, एसी और हीटर तय तापमान के इर्द-गिर्द चालू-बंद होते रहते हैं — "8 घंटे चला" का मतलब शायद ही 8 घंटे पूरी ताक़त हो। ऐसे उपकरणों के लिए यहाँ का नतीजा ऊपरी अंदाज़ा है; प्लग में लगने वाला मीटर या लेबल पर छपी सालाना खपत सच के ज़्यादा क़रीब है। इसके उलट केतली या हेयर ड्रायर जब भी चलते हैं, सचमुच पूरी ताक़त खींचते हैं।',
      },
    ],
    faq: [
      { q: 'प्रति kWh दर में क्या भरूँ?', a: 'अपने बिजली के बिल से पढ़िए — यहाँ रखा कोई भी आंकड़ा सरहद पार करते ही ग़लत हो जाता, और अलग टैरिफ़ वाले दो पड़ोसी भी अलग देते हैं। झटपट असरदार दर चाहिए तो बिल की कुल रक़म को खपत हुए यूनिट से भाग दीजिए; फ़िक्स्ड चार्ज और टैक्स एक ही ईमानदार दर में समा जाते हैं।' },
      { q: 'क्या स्टैंडबाय बिजली सच में मायने रखती है?', a: 'चौबीसों घंटे 5 वाट खींचता एक डिब्बा साल में क़रीब 44 यूनिट खा जाता है — यहाँ 5 वाट और 24 घंटे भरकर अपनी मुद्रा में देख लीजिए। एक उपकरण से कुछ नहीं होता; सेट-टॉप बॉक्स, कंसोल और चार्जरों की पूरी ताक़ बिल की एक चुपचाप, पक्की लकीर बन जाती है।' },
      { q: 'हीटर का ख़र्च LED से सैकड़ों गुना क्यों?', a: 'गर्मी बनाने या ढोने में किलोवाट लगते हैं; इलेक्ट्रॉनिक्स वाट में चलती है। 2,000 वाट का हीटर बनाम 8 वाट का बल्ब — बराबर घंटों में 250 गुना। बचत भी वहीं है: हीटिंग एक डिग्री कम करना, बत्तियाँ बुझाने के सारे अनुशासन पर भारी पड़ता है।' },
    ],
    ui: {
      section: 'उपकरण', watts: 'पावर (W)', hours: 'रोज़ के घंटे',
      price: 'प्रति kWh दाम', calc: 'गणना करें',
      costMonth: 'महीने का ख़र्च', period: 'अवधि', day: 'दिन', month: 'महीना (30 दिन)', year: 'साल (365 दिन)',
      energy: 'बिजली (kWh)', cost: 'ख़र्च',
      note: 'मुद्रा वही है जो आपने प्रति kWh में डाली। गिनती लगातार पूरी ताक़त मानकर है — थर्मोस्टैट वाले उपकरण रुक-रुक कर चलते हैं और कम खाते हैं।',
    },
  },
  'zh-hans': {
    title: '家电耗电量与电费计算器',
    desc: '按功率、每天使用时长和你的电价，算出一台家电每天、每月、每年用多少度电、花多少钱',
    short: '一台家电的电费',
    intro: [
      {
        h: '功率 × 小时，整个计算就这么多',
        p: '1,500 瓦的取暖器开 8 小时，一天用 12 度电；8 瓦的 LED 灯泡同样开 8 小时，只用 0.064 度。乘上你的每度电价就是钱——先算出一天，再推到一个月、一年。功率之比就是电费之比，所以凡是产热的电器，都在电费单上称王。',
      },
      {
        h: '你的每度电价只在你自己的账单上',
        p: '电价因国家、电力公司而异，还常按时段或阶梯变化。诚实的数字在你自己的电费单里：用总金额除以计费度数，得到的就是含固定费用在内的实际单价。填上那个数，这里的年度电费才是真账，不是假设。',
      },
      {
        h: '铭牌上的功率是上限，不是持续消耗',
        p: '冰箱、空调、取暖器都围着设定温度开开停停——"开了 8 小时"很少意味着 8 小时满功率。对这类电器，这里的结果是个上限；插座式电量计或铭牌上的年耗电量更接近真相。反过来，电热水壶和吹风机只要在转，就真的吃满标称功率。',
      },
    ],
    faq: [
      { q: '每度电价该填多少？', a: '从你的电费单上读——这里预设任何数字，一过国境就成了错的，就连隔壁邻居换个套餐价钱都不一样。想快速得到实际单价，就用账单总额除以用电度数；固定费用和税全都摊进了一个诚实的每度价里。' },
      { q: '待机耗电真的要紧吗？', a: '一个整天吸着 5 瓦的盒子，一年用掉约 44 度电——在这里填 5 瓦、24 小时，就能换成你的钱看到。单个设备不起眼；一排机顶盒、游戏机和充电器，就成了账单上一条安静而固定的支出。' },
      { q: '为什么取暖器的电费是 LED 的几百倍？', a: '制造或搬运热量要用千瓦，电子设备只用瓦。2,000 瓦的取暖器对 8 瓦的灯泡，同样的时间就是 250 倍。省电的门道也在这里：暖气调低一度，胜过随手关灯的全部功夫。' },
    ],
    ui: {
      section: '这台家电', watts: '功率（瓦）', hours: '每天使用小时',
      price: '每度电价', calc: '计算',
      costMonth: '每月电费', period: '时长', day: '一天', month: '一个月（30 天）', year: '一年（365 天）',
      energy: '用电量（度）', cost: '电费',
      note: '货币就是你填的每度电价的货币。按持续满功率计算——带温控的电器会间歇运行，实际更少。',
    },
  },
  'zh-hant': {
    title: '家電耗電量與電費計算機',
    desc: '按功率、每天使用時長和你的電價，算出一台家電每天、每月、每年用多少度電、花多少錢',
    short: '一台家電的電費',
    intro: [
      {
        h: '功率 × 小時，整個計算就這麼多',
        p: '1,500 瓦的電暖器開 8 小時，一天用 12 度電；8 瓦的 LED 燈泡同樣開 8 小時，只用 0.064 度。乘上你的每度電價就是錢——先算出一天，再推到一個月、一年。功率之比就是電費之比，所以凡是產熱的電器，都在電費單上稱王。',
      },
      {
        h: '你的每度電價只在你自己的帳單上',
        p: '電價因國家、電力公司而異，還常按時段或級距變化。誠實的數字在你自己的電費單裡：用總金額除以計費度數，得到的就是含固定費用在內的實際單價。填上那個數，這裡的年度電費才是真帳，不是假設。',
      },
      {
        h: '銘牌上的功率是上限，不是持續消耗',
        p: '冰箱、冷氣、電暖器都圍著設定溫度開開停停——「開了 8 小時」很少意味著 8 小時滿功率。對這類電器，這裡的結果是個上限；插座式電表或銘牌上的年耗電量更接近真相。反過來，快煮壺和吹風機只要在轉，就真的吃滿標稱功率。',
      },
    ],
    faq: [
      { q: '每度電價該填多少？', a: '從你的電費單上讀——這裡預設任何數字，一過國境就成了錯的，就連隔壁鄰居換個方案價錢都不一樣。想快速得到實際單價，就用帳單總額除以用電度數；固定費用和稅全都攤進了一個誠實的每度價裡。' },
      { q: '待機耗電真的要緊嗎？', a: '一個整天吸著 5 瓦的盒子，一年用掉約 44 度電——在這裡填 5 瓦、24 小時，就能換成你的錢看到。單一設備不起眼；一排機上盒、遊戲機和充電器，就成了帳單上一條安靜而固定的支出。' },
      { q: '為什麼電暖器的電費是 LED 的幾百倍？', a: '製造或搬運熱量要用千瓦，電子設備只用瓦。2,000 瓦的電暖器對 8 瓦的燈泡，同樣的時間就是 250 倍。省電的門道也在這裡：暖氣調低一度，勝過隨手關燈的全部功夫。' },
    ],
    ui: {
      section: '這台家電', watts: '功率（瓦）', hours: '每天使用小時',
      price: '每度電價', calc: '計算',
      costMonth: '每月電費', period: '時長', day: '一天', month: '一個月（30 天）', year: '一年（365 天）',
      energy: '用電量（度）', cost: '電費',
      note: '貨幣就是你填的每度電價的貨幣。按持續滿功率計算——帶溫控的電器會間歇運行，實際更少。',
    },
  },
};
