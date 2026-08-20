import type { CalcTable } from './types.ts';

/**
 * 나이·할인의 아홉 언어 문구.
 *
 * 한국어판을 옮긴 것이 아니다. 나이 계산기의 한국어판은 만 나이·세는 나이·연
 * 나이 셋을 나란히 내는데, 그 셋은 한국 밖에서 뜻이 없다. 밖에서 «age
 * calculator»를 치는 사람이 막히는 자리는 2월 29일생과 «몇 년 몇 개월 며칠»
 * 이라, 본문과 FAQ를 그쪽으로 다시 썼다.
 *
 * 할인 쪽은 계산이 어디서나 같지만, 한국어판에 없는 **연속 할인**을 얹었다 —
 * «30% 뒤에 쿠폰 20%»를 50%로 더해 버리는 것이 실제로 사람들이 틀리는 자리다.
 * 통화 기호는 어느 언어에도 안 넣는다(lib/global-calc.ts 머리말).
 *
 * 윤일 생일의 법 관행은 나라마다 갈린다 — 영미법권은 2월 28일, 뉴질랜드와
 * 대만은 3월 1일이다. 화면은 2월 28일로 세고 그 사실을 각 언어에서 밝힌다.
 */

export const AGE: CalcTable = {
  en: {
    title: 'Age calculator',
    desc: 'Your exact age in years, months and days between any two dates, leap-day birthdays included',
    short: 'Exact age between two dates',
    intro: [
      { h: 'Age is completed years, not the gap between two years', p: 'Someone born in 1990 is not automatically 36 in 2026. Until the birthday comes round they are still 35, because age counts the years you have finished, not the ones you have started. That one rule is behind almost every off-by-one on a form. The second date here is not fixed to today either — put in the day that matters, an exam, a policy start, a flight, and you get the age you will be on that day.' },
      { h: 'Months are not thirty days', p: 'Three months from 30 November is 28 February, which is 90 days. Three months from 30 April is 30 July, which is 91. Dividing days by 30 drifts by several days a year, so the months and days here are counted by walking the calendar one month at a time and measuring what is left over. Month ends behave the way a calendar does: 31 January plus one month lands on 28 February, not 3 March.' },
      { h: 'Born on 29 February', p: 'A leap-day birthday exists once every four years, so three years out of four the calendar has to pick a stand-in. The common-law tradition treats the day before the anniversary as the moment the year is completed, which puts the birthday on 28 February. A few places, New Zealand and Taiwan among them, use 1 March instead. This page counts 28 February and says so on the result, because the choice changes your age for exactly one day a year.' },
    ],
    faq: [
      { q: 'Why does it say 35 when I was born in 1990 and it is 2026?', a: 'Because your birthday has not come round yet this year. Subtracting the years gives the age you will reach during the year, not the age you are now. Move the second date past your birthday and it becomes 36.' },
      { q: 'How old is someone born on 29 February in a common year?', a: 'They complete the year on 28 February under the rule used here and across most common-law jurisdictions, so from that day they count as one year older. New Zealand and Taiwan set the date at 1 March instead. Either way the disagreement lasts a single day.' },
      { q: 'Can I work out my age on a future date?', a: 'Yes. The second field takes any date, past or future. Enter the day of the application, the exam or the renewal and you get the age that will be written on the form.' },
      { q: 'Do the total days include leap days?', a: 'Yes. The day count is real calendar days between the two dates, so every 29 February you have lived through is in it. That is why the number is never simply years times 365.' },
    ],
    ui: {
      section: 'Dates', birth: 'Date of birth', on: 'Age at date', calc: 'Calculate age',
      exact: 'Exact age', moUnit: 'mo', dUnit: 'd',
      totMonths: 'Total months', totWeeks: 'Total weeks', totDays: 'Days lived', totHours: 'Hours lived',
      nextBirthday: 'Next birthday', daysUnit: 'days', turns: 'turns', bornOn: 'Born on a',
      leapNote: 'Born on 29 February — in common years this page completes the year on 28 February.',
      note: 'The second date is free. Set it to any day to get the age on that day.',
    },
  },
  es: {
    title: 'Calculadora de edad',
    desc: 'Tu edad exacta en años, meses y días entre dos fechas cualesquiera, con los nacidos el 29 de febrero',
    short: 'Edad exacta entre dos fechas',
    intro: [
      { h: 'La edad son años cumplidos, no la resta de dos años', p: 'Quien nació en 1990 no tiene 36 automáticamente en 2026. Hasta que llegue el cumpleaños sigue teniendo 35, porque la edad cuenta los años terminados, no los empezados. Esa única regla está detrás de casi todos los errores de un año en un formulario. La segunda fecha tampoco está fijada a hoy: pon el día que importa —un examen, el alta de una póliza, un vuelo— y obtienes la edad que tendrás ese día.' },
      { h: 'Los meses no son de treinta días', p: 'Tres meses desde el 30 de noviembre llevan al 28 de febrero, que son 90 días. Tres meses desde el 30 de abril llevan al 30 de julio, que son 91. Dividir los días entre 30 se desvía varios días al año, así que aquí los meses y los días se cuentan recorriendo el calendario mes a mes y midiendo lo que sobra. Los finales de mes se comportan como en el calendario: 31 de enero más un mes cae en el 28 de febrero, no en el 3 de marzo.' },
      { h: 'Nacer un 29 de febrero', p: 'Ese cumpleaños existe una vez cada cuatro años, así que tres de cada cuatro el calendario tiene que elegir sustituto. La tradición del derecho anglosajón considera que el año se completa el día anterior al aniversario, lo que sitúa el cumpleaños el 28 de febrero. Unos pocos países, Nueva Zelanda y Taiwán entre ellos, usan el 1 de marzo. Esta página cuenta el 28 de febrero y lo indica en el resultado, porque la elección cambia tu edad durante exactamente un día al año.' },
    ],
    faq: [
      { q: '¿Por qué pone 35 si nací en 1990 y estamos en 2026?', a: 'Porque tu cumpleaños todavía no ha llegado este año. Restar los años da la edad que cumplirás a lo largo del año, no la que tienes ahora. Mueve la segunda fecha más allá de tu cumpleaños y pasa a 36.' },
      { q: '¿Qué edad tiene quien nació el 29 de febrero en un año común?', a: 'Completa el año el 28 de febrero según la regla que se usa aquí y en la mayoría de los sistemas de derecho anglosajón, así que desde ese día cuenta un año más. Nueva Zelanda y Taiwán fijan la fecha en el 1 de marzo. En cualquier caso la discrepancia dura un solo día.' },
      { q: '¿Puedo calcular mi edad en una fecha futura?', a: 'Sí. El segundo campo acepta cualquier fecha, pasada o futura. Introduce el día de la solicitud, del examen o de la renovación y obtienes la edad que constará en el formulario.' },
      { q: '¿Los días totales incluyen los días bisiestos?', a: 'Sí. El recuento son días naturales reales entre las dos fechas, así que están todos los 29 de febrero que has vivido. Por eso el número nunca es simplemente los años por 365.' },
    ],
    ui: {
      section: 'Fechas', birth: 'Fecha de nacimiento', on: 'Edad en la fecha', calc: 'Calcular edad',
      exact: 'Edad exacta', moUnit: 'mes', dUnit: 'd',
      totMonths: 'Meses en total', totWeeks: 'Semanas en total', totDays: 'Días vividos', totHours: 'Horas vividas',
      nextBirthday: 'Próximo cumpleaños', daysUnit: 'días', turns: 'cumple', bornOn: 'Naciste un',
      leapNote: 'Naciste un 29 de febrero: en los años comunes esta página completa el año el 28 de febrero.',
      note: 'La segunda fecha es libre. Ponla en cualquier día para obtener la edad en ese día.',
    },
  },
  'pt-br': {
    title: 'Calculadora de idade',
    desc: 'Sua idade exata em anos, meses e dias entre duas datas quaisquer, inclusive para quem nasceu em 29 de fevereiro',
    short: 'Idade exata entre duas datas',
    intro: [
      { h: 'Idade são anos completos, não a subtração de dois anos', p: 'Quem nasceu em 1990 não tem 36 automaticamente em 2026. Até o aniversário chegar continua com 35, porque a idade conta os anos terminados, não os começados. Essa única regra está por trás de quase todo erro de um ano em formulário. A segunda data também não está presa a hoje: coloque o dia que importa — uma prova, o início de uma apólice, um voo — e você recebe a idade que terá naquele dia.' },
      { h: 'Meses não têm trinta dias', p: 'Três meses a partir de 30 de novembro chegam a 28 de fevereiro, que são 90 dias. Três meses a partir de 30 de abril chegam a 30 de julho, que são 91. Dividir os dias por 30 desvia vários dias por ano, então aqui os meses e os dias são contados percorrendo o calendário mês a mês e medindo o que sobra. As viradas de mês se comportam como no calendário: 31 de janeiro mais um mês cai em 28 de fevereiro, não em 3 de março.' },
      { h: 'Nascer em 29 de fevereiro', p: 'Esse aniversário existe uma vez a cada quatro anos, então em três de cada quatro o calendário precisa escolher um substituto. A tradição da common law entende que o ano se completa no dia anterior ao aniversário, o que coloca a data em 28 de fevereiro. Alguns países, entre eles Nova Zelândia e Taiwan, usam 1º de março. Esta página conta 28 de fevereiro e avisa isso no resultado, porque a escolha muda sua idade por exatamente um dia ao ano.' },
    ],
    faq: [
      { q: 'Por que aparece 35 se nasci em 1990 e estamos em 2026?', a: 'Porque seu aniversário ainda não chegou neste ano. Subtrair os anos dá a idade que você fará ao longo do ano, não a que tem agora. Mova a segunda data para depois do seu aniversário e vira 36.' },
      { q: 'Que idade tem quem nasceu em 29 de fevereiro num ano comum?', a: 'Completa o ano em 28 de fevereiro pela regra usada aqui e na maioria dos sistemas de common law, então a partir desse dia conta um ano a mais. Nova Zelândia e Taiwan fixam a data em 1º de março. De um jeito ou de outro a divergência dura um único dia.' },
      { q: 'Dá para calcular minha idade numa data futura?', a: 'Sim. O segundo campo aceita qualquer data, passada ou futura. Informe o dia da inscrição, da prova ou da renovação e você recebe a idade que vai constar no formulário.' },
      { q: 'O total de dias inclui os dias bissextos?', a: 'Inclui. A contagem são dias de calendário reais entre as duas datas, então todo 29 de fevereiro que você viveu está ali. Por isso o número nunca é simplesmente anos vezes 365.' },
    ],
    ui: {
      section: 'Datas', birth: 'Data de nascimento', on: 'Idade na data', calc: 'Calcular idade',
      exact: 'Idade exata', moUnit: 'mês', dUnit: 'd',
      totMonths: 'Meses no total', totWeeks: 'Semanas no total', totDays: 'Dias vividos', totHours: 'Horas vividas',
      nextBirthday: 'Próximo aniversário', daysUnit: 'dias', turns: 'faz', bornOn: 'Você nasceu num',
      leapNote: 'Nascimento em 29 de fevereiro: em anos comuns esta página completa o ano em 28 de fevereiro.',
      note: 'A segunda data é livre. Coloque qualquer dia para obter a idade naquele dia.',
    },
  },
  ja: {
    title: '年齢計算機',
    desc: '二つの日付から満年齢を年・月・日で出します。2月29日生まれにも対応します',
    short: '二つの日付から満年齢',
    intro: [
      { h: '年齢は「終えた年」の数で、引き算ではない', p: '1990年生まれの人が2026年に自動で36歳になるわけではありません。誕生日が来るまではまだ35歳です。年齢は終えた年を数えるもので、始めた年ではないからです。書類の一歳ずれはほとんどこの一点から生まれます。二つめの日付は今日に固定されていません。試験の日、契約の開始日、搭乗日など「効いてくる日」を入れれば、その日の年齢が出ます。' },
      { h: '一か月は三十日ではない', p: '11月30日から三か月は2月28日で、90日です。4月30日から三か月は7月30日で、91日あります。日数を30で割ると年に数日ずれていくので、ここでは暦を一か月ずつたどり、残りを日数で数えています。月末の扱いも暦どおりです — 1月31日の一か月後は2月28日であって、3月3日ではありません。' },
      { h: '2月29日生まれ', p: 'この誕生日は四年に一度しか来ないので、四年のうち三年は暦が代わりの日を決めなければなりません。英米法の流れでは記念日の前日に一年を満了すると考え、誕生日は2月28日になります。ニュージーランドや台湾のように3月1日とする地域もあります。なお日本の年齢計算に関する法律では誕生日の前日の終了に年をとるため、2月28日の扱いと結果が一致します。このページは2月28日で数え、結果にその旨を出します。' },
    ],
    faq: [
      { q: '1990年生まれで今が2026年なのに、なぜ35歳と出るのですか', a: '今年の誕生日がまだ来ていないからです。年を引き算すると「その年のうちに迎える年齢」が出るだけで、今の年齢ではありません。二つめの日付を誕生日より後にすれば36歳になります。' },
      { q: '2月29日生まれの人は平年に何歳ですか', a: 'ここで使う規則では2月28日に一年を満了するので、その日から一つ上に数えます。日本の年齢計算の考え方（誕生日の前日の終了に加齢）とも一致します。ニュージーランドや台湾は3月1日を採っています。いずれにせよ食い違うのは一日だけです。' },
      { q: '未来の日付での年齢も出せますか', a: '出せます。二つめの欄は過去でも未来でも受け付けます。申請日、試験日、更新日を入れれば、その書類に書く年齢がそのまま出ます。' },
      { q: '総日数にうるう日は入っていますか', a: '入っています。二つの日付のあいだの実際の暦日を数えているので、これまで通った2月29日はすべて含まれます。年数×365にならないのはそのためです。' },
    ],
    ui: {
      section: '日付', birth: '生年月日', on: '基準日', calc: '年齢を計算',
      exact: '満年齢', moUnit: 'か月', dUnit: '日',
      totMonths: '通算月数', totWeeks: '通算週数', totDays: '生きた日数', totHours: '生きた時間',
      nextBirthday: '次の誕生日', daysUnit: '日', turns: '迎える年齢', bornOn: '生まれた曜日',
      leapNote: '2月29日生まれです。平年はこのページも2月28日に一年を満了として数えます。',
      note: '基準日は自由です。任意の日を入れれば、その日の年齢が出ます。',
    },
  },
  de: {
    title: 'Altersrechner',
    desc: 'Ihr genaues Alter in Jahren, Monaten und Tagen zwischen zwei beliebigen Daten, auch für den 29. Februar',
    short: 'Genaues Alter zwischen zwei Daten',
    intro: [
      { h: 'Alter sind vollendete Jahre, nicht die Differenz zweier Jahreszahlen', p: 'Wer 1990 geboren ist, wird 2026 nicht automatisch 36. Bis der Geburtstag kommt, sind es weiterhin 35, denn gezählt werden die abgeschlossenen Jahre, nicht die begonnenen. Diese eine Regel steckt hinter fast jedem Ein-Jahr-Fehler auf Formularen. Das zweite Datum ist auch nicht auf heute festgelegt: Tragen Sie den Tag ein, auf den es ankommt — Prüfung, Versicherungsbeginn, Abflug — und Sie bekommen das Alter an genau diesem Tag.' },
      { h: 'Monate haben keine dreißig Tage', p: 'Drei Monate ab dem 30. November enden am 28. Februar, das sind 90 Tage. Drei Monate ab dem 30. April enden am 30. Juli, das sind 91. Tage durch 30 zu teilen weicht im Jahr um mehrere Tage ab, deshalb werden Monate und Tage hier Monat für Monat am Kalender abgelaufen und der Rest in Tagen gemessen. Monatsenden verhalten sich wie im Kalender: der 31. Januar plus ein Monat ist der 28. Februar, nicht der 3. März.' },
      { h: 'Am 29. Februar geboren', p: 'Diesen Geburtstag gibt es nur alle vier Jahre, in drei von vier Jahren muss der Kalender also einen Ersatztag wählen. Die angelsächsische Rechtstradition sieht das Jahr am Tag vor dem Jahrestag als vollendet an, der Geburtstag fällt damit auf den 28. Februar. Einige Länder, darunter Neuseeland und Taiwan, nehmen stattdessen den 1. März. Diese Seite rechnet mit dem 28. Februar und weist im Ergebnis darauf hin, denn die Wahl verändert Ihr Alter an genau einem Tag im Jahr.' },
    ],
    faq: [
      { q: 'Warum steht da 35, wenn ich 1990 geboren bin und wir 2026 haben?', a: 'Weil Ihr Geburtstag dieses Jahr noch aussteht. Die Differenz der Jahreszahlen ergibt das Alter, das Sie im Lauf des Jahres erreichen, nicht das jetzige. Schieben Sie das zweite Datum hinter Ihren Geburtstag, dann steht dort 36.' },
      { q: 'Wie alt ist jemand mit Geburtstag am 29. Februar in einem Gemeinjahr?', a: 'Nach der hier und in den meisten angelsächsischen Rechtsordnungen verwendeten Regel ist das Jahr am 28. Februar vollendet, ab diesem Tag zählt also ein Jahr mehr. Neuseeland und Taiwan legen den 1. März fest. So oder so dauert die Abweichung genau einen Tag.' },
      { q: 'Kann ich mein Alter zu einem künftigen Datum bestimmen?', a: 'Ja. Das zweite Feld nimmt jedes Datum an, vergangen wie künftig. Tragen Sie den Tag des Antrags, der Prüfung oder der Verlängerung ein, und Sie erhalten das Alter, das im Formular stehen wird.' },
      { q: 'Sind Schalttage in den Gesamttagen enthalten?', a: 'Ja. Gezählt werden echte Kalendertage zwischen beiden Daten, jeder durchlebte 29. Februar ist also dabei. Deshalb ist die Zahl nie einfach Jahre mal 365.' },
    ],
    ui: {
      section: 'Daten', birth: 'Geburtsdatum', on: 'Alter am Stichtag', calc: 'Alter berechnen',
      exact: 'Genaues Alter', moUnit: 'Mon.', dUnit: 'T',
      totMonths: 'Monate insgesamt', totWeeks: 'Wochen insgesamt', totDays: 'Gelebte Tage', totHours: 'Gelebte Stunden',
      nextBirthday: 'Nächster Geburtstag', daysUnit: 'Tage', turns: 'wird', bornOn: 'Geboren an einem',
      leapNote: 'Am 29. Februar geboren — in Gemeinjahren ist das Jahr auf dieser Seite am 28. Februar vollendet.',
      note: 'Der Stichtag ist frei wählbar. Setzen Sie ihn auf einen beliebigen Tag für das Alter an diesem Tag.',
    },
  },
  fr: {
    title: 'Calculateur d’âge',
    desc: 'Votre âge exact en années, mois et jours entre deux dates, y compris pour les naissances du 29 février',
    short: 'Âge exact entre deux dates',
    intro: [
      { h: 'L’âge, ce sont les années révolues, pas la soustraction de deux millésimes', p: 'Une personne née en 1990 n’a pas automatiquement 36 ans en 2026. Tant que l’anniversaire n’est pas passé, elle en a encore 35, parce que l’âge compte les années terminées et non celles commencées. Cette seule règle explique presque toutes les erreurs d’un an sur un formulaire. La seconde date n’est pas figée à aujourd’hui : mettez le jour qui compte — un examen, la prise d’effet d’un contrat, un vol — et vous obtenez l’âge que vous aurez ce jour-là.' },
      { h: 'Un mois ne fait pas trente jours', p: 'Trois mois après le 30 novembre, on est au 28 février, soit 90 jours. Trois mois après le 30 avril, on est au 30 juillet, soit 91. Diviser les jours par 30 dérive de plusieurs jours par an, donc les mois et les jours sont ici comptés en parcourant le calendrier mois après mois et en mesurant le reste. Les fins de mois se comportent comme sur un calendrier : 31 janvier plus un mois tombe au 28 février, pas au 3 mars.' },
      { h: 'Né un 29 février', p: 'Cet anniversaire n’existe qu’une année sur quatre : trois fois sur quatre, le calendrier doit choisir un jour de remplacement. La tradition de common law considère que l’année s’achève la veille de la date anniversaire, ce qui place l’anniversaire au 28 février. Quelques pays, dont la Nouvelle-Zélande et Taïwan, retiennent le 1er mars. Cette page compte au 28 février et le signale dans le résultat, car ce choix change votre âge pendant exactement un jour par an.' },
    ],
    faq: [
      { q: 'Pourquoi affiche-t-il 35 alors que je suis né en 1990 et que nous sommes en 2026 ?', a: 'Parce que votre anniversaire n’est pas encore passé cette année. Soustraire les millésimes donne l’âge que vous atteindrez dans l’année, pas celui que vous avez. Déplacez la seconde date après votre anniversaire et elle passe à 36.' },
      { q: 'Quel âge a une personne née le 29 février lors d’une année commune ?', a: 'Selon la règle utilisée ici et dans la plupart des systèmes de common law, l’année est révolue le 28 février : à partir de ce jour elle compte une année de plus. La Nouvelle-Zélande et Taïwan fixent la date au 1er mars. Dans les deux cas, le désaccord ne dure qu’un jour.' },
      { q: 'Puis-je calculer mon âge à une date future ?', a: 'Oui. Le second champ accepte n’importe quelle date, passée ou future. Saisissez le jour du dossier, de l’examen ou du renouvellement et vous obtenez l’âge qui figurera sur le formulaire.' },
      { q: 'Le total de jours compte-t-il les jours bissextiles ?', a: 'Oui. Ce sont de vrais jours de calendrier entre les deux dates : tous les 29 février que vous avez vécus y sont. C’est pourquoi le nombre n’est jamais simplement les années multipliées par 365.' },
    ],
    ui: {
      section: 'Dates', birth: 'Date de naissance', on: 'Âge à la date', calc: 'Calculer l’âge',
      exact: 'Âge exact', moUnit: 'mois', dUnit: 'j',
      totMonths: 'Mois au total', totWeeks: 'Semaines au total', totDays: 'Jours vécus', totHours: 'Heures vécues',
      nextBirthday: 'Prochain anniversaire', daysUnit: 'jours', turns: 'aura', bornOn: 'Né un',
      leapNote: 'Naissance un 29 février — les années communes, cette page achève l’année au 28 février.',
      note: 'La seconde date est libre. Mettez-y n’importe quel jour pour obtenir l’âge à cette date.',
    },
  },
  hi: {
    title: 'आयु कैलकुलेटर',
    desc: 'दो तारीख़ों के बीच आपकी सटीक आयु — वर्ष, महीने और दिन में, 29 फ़रवरी के जन्म सहित',
    short: 'दो तारीख़ों के बीच सटीक आयु',
    intro: [
      { h: 'आयु पूरे हुए वर्ष हैं, दो सनों का घटाव नहीं', p: '1990 में जन्मा व्यक्ति 2026 में अपने आप 36 का नहीं हो जाता। जन्मदिन आने तक वह 35 का ही है, क्योंकि आयु उन वर्षों को गिनती है जो पूरे हो चुके, उन्हें नहीं जो शुरू हुए हैं। फ़ॉर्म पर एक साल की लगभग हर ग़लती इसी एक नियम से आती है। दूसरी तारीख़ आज पर बँधी नहीं है — परीक्षा का दिन, पॉलिसी शुरू होने का दिन, उड़ान का दिन डालिए और उसी दिन की आयु मिल जाएगी।' },
      { h: 'महीना तीस दिन का नहीं होता', p: '30 नवंबर से तीन महीने 28 फ़रवरी पर पहुँचते हैं, यानी 90 दिन। 30 अप्रैल से तीन महीने 30 जुलाई पर पहुँचते हैं, यानी 91 दिन। दिनों को 30 से बाँटने पर साल भर में कई दिन का अंतर आ जाता है, इसलिए यहाँ महीने और दिन कैलेंडर पर एक-एक महीना चलकर गिने जाते हैं और बचा हुआ हिस्सा दिनों में नापा जाता है। महीने के अंत भी कैलेंडर जैसे ही चलते हैं — 31 जनवरी में एक महीना जोड़ने पर 28 फ़रवरी आता है, 3 मार्च नहीं।' },
      { h: '29 फ़रवरी को जन्म', p: 'यह जन्मदिन चार साल में एक बार आता है, तो चार में से तीन साल कैलेंडर को कोई और दिन चुनना पड़ता है। कॉमन लॉ की परंपरा वर्षगाँठ से एक दिन पहले वर्ष पूरा हुआ मानती है, जिससे जन्मदिन 28 फ़रवरी पर आ जाता है। न्यूज़ीलैंड और ताइवान जैसे कुछ देश इसके बजाय 1 मार्च लेते हैं। यह पृष्ठ 28 फ़रवरी से गिनता है और परिणाम में यह बात लिख देता है, क्योंकि इस चुनाव से साल में ठीक एक दिन आपकी आयु बदल जाती है।' },
    ],
    faq: [
      { q: 'जन्म 1990 का है और साल 2026 है, फिर 35 क्यों दिख रहा है?', a: 'क्योंकि इस साल आपका जन्मदिन अभी नहीं आया। सन घटाने से वह आयु मिलती है जो आप इस वर्ष के दौरान पूरी करेंगे, आज की आयु नहीं। दूसरी तारीख़ को जन्मदिन के बाद ले जाइए, तो 36 हो जाएगा।' },
      { q: '29 फ़रवरी को जन्मा व्यक्ति सामान्य वर्ष में कितने का होता है?', a: 'यहाँ और अधिकांश कॉमन लॉ व्यवस्थाओं में प्रयुक्त नियम के अनुसार वर्ष 28 फ़रवरी को पूरा होता है, इसलिए उसी दिन से एक वर्ष अधिक गिना जाता है। न्यूज़ीलैंड और ताइवान 1 मार्च तय करते हैं। दोनों में असहमति केवल एक दिन की रहती है।' },
      { q: 'क्या मैं भविष्य की किसी तारीख़ पर अपनी आयु निकाल सकता हूँ?', a: 'हाँ। दूसरा खाना कोई भी तारीख़ लेता है, बीती हुई या आने वाली। आवेदन, परीक्षा या नवीनीकरण का दिन डालिए और वही आयु मिलेगी जो फ़ॉर्म पर लिखी जाएगी।' },
      { q: 'क्या कुल दिनों में लीप दिन शामिल हैं?', a: 'हाँ। गिनती दोनों तारीख़ों के बीच के असली कैलेंडर दिनों की है, इसलिए आपने जितने 29 फ़रवरी जिए हैं वे सब उसमें हैं। इसी कारण यह संख्या कभी भी केवल वर्ष गुणा 365 नहीं होती।' },
    ],
    ui: {
      section: 'तारीख़ें', birth: 'जन्म तिथि', on: 'इस तारीख़ पर आयु', calc: 'आयु निकालें',
      exact: 'सटीक आयु', moUnit: 'माह', dUnit: 'दिन',
      totMonths: 'कुल महीने', totWeeks: 'कुल सप्ताह', totDays: 'जिए हुए दिन', totHours: 'जिए हुए घंटे',
      nextBirthday: 'अगला जन्मदिन', daysUnit: 'दिन', turns: 'आयु होगी', bornOn: 'जन्म का वार',
      leapNote: 'जन्म 29 फ़रवरी को — सामान्य वर्षों में यह पृष्ठ 28 फ़रवरी को वर्ष पूरा मानता है।',
      note: 'दूसरी तारीख़ आपकी मर्ज़ी की है। किसी भी दिन को रखकर उस दिन की आयु देख सकते हैं।',
    },
  },
  'zh-hans': {
    title: '年龄计算器',
    desc: '算出两个日期之间的实足年龄，精确到年、月、日，也处理 2 月 29 日出生的情况',
    short: '两个日期之间的实足年龄',
    intro: [
      { h: '年龄是过完的年数，不是两个年份相减', p: '1990 年出生的人到了 2026 年并不自动就是 36 岁。生日没到之前仍然是 35 岁，因为年龄数的是已经过完的年，不是刚开始的年。表格上差一岁的错误，几乎都出自这一条。第二个日期也不锁定在今天：填上真正起作用的那一天——考试日、保单生效日、登机日——得到的就是那天的年龄。' },
      { h: '一个月不是三十天', p: '从 11 月 30 日算三个月是 2 月 28 日，一共 90 天；从 4 月 30 日算三个月是 7 月 30 日，一共 91 天。用天数除以 30，一年下来会差好几天，所以这里的月和日是顺着日历一个月一个月走过去、再把余下的按天数出的。月末也照日历的规矩来：1 月 31 日加一个月落在 2 月 28 日，不是 3 月 3 日。' },
      { h: '2 月 29 日出生', p: '这个生日四年才有一次，所以四年里有三年得由日历挑一个替代日。英美法的传统认为在周年日的前一天就已经满一年，于是生日落在 2 月 28 日。也有少数地区改用 3 月 1 日，纽西兰和台湾地区就是这样。本页按 2 月 28 日计算，并在结果里注明——因为这个选择每年会让你的年龄整整差上一天。' },
    ],
    faq: [
      { q: '我 1990 年出生，现在是 2026 年，为什么显示 35 岁？', a: '因为今年的生日还没到。年份相减得到的是你在这一年里会满的岁数，不是现在的岁数。把第二个日期挪到生日之后，就变成 36 岁了。' },
      { q: '2 月 29 日出生的人，在平年算几岁？', a: '按本页和多数英美法体系采用的规则，2 月 28 日就算满一年，从那天起多算一岁。纽西兰和台湾地区则定在 3 月 1 日。无论哪一种，分歧都只持续一天。' },
      { q: '能算未来某一天的年龄吗？', a: '可以。第二个输入框接受任何日期，过去或将来都行。填上申请日、考试日或续期日，得到的就是表格上要写的年龄。' },
      { q: '总天数里包含闰日吗？', a: '包含。这里数的是两个日期之间真实的日历天数，你经历过的每一个 2 月 29 日都在里面。所以这个数字从来不是简单的年数乘以 365。' },
    ],
    ui: {
      section: '日期', birth: '出生日期', on: '计算基准日', calc: '计算年龄',
      exact: '实足年龄', moUnit: '个月', dUnit: '天',
      totMonths: '总月数', totWeeks: '总周数', totDays: '已过天数', totHours: '已过小时',
      nextBirthday: '距下次生日', daysUnit: '天', turns: '将满', bornOn: '出生那天是',
      leapNote: '2 月 29 日出生——平年里本页按 2 月 28 日算满一年。',
      note: '基准日可以自己定，填任意一天就能看到那天的年龄。',
    },
  },
  'zh-hant': {
    title: '年齡計算機',
    desc: '算出兩個日期之間的實足年齡，精確到年、月、日，也處理 2 月 29 日出生的情況',
    short: '兩個日期之間的實足年齡',
    intro: [
      { h: '年齡是過完的年數，不是兩個年份相減', p: '1990 年出生的人到了 2026 年並不自動就是 36 歲。生日沒到之前仍然是 35 歲，因為年齡數的是已經過完的年，不是剛開始的年。表格上差一歲的錯誤，幾乎都出自這一條。第二個日期也不鎖定在今天：填上真正起作用的那一天——考試日、保單生效日、登機日——得到的就是那天的年齡。' },
      { h: '一個月不是三十天', p: '從 11 月 30 日算三個月是 2 月 28 日，一共 90 天；從 4 月 30 日算三個月是 7 月 30 日，一共 91 天。用天數除以 30，一年下來會差好幾天，所以這裡的月和日是順著日曆一個月一個月走過去、再把餘下的按天數算出來的。月底也照日曆的規矩來：1 月 31 日加一個月落在 2 月 28 日，不是 3 月 3 日。' },
      { h: '2 月 29 日出生', p: '這個生日四年才有一次，所以四年裡有三年得由日曆挑一個替代日。英美法的傳統認為在週年日的前一天就已經滿一年，於是生日落在 2 月 28 日。臺灣民法則以出生日相當日之前一日的結束計算年齡，實務上多把 2 月 29 日出生者在平年視為 3 月 1 日生日。本頁一律按 2 月 28 日計算並在結果註明——差別每年只有一天，但辦手續時就是那一天在算。' },
    ],
    faq: [
      { q: '我 1990 年出生，現在是 2026 年，為什麼顯示 35 歲？', a: '因為今年的生日還沒到。年份相減得到的是你在這一年裡會滿的歲數，不是現在的歲數。把第二個日期挪到生日之後，就變成 36 歲了。' },
      { q: '2 月 29 日出生的人，在平年算幾歲？', a: '按本頁採用的規則，2 月 28 日就算滿一年，從那天起多算一歲。臺灣與紐西蘭的作法則落在 3 月 1 日。無論哪一種，分歧都只持續一天，需要送件時請以受理機關的認定為準。' },
      { q: '能算未來某一天的年齡嗎？', a: '可以。第二個欄位接受任何日期，過去或將來都行。填上申請日、考試日或續約日，得到的就是表格上要寫的年齡。' },
      { q: '總天數裡包含閏日嗎？', a: '包含。這裡數的是兩個日期之間真實的日曆天數，你經歷過的每一個 2 月 29 日都在裡面。所以這個數字從來不是單純的年數乘以 365。' },
    ],
    ui: {
      section: '日期', birth: '出生日期', on: '計算基準日', calc: '計算年齡',
      exact: '實足年齡', moUnit: '個月', dUnit: '天',
      totMonths: '總月數', totWeeks: '總週數', totDays: '已過天數', totHours: '已過小時',
      nextBirthday: '距下次生日', daysUnit: '天', turns: '將滿', bornOn: '出生那天是',
      leapNote: '2 月 29 日出生——平年裡本頁按 2 月 28 日算滿一年。',
      note: '基準日可以自己定，填任意一天就能看到那天的年齡。',
    },
  },
};

export const DISCOUNT: CalcTable = {
  en: {
    title: 'Discount calculator',
    desc: 'Sale price, percentage off and original price — give any two, get the third, with stacked discounts done properly',
    short: 'Sale price, percentage off and reverse price',
    intro: [
      { h: 'Three numbers, and any two of them fix the third', p: 'The original price, the percentage off and the price you pay are locked together: settle two and the third has exactly one possible value. Most pages only run the first direction. The two that actually get used are the other ones — finding what percentage a marked-down price really represents, and recovering the original price from a price and a claim.' },
      { h: 'Two discounts do not add up', p: '30% off with an extra 20% coupon is not 50% off. The coupon comes off what the first cut left, so you pay 80% of 70%, which is 56% of the original — a real discount of 44%. The gap grows with the numbers: two 50% cuts leave 25% of the price, never zero. Put the second percentage in the extra field and the page reports the effective rate instead of the advertised one.' },
      { h: 'Judge the offer by the price, not the percentage', p: 'A percentage is only as honest as the price it is taken from. Marking a reference price up and then advertising a large reduction is common enough that regulators moved on it: in the EU, a price cut has to be shown against the lowest price of the previous 30 days. Reverse the discount here, compare the amount you actually hand over across shops, and the percentage stops mattering.' },
    ],
    faq: [
      { q: 'How do I get the original price back from the sale price?', a: 'Divide by one minus the discount as a fraction. A price of 65 after 35% off was 65 / 0.65 = 100. Do not multiply by 1.35 — that gives 87.75, and it is the most common mistake in the reverse direction.' },
      { q: 'Is 30% plus 20% the same as 50% off?', a: 'No, it is 44% off. Each discount applies to whatever the previous one left behind, and percentages of different amounts cannot be added. Two 30% discounts come to 51%, not 60%.' },
      { q: 'Is a third off better than 30% off?', a: 'Slightly, yes. A third is 33.33%, so on a price of 60 you save 20 rather than 18. Fractions and percentages are easy to rank once both are written the same way.' },
      { q: 'Does tax change the discount percentage?', a: 'Not if the tax is a flat percentage on whatever you pay. A 20% reduction takes 20% off the pre-tax price and 20% off the tax with it, so the rate you are quoted is the rate you get. Only fixed charges that do not scale — delivery, for instance — dilute it.' },
    ],
    ui: {
      tabPrice: 'Sale price', tabRate: 'Percentage off', tabReverse: 'Original price',
      original: 'Original price', rate: 'Discount (%)', extra: 'Extra discount (%, optional)',
      sale: 'Price you pay', calc: 'Calculate',
      outFinal: 'You pay', outSaved: 'You save', outRate: 'Effective discount', outOriginal: 'Original price',
      stackNote: 'The second discount applies to the already reduced price, so the effective rate is lower than the two added together.',
      note: 'No currency symbol — the arithmetic is the same in every currency.',
    },
  },
  es: {
    title: 'Calculadora de descuentos',
    desc: 'Precio final, porcentaje de descuento y precio original: da dos y obtén el tercero, con descuentos acumulados bien calculados',
    short: 'Precio con descuento, porcentaje y precio original',
    intro: [
      { h: 'Tres números, y dos cualesquiera fijan el tercero', p: 'El precio original, el porcentaje de descuento y lo que pagas están atados entre sí: si fijas dos, el tercero solo puede tomar un valor. Casi todas las páginas resuelven la primera dirección. Las que de verdad se usan son las otras dos — averiguar qué porcentaje representa realmente un precio rebajado y recuperar el precio original a partir de un precio y una promesa.' },
      { h: 'Dos descuentos no se suman', p: 'Un 30% con un cupón adicional del 20% no es un 50%. El cupón se aplica sobre lo que dejó el primer recorte, así que pagas el 80% del 70%, es decir el 56% del original: un descuento real del 44%. La diferencia crece con las cifras: dos rebajas del 50% dejan el 25% del precio, nunca cero. Pon el segundo porcentaje en el campo adicional y la página da la tasa efectiva en vez de la anunciada.' },
      { h: 'Juzga la oferta por el precio, no por el porcentaje', p: 'Un porcentaje vale lo que valga el precio del que se descuenta. Subir un precio de referencia y anunciar después una gran rebaja es tan habitual que los reguladores intervinieron: en la UE, toda reducción debe mostrarse frente al precio más bajo de los 30 días anteriores. Invierte aquí el descuento, compara la cantidad que realmente entregas en cada tienda y el porcentaje deja de importar.' },
    ],
    faq: [
      { q: '¿Cómo recupero el precio original a partir del precio rebajado?', a: 'Divide entre uno menos el descuento en tanto por uno. Un precio de 65 tras un 35% era 65 / 0,65 = 100. No multipliques por 1,35: eso da 87,75 y es el error más frecuente en el sentido inverso.' },
      { q: '¿Un 30% más un 20% es lo mismo que un 50%?', a: 'No, es un 44%. Cada descuento se aplica sobre lo que dejó el anterior, y no se pueden sumar porcentajes de cantidades distintas. Dos descuentos del 30% suman 51%, no 60%.' },
      { q: '¿Un tercio de descuento es mejor que un 30%?', a: 'Sí, algo mejor. Un tercio es el 33,33%, así que sobre un precio de 60 ahorras 20 en lugar de 18. Fracciones y porcentajes se ordenan fácil en cuanto están escritos igual.' },
      { q: '¿El impuesto cambia el porcentaje de descuento?', a: 'No, si el impuesto es un porcentaje plano sobre lo que pagas. Una rebaja del 20% quita el 20% del precio sin impuesto y también el 20% del impuesto, así que la tasa que te dicen es la que obtienes. Solo los cargos fijos que no escalan, como el envío, la diluyen.' },
    ],
    ui: {
      tabPrice: 'Precio rebajado', tabRate: 'Porcentaje', tabReverse: 'Precio original',
      original: 'Precio original', rate: 'Descuento (%)', extra: 'Descuento adicional (%, opcional)',
      sale: 'Precio que pagas', calc: 'Calcular',
      outFinal: 'Pagas', outSaved: 'Ahorras', outRate: 'Descuento efectivo', outOriginal: 'Precio original',
      stackNote: 'El segundo descuento se aplica sobre el precio ya rebajado, así que la tasa efectiva es menor que la suma de ambos.',
      note: 'Sin símbolo de moneda: la aritmética es la misma en cualquier divisa.',
    },
  },
  'pt-br': {
    title: 'Calculadora de desconto',
    desc: 'Preço com desconto, percentual e preço original: informe dois e obtenha o terceiro, com descontos acumulados calculados direito',
    short: 'Preço com desconto, percentual e preço original',
    intro: [
      { h: 'Três números, e dois quaisquer fixam o terceiro', p: 'O preço original, o percentual de desconto e o que você paga estão amarrados: definidos dois, o terceiro só pode ter um valor. Quase toda página resolve a primeira direção. As que realmente se usam são as outras duas — descobrir que percentual um preço rebaixado representa de verdade e recuperar o preço original a partir de um preço e de uma promessa.' },
      { h: 'Dois descontos não se somam', p: '30% com um cupom extra de 20% não é 50%. O cupom incide sobre o que o primeiro corte deixou, então você paga 80% de 70%, ou seja 56% do original — desconto real de 44%. A diferença cresce com os números: dois cortes de 50% deixam 25% do preço, nunca zero. Coloque o segundo percentual no campo extra e a página mostra a taxa efetiva em vez da anunciada.' },
      { h: 'Julgue a oferta pelo preço, não pelo percentual', p: 'Um percentual vale o que valer o preço de onde ele é tirado. Inflar um preço de referência e anunciar uma grande redução é comum a ponto de virar caso de regulação: na União Europeia, o corte precisa ser mostrado contra o menor preço dos 30 dias anteriores. Inverta o desconto aqui, compare o valor que você realmente entrega em cada loja e o percentual deixa de importar.' },
    ],
    faq: [
      { q: 'Como volto do preço com desconto para o preço original?', a: 'Divida por um menos o desconto em fração. Um preço de 65 depois de 35% era 65 / 0,65 = 100. Não multiplique por 1,35: isso dá 87,75 e é o erro mais comum no sentido inverso.' },
      { q: '30% mais 20% é a mesma coisa que 50%?', a: 'Não, é 44%. Cada desconto incide sobre o que o anterior deixou, e percentuais de valores diferentes não podem ser somados. Dois descontos de 30% dão 51%, não 60%.' },
      { q: 'Um terço de desconto é melhor que 30%?', a: 'Um pouco melhor, sim. Um terço é 33,33%, então num preço de 60 você economiza 20 em vez de 18. Frações e percentuais ficam fáceis de comparar quando estão escritos do mesmo jeito.' },
      { q: 'O imposto muda o percentual de desconto?', a: 'Não, desde que o imposto seja um percentual plano sobre o que você paga. Uma redução de 20% tira 20% do preço sem imposto e 20% do imposto junto, então a taxa anunciada é a que você recebe. Só encargos fixos que não escalam, como o frete, diluem o desconto.' },
    ],
    ui: {
      tabPrice: 'Preço com desconto', tabRate: 'Percentual', tabReverse: 'Preço original',
      original: 'Preço original', rate: 'Desconto (%)', extra: 'Desconto extra (%, opcional)',
      sale: 'Preço que você paga', calc: 'Calcular',
      outFinal: 'Você paga', outSaved: 'Você economiza', outRate: 'Desconto efetivo', outOriginal: 'Preço original',
      stackNote: 'O segundo desconto incide sobre o preço já reduzido, então a taxa efetiva fica abaixo da soma dos dois.',
      note: 'Sem símbolo de moeda: a conta é a mesma em qualquer moeda.',
    },
  },
  ja: {
    title: '割引計算機',
    desc: '割引後の価格・割引率・元の価格のうち二つを入れれば残りが出ます。重ねがけの割引も正しく計算します',
    short: '割引後価格・割引率・元の価格',
    intro: [
      { h: '三つの数のうち二つが決まれば残りも決まる', p: '元の価格、割引率、実際に払う額はひとつながりです。二つを決めれば三つめの取りうる値はひとつしかありません。多くのページは一方向しか計算しませんが、実際によく要るのは残りの二つです — 値下げ後の価格が本当は何％引きなのか、そして「◯％引き」という表示から元の価格を逆算することです。' },
      { h: '割引は足し算ではない', p: '30％引きにクーポン20％を重ねても50％引きにはなりません。クーポンは一度目で減った後の額にかかるので、払うのは70％の80％、つまり元の56％ — 実質44％引きです。数字が大きいほど差は開きます。50％引きを二度重ねても価格の25％が残り、ゼロにはなりません。二つめの率を追加欄に入れれば、表示上の率ではなく実質の率が出ます。' },
      { h: '率ではなく払う額で見る', p: '割引率は、それを引く元の価格が正しいときだけ意味があります。参考価格を吊り上げてから大きな値下げをうたう手口は各国が規制に動くほど広まっており、EUでは直前30日間の最安値を並べて示すことが義務づけられました。ここで逆算し、店ごとに実際に払う額を並べて比べれば、率そのものはどうでもよくなります。' },
    ],
    faq: [
      { q: '割引後の価格から元の価格はどう戻しますか', a: '1から割引率を引いた小数で割ります。35％引きで65円なら、65 ÷ 0.65 = 100円です。1.35を掛けてはいけません — それだと87.75円になり、逆算でいちばん多い間違いです。' },
      { q: '30％と20％を重ねると50％引きですか', a: 'いいえ、44％引きです。あとの割引は前の割引が残した額にかかるので、母数の違う率は足せません。30％を二度重ねても51％で、60％にはなりません。' },
      { q: '「三分の一引き」と「30％引き」はどちらが得ですか', a: '三分の一のほうがわずかに得です。三分の一は33.33％なので、600円なら200円引き、30％なら180円引きになります。分数と百分率は同じ形に直せば並べて比べられます。' },
      { q: '消費税で割引率は変わりますか', a: '税が支払額に対する一定率であれば変わりません。20％引きは税抜き価格からも税額からも同じく20％を落とすので、表示された率がそのまま効きます。金額が動かない固定費 — 送料など — だけが実質の率を薄めます。' },
    ],
    ui: {
      tabPrice: '割引後の価格', tabRate: '割引率', tabReverse: '元の価格',
      original: '元の価格', rate: '割引率 (%)', extra: '重ねる割引 (%、任意)',
      sale: '実際に払う額', calc: '計算',
      outFinal: '支払額', outSaved: '値引き額', outRate: '実質の割引率', outOriginal: '元の価格',
      stackNote: '二つめの割引は値下げ後の額にかかるため、実質の率は二つを足した値より低くなります。',
      note: '通貨記号は付けません。計算はどの通貨でも同じです。',
    },
  },
  de: {
    title: 'Rabattrechner',
    desc: 'Endpreis, Rabatt in Prozent und Originalpreis — zwei eingeben, das dritte bekommen, mit korrekt gerechneten Mehrfachrabatten',
    short: 'Endpreis, Rabattsatz und Originalpreis',
    intro: [
      { h: 'Drei Zahlen, und zwei davon legen die dritte fest', p: 'Originalpreis, Rabattsatz und der Betrag, den Sie zahlen, hängen fest zusammen: Stehen zwei davon, ist die dritte eindeutig. Die meisten Seiten rechnen nur die erste Richtung. Gebraucht werden die beiden anderen — herauszufinden, welchen Prozentsatz ein herabgesetzter Preis wirklich darstellt, und aus Preis und Werbeaussage den Originalpreis zurückzuholen.' },
      { h: 'Zwei Rabatte addieren sich nicht', p: '30% Nachlass plus 20%-Gutschein sind keine 50%. Der Gutschein greift auf das, was der erste Abschlag übrig gelassen hat: Sie zahlen 80% von 70%, also 56% des Originals — ein tatsächlicher Rabatt von 44%. Der Abstand wächst mit den Zahlen: zweimal 50% lassen 25% des Preises stehen, nie null. Tragen Sie den zweiten Satz in das Zusatzfeld ein, und die Seite nennt den effektiven statt des beworbenen Satzes.' },
      { h: 'Beurteilen Sie das Angebot am Preis, nicht am Prozentsatz', p: 'Ein Prozentsatz ist nur so ehrlich wie der Preis, von dem er abgezogen wird. Einen Referenzpreis anzuheben und dann groß zu reduzieren, war verbreitet genug, dass der Gesetzgeber eingriff: In der EU muss eine Preisermäßigung gegen den niedrigsten Preis der vorangegangenen 30 Tage ausgewiesen werden. Rechnen Sie den Rabatt hier zurück, vergleichen Sie den Betrag, den Sie wirklich zahlen, und der Prozentsatz verliert seine Bedeutung.' },
    ],
    faq: [
      { q: 'Wie komme ich vom Endpreis zurück zum Originalpreis?', a: 'Teilen Sie durch eins minus den Rabatt als Dezimalzahl. Ein Preis von 65 nach 35% war 65 / 0,65 = 100. Nicht mit 1,35 multiplizieren — das ergibt 87,75 und ist der häufigste Fehler in der Gegenrichtung.' },
      { q: 'Sind 30% plus 20% dasselbe wie 50%?', a: 'Nein, es sind 44%. Jeder Rabatt greift auf das, was der vorherige übrig gelassen hat, und Prozentsätze verschiedener Grundbeträge lassen sich nicht addieren. Zweimal 30% ergeben 51%, nicht 60%.' },
      { q: 'Ist ein Drittel Rabatt besser als 30%?', a: 'Etwas besser, ja. Ein Drittel sind 33,33%, bei einem Preis von 60 sparen Sie also 20 statt 18. Brüche und Prozentsätze lassen sich leicht vergleichen, sobald beide gleich geschrieben sind.' },
      { q: 'Ändert die Mehrwertsteuer den Rabattsatz?', a: 'Nein, solange die Steuer ein fester Prozentsatz auf den Zahlbetrag ist. 20% Nachlass nehmen 20% vom Nettopreis und 20% von der Steuer, der genannte Satz kommt also unverändert an. Nur Festbeträge, die nicht mitwachsen — Versandkosten etwa — verwässern ihn.' },
    ],
    ui: {
      tabPrice: 'Endpreis', tabRate: 'Rabattsatz', tabReverse: 'Originalpreis',
      original: 'Originalpreis', rate: 'Rabatt (%)', extra: 'Zusatzrabatt (%, optional)',
      sale: 'Zu zahlender Preis', calc: 'Berechnen',
      outFinal: 'Sie zahlen', outSaved: 'Sie sparen', outRate: 'Effektiver Rabatt', outOriginal: 'Originalpreis',
      stackNote: 'Der zweite Rabatt greift auf den bereits gesenkten Preis, der effektive Satz liegt deshalb unter der Summe beider.',
      note: 'Ohne Währungszeichen — die Rechnung ist in jeder Währung dieselbe.',
    },
  },
  fr: {
    title: 'Calculateur de remise',
    desc: 'Prix soldé, pourcentage de remise et prix initial : donnez-en deux, obtenez le troisième, avec les remises cumulées calculées correctement',
    short: 'Prix soldé, taux de remise et prix initial',
    intro: [
      { h: 'Trois nombres, et deux d’entre eux fixent le troisième', p: 'Le prix initial, le pourcentage de remise et ce que vous payez sont liés : fixez-en deux et le troisième n’a plus qu’une valeur possible. La plupart des pages ne traitent que le premier sens. Les deux autres sont ceux dont on se sert vraiment — savoir quel pourcentage représente réellement un prix barré, et retrouver le prix initial à partir d’un prix et d’une promesse.' },
      { h: 'Deux remises ne s’additionnent pas', p: '30% de remise plus un coupon de 20% ne font pas 50%. Le coupon s’applique à ce qu’a laissé la première baisse : vous payez 80% de 70%, soit 56% du prix initial — une remise réelle de 44%. L’écart grandit avec les chiffres : deux baisses de 50% laissent 25% du prix, jamais zéro. Saisissez le second taux dans le champ supplémentaire et la page affiche le taux effectif au lieu du taux annoncé.' },
      { h: 'Jugez l’offre au prix, pas au pourcentage', p: 'Un pourcentage ne vaut que ce que vaut le prix dont on le retranche. Gonfler un prix de référence puis annoncer une forte baisse était assez répandu pour que le législateur s’en mêle : dans l’Union européenne, une réduction doit être affichée par rapport au prix le plus bas des 30 jours précédents. Faites ici le calcul inverse, comparez la somme que vous remettez réellement d’une enseigne à l’autre, et le pourcentage cesse de compter.' },
    ],
    faq: [
      { q: 'Comment retrouver le prix initial à partir du prix soldé ?', a: 'Divisez par un moins la remise exprimée en décimal. Un prix de 65 après 35% valait 65 / 0,65 = 100. Ne multipliez pas par 1,35 : cela donne 87,75, et c’est l’erreur la plus fréquente dans ce sens.' },
      { q: '30% plus 20%, est-ce la même chose que 50% ?', a: 'Non, cela fait 44%. Chaque remise s’applique à ce que la précédente a laissé, et on n’additionne pas des pourcentages portant sur des montants différents. Deux remises de 30% font 51%, pas 60%.' },
      { q: 'Un tiers de remise vaut-il mieux que 30% ?', a: 'Légèrement, oui. Un tiers vaut 33,33%, donc sur un prix de 60 vous économisez 20 au lieu de 18. Fractions et pourcentages se classent facilement une fois écrits de la même façon.' },
      { q: 'La TVA change-t-elle le taux de remise ?', a: 'Non, tant que la taxe est un pourcentage uniforme sur ce que vous payez. Une baisse de 20% retire 20% du prix hors taxe et 20% de la taxe avec, le taux annoncé arrive donc intact. Seuls les frais fixes qui ne suivent pas — la livraison par exemple — le diluent.' },
    ],
    ui: {
      tabPrice: 'Prix soldé', tabRate: 'Taux de remise', tabReverse: 'Prix initial',
      original: 'Prix initial', rate: 'Remise (%)', extra: 'Remise supplémentaire (%, facultatif)',
      sale: 'Prix payé', calc: 'Calculer',
      outFinal: 'Vous payez', outSaved: 'Vous économisez', outRate: 'Remise effective', outOriginal: 'Prix initial',
      stackNote: 'La seconde remise s’applique au prix déjà baissé : le taux effectif reste inférieur à la somme des deux.',
      note: 'Pas de symbole monétaire — le calcul est le même dans toutes les devises.',
    },
  },
  hi: {
    title: 'छूट कैलकुलेटर',
    desc: 'छूट के बाद क़ीमत, छूट प्रतिशत और असली क़ीमत — कोई दो दीजिए, तीसरा मिल जाएगा, ऊपर-से-ऊपर लगने वाली छूट भी सही जुड़ती है',
    short: 'छूट के बाद क़ीमत, प्रतिशत और असली क़ीमत',
    intro: [
      { h: 'तीन संख्याएँ, और कोई भी दो तीसरी तय कर देती हैं', p: 'असली क़ीमत, छूट प्रतिशत और जो आप चुकाते हैं — तीनों आपस में बँधे हैं। दो तय हो जाएँ तो तीसरे का एक ही मान संभव है। ज़्यादातर पन्ने केवल पहली दिशा गिनते हैं, जबकि काम में बाक़ी दो आते हैं — घटी हुई क़ीमत असल में कितने प्रतिशत की छूट है, और «इतने प्रतिशत छूट» के दावे से असली क़ीमत को पीछे की ओर निकालना।' },
      { h: 'दो छूटें जुड़ती नहीं, गुणा होती हैं', p: '30% छूट पर 20% का कूपन मिलाकर 50% नहीं बनता। कूपन उस रक़म पर लगता है जो पहली कटौती के बाद बची थी, यानी आप 70% का 80% चुकाते हैं — असली क़ीमत का 56%, और असल छूट 44%। अंक बड़े होने पर अंतर और बढ़ता है: 50% की दो कटौतियों के बाद भी क़ीमत का 25% बचा रहता है, शून्य कभी नहीं होता। दूसरा प्रतिशत अतिरिक्त ख़ाने में डालिए और पन्ना विज्ञापित नहीं, वास्तविक दर बताएगा।' },
      { h: 'सौदे को प्रतिशत से नहीं, चुकाई रक़म से परखें', p: 'प्रतिशत उतना ही सच्चा है जितनी वह क़ीमत जिस पर लगाया गया है। संदर्भ क़ीमत बढ़ाकर बड़ी छूट दिखाना इतना आम हुआ कि नियामकों को दख़ल देना पड़ा — यूरोपीय संघ में छूट के साथ पिछले 30 दिनों की न्यूनतम क़ीमत दिखाना अनिवार्य है। यहाँ छूट को उलटकर देखिए, अलग-अलग दुकानों में असल में चुकाई जाने वाली रक़म मिलाइए, फिर प्रतिशत मायने नहीं रखता।' },
    ],
    faq: [
      { q: 'छूट वाली क़ीमत से असली क़ीमत कैसे निकालें?', a: 'एक में से छूट का दशमलव घटाकर उससे भाग दीजिए। 35% छूट के बाद 65 है तो असली क़ीमत 65 ÷ 0.65 = 100 थी। 1.35 से गुणा मत कीजिए — उससे 87.75 आता है और उलटी दिशा में यही सबसे आम ग़लती है।' },
      { q: 'क्या 30% और 20% मिलकर 50% छूट होती है?', a: 'नहीं, 44% होती है। हर छूट उस रक़म पर लगती है जो पिछली छोड़ गई थी, और अलग-अलग रक़मों के प्रतिशत जोड़े नहीं जा सकते। 30% की दो छूटें मिलकर 51% बनती हैं, 60% नहीं।' },
      { q: 'एक-तिहाई छूट 30% से बेहतर है क्या?', a: 'थोड़ी बेहतर है। एक-तिहाई यानी 33.33%, तो 60 की क़ीमत पर 18 के बजाय 20 की बचत होती है। भिन्न और प्रतिशत एक ही रूप में लिख लेने पर तुलना आसान हो जाती है।' },
      { q: 'क्या कर लगने से छूट का प्रतिशत बदल जाता है?', a: 'नहीं, बशर्ते कर चुकाई रक़म पर एक समान प्रतिशत हो। 20% की छूट कर-रहित क़ीमत से भी 20% घटाती है और कर से भी, इसलिए बताई गई दर वैसी ही मिलती है। केवल वे नियत शुल्क, जो रक़म के साथ नहीं बदलते — जैसे डिलीवरी — छूट को हल्का करते हैं।' },
    ],
    ui: {
      tabPrice: 'छूट के बाद क़ीमत', tabRate: 'छूट प्रतिशत', tabReverse: 'असली क़ीमत',
      original: 'असली क़ीमत', rate: 'छूट (%)', extra: 'अतिरिक्त छूट (%, वैकल्पिक)',
      sale: 'चुकाई जाने वाली क़ीमत', calc: 'गणना करें',
      outFinal: 'आप चुकाएँगे', outSaved: 'आपकी बचत', outRate: 'वास्तविक छूट', outOriginal: 'असली क़ीमत',
      stackNote: 'दूसरी छूट पहले से घटी क़ीमत पर लगती है, इसलिए वास्तविक दर दोनों के जोड़ से कम रहती है।',
      note: 'कोई मुद्रा चिह्न नहीं — गणित हर मुद्रा में एक जैसा है।',
    },
  },
  'zh-hans': {
    title: '折扣计算器',
    desc: '折后价、折扣百分比与原价，给出任意两个就能算出第三个，叠加折扣也算得对',
    short: '折后价、折扣率与原价互算',
    intro: [
      { h: '三个数字，任意两个就锁定第三个', p: '原价、折扣百分比和你实际付的钱是绑在一起的：定下两个，第三个就只有唯一取值。多数页面只算第一个方向，真正常用的却是另外两个——看清一个已降价的标价究竟相当于几折，以及从一句「几折优惠」倒推回原价。' },
      { h: '两个折扣不能相加', p: '打七折再用一张八折券，不是打五折。券作用在第一次降价之后剩下的金额上，你付的是七折的八折，也就是原价的 56%——实际降幅 44%。数字越大差得越多：连着两次五折，仍留下原价的 25%，永远到不了零。把第二个百分比填进附加栏，页面给出的是实际降幅而不是宣传的降幅。' },
      { h: '看付出的钱，不看百分比', p: '百分比只有和它所依附的价格一样可信。先抬高参考价再宣传大幅降价的做法多到监管出手：在欧盟，降价必须与此前 30 天内的最低价一并标示。在这里把折扣倒推回去，把各家实际要付的金额并排比一比，百分比就不重要了。' },
    ],
    faq: [
      { q: '怎么从折后价倒推原价？', a: '用一减去折扣的小数去除。打完 35% 的折扣是 65，那么原价是 65 ÷ 0.65 = 100。不要乘以 1.35——那样得到 87.75，是倒推时最常见的错误。' },
      { q: '30% 加 20% 等于打五折吗？', a: '不等于，实际是 44%。每次折扣都作用在上一次剩下的金额上，基数不同的百分比不能相加。两次 30% 合起来是 51%，不是 60%。' },
      { q: '「减三分之一」比「减 30%」划算吗？', a: '略微划算。三分之一是 33.33%，所以在 60 的价格上省 20 而不是 18。分数和百分比写成同一种形式后就好比较了。' },
      { q: '税会改变折扣百分比吗？', a: '不会，只要税是按付款金额收取的固定比例。降价 20% 会从税前价扣掉 20%，税额也随之少 20%，所以标出的折扣率就是你实际得到的。只有不随金额变动的固定费用——比如运费——才会稀释它。' },
    ],
    ui: {
      tabPrice: '折后价', tabRate: '折扣率', tabReverse: '原价',
      original: '原价', rate: '折扣 (%)', extra: '追加折扣 (%，可不填)',
      sale: '实际支付价', calc: '计算',
      outFinal: '实付', outSaved: '省下', outRate: '实际折扣', outOriginal: '原价',
      stackNote: '第二个折扣作用在已降价的金额上，所以实际折扣低于两者相加。',
      note: '不带货币符号——换成哪种货币算法都一样。',
    },
  },
  'zh-hant': {
    title: '折扣計算機',
    desc: '折後價、折扣百分比與原價，給出任意兩個就能算出第三個，疊加折扣也算得對',
    short: '折後價、折扣率與原價互算',
    intro: [
      { h: '三個數字，任意兩個就鎖定第三個', p: '原價、折扣百分比和你實際付的錢是綁在一起的：定下兩個，第三個就只有唯一取值。多數頁面只算第一個方向，真正常用的卻是另外兩個——看清一個已降價的標價究竟相當於幾折，以及從一句「幾折優惠」倒推回原價。' },
      { h: '兩個折扣不能相加', p: '打七折再用一張八折券，不是打五折。券作用在第一次降價之後剩下的金額上，你付的是七折的八折，也就是原價的 56%——實際降幅 44%。數字越大差得越多：連著兩次五折，仍留下原價的 25%，永遠到不了零。把第二個百分比填進附加欄，頁面給出的是實際降幅而不是宣傳的降幅。' },
      { h: '看付出的錢，不看百分比', p: '百分比只有和它所依附的價格一樣可信。先抬高參考價再宣傳大幅降價的做法多到監管出手：在歐盟，降價必須與此前 30 天內的最低價一併標示。在這裡把折扣倒推回去，把各家實際要付的金額並排比一比，百分比就不重要了。' },
    ],
    faq: [
      { q: '怎麼從折後價倒推原價？', a: '用一減去折扣的小數去除。打完 35% 的折扣是 65，那麼原價是 65 ÷ 0.65 = 100。不要乘以 1.35——那樣得到 87.75，是倒推時最常見的錯誤。' },
      { q: '30% 加 20% 等於打五折嗎？', a: '不等於，實際是 44%。每次折扣都作用在上一次剩下的金額上，基數不同的百分比不能相加。兩次 30% 合起來是 51%，不是 60%。' },
      { q: '「減三分之一」比「減 30%」划算嗎？', a: '略微划算。三分之一是 33.33%，所以在 60 的價格上省 20 而不是 18。分數和百分比寫成同一種形式後就好比較了。' },
      { q: '稅會改變折扣百分比嗎？', a: '不會，只要稅是按付款金額收取的固定比例。降價 20% 會從稅前價扣掉 20%，稅額也隨之少 20%，所以標出的折扣率就是你實際得到的。只有不隨金額變動的固定費用——例如運費——才會稀釋它。' },
    ],
    ui: {
      tabPrice: '折後價', tabRate: '折扣率', tabReverse: '原價',
      original: '原價', rate: '折扣 (%)', extra: '追加折扣 (%，可不填)',
      sale: '實際支付價', calc: '計算',
      outFinal: '實付', outSaved: '省下', outRate: '實際折扣', outOriginal: '原價',
      stackNote: '第二個折扣作用在已降價的金額上，所以實際折扣低於兩者相加。',
      note: '不帶貨幣符號——換成哪種貨幣算法都一樣。',
    },
  },
};
