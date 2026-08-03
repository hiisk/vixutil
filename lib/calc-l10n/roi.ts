import type { CalcTable } from './types.ts';

/** 투자 수익률 — 총수익률과 연환산(CAGR). 통화도 세법도 타지 않는 순수 산수다. */
export const ROI: CalcTable = {
  en: {
    title: 'Investment return calculator',
    desc: 'Total return and annualised return (CAGR) from what you paid and what you got',
    short: 'Total return · CAGR',
    intro: [
      {
        h: 'Total return and annualised return answer different questions',
        p: 'Total return is simply how much more you have. Annualised return, or CAGR, restates that as the steady yearly rate that would have got you there. Two investments held for different lengths of time can only be compared on the second number.',
      },
      {
        h: 'A return without a time span means nothing',
        p: '"Up 50%" sounds impressive until you ask over how long. In one year it is excellent; over ten years it works out at roughly 4% a year, which a savings account might have matched. That is exactly why the time span tends to go missing when returns get quoted.',
      },
      {
        h: 'Losing 50% needs a 100% gain to undo',
        p: 'Returns are not symmetric. Money that falls from 100 to 50 is down 50%, but getting back to 100 takes a gain of 100%. The deeper the hole, the steeper the climb out — which is why avoiding large losses matters more than catching large gains.',
      },
    ],
    faq: [
      { q: 'What exactly does CAGR mean?', a: 'The constant annual rate that turns your starting value into your ending value over the holding period. Real returns are never that smooth; CAGR is a way of comparing, not a description of what happened year to year.' },
      { q: 'Does this handle money added or withdrawn along the way?', a: 'No. It compares one entry and one exit. If you paid in more later, or took some out, you need a money-weighted return such as IRR instead.' },
      { q: 'Are fees, tax and inflation included?', a: 'Only what you type into the costs field. The result is nominal and before tax, so the amount you actually keep is smaller, and inflation reduces it further in real terms.' },
    ],
    ui: {
      tabSimple: 'Total return', tabAnnual: 'Annualised (CAGR)',
      buy: 'Amount invested', sell: 'Value now or at exit', cost: 'Fees and tax (optional)',
      years: 'Holding period (years)', calc: 'Calculate',
      profit: 'Net gain or loss', roi: 'Total return', cagr: 'CAGR', invested: 'Invested',
    },
  },
  es: {
    title: 'Calculadora de rentabilidad',
    desc: 'Rentabilidad total y anualizada (CAGR) a partir de lo invertido y lo obtenido',
    short: 'Rentabilidad total · CAGR',
    intro: [
      {
        h: 'Rentabilidad total y anualizada responden a preguntas distintas',
        p: 'La rentabilidad total es sencillamente cuánto más tienes. La anualizada, o CAGR, traduce eso a la tasa anual constante que habría llevado hasta ahí. Dos inversiones con plazos distintos solo se pueden comparar con la segunda cifra.',
      },
      {
        h: 'Una rentabilidad sin plazo no dice nada',
        p: '«He ganado un 50%» suena bien hasta que preguntas en cuánto tiempo. En un año es excelente; en diez sale a un 4% anual, algo que un depósito podría haber igualado. Por eso el plazo es justo el dato que suele faltar cuando alguien presume de rentabilidad.',
      },
      {
        h: 'Perder un 50% exige ganar un 100% para volver',
        p: 'La rentabilidad no es simétrica. Un dinero que cae de 100 a 50 ha perdido un 50%, pero recuperar los 100 requiere ganar un 100%. Cuanto más hondo el agujero, más empinada la salida: por eso evitar pérdidas grandes pesa más que acertar ganancias grandes.',
      },
    ],
    faq: [
      { q: '¿Qué significa exactamente el CAGR?', a: 'La tasa anual constante que convierte el valor inicial en el final durante el periodo. La realidad nunca es tan lisa; el CAGR sirve para comparar, no para describir lo que pasó cada año.' },
      { q: '¿Contempla aportaciones o retiradas por el camino?', a: 'No. Compara una entrada y una salida. Si has ido metiendo o sacando dinero, necesitas una rentabilidad ponderada por dinero, como la TIR.' },
      { q: '¿Incluye comisiones, impuestos e inflación?', a: 'Solo lo que escribas en el campo de costes. El resultado es nominal y antes de impuestos, así que lo que de verdad conservas es menos, y la inflación lo reduce todavía más en términos reales.' },
    ],
    ui: {
      tabSimple: 'Rentabilidad total', tabAnnual: 'Anualizada (CAGR)',
      buy: 'Importe invertido', sell: 'Valor actual o de venta', cost: 'Comisiones e impuestos (opcional)',
      years: 'Plazo (años)', calc: 'Calcular',
      profit: 'Ganancia o pérdida neta', roi: 'Rentabilidad total', cagr: 'CAGR', invested: 'Invertido',
    },
  },
  'pt-br': {
    title: 'Calculadora de retorno de investimento',
    desc: 'Retorno total e retorno anualizado (CAGR) a partir do que você pagou e do que recebeu',
    short: 'Retorno total · CAGR',
    intro: [
      {
        h: 'Retorno total e anualizado respondem a perguntas diferentes',
        p: 'Retorno total é simplesmente quanto você tem a mais. O anualizado, ou CAGR, reescreve isso como a taxa anual constante que teria levado até ali. Dois investimentos com prazos diferentes só podem ser comparados pelo segundo número.',
      },
      {
        h: 'Retorno sem prazo não quer dizer nada',
        p: '"Ganhei 50%" impressiona até você perguntar em quanto tempo. Em um ano é ótimo; em dez anos dá cerca de 4% ao ano, o que uma poupança poderia ter igualado. É justamente por isso que o prazo é o dado que costuma sumir quando alguém fala de retorno.',
      },
      {
        h: 'Perder 50% exige ganhar 100% para voltar',
        p: 'Retorno não é simétrico. Um dinheiro que cai de 100 para 50 perdeu 50%, mas voltar aos 100 exige ganhar 100%. Quanto mais fundo o buraco, mais íngreme a saída — por isso evitar perdas grandes pesa mais do que acertar ganhos grandes.',
      },
    ],
    faq: [
      { q: 'O que é exatamente o CAGR?', a: 'A taxa anual constante que transforma o valor inicial no valor final ao longo do período. A realidade nunca é tão lisa; o CAGR serve para comparar, não para descrever o que aconteceu ano a ano.' },
      { q: 'Ele considera aportes e resgates no meio do caminho?', a: 'Não. Compara uma entrada e uma saída. Se você foi colocando ou tirando dinheiro, precisa de um retorno ponderado pelo dinheiro, como a TIR.' },
      { q: 'Taxas, imposto e inflação entram na conta?', a: 'Só o que você digitar no campo de custos. O resultado é nominal e antes do imposto, então o que de fato fica é menos, e a inflação reduz ainda mais em termos reais.' },
    ],
    ui: {
      tabSimple: 'Retorno total', tabAnnual: 'Anualizado (CAGR)',
      buy: 'Valor investido', sell: 'Valor atual ou de venda', cost: 'Taxas e impostos (opcional)',
      years: 'Prazo (anos)', calc: 'Calcular',
      profit: 'Ganho ou perda líquida', roi: 'Retorno total', cagr: 'CAGR', invested: 'Investido',
    },
  },
  ja: {
    title: '投資利回り計算機',
    desc: '投じた額と受け取った額から、総リターンと年率換算(CAGR)を出します',
    short: '総リターンと年率換算',
    intro: [
      {
        h: '総リターンと年率換算は別の問いに答えます',
        p: '総リターンは要するにどれだけ増えたかです。年率換算(CAGR)は、それを「毎年何%ずつ複利で増えたのと同じか」に言い換えた値です。保有期間の違う投資どうしは、この二つ目の数字でしか比べられません。',
      },
      {
        h: '期間を言わない利回りは何も語っていません',
        p: '「50%増えた」は立派に聞こえますが、何年でと聞いた途端に意味が変わります。1年なら見事ですが、10年なら年4%ほど、定期預金と大差ありません。利回りの話から期間が抜け落ちやすいのはこのためです。',
      },
      {
        h: '50%減ったら、戻すには100%必要です',
        p: 'リターンは対称ではありません。100が50になれば−50%ですが、100に戻すには+100%が要ります。穴が深いほど登り返しは急になります。大きく勝つことより大きく負けないことが効くのはそのためです。',
      },
    ],
    faq: [
      { q: 'CAGRとは正確には何ですか。', a: '保有期間を通じて、開始額を終了額に変える一定の年率です。現実の値動きはそんなに滑らかではありません。CAGRは比較のための物差しで、各年に何が起きたかを述べるものではありません。' },
      { q: '途中の追加投資や引き出しは扱えますか。', a: '扱えません。入口と出口を一度ずつ比べるだけです。途中で出し入れがあるなら、IRRのような金額加重の利回りが必要です。' },
      { q: '手数料・税金・物価は入っていますか。', a: 'コスト欄に入力した分だけです。結果は名目・税引前なので、実際に手元に残る額はこれより少なく、物価上昇の分だけ実質はさらに目減りします。' },
    ],
    ui: {
      tabSimple: '総リターン', tabAnnual: '年率換算 (CAGR)',
      buy: '投資額', sell: '現在または売却時の評価額', cost: '手数料・税金 (任意)',
      years: '保有期間 (年)', calc: '計算する',
      profit: '純損益', roi: '総リターン', cagr: '年率換算', invested: '投資額',
    },
  },
  de: {
    title: 'Rendite-Rechner',
    desc: 'Gesamtrendite und annualisierte Rendite (CAGR) aus Einsatz und Erlös',
    short: 'Gesamtrendite · CAGR',
    intro: [
      {
        h: 'Gesamtrendite und Jahresrendite beantworten Verschiedenes',
        p: 'Die Gesamtrendite sagt schlicht, wie viel mehr Sie haben. Die annualisierte Rendite (CAGR) formuliert dasselbe als den gleichmäßigen Jahressatz, der dorthin geführt hätte. Anlagen mit unterschiedlicher Haltedauer lassen sich nur über die zweite Zahl vergleichen.',
      },
      {
        h: 'Eine Rendite ohne Zeitraum sagt nichts',
        p: '"50% im Plus" klingt stark, bis man fragt: in welcher Zeit? In einem Jahr ist das hervorragend, über zehn Jahre sind es rund 4% jährlich — das hätte auch ein Festgeld geschafft. Genau deshalb fehlt der Zeitraum so oft, wenn Renditen erzählt werden.',
      },
      {
        h: 'Minus 50% braucht plus 100% zum Ausgleich',
        p: 'Renditen sind nicht symmetrisch. Fällt Geld von 100 auf 50, sind das −50%; zurück auf 100 braucht es +100%. Je tiefer das Loch, desto steiler der Weg heraus — deshalb wiegt das Vermeiden großer Verluste schwerer als das Treffen großer Gewinne.',
      },
    ],
    faq: [
      { q: 'Was genau ist der CAGR?', a: 'Der konstante Jahressatz, der den Anfangswert über die Laufzeit in den Endwert verwandelt. So glatt verläuft in Wirklichkeit nichts; der CAGR ist ein Vergleichsmaß, keine Beschreibung der einzelnen Jahre.' },
      { q: 'Sind Zukäufe und Entnahmen berücksichtigt?', a: 'Nein. Verglichen werden ein Einstieg und ein Ausstieg. Wer zwischendurch ein- oder auszahlt, braucht eine geldgewichtete Rendite wie den internen Zinsfuß.' },
      { q: 'Stecken Gebühren, Steuern und Inflation darin?', a: 'Nur das, was Sie ins Kostenfeld eintragen. Das Ergebnis ist nominal und vor Steuern; netto bleibt weniger, und die Inflation zehrt real noch einmal daran.' },
    ],
    ui: {
      tabSimple: 'Gesamtrendite', tabAnnual: 'Annualisiert (CAGR)',
      buy: 'Eingesetzter Betrag', sell: 'Aktueller oder Verkaufswert', cost: 'Gebühren und Steuern (optional)',
      years: 'Haltedauer (Jahre)', calc: 'Berechnen',
      profit: 'Gewinn oder Verlust', roi: 'Gesamtrendite', cagr: 'CAGR', invested: 'Eingesetzt',
    },
  },
  fr: {
    title: 'Calculateur de rendement d’investissement',
    desc: 'Rendement total et rendement annualisé (TCAC) à partir du montant investi et du montant obtenu',
    short: 'Rendement total · TCAC',
    intro: [
      {
        h: 'Rendement total et rendement annualisé ne répondent pas à la même question',
        p: 'Le rendement total dit simplement combien vous avez en plus. Le rendement annualisé (TCAC) reformule cela en taux annuel constant qui aurait mené au même point. Deux placements de durées différentes ne se comparent que sur ce second chiffre.',
      },
      {
        h: 'Un rendement sans durée ne veut rien dire',
        p: '« +50% » impressionne jusqu’à ce qu’on demande sur combien de temps. En un an c’est excellent ; sur dix ans cela fait environ 4% par an, ce qu’un livret aurait pu égaler. C’est précisément pour cela que la durée disparaît si souvent des récits de performance.',
      },
      {
        h: 'Perdre 50% exige de gagner 100% pour revenir',
        p: 'Les rendements ne sont pas symétriques. Une somme qui passe de 100 à 50 a perdu 50%, mais retrouver 100 demande +100%. Plus le trou est profond, plus la remontée est raide — d’où l’importance d’éviter les grosses pertes plutôt que de viser les gros gains.',
      },
    ],
    faq: [
      { q: 'Que signifie exactement le TCAC ?', a: 'Le taux annuel constant qui transforme la valeur de départ en valeur d’arrivée sur la période. La réalité n’est jamais aussi lisse ; le TCAC sert à comparer, pas à décrire ce qui s’est passé chaque année.' },
      { q: 'Les versements et retraits en cours de route sont-ils pris en compte ?', a: 'Non. On compare une entrée et une sortie. Si vous avez ajouté ou retiré de l’argent, il faut un rendement pondéré par les flux, comme le TRI.' },
      { q: 'Frais, impôts et inflation sont-ils inclus ?', a: 'Seulement ce que vous saisissez dans le champ des frais. Le résultat est nominal et avant impôt : ce qui reste réellement est plus faible, et l’inflation en retire encore en termes réels.' },
    ],
    ui: {
      tabSimple: 'Rendement total', tabAnnual: 'Annualisé (TCAC)',
      buy: 'Montant investi', sell: 'Valeur actuelle ou de vente', cost: 'Frais et impôts (facultatif)',
      years: 'Durée de détention (années)', calc: 'Calculer',
      profit: 'Gain ou perte net', roi: 'Rendement total', cagr: 'TCAC', invested: 'Investi',
    },
  },
  hi: {
    title: 'निवेश रिटर्न कैलकुलेटर',
    desc: 'लगाई गई और मिली रकम से कुल रिटर्न और वार्षिक रिटर्न (CAGR)',
    short: 'कुल रिटर्न · CAGR',
    intro: [
      {
        h: 'कुल रिटर्न और वार्षिक रिटर्न अलग सवालों के जवाब हैं',
        p: 'कुल रिटर्न बस यह बताता है कि आपके पास कितना ज़्यादा है। वार्षिक रिटर्न यानी CAGR उसी बात को "हर साल कितने प्रतिशत की चक्रवृद्धि दर" में बदल देता है। अलग-अलग अवधि के निवेश सिर्फ़ इसी दूसरे आंकड़े पर तुलनीय हैं।',
      },
      {
        h: 'अवधि बताए बिना रिटर्न बेमानी है',
        p: '"50% कमाया" सुनने में बड़ा लगता है, जब तक कोई न पूछे — कितने समय में? एक साल में यह शानदार है; दस साल में यह लगभग 4% सालाना बैठता है, जो एक सावधि जमा भी दे देती। इसीलिए रिटर्न की बात में अवधि सबसे पहले ग़ायब होती है।',
      },
      {
        h: '50% गँवाने के बाद वापसी के लिए 100% चाहिए',
        p: 'रिटर्न सममित नहीं होता। 100 का पैसा 50 हो जाए तो −50%, पर 100 पर लौटने के लिए +100% चाहिए। गड्ढा जितना गहरा, चढ़ाई उतनी खड़ी — इसीलिए बड़ा मुनाफ़ा पकड़ने से ज़्यादा ज़रूरी है बड़ा नुक़सान टालना।',
      },
    ],
    faq: [
      { q: 'CAGR का ठीक-ठीक मतलब क्या है?', a: 'वह स्थिर वार्षिक दर जो पूरी अवधि में शुरुआती मूल्य को अंतिम मूल्य में बदल देती। असल बाज़ार इतना समतल कभी नहीं होता; CAGR तुलना का पैमाना है, हर साल का ब्योरा नहीं।' },
      { q: 'क्या बीच में डाले या निकाले गए पैसे इसमें आते हैं?', a: 'नहीं। यह एक प्रवेश और एक निकास की तुलना करता है। अगर आपने बीच में पैसा जोड़ा या निकाला है, तो IRR जैसा धन-भारित रिटर्न चाहिए।' },
      { q: 'क्या शुल्क, कर और महँगाई शामिल हैं?', a: 'सिर्फ़ उतना जितना आप लागत के खाने में लिखते हैं। नतीजा नाममात्र और कर से पहले का है, इसलिए हाथ में कम आता है और महँगाई असली मूल्य को और घटा देती है।' },
    ],
    ui: {
      tabSimple: 'कुल रिटर्न', tabAnnual: 'वार्षिक (CAGR)',
      buy: 'निवेश की रकम', sell: 'मौजूदा या बिक्री मूल्य', cost: 'शुल्क और कर (वैकल्पिक)',
      years: 'अवधि (साल)', calc: 'गणना करें',
      profit: 'शुद्ध लाभ या हानि', roi: 'कुल रिटर्न', cagr: 'CAGR', invested: 'निवेश',
    },
  },
  'zh-hans': {
    title: '投资收益率计算器',
    desc: '根据投入和回收的金额算出总收益率与年化收益率（CAGR）',
    short: '总收益率 · 年化',
    intro: [
      {
        h: '总收益率和年化收益率回答的不是同一个问题',
        p: '总收益率只说明你多了多少。年化收益率（CAGR）把它换算成"每年按多少比例复利增长"。持有期不同的两笔投资，只能拿后面这个数字来比。',
      },
      {
        h: '不说期限的收益率没有意义',
        p: '"赚了 50%"听着漂亮，直到有人问：用了多久？一年是很出色，十年下来每年约 4%，定期存款也差不多。收益率被拿出来说的时候，期限最容易被略掉，原因就在这里。',
      },
      {
        h: '亏 50% 要赚 100% 才回本',
        p: '收益率并不对称。100 跌到 50 是 −50%，但要涨回 100 需要 +100%。坑越深，爬出来越陡——所以避免大亏比抓住大赚更要紧。',
      },
    ],
    faq: [
      { q: 'CAGR 到底是什么？', a: '在整个持有期内，把起始金额变成结束金额的那个固定年增长率。真实行情不会这么平滑；CAGR 是用来比较的尺子，不是逐年发生了什么的描述。' },
      { q: '中途追加或取出的钱算得进去吗？', a: '算不进去。它只比较一次买入和一次卖出。如果中途有进出，需要用 IRR 这类按金额加权的收益率。' },
      { q: '手续费、税和通胀包含在内吗？', a: '只包含你填在费用栏里的部分。结果是名义的、税前的，实际到手会更少，通胀还会让实际购买力再缩水一截。' },
    ],
    ui: {
      tabSimple: '总收益率', tabAnnual: '年化 (CAGR)',
      buy: '投入金额', sell: '当前或卖出金额', cost: '手续费与税（可选）',
      years: '持有年数', calc: '计算',
      profit: '净损益', roi: '总收益率', cagr: '年化收益率', invested: '投入',
    },
  },
  'zh-hant': {
    title: '投資報酬率計算機',
    desc: '根據投入和回收的金額算出總報酬率與年化報酬率（CAGR）',
    short: '總報酬率 · 年化',
    intro: [
      {
        h: '總報酬率和年化報酬率回答的不是同一個問題',
        p: '總報酬率只說明你多了多少。年化報酬率（CAGR）把它換算成「每年按多少比例複利成長」。持有期不同的兩筆投資，只能拿後面這個數字來比。',
      },
      {
        h: '不說期限的報酬率沒有意義',
        p: '「賺了 50%」聽著漂亮，直到有人問：用了多久？一年是很出色，十年下來每年約 4%，定存也差不多。報酬率被拿出來說的時候，期限最容易被略掉，原因就在這裡。',
      },
      {
        h: '虧 50% 要賺 100% 才回本',
        p: '報酬率並不對稱。100 跌到 50 是 −50%，但要漲回 100 需要 +100%。坑越深，爬出來越陡——所以避免大虧比抓住大賺更要緊。',
      },
    ],
    faq: [
      { q: 'CAGR 到底是什麼？', a: '在整個持有期內，把起始金額變成結束金額的那個固定年成長率。真實行情不會這麼平滑；CAGR 是用來比較的尺，不是逐年發生了什麼的描述。' },
      { q: '中途加碼或贖回的錢算得進去嗎？', a: '算不進去。它只比較一次買進和一次賣出。如果中途有進出，需要用 IRR 這類按金額加權的報酬率。' },
      { q: '手續費、稅和通膨包含在內嗎？', a: '只包含你填在費用欄裡的部分。結果是名目的、稅前的，實際到手會更少，通膨還會讓實質購買力再縮水一截。' },
    ],
    ui: {
      tabSimple: '總報酬率', tabAnnual: '年化 (CAGR)',
      buy: '投入金額', sell: '目前或賣出金額', cost: '手續費與稅（選填）',
      years: '持有年數', calc: '計算',
      profit: '淨損益', roi: '總報酬率', cagr: '年化報酬率', invested: '投入',
    },
  },
};
