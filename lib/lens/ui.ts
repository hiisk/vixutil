/**
 * 렌즈 화각 화면의 문구 — 여덟 언어.
 *
 * 초점거리와 센서 이름은 만국 공통이라 옮기지 않는다. 50mm는 어디서나 50mm이고
 * APS-C는 APS-C다. 옮기는 것은 갈래 이름과 설명, 화면 틀뿐이다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang8.ts';
import type { SensorKey } from './list.ts';
import type { LensFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export type LensKind = 'ultrawide' | 'wide' | 'standard' | 'tele' | 'supertele';

export interface LensUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  sensorNote: Record<SensorKey, string>;
  kindLabel: Record<LensKind, string>;
  kindNote: Record<LensKind, string>;
  diagonalLabel: string;
  horizontalLabel: string;
  verticalLabel: string;
  cropLabel: string;
  equivLabel: string;
  widthLabel: string;
  kindTitle: string;
  degUnit: (n: number) => string;
  meterUnit: (n: number) => string;
  sameFovTitle: string;
  sameFovNote: string;
  neighbourTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (focal: number, sensor: string) => string;
  metaDesc: (f: LensFacts, kind: string) => string;
  hubFaq: FaqItem[];
  lensFaq: (f: LensFacts, kind: string) => FaqItem[];
}

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

type Spec = { [K in keyof LensUI]: L8<LensUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),
  section: T('렌즈 화각', 'Lens angle of view', 'Ángulo de visión', 'Ângulo de visão', 'レンズの画角', 'Bildwinkel', 'Angle de champ', 'लेंस दृश्य कोण'),

  hubTitle: T(
    '렌즈 화각 104가지',
    'Angle of view for 104 lenses',
    'Ángulo de visión de 104 objetivos',
    'Ângulo de visão de 104 lentes',
    'レンズ104本の画角',
    'Bildwinkel von 104 Objektiven',
    "Angle de champ de 104 objectifs",
    '104 लेंस के दृश्य कोण',
  ),

  hubLead: T(
    '초점거리와 센서 크기를 고르면 화각과 35mm 환산 초점거리, 두 걸음 앞에서 담기는 폭까지 계산해 보여 줍니다.',
    'Pick a focal length and a sensor and see the angle of view, the 35 mm equivalent and how wide a frame you get two paces away.',
    'Elige distancia focal y sensor para ver el ángulo de visión, el equivalente a 35 mm y el ancho que abarcas a dos pasos.',
    'Escolha a distância focal e o sensor para ver o ângulo de visão, o equivalente a 35 mm e a largura enquadrada a dois passos.',
    '焦点距離とセンサーの大きさを選ぶと、画角と35mm換算、2メートル先で写る幅まで計算して表示します。',
    'Brennweite und Sensor wählen — und Bildwinkel, Kleinbildäquivalent sowie die erfasste Breite auf zwei Meter ablesen.',
    "Choisissez focale et capteur pour voir l'angle de champ, l'équivalent 24×36 et la largeur cadrée à deux pas.",
    'फ़ोकल लंबाई और सेंसर चुनें और देखें दृश्य कोण, 35 मिमी समतुल्य और दो क़दम की दूरी पर कितनी चौड़ाई आती है।',
  ),

  sensorNote: T(
    {
      ff: '36×24mm 판입니다. 화각의 기준이 되는 크기라 환산 배수가 1입니다.',
      apsc: '풀프레임보다 한 단계 작습니다. 같은 렌즈를 끼우면 화각이 좁아져 망원처럼 보입니다.',
      mft: '17.3×13mm 판입니다. 크롭 배수가 2배라 초점거리를 두 배로 읽으면 됩니다.',
      'one-inch': '고급 소형 카메라와 드론에 들어가는 크기입니다. 크롭 배수가 2.7 안팎입니다.',
    },
    {
      ff: 'The 36×24 mm frame. It is the reference for angle of view, so its crop factor is 1.',
      apsc: 'One step smaller than full frame; the same lens covers a narrower field and looks longer.',
      mft: 'A 17.3×13 mm frame with a crop factor of 2 — just double the focal length to read it.',
      'one-inch': 'The size found in premium compacts and drones, with a crop factor near 2.7.',
    },
    {
      ff: 'El formato de 36×24 mm. Es la referencia del ángulo de visión, así que su factor de recorte es 1.',
      apsc: 'Un paso menor que el full frame; el mismo objetivo abarca menos y parece más largo.',
      mft: 'Un formato de 17,3×13 mm con factor 2: basta duplicar la focal para leerlo.',
      'one-inch': 'El tamaño de compactas avanzadas y drones, con un factor cercano a 2,7.',
    },
    {
      ff: 'O formato de 36×24 mm. É a referência do ângulo de visão, então seu fator de corte é 1.',
      apsc: 'Um passo menor que o full frame; a mesma lente abrange menos e parece mais longa.',
      mft: 'Um formato de 17,3×13 mm com fator 2: basta dobrar a distância focal.',
      'one-inch': 'O tamanho de compactas avançadas e drones, com fator perto de 2,7.',
    },
    {
      ff: '36×24mm の判です。画角の基準になる大きさなので換算倍率は1です。',
      apsc: 'フルサイズより一回り小さい判です。同じレンズを付けると画角が狭くなり、望遠寄りに見えます。',
      mft: '17.3×13mm の判です。クロップ倍率が2倍なので焦点距離を二倍に読めば済みます。',
      'one-inch': '高級コンパクトやドローンに入る大きさです。クロップ倍率は2.7前後です。',
    },
    {
      ff: 'Das 36×24-mm-Format. Es ist die Referenz für den Bildwinkel, sein Cropfaktor ist daher 1.',
      apsc: 'Eine Stufe kleiner als Kleinbild; dasselbe Objektiv zeigt weniger und wirkt länger.',
      mft: 'Ein 17,3×13-mm-Format mit Cropfaktor 2 — einfach die Brennweite verdoppeln.',
      'one-inch': 'Die Größe in hochwertigen Kompaktkameras und Drohnen, Cropfaktor um 2,7.',
    },
    {
      ff: "Le format 36×24 mm. Il sert de référence à l'angle de champ, son facteur de recadrage vaut donc 1.",
      apsc: "Un cran plus petit que le plein format ; le même objectif couvre moins et paraît plus long.",
      mft: 'Un format 17,3×13 mm au facteur 2 : il suffit de doubler la focale.',
      'one-inch': "La taille des compacts experts et des drones, avec un facteur voisin de 2,7.",
    },
    {
      ff: '36×24 मिमी का फ़ॉर्मैट। यही दृश्य कोण का मानक है, इसलिए इसका क्रॉप फ़ैक्टर 1 है।',
      apsc: 'फ़ुल फ़्रेम से एक पायदान छोटा; वही लेंस कम क्षेत्र दिखाता है और लंबा लगता है।',
      mft: '17.3×13 मिमी का फ़ॉर्मैट, क्रॉप फ़ैक्टर 2 — फ़ोकल लंबाई दोगुनी पढ़ लीजिए।',
      'one-inch': 'उन्नत कॉम्पैक्ट कैमरों और ड्रोन में मिलने वाला आकार, क्रॉप फ़ैक्टर लगभग 2.7।',
    },
  ),

  kindLabel: T(
    { ultrawide: '초광각', wide: '광각', standard: '표준', tele: '망원', supertele: '초망원' },
    { ultrawide: 'Ultra-wide', wide: 'Wide', standard: 'Standard', tele: 'Telephoto', supertele: 'Super telephoto' },
    { ultrawide: 'Ultra gran angular', wide: 'Gran angular', standard: 'Normal', tele: 'Teleobjetivo', supertele: 'Súper teleobjetivo' },
    { ultrawide: 'Ultragrande-angular', wide: 'Grande-angular', standard: 'Normal', tele: 'Teleobjetiva', supertele: 'Super teleobjetiva' },
    { ultrawide: '超広角', wide: '広角', standard: '標準', tele: '望遠', supertele: '超望遠' },
    { ultrawide: 'Ultraweitwinkel', wide: 'Weitwinkel', standard: 'Normal', tele: 'Tele', supertele: 'Supertele' },
    { ultrawide: 'Ultra grand-angle', wide: 'Grand-angle', standard: 'Standard', tele: 'Téléobjectif', supertele: 'Super téléobjectif' },
    { ultrawide: 'अल्ट्रा-वाइड', wide: 'वाइड', standard: 'स्टैंडर्ड', tele: 'टेलीफ़ोटो', supertele: 'सुपर टेलीफ़ोटो' },
  ),

  kindNote: T(
    {
      ultrawide: '한 화면에 아주 넓게 담깁니다. 가장자리가 늘어나 보이므로 사람을 끝에 두지 마세요.',
      wide: '좁은 실내와 풍경에 씁니다. 가까이 다가가 찍으면 앞의 것이 크게 강조됩니다.',
      standard: '사람 눈으로 보는 느낌과 가장 가깝습니다. 일상 사진에 가장 무난한 화각입니다.',
      tele: '멀리 있는 것을 끌어옵니다. 배경이 압축되고 흐려져 인물에 잘 맞습니다.',
      supertele: '새와 경기장처럼 다가갈 수 없는 대상에 씁니다. 흔들림에 아주 민감합니다.',
    },
    {
      ultrawide: 'Fits a great deal into one frame; edges stretch, so keep people away from the corners.',
      wide: 'For tight interiors and landscapes. Step close and whatever is in front looms large.',
      standard: 'Closest to how the eye takes a scene in — the safest choice for everyday photographs.',
      tele: 'Pulls distant things closer, compresses the background and blurs it, which flatters portraits.',
      supertele: 'For subjects you cannot approach — birds, stadiums. Extremely sensitive to shake.',
    },
    {
      ultrawide: 'Abarca muchísimo en un solo encuadre; los bordes se estiran, así que no pongas gente en las esquinas.',
      wide: 'Para interiores estrechos y paisajes. Si te acercas, lo que está delante se agranda mucho.',
      standard: 'Lo más parecido a cómo mira el ojo: la elección más segura para el día a día.',
      tele: 'Acerca lo lejano, comprime el fondo y lo desenfoca, algo que favorece a los retratos.',
      supertele: 'Para lo que no puedes acercarte: aves, estadios. Muy sensible a las trepidaciones.',
    },
    {
      ultrawide: 'Cabe muita coisa num só quadro; as bordas se esticam, então evite gente nos cantos.',
      wide: 'Para interiores apertados e paisagens. Chegando perto, o que está à frente cresce muito.',
      standard: 'O mais próximo do modo como o olho vê — a escolha mais segura no dia a dia.',
      tele: 'Traz o distante para perto, comprime o fundo e o desfoca, o que favorece retratos.',
      supertele: 'Para o que não dá para chegar perto: aves, estádios. Muito sensível a trepidação.',
    },
    {
      ultrawide: '一枚にとても広く収まります。端が伸びて見えるので、人を隅に置かないでください。',
      wide: '狭い室内や風景に使います。近づいて撮ると手前のものが大きく強調されます。',
      standard: '人の目で見た感じにいちばん近い画角です。日常の写真にはこれが無難です。',
      tele: '遠くのものを引き寄せます。背景が圧縮されてぼけるので人物に向きます。',
      supertele: '鳥や競技場のように近づけない被写体に使います。ぶれにとても敏感です。',
    },
    {
      ultrawide: 'Bringt sehr viel ins Bild; die Ränder ziehen sich, also keine Personen in die Ecken.',
      wide: 'Für enge Innenräume und Landschaften. Nah herangehen lässt das Vordere groß wirken.',
      standard: 'Am nächsten daran, wie das Auge eine Szene erfasst — die sicherste Wahl im Alltag.',
      tele: 'Holt Fernes heran, staucht den Hintergrund und löst ihn auf — gut für Porträts.',
      supertele: 'Für Motive, an die man nicht herankommt: Vögel, Stadien. Sehr verwacklungsempfindlich.',
    },
    {
      ultrawide: "Fait entrer énormément dans un cadre ; les bords s'étirent, évitez les visages dans les coins.",
      wide: "Pour les intérieurs étroits et les paysages. En s'approchant, le premier plan prend une ampleur marquée.",
      standard: "Le plus proche de la vision humaine — le choix le plus sûr au quotidien.",
      tele: "Rapproche le lointain, comprime et brouille l'arrière-plan, ce qui flatte les portraits.",
      supertele: "Pour ce dont on ne peut approcher : oiseaux, stades. Très sensible au bougé.",
    },
    {
      ultrawide: 'एक फ़्रेम में बहुत कुछ समा जाता है; किनारे खिंचते हैं, इसलिए लोगों को कोनों में न रखें।',
      wide: 'तंग अंदरूनी जगहों और भूदृश्यों के लिए। पास जाकर लेने पर सामने की चीज़ बहुत बड़ी लगती है।',
      standard: 'आँख जैसा दृश्य देने के सबसे क़रीब — रोज़मर्रा की तस्वीरों के लिए सबसे सुरक्षित।',
      tele: 'दूर की चीज़ पास लाता है, पृष्ठभूमि को दबाकर धुँधला करता है — पोर्ट्रेट के लिए अच्छा।',
      supertele: 'जिनके पास नहीं जा सकते उनके लिए — पक्षी, स्टेडियम। हिलने के प्रति बेहद संवेदनशील।',
    },
  ),

  diagonalLabel: T('대각 화각', 'Diagonal angle', 'Ángulo diagonal', 'Ângulo diagonal', '対角画角', 'Diagonaler Bildwinkel', 'Angle diagonal', 'विकर्ण कोण'),
  horizontalLabel: T('가로 화각', 'Horizontal angle', 'Ángulo horizontal', 'Ângulo horizontal', '水平画角', 'Horizontaler Bildwinkel', 'Angle horizontal', 'क्षैतिज कोण'),
  verticalLabel: T('세로 화각', 'Vertical angle', 'Ángulo vertical', 'Ângulo vertical', '垂直画角', 'Vertikaler Bildwinkel', 'Angle vertical', 'ऊर्ध्व कोण'),
  cropLabel: T('크롭 배수', 'Crop factor', 'Factor de recorte', 'Fator de corte', 'クロップ倍率', 'Cropfaktor', 'Facteur de recadrage', 'क्रॉप फ़ैक्टर'),
  equivLabel: T('35mm 환산', '35 mm equivalent', 'Equivalente a 35 mm', 'Equivalente a 35 mm', '35mm換算', 'Kleinbildäquivalent', 'Équivalent 24×36', '35 मिमी समतुल्य'),
  widthLabel: T('2m 앞 가로 폭', 'Frame width at 2 m', 'Ancho encuadrado a 2 m', 'Largura enquadrada a 2 m', '2m先で写る幅', 'Bildbreite auf 2 m', 'Largeur cadrée à 2 m', '2 मीटर पर चौड़ाई'),
  kindTitle: T('갈래', 'Category', 'Categoría', 'Categoria', '分類', 'Kategorie', 'Catégorie', 'श्रेणी'),

  degUnit: T(
    (n: number) => `${n}도`, (n: number) => `${n}°`, (n: number) => `${n}°`, (n: number) => `${n}°`,
    (n: number) => `${n}度`, (n: number) => `${n}°`, (n: number) => `${n}°`, (n: number) => `${n}°`,
  ),
  meterUnit: T(
    (n: number) => `${n}m`, (n: number) => `${n} m`, (n: number) => `${n} m`, (n: number) => `${n} m`,
    (n: number) => `${n}m`, (n: number) => `${n} m`, (n: number) => `${n} m`, (n: number) => `${n} मी`,
  ),

  sameFovTitle: T('같은 화각을 주는 조합', 'Same field of view elsewhere', 'El mismo encuadre en otros sensores', 'O mesmo enquadramento em outros sensores', '同じ画角になる組み合わせ', 'Gleicher Bildwinkel anderswo', 'Même champ ailleurs', 'वही दृश्य अन्य सेंसर पर'),
  sameFovNote: T(
    '센서가 다르면 초점거리도 달라야 같은 화면이 됩니다.',
    'A different sensor needs a different focal length to frame the same scene.',
    'Con otro sensor hace falta otra focal para encuadrar lo mismo.',
    'Com outro sensor é preciso outra focal para enquadrar o mesmo.',
    'センサーが違えば、同じ画面にするには焦点距離も変える必要があります。',
    'Ein anderer Sensor braucht eine andere Brennweite für denselben Ausschnitt.',
    "Un autre capteur exige une autre focale pour le même cadrage.",
    'दूसरा सेंसर हो तो वही दृश्य पाने के लिए फ़ोकल लंबाई भी बदलनी पड़ती है।',
  ),
  neighbourTitle: T('같은 센서의 이웃 초점거리', 'Nearby focal lengths', 'Focales cercanas', 'Focais próximas', '同じセンサーの近い焦点距離', 'Benachbarte Brennweiten', 'Focales voisines', 'निकट की फ़ोकल लंबाइयाँ'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '화각은 초점거리 하나로 정해지지 않습니다. 같은 50mm라도 센서가 작으면 좁게 담깁니다.',
      '크롭 배수는 센서 대각선을 35mm 판의 대각선으로 나눈 값입니다. 초점거리에 곱하면 환산 초점거리가 나옵니다.',
      '망원일수록 흔들림이 커 보입니다. 손으로 들고 찍을 때는 셔터 속도를 환산 초점거리분의 1초보다 빠르게 두는 것이 요령입니다.',
      '화각이 넓다고 더 많이 담기는 것만은 아닙니다. 가장자리가 늘어나므로 사람 얼굴은 가운데에 두는 편이 낫습니다.',
    ],
    [
      'Focal length alone does not fix the angle of view — the same 50 mm sees less on a smaller sensor.',
      'The crop factor is the sensor diagonal divided into the 35 mm diagonal; multiply the focal length by it for the equivalent.',
      'Longer lenses magnify shake. Handheld, a shutter speed faster than one over the equivalent focal length is the usual rule.',
      'A wider angle is not purely more scene: the edges stretch, so faces belong near the middle.',
    ],
    [
      'La focal por sí sola no fija el ángulo: los mismos 50 mm abarcan menos en un sensor pequeño.',
      'El factor de recorte es la diagonal de 35 mm dividida por la del sensor; multiplica la focal por él para el equivalente.',
      'Cuanto más largo el objetivo, más se nota la trepidación. A pulso, conviene una velocidad mayor que uno partido por la focal equivalente.',
      'Más ángulo no es solo más escena: los bordes se estiran, así que los rostros van cerca del centro.',
    ],
    [
      'A distância focal sozinha não define o ângulo: os mesmos 50 mm abrangem menos num sensor pequeno.',
      'O fator de corte é a diagonal de 35 mm dividida pela do sensor; multiplique a focal por ele para o equivalente.',
      'Lentes mais longas ampliam a trepidação. Na mão, use velocidade maior que um sobre a focal equivalente.',
      'Mais ângulo não é só mais cena: as bordas se esticam, então rostos ficam melhor perto do centro.',
    ],
    [
      '画角は焦点距離だけで決まりません。同じ50mmでもセンサーが小さければ狭く写ります。',
      'クロップ倍率は35mm判の対角線をセンサーの対角線で割った値です。焦点距離に掛ければ換算焦点距離になります。',
      '望遠ほどぶれが目立ちます。手持ちでは換算焦点距離分の1秒より速いシャッターにするのが目安です。',
      '画角が広いほど多く写るだけではありません。端が伸びるので、顔は中央寄りに置くほうが自然です。',
    ],
    [
      'Die Brennweite allein bestimmt den Bildwinkel nicht — dieselben 50 mm zeigen auf kleinerem Sensor weniger.',
      'Der Cropfaktor ist die Kleinbild-Diagonale geteilt durch die Sensordiagonale; mal Brennweite ergibt das Äquivalent.',
      'Lange Brennweiten vergrößern das Verwackeln. Aus der Hand gilt: kürzer belichten als eins durch die äquivalente Brennweite.',
      'Mehr Bildwinkel heißt nicht nur mehr Motiv: Die Ränder ziehen sich, Gesichter gehören in die Mitte.',
    ],
    [
      "La focale seule ne fixe pas l'angle : les mêmes 50 mm couvrent moins sur un petit capteur.",
      "Le facteur de recadrage est la diagonale 24×36 divisée par celle du capteur ; multipliez la focale pour l'équivalent.",
      "Plus la focale est longue, plus le bougé se voit. À main levée, visez une vitesse plus rapide que l'inverse de la focale équivalente.",
      "Un angle plus large n'ajoute pas que du sujet : les bords s'étirent, mieux vaut placer les visages au centre.",
    ],
    [
      'अकेली फ़ोकल लंबाई दृश्य कोण तय नहीं करती — वही 50 मिमी छोटे सेंसर पर कम दिखाता है।',
      'क्रॉप फ़ैक्टर 35 मिमी विकर्ण को सेंसर विकर्ण से भाग देने पर मिलता है; फ़ोकल लंबाई से गुणा करें तो समतुल्य।',
      'लंबे लेंस हिलने को बढ़ा देते हैं। हाथ में लेकर शटर गति समतुल्य फ़ोकल लंबाई के व्युत्क्रम से तेज़ रखें।',
      'चौड़ा कोण सिर्फ़ ज़्यादा दृश्य नहीं देता: किनारे खिंचते हैं, इसलिए चेहरे बीच में रखें।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  hubMetaTitle: T(
    '렌즈 화각 계산 104가지 — 초점거리와 센서별 각도',
    'Lens angle of view — 104 focal length and sensor combinations',
    'Ángulo de visión — 104 combinaciones de focal y sensor',
    'Ângulo de visão — 104 combinações de focal e sensor',
    'レンズ画角104種 — 焦点距離とセンサー別の角度',
    'Bildwinkel — 104 Kombinationen aus Brennweite und Sensor',
    "Angle de champ — 104 combinaisons focale et capteur",
    'लेंस दृश्य कोण — फ़ोकल लंबाई और सेंसर के 104 संयोजन',
  ),
  hubMetaDesc: T(
    '35mm·50mm·85mm 같은 초점거리를 풀프레임·APS-C·마이크로포서드·1인치 센서에 물렸을 때의 대각·가로·세로 화각과 35mm 환산 초점거리를 계산해 정리했습니다.',
    'Diagonal, horizontal and vertical angles of view plus the 35 mm equivalent for focal lengths from 8 mm to 800 mm on full frame, APS-C, Micro Four Thirds and 1-inch sensors.',
    'Ángulos diagonal, horizontal y vertical y el equivalente a 35 mm para focales de 8 a 800 mm en full frame, APS-C, Micro Cuatro Tercios y 1 pulgada.',
    'Ângulos diagonal, horizontal e vertical e o equivalente a 35 mm para focais de 8 a 800 mm em full frame, APS-C, Micro Quatro Terços e 1 polegada.',
    '8mmから800mmまでの焦点距離をフルサイズ・APS-C・マイクロフォーサーズ・1インチに付けたときの対角・水平・垂直画角と35mm換算をまとめました。',
    'Diagonaler, horizontaler und vertikaler Bildwinkel samt Kleinbildäquivalent für Brennweiten von 8 bis 800 mm an Vollformat, APS-C, MFT und 1 Zoll.',
    "Angles diagonal, horizontal et vertical et équivalent 24×36 pour des focales de 8 à 800 mm sur plein format, APS-C, Micro 4/3 et 1 pouce.",
    'फ़ुल फ़्रेम, APS-C, माइक्रो फ़ोर थर्ड्स और 1-इंच सेंसर पर 8 से 800 मिमी फ़ोकल लंबाई के विकर्ण, क्षैतिज और ऊर्ध्व कोण तथा 35 मिमी समतुल्य।',
  ),

  metaTitle: T(
    (f: number, s: string) => `${f}mm ${s} 화각 — 몇 도인가`,
    (f: number, s: string) => `${f} mm on ${s} — what angle of view`,
    (f: number, s: string) => `${f} mm en ${s} — qué ángulo de visión`,
    (f: number, s: string) => `${f} mm em ${s} — qual ângulo de visão`,
    (f: number, s: string) => `${f}mm ${s} の画角 — 何度か`,
    (f: number, s: string) => `${f} mm an ${s} — welcher Bildwinkel`,
    (f: number, s: string) => `${f} mm sur ${s} — quel angle de champ`,
    (f: number, s: string) => `${s} पर ${f} मिमी — कितना दृश्य कोण`,
  ),

  metaDesc: T(
    (f: LensFacts, kind: string) => `${f.sensorName} 센서에 ${f.focal}mm를 물리면 대각 화각은 ${f.diagonal}도, 35mm 환산으로는 ${f.equiv}mm입니다. ${kind} 갈래에 들어갑니다.`,
    (f: LensFacts, kind: string) => `A ${f.focal} mm lens on ${f.sensorName} gives a ${f.diagonal}° diagonal angle of view, equivalent to ${f.equiv} mm on 35 mm. That puts it in the ${kind.toLowerCase()} group.`,
    (f: LensFacts, kind: string) => `Un ${f.focal} mm en ${f.sensorName} da un ángulo diagonal de ${f.diagonal}°, equivalente a ${f.equiv} mm en 35 mm. Entra en el grupo ${kind.toLowerCase()}.`,
    (f: LensFacts, kind: string) => `Uma ${f.focal} mm em ${f.sensorName} dá ângulo diagonal de ${f.diagonal}°, equivalente a ${f.equiv} mm em 35 mm. Fica no grupo ${kind.toLowerCase()}.`,
    (f: LensFacts, kind: string) => `${f.sensorName} に ${f.focal}mm を付けると対角画角は ${f.diagonal}度、35mm換算では ${f.equiv}mm です。${kind}の分類に入ります。`,
    (f: LensFacts, kind: string) => `${f.focal} mm an ${f.sensorName} ergeben ${f.diagonal}° diagonalen Bildwinkel, kleinbildäquivalent ${f.equiv} mm. Damit gehört es zur Gruppe ${kind}.`,
    (f: LensFacts, kind: string) => `Un ${f.focal} mm sur ${f.sensorName} donne un angle diagonal de ${f.diagonal}°, soit ${f.equiv} mm en équivalent 24×36. Il relève du groupe ${kind.toLowerCase()}.`,
    (f: LensFacts, kind: string) => `${f.sensorName} पर ${f.focal} मिमी से विकर्ण दृश्य कोण ${f.diagonal}° बनता है, जो 35 मिमी में ${f.equiv} मिमी के बराबर है। यह ${kind} समूह में आता है।`,
  ),

  hubFaq: T(
    [
      { q: '크롭 배수가 무엇인가요?', a: '센서가 35mm 판보다 얼마나 작은지를 대각선 길이로 잰 값입니다. APS-C는 약 1.5배, 마이크로포서드는 2배입니다. 초점거리에 이 값을 곱하면 같은 화각을 내는 35mm 렌즈의 초점거리가 나옵니다.' },
      { q: '50mm가 사람 눈과 같다는 말이 맞나요?', a: '풀프레임에서 50mm의 대각 화각이 약 47도라 사람이 한 번에 주목하는 범위와 비슷하다는 뜻으로 하는 말입니다. 사람 눈의 전체 시야는 훨씬 넓으니 "닮았다"는 정도로 받아들이는 편이 정확합니다.' },
      { q: '인물 사진에는 어떤 렌즈가 좋나요?', a: '35mm 환산 85~135mm가 흔히 쓰입니다. 적당히 떨어져 찍게 되어 얼굴 비례가 자연스럽고, 배경이 흐려져 인물이 도드라집니다. 좁은 곳에서는 50mm 환산도 충분합니다.' },
      { q: '같은 렌즈인데 카메라를 바꾸면 화각이 달라지나요?', a: '렌즈는 그대로지만 센서가 잘라내는 범위가 달라져 결과 화각이 바뀝니다. 풀프레임에서 50mm로 찍던 화면을 APS-C에서 얻으려면 35mm 정도가 필요합니다.' },
      { q: '이 값들은 어떻게 계산했나요?', a: '적어 둔 것은 초점거리와 센서의 가로·세로뿐입니다. 화각은 센서 한 변을 초점거리의 두 배로 나눈 값의 아크탄젠트를 두 배 한 것이고, 크롭 배수는 대각선 비입니다.' },
    ],
    [
      { q: 'What is a crop factor?', a: 'It measures how much smaller a sensor is than the 35 mm frame, taken along the diagonal. APS-C is about 1.5, Micro Four Thirds is 2. Multiply the focal length by it and you get the 35 mm lens that frames the same scene.' },
      { q: 'Is 50 mm really the same as human vision?', a: 'On full frame a 50 mm covers about 47° diagonally, close to the area a person attends to at once. Human peripheral vision is far wider, so treat the saying as a rough resemblance rather than a fact.' },
      { q: 'Which lens suits portraits?', a: '85 to 135 mm equivalent is the usual range. It puts you at a comfortable distance, keeps facial proportions natural and throws the background out of focus. In a small room, a 50 mm equivalent will do.' },
      { q: 'Does the same lens change angle on a different camera?', a: 'The lens does not change, but a smaller sensor crops into its image circle, so the resulting angle narrows. To match a 50 mm shot on full frame you need roughly 35 mm on APS-C.' },
      { q: 'How are these numbers worked out?', a: 'Only the focal length and the sensor dimensions are stored. Each angle is twice the arctangent of one sensor side divided by twice the focal length, and the crop factor is a ratio of diagonals.' },
    ],
    [
      { q: '¿Qué es el factor de recorte?', a: 'Mide cuánto menor es el sensor respecto al formato de 35 mm, medido en diagonal. APS-C ronda 1,5 y Micro Cuatro Tercios es 2. Multiplica la focal por él y obtienes el objetivo de 35 mm que encuadra lo mismo.' },
      { q: '¿De verdad 50 mm equivale a la visión humana?', a: 'En full frame un 50 mm cubre unos 47° en diagonal, parecido a la zona que una persona atiende de golpe. La visión periférica es mucho más amplia, así que es un parecido, no un dato exacto.' },
      { q: '¿Qué objetivo va bien para retratos?', a: 'Lo habitual es de 85 a 135 mm equivalentes: te sitúa a una distancia cómoda, mantiene naturales las proporciones del rostro y desenfoca el fondo. En una habitación pequeña basta un 50 mm equivalente.' },
      { q: '¿El mismo objetivo cambia de ángulo según la cámara?', a: 'El objetivo no cambia, pero un sensor menor recorta su círculo de imagen y el ángulo resultante se estrecha. Para igualar un 50 mm de full frame necesitas unos 35 mm en APS-C.' },
      { q: '¿Cómo se calculan estos datos?', a: 'Solo se guardan la focal y las medidas del sensor. Cada ángulo es el doble del arcotangente de un lado del sensor dividido por el doble de la focal, y el factor de recorte es una razón de diagonales.' },
    ],
    [
      { q: 'O que é fator de corte?', a: 'Mede o quanto o sensor é menor que o formato de 35 mm, tomado na diagonal. APS-C fica perto de 1,5 e Micro Quatro Terços é 2. Multiplique a focal por ele e obtém a lente de 35 mm que enquadra o mesmo.' },
      { q: '50 mm equivale mesmo à visão humana?', a: 'Em full frame, 50 mm cobrem cerca de 47° na diagonal, próximo da área que a pessoa atende de uma vez. A visão periférica é bem mais ampla, então é uma semelhança, não um fato exato.' },
      { q: 'Que lente serve para retratos?', a: 'O usual é 85 a 135 mm equivalentes: mantém uma distância confortável, deixa as proporções do rosto naturais e desfoca o fundo. Em ambiente pequeno, 50 mm equivalentes bastam.' },
      { q: 'A mesma lente muda de ângulo em outra câmera?', a: 'A lente não muda, mas um sensor menor recorta seu círculo de imagem e o ângulo resultante estreita. Para igualar um 50 mm de full frame, use cerca de 35 mm em APS-C.' },
      { q: 'Como esses números são calculados?', a: 'Só a focal e as medidas do sensor são guardadas. Cada ângulo é o dobro do arco-tangente de um lado do sensor dividido pelo dobro da focal, e o fator de corte é uma razão de diagonais.' },
    ],
    [
      { q: 'クロップ倍率とは何ですか。', a: 'センサーが35mm判よりどれだけ小さいかを対角線で測った値です。APS-Cは約1.5倍、マイクロフォーサーズは2倍です。焦点距離に掛ければ、同じ画角になる35mmレンズの焦点距離が出ます。' },
      { q: '50mmは人の目と同じというのは本当ですか。', a: 'フルサイズでの50mmの対角画角が約47度で、人が一度に注目する範囲に近いという意味で言われます。人の視野全体ははるかに広いので、「似ている」程度に受け取るのが正確です。' },
      { q: '人物写真にはどのレンズが向きますか。', a: '35mm換算で85〜135mmがよく使われます。ほどよく離れて撮るため顔の比率が自然になり、背景がぼけて人物が引き立ちます。狭い場所なら換算50mmでも十分です。' },
      { q: '同じレンズでもカメラが変わると画角は変わりますか。', a: 'レンズは同じでも、小さいセンサーは像の一部だけを切り取るので結果の画角は狭くなります。フルサイズの50mmと同じ画面をAPS-Cで得るには35mmほどが必要です。' },
      { q: 'これらの値はどう計算していますか。', a: '持っているのは焦点距離とセンサーの縦横だけです。画角はセンサーの一辺を焦点距離の2倍で割った値のアークタンジェントを2倍したもので、クロップ倍率は対角線の比です。' },
    ],
    [
      { q: 'Was ist der Cropfaktor?', a: 'Er misst über die Diagonale, wie viel kleiner ein Sensor als das Kleinbildformat ist. APS-C liegt bei etwa 1,5, MFT bei 2. Mal Brennweite ergibt er die Kleinbildbrennweite mit gleichem Ausschnitt.' },
      { q: 'Entspricht 50 mm wirklich dem menschlichen Sehen?', a: 'Am Vollformat deckt 50 mm rund 47° diagonal ab — nah an dem, was ein Mensch auf einmal beachtet. Das periphere Sehen reicht viel weiter, es ist also eine Ähnlichkeit, keine Gleichung.' },
      { q: 'Welches Objektiv passt für Porträts?', a: 'Üblich sind 85 bis 135 mm äquivalent: angenehmer Abstand, natürliche Gesichtsproportionen und ein aufgelöster Hintergrund. In kleinen Räumen genügen 50 mm äquivalent.' },
      { q: 'Ändert dasselbe Objektiv an anderer Kamera den Bildwinkel?', a: 'Das Objektiv bleibt gleich, doch ein kleinerer Sensor schneidet aus dem Bildkreis aus, der Winkel wird enger. Für den Ausschnitt eines 50 mm am Vollformat braucht APS-C etwa 35 mm.' },
      { q: 'Wie entstehen diese Zahlen?', a: 'Gespeichert sind nur Brennweite und Sensormaße. Jeder Winkel ist der doppelte Arkustangens einer Sensorseite geteilt durch die doppelte Brennweite; der Cropfaktor ist ein Diagonalverhältnis.' },
    ],
    [
      { q: "Qu'est-ce que le facteur de recadrage ?", a: "Il mesure, en diagonale, de combien un capteur est plus petit que le 24×36. L'APS-C tourne autour de 1,5 et le Micro 4/3 vaut 2. Multipliez la focale par ce nombre pour obtenir la focale 24×36 au même cadrage." },
      { q: 'Le 50 mm correspond-il vraiment à la vision humaine ?', a: "En plein format, un 50 mm couvre environ 47° en diagonale, proche de la zone qu'on regarde d'un coup. La vision périphérique est bien plus large : c'est une ressemblance, pas une équivalence." },
      { q: 'Quel objectif pour le portrait ?', a: "De 85 à 135 mm équivalents, en général : une distance confortable, des proportions de visage naturelles et un arrière-plan fondu. Dans une petite pièce, un 50 mm équivalent suffit." },
      { q: "Le même objectif change-t-il d'angle selon le boîtier ?", a: "L'objectif ne change pas, mais un capteur plus petit découpe dans son cercle d'image : l'angle se resserre. Pour retrouver le cadrage d'un 50 mm en plein format, comptez environ 35 mm en APS-C." },
      { q: 'Comment ces valeurs sont-elles calculées ?', a: "Seules la focale et les dimensions du capteur sont enregistrées. Chaque angle vaut deux fois l'arctangente d'un côté du capteur divisé par le double de la focale, et le facteur de recadrage est un rapport de diagonales." },
    ],
    [
      { q: 'क्रॉप फ़ैक्टर क्या है?', a: 'यह विकर्ण के हिसाब से बताता है कि सेंसर 35 मिमी फ़्रेम से कितना छोटा है। APS-C लगभग 1.5 और माइक्रो फ़ोर थर्ड्स 2 है। फ़ोकल लंबाई से गुणा करने पर वही दृश्य देने वाला 35 मिमी लेंस मिलता है।' },
      { q: 'क्या 50 मिमी सचमुच मानव दृष्टि जैसा है?', a: 'फ़ुल फ़्रेम पर 50 मिमी लगभग 47° विकर्ण देता है, जो एक बार में ध्यान देने वाले क्षेत्र के क़रीब है। परिधीय दृष्टि कहीं ज़्यादा चौड़ी है, इसलिए इसे समानता भर मानें।' },
      { q: 'पोर्ट्रेट के लिए कौन-सा लेंस अच्छा है?', a: '85 से 135 मिमी समतुल्य आम है: दूरी आरामदेह रहती है, चेहरे का अनुपात स्वाभाविक लगता है और पृष्ठभूमि धुँधली होकर विषय उभरता है। छोटे कमरे में 50 मिमी समतुल्य भी चलेगा।' },
      { q: 'क्या वही लेंस दूसरे कैमरे पर अलग कोण देता है?', a: 'लेंस नहीं बदलता, पर छोटा सेंसर उसकी छवि से कम हिस्सा काटता है, इसलिए कोण सँकरा हो जाता है। फ़ुल फ़्रेम के 50 मिमी जैसा दृश्य APS-C पर लगभग 35 मिमी से मिलता है।' },
      { q: 'ये आँकड़े कैसे निकाले गए?', a: 'सिर्फ़ फ़ोकल लंबाई और सेंसर के माप दर्ज हैं। हर कोण सेंसर की एक भुजा को फ़ोकल लंबाई के दोगुने से भाग देकर उसका आर्कटैंजेंट दोगुना करने पर मिलता है, और क्रॉप फ़ैक्टर विकर्णों का अनुपात है।' },
    ],
  ),

  lensFaq: T(
    (f: LensFacts, kind: string) => [
      { q: `${f.sensorName}에 ${f.focal}mm를 물리면 화각이 몇 도인가요?`, a: `대각 ${f.diagonal}도, 가로 ${f.horizontal}도, 세로 ${f.vertical}도입니다.` },
      { q: `${f.focal}mm는 35mm로 환산하면 몇 mm인가요?`, a: `${f.equiv}mm입니다. 이 센서의 크롭 배수 ${f.crop}배를 곱한 값입니다.` },
      { q: `이 조합은 무엇을 찍기에 좋나요?`, a: `${kind} 갈래에 들어가는 화각입니다. 2미터 앞에 서면 가로 ${f.widthAt2m}미터가 화면에 담깁니다.` },
      { q: `같은 화면을 다른 카메라에서 얻으려면?`, a: `센서가 다르면 초점거리도 달라야 합니다. 이 화면 아래에 같은 화각을 주는 조합을 정리해 두었습니다.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `What angle of view does ${f.focal} mm give on ${f.sensorName}?`, a: `${f.diagonal}° diagonally, ${f.horizontal}° horizontally and ${f.vertical}° vertically.` },
      { q: `What is ${f.focal} mm in 35 mm terms?`, a: `${f.equiv} mm — the focal length multiplied by this sensor’s crop factor of ${f.crop}.` },
      { q: `What is this combination good for?`, a: `It falls in the ${kind.toLowerCase()} group. Standing two metres away, it frames ${f.widthAt2m} metres across.` },
      { q: `How do I get the same framing on another camera?`, a: `A different sensor needs a different focal length; the equivalent combinations are listed further down this page.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `¿Qué ángulo da un ${f.focal} mm en ${f.sensorName}?`, a: `${f.diagonal}° en diagonal, ${f.horizontal}° en horizontal y ${f.vertical}° en vertical.` },
      { q: `¿A cuánto equivale ${f.focal} mm en 35 mm?`, a: `A ${f.equiv} mm: la focal multiplicada por el factor de recorte ${f.crop} de este sensor.` },
      { q: `¿Para qué sirve esta combinación?`, a: `Entra en el grupo ${kind.toLowerCase()}. A dos metros abarca ${f.widthAt2m} metros de ancho.` },
      { q: `¿Cómo consigo el mismo encuadre en otra cámara?`, a: `Con otro sensor hace falta otra focal; las combinaciones equivalentes están más abajo.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `Que ângulo dá uma ${f.focal} mm em ${f.sensorName}?`, a: `${f.diagonal}° na diagonal, ${f.horizontal}° na horizontal e ${f.vertical}° na vertical.` },
      { q: `Quanto ${f.focal} mm equivale em 35 mm?`, a: `${f.equiv} mm: a focal multiplicada pelo fator de corte ${f.crop} deste sensor.` },
      { q: `Para que serve essa combinação?`, a: `Fica no grupo ${kind.toLowerCase()}. A dois metros, enquadra ${f.widthAt2m} metros de largura.` },
      { q: `Como obter o mesmo enquadramento em outra câmera?`, a: `Outro sensor exige outra focal; as combinações equivalentes estão logo abaixo.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `${f.sensorName} に ${f.focal}mm を付けると画角は何度ですか。`, a: `対角 ${f.diagonal}度、水平 ${f.horizontal}度、垂直 ${f.vertical}度です。` },
      { q: `${f.focal}mm は35mm換算で何mmですか。`, a: `${f.equiv}mm です。このセンサーのクロップ倍率 ${f.crop} 倍を掛けた値です。` },
      { q: `この組み合わせは何を撮るのに向きますか。`, a: `${kind}の分類に入る画角です。2メートル先に立つと横 ${f.widthAt2m} メートルが写ります。` },
      { q: `別のカメラで同じ画面を得るには。`, a: `センサーが違えば焦点距離も変わります。同じ画角になる組み合わせをこのページの下にまとめています。` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `Welchen Bildwinkel ergibt ${f.focal} mm an ${f.sensorName}?`, a: `${f.diagonal}° diagonal, ${f.horizontal}° horizontal und ${f.vertical}° vertikal.` },
      { q: `Was sind ${f.focal} mm kleinbildäquivalent?`, a: `${f.equiv} mm — die Brennweite mal dem Cropfaktor ${f.crop} dieses Sensors.` },
      { q: `Wofür taugt diese Kombination?`, a: `Sie gehört zur Gruppe ${kind}. Aus zwei Metern erfasst sie ${f.widthAt2m} Meter Breite.` },
      { q: `Wie bekomme ich denselben Ausschnitt an einer anderen Kamera?`, a: `Ein anderer Sensor braucht eine andere Brennweite; die passenden Kombinationen stehen weiter unten.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `Quel angle donne un ${f.focal} mm sur ${f.sensorName} ?`, a: `${f.diagonal}° en diagonale, ${f.horizontal}° en horizontal et ${f.vertical}° en vertical.` },
      { q: `Combien font ${f.focal} mm en équivalent 24×36 ?`, a: `${f.equiv} mm : la focale multipliée par le facteur ${f.crop} de ce capteur.` },
      { q: `À quoi sert cette combinaison ?`, a: `Elle relève du groupe ${kind.toLowerCase()}. À deux mètres, elle cadre ${f.widthAt2m} mètres de largeur.` },
      { q: `Comment retrouver ce cadrage sur un autre boîtier ?`, a: `Un autre capteur exige une autre focale ; les combinaisons équivalentes figurent plus bas.` },
    ],
    (f: LensFacts, kind: string) => [
      { q: `${f.sensorName} पर ${f.focal} मिमी से दृश्य कोण कितना बनता है?`, a: `विकर्ण ${f.diagonal}°, क्षैतिज ${f.horizontal}° और ऊर्ध्व ${f.vertical}°।` },
      { q: `${f.focal} मिमी 35 मिमी में कितना होता है?`, a: `${f.equiv} मिमी — इस सेंसर के क्रॉप फ़ैक्टर ${f.crop} से गुणा करने पर।` },
      { q: `यह संयोजन किस काम के लिए अच्छा है?`, a: `यह ${kind} समूह में आता है। दो मीटर की दूरी से यह ${f.widthAt2m} मीटर चौड़ाई समेटता है।` },
      { q: `दूसरे कैमरे पर वही दृश्य कैसे पाएँ?`, a: `दूसरा सेंसर हो तो फ़ोकल लंबाई भी बदलनी होगी; समतुल्य संयोजन इसी पन्ने पर नीचे दिए हैं।` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const LENS_UI: L8<LensUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<LensUI>;
