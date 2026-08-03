import type { CalcTable } from './types.ts';

/** 복리 목표 — 목표 금액에서 거꾸로 기간이나 월 납입액을 구한다. 순수 산수다. */
export const COMPOUND_GOAL: CalcTable = {
  en: {
    title: 'Savings goal calculator',
    desc: 'How long a target takes, or how much a month it needs',
    short: 'Work backwards from the target',
    intro: [
      {
        h: 'Starting from the answer',
        p: 'A compound interest calculator asks what a sum becomes. This one starts from the number you want and works backwards: how many years at your current pace, or how much a month to arrive on schedule.',
      },
      {
        h: 'Adding years is the cheapest lever',
        p: 'Three things move a goal closer — paying in more, waiting longer, or earning more. The return is the one you cannot simply decide on, and raising it means taking on more risk. Try the numbers both ways and you will usually find that two or three extra years does as much as a large increase in the monthly amount.',
      },
      {
        h: 'The assumption drives the answer',
        p: 'This assumes the return you type in arrives every single year, unchanged. Real markets do not, and neither tax nor inflation is in here. Run it once with a deliberately pessimistic return, and treat the output as a way to compare assumptions rather than a plan.',
      },
    ],
    faq: [
      { q: 'Why does a small change in the return move the answer so much?', a: 'Because the growth is exponential — the rate sits in the exponent, so a difference of one percentage point compounds year after year. Over long horizons that is precisely why the assumed return deserves more scrutiny than the monthly amount.' },
      { q: 'What if the target is below what I already have?', a: 'Then there is nothing to calculate; you are there. The tool needs a target above the starting amount to have a gap to close.' },
      { q: 'Is the monthly figure paid at the start or the end of the month?', a: 'At the end of each month, the ordinary-annuity convention. Paying at the start of the month earns one extra month of growth on every instalment and so needs slightly less.' },
    ],
    ui: {
      tabYears: 'How long will it take', tabMonthly: 'How much per month',
      start: 'Amount you have now', goal: 'Target amount', rate: 'Expected annual return (%)',
      years: 'Years available', calc: 'Calculate',
      resultYears: 'Time to reach the target', resultMonthly: 'Needed each month',
      yearsUnit: 'years', monthsUnit: 'months',
      growth: 'Balance by year', year: 'Year', amount: 'Balance',
      already: 'Your starting amount already grows past the target on its own.',
    },
  },
  es: {
    title: 'Calculadora de objetivo de ahorro',
    desc: 'Cuánto tarda una meta o cuánto hace falta al mes',
    short: 'Calcula hacia atrás desde la meta',
    intro: [
      {
        h: 'Empezar por el resultado',
        p: 'Una calculadora de interés compuesto pregunta en cuánto se convierte una suma. Esta parte de la cifra que quieres y va hacia atrás: cuántos años al ritmo actual, o cuánto al mes para llegar a tiempo.',
      },
      {
        h: 'Sumar años es la palanca más barata',
        p: 'Tres cosas acercan una meta: aportar más, esperar más o rentar más. La rentabilidad es la única que no se decide, y subirla implica asumir más riesgo. Prueba las dos vías y verás que dos o tres años de más suelen valer tanto como un aumento fuerte de la aportación mensual.',
      },
      {
        h: 'La suposición manda sobre el resultado',
        p: 'Se asume que la rentabilidad que escribes se repite todos los años sin variar. Los mercados reales no hacen eso, y aquí no hay ni impuestos ni inflación. Repite el cálculo con una rentabilidad deliberadamente pesimista y usa el resultado para comparar supuestos, no como un plan.',
      },
    ],
    faq: [
      { q: '¿Por qué un cambio pequeño en la rentabilidad mueve tanto el resultado?', a: 'Porque el crecimiento es exponencial: la tasa está en el exponente, así que un punto de diferencia se acumula año tras año. En horizontes largos, por eso mismo la rentabilidad supuesta merece más escrutinio que la cuota mensual.' },
      { q: '¿Y si la meta es menor que lo que ya tengo?', a: 'Entonces no hay nada que calcular: ya has llegado. La herramienta necesita una meta por encima del importe inicial para que haya una distancia que cubrir.' },
      { q: '¿La cuota mensual se paga al principio o al final del mes?', a: 'Al final de cada mes, la convención de renta vencida. Pagar al principio da un mes extra de crecimiento a cada cuota y exige, por tanto, algo menos.' },
    ],
    ui: {
      tabYears: 'Cuánto tardaré', tabMonthly: 'Cuánto al mes',
      start: 'Lo que tienes ahora', goal: 'Importe objetivo', rate: 'Rentabilidad anual esperada (%)',
      years: 'Años disponibles', calc: 'Calcular',
      resultYears: 'Tiempo hasta la meta', resultMonthly: 'Necesario cada mes',
      yearsUnit: 'años', monthsUnit: 'meses',
      growth: 'Saldo por año', year: 'Año', amount: 'Saldo',
      already: 'Lo que ya tienes supera la meta por sí solo.',
    },
  },
  'pt-br': {
    title: 'Calculadora de meta de investimento',
    desc: 'Quanto tempo leva para chegar à meta, ou quanto é preciso por mês',
    short: 'Conta de trás para frente',
    intro: [
      {
        h: 'Começando pela resposta',
        p: 'Uma calculadora de juros compostos pergunta em quanto um valor se transforma. Esta parte do número que você quer e volta: quantos anos no ritmo atual, ou quanto por mês para chegar no prazo.',
      },
      {
        h: 'Somar anos é a alavanca mais barata',
        p: 'Três coisas aproximam a meta: aportar mais, esperar mais ou render mais. O retorno é o único que não se decide, e aumentá-lo significa correr mais risco. Teste dos dois jeitos e você verá que dois ou três anos a mais costumam valer tanto quanto um aumento forte do aporte mensal.',
      },
      {
        h: 'A premissa manda no resultado',
        p: 'Aqui se assume que o retorno digitado se repete todo ano, sem variar. O mercado real não faz isso, e nem imposto nem inflação entram na conta. Rode de novo com um retorno deliberadamente pessimista e use o resultado para comparar premissas, não como um plano.',
      },
    ],
    faq: [
      { q: 'Por que uma mudança pequena no retorno mexe tanto no resultado?', a: 'Porque o crescimento é exponencial — a taxa fica no expoente, então um ponto percentual de diferença se acumula ano após ano. Em prazos longos é justamente por isso que o retorno suposto merece mais atenção do que o valor mensal.' },
      { q: 'E se a meta for menor do que eu já tenho?', a: 'Aí não há o que calcular: você já chegou. A ferramenta precisa de uma meta acima do valor inicial para haver uma distância a percorrer.' },
      { q: 'O aporte mensal é no começo ou no fim do mês?', a: 'No fim de cada mês, a convenção de anuidade postecipada. Aportar no começo dá um mês a mais de rendimento a cada parcela e, portanto, exige um pouco menos.' },
    ],
    ui: {
      tabYears: 'Quanto tempo leva', tabMonthly: 'Quanto por mês',
      start: 'O que você tem hoje', goal: 'Valor da meta', rate: 'Retorno anual esperado (%)',
      years: 'Anos disponíveis', calc: 'Calcular',
      resultYears: 'Tempo até a meta', resultMonthly: 'Necessário por mês',
      yearsUnit: 'anos', monthsUnit: 'meses',
      growth: 'Saldo por ano', year: 'Ano', amount: 'Saldo',
      already: 'O que você já tem ultrapassa a meta sozinho.',
    },
  },
  ja: {
    title: '目標額から逆算する計算機',
    desc: '目標に届くまでの年数、または毎月いくら必要かを求めます',
    short: '目標から逆に計算する',
    intro: [
      {
        h: '答えのほうから始めます',
        p: '複利計算機は「入れたお金がいくらになるか」を見ます。こちらは欲しい金額から逆に辿ります。いまのペースなら何年か、期限内に届かせるなら毎月いくらか、という具合です。',
      },
      {
        h: '年数を足すのがいちばん安い手',
        p: '目標を近づける方法は三つ、多く入れるか、長く置くか、利回りを上げるかです。利回りだけは自分では決められず、上げようとすれば危険も増えます。数字を両方向に動かしてみると、2〜3年延ばすことが毎月の額を大きく増やすのと同じくらい効くと分かります。',
      },
      {
        h: '結果を決めるのは前提です',
        p: '入力した利回りが毎年そのまま出続けるという前提です。現実の相場はそうならず、税金も物価も入っていません。わざと低い利回りでも一度回してみて、この結果は計画ではなく前提を比べる道具として使ってください。',
      },
    ],
    faq: [
      { q: '利回りを少し変えただけで結果が大きく動くのはなぜですか。', a: '伸び方が指数だからです。利回りは指数の側にあり、1ポイントの差が毎年重なっていきます。期間が長いほど、毎月の額より前提の利回りのほうを疑うべき理由がここにあります。' },
      { q: '目標がいま持っている額より小さいときは。', a: '計算するものがありません。すでに届いています。この道具は、開始額より上の目標があって初めて埋めるべき差が生まれます。' },
      { q: '毎月の積立は月初ですか月末ですか。', a: '月末です(期末払いの約束事)。月初に入れると各回が1か月ぶん余分に運用されるので、必要額はわずかに少なくなります。' },
    ],
    ui: {
      tabYears: '何年かかるか', tabMonthly: '毎月いくら必要か',
      start: 'いまある金額', goal: '目標金額', rate: '想定利回り (年 %)',
      years: '使える年数', calc: '計算する',
      resultYears: '目標到達までの期間', resultMonthly: '毎月必要な額',
      yearsUnit: '年', monthsUnit: 'か月',
      growth: '年ごとの残高', year: '年', amount: '残高',
      already: 'いまある金額だけで目標を超えます。',
    },
  },
  de: {
    title: 'Sparziel-Rechner',
    desc: 'Wie lange ein Ziel dauert oder wie viel es im Monat braucht',
    short: 'Vom Ziel aus zurückrechnen',
    intro: [
      {
        h: 'Von der Antwort aus gedacht',
        p: 'Ein Zinseszinsrechner fragt, was aus einer Summe wird. Dieser hier beginnt bei der Zahl, die Sie erreichen wollen, und rechnet rückwärts: wie viele Jahre im jetzigen Tempo — oder wie viel im Monat, um rechtzeitig anzukommen.',
      },
      {
        h: 'Jahre draufzulegen ist der billigste Hebel',
        p: 'Drei Dinge bringen ein Ziel näher: mehr einzahlen, länger warten oder mehr Rendite. Die Rendite ist die Einzige, die man nicht einfach beschließt, und sie zu erhöhen bedeutet mehr Risiko. Spielen Sie beides durch — meist bringen zwei bis drei zusätzliche Jahre so viel wie eine kräftige Erhöhung der Monatsrate.',
      },
      {
        h: 'Die Annahme bestimmt das Ergebnis',
        p: 'Unterstellt wird, dass die eingetragene Rendite jedes Jahr unverändert eintritt. Echte Märkte tun das nicht, und Steuern wie Inflation fehlen hier. Rechnen Sie einmal bewusst pessimistisch und nehmen Sie das Ergebnis als Vergleich von Annahmen, nicht als Plan.',
      },
    ],
    faq: [
      { q: 'Warum verschiebt eine kleine Renditeänderung das Ergebnis so stark?', a: 'Weil das Wachstum exponentiell ist — der Satz steht im Exponenten, ein Prozentpunkt Unterschied verstärkt sich Jahr für Jahr. Über lange Zeiträume verdient deshalb die angenommene Rendite mehr Prüfung als die Monatsrate.' },
      { q: 'Was, wenn das Ziel unter meinem jetzigen Betrag liegt?', a: 'Dann gibt es nichts zu rechnen, Sie sind schon da. Das Werkzeug braucht ein Ziel oberhalb des Startbetrags, damit überhaupt eine Lücke besteht.' },
      { q: 'Wird die Rate am Monatsanfang oder -ende gezahlt?', a: 'Am Monatsende, nach der Konvention der nachschüssigen Rente. Zahlt man am Anfang, wächst jede Rate einen Monat länger, und es braucht entsprechend etwas weniger.' },
    ],
    ui: {
      tabYears: 'Wie lange es dauert', tabMonthly: 'Wie viel im Monat',
      start: 'Vorhandener Betrag', goal: 'Zielbetrag', rate: 'Erwartete Rendite p. a. (%)',
      years: 'Verfügbare Jahre', calc: 'Berechnen',
      resultYears: 'Zeit bis zum Ziel', resultMonthly: 'Monatlich nötig',
      yearsUnit: 'Jahre', monthsUnit: 'Monate',
      growth: 'Stand nach Jahren', year: 'Jahr', amount: 'Stand',
      already: 'Der vorhandene Betrag übertrifft das Ziel schon von allein.',
    },
  },
  fr: {
    title: 'Calculateur d’objectif d’épargne',
    desc: 'Le temps nécessaire pour atteindre un objectif, ou le montant à verser chaque mois',
    short: 'Calculer à rebours depuis l’objectif',
    intro: [
      {
        h: 'Partir de la réponse',
        p: 'Un calculateur d’intérêts composés demande ce que devient une somme. Celui-ci part du chiffre que vous visez et remonte : combien d’années au rythme actuel, ou combien par mois pour arriver dans les temps.',
      },
      {
        h: 'Ajouter des années est le levier le moins cher',
        p: 'Trois choses rapprochent un objectif : verser plus, attendre plus longtemps, ou obtenir un meilleur rendement. Le rendement est le seul qui ne se décide pas, et l’augmenter suppose plus de risque. Essayez dans les deux sens : deux ou trois années de plus valent souvent autant qu’une forte hausse du versement mensuel.',
      },
      {
        h: 'L’hypothèse commande le résultat',
        p: 'On suppose que le rendement saisi se répète chaque année à l’identique. Les marchés réels ne font pas cela, et ni l’impôt ni l’inflation ne figurent ici. Refaites le calcul avec un rendement volontairement pessimiste et servez-vous du résultat pour comparer des hypothèses, pas comme d’un plan.',
      },
    ],
    faq: [
      { q: 'Pourquoi une petite variation du rendement change-t-elle autant le résultat ?', a: 'Parce que la croissance est exponentielle : le taux est à l’exposant, un point d’écart se cumule année après année. Sur un horizon long, c’est précisément pourquoi le rendement supposé mérite plus d’attention que le versement mensuel.' },
      { q: 'Et si l’objectif est inférieur à ce que j’ai déjà ?', a: 'Il n’y a rien à calculer : vous y êtes. L’outil a besoin d’un objectif supérieur au montant de départ pour qu’il existe un écart à combler.' },
      { q: 'Le versement mensuel a-t-il lieu en début ou en fin de mois ?', a: 'En fin de mois, selon la convention de l’annuité à terme échu. Verser en début de mois donne un mois de croissance de plus à chaque versement et demande donc un peu moins.' },
    ],
    ui: {
      tabYears: 'Combien de temps', tabMonthly: 'Combien par mois',
      start: 'Ce que vous avez déjà', goal: 'Montant visé', rate: 'Rendement annuel attendu (%)',
      years: 'Années disponibles', calc: 'Calculer',
      resultYears: 'Délai pour atteindre l’objectif', resultMonthly: 'Nécessaire chaque mois',
      yearsUnit: 'ans', monthsUnit: 'mois',
      growth: 'Encours par année', year: 'Année', amount: 'Encours',
      already: 'Ce que vous avez déjà dépasse l’objectif tout seul.',
    },
  },
  hi: {
    title: 'बचत लक्ष्य कैलकुलेटर',
    desc: 'लक्ष्य तक पहुँचने में कितना समय लगेगा, या हर महीने कितना चाहिए',
    short: 'लक्ष्य से उल्टा हिसाब',
    intro: [
      {
        h: 'जवाब से शुरू करना',
        p: 'चक्रवृद्धि कैलकुलेटर पूछता है कि रकम कितनी बनेगी। यह वाला उस आंकड़े से शुरू करता है जो आप चाहते हैं और पीछे की ओर चलता है — मौजूदा रफ़्तार पर कितने साल, या समय पर पहुँचने के लिए हर महीने कितना।',
      },
      {
        h: 'साल जोड़ना सबसे सस्ता ज़रिया है',
        p: 'लक्ष्य पास लाने के तीन तरीक़े हैं — ज़्यादा डालिए, ज़्यादा देर रखिए, या ज़्यादा प्रतिफल पाइए। प्रतिफल ही वह है जो तय नहीं किया जा सकता, और उसे बढ़ाने का मतलब है ज़्यादा जोखिम। दोनों तरफ़ आंकड़े बदलकर देखिए — दो-तीन साल बढ़ाना अक्सर मासिक रकम में बड़ी बढ़ोतरी जितना ही काम करता है।',
      },
      {
        h: 'नतीजा मान्यता से तय होता है',
        p: 'यहाँ माना गया है कि आपकी डाली हुई प्रतिफल दर हर साल ज्यों की त्यों मिलेगी। असली बाज़ार ऐसा नहीं करता, और कर तथा महँगाई इसमें हैं ही नहीं। एक बार जान-बूझकर कम दर पर भी चलाइए, और नतीजे को योजना नहीं, मान्यताओं की तुलना का ज़रिया मानिए।',
      },
    ],
    faq: [
      { q: 'प्रतिफल में ज़रा-सा बदलाव नतीजा इतना क्यों हिला देता है?', a: 'क्योंकि वृद्धि चरघातांकी है — दर घातांक में बैठी है, इसलिए एक प्रतिशत का फ़र्क़ हर साल गुणा होता जाता है। लंबी अवधि में इसीलिए मासिक रकम से ज़्यादा जाँच मानी हुई दर की होनी चाहिए।' },
      { q: 'अगर लक्ष्य मेरी मौजूदा रकम से कम हो तो?', a: 'तब गणना का कुछ बचा ही नहीं — आप पहुँच चुके हैं। उपकरण को शुरुआती रकम से ऊपर का लक्ष्य चाहिए, तभी कोई दूरी बनती है।' },
      { q: 'मासिक रकम महीने के शुरू में जाती है या अंत में?', a: 'हर महीने के अंत में — यही सामान्य वार्षिकी की रीत है। शुरू में डालने पर हर किस्त को एक महीना अतिरिक्त बढ़त मिलती है, इसलिए ज़रूरत थोड़ी कम पड़ती है।' },
    ],
    ui: {
      tabYears: 'कितना समय लगेगा', tabMonthly: 'हर महीने कितना',
      start: 'अभी आपके पास', goal: 'लक्ष्य राशि', rate: 'अपेक्षित वार्षिक प्रतिफल (%)',
      years: 'उपलब्ध साल', calc: 'गणना करें',
      resultYears: 'लक्ष्य तक का समय', resultMonthly: 'हर महीने ज़रूरी',
      yearsUnit: 'साल', monthsUnit: 'महीने',
      growth: 'साल के हिसाब से शेष', year: 'साल', amount: 'शेष',
      already: 'आपकी मौजूदा रकम अपने आप ही लक्ष्य पार कर जाती है।',
    },
  },
  'zh-hans': {
    title: '储蓄目标计算器',
    desc: '到达目标要多久，或者每月得存多少',
    short: '从目标倒着算',
    intro: [
      {
        h: '从答案开始算',
        p: '复利计算器问的是"这笔钱会变成多少"。这个反过来：从你想要的数字往回推——按现在的节奏要几年，或者要按时到达每月得投多少。',
      },
      {
        h: '多给几年是最便宜的办法',
        p: '让目标提前的办法只有三个：多投、多等、收益更高。收益率恰恰是你决定不了的那个，想提高就得承担更多风险。两边都试一遍你会发现，多给两三年往往抵得上大幅提高每月投入。',
      },
      {
        h: '结果由假设说了算',
        p: '这里假设你填的收益率每年都原样兑现。真实市场不是这样，而且税和通胀都没算进去。用一个刻意保守的收益率再跑一次，把结果当作比较假设的工具，而不是一份计划。',
      },
    ],
    faq: [
      { q: '收益率只动一点点，结果为什么差这么多？', a: '因为增长是指数式的——收益率在指数上，一个百分点的差别会逐年叠加。期限越长，越该反复推敲的是假设的收益率，而不是每月的金额。' },
      { q: '如果目标比我现在的钱还少呢？', a: '那就没什么好算的，你已经到了。这个工具需要一个高于起始金额的目标，才有距离可补。' },
      { q: '每月的钱是月初投还是月末投？', a: '按月末投计算，也就是普通年金的惯例。月初投的话每一笔都多滚一个月，所以需要的金额会略少一点。' },
    ],
    ui: {
      tabYears: '需要多久', tabMonthly: '每月要多少',
      start: '你现在有的钱', goal: '目标金额', rate: '预期年化收益率 (%)',
      years: '可用年数', calc: '计算',
      resultYears: '到达目标所需时间', resultMonthly: '每月需要投入',
      yearsUnit: '年', monthsUnit: '个月',
      growth: '逐年余额', year: '年', amount: '余额',
      already: '你现有的钱自己就已经超过目标了。',
    },
  },
  'zh-hant': {
    title: '儲蓄目標計算機',
    desc: '到達目標要多久，或者每月得存多少',
    short: '從目標倒著算',
    intro: [
      {
        h: '從答案開始算',
        p: '複利計算機問的是「這筆錢會變成多少」。這個反過來：從你想要的數字往回推——按現在的節奏要幾年，或者要準時到達每月得投多少。',
      },
      {
        h: '多給幾年是最便宜的辦法',
        p: '讓目標提前的辦法只有三個：多投、多等、報酬更高。報酬率恰恰是你決定不了的那個，想提高就得承擔更多風險。兩邊都試一遍你會發現，多給兩三年往往抵得上大幅提高每月投入。',
      },
      {
        h: '結果由假設說了算',
        p: '這裡假設你填的報酬率每年都原樣兌現。真實市場不是這樣，而且稅和通膨都沒算進去。用一個刻意保守的報酬率再跑一次，把結果當作比較假設的工具，而不是一份計畫。',
      },
    ],
    faq: [
      { q: '報酬率只動一點點，結果為什麼差這麼多？', a: '因為成長是指數式的——報酬率在指數上，一個百分點的差別會逐年疊加。期限越長，越該反覆推敲的是假設的報酬率，而不是每月的金額。' },
      { q: '如果目標比我現在的錢還少呢？', a: '那就沒什麼好算的，你已經到了。這個工具需要一個高於起始金額的目標，才有距離可補。' },
      { q: '每月的錢是月初投還是月底投？', a: '按月底投計算，也就是普通年金的慣例。月初投的話每一筆都多滾一個月，所以需要的金額會略少一點。' },
    ],
    ui: {
      tabYears: '需要多久', tabMonthly: '每月要多少',
      start: '你現在有的錢', goal: '目標金額', rate: '預期年化報酬率 (%)',
      years: '可用年數', calc: '計算',
      resultYears: '到達目標所需時間', resultMonthly: '每月需要投入',
      yearsUnit: '年', monthsUnit: '個月',
      growth: '逐年餘額', year: '年', amount: '餘額',
      already: '你現有的錢自己就已經超過目標了。',
    },
  },
};
