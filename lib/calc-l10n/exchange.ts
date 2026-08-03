import type { CalcTable } from './types.ts';

/**
 * 환율 — 한국어판은 원화를 기준으로 고정돼 있지만, 여기서는 어느 통화에서
 * 어느 통화로든 바꿀 수 있게 열어 뒀다. 통화 이름은 Intl.DisplayNames가
 * 언어별로 내주므로 표에 적지 않는다. defFrom/defTo만 언어마다 다르다.
 */
export const EXCHANGE: CalcTable = {
  en: {
    title: 'Currency converter',
    desc: 'Convert between currencies at today’s reference rate',
    short: 'Live reference rates',
    intro: [
      {
        h: 'This is the mid-market rate',
        p: 'The figure quoted here sits halfway between what buyers and sellers are paying wholesale. It is the number you see in the news, and it is not the number you get at a counter — banks and exchange desks price above it and keep the difference.',
      },
      {
        h: 'The spread is the real cost',
        p: 'A booth advertising "no commission" still makes money, by quoting a rate worse than the market. Compare the total you actually receive rather than the fee: a two or three per cent gap is common at airports and easy to miss when there is no explicit charge.',
      },
      {
        h: 'Rates move all day',
        p: 'This uses the latest available reference rate, refreshed daily. For a small transfer that is close enough; for a large one, the rate at the moment your transaction settles is what will apply, and it may differ from what you see here.',
      },
    ],
    faq: [
      { q: 'Why is the rate at my bank worse than this?', a: 'Because the bank buys at one price and sells at another, and keeps the gap. The mid-market rate shown here is the midpoint between those two, so any real transaction lands on one side of it.' },
      { q: 'How often is this updated?', a: 'Once a day from the reference source. Currencies trade continuously, so intra-day moves are not reflected — for volatile pairs the difference over a few hours can be visible.' },
      { q: 'Can I use this for tax or accounting?', a: 'Check what your tax authority requires first. Many mandate a specific official rate for a specific date, which will not always match a commercial reference feed.' },
    ],
    ui: {
      section: 'Convert', amount: 'Amount', from: 'From', to: 'To', swap: 'Swap',
      result: 'Result', rateLine: 'Rate', updated: 'Rate as of',
      loading: 'Loading rates…', failed: 'Could not load exchange rates. Try again shortly.',
      defFrom: 'USD', defTo: 'EUR',
    },
  },
  es: {
    title: 'Conversor de divisas',
    desc: 'Convierte entre monedas al tipo de referencia de hoy',
    short: 'Tipos de referencia actualizados',
    intro: [
      {
        h: 'Este es el tipo medio de mercado',
        p: 'La cifra que aparece aquí está a medio camino entre lo que pagan compradores y vendedores al por mayor. Es el número que sale en las noticias, y no es el que te dan en ventanilla: bancos y casas de cambio cotizan por encima y se quedan la diferencia.',
      },
      {
        h: 'El diferencial es el coste real',
        p: 'Una casa que anuncia «sin comisión» sigue ganando dinero cotizando un tipo peor que el de mercado. Compara el total que recibes de verdad, no la comisión: un margen del dos o tres por ciento es habitual en aeropuertos y pasa desapercibido cuando no hay cargo explícito.',
      },
      {
        h: 'Los tipos se mueven todo el día',
        p: 'Aquí se usa el último tipo de referencia disponible, actualizado a diario. Para un envío pequeño es suficiente; para uno grande, el tipo que se aplicará será el del momento en que se liquide la operación, y puede no coincidir con este.',
      },
    ],
    faq: [
      { q: '¿Por qué el tipo de mi banco es peor que este?', a: 'Porque el banco compra a un precio y vende a otro, y se queda el hueco. El tipo medio de mercado que ves aquí es el punto intermedio entre ambos, así que cualquier operación real cae a un lado.' },
      { q: '¿Con qué frecuencia se actualiza?', a: 'Una vez al día desde la fuente de referencia. Las divisas cotizan de forma continua, así que los movimientos intradía no se reflejan; en pares volátiles la diferencia en unas horas puede notarse.' },
      { q: '¿Puedo usarlo para impuestos o contabilidad?', a: 'Consulta antes qué exige tu administración. Muchas imponen un tipo oficial concreto para una fecha concreta, y no siempre coincide con una fuente comercial de referencia.' },
    ],
    ui: {
      section: 'Convertir', amount: 'Importe', from: 'De', to: 'A', swap: 'Invertir',
      result: 'Resultado', rateLine: 'Tipo', updated: 'Tipo a fecha de',
      loading: 'Cargando tipos…', failed: 'No se han podido cargar los tipos de cambio. Inténtalo en un momento.',
      defFrom: 'EUR', defTo: 'USD',
    },
  },
  'pt-br': {
    title: 'Conversor de moedas',
    desc: 'Converta entre moedas pela taxa de referência de hoje',
    short: 'Taxas de referência atualizadas',
    intro: [
      {
        h: 'Esta é a taxa média de mercado',
        p: 'O número mostrado aqui fica no meio entre o que compradores e vendedores pagam no atacado. É o número que aparece no noticiário, e não é o que você recebe no balcão — bancos e casas de câmbio cotam acima dele e ficam com a diferença.',
      },
      {
        h: 'O spread é o custo real',
        p: 'Uma casa que anuncia "sem taxa" continua ganhando dinheiro ao cotar uma taxa pior que a de mercado. Compare o total que você realmente recebe, não a tarifa: uma diferença de dois ou três por cento é comum em aeroportos e passa despercebida quando não há cobrança explícita.',
      },
      {
        h: 'As taxas mudam o dia inteiro',
        p: 'Aqui se usa a última taxa de referência disponível, atualizada diariamente. Para uma remessa pequena isso basta; para uma grande, vale a taxa do momento em que a operação for liquidada, que pode não ser esta.',
      },
    ],
    faq: [
      { q: 'Por que a taxa do meu banco é pior que esta?', a: 'Porque o banco compra a um preço e vende a outro, e fica com a diferença. A taxa média mostrada aqui é o ponto entre as duas, então qualquer operação real cai de um dos lados.' },
      { q: 'Com que frequência isso é atualizado?', a: 'Uma vez por dia, a partir da fonte de referência. Moedas negociam continuamente, então movimentos ao longo do dia não aparecem; em pares voláteis a diferença em poucas horas pode ser visível.' },
      { q: 'Posso usar isso para imposto ou contabilidade?', a: 'Veja antes o que o fisco exige. Muitos determinam uma taxa oficial específica para uma data específica, que nem sempre bate com uma fonte comercial de referência.' },
    ],
    ui: {
      section: 'Converter', amount: 'Valor', from: 'De', to: 'Para', swap: 'Inverter',
      result: 'Resultado', rateLine: 'Taxa', updated: 'Taxa de',
      loading: 'Carregando taxas…', failed: 'Não foi possível carregar as taxas de câmbio. Tente daqui a pouco.',
      defFrom: 'BRL', defTo: 'USD',
    },
  },
  ja: {
    title: '為替レート計算機',
    desc: '本日の基準レートで通貨を換算します',
    short: '最新の基準レート',
    intro: [
      {
        h: 'これは仲値です',
        p: 'ここに出る数字は、卸売りの買い手と売り手の値のちょうど真ん中です。ニュースで見るのはこの数字ですが、窓口で受け取れる数字ではありません。銀行や両替所はこれより自分に有利な値を出し、その差を取ります。',
      },
      {
        h: '本当の手数料は差額のほうです',
        p: '「手数料無料」と書かれた両替所も、市場より悪いレートを出すことで利益を得ています。手数料ではなく最終的に受け取る額で比べてください。空港では2〜3%の差がよくあり、明示の手数料がないぶん気づきにくくなっています。',
      },
      {
        h: 'レートは一日中動きます',
        p: 'ここでは日次で更新される最新の基準レートを使っています。少額ならこれで十分ですが、大きな金額では実際に決済された時点のレートが適用され、ここの表示とは違うことがあります。',
      },
    ],
    faq: [
      { q: '銀行のレートがこれより悪いのはなぜですか。', a: '銀行は買う値と売る値を別に持ち、その差を取るからです。ここに出る仲値はその二つの真ん中なので、実際の取引はかならずどちらか片側に寄ります。' },
      { q: 'どのくらいの頻度で更新されますか。', a: '基準となる情報元から1日に1回です。通貨は常時取引されているので日中の動きは反映されません。値動きの大きい通貨では数時間で差が見えることもあります。' },
      { q: '税務や会計に使えますか。', a: '先に当局の要件を確かめてください。特定の日付の特定の公表レートを求められることが多く、商用の基準レートと一致するとは限りません。' },
    ],
    ui: {
      section: '換算', amount: '金額', from: '変換元', to: '変換先', swap: '入れ替え',
      result: '換算結果', rateLine: 'レート', updated: '基準日',
      loading: 'レートを読み込んでいます…', failed: '為替レートを取得できませんでした。少し待ってからお試しください。',
      defFrom: 'JPY', defTo: 'USD',
    },
  },
  de: {
    title: 'Währungsrechner',
    desc: 'Währungen zum heutigen Referenzkurs umrechnen',
    short: 'Aktuelle Referenzkurse',
    intro: [
      {
        h: 'Das ist der Mittelkurs',
        p: 'Die hier genannte Zahl liegt genau zwischen dem, was Käufer und Verkäufer im Großhandel zahlen. Es ist die Zahl aus den Nachrichten — und nicht die, die Sie am Schalter bekommen. Banken und Wechselstuben stellen einen Kurs zu ihren Gunsten und behalten die Differenz.',
      },
      {
        h: 'Die Spanne ist der eigentliche Preis',
        p: 'Eine Wechselstube mit dem Schild "keine Gebühr" verdient trotzdem, nämlich über einen schlechteren Kurs. Vergleichen Sie den Betrag, den Sie am Ende erhalten, nicht die Gebühr: zwei bis drei Prozent Abstand sind an Flughäfen üblich und fallen ohne ausgewiesene Gebühr kaum auf.',
      },
      {
        h: 'Kurse bewegen sich den ganzen Tag',
        p: 'Verwendet wird der zuletzt verfügbare Referenzkurs, täglich aktualisiert. Für kleine Beträge reicht das; bei großen gilt der Kurs zum Zeitpunkt der Abwicklung, und der kann von dem hier abweichen.',
      },
    ],
    faq: [
      { q: 'Warum ist der Kurs meiner Bank schlechter als dieser?', a: 'Weil die Bank zu einem Preis kauft und zu einem anderen verkauft und die Lücke behält. Der hier gezeigte Mittelkurs liegt genau dazwischen, also landet jedes echte Geschäft auf einer der beiden Seiten.' },
      { q: 'Wie oft wird aktualisiert?', a: 'Einmal täglich aus der Referenzquelle. Devisen werden fortlaufend gehandelt, Bewegungen innerhalb des Tages erscheinen also nicht; bei volatilen Paaren kann der Unterschied nach wenigen Stunden sichtbar sein.' },
      { q: 'Darf ich das für Steuer oder Buchhaltung nehmen?', a: 'Prüfen Sie zuerst, was Ihre Behörde verlangt. Häufig ist ein bestimmter amtlicher Kurs zu einem bestimmten Datum vorgeschrieben, der nicht immer zu einer kommerziellen Referenzquelle passt.' },
    ],
    ui: {
      section: 'Umrechnen', amount: 'Betrag', from: 'Von', to: 'Nach', swap: 'Tauschen',
      result: 'Ergebnis', rateLine: 'Kurs', updated: 'Kurs vom',
      loading: 'Kurse werden geladen…', failed: 'Wechselkurse konnten nicht geladen werden. Bitte gleich noch einmal versuchen.',
      defFrom: 'EUR', defTo: 'USD',
    },
  },
  fr: {
    title: 'Convertisseur de devises',
    desc: 'Convertir entre devises au taux de référence du jour',
    short: 'Taux de référence à jour',
    intro: [
      {
        h: 'Il s’agit du taux médian du marché',
        p: 'Le chiffre affiché ici se situe à mi-chemin entre ce que paient acheteurs et vendeurs en gros. C’est celui que reprennent les journaux, et ce n’est pas celui du guichet : banques et bureaux de change cotent au-dessus et gardent l’écart.',
      },
      {
        h: 'L’écart, voilà le vrai coût',
        p: 'Un bureau affichant « sans commission » gagne quand même de l’argent, en proposant un taux moins bon que le marché. Comparez le montant réellement reçu plutôt que les frais : deux ou trois pour cent d’écart sont courants dans les aéroports et passent inaperçus faute de frais affichés.',
      },
      {
        h: 'Les taux bougent toute la journée',
        p: 'On utilise ici le dernier taux de référence disponible, actualisé chaque jour. Pour un petit transfert cela suffit ; pour un gros, c’est le taux au moment du dénouement qui s’applique, et il peut différer de celui-ci.',
      },
    ],
    faq: [
      { q: 'Pourquoi le taux de ma banque est-il moins bon ?', a: 'Parce qu’elle achète à un prix et vend à un autre, et conserve l’écart. Le taux médian montré ici est le point milieu entre les deux : toute opération réelle tombe d’un côté ou de l’autre.' },
      { q: 'À quelle fréquence est-ce mis à jour ?', a: 'Une fois par jour depuis la source de référence. Les devises se traitent en continu, les mouvements intrajournaliers n’apparaissent donc pas ; sur des paires volatiles, l’écart en quelques heures peut se voir.' },
      { q: 'Puis-je m’en servir pour la fiscalité ou la comptabilité ?', a: 'Vérifiez d’abord ce qu’exige votre administration. Beaucoup imposent un taux officiel précis à une date précise, qui ne correspond pas toujours à une source commerciale de référence.' },
    ],
    ui: {
      section: 'Convertir', amount: 'Montant', from: 'De', to: 'Vers', swap: 'Inverser',
      result: 'Résultat', rateLine: 'Taux', updated: 'Taux au',
      loading: 'Chargement des taux…', failed: 'Impossible de charger les taux de change. Réessayez dans un instant.',
      defFrom: 'EUR', defTo: 'USD',
    },
  },
  hi: {
    title: 'मुद्रा परिवर्तक',
    desc: 'आज की संदर्भ दर पर मुद्राएँ बदलें',
    short: 'ताज़ा संदर्भ दरें',
    intro: [
      {
        h: 'यह मध्य-बाज़ार दर है',
        p: 'यहाँ दिखने वाला आंकड़ा थोक में ख़रीदने और बेचने वालों के भाव के ठीक बीच का है। ख़बरों में यही संख्या आती है, और काउंटर पर मिलने वाली यह नहीं होती — बैंक और मुद्रा विनिमय केंद्र इससे अपने पक्ष में भाव देते हैं और अंतर रख लेते हैं।',
      },
      {
        h: 'असली लागत यही अंतर है',
        p: '"कोई शुल्क नहीं" लिखने वाला काउंटर भी कमाता है — बाज़ार से ख़राब दर देकर। शुल्क नहीं, अंत में मिलने वाली कुल रकम मिलाइए: हवाई अड्डों पर दो-तीन प्रतिशत का अंतर आम है और शुल्क न दिखने पर पकड़ में नहीं आता।',
      },
      {
        h: 'दरें दिन भर हिलती रहती हैं',
        p: 'यहाँ रोज़ अपडेट होने वाली नवीनतम संदर्भ दर इस्तेमाल होती है। छोटी रकम के लिए यह काफ़ी है; बड़ी रकम पर वही दर लगेगी जो लेन-देन निपटने के समय होगी, और वह इससे अलग हो सकती है।',
      },
    ],
    faq: [
      { q: 'मेरे बैंक की दर इससे ख़राब क्यों है?', a: 'क्योंकि बैंक एक भाव पर ख़रीदता है और दूसरे पर बेचता है, और बीच का अंतर रख लेता है। यहाँ दिखी मध्य दर उन्हीं दो के बीच का बिंदु है, इसलिए हर असली सौदा किसी एक तरफ़ गिरता है।' },
      { q: 'यह कितनी बार अपडेट होता है?', a: 'संदर्भ स्रोत से दिन में एक बार। मुद्राओं का कारोबार लगातार चलता है, इसलिए दिन के भीतर की हलचल यहाँ नहीं दिखती; उतार-चढ़ाव वाले जोड़ों में कुछ घंटों का अंतर भी नज़र आ सकता है।' },
      { q: 'क्या इसे कर या लेखा के लिए इस्तेमाल कर सकता हूँ?', a: 'पहले देख लें कि आपका कर विभाग क्या माँगता है। कई जगह किसी तय तारीख़ की तय आधिकारिक दर अनिवार्य होती है, जो व्यावसायिक संदर्भ स्रोत से हमेशा नहीं मिलती।' },
    ],
    ui: {
      section: 'बदलें', amount: 'रकम', from: 'से', to: 'में', swap: 'उलटें',
      result: 'परिणाम', rateLine: 'दर', updated: 'दर की तारीख़',
      loading: 'दरें आ रही हैं…', failed: 'विनिमय दरें नहीं मिल सकीं। थोड़ी देर बाद कोशिश करें।',
      defFrom: 'INR', defTo: 'USD',
    },
  },
  'zh-hans': {
    title: '汇率换算器',
    desc: '按今天的参考汇率换算货币',
    short: '最新参考汇率',
    intro: [
      {
        h: '这是中间价',
        p: '这里给出的数字处在批发市场买价和卖价的正中间。新闻里说的就是它，但柜台给你的不是它——银行和兑换点会报一个对自己有利的价，把差额留下。',
      },
      {
        h: '真正的成本是价差',
        p: '挂着"免手续费"的兑换点照样赚钱，靠的是报一个比市场差的汇率。要比的是最终到手多少，而不是手续费：机场两三个百分点的差价很常见，没有明示收费时最容易忽略。',
      },
      {
        h: '汇率整天都在动',
        p: '这里用的是每日更新的最新参考汇率。小额换汇够用；大额的话，真正适用的是交易清算那一刻的汇率，可能和这里看到的不一样。',
      },
    ],
    faq: [
      { q: '为什么银行的汇率比这个差？', a: '因为银行按一个价买、按另一个价卖，中间的差额归它。这里显示的中间价正好在两者之间，所以任何真实交易都会落在其中一侧。' },
      { q: '多久更新一次？', a: '每天从参考数据源更新一次。外汇是连续交易的，日内的波动不会反映出来；波动大的货币对，几个小时的差别就能看出来。' },
      { q: '能用于报税或记账吗？', a: '先看你所在地税务机关的要求。很多地方规定必须用特定日期的特定官方汇率，未必和商业参考数据一致。' },
    ],
    ui: {
      section: '换算', amount: '金额', from: '从', to: '换成', swap: '互换',
      result: '换算结果', rateLine: '汇率', updated: '汇率日期',
      loading: '正在获取汇率…', failed: '汇率加载失败，请稍后再试。',
      defFrom: 'CNY', defTo: 'USD',
    },
  },
  'zh-hant': {
    title: '匯率換算器',
    desc: '按今天的參考匯率換算貨幣',
    short: '最新參考匯率',
    intro: [
      {
        h: '這是中間價',
        p: '這裡給出的數字處在批發市場買價和賣價的正中間。新聞裡說的就是它，但櫃檯給你的不是它——銀行和兌換點會報一個對自己有利的價，把差額留下。',
      },
      {
        h: '真正的成本是價差',
        p: '掛著「免手續費」的兌換點照樣賺錢，靠的是報一個比市場差的匯率。要比的是最終到手多少，而不是手續費：機場兩三個百分點的差價很常見，沒有明示收費時最容易忽略。',
      },
      {
        h: '匯率整天都在動',
        p: '這裡用的是每日更新的最新參考匯率。小額換匯夠用；大額的話，真正適用的是交易清算那一刻的匯率，可能和這裡看到的不一樣。',
      },
    ],
    faq: [
      { q: '為什麼銀行的匯率比這個差？', a: '因為銀行按一個價買、按另一個價賣，中間的差額歸它。這裡顯示的中間價正好在兩者之間，所以任何真實交易都會落在其中一側。' },
      { q: '多久更新一次？', a: '每天從參考資料來源更新一次。外匯是連續交易的，日內的波動不會反映出來；波動大的貨幣對，幾個小時的差別就能看出來。' },
      { q: '能用於報稅或記帳嗎？', a: '先看你所在地稅務機關的要求。很多地方規定必須用特定日期的特定官方匯率，未必和商業參考資料一致。' },
    ],
    ui: {
      section: '換算', amount: '金額', from: '從', to: '換成', swap: '互換',
      result: '換算結果', rateLine: '匯率', updated: '匯率日期',
      loading: '正在取得匯率…', failed: '匯率載入失敗，請稍後再試。',
      defFrom: 'TWD', defTo: 'USD',
    },
  },
};
