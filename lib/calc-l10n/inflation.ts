import type { CalcTable } from './types.ts';

/** 물가 — 미래 가치와 현재 가치 역산. 나라를 타지 않는다. */
export const INFLATION: CalcTable = {
  en: {
    title: 'Inflation calculator',
    desc: 'What an amount will need to be later, and what a future amount is worth today',
    short: 'Future cost · today’s value',
    intro: [
      {
        h: 'The number stays still while its value moves',
        p: 'Inflation does not change the amount in your account; it changes what that amount buys. Money you keep untouched loses purchasing power quietly, year after year, without anything visible happening to the balance.',
      },
      {
        h: 'Two ways to look at the same thing',
        p: 'Forwards: what will something that costs this much today cost in ten years. Backwards: a sum promised in ten years, what is it really worth now. The second is the one people skip, and it is what makes distant amounts look larger than they are.',
      },
      {
        h: 'A nominal return is not a real return',
        p: 'Earning 5% while prices rise 3% leaves you roughly 2% better off in real terms. Any return below the inflation rate is a loss of purchasing power, however positive the number looks. That is the comparison worth making before deciding where money sits.',
      },
    ],
    faq: [
      { q: 'What inflation rate should I use?', a: 'For a rough look ahead, many central banks target around 2%, and long-run historical averages in most developed economies sit between 2% and 3%. Your own experience depends on what you actually buy, which is why housing or education costs often feel far higher than the headline figure.' },
      { q: 'Why does the effect look so large over thirty years?', a: 'Because it compounds. At 3%, prices roughly double in 24 years — the yearly change is small and unremarkable, and that is exactly what makes it easy to underestimate over a working lifetime.' },
      { q: 'Does this predict actual prices?', a: 'No. It applies one constant rate you choose. Real inflation moves around, varies by category, and no single number describes everyone’s cost of living.' },
    ],
    ui: {
      tabFuture: 'What it will cost', tabPresent: 'What it is worth today',
      amount: 'Amount today', futureAmount: 'Amount in the future',
      rate: 'Inflation rate (%)', years: 'Years', calc: 'Calculate',
      resultFuture: 'Equivalent later', resultPresent: 'Worth today',
      cumulative: 'Total price rise', power: 'Purchasing power kept',
      table: 'Year by year', year: 'Year', value: 'Amount', powerCol: 'Purchasing power',
    },
  },
  es: {
    title: 'Calculadora de inflación',
    desc: 'Cuánto costará más adelante un importe de hoy, y cuánto vale hoy uno del futuro',
    short: 'Coste futuro · valor de hoy',
    intro: [
      {
        h: 'La cifra se queda quieta mientras su valor se mueve',
        p: 'La inflación no cambia el importe de tu cuenta; cambia lo que ese importe compra. El dinero que no tocas pierde poder adquisitivo en silencio, año tras año, sin que en el saldo ocurra nada visible.',
      },
      {
        h: 'Dos maneras de mirar lo mismo',
        p: 'Hacia delante: lo que hoy cuesta esto, cuánto costará en diez años. Hacia atrás: una suma prometida dentro de diez años, cuánto vale realmente ahora. La segunda es la que se salta la gente, y es la que hace que las cifras lejanas parezcan mayores de lo que son.',
      },
      {
        h: 'Rentabilidad nominal no es rentabilidad real',
        p: 'Ganar un 5% mientras los precios suben un 3% te deja aproximadamente un 2% mejor en términos reales. Cualquier rentabilidad por debajo de la inflación es una pérdida de poder adquisitivo, por muy positivo que parezca el número. Esa es la comparación que conviene hacer antes de decidir dónde está el dinero.',
      },
    ],
    faq: [
      { q: '¿Qué tasa de inflación pongo?', a: 'Para una mirada aproximada, muchos bancos centrales apuntan a un 2%, y las medias históricas de largo plazo en las economías desarrolladas se sitúan entre el 2% y el 3%. Tu experiencia depende de lo que compras, y por eso vivienda o educación suelen sentirse muy por encima del dato oficial.' },
      { q: '¿Por qué el efecto parece tan grande a treinta años?', a: 'Porque se compone. Al 3%, los precios se duplican aproximadamente en 24 años: la variación anual es pequeña y poco llamativa, y justamente por eso se subestima a lo largo de una vida laboral.' },
      { q: '¿Esto predice precios reales?', a: 'No. Aplica una tasa constante que tú eliges. La inflación real se mueve, varía por categoría, y ningún número único describe el coste de vida de todo el mundo.' },
    ],
    ui: {
      tabFuture: 'Cuánto costará', tabPresent: 'Cuánto vale hoy',
      amount: 'Importe de hoy', futureAmount: 'Importe en el futuro',
      rate: 'Tasa de inflación (%)', years: 'Años', calc: 'Calcular',
      resultFuture: 'Equivalente más adelante', resultPresent: 'Valor de hoy',
      cumulative: 'Subida total de precios', power: 'Poder adquisitivo conservado',
      table: 'Año a año', year: 'Año', value: 'Importe', powerCol: 'Poder adquisitivo',
    },
  },
  'pt-br': {
    title: 'Calculadora de inflação',
    desc: 'Quanto um valor de hoje vai custar depois, e quanto um valor futuro vale hoje',
    short: 'Custo futuro · valor de hoje',
    intro: [
      {
        h: 'O número fica parado enquanto o valor se move',
        p: 'A inflação não muda o valor na sua conta; muda o que esse valor compra. Dinheiro parado perde poder de compra em silêncio, ano após ano, sem que nada visível aconteça com o saldo.',
      },
      {
        h: 'Duas formas de olhar a mesma coisa',
        p: 'Para frente: o que custa isso hoje vai custar quanto em dez anos. Para trás: uma quantia prometida daqui a dez anos vale realmente quanto agora. A segunda é a que as pessoas pulam, e é ela que faz valores distantes parecerem maiores do que são.',
      },
      {
        h: 'Retorno nominal não é retorno real',
        p: 'Ganhar 5% enquanto os preços sobem 3% deixa você cerca de 2% melhor em termos reais. Qualquer retorno abaixo da inflação é perda de poder de compra, por mais positivo que o número pareça. É essa a comparação que vale fazer antes de decidir onde o dinheiro fica.',
      },
    ],
    faq: [
      { q: 'Que taxa de inflação devo usar?', a: 'Para uma olhada aproximada, muitos bancos centrais miram algo em torno de 2%, e as médias históricas de longo prazo nas economias desenvolvidas ficam entre 2% e 3%. Sua experiência depende do que você compra — por isso moradia ou educação costumam parecer bem acima do índice oficial.' },
      { q: 'Por que em trinta anos o efeito parece tão grande?', a: 'Porque ele se compõe. A 3%, os preços dobram em cerca de 24 anos: a variação anual é pequena e discreta, e é exatamente isso que faz subestimarem o efeito ao longo de uma vida de trabalho.' },
      { q: 'Isso prevê preços reais?', a: 'Não. Aplica uma taxa constante escolhida por você. A inflação real oscila, varia por categoria, e nenhum número único descreve o custo de vida de todo mundo.' },
    ],
    ui: {
      tabFuture: 'Quanto vai custar', tabPresent: 'Quanto vale hoje',
      amount: 'Valor de hoje', futureAmount: 'Valor no futuro',
      rate: 'Taxa de inflação (%)', years: 'Anos', calc: 'Calcular',
      resultFuture: 'Equivalente lá na frente', resultPresent: 'Valor de hoje',
      cumulative: 'Alta total de preços', power: 'Poder de compra preservado',
      table: 'Ano a ano', year: 'Ano', value: 'Valor', powerCol: 'Poder de compra',
    },
  },
  ja: {
    title: '物価の計算機',
    desc: 'いまの金額が将来いくらに相当するか、将来の金額はいまいくらの値打ちか',
    short: '将来の値段と現在価値',
    intro: [
      {
        h: '数字は動かないのに、値打ちは動きます',
        p: '物価の上昇は口座の金額を変えません。変わるのは、その金額で買えるものです。置いたままのお金は、残高に何も起きないまま、年ごとに静かに買う力を失っていきます。',
      },
      {
        h: '同じことを二方向から見ます',
        p: '前向きには、いまこの値段のものが10年後にいくらになるか。後ろ向きには、10年後に約束された金額がいまいくらの値打ちか。人が飛ばしがちなのは後者で、遠い先の金額が実際より大きく見えるのはそのためです。',
      },
      {
        h: '名目の利回りは実質の利回りではありません',
        p: '5%で回っても物価が3%上がれば、実質はおよそ2%です。物価上昇率を下回る利回りは、数字が正でも買う力としては目減りです。お金をどこに置くか決める前に、この比較をしておく価値があります。',
      },
    ],
    faq: [
      { q: '物価上昇率は何%で見ればよいですか。', a: 'おおよその見当なら、多くの中央銀行が2%前後を目標に置いており、先進国の長期平均も2〜3%あたりです。実感は買うものによって変わり、住居費や教育費が公表値よりずっと高く感じられるのはそのためです。' },
      { q: '30年で影響がこんなに大きく見えるのはなぜですか。', a: '積み重なるからです。3%なら24年ほどで物価はおよそ倍になります。1年ぶんの変化は小さく目立たず、まさにそれが働く年月のあいだ過小評価される理由です。' },
      { q: 'これは実際の物価を予測しますか。', a: 'しません。選んだ率を一定として当てはめるだけです。現実の物価は動き、品目によっても違い、一つの数字で誰かの生活費を言い表すことはできません。' },
    ],
    ui: {
      tabFuture: '将来いくらになるか', tabPresent: 'いまいくらの値打ちか',
      amount: 'いまの金額', futureAmount: '将来の金額',
      rate: '物価上昇率 (%)', years: '年数', calc: '計算する',
      resultFuture: '将来の相当額', resultPresent: '現在の値打ち',
      cumulative: '物価の上昇率', power: '残る購買力',
      table: '年ごとの推移', year: '年', value: '金額', powerCol: '購買力',
    },
  },
  de: {
    title: 'Inflationsrechner',
    desc: 'Was ein heutiger Betrag später kostet und was ein künftiger Betrag heute wert ist',
    short: 'Künftige Kosten · heutiger Wert',
    intro: [
      {
        h: 'Die Zahl steht still, ihr Wert nicht',
        p: 'Inflation verändert nicht den Betrag auf dem Konto, sondern das, was er kauft. Geld, das liegen bleibt, verliert leise Jahr für Jahr an Kaufkraft, ohne dass am Kontostand irgendetwas sichtbar geschähe.',
      },
      {
        h: 'Zwei Blickrichtungen auf dieselbe Sache',
        p: 'Vorwärts: Was heute so viel kostet, kostet in zehn Jahren wie viel? Rückwärts: Eine in zehn Jahren zugesagte Summe — was ist sie heute wirklich wert? Die zweite Frage wird meist übersprungen, und genau sie lässt ferne Beträge größer wirken, als sie sind.',
      },
      {
        h: 'Nominale Rendite ist nicht reale Rendite',
        p: '5% Ertrag bei 3% Preisanstieg lassen real rund 2% übrig. Jede Rendite unterhalb der Inflationsrate ist ein Kaufkraftverlust, so positiv die Zahl auch aussieht. Dieser Vergleich lohnt sich, bevor man entscheidet, wo das Geld liegt.',
      },
    ],
    faq: [
      { q: 'Welche Inflationsrate soll ich nehmen?', a: 'Für einen groben Blick nach vorn: Viele Zentralbanken zielen auf etwa 2%, langfristige historische Mittel in entwickelten Volkswirtschaften liegen zwischen 2% und 3%. Ihr persönlicher Wert hängt davon ab, was Sie tatsächlich kaufen — deshalb fühlen sich Wohn- oder Bildungskosten oft weit höher an als die Schlagzeile.' },
      { q: 'Warum wirkt der Effekt über dreißig Jahre so groß?', a: 'Weil er sich verzinst. Bei 3% verdoppeln sich die Preise in rund 24 Jahren. Die jährliche Veränderung ist klein und unauffällig — genau deshalb wird sie über ein Arbeitsleben hinweg leicht unterschätzt.' },
      { q: 'Sagt das echte Preise voraus?', a: 'Nein. Es rechnet mit einer konstanten Rate, die Sie wählen. Reale Inflation schwankt, unterscheidet sich nach Warengruppe, und keine einzelne Zahl beschreibt die Lebenshaltung aller.' },
    ],
    ui: {
      tabFuture: 'Was es kosten wird', tabPresent: 'Was es heute wert ist',
      amount: 'Betrag heute', futureAmount: 'Betrag in der Zukunft',
      rate: 'Inflationsrate (%)', years: 'Jahre', calc: 'Berechnen',
      resultFuture: 'Entsprechung später', resultPresent: 'Wert heute',
      cumulative: 'Gesamter Preisanstieg', power: 'Verbleibende Kaufkraft',
      table: 'Jahr für Jahr', year: 'Jahr', value: 'Betrag', powerCol: 'Kaufkraft',
    },
  },
  fr: {
    title: 'Calculateur d’inflation',
    desc: 'Ce qu’un montant d’aujourd’hui coûtera plus tard, et ce qu’un montant futur vaut aujourd’hui',
    short: 'Coût futur · valeur d’aujourd’hui',
    intro: [
      {
        h: 'Le chiffre ne bouge pas, sa valeur si',
        p: 'L’inflation ne change pas la somme sur votre compte ; elle change ce que cette somme achète. L’argent laissé de côté perd du pouvoir d’achat en silence, année après année, sans que rien de visible n’arrive au solde.',
      },
      {
        h: 'Deux façons de regarder la même chose',
        p: 'Vers l’avant : ce qui coûte cela aujourd’hui coûtera combien dans dix ans. Vers l’arrière : une somme promise dans dix ans, que vaut-elle vraiment maintenant. C’est la seconde qu’on saute, et c’est elle qui fait paraître les montants lointains plus gros qu’ils ne sont.',
      },
      {
        h: 'Un rendement nominal n’est pas un rendement réel',
        p: 'Gagner 5% quand les prix montent de 3% laisse environ 2% en termes réels. Tout rendement inférieur à l’inflation est une perte de pouvoir d’achat, aussi positif que paraisse le chiffre. C’est la comparaison à faire avant de décider où dort l’argent.',
      },
    ],
    faq: [
      { q: 'Quel taux d’inflation utiliser ?', a: 'Pour un ordre de grandeur, beaucoup de banques centrales visent environ 2%, et les moyennes historiques de long terme dans les économies développées se situent entre 2% et 3%. Votre ressenti dépend de ce que vous achetez : logement ou études paraissent souvent bien au-dessus du chiffre officiel.' },
      { q: 'Pourquoi l’effet paraît-il si grand sur trente ans ?', a: 'Parce qu’il se compose. À 3%, les prix doublent en 24 ans environ. La variation annuelle est petite et discrète — c’est précisément ce qui la fait sous-estimer sur une vie de travail.' },
      { q: 'Est-ce que cela prédit les prix réels ?', a: 'Non. On applique un taux constant que vous choisissez. L’inflation réelle bouge, varie selon les postes, et aucun chiffre unique ne décrit le coût de la vie de tout le monde.' },
    ],
    ui: {
      tabFuture: 'Ce que cela coûtera', tabPresent: 'Ce que cela vaut aujourd’hui',
      amount: 'Montant aujourd’hui', futureAmount: 'Montant dans le futur',
      rate: 'Taux d’inflation (%)', years: 'Années', calc: 'Calculer',
      resultFuture: 'Équivalent plus tard', resultPresent: 'Valeur aujourd’hui',
      cumulative: 'Hausse totale des prix', power: 'Pouvoir d’achat conservé',
      table: 'Année par année', year: 'Année', value: 'Montant', powerCol: 'Pouvoir d’achat',
    },
  },
  hi: {
    title: 'महँगाई कैलकुलेटर',
    desc: 'आज की रकम आगे चलकर कितनी होगी, और भविष्य की रकम आज कितनी क़ीमत की है',
    short: 'भविष्य की लागत · आज का मूल्य',
    intro: [
      {
        h: 'आंकड़ा वहीं रहता है, उसकी क़ीमत खिसकती है',
        p: 'महँगाई आपके खाते की रकम नहीं बदलती; वह बदलती है कि उस रकम से क्या ख़रीदा जा सकता है। पड़ा हुआ पैसा चुपचाप, साल दर साल, ख़रीद-शक्ति खोता जाता है — और शेष में कुछ दिखता तक नहीं।',
      },
      {
        h: 'एक ही बात को दो तरफ़ से देखना',
        p: 'आगे की ओर: जो आज इतने की है, दस साल बाद कितने की होगी। पीछे की ओर: दस साल बाद मिलने वाली रकम आज असल में कितनी है। लोग दूसरी वाली छोड़ देते हैं, और इसी वजह से दूर की रकमें असल से बड़ी दिखती हैं।',
      },
      {
        h: 'नाममात्र प्रतिफल असली प्रतिफल नहीं है',
        p: '5% कमाइए और दाम 3% बढ़ें, तो असल में क़रीब 2% ही बचा। महँगाई दर से कम कोई भी प्रतिफल ख़रीद-शक्ति का नुक़सान है, चाहे आंकड़ा कितना भी सकारात्मक दिखे। पैसा कहाँ रखना है, यह तय करने से पहले यही तुलना करने लायक़ है।',
      },
    ],
    faq: [
      { q: 'महँगाई दर कितनी मानूँ?', a: 'मोटे अनुमान के लिए, कई केंद्रीय बैंक लगभग 2% का लक्ष्य रखते हैं, और विकसित अर्थव्यवस्थाओं के लंबी अवधि के औसत 2% से 3% के बीच रहते हैं। आपका अपना अनुभव इस पर निर्भर है कि आप ख़रीदते क्या हैं — इसीलिए मकान या पढ़ाई का ख़र्च आधिकारिक आंकड़े से कहीं ऊँचा लगता है।' },
      { q: 'तीस साल में असर इतना बड़ा क्यों दिखता है?', a: 'क्योंकि यह चक्रवृद्धि है। 3% पर दाम लगभग 24 साल में दोगुने हो जाते हैं। सालाना बदलाव छोटा और अनदेखा-सा होता है — और यही वजह है कि नौकरी के पूरे जीवनकाल में इसे कम आँक लिया जाता है।' },
      { q: 'क्या यह असली दाम बताता है?', a: 'नहीं। यह आपकी चुनी हुई एक स्थिर दर लगाता है। असली महँगाई घटती-बढ़ती है, श्रेणी के हिसाब से बदलती है, और कोई एक आंकड़ा सबके जीवन-यापन का ख़र्च नहीं बता सकता।' },
    ],
    ui: {
      tabFuture: 'आगे कितने की होगी', tabPresent: 'आज कितने की है',
      amount: 'आज की रकम', futureAmount: 'भविष्य की रकम',
      rate: 'महँगाई दर (%)', years: 'साल', calc: 'गणना करें',
      resultFuture: 'आगे के बराबर रकम', resultPresent: 'आज का मूल्य',
      cumulative: 'कुल मूल्य वृद्धि', power: 'बची ख़रीद-शक्ति',
      table: 'साल दर साल', year: 'साल', value: 'रकम', powerCol: 'ख़रीद-शक्ति',
    },
  },
  'zh-hans': {
    title: '通货膨胀计算器',
    desc: '今天的一笔钱以后要多少，未来的一笔钱今天值多少',
    short: '未来花费 · 今天的价值',
    intro: [
      {
        h: '数字不动，价值在动',
        p: '通胀不会改变你账户里的数字，它改变的是这个数字能买到什么。放着不动的钱会安安静静地一年一年失去购买力，而余额上什么也看不出来。',
      },
      {
        h: '同一件事的两个方向',
        p: '往前看：今天这个价的东西，十年后要多少钱。往回看：十年后承诺给你的一笔钱，现在到底值多少。人们往往跳过第二个，而正是它让远处的数字显得比实际大。',
      },
      {
        h: '名义收益不等于实际收益',
        p: '拿到 5%，而物价涨了 3%，实际上只好了约 2%。任何低于通胀率的收益，都是购买力的损失，哪怕数字是正的。在决定钱放在哪里之前，值得先做这个比较。',
      },
    ],
    faq: [
      { q: '通胀率该填多少？', a: '大致估算的话，很多央行把目标定在 2% 左右，发达经济体的长期历史平均在 2% 到 3% 之间。你自己的感受取决于你实际买什么——住房和教育的涨幅常常远高于公布的数字，原因就在这里。' },
      { q: '为什么三十年下来影响看着这么大？', a: '因为它会复利叠加。按 3% 算，物价大约 24 年翻一倍。每年的变化很小、不起眼，而这恰恰是它在整个职业生涯里被低估的原因。' },
      { q: '这能预测真实物价吗？', a: '不能。它只是套用你选的一个恒定比率。真实通胀会波动，分门别类各不相同，没有哪一个数字能代表所有人的生活成本。' },
    ],
    ui: {
      tabFuture: '以后要多少钱', tabPresent: '今天值多少',
      amount: '今天的金额', futureAmount: '未来的金额',
      rate: '通胀率 (%)', years: '年数', calc: '计算',
      resultFuture: '以后的等价金额', resultPresent: '今天的价值',
      cumulative: '物价累计涨幅', power: '剩余购买力',
      table: '逐年变化', year: '年', value: '金额', powerCol: '购买力',
    },
  },
  'zh-hant': {
    title: '通貨膨脹計算機',
    desc: '今天的一筆錢以後要多少，未來的一筆錢今天值多少',
    short: '未來花費 · 今天的價值',
    intro: [
      {
        h: '數字不動，價值在動',
        p: '通膨不會改變你帳戶裡的數字，它改變的是這個數字能買到什麼。放著不動的錢會安安靜靜地一年一年失去購買力，而餘額上什麼也看不出來。',
      },
      {
        h: '同一件事的兩個方向',
        p: '往前看：今天這個價的東西，十年後要多少錢。往回看：十年後承諾給你的一筆錢，現在到底值多少。人們往往跳過第二個，而正是它讓遠處的數字顯得比實際大。',
      },
      {
        h: '名目報酬不等於實質報酬',
        p: '拿到 5%，而物價漲了 3%，實際上只好了約 2%。任何低於通膨率的報酬，都是購買力的損失，哪怕數字是正的。在決定錢放在哪裡之前，值得先做這個比較。',
      },
    ],
    faq: [
      { q: '通膨率該填多少？', a: '大致估算的話，很多央行把目標定在 2% 左右，已開發經濟體的長期歷史平均在 2% 到 3% 之間。你自己的感受取決於你實際買什麼——住房和教育的漲幅常常遠高於公布的數字，原因就在這裡。' },
      { q: '為什麼三十年下來影響看著這麼大？', a: '因為它會複利疊加。按 3% 算，物價大約 24 年翻一倍。每年的變化很小、不起眼，而這恰恰是它在整個職業生涯裡被低估的原因。' },
      { q: '這能預測真實物價嗎？', a: '不能。它只是套用你選的一個恆定比率。真實通膨會波動，分門別類各不相同，沒有哪一個數字能代表所有人的生活成本。' },
    ],
    ui: {
      tabFuture: '以後要多少錢', tabPresent: '今天值多少',
      amount: '今天的金額', futureAmount: '未來的金額',
      rate: '通膨率 (%)', years: '年數', calc: '計算',
      resultFuture: '以後的等價金額', resultPresent: '今天的價值',
      cumulative: '物價累計漲幅', power: '剩餘購買力',
      table: '逐年變化', year: '年', value: '金額', powerCol: '購買力',
    },
  },
};
