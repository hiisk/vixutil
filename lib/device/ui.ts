/**
 * 화면 규격 페이지의 문구 — 여덟 언어.
 *
 * 108가지 × 8언어를 손으로 쓸 수 없다. 기기마다 다른 것은 이름과 숫자뿐이고,
 * 이름은 브랜드가 정한 고유명사라 옮기지 않는다. 그래서 문장 틀만 여덟 벌 두고
 * 계산된 값을 끼워 넣는다.
 *
 * 항목마다 여덟 언어를 나란히 적는다. 한 언어씩 통째로 적으면 어느 항목이
 * 빠졌는지 눈으로 못 찾는데, 이렇게 두면 여덟 칸 중 빈 칸이 바로 보인다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang8.ts';
import type { ScreenKind } from './screens.ts';
import type { ScreenView } from './facts.ts';

export interface FaqItem { q: string; a: string }

export type { ScreenView };

export interface DeviceUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  kindLabel: Record<ScreenKind, string>;
  resolution: string;
  diagonal: string;
  density: string;
  ratio: string;
  pixels: string;
  physical: string;
  area: string;
  pitch: string;
  retina: string;
  klass: string;
  released: string;
  orientation: string;
  portrait: string;
  landscape: string;
  inchUnit: (n: number) => string;
  cmUnit: (n: number) => string;
  mpUnit: (n: number) => string;
  compareTitle: string;
  compareNote: string;
  compareCols: [string, string, string, string];
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string) => string;
  metaDesc: (v: ScreenView) => string;
  hubFaq: FaqItem[];
  screenFaq: (v: ScreenView) => FaqItem[];
}

/**
 * 프랑스어 관사 — 모음으로 시작하는 이름은 관사를 줄인다.
 *
 * "le iPhone"은 틀린 프랑스어다. iPhone·iPad·iMac·Apple Watch처럼 모음으로
 * 시작하는 이름이 108개 중 절반 가까이라 규칙 하나로 처리한다.
 */
const frLe = (name: string): string => (/^[aeiouâéêèîôùû]/i.test(name) ? `l'${name}` : `le ${name}`);
const frDu = (name: string): string => (/^[aeiouâéêèîôùû]/i.test(name) ? `de l'${name}` : `du ${name}`);

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

type Spec = { [K in keyof DeviceUI]: L8<DeviceUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),

  section: T('화면 규격', 'Screen specs', 'Pantallas', 'Telas', '画面スペック', 'Bildschirmdaten', 'Écrans', 'स्क्रीन स्पेक्स'),

  hubTitle: T(
    '기기 화면 규격 108가지',
    'Screen specs for 108 devices',
    'Especificaciones de pantalla de 108 dispositivos',
    'Especificações de tela de 108 aparelhos',
    '108機種の画面スペック',
    'Bildschirmdaten von 108 Geräten',
    "Caractéristiques d'écran de 108 appareils",
    '108 डिवाइस के स्क्रीन स्पेक्स',
  ),

  hubLead: T(
    '해상도·인치·픽셀 밀도를 한자리에서. 화면비와 실제 크기, 픽셀이 안 보이기 시작하는 거리까지 계산해서 보여 줍니다.',
    'Resolution, size and pixel density in one place — plus aspect ratio, physical dimensions and the distance at which pixels stop being visible.',
    'Resolución, tamaño y densidad de píxeles en un solo lugar, con la relación de aspecto, las medidas reales y la distancia a la que dejan de verse los píxeles.',
    'Resolução, tamanho e densidade de pixels em um só lugar, com proporção de tela, medidas reais e a distância em que os pixels somem.',
    '解像度・画面サイズ・画素密度をまとめて。アスペクト比、実寸、画素が見えなくなる距離まで計算して表示します。',
    'Auflösung, Größe und Pixeldichte an einem Ort — dazu Seitenverhältnis, echte Maße und die Distanz, ab der Pixel unsichtbar werden.',
    "Résolution, taille et densité de pixels au même endroit, avec le format d'image, les dimensions réelles et la distance à laquelle les pixels disparaissent.",
    'रिज़ॉल्यूशन, आकार और पिक्सेल घनत्व एक जगह — साथ में आस्पेक्ट रेशियो, असली माप और वह दूरी जहाँ पिक्सेल दिखना बंद हो जाते हैं।',
  ),

  kindLabel: T(
    { phone: '스마트폰', tablet: '태블릿', laptop: '노트북', monitor: '모니터', tv: 'TV', watch: '스마트워치', console: '휴대용 게임기' },
    { phone: 'Phones', tablet: 'Tablets', laptop: 'Laptops', monitor: 'Monitors', tv: 'TVs', watch: 'Smartwatches', console: 'Handhelds' },
    { phone: 'Teléfonos', tablet: 'Tabletas', laptop: 'Portátiles', monitor: 'Monitores', tv: 'Televisores', watch: 'Relojes inteligentes', console: 'Consolas portátiles' },
    { phone: 'Celulares', tablet: 'Tablets', laptop: 'Notebooks', monitor: 'Monitores', tv: 'TVs', watch: 'Smartwatches', console: 'Portáteis' },
    { phone: 'スマートフォン', tablet: 'タブレット', laptop: 'ノートPC', monitor: 'モニター', tv: 'テレビ', watch: 'スマートウォッチ', console: '携帯ゲーム機' },
    { phone: 'Smartphones', tablet: 'Tablets', laptop: 'Notebooks', monitor: 'Monitore', tv: 'Fernseher', watch: 'Smartwatches', console: 'Handhelds' },
    { phone: 'Téléphones', tablet: 'Tablettes', laptop: 'Ordinateurs portables', monitor: 'Écrans', tv: 'Téléviseurs', watch: 'Montres connectées', console: 'Consoles portables' },
    { phone: 'फ़ोन', tablet: 'टैबलेट', laptop: 'लैपटॉप', monitor: 'मॉनिटर', tv: 'टीवी', watch: 'स्मार्टवॉच', console: 'हैंडहेल्ड' },
  ),

  resolution: T('해상도', 'Resolution', 'Resolución', 'Resolução', '解像度', 'Auflösung', 'Résolution', 'रिज़ॉल्यूशन'),
  diagonal: T('대각선', 'Diagonal', 'Diagonal', 'Diagonal', '対角サイズ', 'Diagonale', 'Diagonale', 'विकर्ण'),
  density: T('픽셀 밀도', 'Pixel density', 'Densidad de píxeles', 'Densidade de pixels', '画素密度', 'Pixeldichte', 'Densité de pixels', 'पिक्सेल घनत्व'),
  ratio: T('화면비', 'Aspect ratio', 'Relación de aspecto', 'Proporção de tela', 'アスペクト比', 'Seitenverhältnis', "Format d'image", 'आस्पेक्ट रेशियो'),
  pixels: T('픽셀 수', 'Total pixels', 'Píxeles totales', 'Total de pixels', '総画素数', 'Gesamtpixel', 'Nombre de pixels', 'कुल पिक्सेल'),
  physical: T('실제 크기', 'Physical size', 'Tamaño físico', 'Tamanho físico', '実寸', 'Physische Größe', 'Taille réelle', 'वास्तविक आकार'),
  area: T('화면 넓이', 'Screen area', 'Área de pantalla', 'Área da tela', '表示面積', 'Bildfläche', "Surface d'écran", 'स्क्रीन क्षेत्रफल'),
  pitch: T('픽셀 크기', 'Pixel pitch', 'Tamaño de píxel', 'Tamanho do pixel', '画素ピッチ', 'Pixelabstand', 'Pas de pixel', 'पिक्सेल आकार'),
  retina: T(
    '픽셀이 안 보이는 거리', 'Pixels vanish at', 'Los píxeles desaparecen a', 'Os pixels somem a',
    '画素が見えなくなる距離', 'Pixel unsichtbar ab', 'Pixels invisibles à', 'पिक्सेल गायब होने की दूरी',
  ),
  klass: T('해상도 등급', 'Resolution class', 'Clase de resolución', 'Classe de resolução', '解像度クラス', 'Auflösungsklasse', 'Classe de résolution', 'रिज़ॉल्यूशन श्रेणी'),
  released: T('출시', 'Released', 'Lanzamiento', 'Lançamento', '発売', 'Erschienen', 'Sortie', 'रिलीज़'),
  orientation: T('화면 방향', 'Orientation', 'Orientación', 'Orientação', '画面の向き', 'Ausrichtung', 'Orientation', 'दिशा'),
  portrait: T('세로', 'Portrait', 'Vertical', 'Retrato', '縦長', 'Hochformat', 'Portrait', 'पोर्ट्रेट'),
  landscape: T('가로', 'Landscape', 'Horizontal', 'Paisagem', '横長', 'Querformat', 'Paysage', 'लैंडस्केप'),

  inchUnit: T(
    (n: number) => `${n}인치`, (n: number) => `${n}"`, (n: number) => `${n}"`, (n: number) => `${n}"`,
    (n: number) => `${n}インチ`, (n: number) => `${n}"`, (n: number) => `${n}"`, (n: number) => `${n}"`,
  ),
  cmUnit: T(
    (n: number) => `${n}cm`, (n: number) => `${n} cm`, (n: number) => `${n} cm`, (n: number) => `${n} cm`,
    (n: number) => `${n}cm`, (n: number) => `${n} cm`, (n: number) => `${n} cm`, (n: number) => `${n} सेमी`,
  ),
  mpUnit: T(
    (n: number) => `${n}메가픽셀`, (n: number) => `${n} MP`, (n: number) => `${n} MP`, (n: number) => `${n} MP`,
    (n: number) => `${n}メガピクセル`, (n: number) => `${n} MP`, (n: number) => `${n} MP`, (n: number) => `${n} MP`,
  ),

  compareTitle: T(
    '크기가 가까운 화면', 'Screens of a similar size', 'Pantallas de tamaño parecido', 'Telas de tamanho parecido',
    'サイズが近い画面', 'Ähnlich große Bildschirme', 'Écrans de taille proche', 'मिलते-जुलते आकार की स्क्रीन',
  ),
  compareNote: T(
    '같은 인치라도 해상도가 다르면 밀도가 달라집니다. 같은 4K라도 27인치는 163ppi, 65인치 TV는 68ppi입니다.',
    'The same diagonal at a different resolution means a different density. 4K is 163 ppi on a 27" monitor and 68 ppi on a 65" TV.',
    'La misma diagonal con otra resolución da otra densidad: 4K son 163 ppi en un monitor de 27" y 68 ppi en un televisor de 65".',
    'A mesma diagonal com outra resolução dá outra densidade: 4K são 163 ppi num monitor de 27" e 68 ppi numa TV de 65".',
    '同じインチでも解像度が違えば密度が変わります。同じ4Kでも27インチは163ppi、65インチのテレビは68ppiです。',
    'Gleiche Diagonale bei anderer Auflösung heißt andere Dichte: 4K sind 163 ppi auf 27 Zoll und 68 ppi auf einem 65-Zoll-Fernseher.',
    "La même diagonale avec une autre résolution donne une autre densité : la 4K fait 163 ppp sur un 27\" et 68 ppp sur un téléviseur de 65\".",
    'एक ही विकर्ण पर अलग रिज़ॉल्यूशन का मतलब अलग घनत्व है: 4K एक 27" मॉनिटर पर 163 ppi और 65" टीवी पर 68 ppi होता है।',
  ),
  compareCols: T(
    ['기기', '해상도', '대각선', '밀도'],
    ['Device', 'Resolution', 'Diagonal', 'Density'],
    ['Dispositivo', 'Resolución', 'Diagonal', 'Densidad'],
    ['Aparelho', 'Resolução', 'Diagonal', 'Densidade'],
    ['機種', '解像度', '対角', '密度'],
    ['Gerät', 'Auflösung', 'Diagonale', 'Dichte'],
    ['Appareil', 'Résolution', 'Diagonale', 'Densité'],
    ['डिवाइस', 'रिज़ॉल्यूशन', 'विकर्ण', 'घनत्व'],
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '픽셀 밀도(ppi)는 1인치 안에 픽셀이 몇 개 들어가는지입니다. 해상도만으로는 알 수 없고, 대각선 길이로 나눠야 나옵니다.',
      '같은 4K라도 27인치 모니터는 163ppi, 65인치 TV는 68ppi입니다. 두 배 넘게 차이 나지만 TV는 멀리서 보기 때문에 문제가 되지 않습니다.',
      '픽셀이 안 보이는 거리는 사람 눈이 갈라 보는 한계인 1각분에서 계산합니다. 픽셀 하나가 그보다 작게 보이면 아무리 좋은 눈도 격자를 찾지 못합니다.',
      '화면비는 가로세로를 가장 간단한 정수비로 줄인 값입니다. 요즘 휴대폰은 19.5:9나 20:9로 길쭉해서, 16:9 영상을 틀면 양옆에 검은 띠가 생깁니다.',
    ],
    [
      'Pixel density (ppi) is how many pixels fit in one inch. Resolution alone cannot tell you — you have to divide by the diagonal.',
      'The same 4K is 163 ppi on a 27" monitor and 68 ppi on a 65" TV. That is more than double, but a TV is watched from far away, so it does not matter.',
      'The distance at which pixels vanish comes from one arcminute, the limit of human sight. Once a pixel looks smaller than that, no eye can find the grid.',
      'Aspect ratio is width and height reduced to the simplest whole numbers. Modern phones are 19.5:9 or 20:9, so 16:9 video leaves black bars on the sides.',
    ],
    [
      'La densidad de píxeles (ppi) es cuántos píxeles caben en una pulgada. La resolución sola no lo dice: hay que dividirla por la diagonal.',
      'El mismo 4K son 163 ppi en un monitor de 27" y 68 ppi en un televisor de 65". Es más del doble, pero el televisor se mira de lejos y no importa.',
      'La distancia a la que desaparecen los píxeles sale de un minuto de arco, el límite de la vista humana. Si un píxel se ve más pequeño, ningún ojo encuentra la rejilla.',
      'La relación de aspecto es el ancho y el alto reducidos a números enteros simples. Los móviles actuales son 19,5:9 o 20:9, así que un vídeo 16:9 deja franjas negras a los lados.',
    ],
    [
      'A densidade de pixels (ppi) é quantos pixels cabem em uma polegada. Só a resolução não diz: é preciso dividir pela diagonal.',
      'O mesmo 4K dá 163 ppi num monitor de 27" e 68 ppi numa TV de 65". É mais que o dobro, mas a TV é vista de longe e isso não pesa.',
      'A distância em que os pixels somem vem de um minuto de arco, o limite da visão humana. Se um pixel parece menor que isso, nenhum olho acha a grade.',
      'A proporção de tela é a largura e a altura reduzidas aos menores números inteiros. Os celulares de hoje são 19,5:9 ou 20:9, então um vídeo 16:9 deixa faixas pretas nas laterais.',
    ],
    [
      '画素密度（ppi）は1インチに画素がいくつ入るかです。解像度だけでは分からず、対角の長さで割って初めて出ます。',
      '同じ4Kでも27インチのモニターは163ppi、65インチのテレビは68ppiです。倍以上の差ですが、テレビは離れて見るので問題になりません。',
      '画素が見えなくなる距離は、人の目が見分けられる限界である1分角から計算します。画素がそれより小さく見えれば、どんな目でも格子を見つけられません。',
      'アスペクト比は縦横をいちばん簡単な整数比に約めた値です。今のスマートフォンは19.5:9や20:9と縦長なので、16:9の動画を再生すると左右に黒帯が出ます。',
    ],
    [
      'Die Pixeldichte (ppi) sagt, wie viele Pixel auf einen Zoll passen. Die Auflösung allein verrät das nicht — man muss durch die Diagonale teilen.',
      'Dasselbe 4K sind 163 ppi auf einem 27-Zoll-Monitor und 68 ppi auf einem 65-Zoll-Fernseher. Mehr als das Doppelte, aber der Fernseher wird aus der Ferne gesehen.',
      'Die Distanz, ab der Pixel verschwinden, folgt aus einer Bogenminute, der Grenze des menschlichen Sehens. Erscheint ein Pixel kleiner, findet kein Auge mehr das Raster.',
      'Das Seitenverhältnis ist Breite zu Höhe, auf die kleinsten ganzen Zahlen gekürzt. Heutige Handys sind 19,5:9 oder 20:9, deshalb lässt ein 16:9-Video schwarze Balken an den Seiten.',
    ],
    [
      "La densité de pixels (ppp) indique combien de pixels tiennent dans un pouce. La résolution seule ne suffit pas : il faut diviser par la diagonale.",
      "La même 4K fait 163 ppp sur un écran de 27\" et 68 ppp sur un téléviseur de 65\". Plus du double d'écart, mais on regarde un téléviseur de loin.",
      "La distance à laquelle les pixels disparaissent vient de la minute d'arc, la limite de l'œil humain. Si un pixel paraît plus petit, aucun œil ne trouve la grille.",
      "Le format d'image, c'est la largeur et la hauteur réduites aux plus petits entiers. Les téléphones actuels sont en 19,5:9 ou 20:9, donc une vidéo 16:9 laisse des bandes noires sur les côtés.",
    ],
    [
      'पिक्सेल घनत्व (ppi) बताता है कि एक इंच में कितने पिक्सेल आते हैं। अकेला रिज़ॉल्यूशन यह नहीं बताता — इसे विकर्ण से भाग देना पड़ता है।',
      'वही 4K एक 27" मॉनिटर पर 163 ppi और 65" टीवी पर 68 ppi होता है। दोगुने से ज़्यादा अंतर, पर टीवी दूर से देखा जाता है इसलिए फ़र्क नहीं पड़ता।',
      'पिक्सेल गायब होने की दूरी एक आर्कमिनट से निकलती है, जो मानव दृष्टि की सीमा है। पिक्सेल उससे छोटा दिखे तो कोई भी आँख जाली नहीं ढूँढ़ पाती।',
      'आस्पेक्ट रेशियो चौड़ाई और ऊँचाई को सबसे सरल पूर्णांकों में घटाया गया रूप है। आज के फ़ोन 19.5:9 या 20:9 हैं, इसलिए 16:9 वीडियो पर किनारों पर काली पट्टियाँ रहती हैं।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  hubMetaTitle: T(
    '기기 화면 규격 108가지 — 해상도·인치·PPI',
    'Screen specs for 108 devices — resolution, size, PPI',
    'Pantallas de 108 dispositivos — resolución, tamaño y PPI',
    'Telas de 108 aparelhos — resolução, tamanho e PPI',
    '108機種の画面スペック — 解像度・インチ・PPI',
    'Bildschirmdaten von 108 Geräten — Auflösung, Größe, PPI',
    "Écrans de 108 appareils — résolution, taille, PPP",
    '108 डिवाइस के स्क्रीन स्पेक्स — रिज़ॉल्यूशन, आकार, PPI',
  ),
  hubMetaDesc: T(
    '아이폰·갤럭시·아이패드·맥북부터 모니터와 TV까지 108가지 화면의 해상도, 대각선 인치, 픽셀 밀도, 화면비, 실제 크기를 계산해 보여 줍니다.',
    'Resolution, diagonal, pixel density, aspect ratio and real dimensions for 108 screens — iPhone, Galaxy, iPad, MacBook, monitors and TVs.',
    'Resolución, diagonal, densidad de píxeles, relación de aspecto y medidas reales de 108 pantallas: iPhone, Galaxy, iPad, MacBook, monitores y televisores.',
    'Resolução, diagonal, densidade de pixels, proporção e medidas reais de 108 telas: iPhone, Galaxy, iPad, MacBook, monitores e TVs.',
    'iPhone・Galaxy・iPad・MacBookからモニターやテレビまで、108種類の画面の解像度、対角インチ、画素密度、アスペクト比、実寸を計算して表示します。',
    'Auflösung, Diagonale, Pixeldichte, Seitenverhältnis und echte Maße von 108 Bildschirmen — iPhone, Galaxy, iPad, MacBook, Monitore und Fernseher.',
    "Résolution, diagonale, densité de pixels, format et dimensions réelles de 108 écrans : iPhone, Galaxy, iPad, MacBook, moniteurs et téléviseurs.",
    '108 स्क्रीन का रिज़ॉल्यूशन, विकर्ण, पिक्सेल घनत्व, आस्पेक्ट रेशियो और असली माप — iPhone, Galaxy, iPad, MacBook, मॉनिटर और टीवी।',
  ),

  metaTitle: T(
    (n: string) => `${n} 화면 규격 — 해상도·PPI·인치`,
    (n: string) => `${n} screen specs — resolution, PPI, size`,
    (n: string) => `Pantalla de ${n} — resolución, PPI y tamaño`,
    (n: string) => `Tela do ${n} — resolução, PPI e tamanho`,
    (n: string) => `${n} の画面スペック — 解像度・PPI・インチ`,
    (n: string) => `${n} Bildschirm — Auflösung, PPI, Größe`,
    (n: string) => `Écran ${n} — résolution, PPP, taille`,
    (n: string) => `${n} स्क्रीन स्पेक्स — रिज़ॉल्यूशन, PPI, आकार`,
  ),

  metaDesc: T(
    (v: ScreenView) => `${v.name} 화면은 ${v.w}×${v.h} 해상도에 ${v.inch}인치, 픽셀 밀도 ${v.ppi}ppi입니다. 화면비 ${v.ratioLabel}, 실제 크기 ${v.widthMm}×${v.heightMm}mm.`,
    (v: ScreenView) => `The ${v.name} screen is ${v.w}×${v.h} at ${v.inch}", giving ${v.ppi} ppi. Aspect ratio ${v.ratioLabel}, real size ${v.widthMm}×${v.heightMm} mm.`,
    (v: ScreenView) => `La pantalla del ${v.name} es de ${v.w}×${v.h} en ${v.inch}", lo que da ${v.ppi} ppi. Relación ${v.ratioLabel}, tamaño real ${v.widthMm}×${v.heightMm} mm.`,
    (v: ScreenView) => `A tela do ${v.name} é ${v.w}×${v.h} em ${v.inch}", o que dá ${v.ppi} ppi. Proporção ${v.ratioLabel}, tamanho real ${v.widthMm}×${v.heightMm} mm.`,
    (v: ScreenView) => `${v.name} の画面は ${v.w}×${v.h}、${v.inch}インチで画素密度は ${v.ppi}ppi です。アスペクト比 ${v.ratioLabel}、実寸 ${v.widthMm}×${v.heightMm}mm。`,
    (v: ScreenView) => `Der Bildschirm des ${v.name} hat ${v.w}×${v.h} auf ${v.inch} Zoll, also ${v.ppi} ppi. Seitenverhältnis ${v.ratioLabel}, echte Maße ${v.widthMm}×${v.heightMm} mm.`,
    (v: ScreenView) => `L'écran du ${v.name} affiche ${v.w}×${v.h} sur ${v.inch}", soit ${v.ppi} ppp. Format ${v.ratioLabel}, dimensions réelles ${v.widthMm}×${v.heightMm} mm.`,
    (v: ScreenView) => `${v.name} की स्क्रीन ${v.inch}" पर ${v.w}×${v.h} है, यानी ${v.ppi} ppi। आस्पेक्ट रेशियो ${v.ratioLabel}, असली माप ${v.widthMm}×${v.heightMm} मिमी।`,
  ),

  hubFaq: T(
    [
      { q: 'PPI가 높으면 무조건 좋은가요?', a: '보는 거리에 달렸습니다. 손에 쥐는 휴대폰은 20cm 앞이라 400ppi가 넘어야 격자가 안 보이지만, 2m 떨어져 보는 65인치 TV는 68ppi로 충분합니다. 밀도를 올리면 그만큼 배터리와 그래픽 부담이 커집니다.' },
      { q: '해상도와 화면 크기 중 뭐가 더 중요한가요?', a: '둘은 따로 볼 수 없습니다. 같은 4K라도 27인치에서는 163ppi로 글자가 아주 또렷하고, 55인치에서는 80ppi라 가까이 가면 픽셀이 보입니다. 언제나 두 값을 함께 봐야 합니다.' },
      { q: '"레티나"는 정해진 기준인가요?', a: '애플이 붙인 이름이고 고정된 숫자는 없습니다. 그 기기를 쓰는 거리에서 픽셀이 하나씩 구분되지 않으면 레티나라고 부릅니다. 그래서 휴대폰은 326ppi, 맥북은 224ppi로도 같은 이름을 씁니다.' },
      { q: '요즘 휴대폰은 왜 이렇게 길쭉한가요?', a: '한 손에 들어오는 폭을 유지하면서 화면을 키우려면 세로로 늘리는 수밖에 없습니다. 그래서 16:9에서 19.5:9, 20:9로 옮겨 왔고, 대신 16:9 영상에는 양옆에 검은 띠가 남습니다.' },
      { q: '이 값들은 어디서 나온 건가요?', a: '적어 둔 것은 해상도와 대각선 길이뿐입니다. 밀도·화면비·실제 크기·픽셀 크기는 전부 그 세 숫자에서 계산합니다. 계산한 밀도는 제조사가 공표한 값과 대조해 검사에서 어긋나면 바로 드러나게 해 두었습니다.' },
    ],
    [
      { q: 'Is higher PPI always better?', a: 'It depends on viewing distance. A phone sits 20 cm from your eyes and needs over 400 ppi to hide the grid, while a 65" TV watched from 2 m is fine at 68 ppi. Every extra pixel costs battery and graphics power.' },
      { q: 'Which matters more, resolution or screen size?', a: 'Neither works alone. The same 4K gives 163 ppi at 27", where text looks razor sharp, but only 80 ppi at 55", where pixels show up close. You always have to read both numbers together.' },
      { q: 'Is "Retina" a fixed standard?', a: 'It is an Apple marketing name with no fixed number behind it. A display earns it when pixels stop being distinguishable at the distance you normally use it. That is why 326 ppi on a phone and 224 ppi on a MacBook share the label.' },
      { q: 'Why are phones so tall now?', a: 'To keep a width that still fits one hand while growing the screen, the only direction left is up. That took phones from 16:9 to 19.5:9 and 20:9 — at the cost of black bars beside 16:9 video.' },
      { q: 'Where do these numbers come from?', a: 'Only the resolution and the diagonal are written down. Density, aspect ratio, physical size and pixel pitch are all computed from those three numbers, and the computed density is checked against the figure the manufacturer publishes.' },
    ],
    [
      { q: '¿Más PPI siempre es mejor?', a: 'Depende de la distancia. Un móvil está a 20 cm y necesita más de 400 ppi para ocultar la rejilla; un televisor de 65" visto a 2 m va sobrado con 68 ppi. Cada píxel de más cuesta batería y potencia gráfica.' },
      { q: '¿Qué importa más, la resolución o el tamaño?', a: 'No se pueden separar. El mismo 4K da 163 ppi en 27", donde el texto se ve nítido, y solo 80 ppi en 55", donde de cerca se notan los píxeles. Siempre hay que leer los dos datos juntos.' },
      { q: '¿"Retina" es un estándar fijo?', a: 'Es un nombre comercial de Apple sin una cifra fija detrás. Una pantalla lo merece cuando los píxeles dejan de distinguirse a la distancia de uso habitual. Por eso 326 ppi en un móvil y 224 ppi en un MacBook comparten la etiqueta.' },
      { q: '¿Por qué los móviles son tan alargados?', a: 'Para mantener un ancho que quepa en una mano y aun así agrandar la pantalla, solo queda crecer hacia arriba. Así se pasó de 16:9 a 19,5:9 y 20:9, a cambio de franjas negras en el vídeo 16:9.' },
      { q: '¿De dónde salen estos números?', a: 'Solo están anotados la resolución y la diagonal. La densidad, la relación de aspecto, el tamaño real y el tamaño de píxel se calculan a partir de esos tres datos, y la densidad calculada se contrasta con la que publica el fabricante.' },
    ],
    [
      { q: 'Mais PPI é sempre melhor?', a: 'Depende da distância. O celular fica a 20 cm dos olhos e precisa de mais de 400 ppi para esconder a grade; uma TV de 65" vista a 2 m fica ótima com 68 ppi. Cada pixel a mais custa bateria e processamento gráfico.' },
      { q: 'O que pesa mais, resolução ou tamanho?', a: 'Um não vale sem o outro. O mesmo 4K dá 163 ppi em 27", onde o texto fica nítido, e só 80 ppi em 55", onde de perto os pixels aparecem. É preciso ler os dois números juntos.' },
      { q: '"Retina" é um padrão fixo?', a: 'É um nome comercial da Apple, sem número fixo por trás. A tela ganha o rótulo quando os pixels deixam de ser distinguíveis na distância normal de uso. Por isso 326 ppi num celular e 224 ppi num MacBook levam o mesmo nome.' },
      { q: 'Por que os celulares ficaram tão compridos?', a: 'Para manter uma largura que cabe na mão e ainda assim aumentar a tela, só resta crescer para cima. Foi assim que se saiu do 16:9 para 19,5:9 e 20:9, ao custo de faixas pretas no vídeo 16:9.' },
      { q: 'De onde vêm esses números?', a: 'Só a resolução e a diagonal estão anotadas. Densidade, proporção, tamanho real e tamanho do pixel são calculados a partir desses três números, e a densidade calculada é conferida com a que o fabricante publica.' },
    ],
    [
      { q: 'PPIは高いほど良いのですか。', a: '見る距離によります。手に持つスマートフォンは目から20cmほどなので400ppiを超えないと格子が見えますが、2m離れて見る65インチのテレビは68ppiで十分です。密度を上げた分だけ電池とGPUに負担がかかります。' },
      { q: '解像度と画面サイズはどちらが大事ですか。', a: '切り離しては見られません。同じ4Kでも27インチなら163ppiで文字がとても鮮明ですが、55インチでは80ppiとなり近づくと画素が見えます。必ず二つの数字を一緒に見てください。' },
      { q: '「Retina」は決まった基準ですか。', a: 'アップルが付けた呼び名で、固定の数値はありません。その機器を使う距離で画素が一つずつ見分けられなくなればRetinaと呼びます。だからスマートフォンの326ppiとMacBookの224ppiが同じ名前なのです。' },
      { q: '最近のスマートフォンはなぜ縦長なのですか。', a: '片手に収まる幅を保ったまま画面を大きくするには、縦に伸ばすしかありません。こうして16:9から19.5:9、20:9へ移り、代わりに16:9の動画では左右に黒帯が残ります。' },
      { q: 'これらの数値はどこから来たのですか。', a: '書いてあるのは解像度と対角の長さだけです。密度・アスペクト比・実寸・画素ピッチはすべてその三つから計算し、計算した密度はメーカー公表値と突き合わせています。' },
    ],
    [
      { q: 'Ist mehr PPI immer besser?', a: 'Das hängt vom Abstand ab. Ein Handy liegt 20 cm vor den Augen und braucht über 400 ppi, damit das Raster verschwindet; ein 65-Zoll-Fernseher aus 2 m Entfernung kommt mit 68 ppi aus. Jedes zusätzliche Pixel kostet Akku und Grafikleistung.' },
      { q: 'Was zählt mehr, Auflösung oder Größe?', a: 'Beides geht nur zusammen. Dasselbe 4K ergibt 163 ppi auf 27 Zoll, wo Text gestochen scharf wirkt, aber nur 80 ppi auf 55 Zoll, wo aus der Nähe Pixel sichtbar werden.' },
      { q: 'Ist „Retina" ein fester Standard?', a: 'Es ist ein Marketingname von Apple ohne feste Zahl. Ein Display verdient ihn, wenn die Pixel im üblichen Nutzungsabstand nicht mehr einzeln zu erkennen sind. Deshalb tragen 326 ppi am Handy und 224 ppi am MacBook denselben Namen.' },
      { q: 'Warum sind Handys heute so lang?', a: 'Um eine Breite zu halten, die in eine Hand passt, und das Display trotzdem zu vergrößern, bleibt nur der Weg nach oben. So kam man von 16:9 zu 19,5:9 und 20:9 — um den Preis schwarzer Balken neben 16:9-Videos.' },
      { q: 'Woher stammen diese Zahlen?', a: 'Notiert sind nur Auflösung und Diagonale. Dichte, Seitenverhältnis, echte Maße und Pixelabstand werden daraus berechnet, und die berechnete Dichte wird gegen die Herstellerangabe geprüft.' },
    ],
    [
      { q: 'Plus de PPP, est-ce toujours mieux ?', a: "Cela dépend de la distance. Un téléphone se tient à 20 cm et doit dépasser 400 ppp pour masquer la grille, alors qu'un téléviseur de 65\" regardé à 2 m se contente de 68 ppp. Chaque pixel en plus coûte de la batterie et de la puissance graphique." },
      { q: "Qu'est-ce qui compte le plus, la résolution ou la taille ?", a: "Les deux vont ensemble. La même 4K donne 163 ppp en 27\", où le texte est très net, mais seulement 80 ppp en 55\", où les pixels se voient de près. Il faut toujours lire les deux chiffres ensemble." },
      { q: '« Retina » est-il une norme fixe ?', a: "C'est un nom commercial d'Apple, sans chiffre figé. Un écran le mérite quand les pixels cessent d'être distinguables à la distance d'usage normale. C'est pourquoi 326 ppp sur un téléphone et 224 ppp sur un MacBook portent le même nom." },
      { q: 'Pourquoi les téléphones sont-ils si allongés ?', a: "Pour garder une largeur qui tient dans la main tout en agrandissant l'écran, il ne reste que la hauteur. On est ainsi passé du 16:9 au 19,5:9 puis au 20:9, au prix de bandes noires sur les vidéos 16:9." },
      { q: "D'où viennent ces chiffres ?", a: "Seules la résolution et la diagonale sont notées. La densité, le format, les dimensions réelles et le pas de pixel en sont calculés, et la densité calculée est confrontée à celle publiée par le constructeur." },
    ],
    [
      { q: 'क्या ज़्यादा PPI हमेशा बेहतर है?', a: 'यह देखने की दूरी पर निर्भर करता है। फ़ोन आँखों से 20 सेमी दूर रहता है और जाली छिपाने के लिए 400 ppi से ऊपर चाहिए, जबकि 2 मीटर दूर से देखा जाने वाला 65" टीवी 68 ppi में ठीक है। हर अतिरिक्त पिक्सेल बैटरी और ग्राफ़िक्स खर्च करता है।' },
      { q: 'रिज़ॉल्यूशन और स्क्रीन आकार में क्या ज़्यादा मायने रखता है?', a: 'दोनों अलग नहीं देखे जा सकते। वही 4K 27" पर 163 ppi देता है जहाँ टेक्स्ट बेहद साफ़ दिखता है, पर 55" पर सिर्फ़ 80 ppi, जहाँ पास से पिक्सेल दिख जाते हैं। दोनों आँकड़े साथ पढ़ने होते हैं।' },
      { q: 'क्या "रेटिना" कोई तय मानक है?', a: 'यह Apple का व्यापारिक नाम है, इसके पीछे कोई तय संख्या नहीं। जब सामान्य उपयोग की दूरी पर पिक्सेल अलग-अलग दिखना बंद हो जाएँ, तब डिस्प्ले को यह नाम मिलता है। इसीलिए फ़ोन के 326 ppi और MacBook के 224 ppi एक ही नाम रखते हैं।' },
      { q: 'आजकल फ़ोन इतने लंबे क्यों हैं?', a: 'एक हाथ में समाने वाली चौड़ाई बनाए रखते हुए स्क्रीन बड़ी करनी हो तो ऊपर की ओर बढ़ने के सिवा रास्ता नहीं। इसी से 16:9 से 19.5:9 और 20:9 तक पहुँचे — कीमत यह कि 16:9 वीडियो पर किनारे काली पट्टियाँ रहती हैं।' },
      { q: 'ये आँकड़े कहाँ से आए?', a: 'सिर्फ़ रिज़ॉल्यूशन और विकर्ण लिखे गए हैं। घनत्व, आस्पेक्ट रेशियो, असली माप और पिक्सेल आकार इन्हीं तीन संख्याओं से निकाले जाते हैं, और निकाला हुआ घनत्व निर्माता के घोषित आँकड़े से मिलाया जाता है।' },
    ],
  ),

  screenFaq: T(
    (v: ScreenView) => [
      { q: `${v.name} 해상도는 얼마인가요?`, a: `${v.w}×${v.h} 픽셀입니다. 모두 합쳐 ${v.pixels.toLocaleString('ko')}개, 약 ${v.megapixels}메가픽셀이고 해상도 등급으로는 ${v.className}에 해당합니다.` },
      { q: `${v.name} 픽셀 밀도는 몇 ppi인가요?`, a: `${v.ppi}ppi입니다. ${v.w}×${v.h}의 대각선 픽셀 수를 화면 대각선 ${v.inch}인치로 나눈 값이고, 픽셀 하나의 한 변은 약 ${v.pixelUm}마이크로미터입니다.` },
      { q: `${v.name} 화면의 실제 크기는 얼마인가요?`, a: `가로 ${v.widthMm}mm, 세로 ${v.heightMm}mm입니다. 대각선 ${v.inch}인치를 화면비 ${v.ratio}로 나눠 계산했고, 화면 넓이는 약 ${v.areaIn2}제곱인치입니다.` },
      { q: `${v.name} 화면은 픽셀이 얼마나 떨어져야 안 보이나요?`, a: `약 ${v.retinaCm}cm입니다. 사람 눈이 갈라 보는 한계인 1각분보다 픽셀이 작게 보이는 거리이고, 그보다 가까이 가면 격자가 드러나기 시작합니다.` },
      { q: `${v.name}의 화면비는 어떻게 되나요?`, a: `${v.ratioLabel}입니다.${v.ratioLabel === v.ratio ? '' : ` 정확한 정수비는 ${v.ratio}이고,`} 긴 변이 짧은 변의 ${v.ratioValue}배입니다. ${v.portrait ? '세로가 더 긴 화면이라 손에 쥐고 쓰기 좋습니다.' : '가로가 더 긴 화면이라 영상과 문서를 나란히 놓기 좋습니다.'}` },
    ],
    (v: ScreenView) => [
      { q: `What is the ${v.name} screen resolution?`, a: `${v.w}×${v.h} pixels — ${v.pixels.toLocaleString('en')} in total, about ${v.megapixels} megapixels, which puts it in the ${v.className} class.` },
      { q: `What is the pixel density of the ${v.name}?`, a: `${v.ppi} ppi. That is the diagonal in pixels of a ${v.w}×${v.h} grid divided by the ${v.inch}" diagonal of the panel, and it makes each pixel about ${v.pixelUm} micrometres across.` },
      { q: `How big is the ${v.name} screen in millimetres?`, a: `${v.widthMm} mm wide and ${v.heightMm} mm tall, worked out from the ${v.inch}" diagonal and the ${v.ratio} aspect ratio. The visible area is roughly ${v.areaIn2} square inches.` },
      { q: `How far away do pixels stop being visible on the ${v.name}?`, a: `About ${v.retinaCm} cm. That is where a pixel subtends less than one arcminute, the limit of human sight — closer than that and the grid starts to show.` },
      { q: `What aspect ratio does the ${v.name} use?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (exactly ${v.ratio})`}, with the long edge ${v.ratioValue}× the short one. ${v.portrait ? 'It is taller than it is wide, which suits a device you hold in one hand.' : 'It is wider than it is tall, which suits video and side-by-side documents.'}` },
    ],
    (v: ScreenView) => [
      { q: `¿Qué resolución tiene la pantalla del ${v.name}?`, a: `${v.w}×${v.h} píxeles: ${v.pixels.toLocaleString('es')} en total, unos ${v.megapixels} megapíxeles, lo que la sitúa en la clase ${v.className}.` },
      { q: `¿Cuál es la densidad de píxeles del ${v.name}?`, a: `${v.ppi} ppi. Es la diagonal en píxeles de una malla de ${v.w}×${v.h} dividida entre la diagonal de ${v.inch}", y deja cada píxel en unos ${v.pixelUm} micrómetros.` },
      { q: `¿Cuánto mide en milímetros la pantalla del ${v.name}?`, a: `${v.widthMm} mm de ancho por ${v.heightMm} mm de alto, calculado a partir de la diagonal de ${v.inch}" y la relación ${v.ratio}. La superficie visible ronda las ${v.areaIn2} pulgadas cuadradas.` },
      { q: `¿A qué distancia dejan de verse los píxeles en el ${v.name}?`, a: `A unos ${v.retinaCm} cm. Ahí cada píxel abarca menos de un minuto de arco, el límite de la vista humana; más cerca, la rejilla empieza a notarse.` },
      { q: `¿Qué relación de aspecto tiene el ${v.name}?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (en enteros exactos ${v.ratio})`}, con el lado largo ${v.ratioValue} veces el corto. ${v.portrait ? 'Es más alta que ancha, lo que va bien con un aparato que se sujeta con una mano.' : 'Es más ancha que alta, lo que va bien para vídeo y para poner documentos en paralelo.'}` },
    ],
    (v: ScreenView) => [
      { q: `Qual é a resolução da tela do ${v.name}?`, a: `${v.w}×${v.h} pixels — ${v.pixels.toLocaleString('pt-BR')} no total, cerca de ${v.megapixels} megapixels, o que a coloca na classe ${v.className}.` },
      { q: `Qual é a densidade de pixels do ${v.name}?`, a: `${v.ppi} ppi. É a diagonal em pixels de uma grade ${v.w}×${v.h} dividida pela diagonal de ${v.inch}", o que deixa cada pixel com cerca de ${v.pixelUm} micrômetros.` },
      { q: `Quanto mede em milímetros a tela do ${v.name}?`, a: `${v.widthMm} mm de largura por ${v.heightMm} mm de altura, calculado a partir da diagonal de ${v.inch}" e da proporção ${v.ratio}. A área visível fica em torno de ${v.areaIn2} polegadas quadradas.` },
      { q: `A que distância os pixels somem no ${v.name}?`, a: `Cerca de ${v.retinaCm} cm. É onde cada pixel ocupa menos de um minuto de arco, o limite da visão humana; mais perto que isso, a grade começa a aparecer.` },
      { q: `Qual é a proporção de tela do ${v.name}?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (em inteiros exatos ${v.ratio})`}, com o lado maior ${v.ratioValue} vezes o menor. ${v.portrait ? 'É mais alta que larga, o que combina com um aparelho segurado na mão.' : 'É mais larga que alta, o que combina com vídeo e documentos lado a lado.'}` },
    ],
    (v: ScreenView) => [
      { q: `${v.name} の解像度はいくつですか。`, a: `${v.w}×${v.h} ピクセルです。合計 ${v.pixels.toLocaleString('ja')} 画素、約 ${v.megapixels} メガピクセルで、解像度クラスでは ${v.className} にあたります。` },
      { q: `${v.name} の画素密度は何ppiですか。`, a: `${v.ppi}ppi です。${v.w}×${v.h} の対角画素数を画面対角 ${v.inch} インチで割った値で、画素一つの一辺は約 ${v.pixelUm} マイクロメートルになります。` },
      { q: `${v.name} の画面は実寸で何ミリですか。`, a: `横 ${v.widthMm}mm、縦 ${v.heightMm}mm です。対角 ${v.inch} インチとアスペクト比 ${v.ratio} から計算しました。表示面積はおよそ ${v.areaIn2} 平方インチです。` },
      { q: `${v.name} はどれだけ離れると画素が見えなくなりますか。`, a: `およそ ${v.retinaCm}cm です。画素が人の目の限界である1分角より小さく見える距離で、それより近づくと格子が現れ始めます。` },
      { q: `${v.name} のアスペクト比は。`, a: `${v.ratioLabel} です。${v.ratioLabel === v.ratio ? '' : `正確な整数比は ${v.ratio}、`}長辺は短辺の ${v.ratioValue} 倍です。${v.portrait ? '縦のほうが長く、手に持って使う機器に向いています。' : '横のほうが長く、動画や書類を並べるのに向いています。'}` },
    ],
    (v: ScreenView) => [
      { q: `Welche Auflösung hat der ${v.name}?`, a: `${v.w}×${v.h} Pixel — insgesamt ${v.pixels.toLocaleString('de')}, also rund ${v.megapixels} Megapixel, was der Klasse ${v.className} entspricht.` },
      { q: `Wie hoch ist die Pixeldichte des ${v.name}?`, a: `${v.ppi} ppi. Das ist die Bilddiagonale in Pixeln eines ${v.w}×${v.h}-Rasters geteilt durch die ${v.inch} Zoll Diagonale; jedes Pixel misst damit etwa ${v.pixelUm} Mikrometer.` },
      { q: `Wie groß ist der Bildschirm des ${v.name} in Millimetern?`, a: `${v.widthMm} mm breit und ${v.heightMm} mm hoch, berechnet aus ${v.inch} Zoll Diagonale und dem Seitenverhältnis ${v.ratio}. Die sichtbare Fläche beträgt etwa ${v.areaIn2} Quadratzoll.` },
      { q: `Ab welcher Entfernung sind Pixel beim ${v.name} unsichtbar?`, a: `Ab etwa ${v.retinaCm} cm. Dort erscheint ein Pixel kleiner als eine Bogenminute, die Grenze des menschlichen Sehens — näher dran zeigt sich das Raster.` },
      { q: `Welches Seitenverhältnis hat der ${v.name}?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (exakt ${v.ratio})`}, die lange Kante ist ${v.ratioValue}-mal die kurze. ${v.portrait ? 'Er ist höher als breit, was zu einem Gerät passt, das man in der Hand hält.' : 'Er ist breiter als hoch, was zu Video und nebeneinander liegenden Dokumenten passt.'}` },
    ],
    (v: ScreenView) => [
      { q: `Quelle est la résolution de l'écran ${frDu(v.name)} ?`, a: `${v.w}×${v.h} pixels, soit ${v.pixels.toLocaleString('fr')} au total, environ ${v.megapixels} mégapixels, ce qui le place dans la classe ${v.className}.` },
      { q: `Quelle est la densité de pixels ${frDu(v.name)} ?`, a: `${v.ppi} ppp. C'est la diagonale en pixels d'une grille ${v.w}×${v.h} divisée par la diagonale de ${v.inch}", ce qui donne des pixels d'environ ${v.pixelUm} micromètres.` },
      { q: `Quelles sont les dimensions réelles de l'écran ${frDu(v.name)} ?`, a: `${v.widthMm} mm de large sur ${v.heightMm} mm de haut, calculées à partir de la diagonale de ${v.inch}" et du format ${v.ratio}. La surface visible avoisine ${v.areaIn2} pouces carrés.` },
      { q: `À quelle distance les pixels disparaissent-ils sur ${frLe(v.name)} ?`, a: `Vers ${v.retinaCm} cm. C'est là qu'un pixel occupe moins d'une minute d'arc, la limite de l'œil humain ; plus près, la grille commence à se voir.` },
      { q: `Quel format d'image utilise ${frLe(v.name)} ?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (exactement ${v.ratio})`}, le grand côté vaut ${v.ratioValue} fois le petit. ${v.portrait ? "Il est plus haut que large, ce qui convient à un appareil tenu en main." : 'Il est plus large que haut, ce qui convient à la vidéo et aux documents côte à côte.'}` },
    ],
    (v: ScreenView) => [
      { q: `${v.name} की स्क्रीन का रिज़ॉल्यूशन क्या है?`, a: `${v.w}×${v.h} पिक्सेल — कुल ${v.pixels.toLocaleString('hi')}, यानी लगभग ${v.megapixels} मेगापिक्सेल, जो इसे ${v.className} श्रेणी में रखता है।` },
      { q: `${v.name} का पिक्सेल घनत्व कितना है?`, a: `${v.ppi} ppi। यह ${v.w}×${v.h} जाली के विकर्ण पिक्सेल को ${v.inch}" विकर्ण से भाग देने पर मिलता है, और हर पिक्सेल की एक भुजा लगभग ${v.pixelUm} माइक्रोमीटर होती है।` },
      { q: `${v.name} की स्क्रीन मिलीमीटर में कितनी बड़ी है?`, a: `${v.widthMm} मिमी चौड़ी और ${v.heightMm} मिमी ऊँची, जो ${v.inch}" विकर्ण और ${v.ratio} आस्पेक्ट रेशियो से निकाली गई है। दिखने वाला क्षेत्रफल करीब ${v.areaIn2} वर्ग इंच है।` },
      { q: `${v.name} पर कितनी दूरी से पिक्सेल दिखना बंद हो जाते हैं?`, a: `लगभग ${v.retinaCm} सेमी। वहाँ हर पिक्सेल एक आर्कमिनट से कम जगह घेरता है, जो मानव दृष्टि की सीमा है — इससे पास आने पर जाली दिखने लगती है।` },
      { q: `${v.name} का आस्पेक्ट रेशियो क्या है?`, a: `${v.ratioLabel}${v.ratioLabel === v.ratio ? '' : ` (ठीक-ठीक ${v.ratio})`}, लंबी भुजा छोटी भुजा की ${v.ratioValue} गुना है। ${v.portrait ? 'यह चौड़ाई से ज़्यादा ऊँची है, जो हाथ में पकड़े जाने वाले डिवाइस के लिए ठीक है।' : 'यह ऊँचाई से ज़्यादा चौड़ी है, जो वीडियो और साथ-साथ रखे दस्तावेज़ों के लिए ठीक है।'}` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const DEVICE_UI: L8<DeviceUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<DeviceUI>;
