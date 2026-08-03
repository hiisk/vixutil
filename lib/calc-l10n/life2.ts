import type { CalcTable } from './types.ts';

/**
 * 혈압과 할인.
 *
 * 혈압 분류는 나라마다 갈리는 드문 예다 — 여기서는 WHO/ESH 구간을 쓰고,
 * 미국 ACC/AHA가 130/80부터 고혈압으로 본다는 사실을 FAQ에 적어 뒀다.
 * 어느 한쪽을 정답처럼 내놓으면 다른 쪽 나라에서 틀린 말이 된다.
 */
export const BLOOD_PRESSURE: CalcTable = {
  en: {
    title: 'Blood pressure category checker',
    desc: 'Where a systolic and diastolic reading falls on the WHO / ESH scale',
    short: 'Read your numbers',
    intro: [
      {
        h: 'The higher of the two decides',
        p: 'If systolic and diastolic land in different bands, the category is the higher one. A reading of 145/85 is grade 1 hypertension on the systolic number alone, even though the lower figure is fine.',
      },
      {
        h: 'One reading is not a diagnosis',
        p: 'Blood pressure moves through the day and rises with stress, caffeine, cold and a full bladder. Being in a clinic raises it in a good number of people. Diagnosis rests on repeated measurements across several days, often at home, and never on a single number.',
      },
      {
        h: 'Guidelines disagree about the threshold',
        p: 'The bands here follow the WHO and European guidance. American guidance since 2017 sets hypertension at 130/80, so a reading this page calls high-normal would be called stage 1 there. Neither is wrong; they draw the line at different places on the same continuous risk.',
      },
    ],
    faq: [
      { q: 'How should I measure it properly?', a: 'Seated with your back supported, feet flat, arm at heart height, after five minutes of quiet — and not within half an hour of caffeine, smoking or exercise. Take two readings a minute apart and use the average.' },
      { q: 'Which arm?', a: 'The first time, both — a persistent difference between arms is itself worth mentioning to a doctor. After that, use whichever read higher.' },
      { q: 'What does a very low reading mean?', a: 'On its own, often nothing. Low blood pressure only matters if it comes with dizziness, faintness or fatigue. If it does, that is worth a conversation with a doctor rather than a calculator.' },
    ],
    ui: {
      section: 'Your reading', systolic: 'Systolic (upper)', diastolic: 'Diastolic (lower)',
      calc: 'Check', unit: 'mmHg', result: 'Category',
      c0: 'Low', c1: 'Optimal', c2: 'Normal', c3: 'High-normal',
      c4: 'Grade 1 hypertension', c5: 'Grade 2 hypertension', c6: 'Grade 3 hypertension',
      d0: 'Only a concern if it comes with dizziness or faintness.',
      d1: 'The range associated with the lowest cardiovascular risk.',
      d2: 'Within the normal range. Worth rechecking periodically.',
      d3: 'Above optimal but below the treatment threshold. Lifestyle is where the gains are.',
      d4: 'Confirm with repeated readings over several days and speak to a doctor.',
      d5: 'See a doctor. Treatment is usually indicated at this level.',
      d6: 'Seek medical advice promptly.',
      note: 'Bands follow WHO / European guidance. This is not a diagnosis.',
    },
  },
  es: {
    title: 'Clasificador de presión arterial',
    desc: 'Dónde cae una lectura sistólica y diastólica en la escala de la OMS / ESH',
    short: 'Interpreta tus cifras',
    intro: [
      {
        h: 'Manda la más alta de las dos',
        p: 'Si la sistólica y la diastólica caen en franjas distintas, la categoría es la más alta. Una lectura de 145/85 es hipertensión de grado 1 solo por la sistólica, aunque la cifra baja esté bien.',
      },
      {
        h: 'Una lectura no es un diagnóstico',
        p: 'La presión se mueve a lo largo del día y sube con el estrés, la cafeína, el frío y la vejiga llena. Estar en una consulta la eleva en bastantes personas. El diagnóstico se apoya en medidas repetidas durante varios días, a menudo en casa, y nunca en un solo número.',
      },
      {
        h: 'Las guías no coinciden en el umbral',
        p: 'Las franjas de aquí siguen la guía de la OMS y la europea. La guía estadounidense sitúa la hipertensión en 130/80 desde 2017, así que una lectura que esta página llama normal-alta allí sería estadio 1. Ninguna está equivocada: trazan la raya en puntos distintos de un mismo riesgo continuo.',
      },
    ],
    faq: [
      { q: '¿Cómo la mido bien?', a: 'Sentado con la espalda apoyada, pies en el suelo, brazo a la altura del corazón, tras cinco minutos de reposo, y no en la media hora siguiente a cafeína, tabaco o ejercicio. Toma dos medidas separadas un minuto y usa la media.' },
      { q: '¿En qué brazo?', a: 'La primera vez, en los dos: una diferencia persistente entre brazos ya merece comentarse con un médico. Después, usa el que dio más alto.' },
      { q: '¿Qué significa una lectura muy baja?', a: 'Por sí sola, muchas veces nada. La presión baja solo importa si viene con mareo, desvanecimiento o fatiga. Si es así, toca hablarlo con un médico, no con una calculadora.' },
    ],
    ui: {
      section: 'Tu medida', systolic: 'Sistólica (alta)', diastolic: 'Diastólica (baja)',
      calc: 'Comprobar', unit: 'mmHg', result: 'Categoría',
      c0: 'Baja', c1: 'Óptima', c2: 'Normal', c3: 'Normal-alta',
      c4: 'Hipertensión grado 1', c5: 'Hipertensión grado 2', c6: 'Hipertensión grado 3',
      d0: 'Solo preocupa si viene con mareo o desvanecimiento.',
      d1: 'El rango asociado al menor riesgo cardiovascular.',
      d2: 'Dentro de lo normal. Conviene volver a medir de vez en cuando.',
      d3: 'Por encima de lo óptimo pero bajo el umbral de tratamiento. El margen está en los hábitos.',
      d4: 'Confírmalo con medidas repetidas durante varios días y consulta a un médico.',
      d5: 'Acude al médico. A este nivel suele estar indicado el tratamiento.',
      d6: 'Busca atención médica sin demora.',
      note: 'Las franjas siguen la guía de la OMS / europea. Esto no es un diagnóstico.',
    },
  },
  'pt-br': {
    title: 'Classificador de pressão arterial',
    desc: 'Onde uma leitura sistólica e diastólica cai na escala da OMS / ESH',
    short: 'Leia seus números',
    intro: [
      {
        h: 'Vale a mais alta das duas',
        p: 'Se sistólica e diastólica caem em faixas diferentes, a categoria é a mais alta. Uma leitura de 145/85 é hipertensão grau 1 só pela sistólica, mesmo com o número de baixo em ordem.',
      },
      {
        h: 'Uma leitura não é um diagnóstico',
        p: 'A pressão varia ao longo do dia e sobe com estresse, cafeína, frio e bexiga cheia. Estar no consultório eleva a pressão em boa parte das pessoas. O diagnóstico se apoia em medidas repetidas por vários dias, muitas vezes em casa, e nunca num único número.',
      },
      {
        h: 'As diretrizes discordam sobre o limiar',
        p: 'As faixas aqui seguem a orientação da OMS e a europeia. A americana define hipertensão em 130/80 desde 2017, então uma leitura que esta página chama de normal-alta lá seria estágio 1. Nenhuma está errada: elas traçam a linha em pontos diferentes de um mesmo risco contínuo.',
      },
    ],
    faq: [
      { q: 'Como medir direito?', a: 'Sentado com as costas apoiadas, pés no chão, braço na altura do coração, após cinco minutos de repouso — e não na meia hora seguinte a cafeína, cigarro ou exercício. Faça duas medidas com um minuto de intervalo e use a média.' },
      { q: 'Em qual braço?', a: 'Na primeira vez, nos dois: uma diferença persistente entre os braços já vale ser comentada com o médico. Depois, use o que deu mais alto.' },
      { q: 'O que significa uma leitura muito baixa?', a: 'Sozinha, muitas vezes nada. Pressão baixa só importa se vier com tontura, desmaio ou fadiga. Se vier, é assunto para o médico, não para uma calculadora.' },
    ],
    ui: {
      section: 'Sua leitura', systolic: 'Sistólica (máxima)', diastolic: 'Diastólica (mínima)',
      calc: 'Verificar', unit: 'mmHg', result: 'Categoria',
      c0: 'Baixa', c1: 'Ótima', c2: 'Normal', c3: 'Normal-alta',
      c4: 'Hipertensão grau 1', c5: 'Hipertensão grau 2', c6: 'Hipertensão grau 3',
      d0: 'Só preocupa se vier com tontura ou desmaio.',
      d1: 'A faixa ligada ao menor risco cardiovascular.',
      d2: 'Dentro do normal. Vale medir de novo periodicamente.',
      d3: 'Acima do ótimo, abaixo do limiar de tratamento. O ganho está nos hábitos.',
      d4: 'Confirme com medidas repetidas por vários dias e converse com um médico.',
      d5: 'Procure um médico. Nesse nível o tratamento costuma ser indicado.',
      d6: 'Procure orientação médica sem demora.',
      note: 'Faixas conforme orientação da OMS / europeia. Isto não é um diagnóstico.',
    },
  },
  ja: {
    title: '血圧の判定',
    desc: '収縮期・拡張期の数値がWHO / ESHの区分でどこに入るかを見ます',
    short: '血圧の区分を見る',
    intro: [
      {
        h: '高いほうで決まります',
        p: '収縮期と拡張期が別の区分に入る場合、判定は高いほうです。145/85なら、下の数値に問題がなくても収縮期だけでⅠ度高血圧になります。',
      },
      {
        h: '一度の測定は診断ではありません',
        p: '血圧は一日のうちで動き、ストレス・カフェイン・寒さ・尿意で上がります。診察室にいるだけで上がる人も少なくありません。診断は数日にわたる繰り返しの測定、しばしば家庭での測定に基づくもので、ひとつの数字で決まることはありません。',
      },
      {
        h: '基準は国によって線の引き方が違います',
        p: 'ここの区分はWHOと欧州の指針に従っています。米国の指針は2017年以降130/80から高血圧とするので、このページで正常高値と呼ぶ数値が向こうではステージ1になります。どちらかが誤りなのではなく、連続した危険度のどこに線を引くかが違うだけです。',
      },
    ],
    faq: [
      { q: '正しい測り方は。', a: '背もたれのある椅子に座り、足を床につけ、腕を心臓の高さにして、5分静かにしてから測ります。カフェイン・喫煙・運動の後30分以内は避けます。1分あけて2回測り、平均を使ってください。' },
      { q: 'どちらの腕で測りますか。', a: '最初は両腕で測ります。左右差が続くこと自体、医師に伝える価値があります。その後は高く出たほうの腕で測ってください。' },
      { q: 'とても低い数値は何を意味しますか。', a: 'それだけでは何も意味しないことが多いです。低血圧が問題になるのは、めまい・立ちくらみ・だるさを伴うときです。伴うのであれば、計算機ではなく医師に相談すべき話です。' },
    ],
    ui: {
      section: '測定値', systolic: '収縮期 (上)', diastolic: '拡張期 (下)',
      calc: '判定する', unit: 'mmHg', result: '区分',
      c0: '低血圧', c1: '至適血圧', c2: '正常血圧', c3: '正常高値',
      c4: 'Ⅰ度高血圧', c5: 'Ⅱ度高血圧', c6: 'Ⅲ度高血圧',
      d0: 'めまいや立ちくらみを伴うときだけ問題になります。',
      d1: '心血管の危険度がもっとも低いとされる範囲です。',
      d2: '正常の範囲です。ときどき測り直してください。',
      d3: '至適より上、治療の線より下です。効くのは生活習慣のほうです。',
      d4: '数日にわたって繰り返し測って確かめ、医師に相談してください。',
      d5: '受診してください。この水準では治療が勧められるのが通常です。',
      d6: '速やかに医療機関に相談してください。',
      note: '区分はWHO / 欧州の指針によります。これは診断ではありません。',
    },
  },
  de: {
    title: 'Blutdruck-Einordnung',
    desc: 'Wo systolischer und diastolischer Wert auf der WHO-/ESH-Skala liegen',
    short: 'Werte einordnen',
    intro: [
      {
        h: 'Der höhere der beiden entscheidet',
        p: 'Fallen systolischer und diastolischer Wert in verschiedene Bänder, gilt das höhere. 145/85 ist allein wegen des oberen Werts eine Hypertonie Grad 1, auch wenn der untere in Ordnung ist.',
      },
      {
        h: 'Eine Messung ist keine Diagnose',
        p: 'Der Blutdruck schwankt über den Tag und steigt bei Stress, Koffein, Kälte und voller Blase. Schon der Aufenthalt in einer Praxis treibt ihn bei vielen nach oben. Die Diagnose stützt sich auf wiederholte Messungen über mehrere Tage, oft zu Hause — nie auf eine einzelne Zahl.',
      },
      {
        h: 'Die Leitlinien ziehen die Grenze verschieden',
        p: 'Die Bänder hier folgen der WHO und der europäischen Leitlinie. Die US-Leitlinie setzt Bluthochdruck seit 2017 bei 130/80 an; ein Wert, den diese Seite hochnormal nennt, hieße dort Stadium 1. Keine der beiden ist falsch — sie setzen die Marke an verschiedenen Stellen desselben stetigen Risikos.',
      },
    ],
    faq: [
      { q: 'Wie messe ich richtig?', a: 'Sitzend mit angelehntem Rücken, Füße auf dem Boden, Arm auf Herzhöhe, nach fünf Minuten Ruhe — und nicht innerhalb einer halben Stunde nach Koffein, Rauchen oder Sport. Zwei Messungen im Abstand von einer Minute, dann den Mittelwert nehmen.' },
      { q: 'An welchem Arm?', a: 'Beim ersten Mal an beiden — ein bleibender Seitenunterschied ist für sich genommen ein Grund, es anzusprechen. Danach am Arm mit dem höheren Wert.' },
      { q: 'Was bedeutet ein sehr niedriger Wert?', a: 'Für sich allein oft nichts. Niedriger Blutdruck fällt erst ins Gewicht, wenn Schwindel, Ohnmachtsneigung oder Erschöpfung dazukommen. Dann gehört das Thema zur Ärztin, nicht zum Rechner.' },
    ],
    ui: {
      section: 'Ihr Messwert', systolic: 'Systolisch (oberer)', diastolic: 'Diastolisch (unterer)',
      calc: 'Einordnen', unit: 'mmHg', result: 'Einstufung',
      c0: 'Niedrig', c1: 'Optimal', c2: 'Normal', c3: 'Hochnormal',
      c4: 'Hypertonie Grad 1', c5: 'Hypertonie Grad 2', c6: 'Hypertonie Grad 3',
      d0: 'Nur bedenklich, wenn Schwindel oder Ohnmachtsneigung dazukommen.',
      d1: 'Der Bereich mit dem geringsten Herz-Kreislauf-Risiko.',
      d2: 'Im normalen Bereich. Gelegentlich nachmessen.',
      d3: 'Über optimal, unter der Behandlungsschwelle. Hier wirkt der Lebensstil.',
      d4: 'Mit wiederholten Messungen über mehrere Tage bestätigen und ärztlich abklären.',
      d5: 'Ärztlich abklären. In diesem Bereich ist eine Behandlung meist angezeigt.',
      d6: 'Zeitnah ärztlichen Rat einholen.',
      note: 'Bänder nach WHO / europäischer Leitlinie. Dies ist keine Diagnose.',
    },
  },
  fr: {
    title: 'Classement de la tension artérielle',
    desc: 'Où se situent une systolique et une diastolique sur l’échelle OMS / ESH',
    short: 'Lire vos chiffres',
    intro: [
      {
        h: 'C’est la plus haute des deux qui décide',
        p: 'Si systolique et diastolique tombent dans des tranches différentes, la catégorie retenue est la plus élevée. Une mesure de 145/85 est une hypertension de grade 1 par la seule systolique, même si le chiffre du bas est correct.',
      },
      {
        h: 'Une mesure n’est pas un diagnostic',
        p: 'La tension varie au fil de la journée et monte avec le stress, la caféine, le froid et une vessie pleine. Le seul fait d’être en cabinet la fait grimper chez beaucoup de gens. Le diagnostic repose sur des mesures répétées sur plusieurs jours, souvent à domicile, jamais sur un chiffre isolé.',
      },
      {
        h: 'Les recommandations placent le seuil différemment',
        p: 'Les tranches suivent ici l’OMS et les recommandations européennes. Les recommandations américaines fixent l’hypertension à 130/80 depuis 2017 : une mesure que cette page appelle normale haute y serait un stade 1. Aucune n’a tort ; elles tracent la limite à des endroits différents d’un même risque continu.',
      },
    ],
    faq: [
      { q: 'Comment bien la mesurer ?', a: 'Assis, dos calé, pieds au sol, bras à hauteur du cœur, après cinq minutes de calme — et pas dans la demi-heure suivant caféine, tabac ou effort. Prenez deux mesures espacées d’une minute et faites la moyenne.' },
      { q: 'À quel bras ?', a: 'La première fois, aux deux : une différence persistante entre les bras mérite en soi d’être signalée. Ensuite, prenez celui qui donnait le chiffre le plus haut.' },
      { q: 'Que signifie une tension très basse ?', a: 'À elle seule, souvent rien. Une tension basse ne compte que si elle s’accompagne de vertiges, de malaises ou de fatigue. Dans ce cas, cela relève d’un médecin et non d’un calculateur.' },
    ],
    ui: {
      section: 'Votre mesure', systolic: 'Systolique (haute)', diastolic: 'Diastolique (basse)',
      calc: 'Classer', unit: 'mmHg', result: 'Catégorie',
      c0: 'Basse', c1: 'Optimale', c2: 'Normale', c3: 'Normale haute',
      c4: 'Hypertension grade 1', c5: 'Hypertension grade 2', c6: 'Hypertension grade 3',
      d0: 'Préoccupant seulement si accompagné de vertiges ou de malaises.',
      d1: 'La plage associée au risque cardiovasculaire le plus faible.',
      d2: 'Dans la normale. À recontrôler de temps en temps.',
      d3: 'Au-dessus de l’optimal, sous le seuil de traitement. C’est l’hygiène de vie qui joue.',
      d4: 'À confirmer par des mesures répétées sur plusieurs jours, puis à voir avec un médecin.',
      d5: 'Consultez un médecin. À ce niveau, un traitement est généralement indiqué.',
      d6: 'Demandez rapidement un avis médical.',
      note: 'Tranches selon l’OMS / les recommandations européennes. Ceci n’est pas un diagnostic.',
    },
  },
  hi: {
    title: 'रक्तचाप श्रेणी जाँच',
    desc: 'सिस्टोलिक और डायस्टोलिक पाठ WHO / ESH पैमाने पर कहाँ बैठता है',
    short: 'अपने आंकड़े पढ़ें',
    intro: [
      {
        h: 'दोनों में से ऊँचा वाला तय करता है',
        p: 'अगर सिस्टोलिक और डायस्टोलिक अलग-अलग श्रेणियों में गिरें, तो श्रेणी ऊँची वाली मानी जाती है। 145/85 सिर्फ़ ऊपर वाले आंकड़े की वजह से ग्रेड 1 उच्च रक्तचाप है, भले नीचे वाला ठीक हो।',
      },
      {
        h: 'एक बार का पाठ निदान नहीं है',
        p: 'रक्तचाप दिन भर बदलता है और तनाव, कैफ़ीन, ठंड तथा भरे मूत्राशय से बढ़ता है। बहुत से लोगों में क्लिनिक में होना ही उसे चढ़ा देता है। निदान कई दिनों के बार-बार लिए गए पाठों पर टिका होता है, अक्सर घर पर लिए गए — कभी किसी एक आंकड़े पर नहीं।',
      },
      {
        h: 'दिशानिर्देश सीमा पर एकमत नहीं हैं',
        p: 'यहाँ की श्रेणियाँ WHO और यूरोपीय मार्गदर्शन के अनुसार हैं। अमेरिकी मार्गदर्शन 2017 से 130/80 को ही उच्च रक्तचाप मानता है, इसलिए जिसे यह पन्ना "सामान्य-उच्च" कहता है वह वहाँ चरण 1 कहलाएगा। कोई ग़लत नहीं है; दोनों एक ही सतत जोखिम पर अलग-अलग जगह रेखा खींचते हैं।',
      },
    ],
    faq: [
      { q: 'सही तरीक़े से कैसे नापूँ?', a: 'पीठ टिकाकर बैठिए, पैर ज़मीन पर, बाँह हृदय की ऊँचाई पर, और पाँच मिनट शांत बैठने के बाद — कैफ़ीन, धूम्रपान या कसरत के आधे घंटे के भीतर नहीं। एक मिनट के अंतर पर दो बार नापिए और औसत लीजिए।' },
      { q: 'किस बाँह में?', a: 'पहली बार दोनों में — दोनों बाँहों में लगातार बना अंतर अपने आप में डॉक्टर को बताने लायक़ है। उसके बाद जिसमें ज़्यादा आया हो, उसी में नापिए।' },
      { q: 'बहुत कम पाठ का क्या मतलब है?', a: 'अकेले में अक्सर कुछ नहीं। कम रक्तचाप तभी मायने रखता है जब साथ में चक्कर, बेहोशी जैसा लगना या थकान हो। ऐसा हो तो यह कैलकुलेटर का नहीं, डॉक्टर से बात करने का विषय है।' },
    ],
    ui: {
      section: 'आपका पाठ', systolic: 'सिस्टोलिक (ऊपर)', diastolic: 'डायस्टोलिक (नीचे)',
      calc: 'जाँचें', unit: 'mmHg', result: 'श्रेणी',
      c0: 'निम्न', c1: 'सर्वोत्तम', c2: 'सामान्य', c3: 'सामान्य-उच्च',
      c4: 'ग्रेड 1 उच्च रक्तचाप', c5: 'ग्रेड 2 उच्च रक्तचाप', c6: 'ग्रेड 3 उच्च रक्तचाप',
      d0: 'तभी चिंता की बात जब साथ में चक्कर या बेहोशी जैसा लगे।',
      d1: 'वह परास जिससे हृदय-रक्तवाहिका जोखिम सबसे कम जुड़ा है।',
      d2: 'सामान्य परास में। समय-समय पर फिर नापते रहें।',
      d3: 'सर्वोत्तम से ऊपर, पर उपचार की सीमा से नीचे। यहाँ जीवनशैली ही काम आती है।',
      d4: 'कई दिनों तक बार-बार नापकर पुष्टि करें और डॉक्टर से बात करें।',
      d5: 'डॉक्टर से मिलें। इस स्तर पर आमतौर पर उपचार बताया जाता है।',
      d6: 'बिना देर किए चिकित्सकीय सलाह लें।',
      note: 'श्रेणियाँ WHO / यूरोपीय मार्गदर्शन के अनुसार। यह निदान नहीं है।',
    },
  },
  'zh-hans': {
    title: '血压分级查询',
    desc: '收缩压和舒张压落在 WHO / ESH 标准的哪一档',
    short: '看懂你的血压数字',
    intro: [
      {
        h: '两个数字中高的那个说了算',
        p: '如果收缩压和舒张压落在不同区间，分级取更高的那个。145/85 仅凭收缩压就是 1 级高血压，哪怕下面那个数字没问题。',
      },
      {
        h: '量一次不等于诊断',
        p: '血压一天之内不断变化，紧张、咖啡因、寒冷和憋尿都会让它升高。相当一部分人光是身处诊室就会升高。诊断依据的是连续几天反复测量的结果，往往是在家里测的，从来不是单独一个数字。',
      },
      {
        h: '各国指南划线的位置不同',
        p: '这里的区间按 WHO 和欧洲指南。美国指南自 2017 年起把高血压定在 130/80，所以本页称为"正常高值"的读数，在那边会被叫做 1 期。两者都不算错——它们只是在同一条连续的风险曲线上把线画在了不同位置。',
      },
    ],
    faq: [
      { q: '怎样测才准？', a: '坐着，背有依靠，双脚平放，手臂与心脏齐高，安静五分钟后再测；咖啡因、吸烟或运动后半小时内不要测。间隔一分钟测两次，取平均值。' },
      { q: '量哪只手臂？', a: '第一次两只都量——两臂之间持续存在的差异本身就值得告诉医生。之后固定用读数较高的那只。' },
      { q: '数值很低说明什么？', a: '单看这一项，往往什么也不说明。低血压只有伴随头晕、快要昏倒或乏力时才需要在意。真有这些，该找医生谈，而不是找计算器。' },
    ],
    ui: {
      section: '你的读数', systolic: '收缩压（高压）', diastolic: '舒张压（低压）',
      calc: '查询', unit: 'mmHg', result: '分级',
      c0: '偏低', c1: '理想', c2: '正常', c3: '正常高值',
      c4: '1 级高血压', c5: '2 级高血压', c6: '3 级高血压',
      d0: '只有伴随头晕或快要昏倒时才需要在意。',
      d1: '心血管风险最低的区间。',
      d2: '在正常范围内。建议定期复测。',
      d3: '高于理想值，但还没到治疗线。这一档能起作用的是生活方式。',
      d4: '请连续几天反复测量确认，并与医生沟通。',
      d5: '请就医。这个水平通常需要治疗。',
      d6: '请尽快寻求医疗帮助。',
      note: '区间按 WHO / 欧洲指南。这不是诊断。',
    },
  },
  'zh-hant': {
    title: '血壓分級查詢',
    desc: '收縮壓和舒張壓落在 WHO / ESH 標準的哪一檔',
    short: '看懂你的血壓數字',
    intro: [
      {
        h: '兩個數字中高的那個說了算',
        p: '如果收縮壓和舒張壓落在不同區間，分級取更高的那個。145/85 僅憑收縮壓就是 1 級高血壓，哪怕下面那個數字沒問題。',
      },
      {
        h: '量一次不等於診斷',
        p: '血壓一天之內不斷變化，緊張、咖啡因、寒冷和憋尿都會讓它升高。相當一部分人光是身處診間就會升高。診斷依據的是連續幾天反覆測量的結果，往往是在家裡量的，從來不是單獨一個數字。',
      },
      {
        h: '各國指引劃線的位置不同',
        p: '這裡的區間按 WHO 和歐洲指引。美國指引自 2017 年起把高血壓定在 130/80，所以本頁稱為「正常高值」的讀數，在那邊會被叫做 1 期。兩者都不算錯——它們只是在同一條連續的風險曲線上把線畫在了不同位置。',
      },
    ],
    faq: [
      { q: '怎樣量才準？', a: '坐著，背有依靠，雙腳平放，手臂與心臟齊高，安靜五分鐘後再量；咖啡因、抽菸或運動後半小時內不要量。間隔一分鐘量兩次，取平均值。' },
      { q: '量哪一隻手臂？', a: '第一次兩隻都量——兩臂之間持續存在的差異本身就值得告訴醫師。之後固定用讀數較高的那一隻。' },
      { q: '數值很低說明什麼？', a: '單看這一項，往往什麼也不說明。低血壓只有伴隨頭暈、快要昏倒或乏力時才需要在意。真有這些，該找醫師談，而不是找計算機。' },
    ],
    ui: {
      section: '你的讀數', systolic: '收縮壓（高壓）', diastolic: '舒張壓（低壓）',
      calc: '查詢', unit: 'mmHg', result: '分級',
      c0: '偏低', c1: '理想', c2: '正常', c3: '正常高值',
      c4: '1 級高血壓', c5: '2 級高血壓', c6: '3 級高血壓',
      d0: '只有伴隨頭暈或快要昏倒時才需要在意。',
      d1: '心血管風險最低的區間。',
      d2: '在正常範圍內。建議定期複測。',
      d3: '高於理想值，但還沒到治療線。這一檔能起作用的是生活方式。',
      d4: '請連續幾天反覆測量確認，並與醫師溝通。',
      d5: '請就醫。這個水準通常需要治療。',
      d6: '請盡快尋求醫療協助。',
      note: '區間按 WHO / 歐洲指引。這不是診斷。',
    },
  },
};
