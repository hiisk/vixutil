import type { CalcTable } from './types.ts';

/**
 * 생일, 배란일, 임신 주수.
 *
 * 생일 쪽에서 한국 나이(세는나이)는 뺐다 — 한국에만 있는 셈법이라 다른
 * 언어에서는 뜻이 통하지 않는다. 별자리와 띠는 남겼다.
 * 배란·임신은 Naegele 규칙과 14일 황체기라는 국제 관행을 그대로 쓴다.
 */
export const BIRTHDAY: CalcTable = {
  en: {
    title: 'Birthday calculator',
    desc: 'Days lived, the countdown to your next birthday, and the day of the week you were born',
    short: 'Days lived · next birthday',
    intro: [
      {
        h: 'Age in days rather than years',
        p: 'Years round away most of a life. Counting the days you have actually lived gives a number that moves every morning and makes round milestones — ten thousand days, twenty thousand — land somewhere other than a birthday.',
      },
      {
        h: 'Born on a leap day',
        p: 'A 29 February birthday has no anniversary in three years out of four. This tool moves the countdown to 1 March in those years, which is the common convention but not a universal one — some jurisdictions use 28 February for legal purposes.',
      },
    ],
    faq: [
      { q: 'How is age counted here?', a: 'By completed years since birth, the convention used almost everywhere. You turn one on your first birthday, not at birth.' },
      { q: 'Why does the day of the week matter?', a: 'It does not, particularly — but people are curious, and the answer is not something you can work out in your head. Weekdays repeat on a 400-year cycle, so the same date falls on the same weekday 400 years apart.' },
      { q: 'What are the two signs?', a: 'The Western zodiac sign from the date within the year, and the East Asian zodiac animal from the year itself, on a twelve-year cycle. The animal here follows the calendar year rather than the lunar new year, so dates in January and early February may differ from a lunar calendar.' },
    ],
    ui: {
      section: 'Your birthday', birthdate: 'Date of birth', calc: 'Calculate',
      age: 'Age', daysLived: 'Days lived', nextBirthday: 'Next birthday in',
      daysUnit: 'days', bornOn: 'Born on a', turns: 'You turn',
      starSign: 'Zodiac sign', animal: 'Zodiac animal',
      z1: 'Aries', z2: 'Taurus', z3: 'Gemini', z4: 'Cancer', z5: 'Leo', z6: 'Virgo',
      z7: 'Libra', z8: 'Scorpio', z9: 'Sagittarius', z10: 'Capricorn', z11: 'Aquarius', z12: 'Pisces',
      a1: 'Rat', a2: 'Ox', a3: 'Tiger', a4: 'Rabbit', a5: 'Dragon', a6: 'Snake',
      a7: 'Horse', a8: 'Goat', a9: 'Monkey', a10: 'Rooster', a11: 'Dog', a12: 'Pig',
      note: 'Age is counted in completed years. The zodiac animal follows the calendar year.',
    },
  },
  es: {
    title: 'Calculadora de cumpleaños',
    desc: 'Días vividos, cuenta atrás hasta tu próximo cumpleaños y el día de la semana en que naciste',
    short: 'Días vividos · próximo cumpleaños',
    intro: [
      {
        h: 'La edad en días, no en años',
        p: 'Los años redondean casi toda una vida. Contar los días realmente vividos da una cifra que cambia cada mañana y hace que los hitos redondos —diez mil días, veinte mil— caigan en cualquier sitio menos en un cumpleaños.',
      },
      {
        h: 'Nacer un 29 de febrero',
        p: 'Un cumpleaños el 29 de febrero no tiene aniversario tres años de cada cuatro. Esta herramienta pasa la cuenta atrás al 1 de marzo en esos años, que es la convención habitual pero no universal: algunas legislaciones usan el 28 de febrero a efectos legales.',
      },
    ],
    faq: [
      { q: '¿Cómo se cuenta aquí la edad?', a: 'Por años cumplidos desde el nacimiento, la convención usada casi en todas partes. Se cumple un año en el primer cumpleaños, no al nacer.' },
      { q: '¿Por qué importa el día de la semana?', a: 'No importa demasiado, pero da curiosidad y no es algo que se resuelva de cabeza. Los días de la semana se repiten en un ciclo de 400 años, así que la misma fecha cae en el mismo día 400 años después.' },
      { q: '¿Cuáles son los dos signos?', a: 'El signo del zodiaco occidental, según la fecha dentro del año, y el animal del zodiaco de Asia oriental, según el año, en un ciclo de doce. Aquí el animal sigue el año natural y no el año nuevo lunar, así que las fechas de enero y principios de febrero pueden diferir de un calendario lunar.' },
    ],
    ui: {
      section: 'Tu cumpleaños', birthdate: 'Fecha de nacimiento', calc: 'Calcular',
      age: 'Edad', daysLived: 'Días vividos', nextBirthday: 'Próximo cumpleaños en',
      daysUnit: 'días', bornOn: 'Naciste un', turns: 'Cumplirás',
      starSign: 'Signo del zodiaco', animal: 'Animal del zodiaco',
      z1: 'Aries', z2: 'Tauro', z3: 'Géminis', z4: 'Cáncer', z5: 'Leo', z6: 'Virgo',
      z7: 'Libra', z8: 'Escorpio', z9: 'Sagitario', z10: 'Capricornio', z11: 'Acuario', z12: 'Piscis',
      a1: 'Rata', a2: 'Buey', a3: 'Tigre', a4: 'Conejo', a5: 'Dragón', a6: 'Serpiente',
      a7: 'Caballo', a8: 'Cabra', a9: 'Mono', a10: 'Gallo', a11: 'Perro', a12: 'Cerdo',
      note: 'La edad se cuenta en años cumplidos. El animal del zodiaco sigue el año natural.',
    },
  },
  'pt-br': {
    title: 'Calculadora de aniversário',
    desc: 'Dias vividos, contagem regressiva para o próximo aniversário e o dia da semana em que você nasceu',
    short: 'Dias vividos · próximo aniversário',
    intro: [
      {
        h: 'Idade em dias, não em anos',
        p: 'Anos arredondam quase uma vida inteira. Contar os dias efetivamente vividos dá um número que muda toda manhã e faz marcos redondos — dez mil dias, vinte mil — caírem em qualquer lugar menos num aniversário.',
      },
      {
        h: 'Nascer em 29 de fevereiro',
        p: 'Um aniversário em 29 de fevereiro não tem data três anos em cada quatro. Esta ferramenta joga a contagem para 1º de março nesses anos, convenção comum mas não universal: algumas legislações usam 28 de fevereiro para efeitos legais.',
      },
    ],
    faq: [
      { q: 'Como a idade é contada aqui?', a: 'Por anos completos desde o nascimento, a convenção usada em quase todo lugar. Você faz um ano no primeiro aniversário, não ao nascer.' },
      { q: 'Por que o dia da semana importa?', a: 'Não importa muito, mas dá curiosidade e não é algo que se resolva de cabeça. Os dias da semana se repetem num ciclo de 400 anos, então a mesma data cai no mesmo dia 400 anos depois.' },
      { q: 'Quais são os dois signos?', a: 'O signo do zodíaco ocidental, pela data dentro do ano, e o animal do zodíaco do Leste Asiático, pelo ano, num ciclo de doze. Aqui o animal segue o ano civil e não o ano-novo lunar, então datas de janeiro e começo de fevereiro podem divergir de um calendário lunar.' },
    ],
    ui: {
      section: 'Seu aniversário', birthdate: 'Data de nascimento', calc: 'Calcular',
      age: 'Idade', daysLived: 'Dias vividos', nextBirthday: 'Próximo aniversário em',
      daysUnit: 'dias', bornOn: 'Você nasceu numa', turns: 'Você fará',
      starSign: 'Signo do zodíaco', animal: 'Animal do zodíaco',
      z1: 'Áries', z2: 'Touro', z3: 'Gêmeos', z4: 'Câncer', z5: 'Leão', z6: 'Virgem',
      z7: 'Libra', z8: 'Escorpião', z9: 'Sagitário', z10: 'Capricórnio', z11: 'Aquário', z12: 'Peixes',
      a1: 'Rato', a2: 'Boi', a3: 'Tigre', a4: 'Coelho', a5: 'Dragão', a6: 'Serpente',
      a7: 'Cavalo', a8: 'Cabra', a9: 'Macaco', a10: 'Galo', a11: 'Cão', a12: 'Porco',
      note: 'A idade é contada em anos completos. O animal do zodíaco segue o ano civil.',
    },
  },
  ja: {
    title: '誕生日の計算機',
    desc: '生きた日数、次の誕生日までの日数、生まれた曜日を出します',
    short: '生きた日数と次の誕生日',
    intro: [
      {
        h: '年ではなく日で数える',
        p: '年で数えると人生のほとんどが丸められます。実際に生きた日数を数えると、毎朝変わる数字になり、1万日・2万日といった切りのよい節目は誕生日とは別の日に来ます。',
      },
      {
        h: '2月29日生まれ',
        p: '2月29日の誕生日は、4年のうち3年は該当する日がありません。ここではその年のカウントダウンを3月1日に移しています。よくある扱いですが唯一のものではなく、法律上は2月28日とする国もあります。',
      },
    ],
    faq: [
      { q: 'ここでの年齢の数え方は。', a: '生まれてから満で数えた年数で、世界のほとんどで使われている数え方です。1歳になるのは最初の誕生日で、生まれた時点ではありません。' },
      { q: '曜日は何の役に立ちますか。', a: '特に役には立ちませんが、気になるものですし、暗算では出せません。曜日は400年周期で繰り返すので、同じ日付は400年後に同じ曜日になります。' },
      { q: '二つの星座・干支とは何ですか。', a: '年内の日付から出る西洋の星座と、年から出る十二支です。ここでの十二支は旧暦の正月ではなく暦年で切っているので、1月と2月上旬の日付は旧暦の割り当てと違うことがあります。' },
    ],
    ui: {
      section: '誕生日', birthdate: '生年月日', calc: '計算する',
      age: '年齢', daysLived: '生きた日数', nextBirthday: '次の誕生日まで',
      daysUnit: '日', bornOn: '生まれた曜日', turns: '迎える年齢',
      starSign: '星座', animal: '干支',
      z1: 'おひつじ座', z2: 'おうし座', z3: 'ふたご座', z4: 'かに座', z5: 'しし座', z6: 'おとめ座',
      z7: 'てんびん座', z8: 'さそり座', z9: 'いて座', z10: 'やぎ座', z11: 'みずがめ座', z12: 'うお座',
      a1: '子(ねずみ)', a2: '丑(うし)', a3: '寅(とら)', a4: '卯(うさぎ)', a5: '辰(たつ)', a6: '巳(へび)',
      a7: '午(うま)', a8: '未(ひつじ)', a9: '申(さる)', a10: '酉(とり)', a11: '戌(いぬ)', a12: '亥(いのしし)',
      note: '年齢は満年齢です。干支は暦年で切っています。',
    },
  },
  de: {
    title: 'Geburtstagsrechner',
    desc: 'Gelebte Tage, der Countdown bis zum nächsten Geburtstag und der Wochentag Ihrer Geburt',
    short: 'Gelebte Tage · nächster Geburtstag',
    intro: [
      {
        h: 'Alter in Tagen statt in Jahren',
        p: 'Jahre runden fast ein ganzes Leben weg. Zählt man die tatsächlich gelebten Tage, ergibt sich eine Zahl, die sich jeden Morgen ändert — und runde Marken wie zehntausend oder zwanzigtausend Tage fallen irgendwohin, nur nicht auf einen Geburtstag.',
      },
      {
        h: 'Am 29. Februar geboren',
        p: 'Ein Geburtstag am 29. Februar hat in drei von vier Jahren kein Datum. Hier wandert der Countdown in diesen Jahren auf den 1. März — die übliche, aber nicht die einzige Handhabung; manche Rechtsordnungen nehmen für amtliche Zwecke den 28. Februar.',
      },
    ],
    faq: [
      { q: 'Wie wird das Alter hier gezählt?', a: 'In vollendeten Jahren seit der Geburt, wie fast überall üblich. Man wird am ersten Geburtstag ein Jahr alt, nicht bei der Geburt.' },
      { q: 'Wozu der Wochentag?', a: 'Zu nichts Bestimmtem — aber es interessiert, und im Kopf lässt es sich nicht ausrechnen. Wochentage wiederholen sich in einem 400-Jahre-Zyklus; dasselbe Datum fällt 400 Jahre später auf denselben Wochentag.' },
      { q: 'Was sind die beiden Zeichen?', a: 'Das westliche Tierkreiszeichen aus dem Datum im Jahr und das ostasiatische Tierzeichen aus dem Jahr selbst, in einem Zwölfjahreszyklus. Das Tier folgt hier dem Kalenderjahr statt dem Mondneujahr, Daten im Januar und Anfang Februar können daher von einem Mondkalender abweichen.' },
    ],
    ui: {
      section: 'Ihr Geburtstag', birthdate: 'Geburtsdatum', calc: 'Berechnen',
      age: 'Alter', daysLived: 'Gelebte Tage', nextBirthday: 'Nächster Geburtstag in',
      daysUnit: 'Tagen', bornOn: 'Geboren an einem', turns: 'Sie werden',
      starSign: 'Sternzeichen', animal: 'Tierzeichen',
      z1: 'Widder', z2: 'Stier', z3: 'Zwillinge', z4: 'Krebs', z5: 'Löwe', z6: 'Jungfrau',
      z7: 'Waage', z8: 'Skorpion', z9: 'Schütze', z10: 'Steinbock', z11: 'Wassermann', z12: 'Fische',
      a1: 'Ratte', a2: 'Büffel', a3: 'Tiger', a4: 'Hase', a5: 'Drache', a6: 'Schlange',
      a7: 'Pferd', a8: 'Ziege', a9: 'Affe', a10: 'Hahn', a11: 'Hund', a12: 'Schwein',
      note: 'Das Alter zählt vollendete Jahre. Das Tierzeichen folgt dem Kalenderjahr.',
    },
  },
  fr: {
    title: 'Calculateur d’anniversaire',
    desc: 'Jours vécus, compte à rebours jusqu’au prochain anniversaire et jour de la semaine de votre naissance',
    short: 'Jours vécus · prochain anniversaire',
    intro: [
      {
        h: 'L’âge en jours plutôt qu’en années',
        p: 'Les années arrondissent presque toute une vie. Compter les jours réellement vécus donne un nombre qui change chaque matin, et fait tomber les caps ronds — dix mille jours, vingt mille — ailleurs que sur un anniversaire.',
      },
      {
        h: 'Né un 29 février',
        p: 'Un anniversaire au 29 février n’a pas de date trois années sur quatre. Cet outil déplace alors le compte à rebours au 1er mars, convention courante mais pas universelle : certaines législations retiennent le 28 février à des fins juridiques.',
      },
    ],
    faq: [
      { q: 'Comment l’âge est-il compté ici ?', a: 'En années révolues depuis la naissance, la convention en usage presque partout. On a un an à son premier anniversaire, pas à la naissance.' },
      { q: 'À quoi sert le jour de la semaine ?', a: 'À pas grand-chose, mais cela pique la curiosité et ne se calcule pas de tête. Les jours de la semaine se répètent sur un cycle de 400 ans : la même date retombe sur le même jour 400 ans plus tard.' },
      { q: 'Quels sont ces deux signes ?', a: 'Le signe du zodiaque occidental, tiré de la date dans l’année, et l’animal du zodiaque d’Asie orientale, tiré de l’année, sur un cycle de douze. L’animal suit ici l’année civile et non le nouvel an lunaire : les dates de janvier et début février peuvent différer d’un calendrier lunaire.' },
    ],
    ui: {
      section: 'Votre anniversaire', birthdate: 'Date de naissance', calc: 'Calculer',
      age: 'Âge', daysLived: 'Jours vécus', nextBirthday: 'Prochain anniversaire dans',
      daysUnit: 'jours', bornOn: 'Né un', turns: 'Vous aurez',
      starSign: 'Signe astrologique', animal: 'Animal du zodiaque',
      z1: 'Bélier', z2: 'Taureau', z3: 'Gémeaux', z4: 'Cancer', z5: 'Lion', z6: 'Vierge',
      z7: 'Balance', z8: 'Scorpion', z9: 'Sagittaire', z10: 'Capricorne', z11: 'Verseau', z12: 'Poissons',
      a1: 'Rat', a2: 'Bœuf', a3: 'Tigre', a4: 'Lapin', a5: 'Dragon', a6: 'Serpent',
      a7: 'Cheval', a8: 'Chèvre', a9: 'Singe', a10: 'Coq', a11: 'Chien', a12: 'Cochon',
      note: 'L’âge se compte en années révolues. L’animal du zodiaque suit l’année civile.',
    },
  },
  hi: {
    title: 'जन्मदिन कैलकुलेटर',
    desc: 'जिए हुए दिन, अगले जन्मदिन तक की उल्टी गिनती, और जन्म का वार',
    short: 'जिए हुए दिन · अगला जन्मदिन',
    intro: [
      {
        h: 'उम्र सालों में नहीं, दिनों में',
        p: 'साल पूरी ज़िंदगी को गोल कर देते हैं। सचमुच जिए हुए दिन गिनने पर वह संख्या मिलती है जो हर सुबह बदलती है, और दस हज़ार या बीस हज़ार दिन जैसे गोल पड़ाव जन्मदिन के अलावा किसी और दिन पर आ गिरते हैं।',
      },
      {
        h: '29 फ़रवरी को जन्म',
        p: '29 फ़रवरी के जन्मदिन की चार में से तीन साल कोई तारीख़ ही नहीं होती। यह उपकरण उन सालों में उल्टी गिनती 1 मार्च पर ले जाता है — यह आम चलन है, पर सर्वमान्य नहीं; कुछ जगहों पर क़ानूनी कामों के लिए 28 फ़रवरी लिया जाता है।',
      },
    ],
    faq: [
      { q: 'यहाँ उम्र कैसे गिनी जाती है?', a: 'जन्म से पूरे हुए सालों में — लगभग हर जगह यही चलन है। आप पहले जन्मदिन पर एक साल के होते हैं, जन्म के समय नहीं।' },
      { q: 'वार जानने से क्या फ़ायदा?', a: 'ख़ास कोई नहीं, पर जिज्ञासा होती है और यह सिर में निकाला नहीं जा सकता। वार 400 साल के चक्र में दोहराते हैं, इसलिए वही तारीख़ 400 साल बाद उसी वार पर पड़ती है।' },
      { q: 'ये दो चिह्न क्या हैं?', a: 'साल के भीतर की तारीख़ से निकलने वाली पश्चिमी राशि, और साल से निकलने वाला पूर्वी एशियाई राशिचक्र का पशु, जो बारह साल के चक्र में चलता है। यहाँ पशु चंद्र नववर्ष नहीं, कैलेंडर वर्ष के हिसाब से है, इसलिए जनवरी और फ़रवरी की शुरुआत की तारीख़ें चंद्र पंचांग से अलग हो सकती हैं।' },
    ],
    ui: {
      section: 'आपका जन्मदिन', birthdate: 'जन्म तिथि', calc: 'गणना करें',
      age: 'उम्र', daysLived: 'जिए हुए दिन', nextBirthday: 'अगला जन्मदिन',
      daysUnit: 'दिन में', bornOn: 'जन्म का वार', turns: 'आप होंगे',
      starSign: 'राशि', animal: 'राशिचक्र पशु',
      z1: 'मेष', z2: 'वृषभ', z3: 'मिथुन', z4: 'कर्क', z5: 'सिंह', z6: 'कन्या',
      z7: 'तुला', z8: 'वृश्चिक', z9: 'धनु', z10: 'मकर', z11: 'कुंभ', z12: 'मीन',
      a1: 'चूहा', a2: 'बैल', a3: 'बाघ', a4: 'ख़रगोश', a5: 'ड्रैगन', a6: 'साँप',
      a7: 'घोड़ा', a8: 'बकरी', a9: 'बंदर', a10: 'मुर्गा', a11: 'कुत्ता', a12: 'सूअर',
      note: 'उम्र पूरे हुए सालों में गिनी जाती है। राशिचक्र पशु कैलेंडर वर्ष के हिसाब से है।',
    },
  },
  'zh-hans': {
    title: '生日计算器',
    desc: '活过的天数、距下一个生日还有多久，以及你出生那天是星期几',
    short: '活过的天数 · 下个生日',
    intro: [
      {
        h: '用天数而不是年数看年龄',
        p: '按年计会把大半辈子都四舍五入掉。数一数真正活过的天数，得到的是一个每天早晨都会变的数字，而一万天、两万天这样的整数关口，也会落在生日以外的某一天。',
      },
      {
        h: '生在 2 月 29 日',
        p: '2 月 29 日的生日，每四年有三年根本没有这一天。本工具在这些年份把倒数挪到 3 月 1 日——这是常见做法，但并非唯一；有些地方在法律事务上取 2 月 28 日。',
      },
    ],
    faq: [
      { q: '这里的年龄怎么算？', a: '按出生后满的周年算，几乎所有地方通行的算法。第一个生日才满一岁，出生当天不算。' },
      { q: '知道星期几有什么用？', a: '没什么特别的用处，但人总会好奇，而且这在脑子里算不出来。星期以 400 年为周期重复，所以同一个日期在 400 年后仍落在同一个星期几。' },
      { q: '这两个属相分别是什么？', a: '一个是按年内日期得出的西方星座，一个是按年份得出的生肖，十二年一轮。这里的生肖按公历年份切分，不按农历新年，所以一月和二月初的日期可能和农历的归属不同。' },
    ],
    ui: {
      section: '你的生日', birthdate: '出生日期', calc: '计算',
      age: '年龄', daysLived: '活过的天数', nextBirthday: '距下个生日',
      daysUnit: '天', bornOn: '出生那天是', turns: '你将满',
      starSign: '星座', animal: '生肖',
      z1: '白羊座', z2: '金牛座', z3: '双子座', z4: '巨蟹座', z5: '狮子座', z6: '处女座',
      z7: '天秤座', z8: '天蝎座', z9: '射手座', z10: '摩羯座', z11: '水瓶座', z12: '双鱼座',
      a1: '鼠', a2: '牛', a3: '虎', a4: '兔', a5: '龙', a6: '蛇',
      a7: '马', a8: '羊', a9: '猴', a10: '鸡', a11: '狗', a12: '猪',
      note: '年龄按满周年计算。生肖按公历年份切分。',
    },
  },
  'zh-hant': {
    title: '生日計算機',
    desc: '活過的天數、距下一個生日還有多久，以及你出生那天是星期幾',
    short: '活過的天數 · 下個生日',
    intro: [
      {
        h: '用天數而不是年數看年齡',
        p: '按年計會把大半輩子都四捨五入掉。數一數真正活過的天數，得到的是一個每天早晨都會變的數字，而一萬天、兩萬天這樣的整數關口，也會落在生日以外的某一天。',
      },
      {
        h: '生在 2 月 29 日',
        p: '2 月 29 日的生日，每四年有三年根本沒有這一天。本工具在這些年份把倒數挪到 3 月 1 日——這是常見做法，但並非唯一；有些地方在法律事務上取 2 月 28 日。',
      },
    ],
    faq: [
      { q: '這裡的年齡怎麼算？', a: '按出生後滿的週年算，幾乎所有地方通行的算法。第一個生日才滿一歲，出生當天不算。' },
      { q: '知道星期幾有什麼用？', a: '沒什麼特別的用處，但人總會好奇，而且這在腦子裡算不出來。星期以 400 年為週期重複，所以同一個日期在 400 年後仍落在同一個星期幾。' },
      { q: '這兩個生肖星座分別是什麼？', a: '一個是按年內日期得出的西方星座，一個是按年份得出的生肖，十二年一輪。這裡的生肖按西曆年份切分，不按農曆新年，所以一月和二月初的日期可能和農曆的歸屬不同。' },
    ],
    ui: {
      section: '你的生日', birthdate: '出生日期', calc: '計算',
      age: '年齡', daysLived: '活過的天數', nextBirthday: '距下個生日',
      daysUnit: '天', bornOn: '出生那天是', turns: '你將滿',
      starSign: '星座', animal: '生肖',
      z1: '牡羊座', z2: '金牛座', z3: '雙子座', z4: '巨蟹座', z5: '獅子座', z6: '處女座',
      z7: '天秤座', z8: '天蠍座', z9: '射手座', z10: '摩羯座', z11: '水瓶座', z12: '雙魚座',
      a1: '鼠', a2: '牛', a3: '虎', a4: '兔', a5: '龍', a6: '蛇',
      a7: '馬', a8: '羊', a9: '猴', a10: '雞', a11: '狗', a12: '豬',
      note: '年齡按滿週年計算。生肖按西曆年份切分。',
    },
  },
};

export const OVULATION: CalcTable = {
  en: {
    title: 'Ovulation calculator',
    desc: 'The likely fertile window and next period from your last period and cycle length',
    short: 'Fertile window · next period',
    intro: [
      {
        h: 'Counted backwards from the next period',
        p: 'Ovulation is roughly fourteen days before the next period starts, not fourteen days after the last one began. The luteal phase — the second half — is the stable part; the first half is what varies. On a 32-day cycle ovulation falls near day 18, not day 14.',
      },
      {
        h: 'The window opens before ovulation, not after',
        p: 'Sperm survive several days in the reproductive tract; an egg lives about a day. That makes the fertile window the five days before ovulation plus the day itself, which is why timing something for the day after is usually too late.',
      },
      {
        h: 'There is no safe period',
        p: 'Cycles shift with illness, stress, travel and sleep, and ovulation moves with them. Calendar methods have a high failure rate as contraception. Use this to understand your cycle, not to avoid pregnancy.',
      },
    ],
    faq: [
      { q: 'How accurate is it if my cycles are irregular?', a: 'Much less. The calculation assumes the length you enter repeats. If your cycles vary by more than a few days, ovulation tests or basal temperature tracking tell you far more than a calendar can.' },
      { q: 'Where does the cycle length come from?', a: 'Count from the first day of one period to the day before the next starts. Averaging three cycles gives a steadier number than the most recent one.' },
      { q: 'Can I use this to avoid pregnancy?', a: 'No. Calendar-based prediction is unreliable for that. Speak to a healthcare provider about methods that work.' },
    ],
    ui: {
      section: 'Your cycle', lastPeriod: 'First day of your last period',
      cycle: 'Cycle length (days)', periodDays: 'Period length (days)', calc: 'Calculate',
      ovulation: 'Likely ovulation', fertile: 'Fertile window', nextPeriod: 'Next period expected',
      to: 'to', note: 'An estimate from calendar arithmetic. Not a contraceptive method, and not medical advice.',
    },
  },
  es: {
    title: 'Calculadora de ovulación',
    desc: 'La ventana fértil probable y la próxima regla a partir de tu última regla y la duración del ciclo',
    short: 'Ventana fértil · próxima regla',
    intro: [
      {
        h: 'Se cuenta hacia atrás desde la próxima regla',
        p: 'La ovulación cae unos catorce días antes de que empiece la siguiente regla, no catorce días después de que empezara la anterior. La fase lútea —la segunda mitad— es la parte estable; lo que varía es la primera. En un ciclo de 32 días la ovulación cae cerca del día 18, no del 14.',
      },
      {
        h: 'La ventana se abre antes de ovular, no después',
        p: 'Los espermatozoides sobreviven varios días en el aparato reproductor; el óvulo vive alrededor de un día. Por eso la ventana fértil son los cinco días previos a la ovulación más el propio día, y por eso apuntar al día siguiente suele llegar tarde.',
      },
      {
        h: 'No existe un periodo seguro',
        p: 'Los ciclos se desplazan con enfermedades, estrés, viajes y sueño, y la ovulación se mueve con ellos. Los métodos de calendario tienen una tasa de fallo alta como anticonceptivo. Usa esto para entender tu ciclo, no para evitar un embarazo.',
      },
    ],
    faq: [
      { q: '¿Qué precisión tiene si mis ciclos son irregulares?', a: 'Mucha menos. El cálculo asume que la duración que introduces se repite. Si tus ciclos varían más de unos pocos días, los test de ovulación o la temperatura basal dicen mucho más que un calendario.' },
      { q: '¿De dónde sale la duración del ciclo?', a: 'Cuenta desde el primer día de una regla hasta el día anterior al inicio de la siguiente. Promediar tres ciclos da un número más estable que el último.' },
      { q: '¿Puedo usarlo para evitar el embarazo?', a: 'No. La predicción por calendario no es fiable para eso. Consulta con un profesional sanitario sobre métodos que funcionen.' },
    ],
    ui: {
      section: 'Tu ciclo', lastPeriod: 'Primer día de tu última regla',
      cycle: 'Duración del ciclo (días)', periodDays: 'Duración de la regla (días)', calc: 'Calcular',
      ovulation: 'Ovulación probable', fertile: 'Ventana fértil', nextPeriod: 'Próxima regla prevista',
      to: 'al', note: 'Estimación por aritmética de calendario. No es un método anticonceptivo ni consejo médico.',
    },
  },
  'pt-br': {
    title: 'Calculadora de ovulação',
    desc: 'A janela fértil provável e a próxima menstruação, a partir da última e da duração do ciclo',
    short: 'Janela fértil · próxima menstruação',
    intro: [
      {
        h: 'Conta-se de trás para frente, a partir da próxima menstruação',
        p: 'A ovulação ocorre cerca de catorze dias antes de a próxima menstruação começar, e não catorze dias depois de a anterior ter começado. A fase lútea — a segunda metade — é a parte estável; o que varia é a primeira. Num ciclo de 32 dias, a ovulação cai perto do dia 18, não do 14.',
      },
      {
        h: 'A janela abre antes da ovulação, não depois',
        p: 'Espermatozoides sobrevivem vários dias no trato reprodutivo; o óvulo vive cerca de um dia. Por isso a janela fértil são os cinco dias antes da ovulação mais o próprio dia — e por isso mirar no dia seguinte costuma ser tarde demais.',
      },
      {
        h: 'Não existe período seguro',
        p: 'Ciclos se deslocam com doença, estresse, viagem e sono, e a ovulação vai junto. Métodos de calendário têm alta taxa de falha como contracepção. Use isto para entender seu ciclo, não para evitar gravidez.',
      },
    ],
    faq: [
      { q: 'Qual a precisão se meus ciclos são irregulares?', a: 'Bem menor. O cálculo supõe que a duração informada se repete. Se seus ciclos variam mais que uns poucos dias, testes de ovulação ou temperatura basal dizem muito mais que um calendário.' },
      { q: 'De onde vem a duração do ciclo?', a: 'Conte do primeiro dia de uma menstruação até o dia anterior ao início da seguinte. A média de três ciclos dá um número mais estável que o último isolado.' },
      { q: 'Posso usar isto para evitar gravidez?', a: 'Não. Previsão por calendário não é confiável para isso. Converse com um profissional de saúde sobre métodos que funcionam.' },
    ],
    ui: {
      section: 'Seu ciclo', lastPeriod: 'Primeiro dia da última menstruação',
      cycle: 'Duração do ciclo (dias)', periodDays: 'Duração da menstruação (dias)', calc: 'Calcular',
      ovulation: 'Ovulação provável', fertile: 'Janela fértil', nextPeriod: 'Próxima menstruação prevista',
      to: 'a', note: 'Estimativa por aritmética de calendário. Não é método contraceptivo nem orientação médica.',
    },
  },
  ja: {
    title: '排卵日の計算機',
    desc: '前回の生理日と周期の長さから、妊娠しやすい期間と次回の生理予定日を出します',
    short: '妊娠しやすい期間と次回予定',
    intro: [
      {
        h: '次の生理から逆算します',
        p: '排卵は、前回の生理開始から14日後ではなく、次の生理が始まるおよそ14日前に起こります。安定しているのは後半の黄体期で、長さが変わるのは前半です。周期が32日なら排卵は14日目ではなく18日目あたりになります。',
      },
      {
        h: '期間が開くのは排卵の前で、後ではありません',
        p: '精子は体内で数日生き延びますが、卵子の寿命は1日ほどです。そのため妊娠しやすいのは排卵前の5日間と当日で、翌日に合わせても遅いことが多いのはこのためです。',
      },
      {
        h: '「安全日」はありません',
        p: '周期は体調・ストレス・移動・睡眠で動き、排卵もそれに合わせてずれます。カレンダー法は避妊としては失敗率が高い方法です。ここは自分の周期を把握するために使ってください。避妊のためではありません。',
      },
    ],
    faq: [
      { q: '周期が不規則な場合、どのくらい当たりますか。', a: 'かなり落ちます。入力した長さがそのまま繰り返される前提だからです。数日以上ばらつくなら、排卵検査薬や基礎体温のほうがカレンダーよりずっと多くを教えてくれます。' },
      { q: '周期の長さはどう数えますか。', a: '生理が始まった日から、次の生理が始まる前日までを数えます。直近の1回より、3周期の平均のほうが安定した数字になります。' },
      { q: '避妊のために使えますか。', a: '使えません。カレンダーによる予測は避妊としては信頼できません。有効な方法については医療者に相談してください。' },
    ],
    ui: {
      section: '周期の情報', lastPeriod: '前回の生理開始日',
      cycle: '周期の長さ (日)', periodDays: '生理期間の長さ (日)', calc: '計算する',
      ovulation: '排卵日の目安', fertile: '妊娠しやすい期間', nextPeriod: '次回の生理予定日',
      to: '〜', note: 'カレンダー計算による目安です。避妊法ではなく、医学的助言でもありません。',
    },
  },
  de: {
    title: 'Eisprungrechner',
    desc: 'Das wahrscheinliche fruchtbare Fenster und die nächste Periode aus letzter Periode und Zykluslänge',
    short: 'Fruchtbares Fenster · nächste Periode',
    intro: [
      {
        h: 'Rückwärts von der nächsten Periode gerechnet',
        p: 'Der Eisprung liegt etwa vierzehn Tage vor Beginn der nächsten Periode, nicht vierzehn Tage nach Beginn der letzten. Stabil ist die zweite Hälfte, die Lutealphase; was schwankt, ist die erste. Bei einem 32-Tage-Zyklus fällt der Eisprung um Tag 18, nicht um Tag 14.',
      },
      {
        h: 'Das Fenster öffnet vor dem Eisprung, nicht danach',
        p: 'Spermien überleben mehrere Tage im Genitaltrakt, die Eizelle lebt etwa einen Tag. Das fruchtbare Fenster sind daher die fünf Tage vor dem Eisprung plus der Tag selbst — und deshalb kommt der Tag danach meist zu spät.',
      },
      {
        h: 'Es gibt keine sicheren Tage',
        p: 'Zyklen verschieben sich durch Krankheit, Stress, Reisen und Schlaf, und der Eisprung wandert mit. Kalendermethoden haben als Verhütung eine hohe Versagensrate. Nutzen Sie das hier, um Ihren Zyklus zu verstehen, nicht um eine Schwangerschaft zu vermeiden.',
      },
    ],
    faq: [
      { q: 'Wie genau ist das bei unregelmäßigen Zyklen?', a: 'Deutlich ungenauer. Die Rechnung unterstellt, dass die eingegebene Länge sich wiederholt. Schwanken Ihre Zyklen um mehr als ein paar Tage, sagen Ovulationstests oder die Basaltemperatur weit mehr als ein Kalender.' },
      { q: 'Woher nehme ich die Zykluslänge?', a: 'Vom ersten Tag einer Periode bis zum Tag vor Beginn der nächsten. Der Mittelwert aus drei Zyklen ist stabiler als der letzte einzelne.' },
      { q: 'Kann ich damit verhüten?', a: 'Nein. Kalendergestützte Vorhersage ist dafür unzuverlässig. Sprechen Sie über wirksame Methoden mit einer Ärztin oder einem Arzt.' },
    ],
    ui: {
      section: 'Ihr Zyklus', lastPeriod: 'Erster Tag der letzten Periode',
      cycle: 'Zykluslänge (Tage)', periodDays: 'Dauer der Periode (Tage)', calc: 'Berechnen',
      ovulation: 'Wahrscheinlicher Eisprung', fertile: 'Fruchtbares Fenster', nextPeriod: 'Nächste Periode erwartet',
      to: 'bis', note: 'Schätzung aus Kalenderarithmetik. Keine Verhütungsmethode und keine medizinische Beratung.',
    },
  },
  fr: {
    title: 'Calculateur d’ovulation',
    desc: 'La fenêtre fertile probable et les prochaines règles, à partir des dernières règles et de la durée du cycle',
    short: 'Fenêtre fertile · prochaines règles',
    intro: [
      {
        h: 'On compte à rebours depuis les prochaines règles',
        p: 'L’ovulation survient environ quatorze jours avant le début des règles suivantes, et non quatorze jours après le début des précédentes. C’est la seconde moitié, la phase lutéale, qui est stable ; c’est la première qui varie. Sur un cycle de 32 jours, l’ovulation tombe vers le jour 18, pas le jour 14.',
      },
      {
        h: 'La fenêtre s’ouvre avant l’ovulation, pas après',
        p: 'Les spermatozoïdes survivent plusieurs jours dans les voies génitales ; l’ovule vit environ un jour. La fenêtre fertile est donc constituée des cinq jours précédant l’ovulation plus le jour même — d’où le fait que viser le lendemain arrive généralement trop tard.',
      },
      {
        h: 'Il n’y a pas de période sans risque',
        p: 'Les cycles se décalent avec la maladie, le stress, les voyages et le sommeil, et l’ovulation se décale avec eux. Les méthodes calendaires ont un taux d’échec élevé comme contraception. Servez-vous de ceci pour comprendre votre cycle, pas pour éviter une grossesse.',
      },
    ],
    faq: [
      { q: 'Quelle précision si mes cycles sont irréguliers ?', a: 'Bien moindre. Le calcul suppose que la durée saisie se répète. Si vos cycles varient de plus de quelques jours, les tests d’ovulation ou la température basale en disent bien plus qu’un calendrier.' },
      { q: 'D’où vient la durée du cycle ?', a: 'Comptez du premier jour des règles jusqu’à la veille du début des suivantes. La moyenne de trois cycles donne un chiffre plus stable que le dernier seul.' },
      { q: 'Puis-je m’en servir comme contraception ?', a: 'Non. La prédiction par calendrier n’est pas fiable pour cela. Parlez de méthodes efficaces avec un professionnel de santé.' },
    ],
    ui: {
      section: 'Votre cycle', lastPeriod: 'Premier jour des dernières règles',
      cycle: 'Durée du cycle (jours)', periodDays: 'Durée des règles (jours)', calc: 'Calculer',
      ovulation: 'Ovulation probable', fertile: 'Fenêtre fertile', nextPeriod: 'Prochaines règles prévues',
      to: 'au', note: 'Estimation par arithmétique calendaire. Ni méthode contraceptive, ni avis médical.',
    },
  },
  hi: {
    title: 'ओव्यूलेशन कैलकुलेटर',
    desc: 'पिछली माहवारी और चक्र की लंबाई से संभावित उपजाऊ अवधि और अगली माहवारी',
    short: 'उपजाऊ अवधि · अगली माहवारी',
    intro: [
      {
        h: 'गिनती अगली माहवारी से उल्टी चलती है',
        p: 'ओव्यूलेशन अगली माहवारी शुरू होने से लगभग चौदह दिन पहले होता है, पिछली माहवारी शुरू होने के चौदह दिन बाद नहीं। स्थिर हिस्सा दूसरा आधा — ल्यूटियल चरण — है; बदलता पहला आधा है। 32 दिन के चक्र में ओव्यूलेशन 14वें नहीं, 18वें दिन के आसपास पड़ता है।',
      },
      {
        h: 'उपजाऊ खिड़की ओव्यूलेशन से पहले खुलती है, बाद में नहीं',
        p: 'शुक्राणु प्रजनन मार्ग में कई दिन जीवित रह सकते हैं; अंडाणु लगभग एक दिन। इसीलिए उपजाऊ अवधि ओव्यूलेशन से पहले के पाँच दिन और वह दिन ख़ुद है — और इसीलिए अगले दिन का समय चुनना अक्सर देर हो जाती है।',
      },
      {
        h: '"सुरक्षित दिन" जैसी कोई चीज़ नहीं है',
        p: 'बीमारी, तनाव, यात्रा और नींद से चक्र खिसकते हैं, और ओव्यूलेशन उनके साथ खिसकता है। गर्भनिरोध के रूप में कैलेंडर विधि की विफलता दर ऊँची है। इसका इस्तेमाल अपना चक्र समझने के लिए कीजिए, गर्भ टालने के लिए नहीं।',
      },
    ],
    faq: [
      { q: 'चक्र अनियमित हों तो यह कितना सटीक है?', a: 'काफ़ी कम। गणना मानकर चलती है कि आपकी डाली हुई लंबाई दोहराएगी। अगर चक्र कुछ दिनों से ज़्यादा बदलते हैं, तो ओव्यूलेशन जाँच या बेसल तापमान कैलेंडर से कहीं ज़्यादा बताते हैं।' },
      { q: 'चक्र की लंबाई कैसे निकालूँ?', a: 'एक माहवारी के पहले दिन से अगली माहवारी शुरू होने के एक दिन पहले तक गिनिए। तीन चक्रों का औसत, अकेले पिछले चक्र से ज़्यादा स्थिर आंकड़ा देता है।' },
      { q: 'क्या इसे गर्भनिरोध के लिए इस्तेमाल कर सकती हूँ?', a: 'नहीं। इसके लिए कैलेंडर आधारित अनुमान भरोसेमंद नहीं है। कारगर तरीक़ों के बारे में स्वास्थ्यकर्मी से बात करें।' },
    ],
    ui: {
      section: 'आपका चक्र', lastPeriod: 'पिछली माहवारी का पहला दिन',
      cycle: 'चक्र की लंबाई (दिन)', periodDays: 'माहवारी की लंबाई (दिन)', calc: 'गणना करें',
      ovulation: 'संभावित ओव्यूलेशन', fertile: 'उपजाऊ अवधि', nextPeriod: 'अगली माहवारी अपेक्षित',
      to: 'से', note: 'कैलेंडर गणित से लगाया अनुमान। न गर्भनिरोधक विधि, न चिकित्सकीय सलाह।',
    },
  },
  'zh-hans': {
    title: '排卵期计算器',
    desc: '根据上次月经和周期长度，推算可能的易孕期和下次月经',
    short: '易孕期 · 下次月经',
    intro: [
      {
        h: '要从下次月经往回推',
        p: '排卵大约发生在下次月经开始前十四天，而不是上次月经开始后十四天。稳定的是后半段的黄体期，会变的是前半段。周期 32 天的话，排卵落在第 18 天前后，而不是第 14 天。',
      },
      {
        h: '易孕窗口开在排卵之前，不是之后',
        p: '精子在生殖道里能存活好几天，卵子只能活一天左右。所以易孕期是排卵前的五天加上当天——这也是为什么把时间安排在排卵后一天通常已经晚了。',
      },
      {
        h: '不存在"安全期"',
        p: '生病、压力、出行和睡眠都会让周期挪动，排卵也跟着挪。作为避孕手段，日历法失败率很高。请用它来了解自己的周期，而不是用来避孕。',
      },
    ],
    faq: [
      { q: '周期不规律的话准不准？', a: '准确度会下降很多。这个算法假设你填的周期长度会重复出现。如果周期波动超过几天，排卵试纸或基础体温比日历能告诉你的多得多。' },
      { q: '周期长度怎么数？', a: '从一次月经的第一天，数到下一次月经开始的前一天。取三个周期的平均，比只看最近一次更稳定。' },
      { q: '能拿它来避孕吗？', a: '不能。日历推算在这件事上并不可靠。请就有效的方法咨询医务人员。' },
    ],
    ui: {
      section: '你的周期', lastPeriod: '上次月经的第一天',
      cycle: '周期长度（天）', periodDays: '月经持续（天）', calc: '计算',
      ovulation: '可能的排卵日', fertile: '易孕期', nextPeriod: '下次月经预计',
      to: '至', note: '基于日历推算的估计。它不是避孕方法，也不构成医疗建议。',
    },
  },
  'zh-hant': {
    title: '排卵期計算機',
    desc: '根據上次月經和週期長度，推算可能的易孕期和下次月經',
    short: '易孕期 · 下次月經',
    intro: [
      {
        h: '要從下次月經往回推',
        p: '排卵大約發生在下次月經開始前十四天，而不是上次月經開始後十四天。穩定的是後半段的黃體期，會變的是前半段。週期 32 天的話，排卵落在第 18 天前後，而不是第 14 天。',
      },
      {
        h: '易孕窗口開在排卵之前，不是之後',
        p: '精子在生殖道裡能存活好幾天，卵子只能活一天左右。所以易孕期是排卵前的五天加上當天——這也是為什麼把時間安排在排卵後一天通常已經晚了。',
      },
      {
        h: '不存在「安全期」',
        p: '生病、壓力、出行和睡眠都會讓週期挪動，排卵也跟著挪。作為避孕手段，日曆法失敗率很高。請用它來了解自己的週期，而不是用來避孕。',
      },
    ],
    faq: [
      { q: '週期不規律的話準不準？', a: '準確度會下降很多。這個算法假設你填的週期長度會重複出現。如果週期波動超過幾天，排卵試紙或基礎體溫比日曆能告訴你的多得多。' },
      { q: '週期長度怎麼數？', a: '從一次月經的第一天，數到下一次月經開始的前一天。取三個週期的平均，比只看最近一次更穩定。' },
      { q: '能拿它來避孕嗎？', a: '不能。日曆推算在這件事上並不可靠。請就有效的方法諮詢醫護人員。' },
    ],
    ui: {
      section: '你的週期', lastPeriod: '上次月經的第一天',
      cycle: '週期長度（天）', periodDays: '月經持續（天）', calc: '計算',
      ovulation: '可能的排卵日', fertile: '易孕期', nextPeriod: '下次月經預計',
      to: '至', note: '基於日曆推算的估計。它不是避孕方法，也不構成醫療建議。',
    },
  },
};

export const PREGNANCY: CalcTable = {
  en: {
    title: 'Due date calculator',
    desc: 'Estimated due date and how far along you are, from your last period',
    short: 'Due date · weeks along',
    intro: [
      {
        h: 'Forty weeks from the last period, not from conception',
        p: 'Pregnancy is dated from the first day of the last menstrual period, which is roughly two weeks before conception actually happens. That convention makes a pregnancy forty weeks rather than thirty-eight, and it is why you are counted as two weeks pregnant before there is anything to be pregnant with.',
      },
      {
        h: 'The due date is a midpoint, not an appointment',
        p: 'Fewer than one birth in twenty happens on the estimated date. Most arrive within two weeks either side, and a first baby tends to be late. Treating the date as a centre of a range rather than a deadline saves a lot of anxiety in the last month.',
      },
      {
        h: 'A scan beats the arithmetic',
        p: 'This calculation assumes a 28-day cycle with ovulation on day 14. Early ultrasound dating measures the pregnancy itself and is more accurate, so if a scan has given you a date, that is the one to use.',
      },
    ],
    faq: [
      { q: 'What if my cycle is not 28 days?', a: 'Adjust the cycle length field and the due date shifts with it. A 35-day cycle pushes ovulation about a week later, and the due date with it.' },
      { q: 'What are the trimesters?', a: 'Weeks 1–13, 14–27 and 28 onwards, though the exact boundaries vary between sources by a week or so. They are a convenience for describing the pregnancy, not clinical thresholds.' },
      { q: 'How is the due date calculated?', a: 'By Naegele\'s rule: last period plus 280 days, adjusted here for cycles other than 28 days. It has been in use since the nineteenth century and remains the standard starting point.' },
    ],
    ui: {
      section: 'Your dates', lastPeriod: 'First day of your last period',
      cycle: 'Cycle length (days)', calc: 'Calculate',
      dueDate: 'Estimated due date', current: 'You are', weeks: 'weeks', days: 'days',
      trimester: 'Trimester', t1: 'First', t2: 'Second', t3: 'Third',
      remaining: 'Days to go', conception: 'Estimated conception',
      note: 'Naegele\'s rule, adjusted for cycle length. An ultrasound date is more accurate. Not medical advice.',
    },
  },
  es: {
    title: 'Calculadora de fecha de parto',
    desc: 'Fecha probable de parto y semanas de embarazo a partir de tu última regla',
    short: 'Fecha de parto · semanas',
    intro: [
      {
        h: 'Cuarenta semanas desde la última regla, no desde la concepción',
        p: 'El embarazo se data desde el primer día de la última menstruación, unas dos semanas antes de que ocurra la concepción. Esa convención hace que el embarazo dure cuarenta semanas y no treinta y ocho, y es la razón de que se cuenten dos semanas de embarazo antes de que haya embarazo.',
      },
      {
        h: 'La fecha de parto es un punto medio, no una cita',
        p: 'Menos de un parto de cada veinte ocurre en la fecha estimada. La mayoría llegan dentro de las dos semanas anteriores o posteriores, y un primer hijo tiende a retrasarse. Tomar la fecha como centro de un rango y no como plazo ahorra mucha ansiedad en el último mes.',
      },
      {
        h: 'Una ecografía gana a la aritmética',
        p: 'Este cálculo supone un ciclo de 28 días con ovulación el día 14. La datación por ecografía temprana mide el embarazo en sí y es más precisa, así que si una ecografía te ha dado una fecha, esa es la que vale.',
      },
    ],
    faq: [
      { q: '¿Y si mi ciclo no es de 28 días?', a: 'Ajusta el campo de duración del ciclo y la fecha se desplaza con él. Un ciclo de 35 días retrasa la ovulación una semana, y la fecha de parto con ella.' },
      { q: '¿Qué son los trimestres?', a: 'Semanas 1–13, 14–27 y de la 28 en adelante, aunque los límites exactos varían una semana según la fuente. Son una comodidad para describir el embarazo, no umbrales clínicos.' },
      { q: '¿Cómo se calcula la fecha?', a: 'Por la regla de Naegele: última regla más 280 días, ajustada aquí para ciclos distintos de 28 días. Se usa desde el siglo XIX y sigue siendo el punto de partida estándar.' },
    ],
    ui: {
      section: 'Tus fechas', lastPeriod: 'Primer día de tu última regla',
      cycle: 'Duración del ciclo (días)', calc: 'Calcular',
      dueDate: 'Fecha probable de parto', current: 'Estás de', weeks: 'semanas', days: 'días',
      trimester: 'Trimestre', t1: 'Primero', t2: 'Segundo', t3: 'Tercero',
      remaining: 'Días restantes', conception: 'Concepción estimada',
      note: 'Regla de Naegele ajustada por ciclo. Una fecha por ecografía es más precisa. No es consejo médico.',
    },
  },
  'pt-br': {
    title: 'Calculadora de data provável do parto',
    desc: 'Data provável do parto e semanas de gestação a partir da última menstruação',
    short: 'Data do parto · semanas',
    intro: [
      {
        h: 'Quarenta semanas desde a última menstruação, não desde a concepção',
        p: 'A gestação é datada a partir do primeiro dia da última menstruação, cerca de duas semanas antes de a concepção realmente acontecer. Essa convenção faz a gravidez ter quarenta semanas e não trinta e oito, e é por isso que se conta duas semanas de gestação antes de haver gestação.',
      },
      {
        h: 'A data provável é um ponto médio, não um compromisso',
        p: 'Menos de um parto em vinte ocorre na data estimada. A maioria chega dentro de duas semanas para mais ou para menos, e o primeiro filho costuma atrasar. Tratar a data como centro de uma faixa, e não como prazo, poupa muita ansiedade no último mês.',
      },
      {
        h: 'Uma ultrassonografia vence a aritmética',
        p: 'Este cálculo supõe ciclo de 28 dias com ovulação no dia 14. A datação por ultrassom precoce mede a própria gestação e é mais precisa; se um exame já lhe deu uma data, é essa que vale.',
      },
    ],
    faq: [
      { q: 'E se meu ciclo não for de 28 dias?', a: 'Ajuste o campo de duração do ciclo e a data se desloca junto. Um ciclo de 35 dias empurra a ovulação cerca de uma semana, e a data do parto vai junto.' },
      { q: 'O que são os trimestres?', a: 'Semanas 1–13, 14–27 e da 28 em diante, embora os limites exatos variem uma semana conforme a fonte. São uma conveniência para descrever a gestação, não limiares clínicos.' },
      { q: 'Como a data é calculada?', a: 'Pela regra de Naegele: última menstruação mais 280 dias, ajustada aqui para ciclos diferentes de 28 dias. É usada desde o século XIX e continua sendo o ponto de partida padrão.' },
    ],
    ui: {
      section: 'Suas datas', lastPeriod: 'Primeiro dia da última menstruação',
      cycle: 'Duração do ciclo (dias)', calc: 'Calcular',
      dueDate: 'Data provável do parto', current: 'Você está com', weeks: 'semanas', days: 'dias',
      trimester: 'Trimestre', t1: 'Primeiro', t2: 'Segundo', t3: 'Terceiro',
      remaining: 'Dias restantes', conception: 'Concepção estimada',
      note: 'Regra de Naegele ajustada pelo ciclo. Uma data por ultrassom é mais precisa. Não é orientação médica.',
    },
  },
  ja: {
    title: '出産予定日の計算機',
    desc: '最終月経日から出産予定日と現在の妊娠週数を出します',
    short: '予定日と妊娠週数',
    intro: [
      {
        h: '受精からではなく、最終月経から40週',
        p: '妊娠週数は最終月経の初日から数えます。実際の受精はそのおよそ2週間後です。この決め方のために妊娠期間は38週ではなく40週になり、まだ何も始まっていない時点で「妊娠2週」と数えられることになります。',
      },
      {
        h: '予定日は幅の真ん中であって、約束の日ではありません',
        p: '予定日ちょうどに生まれるのは20人に1人もいません。多くはその前後2週間のうちに生まれ、初産は遅れがちです。締切ではなく幅の中心だと考えると、最後のひと月の気持ちがずいぶん楽になります。',
      },
      {
        h: '超音波のほうが計算より確かです',
        p: 'ここでは28日周期・14日目排卵を前提にしています。妊娠初期の超音波は妊娠そのものを測るので、より正確です。検査で予定日が出ているなら、そちらを使ってください。',
      },
    ],
    faq: [
      { q: '周期が28日でない場合は。', a: '周期の長さの欄を変えれば予定日もずれます。35日周期なら排卵が1週間ほど遅くなり、予定日も同じだけ後ろへ動きます。' },
      { q: '妊娠初期・中期・後期の区切りは。', a: '1〜13週、14〜27週、28週以降が一般的ですが、資料によって1週ほど境目が違います。臨床上の閾値ではなく、説明のための便宜的な区切りです。' },
      { q: '予定日はどう計算しますか。', a: 'ネーゲレの概算法です。最終月経に280日を足し、ここでは28日以外の周期に合わせて補正しています。19世紀から使われており、今も出発点として標準です。' },
    ],
    ui: {
      section: '日付の入力', lastPeriod: '最終月経の開始日',
      cycle: '周期の長さ (日)', calc: '計算する',
      dueDate: '出産予定日', current: '現在', weeks: '週', days: '日',
      trimester: '時期', t1: '初期', t2: '中期', t3: '後期',
      remaining: '予定日まで', conception: '受精のおおよその時期',
      note: 'ネーゲレの概算法を周期に合わせて補正したものです。超音波による予定日のほうが正確です。医学的助言ではありません。',
    },
  },
  de: {
    title: 'Geburtsterminrechner',
    desc: 'Voraussichtlicher Geburtstermin und aktuelle Schwangerschaftswoche aus der letzten Periode',
    short: 'Termin · Schwangerschaftswoche',
    intro: [
      {
        h: 'Vierzig Wochen ab letzter Periode, nicht ab Zeugung',
        p: 'Die Schwangerschaft wird ab dem ersten Tag der letzten Regelblutung datiert, rund zwei Wochen bevor die Zeugung tatsächlich stattfindet. Deshalb dauert eine Schwangerschaft vierzig statt achtunddreißig Wochen — und deshalb zählt man zwei Wochen schwanger, bevor überhaupt etwas da ist.',
      },
      {
        h: 'Der Termin ist eine Mitte, kein Datum im Kalender',
        p: 'Weniger als eine von zwanzig Geburten fällt auf den errechneten Termin. Die meisten kommen zwei Wochen davor oder danach, und ein erstes Kind lässt eher auf sich warten. Den Termin als Mitte einer Spanne zu verstehen statt als Frist erspart im letzten Monat viel Unruhe.',
      },
      {
        h: 'Ein Ultraschall schlägt die Rechnung',
        p: 'Diese Rechnung unterstellt einen 28-Tage-Zyklus mit Eisprung an Tag 14. Die frühe Ultraschalldatierung misst die Schwangerschaft selbst und ist genauer; liegt ein Termin aus dem Ultraschall vor, gilt dieser.',
      },
    ],
    faq: [
      { q: 'Und wenn mein Zyklus nicht 28 Tage hat?', a: 'Passen Sie das Feld für die Zykluslänge an, der Termin verschiebt sich mit. Ein 35-Tage-Zyklus schiebt den Eisprung rund eine Woche nach hinten, den Termin ebenso.' },
      { q: 'Was sind die Trimester?', a: 'Woche 1–13, 14–27 und ab 28, wobei die genauen Grenzen je nach Quelle um etwa eine Woche schwanken. Sie sind eine Beschreibungshilfe, keine klinischen Schwellen.' },
      { q: 'Wie wird der Termin berechnet?', a: 'Nach der Naegele-Regel: letzte Periode plus 280 Tage, hier korrigiert für Zyklen jenseits von 28 Tagen. Sie ist seit dem 19. Jahrhundert in Gebrauch und bleibt der übliche Ausgangspunkt.' },
    ],
    ui: {
      section: 'Ihre Daten', lastPeriod: 'Erster Tag der letzten Periode',
      cycle: 'Zykluslänge (Tage)', calc: 'Berechnen',
      dueDate: 'Voraussichtlicher Termin', current: 'Sie sind in Woche', weeks: 'Wochen', days: 'Tagen',
      trimester: 'Trimester', t1: 'Erstes', t2: 'Zweites', t3: 'Drittes',
      remaining: 'Tage bis zum Termin', conception: 'Geschätzte Zeugung',
      note: 'Naegele-Regel, an die Zykluslänge angepasst. Ein Ultraschalltermin ist genauer. Keine medizinische Beratung.',
    },
  },
  fr: {
    title: 'Calculateur de date d’accouchement',
    desc: 'Date prévue d’accouchement et semaines de grossesse à partir des dernières règles',
    short: 'Terme · semaines de grossesse',
    intro: [
      {
        h: 'Quarante semaines depuis les dernières règles, pas depuis la conception',
        p: 'La grossesse se date à partir du premier jour des dernières règles, soit environ deux semaines avant que la conception ait lieu. Cette convention fait durer une grossesse quarante semaines et non trente-huit, et explique qu’on compte deux semaines de grossesse avant qu’il y ait quoi que ce soit.',
      },
      {
        h: 'Le terme est un milieu, pas un rendez-vous',
        p: 'Moins d’une naissance sur vingt tombe le jour prévu. La plupart arrivent dans les deux semaines qui précèdent ou qui suivent, et un premier enfant a plutôt tendance à se faire attendre. Voir cette date comme le centre d’un intervalle plutôt que comme une échéance épargne bien de l’angoisse le dernier mois.',
      },
      {
        h: 'Une échographie l’emporte sur le calcul',
        p: 'Ce calcul suppose un cycle de 28 jours avec ovulation au jour 14. La datation par échographie précoce mesure la grossesse elle-même et se révèle plus précise : si une échographie vous a donné une date, c’est celle-là qui compte.',
      },
    ],
    faq: [
      { q: 'Et si mon cycle ne fait pas 28 jours ?', a: 'Ajustez le champ de durée du cycle et le terme se décale avec. Un cycle de 35 jours repousse l’ovulation d’environ une semaine, et le terme d’autant.' },
      { q: 'Que sont les trimestres ?', a: 'Semaines 1–13, 14–27 et à partir de 28, les bornes exactes variant d’environ une semaine selon les sources. C’est une commodité de description, pas un seuil clinique.' },
      { q: 'Comment le terme est-il calculé ?', a: 'Par la règle de Naegele : dernières règles plus 280 jours, corrigée ici pour les cycles autres que 28 jours. En usage depuis le XIXe siècle, elle reste le point de départ standard.' },
    ],
    ui: {
      section: 'Vos dates', lastPeriod: 'Premier jour des dernières règles',
      cycle: 'Durée du cycle (jours)', calc: 'Calculer',
      dueDate: 'Date prévue d’accouchement', current: 'Vous en êtes à', weeks: 'semaines', days: 'jours',
      trimester: 'Trimestre', t1: 'Premier', t2: 'Deuxième', t3: 'Troisième',
      remaining: 'Jours restants', conception: 'Conception estimée',
      note: 'Règle de Naegele ajustée à la durée du cycle. Une date échographique est plus précise. Ce n’est pas un avis médical.',
    },
  },
  hi: {
    title: 'प्रसव तिथि कैलकुलेटर',
    desc: 'पिछली माहवारी से संभावित प्रसव तिथि और गर्भ के सप्ताह',
    short: 'प्रसव तिथि · गर्भ के सप्ताह',
    intro: [
      {
        h: 'गर्भाधान से नहीं, पिछली माहवारी से चालीस सप्ताह',
        p: 'गर्भावस्था की गिनती पिछली माहवारी के पहले दिन से होती है, जो असल गर्भाधान से लगभग दो सप्ताह पहले है। इसी रीत के कारण गर्भावस्था अड़तीस नहीं, चालीस सप्ताह की कहलाती है — और इसीलिए कुछ होने से पहले ही "दो सप्ताह का गर्भ" गिना जाता है।',
      },
      {
        h: 'प्रसव तिथि बीच का बिंदु है, कोई नियत तारीख़ नहीं',
        p: 'बीस में से एक से भी कम जन्म ठीक अनुमानित तिथि पर होते हैं। ज़्यादातर उससे दो सप्ताह इधर या उधर आते हैं, और पहला बच्चा अक्सर देर करता है। इसे समयसीमा नहीं, एक परास का केंद्र मानने से आख़िरी महीने की बहुत-सी चिंता बच जाती है।',
      },
      {
        h: 'अल्ट्रासाउंड गणित से बेहतर है',
        p: 'यह गणना 28 दिन के चक्र और 14वें दिन ओव्यूलेशन मानकर चलती है। शुरुआती अल्ट्रासाउंड गर्भ को ही नापता है और अधिक सटीक होता है, इसलिए जाँच से मिली तिथि हो तो वही मानिए।',
      },
    ],
    faq: [
      { q: 'मेरा चक्र 28 दिन का न हो तो?', a: 'चक्र की लंबाई वाला खाना बदलिए, तिथि उसी के साथ खिसक जाएगी। 35 दिन का चक्र ओव्यूलेशन को लगभग एक सप्ताह आगे धकेलता है, और प्रसव तिथि भी उतनी ही आगे जाती है।' },
      { q: 'त्रैमास क्या हैं?', a: 'सप्ताह 1–13, 14–27 और 28 से आगे — हालाँकि सटीक सीमाएँ स्रोत के हिसाब से एक सप्ताह इधर-उधर होती हैं। ये वर्णन की सुविधा हैं, नैदानिक सीमाएँ नहीं।' },
      { q: 'तिथि की गणना कैसे होती है?', a: 'नेगेले नियम से: पिछली माहवारी में 280 दिन जोड़कर, और यहाँ 28 से भिन्न चक्रों के लिए समायोजित करके। यह उन्नीसवीं सदी से चलन में है और आज भी मानक शुरुआती बिंदु है।' },
    ],
    ui: {
      section: 'आपकी तिथियाँ', lastPeriod: 'पिछली माहवारी का पहला दिन',
      cycle: 'चक्र की लंबाई (दिन)', calc: 'गणना करें',
      dueDate: 'संभावित प्रसव तिथि', current: 'आप हैं', weeks: 'सप्ताह', days: 'दिन',
      trimester: 'त्रैमास', t1: 'पहला', t2: 'दूसरा', t3: 'तीसरा',
      remaining: 'बचे दिन', conception: 'अनुमानित गर्भाधान',
      note: 'नेगेले नियम, चक्र की लंबाई के अनुसार समायोजित। अल्ट्रासाउंड से मिली तिथि अधिक सटीक है। यह चिकित्सकीय सलाह नहीं है।',
    },
  },
  'zh-hans': {
    title: '预产期计算器',
    desc: '根据末次月经推算预产期和目前的孕周',
    short: '预产期 · 孕周',
    intro: [
      {
        h: '四十周是从末次月经算起，不是从受孕算起',
        p: '孕期是从末次月经第一天开始计算的，而真正的受孕大约在那之后两周。正是这个约定让孕期成了四十周而不是三十八周，也让人在还什么都没有的时候就已经"怀孕两周"了。',
      },
      {
        h: '预产期是一个中点，不是一个约定',
        p: '不到二十分之一的分娩发生在预产期当天。多数会在前后两周内到来，而头胎往往偏晚。把这一天当成一个区间的中心而不是截止日期，最后一个月能省下很多焦虑。',
      },
      {
        h: '超声比算术更靠谱',
        p: '这个算法假设 28 天周期、第 14 天排卵。早期超声测的是妊娠本身，更准确；如果检查已经给出日期，就以那个为准。',
      },
    ],
    faq: [
      { q: '我的周期不是 28 天怎么办？', a: '调整周期长度那一栏，预产期会跟着挪。35 天的周期会把排卵推后约一周，预产期也跟着往后。' },
      { q: '三个孕期怎么划分？', a: '第 1–13 周、14–27 周和第 28 周之后，不过具体边界在不同资料里会差一周左右。它们是描述孕期的方便说法，不是临床阈值。' },
      { q: '预产期是怎么算的？', a: '按内格勒法则：末次月经加 280 天，这里再按非 28 天的周期做了调整。这个方法从十九世纪沿用至今，仍是标准的起点。' },
    ],
    ui: {
      section: '你的日期', lastPeriod: '末次月经的第一天',
      cycle: '周期长度（天）', calc: '计算',
      dueDate: '预产期', current: '目前', weeks: '周', days: '天',
      trimester: '孕期', t1: '孕早期', t2: '孕中期', t3: '孕晚期',
      remaining: '距预产期', conception: '估计受孕时间',
      note: '内格勒法则并按周期长度调整。超声给出的日期更准确。不构成医疗建议。',
    },
  },
  'zh-hant': {
    title: '預產期計算機',
    desc: '根據末次月經推算預產期和目前的孕週',
    short: '預產期 · 孕週',
    intro: [
      {
        h: '四十週是從末次月經算起，不是從受孕算起',
        p: '孕期是從末次月經第一天開始計算的，而真正的受孕大約在那之後兩週。正是這個約定讓孕期成了四十週而不是三十八週，也讓人在還什麼都沒有的時候就已經「懷孕兩週」了。',
      },
      {
        h: '預產期是一個中點，不是一個約定',
        p: '不到二十分之一的分娩發生在預產期當天。多數會在前後兩週內到來，而頭胎往往偏晚。把這一天當成一個區間的中心而不是截止日期，最後一個月能省下很多焦慮。',
      },
      {
        h: '超音波比算術更靠譜',
        p: '這個算法假設 28 天週期、第 14 天排卵。早期超音波測的是妊娠本身，更準確；如果檢查已經給出日期，就以那個為準。',
      },
    ],
    faq: [
      { q: '我的週期不是 28 天怎麼辦？', a: '調整週期長度那一欄，預產期會跟著挪。35 天的週期會把排卵推後約一週，預產期也跟著往後。' },
      { q: '三個孕期怎麼劃分？', a: '第 1–13 週、14–27 週和第 28 週之後，不過具體邊界在不同資料裡會差一週左右。它們是描述孕期的方便說法，不是臨床閾值。' },
      { q: '預產期是怎麼算的？', a: '按內格萊氏法則：末次月經加 280 天，這裡再按非 28 天的週期做了調整。這個方法從十九世紀沿用至今，仍是標準的起點。' },
    ],
    ui: {
      section: '你的日期', lastPeriod: '末次月經的第一天',
      cycle: '週期長度（天）', calc: '計算',
      dueDate: '預產期', current: '目前', weeks: '週', days: '天',
      trimester: '孕期', t1: '孕早期', t2: '孕中期', t3: '孕晚期',
      remaining: '距預產期', conception: '估計受孕時間',
      note: '內格萊氏法則並按週期長度調整。超音波給出的日期更準確。不構成醫療建議。',
    },
  },
};
