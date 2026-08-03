import type { CalcTable } from './types.ts';

/**
 * 학점(GPA).
 *
 * 성적 체계는 나라마다 갈리는 몇 안 되는 예다. 한국어판은 4.5 하나만 쓰지만
 * 여기서는 4.0(미국 표준)·4.3·4.5를 고를 수 있게 했다. 백분율, 인도의 10점
 * CGPA, 독일의 1~5(작을수록 좋음)처럼 아예 다른 체계는 이 표에 얹히지 않는다
 * — 그 사실은 FAQ에 적어 뒀다.
 */
export const GPA: CalcTable = {
  en: {
    title: 'GPA calculator',
    desc: 'Grade point average weighted by credits, on the 4.0, 4.3 or 4.5 scale',
    short: 'Credit-weighted GPA',
    intro: [
      {
        h: 'Credits do the weighting',
        p: 'GPA is total grade points divided by total credits, not the average of your grades. A four-credit course pulls twice as hard as a two-credit one, which is why a poor result in a big module costs more than the same result in a small one.',
      },
      {
        h: 'Pick the scale your institution uses',
        p: 'A 4.0 scale caps an A at 4.0; a 4.3 scale gives A+ a value above A; a 4.5 scale spaces the grades differently again. The same transcript produces different numbers on each, so comparing a GPA without naming the scale means nothing.',
      },
      {
        h: 'Pass/fail courses sit outside',
        p: 'Courses graded pass/fail usually count towards credits earned but not towards the average, since there is no grade point to weight. Leave them out here; including them as a top grade flatters the result.',
      },
    ],
    faq: [
      { q: 'How do I convert to another country\'s system?', a: 'You mostly cannot, at least not reliably. Percentage marks, India\'s 10-point CGPA and Germany\'s 1–5 scale, where lower is better, are built on different distributions. Admissions offices convert using their own tables rather than a formula.' },
      { q: 'Does a retake replace the original grade?', a: 'That depends on the institution. Some replace it, some average both, some keep both on the transcript and count only the higher. Check the rule before assuming a retake erases anything.' },
      { q: 'How much does one bad grade matter?', a: 'Less than it feels, and less as you accumulate credits. A single C among thirty credits moves the average by a little; the same C among six credits moves it a lot. The early terms carry the most weight per grade.' },
    ],
    ui: {
      section: 'Your courses', scale: 'Grading scale', course: 'Course', credits: 'Credits', grade: 'Grade',
      add: '+ Add a course', calc: 'Calculate',
      gpa: 'GPA', totalCredits: 'Total credits', totalPoints: 'Grade points',
      note: 'Weighted by credits. Pass/fail courses should be left out.',
    },
  },
  es: {
    title: 'Calculadora de nota media (GPA)',
    desc: 'Nota media ponderada por créditos, en escala 4,0, 4,3 o 4,5',
    short: 'GPA ponderado por créditos',
    intro: [
      {
        h: 'Los créditos hacen la ponderación',
        p: 'El GPA son los puntos totales divididos entre los créditos totales, no la media de tus notas. Una asignatura de cuatro créditos tira el doble que una de dos, y por eso un mal resultado en una asignatura grande cuesta más que el mismo resultado en una pequeña.',
      },
      {
        h: 'Elige la escala de tu centro',
        p: 'Una escala de 4,0 tope la A en 4,0; una de 4,3 da a la A+ un valor por encima de la A; una de 4,5 separa las notas de otro modo. El mismo expediente da números distintos en cada una, así que comparar un GPA sin decir la escala no significa nada.',
      },
      {
        h: 'Las asignaturas apto/no apto quedan fuera',
        p: 'Las asignaturas calificadas como apto/no apto suelen contar para los créditos superados pero no para la media, porque no hay puntuación que ponderar. Déjalas fuera aquí; incluirlas como sobresaliente maquilla el resultado.',
      },
    ],
    faq: [
      { q: '¿Cómo lo convierto al sistema de otro país?', a: 'En general no se puede, al menos no de forma fiable. Las notas porcentuales, el CGPA sobre 10 de la India y la escala alemana de 1 a 5, donde menos es mejor, parten de distribuciones distintas. Las oficinas de admisión convierten con sus propias tablas, no con una fórmula.' },
      { q: '¿Una asignatura repetida sustituye la nota anterior?', a: 'Depende del centro. Algunos la sustituyen, otros promedian ambas, otros dejan las dos en el expediente y cuentan solo la mayor. Comprueba la norma antes de dar por hecho que repetir borra algo.' },
      { q: '¿Cuánto pesa una mala nota?', a: 'Menos de lo que parece, y menos según acumulas créditos. Un aprobado raspado entre treinta créditos mueve poco la media; el mismo entre seis créditos la mueve mucho. Los primeros cursos son los que más pesan por nota.' },
    ],
    ui: {
      section: 'Tus asignaturas', scale: 'Escala de calificación', course: 'Asignatura', credits: 'Créditos', grade: 'Nota',
      add: '+ Añadir asignatura', calc: 'Calcular',
      gpa: 'Nota media', totalCredits: 'Créditos totales', totalPoints: 'Puntos',
      note: 'Ponderado por créditos. Las asignaturas apto/no apto deben quedar fuera.',
    },
  },
  'pt-br': {
    title: 'Calculadora de coeficiente de rendimento (GPA)',
    desc: 'Média ponderada por créditos, nas escalas 4,0, 4,3 ou 4,5',
    short: 'GPA ponderado por créditos',
    intro: [
      {
        h: 'São os créditos que fazem o peso',
        p: 'O GPA é o total de pontos dividido pelo total de créditos, não a média das suas notas. Uma disciplina de quatro créditos puxa o dobro de uma de dois — por isso um resultado ruim numa disciplina pesada custa mais que o mesmo resultado numa leve.',
      },
      {
        h: 'Escolha a escala da sua instituição',
        p: 'Uma escala de 4,0 limita o A em 4,0; uma de 4,3 dá ao A+ um valor acima do A; uma de 4,5 espaça as notas de outro jeito. O mesmo histórico produz números diferentes em cada uma, então comparar GPA sem dizer a escala não significa nada.',
      },
      {
        h: 'Disciplinas com conceito passou/não passou ficam de fora',
        p: 'Elas normalmente contam para os créditos cumpridos, mas não para a média, já que não há pontuação a ponderar. Deixe-as de fora aqui; incluí-las como nota máxima embeleza o resultado.',
      },
    ],
    faq: [
      { q: 'Como converto para o sistema de outro país?', a: 'Em geral não dá, pelo menos não de forma confiável. Notas percentuais, o CGPA de 10 pontos da Índia e a escala alemã de 1 a 5, em que menor é melhor, partem de distribuições diferentes. As bancas de admissão convertem com tabelas próprias, não com uma fórmula.' },
      { q: 'Refazer a disciplina substitui a nota antiga?', a: 'Depende da instituição. Algumas substituem, outras tiram a média das duas, outras mantêm ambas no histórico e contam só a maior. Confira a regra antes de supor que refazer apaga alguma coisa.' },
      { q: 'Quanto pesa uma nota ruim?', a: 'Menos do que parece, e menos conforme os créditos se acumulam. Um C no meio de trinta créditos move pouco a média; o mesmo C em seis créditos move muito. Os primeiros períodos pesam mais por nota.' },
    ],
    ui: {
      section: 'Suas disciplinas', scale: 'Escala de notas', course: 'Disciplina', credits: 'Créditos', grade: 'Conceito',
      add: '+ Adicionar disciplina', calc: 'Calcular',
      gpa: 'GPA', totalCredits: 'Créditos totais', totalPoints: 'Pontos',
      note: 'Ponderado por créditos. Disciplinas passou/não passou devem ficar de fora.',
    },
  },
  ja: {
    title: 'GPAの計算機',
    desc: '単位数で重みづけしたGPAを、4.0・4.3・4.5のいずれかの尺度で',
    short: '単位で重みづけしたGPA',
    intro: [
      {
        h: '重みをつけるのは単位数です',
        p: 'GPAは総評点を総単位数で割ったもので、成績の平均ではありません。4単位の科目は2単位の科目の2倍効きます。大きい科目でつまずくほうが、同じ成績でも小さい科目より高くつくのはこのためです。',
      },
      {
        h: '在籍先が使っている尺度を選んでください',
        p: '4.0尺度はAが上限4.0、4.3尺度はA+がAより上、4.5尺度は成績の間隔がまた別です。同じ成績表でも尺度ごとに違う数字になるので、どの尺度かを言わずにGPAを比べても意味がありません。',
      },
      {
        h: '合否のみの科目は外れます',
        p: '合否で評価される科目は、修得単位には数えても平均には入らないのがふつうです。重みづけすべき評点がないからです。ここでも外してください。最高評価として入れると結果が実際より良く出ます。',
      },
    ],
    faq: [
      { q: '他国の制度に換算するには。', a: 'ほとんどの場合、確実な換算はできません。百分率評価、インドの10点満点CGPA、数字が小さいほど良いドイツの1〜5は、そもそも分布が違います。入学審査は数式ではなく各機関の対照表で読み替えます。' },
      { q: '再履修すると前の成績は消えますか。', a: '学校によります。置き換えるところ、両方を平均するところ、両方を成績表に残して高いほうだけ算入するところがあります。消えると決めてかかる前に規定を確かめてください。' },
      { q: '悪い成績ひとつはどのくらい響きますか。', a: '感じるほどではなく、単位が積み上がるほど響かなくなります。30単位のなかのCひとつは平均をわずかしか動かしませんが、6単位のなかの同じCは大きく動かします。1科目あたりの重みは最初の学期がいちばん大きいということです。' },
    ],
    ui: {
      section: '履修科目', scale: '評価尺度', course: '科目名', credits: '単位数', grade: '評価',
      add: '+ 科目を追加', calc: '計算する',
      gpa: 'GPA', totalCredits: '総単位数', totalPoints: '総評点',
      note: '単位数で重みづけします。合否のみの科目は外してください。',
    },
  },
  de: {
    title: 'GPA-Rechner',
    desc: 'Nach Leistungspunkten gewichteter Notendurchschnitt auf der Skala 4,0, 4,3 oder 4,5',
    short: 'Nach Credits gewichteter GPA',
    intro: [
      {
        h: 'Gewichtet wird über die Credits',
        p: 'Der GPA ist die Summe der Notenpunkte geteilt durch die Summe der Credits, nicht der Mittelwert Ihrer Noten. Ein Modul mit vier Credits zieht doppelt so stark wie eines mit zwei — deshalb kostet ein schwaches Ergebnis in einem großen Modul mehr als dasselbe Ergebnis in einem kleinen.',
      },
      {
        h: 'Nehmen Sie die Skala Ihrer Hochschule',
        p: 'Eine 4,0-Skala deckelt A bei 4,0; eine 4,3-Skala setzt A+ über A; eine 4,5-Skala verteilt die Noten wieder anders. Dasselbe Zeugnis ergibt auf jeder eine andere Zahl — einen GPA ohne Angabe der Skala zu vergleichen sagt nichts.',
      },
      {
        h: 'Bestanden/nicht bestanden bleibt draußen',
        p: 'Solche Module zählen meist für die erworbenen Credits, nicht aber für den Durchschnitt, weil es keine Notenpunkte zu gewichten gibt. Lassen Sie sie hier weg; als Bestnote eingetragen schönen sie das Ergebnis.',
      },
    ],
    faq: [
      { q: 'Wie rechne ich das in ein anderes Landessystem um?', a: 'Meist gar nicht, jedenfalls nicht verlässlich. Prozentnoten, Indiens 10-Punkte-CGPA und die deutsche 1–5-Skala, bei der niedriger besser ist, beruhen auf verschiedenen Verteilungen. Zulassungsstellen rechnen mit eigenen Tabellen um, nicht mit einer Formel.' },
      { q: 'Ersetzt eine Wiederholung die alte Note?', a: 'Das hängt von der Hochschule ab. Manche ersetzen, manche mitteln beide, manche führen beide im Zeugnis und werten nur die bessere. Prüfen Sie die Regel, bevor Sie annehmen, eine Wiederholung lösche etwas.' },
      { q: 'Wie stark wiegt eine schlechte Note?', a: 'Weniger, als es sich anfühlt — und immer weniger, je mehr Credits sich sammeln. Ein C unter dreißig Credits verschiebt den Schnitt kaum, dasselbe C unter sechs Credits deutlich. Die ersten Semester wiegen je Note am schwersten.' },
    ],
    ui: {
      section: 'Ihre Module', scale: 'Notenskala', course: 'Modul', credits: 'Credits', grade: 'Note',
      add: '+ Modul hinzufügen', calc: 'Berechnen',
      gpa: 'GPA', totalCredits: 'Credits gesamt', totalPoints: 'Notenpunkte',
      note: 'Gewichtet nach Credits. Module mit bestanden/nicht bestanden bleiben außen vor.',
    },
  },
  fr: {
    title: 'Calculateur de moyenne (GPA)',
    desc: 'Moyenne pondérée par les crédits, sur l’échelle 4,0, 4,3 ou 4,5',
    short: 'GPA pondéré par les crédits',
    intro: [
      {
        h: 'Ce sont les crédits qui pondèrent',
        p: 'Le GPA, c’est le total des points divisé par le total des crédits, et non la moyenne de vos notes. Un cours à quatre crédits tire deux fois plus fort qu’un cours à deux — d’où le fait qu’un mauvais résultat dans un gros module coûte plus cher que le même résultat dans un petit.',
      },
      {
        h: 'Choisissez l’échelle de votre établissement',
        p: 'Une échelle sur 4,0 plafonne le A à 4,0 ; une échelle sur 4,3 place le A+ au-dessus du A ; une échelle sur 4,5 espace encore autrement les notes. Le même relevé donne un nombre différent sur chacune : comparer un GPA sans préciser l’échelle ne veut rien dire.',
      },
      {
        h: 'Les cours validés en réussite/échec restent dehors',
        p: 'Ils comptent en général dans les crédits acquis mais pas dans la moyenne, faute de points à pondérer. Laissez-les de côté ici ; les compter comme une note maximale embellit le résultat.',
      },
    ],
    faq: [
      { q: 'Comment convertir vers le système d’un autre pays ?', a: 'En général on ne peut pas, du moins pas de façon fiable. Les notes en pourcentage, le CGPA sur 10 en Inde et l’échelle allemande de 1 à 5, où le plus bas est le meilleur, reposent sur des distributions différentes. Les services d’admission convertissent avec leurs propres tables, pas avec une formule.' },
      { q: 'Un rattrapage remplace-t-il la note initiale ?', a: 'Cela dépend de l’établissement. Certains remplacent, d’autres font la moyenne des deux, d’autres gardent les deux au relevé et ne comptent que la meilleure. Vérifiez la règle avant de supposer qu’un rattrapage efface quoi que ce soit.' },
      { q: 'Quel poids a une mauvaise note ?', a: 'Moins qu’il n’y paraît, et de moins en moins à mesure que les crédits s’accumulent. Un C parmi trente crédits déplace peu la moyenne ; le même C parmi six la déplace beaucoup. Les premiers semestres pèsent le plus par note.' },
    ],
    ui: {
      section: 'Vos cours', scale: 'Échelle de notation', course: 'Cours', credits: 'Crédits', grade: 'Note',
      add: '+ Ajouter un cours', calc: 'Calculer',
      gpa: 'Moyenne (GPA)', totalCredits: 'Crédits au total', totalPoints: 'Points',
      note: 'Pondéré par les crédits. Les cours en réussite/échec sont à exclure.',
    },
  },
  hi: {
    title: 'GPA कैलकुलेटर',
    desc: 'क्रेडिट से भारित ग्रेड औसत, 4.0, 4.3 या 4.5 पैमाने पर',
    short: 'क्रेडिट-भारित GPA',
    intro: [
      {
        h: 'भार क्रेडिट से आता है',
        p: 'GPA यानी कुल ग्रेड अंक ÷ कुल क्रेडिट, न कि आपके ग्रेडों का औसत। चार क्रेडिट वाला पाठ्यक्रम दो क्रेडिट वाले से दोगुना खींचता है — इसीलिए बड़े विषय में ख़राब नतीजा, उसी नतीजे के मुक़ाबले छोटे विषय में, ज़्यादा महँगा पड़ता है।',
      },
      {
        h: 'वही पैमाना चुनिए जो आपका संस्थान इस्तेमाल करता है',
        p: '4.0 पैमाने में A की अधिकतम सीमा 4.0 है; 4.3 पैमाने में A+ का मान A से ऊपर है; 4.5 पैमाना ग्रेडों के बीच की दूरी फिर अलग रखता है। एक ही अंकपत्र हर पैमाने पर अलग संख्या देता है, इसलिए पैमाना बताए बिना GPA मिलाने का कोई अर्थ नहीं।',
      },
      {
        h: 'पास/फेल वाले विषय बाहर रहते हैं',
        p: 'ऐसे विषय आमतौर पर अर्जित क्रेडिट में गिने जाते हैं पर औसत में नहीं, क्योंकि भार देने के लिए कोई ग्रेड अंक होता ही नहीं। यहाँ भी उन्हें छोड़ दीजिए; उन्हें सर्वोच्च ग्रेड मानकर जोड़ने से नतीजा असल से बेहतर दिखने लगता है।',
      },
    ],
    faq: [
      { q: 'किसी दूसरे देश की प्रणाली में कैसे बदलूँ?', a: 'ज़्यादातर बदला ही नहीं जा सकता, कम से कम भरोसे से नहीं। प्रतिशत अंक, भारत का 10-अंकीय CGPA और जर्मनी का 1–5 पैमाना, जहाँ कम बेहतर होता है — तीनों अलग वितरणों पर बने हैं। प्रवेश कार्यालय किसी सूत्र से नहीं, अपनी तालिकाओं से बदलते हैं।' },
      { q: 'दोबारा पढ़ने पर पुराना ग्रेड हट जाता है?', a: 'यह संस्थान पर निर्भर है। कुछ बदल देते हैं, कुछ दोनों का औसत लेते हैं, कुछ दोनों अंकपत्र में रखते हैं और सिर्फ़ ऊँचा गिनते हैं। यह मानने से पहले कि दोबारा पढ़ना कुछ मिटा देता है, नियम देख लीजिए।' },
      { q: 'एक ख़राब ग्रेड कितना असर डालता है?', a: 'जितना लगता है उससे कम, और क्रेडिट जुड़ते जाने पर और भी कम। तीस क्रेडिट के बीच एक C औसत को ज़रा-सा हिलाता है; छह क्रेडिट के बीच वही C बहुत हिलाता है। प्रति ग्रेड सबसे ज़्यादा भार शुरुआती सत्रों का होता है।' },
    ],
    ui: {
      section: 'आपके विषय', scale: 'ग्रेडिंग पैमाना', course: 'विषय', credits: 'क्रेडिट', grade: 'ग्रेड',
      add: '+ विषय जोड़ें', calc: 'गणना करें',
      gpa: 'GPA', totalCredits: 'कुल क्रेडिट', totalPoints: 'ग्रेड अंक',
      note: 'क्रेडिट से भारित। पास/फेल वाले विषय बाहर रखें।',
    },
  },
  'zh-hans': {
    title: 'GPA 计算器',
    desc: '按学分加权的平均绩点，可选 4.0、4.3 或 4.5 分制',
    short: '按学分加权的 GPA',
    intro: [
      {
        h: '加权靠的是学分',
        p: 'GPA 是总绩点除以总学分，不是你各科成绩的平均。四学分的课拉扯的力度是两学分课的两倍——所以在大课上失手，比同样的分数出现在小课上代价更大。',
      },
      {
        h: '选你学校实际使用的那套分制',
        p: '4.0 分制里 A 封顶在 4.0；4.3 分制让 A+ 高于 A；4.5 分制又把各档拉开成另一种间距。同一份成绩单在每套里得出的数字都不同，所以不说明分制就比较 GPA，等于什么都没说。',
      },
      {
        h: '通过/不通过的课程不参与',
        p: '这类课程通常计入已修学分，但不进入平均，因为根本没有绩点可以加权。这里也请把它们排除；按最高分记进去只会让结果好看得不真实。',
      },
    ],
    faq: [
      { q: '怎么换算成别国的体系？', a: '大多数情况下换算不了，至少不可靠。百分制、印度的 10 分制 CGPA，以及德国那套数字越小越好的 1–5 分制，背后的分布本就不同。招生办用的是自己的对照表，不是某个公式。' },
      { q: '重修会覆盖原来的成绩吗？', a: '看学校规定。有的直接替换，有的取两次平均，有的两次都留在成绩单上但只计较高的那次。在假定重修能抹掉什么之前，先把规定看清楚。' },
      { q: '一门差成绩影响有多大？', a: '比感觉上小，而且随着学分累积越来越小。三十个学分里的一个 C 只挪动一点点平均；六个学分里的同一个 C 挪动得很多。就单门课的权重而言，最早的那几个学期最重。' },
    ],
    ui: {
      section: '你的课程', scale: '评分制', course: '课程', credits: '学分', grade: '成绩',
      add: '+ 添加课程', calc: '计算',
      gpa: 'GPA', totalCredits: '总学分', totalPoints: '总绩点',
      note: '按学分加权。通过/不通过的课程请排除在外。',
    },
  },
  'zh-hant': {
    title: 'GPA 計算機',
    desc: '按學分加權的平均績點，可選 4.0、4.3 或 4.5 分制',
    short: '按學分加權的 GPA',
    intro: [
      {
        h: '加權靠的是學分',
        p: 'GPA 是總績點除以總學分，不是你各科成績的平均。四學分的課拉扯的力度是兩學分課的兩倍——所以在大課上失手，比同樣的分數出現在小課上代價更大。',
      },
      {
        h: '選你學校實際使用的那套分制',
        p: '4.0 分制裡 A 封頂在 4.0；4.3 分制讓 A+ 高於 A；4.5 分制又把各檔拉開成另一種間距。同一份成績單在每套裡得出的數字都不同，所以不說明分制就比較 GPA，等於什麼都沒說。',
      },
      {
        h: '通過/不通過的課程不參與',
        p: '這類課程通常計入已修學分，但不進入平均，因為根本沒有績點可以加權。這裡也請把它們排除；按最高分記進去只會讓結果好看得不真實。',
      },
    ],
    faq: [
      { q: '怎麼換算成別國的體系？', a: '大多數情況下換算不了，至少不可靠。百分制、印度的 10 分制 CGPA，以及德國那套數字越小越好的 1–5 分制，背後的分布本就不同。招生單位用的是自己的對照表，不是某個公式。' },
      { q: '重修會覆蓋原來的成績嗎？', a: '看學校規定。有的直接替換，有的取兩次平均，有的兩次都留在成績單上但只計較高的那次。在假定重修能抹掉什麼之前，先把規定看清楚。' },
      { q: '一門差成績影響有多大？', a: '比感覺上小，而且隨著學分累積越來越小。三十個學分裡的一個 C 只挪動一點點平均；六個學分裡的同一個 C 挪動得很多。就單門課的權重而言，最早的那幾個學期最重。' },
    ],
    ui: {
      section: '你的課程', scale: '評分制', course: '課程', credits: '學分', grade: '成績',
      add: '+ 新增課程', calc: '計算',
      gpa: 'GPA', totalCredits: '總學分', totalPoints: '總績點',
      note: '按學分加權。通過/不通過的課程請排除在外。',
    },
  },
};
