import type { CalcTable } from './types.ts';

/** 은퇴 자금 — 나이와 수익률만 쓰므로 나라를 타지 않는다. 금액 단위는 붙이지 않는다. */
export const RETIREMENT: CalcTable = {
  en: {
    title: 'Retirement savings calculator',
    desc: 'What your savings grow to by retirement, and what they pay out after',
    short: 'Build-up and draw-down',
    intro: [
      {
        h: 'Two halves of one question',
        p: 'The first half is accumulation: what you already have, plus what you add each month, growing until you stop working. The second half is what that pot pays out — and the answer changes a lot depending on how many years it has to last.',
      },
      {
        h: 'The last decade does the heaviest lifting',
        p: 'Because growth compounds, the largest gains come at the end, when the balance is biggest. That is why starting earlier beats saving harder later: the years you add at the beginning are the ones that get to compound the longest.',
      },
      {
        h: 'Everything here is in today’s money',
        p: 'No inflation is applied, so a figure thirty years out will buy noticeably less than the same figure buys now. If you want a realistic sense of it, enter a return reduced by your expected inflation and read the result as purchasing power rather than as an amount.',
      },
    ],
    faq: [
      { q: 'What return should I assume?', a: 'Lower than you hope. A long horizon makes the assumption powerful, and a number chosen optimistically produces a plan that quietly under-saves. Running it twice, once pessimistically, is more useful than getting the single number right.' },
      { q: 'Why does the monthly payout differ so much between 20 and 30 years?', a: 'Because the same pot is divided over half again as many months. This is a straight division with no return during retirement, which is deliberately conservative — money still invested would stretch further.' },
      { q: 'Are pensions and state benefits included?', a: 'No. This covers only what you save yourself. Whatever you expect from a state or workplace scheme sits on top of this figure and follows rules specific to your country.' },
    ],
    ui: {
      section: 'Your situation', currentAge: 'Current age', retireAge: 'Retirement age',
      savings: 'Saved so far', monthly: 'Added each month', rate: 'Expected annual return (%)',
      calc: 'Calculate',
      total: 'At retirement', paidIn: 'Of which you paid in', growth: 'Of which is growth',
      payout: 'Monthly income if it must last', years: 'years',
      table: 'Year by year', age: 'Age', start: 'Opening', added: 'Added', interest: 'Growth', end: 'Closing',
      badAge: 'Retirement age must be later than your current age.',
    },
  },
  es: {
    title: 'Calculadora de ahorro para la jubilación',
    desc: 'En cuánto se convierte tu ahorro al jubilarte y qué renta permite después',
    short: 'Acumulación y retirada',
    intro: [
      {
        h: 'Dos mitades de la misma pregunta',
        p: 'La primera mitad es acumular: lo que ya tienes más lo que añades cada mes, creciendo hasta que dejes de trabajar. La segunda es cuánto renta esa bolsa, y la respuesta cambia mucho según cuántos años tenga que durar.',
      },
      {
        h: 'La última década hace el trabajo pesado',
        p: 'Como el crecimiento se compone, las mayores ganancias llegan al final, cuando el saldo es mayor. Por eso empezar antes gana a ahorrar más fuerte después: los años que añades al principio son los que tienen más tiempo para componerse.',
      },
      {
        h: 'Todo está en dinero de hoy',
        p: 'No se aplica inflación, así que una cifra a treinta años comprará bastante menos de lo que compra ahora la misma cifra. Para una idea realista, introduce una rentabilidad ya descontada de la inflación esperada y lee el resultado como poder adquisitivo, no como importe.',
      },
    ],
    faq: [
      { q: '¿Qué rentabilidad debería suponer?', a: 'Menos de la que esperas. Un horizonte largo hace la suposición muy poderosa, y un número elegido con optimismo produce un plan que ahorra de menos sin que se note. Hacerlo dos veces, una de ellas pesimista, sirve más que acertar con un único número.' },
      { q: '¿Por qué cambia tanto la renta mensual entre 20 y 30 años?', a: 'Porque la misma bolsa se reparte entre la mitad más de meses. Es una división directa sin rentabilidad durante la jubilación, lo cual es deliberadamente conservador: el dinero que siga invertido llegaría más lejos.' },
      { q: '¿Incluye pensiones públicas o de empresa?', a: 'No. Aquí solo está lo que ahorras tú. Lo que esperes de un sistema público o de empresa se suma a esta cifra y sigue reglas propias de tu país.' },
    ],
    ui: {
      section: 'Tu situación', currentAge: 'Edad actual', retireAge: 'Edad de jubilación',
      savings: 'Ahorrado hasta ahora', monthly: 'Aportación mensual', rate: 'Rentabilidad anual esperada (%)',
      calc: 'Calcular',
      total: 'Al jubilarte', paidIn: 'De lo cual aportado', growth: 'De lo cual rendimiento',
      payout: 'Renta mensual si debe durar', years: 'años',
      table: 'Año a año', age: 'Edad', start: 'Inicial', added: 'Aportado', interest: 'Rendimiento', end: 'Final',
      badAge: 'La edad de jubilación debe ser mayor que la actual.',
    },
  },
  'pt-br': {
    title: 'Calculadora de aposentadoria',
    desc: 'Quanto sua reserva vira até a aposentadoria e que renda ela paga depois',
    short: 'Acumulação e retirada',
    intro: [
      {
        h: 'Duas metades da mesma pergunta',
        p: 'A primeira metade é acumular: o que você já tem mais o que acrescenta todo mês, crescendo até parar de trabalhar. A segunda é quanto esse bolo paga — e a resposta muda bastante conforme quantos anos ele precisa durar.',
      },
      {
        h: 'A última década faz o trabalho pesado',
        p: 'Como o crescimento é composto, os maiores ganhos vêm no fim, quando o saldo é maior. Por isso começar antes vence guardar mais depois: os anos acrescentados no começo são os que têm mais tempo para compor.',
      },
      {
        h: 'Tudo aqui está em dinheiro de hoje',
        p: 'Nenhuma inflação é aplicada, então um valor daqui a trinta anos comprará bem menos do que o mesmo valor compra hoje. Para uma noção realista, informe um retorno já descontado da inflação esperada e leia o resultado como poder de compra, não como quantia.',
      },
    ],
    faq: [
      { q: 'Que retorno devo assumir?', a: 'Menos do que você espera. Prazo longo dá muito peso à premissa, e um número escolhido com otimismo gera um plano que guarda de menos sem avisar. Rodar duas vezes, uma delas pessimista, ajuda mais do que acertar um número único.' },
      { q: 'Por que a renda mensal muda tanto entre 20 e 30 anos?', a: 'Porque o mesmo bolo é dividido por metade a mais de meses. É uma divisão direta, sem rendimento durante a aposentadoria — deliberadamente conservador: dinheiro que continuar investido renderia mais.' },
      { q: 'Previdência pública ou do trabalho entram?', a: 'Não. Aqui está só o que você guarda. O que você espera de um regime público ou do empregador soma-se a este número e segue regras próprias do seu país.' },
    ],
    ui: {
      section: 'Sua situação', currentAge: 'Idade atual', retireAge: 'Idade de aposentadoria',
      savings: 'Já acumulado', monthly: 'Aporte mensal', rate: 'Retorno anual esperado (%)',
      calc: 'Calcular',
      total: 'Na aposentadoria', paidIn: 'Do qual aportado', growth: 'Do qual rendimento',
      payout: 'Renda mensal se precisar durar', years: 'anos',
      table: 'Ano a ano', age: 'Idade', start: 'Inicial', added: 'Aportado', interest: 'Rendimento', end: 'Final',
      badAge: 'A idade de aposentadoria precisa ser maior que a atual.',
    },
  },
  ja: {
    title: '老後資金の計算機',
    desc: '退職までにいくら貯まり、その後いくら取り崩せるか',
    short: '積み上げと取り崩し',
    intro: [
      {
        h: '一つの問いの前半と後半',
        p: '前半は積み上げです。いまある額に毎月の積立を足し、働き終える日まで増やします。後半はその原資から毎月いくら出せるかで、答えは「何年もたせるか」で大きく変わります。',
      },
      {
        h: '効くのは最後の10年です',
        p: '増え方が複利なので、いちばん大きく増えるのは残高がいちばん大きい終盤です。早く始めるほうが後で無理に増やすより効くのは、最初に足した年数がいちばん長く複利にさらされるからです。',
      },
      {
        h: 'すべて今日の貨幣価値です',
        p: '物価上昇を入れていないので、30年先の金額はいまの同じ金額より買えるものが目に見えて少なくなります。現実に近づけたいときは、想定物価上昇率を引いた利回りを入れて、結果を金額ではなく購買力として読んでください。',
      },
    ],
    faq: [
      { q: '利回りは何%で見ればよいですか。', a: '期待より低めにしてください。期間が長いほど前提の効き方が強く、楽観的に置いた数字は、気づかないうちに積立不足の計画を作ります。一度は悲観的な数字でも回すほうが、たった一つの正解を当てようとするより役に立ちます。' },
      { q: '20年と30年で毎月の額がこんなに違うのはなぜですか。', a: '同じ原資を1.5倍の月数で割るからです。ここでは退職後の運用をゼロとして単純に割っており、意図して控えめにしています。運用を続ければもう少し長くもちます。' },
      { q: '公的年金や企業年金は入っていますか。', a: '入っていません。ここにあるのは自分で貯めるぶんだけです。年金として見込める額はこの数字の上に乗り、その仕組みは国ごとに違います。' },
    ],
    ui: {
      section: '前提', currentAge: '現在の年齢', retireAge: '退職する年齢',
      savings: 'いまある資金', monthly: '毎月の積立額', rate: '想定利回り (年 %)',
      calc: '計算する',
      total: '退職時の資産', paidIn: 'うち元本', growth: 'うち運用益',
      payout: '取り崩せる月額 — もたせる年数', years: '年',
      table: '年ごとの推移', age: '年齢', start: '期首', added: '積立', interest: '運用益', end: '期末',
      badAge: '退職する年齢は現在の年齢より後にしてください。',
    },
  },
  de: {
    title: 'Rechner für die Altersvorsorge',
    desc: 'Worauf Ihr Erspartes bis zur Rente anwächst und was es danach auszahlt',
    short: 'Aufbau und Entnahme',
    intro: [
      {
        h: 'Zwei Hälften einer Frage',
        p: 'Die erste Hälfte ist der Aufbau: was Sie schon haben, plus das, was Sie monatlich zulegen, bis Sie aufhören zu arbeiten. Die zweite ist, was dieser Topf auszahlt — und die Antwort ändert sich stark damit, wie viele Jahre er reichen muss.',
      },
      {
        h: 'Das letzte Jahrzehnt trägt am meisten',
        p: 'Weil sich das Wachstum verzinst, entstehen die größten Zuwächse am Ende, wenn der Bestand am größten ist. Deshalb schlägt früher anfangen das spätere Kraftsparen: Die Jahre am Anfang sind die, die am längsten arbeiten dürfen.',
      },
      {
        h: 'Alles hier ist in heutigem Geld',
        p: 'Es wird keine Inflation gerechnet, ein Betrag in dreißig Jahren kauft also spürbar weniger als derselbe Betrag heute. Für ein realistisches Gefühl tragen Sie eine um die erwartete Inflation verminderte Rendite ein und lesen Sie das Ergebnis als Kaufkraft, nicht als Summe.',
      },
    ],
    faq: [
      { q: 'Welche Rendite soll ich annehmen?', a: 'Niedriger, als Sie hoffen. Auf langen Zeiträumen wirkt die Annahme enorm, und eine optimistisch gewählte Zahl erzeugt einen Plan, der leise zu wenig zurücklegt. Zweimal zu rechnen, einmal pessimistisch, hilft mehr, als die eine richtige Zahl treffen zu wollen.' },
      { q: 'Warum unterscheidet sich die Monatsrente zwischen 20 und 30 Jahren so stark?', a: 'Weil derselbe Topf auf die Hälfte mehr Monate verteilt wird. Gerechnet wird glatt geteilt, ohne Rendite im Ruhestand — bewusst vorsichtig: weiter angelegtes Geld reichte länger.' },
      { q: 'Sind gesetzliche oder betriebliche Renten enthalten?', a: 'Nein. Hier steht nur, was Sie selbst zurücklegen. Was Sie aus einem staatlichen oder betrieblichen System erwarten, kommt obendrauf und folgt Regeln, die je Land verschieden sind.' },
    ],
    ui: {
      section: 'Ihre Ausgangslage', currentAge: 'Heutiges Alter', retireAge: 'Alter beim Ruhestand',
      savings: 'Bereits gespart', monthly: 'Monatlich zusätzlich', rate: 'Erwartete Rendite p. a. (%)',
      calc: 'Berechnen',
      total: 'Bei Ruhestandsbeginn', paidIn: 'Davon eingezahlt', growth: 'Davon Ertrag',
      payout: 'Monatlich entnehmbar über', years: 'Jahre',
      table: 'Jahr für Jahr', age: 'Alter', start: 'Anfang', added: 'Eingezahlt', interest: 'Ertrag', end: 'Ende',
      badAge: 'Das Ruhestandsalter muss über dem heutigen Alter liegen.',
    },
  },
  fr: {
    title: 'Calculateur d’épargne retraite',
    desc: 'Ce que votre épargne devient à la retraite et le revenu qu’elle procure ensuite',
    short: 'Constitution et retraits',
    intro: [
      {
        h: 'Deux moitiés d’une même question',
        p: 'La première moitié, c’est l’accumulation : ce que vous avez déjà, plus ce que vous ajoutez chaque mois, en croissance jusqu’à l’arrêt de l’activité. La seconde, c’est ce que ce capital verse — et la réponse change beaucoup selon le nombre d’années qu’il doit couvrir.',
      },
      {
        h: 'La dernière décennie fait le gros du travail',
        p: 'Comme la croissance se compose, les plus gros gains arrivent à la fin, quand l’encours est le plus élevé. C’est pourquoi commencer plus tôt l’emporte sur épargner plus fort ensuite : les années ajoutées au début sont celles qui travaillent le plus longtemps.',
      },
      {
        h: 'Tout ici est en euros d’aujourd’hui',
        p: 'Aucune inflation n’est appliquée : un montant à trente ans achètera sensiblement moins que le même montant aujourd’hui. Pour une vision réaliste, saisissez un rendement diminué de l’inflation attendue et lisez le résultat comme un pouvoir d’achat, pas comme une somme.',
      },
    ],
    faq: [
      { q: 'Quel rendement retenir ?', a: 'Plus bas que ce que vous espérez. Sur un horizon long, l’hypothèse pèse énormément, et un chiffre choisi avec optimisme fabrique un plan qui épargne trop peu sans qu’on le voie. Faire le calcul deux fois, dont une fois en pessimiste, sert plus que de viser le bon chiffre unique.' },
      { q: 'Pourquoi le revenu mensuel change-t-il autant entre 20 et 30 ans ?', a: 'Parce que le même capital est réparti sur une fois et demie plus de mois. C’est une division simple, sans rendement pendant la retraite — volontairement prudent : un capital resté investi durerait davantage.' },
      { q: 'Les pensions publiques ou d’entreprise sont-elles incluses ?', a: 'Non. Il n’y a ici que votre propre épargne. Ce que vous attendez d’un régime public ou d’entreprise vient s’ajouter à ce chiffre et obéit à des règles propres à votre pays.' },
    ],
    ui: {
      section: 'Votre situation', currentAge: 'Âge actuel', retireAge: 'Âge de départ',
      savings: 'Déjà épargné', monthly: 'Versé chaque mois', rate: 'Rendement annuel attendu (%)',
      calc: 'Calculer',
      total: 'Au départ à la retraite', paidIn: 'Dont versements', growth: 'Dont gains',
      payout: 'Revenu mensuel si le capital doit durer', years: 'ans',
      table: 'Année par année', age: 'Âge', start: 'Début', added: 'Versé', interest: 'Gains', end: 'Fin',
      badAge: 'L’âge de départ doit être supérieur à l’âge actuel.',
    },
  },
  hi: {
    title: 'सेवानिवृत्ति बचत कैलकुलेटर',
    desc: 'सेवानिवृत्ति तक बचत कितनी बनेगी और उसके बाद हर महीने कितना मिलेगा',
    short: 'जमा करना और निकालना',
    intro: [
      {
        h: 'एक ही सवाल के दो हिस्से',
        p: 'पहला हिस्सा जमा करना है — जो आपके पास है, उसमें हर महीने जुड़ता जाए, और काम छोड़ने तक बढ़ता रहे। दूसरा हिस्सा यह कि वह कोष हर महीने कितना दे सकता है, और यह जवाब इस पर बहुत निर्भर है कि उसे कितने साल चलना है।',
      },
      {
        h: 'सबसे भारी काम आख़िरी दशक करता है',
        p: 'वृद्धि चक्रवृद्धि है, इसलिए सबसे बड़ा इज़ाफ़ा अंत में होता है, जब शेष सबसे बड़ा होता है। जल्दी शुरू करना बाद में ज़ोर लगाने से इसीलिए बेहतर है: शुरू में जोड़े गए साल ही सबसे देर तक चक्रवृद्धि पाते हैं।',
      },
      {
        h: 'सब कुछ आज के पैसे में है',
        p: 'महँगाई नहीं लगाई गई, इसलिए तीस साल बाद का आंकड़ा उतनी ही रकम से आज जितना मिलता है, उससे काफ़ी कम ख़रीदेगा। असल तस्वीर चाहिए तो अपेक्षित महँगाई घटाकर प्रतिफल दर डालिए और नतीजे को रकम नहीं, ख़रीद-शक्ति की तरह पढ़िए।',
      },
    ],
    faq: [
      { q: 'प्रतिफल कितना मानूँ?', a: 'जितनी उम्मीद है, उससे कम। लंबी अवधि में मान्यता का असर बहुत बड़ा होता है, और आशावादी आंकड़ा चुपचाप कम बचत वाली योजना बना देता है। एक बार निराशावादी दर पर भी चलाना, एक "सही" आंकड़ा ढूँढ़ने से ज़्यादा काम आता है।' },
      { q: '20 और 30 साल के बीच मासिक रकम इतनी अलग क्यों है?', a: 'क्योंकि वही कोष डेढ़ गुना महीनों में बँटता है। यहाँ सीधे भाग दिया गया है, सेवानिवृत्ति के दौरान कोई प्रतिफल नहीं माना — जान-बूझकर सतर्क रखा है; निवेशित रहने पर पैसा और लंबा चलेगा।' },
      { q: 'क्या सरकारी या नियोक्ता पेंशन शामिल है?', a: 'नहीं। यहाँ सिर्फ़ वह है जो आप ख़ुद बचाते हैं। किसी सरकारी या नियोक्ता योजना से जो उम्मीद है वह इस आंकड़े के ऊपर जुड़ेगी और उसके नियम हर देश में अलग हैं।' },
    ],
    ui: {
      section: 'आपकी स्थिति', currentAge: 'मौजूदा उम्र', retireAge: 'सेवानिवृत्ति की उम्र',
      savings: 'अब तक की बचत', monthly: 'हर महीने जोड़',  rate: 'अपेक्षित वार्षिक प्रतिफल (%)',
      calc: 'गणना करें',
      total: 'सेवानिवृत्ति पर', paidIn: 'इसमें से जमा', growth: 'इसमें से वृद्धि',
      payout: 'मासिक आय अगर चलाना हो', years: 'साल',
      table: 'साल दर साल', age: 'उम्र', start: 'आरंभिक', added: 'जोड़ा', interest: 'वृद्धि', end: 'अंतिम',
      badAge: 'सेवानिवृत्ति की उम्र मौजूदा उम्र से बड़ी होनी चाहिए।',
    },
  },
  'zh-hans': {
    title: '退休储蓄计算器',
    desc: '到退休时能攒下多少，之后每月能取多少',
    short: '积累与提取',
    intro: [
      {
        h: '同一个问题的前后两半',
        p: '前半是积累：现有的钱加上每月新增，一直长到你不再工作为止。后半是这笔钱每月能取多少，而答案很大程度上取决于它得撑多少年。',
      },
      {
        h: '最后十年出力最多',
        p: '因为增长是复利的，涨得最多的是最后那段，余额最大的时候。早开始之所以胜过晚发力，就是因为最早加进去的那几年，能复利的时间最长。',
      },
      {
        h: '这里全是今天的钱',
        p: '没有计入通胀，所以三十年后的那个数字，能买到的东西会明显比今天同样的数字少。想要贴近现实，就把预期通胀从收益率里扣掉再填，并把结果当作购买力来读，而不是金额。',
      },
    ],
    faq: [
      { q: '收益率该假设多少？', a: '比你希望的低一些。期限越长，这个假设的分量越重，乐观填出来的数字会做出一个悄悄存少了的计划。算两遍——其中一遍保守些——比想一次填对更管用。' },
      { q: '20 年和 30 年的月领金额为什么差这么多？', a: '因为同一笔钱要分到多一半的月数里。这里是直接相除，退休期间不计任何收益，属于刻意保守；钱继续投着的话能撑得更久。' },
      { q: '包含社保或企业年金吗？', a: '不包含。这里只算你自己存的部分。你能从公共或企业计划里拿到的，是加在这个数字之上的，规则也各国不同。' },
    ],
    ui: {
      section: '你的情况', currentAge: '当前年龄', retireAge: '退休年龄',
      savings: '目前已存', monthly: '每月新增', rate: '预期年化收益率 (%)',
      calc: '计算',
      total: '退休时的资产', paidIn: '其中本金', growth: '其中增值',
      payout: '每月可取金额，按撑', years: '年',
      table: '逐年变化', age: '年龄', start: '年初', added: '投入', interest: '增值', end: '年末',
      badAge: '退休年龄必须大于当前年龄。',
    },
  },
  'zh-hant': {
    title: '退休儲蓄計算機',
    desc: '到退休時能存下多少，之後每月能領多少',
    short: '累積與提領',
    intro: [
      {
        h: '同一個問題的前後兩半',
        p: '前半是累積：現有的錢加上每月新增，一直長到你不再工作為止。後半是這筆錢每月能領多少，而答案很大程度上取決於它得撐多少年。',
      },
      {
        h: '最後十年出力最多',
        p: '因為成長是複利的，漲得最多的是最後那段，餘額最大的時候。早開始之所以勝過晚發力，就是因為最早加進去的那幾年，能複利的時間最長。',
      },
      {
        h: '這裡全是今天的錢',
        p: '沒有計入通膨，所以三十年後的那個數字，能買到的東西會明顯比今天同樣的數字少。想要貼近現實，就把預期通膨從報酬率裡扣掉再填，並把結果當作購買力來讀，而不是金額。',
      },
    ],
    faq: [
      { q: '報酬率該假設多少？', a: '比你希望的低一些。期限越長，這個假設的分量越重，樂觀填出來的數字會做出一個悄悄存少了的計畫。算兩遍——其中一遍保守些——比想一次填對更管用。' },
      { q: '20 年和 30 年的月領金額為什麼差這麼多？', a: '因為同一筆錢要分到多一半的月數裡。這裡是直接相除，退休期間不計任何報酬，屬於刻意保守；錢繼續投著的話能撐得更久。' },
      { q: '包含勞保或企業退休金嗎？', a: '不包含。這裡只算你自己存的部分。你能從公共或企業制度裡拿到的，是加在這個數字之上的，規則也各國不同。' },
    ],
    ui: {
      section: '你的情況', currentAge: '目前年齡', retireAge: '退休年齡',
      savings: '目前已存', monthly: '每月新增', rate: '預期年化報酬率 (%)',
      calc: '計算',
      total: '退休時的資產', paidIn: '其中本金', growth: '其中增值',
      payout: '每月可領金額，按撐', years: '年',
      table: '逐年變化', age: '年齡', start: '年初', added: '投入', interest: '增值', end: '年末',
      badAge: '退休年齡必須大於目前年齡。',
    },
  },
};
