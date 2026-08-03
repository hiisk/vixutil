import type { CalcTable } from './types.ts';

/**
 * 체지방률 — 미 해군 공식과 Deurenberg(BMI) 추정, 등급은 ACSM.
 * 셋 다 국제 기준이라 갈아 끼울 것이 없었다.
 */
export const BODY_FAT: CalcTable = {
  en: {
    title: 'Body fat percentage calculator',
    desc: 'Two estimates — the Navy tape method and the BMI-based formula — graded on the ACSM scale',
    short: 'Tape method · BMI estimate',
    intro: [
      {
        h: 'Two ways to estimate it',
        p: 'The US Navy method uses circumferences at the neck and waist (and hips for women) together with height. All it needs is a tape measure, and because it reads shape it lands closer to reality than BMI does. The Deurenberg formula works from BMI, age and sex alone — quicker, but with a wider error. A large gap between the two usually means your build is some distance from average.',
      },
      {
        h: 'The scales differ by sex',
        p: 'Women carry more essential fat as a matter of physiology, so the same percentage falls in a different band. The grading here follows the ACSM scale with separate thresholds. Applying the male scale to a woman marks healthy people as over-fat, which is why comparing the raw numbers across sexes tells you nothing.',
      },
      {
        h: 'These are estimates, not measurements',
        p: 'DEXA, hydrostatic weighing and skinfold callipers all disagree with each other, and formulas disagree with all of them. Use one method consistently and watch the direction of travel over months; the trend is meaningful even when the absolute number is not.',
      },
    ],
    faq: [
      { q: 'Why does the tape method need the neck?', a: 'Because it stands in for frame size. Subtracting neck from waist separates the part of the circumference that reflects fat from the part that reflects build.' },
      { q: 'Where exactly do I measure the waist?', a: 'At the navel for men, and at the narrowest point for women — that is what the Navy formula was fitted to. Measuring somewhere else changes the answer by several points.' },
      { q: 'Which should I trust when they disagree?', a: 'The tape method, generally. The BMI-based estimate cannot tell muscle from fat, so it reads high on muscular people and low on those who are lightly built but under-muscled.' },
    ],
    ui: {
      tabNavy: 'Tape measurements', tabBmi: 'From BMI',
      sex: 'Sex', male: 'Male', female: 'Female',
      height: 'Height (cm)', neck: 'Neck (cm)', waist: 'Waist (cm)', hip: 'Hips (cm)',
      weight: 'Weight (kg, optional)', bmi: 'BMI', age: 'Age', calc: 'Calculate',
      result: 'Body fat', fatMass: 'Fat mass', leanMass: 'Lean mass',
      lv0: 'Essential fat', lv1: 'Athletic', lv2: 'Fitness', lv3: 'Average', lv4: 'Above average',
      errFields: 'Please fill in every field.',
      errWaist: 'Waist must be larger than neck.',
      errWaistHip: 'Waist plus hips must be larger than neck.',
      note: 'An estimate from a formula, not a body composition measurement. Not medical advice.',
    },
  },
  es: {
    title: 'Calculadora de porcentaje de grasa corporal',
    desc: 'Dos estimaciones — método de la Marina con cinta métrica y fórmula a partir del IMC — graduadas según la ACSM',
    short: 'Cinta métrica · estimación por IMC',
    intro: [
      {
        h: 'Dos maneras de estimarlo',
        p: 'El método de la Marina de EE. UU. usa los contornos de cuello y cintura (y cadera en mujeres) junto con la altura. Basta una cinta métrica y, como lee la forma del cuerpo, se acerca más a la realidad que el IMC. La fórmula de Deurenberg parte solo de IMC, edad y sexo: más rápida, pero con más error. Una distancia grande entre ambas suele indicar que tu constitución se aleja de la media.',
      },
      {
        h: 'Las escalas son distintas por sexo',
        p: 'Las mujeres tienen fisiológicamente más grasa esencial, así que el mismo porcentaje cae en otra franja. La graduación sigue la escala ACSM con umbrales separados. Aplicar la escala masculina a una mujer marca como exceso de grasa a personas sanas, y por eso comparar los números crudos entre sexos no dice nada.',
      },
      {
        h: 'Son estimaciones, no mediciones',
        p: 'La DEXA, la pesada hidrostática y los plicómetros discrepan entre sí, y las fórmulas discrepan de todos ellos. Usa un método de forma constante y mira la dirección a lo largo de meses: la tendencia significa algo aunque la cifra absoluta no.',
      },
    ],
    faq: [
      { q: '¿Por qué el método con cinta necesita el cuello?', a: 'Porque hace de indicador del tamaño del esqueleto. Restar el cuello de la cintura separa la parte del contorno que refleja grasa de la que refleja constitución.' },
      { q: '¿Dónde mido exactamente la cintura?', a: 'A la altura del ombligo en hombres y en el punto más estrecho en mujeres: así se ajustó la fórmula de la Marina. Medir en otro sitio cambia el resultado en varios puntos.' },
      { q: '¿Cuál creo cuando no coinciden?', a: 'Por lo general, el de la cinta. La estimación por IMC no distingue músculo de grasa, así que da valores altos en personas musculadas y bajos en personas delgadas pero con poco músculo.' },
    ],
    ui: {
      tabNavy: 'Con cinta métrica', tabBmi: 'A partir del IMC',
      sex: 'Sexo', male: 'Hombre', female: 'Mujer',
      height: 'Altura (cm)', neck: 'Cuello (cm)', waist: 'Cintura (cm)', hip: 'Cadera (cm)',
      weight: 'Peso (kg, opcional)', bmi: 'IMC', age: 'Edad', calc: 'Calcular',
      result: 'Grasa corporal', fatMass: 'Masa grasa', leanMass: 'Masa magra',
      lv0: 'Grasa esencial', lv1: 'Deportista', lv2: 'Buena forma', lv3: 'Media', lv4: 'Por encima de la media',
      errFields: 'Rellena todos los campos.',
      errWaist: 'La cintura debe ser mayor que el cuello.',
      errWaistHip: 'Cintura más cadera debe ser mayor que el cuello.',
      note: 'Es una estimación de una fórmula, no una medición de composición corporal. No es consejo médico.',
    },
  },
  'pt-br': {
    title: 'Calculadora de percentual de gordura corporal',
    desc: 'Duas estimativas — método da Marinha com fita métrica e fórmula pelo IMC — classificadas pela escala ACSM',
    short: 'Fita métrica · estimativa por IMC',
    intro: [
      {
        h: 'Duas formas de estimar',
        p: 'O método da Marinha dos EUA usa as circunferências de pescoço e cintura (e quadril nas mulheres) junto com a altura. Basta uma fita métrica e, por ler a forma do corpo, chega mais perto da realidade do que o IMC. A fórmula de Deurenberg parte só de IMC, idade e sexo: mais rápida, porém com erro maior. Uma distância grande entre as duas costuma indicar que sua constituição foge da média.',
      },
      {
        h: 'As escalas mudam conforme o sexo',
        p: 'Mulheres têm fisiologicamente mais gordura essencial, então o mesmo percentual cai em outra faixa. A classificação aqui segue a escala ACSM com limiares separados. Aplicar a escala masculina a uma mulher marca pessoas saudáveis como excesso de gordura — por isso comparar os números crus entre sexos não diz nada.',
      },
      {
        h: 'São estimativas, não medições',
        p: 'DEXA, pesagem hidrostática e adipômetro discordam entre si, e as fórmulas discordam de todos. Use um método de forma consistente e observe a direção ao longo de meses: a tendência significa algo mesmo quando o número absoluto não significa.',
      },
    ],
    faq: [
      { q: 'Por que o método da fita precisa do pescoço?', a: 'Porque ele funciona como indicador do tamanho da estrutura. Subtrair o pescoço da cintura separa a parte da circunferência que reflete gordura da que reflete constituição.' },
      { q: 'Onde exatamente meço a cintura?', a: 'Na altura do umbigo para homens e no ponto mais estreito para mulheres — foi assim que a fórmula da Marinha foi ajustada. Medir em outro lugar muda o resultado em vários pontos.' },
      { q: 'Em qual acreditar quando discordam?', a: 'Em geral, no da fita. A estimativa por IMC não separa músculo de gordura, então lê alto em pessoas musculosas e baixo em pessoas magras com pouca musculatura.' },
    ],
    ui: {
      tabNavy: 'Com fita métrica', tabBmi: 'A partir do IMC',
      sex: 'Sexo', male: 'Homem', female: 'Mulher',
      height: 'Altura (cm)', neck: 'Pescoço (cm)', waist: 'Cintura (cm)', hip: 'Quadril (cm)',
      weight: 'Peso (kg, opcional)', bmi: 'IMC', age: 'Idade', calc: 'Calcular',
      result: 'Gordura corporal', fatMass: 'Massa gorda', leanMass: 'Massa magra',
      lv0: 'Gordura essencial', lv1: 'Atlético', lv2: 'Boa forma', lv3: 'Média', lv4: 'Acima da média',
      errFields: 'Preencha todos os campos.',
      errWaist: 'A cintura precisa ser maior que o pescoço.',
      errWaistHip: 'Cintura mais quadril precisa ser maior que o pescoço.',
      note: 'Estimativa de uma fórmula, não medição de composição corporal. Não é orientação médica.',
    },
  },
  ja: {
    title: '体脂肪率の計算機',
    desc: '米海軍式(メジャー)とBMI式の二通りで推定し、ACSMの基準で判定します',
    short: 'メジャー式とBMI式',
    intro: [
      {
        h: '二通りの推定',
        p: '米海軍式は首と腹囲(女性は腰まわりも)と身長から出します。メジャーがあれば足り、体の形を読むぶんBMIより実際に近づきます。Deurenberg式はBMI・年齢・性別だけで出るので手軽ですが、誤差は大きめです。二つが大きく離れたら、体型が平均から離れているという合図と見てよいでしょう。',
      },
      {
        h: '男女で基準が違います',
        p: '女性は生理的に必須脂肪が多いため、同じ数値でも属する区分が変わります。ここではACSMの基準に従い、男女別のしきい値で判定します。男性基準を女性に当てると健康な人まで過多と出るので、男女の数値をそのまま比べても意味がありません。',
      },
      {
        h: '測定値ではなく推定値です',
        p: 'DEXAも水中体重法もキャリパーも互いに食い違い、計算式はそのどれとも食い違います。ひとつの方法を続けて使い、数か月の向きを見てください。絶対値が当てにならなくても、傾きには意味があります。',
      },
    ],
    faq: [
      { q: 'メジャー式でなぜ首を測るのですか。', a: '骨格の大きさの代わりになるからです。腹囲から首を引くことで、周囲径のうち脂肪を映す部分と体格を映す部分を切り分けています。' },
      { q: '腹囲はどこで測りますか。', a: '男性はへその高さ、女性はいちばんくびれた位置です。海軍式はそこで合わせてあるので、別の場所で測ると答えが数ポイント変わります。' },
      { q: '二つが食い違うときはどちらを信じますか。', a: 'ふつうはメジャー式です。BMI式は筋肉と脂肪を区別できないので、筋肉質の人では高く、細いが筋肉の少ない人では低く出ます。' },
    ],
    ui: {
      tabNavy: 'メジャーで測る', tabBmi: 'BMIから',
      sex: '性別', male: '男性', female: '女性',
      height: '身長 (cm)', neck: '首まわり (cm)', waist: '腹囲 (cm)', hip: '腰まわり (cm)',
      weight: '体重 (kg・任意)', bmi: 'BMI', age: '年齢', calc: '計算する',
      result: '体脂肪率', fatMass: '体脂肪量', leanMass: '除脂肪量',
      lv0: '必須脂肪', lv1: 'アスリート', lv2: 'フィットネス', lv3: '平均', lv4: '平均より多い',
      errFields: 'すべての項目を入力してください。',
      errWaist: '腹囲は首まわりより大きい必要があります。',
      errWaistHip: '腹囲と腰まわりの合計は首まわりより大きい必要があります。',
      note: '式による推定であり、体組成の測定ではありません。医学的助言ではありません。',
    },
  },
  de: {
    title: 'Körperfettanteil-Rechner',
    desc: 'Zwei Schätzungen — Navy-Maßband-Methode und BMI-Formel — eingeordnet nach der ACSM-Skala',
    short: 'Maßband · BMI-Schätzung',
    intro: [
      {
        h: 'Zwei Wege der Schätzung',
        p: 'Die Methode der US Navy nutzt die Umfänge an Hals und Taille (bei Frauen zusätzlich Hüfte) zusammen mit der Größe. Nötig ist nur ein Maßband, und weil sie die Form liest, kommt sie der Wirklichkeit näher als der BMI. Die Deurenberg-Formel arbeitet allein mit BMI, Alter und Geschlecht — schneller, aber mit größerem Fehler. Ein großer Abstand zwischen beiden deutet meist darauf hin, dass der Körperbau vom Durchschnitt abweicht.',
      },
      {
        h: 'Die Skalen unterscheiden sich nach Geschlecht',
        p: 'Frauen tragen physiologisch mehr essenzielles Fett, derselbe Prozentwert fällt daher in ein anderes Band. Die Einordnung folgt der ACSM-Skala mit getrennten Schwellen. Wendet man die männliche Skala auf Frauen an, gelten Gesunde als zu fett — deshalb sagt ein Vergleich der Rohwerte zwischen den Geschlechtern nichts aus.',
      },
      {
        h: 'Schätzungen, keine Messungen',
        p: 'DEXA, hydrostatisches Wiegen und Kalipermessung widersprechen einander, und Formeln widersprechen ihnen allen. Nutzen Sie eine Methode konsequent und achten Sie über Monate auf die Richtung: Der Trend sagt etwas, auch wenn es der Absolutwert nicht tut.',
      },
    ],
    faq: [
      { q: 'Warum braucht die Maßband-Methode den Hals?', a: 'Weil er als Stellvertreter für die Statur dient. Den Hals von der Taille abzuziehen trennt den Teil des Umfangs, der Fett abbildet, von dem, der den Körperbau abbildet.' },
      { q: 'Wo genau messe ich die Taille?', a: 'Bei Männern auf Nabelhöhe, bei Frauen an der schmalsten Stelle — so wurde die Navy-Formel angepasst. An anderer Stelle gemessen ändert sich das Ergebnis um mehrere Punkte.' },
      { q: 'Welcher Wert gilt, wenn beide auseinandergehen?', a: 'In der Regel der vom Maßband. Die BMI-Schätzung kann Muskel nicht von Fett unterscheiden und liest bei muskulösen Menschen zu hoch, bei schlanken mit wenig Muskeln zu niedrig.' },
    ],
    ui: {
      tabNavy: 'Mit dem Maßband', tabBmi: 'Aus dem BMI',
      sex: 'Geschlecht', male: 'Männlich', female: 'Weiblich',
      height: 'Größe (cm)', neck: 'Hals (cm)', waist: 'Taille (cm)', hip: 'Hüfte (cm)',
      weight: 'Gewicht (kg, optional)', bmi: 'BMI', age: 'Alter', calc: 'Berechnen',
      result: 'Körperfettanteil', fatMass: 'Fettmasse', leanMass: 'Magermasse',
      lv0: 'Essenzielles Fett', lv1: 'Athletisch', lv2: 'Fit', lv3: 'Durchschnitt', lv4: 'Über dem Durchschnitt',
      errFields: 'Bitte alle Felder ausfüllen.',
      errWaist: 'Die Taille muss größer sein als der Hals.',
      errWaistHip: 'Taille plus Hüfte muss größer sein als der Hals.',
      note: 'Eine Schätzung aus einer Formel, keine Messung der Körperzusammensetzung. Keine medizinische Beratung.',
    },
  },
  fr: {
    title: 'Calculateur de masse grasse',
    desc: 'Deux estimations — méthode Navy au mètre ruban et formule à partir de l’IMC — classées sur l’échelle ACSM',
    short: 'Mètre ruban · estimation par IMC',
    intro: [
      {
        h: 'Deux façons de l’estimer',
        p: 'La méthode de l’US Navy utilise les tours de cou et de taille (et de hanches chez les femmes) avec la taille. Un mètre ruban suffit, et comme elle lit la forme du corps elle tombe plus près du réel que l’IMC. La formule de Deurenberg part du seul IMC, de l’âge et du sexe : plus rapide, mais plus imprécise. Un grand écart entre les deux signale en général une morphologie éloignée de la moyenne.',
      },
      {
        h: 'Les échelles diffèrent selon le sexe',
        p: 'Les femmes portent physiologiquement plus de graisse essentielle : le même pourcentage tombe dans une autre tranche. Le classement suit l’échelle ACSM avec des seuils distincts. Appliquer l’échelle masculine à une femme range des personnes en bonne santé parmi les excès de graisse — comparer les chiffres bruts entre sexes ne dit donc rien.',
      },
      {
        h: 'Ce sont des estimations, pas des mesures',
        p: 'DEXA, pesée hydrostatique et pinces à plis cutanés se contredisent entre elles, et les formules les contredisent toutes. Utilisez une seule méthode de façon constante et regardez la direction sur plusieurs mois : la tendance a du sens même quand le chiffre absolu n’en a pas.',
      },
    ],
    faq: [
      { q: 'Pourquoi la méthode au ruban demande-t-elle le cou ?', a: 'Parce qu’il sert d’indicateur d’ossature. Soustraire le cou de la taille sépare la part du tour qui reflète la graisse de celle qui reflète la charpente.' },
      { q: 'Où mesurer exactement le tour de taille ?', a: 'Au niveau du nombril chez les hommes, au point le plus étroit chez les femmes : c’est ainsi que la formule Navy a été calibrée. Mesurer ailleurs déplace le résultat de plusieurs points.' },
      { q: 'Laquelle croire quand elles divergent ?', a: 'Celle au ruban, en général. L’estimation par IMC ne distingue pas le muscle de la graisse : elle surestime chez les personnes musclées et sous-estime chez les personnes minces mais peu musclées.' },
    ],
    ui: {
      tabNavy: 'Au mètre ruban', tabBmi: 'À partir de l’IMC',
      sex: 'Sexe', male: 'Homme', female: 'Femme',
      height: 'Taille (cm)', neck: 'Cou (cm)', waist: 'Tour de taille (cm)', hip: 'Hanches (cm)',
      weight: 'Poids (kg, facultatif)', bmi: 'IMC', age: 'Âge', calc: 'Calculer',
      result: 'Masse grasse', fatMass: 'Masse grasse', leanMass: 'Masse maigre',
      lv0: 'Graisse essentielle', lv1: 'Athlétique', lv2: 'En forme', lv3: 'Moyenne', lv4: 'Au-dessus de la moyenne',
      errFields: 'Merci de remplir tous les champs.',
      errWaist: 'Le tour de taille doit dépasser le tour de cou.',
      errWaistHip: 'Taille plus hanches doit dépasser le tour de cou.',
      note: 'Estimation issue d’une formule, pas une mesure de composition corporelle. Ce n’est pas un avis médical.',
    },
  },
  hi: {
    title: 'शरीर वसा प्रतिशत कैलकुलेटर',
    desc: 'दो अनुमान — नौसेना की टेप विधि और बीएमआई सूत्र — ACSM पैमाने पर श्रेणीबद्ध',
    short: 'टेप विधि · बीएमआई अनुमान',
    intro: [
      {
        h: 'अनुमान लगाने के दो तरीक़े',
        p: 'अमेरिकी नौसेना की विधि गर्दन और कमर (महिलाओं में कूल्हा भी) की परिधि तथा लंबाई से काम करती है। बस एक नापने का फ़ीता चाहिए, और चूँकि यह शरीर की बनावट पढ़ती है, बीएमआई से ज़्यादा असल के क़रीब आती है। Deurenberg सूत्र सिर्फ़ बीएमआई, उम्र और लिंग से चलता है — तेज़, पर ग़लती की गुंजाइश ज़्यादा। दोनों में बड़ा फ़ासला अक्सर बताता है कि आपकी बनावट औसत से दूर है।',
      },
      {
        h: 'पैमाने लिंग के हिसाब से अलग हैं',
        p: 'महिलाओं में शारीरिक रूप से आवश्यक वसा ज़्यादा होती है, इसलिए वही प्रतिशत दूसरी श्रेणी में गिरता है। यहाँ ACSM पैमाना अलग-अलग सीमाओं के साथ लगाया गया है। पुरुषों का पैमाना महिला पर लगाने से स्वस्थ लोग भी "अधिक वसा" में आ जाते हैं — इसीलिए दोनों के कच्चे आंकड़े मिलाना बेकार है।',
      },
      {
        h: 'ये अनुमान हैं, माप नहीं',
        p: 'DEXA, जल-भार विधि और कैलिपर — तीनों आपस में नहीं मिलते, और सूत्र इन सबसे नहीं मिलते। एक ही तरीक़ा लगातार अपनाइए और महीनों में दिशा देखिए; निरपेक्ष आंकड़ा भरोसेमंद न हो तब भी रुख़ मायने रखता है।',
      },
    ],
    faq: [
      { q: 'टेप विधि में गर्दन क्यों चाहिए?', a: 'क्योंकि वह ढाँचे के आकार का प्रतिनिधि है। कमर में से गर्दन घटाने पर परिधि का वह हिस्सा अलग हो जाता है जो वसा दिखाता है, और वह जो बनावट दिखाता है।' },
      { q: 'कमर ठीक कहाँ नापूँ?', a: 'पुरुषों में नाभि की ऊँचाई पर, महिलाओं में सबसे पतली जगह — नौसेना का सूत्र इसी पर बैठाया गया है। कहीं और नापने से जवाब कई अंक बदल जाता है।' },
      { q: 'दोनों अलग आएँ तो किस पर भरोसा करूँ?', a: 'आमतौर पर टेप वाली विधि पर। बीएमआई वाला अनुमान मांसपेशी और वसा में फ़र्क़ नहीं कर पाता, इसलिए मांसल लोगों में ऊँचा और दुबले पर कम मांसपेशी वालों में नीचा आता है।' },
    ],
    ui: {
      tabNavy: 'फ़ीते से नाप', tabBmi: 'बीएमआई से',
      sex: 'लिंग', male: 'पुरुष', female: 'महिला',
      height: 'लंबाई (सेमी)', neck: 'गर्दन (सेमी)', waist: 'कमर (सेमी)', hip: 'कूल्हा (सेमी)',
      weight: 'वज़न (किग्रा, वैकल्पिक)', bmi: 'बीएमआई', age: 'उम्र', calc: 'गणना करें',
      result: 'शरीर वसा', fatMass: 'वसा द्रव्यमान', leanMass: 'दुबला द्रव्यमान',
      lv0: 'आवश्यक वसा', lv1: 'खिलाड़ी', lv2: 'फ़िटनेस', lv3: 'औसत', lv4: 'औसत से ऊपर',
      errFields: 'कृपया सभी खाने भरें।',
      errWaist: 'कमर गर्दन से बड़ी होनी चाहिए।',
      errWaistHip: 'कमर और कूल्हा मिलकर गर्दन से बड़े होने चाहिए।',
      note: 'यह सूत्र से लगाया अनुमान है, शरीर संरचना का माप नहीं। यह चिकित्सकीय सलाह नहीं है।',
    },
  },
  'zh-hans': {
    title: '体脂率计算器',
    desc: '两种估算——美国海军围度法和 BMI 公式——按 ACSM 标准分级',
    short: '围度法 · BMI 估算',
    intro: [
      {
        h: '两种估算方式',
        p: '美国海军法用颈围和腰围（女性还要臀围）加上身高来算。有一把软尺就够，而且因为它读的是身形，比 BMI 更贴近实际。Deurenberg 公式只用 BMI、年龄和性别——更快，但误差更大。两者差得多，通常说明你的体型离平均值比较远。',
      },
      {
        h: '男女标准不同',
        p: '女性生理上必需脂肪更多，所以同一个百分比落在不同区间。这里按 ACSM 标准分别设阈值。把男性标准套到女性身上，会把健康的人判成脂肪过多——所以拿男女的原始数字直接比较毫无意义。',
      },
      {
        h: '这是估算，不是测量',
        p: 'DEXA、水下称重和皮褶卡钳彼此都对不上，而公式和它们全都对不上。固定用一种方法，看几个月里的方向；即使绝对数值不可靠，趋势仍然有意义。',
      },
    ],
    faq: [
      { q: '围度法为什么要量脖子？', a: '因为它代表骨架大小。用腰围减去颈围，就把围度中反映脂肪的部分和反映体格的部分分开了。' },
      { q: '腰围到底量哪里？', a: '男性量肚脐高度，女性量最细处——海军公式就是照这个拟合的。量在别处，结果会差好几个百分点。' },
      { q: '两个结果不一致时信哪个？', a: '一般信围度法。BMI 估算分不清肌肉和脂肪，所以对肌肉多的人偏高，对偏瘦但肌肉少的人偏低。' },
    ],
    ui: {
      tabNavy: '用软尺量', tabBmi: '由 BMI 估算',
      sex: '性别', male: '男', female: '女',
      height: '身高 (cm)', neck: '颈围 (cm)', waist: '腰围 (cm)', hip: '臀围 (cm)',
      weight: '体重 (kg，可选)', bmi: 'BMI', age: '年龄', calc: '计算',
      result: '体脂率', fatMass: '脂肪量', leanMass: '去脂体重',
      lv0: '必需脂肪', lv1: '运动员', lv2: '健身水平', lv3: '平均', lv4: '高于平均',
      errFields: '请把所有项目填完。',
      errWaist: '腰围必须大于颈围。',
      errWaistHip: '腰围加臀围必须大于颈围。',
      note: '这是公式估算，不是体成分测量。不构成医疗建议。',
    },
  },
  'zh-hant': {
    title: '體脂率計算機',
    desc: '兩種估算——美國海軍圍度法和 BMI 公式——按 ACSM 標準分級',
    short: '圍度法 · BMI 估算',
    intro: [
      {
        h: '兩種估算方式',
        p: '美國海軍法用頸圍和腰圍（女性還要臀圍）加上身高來算。有一把軟尺就夠，而且因為它讀的是身形，比 BMI 更貼近實際。Deurenberg 公式只用 BMI、年齡和性別——更快，但誤差更大。兩者差得多，通常說明你的體型離平均值比較遠。',
      },
      {
        h: '男女標準不同',
        p: '女性生理上必需脂肪更多，所以同一個百分比落在不同區間。這裡按 ACSM 標準分別設閾值。把男性標準套到女性身上，會把健康的人判成脂肪過多——所以拿男女的原始數字直接比較毫無意義。',
      },
      {
        h: '這是估算，不是測量',
        p: 'DEXA、水下秤重和皮褶夾彼此都對不上，而公式和它們全都對不上。固定用一種方法，看幾個月裡的方向；即使絕對數值不可靠，趨勢仍然有意義。',
      },
    ],
    faq: [
      { q: '圍度法為什麼要量脖子？', a: '因為它代表骨架大小。用腰圍減去頸圍，就把圍度中反映脂肪的部分和反映體格的部分分開了。' },
      { q: '腰圍到底量哪裡？', a: '男性量肚臍高度，女性量最細處——海軍公式就是照這個擬合的。量在別處，結果會差好幾個百分點。' },
      { q: '兩個結果不一致時信哪個？', a: '一般信圍度法。BMI 估算分不清肌肉和脂肪，所以對肌肉多的人偏高，對偏瘦但肌肉少的人偏低。' },
    ],
    ui: {
      tabNavy: '用軟尺量', tabBmi: '由 BMI 估算',
      sex: '性別', male: '男', female: '女',
      height: '身高 (cm)', neck: '頸圍 (cm)', waist: '腰圍 (cm)', hip: '臀圍 (cm)',
      weight: '體重 (kg，選填)', bmi: 'BMI', age: '年齡', calc: '計算',
      result: '體脂率', fatMass: '脂肪量', leanMass: '去脂體重',
      lv0: '必需脂肪', lv1: '運動員', lv2: '健身水準', lv3: '平均', lv4: '高於平均',
      errFields: '請把所有項目填完。',
      errWaist: '腰圍必須大於頸圍。',
      errWaistHip: '腰圍加臀圍必須大於頸圍。',
      note: '這是公式估算，不是體組成測量。不構成醫療建議。',
    },
  },
};
