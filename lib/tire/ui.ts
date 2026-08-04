/**
 * 타이어 규격 화면의 문구 — 열 언어.
 *
 * 이 표를 찾는 까닭은 대개 하나다. "이 치수 대신 저 치수를 껴도 되나."
 * 그래서 문구도 그 질문에 맞춰 간다 — 외경이 얼마나 벌어지는지, 속도계가
 * 얼마나 틀어지는지, 3% 안이면 왜 괜찮다고 보는지.
 *
 * 밀리미터와 인치가 한 규격 안에 섞여 있는 것도 짚어 준다. 205와 55는 mm와
 * %인데 16만 인치다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { TireFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface TireUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  widthLabel: string;
  aspectLabel: string;
  rimLabel: string;
  sidewallLabel: string;
  diameterLabel: string;
  circumferenceLabel: string;
  revsLabel: string;
  readTitle: string;
  readNote: string;
  altTitle: string;
  altNote: string;
  speedoLabel: string;
  fasterTag: string;
  slowerTag: string;
  sameRimTitle: string;
  sameShapeTitle: string;
  rimTitle: string;
  rimNote: string;
  rimName: (rim: number) => string;
  extremeTitle: string;
  extremeNote: string;
  desc: (f: TireFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: TireFacts) => string;
  metaDesc: (f: TireFacts) => string;
  hubFaq: FaqItem[];
  tireFaq: (f: TireFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof TireUI]: L<TireUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('타이어 규격', 'Tyre sizes', 'Medidas de neumáticos', 'Medidas de pneus', 'タイヤサイズ', 'Reifengrößen', 'Dimensions de pneus', 'टायर साइज़', '轮胎规格', '輪胎規格'),

  hubTitle: T(
    '타이어 규격 204가지 — 외경과 바꿔 낄 수 있는 치수',
    '204 tyre sizes — diameters and what you can swap to',
    '204 medidas de neumáticos — diámetros y equivalencias',
    '204 medidas de pneus — diâmetros e equivalências',
    'タイヤサイズ204種 — 外径と履き替えできるサイズ',
    '204 Reifengrößen — Durchmesser und mögliche Alternativen',
    '204 dimensions de pneus — diamètres et équivalences',
    '204 टायर साइज़ — व्यास और बदलने लायक़ नाप',
    '204 种轮胎规格 — 外径与可替换的尺寸',
    '204 種輪胎規格 — 外徑與可替換的尺寸',
  ),

  hubLead: T(
    '205/55R16은 폭 205mm, 편평비 55%, 휠 16인치입니다. 여기서 사이드월 높이와 외경, 1km 회전수, 바꿔 낄 수 있는 규격까지 계산해 냅니다.',
    '205/55R16 means 205 mm wide, a 55 % sidewall and a 16-inch wheel. From those three numbers come the sidewall height, the overall diameter, the turns per kilometre and every size you can swap to.',
    '205/55R16 significa 205 mm de ancho, perfil del 55 % y llanta de 16 pulgadas. De esos tres números salen el flanco, el diámetro total, las vueltas por kilómetro y las medidas equivalentes.',
    '205/55R16 significa 205 mm de largura, perfil de 55 % e aro de 16 polegadas. Desses três números saem o flanco, o diâmetro total, as voltas por quilômetro e as medidas equivalentes.',
    '205/55R16は幅205mm、扁平率55%、ホイール16インチです。この3つからサイドウォール高、外径、1kmあたりの回転数、履き替えできるサイズまで計算します。',
    '205/55R16 heißt 205 mm breit, 55 % Flankenhöhe, 16-Zoll-Felge. Aus diesen drei Zahlen ergeben sich Flanke, Außendurchmesser, Umdrehungen pro Kilometer und alle passenden Alternativen.',
    '205/55R16 signifie 205 mm de large, un flanc de 55 % et une jante de 16 pouces. De ces trois nombres découlent le flanc, le diamètre total, les tours par kilomètre et les équivalences.',
    '205/55R16 यानी चौड़ाई 205 मिमी, प्रोफ़ाइल 55 % और व्हील 16 इंच। इन्हीं तीन अंकों से साइडवॉल, कुल व्यास, प्रति किलोमीटर चक्कर और बदलने लायक़ नाप निकलते हैं।',
    '205/55R16 表示胎宽 205 毫米、扁平比 55 %、轮辋 16 英寸。由这三个数算出胎侧高、外径、每公里转数，以及可以替换的规格。',
    '205/55R16 表示胎寬 205 毫米、扁平比 55 %、輪圈 16 英寸。由這三個數算出胎側高、外徑、每公里轉數，以及可以替換的規格。',
  ),

  widthLabel: T('단면 폭', 'Section width', 'Ancho de sección', 'Largura de seção', '断面幅', 'Reifenbreite', 'Largeur de section', 'सेक्शन चौड़ाई', '断面宽度', '斷面寬度'),
  aspectLabel: T('편평비', 'Aspect ratio', 'Perfil', 'Perfil', '扁平率', 'Querschnitt', 'Rapport d’aspect', 'आस्पेक्ट रेशियो', '扁平比', '扁平比'),
  rimLabel: T('휠 지름', 'Wheel size', 'Diámetro de llanta', 'Diâmetro do aro', 'ホイール径', 'Felgendurchmesser', 'Diamètre de jante', 'व्हील व्यास', '轮辋直径', '輪圈直徑'),
  sidewallLabel: T('사이드월 높이', 'Sidewall height', 'Altura del flanco', 'Altura do flanco', 'サイドウォール高', 'Flankenhöhe', 'Hauteur de flanc', 'साइडवॉल ऊँचाई', '胎侧高', '胎側高'),
  diameterLabel: T('외경', 'Overall diameter', 'Diámetro total', 'Diâmetro total', '外径', 'Außendurchmesser', 'Diamètre total', 'कुल व्यास', '外径', '外徑'),
  circumferenceLabel: T('둘레', 'Circumference', 'Circunferencia', 'Circunferência', '円周', 'Umfang', 'Circonférence', 'परिधि', '周长', '週長'),
  revsLabel: T('1km 회전수', 'Turns per km', 'Vueltas por km', 'Voltas por km', '1kmの回転数', 'Umdrehungen pro km', 'Tours par km', 'प्रति किमी चक्कर', '每公里转数', '每公里轉數'),

  readTitle: T('규격 읽는 법', 'How the code reads', 'Cómo se lee la medida', 'Como se lê a medida', 'サイズ表記の読み方', 'Wie die Größe zu lesen ist', 'Comment lire la dimension', 'नाप कैसे पढ़ें', '规格怎么读', '規格怎麼讀'),

  readNote: T(
    '앞의 205는 밀리미터, 가운데 55는 폭에 대한 퍼센트, 뒤의 16만 인치입니다. R은 래디얼 구조를 뜻합니다.',
    'The 205 is millimetres, the 55 is a percentage of that width, and only the 16 is inches. The R stands for radial construction.',
    'El 205 va en milímetros, el 55 es un porcentaje de ese ancho y solo el 16 va en pulgadas. La R indica construcción radial.',
    'O 205 está em milímetros, o 55 é uma porcentagem dessa largura e só o 16 está em polegadas. O R indica construção radial.',
    '最初の205はミリメートル、真ん中の55は幅に対するパーセント、最後の16だけがインチです。Rはラジアル構造を表します。',
    'Die 205 sind Millimeter, die 55 ist ein Prozentsatz dieser Breite, und nur die 16 sind Zoll. Das R steht für Radialbauweise.',
    'Le 205 est en millimètres, le 55 est un pourcentage de cette largeur, et seul le 16 est en pouces. Le R désigne la structure radiale.',
    '205 मिलीमीटर में है, 55 उसी चौड़ाई का प्रतिशत है, और केवल 16 इंच में है। R का अर्थ रेडियल संरचना है।',
    '前面的 205 是毫米，中间的 55 是相对胎宽的百分比，只有末尾的 16 是英寸。R 表示子午线结构。',
    '前面的 205 是毫米，中間的 55 是相對胎寬的百分比，只有末尾的 16 是英寸。R 表示子午線結構。',
  ),

  altTitle: T('바꿔 낄 수 있는 규격', 'Sizes you can swap to', 'Medidas equivalentes', 'Medidas equivalentes', '履き替えできるサイズ', 'Mögliche Alternativgrößen', 'Dimensions équivalentes', 'बदलने लायक़ नाप', '可替换的规格', '可替換的規格'),

  altNote: T(
    '외경이 3% 안에서 벌어지는 규격만 골랐습니다. 외경이 달라지면 한 바퀴에 가는 거리가 달라지고, 그 차이가 그대로 속도계 오차가 되기 때문입니다.',
    'Only sizes whose overall diameter stays within 3% are listed. A different diameter covers a different distance per turn, and that gap becomes speedometer error.',
    'Solo aparecen medidas cuyo diámetro total queda dentro del 3%. Un diámetro distinto recorre otra distancia por vuelta, y esa diferencia se convierte en error del velocímetro.',
    'Só aparecem medidas cujo diâmetro total fica dentro de 3%. Um diâmetro diferente percorre outra distância por volta, e essa diferença vira erro no velocímetro.',
    '外径の差が3%以内に収まるサイズだけを選びました。外径が変わると1回転で進む距離が変わり、その差がそのまま速度計の誤差になるからです。',
    'Aufgeführt sind nur Größen, deren Außendurchmesser innerhalb von 3% bleibt. Ein anderer Durchmesser legt pro Umdrehung eine andere Strecke zurück, und diese Differenz wird zum Tachofehler.',
    'Seules figurent les dimensions dont le diamètre total reste à 3% près. Un diamètre différent parcourt une autre distance par tour, et cet écart devient l’erreur du compteur.',
    'केवल वे नाप दिए हैं जिनका कुल व्यास 3% के भीतर रहता है। व्यास बदलने पर हर चक्कर की दूरी बदलती है, और वही अंतर स्पीडोमीटर की त्रुटि बन जाता है।',
    '只列出外径相差在 3% 以内的规格。外径变了，每转一圈走的距离就变，这个差值直接成为速度表误差。',
    '只列出外徑相差在 3% 以內的規格。外徑變了，每轉一圈走的距離就變，這個差值直接成為速度表誤差。',
  ),

  speedoLabel: T('속도계 차이', 'Speedometer shift', 'Desvío del velocímetro', 'Desvio do velocímetro', '速度計のずれ', 'Tachoabweichung', 'Écart au compteur', 'स्पीडोमीटर अंतर', '速度表偏差', '速度表偏差'),
  fasterTag: T('실제가 더 빠름', 'you go faster', 'vas más rápido', 'você anda mais rápido', '実速が速い', 'du fährst schneller', 'vous roulez plus vite', 'असल गति अधिक', '实速更快', '實速更快'),
  slowerTag: T('실제가 더 느림', 'you go slower', 'vas más lento', 'você anda mais devagar', '実速が遅い', 'du fährst langsamer', 'vous roulez moins vite', 'असल गति कम', '实速更慢', '實速更慢'),

  sameRimTitle: T('같은 휠에 들어가는 규격', 'Other sizes for this wheel', 'Otras medidas para esta llanta', 'Outras medidas para este aro', '同じホイールに入るサイズ', 'Weitere Größen für diese Felge', 'Autres dimensions pour cette jante', 'इसी व्हील के अन्य नाप', '同一轮辋的其他规格', '同一輪圈的其他規格'),
  sameShapeTitle: T('폭만 다른 규격', 'Same profile, different width', 'Mismo perfil, otro ancho', 'Mesmo perfil, outra largura', '幅だけ違うサイズ', 'Gleicher Querschnitt, andere Breite', 'Même profil, autre largeur', 'वही प्रोफ़ाइल, अलग चौड़ाई', '只有胎宽不同', '只有胎寬不同'),

  rimTitle: T('휠 지름으로 찾기', 'Browse by wheel size', 'Buscar por llanta', 'Buscar por aro', 'ホイール径から探す', 'Nach Felgengröße suchen', 'Parcourir par jante', 'व्हील साइज़ से देखें', '按轮辋直径查找', '按輪圈直徑查找'),

  rimNote: T(
    '휠은 그대로 두고 타이어만 바꾸는 경우가 가장 많습니다. 자기 휠 크기부터 짚어 보세요.',
    'Most people keep the wheel and change only the tyre. Start from the wheel size you already have.',
    'La mayoría conserva la llanta y solo cambia el neumático. Empieza por la llanta que ya tienes.',
    'A maioria mantém o aro e troca só o pneu. Comece pelo aro que você já tem.',
    'ホイールはそのままでタイヤだけ替える場合が一番多いです。まず自分のホイール径から。',
    'Meist bleibt die Felge, nur der Reifen wechselt. Fang bei deiner Felgengröße an.',
    'Le plus souvent, on garde la jante et on ne change que le pneu. Partez de votre taille de jante.',
    'अधिकतर लोग व्हील वही रखते हैं और सिर्फ़ टायर बदलते हैं। अपने व्हील साइज़ से शुरू कीजिए।',
    '多数人保留轮辋，只换轮胎。先从自己的轮辋尺寸开始找。',
    '多數人保留輪圈，只換輪胎。先從自己的輪圈尺寸開始找。',
  ),

  rimName: T<(rim: number) => string>(
    rim => `${rim}인치 휠`,
    rim => `${rim}-inch wheels`,
    rim => `Llantas de ${rim} pulgadas`,
    rim => `Aros de ${rim} polegadas`,
    rim => `${rim}インチホイール`,
    rim => `${rim}-Zoll-Felgen`,
    rim => `Jantes de ${rim} pouces`,
    rim => `${rim} इंच व्हील`,
    rim => `${rim} 英寸轮辋`,
    rim => `${rim} 英寸輪圈`,
  ),

  extremeTitle: T('가장 큰 것과 가장 작은 것', 'The largest and the smallest', 'El más grande y el más pequeño', 'O maior e o menor', '一番大きいものと小さいもの', 'Die größte und die kleinste', 'La plus grande et la plus petite', 'सबसे बड़ा और सबसे छोटा', '最大与最小', '最大與最小'),

  extremeNote: T(
    '휠이 커도 외경은 크게 벌어지지 않습니다. 휠이 커진 만큼 사이드월이 얇아지기 때문입니다.',
    'A bigger wheel does not mean a much bigger tyre. As the wheel grows, the sidewall thins out by roughly the same amount.',
    'Una llanta mayor no implica un neumático mucho mayor: cuanto más crece la llanta, más se adelgaza el flanco.',
    'Um aro maior não significa um pneu muito maior: quanto mais o aro cresce, mais fino fica o flanco.',
    'ホイールが大きくても外径はさほど変わりません。ホイールが大きくなる分だけサイドウォールが薄くなるからです。',
    'Eine größere Felge bedeutet keinen viel größeren Reifen: Je größer die Felge, desto dünner die Flanke.',
    'Une jante plus grande ne fait pas un pneu beaucoup plus grand : plus la jante grandit, plus le flanc s’amincit.',
    'बड़ा व्हील होने से टायर बहुत बड़ा नहीं होता — व्हील जितना बढ़ता है, साइडवॉल उतनी पतली होती जाती है।',
    '轮辋更大并不代表外径大很多：轮辋变大多少，胎侧就变薄多少。',
    '輪圈更大並不代表外徑大很多：輪圈變大多少，胎側就變薄多少。',
  ),

  desc: T<(f: TireFacts) => string>(
    f => `${f.label}은 폭 ${f.tire.width}mm, 편평비 ${f.tire.aspect}%, 휠 ${f.tire.rim}인치입니다. 사이드월이 ${f.sidewall}mm라 외경은 ${f.diameter}mm이고, 1km에 ${f.revsPerKm}바퀴 돕니다.`,
    f => `${f.label} is ${f.tire.width} mm wide with a ${f.tire.aspect}% sidewall on a ${f.tire.rim}-inch wheel. That sidewall is ${f.sidewall} mm, so the tyre stands ${f.diameter} mm tall and turns ${f.revsPerKm} times per kilometre.`,
    f => `${f.label} mide ${f.tire.width} mm de ancho, con perfil del ${f.tire.aspect}% sobre llanta de ${f.tire.rim} pulgadas. El flanco es de ${f.sidewall} mm, así que el diámetro total es ${f.diameter} mm y da ${f.revsPerKm} vueltas por kilómetro.`,
    f => `${f.label} tem ${f.tire.width} mm de largura, perfil de ${f.tire.aspect}% e aro de ${f.tire.rim} polegadas. O flanco mede ${f.sidewall} mm, logo o diâmetro total é ${f.diameter} mm e o pneu dá ${f.revsPerKm} voltas por quilômetro.`,
    f => `${f.label}は幅${f.tire.width}mm、扁平率${f.tire.aspect}%、ホイール${f.tire.rim}インチです。サイドウォールが${f.sidewall}mmなので外径は${f.diameter}mm、1kmで${f.revsPerKm}回転します。`,
    f => `${f.label} ist ${f.tire.width} mm breit, hat ${f.tire.aspect}% Flankenhöhe und sitzt auf einer ${f.tire.rim}-Zoll-Felge. Die Flanke misst ${f.sidewall} mm, der Außendurchmesser also ${f.diameter} mm — ${f.revsPerKm} Umdrehungen pro Kilometer.`,
    f => `${f.label} fait ${f.tire.width} mm de large, avec un flanc de ${f.tire.aspect}% sur une jante de ${f.tire.rim} pouces. Le flanc mesure ${f.sidewall} mm, d’où un diamètre total de ${f.diameter} mm et ${f.revsPerKm} tours par kilomètre.`,
    f => `${f.label} की चौड़ाई ${f.tire.width} मिमी, प्रोफ़ाइल ${f.tire.aspect}% और व्हील ${f.tire.rim} इंच है। साइडवॉल ${f.sidewall} मिमी है, इसलिए कुल व्यास ${f.diameter} मिमी और प्रति किलोमीटर ${f.revsPerKm} चक्कर।`,
    f => `${f.label} 的胎宽为 ${f.tire.width} 毫米，扁平比 ${f.tire.aspect}%，轮辋 ${f.tire.rim} 英寸。胎侧高 ${f.sidewall} 毫米，因此外径 ${f.diameter} 毫米，每公里转 ${f.revsPerKm} 圈。`,
    f => `${f.label} 的胎寬為 ${f.tire.width} 毫米，扁平比 ${f.tire.aspect}%，輪圈 ${f.tire.rim} 英寸。胎側高 ${f.sidewall} 毫米，因此外徑 ${f.diameter} 毫米，每公里轉 ${f.revsPerKm} 圈。`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '앞의 세 자리는 폭(mm), 가운데 두 자리는 편평비(%), 끝의 두 자리는 휠(인치)입니다.',
      '사이드월 높이 = 폭 × 편평비 ÷ 100. 205/55라면 112.75mm입니다.',
      '외경 = 휠 지름 + 사이드월 × 2. 휠 16인치는 406.4mm입니다.',
      '외경이 3% 넘게 달라지면 속도계와 주행거리계가 그만큼 틀어집니다.',
    ],
    [
      'The first three digits are the width in mm, the middle two are the aspect ratio in percent, the last two the wheel in inches.',
      'Sidewall height = width × aspect ÷ 100. For 205/55 that is 112.75 mm.',
      'Overall diameter = wheel diameter + twice the sidewall. A 16-inch wheel is 406.4 mm.',
      'Once the diameter shifts by more than 3%, the speedometer and odometer drift by the same amount.',
    ],
    [
      'Las tres primeras cifras son el ancho en mm, las dos del medio el perfil en porcentaje y las dos últimas la llanta en pulgadas.',
      'Altura del flanco = ancho × perfil ÷ 100. Para 205/55 son 112,75 mm.',
      'Diámetro total = diámetro de llanta + dos veces el flanco. Una llanta de 16 pulgadas mide 406,4 mm.',
      'Si el diámetro varía más del 3%, el velocímetro y el cuentakilómetros se desvían otro tanto.',
    ],
    [
      'Os três primeiros dígitos são a largura em mm, os dois do meio o perfil em porcentagem e os dois últimos o aro em polegadas.',
      'Altura do flanco = largura × perfil ÷ 100. Para 205/55 dá 112,75 mm.',
      'Diâmetro total = diâmetro do aro + duas vezes o flanco. Um aro de 16 polegadas tem 406,4 mm.',
      'Se o diâmetro variar mais de 3%, o velocímetro e o odômetro desviam na mesma medida.',
    ],
    [
      '最初の3桁は幅（mm）、真ん中の2桁は扁平率（%）、最後の2桁はホイール（インチ）です。',
      'サイドウォール高 = 幅 × 扁平率 ÷ 100。205/55なら112.75mmです。',
      '外径 = ホイール径 + サイドウォール × 2。16インチは406.4mmです。',
      '外径が3%を超えて変わると、速度計と走行距離計も同じだけずれます。',
    ],
    [
      'Die ersten drei Ziffern sind die Breite in mm, die mittleren zwei der Querschnitt in Prozent, die letzten zwei die Felge in Zoll.',
      'Flankenhöhe = Breite × Querschnitt ÷ 100. Bei 205/55 sind das 112,75 mm.',
      'Außendurchmesser = Felgendurchmesser + zweimal die Flanke. Eine 16-Zoll-Felge misst 406,4 mm.',
      'Weicht der Durchmesser um mehr als 3% ab, driften Tacho und Kilometerzähler genauso weit.',
    ],
    [
      'Les trois premiers chiffres donnent la largeur en mm, les deux suivants le rapport d’aspect en pourcentage, les deux derniers la jante en pouces.',
      'Hauteur de flanc = largeur × rapport ÷ 100. Pour 205/55, cela fait 112,75 mm.',
      'Diamètre total = diamètre de jante + deux fois le flanc. Une jante de 16 pouces mesure 406,4 mm.',
      'Dès que le diamètre change de plus de 3%, le compteur de vitesse et le compteur kilométrique dérivent d’autant.',
    ],
    [
      'पहले तीन अंक चौड़ाई (मिमी), बीच के दो अंक प्रोफ़ाइल (%), और अंतिम दो अंक व्हील (इंच) हैं।',
      'साइडवॉल ऊँचाई = चौड़ाई × प्रोफ़ाइल ÷ 100। 205/55 के लिए यह 112.75 मिमी है।',
      'कुल व्यास = व्हील व्यास + साइडवॉल × 2। 16 इंच का व्हील 406.4 मिमी होता है।',
      'व्यास 3% से ज़्यादा बदलते ही स्पीडोमीटर और ओडोमीटर उतना ही भटक जाते हैं।',
    ],
    [
      '前三位是胎宽（毫米），中间两位是扁平比（%），最后两位是轮辋（英寸）。',
      '胎侧高 = 胎宽 × 扁平比 ÷ 100。205/55 就是 112.75 毫米。',
      '外径 = 轮辋直径 + 胎侧高 × 2。16 英寸轮辋是 406.4 毫米。',
      '外径变化超过 3%，速度表和里程表就会差出同样的比例。',
    ],
    [
      '前三位是胎寬（毫米），中間兩位是扁平比（%），最後兩位是輪圈（英寸）。',
      '胎側高 = 胎寬 × 扁平比 ÷ 100。205/55 就是 112.75 毫米。',
      '外徑 = 輪圈直徑 + 胎側高 × 2。16 英寸輪圈是 406.4 毫米。',
      '外徑變化超過 3%，速度表和里程表就會差出同樣的比例。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '타이어 규격표 — 외경·둘레·호환 치수 204가지',
    'Tyre size chart — 204 sizes with diameters and equivalents',
    'Tabla de medidas de neumáticos — 204 medidas con diámetros y equivalencias',
    'Tabela de medidas de pneus — 204 medidas com diâmetros e equivalências',
    'タイヤサイズ表 — 外径・円周・互換サイズ204種',
    'Reifengrößen-Tabelle — 204 Größen mit Durchmesser und Alternativen',
    'Tableau des dimensions de pneus — 204 tailles, diamètres et équivalences',
    'टायर साइज़ चार्ट — 204 नाप, व्यास और समतुल्य',
    '轮胎规格表 — 204 种规格的外径与可替换尺寸',
    '輪胎規格表 — 204 種規格的外徑與可替換尺寸',
  ),

  hubMetaDesc: T(
    '205/55R16 같은 규격 204가지의 사이드월 높이·외경·둘레·1km 회전수를 계산하고, 외경이 3% 안에서 맞는 호환 치수를 함께 냅니다.',
    'Sidewall, overall diameter, circumference and turns per kilometre for 204 sizes like 205/55R16, plus every size whose diameter stays within 3%.',
    'Flanco, diámetro total, circunferencia y vueltas por kilómetro de 204 medidas como 205/55R16, más las equivalentes dentro del 3%.',
    'Flanco, diâmetro total, circunferência e voltas por quilômetro de 204 medidas como 205/55R16, além das equivalentes dentro de 3%.',
    '205/55R16のようなサイズ204種のサイドウォール高・外径・円周・1km回転数を計算し、外径が3%以内に収まる互換サイズも示します。',
    'Flanke, Außendurchmesser, Umfang und Umdrehungen pro Kilometer für 204 Größen wie 205/55R16 — dazu alle Alternativen innerhalb von 3%.',
    'Flanc, diamètre total, circonférence et tours par kilomètre pour 204 dimensions comme 205/55R16, avec les équivalences à 3% près.',
    '205/55R16 जैसी 204 नापों की साइडवॉल, कुल व्यास, परिधि और प्रति किलोमीटर चक्कर — साथ में 3% के भीतर आने वाले समतुल्य नाप।',
    '为 205/55R16 等 204 种规格计算胎侧高、外径、周长与每公里转数，并列出外径相差 3% 以内的可替换尺寸。',
    '為 205/55R16 等 204 種規格計算胎側高、外徑、週長與每公里轉數，並列出外徑相差 3% 以內的可替換尺寸。',
  ),

  metaTitle: T<(f: TireFacts) => string>(
    f => `${f.label} 외경 ${f.diameter}mm — 호환 규격과 속도계 차이`,
    f => `${f.label} — ${f.diameter} mm tall, and what it swaps with`,
    f => `${f.label} — ${f.diameter} mm de diámetro y sus equivalencias`,
    f => `${f.label} — ${f.diameter} mm de diâmetro e suas equivalências`,
    f => `${f.label} 外径${f.diameter}mm — 互換サイズと速度計のずれ`,
    f => `${f.label} — ${f.diameter} mm Durchmesser und passende Alternativen`,
    f => `${f.label} — ${f.diameter} mm de diamètre et ses équivalences`,
    f => `${f.label} — व्यास ${f.diameter} मिमी और समतुल्य नाप`,
    f => `${f.label} 外径 ${f.diameter} 毫米 — 可替换规格与速度表偏差`,
    f => `${f.label} 外徑 ${f.diameter} 毫米 — 可替換規格與速度表偏差`,
  ),

  metaDesc: T<(f: TireFacts) => string>(
    f => `${f.label}은 사이드월 ${f.sidewall}mm, 외경 ${f.diameter}mm, 둘레 ${f.circumference}mm입니다. 1km에 ${f.revsPerKm}바퀴 돌고, 외경이 3% 안에 드는 호환 규격이 ${f.alternatives.length}가지 있습니다.`,
    f => `${f.label} has a ${f.sidewall} mm sidewall, a ${f.diameter} mm overall diameter and a ${f.circumference} mm circumference. It turns ${f.revsPerKm} times per kilometre, and ${f.alternatives.length} other sizes stay within 3% of it.`,
    f => `${f.label} tiene flanco de ${f.sidewall} mm, diámetro total de ${f.diameter} mm y circunferencia de ${f.circumference} mm. Da ${f.revsPerKm} vueltas por kilómetro y hay ${f.alternatives.length} medidas dentro del 3%.`,
    f => `${f.label} tem flanco de ${f.sidewall} mm, diâmetro total de ${f.diameter} mm e circunferência de ${f.circumference} mm. Dá ${f.revsPerKm} voltas por quilômetro e há ${f.alternatives.length} medidas dentro de 3%.`,
    f => `${f.label}はサイドウォール${f.sidewall}mm、外径${f.diameter}mm、円周${f.circumference}mmです。1kmで${f.revsPerKm}回転し、外径が3%以内の互換サイズが${f.alternatives.length}種あります。`,
    f => `${f.label} hat ${f.sidewall} mm Flanke, ${f.diameter} mm Außendurchmesser und ${f.circumference} mm Umfang. Er dreht sich ${f.revsPerKm}-mal pro Kilometer, und ${f.alternatives.length} weitere Größen bleiben innerhalb von 3%.`,
    f => `${f.label} a un flanc de ${f.sidewall} mm, un diamètre total de ${f.diameter} mm et une circonférence de ${f.circumference} mm. Il tourne ${f.revsPerKm} fois par kilomètre et ${f.alternatives.length} autres dimensions restent à 3% près.`,
    f => `${f.label} में साइडवॉल ${f.sidewall} मिमी, कुल व्यास ${f.diameter} मिमी और परिधि ${f.circumference} मिमी है। यह प्रति किलोमीटर ${f.revsPerKm} चक्कर लगाता है और ${f.alternatives.length} नाप 3% के भीतर हैं।`,
    f => `${f.label} 的胎侧高 ${f.sidewall} 毫米、外径 ${f.diameter} 毫米、周长 ${f.circumference} 毫米，每公里转 ${f.revsPerKm} 圈，另有 ${f.alternatives.length} 种规格的外径在 3% 以内。`,
    f => `${f.label} 的胎側高 ${f.sidewall} 毫米、外徑 ${f.diameter} 毫米、週長 ${f.circumference} 毫米，每公里轉 ${f.revsPerKm} 圈，另有 ${f.alternatives.length} 種規格的外徑在 3% 以內。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '편평비가 낮으면 뭐가 달라지나요?', a: '사이드월이 얇아져 조향이 또렷해지는 대신 노면 충격이 그대로 올라옵니다. 휠도 연석에 더 잘 다칩니다.' },
      { q: '한 치수 넓게 껴도 되나요?', a: '휠 폭이 받쳐 주고 외경이 3% 안에서 유지되면 대개 가능합니다. 다만 폭이 늘면 편평비를 낮춰야 외경이 맞습니다.' },
      { q: '외경이 달라지면 왜 속도계가 틀리나요?', a: '속도계는 바퀴가 도는 횟수를 세기 때문입니다. 타이어가 커지면 한 바퀴에 더 멀리 가는데 계기판은 그대로 세므로, 실제 속도가 표시보다 빠릅니다.' },
      { q: '앞뒤 규격이 달라도 되나요?', a: '뒷바퀴가 더 넓은 차들이 원래 그렇게 나옵니다. 다만 사륜구동은 앞뒤 외경이 어긋나면 구동계에 무리가 갑니다.' },
      { q: 'R은 무슨 뜻인가요?', a: '래디얼(radial) 구조입니다. 요즘 승용차 타이어는 사실상 전부 래디얼이라 표기가 늘 R입니다.' },
    ],
    [
      { q: 'What changes with a lower aspect ratio?', a: 'A thinner sidewall sharpens the steering but passes road shock straight through, and the wheel itself is easier to kerb.' },
      { q: 'Can I fit one size wider?', a: 'Usually yes, if the rim is wide enough and the overall diameter stays within 3%. Going wider normally means dropping the aspect ratio to keep the diameter.' },
      { q: 'Why does a different diameter upset the speedometer?', a: 'The speedometer counts wheel rotations. A taller tyre covers more ground per turn while the dial keeps counting the same, so you are actually going faster than it reads.' },
      { q: 'Can front and rear sizes differ?', a: 'Many cars leave the factory with wider rears. On four-wheel drive, though, mismatched diameters strain the drivetrain.' },
      { q: 'What does the R stand for?', a: 'Radial construction. Virtually every modern passenger tyre is radial, which is why the letter is almost always R.' },
    ],
    [
      { q: '¿Qué cambia con un perfil más bajo?', a: 'Un flanco más fino afina la dirección, pero transmite los golpes del asfalto y la llanta se daña más fácil contra el bordillo.' },
      { q: '¿Puedo montar una medida más ancha?', a: 'Normalmente sí, si la llanta lo permite y el diámetro total se mantiene dentro del 3%. Al ensanchar suele bajarse el perfil para conservar el diámetro.' },
      { q: '¿Por qué un diámetro distinto altera el velocímetro?', a: 'El velocímetro cuenta vueltas de rueda. Un neumático más alto avanza más por vuelta mientras la aguja cuenta igual, así que vas más rápido de lo que marca.' },
      { q: '¿Pueden diferir las medidas delante y detrás?', a: 'Muchos coches salen de fábrica con traseras más anchas. En tracción total, en cambio, diámetros dispares castigan la transmisión.' },
      { q: '¿Qué significa la R?', a: 'Construcción radial. Prácticamente todos los neumáticos de turismo actuales son radiales, de ahí que casi siempre aparezca la R.' },
    ],
    [
      { q: 'O que muda com um perfil mais baixo?', a: 'Um flanco mais fino deixa a direção mais precisa, mas passa os impactos do asfalto e o aro se machuca mais fácil no meio-fio.' },
      { q: 'Posso montar uma medida mais larga?', a: 'Em geral sim, se o aro permitir e o diâmetro total ficar dentro de 3%. Ao alargar, costuma-se baixar o perfil para manter o diâmetro.' },
      { q: 'Por que um diâmetro diferente altera o velocímetro?', a: 'O velocímetro conta voltas da roda. Um pneu mais alto avança mais por volta enquanto o ponteiro conta igual, então você anda mais rápido do que ele indica.' },
      { q: 'As medidas podem diferir na frente e atrás?', a: 'Muitos carros saem de fábrica com traseiros mais largos. Já na tração integral, diâmetros diferentes castigam a transmissão.' },
      { q: 'O que significa o R?', a: 'Construção radial. Praticamente todo pneu de passeio atual é radial, por isso a letra é quase sempre R.' },
    ],
    [
      { q: '扁平率が低いと何が変わりますか？', a: 'サイドウォールが薄くなり操舵が正確になる代わりに、路面の衝撃がそのまま伝わります。ホイールも縁石で傷つきやすくなります。' },
      { q: '1サイズ太くしても大丈夫ですか？', a: 'ホイール幅が足りて外径が3%以内に収まれば、たいてい可能です。太くする分は扁平率を下げて外径を合わせます。' },
      { q: 'なぜ外径が変わると速度計がずれるのですか？', a: '速度計はホイールの回転数を数えているからです。タイヤが大きいと1回転で進む距離が伸びるのに数え方は同じなので、実速は表示より速くなります。' },
      { q: '前後でサイズが違ってもよいですか？', a: '後輪が太い車はもともとそう出荷されます。ただし四輪駆動では前後の外径がずれると駆動系に負担がかかります。' },
      { q: 'Rは何を意味しますか？', a: 'ラジアル構造です。今の乗用車用タイヤはほぼすべてラジアルなので、表記はいつもRになります。' },
    ],
    [
      { q: 'Was ändert ein niedrigerer Querschnitt?', a: 'Eine dünnere Flanke schärft die Lenkung, gibt Fahrbahnstöße aber ungefiltert weiter — und die Felge nimmt am Bordstein leichter Schaden.' },
      { q: 'Darf ich eine Nummer breiter fahren?', a: 'Meist ja, wenn die Felge breit genug ist und der Außendurchmesser innerhalb von 3% bleibt. Breiter heißt in der Regel: Querschnitt senken, damit der Durchmesser stimmt.' },
      { q: 'Warum verstellt ein anderer Durchmesser den Tacho?', a: 'Der Tacho zählt Radumdrehungen. Ein höherer Reifen legt pro Umdrehung mehr Strecke zurück, gezählt wird aber gleich — du fährst schneller, als angezeigt wird.' },
      { q: 'Dürfen vorn und hinten verschiedene Größen sitzen?', a: 'Viele Autos kommen ab Werk mit breiteren Hinterreifen. Bei Allrad belasten ungleiche Durchmesser jedoch den Antriebsstrang.' },
      { q: 'Wofür steht das R?', a: 'Für Radialbauweise. Praktisch jeder heutige Pkw-Reifen ist radial, deshalb steht dort fast immer ein R.' },
    ],
    [
      { q: 'Qu’est-ce qui change avec un rapport d’aspect plus bas ?', a: 'Un flanc plus fin affûte la direction mais transmet les chocs de la route, et la jante s’abîme plus vite contre un trottoir.' },
      { q: 'Puis-je monter une taille plus large ?', a: 'En général oui, si la jante le permet et si le diamètre total reste à 3% près. Élargir suppose d’abaisser le rapport d’aspect pour conserver le diamètre.' },
      { q: 'Pourquoi un diamètre différent fausse-t-il le compteur ?', a: 'Le compteur compte les tours de roue. Un pneu plus haut parcourt plus de distance par tour alors que le comptage reste identique : vous roulez plus vite que l’affichage.' },
      { q: 'Les dimensions avant et arrière peuvent-elles différer ?', a: 'Beaucoup de voitures sortent d’usine avec des pneus arrière plus larges. En quatre roues motrices, en revanche, des diamètres inégaux fatiguent la transmission.' },
      { q: 'Que signifie le R ?', a: 'La structure radiale. Presque tous les pneus de tourisme actuels sont radiaux, d’où ce R quasi systématique.' },
    ],
    [
      { q: 'कम प्रोफ़ाइल से क्या बदलता है?', a: 'पतली साइडवॉल स्टीयरिंग को तेज़ बनाती है, पर सड़क के झटके सीधे आते हैं और व्हील किनारे से जल्दी चोट खाता है।' },
      { q: 'क्या एक नाप चौड़ा टायर लगा सकते हैं?', a: 'प्रायः हाँ, बशर्ते रिम चौड़ा हो और कुल व्यास 3% के भीतर रहे। चौड़ा करने पर प्रोफ़ाइल घटानी पड़ती है ताकि व्यास बना रहे।' },
      { q: 'व्यास बदलने से स्पीडोमीटर क्यों गड़बड़ाता है?', a: 'स्पीडोमीटर पहिये के चक्कर गिनता है। बड़ा टायर हर चक्कर में अधिक दूरी तय करता है पर गिनती वही रहती है, इसलिए असल गति दिखाई गई गति से अधिक होती है।' },
      { q: 'क्या आगे-पीछे नाप अलग हो सकते हैं?', a: 'कई गाड़ियाँ फ़ैक्टरी से ही पीछे चौड़े टायर के साथ आती हैं। पर फ़ोर-व्हील ड्राइव में असमान व्यास ड्राइवट्रेन पर ज़ोर डालता है।' },
      { q: 'R का क्या अर्थ है?', a: 'रेडियल संरचना। आज लगभग हर कार टायर रेडियल है, इसीलिए वहाँ हमेशा R लिखा मिलता है।' },
    ],
    [
      { q: '扁平比更低会有什么变化？', a: '胎侧变薄，转向更清晰，但路面冲击直接传上来，轮辋也更容易被路缘磕伤。' },
      { q: '可以换宽一号吗？', a: '一般可以，只要轮辋够宽、外径保持在 3% 以内。加宽通常要同时降低扁平比，才能保住外径。' },
      { q: '外径变了为什么速度表会不准？', a: '速度表数的是车轮转数。轮胎变大后每转一圈走得更远，而计数方式不变，所以实际速度比表显更快。' },
      { q: '前后规格可以不同吗？', a: '不少车出厂时后轮就更宽。但四驱车前后外径不一致会让传动系统吃力。' },
      { q: 'R 是什么意思？', a: '子午线（radial）结构。现在的乘用车轮胎几乎全是子午线胎，所以这里几乎总是 R。' },
    ],
    [
      { q: '扁平比更低會有什麼變化？', a: '胎側變薄，轉向更清晰，但路面衝擊直接傳上來，輪圈也更容易被路緣磕傷。' },
      { q: '可以換寬一號嗎？', a: '一般可以，只要輪圈夠寬、外徑保持在 3% 以內。加寬通常要同時降低扁平比，才能保住外徑。' },
      { q: '外徑變了為什麼速度表會不準？', a: '速度表數的是車輪轉數。輪胎變大後每轉一圈走得更遠，而計數方式不變，所以實際速度比表顯更快。' },
      { q: '前後規格可以不同嗎？', a: '不少車出廠時後輪就更寬。但四驅車前後外徑不一致會讓傳動系統吃力。' },
      { q: 'R 是什麼意思？', a: '子午線（radial）結構。現在的乘用車輪胎幾乎全是子午線胎，所以這裡幾乎總是 R。' },
    ],
  ),

  tireFaq: T<(f: TireFacts) => FaqItem[]>(
    f => [
      { q: `${f.label}의 외경은 얼마인가요?`, a: `${f.diameter}mm입니다. 휠 ${f.rimMm}mm에 사이드월 ${f.sidewall}mm를 위아래로 더한 값입니다.` },
      { q: `${f.label}은 1km에 몇 바퀴 도나요?`, a: `둘레가 ${f.circumference}mm라 ${f.revsPerKm}바퀴 돕니다.` },
      { q: `대신 낄 수 있는 규격이 있나요?`, a: f.alternatives.length ? `외경이 3% 안에 드는 규격이 ${f.alternatives.length}가지 있습니다 — 가장 가까운 것은 ${f.alternatives[0].label}(${f.alternatives[0].diameter}mm)입니다.` : `이 표 안에는 없습니다.` },
      { q: `사이드월이 ${f.sidewall}mm인 이유는요?`, a: `폭 ${f.tire.width}mm의 ${f.tire.aspect}%이기 때문입니다. 편평비는 길이가 아니라 폭에 대한 비율입니다.` },
    ],
    f => [
      { q: `What is the overall diameter of ${f.label}?`, a: `${f.diameter} mm — the ${f.rimMm} mm wheel plus the ${f.sidewall} mm sidewall at top and bottom.` },
      { q: `How many turns per kilometre does ${f.label} make?`, a: `Its circumference is ${f.circumference} mm, so ${f.revsPerKm} turns.` },
      { q: `What can I swap it for?`, a: f.alternatives.length ? `${f.alternatives.length} sizes stay within 3% of its diameter — the closest is ${f.alternatives[0].label} at ${f.alternatives[0].diameter} mm.` : `Nothing in this table comes close enough.` },
      { q: `Why is the sidewall ${f.sidewall} mm?`, a: `Because it is ${f.tire.aspect}% of the ${f.tire.width} mm width. The aspect ratio is a proportion of the width, not a length.` },
    ],
    f => [
      { q: `¿Cuál es el diámetro total de ${f.label}?`, a: `${f.diameter} mm: la llanta de ${f.rimMm} mm más el flanco de ${f.sidewall} mm arriba y abajo.` },
      { q: `¿Cuántas vueltas por kilómetro da ${f.label}?`, a: `Su circunferencia es de ${f.circumference} mm, así que ${f.revsPerKm} vueltas.` },
      { q: `¿Por cuál puedo cambiarlo?`, a: f.alternatives.length ? `${f.alternatives.length} medidas quedan dentro del 3% de su diámetro; la más cercana es ${f.alternatives[0].label}, de ${f.alternatives[0].diameter} mm.` : `Ninguna medida de esta tabla se acerca lo suficiente.` },
      { q: `¿Por qué el flanco mide ${f.sidewall} mm?`, a: `Porque es el ${f.tire.aspect}% de los ${f.tire.width} mm de ancho. El perfil es una proporción del ancho, no una longitud.` },
    ],
    f => [
      { q: `Qual é o diâmetro total de ${f.label}?`, a: `${f.diameter} mm: o aro de ${f.rimMm} mm mais o flanco de ${f.sidewall} mm em cima e embaixo.` },
      { q: `Quantas voltas por quilômetro ${f.label} dá?`, a: `A circunferência é de ${f.circumference} mm, portanto ${f.revsPerKm} voltas.` },
      { q: `Por qual medida posso trocar?`, a: f.alternatives.length ? `${f.alternatives.length} medidas ficam dentro de 3% do diâmetro; a mais próxima é ${f.alternatives[0].label}, com ${f.alternatives[0].diameter} mm.` : `Nenhuma medida desta tabela chega perto o bastante.` },
      { q: `Por que o flanco tem ${f.sidewall} mm?`, a: `Porque é ${f.tire.aspect}% dos ${f.tire.width} mm de largura. O perfil é uma proporção da largura, não um comprimento.` },
    ],
    f => [
      { q: `${f.label}の外径はいくつですか？`, a: `${f.diameter}mmです。ホイール${f.rimMm}mmにサイドウォール${f.sidewall}mmを上下で足した値です。` },
      { q: `${f.label}は1kmで何回転しますか？`, a: `円周が${f.circumference}mmなので${f.revsPerKm}回転します。` },
      { q: `代わりに履けるサイズはありますか？`, a: f.alternatives.length ? `外径が3%以内のサイズが${f.alternatives.length}種あります。一番近いのは${f.alternatives[0].label}（${f.alternatives[0].diameter}mm）です。` : `この表の中にはありません。` },
      { q: `サイドウォールが${f.sidewall}mmになる理由は？`, a: `幅${f.tire.width}mmの${f.tire.aspect}%だからです。扁平率は長さではなく幅に対する割合です。` },
    ],
    f => [
      { q: `Wie groß ist der Außendurchmesser von ${f.label}?`, a: `${f.diameter} mm — die ${f.rimMm} mm Felge plus ${f.sidewall} mm Flanke oben und unten.` },
      { q: `Wie oft dreht sich ${f.label} pro Kilometer?`, a: `Der Umfang beträgt ${f.circumference} mm, also ${f.revsPerKm} Umdrehungen.` },
      { q: `Wogegen kann ich tauschen?`, a: f.alternatives.length ? `${f.alternatives.length} Größen bleiben innerhalb von 3% des Durchmessers — am nächsten liegt ${f.alternatives[0].label} mit ${f.alternatives[0].diameter} mm.` : `In dieser Tabelle kommt nichts nah genug heran.` },
      { q: `Warum ist die Flanke ${f.sidewall} mm hoch?`, a: `Weil sie ${f.tire.aspect}% der Breite von ${f.tire.width} mm ausmacht. Der Querschnitt ist ein Anteil der Breite, keine Länge.` },
    ],
    f => [
      { q: `Quel est le diamètre total de ${f.label} ?`, a: `${f.diameter} mm : la jante de ${f.rimMm} mm plus le flanc de ${f.sidewall} mm en haut et en bas.` },
      { q: `Combien de tours par kilomètre fait ${f.label} ?`, a: `Sa circonférence est de ${f.circumference} mm, soit ${f.revsPerKm} tours.` },
      { q: `Par quoi puis-je le remplacer ?`, a: f.alternatives.length ? `${f.alternatives.length} dimensions restent à 3% près du diamètre ; la plus proche est ${f.alternatives[0].label} (${f.alternatives[0].diameter} mm).` : `Rien dans ce tableau n’en approche assez.` },
      { q: `Pourquoi le flanc fait-il ${f.sidewall} mm ?`, a: `Parce qu’il vaut ${f.tire.aspect}% des ${f.tire.width} mm de largeur. Le rapport d’aspect est une proportion de la largeur, pas une longueur.` },
    ],
    f => [
      { q: `${f.label} का कुल व्यास कितना है?`, a: `${f.diameter} मिमी — ${f.rimMm} मिमी व्हील में ऊपर-नीचे ${f.sidewall} मिमी साइडवॉल जोड़कर।` },
      { q: `${f.label} प्रति किलोमीटर कितने चक्कर लगाता है?`, a: `परिधि ${f.circumference} मिमी है, इसलिए ${f.revsPerKm} चक्कर।` },
      { q: `इसकी जगह कौन-सा नाप लगेगा?`, a: f.alternatives.length ? `${f.alternatives.length} नाप व्यास के 3% भीतर हैं — सबसे नज़दीक ${f.alternatives[0].label} (${f.alternatives[0].diameter} मिमी)।` : `इस तालिका में कोई पर्याप्त नज़दीक नहीं है।` },
      { q: `साइडवॉल ${f.sidewall} मिमी क्यों है?`, a: `क्योंकि यह ${f.tire.width} मिमी चौड़ाई का ${f.tire.aspect}% है। आस्पेक्ट रेशियो लंबाई नहीं, चौड़ाई का अनुपात है।` },
    ],
    f => [
      { q: `${f.label} 的外径是多少？`, a: `${f.diameter} 毫米——${f.rimMm} 毫米轮辋加上下各 ${f.sidewall} 毫米胎侧。` },
      { q: `${f.label} 每公里转多少圈？`, a: `周长为 ${f.circumference} 毫米，因此转 ${f.revsPerKm} 圈。` },
      { q: `可以换成哪些规格？`, a: f.alternatives.length ? `有 ${f.alternatives.length} 种规格的外径在 3% 以内，最接近的是 ${f.alternatives[0].label}（${f.alternatives[0].diameter} 毫米）。` : `本表中没有足够接近的规格。` },
      { q: `胎侧为什么是 ${f.sidewall} 毫米？`, a: `因为它是胎宽 ${f.tire.width} 毫米的 ${f.tire.aspect}%。扁平比是相对胎宽的比例，不是长度。` },
    ],
    f => [
      { q: `${f.label} 的外徑是多少？`, a: `${f.diameter} 毫米——${f.rimMm} 毫米輪圈加上下各 ${f.sidewall} 毫米胎側。` },
      { q: `${f.label} 每公里轉多少圈？`, a: `週長為 ${f.circumference} 毫米，因此轉 ${f.revsPerKm} 圈。` },
      { q: `可以換成哪些規格？`, a: f.alternatives.length ? `有 ${f.alternatives.length} 種規格的外徑在 3% 以內，最接近的是 ${f.alternatives[0].label}（${f.alternatives[0].diameter} 毫米）。` : `本表中沒有足夠接近的規格。` },
      { q: `胎側為什麼是 ${f.sidewall} 毫米？`, a: `因為它是胎寬 ${f.tire.width} 毫米的 ${f.tire.aspect}%。扁平比是相對胎寬的比例，不是長度。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const TIRE_UI: L<TireUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<TireUI>;
