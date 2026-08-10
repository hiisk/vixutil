import type { CalcTable } from './types.ts';

/**
 * 근무시간과 야근수당.
 *
 * 근무시간: 한국어판은 근로기준법의 최소 휴게(4시간에 30분, 8시간에 1시간)를
 * 기본값으로 넣고 8시간 초과분을 연장근로로 따로 보여 준다. 둘 다 한국 법이라
 * 지웠다 — 휴게는 그냥 입력이고, 하루 기준선도 없다. 자정을 넘기는 계산과
 * 주 5일 환산은 그대로 두었다.
 *
 * 야근수당: 한국어판은 월급÷209로 통상시급을 만들고 1.5배를 박아 두었다.
 * 209도 1.5도 한국 법이다. 여기서는 시급과 배율을 입력으로 받고(기본 1.5),
 * 나라마다 다른 법정 배율은 각 언어의 FAQ가 그 나라 기준으로 말한다.
 */
export const WORK_HOURS: CalcTable = {
  en: {
    title: 'Work hours calculator',
    desc: 'Hours actually worked from clock-in and clock-out times, with breaks taken out',
    short: 'Clock-in to clock-out, minus breaks',
    intro: [
      {
        h: 'Time at work is not time worked',
        p: 'Nine to six is nine hours on site, but the lunch hour belongs to neither your pay nor your overtime count: nine hours minus 60 minutes leaves eight worked. Pay, overtime and weekly limits are all reckoned on the worked figure, which is why this calculator keeps the two numbers apart.',
      },
      {
        h: 'Shifts that cross midnight',
        p: 'If the clock-out time is earlier than the clock-in, the calculator assumes you finished the next day: 22:00 to 06:00 is eight hours, not minus sixteen. Nothing needs switching — a night shift goes through the same arithmetic as a day shift.',
      },
      {
        h: 'Small daily gaps grow over a week',
        p: 'The weekly line multiplies one day by five, and that is exactly why it is worth a look: fifteen unpaid minutes a day seems like nothing, but over a five-day week it is an hour and a quarter, and over a year roughly a week and a half of work.',
      },
    ],
    faq: [
      { q: 'Are breaks paid or unpaid?', a: 'That depends on your country and your contract — many places pay short breaks but not the meal break. This calculator only does the arithmetic: whatever minutes you enter come out. If your breaks count as working time, enter 0.' },
      { q: 'I take several breaks. What do I enter?', a: 'Add them up and enter the total in minutes. Two fifteen-minute pauses and a half-hour lunch make 60. How the minutes were spread across the day makes no difference to the sum.' },
      { q: 'My week is not five days.', a: 'The weekly line assumes five equal days because that is the most common pattern. For four or six days, multiply the daily result yourself — or read the line as what a five-day week on this schedule would come to.' },
    ],
    ui: {
      section: 'Your day', start: 'Clock-in', end: 'Clock-out', breakMin: 'Break (minutes)',
      worked: 'Time worked', atWork: 'Time at work', breakRow: 'Breaks', weekly: '× 5 days',
      overnight: 'Counted as a shift crossing midnight',
      note: 'Breaks are simply subtracted — whether they are paid is a matter for your contract.',
      h: 'h', m: 'min',
    },
  },
  es: {
    title: 'Calculadora de horas trabajadas',
    desc: 'Las horas realmente trabajadas a partir de la entrada y la salida, descontando las pausas',
    short: 'De la entrada a la salida, menos pausas',
    intro: [
      {
        h: 'Estar en el trabajo no es trabajar',
        p: 'De nueve a seis son nueve horas en la empresa, pero la hora de comer no cuenta ni para el sueldo ni para las horas extra: nueve horas menos 60 minutos dejan ocho trabajadas. El sueldo, las horas extra y los límites semanales se calculan sobre las horas trabajadas, y por eso aquí las dos cifras van separadas.',
      },
      {
        h: 'Turnos que cruzan la medianoche',
        p: 'Si la salida es anterior a la entrada, la calculadora entiende que terminaste al día siguiente: de 22:00 a 06:00 son ocho horas, no dieciséis en negativo. No hay que activar nada — el turno de noche pasa por la misma aritmética que el de día.',
      },
      {
        h: 'Los minutos de cada día crecen en una semana',
        p: 'La línea semanal multiplica un día por cinco, y justo por eso merece una mirada: quince minutos sin pagar al día parecen nada, pero en una semana de cinco días son una hora y cuarto, y en un año, cerca de semana y media de trabajo.',
      },
    ],
    faq: [
      { q: '¿Las pausas se pagan?', a: 'Depende del país y de tu convenio o contrato: en muchos sitios se pagan las pausas cortas pero no la comida. Esta calculadora solo hace la aritmética: los minutos que introduzcas se restan. Si tus pausas cuentan como trabajo, pon 0.' },
      { q: 'Hago varias pausas. ¿Qué pongo?', a: 'Súmalas y escribe el total en minutos. Dos pausas de quince minutos y media hora de comida hacen 60. Cómo se repartieran a lo largo del día no cambia la cuenta.' },
      { q: 'Mi semana no es de cinco días.', a: 'La línea semanal supone cinco días iguales porque es el patrón más común. Con cuatro o seis días, multiplica tú mismo el resultado diario — o lee la línea como lo que daría una semana de cinco días con este horario.' },
    ],
    ui: {
      section: 'Tu jornada', start: 'Entrada', end: 'Salida', breakMin: 'Pausas (minutos)',
      worked: 'Horas trabajadas', atWork: 'Tiempo en el trabajo', breakRow: 'Pausas', weekly: '× 5 días',
      overnight: 'Contado como turno que cruza la medianoche',
      note: 'Las pausas simplemente se restan; si se pagan o no, lo dice tu contrato.',
      h: 'h', m: 'min',
    },
  },
  'pt-br': {
    title: 'Calculadora de horas trabalhadas',
    desc: 'As horas de fato trabalhadas a partir da entrada e da saída, descontando as pausas',
    short: 'Da entrada à saída, menos pausas',
    intro: [
      {
        h: 'Estar no trabalho não é trabalhar',
        p: 'Das nove às seis são nove horas na empresa, mas a hora do almoço não conta nem para o salário nem para a hora extra: nove horas menos 60 minutos deixam oito trabalhadas. Salário, hora extra e limites semanais se calculam sobre as horas trabalhadas — por isso as duas contas aparecem separadas aqui.',
      },
      {
        h: 'Turnos que passam da meia-noite',
        p: 'Se a saída vem antes da entrada, a calculadora entende que você terminou no dia seguinte: das 22:00 às 06:00 são oito horas, e não dezesseis negativas. Não precisa ligar nada — o turno da noite passa pela mesma aritmética do turno do dia.',
      },
      {
        h: 'Minutos por dia viram horas na semana',
        p: 'A linha semanal multiplica um dia por cinco, e é justamente por isso que vale olhar para ela: quinze minutos não pagos por dia parecem nada, mas numa semana de cinco dias são uma hora e quinze, e num ano, perto de uma semana e meia de trabalho.',
      },
    ],
    faq: [
      { q: 'As pausas são pagas?', a: 'Depende do país e do seu contrato ou acordo: em muitos lugares as pausas curtas são pagas, mas o almoço não. Esta calculadora só faz a aritmética: os minutos que você informar são descontados. Se as suas pausas contam como trabalho, coloque 0.' },
      { q: 'Faço várias pausas. O que eu coloco?', a: 'Some todas e informe o total em minutos. Duas pausas de quinze minutos e meia hora de almoço dão 60. Como elas se espalharam pelo dia não muda a conta.' },
      { q: 'Minha semana não tem cinco dias.', a: 'A linha semanal assume cinco dias iguais porque é o padrão mais comum. Com quatro ou seis dias, multiplique você mesmo o resultado diário — ou leia a linha como o que daria uma semana de cinco dias nesse horário.' },
    ],
    ui: {
      section: 'Seu dia', start: 'Entrada', end: 'Saída', breakMin: 'Pausas (minutos)',
      worked: 'Horas trabalhadas', atWork: 'Tempo na empresa', breakRow: 'Pausas', weekly: '× 5 dias',
      overnight: 'Contado como turno que passa da meia-noite',
      note: 'As pausas são simplesmente descontadas; se são pagas, quem diz é o contrato.',
      h: 'h', m: 'min',
    },
  },
  ja: {
    title: '勤務時間の計算機',
    desc: '出勤と退勤の時刻から、休憩を除いた実働時間を出します',
    short: '出勤から退勤まで、休憩を引いて',
    intro: [
      {
        h: '会社にいた時間と働いた時間は別です',
        p: '9時から18時までなら会社には9時間いますが、昼休みの1時間は給料にも残業の数えにも入りません。9時間から60分を引いた8時間が実働です。給料も残業も週の上限も、数えるのは実働のほうなので、この計算機は二つの数字を分けて示します。',
      },
      {
        h: '日をまたぐ勤務',
        p: '退勤時刻が出勤より早ければ、翌日に終わったものとして計算します。22時から翌6時までは8時間で、マイナス16時間ではありません。切り替えは要りません — 夜勤も日勤も同じ算数を通ります。',
      },
      {
        h: '毎日の数分は一週間で積もります',
        p: '週の行は一日分を5倍しただけですが、見る価値はまさにそこにあります。毎日15分のただ働きは小さく見えて、週5日で1時間15分、一年ではおよそ一週間半ぶんの労働に相当します。',
      },
    ],
    faq: [
      { q: '休憩は有給ですか。', a: '国と契約によります。短い休憩には払い、食事休憩には払わないところが多くあります。この計算機がするのは引き算だけで、入れた分数がそのまま引かれます。休憩が労働時間に数えられるなら0を入れてください。' },
      { q: '休憩が何回かに分かれています。', a: '合計して分で入れてください。15分の休憩が2回と昼の30分なら60です。一日の中でどう散らばっていたかは計算に関係ありません。' },
      { q: '週5日勤務ではありません。', a: '週の行は、いちばん多い型として同じ長さの5日を仮定しています。4日や6日なら一日分の結果に自分で掛けてください — あるいはこの行を「この時間割で週5日働いたら」の値として読んでください。' },
    ],
    ui: {
      section: '勤務の条件', start: '出勤', end: '退勤', breakMin: '休憩(分)',
      worked: '実働時間', atWork: '会社にいた時間', breakRow: '休憩', weekly: '× 5日',
      overnight: '日をまたぐ勤務として計算しました',
      note: '休憩はそのまま引きます。有給かどうかは契約が決めます。',
      h: '時間', m: '分',
    },
  },
  de: {
    title: 'Arbeitszeit-Rechner',
    desc: 'Die tatsächlich gearbeiteten Stunden aus Kommen und Gehen, Pausen abgezogen',
    short: 'Von Kommen bis Gehen, ohne Pausen',
    intro: [
      {
        h: 'Anwesenheit ist nicht Arbeitszeit',
        p: 'Von neun bis achtzehn Uhr sind Sie neun Stunden im Betrieb, aber die Mittagsstunde zählt weder für den Lohn noch für die Überstunden: neun Stunden minus 60 Minuten lassen acht gearbeitete übrig. Lohn, Überstunden und Wochenobergrenzen rechnen alle mit der gearbeiteten Zeit — deshalb hält dieser Rechner die beiden Zahlen auseinander.',
      },
      {
        h: 'Schichten über Mitternacht',
        p: 'Liegt das Gehen vor dem Kommen, nimmt der Rechner an, dass Sie am nächsten Tag fertig wurden: 22:00 bis 06:00 sind acht Stunden, nicht minus sechzehn. Umschalten muss man nichts — die Nachtschicht läuft durch dieselbe Rechnung wie die Tagschicht.',
      },
      {
        h: 'Kleine Tagesdifferenzen wachsen über die Woche',
        p: 'Die Wochenzeile multipliziert einen Tag mit fünf, und genau darum lohnt der Blick: fünfzehn unbezahlte Minuten am Tag wirken wie nichts, sind in einer Fünftagewoche aber eine und eine viertel Stunde — und im Jahr etwa anderthalb Arbeitswochen.',
      },
    ],
    faq: [
      { q: 'Sind Pausen bezahlt?', a: 'Das hängt von Land, Tarifvertrag und Arbeitsvertrag ab; oft sind kurze Pausen bezahlt, die Essenspause nicht. Dieser Rechner macht nur die Arithmetik: Die eingetragenen Minuten werden abgezogen. Zählen Ihre Pausen als Arbeitszeit, tragen Sie 0 ein.' },
      { q: 'Ich mache mehrere Pausen.', a: 'Addieren Sie sie und tragen Sie die Summe in Minuten ein. Zweimal fünfzehn Minuten und eine halbe Stunde Mittag ergeben 60. Wie sich die Minuten über den Tag verteilen, ist für die Rechnung gleichgültig.' },
      { q: 'Meine Woche hat keine fünf Tage.', a: 'Die Wochenzeile unterstellt fünf gleiche Tage, weil das das häufigste Muster ist. Bei vier oder sechs Tagen multiplizieren Sie das Tagesergebnis selbst — oder lesen Sie die Zeile als das, was eine Fünftagewoche mit diesem Plan ergäbe.' },
    ],
    ui: {
      section: 'Ihr Arbeitstag', start: 'Kommen', end: 'Gehen', breakMin: 'Pause (Minuten)',
      worked: 'Gearbeitete Zeit', atWork: 'Zeit im Betrieb', breakRow: 'Pausen', weekly: '× 5 Tage',
      overnight: 'Als Schicht über Mitternacht gerechnet',
      note: 'Pausen werden einfach abgezogen — ob sie bezahlt sind, regelt Ihr Vertrag.',
      h: 'Std', m: 'Min',
    },
  },
  fr: {
    title: 'Calculateur de temps de travail',
    desc: 'Les heures réellement travaillées à partir des heures d’arrivée et de départ, pauses déduites',
    short: 'De l’arrivée au départ, pauses déduites',
    intro: [
      {
        h: 'Être au travail n’est pas travailler',
        p: 'De neuf heures à dix-huit heures, vous passez neuf heures sur place, mais l’heure du déjeuner ne compte ni pour le salaire ni pour les heures supplémentaires : neuf heures moins 60 minutes laissent huit heures travaillées. Salaire, heures supplémentaires et plafonds hebdomadaires se calculent sur les heures travaillées — c’est pourquoi les deux chiffres restent séparés ici.',
      },
      {
        h: 'Les postes qui franchissent minuit',
        p: 'Si le départ précède l’arrivée, le calculateur suppose que vous avez fini le lendemain : de 22 h à 6 h, cela fait huit heures, pas moins seize. Rien à activer — le poste de nuit passe par la même arithmétique que celui de jour.',
      },
      {
        h: 'Les minutes quotidiennes s’accumulent sur la semaine',
        p: 'La ligne hebdomadaire multiplie une journée par cinq, et c’est précisément ce qui la rend utile : quinze minutes non payées par jour semblent négligeables, mais sur une semaine de cinq jours cela fait une heure et quart, et sur une année, près d’une semaine et demie de travail.',
      },
    ],
    faq: [
      { q: 'Les pauses sont-elles payées ?', a: 'Cela dépend du pays, de la convention et du contrat : souvent les pauses courtes sont payées, pas la pause repas. Ce calculateur ne fait que l’arithmétique : les minutes saisies sont retranchées. Si vos pauses comptent comme du travail, mettez 0.' },
      { q: 'Je prends plusieurs pauses.', a: 'Additionnez-les et saisissez le total en minutes. Deux pauses de quinze minutes et une demi-heure de déjeuner font 60. Leur répartition dans la journée n’a aucune importance pour le calcul.' },
      { q: 'Ma semaine ne fait pas cinq jours.', a: 'La ligne hebdomadaire suppose cinq jours identiques, le schéma le plus courant. Pour quatre ou six jours, multipliez vous-même le résultat quotidien — ou lisez cette ligne comme ce que donnerait une semaine de cinq jours à cet horaire.' },
    ],
    ui: {
      section: 'Votre journée', start: 'Arrivée', end: 'Départ', breakMin: 'Pauses (minutes)',
      worked: 'Temps travaillé', atWork: 'Temps sur place', breakRow: 'Pauses', weekly: '× 5 jours',
      overnight: 'Compté comme un poste franchissant minuit',
      note: 'Les pauses sont simplement déduites — leur paiement dépend de votre contrat.',
      h: 'h', m: 'min',
    },
  },
  hi: {
    title: 'काम के घंटे कैलकुलेटर',
    desc: 'आने-जाने के समय से, ब्रेक घटाकर, दिन के असल काम के घंटे',
    short: 'आने से जाने तक, ब्रेक घटाकर',
    intro: [
      {
        h: 'दफ़्तर में रहना और काम करना एक नहीं',
        p: 'नौ से छह तक आप नौ घंटे दफ़्तर में रहते हैं, पर खाने का एक घंटा न तनख़्वाह में गिना जाता है न ओवरटाइम में: नौ घंटे में से 60 मिनट घटाइए, आठ घंटे काम बचता है। तनख़्वाह, ओवरटाइम और हफ़्ते की सीमा — सब काम के घंटों पर गिने जाते हैं, इसीलिए यहाँ दोनों आंकड़े अलग-अलग दिखते हैं।',
      },
      {
        h: 'आधी रात पार करने वाली शिफ़्ट',
        p: 'अगर जाने का समय आने से पहले का है, तो कैलकुलेटर मान लेता है कि आप अगले दिन फ़ारिग़ हुए: रात 22:00 से सुबह 06:00 तक आठ घंटे हैं, माइनस सोलह नहीं। कुछ बदलना नहीं पड़ता — रात की शिफ़्ट भी उसी गिनती से गुज़रती है जिससे दिन की।',
      },
      {
        h: 'रोज़ के चंद मिनट हफ़्ते में बड़े हो जाते हैं',
        p: 'हफ़्ते वाली पंक्ति एक दिन को पाँच से गुणा भर करती है, और उसे देखने की वजह यही है: रोज़ के पंद्रह बिना पैसे के मिनट कुछ नहीं लगते, पर पाँच दिन के हफ़्ते में सवा घंटा बन जाते हैं, और साल भर में क़रीब डेढ़ हफ़्ते का काम।',
      },
    ],
    faq: [
      { q: 'क्या ब्रेक के पैसे मिलते हैं?', a: 'यह देश और आपके अनुबंध पर निर्भर है — कई जगह छोटे ब्रेक के पैसे मिलते हैं, खाने की छुट्टी के नहीं। यह कैलकुलेटर सिर्फ़ गिनती करता है: जितने मिनट आप डालेंगे, उतने घट जाएँगे। अगर आपके ब्रेक काम में गिने जाते हैं, तो 0 डालिए।' },
      { q: 'मैं कई ब्रेक लेता हूँ, क्या डालूँ?', a: 'सबको जोड़कर कुल मिनट डालिए। पंद्रह-पंद्रह मिनट के दो ब्रेक और आधे घंटे का खाना मिलकर 60 हुए। दिन में वे कैसे बँटे थे, इससे गिनती को कोई फ़र्क़ नहीं पड़ता।' },
      { q: 'मेरा हफ़्ता पाँच दिन का नहीं है।', a: 'हफ़्ते वाली पंक्ति पाँच बराबर दिन मानती है, क्योंकि यही सबसे आम ढर्रा है। चार या छह दिन हों तो दिन के नतीजे को ख़ुद गुणा कर लीजिए — या इस पंक्ति को यों पढ़िए कि इसी समय-सारणी से पाँच दिन का हफ़्ता कितना बैठता।' },
    ],
    ui: {
      section: 'आपका दिन', start: 'आने का समय', end: 'जाने का समय', breakMin: 'ब्रेक (मिनट)',
      worked: 'काम के घंटे', atWork: 'दफ़्तर में बिताया समय', breakRow: 'ब्रेक', weekly: '× 5 दिन',
      overnight: 'रात पार करने वाली शिफ़्ट मानकर गिना',
      note: 'ब्रेक बस घटा दिए जाते हैं — उनके पैसे मिलते हैं या नहीं, यह अनुबंध तय करता है।',
      h: 'घं', m: 'मि',
    },
  },
  'zh-hans': {
    title: '工作时长计算器',
    desc: '用上下班时间减去休息，算出一天实际工作了多久',
    short: '上班到下班，减去休息',
    intro: [
      {
        h: '在公司的时间不等于工作时间',
        p: '九点上班六点下班，人在公司九个小时，但午休那一个小时既不算进工资也不算进加班：九小时减去 60 分钟，剩八小时。工资、加班和每周上限，都按工作时间来算——所以这里把两个数字分开列。',
      },
      {
        h: '跨过午夜的班',
        p: '如果下班时间比上班时间早，计算器就当你是第二天才下的班：22:00 到 06:00 是八小时，不是负十六小时。什么都不用切换——夜班和白班走的是同一套算术。',
      },
      {
        h: '每天几分钟，一周就不小了',
        p: '每周那一行只是把一天乘以五，但它值得看的原因正在这里：每天十五分钟的白干看着不起眼，五天下来就是一小时一刻钟，一年下来大约相当于一周半的工作量。',
      },
    ],
    faq: [
      { q: '休息时间有工资吗？', a: '看国家和你的合同——很多地方短暂休息带薪，吃饭时间不带。这个计算器只做算术：你填多少分钟就减多少。如果你的休息算作工作时间，就填 0。' },
      { q: '我一天休息好几次，怎么填？', a: '加起来，填总分钟数。两次十五分钟加半小时午饭就是 60。这些分钟在一天里怎么分布，对计算没有影响。' },
      { q: '我一周不是五天班。', a: '每周那一行假设五个同样的工作日，因为这是最常见的模式。四天或六天的话，把一天的结果自己乘一下——或者把这一行当作“照这个作息干满五天”会是多少。' },
    ],
    ui: {
      section: '你的一天', start: '上班时间', end: '下班时间', breakMin: '休息（分钟）',
      worked: '工作时长', atWork: '在公司的时间', breakRow: '休息', weekly: '× 5 天',
      overnight: '按跨夜的班计算',
      note: '休息只是被减掉——带不带薪由你的合同决定。',
      h: '小时', m: '分',
    },
  },
  'zh-hant': {
    title: '工作時數計算機',
    desc: '用上下班時間減去休息，算出一天實際工作了多久',
    short: '上班到下班，減去休息',
    intro: [
      {
        h: '在公司的時間不等於工作時間',
        p: '九點上班六點下班，人在公司九個小時，但午休那一個小時既不算進薪水也不算進加班：九小時減去 60 分鐘，剩八小時。薪水、加班和每週上限，都按工作時間來算——所以這裡把兩個數字分開列。',
      },
      {
        h: '跨過午夜的班',
        p: '如果下班時間比上班時間早，計算機就當你是第二天才下的班：22:00 到 06:00 是八小時，不是負十六小時。什麼都不用切換——夜班和白班走的是同一套算術。',
      },
      {
        h: '每天幾分鐘，一週就不小了',
        p: '每週那一行只是把一天乘以五，但它值得看的原因正在這裡：每天十五分鐘的白做看著不起眼，五天下來就是一小時十五分，一年下來大約相當於一週半的工作量。',
      },
    ],
    faq: [
      { q: '休息時間有薪水嗎？', a: '看國家和你的合約——很多地方短暫休息帶薪，吃飯時間不帶。這個計算機只做算術：你填多少分鐘就減多少。如果你的休息算作工作時間，就填 0。' },
      { q: '我一天休息好幾次，怎麼填？', a: '加起來，填總分鐘數。兩次十五分鐘加半小時午飯就是 60。這些分鐘在一天裡怎麼分布，對計算沒有影響。' },
      { q: '我一週不是五天班。', a: '每週那一行假設五個同樣的工作日，因為這是最常見的模式。四天或六天的話，把一天的結果自己乘一下——或者把這一行當作「照這個作息做滿五天」會是多少。' },
    ],
    ui: {
      section: '你的一天', start: '上班時間', end: '下班時間', breakMin: '休息（分鐘）',
      worked: '工作時數', atWork: '在公司的時間', breakRow: '休息', weekly: '× 5 天',
      overnight: '按跨夜的班計算',
      note: '休息只是被減掉——帶不帶薪由你的合約決定。',
      h: '小時', m: '分',
    },
  },
};

export const OVERTIME: CalcTable = {
  en: {
    title: 'Overtime pay calculator',
    desc: 'Overtime pay from your hourly wage, the extra hours and the multiplier that applies to you',
    short: 'Wage × hours × multiplier',
    intro: [
      {
        h: 'Wage × hours × multiplier',
        p: 'Ten hours of overtime on a wage of 20 at a 1.5 multiplier pays 300 — 200 of it is what the hours would earn at the plain rate, and 100 is the premium. The result shows the split, because the premium is the part owed specifically for the overtime being overtime.',
      },
      {
        h: 'The multiplier is an input for a reason',
        p: 'There is no world standard: legal floors run from no premium at all to double pay, and night work or holidays often carry their own rates on top. 1.5 is only a common default — the number that applies to you comes from your law, your contract or a collective agreement.',
      },
      {
        h: 'A multiplier is not a premium percentage',
        p: 'A law that promises "a 25% premium" means each overtime hour pays 125% of the wage — enter 1.25, not 25 or 0.25. And the multiplier touches only hours that count as overtime; regular hours stay at the plain rate.',
      },
    ],
    faq: [
      { q: 'What does US law require?', a: 'Under the federal FLSA, non-exempt employees must be paid at least 1.5 times their regular rate for hours beyond 40 in a workweek. There is no federal daily threshold, though some states — California most prominently — add daily overtime rules of their own.' },
      { q: 'Does the multiplier apply to my whole paycheck?', a: 'No — only to the overtime hours. Working 45 hours at a 1.5 multiplier means 40 hours at the plain wage plus 5 at one and a half times it, not 45 at the higher rate. This calculator prices just the overtime block.' },
      { q: 'Which currency, and is this before tax?', a: 'Whichever you type — the wage sets the unit and the answer comes back in it. The result is gross: overtime pay is taxed like the rest of your income, so what lands in your account will be less.' },
    ],
    ui: {
      section: 'Your overtime', wage: 'Hourly wage', hours: 'Overtime hours', multiplier: 'Multiplier',
      calc: 'Calculate', pay: 'Overtime pay', otRate: 'Rate per overtime hour', premium: 'Premium portion',
      note: 'The currency is whatever you enter, and the result is before tax. The legal multiplier depends on your country and contract.',
    },
  },
  es: {
    title: 'Calculadora de horas extra',
    desc: 'El pago de las horas extra a partir del sueldo por hora, las horas y el recargo que te corresponda',
    short: 'Sueldo × horas × multiplicador',
    intro: [
      {
        h: 'Sueldo × horas × multiplicador',
        p: 'Diez horas extra con un sueldo de 20 y un multiplicador de 1,5 pagan 300: 200 es lo que esas horas valdrían a tarifa normal y 100 es el recargo. El resultado muestra las dos partes, porque el recargo es lo que se debe precisamente por ser horas extra.',
      },
      {
        h: 'El multiplicador se introduce por algo',
        p: 'No hay un estándar mundial: los mínimos legales van desde ningún recargo hasta el doble, y la noche o los festivos suelen llevar tarifas propias encima. El 1,5 es solo un valor habitual — el número que te aplica sale de tu ley, tu contrato o tu convenio colectivo.',
      },
      {
        h: 'Multiplicador no es lo mismo que porcentaje de recargo',
        p: 'Una ley que promete «un recargo del 25%» quiere decir que cada hora extra paga el 125% del sueldo: introduce 1,25, no 25 ni 0,25. Y el multiplicador toca solo las horas que cuentan como extra; las ordinarias siguen a tarifa normal.',
      },
    ],
    faq: [
      { q: '¿Qué dice la ley en España?', a: 'El Estatuto de los Trabajadores manda pagar la hora extraordinaria al menos como la hora ordinaria, o compensarla con descanso retribuido. El porcentaje concreto, si lo hay, lo fija el convenio colectivo o el contrato: los recargos del 50% o el 75% que se oyen vienen de convenios, no de la ley.' },
      { q: '¿El multiplicador se aplica a todo el sueldo?', a: 'No — solo a las horas extra. Trabajar 45 horas con un multiplicador de 1,5 son 40 horas a tarifa normal más 5 a una vez y media, no 45 a la tarifa alta. Esta calculadora pone precio solo al bloque extra.' },
      { q: '¿En qué moneda, y es bruto o neto?', a: 'En la que escribas: el sueldo fija la unidad y la respuesta sale en la misma. El resultado es bruto — las horas extra tributan como el resto de tus ingresos, así que lo que llegue a tu cuenta será menos.' },
    ],
    ui: {
      section: 'Tus horas extra', wage: 'Sueldo por hora', hours: 'Horas extra', multiplier: 'Multiplicador',
      calc: 'Calcular', pay: 'Pago de horas extra', otRate: 'Tarifa por hora extra', premium: 'Parte de recargo',
      note: 'La moneda es la que introduzcas y el resultado es bruto. El multiplicador legal depende de tu país y tu convenio.',
    },
  },
  'pt-br': {
    title: 'Calculadora de hora extra',
    desc: 'O valor das horas extras a partir do salário por hora, das horas e do adicional que vale para você',
    short: 'Salário × horas × multiplicador',
    intro: [
      {
        h: 'Salário × horas × multiplicador',
        p: 'Dez horas extras com salário de 20 e multiplicador 1,5 pagam 300: 200 é o que essas horas valeriam na tarifa normal e 100 é o adicional. O resultado mostra as duas partes, porque o adicional é o que se deve justamente por a hora ser extra.',
      },
      {
        h: 'O multiplicador é um campo de entrada por um motivo',
        p: 'Não existe padrão mundial: o piso legal vai de nenhum adicional até o dobro, e noite ou feriado costumam ter taxas próprias por cima. O 1,5 é só um valor comum — o número que vale para você vem da lei, do contrato ou da convenção coletiva.',
      },
      {
        h: 'Multiplicador não é porcentagem de adicional',
        p: 'Uma lei que promete "adicional de 50%" quer dizer que cada hora extra paga 150% do salário: digite 1,5, e não 50 nem 0,5. E o multiplicador alcança só as horas que contam como extras; as horas normais seguem na tarifa comum.',
      },
    ],
    faq: [
      { q: 'O que diz a lei no Brasil?', a: 'A CLT garante adicional mínimo de 50% sobre a hora normal — multiplicador 1,5. Em domingos e feriados trabalhados sem folga compensatória, o entendimento consolidado é pagamento em dobro, ou seja, 2. Convenção coletiva pode fixar adicionais maiores; menores, não.' },
      { q: 'O multiplicador vale para o salário inteiro?', a: 'Não — só para as horas extras. Trabalhar 45 horas com multiplicador 1,5 são 40 horas na tarifa normal mais 5 a uma vez e meia, e não 45 na tarifa alta. Esta calculadora precifica só o bloco extra.' },
      { q: 'Em que moeda, e é bruto ou líquido?', a: 'Na que você digitar: o salário define a unidade e a resposta volta nela. O resultado é bruto — hora extra é tributada como o resto da sua renda, então o que cai na conta será menos.' },
    ],
    ui: {
      section: 'Suas horas extras', wage: 'Salário por hora', hours: 'Horas extras', multiplier: 'Multiplicador',
      calc: 'Calcular', pay: 'Valor das horas extras', otRate: 'Valor por hora extra', premium: 'Parte do adicional',
      note: 'A moeda é a que você digitar e o resultado é bruto. O multiplicador legal depende do seu país e do seu contrato.',
    },
  },
  ja: {
    title: '残業代の計算機',
    desc: '時給と残業時間、そしてあなたに適用される倍率から残業代を出します',
    short: '時給 × 時間 × 倍率',
    intro: [
      {
        h: '時給 × 時間 × 倍率',
        p: '時給20で10時間の残業を1.5倍でこなすと300です。うち200はその時間をふつうの時給で働いたぶん、100が割増分です。結果は二つに分けて示します — 割増分こそ、残業が残業であることに対して払われる部分だからです。',
      },
      {
        h: '倍率が入力欄になっている理由',
        p: '世界共通の基準はありません。法定の下限は割増なしから2倍までさまざまで、深夜や休日にはさらに別の率が重なることも多くあります。1.5はよくある既定値にすぎず、あなたに適用される数字は法律・契約・労使協定が決めます。',
      },
      {
        h: '倍率と割増率は別のものです',
        p: '「25%の割増」と定める法律は、残業1時間に時給の125%を払うという意味です。入力欄には1.25を入れてください。25でも0.25でもありません。また倍率がかかるのは残業と数えられる時間だけで、所定内の時間はふつうの時給のままです。',
      },
    ],
    faq: [
      { q: '日本の法律ではどうなっていますか。', a: '労働基準法では、法定労働時間(1日8時間・週40時間)を超える時間外労働に25%以上の割増、つまり1.25倍を払います。深夜(22時から翌5時)はさらに25%が重なり、法定休日の労働は35%以上です。深夜に及ぶ残業なら1.5倍になります。' },
      { q: '倍率は給料全体にかかるのですか。', a: 'いいえ、残業時間だけです。週45時間働いて倍率1.5なら、40時間はふつうの時給、5時間だけが1.5倍です。45時間全部が高い率になるわけではありません。この計算機が値段をつけるのは残業の部分だけです。' },
      { q: '通貨は何ですか。税引き前ですか。', a: '入力した通貨です。時給に入れた数字が単位を決め、答えも同じ単位で返ります。結果は税引き前です — 残業代もほかの収入と同じく課税されるので、手取りはこれより少なくなります。' },
    ],
    ui: {
      section: '残業の条件', wage: '時給', hours: '残業時間', multiplier: '倍率',
      calc: '計算する', pay: '残業代', otRate: '残業1時間あたり', premium: '割増分',
      note: '通貨は入力したもので、結果は税引き前です。法定の倍率は国と契約によって違います。',
    },
  },
  de: {
    title: 'Überstunden-Rechner',
    desc: 'Die Überstundenvergütung aus Stundenlohn, Mehrstunden und dem Faktor, der für Sie gilt',
    short: 'Lohn × Stunden × Faktor',
    intro: [
      {
        h: 'Lohn × Stunden × Faktor',
        p: 'Zehn Überstunden bei einem Lohn von 20 und Faktor 1,5 ergeben 300 — davon sind 200 das, was die Stunden zum normalen Satz wert wären, und 100 der Zuschlag. Das Ergebnis zeigt beide Teile, denn der Zuschlag ist der Teil, der eigens dafür geschuldet wird, dass die Stunden Überstunden sind.',
      },
      {
        h: 'Warum der Faktor ein Eingabefeld ist',
        p: 'Einen Weltstandard gibt es nicht: Die gesetzlichen Untergrenzen reichen von gar keinem Zuschlag bis zum doppelten Lohn, und Nacht oder Feiertage tragen oft eigene Sätze obendrauf. 1,5 ist nur ein verbreiteter Vorgabewert — die Zahl, die für Sie gilt, steht in Gesetz, Arbeitsvertrag oder Tarifvertrag.',
      },
      {
        h: 'Faktor und Zuschlagsprozent sind zweierlei',
        p: 'Verspricht eine Regelung "25% Zuschlag", zahlt jede Überstunde 125% des Lohns — tragen Sie 1,25 ein, nicht 25 und nicht 0,25. Und der Faktor greift nur bei Stunden, die als Überstunden zählen; die regulären bleiben beim normalen Satz.',
      },
    ],
    faq: [
      { q: 'Was schreibt das Gesetz in Deutschland vor?', a: 'Keinen Zuschlag — einen gesetzlichen Überstundenzuschlag gibt es in Deutschland nicht. Ob und wie viel gezahlt wird, regeln Tarifvertrag oder Arbeitsvertrag, und häufig gibt es Freizeitausgleich statt Geld. Ohne solche Regelung gilt der normale Stundenlohn, also Faktor 1.' },
      { q: 'Gilt der Faktor für den ganzen Lohn?', a: 'Nein — nur für die Überstunden. 45 Stunden bei Faktor 1,5 heißt: 40 Stunden zum normalen Lohn plus 5 zum anderthalbfachen, nicht 45 zum höheren Satz. Dieser Rechner bepreist allein den Überstundenblock.' },
      { q: 'Welche Währung, und ist das brutto?', a: 'Die, die Sie eingeben — der Stundenlohn legt die Einheit fest, und die Antwort kommt in derselben zurück. Das Ergebnis ist brutto: Überstunden werden wie das übrige Einkommen versteuert, auf dem Konto landet also weniger.' },
    ],
    ui: {
      section: 'Ihre Überstunden', wage: 'Stundenlohn', hours: 'Überstunden', multiplier: 'Faktor',
      calc: 'Berechnen', pay: 'Überstundenvergütung', otRate: 'Satz je Überstunde', premium: 'Zuschlagsanteil',
      note: 'Die Währung ist die Ihrer Eingabe, das Ergebnis ist brutto. Der geltende Faktor hängt von Land und Vertrag ab.',
    },
  },
  fr: {
    title: 'Calculateur d’heures supplémentaires',
    desc: 'La paie des heures supplémentaires à partir du taux horaire, des heures et du multiplicateur qui vous concerne',
    short: 'Taux × heures × multiplicateur',
    intro: [
      {
        h: 'Taux × heures × multiplicateur',
        p: 'Dix heures supplémentaires à un taux de 20 avec un multiplicateur de 1,5 rapportent 300 : 200 correspondent à ce que ces heures vaudraient au taux normal, et 100 à la majoration. Le résultat sépare les deux, car la majoration est la part due précisément parce que ces heures sont supplémentaires.',
      },
      {
        h: 'Pourquoi le multiplicateur se saisit',
        p: 'Il n’existe pas de norme mondiale : les planchers légaux vont de l’absence de majoration au salaire doublé, et la nuit ou les jours fériés portent souvent leurs propres taux par-dessus. 1,5 n’est qu’une valeur courante — le chiffre qui vous concerne vient de la loi, du contrat ou de l’accord collectif.',
      },
      {
        h: 'Multiplicateur et taux de majoration, deux choses distinctes',
        p: 'Une règle qui promet « 25 % de majoration » signifie que chaque heure supplémentaire paie 125 % du taux : saisissez 1,25, pas 25 ni 0,25. Et le multiplicateur ne touche que les heures qui comptent comme supplémentaires ; les heures normales restent au taux ordinaire.',
      },
    ],
    faq: [
      { q: 'Que dit la loi en France ?', a: 'Au-delà de 35 heures par semaine, les huit premières heures supplémentaires — de la 36e à la 43e — sont majorées d’au moins 25 %, soit un multiplicateur de 1,25, et les suivantes de 50 %, soit 1,5. Un accord collectif peut fixer un autre taux, sans descendre sous 10 %.' },
      { q: 'Le multiplicateur s’applique-t-il à toute la paie ?', a: 'Non — aux seules heures supplémentaires. Travailler 45 heures avec un multiplicateur de 1,5, c’est 40 heures au taux normal plus 5 à une fois et demie, pas 45 au taux majoré. Ce calculateur ne chiffre que le bloc supplémentaire.' },
      { q: 'Quelle devise, et est-ce avant impôt ?', a: 'Celle que vous saisissez : le taux horaire fixe l’unité et le résultat revient dans la même. Le montant est brut — les heures supplémentaires sont imposées comme le reste du revenu, ce qui arrive sur le compte sera donc moindre.' },
    ],
    ui: {
      section: 'Vos heures supplémentaires', wage: 'Taux horaire', hours: 'Heures supplémentaires', multiplier: 'Multiplicateur',
      calc: 'Calculer', pay: 'Paie des heures supplémentaires', otRate: 'Taux par heure supplémentaire', premium: 'Part de majoration',
      note: 'La devise est celle que vous saisissez et le résultat est brut. Le multiplicateur légal dépend du pays et du contrat.',
    },
  },
  hi: {
    title: 'ओवरटाइम वेतन कैलकुलेटर',
    desc: 'प्रति घंटा मज़दूरी, अतिरिक्त घंटों और आप पर लागू गुणक से ओवरटाइम का पैसा',
    short: 'मज़दूरी × घंटे × गुणक',
    intro: [
      {
        h: 'मज़दूरी × घंटे × गुणक',
        p: '20 की मज़दूरी पर 1.5 गुणक से दस घंटे का ओवरटाइम 300 देता है: 200 वह है जो ये घंटे सामान्य दर पर कमाते, और 100 अतिरिक्त हिस्सा है। नतीजा दोनों को अलग दिखाता है, क्योंकि वही अतिरिक्त हिस्सा है जो ओवरटाइम के ओवरटाइम होने की वजह से बनता है।',
      },
      {
        h: 'गुणक भरने की जगह क्यों है',
        p: 'दुनिया भर का कोई एक नियम नहीं है: क़ानूनी न्यूनतम कहीं शून्य है तो कहीं दुगुना, और रात या छुट्टी के दिन की दरें अक्सर ऊपर से अलग लगती हैं। 1.5 बस एक आम चलन है — आप पर लागू आंकड़ा आपके क़ानून, अनुबंध या सामूहिक समझौते से आता है।',
      },
      {
        h: 'गुणक और बढ़ोतरी का प्रतिशत एक चीज़ नहीं',
        p: 'जो नियम "25% अतिरिक्त" कहता है, उसका मतलब है हर ओवरटाइम घंटे पर मज़दूरी का 125% — यहाँ 1.25 भरिए, 25 या 0.25 नहीं। और गुणक सिर्फ़ उन्हीं घंटों पर लगता है जो ओवरटाइम गिने जाते हैं; बाक़ी घंटे सामान्य दर पर ही रहते हैं।',
      },
    ],
    faq: [
      { q: 'भारत में क़ानून क्या कहता है?', a: 'कारख़ाना अधिनियम (Factories Act) के तहत, दिन में 9 घंटे या हफ़्ते में 48 घंटे से ज़्यादा काम कराने पर मज़दूरी की सामान्य दर से दुगुनी दर देनी होती है — यानी गुणक 2। दुकानों-प्रतिष्ठानों पर राज्यों के अपने क़ानून लागू होते हैं, पर दुगुनी दर का ही चलन आम है।' },
      { q: 'क्या गुणक पूरी तनख़्वाह पर लगता है?', a: 'नहीं — सिर्फ़ ओवरटाइम के घंटों पर। 1.5 गुणक से 45 घंटे काम का मतलब है 40 घंटे सामान्य दर पर और 5 घंटे डेढ़ गुना पर, न कि पूरे 45 ऊँची दर पर। यह कैलकुलेटर सिर्फ़ ओवरटाइम वाले हिस्से की क़ीमत लगाता है।' },
      { q: 'कौन-सी मुद्रा, और यह कर से पहले है या बाद?', a: 'जो आप डालें: मज़दूरी की इकाई ही जवाब की इकाई है। नतीजा सकल (कर से पहले) है — ओवरटाइम की कमाई पर भी बाक़ी आमदनी की तरह कर लगता है, इसलिए हाथ में उससे कम आएगा।' },
    ],
    ui: {
      section: 'आपका ओवरटाइम', wage: 'प्रति घंटा मज़दूरी', hours: 'ओवरटाइम घंटे', multiplier: 'गुणक',
      calc: 'गणना करें', pay: 'ओवरटाइम का पैसा', otRate: 'प्रति ओवरटाइम घंटा दर', premium: 'अतिरिक्त हिस्सा',
      note: 'मुद्रा वही है जो आप डालें, और नतीजा कर से पहले का है। क़ानूनी गुणक देश और अनुबंध पर निर्भर है।',
    },
  },
  'zh-hans': {
    title: '加班费计算器',
    desc: '用时薪、加班小时数和适用于你的倍数，算出加班费',
    short: '时薪 × 小时 × 倍数',
    intro: [
      {
        h: '时薪 × 小时 × 倍数',
        p: '时薪 20，加班十小时，倍数 1.5，加班费就是 300——其中 200 是这些小时按正常时薪本来就值的钱，100 是加成部分。结果把两块分开列，因为加成那一块才是专门为“加班之所以是加班”付的钱。',
      },
      {
        h: '倍数为什么要自己填',
        p: '世界上没有统一标准：法定下限从完全没有加成到双倍工资都有，夜间和节假日还常常另算。1.5 只是一个常见的默认值——适用于你的数字，来自你所在地的法律、你的合同或集体协议。',
      },
      {
        h: '倍数和加成百分比不是一回事',
        p: '规定“加成 25%”的意思是，每个加班小时按时薪的 125% 付——这里要填 1.25，不是 25 也不是 0.25。而且倍数只作用于算作加班的那些小时，正常工时仍按原时薪计。',
      },
    ],
    faq: [
      { q: '中国的法定标准是多少？', a: '按照劳动法：工作日安排加班，支付不低于工资的 150%；休息日加班又不能安排补休的，支付不低于 200%；法定节假日加班，支付不低于 300%。对应填 1.5、2 和 3——“三倍工资”指的就是倍数 3。' },
      { q: '倍数是乘在整份工资上吗？', a: '不是——只乘在加班的小时上。按 1.5 的倍数干 45 小时，是 40 小时按正常时薪加 5 小时按一倍半，而不是 45 小时都按高价。这个计算器只给加班那一块定价。' },
      { q: '用什么货币？算的是税前吗？', a: '你填什么就是什么：时薪定下单位，答案用同一个单位返回。结果是税前的——加班费和其他收入一样要缴税，到账的会比这个数少。' },
    ],
    ui: {
      section: '你的加班', wage: '时薪', hours: '加班小时数', multiplier: '倍数',
      calc: '计算', pay: '加班费', otRate: '每个加班小时', premium: '加成部分',
      note: '货币就是你填入的那种，结果为税前。法定倍数因国家和合同而异。',
    },
  },
  'zh-hant': {
    title: '加班費計算機',
    desc: '用時薪、加班時數和適用於你的倍數，算出加班費',
    short: '時薪 × 時數 × 倍數',
    intro: [
      {
        h: '時薪 × 時數 × 倍數',
        p: '時薪 20，加班十小時，倍數 1.5，加班費就是 300——其中 200 是這些小時按正常時薪本來就值的錢，100 是加給的部分。結果把兩塊分開列，因為加給那一塊才是專門為「加班之所以是加班」付的錢。',
      },
      {
        h: '倍數為什麼要自己填',
        p: '世界上沒有統一標準：法定下限從完全沒有加給到雙倍工資都有，夜間和假日還常常另計。1.5 只是一個常見的預設值——適用於你的數字，來自你所在地的法律、你的合約或團體協約。',
      },
      {
        h: '倍數和加給百分比不是一回事',
        p: '規定「加給 25%」的意思是，每個加班小時按時薪的 125% 付——這裡要填 1.25，不是 25 也不是 0.25。而且倍數只作用於算作加班的那些時數，正常工時仍按原時薪計。',
      },
    ],
    faq: [
      { q: '台灣的法定標準是多少？', a: '勞動基準法規定，平日延長工時的前兩小時，按平日每小時工資額加給三分之一以上，即乘約 1.33；第三小時起加給三分之二以上，即乘約 1.67。休息日出勤另有專門的計算方式，數字不同。條文說的「加給三分之一」是乘 1.33，不是 0.33。' },
      { q: '倍數是乘在整份薪水上嗎？', a: '不是——只乘在加班的時數上。按 1.5 的倍數做 45 小時，是 40 小時按正常時薪加 5 小時按一倍半，而不是 45 小時都按高價。這個計算機只給加班那一塊定價。' },
      { q: '用什麼貨幣？算的是稅前嗎？', a: '你填什麼就是什麼：時薪定下單位，答案用同一個單位返回。結果是稅前的——加班費和其他收入一樣要繳稅，入帳的會比這個數少。' },
    ],
    ui: {
      section: '你的加班', wage: '時薪', hours: '加班時數', multiplier: '倍數',
      calc: '計算', pay: '加班費', otRate: '每個加班小時', premium: '加給部分',
      note: '貨幣就是你填入的那種，結果為稅前。法定倍數因國家和合約而異。',
    },
  },
};
