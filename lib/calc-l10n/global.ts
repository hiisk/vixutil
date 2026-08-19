import type { CalcTable } from './types.ts';

/**
 * 나라를 안 타는 계산 셋의 아홉 언어 문구 — BMI, 팁, 수면 사이클.
 *
 * 한국어판을 옮긴 것이 아니다. BMI는 기준선이 다르고(세계 30 / 아시아 25),
 * 팁은 한국어판 자체가 없다. 자세한 까닭은 lib/global-calc.ts 머리말.
 */

export const BMI: CalcTable = {
  en: {
    title: 'BMI calculator',
    desc: 'Body mass index from height and weight, on both the WHO and Asia-Pacific scales',
    short: 'BMI with healthy weight range',
    intro: [
      { h: 'BMI is weight divided by height squared', p: 'Nothing more. It was devised in the 1830s as a way to describe populations, not individuals, and it survives because it needs only two numbers that anyone can measure. What it gives you is a position on a distribution, not a verdict about a body.' },
      { h: 'The cut-offs are not the same everywhere', p: 'The WHO scale calls 25 overweight and 30 obese. The Asia-Pacific scale, used across much of East and South Asia, moves those to 23 and 25, because metabolic risk appears at a lower BMI in those populations. The same number reads differently depending on which scale is applied, so this page shows both.' },
      { h: 'It cannot tell muscle from fat', p: 'A trained athlete and a sedentary person of the same height and weight get the same BMI, and the reading is wrong for at least one of them. It also misses normal-weight obesity, where BMI sits inside the healthy band but body fat is high. Waist circumference catches what BMI misses and takes ten seconds to measure.' },
    ],
    faq: [
      { q: 'Which scale should I use?', a: 'Use the one your local health service uses. In Europe, the Americas and Africa that is the WHO scale, with overweight at 25 and obesity at 30. Across much of East and South Asia the Asia-Pacific scale applies, moving those to 23 and 25. Both readings are shown here so you can see how far apart they are.' },
      { q: 'Is BMI valid for athletes?', a: 'Not really. Muscle is denser than fat, so a heavily trained body often lands in the overweight or obese band on a healthy composition. If you train seriously, body-fat percentage or waist-to-height ratio describes you far better.' },
      { q: 'Does BMI work for children?', a: 'Not directly. Children are assessed on growth percentiles for their age and sex, because the healthy range shifts as they grow. Using an adult cut-off on a child gives a meaningless answer.' },
      { q: 'What about older adults?', a: 'The healthy band tends to sit slightly higher after about 65. Some loss of muscle is normal with age, and a BMI at the low end is associated with worse outcomes rather than better ones. Read the number as one input, not a target.' },
    ],
    ui: {
      section: 'Your measurements', height: 'Height (cm)', weight: 'Weight (kg)', calc: 'Calculate BMI',
      your: 'Your BMI', who: 'WHO scale', asia: 'Asia-Pacific scale', range: 'Healthy weight range',
      toHealthy: 'To the healthy upper limit', within: 'Already inside the range',
      under: 'Underweight', normal: 'Normal', over: 'Overweight',
      obese1: 'Obese class I', obese2: 'Obese class II', obese3: 'Obese class III',
      note: 'BMI describes a position on a distribution, not the state of one body.',
    },
  },
  es: {
    title: 'Calculadora de IMC',
    desc: 'Índice de masa corporal a partir de estatura y peso, en la escala de la OMS y en la asiático-pacífica',
    short: 'IMC con rango de peso saludable',
    intro: [
      { h: 'El IMC es el peso dividido por la estatura al cuadrado', p: 'Nada más. Se ideó en la década de 1830 para describir poblaciones, no individuos, y sobrevive porque solo necesita dos números que cualquiera puede medir. Lo que da es una posición en una distribución, no un veredicto sobre un cuerpo.' },
      { h: 'Los umbrales no son iguales en todas partes', p: 'La escala de la OMS llama sobrepeso a 25 y obesidad a 30. La escala asiático-pacífica, usada en buena parte de Asia oriental y meridional, los baja a 23 y 25, porque el riesgo metabólico aparece con un IMC menor en esas poblaciones. El mismo número se lee distinto según la escala, así que aquí se muestran las dos.' },
      { h: 'No distingue músculo de grasa', p: 'Una persona entrenada y otra sedentaria con la misma estatura y peso obtienen el mismo IMC, y la lectura es errónea al menos para una de las dos. Tampoco detecta la obesidad con peso normal, en la que el IMC cae dentro de la banda sana pero la grasa corporal es alta. El perímetro de cintura recoge lo que el IMC pierde y se mide en diez segundos.' },
    ],
    faq: [
      { q: '¿Qué escala debo usar?', a: 'La que use tu sistema sanitario. En Europa, América y África es la de la OMS, con sobrepeso en 25 y obesidad en 30. En buena parte de Asia oriental y meridional se aplica la asiático-pacífica, que los sitúa en 23 y 25. Aquí aparecen ambas lecturas para que veas cuánto se separan.' },
      { q: '¿Vale el IMC para deportistas?', a: 'No mucho. El músculo es más denso que la grasa, así que un cuerpo muy entrenado suele caer en sobrepeso u obesidad con una composición sana. Si entrenas en serio, el porcentaje de grasa o la relación cintura-estatura te describen mucho mejor.' },
      { q: '¿Sirve para niños?', a: 'No directamente. A los niños se les valora por percentiles de crecimiento según edad y sexo, porque el rango sano se desplaza mientras crecen. Aplicar un umbral de adulto a un niño da una respuesta sin sentido.' },
      { q: '¿Y en personas mayores?', a: 'La banda sana tiende a situarse algo más arriba a partir de los 65. Cierta pérdida de músculo es normal con la edad, y un IMC en la parte baja se asocia con peores resultados, no mejores. Léelo como un dato más, no como una meta.' },
    ],
    ui: {
      section: 'Tus medidas', height: 'Estatura (cm)', weight: 'Peso (kg)', calc: 'Calcular IMC',
      your: 'Tu IMC', who: 'Escala OMS', asia: 'Escala asiático-pacífica', range: 'Rango de peso saludable',
      toHealthy: 'Hasta el límite superior saludable', within: 'Ya dentro del rango',
      under: 'Bajo peso', normal: 'Normal', over: 'Sobrepeso',
      obese1: 'Obesidad grado I', obese2: 'Obesidad grado II', obese3: 'Obesidad grado III',
      note: 'El IMC describe una posición en una distribución, no el estado de un cuerpo.',
    },
  },
  'pt-br': {
    title: 'Calculadora de IMC',
    desc: 'Índice de massa corporal a partir de altura e peso, nas escalas da OMS e Ásia-Pacífico',
    short: 'IMC com faixa de peso saudável',
    intro: [
      { h: 'IMC é o peso dividido pela altura ao quadrado', p: 'Nada além disso. Foi criado na década de 1830 para descrever populações, não indivíduos, e sobrevive porque exige apenas dois números que qualquer pessoa consegue medir. O que ele entrega é uma posição numa distribuição, não um veredito sobre um corpo.' },
      { h: 'Os pontos de corte não são iguais em todo lugar', p: 'A escala da OMS chama 25 de sobrepeso e 30 de obesidade. A escala Ásia-Pacífico, usada em boa parte da Ásia oriental e meridional, move esses valores para 23 e 25, porque o risco metabólico aparece com IMC menor nessas populações. O mesmo número é lido de forma diferente conforme a escala, então esta página mostra as duas.' },
      { h: 'Ele não separa músculo de gordura', p: 'Uma pessoa treinada e outra sedentária com a mesma altura e peso recebem o mesmo IMC, e a leitura está errada para pelo menos uma delas. Também não detecta a obesidade com peso normal, em que o IMC fica dentro da faixa saudável mas a gordura corporal é alta. A circunferência da cintura pega o que o IMC perde e leva dez segundos para medir.' },
    ],
    faq: [
      { q: 'Qual escala devo usar?', a: 'A que o seu serviço de saúde usa. Na Europa, nas Américas e na África é a da OMS, com sobrepeso em 25 e obesidade em 30. Em boa parte da Ásia oriental e meridional vale a Ásia-Pacífico, que coloca esses limites em 23 e 25. As duas leituras aparecem aqui para você ver a distância entre elas.' },
      { q: 'O IMC vale para atletas?', a: 'Não muito. O músculo é mais denso que a gordura, então um corpo muito treinado costuma cair em sobrepeso ou obesidade com uma composição saudável. Quem treina a sério é melhor descrito pelo percentual de gordura ou pela relação cintura-altura.' },
      { q: 'Serve para crianças?', a: 'Não diretamente. Crianças são avaliadas por percentis de crescimento conforme idade e sexo, porque a faixa saudável se desloca enquanto elas crescem. Aplicar um corte de adulto a uma criança dá uma resposta sem sentido.' },
      { q: 'E para idosos?', a: 'A faixa saudável tende a ficar um pouco mais alta depois dos 65. Alguma perda de músculo é normal com a idade, e um IMC na parte baixa se associa a piores desfechos, não melhores. Leia o número como mais um dado, não como meta.' },
    ],
    ui: {
      section: 'Suas medidas', height: 'Altura (cm)', weight: 'Peso (kg)', calc: 'Calcular IMC',
      your: 'Seu IMC', who: 'Escala OMS', asia: 'Escala Ásia-Pacífico', range: 'Faixa de peso saudável',
      toHealthy: 'Até o limite superior saudável', within: 'Já dentro da faixa',
      under: 'Abaixo do peso', normal: 'Normal', over: 'Sobrepeso',
      obese1: 'Obesidade grau I', obese2: 'Obesidade grau II', obese3: 'Obesidade grau III',
      note: 'O IMC descreve uma posição numa distribuição, não o estado de um corpo.',
    },
  },
  ja: {
    title: 'BMI計算機',
    desc: '身長と体重からBMIを出し、WHO基準とアジア太平洋基準の両方で読みます',
    short: 'BMIと適正体重の範囲',
    intro: [
      { h: 'BMIは体重を身長の二乗で割った値', p: 'それ以上のものではありません。1830年代に集団を記述するために考え出されたもので、個人を診るためのものではなく、誰でも測れる二つの数字だけで済むから今も使われています。得られるのは分布の中での位置であって、その体についての判定ではありません。' },
      { h: '区切りの値は国によって違う', p: 'WHO基準では25以上を過体重、30以上を肥満とします。東アジア・南アジアの多くで使われるアジア太平洋基準ではそれが23と25に下がります。同じ人口でも代謝疾患の危険が低いBMIから現れるためです。同じ数値でもどちらの基準で読むかで意味が変わるので、このページでは両方を出します。' },
      { h: '筋肉と脂肪を区別できない', p: '同じ身長・体重なら、鍛えている人も座りがちな人も同じBMIになり、少なくとも一方の読みは誤りです。体重は正常なのに体脂肪が多い「隠れ肥満」も拾えません。腹囲はBMIが取りこぼすものを拾い、測るのに十秒しかかかりません。' },
    ],
    faq: [
      { q: 'どちらの基準を見ればいいですか？', a: 'お住まいの地域の医療機関が使う方です。欧州・南北アメリカ・アフリカではWHO基準（過体重25、肥満30）、東アジアと南アジアの多くではアジア太平洋基準（23と25）が使われます。ここでは両方の判定を並べて出しています。' },
      { q: 'アスリートにも当てはまりますか？', a: 'あまり当てはまりません。筋肉は脂肪より密度が高いので、よく鍛えた体は健康な組成でも過体重や肥満の区分に入ります。本格的に鍛えているなら、体脂肪率やウエスト身長比の方がはるかに実態を表します。' },
      { q: '子どもにも使えますか？', a: 'そのままでは使えません。子どもは年齢と性別ごとの成長曲線のパーセンタイルで評価します。成長に伴って適正範囲が動くためで、大人の基準値をそのまま当てはめると意味のない答えになります。' },
      { q: '高齢者ではどうですか？', a: '65歳を過ぎると適正の帯はやや上に寄ります。加齢に伴う筋肉の減少はある程度normalで、BMIが低い側にあることはむしろ良くない結果と結び付いています。目標値ではなく、判断材料の一つとして読んでください。' },
    ],
    ui: {
      section: '入力', height: '身長 (cm)', weight: '体重 (kg)', calc: 'BMIを計算',
      your: 'あなたのBMI', who: 'WHO基準', asia: 'アジア太平洋基準', range: '適正体重の範囲',
      toHealthy: '適正上限まで', within: 'すでに範囲内です',
      under: '低体重', normal: '普通', over: '過体重',
      obese1: '肥満（1度）', obese2: '肥満（2度）', obese3: '肥満（3度）',
      note: 'BMIは分布の中での位置を示すもので、一人の体の状態を示すものではありません。',
    },
  },
  de: {
    title: 'BMI-Rechner',
    desc: 'Body-Mass-Index aus Größe und Gewicht, auf der WHO-Skala und der asiatisch-pazifischen Skala',
    short: 'BMI mit gesundem Gewichtsbereich',
    intro: [
      { h: 'Der BMI ist Gewicht geteilt durch Größe im Quadrat', p: 'Mehr nicht. Er entstand in den 1830er-Jahren, um Bevölkerungen zu beschreiben, nicht Einzelne, und er hält sich, weil er nur zwei Zahlen braucht, die jeder messen kann. Was er liefert, ist eine Position in einer Verteilung, kein Urteil über einen Körper.' },
      { h: 'Die Grenzwerte gelten nicht überall gleich', p: 'Die WHO-Skala nennt 25 Übergewicht und 30 Adipositas. Die asiatisch-pazifische Skala, in weiten Teilen Ost- und Südasiens gebräuchlich, verschiebt beides auf 23 und 25, weil das Stoffwechselrisiko in diesen Bevölkerungen schon bei niedrigerem BMI auftritt. Dieselbe Zahl liest sich je nach Skala anders, deshalb zeigt diese Seite beide.' },
      { h: 'Er unterscheidet Muskel nicht von Fett', p: 'Eine trainierte und eine sitzende Person mit gleicher Größe und gleichem Gewicht bekommen denselben BMI, und für mindestens eine von beiden ist die Zahl falsch. Auch die normalgewichtige Adipositas, bei der der BMI im gesunden Bereich liegt und der Körperfettanteil hoch ist, entgeht ihm. Der Taillenumfang fängt auf, was der BMI verfehlt, und ist in zehn Sekunden gemessen.' },
    ],
    faq: [
      { q: 'Welche Skala soll ich nehmen?', a: 'Die, die Ihr Gesundheitssystem verwendet. In Europa, Amerika und Afrika ist das die WHO-Skala mit Übergewicht ab 25 und Adipositas ab 30. In weiten Teilen Ost- und Südasiens gilt die asiatisch-pazifische Skala mit 23 und 25. Beide Ablesungen stehen hier nebeneinander.' },
      { q: 'Gilt der BMI für Sportler?', a: 'Kaum. Muskeln sind dichter als Fett, deshalb landet ein stark trainierter Körper bei gesunder Zusammensetzung oft im Bereich Übergewicht oder Adipositas. Wer ernsthaft trainiert, ist mit Körperfettanteil oder Taille-Größe-Verhältnis weit besser beschrieben.' },
      { q: 'Funktioniert der BMI bei Kindern?', a: 'Nicht unmittelbar. Kinder werden nach Wachstumsperzentilen für Alter und Geschlecht beurteilt, weil sich der gesunde Bereich im Wachstum verschiebt. Ein Erwachsenengrenzwert auf ein Kind angewandt ergibt eine bedeutungslose Antwort.' },
      { q: 'Und bei älteren Menschen?', a: 'Der gesunde Bereich liegt ab etwa 65 tendenziell etwas höher. Ein gewisser Muskelverlust gehört zum Alter, und ein BMI am unteren Rand geht eher mit schlechteren als mit besseren Verläufen einher. Lesen Sie die Zahl als einen Hinweis, nicht als Ziel.' },
    ],
    ui: {
      section: 'Ihre Werte', height: 'Körpergröße (cm)', weight: 'Gewicht (kg)', calc: 'BMI berechnen',
      your: 'Ihr BMI', who: 'WHO-Skala', asia: 'Asiatisch-pazifische Skala', range: 'Gesunder Gewichtsbereich',
      toHealthy: 'Bis zur gesunden Obergrenze', within: 'Bereits im Bereich',
      under: 'Untergewicht', normal: 'Normalgewicht', over: 'Übergewicht',
      obese1: 'Adipositas Grad I', obese2: 'Adipositas Grad II', obese3: 'Adipositas Grad III',
      note: 'Der BMI beschreibt eine Position in einer Verteilung, nicht den Zustand eines Körpers.',
    },
  },
  fr: {
    title: 'Calculateur d’IMC',
    desc: 'Indice de masse corporelle à partir de la taille et du poids, sur l’échelle de l’OMS et l’échelle Asie-Pacifique',
    short: 'IMC avec plage de poids sain',
    intro: [
      { h: 'L’IMC, c’est le poids divisé par la taille au carré', p: 'Rien de plus. Il a été conçu dans les années 1830 pour décrire des populations, pas des individus, et il subsiste parce qu’il ne demande que deux nombres à la portée de tous. Ce qu’il donne, c’est une position dans une distribution, pas un verdict sur un corps.' },
      { h: 'Les seuils ne sont pas les mêmes partout', p: 'L’échelle de l’OMS place le surpoids à 25 et l’obésité à 30. L’échelle Asie-Pacifique, en usage dans une grande partie de l’Asie de l’Est et du Sud, les ramène à 23 et 25, car le risque métabolique y apparaît à un IMC plus bas. Le même nombre se lit donc autrement selon l’échelle, et cette page affiche les deux.' },
      { h: 'Il ne distingue pas le muscle de la graisse', p: 'Une personne entraînée et une personne sédentaire de même taille et même poids obtiennent le même IMC, et la lecture est fausse pour au moins l’une des deux. Il rate aussi l’obésité à poids normal, où l’IMC tombe dans la bande saine alors que la masse grasse est élevée. Le tour de taille rattrape ce que l’IMC laisse passer et se mesure en dix secondes.' },
    ],
    faq: [
      { q: 'Quelle échelle utiliser ?', a: 'Celle de votre système de santé. En Europe, dans les Amériques et en Afrique, c’est celle de l’OMS, surpoids à 25 et obésité à 30. Dans une grande partie de l’Asie de l’Est et du Sud, l’échelle Asie-Pacifique s’applique, à 23 et 25. Les deux lectures figurent ici côte à côte.' },
      { q: 'L’IMC vaut-il pour les sportifs ?', a: 'Peu. Le muscle est plus dense que la graisse : un corps très entraîné tombe souvent dans la zone surpoids ou obésité avec une composition saine. Si vous vous entraînez sérieusement, le taux de masse grasse ou le rapport tour de taille sur taille vous décrit bien mieux.' },
      { q: 'Est-il valable pour les enfants ?', a: 'Pas directement. Les enfants sont évalués sur des percentiles de croissance selon l’âge et le sexe, parce que la plage saine se déplace pendant la croissance. Appliquer un seuil d’adulte à un enfant donne une réponse sans signification.' },
      { q: 'Et chez les personnes âgées ?', a: 'La plage saine se situe plutôt un peu plus haut après 65 ans. Une certaine perte musculaire accompagne l’âge, et un IMC dans le bas de la fourchette est associé à de moins bons résultats plutôt qu’à de meilleurs. Lisez le chiffre comme un élément parmi d’autres, pas comme un objectif.' },
    ],
    ui: {
      section: 'Vos mesures', height: 'Taille (cm)', weight: 'Poids (kg)', calc: 'Calculer l’IMC',
      your: 'Votre IMC', who: 'Échelle OMS', asia: 'Échelle Asie-Pacifique', range: 'Plage de poids sain',
      toHealthy: 'Jusqu’à la limite haute saine', within: 'Déjà dans la plage',
      under: 'Insuffisance pondérale', normal: 'Normal', over: 'Surpoids',
      obese1: 'Obésité de classe I', obese2: 'Obésité de classe II', obese3: 'Obésité de classe III',
      note: 'L’IMC décrit une position dans une distribution, pas l’état d’un corps.',
    },
  },
  hi: {
    title: 'BMI कैलकुलेटर',
    desc: 'क़द और वज़न से बॉडी मास इंडेक्स — WHO और एशिया-प्रशांत, दोनों पैमानों पर',
    short: 'BMI और स्वस्थ वज़न सीमा',
    intro: [
      { h: 'BMI यानी वज़न बटा क़द का वर्ग', p: 'इससे अधिक कुछ नहीं। इसे 1830 के दशक में आबादियों का वर्णन करने के लिए बनाया गया था, व्यक्तियों का नहीं, और यह आज तक टिका है क्योंकि इसके लिए बस दो संख्याएँ चाहिए जो कोई भी नाप सकता है। यह आपको एक वितरण में स्थान बताता है, किसी शरीर पर फ़ैसला नहीं।' },
      { h: 'सीमा-रेखाएँ हर जगह एक जैसी नहीं हैं', p: 'WHO के पैमाने पर 25 अधिक वज़न और 30 मोटापा कहलाता है। पूर्वी और दक्षिण एशिया के बड़े हिस्से में प्रचलित एशिया-प्रशांत पैमाने पर ये 23 और 25 हो जाते हैं, क्योंकि इन आबादियों में चयापचय का जोखिम कम BMI पर ही दिखने लगता है। एक ही संख्या पैमाने के अनुसार अलग पढ़ी जाती है, इसलिए यह पृष्ठ दोनों दिखाता है।' },
      { h: 'यह मांसपेशी और चर्बी में अंतर नहीं कर पाता', p: 'एक ही क़द और वज़न के प्रशिक्षित और निष्क्रिय व्यक्ति का BMI एक जैसा आता है, और कम से कम एक के लिए वह पढ़त ग़लत है। सामान्य वज़न वाला मोटापा भी इससे छूट जाता है, जिसमें BMI स्वस्थ पट्टी में रहता है पर शरीर की चर्बी अधिक होती है। कमर का घेरा वही पकड़ता है जो BMI छोड़ देता है, और नापने में दस सेकंड लगते हैं।' },
    ],
    faq: [
      { q: 'मुझे कौन सा पैमाना देखना चाहिए?', a: 'वही जो आपकी स्वास्थ्य सेवा उपयोग करती है। यूरोप, अमेरिका और अफ़्रीका में WHO का पैमाना चलता है — 25 पर अधिक वज़न, 30 पर मोटापा। पूर्वी और दक्षिण एशिया के बड़े हिस्से में एशिया-प्रशांत पैमाना लागू होता है, जहाँ ये 23 और 25 हैं। यहाँ दोनों पढ़तें साथ दिखाई गई हैं।' },
      { q: 'क्या BMI खिलाड़ियों पर लागू होता है?', a: 'बहुत कम। मांसपेशी चर्बी से सघन होती है, इसलिए ख़ूब प्रशिक्षित शरीर स्वस्थ संरचना के बावजूद अधिक वज़न या मोटापे की श्रेणी में गिर जाता है। यदि आप गंभीरता से प्रशिक्षण करते हैं तो शरीर-चर्बी प्रतिशत या कमर-क़द अनुपात आपको कहीं बेहतर बताता है।' },
      { q: 'क्या यह बच्चों के लिए काम करता है?', a: 'सीधे नहीं। बच्चों का आकलन आयु और लिंग के अनुसार वृद्धि पर्सेंटाइल से होता है, क्योंकि बढ़ने के साथ स्वस्थ दायरा खिसकता रहता है। बच्चे पर वयस्क की सीमा लगाने से उत्तर निरर्थक हो जाता है।' },
      { q: 'और बुज़ुर्गों के लिए?', a: 'लगभग 65 के बाद स्वस्थ पट्टी थोड़ी ऊपर खिसक जाती है। उम्र के साथ कुछ मांसपेशी घटना सामान्य है, और निचले सिरे का BMI बेहतर नहीं बल्कि ख़राब परिणामों से जुड़ा पाया गया है। इस संख्या को एक संकेत मानें, लक्ष्य नहीं।' },
    ],
    ui: {
      section: 'आपके माप', height: 'क़द (सेमी)', weight: 'वज़न (किग्रा)', calc: 'BMI निकालें',
      your: 'आपका BMI', who: 'WHO पैमाना', asia: 'एशिया-प्रशांत पैमाना', range: 'स्वस्थ वज़न सीमा',
      toHealthy: 'स्वस्थ ऊपरी सीमा तक', within: 'पहले से सीमा के भीतर',
      under: 'कम वज़न', normal: 'सामान्य', over: 'अधिक वज़न',
      obese1: 'मोटापा श्रेणी I', obese2: 'मोटापा श्रेणी II', obese3: 'मोटापा श्रेणी III',
      note: 'BMI एक वितरण में स्थान बताता है, किसी एक शरीर की स्थिति नहीं।',
    },
  },
  'zh-hans': {
    title: 'BMI 计算器',
    desc: '由身高体重计算体质指数，同时给出世界卫生组织标准与亚太标准',
    short: 'BMI 与健康体重区间',
    intro: [
      { h: 'BMI 就是体重除以身高的平方', p: '仅此而已。它是1830年代为描述人群而设计的，不是为诊断个人，之所以沿用至今，是因为只需要两个人人都能量的数字。它给出的是你在分布中的位置，而不是对一具身体的判决。' },
      { h: '分界线各地并不相同', p: '世界卫生组织标准把 25 称为超重、30 称为肥胖。在东亚与南亚广泛使用的亚太标准把这两条线移到 23 和 25，因为这些人群在更低的 BMI 上就出现代谢风险。同一个数字，按哪套标准读，含义就不同，所以本页两套都给。' },
      { h: '它分不清肌肉和脂肪', p: '身高体重相同的运动者与久坐者会得到同一个 BMI，而这个读数至少对其中一人是错的。它也发现不了「正常体重肥胖」——BMI 落在健康区间内，体脂却很高。腰围能补上 BMI 漏掉的部分，量一次只要十秒。' },
    ],
    faq: [
      { q: '我该看哪一套标准？', a: '看你所在地医疗体系使用的那一套。欧洲、美洲与非洲用世界卫生组织标准，超重 25、肥胖 30；东亚与南亚的大部分地区用亚太标准，即 23 与 25。本页把两种判定并排给出，你能看到两者相差多少。' },
      { q: 'BMI 适用于运动员吗？', a: '不太适用。肌肉密度高于脂肪，所以训练充分的身体在成分健康的情况下也常落入超重甚至肥胖区间。如果你认真训练，体脂率或腰围身高比能更准确地描述你。' },
      { q: '儿童能用吗？', a: '不能直接用。儿童按年龄与性别的生长曲线百分位评估，因为健康区间会随成长移动。把成人的分界线套在儿童身上，得到的答案没有意义。' },
      { q: '老年人呢？', a: '大约 65 岁之后，健康区间往往略微上移。随年龄流失一部分肌肉是正常的，而处在低端的 BMI 反而与更差的结局相关。请把这个数字当作参考之一，而不是目标。' },
    ],
    ui: {
      section: '你的数据', height: '身高（厘米）', weight: '体重（公斤）', calc: '计算 BMI',
      your: '你的 BMI', who: '世卫标准', asia: '亚太标准', range: '健康体重区间',
      toHealthy: '距健康上限', within: '已在区间内',
      under: '偏瘦', normal: '正常', over: '超重',
      obese1: '肥胖 I 级', obese2: '肥胖 II 级', obese3: '肥胖 III 级',
      note: 'BMI 描述的是在分布中的位置，不是一具身体的状态。',
    },
  },
  'zh-hant': {
    title: 'BMI 計算器',
    desc: '由身高體重計算體質指數，同時給出世界衛生組織標準與亞太標準',
    short: 'BMI 與健康體重區間',
    intro: [
      { h: 'BMI 就是體重除以身高的平方', p: '僅此而已。它是1830年代為描述人群而設計的，不是為診斷個人，之所以沿用至今，是因為只需要兩個人人都能量的數字。它給出的是你在分布中的位置，而不是對一具身體的判決。' },
      { h: '分界線各地並不相同', p: '世界衛生組織標準把 25 稱為過重、30 稱為肥胖。在東亞與南亞廣泛使用的亞太標準把這兩條線移到 23 和 25，因為這些人群在更低的 BMI 上就出現代謝風險。同一個數字，按哪套標準讀，含義就不同，所以本頁兩套都給。' },
      { h: '它分不清肌肉和脂肪', p: '身高體重相同的運動者與久坐者會得到同一個 BMI，而這個讀數至少對其中一人是錯的。它也發現不了「正常體重肥胖」——BMI 落在健康區間內，體脂卻很高。腰圍能補上 BMI 漏掉的部分，量一次只要十秒。' },
    ],
    faq: [
      { q: '我該看哪一套標準？', a: '看你所在地醫療體系使用的那一套。歐洲、美洲與非洲用世界衛生組織標準，過重 25、肥胖 30；東亞與南亞的大部分地區用亞太標準，即 23 與 25。本頁把兩種判定並排給出，你能看到兩者相差多少。' },
      { q: 'BMI 適用於運動員嗎？', a: '不太適用。肌肉密度高於脂肪，所以訓練充分的身體在成分健康的情況下也常落入過重甚至肥胖區間。如果你認真訓練，體脂率或腰圍身高比能更準確地描述你。' },
      { q: '兒童能用嗎？', a: '不能直接用。兒童按年齡與性別的生長曲線百分位評估，因為健康區間會隨成長移動。把成人的分界線套在兒童身上，得到的答案沒有意義。' },
      { q: '年長者呢？', a: '大約 65 歲之後，健康區間往往略微上移。隨年齡流失一部分肌肉是正常的，而處在低端的 BMI 反而與更差的結果相關。請把這個數字當作參考之一，而不是目標。' },
    ],
    ui: {
      section: '你的資料', height: '身高（公分）', weight: '體重（公斤）', calc: '計算 BMI',
      your: '你的 BMI', who: '世衛標準', asia: '亞太標準', range: '健康體重區間',
      toHealthy: '距健康上限', within: '已在區間內',
      under: '過輕', normal: '正常', over: '過重',
      obese1: '肥胖 I 級', obese2: '肥胖 II 級', obese3: '肥胖 III 級',
      note: 'BMI 描述的是在分布中的位置，不是一具身體的狀態。',
    },
  },
};
