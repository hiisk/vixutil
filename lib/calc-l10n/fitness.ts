import type { CalcTable } from './types.ts';

/**
 * 운동 계산기 셋 — 러닝 페이스, 1RM, 표준체중.
 *
 * 셋 다 나라를 안 탄다. 5km는 어디서나 5km이고, 바벨 원판도 kg 단위가 같고,
 * BMI 기준선도 같다. 한국어 낱장에서만 쓰던 것을 아홉 언어로 여는 까닭이다.
 *
 * 다만 **단위**는 갈린다. 영어권 러너는 마일로, 미국 헬스장은 파운드로 센다.
 * 계산은 km·kg으로 하되 마일 페이스를 늘 함께 내고, 파운드 이야기는 FAQ에서
 * 다룬다 — 입력 단위를 늘리면 화면이 두 배가 되는데 얻는 것은 나눗셈 하나다.
 */

export const RUNNING_PACE: CalcTable = {
  en: {
    title: 'Running pace calculator',
    desc: 'Turn a target finish time into a per-kilometre pace, mile pace and split times',
    short: 'Pace and splits from a target time',
    intro: [
      {
        h: 'You race on pace, not on finish time',
        p: 'A goal is set as a time — "10K in 55 minutes" — but the number on your watch while you run is pace. Dividing 55 by 10 gives 5:30 per kilometre, and that is what tells you whether the first kilometre went out too fast. This calculator does that conversion and lays out the splits alongside it.',
      },
      {
        h: 'Splits are more useful mid-race than pace',
        p: 'Pace jumps around with hills, crossings and crowds, so the instantaneous number is noisy. Experienced runners memorise the clock time they should see at 5 km instead. One number, checked once, tells you whether you are ahead or behind.',
      },
      {
        h: 'Holding a pace gets harder as the distance grows',
        p: 'The equivalent-times table below simply extends your pace to other distances. In practice, doubling the distance costs roughly 15 to 20 seconds per kilometre, so converting a 10K time straight into a marathon target produces something optimistic. Use it to set training paces, not race goals.',
      },
    ],
    faq: [
      { q: 'How do I convert a finish time into a pace?', a: 'Divide the total time by the distance. A 55-minute 10K is 5 minutes 30 seconds per kilometre. Memorising the pace rather than the finish time is what lets you correct yourself in the first kilometre instead of the last.' },
      { q: 'Why show split times as well?', a: 'Pace readings swing with terrain and traffic. A split — the clock time you should see at 5 km, 10 km and so on — is a single stable check. If the clock reads less than the target, you are ahead.' },
      { q: 'Can I predict a marathon time from a 10K?', a: 'Not by extending the pace, which is what the table does. Real fade over distance costs about 15 to 20 seconds per kilometre each time the distance doubles, so a straight extension is too optimistic. Coaches use fade factors and long-run data instead.' },
      { q: 'Why is mile pace shown too?', a: 'Races in the US, UK and Ireland are often marked in miles, and many watches ship set to miles. One mile is 1.609344 km, so a 5:00/km pace is 8:03 per mile.' },
    ],
    ui: {
      section: 'Your goal', race: 'Distance', custom: 'Custom distance', km: 'Distance (km)',
      time: 'Target time', h: 'Hours', m: 'Minutes', s: 'Seconds',
      calc: 'Calculate pace', perKm: 'Pace per km', perMile: 'Per mile', speed: 'Speed', finish: 'Finish',
      splits: 'Split times', splitsNote: 'Pass these points at these times and you are on target',
      equiv: 'At the same pace', equivNote: 'The pace simply extended — in reality longer means slower',
      c5k: '5K', c10k: '10K', chalf: 'Half marathon', cfull: 'Marathon',
    },
  },
  es: {
    title: 'Calculadora de ritmo de carrera',
    desc: 'Convierte un tiempo objetivo en ritmo por kilómetro, por milla y tiempos de paso',
    short: 'Ritmo y parciales según tu objetivo',
    intro: [
      {
        h: 'Se corre por ritmo, no por tiempo final',
        p: 'El objetivo se fija en tiempo — «10K en 55 minutos» —, pero lo que ves en el reloj mientras corres es el ritmo. Dividir 55 entre 10 da 5:30 por kilómetro, y ese es el número que te avisa si el primer kilómetro ha salido demasiado rápido. Esta calculadora hace la conversión y añade los parciales.',
      },
      {
        h: 'Los parciales sirven más que el ritmo durante la carrera',
        p: 'El ritmo salta con las cuestas, los cruces y la gente, así que el valor instantáneo es ruidoso. Los corredores con experiencia memorizan el tiempo que debe marcar el reloj en el kilómetro 5. Un solo número, comprobado una vez, dice si vas por delante o por detrás.',
      },
      {
        h: 'Sostener el ritmo cuesta más cuanto más larga es la distancia',
        p: 'La tabla de equivalencias de abajo se limita a extender tu ritmo a otras distancias. En la práctica, doblar la distancia cuesta entre 15 y 20 segundos por kilómetro, así que convertir un 10K directamente en objetivo de maratón sale optimista. Úsala para fijar ritmos de entrenamiento, no metas de carrera.',
      },
    ],
    faq: [
      { q: '¿Cómo paso de tiempo final a ritmo?', a: 'Divide el tiempo total entre la distancia. Un 10K en 55 minutos son 5 minutos 30 segundos por kilómetro. Memorizar el ritmo y no el tiempo final es lo que te permite corregir en el primer kilómetro en vez de en el último.' },
      { q: '¿Para qué sirven los tiempos de paso?', a: 'El ritmo oscila con el terreno y con la gente. Un parcial —el tiempo que debe marcar el reloj en el km 5, en el km 10— es una comprobación estable. Si el reloj marca menos que el objetivo, vas por delante.' },
      { q: '¿Puedo predecir el maratón desde un 10K?', a: 'No extendiendo el ritmo, que es lo que hace la tabla. La pérdida real ronda los 15 a 20 segundos por kilómetro cada vez que se dobla la distancia, así que la extensión directa resulta optimista. Los entrenadores usan factores de pérdida y datos de tirada larga.' },
      { q: '¿Por qué aparece también el ritmo por milla?', a: 'Muchas carreras en EE. UU., Reino Unido e Irlanda están marcadas en millas, y muchos relojes vienen configurados así. Una milla son 1,609344 km, de modo que 5:00/km equivalen a 8:03 por milla.' },
    ],
    ui: {
      section: 'Tu objetivo', race: 'Distancia', custom: 'Distancia personalizada', km: 'Distancia (km)',
      time: 'Tiempo objetivo', h: 'Horas', m: 'Minutos', s: 'Segundos',
      calc: 'Calcular ritmo', perKm: 'Ritmo por km', perMile: 'Por milla', speed: 'Velocidad', finish: 'Meta',
      splits: 'Tiempos de paso', splitsNote: 'Pasa por estos puntos a estas horas y vas en objetivo',
      equiv: 'Al mismo ritmo', equivNote: 'El ritmo extendido sin más — en realidad, más largo es más lento',
      c5k: '5K', c10k: '10K', chalf: 'Media maratón', cfull: 'Maratón',
    },
  },
  'pt-br': {
    title: 'Calculadora de pace de corrida',
    desc: 'Converte um tempo-alvo em pace por quilômetro, por milha e tempos de passagem',
    short: 'Pace e parciais a partir do seu alvo',
    intro: [
      {
        h: 'Corre-se por pace, não por tempo final',
        p: 'A meta é definida em tempo — «10K em 55 minutos» —, mas o que aparece no relógio enquanto você corre é o pace. Dividir 55 por 10 dá 5:30 por quilômetro, e é esse número que avisa se o primeiro quilômetro saiu rápido demais. Esta calculadora faz a conversão e mostra as parciais junto.',
      },
      {
        h: 'Na prova, as parciais valem mais que o pace',
        p: 'O pace oscila com subidas, cruzamentos e gente na frente, então o valor instantâneo é ruidoso. Quem tem experiência decora o tempo que o relógio deve marcar no quilômetro 5. Um número só, conferido uma vez, já diz se você está adiantado ou atrasado.',
      },
      {
        h: 'Segurar o pace fica mais difícil conforme a distância cresce',
        p: 'A tabela de equivalências abaixo apenas estende o seu pace para outras distâncias. Na prática, dobrar a distância custa de 15 a 20 segundos por quilômetro, então converter um 10K direto em meta de maratona sai otimista. Use para definir paces de treino, não metas de prova.',
      },
    ],
    faq: [
      { q: 'Como transformo tempo final em pace?', a: 'Divida o tempo total pela distância. Um 10K em 55 minutos é 5 minutos e 30 segundos por quilômetro. Decorar o pace em vez do tempo final é o que permite corrigir no primeiro quilômetro, e não no último.' },
      { q: 'Para que servem os tempos de passagem?', a: 'O pace balança com o terreno e com o pelotão. Uma parcial — o tempo que o relógio deve marcar no km 5, no km 10 — é uma checagem estável. Se o relógio marca menos que o alvo, você está adiantado.' },
      { q: 'Dá para prever a maratona pelo 10K?', a: 'Não estendendo o pace, que é o que a tabela faz. A perda real fica em torno de 15 a 20 segundos por quilômetro a cada vez que a distância dobra, então a extensão direta é otimista. Treinadores usam fatores de perda e dados de longão.' },
      { q: 'Por que mostrar também o pace por milha?', a: 'Provas nos EUA, no Reino Unido e na Irlanda costumam ser marcadas em milhas, e muitos relógios vêm configurados assim. Uma milha tem 1,609344 km, então 5:00/km equivalem a 8:03 por milha.' },
    ],
    ui: {
      section: 'Seu objetivo', race: 'Distância', custom: 'Distância personalizada', km: 'Distância (km)',
      time: 'Tempo-alvo', h: 'Horas', m: 'Minutos', s: 'Segundos',
      calc: 'Calcular pace', perKm: 'Pace por km', perMile: 'Por milha', speed: 'Velocidade', finish: 'Chegada',
      splits: 'Tempos de passagem', splitsNote: 'Passe nesses pontos nesses tempos e está no alvo',
      equiv: 'No mesmo pace', equivNote: 'O pace apenas estendido — na prática, mais longo é mais lento',
      c5k: '5K', c10k: '10K', chalf: 'Meia maratona', cfull: 'Maratona',
    },
  },
  ja: {
    title: 'ランニングペース計算',
    desc: '目標タイムから1kmあたりのペース・マイルペース・通過タイムを計算します',
    short: '目標タイムからペースと通過タイム',
    intro: [
      {
        h: '走るときに見るのはタイムではなくペース',
        p: '目標は「10kmを55分」のようにタイムで立てますが、走りながら時計に出るのは1kmあたりのペースです。55を10で割ると1kmあたり5分30秒。この数字があって初めて、最初の1kmで突っ込みすぎたかどうかが分かります。この計算機はその変換と通過タイムをまとめて出します。',
      },
      {
        h: 'レース中は通過タイムのほうが役に立つ',
        p: 'ペースは上り坂や信号、人の流れで絶えず揺れるので、瞬間の値だけを見ても判断が難しくなります。経験のあるランナーは代わりに「5km地点で時計が何分であるべきか」を覚えます。その一つの数字を一度確認するだけで、前に出ているか遅れているかが分かります。',
      },
      {
        h: '距離が延びると同じペースは保ちにくい',
        p: '下の「同じペースで走ったら」の表は、ペースをそのまま他の距離に伸ばしただけの値です。実際には距離が倍になるとペースは1kmあたり15〜20秒ほど落ちるのが普通なので、10kmのタイムをそのままフルマラソンに換算すると楽観的すぎる目標になります。練習強度を決める参考としてお使いください。',
      },
    ],
    faq: [
      { q: '目標タイムをペースに直すには？', a: '合計タイムを距離で割ります。10kmを55分なら1kmあたり5分30秒です。タイムではなくペースを覚えておくと、最後ではなく最初の1kmで修正できます。' },
      { q: '通過タイムは何のためにありますか？', a: 'ペースは地形や混雑で揺れます。通過タイム、つまり5km地点や10km地点で時計が示すべき値は、安定した一つの目安になります。時計が目標より少なければ前に出ています。' },
      { q: '10kmのタイムからフルマラソンを予測できますか？', a: '表のようにペースをそのまま伸ばす方法ではできません。距離が倍になるごとに1kmあたり15〜20秒ほど落ちるのが実際なので、単純な延長は楽観的です。指導では低下係数や距離走のデータを使います。' },
      { q: 'マイルペースも出るのはなぜですか？', a: '米国・英国・アイルランドの大会はマイル表示が多く、時計の初期設定がマイルのままの人も少なくありません。1マイルは1.609344kmなので、5:00/kmは1マイル8分3秒にあたります。' },
    ],
    ui: {
      section: '目標', race: '距離', custom: '距離を入力', km: '距離 (km)',
      time: '目標タイム', h: '時', m: '分', s: '秒',
      calc: 'ペースを計算', perKm: '1kmあたり', perMile: '1マイルあたり', speed: '時速', finish: 'ゴール',
      splits: '通過タイム', splitsNote: 'この時刻に通過していれば目標どおりです',
      equiv: '同じペースで走ったら', equivNote: 'ペースをそのまま伸ばした値です — 実際は長いほど遅くなります',
      c5k: '5K', c10k: '10K', chalf: 'ハーフマラソン', cfull: 'フルマラソン',
    },
  },
  de: {
    title: 'Laufpace-Rechner',
    desc: 'Rechnet eine Zielzeit in Pace pro Kilometer, Pace pro Meile und Zwischenzeiten um',
    short: 'Pace und Zwischenzeiten aus der Zielzeit',
    intro: [
      {
        h: 'Gelaufen wird nach Pace, nicht nach Zielzeit',
        p: 'Das Ziel wird als Zeit gesetzt — «10 km in 55 Minuten» —, aber auf der Uhr steht während des Laufens die Pace. 55 geteilt durch 10 ergibt 5:30 pro Kilometer, und erst diese Zahl verrät, ob der erste Kilometer zu schnell war. Dieser Rechner nimmt die Umrechnung vor und legt die Zwischenzeiten daneben.',
      },
      {
        h: 'Im Rennen helfen Zwischenzeiten mehr als die Pace',
        p: 'Die Pace springt an Anstiegen, Kreuzungen und in Pulks, das Momentanwert ist also verrauscht. Erfahrene Läuferinnen und Läufer merken sich stattdessen, was die Uhr bei Kilometer 5 zeigen soll. Eine Zahl, einmal geprüft, sagt, ob man vorn oder hinten liegt.',
      },
      {
        h: 'Mit wachsender Distanz wird die Pace schwerer zu halten',
        p: 'Die Tabelle unten verlängert die Pace lediglich auf andere Distanzen. In der Praxis kostet eine Verdopplung der Strecke etwa 15 bis 20 Sekunden pro Kilometer, eine 10-km-Zeit direkt in ein Marathonziel umzurechnen fällt daher zu optimistisch aus. Nutzen Sie sie für Trainingspaces, nicht für Wettkampfziele.',
      },
    ],
    faq: [
      { q: 'Wie rechne ich eine Zielzeit in Pace um?', a: 'Gesamtzeit durch Distanz teilen. 10 km in 55 Minuten sind 5 Minuten 30 Sekunden pro Kilometer. Wer die Pace statt der Zielzeit im Kopf hat, korrigiert auf dem ersten Kilometer statt auf dem letzten.' },
      { q: 'Wozu die Zwischenzeiten?', a: 'Die Pace schwankt mit Gelände und Feld. Eine Zwischenzeit — was die Uhr bei km 5 oder km 10 zeigen soll — ist eine stabile Kontrolle. Zeigt die Uhr weniger als das Ziel, liegen Sie vorn.' },
      { q: 'Lässt sich aus 10 km eine Marathonzeit ableiten?', a: 'Nicht durch bloßes Verlängern der Pace, was die Tabelle tut. Der reale Einbruch liegt bei 15 bis 20 Sekunden pro Kilometer je Verdopplung der Distanz, die direkte Hochrechnung fällt also zu günstig aus. Im Training arbeitet man mit Einbruchsfaktoren und Langlaufdaten.' },
      { q: 'Warum steht auch die Pace pro Meile da?', a: 'Rennen in den USA, Großbritannien und Irland sind oft in Meilen ausgeschildert, und viele Uhren sind ab Werk darauf eingestellt. Eine Meile sind 1,609344 km, 5:00/km entsprechen also 8:03 pro Meile.' },
    ],
    ui: {
      section: 'Ihr Ziel', race: 'Distanz', custom: 'Eigene Distanz', km: 'Distanz (km)',
      time: 'Zielzeit', h: 'Stunden', m: 'Minuten', s: 'Sekunden',
      calc: 'Pace berechnen', perKm: 'Pace pro km', perMile: 'Pro Meile', speed: 'Tempo', finish: 'Ziel',
      splits: 'Zwischenzeiten', splitsNote: 'Passieren Sie diese Punkte zu diesen Zeiten, liegen Sie im Plan',
      equiv: 'Bei gleicher Pace', equivNote: 'Die Pace nur verlängert — in Wirklichkeit wird es länger langsamer',
      c5k: '5 km', c10k: '10 km', chalf: 'Halbmarathon', cfull: 'Marathon',
    },
  },
  fr: {
    title: 'Calculateur d’allure de course',
    desc: 'Convertit un temps visé en allure au kilomètre, allure au mile et temps de passage',
    short: 'Allure et passages depuis votre objectif',
    intro: [
      {
        h: 'On court à l’allure, pas au chrono final',
        p: 'L’objectif se fixe en temps — «10 km en 55 minutes» —, mais ce qui s’affiche à la montre pendant la course, c’est l’allure. 55 divisé par 10 donne 5:30 au kilomètre, et c’est ce chiffre qui signale un premier kilomètre parti trop vite. Ce calculateur fait la conversion et pose les temps de passage à côté.',
      },
      {
        h: 'En course, les passages servent plus que l’allure',
        p: 'L’allure bouge avec les côtes, les carrefours et le peloton : la valeur instantanée est bruitée. Les coureurs expérimentés retiennent plutôt le temps que la montre doit afficher au 5e kilomètre. Un seul chiffre, vérifié une fois, dit si l’on est devant ou derrière.',
      },
      {
        h: 'Tenir l’allure devient plus dur quand la distance grandit',
        p: 'Le tableau d’équivalences ci-dessous se contente de prolonger votre allure sur d’autres distances. En pratique, doubler la distance coûte de 15 à 20 secondes au kilomètre : convertir un 10 km directement en objectif marathon donne un résultat optimiste. Servez-vous-en pour caler des allures d’entraînement, pas des objectifs de course.',
      },
    ],
    faq: [
      { q: 'Comment passer d’un chrono à une allure ?', a: 'Divisez le temps total par la distance. 10 km en 55 minutes font 5 minutes 30 secondes au kilomètre. Retenir l’allure plutôt que le chrono permet de se corriger au premier kilomètre et non au dernier.' },
      { q: 'À quoi servent les temps de passage ?', a: 'L’allure oscille avec le terrain et le peloton. Un temps de passage — ce que la montre doit afficher au 5e ou au 10e kilomètre — est un repère stable. Si la montre affiche moins que la cible, vous êtes devant.' },
      { q: 'Peut-on prédire un marathon à partir d’un 10 km ?', a: 'Pas en prolongeant l’allure, ce que fait le tableau. La perte réelle avoisine 15 à 20 secondes au kilomètre à chaque doublement de distance : la simple extension est donc trop favorable. L’entraînement utilise des coefficients de perte et les données de sortie longue.' },
      { q: 'Pourquoi afficher aussi l’allure au mile ?', a: 'Les courses aux États-Unis, au Royaume-Uni et en Irlande sont souvent balisées en miles, et beaucoup de montres sont réglées ainsi d’origine. Un mile vaut 1,609344 km : 5:00/km correspondent à 8:03 au mile.' },
    ],
    ui: {
      section: 'Votre objectif', race: 'Distance', custom: 'Distance libre', km: 'Distance (km)',
      time: 'Temps visé', h: 'Heures', m: 'Minutes', s: 'Secondes',
      calc: 'Calculer l’allure', perKm: 'Allure au km', perMile: 'Au mile', speed: 'Vitesse', finish: 'Arrivée',
      splits: 'Temps de passage', splitsNote: 'Passez à ces points à ces heures et vous tenez l’objectif',
      equiv: 'À la même allure', equivNote: 'L’allure simplement prolongée — en réalité, plus long est plus lent',
      c5k: '5 km', c10k: '10 km', chalf: 'Semi-marathon', cfull: 'Marathon',
    },
  },
  hi: {
    title: 'रनिंग पेस कैलकुलेटर',
    desc: 'लक्ष्य समय से प्रति किलोमीटर पेस, प्रति मील पेस और स्प्लिट समय निकालें',
    short: 'लक्ष्य समय से पेस और स्प्लिट',
    intro: [
      {
        h: 'दौड़ते समय दिखता है पेस, फ़िनिश टाइम नहीं',
        p: 'लक्ष्य समय में तय होता है — «10 किमी 55 मिनट में» — पर दौड़ते हुए घड़ी पर जो दिखता है वह प्रति किलोमीटर पेस है। 55 को 10 से भाग देने पर 5:30 प्रति किलोमीटर आता है, और यही संख्या बताती है कि पहला किलोमीटर बहुत तेज़ तो नहीं निकल गया। यह कैलकुलेटर वही रूपांतरण करता है और साथ में स्प्लिट भी देता है।',
      },
      {
        h: 'दौड़ के बीच स्प्लिट पेस से ज़्यादा काम आता है',
        p: 'चढ़ाई, चौराहे और भीड़ से पेस लगातार हिलता रहता है, इसलिए क्षणिक मान से निर्णय कठिन होता है। अनुभवी धावक इसके बजाय याद रखते हैं कि 5 किमी पर घड़ी में कितना दिखना चाहिए। एक संख्या, एक बार जाँची — और पता चल जाता है कि आप आगे हैं या पीछे।',
      },
      {
        h: 'दूरी बढ़ने पर वही पेस बनाए रखना कठिन होता है',
        p: 'नीचे की «उसी पेस पर» तालिका आपके पेस को अन्य दूरियों तक बस बढ़ा देती है। असल में दूरी दोगुनी होने पर पेस लगभग 15 से 20 सेकंड प्रति किलोमीटर धीमा पड़ता है, इसलिए 10 किमी के समय को सीधे मैराथन में बदलना बहुत आशावादी लक्ष्य देता है। इसे प्रशिक्षण की गति तय करने के लिए ही इस्तेमाल करें।',
      },
    ],
    faq: [
      { q: 'फ़िनिश टाइम को पेस में कैसे बदलें?', a: 'कुल समय को दूरी से भाग दें। 55 मिनट में 10 किमी यानी 5 मिनट 30 सेकंड प्रति किलोमीटर। फ़िनिश टाइम की जगह पेस याद रखने से सुधार आख़िरी नहीं, पहले किलोमीटर में हो जाता है।' },
      { q: 'स्प्लिट समय किस काम आता है?', a: 'पेस ज़मीन और भीड़ के साथ डोलता है। स्प्लिट — यानी 5 किमी या 10 किमी पर घड़ी में दिखने वाला समय — एक स्थिर जाँच है। घड़ी लक्ष्य से कम दिखाए तो आप आगे हैं।' },
      { q: 'क्या 10 किमी से मैराथन का समय आँका जा सकता है?', a: 'पेस को बस बढ़ा देकर नहीं, जो यह तालिका करती है। असल गिरावट हर बार दूरी दोगुनी होने पर लगभग 15 से 20 सेकंड प्रति किलोमीटर होती है, इसलिए सीधा विस्तार बहुत अनुकूल निकलता है। कोच इसके लिए गिरावट गुणक और लंबी दौड़ के आँकड़े देखते हैं।' },
      { q: 'प्रति मील पेस भी क्यों दिखता है?', a: 'अमेरिका, ब्रिटेन और आयरलैंड की दौड़ें अक्सर मील में चिह्नित होती हैं, और कई घड़ियाँ मील पर ही सेट आती हैं। एक मील 1.609344 किमी होता है, इसलिए 5:00/किमी का पेस 8:03 प्रति मील है।' },
    ],
    ui: {
      section: 'आपका लक्ष्य', race: 'दूरी', custom: 'अपनी दूरी', km: 'दूरी (किमी)',
      time: 'लक्ष्य समय', h: 'घंटे', m: 'मिनट', s: 'सेकंड',
      calc: 'पेस निकालें', perKm: 'प्रति किमी पेस', perMile: 'प्रति मील', speed: 'गति', finish: 'फ़िनिश',
      splits: 'स्प्लिट समय', splitsNote: 'इन बिंदुओं पर इसी समय पहुँचें तो आप लक्ष्य पर हैं',
      equiv: 'उसी पेस पर', equivNote: 'पेस को बस बढ़ाया गया है — असल में लंबी दूरी धीमी पड़ती है',
      c5k: '5 किमी', c10k: '10 किमी', chalf: 'हाफ़ मैराथन', cfull: 'मैराथन',
    },
  },
  'zh-hans': {
    title: '跑步配速计算器',
    desc: '把目标成绩换算成每公里配速、每英里配速和各段通过时间',
    short: '由目标成绩得出配速与分段',
    intro: [
      {
        h: '跑的时候看的是配速，不是成绩',
        p: '目标通常以成绩来定——「10公里55分钟」——但跑起来手表上显示的是每公里配速。55除以10得到每公里5分30秒，有了这个数字才知道第一公里是不是冲得太快。这个计算器做的就是这层换算，并把分段时间一并列出。',
      },
      {
        h: '比赛中分段比配速更有用',
        p: '配速会随坡度、路口和人流不停跳动，只看瞬时值很难判断。有经验的跑者改为记住「5公里处手表应该是多少」。一个数字，看一次，就知道自己是领先还是落后。',
      },
      {
        h: '距离越长，配速越难保持',
        p: '下面的「同样配速」表只是把配速直接延伸到其他距离。实际上距离翻倍通常要慢上每公里15到20秒，所以拿10公里成绩直接换算全马会得到过于乐观的目标。它适合用来定训练强度，而不是比赛目标。',
      },
    ],
    faq: [
      { q: '怎么把成绩换成配速？', a: '用总时间除以距离。10公里55分钟就是每公里5分30秒。记住配速而不是成绩，才能在第一公里而不是最后一公里做出修正。' },
      { q: '分段时间有什么用？', a: '配速会随地形和人流摆动。分段时间——也就是5公里、10公里处手表应该显示的数字——是一个稳定的核对点。手表读数小于目标，说明你领先。' },
      { q: '能用10公里成绩预测马拉松吗？', a: '像表格那样直接延伸配速是不行的。距离每翻一倍，实际大约会慢每公里15到20秒，所以直接外推偏乐观。教练会用衰减系数和长距离训练数据来推算。' },
      { q: '为什么还显示每英里配速？', a: '美国、英国和爱尔兰的比赛常按英里标记，很多手表出厂默认也是英里。1英里等于1.609344公里，所以每公里5分00秒相当于每英里8分03秒。' },
    ],
    ui: {
      section: '你的目标', race: '距离', custom: '自定义距离', km: '距离（公里）',
      time: '目标成绩', h: '小时', m: '分', s: '秒',
      calc: '计算配速', perKm: '每公里配速', perMile: '每英里', speed: '时速', finish: '完赛',
      splits: '分段时间', splitsNote: '按这些时间通过这些点，就在目标上',
      equiv: '同样配速下', equivNote: '只是把配速延伸了——实际上距离越长越慢',
      c5k: '5公里', c10k: '10公里', chalf: '半程马拉松', cfull: '马拉松',
    },
  },
  'zh-hant': {
    title: '跑步配速計算器',
    desc: '把目標成績換算成每公里配速、每英里配速與各段通過時間',
    short: '由目標成績得出配速與分段',
    intro: [
      {
        h: '跑的時候看的是配速，不是成績',
        p: '目標通常以成績來定——「10公里55分鐘」——但跑起來手錶上顯示的是每公里配速。55除以10得到每公里5分30秒，有了這個數字才知道第一公里是不是衝得太快。這個計算器做的就是這層換算，並把分段時間一併列出。',
      },
      {
        h: '比賽中分段比配速更有用',
        p: '配速會隨坡度、路口與人流不停跳動，只看瞬時值很難判斷。有經驗的跑者改為記住「5公里處手錶應該是多少」。一個數字，看一次，就知道自己是領先還是落後。',
      },
      {
        h: '距離越長，配速越難保持',
        p: '下面的「同樣配速」表只是把配速直接延伸到其他距離。實際上距離翻倍通常要慢上每公里15到20秒，所以拿10公里成績直接換算全馬會得到過於樂觀的目標。它適合用來定訓練強度，而不是比賽目標。',
      },
    ],
    faq: [
      { q: '怎麼把成績換成配速？', a: '用總時間除以距離。10公里55分鐘就是每公里5分30秒。記住配速而不是成績，才能在第一公里而不是最後一公里做出修正。' },
      { q: '分段時間有什麼用？', a: '配速會隨地形與人流擺動。分段時間——也就是5公里、10公里處手錶應該顯示的數字——是一個穩定的核對點。手錶讀數小於目標，代表你領先。' },
      { q: '能用10公里成績預測馬拉松嗎？', a: '像表格那樣直接延伸配速是不行的。距離每翻一倍，實際大約會慢每公里15到20秒，所以直接外推偏樂觀。教練會用衰減係數與長距離訓練資料來推算。' },
      { q: '為什麼還顯示每英里配速？', a: '美國、英國與愛爾蘭的比賽常按英里標記，很多手錶出廠預設也是英里。1英里等於1.609344公里，所以每公里5分00秒相當於每英里8分03秒。' },
    ],
    ui: {
      section: '你的目標', race: '距離', custom: '自訂距離', km: '距離（公里）',
      time: '目標成績', h: '小時', m: '分', s: '秒',
      calc: '計算配速', perKm: '每公里配速', perMile: '每英里', speed: '時速', finish: '完賽',
      splits: '分段時間', splitsNote: '按這些時間通過這些點，就在目標上',
      equiv: '同樣配速下', equivNote: '只是把配速延伸了——實際上距離越長越慢',
      c5k: '5公里', c10k: '10公里', chalf: '半程馬拉松', cfull: '馬拉松',
    },
  },
};

export const ONE_REP_MAX: CalcTable = {
  en: {
    title: 'One-rep max calculator',
    desc: 'Estimate your 1RM from a weight and rep count, with training percentages',
    short: '1RM and training percentages',
    intro: [
      { h: 'Estimating beats testing', p: 'A one-rep max is the heaviest weight you can lift once. Testing it means grinding to failure, which carries real injury risk and costs days of recovery. Working backwards from a set you already did — five reps at a given weight is plenty — is safer and accurate enough for programming.' },
      { h: 'The formulas disagree, on purpose', p: 'Epley, Brzycki and Lombardi come from different datasets, so the same input can produce estimates several kilos apart. Showing one number makes it look definitive. This calculator shows all three, takes the middle value as the recommendation, and reports the spread so you can see how confident to be.' },
      { h: 'What you actually use is the percentage table', p: 'Programmes are written as "80% of 1RM for five sets of five". The table below converts your estimate into working weights rounded to 2.5 kg, which is the plate increment, so the number on screen is the number you load.' },
    ],
    faq: [
      { q: 'Should I test my 1RM directly?', a: 'Generally no. A true single means grinding to failure, with real injury risk and several days of recovery. A set of five to eight reps gives an estimate that is safe to collect and accurate enough to programme from.' },
      { q: 'Which formula is correct?', a: 'None of them, exactly. They are regressions on different populations, so they disagree by a few kilos on the same input. Using the middle of the three, and watching the spread, is more honest than picking a favourite.' },
      { q: 'How many reps give the best estimate?', a: 'Five to eight. Above ten reps the formulas diverge sharply, because endurance starts to dominate. Below three you are already close to a true max, so there is little left to estimate.' },
      { q: 'Why round to 2.5 kg?', a: 'Because that is the smallest plate pair on most bars. A calculation of 78.3 kg cannot be loaded; 77.5 or 80 can. The table gives you what you can actually put on the bar.' },
      { q: 'Does this work in pounds?', a: 'The formulas are unit-free, so an input in pounds gives an output in pounds. Only the 2.5 kg rounding is metric — in a pound gym, round to the nearest 5 lb yourself.' },
    ],
    ui: {
      section: 'Your set', weight: 'Weight (kg)', reps: 'Reps', calc: 'Estimate 1RM',
      est: 'Estimated 1RM', best: 'Recommended', spread: 'Across formulas',
      table: 'Working weights', tableNote: 'Rounded to 2.5 kg so it matches the plates',
      why: 'Why the formulas differ', wide: 'Above ten reps the formulas diverge sharply. A set of five to eight gives a much tighter estimate.',
      use1: 'Max attempt', use2: 'Maximal strength', use3: 'Strength', use4: 'Strength and size', use5: 'Hypertrophy', use6: 'Endurance', use7: 'Warm-up',
    },
  },
  es: {
    title: 'Calculadora de 1RM',
    desc: 'Estima tu repetición máxima a partir de un peso y unas repeticiones, con porcentajes de entrenamiento',
    short: '1RM y porcentajes de trabajo',
    intro: [
      { h: 'Estimar es mejor que medir', p: 'La repetición máxima es el peso más alto que puedes levantar una vez. Medirla exige llegar al fallo, con riesgo real de lesión y varios días de recuperación. Deducirla de una serie que ya hiciste —cinco repeticiones bastan— es más seguro y suficientemente preciso para programar.' },
      { h: 'Las fórmulas discrepan, y eso importa', p: 'Epley, Brzycki y Lombardi salen de conjuntos de datos distintos, así que la misma entrada da estimaciones separadas por varios kilos. Mostrar un solo número lo haría parecer definitivo. Esta calculadora muestra las tres, toma la del medio como recomendación e indica la dispersión.' },
      { h: 'Lo que se usa de verdad es la tabla de porcentajes', p: 'Los programas se escriben como «80% del 1RM, cinco series de cinco». La tabla convierte tu estimación en pesos de trabajo redondeados a 2,5 kg, que es el salto de disco, de modo que el número en pantalla es el que cargas.' },
    ],
    faq: [
      { q: '¿Conviene medir el 1RM directamente?', a: 'En general no. Una única repetición máxima real implica llegar al fallo, con riesgo de lesión y varios días de recuperación. Una serie de cinco a ocho repeticiones da una estimación segura y suficiente para programar.' },
      { q: '¿Qué fórmula es la correcta?', a: 'Ninguna lo es del todo. Son regresiones sobre poblaciones distintas y discrepan en unos kilos con la misma entrada. Tomar la del medio y mirar la dispersión es más honesto que elegir una favorita.' },
      { q: '¿Con cuántas repeticiones sale mejor?', a: 'Entre cinco y ocho. Por encima de diez las fórmulas se separan mucho porque empieza a pesar la resistencia. Por debajo de tres ya estás cerca del máximo real y queda poco que estimar.' },
      { q: '¿Por qué se redondea a 2,5 kg?', a: 'Porque es el par de discos más pequeño en la mayoría de barras. Un cálculo de 78,3 kg no se puede cargar; 77,5 u 80 sí. La tabla te da lo que realmente puedes poner.' },
      { q: '¿Sirve en libras?', a: 'Las fórmulas no dependen de la unidad: si entras libras, sales en libras. Solo el redondeo a 2,5 kg es métrico — en un gimnasio en libras, redondea tú a 5 lb.' },
    ],
    ui: {
      section: 'Tu serie', weight: 'Peso (kg)', reps: 'Repeticiones', calc: 'Estimar 1RM',
      est: '1RM estimado', best: 'Recomendado', spread: 'Entre fórmulas',
      table: 'Pesos de trabajo', tableNote: 'Redondeado a 2,5 kg para que cuadre con los discos',
      why: 'Por qué difieren las fórmulas', wide: 'Por encima de diez repeticiones las fórmulas se separan mucho. Una serie de cinco a ocho da una estimación más ajustada.',
      use1: 'Intento máximo', use2: 'Fuerza máxima', use3: 'Fuerza', use4: 'Fuerza e hipertrofia', use5: 'Hipertrofia', use6: 'Resistencia', use7: 'Calentamiento',
    },
  },
  'pt-br': {
    title: 'Calculadora de 1RM',
    desc: 'Estima sua repetição máxima a partir de um peso e um número de repetições, com percentuais de treino',
    short: '1RM e percentuais de treino',
    intro: [
      { h: 'Estimar é melhor que testar', p: 'A repetição máxima é o maior peso que você levanta uma vez. Testar exige ir até a falha, com risco real de lesão e vários dias de recuperação. Deduzir a partir de uma série que você já fez — cinco repetições bastam — é mais seguro e preciso o bastante para montar o treino.' },
      { h: 'As fórmulas discordam, e isso é informação', p: 'Epley, Brzycki e Lombardi vêm de conjuntos de dados diferentes, então a mesma entrada gera estimativas com vários quilos de diferença. Mostrar um número só faria parecer definitivo. Esta calculadora mostra as três, usa a do meio como recomendação e informa a dispersão.' },
      { h: 'O que se usa mesmo é a tabela de percentuais', p: 'Os programas são escritos como «80% do 1RM, cinco séries de cinco». A tabela converte sua estimativa em pesos de trabalho arredondados para 2,5 kg, que é o salto de anilha, então o número da tela é o que você coloca na barra.' },
    ],
    faq: [
      { q: 'Vale testar o 1RM direto?', a: 'Em geral não. Uma máxima real exige ir à falha, com risco de lesão e dias de recuperação. Uma série de cinco a oito repetições dá uma estimativa segura e suficiente para programar.' },
      { q: 'Qual fórmula está certa?', a: 'Nenhuma exatamente. São regressões sobre populações diferentes e divergem alguns quilos na mesma entrada. Pegar a do meio e olhar a dispersão é mais honesto que escolher uma preferida.' },
      { q: 'Quantas repetições dão a melhor estimativa?', a: 'De cinco a oito. Acima de dez as fórmulas se afastam muito, porque a resistência passa a pesar. Abaixo de três você já está perto da máxima real e sobra pouco a estimar.' },
      { q: 'Por que arredondar para 2,5 kg?', a: 'Porque é o menor par de anilhas na maioria das barras. Um cálculo de 78,3 kg não dá para montar; 77,5 ou 80 dá. A tabela entrega o que você consegue colocar.' },
      { q: 'Funciona em libras?', a: 'As fórmulas independem de unidade: entrada em libras, saída em libras. Só o arredondamento de 2,5 kg é métrico — em academia com libras, arredonde para 5 lb.' },
    ],
    ui: {
      section: 'Sua série', weight: 'Peso (kg)', reps: 'Repetições', calc: 'Estimar 1RM',
      est: '1RM estimado', best: 'Recomendado', spread: 'Entre as fórmulas',
      table: 'Pesos de trabalho', tableNote: 'Arredondado para 2,5 kg para bater com as anilhas',
      why: 'Por que as fórmulas diferem', wide: 'Acima de dez repetições as fórmulas se afastam muito. Uma série de cinco a oito dá uma estimativa bem mais fechada.',
      use1: 'Tentativa máxima', use2: 'Força máxima', use3: 'Força', use4: 'Força e hipertrofia', use5: 'Hipertrofia', use6: 'Resistência', use7: 'Aquecimento',
    },
  },
  ja: {
    title: '1RM計算機',
    desc: '挙げた重量と回数から1回最大挙上重量と強度別の重量を計算します',
    short: '1RMと強度別の重量',
    intro: [
      { h: '測るより推定するほうが安全', p: '1RMは一度だけ挙げられる最大重量です。実際に測るには限界まで押し切る必要があり、怪我の危険が大きく回復にも数日かかります。すでに行ったセット、たとえば5回挙げた重量から逆算するほうが安全で、プログラムを組むには十分な精度です。' },
      { h: '式によって値が違うこと自体が情報', p: 'エプリー・ブジッキ・ロンバルディはそれぞれ別のデータから作られた近似式で、同じ入力でも数kgずれます。一つだけ出すとその値が正解のように見えます。この計算機は三つを並べ、中央の値を推奨とし、ばらつきも示します。' },
      { h: '実際に使うのは％の表', p: 'プログラムは「1RMの80%で5回5セット」のように書かれます。下の表は推定値を2.5kg刻みに丸めた実用重量に直したものです。プレートの最小単位がそれなので、画面の数字をそのまま積めます。' },
    ],
    faq: [
      { q: '1RMを直接測ってもいいですか？', a: '基本的にはおすすめしません。本当の1回最大は限界まで押し切ることになり、怪我の危険と数日の回復を伴います。5〜8回のセットなら安全に取れて、プログラムを組むには十分です。' },
      { q: 'どの式が正しいのですか？', a: 'どれも厳密には正しくありません。対象集団の違う回帰式なので、同じ入力でも数kg食い違います。三つの中央を使い、ばらつきを見ておくほうが誠実です。' },
      { q: '何回で測るのが一番正確ですか？', a: '5〜8回です。10回を超えると持久力の影響が大きくなり式同士が大きく開きます。3回以下ではすでに最大に近く、推定する余地がほとんどありません。' },
      { q: 'なぜ2.5kg刻みなのですか？', a: '多くのバーで最小のプレート一組がその重さだからです。78.3kgは積めませんが、77.5kgや80kgなら積めます。表は実際に積める値を返します。' },
      { q: 'ポンドでも使えますか？', a: '式は単位に依存しないので、ポンドで入れればポンドで出ます。2.5kg刻みだけがメートル法なので、ポンドのジムでは5lb刻みでご自分で丸めてください。' },
    ],
    ui: {
      section: '挙げたセット', weight: '重量 (kg)', reps: '回数', calc: '1RMを計算',
      est: '推定1RM', best: '推奨', spread: '式によるばらつき',
      table: '強度別の重量', tableNote: 'プレートに合わせて2.5kg刻みに丸めています',
      why: '式が違う理由', wide: '10回を超えると式同士が大きく開きます。5〜8回のセットのほうがはるかに正確です。',
      use1: '最大挑戦', use2: '最大筋力', use3: '筋力', use4: '筋力・筋肥大', use5: '筋肥大', use6: '筋持久力', use7: 'ウォームアップ',
    },
  },
  de: {
    title: '1RM-Rechner',
    desc: 'Schätzt das Einwiederholungsmaximum aus Gewicht und Wiederholungen, mit Trainingsprozenten',
    short: '1RM und Trainingsprozente',
    intro: [
      { h: 'Schätzen ist besser als testen', p: 'Das Einwiederholungsmaximum ist das schwerste Gewicht, das Sie einmal bewegen können. Es zu testen heißt, bis zum Muskelversagen zu gehen — mit realem Verletzungsrisiko und mehreren Tagen Regeneration. Aus einem bereits absolvierten Satz zurückzurechnen, fünf Wiederholungen genügen, ist sicherer und für die Trainingsplanung genau genug.' },
      { h: 'Dass die Formeln abweichen, ist die eigentliche Information', p: 'Epley, Brzycki und Lombardi stammen aus verschiedenen Datensätzen, dieselbe Eingabe liefert also Schätzungen, die mehrere Kilo auseinanderliegen. Eine einzelne Zahl sähe endgültig aus. Dieser Rechner zeigt alle drei, nimmt den mittleren Wert als Empfehlung und nennt die Spannweite.' },
      { h: 'Gebraucht wird am Ende die Prozenttabelle', p: 'Pläne stehen als «80 % des 1RM, fünf Sätze zu fünf» da. Die Tabelle rechnet Ihre Schätzung in Arbeitsgewichte um, gerundet auf 2,5 kg — die kleinste Scheibenstufe —, sodass die Zahl auf dem Schirm die Zahl auf der Stange ist.' },
    ],
    faq: [
      { q: 'Soll ich mein 1RM direkt testen?', a: 'In der Regel nicht. Ein echter Maximalversuch heißt bis zum Versagen gehen, mit Verletzungsrisiko und mehreren Tagen Regeneration. Ein Satz mit fünf bis acht Wiederholungen liefert eine Schätzung, die sicher zu erheben und für die Planung genau genug ist.' },
      { q: 'Welche Formel stimmt?', a: 'Keine ganz genau. Es sind Regressionen über unterschiedliche Gruppen, sie weichen bei gleicher Eingabe um einige Kilo ab. Den mittleren Wert zu nehmen und die Spannweite im Blick zu behalten ist ehrlicher, als eine Lieblingsformel zu wählen.' },
      { q: 'Wie viele Wiederholungen sind am besten?', a: 'Fünf bis acht. Über zehn laufen die Formeln stark auseinander, weil die Ausdauer zu dominieren beginnt. Unter drei sind Sie bereits nahe am echten Maximum, da bleibt kaum etwas zu schätzen.' },
      { q: 'Warum auf 2,5 kg runden?', a: 'Weil das an den meisten Stangen das kleinste Scheibenpaar ist. 78,3 kg lassen sich nicht auflegen, 77,5 oder 80 schon. Die Tabelle gibt aus, was tatsächlich auf die Stange passt.' },
      { q: 'Funktioniert das mit Pfund?', a: 'Die Formeln sind einheitenfrei: Eingabe in Pfund, Ausgabe in Pfund. Nur die 2,5-kg-Rundung ist metrisch — in einem Pfund-Studio runden Sie selbst auf 5 lb.' },
    ],
    ui: {
      section: 'Ihr Satz', weight: 'Gewicht (kg)', reps: 'Wiederholungen', calc: '1RM schätzen',
      est: 'Geschätztes 1RM', best: 'Empfehlung', spread: 'Spannweite der Formeln',
      table: 'Arbeitsgewichte', tableNote: 'Auf 2,5 kg gerundet, passend zu den Scheiben',
      why: 'Warum die Formeln abweichen', wide: 'Über zehn Wiederholungen laufen die Formeln stark auseinander. Ein Satz mit fünf bis acht ergibt eine deutlich engere Schätzung.',
      use1: 'Maximalversuch', use2: 'Maximalkraft', use3: 'Kraft', use4: 'Kraft und Hypertrophie', use5: 'Hypertrophie', use6: 'Kraftausdauer', use7: 'Aufwärmen',
    },
  },
  fr: {
    title: 'Calculateur de 1RM',
    desc: 'Estime votre maximale sur une répétition à partir d’une charge et d’un nombre de répétitions, avec les pourcentages d’entraînement',
    short: '1RM et pourcentages de travail',
    intro: [
      { h: 'Estimer vaut mieux que tester', p: 'La maximale sur une répétition est la charge la plus lourde que vous pouvez soulever une fois. La tester impose d’aller à l’échec, avec un vrai risque de blessure et plusieurs jours de récupération. Remonter depuis une série déjà réalisée — cinq répétitions suffisent — est plus sûr et assez précis pour programmer.' },
      { h: 'Le désaccord entre formules est l’information', p: 'Epley, Brzycki et Lombardi viennent de jeux de données différents : la même entrée donne des estimations écartées de plusieurs kilos. Afficher un seul chiffre le ferait passer pour définitif. Ce calculateur montre les trois, retient la valeur médiane comme recommandation et indique l’écart.' },
      { h: 'Ce qui sert vraiment, c’est le tableau de pourcentages', p: 'Les programmes s’écrivent «80 % du 1RM, cinq séries de cinq». Le tableau convertit votre estimation en charges de travail arrondies à 2,5 kg, l’incrément de disque, de sorte que le chiffre affiché est celui que vous chargez.' },
    ],
    faq: [
      { q: 'Faut-il tester son 1RM directement ?', a: 'En général non. Une vraie maximale implique d’aller à l’échec, avec un risque de blessure et plusieurs jours de récupération. Une série de cinq à huit répétitions donne une estimation sûre à obtenir et assez précise pour programmer.' },
      { q: 'Quelle formule est la bonne ?', a: 'Aucune ne l’est exactement. Ce sont des régressions sur des populations différentes, elles s’écartent de quelques kilos sur la même entrée. Prendre la médiane et regarder l’écart est plus honnête que de choisir une favorite.' },
      { q: 'Combien de répétitions pour la meilleure estimation ?', a: 'De cinq à huit. Au-delà de dix, les formules divergent nettement car l’endurance prend le dessus. En dessous de trois, vous êtes déjà proche de la maximale réelle : il reste peu à estimer.' },
      { q: 'Pourquoi arrondir à 2,5 kg ?', a: 'Parce que c’est la plus petite paire de disques sur la plupart des barres. Un calcul à 78,3 kg ne se charge pas ; 77,5 ou 80 si. Le tableau donne ce que vous pouvez réellement poser.' },
      { q: 'Cela marche-t-il en livres ?', a: 'Les formules sont sans unité : entrée en livres, sortie en livres. Seul l’arrondi à 2,5 kg est métrique — dans une salle en livres, arrondissez vous-même à 5 lb.' },
    ],
    ui: {
      section: 'Votre série', weight: 'Charge (kg)', reps: 'Répétitions', calc: 'Estimer le 1RM',
      est: '1RM estimé', best: 'Recommandé', spread: 'Écart entre formules',
      table: 'Charges de travail', tableNote: 'Arrondi à 2,5 kg pour coller aux disques',
      why: 'Pourquoi les formules diffèrent', wide: 'Au-delà de dix répétitions, les formules divergent nettement. Une série de cinq à huit donne une estimation bien plus serrée.',
      use1: 'Tentative maximale', use2: 'Force maximale', use3: 'Force', use4: 'Force et hypertrophie', use5: 'Hypertrophie', use6: 'Endurance de force', use7: 'Échauffement',
    },
  },
  hi: {
    title: '1RM कैलकुलेटर',
    desc: 'उठाए गए वज़न और दोहराव से एक-दोहराव अधिकतम और प्रशिक्षण प्रतिशत निकालें',
    short: '1RM और प्रशिक्षण प्रतिशत',
    intro: [
      { h: 'मापने से बेहतर है अनुमान लगाना', p: '1RM वह अधिकतम वज़न है जिसे आप एक बार उठा सकते हैं। इसे सचमुच मापने के लिए विफलता तक जाना पड़ता है, जिसमें चोट का असली ख़तरा है और कई दिन की रिकवरी लगती है। पहले से की गई किसी सेट से — पाँच दोहराव काफ़ी हैं — पीछे की ओर गणना करना सुरक्षित भी है और प्रोग्रामिंग के लिए पर्याप्त सटीक भी।' },
      { h: 'सूत्रों का अलग-अलग होना ही जानकारी है', p: 'एप्ली, ब्रिज़की और लोम्बार्डी अलग-अलग आँकड़ों से बने हैं, इसलिए एक ही इनपुट पर कई किलो का अंतर आता है। एक ही संख्या दिखाने पर वह अंतिम सत्य जैसी लगती है। यह कैलकुलेटर तीनों दिखाता है, बीच वाले को सिफ़ारिश मानता है और फैलाव भी बताता है।' },
      { h: 'असल में काम आती है प्रतिशत तालिका', p: 'प्रोग्राम इस तरह लिखे जाते हैं — «1RM का 80%, पाँच सेट पाँच दोहराव»। नीचे की तालिका आपके अनुमान को 2.5 किग्रा में गोल किए गए कार्य-भार में बदल देती है, क्योंकि प्लेट की सबसे छोटी जोड़ी उतनी ही होती है।' },
    ],
    faq: [
      { q: 'क्या 1RM सीधे मापना चाहिए?', a: 'आम तौर पर नहीं। असली एक-दोहराव अधिकतम के लिए विफलता तक जाना पड़ता है, जिसमें चोट का ख़तरा और कई दिन की रिकवरी है। पाँच से आठ दोहराव की सेट सुरक्षित रहती है और प्रोग्राम बनाने के लिए काफ़ी सटीक है।' },
      { q: 'कौन सा सूत्र सही है?', a: 'कोई भी पूरी तरह नहीं। ये अलग-अलग समूहों पर बने प्रतिगमन हैं, इसलिए एक ही इनपुट पर कुछ किलो का अंतर आता है। बीच वाला लेना और फैलाव देखना किसी एक को चुनने से अधिक ईमानदार है।' },
      { q: 'कितने दोहराव सबसे अच्छा अनुमान देते हैं?', a: 'पाँच से आठ। दस से ऊपर सहनशक्ति हावी होने लगती है और सूत्र बहुत अलग हो जाते हैं। तीन से नीचे आप वैसे भी असली अधिकतम के क़रीब हैं, अनुमान लगाने को बचता ही कम है।' },
      { q: '2.5 किग्रा में क्यों गोल किया जाता है?', a: 'क्योंकि अधिकांश बार पर सबसे छोटी प्लेट-जोड़ी उतनी ही होती है। 78.3 किग्रा चढ़ाया नहीं जा सकता, 77.5 या 80 चढ़ाया जा सकता है। तालिका वही देती है जो सचमुच बार पर रखा जा सके।' },
      { q: 'क्या यह पाउंड में चलेगा?', a: 'सूत्र इकाई-निरपेक्ष हैं — पाउंड डालें तो पाउंड मिलेगा। केवल 2.5 किग्रा का गोलन मीट्रिक है; पाउंड वाले जिम में 5 lb में स्वयं गोल कर लें।' },
    ],
    ui: {
      section: 'आपकी सेट', weight: 'वज़न (किग्रा)', reps: 'दोहराव', calc: '1RM निकालें',
      est: 'अनुमानित 1RM', best: 'सिफ़ारिश', spread: 'सूत्रों के बीच अंतर',
      table: 'कार्य-भार', tableNote: 'प्लेट से मेल खाने के लिए 2.5 किग्रा में गोल किया गया',
      why: 'सूत्र अलग क्यों हैं', wide: 'दस दोहराव के ऊपर सूत्र बहुत अलग हो जाते हैं। पाँच से आठ की सेट कहीं अधिक सटीक अनुमान देती है।',
      use1: 'अधिकतम प्रयास', use2: 'अधिकतम शक्ति', use3: 'शक्ति', use4: 'शक्ति और आकार', use5: 'मांसपेशी वृद्धि', use6: 'सहनशक्ति', use7: 'वार्म-अप',
    },
  },
  'zh-hans': {
    title: '1RM 计算器',
    desc: '根据举起的重量和次数估算一次最大重量，并给出各强度训练重量',
    short: '1RM 与强度重量表',
    intro: [
      { h: '推算比实测更安全', p: '1RM 是只能举起一次的最大重量。真去测就得推到力竭，受伤风险实实在在，恢复也要好几天。用已经完成的一组反推——五次就够——既安全，精度也足以用来安排训练。' },
      { h: '公式互相不一致，这本身就是信息', p: '埃普利、布日茨基、隆巴迪出自不同的数据集，同样的输入会差出好几公斤。只给一个数字，它看起来就像定论。这个计算器把三个并排列出，取中间值作为推荐，并给出离散范围。' },
      { h: '真正用到的是百分比表', p: '训练计划写作「1RM 的 80%，五组五次」。下面的表把估算值换成以 2.5 公斤为单位的实际重量——那是最小一对杠铃片的重量——所以屏幕上的数字就是你要装的数字。' },
    ],
    faq: [
      { q: '可以直接测 1RM 吗？', a: '通常不建议。真正的单次极限意味着推到力竭，有受伤风险，还要好几天恢复。五到八次的一组就能给出安全且足够用来编排训练的估算。' },
      { q: '哪个公式是对的？', a: '严格说都不完全对。它们是基于不同人群的回归式，同样输入会差几公斤。取三者中间值并留意离散范围，比挑一个偏爱的更诚实。' },
      { q: '做几次估得最准？', a: '五到八次。超过十次以后耐力开始主导，公式之间差距迅速拉大。低于三次时你已经接近真实极限，剩下可估的空间不多。' },
      { q: '为什么按 2.5 公斤取整？', a: '因为多数杠铃上最小的一对片就是这个重量。算出 78.3 公斤装不上去，77.5 或 80 可以。表格给的是你真正装得上的数字。' },
      { q: '用磅可以吗？', a: '公式与单位无关，输入磅就输出磅。只有 2.5 公斤的取整是公制——在用磅的健身房，请自行按 5 磅取整。' },
    ],
    ui: {
      section: '你的组', weight: '重量（公斤）', reps: '次数', calc: '估算 1RM',
      est: '估算 1RM', best: '推荐值', spread: '公式之间',
      table: '各强度重量', tableNote: '按 2.5 公斤取整，与杠铃片对齐',
      why: '公式为何不同', wide: '超过十次后公式之间差距很大。五到八次的一组能给出紧得多的估算。',
      use1: '极限尝试', use2: '最大力量', use3: '力量', use4: '力量与围度', use5: '肌肥大', use6: '肌耐力', use7: '热身',
    },
  },
  'zh-hant': {
    title: '1RM 計算器',
    desc: '依舉起的重量與次數估算一次最大重量，並給出各強度訓練重量',
    short: '1RM 與強度重量表',
    intro: [
      { h: '推算比實測安全', p: '1RM 是只能舉起一次的最大重量。真要測就得推到力竭，受傷風險是實在的，恢復也要好幾天。用已經完成的一組反推——五次就夠——既安全，精度也足以用來安排訓練。' },
      { h: '公式互相不一致，這本身就是資訊', p: '埃普利、布日茨基、隆巴迪出自不同的資料集，同樣的輸入會差上好幾公斤。只給一個數字，它看起來就像定論。這個計算器把三個並排列出，取中間值作為建議，並給出離散範圍。' },
      { h: '真正用到的是百分比表', p: '訓練計畫寫作「1RM 的 80%，五組五次」。下面的表把估算值換成以 2.5 公斤為單位的實際重量——那是最小一對槓片的重量——所以螢幕上的數字就是你要裝的數字。' },
    ],
    faq: [
      { q: '可以直接測 1RM 嗎？', a: '通常不建議。真正的單次極限意味著推到力竭，有受傷風險，還要好幾天恢復。五到八次的一組就能給出安全且足夠用來編排訓練的估算。' },
      { q: '哪個公式才對？', a: '嚴格說都不完全對。它們是基於不同族群的迴歸式，同樣輸入會差幾公斤。取三者中間值並留意離散範圍，比挑一個偏愛的更誠實。' },
      { q: '做幾次估得最準？', a: '五到八次。超過十次以後耐力開始主導，公式之間差距迅速拉大。低於三次時你已經接近真實極限，剩下可估的空間不多。' },
      { q: '為什麼按 2.5 公斤取整？', a: '因為多數槓鈴上最小的一對片就是這個重量。算出 78.3 公斤裝不上去，77.5 或 80 可以。表格給的是你真正裝得上的數字。' },
      { q: '用磅可以嗎？', a: '公式與單位無關，輸入磅就輸出磅。只有 2.5 公斤的取整是公制——在用磅的健身房，請自行按 5 磅取整。' },
    ],
    ui: {
      section: '你的組', weight: '重量（公斤）', reps: '次數', calc: '估算 1RM',
      est: '估算 1RM', best: '建議值', spread: '公式之間',
      table: '各強度重量', tableNote: '按 2.5 公斤取整，與槓片對齊',
      why: '公式為何不同', wide: '超過十次後公式之間差距很大。五到八次的一組能給出緊得多的估算。',
      use1: '極限嘗試', use2: '最大力量', use3: '力量', use4: '力量與圍度', use5: '肌肥大', use6: '肌耐力', use7: '熱身',
    },
  },
};

export const IDEAL_WEIGHT: CalcTable = {
  en: {
    title: 'Ideal body weight calculator',
    desc: 'Ideal weight by the Devine, Robinson, Miller and Hamwi formulas, plus the healthy BMI range',
    short: 'Ideal weight and healthy BMI range',
    intro: [
      { h: '"Ideal weight" is not a health target', p: 'The four formulas in common use were built between 1964 and 1983 to help work out drug dosages, not to define a healthy body. They read closer to "people of this height usually weigh about this" than to any medical goal. None of them looks at muscle mass, frame size or where fat sits, so an athlete weighing more than the formula says is entirely normal.' },
      { h: 'A range is more honest than a number', p: 'The measure clinicians actually use is BMI, and even that is a band: 18.5 to 24.9. This calculator gives you the four formula values side by side and the weight range that band corresponds to at your height. The range is usually around ten kilos wide, and that width is the real answer.' },
      { h: 'Below 152 cm the formulas wobble', p: 'All four are written as a base weight at 152.4 cm — five feet — plus a fixed amount per inch above it. Below that height they extrapolate downwards and drift away from reality. If you are shorter than that, read the BMI range instead.' },
    ],
    faq: [
      { q: 'Does being at my ideal weight mean I am healthy?', a: 'Not necessarily. These formulas were built to compute drug doses and ignore muscle mass, bone structure and fat distribution entirely. Someone who trains regularly will usually weigh more than the formula suggests, and that is normal.' },
      { q: 'Four formulas disagree — which one do I use?', a: 'Look at the spread rather than picking one. They commonly differ by more than five kilos, and that gap is the precision of the whole idea. For practical judgement the BMI range of 18.5 to 24.9 is what is actually used.' },
      { q: 'Why does the result look wrong for short heights?', a: 'Every one of the four is anchored at 152.4 cm and adds a fixed amount per inch. Below that they subtract their way down and diverge from measured data. Use the BMI range in that region.' },
      { q: 'Why do men and women get different numbers?', a: 'Because at the same height men have, on average, more muscle and denser bone. The formulas disagree about how much that matters — Hamwi assumes the largest difference, Miller the smallest.' },
      { q: 'What about children and older adults?', a: 'Neither is covered. Children are assessed on growth percentiles, not adult formulas, and in older adults a slightly higher BMI is associated with better outcomes. Treat this page as an adult reference only.' },
    ],
    ui: {
      section: 'About you', height: 'Height (cm)', sex: 'Sex', male: 'Male', female: 'Female',
      current: 'Current weight (kg) — optional', currentHint: 'Add it and your BMI is shown too',
      calc: 'Calculate', range: 'Healthy BMI weight range', avg: 'Formula average',
      byFormula: 'By formula', byNote: 'The four disagree — that spread is the precision',
      bmi: 'Your BMI', inRange: 'Within range', outRange: 'Outside range', diff: 'Vs formula average',
      warn: 'The formulas are anchored at 152.4 cm and drift below that height. Read the BMI range instead.',
    },
  },
  es: {
    title: 'Calculadora de peso ideal',
    desc: 'Peso ideal según Devine, Robinson, Miller y Hamwi, más el rango de peso con IMC saludable',
    short: 'Peso ideal y rango de IMC saludable',
    intro: [
      { h: 'El «peso ideal» no es un objetivo de salud', p: 'Las cuatro fórmulas de uso corriente se construyeron entre 1964 y 1983 para calcular dosis de medicamentos, no para definir un cuerpo sano. Se leen más como «quien mide esto suele pesar esto» que como una meta médica. Ninguna mira la masa muscular, la complexión ni dónde se acumula la grasa, así que un deportista que pese más de lo que dice la fórmula está en lo normal.' },
      { h: 'Un rango es más honesto que un número', p: 'Lo que se usa en la práctica clínica es el IMC, y también es una banda: de 18,5 a 24,9. Esta calculadora pone los cuatro valores en fila y añade el rango de peso que esa banda supone para tu estatura. Suele tener unos diez kilos de ancho, y esa amplitud es la respuesta real.' },
      { h: 'Por debajo de 152 cm las fórmulas se tuercen', p: 'Las cuatro están escritas como un peso base a 152,4 cm —cinco pies— más una cantidad fija por pulgada. Por debajo extrapolan hacia abajo y se alejan de lo medido. Si mides menos, mira el rango de IMC.' },
    ],
    faq: [
      { q: '¿Estar en el peso ideal significa estar sano?', a: 'No necesariamente. Estas fórmulas se hicieron para calcular dosis y no miran masa muscular, estructura ósea ni distribución de grasa. Quien entrena con regularidad suele pesar más de lo que indican, y eso es normal.' },
      { q: 'Las cuatro fórmulas discrepan, ¿cuál uso?', a: 'Mira la amplitud en vez de elegir una. Suelen separarse más de cinco kilos, y esa distancia es la precisión de todo el concepto. Para juzgar en la práctica se usa el rango de IMC de 18,5 a 24,9.' },
      { q: '¿Por qué el resultado parece raro con estaturas bajas?', a: 'Las cuatro están ancladas en 152,4 cm y suman una cantidad fija por pulgada. Por debajo restan hacia abajo y se separan de los datos medidos. En esa zona conviene mirar el rango de IMC.' },
      { q: '¿Por qué salen valores distintos para hombres y mujeres?', a: 'Porque a igual estatura los hombres tienen de media más músculo y hueso más denso. Las fórmulas discrepan sobre cuánto pesa eso: Hamwi supone la mayor diferencia y Miller la menor.' },
      { q: '¿Y en niños o personas mayores?', a: 'No están cubiertos. A los niños se les valora por percentiles de crecimiento, no por fórmulas de adulto, y en personas mayores un IMC algo más alto se asocia con mejor pronóstico. Considera esta página una referencia solo para adultos.' },
    ],
    ui: {
      section: 'Tus datos', height: 'Estatura (cm)', sex: 'Sexo', male: 'Hombre', female: 'Mujer',
      current: 'Peso actual (kg) — opcional', currentHint: 'Si lo añades, también verás tu IMC',
      calc: 'Calcular', range: 'Rango de peso con IMC saludable', avg: 'Media de las fórmulas',
      byFormula: 'Por fórmula', byNote: 'Las cuatro discrepan — esa amplitud es la precisión',
      bmi: 'Tu IMC', inRange: 'Dentro del rango', outRange: 'Fuera del rango', diff: 'Frente a la media',
      warn: 'Las fórmulas están ancladas en 152,4 cm y se desvían por debajo. Mira el rango de IMC.',
    },
  },
  'pt-br': {
    title: 'Calculadora de peso ideal',
    desc: 'Peso ideal por Devine, Robinson, Miller e Hamwi, mais a faixa de peso com IMC saudável',
    short: 'Peso ideal e faixa de IMC saudável',
    intro: [
      { h: '«Peso ideal» não é meta de saúde', p: 'As quatro fórmulas de uso comum foram criadas entre 1964 e 1983 para calcular doses de medicamento, não para definir um corpo saudável. Elas dizem mais «quem tem esta altura costuma pesar isto» do que qualquer meta médica. Nenhuma olha massa muscular, estrutura óssea ou onde a gordura fica, então um atleta pesar mais que a fórmula é normal.' },
      { h: 'Uma faixa é mais honesta que um número', p: 'O que a clínica usa de fato é o IMC, e mesmo ele é uma faixa: 18,5 a 24,9. Esta calculadora põe os quatro valores lado a lado e acrescenta a faixa de peso que isso representa na sua altura. Costuma ter uns dez quilos de largura, e essa largura é a resposta real.' },
      { h: 'Abaixo de 152 cm as fórmulas balançam', p: 'As quatro são escritas como um peso base em 152,4 cm — cinco pés — mais um valor fixo por polegada. Abaixo disso elas extrapolam para baixo e se afastam do medido. Se você é mais baixo, leia a faixa de IMC.' },
    ],
    faq: [
      { q: 'Estar no peso ideal significa estar saudável?', a: 'Não necessariamente. Essas fórmulas foram feitas para calcular doses e ignoram massa muscular, estrutura óssea e distribuição de gordura. Quem treina com regularidade costuma pesar mais do que elas indicam, e isso é normal.' },
      { q: 'As quatro discordam — qual eu uso?', a: 'Olhe a dispersão em vez de escolher uma. Elas costumam diferir mais de cinco quilos, e essa distância é a precisão da ideia toda. Para julgar na prática usa-se a faixa de IMC de 18,5 a 24,9.' },
      { q: 'Por que o resultado parece estranho em alturas baixas?', a: 'As quatro estão ancoradas em 152,4 cm e somam um valor fixo por polegada. Abaixo disso elas subtraem e se afastam dos dados medidos. Nessa faixa, olhe o IMC.' },
      { q: 'Por que homens e mulheres têm valores diferentes?', a: 'Porque, na mesma altura, homens têm em média mais músculo e osso mais denso. As fórmulas discordam sobre o tamanho dessa diferença — Hamwi assume a maior, Miller a menor.' },
      { q: 'E crianças ou idosos?', a: 'Não estão cobertos. Crianças são avaliadas por percentis de crescimento, não por fórmulas de adulto, e em idosos um IMC um pouco maior se associa a melhores desfechos. Trate esta página como referência apenas para adultos.' },
    ],
    ui: {
      section: 'Seus dados', height: 'Altura (cm)', sex: 'Sexo', male: 'Homem', female: 'Mulher',
      current: 'Peso atual (kg) — opcional', currentHint: 'Se preencher, o IMC também aparece',
      calc: 'Calcular', range: 'Faixa de peso com IMC saudável', avg: 'Média das fórmulas',
      byFormula: 'Por fórmula', byNote: 'As quatro discordam — essa dispersão é a precisão',
      bmi: 'Seu IMC', inRange: 'Dentro da faixa', outRange: 'Fora da faixa', diff: 'Ante a média',
      warn: 'As fórmulas estão ancoradas em 152,4 cm e se desviam abaixo disso. Leia a faixa de IMC.',
    },
  },
  ja: {
    title: '標準体重計算機',
    desc: 'デバイン・ロビンソン・ミラー・ハムウィ四つの標準体重と、BMI適正範囲の体重を計算します',
    short: '標準体重とBMI適正範囲',
    intro: [
      { h: '「標準体重」は健康の目標値ではない', p: 'よく使われる四つの式は1964年から1983年にかけて、健康な体を定義するためではなく**薬の用量を計算するために**作られました。「この身長ならたいていこのくらい」に近く、医学的な目標ではありません。筋肉量も骨格も脂肪のつき方も見ないので、運動をしている人が式の値より重いのはまったく普通です。' },
      { h: '一つの数より範囲のほうが正直', p: '実際の判断に使われるのはBMIで、それも18.5〜24.9という幅です。この計算機は四つの値を並べ、その幅があなたの身長で何kgにあたるかを示します。たいてい10kg前後の幅になりますが、その広さこそが本当の答えです。' },
      { h: '152cmより低いと式が揺れる', p: '四つとも152.4cm（5フィート）を基準に、1インチごとに一定量を足す形で書かれています。それより低い身長では引く方向に外挿されるため実測から離れます。その場合はBMIの範囲のほうをご覧ください。' },
    ],
    faq: [
      { q: '標準体重なら健康ということですか？', a: '必ずしもそうではありません。これらの式は薬の用量計算のために作られたもので、筋肉量・骨格・脂肪のつき方をまったく見ません。定期的に運動している人は式より重いのが普通です。' },
      { q: '四つの式が食い違います。どれを見ればいいですか？', a: '一つを選ぶより、幅そのものを見てください。5kg以上開くことが珍しくなく、その開きがこの考え方の精度です。実務ではBMI 18.5〜24.9の範囲が使われます。' },
      { q: '身長が低いと結果がおかしいのはなぜですか？', a: '四つとも152.4cmを基準に1インチごとに足す形だからです。それより低いと引く方向に外挿され、実測とずれます。その範囲ではBMIをご覧ください。' },
      { q: '男女で値が違うのはなぜですか？', a: '同じ身長なら男性のほうが平均して筋肉量が多く骨密度も高いためです。その差をどれだけ見るかは式ごとに違い、ハムウィが最も大きく、ミラーが最も小さく見ます。' },
      { q: '子どもや高齢者はどうですか？', a: 'どちらも対象外です。子どもは成長曲線のパーセンタイルで評価し、高齢者ではやや高めのBMIのほうが予後が良いとされています。このページは成人向けの参考としてお使いください。' },
    ],
    ui: {
      section: '入力', height: '身長 (cm)', sex: '性別', male: '男性', female: '女性',
      current: '現在の体重 (kg) — 任意', currentHint: '入れると今のBMIも出ます',
      calc: '計算する', range: 'BMI適正範囲の体重', avg: '四つの式の平均',
      byFormula: '式ごとの標準体重', byNote: '四つが食い違います — その幅がこの値の精度です',
      bmi: '現在のBMI', inRange: '範囲内', outRange: '範囲外', diff: '平均との差',
      warn: '式は152.4cmを基準にしており、それより低い身長ではずれます。BMIの範囲をご覧ください。',
    },
  },
  de: {
    title: 'Idealgewicht-Rechner',
    desc: 'Idealgewicht nach Devine, Robinson, Miller und Hamwi, dazu der gesunde BMI-Gewichtsbereich',
    short: 'Idealgewicht und gesunder BMI-Bereich',
    intro: [
      { h: '«Idealgewicht» ist kein Gesundheitsziel', p: 'Die vier gebräuchlichen Formeln entstanden zwischen 1964 und 1983, um Medikamentendosen zu berechnen, nicht um einen gesunden Körper zu definieren. Sie sagen eher «wer so groß ist, wiegt meist ungefähr so» als irgendein medizinisches Ziel. Keine von ihnen betrachtet Muskelmasse, Körperbau oder Fettverteilung — dass eine trainierte Person mehr wiegt als die Formel angibt, ist völlig normal.' },
      { h: 'Ein Bereich ist ehrlicher als eine Zahl', p: 'Klinisch verwendet wird der BMI, und auch der ist ein Band: 18,5 bis 24,9. Dieser Rechner stellt die vier Werte nebeneinander und ergänzt den Gewichtsbereich, dem dieses Band bei Ihrer Größe entspricht. Er ist meist rund zehn Kilo breit, und diese Breite ist die eigentliche Antwort.' },
      { h: 'Unter 152 cm werden die Formeln unzuverlässig', p: 'Alle vier sind als Basisgewicht bei 152,4 cm — fünf Fuß — plus ein fester Betrag je Zoll geschrieben. Darunter extrapolieren sie nach unten und entfernen sich von gemessenen Daten. Sind Sie kleiner, lesen Sie stattdessen den BMI-Bereich.' },
    ],
    faq: [
      { q: 'Bin ich gesund, wenn ich mein Idealgewicht habe?', a: 'Nicht zwangsläufig. Diese Formeln wurden zur Dosisberechnung gebaut und ignorieren Muskelmasse, Knochenbau und Fettverteilung völlig. Wer regelmäßig trainiert, wiegt meist mehr, als sie angeben, und das ist normal.' },
      { q: 'Vier Formeln, vier Werte — welchen nehme ich?', a: 'Betrachten Sie die Spannweite, statt einen auszuwählen. Fünf Kilo Unterschied sind üblich, und dieser Abstand ist die Genauigkeit des ganzen Konzepts. Für die praktische Beurteilung dient der BMI-Bereich von 18,5 bis 24,9.' },
      { q: 'Warum wirkt das Ergebnis bei kleiner Körpergröße falsch?', a: 'Alle vier sind bei 152,4 cm verankert und addieren einen festen Betrag je Zoll. Darunter subtrahieren sie sich abwärts und weichen von Messdaten ab. In diesem Bereich zählt der BMI.' },
      { q: 'Warum unterscheiden sich Männer und Frauen?', a: 'Weil Männer bei gleicher Größe im Mittel mehr Muskelmasse und dichtere Knochen haben. Wie stark das zählt, sehen die Formeln unterschiedlich — Hamwi nimmt den größten Unterschied an, Miller den kleinsten.' },
      { q: 'Und Kinder oder ältere Menschen?', a: 'Beide sind nicht abgedeckt. Kinder werden über Wachstumsperzentile beurteilt, nicht über Erwachsenenformeln, und bei älteren Menschen geht ein etwas höherer BMI mit besseren Verläufen einher. Nutzen Sie diese Seite nur als Erwachsenen-Referenz.' },
    ],
    ui: {
      section: 'Ihre Angaben', height: 'Körpergröße (cm)', sex: 'Geschlecht', male: 'Männlich', female: 'Weiblich',
      current: 'Aktuelles Gewicht (kg) — optional', currentHint: 'Eingetragen, erscheint auch Ihr BMI',
      calc: 'Berechnen', range: 'Gewichtsbereich bei gesundem BMI', avg: 'Mittel der Formeln',
      byFormula: 'Nach Formel', byNote: 'Die vier weichen ab — diese Spannweite ist die Genauigkeit',
      bmi: 'Ihr BMI', inRange: 'Im Bereich', outRange: 'Außerhalb', diff: 'Zum Mittelwert',
      warn: 'Die Formeln sind bei 152,4 cm verankert und driften darunter ab. Lesen Sie den BMI-Bereich.',
    },
  },
  fr: {
    title: 'Calculateur de poids idéal',
    desc: 'Poids idéal selon Devine, Robinson, Miller et Hamwi, plus la plage de poids à IMC sain',
    short: 'Poids idéal et plage d’IMC sain',
    intro: [
      { h: 'Le «poids idéal» n’est pas un objectif de santé', p: 'Les quatre formules courantes ont été établies entre 1964 et 1983 pour calculer des doses de médicaments, non pour définir un corps sain. Elles disent plutôt «à cette taille, on pèse en général cela» qu’un quelconque objectif médical. Aucune ne regarde la masse musculaire, l’ossature ni la répartition des graisses : qu’un sportif pèse plus que la formule est parfaitement normal.' },
      { h: 'Une plage est plus honnête qu’un chiffre', p: 'Ce que la clinique utilise, c’est l’IMC, et c’est déjà une bande : 18,5 à 24,9. Ce calculateur aligne les quatre valeurs et ajoute la plage de poids correspondant à cette bande pour votre taille. Elle fait d’ordinaire une dizaine de kilos de large, et cette largeur est la vraie réponse.' },
      { h: 'En dessous de 152 cm les formules vacillent', p: 'Toutes quatre s’écrivent comme un poids de base à 152,4 cm — cinq pieds — plus une quantité fixe par pouce. En dessous, elles extrapolent vers le bas et s’écartent des mesures. Si vous êtes plus petit, lisez plutôt la plage d’IMC.' },
    ],
    faq: [
      { q: 'Être à mon poids idéal signifie-t-il que je suis en bonne santé ?', a: 'Pas nécessairement. Ces formules ont été bâties pour calculer des doses et ignorent totalement la masse musculaire, la structure osseuse et la répartition des graisses. Qui s’entraîne régulièrement pèse en général plus qu’elles ne l’indiquent, et c’est normal.' },
      { q: 'Quatre formules, quatre valeurs : laquelle retenir ?', a: 'Regardez l’écart plutôt que d’en choisir une. Cinq kilos de différence sont courants, et cet écart est la précision de tout le concept. En pratique, on se sert de la plage d’IMC de 18,5 à 24,9.' },
      { q: 'Pourquoi le résultat semble-t-il faux pour les petites tailles ?', a: 'Les quatre sont ancrées à 152,4 cm et ajoutent une quantité fixe par pouce. En dessous, elles soustraient et s’écartent des données mesurées. Dans cette zone, référez-vous à l’IMC.' },
      { q: 'Pourquoi hommes et femmes obtiennent-ils des valeurs différentes ?', a: 'Parce qu’à taille égale les hommes ont en moyenne plus de muscle et des os plus denses. Les formules divergent sur l’ampleur de cet écart : Hamwi le suppose le plus grand, Miller le plus petit.' },
      { q: 'Et pour les enfants ou les personnes âgées ?', a: 'Ni les uns ni les autres ne sont couverts. Les enfants s’évaluent sur des percentiles de croissance, pas sur des formules d’adulte, et chez les personnes âgées un IMC un peu plus élevé est associé à de meilleurs résultats. Prenez cette page comme une référence adulte seulement.' },
    ],
    ui: {
      section: 'Vos données', height: 'Taille (cm)', sex: 'Sexe', male: 'Homme', female: 'Femme',
      current: 'Poids actuel (kg) — facultatif', currentHint: 'Renseigné, votre IMC s’affiche aussi',
      calc: 'Calculer', range: 'Plage de poids à IMC sain', avg: 'Moyenne des formules',
      byFormula: 'Par formule', byNote: 'Les quatre divergent — cet écart est la précision',
      bmi: 'Votre IMC', inRange: 'Dans la plage', outRange: 'Hors plage', diff: 'Vs moyenne',
      warn: 'Les formules sont ancrées à 152,4 cm et dérivent en dessous. Lisez la plage d’IMC.',
    },
  },
  hi: {
    title: 'आदर्श वज़न कैलकुलेटर',
    desc: 'डिवाइन, रॉबिन्सन, मिलर और हैमवी सूत्रों से आदर्श वज़न, साथ में स्वस्थ BMI वज़न सीमा',
    short: 'आदर्श वज़न और स्वस्थ BMI सीमा',
    intro: [
      { h: '«आदर्श वज़न» स्वास्थ्य का लक्ष्य नहीं है', p: 'प्रचलित चारों सूत्र 1964 से 1983 के बीच दवा की मात्रा निकालने के लिए बने थे, स्वस्थ शरीर की परिभाषा के लिए नहीं। वे कहते हैं «इस क़द के लोग आम तौर पर इतना वज़न रखते हैं», न कि कोई चिकित्सकीय लक्ष्य। इनमें से कोई भी मांसपेशी, हड्डी की बनावट या चर्बी कहाँ जमी है — यह नहीं देखता, इसलिए नियमित व्यायाम करने वाले का सूत्र से भारी होना सामान्य है।' },
      { h: 'एक संख्या से सीमा अधिक ईमानदार है', p: 'चिकित्सा में असल में BMI काम आता है, और वह भी एक पट्टी है: 18.5 से 24.9। यह कैलकुलेटर चारों मान साथ-साथ रखता है और बताता है कि आपके क़द पर वह पट्टी कितने किलो बनती है। यह सीमा आम तौर पर दस किलो चौड़ी होती है, और यही चौड़ाई असली उत्तर है।' },
      { h: '152 सेमी से नीचे सूत्र डगमगाते हैं', p: 'चारों 152.4 सेमी (पाँच फुट) पर एक आधार वज़न और उसके ऊपर हर इंच पर एक निश्चित मात्रा — इसी रूप में लिखे गए हैं। इससे नीचे वे घटाने की दिशा में बढ़ते हैं और मापे गए आँकड़ों से दूर चले जाते हैं। यदि आपका क़द इससे कम है तो BMI सीमा देखें।' },
    ],
    faq: [
      { q: 'आदर्श वज़न पर होने का मतलब स्वस्थ होना है?', a: 'ज़रूरी नहीं। ये सूत्र दवा की मात्रा निकालने के लिए बने थे और मांसपेशी, हड्डी की बनावट तथा चर्बी के वितरण को बिलकुल नहीं देखते। नियमित व्यायाम करने वाला व्यक्ति आम तौर पर इनसे भारी होता है, और यह सामान्य है।' },
      { q: 'चारों सूत्र अलग बताते हैं, कौन सा लूँ?', a: 'एक चुनने के बजाय अंतर को देखिए। पाँच किलो से अधिक का फ़र्क़ आम है, और वही फ़र्क़ इस पूरी अवधारणा की सटीकता है। व्यवहार में 18.5 से 24.9 की BMI सीमा ही काम आती है।' },
      { q: 'कम क़द पर परिणाम अजीब क्यों लगता है?', a: 'चारों 152.4 सेमी पर टिके हैं और हर इंच पर एक निश्चित मात्रा जोड़ते हैं। इससे नीचे वे घटाते चले जाते हैं और मापे गए आँकड़ों से हट जाते हैं। उस दायरे में BMI सीमा देखें।' },
      { q: 'पुरुष और महिला के मान अलग क्यों हैं?', a: 'क्योंकि समान क़द पर पुरुषों में औसतन अधिक मांसपेशी और सघन हड्डी होती है। यह अंतर कितना बड़ा है, इस पर सूत्र असहमत हैं — हैमवी सबसे बड़ा मानता है, मिलर सबसे छोटा।' },
      { q: 'बच्चों या बुज़ुर्गों के लिए?', a: 'दोनों इसमें शामिल नहीं हैं। बच्चों का आकलन वृद्धि पर्सेंटाइल से होता है, वयस्क सूत्रों से नहीं, और बुज़ुर्गों में थोड़ा अधिक BMI बेहतर परिणामों से जुड़ा पाया गया है। इस पृष्ठ को केवल वयस्कों के संदर्भ के रूप में लें।' },
    ],
    ui: {
      section: 'आपकी जानकारी', height: 'क़द (सेमी)', sex: 'लिंग', male: 'पुरुष', female: 'महिला',
      current: 'वर्तमान वज़न (किग्रा) — वैकल्पिक', currentHint: 'भरने पर आपका BMI भी दिखेगा',
      calc: 'गणना करें', range: 'स्वस्थ BMI वज़न सीमा', avg: 'सूत्रों का औसत',
      byFormula: 'सूत्र के अनुसार', byNote: 'चारों अलग बताते हैं — वही अंतर इसकी सटीकता है',
      bmi: 'आपका BMI', inRange: 'सीमा के भीतर', outRange: 'सीमा के बाहर', diff: 'औसत से अंतर',
      warn: 'सूत्र 152.4 सेमी पर टिके हैं और उससे नीचे भटकते हैं। BMI सीमा देखें।',
    },
  },
  'zh-hans': {
    title: '标准体重计算器',
    desc: '按德文、罗宾逊、米勒、哈姆维四种公式给出标准体重，并附健康 BMI 体重区间',
    short: '标准体重与健康 BMI 区间',
    intro: [
      { h: '「标准体重」不是健康目标', p: '常用的四条公式是1964年到1983年间为了计算药物剂量而定的，不是为了定义健康的身体。它们更接近「这个身高的人通常重多少」，而不是任何医学目标。四条都不看肌肉量、骨架大小和脂肪分布，所以经常锻炼的人比公式重是完全正常的。' },
      { h: '区间比一个数字更诚实', p: '临床上真正使用的是 BMI，而它本身也是一段区间：18.5 到 24.9。这个计算器把四个值并排列出，再给出在你的身高下这段区间对应的体重范围。它通常有十公斤左右的宽度，而这个宽度就是真实答案。' },
      { h: '低于152厘米时公式会失准', p: '四条公式都写成「152.4厘米（五英尺）处的基础体重，再按每英寸加一个固定值」。低于这个身高就要往下外推，与实测数据渐行渐远。如果你比这更矮，请看 BMI 区间。' },
    ],
    faq: [
      { q: '达到标准体重就等于健康吗？', a: '不一定。这些公式是为算药量而建的，完全不看肌肉量、骨骼结构和脂肪分布。经常训练的人通常比公式给的更重，这是正常的。' },
      { q: '四条公式各说各话，该看哪个？', a: '看它们之间的跨度，而不是挑一个。相差五公斤以上很常见，这个差距就是整个概念的精度。实际判断用的是 18.5 到 24.9 的 BMI 区间。' },
      { q: '身高偏矮时结果为什么不对劲？', a: '四条公式都锚定在152.4厘米，按每英寸加固定值。低于这个高度就往下减，与实测数据分离。这一段请看 BMI 区间。' },
      { q: '为什么男女数值不同？', a: '因为同样身高下，男性平均肌肉更多、骨密度更高。这个差别有多大，各公式看法不一——哈姆维认为最大，米勒认为最小。' },
      { q: '儿童或老年人适用吗？', a: '都不适用。儿童要看生长曲线百分位，而不是成人公式；老年人略高的 BMI 反而与更好的结局相关。请把本页当作仅供成人参考。' },
    ],
    ui: {
      section: '你的信息', height: '身高（厘米）', sex: '性别', male: '男', female: '女',
      current: '当前体重（公斤）— 可选', currentHint: '填了会一并算出你的 BMI',
      calc: '计算', range: '健康 BMI 体重区间', avg: '四式平均',
      byFormula: '各公式结果', byNote: '四者不一致——这个跨度就是精度',
      bmi: '你的 BMI', inRange: '在区间内', outRange: '在区间外', diff: '与平均之差',
      warn: '公式锚定在152.4厘米，低于此会失准。请看 BMI 区间。',
    },
  },
  'zh-hant': {
    title: '標準體重計算器',
    desc: '依德文、羅賓遜、米勒、哈姆維四種公式給出標準體重，並附健康 BMI 體重區間',
    short: '標準體重與健康 BMI 區間',
    intro: [
      { h: '「標準體重」不是健康目標', p: '常用的四條公式是1964年到1983年間為了計算藥物劑量而定的，不是為了定義健康的身體。它們更接近「這個身高的人通常重多少」，而不是任何醫學目標。四條都不看肌肉量、骨架大小與脂肪分布，所以經常鍛鍊的人比公式重是完全正常的。' },
      { h: '區間比一個數字更誠實', p: '臨床上真正使用的是 BMI，而它本身也是一段區間：18.5 到 24.9。這個計算器把四個值並排列出，再給出在你的身高下這段區間對應的體重範圍。它通常有十公斤左右的寬度，而這個寬度就是真實答案。' },
      { h: '低於152公分時公式會失準', p: '四條公式都寫成「152.4公分（五英尺）處的基礎體重，再按每英寸加一個固定值」。低於這個身高就要往下外推，與實測資料漸行漸遠。如果你比這更矮，請看 BMI 區間。' },
    ],
    faq: [
      { q: '達到標準體重就等於健康嗎？', a: '不一定。這些公式是為算藥量而建的，完全不看肌肉量、骨骼結構與脂肪分布。經常訓練的人通常比公式給的更重，這是正常的。' },
      { q: '四條公式各說各話，該看哪個？', a: '看它們之間的跨度，而不是挑一個。相差五公斤以上很常見，這個差距就是整個概念的精度。實際判斷用的是 18.5 到 24.9 的 BMI 區間。' },
      { q: '身高偏矮時結果為什麼不對勁？', a: '四條公式都錨定在152.4公分，按每英寸加固定值。低於這個高度就往下減，與實測資料分離。這一段請看 BMI 區間。' },
      { q: '為什麼男女數值不同？', a: '因為同樣身高下，男性平均肌肉更多、骨密度更高。這個差別有多大，各公式看法不一——哈姆維認為最大，米勒認為最小。' },
      { q: '兒童或年長者適用嗎？', a: '都不適用。兒童要看生長曲線百分位，而不是成人公式；年長者略高的 BMI 反而與更好的結果相關。請把本頁當作僅供成人參考。' },
    ],
    ui: {
      section: '你的資訊', height: '身高（公分）', sex: '性別', male: '男', female: '女',
      current: '目前體重（公斤）— 選填', currentHint: '填了會一併算出你的 BMI',
      calc: '計算', range: '健康 BMI 體重區間', avg: '四式平均',
      byFormula: '各公式結果', byNote: '四者不一致——這個跨度就是精度',
      bmi: '你的 BMI', inRange: '在區間內', outRange: '在區間外', diff: '與平均之差',
      warn: '公式錨定在152.4公分，低於此會失準。請看 BMI 區間。',
    },
  },
};
