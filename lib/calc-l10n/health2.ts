import type { CalcTable } from './types.ts';

/** 하루 칼로리(TDEE)와 단백질. 둘 다 국제 지침을 쓰므로 나라를 타지 않는다. */
export const CALORIE: CalcTable = {
  en: {
    title: 'Daily calorie calculator',
    desc: 'Total daily energy expenditure from your basal rate and how much you move',
    short: 'TDEE by activity level',
    intro: [
      {
        h: 'Basal rate times an activity factor',
        p: 'Start with what the body burns at rest, then multiply by how much you move: 1.2 for a mostly seated life, 1.55 for training three to five times a week, 1.9 for athletes and heavy physical work. The same body can need several hundred calories more or less a day depending only on that factor.',
      },
      {
        h: 'Almost everyone picks too high a level',
        p: 'This is the usual reason the number does not match reality. Three gym sessions a week matter less than the other hundred and sixty-five hours; if those are spent sitting, a factor below 1.55 is the honest choice. Exercise burns less than people expect, and it is a smaller slice of the daily total than it feels like.',
      },
      {
        h: 'Do not rush the deficit',
        p: 'Losing a kilogram of body fat takes roughly a 7,700 calorie deficit, so eating 500 fewer a day works out near half a kilogram a week. Cutting far harder than that costs muscle first, which lowers the basal rate and makes the next kilogram harder than the last.',
      },
    ],
    faq: [
      { q: 'Which activity factor fits a desk job with three workouts?', a: 'Usually 1.375 rather than 1.55. The higher factors assume the movement continues outside training — physical work, long walks, being on your feet most of the day.' },
      { q: 'Should I eat below my basal rate to lose faster?', a: 'That is generally advised against. Build the deficit from the total figure here, not from the basal rate, and keep the gap moderate enough that you can hold it for months rather than days.' },
      { q: 'Why does my weight not move as predicted?', a: 'Because water shifts by a kilogram or more day to day, and because both the intake you log and the expenditure estimated here carry error. Judge by the trend over three or four weeks, not by the scale each morning.' },
    ],
    ui: {
      section: 'About you', sex: 'Sex', male: 'Male', female: 'Female',
      age: 'Age', height: 'Height (cm)', weight: 'Weight (kg)',
      activity: 'Activity level', calc: 'Calculate',
      a1: 'Little or no exercise', a1s: 'Desk job, mostly at home',
      a2: 'Light activity', a2s: 'Exercise 1–3 days a week',
      a3: 'Moderate activity', a3s: 'Exercise 3–5 days a week',
      a4: 'Very active', a4s: 'Hard exercise 6–7 days a week',
      a5: 'Extremely active', a5s: 'Athlete or physical job',
      bmr: 'At rest', tdee: 'Daily total', unit: 'kcal / day',
      lose: 'To lose weight', gain: 'To gain weight', slow: '−500 / day', fast: '+500 / day',
      note: 'An estimate. Adjust it against what your weight actually does over a few weeks.',
    },
  },
  es: {
    title: 'Calculadora de calorías diarias',
    desc: 'Gasto energético diario total a partir del metabolismo basal y de cuánto te mueves',
    short: 'Gasto diario por nivel de actividad',
    intro: [
      {
        h: 'Metabolismo basal por un factor de actividad',
        p: 'Se parte de lo que el cuerpo gasta en reposo y se multiplica por cuánto te mueves: 1,2 para una vida sobre todo sentada, 1,55 para entrenar de tres a cinco veces por semana, 1,9 para deportistas y trabajo físico duro. El mismo cuerpo puede necesitar varios cientos de calorías más o menos al día solo por ese factor.',
      },
      {
        h: 'Casi todo el mundo se pone un nivel demasiado alto',
        p: 'Es la razón habitual de que el número no cuadre con la realidad. Tres sesiones de gimnasio pesan menos que las otras ciento sesenta y cinco horas; si se pasan sentado, un factor por debajo de 1,55 es lo honesto. El ejercicio quema menos de lo que la gente cree y ocupa una porción del total menor de lo que parece.',
      },
      {
        h: 'No corras con el déficit',
        p: 'Perder un kilo de grasa exige un déficit de unas 7.700 calorías, así que comer 500 menos al día sale a medio kilo por semana. Recortar mucho más que eso se lleva primero músculo, lo que baja el metabolismo basal y hace que el siguiente kilo cueste más que el anterior.',
      },
    ],
    faq: [
      { q: '¿Qué factor corresponde a un trabajo de oficina con tres entrenamientos?', a: 'Normalmente 1,375 y no 1,55. Los factores altos suponen que el movimiento sigue fuera del entrenamiento: trabajo físico, caminatas largas, estar de pie casi todo el día.' },
      { q: '¿Debo comer por debajo del basal para adelgazar antes?', a: 'En general se desaconseja. Crea el déficit a partir de la cifra total de aquí, no del basal, y mantén una diferencia moderada, sostenible durante meses y no durante días.' },
      { q: '¿Por qué mi peso no se mueve como predice?', a: 'Porque el agua corporal varía un kilo o más de un día a otro, y porque tanto lo que registras como el gasto estimado aquí llevan error. Juzga por la tendencia de tres o cuatro semanas, no por la báscula cada mañana.' },
    ],
    ui: {
      section: 'Sobre ti', sex: 'Sexo', male: 'Hombre', female: 'Mujer',
      age: 'Edad', height: 'Altura (cm)', weight: 'Peso (kg)',
      activity: 'Nivel de actividad', calc: 'Calcular',
      a1: 'Poco o nada de ejercicio', a1s: 'Oficina, sobre todo en casa',
      a2: 'Actividad ligera', a2s: 'Ejercicio 1–3 días por semana',
      a3: 'Actividad moderada', a3s: 'Ejercicio 3–5 días por semana',
      a4: 'Muy activo', a4s: 'Ejercicio intenso 6–7 días por semana',
      a5: 'Extremadamente activo', a5s: 'Deportista o trabajo físico',
      bmr: 'En reposo', tdee: 'Total diario', unit: 'kcal / día',
      lose: 'Para bajar de peso', gain: 'Para subir de peso', slow: '−500 / día', fast: '+500 / día',
      note: 'Es una estimación. Ajústala con lo que realmente haga tu peso en unas semanas.',
    },
  },
  'pt-br': {
    title: 'Calculadora de calorias diárias',
    desc: 'Gasto energético diário total a partir da taxa basal e de quanto você se mexe',
    short: 'Gasto diário por nível de atividade',
    intro: [
      {
        h: 'Taxa basal vezes um fator de atividade',
        p: 'Comece pelo que o corpo gasta em repouso e multiplique pelo quanto você se mexe: 1,2 para uma vida quase toda sentada, 1,55 para treinar de três a cinco vezes por semana, 1,9 para atletas e trabalho físico pesado. O mesmo corpo pode precisar de várias centenas de calorias a mais ou a menos por dia só por causa desse fator.',
      },
      {
        h: 'Quase todo mundo escolhe um nível alto demais',
        p: 'É a razão mais comum de o número não bater com a realidade. Três idas à academia pesam menos que as outras cento e sessenta e cinco horas; se elas forem sentado, um fator abaixo de 1,55 é o honesto. Exercício queima menos do que se imagina e ocupa uma fatia do total menor do que parece.',
      },
      {
        h: 'Não apresse o déficit',
        p: 'Perder um quilo de gordura exige um déficit de cerca de 7.700 calorias, então comer 500 a menos por dia dá quase meio quilo por semana. Cortar muito além disso leva músculo primeiro, o que derruba a taxa basal e faz o próximo quilo custar mais que o anterior.',
      },
    ],
    faq: [
      { q: 'Que fator serve para um trabalho de escritório com três treinos?', a: 'Normalmente 1,375, não 1,55. Os fatores altos supõem que o movimento continua fora do treino: trabalho físico, caminhadas longas, ficar em pé quase o dia todo.' },
      { q: 'Devo comer abaixo da taxa basal para emagrecer mais rápido?', a: 'Em geral não se recomenda. Monte o déficit a partir do número total daqui, não da basal, e mantenha uma diferença moderada, que dê para sustentar por meses e não por dias.' },
      { q: 'Por que meu peso não anda como o previsto?', a: 'Porque a água corporal varia um quilo ou mais de um dia para o outro, e porque tanto o que você registra quanto o gasto estimado aqui têm erro. Julgue pela tendência de três ou quatro semanas, não pela balança de cada manhã.' },
    ],
    ui: {
      section: 'Sobre você', sex: 'Sexo', male: 'Homem', female: 'Mulher',
      age: 'Idade', height: 'Altura (cm)', weight: 'Peso (kg)',
      activity: 'Nível de atividade', calc: 'Calcular',
      a1: 'Pouco ou nenhum exercício', a1s: 'Escritório, quase sempre em casa',
      a2: 'Atividade leve', a2s: 'Exercício 1–3 dias por semana',
      a3: 'Atividade moderada', a3s: 'Exercício 3–5 dias por semana',
      a4: 'Muito ativo', a4s: 'Exercício pesado 6–7 dias por semana',
      a5: 'Extremamente ativo', a5s: 'Atleta ou trabalho físico',
      bmr: 'Em repouso', tdee: 'Total diário', unit: 'kcal / dia',
      lose: 'Para emagrecer', gain: 'Para ganhar peso', slow: '−500 / dia', fast: '+500 / dia',
      note: 'É uma estimativa. Ajuste pelo que o seu peso realmente fizer em algumas semanas.',
    },
  },
  ja: {
    title: '一日の消費カロリー計算機',
    desc: '基礎代謝量と活動量から一日の総消費カロリーを出します',
    short: '活動量から一日の消費量',
    intro: [
      {
        h: '基礎代謝量 × 活動係数',
        p: '安静時の消費から始めて、動く量を掛けます。ほとんど座っているなら1.2、週3〜5回運動するなら1.55、競技者や重い肉体労働なら1.9です。同じ体でも、この係数だけで一日に必要な熱量が数百kcal変わります。',
      },
      {
        h: '係数を高く見積もりがちです',
        p: '計算が現実と合わない最も多い理由がこれです。週3回のジムより、残りの165時間のほうが効きます。そこが座ったままなら、1.55より低く取るのが正直です。運動で燃える量は思ったより少なく、一日の合計に占める割合も感覚ほど大きくありません。',
      },
      {
        h: '減量は急がないこと',
        p: '体脂肪1kgを減らすにはおよそ7,700kcalの不足が要ります。一日500kcal減らせば週に0.5kgほどです。これより大きく削ると先に筋肉が落ち、基礎代謝が下がって、次の1kgが前より落ちにくくなります。',
      },
    ],
    faq: [
      { q: 'デスクワークで週3回運動なら、どの係数ですか。', a: 'たいていは1.55ではなく1.375です。高い係数は、運動以外の時間も動いていること——肉体労働、長い歩行、一日中立っていること——を前提にしています。' },
      { q: '早く痩せるために基礎代謝を下回って食べてもよいですか。', a: '一般には勧められません。不足はここの総消費量から作るもので、基礎代謝から作るものではありません。何日ではなく何か月も続けられる幅にしてください。' },
      { q: '予想どおりに体重が動きません。', a: '体内の水分は一日で1kg前後動きますし、記録した摂取量にも、ここで推定した消費量にも誤差があります。毎朝の体重計ではなく、3〜4週間の傾向で判断してください。' },
    ],
    ui: {
      section: '入力', sex: '性別', male: '男性', female: '女性',
      age: '年齢', height: '身長 (cm)', weight: '体重 (kg)',
      activity: '活動レベル', calc: '計算する',
      a1: 'ほとんど運動しない', a1s: 'デスクワーク・在宅中心',
      a2: '軽い活動', a2s: '週1〜3回の運動',
      a3: 'ふつうの活動', a3s: '週3〜5回の運動',
      a4: '活動的', a4s: '週6〜7回の強めの運動',
      a5: 'とても活動的', a5s: '競技者・肉体労働',
      bmr: '安静時', tdee: '一日の総消費', unit: 'kcal / 日',
      lose: '減量するなら', gain: '増量するなら', slow: '−500 / 日', fast: '+500 / 日',
      note: '推定値です。数週間の体重の動きに合わせて調整してください。',
    },
  },
  de: {
    title: 'Kalorienbedarf-Rechner',
    desc: 'Gesamtumsatz aus Grundumsatz und Bewegung',
    short: 'Tagesumsatz nach Aktivität',
    intro: [
      {
        h: 'Grundumsatz mal Aktivitätsfaktor',
        p: 'Man beginnt beim Verbrauch in Ruhe und multipliziert mit der Bewegung: 1,2 bei überwiegend sitzendem Leben, 1,55 bei drei bis fünf Trainings pro Woche, 1,9 bei Sportlerinnen und schwerer körperlicher Arbeit. Derselbe Körper braucht allein wegen dieses Faktors mehrere Hundert Kalorien mehr oder weniger am Tag.',
      },
      {
        h: 'Fast alle setzen den Wert zu hoch an',
        p: 'Das ist der übliche Grund, warum die Zahl nicht zur Wirklichkeit passt. Drei Trainingseinheiten wiegen weniger als die übrigen hundertfünfundsechzig Stunden; verbringt man sie sitzend, ist ein Faktor unter 1,55 ehrlicher. Sport verbrennt weniger, als man denkt, und macht einen kleineren Teil des Tages aus, als es sich anfühlt.',
      },
      {
        h: 'Das Defizit nicht überziehen',
        p: 'Ein Kilogramm Körperfett entspricht grob einem Defizit von 7.700 Kalorien; 500 weniger am Tag ergeben also rund ein halbes Kilo pro Woche. Wer deutlich stärker kürzt, verliert zuerst Muskeln, senkt damit den Grundumsatz und macht das nächste Kilo schwerer als das letzte.',
      },
    ],
    faq: [
      { q: 'Welcher Faktor passt zu Bürojob plus drei Trainings?', a: 'Meist 1,375 statt 1,55. Die höheren Faktoren setzen voraus, dass die Bewegung auch außerhalb des Trainings weitergeht: körperliche Arbeit, lange Wege zu Fuß, den halben Tag stehen.' },
      { q: 'Darf ich unter den Grundumsatz gehen, um schneller abzunehmen?', a: 'Davon wird allgemein abgeraten. Bilden Sie das Defizit aus dem Gesamtwert hier, nicht aus dem Grundumsatz, und halten Sie den Abstand so moderat, dass er Monate statt Tage trägt.' },
      { q: 'Warum bewegt sich mein Gewicht nicht wie vorhergesagt?', a: 'Weil das Körperwasser von Tag zu Tag um ein Kilo und mehr schwankt und weil sowohl die notierte Aufnahme als auch der hier geschätzte Verbrauch Fehler tragen. Urteilen Sie über drei bis vier Wochen, nicht über die Waage jeden Morgen.' },
    ],
    ui: {
      section: 'Ihre Angaben', sex: 'Geschlecht', male: 'Männlich', female: 'Weiblich',
      age: 'Alter', height: 'Größe (cm)', weight: 'Gewicht (kg)',
      activity: 'Aktivitätsgrad', calc: 'Berechnen',
      a1: 'Kaum Bewegung', a1s: 'Bürojob, meist zu Hause',
      a2: 'Leichte Aktivität', a2s: 'Sport an 1–3 Tagen pro Woche',
      a3: 'Mäßige Aktivität', a3s: 'Sport an 3–5 Tagen pro Woche',
      a4: 'Sehr aktiv', a4s: 'Intensiver Sport an 6–7 Tagen',
      a5: 'Äußerst aktiv', a5s: 'Leistungssport oder körperliche Arbeit',
      bmr: 'In Ruhe', tdee: 'Tagesumsatz', unit: 'kcal / Tag',
      lose: 'Zum Abnehmen', gain: 'Zum Zunehmen', slow: '−500 / Tag', fast: '+500 / Tag',
      note: 'Eine Schätzung. Justieren Sie sie an dem, was Ihr Gewicht über einige Wochen wirklich tut.',
    },
  },
  fr: {
    title: 'Calculateur de besoins caloriques',
    desc: 'Dépense énergétique journalière à partir du métabolisme de base et de l’activité',
    short: 'Dépense du jour selon l’activité',
    intro: [
      {
        h: 'Métabolisme de base multiplié par un facteur d’activité',
        p: 'On part de la dépense au repos et on multiplie par le niveau de mouvement : 1,2 pour une vie surtout assise, 1,55 pour trois à cinq séances par semaine, 1,9 pour les sportifs et les métiers physiques. Le même corps peut avoir besoin de plusieurs centaines de calories de plus ou de moins par jour à cause de ce seul facteur.',
      },
      {
        h: 'Presque tout le monde se surestime',
        p: 'C’est la raison habituelle de l’écart avec la réalité. Trois séances de sport pèsent moins que les cent soixante-cinq autres heures ; si elles se passent assis, un facteur inférieur à 1,55 est plus honnête. Le sport brûle moins qu’on ne le croit et pèse moins dans le total qu’on ne le ressent.',
      },
      {
        h: 'Ne précipitez pas le déficit',
        p: 'Perdre un kilo de graisse demande à peu près 7 700 calories de déficit : manger 500 de moins par jour donne environ un demi-kilo par semaine. Couper beaucoup plus coûte d’abord du muscle, ce qui abaisse le métabolisme de base et rend le kilo suivant plus dur que le précédent.',
      },
    ],
    faq: [
      { q: 'Quel facteur pour un travail de bureau avec trois séances ?', a: 'En général 1,375 plutôt que 1,55. Les facteurs élevés supposent que le mouvement continue hors des séances : travail physique, longues marches, station debout la majeure partie du jour.' },
      { q: 'Puis-je manger sous mon métabolisme de base pour aller plus vite ?', a: 'C’est généralement déconseillé. Construisez le déficit à partir du total affiché ici, pas du métabolisme de base, et gardez un écart tenable sur des mois plutôt que sur des jours.' },
      { q: 'Pourquoi mon poids ne suit-il pas la prévision ?', a: 'Parce que l’eau corporelle varie d’un kilo ou plus d’un jour à l’autre, et parce que les apports notés comme la dépense estimée ici comportent une marge d’erreur. Jugez sur la tendance de trois ou quatre semaines, pas sur la balance chaque matin.' },
    ],
    ui: {
      section: 'Vos données', sex: 'Sexe', male: 'Homme', female: 'Femme',
      age: 'Âge', height: 'Taille (cm)', weight: 'Poids (kg)',
      activity: 'Niveau d’activité', calc: 'Calculer',
      a1: 'Peu ou pas d’exercice', a1s: 'Bureau, surtout à la maison',
      a2: 'Activité légère', a2s: 'Sport 1 à 3 jours par semaine',
      a3: 'Activité modérée', a3s: 'Sport 3 à 5 jours par semaine',
      a4: 'Très actif', a4s: 'Sport intense 6 à 7 jours par semaine',
      a5: 'Extrêmement actif', a5s: 'Sportif ou métier physique',
      bmr: 'Au repos', tdee: 'Total journalier', unit: 'kcal / jour',
      lose: 'Pour perdre du poids', gain: 'Pour en prendre', slow: '−500 / jour', fast: '+500 / jour',
      note: 'Une estimation. Ajustez-la sur ce que fait réellement votre poids en quelques semaines.',
    },
  },
  hi: {
    title: 'दैनिक कैलोरी कैलकुलेटर',
    desc: 'आधारभूत चयापचय दर और गतिविधि से दिन भर का कुल ऊर्जा ख़र्च',
    short: 'गतिविधि के हिसाब से दैनिक ख़र्च',
    intro: [
      {
        h: 'आधारभूत दर × गतिविधि गुणांक',
        p: 'शुरुआत आराम में होने वाले ख़र्च से, फिर उसे गतिविधि से गुणा: ज़्यादातर बैठे रहने पर 1.2, हफ़्ते में तीन से पाँच बार कसरत पर 1.55, खिलाड़ियों और भारी शारीरिक काम पर 1.9। सिर्फ़ इसी गुणांक से एक ही शरीर की रोज़ की ज़रूरत कई सौ कैलोरी ऊपर-नीचे हो जाती है।',
      },
      {
        h: 'लगभग हर कोई स्तर ऊँचा चुन लेता है',
        p: 'हिसाब और हक़ीक़त में फ़र्क़ की सबसे आम वजह यही है। हफ़्ते की तीन कसरतें बाक़ी एक सौ पैंसठ घंटों से कम भारी हैं; अगर वे बैठकर बीतते हैं तो 1.55 से नीचे का गुणांक ही ईमानदार है। कसरत उम्मीद से कम जलाती है, और दिन के कुल में उसका हिस्सा जितना लगता है उससे छोटा है।',
      },
      {
        h: 'घाटा जल्दबाज़ी में मत बनाइए',
        p: 'एक किलो चर्बी घटाने के लिए लगभग 7,700 कैलोरी का घाटा चाहिए, यानी रोज़ 500 कम खाने पर हफ़्ते में आधा किलो। इससे कहीं ज़्यादा काटने पर पहले मांसपेशी जाती है, जिससे आधारभूत दर गिरती है और अगला किलो पिछले से मुश्किल हो जाता है।',
      },
    ],
    faq: [
      { q: 'दफ़्तर की नौकरी और हफ़्ते में तीन कसरत — कौन-सा गुणांक?', a: 'आमतौर पर 1.55 नहीं, 1.375। ऊँचे गुणांक मानकर चलते हैं कि हलचल कसरत के बाहर भी जारी है — शारीरिक काम, लंबी पैदल दूरी, दिन भर खड़े रहना।' },
      { q: 'क्या जल्दी घटाने के लिए आधारभूत दर से कम खाऊँ?', a: 'आमतौर पर इसकी सलाह नहीं दी जाती। घाटा यहाँ दिखे कुल आंकड़े से बनाइए, आधारभूत दर से नहीं, और अंतर इतना ही रखिए जो दिनों नहीं, महीनों तक चल सके।' },
      { q: 'वज़न अनुमान के मुताबिक़ क्यों नहीं बदल रहा?', a: 'क्योंकि शरीर का पानी दिन-दर-दिन एक किलो या उससे ज़्यादा बदलता है, और आपके दर्ज किए गए सेवन तथा यहाँ अनुमानित ख़र्च — दोनों में ग़लती की गुंजाइश है। हर सुबह के काँटे से नहीं, तीन-चार हफ़्तों की दिशा से आँकिए।' },
    ],
    ui: {
      section: 'आपके बारे में', sex: 'लिंग', male: 'पुरुष', female: 'महिला',
      age: 'उम्र', height: 'लंबाई (सेमी)', weight: 'वज़न (किग्रा)',
      activity: 'गतिविधि स्तर', calc: 'गणना करें',
      a1: 'कसरत नहीं के बराबर', a1s: 'दफ़्तर का काम, ज़्यादातर घर पर',
      a2: 'हल्की गतिविधि', a2s: 'हफ़्ते में 1–3 दिन कसरत',
      a3: 'मध्यम गतिविधि', a3s: 'हफ़्ते में 3–5 दिन कसरत',
      a4: 'बहुत सक्रिय', a4s: 'हफ़्ते में 6–7 दिन कड़ी कसरत',
      a5: 'अत्यधिक सक्रिय', a5s: 'खिलाड़ी या शारीरिक काम',
      bmr: 'आराम में', tdee: 'दिन भर का कुल', unit: 'किलो कैलोरी / दिन',
      lose: 'वज़न घटाने के लिए', gain: 'वज़न बढ़ाने के लिए', slow: '−500 / दिन', fast: '+500 / दिन',
      note: 'यह अनुमान है। कुछ हफ़्तों में वज़न के असली रुख़ के हिसाब से समायोजित कीजिए।',
    },
  },
  'zh-hans': {
    title: '每日热量计算器',
    desc: '由基础代谢率和活动量算出一天的总消耗',
    short: '按活动量算每日消耗',
    intro: [
      {
        h: '基础代谢率乘以活动系数',
        p: '先取静息时的消耗，再乘上你的活动量：几乎全天坐着是 1.2，每周锻炼三到五次是 1.55，运动员和重体力劳动是 1.9。同一个身体，仅仅因为这个系数，每天的需要量就能差出好几百千卡。',
      },
      {
        h: '几乎所有人都把等级选高了',
        p: '这是算出来和实际对不上的最常见原因。每周三次健身，比不上剩下那一百六十五个小时；如果那些时间都坐着，取低于 1.55 的系数才诚实。运动消耗的比人们以为的少，在一天总量里的分量也比感觉上小。',
      },
      {
        h: '别急着拉大缺口',
        p: '掉一公斤脂肪大约需要 7,700 千卡的缺口，所以每天少吃 500 千卡，一周差不多半公斤。砍得比这狠得多，先掉的是肌肉，基础代谢跟着下降，下一公斤会比上一公斤更难。',
      },
    ],
    faq: [
      { q: '坐办公室、每周练三次，该用哪个系数？', a: '通常是 1.375 而不是 1.55。高系数假设你在训练之外也一直在动——体力工作、长距离步行、一天大半时间站着。' },
      { q: '为了瘦得快，能吃到低于基础代谢吗？', a: '一般不建议。缺口要从这里的总消耗里扣，而不是从基础代谢里扣，而且差距要小到能坚持几个月，而不是几天。' },
      { q: '为什么体重没有按预测变化？', a: '因为体内水分一天之内就能差出一公斤以上，而且你记录的摄入和这里估算的消耗都带误差。要看三四周的趋势，而不是每天早上的秤。' },
    ],
    ui: {
      section: '你的信息', sex: '性别', male: '男', female: '女',
      age: '年龄', height: '身高 (cm)', weight: '体重 (kg)',
      activity: '活动等级', calc: '计算',
      a1: '几乎不运动', a1s: '办公室工作，多在家',
      a2: '轻度活动', a2s: '每周运动 1–3 天',
      a3: '中度活动', a3s: '每周运动 3–5 天',
      a4: '高度活动', a4s: '每周高强度运动 6–7 天',
      a5: '极高活动', a5s: '运动员或体力工作',
      bmr: '静息消耗', tdee: '每日总消耗', unit: '千卡 / 天',
      lose: '想减重', gain: '想增重', slow: '−500 / 天', fast: '+500 / 天',
      note: '这是估算。请按几周内体重的实际走向来调整。',
    },
  },
  'zh-hant': {
    title: '每日熱量計算機',
    desc: '由基礎代謝率和活動量算出一天的總消耗',
    short: '按活動量算每日消耗',
    intro: [
      {
        h: '基礎代謝率乘以活動係數',
        p: '先取靜息時的消耗，再乘上你的活動量：幾乎整天坐著是 1.2，每週運動三到五次是 1.55，運動員和重度體力勞動是 1.9。同一個身體，僅僅因為這個係數，每天的需要量就能差出好幾百大卡。',
      },
      {
        h: '幾乎所有人都把等級選高了',
        p: '這是算出來和實際對不上的最常見原因。每週三次健身，比不上剩下那一百六十五個小時；如果那些時間都坐著，取低於 1.55 的係數才誠實。運動消耗的比人們以為的少，在一天總量裡的分量也比感覺上小。',
      },
      {
        h: '別急著拉大缺口',
        p: '掉一公斤脂肪大約需要 7,700 大卡的缺口，所以每天少吃 500 大卡，一週差不多半公斤。砍得比這狠得多，先掉的是肌肉，基礎代謝跟著下降，下一公斤會比上一公斤更難。',
      },
    ],
    faq: [
      { q: '坐辦公室、每週練三次，該用哪個係數？', a: '通常是 1.375 而不是 1.55。高係數假設你在訓練之外也一直在動——體力工作、長距離步行、一天大半時間站著。' },
      { q: '為了瘦得快，能吃到低於基礎代謝嗎？', a: '一般不建議。缺口要從這裡的總消耗裡扣，而不是從基礎代謝裡扣，而且差距要小到能堅持幾個月，而不是幾天。' },
      { q: '為什麼體重沒有按預測變化？', a: '因為體內水分一天之內就能差出一公斤以上，而且你記錄的攝取和這裡估算的消耗都帶誤差。要看三四週的趨勢，而不是每天早上的體重計。' },
    ],
    ui: {
      section: '你的資料', sex: '性別', male: '男', female: '女',
      age: '年齡', height: '身高 (cm)', weight: '體重 (kg)',
      activity: '活動等級', calc: '計算',
      a1: '幾乎不運動', a1s: '辦公室工作，多在家',
      a2: '輕度活動', a2s: '每週運動 1–3 天',
      a3: '中度活動', a3s: '每週運動 3–5 天',
      a4: '高度活動', a4s: '每週高強度運動 6–7 天',
      a5: '極高活動', a5s: '運動員或體力工作',
      bmr: '靜息消耗', tdee: '每日總消耗', unit: '大卡 / 天',
      lose: '想減重', gain: '想增重', slow: '−500 / 天', fast: '+500 / 天',
      note: '這是估算。請按幾週內體重的實際走向來調整。',
    },
  },
};

export const PROTEIN: CalcTable = {
  en: {
    title: 'Protein intake calculator',
    desc: 'A daily protein range from body weight and how you train',
    short: 'Daily protein by goal',
    intro: [
      {
        h: 'The target depends on what you are doing',
        p: 'For an adult who barely exercises the reference intake is about 0.8 g per kilogram of body weight. Train regularly and 1.4–1.8 g is the usual range; building muscle, or protecting it during a deficit, pushes it to 1.6–2.2 g. A range describes this better than a single number ever could.',
      },
      {
        h: 'Spread it across the day',
        p: 'There is a ceiling on how much protein a single meal can put towards building muscle, so dividing the daily target across three or four meals works better than one large serving. The per-meal figure below is there for that.',
      },
      {
        h: 'Some people need less, not more',
        p: 'Kidney disease can require protein to be restricted. These figures assume a healthy adult; if you have a medical condition, or are pregnant or breastfeeding, the right number comes from a clinician rather than a calculator.',
      },
    ],
    faq: [
      { q: 'Is more protein always better?', a: 'No. Above roughly 2.2 g per kilogram the extra brings no additional muscle in healthy trained adults — it simply gets used for energy, and it displaces other food from the plate.' },
      { q: 'Does it matter whether protein is animal or plant?', a: 'Mostly through the amino acid profile. Plant sources vary more, so a varied diet across the day covers it; a slightly higher total is sometimes suggested on a fully plant-based diet.' },
      { q: 'Should I use body weight or lean mass?', a: 'Body weight is the usual basis and what this uses. At high body fat, lean mass gives a more sensible target, since fat tissue does not need feeding with protein.' },
    ],
    ui: {
      section: 'Your target', weight: 'Weight (kg)', level: 'Activity and goal', calc: 'Calculate',
      l1: 'Little or no exercise', l1s: 'Reference intake, 0.8 g/kg',
      l2: 'Recreational exercise', l2s: 'A few sessions a week, 1.2–1.6 g/kg',
      l3: 'Trains regularly', l3s: 'Strength or endurance, 1.4–1.8 g/kg',
      l4: 'Building or protecting muscle', l4s: 'Bulking or cutting, 1.6–2.2 g/kg',
      perDay: 'Per day', perMeal: 'Per meal, over 3 meals', range: 'Range', unit: 'g',
      note: 'For healthy adults. If you have a kidney condition, follow clinical advice instead.',
    },
  },
  es: {
    title: 'Calculadora de proteína diaria',
    desc: 'Un rango diario de proteína según el peso y cómo entrenas',
    short: 'Proteína diaria por objetivo',
    intro: [
      {
        h: 'El objetivo depende de lo que hagas',
        p: 'Para un adulto que apenas se ejercita, la ingesta de referencia ronda los 0,8 g por kilo de peso. Si entrenas con regularidad, el rango habitual es 1,4–1,8 g; ganar músculo, o conservarlo en déficit, lo lleva a 1,6–2,2 g. Un rango describe esto mucho mejor que una cifra única.',
      },
      {
        h: 'Repártela a lo largo del día',
        p: 'Hay un techo en cuánta proteína puede aprovechar una sola comida para construir músculo, así que dividir el objetivo diario en tres o cuatro comidas funciona mejor que una ración enorme. Para eso está la cifra por comida de abajo.',
      },
      {
        h: 'Hay quien necesita menos, no más',
        p: 'La enfermedad renal puede exigir restringir la proteína. Estas cifras suponen un adulto sano; si tienes una patología, o estás embarazada o dando el pecho, el número correcto lo da un profesional, no una calculadora.',
      },
    ],
    faq: [
      { q: '¿Más proteína es siempre mejor?', a: 'No. Por encima de unos 2,2 g por kilo, el extra no aporta más músculo en adultos sanos y entrenados: simplemente se usa como energía y desplaza otros alimentos del plato.' },
      { q: '¿Importa si la proteína es animal o vegetal?', a: 'Sobre todo por el perfil de aminoácidos. Las fuentes vegetales varían más, así que una dieta variada a lo largo del día lo cubre; con una alimentación totalmente vegetal a veces se sugiere un total algo mayor.' },
      { q: '¿Uso el peso corporal o la masa magra?', a: 'El peso corporal es la base habitual y es lo que se usa aquí. Con mucho porcentaje de grasa, la masa magra da un objetivo más razonable, porque el tejido graso no necesita proteína.' },
    ],
    ui: {
      section: 'Tu objetivo', weight: 'Peso (kg)', level: 'Actividad y objetivo', calc: 'Calcular',
      l1: 'Poco o nada de ejercicio', l1s: 'Ingesta de referencia, 0,8 g/kg',
      l2: 'Ejercicio recreativo', l2s: 'Unas sesiones por semana, 1,2–1,6 g/kg',
      l3: 'Entrena con regularidad', l3s: 'Fuerza o resistencia, 1,4–1,8 g/kg',
      l4: 'Ganar o conservar músculo', l4s: 'Volumen o definición, 1,6–2,2 g/kg',
      perDay: 'Al día', perMeal: 'Por comida, en 3 comidas', range: 'Rango', unit: 'g',
      note: 'Para adultos sanos. Con enfermedad renal, sigue el consejo clínico en su lugar.',
    },
  },
  'pt-br': {
    title: 'Calculadora de proteína diária',
    desc: 'Uma faixa diária de proteína a partir do peso e do seu treino',
    short: 'Proteína diária por objetivo',
    intro: [
      {
        h: 'A meta depende do que você faz',
        p: 'Para um adulto que quase não se exercita, a ingestão de referência fica em torno de 0,8 g por quilo de peso. Treinando com regularidade, a faixa usual é 1,4–1,8 g; ganhar músculo, ou preservá-lo em déficit, leva a 1,6–2,2 g. Uma faixa descreve isso muito melhor do que um número único.',
      },
      {
        h: 'Distribua ao longo do dia',
        p: 'Existe um teto para quanto de proteína uma única refeição consegue aproveitar na construção muscular, então dividir a meta diária em três ou quatro refeições funciona melhor que uma porção enorme. O valor por refeição abaixo serve para isso.',
      },
      {
        h: 'Algumas pessoas precisam de menos, não de mais',
        p: 'Doença renal pode exigir restrição de proteína. Estes números supõem um adulto saudável; com alguma condição médica, ou em gestação ou amamentação, o número certo vem de um profissional, não de uma calculadora.',
      },
    ],
    faq: [
      { q: 'Mais proteína é sempre melhor?', a: 'Não. Acima de cerca de 2,2 g por quilo o excedente não traz mais músculo em adultos treinados e saudáveis — vira energia e ainda tira espaço de outros alimentos no prato.' },
      { q: 'Faz diferença ser proteína animal ou vegetal?', a: 'Principalmente pelo perfil de aminoácidos. Fontes vegetais variam mais, então uma dieta variada ao longo do dia resolve; numa alimentação totalmente vegetal às vezes se sugere um total um pouco maior.' },
      { q: 'Uso peso corporal ou massa magra?', a: 'Peso corporal é a base usual e é o que se usa aqui. Com percentual de gordura alto, a massa magra dá uma meta mais sensata, já que tecido gorduroso não precisa de proteína.' },
    ],
    ui: {
      section: 'Sua meta', weight: 'Peso (kg)', level: 'Atividade e objetivo', calc: 'Calcular',
      l1: 'Pouco ou nenhum exercício', l1s: 'Ingestão de referência, 0,8 g/kg',
      l2: 'Exercício recreativo', l2s: 'Algumas sessões por semana, 1,2–1,6 g/kg',
      l3: 'Treina com regularidade', l3s: 'Força ou resistência, 1,4–1,8 g/kg',
      l4: 'Ganhar ou preservar músculo', l4s: 'Bulking ou cutting, 1,6–2,2 g/kg',
      perDay: 'Por dia', perMeal: 'Por refeição, em 3 refeições', range: 'Faixa', unit: 'g',
      note: 'Para adultos saudáveis. Com problema renal, siga a orientação clínica.',
    },
  },
  ja: {
    title: 'たんぱく質摂取量の計算機',
    desc: '体重と運動の内容から一日のたんぱく質の目安を出します',
    short: '目的別の一日のたんぱく質',
    intro: [
      {
        h: '目安は「何をしているか」で変わります',
        p: 'ほとんど運動しない成人なら、体重1kgあたり約0.8gが基準です。定期的に運動するなら1.4〜1.8g、筋肉を増やす、あるいは減量中に守るなら1.6〜2.2gまで上がります。ひとつの数字より、幅で示すほうが実態に近くなります。',
      },
      {
        h: '一日のうちに分けて摂る',
        p: '一度の食事で筋肉づくりに回せるたんぱく質には上限があるので、一日の目安を3〜4回に分けたほうが効率的です。下に出る1食あたりの量はそのためのものです。',
      },
      {
        h: '増やすのではなく減らすべき人もいます',
        p: '腎疾患があるとたんぱく質を制限する必要がある場合があります。ここの数値は健康な成人を前提としています。持病がある方、妊娠中・授乳中の方は、計算機ではなく医療者に相談してください。',
      },
    ],
    faq: [
      { q: 'たんぱく質は多いほどよいのですか。', a: 'いいえ。体重1kgあたりおよそ2.2gを超えると、健康で訓練された成人では追加の筋肉にはつながりません。エネルギーとして使われるだけで、他の食品を皿から押しのけます。' },
      { q: '動物性と植物性で違いますか。', a: '主にアミノ酸の組成が違います。植物性は幅があるので、一日を通して多様に摂れば補えます。完全に植物性の食事では、合計をやや多めにする提案もあります。' },
      { q: '体重と除脂肪体重、どちらで計算しますか。', a: '一般には体重で、ここでもそうしています。体脂肪が多い場合は除脂肪体重のほうが妥当な目安になります。脂肪組織にたんぱく質は要らないからです。' },
    ],
    ui: {
      section: '条件', weight: '体重 (kg)', level: '運動量と目的', calc: '計算する',
      l1: 'ほとんど運動しない', l1s: '基準値 0.8 g/kg',
      l2: '趣味で体を動かす', l2s: '週に数回 1.2〜1.6 g/kg',
      l3: '定期的に運動する', l3s: '筋力・持久系 1.4〜1.8 g/kg',
      l4: '筋肉を増やす・守る', l4s: '増量・減量中 1.6〜2.2 g/kg',
      perDay: '一日あたり', perMeal: '1食あたり (3食で割った量)', range: '目安の幅', unit: 'g',
      note: '健康な成人向けです。腎疾患がある場合は医療者の指示に従ってください。',
    },
  },
  de: {
    title: 'Proteinbedarf-Rechner',
    desc: 'Ein täglicher Proteinbereich aus Körpergewicht und Trainingsart',
    short: 'Tägliches Protein nach Ziel',
    intro: [
      {
        h: 'Der Richtwert hängt davon ab, was Sie tun',
        p: 'Für Erwachsene, die kaum Sport treiben, liegt die Referenzzufuhr bei etwa 0,8 g je Kilogramm Körpergewicht. Wer regelmäßig trainiert, landet üblicherweise bei 1,4–1,8 g; Muskeln aufbauen oder sie im Defizit schützen führt zu 1,6–2,2 g. Ein Bereich beschreibt das besser, als eine einzelne Zahl es je könnte.',
      },
      {
        h: 'Über den Tag verteilen',
        p: 'Wie viel Protein eine einzelne Mahlzeit in Muskelaufbau umsetzen kann, ist begrenzt — den Tagesrichtwert auf drei bis vier Mahlzeiten zu verteilen wirkt daher besser als eine große Portion. Dafür steht der Wert je Mahlzeit weiter unten.',
      },
      {
        h: 'Manche brauchen weniger, nicht mehr',
        p: 'Bei Nierenerkrankungen kann Protein zu begrenzen sein. Diese Zahlen setzen gesunde Erwachsene voraus; bei einer Erkrankung, in der Schwangerschaft oder Stillzeit kommt der richtige Wert von einer Ärztin, nicht von einem Rechner.',
      },
    ],
    faq: [
      { q: 'Ist mehr Protein immer besser?', a: 'Nein. Oberhalb von rund 2,2 g je Kilogramm bringt der Überschuss bei gesunden, trainierten Erwachsenen keinen zusätzlichen Muskel — er wird schlicht als Energie verwertet und verdrängt andere Lebensmittel vom Teller.' },
      { q: 'Macht es einen Unterschied, ob tierisch oder pflanzlich?', a: 'Vor allem über das Aminosäureprofil. Pflanzliche Quellen schwanken stärker, eine über den Tag abwechslungsreiche Ernährung gleicht das aus; bei rein pflanzlicher Kost wird mitunter eine etwas höhere Gesamtmenge empfohlen.' },
      { q: 'Körpergewicht oder fettfreie Masse?', a: 'Üblich ist das Körpergewicht, und darauf rechnet auch dieses Werkzeug. Bei hohem Körperfettanteil ergibt die fettfreie Masse einen sinnvolleren Richtwert, denn Fettgewebe braucht kein Protein.' },
    ],
    ui: {
      section: 'Ihr Richtwert', weight: 'Gewicht (kg)', level: 'Aktivität und Ziel', calc: 'Berechnen',
      l1: 'Kaum Bewegung', l1s: 'Referenzzufuhr, 0,8 g/kg',
      l2: 'Freizeitsport', l2s: 'Ein paar Einheiten pro Woche, 1,2–1,6 g/kg',
      l3: 'Trainiert regelmäßig', l3s: 'Kraft oder Ausdauer, 1,4–1,8 g/kg',
      l4: 'Muskeln aufbauen oder halten', l4s: 'Aufbau oder Diät, 1,6–2,2 g/kg',
      perDay: 'Pro Tag', perMeal: 'Je Mahlzeit, auf 3 Mahlzeiten', range: 'Bereich', unit: 'g',
      note: 'Für gesunde Erwachsene. Bei Nierenerkrankung gilt der ärztliche Rat.',
    },
  },
  fr: {
    title: 'Calculateur d’apport en protéines',
    desc: 'Une fourchette quotidienne de protéines selon le poids et l’entraînement',
    short: 'Protéines par jour selon l’objectif',
    intro: [
      {
        h: 'La cible dépend de ce que vous faites',
        p: 'Pour un adulte qui bouge peu, l’apport de référence tourne autour de 0,8 g par kilo de poids. Avec un entraînement régulier, la fourchette habituelle est 1,4–1,8 g ; prendre du muscle, ou le préserver en déficit, monte à 1,6–2,2 g. Une fourchette décrit cela bien mieux qu’un chiffre unique.',
      },
      {
        h: 'Répartir sur la journée',
        p: 'Il existe un plafond à la quantité de protéines qu’un seul repas peut orienter vers la construction musculaire : diviser la cible sur trois ou quatre repas fonctionne mieux qu’une grosse portion. C’est à cela que sert le chiffre par repas ci-dessous.',
      },
      {
        h: 'Certains en ont besoin de moins, pas de plus',
        p: 'Une maladie rénale peut imposer de limiter les protéines. Ces chiffres supposent un adulte en bonne santé ; en cas de pathologie, de grossesse ou d’allaitement, le bon chiffre vient d’un professionnel de santé, pas d’un calculateur.',
      },
    ],
    faq: [
      { q: 'Plus de protéines, est-ce toujours mieux ?', a: 'Non. Au-delà d’environ 2,2 g par kilo, l’excédent n’apporte pas de muscle supplémentaire chez l’adulte sain et entraîné : il sert d’énergie et prend la place d’autres aliments dans l’assiette.' },
      { q: 'Animale ou végétale, cela change-t-il quelque chose ?', a: 'Surtout par le profil en acides aminés. Les sources végétales varient davantage, une alimentation diversifiée sur la journée compense ; en alimentation entièrement végétale, un total légèrement supérieur est parfois conseillé.' },
      { q: 'Poids total ou masse maigre ?', a: 'Le poids total est la base habituelle, et c’est ce qui est utilisé ici. Avec un taux de graisse élevé, la masse maigre donne une cible plus sensée, le tissu adipeux n’ayant pas besoin de protéines.' },
    ],
    ui: {
      section: 'Votre cible', weight: 'Poids (kg)', level: 'Activité et objectif', calc: 'Calculer',
      l1: 'Peu ou pas d’exercice', l1s: 'Apport de référence, 0,8 g/kg',
      l2: 'Sport de loisir', l2s: 'Quelques séances par semaine, 1,2–1,6 g/kg',
      l3: 'Entraînement régulier', l3s: 'Force ou endurance, 1,4–1,8 g/kg',
      l4: 'Prendre ou préserver du muscle', l4s: 'Prise de masse ou sèche, 1,6–2,2 g/kg',
      perDay: 'Par jour', perMeal: 'Par repas, sur 3 repas', range: 'Fourchette', unit: 'g',
      note: 'Pour adultes en bonne santé. En cas d’atteinte rénale, suivez l’avis médical.',
    },
  },
  hi: {
    title: 'प्रोटीन सेवन कैलकुलेटर',
    desc: 'वज़न और आपकी कसरत से रोज़ की प्रोटीन की सीमा',
    short: 'लक्ष्य के हिसाब से रोज़ का प्रोटीन',
    intro: [
      {
        h: 'लक्ष्य इस पर निर्भर है कि आप करते क्या हैं',
        p: 'शायद ही कसरत करने वाले वयस्क के लिए संदर्भ मात्रा लगभग 0.8 ग्राम प्रति किलो वज़न है। नियमित कसरत पर सामान्य सीमा 1.4–1.8 ग्राम है; मांसपेशी बढ़ाना, या घाटे के दौरान उसे बचाना, इसे 1.6–2.2 ग्राम तक ले जाता है। एक अकेली संख्या से कहीं बेहतर यह बात एक सीमा बताती है।',
      },
      {
        h: 'दिन भर में बाँटकर लें',
        p: 'एक ही भोजन से मांसपेशी बनाने में कितना प्रोटीन लग सकता है, इसकी एक हद है, इसलिए रोज़ के लक्ष्य को तीन-चार भोजन में बाँटना एक बड़ी ख़ुराक से बेहतर काम करता है। नीचे प्रति भोजन का आंकड़ा इसी के लिए है।',
      },
      {
        h: 'कुछ लोगों को कम चाहिए, ज़्यादा नहीं',
        p: 'गुर्दे की बीमारी में प्रोटीन सीमित करना पड़ सकता है। ये आंकड़े स्वस्थ वयस्क मानकर हैं; कोई बीमारी हो, या आप गर्भवती या स्तनपान कराने वाली हों, तो सही संख्या कैलकुलेटर नहीं, चिकित्सक देगा।',
      },
    ],
    faq: [
      { q: 'क्या ज़्यादा प्रोटीन हमेशा बेहतर है?', a: 'नहीं। लगभग 2.2 ग्राम प्रति किलो से ऊपर, स्वस्थ और प्रशिक्षित वयस्कों में अतिरिक्त प्रोटीन से और मांसपेशी नहीं बनती — वह बस ऊर्जा में चला जाता है और थाली से दूसरे भोजन की जगह ले लेता है।' },
      { q: 'पशु या पादप प्रोटीन से फ़र्क़ पड़ता है?', a: 'मुख्यतः अमीनो अम्ल की बनावट से। पादप स्रोतों में अंतर ज़्यादा होता है, इसलिए दिन भर विविध आहार से काम चल जाता है; पूरी तरह पादप-आधारित आहार में कभी-कभी कुल मात्रा थोड़ी बढ़ाने की सलाह दी जाती है।' },
      { q: 'कुल वज़न लूँ या दुबला द्रव्यमान?', a: 'आमतौर पर कुल वज़न, और यहाँ भी वही लिया गया है। शरीर में चर्बी ज़्यादा हो तो दुबला द्रव्यमान अधिक समझदार लक्ष्य देता है, क्योंकि वसा ऊतक को प्रोटीन नहीं चाहिए।' },
    ],
    ui: {
      section: 'आपका लक्ष्य', weight: 'वज़न (किग्रा)', level: 'गतिविधि और लक्ष्य', calc: 'गणना करें',
      l1: 'कसरत नहीं के बराबर', l1s: 'संदर्भ मात्रा, 0.8 ग्राम/किग्रा',
      l2: 'शौक़िया कसरत', l2s: 'हफ़्ते में कुछ बार, 1.2–1.6 ग्राम/किग्रा',
      l3: 'नियमित कसरत', l3s: 'ताक़त या सहनशक्ति, 1.4–1.8 ग्राम/किग्रा',
      l4: 'मांसपेशी बढ़ाना या बचाना', l4s: 'बल्किंग या कटिंग, 1.6–2.2 ग्राम/किग्रा',
      perDay: 'रोज़ाना', perMeal: 'प्रति भोजन, 3 भोजन में', range: 'सीमा', unit: 'ग्राम',
      note: 'स्वस्थ वयस्कों के लिए। गुर्दे की बीमारी हो तो चिकित्सकीय सलाह मानें।',
    },
  },
  'zh-hans': {
    title: '蛋白质摄入量计算器',
    desc: '按体重和训练情况给出每日蛋白质区间',
    short: '按目标算每日蛋白质',
    intro: [
      {
        h: '目标取决于你在做什么',
        p: '几乎不锻炼的成年人，参考摄入量大约是每公斤体重 0.8 克。规律训练的话，常见区间是 1.4–1.8 克；要增肌，或者在热量缺口里保住肌肉，会推到 1.6–2.2 克。用一个区间来说明这件事，比任何单一数字都贴切。',
      },
      {
        h: '分到一天里去吃',
        p: '单独一餐能拿去合成肌肉的蛋白质是有上限的，所以把每天的目标分到三到四餐，比一顿吃一大份更有效。下面那个"每餐"的数字就是为此而设。',
      },
      {
        h: '有些人需要的是更少，不是更多',
        p: '肾脏疾病可能要求限制蛋白质。这些数字假定的是健康成年人；如果你有疾病，或正在怀孕、哺乳，正确的数字来自医生，而不是计算器。',
      },
    ],
    faq: [
      { q: '蛋白质越多越好吗？', a: '不是。超过每公斤约 2.2 克之后，对健康且有训练的成年人来说，多出来的并不会带来更多肌肉——它只是被当作能量用掉，还挤占了盘子里其他食物的位置。' },
      { q: '动物蛋白和植物蛋白有区别吗？', a: '主要在氨基酸构成上。植物来源差异更大，所以一天之内吃得多样就能补齐；完全植物性饮食有时会建议把总量稍微提高一点。' },
      { q: '该按体重算还是按去脂体重算？', a: '通常按体重，这里用的也是体重。体脂率很高时，按去脂体重给出的目标更合理，因为脂肪组织并不需要蛋白质。' },
    ],
    ui: {
      section: '你的目标', weight: '体重 (kg)', level: '活动量与目标', calc: '计算',
      l1: '几乎不运动', l1s: '参考摄入量，0.8 克/公斤',
      l2: '休闲式运动', l2s: '每周几次，1.2–1.6 克/公斤',
      l3: '规律训练', l3s: '力量或耐力，1.4–1.8 克/公斤',
      l4: '增肌或保肌', l4s: '增肌期或减脂期，1.6–2.2 克/公斤',
      perDay: '每天', perMeal: '每餐（分 3 餐）', range: '区间', unit: '克',
      note: '面向健康成年人。有肾脏疾病请遵医嘱。',
    },
  },
  'zh-hant': {
    title: '蛋白質攝取量計算機',
    desc: '按體重和訓練情況給出每日蛋白質區間',
    short: '按目標算每日蛋白質',
    intro: [
      {
        h: '目標取決於你在做什麼',
        p: '幾乎不運動的成年人，參考攝取量大約是每公斤體重 0.8 克。規律訓練的話，常見區間是 1.4–1.8 克；要增肌，或者在熱量缺口裡保住肌肉，會推到 1.6–2.2 克。用一個區間來說明這件事，比任何單一數字都貼切。',
      },
      {
        h: '分到一天裡去吃',
        p: '單獨一餐能拿去合成肌肉的蛋白質是有上限的，所以把每天的目標分到三到四餐，比一頓吃一大份更有效。下面那個「每餐」的數字就是為此而設。',
      },
      {
        h: '有些人需要的是更少，不是更多',
        p: '腎臟疾病可能要求限制蛋白質。這些數字假定的是健康成年人；如果你有疾病，或正在懷孕、哺乳，正確的數字來自醫師，而不是計算機。',
      },
    ],
    faq: [
      { q: '蛋白質越多越好嗎？', a: '不是。超過每公斤約 2.2 克之後，對健康且有訓練的成年人來說，多出來的並不會帶來更多肌肉——它只是被當作能量用掉，還擠占了盤子裡其他食物的位置。' },
      { q: '動物蛋白和植物蛋白有區別嗎？', a: '主要在胺基酸組成上。植物來源差異更大，所以一天之內吃得多樣就能補齊；完全植物性飲食有時會建議把總量稍微提高一點。' },
      { q: '該按體重算還是按去脂體重算？', a: '通常按體重，這裡用的也是體重。體脂率很高時，按去脂體重給出的目標更合理，因為脂肪組織並不需要蛋白質。' },
    ],
    ui: {
      section: '你的目標', weight: '體重 (kg)', level: '活動量與目標', calc: '計算',
      l1: '幾乎不運動', l1s: '參考攝取量，0.8 克/公斤',
      l2: '休閒式運動', l2s: '每週幾次，1.2–1.6 克/公斤',
      l3: '規律訓練', l3s: '力量或耐力，1.4–1.8 克/公斤',
      l4: '增肌或保肌', l4s: '增肌期或減脂期，1.6–2.2 克/公斤',
      perDay: '每天', perMeal: '每餐（分 3 餐）', range: '區間', unit: '克',
      note: '面向健康成年人。有腎臟疾病請遵醫囑。',
    },
  },
};
