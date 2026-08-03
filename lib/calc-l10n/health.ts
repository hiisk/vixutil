import type { CalcTable } from './types.ts';

/**
 * 기초대사량과 물 섭취량.
 *
 * 둘 다 국제 공식을 그대로 쓴다 — Mifflin-St Jeor와 Harris-Benedict, 그리고
 * 체중 1kg당 33ml이라는 흔한 어림값. 나라를 타는 기준이 아니라 그대로 옮겼다.
 * 단위는 BMI와 같이 cm·kg으로 맞춘다.
 */
export const BMR: CalcTable = {
  en: {
    title: 'BMR calculator',
    desc: 'Basal metabolic rate by the Mifflin-St Jeor and Harris-Benedict equations',
    short: 'What your body burns at rest',
    intro: [
      {
        h: 'What the number covers',
        p: 'Basal metabolic rate is the energy your body uses doing nothing at all — keeping the heart going, holding temperature steady, running the organs. It is the largest single share of most people’s daily burn, and everything you actually do sits on top of it.',
      },
      {
        h: 'Why two equations are shown',
        p: 'Harris-Benedict is the older one and tends to read high. Mifflin-St Jeor is newer and generally fits contemporary bodies better. Seeing the gap between them makes the point that neither is a measurement — both are estimates from four inputs, and your real rate may sit outside both.',
      },
      {
        h: 'Body composition is invisible here',
        p: 'Both equations use only sex, age, height and weight. Two people identical on those four can burn noticeably differently if one carries more muscle, because muscle costs more energy to maintain than fat. No formula built on these inputs can see that difference.',
      },
    ],
    faq: [
      { q: 'Which of the two should I use?', a: 'Mifflin-St Jeor is the usual recommendation and is what most calorie tools apply. Treat Harris-Benedict as a second opinion rather than an alternative answer.' },
      { q: 'Should I eat this many calories?', a: 'No. This is what you burn lying still. Daily needs are this figure multiplied by an activity factor, and eating below your basal rate is generally not advised.' },
      { q: 'How accurate is it?', a: 'For most people within roughly 10%, which sounds small until you notice that 10% of 1,600 is 160 calories a day. Use it as a starting point and adjust against what actually happens to your weight over a few weeks.' },
    ],
    ui: {
      section: 'About you', sex: 'Sex', male: 'Male', female: 'Female',
      age: 'Age', height: 'Height (cm)', weight: 'Weight (kg)', calc: 'Calculate',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: 'kcal / day', recommended: 'Generally preferred',
      note: 'An estimate from four numbers, not a measurement. Not medical advice.',
    },
  },
  es: {
    title: 'Calculadora de metabolismo basal',
    desc: 'Tasa metabólica basal según las ecuaciones de Mifflin-St Jeor y Harris-Benedict',
    short: 'Lo que gastas en reposo',
    intro: [
      {
        h: 'Qué cubre esa cifra',
        p: 'El metabolismo basal es la energía que tu cuerpo gasta sin hacer nada: mantener el corazón, sostener la temperatura, hacer funcionar los órganos. Es la mayor porción del gasto diario de casi todo el mundo, y todo lo que haces se suma por encima.',
      },
      {
        h: 'Por qué se muestran dos ecuaciones',
        p: 'Harris-Benedict es la más antigua y tiende a dar valores altos. Mifflin-St Jeor es más reciente y suele ajustarse mejor a los cuerpos actuales. Ver la distancia entre ambas deja claro que ninguna es una medición: son estimaciones a partir de cuatro datos, y tu valor real puede quedar fuera de las dos.',
      },
      {
        h: 'La composición corporal no se ve aquí',
        p: 'Ambas ecuaciones usan solo sexo, edad, altura y peso. Dos personas idénticas en esos cuatro pueden gastar de forma bastante distinta si una tiene más músculo, porque mantener músculo cuesta más energía que mantener grasa. Ninguna fórmula con estas entradas ve esa diferencia.',
      },
    ],
    faq: [
      { q: '¿Cuál de las dos debería usar?', a: 'Mifflin-St Jeor es la recomendación habitual y la que aplican casi todas las herramientas de calorías. Toma Harris-Benedict como segunda opinión, no como respuesta alternativa.' },
      { q: '¿Debo comer esas calorías?', a: 'No. Eso es lo que gastas tumbado sin moverte. Las necesidades diarias son esta cifra multiplicada por un factor de actividad, y comer por debajo del basal no suele estar aconsejado.' },
      { q: '¿Qué precisión tiene?', a: 'Para la mayoría, un margen de aproximadamente el 10%, que parece poco hasta que ves que el 10% de 1.600 son 160 calorías al día. Úsalo como punto de partida y ajústalo con lo que realmente pase con tu peso en unas semanas.' },
    ],
    ui: {
      section: 'Sobre ti', sex: 'Sexo', male: 'Hombre', female: 'Mujer',
      age: 'Edad', height: 'Altura (cm)', weight: 'Peso (kg)', calc: 'Calcular',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: 'kcal / día', recommended: 'La más recomendada',
      note: 'Una estimación a partir de cuatro números, no una medición. No es consejo médico.',
    },
  },
  'pt-br': {
    title: 'Calculadora de taxa metabólica basal',
    desc: 'TMB pelas equações de Mifflin-St Jeor e Harris-Benedict',
    short: 'O que você gasta em repouso',
    intro: [
      {
        h: 'O que esse número cobre',
        p: 'A taxa metabólica basal é a energia que o corpo usa sem fazer nada: manter o coração, sustentar a temperatura, tocar os órgãos. É a maior fatia do gasto diário da maioria das pessoas, e tudo o que você faz vem somado por cima.',
      },
      {
        h: 'Por que duas equações',
        p: 'Harris-Benedict é a mais antiga e costuma dar valores altos. Mifflin-St Jeor é mais recente e em geral se ajusta melhor aos corpos de hoje. Ver a distância entre as duas deixa claro que nenhuma é medição: são estimativas a partir de quatro dados, e seu valor real pode ficar fora de ambas.',
      },
      {
        h: 'A composição corporal não aparece aqui',
        p: 'As duas equações usam só sexo, idade, altura e peso. Duas pessoas idênticas nesses quatro podem gastar de forma bem diferente se uma tiver mais músculo, porque manter músculo custa mais energia do que manter gordura. Nenhuma fórmula com essas entradas enxerga essa diferença.',
      },
    ],
    faq: [
      { q: 'Qual das duas devo usar?', a: 'Mifflin-St Jeor é a recomendação usual e a que quase toda ferramenta de calorias aplica. Encare Harris-Benedict como segunda opinião, não como resposta alternativa.' },
      { q: 'Devo comer essas calorias?', a: 'Não. Isso é o que você gasta deitado sem se mexer. A necessidade diária é este número multiplicado por um fator de atividade, e comer abaixo do basal em geral não é recomendado.' },
      { q: 'Qual a precisão?', a: 'Para a maioria, algo em torno de 10% de margem — que parece pouco até você notar que 10% de 1.600 são 160 calorias por dia. Use como ponto de partida e ajuste pelo que realmente acontecer com seu peso em algumas semanas.' },
    ],
    ui: {
      section: 'Sobre você', sex: 'Sexo', male: 'Homem', female: 'Mulher',
      age: 'Idade', height: 'Altura (cm)', weight: 'Peso (kg)', calc: 'Calcular',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: 'kcal / dia', recommended: 'Geralmente preferida',
      note: 'Uma estimativa a partir de quatro números, não uma medição. Não é orientação médica.',
    },
  },
  ja: {
    title: '基礎代謝量の計算機',
    desc: 'ミフリン・セントジョー式とハリス・ベネディクト式で基礎代謝量を出します',
    short: '安静時に使う一日の熱量',
    intro: [
      {
        h: 'この数字が含むもの',
        p: '基礎代謝量は、何もしていなくても体が使う熱量です。心臓を動かし、体温を保ち、臓器を働かせるぶんで、多くの人にとって一日の消費の中でいちばん大きな塊です。実際の活動はすべてこの上に乗ります。',
      },
      {
        h: '二つの式を並べる理由',
        p: 'ハリス・ベネディクト式は古く、やや高めに出る傾向があります。ミフリン・セントジョー式は新しく、現代の体格によく合うとされます。二つの差を見れば、これが測定値ではなく、四つの数字からの推定にすぎないことが分かります。実際の値は両方の外に出ることもあります。',
      },
      {
        h: '体組成はここに映りません',
        p: 'どちらの式も性別・年齢・身長・体重しか使いません。この四つが同じでも、筋肉が多い人は実際にはもっと使います。筋肉は脂肪より維持に熱量がかかるからです。この入力だけの式では、その差は見えません。',
      },
    ],
    faq: [
      { q: '二つのうちどちらを使えばよいですか。', a: '一般にはミフリン・セントジョー式が勧められ、多くのカロリー計算もこちらを使います。ハリス・ベネディクト式は別解ではなく、もう一つの見立てとして眺めてください。' },
      { q: 'この数値ぶんだけ食べればよいのですか。', a: 'いいえ。これは寝たまま動かないときの消費です。一日に必要な量はこの値に活動係数を掛けたもので、基礎代謝を下回る食事は一般に勧められません。' },
      { q: 'どのくらい当たりますか。', a: 'たいていの人でおよそ10%の幅です。小さく聞こえますが、1,600の10%は一日160kcalです。出発点として使い、数週間の体重の動きに合わせて調整してください。' },
    ],
    ui: {
      section: '入力', sex: '性別', male: '男性', female: '女性',
      age: '年齢', height: '身長 (cm)', weight: '体重 (kg)', calc: '計算する',
      mifflin: 'ミフリン・セントジョー式', harris: 'ハリス・ベネディクト式',
      unit: 'kcal / 日', recommended: '一般にはこちら',
      note: '四つの数字からの推定であり、測定値ではありません。医学的助言ではありません。',
    },
  },
  de: {
    title: 'Grundumsatz-Rechner',
    desc: 'Grundumsatz nach den Formeln von Mifflin-St Jeor und Harris-Benedict',
    short: 'Verbrauch in völliger Ruhe',
    intro: [
      {
        h: 'Was diese Zahl umfasst',
        p: 'Der Grundumsatz ist die Energie, die der Körper verbraucht, wenn er gar nichts tut: Herz schlagen lassen, Temperatur halten, Organe betreiben. Bei den meisten Menschen ist das der größte Einzelposten des Tagesverbrauchs; alles Getane kommt obendrauf.',
      },
      {
        h: 'Warum zwei Formeln stehen',
        p: 'Harris-Benedict ist die ältere und liegt tendenziell hoch. Mifflin-St Jeor ist neuer und passt in der Regel besser zu heutigen Körpern. Der Abstand zwischen beiden zeigt, dass keine von beiden eine Messung ist — es sind Schätzungen aus vier Angaben, und Ihr echter Wert kann außerhalb beider liegen.',
      },
      {
        h: 'Die Körperzusammensetzung bleibt unsichtbar',
        p: 'Beide Formeln nutzen nur Geschlecht, Alter, Größe und Gewicht. Zwei Menschen, die in diesen vier gleich sind, verbrauchen spürbar verschieden, wenn einer mehr Muskeln trägt — Muskeln kosten im Unterhalt mehr Energie als Fett. Eine Formel mit diesen Eingaben kann das nicht sehen.',
      },
    ],
    faq: [
      { q: 'Welche der beiden soll ich nehmen?', a: 'Üblicherweise wird Mifflin-St Jeor empfohlen, und die meisten Kalorienrechner verwenden sie. Nehmen Sie Harris-Benedict als Zweitmeinung, nicht als andere Antwort.' },
      { q: 'Soll ich so viele Kalorien essen?', a: 'Nein. Das ist der Verbrauch im reglosen Liegen. Der Tagesbedarf ist dieser Wert mal einem Aktivitätsfaktor, und unter dem Grundumsatz zu essen wird im Allgemeinen nicht empfohlen.' },
      { q: 'Wie genau ist das?', a: 'Für die meisten auf rund 10% genau — klingt wenig, bis man merkt: 10% von 1.600 sind 160 Kalorien am Tag. Nehmen Sie es als Ausgangspunkt und justieren Sie nach dem, was das Gewicht über einige Wochen tatsächlich macht.' },
    ],
    ui: {
      section: 'Ihre Angaben', sex: 'Geschlecht', male: 'Männlich', female: 'Weiblich',
      age: 'Alter', height: 'Größe (cm)', weight: 'Gewicht (kg)', calc: 'Berechnen',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: 'kcal / Tag', recommended: 'Meist bevorzugt',
      note: 'Eine Schätzung aus vier Zahlen, keine Messung. Keine medizinische Beratung.',
    },
  },
  fr: {
    title: 'Calculateur de métabolisme de base',
    desc: 'Métabolisme de base selon les équations de Mifflin-St Jeor et Harris-Benedict',
    short: 'Ce que le corps dépense au repos',
    intro: [
      {
        h: 'Ce que couvre ce chiffre',
        p: 'Le métabolisme de base, c’est l’énergie que le corps consomme sans rien faire : faire battre le cœur, tenir la température, faire tourner les organes. Chez la plupart des gens c’est le plus gros poste de la dépense quotidienne, et tout ce qu’on fait vient s’y ajouter.',
      },
      {
        h: 'Pourquoi deux équations',
        p: 'Harris-Benedict est la plus ancienne et donne des valeurs plutôt hautes. Mifflin-St Jeor est plus récente et colle en général mieux aux corps d’aujourd’hui. L’écart entre les deux rappelle qu’aucune n’est une mesure : ce sont des estimations à partir de quatre données, et votre valeur réelle peut sortir des deux.',
      },
      {
        h: 'La composition corporelle est invisible ici',
        p: 'Les deux équations n’utilisent que le sexe, l’âge, la taille et le poids. Deux personnes identiques sur ces quatre points peuvent dépenser nettement différemment si l’une porte plus de muscle, car entretenir du muscle coûte plus d’énergie que de la graisse. Aucune formule bâtie sur ces entrées ne voit cette différence.',
      },
    ],
    faq: [
      { q: 'Laquelle des deux utiliser ?', a: 'Mifflin-St Jeor est la recommandation habituelle et celle qu’appliquent la plupart des outils caloriques. Voyez Harris-Benedict comme un second avis, pas comme une réponse alternative.' },
      { q: 'Dois-je manger ce nombre de calories ?', a: 'Non. C’est ce que vous dépensez allongé sans bouger. Le besoin journalier, c’est ce chiffre multiplié par un facteur d’activité, et manger sous son métabolisme de base n’est généralement pas conseillé.' },
      { q: 'Quelle est la précision ?', a: 'Pour la plupart des gens, une marge d’environ 10% — cela paraît peu jusqu’à remarquer que 10% de 1 600, c’est 160 calories par jour. Servez-vous-en comme point de départ et ajustez selon ce que fait réellement votre poids en quelques semaines.' },
    ],
    ui: {
      section: 'Vos données', sex: 'Sexe', male: 'Homme', female: 'Femme',
      age: 'Âge', height: 'Taille (cm)', weight: 'Poids (kg)', calc: 'Calculer',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: 'kcal / jour', recommended: 'Généralement préférée',
      note: 'Une estimation à partir de quatre nombres, pas une mesure. Ce n’est pas un avis médical.',
    },
  },
  hi: {
    title: 'बीएमआर कैलकुलेटर',
    desc: 'मिफ़लिन-सेंट जॉर और हैरिस-बेनेडिक्ट सूत्रों से आधारभूत चयापचय दर',
    short: 'आराम की हालत में होने वाला ख़र्च',
    intro: [
      {
        h: 'यह संख्या किसे गिनती है',
        p: 'आधारभूत चयापचय दर वह ऊर्जा है जो शरीर कुछ भी न करते हुए ख़र्च करता है — दिल चलाना, तापमान बनाए रखना, अंगों को काम पर रखना। ज़्यादातर लोगों के रोज़ के ख़र्च का सबसे बड़ा हिस्सा यही है, और जो कुछ आप करते हैं वह इसके ऊपर जुड़ता है।',
      },
      {
        h: 'दो सूत्र क्यों दिखाए गए',
        p: 'हैरिस-बेनेडिक्ट पुराना है और थोड़ा ऊँचा आता है। मिफ़लिन-सेंट जॉर नया है और आज के शरीरों पर आमतौर पर बेहतर बैठता है। दोनों के बीच का फ़ासला यही बताता है कि कोई भी माप नहीं है — दोनों चार आंकड़ों से लगाया अनुमान हैं, और आपका असली मान दोनों के बाहर भी हो सकता है।',
      },
      {
        h: 'शरीर की बनावट यहाँ नहीं दिखती',
        p: 'दोनों सूत्र सिर्फ़ लिंग, उम्र, लंबाई और वज़न लेते हैं। इन चारों में एक जैसे दो लोग भी अलग-अलग ख़र्च कर सकते हैं अगर एक के पास ज़्यादा मांसपेशी हो, क्योंकि मांसपेशी को बनाए रखने में चर्बी से ज़्यादा ऊर्जा लगती है। इन इनपुट पर बना कोई सूत्र यह फ़र्क़ नहीं देख सकता।',
      },
    ],
    faq: [
      { q: 'दोनों में से कौन-सा इस्तेमाल करूँ?', a: 'आमतौर पर मिफ़लिन-सेंट जॉर की सिफ़ारिश होती है और ज़्यादातर कैलोरी उपकरण यही लगाते हैं। हैरिस-बेनेडिक्ट को दूसरा जवाब नहीं, दूसरी राय मानिए।' },
      { q: 'क्या मुझे इतनी ही कैलोरी खानी चाहिए?', a: 'नहीं। यह लेटे-लेटे बिना हिले होने वाला ख़र्च है। रोज़ की ज़रूरत इस आंकड़े को गतिविधि गुणांक से गुणा करने पर आती है, और आधारभूत दर से कम खाना आमतौर पर सलाह नहीं दी जाती।' },
      { q: 'यह कितना सटीक है?', a: 'ज़्यादातर लोगों के लिए लगभग 10% के भीतर — सुनने में कम लगता है, जब तक ध्यान न जाए कि 1,600 का 10% यानी रोज़ 160 कैलोरी। इसे शुरुआत मानिए और कुछ हफ़्तों में वज़न के साथ जो असल में होता है, उसके हिसाब से समायोजित कीजिए।' },
    ],
    ui: {
      section: 'आपके बारे में', sex: 'लिंग', male: 'पुरुष', female: 'महिला',
      age: 'उम्र', height: 'लंबाई (सेमी)', weight: 'वज़न (किग्रा)', calc: 'गणना करें',
      mifflin: 'मिफ़लिन-सेंट जॉर', harris: 'हैरिस-बेनेडिक्ट',
      unit: 'किलो कैलोरी / दिन', recommended: 'आमतौर पर यही',
      note: 'चार संख्याओं से लगाया अनुमान है, माप नहीं। यह चिकित्सकीय सलाह नहीं है।',
    },
  },
  'zh-hans': {
    title: '基础代谢率计算器',
    desc: '用 Mifflin-St Jeor 和 Harris-Benedict 两个公式算基础代谢率',
    short: '静息状态下的消耗',
    intro: [
      {
        h: '这个数字包含什么',
        p: '基础代谢率是身体什么都不做时消耗的能量——让心脏跳动、维持体温、运转脏器。对大多数人来说，它是一天消耗里最大的一块，你实际做的每件事都加在它上面。',
      },
      {
        h: '为什么并排放两个公式',
        p: 'Harris-Benedict 更老，算出来偏高。Mifflin-St Jeor 更新一些，通常更贴合现代人的体型。两者之间的差距恰好说明：它们都不是测量，而是由四个数字得出的估算，你的真实值甚至可能落在两者之外。',
      },
      {
        h: '体成分在这里是看不见的',
        p: '两个公式都只用性别、年龄、身高、体重。这四项完全相同的两个人，如果一个肌肉更多，实际消耗会明显更高，因为维持肌肉比维持脂肪更费能量。只靠这些输入的公式看不到这个差别。',
      },
    ],
    faq: [
      { q: '两个公式该用哪个？', a: '通常推荐 Mifflin-St Jeor，大多数热量工具也用它。把 Harris-Benedict 当作第二种看法，而不是另一个答案。' },
      { q: '我该按这个数字吃吗？', a: '不该。这是你躺着不动时的消耗。每天需要的量是这个数字乘以活动系数，而吃得低于基础代谢一般不建议。' },
      { q: '准不准？', a: '对多数人误差在 10% 左右——听着不多，但 1,600 的 10% 就是每天 160 千卡。把它当起点，再根据几周内体重的实际变化去调。' },
    ],
    ui: {
      section: '你的信息', sex: '性别', male: '男', female: '女',
      age: '年龄', height: '身高 (cm)', weight: '体重 (kg)', calc: '计算',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: '千卡 / 天', recommended: '通常首选',
      note: '这是由四个数字得出的估算，不是测量。不构成医疗建议。',
    },
  },
  'zh-hant': {
    title: '基礎代謝率計算機',
    desc: '用 Mifflin-St Jeor 和 Harris-Benedict 兩個公式算基礎代謝率',
    short: '靜息狀態下的消耗',
    intro: [
      {
        h: '這個數字包含什麼',
        p: '基礎代謝率是身體什麼都不做時消耗的能量——讓心臟跳動、維持體溫、運轉臟器。對大多數人來說，它是一天消耗裡最大的一塊，你實際做的每件事都加在它上面。',
      },
      {
        h: '為什麼並排放兩個公式',
        p: 'Harris-Benedict 更老，算出來偏高。Mifflin-St Jeor 更新一些，通常更貼合現代人的體型。兩者之間的差距恰好說明：它們都不是測量，而是由四個數字得出的估算，你的真實值甚至可能落在兩者之外。',
      },
      {
        h: '體組成在這裡是看不見的',
        p: '兩個公式都只用性別、年齡、身高、體重。這四項完全相同的兩個人，如果一個肌肉更多，實際消耗會明顯更高，因為維持肌肉比維持脂肪更費能量。只靠這些輸入的公式看不到這個差別。',
      },
    ],
    faq: [
      { q: '兩個公式該用哪個？', a: '通常推薦 Mifflin-St Jeor，大多數熱量工具也用它。把 Harris-Benedict 當作第二種看法，而不是另一個答案。' },
      { q: '我該按這個數字吃嗎？', a: '不該。這是你躺著不動時的消耗。每天需要的量是這個數字乘以活動係數，而吃得低於基礎代謝一般不建議。' },
      { q: '準不準？', a: '對多數人誤差在 10% 左右——聽著不多，但 1,600 的 10% 就是每天 160 大卡。把它當起點，再根據幾週內體重的實際變化去調。' },
    ],
    ui: {
      section: '你的資料', sex: '性別', male: '男', female: '女',
      age: '年齡', height: '身高 (cm)', weight: '體重 (kg)', calc: '計算',
      mifflin: 'Mifflin-St Jeor', harris: 'Harris-Benedict',
      unit: '大卡 / 天', recommended: '通常首選',
      note: '這是由四個數字得出的估算，不是測量。不構成醫療建議。',
    },
  },
};

export const WATER: CalcTable = {
  en: {
    title: 'Daily water intake calculator',
    desc: 'A rough daily target from body weight, activity and heat',
    short: 'How much to drink in a day',
    intro: [
      {
        h: 'About 33 ml per kilogram',
        p: 'This is the common rule of thumb: a 60 kg adult lands near two litres a day. Being active, working in heat or exercising adds to it, because what you lose in sweat has to be replaced on top of the baseline.',
      },
      {
        h: 'Food counts too',
        p: 'Daily fluid intake includes what comes in food. Soup, fruit and vegetables carry a lot of water, and so do tea and coffee despite their reputation. That is why the figure here is a target for total fluid, not a number of glasses you must drink separately.',
      },
      {
        h: 'Thirst is a decent guide',
        p: 'For a healthy adult, drinking to thirst and glancing at urine colour works about as well as arithmetic. Pale straw is fine; dark suggests drinking more. Deliberately drinking far beyond need is not harmless — it dilutes blood sodium, and in rare cases dangerously.',
      },
    ],
    faq: [
      { q: 'Do tea and coffee count?', a: 'Yes. The mild diuretic effect of caffeine does not cancel out the fluid it comes in. At normal intakes, a cup of coffee is a net gain of water.' },
      { q: 'What if I have a heart or kidney condition?', a: 'Then ignore this figure and follow the limit your doctor set. Some conditions require restricting fluid, and general rules of thumb do not apply.' },
      { q: 'Do I need eight glasses a day?', a: 'That number has no strong evidence behind it and does not adjust for body size, climate or activity. Weight-based estimates like this one are rough too, but at least they respond to who you are.' },
    ],
    ui: {
      section: 'Your day', weight: 'Weight (kg)',
      activity: 'Activity', actNormal: 'Mostly sitting', actHigh: 'On your feet a lot',
      weather: 'Conditions', wNormal: 'Ordinary day', wHot: 'Hot weather', wExercise: 'Exercising',
      calc: 'Calculate', result: 'Daily target', glasses: 'about {n} glasses of 250 ml',
      note: 'A rule of thumb for healthy adults, including fluid from food. Not medical advice.',
    },
  },
  es: {
    title: 'Calculadora de ingesta diaria de agua',
    desc: 'Un objetivo diario aproximado según peso, actividad y calor',
    short: 'Cuánto beber al día',
    intro: [
      {
        h: 'Unos 33 ml por kilo',
        p: 'Es la regla aproximada habitual: un adulto de 60 kg se sitúa cerca de dos litros diarios. Moverse mucho, trabajar con calor o hacer ejercicio suma, porque lo que se pierde en sudor hay que reponerlo por encima de la base.',
      },
      {
        h: 'La comida también cuenta',
        p: 'La ingesta diaria de líquidos incluye lo que viene en los alimentos. Sopas, fruta y verdura llevan mucha agua, y el té y el café también, pese a su fama. Por eso esta cifra es un objetivo de líquido total, no un número de vasos que haya que beber aparte.',
      },
      {
        h: 'La sed es una buena guía',
        p: 'En un adulto sano, beber cuando se tiene sed y mirar el color de la orina funciona casi tan bien como la aritmética. Amarillo pálido está bien; oscuro sugiere beber más. Beber muchísimo más de lo necesario no es inocuo: diluye el sodio en sangre y en casos raros de forma peligrosa.',
      },
    ],
    faq: [
      { q: '¿Cuentan el té y el café?', a: 'Sí. El leve efecto diurético de la cafeína no anula el líquido en el que viene. En cantidades normales, una taza de café supone una ganancia neta de agua.' },
      { q: '¿Y si tengo una afección cardíaca o renal?', a: 'Entonces ignora esta cifra y sigue el límite que te haya puesto tu médico. Algunas afecciones exigen restringir líquidos y las reglas generales no valen.' },
      { q: '¿Hacen falta ocho vasos al día?', a: 'Ese número no tiene evidencia sólida detrás y no se ajusta al tamaño corporal, al clima ni a la actividad. Las estimaciones por peso como esta también son aproximadas, pero al menos responden a quién eres.' },
    ],
    ui: {
      section: 'Tu día', weight: 'Peso (kg)',
      activity: 'Actividad', actNormal: 'Sobre todo sentado', actHigh: 'Mucho de pie',
      weather: 'Condiciones', wNormal: 'Día normal', wHot: 'Calor', wExercise: 'Con ejercicio',
      calc: 'Calcular', result: 'Objetivo diario', glasses: 'unos {n} vasos de 250 ml',
      note: 'Regla aproximada para adultos sanos, incluyendo el líquido de los alimentos. No es consejo médico.',
    },
  },
  'pt-br': {
    title: 'Calculadora de consumo diário de água',
    desc: 'Uma meta diária aproximada a partir de peso, atividade e calor',
    short: 'Quanto beber por dia',
    intro: [
      {
        h: 'Cerca de 33 ml por quilo',
        p: 'É a regra prática mais comum: um adulto de 60 kg fica perto de dois litros por dia. Ser ativo, trabalhar no calor ou treinar acrescenta, porque o que sai no suor precisa ser reposto acima da base.',
      },
      {
        h: 'A comida também conta',
        p: 'O consumo diário de líquidos inclui o que vem nos alimentos. Sopa, fruta e verdura carregam bastante água, e chá e café também, apesar da fama. Por isso este número é uma meta de líquido total, não uma quantidade de copos a beber à parte.',
      },
      {
        h: 'A sede é um bom guia',
        p: 'Para um adulto saudável, beber quando dá sede e olhar a cor da urina funciona quase tão bem quanto a conta. Amarelo claro está ótimo; escuro sugere beber mais. Beber muito além do necessário não é inofensivo: dilui o sódio do sangue e, em casos raros, de forma perigosa.',
      },
    ],
    faq: [
      { q: 'Chá e café contam?', a: 'Contam. O leve efeito diurético da cafeína não anula o líquido em que ela vem. Em quantidades normais, uma xícara de café é ganho líquido de água.' },
      { q: 'E se eu tiver problema cardíaco ou renal?', a: 'Aí ignore este número e siga o limite que seu médico definiu. Algumas condições exigem restrição de líquidos, e regras gerais não se aplicam.' },
      { q: 'Preciso de oito copos por dia?', a: 'Esse número não tem evidência forte por trás e não se ajusta a tamanho corporal, clima ou atividade. Estimativas por peso como esta também são grosseiras, mas ao menos respondem a quem você é.' },
    ],
    ui: {
      section: 'Seu dia', weight: 'Peso (kg)',
      activity: 'Atividade', actNormal: 'Mais sentado', actHigh: 'Muito em pé',
      weather: 'Condições', wNormal: 'Dia comum', wHot: 'Calor', wExercise: 'Com treino',
      calc: 'Calcular', result: 'Meta diária', glasses: 'cerca de {n} copos de 250 ml',
      note: 'Regra prática para adultos saudáveis, incluindo o líquido dos alimentos. Não é orientação médica.',
    },
  },
  ja: {
    title: '一日の水分摂取量の計算機',
    desc: '体重・活動量・暑さから一日の目安を出します',
    short: '一日に飲む量の目安',
    intro: [
      {
        h: '体重1kgあたり33ml前後',
        p: 'よく使われる目安です。60kgの大人なら一日およそ2Lになります。よく動く、暑いところで働く、運動をする——そのぶんは汗で出ていくので、この土台の上に足します。',
      },
      {
        h: '食事の水分も入ります',
        p: '一日の水分には食べ物に含まれる水も含まれます。汁物・果物・野菜には水がたっぷり入っていますし、評判に反してお茶やコーヒーも水分です。ここの数字は水分の合計の目安であって、別に飲むコップの数ではありません。',
      },
      {
        h: '喉の渇きはよい目安です',
        p: '健康な大人なら、渇いたら飲む、尿の色をときどき見る——これで計算とほぼ同じくらいうまくいきます。薄い麦わら色なら十分、濃ければもう少し。必要をはるかに超えて飲むのは無害ではなく、血中のナトリウムを薄め、まれに危険な状態になります。',
      },
    ],
    faq: [
      { q: 'お茶やコーヒーも数えてよいですか。', a: '数えてかまいません。カフェインの弱い利尿作用は、それが入っている水分を打ち消しません。ふつうの量なら、コーヒー1杯は差し引きで水分の足しになります。' },
      { q: '心臓や腎臓に持病がある場合は。', a: 'この数字は無視して、医師が決めた量に従ってください。水分を制限すべき状態もあり、一般的な目安は当てはまりません。' },
      { q: '一日8杯は必要ですか。', a: 'その数字に強い根拠はなく、体格も気候も活動量も反映しません。体重から出すこの目安も粗いものですが、少なくともその人に応じて動きます。' },
    ],
    ui: {
      section: '条件', weight: '体重 (kg)',
      activity: '活動量', actNormal: '座っていることが多い', actHigh: '動き回ることが多い',
      weather: '状況', wNormal: 'ふつうの日', wHot: '暑い日', wExercise: '運動する日',
      calc: '計算する', result: '一日の目安', glasses: '250mlのコップで約 {n} 杯',
      note: '健康な大人の目安で、食事の水分も含みます。医学的助言ではありません。',
    },
  },
  de: {
    title: 'Rechner für die tägliche Trinkmenge',
    desc: 'Ein grober Tagesrichtwert aus Gewicht, Aktivität und Hitze',
    short: 'Wie viel am Tag trinken',
    intro: [
      {
        h: 'Etwa 33 ml je Kilogramm',
        p: 'Das ist die übliche Faustregel: Eine erwachsene Person mit 60 kg landet bei rund zwei Litern am Tag. Viel Bewegung, Hitze bei der Arbeit oder Sport kommen obendrauf, denn was über den Schweiß verloren geht, muss zusätzlich ersetzt werden.',
      },
      {
        h: 'Essen zählt mit',
        p: 'Zur täglichen Flüssigkeit gehört auch das, was im Essen steckt. Suppen, Obst und Gemüse bringen viel Wasser mit, Tee und Kaffee entgegen ihrem Ruf ebenfalls. Deshalb ist diese Zahl ein Richtwert für die gesamte Flüssigkeit und keine Anzahl Gläser, die zusätzlich zu trinken wäre.',
      },
      {
        h: 'Durst ist ein brauchbarer Wegweiser',
        p: 'Bei gesunden Erwachsenen funktioniert Trinken nach Durst plus ein Blick auf die Urinfarbe ungefähr so gut wie Rechnen. Hellgelb ist in Ordnung, dunkel spricht für mehr. Weit über den Bedarf hinaus zu trinken ist nicht harmlos: Es verdünnt das Natrium im Blut, in seltenen Fällen gefährlich.',
      },
    ],
    faq: [
      { q: 'Zählen Tee und Kaffee?', a: 'Ja. Die milde harntreibende Wirkung von Koffein hebt die Flüssigkeit, in der es steckt, nicht auf. In üblichen Mengen ist eine Tasse Kaffee unterm Strich ein Plus an Wasser.' },
      { q: 'Und bei Herz- oder Nierenerkrankung?', a: 'Dann ignorieren Sie diesen Wert und halten sich an die Grenze, die Ihre Ärztin oder Ihr Arzt gesetzt hat. Manche Erkrankungen verlangen eine Trinkmengenbeschränkung; allgemeine Faustregeln greifen dort nicht.' },
      { q: 'Brauche ich acht Gläser am Tag?', a: 'Für diese Zahl gibt es keine belastbare Grundlage, und sie passt sich weder Körpergröße noch Klima noch Aktivität an. Gewichtsbasierte Schätzungen wie diese sind ebenfalls grob, reagieren aber immerhin darauf, wer Sie sind.' },
    ],
    ui: {
      section: 'Ihr Tag', weight: 'Gewicht (kg)',
      activity: 'Aktivität', actNormal: 'Überwiegend sitzend', actHigh: 'Viel auf den Beinen',
      weather: 'Bedingungen', wNormal: 'Normaler Tag', wHot: 'Hitze', wExercise: 'Mit Sport',
      calc: 'Berechnen', result: 'Tagesrichtwert', glasses: 'etwa {n} Gläser à 250 ml',
      note: 'Faustregel für gesunde Erwachsene, Flüssigkeit aus dem Essen eingerechnet. Keine medizinische Beratung.',
    },
  },
  fr: {
    title: 'Calculateur d’apport quotidien en eau',
    desc: 'Un objectif journalier approximatif selon le poids, l’activité et la chaleur',
    short: 'Combien boire dans la journée',
    intro: [
      {
        h: 'Environ 33 ml par kilo',
        p: 'C’est la règle empirique courante : un adulte de 60 kg arrive vers deux litres par jour. Bouger beaucoup, travailler à la chaleur ou faire du sport s’ajoute, car ce qui part en sueur doit être remplacé au-dessus de cette base.',
      },
      {
        h: 'La nourriture compte aussi',
        p: 'L’apport quotidien en liquide inclut ce qui vient des aliments. Soupes, fruits et légumes apportent beaucoup d’eau, et le thé et le café aussi, malgré leur réputation. Ce chiffre est donc un objectif de liquide total, pas un nombre de verres à boire en plus.',
      },
      {
        h: 'La soif est un bon repère',
        p: 'Chez un adulte en bonne santé, boire selon la soif et jeter un œil à la couleur des urines vaut à peu près l’arithmétique. Jaune paille clair, tout va bien ; foncé, il faut boire davantage. Boire très au-delà du besoin n’est pas anodin : cela dilue le sodium sanguin, dangereusement dans de rares cas.',
      },
    ],
    faq: [
      { q: 'Le thé et le café comptent-ils ?', a: 'Oui. Le léger effet diurétique de la caféine n’annule pas le liquide qui la porte. Aux quantités habituelles, une tasse de café est un gain net d’eau.' },
      { q: 'Et en cas de problème cardiaque ou rénal ?', a: 'Ignorez ce chiffre et suivez la limite fixée par votre médecin. Certaines pathologies imposent de restreindre les liquides, et les règles générales ne s’y appliquent pas.' },
      { q: 'Faut-il huit verres par jour ?', a: 'Ce chiffre ne repose sur rien de solide et ne tient compte ni de la corpulence, ni du climat, ni de l’activité. Les estimations au poids comme celle-ci restent grossières, mais au moins elles s’adaptent à vous.' },
    ],
    ui: {
      section: 'Votre journée', weight: 'Poids (kg)',
      activity: 'Activité', actNormal: 'Surtout assis', actHigh: 'Beaucoup debout',
      weather: 'Conditions', wNormal: 'Journée ordinaire', wHot: 'Forte chaleur', wExercise: 'Avec du sport',
      calc: 'Calculer', result: 'Objectif du jour', glasses: 'environ {n} verres de 250 ml',
      note: 'Règle empirique pour adultes en bonne santé, liquide des aliments compris. Ce n’est pas un avis médical.',
    },
  },
  hi: {
    title: 'रोज़ाना पानी की मात्रा का कैलकुलेटर',
    desc: 'वज़न, गतिविधि और गर्मी से रोज़ का मोटा लक्ष्य',
    short: 'दिन में कितना पानी',
    intro: [
      {
        h: 'प्रति किलो लगभग 33 मिली',
        p: 'यही आम मोटा नियम है: 60 किलो के वयस्क के लिए दिन में क़रीब दो लीटर। ज़्यादा भागदौड़, गर्मी में काम या कसरत — इनका हिसाब ऊपर से जुड़ता है, क्योंकि पसीने से जो जाता है उसे इस आधार के अलावा भरना पड़ता है।',
      },
      {
        h: 'खाने का पानी भी गिना जाता है',
        p: 'दिन भर के तरल में खाने से मिलने वाला पानी भी शामिल है। दाल-सब्ज़ी, फल और सब्ज़ियाँ काफ़ी पानी लाती हैं, और बदनामी के बावजूद चाय-कॉफ़ी भी। इसीलिए यह आंकड़ा कुल तरल का लक्ष्य है, अलग से पीने वाले गिलासों की गिनती नहीं।',
      },
      {
        h: 'प्यास अच्छा मार्गदर्शक है',
        p: 'स्वस्थ वयस्क के लिए प्यास लगने पर पीना और कभी-कभी पेशाब का रंग देख लेना, हिसाब जितना ही काम करता है। हल्का पीला ठीक है; गहरा हो तो और पीजिए। ज़रूरत से कहीं ज़्यादा पीना निर्दोष नहीं — यह ख़ून में सोडियम को पतला करता है, और दुर्लभ मामलों में ख़तरनाक हद तक।',
      },
    ],
    faq: [
      { q: 'क्या चाय और कॉफ़ी गिनी जाएँगी?', a: 'हाँ। कैफ़ीन का हल्का मूत्रवर्धक असर उस तरल को रद्द नहीं करता जिसमें वह आती है। सामान्य मात्रा में एक कप कॉफ़ी कुल मिलाकर पानी का फ़ायदा ही है।' },
      { q: 'दिल या गुर्दे की बीमारी हो तो?', a: 'तब इस आंकड़े को छोड़िए और डॉक्टर की तय की गई सीमा मानिए। कुछ स्थितियों में तरल सीमित करना पड़ता है, और सामान्य नियम वहाँ लागू नहीं होते।' },
      { q: 'क्या रोज़ आठ गिलास चाहिए?', a: 'उस संख्या के पीछे कोई मज़बूत प्रमाण नहीं है, और वह शरीर, जलवायु या गतिविधि के हिसाब से बदलती भी नहीं। वज़न पर आधारित यह अनुमान भी मोटा है, पर कम से कम आपके अनुसार बदलता तो है।' },
    ],
    ui: {
      section: 'आपका दिन', weight: 'वज़न (किग्रा)',
      activity: 'गतिविधि', actNormal: 'ज़्यादातर बैठे', actHigh: 'ज़्यादातर चलते-फिरते',
      weather: 'हालात', wNormal: 'सामान्य दिन', wHot: 'गर्मी', wExercise: 'कसरत वाला दिन',
      calc: 'गणना करें', result: 'रोज़ का लक्ष्य', glasses: '250 मिली के लगभग {n} गिलास',
      note: 'स्वस्थ वयस्कों के लिए मोटा नियम, खाने से मिलने वाला तरल शामिल। यह चिकित्सकीय सलाह नहीं है।',
    },
  },
  'zh-hans': {
    title: '每日饮水量计算器',
    desc: '按体重、活动量和天气估算每天的饮水目标',
    short: '一天该喝多少',
    intro: [
      {
        h: '每公斤大约 33 毫升',
        p: '这是常用的粗略标准：60 公斤的成年人一天差不多两升。活动多、在高温下工作或者运动，就要在这个基数上再加，因为出汗流失的部分得额外补回来。',
      },
      {
        h: '食物里的水也算',
        p: '一天的水分摄入包含食物里带的水。汤、水果和蔬菜含水很多，茶和咖啡也是——尽管名声不好。所以这个数字是总水分的目标，不是你必须另外单独喝下的杯数。',
      },
      {
        h: '口渴是个不错的向导',
        p: '对健康的成年人来说，渴了就喝、顺便看一眼尿的颜色，效果和算数差不多。淡稻草色就够；偏深说明该多喝。远远超出需要地猛灌并非无害——它会稀释血液中的钠，个别情况下相当危险。',
      },
    ],
    faq: [
      { q: '茶和咖啡算吗？', a: '算。咖啡因那点轻微的利尿作用，抵不过它所在的那杯水。在正常摄入量下，一杯咖啡净算下来是补水的。' },
      { q: '有心脏或肾脏疾病怎么办？', a: '请忽略这个数字，按医生给你定的量来。有些情况必须限制液体摄入，通用的粗略规则在那里不适用。' },
      { q: '一天真的需要八杯水吗？', a: '这个数字并没有扎实的证据支撑，也不会随体型、气候或活动量调整。按体重估算同样粗糙，但至少它会跟着你这个人变化。' },
    ],
    ui: {
      section: '你的一天', weight: '体重 (kg)',
      activity: '活动量', actNormal: '以坐为主', actHigh: '经常走动',
      weather: '状况', wNormal: '普通日子', wHot: '天气炎热', wExercise: '有运动',
      calc: '计算', result: '每日目标', glasses: '大约 {n} 杯（250 毫升）',
      note: '面向健康成年人的粗略标准，已含食物中的水分。不构成医疗建议。',
    },
  },
  'zh-hant': {
    title: '每日飲水量計算機',
    desc: '按體重、活動量和天氣估算每天的飲水目標',
    short: '一天該喝多少',
    intro: [
      {
        h: '每公斤大約 33 毫升',
        p: '這是常用的粗略標準：60 公斤的成年人一天差不多兩公升。活動多、在高溫下工作或者運動，就要在這個基數上再加，因為流汗失去的部分得額外補回來。',
      },
      {
        h: '食物裡的水也算',
        p: '一天的水分攝取包含食物裡帶的水。湯、水果和蔬菜含水很多，茶和咖啡也是——儘管名聲不好。所以這個數字是總水分的目標，不是你必須另外單獨喝下的杯數。',
      },
      {
        h: '口渴是個不錯的嚮導',
        p: '對健康的成年人來說，渴了就喝、順便看一眼尿的顏色，效果和算數差不多。淡稻草色就夠；偏深說明該多喝。遠遠超出需要地猛灌並非無害——它會稀釋血液中的鈉，個別情況下相當危險。',
      },
    ],
    faq: [
      { q: '茶和咖啡算嗎？', a: '算。咖啡因那點輕微的利尿作用，抵不過它所在的那杯水。在正常攝取量下，一杯咖啡淨算下來是補水的。' },
      { q: '有心臟或腎臟疾病怎麼辦？', a: '請忽略這個數字，按醫師給你定的量來。有些情況必須限制液體攝取，通用的粗略規則在那裡不適用。' },
      { q: '一天真的需要八杯水嗎？', a: '這個數字並沒有扎實的證據支撐，也不會隨體型、氣候或活動量調整。按體重估算同樣粗糙，但至少它會跟著你這個人變化。' },
    ],
    ui: {
      section: '你的一天', weight: '體重 (kg)',
      activity: '活動量', actNormal: '以坐為主', actHigh: '經常走動',
      weather: '狀況', wNormal: '普通日子', wHot: '天氣炎熱', wExercise: '有運動',
      calc: '計算', result: '每日目標', glasses: '大約 {n} 杯（250 毫升）',
      note: '面向健康成年人的粗略標準，已含食物中的水分。不構成醫療建議。',
    },
  },
};
