import type { CalcTable } from './types.ts';

/**
 * 날짜 셋 — D-day, 생일, 시간 차이.
 *
 * 날짜 이름과 요일은 toLocaleDateString이 언어별로 내주므로 표에 적지 않는다.
 * 생일 쪽의 한국 나이(세는나이)는 뺐다 — 한국에만 있는 셈법이다.
 */
export const DDAY: CalcTable = {
  en: {
    title: 'Day counter',
    desc: 'Days until a date, days since one, and the working days in between',
    short: 'Countdown and days between',
    intro: [
      {
        h: 'Counting from zero or from one',
        p: 'Whether the first day counts is a choice, not a fact. This tool reports the plain difference between two dates, so a deadline tomorrow shows as 1. Contracts and notice periods often count inclusively and land a day apart from this — worth checking which convention applies before relying on either.',
      },
      {
        h: 'Working days exclude weekends only',
        p: 'The working-day figure counts Monday to Friday and skips Saturday and Sunday. It knows nothing about public holidays, which differ by country and often by region, so in any month with a holiday the real number of working days is lower than shown here.',
      },
    ],
    faq: [
      { q: 'Does it handle leap years?', a: 'Yes. The calculation works on real calendar dates, so 29 February and the extra day in a leap year are both accounted for automatically.' },
      { q: 'Why is the count off by one from what I expected?', a: 'Almost always because of inclusive counting. If you want the target day itself included, add one to the result.' },
      { q: 'Are public holidays excluded from working days?', a: 'No. Holidays vary by country and region, and a single tool cannot cover them all without being wrong somewhere. Subtract your own.' },
    ],
    ui: {
      section: 'Target date', target: 'Date', label: 'What is it (optional)', calc: 'Calculate',
      until: 'days to go', since: 'days ago', today: 'That is today',
      workdays: 'Working days', weeks: 'Weeks', totalDays: 'Total days',
      defaultLabel: 'Target date',
      note: 'Plain difference between dates. Working days count Mon–Fri and ignore public holidays.',
    },
  },
  es: {
    title: 'Contador de días',
    desc: 'Días que faltan para una fecha, días transcurridos y días laborables entre ambas',
    short: 'Cuenta atrás y días entre fechas',
    intro: [
      {
        h: 'Contar desde cero o desde uno',
        p: 'Que el primer día cuente o no es una convención, no un hecho. Esta herramienta da la diferencia simple entre dos fechas, así que un plazo que vence mañana aparece como 1. Los contratos y los plazos de preaviso suelen contar de forma inclusiva y quedan a un día de esto: conviene saber qué convención aplica antes de fiarse de cualquiera.',
      },
      {
        h: 'Los días laborables solo excluyen fines de semana',
        p: 'La cifra de días laborables cuenta de lunes a viernes y salta sábados y domingos. No sabe nada de festivos, que cambian según el país y a menudo según la región, así que en cualquier mes con festivo los laborables reales son menos de los mostrados.',
      },
    ],
    faq: [
      { q: '¿Tiene en cuenta los años bisiestos?', a: 'Sí. El cálculo trabaja con fechas reales del calendario, de modo que el 29 de febrero y el día extra de un año bisiesto se contemplan automáticamente.' },
      { q: '¿Por qué me sale un día de diferencia respecto a lo que esperaba?', a: 'Casi siempre por el conteo inclusivo. Si quieres incluir el propio día objetivo, suma uno al resultado.' },
      { q: '¿Se excluyen los festivos de los días laborables?', a: 'No. Los festivos varían por país y región, y una sola herramienta no puede cubrirlos todos sin equivocarse en algún sitio. Réstalos tú.' },
    ],
    ui: {
      section: 'Fecha objetivo', target: 'Fecha', label: 'De qué se trata (opcional)', calc: 'Calcular',
      until: 'días para', since: 'días desde', today: 'Es hoy',
      workdays: 'Días laborables', weeks: 'Semanas', totalDays: 'Días totales',
      defaultLabel: 'Fecha objetivo',
      note: 'Diferencia simple entre fechas. Los laborables cuentan de lunes a viernes e ignoran festivos.',
    },
  },
  'pt-br': {
    title: 'Contador de dias',
    desc: 'Dias até uma data, dias desde uma data e os dias úteis entre elas',
    short: 'Contagem regressiva e dias entre datas',
    intro: [
      {
        h: 'Contar do zero ou do um',
        p: 'Se o primeiro dia conta ou não é uma convenção, não um fato. Esta ferramenta dá a diferença simples entre duas datas, então um prazo que vence amanhã aparece como 1. Contratos e prazos de aviso costumam contar de forma inclusiva e ficam um dia distantes disto — vale saber qual convenção se aplica antes de confiar em qualquer uma.',
      },
      {
        h: 'Dias úteis excluem só o fim de semana',
        p: 'A contagem de dias úteis vai de segunda a sexta e pula sábado e domingo. Ela não sabe nada de feriados, que mudam de país para país e muitas vezes de região para região, então em qualquer mês com feriado o número real de dias úteis é menor do que o mostrado.',
      },
    ],
    faq: [
      { q: 'Considera anos bissextos?', a: 'Sim. O cálculo usa datas reais do calendário, então 29 de fevereiro e o dia extra do ano bissexto entram automaticamente.' },
      { q: 'Por que deu um dia a mais ou a menos do que eu esperava?', a: 'Quase sempre por causa da contagem inclusiva. Se você quer incluir o próprio dia-alvo, some um ao resultado.' },
      { q: 'Feriados são descontados dos dias úteis?', a: 'Não. Feriados variam por país e região, e uma única ferramenta não consegue cobrir todos sem errar em algum lugar. Desconte os seus.' },
    ],
    ui: {
      section: 'Data-alvo', target: 'Data', label: 'Do que se trata (opcional)', calc: 'Calcular',
      until: 'dias para', since: 'dias desde', today: 'É hoje',
      workdays: 'Dias úteis', weeks: 'Semanas', totalDays: 'Total de dias',
      defaultLabel: 'Data-alvo',
      note: 'Diferença simples entre datas. Dias úteis contam de segunda a sexta e ignoram feriados.',
    },
  },
  ja: {
    title: '日数計算機',
    desc: 'ある日までの日数、ある日からの日数、そのあいだの平日数',
    short: 'カウントダウンと日数',
    intro: [
      {
        h: '初日を数えるかどうか',
        p: '初日を含めるかどうかは決めごとであって、事実ではありません。ここでは二つの日付の素直な差を出すので、締切が明日なら1と表示されます。契約や予告期間では初日を含めて数えることが多く、その場合ここより1日ずれます。どちらの数え方が当てはまるか先に確かめてください。',
      },
      {
        h: '平日から除くのは土日だけです',
        p: '平日の数は月曜から金曜までを数え、土曜と日曜を飛ばします。祝日は考慮していません。祝日は国ごとに、しばしば地域ごとに違うためで、祝日のある月では実際の平日数はここより少なくなります。',
      },
    ],
    faq: [
      { q: 'うるう年は考慮されますか。', a: 'されます。実際のカレンダー上の日付で計算するので、2月29日もうるう年の1日も自動的に入ります。' },
      { q: '思っていた数と1日ずれるのはなぜですか。', a: 'ほとんどの場合、初日を含めるかどうかの違いです。当日も数に入れたいなら結果に1を足してください。' },
      { q: '祝日は平日から除かれますか。', a: '除かれません。祝日は国と地域で違い、ひとつの道具でどこも間違えずに扱うことはできません。ご自分の祝日を引いてください。' },
    ],
    ui: {
      section: '対象の日', target: '日付', label: '何の日か (任意)', calc: '計算する',
      until: '日後', since: '日前', today: '今日です',
      workdays: '平日数', weeks: '週', totalDays: '日数の合計',
      defaultLabel: '対象の日',
      note: '日付どうしの素直な差です。平日は月〜金を数え、祝日は考慮していません。',
    },
  },
  de: {
    title: 'Tagerechner',
    desc: 'Tage bis zu einem Datum, Tage seither und die Werktage dazwischen',
    short: 'Countdown und Tage dazwischen',
    intro: [
      {
        h: 'Ab null oder ab eins zählen',
        p: 'Ob der erste Tag mitzählt, ist eine Festlegung und keine Tatsache. Dieses Werkzeug gibt die schlichte Differenz zweier Daten aus, eine Frist morgen erscheint also als 1. Verträge und Kündigungsfristen zählen häufig einschließlich und liegen dann einen Tag daneben — prüfen Sie, welche Zählweise gilt, bevor Sie sich auf eine verlassen.',
      },
      {
        h: 'Werktage schließen nur das Wochenende aus',
        p: 'Die Werktagszahl zählt Montag bis Freitag und überspringt Samstag und Sonntag. Von Feiertagen weiß sie nichts; die unterscheiden sich nach Land und oft nach Region, und in jedem Monat mit Feiertag ist die tatsächliche Zahl niedriger als hier angezeigt.',
      },
    ],
    faq: [
      { q: 'Werden Schaltjahre berücksichtigt?', a: 'Ja. Gerechnet wird mit echten Kalenderdaten, der 29. Februar und der zusätzliche Tag eines Schaltjahres fließen automatisch ein.' },
      { q: 'Warum weicht die Zahl um einen Tag von meiner Erwartung ab?', a: 'Fast immer wegen der einschließenden Zählung. Soll der Zieltag selbst mitgezählt werden, addieren Sie eins zum Ergebnis.' },
      { q: 'Sind Feiertage von den Werktagen abgezogen?', a: 'Nein. Feiertage unterscheiden sich nach Land und Region; ein einziges Werkzeug kann sie nicht überall richtig abbilden. Ziehen Sie Ihre selbst ab.' },
    ],
    ui: {
      section: 'Zieldatum', target: 'Datum', label: 'Worum geht es (optional)', calc: 'Berechnen',
      until: 'Tage bis', since: 'Tage her', today: 'Das ist heute',
      workdays: 'Werktage', weeks: 'Wochen', totalDays: 'Tage insgesamt',
      defaultLabel: 'Zieldatum',
      note: 'Schlichte Differenz zwischen Daten. Werktage zählen Mo–Fr und ignorieren Feiertage.',
    },
  },
  fr: {
    title: 'Compteur de jours',
    desc: 'Jours restants jusqu’à une date, jours écoulés depuis, et jours ouvrés entre les deux',
    short: 'Compte à rebours et jours entre deux dates',
    intro: [
      {
        h: 'Compter à partir de zéro ou de un',
        p: 'Que le premier jour compte ou non est une convention, pas un fait. Cet outil donne la différence simple entre deux dates : une échéance demain s’affiche donc comme 1. Contrats et préavis comptent souvent de façon inclusive et tombent un jour à côté — vérifiez quelle convention s’applique avant de vous fier à l’une ou à l’autre.',
      },
      {
        h: 'Les jours ouvrés n’excluent que le week-end',
        p: 'Le décompte des jours ouvrés va du lundi au vendredi et saute samedi et dimanche. Il ignore les jours fériés, qui changent selon le pays et souvent selon la région : dans tout mois comportant un férié, le nombre réel est inférieur à celui affiché.',
      },
    ],
    faq: [
      { q: 'Les années bissextiles sont-elles prises en compte ?', a: 'Oui. Le calcul porte sur de vraies dates du calendrier : le 29 février et le jour supplémentaire d’une année bissextile entrent automatiquement.' },
      { q: 'Pourquoi ai-je un jour d’écart avec ce que j’attendais ?', a: 'Presque toujours à cause du décompte inclusif. Si vous voulez inclure le jour cible lui-même, ajoutez un au résultat.' },
      { q: 'Les jours fériés sont-ils retirés des jours ouvrés ?', a: 'Non. Les fériés varient par pays et par région, et un outil unique ne peut pas les couvrir partout sans se tromper quelque part. Retirez les vôtres.' },
    ],
    ui: {
      section: 'Date cible', target: 'Date', label: 'De quoi s’agit-il (facultatif)', calc: 'Calculer',
      until: 'jours restants', since: 'jours écoulés', today: 'C’est aujourd’hui',
      workdays: 'Jours ouvrés', weeks: 'Semaines', totalDays: 'Jours au total',
      defaultLabel: 'Date cible',
      note: 'Différence simple entre dates. Les jours ouvrés comptent du lundi au vendredi et ignorent les fériés.',
    },
  },
  hi: {
    title: 'दिन गणक',
    desc: 'किसी तारीख़ तक कितने दिन, कितने दिन बीते, और बीच में कितने कार्यदिवस',
    short: 'उल्टी गिनती और दिनों का अंतर',
    intro: [
      {
        h: 'शून्य से गिनें या एक से',
        p: 'पहला दिन गिना जाए या नहीं, यह तय की गई रीत है, तथ्य नहीं। यह उपकरण दो तारीख़ों का सीधा अंतर देता है, इसलिए कल की समयसीमा 1 दिखेगी। अनुबंध और नोटिस अवधि अक्सर पहला दिन जोड़कर गिनते हैं और तब यह एक दिन अलग पड़ता है — भरोसा करने से पहले देख लें कि कौन-सी रीत लागू है।',
      },
      {
        h: 'कार्यदिवस से सिर्फ़ सप्ताहांत हटता है',
        p: 'कार्यदिवस की गिनती सोमवार से शुक्रवार तक चलती है और शनिवार-रविवार छोड़ देती है। इसे छुट्टियों का पता नहीं, क्योंकि वे देश और अक्सर क्षेत्र के हिसाब से बदलती हैं — इसलिए जिस महीने में छुट्टी हो, असली कार्यदिवस यहाँ दिखे से कम होंगे।',
      },
    ],
    faq: [
      { q: 'क्या यह लीप वर्ष संभालता है?', a: 'हाँ। गणना असली कैलेंडर तारीख़ों पर होती है, इसलिए 29 फ़रवरी और लीप वर्ष का अतिरिक्त दिन अपने आप शामिल हो जाते हैं।' },
      { q: 'अपेक्षा से एक दिन का फ़र्क़ क्यों आया?', a: 'लगभग हमेशा पहला दिन जोड़ने की रीत की वजह से। अगर आप लक्ष्य वाला दिन भी गिनना चाहते हैं, तो नतीजे में एक जोड़ लीजिए।' },
      { q: 'क्या छुट्टियाँ कार्यदिवसों से घटाई जाती हैं?', a: 'नहीं। छुट्टियाँ देश और क्षेत्र के हिसाब से बदलती हैं, और कोई एक उपकरण उन्हें हर जगह सही नहीं रख सकता। अपनी छुट्टियाँ ख़ुद घटा लें।' },
    ],
    ui: {
      section: 'लक्ष्य तारीख़', target: 'तारीख़', label: 'यह क्या है (वैकल्पिक)', calc: 'गणना करें',
      until: 'दिन बाक़ी', since: 'दिन बीते', today: 'वह आज ही है',
      workdays: 'कार्यदिवस', weeks: 'सप्ताह', totalDays: 'कुल दिन',
      defaultLabel: 'लक्ष्य तारीख़',
      note: 'तारीख़ों का सीधा अंतर। कार्यदिवस सोम–शुक्र गिने जाते हैं, छुट्टियाँ नहीं हटतीं।',
    },
  },
  'zh-hans': {
    title: '天数计算器',
    desc: '距某个日期还有多少天、已经过去多少天，以及其间有多少个工作日',
    short: '倒数与日期间隔',
    intro: [
      {
        h: '从零算还是从一算',
        p: '第一天算不算，是一种约定，不是事实。这个工具给的是两个日期之间的直接差值，所以明天到期的期限显示为 1。合同和通知期常常把首日也算进去，那样就和这里差一天——在依赖任何一种算法之前，先弄清适用哪一种。',
      },
      {
        h: '工作日只排除周末',
        p: '工作日的计数从周一到周五，跳过周六和周日。它不知道任何法定假日——假日因国家而异，往往还因地区而异——所以只要那个月有假日，实际工作日就比这里显示的少。',
      },
    ],
    faq: [
      { q: '会处理闰年吗？', a: '会。计算基于真实的日历日期，2 月 29 日和闰年多出的那一天都会自动算进去。' },
      { q: '为什么和我预期的差一天？', a: '几乎总是因为首日算不算的问题。如果你想把目标当天也算进去，结果加一即可。' },
      { q: '工作日里扣掉法定假日了吗？', a: '没有。假日因国家和地区而异，单个工具无法在所有地方都做对。请自己减去。' },
    ],
    ui: {
      section: '目标日期', target: '日期', label: '这是什么日子（可选）', calc: '计算',
      until: '天后', since: '天前', today: '就是今天',
      workdays: '工作日', weeks: '周', totalDays: '总天数',
      defaultLabel: '目标日期',
      note: '日期之间的直接差值。工作日按周一到周五计算，不扣除法定假日。',
    },
  },
  'zh-hant': {
    title: '天數計算機',
    desc: '距某個日期還有多少天、已經過去多少天，以及其間有多少個工作日',
    short: '倒數與日期間隔',
    intro: [
      {
        h: '從零算還是從一算',
        p: '第一天算不算，是一種約定，不是事實。這個工具給的是兩個日期之間的直接差值，所以明天到期的期限顯示為 1。合約和通知期常常把首日也算進去，那樣就和這裡差一天——在依賴任何一種算法之前，先弄清適用哪一種。',
      },
      {
        h: '工作日只排除週末',
        p: '工作日的計數從週一到週五，跳過週六和週日。它不知道任何國定假日——假日因國家而異，往往還因地區而異——所以只要那個月有假日，實際工作日就比這裡顯示的少。',
      },
    ],
    faq: [
      { q: '會處理閏年嗎？', a: '會。計算基於真實的日曆日期，2 月 29 日和閏年多出的那一天都會自動算進去。' },
      { q: '為什麼和我預期的差一天？', a: '幾乎總是因為首日算不算的問題。如果你想把目標當天也算進去，結果加一即可。' },
      { q: '工作日裡扣掉國定假日了嗎？', a: '沒有。假日因國家和地區而異，單個工具無法在所有地方都做對。請自己減去。' },
    ],
    ui: {
      section: '目標日期', target: '日期', label: '這是什麼日子（選填）', calc: '計算',
      until: '天後', since: '天前', today: '就是今天',
      workdays: '工作日', weeks: '週', totalDays: '總天數',
      defaultLabel: '目標日期',
      note: '日期之間的直接差值。工作日按週一到週五計算，不扣除國定假日。',
    },
  },
};

export const TIME_DIFF: CalcTable = {
  en: {
    title: 'Time difference calculator',
    desc: 'The gap between two moments, or a moment shifted forward or back',
    short: 'Difference · add · subtract',
    intro: [
      {
        h: 'Two directions, one arithmetic',
        p: 'Either you have two moments and want the gap, or you have one moment and an offset and want where it lands. The second is where mistakes hide: adding 90 minutes to 23:30 crosses midnight, and doing that in your head is how meetings get booked on the wrong day.',
      },
      {
        h: 'Everything here is local and offset-free',
        p: 'The calculation treats both moments as being in the same place, so it ignores time zones and daylight saving. A span that crosses a clock change in the real world is an hour longer or shorter than the figure shown.',
      },
    ],
    faq: [
      { q: 'Can I calculate across time zones?', a: 'Not here. Convert both moments to the same zone first, then use this. Crossing zones and a daylight-saving change at once is where most manual errors come from.' },
      { q: 'Does it handle a span running past midnight?', a: 'Yes. Both modes work on full date-and-time values, so crossing midnight, a month end or a year end is handled the same way as any other gap.' },
      { q: 'Why does the result show days as well as hours?', a: 'Because a long gap in hours alone is hard to read. 9,000 minutes means little; 6 days 6 hours means something.' },
    ],
    ui: {
      tabDiff: 'Between two moments', tabAdd: 'Add or subtract',
      from: 'From', to: 'To', base: 'Starting point',
      days: 'Days', hours: 'Hours', minutes: 'Minutes', direction: 'Direction',
      forward: 'Forward', back: 'Back', calc: 'Calculate',
      result: 'Result', gap: 'Time between', totalHours: 'Total hours', totalMinutes: 'Total minutes',
      d: 'd', h: 'h', m: 'min',
      note: 'Treats both moments as local. Time zones and daylight saving are not applied.',
    },
  },
  es: {
    title: 'Calculadora de diferencia horaria',
    desc: 'El intervalo entre dos momentos, o un momento desplazado hacia delante o hacia atrás',
    short: 'Diferencia · sumar · restar',
    intro: [
      {
        h: 'Dos direcciones, la misma aritmética',
        p: 'O tienes dos momentos y quieres el intervalo, o tienes un momento y un desplazamiento y quieres saber dónde cae. En lo segundo es donde se esconden los errores: sumar 90 minutos a las 23:30 cruza la medianoche, y hacerlo de cabeza es como se agendan reuniones el día equivocado.',
      },
      {
        h: 'Todo aquí es local y sin husos',
        p: 'El cálculo trata ambos momentos como si estuvieran en el mismo sitio, así que ignora husos horarios y horario de verano. Un intervalo que en el mundo real cruza un cambio de hora dura una hora más o menos que la cifra mostrada.',
      },
    ],
    faq: [
      { q: '¿Puedo calcular entre husos horarios distintos?', a: 'Aquí no. Convierte ambos momentos al mismo huso y luego usa esto. Cruzar husos y un cambio de hora a la vez es de donde salen la mayoría de los errores manuales.' },
      { q: '¿Contempla un intervalo que pasa de medianoche?', a: 'Sí. Ambos modos trabajan con valores completos de fecha y hora, así que cruzar la medianoche, un fin de mes o un fin de año se resuelve igual que cualquier otro intervalo.' },
      { q: '¿Por qué muestra días además de horas?', a: 'Porque un intervalo largo en horas se lee mal. 9.000 minutos no dicen nada; 6 días y 6 horas sí.' },
    ],
    ui: {
      tabDiff: 'Entre dos momentos', tabAdd: 'Sumar o restar',
      from: 'Desde', to: 'Hasta', base: 'Punto de partida',
      days: 'Días', hours: 'Horas', minutes: 'Minutos', direction: 'Sentido',
      forward: 'Hacia delante', back: 'Hacia atrás', calc: 'Calcular',
      result: 'Resultado', gap: 'Tiempo entre ambos', totalHours: 'Horas totales', totalMinutes: 'Minutos totales',
      d: 'd', h: 'h', m: 'min',
      note: 'Trata ambos momentos como locales. No aplica husos horarios ni horario de verano.',
    },
  },
  'pt-br': {
    title: 'Calculadora de diferença de horário',
    desc: 'O intervalo entre dois momentos, ou um momento deslocado para frente ou para trás',
    short: 'Diferença · somar · subtrair',
    intro: [
      {
        h: 'Dois sentidos, a mesma aritmética',
        p: 'Ou você tem dois momentos e quer o intervalo, ou tem um momento e um deslocamento e quer saber onde ele cai. É no segundo que os erros se escondem: somar 90 minutos às 23:30 atravessa a meia-noite, e fazer isso de cabeça é como reuniões vão parar no dia errado.',
      },
      {
        h: 'Tudo aqui é local, sem fuso',
        p: 'O cálculo trata os dois momentos como se estivessem no mesmo lugar, então ignora fusos horários e horário de verão. Um intervalo que no mundo real atravessa uma mudança de hora dura uma hora a mais ou a menos que o número mostrado.',
      },
    ],
    faq: [
      { q: 'Dá para calcular entre fusos diferentes?', a: 'Aqui não. Converta os dois momentos para o mesmo fuso e depois use isto. Atravessar fusos e uma mudança de horário ao mesmo tempo é de onde vem a maioria dos erros manuais.' },
      { q: 'Ele lida com intervalo que passa da meia-noite?', a: 'Sim. Os dois modos trabalham com valores completos de data e hora, então atravessar meia-noite, virada de mês ou de ano é tratado como qualquer outro intervalo.' },
      { q: 'Por que mostra dias além de horas?', a: 'Porque um intervalo longo só em horas é difícil de ler. 9.000 minutos não dizem nada; 6 dias e 6 horas dizem.' },
    ],
    ui: {
      tabDiff: 'Entre dois momentos', tabAdd: 'Somar ou subtrair',
      from: 'De', to: 'Até', base: 'Ponto de partida',
      days: 'Dias', hours: 'Horas', minutes: 'Minutos', direction: 'Sentido',
      forward: 'Para frente', back: 'Para trás', calc: 'Calcular',
      result: 'Resultado', gap: 'Tempo entre os dois', totalHours: 'Total de horas', totalMinutes: 'Total de minutos',
      d: 'd', h: 'h', m: 'min',
      note: 'Trata os dois momentos como locais. Não aplica fusos horários nem horário de verão.',
    },
  },
  ja: {
    title: '時間差の計算機',
    desc: '二つの時点のあいだ、あるいはある時点を前後にずらした結果',
    short: '差・加算・減算',
    intro: [
      {
        h: '向きは二つ、算数はひとつ',
        p: '二つの時点があって間隔を知りたいか、ひとつの時点とずらす量があって着地点を知りたいかのどちらかです。間違いが潜むのは後者です。23:30に90分足せば日付をまたぎますが、それを頭の中でやると会議が違う日に入ります。',
      },
      {
        h: 'ここでの時刻はすべて現地時間で、時差は入りません',
        p: '二つの時点は同じ場所にあるものとして計算するので、時差も夏時間も無視します。現実に時計の切り替えをまたぐ期間は、ここの数字より1時間長いか短くなります。',
      },
    ],
    faq: [
      { q: '時差のある地点どうしで計算できますか。', a: 'ここではできません。先に両方を同じ時間帯に直してから使ってください。時差と夏時間の切り替えが同時に絡むところが、手計算の誤りの大半です。' },
      { q: '日付をまたぐ期間も扱えますか。', a: '扱えます。どちらのモードも日付と時刻をまとめて扱うので、深夜も月末も年末もほかの間隔と同じように処理されます。' },
      { q: '時間だけでなく日数も出るのはなぜですか。', a: '長い間隔は時間だけだと読み取りにくいからです。9,000分では見当がつきませんが、6日6時間なら分かります。' },
    ],
    ui: {
      tabDiff: '二つの時点の差', tabAdd: '足す・引く',
      from: '開始', to: '終了', base: '基準の時点',
      days: '日', hours: '時間', minutes: '分', direction: '向き',
      forward: '後へ', back: '前へ', calc: '計算する',
      result: '結果', gap: '二つの間隔', totalHours: '合計時間', totalMinutes: '合計分',
      d: '日', h: '時間', m: '分',
      note: '両方とも現地時間として扱います。時差と夏時間は適用しません。',
    },
  },
  de: {
    title: 'Zeitdifferenz-Rechner',
    desc: 'Der Abstand zwischen zwei Zeitpunkten oder ein Zeitpunkt vor- und zurückverschoben',
    short: 'Differenz · addieren · subtrahieren',
    intro: [
      {
        h: 'Zwei Richtungen, eine Rechnung',
        p: 'Entweder hat man zwei Zeitpunkte und will den Abstand, oder man hat einen Zeitpunkt und eine Verschiebung und will wissen, wo man landet. Im zweiten Fall stecken die Fehler: 90 Minuten auf 23:30 addiert überschreitet Mitternacht — und wer das im Kopf macht, setzt Termine auf den falschen Tag.',
      },
      {
        h: 'Hier ist alles Ortszeit, ohne Zonen',
        p: 'Beide Zeitpunkte werden behandelt, als lägen sie am selben Ort; Zeitzonen und Sommerzeit bleiben außen vor. Eine Spanne, die in der Wirklichkeit über eine Zeitumstellung läuft, ist eine Stunde länger oder kürzer als der angezeigte Wert.',
      },
    ],
    faq: [
      { q: 'Kann ich über Zeitzonen hinweg rechnen?', a: 'Hier nicht. Rechnen Sie beide Zeitpunkte zuerst auf dieselbe Zone um und nutzen Sie dann dieses Werkzeug. Zonenwechsel und Sommerzeit gleichzeitig sind die Quelle der meisten Handfehler.' },
      { q: 'Funktioniert eine Spanne über Mitternacht?', a: 'Ja. Beide Modi arbeiten mit vollständigen Datums- und Zeitwerten; Mitternacht, Monatsende und Jahreswechsel werden wie jeder andere Abstand behandelt.' },
      { q: 'Warum werden neben Stunden auch Tage angezeigt?', a: 'Weil eine lange Spanne allein in Stunden schwer zu lesen ist. 9.000 Minuten sagen wenig; 6 Tage 6 Stunden sagen etwas.' },
    ],
    ui: {
      tabDiff: 'Zwischen zwei Zeitpunkten', tabAdd: 'Addieren oder subtrahieren',
      from: 'Von', to: 'Bis', base: 'Ausgangszeitpunkt',
      days: 'Tage', hours: 'Stunden', minutes: 'Minuten', direction: 'Richtung',
      forward: 'Vorwärts', back: 'Rückwärts', calc: 'Berechnen',
      result: 'Ergebnis', gap: 'Zeit dazwischen', totalHours: 'Stunden gesamt', totalMinutes: 'Minuten gesamt',
      d: 'T', h: 'Std', m: 'Min',
      note: 'Behandelt beide Zeitpunkte als Ortszeit. Zeitzonen und Sommerzeit werden nicht angewandt.',
    },
  },
  fr: {
    title: 'Calculateur d’écart de temps',
    desc: 'L’écart entre deux instants, ou un instant décalé vers l’avant ou l’arrière',
    short: 'Écart · ajouter · retrancher',
    intro: [
      {
        h: 'Deux sens, une seule arithmétique',
        p: 'Soit vous avez deux instants et voulez l’écart, soit vous avez un instant et un décalage et voulez savoir où cela tombe. C’est dans le second cas que les erreurs se cachent : ajouter 90 minutes à 23 h 30 franchit minuit, et le faire de tête est ainsi qu’on cale des réunions le mauvais jour.',
      },
      {
        h: 'Tout est en heure locale, sans fuseaux',
        p: 'Le calcul traite les deux instants comme s’ils étaient au même endroit : fuseaux horaires et heure d’été sont ignorés. Une durée qui, dans la réalité, franchit un changement d’heure dure une heure de plus ou de moins que le chiffre affiché.',
      },
    ],
    faq: [
      { q: 'Puis-je calculer entre deux fuseaux ?', a: 'Pas ici. Ramenez d’abord les deux instants au même fuseau, puis utilisez cet outil. Croiser fuseaux et changement d’heure en même temps est la source de la plupart des erreurs à la main.' },
      { q: 'Gère-t-il une durée qui passe minuit ?', a: 'Oui. Les deux modes travaillent sur des valeurs complètes de date et d’heure : minuit, fin de mois ou fin d’année se traitent comme n’importe quel autre écart.' },
      { q: 'Pourquoi afficher des jours en plus des heures ?', a: 'Parce qu’un long écart en heures seules se lit mal. 9 000 minutes ne parlent pas ; 6 jours 6 heures, si.' },
    ],
    ui: {
      tabDiff: 'Entre deux instants', tabAdd: 'Ajouter ou retrancher',
      from: 'De', to: 'À', base: 'Point de départ',
      days: 'Jours', hours: 'Heures', minutes: 'Minutes', direction: 'Sens',
      forward: 'Vers l’avant', back: 'Vers l’arrière', calc: 'Calculer',
      result: 'Résultat', gap: 'Temps écoulé', totalHours: 'Heures au total', totalMinutes: 'Minutes au total',
      d: 'j', h: 'h', m: 'min',
      note: 'Traite les deux instants comme locaux. Ni fuseaux horaires ni heure d’été ne sont appliqués.',
    },
  },
  hi: {
    title: 'समय अंतर कैलकुलेटर',
    desc: 'दो क्षणों के बीच का अंतर, या किसी क्षण को आगे-पीछे खिसकाने पर मिलने वाला समय',
    short: 'अंतर · जोड़ · घटाव',
    intro: [
      {
        h: 'दो दिशाएँ, एक ही गणित',
        p: 'या तो आपके पास दो क्षण हैं और आप अंतर जानना चाहते हैं, या एक क्षण और एक खिसकाव है और आप जानना चाहते हैं कि वह कहाँ पहुँचता है। ग़लतियाँ दूसरे में छिपती हैं: 23:30 में 90 मिनट जोड़ने पर आधी रात पार हो जाती है, और यही सिर में करने पर बैठकें ग़लत दिन पर लग जाती हैं।',
      },
      {
        h: 'यहाँ सब कुछ स्थानीय समय है, कोई समय-क्षेत्र नहीं',
        p: 'गणना दोनों क्षणों को एक ही जगह का मानती है, इसलिए समय-क्षेत्र और डेलाइट सेविंग को छोड़ देती है। असल दुनिया में जो अवधि घड़ी बदलने के पार जाती है, वह दिखाए गए आंकड़े से एक घंटा लंबी या छोटी होती है।',
      },
    ],
    faq: [
      { q: 'क्या मैं अलग-अलग समय-क्षेत्रों के बीच गणना कर सकता हूँ?', a: 'यहाँ नहीं। पहले दोनों क्षणों को एक ही समय-क्षेत्र में बदल लीजिए, फिर इसका इस्तेमाल कीजिए। समय-क्षेत्र और घड़ी बदलना एक साथ आना ही हाथ से की गई ज़्यादातर ग़लतियों की जड़ है।' },
      { q: 'क्या आधी रात पार करने वाली अवधि संभलती है?', a: 'हाँ। दोनों विकल्प पूरी तारीख़-और-समय पर काम करते हैं, इसलिए आधी रात, महीने का अंत या साल का अंत पार करना बाक़ी किसी अंतर जैसा ही संभलता है।' },
      { q: 'घंटों के साथ दिन भी क्यों दिखते हैं?', a: 'क्योंकि लंबी अवधि सिर्फ़ घंटों में पढ़ना कठिन है। 9,000 मिनट से कुछ पता नहीं चलता; 6 दिन 6 घंटे से चलता है।' },
    ],
    ui: {
      tabDiff: 'दो क्षणों के बीच', tabAdd: 'जोड़ें या घटाएँ',
      from: 'से', to: 'तक', base: 'शुरुआती क्षण',
      days: 'दिन', hours: 'घंटे', minutes: 'मिनट', direction: 'दिशा',
      forward: 'आगे', back: 'पीछे', calc: 'गणना करें',
      result: 'परिणाम', gap: 'बीच का समय', totalHours: 'कुल घंटे', totalMinutes: 'कुल मिनट',
      d: 'दि', h: 'घं', m: 'मि',
      note: 'दोनों क्षणों को स्थानीय मानता है। समय-क्षेत्र और डेलाइट सेविंग लागू नहीं होते।',
    },
  },
  'zh-hans': {
    title: '时间差计算器',
    desc: '两个时刻之间的间隔，或者把一个时刻往前往后挪',
    short: '求差 · 加 · 减',
    intro: [
      {
        h: '两个方向，一套算术',
        p: '要么你有两个时刻、想知道间隔，要么你有一个时刻和一段偏移、想知道落在哪里。错误藏在后者：23:30 加 90 分钟会跨过午夜，而在脑子里算这个，正是会议被排到错误日期的原因。',
      },
      {
        h: '这里全按本地时间算，不涉及时区',
        p: '计算把两个时刻当成同一个地方的，因此忽略时区和夏令时。现实中跨越了调表的那段时间，会比这里显示的多一小时或少一小时。',
      },
    ],
    faq: [
      { q: '能跨时区计算吗？', a: '这里不能。先把两个时刻换算到同一个时区，再用这个工具。同时跨时区又碰上调表，是手算出错最集中的地方。' },
      { q: '跨午夜的时间段能处理吗？', a: '能。两种模式都基于完整的日期加时间，所以跨午夜、跨月底、跨年底和其他间隔一样处理。' },
      { q: '为什么除了小时还显示天数？', a: '因为很长的间隔只用小时看不出来。9,000 分钟说明不了什么；6 天 6 小时就说明了。' },
    ],
    ui: {
      tabDiff: '两个时刻之间', tabAdd: '加上或减去',
      from: '从', to: '到', base: '起点时刻',
      days: '天', hours: '小时', minutes: '分钟', direction: '方向',
      forward: '往后', back: '往前', calc: '计算',
      result: '结果', gap: '两者相隔', totalHours: '总小时', totalMinutes: '总分钟',
      d: '天', h: '小时', m: '分',
      note: '把两个时刻都当作本地时间。不套用时区和夏令时。',
    },
  },
  'zh-hant': {
    title: '時間差計算機',
    desc: '兩個時刻之間的間隔，或者把一個時刻往前往後挪',
    short: '求差 · 加 · 減',
    intro: [
      {
        h: '兩個方向，一套算術',
        p: '要麼你有兩個時刻、想知道間隔，要麼你有一個時刻和一段偏移、想知道落在哪裡。錯誤藏在後者：23:30 加 90 分鐘會跨過午夜，而在腦子裡算這個，正是會議被排到錯誤日期的原因。',
      },
      {
        h: '這裡全按本地時間算，不涉及時區',
        p: '計算把兩個時刻當成同一個地方的，因此忽略時區和日光節約時間。現實中跨越了調錶的那段時間，會比這裡顯示的多一小時或少一小時。',
      },
    ],
    faq: [
      { q: '能跨時區計算嗎？', a: '這裡不能。先把兩個時刻換算到同一個時區，再用這個工具。同時跨時區又碰上調錶，是手算出錯最集中的地方。' },
      { q: '跨午夜的時間段能處理嗎？', a: '能。兩種模式都基於完整的日期加時間，所以跨午夜、跨月底、跨年底和其他間隔一樣處理。' },
      { q: '為什麼除了小時還顯示天數？', a: '因為很長的間隔只用小時看不出來。9,000 分鐘說明不了什麼；6 天 6 小時就說明了。' },
    ],
    ui: {
      tabDiff: '兩個時刻之間', tabAdd: '加上或減去',
      from: '從', to: '到', base: '起點時刻',
      days: '天', hours: '小時', minutes: '分鐘', direction: '方向',
      forward: '往後', back: '往前', calc: '計算',
      result: '結果', gap: '兩者相隔', totalHours: '總小時', totalMinutes: '總分鐘',
      d: '天', h: '小時', m: '分',
      note: '把兩個時刻都當作本地時間。不套用時區和日光節約時間。',
    },
  },
};
