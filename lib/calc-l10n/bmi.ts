import type { CalcTable } from './types.ts';

/**
 * BMI 계산기.
 *
 * 한국어판은 대한비만학회 2022 기준을 쓴다 — 정상 18.5~23, 23부터 과체중,
 * 25부터 비만. 이걸 그대로 옮기면 안 된다. WHO 국제 기준은 정상 18.5~25,
 * 25부터 과체중, 30부터 비만이라, 같은 키·몸무게가 독일어 화면에서는 "비만"이
 * 되고 실제 독일 진료 기준으로는 정상인 일이 생긴다. 번역이 곧 오진이 된다.
 *
 * 그래서 다국어판은 **WHO 국제 기준**을 쓰고, 아시아·태평양 기준이 더 낮다는
 * 사실을 본문에서 따로 설명한다. 일본·중국·인도 독자에게는 그쪽이 실제로
 * 쓰이는 기준이라 감추면 안 되고, 그렇다고 기본값으로 삼으면 유럽·남미 독자가
 * 틀린 등급을 받는다. 양쪽을 다 적어 두는 것이 유일하게 안 틀리는 길이다.
 */
export const BMI: CalcTable = {
  en: {
    title: 'BMI calculator',
    desc: 'Body mass index and healthy weight range, WHO classification',
    short: 'Height and weight → BMI + healthy range',
    intro: [
      {
        h: 'How it is worked out',
        p: 'Body mass index is weight in kilograms divided by height in metres squared. Someone 175 cm and 70 kg gets 70 ÷ 1.75², about 22.9. The bands shown here are the WHO international classification: under 18.5 underweight, 18.5–25 normal, 25–30 overweight, 30 and above obese.',
      },
      {
        h: 'Asian cut-offs are lower',
        p: 'The WHO also publishes Asia-Pacific cut-offs, used across much of East and South Asia, where overweight starts at 23 and obesity at 25 rather than 25 and 30. The reason is that at the same BMI, people of Asian descent tend to carry more visceral fat and face higher metabolic risk. If a calculator in Korea or Japan gave you a stricter grade than this one, that is why — neither is wrong, they answer slightly different questions.',
      },
      {
        h: 'What BMI cannot see',
        p: 'BMI knows your height and your weight and nothing else. It cannot tell muscle from fat, so a trained athlete often lands in the overweight band, and it says nothing about where fat sits — which matters more for health than the total. Read it as a rough screen, not a diagnosis.',
      },
    ],
    faq: [
      { q: 'Which standard does this use?', a: 'The WHO international classification: 18.5, 25, 30, 35 and 40 as the boundaries. Asia-Pacific guidelines use 23 and 25 instead of 25 and 30; the section above explains the difference.' },
      { q: 'Is BMI useful for athletes?', a: 'Not very. Muscle is denser than fat, so a lean, muscular person can score in the overweight range while carrying little fat. Body fat percentage or waist measurement tells you more.' },
      { q: 'What is the healthy weight range shown?', a: 'The weight span that puts your BMI between 18.5 and 24.9 at your height. It is a range, not a target — where you sit within it is a matter of build and preference.' },
    ],
    ui: {
      body: 'Your measurements', height: 'Height (cm)', weight: 'Weight (kg)', sex: 'Sex',
      male: 'Male', female: 'Female', calc: 'Calculate', bmiLabel: 'BMI',
      range: 'Healthy weight range', table: 'WHO classification', ideal: 'Normal weight',
      b0: 'Underweight', b1: 'Normal', b2: 'Overweight', b3: 'Obese class I', b4: 'Obese class II', b5: 'Obese class III',
      s0: 'Check nutrition', s1: 'Healthy weight range', s2: 'Worth starting to manage',
      s3: 'Lifestyle changes advised', s4: 'Medical support advised', s5: 'Immediate medical care advised',
    },
  },
  es: {
    title: 'Calculadora de IMC',
    desc: 'Índice de masa corporal y rango de peso saludable, clasificación de la OMS',
    short: 'Altura y peso → IMC + rango saludable',
    intro: [
      {
        h: 'Cómo se calcula',
        p: 'El índice de masa corporal es el peso en kilos dividido por la altura en metros al cuadrado. Alguien de 175 cm y 70 kg obtiene 70 ÷ 1,75², unos 22,9. Los tramos que se muestran son la clasificación internacional de la OMS: por debajo de 18,5 bajo peso, 18,5–25 normal, 25–30 sobrepeso, 30 o más obesidad.',
      },
      {
        h: 'Los umbrales asiáticos son más bajos',
        p: 'La OMS publica además unos umbrales para Asia-Pacífico, usados en buena parte del este y el sur de Asia, donde el sobrepeso empieza en 23 y la obesidad en 25 en vez de 25 y 30. El motivo es que, con el mismo IMC, las personas de origen asiático suelen acumular más grasa visceral y tienen mayor riesgo metabólico. Si una calculadora coreana o japonesa te dio un grado más severo que esta, es por eso: ninguna está equivocada, responden a preguntas ligeramente distintas.',
      },
      {
        h: 'Lo que el IMC no ve',
        p: 'El IMC solo conoce tu altura y tu peso. No distingue músculo de grasa, así que un atleta entrenado suele caer en el tramo de sobrepeso, y no dice nada de dónde está la grasa, que para la salud importa más que el total. Léelo como un cribado grueso, no como un diagnóstico.',
      },
    ],
    faq: [
      { q: '¿Qué estándar usa?', a: 'La clasificación internacional de la OMS: 18,5, 25, 30, 35 y 40 como límites. Las guías de Asia-Pacífico usan 23 y 25 en lugar de 25 y 30; la sección de arriba explica la diferencia.' },
      { q: '¿Sirve el IMC para deportistas?', a: 'Poco. El músculo es más denso que la grasa, así que una persona magra y musculada puede salir en sobrepeso con muy poca grasa. El porcentaje de grasa corporal o el perímetro de cintura dicen más.' },
      { q: '¿Qué es el rango de peso saludable?', a: 'El intervalo de peso que sitúa tu IMC entre 18,5 y 24,9 para tu altura. Es un rango, no un objetivo: dónde caes dentro de él depende de tu complexión y tus preferencias.' },
    ],
    ui: {
      body: 'Tus medidas', height: 'Altura (cm)', weight: 'Peso (kg)', sex: 'Sexo',
      male: 'Hombre', female: 'Mujer', calc: 'Calcular', bmiLabel: 'IMC',
      range: 'Rango de peso saludable', table: 'Clasificación de la OMS', ideal: 'Peso normal',
      b0: 'Bajo peso', b1: 'Normal', b2: 'Sobrepeso', b3: 'Obesidad grado I', b4: 'Obesidad grado II', b5: 'Obesidad grado III',
      s0: 'Revisa la alimentación', s1: 'Rango de peso saludable', s2: 'Conviene empezar a cuidarlo',
      s3: 'Se aconsejan cambios de hábitos', s4: 'Se aconseja apoyo médico', s5: 'Se aconseja atención médica inmediata',
    },
  },
  'pt-br': {
    title: 'Calculadora de IMC',
    desc: 'Índice de massa corporal e faixa de peso saudável, classificação da OMS',
    short: 'Altura e peso → IMC + faixa saudável',
    intro: [
      {
        h: 'Como é calculado',
        p: 'O índice de massa corporal é o peso em quilos dividido pela altura em metros ao quadrado. Alguém de 175 cm e 70 kg fica com 70 ÷ 1,75², cerca de 22,9. As faixas mostradas são a classificação internacional da OMS: abaixo de 18,5 baixo peso, 18,5–25 normal, 25–30 sobrepeso, 30 ou mais obesidade.',
      },
      {
        h: 'Os limites asiáticos são mais baixos',
        p: 'A OMS também publica limites para a Ásia-Pacífico, usados em boa parte do leste e do sul da Ásia, onde o sobrepeso começa em 23 e a obesidade em 25, e não em 25 e 30. O motivo é que, com o mesmo IMC, pessoas de origem asiática costumam acumular mais gordura visceral e correm risco metabólico maior. Se uma calculadora coreana ou japonesa te deu um grau mais severo que esta, é por isso — nenhuma está errada, elas respondem a perguntas um pouco diferentes.',
      },
      {
        h: 'O que o IMC não enxerga',
        p: 'O IMC conhece só a sua altura e o seu peso. Não separa músculo de gordura, então um atleta treinado costuma cair na faixa de sobrepeso, e nada diz sobre onde a gordura está — o que importa mais para a saúde do que o total. Leia como uma triagem grosseira, não como diagnóstico.',
      },
    ],
    faq: [
      { q: 'Qual padrão é usado aqui?', a: 'A classificação internacional da OMS: 18,5, 25, 30, 35 e 40 como limites. As diretrizes da Ásia-Pacífico usam 23 e 25 no lugar de 25 e 30; a seção acima explica a diferença.' },
      { q: 'O IMC serve para atletas?', a: 'Pouco. Músculo é mais denso que gordura, então alguém magro e musculoso pode aparecer com sobrepeso tendo pouquíssima gordura. Percentual de gordura ou circunferência da cintura dizem mais.' },
      { q: 'O que é a faixa de peso saudável?', a: 'O intervalo de peso que coloca seu IMC entre 18,5 e 24,9 na sua altura. É uma faixa, não uma meta — onde você fica dentro dela depende da compleição e da preferência.' },
    ],
    ui: {
      body: 'Suas medidas', height: 'Altura (cm)', weight: 'Peso (kg)', sex: 'Sexo',
      male: 'Homem', female: 'Mulher', calc: 'Calcular', bmiLabel: 'IMC',
      range: 'Faixa de peso saudável', table: 'Classificação da OMS', ideal: 'Peso normal',
      b0: 'Baixo peso', b1: 'Normal', b2: 'Sobrepeso', b3: 'Obesidade grau I', b4: 'Obesidade grau II', b5: 'Obesidade grau III',
      s0: 'Vale checar a alimentação', s1: 'Faixa de peso saudável', s2: 'Bom momento para começar a cuidar',
      s3: 'Mudanças de hábito recomendadas', s4: 'Acompanhamento médico recomendado', s5: 'Atendimento médico imediato recomendado',
    },
  },
  ja: {
    title: 'BMI計算機',
    desc: '体格指数と健康体重の範囲（WHO基準）',
    short: '身長と体重 → BMIと健康体重',
    intro: [
      {
        h: '計算のしかた',
        p: 'BMIは体重(kg)を身長(m)の二乗で割った値です。175cm・70kgなら 70 ÷ 1.75² で約22.9。ここで示す区分はWHOの国際基準で、18.5未満が低体重、18.5〜25が普通、25〜30が過体重、30以上が肥満です。',
      },
      {
        h: 'アジア基準はもっと低い',
        p: 'WHOはアジア太平洋向けの基準も出していて、東アジア・南アジアの多くで使われています。そちらでは過体重が23から、肥満が25からで、25と30ではありません。同じBMIでもアジア系は内臓脂肪が多く代謝リスクが高い傾向があるためです。日本の健診でこの計算機より厳しい判定が出るのはそのためで、どちらかが間違っているわけではなく、少し違う問いに答えています。',
      },
      {
        h: 'BMIに見えないもの',
        p: 'BMIが知っているのは身長と体重だけです。筋肉と脂肪を区別できないので、鍛えている人ほど過体重の側に出ます。脂肪がどこに付いているかも分かりませんが、健康のうえでは総量よりそちらが効きます。おおまかなふるい分けとして読んでください。',
      },
    ],
    faq: [
      { q: 'どの基準を使っていますか。', a: 'WHOの国際基準です。区切りは18.5・25・30・35・40。アジア太平洋の指針は25と30の代わりに23と25を使います — 上の節に違いを書きました。' },
      { q: 'アスリートにも当てはまりますか。', a: 'あまり当てはまりません。筋肉は脂肪より重いので、絞れていて筋肉のある人ほど過体重の範囲に入ります。体脂肪率やウエスト周囲のほうがよく分かります。' },
      { q: '健康体重の範囲とは何ですか。', a: 'その身長でBMIが18.5〜24.9に収まる体重の幅です。目標値ではなく幅なので、その中のどこにいるかは体つきや好みの問題です。' },
    ],
    ui: {
      body: '身体情報', height: '身長 (cm)', weight: '体重 (kg)', sex: '性別',
      male: '男性', female: '女性', calc: '計算する', bmiLabel: 'BMI',
      range: '健康体重の範囲', table: 'WHO基準', ideal: '普通体重',
      b0: '低体重', b1: '普通', b2: '過体重', b3: '肥満（1度）', b4: '肥満（2度）', b5: '肥満（3度）',
      s0: '栄養状態の確認を', s1: '健康的な体重の範囲', s2: '体重管理を始めるとよい時期',
      s3: '生活習慣の見直しを', s4: '医療的な管理をすすめます', s5: 'すぐに医療機関へ',
    },
  },
  de: {
    title: 'BMI-Rechner',
    desc: 'Body-Mass-Index und gesunder Gewichtsbereich nach WHO-Einteilung',
    short: 'Größe und Gewicht → BMI + gesunder Bereich',
    intro: [
      {
        h: 'So wird gerechnet',
        p: 'Der Body-Mass-Index ist das Gewicht in Kilogramm geteilt durch die Größe in Metern zum Quadrat. Bei 175 cm und 70 kg sind das 70 ÷ 1,75², also rund 22,9. Die hier gezeigten Bereiche sind die internationale WHO-Einteilung: unter 18,5 Untergewicht, 18,5–25 Normalgewicht, 25–30 Übergewicht, ab 30 Adipositas.',
      },
      {
        h: 'Asiatische Grenzwerte liegen niedriger',
        p: 'Die WHO veröffentlicht zusätzlich Grenzwerte für den asiatisch-pazifischen Raum, die in weiten Teilen Ost- und Südasiens gelten. Dort beginnt Übergewicht bei 23 und Adipositas bei 25 statt bei 25 und 30. Grund ist, dass Menschen asiatischer Herkunft bei gleichem BMI im Schnitt mehr viszerales Fett tragen und ein höheres Stoffwechselrisiko haben. Wenn ein Rechner in Korea oder Japan strenger urteilt als dieser, liegt es daran — keiner von beiden ist falsch, sie beantworten leicht verschiedene Fragen.',
      },
      {
        h: 'Was der BMI nicht sieht',
        p: 'Der BMI kennt nur Größe und Gewicht. Muskeln und Fett kann er nicht unterscheiden, deshalb landen trainierte Menschen oft im Übergewichtsbereich. Und er sagt nichts darüber, wo das Fett sitzt — was für die Gesundheit mehr zählt als die Gesamtmenge. Lies ihn als grobes Sieb, nicht als Diagnose.',
      },
    ],
    faq: [
      { q: 'Welcher Standard wird verwendet?', a: 'Die internationale WHO-Einteilung mit den Grenzen 18,5, 25, 30, 35 und 40. Die asiatisch-pazifischen Leitlinien nutzen stattdessen 23 und 25 — der Abschnitt oben erklärt den Unterschied.' },
      { q: 'Taugt der BMI für Sportler?', a: 'Kaum. Muskeln sind dichter als Fett, deshalb kann eine schlanke, muskulöse Person im Übergewichtsbereich landen und trotzdem wenig Fett haben. Körperfettanteil oder Bauchumfang sagen mehr.' },
      { q: 'Was ist der gesunde Gewichtsbereich?', a: 'Die Gewichtsspanne, bei der dein BMI bei deiner Größe zwischen 18,5 und 24,9 liegt. Ein Bereich, kein Zielwert — wo genau du darin liegst, ist eine Frage von Statur und Vorliebe.' },
    ],
    ui: {
      body: 'Deine Angaben', height: 'Größe (cm)', weight: 'Gewicht (kg)', sex: 'Geschlecht',
      male: 'Männlich', female: 'Weiblich', calc: 'Berechnen', bmiLabel: 'BMI',
      range: 'Gesunder Gewichtsbereich', table: 'WHO-Einteilung', ideal: 'Normalgewicht',
      b0: 'Untergewicht', b1: 'Normalgewicht', b2: 'Übergewicht', b3: 'Adipositas Grad I', b4: 'Adipositas Grad II', b5: 'Adipositas Grad III',
      s0: 'Ernährung prüfen', s1: 'Gesunder Gewichtsbereich', s2: 'Guter Zeitpunkt gegenzusteuern',
      s3: 'Lebensstil anpassen', s4: 'Ärztliche Begleitung ratsam', s5: 'Umgehend ärztliche Hilfe',
    },
  },
  fr: {
    title: 'Calculateur d’IMC',
    desc: 'Indice de masse corporelle et fourchette de poids santé, classification OMS',
    short: 'Taille et poids → IMC + fourchette santé',
    intro: [
      {
        h: 'Le calcul',
        p: 'L’indice de masse corporelle est le poids en kilos divisé par la taille en mètres au carré. Pour 175 cm et 70 kg : 70 ÷ 1,75², soit environ 22,9. Les tranches affichées sont la classification internationale de l’OMS : moins de 18,5 insuffisance pondérale, 18,5–25 normal, 25–30 surpoids, 30 et plus obésité.',
      },
      {
        h: 'Les seuils asiatiques sont plus bas',
        p: 'L’OMS publie aussi des seuils Asie-Pacifique, appliqués dans une grande partie de l’Asie de l’Est et du Sud : le surpoids y commence à 23 et l’obésité à 25, au lieu de 25 et 30. La raison est qu’à IMC égal, les personnes d’origine asiatique portent en moyenne plus de graisse viscérale et présentent un risque métabolique plus élevé. Si un calculateur coréen ou japonais vous a donné un classement plus sévère, c’est pour cela — aucun des deux n’a tort, ils répondent à des questions un peu différentes.',
      },
      {
        h: 'Ce que l’IMC ne voit pas',
        p: 'L’IMC ne connaît que votre taille et votre poids. Il ne distingue pas le muscle de la graisse : un sportif entraîné se retrouve souvent en surpoids. Et il ne dit rien de l’endroit où se loge la graisse, ce qui compte davantage pour la santé que la quantité totale. À lire comme un filtre grossier, pas comme un diagnostic.',
      },
    ],
    faq: [
      { q: 'Quel référentiel est utilisé ?', a: 'La classification internationale de l’OMS, avec les bornes 18,5, 25, 30, 35 et 40. Les recommandations Asie-Pacifique utilisent 23 et 25 à la place de 25 et 30 ; la section ci-dessus explique l’écart.' },
      { q: 'L’IMC vaut-il pour les sportifs ?', a: 'Peu. Le muscle est plus dense que la graisse : une personne sèche et musclée peut se retrouver en surpoids avec très peu de gras. Le taux de masse grasse ou le tour de taille sont plus parlants.' },
      { q: 'Qu’est-ce que la fourchette de poids santé ?', a: 'L’intervalle de poids qui place votre IMC entre 18,5 et 24,9 pour votre taille. C’est une fourchette et non une cible — où l’on se situe dedans relève de la morphologie et du choix personnel.' },
    ],
    ui: {
      body: 'Vos mesures', height: 'Taille (cm)', weight: 'Poids (kg)', sex: 'Sexe',
      male: 'Homme', female: 'Femme', calc: 'Calculer', bmiLabel: 'IMC',
      range: 'Fourchette de poids santé', table: 'Classification OMS', ideal: 'Poids normal',
      b0: 'Insuffisance pondérale', b1: 'Normal', b2: 'Surpoids', b3: 'Obésité de classe I', b4: 'Obésité de classe II', b5: 'Obésité de classe III',
      s0: 'Vérifier l’alimentation', s1: 'Fourchette de poids santé', s2: 'Bon moment pour s’en occuper',
      s3: 'Changements d’habitudes conseillés', s4: 'Suivi médical conseillé', s5: 'Prise en charge médicale immédiate',
    },
  },
  hi: {
    title: 'BMI कैलकुलेटर',
    desc: 'बॉडी मास इंडेक्स और स्वस्थ वज़न की सीमा, WHO वर्गीकरण',
    short: 'क़द और वज़न → BMI + स्वस्थ सीमा',
    intro: [
      {
        h: 'गणना कैसे होती है',
        p: 'बॉडी मास इंडेक्स यानी किलो में वज़न को मीटर में क़द के वर्ग से भाग देना। 175 सेमी और 70 किलो वाले के लिए 70 ÷ 1.75², यानी लगभग 22.9। यहाँ दिखाए गए दायरे WHO का अंतरराष्ट्रीय वर्गीकरण हैं: 18.5 से कम कम वज़न, 18.5–25 सामान्य, 25–30 अधिक वज़न, 30 और उससे ऊपर मोटापा।',
      },
      {
        h: 'एशियाई सीमाएँ नीची हैं',
        p: 'WHO एशिया-प्रशांत के लिए अलग सीमाएँ भी देता है, जो पूर्वी और दक्षिण एशिया के बड़े हिस्से में — भारत सहित — चलती हैं। वहाँ अधिक वज़न 23 से और मोटापा 25 से शुरू होता है, 25 और 30 से नहीं। वजह यह है कि एक ही BMI पर एशियाई मूल के लोगों में आंत की चर्बी अधिक होती है और चयापचय का जोखिम ज़्यादा। अगर किसी भारतीय या कोरियाई कैलकुलेटर ने इससे सख़्त श्रेणी बताई हो, तो कारण यही है — दोनों में से कोई ग़लत नहीं, दोनों थोड़े अलग सवाल का जवाब देते हैं।',
      },
      {
        h: 'BMI क्या नहीं देख पाता',
        p: 'BMI को सिर्फ़ आपका क़द और वज़न पता है। वह मांसपेशी और चर्बी में फ़र्क़ नहीं कर सकता, इसलिए कसरती शरीर अक्सर अधिक वज़न वाले दायरे में आ जाता है। और चर्बी कहाँ जमी है, यह भी वह नहीं बताता — सेहत के लिए कुल मात्रा से ज़्यादा वही मायने रखता है। इसे मोटी छलनी की तरह पढ़िए, निदान की तरह नहीं।',
      },
    ],
    faq: [
      { q: 'यहाँ कौन-सा मानक इस्तेमाल हुआ है?', a: 'WHO का अंतरराष्ट्रीय वर्गीकरण — 18.5, 25, 30, 35 और 40 की सीमाएँ। एशिया-प्रशांत दिशानिर्देश 25 और 30 की जगह 23 और 25 लेते हैं; ऊपर वाले हिस्से में अंतर समझाया गया है।' },
      { q: 'क्या खिलाड़ियों के लिए BMI काम का है?', a: 'ज़्यादा नहीं। मांसपेशी चर्बी से घनी होती है, इसलिए दुबला-कसरती व्यक्ति भी अधिक वज़न वाले दायरे में आ सकता है जबकि चर्बी कम हो। शरीर में वसा का प्रतिशत या कमर का घेरा ज़्यादा बताता है।' },
      { q: 'स्वस्थ वज़न की सीमा क्या है?', a: 'वह वज़न-दायरा जिसमें आपके क़द पर BMI 18.5 और 24.9 के बीच रहे। यह एक दायरा है, लक्ष्य नहीं — उसके भीतर आप कहाँ हैं, यह गठन और पसंद की बात है।' },
    ],
    ui: {
      body: 'आपकी जानकारी', height: 'क़द (सेमी)', weight: 'वज़न (किग्रा)', sex: 'लिंग',
      male: 'पुरुष', female: 'महिला', calc: 'गणना करें', bmiLabel: 'BMI',
      range: 'स्वस्थ वज़न की सीमा', table: 'WHO वर्गीकरण', ideal: 'सामान्य वज़न',
      b0: 'कम वज़न', b1: 'सामान्य', b2: 'अधिक वज़न', b3: 'मोटापा श्रेणी I', b4: 'मोटापा श्रेणी II', b5: 'मोटापा श्रेणी III',
      s0: 'पोषण की जाँच करें', s1: 'स्वस्थ वज़न का दायरा', s2: 'ध्यान देना शुरू करने का समय',
      s3: 'दिनचर्या में बदलाव सुझाया जाता है', s4: 'चिकित्सकीय देखरेख सुझाई जाती है', s5: 'तुरंत चिकित्सकीय सहायता लें',
    },
  },
  'zh-hans': {
    title: 'BMI 计算器',
    desc: '身体质量指数与健康体重范围（WHO 分级）',
    short: '身高体重 → BMI 与健康范围',
    intro: [
      {
        h: '怎么算出来的',
        p: 'BMI 是体重（公斤）除以身高（米）的平方。175 厘米、70 公斤的人就是 70 ÷ 1.75²，约 22.9。这里显示的区间是 WHO 的国际标准：低于 18.5 偏瘦，18.5–25 正常，25–30 超重，30 及以上肥胖。',
      },
      {
        h: '亚洲的界值更低',
        p: 'WHO 另外发布了亚太界值，东亚和南亚大部分地区都在用——中国也是。那里超重从 23 起算、肥胖从 25 起算，而不是 25 和 30。原因是在同样的 BMI 下，亚洲人内脏脂肪往往更多，代谢风险更高。如果国内的计算器给你的判定比这里更严格，就是这个缘故——两者都不算错，只是回答的问题略有不同。',
      },
      {
        h: 'BMI 看不见的东西',
        p: 'BMI 只知道你的身高和体重。它分不出肌肉和脂肪，所以练得好的人常常落在超重那一档；它也不知道脂肪长在哪里，而对健康来说，长在哪里比总量更要紧。把它当成粗筛，不要当成诊断。',
      },
    ],
    faq: [
      { q: '这里用的是哪套标准？', a: 'WHO 国际标准，分界为 18.5、25、30、35、40。亚太指南用 23 和 25 代替 25 和 30，上面那一节说明了差别。' },
      { q: '运动员适用吗？', a: '不太适用。肌肉比脂肪密度高，所以又瘦又壮的人可能落在超重区间，实际体脂却很低。体脂率或腰围更说明问题。' },
      { q: '健康体重范围是什么？', a: '在你的身高下让 BMI 落在 18.5 到 24.9 之间的那段体重。它是一个范围而不是目标值——落在其中哪个位置，取决于体型和个人偏好。' },
    ],
    ui: {
      body: '身体信息', height: '身高（厘米）', weight: '体重（公斤）', sex: '性别',
      male: '男', female: '女', calc: '计算', bmiLabel: 'BMI',
      range: '健康体重范围', table: 'WHO 分级', ideal: '正常体重',
      b0: '偏瘦', b1: '正常', b2: '超重', b3: '肥胖 I 级', b4: '肥胖 II 级', b5: '肥胖 III 级',
      s0: '留意营养状况', s1: '健康体重范围', s2: '可以开始管理体重了',
      s3: '建议调整生活习惯', s4: '建议医学干预', s5: '建议尽快就医',
    },
  },
  'zh-hant': {
    title: 'BMI 計算機',
    desc: '身體質量指數與健康體重範圍（WHO 分級）',
    short: '身高體重 → BMI 與健康範圍',
    intro: [
      {
        h: '怎麼算出來的',
        p: 'BMI 是體重（公斤）除以身高（公尺）的平方。175 公分、70 公斤的人就是 70 ÷ 1.75²，約 22.9。這裡顯示的區間是 WHO 的國際標準：低於 18.5 過輕，18.5–25 正常，25–30 過重，30 及以上肥胖。',
      },
      {
        h: '亞洲的切點更低',
        p: 'WHO 另外發布了亞太切點，東亞和南亞大部分地區都在用。那裡過重從 23 起算、肥胖從 25 起算，而不是 25 和 30。原因是在同樣的 BMI 下，亞洲人內臟脂肪往往更多，代謝風險更高。台灣國健署的標準也偏向這一套。如果本地的計算機給你的判定比這裡嚴格，就是這個緣故——兩者都不算錯，只是回答的問題略有不同。',
      },
      {
        h: 'BMI 看不見的東西',
        p: 'BMI 只知道你的身高和體重。它分不出肌肉和脂肪，所以練得好的人常常落在過重那一檔；它也不知道脂肪長在哪裡，而對健康來說，長在哪裡比總量更要緊。把它當成粗篩，不要當成診斷。',
      },
    ],
    faq: [
      { q: '這裡用的是哪套標準？', a: 'WHO 國際標準，分界為 18.5、25、30、35、40。亞太指引用 23 和 25 取代 25 和 30，上面那一節說明了差別。' },
      { q: '運動員適用嗎？', a: '不太適用。肌肉比脂肪密度高，所以又瘦又壯的人可能落在過重區間，實際體脂卻很低。體脂率或腰圍更說明問題。' },
      { q: '健康體重範圍是什麼？', a: '在你的身高下讓 BMI 落在 18.5 到 24.9 之間的那段體重。它是一個範圍而不是目標值——落在其中哪個位置，取決於體型和個人偏好。' },
    ],
    ui: {
      body: '身體資訊', height: '身高（公分）', weight: '體重（公斤）', sex: '性別',
      male: '男', female: '女', calc: '計算', bmiLabel: 'BMI',
      range: '健康體重範圍', table: 'WHO 分級', ideal: '正常體重',
      b0: '過輕', b1: '正常', b2: '過重', b3: '肥胖 I 級', b4: '肥胖 II 級', b5: '肥胖 III 級',
      s0: '留意營養狀況', s1: '健康體重範圍', s2: '可以開始管理體重了',
      s3: '建議調整生活習慣', s4: '建議醫療介入', s5: '建議盡快就醫',
    },
  },
};
