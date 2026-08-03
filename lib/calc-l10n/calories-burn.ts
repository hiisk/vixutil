import type { CalcTable } from './types.ts';

/**
 * 운동 소모 칼로리 — MET × 체중 × 시간.
 *
 * MET 값은 Compendium of Physical Activities(Ainsworth 2011)라 나라를 타지
 * 않는다. 한국어판의 비교 음식(밥 한 공기·라면·삼겹살)은 한국 식탁이므로
 * 어디서나 통하는 넷으로 바꿨다.
 */
export const CALORIES_BURN: CalcTable = {
  en: {
    title: 'Exercise calorie calculator',
    desc: 'Calories burned from body weight, activity and time, using MET values',
    short: 'Calories burned by activity',
    intro: [
      {
        h: 'MET × weight × hours',
        p: 'A MET is a multiple of resting energy use: walking briskly is about 3.8 METs, so it costs roughly 3.8 times what sitting still does. Multiply by body weight in kilograms and by hours, and you have the estimate. A heavier body burns more for the same activity, because moving more mass costs more.',
      },
      {
        h: 'Exercise burns less than the food it replaces',
        p: 'Half an hour of brisk walking for a 70 kg adult comes to about 130 calories — less than a can of soft drink. This is not an argument against exercising; it is an argument against treating exercise as a licence to eat. The health case for movement has almost nothing to do with the calorie count.',
      },
      {
        h: 'The MET table describes averages',
        p: 'Fitness, technique and terrain all shift the real figure, sometimes by a third. Watches and machines estimate too, usually generously. Treat any of these numbers as an order of magnitude rather than a measurement.',
      },
    ],
    faq: [
      { q: 'Does this include what I would have burned anyway?', a: 'Yes, it is gross rather than net. Sitting for that half hour would have cost something too, so the calories genuinely added by the exercise are a little lower than the figure shown.' },
      { q: 'Why is my watch giving a different number?', a: 'Because it uses heart rate and its own model rather than a MET table. Both are estimates. Fitness trackers are widely found to run high on calorie burn, so the difference is usually in that direction.' },
      { q: 'How much exercise does losing a kilogram of fat take?', a: 'Roughly a 7,700 calorie deficit. At 300 calories a session that is around 25 sessions with no change in eating — which is why diet does the heavier lifting in weight loss, and exercise does it for everything else.' },
    ],
    ui: {
      section: 'Your session', weight: 'Weight (kg)', exercise: 'Activity', duration: 'Duration (minutes)',
      calc: 'Calculate', result: 'Calories burned', unit: 'kcal', fat: 'Roughly equivalent to',
      fatUnit: 'g of body fat', metLabel: 'MET', compare: 'That is about',
      f1: 'slice of pizza', f2: 'can of soft drink', f3: 'chocolate bar (50 g)', f4: 'banana',
      e1: 'Walking, slow (4 km/h)', e2: 'Walking, brisk (6 km/h)',
      e3: 'Running (8 km/h)', e4: 'Running (12 km/h)',
      e5: 'Cycling, moderate', e6: 'Cycling, fast',
      e7: 'Swimming, general', e8: 'Swimming, fast',
      e9: 'Skipping rope', e10: 'Yoga', e11: 'Pilates', e12: 'Tennis, singles',
      e13: 'Hiking uphill', e14: 'Weight training, general', e15: 'Weight training, vigorous',
      e16: 'Football', e17: 'Dancing, aerobic', e18: 'Housework',
      note: 'An estimate from average MET values. Individual burn varies widely.',
    },
  },
  es: {
    title: 'Calculadora de calorías quemadas',
    desc: 'Calorías gastadas según peso, actividad y tiempo, usando valores MET',
    short: 'Calorías quemadas por actividad',
    intro: [
      {
        h: 'MET × peso × horas',
        p: 'Un MET es un múltiplo del gasto en reposo: caminar rápido son unos 3,8 MET, es decir, cuesta unas 3,8 veces lo que estar sentado. Multiplica por el peso en kilos y por las horas y tienes la estimación. Un cuerpo más pesado gasta más en la misma actividad, porque mover más masa cuesta más.',
      },
      {
        h: 'El ejercicio quema menos que la comida que sustituye',
        p: 'Media hora de caminata rápida para un adulto de 70 kg son unas 130 calorías: menos que una lata de refresco. No es un argumento contra el ejercicio, sino contra tratarlo como permiso para comer. Lo que el movimiento aporta a la salud no depende casi nada de las calorías.',
      },
      {
        h: 'La tabla MET describe promedios',
        p: 'La forma física, la técnica y el terreno mueven la cifra real, a veces en un tercio. Los relojes y las máquinas también estiman, y suelen ser generosos. Toma cualquiera de estos números como un orden de magnitud, no como una medición.',
      },
    ],
    faq: [
      { q: '¿Incluye lo que habría quemado igualmente?', a: 'Sí, es gasto bruto y no neto. Esa media hora sentado también habría costado algo, así que las calorías realmente añadidas por el ejercicio son algo menores que la cifra mostrada.' },
      { q: '¿Por qué mi reloj da otro número?', a: 'Porque usa la frecuencia cardíaca y su propio modelo en lugar de una tabla MET. Ambos son estimaciones. Se ha comprobado muchas veces que los pulsómetros tienden a exagerar el gasto, así que la diferencia suele ir en esa dirección.' },
      { q: '¿Cuánto ejercicio hace falta para perder un kilo de grasa?', a: 'Un déficit de unas 7.700 calorías. A 300 calorías por sesión son unas 25 sesiones sin cambiar la comida, y por eso la dieta pesa más en la pérdida de peso mientras el ejercicio pesa en todo lo demás.' },
    ],
    ui: {
      section: 'Tu sesión', weight: 'Peso (kg)', exercise: 'Actividad', duration: 'Duración (minutos)',
      calc: 'Calcular', result: 'Calorías quemadas', unit: 'kcal', fat: 'Equivale aproximadamente a',
      fatUnit: 'g de grasa corporal', metLabel: 'MET', compare: 'Es como',
      f1: 'porción de pizza', f2: 'lata de refresco', f3: 'tableta de chocolate (50 g)', f4: 'plátano',
      e1: 'Caminar, lento (4 km/h)', e2: 'Caminar, rápido (6 km/h)',
      e3: 'Correr (8 km/h)', e4: 'Correr (12 km/h)',
      e5: 'Bicicleta, ritmo medio', e6: 'Bicicleta, rápido',
      e7: 'Natación, general', e8: 'Natación, rápida',
      e9: 'Saltar a la comba', e10: 'Yoga', e11: 'Pilates', e12: 'Tenis, individual',
      e13: 'Senderismo en subida', e14: 'Pesas, general', e15: 'Pesas, intenso',
      e16: 'Fútbol', e17: 'Baile, aeróbico', e18: 'Tareas del hogar',
      note: 'Estimación con valores MET medios. El gasto individual varía mucho.',
    },
  },
  'pt-br': {
    title: 'Calculadora de calorias gastas no exercício',
    desc: 'Calorias queimadas conforme peso, atividade e tempo, usando valores MET',
    short: 'Calorias gastas por atividade',
    intro: [
      {
        h: 'MET × peso × horas',
        p: 'Um MET é um múltiplo do gasto em repouso: caminhar rápido dá cerca de 3,8 MET, ou seja, custa umas 3,8 vezes o que custa ficar sentado. Multiplique pelo peso em quilos e pelas horas e você tem a estimativa. Um corpo mais pesado gasta mais na mesma atividade, porque mover mais massa custa mais.',
      },
      {
        h: 'Exercício queima menos do que a comida que ele substitui',
        p: 'Meia hora de caminhada rápida para um adulto de 70 kg dá cerca de 130 calorias — menos que uma lata de refrigerante. Isso não é argumento contra treinar; é argumento contra tratar o treino como licença para comer. O que o movimento faz pela saúde quase não depende da conta de calorias.',
      },
      {
        h: 'A tabela MET descreve médias',
        p: 'Condicionamento, técnica e terreno mexem no número real, às vezes em um terço. Relógios e aparelhos também estimam, e costumam ser generosos. Tome qualquer um desses números como ordem de grandeza, não como medição.',
      },
    ],
    faq: [
      { q: 'Isso inclui o que eu queimaria de qualquer jeito?', a: 'Inclui — é gasto bruto, não líquido. Aquela meia hora sentado também custaria algo, então as calorias de fato acrescentadas pelo exercício são um pouco menores que o número mostrado.' },
      { q: 'Por que meu relógio dá outro número?', a: 'Porque ele usa frequência cardíaca e o próprio modelo, em vez de uma tabela MET. Os dois são estimativas. Pesquisas costumam achar que monitores superestimam o gasto, então a diferença geralmente vai nessa direção.' },
      { q: 'Quanto exercício custa perder um quilo de gordura?', a: 'Cerca de 7.700 calorias de déficit. A 300 calorias por sessão são umas 25 sessões sem mudar a alimentação — por isso a dieta pesa mais no emagrecimento, e o exercício pesa em todo o resto.' },
    ],
    ui: {
      section: 'Seu treino', weight: 'Peso (kg)', exercise: 'Atividade', duration: 'Duração (minutos)',
      calc: 'Calcular', result: 'Calorias queimadas', unit: 'kcal', fat: 'Equivale a mais ou menos',
      fatUnit: 'g de gordura corporal', metLabel: 'MET', compare: 'Isso é cerca de',
      f1: 'fatia de pizza', f2: 'lata de refrigerante', f3: 'barra de chocolate (50 g)', f4: 'banana',
      e1: 'Caminhada, lenta (4 km/h)', e2: 'Caminhada, rápida (6 km/h)',
      e3: 'Corrida (8 km/h)', e4: 'Corrida (12 km/h)',
      e5: 'Bicicleta, ritmo médio', e6: 'Bicicleta, rápido',
      e7: 'Natação, geral', e8: 'Natação, rápida',
      e9: 'Pular corda', e10: 'Ioga', e11: 'Pilates', e12: 'Tênis, simples',
      e13: 'Trilha em subida', e14: 'Musculação, geral', e15: 'Musculação, intensa',
      e16: 'Futebol', e17: 'Dança, aeróbica', e18: 'Tarefas domésticas',
      note: 'Estimativa com valores MET médios. O gasto individual varia bastante.',
    },
  },
  ja: {
    title: '運動の消費カロリー計算機',
    desc: '体重・種目・時間からMET値で消費カロリーを出します',
    short: '種目別の消費カロリー',
    intro: [
      {
        h: 'MET × 体重 × 時間',
        p: 'METは安静時の何倍かを表す数字です。速歩は約3.8METなので、じっと座っているときの約3.8倍かかります。これに体重(kg)と時間(h)を掛ければ推定値が出ます。同じ運動でも体重が重いほど多く消費するのは、動かす質量が大きいからです。',
      },
      {
        h: '運動で燃える量は、置き換える食べ物より少ない',
        p: '70kgの大人が30分速歩をして約130kcal——清涼飲料1缶に届きません。運動をするなという話ではなく、運動を食べてよい許可証にするなという話です。体を動かすことの健康上の意味は、カロリーの数字とはほとんど関係がありません。',
      },
      {
        h: 'MET表は平均を述べたものです',
        p: '体力、フォーム、路面で実際の値は動き、3分の1ほどずれることもあります。腕時計もマシンも推定で、たいてい多めに出ます。どの数字も測定ではなく桁の見当として扱ってください。',
      },
    ],
    faq: [
      { q: 'これは何もしなくても消費した分を含んでいますか。', a: '含んでいます。差し引き前の総量です。その30分を座って過ごしてもいくらかは消費したので、運動によって本当に増えた分はここの数字よりやや少なくなります。' },
      { q: '腕時計の数字と違うのはなぜですか。', a: '時計はMET表ではなく心拍と独自のモデルを使うからです。どちらも推定です。活動量計はカロリーを多めに出す傾向が広く報告されており、差はたいていその向きです。' },
      { q: '体脂肪1kgを落とすにはどれくらい運動が要りますか。', a: 'およそ7,700kcalの不足です。1回300kcalなら、食事を変えずに25回ほど。減量では食事のほうが重く、運動はそれ以外のすべてで効く——理由はここにあります。' },
    ],
    ui: {
      section: '条件', weight: '体重 (kg)', exercise: '種目', duration: '時間 (分)',
      calc: '計算する', result: '消費カロリー', unit: 'kcal', fat: 'およそ',
      fatUnit: 'gの体脂肪に相当', metLabel: 'MET', compare: 'たとえば',
      f1: 'ピザ1切れ', f2: '清涼飲料1缶', f3: '板チョコ (50g)', f4: 'バナナ1本',
      e1: 'ウォーキング(ゆっくり 4km/h)', e2: 'ウォーキング(速歩 6km/h)',
      e3: 'ランニング(8km/h)', e4: 'ランニング(12km/h)',
      e5: '自転車(ふつう)', e6: '自転車(速い)',
      e7: '水泳(一般)', e8: '水泳(速い)',
      e9: '縄跳び', e10: 'ヨガ', e11: 'ピラティス', e12: 'テニス(シングルス)',
      e13: '登山(上り)', e14: '筋力トレーニング(一般)', e15: '筋力トレーニング(高強度)',
      e16: 'サッカー', e17: 'ダンス(エアロビクス)', e18: '掃除・家事',
      note: '平均的なMET値による推定です。実際の消費には個人差が大きくあります。',
    },
  },
  de: {
    title: 'Kalorienverbrauch-Rechner für Sport',
    desc: 'Verbrannte Kalorien aus Gewicht, Aktivität und Dauer nach MET-Werten',
    short: 'Verbrauch je Aktivität',
    intro: [
      {
        h: 'MET × Gewicht × Stunden',
        p: 'Ein MET ist ein Vielfaches des Ruheverbrauchs: Zügiges Gehen liegt bei etwa 3,8 MET, kostet also rund das 3,8-Fache des Sitzens. Mal Körpergewicht in Kilogramm und mal Stunden ergibt die Schätzung. Ein schwererer Körper verbraucht bei derselben Tätigkeit mehr, weil mehr Masse zu bewegen mehr kostet.',
      },
      {
        h: 'Sport verbrennt weniger als das Essen, das er ersetzt',
        p: 'Eine halbe Stunde zügiges Gehen ergibt bei 70 kg rund 130 Kalorien — weniger als eine Dose Limonade. Das spricht nicht gegen Bewegung, sondern dagegen, Bewegung als Essenserlaubnis zu verbuchen. Was Bewegung für die Gesundheit leistet, hat mit der Kalorienzahl fast nichts zu tun.',
      },
      {
        h: 'Die MET-Tabelle beschreibt Mittelwerte',
        p: 'Fitness, Technik und Untergrund verschieben den echten Wert, gelegentlich um ein Drittel. Uhren und Geräte schätzen ebenfalls, meist großzügig. Nehmen Sie jede dieser Zahlen als Größenordnung, nicht als Messung.',
      },
    ],
    faq: [
      { q: 'Ist darin enthalten, was ich ohnehin verbraucht hätte?', a: 'Ja, es ist der Brutto- und nicht der Nettowert. Die halbe Stunde im Sitzen hätte auch etwas gekostet; die durch den Sport tatsächlich hinzugekommenen Kalorien liegen also etwas unter der angezeigten Zahl.' },
      { q: 'Warum zeigt meine Uhr etwas anderes?', a: 'Weil sie Herzfrequenz und ein eigenes Modell verwendet statt einer MET-Tabelle. Beides sind Schätzungen. Aktivitätstracker liegen beim Kalorienverbrauch verbreitet zu hoch, die Abweichung geht also meist in diese Richtung.' },
      { q: 'Wie viel Sport kostet ein Kilogramm Körperfett?', a: 'Grob 7.700 Kalorien Defizit. Bei 300 Kalorien je Einheit sind das etwa 25 Einheiten ohne Änderung beim Essen — deshalb trägt die Ernährung beim Abnehmen mehr, und der Sport trägt alles andere.' },
    ],
    ui: {
      section: 'Ihre Einheit', weight: 'Gewicht (kg)', exercise: 'Aktivität', duration: 'Dauer (Minuten)',
      calc: 'Berechnen', result: 'Verbrannte Kalorien', unit: 'kcal', fat: 'Entspricht etwa',
      fatUnit: 'g Körperfett', metLabel: 'MET', compare: 'Das ist ungefähr',
      f1: 'Stück Pizza', f2: 'Dose Limonade', f3: 'Tafel Schokolade (50 g)', f4: 'Banane',
      e1: 'Gehen, langsam (4 km/h)', e2: 'Gehen, zügig (6 km/h)',
      e3: 'Laufen (8 km/h)', e4: 'Laufen (12 km/h)',
      e5: 'Radfahren, mäßig', e6: 'Radfahren, schnell',
      e7: 'Schwimmen, allgemein', e8: 'Schwimmen, schnell',
      e9: 'Seilspringen', e10: 'Yoga', e11: 'Pilates', e12: 'Tennis, Einzel',
      e13: 'Bergauf wandern', e14: 'Krafttraining, allgemein', e15: 'Krafttraining, intensiv',
      e16: 'Fußball', e17: 'Tanzen, Aerobic', e18: 'Hausarbeit',
      note: 'Schätzung aus durchschnittlichen MET-Werten. Der individuelle Verbrauch schwankt stark.',
    },
  },
  fr: {
    title: 'Calculateur de calories brûlées',
    desc: 'Calories dépensées selon le poids, l’activité et la durée, à partir des valeurs MET',
    short: 'Dépense par activité',
    intro: [
      {
        h: 'MET × poids × heures',
        p: 'Un MET est un multiple de la dépense au repos : la marche rapide vaut environ 3,8 MET, soit près de 3,8 fois ce que coûte le fait d’être assis. Multipliez par le poids en kilos et par les heures et vous avez l’estimation. Un corps plus lourd dépense davantage pour la même activité, car déplacer plus de masse coûte plus cher.',
      },
      {
        h: 'Le sport brûle moins que la nourriture qu’il remplace',
        p: 'Une demi-heure de marche rapide pour un adulte de 70 kg, c’est environ 130 calories — moins qu’une canette de soda. Ce n’est pas un argument contre l’exercice, mais contre l’idée d’en faire un permis de manger. Ce que le mouvement apporte à la santé ne tient presque pas au décompte des calories.',
      },
      {
        h: 'La table MET décrit des moyennes',
        p: 'La condition physique, la technique et le terrain déplacent la valeur réelle, parfois d’un tiers. Montres et machines estiment aussi, généralement avec générosité. Prenez chacun de ces chiffres comme un ordre de grandeur, pas comme une mesure.',
      },
    ],
    faq: [
      { q: 'Est-ce que cela compte ce que j’aurais brûlé de toute façon ?', a: 'Oui, c’est une dépense brute et non nette. Cette demi-heure assis aurait aussi coûté quelque chose : les calories réellement ajoutées par l’exercice sont donc un peu inférieures au chiffre affiché.' },
      { q: 'Pourquoi ma montre affiche-t-elle autre chose ?', a: 'Parce qu’elle utilise la fréquence cardiaque et son propre modèle plutôt qu’une table MET. Les deux sont des estimations. Les bracelets d’activité surestiment fréquemment la dépense, l’écart va donc le plus souvent dans ce sens.' },
      { q: 'Combien d’exercice pour perdre un kilo de graisse ?', a: 'Environ 7 700 calories de déficit. À 300 calories la séance, cela fait près de 25 séances sans rien changer à l’alimentation — d’où le fait que l’assiette pèse davantage dans la perte de poids, et l’exercice dans tout le reste.' },
    ],
    ui: {
      section: 'Votre séance', weight: 'Poids (kg)', exercise: 'Activité', duration: 'Durée (minutes)',
      calc: 'Calculer', result: 'Calories brûlées', unit: 'kcal', fat: 'Équivaut à environ',
      fatUnit: 'g de masse grasse', metLabel: 'MET', compare: 'C’est à peu près',
      f1: 'part de pizza', f2: 'canette de soda', f3: 'tablette de chocolat (50 g)', f4: 'banane',
      e1: 'Marche, lente (4 km/h)', e2: 'Marche, rapide (6 km/h)',
      e3: 'Course (8 km/h)', e4: 'Course (12 km/h)',
      e5: 'Vélo, allure moyenne', e6: 'Vélo, rapide',
      e7: 'Natation, générale', e8: 'Natation, rapide',
      e9: 'Corde à sauter', e10: 'Yoga', e11: 'Pilates', e12: 'Tennis, simple',
      e13: 'Randonnée en montée', e14: 'Musculation, générale', e15: 'Musculation, intense',
      e16: 'Football', e17: 'Danse, aérobic', e18: 'Ménage',
      note: 'Estimation sur des valeurs MET moyennes. La dépense individuelle varie beaucoup.',
    },
  },
  hi: {
    title: 'व्यायाम कैलोरी कैलकुलेटर',
    desc: 'वज़न, गतिविधि और समय से MET मानों के आधार पर जली कैलोरी',
    short: 'गतिविधि के हिसाब से जली कैलोरी',
    intro: [
      {
        h: 'MET × वज़न × घंटे',
        p: 'MET आराम की हालत के ख़र्च का गुणक है: तेज़ चलना लगभग 3.8 MET है, यानी बैठे रहने से क़रीब 3.8 गुना ख़र्च। इसे किलो में वज़न और घंटों से गुणा कीजिए, अनुमान तैयार। उसी गतिविधि में भारी शरीर ज़्यादा जलाता है, क्योंकि ज़्यादा भार हिलाने में ज़्यादा ख़र्च होता है।',
      },
      {
        h: 'व्यायाम उस खाने से कम जलाता है जिसकी वह जगह लेता है',
        p: '70 किलो के वयस्क का आधा घंटा तेज़ चलना लगभग 130 कैलोरी — एक कोल्ड ड्रिंक के कैन से भी कम। यह व्यायाम के ख़िलाफ़ तर्क नहीं है; यह व्यायाम को "अब जितना चाहे खाओ" का परवाना बनाने के ख़िलाफ़ तर्क है। सेहत के लिए हिलने-डुलने का महत्व कैलोरी की गिनती से लगभग जुड़ा ही नहीं है।',
      },
      {
        h: 'MET तालिका औसत बताती है',
        p: 'फ़िटनेस, तकनीक और ज़मीन असली आंकड़े को खिसकाते हैं, कभी-कभी एक तिहाई तक। घड़ियाँ और मशीनें भी अनुमान ही लगाती हैं, और आमतौर पर उदारता से। इन सब आंकड़ों को माप नहीं, मोटे परिमाण की तरह लीजिए।',
      },
    ],
    faq: [
      { q: 'क्या इसमें वह भी शामिल है जो वैसे भी जलता?', a: 'हाँ, यह सकल है, शुद्ध नहीं। वह आधा घंटा बैठकर बिताने पर भी कुछ ख़र्च होता, इसलिए व्यायाम से सचमुच जुड़ी कैलोरी दिखाए गए आंकड़े से थोड़ी कम है।' },
      { q: 'मेरी घड़ी अलग संख्या क्यों दिखाती है?', a: 'क्योंकि वह MET तालिका के बजाय हृदय गति और अपने मॉडल का इस्तेमाल करती है। दोनों अनुमान हैं। फ़िटनेस ट्रैकर कैलोरी को ज़्यादा दिखाते पाए गए हैं, इसलिए अंतर अक्सर उसी दिशा में होता है।' },
      { q: 'एक किलो चर्बी घटाने में कितना व्यायाम लगेगा?', a: 'लगभग 7,700 कैलोरी का घाटा। हर सत्र 300 कैलोरी के हिसाब से, खाने में बदलाव किए बिना, क़रीब 25 सत्र — इसीलिए वज़न घटाने में भोजन का पलड़ा भारी है, और व्यायाम बाक़ी सब में।' },
    ],
    ui: {
      section: 'आपका सत्र', weight: 'वज़न (किग्रा)', exercise: 'गतिविधि', duration: 'अवधि (मिनट)',
      calc: 'गणना करें', result: 'जली कैलोरी', unit: 'किलो कैलोरी', fat: 'लगभग बराबर',
      fatUnit: 'ग्राम शरीर वसा', metLabel: 'MET', compare: 'यह लगभग',
      f1: 'पिज़्ज़ा का एक टुकड़ा', f2: 'कोल्ड ड्रिंक का एक कैन', f3: 'चॉकलेट बार (50 ग्राम)', f4: 'एक केला',
      e1: 'पैदल, धीमे (4 किमी/घं)', e2: 'पैदल, तेज़ (6 किमी/घं)',
      e3: 'दौड़ (8 किमी/घं)', e4: 'दौड़ (12 किमी/घं)',
      e5: 'साइकिल, सामान्य', e6: 'साइकिल, तेज़',
      e7: 'तैराकी, सामान्य', e8: 'तैराकी, तेज़',
      e9: 'रस्सी कूद', e10: 'योग', e11: 'पिलाटेस', e12: 'टेनिस, एकल',
      e13: 'चढ़ाई पर पैदल', e14: 'वेट ट्रेनिंग, सामान्य', e15: 'वेट ट्रेनिंग, कठिन',
      e16: 'फ़ुटबॉल', e17: 'नृत्य, एरोबिक', e18: 'घर का काम',
      note: 'औसत MET मानों से लगाया अनुमान। हर व्यक्ति का ख़र्च काफ़ी अलग होता है।',
    },
  },
  'zh-hans': {
    title: '运动消耗热量计算器',
    desc: '按体重、运动项目和时长，用 MET 值估算消耗的热量',
    short: '按项目算消耗',
    intro: [
      {
        h: 'MET × 体重 × 小时',
        p: 'MET 是静息消耗的倍数：快走大约 3.8 MET，也就是约为静坐的 3.8 倍。乘上以公斤计的体重和小时数，估算就出来了。同样的动作，体重越重消耗越多，因为要移动的质量更大。',
      },
      {
        h: '运动烧掉的，比它替代的那口食物还少',
        p: '70 公斤的成年人快走半小时，大约 130 千卡——还不到一罐汽水。这不是反对运动，而是反对把运动当成随便吃的通行证。运动对健康的意义，几乎和这个热量数字无关。',
      },
      {
        h: 'MET 表说的是平均值',
        p: '体能、动作和路面都会挪动真实数字，有时能差三分之一。手表和器械也是在估算，而且通常估得慷慨。这些数字都只当量级看，别当测量值。',
      },
    ],
    faq: [
      { q: '这里面包含我本来也会消耗的部分吗？', a: '包含，这是总消耗而不是净增。那半小时坐着也要花掉一些，所以运动真正额外增加的热量，比显示的数字略少。' },
      { q: '为什么我的手表显示的不一样？', a: '因为它用心率和自家模型，而不是 MET 表。两者都是估算。运动手环普遍被发现把热量算高，所以差异往往就是这个方向。' },
      { q: '减掉一公斤脂肪要运动多少？', a: '大约 7,700 千卡的缺口。按每次 300 千卡算，在饮食完全不变的前提下要练 25 次左右——这就是为什么减重主要靠吃，运动管的是其他一切。' },
    ],
    ui: {
      section: '这次运动', weight: '体重 (kg)', exercise: '运动项目', duration: '时长（分钟）',
      calc: '计算', result: '消耗热量', unit: '千卡', fat: '大致相当于',
      fatUnit: '克体脂', metLabel: 'MET', compare: '差不多是',
      f1: '一块披萨', f2: '一罐汽水', f3: '一块巧克力（50 克）', f4: '一根香蕉',
      e1: '步行，慢（4 km/h）', e2: '步行，快（6 km/h）',
      e3: '跑步（8 km/h）', e4: '跑步（12 km/h）',
      e5: '骑车，中速', e6: '骑车，快速',
      e7: '游泳，一般', e8: '游泳，快速',
      e9: '跳绳', e10: '瑜伽', e11: '普拉提', e12: '网球，单打',
      e13: '爬山（上坡）', e14: '力量训练，一般', e15: '力量训练，高强度',
      e16: '足球', e17: '舞蹈，有氧', e18: '做家务',
      note: '按平均 MET 值估算。个体消耗差异很大。',
    },
  },
  'zh-hant': {
    title: '運動消耗熱量計算機',
    desc: '按體重、運動項目和時長，用 MET 值估算消耗的熱量',
    short: '按項目算消耗',
    intro: [
      {
        h: 'MET × 體重 × 小時',
        p: 'MET 是靜息消耗的倍數：快走大約 3.8 MET，也就是約為靜坐的 3.8 倍。乘上以公斤計的體重和小時數，估算就出來了。同樣的動作，體重越重消耗越多，因為要移動的質量更大。',
      },
      {
        h: '運動燒掉的，比它取代的那口食物還少',
        p: '70 公斤的成年人快走半小時，大約 130 大卡——還不到一罐汽水。這不是反對運動，而是反對把運動當成隨便吃的通行證。運動對健康的意義，幾乎和這個熱量數字無關。',
      },
      {
        h: 'MET 表說的是平均值',
        p: '體能、動作和路面都會挪動真實數字，有時能差三分之一。手錶和器械也是在估算，而且通常估得慷慨。這些數字都只當量級看，別當測量值。',
      },
    ],
    faq: [
      { q: '這裡面包含我本來也會消耗的部分嗎？', a: '包含，這是總消耗而不是淨增。那半小時坐著也要花掉一些，所以運動真正額外增加的熱量，比顯示的數字略少。' },
      { q: '為什麼我的手錶顯示的不一樣？', a: '因為它用心率和自家模型，而不是 MET 表。兩者都是估算。運動手環普遍被發現把熱量算高，所以差異往往就是這個方向。' },
      { q: '減掉一公斤脂肪要運動多少？', a: '大約 7,700 大卡的缺口。按每次 300 大卡算，在飲食完全不變的前提下要練 25 次左右——這就是為什麼減重主要靠吃，運動管的是其他一切。' },
    ],
    ui: {
      section: '這次運動', weight: '體重 (kg)', exercise: '運動項目', duration: '時長（分鐘）',
      calc: '計算', result: '消耗熱量', unit: '大卡', fat: '大致相當於',
      fatUnit: '克體脂', metLabel: 'MET', compare: '差不多是',
      f1: '一塊披薩', f2: '一罐汽水', f3: '一塊巧克力（50 克）', f4: '一根香蕉',
      e1: '步行，慢（4 km/h）', e2: '步行，快（6 km/h）',
      e3: '跑步（8 km/h）', e4: '跑步（12 km/h）',
      e5: '騎車，中速', e6: '騎車，快速',
      e7: '游泳，一般', e8: '游泳，快速',
      e9: '跳繩', e10: '瑜伽', e11: '皮拉提斯', e12: '網球，單打',
      e13: '爬山（上坡）', e14: '重量訓練，一般', e15: '重量訓練，高強度',
      e16: '足球', e17: '舞蹈，有氧', e18: '做家事',
      note: '按平均 MET 值估算。個體消耗差異很大。',
    },
  },
};
