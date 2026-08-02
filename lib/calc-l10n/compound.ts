import type { CalcTable } from './types.ts';

/**
 * 복리 계산기.
 *
 * 순수한 수학이라 나라를 타지 않는다. 다만 한국어판은 이자소득세 15.4%를
 * 안에 박아 두고 "세후"를 보여주는데, 그 세율은 나라마다 다르므로 여기서는
 * 세율을 입력으로 뺐다. 기본값은 0이다 — 임의의 세율을 미리 넣어 두면 그것이
 * 그 나라 세율이라는 뜻이 되고, 어느 나라에서든 틀린 말이 된다.
 */
export const COMPOUND: CalcTable = {
  en: {
    title: 'Compound interest calculator',
    desc: 'Growth with monthly, quarterly or annual compounding, year by year',
    short: 'Principal · rate · term → final amount',
    intro: [
      {
        h: 'Compounding frequency matters less than you think',
        p: 'At 5% for ten years, annual compounding turns 10,000 into 16,289 and monthly compounding into 16,470. The gap is about 1%. Frequency is a rounding detail next to the two things that actually decide the outcome: the rate and how long you leave it.',
      },
      {
        h: 'Time does the heavy lifting',
        p: 'Doubling the rate roughly doubles the growth; doubling the years squares it. That asymmetry is the whole argument for starting early — an extra ten years at the front beats a better rate found later.',
      },
      {
        h: 'Tax is not included unless you add it',
        p: 'Interest is taxed differently everywhere: some countries withhold at source, some tax it as income, some exempt certain accounts entirely. Enter your own rate to see the after-tax figure; leave it at zero for the gross number.',
      },
    ],
    faq: [
      { q: 'What is the rule of 72?', a: 'Divide 72 by the annual rate to estimate the years to double. At 6%, roughly twelve years. It is accurate enough for mental arithmetic between about 4% and 12%.' },
      { q: 'Is the rate here annual?', a: 'Yes, always. The compounding frequency changes how often it is applied, not the rate you type.' },
      { q: 'Does it account for inflation?', a: 'No. The final figure is nominal. To see what it buys, run the inflation calculator on the result.' },
    ],
    ui: {
      section: 'Your numbers', principal: 'Principal', rate: 'Annual rate (%)', years: 'Term (years)',
      frequency: 'Compounding', monthly: 'Monthly', quarterly: 'Quarterly', annually: 'Annually',
      tax: 'Tax on interest (%)', calc: 'Calculate', result: 'Final amount',
      interest: 'Interest earned', afterTax: 'After tax', table: 'Year by year',
      year: 'Year', balance: 'Balance', taxHint: 'Leave at 0 for the pre-tax figure.',
    },
  },
  es: {
    title: 'Calculadora de interés compuesto',
    desc: 'Crecimiento con capitalización mensual, trimestral o anual, año a año',
    short: 'Capital · tipo · plazo → importe final',
    intro: [
      {
        h: 'La frecuencia importa menos de lo que parece',
        p: 'Al 5% durante diez años, capitalizar una vez al año convierte 10.000 en 16.289 y capitalizar cada mes en 16.470. La diferencia ronda el 1%. La frecuencia es un detalle de redondeo al lado de lo que de verdad decide el resultado: el tipo y el tiempo que lo dejas.',
      },
      {
        h: 'El tiempo hace el trabajo pesado',
        p: 'Doblar el tipo aproximadamente dobla el crecimiento; doblar los años lo eleva al cuadrado. Esa asimetría es todo el argumento a favor de empezar pronto: diez años de más al principio superan a un tipo mejor encontrado después.',
      },
      {
        h: 'Los impuestos no están incluidos salvo que los añadas',
        p: 'Los intereses tributan de forma distinta en cada país: unos retienen en origen, otros los gravan como renta, algunos eximen ciertas cuentas. Introduce tu propio tipo para ver la cifra después de impuestos; déjalo en cero para el importe bruto.',
      },
    ],
    faq: [
      { q: '¿Qué es la regla del 72?', a: 'Divide 72 entre el tipo anual para estimar los años que tarda en duplicarse. Al 6%, unos doce años. Es bastante fiel entre el 4% y el 12%.' },
      { q: '¿El tipo que introduzco es anual?', a: 'Sí, siempre. La frecuencia de capitalización cambia cada cuánto se aplica, no el tipo que escribes.' },
      { q: '¿Tiene en cuenta la inflación?', a: 'No. La cifra final es nominal. Para ver qué compra, pasa el resultado por la calculadora de inflación.' },
    ],
    ui: {
      section: 'Tus datos', principal: 'Capital', rate: 'Tipo anual (%)', years: 'Plazo (años)',
      frequency: 'Capitalización', monthly: 'Mensual', quarterly: 'Trimestral', annually: 'Anual',
      tax: 'Impuesto sobre intereses (%)', calc: 'Calcular', result: 'Importe final',
      interest: 'Intereses generados', afterTax: 'Después de impuestos', table: 'Año a año',
      year: 'Año', balance: 'Saldo', taxHint: 'Déjalo en 0 para la cifra antes de impuestos.',
    },
  },
  'pt-br': {
    title: 'Calculadora de juros compostos',
    desc: 'Crescimento com capitalização mensal, trimestral ou anual, ano a ano',
    short: 'Capital · taxa · prazo → valor final',
    intro: [
      {
        h: 'A frequência importa menos do que parece',
        p: 'A 5% por dez anos, capitalizar uma vez ao ano transforma 10.000 em 16.289 e capitalizar todo mês em 16.470. A diferença fica em torno de 1%. A frequência é detalhe de arredondamento perto do que realmente decide o resultado: a taxa e o tempo que você deixa.',
      },
      {
        h: 'O tempo faz o trabalho pesado',
        p: 'Dobrar a taxa mais ou menos dobra o crescimento; dobrar os anos eleva ao quadrado. Essa assimetria é todo o argumento a favor de começar cedo — dez anos a mais no início ganham de uma taxa melhor achada depois.',
      },
      {
        h: 'Imposto não entra a menos que você coloque',
        p: 'Juros são tributados de formas diferentes em cada país: uns retêm na fonte, outros tratam como renda, alguns isentam certas contas. Digite sua própria alíquota para ver o valor líquido; deixe em zero para o bruto.',
      },
    ],
    faq: [
      { q: 'O que é a regra do 72?', a: 'Divida 72 pela taxa anual para estimar em quantos anos o valor dobra. A 6%, cerca de doze anos. É fiel o bastante para conta de cabeça entre 4% e 12%.' },
      { q: 'A taxa que eu digito é anual?', a: 'Sim, sempre. A frequência de capitalização muda de quanto em quanto tempo ela é aplicada, não a taxa que você escreve.' },
      { q: 'Considera a inflação?', a: 'Não. O valor final é nominal. Para ver o que ele compra, passe o resultado pela calculadora de inflação.' },
    ],
    ui: {
      section: 'Seus números', principal: 'Capital', rate: 'Taxa anual (%)', years: 'Prazo (anos)',
      frequency: 'Capitalização', monthly: 'Mensal', quarterly: 'Trimestral', annually: 'Anual',
      tax: 'Imposto sobre juros (%)', calc: 'Calcular', result: 'Valor final',
      interest: 'Juros ganhos', afterTax: 'Após imposto', table: 'Ano a ano',
      year: 'Ano', balance: 'Saldo', taxHint: 'Deixe em 0 para o valor bruto.',
    },
  },
  ja: {
    title: '複利計算機',
    desc: '月複利・四半期複利・年複利での増え方を年ごとに',
    short: '元本・利率・期間 → 満期額',
    intro: [
      {
        h: '複利の回数は思うほど効きません',
        p: '年5%・10年で、年1回の複利なら10,000が16,289に、毎月の複利なら16,470になります。差は1%ほどです。回数は端数の話で、結果を決めるのは利率とどれだけ長く置くかの二つです。',
      },
      {
        h: '重い仕事をするのは時間です',
        p: '利率を倍にすると増え方はおおよそ倍になりますが、年数を倍にすると二乗で効きます。早く始めることの意味はこの非対称にあります — 最初の十年は、あとから見つけたよい利率より強いです。',
      },
      {
        h: '税は入れない限り引かれません',
        p: '利子への課税は国ごとに違います。源泉で引く国、所得として課す国、特定の口座を非課税にする国があります。自分の税率を入れれば税引後が出ますし、0のままなら税引前の数字です。',
      },
    ],
    faq: [
      { q: '72の法則とは何ですか。', a: '72を年利で割ると、元本が倍になるおおよその年数が出ます。6%ならおよそ12年です。4%〜12%くらいなら暗算の目安として十分使えます。' },
      { q: '入れる利率は年利ですか。', a: 'つねに年利です。複利の回数は「何回に分けて当てるか」を変えるだけで、入力した利率そのものは変わりません。' },
      { q: '物価上昇は考慮されますか。', a: 'されません。出てくるのは名目の金額です。それで何が買えるかを見たいときは、物価上昇の計算機に結果を通してください。' },
    ],
    ui: {
      section: '入力', principal: '元本', rate: '年利 (%)', years: '期間（年）',
      frequency: '複利の回数', monthly: '毎月', quarterly: '四半期', annually: '年1回',
      tax: '利子への税率 (%)', calc: '計算する', result: '満期額',
      interest: '利息', afterTax: '税引後', table: '年ごとの推移',
      year: '年', balance: '残高', taxHint: '税引前を見るには0のままにします。',
    },
  },
  de: {
    title: 'Zinseszinsrechner',
    desc: 'Wachstum bei monatlicher, vierteljährlicher oder jährlicher Verzinsung, Jahr für Jahr',
    short: 'Kapital · Zinssatz · Laufzeit → Endbetrag',
    intro: [
      {
        h: 'Die Zinsperiode zählt weniger als gedacht',
        p: 'Bei 5% über zehn Jahre werden aus 10.000 mit jährlicher Verzinsung 16.289 und mit monatlicher 16.470. Der Unterschied liegt bei etwa 1%. Die Häufigkeit ist eine Rundungsfrage neben dem, was das Ergebnis wirklich bestimmt: Zinssatz und Zeit.',
      },
      {
        h: 'Die Arbeit macht die Zeit',
        p: 'Den Zinssatz zu verdoppeln verdoppelt das Wachstum ungefähr; die Jahre zu verdoppeln quadriert es. Diese Asymmetrie ist das ganze Argument fürs frühe Anfangen — zehn Jahre mehr am Anfang schlagen einen besseren Zinssatz, den man später findet.',
      },
      {
        h: 'Steuern sind nicht enthalten, wenn du sie nicht einträgst',
        p: 'Zinserträge werden überall anders besteuert: manche Länder behalten an der Quelle ein, andere besteuern als Einkommen, manche stellen bestimmte Konten ganz frei. Trag deinen eigenen Satz ein, um den Betrag nach Steuern zu sehen; bei null bleibt es der Bruttobetrag.',
      },
    ],
    faq: [
      { q: 'Was ist die 72er-Regel?', a: 'Teile 72 durch den Jahreszins, um die Jahre bis zur Verdopplung zu schätzen. Bei 6% rund zwölf Jahre. Zwischen etwa 4% und 12% genau genug fürs Kopfrechnen.' },
      { q: 'Ist der eingegebene Zinssatz jährlich?', a: 'Ja, immer. Die Zinsperiode ändert nur, wie oft er angewandt wird, nicht den Satz, den du eintippst.' },
      { q: 'Ist die Inflation berücksichtigt?', a: 'Nein. Der Endbetrag ist nominal. Was er kaufen kann, zeigt der Inflationsrechner, wenn du das Ergebnis dort einsetzt.' },
    ],
    ui: {
      section: 'Deine Angaben', principal: 'Kapital', rate: 'Jahreszins (%)', years: 'Laufzeit (Jahre)',
      frequency: 'Verzinsung', monthly: 'Monatlich', quarterly: 'Vierteljährlich', annually: 'Jährlich',
      tax: 'Steuer auf Zinsen (%)', calc: 'Berechnen', result: 'Endbetrag',
      interest: 'Zinsertrag', afterTax: 'Nach Steuern', table: 'Jahr für Jahr',
      year: 'Jahr', balance: 'Stand', taxHint: 'Für den Bruttobetrag bei 0 lassen.',
    },
  },
  fr: {
    title: 'Calculateur d’intérêts composés',
    desc: 'Croissance avec capitalisation mensuelle, trimestrielle ou annuelle, année par année',
    short: 'Capital · taux · durée → montant final',
    intro: [
      {
        h: 'La fréquence compte moins qu’on ne croit',
        p: 'À 5% sur dix ans, une capitalisation annuelle transforme 10 000 en 16 289 et une capitalisation mensuelle en 16 470. L’écart tourne autour de 1%. La fréquence est un détail d’arrondi à côté de ce qui décide vraiment : le taux et la durée pendant laquelle on laisse faire.',
      },
      {
        h: 'C’est le temps qui travaille',
        p: 'Doubler le taux double à peu près la croissance ; doubler les années l’élève au carré. Cette asymétrie est tout l’argument en faveur d’un départ précoce — dix ans de plus au début valent mieux qu’un meilleur taux trouvé ensuite.',
      },
      {
        h: 'L’impôt n’est pas compté si vous ne l’ajoutez pas',
        p: 'Les intérêts sont taxés différemment partout : prélèvement à la source ici, imposition au revenu là, exonération de certains comptes ailleurs. Saisissez votre propre taux pour voir le net ; laissez zéro pour le brut.',
      },
    ],
    faq: [
      { q: 'Qu’est-ce que la règle de 72 ?', a: 'Divisez 72 par le taux annuel pour estimer le nombre d’années nécessaires au doublement. À 6%, une douzaine d’années. Assez juste de tête entre 4% et 12%.' },
      { q: 'Le taux saisi est-il annuel ?', a: 'Oui, toujours. La fréquence de capitalisation change la cadence d’application, pas le taux que vous tapez.' },
      { q: 'L’inflation est-elle prise en compte ?', a: 'Non. Le montant final est nominal. Pour savoir ce qu’il achète, passez le résultat dans le calculateur d’inflation.' },
    ],
    ui: {
      section: 'Vos chiffres', principal: 'Capital', rate: 'Taux annuel (%)', years: 'Durée (années)',
      frequency: 'Capitalisation', monthly: 'Mensuelle', quarterly: 'Trimestrielle', annually: 'Annuelle',
      tax: 'Impôt sur les intérêts (%)', calc: 'Calculer', result: 'Montant final',
      interest: 'Intérêts perçus', afterTax: 'Après impôt', table: 'Année par année',
      year: 'Année', balance: 'Solde', taxHint: 'Laissez 0 pour le montant brut.',
    },
  },
  hi: {
    title: 'चक्रवृद्धि ब्याज कैलकुलेटर',
    desc: 'मासिक, तिमाही या वार्षिक चक्रवृद्धि पर बढ़त, साल-दर-साल',
    short: 'मूलधन · दर · अवधि → अंतिम रक़म',
    intro: [
      {
        h: 'चक्रवृद्धि की बारंबारता उतनी मायने नहीं रखती',
        p: '5% पर दस साल में, सालाना चक्रवृद्धि से 10,000 बनकर 16,289 होता है और मासिक से 16,470। फ़र्क़ लगभग 1% का है। नतीजा असल में दो चीज़ें तय करती हैं — दर, और आप कितने समय तक उसे छोड़ते हैं। बारंबारता उनके सामने गोलाई भर है।',
      },
      {
        h: 'भारी काम समय करता है',
        p: 'दर दोगुनी करने पर बढ़त लगभग दोगुनी होती है; साल दोगुने करने पर वह वर्ग हो जाती है। जल्दी शुरू करने का पूरा तर्क इसी असंतुलन में है — शुरू के दस अतिरिक्त साल, बाद में मिली बेहतर दर से भारी पड़ते हैं।',
      },
      {
        h: 'कर तब तक नहीं लगता जब तक आप न डालें',
        p: 'ब्याज पर कर हर देश में अलग है: कहीं स्रोत पर कटता है, कहीं आय मानकर लगता है, कहीं कुछ खाते पूरी तरह छूट में हैं। अपनी दर डालिए तो कर के बाद की रक़म दिखेगी; शून्य छोड़ देंगे तो सकल रक़म।',
      },
    ],
    faq: [
      { q: '72 का नियम क्या है?', a: '72 को वार्षिक दर से भाग दीजिए, दोगुना होने के अनुमानित साल मिल जाएँगे। 6% पर लगभग बारह साल। 4% से 12% के बीच मन में जोड़ने के लिए काफ़ी सटीक है।' },
      { q: 'जो दर मैं डालता हूँ वह वार्षिक है?', a: 'हाँ, हमेशा। चक्रवृद्धि की बारंबारता सिर्फ़ यह बदलती है कि दर कितनी बार लगेगी, दर ख़ुद नहीं।' },
      { q: 'क्या महँगाई का हिसाब है?', a: 'नहीं। अंतिम आँकड़ा नाममात्र है। उससे क्या ख़रीदा जा सकेगा, यह देखने के लिए परिणाम को महँगाई कैलकुलेटर में डालिए।' },
    ],
    ui: {
      section: 'आपके आँकड़े', principal: 'मूलधन', rate: 'वार्षिक दर (%)', years: 'अवधि (साल)',
      frequency: 'चक्रवृद्धि', monthly: 'मासिक', quarterly: 'तिमाही', annually: 'वार्षिक',
      tax: 'ब्याज पर कर (%)', calc: 'गणना करें', result: 'अंतिम रक़म',
      interest: 'अर्जित ब्याज', afterTax: 'कर के बाद', table: 'साल-दर-साल',
      year: 'साल', balance: 'शेष', taxHint: 'कर से पहले की रक़म देखने के लिए 0 रहने दें।',
    },
  },
  'zh-hans': {
    title: '复利计算器',
    desc: '按月、按季或按年复利的增长，逐年列出',
    short: '本金 · 利率 · 期限 → 到期金额',
    intro: [
      {
        h: '复利频率没你想的那么重要',
        p: '年利 5%、十年期，按年复利把 10,000 变成 16,289，按月复利变成 16,470。差距大约 1%。真正决定结果的是两件事——利率，和你放多久。频率跟它们比只是零头。',
      },
      {
        h: '出力气的是时间',
        p: '利率翻倍，增长大致翻倍；年数翻倍，增长是平方地涨。早开始的全部道理就在这个不对称里——开头多出的十年，胜过后来才找到的更好利率。',
      },
      {
        h: '不填就不扣税',
        p: '利息的课税各国不同：有的在源头预扣，有的并入所得计税，有的对特定账户完全免税。填上你自己的税率就能看到税后数；留 0 则是税前数。',
      },
    ],
    faq: [
      { q: '72 法则是什么？', a: '用 72 除以年利率，就是本金翻倍大概要多少年。6% 大约十二年。在 4% 到 12% 之间，心算够用了。' },
      { q: '我填的利率是年利率吗？', a: '是，一直都是。复利频率只改变它被套用的次数，不改变你输入的那个数。' },
      { q: '算进通胀了吗？', a: '没有。最后的数字是名义值。想知道它能买什么，把结果放进通胀计算器再跑一遍。' },
    ],
    ui: {
      section: '你的数字', principal: '本金', rate: '年利率 (%)', years: '期限（年）',
      frequency: '复利方式', monthly: '按月', quarterly: '按季', annually: '按年',
      tax: '利息税率 (%)', calc: '计算', result: '到期金额',
      interest: '利息收入', afterTax: '税后', table: '逐年明细',
      year: '第几年', balance: '余额', taxHint: '想看税前就留 0。',
    },
  },
  'zh-hant': {
    title: '複利計算機',
    desc: '按月、按季或按年複利的成長，逐年列出',
    short: '本金 · 利率 · 期限 → 到期金額',
    intro: [
      {
        h: '複利頻率沒你想的那麼重要',
        p: '年利 5%、十年期，按年複利把 10,000 變成 16,289，按月複利變成 16,470。差距大約 1%。真正決定結果的是兩件事——利率，和你放多久。頻率跟它們比只是零頭。',
      },
      {
        h: '出力氣的是時間',
        p: '利率翻倍，成長大致翻倍；年數翻倍，成長是平方地漲。早開始的全部道理就在這個不對稱裡——開頭多出的十年，勝過後來才找到的更好利率。',
      },
      {
        h: '不填就不扣稅',
        p: '利息的課稅各國不同：有的在來源預扣，有的併入所得計稅，有的對特定帳戶完全免稅。填上你自己的稅率就能看到稅後數；留 0 則是稅前數。',
      },
    ],
    faq: [
      { q: '72 法則是什麼？', a: '用 72 除以年利率，就是本金翻倍大概要多少年。6% 大約十二年。在 4% 到 12% 之間，心算夠用了。' },
      { q: '我填的利率是年利率嗎？', a: '是，一直都是。複利頻率只改變它被套用的次數，不改變你輸入的那個數。' },
      { q: '算進通膨了嗎？', a: '沒有。最後的數字是名目值。想知道它能買什麼，把結果放進通膨計算機再跑一遍。' },
    ],
    ui: {
      section: '你的數字', principal: '本金', rate: '年利率 (%)', years: '期限（年）',
      frequency: '複利方式', monthly: '按月', quarterly: '按季', annually: '按年',
      tax: '利息稅率 (%)', calc: '計算', result: '到期金額',
      interest: '利息收入', afterTax: '稅後', table: '逐年明細',
      year: '第幾年', balance: '餘額', taxHint: '想看稅前就留 0。',
    },
  },
};
