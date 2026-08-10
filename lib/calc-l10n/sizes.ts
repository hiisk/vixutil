import type { CalcTable } from './types.ts';

/**
 * 신발 치수 · 반려동물 나이 · 부피무게.
 *
 * 셋 다 나라를 타지 않는 계산이라 수식은 한국어판 그대로다.
 *
 * 신발: 한국어판의 대조표(mm·EU·US남성, UK = US−1, US여성 = US+1.5)를 그대로
 * 쓰되, 언어마다 그 나라 독자가 매일 쓰는 체계를 앞세워 다시 썼다 — 독·불·서는
 * EU, 영어는 US/UK, 일본어는 cm, 브라질은 BR ≈ EU−2 관행, 힌디는 UK 기반.
 *
 * 반려동물: 첫해 15 · 둘째 해 9 · 그 뒤 덩치별 4/5/6(고양이 4)을 더하는 식
 * 그대로. 한국어판 본문의 "대형견 열 살 = 예순여덟"은 식(24+6×8=72)과 어긋나서
 * 여기서는 식이 주는 값으로 적었다.
 *
 * 부피무게: lib/volumetric.ts를 그대로 쓴다. 139 in³/lb 관행은 영어 FAQ에만.
 */
export const SHOE_SIZE: CalcTable = {
  en: {
    title: 'Shoe size converter',
    desc: 'Foot length in cm or mm to US, UK and EU shoe sizes',
    short: 'Foot length to US · UK · EU sizes',
    intro: [
      {
        h: 'Start from the foot, not from a size',
        p: 'A US men’s 8 sits on a foot of about 260 mm — but the 8 counts barleycorns along the last, the form the shoe is built over, not along your foot. UK sizes count the same way from a different zero, so a US men’s 8 is a UK 7, and EU sizes step in 6.67 mm Paris points. Foot length is the only number every system shares, which is why this converter asks for it and nothing else.',
      },
      {
        h: 'Measure standing, against a wall',
        p: 'Put a sheet of paper on the floor against a wall, stand on it with your heel touching the wall, and mark the tip of your longest toe. Sitting shortens the reading. Most people’s feet differ slightly in length, so measure both and go by the longer one.',
      },
      {
        h: 'Buy 5–10 mm longer than the foot',
        p: 'Your foot slides forward with every step, so a shoe that matches your foot exactly ends up hitting the toes. Sneakers want 5–10 mm of room and running shoes about 10; dress shoes are cut closer. The green suggestion below adds about 7 mm for exactly this reason.',
      },
    ],
    faq: [
      { q: 'Why does the same size fit differently across brands?', a: 'A size describes the last, and every brand shapes its own. Two shoes marked US 9 can differ by half a size in usable length, and width often is not marked at all. Treat the chart as a starting point and the returns policy as part of the purchase.' },
      { q: 'Why measure in the evening?', a: 'Feet lengthen and widen through the day: after hours of standing and walking, load and fluid add a few millimetres. Measured in the morning, your feet will buy you shoes that pinch by dinner — measure when they are at their largest.' },
      { q: 'Caught between two sizes — up or down?', a: 'For sneakers and anything worn with thick socks, go up: the half size costs nothing but a touch of room. Going down only makes sense in shoes meant to fit snugly, such as climbing or cycling shoes.' },
    ],
    ui: {
      footLen: 'Foot length', hint: 'Enter your bare foot length, not a shoe size',
      cmCol: 'cm (JP)', usM: 'US men', usW: 'US women',
      recoTitle: 'For sneakers, take the roomier size', recoBody: 'Feet slide forward as you walk — with 5–10 mm of room, the better fit is:',
      chart: 'Size chart',
    },
  },
  es: {
    title: 'Conversor de tallas de zapatos',
    desc: 'De la longitud del pie a las tallas EU, US y UK de calzado',
    short: 'Del pie a la talla EU · US · UK',
    intro: [
      {
        h: 'La talla EU cuenta puntos de París, no centímetros',
        p: 'Un pie de 27 cm calza más o menos un 43: la escala europea avanza en puntos de 6,67 mm medidos sobre la horma — la pieza sobre la que se monta el zapato —, no sobre tu pie. Las tallas US y UK cuentan en tercios de pulgada desde ceros distintos, y ese mismo 43 ronda el 9 US de hombre y el 8 UK. Lo único que comparten todos los sistemas es la longitud del pie, y por eso es lo único que pide este conversor.',
      },
      {
        h: 'Mide de pie, contra una pared',
        p: 'Coloca un papel en el suelo pegado a la pared, apoya el talón en la pared estando de pie y marca la punta del dedo más largo. Sentado, el pie mide menos. Muchísima gente tiene un pie más largo que el otro: mide los dos y quédate con el mayor.',
      },
      {
        h: 'Compra 5–10 mm más largo que el pie',
        p: 'Al caminar el pie se desliza hacia delante, así que un zapato clavado a tu medida acaba golpeando los dedos. Las zapatillas piden 5–10 mm de margen y las de correr unos 10; los zapatos de vestir se llevan más ajustados. La sugerencia en verde añade unos 7 mm por esta razón.',
      },
    ],
    faq: [
      { q: '¿Por qué la misma talla cambia según la marca?', a: 'La talla describe la horma, y cada marca diseña la suya. Dos «43» pueden diferir media talla en longitud útil, y el ancho muchas veces ni se indica. Usa la tabla como punto de partida y, si puedes, pruébatelos antes de comprar.' },
      { q: '¿Por qué medir por la tarde?', a: 'El pie se alarga y ensancha a lo largo del día: tras horas de pie o caminando gana unos milímetros por la carga y el líquido acumulado. Medido por la mañana, el zapato comprado apretará por la noche — mide cuando el pie está más grande.' },
      { q: 'Entre dos tallas, ¿subo o bajo?', a: 'Para zapatillas y calzado con calcetín grueso, sube: la media talla solo cuesta un poco de holgura. Bajar solo tiene sentido en calzado pensado para ir ceñido, como pies de gato o zapatillas de ciclismo.' },
    ],
    ui: {
      footLen: 'Longitud del pie', hint: 'Introduce la longitud del pie descalzo, no una talla',
      cmCol: 'cm (JP)', usM: 'US hombre', usW: 'US mujer',
      recoTitle: 'Para zapatillas, mejor la talla holgada', recoBody: 'El pie se desliza hacia delante al andar; con 5–10 mm de margen, el mejor ajuste es:',
      chart: 'Tabla de tallas',
    },
  },
  'pt-br': {
    title: 'Conversor de numeração de calçados',
    desc: 'Do comprimento do pé aos números BR/EU, US e UK de calçado',
    short: 'Do pé ao número BR/EU · US · UK',
    intro: [
      {
        h: 'O número brasileiro fica uns 2 abaixo do europeu',
        p: 'A regra de rua que resolve na maioria das lojas: BR ≈ EU − 2. Um pé de 27 cm dá por volta de um 43 europeu, ou seja, um 41 brasileiro. Mas é regra de bolso, não norma — de marca para marca a conta desvia até meio número, porque cada uma desenha a própria forma. Como todos os sistemas partem do comprimento do pé, é isso que este conversor pede.',
      },
      {
        h: 'Meça em pé, encostado na parede',
        p: 'Ponha uma folha no chão junto à parede, encoste o calcanhar na parede em pé e marque a ponta do dedo mais comprido. Sentado, o pé mede menos. Muita gente tem um pé maior que o outro: meça os dois e use o maior.',
      },
      {
        h: 'Compre 5 a 10 mm mais longo que o pé',
        p: 'O pé desliza para a frente a cada passo, então um calçado exatamente do tamanho do pé bate nos dedos. Tênis pedem 5 a 10 mm de folga, tênis de corrida uns 10; sapato social veste mais justo. A sugestão em verde soma uns 7 mm por isso.',
      },
    ],
    faq: [
      { q: 'Por que o mesmo número veste diferente em cada marca?', a: 'O número descreve a forma, e cada marca desenha a sua. Dois "41" podem diferir meio número no comprimento útil, e a largura quase nunca vem indicada. Trate a tabela como ponto de partida e a troca como parte da compra.' },
      { q: 'Por que medir no fim do dia?', a: 'O pé alonga e alarga ao longo do dia: depois de horas em pé ele ganha alguns milímetros por carga e retenção de líquido. Medindo de manhã, o calçado fica apertado à noite — meça quando o pé está maior.' },
      { q: 'Entre dois números, subo ou desço?', a: 'Para tênis e qualquer calçado com meia grossa, suba: o meio número custa só um pouco de folga. Descer só faz sentido em calçado feito para ficar rente, como sapatilha de escalada ou de ciclismo.' },
    ],
    ui: {
      footLen: 'Comprimento do pé', hint: 'Digite o comprimento do pé descalço, não um número de calçado',
      cmCol: 'cm (JP)', usM: 'US masc.', usW: 'US fem.',
      recoTitle: 'Para tênis, fique com o número mais folgado', recoBody: 'O pé desliza para a frente ao caminhar; com 5 a 10 mm de folga, o melhor ajuste é:',
      chart: 'Tabela de números',
    },
  },
  ja: {
    title: '靴のサイズ変換',
    desc: '足長(cm)からEU・US・UKの靴サイズに換算します',
    short: '足長からEU・US・UKサイズへ',
    intro: [
      {
        h: '日本のサイズは足長そのものです',
        p: '25.5cmという表記は、足の長さをそのままセンチで書いたものです。一方EU・US・UKは靴の木型を各自の目盛りで数えた値で、足長25.5cmならおよそEU 40・USメンズ7.5・UK 6.5にあたります。どの方式にも共通しているのは足長だけなので、この換算機が聞くのも足長だけです。',
      },
      {
        h: '立って、壁に付けて測る',
        p: '壁ぎわに紙を敷き、かかとを壁に付けて立ち、いちばん長い指の先に印を付けて測ります。座って測ると短く出ます。左右で長さが違う人は多いので、両足を測って長い方に合わせてください。',
      },
      {
        h: '足長より5〜10mm大きい靴を',
        p: '歩くたびに足は前へ滑るので、足長ぴったりの靴では指が当たります。スニーカーは5〜10mm、ランニングシューズは10mmほどの余裕が目安で、革靴はやや詰めめに履きます。緑の提案枠が7mmほど足しているのはこのためです。',
      },
    ],
    faq: [
      { q: '同じサイズなのにブランドで履き心地が違うのはなぜですか。', a: 'サイズが表すのは木型で、木型はブランドごとに違います。同じ表記でも実際の内寸は半サイズ分ずれることがあり、足囲(ワイズ)を表記しないブランドも多いです。表は出発点と考えて、できれば試着してください。' },
      { q: 'なぜ夕方に測るのですか。', a: '足は一日のうちに少し伸びて広がります。立ち仕事や歩行のあとは荷重とむくみで数ミリ大きくなるので、朝に測って買った靴は夕方に窮屈になります。足がいちばん大きい時間に測るのが安全です。' },
      { q: 'サイズの間に落ちたら上と下のどちらにしますか。', a: 'スニーカーや厚手の靴下で履く靴なら上へ。半サイズの差は少しのゆとりにしかなりません。下を選ぶのは、クライミングシューズのようにぴったり履く前提の靴だけです。' },
    ],
    ui: {
      footLen: '足長', hint: '靴のサイズではなく素足の長さを入れてください',
      cmCol: 'cm（日本）', usM: 'USメンズ', usW: 'USレディース',
      recoTitle: 'スニーカーならゆとりのある方を', recoBody: '歩くと足は前へ滑ります。5〜10mmの余裕をみると、快適なのはこちらです。',
      chart: 'サイズ対応表',
    },
  },
  de: {
    title: 'Schuhgrößen-Umrechner',
    desc: 'Von der Fußlänge zu EU-, US- und UK-Schuhgrößen',
    short: 'Fußlänge zu EU · US · UK',
    intro: [
      {
        h: 'Größe 43 heißt nicht 43 Zentimeter',
        p: 'Ein Fuß von 27 cm trägt ungefähr EU 43: Die europäische Skala zählt Pariser Stiche von 6,67 mm — gemessen am Leisten, der Form, über die der Schuh gebaut wird, nicht am Fuß. US und UK zählen in Drittelzoll von verschiedenen Nullpunkten, weshalb dieselbe 43 etwa US 9 (Herren) und UK 8 entspricht. Das Einzige, was alle Systeme teilen, ist die Fußlänge — und genau die fragt dieser Umrechner ab.',
      },
      {
        h: 'Im Stehen messen, an der Wand',
        p: 'Ein Blatt Papier an die Wand legen, die Ferse im Stehen an die Wand stellen und die Spitze der längsten Zehe markieren. Im Sitzen fällt das Maß kürzer aus. Viele Menschen haben ungleich lange Füße: beide messen und nach dem längeren gehen.',
      },
      {
        h: '5–10 mm länger kaufen als der Fuß',
        p: 'Bei jedem Schritt rutscht der Fuß nach vorn; ein Schuh exakt in Fußlänge stößt an die Zehen. Sneaker wollen 5–10 mm Luft, Laufschuhe etwa 10; Anzugschuhe sitzen knapper. Der grüne Vorschlag unten rechnet aus genau diesem Grund rund 7 mm dazu.',
      },
    ],
    faq: [
      { q: 'Warum fällt dieselbe Größe je nach Marke anders aus?', a: 'Die Größe beschreibt den Leisten, und jede Marke formt ihren eigenen. Zwei Schuhe mit derselben 43 können sich in der nutzbaren Länge um eine halbe Größe unterscheiden, und die Weite ist oft gar nicht angegeben. Die Tabelle ist ein Startpunkt — Anprobieren bleibt die letzte Instanz.' },
      { q: 'Warum abends messen?', a: 'Füße werden über den Tag länger und breiter: Nach Stunden im Stehen oder Gehen kommen durch Belastung und eingelagerte Flüssigkeit einige Millimeter dazu. Wer morgens misst, kauft Schuhe, die abends drücken — gemessen wird, wenn der Fuß am größten ist.' },
      { q: 'Zwischen zwei Größen — auf- oder abrunden?', a: 'Bei Sneakern und allem, was mit dicken Socken getragen wird, nach oben: Die halbe Größe kostet nur etwas Luft. Nach unten lohnt sich nur bei Schuhen, die eng sitzen sollen, etwa Kletter- oder Radschuhen.' },
    ],
    ui: {
      footLen: 'Fußlänge', hint: 'Die Länge des bloßen Fußes eingeben, keine Schuhgröße',
      cmCol: 'cm (JP)', usM: 'US Herren', usW: 'US Damen',
      recoTitle: 'Bei Sneakern die geräumigere Größe', recoBody: 'Beim Gehen rutscht der Fuß nach vorn — mit 5–10 mm Zugabe passt am besten:',
      chart: 'Größentabelle',
    },
  },
  fr: {
    title: 'Convertisseur de pointures',
    desc: 'De la longueur du pied aux pointures EU, US et UK',
    short: 'Du pied à la pointure EU · US · UK',
    intro: [
      {
        h: 'La pointure 43 ne mesure pas 43 centimètres',
        p: 'Un pied de 27 cm chausse à peu près du 43 : l’échelle européenne compte des points de Paris de 6,67 mm, mesurés sur la forme — le moule sur lequel la chaussure est montée — et non sur votre pied. US et UK comptent en tiers de pouce depuis des zéros différents, si bien que ce 43 vaut environ 9 US homme et 8 UK. La seule grandeur commune à tous les systèmes est la longueur du pied : c’est donc la seule chose que demande ce convertisseur.',
      },
      {
        h: 'Mesurez debout, contre un mur',
        p: 'Posez une feuille au sol contre le mur, le talon au mur, debout, et marquez le bout de l’orteil le plus long. Assis, le pied mesure moins. Beaucoup de gens ont un pied plus long que l’autre : mesurez les deux et retenez le plus grand.',
      },
      {
        h: 'Achetez 5 à 10 mm de plus que le pied',
        p: 'À chaque pas, le pied glisse vers l’avant ; une chaussure exactement à la longueur du pied vient buter contre les orteils. Les baskets demandent 5 à 10 mm de marge, les chaussures de course environ 10 ; les souliers habillés se portent plus près. La suggestion en vert ajoute environ 7 mm pour cette raison.',
      },
    ],
    faq: [
      { q: 'Pourquoi la même pointure taille-t-elle différemment selon la marque ?', a: 'La pointure décrit la forme, et chaque marque dessine la sienne. Deux « 43 » peuvent différer d’une demi-pointure en longueur utile, et la largeur n’est souvent même pas indiquée. Prenez le tableau comme point de départ et essayez quand c’est possible.' },
      { q: 'Pourquoi mesurer le soir ?', a: 'Le pied s’allonge et s’élargit au fil de la journée : après des heures debout, la charge et la rétention d’eau ajoutent quelques millimètres. Mesuré le matin, il donne des chaussures qui serrent le soir — mesurez quand il est au plus grand.' },
      { q: 'Entre deux pointures, je monte ou je descends ?', a: 'Pour des baskets ou tout ce qui se porte avec des chaussettes épaisses, montez : la demi-pointure ne coûte qu’un peu d’aisance. Descendre n’a de sens que pour les chaussures faites pour être ajustées, comme les chaussons d’escalade ou les chaussures de vélo.' },
    ],
    ui: {
      footLen: 'Longueur du pied', hint: 'Saisissez la longueur du pied nu, pas une pointure',
      cmCol: 'cm (JP)', usM: 'US homme', usW: 'US femme',
      recoTitle: 'Pour des baskets, prenez la pointure la plus ample', recoBody: 'Le pied glisse vers l’avant en marchant ; avec 5 à 10 mm de marge, le meilleur choix est :',
      chart: 'Tableau des pointures',
    },
  },
  hi: {
    title: 'जूते के साइज़ का कन्वर्टर',
    desc: 'पैर की लंबाई से UK/भारतीय, US और EU जूता साइज़',
    short: 'पैर की लंबाई से UK · US · EU साइज़',
    intro: [
      {
        h: 'भारतीय साइज़ UK पैमाने पर चलते हैं',
        p: 'भारत में दुकानों पर लिखा 8 या 9 लगभग हमेशा UK साइज़ होता है। 27 सेमी लंबे पैर के लिए यह क़रीब UK 8 बैठता है — वही पैर US पुरुष 9 और EU 43 के आसपास। हर प्रणाली जूते के साँचे (लास्ट) को अपने पैमाने से गिनती है, पर सबमें साझा चीज़ एक ही है: पैर की लंबाई। इसीलिए यह कन्वर्टर सिर्फ़ वही पूछता है।',
      },
      {
        h: 'खड़े होकर, दीवार से सटाकर नापिए',
        p: 'दीवार से सटाकर काग़ज़ बिछाइए, एड़ी दीवार से लगाकर खड़े होइए और सबसे लंबी उंगली के सिरे पर निशान लगाइए। बैठकर नापने से लंबाई कम आती है। बहुत लोगों के दोनों पैर बराबर नहीं होते — दोनों नापकर लंबे वाले के हिसाब से चलिए।',
      },
      {
        h: 'पैर से 5–10 मिमी लंबा जूता लीजिए',
        p: 'चलते समय पैर आगे खिसकता है, इसलिए पैर के बराबर जूते में उंगलियाँ टकराती हैं। स्नीकर्स में 5–10 मिमी और दौड़ने के जूतों में क़रीब 10 मिमी गुंजाइश ठीक रहती है; फ़ॉर्मल जूते कुछ कसे पहने जाते हैं। नीचे हरा सुझाव इसी वजह से क़रीब 7 मिमी जोड़ता है।',
      },
    ],
    faq: [
      { q: 'एक ही साइज़ हर ब्रांड में अलग क्यों बैठता है?', a: 'साइज़ दरअसल लास्ट (जूते का साँचा) बताता है, और हर ब्रांड अपना साँचा बनाती है। दो "8" की भीतरी लंबाई आधे साइज़ तक अलग हो सकती है, और चौड़ाई तो अक्सर लिखी ही नहीं होती। तालिका को शुरुआत मानिए और हो सके तो पहनकर देखिए।' },
      { q: 'शाम को क्यों नापें?', a: 'दिन भर में पैर थोड़ा लंबा-चौड़ा हो जाता है: घंटों खड़े रहने या चलने से भार और पानी रुकने की वजह से कुछ मिलीमीटर बढ़ते हैं। सुबह नापकर ख़रीदा जूता शाम को कसने लगता है — जब पैर सबसे बड़ा हो, तभी नापिए।' },
      { q: 'दो साइज़ के बीच फँसें तो ऊपर जाएँ या नीचे?', a: 'स्नीकर्स और मोटे मोज़े वाले जूतों के लिए ऊपर जाइए — आधे साइज़ की क़ीमत बस थोड़ी ढील है। नीचे जाना सिर्फ़ उन जूतों में समझदारी है जो कसकर पहनने के लिए बने हैं, जैसे क्लाइम्बिंग या साइक्लिंग शूज़।' },
    ],
    ui: {
      footLen: 'पैर की लंबाई', hint: 'जूते का साइज़ नहीं, नंगे पैर की लंबाई डालिए',
      cmCol: 'सेमी (JP)', usM: 'US पुरुष', usW: 'US महिला',
      recoTitle: 'स्नीकर्स के लिए थोड़ा बड़ा साइज़ लीजिए', recoBody: 'चलते समय पैर आगे खिसकता है — 5–10 मिमी की गुंजाइश रखने पर बेहतर फ़िट यह है:',
      chart: 'साइज़ तालिका',
    },
  },
  'zh-hans': {
    title: '鞋码对照换算器',
    desc: '按脚长换算欧码、美码、英码鞋号',
    short: '脚长换算欧码 · 美码 · 英码',
    intro: [
      {
        h: '国内鞋码基本就是欧码',
        p: '鞋盒上印的 43 码，多数就是欧码。脚长 27 厘米大约对应欧码 43、美码男 9、英码 8。欧码在楦头上按 6.67 毫米一格来数，美码英码则按三分之一英寸从不同起点数——量的都是楦，不是你的脚。各套码制唯一共享的量是脚长，所以这个换算器只问脚长。',
      },
      {
        h: '站着量，脚跟贴墙',
        p: '把纸铺在墙边，站直、脚跟贴墙，在最长的脚趾尖处画线再量。坐着量会偏短。很多人两只脚不一样长，两边都量，按长的那只选码。',
      },
      {
        h: '鞋要比脚长 5–10 毫米',
        p: '走路时脚会向前滑，和脚一样长的鞋会顶到脚趾。运动鞋留 5–10 毫米，跑鞋留 10 毫米左右，皮鞋则穿得贴一些。下面绿色的建议就是为此加了约 7 毫米。',
      },
    ],
    faq: [
      { q: '同一个码，为什么各品牌穿着不一样？', a: '码数描述的是楦头，而每家品牌都有自己的楦。两双"43"的内长能差出半码，鞋宽更是常常不标。把对照表当起点，能试穿就试穿。' },
      { q: '为什么傍晚量脚？', a: '脚在一天里会变长变宽：站立行走几小时后，受压和积液能让脚大出几毫米。早上量好买的鞋，到晚上就挤脚——在脚最大的时候量才稳妥。' },
      { q: '卡在两个码之间，往上还是往下？', a: '运动鞋和要穿厚袜子的鞋往上选，半码只是多一点余量。往下选只适合本来就要贴脚穿的鞋，比如攀岩鞋、骑行锁鞋。' },
    ],
    ui: {
      footLen: '脚长', hint: '请输入赤脚长度，不是鞋码',
      cmCol: '厘米（日码）', usM: '美码男', usW: '美码女',
      recoTitle: '运动鞋建议选宽松的一档', recoBody: '走路时脚会向前滑，留出 5–10 毫米余量后，更合脚的是：',
      chart: '尺码对照表',
    },
  },
  'zh-hant': {
    title: '鞋碼對照換算器',
    desc: '按腳長換算歐碼、美碼、英碼鞋號',
    short: '腳長換算歐碼 · 美碼 · 英碼',
    intro: [
      {
        h: '台灣鞋盒上多半並列歐碼和美碼',
        p: '腳長 27 公分大約對應 EU 43、US 男 9、UK 8。歐碼在楦頭上按 6.67 公釐一格來數，美碼英碼則按三分之一英寸從不同起點數——量的都是楦，不是你的腳。各套碼制唯一共用的量是腳長，所以這個換算器只問腳長。',
      },
      {
        h: '站著量，腳跟貼牆',
        p: '把紙鋪在牆邊，站直、腳跟貼牆，在最長的腳趾尖處畫線再量。坐著量會偏短。很多人兩腳不一樣長，兩邊都量，按長的那隻選碼。',
      },
      {
        h: '鞋要比腳長 5–10 公釐',
        p: '走路時腳會往前滑，和腳一樣長的鞋會頂到腳趾。運動鞋留 5–10 公釐，跑鞋留 10 公釐左右，皮鞋則穿得貼一些。下面綠色的建議就是為此加了約 7 公釐。',
      },
    ],
    faq: [
      { q: '同一個碼，為什麼各品牌穿起來不一樣？', a: '碼數描述的是楦頭，而每家品牌都有自己的楦。兩雙「43」的內長能差出半碼，楦寬更是常常不標。把對照表當起點，能試穿就試穿。' },
      { q: '為什麼傍晚量腳？', a: '腳在一天裡會變長變寬：站立行走幾小時後，受壓和水腫能讓腳大出幾公釐。早上量好買的鞋，到晚上就擠腳——在腳最大的時候量才穩妥。' },
      { q: '卡在兩個碼之間，往上還是往下？', a: '運動鞋和要穿厚襪的鞋往上選，半碼只是多一點餘裕。往下選只適合本來就要貼腳穿的鞋，例如攀岩鞋、卡鞋。' },
    ],
    ui: {
      footLen: '腳長', hint: '請輸入赤腳長度，不是鞋碼',
      cmCol: '公分（日規）', usM: '美規男', usW: '美規女',
      recoTitle: '運動鞋建議選寬鬆的一檔', recoBody: '走路時腳會往前滑，留出 5–10 公釐餘裕後，較合腳的是：',
      chart: '尺碼對照表',
    },
  },
};

export const PET_AGE: CalcTable = {
  en: {
    title: 'Pet age calculator',
    desc: 'A dog or cat’s age in human years — the first two years count the most',
    short: 'Dog and cat age in human years',
    intro: [
      {
        h: 'Multiplying by 7 gets it wrong at both ends',
        p: 'By the ×7 rule a one-year-old dog would be a seven-year-old child — in reality, at one a dog is already past puberty and nearly full grown. And old dogs age more slowly than ×7 suggests. The rule survives because it is easy, not because it fits.',
      },
      {
        h: 'The first two years are the fastest',
        p: 'This calculator uses the method common in vet charts: the first year counts as 15 human years, the second adds 9, and every year after that adds a steady amount. A two-year-old dog or cat is therefore already around 24 in human terms.',
      },
      {
        h: 'Big dogs age faster than small ones',
        p: 'From the third year on, each year adds 4 human years for a small dog (under 10 kg), 5 for a medium one and 6 for a large one. The same ten-year-old works out to about 56 human years if small and about 72 if large. Cats vary little in size, so one value — 4 — covers them all.',
      },
    ],
    faq: [
      { q: 'How accurate is this?', a: 'It is a rough average from vet charts. Breeds and individuals vary widely, so do not use the result to judge health — use it to think about how often a check-up makes sense.' },
      { q: 'Why do large dogs age faster?', a: 'Across species, bigger animals usually live longer — within dogs it flips. Growing fast seems to carry a cost: a Great Dane is elderly at 8, while many small terriers reach 15. Cats barely vary in size, which is why one curve is enough.' },
      { q: 'Can I enter a fraction like 0.5?', a: 'Yes. Within the first year the count runs proportionally, so a six-month-old puppy is about 7.5 in human years — already a child rather than a baby. That is exactly where the ×7 rule falls apart.' },
    ],
    ui: {
      dog: '🐕 Dog', cat: '🐈 Cat',
      small: 'Small', smallHint: 'under 10 kg', medium: 'Medium', mediumHint: '10–25 kg', large: 'Large', largeHint: 'over 25 kg',
      ageLabel: 'Age (years)', agePh: 'e.g. 3',
      humanLabel: 'In human years', yearsUnit: 'years',
      st1: 'Puppy / kitten', sd1: 'High energy; this is when socialisation takes root.',
      st2: 'Young adult', sd2: 'Physical prime — a good time to start watching the weight.',
      st3: 'Middle age', sd3: 'Time to keep an eye on teeth and weight.',
      st4: 'Early senior', sd4: 'A yearly vet check-up is worth it from here.',
      st5: 'Senior', sd5: 'Watch joints and kidneys, and shorten the gap between check-ups.',
      tableTitle: 'Conversion table', tableSub: 'Pet age → human years',
    },
  },
  es: {
    title: 'Calculadora de edad de perros y gatos',
    desc: 'La edad de tu perro o gato en años humanos — los dos primeros años cuentan más',
    short: 'Edad de perro y gato en años humanos',
    intro: [
      {
        h: 'Multiplicar por 7 falla por los dos extremos',
        p: 'Con la regla del ×7, un perro de un año sería un niño de siete; en realidad, al año ya pasó la pubertad y casi terminó de crecer. Y en la vejez envejece más despacio de lo que sugiere el ×7. La regla sobrevive porque es fácil, no porque acierte.',
      },
      {
        h: 'Los dos primeros años son los más rápidos',
        p: 'Esta calculadora usa el método habitual de las tablas veterinarias: el primer año vale 15 años humanos, el segundo suma 9, y cada año siguiente añade una cantidad fija. Un perro o gato de dos años ya ronda los 24 en términos humanos.',
      },
      {
        h: 'Los perros grandes envejecen más deprisa',
        p: 'A partir del tercer año, cada año suma 4 años humanos en un perro pequeño (menos de 10 kg), 5 en uno mediano y 6 en uno grande. El mismo perro de diez años equivale a unos 56 años humanos si es pequeño y a unos 72 si es grande. Los gatos varían poco de tamaño y usan un único valor: 4.',
      },
    ],
    faq: [
      { q: '¿Qué precisión tiene?', a: 'Es un promedio orientativo de tablas veterinarias. Entre razas e individuos hay diferencias grandes, así que no sirve para juzgar la salud: úsalo para decidir cada cuánto conviene una revisión.' },
      { q: '¿Por qué los perros grandes envejecen antes?', a: 'Entre especies, los animales grandes suelen vivir más; dentro de los perros ocurre lo contrario. Crecer muy rápido parece tener un coste: un gran danés es anciano a los 8 años mientras muchos terriers pequeños llegan a los 15. Los gatos apenas varían de tamaño, y por eso basta una sola curva.' },
      { q: '¿Puedo introducir medio año?', a: 'Sí. Dentro del primer año la cuenta es proporcional: un cachorro de seis meses ronda los 7,5 años humanos — ya un niño, no un bebé. Justo ahí es donde el ×7 se viene abajo.' },
    ],
    ui: {
      dog: '🐕 Perro', cat: '🐈 Gato',
      small: 'Pequeño', smallHint: 'hasta 10 kg', medium: 'Mediano', mediumHint: '10–25 kg', large: 'Grande', largeHint: '25 kg o más',
      ageLabel: 'Edad (años)', agePh: 'p. ej., 3',
      humanLabel: 'En años humanos', yearsUnit: 'años',
      st1: 'Infancia', sd1: 'Mucha actividad; es cuando se asienta la socialización.',
      st2: 'Juventud', sd2: 'El mejor momento físico — buena hora para empezar a vigilar el peso.',
      st3: 'Mediana edad', sd3: 'Toca vigilar dientes y peso.',
      st4: 'Entrada en la vejez', sd4: 'A partir de aquí conviene una revisión veterinaria anual.',
      st5: 'Edad avanzada', sd5: 'Atención a articulaciones y riñones; acorta el intervalo entre revisiones.',
      tableTitle: 'Tabla de equivalencias', tableSub: 'Edad de la mascota → años humanos',
    },
  },
  'pt-br': {
    title: 'Calculadora de idade de cães e gatos',
    desc: 'A idade do seu cão ou gato em anos humanos — os dois primeiros anos pesam mais',
    short: 'Idade de cão e gato em anos humanos',
    intro: [
      {
        h: 'Multiplicar por 7 erra nas duas pontas',
        p: 'Pela regra do ×7, um cão de um ano seria uma criança de sete; na verdade, com um ano ele já passou da puberdade e quase terminou de crescer. E na velhice ele envelhece mais devagar do que o ×7 sugere. A regra sobrevive por ser fácil, não por acertar.',
      },
      {
        h: 'Os dois primeiros anos são os mais rápidos',
        p: 'Esta calculadora usa o método comum das tabelas veterinárias: o primeiro ano vale 15 anos humanos, o segundo soma 9, e cada ano seguinte adiciona um valor fixo. Um cão ou gato de dois anos já está perto dos 24 em termos humanos.',
      },
      {
        h: 'Cães grandes envelhecem mais rápido',
        p: 'Do terceiro ano em diante, cada ano soma 4 anos humanos num cão pequeno (até 10 kg), 5 num médio e 6 num grande. O mesmo cão de dez anos equivale a uns 56 anos humanos se for pequeno e a uns 72 se for grande. Gatos variam pouco de tamanho, então um único valor — 4 — serve para todos.',
      },
    ],
    faq: [
      { q: 'Isso é preciso?', a: 'É uma média orientativa de tabelas veterinárias. Entre raças e indivíduos a variação é grande — não use para julgar saúde; use para pensar na frequência das consultas.' },
      { q: 'Por que cães grandes envelhecem antes?', a: 'Entre espécies, animais maiores costumam viver mais; entre cães, é o contrário. Crescer depressa parece cobrar um preço: um dogue alemão é idoso aos 8, enquanto muitos terriers pequenos chegam aos 15. Gatos quase não variam de tamanho, por isso uma curva só.' },
      { q: 'Posso digitar meio ano?', a: 'Pode. Dentro do primeiro ano a conta é proporcional: um filhote de seis meses fica em torno de 7,5 anos humanos — já uma criança, não um bebê. É exatamente aí que o ×7 desmorona.' },
    ],
    ui: {
      dog: '🐕 Cachorro', cat: '🐈 Gato',
      small: 'Pequeno', smallHint: 'até 10 kg', medium: 'Médio', mediumHint: '10–25 kg', large: 'Grande', largeHint: '25 kg ou mais',
      ageLabel: 'Idade (anos)', agePh: 'ex.: 3',
      humanLabel: 'Em anos humanos', yearsUnit: 'anos',
      st1: 'Filhote', sd1: 'Muita energia; é quando a socialização se firma.',
      st2: 'Jovem adulto', sd2: 'Auge físico — boa hora para começar a controlar o peso.',
      st3: 'Meia-idade', sd3: 'Hora de acompanhar dentes e peso.',
      st4: 'Início da velhice', sd4: 'Daqui em diante, vale um check-up veterinário anual.',
      st5: 'Idoso', sd5: 'Atenção a articulações e rins; encurte o intervalo entre consultas.',
      tableTitle: 'Tabela de conversão', tableSub: 'Idade do pet → anos humanos',
    },
  },
  ja: {
    title: 'ペットの年齢換算',
    desc: '犬・猫の年齢を人間の年齢に換算します — 最初の2年がいちばん速い',
    short: '犬・猫の年齢を人間換算',
    intro: [
      {
        h: '「×7」は両端で外れます',
        p: '年齢に7を掛ける換算では、1歳の犬が7歳の子どもになります。実際には1歳の犬はもう思春期を過ぎて、体はほぼ出来上がっています。逆に老年期は×7より緩やかに老います。あの掛け算が生き残っているのは簡単だからで、合っているからではありません。',
      },
      {
        h: '最初の2年がいちばん速い',
        p: 'この計算機は獣医の早見表で広く使われる方式に従います。最初の1年で人間の15歳ぶん、2年目でさらに9歳ぶんを足し、その先は毎年決まった値を足します。2歳の犬や猫は、人間でいえばもう24歳前後です。',
      },
      {
        h: '大型犬ほど速く老います',
        p: '3年目からは、小型犬(10kg未満)は毎年4歳、中型犬は5歳、大型犬は6歳ぶんを足します。同じ10歳でも、小型犬なら人間の56歳ほど、大型犬なら72歳ほどになります。猫は体格差が小さいので一律4で数えます。',
      },
    ],
    faq: [
      { q: 'どのくらい正確ですか。', a: '獣医の早見表のおおまかな平均です。犬種や個体による差が大きいので、健康状態の判断には使わず、健診の間隔を考える目安にしてください。' },
      { q: 'なぜ大型犬ほど早く老いるのですか。', a: '種をまたぐと大きな動物ほど長生きなのに、犬の中では逆になります。速い成長には代償があるらしく、グレートデーンは8歳で高齢ですが、小型のテリアには15歳まで生きる個体が珍しくありません。猫は体格差が小さいので曲線は一本です。' },
      { q: '0.5歳のように入力できますか。', a: 'できます。最初の1年の中では比例して数えるので、生後6か月の子犬は人間のおよそ7.5歳 — 幼児ではなくもう子どもです。×7の計算が崩れるのがまさにここです。' },
    ],
    ui: {
      dog: '🐕 犬', cat: '🐈 猫',
      small: '小型犬', smallHint: '〜10kg', medium: '中型犬', mediumHint: '10〜25kg', large: '大型犬', largeHint: '25kg〜',
      ageLabel: '年齢(歳)', agePh: '例: 3',
      humanLabel: '人間の年齢で', yearsUnit: '歳',
      st1: '子ども時代', sd1: '運動量が多く、社会化が根づく時期です。',
      st2: '青年期', sd2: '体がいちばん良い時期。体重管理を始めるのに向いています。',
      st3: '中年期', sd3: '歯と体重に気を配る時期です。',
      st4: '老年の入り口', sd4: 'ここからは年1回の健診をおすすめします。',
      st5: '老齢期', sd5: '関節と腎臓に目を配り、健診の間隔を狭めてください。',
      tableTitle: '年齢換算表', tableSub: 'ペットの年齢 → 人間の年齢',
    },
  },
  de: {
    title: 'Hunde- und Katzenjahre-Rechner',
    desc: 'Das Alter von Hund oder Katze in Menschenjahren — die ersten zwei Jahre zählen am meisten',
    short: 'Hund und Katze in Menschenjahren',
    intro: [
      {
        h: 'Mal 7 gerechnet stimmt an beiden Enden nicht',
        p: 'Nach der ×7-Regel wäre ein einjähriger Hund ein siebenjähriges Kind — tatsächlich hat er mit einem Jahr die Pubertät hinter sich und ist fast ausgewachsen. Im Alter wiederum altert er langsamer, als ×7 behauptet. Die Regel hält sich, weil sie einfach ist, nicht weil sie passt.',
      },
      {
        h: 'Die ersten zwei Jahre sind die schnellsten',
        p: 'Dieser Rechner folgt der verbreiteten Methode der Tierarzt-Tabellen: Das erste Jahr zählt 15 Menschenjahre, das zweite weitere 9, danach kommt jedes Jahr ein fester Betrag hinzu. Mit zwei Jahren steht ein Hund oder eine Katze also schon bei etwa 24.',
      },
      {
        h: 'Große Hunde altern schneller',
        p: 'Ab dem dritten Jahr zählt jedes Jahr bei einem kleinen Hund (unter 10 kg) 4 Menschenjahre, bei einem mittleren 5 und bei einem großen 6. Derselbe zehnjährige Hund entspricht klein etwa 56, groß etwa 72 Menschenjahren. Katzen unterscheiden sich in der Größe kaum — dort genügt ein einziger Wert: 4.',
      },
    ],
    faq: [
      { q: 'Wie genau ist das?', a: 'Es ist ein grober Durchschnitt aus Tierarzt-Tabellen. Rassen und Einzeltiere weichen stark ab — nutzen Sie das Ergebnis nicht als Gesundheitsurteil, sondern als Anhaltspunkt für den Abstand zwischen Vorsorgeterminen.' },
      { q: 'Warum altern große Hunde schneller?', a: 'Über Arten hinweg leben größere Tiere meist länger — innerhalb der Hunde kehrt sich das um. Schnelles Wachstum scheint seinen Preis zu haben: Eine Deutsche Dogge ist mit 8 Jahren alt, während viele kleine Terrier 15 werden. Katzen variieren kaum in der Größe, deshalb genügt eine Kurve.' },
      { q: 'Kann ich halbe Jahre eingeben?', a: 'Ja. Innerhalb des ersten Jahres läuft die Zählung proportional: Ein sechs Monate alter Welpe steht bei etwa 7,5 Menschenjahren — schon ein Kind, kein Kleinkind. Genau hier bricht die ×7-Regel zusammen.' },
    ],
    ui: {
      dog: '🐕 Hund', cat: '🐈 Katze',
      small: 'Klein', smallHint: 'unter 10 kg', medium: 'Mittel', mediumHint: '10–25 kg', large: 'Groß', largeHint: 'über 25 kg',
      ageLabel: 'Alter (Jahre)', agePh: 'z. B. 3',
      humanLabel: 'In Menschenjahren', yearsUnit: 'Jahre',
      st1: 'Kindheit', sd1: 'Viel Bewegung; jetzt setzt sich die Sozialisierung fest.',
      st2: 'Junges Erwachsenenalter', sd2: 'Körperliche Bestform — ein guter Zeitpunkt, das Gewicht im Blick zu behalten.',
      st3: 'Mittleres Alter', sd3: 'Zeit, auf Zähne und Gewicht zu achten.',
      st4: 'Beginnendes Seniorenalter', sd4: 'Ab hier lohnt sich der jährliche Tierarzt-Check.',
      st5: 'Hohes Alter', sd5: 'Gelenke und Nieren beobachten, Abstände zwischen den Checks verkürzen.',
      tableTitle: 'Umrechnungstabelle', tableSub: 'Alter des Tieres → Menschenjahre',
    },
  },
  fr: {
    title: 'Calculateur d’âge du chien et du chat',
    desc: 'L’âge de votre chien ou chat en années humaines — les deux premières années comptent le plus',
    short: 'Âge du chien et du chat en années humaines',
    intro: [
      {
        h: 'Multiplier par 7 se trompe aux deux bouts',
        p: 'Avec la règle du ×7, un chien d’un an serait un enfant de sept ans ; en réalité, à un an il a déjà passé la puberté et presque fini de grandir. Et dans la vieillesse, il vieillit plus lentement que ne le dit le ×7. La règle survit parce qu’elle est simple, pas parce qu’elle est juste.',
      },
      {
        h: 'Les deux premières années sont les plus rapides',
        p: 'Ce calculateur suit la méthode répandue des tables vétérinaires : la première année compte pour 15 années humaines, la deuxième en ajoute 9, puis chaque année suivante ajoute une valeur fixe. À deux ans, un chien ou un chat est donc déjà autour de 24 ans humains.',
      },
      {
        h: 'Les grands chiens vieillissent plus vite',
        p: 'À partir de la troisième année, chaque année ajoute 4 années humaines pour un petit chien (moins de 10 kg), 5 pour un moyen et 6 pour un grand. Le même chien de dix ans vaut environ 56 années humaines s’il est petit, environ 72 s’il est grand. Les chats varient peu en taille : une seule valeur, 4, suffit.',
      },
    ],
    faq: [
      { q: 'Quelle est la fiabilité du résultat ?', a: 'C’est une moyenne indicative issue des tables vétérinaires. Les races et les individus varient beaucoup : ne vous en servez pas pour juger la santé, mais pour réfléchir au rythme des visites chez le vétérinaire.' },
      { q: 'Pourquoi les grands chiens vieillissent-ils plus vite ?', a: 'D’une espèce à l’autre, les gros animaux vivent en général plus longtemps ; chez les chiens, c’est l’inverse. Grandir vite semble avoir un coût : un dogue allemand est âgé à 8 ans quand bien des petits terriers atteignent 15 ans. Les chats variant peu en taille, une seule courbe suffit.' },
      { q: 'Puis-je saisir un demi-âge, comme 0,5 ?', a: 'Oui. Au cours de la première année, le compte est proportionnel : un chiot de six mois vaut environ 7,5 années humaines — déjà un enfant, pas un nourrisson. C’est exactement là que le ×7 s’effondre.' },
    ],
    ui: {
      dog: '🐕 Chien', cat: '🐈 Chat',
      small: 'Petit', smallHint: 'moins de 10 kg', medium: 'Moyen', mediumHint: '10–25 kg', large: 'Grand', largeHint: '25 kg et plus',
      ageLabel: 'Âge (années)', agePh: 'ex. : 3',
      humanLabel: 'En années humaines', yearsUnit: 'ans',
      st1: 'Enfance', sd1: 'Beaucoup d’activité ; c’est là que la socialisation s’installe.',
      st2: 'Jeune adulte', sd2: 'Le sommet de la forme — bon moment pour surveiller le poids.',
      st3: 'Âge mûr', sd3: 'Le moment de surveiller dents et poids.',
      st4: 'Début de la vieillesse', sd4: 'Un bilan vétérinaire annuel devient utile.',
      st5: 'Grand âge', sd5: 'Surveillez articulations et reins, et rapprochez les visites.',
      tableTitle: 'Table de conversion', tableSub: 'Âge de l’animal → années humaines',
    },
  },
  hi: {
    title: 'पालतू की उम्र का कैलकुलेटर',
    desc: 'कुत्ते-बिल्ली की उम्र इंसानी बरसों में — पहले दो साल सबसे तेज़ बीतते हैं',
    short: 'कुत्ते-बिल्ली की उम्र इंसानी बरसों में',
    intro: [
      {
        h: '7 से गुणा करना दोनों सिरों पर ग़लत है',
        p: '×7 के हिसाब से एक साल का कुत्ता सात साल का बच्चा होता — जबकि एक साल में वह किशोरावस्था पार कर चुका होता है और शरीर लगभग पूरा बन चुका होता है। बुढ़ापे में वह ×7 से धीमे बूढ़ा होता है। यह नियम आसान होने की वजह से चला आ रहा है, सही होने की वजह से नहीं।',
      },
      {
        h: 'पहले दो साल सबसे तेज़',
        p: 'यह कैलकुलेटर पशु-चिकित्सा तालिकाओं का प्रचलित तरीक़ा अपनाता है: पहला साल इंसान के 15 साल गिना जाता है, दूसरा 9 और जोड़ता है, उसके बाद हर साल एक तय मान जुड़ता है। दो साल का कुत्ता या बिल्ली इंसानी हिसाब से क़रीब 24 की हो चुकी होती है।',
      },
      {
        h: 'बड़े कुत्ते जल्दी बूढ़े होते हैं',
        p: 'तीसरे साल से, छोटे कुत्ते (10 किलो से कम) में हर साल 4 इंसानी साल जुड़ते हैं, मझोले में 5 और बड़े में 6। वही दस साल का कुत्ता छोटा हो तो क़रीब 56 का, बड़ा हो तो क़रीब 72 का बैठता है। बिल्लियों में आकार का फ़र्क़ कम है, इसलिए एक ही मान — 4 — सब पर चलता है।',
      },
    ],
    faq: [
      { q: 'यह कितना सटीक है?', a: 'यह पशु-चिकित्सा तालिकाओं का मोटा औसत है। नस्ल और अलग-अलग जानवर में बड़ा फ़र्क़ होता है — इसे सेहत आँकने का पैमाना न बनाइए; जाँच कितने अंतराल पर करानी है, यह सोचने में काम लीजिए।' },
      { q: 'बड़े कुत्ते जल्दी बूढ़े क्यों होते हैं?', a: 'प्रजातियों के बीच बड़े जानवर आमतौर पर ज़्यादा जीते हैं, पर कुत्तों के भीतर उल्टा है। तेज़ बढ़त की क़ीमत चुकानी पड़ती दिखती है: ग्रेट डेन 8 साल में बुज़ुर्ग हो जाता है, जबकि कई छोटे टेरियर 15 तक पहुँचते हैं। बिल्लियों में आकार कम बदलता है, इसलिए एक ही वक्र काफ़ी है।' },
      { q: 'क्या 0.5 जैसी उम्र डाल सकते हैं?', a: 'हाँ। पहले साल के भीतर गिनती अनुपात से चलती है: छह महीने का पिल्ला इंसानी हिसाब से क़रीब 7.5 साल का — यानी बच्चा, शिशु नहीं। ×7 का हिसाब ठीक यहीं टूटता है।' },
    ],
    ui: {
      dog: '🐕 कुत्ता', cat: '🐈 बिल्ली',
      small: 'छोटा', smallHint: '10 किलो तक', medium: 'मझोला', mediumHint: '10–25 किलो', large: 'बड़ा', largeHint: '25 किलो से ऊपर',
      ageLabel: 'उम्र (साल)', agePh: 'जैसे: 3',
      humanLabel: 'इंसानी उम्र में', yearsUnit: 'साल',
      st1: 'बचपन', sd1: 'ख़ूब चंचलता; यही समय है जब मेलजोल की आदतें जमती हैं।',
      st2: 'जवानी', sd2: 'शरीर सबसे अच्छी हालत में — वज़न पर नज़र रखना शुरू करने का अच्छा समय।',
      st3: 'अधेड़ उम्र', sd3: 'दाँतों और वज़न पर ध्यान देने का समय।',
      st4: 'बुढ़ापे की दहलीज़', sd4: 'यहाँ से साल में एक बार जाँच करवाना ठीक रहता है।',
      st5: 'बुढ़ापा', sd5: 'जोड़ों और गुर्दों पर नज़र रखिए, जाँच का अंतराल घटाइए।',
      tableTitle: 'उम्र की तालिका', tableSub: 'पालतू की उम्र → इंसानी साल',
    },
  },
  'zh-hans': {
    title: '宠物年龄换算器',
    desc: '把狗和猫的年龄换算成人的年龄——头两年长得最快',
    short: '狗猫年龄换算成人类年龄',
    intro: [
      {
        h: '乘以 7 的算法两头都不准',
        p: '按 ×7 来算，一岁的狗相当于七岁的孩子；实际上一岁的狗已经过了青春期，身体基本长成。而到了晚年，它衰老得又比 ×7 慢。这个算法流传至今是因为好记，不是因为准。',
      },
      {
        h: '头两年走得最快',
        p: '这个计算器采用兽医对照表里通行的算法：第一年折合人的 15 岁，第二年再加 9 岁，之后每年加一个固定值。两岁的狗或猫，按人来算已经 24 岁上下。',
      },
      {
        h: '狗越大，老得越快',
        p: '从第三年起，小型犬（10 公斤以下）每年加 4 岁，中型犬加 5 岁，大型犬加 6 岁。同样是十岁，小型犬约合人的 56 岁，大型犬约合 72 岁。猫的体型差别小，统一用 4。',
      },
    ],
    faq: [
      { q: '这个结果有多准？', a: '这是兽医对照表的粗略平均。品种和个体差异很大，别拿它判断健康状况——用它来掂量体检该多久做一次，才是合适的用法。' },
      { q: '为什么大狗老得快？', a: '跨物种看，体型大的动物通常更长寿；到了狗这里正好反过来。长得快似乎要付出代价：大丹犬 8 岁就算高龄，不少小型梗犬却能活到 15 岁。猫的体型差别小，所以一条曲线就够了。' },
      { q: '能输入 0.5 这样的年龄吗？', a: '能。第一年之内按比例折算：六个月大的幼犬约合人的 7.5 岁——已经是个孩子，不是婴儿。×7 的算法恰恰就在这里露馅。' },
    ],
    ui: {
      dog: '🐕 狗', cat: '🐈 猫',
      small: '小型犬', smallHint: '10 公斤以下', medium: '中型犬', mediumHint: '10–25 公斤', large: '大型犬', largeHint: '25 公斤以上',
      ageLabel: '年龄（岁）', agePh: '如：3',
      humanLabel: '折合人的年龄', yearsUnit: '岁',
      st1: '幼年', sd1: '活动量大，社会化正在此时定型。',
      st2: '青年期', sd2: '身体的黄金期，适合开始管理体重。',
      st3: '中年期', sd3: '该留意牙齿和体重了。',
      st4: '初老', sd4: '从这里起建议每年体检一次。',
      st5: '老年', sd5: '盯紧关节和肾脏，缩短体检间隔。',
      tableTitle: '年龄对照表', tableSub: '宠物年龄 → 人的年龄',
    },
  },
  'zh-hant': {
    title: '寵物年齡換算器',
    desc: '把狗和貓的年齡換算成人的年齡——頭兩年長得最快',
    short: '狗貓年齡換算成人類年齡',
    intro: [
      {
        h: '乘以 7 的算法兩頭都不準',
        p: '按 ×7 來算，一歲的狗相當於七歲的孩子；實際上一歲的狗已經過了青春期，身體大致長成。而到了晚年，牠衰老得又比 ×7 慢。這個算法流傳至今是因為好記，不是因為準。',
      },
      {
        h: '頭兩年走得最快',
        p: '這個計算機採用獸醫對照表裡通行的算法：第一年折合人的 15 歲，第二年再加 9 歲，之後每年加一個固定值。兩歲的狗或貓，按人來算已經 24 歲上下。',
      },
      {
        h: '狗越大，老得越快',
        p: '從第三年起，小型犬（10 公斤以下）每年加 4 歲，中型犬加 5 歲，大型犬加 6 歲。同樣是十歲，小型犬約合人的 56 歲，大型犬約合 72 歲。貓的體型差別小，統一用 4。',
      },
    ],
    faq: [
      { q: '這個結果有多準？', a: '這是獸醫對照表的粗略平均。品種和個體差異很大，別拿它判斷健康狀況——用它來衡量健檢該多久做一次，才是合適的用法。' },
      { q: '為什麼大狗老得快？', a: '跨物種看，體型大的動物通常更長壽；到了狗這裡正好反過來。長得快似乎要付出代價：大丹犬 8 歲就算高齡，不少小型㹴犬卻能活到 15 歲。貓的體型差別小，所以一條曲線就夠了。' },
      { q: '能輸入 0.5 這樣的年齡嗎？', a: '能。第一年之內按比例折算：六個月大的幼犬約合人的 7.5 歲——已經是個孩子，不是嬰兒。×7 的算法恰恰就在這裡露餡。' },
    ],
    ui: {
      dog: '🐕 狗', cat: '🐈 貓',
      small: '小型犬', smallHint: '10 公斤以下', medium: '中型犬', mediumHint: '10–25 公斤', large: '大型犬', largeHint: '25 公斤以上',
      ageLabel: '年齡（歲）', agePh: '如：3',
      humanLabel: '折合人的年齡', yearsUnit: '歲',
      st1: '幼年', sd1: '活動量大，社會化正在此時定型。',
      st2: '青年期', sd2: '身體的黃金期，適合開始管理體重。',
      st3: '中年期', sd3: '該留意牙齒和體重了。',
      st4: '初老', sd4: '從這裡起建議每年健檢一次。',
      st5: '老年', sd5: '盯緊關節和腎臟，縮短健檢間隔。',
      tableTitle: '年齡對照表', tableSub: '寵物年齡 → 人的年齡',
    },
  },
};

export const VOLUMETRIC_WEIGHT: CalcTable = {
  en: {
    title: 'Volumetric weight calculator',
    desc: 'Box dimensions to dimensional weight, and which weight the carrier bills',
    short: 'Dimensional weight of a parcel',
    intro: [
      {
        h: 'Carriers bill the larger of two weights',
        p: 'A courier van fills up by space long before it reaches its weight limit, so light, bulky parcels pay for the room they occupy: the carrier compares actual weight with volumetric weight and bills whichever is larger. That is how a box of foam can cost more to ship than a dumbbell.',
      },
      {
        h: 'Length × width × height, divided by a constant',
        p: 'Volumetric weight in kg is the three sides in centimetres multiplied together, divided by a divisor the carrier sets — 5000 is the common figure for international express, and 6000 appears at some services. A 40 × 30 × 20 cm box is 24,000 cm³: at 5000 that is 4.8 kg, so a 2 kg parcel inside it is billed as 4.8 kg.',
      },
      {
        h: 'Shrinking the bill',
        p: 'What you pay for is the air in the box. Dropping one side of that box from 20 to 10 cm halves the volumetric weight. Many carriers also cap the sum of the three sides separately, so a long thin box can be refused even when its volume is modest — the calculator shows that sum too.',
      },
    ],
    faq: [
      { q: 'What is the 139 divisor US carriers quote?', a: 'The same rule in imperial units: cubic inches divided by 139 gives pounds. Converted, it matches a metric divisor of roughly 5000 — the two figures describe the same pricing, not a different system.' },
      { q: 'Why does this system exist at all?', a: 'A plane or truck runs out of space before it runs out of weight capacity. Without volumetric weight, light bulky freight would ride almost free while taking the room of cargo that pays — the divisor is how the cost of space gets shared out.' },
      { q: 'Will the number here match my invoice?', a: 'Nearly: most carriers round up — to the next half or full kilogram — before applying the tariff, so the billed figure can sit slightly above this one. Divisors and size limits also differ from carrier to carrier.' },
    ],
    ui: {
      section: 'Your parcel',
      length: 'Length (cm)', width: 'Width (cm)', height: 'Height (cm)',
      actual: 'Actual weight (kg)', divisor: 'Divisor',
      div5000: 'Air express — 5000', div6000: 'Some carriers — 6000', calc: 'Calculate',
      billable: 'Chargeable weight',
      byVolume: 'Volumetric weight is larger — billed by volume', byActual: 'Billed by actual weight',
      details: 'Breakdown', volume: 'Volume', volumetric: 'Volumetric weight', girth: 'Sum of three sides',
      limitLabel: 'Volume to get under for actual-weight billing', limitHint: 'Cut empty space or lower one side to get below it.',
      note: '* Divisors and size limits vary by carrier — check yours before shipping.',
    },
  },
  es: {
    title: 'Calculadora de peso volumétrico',
    desc: 'Del tamaño de la caja al peso que factura el transportista',
    short: 'Peso volumétrico de un paquete',
    intro: [
      {
        h: 'El transportista cobra el mayor de dos pesos',
        p: 'La furgoneta de reparto se llena de espacio mucho antes que de kilos, así que los envíos ligeros y voluminosos pagan por el sitio que ocupan: se compara el peso real con el volumétrico y se factura el mayor. Por eso una caja de porexpán puede costar más de enviar que una mancuerna.',
      },
      {
        h: 'Largo × ancho × alto, dividido por una constante',
        p: 'El peso volumétrico en kg son los tres lados en centímetros multiplicados y divididos por el divisor que fija cada empresa: 5000 es lo habitual en mensajería aérea internacional y 6000 aparece en algunos servicios. Una caja de 40 × 30 × 20 cm son 24.000 cm³: con 5000 salen 4,8 kg, así que un paquete de 2 kg dentro de ella se factura como 4,8.',
      },
      {
        h: 'Cómo rebajar la factura',
        p: 'Lo que pagas es el aire de la caja. Bajar un lado de esa caja de 20 a 10 cm reduce el peso volumétrico a la mitad. Muchas empresas limitan además la suma de los tres lados por separado, así que una caja larga y estrecha puede ser rechazada aunque su volumen sea modesto — la calculadora muestra también esa suma.',
      },
    ],
    faq: [
      { q: '¿Qué divisor uso?', a: 'El que figure en las condiciones de tu transportista: cambia según la empresa y el servicio, y algunos lo expresan como densidad (5000 equivale a 200 kg/m³ y 6000 a 167). En caso de duda calcula con 5000: es el más estricto, así que la factura real no saldrá más alta.' },
      { q: '¿Por qué existe este sistema?', a: 'Un avión o un camión llega antes a su límite de espacio que al de peso. Sin peso volumétrico, la carga ligera y voluminosa viajaría casi gratis mientras ocupa el sitio de otra que sí paga — el divisor reparte el coste del espacio.' },
      { q: '¿El resultado coincidirá con la factura?', a: 'Casi: la mayoría de empresas redondea hacia arriba, al medio kilo o al kilo siguiente, antes de aplicar la tarifa, así que la cifra facturada puede quedar algo por encima. Los límites de tamaño y el divisor también varían según la empresa.' },
    ],
    ui: {
      section: 'Tu paquete',
      length: 'Largo (cm)', width: 'Ancho (cm)', height: 'Alto (cm)',
      actual: 'Peso real (kg)', divisor: 'Divisor',
      div5000: 'Mensajería aérea — 5000', div6000: 'Algunas empresas — 6000', calc: 'Calcular',
      billable: 'Peso facturable',
      byVolume: 'El peso volumétrico es mayor — se factura por volumen', byActual: 'Se factura por peso real',
      details: 'Desglose', volume: 'Volumen', volumetric: 'Peso volumétrico', girth: 'Suma de los tres lados',
      limitLabel: 'Volumen máximo para facturar por peso real', limitHint: 'Reduce el aire de la caja o baja un lado para quedar por debajo.',
      note: '* El divisor y los límites de tamaño varían según la empresa: compruébalos antes de enviar.',
    },
  },
  'pt-br': {
    title: 'Calculadora de peso cubado',
    desc: 'Do tamanho da caixa ao peso que a transportadora cobra',
    short: 'Peso cubado de uma encomenda',
    intro: [
      {
        h: 'A transportadora cobra o maior de dois pesos',
        p: 'O baú do caminhão enche de espaço muito antes de chegar ao limite de quilos, então encomendas leves e volumosas pagam pelo lugar que ocupam: compara-se o peso real com o cubado e cobra-se o maior. É assim que uma caixa de isopor pode custar mais para enviar que um halter.',
      },
      {
        h: 'Comprimento × largura × altura, dividido por uma constante',
        p: 'O peso cubado em kg é o produto dos três lados em centímetros dividido pelo divisor que cada empresa define: 5000 é o comum no expresso aéreo internacional e 6000 aparece em alguns serviços. Uma caixa de 40 × 30 × 20 cm tem 24.000 cm³: com 5000 dá 4,8 kg, então uma encomenda de 2 kg dentro dela é cobrada como 4,8.',
      },
      {
        h: 'Como encolher a conta',
        p: 'O que você paga é o ar da caixa. Baixar um lado dessa caixa de 20 para 10 cm corta o peso cubado pela metade. Muitas empresas ainda limitam a soma dos três lados em separado, então uma caixa comprida e fina pode ser recusada mesmo com volume modesto — a calculadora mostra essa soma também.',
      },
    ],
    faq: [
      { q: 'Qual divisor eu uso?', a: 'O que estiver nas condições da sua transportadora: muda por empresa e por serviço, e algumas o expressam como densidade (5000 equivale a 200 kg/m³; 6000, a 167). Na dúvida, calcule com 5000 — é o mais rigoroso, então a fatura real não vem mais alta.' },
      { q: 'Por que esse sistema existe?', a: 'Avião e caminhão chegam ao limite de espaço antes do limite de peso. Sem o peso cubado, carga leve e volumosa viajaria quase de graça ocupando o lugar de quem paga — o divisor reparte o custo do espaço.' },
      { q: 'O resultado vai bater com a fatura?', a: 'Quase: a maioria das empresas arredonda para cima, para o meio quilo ou quilo seguinte, antes de aplicar a tarifa, então o valor cobrado pode ficar um pouco acima. Limites de tamanho e divisor também variam de empresa para empresa.' },
    ],
    ui: {
      section: 'Sua encomenda',
      length: 'Comprimento (cm)', width: 'Largura (cm)', height: 'Altura (cm)',
      actual: 'Peso real (kg)', divisor: 'Divisor',
      div5000: 'Expresso aéreo — 5000', div6000: 'Algumas transportadoras — 6000', calc: 'Calcular',
      billable: 'Peso cobrado',
      byVolume: 'O peso cubado é maior — cobrança por volume', byActual: 'Cobrança pelo peso real',
      details: 'Detalhes', volume: 'Volume', volumetric: 'Peso cubado', girth: 'Soma dos três lados',
      limitLabel: 'Volume máximo para pagar pelo peso real', limitHint: 'Tire o ar da caixa ou abaixe um lado para ficar abaixo.',
      note: '* Divisor e limites de tamanho variam por transportadora — confira antes de despachar.',
    },
  },
  ja: {
    title: '容積重量の計算機',
    desc: '箱の寸法から、運賃のかかる重さを出します',
    short: '荷物の容積重量',
    intro: [
      {
        h: '運賃は重い方の「重さ」で決まります',
        p: '配送のトラックは重量より先に空間がいっぱいになります。だから軽くてかさばる荷物は場所代で課金されます — 実重量と容積重量を比べて、大きい方が請求の基準です。発泡スチロールひと箱がダンベルより高くつくのはこのためです。',
      },
      {
        h: '縦 × 横 × 高さ ÷ 係数',
        p: '容積重量(kg)は三辺(cm)を掛け合わせ、運送会社が決めた係数で割った値です。国際エクスプレスでは5000が一般的で、6000を使う会社もあります。40 × 30 × 20cmの箱は24,000cm³ — 係数5000なら4.8kgです。中身が2kgでも4.8kgとして請求されます。',
      },
      {
        h: '請求を軽くするには',
        p: '払っているのは箱の中の空気です。あの箱の一辺を20cmから10cmに下げれば容積重量は半分になります。多くの会社は三辺の合計にも別の上限を設けているので、細長い箱は体積が小さくても断られることがあります。この計算機は三辺合計も出します。',
      },
    ],
    faq: [
      { q: '係数はどれを使えばいいですか。', a: '契約している運送会社の約款にある値です。会社とサービスで違い、密度(5000は200kg/m³、6000は167kg/m³)で書く会社もあります。迷ったら5000で計算してください。厳しい方なので、実際の請求がそれを超えることはありません。' },
      { q: 'なぜこんな仕組みがあるのですか。', a: '飛行機もトラックも、重量より先に空間が尽きます。容積重量がなければ、軽くてかさばる荷物がほぼタダで場所を占め、そのぶんを他の荷物が払うことになります。係数は空間の代金を配る仕組みです。' },
      { q: 'ここの数字は請求とぴったり合いますか。', a: 'ほぼ合いますが、多くの会社は料金表に当てる前に0.5kgや1kg単位で切り上げます。だから請求はここの数字より少し上に出ることがあります。係数と三辺合計の上限も会社ごとに違います。' },
    ],
    ui: {
      section: '荷物の寸法',
      length: '縦 (cm)', width: '横 (cm)', height: '高さ (cm)',
      actual: '実重量 (kg)', divisor: '係数',
      div5000: '国際エクスプレス — 5000', div6000: '一部の会社 — 6000', calc: '計算する',
      billable: '運賃のかかる重さ',
      byVolume: '容積重量の方が大きいため容積で課金されます', byActual: '実重量で課金されます',
      details: '内訳', volume: '体積', volumetric: '容積重量', girth: '三辺の合計',
      limitLabel: '実重量で送るための体積の上限', limitHint: '隙間を減らすか一辺を低くすると下がります。',
      note: '* 係数と三辺合計の上限は会社ごとに違います。発送前に約款を確認してください。',
    },
  },
  de: {
    title: 'Volumengewicht-Rechner',
    desc: 'Aus den Paketmaßen das Gewicht, das der Versanddienst wirklich berechnet',
    short: 'Volumengewicht eines Pakets',
    intro: [
      {
        h: 'Abgerechnet wird das größere von zwei Gewichten',
        p: 'Ein Transporter ist nach Raum voll, lange bevor er sein Gewichtslimit erreicht. Leichte, sperrige Pakete zahlen deshalb für den Platz, den sie belegen: Der Dienst vergleicht tatsächliches Gewicht und Volumengewicht und berechnet das größere. So kann eine Kiste Styropor mehr kosten als eine Kurzhantel.',
      },
      {
        h: 'Länge × Breite × Höhe, geteilt durch eine Konstante',
        p: 'Das Volumengewicht in kg ist das Produkt der drei Seiten in Zentimetern, geteilt durch einen Teiler, den der Dienst festlegt — 5000 ist im internationalen Express üblich, 6000 taucht bei manchen Diensten auf. Ein Karton von 40 × 30 × 20 cm hat 24.000 cm³: bei 5000 sind das 4,8 kg, ein 2-kg-Paket darin wird also mit 4,8 kg berechnet.',
      },
      {
        h: 'Die Rechnung kleiner machen',
        p: 'Bezahlt wird die Luft im Karton. Sinkt eine Seite von 20 auf 10 cm, halbiert sich das Volumengewicht. Viele Dienste begrenzen außerdem die Summe der drei Seiten separat — ein langer, schmaler Karton kann abgelehnt werden, obwohl sein Volumen bescheiden ist. Der Rechner zeigt diese Summe mit an.',
      },
    ],
    faq: [
      { q: 'Welchen Teiler nehme ich?', a: 'Den aus den Bedingungen Ihres Versanddienstes. Er unterscheidet sich je nach Firma und Service; manche geben ihn als Dichte an (5000 entspricht 200 kg/m³, 6000 sind 167). Im Zweifel mit 5000 rechnen — dem strengeren Wert; die echte Rechnung fällt dann nicht höher aus.' },
      { q: 'Warum gibt es das überhaupt?', a: 'Flugzeug und Lkw stoßen früher an ihre Raum- als an ihre Gewichtsgrenze. Ohne Volumengewicht würde leichte, sperrige Fracht fast umsonst reisen und den Platz zahlender Ladung belegen — der Teiler verteilt die Kosten des Raums.' },
      { q: 'Stimmt die Zahl hier mit der Rechnung überein?', a: 'Fast: Die meisten Dienste runden vor dem Tarif auf — auf das nächste halbe oder ganze Kilo. Die berechnete Zahl kann deshalb etwas über der hiesigen liegen. Auch Teiler und Maßgrenzen unterscheiden sich je Dienst.' },
    ],
    ui: {
      section: 'Ihr Paket',
      length: 'Länge (cm)', width: 'Breite (cm)', height: 'Höhe (cm)',
      actual: 'Tatsächliches Gewicht (kg)', divisor: 'Teiler',
      div5000: 'Internationaler Express — 5000', div6000: 'Manche Dienste — 6000', calc: 'Berechnen',
      billable: 'Berechnetes Gewicht',
      byVolume: 'Das Volumengewicht ist größer — abgerechnet wird nach Volumen', byActual: 'Abgerechnet wird das tatsächliche Gewicht',
      details: 'Aufschlüsselung', volume: 'Volumen', volumetric: 'Volumengewicht', girth: 'Summe der drei Seiten',
      limitLabel: 'Volumen, unter dem nach echtem Gewicht abgerechnet wird', limitHint: 'Leerraum verringern oder eine Seite niedriger wählen.',
      note: '* Teiler und Maßgrenzen sind je nach Dienst verschieden — vor dem Versand prüfen.',
    },
  },
  fr: {
    title: 'Calculateur de poids volumétrique',
    desc: 'Des dimensions du colis au poids que le transporteur facture',
    short: 'Poids volumétrique d’un colis',
    intro: [
      {
        h: 'Le transporteur facture le plus lourd des deux poids',
        p: 'Une camionnette de livraison se remplit d’espace bien avant d’atteindre sa limite de charge. Les colis légers et volumineux paient donc la place qu’ils occupent : on compare le poids réel au poids volumétrique et l’on facture le plus grand. C’est ainsi qu’un carton de polystyrène peut coûter plus cher à expédier qu’un haltère.',
      },
      {
        h: 'Longueur × largeur × hauteur, divisé par une constante',
        p: 'Le poids volumétrique en kg est le produit des trois côtés en centimètres divisé par un diviseur fixé par le transporteur — 5000 est la valeur courante de l’express international, 6000 apparaît chez certains services. Un carton de 40 × 30 × 20 cm fait 24 000 cm³ : à 5000, cela donne 4,8 kg, si bien qu’un colis de 2 kg y est facturé 4,8.',
      },
      {
        h: 'Réduire la note',
        p: 'Ce que vous payez, c’est l’air du carton. Abaisser un côté de 20 à 10 cm divise le poids volumétrique par deux. Beaucoup de transporteurs plafonnent en outre la somme des trois côtés séparément : un carton long et étroit peut être refusé malgré un volume modeste — le calculateur affiche aussi cette somme.',
      },
    ],
    faq: [
      { q: 'Quel diviseur choisir ?', a: 'Celui des conditions de votre transporteur : il varie selon l’entreprise et le service, et certains l’expriment en densité (5000 équivaut à 200 kg/m³, 6000 à 167). Dans le doute, calculez avec 5000 — le plus strict ; la facture réelle ne sera pas plus haute.' },
      { q: 'Pourquoi ce système existe-t-il ?', a: 'Avion et camion butent sur l’espace avant de buter sur le poids. Sans poids volumétrique, le fret léger et encombrant voyagerait presque gratuitement en occupant la place d’une charge qui paie — le diviseur répartit le coût de l’espace.' },
      { q: 'Le chiffre affiché correspondra-t-il à la facture ?', a: 'Presque : la plupart des transporteurs arrondissent au demi-kilo ou au kilo supérieur avant d’appliquer le tarif, si bien que le montant facturé peut dépasser légèrement le chiffre affiché. Diviseur et limites de dimensions varient aussi d’une entreprise à l’autre.' },
    ],
    ui: {
      section: 'Votre colis',
      length: 'Longueur (cm)', width: 'Largeur (cm)', height: 'Hauteur (cm)',
      actual: 'Poids réel (kg)', divisor: 'Diviseur',
      div5000: 'Express international — 5000', div6000: 'Certains services — 6000', calc: 'Calculer',
      billable: 'Poids facturé',
      byVolume: 'Le poids volumétrique l’emporte — facturation au volume', byActual: 'Facturation au poids réel',
      details: 'Détail', volume: 'Volume', volumetric: 'Poids volumétrique', girth: 'Somme des trois côtés',
      limitLabel: 'Volume à ne pas dépasser pour payer le poids réel', limitHint: 'Réduisez le vide ou abaissez un côté pour passer dessous.',
      note: '* Diviseur et limites de dimensions varient selon le transporteur — vérifiez avant l’envoi.',
    },
  },
  hi: {
    title: 'वॉल्यूमेट्रिक वज़न कैलकुलेटर',
    desc: 'डिब्बे के नाप से वह वज़न, जिस पर कूरियर पैसे लेता है',
    short: 'पार्सल का वॉल्यूमेट्रिक वज़न',
    intro: [
      {
        h: 'कूरियर दोनों वज़नों में से बड़े पर पैसे लेता है',
        p: 'डिलीवरी की गाड़ी वज़न की हद से बहुत पहले जगह से भर जाती है। इसलिए हल्के मगर बड़े पार्सल अपनी घेरी हुई जगह के पैसे देते हैं: असली वज़न और वॉल्यूमेट्रिक वज़न की तुलना होती है और बड़े वाले पर बिल बनता है। इसी वजह से थर्मोकोल का डिब्बा भेजना डम्बल भेजने से महँगा पड़ सकता है।',
      },
      {
        h: 'लंबाई × चौड़ाई × ऊँचाई ÷ भाजक',
        p: 'वॉल्यूमेट्रिक वज़न (किलो) तीनों भुजाओं (सेमी) का गुणनफल है, जिसे कूरियर का तय किया भाजक भाग देता है — अंतरराष्ट्रीय एक्सप्रेस में 5000 आम है, कुछ सेवाएँ 6000 रखती हैं। 40 × 30 × 20 सेमी का डिब्बा 24,000 घन सेमी है: 5000 से भाग देने पर 4.8 किलो — यानी उसमें रखा 2 किलो का पार्सल 4.8 किलो के भाव बिल होगा।',
      },
      {
        h: 'बिल घटाने का तरीक़ा',
        p: 'आप दरअसल डिब्बे की हवा के पैसे देते हैं। उसी डिब्बे की एक भुजा 20 से 10 सेमी करने पर वॉल्यूमेट्रिक वज़न आधा रह जाता है। कई कंपनियाँ तीनों भुजाओं के योग पर अलग से सीमा भी रखती हैं — लंबा-पतला डिब्बा कम आयतन के बावजूद लौटाया जा सकता है। यह कैलकुलेटर वह योग भी दिखाता है।',
      },
    ],
    faq: [
      { q: 'कौन-सा भाजक लूँ?', a: 'जो आपकी कूरियर कंपनी की शर्तों में लिखा हो। यह कंपनी और सेवा के हिसाब से बदलता है; कुछ इसे घनत्व में लिखती हैं (5000 यानी 200 किलो/घन मीटर, 6000 यानी 167)। उलझन हो तो 5000 से गणना कीजिए — यह सख़्त वाला है, असली बिल इससे ऊपर नहीं जाएगा।' },
      { q: 'यह व्यवस्था है ही क्यों?', a: 'हवाई जहाज़ और ट्रक वज़न से पहले जगह की हद पर पहुँचते हैं। वॉल्यूमेट्रिक वज़न न हो तो हल्का-भारी सामान लगभग मुफ़्त में जगह घेरता चले और उसका ख़र्च बाक़ी माल उठाए — भाजक जगह की क़ीमत बाँटने का तरीक़ा है।' },
      { q: 'क्या यहाँ का आंकड़ा बिल से ठीक मिलेगा?', a: 'लगभग: ज़्यादातर कंपनियाँ दर लगाने से पहले आधे या पूरे किलो पर ऊपर की ओर पूर्णांक बनाती हैं, इसलिए बिल यहाँ के आंकड़े से थोड़ा ऊपर बैठ सकता है। भाजक और नाप की सीमाएँ भी कंपनी-कंपनी बदलती हैं।' },
    ],
    ui: {
      section: 'आपका पार्सल',
      length: 'लंबाई (सेमी)', width: 'चौड़ाई (सेमी)', height: 'ऊँचाई (सेमी)',
      actual: 'असली वज़न (किलो)', divisor: 'भाजक',
      div5000: 'हवाई एक्सप्रेस — 5000', div6000: 'कुछ कंपनियाँ — 6000', calc: 'गणना करें',
      billable: 'बिल वाला वज़न',
      byVolume: 'वॉल्यूमेट्रिक वज़न बड़ा है — आयतन पर बिल बनेगा', byActual: 'असली वज़न पर बिल बनेगा',
      details: 'ब्योरा', volume: 'आयतन', volumetric: 'वॉल्यूमेट्रिक वज़न', girth: 'तीनों भुजाओं का योग',
      limitLabel: 'असली वज़न पर बिल के लिए आयतन की हद', limitHint: 'ख़ाली जगह घटाइए या एक भुजा छोटी कीजिए।',
      note: '* भाजक और नाप की सीमाएँ हर कंपनी में अलग हैं — भेजने से पहले अपनी कंपनी की शर्तें देख लीजिए।',
    },
  },
  'zh-hans': {
    title: '体积重量计算器',
    desc: '按箱子尺寸，算出快递按哪个重量收费',
    short: '包裹的体积重量',
    intro: [
      {
        h: '运费按两个重量里大的那个收',
        p: '快递车装满空间远比装满重量来得早，所以又轻又大的包裹要为占的地方付钱：把实际重量和体积重量放在一起比，按大的那个计费。一箱泡沫塑料比一只哑铃寄得贵，道理就在这里。',
      },
      {
        h: '长 × 宽 × 高 ÷ 计费系数',
        p: '体积重量（公斤）是三边（厘米）相乘，再除以承运商定的系数——国际快递常用 5000，也有公司用 6000。40 × 30 × 20 厘米的箱子是 24,000 立方厘米：除以 5000 得 4.8 公斤，里面装 2 公斤的东西，也按 4.8 公斤计费。',
      },
      {
        h: '怎么把账单降下来',
        p: '你付的其实是箱子里的空气。把那只箱子的一边从 20 厘米降到 10 厘米，体积重量就减半。很多公司还对三边之和另设上限，细长的箱子体积不大也可能被拒收——这个计算器把三边之和也一并算出。',
      },
    ],
    faq: [
      { q: '系数该用哪个？', a: '用你承运商条款里写的那个。它随公司和服务变化，有的公司用密度来写（5000 相当于 200 公斤/立方米，6000 相当于 167）。拿不准就按 5000 算——这是更严的一档，实际账单不会比它高。' },
      { q: '为什么会有这套规矩？', a: '飞机和货车都是空间先见底，重量后见底。没有体积重量的话，又轻又大的货几乎白占地方，成本摊给别的货——系数就是把空间的钱分摊出去的办法。' },
      { q: '这里的数字和账单能对上吗？', a: '基本能：多数公司在套用运价前会向上取整，取到半公斤或一公斤，所以账单可能比这里略高。系数和尺寸上限也因公司而异。' },
    ],
    ui: {
      section: '包裹尺寸',
      length: '长（厘米）', width: '宽（厘米）', height: '高（厘米）',
      actual: '实际重量（公斤）', divisor: '计费系数',
      div5000: '国际快递 — 5000', div6000: '部分公司 — 6000', calc: '计算',
      billable: '计费重量',
      byVolume: '体积重量更大——按体积计费', byActual: '按实际重量计费',
      details: '明细', volume: '体积', volumetric: '体积重量', girth: '三边之和',
      limitLabel: '想按实重计费，体积须低于', limitHint: '减少空隙或降低一边就能降下来。',
      note: '* 系数和尺寸上限各公司不同——寄出前先查承运商条款。',
    },
  },
  'zh-hant': {
    title: '材積重量計算機',
    desc: '按箱子尺寸，算出貨運按哪個重量收費',
    short: '包裹的材積重量',
    intro: [
      {
        h: '運費按兩個重量裡大的那個收',
        p: '貨運車裝滿空間遠比裝滿重量來得早，所以又輕又大的包裹要為佔的位置付錢：把實際重量和材積重量放在一起比，按大的那個計費。一箱保麗龍比一顆啞鈴寄得貴，道理就在這裡。',
      },
      {
        h: '長 × 寬 × 高 ÷ 計費係數',
        p: '材積重量（公斤）是三邊（公分）相乘，再除以承運商定的係數——國際快遞常用 5000，也有公司用 6000。40 × 30 × 20 公分的箱子是 24,000 立方公分：除以 5000 得 4.8 公斤，裡面裝 2 公斤的東西，也按 4.8 公斤計費。',
      },
      {
        h: '怎麼把帳單降下來',
        p: '你付的其實是箱子裡的空氣。把那只箱子的一邊從 20 公分降到 10 公分，材積重量就減半。很多公司還對三邊之和另設上限，細長的箱子體積不大也可能被拒收——這個計算機把三邊之和也一併算出。',
      },
    ],
    faq: [
      { q: '係數該用哪個？', a: '用你承運商條款裡寫的那個。它隨公司和服務變化，有的公司用密度來寫（5000 相當於 200 公斤/立方公尺，6000 相當於 167）。拿不準就按 5000 算——這是更嚴的一檔，實際帳單不會比它高。' },
      { q: '為什麼會有這套規矩？', a: '飛機和貨車都是空間先見底，重量後見底。沒有材積重量的話，又輕又大的貨幾乎白佔位置，成本攤給別的貨——係數就是把空間的錢分攤出去的辦法。' },
      { q: '這裡的數字和帳單對得上嗎？', a: '基本上對得上：多數公司在套用運價前會向上取整，取到半公斤或一公斤，所以帳單可能比這裡略高。係數和尺寸上限也因公司而異。' },
    ],
    ui: {
      section: '包裹尺寸',
      length: '長（公分）', width: '寬（公分）', height: '高（公分）',
      actual: '實際重量（公斤）', divisor: '計費係數',
      div5000: '國際快遞 — 5000', div6000: '部分公司 — 6000', calc: '計算',
      billable: '計費重量',
      byVolume: '材積重量較大——按材積計費', byActual: '按實際重量計費',
      details: '明細', volume: '體積', volumetric: '材積重量', girth: '三邊之和',
      limitLabel: '想按實重計費，體積須低於', limitHint: '減少空隙或降低一邊就能降下來。',
      note: '* 係數和尺寸上限各公司不同——寄出前先查承運商條款。',
    },
  },
};
