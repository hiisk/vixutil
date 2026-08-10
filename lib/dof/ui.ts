/**
 * 피사계 심도 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "초점이 맞아 보이는 범위는 렌즈의 성질이 아니라
 * 초점거리·조리개·판형이 함께 정하는 값"이다. 같은 f/2.8이라도 24mm와 200mm는
 * 스무 배 넘게 다르고, 판형이 작으면 같은 렌즈가 깊어 보인다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DofFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DofUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  focalLabel: string;
  apertureLabel: string;
  hyperfocalLabel: string;
  fromLabel: string;
  subjectLabel: string;
  nearLabel: string;
  farLabel: string;
  depthLabel: string;
  infinity: string;
  formatLabel: string;
  formatName: (key: string) => string;

  hyperTitle: string;
  hyperNote: string;
  cocTitle: string;
  cocNote: string;
  formatTitle: string;
  formatNote: string;
  ruleTitle: string;
  ruleNote: string;

  tableTitle: string;
  neighbourTitle: string;
  focalRowTitle: string;
  apertureRowTitle: string;
  widerLabel: string;
  tighterLabel: string;
  shorterLabel: string;
  longerLabel: string;

  desc: (f: DofFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DofFacts) => string;
  metaDesc: (f: DofFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: DofFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 2m 피사체의 앞뒤 폭을 읽기 좋은 말로 — 문장 여러 곳에서 같은 값을 쓴다 */
const depthAt = (f: DofFacts, inf: string): string => {
  const s = f.spans.find(x => x.subject === 2);
  return s?.depth === null || s === undefined ? inf : `${s.depth} m`;
};

type Spec = { [K in keyof DofUI]: L<DofUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('심도', 'Depth of field', 'Profundidad de campo', 'Profundidade de campo', '被写界深度', 'Schärfentiefe', 'Profondeur de champ', 'फ़ील्ड की गहराई', '景深', '景深'),

  hubTitle: T(
    '피사계 심도 120칸 — 50mm f/8은 5.2m부터 무한대까지',
    '120 depth-of-field cells — 50mm at f/8 is sharp from 5.2 m to infinity',
    '120 casillas de profundidad — un 50mm a f/8 queda nítido de 5,2 m al infinito',
    '120 casos de profundidade — uma 50mm a f/8 fica nítida de 5,2 m ao infinito',
    '被写界深度120マス — 50mm f/8は5.2mから無限遠まで',
    '120 Schärfentiefe-Fälle — 50 mm bei f/8 ist ab 5,2 m bis unendlich scharf',
    '120 cas de profondeur — un 50 mm à f/8 est net de 5,2 m à l’infini',
    '120 गहराई मामले — 50mm f/8 पर 5.2 m से अनंत तक साफ़',
    '120 个景深组合 — 50mm f/8 从 5.2 米到无限远都清晰',
    '120 個景深組合 — 50mm f/8 從 5.2 公尺到無限遠都清晰',
  ),

  hubLead: T(
    '초점거리 12가지와 조리개 10가지가 만나는 칸마다 과초점거리와 앞뒤 한계를 계산했습니다. 초점이 정말 맞는 면은 하나뿐이고, 앞뒤가 맞아 보이는 것은 흐림이 아직 점으로 보일 만큼만 번졌기 때문입니다.',
    'Every pairing of 12 focal lengths and 10 apertures, worked out as a hyperfocal distance and a near-to-far range. Only one plane is truly in focus; what looks sharp in front of it and behind it is blur that has not yet grown past a point.',
    'Cada cruce de 12 distancias focales y 10 diafragmas, resuelto como distancia hiperfocal y límites cercano y lejano. Solo un plano está realmente enfocado: lo que parece nítido delante y detrás es desenfoque que aún no ha crecido más que un punto.',
    'Cada cruzamento de 12 distâncias focais e 10 aberturas, resolvido como distância hiperfocal e limites próximo e distante. Só um plano está realmente em foco: o que parece nítido à frente e atrás é borrão que ainda não passou de um ponto.',
    '焦点距離12通りと絞り10通りが交わるマスごとに、過焦点距離と前後の限界を計算しました。本当にピントが合う面は一つだけで、その前後が合って見えるのはボケがまだ点に見える程度だからです。',
    'Jede Paarung aus 12 Brennweiten und 10 Blenden, ausgerechnet als hyperfokale Distanz und Nah-Fern-Grenze. Nur eine Ebene ist wirklich scharf; was davor und dahinter scharf wirkt, ist Unschärfe, die noch nicht über einen Punkt hinausgewachsen ist.',
    'Chaque croisement de 12 focales et 10 ouvertures, calculé en distance hyperfocale et limites proche et lointaine. Un seul plan est vraiment net : ce qui paraît net devant et derrière est un flou qui n’a pas encore dépassé la taille d’un point.',
    '12 फ़ोकल लंबाइयों और 10 अपर्चर के हर जोड़ पर हाइपरफ़ोकल दूरी और आगे-पीछे की सीमा निकाली गई है। असल में सिर्फ़ एक तल पर ही फ़ोकस होता है; उसके आगे-पीछे जो साफ़ दिखता है वह धुंधलापन है जो अभी बिंदु से बड़ा नहीं हुआ।',
    '12 种焦距与 10 种光圈相交的每一格，都算出了超焦距和前后清晰范围。真正合焦的只有一个平面，它前后看起来清晰，是因为模糊还没大过一个点。',
    '12 種焦距與 10 種光圈相交的每一格，都算出了超焦距和前後清晰範圍。真正合焦的只有一個平面，它前後看起來清晰，是因為模糊還沒大過一個點。',
  ),

  focalLabel: T('초점거리', 'Focal length', 'Distancia focal', 'Distância focal', '焦点距離', 'Brennweite', 'Focale', 'फ़ोकल लंबाई', '焦距', '焦距'),
  apertureLabel: T('조리개', 'Aperture', 'Diafragma', 'Abertura', '絞り', 'Blende', 'Ouverture', 'अपर्चर', '光圈', '光圈'),
  hyperfocalLabel: T('과초점거리', 'Hyperfocal distance', 'Distancia hiperfocal', 'Distância hiperfocal', '過焦点距離', 'Hyperfokale Distanz', 'Distance hyperfocale', 'हाइपरफ़ोकल दूरी', '超焦距', '超焦距'),
  fromLabel: T('여기부터 무한대까지', 'Sharp from here to infinity', 'Nítido desde aquí al infinito', 'Nítido daqui ao infinito', 'ここから無限遠まで', 'Scharf ab hier bis unendlich', 'Net d’ici à l’infini', 'यहाँ से अनंत तक साफ़', '从这里到无限远清晰', '從這裡到無限遠清晰'),
  subjectLabel: T('피사체 거리', 'Subject distance', 'Distancia al sujeto', 'Distância do sujeito', '被写体距離', 'Motivdistanz', 'Distance au sujet', 'विषय दूरी', '被摄距离', '被攝距離'),
  nearLabel: T('앞', 'Near', 'Cerca', 'Perto', '手前', 'Nah', 'Avant', 'नज़दीक', '近端', '近端'),
  farLabel: T('뒤', 'Far', 'Lejos', 'Longe', '奥', 'Fern', 'Arrière', 'दूर', '远端', '遠端'),
  depthLabel: T('앞뒤 폭', 'Depth', 'Profundidad', 'Profundidade', '深度', 'Tiefe', 'Profondeur', 'गहराई', '景深', '景深'),
  infinity: T('무한대', 'infinity', 'infinito', 'infinito', '無限遠', 'unendlich', 'infini', 'अनंत', '无限远', '無限遠'),
  formatLabel: T('판형', 'Format', 'Formato', 'Formato', '判型', 'Format', 'Format', 'फ़ॉर्मैट', '画幅', '畫幅'),

  formatName: T<(key: string) => string>(
    pick({ ff: '35mm 판형', apsc: 'APS-C', m43: '마이크로 포서드' }),
    pick({ ff: 'Full frame', apsc: 'APS-C', m43: 'Micro Four Thirds' }),
    pick({ ff: 'Fotograma completo', apsc: 'APS-C', m43: 'Micro Cuatro Tercios' }),
    pick({ ff: 'Quadro completo', apsc: 'APS-C', m43: 'Micro Quatro Terços' }),
    pick({ ff: 'フルサイズ', apsc: 'APS-C', m43: 'マイクロフォーサーズ' }),
    pick({ ff: 'Kleinbild', apsc: 'APS-C', m43: 'Micro Four Thirds' }),
    pick({ ff: 'Plein format', apsc: 'APS-C', m43: 'Micro Quatre Tiers' }),
    pick({ ff: 'फुल फ़्रेम', apsc: 'APS-C', m43: 'माइक्रो फ़ोर थर्ड्स' }),
    pick({ ff: '全画幅', apsc: 'APS-C', m43: '微型四分之三' }),
    pick({ ff: '全片幅', apsc: 'APS-C', m43: '微型四分之三' }),
  ),

  hyperTitle: T('과초점거리가 뜻하는 것', 'What the hyperfocal distance means', 'Qué significa la distancia hiperfocal', 'O que significa a distância hiperfocal', '過焦点距離の意味', 'Was die hyperfokale Distanz bedeutet', 'Ce que signifie la distance hyperfocale', 'हाइपरफ़ोकल दूरी का अर्थ', '超焦距是什么意思', '超焦距是什麼意思'),
  hyperNote: T(
    '여기에 초점을 맞추면 그 절반 지점부터 무한대까지가 맞아 보입니다. 풍경에서 가장 많이 쓰는 자리이고, 무한대에 맞추는 것보다 앞쪽을 훨씬 벌어 줍니다. 절반이라는 것은 어림이 아니라 식에서 그대로 떨어지는 값입니다.',
    'Focus there and everything from half that distance out to infinity reads as sharp. It is the setting landscapes lean on, and it buys far more foreground than focusing at infinity does. The halving is not a rule of thumb — it falls straight out of the equation.',
    'Enfoca ahí y todo desde la mitad de esa distancia hasta el infinito se ve nítido. Es el ajuste en el que se apoya el paisaje, y gana mucho más primer plano que enfocar al infinito. La mitad no es una regla aproximada: sale directamente de la ecuación.',
    'Foque ali e tudo da metade dessa distância até o infinito aparece nítido. É o ajuste em que a paisagem se apoia, e ganha muito mais primeiro plano do que focar no infinito. A metade não é regra de bolso: sai direto da equação.',
    'ここにピントを合わせると、その半分の地点から無限遠までが合って見えます。風景で最もよく使う設定で、無限遠に合わせるより手前をずっと稼げます。半分というのは目安ではなく、式からそのまま出る値です。',
    'Stellt man dorthin scharf, wirkt alles von der halben Distanz bis unendlich scharf. Darauf baut die Landschaftsfotografie, und es gewinnt weit mehr Vordergrund als das Scharfstellen auf unendlich. Die Halbierung ist keine Faustregel — sie folgt direkt aus der Gleichung.',
    'Faites la mise au point là et tout, de la moitié de cette distance jusqu’à l’infini, paraît net. C’est le réglage sur lequel s’appuie le paysage, et il gagne bien plus de premier plan que la mise au point à l’infini. La moitié n’est pas une règle empirique : elle sort directement de l’équation.',
    'वहाँ फ़ोकस करें तो उस दूरी के आधे से अनंत तक सब साफ़ दिखता है। लैंडस्केप में यही सबसे ज़्यादा काम आता है और अनंत पर फ़ोकस करने से कहीं ज़्यादा अगला हिस्सा मिलता है। आधा होना अंदाज़ा नहीं, समीकरण से सीधे निकलता है।',
    '对在那里，从该距离的一半到无限远都会显得清晰。这是风景摄影最常用的做法，比对焦到无限远能多留出许多前景。所谓一半不是经验之谈，而是直接从公式里得出的。',
    '對在那裡，從該距離的一半到無限遠都會顯得清晰。這是風景攝影最常用的做法，比對焦到無限遠能多留出許多前景。所謂一半不是經驗之談，而是直接從公式裡得出的。',
  ),

  cocTitle: T('심도는 약속에서 나온다', 'Depth of field rests on an agreement', 'La profundidad parte de un acuerdo', 'A profundidade parte de um acordo', '深度は約束から出る', 'Schärfentiefe beruht auf einer Übereinkunft', 'La profondeur repose sur une convention', 'गहराई एक तय मान पर टिकी है', '景深来自一个约定', '景深來自一個約定'),
  cocNote: T(
    '렌즈가 정말로 초점을 맞춘 면은 하나뿐입니다. 그 앞뒤가 맞아 보이는 것은 흐려진 점이 아직 점으로 보일 만큼만 번졌기 때문이고, 그 한계를 허용 착란원이라 부릅니다. 이 표는 35mm 판형에서 널리 쓰는 0.03mm을 씁니다. 잡지에 크게 싣거나 화면에서 100%로 들여다보면 이보다 엄격해져 심도가 얕아집니다.',
    'A lens truly focuses on one plane only. What reads as sharp in front of it and behind it is blur that has not yet spread past the size the eye still accepts as a point — the circle of confusion. This table uses 0.03 mm, the common figure for the 35 mm format. Printing large or inspecting at 100 % on screen makes the standard stricter, and the depth shrinks accordingly.',
    'Un objetivo enfoca de verdad un solo plano. Lo que parece nítido delante y detrás es desenfoque que aún no supera el tamaño que el ojo acepta como punto: el círculo de confusión. Esta tabla usa 0,03 mm, la cifra habitual para el formato de 35 mm. Imprimir en grande o mirar al 100 % en pantalla endurece el criterio y la profundidad se reduce.',
    'Uma lente foca de verdade um único plano. O que parece nítido à frente e atrás é borrão que ainda não passou do tamanho que o olho aceita como ponto: o círculo de confusão. Esta tabela usa 0,03 mm, o número comum para o formato de 35 mm. Imprimir grande ou olhar a 100 % na tela torna o critério mais rígido e a profundidade encolhe.',
    'レンズが本当にピントを合わせる面は一つだけです。その前後が合って見えるのは、ボケがまだ点として見える大きさを超えていないからで、その限界を許容錯乱円と呼びます。この表は35mm判で広く使われる0.03mmを使います。大きく印刷したり画面で100%に拡大すると基準は厳しくなり、深度は浅くなります。',
    'Ein Objektiv stellt wirklich nur auf eine Ebene scharf. Was davor und dahinter scharf wirkt, ist Unschärfe, die noch nicht größer ist als das, was das Auge als Punkt hinnimmt — der Zerstreuungskreis. Diese Tabelle rechnet mit 0,03 mm, dem üblichen Wert fürs Kleinbild. Großer Druck oder 100-%-Ansicht am Bildschirm verschärfen den Maßstab, und die Tiefe schrumpft.',
    'Un objectif ne fait vraiment la mise au point que sur un seul plan. Ce qui paraît net devant et derrière est un flou qui n’a pas encore dépassé la taille que l’œil accepte comme un point : le cercle de confusion. Ce tableau retient 0,03 mm, la valeur usuelle pour le format 35 mm. Un grand tirage ou un examen à 100 % à l’écran durcit le critère et la profondeur diminue.',
    'लेंस सचमुच सिर्फ़ एक तल पर फ़ोकस करता है। उसके आगे-पीछे जो साफ़ लगता है, वह धुंधलापन है जो अभी उस आकार से बड़ा नहीं हुआ जिसे आँख बिंदु मान लेती है — इसे सर्कल ऑफ़ कन्फ़्यूज़न कहते हैं। यह तालिका 35 mm फ़ॉर्मैट के लिए प्रचलित 0.03 mm लेती है। बड़ा प्रिंट या स्क्रीन पर 100 % देखना मानक कड़ा कर देता है और गहराई घट जाती है।',
    '镜头真正合焦的只有一个平面。它前后看起来清晰，是因为模糊还没超过眼睛仍当作一个点的大小，这个界限叫弥散圆。本表采用 35mm 画幅常用的 0.03 毫米。放大印刷或在屏幕上按 100 % 查看会让标准更严，景深随之变浅。',
    '鏡頭真正合焦的只有一個平面。它前後看起來清晰，是因為模糊還沒超過眼睛仍當作一個點的大小，這個界限叫彌散圓。本表採用 35mm 畫幅常用的 0.03 公釐。放大印刷或在螢幕上按 100 % 檢視會讓標準更嚴，景深隨之變淺。',
  ),

  formatTitle: T('판형이 작으면 깊어 보인다', 'Smaller formats look deeper', 'Los formatos pequeños parecen más profundos', 'Formatos menores parecem mais profundos', '判型が小さいと深く見える', 'Kleinere Formate wirken tiefer', 'Les petits formats paraissent plus profonds', 'छोटा फ़ॉर्मैट ज़्यादा गहरा दिखता है', '画幅越小看起来越深', '畫幅越小看起來越深'),
  formatNote: T(
    '같은 초점거리와 조리개라도 판형이 작으면 허용 착란원이 작아져 과초점거리가 멀어집니다. 다만 실제로 찍을 때는 같은 화각을 얻으려 더 짧은 렌즈를 쓰게 되고, 그쪽 효과가 훨씬 커서 결과는 깊어집니다.',
    'With the same focal length and aperture, a smaller format has a smaller circle of confusion, which pushes the hyperfocal distance further away. In practice, though, you reach for a shorter lens to keep the same angle of view, and that effect is far stronger, so the picture ends up deeper.',
    'Con la misma focal y el mismo diafragma, un formato menor tiene un círculo de confusión más pequeño, lo que aleja la distancia hiperfocal. En la práctica, sin embargo, se recurre a una focal más corta para mantener el mismo ángulo, y ese efecto pesa mucho más, así que la imagen sale más profunda.',
    'Com a mesma focal e a mesma abertura, um formato menor tem círculo de confusão menor, o que afasta a distância hiperfocal. Na prática, porém, usa-se uma focal mais curta para manter o mesmo ângulo, e esse efeito pesa muito mais, então a imagem sai mais profunda.',
    '同じ焦点距離と絞りでも、判型が小さいと許容錯乱円が小さくなり過焦点距離は遠くなります。ただし実際に撮るときは同じ画角を得るためより短いレンズを使うことになり、その効果のほうがはるかに大きいので結果は深くなります。',
    'Bei gleicher Brennweite und Blende hat ein kleineres Format einen kleineren Zerstreuungskreis, was die hyperfokale Distanz nach hinten schiebt. In der Praxis greift man aber zu einer kürzeren Brennweite, um denselben Bildwinkel zu behalten — dieser Effekt wiegt weit schwerer, und das Bild wird tiefer.',
    'À focale et ouverture égales, un format plus petit a un cercle de confusion plus petit, ce qui éloigne la distance hyperfocale. En pratique, on prend pourtant une focale plus courte pour garder le même angle, et cet effet pèse bien plus lourd : l’image devient plus profonde.',
    'एक ही फ़ोकल लंबाई और अपर्चर पर छोटे फ़ॉर्मैट का सर्कल ऑफ़ कन्फ़्यूज़न छोटा होता है, जिससे हाइपरफ़ोकल दूरी और दूर चली जाती है। पर असल में वही कोण पाने के लिए छोटी फ़ोकल लंबाई चुनी जाती है, और उसका असर कहीं बड़ा है, इसलिए तस्वीर गहरी बनती है।',
    '在相同焦距和光圈下，画幅越小弥散圆越小，超焦距反而更远。不过实际拍摄时为了取得相同视角会换用更短的镜头，而那个作用大得多，所以成片反而更深。',
    '在相同焦距和光圈下，畫幅越小彌散圓越小，超焦距反而更遠。不過實際拍攝時為了取得相同視角會換用更短的鏡頭，而那個作用大得多，所以成片反而更深。',
  ),

  ruleTitle: T('두 축이 미치는 크기가 다르다', 'The two axes do not pull equally', 'Los dos ejes no pesan igual', 'Os dois eixos não pesam igual', '二つの軸は効き方が違う', 'Die beiden Achsen wirken unterschiedlich stark', 'Les deux axes ne pèsent pas pareil', 'दोनों अक्ष बराबर असर नहीं करते', '两个轴的影响不一样大', '兩個軸的影響不一樣大'),
  ruleNote: T(
    '조리개는 한 칸 조일 때마다 심도를 √2배 깊게 하지만, 초점거리는 제곱으로 얕게 합니다. 그래서 렌즈를 두 배 길게 잡으면 조리개를 두 칸 조여도 되돌아오지 않습니다 — 인물에서 배경을 날리는 가장 확실한 방법이 망원인 까닭입니다.',
    'Closing the aperture one stop deepens the field by about √2, but doubling the focal length shallows it by a factor of four. Two stops cannot undo one doubling — which is why a longer lens, not a wider aperture, is the surest way to melt a portrait background.',
    'Cerrar un paso el diafragma aumenta la profundidad en torno a √2, pero doblar la focal la reduce cuatro veces. Dos pasos no compensan una duplicación: por eso el teleobjetivo, y no una apertura mayor, es el modo más seguro de fundir el fondo de un retrato.',
    'Fechar um ponto de diafragma aumenta a profundidade cerca de √2, mas dobrar a focal a reduz quatro vezes. Dois pontos não compensam uma duplicação: por isso a teleobjetiva, e não uma abertura maior, é o jeito mais certo de desmanchar o fundo de um retrato.',
    '絞りは1段絞るごとに深度を約√2倍にしますが、焦点距離は二乗で浅くします。だからレンズを2倍長くすると2段絞っても戻りません。ポートレートで背景を溶かす最も確実な方法が望遠なのはそのためです。',
    'Eine Blendenstufe zu schließen vertieft die Schärfe um etwa √2, doppelte Brennweite macht sie jedoch viermal flacher. Zwei Stufen holen eine Verdopplung nicht ein — deshalb ist das längere Objektiv, nicht die größere Blende, der sicherste Weg zum weichen Porträthintergrund.',
    'Fermer d’un cran approfondit la zone nette d’environ √2, mais doubler la focale la divise par quatre. Deux crans ne rattrapent pas un doublement : c’est pourquoi le téléobjectif, et non une plus grande ouverture, reste le moyen le plus sûr de fondre un arrière-plan de portrait.',
    'अपर्चर एक स्टॉप बंद करने पर गहराई लगभग √2 गुना बढ़ती है, पर फ़ोकल लंबाई दोगुनी करने पर वह चार गुना घट जाती है। दो स्टॉप एक दोगुनेपन की भरपाई नहीं करते — इसीलिए पोर्ट्रेट का बैकग्राउंड घोलने का सबसे पक्का तरीका लंबा लेंस है, बड़ा अपर्चर नहीं।',
    '光圈每收一档，景深约变深 √2 倍；而焦距翻倍会让景深变浅到四分之一。两档补不回一次翻倍 — 这就是为什么拍人像时化开背景最可靠的办法是长焦，而不是更大的光圈。',
    '光圈每收一檔，景深約變深 √2 倍；而焦距翻倍會讓景深變淺到四分之一。兩檔補不回一次翻倍 — 這就是為什麼拍人像時化開背景最可靠的辦法是長焦，而不是更大的光圈。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के मामले', '相邻组合', '相鄰組合'),
  focalRowTitle: T('같은 렌즈의 다른 조리개', 'Same lens, other apertures', 'Mismo objetivo, otros diafragmas', 'Mesma lente, outras aberturas', '同じレンズの他の絞り', 'Gleiches Objektiv, andere Blenden', 'Même objectif, autres ouvertures', 'वही लेंस, दूसरे अपर्चर', '同一镜头的其他光圈', '同一鏡頭的其他光圈'),
  apertureRowTitle: T('같은 조리개의 다른 렌즈', 'Same aperture, other lenses', 'Mismo diafragma, otros objetivos', 'Mesma abertura, outras lentes', '同じ絞りの他のレンズ', 'Gleiche Blende, andere Objektive', 'Même ouverture, autres objectifs', 'वही अपर्चर, दूसरे लेंस', '同一光圈的其他镜头', '同一光圈的其他鏡頭'),
  widerLabel: T('한 칸 열면', 'One stop wider', 'Un paso más abierto', 'Um ponto mais aberto', '1段開けると', 'Eine Stufe offener', 'Un cran plus ouvert', 'एक स्टॉप खुला', '开大一档', '開大一檔'),
  tighterLabel: T('한 칸 조이면', 'One stop tighter', 'Un paso más cerrado', 'Um ponto mais fechado', '1段絞ると', 'Eine Stufe geschlossener', 'Un cran plus fermé', 'एक स्टॉप बंद', '收小一档', '收小一檔'),
  shorterLabel: T('더 짧은 렌즈', 'Shorter lens', 'Objetivo más corto', 'Lente mais curta', 'より短いレンズ', 'Kürzeres Objektiv', 'Objectif plus court', 'छोटा लेंस', '更短的镜头', '更短的鏡頭'),
  longerLabel: T('더 긴 렌즈', 'Longer lens', 'Objetivo más largo', 'Lente mais longa', 'より長いレンズ', 'Längeres Objektiv', 'Objectif plus long', 'लंबा लेंस', '更长的镜头', '更長的鏡頭'),

  desc: T<(f: DofFacts) => string>(
    f => `${f.cell.focal}mm 렌즈를 f/${f.cell.aperture}로 쓰면 과초점거리가 ${f.hyperfocal}m이고, 거기에 맞추면 ${f.hyperfocalNear}m부터 무한대까지 맞아 보입니다. 2m 피사체의 앞뒤 폭은 ${depthAt(f, '무한대')}입니다.`,
    f => `A ${f.cell.focal} mm lens at f/${f.cell.aperture} has a hyperfocal distance of ${f.hyperfocal} m; focus there and everything from ${f.hyperfocalNear} m to infinity reads as sharp. At a subject 2 m away the sharp band is ${depthAt(f, 'unbounded')}.`,
    f => `Un objetivo de ${f.cell.focal} mm a f/${f.cell.aperture} tiene una hiperfocal de ${f.hyperfocal} m; enfoca ahí y todo desde ${f.hyperfocalNear} m al infinito se ve nítido. Con el sujeto a 2 m la franja nítida mide ${depthAt(f, 'sin límite')}.`,
    f => `Uma lente de ${f.cell.focal} mm a f/${f.cell.aperture} tem hiperfocal de ${f.hyperfocal} m; foque ali e tudo de ${f.hyperfocalNear} m ao infinito fica nítido. Com o sujeito a 2 m a faixa nítida mede ${depthAt(f, 'sem limite')}.`,
    f => `${f.cell.focal}mmレンズをf/${f.cell.aperture}で使うと過焦点距離は${f.hyperfocal}mで、そこに合わせれば${f.hyperfocalNear}mから無限遠まで合って見えます。2mの被写体では前後の幅が${depthAt(f, '無限')}です。`,
    f => `Ein ${f.cell.focal}-mm-Objektiv bei f/${f.cell.aperture} hat eine hyperfokale Distanz von ${f.hyperfocal} m; darauf scharfgestellt wirkt alles von ${f.hyperfocalNear} m bis unendlich scharf. Bei 2 m Motivdistanz ist der scharfe Bereich ${depthAt(f, 'unbegrenzt')}.`,
    f => `Un objectif de ${f.cell.focal} mm à f/${f.cell.aperture} a une hyperfocale de ${f.hyperfocal} m ; en y faisant le point, tout de ${f.hyperfocalNear} m à l’infini paraît net. À 2 m du sujet, la zone nette mesure ${depthAt(f, 'sans limite')}.`,
    f => `${f.cell.focal} mm लेंस f/${f.cell.aperture} पर हाइपरफ़ोकल दूरी ${f.hyperfocal} m देता है; वहाँ फ़ोकस करने पर ${f.hyperfocalNear} m से अनंत तक साफ़ दिखता है। 2 m दूर विषय पर साफ़ पट्टी ${depthAt(f, 'असीम')} है।`,
    f => `${f.cell.focal}mm 镜头用 f/${f.cell.aperture} 时超焦距是 ${f.hyperfocal} 米，对在那里，从 ${f.hyperfocalNear} 米到无限远都清晰。被摄体在 2 米时清晰范围为 ${depthAt(f, '无限')}。`,
    f => `${f.cell.focal}mm 鏡頭用 f/${f.cell.aperture} 時超焦距是 ${f.hyperfocal} 公尺，對在那裡，從 ${f.hyperfocalNear} 公尺到無限遠都清晰。被攝體在 2 公尺時清晰範圍為 ${depthAt(f, '無限')}。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '과초점거리에 맞추면 그 절반부터 무한대까지 맞아 보입니다.',
      '조리개는 한 칸에 √2배, 초점거리는 제곱으로 듭니다 — 렌즈 쪽이 훨씬 셉니다.',
      '이 값은 35mm 판형에서 허용 착란원 0.03mm을 잡은 것입니다.',
      '크게 인화하거나 100%로 들여다보면 실제 심도는 이보다 얕습니다.',
    ],
    [
      'Focus at the hyperfocal distance and everything from half of it to infinity looks sharp.',
      'One stop moves depth by √2; focal length moves it by the square — the lens wins by far.',
      'These figures assume the 35 mm format with a 0.03 mm circle of confusion.',
      'Print large or inspect at 100 % and the usable depth comes out shallower than this.',
    ],
    [
      'Enfoca a la hiperfocal y todo desde su mitad al infinito se ve nítido.',
      'Un paso mueve la profundidad en √2; la focal la mueve al cuadrado, y pesa mucho más.',
      'Estas cifras suponen formato de 35 mm con círculo de confusión de 0,03 mm.',
      'Si imprimes en grande o miras al 100 %, la profundidad real sale menor que esta.',
    ],
    [
      'Foque na hiperfocal e tudo da metade dela ao infinito fica nítido.',
      'Um ponto move a profundidade em √2; a focal move ao quadrado e pesa muito mais.',
      'Estes números supõem formato de 35 mm com círculo de confusão de 0,03 mm.',
      'Ao imprimir grande ou olhar a 100 %, a profundidade real sai menor que esta.',
    ],
    [
      '過焦点距離に合わせるとその半分から無限遠まで合って見えます。',
      '絞りは1段で√2倍、焦点距離は二乗で効きます。レンズのほうがずっと強いです。',
      'この値は35mm判で許容錯乱円0.03mmを取ったものです。',
      '大きく印刷したり100%で見ると実際の深度はこれより浅くなります。',
    ],
    [
      'Auf die hyperfokale Distanz scharfstellen: von deren Hälfte bis unendlich wirkt alles scharf.',
      'Eine Blendenstufe bringt √2, die Brennweite wirkt im Quadrat — das Objektiv gewinnt klar.',
      'Die Werte gelten fürs Kleinbild mit 0,03 mm Zerstreuungskreis.',
      'Bei großem Druck oder 100-%-Ansicht fällt die nutzbare Tiefe geringer aus.',
    ],
    [
      'Faites le point sur l’hyperfocale : de sa moitié à l’infini, tout paraît net.',
      'Un cran vaut √2 ; la focale agit au carré et pèse bien plus lourd.',
      'Ces valeurs supposent le format 35 mm avec un cercle de confusion de 0,03 mm.',
      'En grand tirage ou à 100 %, la profondeur utile est plus faible que celle-ci.',
    ],
    [
      'हाइपरफ़ोकल दूरी पर फ़ोकस करें तो उसके आधे से अनंत तक साफ़ दिखता है।',
      'एक स्टॉप से गहराई √2 गुना बदलती है; फ़ोकल लंबाई वर्ग में असर करती है और भारी पड़ती है।',
      'ये आँकड़े 35 mm फ़ॉर्मैट और 0.03 mm सर्कल ऑफ़ कन्फ़्यूज़न मानकर हैं।',
      'बड़ा प्रिंट या 100 % पर देखने पर असल गहराई इससे कम निकलती है।',
    ],
    [
      '对焦在超焦距上，从它的一半到无限远都会显得清晰。',
      '光圈每档影响 √2 倍，焦距按平方影响，镜头一方强得多。',
      '这些数值按 35mm 画幅、弥散圆 0.03 毫米计算。',
      '放大印刷或按 100 % 查看时，实际可用景深比这里更浅。',
    ],
    [
      '對焦在超焦距上，從它的一半到無限遠都會顯得清晰。',
      '光圈每檔影響 √2 倍，焦距按平方影響，鏡頭一方強得多。',
      '這些數值按 35mm 畫幅、彌散圓 0.03 公釐計算。',
      '放大印刷或按 100 % 檢視時，實際可用景深比這裡更淺。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '피사계 심도표 120칸 — 초점거리와 조리개별 과초점거리',
    'Depth-of-field table — hyperfocal distance by focal length and aperture',
    'Tabla de profundidad de campo — hiperfocal por focal y diafragma',
    'Tabela de profundidade de campo — hiperfocal por focal e abertura',
    '被写界深度表120マス — 焦点距離と絞り別の過焦点距離',
    'Schärfentiefe-Tabelle — hyperfokale Distanz nach Brennweite und Blende',
    'Table de profondeur de champ — hyperfocale par focale et ouverture',
    'फ़ील्ड गहराई तालिका — फ़ोकल लंबाई और अपर्चर के अनुसार',
    '景深表 120 格 — 按焦距和光圈的超焦距',
    '景深表 120 格 — 按焦距和光圈的超焦距',
  ),
  hubMetaDesc: T(
    '초점거리 12가지와 조리개 10가지가 만나는 120칸. 과초점거리와 피사체 거리별 앞뒤 한계, 판형별 값을 함께 봅니다.',
    'The 120 pairings of 12 focal lengths and 10 apertures: hyperfocal distance, near and far limits at six subject distances, and the same figures for three sensor formats.',
    'Las 120 combinaciones de 12 focales y 10 diafragmas: hiperfocal, límites cercano y lejano a seis distancias y las mismas cifras para tres formatos.',
    'As 120 combinações de 12 focais e 10 aberturas: hiperfocal, limites próximo e distante a seis distâncias e os mesmos números para três formatos.',
    '焦点距離12通りと絞り10通りが交わる120マス。過焦点距離、被写体距離ごとの前後の限界、判型別の値をまとめて見ます。',
    'Die 120 Paarungen aus 12 Brennweiten und 10 Blenden: hyperfokale Distanz, Nah- und Ferngrenze bei sechs Motivdistanzen und dieselben Werte für drei Formate.',
    'Les 120 croisements de 12 focales et 10 ouvertures : hyperfocale, limites proche et lointaine à six distances, et les mêmes valeurs pour trois formats.',
    '12 फ़ोकल लंबाइयों और 10 अपर्चर के 120 जोड़: हाइपरफ़ोकल दूरी, छह विषय दूरियों पर पास-दूर सीमा और तीन फ़ॉर्मैट के वही आँकड़े।',
    '12 种焦距与 10 种光圈组成的 120 格：超焦距、六个被摄距离下的前后清晰界限，以及三种画幅的同一组数值。',
    '12 種焦距與 10 種光圈組成的 120 格：超焦距、六個被攝距離下的前後清晰界限，以及三種畫幅的同一組數值。',
  ),

  metaTitle: T<(f: DofFacts) => string>(
    f => `${f.cell.focal}mm f/${f.cell.aperture} 심도 — 과초점거리 ${f.hyperfocal}m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} depth of field — hyperfocal ${f.hyperfocal} m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} profundidad — hiperfocal ${f.hyperfocal} m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} profundidade — hiperfocal ${f.hyperfocal} m`,
    f => `${f.cell.focal}mm f/${f.cell.aperture} 被写界深度 — 過焦点距離${f.hyperfocal}m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} Schärfentiefe — hyperfokal ${f.hyperfocal} m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} profondeur — hyperfocale ${f.hyperfocal} m`,
    f => `${f.cell.focal} mm f/${f.cell.aperture} गहराई — हाइपरफ़ोकल ${f.hyperfocal} m`,
    f => `${f.cell.focal}mm f/${f.cell.aperture} 景深 — 超焦距 ${f.hyperfocal} 米`,
    f => `${f.cell.focal}mm f/${f.cell.aperture} 景深 — 超焦距 ${f.hyperfocal} 公尺`,
  ),

  metaDesc: T<(f: DofFacts) => string>(
    f => `${f.cell.focal}mm 렌즈를 f/${f.cell.aperture}로 쓸 때 과초점거리는 ${f.hyperfocal}m이고, 거기에 맞추면 ${f.hyperfocalNear}m부터 무한대까지 맞습니다. 2m 피사체의 앞뒤 폭은 ${depthAt(f, '무한대')}, 판형별 값도 함께 있습니다.`,
    f => `At f/${f.cell.aperture} a ${f.cell.focal} mm lens has a hyperfocal distance of ${f.hyperfocal} m, sharp from ${f.hyperfocalNear} m to infinity when focused there. A subject at 2 m gets ${depthAt(f, 'an unbounded band')}, with the same figures given for three sensor formats.`,
    f => `A f/${f.cell.aperture} un objetivo de ${f.cell.focal} mm tiene hiperfocal de ${f.hyperfocal} m, nítido de ${f.hyperfocalNear} m al infinito si enfocas ahí. Un sujeto a 2 m obtiene ${depthAt(f, 'una franja sin límite')}, con las mismas cifras para tres formatos.`,
    f => `A f/${f.cell.aperture} uma lente de ${f.cell.focal} mm tem hiperfocal de ${f.hyperfocal} m, nítida de ${f.hyperfocalNear} m ao infinito se focar ali. Um sujeito a 2 m recebe ${depthAt(f, 'uma faixa sem limite')}, com os mesmos números para três formatos.`,
    f => `${f.cell.focal}mmレンズをf/${f.cell.aperture}で使うと過焦点距離は${f.hyperfocal}mで、そこに合わせれば${f.hyperfocalNear}mから無限遠まで合います。2mの被写体では前後${depthAt(f, '無限')}、判型別の値も載せています。`,
    f => `Bei f/${f.cell.aperture} liegt die hyperfokale Distanz eines ${f.cell.focal}-mm-Objektivs bei ${f.hyperfocal} m; darauf scharfgestellt reicht die Schärfe von ${f.hyperfocalNear} m bis unendlich. Ein Motiv auf 2 m bekommt ${depthAt(f, 'einen unbegrenzten Bereich')}, dazu dieselben Werte für drei Formate.`,
    f => `À f/${f.cell.aperture}, un ${f.cell.focal} mm a une hyperfocale de ${f.hyperfocal} m, net de ${f.hyperfocalNear} m à l’infini si l’on y fait le point. Un sujet à 2 m obtient ${depthAt(f, 'une zone sans limite')}, avec les mêmes valeurs pour trois formats.`,
    f => `f/${f.cell.aperture} पर ${f.cell.focal} mm लेंस की हाइपरफ़ोकल दूरी ${f.hyperfocal} m है; वहाँ फ़ोकस करने पर ${f.hyperfocalNear} m से अनंत तक साफ़। 2 m पर विषय को ${depthAt(f, 'असीम पट्टी')} मिलती है, तीन फ़ॉर्मैट के आँकड़े भी हैं।`,
    f => `${f.cell.focal}mm 镜头在 f/${f.cell.aperture} 下超焦距为 ${f.hyperfocal} 米，对在那里可从 ${f.hyperfocalNear} 米清晰到无限远。被摄体在 2 米时得到 ${depthAt(f, '无限范围')}，并附三种画幅的同组数值。`,
    f => `${f.cell.focal}mm 鏡頭在 f/${f.cell.aperture} 下超焦距為 ${f.hyperfocal} 公尺，對在那裡可從 ${f.hyperfocalNear} 公尺清晰到無限遠。被攝體在 2 公尺時得到 ${depthAt(f, '無限範圍')}，並附三種畫幅的同組數值。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '배경을 가장 잘 날리려면 무엇을 바꿔야 하나요?', a: '렌즈를 길게 잡는 쪽이 가장 셉니다. 조리개는 한 칸에 √2배씩만 움직이는데 초점거리는 제곱으로 듭니다. 50mm f/1.8보다 100mm f/2.8이 더 얕습니다.' },
      { q: '풍경에서는 어디에 초점을 맞추나요?', a: '과초점거리에 맞춥니다. 그러면 그 절반 지점부터 무한대까지 맞아 보여, 무한대에 맞추는 것보다 앞쪽을 두 배 가까이 법니다.' },
      { q: '판형이 작으면 정말 심도가 깊나요?', a: '같은 초점거리·조리개만 놓고 보면 오히려 얕습니다. 다만 같은 화각을 얻으려 더 짧은 렌즈를 쓰게 되고, 그쪽이 훨씬 세서 결과는 깊어집니다.' },
      { q: '이 표를 그대로 믿어도 되나요?', a: '허용 착란원 0.03mm이라는 약속 위의 값입니다. 크게 인화하거나 화면에서 100%로 보면 기준이 엄해져 실제로는 더 얕게 느껴집니다.' },
      { q: '조리개를 끝까지 조이면 가장 선명한가요?', a: '심도는 깊어지지만 f/16을 넘으면 회절 때문에 전체 해상력이 떨어집니다. 대개 f/8에서 f/11 사이가 가장 또렷합니다.' },
    ],
    [
      { q: 'What should I change to blur the background most?', a: 'Reach for a longer lens. An aperture stop moves depth by about √2, while focal length works as a square — 100 mm at f/2.8 is shallower than 50 mm at f/1.8.' },
      { q: 'Where do I focus for a landscape?', a: 'At the hyperfocal distance. Everything from half of it to infinity then reads as sharp, which buys nearly twice the foreground that focusing at infinity gives you.' },
      { q: 'Do smaller sensors really give more depth?', a: 'At the same focal length and aperture they give slightly less. But you pick a shorter lens to keep the same angle of view, and that effect is far stronger, so the picture ends up deeper.' },
      { q: 'Can I trust these numbers as they stand?', a: 'They rest on a 0.03 mm circle of confusion. Print large or inspect at 100 % and the standard tightens, so the depth you can actually use is shallower.' },
      { q: 'Is the smallest aperture always the sharpest?', a: 'Depth keeps growing, but past f/16 diffraction pulls overall resolution down. Most lenses look crispest somewhere between f/8 and f/11.' },
    ],
    [
      { q: '¿Qué cambio para desenfocar más el fondo?', a: 'Usa un objetivo más largo. Un paso de diafragma mueve la profundidad en torno a √2, mientras que la focal actúa al cuadrado: 100 mm a f/2,8 es más corto de profundidad que 50 mm a f/1,8.' },
      { q: '¿Dónde enfoco en un paisaje?', a: 'En la distancia hiperfocal. Todo desde su mitad al infinito se ve nítido, lo que gana casi el doble de primer plano que enfocar al infinito.' },
      { q: '¿Los sensores pequeños dan más profundidad?', a: 'Con la misma focal y diafragma dan algo menos. Pero se elige una focal más corta para mantener el ángulo, y eso pesa mucho más, así que la imagen sale más profunda.' },
      { q: '¿Puedo fiarme de estas cifras tal cual?', a: 'Se apoyan en un círculo de confusión de 0,03 mm. Al imprimir en grande o mirar al 100 % el criterio se endurece y la profundidad utilizable es menor.' },
      { q: '¿El diafragma más cerrado es el más nítido?', a: 'La profundidad sigue creciendo, pero pasado f/16 la difracción baja la resolución global. La mayoría de objetivos rinde mejor entre f/8 y f/11.' },
    ],
    [
      { q: 'O que mudo para desfocar mais o fundo?', a: 'Use uma lente mais longa. Um ponto de diafragma move a profundidade cerca de √2, enquanto a focal age ao quadrado: 100 mm a f/2,8 é mais raso que 50 mm a f/1,8.' },
      { q: 'Onde foco numa paisagem?', a: 'Na distância hiperfocal. Tudo da metade dela ao infinito fica nítido, o que rende quase o dobro de primeiro plano em relação a focar no infinito.' },
      { q: 'Sensores menores dão mesmo mais profundidade?', a: 'Com a mesma focal e abertura dão um pouco menos. Mas escolhe-se uma focal mais curta para manter o ângulo, e isso pesa muito mais, então a imagem sai mais profunda.' },
      { q: 'Posso confiar nestes números como estão?', a: 'Eles se apoiam num círculo de confusão de 0,03 mm. Ao imprimir grande ou olhar a 100 % o critério aperta e a profundidade utilizável fica menor.' },
      { q: 'A abertura mais fechada é sempre a mais nítida?', a: 'A profundidade continua crescendo, mas depois de f/16 a difração derruba a resolução geral. A maioria das lentes rende melhor entre f/8 e f/11.' },
    ],
    [
      { q: '背景を最も溶かすには何を変えますか。', a: 'レンズを長くするのが最も効きます。絞りは1段で約√2倍しか動きませんが、焦点距離は二乗で効きます。50mm f/1.8より100mm f/2.8のほうが浅くなります。' },
      { q: '風景ではどこにピントを合わせますか。', a: '過焦点距離に合わせます。その半分から無限遠までが合って見えるので、無限遠に合わせるより手前を倍近く稼げます。' },
      { q: '判型が小さいと本当に深くなりますか。', a: '同じ焦点距離と絞りで見ればむしろ浅いです。ただし同じ画角を得るため短いレンズを使うことになり、そちらがはるかに強いので結果は深くなります。' },
      { q: 'この表をそのまま信じてよいですか。', a: '許容錯乱円0.03mmという約束の上の値です。大きく印刷したり画面で100%に拡大すると基準が厳しくなり、実際にはもっと浅く感じます。' },
      { q: '絞り切れば最も鮮明ですか。', a: '深度は増えますが、f/16を超えると回折で全体の解像力が落ちます。多くのレンズはf/8からf/11あたりが最もくっきりします。' },
    ],
    [
      { q: 'Was ändere ich, um den Hintergrund am stärksten aufzulösen?', a: 'Nehmen Sie ein längeres Objektiv. Eine Blendenstufe bewegt die Tiefe um etwa √2, die Brennweite wirkt im Quadrat — 100 mm bei f/2,8 ist flacher als 50 mm bei f/1,8.' },
      { q: 'Worauf stelle ich bei Landschaften scharf?', a: 'Auf die hyperfokale Distanz. Von deren Hälfte bis unendlich wirkt alles scharf, was fast doppelt so viel Vordergrund bringt wie Scharfstellen auf unendlich.' },
      { q: 'Geben kleine Sensoren wirklich mehr Tiefe?', a: 'Bei gleicher Brennweite und Blende sogar etwas weniger. Man greift jedoch zu einer kürzeren Brennweite für denselben Bildwinkel, und das wiegt weit schwerer — das Bild wird tiefer.' },
      { q: 'Kann ich diesen Zahlen so vertrauen?', a: 'Sie beruhen auf 0,03 mm Zerstreuungskreis. Bei großem Druck oder 100-%-Ansicht wird der Maßstab strenger, die nutzbare Tiefe also geringer.' },
      { q: 'Ist die kleinste Blende immer die schärfste?', a: 'Die Tiefe wächst weiter, doch jenseits von f/16 drückt Beugung die Gesamtauflösung. Die meisten Objektive wirken zwischen f/8 und f/11 am knackigsten.' },
    ],
    [
      { q: 'Que changer pour flouter au maximum l’arrière-plan ?', a: 'Prenez une focale plus longue. Un cran de diaphragme déplace la profondeur d’environ √2, alors que la focale agit au carré : un 100 mm à f/2,8 est plus court qu’un 50 mm à f/1,8.' },
      { q: 'Où faire le point en paysage ?', a: 'Sur la distance hyperfocale. Tout, de sa moitié à l’infini, paraît net, ce qui gagne près du double de premier plan par rapport à une mise au point à l’infini.' },
      { q: 'Les petits capteurs donnent-ils vraiment plus de profondeur ?', a: 'À focale et ouverture égales, un peu moins. Mais on choisit une focale plus courte pour garder l’angle, et cet effet pèse bien plus : l’image devient plus profonde.' },
      { q: 'Puis-je me fier à ces chiffres tels quels ?', a: 'Ils reposent sur un cercle de confusion de 0,03 mm. En grand tirage ou à 100 %, le critère se durcit et la profondeur exploitable est plus faible.' },
      { q: 'La plus petite ouverture est-elle la plus nette ?', a: 'La profondeur continue d’augmenter, mais au-delà de f/16 la diffraction fait chuter la résolution globale. La plupart des objectifs sont au mieux entre f/8 et f/11.' },
    ],
    [
      { q: 'बैकग्राउंड सबसे ज़्यादा धुंधला करने के लिए क्या बदलूँ?', a: 'लंबा लेंस लें। अपर्चर का एक स्टॉप गहराई को लगभग √2 गुना बदलता है, जबकि फ़ोकल लंबाई वर्ग में काम करती है — 100 mm f/2.8, 50 mm f/1.8 से भी उथला है।' },
      { q: 'लैंडस्केप में कहाँ फ़ोकस करूँ?', a: 'हाइपरफ़ोकल दूरी पर। तब उसके आधे से अनंत तक साफ़ दिखता है, जो अनंत पर फ़ोकस करने से लगभग दोगुना अगला हिस्सा देता है।' },
      { q: 'क्या छोटे सेंसर सचमुच ज़्यादा गहराई देते हैं?', a: 'एक ही फ़ोकल लंबाई और अपर्चर पर थोड़ी कम। पर वही कोण पाने के लिए छोटी फ़ोकल लंबाई चुनी जाती है, और वह असर कहीं बड़ा है, इसलिए तस्वीर गहरी बनती है।' },
      { q: 'क्या इन आँकड़ों पर सीधे भरोसा करूँ?', a: 'ये 0.03 mm सर्कल ऑफ़ कन्फ़्यूज़न पर टिके हैं। बड़ा प्रिंट या 100 % पर देखने से मानक कड़ा होता है और उपयोगी गहराई कम रह जाती है।' },
      { q: 'सबसे छोटा अपर्चर सबसे शार्प होता है?', a: 'गहराई बढ़ती रहती है, पर f/16 के बाद विवर्तन से कुल रिज़ॉल्यूशन गिरता है। ज़्यादातर लेंस f/8 से f/11 के बीच सबसे साफ़ दिखते हैं।' },
    ],
    [
      { q: '想把背景虚化到最大该改什么？', a: '换更长的镜头。光圈一档只带来约 √2 倍的变化，而焦距按平方起作用 — 100mm f/2.8 比 50mm f/1.8 还要浅。' },
      { q: '拍风景该对焦在哪里？', a: '对在超焦距上。这样从它的一半到无限远都清晰，比对焦到无限远多留出近一倍的前景。' },
      { q: '小画幅真的景深更深吗？', a: '在相同焦距和光圈下反而略浅。但为了取得相同视角会换用更短的镜头，那个作用大得多，所以成片更深。' },
      { q: '这些数字可以直接照用吗？', a: '它们建立在弥散圆 0.03 毫米这个约定之上。放大印刷或按 100 % 查看时标准更严，实际可用的景深更浅。' },
      { q: '光圈收到最小就最锐利吗？', a: '景深会继续变深，但超过 f/16 后衍射会拉低整体解像力。多数镜头在 f/8 到 f/11 之间最清楚。' },
    ],
    [
      { q: '想把背景虛化到最大該改什麼？', a: '換更長的鏡頭。光圈一檔只帶來約 √2 倍的變化，而焦距按平方起作用 — 100mm f/2.8 比 50mm f/1.8 還要淺。' },
      { q: '拍風景該對焦在哪裡？', a: '對在超焦距上。這樣從它的一半到無限遠都清晰，比對焦到無限遠多留出近一倍的前景。' },
      { q: '小畫幅真的景深更深嗎？', a: '在相同焦距和光圈下反而略淺。但為了取得相同視角會換用更短的鏡頭，那個作用大得多，所以成片更深。' },
      { q: '這些數字可以直接照用嗎？', a: '它們建立在彌散圓 0.03 公釐這個約定之上。放大印刷或按 100 % 檢視時標準更嚴，實際可用的景深更淺。' },
      { q: '光圈收到最小就最銳利嗎？', a: '景深會繼續變深，但超過 f/16 後繞射會拉低整體解像力。多數鏡頭在 f/8 到 f/11 之間最清楚。' },
    ],
  ),

  cellFaq: T<(f: DofFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.focal}mm f/${f.cell.aperture}의 과초점거리는 얼마인가요?`, a: `${f.hyperfocal}m입니다. 거기에 초점을 맞추면 ${f.hyperfocalNear}m부터 무한대까지 맞아 보입니다.` },
      { q: '2m 앞 인물을 찍으면 앞뒤로 얼마나 맞나요?', a: `앞뒤 폭이 ${depthAt(f, '무한대')}입니다. 눈에 맞췄다면 코와 귀가 그 안에 드는지가 갈리는 자리입니다.` },
      { q: '작은 판형 카메라에서는 어떻게 되나요?', a: `APS-C에서는 과초점거리가 ${f.formats[1].hyperfocal}m, 마이크로 포서드에서는 ${f.formats[2].hyperfocal}m입니다. 같은 렌즈를 그대로 끼웠을 때의 값입니다.` },
      { q: '한 칸 조이면 얼마나 달라지나요?', a: f.tighter ? `f/${f.tighter.aperture}가 되어 과초점거리가 그만큼 가까워집니다. 심도는 √2배쯤 깊어집니다.` : '더 조일 칸이 이 표에는 없습니다. 여기서부터는 회절이 해상력을 깎기 시작합니다.' },
    ],
    f => [
      { q: `What is the hyperfocal distance of ${f.cell.focal} mm at f/${f.cell.aperture}?`, a: `${f.hyperfocal} m. Focus there and everything from ${f.hyperfocalNear} m to infinity reads as sharp.` },
      { q: 'How much stays sharp around a subject 2 m away?', a: `The sharp band is ${depthAt(f, 'unbounded')}. Focused on the eyes, that is what decides whether the nose and ears fall inside it.` },
      { q: 'What happens on a smaller format?', a: `The hyperfocal distance becomes ${f.formats[1].hyperfocal} m on APS-C and ${f.formats[2].hyperfocal} m on Micro Four Thirds, with the very same lens mounted.` },
      { q: 'How much does one stop change things?', a: f.tighter ? `You land on f/${f.tighter.aperture}, which pulls the hyperfocal distance closer and deepens the field by about √2.` : 'There is no tighter stop in this table. Past here diffraction starts eating into resolution.' },
    ],
    f => [
      { q: `¿Cuál es la hiperfocal de ${f.cell.focal} mm a f/${f.cell.aperture}?`, a: `${f.hyperfocal} m. Enfocando ahí, todo desde ${f.hyperfocalNear} m al infinito se ve nítido.` },
      { q: '¿Cuánto queda nítido con el sujeto a 2 m?', a: `La franja nítida mide ${depthAt(f, 'sin límite')}. Enfocando a los ojos, eso decide si la nariz y las orejas caen dentro.` },
      { q: '¿Qué ocurre en un formato menor?', a: `La hiperfocal pasa a ${f.formats[1].hyperfocal} m en APS-C y a ${f.formats[2].hyperfocal} m en Micro Cuatro Tercios, con el mismo objetivo montado.` },
      { q: '¿Cuánto cambia un paso de diafragma?', a: f.tighter ? `Llegas a f/${f.tighter.aperture}, lo que acerca la hiperfocal y aumenta la profundidad en torno a √2.` : 'No hay un paso más cerrado en esta tabla. A partir de aquí la difracción empieza a restar resolución.' },
    ],
    f => [
      { q: `Qual é a hiperfocal de ${f.cell.focal} mm a f/${f.cell.aperture}?`, a: `${f.hyperfocal} m. Focando ali, tudo de ${f.hyperfocalNear} m ao infinito fica nítido.` },
      { q: 'Quanto fica nítido com o sujeito a 2 m?', a: `A faixa nítida mede ${depthAt(f, 'sem limite')}. Focando nos olhos, é isso que decide se nariz e orelhas caem dentro.` },
      { q: 'O que muda num formato menor?', a: `A hiperfocal passa a ${f.formats[1].hyperfocal} m em APS-C e a ${f.formats[2].hyperfocal} m em Micro Quatro Terços, com a mesma lente montada.` },
      { q: 'Quanto muda um ponto de diafragma?', a: f.tighter ? `Você chega a f/${f.tighter.aperture}, o que aproxima a hiperfocal e aumenta a profundidade cerca de √2.` : 'Não há ponto mais fechado nesta tabela. Daqui em diante a difração começa a tirar resolução.' },
    ],
    f => [
      { q: `${f.cell.focal}mm f/${f.cell.aperture}の過焦点距離はどれだけですか。`, a: `${f.hyperfocal}mです。そこに合わせれば${f.hyperfocalNear}mから無限遠まで合って見えます。` },
      { q: '2m先の人物ではどこまで合いますか。', a: `前後の幅が${depthAt(f, '無限')}です。目に合わせたなら、鼻と耳がその中に入るかが分かれる場所です。` },
      { q: '小さい判型ではどうなりますか。', a: `APS-Cでは過焦点距離が${f.formats[1].hyperfocal}m、マイクロフォーサーズでは${f.formats[2].hyperfocal}mです。同じレンズをそのまま付けたときの値です。` },
      { q: '1段絞るとどれだけ変わりますか。', a: f.tighter ? `f/${f.tighter.aperture}になり、過焦点距離がその分近づきます。深度は約√2倍深くなります。` : 'これ以上絞る段はこの表にありません。ここからは回折が解像力を削り始めます。' },
    ],
    f => [
      { q: `Wie groß ist die hyperfokale Distanz von ${f.cell.focal} mm bei f/${f.cell.aperture}?`, a: `${f.hyperfocal} m. Darauf scharfgestellt wirkt alles von ${f.hyperfocalNear} m bis unendlich scharf.` },
      { q: 'Wie viel bleibt bei 2 m Motivdistanz scharf?', a: `Der scharfe Bereich ist ${depthAt(f, 'unbegrenzt')}. Auf die Augen fokussiert entscheidet das, ob Nase und Ohren hineinfallen.` },
      { q: 'Was passiert bei kleinerem Format?', a: `Die hyperfokale Distanz wird ${f.formats[1].hyperfocal} m bei APS-C und ${f.formats[2].hyperfocal} m bei Micro Four Thirds — mit demselben Objektiv.` },
      { q: 'Wie viel bringt eine Blendenstufe?', a: f.tighter ? `Sie landen bei f/${f.tighter.aperture}: die hyperfokale Distanz rückt näher, die Tiefe wächst um etwa √2.` : 'Eine engere Stufe führt diese Tabelle nicht. Ab hier knabbert Beugung an der Auflösung.' },
    ],
    f => [
      { q: `Quelle est l’hyperfocale d’un ${f.cell.focal} mm à f/${f.cell.aperture} ?`, a: `${f.hyperfocal} m. En y faisant le point, tout de ${f.hyperfocalNear} m à l’infini paraît net.` },
      { q: 'Quelle zone reste nette avec un sujet à 2 m ?', a: `La zone nette mesure ${depthAt(f, 'sans limite')}. Point fait sur les yeux, c’est ce qui décide si le nez et les oreilles y entrent.` },
      { q: 'Que devient-elle sur un format plus petit ?', a: `L’hyperfocale passe à ${f.formats[1].hyperfocal} m en APS-C et à ${f.formats[2].hyperfocal} m en Micro Quatre Tiers, avec le même objectif monté.` },
      { q: 'Que change un cran de diaphragme ?', a: f.tighter ? `Vous arrivez à f/${f.tighter.aperture} : l’hyperfocale se rapproche et la profondeur gagne environ √2.` : 'Ce tableau ne va pas plus loin. Au-delà, la diffraction commence à ronger la résolution.' },
    ],
    f => [
      { q: `${f.cell.focal} mm f/${f.cell.aperture} की हाइपरफ़ोकल दूरी क्या है?`, a: `${f.hyperfocal} m। वहाँ फ़ोकस करने पर ${f.hyperfocalNear} m से अनंत तक साफ़ दिखता है।` },
      { q: '2 m दूर विषय के आगे-पीछे कितना साफ़ रहता है?', a: `साफ़ पट्टी ${depthAt(f, 'असीम')} है। आँखों पर फ़ोकस हो तो यही तय करता है कि नाक और कान उसमें आते हैं या नहीं।` },
      { q: 'छोटे फ़ॉर्मैट पर क्या होता है?', a: `वही लेंस लगाने पर हाइपरफ़ोकल दूरी APS-C में ${f.formats[1].hyperfocal} m और माइक्रो फ़ोर थर्ड्स में ${f.formats[2].hyperfocal} m हो जाती है।` },
      { q: 'एक स्टॉप से कितना फ़र्क पड़ता है?', a: f.tighter ? `आप f/${f.tighter.aperture} पर पहुँचते हैं, हाइपरफ़ोकल दूरी पास आ जाती है और गहराई लगभग √2 गुना बढ़ती है।` : 'इस तालिका में इससे तंग स्टॉप नहीं है। यहाँ से आगे विवर्तन रिज़ॉल्यूशन घटाने लगता है।' },
    ],
    f => [
      { q: `${f.cell.focal}mm f/${f.cell.aperture} 的超焦距是多少？`, a: `${f.hyperfocal} 米。对在那里，从 ${f.hyperfocalNear} 米到无限远都清晰。` },
      { q: '被摄体在 2 米时前后能清晰多少？', a: `清晰范围是 ${depthAt(f, '无限')}。若对焦在眼睛上，这决定了鼻子和耳朵是否落在范围内。` },
      { q: '换到小画幅会怎样？', a: `同一支镜头装上后，超焦距在 APS-C 上变为 ${f.formats[1].hyperfocal} 米，在微型四分之三上为 ${f.formats[2].hyperfocal} 米。` },
      { q: '收小一档差别有多大？', a: f.tighter ? `会变成 f/${f.tighter.aperture}，超焦距随之拉近，景深约变深 √2 倍。` : '本表没有更小的光圈了。再往下衍射就开始削弱解像力。' },
    ],
    f => [
      { q: `${f.cell.focal}mm f/${f.cell.aperture} 的超焦距是多少？`, a: `${f.hyperfocal} 公尺。對在那裡，從 ${f.hyperfocalNear} 公尺到無限遠都清晰。` },
      { q: '被攝體在 2 公尺時前後能清晰多少？', a: `清晰範圍是 ${depthAt(f, '無限')}。若對焦在眼睛上，這決定了鼻子和耳朵是否落在範圍內。` },
      { q: '換到小畫幅會怎樣？', a: `同一支鏡頭裝上後，超焦距在 APS-C 上變為 ${f.formats[1].hyperfocal} 公尺，在微型四分之三上為 ${f.formats[2].hyperfocal} 公尺。` },
      { q: '收小一檔差別有多大？', a: f.tighter ? `會變成 f/${f.tighter.aperture}，超焦距隨之拉近，景深約變深 √2 倍。` : '本表沒有更小的光圈了。再往下繞射就開始削弱解像力。' },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DOF_UI: L<DofUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DofUI>;
