/**
 * 마우스 감도 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "감도 표는 자료가 아니라 게임 상수 하나에서 계산된다"이다.
 * 게임마다 마우스 카운트 하나가 시야를 돌리는 각(yaw)이 정해져 있고, 그것과
 * DPI만 있으면 360°를 돌리는 거리·eDPI·다른 게임의 같은 감도가 모두 따라 나온다.
 * 그리고 **무엇을 넣지 않았는지 같이 말한다** — 마우스 가속, 조준 배수, 그리고
 * yaw를 확인하지 못해 뺀 게임들.
 *
 * ── 소수점 기호 ──────────────────────────────────────────
 * es·pt·de·fr는 소수점에 쉼표를 쓴다(51,95cm). 표와 본문이 어긋나면 같은 값이 한
 * 화면에서 두 얼굴이 되므로, 문장 안의 숫자는 nc()로 갈아 끼우고 화면 컴포넌트는
 * fmtNum()을 쓴다 — 두 곳이 같은 규칙 하나를 본다. 천 단위 구분표는 아무 언어에서도
 * 쓰지 않는다(eDPI 2078을 "2,078"로 적으면 쉼표 언어에서 소수로 읽힌다).
 *
 * ── 게임 이름은 번역하지 않는다 ────────────────────────────
 * 상표라 열 언어가 같은 글자를 쓴다(list.ts). 그래서 칸 이름은 게임 이름 둘레의
 * 조사·전치사만 언어마다 다르다 — PAIR_NAME과 POINT_NAME이 그 자리다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { DpiFacts, PairFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface DpiUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;

  gameLabel: string;
  dpiLabel: string;
  yawLabel: string;
  targetLabel: string;
  inchLabel: string;
  sensLabel: string;
  edpiLabel: string;
  countsLabel: string;
  factorLabel: string;
  backLabel: string;

  /** yaw가 같아 감도 숫자가 안 바뀌는 자리 — 곱수 1을 적는 대신 이 말을 쓴다 */
  sameNumber: string;
  sameNote: string;
  /** 쌍 표가 800 DPI 기준이라는 것과, 곱수가 DPI와 무관하다는 것 */
  refDpiNote: string;

  formulaTitle: string;
  formulaNote: string;
  edpiTitle: string;
  edpiNote: string;
  convertTitle: string;
  convertNote: string;
  targetTitle: string;
  targetNote: string;
  limitTitle: string;
  limitNote: string;

  aimTitle: string;
  aimNote: string;
  aimLink: string;

  tableTitle: string;
  dpiTableTitle: string;
  neighbourTitle: string;
  pairRowTitle: string;
  pointRowTitle: string;
  reverseLabel: string;

  desc: (f: DpiFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;

  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: DpiFacts) => string;
  metaDesc: (f: DpiFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: DpiFacts) => FaqItem[];
}

/** 소수점에 쉼표를 쓰는 언어 */
const COMMA_LANGS: ReadonlySet<Lang> = new Set<Lang>(['es', 'pt', 'de', 'fr']);

/** 화면 컴포넌트가 쓰는 자리 — 문장 쪽의 nc()와 같은 규칙이다 */
export const fmtNum = (lang: Lang, x: number): string =>
  COMMA_LANGS.has(lang) ? String(x).replace('.', ',') : String(x);

/** 쉼표 언어의 문장 안에서 쓴다 */
const nc = (x: number): string => String(x).replace('.', ',');

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 쌍 칸의 이름 — 게임 이름은 그대로 두고 둘레만 그 언어로 적는다 */
const PAIR_NAME: L<(a: string, b: string) => string> = T<(a: string, b: string) => string>(
  (a, b) => `${a} → ${b} 감도 변환`,
  (a, b) => `${a} to ${b} sensitivity`,
  (a, b) => `Sensibilidad de ${a} a ${b}`,
  (a, b) => `Sensibilidade de ${a} para ${b}`,
  (a, b) => `${a}から${b}への感度`,
  (a, b) => `Empfindlichkeit von ${a} zu ${b}`,
  (a, b) => `Sensibilité de ${a} vers ${b}`,
  (a, b) => `${a} से ${b} संवेदनशीलता`,
  (a, b) => `${a} 到 ${b} 灵敏度`,
  (a, b) => `${a} 到 ${b} 靈敏度`,
);

/** 낱점 칸의 이름 */
const POINT_NAME: L<(g: string, dpi: number) => string> = T<(g: string, dpi: number) => string>(
  (g, dpi) => `${g} ${dpi} DPI 감도표`,
  (g, dpi) => `${g} at ${dpi} DPI`,
  (g, dpi) => `${g} a ${dpi} DPI`,
  (g, dpi) => `${g} com ${dpi} DPI`,
  (g, dpi) => `${g} ${dpi} DPIの感度表`,
  (g, dpi) => `${g} bei ${dpi} DPI`,
  (g, dpi) => `${g} à ${dpi} DPI`,
  (g, dpi) => `${g} ${dpi} DPI पर`,
  (g, dpi) => `${g} ${dpi} DPI 灵敏度表`,
  (g, dpi) => `${g} ${dpi} DPI 靈敏度表`,
);

/** 칸 이름 — 화면과 검사가 같은 함수를 본다 */
export const cellName = (lang: Lang, f: DpiFacts): string =>
  f.kind === 'pair'
    ? PAIR_NAME[lang](f.from.short, f.to.short)
    : POINT_NAME[lang](f.game.short, f.dpi);

/**
 * 곱수를 적는 말.
 *
 * yaw가 같은 쌍에는 곱수 1을 적지 않는다. "× 1"은 계산이 맞다는 말이지 답이 아니고,
 * 찾던 답은 "숫자를 그대로 옮겨도 된다"이기 때문이다(list.ts 머리말).
 */
export const factorText = (lang: Lang, f: PairFacts): string =>
  f.same ? DPI_UI[lang].sameNumber : `× ${fmtNum(lang, f.factor)}`;

/** 되돌리는 곱수 — 같은 계열이면 되돌릴 것도 없다 */
export const backText = (lang: Lang, f: PairFacts): string =>
  f.same ? DPI_UI[lang].sameNumber : `× ${fmtNum(lang, f.back)}`;

type Spec = { [K in keyof DpiUI]: L<DpiUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),

  section: T(
    '마우스 감도와 DPI',
    'Mouse sensitivity and DPI',
    'Sensibilidad del ratón y DPI',
    'Sensibilidade do mouse e DPI',
    'マウス感度とDPI',
    'Mausempfindlichkeit und DPI',
    'Sensibilité de la souris et DPI',
    'माउस संवेदनशीलता और DPI',
    '鼠标灵敏度与 DPI',
    '滑鼠靈敏度與 DPI',
  ),

  hubTitle: T(
    '마우스 감도 128칸 — 소스 계열 eDPI 800은 51.95cm/360°',
    '128 sensitivity cells — eDPI 800 on the Source family turns 360° in 51.95 cm',
    '128 casillas de sensibilidad — eDPI 800 en la familia Source gira 360° en 51,95 cm',
    '128 casos de sensibilidade — eDPI 800 na família Source gira 360° em 51,95 cm',
    'マウス感度128マス — ソース系のeDPI 800は51.95cm/360°',
    '128 Empfindlichkeitsfelder — eDPI 800 der Source-Familie dreht 360° in 51,95 cm',
    '128 cases de sensibilité — eDPI 800 sur la famille Source tourne de 360° en 51,95 cm',
    'संवेदनशीलता के 128 खाने — Source परिवार में eDPI 800 पर 360° के लिए 51.95 cm',
    '鼠标灵敏度 128 格 — Source 系的 eDPI 800 转一圈是 51.95 cm',
    '滑鼠靈敏度 128 格 — Source 系的 eDPI 800 轉一圈是 51.95 cm',
  ),

  hubLead: T(
    '게임 여덟과 DPI 아홉, 목표 거리 여덟이 만드는 128칸입니다. 감도 표를 옮겨 적은 것이 아니라, 게임마다 하나뿐인 상수(마우스 카운트 하나가 시야를 돌리는 각)에서 계산했습니다. 감도는 목표 cm/360°에서 거꾸로 구합니다 — 물리량이 축이고 감도가 답입니다. 상수를 확인하지 못한 게임은 넣지 않았습니다.',
    'Eight games, nine DPI steps and eight target distances make 128 cells. Nothing is copied from a sensitivity table: each game has exactly one constant — the angle one mouse count turns the view — and everything follows from it. Sensitivity is worked out backwards from a target cm/360°, so the physical distance is the axis and the sensitivity is the answer. Games whose constant could not be confirmed are left out.',
    'Ocho juegos, nueve pasos de DPI y ocho distancias objetivo dan 128 casillas. No hay tabla de sensibilidad copiada: cada juego tiene una sola constante —el ángulo que gira la vista con un conteo del ratón— y de ahí sale todo. La sensibilidad se despeja al revés desde un cm/360° objetivo, así que la distancia física es el eje y la sensibilidad es la respuesta. Los juegos cuya constante no se pudo confirmar quedan fuera.',
    'Oito jogos, nove passos de DPI e oito distâncias alvo formam 128 casos. Nada é copiado de tabela de sensibilidade: cada jogo tem uma única constante — o ângulo que um conteo do mouse gira a vista — e tudo decorre dela. A sensibilidade sai ao contrário, a partir de um cm/360° alvo, então a distância física é o eixo e a sensibilidade é a resposta. Jogos cuja constante não pôde ser confirmada ficaram de fora.',
    'ゲーム8種・DPI 9種・目標距離8種が交わる128マスです。感度表を写したものではなく、ゲームごとに一つだけある定数(マウスカウント1で視点が回る角)から計算しました。感度は目標のcm/360°から逆に求めます — 物理量が軸で、感度が答えです。定数を確認できなかったゲームは入れていません。',
    'Acht Spiele, neun DPI-Stufen und acht Zieldistanzen ergeben 128 Felder. Nichts ist aus einer Empfindlichkeitstabelle abgeschrieben: Jedes Spiel hat genau eine Konstante — den Winkel, den ein Mauszählschritt die Sicht dreht — und alles folgt daraus. Die Empfindlichkeit wird rückwärts aus einem Ziel-cm/360° bestimmt, die physikalische Strecke ist also die Achse und die Empfindlichkeit die Antwort. Spiele mit unbestätigter Konstante fehlen.',
    'Huit jeux, neuf paliers de DPI et huit distances cibles donnent 128 cases. Rien n’est recopié d’une table de sensibilité : chaque jeu a une seule constante — l’angle dont un pas de souris fait tourner la vue — et tout en découle. La sensibilité est calculée à l’envers depuis un cm/360° cible : la distance physique est l’axe et la sensibilité la réponse. Les jeux dont la constante n’a pas pu être vérifiée sont écartés.',
    'आठ गेम, नौ DPI चरण और आठ लक्ष्य दूरियाँ मिलकर 128 खाने बनाती हैं। कोई संवेदनशीलता तालिका नहीं उतारी गई: हर गेम में ठीक एक स्थिरांक है — माउस की एक गिनती दृश्य को जितने कोण घुमाती है — और बाकी सब उसी से निकलता है। संवेदनशीलता लक्ष्य cm/360° से उलटी दिशा में निकाली जाती है, यानी भौतिक दूरी अक्ष है और संवेदनशीलता उत्तर। जिन गेमों का स्थिरांक पक्का नहीं हो सका, उन्हें छोड़ दिया गया है।',
    '八款游戏、九档 DPI 和八个目标距离，组成 128 格。这不是抄来的灵敏度表：每款游戏只有一个常数 — 鼠标走一个计数时视角转过的角度 — 其余全部由它算出。灵敏度是从目标 cm/360° 反推的，也就是说物理距离是轴，灵敏度才是答案。常数无法确认的游戏没有收录。',
    '八款遊戲、九檔 DPI 和八個目標距離，組成 128 格。這不是抄來的靈敏度表：每款遊戲只有一個常數 — 滑鼠走一個計數時視角轉過的角度 — 其餘全部由它算出。靈敏度是從目標 cm/360° 反推的，也就是說物理距離是軸，靈敏度才是答案。常數無法確認的遊戲沒有收錄。',
  ),

  gameLabel: T('게임', 'Game', 'Juego', 'Jogo', 'ゲーム', 'Spiel', 'Jeu', 'गेम', '游戏', '遊戲'),
  dpiLabel: T('DPI', 'DPI', 'DPI', 'DPI', 'DPI', 'DPI', 'DPI', 'DPI', 'DPI', 'DPI'),
  yawLabel: T(
    '게임 상수 (yaw)', 'Game constant (yaw)', 'Constante del juego (yaw)', 'Constante do jogo (yaw)',
    'ゲーム定数 (yaw)', 'Spielkonstante (yaw)', 'Constante du jeu (yaw)', 'गेम स्थिरांक (yaw)',
    '游戏常数 (yaw)', '遊戲常數 (yaw)',
  ),
  targetLabel: T(
    '목표 cm/360°', 'Target cm/360°', 'cm/360° objetivo', 'cm/360° alvo', '目標 cm/360°',
    'Ziel-cm/360°', 'cm/360° cible', 'लक्ष्य cm/360°', '目标 cm/360°', '目標 cm/360°',
  ),
  inchLabel: T('인치', 'Inches', 'Pulgadas', 'Polegadas', 'インチ', 'Zoll', 'Pouces', 'इंच', '英寸', '英吋'),
  sensLabel: T(
    '감도', 'Sensitivity', 'Sensibilidad', 'Sensibilidade', '感度',
    'Empfindlichkeit', 'Sensibilité', 'संवेदनशीलता', '灵敏度', '靈敏度',
  ),
  edpiLabel: T('eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI', 'eDPI'),
  countsLabel: T(
    '360°에 드는 마우스 카운트', 'Mouse counts per 360°', 'Conteos del ratón por 360°',
    'Contagens do mouse por 360°', '360°あたりのマウスカウント', 'Mauszählschritte pro 360°',
    'Pas de souris pour 360°', '360° के लिए माउस गिनती', '每 360° 的鼠标计数', '每 360° 的滑鼠計數',
  ),
  factorLabel: T('곱수', 'Multiplier', 'Multiplicador', 'Multiplicador', '倍率', 'Faktor', 'Facteur', 'गुणक', '倍数', '倍數'),
  backLabel: T(
    '되돌리는 곱수', 'Multiplier back', 'Multiplicador de vuelta', 'Multiplicador de volta',
    '戻す倍率', 'Faktor zurück', 'Facteur retour', 'वापसी गुणक', '还原倍数', '還原倍數',
  ),

  sameNumber: T(
    '그대로 — 같은 엔진 계열',
    'Unchanged — same engine family',
    'Sin cambio: misma familia de motor',
    'Sem mudança: mesma família de motor',
    'そのまま — 同じエンジン系',
    'Unverändert — dieselbe Engine-Familie',
    'Inchangée — même famille de moteur',
    'वही रहती है — एक ही एंजिन परिवार',
    '不用改 — 同一引擎系',
    '不用改 — 同一引擎系',
  ),
  sameNote: T(
    '두 게임의 상수가 같습니다. 감도 숫자를 그대로 옮겨 적으면 마우스를 미는 거리도 같습니다 — 곱수 1을 적는 것보다 이 말이 찾던 답에 가깝습니다. 0.022는 퀘이크에서 온 값이고 소스 엔진이 그것을 물려받았기 때문에, 그 계열로 만든 게임끼리는 숫자가 통합니다.',
    'The two games share the same constant, so you can type the sensitivity across unchanged and your hand travels the same distance. Saying that is more useful than printing a multiplier of 1. The value 0.022 comes from Quake, the Source engine inherited it, and every game built on that lineage speaks the same number.',
    'Los dos juegos comparten la misma constante: puedes escribir la sensibilidad tal cual y la mano recorre la misma distancia. Decirlo así es más útil que imprimir un multiplicador de 1. El valor 0,022 viene de Quake, el motor Source lo heredó y todos los juegos de esa estirpe hablan el mismo número.',
    'Os dois jogos partilham a mesma constante: pode escrever a sensibilidade tal como está e a mão percorre a mesma distância. Dizer isso é mais útil do que imprimir um multiplicador de 1. O valor 0,022 vem do Quake, o motor Source herdou-o e todos os jogos dessa linhagem falam o mesmo número.',
    '二つのゲームの定数が同じです。感度の数字をそのまま移せば、マウスを動かす距離も同じになります — 倍率1と書くより、この言い方のほうが求めていた答えに近いです。0.022はクエイクから来た値で、ソースエンジンがそれを受け継いだため、その系列のゲーム同士では数字が通じます。',
    'Beide Spiele teilen dieselbe Konstante: Du kannst die Empfindlichkeit unverändert übernehmen, und die Hand legt dieselbe Strecke zurück. Das zu sagen hilft mehr als ein ausgedruckter Faktor 1. Der Wert 0,022 stammt aus Quake, die Source-Engine hat ihn übernommen, und jedes Spiel dieser Linie spricht dieselbe Zahl.',
    'Les deux jeux partagent la même constante : vous pouvez reporter la sensibilité telle quelle, la main parcourt la même distance. Le dire vaut mieux qu’afficher un facteur de 1. La valeur 0,022 vient de Quake, le moteur Source l’a héritée, et tous les jeux de cette lignée parlent le même chiffre.',
    'दोनों गेमों का स्थिरांक एक ही है, इसलिए संवेदनशीलता का अंक जैसा है वैसा ही लिख दें — हाथ उतनी ही दूरी तय करेगा। यह कहना गुणक 1 छापने से ज़्यादा काम का है। 0.022 का मान Quake से आया, Source एंजिन ने उसे अपनाया, और उस वंश के सभी गेम वही अंक बोलते हैं।',
    '两款游戏的常数相同，把灵敏度数字照搬过去，手移动的距离也一样 — 这句话比印一个倍数 1 更接近你要的答案。0.022 这个值来自 Quake，Source 引擎继承了它，这一脉做出来的游戏彼此的数字是通的。',
    '兩款遊戲的常數相同，把靈敏度數字照搬過去，手移動的距離也一樣 — 這句話比印一個倍數 1 更接近你要的答案。0.022 這個值來自 Quake，Source 引擎繼承了它，這一脈做出來的遊戲彼此的數字是通的。',
  ),
  refDpiNote: T(
    '아래 표는 800 DPI를 기준으로 적었습니다. 곱수는 DPI가 식에서 빠지므로 어느 DPI에서도 같습니다 — 마우스 설정을 건드리지 않는다면 표의 곱수를 그대로 쓰면 됩니다.',
    'The table below is written at 800 DPI. The multiplier itself does not depend on DPI — it drops out of the formula — so as long as you leave the mouse alone, the same multiplier works at any DPI.',
    'La tabla de abajo está escrita a 800 DPI. El multiplicador no depende de los DPI —desaparece de la fórmula—, así que mientras no toques el ratón sirve el mismo multiplicador con cualquier DPI.',
    'A tabela abaixo está escrita a 800 DPI. O multiplicador não depende do DPI — ele sai da fórmula —, então enquanto você não mexer no mouse o mesmo multiplicador vale em qualquer DPI.',
    '下の表は800 DPIを基準に書いています。倍率はDPIが式から消えるため、どのDPIでも同じです — マウス側の設定を変えないなら、表の倍率をそのまま使えます。',
    'Die Tabelle unten ist auf 800 DPI geschrieben. Der Faktor selbst hängt nicht von der DPI ab — sie fällt aus der Formel heraus —, solange du die Maus nicht anfasst, gilt derselbe Faktor bei jeder DPI.',
    'Le tableau ci-dessous est écrit à 800 DPI. Le facteur ne dépend pas des DPI — ils disparaissent de la formule — donc tant que vous ne touchez pas à la souris, le même facteur vaut à n’importe quel DPI.',
    'नीचे की तालिका 800 DPI पर लिखी है। गुणक DPI पर निर्भर नहीं करता — वह सूत्र से निकल जाता है — इसलिए जब तक माउस की सेटिंग नहीं बदलते, वही गुणक किसी भी DPI पर चलता है।',
    '下面的表按 800 DPI 写。倍数本身与 DPI 无关 — 它在公式里被约掉了 — 只要不改鼠标设置，同一个倍数在任何 DPI 都成立。',
    '下面的表按 800 DPI 寫。倍數本身與 DPI 無關 — 它在公式裡被約掉了 — 只要不改滑鼠設定，同一個倍數在任何 DPI 都成立。',
  ),

  formulaTitle: T(
    'cm/360°는 마우스 카운트에서 나온다',
    'A cm/360° figure is really a count of mouse steps',
    'El cm/360° sale del conteo del ratón',
    'O cm/360° sai da contagem do mouse',
    'cm/360°はマウスカウントから出る',
    'Das cm/360° kommt aus den Mauszählschritten',
    'Le cm/360° vient du comptage de la souris',
    'cm/360° माउस की गिनती से निकलता है',
    'cm/360° 来自鼠标的计数',
    'cm/360° 來自滑鼠的計數',
  ),
  formulaNote: T(
    '게임마다 마우스 카운트 하나가 시야를 몇 도 돌리는지가 상수로 정해져 있습니다(yaw). 소스 계열은 콘솔 변수 m_yaw의 기본값 0.022가 그대로 드러나 있고, 발로란트는 0.07, 오버워치는 0.0066입니다. 360°를 돌리려면 360 ÷ (yaw × 감도) 카운트가 필요하고, DPI는 1인치를 미는 동안 나오는 카운트 수이므로 거리는 그 카운트 ÷ DPI 인치입니다. 인치를 센티미터로 바꾸면 cm/360° = 2.54 × 360 ÷ (yaw × 감도 × DPI)가 됩니다. 소스 계열 400 DPI 감도 2.0이 51.95cm인 것은 이 식에서 나오는 값이고, 널리 공표돼 있어 계산을 되짚는 자리로 쓸 수 있습니다.',
    'Every game fixes, as a constant, how many degrees one mouse count turns the view — its yaw. The Source family exposes it directly as the default of the console variable m_yaw, 0.022; VALORANT uses 0.07 and Overwatch 0.0066. Turning a full 360° therefore takes 360 ÷ (yaw × sensitivity) counts, and since DPI is how many counts come out of one inch of movement, the distance is that count ÷ DPI inches. Converting to centimetres gives cm/360° = 2.54 × 360 ÷ (yaw × sensitivity × DPI). The Source family at 400 DPI and sensitivity 2.0 comes out at 51.95 cm, a widely published figure, which makes it a good place to check the arithmetic from the outside.',
    'Cada juego fija como constante cuántos grados gira la vista con un conteo del ratón: su yaw. La familia Source lo expone tal cual en el valor por defecto de la variable de consola m_yaw, 0,022; VALORANT usa 0,07 y Overwatch 0,0066. Girar 360° completos pide entonces 360 ÷ (yaw × sensibilidad) conteos y, como los DPI son cuántos conteos salen de una pulgada de movimiento, la distancia es ese conteo ÷ DPI pulgadas. Pasando a centímetros: cm/360° = 2,54 × 360 ÷ (yaw × sensibilidad × DPI). La familia Source a 400 DPI con sensibilidad 2,0 da 51,95 cm, una cifra muy publicada, y por eso sirve para comprobar la cuenta desde fuera.',
    'Cada jogo fixa como constante quantos graus a vista gira com uma contagem do mouse: o seu yaw. A família Source expõe-no tal como está, no valor padrão da variável de consola m_yaw, 0,022; o VALORANT usa 0,07 e o Overwatch 0,0066. Girar 360° completos pede então 360 ÷ (yaw × sensibilidade) contagens e, como o DPI é quantas contagens saem de uma polegada de movimento, a distância é essa contagem ÷ DPI polegadas. Passando a centímetros: cm/360° = 2,54 × 360 ÷ (yaw × sensibilidade × DPI). A família Source a 400 DPI com sensibilidade 2,0 dá 51,95 cm, um número muito divulgado, e por isso serve para verificar a conta de fora.',
    'ゲームごとに、マウスカウント1で視点が何度回るかが定数として決まっています(yaw)。ソース系はコンソール変数m_yawの既定値0.022がそのまま出ていて、ヴァロラントは0.07、オーバーウォッチは0.0066です。360°回すには360 ÷ (yaw × 感度)カウントが必要で、DPIは1インチ動かす間に出るカウント数なので、距離はそのカウント ÷ DPIインチになります。センチメートルに直すとcm/360° = 2.54 × 360 ÷ (yaw × 感度 × DPI)です。ソース系の400 DPI・感度2.0が51.95cmになるのはこの式から出る値で、広く公表されているので計算を外から確かめる足場になります。',
    'Jedes Spiel legt als Konstante fest, um wie viele Grad ein Mauszählschritt die Sicht dreht — seinen Yaw. Die Source-Familie zeigt ihn direkt im Standardwert der Konsolenvariablen m_yaw, 0,022; VALORANT nutzt 0,07 und Overwatch 0,0066. Eine volle 360°-Drehung braucht also 360 ÷ (Yaw × Empfindlichkeit) Schritte, und da DPI angibt, wie viele Schritte auf einen Zoll Bewegung kommen, ist die Strecke dieser Wert ÷ DPI Zoll. In Zentimetern: cm/360° = 2,54 × 360 ÷ (Yaw × Empfindlichkeit × DPI). Die Source-Familie mit 400 DPI und Empfindlichkeit 2,0 ergibt 51,95 cm — eine weit veröffentlichte Zahl und damit ein guter Prüfstein von außen.',
    'Chaque jeu fixe comme constante de combien de degrés un pas de souris fait tourner la vue : son yaw. La famille Source l’expose telle quelle dans la valeur par défaut de la variable de console m_yaw, 0,022 ; VALORANT utilise 0,07 et Overwatch 0,0066. Tourner de 360° complets demande donc 360 ÷ (yaw × sensibilité) pas, et comme les DPI disent combien de pas sortent d’un pouce de mouvement, la distance vaut ce nombre ÷ DPI pouces. En centimètres : cm/360° = 2,54 × 360 ÷ (yaw × sensibilité × DPI). La famille Source à 400 DPI et sensibilité 2,0 donne 51,95 cm, chiffre largement publié, ce qui en fait un bon point de contrôle extérieur.',
    'हर गेम एक स्थिरांक तय करता है — माउस की एक गिनती दृश्य को कितने अंश घुमाती है, यानी उसका yaw। Source परिवार इसे कंसोल वेरिएबल m_yaw के डिफ़ॉल्ट 0.022 के रूप में सीधे दिखाता है; VALORANT 0.07 और Overwatch 0.0066 लेता है। पूरे 360° घूमने के लिए 360 ÷ (yaw × संवेदनशीलता) गिनतियाँ चाहिए, और DPI बताता है कि एक इंच चलने पर कितनी गिनतियाँ निकलती हैं, तो दूरी उतनी गिनती ÷ DPI इंच है। सेंटीमीटर में: cm/360° = 2.54 × 360 ÷ (yaw × संवेदनशीलता × DPI)। Source परिवार में 400 DPI और संवेदनशीलता 2.0 पर 51.95 cm आता है — यह आँकड़ा व्यापक रूप से प्रकाशित है, इसलिए बाहर से गणित जाँचने की अच्छी जगह है।',
    '每款游戏都把「鼠标走一个计数时视角转过多少度」定成常数，也就是 yaw。Source 系直接把它摆在控制台变量 m_yaw 的默认值 0.022 上；VALORANT 用 0.07，Overwatch 用 0.0066。转满 360° 需要 360 ÷ (yaw × 灵敏度) 个计数，而 DPI 就是移动一英寸能产出多少计数，所以距离是这个计数 ÷ DPI 英寸。换成厘米：cm/360° = 2.54 × 360 ÷ (yaw × 灵敏度 × DPI)。Source 系在 400 DPI、灵敏度 2.0 下得到 51.95 cm，这个数字流传很广，正好可以从外部核对这套算式。',
    '每款遊戲都把「滑鼠走一個計數時視角轉過多少度」定成常數，也就是 yaw。Source 系直接把它擺在主控台變數 m_yaw 的預設值 0.022 上；VALORANT 用 0.07，Overwatch 用 0.0066。轉滿 360° 需要 360 ÷ (yaw × 靈敏度) 個計數，而 DPI 就是移動一英吋能產出多少計數，所以距離是這個計數 ÷ DPI 英吋。換成公分：cm/360° = 2.54 × 360 ÷ (yaw × 靈敏度 × DPI)。Source 系在 400 DPI、靈敏度 2.0 下得到 51.95 cm，這個數字流傳很廣，正好可以從外部核對這套算式。',
  ),

  edpiTitle: T(
    'eDPI는 DPI와 감도를 곱한 값이다',
    'eDPI is DPI multiplied by sensitivity',
    'eDPI son los DPI multiplicados por la sensibilidad',
    'eDPI é o DPI multiplicado pela sensibilidade',
    'eDPIはDPIと感度の積である',
    'eDPI ist DPI mal Empfindlichkeit',
    'L’eDPI est le produit des DPI par la sensibilité',
    'eDPI का अर्थ DPI गुणा संवेदनशीलता है',
    'eDPI 就是 DPI 乘灵敏度',
    'eDPI 就是 DPI 乘靈敏度',
  ),
  edpiNote: T(
    '한 게임 안에서는 eDPI가 같으면 cm/360°도 같습니다. 800 DPI 감도 1.0과 1600 DPI 감도 0.5는 둘 다 eDPI 800이고, 마우스를 미는 거리가 한 밀리미터도 다르지 않습니다 — DPI를 두 배로 하고 감도를 반으로 하면 그대로라는 말이 그 뜻입니다. 위 식에 넣어 보면 eDPI = 2.54 × 360 ÷ (yaw × cm)이 되어 DPI가 아예 사라지므로, 목표 거리가 같으면 어느 DPI에서도 eDPI가 한 값입니다. 다만 eDPI는 **게임을 건너 견줄 수 없습니다.** yaw가 다르면 같은 eDPI가 다른 거리를 돕니다.',
    'Within one game, equal eDPI means equal cm/360°. 800 DPI at sensitivity 1.0 and 1600 DPI at 0.5 are both eDPI 800, and your hand travels the same distance to the millimetre — that is all "double the DPI, halve the sensitivity" means. Put it through the formula and eDPI = 2.54 × 360 ÷ (yaw × cm), with DPI gone entirely: for a given target distance the eDPI is one number at every DPI. What eDPI cannot do is cross games. With a different yaw, the same eDPI turns a different distance.',
    'Dentro de un mismo juego, igual eDPI significa igual cm/360°. 800 DPI con sensibilidad 1,0 y 1600 DPI con 0,5 son ambos eDPI 800, y la mano recorre la misma distancia al milímetro: eso es todo lo que quiere decir «el doble de DPI, la mitad de sensibilidad». Pásalo por la fórmula y queda eDPI = 2,54 × 360 ÷ (yaw × cm), sin DPI a la vista: para una distancia objetivo dada el eDPI es un solo número con cualquier DPI. Lo que el eDPI no puede hacer es cruzar juegos: con otro yaw, el mismo eDPI gira otra distancia.',
    'Dentro de um mesmo jogo, eDPI igual significa cm/360° igual. 800 DPI com sensibilidade 1,0 e 1600 DPI com 0,5 são ambos eDPI 800, e a mão percorre a mesma distância ao milímetro: é só isso que quer dizer «o dobro de DPI, metade da sensibilidade». Passe pela fórmula e fica eDPI = 2,54 × 360 ÷ (yaw × cm), sem DPI nenhum: para uma distância alvo dada o eDPI é um único número em qualquer DPI. O que o eDPI não faz é atravessar jogos: com outro yaw, o mesmo eDPI gira outra distância.',
    '同じゲームの中では、eDPIが同じなら cm/360° も同じです。800 DPI・感度1.0と1600 DPI・感度0.5はどちらもeDPI 800で、マウスを動かす距離は1ミリも違いません — 「DPIを倍にして感度を半分にすれば同じ」とはこの意味です。上の式に入れるとeDPI = 2.54 × 360 ÷ (yaw × cm)となりDPIが完全に消えるので、目標距離が同じならどのDPIでもeDPIは一つの値です。ただしeDPIは**ゲームをまたいで比べられません。** yawが違えば同じeDPIでも回る距離が変わります。',
    'Innerhalb eines Spiels bedeutet gleiche eDPI gleiche cm/360°. 800 DPI mit Empfindlichkeit 1,0 und 1600 DPI mit 0,5 sind beides eDPI 800, und die Hand legt millimetergenau dieselbe Strecke zurück — mehr sagt „doppelte DPI, halbe Empfindlichkeit“ nicht. In die Formel eingesetzt ergibt sich eDPI = 2,54 × 360 ÷ (Yaw × cm), die DPI ist ganz verschwunden: bei gleicher Zieldistanz ist die eDPI bei jeder DPI dieselbe Zahl. Was eDPI nicht kann, ist Spiele vergleichen. Bei anderem Yaw dreht dieselbe eDPI eine andere Strecke.',
    'Au sein d’un même jeu, une eDPI égale donne un cm/360° égal. 800 DPI à 1,0 et 1600 DPI à 0,5 valent tous deux eDPI 800, et la main parcourt la même distance au millimètre : c’est tout ce que veut dire « doubler les DPI, diviser la sensibilité par deux ». Dans la formule, eDPI = 2,54 × 360 ÷ (yaw × cm), les DPI ayant disparu : pour une distance cible donnée, l’eDPI est un seul nombre à n’importe quel DPI. Ce que l’eDPI ne peut pas faire, c’est traverser les jeux. Avec un autre yaw, la même eDPI tourne d’une autre distance.',
    'एक ही गेम के भीतर, बराबर eDPI का मतलब बराबर cm/360° है। 800 DPI पर संवेदनशीलता 1.0 और 1600 DPI पर 0.5 — दोनों eDPI 800 हैं, और हाथ मिलीमीटर तक उतनी ही दूरी तय करता है; «DPI दुगुना, संवेदनशीलता आधी» का इतना ही अर्थ है। सूत्र में रखें तो eDPI = 2.54 × 360 ÷ (yaw × cm) निकलता है और DPI पूरी तरह गायब हो जाता है: एक ही लक्ष्य दूरी के लिए eDPI हर DPI पर एक ही अंक है। जो eDPI नहीं कर सकता वह है गेमों की तुलना — yaw बदलते ही वही eDPI दूसरी दूरी घुमाता है।',
    '在同一款游戏里，eDPI 相同就意味着 cm/360° 相同。800 DPI 配灵敏度 1.0 与 1600 DPI 配 0.5 都是 eDPI 800，手移动的距离连一毫米都不差 — 「DPI 加倍、灵敏度减半」说的就是这件事。代入上面的式子会得到 eDPI = 2.54 × 360 ÷ (yaw × cm)，DPI 完全消失了：目标距离一定，eDPI 在任何 DPI 下都是同一个数。但 eDPI **不能跨游戏比较**。yaw 不同，同样的 eDPI 转过的距离就不一样。',
    '在同一款遊戲裡，eDPI 相同就意味著 cm/360° 相同。800 DPI 配靈敏度 1.0 與 1600 DPI 配 0.5 都是 eDPI 800，手移動的距離連一毫米都不差 — 「DPI 加倍、靈敏度減半」說的就是這件事。代入上面的式子會得到 eDPI = 2.54 × 360 ÷ (yaw × cm)，DPI 完全消失了：目標距離一定，eDPI 在任何 DPI 下都是同一個數。但 eDPI **不能跨遊戲比較**。yaw 不同，同樣的 eDPI 轉過的距離就不一樣。',
  ),

  convertTitle: T(
    '게임을 옮기는 곱수는 상수의 비 하나다',
    'Moving between games is one ratio of constants',
    'Pasar de un juego a otro es una sola razón de constantes',
    'Passar de um jogo para outro é uma única razão de constantes',
    'ゲームを移す倍率は定数の比一つだ',
    'Der Wechsel zwischen Spielen ist ein Verhältnis zweier Konstanten',
    'Passer d’un jeu à l’autre tient à un seul rapport de constantes',
    'गेम बदलने का गुणक स्थिरांकों का एक अनुपात है',
    '换游戏的倍数只是两个常数的比',
    '換遊戲的倍數只是兩個常數的比',
  ),
  convertNote: T(
    '같은 거리를 유지하려면 yaw × 감도가 같아야 하므로, 감도_B = 감도_A × yaw_A ÷ yaw_B입니다. DPI가 식에서 빠지는 것을 눈여겨보세요 — 마우스를 안 건드리면 곱수는 DPI와 무관합니다. A에서 B로 옮긴 뒤 B에서 A로 되돌리면 곱수가 서로 역수이므로 원래 감도가 그대로 나옵니다. 여덟 게임 가운데 여섯이 0.022를 쓰므로 그 여섯끼리는 곱수가 1이고 숫자가 안 바뀝니다.',
    'Holding the distance means holding yaw × sensitivity, so sens_B = sens_A × yaw_A ÷ yaw_B. Notice that DPI drops out: as long as you leave the mouse alone, the multiplier has nothing to do with DPI. Convert A into B and then B back into A and you land on the original number, because the two multipliers are reciprocals. Six of the eight games here use 0.022, so among those six the multiplier is 1 and nothing changes.',
    'Mantener la distancia es mantener yaw × sensibilidad, así que sens_B = sens_A × yaw_A ÷ yaw_B. Fíjate en que los DPI desaparecen: mientras no toques el ratón, el multiplicador no tiene nada que ver con los DPI. Convierte A en B y luego B en A y vuelves al número original, porque los dos multiplicadores son recíprocos. Seis de los ocho juegos usan 0,022, así que entre esos seis el multiplicador es 1 y nada cambia.',
    'Manter a distância é manter yaw × sensibilidade, então sens_B = sens_A × yaw_A ÷ yaw_B. Note que o DPI desaparece: enquanto não mexer no mouse, o multiplicador não tem nada a ver com DPI. Converta A em B e depois B em A e volta ao número original, porque os dois multiplicadores são recíprocos. Seis dos oito jogos usam 0,022, então entre esses seis o multiplicador é 1 e nada muda.',
    '同じ距離を保つにはyaw × 感度が同じでなければならないので、感度_B = 感度_A × yaw_A ÷ yaw_Bです。DPIが式から抜けることに注目してください — マウス側を変えなければ倍率はDPIと無関係です。AからBへ移し、BからAへ戻すと、二つの倍率が互いに逆数なので元の感度に戻ります。八つのうち六つが0.022を使うので、その六つの間では倍率が1で数字が変わりません。',
    'Die Strecke zu halten heißt, Yaw × Empfindlichkeit zu halten, also sens_B = sens_A × Yaw_A ÷ Yaw_B. Beachte, dass die DPI herausfällt: solange du die Maus nicht anfasst, hat der Faktor nichts mit DPI zu tun. Rechne A nach B und dann B zurück nach A, und du landest auf der ursprünglichen Zahl, denn die beiden Faktoren sind Kehrwerte. Sechs der acht Spiele nutzen 0,022, unter diesen sechs ist der Faktor also 1 und nichts ändert sich.',
    'Garder la distance revient à garder yaw × sensibilité, donc sens_B = sens_A × yaw_A ÷ yaw_B. Remarquez que les DPI disparaissent : tant que vous ne touchez pas la souris, le facteur n’a rien à voir avec les DPI. Convertissez A vers B puis B vers A et vous retombez sur le nombre de départ, car les deux facteurs sont inverses. Six des huit jeux utilisent 0,022 : entre ces six, le facteur vaut 1 et rien ne change.',
    'दूरी बनाए रखने का मतलब yaw × संवेदनशीलता बनाए रखना है, इसलिए sens_B = sens_A × yaw_A ÷ yaw_B। ध्यान दें कि DPI निकल जाता है: जब तक माउस को नहीं छूते, गुणक का DPI से कोई नाता नहीं। A से B और फिर B से A करें तो मूल अंक ही वापस मिलता है, क्योंकि दोनों गुणक एक-दूसरे के व्युत्क्रम हैं। आठ में छह गेम 0.022 लेते हैं, इसलिए उन छह के बीच गुणक 1 है और कुछ नहीं बदलता।',
    '要保持距离不变，就得让 yaw × 灵敏度不变，于是 灵敏度_B = 灵敏度_A × yaw_A ÷ yaw_B。注意 DPI 被约掉了：只要不动鼠标，倍数与 DPI 无关。把 A 换成 B，再把 B 换回 A，会回到原来的数字，因为两个倍数互为倒数。八款游戏里有六款用 0.022，所以这六款之间倍数是 1，数字不用改。',
    '要保持距離不變，就得讓 yaw × 靈敏度不變，於是 靈敏度_B = 靈敏度_A × yaw_A ÷ yaw_B。注意 DPI 被約掉了：只要不動滑鼠，倍數與 DPI 無關。把 A 換成 B，再把 B 換回 A，會回到原來的數字，因為兩個倍數互為倒數。八款遊戲裡有六款用 0.022，所以這六款之間倍數是 1，數字不用改。',
  ),

  targetTitle: T(
    '왜 감도가 아니라 거리를 축으로 두는가',
    'Why the axis is a distance and not a sensitivity',
    'Por qué el eje es una distancia y no una sensibilidad',
    'Por que o eixo é uma distância e não uma sensibilidade',
    'なぜ感度ではなく距離を軸にするのか',
    'Warum die Achse eine Strecke ist und keine Empfindlichkeit',
    'Pourquoi l’axe est une distance et non une sensibilité',
    'अक्ष संवेदनशीलता क्यों नहीं, दूरी क्यों है',
    '为什么用距离而不是灵敏度做轴',
    '為什麼用距離而不是靈敏度做軸',
  ),
  targetNote: T(
    '감도 숫자는 게임마다 뜻이 다릅니다. 어떤 게임에서 0.4는 느리고 다른 게임에서는 빠릅니다. 반면 360°를 돌리는 데 마우스를 미는 거리는 게임과 무관한 물리량이라 어디서나 같은 뜻입니다. 그래서 이 표는 20cm부터 60cm까지를 축으로 두고 감도를 거꾸로 구합니다. 20cm는 손목만 쓰는 빠른 쪽, 60cm는 팔로 미는 느린 쪽이고 대부분의 사람이 이 안에 있습니다. 감도 값을 표로 적어 두지 않은 것은, 그렇게 적어 두면 게임이 슬라이더를 바꾸는 순간 통째로 거짓이 되기 때문입니다.',
    'A sensitivity number means something different in every game: 0.4 is slow in one and fast in another. The distance your hand pushes to spin 360°, on the other hand, is a physical quantity and means the same thing everywhere. So this table takes 20 cm to 60 cm as its axis and solves for the sensitivity. Twenty centimetres is the wrist-only fast end, sixty is the arm-driven slow end, and most players sit inside that range. No sensitivity values are written down anywhere, because a written table turns false the moment a game changes its slider.',
    'Un número de sensibilidad significa algo distinto en cada juego: 0,4 es lento en uno y rápido en otro. La distancia que empuja la mano para girar 360°, en cambio, es una magnitud física y significa lo mismo en todas partes. Por eso esta tabla toma de 20 cm a 60 cm como eje y despeja la sensibilidad. Veinte centímetros es el extremo rápido, de muñeca; sesenta el extremo lento, de brazo; y casi todo el mundo cae dentro. No hay valores de sensibilidad escritos en ningún sitio, porque una tabla escrita se vuelve falsa en cuanto un juego cambia su control.',
    'Um número de sensibilidade significa coisas diferentes em cada jogo: 0,4 é lento num e rápido noutro. Já a distância que a mão empurra para girar 360° é uma grandeza física e significa o mesmo em qualquer lugar. Por isso esta tabela toma de 20 cm a 60 cm como eixo e resolve a sensibilidade. Vinte centímetros é o extremo rápido, de pulso; sessenta o extremo lento, de braço; e quase todos ficam dentro. Não há valores de sensibilidade escritos em parte alguma, porque uma tabela escrita fica falsa no momento em que um jogo muda o seu controlo.',
    '感度の数字はゲームごとに意味が違います。あるゲームの0.4は遅く、別のゲームでは速いのです。一方、360°回すためにマウスを動かす距離はゲームに関係のない物理量なので、どこでも同じ意味を持ちます。だからこの表は20cmから60cmを軸に置き、感度を逆に求めます。20cmは手首だけの速い側、60cmは腕で動かす遅い側で、ほとんどの人はこの中に収まります。感度の値を書き並べないのは、書いてしまうとゲームがスライダーを変えた瞬間に丸ごと嘘になるからです。',
    'Eine Empfindlichkeitszahl bedeutet in jedem Spiel etwas anderes: 0,4 ist im einen langsam, im anderen schnell. Die Strecke, die die Hand für eine 360°-Drehung schiebt, ist dagegen eine physikalische Größe und heißt überall dasselbe. Deshalb nimmt diese Tabelle 20 cm bis 60 cm als Achse und löst nach der Empfindlichkeit auf. Zwanzig Zentimeter sind das schnelle Handgelenk-Ende, sechzig das langsame Arm-Ende, und fast alle liegen dazwischen. Nirgends stehen Empfindlichkeitswerte, denn eine geschriebene Tabelle wird falsch, sobald ein Spiel seinen Regler ändert.',
    'Un chiffre de sensibilité ne veut pas dire la même chose d’un jeu à l’autre : 0,4 est lent ici et rapide là. La distance que la main pousse pour tourner de 360° est, elle, une grandeur physique et signifie partout la même chose. Cette table prend donc 20 cm à 60 cm comme axe et calcule la sensibilité. Vingt centimètres, c’est le bout rapide au poignet ; soixante, le bout lent au bras ; et presque tout le monde tient dans cet intervalle. Aucune valeur de sensibilité n’est écrite, car une table écrite devient fausse dès qu’un jeu modifie son curseur.',
    'संवेदनशीलता का अंक हर गेम में कुछ और मतलब रखता है: 0.4 किसी में धीमा है और किसी में तेज़। इसके उलट, 360° घूमने के लिए हाथ जो दूरी धकेलता है वह भौतिक राशि है और हर जगह एक ही अर्थ रखती है। इसलिए यह तालिका 20 cm से 60 cm को अक्ष बनाती है और संवेदनशीलता उलटी दिशा में निकालती है। बीस सेंटीमीटर कलाई वाला तेज़ सिरा है, साठ बाँह वाला धीमा सिरा, और ज़्यादातर लोग इसी बीच रहते हैं। संवेदनशीलता के अंक कहीं लिखे नहीं हैं, क्योंकि लिखी हुई तालिका उस क्षण झूठी हो जाती है जब गेम अपना स्लाइडर बदल देता है।',
    '灵敏度这个数字在每款游戏里意思都不一样：0.4 在一款里慢，在另一款里快。而转满 360° 时手推出去的距离是与游戏无关的物理量，在哪儿都是同一个意思。所以这张表把 20 cm 到 60 cm 当作轴，反过来求灵敏度。20 cm 是只用手腕的快的一端，60 cm 是用手臂推的慢的一端，大多数人都落在这中间。表里任何地方都没有写死灵敏度的数值，因为一旦写下来，游戏改动滑块的那一刻整张表就变成假的。',
    '靈敏度這個數字在每款遊戲裡意思都不一樣：0.4 在一款裡慢，在另一款裡快。而轉滿 360° 時手推出去的距離是與遊戲無關的物理量，在哪兒都是同一個意思。所以這張表把 20 cm 到 60 cm 當作軸，反過來求靈敏度。20 cm 是只用手腕的快的一端，60 cm 是用手臂推的慢的一端，大多數人都落在這中間。表裡任何地方都沒有寫死靈敏度的數值，因為一旦寫下來，遊戲改動滑桿的那一刻整張表就變成假的。',
  ),

  limitTitle: T(
    '무엇을 넣지 않았나',
    'What this leaves out',
    'Qué deja fuera este cálculo',
    'O que este cálculo deixa de fora',
    'ここに入れていないもの',
    'Was hier fehlt',
    'Ce que ce calcul laisse de côté',
    'यह हिसाब क्या छोड़ देता है',
    '这里没有算进去的东西',
    '這裡沒有算進去的東西',
  ),
  limitNote: T(
    '마우스 가속(윈도우의 "포인터 정확도 향상")이나 게임 내 가속이 켜져 있으면 돌아가는 거리가 손 속도에 따라 달라져 이 표가 맞지 않습니다. 운영체제의 포인터 속도가 기본값이 아니면 그 배수도 따로 끼어듭니다. 조준(ADS)·스코프 배수는 별도 설정이라 여기 없습니다 — 이 표는 허리 사격 감도입니다. 감도가 시야각에 묶여 있는 게임(레인보우 식스 시즈)은 상수 하나로 환산되지 않아 넣지 않았고, 포트나이트·콜 오브 듀티·배틀필드·PUBG처럼 축척을 확인하지 못한 게임도 뺐습니다. 확신 없이 넣으면 그 값을 믿고 감도를 바꾼 사람의 조준이 망가지기 때문입니다. 게임마다 슬라이더의 최소·최대와 눈금이 달라, 계산된 값을 그대로 넣지 못하는 자리도 있습니다.',
    'If mouse acceleration is on — Windows “enhance pointer precision” or an in-game equivalent — the distance you turn depends on how fast you move, and this table does not apply. A pointer speed away from the operating system default adds its own multiplier. Aim-down-sights and scope multipliers are separate settings and are not here: these are hipfire numbers. Games whose sensitivity is tied to field of view, such as Rainbow Six Siege, do not reduce to a single constant and are left out, and so are Fortnite, Call of Duty, Battlefield and PUBG, whose scaling could not be confirmed. Publishing an unverified constant would wreck the aim of whoever trusted it. Sliders also differ in minimum, maximum and step, so a computed value is not always one you can actually type in.',
    'Si la aceleración del ratón está activa —«mejorar la precisión del puntero» en Windows o su equivalente en el juego—, la distancia que giras depende de la rapidez del gesto y esta tabla no sirve. Una velocidad de puntero fuera del valor por defecto del sistema añade su propio multiplicador. Los multiplicadores de apuntado y de mira son ajustes aparte y no están aquí: estas cifras son de disparo desde la cadera. Los juegos cuya sensibilidad va atada al campo de visión, como Rainbow Six Siege, no se reducen a una constante y quedan fuera, igual que Fortnite, Call of Duty, Battlefield y PUBG, cuya escala no se pudo confirmar. Publicar una constante sin verificar arruinaría la puntería de quien confiara en ella. Además, los controles difieren en mínimo, máximo y paso, así que un valor calculado no siempre se puede escribir tal cual.',
    'Se a aceleração do mouse estiver ligada — «melhorar a precisão do ponteiro» no Windows ou o equivalente no jogo —, a distância que você gira depende da rapidez do gesto e esta tabela não se aplica. Uma velocidade de ponteiro fora do padrão do sistema acrescenta o seu próprio multiplicador. Os multiplicadores de mira e de luneta são ajustes à parte e não estão aqui: estes números são de tiro pela cintura. Jogos cuja sensibilidade está atada ao campo de visão, como Rainbow Six Siege, não se reduzem a uma constante e ficaram fora, tal como Fortnite, Call of Duty, Battlefield e PUBG, cuja escala não pôde ser confirmada. Publicar uma constante sem verificação estragaria a mira de quem confiasse nela. Os controlos também diferem em mínimo, máximo e passo, então um valor calculado não é sempre um valor que se possa digitar.',
    'マウス加速(ウィンドウズの「ポインターの精度を高める」)やゲーム内加速が有効だと、回る距離が手の速さで変わるためこの表は当てはまりません。OSのポインター速度が既定値でなければ、その倍率も別に入ります。ADSやスコープの倍率は別設定なのでここにはありません — この表は腰だめ撃ちの感度です。感度が視野角に結びついているゲーム(レインボーシックス シージ)は定数一つに落ちないので入れておらず、フォートナイト・コール オブ デューティ・バトルフィールド・PUBGのように倍率を確認できなかったゲームも外しました。確かめずに載せると、その値を信じて感度を変えた人の照準が壊れるからです。スライダーの最小・最大・刻みもゲームごとに違うため、計算した値をそのまま入力できない場合があります。',
    'Ist Mausbeschleunigung aktiv — Windows’ „Zeigerpräzision verbessern“ oder ein spielinternes Gegenstück —, hängt die gedrehte Strecke von der Handgeschwindigkeit ab und diese Tabelle gilt nicht. Eine Zeigergeschwindigkeit abseits des Systemstandards bringt einen eigenen Faktor mit. Multiplikatoren für Kimme und Zielfernrohr sind eigene Einstellungen und fehlen hier: das sind Hüftschuss-Werte. Spiele, deren Empfindlichkeit am Sichtfeld hängt, etwa Rainbow Six Siege, lassen sich nicht auf eine Konstante bringen und bleiben draußen, ebenso Fortnite, Call of Duty, Battlefield und PUBG, deren Skalierung unbestätigt blieb. Eine ungeprüfte Konstante zu veröffentlichen würde das Zielen derer ruinieren, die ihr glauben. Auch Minimum, Maximum und Schrittweite der Regler unterscheiden sich, ein berechneter Wert ist also nicht immer eintragbar.',
    'Si l’accélération de la souris est active — « améliorer la précision du pointeur » sous Windows, ou son équivalent dans le jeu —, la distance parcourue dépend de la vitesse du geste et cette table ne s’applique pas. Une vitesse de pointeur éloignée de la valeur par défaut du système ajoute son propre facteur. Les multiplicateurs de visée et de lunette sont des réglages à part et ne figurent pas ici : ce sont des chiffres de tir à la hanche. Les jeux dont la sensibilité est liée au champ de vision, comme Rainbow Six Siege, ne se ramènent pas à une constante et sont écartés, comme Fortnite, Call of Duty, Battlefield et PUBG, dont l’échelle n’a pas pu être vérifiée. Publier une constante non vérifiée abîmerait la visée de qui lui fait confiance. Les curseurs diffèrent aussi par leur minimum, leur maximum et leur pas : une valeur calculée n’est pas toujours saisissable.',
    'अगर माउस त्वरण चालू है — विंडोज़ का «पॉइंटर परिशुद्धता बढ़ाएँ» या गेम का अपना — तो घूमी दूरी हाथ की गति पर निर्भर करेगी और यह तालिका लागू नहीं होती। ऑपरेटिंग सिस्टम की पॉइंटर गति डिफ़ॉल्ट से हटी हो तो उसका अलग गुणक भी जुड़ जाता है। ADS और स्कोप के गुणक अलग सेटिंग हैं, यहाँ नहीं हैं — ये आँकड़े कमर से चलाने के हैं। जिन गेमों की संवेदनशीलता दृष्टि-क्षेत्र से बँधी है, जैसे Rainbow Six Siege, वे एक स्थिरांक में नहीं सिमटते और छोड़ दिए गए; Fortnite, Call of Duty, Battlefield और PUBG भी छूटे, जिनका पैमाना पक्का नहीं हो सका। बिना पुष्टि स्थिरांक छापना उस व्यक्ति का निशाना बिगाड़ देगा जिसने उस पर भरोसा किया। स्लाइडर के न्यूनतम, अधिकतम और चरण भी अलग-अलग हैं, इसलिए निकाला हुआ अंक हमेशा टाइप किया जा सकने वाला अंक नहीं होता।',
    '如果鼠标加速开着 — Windows 的「提高指针精确度」或游戏自带的 — 转过的距离会随手的快慢而变，这张表就不成立。操作系统的指针速度不在默认档位时，还会多出一个倍数。开镜（ADS）和倍镜的倍率是另外的设置，这里没有 — 这些是腰射的数字。灵敏度绑在视野角上的游戏，比如 Rainbow Six Siege，无法归成一个常数，没有收录；Fortnite、Call of Duty、Battlefield、PUBG 的比例无法确认，也一并排除。没核实就登出来，会毁掉信了它去改设置的人的准心。各游戏滑块的最小值、最大值和步进也不同，算出来的数不一定填得进去。',
    '如果滑鼠加速開著 — Windows 的「提高指標精確度」或遊戲自帶的 — 轉過的距離會隨手的快慢而變，這張表就不成立。作業系統的指標速度不在預設檔位時，還會多出一個倍數。開鏡（ADS）和倍鏡的倍率是另外的設定，這裡沒有 — 這些是腰射的數字。靈敏度綁在視野角上的遊戲，比如 Rainbow Six Siege，無法歸成一個常數，沒有收錄；Fortnite、Call of Duty、Battlefield、PUBG 的比例無法確認，也一併排除。沒核實就登出來，會毀掉信了它去改設定的人的準心。各遊戲滑桿的最小值、最大值和步進也不同，算出來的數不一定填得進去。',
  ),

  aimTitle: T(
    '감도를 바꾼 뒤에는 손이 다시 익어야 한다',
    'After a change, the hand has to relearn',
    'Después de un cambio, la mano tiene que reaprender',
    'Depois de mudar, a mão tem de reaprender',
    '感度を変えたら手が慣れ直す必要がある',
    'Nach einer Änderung muss die Hand neu lernen',
    'Après un changement, la main doit réapprendre',
    'बदलाव के बाद हाथ को फिर से सीखना पड़ता है',
    '改完之后，手需要重新练',
    '改完之後，手需要重新練',
  ),
  aimNote: T(
    '숫자를 옮겨 적는 데는 몇 초면 되지만, 같은 거리에 손이 다시 붙는 데는 며칠이 걸립니다. 조준 연습으로 새 감도에서 지나치는지 모자라는지를 먼저 보고, 표의 이웃 줄에서 한 칸 위나 아래를 잡아 보세요.',
    'Typing the number takes seconds; getting your hand to trust the new distance takes days. Run an aim drill first to see whether you overshoot or undershoot at the new setting, then try one row up or down from the table.',
    'Escribir el número lleva segundos; que la mano confíe en la nueva distancia lleva días. Haz primero un ejercicio de puntería para ver si te pasas o te quedas corto con el nuevo ajuste, y luego prueba una fila arriba o abajo de la tabla.',
    'Escrever o número leva segundos; fazer a mão confiar na nova distância leva dias. Faça primeiro um exercício de mira para ver se passa ou fica curto no novo ajuste e depois experimente uma linha acima ou abaixo da tabela.',
    '数字を書き換えるのは数秒ですが、同じ距離に手が馴染むには数日かかります。まずエイム練習で新しい感度に対して行きすぎるか足りないかを見て、表の隣の行を一つ上か下で試してください。',
    'Die Zahl einzutippen dauert Sekunden, der Hand die neue Strecke beizubringen Tage. Mach zuerst eine Aim-Übung, um zu sehen, ob du bei der neuen Einstellung zu weit oder zu kurz kommst, und probiere dann eine Zeile höher oder tiefer.',
    'Taper le chiffre prend quelques secondes ; faire confiance à la nouvelle distance prend des jours. Faites d’abord un exercice de visée pour voir si vous dépassez ou restez court, puis essayez une ligne au-dessus ou en dessous du tableau.',
    'अंक टाइप करने में सेकंड लगते हैं, पर हाथ को नई दूरी पर भरोसा होने में दिन। पहले एक निशाना अभ्यास करके देखें कि नई सेटिंग पर आप आगे निकलते हैं या पीछे रह जाते हैं, फिर तालिका की एक पंक्ति ऊपर या नीचे आज़माएँ।',
    '改数字只要几秒，让手重新信任这个距离要几天。先做一轮瞄准练习，看看新设置下你是过头还是不够，再试试表里上一行或下一行。',
    '改數字只要幾秒，讓手重新信任這個距離要幾天。先做一輪瞄準練習，看看新設定下你是過頭還是不夠，再試試表裡上一行或下一行。',
  ),
  aimLink: T(
    '조준 연습 열기',
    'Open the aim trainer',
    'Abrir el entrenador de puntería',
    'Abrir o treino de mira',
    'エイム練習を開く',
    'Aim-Training öffnen',
    'Ouvrir l’entraînement de visée',
    'निशाना अभ्यास खोलें',
    '打开瞄准练习',
    '開啟瞄準練習',
  ),

  tableTitle: T('한눈에 보기', 'At a glance', 'De un vistazo', 'De relance', '一覧', 'Auf einen Blick', 'En un coup d’œil', 'एक नज़र में', '一览', '一覽'),
  dpiTableTitle: T(
    '같은 거리를 내는 DPI',
    'The same distance at every DPI',
    'La misma distancia con cada DPI',
    'A mesma distância com cada DPI',
    '同じ距離になるDPI',
    'Dieselbe Strecke bei jeder DPI',
    'La même distance à chaque DPI',
    'हर DPI पर वही दूरी',
    '各档 DPI 下的同一距离',
    '各檔 DPI 下的同一距離',
  ),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Casos próximos', '近いマス', 'Nachbarfälle', 'Cas voisins', 'पास के खाने', '相邻组合', '相鄰組合'),
  pairRowTitle: T(
    '이 게임에서 다른 게임으로',
    'From this game to the others',
    'De este juego a los otros',
    'Deste jogo para os outros',
    'このゲームから他のゲームへ',
    'Von diesem Spiel zu den anderen',
    'De ce jeu vers les autres',
    'इस गेम से दूसरों तक',
    '从这款游戏换到其他游戏',
    '從這款遊戲換到其他遊戲',
  ),
  pointRowTitle: T(
    'DPI별 감도표',
    'Sensitivity by DPI',
    'Sensibilidad según los DPI',
    'Sensibilidade por DPI',
    'DPIごとの感度表',
    'Empfindlichkeit nach DPI',
    'Sensibilité selon les DPI',
    'DPI के अनुसार संवेदनशीलता',
    '按 DPI 的灵敏度表',
    '按 DPI 的靈敏度表',
  ),
  reverseLabel: T(
    '반대 방향',
    'The other direction',
    'La dirección contraria',
    'A direção contrária',
    '逆方向',
    'Die andere Richtung',
    'Le sens inverse',
    'उलटी दिशा',
    '反方向',
    '反方向',
  ),

  desc: T<(f: DpiFacts) => string>(
    f => f.kind === 'pair'
      ? (f.same
        ? `${f.from.name}의 감도는 ${f.to.name}에 그대로 옮겨 적으면 됩니다. 두 게임의 상수가 ${f.from.yaw}으로 같아서, 같은 숫자가 같은 거리를 돕니다. 아래 표는 800 DPI에서 목표 cm/360°마다 두 게임의 감도를 나란히 적은 것입니다.`
        : `${f.from.name}의 감도에 ${f.factor}를 곱하면 ${f.to.name}에서 같은 거리를 돕니다. 상수가 ${f.from.yaw}과 ${f.to.yaw}으로 달라 나오는 비이고, 되돌릴 때는 ${f.back}을 곱합니다. 800 DPI에서 30cm/360°를 내려면 ${f.from.short} ${f.pick.from}, ${f.to.short} ${f.pick.to}입니다.`)
      : `${f.game.name}에서 ${f.dpi} DPI를 쓸 때 30cm/360°가 되는 감도는 ${f.pick.sens}이고 eDPI는 ${f.pick.edpi}입니다. 게임 상수 ${f.game.yaw}과 2.54 × 360 ÷ (상수 × 감도 × DPI)에서 나온 값이며, 아래 표는 20cm부터 60cm까지 여덟 줄을 같은 식으로 계산했습니다.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `A sensitivity from ${f.from.name} can be typed straight into ${f.to.name}. Both games carry the same constant, ${f.from.yaw}, so the same number turns the same distance. The table below sets the two sensitivities side by side at 800 DPI for each target cm/360°.`
        : `Multiply a ${f.from.name} sensitivity by ${f.factor} to turn the same distance in ${f.to.name}. That is the ratio between the constants ${f.from.yaw} and ${f.to.yaw}, and ${f.back} takes you back. At 800 DPI, 30 cm/360° needs ${f.pick.from} in ${f.from.short} and ${f.pick.to} in ${f.to.short}.`)
      : `In ${f.game.name} at ${f.dpi} DPI, 30 cm/360° comes out at sensitivity ${f.pick.sens}, an eDPI of ${f.pick.edpi}. It follows from the game constant ${f.game.yaw} through 2.54 × 360 ÷ (constant × sensitivity × DPI), and the table below works the same formula for eight rows from 20 cm to 60 cm.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `Una sensibilidad de ${f.from.name} se puede escribir tal cual en ${f.to.name}. Los dos juegos llevan la misma constante, ${nc(f.from.yaw)}, así que el mismo número gira la misma distancia. La tabla de abajo pone las dos sensibilidades una al lado de la otra a 800 DPI para cada cm/360° objetivo.`
        : `Multiplica una sensibilidad de ${f.from.name} por ${nc(f.factor)} para girar la misma distancia en ${f.to.name}. Es la razón entre las constantes ${nc(f.from.yaw)} y ${nc(f.to.yaw)}, y ${nc(f.back)} te devuelve. A 800 DPI, 30 cm/360° pide ${nc(f.pick.from)} en ${f.from.short} y ${nc(f.pick.to)} en ${f.to.short}.`)
      : `En ${f.game.name} a ${f.dpi} DPI, 30 cm/360° sale con una sensibilidad de ${nc(f.pick.sens)} y un eDPI de ${f.pick.edpi}. Se deduce de la constante del juego ${nc(f.game.yaw)} mediante 2,54 × 360 ÷ (constante × sensibilidad × DPI), y la tabla de abajo aplica la misma fórmula a ocho filas de 20 cm a 60 cm.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `Uma sensibilidade de ${f.from.name} pode ser escrita tal como está em ${f.to.name}. Os dois jogos carregam a mesma constante, ${nc(f.from.yaw)}, então o mesmo número gira a mesma distância. A tabela abaixo põe as duas sensibilidades lado a lado a 800 DPI para cada cm/360° alvo.`
        : `Multiplique uma sensibilidade de ${f.from.name} por ${nc(f.factor)} para girar a mesma distância em ${f.to.name}. É a razão entre as constantes ${nc(f.from.yaw)} e ${nc(f.to.yaw)}, e ${nc(f.back)} traz de volta. A 800 DPI, 30 cm/360° pede ${nc(f.pick.from)} em ${f.from.short} e ${nc(f.pick.to)} em ${f.to.short}.`)
      : `Em ${f.game.name} a ${f.dpi} DPI, 30 cm/360° sai com sensibilidade ${nc(f.pick.sens)} e eDPI ${f.pick.edpi}. Decorre da constante do jogo ${nc(f.game.yaw)} por 2,54 × 360 ÷ (constante × sensibilidade × DPI), e a tabela abaixo aplica a mesma fórmula a oito linhas de 20 cm a 60 cm.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `${f.from.name}の感度は${f.to.name}にそのまま書き移せます。二つのゲームの定数がどちらも${f.from.yaw}なので、同じ数字が同じ距離を回します。下の表は800 DPIで、目標のcm/360°ごとに両ゲームの感度を並べたものです。`
        : `${f.from.name}の感度に${f.factor}を掛けると、${f.to.name}で同じ距離を回します。定数${f.from.yaw}と${f.to.yaw}の比であり、戻すときは${f.back}を掛けます。800 DPIで30cm/360°にするには${f.from.short}が${f.pick.from}、${f.to.short}が${f.pick.to}です。`)
      : `${f.game.name}で${f.dpi} DPIを使うとき、30cm/360°になる感度は${f.pick.sens}、eDPIは${f.pick.edpi}です。ゲーム定数${f.game.yaw}と2.54 × 360 ÷ (定数 × 感度 × DPI)から出た値で、下の表は20cmから60cmまで八行を同じ式で計算しています。`,
    f => f.kind === 'pair'
      ? (f.same
        ? `Eine Empfindlichkeit aus ${f.from.name} lässt sich unverändert in ${f.to.name} eintragen. Beide Spiele tragen dieselbe Konstante ${nc(f.from.yaw)}, dieselbe Zahl dreht also dieselbe Strecke. Die Tabelle unten stellt beide Empfindlichkeiten bei 800 DPI je Ziel-cm/360° nebeneinander.`
        : `Multipliziere eine Empfindlichkeit aus ${f.from.name} mit ${nc(f.factor)}, um in ${f.to.name} dieselbe Strecke zu drehen. Das ist das Verhältnis der Konstanten ${nc(f.from.yaw)} und ${nc(f.to.yaw)}, und ${nc(f.back)} führt zurück. Bei 800 DPI braucht 30 cm/360° in ${f.from.short} ${nc(f.pick.from)} und in ${f.to.short} ${nc(f.pick.to)}.`)
      : `In ${f.game.name} bei ${f.dpi} DPI ergibt 30 cm/360° eine Empfindlichkeit von ${nc(f.pick.sens)} und eine eDPI von ${f.pick.edpi}. Es folgt aus der Spielkonstante ${nc(f.game.yaw)} über 2,54 × 360 ÷ (Konstante × Empfindlichkeit × DPI); die Tabelle unten rechnet dieselbe Formel für acht Zeilen von 20 cm bis 60 cm.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `Une sensibilité de ${f.from.name} se reporte telle quelle dans ${f.to.name}. Les deux jeux portent la même constante, ${nc(f.from.yaw)} : le même chiffre fait tourner la même distance. Le tableau ci-dessous met les deux sensibilités côte à côte à 800 DPI pour chaque cm/360° cible.`
        : `Multipliez une sensibilité de ${f.from.name} par ${nc(f.factor)} pour tourner de la même distance dans ${f.to.name}. C’est le rapport des constantes ${nc(f.from.yaw)} et ${nc(f.to.yaw)}, et ${nc(f.back)} ramène en arrière. À 800 DPI, 30 cm/360° demande ${nc(f.pick.from)} dans ${f.from.short} et ${nc(f.pick.to)} dans ${f.to.short}.`)
      : `Dans ${f.game.name} à ${f.dpi} DPI, 30 cm/360° donne une sensibilité de ${nc(f.pick.sens)} et une eDPI de ${f.pick.edpi}. Cela découle de la constante du jeu ${nc(f.game.yaw)} par 2,54 × 360 ÷ (constante × sensibilité × DPI), et le tableau ci-dessous applique la même formule à huit lignes de 20 cm à 60 cm.`,
    f => f.kind === 'pair'
      ? (f.same
        ? `${f.from.name} की संवेदनशीलता ${f.to.name} में जैसी है वैसी ही लिखी जा सकती है। दोनों गेमों का स्थिरांक ${f.from.yaw} एक ही है, इसलिए वही अंक उतनी ही दूरी घुमाता है। नीचे की तालिका 800 DPI पर हर लक्ष्य cm/360° के लिए दोनों संवेदनशीलताएँ साथ-साथ रखती है।`
        : `${f.from.name} की संवेदनशीलता को ${f.factor} से गुणा करें तो ${f.to.name} में वही दूरी घूमती है। यह स्थिरांक ${f.from.yaw} और ${f.to.yaw} का अनुपात है, और ${f.back} से वापस आते हैं। 800 DPI पर 30 cm/360° के लिए ${f.from.short} में ${f.pick.from} और ${f.to.short} में ${f.pick.to} चाहिए।`)
      : `${f.game.name} में ${f.dpi} DPI पर 30 cm/360° के लिए संवेदनशीलता ${f.pick.sens} और eDPI ${f.pick.edpi} बनता है। यह गेम स्थिरांक ${f.game.yaw} से 2.54 × 360 ÷ (स्थिरांक × संवेदनशीलता × DPI) के ज़रिए निकलता है, और नीचे की तालिका 20 cm से 60 cm तक आठ पंक्तियों पर वही सूत्र चलाती है।`,
    f => f.kind === 'pair'
      ? (f.same
        ? `${f.from.name} 的灵敏度可以照原样填进 ${f.to.name}。两款游戏的常数都是 ${f.from.yaw}，同一个数字转过同样的距离。下面的表按 800 DPI，为每个目标 cm/360° 把两款游戏的灵敏度并排列出。`
        : `把 ${f.from.name} 的灵敏度乘 ${f.factor}，在 ${f.to.name} 里就能转过同样的距离。这是常数 ${f.from.yaw} 与 ${f.to.yaw} 的比，换回来乘 ${f.back}。在 800 DPI 下，要做到 30 cm/360°，${f.from.short} 是 ${f.pick.from}，${f.to.short} 是 ${f.pick.to}。`)
      : `在 ${f.game.name} 里用 ${f.dpi} DPI，30 cm/360° 对应的灵敏度是 ${f.pick.sens}，eDPI 是 ${f.pick.edpi}。它由游戏常数 ${f.game.yaw} 经 2.54 × 360 ÷ (常数 × 灵敏度 × DPI) 得出，下面的表用同一个式子算了 20 cm 到 60 cm 共八行。`,
    f => f.kind === 'pair'
      ? (f.same
        ? `${f.from.name} 的靈敏度可以照原樣填進 ${f.to.name}。兩款遊戲的常數都是 ${f.from.yaw}，同一個數字轉過同樣的距離。下面的表按 800 DPI，為每個目標 cm/360° 把兩款遊戲的靈敏度並排列出。`
        : `把 ${f.from.name} 的靈敏度乘 ${f.factor}，在 ${f.to.name} 裡就能轉過同樣的距離。這是常數 ${f.from.yaw} 與 ${f.to.yaw} 的比，換回來乘 ${f.back}。在 800 DPI 下，要做到 30 cm/360°，${f.from.short} 是 ${f.pick.from}，${f.to.short} 是 ${f.pick.to}。`)
      : `在 ${f.game.name} 裡用 ${f.dpi} DPI，30 cm/360° 對應的靈敏度是 ${f.pick.sens}，eDPI 是 ${f.pick.edpi}。它由遊戲常數 ${f.game.yaw} 經 2.54 × 360 ÷ (常數 × 靈敏度 × DPI) 得出，下面的表用同一個式子算了 20 cm 到 60 cm 共八行。`,
  ),

  howTitle: T('알아 둘 것', 'Worth knowing', 'Conviene saber', 'Vale saber', '知っておくこと', 'Gut zu wissen', 'Bon à savoir', 'जानने योग्य', '需要知道的', '需要知道的'),

  how: T<string[]>(
    [
      'cm/360° = 2.54 × 360 ÷ (게임 상수 × 감도 × DPI). 상수는 소스 계열 0.022, 발로란트 0.07, 오버워치 0.0066입니다.',
      'eDPI = DPI × 감도. 한 게임 안에서는 eDPI가 같으면 도는 거리도 같습니다 — DPI를 두 배로 하고 감도를 반으로 하면 그대로입니다.',
      '게임을 옮기는 곱수는 상수의 비입니다: 감도_B = 감도_A × 상수_A ÷ 상수_B. 되돌리면 원래 감도가 나옵니다.',
      '이 표의 감도는 목표 cm/360°에서 거꾸로 구한 값입니다. 마우스 가속·조준 배수·OS 포인터 속도는 넣지 않았습니다.',
    ],
    [
      'cm/360° = 2.54 × 360 ÷ (game constant × sensitivity × DPI). The constant is 0.022 for the Source family, 0.07 for VALORANT and 0.0066 for Overwatch.',
      'eDPI = DPI × sensitivity. Inside one game, equal eDPI means equal distance — double the DPI and halve the sensitivity and nothing moves.',
      'The multiplier between games is the ratio of the constants: sens_B = sens_A × yaw_A ÷ yaw_B. Convert back and the original number returns.',
      'Every sensitivity here is solved backwards from a target cm/360°. Mouse acceleration, aim multipliers and the OS pointer speed are not included.',
    ],
    [
      'cm/360° = 2,54 × 360 ÷ (constante del juego × sensibilidad × DPI). La constante es 0,022 en la familia Source, 0,07 en VALORANT y 0,0066 en Overwatch.',
      'eDPI = DPI × sensibilidad. Dentro de un juego, igual eDPI es igual distancia: dobla los DPI y parte la sensibilidad en dos y nada se mueve.',
      'El multiplicador entre juegos es la razón de las constantes: sens_B = sens_A × yaw_A ÷ yaw_B. Al convertir de vuelta reaparece el número original.',
      'Cada sensibilidad de aquí se despeja desde un cm/360° objetivo. No están la aceleración del ratón, los multiplicadores de apuntado ni la velocidad del puntero del sistema.',
    ],
    [
      'cm/360° = 2,54 × 360 ÷ (constante do jogo × sensibilidade × DPI). A constante é 0,022 na família Source, 0,07 no VALORANT e 0,0066 no Overwatch.',
      'eDPI = DPI × sensibilidade. Dentro de um jogo, eDPI igual é distância igual: dobre o DPI e corte a sensibilidade ao meio e nada se move.',
      'O multiplicador entre jogos é a razão das constantes: sens_B = sens_A × yaw_A ÷ yaw_B. Convertendo de volta, o número original reaparece.',
      'Cada sensibilidade daqui sai de um cm/360° alvo. Não entram a aceleração do mouse, os multiplicadores de mira nem a velocidade do ponteiro do sistema.',
    ],
    [
      'cm/360° = 2.54 × 360 ÷ (ゲーム定数 × 感度 × DPI)。定数はソース系0.022、ヴァロラント0.07、オーバーウォッチ0.0066です。',
      'eDPI = DPI × 感度。同じゲームの中ではeDPIが同じなら回る距離も同じです — DPIを倍にして感度を半分にすれば変わりません。',
      'ゲームを移す倍率は定数の比です: 感度_B = 感度_A × 定数_A ÷ 定数_B。戻せば元の感度になります。',
      'この表の感度は目標のcm/360°から逆に求めた値です。マウス加速・照準倍率・OSのポインター速度は入れていません。',
    ],
    [
      'cm/360° = 2,54 × 360 ÷ (Spielkonstante × Empfindlichkeit × DPI). Die Konstante ist 0,022 für die Source-Familie, 0,07 für VALORANT und 0,0066 für Overwatch.',
      'eDPI = DPI × Empfindlichkeit. Innerhalb eines Spiels heißt gleiche eDPI gleiche Strecke — doppelte DPI und halbe Empfindlichkeit ändern nichts.',
      'Der Faktor zwischen Spielen ist das Verhältnis der Konstanten: sens_B = sens_A × Yaw_A ÷ Yaw_B. Zurückgerechnet kommt die Ausgangszahl wieder.',
      'Jede Empfindlichkeit hier ist aus einem Ziel-cm/360° rückwärts bestimmt. Mausbeschleunigung, Ziel-Multiplikatoren und die Zeigergeschwindigkeit des Systems fehlen.',
    ],
    [
      'cm/360° = 2,54 × 360 ÷ (constante du jeu × sensibilité × DPI). La constante vaut 0,022 pour la famille Source, 0,07 pour VALORANT et 0,0066 pour Overwatch.',
      'eDPI = DPI × sensibilité. Au sein d’un jeu, une eDPI égale donne une distance égale — doublez les DPI, divisez la sensibilité par deux, rien ne bouge.',
      'Le facteur entre jeux est le rapport des constantes : sens_B = sens_A × yaw_A ÷ yaw_B. En reconvertissant, le nombre de départ revient.',
      'Chaque sensibilité ici est calculée à l’envers depuis un cm/360° cible. L’accélération de la souris, les multiplicateurs de visée et la vitesse du pointeur ne sont pas comptés.',
    ],
    [
      'cm/360° = 2.54 × 360 ÷ (गेम स्थिरांक × संवेदनशीलता × DPI)। स्थिरांक Source परिवार में 0.022, VALORANT में 0.07 और Overwatch में 0.0066 है।',
      'eDPI = DPI × संवेदनशीलता। एक गेम के भीतर बराबर eDPI का मतलब बराबर दूरी — DPI दुगुना और संवेदनशीलता आधी करने पर कुछ नहीं बदलता।',
      'गेमों के बीच गुणक स्थिरांकों का अनुपात है: sens_B = sens_A × yaw_A ÷ yaw_B। वापस बदलें तो मूल अंक लौट आता है।',
      'यहाँ की हर संवेदनशीलता लक्ष्य cm/360° से उलटी निकाली गई है। माउस त्वरण, निशाना गुणक और सिस्टम की पॉइंटर गति शामिल नहीं हैं।',
    ],
    [
      'cm/360° = 2.54 × 360 ÷ (游戏常数 × 灵敏度 × DPI)。常数在 Source 系是 0.022，VALORANT 是 0.07，Overwatch 是 0.0066。',
      'eDPI = DPI × 灵敏度。在同一款游戏里，eDPI 相同就是距离相同 — DPI 加倍、灵敏度减半，什么都不变。',
      '游戏之间的倍数是常数之比：sens_B = sens_A × yaw_A ÷ yaw_B。换回去就得到原来的数字。',
      '这里的每个灵敏度都是从目标 cm/360° 反推的。鼠标加速、开镜倍率、系统指针速度都没有计入。',
    ],
    [
      'cm/360° = 2.54 × 360 ÷ (遊戲常數 × 靈敏度 × DPI)。常數在 Source 系是 0.022，VALORANT 是 0.07，Overwatch 是 0.0066。',
      'eDPI = DPI × 靈敏度。在同一款遊戲裡，eDPI 相同就是距離相同 — DPI 加倍、靈敏度減半，什麼都不變。',
      '遊戲之間的倍數是常數之比：sens_B = sens_A × yaw_A ÷ yaw_B。換回去就得到原來的數字。',
      '這裡的每個靈敏度都是從目標 cm/360° 反推的。滑鼠加速、開鏡倍率、系統指標速度都沒有計入。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '마우스 감도 변환표 128칸 — 게임·DPI별 cm/360°와 eDPI',
    'Mouse sensitivity converter — 128 cells of cm/360° and eDPI by game and DPI',
    'Conversor de sensibilidad del ratón — 128 casillas de cm/360° y eDPI por juego y DPI',
    'Conversor de sensibilidade do mouse — 128 casos de cm/360° e eDPI por jogo e DPI',
    'マウス感度変換表128マス — ゲームとDPI別のcm/360°とeDPI',
    'Maus-Empfindlichkeitsrechner — 128 Felder cm/360° und eDPI nach Spiel und DPI',
    'Convertisseur de sensibilité souris — 128 cases de cm/360° et d’eDPI par jeu et DPI',
    'माउस संवेदनशीलता परिवर्तक — गेम और DPI के अनुसार cm/360° तथा eDPI के 128 खाने',
    '鼠标灵敏度换算表 128 格 — 按游戏与 DPI 的 cm/360° 和 eDPI',
    '滑鼠靈敏度換算表 128 格 — 按遊戲與 DPI 的 cm/360° 和 eDPI',
  ),
  hubMetaDesc: T(
    '감도 128칸 — 게임 여덟을 서로 옮기는 쌍 56종과 게임×DPI 72종의 감도-cm/360° 표. 감도 표를 옮겨 적지 않고 게임 상수(소스 계열 0.022, 발로란트 0.07, 오버워치 0.0066)에서 계산합니다. eDPI, 360°에 드는 마우스 카운트, 되돌리는 곱수까지 함께 냅니다.',
    'Fifty-six ordered pairs that carry a sensitivity between eight games, plus 72 game-and-DPI cells holding a sensitivity to cm/360° table. Nothing is copied: everything follows from the game constant — 0.022 for the Source family, 0.07 for VALORANT, 0.0066 for Overwatch — including eDPI, mouse counts per 360° and the multiplier back.',
    'Cincuenta y seis pares ordenados que llevan una sensibilidad entre ocho juegos, más 72 casillas de juego y DPI con la tabla de sensibilidad a cm/360°. Nada está copiado: todo sale de la constante del juego —0,022 en la familia Source, 0,07 en VALORANT, 0,0066 en Overwatch—, incluidos el eDPI, los conteos por 360° y el multiplicador de vuelta.',
    'Cinquenta e seis pares ordenados que levam uma sensibilidade entre oito jogos, mais 72 casos de jogo e DPI com a tabela de sensibilidade para cm/360°. Nada é copiado: tudo decorre da constante do jogo — 0,022 na família Source, 0,07 no VALORANT, 0,0066 no Overwatch —, incluindo eDPI, contagens por 360° e o multiplicador de volta.',
    '八つのゲームの感度を互いに移す順序つきの56組と、ゲーム×DPI 72マスの感度-cm/360°表。感度表を写すのではなく、ゲーム定数(ソース系0.022、ヴァロラント0.07、オーバーウォッチ0.0066)から計算します。eDPI、360°あたりのマウスカウント、戻す倍率も併せて出します。',
    'Sechsundfünfzig geordnete Paare, die eine Empfindlichkeit zwischen acht Spielen tragen, dazu 72 Spiel-und-DPI-Felder mit der Tabelle von Empfindlichkeit zu cm/360°. Nichts ist abgeschrieben: alles folgt aus der Spielkonstante — 0,022 für die Source-Familie, 0,07 für VALORANT, 0,0066 für Overwatch —, samt eDPI, Mauszählschritten pro 360° und dem Faktor zurück.',
    'Cinquante-six paires ordonnées qui portent une sensibilité entre huit jeux, plus 72 cases jeu-et-DPI avec la table de sensibilité vers cm/360°. Rien n’est recopié : tout découle de la constante du jeu — 0,022 pour la famille Source, 0,07 pour VALORANT, 0,0066 pour Overwatch —, y compris l’eDPI, les pas de souris par 360° et le facteur retour.',
    'आठ गेमों के बीच संवेदनशीलता ले जाने वाले 56 क्रमित जोड़े, और गेम×DPI के 72 खाने जिनमें संवेदनशीलता से cm/360° की तालिका है। कुछ भी उतारा नहीं गया: सब कुछ गेम स्थिरांक से निकलता है — Source परिवार 0.022, VALORANT 0.07, Overwatch 0.0066 — साथ में eDPI, 360° की माउस गिनती और वापसी गुणक भी।',
    '在八款游戏之间搬运灵敏度的 56 个有序配对，加上 72 个游戏×DPI 格里的灵敏度—cm/360° 对照表。没有任何抄来的数字：一切都由游戏常数算出 — Source 系 0.022、VALORANT 0.07、Overwatch 0.0066 — 还一并给出 eDPI、每 360° 的鼠标计数和还原倍数。',
    '在八款遊戲之間搬運靈敏度的 56 個有序配對，加上 72 個遊戲×DPI 格裡的靈敏度—cm/360° 對照表。沒有任何抄來的數字：一切都由遊戲常數算出 — Source 系 0.022、VALORANT 0.07、Overwatch 0.0066 — 還一併給出 eDPI、每 360° 的滑鼠計數和還原倍數。',
  ),

  metaTitle: T<(f: DpiFacts) => string>(
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short} 감도를 ${f.to.short}로 — 숫자가 그대로다` : `${f.from.short} 감도를 ${f.to.short}로 — ${f.factor}를 곱한다`)
      : `${f.game.short} ${f.dpi} DPI 감도표 — 30cm/360°는 ${f.pick.sens}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short} sensitivity in ${f.to.short} — the number does not change` : `${f.from.short} sensitivity in ${f.to.short} — multiply by ${f.factor}`)
      : `${f.game.short} at ${f.dpi} DPI — 30 cm/360° is sensitivity ${f.pick.sens}`,
    f => f.kind === 'pair'
      ? (f.same ? `Sensibilidad de ${f.from.short} en ${f.to.short}: el número no cambia` : `Sensibilidad de ${f.from.short} en ${f.to.short}: multiplica por ${nc(f.factor)}`)
      : `${f.game.short} a ${f.dpi} DPI: 30 cm/360° es sensibilidad ${nc(f.pick.sens)}`,
    f => f.kind === 'pair'
      ? (f.same ? `Sensibilidade de ${f.from.short} no ${f.to.short}: o número não muda` : `Sensibilidade de ${f.from.short} no ${f.to.short}: multiplique por ${nc(f.factor)}`)
      : `${f.game.short} com ${f.dpi} DPI: 30 cm/360° dá sensibilidade ${nc(f.pick.sens)}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short}の感度を${f.to.short}へ — 数字は変わらない` : `${f.from.short}の感度を${f.to.short}へ — ${f.factor}を掛ける`)
      : `${f.game.short} ${f.dpi} DPIの感度表 — 30cm/360°は${f.pick.sens}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short}-Empfindlichkeit in ${f.to.short} — die Zahl bleibt` : `${f.from.short}-Empfindlichkeit in ${f.to.short} — mal ${nc(f.factor)}`)
      : `${f.game.short} bei ${f.dpi} DPI — 30 cm/360° sind ${nc(f.pick.sens)}`,
    f => f.kind === 'pair'
      ? (f.same ? `Sensibilité ${f.from.short} vers ${f.to.short} — le chiffre ne change pas` : `Sensibilité ${f.from.short} vers ${f.to.short} — multipliez par ${nc(f.factor)}`)
      : `${f.game.short} à ${f.dpi} DPI — 30 cm/360° vaut ${nc(f.pick.sens)}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short} से ${f.to.short} संवेदनशीलता — अंक नहीं बदलता` : `${f.from.short} से ${f.to.short} संवेदनशीलता — ${f.factor} से गुणा`)
      : `${f.game.short} ${f.dpi} DPI पर — 30 cm/360° की संवेदनशीलता ${f.pick.sens}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short} 灵敏度换到 ${f.to.short} — 数字不用改` : `${f.from.short} 灵敏度换到 ${f.to.short} — 乘 ${f.factor}`)
      : `${f.game.short} ${f.dpi} DPI 灵敏度表 — 30 cm/360° 是 ${f.pick.sens}`,
    f => f.kind === 'pair'
      ? (f.same ? `${f.from.short} 靈敏度換到 ${f.to.short} — 數字不用改` : `${f.from.short} 靈敏度換到 ${f.to.short} — 乘 ${f.factor}`)
      : `${f.game.short} ${f.dpi} DPI 靈敏度表 — 30 cm/360° 是 ${f.pick.sens}`,
  ),

  metaDesc: T<(f: DpiFacts) => string>(
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `두 게임의 상수가 ${f.from.yaw}으로 같아 감도 숫자를 그대로 옮겨 적으면 됩니다.` : `감도에 ${f.factor}를 곱하고, 되돌릴 때는 ${f.back}을 곱합니다.`} 800 DPI에서 30cm/360°는 ${f.from.short} ${f.pick.from}, ${f.to.short} ${f.pick.to}이고 eDPI는 ${f.pick.fromEdpi}과 ${f.pick.toEdpi}입니다 — 거리가 같아도 eDPI는 게임을 건너 견줄 수 없습니다.`
      : `${f.game.name} ${f.dpi} DPI. 30cm/360°는 감도 ${f.pick.sens}(eDPI ${f.pick.edpi}), 20cm는 ${f.rows[0].sens}, 60cm는 ${f.rows[f.rows.length - 1].sens}입니다. 게임 상수 ${f.game.yaw}에서 계산했고, 360°에 드는 마우스 카운트는 ${f.pick.counts}입니다.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `Both games share the constant ${f.from.yaw}, so the sensitivity number carries over untouched.` : `Multiply the sensitivity by ${f.factor}, and by ${f.back} to come back.`} At 800 DPI, 30 cm/360° means ${f.pick.from} in ${f.from.short} and ${f.pick.to} in ${f.to.short}, at eDPI ${f.pick.fromEdpi} and ${f.pick.toEdpi} — the same distance, yet eDPI still cannot be compared across games.`
      : `${f.game.name} at ${f.dpi} DPI. 30 cm/360° is sensitivity ${f.pick.sens} at eDPI ${f.pick.edpi}, 20 cm is ${f.rows[0].sens} and 60 cm is ${f.rows[f.rows.length - 1].sens}. Worked out from the game constant ${f.game.yaw}, with ${f.pick.counts} mouse counts to a full turn.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `Los dos juegos comparten la constante ${nc(f.from.yaw)}, así que el número de sensibilidad pasa intacto.` : `Multiplica la sensibilidad por ${nc(f.factor)}, y por ${nc(f.back)} para volver.`} A 800 DPI, 30 cm/360° son ${nc(f.pick.from)} en ${f.from.short} y ${nc(f.pick.to)} en ${f.to.short}, con eDPI ${f.pick.fromEdpi} y ${f.pick.toEdpi}: misma distancia y, aun así, el eDPI no se compara entre juegos.`
      : `${f.game.name} a ${f.dpi} DPI. 30 cm/360° es sensibilidad ${nc(f.pick.sens)} con eDPI ${f.pick.edpi}; 20 cm es ${nc(f.rows[0].sens)} y 60 cm es ${nc(f.rows[f.rows.length - 1].sens)}. Calculado desde la constante del juego ${nc(f.game.yaw)}, con ${f.pick.counts} conteos del ratón por vuelta completa.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `Os dois jogos partilham a constante ${nc(f.from.yaw)}, então o número de sensibilidade passa intacto.` : `Multiplique a sensibilidade por ${nc(f.factor)}, e por ${nc(f.back)} para voltar.`} A 800 DPI, 30 cm/360° dá ${nc(f.pick.from)} em ${f.from.short} e ${nc(f.pick.to)} em ${f.to.short}, com eDPI ${f.pick.fromEdpi} e ${f.pick.toEdpi}: mesma distância e, ainda assim, o eDPI não se compara entre jogos.`
      : `${f.game.name} a ${f.dpi} DPI. 30 cm/360° é sensibilidade ${nc(f.pick.sens)} com eDPI ${f.pick.edpi}; 20 cm é ${nc(f.rows[0].sens)} e 60 cm é ${nc(f.rows[f.rows.length - 1].sens)}. Calculado a partir da constante do jogo ${nc(f.game.yaw)}, com ${f.pick.counts} contagens do mouse por volta completa.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}。${f.same ? `二つのゲームの定数がどちらも${f.from.yaw}なので、感度の数字はそのまま移せます。` : `感度に${f.factor}を掛け、戻すときは${f.back}を掛けます。`}800 DPIで30cm/360°は${f.from.short}が${f.pick.from}、${f.to.short}が${f.pick.to}で、eDPIは${f.pick.fromEdpi}と${f.pick.toEdpi}です — 距離が同じでもeDPIはゲームをまたいで比べられません。`
      : `${f.game.name} ${f.dpi} DPI。30cm/360°は感度${f.pick.sens}(eDPI ${f.pick.edpi})、20cmは${f.rows[0].sens}、60cmは${f.rows[f.rows.length - 1].sens}です。ゲーム定数${f.game.yaw}から計算し、360°あたりのマウスカウントは${f.pick.counts}です。`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `Beide Spiele teilen die Konstante ${nc(f.from.yaw)}, die Empfindlichkeitszahl geht also unverändert mit.` : `Multipliziere die Empfindlichkeit mit ${nc(f.factor)}, zurück mit ${nc(f.back)}.`} Bei 800 DPI heißt 30 cm/360° ${nc(f.pick.from)} in ${f.from.short} und ${nc(f.pick.to)} in ${f.to.short}, bei eDPI ${f.pick.fromEdpi} und ${f.pick.toEdpi} — gleiche Strecke, und dennoch lässt sich eDPI nicht über Spiele hinweg vergleichen.`
      : `${f.game.name} bei ${f.dpi} DPI. 30 cm/360° sind Empfindlichkeit ${nc(f.pick.sens)} bei eDPI ${f.pick.edpi}, 20 cm sind ${nc(f.rows[0].sens)} und 60 cm ${nc(f.rows[f.rows.length - 1].sens)}. Aus der Spielkonstante ${nc(f.game.yaw)} gerechnet, mit ${f.pick.counts} Mauszählschritten pro Umdrehung.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}. ${f.same ? `Les deux jeux partagent la constante ${nc(f.from.yaw)} : le chiffre de sensibilité passe tel quel.` : `Multipliez la sensibilité par ${nc(f.factor)}, et par ${nc(f.back)} pour revenir.`} À 800 DPI, 30 cm/360° font ${nc(f.pick.from)} dans ${f.from.short} et ${nc(f.pick.to)} dans ${f.to.short}, pour une eDPI de ${f.pick.fromEdpi} et ${f.pick.toEdpi} : même distance, et pourtant l’eDPI ne se compare pas d’un jeu à l’autre.`
      : `${f.game.name} à ${f.dpi} DPI. 30 cm/360° donne une sensibilité de ${nc(f.pick.sens)} pour une eDPI de ${f.pick.edpi} ; 20 cm vaut ${nc(f.rows[0].sens)} et 60 cm ${nc(f.rows[f.rows.length - 1].sens)}. Calculé depuis la constante du jeu ${nc(f.game.yaw)}, avec ${f.pick.counts} pas de souris par tour complet.`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}। ${f.same ? `दोनों गेमों का स्थिरांक ${f.from.yaw} एक ही है, इसलिए संवेदनशीलता का अंक बिना बदले चला जाता है।` : `संवेदनशीलता को ${f.factor} से गुणा करें, और वापसी के लिए ${f.back} से।`} 800 DPI पर 30 cm/360° का मतलब ${f.from.short} में ${f.pick.from} और ${f.to.short} में ${f.pick.to}, eDPI ${f.pick.fromEdpi} और ${f.pick.toEdpi} — दूरी वही है, फिर भी eDPI गेमों के आर-पार तुलना योग्य नहीं है।`
      : `${f.game.name} ${f.dpi} DPI पर। 30 cm/360° की संवेदनशीलता ${f.pick.sens} (eDPI ${f.pick.edpi}), 20 cm पर ${f.rows[0].sens} और 60 cm पर ${f.rows[f.rows.length - 1].sens}। गेम स्थिरांक ${f.game.yaw} से निकाला गया, और एक पूरे चक्कर में ${f.pick.counts} माउस गिनतियाँ लगती हैं।`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}。${f.same ? `两款游戏的常数都是 ${f.from.yaw}，灵敏度数字原封不动带过去即可。` : `把灵敏度乘 ${f.factor}，换回来乘 ${f.back}。`}在 800 DPI 下，30 cm/360° 就是 ${f.from.short} 的 ${f.pick.from} 和 ${f.to.short} 的 ${f.pick.to}，eDPI 分别是 ${f.pick.fromEdpi} 与 ${f.pick.toEdpi} — 距离一样，eDPI 却依然不能跨游戏比较。`
      : `${f.game.name} ${f.dpi} DPI。30 cm/360° 的灵敏度是 ${f.pick.sens}（eDPI ${f.pick.edpi}），20 cm 是 ${f.rows[0].sens}，60 cm 是 ${f.rows[f.rows.length - 1].sens}。由游戏常数 ${f.game.yaw} 算出，转满一圈需要 ${f.pick.counts} 个鼠标计数。`,
    f => f.kind === 'pair'
      ? `${f.from.name} → ${f.to.name}。${f.same ? `兩款遊戲的常數都是 ${f.from.yaw}，靈敏度數字原封不動帶過去即可。` : `把靈敏度乘 ${f.factor}，換回來乘 ${f.back}。`}在 800 DPI 下，30 cm/360° 就是 ${f.from.short} 的 ${f.pick.from} 和 ${f.to.short} 的 ${f.pick.to}，eDPI 分別是 ${f.pick.fromEdpi} 與 ${f.pick.toEdpi} — 距離一樣，eDPI 卻依然不能跨遊戲比較。`
      : `${f.game.name} ${f.dpi} DPI。30 cm/360° 的靈敏度是 ${f.pick.sens}（eDPI ${f.pick.edpi}），20 cm 是 ${f.rows[0].sens}，60 cm 是 ${f.rows[f.rows.length - 1].sens}。由遊戲常數 ${f.game.yaw} 算出，轉滿一圈需要 ${f.pick.counts} 個滑鼠計數。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'DPI를 올리면 감도를 얼마로 내려야 하나요?', a: '곱한 값이 그대로면 됩니다. 800 DPI 감도 1.0과 1600 DPI 감도 0.5는 둘 다 eDPI 800이고, 360°를 돌리는 데 미는 거리가 한 밀리미터도 다르지 않습니다. DPI를 두 배로 했다면 감도를 반으로 하세요.' },
      { q: 'eDPI로 다른 게임 사람과 비교할 수 있나요?', a: '같은 게임 상수를 쓰는 게임끼리만 됩니다. 발로란트의 상수는 0.07이고 소스 계열은 0.022이므로, 같은 eDPI 800이라도 발로란트가 세 배 넘게 빠릅니다. 게임을 건너 견줄 때는 eDPI가 아니라 cm/360°를 보세요.' },
      { q: '왜 감도 표를 그대로 적어 두지 않나요?', a: '감도 숫자는 게임이 슬라이더를 바꾸면 통째로 거짓이 됩니다. 게임 상수 하나만 두고 나머지를 계산하면 고칠 자리가 한 곳이고, 계산이 맞는지도 밖에서 되짚을 수 있습니다 — 소스 계열 400 DPI 감도 2.0이 51.95cm라는 널리 공표된 값이 그 자리입니다.' },
    ],
    [
      { q: 'If I raise my DPI, how far do I lower the sensitivity?', a: 'Keep the product the same. 800 DPI at 1.0 and 1600 DPI at 0.5 are both eDPI 800, and the distance your hand pushes for a full 360° does not change by a millimetre. Double the DPI, halve the sensitivity.' },
      { q: 'Can I compare eDPI with someone playing another game?', a: 'Only between games that share the same constant. VALORANT sits at 0.07 and the Source family at 0.022, so the same eDPI 800 is more than three times faster in VALORANT. Across games, compare cm/360° instead of eDPI.' },
      { q: 'Why not just publish a table of sensitivities?', a: 'Written sensitivities turn false the moment a game changes its slider. Keeping one game constant and computing the rest leaves a single place to fix, and it can be checked from outside: the Source family at 400 DPI and sensitivity 2.0 gives 51.95 cm, a widely published figure.' },
    ],
    [
      { q: 'Si subo los DPI, cuánto bajo la sensibilidad?', a: 'Mantén el producto igual. 800 DPI a 1,0 y 1600 DPI a 0,5 son ambos eDPI 800, y la distancia que empuja la mano para un 360° completo no cambia ni un milímetro. Si doblas los DPI, parte la sensibilidad en dos.' },
      { q: 'Puedo comparar mi eDPI con alguien de otro juego?', a: 'Solo entre juegos con la misma constante. VALORANT está en 0,07 y la familia Source en 0,022, así que el mismo eDPI 800 es más de tres veces más rápido en VALORANT. Entre juegos distintos compara cm/360°, no eDPI.' },
      { q: 'Por qué no publicar directamente una tabla de sensibilidades?', a: 'Una sensibilidad escrita se vuelve falsa en cuanto el juego cambia su control. Con una sola constante por juego y el resto calculado hay un único sitio que corregir, y se puede comprobar desde fuera: la familia Source a 400 DPI con sensibilidad 2,0 da 51,95 cm, cifra muy publicada.' },
    ],
    [
      { q: 'Se eu subir o DPI, quanto baixo a sensibilidade?', a: 'Mantenha o produto igual. 800 DPI a 1,0 e 1600 DPI a 0,5 são ambos eDPI 800, e a distância que a mão empurra para um 360° completo não muda nem um milímetro. Se dobrar o DPI, corte a sensibilidade ao meio.' },
      { q: 'Posso comparar o meu eDPI com alguém de outro jogo?', a: 'Só entre jogos com a mesma constante. O VALORANT está em 0,07 e a família Source em 0,022, então o mesmo eDPI 800 é mais de três vezes mais rápido no VALORANT. Entre jogos diferentes compare cm/360°, não eDPI.' },
      { q: 'Por que não publicar logo uma tabela de sensibilidades?', a: 'Uma sensibilidade escrita fica falsa no momento em que o jogo muda o seu controlo. Com uma só constante por jogo e o resto calculado há um único lugar a corrigir, e dá para verificar de fora: a família Source a 400 DPI com sensibilidade 2,0 dá 51,95 cm, número muito divulgado.' },
    ],
    [
      { q: 'DPIを上げたら感度はどれだけ下げればいいですか。', a: '掛けた値が同じであれば大丈夫です。800 DPI・感度1.0と1600 DPI・感度0.5はどちらもeDPI 800で、360°回すために動かす距離は1ミリも変わりません。DPIを倍にしたなら感度を半分にしてください。' },
      { q: 'eDPIで別のゲームの人と比べられますか。', a: '同じゲーム定数を使うゲーム同士だけです。ヴァロラントの定数は0.07、ソース系は0.022なので、同じeDPI 800でもヴァロラントは三倍以上速いです。ゲームをまたぐときはeDPIではなくcm/360°を見てください。' },
      { q: 'なぜ感度の表をそのまま載せないのですか。', a: '書いた感度は、ゲームがスライダーを変えた瞬間に丸ごと嘘になります。ゲーム定数だけを置いて残りを計算すれば直す場所は一つで、外から確かめることもできます — ソース系の400 DPI・感度2.0が51.95cmという広く公表された値がその足場です。' },
    ],
    [
      { q: 'Wenn ich die DPI erhöhe, wie weit senke ich die Empfindlichkeit?', a: 'Halte das Produkt gleich. 800 DPI bei 1,0 und 1600 DPI bei 0,5 sind beides eDPI 800, und die Strecke für eine volle 360°-Drehung ändert sich nicht um einen Millimeter. Doppelte DPI, halbe Empfindlichkeit.' },
      { q: 'Kann ich meine eDPI mit jemandem aus einem anderen Spiel vergleichen?', a: 'Nur zwischen Spielen mit derselben Konstante. VALORANT liegt bei 0,07, die Source-Familie bei 0,022 — dieselbe eDPI 800 ist in VALORANT also mehr als dreimal schneller. Über Spiele hinweg vergleiche cm/360°, nicht eDPI.' },
      { q: 'Warum nicht einfach eine Tabelle mit Empfindlichkeiten veröffentlichen?', a: 'Geschriebene Empfindlichkeiten werden falsch, sobald ein Spiel seinen Regler ändert. Eine Konstante pro Spiel und alles andere gerechnet lässt genau eine Stelle zum Korrigieren, und es ist von außen prüfbar: die Source-Familie mit 400 DPI und Empfindlichkeit 2,0 ergibt 51,95 cm, eine weit veröffentlichte Zahl.' },
    ],
    [
      { q: 'Si j’augmente mes DPI, de combien baisser la sensibilité ?', a: 'Gardez le produit identique. 800 DPI à 1,0 et 1600 DPI à 0,5 valent tous deux eDPI 800, et la distance parcourue pour un 360° complet ne change pas d’un millimètre. Doublez les DPI, divisez la sensibilité par deux.' },
      { q: 'Puis-je comparer mon eDPI avec quelqu’un d’un autre jeu ?', a: 'Seulement entre jeux partageant la même constante. VALORANT est à 0,07 et la famille Source à 0,022 : la même eDPI 800 est donc plus de trois fois plus rapide dans VALORANT. D’un jeu à l’autre, comparez les cm/360°, pas l’eDPI.' },
      { q: 'Pourquoi ne pas publier une simple table de sensibilités ?', a: 'Une sensibilité écrite devient fausse dès qu’un jeu modifie son curseur. Une constante par jeu et le reste calculé ne laisse qu’un endroit à corriger, et cela se vérifie de l’extérieur : la famille Source à 400 DPI et sensibilité 2,0 donne 51,95 cm, chiffre largement publié.' },
    ],
    [
      { q: 'DPI बढ़ाऊँ तो संवेदनशीलता कितनी घटाऊँ?', a: 'गुणनफल वही रखें। 800 DPI पर 1.0 और 1600 DPI पर 0.5 — दोनों eDPI 800 हैं, और पूरे 360° के लिए हाथ जो दूरी धकेलता है वह एक मिलीमीटर भी नहीं बदलती। DPI दुगुना किया तो संवेदनशीलता आधी कर दें।' },
      { q: 'क्या मैं दूसरे गेम वाले किसी से eDPI की तुलना कर सकता हूँ?', a: 'सिर्फ़ उन गेमों के बीच जिनका स्थिरांक एक है। VALORANT का 0.07 और Source परिवार का 0.022 है, तो वही eDPI 800 VALORANT में तीन गुना से ज़्यादा तेज़ है। गेमों के आर-पार eDPI नहीं, cm/360° देखें।' },
      { q: 'संवेदनशीलता की तालिका सीधे क्यों नहीं छापते?', a: 'लिखी हुई संवेदनशीलता उस क्षण झूठी हो जाती है जब गेम अपना स्लाइडर बदलता है। हर गेम का एक स्थिरांक रखकर बाकी गणना करने पर सुधारने की जगह एक ही रहती है, और बाहर से जाँच भी हो जाती है — Source परिवार में 400 DPI और संवेदनशीलता 2.0 पर 51.95 cm, यह व्यापक रूप से प्रकाशित आँकड़ा है।' },
    ],
    [
      { q: 'DPI 调高之后，灵敏度要降到多少？', a: '让乘积保持不变就行。800 DPI 配 1.0 与 1600 DPI 配 0.5 都是 eDPI 800，转满 360° 时手推出去的距离连一毫米都不差。DPI 翻倍，就把灵敏度减半。' },
      { q: '能拿 eDPI 和玩别的游戏的人比吗？', a: '只有常数相同的游戏之间可以。VALORANT 的常数是 0.07，Source 系是 0.022，所以同样的 eDPI 800 在 VALORANT 里快三倍以上。跨游戏比较要看 cm/360°，不是 eDPI。' },
      { q: '为什么不直接列一张灵敏度表？', a: '写死的灵敏度，在游戏改动滑块的那一刻就整张变成假的。只保留每款游戏的一个常数、其余全部算出来，需要修改的地方就只有一处，而且可以从外部核对 — Source 系在 400 DPI、灵敏度 2.0 下得到 51.95 cm，这是流传很广的数字。' },
    ],
    [
      { q: 'DPI 調高之後，靈敏度要降到多少？', a: '讓乘積保持不變就行。800 DPI 配 1.0 與 1600 DPI 配 0.5 都是 eDPI 800，轉滿 360° 時手推出去的距離連一毫米都不差。DPI 翻倍，就把靈敏度減半。' },
      { q: '能拿 eDPI 和玩別的遊戲的人比嗎？', a: '只有常數相同的遊戲之間可以。VALORANT 的常數是 0.07，Source 系是 0.022，所以同樣的 eDPI 800 在 VALORANT 裡快三倍以上。跨遊戲比較要看 cm/360°，不是 eDPI。' },
      { q: '為什麼不直接列一張靈敏度表？', a: '寫死的靈敏度，在遊戲改動滑桿的那一刻就整張變成假的。只保留每款遊戲的一個常數、其餘全部算出來，需要修改的地方就只有一處，而且可以從外部核對 — Source 系在 400 DPI、靈敏度 2.0 下得到 51.95 cm，這是流傳很廣的數字。' },
    ],
  ),

  cellFaq: T<(f: DpiFacts) => FaqItem[]>(
    f => f.kind === 'pair' ? [
      { q: `${f.from.name} 감도를 ${f.to.name}로 어떻게 옮기나요?`, a: f.same
        ? `그대로 옮겨 적으면 됩니다. 두 게임의 상수가 ${f.from.yaw}으로 같아 같은 숫자가 같은 거리를 돕니다.`
        : `감도에 ${f.factor}를 곱하세요. 상수 ${f.from.yaw}을 ${f.to.yaw}으로 나눈 값이고, 마우스 설정을 안 건드리면 어느 DPI에서도 같은 곱수입니다.` },
      { q: '되돌리려면 얼마를 곱하나요?', a: f.same
        ? `되돌릴 것이 없습니다 — 같은 계열이라 양쪽에 같은 숫자를 넣습니다.`
        : `${f.back}을 곱합니다. ${f.factor}의 역수라 두 번 옮기면 원래 감도로 돌아옵니다.` },
      { q: 'eDPI가 같으면 두 게임에서 같은 감도인가요?', a: `아닙니다. 800 DPI에서 30cm/360°를 돌 때 ${f.from.short}의 eDPI는 ${f.pick.fromEdpi}, ${f.to.short}는 ${f.pick.toEdpi}입니다. ${f.same ? '이 둘은 상수가 같아 값도 같지만, 상수가 다른 게임과는' : '거리가 같아도 값이 다르므로'} eDPI로 게임을 건너 견줄 수 없습니다.` },
    ] : [
      { q: `${f.game.name} ${f.dpi} DPI에서 30cm/360°를 내려면 감도가 얼마인가요?`, a: `${f.pick.sens}입니다. eDPI로는 ${f.pick.edpi}이고, 360°를 돌리는 데 마우스 카운트 ${f.pick.counts}개가 듭니다.` },
      { q: 'DPI를 바꾸면 감도는 어떻게 되나요?', a: `같은 30cm/360°를 유지할 때 ${f.dpiRows[0].dpi} DPI에서는 ${f.dpiRows[0].sens}, ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI에서는 ${f.dpiRows[f.dpiRows.length - 1].sens}입니다. DPI를 몇 배로 하면 감도를 그만큼 나누면 되고, eDPI ${f.pick.edpi}은 어느 DPI에서도 같습니다.` },
      { q: '이 감도를 다른 게임에 그대로 넣어도 되나요?', a: `상수가 같은 게임끼리는 됩니다. ${f.game.name}의 상수는 ${f.game.yaw}이므로, 다른 상수를 쓰는 게임으로 옮길 때는 상수의 비를 곱해야 합니다 — 위의 변환 목록에 게임마다 그 곱수가 있습니다.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `How do I carry a ${f.from.name} sensitivity into ${f.to.name}?`, a: f.same
        ? `Type it in unchanged. Both games carry the constant ${f.from.yaw}, so the same number turns the same distance.`
        : `Multiply it by ${f.factor}. That is the constant ${f.from.yaw} divided by ${f.to.yaw}, and as long as you leave the mouse alone the multiplier is the same at any DPI.` },
      { q: 'What do I multiply by to go back?', a: f.same
        ? `There is nothing to undo — same family, same number on both sides.`
        : `By ${f.back}. It is the reciprocal of ${f.factor}, so converting twice returns the original sensitivity.` },
      { q: 'Does equal eDPI mean equal sensitivity in both games?', a: `No. Turning 30 cm/360° at 800 DPI puts ${f.from.short} at eDPI ${f.pick.fromEdpi} and ${f.to.short} at ${f.pick.toEdpi}. ${f.same ? 'These two match because the constant matches, but against a game with a different constant' : 'Same distance, different numbers, which is why'} eDPI cannot be compared across games.` },
    ] : [
      { q: `What sensitivity gives 30 cm/360° in ${f.game.name} at ${f.dpi} DPI?`, a: `${f.pick.sens}. That is an eDPI of ${f.pick.edpi}, and a full turn costs ${f.pick.counts} mouse counts.` },
      { q: 'What happens to the sensitivity if I change DPI?', a: `Holding the same 30 cm/360°, ${f.dpiRows[0].dpi} DPI wants ${f.dpiRows[0].sens} and ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI wants ${f.dpiRows[f.dpiRows.length - 1].sens}. Divide the sensitivity by whatever you multiplied the DPI by; the eDPI of ${f.pick.edpi} is the same at every DPI.` },
      { q: 'Can I type this sensitivity straight into another game?', a: `Only into games with the same constant. ${f.game.name} uses ${f.game.yaw}, so moving to a game with a different constant means multiplying by the ratio of the two — the conversion list above gives that multiplier for every game.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `Cómo llevo una sensibilidad de ${f.from.name} a ${f.to.name}?`, a: f.same
        ? `Escríbela tal cual. Los dos juegos llevan la constante ${nc(f.from.yaw)}, así que el mismo número gira la misma distancia.`
        : `Multiplícala por ${nc(f.factor)}. Es la constante ${nc(f.from.yaw)} dividida por ${nc(f.to.yaw)} y, mientras no toques el ratón, el multiplicador es el mismo con cualquier DPI.` },
      { q: 'Por cuánto multiplico para volver?', a: f.same
        ? `No hay nada que deshacer: misma familia, mismo número en los dos lados.`
        : `Por ${nc(f.back)}. Es el recíproco de ${nc(f.factor)}, así que convertir dos veces devuelve la sensibilidad original.` },
      { q: 'Igual eDPI significa igual sensibilidad en los dos juegos?', a: `No. Girar 30 cm/360° a 800 DPI deja a ${f.from.short} en eDPI ${f.pick.fromEdpi} y a ${f.to.short} en ${f.pick.toEdpi}. ${f.same ? 'Estos dos coinciden porque la constante coincide, pero frente a un juego con otra constante' : 'Misma distancia y números distintos: por eso'} el eDPI no se compara entre juegos.` },
    ] : [
      { q: `Qué sensibilidad da 30 cm/360° en ${f.game.name} a ${f.dpi} DPI?`, a: `${nc(f.pick.sens)}. Eso es un eDPI de ${f.pick.edpi}, y una vuelta completa cuesta ${f.pick.counts} conteos del ratón.` },
      { q: 'Qué le pasa a la sensibilidad si cambio los DPI?', a: `Manteniendo los mismos 30 cm/360°, ${f.dpiRows[0].dpi} DPI pide ${nc(f.dpiRows[0].sens)} y ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI pide ${nc(f.dpiRows[f.dpiRows.length - 1].sens)}. Divide la sensibilidad por lo mismo que multiplicaste los DPI; el eDPI de ${f.pick.edpi} es igual con cualquier DPI.` },
      { q: 'Puedo escribir esta sensibilidad tal cual en otro juego?', a: `Solo en juegos con la misma constante. ${f.game.name} usa ${nc(f.game.yaw)}, así que pasar a un juego con otra constante pide multiplicar por la razón entre ambas: la lista de conversión de arriba da ese multiplicador para cada juego.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `Como levo uma sensibilidade de ${f.from.name} para ${f.to.name}?`, a: f.same
        ? `Escreva tal como está. Os dois jogos carregam a constante ${nc(f.from.yaw)}, então o mesmo número gira a mesma distância.`
        : `Multiplique por ${nc(f.factor)}. É a constante ${nc(f.from.yaw)} dividida por ${nc(f.to.yaw)} e, enquanto não mexer no mouse, o multiplicador é o mesmo em qualquer DPI.` },
      { q: 'Por quanto multiplico para voltar?', a: f.same
        ? `Não há nada a desfazer: mesma família, mesmo número dos dois lados.`
        : `Por ${nc(f.back)}. É o recíproco de ${nc(f.factor)}, então converter duas vezes devolve a sensibilidade original.` },
      { q: 'eDPI igual significa sensibilidade igual nos dois jogos?', a: `Não. Girar 30 cm/360° a 800 DPI deixa ${f.from.short} em eDPI ${f.pick.fromEdpi} e ${f.to.short} em ${f.pick.toEdpi}. ${f.same ? 'Estes dois coincidem porque a constante coincide, mas diante de um jogo com outra constante' : 'Mesma distância e números diferentes: por isso'} o eDPI não se compara entre jogos.` },
    ] : [
      { q: `Que sensibilidade dá 30 cm/360° em ${f.game.name} a ${f.dpi} DPI?`, a: `${nc(f.pick.sens)}. Isso é um eDPI de ${f.pick.edpi}, e uma volta completa custa ${f.pick.counts} contagens do mouse.` },
      { q: 'O que acontece à sensibilidade se eu mudar o DPI?', a: `Mantendo os mesmos 30 cm/360°, ${f.dpiRows[0].dpi} DPI pede ${nc(f.dpiRows[0].sens)} e ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI pede ${nc(f.dpiRows[f.dpiRows.length - 1].sens)}. Divida a sensibilidade pelo mesmo fator com que multiplicou o DPI; o eDPI de ${f.pick.edpi} é igual em qualquer DPI.` },
      { q: 'Posso escrever esta sensibilidade tal como está noutro jogo?', a: `Só em jogos com a mesma constante. O ${f.game.name} usa ${nc(f.game.yaw)}, então passar a um jogo com outra constante pede multiplicar pela razão entre as duas: a lista de conversão acima dá esse multiplicador para cada jogo.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `${f.from.name}の感度を${f.to.name}へどう移しますか。`, a: f.same
        ? `そのまま書き移せます。二つのゲームの定数がどちらも${f.from.yaw}なので、同じ数字が同じ距離を回します。`
        : `感度に${f.factor}を掛けてください。定数${f.from.yaw}を${f.to.yaw}で割った値で、マウス側を変えなければどのDPIでも同じ倍率です。` },
      { q: '戻すにはいくつを掛けますか。', a: f.same
        ? `戻す必要がありません — 同じ系列なので両方に同じ数字を入れます。`
        : `${f.back}を掛けます。${f.factor}の逆数なので、二度移すと元の感度に戻ります。` },
      { q: 'eDPIが同じなら二つのゲームで同じ感度ですか。', a: `いいえ。800 DPIで30cm/360°を回すとき、${f.from.short}のeDPIは${f.pick.fromEdpi}、${f.to.short}は${f.pick.toEdpi}です。${f.same ? 'この二つは定数が同じなので値も同じですが、定数の違うゲームとは' : '距離が同じでも値が違うので'}eDPIでゲームをまたいで比べることはできません。` },
    ] : [
      { q: `${f.game.name}の${f.dpi} DPIで30cm/360°にするには感度をいくつにしますか。`, a: `${f.pick.sens}です。eDPIでは${f.pick.edpi}で、360°回すのにマウスカウント${f.pick.counts}個かかります。` },
      { q: 'DPIを変えると感度はどうなりますか。', a: `同じ30cm/360°を保つなら、${f.dpiRows[0].dpi} DPIでは${f.dpiRows[0].sens}、${f.dpiRows[f.dpiRows.length - 1].dpi} DPIでは${f.dpiRows[f.dpiRows.length - 1].sens}です。DPIを何倍かしたら感度をその分だけ割ればよく、eDPI ${f.pick.edpi}はどのDPIでも同じです。` },
      { q: 'この感度を他のゲームにそのまま入れてもいいですか。', a: `定数が同じゲーム同士なら大丈夫です。${f.game.name}の定数は${f.game.yaw}なので、別の定数のゲームへ移すときは定数の比を掛けます — 上の変換一覧にゲームごとの倍率があります。` },
    ],
    f => f.kind === 'pair' ? [
      { q: `Wie übertrage ich eine Empfindlichkeit von ${f.from.name} nach ${f.to.name}?`, a: f.same
        ? `Unverändert eintragen. Beide Spiele tragen die Konstante ${nc(f.from.yaw)}, dieselbe Zahl dreht also dieselbe Strecke.`
        : `Mit ${nc(f.factor)} multiplizieren. Das ist die Konstante ${nc(f.from.yaw)} geteilt durch ${nc(f.to.yaw)}, und solange du die Maus nicht anfasst, gilt derselbe Faktor bei jeder DPI.` },
      { q: 'Womit multipliziere ich zurück?', a: f.same
        ? `Es gibt nichts zurückzurechnen — dieselbe Familie, dieselbe Zahl auf beiden Seiten.`
        : `Mit ${nc(f.back)}. Das ist der Kehrwert von ${nc(f.factor)}, zweimal umgerechnet ergibt die ursprüngliche Empfindlichkeit.` },
      { q: 'Heißt gleiche eDPI gleiche Empfindlichkeit in beiden Spielen?', a: `Nein. Bei 30 cm/360° und 800 DPI liegt ${f.from.short} bei eDPI ${f.pick.fromEdpi} und ${f.to.short} bei ${f.pick.toEdpi}. ${f.same ? 'Diese beiden stimmen überein, weil die Konstante übereinstimmt, aber gegen ein Spiel mit anderer Konstante' : 'Gleiche Strecke, verschiedene Zahlen — deshalb'} lässt sich eDPI nicht über Spiele hinweg vergleichen.` },
    ] : [
      { q: `Welche Empfindlichkeit ergibt 30 cm/360° in ${f.game.name} bei ${f.dpi} DPI?`, a: `${nc(f.pick.sens)}. Das ist eine eDPI von ${f.pick.edpi}, und eine volle Umdrehung kostet ${f.pick.counts} Mauszählschritte.` },
      { q: 'Was passiert mit der Empfindlichkeit, wenn ich die DPI ändere?', a: `Bei gleichen 30 cm/360° will ${f.dpiRows[0].dpi} DPI ${nc(f.dpiRows[0].sens)} und ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI ${nc(f.dpiRows[f.dpiRows.length - 1].sens)}. Teile die Empfindlichkeit durch denselben Faktor, mit dem du die DPI multipliziert hast; die eDPI von ${f.pick.edpi} bleibt bei jeder DPI gleich.` },
      { q: 'Kann ich diese Empfindlichkeit direkt in ein anderes Spiel eintragen?', a: `Nur in Spiele mit derselben Konstante. ${f.game.name} nutzt ${nc(f.game.yaw)}, für ein Spiel mit anderer Konstante multiplizierst du mit dem Verhältnis der beiden — die Umrechnungsliste oben nennt diesen Faktor für jedes Spiel.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `Comment reporter une sensibilité de ${f.from.name} vers ${f.to.name} ?`, a: f.same
        ? `Reportez-la telle quelle. Les deux jeux portent la constante ${nc(f.from.yaw)} : le même chiffre fait tourner la même distance.`
        : `Multipliez-la par ${nc(f.factor)}. C’est la constante ${nc(f.from.yaw)} divisée par ${nc(f.to.yaw)}, et tant que vous ne touchez pas la souris, le facteur vaut pour n’importe quel DPI.` },
      { q: 'Par combien multiplier pour revenir ?', a: f.same
        ? `Il n’y a rien à défaire : même famille, même chiffre des deux côtés.`
        : `Par ${nc(f.back)}. C’est l’inverse de ${nc(f.factor)} : convertir deux fois redonne la sensibilité de départ.` },
      { q: 'Une eDPI égale donne-t-elle la même sensibilité dans les deux jeux ?', a: `Non. Pour 30 cm/360° à 800 DPI, ${f.from.short} est à une eDPI de ${f.pick.fromEdpi} et ${f.to.short} à ${f.pick.toEdpi}. ${f.same ? 'Ces deux-là coïncident parce que la constante coïncide, mais face à un jeu de constante différente' : 'Même distance, chiffres différents : c’est pourquoi'} l’eDPI ne se compare pas d’un jeu à l’autre.` },
    ] : [
      { q: `Quelle sensibilité donne 30 cm/360° dans ${f.game.name} à ${f.dpi} DPI ?`, a: `${nc(f.pick.sens)}. Cela fait une eDPI de ${f.pick.edpi}, et un tour complet coûte ${f.pick.counts} pas de souris.` },
      { q: 'Que devient la sensibilité si je change de DPI ?', a: `À 30 cm/360° constants, ${f.dpiRows[0].dpi} DPI demande ${nc(f.dpiRows[0].sens)} et ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI demande ${nc(f.dpiRows[f.dpiRows.length - 1].sens)}. Divisez la sensibilité par le facteur dont vous avez multiplié les DPI ; l’eDPI de ${f.pick.edpi} reste la même à n’importe quel DPI.` },
      { q: 'Puis-je saisir cette sensibilité telle quelle dans un autre jeu ?', a: `Seulement dans les jeux de même constante. ${f.game.name} utilise ${nc(f.game.yaw)} : pour un jeu de constante différente, multipliez par le rapport des deux — la liste de conversion ci-dessus donne ce facteur pour chaque jeu.` },
    ],
    f => f.kind === 'pair' ? [
      { q: `${f.from.name} की संवेदनशीलता ${f.to.name} में कैसे ले जाऊँ?`, a: f.same
        ? `जैसी है वैसी लिख दें। दोनों गेमों का स्थिरांक ${f.from.yaw} है, इसलिए वही अंक उतनी ही दूरी घुमाता है।`
        : `उसे ${f.factor} से गुणा करें। यह स्थिरांक ${f.from.yaw} को ${f.to.yaw} से भाग देने पर मिलता है, और जब तक माउस नहीं छूते, गुणक हर DPI पर वही रहता है।` },
      { q: 'वापस आने के लिए किससे गुणा करूँ?', a: f.same
        ? `वापस करने को कुछ नहीं है — एक ही परिवार, दोनों तरफ़ वही अंक।`
        : `${f.back} से। यह ${f.factor} का व्युत्क्रम है, इसलिए दो बार बदलने पर मूल संवेदनशीलता लौट आती है।` },
      { q: 'बराबर eDPI का मतलब दोनों गेमों में बराबर संवेदनशीलता है?', a: `नहीं। 800 DPI पर 30 cm/360° घूमने में ${f.from.short} का eDPI ${f.pick.fromEdpi} और ${f.to.short} का ${f.pick.toEdpi} है। ${f.same ? 'ये दोनों बराबर हैं क्योंकि स्थिरांक बराबर है, पर दूसरे स्थिरांक वाले गेम के सामने' : 'दूरी वही, अंक अलग — इसीलिए'} eDPI से गेमों की तुलना नहीं होती।` },
    ] : [
      { q: `${f.game.name} में ${f.dpi} DPI पर 30 cm/360° के लिए संवेदनशीलता क्या होगी?`, a: `${f.pick.sens}। eDPI के हिसाब से ${f.pick.edpi}, और एक पूरे चक्कर में ${f.pick.counts} माउस गिनतियाँ लगती हैं।` },
      { q: 'DPI बदलने पर संवेदनशीलता का क्या होता है?', a: `वही 30 cm/360° रखते हुए ${f.dpiRows[0].dpi} DPI पर ${f.dpiRows[0].sens} और ${f.dpiRows[f.dpiRows.length - 1].dpi} DPI पर ${f.dpiRows[f.dpiRows.length - 1].sens} चाहिए। DPI को जितने गुना किया, संवेदनशीलता को उतने से भाग दें; eDPI ${f.pick.edpi} हर DPI पर वही रहता है।` },
      { q: 'क्या यह संवेदनशीलता दूसरे गेम में सीधे डाल सकता हूँ?', a: `सिर्फ़ उन गेमों में जिनका स्थिरांक वही है। ${f.game.name} ${f.game.yaw} लेता है, तो दूसरे स्थिरांक वाले गेम में जाते समय दोनों का अनुपात गुणा करना पड़ता है — ऊपर की परिवर्तन सूची में हर गेम का वह गुणक है।` },
    ],
    f => f.kind === 'pair' ? [
      { q: `${f.from.name} 的灵敏度怎么换到 ${f.to.name}？`, a: f.same
        ? `照原样填就行。两款游戏的常数都是 ${f.from.yaw}，同一个数字转过同样的距离。`
        : `乘 ${f.factor}。这是常数 ${f.from.yaw} 除以 ${f.to.yaw} 得到的，只要不动鼠标，这个倍数在任何 DPI 都一样。` },
      { q: '换回来要乘多少？', a: f.same
        ? `没什么要换回来的 — 同一系，两边填一样的数字。`
        : `乘 ${f.back}。它是 ${f.factor} 的倒数，来回换两次就回到原来的灵敏度。` },
      { q: 'eDPI 相同就是两款游戏灵敏度相同吗？', a: `不是。在 800 DPI 下转 30 cm/360° 时，${f.from.short} 的 eDPI 是 ${f.pick.fromEdpi}，${f.to.short} 是 ${f.pick.toEdpi}。${f.same ? '这两个相等是因为常数相等，但面对常数不同的游戏时' : '距离相同而数值不同，正因如此'}eDPI 不能跨游戏比较。` },
    ] : [
      { q: `${f.game.name} 在 ${f.dpi} DPI 下，30 cm/360° 的灵敏度是多少？`, a: `${f.pick.sens}。换成 eDPI 是 ${f.pick.edpi}，转满一圈需要 ${f.pick.counts} 个鼠标计数。` },
      { q: '改了 DPI，灵敏度怎么变？', a: `要保持同样的 30 cm/360°，${f.dpiRows[0].dpi} DPI 需要 ${f.dpiRows[0].sens}，${f.dpiRows[f.dpiRows.length - 1].dpi} DPI 需要 ${f.dpiRows[f.dpiRows.length - 1].sens}。DPI 乘了几倍，灵敏度就除以几倍；eDPI ${f.pick.edpi} 在任何 DPI 下都一样。` },
      { q: '能把这个灵敏度直接填进别的游戏吗？', a: `只有常数相同的游戏可以。${f.game.name} 用 ${f.game.yaw}，换到常数不同的游戏要乘两者之比 — 上面的换算清单里每款游戏都有那个倍数。` },
    ],
    f => f.kind === 'pair' ? [
      { q: `${f.from.name} 的靈敏度怎麼換到 ${f.to.name}？`, a: f.same
        ? `照原樣填就行。兩款遊戲的常數都是 ${f.from.yaw}，同一個數字轉過同樣的距離。`
        : `乘 ${f.factor}。這是常數 ${f.from.yaw} 除以 ${f.to.yaw} 得到的，只要不動滑鼠，這個倍數在任何 DPI 都一樣。` },
      { q: '換回來要乘多少？', a: f.same
        ? `沒什麼要換回來的 — 同一系，兩邊填一樣的數字。`
        : `乘 ${f.back}。它是 ${f.factor} 的倒數，來回換兩次就回到原來的靈敏度。` },
      { q: 'eDPI 相同就是兩款遊戲靈敏度相同嗎？', a: `不是。在 800 DPI 下轉 30 cm/360° 時，${f.from.short} 的 eDPI 是 ${f.pick.fromEdpi}，${f.to.short} 是 ${f.pick.toEdpi}。${f.same ? '這兩個相等是因為常數相等，但面對常數不同的遊戲時' : '距離相同而數值不同，正因如此'}eDPI 不能跨遊戲比較。` },
    ] : [
      { q: `${f.game.name} 在 ${f.dpi} DPI 下，30 cm/360° 的靈敏度是多少？`, a: `${f.pick.sens}。換成 eDPI 是 ${f.pick.edpi}，轉滿一圈需要 ${f.pick.counts} 個滑鼠計數。` },
      { q: '改了 DPI，靈敏度怎麼變？', a: `要保持同樣的 30 cm/360°，${f.dpiRows[0].dpi} DPI 需要 ${f.dpiRows[0].sens}，${f.dpiRows[f.dpiRows.length - 1].dpi} DPI 需要 ${f.dpiRows[f.dpiRows.length - 1].sens}。DPI 乘了幾倍，靈敏度就除以幾倍；eDPI ${f.pick.edpi} 在任何 DPI 下都一樣。` },
      { q: '能把這個靈敏度直接填進別的遊戲嗎？', a: `只有常數相同的遊戲可以。${f.game.name} 用 ${f.game.yaw}，換到常數不同的遊戲要乘兩者之比 — 上面的換算清單裡每款遊戲都有那個倍數。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const DPI_UI: L<DpiUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<DpiUI>;
