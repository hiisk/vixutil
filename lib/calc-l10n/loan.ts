import type { CalcTable } from './types.ts';

/**
 * 대출 상환 계산기 — 원리금균등과 원금균등.
 *
 * 두 방식의 이름이 언어마다 다르다. 영어권은 amortising / straight-line,
 * 독일어는 Annuitätendarlehen / Tilgungsdarlehen처럼 따로 부르는 말이 있어서
 * 그대로 옮기지 않고 각 언어에서 실제로 쓰는 이름을 넣었다.
 */
export const LOAN: CalcTable = {
  en: {
    title: 'Loan repayment calculator',
    desc: 'Monthly payments and a full schedule, for level or straight-line repayment',
    short: 'Amount · rate · term → monthly payment',
    intro: [
      {
        h: 'Two ways to pay the same loan back',
        p: 'With level payments (an annuity), every instalment is the same size; early on most of it is interest and only later does the principal start falling quickly. With straight-line repayment you pay a fixed slice of principal each month plus interest on what is left, so the first payment is the largest and each one after it is smaller.',
      },
      {
        h: 'Level payments cost more in total',
        p: 'Because the balance falls more slowly, more interest accrues. Straight-line is cheaper overall but demands more in the early months, which is exactly when most people can least afford it. The right answer depends on your cash flow, not on which number is smaller.',
      },
      {
        h: 'What this does not know',
        p: 'Arrangement fees, insurance, early-repayment charges and any rate that changes partway through are not modelled. On a long mortgage those can move the real cost by more than a rate difference of half a point.',
      },
    ],
    faq: [
      { q: 'Which method is cheaper?', a: 'Straight-line, in total interest. The difference grows with the term — on a 30-year loan it can be substantial, on a 3-year car loan it is small.' },
      { q: 'Why is my first payment mostly interest?', a: 'Interest is charged on the outstanding balance, which is at its highest at the start. With level payments the split shifts towards principal gradually as the balance falls.' },
      { q: 'Is the rate annual?', a: 'Yes. It is divided by twelve to get the monthly rate, which is how most consumer loans are quoted and calculated.' },
    ],
    ui: {
      section: 'Loan details', amount: 'Loan amount', rate: 'Annual rate (%)', years: 'Term (years)',
      method: 'Repayment method', level: 'Level payments', straight: 'Straight-line principal',
      calc: 'Calculate', monthly: 'Monthly payment', firstMonth: 'First payment',
      totalInterest: 'Total interest', totalPaid: 'Total repaid', schedule: 'Schedule',
      month: 'Month', payment: 'Payment', principalPart: 'Principal', interestPart: 'Interest', balance: 'Balance',
      note: 'Fees, insurance and rate changes are not included.',
    },
  },
  es: {
    title: 'Calculadora de préstamos',
    desc: 'Cuota mensual y cuadro de amortización, en cuota constante o amortización constante',
    short: 'Importe · tipo · plazo → cuota mensual',
    intro: [
      {
        h: 'Dos maneras de devolver el mismo préstamo',
        p: 'Con cuota constante (sistema francés), todas las mensualidades son iguales; al principio casi todo es interés y solo más tarde el capital empieza a bajar deprisa. Con amortización constante pagas cada mes la misma porción de capital más los intereses de lo que queda, así que la primera cuota es la mayor y cada una siguiente es menor.',
      },
      {
        h: 'La cuota constante sale más cara en total',
        p: 'Como el saldo baja más despacio, se acumulan más intereses. La amortización constante es más barata en conjunto pero exige más en los primeros meses, justo cuando la mayoría menos puede. La respuesta correcta depende de tu tesorería, no de qué número es más pequeño.',
      },
      {
        h: 'Lo que esto no sabe',
        p: 'No se modelan comisiones de apertura, seguros, penalizaciones por amortización anticipada ni un tipo que cambie a mitad de camino. En una hipoteca larga eso puede mover el coste real más que medio punto de diferencia en el tipo.',
      },
    ],
    faq: [
      { q: '¿Qué método sale más barato?', a: 'La amortización constante, en intereses totales. La diferencia crece con el plazo: en 30 años puede ser considerable, en un préstamo de coche a 3 años es pequeña.' },
      { q: '¿Por qué mi primera cuota es casi toda intereses?', a: 'Los intereses se calculan sobre el saldo pendiente, que está en su máximo al principio. Con cuota constante el reparto se desplaza poco a poco hacia el capital según baja el saldo.' },
      { q: '¿El tipo es anual?', a: 'Sí. Se divide entre doce para obtener el tipo mensual, que es como se cotizan y calculan casi todos los préstamos al consumo.' },
    ],
    ui: {
      section: 'Datos del préstamo', amount: 'Importe', rate: 'Tipo anual (%)', years: 'Plazo (años)',
      method: 'Sistema', level: 'Cuota constante', straight: 'Amortización constante',
      calc: 'Calcular', monthly: 'Cuota mensual', firstMonth: 'Primera cuota',
      totalInterest: 'Intereses totales', totalPaid: 'Total devuelto', schedule: 'Cuadro de amortización',
      month: 'Mes', payment: 'Cuota', principalPart: 'Capital', interestPart: 'Intereses', balance: 'Saldo',
      note: 'No se incluyen comisiones, seguros ni cambios de tipo.',
    },
  },
  'pt-br': {
    title: 'Calculadora de empréstimo',
    desc: 'Parcela mensal e tabela completa, em prestação fixa ou amortização constante',
    short: 'Valor · taxa · prazo → parcela mensal',
    intro: [
      {
        h: 'Dois jeitos de devolver o mesmo empréstimo',
        p: 'Na prestação fixa (Price), todas as parcelas têm o mesmo tamanho; no começo quase tudo é juros e só depois o principal começa a cair rápido. Na amortização constante (SAC) você paga todo mês a mesma fatia de principal mais os juros sobre o que resta, então a primeira parcela é a maior e cada seguinte é menor.',
      },
      {
        h: 'Prestação fixa custa mais no total',
        p: 'Como o saldo cai mais devagar, acumula mais juros. O SAC sai mais barato no conjunto, mas exige mais nos primeiros meses — justamente quando a maioria pode menos. A resposta certa depende do seu fluxo de caixa, não de qual número é menor.',
      },
      {
        h: 'O que isto não sabe',
        p: 'Taxas de abertura, seguro, multa por quitação antecipada e qualquer juro que mude no meio do caminho não entram na conta. Num financiamento longo, isso pode mexer no custo real mais do que meio ponto de diferença na taxa.',
      },
    ],
    faq: [
      { q: 'Qual sistema é mais barato?', a: 'O SAC, em juros totais. A diferença cresce com o prazo: em 30 anos pode ser expressiva, num carro em 3 anos é pequena.' },
      { q: 'Por que minha primeira parcela é quase toda juros?', a: 'Os juros incidem sobre o saldo devedor, que está no máximo no início. Na prestação fixa a divisão vai migrando para o principal conforme o saldo cai.' },
      { q: 'A taxa é anual?', a: 'É. Ela é dividida por doze para obter a taxa mensal, que é como quase todo crédito ao consumidor é cotado e calculado.' },
    ],
    ui: {
      section: 'Dados do empréstimo', amount: 'Valor', rate: 'Taxa anual (%)', years: 'Prazo (anos)',
      method: 'Sistema', level: 'Prestação fixa (Price)', straight: 'Amortização constante (SAC)',
      calc: 'Calcular', monthly: 'Parcela mensal', firstMonth: 'Primeira parcela',
      totalInterest: 'Juros totais', totalPaid: 'Total pago', schedule: 'Tabela',
      month: 'Mês', payment: 'Parcela', principalPart: 'Amortização', interestPart: 'Juros', balance: 'Saldo',
      note: 'Taxas, seguro e mudanças de juros não estão incluídos.',
    },
  },
  ja: {
    title: 'ローン返済計算機',
    desc: '毎月の返済額と返済予定表を、元利均等・元金均等の二方式で',
    short: '借入額・金利・期間 → 毎月返済額',
    intro: [
      {
        h: '同じ借入の返し方が二つあります',
        p: '元利均等では毎月の返済額が同じです。はじめのうちはその大半が利息で、元金が目立って減りはじめるのはあとになってからです。元金均等では毎月同じだけ元金を返し、残りにかかる利息を足すので、初回がいちばん重く、以後は少しずつ軽くなります。',
      },
      {
        h: '総額では元利均等のほうが高くつきます',
        p: '残高の減りが遅いぶん、利息が多く積み上がるからです。元金均等は総額では安いものの、初期の負担が重い — そしてその時期こそ、多くの人にとっていちばん苦しい時期です。どちらがよいかは手元の資金繰りの問題で、数字の小ささの問題ではありません。',
      },
      {
        h: 'この計算に入っていないもの',
        p: '事務手数料、保険、繰上返済の手数料、途中で変わる金利は考えていません。長い住宅ローンでは、それらが金利0.5%の差より大きく効くことがあります。',
      },
    ],
    faq: [
      { q: 'どちらが安いですか。', a: '利息の総額では元金均等です。差は期間が長いほど開きます。30年なら大きく、3年の自動車ローンならわずかです。' },
      { q: '初回の返済がほとんど利息なのはなぜですか。', a: '利息は残っている元金にかかるからです。残高は最初がいちばん大きいので、利息もそこで最大になります。元利均等では残高が減るにつれて元金の割合が増えていきます。' },
      { q: '入れる金利は年利ですか。', a: '年利です。12で割って月利にします。消費者向けローンの表示と計算はこの形が普通です。' },
    ],
    ui: {
      section: '借入の内容', amount: '借入額', rate: '年利 (%)', years: '期間（年）',
      method: '返済方式', level: '元利均等', straight: '元金均等',
      calc: '計算する', monthly: '毎月の返済額', firstMonth: '初回返済額',
      totalInterest: '利息の総額', totalPaid: '返済総額', schedule: '返済予定表',
      month: '回', payment: '返済額', principalPart: '元金', interestPart: '利息', balance: '残高',
      note: '手数料・保険・金利変動は含みません。',
    },
  },
  de: {
    title: 'Kreditrechner',
    desc: 'Monatsrate und vollständiger Tilgungsplan, als Annuität oder mit gleicher Tilgung',
    short: 'Betrag · Zins · Laufzeit → Monatsrate',
    intro: [
      {
        h: 'Zwei Wege, denselben Kredit zurückzuzahlen',
        p: 'Beim Annuitätendarlehen ist jede Rate gleich groß; anfangs besteht sie überwiegend aus Zinsen, und erst später sinkt die Restschuld spürbar. Beim Tilgungsdarlehen zahlst du jeden Monat denselben Tilgungsanteil plus Zinsen auf den Rest — die erste Rate ist die höchste, jede weitere kleiner.',
      },
      {
        h: 'Die Annuität kostet insgesamt mehr',
        p: 'Weil die Restschuld langsamer sinkt, laufen mehr Zinsen auf. Das Tilgungsdarlehen ist unterm Strich günstiger, verlangt aber in den ersten Monaten mehr — genau dann, wenn die meisten am wenigsten übrig haben. Was richtig ist, entscheidet dein Zahlungsfluss, nicht die kleinere Zahl.',
      },
      {
        h: 'Was hier nicht drinsteckt',
        p: 'Bearbeitungsgebühren, Versicherungen, Vorfälligkeitsentschädigung und ein Zins, der sich unterwegs ändert, sind nicht abgebildet. Bei einer langen Baufinanzierung können die den tatsächlichen Preis stärker verschieben als ein halber Zinspunkt.',
      },
    ],
    faq: [
      { q: 'Welche Variante ist günstiger?', a: 'Das Tilgungsdarlehen, bei den Gesamtzinsen. Der Unterschied wächst mit der Laufzeit: über 30 Jahre erheblich, bei einem Autokredit über 3 Jahre gering.' },
      { q: 'Warum ist meine erste Rate fast nur Zins?', a: 'Zinsen fallen auf die Restschuld an, und die ist am Anfang am höchsten. Bei der Annuität verschiebt sich das Verhältnis nach und nach zur Tilgung, während die Restschuld sinkt.' },
      { q: 'Ist der Zinssatz jährlich?', a: 'Ja. Er wird durch zwölf geteilt, um den Monatszins zu erhalten — so werden Verbraucherkredite üblicherweise ausgewiesen und gerechnet.' },
    ],
    ui: {
      section: 'Kreditdaten', amount: 'Kreditbetrag', rate: 'Jahreszins (%)', years: 'Laufzeit (Jahre)',
      method: 'Tilgungsart', level: 'Annuitätendarlehen', straight: 'Tilgungsdarlehen',
      calc: 'Berechnen', monthly: 'Monatsrate', firstMonth: 'Erste Rate',
      totalInterest: 'Zinsen gesamt', totalPaid: 'Gesamt zurückgezahlt', schedule: 'Tilgungsplan',
      month: 'Monat', payment: 'Rate', principalPart: 'Tilgung', interestPart: 'Zinsen', balance: 'Restschuld',
      note: 'Gebühren, Versicherungen und Zinsänderungen sind nicht enthalten.',
    },
  },
  fr: {
    title: 'Calculateur de prêt',
    desc: 'Mensualité et tableau d’amortissement, en mensualité constante ou amortissement constant',
    short: 'Montant · taux · durée → mensualité',
    intro: [
      {
        h: 'Deux façons de rembourser le même prêt',
        p: 'En mensualité constante, chaque échéance a le même montant ; au début elle est surtout composée d’intérêts, et le capital ne baisse vite que plus tard. En amortissement constant, vous remboursez chaque mois la même part de capital plus les intérêts sur ce qui reste : la première échéance est la plus lourde et chacune suivante est plus légère.',
      },
      {
        h: 'La mensualité constante coûte plus cher au total',
        p: 'Comme le capital restant dû baisse plus lentement, davantage d’intérêts s’accumulent. L’amortissement constant revient moins cher globalement, mais exige plus les premiers mois — précisément quand la plupart des gens le peuvent le moins. Le bon choix dépend de votre trésorerie, pas du plus petit nombre.',
      },
      {
        h: 'Ce que ce calcul ignore',
        p: 'Frais de dossier, assurance emprunteur, indemnités de remboursement anticipé et taux variable en cours de route ne sont pas modélisés. Sur un prêt immobilier long, cela peut peser plus lourd qu’un demi-point de taux.',
      },
    ],
    faq: [
      { q: 'Quelle méthode coûte le moins ?', a: 'L’amortissement constant, en intérêts totaux. L’écart grandit avec la durée : sur 30 ans il est net, sur un crédit auto de 3 ans il reste faible.' },
      { q: 'Pourquoi ma première échéance est-elle surtout des intérêts ?', a: 'Les intérêts portent sur le capital restant dû, qui est à son maximum au départ. En mensualité constante, la part de capital augmente progressivement à mesure que le solde baisse.' },
      { q: 'Le taux est-il annuel ?', a: 'Oui. Il est divisé par douze pour obtenir le taux mensuel, comme la plupart des crédits à la consommation sont affichés et calculés.' },
    ],
    ui: {
      section: 'Détails du prêt', amount: 'Montant emprunté', rate: 'Taux annuel (%)', years: 'Durée (années)',
      method: 'Mode de remboursement', level: 'Mensualité constante', straight: 'Amortissement constant',
      calc: 'Calculer', monthly: 'Mensualité', firstMonth: 'Première échéance',
      totalInterest: 'Intérêts totaux', totalPaid: 'Total remboursé', schedule: 'Tableau d’amortissement',
      month: 'Mois', payment: 'Échéance', principalPart: 'Capital', interestPart: 'Intérêts', balance: 'Capital restant',
      note: 'Frais, assurance et variations de taux ne sont pas inclus.',
    },
  },
  hi: {
    title: 'लोन किश्त कैलकुलेटर',
    desc: 'मासिक किश्त और पूरा शेड्यूल — समान किश्त या समान मूलधन दोनों तरीक़ों से',
    short: 'रक़म · दर · अवधि → मासिक किश्त',
    intro: [
      {
        h: 'एक ही लोन चुकाने के दो तरीक़े',
        p: 'समान किश्त (EMI) में हर महीने की रक़म एक-सी रहती है; शुरू में उसका बड़ा हिस्सा ब्याज होता है और मूलधन बाद में जाकर तेज़ी से घटने लगता है। समान मूलधन में आप हर महीने मूलधन का एक बराबर हिस्सा चुकाते हैं और बचे हुए पर ब्याज जोड़ते हैं — इसलिए पहली किश्त सबसे भारी होती है और आगे हर किश्त हल्की।',
      },
      {
        h: 'कुल मिलाकर EMI महँगी पड़ती है',
        p: 'क्योंकि बक़ाया धीरे घटता है, ब्याज ज़्यादा जुड़ता है। समान मूलधन कुल मिलाकर सस्ता है, पर शुरुआती महीनों में ज़्यादा माँगता है — और वही समय ज़्यादातर लोगों के लिए सबसे तंग होता है। सही जवाब आपके नक़दी प्रवाह पर निर्भर करता है, इस पर नहीं कि कौन-सी संख्या छोटी है।',
      },
      {
        h: 'यह हिसाब क्या नहीं जानता',
        p: 'प्रोसेसिंग फ़ीस, बीमा, समय से पहले चुकाने का शुल्क और बीच में बदलने वाली ब्याज दर इसमें नहीं हैं। लंबे होम लोन में ये चीज़ें असली लागत को आधे प्रतिशत के फ़र्क़ से भी ज़्यादा हिला सकती हैं।',
      },
    ],
    faq: [
      { q: 'कौन-सा तरीक़ा सस्ता है?', a: 'कुल ब्याज में समान मूलधन वाला। अवधि जितनी लंबी, अंतर उतना बड़ा: 30 साल में काफ़ी, 3 साल के कार लोन में मामूली।' },
      { q: 'पहली किश्त लगभग पूरी ब्याज क्यों है?', a: 'ब्याज बक़ाया मूलधन पर लगता है, और वह शुरू में सबसे ज़्यादा होता है। EMI में बक़ाया घटने के साथ हिस्सा धीरे-धीरे मूलधन की ओर खिसकता है।' },
      { q: 'क्या दर वार्षिक है?', a: 'हाँ। मासिक दर पाने के लिए उसे बारह से भाग दिया जाता है — उपभोक्ता लोन इसी तरह बताए और गिने जाते हैं।' },
    ],
    ui: {
      section: 'लोन का ब्योरा', amount: 'लोन की रक़म', rate: 'वार्षिक दर (%)', years: 'अवधि (साल)',
      method: 'चुकाने का तरीक़ा', level: 'समान किश्त (EMI)', straight: 'समान मूलधन',
      calc: 'गणना करें', monthly: 'मासिक किश्त', firstMonth: 'पहली किश्त',
      totalInterest: 'कुल ब्याज', totalPaid: 'कुल चुकाया', schedule: 'शेड्यूल',
      month: 'महीना', payment: 'किश्त', principalPart: 'मूलधन', interestPart: 'ब्याज', balance: 'बक़ाया',
      note: 'फ़ीस, बीमा और दर में बदलाव शामिल नहीं हैं।',
    },
  },
  'zh-hans': {
    title: '贷款还款计算器',
    desc: '按等额本息或等额本金算出月供和完整还款表',
    short: '金额 · 利率 · 期限 → 每月还款',
    intro: [
      {
        h: '同一笔贷款有两种还法',
        p: '等额本息里每期还的钱一样多；前期绝大部分是利息，本金要到后面才明显下降。等额本金是每月还同样多的本金，再加上剩余部分的利息，所以第一期最重，之后一期比一期轻。',
      },
      {
        h: '总额上等额本息更贵',
        p: '因为余额降得慢，累积的利息就多。等额本金总体便宜，但前几个月要掏得更多——而那段时间恰恰是大多数人最紧的时候。选哪个取决于你的现金流，不取决于哪个数字更小。',
      },
      {
        h: '这个算法不知道的东西',
        p: '手续费、保险、提前还款违约金，以及中途会变的利率，都没有算进去。在长期房贷里，这些东西对真实成本的影响可能比半个点的利率差还大。',
      },
    ],
    faq: [
      { q: '哪种更省钱？', a: '总利息上是等额本金。期限越长差得越多：30 年能差出不少，3 年的车贷则很小。' },
      { q: '为什么第一期几乎都是利息？', a: '利息按剩余本金计算，而剩余本金在最开始时最大。等额本息里，随着余额下降，本金占比会慢慢升上来。' },
      { q: '填的是年利率吗？', a: '是。它会除以十二得到月利率——消费贷款通常就是这样报价和计算的。' },
    ],
    ui: {
      section: '贷款信息', amount: '贷款金额', rate: '年利率 (%)', years: '期限（年）',
      method: '还款方式', level: '等额本息', straight: '等额本金',
      calc: '计算', monthly: '每月还款', firstMonth: '首期还款',
      totalInterest: '利息总额', totalPaid: '还款总额', schedule: '还款计划',
      month: '期', payment: '还款额', principalPart: '本金', interestPart: '利息', balance: '剩余本金',
      note: '不含手续费、保险和利率变动。',
    },
  },
  'zh-hant': {
    title: '貸款還款計算機',
    desc: '按本息平均或本金平均算出月付金和完整還款表',
    short: '金額 · 利率 · 期限 → 每月還款',
    intro: [
      {
        h: '同一筆貸款有兩種還法',
        p: '本息平均攤還裡每期還的錢一樣多；前期絕大部分是利息，本金要到後面才明顯下降。本金平均攤還是每月還同樣多的本金，再加上剩餘部分的利息，所以第一期最重，之後一期比一期輕。',
      },
      {
        h: '總額上本息平均更貴',
        p: '因為餘額降得慢，累積的利息就多。本金平均總體便宜，但前幾個月要掏得更多——而那段時間恰恰是大多數人最緊的時候。選哪個取決於你的現金流，不取決於哪個數字更小。',
      },
      {
        h: '這個算法不知道的東西',
        p: '手續費、保險、提前清償違約金，以及中途會變的利率，都沒有算進去。在長期房貸裡，這些東西對真實成本的影響可能比半個百分點的利率差還大。',
      },
    ],
    faq: [
      { q: '哪種更省錢？', a: '總利息上是本金平均。期限越長差得越多：30 年能差出不少，3 年的車貸則很小。' },
      { q: '為什麼第一期幾乎都是利息？', a: '利息按剩餘本金計算，而剩餘本金在最開始時最大。本息平均裡，隨著餘額下降，本金占比會慢慢升上來。' },
      { q: '填的是年利率嗎？', a: '是。它會除以十二得到月利率——消費貸款通常就是這樣報價和計算的。' },
    ],
    ui: {
      section: '貸款資訊', amount: '貸款金額', rate: '年利率 (%)', years: '期限（年）',
      method: '還款方式', level: '本息平均攤還', straight: '本金平均攤還',
      calc: '計算', monthly: '每月還款', firstMonth: '首期還款',
      totalInterest: '利息總額', totalPaid: '還款總額', schedule: '還款計畫',
      month: '期', payment: '還款額', principalPart: '本金', interestPart: '利息', balance: '剩餘本金',
      note: '不含手續費、保險和利率變動。',
    },
  },
};
