/**
 * 수혈 적합표 화면의 문구 — 열 언어.
 *
 * 혈액형 표기(A+, O−)는 어느 나라 헌혈증에도 같은 모양으로 찍히므로 옮기지
 * 않는다. 옮기는 것은 성분 이름과 까닭뿐이다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BloodFacts, Reason } from './facts.ts';
import type { Component } from './list.ts';

export interface FaqItem { q: string; a: string }

export interface BloodUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  componentName: (c: Component) => string;
  componentNote: (c: Component) => string;
  reasonText: (r: Reason) => string;
  donorLabel: string;
  recipientLabel: string;
  verdictOk: string;
  verdictNo: string;
  antigenLabel: string;
  antibodyLabel: string;
  noneLabel: string;
  reachLabel: string;
  poolLabel: string;
  whyTitle: string;
  reverseTitle: string;
  reverseNote: (f: BloodFacts) => string;
  otherTitle: string;
  otherNote: string;
  giveTitle: string;
  takeTitle: string;
  flipTitle: string;
  flipNote: string;
  rhTitle: string;
  rhNote: string;
  safetyTitle: string;
  safetyNote: string;
  desc: (f: BloodFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BloodFacts) => string;
  metaDesc: (f: BloodFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BloodFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Words = Record<Component, string>;
const namer = (m: Words) => (c: Component) => m[c];

type Causes = Record<Reason, string>;
const causer = (m: Causes) => (r: Reason) => m[r];

const cKo: Words = { rbc: '적혈구', plasma: '혈장', whole: '전혈' };
const cEn: Words = { rbc: 'Red cells', plasma: 'Plasma', whole: 'Whole blood' };
const cEs: Words = { rbc: 'Glóbulos rojos', plasma: 'Plasma', whole: 'Sangre total' };
const cPt: Words = { rbc: 'Glóbulos vermelhos', plasma: 'Plasma', whole: 'Sangue total' };
const cJa: Words = { rbc: '赤血球', plasma: '血漿', whole: '全血' };
const cDe: Words = { rbc: 'Erythrozyten', plasma: 'Plasma', whole: 'Vollblut' };
const cFr: Words = { rbc: 'Globules rouges', plasma: 'Plasma', whole: 'Sang total' };
const cHi: Words = { rbc: 'लाल रक्त कोशिकाएँ', plasma: 'प्लाज़्मा', whole: 'संपूर्ण रक्त' };
const cZh: Words = { rbc: '红细胞', plasma: '血浆', whole: '全血' };
const cTw: Words = { rbc: '紅血球', plasma: '血漿', whole: '全血' };

const nKo: Words = {
  rbc: '받는 사람의 항체가 주는 적혈구의 항원을 치면 안 됩니다.',
  plasma: '주는 혈장의 항체가 받는 사람의 항원을 치면 안 됩니다 — 방향이 반대입니다.',
  whole: '적혈구와 혈장을 같이 넣으니 두 조건을 모두 만족해야 합니다.',
};
const nEn: Words = {
  rbc: "The recipient's antibodies must not attack the antigens on the donated red cells.",
  plasma: "The donated plasma's antibodies must not attack the recipient's antigens — the direction is reversed.",
  whole: 'Red cells and plasma go in together, so both conditions have to hold.',
};
const nEs: Words = {
  rbc: 'Los anticuerpos del receptor no deben atacar los antígenos de los glóbulos donados.',
  plasma: 'Los anticuerpos del plasma donado no deben atacar los antígenos del receptor: la dirección se invierte.',
  whole: 'Entran glóbulos y plasma juntos, así que deben cumplirse ambas condiciones.',
};
const nPt: Words = {
  rbc: 'Os anticorpos do receptor não podem atacar os antígenos das hemácias doadas.',
  plasma: 'Os anticorpos do plasma doado não podem atacar os antígenos do receptor — a direção se inverte.',
  whole: 'Hemácias e plasma entram juntos, então as duas condições precisam valer.',
};
const nJa: Words = {
  rbc: '受ける人の抗体が、渡される赤血球の抗原を攻撃してはいけません。',
  plasma: '渡される血漿の抗体が、受ける人の抗原を攻撃してはいけません — 向きが逆です。',
  whole: '赤血球と血漿を一緒に入れるので、両方の条件を満たす必要があります。',
};
const nDe: Words = {
  rbc: 'Die Antikörper des Empfängers dürfen die Antigene der gespendeten Erythrozyten nicht angreifen.',
  plasma: 'Die Antikörper des gespendeten Plasmas dürfen die Antigene des Empfängers nicht angreifen — die Richtung dreht sich um.',
  whole: 'Erythrozyten und Plasma kommen zusammen, also müssen beide Bedingungen gelten.',
};
const nFr: Words = {
  rbc: 'Les anticorps du receveur ne doivent pas attaquer les antigènes des globules donnés.',
  plasma: 'Les anticorps du plasma donné ne doivent pas attaquer les antigènes du receveur — le sens est inversé.',
  whole: 'Globules et plasma entrent ensemble : les deux conditions doivent tenir.',
};
const nHi: Words = {
  rbc: 'लेने वाले के एंटीबॉडी दान की गई लाल कोशिकाओं के एंटीजन पर हमला नहीं करने चाहिए।',
  plasma: 'दिए गए प्लाज़्मा के एंटीबॉडी लेने वाले के एंटीजन पर हमला नहीं करने चाहिए — दिशा उलटी है।',
  whole: 'लाल कोशिकाएँ और प्लाज़्मा साथ जाते हैं, इसलिए दोनों शर्तें पूरी होनी चाहिए।',
};
const nZh: Words = {
  rbc: '受血者的抗体不能攻击输入红细胞上的抗原。',
  plasma: '输入血浆里的抗体不能攻击受血者的抗原——方向是反的。',
  whole: '红细胞和血浆一起输入，两个条件都要满足。',
};
const nTw: Words = {
  rbc: '受血者的抗體不能攻擊輸入紅血球上的抗原。',
  plasma: '輸入血漿裡的抗體不能攻擊受血者的抗原——方向是反的。',
  whole: '紅血球和血漿一起輸入，兩個條件都要滿足。',
};

const rKo: Causes = {
  'recip-anti-a': '받는 사람의 항-A가 주는 적혈구의 A항원을 칩니다',
  'recip-anti-b': '받는 사람의 항-B가 주는 적혈구의 B항원을 칩니다',
  'rh-sensitise': 'Rh− 인 사람이 Rh+ 적혈구를 받으면 항-D가 생깁니다',
  'donor-anti-a': '주는 혈장의 항-A가 받는 사람의 A항원을 칩니다',
  'donor-anti-b': '주는 혈장의 항-B가 받는 사람의 B항원을 칩니다',
};
const rEn: Causes = {
  'recip-anti-a': "the recipient's anti-A attacks the A antigen on the donated red cells",
  'recip-anti-b': "the recipient's anti-B attacks the B antigen on the donated red cells",
  'rh-sensitise': 'an Rh− person who receives Rh+ red cells starts making anti-D',
  'donor-anti-a': "the donated plasma's anti-A attacks the recipient's A antigen",
  'donor-anti-b': "the donated plasma's anti-B attacks the recipient's B antigen",
};
const rEs: Causes = {
  'recip-anti-a': 'el anti-A del receptor ataca el antígeno A de los glóbulos donados',
  'recip-anti-b': 'el anti-B del receptor ataca el antígeno B de los glóbulos donados',
  'rh-sensitise': 'una persona Rh− que recibe glóbulos Rh+ empieza a fabricar anti-D',
  'donor-anti-a': 'el anti-A del plasma donado ataca el antígeno A del receptor',
  'donor-anti-b': 'el anti-B del plasma donado ataca el antígeno B del receptor',
};
const rPt: Causes = {
  'recip-anti-a': 'o anti-A do receptor ataca o antígeno A das hemácias doadas',
  'recip-anti-b': 'o anti-B do receptor ataca o antígeno B das hemácias doadas',
  'rh-sensitise': 'uma pessoa Rh− que recebe hemácias Rh+ passa a produzir anti-D',
  'donor-anti-a': 'o anti-A do plasma doado ataca o antígeno A do receptor',
  'donor-anti-b': 'o anti-B do plasma doado ataca o antígeno B do receptor',
};
const rJa: Causes = {
  'recip-anti-a': '受ける人の抗Aが、渡される赤血球のA抗原を攻撃します',
  'recip-anti-b': '受ける人の抗Bが、渡される赤血球のB抗原を攻撃します',
  'rh-sensitise': 'Rh− の人がRh+ の赤血球を受けると抗Dができます',
  'donor-anti-a': '渡される血漿の抗Aが、受ける人のA抗原を攻撃します',
  'donor-anti-b': '渡される血漿の抗Bが、受ける人のB抗原を攻撃します',
};
const rDe: Causes = {
  'recip-anti-a': 'das Anti-A des Empfängers greift das A-Antigen der gespendeten Erythrozyten an',
  'recip-anti-b': 'das Anti-B des Empfängers greift das B-Antigen der gespendeten Erythrozyten an',
  'rh-sensitise': 'wer Rh− ist und Rh+ Erythrozyten erhält, bildet Anti-D',
  'donor-anti-a': 'das Anti-A des gespendeten Plasmas greift das A-Antigen des Empfängers an',
  'donor-anti-b': 'das Anti-B des gespendeten Plasmas greift das B-Antigen des Empfängers an',
};
const rFr: Causes = {
  'recip-anti-a': "l'anti-A du receveur attaque l'antigène A des globules donnés",
  'recip-anti-b': "l'anti-B du receveur attaque l'antigène B des globules donnés",
  'rh-sensitise': 'une personne Rh− qui reçoit des globules Rh+ se met à fabriquer de l’anti-D',
  'donor-anti-a': "l'anti-A du plasma donné attaque l'antigène A du receveur",
  'donor-anti-b': "l'anti-B du plasma donné attaque l'antigène B du receveur",
};
const rHi: Causes = {
  'recip-anti-a': 'लेने वाले का anti-A दान की गई कोशिकाओं के A एंटीजन पर हमला करता है',
  'recip-anti-b': 'लेने वाले का anti-B दान की गई कोशिकाओं के B एंटीजन पर हमला करता है',
  'rh-sensitise': 'Rh− व्यक्ति Rh+ कोशिकाएँ लेने पर anti-D बनाने लगता है',
  'donor-anti-a': 'दिए गए प्लाज़्मा का anti-A लेने वाले के A एंटीजन पर हमला करता है',
  'donor-anti-b': 'दिए गए प्लाज़्मा का anti-B लेने वाले के B एंटीजन पर हमला करता है',
};
const rZh: Causes = {
  'recip-anti-a': '受血者的抗A攻击输入红细胞上的A抗原',
  'recip-anti-b': '受血者的抗B攻击输入红细胞上的B抗原',
  'rh-sensitise': 'Rh− 的人接受 Rh+ 红细胞后会产生抗D',
  'donor-anti-a': '输入血浆里的抗A攻击受血者的A抗原',
  'donor-anti-b': '输入血浆里的抗B攻击受血者的B抗原',
};
const rTw: Causes = {
  'recip-anti-a': '受血者的抗A攻擊輸入紅血球上的A抗原',
  'recip-anti-b': '受血者的抗B攻擊輸入紅血球上的B抗原',
  'rh-sensitise': 'Rh− 的人接受 Rh+ 紅血球後會產生抗D',
  'donor-anti-a': '輸入血漿裡的抗A攻擊受血者的A抗原',
  'donor-anti-b': '輸入血漿裡的抗B攻擊受血者的B抗原',
};

const label = (f: BloodFacts) => `${f.donor.abo}${f.donor.rh ? '+' : '−'}`;
const rlabel = (f: BloodFacts) => `${f.recipient.abo}${f.recipient.rh ? '+' : '−'}`;

type Spec = { [K in keyof BloodUI]: L<BloodUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    '수혈 적합표', 'Transfusion compatibility', 'Compatibilidad transfusional', 'Compatibilidade transfusional',
    '輸血適合表', 'Transfusionskompatibilität', 'Compatibilité transfusionnelle', 'रक्ताधान अनुकूलता',
    '输血相容性', '輸血相容性',
  ),

  hubTitle: T(
    '수혈 적합 192칸 — 혈장 규칙은 적혈구와 정반대입니다',
    '192 transfusion cells — the plasma rule runs backwards from the red cell rule',
    '192 casillas de transfusión — la regla del plasma va al revés que la de los glóbulos rojos',
    '192 células de transfusão — a regra do plasma é o inverso da regra das hemácias',
    '輸血適合192マス — 血漿の規則は赤血球と正反対です',
    '192 Transfusionsfelder — die Plasmaregel läuft der Erythrozytenregel genau entgegen',
    '192 cases de transfusion — la règle du plasma est l’inverse de celle des globules rouges',
    '192 रक्ताधान खाने — प्लाज़्मा का नियम लाल कोशिकाओं से ठीक उल्टा है',
    '192 格输血相容表 — 血浆的规则和红细胞正好相反',
    '192 格輸血相容表 — 血漿的規則和紅血球正好相反',
  ),

  hubLead: T(
    'O형은 적혈구를 여덟 혈액형 모두에게 줄 수 있지만, 혈장은 O형에게만 줄 수 있습니다. AB형은 정확히 그 반대입니다. 같은 사람이 성분에 따라 만능 공혈자가 되기도 하고 아무에게도 못 주기도 합니다 — 항원이 적혈구에 붙어 있고 항체가 혈장에 떠 있기 때문입니다. 성분 셋과 혈액형 여덟씩을 곱한 192칸을 항원·항체만으로 풀어 놓았습니다.',
    'O can give red cells to all eight blood types, but its plasma only to O. AB is exactly the reverse. The same person is the universal donor for one component and useless for the other — because the antigens sit on the red cells and the antibodies float in the plasma. All 192 cells (three components × eight donors × eight recipients) are worked out from antigens and antibodies alone.',
    'O puede dar glóbulos rojos a los ocho grupos, pero su plasma solo a O. Con AB ocurre justo lo contrario. La misma persona es donante universal de un componente e inservible para el otro, porque los antígenos van en los glóbulos y los anticuerpos flotan en el plasma. Las 192 casillas (tres componentes × ocho donantes × ocho receptores) salen solo de antígenos y anticuerpos.',
    'O pode dar hemácias aos oito grupos, mas seu plasma só para O. Com AB é exatamente o contrário. A mesma pessoa é doadora universal de um componente e inútil para o outro, porque os antígenos ficam nas hemácias e os anticorpos flutuam no plasma. As 192 células (três componentes × oito doadores × oito receptores) saem só de antígenos e anticorpos.',
    'O型は赤血球を八つの血液型すべてに渡せますが、血漿はO型にしか渡せません。AB型はちょうどその逆です。同じ人が成分によって万能供血者にも、誰にも渡せない側にもなります — 抗原が赤血球に付き、抗体が血漿に浮いているからです。成分3×血液型8×8の192マスを、抗原と抗体だけで解いてあります。',
    'O kann Erythrozyten an alle acht Blutgruppen abgeben, sein Plasma aber nur an O. Bei AB ist es genau umgekehrt. Dieselbe Person ist für eine Komponente Universalspender und für die andere unbrauchbar — weil die Antigene auf den Erythrozyten sitzen und die Antikörper im Plasma schwimmen. Alle 192 Felder (drei Komponenten × acht Spender × acht Empfänger) folgen allein aus Antigenen und Antikörpern.',
    'O peut donner ses globules rouges aux huit groupes, mais son plasma au seul groupe O. Pour AB, c’est exactement l’inverse. La même personne est donneur universel pour un composant et inutilisable pour l’autre : les antigènes sont sur les globules, les anticorps flottent dans le plasma. Les 192 cases (trois composants × huit donneurs × huit receveurs) découlent des seuls antigènes et anticorps.',
    'O सभी आठ रक्त समूहों को लाल कोशिकाएँ दे सकता है, पर प्लाज़्मा केवल O को। AB के साथ ठीक उल्टा है। वही व्यक्ति एक घटक के लिए सार्वभौमिक दाता और दूसरे के लिए बेकार होता है — क्योंकि एंटीजन लाल कोशिकाओं पर हैं और एंटीबॉडी प्लाज़्मा में। सभी 192 खाने (तीन घटक × आठ दाता × आठ प्राप्तकर्ता) केवल एंटीजन और एंटीबॉडी से निकाले गए हैं।',
    'O 型的红细胞可以给全部八种血型，血浆却只能给 O 型；AB 型正好倒过来。同一个人，换个成分就从万能供血者变成谁也帮不上——因为抗原长在红细胞上，抗体浮在血浆里。三种成分 × 八种供血者 × 八种受血者共 192 格，全部只用抗原和抗体推出来。',
    'O 型的紅血球可以給全部八種血型，血漿卻只能給 O 型；AB 型正好倒過來。同一個人，換個成分就從萬能供血者變成誰也幫不上——因為抗原長在紅血球上，抗體浮在血漿裡。三種成分 × 八種供血者 × 八種受血者共 192 格，全部只用抗原和抗體推出來。',
  ),

  componentName: T<(c: Component) => string>(
    namer(cKo), namer(cEn), namer(cEs), namer(cPt), namer(cJa),
    namer(cDe), namer(cFr), namer(cHi), namer(cZh), namer(cTw),
  ),

  componentNote: T<(c: Component) => string>(
    namer(nKo), namer(nEn), namer(nEs), namer(nPt), namer(nJa),
    namer(nDe), namer(nFr), namer(nHi), namer(nZh), namer(nTw),
  ),

  reasonText: T<(r: Reason) => string>(
    causer(rKo), causer(rEn), causer(rEs), causer(rPt), causer(rJa),
    causer(rDe), causer(rFr), causer(rHi), causer(rZh), causer(rTw),
  ),

  donorLabel: T('주는 사람', 'Donor', 'Donante', 'Doador', '渡す人', 'Spender', 'Donneur', 'दाता', '供血者', '供血者'),
  recipientLabel: T('받는 사람', 'Recipient', 'Receptor', 'Receptor', '受ける人', 'Empfänger', 'Receveur', 'प्राप्तकर्ता', '受血者', '受血者'),
  verdictOk: T('가능', 'Compatible', 'Compatible', 'Compatível', '適合', 'Verträglich', 'Compatible', 'अनुकूल', '相容', '相容'),
  verdictNo: T('불가', 'Incompatible', 'Incompatible', 'Incompatível', '不適合', 'Unverträglich', 'Incompatible', 'प्रतिकूल', '不相容', '不相容'),
  antigenLabel: T('항원', 'Antigens', 'Antígenos', 'Antígenos', '抗原', 'Antigene', 'Antigènes', 'एंटीजन', '抗原', '抗原'),
  antibodyLabel: T('항체', 'Antibodies', 'Anticuerpos', 'Anticorpos', '抗体', 'Antikörper', 'Anticorps', 'एंटीबॉडी', '抗体', '抗體'),
  noneLabel: T('없음', 'None', 'Ninguno', 'Nenhum', 'なし', 'Keine', 'Aucun', 'कोई नहीं', '无', '無'),
  reachLabel: T('줄 수 있는 혈액형', 'Can give to', 'Puede dar a', 'Pode doar a', '渡せる血液型', 'Kann geben an', 'Peut donner à', 'दे सकता है', '可以给', '可以給'),
  poolLabel: T('받을 수 있는 혈액형', 'Can receive from', 'Puede recibir de', 'Pode receber de', '受けられる血液型', 'Kann empfangen von', 'Peut recevoir de', 'ले सकता है', '可以接受', '可以接受'),

  whyTitle: T('왜 그런가', 'Why', 'Por qué', 'Por quê', 'なぜそうなるか', 'Warum', 'Pourquoi', 'क्यों', '为什么', '為什麼'),
  reverseTitle: T('방향을 바꾸면', 'The other direction', 'En sentido contrario', 'No sentido inverso', '向きを変えると', 'In der Gegenrichtung', 'Dans l’autre sens', 'उल्टी दिशा में', '把方向反过来', '把方向反過來'),
  otherTitle: T('같은 짝의 다른 성분', 'Same pair, other components', 'Mismo par, otros componentes', 'Mesmo par, outros componentes', '同じ組の他の成分', 'Dasselbe Paar, andere Komponenten', 'Même couple, autres composants', 'वही जोड़ा, अन्य घटक', '同一对，其他成分', '同一對，其他成分'),
  otherNote: T(
    '성분이 바뀌면 답이 바뀔 수 있습니다. 192칸 가운데 적혈구와 혈장의 답이 갈리는 짝이 39개입니다.',
    'Change the component and the answer can flip. Of the 64 donor–recipient pairs, 39 give a different answer for red cells than for plasma.',
    'Si cambia el componente, la respuesta puede invertirse. De los 64 pares, 39 dan una respuesta distinta para glóbulos que para plasma.',
    'Se o componente muda, a resposta pode inverter. Dos 64 pares, 39 dão resposta diferente para hemácias e para plasma.',
    '成分が変わると答えが変わることがあります。64組のうち39組で赤血球と血漿の答えが分かれます。',
    'Wechselt die Komponente, kann die Antwort kippen. Von 64 Paaren fallen 39 für Erythrozyten anders aus als für Plasma.',
    'Changez de composant et la réponse peut s’inverser. Sur 64 couples, 39 répondent différemment pour les globules et pour le plasma.',
    'घटक बदलते ही उत्तर पलट सकता है। 64 जोड़ों में से 39 में लाल कोशिकाओं और प्लाज़्मा का उत्तर अलग है।',
    '换个成分，答案就可能反过来。64 对里有 39 对，红细胞和血浆的答案不一样。',
    '換個成分，答案就可能反過來。64 對裡有 39 對，紅血球和血漿的答案不一樣。',
  ),
  giveTitle: T('이 사람이 줄 수 있는 곳', 'Where this donor can give', 'A quién puede dar', 'Para quem pode doar', 'この人が渡せる先', 'Wohin dieser Spender geben kann', 'À qui ce donneur peut donner', 'यह दाता किसे दे सकता है', '这位供血者能给谁', '這位供血者能給誰'),
  takeTitle: T('이 사람이 받을 수 있는 곳', 'Where this recipient can draw from', 'De quién puede recibir', 'De quem pode receber', 'この人が受けられる先', 'Woher dieser Empfänger nehmen kann', 'De qui ce receveur peut recevoir', 'यह प्राप्तकर्ता किससे ले सकता है', '这位受血者能从谁那里拿', '這位受血者能從誰那裡拿'),

  flipTitle: T('규칙이 뒤집히는 자리', 'Where the rule flips', 'Dónde se invierte la regla', 'Onde a regra se inverte', '規則が裏返る場所', 'Wo die Regel kippt', 'Là où la règle s’inverse', 'नियम कहाँ पलटता है', '规则倒过来的地方', '規則倒過來的地方'),
  flipNote: T(
    '항원은 적혈구에 붙어 있고 항체는 혈장에 떠 있습니다. 그래서 적혈구를 옮길 때는 받는 쪽의 항체가 문제가 되고, 혈장을 옮길 때는 주는 쪽의 항체가 문제가 됩니다. 조건의 방향이 통째로 뒤집히니 표도 전치됩니다 — 적혈구 표를 대각선으로 접으면 혈장 표가 나옵니다.',
    'The antigens sit on the red cells; the antibodies float in the plasma. So when you move red cells, the recipient’s antibodies are the problem; when you move plasma, the donor’s antibodies are. The whole condition reverses, and so does the table — fold the red cell chart along its diagonal and you get the plasma chart.',
    'Los antígenos están en los glóbulos; los anticuerpos flotan en el plasma. Al mover glóbulos, el problema son los anticuerpos del receptor; al mover plasma, los del donante. La condición se invierte por completo, y la tabla también: doble la tabla de glóbulos por su diagonal y obtiene la del plasma.',
    'Os antígenos ficam nas hemácias; os anticorpos flutuam no plasma. Ao mover hemácias, o problema são os anticorpos do receptor; ao mover plasma, os do doador. A condição se inverte por inteiro, e a tabela também: dobre a tabela das hemácias pela diagonal e obtém a do plasma.',
    '抗原は赤血球に付き、抗体は血漿に浮いています。だから赤血球を渡すときは受ける側の抗体が問題になり、血漿を渡すときは渡す側の抗体が問題になります。条件がまるごと裏返るので表も転置します — 赤血球の表を対角線で折ると血漿の表になります。',
    'Die Antigene sitzen auf den Erythrozyten, die Antikörper schwimmen im Plasma. Bewegt man Erythrozyten, stören die Antikörper des Empfängers; bewegt man Plasma, die des Spenders. Die Bedingung dreht sich vollständig um, und die Tabelle ebenso — faltet man die Erythrozytentabelle entlang ihrer Diagonale, erhält man die Plasmatabelle.',
    'Les antigènes sont sur les globules, les anticorps flottent dans le plasma. Quand on déplace des globules, ce sont les anticorps du receveur qui posent problème ; quand on déplace du plasma, ceux du donneur. La condition s’inverse entièrement, et le tableau aussi : pliez le tableau des globules le long de sa diagonale, vous obtenez celui du plasma.',
    'एंटीजन लाल कोशिकाओं पर होते हैं, एंटीबॉडी प्लाज़्मा में तैरते हैं। इसलिए लाल कोशिकाएँ भेजते समय लेने वाले के एंटीबॉडी बाधा हैं, और प्लाज़्मा भेजते समय देने वाले के। पूरी शर्त उलट जाती है और तालिका भी — लाल कोशिकाओं की तालिका को विकर्ण पर मोड़िए, प्लाज़्मा की तालिका मिलेगी।',
    '抗原长在红细胞上，抗体浮在血浆里。所以送红细胞时，挡路的是受血者的抗体；送血浆时，挡路的是供血者的抗体。整个条件反了过来，表也跟着转置——把红细胞的表沿对角线一折，就是血浆的表。',
    '抗原長在紅血球上，抗體浮在血漿裡。所以送紅血球時，擋路的是受血者的抗體；送血漿時，擋路的是供血者的抗體。整個條件反了過來，表也跟著轉置——把紅血球的表沿對角線一折，就是血漿的表。',
  ),

  rhTitle: T('Rh는 적혈구에서만 따집니다', 'Rh only matters for red cells', 'El Rh solo cuenta para los glóbulos', 'O Rh só conta para as hemácias', 'Rhは赤血球でだけ効きます', 'Rh zählt nur bei Erythrozyten', 'Le Rh ne compte que pour les globules', 'Rh केवल लाल कोशिकाओं में मायने रखता है', 'Rh 只在红细胞里算数', 'Rh 只在紅血球裡算數'),
  rhNote: T(
    'ABO 항체는 태어날 때부터 있지만 항-D는 없습니다. Rh− 인 사람이 Rh+ 적혈구를 받고 나서야 만들어집니다. 그래서 첫 수혈은 겉으로 멀쩡히 지나가고 다음번이 위험해집니다 — 임신에서 문제가 되는 것도 같은 이유입니다. 혈장에는 적혈구가 거의 없으므로 Rh를 따지지 않습니다.',
    'ABO antibodies are there from birth; anti-D is not. It only appears after an Rh− person has received Rh+ red cells. That is why the first such transfusion can pass uneventfully and the next one is the dangerous one — the same mechanism that matters in pregnancy. Plasma carries almost no red cells, so Rh is not checked for it.',
    'Los anticuerpos ABO existen desde el nacimiento; el anti-D no. Aparece solo después de que una persona Rh− haya recibido glóbulos Rh+. Por eso la primera transfusión así puede pasar sin incidentes y la peligrosa es la siguiente, el mismo mecanismo que importa en el embarazo. El plasma casi no lleva glóbulos, así que ahí no se mira el Rh.',
    'Os anticorpos ABO existem desde o nascimento; o anti-D não. Ele só aparece depois que uma pessoa Rh− recebeu hemácias Rh+. Por isso a primeira transfusão assim pode passar sem incidente e a perigosa é a seguinte — o mesmo mecanismo que importa na gravidez. O plasma quase não leva hemácias, então o Rh não é checado nele.',
    'ABO抗体は生まれつきありますが、抗Dはありません。Rh− の人がRh+ の赤血球を受けて初めて作られます。だから最初の輸血は何事もなく過ぎ、次が危なくなります — 妊娠で問題になるのも同じ仕組みです。血漿には赤血球がほとんど入らないのでRhは見ません。',
    'ABO-Antikörper sind von Geburt an da, Anti-D nicht. Es entsteht erst, nachdem eine Rh− Person Rh+ Erythrozyten erhalten hat. Deshalb kann die erste solche Transfusion folgenlos bleiben und die nächste ist die gefährliche — derselbe Mechanismus, der in der Schwangerschaft zählt. Plasma enthält kaum Erythrozyten, deshalb wird Rh dort nicht geprüft.',
    'Les anticorps ABO existent dès la naissance ; l’anti-D non. Il n’apparaît qu’après qu’une personne Rh− a reçu des globules Rh+. D’où le fait que la première transfusion de ce type passe souvent sans incident et que la suivante soit la dangereuse — le même mécanisme qu’en grossesse. Le plasma ne contient presque pas de globules : on n’y regarde pas le Rh.',
    'ABO एंटीबॉडी जन्म से मौजूद रहते हैं, anti-D नहीं। यह तभी बनता है जब कोई Rh− व्यक्ति Rh+ कोशिकाएँ ले चुका हो। इसीलिए पहली बार बिना घटना निकल सकती है और अगली बार खतरनाक होती है — गर्भावस्था में भी यही तंत्र मायने रखता है। प्लाज़्मा में लाल कोशिकाएँ लगभग नहीं होतीं, इसलिए वहाँ Rh नहीं देखा जाता।',
    'ABO 抗体生下来就有，抗D 没有。要等 Rh− 的人接受过 Rh+ 红细胞之后才产生。所以第一次这样输血往往平安无事，危险的是下一次——妊娠里出问题也是同一个机制。血浆里几乎没有红细胞，所以不看 Rh。',
    'ABO 抗體生下來就有，抗D 沒有。要等 Rh− 的人接受過 Rh+ 紅血球之後才產生。所以第一次這樣輸血往往平安無事，危險的是下一次——妊娠裡出問題也是同一個機制。血漿裡幾乎沒有紅血球，所以不看 Rh。',
  ),

  safetyTitle: T('실제 수혈은 이 표가 정하지 않습니다', 'This chart does not decide a real transfusion', 'Esta tabla no decide una transfusión real', 'Esta tabela não decide uma transfusão real', '実際の輸血をこの表が決めるわけではありません', 'Diese Tabelle entscheidet keine echte Transfusion', 'Ce tableau ne décide pas d’une transfusion réelle', 'यह तालिका असली रक्ताधान तय नहीं करती', '真实输血不由这张表决定', '真實輸血不由這張表決定'),
  safetyNote: T(
    'ABO와 RhD 말고도 사람의 적혈구에는 항원이 수백 가지 더 있고, 수혈을 여러 번 받은 사람에게는 그중 일부에 대한 항체가 생겨 있을 수 있습니다. 그래서 실제 수혈은 검사실이 그 두 사람의 피를 직접 섞어 보는 교차시험으로 정합니다. 이 표는 규칙이 왜 그런 모양인지를 보여 주는 것입니다.',
    'Beyond ABO and RhD there are hundreds of other red cell antigens, and someone who has been transfused repeatedly may carry antibodies to some of them. A real transfusion is therefore decided by a crossmatch — the lab mixing those two people’s blood directly. This chart explains why the rules have the shape they do.',
    'Más allá del ABO y el RhD existen cientos de antígenos eritrocitarios, y quien ha recibido muchas transfusiones puede llevar anticuerpos contra alguno. Por eso una transfusión real la decide la prueba cruzada: el laboratorio mezcla directamente la sangre de esas dos personas. Esta tabla explica por qué las reglas tienen esta forma.',
    'Além do ABO e do RhD há centenas de outros antígenos eritrocitários, e quem recebeu muitas transfusões pode carregar anticorpos contra alguns. Por isso uma transfusão real é decidida pela prova cruzada: o laboratório mistura diretamente o sangue das duas pessoas. Esta tabela explica por que as regras têm esse formato.',
    'ABOとRhDのほかにも赤血球の抗原は数百あり、輸血を何度も受けた人はその一部に対する抗体を持っていることがあります。だから実際の輸血は、検査室がその二人の血を直接混ぜる交差適合試験で決めます。この表は規則がなぜこの形なのかを示すものです。',
    'Neben ABO und RhD gibt es Hunderte weiterer Erythrozytenantigene, und wer oft transfundiert wurde, kann Antikörper gegen einige davon tragen. Eine echte Transfusion entscheidet deshalb die Kreuzprobe — das Labor mischt das Blut der beiden Personen direkt. Diese Tabelle zeigt, warum die Regeln so aussehen.',
    'Au-delà d’ABO et de RhD, il existe des centaines d’autres antigènes érythrocytaires, et une personne souvent transfusée peut porter des anticorps contre certains. Une transfusion réelle se décide donc par une épreuve croisée : le laboratoire mélange directement le sang des deux personnes. Ce tableau explique pourquoi les règles ont cette forme.',
    'ABO और RhD के अलावा लाल कोशिकाओं पर सैकड़ों और एंटीजन होते हैं, और बार-बार रक्त ले चुके व्यक्ति में उनमें से कुछ के विरुद्ध एंटीबॉडी बन सकते हैं। इसलिए असली रक्ताधान क्रॉसमैच से तय होता है — प्रयोगशाला उन दो लोगों का रक्त सीधे मिलाकर देखती है। यह तालिका बताती है कि नियम ऐसे क्यों हैं।',
    '除了 ABO 和 RhD，红细胞上还有几百种抗原；反复输过血的人可能已经带上了针对其中某些抗原的抗体。所以真实的输血由交叉配血决定——化验室把这两个人的血直接混在一起看。这张表讲的是规则为什么长成这样。',
    '除了 ABO 和 RhD，紅血球上還有幾百種抗原；反覆輸過血的人可能已經帶上了針對其中某些抗原的抗體。所以真實的輸血由交叉配血決定——化驗室把這兩個人的血直接混在一起看。這張表講的是規則為什麼長成這樣。',
  ),

  desc: T<(f: BloodFacts) => string>(
    f => `${label(f)} 가 ${rlabel(f)} 에게 ${cKo[f.cell.component]}을 주는 것은 ${f.ok ? '가능합니다' : '안 됩니다'}. ${f.ok ? `이 ${cKo[f.cell.component]}은 여덟 혈액형 가운데 ${f.reach}곳에 갈 수 있습니다.` : `${rKo[f.reasons[0]]}.`}`,
    f => `${label(f)} giving ${cEn[f.cell.component].toLowerCase()} to ${rlabel(f)} is ${f.ok ? 'compatible' : 'not compatible'}. ${f.ok ? `This donor reaches ${f.reach} of the eight blood types with this component.` : `Here ${rEn[f.reasons[0]]}.`}`,
    f => `${label(f)} donando ${cEs[f.cell.component].toLowerCase()} a ${rlabel(f)} ${f.ok ? 'es compatible' : 'no es compatible'}. ${f.ok ? `Con este componente el donante alcanza ${f.reach} de los ocho grupos.` : `Aquí ${rEs[f.reasons[0]]}.`}`,
    f => `${label(f)} doando ${cPt[f.cell.component].toLowerCase()} para ${rlabel(f)} ${f.ok ? 'é compatível' : 'não é compatível'}. ${f.ok ? `Com este componente o doador alcança ${f.reach} dos oito grupos.` : `Aqui ${rPt[f.reasons[0]]}.`}`,
    f => `${label(f)} が ${rlabel(f)} に${cJa[f.cell.component]}を渡すのは${f.ok ? '適合します' : '適合しません'}。${f.ok ? `この成分でこの人は八つの血液型のうち${f.reach}つに渡せます。` : `${rJa[f.reasons[0]]}。`}`,
    f => `${label(f)} gibt ${cDe[f.cell.component]} an ${rlabel(f)}: ${f.ok ? 'verträglich' : 'unverträglich'}. ${f.ok ? `Mit dieser Komponente erreicht der Spender ${f.reach} der acht Blutgruppen.` : `Hier ${rDe[f.reasons[0]]}.`}`,
    f => `${label(f)} donnant ${cFr[f.cell.component].toLowerCase()} à ${rlabel(f)} : ${f.ok ? 'compatible' : 'incompatible'}. ${f.ok ? `Avec ce composant, ce donneur atteint ${f.reach} des huit groupes.` : `Ici ${rFr[f.reasons[0]]}.`}`,
    f => `${label(f)} से ${rlabel(f)} को ${cHi[f.cell.component]} देना ${f.ok ? 'अनुकूल है' : 'अनुकूल नहीं है'}। ${f.ok ? `इस घटक के साथ यह दाता आठ में से ${f.reach} समूहों तक पहुँचता है।` : `यहाँ ${rHi[f.reasons[0]]}।`}`,
    f => `${label(f)} 给 ${rlabel(f)} 输${cZh[f.cell.component]}${f.ok ? '相容' : '不相容'}。${f.ok ? `这个成分下，这位供血者能覆盖八种血型中的 ${f.reach} 种。` : `${rZh[f.reasons[0]]}。`}`,
    f => `${label(f)} 給 ${rlabel(f)} 輸${cTw[f.cell.component]}${f.ok ? '相容' : '不相容'}。${f.ok ? `這個成分下，這位供血者能覆蓋八種血型中的 ${f.reach} 種。` : `${rTw[f.reasons[0]]}。`}`,
  ),

  reverseNote: T<(f: BloodFacts) => string>(
    f => `${rlabel(f)} 가 ${label(f)} 에게 같은 ${cKo[f.cell.component]}을 주는 것은 ${f.reverseOk ? '가능합니다' : '안 됩니다'}. ${f.ok === f.reverseOk ? '이 짝은 양쪽 답이 같습니다.' : '방향이 바뀌면 답이 뒤집히는 짝입니다.'}`,
    f => `${rlabel(f)} giving the same component back to ${label(f)} is ${f.reverseOk ? 'compatible' : 'not compatible'}. ${f.ok === f.reverseOk ? 'This pair reads the same both ways.' : 'This pair flips when you swap the direction.'}`,
    f => `Que ${rlabel(f)} devuelva el mismo componente a ${label(f)} ${f.reverseOk ? 'es compatible' : 'no es compatible'}. ${f.ok === f.reverseOk ? 'Este par se lee igual en ambos sentidos.' : 'Este par se invierte al cambiar el sentido.'}`,
    f => `${rlabel(f)} devolver o mesmo componente a ${label(f)} ${f.reverseOk ? 'é compatível' : 'não é compatível'}. ${f.ok === f.reverseOk ? 'Este par se lê igual nos dois sentidos.' : 'Este par se inverte ao trocar o sentido.'}`,
    f => `${rlabel(f)} が ${label(f)} に同じ成分を渡すのは${f.reverseOk ? '適合します' : '適合しません'}。${f.ok === f.reverseOk ? 'この組は両方向とも同じ答えです。' : 'この組は向きを変えると答えが裏返ります。'}`,
    f => `${rlabel(f)} gibt dieselbe Komponente zurück an ${label(f)}: ${f.reverseOk ? 'verträglich' : 'unverträglich'}. ${f.ok === f.reverseOk ? 'Dieses Paar liest sich in beide Richtungen gleich.' : 'Dieses Paar kippt, wenn man die Richtung tauscht.'}`,
    f => `${rlabel(f)} rendant le même composant à ${label(f)} : ${f.reverseOk ? 'compatible' : 'incompatible'}. ${f.ok === f.reverseOk ? 'Ce couple se lit pareil dans les deux sens.' : 'Ce couple s’inverse quand on change de sens.'}`,
    f => `${rlabel(f)} वही घटक ${label(f)} को लौटाए तो ${f.reverseOk ? 'अनुकूल है' : 'अनुकूल नहीं है'}। ${f.ok === f.reverseOk ? 'यह जोड़ा दोनों दिशाओं में एक-सा है।' : 'दिशा बदलते ही यह जोड़ा पलट जाता है।'}`,
    f => `反过来，${rlabel(f)} 给 ${label(f)} 输同一个成分${f.reverseOk ? '相容' : '不相容'}。${f.ok === f.reverseOk ? '这一对两个方向答案相同。' : '这一对换个方向答案就反了。'}`,
    f => `反過來，${rlabel(f)} 給 ${label(f)} 輸同一個成分${f.reverseOk ? '相容' : '不相容'}。${f.ok === f.reverseOk ? '這一對兩個方向答案相同。' : '這一對換個方向答案就反了。'}`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      '혈액형 이름이 곧 항원 목록입니다 — A형은 A항원, AB형은 둘 다, O형은 없습니다.',
      '항체는 자기가 갖지 않은 것을 칩니다 — O형은 항-A와 항-B를 둘 다 갖습니다.',
      '적혈구를 옮길 때는 받는 사람의 항체가 주는 적혈구의 항원을 치는지 봅니다.',
      '혈장을 옮길 때는 반대로 주는 혈장의 항체가 받는 사람의 항원을 치는지 봅니다.',
      'Rh는 적혈구에서만 봅니다. 자연항체가 없고 받아 본 뒤에 생기기 때문입니다.',
      '전혈은 두 조건을 겹친 것이라 ABO가 같은 사람끼리만 남습니다.',
    ],
    [
      'The name of a blood type is its antigen list — A has the A antigen, AB has both, O has none.',
      'Antibodies attack what you do not have — O carries both anti-A and anti-B.',
      'To move red cells, check whether the recipient’s antibodies attack the donated antigens.',
      'To move plasma, check the reverse: whether the donated antibodies attack the recipient’s antigens.',
      'Rh is checked only for red cells — there is no natural anti-D; it appears after exposure.',
      'Whole blood stacks both conditions, so only same-ABO pairs survive.',
    ],
    [
      'El nombre del grupo es su lista de antígenos: A tiene el antígeno A, AB los dos, O ninguno.',
      'Los anticuerpos atacan lo que uno no tiene: O lleva anti-A y anti-B.',
      'Para mover glóbulos, mire si los anticuerpos del receptor atacan los antígenos donados.',
      'Para mover plasma, mire lo contrario: si los anticuerpos donados atacan los antígenos del receptor.',
      'El Rh solo se mira en glóbulos: no hay anti-D natural, aparece tras la exposición.',
      'La sangre total suma ambas condiciones, así que solo quedan los pares del mismo ABO.',
    ],
    [
      'O nome do grupo é sua lista de antígenos: A tem o antígeno A, AB tem os dois, O não tem nenhum.',
      'Os anticorpos atacam o que você não tem: O carrega anti-A e anti-B.',
      'Para mover hemácias, veja se os anticorpos do receptor atacam os antígenos doados.',
      'Para mover plasma, veja o contrário: se os anticorpos doados atacam os antígenos do receptor.',
      'O Rh só é visto nas hemácias: não há anti-D natural, ele aparece após a exposição.',
      'O sangue total soma as duas condições, então só sobram os pares de mesmo ABO.',
    ],
    [
      '血液型の名前がそのまま抗原の一覧です — A型はA抗原、AB型は両方、O型はなしです。',
      '抗体は自分が持たないものを攻撃します — O型は抗Aと抗Bを両方持ちます。',
      '赤血球を渡すときは、受ける人の抗体が渡される抗原を攻撃するかを見ます。',
      '血漿を渡すときは逆に、渡される抗体が受ける人の抗原を攻撃するかを見ます。',
      'Rhは赤血球でだけ見ます。自然抗体がなく、受けた後にできるからです。',
      '全血は両方の条件を重ねるので、ABOが同じ組だけが残ります。',
    ],
    [
      'Der Name der Blutgruppe ist ihre Antigenliste — A hat das A-Antigen, AB beide, O keines.',
      'Antikörper greifen an, was man nicht hat — O trägt Anti-A und Anti-B.',
      'Für Erythrozyten prüfen Sie, ob die Antikörper des Empfängers die gespendeten Antigene angreifen.',
      'Für Plasma prüfen Sie das Umgekehrte: ob die gespendeten Antikörper die Antigene des Empfängers angreifen.',
      'Rh wird nur bei Erythrozyten geprüft — es gibt kein natürliches Anti-D, es entsteht nach Kontakt.',
      'Vollblut stapelt beide Bedingungen, daher bleiben nur Paare gleicher ABO-Gruppe übrig.',
    ],
    [
      'Le nom du groupe est sa liste d’antigènes : A porte l’antigène A, AB les deux, O aucun.',
      'Les anticorps attaquent ce que l’on n’a pas : O porte l’anti-A et l’anti-B.',
      'Pour les globules, regardez si les anticorps du receveur attaquent les antigènes donnés.',
      'Pour le plasma, regardez l’inverse : si les anticorps donnés attaquent les antigènes du receveur.',
      'Le Rh ne se regarde que pour les globules : il n’existe pas d’anti-D naturel, il apparaît après exposition.',
      'Le sang total empile les deux conditions, il ne reste donc que les couples de même ABO.',
    ],
    [
      'रक्त समूह का नाम ही उसकी एंटीजन सूची है — A में A एंटीजन, AB में दोनों, O में कोई नहीं।',
      'एंटीबॉडी उसी पर हमला करते हैं जो आपके पास नहीं है — O में anti-A और anti-B दोनों होते हैं।',
      'लाल कोशिकाएँ भेजते समय देखें कि लेने वाले के एंटीबॉडी दिए गए एंटीजन पर हमला करते हैं या नहीं।',
      'प्लाज़्मा भेजते समय उल्टा देखें: दिए गए एंटीबॉडी लेने वाले के एंटीजन पर हमला करते हैं या नहीं।',
      'Rh केवल लाल कोशिकाओं में देखा जाता है — प्राकृतिक anti-D नहीं होता, वह संपर्क के बाद बनता है।',
      'संपूर्ण रक्त दोनों शर्तें जोड़ता है, इसलिए केवल समान ABO वाले जोड़े बचते हैं।',
    ],
    [
      '血型的名字就是它的抗原清单——A 型有 A 抗原，AB 型两个都有，O 型一个也没有。',
      '抗体攻击的是你没有的东西——O 型同时带着抗A 和抗B。',
      '送红细胞时，看受血者的抗体会不会攻击送来的抗原。',
      '送血浆时反过来看：送来的抗体会不会攻击受血者的抗原。',
      'Rh 只在红细胞里看——没有天然的抗D，是接触之后才产生的。',
      '全血把两个条件叠在一起，所以只剩下 ABO 相同的组合。',
    ],
    [
      '血型的名字就是它的抗原清單——A 型有 A 抗原，AB 型兩個都有，O 型一個也沒有。',
      '抗體攻擊的是你沒有的東西——O 型同時帶著抗A 和抗B。',
      '送紅血球時，看受血者的抗體會不會攻擊送來的抗原。',
      '送血漿時反過來看：送來的抗體會不會攻擊受血者的抗原。',
      'Rh 只在紅血球裡看——沒有天然的抗D，是接觸之後才產生的。',
      '全血把兩個條件疊在一起，所以只剩下 ABO 相同的組合。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '수혈 적합표 — 적혈구·혈장·전혈 192칸',
    'Transfusion compatibility chart — red cells, plasma, whole blood',
    'Tabla de compatibilidad transfusional — glóbulos, plasma, sangre total',
    'Tabela de compatibilidade transfusional — hemácias, plasma, sangue total',
    '輸血適合表 — 赤血球・血漿・全血の192マス',
    'Transfusionstabelle — Erythrozyten, Plasma, Vollblut',
    'Tableau de compatibilité transfusionnelle — globules, plasma, sang total',
    'रक्ताधान अनुकूलता तालिका — लाल कोशिकाएँ, प्लाज़्मा, संपूर्ण रक्त',
    '输血相容表 — 红细胞、血浆、全血 192 格',
    '輸血相容表 — 紅血球、血漿、全血 192 格',
  ),
  hubMetaDesc: T(
    'O형은 적혈구의 만능 공혈자이고 AB형은 혈장의 만능 공혈자입니다. 성분 셋 × 혈액형 여덟 × 여덟, 192칸을 항원과 항체로 풀었습니다.',
    'O is the universal red cell donor and AB the universal plasma donor. Three components × eight donors × eight recipients, all 192 cells worked out from antigens and antibodies.',
    'O es el donante universal de glóbulos y AB el de plasma. Tres componentes × ocho donantes × ocho receptores: 192 casillas resueltas con antígenos y anticuerpos.',
    'O é o doador universal de hemácias e AB o de plasma. Três componentes × oito doadores × oito receptores: 192 células resolvidas com antígenos e anticorpos.',
    'O型は赤血球の万能供血者、AB型は血漿の万能供血者です。成分3×血液型8×8の192マスを抗原と抗体で解きました。',
    'O ist der Universalspender für Erythrozyten, AB für Plasma. Drei Komponenten × acht Spender × acht Empfänger: 192 Felder aus Antigenen und Antikörpern.',
    'O est le donneur universel de globules et AB celui de plasma. Trois composants × huit donneurs × huit receveurs : 192 cases établies à partir des antigènes et anticorps.',
    'O लाल कोशिकाओं का सार्वभौमिक दाता है और AB प्लाज़्मा का। तीन घटक × आठ दाता × आठ प्राप्तकर्ता — 192 खाने एंटीजन और एंटीबॉडी से।',
    'O 型是红细胞的万能供血者，AB 型是血浆的万能供血者。三成分 × 八供血者 × 八受血者，192 格全部由抗原和抗体推出。',
    'O 型是紅血球的萬能供血者，AB 型是血漿的萬能供血者。三成分 × 八供血者 × 八受血者，192 格全部由抗原和抗體推出。',
  ),

  metaTitle: T<(f: BloodFacts) => string>(
    f => `${label(f)} → ${rlabel(f)} ${cKo[f.cell.component]} 수혈 — ${f.ok ? '가능' : '불가'}`,
    f => `${label(f)} → ${rlabel(f)} ${cEn[f.cell.component].toLowerCase()} — ${f.ok ? 'compatible' : 'incompatible'}`,
    f => `${label(f)} → ${rlabel(f)} ${cEs[f.cell.component].toLowerCase()} — ${f.ok ? 'compatible' : 'incompatible'}`,
    f => `${label(f)} → ${rlabel(f)} ${cPt[f.cell.component].toLowerCase()} — ${f.ok ? 'compatível' : 'incompatível'}`,
    f => `${label(f)} → ${rlabel(f)} ${cJa[f.cell.component]}輸血 — ${f.ok ? '適合' : '不適合'}`,
    f => `${label(f)} → ${rlabel(f)} ${cDe[f.cell.component]} — ${f.ok ? 'verträglich' : 'unverträglich'}`,
    f => `${label(f)} → ${rlabel(f)} ${cFr[f.cell.component].toLowerCase()} — ${f.ok ? 'compatible' : 'incompatible'}`,
    f => `${label(f)} → ${rlabel(f)} ${cHi[f.cell.component]} — ${f.ok ? 'अनुकूल' : 'प्रतिकूल'}`,
    f => `${label(f)} → ${rlabel(f)} ${cZh[f.cell.component]} — ${f.ok ? '相容' : '不相容'}`,
    f => `${label(f)} → ${rlabel(f)} ${cTw[f.cell.component]} — ${f.ok ? '相容' : '不相容'}`,
  ),

  metaDesc: T<(f: BloodFacts) => string>(
    f => `${label(f)} 가 ${rlabel(f)} 에게 ${cKo[f.cell.component]}을 줄 수 있는지, 항원과 항체로 풀어 봅니다. ${f.ok ? `이 사람은 여덟 혈액형 가운데 ${f.reach}곳에 이 성분을 줄 수 있습니다.` : `${rKo[f.reasons[0]]}.`}`,
    f => `Whether ${label(f)} can give ${cEn[f.cell.component].toLowerCase()} to ${rlabel(f)}, worked out from antigens and antibodies. ${f.ok ? `This donor reaches ${f.reach} of eight blood types with this component.` : `Here ${rEn[f.reasons[0]]}.`}`,
    f => `Si ${label(f)} puede dar ${cEs[f.cell.component].toLowerCase()} a ${rlabel(f)}, resuelto con antígenos y anticuerpos. ${f.ok ? `Este donante alcanza ${f.reach} de ocho grupos con este componente.` : `Aquí ${rEs[f.reasons[0]]}.`}`,
    f => `Se ${label(f)} pode dar ${cPt[f.cell.component].toLowerCase()} a ${rlabel(f)}, resolvido com antígenos e anticorpos. ${f.ok ? `Este doador alcança ${f.reach} de oito grupos com este componente.` : `Aqui ${rPt[f.reasons[0]]}.`}`,
    f => `${label(f)} が ${rlabel(f)} に${cJa[f.cell.component]}を渡せるかを抗原と抗体で解きます。${f.ok ? `この成分で八つの血液型のうち${f.reach}つに渡せます。` : `${rJa[f.reasons[0]]}。`}`,
    f => `Ob ${label(f)} ${cDe[f.cell.component]} an ${rlabel(f)} geben kann — hergeleitet aus Antigenen und Antikörpern. ${f.ok ? `Mit dieser Komponente erreicht der Spender ${f.reach} von acht Blutgruppen.` : `Hier ${rDe[f.reasons[0]]}.`}`,
    f => `Si ${label(f)} peut donner ${cFr[f.cell.component].toLowerCase()} à ${rlabel(f)}, établi à partir des antigènes et anticorps. ${f.ok ? `Avec ce composant, ce donneur atteint ${f.reach} groupes sur huit.` : `Ici ${rFr[f.reasons[0]]}.`}`,
    f => `${label(f)} ${rlabel(f)} को ${cHi[f.cell.component]} दे सकता है या नहीं — एंटीजन और एंटीबॉडी से। ${f.ok ? `इस घटक के साथ यह दाता आठ में से ${f.reach} समूहों तक पहुँचता है।` : `यहाँ ${rHi[f.reasons[0]]}।`}`,
    f => `${label(f)} 能不能给 ${rlabel(f)} 输${cZh[f.cell.component]}，用抗原和抗体推。${f.ok ? `这个成分下能覆盖八种血型中的 ${f.reach} 种。` : `${rZh[f.reasons[0]]}。`}`,
    f => `${label(f)} 能不能給 ${rlabel(f)} 輸${cTw[f.cell.component]}，用抗原和抗體推。${f.ok ? `這個成分下能覆蓋八種血型中的 ${f.reach} 種。` : `${rTw[f.reasons[0]]}。`}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '만능 공혈자가 O형이라면서 왜 혈장은 안 되나요?', a: '항원은 적혈구에 붙어 있고 항체는 혈장에 떠 있기 때문입니다. O형 적혈구에는 항원이 없어 아무도 치지 않지만, O형 혈장에는 항-A와 항-B가 둘 다 들어 있어 O형이 아닌 사람을 칩니다. 혈장의 만능 공혈자는 AB형입니다.' },
      { q: '전혈은 왜 같은 혈액형끼리만 되나요?', a: '전혈에는 적혈구와 혈장이 같이 들어 있어 두 조건을 모두 만족해야 하는데, 그 둘을 겹치면 항원이 똑같은 경우만 남습니다. 따로 정한 규칙이 아니라 계산에서 나오는 결과입니다.' },
      { q: 'Rh−인데 급하면 Rh+를 받아도 되나요?', a: '적혈구는 안 됩니다. 항-D가 생겨서 다음 수혈이나 임신에서 문제가 됩니다. 다만 혈장은 적혈구가 거의 없어 Rh를 따지지 않습니다.' },
      { q: '이 표대로 수혈하면 되나요?', a: '아닙니다. ABO·RhD 말고도 적혈구 항원이 수백 가지 있어서 실제 수혈은 검사실이 두 사람의 피를 직접 섞는 교차시험으로 정합니다.' },
    ],
    [
      { q: 'If O is the universal donor, why not for plasma?', a: 'Because the antigens sit on the red cells and the antibodies float in the plasma. O red cells carry no antigens, so nothing attacks them — but O plasma carries both anti-A and anti-B, which attack anyone who is not O. The universal plasma donor is AB.' },
      { q: 'Why does whole blood need the same blood type?', a: 'Whole blood carries red cells and plasma together, so both conditions must hold — and stacking them leaves only pairs with identical antigens. It is not a separate rule; it falls out of the arithmetic.' },
      { q: 'I am Rh−. Can I take Rh+ in an emergency?', a: 'Not red cells: you would start making anti-D, which then matters for the next transfusion or in pregnancy. Plasma is different — it carries almost no red cells, so Rh is not checked.' },
      { q: 'Can I transfuse by this chart?', a: 'No. Beyond ABO and RhD there are hundreds of red cell antigens, so a real transfusion is decided by a crossmatch in which the lab mixes the two people’s blood directly.' },
    ],
    [
      { q: 'Si O es donante universal, ¿por qué no de plasma?', a: 'Porque los antígenos están en los glóbulos y los anticuerpos en el plasma. Los glóbulos O no llevan antígenos, así que nada los ataca; pero el plasma O lleva anti-A y anti-B, que atacan a quien no sea O. El donante universal de plasma es AB.' },
      { q: '¿Por qué la sangre total exige el mismo grupo?', a: 'Lleva glóbulos y plasma juntos, así que deben cumplirse ambas condiciones, y al sumarlas solo quedan los pares con antígenos idénticos. No es una regla aparte: sale de la aritmética.' },
      { q: 'Soy Rh−. ¿Puedo recibir Rh+ en una urgencia?', a: 'Glóbulos no: empezaría a fabricar anti-D, y eso importa en la siguiente transfusión o en un embarazo. El plasma es distinto: casi no lleva glóbulos, así que no se mira el Rh.' },
      { q: '¿Puedo transfundir con esta tabla?', a: 'No. Más allá del ABO y el RhD hay cientos de antígenos, así que una transfusión real la decide la prueba cruzada, en la que el laboratorio mezcla directamente la sangre de ambos.' },
    ],
    [
      { q: 'Se O é doador universal, por que não de plasma?', a: 'Porque os antígenos ficam nas hemácias e os anticorpos no plasma. As hemácias O não têm antígenos, então nada as ataca; mas o plasma O carrega anti-A e anti-B, que atacam quem não é O. O doador universal de plasma é AB.' },
      { q: 'Por que o sangue total exige o mesmo grupo?', a: 'Ele leva hemácias e plasma juntos, então as duas condições precisam valer, e ao somá-las sobram só os pares com antígenos idênticos. Não é uma regra à parte: sai da aritmética.' },
      { q: 'Sou Rh−. Posso receber Rh+ numa emergência?', a: 'Hemácias não: você passaria a produzir anti-D, o que importa na próxima transfusão ou numa gravidez. O plasma é diferente — quase não leva hemácias, então o Rh não é checado.' },
      { q: 'Posso transfundir por esta tabela?', a: 'Não. Além do ABO e do RhD há centenas de antígenos, então a transfusão real é decidida pela prova cruzada, em que o laboratório mistura o sangue dos dois diretamente.' },
    ],
    [
      { q: 'O型が万能供血者なのに、なぜ血漿はだめなのですか。', a: '抗原が赤血球に付き、抗体が血漿に浮いているからです。O型の赤血球には抗原がないので誰も攻撃しませんが、O型の血漿には抗Aと抗Bが両方入っていて、O型でない人を攻撃します。血漿の万能供血者はAB型です。' },
      { q: '全血はなぜ同じ血液型どうしだけなのですか。', a: '全血は赤血球と血漿を一緒に含むので両方の条件を満たす必要があり、重ねると抗原がまったく同じ場合しか残りません。別に決めた規則ではなく計算から出る結果です。' },
      { q: 'Rh− ですが、緊急ならRh+ を受けてよいですか。', a: '赤血球はだめです。抗Dができて、次の輸血や妊娠で問題になります。血漿は赤血球がほとんど入らないのでRhを見ません。' },
      { q: 'この表のとおりに輸血してよいですか。', a: 'いいえ。ABO・RhD のほかに赤血球抗原が数百あるため、実際の輸血は検査室が二人の血を直接混ぜる交差適合試験で決めます。' },
    ],
    [
      { q: 'Wenn O Universalspender ist, warum nicht für Plasma?', a: 'Weil die Antigene auf den Erythrozyten sitzen und die Antikörper im Plasma schwimmen. O-Erythrozyten tragen keine Antigene, also greift sie nichts an — O-Plasma trägt aber Anti-A und Anti-B und greift jeden an, der nicht O ist. Universalspender für Plasma ist AB.' },
      { q: 'Warum verlangt Vollblut dieselbe Blutgruppe?', a: 'Vollblut enthält Erythrozyten und Plasma zugleich, also müssen beide Bedingungen gelten — übereinandergelegt bleiben nur Paare mit identischen Antigenen. Das ist keine eigene Regel, sondern folgt aus der Rechnung.' },
      { q: 'Ich bin Rh−. Darf ich im Notfall Rh+ bekommen?', a: 'Erythrozyten nicht: Sie würden Anti-D bilden, was bei der nächsten Transfusion oder in einer Schwangerschaft zählt. Plasma ist anders — es enthält kaum Erythrozyten, deshalb wird Rh dort nicht geprüft.' },
      { q: 'Kann ich nach dieser Tabelle transfundieren?', a: 'Nein. Neben ABO und RhD gibt es Hunderte Erythrozytenantigene; eine echte Transfusion entscheidet die Kreuzprobe, bei der das Labor das Blut beider direkt mischt.' },
    ],
    [
      { q: 'Si O est donneur universel, pourquoi pas pour le plasma ?', a: 'Parce que les antigènes sont sur les globules et les anticorps dans le plasma. Les globules O ne portent aucun antigène, rien ne les attaque ; mais le plasma O porte l’anti-A et l’anti-B, qui attaquent quiconque n’est pas O. Le donneur universel de plasma est AB.' },
      { q: 'Pourquoi le sang total exige-t-il le même groupe ?', a: 'Il contient globules et plasma ensemble : les deux conditions doivent tenir, et leur superposition ne laisse que les couples aux antigènes identiques. Ce n’est pas une règle à part, cela découle du calcul.' },
      { q: 'Je suis Rh−. Puis-je recevoir du Rh+ en urgence ?', a: 'Pas de globules : vous fabriqueriez de l’anti-D, ce qui compte à la transfusion suivante ou en grossesse. Le plasma est différent — il ne contient presque pas de globules, on n’y regarde pas le Rh.' },
      { q: 'Puis-je transfuser d’après ce tableau ?', a: 'Non. Au-delà d’ABO et de RhD il existe des centaines d’antigènes ; une transfusion réelle se décide par une épreuve croisée où le laboratoire mélange directement les deux sangs.' },
    ],
    [
      { q: 'अगर O सार्वभौमिक दाता है, तो प्लाज़्मा में क्यों नहीं?', a: 'क्योंकि एंटीजन लाल कोशिकाओं पर हैं और एंटीबॉडी प्लाज़्मा में। O की कोशिकाओं पर कोई एंटीजन नहीं, इसलिए उन पर हमला नहीं होता; पर O के प्लाज़्मा में anti-A और anti-B दोनों हैं, जो हर गैर-O पर हमला करते हैं। प्लाज़्मा का सार्वभौमिक दाता AB है।' },
      { q: 'संपूर्ण रक्त के लिए वही समूह क्यों चाहिए?', a: 'उसमें कोशिकाएँ और प्लाज़्मा साथ होते हैं, इसलिए दोनों शर्तें पूरी होनी चाहिए — और दोनों जोड़ने पर केवल समान एंटीजन वाले जोड़े बचते हैं। यह अलग नियम नहीं, गणित का परिणाम है।' },
      { q: 'मैं Rh− हूँ। आपात में Rh+ ले सकता हूँ?', a: 'लाल कोशिकाएँ नहीं: anti-D बनने लगेगा, जो अगली बार या गर्भावस्था में मायने रखता है। प्लाज़्मा अलग है — उसमें कोशिकाएँ लगभग नहीं होतीं, इसलिए Rh नहीं देखा जाता।' },
      { q: 'क्या इस तालिका से रक्ताधान कर सकते हैं?', a: 'नहीं। ABO और RhD के अलावा सैकड़ों एंटीजन हैं, इसलिए असली रक्ताधान क्रॉसमैच से तय होता है, जिसमें प्रयोगशाला दोनों का रक्त सीधे मिलाती है।' },
    ],
    [
      { q: 'O 型是万能供血者，为什么血浆不行？', a: '因为抗原长在红细胞上，抗体浮在血浆里。O 型红细胞没有抗原，谁也不会攻击它；但 O 型血浆里同时有抗A 和抗B，会攻击所有非 O 型的人。血浆的万能供血者是 AB 型。' },
      { q: '全血为什么只能同型？', a: '全血同时含红细胞和血浆，两个条件都得满足；叠在一起之后，只剩下抗原完全相同的组合。这不是另定的规矩，是算出来的结果。' },
      { q: '我是 Rh−，紧急时能接受 Rh+ 吗？', a: '红细胞不行，会产生抗D，下一次输血或者怀孕时就成问题。血浆不一样——里面几乎没有红细胞，所以不看 Rh。' },
      { q: '可以照这张表输血吗？', a: '不可以。除了 ABO 和 RhD 还有几百种红细胞抗原，真实输血要靠交叉配血：化验室把两个人的血直接混在一起看。' },
    ],
    [
      { q: 'O 型是萬能供血者，為什麼血漿不行？', a: '因為抗原長在紅血球上，抗體浮在血漿裡。O 型紅血球沒有抗原，誰也不會攻擊它；但 O 型血漿裡同時有抗A 和抗B，會攻擊所有非 O 型的人。血漿的萬能供血者是 AB 型。' },
      { q: '全血為什麼只能同型？', a: '全血同時含紅血球和血漿，兩個條件都得滿足；疊在一起之後，只剩下抗原完全相同的組合。這不是另定的規矩，是算出來的結果。' },
      { q: '我是 Rh−，緊急時能接受 Rh+ 嗎？', a: '紅血球不行，會產生抗D，下一次輸血或者懷孕時就成問題。血漿不一樣——裡面幾乎沒有紅血球，所以不看 Rh。' },
      { q: '可以照這張表輸血嗎？', a: '不可以。除了 ABO 和 RhD 還有幾百種紅血球抗原，真實輸血要靠交叉配血：化驗室把兩個人的血直接混在一起看。' },
    ],
  ),

  cellFaq: T<(f: BloodFacts) => FaqItem[]>(
    f => [
      { q: `${label(f)} 가 ${rlabel(f)} 에게 ${cKo[f.cell.component]}을 줄 수 있나요?`, a: f.ok ? `줄 수 있습니다. ${cKo[f.cell.component]}에서는 ${nKo[f.cell.component]}` : `줄 수 없습니다 — ${rKo[f.reasons[0]]}.` },
      { q: `${label(f)} 는 이 성분을 몇 곳에 줄 수 있나요?`, a: `여덟 혈액형 가운데 ${f.reach}곳입니다. 반대로 ${rlabel(f)} 는 ${f.pool}곳에서 받을 수 있습니다.` },
      { q: `방향을 바꾸면 어떻게 되나요?`, a: `${rlabel(f)} 가 ${label(f)} 에게 주는 것은 ${f.reverseOk ? '가능합니다' : '안 됩니다'}. ${f.ok === f.reverseOk ? '이 짝은 양쪽이 같습니다.' : '방향에 따라 답이 갈리는 짝입니다.'}` },
      { q: f.split ? `적혈구와 혈장의 답이 다른가요?` : `다른 성분은 어떤가요?`, a: f.split ? `다릅니다. 이 짝은 적혈구가 ${f.rbcOk ? '가능' : '불가'}, 혈장이 ${f.plasmaOk ? '가능' : '불가'} 입니다 — 항원과 항체가 서로 다른 자리에 있기 때문입니다.` : `${f.others.map(o => `${cKo[o.component]}은 ${o.ok ? '가능' : '불가'}`).join(', ')} 입니다.` },
    ],
    f => [
      { q: `Can ${label(f)} give ${cEn[f.cell.component].toLowerCase()} to ${rlabel(f)}?`, a: f.ok ? `Yes. For this component: ${nEn[f.cell.component]}` : `No — ${rEn[f.reasons[0]]}.` },
      { q: `How many types can ${label(f)} reach with this component?`, a: `${f.reach} of the eight. In the other direction, ${rlabel(f)} can draw from ${f.pool}.` },
      { q: `What if you swap the direction?`, a: `${rlabel(f)} giving to ${label(f)} is ${f.reverseOk ? 'compatible' : 'not compatible'}. ${f.ok === f.reverseOk ? 'This pair reads the same both ways.' : 'This is a pair whose answer depends on direction.'}` },
      { q: f.split ? `Do red cells and plasma disagree here?` : `What about the other components?`, a: f.split ? `Yes. For this pair red cells are ${f.rbcOk ? 'compatible' : 'incompatible'} while plasma is ${f.plasmaOk ? 'compatible' : 'incompatible'} — the antigens and the antibodies live in different places.` : `${f.others.map(o => `${cEn[o.component].toLowerCase()}: ${o.ok ? 'compatible' : 'incompatible'}`).join(', ')}.` },
    ],
    f => [
      { q: `¿Puede ${label(f)} dar ${cEs[f.cell.component].toLowerCase()} a ${rlabel(f)}?`, a: f.ok ? `Sí. Para este componente: ${nEs[f.cell.component]}` : `No — ${rEs[f.reasons[0]]}.` },
      { q: `¿A cuántos grupos alcanza ${label(f)} con este componente?`, a: `A ${f.reach} de ocho. En sentido inverso, ${rlabel(f)} puede recibir de ${f.pool}.` },
      { q: `¿Y si se invierte el sentido?`, a: `Que ${rlabel(f)} dé a ${label(f)} ${f.reverseOk ? 'es compatible' : 'no es compatible'}. ${f.ok === f.reverseOk ? 'Este par se lee igual en ambos sentidos.' : 'Es un par cuya respuesta depende del sentido.'}` },
      { q: f.split ? `¿Discrepan aquí glóbulos y plasma?` : `¿Y los otros componentes?`, a: f.split ? `Sí. En este par los glóbulos son ${f.rbcOk ? 'compatibles' : 'incompatibles'} y el plasma ${f.plasmaOk ? 'compatible' : 'incompatible'}: antígenos y anticuerpos viven en sitios distintos.` : `${f.others.map(o => `${cEs[o.component].toLowerCase()}: ${o.ok ? 'compatible' : 'incompatible'}`).join(', ')}.` },
    ],
    f => [
      { q: `${label(f)} pode dar ${cPt[f.cell.component].toLowerCase()} a ${rlabel(f)}?`, a: f.ok ? `Pode. Para este componente: ${nPt[f.cell.component]}` : `Não — ${rPt[f.reasons[0]]}.` },
      { q: `Quantos grupos ${label(f)} alcança com este componente?`, a: `${f.reach} de oito. No sentido inverso, ${rlabel(f)} pode receber de ${f.pool}.` },
      { q: `E se inverter o sentido?`, a: `${rlabel(f)} doar a ${label(f)} ${f.reverseOk ? 'é compatível' : 'não é compatível'}. ${f.ok === f.reverseOk ? 'Este par se lê igual nos dois sentidos.' : 'É um par cuja resposta depende do sentido.'}` },
      { q: f.split ? `Hemácias e plasma divergem aqui?` : `E os outros componentes?`, a: f.split ? `Sim. Neste par as hemácias são ${f.rbcOk ? 'compatíveis' : 'incompatíveis'} e o plasma ${f.plasmaOk ? 'compatível' : 'incompatível'} — antígenos e anticorpos ficam em lugares diferentes.` : `${f.others.map(o => `${cPt[o.component].toLowerCase()}: ${o.ok ? 'compatível' : 'incompatível'}`).join(', ')}.` },
    ],
    f => [
      { q: `${label(f)} は ${rlabel(f)} に${cJa[f.cell.component]}を渡せますか。`, a: f.ok ? `渡せます。この成分では、${nJa[f.cell.component]}` : `渡せません — ${rJa[f.reasons[0]]}。` },
      { q: `${label(f)} はこの成分をいくつの血液型に渡せますか。`, a: `八つのうち${f.reach}つです。逆に ${rlabel(f)} は${f.pool}つから受けられます。` },
      { q: `向きを変えるとどうなりますか。`, a: `${rlabel(f)} が ${label(f)} に渡すのは${f.reverseOk ? '適合します' : '適合しません'}。${f.ok === f.reverseOk ? 'この組は両方向とも同じです。' : '向きで答えが分かれる組です。'}` },
      { q: f.split ? `赤血球と血漿で答えが違いますか。` : `他の成分はどうですか。`, a: f.split ? `違います。この組は赤血球が${f.rbcOk ? '適合' : '不適合'}、血漿が${f.plasmaOk ? '適合' : '不適合'}です — 抗原と抗体のある場所が違うからです。` : `${f.others.map(o => `${cJa[o.component]}は${o.ok ? '適合' : '不適合'}`).join('、')}です。` },
    ],
    f => [
      { q: `Kann ${label(f)} ${cDe[f.cell.component]} an ${rlabel(f)} geben?`, a: f.ok ? `Ja. Für diese Komponente gilt: ${nDe[f.cell.component]}` : `Nein — ${rDe[f.reasons[0]]}.` },
      { q: `Wie viele Gruppen erreicht ${label(f)} mit dieser Komponente?`, a: `${f.reach} von acht. Umgekehrt kann ${rlabel(f)} von ${f.pool} empfangen.` },
      { q: `Und in der Gegenrichtung?`, a: `${rlabel(f)} an ${label(f)}: ${f.reverseOk ? 'verträglich' : 'unverträglich'}. ${f.ok === f.reverseOk ? 'Dieses Paar liest sich in beide Richtungen gleich.' : 'Bei diesem Paar hängt die Antwort von der Richtung ab.'}` },
      { q: f.split ? `Weichen Erythrozyten und Plasma hier voneinander ab?` : `Was ist mit den anderen Komponenten?`, a: f.split ? `Ja. Für dieses Paar sind Erythrozyten ${f.rbcOk ? 'verträglich' : 'unverträglich'} und Plasma ${f.plasmaOk ? 'verträglich' : 'unverträglich'} — Antigene und Antikörper sitzen an verschiedenen Orten.` : `${f.others.map(o => `${cDe[o.component]}: ${o.ok ? 'verträglich' : 'unverträglich'}`).join(', ')}.` },
    ],
    f => [
      { q: `${label(f)} peut-il donner ${cFr[f.cell.component].toLowerCase()} à ${rlabel(f)} ?`, a: f.ok ? `Oui. Pour ce composant : ${nFr[f.cell.component]}` : `Non — ${rFr[f.reasons[0]]}.` },
      { q: `Combien de groupes ${label(f)} atteint-il avec ce composant ?`, a: `${f.reach} sur huit. En sens inverse, ${rlabel(f)} peut recevoir de ${f.pool}.` },
      { q: `Et si on inverse le sens ?`, a: `${rlabel(f)} donnant à ${label(f)} : ${f.reverseOk ? 'compatible' : 'incompatible'}. ${f.ok === f.reverseOk ? 'Ce couple se lit pareil dans les deux sens.' : 'C’est un couple dont la réponse dépend du sens.'}` },
      { q: f.split ? `Globules et plasma divergent-ils ici ?` : `Et les autres composants ?`, a: f.split ? `Oui. Pour ce couple les globules sont ${f.rbcOk ? 'compatibles' : 'incompatibles'} et le plasma ${f.plasmaOk ? 'compatible' : 'incompatible'} — antigènes et anticorps ne sont pas au même endroit.` : `${f.others.map(o => `${cFr[o.component].toLowerCase()} : ${o.ok ? 'compatible' : 'incompatible'}`).join(', ')}.` },
    ],
    f => [
      { q: `क्या ${label(f)} ${rlabel(f)} को ${cHi[f.cell.component]} दे सकता है?`, a: f.ok ? `हाँ। इस घटक के लिए: ${nHi[f.cell.component]}` : `नहीं — ${rHi[f.reasons[0]]}।` },
      { q: `इस घटक से ${label(f)} कितने समूहों तक पहुँचता है?`, a: `आठ में से ${f.reach}। उल्टी दिशा में ${rlabel(f)} ${f.pool} से ले सकता है।` },
      { q: `दिशा बदलने पर क्या होता है?`, a: `${rlabel(f)} से ${label(f)} को देना ${f.reverseOk ? 'अनुकूल है' : 'अनुकूल नहीं है'}। ${f.ok === f.reverseOk ? 'यह जोड़ा दोनों दिशाओं में एक-सा है।' : 'इस जोड़े का उत्तर दिशा पर निर्भर है।'}` },
      { q: f.split ? `क्या यहाँ लाल कोशिकाएँ और प्लाज़्मा अलग उत्तर देते हैं?` : `अन्य घटकों का क्या?`, a: f.split ? `हाँ। इस जोड़े में लाल कोशिकाएँ ${f.rbcOk ? 'अनुकूल' : 'प्रतिकूल'} और प्लाज़्मा ${f.plasmaOk ? 'अनुकूल' : 'प्रतिकूल'} है — एंटीजन और एंटीबॉडी अलग-अलग जगह रहते हैं।` : `${f.others.map(o => `${cHi[o.component]}: ${o.ok ? 'अनुकूल' : 'प्रतिकूल'}`).join(', ')}।` },
    ],
    f => [
      { q: `${label(f)} 能给 ${rlabel(f)} 输${cZh[f.cell.component]}吗？`, a: f.ok ? `可以。这个成分的规则是：${nZh[f.cell.component]}` : `不可以——${rZh[f.reasons[0]]}。` },
      { q: `这个成分下 ${label(f)} 能覆盖几种血型？`, a: `八种里的 ${f.reach} 种。反过来，${rlabel(f)} 可以从 ${f.pool} 种接受。` },
      { q: `方向反过来会怎样？`, a: `${rlabel(f)} 给 ${label(f)} 输${f.reverseOk ? '相容' : '不相容'}。${f.ok === f.reverseOk ? '这一对两个方向答案相同。' : '这一对的答案取决于方向。'}` },
      { q: f.split ? `这里红细胞和血浆的答案不一样吗？` : `其他成分呢？`, a: f.split ? `不一样。这一对红细胞${f.rbcOk ? '相容' : '不相容'}，血浆${f.plasmaOk ? '相容' : '不相容'}——抗原和抗体待在不同的地方。` : `${f.others.map(o => `${cZh[o.component]}${o.ok ? '相容' : '不相容'}`).join('，')}。` },
    ],
    f => [
      { q: `${label(f)} 能給 ${rlabel(f)} 輸${cTw[f.cell.component]}嗎？`, a: f.ok ? `可以。這個成分的規則是：${nTw[f.cell.component]}` : `不可以——${rTw[f.reasons[0]]}。` },
      { q: `這個成分下 ${label(f)} 能覆蓋幾種血型？`, a: `八種裡的 ${f.reach} 種。反過來，${rlabel(f)} 可以從 ${f.pool} 種接受。` },
      { q: `方向反過來會怎樣？`, a: `${rlabel(f)} 給 ${label(f)} 輸${f.reverseOk ? '相容' : '不相容'}。${f.ok === f.reverseOk ? '這一對兩個方向答案相同。' : '這一對的答案取決於方向。'}` },
      { q: f.split ? `這裡紅血球和血漿的答案不一樣嗎？` : `其他成分呢？`, a: f.split ? `不一樣。這一對紅血球${f.rbcOk ? '相容' : '不相容'}，血漿${f.plasmaOk ? '相容' : '不相容'}——抗原和抗體待在不同的地方。` : `${f.others.map(o => `${cTw[o.component]}${o.ok ? '相容' : '不相容'}`).join('，')}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BLOOD_UI: L<BloodUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BloodUI>;
