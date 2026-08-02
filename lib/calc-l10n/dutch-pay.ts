import type { CalcTable } from './types.ts';

/**
 * 더치페이(균등 분담) 계산기.
 *
 * 한국어판에는 "끝자리는 미리 정해두세요" 같은 원 단위 반올림 안내가 있는데,
 * 통화마다 최소 단위가 달라서 그대로 옮기지 않았다. 유로·달러는 소수 둘째
 * 자리까지 쓰고, 엔은 정수, 원은 보통 백 단위로 맞춘다. 대신 "반올림 단위"를
 * 고르게 두고 그 자리에서 조정하도록 했다.
 */
export const DUTCH_PAY: CalcTable = {
  en: {
    title: 'Split the bill',
    desc: 'Divide a total evenly, with extra items charged to specific people',
    short: 'Total · people · extras → each share',
    intro: [
      {
        h: 'Even split, then the extras',
        p: 'The base amount is divided equally. Anything one person alone should pay for — a taxi home, a bottle they picked, parking — goes in as an extra assigned to them, and only their share moves. It keeps the common part honest without turning the evening into bookkeeping.',
      },
      {
        h: 'Decide the rounding before you order',
        p: 'Dividing by three almost never lands on a round number. Pick a rounding step up front — the smallest coin, or whatever unit people actually carry — so nobody is the one who ends up paying the odd amount every time.',
      },
    ],
    faq: [
      { q: 'Why not just split everything equally?', a: 'Because an even split silently charges the person who had water for someone else’s cocktails. Splitting the shared part evenly and assigning the rest is fairer and takes about a minute.' },
      { q: 'What rounding should I use?', a: 'Match the smallest unit people actually hand over. Rounding to a hundredth is fine for card payments; for cash, round to whatever coin exists.' },
      { q: 'How many people can it handle?', a: 'Up to twenty. Beyond that an even split usually stops being the right model anyway — you want a per-item tally.' },
    ],
    ui: {
      basic: 'The basics', total: 'Total amount', people: 'People (2–20)',
      rounding: 'Round to', extras: 'Extra items', addExtra: 'Add an item',
      itemName: 'Item', itemAmount: 'Amount', assignedTo: 'Charged to',
      everyone: 'Everyone', calc: 'Calculate', result: 'Each person pays',
      base: 'Even share', extra: 'Extras', finalTotal: 'Final total',
      person: 'Person', noExtras: 'No extras yet (drinks, parking, and so on)',
      check: 'Check the total',
    },
  },
  es: {
    title: 'Dividir la cuenta',
    desc: 'Reparte un total a partes iguales, con extras cargados a personas concretas',
    short: 'Total · personas · extras → parte de cada uno',
    intro: [
      {
        h: 'Primero a partes iguales, luego los extras',
        p: 'El importe base se divide por igual. Lo que debe pagar una sola persona —el taxi de vuelta, la botella que eligió, el parking— entra como extra asignado a ella, y solo se mueve su parte. Así la parte común queda limpia sin convertir la noche en contabilidad.',
      },
      {
        h: 'Decide el redondeo antes de pedir',
        p: 'Dividir entre tres casi nunca da un número redondo. Fija de antemano el escalón de redondeo —la moneda más pequeña, o la unidad que la gente lleva encima— para que no sea siempre el mismo quien paga el pico.',
      },
    ],
    faq: [
      { q: '¿Por qué no dividir todo a partes iguales?', a: 'Porque el reparto igual hace que quien bebió agua pague los cócteles de otro. Dividir lo común y asignar el resto es más justo y cuesta un minuto.' },
      { q: '¿Qué redondeo conviene?', a: 'El de la unidad más pequeña que realmente se entrega. Para pagos con tarjeta basta el céntimo; en efectivo, redondea a la moneda que exista.' },
      { q: '¿Cuántas personas admite?', a: 'Hasta veinte. Más allá de eso el reparto igual deja de ser el modelo adecuado: conviene contar por consumición.' },
    ],
    ui: {
      basic: 'Lo básico', total: 'Importe total', people: 'Personas (2–20)',
      rounding: 'Redondear a', extras: 'Extras', addExtra: 'Añadir concepto',
      itemName: 'Concepto', itemAmount: 'Importe', assignedTo: 'A cargo de',
      everyone: 'Todos', calc: 'Calcular', result: 'Cada persona paga',
      base: 'Parte igual', extra: 'Extras', finalTotal: 'Total final',
      person: 'Persona', noExtras: 'Aún no hay extras (bebidas, parking, etc.)',
      check: 'Comprobar el total',
    },
  },
  'pt-br': {
    title: 'Dividir a conta',
    desc: 'Divida um total por igual, com extras cobrados de pessoas específicas',
    short: 'Total · pessoas · extras → parte de cada um',
    intro: [
      {
        h: 'Primeiro por igual, depois os extras',
        p: 'O valor base é dividido igualmente. O que só uma pessoa deve pagar — o táxi de volta, a garrafa que ela escolheu, o estacionamento — entra como extra atribuído a ela, e só a parte dela muda. Assim a parte comum fica honesta sem transformar a noite em contabilidade.',
      },
      {
        h: 'Combine o arredondamento antes de pedir',
        p: 'Dividir por três quase nunca dá um número redondo. Defina antes o passo de arredondamento — a menor moeda, ou a unidade que as pessoas realmente carregam — para que não seja sempre o mesmo a pagar a sobra.',
      },
    ],
    faq: [
      { q: 'Por que não dividir tudo por igual?', a: 'Porque a divisão igual faz quem bebeu água pagar os drinques de outro. Dividir a parte comum e atribuir o resto é mais justo e leva um minuto.' },
      { q: 'Qual arredondamento usar?', a: 'O da menor unidade que realmente circula. Para cartão, o centavo basta; para dinheiro, arredonde para a moeda que existe.' },
      { q: 'Quantas pessoas dá para incluir?', a: 'Até vinte. Acima disso a divisão igual costuma deixar de ser o modelo certo — o melhor é contar item a item.' },
    ],
    ui: {
      basic: 'O básico', total: 'Valor total', people: 'Pessoas (2–20)',
      rounding: 'Arredondar para', extras: 'Extras', addExtra: 'Adicionar item',
      itemName: 'Item', itemAmount: 'Valor', assignedTo: 'Cobrado de',
      everyone: 'Todos', calc: 'Calcular', result: 'Cada pessoa paga',
      base: 'Parte igual', extra: 'Extras', finalTotal: 'Total final',
      person: 'Pessoa', noExtras: 'Ainda sem extras (bebidas, estacionamento, etc.)',
      check: 'Conferir o total',
    },
  },
  ja: {
    title: '割り勘計算機',
    desc: '合計を均等に割り、特定の人だけの分は別に足す',
    short: '合計・人数・追加分 → ひとり分',
    intro: [
      {
        h: 'まず均等に、そのあと個別分',
        p: '基本の金額は人数で均等に割ります。誰かひとりが持つべきもの — 帰りのタクシー、その人が選んだボトル、駐車料金 — は追加項目としてその人に割り当て、その人の分だけが動きます。共通部分をきれいに保ったまま、夜を帳簿づけにしないで済みます。',
      },
      {
        h: '端数の扱いは頼む前に決める',
        p: '三人で割るとまず割り切れません。丸める単位を先に決めておくと — 使う最小の硬貨でも、みんなが持っている単位でも — 毎回同じ人が端数を持つことになりません。',
      },
    ],
    faq: [
      { q: '全部まとめて均等でいいのでは。', a: '均等にすると、水しか飲まなかった人が誰かのカクテル代を持つことになります。共通分だけ均等にして残りを割り当てるほうが公平で、手間は一分です。' },
      { q: '丸める単位はどう決めますか。', a: '実際にやりとりする最小単位に合わせます。カードなら小数第2位まで、現金なら存在する硬貨の単位で丸めてください。' },
      { q: '何人まで入れられますか。', a: '20人までです。それを超えると均等割り自体が合わなくなるので、品目ごとの集計に切り替えたほうがよいです。' },
    ],
    ui: {
      basic: '基本情報', total: '合計金額', people: '人数（2〜20人）',
      rounding: '丸める単位', extras: '追加項目', addExtra: '項目を追加',
      itemName: '項目名', itemAmount: '金額', assignedTo: '負担する人',
      everyone: '全員', calc: '計算する', result: 'ひとりの負担額',
      base: '均等分', extra: '追加分', finalTotal: '最終合計',
      person: '参加者', noExtras: '追加項目はまだありません（飲み物、駐車料金など）',
      check: '合計の確認',
    },
  },
  de: {
    title: 'Rechnung teilen',
    desc: 'Eine Summe gleichmäßig aufteilen, Extras einzelnen Personen zuordnen',
    short: 'Summe · Personen · Extras → Anteil pro Kopf',
    intro: [
      {
        h: 'Erst gleichmäßig, dann die Extras',
        p: 'Der Grundbetrag wird gleichmäßig geteilt. Was nur eine Person tragen soll — das Taxi nach Hause, die Flasche, die sie ausgesucht hat, das Parkhaus — kommt als Extra für sie dazu, und nur ihr Anteil verschiebt sich. So bleibt der gemeinsame Teil sauber, ohne dass der Abend zur Buchhaltung wird.',
      },
      {
        h: 'Rundung vor dem Bestellen klären',
        p: 'Durch drei geteilt geht fast nie glatt auf. Legt vorher eine Rundungsstufe fest — die kleinste Münze oder die Einheit, die tatsächlich jemand dabeihat —, damit nicht immer dieselbe Person den Rest übernimmt.',
      },
    ],
    faq: [
      { q: 'Warum nicht einfach alles gleichmäßig teilen?', a: 'Weil beim reinen Gleichteilen die Person mit dem Wasser die Cocktails der anderen mitbezahlt. Den gemeinsamen Teil gleichmäßig zu teilen und den Rest zuzuordnen ist fairer und dauert eine Minute.' },
      { q: 'Auf welche Stufe runden?', a: 'Auf die kleinste Einheit, die wirklich den Besitzer wechselt. Bei Kartenzahlung genügt der Cent; bei Bargeld auf die kleinste vorhandene Münze runden.' },
      { q: 'Wie viele Personen sind möglich?', a: 'Bis zwanzig. Darüber hinaus passt Gleichteilen ohnehin selten — dann rechnet man besser pro Posten ab.' },
    ],
    ui: {
      basic: 'Grunddaten', total: 'Gesamtbetrag', people: 'Personen (2–20)',
      rounding: 'Runden auf', extras: 'Extras', addExtra: 'Posten hinzufügen',
      itemName: 'Posten', itemAmount: 'Betrag', assignedTo: 'Zu Lasten von',
      everyone: 'Alle', calc: 'Berechnen', result: 'Jede Person zahlt',
      base: 'Gleicher Anteil', extra: 'Extras', finalTotal: 'Endsumme',
      person: 'Person', noExtras: 'Noch keine Extras (Getränke, Parken usw.)',
      check: 'Summe prüfen',
    },
  },
  fr: {
    title: 'Partager l’addition',
    desc: 'Diviser un total à parts égales, avec des extras imputés à certaines personnes',
    short: 'Total · convives · extras → part de chacun',
    intro: [
      {
        h: 'D’abord à parts égales, ensuite les extras',
        p: 'Le montant de base est divisé également. Ce qu’une seule personne doit payer — le taxi du retour, la bouteille qu’elle a choisie, le parking — entre comme extra à son nom, et seule sa part bouge. La partie commune reste honnête sans transformer la soirée en comptabilité.',
      },
      {
        h: 'Fixez l’arrondi avant de commander',
        p: 'Divisé par trois, un total tombe rarement juste. Choisissez d’avance un pas d’arrondi — la plus petite pièce, ou l’unité que les gens ont vraiment sur eux — pour que ce ne soit pas toujours la même personne qui paie le reste.',
      },
    ],
    faq: [
      { q: 'Pourquoi ne pas tout diviser également ?', a: 'Parce qu’un partage égal fait payer les cocktails des autres à celui qui a bu de l’eau. Diviser la partie commune et imputer le reste est plus juste et prend une minute.' },
      { q: 'Quel arrondi choisir ?', a: 'Celui de la plus petite unité qui change réellement de mains. Pour la carte, le centime suffit ; en espèces, arrondissez à la pièce qui existe.' },
      { q: 'Combien de personnes au maximum ?', a: 'Vingt. Au-delà, le partage égal n’est de toute façon plus le bon modèle — mieux vaut compter poste par poste.' },
    ],
    ui: {
      basic: 'Les bases', total: 'Montant total', people: 'Convives (2–20)',
      rounding: 'Arrondir à', extras: 'Extras', addExtra: 'Ajouter un poste',
      itemName: 'Poste', itemAmount: 'Montant', assignedTo: 'À la charge de',
      everyone: 'Tout le monde', calc: 'Calculer', result: 'Chacun paie',
      base: 'Part égale', extra: 'Extras', finalTotal: 'Total final',
      person: 'Personne', noExtras: 'Pas encore d’extras (boissons, parking, etc.)',
      check: 'Vérifier le total',
    },
  },
  hi: {
    title: 'बिल बाँटें',
    desc: 'कुल रक़म बराबर बाँटें, और अलग ख़र्च ख़ास लोगों पर डालें',
    short: 'कुल · लोग · अतिरिक्त → हर एक का हिस्सा',
    intro: [
      {
        h: 'पहले बराबर, फिर अलग ख़र्च',
        p: 'मूल रक़म सब में बराबर बँटती है। जो किसी एक को ही देना चाहिए — लौटने की टैक्सी, उसी की चुनी हुई बोतल, पार्किंग — वह उस व्यक्ति के नाम अतिरिक्त मद के रूप में जुड़ता है और सिर्फ़ उसी का हिस्सा बदलता है। साझा हिस्सा ईमानदार रहता है और शाम हिसाब-किताब में नहीं बदलती।',
      },
      {
        h: 'ऑर्डर से पहले तय कर लें कि कितने पर गोल करना है',
        p: 'तीन में बाँटने पर पूरा अंक शायद ही आता है। गोल करने की इकाई पहले तय कर लीजिए — सबसे छोटा सिक्का, या जो इकाई लोग सचमुच रखते हों — ताकि बचा हुआ हिस्सा हर बार एक ही व्यक्ति के ज़िम्मे न आए।',
      },
    ],
    faq: [
      { q: 'सब कुछ बराबर ही क्यों न बाँट दें?', a: 'क्योंकि बराबर बाँटने पर जिसने सिर्फ़ पानी पिया, वह किसी और के महँगे पेय का पैसा भी देता है। साझा हिस्सा बराबर बाँटकर बाक़ी अलग डालना ज़्यादा न्यायसंगत है और एक मिनट लेता है।' },
      { q: 'कितने पर गोल करूँ?', a: 'उसी सबसे छोटी इकाई पर जो सचमुच हाथ बदलती है। कार्ड से भुगतान में पैसे तक ठीक है; नक़द में उस सिक्के तक गोल कीजिए जो चलन में हो।' },
      { q: 'कितने लोग तक चलेगा?', a: 'बीस तक। उससे ज़्यादा में बराबर बँटवारा वैसे भी सही तरीक़ा नहीं रह जाता — तब हर चीज़ का अलग हिसाब बेहतर है।' },
    ],
    ui: {
      basic: 'बुनियादी जानकारी', total: 'कुल रक़म', people: 'लोग (2–20)',
      rounding: 'गोल करें', extras: 'अतिरिक्त मद', addExtra: 'मद जोड़ें',
      itemName: 'मद', itemAmount: 'रक़म', assignedTo: 'किसके ज़िम्मे',
      everyone: 'सब', calc: 'गणना करें', result: 'हर व्यक्ति देगा',
      base: 'बराबर हिस्सा', extra: 'अतिरिक्त', finalTotal: 'अंतिम कुल',
      person: 'व्यक्ति', noExtras: 'अभी कोई अतिरिक्त मद नहीं (पेय, पार्किंग वग़ैरह)',
      check: 'कुल जाँचें',
    },
  },
  'zh-hans': {
    title: 'AA 分摊计算器',
    desc: '把总额平均分，个别费用记到指定的人头上',
    short: '总额 · 人数 · 额外项 → 每人应付',
    intro: [
      {
        h: '先平摊，再算额外项',
        p: '基础金额按人数平摊。只该某一个人出的部分——回家的车费、他自己点的那瓶酒、停车费——作为额外项记在他名下，只有他那一份会变。这样共同的部分干净利落，又不至于把一顿饭变成记账。',
      },
      {
        h: '点单前就把零头怎么处理定下来',
        p: '三个人分很少能除得尽。事先定好凑整的单位——最小的硬币，或者大家身上真有的面额——就不会每次都是同一个人多掏那点零头。',
      },
    ],
    faq: [
      { q: '干脆全部平摊不行吗？', a: '平摊等于让只喝水的人替别人的酒买单。共同部分平摊、其余单独记，更公平，也就花一分钟。' },
      { q: '该凑整到多少？', a: '按真正会交出去的最小单位来。刷卡的话精确到分就行；付现金就凑到实际存在的硬币面额。' },
      { q: '最多支持多少人？', a: '二十人。再多的话平摊本来也不合适了，按项目逐一记账更准。' },
    ],
    ui: {
      basic: '基本信息', total: '总金额', people: '人数（2–20）',
      rounding: '凑整到', extras: '额外项', addExtra: '添加一项',
      itemName: '项目', itemAmount: '金额', assignedTo: '由谁承担',
      everyone: '全体', calc: '计算', result: '每人应付',
      base: '平摊部分', extra: '额外部分', finalTotal: '最终合计',
      person: '成员', noExtras: '还没有额外项（饮料、停车费等）',
      check: '核对总额',
    },
  },
  'zh-hant': {
    title: 'AA 分攤計算機',
    desc: '把總額平均分，個別費用記到指定的人頭上',
    short: '總額 · 人數 · 額外項 → 每人應付',
    intro: [
      {
        h: '先平攤，再算額外項',
        p: '基礎金額按人數平攤。只該某一個人出的部分——回家的車錢、他自己點的那瓶酒、停車費——作為額外項記在他名下，只有他那一份會變。這樣共同的部分乾淨俐落，又不至於把一頓飯變成記帳。',
      },
      {
        h: '點餐前就把零頭怎麼處理定下來',
        p: '三個人分很少能除得盡。事先定好湊整的單位——最小的硬幣，或者大家身上真有的面額——就不會每次都是同一個人多掏那點零頭。',
      },
    ],
    faq: [
      { q: '乾脆全部平攤不行嗎？', a: '平攤等於讓只喝水的人替別人的酒買單。共同部分平攤、其餘單獨記，更公平，也就花一分鐘。' },
      { q: '該湊整到多少？', a: '按真正會交出去的最小單位來。刷卡的話精確到分就行；付現金就湊到實際存在的硬幣面額。' },
      { q: '最多支援多少人？', a: '二十人。再多的話平攤本來也不合適了，按項目逐一記帳更準。' },
    ],
    ui: {
      basic: '基本資訊', total: '總金額', people: '人數（2–20）',
      rounding: '湊整到', extras: '額外項', addExtra: '新增一項',
      itemName: '項目', itemAmount: '金額', assignedTo: '由誰承擔',
      everyone: '全體', calc: '計算', result: '每人應付',
      base: '平攤部分', extra: '額外部分', finalTotal: '最終合計',
      person: '成員', noExtras: '還沒有額外項（飲料、停車費等）',
      check: '核對總額',
    },
  },
};
