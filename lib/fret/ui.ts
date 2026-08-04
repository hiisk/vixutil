/**
 * 기타 지판 화면의 문구 — 열 언어.
 *
 * 음 이름은 여기서 적지 않는다. /music이 이미 열 언어로 들고 있고(독일어의 H,
 * 프랑스어의 Si까지), 두 벌을 두면 언젠가 갈린다. 이 파일은 화면 문구만 맡는다.
 *
 * 줄 번호는 나라를 가리지 않고 1번이 가장 가는 줄이다. 다만 "6번 줄"이라고
 * 부르는 방식은 언어마다 달라서 그 틀만 언어별로 둔다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { FretFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface FretUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  stringName: (n: number) => string;
  fretName: (n: number) => string;
  scaleName: (key: string) => string;
  noteLabel: string;
  hzLabel: string;
  midiLabel: string;
  distanceLabel: string;
  ringingLabel: string;
  sameNoteLabel: string;
  openTag: string;
  distanceTitle: string;
  distanceNote: string;
  sameNoteTitle: string;
  sameNoteNote: string;
  tuningTitle: string;
  tuningNote: string;
  stringTitle: string;
  stringNote: string;
  neighbourTitle: string;
  desc: (f: FretFacts, note: string) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: FretFacts, note: string) => string;
  metaDesc: (f: FretFacts, note: string) => string;
  hubFaq: FaqItem[];
  fretFaq: (f: FretFacts, note: string) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 스케일 길이 이름 — 세 가지뿐이라 한 줄로 받는다 */
const scale = (fender: string, gibson: string, classic: string) => (key: string): string =>
  ({ fender, gibson, classic }[key] ?? key);

type Spec = { [K in keyof FretUI]: L<FretUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('기타 지판', 'Guitar fretboard', 'Diapasón de guitarra', 'Braço da guitarra', 'ギターの指板', 'Gitarrengriffbrett', 'Manche de guitare', 'गिटार फ़्रेटबोर्ड', '吉他指板', '吉他指板'),

  stringName: T<(n: number) => string>(
    n => `${n}번 줄`,
    n => `string ${n}`,
    n => `cuerda ${n}`,
    n => `corda ${n}`,
    n => `${n}弦`,
    n => `Saite ${n}`,
    n => `corde ${n}`,
    n => `स्ट्रिंग ${n}`,
    n => `${n} 弦`,
    n => `${n} 弦`,
  ),

  fretName: T<(n: number) => string>(
    n => (n === 0 ? '개방현' : `${n}프렛`),
    n => (n === 0 ? 'open' : `fret ${n}`),
    n => (n === 0 ? 'al aire' : `traste ${n}`),
    n => (n === 0 ? 'solta' : `traste ${n}`),
    n => (n === 0 ? '開放弦' : `${n}フレット`),
    n => (n === 0 ? 'leer' : `Bund ${n}`),
    n => (n === 0 ? 'à vide' : `case ${n}`),
    n => (n === 0 ? 'खुली' : `फ़्रेट ${n}`),
    n => (n === 0 ? '空弦' : `${n} 品`),
    n => (n === 0 ? '空弦' : `${n} 品`),
  ),

  scaleName: T<(key: string) => string>(
    scale('648mm(펜더식)', '628mm(깁슨식)', '650mm(클래식)'),
    scale('648 mm (Fender)', '628 mm (Gibson)', '650 mm (classical)'),
    scale('648 mm (Fender)', '628 mm (Gibson)', '650 mm (clásica)'),
    scale('648 mm (Fender)', '628 mm (Gibson)', '650 mm (clássico)'),
    scale('648mm（フェンダー式）', '628mm（ギブソン式）', '650mm（クラシック）'),
    scale('648 mm (Fender)', '628 mm (Gibson)', '650 mm (Konzert)'),
    scale('648 mm (Fender)', '628 mm (Gibson)', '650 mm (classique)'),
    scale('648 मिमी (फ़ेंडर)', '628 मिमी (गिब्सन)', '650 मिमी (क्लासिकल)'),
    scale('648 毫米（芬达型）', '628 毫米（吉普森型）', '650 毫米（古典）'),
    scale('648 毫米（Fender 型）', '628 毫米（Gibson 型）', '650 毫米（古典）'),
  ),

  hubTitle: T(
    '기타 지판 144자리 — 음과 프렛 거리',
    '144 fretboard positions — notes and fret distances',
    '144 posiciones del diapasón — notas y distancias de trastes',
    '144 posições do braço — notas e distâncias dos trastes',
    'ギター指板144か所 — 音とフレット位置',
    '144 Griffbrettpositionen — Töne und Bundabstände',
    '144 positions du manche — notes et distances de frettes',
    '144 फ़्रेटबोर्ड स्थान — स्वर और फ़्रेट दूरी',
    '144 个指板位置 — 音名与品位距离',
    '144 個指板位置 — 音名與品位距離',
  ),

  hubLead: T(
    '여섯 줄 × 0~23프렛. 프렛 하나가 반음이라 음도 주파수도 계산되고, 프렛이 너트에서 몇 밀리미터인지도 같은 비율에서 나옵니다.',
    'Six strings across 24 positions each. One fret is one semitone, so every note and frequency follows — and so does the distance from the nut, from the very same ratio.',
    'Seis cuerdas por 24 posiciones. Un traste es un semitono, así que salen la nota y la frecuencia, y de la misma razón sale la distancia desde la cejuela.',
    'Seis cordas por 24 posições. Um traste é um semitom, então saem a nota e a frequência — e da mesma razão sai a distância do nut.',
    '6弦 × 0〜23フレット。1フレットが半音なので音も周波数も計算でき、ナットからの距離も同じ比から出ます。',
    'Sechs Saiten mit je 24 Positionen. Ein Bund ist ein Halbton — daraus folgen Ton und Frequenz, und aus demselben Verhältnis der Abstand vom Sattel.',
    'Six cordes, 24 positions chacune. Une frette vaut un demi-ton : la note et la fréquence en découlent, tout comme la distance depuis le sillet.',
    'छह स्ट्रिंग × 24 स्थान। एक फ़्रेट यानी एक सेमीटोन, इसलिए स्वर और आवृत्ति निकल आते हैं — और उसी अनुपात से नट से दूरी भी।',
    '六根弦 × 0～23 品。一品即半音，所以音名和频率都能算出来，品到琴枕的距离也出自同一个比例。',
    '六根弦 × 0～23 品。一品即半音，所以音名和頻率都能算出來，品到琴枕的距離也出自同一個比例。',
  ),

  noteLabel: T('음', 'Note', 'Nota', 'Nota', '音', 'Ton', 'Note', 'स्वर', '音名', '音名'),
  hzLabel: T('주파수', 'Frequency', 'Frecuencia', 'Frequência', '周波数', 'Frequenz', 'Fréquence', 'आवृत्ति', '频率', '頻率'),
  midiLabel: T('MIDI 번호', 'MIDI number', 'Número MIDI', 'Número MIDI', 'MIDI番号', 'MIDI-Nummer', 'Numéro MIDI', 'MIDI संख्या', 'MIDI 编号', 'MIDI 編號'),
  distanceLabel: T('너트에서', 'From the nut', 'Desde la cejuela', 'Do nut', 'ナットから', 'Vom Sattel', 'Depuis le sillet', 'नट से', '距琴枕', '距琴枕'),
  ringingLabel: T('울리는 길이', 'Ringing length', 'Longitud vibrante', 'Comprimento vibrante', '鳴る長さ', 'Schwingende Länge', 'Longueur vibrante', 'कंपन लंबाई', '振动长度', '振動長度'),
  sameNoteLabel: T('같은 음이 나는 자리', 'Same note elsewhere', 'La misma nota en otro sitio', 'A mesma nota em outro lugar', '同じ音の別の場所', 'Derselbe Ton anderswo', 'La même note ailleurs', 'वही स्वर अन्यत्र', '同音的其他位置', '同音的其他位置'),
  openTag: T('개방현', 'open string', 'al aire', 'corda solta', '開放弦', 'Leersaite', 'corde à vide', 'खुली स्ट्रिंग', '空弦', '空弦'),

  distanceTitle: T('프렛은 갈수록 촘촘해집니다', 'The frets crowd as you climb', 'Los trastes se juntan al subir', 'Os trastes se juntam ao subir', 'フレットは上へ行くほど詰まります', 'Die Bünde rücken nach oben zusammen', 'Les frettes se resserrent en montant', 'ऊपर जाते-जाते फ़्रेट पास आते हैं', '越往高把位品越密', '越往高把位品越密'),

  distanceNote: T(
    '프렛은 같은 간격이 아니라 같은 비율로 놓입니다. 남은 길이를 매번 2의 12제곱근으로 나누기 때문에, 12프렛에서 줄 길이의 정확히 절반에 닿습니다 — 거기서 한 옥타브가 올라갑니다.',
    'Frets are spaced by ratio, not by equal steps: each one divides the remaining length by the twelfth root of two. That is why the 12th fret lands at exactly half the string — the octave.',
    'Los trastes se colocan por razón, no a pasos iguales: cada uno divide la longitud restante entre la raíz doceava de dos. Por eso el traste 12 cae justo en la mitad de la cuerda: la octava.',
    'Os trastes são espaçados por razão, não em passos iguais: cada um divide o comprimento restante pela raiz duodécima de dois. Por isso o traste 12 cai exatamente na metade da corda — a oitava.',
    'フレットは等間隔ではなく等比で並びます。残りの長さを毎回2の12乗根で割るので、12フレットで弦のちょうど半分に来ます——そこが1オクターブ上です。',
    'Bünde stehen im gleichen Verhältnis, nicht im gleichen Abstand: Jeder teilt die Restlänge durch die zwölfte Wurzel aus zwei. Deshalb liegt der 12. Bund genau bei der halben Saite — der Oktave.',
    'Les frettes sont réparties par rapport, non par pas égaux : chacune divise la longueur restante par la racine douzième de deux. D’où la 12ᵉ frette exactement à la moitié de la corde — l’octave.',
    'फ़्रेट समान दूरी पर नहीं, समान अनुपात में लगते हैं: हर बार बची लंबाई को दो के बारहवें मूल से भाग दिया जाता है। इसीलिए 12वाँ फ़्रेट ठीक आधी स्ट्रिंग पर पड़ता है — वही ऑक्टेव है।',
    '品不是等距而是等比排列：每一品把剩余长度除以 2 的 12 次方根。所以第 12 品正落在弦长的一半——那里高八度。',
    '品不是等距而是等比排列：每一品把剩餘長度除以 2 的 12 次方根。所以第 12 品正落在弦長的一半——那裡高八度。',
  ),

  sameNoteTitle: T('같은 음이 여러 자리에 있습니다', 'The same note sits in several places', 'La misma nota está en varios sitios', 'A mesma nota está em vários lugares', '同じ音が何か所にもあります', 'Derselbe Ton liegt an mehreren Stellen', 'La même note se trouve à plusieurs endroits', 'वही स्वर कई जगह मिलता है', '同一个音在多处出现', '同一個音在多處出現'),

  sameNoteNote: T(
    '피아노와 달리 기타는 같은 음이 줄마다 따로 있습니다. 어느 자리를 잡느냐에 따라 소리 결과 손 모양이 달라집니다.',
    'Unlike a piano, a guitar repeats the same pitch on different strings. Which one you take changes the tone and the shape your hand has to make.',
    'A diferencia del piano, la guitarra repite la misma altura en varias cuerdas. La que elijas cambia el timbre y la forma que debe hacer la mano.',
    'Diferente do piano, o violão repete a mesma altura em cordas diferentes. A que você escolher muda o timbre e a forma da mão.',
    'ピアノと違い、ギターは同じ高さの音が弦ごとに別々にあります。どこを押さえるかで音色も手の形も変わります。',
    'Anders als am Klavier liegt derselbe Ton auf mehreren Saiten. Welche man greift, ändert Klangfarbe und Handhaltung.',
    'Contrairement au piano, la guitare répète la même hauteur sur plusieurs cordes. Le choix change le timbre et la position de la main.',
    'पियानो के विपरीत, गिटार पर वही स्वर अलग-अलग स्ट्रिंग पर मिलता है। कौन-सा चुनें, इससे रंग और हाथ की बनावट बदल जाती है।',
    '与钢琴不同，吉他上同一个音高会出现在不同弦上。选哪一处，音色和手型都会不同。',
    '與鋼琴不同，吉他上同一個音高會出現在不同弦上。選哪一處，音色和手型都會不同。',
  ),

  tuningTitle: T('표준 조율은 왜 5·5·5·4·5인가', 'Why standard tuning goes 5-5-5-4-5', 'Por qué la afinación estándar va 5-5-5-4-5', 'Por que a afinação padrão vai 5-5-5-4-5', 'なぜ標準調弦は5・5・5・4・5なのか', 'Warum die Standardstimmung 5-5-5-4-5 lautet', 'Pourquoi l’accordage standard fait 5-5-5-4-5', 'मानक ट्यूनिंग 5-5-5-4-5 क्यों', '标准调弦为什么是 5-5-5-4-5', '標準調弦為什麼是 5-5-5-4-5'),

  tuningNote: T(
    '줄 사이가 모두 다섯 반음이면 코드가 손에 닿지 않습니다. 3번과 2번 사이만 네 반음으로 좁혀 두어 흔한 코드가 손가락 넷 안에 들어옵니다.',
    'If every string were five semitones apart, common chords would not fit under four fingers. Narrowing the third-to-second gap to four is what makes them reachable.',
    'Si todas las cuerdas distaran cinco semitonos, los acordes habituales no cabrían bajo cuatro dedos. Estrechar a cuatro el salto de la tercera a la segunda es lo que los hace alcanzables.',
    'Se todas as cordas distassem cinco semitons, os acordes comuns não caberiam sob quatro dedos. Estreitar para quatro o salto da terceira para a segunda é o que os torna alcançáveis.',
    'すべての弦が五半音ずつなら、よく使うコードが指四本に収まりません。3弦と2弦の間だけ四半音に詰めてあるから届くのです。',
    'Läge jede Saite fünf Halbtöne auseinander, passten gängige Akkorde nicht unter vier Finger. Erst der auf vier verengte Abstand zwischen dritter und zweiter Saite macht sie greifbar.',
    'Si toutes les cordes étaient à cinq demi-tons, les accords courants ne tiendraient pas sous quatre doigts. C’est l’écart réduit à quatre entre la troisième et la deuxième qui les rend jouables.',
    'यदि हर स्ट्रिंग पाँच सेमीटोन दूर होती तो आम कॉर्ड चार उँगलियों में न आते। तीसरी और दूसरी के बीच चार का अंतर ही उन्हें पहुँच में लाता है।',
    '如果每根弦都相隔五个半音，常用和弦就伸不到。正是把三弦到二弦收窄为四个半音，才让它们落在四根手指之内。',
    '如果每根弦都相隔五個半音，常用和弦就伸不到。正是把三弦到二弦收窄為四個半音，才讓它們落在四根手指之內。',
  ),

  stringTitle: T('줄로 찾기', 'Browse by string', 'Buscar por cuerda', 'Buscar por corda', '弦から探す', 'Nach Saite suchen', 'Parcourir par corde', 'स्ट्रिंग से देखें', '按弦查找', '按弦查找'),

  stringNote: T(
    '1번이 가장 가는 줄입니다. 표에서 위쪽에 오는 줄이 소리는 높습니다.',
    'String 1 is the thinnest. The string printed at the top is the one that sounds highest.',
    'La cuerda 1 es la más fina. La que aparece arriba es la que suena más aguda.',
    'A corda 1 é a mais fina. A que aparece em cima é a que soa mais aguda.',
    '1弦が一番細い弦です。表の上に来る弦ほど音は高くなります。',
    'Saite 1 ist die dünnste. Die oben stehende Saite klingt am höchsten.',
    'La corde 1 est la plus fine. Celle qui figure en haut est la plus aiguë.',
    'स्ट्रिंग 1 सबसे पतली है। तालिका में ऊपर वाली स्ट्रिंग सबसे ऊँची आवाज़ देती है।',
    '1 弦最细。表中排在上面的弦，音也最高。',
    '1 弦最細。表中排在上面的弦，音也最高。',
  ),

  neighbourTitle: T('가까운 자리', 'Nearby positions', 'Posiciones cercanas', 'Posições próximas', '近い場所', 'Positionen daneben', 'Positions voisines', 'पास के स्थान', '相邻位置', '相鄰位置'),

  desc: T<(f: FretFacts, note: string) => string>(
    (f, note) => `${f.spot.string}번 줄 ${f.spot.fret === 0 ? '개방현' : `${f.spot.fret}프렛`}은 ${note}${f.octave}, ${f.hz}Hz입니다. 648mm 기타라면 너트에서 ${f.distances[0].mm}mm 자리입니다.`,
    (f, note) => `String ${f.spot.string}${f.spot.fret === 0 ? ' played open' : ` at fret ${f.spot.fret}`} gives ${note}${f.octave} at ${f.hz} Hz. On a 648 mm scale it sits ${f.distances[0].mm} mm from the nut.`,
    (f, note) => `La cuerda ${f.spot.string}${f.spot.fret === 0 ? ' al aire' : ` en el traste ${f.spot.fret}`} da ${note}${f.octave} a ${f.hz} Hz. En una escala de 648 mm queda a ${f.distances[0].mm} mm de la cejuela.`,
    (f, note) => `A corda ${f.spot.string}${f.spot.fret === 0 ? ' solta' : ` no traste ${f.spot.fret}`} dá ${note}${f.octave} a ${f.hz} Hz. Numa escala de 648 mm fica a ${f.distances[0].mm} mm do nut.`,
    (f, note) => `${f.spot.string}弦${f.spot.fret === 0 ? 'の開放弦' : `の${f.spot.fret}フレット`}は${note}${f.octave}、${f.hz}Hzです。648mmのギターならナットから${f.distances[0].mm}mmの位置です。`,
    (f, note) => `Saite ${f.spot.string}${f.spot.fret === 0 ? ' leer gespielt' : ` im ${f.spot.fret}. Bund`} ergibt ${note}${f.octave} bei ${f.hz} Hz. Bei 648 mm Mensur liegt sie ${f.distances[0].mm} mm vom Sattel.`,
    (f, note) => `La corde ${f.spot.string}${f.spot.fret === 0 ? ' à vide' : ` à la case ${f.spot.fret}`} donne ${note}${f.octave} à ${f.hz} Hz. Sur un diapason de 648 mm, elle se trouve à ${f.distances[0].mm} mm du sillet.`,
    (f, note) => `स्ट्रिंग ${f.spot.string}${f.spot.fret === 0 ? ' खुली' : ` फ़्रेट ${f.spot.fret}`} पर ${note}${f.octave}, ${f.hz} Hz देती है। 648 मिमी स्केल पर यह नट से ${f.distances[0].mm} मिमी है।`,
    (f, note) => `${f.spot.string} 弦${f.spot.fret === 0 ? '空弦' : ` ${f.spot.fret} 品`}是 ${note}${f.octave}，${f.hz} Hz。648 毫米弦长的琴上，它距琴枕 ${f.distances[0].mm} 毫米。`,
    (f, note) => `${f.spot.string} 弦${f.spot.fret === 0 ? '空弦' : ` ${f.spot.fret} 品`}是 ${note}${f.octave}，${f.hz} Hz。648 毫米弦長的琴上，它距琴枕 ${f.distances[0].mm} 毫米。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '프렛 하나가 반음입니다. 열두 칸을 올리면 한 옥타브가 올라갑니다.',
      '주파수는 반음마다 2의 12제곱근을 곱합니다 — A4가 440Hz입니다.',
      '프렛 자리 = 스케일 길이 × (1 − 1 ÷ 2^(프렛/12)).',
      '1번 줄이 가장 가늘고, 표준 조율은 위에서부터 E-B-G-D-A-E입니다.',
    ],
    [
      'One fret is one semitone; twelve of them make an octave.',
      'Frequency multiplies by the twelfth root of two per semitone — A4 is 440 Hz.',
      'Fret position = scale length × (1 − 1 ÷ 2^(fret/12)).',
      'String 1 is the thinnest; standard tuning reads E-B-G-D-A-E from there.',
    ],
    [
      'Un traste es un semitono; doce hacen una octava.',
      'La frecuencia se multiplica por la raíz doceava de dos por semitono: A4 son 440 Hz.',
      'Posición del traste = escala × (1 − 1 ÷ 2^(traste/12)).',
      'La cuerda 1 es la más fina; la afinación estándar es E-B-G-D-A-E desde ahí.',
    ],
    [
      'Um traste é um semitom; doze deles fazem uma oitava.',
      'A frequência se multiplica pela raiz duodécima de dois por semitom: A4 são 440 Hz.',
      'Posição do traste = escala × (1 − 1 ÷ 2^(traste/12)).',
      'A corda 1 é a mais fina; a afinação padrão é E-B-G-D-A-E a partir dela.',
    ],
    [
      '1フレットが半音です。12フレット上がると1オクターブ上がります。',
      '周波数は半音ごとに2の12乗根を掛けます——A4が440Hzです。',
      'フレット位置 = スケール長 × (1 − 1 ÷ 2^(フレット/12))。',
      '1弦が一番細く、標準調弦はそこからE-B-G-D-A-Eです。',
    ],
    [
      'Ein Bund ist ein Halbton; zwölf davon ergeben eine Oktave.',
      'Die Frequenz wird je Halbton mit der zwölften Wurzel aus zwei multipliziert — A4 sind 440 Hz.',
      'Bundposition = Mensur × (1 − 1 ÷ 2^(Bund/12)).',
      'Saite 1 ist die dünnste; die Standardstimmung lautet von dort E-B-G-D-A-E.',
    ],
    [
      'Une frette vaut un demi-ton ; douze font une octave.',
      'La fréquence se multiplie par la racine douzième de deux par demi-ton — le La3 vaut 440 Hz.',
      'Position de frette = diapason × (1 − 1 ÷ 2^(frette/12)).',
      'La corde 1 est la plus fine ; l’accordage standard donne E-B-G-D-A-E depuis celle-ci.',
    ],
    [
      'एक फ़्रेट यानी एक सेमीटोन; बारह मिलकर एक ऑक्टेव।',
      'हर सेमीटोन पर आवृत्ति दो के बारहवें मूल से गुणा होती है — A4 = 440 Hz।',
      'फ़्रेट स्थान = स्केल लंबाई × (1 − 1 ÷ 2^(फ़्रेट/12))।',
      'स्ट्रिंग 1 सबसे पतली है; मानक ट्यूनिंग वहाँ से E-B-G-D-A-E है।',
    ],
    [
      '一品即一个半音，十二品为一个八度。',
      '每升半音，频率乘以 2 的 12 次方根——A4 为 440 Hz。',
      '品位 = 弦长 × (1 − 1 ÷ 2^(品数/12))。',
      '1 弦最细，标准调弦自上而下是 E-B-G-D-A-E。',
    ],
    [
      '一品即一個半音，十二品為一個八度。',
      '每升半音，頻率乘以 2 的 12 次方根——A4 為 440 Hz。',
      '品位 = 弦長 × (1 − 1 ÷ 2^(品數/12))。',
      '1 弦最細，標準調弦自上而下是 E-B-G-D-A-E。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '기타 지판표 — 줄·프렛별 음과 주파수 144자리',
    'Guitar fretboard chart — note and frequency for 144 positions',
    'Diapasón de guitarra — nota y frecuencia de 144 posiciones',
    'Braço da guitarra — nota e frequência de 144 posições',
    'ギター指板表 — 弦とフレット別の音と周波数144か所',
    'Gitarrengriffbrett-Tabelle — Ton und Frequenz für 144 Positionen',
    'Tableau du manche — note et fréquence de 144 positions',
    'गिटार फ़्रेटबोर्ड चार्ट — 144 स्थानों के स्वर और आवृत्ति',
    '吉他指板表 — 144 个位置的音名与频率',
    '吉他指板表 — 144 個位置的音名與頻率',
  ),

  hubMetaDesc: T(
    '표준 조율 여섯 줄의 0~23프렛을 계산했습니다. 자리마다 음 이름과 주파수, 같은 음이 나는 다른 자리, 너트에서 프렛까지의 거리를 함께 냅니다.',
    'Every position from open to the 23rd fret in standard tuning, with its note name, frequency, the other places that same note appears, and the distance from the nut.',
    'Todas las posiciones, del aire al traste 23 en afinación estándar, con nota, frecuencia, los otros sitios donde suena esa nota y la distancia desde la cejuela.',
    'Todas as posições, da solta ao traste 23 em afinação padrão, com nota, frequência, os outros lugares dessa mesma nota e a distância do nut.',
    '標準調弦の6弦、開放から23フレットまでを計算しました。各位置の音名と周波数、同じ音が出る別の場所、ナットからの距離を示します。',
    'Alle Positionen von leer bis zum 23. Bund in Standardstimmung — mit Tonname, Frequenz, den anderen Stellen desselben Tons und dem Abstand vom Sattel.',
    'Toutes les positions, de la corde à vide à la 23ᵉ case en accordage standard, avec la note, la fréquence, les autres endroits où elle se trouve et la distance au sillet.',
    'मानक ट्यूनिंग में खुली से 23वें फ़्रेट तक हर स्थान — स्वर, आवृत्ति, वही स्वर कहाँ-कहाँ है, और नट से दूरी।',
    '标准调弦下从空弦到 23 品的每个位置：音名、频率、同音出现的其他位置，以及到琴枕的距离。',
    '標準調弦下從空弦到 23 品的每個位置：音名、頻率、同音出現的其他位置，以及到琴枕的距離。',
  ),

  metaTitle: T<(f: FretFacts, note: string) => string>(
    (f, note) => `기타 ${f.spot.string}번 줄 ${f.spot.fret === 0 ? '개방현' : `${f.spot.fret}프렛`} — ${note}${f.octave}`,
    (f, note) => `Guitar string ${f.spot.string}, ${f.spot.fret === 0 ? 'open' : `fret ${f.spot.fret}`} — ${note}${f.octave}`,
    (f, note) => `Cuerda ${f.spot.string} de guitarra, ${f.spot.fret === 0 ? 'al aire' : `traste ${f.spot.fret}`} — ${note}${f.octave}`,
    (f, note) => `Corda ${f.spot.string} da guitarra, ${f.spot.fret === 0 ? 'solta' : `traste ${f.spot.fret}`} — ${note}${f.octave}`,
    (f, note) => `ギター${f.spot.string}弦 ${f.spot.fret === 0 ? '開放弦' : `${f.spot.fret}フレット`} — ${note}${f.octave}`,
    (f, note) => `Gitarre Saite ${f.spot.string}, ${f.spot.fret === 0 ? 'leer' : `${f.spot.fret}. Bund`} — ${note}${f.octave}`,
    (f, note) => `Guitare corde ${f.spot.string}, ${f.spot.fret === 0 ? 'à vide' : `case ${f.spot.fret}`} — ${note}${f.octave}`,
    (f, note) => `गिटार स्ट्रिंग ${f.spot.string}, ${f.spot.fret === 0 ? 'खुली' : `फ़्रेट ${f.spot.fret}`} — ${note}${f.octave}`,
    (f, note) => `吉他 ${f.spot.string} 弦${f.spot.fret === 0 ? '空弦' : ` ${f.spot.fret} 品`} — ${note}${f.octave}`,
    (f, note) => `吉他 ${f.spot.string} 弦${f.spot.fret === 0 ? '空弦' : ` ${f.spot.fret} 品`} — ${note}${f.octave}`,
  ),

  metaDesc: T<(f: FretFacts, note: string) => string>(
    (f, note) => `${f.spot.string}번 줄 ${f.spot.fret}프렛은 ${note}${f.octave}, ${f.hz}Hz(MIDI ${f.midi})입니다. 같은 음이 ${f.sameNote.length}자리에 더 있고, 648mm 기타에서 너트로부터 ${f.distances[0].mm}mm입니다.`,
    (f, note) => `String ${f.spot.string}, fret ${f.spot.fret} sounds ${note}${f.octave} at ${f.hz} Hz (MIDI ${f.midi}). The same note appears at ${f.sameNote.length} other positions, and the fret sits ${f.distances[0].mm} mm from the nut on a 648 mm scale.`,
    (f, note) => `Cuerda ${f.spot.string}, traste ${f.spot.fret} suena ${note}${f.octave} a ${f.hz} Hz (MIDI ${f.midi}). La misma nota aparece en ${f.sameNote.length} posiciones más y el traste queda a ${f.distances[0].mm} mm de la cejuela en escala de 648 mm.`,
    (f, note) => `Corda ${f.spot.string}, traste ${f.spot.fret} soa ${note}${f.octave} a ${f.hz} Hz (MIDI ${f.midi}). A mesma nota aparece em ${f.sameNote.length} outras posições e o traste fica a ${f.distances[0].mm} mm do nut numa escala de 648 mm.`,
    (f, note) => `${f.spot.string}弦${f.spot.fret}フレットは${note}${f.octave}、${f.hz}Hz（MIDI ${f.midi}）です。同じ音が他に${f.sameNote.length}か所あり、648mmのギターではナットから${f.distances[0].mm}mmです。`,
    (f, note) => `Saite ${f.spot.string}, Bund ${f.spot.fret} klingt als ${note}${f.octave} bei ${f.hz} Hz (MIDI ${f.midi}). Denselben Ton gibt es an ${f.sameNote.length} weiteren Stellen, und der Bund liegt bei 648 mm Mensur ${f.distances[0].mm} mm vom Sattel.`,
    (f, note) => `Corde ${f.spot.string}, case ${f.spot.fret} sonne ${note}${f.octave} à ${f.hz} Hz (MIDI ${f.midi}). La même note existe à ${f.sameNote.length} autres endroits, et la frette est à ${f.distances[0].mm} mm du sillet sur un diapason de 648 mm.`,
    (f, note) => `स्ट्रिंग ${f.spot.string}, फ़्रेट ${f.spot.fret} पर ${note}${f.octave}, ${f.hz} Hz (MIDI ${f.midi})। वही स्वर ${f.sameNote.length} और स्थानों पर है, और 648 मिमी स्केल पर यह फ़्रेट नट से ${f.distances[0].mm} मिमी है।`,
    (f, note) => `${f.spot.string} 弦 ${f.spot.fret} 品发 ${note}${f.octave}，${f.hz} Hz（MIDI ${f.midi}）。同一个音还出现在 ${f.sameNote.length} 处，648 毫米弦长时该品距琴枕 ${f.distances[0].mm} 毫米。`,
    (f, note) => `${f.spot.string} 弦 ${f.spot.fret} 品發 ${note}${f.octave}，${f.hz} Hz（MIDI ${f.midi}）。同一個音還出現在 ${f.sameNote.length} 處，648 毫米弦長時該品距琴枕 ${f.distances[0].mm} 毫米。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '12프렛이 왜 줄 한가운데인가요?', a: '줄을 반으로 나누면 주파수가 두 배가 되고 그것이 한 옥타브이기 때문입니다. 프렛은 남은 길이를 매번 2의 12제곱근으로 나누며 놓이는데, 열두 번 나누면 정확히 절반이 됩니다.' },
      { q: '프렛 간격이 왜 위로 갈수록 좁아지나요?', a: '같은 간격이 아니라 같은 비율로 놓기 때문입니다. 남은 길이에 비례해 좁아지므로, 12프렛을 지나면 앞쪽의 절반 폭이 됩니다.' },
      { q: '3번과 2번 줄만 왜 다른가요?', a: '모두 다섯 반음이면 흔한 코드가 손가락 넷에 들어오지 않습니다. 그 한 칸을 좁혀 둔 덕에 C나 G 같은 코드가 잡힙니다. 대신 그 줄을 넘을 때 손 모양이 한 칸 어긋납니다.' },
      { q: '같은 음인데 줄마다 소리가 다른가요?', a: '음 높이는 같지만 굵은 줄을 높은 프렛에서 누르면 더 두툼하고, 가는 줄의 낮은 프렛은 더 맑습니다. 그래서 같은 음이라도 어느 자리를 잡을지 고릅니다.' },
      { q: '스케일 길이가 다르면 뭐가 달라지나요?', a: '프렛 사이 거리가 통째로 그 비율만큼 달라집니다. 648mm와 628mm는 3%쯤 차이라 손에 닿는 느낌이 다르고, 같은 굵기 줄이라도 장력이 달라집니다.' },
    ],
    [
      { q: 'Why is the 12th fret at the middle of the string?', a: 'Halving a string doubles its frequency, and that is an octave. Frets divide the remaining length by the twelfth root of two each time, so twelve divisions land exactly at half.' },
      { q: 'Why do the frets get closer together?', a: 'Because they are placed by ratio, not by equal distance. Each gap is a fixed share of what is left, so past the twelfth fret the spacing is half what it was at the nut.' },
      { q: 'Why is the gap between strings 3 and 2 different?', a: 'With five semitones everywhere, common chords would not fit under four fingers. Narrowing that one gap makes C and G playable — at the cost of shifting shapes by a fret when you cross it.' },
      { q: 'Does the same note sound different on another string?', a: 'The pitch matches, but a thick string high up sounds fuller while a thin string low down sounds brighter. Choosing between them is part of playing.' },
      { q: 'What changes with a different scale length?', a: 'Every fret distance scales with it. 648 mm and 628 mm differ by about 3%, which changes both the stretch under your hand and the string tension at the same gauge.' },
    ],
    [
      { q: '¿Por qué el traste 12 está en la mitad de la cuerda?', a: 'Partir la cuerda a la mitad duplica la frecuencia, y eso es una octava. Los trastes dividen la longitud restante entre la raíz doceava de dos, así que doce divisiones caen justo en la mitad.' },
      { q: '¿Por qué se juntan los trastes al subir?', a: 'Porque se colocan por razón, no a distancia igual. Cada hueco es una fracción fija de lo que queda, así que pasado el traste 12 el espaciado es la mitad que junto a la cejuela.' },
      { q: '¿Por qué el salto entre la 3ª y la 2ª es distinto?', a: 'Con cinco semitonos en todas partes, los acordes comunes no cabrían bajo cuatro dedos. Estrechar ese hueco hace tocables Do y Sol, a cambio de desplazar las formas un traste al cruzarlo.' },
      { q: '¿La misma nota suena distinto en otra cuerda?', a: 'La altura coincide, pero una cuerda gruesa en traste alto suena más llena y una fina en traste bajo más brillante. Elegir entre ambas es parte de tocar.' },
      { q: '¿Qué cambia con otra longitud de escala?', a: 'Todas las distancias entre trastes cambian en la misma proporción. 648 mm y 628 mm difieren un 3%, lo que altera el estiramiento de la mano y la tensión con el mismo calibre.' },
    ],
    [
      { q: 'Por que o traste 12 fica no meio da corda?', a: 'Dividir a corda ao meio dobra a frequência, e isso é uma oitava. Os trastes dividem o comprimento restante pela raiz duodécima de dois, então doze divisões caem exatamente na metade.' },
      { q: 'Por que os trastes se juntam ao subir?', a: 'Porque são colocados por razão, não por distância igual. Cada vão é uma fração fixa do que resta, então depois do traste 12 o espaçamento é metade do que era no nut.' },
      { q: 'Por que o salto entre a 3ª e a 2ª é diferente?', a: 'Com cinco semitons em tudo, os acordes comuns não caberiam sob quatro dedos. Estreitar esse vão torna Dó e Sol tocáveis — ao custo de deslocar as formas um traste ao cruzá-lo.' },
      { q: 'A mesma nota soa diferente em outra corda?', a: 'A altura é igual, mas uma corda grossa em traste alto soa mais cheia e uma fina em traste baixo mais brilhante. Escolher entre elas faz parte de tocar.' },
      { q: 'O que muda com outra escala?', a: 'Todas as distâncias entre trastes mudam na mesma proporção. 648 mm e 628 mm diferem cerca de 3%, o que altera o alcance da mão e a tensão no mesmo calibre.' },
    ],
    [
      { q: 'なぜ12フレットが弦の真ん中なのですか？', a: '弦を半分にすると周波数が二倍になり、それが1オクターブだからです。フレットは残りの長さを毎回2の12乗根で割って置かれるので、12回割るとちょうど半分になります。' },
      { q: 'なぜ上へ行くほどフレット間隔が狭くなるのですか？', a: '等間隔ではなく等比で置くからです。間隔は残りの長さに比例するので、12フレットを過ぎると開放側の半分の幅になります。' },
      { q: '3弦と2弦の間だけなぜ違うのですか？', a: 'すべて五半音だと、よく使うコードが指四本に収まりません。その一か所を詰めてあるからCやGが押さえられます。代わりにその弦をまたぐと形が一フレットずれます。' },
      { q: '同じ音でも弦によって違って聞こえますか？', a: '高さは同じですが、太い弦を高いフレットで押さえると太く、細い弦の低いフレットは澄んで聞こえます。だからどの場所を取るかを選びます。' },
      { q: 'スケール長が違うと何が変わりますか？', a: 'フレット間の距離がまるごとその比で変わります。648mmと628mmは3%ほど違い、手の広がり方も同じ太さの弦の張力も変わります。' },
    ],
    [
      { q: 'Warum liegt der 12. Bund in der Saitenmitte?', a: 'Halbiert man die Saite, verdoppelt sich die Frequenz — das ist die Oktave. Bünde teilen die Restlänge jedes Mal durch die zwölfte Wurzel aus zwei, zwölf Teilungen treffen also genau die Hälfte.' },
      { q: 'Warum rücken die Bünde nach oben zusammen?', a: 'Weil sie im Verhältnis stehen, nicht im gleichen Abstand. Jeder Abstand ist ein fester Anteil des Rests, jenseits des 12. Bundes also halb so groß wie am Sattel.' },
      { q: 'Warum ist der Abstand zwischen Saite 3 und 2 anders?', a: 'Bei überall fünf Halbtönen passten gängige Akkorde nicht unter vier Finger. Der engere Abstand macht C und G greifbar — dafür verschieben sich Formen beim Überqueren um einen Bund.' },
      { q: 'Klingt derselbe Ton auf einer anderen Saite anders?', a: 'Die Tonhöhe stimmt überein, doch eine dicke Saite weit oben klingt voller, eine dünne weit unten heller. Diese Wahl gehört zum Spielen.' },
      { q: 'Was ändert eine andere Mensur?', a: 'Alle Bundabstände skalieren mit. 648 mm und 628 mm liegen rund 3 % auseinander — das ändert Griffweite wie Saitenspannung bei gleicher Stärke.' },
    ],
    [
      { q: 'Pourquoi la 12ᵉ frette est-elle au milieu de la corde ?', a: 'Diviser la corde en deux double la fréquence, et c’est l’octave. Les frettes divisent la longueur restante par la racine douzième de deux à chaque fois : douze divisions tombent pile à la moitié.' },
      { q: 'Pourquoi les frettes se resserrent-elles en montant ?', a: 'Parce qu’elles sont placées par rapport, non à distance égale. Chaque écart est une fraction fixe du reste : passé la 12ᵉ frette, l’espacement vaut la moitié de celui du sillet.' },
      { q: 'Pourquoi l’écart entre les cordes 3 et 2 diffère-t-il ?', a: 'Avec cinq demi-tons partout, les accords courants ne tiendraient pas sous quatre doigts. Resserrer cet écart rend Do et Sol jouables, au prix d’un décalage d’une case en le franchissant.' },
      { q: 'La même note sonne-t-elle différemment sur une autre corde ?', a: 'La hauteur est identique, mais une corde épaisse en haut du manche sonne plus pleine, une corde fine en bas plus claire. Choisir entre les deux fait partie du jeu.' },
      { q: 'Que change une autre longueur de diapason ?', a: 'Toutes les distances entre frettes suivent la même proportion. 648 mm et 628 mm diffèrent d’environ 3 %, ce qui change l’écartement de la main et la tension à tirant égal.' },
    ],
    [
      { q: '12वाँ फ़्रेट स्ट्रिंग के बीच में क्यों होता है?', a: 'स्ट्रिंग आधी करने पर आवृत्ति दोगुनी हो जाती है, और वही ऑक्टेव है। फ़्रेट हर बार बची लंबाई को दो के बारहवें मूल से बाँटते हैं, इसलिए बारह बार बाँटने पर ठीक आधा मिलता है।' },
      { q: 'ऊपर जाते-जाते फ़्रेट पास क्यों आ जाते हैं?', a: 'क्योंकि वे समान दूरी पर नहीं, समान अनुपात में रखे जाते हैं। हर अंतराल बची लंबाई का एक निश्चित हिस्सा होता है, इसलिए 12वें फ़्रेट के बाद अंतर आधा रह जाता है।' },
      { q: 'तीसरी और दूसरी स्ट्रिंग के बीच अंतर अलग क्यों है?', a: 'हर जगह पाँच सेमीटोन होते तो आम कॉर्ड चार उँगलियों में न आते। उस एक अंतर को छोटा करने से C और G बजने योग्य हो जाते हैं — बदले में उसे पार करते समय आकृति एक फ़्रेट खिसक जाती है।' },
      { q: 'क्या वही स्वर दूसरी स्ट्रिंग पर अलग सुनाई देता है?', a: 'ऊँचाई वही रहती है, पर मोटी स्ट्रिंग ऊँचे फ़्रेट पर भरी हुई और पतली स्ट्रिंग नीचे चमकीली लगती है। इन्हीं में से चुनना बजाने का हिस्सा है।' },
      { q: 'स्केल लंबाई बदलने से क्या बदलता है?', a: 'फ़्रेट के बीच की सारी दूरियाँ उसी अनुपात में बदल जाती हैं। 648 और 628 मिमी में लगभग 3% का अंतर है, जिससे हाथ की पहुँच और उसी गेज पर तनाव दोनों बदलते हैं।' },
    ],
    [
      { q: '为什么第 12 品在弦的正中间？', a: '把弦分成一半，频率就翻倍，而那正是一个八度。品位每次把剩余长度除以 2 的 12 次方根，除十二次刚好落在一半处。' },
      { q: '为什么越往上品越密？', a: '因为品是按比例而不是按等距排的。每段间隔都是剩余长度的固定比例，所以过了 12 品，间距只有琴枕处的一半。' },
      { q: '为什么只有三弦到二弦不一样？', a: '若处处都是五个半音，常用和弦就伸不到四指之内。把那一处收窄，C、G 才按得住——代价是跨过这根弦时手型要挪一品。' },
      { q: '同一个音在别的弦上听起来不同吗？', a: '音高相同，但粗弦在高把位更厚实，细弦在低把位更明亮。在两者之间选择，本身就是演奏的一部分。' },
      { q: '弦长不同会有什么影响？', a: '所有品距按同一比例缩放。648 与 628 毫米相差约 3%，手的跨度和同规格弦的张力都会跟着变。' },
    ],
    [
      { q: '為什麼第 12 品在弦的正中間？', a: '把弦分成一半，頻率就翻倍，而那正是一個八度。品位每次把剩餘長度除以 2 的 12 次方根，除十二次剛好落在一半處。' },
      { q: '為什麼越往上品越密？', a: '因為品是按比例而不是按等距排的。每段間隔都是剩餘長度的固定比例，所以過了 12 品，間距只有琴枕處的一半。' },
      { q: '為什麼只有三弦到二弦不一樣？', a: '若處處都是五個半音，常用和弦就伸不到四指之內。把那一處收窄，C、G 才按得住——代價是跨過這根弦時手型要挪一品。' },
      { q: '同一個音在別的弦上聽起來不同嗎？', a: '音高相同，但粗弦在高把位更厚實，細弦在低把位更明亮。在兩者之間選擇，本身就是演奏的一部分。' },
      { q: '弦長不同會有什麼影響？', a: '所有品距按同一比例縮放。648 與 628 毫米相差約 3%，手的跨度和同規格弦的張力都會跟著變。' },
    ],
  ),

  fretFaq: T<(f: FretFacts, note: string) => FaqItem[]>(
    (f, note) => [
      { q: `${f.spot.string}번 줄 ${f.spot.fret}프렛은 무슨 음인가요?`, a: `${note}${f.octave}입니다. 주파수는 ${f.hz}Hz, MIDI 번호는 ${f.midi}입니다.` },
      { q: `같은 음을 다른 줄에서도 잡을 수 있나요?`, a: f.sameNote.length ? `${f.sameNote.map(o => `${o.string}번 줄 ${o.fret}프렛`).join(', ')}에서도 같은 음이 납니다.` : `이 지판 안에서는 여기뿐입니다.` },
      { q: `이 프렛은 너트에서 얼마나 떨어져 있나요?`, a: `648mm 기타에서 ${f.distances[0].mm}mm, 628mm 기타에서 ${f.distances[1].mm}mm입니다.` },
      { q: `한 옥타브 위는 어디인가요?`, a: f.octaveUp !== null ? `같은 줄 ${f.octaveUp}프렛입니다.` : `같은 줄에서는 지판을 벗어납니다 — 다른 줄에서 찾아야 합니다.` },
    ],
    (f, note) => [
      { q: `What note is string ${f.spot.string}, fret ${f.spot.fret}?`, a: `${note}${f.octave}, at ${f.hz} Hz — MIDI number ${f.midi}.` },
      { q: `Can I play the same note on another string?`, a: f.sameNote.length ? `Yes: ${f.sameNote.map(o => `string ${o.string} fret ${o.fret}`).join(', ')}.` : `Not within this fretboard.` },
      { q: `How far is this fret from the nut?`, a: `${f.distances[0].mm} mm on a 648 mm scale, ${f.distances[1].mm} mm on a 628 mm one.` },
      { q: `Where is the octave above?`, a: f.octaveUp !== null ? `Fret ${f.octaveUp} on the same string.` : `Off the end of this string — you would take it on another one.` },
    ],
    (f, note) => [
      { q: `¿Qué nota es la cuerda ${f.spot.string}, traste ${f.spot.fret}?`, a: `${note}${f.octave}, a ${f.hz} Hz — número MIDI ${f.midi}.` },
      { q: `¿Puedo tocar la misma nota en otra cuerda?`, a: f.sameNote.length ? `Sí: ${f.sameNote.map(o => `cuerda ${o.string} traste ${o.fret}`).join(', ')}.` : `Dentro de este diapasón, no.` },
      { q: `¿A qué distancia está este traste de la cejuela?`, a: `${f.distances[0].mm} mm en escala de 648 mm y ${f.distances[1].mm} mm en una de 628 mm.` },
      { q: `¿Dónde está la octava superior?`, a: f.octaveUp !== null ? `En el traste ${f.octaveUp} de la misma cuerda.` : `Se sale de esta cuerda; habría que tomarla en otra.` },
    ],
    (f, note) => [
      { q: `Que nota é a corda ${f.spot.string}, traste ${f.spot.fret}?`, a: `${note}${f.octave}, a ${f.hz} Hz — número MIDI ${f.midi}.` },
      { q: `Dá para tocar a mesma nota em outra corda?`, a: f.sameNote.length ? `Dá: ${f.sameNote.map(o => `corda ${o.string} traste ${o.fret}`).join(', ')}.` : `Dentro deste braço, não.` },
      { q: `A que distância este traste fica do nut?`, a: `${f.distances[0].mm} mm numa escala de 648 mm e ${f.distances[1].mm} mm numa de 628 mm.` },
      { q: `Onde fica a oitava acima?`, a: f.octaveUp !== null ? `No traste ${f.octaveUp} da mesma corda.` : `Passa do fim desta corda; seria em outra.` },
    ],
    (f, note) => [
      { q: `${f.spot.string}弦${f.spot.fret}フレットは何の音ですか？`, a: `${note}${f.octave}です。周波数は${f.hz}Hz、MIDI番号は${f.midi}です。` },
      { q: `同じ音は別の弦でも押さえられますか？`, a: f.sameNote.length ? `${f.sameNote.map(o => `${o.string}弦${o.fret}フレット`).join('、')}でも同じ音が出ます。` : `この指板の中ではここだけです。` },
      { q: `このフレットはナットからどれだけ離れていますか？`, a: `648mmのギターで${f.distances[0].mm}mm、628mmのギターで${f.distances[1].mm}mmです。` },
      { q: `1オクターブ上はどこですか？`, a: f.octaveUp !== null ? `同じ弦の${f.octaveUp}フレットです。` : `同じ弦では指板を出てしまうので、別の弦で取ります。` },
    ],
    (f, note) => [
      { q: `Welcher Ton ist Saite ${f.spot.string}, Bund ${f.spot.fret}?`, a: `${note}${f.octave} bei ${f.hz} Hz — MIDI-Nummer ${f.midi}.` },
      { q: `Lässt sich derselbe Ton auf einer anderen Saite greifen?`, a: f.sameNote.length ? `Ja: ${f.sameNote.map(o => `Saite ${o.string}, Bund ${o.fret}`).join(', ')}.` : `Auf diesem Griffbrett nicht.` },
      { q: `Wie weit ist dieser Bund vom Sattel?`, a: `${f.distances[0].mm} mm bei 648 mm Mensur, ${f.distances[1].mm} mm bei 628 mm.` },
      { q: `Wo liegt die Oktave darüber?`, a: f.octaveUp !== null ? `Im ${f.octaveUp}. Bund derselben Saite.` : `Über das Ende dieser Saite hinaus — man nimmt sie auf einer anderen.` },
    ],
    (f, note) => [
      { q: `Quelle note donne la corde ${f.spot.string}, case ${f.spot.fret} ?`, a: `${note}${f.octave}, à ${f.hz} Hz — numéro MIDI ${f.midi}.` },
      { q: `Peut-on jouer la même note sur une autre corde ?`, a: f.sameNote.length ? `Oui : ${f.sameNote.map(o => `corde ${o.string} case ${o.fret}`).join(', ')}.` : `Pas sur ce manche.` },
      { q: `À quelle distance du sillet se trouve cette frette ?`, a: `${f.distances[0].mm} mm pour un diapason de 648 mm, ${f.distances[1].mm} mm pour 628 mm.` },
      { q: `Où est l’octave au-dessus ?`, a: f.octaveUp !== null ? `À la case ${f.octaveUp} de la même corde.` : `Au-delà de cette corde ; il faut la prendre ailleurs.` },
    ],
    (f, note) => [
      { q: `स्ट्रिंग ${f.spot.string}, फ़्रेट ${f.spot.fret} कौन-सा स्वर है?`, a: `${note}${f.octave}, ${f.hz} Hz — MIDI संख्या ${f.midi}।` },
      { q: `क्या यही स्वर दूसरी स्ट्रिंग पर भी बजा सकते हैं?`, a: f.sameNote.length ? `हाँ: ${f.sameNote.map(o => `स्ट्रिंग ${o.string} फ़्रेट ${o.fret}`).join(', ')}।` : `इस फ़्रेटबोर्ड में नहीं।` },
      { q: `यह फ़्रेट नट से कितनी दूर है?`, a: `648 मिमी स्केल पर ${f.distances[0].mm} मिमी, 628 मिमी पर ${f.distances[1].mm} मिमी।` },
      { q: `एक ऑक्टेव ऊपर कहाँ है?`, a: f.octaveUp !== null ? `उसी स्ट्रिंग के फ़्रेट ${f.octaveUp} पर।` : `इसी स्ट्रिंग पर फ़्रेटबोर्ड से बाहर — दूसरी स्ट्रिंग पर लेना होगा।` },
    ],
    (f, note) => [
      { q: `${f.spot.string} 弦 ${f.spot.fret} 品是什么音？`, a: `${note}${f.octave}，${f.hz} Hz，MIDI 编号 ${f.midi}。` },
      { q: `同一个音能在别的弦上按吗？`, a: f.sameNote.length ? `可以：${f.sameNote.map(o => `${o.string} 弦 ${o.fret} 品`).join('、')}。` : `在这块指板上没有别处。` },
      { q: `这一品离琴枕多远？`, a: `648 毫米弦长时 ${f.distances[0].mm} 毫米，628 毫米时 ${f.distances[1].mm} 毫米。` },
      { q: `高八度在哪里？`, a: f.octaveUp !== null ? `同弦的 ${f.octaveUp} 品。` : `已超出这根弦，要在别的弦上取。` },
    ],
    (f, note) => [
      { q: `${f.spot.string} 弦 ${f.spot.fret} 品是什麼音？`, a: `${note}${f.octave}，${f.hz} Hz，MIDI 編號 ${f.midi}。` },
      { q: `同一個音能在別的弦上按嗎？`, a: f.sameNote.length ? `可以：${f.sameNote.map(o => `${o.string} 弦 ${o.fret} 品`).join('、')}。` : `在這塊指板上沒有別處。` },
      { q: `這一品離琴枕多遠？`, a: `648 毫米弦長時 ${f.distances[0].mm} 毫米，628 毫米時 ${f.distances[1].mm} 毫米。` },
      { q: `高八度在哪裡？`, a: f.octaveUp !== null ? `同弦的 ${f.octaveUp} 品。` : `已超出這根弦，要在別的弦上取。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const FRET_UI: L<FretUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<FretUI>;
