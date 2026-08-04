/**
 * 정지거리 화면의 문구 — 열 언어.
 *
 * 이 표가 말하려는 것은 하나다. 속도가 두 배면 제동거리는 네 배다. 공주거리는
 * 속도에 비례해 늘지만 제동거리는 제곱으로 늘기 때문이다.
 *
 * 그리고 이 값들은 어림이다. 마찰계수는 타이어·온도·마모에 따라 넓게 흩어지고,
 * 반응시간 1초도 사람마다 다르다. 그 사실을 낱장마다 적어 둔다 — 안 적으면
 * 표가 측정값처럼 읽힌다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { StopFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface StopUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  surfaceName: (key: string) => string;
  speedLabel: string;
  msLabel: string;
  reactionLabel: string;
  brakingLabel: string;
  totalLabel: string;
  carsLabel: string;
  squareTitle: string;
  squareNote: string;
  reactionTitle: string;
  reactionNote: string;
  surfaceTitle: string;
  surfaceNote: string;
  limitTitle: string;
  limitNote: string;
  allTitle: string;
  neighbourTitle: string;
  caution: string;
  desc: (f: StopFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: StopFacts) => string;
  metaDesc: (f: StopFacts) => string;
  hubFaq: FaqItem[];
  stopFaq: (f: StopFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 노면 이름 — 네 가지뿐이라 한 줄로 받는다 */
const surf = (dry: string, wet: string, snow: string, ice: string) => (key: string): string =>
  ({ dry, wet, snow, ice }[key] ?? key);

type Spec = { [K in keyof StopUI]: L<StopUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('정지거리', 'Stopping distance', 'Distancia de frenado', 'Distância de frenagem', '停止距離', 'Anhalteweg', 'Distance d’arrêt', 'रुकने की दूरी', '刹车距离', '煞車距離'),

  surfaceName: T<(key: string) => string>(
    surf('마른 아스팔트', '젖은 노면', '눈길', '빙판'),
    surf('dry asphalt', 'wet road', 'snow', 'ice'),
    surf('asfalto seco', 'calzada mojada', 'nieve', 'hielo'),
    surf('asfalto seco', 'pista molhada', 'neve', 'gelo'),
    surf('乾いた路面', '濡れた路面', '雪道', '凍結路面'),
    surf('trockener Asphalt', 'nasse Fahrbahn', 'Schnee', 'Eis'),
    surf('asphalte sec', 'chaussée mouillée', 'neige', 'verglas'),
    surf('सूखी सड़क', 'गीली सड़क', 'बर्फ़', 'पाला'),
    surf('干燥路面', '湿滑路面', '积雪', '结冰'),
    surf('乾燥路面', '濕滑路面', '積雪', '結冰'),
  ),

  hubTitle: T(
    '정지거리 141가지 — 시속 10km부터 150km까지',
    '141 stopping distances — from 10 to 150 km/h',
    '141 distancias de frenado — de 10 a 150 km/h',
    '141 distâncias de frenagem — de 10 a 150 km/h',
    '停止距離141種 — 時速10kmから150kmまで',
    '141 Anhaltewege — von 10 bis 150 km/h',
    '141 distances d’arrêt — de 10 à 150 km/h',
    '141 रुकने की दूरियाँ — 10 से 150 किमी/घंटा',
    '141 种刹车距离 — 时速 10 到 150 公里',
    '141 種煞車距離 — 時速 10 到 150 公里',
  ),

  hubLead: T(
    '속도가 두 배면 제동거리는 네 배입니다. 브레이크를 밟기까지 굴러간 거리와 밟은 뒤 멈추기까지의 거리를 노면 네 가지로 계산했습니다.',
    'Double the speed and the braking distance quadruples. Here is the ground covered before the pedal moves, and the ground covered after it, on four kinds of surface.',
    'Al doblar la velocidad, la distancia de frenado se cuadruplica. Aquí está lo que se recorre antes de pisar el freno y lo que se recorre después, en cuatro tipos de firme.',
    'Ao dobrar a velocidade, a distância de frenagem quadruplica. Aqui está o trecho percorrido antes de pisar no freio e o trecho depois dele, em quatro tipos de piso.',
    '速度が二倍になると制動距離は四倍になります。ブレーキを踏むまでに進む距離と、踏んでから止まるまでの距離を、路面4種で計算しました。',
    'Doppelte Geschwindigkeit, vierfacher Bremsweg. Hier steht die Strecke bis zum Tritt aufs Pedal und die Strecke danach — für vier Fahrbahnzustände.',
    'À vitesse double, distance de freinage quadruplée. Voici la distance parcourue avant d’appuyer sur la pédale, et celle parcourue après, sur quatre états de chaussée.',
    'गति दोगुनी होने पर ब्रेकिंग दूरी चार गुनी हो जाती है। ब्रेक दबाने तक तय दूरी और दबाने के बाद रुकने तक की दूरी, चार तरह की सतहों पर।',
    '速度翻一倍，刹车距离变四倍。这里算出踩下刹车前滑行的距离，以及踩下之后停住的距离，分四种路面。',
    '速度翻一倍，煞車距離變四倍。這裡算出踩下煞車前滑行的距離，以及踩下之後停住的距離，分四種路面。',
  ),

  speedLabel: T('속도', 'Speed', 'Velocidad', 'Velocidade', '速度', 'Geschwindigkeit', 'Vitesse', 'गति', '速度', '速度'),
  msLabel: T('초속', 'Metres per second', 'Metros por segundo', 'Metros por segundo', '秒速', 'Meter pro Sekunde', 'Mètres par seconde', 'मीटर प्रति सेकंड', '秒速', '秒速'),
  reactionLabel: T('공주거리', 'Reaction distance', 'Distancia de reacción', 'Distância de reação', '空走距離', 'Reaktionsweg', 'Distance de réaction', 'प्रतिक्रिया दूरी', '反应距离', '反應距離'),
  brakingLabel: T('제동거리', 'Braking distance', 'Distancia de frenado', 'Distância de frenagem', '制動距離', 'Bremsweg', 'Distance de freinage', 'ब्रेकिंग दूरी', '制动距离', '制動距離'),
  totalLabel: T('정지거리', 'Stopping distance', 'Distancia total', 'Distância total', '停止距離', 'Anhalteweg', 'Distance d’arrêt', 'कुल दूरी', '刹车距离', '煞車距離'),
  carsLabel: T('승용차 대수', 'in car lengths', 'en largos de coche', 'em comprimentos de carro', '車の台数', 'in Autolängen', 'en longueurs de voiture', 'कार की लंबाई में', '约几个车身', '約幾個車身'),

  squareTitle: T('두 배 빠르면 네 배 멀리 갑니다', 'Twice the speed, four times the distance', 'El doble de rápido, cuatro veces más lejos', 'O dobro da velocidade, quatro vezes a distância', '二倍の速さなら四倍の距離', 'Doppelt so schnell, viermal so weit', 'Deux fois plus vite, quatre fois plus loin', 'दोगुनी गति, चार गुनी दूरी', '快一倍，远四倍', '快一倍，遠四倍'),

  squareNote: T(
    '제동거리는 속도의 제곱에 비례합니다. 움직이는 물체가 가진 에너지가 속도의 제곱으로 늘고, 그 에너지를 브레이크가 다 없애야 멈추기 때문입니다.',
    'Braking distance grows with the square of speed, because the energy of a moving car grows with the square of speed — and the brakes have to shed all of it.',
    'La distancia de frenado crece con el cuadrado de la velocidad, porque la energía del coche en movimiento crece igual, y los frenos tienen que disiparla toda.',
    'A distância de frenagem cresce com o quadrado da velocidade, porque a energia do carro em movimento cresce assim, e os freios precisam dissipar tudo.',
    '制動距離は速度の二乗に比例します。動いている車が持つエネルギーが速度の二乗で増え、それをブレーキがすべて捨てないと止まらないからです。',
    'Der Bremsweg wächst mit dem Quadrat der Geschwindigkeit, denn die Energie eines fahrenden Autos wächst quadratisch — und die Bremsen müssen sie vollständig abbauen.',
    'La distance de freinage croît comme le carré de la vitesse, car l’énergie d’une voiture en mouvement croît de même — et les freins doivent l’évacuer entièrement.',
    'ब्रेकिंग दूरी गति के वर्ग के अनुपात में बढ़ती है, क्योंकि चलती गाड़ी की ऊर्जा भी वर्ग के अनुपात में बढ़ती है और ब्रेक को वह पूरी ऊर्जा ख़त्म करनी पड़ती है।',
    '制动距离与速度的平方成正比：行驶中的车所带能量随速度平方增长，而刹车必须把这些能量全部耗掉。',
    '制動距離與速度的平方成正比：行駛中的車所帶能量隨速度平方增長，而煞車必須把這些能量全部耗掉。',
  ),

  reactionTitle: T('브레이크를 밟기 전에도 굴러갑니다', 'The car moves before the pedal does', 'El coche avanza antes que el pedal', 'O carro anda antes do pedal', 'ブレーキを踏む前にも進みます', 'Das Auto rollt, bevor das Pedal sinkt', 'La voiture roule avant la pédale', 'ब्रेक दबने से पहले भी गाड़ी चलती है', '踩刹车之前车也在走', '踩煞車之前車也在走'),

  reactionNote: T(
    '위험을 보고 브레이크를 밟기까지 1초쯤 걸립니다. 시속 100km라면 그동안 28m를 그대로 갑니다 — 아직 브레이크는 닿지도 않았습니다.',
    'It takes about a second to see the danger and move your foot. At 100 km/h that second carries you 28 metres with the brakes still untouched.',
    'Se tarda alrededor de un segundo en ver el peligro y mover el pie. A 100 km/h ese segundo son 28 metros con los frenos aún sin tocar.',
    'Leva cerca de um segundo para ver o perigo e mover o pé. A 100 km/h esse segundo são 28 metros com os freios ainda intocados.',
    '危険に気づいてブレーキを踏むまで約1秒かかります。時速100kmならその間に28m進みます——まだブレーキには触れてもいません。',
    'Etwa eine Sekunde vergeht, bis man die Gefahr sieht und den Fuß bewegt. Bei 100 km/h sind das 28 Meter, bevor die Bremse überhaupt greift.',
    'Il faut environ une seconde pour voir le danger et déplacer le pied. À 100 km/h, cette seconde représente 28 mètres, freins encore intacts.',
    'ख़तरा देखकर पैर हिलाने में लगभग एक सेकंड लगता है। 100 किमी/घंटा पर वह एक सेकंड 28 मीटर ले जाता है — ब्रेक अभी छुआ भी नहीं।',
    '看到危险再挪脚大约要一秒。时速 100 公里时，这一秒就走了 28 米——刹车还没碰到。',
    '看到危險再挪腳大約要一秒。時速 100 公里時，這一秒就走了 28 公尺——煞車還沒碰到。',
  ),

  surfaceTitle: T('노면이 절반을 정합니다', 'The surface decides half of it', 'El firme decide la mitad', 'O piso decide metade', '路面が半分を決めます', 'Die Fahrbahn entscheidet die Hälfte', 'La chaussée décide de la moitié', 'सतह आधा तय करती है', '路面决定一半', '路面決定一半'),

  surfaceNote: T(
    '같은 속도라도 빙판에서는 마른 노면의 예닐곱 배를 갑니다. 마찰계수가 그만큼 작기 때문입니다.',
    'At the same speed, ice takes six or seven times the distance of dry asphalt, simply because the grip is that much lower.',
    'A la misma velocidad, el hielo exige seis o siete veces la distancia del asfalto seco, sencillamente porque el agarre es mucho menor.',
    'Na mesma velocidade, o gelo exige seis ou sete vezes a distância do asfalto seco, simplesmente porque a aderência é muito menor.',
    '同じ速度でも凍結路面では乾いた路面の6〜7倍進みます。摩擦係数がそれだけ小さいからです。',
    'Bei gleicher Geschwindigkeit braucht Eis das Sechs- bis Siebenfache der Strecke von trockenem Asphalt — schlicht weil der Grip so viel geringer ist.',
    'À vitesse égale, le verglas demande six à sept fois la distance de l’asphalte sec, simplement parce que l’adhérence est bien moindre.',
    'एक ही गति पर पाले पर सूखी सड़क से छह-सात गुना दूरी लगती है, क्योंकि पकड़ उतनी ही कम होती है।',
    '同样的速度，结冰路面要用干燥路面六到七倍的距离，因为附着力低得多。',
    '同樣的速度，結冰路面要用乾燥路面六到七倍的距離，因為附著力低得多。',
  ),

  limitTitle: T('제한속도에서', 'At the posted limits', 'En los límites señalizados', 'Nos limites sinalizados', '制限速度では', 'Bei den zulässigen Höchstgeschwindigkeiten', 'Aux vitesses limites', 'निर्धारित गति सीमाओं पर', '在限速值上', '在限速值上'),

  limitNote: T(
    '어린이보호구역 30km/h와 도심 50km/h의 차이가 여기서 드러납니다 — 속도는 20km/h 차이지만 정지거리는 두 배가 됩니다.',
    'This is where a 30 km/h school zone and a 50 km/h city street part ways: 20 km/h apart in speed, but twice the stopping distance.',
    'Aquí se separan una zona escolar de 30 km/h y una calle urbana de 50: 20 km/h de diferencia, pero el doble de distancia para parar.',
    'É aqui que uma zona escolar de 30 km/h se separa de uma rua urbana de 50: 20 km/h de diferença, mas o dobro da distância para parar.',
    'スクールゾーンの30km/hと市街地の50km/hの差がここに出ます——速度差は20km/hですが、停止距離は二倍になります。',
    'Hier trennen sich Tempo-30-Zone und 50er-Stadtstraße: 20 km/h Unterschied, aber der doppelte Anhalteweg.',
    'C’est là que se séparent une zone scolaire à 30 km/h et une rue à 50 : 20 km/h d’écart, mais deux fois la distance d’arrêt.',
    'यहीं 30 किमी/घंटा वाले स्कूल ज़ोन और 50 वाली शहरी सड़क का अंतर दिखता है — गति में 20 का फ़र्क़, पर रुकने की दूरी दोगुनी।',
    '学校区 30 公里和市区 50 公里的差别就在这里：速度只差 20，刹车距离却翻倍。',
    '學校區 30 公里和市區 50 公里的差別就在這裡：速度只差 20，煞車距離卻翻倍。',
  ),

  allTitle: T('시속 10km부터 150km까지', 'From 10 to 150 km/h', 'De 10 a 150 km/h', 'De 10 a 150 km/h', '時速10kmから150kmまで', 'Von 10 bis 150 km/h', 'De 10 à 150 km/h', '10 से 150 किमी/घंटा', '从时速 10 到 150 公里', '從時速 10 到 150 公里'),
  neighbourTitle: T('가까운 속도', 'Nearby speeds', 'Velocidades cercanas', 'Velocidades próximas', '近い速度', 'Geschwindigkeiten daneben', 'Vitesses voisines', 'पास की गति', '相邻速度', '相鄰速度'),

  caution: T(
    '어림입니다. 반응시간 1초와 노면별 대표 마찰계수를 가정해 계산한 값이고, 실제로는 타이어·브레이크·경사·짐 무게에 따라 크게 달라집니다.',
    'These are estimates. They assume a one-second reaction and a representative grip for each surface; real distances shift with tyres, brakes, slope and load.',
    'Son estimaciones. Suponen un segundo de reacción y un agarre representativo por firme; las distancias reales cambian con neumáticos, frenos, pendiente y carga.',
    'São estimativas. Supõem um segundo de reação e uma aderência representativa por piso; as distâncias reais mudam com pneus, freios, inclinação e carga.',
    '目安です。反応時間1秒と路面ごとの代表的な摩擦係数を仮定した値で、実際はタイヤ・ブレーキ・勾配・積載で大きく変わります。',
    'Das sind Schätzwerte. Sie unterstellen eine Sekunde Reaktionszeit und einen typischen Reibwert je Fahrbahn; real hängt alles von Reifen, Bremsen, Gefälle und Beladung ab.',
    'Ce sont des estimations. Elles supposent une seconde de réaction et une adhérence représentative par chaussée ; les distances réelles varient selon pneus, freins, pente et charge.',
    'ये अनुमान हैं। एक सेकंड की प्रतिक्रिया और हर सतह के प्रतिनिधि घर्षण को मानकर निकाले गए हैं; वास्तविक दूरी टायर, ब्रेक, ढलान और भार से बदलती है।',
    '这些是估算值。假设反应时间 1 秒、各路面取代表性摩擦系数；实际距离随轮胎、刹车、坡度和载重变化很大。',
    '這些是估算值。假設反應時間 1 秒、各路面取代表性摩擦係數；實際距離隨輪胎、煞車、坡度和載重變化很大。',
  ),

  desc: T<(f: StopFacts) => string>(
    f => `시속 ${f.kmh}km는 초속 ${f.ms}m입니다. 브레이크를 밟기까지 ${f.reaction}m를 그대로 가고, 마른 노면에서 ${f.surfaces[0].braking}m를 더 미끄러져 모두 ${f.dryTotal}m 만에 섭니다.`,
    f => `At ${f.kmh} km/h you cover ${f.ms} metres every second. ${f.reaction} m pass before the brakes bite, then ${f.surfaces[0].braking} m of braking on dry asphalt — ${f.dryTotal} m in all.`,
    f => `A ${f.kmh} km/h recorres ${f.ms} metros por segundo. Pasan ${f.reaction} m antes de que el freno actúe y otros ${f.surfaces[0].braking} m frenando sobre asfalto seco: ${f.dryTotal} m en total.`,
    f => `A ${f.kmh} km/h você percorre ${f.ms} metros por segundo. Passam ${f.reaction} m antes de o freio agir e mais ${f.surfaces[0].braking} m freando em asfalto seco: ${f.dryTotal} m no total.`,
    f => `時速${f.kmh}kmは秒速${f.ms}mです。ブレーキが効き始めるまでに${f.reaction}m進み、乾いた路面ではさらに${f.surfaces[0].braking}m滑って、合わせて${f.dryTotal}mで止まります。`,
    f => `Bei ${f.kmh} km/h legst du ${f.ms} Meter pro Sekunde zurück. ${f.reaction} m vergehen, bis die Bremse greift, dann ${f.surfaces[0].braking} m Bremsweg auf trockenem Asphalt — zusammen ${f.dryTotal} m.`,
    f => `À ${f.kmh} km/h, vous parcourez ${f.ms} mètres par seconde. ${f.reaction} m défilent avant que le frein n’agisse, puis ${f.surfaces[0].braking} m de freinage sur asphalte sec : ${f.dryTotal} m au total.`,
    f => `${f.kmh} किमी/घंटा यानी हर सेकंड ${f.ms} मीटर। ब्रेक लगने से पहले ${f.reaction} मीटर निकल जाते हैं, फिर सूखी सड़क पर ${f.surfaces[0].braking} मीटर ब्रेकिंग — कुल ${f.dryTotal} मीटर।`,
    f => `时速 ${f.kmh} 公里等于每秒 ${f.ms} 米。刹车生效前先走 ${f.reaction} 米，干燥路面上再滑 ${f.surfaces[0].braking} 米，一共 ${f.dryTotal} 米才停住。`,
    f => `時速 ${f.kmh} 公里等於每秒 ${f.ms} 公尺。煞車生效前先走 ${f.reaction} 公尺，乾燥路面上再滑 ${f.surfaces[0].braking} 公尺，一共 ${f.dryTotal} 公尺才停住。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '정지거리 = 공주거리 + 제동거리입니다.',
      '공주거리는 반응하는 1초 동안 간 거리라 속도에 비례합니다.',
      '제동거리는 속도의 제곱 ÷ (2 × 마찰계수 × 9.81)입니다.',
      '차가 무거워도 제동거리는 같습니다 — 식에서 질량이 약분됩니다.',
    ],
    [
      'Stopping distance = reaction distance + braking distance.',
      'Reaction distance is one second of travel, so it grows in step with speed.',
      'Braking distance is speed squared ÷ (2 × grip × 9.81).',
      'A heavier car brakes in the same distance — mass cancels out of the equation.',
    ],
    [
      'Distancia total = distancia de reacción + distancia de frenado.',
      'La de reacción es un segundo de marcha, así que crece con la velocidad.',
      'La de frenado es la velocidad al cuadrado ÷ (2 × agarre × 9,81).',
      'Un coche más pesado frena en la misma distancia: la masa se cancela en la fórmula.',
    ],
    [
      'Distância total = distância de reação + distância de frenagem.',
      'A de reação é um segundo de percurso, então cresce junto com a velocidade.',
      'A de frenagem é a velocidade ao quadrado ÷ (2 × aderência × 9,81).',
      'Um carro mais pesado freia na mesma distância: a massa se cancela na fórmula.',
    ],
    [
      '停止距離 = 空走距離 + 制動距離です。',
      '空走距離は反応する1秒で進む距離なので、速度に比例します。',
      '制動距離は速度の二乗 ÷（2 × 摩擦係数 × 9.81）です。',
      '車が重くても制動距離は同じです——式で質量が約分されます。',
    ],
    [
      'Anhalteweg = Reaktionsweg + Bremsweg.',
      'Der Reaktionsweg ist eine Sekunde Fahrt und wächst daher proportional zur Geschwindigkeit.',
      'Der Bremsweg ist Geschwindigkeit im Quadrat ÷ (2 × Reibwert × 9,81).',
      'Ein schwereres Auto bremst genauso weit — die Masse kürzt sich aus der Formel.',
    ],
    [
      'Distance d’arrêt = distance de réaction + distance de freinage.',
      'La distance de réaction vaut une seconde de trajet : elle croît avec la vitesse.',
      'La distance de freinage vaut la vitesse au carré ÷ (2 × adhérence × 9,81).',
      'Une voiture plus lourde s’arrête sur la même distance : la masse s’élimine dans la formule.',
    ],
    [
      'कुल दूरी = प्रतिक्रिया दूरी + ब्रेकिंग दूरी।',
      'प्रतिक्रिया दूरी एक सेकंड की यात्रा है, इसलिए गति के अनुपात में बढ़ती है।',
      'ब्रेकिंग दूरी = गति का वर्ग ÷ (2 × घर्षण × 9.81)।',
      'भारी गाड़ी भी उतनी ही दूरी में रुकती है — सूत्र में द्रव्यमान कट जाता है।',
    ],
    [
      '刹车距离 = 反应距离 + 制动距离。',
      '反应距离是一秒的行程，因此与速度成正比。',
      '制动距离 = 速度平方 ÷（2 × 摩擦系数 × 9.81）。',
      '车更重也不会更远——公式里质量被约掉了。',
    ],
    [
      '煞車距離 = 反應距離 + 制動距離。',
      '反應距離是一秒的行程，因此與速度成正比。',
      '制動距離 = 速度平方 ÷（2 × 摩擦係數 × 9.81）。',
      '車更重也不會更遠——公式裡質量被約掉了。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '정지거리표 — 시속별 공주거리와 제동거리 141가지',
    'Stopping distance chart — reaction and braking distance for 141 speeds',
    'Tabla de distancias de frenado — reacción y frenado para 141 velocidades',
    'Tabela de distâncias de frenagem — reação e frenagem para 141 velocidades',
    '停止距離表 — 速度別の空走距離と制動距離141種',
    'Anhalteweg-Tabelle — Reaktions- und Bremsweg für 141 Geschwindigkeiten',
    'Tableau des distances d’arrêt — réaction et freinage pour 141 vitesses',
    'रुकने की दूरी चार्ट — 141 गतियों की प्रतिक्रिया और ब्रेकिंग दूरी',
    '刹车距离表 — 141 种速度的反应距离与制动距离',
    '煞車距離表 — 141 種速度的反應距離與制動距離',
  ),

  hubMetaDesc: T(
    '시속 10km부터 150km까지, 마른 노면·젖은 노면·눈길·빙판에서의 공주거리와 제동거리를 계산했습니다. 속도가 두 배면 제동거리는 네 배입니다.',
    'Reaction and braking distances from 10 to 150 km/h on dry asphalt, wet road, snow and ice. Double the speed and the braking distance quadruples.',
    'Distancias de reacción y frenado de 10 a 150 km/h sobre asfalto seco, calzada mojada, nieve y hielo. Al doblar la velocidad, la de frenado se cuadruplica.',
    'Distâncias de reação e frenagem de 10 a 150 km/h em asfalto seco, pista molhada, neve e gelo. Ao dobrar a velocidade, a de frenagem quadruplica.',
    '時速10kmから150kmまで、乾いた路面・濡れた路面・雪道・凍結路面での空走距離と制動距離を計算しました。速度が二倍なら制動距離は四倍です。',
    'Reaktions- und Bremswege von 10 bis 150 km/h auf trockenem Asphalt, nasser Fahrbahn, Schnee und Eis. Doppelte Geschwindigkeit, vierfacher Bremsweg.',
    'Distances de réaction et de freinage de 10 à 150 km/h sur asphalte sec, chaussée mouillée, neige et verglas. Vitesse doublée, freinage quadruplé.',
    '10 से 150 किमी/घंटा तक सूखी, गीली, बर्फ़ीली और पाले वाली सड़क पर प्रतिक्रिया और ब्रेकिंग दूरी। गति दोगुनी तो ब्रेकिंग दूरी चार गुनी।',
    '时速 10 到 150 公里，在干燥、湿滑、积雪与结冰路面上的反应距离与制动距离。速度翻一倍，制动距离变四倍。',
    '時速 10 到 150 公里，在乾燥、濕滑、積雪與結冰路面上的反應距離與制動距離。速度翻一倍，制動距離變四倍。',
  ),

  metaTitle: T<(f: StopFacts) => string>(
    f => `시속 ${f.kmh}km 정지거리 — 마른 노면 ${f.dryTotal}m`,
    f => `Stopping distance at ${f.kmh} km/h — ${f.dryTotal} m on dry asphalt`,
    f => `Distancia de frenado a ${f.kmh} km/h — ${f.dryTotal} m en asfalto seco`,
    f => `Distância de frenagem a ${f.kmh} km/h — ${f.dryTotal} m em asfalto seco`,
    f => `時速${f.kmh}kmの停止距離 — 乾いた路面で${f.dryTotal}m`,
    f => `Anhalteweg bei ${f.kmh} km/h — ${f.dryTotal} m auf trockenem Asphalt`,
    f => `Distance d’arrêt à ${f.kmh} km/h — ${f.dryTotal} m sur asphalte sec`,
    f => `${f.kmh} किमी/घंटा पर रुकने की दूरी — सूखी सड़क पर ${f.dryTotal} मीटर`,
    f => `时速 ${f.kmh} 公里的刹车距离 — 干燥路面 ${f.dryTotal} 米`,
    f => `時速 ${f.kmh} 公里的煞車距離 — 乾燥路面 ${f.dryTotal} 公尺`,
  ),

  metaDesc: T<(f: StopFacts) => string>(
    f => `시속 ${f.kmh}km에서는 공주거리 ${f.reaction}m에 제동거리 ${f.surfaces[0].braking}m가 더해져 마른 노면 정지거리가 ${f.dryTotal}m입니다. 젖은 노면 ${f.surfaces[1].total}m, 눈길 ${f.surfaces[2].total}m, 빙판 ${f.surfaces[3].total}m입니다.`,
    f => `At ${f.kmh} km/h, ${f.reaction} m of reaction plus ${f.surfaces[0].braking} m of braking makes ${f.dryTotal} m on dry asphalt — ${f.surfaces[1].total} m on a wet road, ${f.surfaces[2].total} m on snow, ${f.surfaces[3].total} m on ice.`,
    f => `A ${f.kmh} km/h, ${f.reaction} m de reacción más ${f.surfaces[0].braking} m de frenado dan ${f.dryTotal} m en asfalto seco: ${f.surfaces[1].total} m mojado, ${f.surfaces[2].total} m con nieve, ${f.surfaces[3].total} m con hielo.`,
    f => `A ${f.kmh} km/h, ${f.reaction} m de reação mais ${f.surfaces[0].braking} m de frenagem dão ${f.dryTotal} m em asfalto seco: ${f.surfaces[1].total} m molhado, ${f.surfaces[2].total} m na neve, ${f.surfaces[3].total} m no gelo.`,
    f => `時速${f.kmh}kmでは空走距離${f.reaction}mに制動距離${f.surfaces[0].braking}mが加わり、乾いた路面の停止距離は${f.dryTotal}mです。濡れた路面${f.surfaces[1].total}m、雪道${f.surfaces[2].total}m、凍結路面${f.surfaces[3].total}mです。`,
    f => `Bei ${f.kmh} km/h ergeben ${f.reaction} m Reaktionsweg plus ${f.surfaces[0].braking} m Bremsweg ${f.dryTotal} m auf trockenem Asphalt — nass ${f.surfaces[1].total} m, Schnee ${f.surfaces[2].total} m, Eis ${f.surfaces[3].total} m.`,
    f => `À ${f.kmh} km/h, ${f.reaction} m de réaction plus ${f.surfaces[0].braking} m de freinage font ${f.dryTotal} m sur asphalte sec : ${f.surfaces[1].total} m sur chaussée mouillée, ${f.surfaces[2].total} m sur neige, ${f.surfaces[3].total} m sur verglas.`,
    f => `${f.kmh} किमी/घंटा पर ${f.reaction} मीटर प्रतिक्रिया और ${f.surfaces[0].braking} मीटर ब्रेकिंग मिलाकर सूखी सड़क पर ${f.dryTotal} मीटर — गीली ${f.surfaces[1].total}, बर्फ़ ${f.surfaces[2].total}, पाला ${f.surfaces[3].total} मीटर।`,
    f => `时速 ${f.kmh} 公里时，反应 ${f.reaction} 米加制动 ${f.surfaces[0].braking} 米，干燥路面共 ${f.dryTotal} 米；湿滑 ${f.surfaces[1].total} 米，积雪 ${f.surfaces[2].total} 米，结冰 ${f.surfaces[3].total} 米。`,
    f => `時速 ${f.kmh} 公里時，反應 ${f.reaction} 公尺加制動 ${f.surfaces[0].braking} 公尺，乾燥路面共 ${f.dryTotal} 公尺；濕滑 ${f.surfaces[1].total} 公尺，積雪 ${f.surfaces[2].total} 公尺，結冰 ${f.surfaces[3].total} 公尺。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '무거운 차가 더 멀리 미끄러지나요?', a: '아닙니다. 무거우면 운동에너지도 크지만 노면을 누르는 힘도 그만큼 커서 마찰력도 커집니다. 식에서 질량이 약분되어 사라집니다 — 다만 브레이크가 열을 견디지 못하면 실제로는 길어집니다.' },
      { q: '반응시간 1초는 어디서 나온 값인가요?', a: '교통안전 교재에서 쓰는 대표값입니다. 실제로는 0.7초에서 1.5초 사이로 흩어지고, 피곤하거나 딴 데를 보고 있으면 더 길어집니다.' },
      { q: 'ABS가 있으면 짧아지나요?', a: '반드시 그렇지는 않습니다. ABS는 바퀴가 잠기지 않게 해 조향을 살려 주는 장치입니다. 마른 노면에서는 비슷하고, 자갈이나 눈에서는 오히려 조금 길어질 수 있습니다.' },
      { q: '내리막에서는 어떻게 되나요?', a: '길어집니다. 중력이 진행 방향으로 밀기 때문입니다. 10% 경사면 마찰계수가 0.1만큼 줄어든 것과 비슷하게 봅니다.' },
      { q: '어린이보호구역이 30km/h인 이유가 뭔가요?', a: '이 표에서 그대로 보입니다. 50km/h와 30km/h는 20km/h 차이지만 마른 노면 정지거리는 26m와 13m로 두 배 차이가 납니다.' },
    ],
    [
      { q: 'Does a heavier car slide further?', a: 'No. More mass means more energy, but also more grip pressing on the road, and the two cancel in the equation. In practice a heavy vehicle can stop longer once the brakes overheat.' },
      { q: 'Where does the one-second reaction come from?', a: 'It is the figure road-safety courses use. Real reactions scatter between roughly 0.7 and 1.5 seconds, and stretch further when a driver is tired or looking away.' },
      { q: 'Does ABS shorten the distance?', a: 'Not necessarily. ABS keeps the wheels from locking so you can still steer. On dry asphalt the distance is about the same; on gravel or snow it can even be slightly longer.' },
      { q: 'What about going downhill?', a: 'It gets longer, because gravity pulls the car along. A 10% grade behaves roughly like losing 0.1 of grip.' },
      { q: 'Why are school zones 30 km/h?', a: 'The table shows it plainly: 50 km/h and 30 km/h are only 20 km/h apart, yet the dry stopping distances are 26 m and 13 m — twice as far.' },
    ],
    [
      { q: '¿Un coche pesado derrapa más lejos?', a: 'No. Más masa implica más energía, pero también más agarre contra el asfalto, y ambas se cancelan en la fórmula. En la práctica, un vehículo pesado sí frena peor cuando los frenos se calientan.' },
      { q: '¿De dónde sale el segundo de reacción?', a: 'Es la cifra que usan los cursos de seguridad vial. Las reacciones reales van de unos 0,7 a 1,5 segundos, y se alargan con el cansancio o la distracción.' },
      { q: '¿El ABS acorta la distancia?', a: 'No necesariamente. El ABS evita que las ruedas se bloqueen para poder seguir dirigiendo. En seco la distancia es parecida; en grava o nieve puede ser algo mayor.' },
      { q: '¿Y en bajada?', a: 'Aumenta, porque la gravedad empuja el coche hacia delante. Una pendiente del 10% equivale más o menos a perder 0,1 de agarre.' },
      { q: '¿Por qué las zonas escolares son de 30 km/h?', a: 'La tabla lo enseña: entre 50 y 30 km/h solo hay 20 km/h, pero las distancias en seco son 26 m y 13 m, el doble.' },
    ],
    [
      { q: 'Um carro pesado desliza mais longe?', a: 'Não. Mais massa significa mais energia, mas também mais aderência contra o piso, e as duas se cancelam na fórmula. Na prática, um veículo pesado freia pior quando os freios esquentam.' },
      { q: 'De onde vem o segundo de reação?', a: 'É o número usado nos cursos de segurança viária. As reações reais variam de cerca de 0,7 a 1,5 segundo, e aumentam com cansaço ou distração.' },
      { q: 'O ABS encurta a distância?', a: 'Não necessariamente. O ABS impede o travamento das rodas para você continuar dirigindo. No seco a distância é parecida; em cascalho ou neve pode ser um pouco maior.' },
      { q: 'E na descida?', a: 'Aumenta, porque a gravidade empurra o carro para a frente. Uma inclinação de 10% equivale mais ou menos a perder 0,1 de aderência.' },
      { q: 'Por que zonas escolares são de 30 km/h?', a: 'A tabela mostra: entre 50 e 30 km/h há só 20 km/h, mas as distâncias no seco são 26 m e 13 m — o dobro.' },
    ],
    [
      { q: '重い車のほうが遠くまで滑りますか？', a: 'いいえ。重ければ運動エネルギーも大きいですが、路面を押す力も大きく摩擦力も増えるので、式で質量が約分されます。ただしブレーキが熱に耐えられなくなると実際には伸びます。' },
      { q: '反応時間1秒はどこから来た値ですか？', a: '交通安全の教材で使われる代表値です。実際には0.7秒から1.5秒ほどに散らばり、疲れていたり余所見をしていればさらに伸びます。' },
      { q: 'ABSがあれば短くなりますか？', a: '必ずしもそうではありません。ABSは車輪をロックさせず操舵を残す装置です。乾いた路面では同程度、砂利や雪ではむしろ少し伸びることがあります。' },
      { q: '下り坂ではどうなりますか？', a: '伸びます。重力が進行方向に押すからです。10%の勾配は摩擦係数が0.1減ったのとほぼ同じに扱います。' },
      { q: 'スクールゾーンが30km/hなのはなぜですか？', a: 'この表にそのまま出ています。50km/hと30km/hは20km/hの差ですが、乾いた路面の停止距離は26mと13mで二倍違います。' },
    ],
    [
      { q: 'Rutscht ein schweres Auto weiter?', a: 'Nein. Mehr Masse heißt mehr Energie, aber auch mehr Auflagekraft und damit mehr Reibung — beides kürzt sich in der Formel. In der Praxis bremst ein schweres Fahrzeug schlechter, sobald die Bremsen heiß werden.' },
      { q: 'Woher kommt die eine Sekunde Reaktionszeit?', a: 'Sie stammt aus der Verkehrserziehung. Reale Reaktionen streuen etwa zwischen 0,7 und 1,5 Sekunden und werden bei Müdigkeit oder Ablenkung länger.' },
      { q: 'Verkürzt ABS den Weg?', a: 'Nicht zwangsläufig. ABS verhindert das Blockieren, damit man lenken kann. Auf trockenem Asphalt bleibt der Weg ähnlich, auf Schotter oder Schnee kann er sogar etwas länger sein.' },
      { q: 'Und was passiert bergab?', a: 'Er wird länger, weil die Schwerkraft mitschiebt. Ein Gefälle von 10 % wirkt ungefähr wie 0,1 weniger Reibwert.' },
      { q: 'Warum gilt in Schulzonen Tempo 30?', a: 'Die Tabelle zeigt es: zwischen 50 und 30 km/h liegen nur 20 km/h, aber die trockenen Anhaltewege sind 26 m und 13 m — doppelt so weit.' },
    ],
    [
      { q: 'Une voiture lourde glisse-t-elle plus loin ?', a: 'Non. Plus de masse, c’est plus d’énergie, mais aussi plus d’appui donc plus d’adhérence : les deux s’annulent dans la formule. En pratique, un véhicule lourd freine moins bien quand les freins chauffent.' },
      { q: 'D’où vient cette seconde de réaction ?', a: 'C’est la valeur retenue par la sécurité routière. Les réactions réelles s’étalent entre 0,7 et 1,5 seconde environ, et s’allongent avec la fatigue ou la distraction.' },
      { q: 'L’ABS raccourcit-il la distance ?', a: 'Pas forcément. L’ABS empêche le blocage des roues pour conserver la direction. Sur sec, la distance est comparable ; sur gravier ou neige, elle peut même être un peu plus longue.' },
      { q: 'Et en descente ?', a: 'Elle s’allonge, car la gravité pousse la voiture. Une pente de 10 % revient à peu près à perdre 0,1 d’adhérence.' },
      { q: 'Pourquoi 30 km/h près des écoles ?', a: 'Le tableau le montre : 50 et 30 km/h ne sont séparés que de 20 km/h, mais les distances sur sec sont de 26 m et 13 m — le double.' },
    ],
    [
      { q: 'क्या भारी गाड़ी ज़्यादा दूर फिसलती है?', a: 'नहीं। भार अधिक तो ऊर्जा अधिक, पर सड़क पर दबाव भी अधिक और घर्षण भी — सूत्र में दोनों कट जाते हैं। हाँ, ब्रेक गरम होने पर भारी वाहन वास्तव में अधिक दूरी लेता है।' },
      { q: 'एक सेकंड की प्रतिक्रिया कहाँ से आई?', a: 'यह सड़क सुरक्षा पाठ्यक्रमों का प्रतिनिधि आँकड़ा है। वास्तविक प्रतिक्रिया लगभग 0.7 से 1.5 सेकंड तक होती है, थकान या ध्यान भटकने पर और बढ़ जाती है।' },
      { q: 'क्या ABS से दूरी घटती है?', a: 'ज़रूरी नहीं। ABS पहियों को जाम होने से रोकता है ताकि स्टीयरिंग बनी रहे। सूखी सड़क पर दूरी लगभग वही रहती है; बजरी या बर्फ़ पर थोड़ी बढ़ भी सकती है।' },
      { q: 'ढलान पर क्या होता है?', a: 'दूरी बढ़ जाती है, क्योंकि गुरुत्व गाड़ी को आगे धकेलता है। 10% ढलान लगभग 0.1 घर्षण घटने जैसा है।' },
      { q: 'स्कूल ज़ोन में 30 किमी/घंटा क्यों?', a: 'तालिका में साफ़ दिखता है: 50 और 30 में सिर्फ़ 20 का अंतर है, पर सूखी सड़क पर दूरी 26 और 13 मीटर — दोगुनी।' },
    ],
    [
      { q: '车更重会滑得更远吗？', a: '不会。质量大能量大，但压在路面上的力也大、摩擦力同样大，公式里两者相消。不过刹车过热时，重车实际会停得更远。' },
      { q: '一秒的反应时间是哪来的？', a: '这是交通安全教材采用的代表值。真实反应大约在 0.7 到 1.5 秒之间，疲劳或分神时还会更长。' },
      { q: '有 ABS 会更短吗？', a: '不一定。ABS 是防止车轮抱死、保住转向能力的装置。干燥路面上距离相近，在碎石或积雪上甚至可能略长。' },
      { q: '下坡的时候会怎样？', a: '会变长，因为重力在往前推。10% 的坡度大致相当于摩擦系数减少 0.1。' },
      { q: '学校区为什么限速 30？', a: '这张表说得很清楚：50 和 30 只差 20，但干燥路面的刹车距离是 26 米和 13 米，正好两倍。' },
    ],
    [
      { q: '車更重會滑得更遠嗎？', a: '不會。質量大能量大，但壓在路面上的力也大、摩擦力同樣大，公式裡兩者相消。不過煞車過熱時，重車實際會停得更遠。' },
      { q: '一秒的反應時間是哪來的？', a: '這是交通安全教材採用的代表值。真實反應大約在 0.7 到 1.5 秒之間，疲勞或分神時還會更長。' },
      { q: '有 ABS 會更短嗎？', a: '不一定。ABS 是防止車輪抱死、保住轉向能力的裝置。乾燥路面上距離相近，在碎石或積雪上甚至可能略長。' },
      { q: '下坡的時候會怎樣？', a: '會變長，因為重力在往前推。10% 的坡度大致相當於摩擦係數減少 0.1。' },
      { q: '學校區為什麼限速 30？', a: '這張表說得很清楚：50 和 30 只差 20，但乾燥路面的煞車距離是 26 公尺和 13 公尺，正好兩倍。' },
    ],
  ),

  stopFaq: T<(f: StopFacts) => FaqItem[]>(
    f => [
      { q: `시속 ${f.kmh}km에서 정지거리는 얼마인가요?`, a: `마른 노면에서 ${f.dryTotal}m입니다. 공주거리 ${f.reaction}m와 제동거리 ${f.surfaces[0].braking}m를 더한 값입니다.` },
      { q: `비 오는 날에는 얼마나 길어지나요?`, a: `젖은 노면에서는 ${f.surfaces[1].total}m입니다. 눈길은 ${f.surfaces[2].total}m, 빙판은 ${f.surfaces[3].total}m입니다.` },
      { q: `승용차 몇 대 길이인가요?`, a: `마른 노면 기준 약 ${f.surfaces[0].cars}대분입니다(한 대를 4.5m로 봤습니다).` },
      { q: `브레이크를 밟기 전에 얼마나 가나요?`, a: `${f.reaction}m입니다. 시속 ${f.kmh}km는 초속 ${f.ms}m이고, 반응하는 데 1초가 걸린다고 봤습니다.` },
    ],
    f => [
      { q: `What is the stopping distance at ${f.kmh} km/h?`, a: `${f.dryTotal} m on dry asphalt — ${f.reaction} m of reaction plus ${f.surfaces[0].braking} m of braking.` },
      { q: `How much longer is it in the rain?`, a: `${f.surfaces[1].total} m on a wet road, ${f.surfaces[2].total} m on snow and ${f.surfaces[3].total} m on ice.` },
      { q: `How many car lengths is that?`, a: `About ${f.surfaces[0].cars} on dry asphalt, counting a car as 4.5 m.` },
      { q: `How far before the brakes even bite?`, a: `${f.reaction} m. At ${f.kmh} km/h you cover ${f.ms} m every second, and the reaction is taken as one second.` },
    ],
    f => [
      { q: `¿Cuál es la distancia de frenado a ${f.kmh} km/h?`, a: `${f.dryTotal} m en asfalto seco: ${f.reaction} m de reacción más ${f.surfaces[0].braking} m frenando.` },
      { q: `¿Cuánto se alarga con lluvia?`, a: `${f.surfaces[1].total} m en mojado, ${f.surfaces[2].total} m con nieve y ${f.surfaces[3].total} m con hielo.` },
      { q: `¿Cuántos coches de largo son?`, a: `Unos ${f.surfaces[0].cars} en seco, contando un coche como 4,5 m.` },
      { q: `¿Cuánto se avanza antes de que frene?`, a: `${f.reaction} m. A ${f.kmh} km/h recorres ${f.ms} m por segundo y se cuenta un segundo de reacción.` },
    ],
    f => [
      { q: `Qual a distância de frenagem a ${f.kmh} km/h?`, a: `${f.dryTotal} m em asfalto seco: ${f.reaction} m de reação mais ${f.surfaces[0].braking} m freando.` },
      { q: `Quanto aumenta na chuva?`, a: `${f.surfaces[1].total} m no molhado, ${f.surfaces[2].total} m na neve e ${f.surfaces[3].total} m no gelo.` },
      { q: `Quantos comprimentos de carro são?`, a: `Cerca de ${f.surfaces[0].cars} no seco, contando 4,5 m por carro.` },
      { q: `Quanto se anda antes de o freio agir?`, a: `${f.reaction} m. A ${f.kmh} km/h você percorre ${f.ms} m por segundo, e conta-se um segundo de reação.` },
    ],
    f => [
      { q: `時速${f.kmh}kmの停止距離はどれくらいですか？`, a: `乾いた路面で${f.dryTotal}mです。空走距離${f.reaction}mと制動距離${f.surfaces[0].braking}mを足した値です。` },
      { q: `雨の日はどれだけ伸びますか？`, a: `濡れた路面では${f.surfaces[1].total}m、雪道では${f.surfaces[2].total}m、凍結路面では${f.surfaces[3].total}mです。` },
      { q: `車何台分ですか？`, a: `乾いた路面でおよそ${f.surfaces[0].cars}台分です（1台4.5mとしました）。` },
      { q: `ブレーキが効く前にどれだけ進みますか？`, a: `${f.reaction}mです。時速${f.kmh}kmは秒速${f.ms}mで、反応に1秒かかるとしました。` },
    ],
    f => [
      { q: `Wie lang ist der Anhalteweg bei ${f.kmh} km/h?`, a: `${f.dryTotal} m auf trockenem Asphalt — ${f.reaction} m Reaktionsweg plus ${f.surfaces[0].braking} m Bremsweg.` },
      { q: `Wie viel mehr ist es bei Regen?`, a: `${f.surfaces[1].total} m auf nasser Fahrbahn, ${f.surfaces[2].total} m auf Schnee, ${f.surfaces[3].total} m auf Eis.` },
      { q: `Wie viele Autolängen sind das?`, a: `Etwa ${f.surfaces[0].cars} auf trockener Fahrbahn, bei 4,5 m je Auto.` },
      { q: `Wie weit rollt man, bevor die Bremse greift?`, a: `${f.reaction} m. Bei ${f.kmh} km/h legst du ${f.ms} m pro Sekunde zurück, und eine Sekunde Reaktion ist angesetzt.` },
    ],
    f => [
      { q: `Quelle distance d’arrêt à ${f.kmh} km/h ?`, a: `${f.dryTotal} m sur asphalte sec : ${f.reaction} m de réaction plus ${f.surfaces[0].braking} m de freinage.` },
      { q: `Combien de plus sous la pluie ?`, a: `${f.surfaces[1].total} m sur chaussée mouillée, ${f.surfaces[2].total} m sur neige, ${f.surfaces[3].total} m sur verglas.` },
      { q: `Cela fait combien de longueurs de voiture ?`, a: `Environ ${f.surfaces[0].cars} sur sec, en comptant 4,5 m par voiture.` },
      { q: `Quelle distance avant que le frein n’agisse ?`, a: `${f.reaction} m. À ${f.kmh} km/h vous parcourez ${f.ms} m par seconde, et l’on compte une seconde de réaction.` },
    ],
    f => [
      { q: `${f.kmh} किमी/घंटा पर रुकने की दूरी कितनी है?`, a: `सूखी सड़क पर ${f.dryTotal} मीटर — ${f.reaction} मीटर प्रतिक्रिया और ${f.surfaces[0].braking} मीटर ब्रेकिंग।` },
      { q: `बारिश में कितनी बढ़ जाती है?`, a: `गीली सड़क पर ${f.surfaces[1].total}, बर्फ़ पर ${f.surfaces[2].total} और पाले पर ${f.surfaces[3].total} मीटर।` },
      { q: `यह कितनी कारों की लंबाई है?`, a: `सूखी सड़क पर लगभग ${f.surfaces[0].cars} कारें (एक कार 4.5 मीटर मानकर)।` },
      { q: `ब्रेक लगने से पहले कितना चलते हैं?`, a: `${f.reaction} मीटर। ${f.kmh} किमी/घंटा यानी हर सेकंड ${f.ms} मीटर, और प्रतिक्रिया एक सेकंड मानी गई है।` },
    ],
    f => [
      { q: `时速 ${f.kmh} 公里的刹车距离是多少？`, a: `干燥路面 ${f.dryTotal} 米：反应 ${f.reaction} 米加制动 ${f.surfaces[0].braking} 米。` },
      { q: `下雨时会长多少？`, a: `湿滑路面 ${f.surfaces[1].total} 米，积雪 ${f.surfaces[2].total} 米，结冰 ${f.surfaces[3].total} 米。` },
      { q: `相当于几个车身？`, a: `干燥路面约 ${f.surfaces[0].cars} 个（按一辆车 4.5 米算）。` },
      { q: `刹车生效前会走多远？`, a: `${f.reaction} 米。时速 ${f.kmh} 公里即每秒 ${f.ms} 米，反应时间按一秒计。` },
    ],
    f => [
      { q: `時速 ${f.kmh} 公里的煞車距離是多少？`, a: `乾燥路面 ${f.dryTotal} 公尺：反應 ${f.reaction} 公尺加制動 ${f.surfaces[0].braking} 公尺。` },
      { q: `下雨時會長多少？`, a: `濕滑路面 ${f.surfaces[1].total} 公尺，積雪 ${f.surfaces[2].total} 公尺，結冰 ${f.surfaces[3].total} 公尺。` },
      { q: `相當於幾個車身？`, a: `乾燥路面約 ${f.surfaces[0].cars} 個（按一輛車 4.5 公尺算）。` },
      { q: `煞車生效前會走多遠？`, a: `${f.reaction} 公尺。時速 ${f.kmh} 公里即每秒 ${f.ms} 公尺，反應時間按一秒計。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const STOP_UI: L<StopUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<StopUI>;
