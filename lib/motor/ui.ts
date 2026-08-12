/**
 * 모터 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "출력·토크·회전수는 셋 중 둘이면 나머지가 정해진다"이다.
 * P = T × ω이고 ω = 2π n ÷ 60이므로, 널리 쓰는 T = 9550 × P(kW) ÷ n의 9550도
 * 60000 ÷ 2π를 올려 적은 값일 뿐이다.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(11,7N·m · 2,2kW). 표와 본문이 어긋나면 같은
 * 값이 한 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면
 * 컴포넌트는 fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 회전수 1800·주파수
 * 60처럼 자리 구분이 필요할 만한 수에는 구분 기호를 아예 넣지 않는다(독일어는
 * 자리 구분에 점을 쓰므로 넣으면 소수점과 헷갈린다). 60000도 그래서 그대로 적는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { MotorFacts } from './facts.ts';
import type { Cell } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface MotorUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  powerLabel: string;
  rpmLabel: string;
  polesLabel: string;
  hzLabel: string;
  omegaLabel: string;
  torqueLabel: string;
  kgfmLabel: string;
  lbftLabel: string;
  psLabel: string;
  hpLabel: string;
  fullRpmLabel: string;
  ratioLabel: string;
  currentLabel: string;

  formulaTitle: string;
  formulaNote: string;
  hpTitle: string;
  hpNote: string;
  hzTitle: string;
  hzNote: string;
  gearTitle: string;
  gearNote: string;
  currentTitle: string;
  currentNote: string;

  tableTitle: string;
  pairTitle: string;
  gearTableTitle: string;
  currentTableTitle: string;
  neighbourTitle: string;
  powerRowTitle: string;
  speedRowTitle: string;
  linkTitle: string;
  torqueLink: string;
  ampereLink: string;

  desc: (f: MotorFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: MotorFacts) => string;
  metaDesc: (f: MotorFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: MotorFacts) => FaqItem[];
}

/** 소수점에 쉼표를 쓰는 언어 */
const COMMA_LANGS: ReadonlySet<Lang> = new Set<Lang>(['es', 'pt', 'de', 'fr']);

/** 화면 컴포넌트가 쓰는 자리 — 문장 쪽의 nc()와 같은 규칙이다 */
export const fmtNum = (lang: Lang, x: number): string =>
  COMMA_LANGS.has(lang) ? String(x).replace('.', ',') : String(x);

/** 쉼표 언어의 문장 안에서 쓴다 */
const nc = (x: number): string => String(x).replace('.', ',');

/**
 * 칸 이름 — "2.2kW 1800rpm".
 *
 * 출력에 소수점이 들어가므로 이름조차 언어를 가린다. rebar의 D13처럼 열 언어가
 * 같은 글자를 쓰는 이름이 아니어서, 이름을 만드는 자리도 fmtNum을 지나게 둔다.
 */
export const cellName = (lang: Lang, c: Cell): string => `${fmtNum(lang, c.kw)}kW ${c.rpm}rpm`;

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 문장 여러 곳에서 같은 이름을 쓴다 — 쉼표 언어용 */
const cm = (f: MotorFacts): string => `${nc(f.cell.kw)}kW ${f.cell.rpm}rpm`;
/** 점을 쓰는 언어용 */
const dot = (f: MotorFacts): string => `${f.cell.kw}kW ${f.cell.rpm}rpm`;

type Spec = { [K in keyof MotorUI]: L<MotorUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T('모터 토크', 'Motor torque', 'Par del motor', 'Torque do motor', 'モーターのトルク', 'Motordrehmoment', 'Couple moteur', 'मोटर टॉर्क', '电机扭矩', '馬達扭矩'),

  hubTitle: T(
    '모터 136칸 — 2.2kW 1800rpm은 11.7N·m',
    '136 motor cells — 2.2 kW at 1800 rpm is 11.7 N·m',
    '136 casillas de motor — 2,2 kW a 1800 rpm son 11,7 N·m',
    '136 casos de motor — 2,2 kW a 1800 rpm dão 11,7 N·m',
    'モーター136マス — 2.2kW 1800rpmは11.7N·m',
    '136 Motorfelder — 2,2 kW bei 1800 rpm sind 11,7 N·m',
    '136 cases de moteur — 2,2 kW à 1800 tr/min font 11,7 N·m',
    'मोटर के 136 खाने — 1800 rpm पर 2.2 kW यानी 11.7 N·m',
    '电机 136 格 — 2.2kW 1800rpm 是 11.7N·m',
    '馬達 136 格 — 2.2kW 1800rpm 是 11.7N·m',
  ),

  hubLead: T(
    '정격 출력 17가지와 동기속도 8가지가 만나는 칸마다 토크를 계산했습니다. 표를 외울 일이 아닙니다 — 출력은 토크와 각속도의 곱이므로, 출력을 각속도로 나누면 토크가 나옵니다. 널리 쓰는 9550 계수도 60000을 2π로 나눈 값입니다.',
    'Every pairing of 17 rated outputs and 8 synchronous speeds, worked out as newton metres. There is no table to memorise — power is torque times angular velocity, so dividing power by angular velocity gives torque. The familiar 9550 factor is just 60000 divided by 2π.',
    'Cada cruce de 17 potencias nominales y 8 velocidades sincrónicas, resuelto en newton metro. No hay tabla que memorizar: la potencia es par por velocidad angular, así que dividir la potencia entre la velocidad angular da el par. El conocido factor 9550 es solo 60000 dividido entre 2π.',
    'Cada cruzamento de 17 potências nominais e 8 rotações sincronizadas, resolvido em newton metro. Não há tabela para decorar: potência é torque vezes velocidade angular, então dividir a potência pela velocidade angular dá o torque. O famoso fator 9550 é apenas 60000 dividido por 2π.',
    '定格出力17種と同期速度8種が交わるマスごとにトルクを計算しました。表を覚える話ではありません — 出力はトルクと角速度の積なので、出力を角速度で割ればトルクです。よく使う9550の係数も60000を2πで割った値です。',
    'Jede Paarung aus 17 Nennleistungen und 8 Synchrondrehzahlen, ausgerechnet in Newtonmeter. Es gibt keine Tabelle zu lernen — Leistung ist Drehmoment mal Winkelgeschwindigkeit, also ergibt Leistung geteilt durch Winkelgeschwindigkeit das Drehmoment. Der bekannte Faktor 9550 ist nur 60000 geteilt durch 2π.',
    'Chaque croisement de 17 puissances nominales et 8 vitesses de synchronisme, résolu en newtons-mètres. Aucune table à retenir : la puissance est le couple multiplié par la vitesse angulaire, donc la puissance divisée par la vitesse angulaire donne le couple. Le fameux facteur 9550 n’est que 60000 divisé par 2π.',
    '17 रेटेड आउटपुट और 8 समकालिक गतियों के हर जोड़ का टॉर्क निकाला गया है। कोई तालिका याद करने की ज़रूरत नहीं — शक्ति टॉर्क गुणा कोणीय वेग है, इसलिए शक्ति को कोणीय वेग से भाग देने पर टॉर्क मिलता है। चर्चित 9550 गुणक भी 60000 को 2π से भाग देने पर आता है।',
    '17 种额定功率与 8 种同步转速相交的每一格，都算出了扭矩。这不是背表的事 — 功率是扭矩乘角速度，所以功率除以角速度就是扭矩。常用的 9550 系数也只是 60000 除以 2π。',
    '17 種額定功率與 8 種同步轉速相交的每一格，都算出了扭矩。這不是背表的事 — 功率是扭矩乘角速度，所以功率除以角速度就是扭矩。常用的 9550 係數也只是 60000 除以 2π。',
  ),

  powerLabel: T('정격 출력', 'Rated output', 'Potencia nominal', 'Potência nominal', '定格出力', 'Nennleistung', 'Puissance nominale', 'रेटेड आउटपुट', '额定功率', '額定功率'),
  rpmLabel: T('동기속도', 'Synchronous speed', 'Velocidad sincrónica', 'Rotação sincronizada', '同期速度', 'Synchrondrehzahl', 'Vitesse de synchronisme', 'समकालिक गति', '同步转速', '同步轉速'),
  polesLabel: T('극수', 'Poles', 'Polos', 'Polos', '極数', 'Polzahl', 'Nombre de pôles', 'ध्रुव', '极数', '極數'),
  hzLabel: T('주파수', 'Mains frequency', 'Frecuencia de red', 'Frequência da rede', '周波数', 'Netzfrequenz', 'Fréquence du réseau', 'आवृत्ति', '电源频率', '電源頻率'),
  omegaLabel: T('각속도', 'Angular velocity', 'Velocidad angular', 'Velocidade angular', '角速度', 'Winkelgeschwindigkeit', 'Vitesse angulaire', 'कोणीय वेग', '角速度', '角速度'),
  torqueLabel: T('토크', 'Torque', 'Par', 'Torque', 'トルク', 'Drehmoment', 'Couple', 'टॉर्क', '扭矩', '扭矩'),
  kgfmLabel: T('토크(kgf·m)', 'Torque in kgf·m', 'Par en kgf·m', 'Torque em kgf·m', 'トルク(kgf·m)', 'Drehmoment in kgf·m', 'Couple en kgf·m', 'टॉर्क (kgf·m)', '扭矩（kgf·m）', '扭矩（kgf·m）'),
  lbftLabel: T('토크(lb·ft)', 'Torque in lb·ft', 'Par en lb·ft', 'Torque em lb·ft', 'トルク(lb·ft)', 'Drehmoment in lb·ft', 'Couple en lb·ft', 'टॉर्क (lb·ft)', '扭矩（lb·ft）', '扭矩（lb·ft）'),
  psLabel: T('미터법 마력(PS)', 'Metric horsepower (PS)', 'Caballos métricos (PS)', 'Cavalos métricos (PS)', '仏馬力(PS)', 'Metrische PS', 'Chevaux métriques (ch)', 'मीट्रिक अश्वशक्ति (PS)', '公制马力（PS）', '公制馬力（PS）'),
  hpLabel: T('영국 마력(HP)', 'Mechanical horsepower (hp)', 'Caballos británicos (hp)', 'Cavalos britânicos (hp)', '英馬力(HP)', 'Mechanische Horsepower (hp)', 'Chevaux britanniques (hp)', 'ब्रिटिश अश्वशक्ति (hp)', '英制马力（hp）', '英制馬力（hp）'),
  fullRpmLabel: T('전부하 회전수', 'Full-load speed', 'Velocidad a plena carga', 'Rotação a plena carga', '全負荷回転数', 'Volllastdrehzahl', 'Vitesse à pleine charge', 'पूर्ण भार गति', '满载转速', '滿載轉速'),
  ratioLabel: T('감속비', 'Gear ratio', 'Relación de reducción', 'Relação de redução', '減速比', 'Übersetzung', 'Rapport de réduction', 'गियर अनुपात', '减速比', '減速比'),
  currentLabel: T('3상 전류', 'Three-phase current', 'Corriente trifásica', 'Corrente trifásica', '三相電流', 'Drehstrom', 'Courant triphasé', 'तीन-फ़ेज़ करंट', '三相电流', '三相電流'),

  formulaTitle: T('토크는 출력을 각속도로 나눈 값이다', 'Torque is power divided by angular velocity', 'El par es la potencia dividida entre la velocidad angular', 'O torque é a potência dividida pela velocidade angular', 'トルクは出力を角速度で割った値', 'Drehmoment ist Leistung durch Winkelgeschwindigkeit', 'Le couple est la puissance divisée par la vitesse angulaire', 'टॉर्क शक्ति को कोणीय वेग से भाग देने पर मिलता है', '扭矩就是功率除以角速度', '扭矩就是功率除以角速度'),
  formulaNote: T(
    '회전하는 축이 내는 출력은 토크와 각속도의 곱입니다. 각속도는 회전수를 초당 라디안으로 옮긴 값이라 ω = 2π × n ÷ 60이고, 따라서 토크는 P × 60 ÷ (2π × n)입니다. 카탈로그가 쓰는 T = 9550 × P(kW) ÷ n(rpm)이 바로 이 식이며, 9550은 60000 ÷ 2π = 9549.3을 올려 적은 값입니다. 계수를 외우는 대신 어디서 나온 것인지 알면 단위가 섞여도 헤매지 않습니다.',
    'The output of a turning shaft is torque times angular velocity. Angular velocity is the speed expressed in radians per second, ω = 2π × n ÷ 60, so torque is P × 60 ÷ (2π × n). The catalogue shortcut T = 9550 × P(kW) ÷ n(rpm) is exactly that formula, and 9550 is 60000 ÷ 2π = 9549.3 rounded up. Knowing where the number came from beats memorising it: mixed units stop being a trap.',
    'La potencia de un eje que gira es el par por la velocidad angular. La velocidad angular es el giro en radianes por segundo, ω = 2π × n ÷ 60, así que el par es P × 60 ÷ (2π × n). El atajo de catálogo T = 9550 × P(kW) ÷ n(rpm) es esa misma fórmula, y 9550 es 60000 ÷ 2π = 9549,3 redondeado al alza. Saber de dónde sale el número vale más que memorizarlo: las unidades mezcladas dejan de ser una trampa.',
    'A potência de um eixo que gira é o torque vezes a velocidade angular. A velocidade angular é a rotação em radianos por segundo, ω = 2π × n ÷ 60, então o torque é P × 60 ÷ (2π × n). O atalho de catálogo T = 9550 × P(kW) ÷ n(rpm) é essa mesma fórmula, e 9550 é 60000 ÷ 2π = 9549,3 arredondado para cima. Saber de onde vem o número vale mais que decorá-lo: unidades misturadas deixam de ser armadilha.',
    '回転する軸が出す出力は、トルクと角速度の積です。角速度は回転数を毎秒ラジアンに直した値なのでω = 2π × n ÷ 60であり、したがってトルクはP × 60 ÷ (2π × n)です。カタログのT = 9550 × P(kW) ÷ n(rpm)がまさにこの式で、9550は60000 ÷ 2π = 9549.3を切り上げた値です。係数を覚えるより出どころを知っておけば、単位が混ざっても迷いません。',
    'Die Leistung einer drehenden Welle ist Drehmoment mal Winkelgeschwindigkeit. Die Winkelgeschwindigkeit ist die Drehzahl in Radiant je Sekunde, ω = 2π × n ÷ 60, also ist das Drehmoment P × 60 ÷ (2π × n). Die Katalogformel T = 9550 × P(kW) ÷ n(rpm) ist genau das, und 9550 ist 60000 ÷ 2π = 9549,3 aufgerundet. Die Herkunft der Zahl zu kennen ist mehr wert als sie zu lernen — gemischte Einheiten werden dann harmlos.',
    'La puissance d’un arbre en rotation est le couple multiplié par la vitesse angulaire. La vitesse angulaire est la fréquence de rotation en radians par seconde, ω = 2π × n ÷ 60, donc le couple vaut P × 60 ÷ (2π × n). Le raccourci de catalogue T = 9550 × P(kW) ÷ n(tr/min) est exactement cette formule, et 9550 est 60000 ÷ 2π = 9549,3 arrondi au-dessus. Savoir d’où vient le nombre vaut mieux que de l’apprendre : les unités mélangées cessent d’être un piège.',
    'घूमते शाफ़्ट की शक्ति टॉर्क गुणा कोणीय वेग है। कोणीय वेग गति को प्रति सेकंड रेडियन में बदला रूप है, ω = 2π × n ÷ 60, इसलिए टॉर्क P × 60 ÷ (2π × n) है। कैटलॉग वाला T = 9550 × P(kW) ÷ n(rpm) यही सूत्र है, और 9550 दरअसल 60000 ÷ 2π = 9549.3 को ऊपर पूर्णांकित किया गया है। गुणक रटने से बेहतर है यह जानना कि वह कहाँ से आया — फिर मिली-जुली इकाइयाँ नहीं उलझातीं।',
    '旋转轴输出的功率等于扭矩乘角速度。角速度是把转速换成每秒弧度，ω = 2π × n ÷ 60，所以扭矩就是 P × 60 ÷ (2π × n)。样本上写的 T = 9550 × P(kW) ÷ n(rpm) 正是这个式子，9550 是 60000 ÷ 2π = 9549.3 向上取整的结果。与其背系数，不如知道它从哪来 — 单位混着也不会绕晕。',
    '旋轉軸輸出的功率等於扭矩乘角速度。角速度是把轉速換成每秒弧度，ω = 2π × n ÷ 60，所以扭矩就是 P × 60 ÷ (2π × n)。樣本上寫的 T = 9550 × P(kW) ÷ n(rpm) 正是這個式子，9550 是 60000 ÷ 2π = 9549.3 向上取整的結果。與其背係數，不如知道它從哪來 — 單位混著也不會繞暈。',
  ),

  hpTitle: T('마력은 두 가지고 값이 다르다', 'There are two horsepowers and they differ', 'Hay dos caballos de vapor y no valen lo mismo', 'Há dois cavalos-vapor e eles diferem', '馬力は二種類あり値が違う', 'Es gibt zwei Pferdestärken, und sie sind verschieden', 'Il existe deux chevaux, et ils diffèrent', 'अश्वशक्ति दो तरह की है और दोनों बराबर नहीं', '马力有两种，数值不一样', '馬力有兩種，數值不一樣'),
  hpNote: T(
    '미터법 마력(PS)은 735.49875W이고 영국 마력(HP)은 745.699872W입니다. 1.4% 차이라 작아 보이지만, 75kW 모터는 PS로 102마력이고 HP로 101마력입니다 — 규격을 견줄 때 두 값을 섞으면 한 단 위아래를 잘못 고릅니다. 독일·일본·한국 카탈로그는 PS를, 북미는 HP를 씁니다. 어느 쪽이든 kW로 옮겨 놓고 견주는 것이 안전합니다.',
    'Metric horsepower (PS) is 735.49875 W and mechanical horsepower (hp) is 745.699872 W. The 1.4 % gap looks small, but a 75 kW motor is 102 PS and 101 hp — mix the two while comparing catalogues and you pick the wrong frame size. German, Japanese and Korean data sheets use PS, North America uses hp. Converting both to kilowatts before comparing is the safe move.',
    'El caballo métrico (PS) vale 735,49875 W y el caballo británico (hp) 745,699872 W. La diferencia del 1,4 % parece pequeña, pero un motor de 75 kW son 102 PS y 101 hp: si mezclas ambos al comparar catálogos, eliges un tamaño equivocado. Las fichas alemanas, japonesas y coreanas usan PS; Norteamérica usa hp. Pasar todo a kilovatios antes de comparar es lo seguro.',
    'O cavalo métrico (PS) vale 735,49875 W e o cavalo britânico (hp) 745,699872 W. A diferença de 1,4 % parece pequena, mas um motor de 75 kW dá 102 PS e 101 hp: misturar os dois ao comparar catálogos leva a escolher a carcaça errada. Catálogos alemães, japoneses e coreanos usam PS; a América do Norte usa hp. Passar tudo para quilowatts antes de comparar é o caminho seguro.',
    '仏馬力(PS)は735.49875W、英馬力(HP)は745.699872Wです。1.4%の差なので小さく見えますが、75kWのモーターはPSで102馬力、HPで101馬力です — 規格を見比べるときに二つを混ぜると、一段上か下を選んでしまいます。ドイツ・日本・韓国のカタログはPSを、北米はHPを使います。どちらであれkWに直してから比べるのが安全です。',
    'Die metrische PS beträgt 735,49875 W, die mechanische Horsepower 745,699872 W. Die Lücke von 1,4 % sieht klein aus, doch ein 75-kW-Motor hat 102 PS und 101 hp — mischt man beides beim Vergleich, greift man zur falschen Baugröße. Deutsche, japanische und koreanische Datenblätter nennen PS, Nordamerika nennt hp. Vor dem Vergleich alles in Kilowatt umzurechnen ist der sichere Weg.',
    'Le cheval métrique (ch) vaut 735,49875 W et le cheval britannique (hp) 745,699872 W. L’écart de 1,4 % paraît minime, mais un moteur de 75 kW fait 102 ch et 101 hp : mélanger les deux en comparant des catalogues conduit à choisir la mauvaise taille. Les fiches allemandes, japonaises et coréennes donnent des ch, l’Amérique du Nord des hp. Tout convertir en kilowatts avant de comparer est la voie sûre.',
    'मीट्रिक अश्वशक्ति (PS) 735.49875 W है और ब्रिटिश अश्वशक्ति (hp) 745.699872 W। 1.4% का अंतर छोटा लगता है, पर 75 kW की मोटर 102 PS और 101 hp होती है — कैटलॉग मिलाते समय दोनों को एक मान लें तो ग़लत फ़्रेम चुन जाते हैं। जर्मन, जापानी और कोरियाई शीट PS लिखती हैं, उत्तर अमेरिका hp। तुलना से पहले सब कुछ किलोवाट में बदल लेना सुरक्षित है।',
    '公制马力（PS）是 735.49875W，英制马力（hp）是 745.699872W。1.4% 的差看着不大，但 75kW 的电机按 PS 是 102 马力，按 hp 是 101 马力 — 比样本时把两者混着用，就会选错一档机座。德国、日本、韩国的样本写 PS，北美写 hp。比之前先全换成千瓦最稳。',
    '公制馬力（PS）是 735.49875W，英制馬力（hp）是 745.699872W。1.4% 的差看著不大，但 75kW 的馬達按 PS 是 102 馬力，按 hp 是 101 馬力 — 比樣本時把兩者混著用，就會選錯一檔機座。德國、日本、韓國的樣本寫 PS，北美寫 hp。比之前先全換成千瓦最穩。',
  ),

  hzTitle: T('회전수는 극수와 주파수가 정한다', 'Poles and mains frequency fix the speed', 'Los polos y la frecuencia fijan la velocidad', 'Os polos e a frequência fixam a rotação', '回転数は極数と周波数が決める', 'Polzahl und Netzfrequenz legen die Drehzahl fest', 'Le nombre de pôles et la fréquence fixent la vitesse', 'गति ध्रुवों और आवृत्ति से तय होती है', '转速由极数和电源频率决定', '轉速由極數和電源頻率決定'),
  hzNote: T(
    '유도전동기의 동기속도는 고를 수 있는 값이 아니라 120 × 주파수 ÷ 극수로 정해집니다. 그래서 같은 4극 모터가 60Hz에서는 1800rpm, 50Hz에서는 1500rpm으로 돕니다 — 한국·미국·일본 동부는 60Hz, 유럽·중국·인도는 50Hz입니다. 출력이 같은데 회전수가 6대 5로 다르니 토크도 5대 6으로 뒤집힙니다. 실제로는 슬립만큼 뒤처져 명판에는 1746rpm처럼 적힙니다.',
    'The synchronous speed of an induction motor is not a choice: it is 120 × frequency ÷ poles. The same four-pole motor therefore turns at 1800 rpm on 60 Hz and 1500 rpm on 50 Hz — Korea, the United States and eastern Japan run 60 Hz, while Europe, China and India run 50 Hz. Same power, speeds in a 6 : 5 ratio, so the torques land in a 5 : 6 ratio. In service the rotor lags by the slip, which is why the nameplate reads something like 1746 rpm.',
    'La velocidad sincrónica de un motor de inducción no se elige: es 120 × frecuencia ÷ polos. El mismo motor de cuatro polos gira a 1800 rpm con 60 Hz y a 1500 rpm con 50 Hz — Corea, Estados Unidos y el este de Japón trabajan a 60 Hz, mientras Europa, China e India van a 50 Hz. Misma potencia, velocidades en relación 6 : 5, así que los pares quedan en relación 5 : 6. En servicio el rotor se retrasa por el deslizamiento, y por eso la placa indica algo como 1746 rpm.',
    'A rotação sincronizada de um motor de indução não é escolhida: é 120 × frequência ÷ polos. O mesmo motor de quatro polos gira a 1800 rpm em 60 Hz e a 1500 rpm em 50 Hz — Coreia, Estados Unidos e leste do Japão operam em 60 Hz, enquanto Europa, China e Índia usam 50 Hz. Mesma potência, rotações na razão 6 : 5, então os torques ficam na razão 5 : 6. Na prática o rotor atrasa pelo escorregamento, e por isso a placa mostra algo como 1746 rpm.',
    '誘導電動機の同期速度は選べる値ではなく、120 × 周波数 ÷ 極数で決まります。ですから同じ4極モーターが60Hzでは1800rpm、50Hzでは1500rpmで回ります — 韓国・米国・東日本は60Hz、欧州・中国・インドは50Hzです。出力が同じでも回転数が6対5で違うので、トルクは5対6に入れ替わります。実際にはすべりだけ遅れるため、銘板には1746rpmのように書かれます。',
    'Die Synchrondrehzahl eines Asynchronmotors ist keine Wahl, sondern 120 × Frequenz ÷ Polzahl. Derselbe vierpolige Motor dreht daher bei 60 Hz mit 1800 rpm und bei 50 Hz mit 1500 rpm — Korea, die USA und Ostjapan fahren 60 Hz, Europa, China und Indien 50 Hz. Gleiche Leistung, Drehzahlen im Verhältnis 6 : 5, also Drehmomente im Verhältnis 5 : 6. Im Betrieb bleibt der Läufer um den Schlupf zurück, weshalb das Typenschild etwa 1746 rpm nennt.',
    'La vitesse de synchronisme d’un moteur asynchrone ne se choisit pas : elle vaut 120 × fréquence ÷ nombre de pôles. Le même moteur à quatre pôles tourne donc à 1800 tr/min en 60 Hz et à 1500 tr/min en 50 Hz — la Corée, les États-Unis et l’est du Japon sont en 60 Hz, l’Europe, la Chine et l’Inde en 50 Hz. Même puissance, vitesses dans un rapport 6 : 5, donc couples dans un rapport 5 : 6. En service le rotor retarde du glissement, d’où une plaque qui indique par exemple 1746 tr/min.',
    'इंडक्शन मोटर की समकालिक गति चुनी नहीं जाती — वह 120 × आवृत्ति ÷ ध्रुव है। इसलिए वही चार-ध्रुव मोटर 60 Hz पर 1800 rpm और 50 Hz पर 1500 rpm घूमती है — कोरिया, अमेरिका और पूर्वी जापान 60 Hz पर चलते हैं, यूरोप, चीन और भारत 50 Hz पर। शक्ति वही, गति 6 : 5 के अनुपात में, तो टॉर्क 5 : 6 के अनुपात में पलट जाता है। चलते समय रोटर स्लिप जितना पीछे रहता है, इसीलिए नेमप्लेट पर 1746 rpm जैसा लिखा मिलता है।',
    '异步电机的同步转速不是可以挑的值，而是 120 × 频率 ÷ 极数。所以同一台 4 极电机在 60Hz 下转 1800rpm，在 50Hz 下转 1500rpm — 韩国、美国和日本东部是 60Hz，欧洲、中国和印度是 50Hz。功率一样而转速是 6 比 5，扭矩就反过来成了 5 比 6。实际运行时转子会落后一个转差，所以铭牌上写的是 1746rpm 之类的数。',
    '感應馬達的同步轉速不是可以挑的值，而是 120 × 頻率 ÷ 極數。所以同一台 4 極馬達在 60Hz 下轉 1800rpm，在 50Hz 下轉 1500rpm — 韓國、美國和日本東部是 60Hz，歐洲、中國和印度是 50Hz。功率一樣而轉速是 6 比 5，扭矩就反過來成了 5 比 6。實際運轉時轉子會落後一個轉差，所以銘牌上寫的是 1746rpm 之類的數。',
  ),

  gearTitle: T('감속기는 회전수를 나누고 토크를 곱한다', 'A gearbox divides speed and multiplies torque', 'El reductor divide la velocidad y multiplica el par', 'O redutor divide a rotação e multiplica o torque', '減速機は回転数を割りトルクを掛ける', 'Ein Getriebe teilt die Drehzahl und vervielfacht das Moment', 'Un réducteur divise la vitesse et multiplie le couple', 'गियरबॉक्स गति को बाँटता और टॉर्क को गुणा करता है', '减速机把转速除下来、把扭矩乘上去', '減速機把轉速除下來、把扭矩乘上去'),
  gearNote: T(
    '감속비 i를 걸면 출력축 회전수는 1/i가 되고 토크는 i배가 됩니다. 출력은 늘지 않으므로 효율 η만큼 오히려 줄어듭니다 — 토크는 i × η배입니다. 여기 적은 값은 헬리컬 감속기 기준 η = 0.95의 어림입니다. 웜 감속기는 0.5~0.8까지 떨어지므로 그 경우에는 훨씬 적게 나옵니다. 토크가 늘어난다는 것은 힘이 생긴다는 뜻이 아니라, 같은 출력을 느리고 무겁게 나눠 쓴다는 뜻입니다.',
    'Put a reduction ratio i in the path and the output shaft turns at 1/i of the speed while the torque grows i-fold. Power does not grow — it shrinks by the efficiency η, so the torque is i × η times the input. The figures here assume η = 0.95, typical of a helical gearbox. A worm drive falls to 0.5–0.8 and delivers far less. More torque never means more energy: the same power is simply traded for slower, heavier turning.',
    'Si pones una reducción i, el eje de salida gira a 1/i de la velocidad y el par crece i veces. La potencia no crece: se reduce por el rendimiento η, así que el par es i × η veces el de entrada. Las cifras suponen η = 0,95, propio de un reductor helicoidal. Un reductor de tornillo sin fin baja a 0,5–0,8 y entrega mucho menos. Más par no significa más energía: se cambia la misma potencia por un giro más lento y pesado.',
    'Com uma redução i, o eixo de saída gira a 1/i da rotação e o torque cresce i vezes. A potência não cresce: diminui pelo rendimento η, então o torque é i × η vezes o de entrada. Os números aqui supõem η = 0,95, típico de um redutor helicoidal. Um redutor de coroa e rosca cai para 0,5–0,8 e entrega bem menos. Mais torque nunca significa mais energia: troca-se a mesma potência por um giro mais lento e pesado.',
    '減速比iを掛けると出力軸の回転数は1/iになり、トルクはi倍になります。出力は増えないので効率ηの分だけ減ります — トルクはi × η倍です。ここに並べた値はヘリカル減速機のη = 0.95を前提とした目安です。ウォーム減速機は0.5~0.8まで落ちるので、その場合はずっと小さく出ます。トルクが増えるのは力が生まれることではなく、同じ出力を遅く重く配り直すことです。',
    'Setzt man eine Übersetzung i davor, dreht die Abtriebswelle mit 1/i der Drehzahl, und das Moment wächst um den Faktor i. Die Leistung wächst nicht — sie sinkt um den Wirkungsgrad η, das Moment ist also i × η mal so groß. Die Werte hier nehmen η = 0,95 an, typisch für ein Stirnradgetriebe. Ein Schneckengetriebe fällt auf 0,5–0,8 und liefert deutlich weniger. Mehr Drehmoment heißt nie mehr Energie: dieselbe Leistung wird nur langsamer und schwerer verteilt.',
    'Avec un rapport de réduction i, l’arbre de sortie tourne à 1/i de la vitesse et le couple est multiplié par i. La puissance n’augmente pas : elle diminue du rendement η, donc le couple vaut i × η fois celui d’entrée. Les valeurs supposent η = 0,95, typique d’un réducteur à engrenages hélicoïdaux. Une roue et vis sans fin descend à 0,5–0,8 et donne bien moins. Plus de couple ne veut jamais dire plus d’énergie : la même puissance est simplement rendue plus lente et plus lourde.',
    'गियर अनुपात i लगाएँ तो आउटपुट शाफ़्ट 1/i गति पर घूमता है और टॉर्क i गुना हो जाता है। शक्ति बढ़ती नहीं — दक्षता η जितनी घटती है, यानी टॉर्क i × η गुना होता है। यहाँ दिए आँकड़े हेलिकल गियरबॉक्स की η = 0.95 मानकर हैं। वर्म ड्राइव 0.5–0.8 तक गिरता है और बहुत कम देता है। ज़्यादा टॉर्क का मतलब ज़्यादा ऊर्जा नहीं है: वही शक्ति धीमे और भारी घुमाव में बदल जाती है।',
    '加上减速比 i，输出轴的转速变成 1/i，扭矩变成 i 倍。功率不会变多 — 反而按效率 η 减少，所以扭矩是 i × η 倍。这里的数按硬齿面斜齿减速机 η = 0.95 估算。蜗轮蜗杆会掉到 0.5~0.8，出来的值小得多。扭矩变大不等于凭空多了能量，只是把同样的功率换成更慢更沉的转动。',
    '加上減速比 i，輸出軸的轉速變成 1/i，扭矩變成 i 倍。功率不會變多 — 反而按效率 η 減少，所以扭矩是 i × η 倍。這裡的數按硬齒面斜齒減速機 η = 0.95 估算。蝸輪蝸桿會掉到 0.5~0.8，出來的值小得多。扭矩變大不等於憑空多了能量，只是把同樣的功率換成更慢更沉的轉動。',
  ),

  currentTitle: T('전류는 전압·역률·효율까지 알아야 나온다', 'Current needs voltage, power factor and efficiency too', 'La corriente exige tensión, factor de potencia y rendimiento', 'A corrente exige tensão, fator de potência e rendimento', '電流は電圧・力率・効率まで要る', 'Für den Strom braucht es Spannung, Leistungsfaktor und Wirkungsgrad', 'Le courant exige tension, facteur de puissance et rendement', 'करंट के लिए वोल्टेज, पावर फ़ैक्टर और दक्षता भी चाहिए', '算电流还得知道电压、功率因数和效率', '算電流還得知道電壓、功率因數和效率'),
  currentNote: T(
    '3상 유도전동기의 전류는 I = P ÷ (√3 × V × cosφ × η)입니다. 정격 출력은 축에서 나오는 힘이라, 전기 쪽에서 들어가는 양은 효율만큼 더 크고 그 가운데 일을 하는 몫만 역률로 세기 때문입니다. 나라마다 전압이 달라 같은 모터가 220V에서는 380V의 1.7배를 먹습니다. 여기 쓴 역률과 효율은 크기별 대표값이며, 정확한 값은 명판에 적혀 있으니 그것을 먼저 보세요.',
    'For a three-phase induction motor the current is I = P ÷ (√3 × V × cosφ × η). Rated output is what leaves the shaft, so the electrical input is larger by the efficiency, and only the working share of that counts through the power factor. Supply voltage differs by country, so the same motor draws 1.7 times as much at 220 V as at 380 V. The power factor and efficiency used here are representative values by frame size; the nameplate carries the real ones and should be read first.',
    'En un motor de inducción trifásico la corriente es I = P ÷ (√3 × V × cosφ × η). La potencia nominal es la que sale del eje, así que la entrada eléctrica es mayor por el rendimiento y de ella solo la parte que trabaja cuenta a través del factor de potencia. La tensión de red cambia según el país: el mismo motor consume 1,7 veces más a 220 V que a 380 V. El factor de potencia y el rendimiento usados aquí son valores representativos por tamaño; los reales están en la placa y hay que mirarlos primero.',
    'Num motor de indução trifásico a corrente é I = P ÷ (√3 × V × cosφ × η). A potência nominal é a que sai do eixo, logo a entrada elétrica é maior pelo rendimento e dela apenas a parcela que trabalha entra pelo fator de potência. A tensão da rede muda com o país: o mesmo motor puxa 1,7 vez mais em 220 V do que em 380 V. O fator de potência e o rendimento usados aqui são valores representativos por carcaça; os reais estão na placa e devem ser vistos primeiro.',
    '三相誘導電動機の電流はI = P ÷ (√3 × V × cosφ × η)です。定格出力は軸から出る分なので、電気側から入る量は効率の分だけ大きく、そのうち仕事をする割合を力率で数えるからです。国ごとに電圧が違うため、同じモーターが220Vでは380Vの1.7倍を食います。ここで使った力率と効率は大きさ別の代表値であり、正確な値は銘板に書かれているのでそちらを先に見てください。',
    'Bei einem Drehstrom-Asynchronmotor ist der Strom I = P ÷ (√3 × V × cosφ × η). Die Nennleistung ist das, was die Welle abgibt, also ist die elektrische Aufnahme um den Wirkungsgrad größer, und davon zählt nur der arbeitende Anteil über den Leistungsfaktor. Die Netzspannung unterscheidet sich je Land: derselbe Motor zieht bei 220 V das 1,7-fache von 380 V. Leistungsfaktor und Wirkungsgrad hier sind Richtwerte nach Baugröße; die echten stehen auf dem Typenschild und gehören zuerst gelesen.',
    'Pour un moteur asynchrone triphasé, le courant vaut I = P ÷ (√3 × V × cosφ × η). La puissance nominale est celle qui sort de l’arbre : l’entrée électrique est donc plus grande du rendement, et seule la part qui travaille compte via le facteur de puissance. La tension du réseau change selon le pays : le même moteur consomme 1,7 fois plus en 220 V qu’en 380 V. Le facteur de puissance et le rendement utilisés ici sont des valeurs représentatives par taille ; les vraies figurent sur la plaque et se lisent en premier.',
    'तीन-फ़ेज़ इंडक्शन मोटर में करंट I = P ÷ (√3 × V × cosφ × η) होता है। रेटेड आउटपुट शाफ़्ट से निकलने वाली शक्ति है, इसलिए बिजली की तरफ़ से जाने वाली मात्रा दक्षता जितनी बड़ी होती है, और उसमें से काम करने वाला हिस्सा पावर फ़ैक्टर से गिना जाता है। देश के हिसाब से वोल्टेज बदलता है — वही मोटर 220 V पर 380 V से 1.7 गुना खींचती है। यहाँ लिए पावर फ़ैक्टर और दक्षता आकार के हिसाब से प्रातिनिधिक मान हैं; असली मान नेमप्लेट पर हैं, पहले वही देखें।',
    '三相异步电机的电流是 I = P ÷ (√3 × V × cosφ × η)。额定功率是从轴上输出的那份，所以电这边送进去的要按效率放大，而其中真正做功的比例才用功率因数来算。各国电压不同，同一台电机在 220V 下的电流是 380V 的 1.7 倍。这里用的功率因数和效率是按机座大小取的代表值，准确数字写在铭牌上，请先看铭牌。',
    '三相感應馬達的電流是 I = P ÷ (√3 × V × cosφ × η)。額定功率是從軸上輸出的那份，所以電這邊送進去的要按效率放大，而其中真正做功的比例才用功率因數來算。各國電壓不同，同一台馬達在 220V 下的電流是 380V 的 1.7 倍。這裡用的功率因數和效率是按機座大小取的代表值，準確數字寫在銘牌上，請先看銘牌。',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  pairTitle: T('50Hz와 60Hz', '50 Hz and 60 Hz', '50 Hz y 60 Hz', '50 Hz e 60 Hz', '50Hzと60Hz', '50 Hz und 60 Hz', '50 Hz et 60 Hz', '50 Hz और 60 Hz', '50Hz 与 60Hz', '50Hz 與 60Hz'),
  gearTableTitle: T('감속기를 걸면', 'Through a gearbox', 'Con reductor', 'Com redutor', '減速機を掛けると', 'Über ein Getriebe', 'Avec un réducteur', 'गियरबॉक्स लगाने पर', '接上减速机', '接上減速機'),
  currentTableTitle: T('전압별 3상 전류', 'Three-phase current by voltage', 'Corriente trifásica por tensión', 'Corrente trifásica por tensão', '電圧別の三相電流', 'Drehstrom je Spannung', 'Courant triphasé par tension', 'वोल्टेज के अनुसार करंट', '各电压下的三相电流', '各電壓下的三相電流'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  powerRowTitle: T('같은 출력의 다른 회전수', 'Same output, other speeds', 'Misma potencia, otras velocidades', 'Mesma potência, outras rotações', '同じ出力の他の回転数', 'Gleiche Leistung, andere Drehzahlen', 'Même puissance, autres vitesses', 'वही आउटपुट, दूसरी गति', '同一功率的其他转速', '同一功率的其他轉速'),
  speedRowTitle: T('같은 회전수의 다른 출력', 'Same speed, other outputs', 'Misma velocidad, otras potencias', 'Mesma rotação, outras potências', '同じ回転数の他の出力', 'Gleiche Drehzahl, andere Leistungen', 'Même vitesse, autres puissances', 'वही गति, दूसरे आउटपुट', '同一转速的其他功率', '同一轉速的其他功率'),
  linkTitle: T('이어 보기', 'Related tables', 'Tablas relacionadas', 'Tabelas relacionadas', '関連する表', 'Verwandte Tabellen', 'Tables liées', 'संबंधित तालिकाएँ', '相关表格', '相關表格'),
  torqueLink: T(
    '조임 토크 — 나사를 조일 때의 토크는 이것과 다른 값입니다',
    'Bolt torque — tightening a thread is a different quantity',
    'Par de apriete — apretar un tornillo es otra magnitud',
    'Torque de aperto — apertar um parafuso é outra grandeza',
    '締め付けトルク — ねじを締めるトルクはこれとは別の値です',
    'Anzugsmoment — eine Schraube anzuziehen ist eine andere Größe',
    'Couple de serrage — serrer un filetage est une autre grandeur',
    'बोल्ट टॉर्क — पेच कसने का टॉर्क इससे अलग राशि है',
    '拧紧扭矩 — 拧螺栓的扭矩和这里说的不是一回事',
    '鎖緊扭矩 — 鎖螺栓的扭矩和這裡說的不是一回事',
  ),
  ampereLink: T(
    '가전 전류 — 단상 콘센트 쪽 전류는 √3이 붙지 않습니다',
    'Appliance current — single-phase outlets have no √3 in the formula',
    'Corriente de electrodomésticos — en monofásico no aparece el √3',
    'Corrente de eletrodomésticos — no monofásico não entra o √3',
    '家電の電流 — 単相コンセント側の電流には√3が付きません',
    'Gerätestrom — bei Wechselstrom steht kein √3 in der Formel',
    'Courant des appareils — en monophasé, pas de √3 dans la formule',
    'उपकरण करंट — सिंगल-फ़ेज़ सॉकेट के सूत्र में √3 नहीं आता',
    '家电电流 — 单相插座的算式里没有 √3',
    '家電電流 — 單相插座的算式裡沒有 √3',
  ),

  desc: T<(f: MotorFacts) => string>(
    f => `${dot(f)} 모터의 정격 토크는 ${f.torque}N·m입니다. 각속도 ${f.omega}rad/s로 출력 ${f.watts}W를 나눈 값이고, 같은 토크를 ${f.kgfm}kgf·m 또는 ${f.lbft}lb·ft로도 적습니다. ${f.cell.kw}kW는 미터법 ${f.ps}마력, 영국 마력으로는 ${f.hp}마력입니다.`,
    f => `A ${dot(f)} motor delivers ${f.torque} N·m of rated torque. That is ${f.watts} W divided by an angular velocity of ${f.omega} rad/s, the same torque written as ${f.kgfm} kgf·m or ${f.lbft} lb·ft. In horsepower, ${f.cell.kw} kW is ${f.ps} PS on the metric definition and ${f.hp} hp on the mechanical one.`,
    f => `Un motor de ${cm(f)} da un par nominal de ${nc(f.torque)} N·m. Es ${f.watts} W dividido entre una velocidad angular de ${nc(f.omega)} rad/s, el mismo par escrito como ${nc(f.kgfm)} kgf·m o ${nc(f.lbft)} lb·ft. En caballos, ${nc(f.cell.kw)} kW son ${nc(f.ps)} PS métricos y ${nc(f.hp)} hp británicos.`,
    f => `Um motor de ${cm(f)} entrega ${nc(f.torque)} N·m de torque nominal. É ${f.watts} W dividido por uma velocidade angular de ${nc(f.omega)} rad/s, o mesmo torque escrito como ${nc(f.kgfm)} kgf·m ou ${nc(f.lbft)} lb·ft. Em cavalos, ${nc(f.cell.kw)} kW dão ${nc(f.ps)} PS métricos e ${nc(f.hp)} hp britânicos.`,
    f => `${dot(f)}のモーターの定格トルクは${f.torque}N·mです。角速度${f.omega}rad/sで出力${f.watts}Wを割った値で、同じトルクを${f.kgfm}kgf·mまたは${f.lbft}lb·ftとも書きます。${f.cell.kw}kWは仏馬力で${f.ps}馬力、英馬力では${f.hp}馬力です。`,
    f => `Ein Motor mit ${cm(f)} gibt ${nc(f.torque)} N·m Nennmoment ab. Das sind ${f.watts} W geteilt durch eine Winkelgeschwindigkeit von ${nc(f.omega)} rad/s, dasselbe Moment auch als ${nc(f.kgfm)} kgf·m oder ${nc(f.lbft)} lb·ft geschrieben. In Pferdestärken sind ${nc(f.cell.kw)} kW metrisch ${nc(f.ps)} PS und mechanisch ${nc(f.hp)} hp.`,
    f => `Un moteur de ${cm(f)} donne un couple nominal de ${nc(f.torque)} N·m. C’est ${f.watts} W divisé par une vitesse angulaire de ${nc(f.omega)} rad/s, le même couple s’écrivant ${nc(f.kgfm)} kgf·m ou ${nc(f.lbft)} lb·ft. En chevaux, ${nc(f.cell.kw)} kW valent ${nc(f.ps)} ch métriques et ${nc(f.hp)} hp britanniques.`,
    f => `${dot(f)} मोटर का रेटेड टॉर्क ${f.torque} N·m है। यह ${f.watts} W को ${f.omega} rad/s कोणीय वेग से भाग देने पर आता है, और वही टॉर्क ${f.kgfm} kgf·m या ${f.lbft} lb·ft भी लिखा जाता है। अश्वशक्ति में ${f.cell.kw} kW मीट्रिक ${f.ps} PS और ब्रिटिश ${f.hp} hp है।`,
    f => `${dot(f)} 电机的额定扭矩是 ${f.torque}N·m。这是把 ${f.watts}W 除以角速度 ${f.omega}rad/s 得到的，同一个扭矩也写作 ${f.kgfm}kgf·m 或 ${f.lbft}lb·ft。换成马力，${f.cell.kw}kW 是公制 ${f.ps} 马力、英制 ${f.hp} 马力。`,
    f => `${dot(f)} 馬達的額定扭矩是 ${f.torque}N·m。這是把 ${f.watts}W 除以角速度 ${f.omega}rad/s 得到的，同一個扭矩也寫作 ${f.kgfm}kgf·m 或 ${f.lbft}lb·ft。換成馬力，${f.cell.kw}kW 是公制 ${f.ps} 馬力、英制 ${f.hp} 馬力。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      '토크(N·m) = 출력(W) ÷ 각속도(rad/s)이고, 각속도는 2π × rpm ÷ 60입니다.',
      'T = 9550 × P(kW) ÷ n(rpm)의 9550은 60000 ÷ 2π를 올려 적은 값입니다.',
      '같은 출력에서 회전수를 2배로 하면 토크는 절반입니다 — 반비례입니다.',
      '미터법 마력(PS) 735.49875W와 영국 마력(HP) 745.699872W는 다른 값입니다.',
    ],
    [
      'Torque (N·m) is power (W) divided by angular velocity (rad/s), and that velocity is 2π × rpm ÷ 60.',
      'The 9550 in T = 9550 × P(kW) ÷ n(rpm) is 60000 ÷ 2π rounded up.',
      'At constant power, doubling the speed halves the torque — they are inversely proportional.',
      'Metric horsepower (PS) is 735.49875 W and mechanical horsepower (hp) is 745.699872 W: different numbers.',
    ],
    [
      'El par (N·m) es la potencia (W) entre la velocidad angular (rad/s), y esa velocidad es 2π × rpm ÷ 60.',
      'El 9550 de T = 9550 × P(kW) ÷ n(rpm) es 60000 ÷ 2π redondeado al alza.',
      'A potencia constante, duplicar la velocidad reduce el par a la mitad: son inversamente proporcionales.',
      'El caballo métrico (PS) vale 735,49875 W y el británico (hp) 745,699872 W: no son lo mismo.',
    ],
    [
      'O torque (N·m) é a potência (W) dividida pela velocidade angular (rad/s), e essa velocidade é 2π × rpm ÷ 60.',
      'O 9550 de T = 9550 × P(kW) ÷ n(rpm) é 60000 ÷ 2π arredondado para cima.',
      'A potência constante, dobrar a rotação reduz o torque à metade: são inversamente proporcionais.',
      'O cavalo métrico (PS) vale 735,49875 W e o britânico (hp) 745,699872 W: não são a mesma coisa.',
    ],
    [
      'トルク(N·m) = 出力(W) ÷ 角速度(rad/s)で、角速度は2π × rpm ÷ 60です。',
      'T = 9550 × P(kW) ÷ n(rpm)の9550は60000 ÷ 2πを切り上げた値です。',
      '同じ出力で回転数を2倍にするとトルクは半分です — 反比例します。',
      '仏馬力(PS)の735.49875Wと英馬力(HP)の745.699872Wは別の値です。',
    ],
    [
      'Drehmoment (N·m) ist Leistung (W) geteilt durch Winkelgeschwindigkeit (rad/s), und die ist 2π × rpm ÷ 60.',
      'Die 9550 in T = 9550 × P(kW) ÷ n(rpm) sind 60000 ÷ 2π, aufgerundet.',
      'Bei gleicher Leistung halbiert doppelte Drehzahl das Moment — sie sind umgekehrt proportional.',
      'Metrische PS mit 735,49875 W und mechanische hp mit 745,699872 W sind verschiedene Zahlen.',
    ],
    [
      'Le couple (N·m) est la puissance (W) divisée par la vitesse angulaire (rad/s), qui vaut 2π × tr/min ÷ 60.',
      'Le 9550 de T = 9550 × P(kW) ÷ n(tr/min) est 60000 ÷ 2π arrondi au-dessus.',
      'À puissance constante, doubler la vitesse divise le couple par deux : ils sont inversement proportionnels.',
      'Le cheval métrique (ch) vaut 735,49875 W et le britannique (hp) 745,699872 W : deux nombres distincts.',
    ],
    [
      'टॉर्क (N·m) = शक्ति (W) ÷ कोणीय वेग (rad/s), और वह वेग 2π × rpm ÷ 60 है।',
      'T = 9550 × P(kW) ÷ n(rpm) का 9550 दरअसल 60000 ÷ 2π को ऊपर पूर्णांकित किया गया है।',
      'शक्ति वही रहे और गति दुगुनी हो तो टॉर्क आधा — दोनों व्युत्क्रमानुपाती हैं।',
      'मीट्रिक अश्वशक्ति (PS) 735.49875 W और ब्रिटिश (hp) 745.699872 W — दोनों अलग हैं।',
    ],
    [
      '扭矩（N·m）= 功率（W）÷ 角速度（rad/s），角速度是 2π × rpm ÷ 60。',
      'T = 9550 × P(kW) ÷ n(rpm) 里的 9550 是 60000 ÷ 2π 向上取整。',
      '功率不变时转速翻倍，扭矩就减半 — 两者成反比。',
      '公制马力（PS）735.49875W 和英制马力（hp）745.699872W 是两个不同的数。',
    ],
    [
      '扭矩（N·m）= 功率（W）÷ 角速度（rad/s），角速度是 2π × rpm ÷ 60。',
      'T = 9550 × P(kW) ÷ n(rpm) 裡的 9550 是 60000 ÷ 2π 向上取整。',
      '功率不變時轉速翻倍，扭矩就減半 — 兩者成反比。',
      '公制馬力（PS）735.49875W 和英制馬力（hp）745.699872W 是兩個不同的數。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '모터 토크 계산표 136칸 — 출력과 회전수로 보는 N·m',
    'Motor torque chart — newton metres from output and speed',
    'Tabla de par del motor — newton metro según potencia y velocidad',
    'Tabela de torque do motor — newton metro por potência e rotação',
    'モータートルク計算表136マス — 出力と回転数で見るN·m',
    'Motordrehmoment-Tabelle — Newtonmeter aus Leistung und Drehzahl',
    'Table des couples moteur — newtons-mètres selon puissance et vitesse',
    'मोटर टॉर्क तालिका — आउटपुट और गति से N·m',
    '电机扭矩计算表 136 格 — 由功率和转速看 N·m',
    '馬達扭矩計算表 136 格 — 由功率和轉速看 N·m',
  ),
  hubMetaDesc: T(
    '0.1kW부터 75kW까지 정격 출력 17가지와 50Hz·60Hz 동기속도 8가지가 만나는 136칸. 9550 계수가 60000 ÷ 2π에서 나오는 과정, 미터법 마력과 영국 마력의 차이, 감속기를 걸었을 때의 회전수와 토크, 전압별 3상 전류까지 함께 봅니다.',
    'The 136 pairings of 17 rated outputs from 0.1 kW to 75 kW and 8 synchronous speeds across 50 Hz and 60 Hz: where the 9550 factor comes from, how metric and mechanical horsepower differ, what a gearbox does to speed and torque, and the three-phase current at each supply voltage.',
    'Los 136 cruces de 17 potencias nominales de 0,1 kW a 75 kW y 8 velocidades sincrónicas en 50 Hz y 60 Hz: de dónde sale el factor 9550, en qué difieren el caballo métrico y el británico, qué hace un reductor con la velocidad y el par, y la corriente trifásica en cada tensión.',
    'Os 136 cruzamentos de 17 potências nominais de 0,1 kW a 75 kW e 8 rotações sincronizadas em 50 Hz e 60 Hz: de onde vem o fator 9550, como diferem o cavalo métrico e o britânico, o que um redutor faz com rotação e torque, e a corrente trifásica em cada tensão.',
    '0.1kWから75kWまで定格出力17種と50Hz・60Hzの同期速度8種が交わる136マス。9550の係数が60000 ÷ 2πから出る筋道、仏馬力と英馬力の違い、減速機を掛けたときの回転数とトルク、電圧別の三相電流まで。',
    'Die 136 Paarungen aus 17 Nennleistungen von 0,1 kW bis 75 kW und 8 Synchrondrehzahlen bei 50 Hz und 60 Hz: woher der Faktor 9550 kommt, wie sich metrische PS und mechanische hp unterscheiden, was ein Getriebe mit Drehzahl und Moment macht, und der Drehstrom bei jeder Netzspannung.',
    'Les 136 croisements de 17 puissances nominales de 0,1 kW à 75 kW et 8 vitesses de synchronisme en 50 Hz et 60 Hz : d’où vient le facteur 9550, en quoi cheval métrique et cheval britannique diffèrent, ce qu’un réducteur fait à la vitesse et au couple, et le courant triphasé à chaque tension.',
    '0.1 kW से 75 kW तक 17 रेटेड आउटपुट और 50 Hz व 60 Hz की 8 समकालिक गतियों के 136 जोड़: 9550 गुणक 60000 ÷ 2π से कैसे निकलता है, मीट्रिक और ब्रिटिश अश्वशक्ति में क्या अंतर है, गियरबॉक्स गति और टॉर्क का क्या करता है, और हर वोल्टेज पर तीन-फ़ेज़ करंट।',
    '0.1kW 到 75kW 共 17 种额定功率与 50Hz、60Hz 下 8 种同步转速组成的 136 格：9550 系数如何从 60000 ÷ 2π 得出、公制马力与英制马力差在哪、接上减速机后转速和扭矩变成多少，以及各电压下的三相电流。',
    '0.1kW 到 75kW 共 17 種額定功率與 50Hz、60Hz 下 8 種同步轉速組成的 136 格：9550 係數如何從 60000 ÷ 2π 得出、公制馬力與英制馬力差在哪、接上減速機後轉速和扭矩變成多少，以及各電壓下的三相電流。',
  ),

  metaTitle: T<(f: MotorFacts) => string>(
    f => `${dot(f)} 모터 토크 — ${f.torque}N·m`,
    f => `${dot(f)} motor torque — ${f.torque} N·m`,
    f => `Par de un motor de ${cm(f)} — ${nc(f.torque)} N·m`,
    f => `Torque de um motor de ${cm(f)} — ${nc(f.torque)} N·m`,
    f => `${dot(f)} モーターのトルク — ${f.torque}N·m`,
    f => `Drehmoment eines Motors mit ${cm(f)} — ${nc(f.torque)} N·m`,
    f => `Couple d’un moteur de ${cm(f)} — ${nc(f.torque)} N·m`,
    f => `${dot(f)} मोटर टॉर्क — ${f.torque} N·m`,
    f => `${dot(f)} 电机扭矩 — ${f.torque}N·m`,
    f => `${dot(f)} 馬達扭矩 — ${f.torque}N·m`,
  ),

  metaDesc: T<(f: MotorFacts) => string>(
    f => `${f.cell.kw}kW ${f.speed.poles}극 모터는 ${f.speed.hz}Hz에서 ${f.cell.rpm}rpm으로 돌고 정격 토크는 ${f.torque}N·m(${f.kgfm}kgf·m)입니다. 미터법 ${f.ps}마력·영국 ${f.hp}마력이고, 슬립 3%를 보면 ${f.fullRpm}rpm에서 ${f.fullTorque}N·m입니다. ${f.pair.hz}Hz에서는 ${f.pair.rpm}rpm이라 토크가 ${f.pair.torque}N·m로 바뀝니다.`,
    f => `A ${f.cell.kw} kW motor with ${f.speed.poles} poles turns at ${f.cell.rpm} rpm on ${f.speed.hz} Hz, giving ${f.torque} N·m (${f.kgfm} kgf·m) of rated torque. That is ${f.ps} PS or ${f.hp} hp, and with 3 % slip it becomes ${f.fullTorque} N·m at ${f.fullRpm} rpm. On ${f.pair.hz} Hz the same motor runs ${f.pair.rpm} rpm and the torque moves to ${f.pair.torque} N·m.`,
    f => `Un motor de ${nc(f.cell.kw)} kW con ${f.speed.poles} polos gira a ${f.cell.rpm} rpm en ${f.speed.hz} Hz y da ${nc(f.torque)} N·m (${nc(f.kgfm)} kgf·m) de par nominal. Son ${nc(f.ps)} PS o ${nc(f.hp)} hp, y con un 3 % de deslizamiento queda en ${nc(f.fullTorque)} N·m a ${f.fullRpm} rpm. En ${f.pair.hz} Hz el mismo motor gira a ${f.pair.rpm} rpm y el par pasa a ${nc(f.pair.torque)} N·m.`,
    f => `Um motor de ${nc(f.cell.kw)} kW com ${f.speed.poles} polos gira a ${f.cell.rpm} rpm em ${f.speed.hz} Hz e dá ${nc(f.torque)} N·m (${nc(f.kgfm)} kgf·m) de torque nominal. São ${nc(f.ps)} PS ou ${nc(f.hp)} hp, e com 3 % de escorregamento fica em ${nc(f.fullTorque)} N·m a ${f.fullRpm} rpm. Em ${f.pair.hz} Hz o mesmo motor gira ${f.pair.rpm} rpm e o torque vai para ${nc(f.pair.torque)} N·m.`,
    f => `${f.cell.kw}kW ${f.speed.poles}極のモーターは${f.speed.hz}Hzで${f.cell.rpm}rpmで回り、定格トルクは${f.torque}N·m(${f.kgfm}kgf·m)です。仏馬力で${f.ps}馬力、英馬力で${f.hp}馬力、すべり3%を見れば${f.fullRpm}rpmで${f.fullTorque}N·mです。${f.pair.hz}Hzでは${f.pair.rpm}rpmになるためトルクは${f.pair.torque}N·mに変わります。`,
    f => `Ein Motor mit ${nc(f.cell.kw)} kW und ${f.speed.poles} Polen dreht bei ${f.speed.hz} Hz mit ${f.cell.rpm} rpm und liefert ${nc(f.torque)} N·m (${nc(f.kgfm)} kgf·m) Nennmoment. Das sind ${nc(f.ps)} PS oder ${nc(f.hp)} hp, mit 3 % Schlupf ${nc(f.fullTorque)} N·m bei ${f.fullRpm} rpm. Bei ${f.pair.hz} Hz läuft derselbe Motor mit ${f.pair.rpm} rpm, und das Moment geht auf ${nc(f.pair.torque)} N·m.`,
    f => `Un moteur de ${nc(f.cell.kw)} kW à ${f.speed.poles} pôles tourne à ${f.cell.rpm} tr/min en ${f.speed.hz} Hz et donne ${nc(f.torque)} N·m (${nc(f.kgfm)} kgf·m) de couple nominal. Cela fait ${nc(f.ps)} ch ou ${nc(f.hp)} hp, et avec 3 % de glissement ${nc(f.fullTorque)} N·m à ${f.fullRpm} tr/min. En ${f.pair.hz} Hz le même moteur tourne à ${f.pair.rpm} tr/min et le couple passe à ${nc(f.pair.torque)} N·m.`,
    f => `${f.cell.kw} kW और ${f.speed.poles} ध्रुव वाली मोटर ${f.speed.hz} Hz पर ${f.cell.rpm} rpm घूमती है और रेटेड टॉर्क ${f.torque} N·m (${f.kgfm} kgf·m) देती है। यह ${f.ps} PS या ${f.hp} hp है, और 3% स्लिप के साथ ${f.fullRpm} rpm पर ${f.fullTorque} N·m हो जाता है। ${f.pair.hz} Hz पर वही मोटर ${f.pair.rpm} rpm चलती है और टॉर्क ${f.pair.torque} N·m हो जाता है।`,
    f => `${f.cell.kw}kW ${f.speed.poles} 极电机在 ${f.speed.hz}Hz 下转 ${f.cell.rpm}rpm，额定扭矩 ${f.torque}N·m（${f.kgfm}kgf·m）。折成马力是公制 ${f.ps}、英制 ${f.hp}，按 3% 转差算则是 ${f.fullRpm}rpm 下 ${f.fullTorque}N·m。在 ${f.pair.hz}Hz 下同一台电机转 ${f.pair.rpm}rpm，扭矩变成 ${f.pair.torque}N·m。`,
    f => `${f.cell.kw}kW ${f.speed.poles} 極馬達在 ${f.speed.hz}Hz 下轉 ${f.cell.rpm}rpm，額定扭矩 ${f.torque}N·m（${f.kgfm}kgf·m）。折成馬力是公制 ${f.ps}、英制 ${f.hp}，按 3% 轉差算則是 ${f.fullRpm}rpm 下 ${f.fullTorque}N·m。在 ${f.pair.hz}Hz 下同一台馬達轉 ${f.pair.rpm}rpm，扭矩變成 ${f.pair.torque}N·m。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '모터 토크는 어떻게 계산하나요?', a: '출력을 각속도로 나눕니다. 각속도는 2π × rpm ÷ 60이므로 토크(N·m) = 출력(W) × 60 ÷ (2π × rpm)이고, 정리하면 T = 9550 × P(kW) ÷ n(rpm)입니다. 9550은 60000 ÷ 2π = 9549.3을 올려 적은 값이라 따로 외울 것이 없습니다.' },
      { q: '같은 모터가 50Hz와 60Hz에서 다르게 도나요?', a: '네. 동기속도가 120 × 주파수 ÷ 극수라 4극 모터는 60Hz에서 1800rpm, 50Hz에서 1500rpm입니다. 출력이 같다면 회전수가 낮은 50Hz 쪽의 토크가 6/5배 큽니다.' },
      { q: 'PS와 HP는 같은 마력인가요?', a: '아닙니다. 미터법 마력(PS)은 735.49875W, 영국 마력(HP)은 745.699872W로 1.4% 차이가 납니다. 75kW는 102PS이지만 101HP입니다.' },
    ],
    [
      { q: 'How do I work out motor torque?', a: 'Divide the output by the angular velocity. That velocity is 2π × rpm ÷ 60, so torque (N·m) = power (W) × 60 ÷ (2π × rpm), which tidies up to T = 9550 × P(kW) ÷ n(rpm). The 9550 is 60000 ÷ 2π = 9549.3 rounded up — nothing to memorise.' },
      { q: 'Does the same motor really run differently on 50 Hz and 60 Hz?', a: 'Yes. Synchronous speed is 120 × frequency ÷ poles, so a four-pole motor turns 1800 rpm on 60 Hz and 1500 rpm on 50 Hz. At equal power the slower 50 Hz case carries 6/5 of the torque.' },
      { q: 'Are PS and hp the same horsepower?', a: 'No. Metric horsepower (PS) is 735.49875 W and mechanical horsepower (hp) is 745.699872 W, a gap of 1.4 %. A 75 kW motor is 102 PS but 101 hp.' },
    ],
    [
      { q: '¿Cómo se calcula el par de un motor?', a: 'Divide la potencia entre la velocidad angular. Esa velocidad es 2π × rpm ÷ 60, así que el par (N·m) = potencia (W) × 60 ÷ (2π × rpm), que ordenado queda T = 9550 × P(kW) ÷ n(rpm). El 9550 es 60000 ÷ 2π = 9549,3 redondeado al alza: nada que memorizar.' },
      { q: '¿De verdad el mismo motor gira distinto en 50 Hz y 60 Hz?', a: 'Sí. La velocidad sincrónica es 120 × frecuencia ÷ polos, así que un motor de cuatro polos gira a 1800 rpm en 60 Hz y a 1500 rpm en 50 Hz. A igual potencia, el caso más lento de 50 Hz lleva 6/5 del par.' },
      { q: '¿PS y hp son el mismo caballo?', a: 'No. El caballo métrico (PS) vale 735,49875 W y el británico (hp) 745,699872 W, un 1,4 % de diferencia. Un motor de 75 kW son 102 PS pero 101 hp.' },
    ],
    [
      { q: 'Como se calcula o torque do motor?', a: 'Divida a potência pela velocidade angular. Essa velocidade é 2π × rpm ÷ 60, então o torque (N·m) = potência (W) × 60 ÷ (2π × rpm), que arrumado fica T = 9550 × P(kW) ÷ n(rpm). O 9550 é 60000 ÷ 2π = 9549,3 arredondado para cima: nada a decorar.' },
      { q: 'O mesmo motor gira mesmo diferente em 50 Hz e 60 Hz?', a: 'Sim. A rotação sincronizada é 120 × frequência ÷ polos, então um motor de quatro polos gira 1800 rpm em 60 Hz e 1500 rpm em 50 Hz. Com potência igual, o caso mais lento de 50 Hz leva 6/5 do torque.' },
      { q: 'PS e hp são o mesmo cavalo?', a: 'Não. O cavalo métrico (PS) vale 735,49875 W e o britânico (hp) 745,699872 W, uma diferença de 1,4 %. Um motor de 75 kW dá 102 PS mas 101 hp.' },
    ],
    [
      { q: 'モーターのトルクはどう計算しますか。', a: '出力を角速度で割ります。角速度は2π × rpm ÷ 60なので、トルク(N·m) = 出力(W) × 60 ÷ (2π × rpm)であり、整理するとT = 9550 × P(kW) ÷ n(rpm)です。9550は60000 ÷ 2π = 9549.3を切り上げた値なので、覚える必要はありません。' },
      { q: '同じモーターが50Hzと60Hzで違う回り方をしますか。', a: 'はい。同期速度が120 × 周波数 ÷ 極数なので、4極モーターは60Hzで1800rpm、50Hzで1500rpmです。出力が同じなら、回転数の低い50Hz側のトルクが6/5倍大きくなります。' },
      { q: 'PSとHPは同じ馬力ですか。', a: 'いいえ。仏馬力(PS)は735.49875W、英馬力(HP)は745.699872Wで1.4%の差があります。75kWは102PSですが101HPです。' },
    ],
    [
      { q: 'Wie rechnet man das Motordrehmoment?', a: 'Leistung durch Winkelgeschwindigkeit. Diese ist 2π × rpm ÷ 60, also Drehmoment (N·m) = Leistung (W) × 60 ÷ (2π × rpm), aufgeräumt T = 9550 × P(kW) ÷ n(rpm). Die 9550 sind 60000 ÷ 2π = 9549,3, aufgerundet — nichts zum Lernen.' },
      { q: 'Läuft derselbe Motor bei 50 Hz und 60 Hz wirklich anders?', a: 'Ja. Die Synchrondrehzahl ist 120 × Frequenz ÷ Polzahl, ein vierpoliger Motor dreht also bei 60 Hz mit 1800 rpm und bei 50 Hz mit 1500 rpm. Bei gleicher Leistung trägt der langsamere 50-Hz-Fall 6/5 des Moments.' },
      { q: 'Sind PS und hp dieselbe Pferdestärke?', a: 'Nein. Metrische PS sind 735,49875 W, mechanische hp 745,699872 W — 1,4 % Unterschied. Ein 75-kW-Motor hat 102 PS, aber 101 hp.' },
    ],
    [
      { q: 'Comment calculer le couple d’un moteur ?', a: 'On divise la puissance par la vitesse angulaire. Celle-ci vaut 2π × tr/min ÷ 60, donc couple (N·m) = puissance (W) × 60 ÷ (2π × tr/min), soit T = 9550 × P(kW) ÷ n(tr/min) après simplification. Le 9550 est 60000 ÷ 2π = 9549,3 arrondi au-dessus : rien à apprendre.' },
      { q: 'Le même moteur tourne-t-il vraiment différemment en 50 Hz et 60 Hz ?', a: 'Oui. La vitesse de synchronisme vaut 120 × fréquence ÷ nombre de pôles : un moteur à quatre pôles tourne à 1800 tr/min en 60 Hz et à 1500 tr/min en 50 Hz. À puissance égale, le cas plus lent en 50 Hz porte 6/5 du couple.' },
      { q: 'Le ch et le hp sont-ils le même cheval ?', a: 'Non. Le cheval métrique (ch) vaut 735,49875 W et le cheval britannique (hp) 745,699872 W, soit 1,4 % d’écart. Un moteur de 75 kW fait 102 ch mais 101 hp.' },
    ],
    [
      { q: 'मोटर का टॉर्क कैसे निकालें?', a: 'शक्ति को कोणीय वेग से भाग दें। वह वेग 2π × rpm ÷ 60 है, इसलिए टॉर्क (N·m) = शक्ति (W) × 60 ÷ (2π × rpm), जिसे सजाकर लिखें तो T = 9550 × P(kW) ÷ n(rpm)। 9550 दरअसल 60000 ÷ 2π = 9549.3 को ऊपर पूर्णांकित किया गया है — याद करने जैसा कुछ नहीं।' },
      { q: 'क्या वही मोटर 50 Hz और 60 Hz पर अलग घूमती है?', a: 'हाँ। समकालिक गति 120 × आवृत्ति ÷ ध्रुव है, इसलिए चार-ध्रुव मोटर 60 Hz पर 1800 rpm और 50 Hz पर 1500 rpm घूमती है। शक्ति बराबर हो तो धीमे 50 Hz वाले मामले का टॉर्क 6/5 गुना होता है।' },
      { q: 'क्या PS और hp एक ही अश्वशक्ति हैं?', a: 'नहीं। मीट्रिक अश्वशक्ति (PS) 735.49875 W है और ब्रिटिश (hp) 745.699872 W — 1.4% का अंतर। 75 kW की मोटर 102 PS है पर 101 hp।' },
    ],
    [
      { q: '电机扭矩怎么算？', a: '把功率除以角速度。角速度是 2π × rpm ÷ 60，所以扭矩（N·m）= 功率（W）× 60 ÷ (2π × rpm)，整理后就是 T = 9550 × P(kW) ÷ n(rpm)。9550 是 60000 ÷ 2π = 9549.3 向上取整，不用背。' },
      { q: '同一台电机在 50Hz 和 60Hz 下真的转得不一样吗？', a: '是的。同步转速是 120 × 频率 ÷ 极数，所以 4 极电机在 60Hz 下转 1800rpm，在 50Hz 下转 1500rpm。功率相同时，转速较低的 50Hz 一侧扭矩要大 6/5 倍。' },
      { q: 'PS 和 hp 是同一个马力吗？', a: '不是。公制马力（PS）是 735.49875W，英制马力（hp）是 745.699872W，差 1.4%。75kW 是 102PS，但只有 101hp。' },
    ],
    [
      { q: '馬達扭矩怎麼算？', a: '把功率除以角速度。角速度是 2π × rpm ÷ 60，所以扭矩（N·m）= 功率（W）× 60 ÷ (2π × rpm)，整理後就是 T = 9550 × P(kW) ÷ n(rpm)。9550 是 60000 ÷ 2π = 9549.3 向上取整，不用背。' },
      { q: '同一台馬達在 50Hz 和 60Hz 下真的轉得不一樣嗎？', a: '是的。同步轉速是 120 × 頻率 ÷ 極數，所以 4 極馬達在 60Hz 下轉 1800rpm，在 50Hz 下轉 1500rpm。功率相同時，轉速較低的 50Hz 一側扭矩要大 6/5 倍。' },
      { q: 'PS 和 hp 是同一個馬力嗎？', a: '不是。公制馬力（PS）是 735.49875W，英制馬力（hp）是 745.699872W，差 1.4%。75kW 是 102PS，但只有 101hp。' },
    ],
  ),

  cellFaq: T<(f: MotorFacts) => FaqItem[]>(
    f => [
      { q: `${dot(f)} 모터의 토크는 몇 N·m인가요?`, a: `${f.torque}N·m입니다. 출력 ${f.watts}W를 각속도 ${f.omega}rad/s로 나눈 값이고, kgf·m로는 ${f.kgfm}, lb·ft로는 ${f.lbft}입니다.` },
      { q: `감속비 ${f.gears[2].ratio}을 걸면 어떻게 되나요?`, a: `회전수는 ${f.gears[2].rpm}rpm으로 떨어지고 토크는 ${f.gears[2].torque}N·m로 올라갑니다. ${f.gears[2].ratio}배가 그대로 곱해지지 않는 것은 감속기 효율 0.95를 함께 곱했기 때문입니다.` },
      { q: '3상 전류는 얼마나 흐르나요?', a: `${f.speed.hz}Hz 기준으로 ${f.currents.map(c => `${c.volt}V에서 ${c.amp}A`).join(', ')}입니다. 역률 ${f.pf}·효율 ${f.eff}를 대표값으로 넣은 어림이므로 명판 값이 있으면 그것을 쓰세요.` },
    ],
    f => [
      { q: `How much torque does a ${dot(f)} motor make?`, a: `${f.torque} N·m — ${f.watts} W divided by an angular velocity of ${f.omega} rad/s. The same figure is ${f.kgfm} kgf·m or ${f.lbft} lb·ft.` },
      { q: `What happens through a ${f.gears[2].ratio}:1 gearbox?`, a: `The speed drops to ${f.gears[2].rpm} rpm and the torque rises to ${f.gears[2].torque} N·m. It is not a clean ${f.gears[2].ratio}-fold gain because the gearbox efficiency of 0.95 is applied as well.` },
      { q: 'How much three-phase current does it draw?', a: `On ${f.speed.hz} Hz: ${f.currents.map(c => `${c.amp} A at ${c.volt} V`).join(', ')}. This assumes a representative power factor of ${f.pf} and efficiency of ${f.eff}, so use the nameplate figures when you have them.` },
    ],
    f => [
      { q: `¿Cuánto par da un motor de ${cm(f)}?`, a: `${nc(f.torque)} N·m: ${f.watts} W entre una velocidad angular de ${nc(f.omega)} rad/s. La misma cifra son ${nc(f.kgfm)} kgf·m o ${nc(f.lbft)} lb·ft.` },
      { q: `¿Qué pasa con un reductor de ${f.gears[2].ratio}:1?`, a: `La velocidad baja a ${nc(f.gears[2].rpm)} rpm y el par sube a ${nc(f.gears[2].torque)} N·m. No es una ganancia limpia de ${f.gears[2].ratio} veces porque también se aplica el rendimiento del reductor, 0,95.` },
      { q: '¿Cuánta corriente trifásica consume?', a: `En ${f.speed.hz} Hz: ${f.currents.map(c => `${nc(c.amp)} A a ${c.volt} V`).join(', ')}. Supone un factor de potencia representativo de ${nc(f.pf)} y un rendimiento de ${nc(f.eff)}, así que usa los datos de la placa si los tienes.` },
    ],
    f => [
      { q: `Quanto torque dá um motor de ${cm(f)}?`, a: `${nc(f.torque)} N·m: ${f.watts} W dividido por uma velocidade angular de ${nc(f.omega)} rad/s. A mesma cifra são ${nc(f.kgfm)} kgf·m ou ${nc(f.lbft)} lb·ft.` },
      { q: `O que acontece com um redutor de ${f.gears[2].ratio}:1?`, a: `A rotação cai para ${nc(f.gears[2].rpm)} rpm e o torque sobe para ${nc(f.gears[2].torque)} N·m. Não é um ganho limpo de ${f.gears[2].ratio} vezes porque o rendimento do redutor, 0,95, também entra.` },
      { q: 'Quanta corrente trifásica ele puxa?', a: `Em ${f.speed.hz} Hz: ${f.currents.map(c => `${nc(c.amp)} A em ${c.volt} V`).join(', ')}. Supõe fator de potência representativo de ${nc(f.pf)} e rendimento de ${nc(f.eff)}, então use os dados da placa quando houver.` },
    ],
    f => [
      { q: `${dot(f)}のモーターのトルクは何N·mですか。`, a: `${f.torque}N·mです。出力${f.watts}Wを角速度${f.omega}rad/sで割った値で、kgf·mでは${f.kgfm}、lb·ftでは${f.lbft}です。` },
      { q: `減速比${f.gears[2].ratio}を掛けるとどうなりますか。`, a: `回転数は${f.gears[2].rpm}rpmまで落ち、トルクは${f.gears[2].torque}N·mまで上がります。${f.gears[2].ratio}倍そのままにならないのは、減速機の効率0.95も掛かるからです。` },
      { q: '三相電流はどれくらい流れますか。', a: `${f.speed.hz}Hzで、${f.currents.map(c => `${c.volt}Vなら${c.amp}A`).join('、')}です。力率${f.pf}・効率${f.eff}を代表値として入れた目安なので、銘板の値があればそちらを使ってください。` },
    ],
    f => [
      { q: `Wie viel Moment liefert ein Motor mit ${cm(f)}?`, a: `${nc(f.torque)} N·m — ${f.watts} W geteilt durch eine Winkelgeschwindigkeit von ${nc(f.omega)} rad/s. Dieselbe Zahl sind ${nc(f.kgfm)} kgf·m oder ${nc(f.lbft)} lb·ft.` },
      { q: `Was passiert über ein Getriebe mit ${f.gears[2].ratio}:1?`, a: `Die Drehzahl fällt auf ${nc(f.gears[2].rpm)} rpm, das Moment steigt auf ${nc(f.gears[2].torque)} N·m. Es ist kein glatter Faktor ${f.gears[2].ratio}, weil der Getriebewirkungsgrad 0,95 mitwirkt.` },
      { q: 'Wie viel Drehstrom nimmt er auf?', a: `Bei ${f.speed.hz} Hz: ${f.currents.map(c => `${nc(c.amp)} A bei ${c.volt} V`).join(', ')}. Angenommen sind ein Leistungsfaktor von ${nc(f.pf)} und ein Wirkungsgrad von ${nc(f.eff)} als Richtwerte — mit Typenschild gilt dieses.` },
    ],
    f => [
      { q: `Quel couple donne un moteur de ${cm(f)} ?`, a: `${nc(f.torque)} N·m : ${f.watts} W divisé par une vitesse angulaire de ${nc(f.omega)} rad/s. Le même chiffre vaut ${nc(f.kgfm)} kgf·m ou ${nc(f.lbft)} lb·ft.` },
      { q: `Que donne un réducteur de ${f.gears[2].ratio}:1 ?`, a: `La vitesse tombe à ${nc(f.gears[2].rpm)} tr/min et le couple monte à ${nc(f.gears[2].torque)} N·m. Ce n’est pas un gain net de ${f.gears[2].ratio} car le rendement du réducteur, 0,95, s’applique aussi.` },
      { q: 'Quel courant triphasé consomme-t-il ?', a: `En ${f.speed.hz} Hz : ${f.currents.map(c => `${nc(c.amp)} A sous ${c.volt} V`).join(', ')}. Cela suppose un facteur de puissance de ${nc(f.pf)} et un rendement de ${nc(f.eff)} pris comme valeurs représentatives ; la plaque prime.` },
    ],
    f => [
      { q: `${dot(f)} मोटर कितना टॉर्क देती है?`, a: `${f.torque} N·m — ${f.watts} W को ${f.omega} rad/s कोणीय वेग से भाग देने पर। वही आँकड़ा ${f.kgfm} kgf·m या ${f.lbft} lb·ft है।` },
      { q: `${f.gears[2].ratio}:1 गियरबॉक्स लगाने पर क्या होता है?`, a: `गति ${f.gears[2].rpm} rpm तक गिरती है और टॉर्क ${f.gears[2].torque} N·m तक चढ़ता है। ठीक ${f.gears[2].ratio} गुना नहीं मिलता क्योंकि गियरबॉक्स की दक्षता 0.95 भी लगती है।` },
      { q: 'तीन-फ़ेज़ करंट कितना खींचती है?', a: `${f.speed.hz} Hz पर: ${f.currents.map(c => `${c.volt} V पर ${c.amp} A`).join(', ')}। इसमें पावर फ़ैक्टर ${f.pf} और दक्षता ${f.eff} प्रातिनिधिक मान के रूप में लिए गए हैं, इसलिए नेमप्लेट के आँकड़े हों तो वही लें।` },
    ],
    f => [
      { q: `${dot(f)} 电机的扭矩是多少 N·m？`, a: `${f.torque}N·m。把功率 ${f.watts}W 除以角速度 ${f.omega}rad/s 得到，换成 kgf·m 是 ${f.kgfm}，换成 lb·ft 是 ${f.lbft}。` },
      { q: `接上 ${f.gears[2].ratio}:1 的减速机会怎样？`, a: `转速降到 ${f.gears[2].rpm}rpm，扭矩升到 ${f.gears[2].torque}N·m。不是干干净净的 ${f.gears[2].ratio} 倍，因为还乘了减速机效率 0.95。` },
      { q: '三相电流有多大？', a: `按 ${f.speed.hz}Hz 算：${f.currents.map(c => `${c.volt}V 下 ${c.amp}A`).join('，')}。这是取功率因数 ${f.pf}、效率 ${f.eff} 作代表值的估算，有铭牌数据就用铭牌。` },
    ],
    f => [
      { q: `${dot(f)} 馬達的扭矩是多少 N·m？`, a: `${f.torque}N·m。把功率 ${f.watts}W 除以角速度 ${f.omega}rad/s 得到，換成 kgf·m 是 ${f.kgfm}，換成 lb·ft 是 ${f.lbft}。` },
      { q: `接上 ${f.gears[2].ratio}:1 的減速機會怎樣？`, a: `轉速降到 ${f.gears[2].rpm}rpm，扭矩升到 ${f.gears[2].torque}N·m。不是乾乾淨淨的 ${f.gears[2].ratio} 倍，因為還乘了減速機效率 0.95。` },
      { q: '三相電流有多大？', a: `按 ${f.speed.hz}Hz 算：${f.currents.map(c => `${c.volt}V 下 ${c.amp}A`).join('，')}。這是取功率因數 ${f.pf}、效率 ${f.eff} 作代表值的估算，有銘牌資料就用銘牌。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const MOTOR_UI: L<MotorUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<MotorUI>;
