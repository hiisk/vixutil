import type { CalcTable } from './types.ts';

/**
 * 카페인과 수면.
 *
 * 카페인 반감기 5시간도, 수면 주기 90분도 나라를 타지 않는다. 한국어판의
 * 음료 목록(아메리카노·커피믹스)만 어디서나 통하는 것들로 바꿨다.
 */
export const CAFFEINE: CalcTable = {
  en: {
    title: 'Caffeine half-life calculator',
    desc: 'How much caffeine is still in you at bedtime, and when it falls below the level that disturbs sleep',
    short: 'Caffeine left at bedtime',
    intro: [
      {
        h: 'Half every five hours',
        p: 'Caffeine has a half-life of roughly five hours in a typical adult, so a 150 mg coffee still leaves about 75 mg after five hours and 37 mg after ten. An afternoon coffee is therefore still measurably present at midnight, whether or not you feel it.',
      },
      {
        h: 'Feeling nothing is not the same as clearing it',
        p: 'Tolerance blunts the sensation long before the caffeine leaves. Sleep studies find that caffeine taken six hours before bed still shortens total sleep and cuts deep sleep, even in people who report no difficulty falling asleep. What you notice and what it does are different questions.',
      },
      {
        h: 'Five hours is an average, not your number',
        p: 'Individual half-lives run from around 1.5 to 9.5 hours. Smoking speeds clearance up; pregnancy and some oral contraceptives slow it dramatically, sometimes doubling it. If caffeine seems to hit you unusually hard or long, the metabolism explanation is a real one.',
      },
    ],
    faq: [
      { q: 'What is the 50 mg threshold?', a: 'A common rule of thumb for the level below which caffeine is unlikely to disturb sleep much. It is a rough marker rather than a clinical cutoff, and people sensitive to caffeine will notice less than that.' },
      { q: 'How much caffeine is safe in a day?', a: 'Most health authorities put the figure for healthy adults at around 400 mg — roughly two to three brewed coffees. Lower limits apply in pregnancy, generally around 200 mg.' },
      { q: 'Does decaf have none?', a: 'It has a little — commonly a few milligrams per cup rather than none at all. Enough to matter only if you are drinking a lot of it late.' },
    ],
    ui: {
      section: 'Your intake', source: 'Drink', amount: 'Caffeine (mg)', time: 'Time you drank it',
      after: 'Check after (hours)', calc: 'Calculate',
      remaining: 'Still in your system', at: 'at', unit: 'mg',
      belowThreshold: 'Drops below 50 mg at', halfLifeNote: 'Half-life used: 5 hours',
      timeline: 'Over time', hoursCol: 'Hours after', mgCol: 'Caffeine left',
      p1: 'Brewed coffee', p2: 'Espresso', p3: 'Instant coffee', p4: 'Energy drink',
      p5: 'Cola (can)', p6: 'Black tea', p7: 'Green tea', p8: 'Decaf coffee', p9: 'Custom',
      note: 'Uses an average half-life of 5 hours. Individual clearance ranges from about 1.5 to 9.5 hours.',
    },
  },
  es: {
    title: 'Calculadora de vida media de la cafeína',
    desc: 'Cuánta cafeína te queda a la hora de dormir y cuándo baja del nivel que altera el sueño',
    short: 'Cafeína restante al acostarte',
    intro: [
      {
        h: 'La mitad cada cinco horas',
        p: 'La cafeína tiene una vida media de unas cinco horas en un adulto típico: un café de 150 mg deja aún unos 75 mg a las cinco horas y 37 mg a las diez. Un café de tarde sigue, por tanto, presente de forma medible a medianoche, lo notes o no.',
      },
      {
        h: 'No notarla no es lo mismo que haberla eliminado',
        p: 'La tolerancia embota la sensación mucho antes de que la cafeína se vaya. Los estudios de sueño encuentran que tomarla seis horas antes de acostarse acorta el sueño total y reduce el sueño profundo, incluso en quienes dicen dormirse sin problema. Lo que notas y lo que hace son preguntas distintas.',
      },
      {
        h: 'Cinco horas es un promedio, no tu número',
        p: 'Las vidas medias individuales van de unas 1,5 a 9,5 horas. Fumar acelera la eliminación; el embarazo y algunos anticonceptivos orales la frenan mucho, a veces duplicándola. Si la cafeína te pega raro de fuerte o de largo, la explicación metabólica es real.',
      },
    ],
    faq: [
      { q: '¿Qué es el umbral de 50 mg?', a: 'Una regla aproximada del nivel por debajo del cual es poco probable que la cafeína altere mucho el sueño. Es un marcador orientativo, no un corte clínico, y quien sea sensible notará menos de eso.' },
      { q: '¿Cuánta cafeína es segura al día?', a: 'La mayoría de autoridades sanitarias sitúan en torno a 400 mg la cifra para adultos sanos, unos dos o tres cafés de filtro. En el embarazo el límite es menor, en general unos 200 mg.' },
      { q: '¿El descafeinado no lleva nada?', a: 'Lleva un poco: normalmente unos pocos miligramos por taza, no cero. Solo cuenta si bebes mucho y a última hora.' },
    ],
    ui: {
      section: 'Tu consumo', source: 'Bebida', amount: 'Cafeína (mg)', time: 'Hora en que la tomaste',
      after: 'Comprobar dentro de (horas)', calc: 'Calcular',
      remaining: 'Todavía en tu cuerpo', at: 'a las', unit: 'mg',
      belowThreshold: 'Baja de 50 mg a las', halfLifeNote: 'Vida media usada: 5 horas',
      timeline: 'A lo largo del tiempo', hoursCol: 'Horas después', mgCol: 'Cafeína restante',
      p1: 'Café de filtro', p2: 'Espresso', p3: 'Café instantáneo', p4: 'Bebida energética',
      p5: 'Cola (lata)', p6: 'Té negro', p7: 'Té verde', p8: 'Café descafeinado', p9: 'Personalizado',
      note: 'Usa una vida media media de 5 horas. La eliminación individual va de unas 1,5 a 9,5 horas.',
    },
  },
  'pt-br': {
    title: 'Calculadora de meia-vida da cafeína',
    desc: 'Quanta cafeína ainda resta na hora de dormir e quando ela cai abaixo do nível que atrapalha o sono',
    short: 'Cafeína restante na hora de dormir',
    intro: [
      {
        h: 'Metade a cada cinco horas',
        p: 'A cafeína tem meia-vida de cerca de cinco horas num adulto típico: um café de 150 mg ainda deixa uns 75 mg após cinco horas e 37 mg após dez. Um café da tarde, portanto, continua mensuravelmente presente à meia-noite, você sentindo ou não.',
      },
      {
        h: 'Não sentir não é o mesmo que ter eliminado',
        p: 'A tolerância apaga a sensação bem antes de a cafeína sair. Estudos de sono mostram que cafeína tomada seis horas antes de deitar ainda encurta o sono total e reduz o sono profundo, mesmo em quem diz pegar no sono sem dificuldade. O que você percebe e o que ela faz são perguntas diferentes.',
      },
      {
        h: 'Cinco horas é média, não é o seu número',
        p: 'As meias-vidas individuais vão de cerca de 1,5 a 9,5 horas. Fumar acelera a eliminação; gravidez e alguns anticoncepcionais orais desaceleram bastante, às vezes dobrando o tempo. Se a cafeína te atinge forte ou longo demais, a explicação metabólica é real.',
      },
    ],
    faq: [
      { q: 'O que é o limiar de 50 mg?', a: 'Uma regra prática para o nível abaixo do qual a cafeína dificilmente atrapalha muito o sono. É um marcador aproximado, não um corte clínico, e quem é sensível vai notar menos que isso.' },
      { q: 'Quanta cafeína é segura por dia?', a: 'A maioria das autoridades de saúde coloca em torno de 400 mg para adultos saudáveis — algo como dois a três cafés coados. Na gravidez o limite é menor, em geral cerca de 200 mg.' },
      { q: 'Descafeinado não tem nada?', a: 'Tem um pouco: normalmente alguns miligramas por xícara, não zero. Só pesa se você tomar muito e tarde.' },
    ],
    ui: {
      section: 'Seu consumo', source: 'Bebida', amount: 'Cafeína (mg)', time: 'Hora em que tomou',
      after: 'Verificar depois de (horas)', calc: 'Calcular',
      remaining: 'Ainda no organismo', at: 'às', unit: 'mg',
      belowThreshold: 'Cai abaixo de 50 mg às', halfLifeNote: 'Meia-vida usada: 5 horas',
      timeline: 'Ao longo do tempo', hoursCol: 'Horas depois', mgCol: 'Cafeína restante',
      p1: 'Café coado', p2: 'Espresso', p3: 'Café solúvel', p4: 'Energético',
      p5: 'Refrigerante de cola (lata)', p6: 'Chá preto', p7: 'Chá verde', p8: 'Café descafeinado', p9: 'Personalizado',
      note: 'Usa meia-vida média de 5 horas. A eliminação individual varia de cerca de 1,5 a 9,5 horas.',
    },
  },
  ja: {
    title: 'カフェインの半減期計算機',
    desc: '就寝時にカフェインがどれだけ残っているか、睡眠に響く水準を下回るのはいつかを出します',
    short: '就寝時に残るカフェイン',
    intro: [
      {
        h: '5時間ごとに半分',
        p: 'カフェインの半減期は成人でおよそ5時間です。150mgのコーヒーなら5時間後に約75mg、10時間後に約37mgが残ります。午後のコーヒーは、感じるかどうかとは別に、深夜になっても測れる量が体内にあるということです。',
      },
      {
        h: '感じないことと、抜けたことは別です',
        p: '耐性ができると、カフェインが抜けるずっと前に感覚のほうが鈍ります。睡眠の研究では、就寝6時間前のカフェインでも総睡眠時間が短くなり深い睡眠が減ることが示されています。寝つきに問題を感じない人でもです。自覚と作用は別の問いです。',
      },
      {
        h: '5時間は平均で、あなたの値ではありません',
        p: '個人差は1.5〜9.5時間ほどあります。喫煙は分解を速め、妊娠中や一部の経口避妊薬は大きく遅らせ、倍近くになることもあります。カフェインの効きが妙に強い・長いと感じるなら、代謝という説明は実在します。',
      },
    ],
    faq: [
      { q: '50mgという線は何ですか。', a: 'これを下回れば睡眠への影響は大きくないだろう、とよく言われる目安です。臨床の基準ではなく大まかな目印で、カフェインに敏感な人はそれ以下でも感じます。' },
      { q: '一日にどれくらいまでなら安全ですか。', a: '多くの保健当局は健康な成人でおよそ400mgを目安に置いています。ドリップコーヒーで2〜3杯ほどです。妊娠中はより低く、一般に200mg程度とされます。' },
      { q: 'デカフェはゼロですか。', a: 'ゼロではなく、1杯に数mg程度は入っています。遅い時間に大量に飲むのでなければ気にする量ではありません。' },
    ],
    ui: {
      section: '摂取の条件', source: '飲みもの', amount: 'カフェイン量 (mg)', time: '飲んだ時刻',
      after: '何時間後を見るか', calc: '計算する',
      remaining: '体内に残る量', at: '時点', unit: 'mg',
      belowThreshold: '50mgを下回る時刻', halfLifeNote: '半減期は5時間として計算',
      timeline: '時間ごとの推移', hoursCol: '経過時間', mgCol: '残量',
      p1: 'ドリップコーヒー', p2: 'エスプレッソ', p3: 'インスタントコーヒー', p4: 'エナジードリンク',
      p5: 'コーラ (1缶)', p6: '紅茶', p7: '緑茶', p8: 'デカフェ', p9: '自分で入力',
      note: '半減期5時間の平均値で計算しています。個人差は1.5〜9.5時間ほどあります。',
    },
  },
  de: {
    title: 'Koffein-Halbwertszeit-Rechner',
    desc: 'Wie viel Koffein zur Schlafenszeit noch im Körper ist und wann es unter die schlafstörende Menge fällt',
    short: 'Restkoffein zur Schlafenszeit',
    intro: [
      {
        h: 'Alle fünf Stunden die Hälfte',
        p: 'Koffein hat bei Erwachsenen eine Halbwertszeit von rund fünf Stunden: Von einem Kaffee mit 150 mg sind nach fünf Stunden noch etwa 75 mg übrig, nach zehn noch 37 mg. Ein Nachmittagskaffee ist also um Mitternacht messbar vorhanden — ob man ihn spürt oder nicht.',
      },
      {
        h: 'Nichts zu spüren heißt nicht, dass es weg ist',
        p: 'Toleranz dämpft die Empfindung lange bevor das Koffein verschwindet. Schlafstudien zeigen, dass Koffein sechs Stunden vor dem Zubettgehen die Gesamtschlafzeit verkürzt und den Tiefschlaf verringert, selbst bei Menschen, die problemlos einschlafen. Was man merkt und was es bewirkt, sind zwei Fragen.',
      },
      {
        h: 'Fünf Stunden ist ein Mittelwert, nicht Ihr Wert',
        p: 'Individuell reicht die Halbwertszeit von etwa 1,5 bis 9,5 Stunden. Rauchen beschleunigt den Abbau; Schwangerschaft und manche oralen Kontrazeptiva verlangsamen ihn erheblich, mitunter auf das Doppelte. Wenn Koffein bei Ihnen ungewöhnlich stark oder lange wirkt, ist die Stoffwechsel-Erklärung eine echte.',
      },
    ],
    faq: [
      { q: 'Was bedeutet die Schwelle von 50 mg?', a: 'Eine verbreitete Faustregel für den Wert, unterhalb dessen Koffein den Schlaf wahrscheinlich kaum noch stört. Sie ist ein grober Merkposten, keine klinische Grenze; empfindliche Menschen merken auch weniger.' },
      { q: 'Wie viel Koffein am Tag ist unbedenklich?', a: 'Die meisten Gesundheitsbehörden nennen für gesunde Erwachsene rund 400 mg — etwa zwei bis drei Filterkaffees. In der Schwangerschaft gilt weniger, meist um 200 mg.' },
      { q: 'Ist entkoffeinierter Kaffee koffeinfrei?', a: 'Nicht ganz — üblich sind wenige Milligramm je Tasse statt null. Ins Gewicht fällt das nur, wenn man spät sehr viel davon trinkt.' },
    ],
    ui: {
      section: 'Ihre Aufnahme', source: 'Getränk', amount: 'Koffein (mg)', time: 'Uhrzeit der Aufnahme',
      after: 'Prüfen nach (Stunden)', calc: 'Berechnen',
      remaining: 'Noch im Körper', at: 'um', unit: 'mg',
      belowThreshold: 'Fällt unter 50 mg um', halfLifeNote: 'Gerechnet mit 5 Stunden Halbwertszeit',
      timeline: 'Im Zeitverlauf', hoursCol: 'Stunden danach', mgCol: 'Restkoffein',
      p1: 'Filterkaffee', p2: 'Espresso', p3: 'Löslicher Kaffee', p4: 'Energydrink',
      p5: 'Cola (Dose)', p6: 'Schwarzer Tee', p7: 'Grüner Tee', p8: 'Entkoffeinierter Kaffee', p9: 'Eigener Wert',
      note: 'Rechnet mit einer mittleren Halbwertszeit von 5 Stunden. Individuell sind es etwa 1,5 bis 9,5 Stunden.',
    },
  },
  fr: {
    title: 'Calculateur de demi-vie de la caféine',
    desc: 'Combien de caféine reste au coucher et quand elle passe sous le niveau qui perturbe le sommeil',
    short: 'Caféine restante au coucher',
    intro: [
      {
        h: 'La moitié toutes les cinq heures',
        p: 'La caféine a une demi-vie d’environ cinq heures chez l’adulte : un café de 150 mg en laisse encore quelque 75 mg au bout de cinq heures et 37 mg au bout de dix. Un café de l’après-midi est donc encore mesurablement présent à minuit, qu’on le sente ou non.',
      },
      {
        h: 'Ne rien sentir n’est pas l’avoir éliminée',
        p: 'La tolérance émousse la sensation bien avant que la caféine ne parte. Les études du sommeil montrent qu’une prise six heures avant le coucher raccourcit encore le sommeil total et réduit le sommeil profond, y compris chez des gens qui s’endorment sans peine. Ce qu’on ressent et ce qu’elle fait sont deux questions.',
      },
      {
        h: 'Cinq heures est une moyenne, pas votre chiffre',
        p: 'Les demi-vies individuelles vont d’environ 1,5 à 9,5 heures. Le tabac accélère l’élimination ; la grossesse et certains contraceptifs oraux la ralentissent nettement, parfois du double. Si la caféine vous frappe fort ou longtemps, l’explication métabolique est réelle.',
      },
    ],
    faq: [
      { q: 'Que vaut ce seuil de 50 mg ?', a: 'Une règle empirique pour le niveau sous lequel la caféine ne perturbe sans doute plus beaucoup le sommeil. C’est un repère grossier et non un seuil clinique : les personnes sensibles ressentent moins que cela.' },
      { q: 'Quelle quantité par jour est sans danger ?', a: 'La plupart des autorités sanitaires retiennent environ 400 mg pour un adulte en bonne santé, soit deux à trois cafés filtre. Pendant la grossesse la limite est plus basse, en général autour de 200 mg.' },
      { q: 'Le décaféiné en est-il dépourvu ?', a: 'Pas tout à fait : quelques milligrammes par tasse plutôt que zéro. Cela ne compte que si l’on en boit beaucoup et tard.' },
    ],
    ui: {
      section: 'Votre prise', source: 'Boisson', amount: 'Caféine (mg)', time: 'Heure de la prise',
      after: 'Vérifier après (heures)', calc: 'Calculer',
      remaining: 'Encore dans l’organisme', at: 'à', unit: 'mg',
      belowThreshold: 'Passe sous 50 mg à', halfLifeNote: 'Demi-vie retenue : 5 heures',
      timeline: 'Au fil des heures', hoursCol: 'Heures après', mgCol: 'Caféine restante',
      p1: 'Café filtre', p2: 'Expresso', p3: 'Café instantané', p4: 'Boisson énergisante',
      p5: 'Cola (canette)', p6: 'Thé noir', p7: 'Thé vert', p8: 'Café décaféiné', p9: 'Valeur libre',
      note: 'Calcul sur une demi-vie moyenne de 5 heures. L’élimination individuelle va de 1,5 à 9,5 heures environ.',
    },
  },
  hi: {
    title: 'कैफ़ीन अर्ध-आयु कैलकुलेटर',
    desc: 'सोने के वक़्त कितनी कैफ़ीन बची रहेगी, और वह नींद बिगाड़ने वाले स्तर से कब नीचे जाएगी',
    short: 'सोते समय बची कैफ़ीन',
    intro: [
      {
        h: 'हर पाँच घंटे में आधी',
        p: 'सामान्य वयस्क में कैफ़ीन की अर्ध-आयु लगभग पाँच घंटे है: 150 मिग्रा वाली कॉफ़ी में से पाँच घंटे बाद क़रीब 75 मिग्रा और दस घंटे बाद 37 मिग्रा बची रहती है। यानी दोपहर की कॉफ़ी आधी रात को भी नापने लायक़ मात्रा में मौजूद है — आप महसूस करें या न करें।',
      },
      {
        h: 'महसूस न होना और निकल जाना अलग बातें हैं',
        p: 'सहनशीलता उस अहसास को कैफ़ीन के निकलने से बहुत पहले भोथरा कर देती है। नींद के अध्ययन बताते हैं कि सोने से छह घंटे पहले ली गई कैफ़ीन भी कुल नींद घटाती है और गहरी नींद काटती है — उन लोगों में भी जो कहते हैं कि नींद आने में कोई दिक़्क़त नहीं। जो आप महसूस करते हैं और जो वह करती है, ये दो अलग सवाल हैं।',
      },
      {
        h: 'पाँच घंटे औसत है, आपका आंकड़ा नहीं',
        p: 'व्यक्तियों में अर्ध-आयु लगभग 1.5 से 9.5 घंटे तक जाती है। धूम्रपान निकासी तेज़ करता है; गर्भावस्था और कुछ गर्भनिरोधक गोलियाँ इसे बहुत धीमा कर देती हैं, कभी-कभी दोगुना। अगर कैफ़ीन आप पर असामान्य रूप से तेज़ या लंबी चलती है, तो चयापचय वाली व्याख्या सचमुच की है।',
      },
    ],
    faq: [
      { q: '50 मिग्रा की सीमा क्या है?', a: 'एक आम मोटा नियम — इससे नीचे कैफ़ीन नींद को बहुत बिगाड़ने की संभावना कम है। यह नैदानिक कट-ऑफ़ नहीं, मोटा निशान है; संवेदनशील लोग इससे कम पर भी महसूस करेंगे।' },
      { q: 'दिन में कितनी कैफ़ीन सुरक्षित है?', a: 'ज़्यादातर स्वास्थ्य प्राधिकरण स्वस्थ वयस्कों के लिए लगभग 400 मिग्रा बताते हैं — क़रीब दो से तीन कप छनी हुई कॉफ़ी। गर्भावस्था में सीमा कम है, आमतौर पर लगभग 200 मिग्रा।' },
      { q: 'क्या डिकैफ़ में कुछ भी नहीं होता?', a: 'थोड़ी होती है — शून्य नहीं, आमतौर पर हर कप में कुछ मिलीग्राम। यह तभी मायने रखती है जब आप देर रात बहुत ज़्यादा पिएँ।' },
    ],
    ui: {
      section: 'आपका सेवन', source: 'पेय', amount: 'कैफ़ीन (मिग्रा)', time: 'पीने का समय',
      after: 'कितने घंटे बाद देखें', calc: 'गणना करें',
      remaining: 'अब भी शरीर में', at: 'बजे', unit: 'मिग्रा',
      belowThreshold: '50 मिग्रा से नीचे जाने का समय', halfLifeNote: 'अर्ध-आयु 5 घंटे मानकर',
      timeline: 'समय के साथ', hoursCol: 'कितने घंटे बाद', mgCol: 'बची कैफ़ीन',
      p1: 'छनी हुई कॉफ़ी', p2: 'एस्प्रेसो', p3: 'इंस्टेंट कॉफ़ी', p4: 'एनर्जी ड्रिंक',
      p5: 'कोला (एक कैन)', p6: 'काली चाय', p7: 'हरी चाय', p8: 'डिकैफ़ कॉफ़ी', p9: 'ख़ुद भरें',
      note: '5 घंटे की औसत अर्ध-आयु से गणना। हर व्यक्ति में यह लगभग 1.5 से 9.5 घंटे तक होती है।',
    },
  },
  'zh-hans': {
    title: '咖啡因半衰期计算器',
    desc: '睡觉时体内还剩多少咖啡因，什么时候降到不影响睡眠的水平',
    short: '睡前残留的咖啡因',
    intro: [
      {
        h: '每五小时减一半',
        p: '成年人体内咖啡因的半衰期大约是五小时：一杯 150 毫克的咖啡，五小时后还剩约 75 毫克，十小时后约 37 毫克。也就是说，下午那杯咖啡到了半夜仍然有可测量的残留，不管你感觉得到与否。',
      },
      {
        h: '感觉不到，不等于已经代谢掉',
        p: '耐受会让感觉早早变钝，而咖啡因还远没有离开。睡眠研究发现，睡前六小时摄入的咖啡因仍会缩短总睡眠时间、减少深睡眠——即使在那些自称"倒头就睡"的人身上也是如此。你感觉到什么，和它做了什么，是两个问题。',
      },
      {
        h: '五小时是平均值，不是你的值',
        p: '个体半衰期从大约 1.5 小时到 9.5 小时不等。吸烟会加快清除；怀孕和某些口服避孕药则显著减慢，有时接近翻倍。如果咖啡因对你格外强、格外久，代谢这个解释是真实存在的。',
      },
    ],
    faq: [
      { q: '50 毫克这条线是什么？', a: '一个常用的粗略标准：低于这个量，咖啡因大概不太会明显干扰睡眠。它是个大致的记号，不是临床界值；对咖啡因敏感的人，更低也会有感觉。' },
      { q: '一天摄入多少算安全？', a: '多数卫生机构给健康成年人的参考值在 400 毫克左右——大约两三杯滤泡咖啡。孕期上限更低，一般在 200 毫克左右。' },
      { q: '低因咖啡是不是完全没有？', a: '不是完全没有——通常每杯还有几毫克。只有在很晚还喝很多的时候才需要在意。' },
    ],
    ui: {
      section: '你的摄入', source: '饮品', amount: '咖啡因 (mg)', time: '喝下的时间',
      after: '查看几小时后', calc: '计算',
      remaining: '体内残留', at: '时', unit: 'mg',
      belowThreshold: '降到 50 mg 以下的时间', halfLifeNote: '按半衰期 5 小时计算',
      timeline: '随时间变化', hoursCol: '经过小时', mgCol: '剩余咖啡因',
      p1: '滤泡咖啡', p2: '浓缩咖啡', p3: '速溶咖啡', p4: '能量饮料',
      p5: '可乐（一罐）', p6: '红茶', p7: '绿茶', p8: '低因咖啡', p9: '自己填',
      note: '按 5 小时的平均半衰期计算。个体清除速度在 1.5 到 9.5 小时之间。',
    },
  },
  'zh-hant': {
    title: '咖啡因半衰期計算機',
    desc: '睡覺時體內還剩多少咖啡因，什麼時候降到不影響睡眠的水準',
    short: '睡前殘留的咖啡因',
    intro: [
      {
        h: '每五小時減一半',
        p: '成年人體內咖啡因的半衰期大約是五小時：一杯 150 毫克的咖啡，五小時後還剩約 75 毫克，十小時後約 37 毫克。也就是說，下午那杯咖啡到了半夜仍然有可測量的殘留，不管你感覺得到與否。',
      },
      {
        h: '感覺不到，不等於已經代謝掉',
        p: '耐受會讓感覺早早變鈍，而咖啡因還遠沒有離開。睡眠研究發現，睡前六小時攝取的咖啡因仍會縮短總睡眠時間、減少深睡眠——即使在那些自稱「倒頭就睡」的人身上也是如此。你感覺到什麼，和它做了什麼，是兩個問題。',
      },
      {
        h: '五小時是平均值，不是你的值',
        p: '個體半衰期從大約 1.5 小時到 9.5 小時不等。抽菸會加快清除；懷孕和某些口服避孕藥則顯著減慢，有時接近翻倍。如果咖啡因對你格外強、格外久，代謝這個解釋是真實存在的。',
      },
    ],
    faq: [
      { q: '50 毫克這條線是什麼？', a: '一個常用的粗略標準：低於這個量，咖啡因大概不太會明顯干擾睡眠。它是個大致的記號，不是臨床界值；對咖啡因敏感的人，更低也會有感覺。' },
      { q: '一天攝取多少算安全？', a: '多數衛生機構給健康成年人的參考值在 400 毫克左右——大約兩三杯濾泡咖啡。孕期上限更低，一般在 200 毫克左右。' },
      { q: '低因咖啡是不是完全沒有？', a: '不是完全沒有——通常每杯還有幾毫克。只有在很晚還喝很多的時候才需要在意。' },
    ],
    ui: {
      section: '你的攝取', source: '飲品', amount: '咖啡因 (mg)', time: '喝下的時間',
      after: '查看幾小時後', calc: '計算',
      remaining: '體內殘留', at: '時', unit: 'mg',
      belowThreshold: '降到 50 mg 以下的時間', halfLifeNote: '按半衰期 5 小時計算',
      timeline: '隨時間變化', hoursCol: '經過小時', mgCol: '剩餘咖啡因',
      p1: '濾泡咖啡', p2: '義式濃縮', p3: '即溶咖啡', p4: '能量飲料',
      p5: '可樂（一罐）', p6: '紅茶', p7: '綠茶', p8: '低因咖啡', p9: '自己填',
      note: '按 5 小時的平均半衰期計算。個體清除速度在 1.5 到 9.5 小時之間。',
    },
  },
};
