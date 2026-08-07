/**
 * RAID 화면의 문구 — 열 언어.
 *
 * 레벨 표기(RAID 5, JBOD)와 단위(TB, TiB)는 어느 나라 장비에도 같은 모양이라
 * 옮기지 않는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { RaidFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface RaidUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  levelDesc: (key: string) => string;
  reasonText: (r: string) => string;
  diskLabel: string;
  diskWord: string;
  usableLabel: string;
  lostLabel: string;
  efficiencyLabel: string;
  toleratesLabel: string;
  bestCaseLabel: string;
  groupsLabel: string;
  perGroupLabel: string;
  minLabel: string;
  verdictOk: string;
  verdictNo: string;
  splitTitle: string;
  splitNote: string;
  sizeTitle: string;
  sizeNote: string;
  rebuildTitle: string;
  rebuildNote: string;
  backupTitle: string;
  backupNote: string;
  levelRowTitle: string;
  diskRowTitle: string;
  desc: (f: RaidFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: RaidFacts) => string;
  metaDesc: (f: RaidFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: RaidFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Words = Record<string, string>;
const namer = (m: Words) => (key: string) => m[key] ?? key;

const dKo: Words = {
  raid0: '여러 장에 자료를 나눠 얹기만 합니다. 용량도 속도도 장수만큼 늘지만 한 장이 죽으면 전부 잃습니다.',
  raid1: '모든 장이 같은 자료를 그대로 들고 있습니다. 한 장만 남아도 살아 있지만 쓸 수 있는 것은 한 장분입니다.',
  raid5: '한 장분을 패리티로 씁니다. 한 장이 죽어도 나머지에서 되살릴 수 있습니다.',
  raid6: '두 장분을 패리티로 씁니다. 두 장이 동시에 죽어도 견딥니다 — 복구 중에 또 한 장이 죽는 일이 실제로 있습니다.',
  raid10: '두 장씩 짝지어 복사한 뒤 그 짝들을 이어 붙입니다. 절반을 쓰고 복구가 빠릅니다.',
  raid50: 'RAID 5 그룹 여럿을 이어 붙입니다. 그룹마다 한 장씩 패리티를 쓰므로 그룹이 늘면 용량이 줄고 견디는 고장이 늡니다.',
  raid60: 'RAID 6 그룹 여럿을 이어 붙입니다. 그룹마다 두 장씩 패리티를 씁니다.',
  jbod: '장들을 그냥 이어 붙여 하나처럼 씁니다. 패리티가 없어 고장을 못 견디지만, 한 장이 죽어도 나머지 장의 자료는 남습니다.',
};
const dEn: Words = {
  raid0: 'Data is simply spread across the disks. Capacity and speed scale with the count, but one failure loses everything.',
  raid1: 'Every disk holds the same data. It survives down to a single disk, but only one disk’s worth is usable.',
  raid5: 'One disk’s worth goes to parity. A single failure can be rebuilt from the rest.',
  raid6: 'Two disks’ worth go to parity, so two simultaneous failures are survivable — a second disk failing during a rebuild does happen.',
  raid10: 'Disks are mirrored in pairs, and the pairs are striped together. Half is usable and rebuilds are fast.',
  raid50: 'Several RAID 5 groups striped together. Each group spends one disk on parity, so more groups means less capacity and more failures survived.',
  raid60: 'Several RAID 6 groups striped together. Each group spends two disks on parity.',
  jbod: 'The disks are simply concatenated into one volume. No parity, so no failure is survived — but a dead disk takes only its own data with it.',
};
const dEs: Words = {
  raid0: 'Los datos se reparten entre los discos. Capacidad y velocidad crecen con el número, pero un fallo lo pierde todo.',
  raid1: 'Todos los discos guardan lo mismo. Sobrevive hasta con un solo disco, pero solo se usa el equivalente a uno.',
  raid5: 'Un disco se dedica a la paridad. Un fallo se reconstruye con los demás.',
  raid6: 'Dos discos van a paridad, así que se sobrevive a dos fallos simultáneos: que caiga otro disco durante la reconstrucción ocurre de verdad.',
  raid10: 'Los discos se espejan por parejas y las parejas se reparten. Se usa la mitad y la reconstrucción es rápida.',
  raid50: 'Varios grupos RAID 5 unidos. Cada grupo gasta un disco en paridad: más grupos, menos capacidad y más fallos tolerados.',
  raid60: 'Varios grupos RAID 6 unidos. Cada grupo gasta dos discos en paridad.',
  jbod: 'Los discos se concatenan en un volumen. Sin paridad no se tolera ningún fallo, pero un disco muerto se lleva solo lo suyo.',
};
const dPt: Words = {
  raid0: 'Os dados são espalhados pelos discos. Capacidade e velocidade crescem com o número, mas uma falha perde tudo.',
  raid1: 'Todos os discos guardam o mesmo. Sobrevive até com um disco só, mas só se usa o equivalente a um.',
  raid5: 'Um disco vai para a paridade. Uma falha é reconstruída com os demais.',
  raid6: 'Dois discos vão para a paridade, então duas falhas simultâneas são toleradas — outro disco cair durante a reconstrução acontece mesmo.',
  raid10: 'Os discos são espelhados aos pares e os pares são distribuídos. Usa-se metade e a reconstrução é rápida.',
  raid50: 'Vários grupos RAID 5 unidos. Cada grupo gasta um disco em paridade: mais grupos, menos capacidade e mais falhas toleradas.',
  raid60: 'Vários grupos RAID 6 unidos. Cada grupo gasta dois discos em paridade.',
  jbod: 'Os discos são concatenados num volume. Sem paridade nenhuma falha é tolerada, mas um disco morto leva só o que é dele.',
};
const dJa: Words = {
  raid0: '複数の台に分けて書くだけです。容量も速度も台数どおり伸びますが、一台壊れると全部失います。',
  raid1: 'すべての台が同じ内容を持ちます。一台残れば生きていますが、使えるのは一台分だけです。',
  raid5: '一台分をパリティに使います。一台壊れても残りから復元できます。',
  raid6: '二台分をパリティに使うので、同時に二台壊れても耐えます — 復旧中にもう一台壊れることは実際に起きます。',
  raid10: '二台ずつ組にして複製し、その組をつないで使います。半分が使えて復旧が速いです。',
  raid50: 'RAID 5のグループをいくつもつなぎます。グループごとに一台をパリティに使うので、グループが増えると容量が減り耐えられる故障が増えます。',
  raid60: 'RAID 6のグループをいくつもつなぎます。グループごとに二台をパリティに使います。',
  jbod: '台をただつないで一つのように使います。パリティがないので故障には耐えませんが、一台壊れても他の台の中身は残ります。',
};
const dDe: Words = {
  raid0: 'Die Daten werden einfach über die Platten verteilt. Kapazität und Tempo wachsen mit der Anzahl, doch ein Ausfall verliert alles.',
  raid1: 'Jede Platte hält dieselben Daten. Es überlebt bis zur letzten Platte, nutzbar ist aber nur eine.',
  raid5: 'Eine Platte geht für Parität drauf. Ein Ausfall lässt sich aus dem Rest wiederherstellen.',
  raid6: 'Zwei Platten gehen für Parität drauf, zwei gleichzeitige Ausfälle sind also überlebbar — dass während des Rebuilds eine weitere stirbt, kommt wirklich vor.',
  raid10: 'Platten werden paarweise gespiegelt und die Paare gestreift. Die Hälfte ist nutzbar, Rebuilds sind schnell.',
  raid50: 'Mehrere RAID-5-Gruppen zusammengeschaltet. Jede Gruppe opfert eine Platte für Parität: mehr Gruppen, weniger Kapazität, mehr überstandene Ausfälle.',
  raid60: 'Mehrere RAID-6-Gruppen zusammengeschaltet. Jede Gruppe opfert zwei Platten für Parität.',
  jbod: 'Die Platten werden schlicht zu einem Volume aneinandergehängt. Ohne Parität übersteht es keinen Ausfall — eine tote Platte nimmt aber nur ihre eigenen Daten mit.',
};
const dFr: Words = {
  raid0: 'Les données sont simplement réparties sur les disques. Capacité et vitesse suivent le nombre, mais une panne perd tout.',
  raid1: 'Tous les disques portent les mêmes données. Il survit jusqu’au dernier disque, mais un seul disque est utilisable.',
  raid5: 'L’équivalent d’un disque part en parité. Une panne se reconstruit à partir des autres.',
  raid6: 'Deux disques partent en parité : deux pannes simultanées sont survivables — qu’un disque lâche pendant la reconstruction arrive vraiment.',
  raid10: 'Les disques sont mis en miroir par paires, et les paires sont agrégées. La moitié est utilisable et la reconstruction est rapide.',
  raid50: 'Plusieurs groupes RAID 5 agrégés. Chaque groupe consacre un disque à la parité : plus de groupes, moins de capacité, plus de pannes encaissées.',
  raid60: 'Plusieurs groupes RAID 6 agrégés. Chaque groupe consacre deux disques à la parité.',
  jbod: 'Les disques sont simplement mis bout à bout. Sans parité, aucune panne n’est encaissée, mais un disque mort n’emporte que ses propres données.',
};
const dHi: Words = {
  raid0: 'डेटा बस कई डिस्कों पर बाँट दिया जाता है। क्षमता और गति संख्या के साथ बढ़ती है, पर एक डिस्क गई तो सब गया।',
  raid1: 'हर डिस्क वही डेटा रखती है। एक डिस्क बचे तब भी चलता है, पर काम आती है एक ही डिस्क जितनी।',
  raid5: 'एक डिस्क जितना पैरिटी में जाता है। एक डिस्क खराब हो तो बाकी से बना लिया जाता है।',
  raid6: 'दो डिस्क जितना पैरिटी में जाता है, इसलिए एक साथ दो खराबियाँ सह लेता है — रीबिल्ड के दौरान एक और डिस्क जाना सचमुच होता है।',
  raid10: 'डिस्कें जोड़ों में मिरर होती हैं और जोड़े आपस में जुड़ते हैं। आधा काम आता है और रीबिल्ड तेज़ होता है।',
  raid50: 'कई RAID 5 समूह जोड़े जाते हैं। हर समूह एक डिस्क पैरिटी में लगाता है: समूह बढ़े तो क्षमता घटी और सही जाने वाली खराबियाँ बढ़ीं।',
  raid60: 'कई RAID 6 समूह जोड़े जाते हैं। हर समूह दो डिस्क पैरिटी में लगाता है।',
  jbod: 'डिस्कें बस जोड़कर एक जैसी बना दी जाती हैं। पैरिटी नहीं, इसलिए कोई खराबी नहीं सहता — पर मरी हुई डिस्क सिर्फ़ अपना डेटा ले जाती है।',
};
const dZh: Words = {
  raid0: '数据只是摊在几块盘上。容量和速度随盘数增长，但坏一块就全没了。',
  raid1: '每块盘装的都是同样的数据。只剩一块也还活着，但能用的只有一块的量。',
  raid5: '拿一块盘的量做校验。坏一块可以从其余盘重建。',
  raid6: '拿两块盘的量做校验，能扛住同时坏两块——重建过程中再坏一块，这是真会发生的。',
  raid10: '两块一组做镜像，再把这些组拼起来。能用一半，重建也快。',
  raid50: '把若干个 RAID 5 组拼起来。每组花一块盘做校验，组越多容量越少、能扛的故障越多。',
  raid60: '把若干个 RAID 6 组拼起来。每组花两块盘做校验。',
  jbod: '把盘直接接成一个卷。没有校验，扛不住任何故障，但坏掉的盘只带走自己那份数据。',
};
const dTw: Words = {
  raid0: '資料只是攤在幾顆硬碟上。容量和速度隨顆數增長，但壞一顆就全沒了。',
  raid1: '每顆硬碟裝的都是同樣的資料。只剩一顆也還活著，但能用的只有一顆的量。',
  raid5: '拿一顆硬碟的量做同位檢查。壞一顆可以從其餘硬碟重建。',
  raid6: '拿兩顆硬碟的量做同位檢查，能扛住同時壞兩顆——重建過程中再壞一顆，這是真會發生的。',
  raid10: '兩顆一組做鏡像，再把這些組拼起來。能用一半，重建也快。',
  raid50: '把若干個 RAID 5 組拼起來。每組花一顆做同位檢查，組越多容量越少、能扛的故障越多。',
  raid60: '把若干個 RAID 6 組拼起來。每組花兩顆做同位檢查。',
  jbod: '把硬碟直接接成一個磁碟區。沒有同位檢查，扛不住任何故障，但壞掉的那顆只帶走自己那份資料。',
};

const wKo: Words = {
  'too-few': '이 레벨을 만들기에 장수가 모자랍니다',
  odd: '홀수 장으로는 두 장씩 짝을 지을 수 없습니다',
  'no-even-split': '같은 크기 그룹으로 갈라지지 않습니다',
};
const wEn: Words = {
  'too-few': 'there are not enough disks for this level',
  odd: 'an odd number of disks cannot be paired up',
  'no-even-split': 'it does not divide into equal-sized groups',
};
const wEs: Words = {
  'too-few': 'no hay discos suficientes para este nivel',
  odd: 'un número impar de discos no se puede emparejar',
  'no-even-split': 'no se divide en grupos del mismo tamaño',
};
const wPt: Words = {
  'too-few': 'não há discos suficientes para este nível',
  odd: 'um número ímpar de discos não pode ser emparelhado',
  'no-even-split': 'não se divide em grupos de mesmo tamanho',
};
const wJa: Words = {
  'too-few': 'このレベルを作るには台数が足りません',
  odd: '奇数台では二台ずつの組にできません',
  'no-even-split': '同じ大きさのグループに分かれません',
};
const wDe: Words = {
  'too-few': 'für diese Stufe sind zu wenige Platten da',
  odd: 'eine ungerade Zahl lässt sich nicht paarweise spiegeln',
  'no-even-split': 'es teilt sich nicht in gleich große Gruppen',
};
const wFr: Words = {
  'too-few': 'il n’y a pas assez de disques pour ce niveau',
  odd: 'un nombre impair de disques ne peut pas être apparié',
  'no-even-split': 'cela ne se divise pas en groupes de taille égale',
};
const wHi: Words = {
  'too-few': 'इस स्तर के लिए डिस्कें कम हैं',
  odd: 'विषम संख्या में डिस्कों के जोड़े नहीं बनते',
  'no-even-split': 'यह बराबर आकार के समूहों में नहीं बँटता',
};
const wZh: Words = {
  'too-few': '盘数不够，做不了这一级',
  odd: '奇数块盘配不成对',
  'no-even-split': '分不成大小相同的组',
};
const wTw: Words = {
  'too-few': '硬碟數不夠，做不了這一級',
  odd: '奇數顆配不成對',
  'no-even-split': '分不成大小相同的組',
};

type Spec = { [K in keyof RaidUI]: L<RaidUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T(
    'RAID 용량표', 'RAID capacity', 'Capacidad RAID', 'Capacidade RAID',
    'RAID容量表', 'RAID-Kapazität', 'Capacité RAID', 'RAID क्षमता',
    'RAID 容量表', 'RAID 容量表',
  ),

  hubTitle: T(
    'RAID 192칸 — 4TB 넉 장으로 RAID 5를 만들면 12TB인데 10.91TiB로 보입니다',
    '192 RAID cells — four 4 TB disks in RAID 5 make 12 TB, and show up as 10.91 TiB',
    '192 casillas RAID — cuatro discos de 4 TB en RAID 5 dan 12 TB y se ven como 10,91 TiB',
    '192 células RAID — quatro discos de 4 TB em RAID 5 dão 12 TB e aparecem como 10,91 TiB',
    'RAID 192マス — 4TBを4台でRAID 5にすると12TB、画面には10.91TiBと出ます',
    '192 RAID-Felder — vier 4-TB-Platten im RAID 5 ergeben 12 TB und erscheinen als 10,91 TiB',
    '192 cases RAID — quatre disques de 4 To en RAID 5 font 12 To et s’affichent en 10,91 Tio',
    '192 RAID खाने — चार 4 TB डिस्कें RAID 5 में 12 TB बनाती हैं, दिखती हैं 10.91 TiB',
    '192 格 RAID 表 — 四块 4TB 盘做 RAID 5 是 12TB，屏幕上却是 10.91TiB',
    '192 格 RAID 表 — 四顆 4TB 硬碟做 RAID 5 是 12TB，螢幕上卻是 10.91TiB',
  ),

  hubLead: T(
    '레벨마다 공식을 따로 외울 필요가 없습니다. 그룹마다 패리티를 몇 장 쓰는지만 알면 나머지는 한 줄에서 나옵니다 — 쓸 수 있는 장수 = 전체 − 패리티 장수 × 그룹 수. RAID 5는 그룹 하나에 한 장이라 n−1, RAID 6은 두 장이라 n−2, RAID 50·60은 그 그룹이 여럿입니다. 안 되는 칸도 38개 있습니다: 세 장으로는 RAID 6이 안 되고, 홀수 장으로는 RAID 10이 안 되며, 일곱 장으로는 RAID 50이 안 됩니다.',
    'You do not need a separate formula per level. Knowing how many disks each group spends on parity gives you the rest in one line: usable = total − parity × groups. RAID 5 spends one in a single group, so n−1; RAID 6 spends two, so n−2; RAID 50 and 60 run several such groups. 38 of the cells are impossible: three disks will not make a RAID 6, an odd count will not make a RAID 10, and seven disks will not make a RAID 50.',
    'No hace falta una fórmula por nivel. Basta saber cuántos discos gasta cada grupo en paridad: utilizable = total − paridad × grupos. RAID 5 gasta uno en un solo grupo, o sea n−1; RAID 6 gasta dos, n−2; RAID 50 y 60 llevan varios grupos así. 38 casillas son imposibles: con tres discos no hay RAID 6, con un número impar no hay RAID 10, y con siete no hay RAID 50.',
    'Não é preciso uma fórmula por nível. Basta saber quantos discos cada grupo gasta em paridade: utilizável = total − paridade × grupos. O RAID 5 gasta um num único grupo, ou seja n−1; o RAID 6 gasta dois, n−2; RAID 50 e 60 levam vários grupos desses. 38 células são impossíveis: com três discos não há RAID 6, com número ímpar não há RAID 10, e com sete não há RAID 50.',
    'レベルごとに公式を覚える必要はありません。グループごとにパリティを何台使うかだけ分かれば、残りは一行で出ます — 使える台数 = 全体 − パリティ台数 × グループ数。RAID 5はグループ一つに一台なのでn−1、RAID 6は二台なのでn−2、RAID 50・60はそのグループが複数です。できないマスも38あります。3台ではRAID 6ができず、奇数台ではRAID 10ができず、7台ではRAID 50ができません。',
    'Man braucht keine Formel je Stufe. Wer weiß, wie viele Platten jede Gruppe für Parität opfert, hat den Rest in einer Zeile: nutzbar = gesamt − Parität × Gruppen. RAID 5 opfert eine in einer einzigen Gruppe, also n−1; RAID 6 opfert zwei, also n−2; RAID 50 und 60 führen mehrere solcher Gruppen. 38 Felder sind unmöglich: drei Platten ergeben kein RAID 6, eine ungerade Zahl kein RAID 10, und sieben Platten kein RAID 50.',
    'Pas besoin d’une formule par niveau. Il suffit de savoir combien de disques chaque groupe consacre à la parité : utilisable = total − parité × groupes. Le RAID 5 en consacre un dans un seul groupe, donc n−1 ; le RAID 6 en consacre deux, n−2 ; les RAID 50 et 60 empilent plusieurs de ces groupes. 38 cases sont impossibles : trois disques ne font pas un RAID 6, un nombre impair ne fait pas un RAID 10, et sept disques ne font pas un RAID 50.',
    'हर स्तर के लिए अलग सूत्र याद करने की ज़रूरत नहीं। बस यह जान लें कि हर समूह कितनी डिस्कें पैरिटी में लगाता है: उपयोगी = कुल − पैरिटी × समूह। RAID 5 एक समूह में एक लगाता है, यानी n−1; RAID 6 दो लगाता है, n−2; RAID 50 और 60 ऐसे कई समूह चलाते हैं। 38 खाने असंभव हैं: तीन डिस्कों से RAID 6 नहीं बनता, विषम संख्या से RAID 10 नहीं, और सात से RAID 50 नहीं।',
    '不必每一级都背一个公式。只要知道每组花几块盘做校验，其余一行就出来了：可用 = 总数 − 校验盘 × 组数。RAID 5 一组花一块，所以是 n−1；RAID 6 花两块，是 n−2；RAID 50、60 则是好几组。还有 38 格是做不出来的：三块盘做不了 RAID 6，奇数块做不了 RAID 10，七块做不了 RAID 50。',
    '不必每一級都背一個公式。只要知道每組花幾顆做同位檢查，其餘一行就出來了：可用 = 總數 − 同位檢查 × 組數。RAID 5 一組花一顆，所以是 n−1；RAID 6 花兩顆，是 n−2；RAID 50、60 則是好幾組。還有 38 格是做不出來的：三顆做不了 RAID 6，奇數顆做不了 RAID 10，七顆做不了 RAID 50。',
  ),

  levelDesc: T<(k: string) => string>(
    namer(dKo), namer(dEn), namer(dEs), namer(dPt), namer(dJa),
    namer(dDe), namer(dFr), namer(dHi), namer(dZh), namer(dTw),
  ),
  reasonText: T<(r: string) => string>(
    namer(wKo), namer(wEn), namer(wEs), namer(wPt), namer(wJa),
    namer(wDe), namer(wFr), namer(wHi), namer(wZh), namer(wTw),
  ),

  diskLabel: T('디스크', 'Disks', 'Discos', 'Discos', '台数', 'Platten', 'Disques', 'डिस्कें', '硬盘数', '硬碟數'),
  diskWord: T('장', 'disks', 'discos', 'discos', '台', 'Platten', 'disques', 'डिस्कें', '块', '顆'),
  usableLabel: T('쓸 수 있는 장수', 'Usable disks', 'Discos utilizables', 'Discos utilizáveis', '使える台数', 'Nutzbare Platten', 'Disques utilisables', 'उपयोगी डिस्कें', '可用盘数', '可用顆數'),
  lostLabel: T('패리티·미러로 나가는 장수', 'Spent on parity or mirror', 'En paridad o espejo', 'Em paridade ou espelho', 'パリティ・ミラーに使う台数', 'Für Parität oder Spiegel', 'En parité ou miroir', 'पैरिटी या मिरर में', '用于校验或镜像', '用於同位檢查或鏡像'),
  efficiencyLabel: T('용량 효율', 'Capacity efficiency', 'Eficiencia de capacidad', 'Eficiência de capacidade', '容量効率', 'Kapazitätseffizienz', 'Rendement de capacité', 'क्षमता दक्षता', '容量利用率', '容量利用率'),
  toleratesLabel: T('반드시 견디는 고장', 'Failures always survived', 'Fallos siempre tolerados', 'Falhas sempre toleradas', '必ず耐える故障', 'Immer überstandene Ausfälle', 'Pannes toujours encaissées', 'हमेशा सही जाने वाली खराबियाँ', '必定能扛的故障', '必定能扛的故障'),
  bestCaseLabel: T('자리가 좋으면 견디는 고장', 'Best case', 'En el mejor caso', 'No melhor caso', '運が良ければ耐える故障', 'Bestenfalls', 'Au mieux', 'सर्वोत्तम स्थिति', '最好情况', '最好情況'),
  groupsLabel: T('그룹 수', 'Groups', 'Grupos', 'Grupos', 'グループ数', 'Gruppen', 'Groupes', 'समूह', '组数', '組數'),
  perGroupLabel: T('그룹당 디스크', 'Disks per group', 'Discos por grupo', 'Discos por grupo', 'グループあたり台数', 'Platten je Gruppe', 'Disques par groupe', 'प्रति समूह डिस्कें', '每组盘数', '每組顆數'),
  minLabel: T('최소 디스크', 'Minimum disks', 'Discos mínimos', 'Discos mínimos', '最小台数', 'Mindestplatten', 'Disques minimum', 'न्यूनतम डिस्कें', '最少盘数', '最少顆數'),
  verdictOk: T('만들 수 있음', 'Possible', 'Posible', 'Possível', '作れる', 'Möglich', 'Possible', 'संभव', '可以', '可以'),
  verdictNo: T('만들 수 없음', 'Not possible', 'No posible', 'Não é possível', '作れない', 'Nicht möglich', 'Impossible', 'संभव नहीं', '不行', '不行'),

  splitTitle: T('그룹을 어떻게 가르는가', 'How the groups are split', 'Cómo se dividen los grupos', 'Como os grupos são divididos', 'グループの分け方', 'Wie die Gruppen geteilt werden', 'Comment les groupes se répartissent', 'समूह कैसे बँटते हैं', '组怎么分', '組怎麼分'),
  splitNote: T(
    'RAID 50·60은 그룹을 몇 개로 두느냐가 진짜 선택입니다. 그룹을 적게 두면 패리티가 적게 들어 용량이 늘고, 많이 두면 그룹마다 한 장(또는 두 장)씩 여유가 생겨 운이 좋을 때 견디는 고장이 늡니다. 반드시 견디는 고장 수는 어느 쪽이든 같습니다 — 한 그룹에서 두 장이 겹쳐 죽으면 거기서 끝나기 때문입니다.',
    'For RAID 50 and 60, how many groups you use is the real decision. Fewer groups spend less on parity and leave more capacity; more groups leave one (or two) spare disks per group, so more failures are survivable when they land well. The guaranteed figure does not change either way — two failures inside one group end it regardless.',
    'En RAID 50 y 60, cuántos grupos usar es la decisión de verdad. Menos grupos gastan menos en paridad y dejan más capacidad; más grupos dejan uno (o dos) discos de margen por grupo, así que se toleran más fallos si caen bien repartidos. La cifra garantizada no cambia: dos fallos dentro de un mismo grupo lo terminan igual.',
    'No RAID 50 e 60, quantos grupos usar é a decisão de verdade. Menos grupos gastam menos em paridade e deixam mais capacidade; mais grupos deixam um (ou dois) discos de folga por grupo, tolerando mais falhas se caírem bem distribuídas. O número garantido não muda: duas falhas dentro de um mesmo grupo encerram do mesmo jeito.',
    'RAID 50・60ではグループをいくつにするかが本当の選択です。グループを少なくすればパリティが減って容量が増え、多くすればグループごとに一台(または二台)の余裕ができて運が良ければ耐えられる故障が増えます。必ず耐える台数はどちらでも同じです — 同じグループで二台重なればそこで終わりだからです。',
    'Bei RAID 50 und 60 ist die Zahl der Gruppen die eigentliche Entscheidung. Weniger Gruppen kosten weniger Parität und lassen mehr Kapazität; mehr Gruppen lassen je eine (oder zwei) Platte Luft pro Gruppe, sodass bei günstiger Verteilung mehr Ausfälle überstanden werden. Der garantierte Wert ändert sich nicht — zwei Ausfälle in derselben Gruppe beenden es so oder so.',
    'Pour le RAID 50 et 60, le vrai choix est le nombre de groupes. Moins de groupes coûtent moins de parité et laissent plus de capacité ; plus de groupes laissent un (ou deux) disque de marge par groupe, donc plus de pannes encaissées si elles tombent bien. Le chiffre garanti ne bouge pas : deux pannes dans le même groupe y mettent fin de toute façon.',
    'RAID 50 और 60 में असली फ़ैसला यही है कि कितने समूह बनाएँ। कम समूह पैरिटी कम खाते हैं और क्षमता ज़्यादा छोड़ते हैं; ज़्यादा समूह हर समूह में एक (या दो) डिस्क की गुंजाइश छोड़ते हैं, तो अच्छी जगह गिरने पर ज़्यादा खराबियाँ सही जाती हैं। पक्का आँकड़ा नहीं बदलता — एक ही समूह में दो खराबियाँ वैसे भी अंत कर देती हैं।',
    'RAID 50、60 里，分几组才是真正的选择。组少，校验占得少，容量就多；组多，每组多出一块（或两块）余量，故障落得分散时能扛的就多。但保证能扛的数目两边一样——同一组里坏两块，照样结束。',
    'RAID 50、60 裡，分幾組才是真正的選擇。組少，同位檢查佔得少，容量就多；組多，每組多出一顆（或兩顆）餘量，故障落得分散時能扛的就多。但保證能扛的數目兩邊一樣——同一組裡壞兩顆，照樣結束。',
  ),

  sizeTitle: T('겉면의 TB와 화면의 TiB', 'TB on the label, TiB on the screen', 'TB en la etiqueta, TiB en pantalla', 'TB no rótulo, TiB na tela', '箱のTBと画面のTiB', 'TB auf dem Etikett, TiB auf dem Bildschirm', 'To sur l’étiquette, Tio à l’écran', 'लेबल पर TB, स्क्रीन पर TiB', '标签上的 TB 与屏幕上的 TiB', '標籤上的 TB 與螢幕上的 TiB'),
  sizeNote: T(
    '디스크 겉면의 1TB는 10의 12제곱 바이트인데, 운영체제는 2의 40제곱 바이트를 한 단위로 셉니다. 이름만 비슷할 뿐 다른 단위라 같은 디스크가 약 9% 작게 보입니다. 용량이 사라진 것이 아니라 자로 재는 눈금이 다른 것입니다.',
    'One TB on the box is 10¹² bytes, while the operating system counts in units of 2⁴⁰ bytes. The names look alike but the units differ, so the same disk reads about 9% smaller. Nothing went missing — the ruler changed.',
    'Un TB en la caja son 10¹² bytes, mientras el sistema operativo cuenta en unidades de 2⁴⁰ bytes. Los nombres se parecen pero las unidades no, así que el mismo disco se ve un 9% más pequeño. No falta capacidad: cambió la regla de medir.',
    'Um TB na caixa são 10¹² bytes, enquanto o sistema operacional conta em unidades de 2⁴⁰ bytes. Os nomes se parecem, mas as unidades não, então o mesmo disco aparece cerca de 9% menor. Nada sumiu — mudou a régua.',
    '箱の1TBは10の12乗バイトですが、OSは2の40乗バイトを一単位として数えます。名前が似ているだけで別の単位なので、同じディスクが約9%小さく見えます。容量が消えたのではなく、当てる物差しが違うのです。',
    'Ein TB auf der Verpackung sind 10¹² Byte, das Betriebssystem zählt dagegen in Einheiten von 2⁴⁰ Byte. Die Namen ähneln sich, die Einheiten nicht — dieselbe Platte wirkt rund 9 % kleiner. Es fehlt nichts, nur das Maßband ist ein anderes.',
    'Un To sur la boîte, c’est 10¹² octets, tandis que le système compte par unités de 2⁴⁰ octets. Les noms se ressemblent, pas les unités : le même disque paraît environ 9 % plus petit. Rien n’a disparu, seule la règle a changé.',
    'डिब्बे पर लिखा 1 TB यानी 10¹² बाइट, जबकि ऑपरेटिंग सिस्टम 2⁴⁰ बाइट की इकाई में गिनता है। नाम मिलते-जुलते हैं, इकाइयाँ नहीं — इसलिए वही डिस्क क़रीब 9% छोटी दिखती है। कुछ ग़ायब नहीं हुआ, पैमाना बदल गया।',
    '盒子上的 1TB 是 10¹² 字节，而操作系统按 2⁴⁰ 字节一个单位来数。名字像，单位不同，所以同一块盘看起来小了约 9%。容量没有消失，是尺子换了。',
    '盒子上的 1TB 是 10¹² 位元組，而作業系統按 2⁴⁰ 位元組一個單位來數。名字像，單位不同，所以同一顆硬碟看起來小了約 9%。容量沒有消失，是尺子換了。',
  ),

  rebuildTitle: T('복구 중이 가장 위험합니다', 'The rebuild is the dangerous part', 'La reconstrucción es lo peligroso', 'A reconstrução é a parte perigosa', '復旧中がいちばん危ないです', 'Der Rebuild ist der gefährliche Teil', 'La reconstruction est le moment risqué', 'रीबिल्ड ही ख़तरनाक हिस्सा है', '重建的时候最危险', '重建的時候最危險'),
  rebuildNote: T(
    '패리티 한 장짜리 배열에서 한 장이 죽으면, 새 디스크를 넣고 나머지 전부를 처음부터 끝까지 읽어 되살립니다. 하필 그때 남은 디스크들이 가장 오래 가장 세게 일합니다. 디스크가 크고 많을수록 복구가 며칠씩 걸리고, 그 사이에 또 한 장이 죽으면 그대로 끝납니다. 큰 배열에서 RAID 5보다 6이나 10을 권하는 이유가 이것입니다.',
    'When a single-parity array loses a disk, you put a new one in and every remaining disk is read end to end to rebuild it. That is precisely when the survivors work hardest and longest. The bigger and more numerous the disks, the longer the rebuild — days, sometimes — and a second failure during it ends the array. This is why RAID 6 or 10 is preferred over RAID 5 on large arrays.',
    'Cuando un arreglo de una sola paridad pierde un disco, se pone otro y se leen de punta a punta todos los que quedan para reconstruir. Justo entonces los supervivientes trabajan más y más tiempo. Cuanto más grandes y más numerosos los discos, más dura la reconstrucción —días a veces—, y un segundo fallo durante ella acaba con el arreglo. Por eso en arreglos grandes se prefiere RAID 6 o 10 a RAID 5.',
    'Quando um arranjo de paridade simples perde um disco, coloca-se outro e todos os restantes são lidos de ponta a ponta para reconstruir. É justamente aí que os sobreviventes trabalham mais e por mais tempo. Quanto maiores e mais numerosos os discos, mais longa a reconstrução — dias, às vezes — e uma segunda falha durante ela encerra o arranjo. Por isso RAID 6 ou 10 é preferido a RAID 5 em arranjos grandes.',
    'パリティ一台の構成で一台が壊れると、新しい台を入れて残り全部を端から端まで読み、復元します。まさにそのとき残った台がいちばん長くいちばん激しく働きます。台が大きく多いほど復旧に何日もかかり、その間にもう一台壊れればそこで終わりです。大きな構成でRAID 5より6や10が勧められるのはこのためです。',
    'Verliert ein Array mit einfacher Parität eine Platte, kommt eine neue hinein, und alle verbliebenen werden von vorn bis hinten gelesen, um sie wiederherzustellen. Genau dann arbeiten die Überlebenden am längsten und härtesten. Je größer und zahlreicher die Platten, desto länger der Rebuild — mitunter Tage — und ein zweiter Ausfall dabei beendet das Array. Deshalb wird bei großen Arrays RAID 6 oder 10 dem RAID 5 vorgezogen.',
    'Quand une grappe à parité simple perd un disque, on en met un neuf et tous les autres sont lus d’un bout à l’autre pour reconstruire. C’est précisément là que les rescapés travaillent le plus longtemps et le plus fort. Plus les disques sont gros et nombreux, plus la reconstruction dure — parfois des jours — et une seconde panne pendant ce temps met fin à la grappe. D’où la préférence pour le RAID 6 ou 10 sur les grandes grappes.',
    'एक-पैरिटी वाले सरणी से एक डिस्क जाए तो नई डिस्क डालकर बाकी सबको शुरू से अंत तक पढ़ा जाता है। ठीक उसी समय बची हुई डिस्कें सबसे लंबा और सबसे कड़ा काम करती हैं। डिस्कें जितनी बड़ी और जितनी ज़्यादा, रीबिल्ड उतना लंबा — कभी-कभी कई दिन — और उसी बीच दूसरी खराबी सरणी को ख़त्म कर देती है। बड़े सरणियों में RAID 5 से बेहतर RAID 6 या 10 इसीलिए माना जाता है।',
    '单校验的阵列坏一块盘后，换上新盘，其余的盘要从头到尾读一遍来重建。偏偏就在这时候，幸存的盘干得最久最狠。盘越大越多，重建越久——有时要好几天——中途再坏一块，阵列就完了。大阵列里宁可用 RAID 6 或 10 而不是 5，原因就在这里。',
    '單同位檢查的陣列壞一顆後，換上新硬碟，其餘的要從頭到尾讀一遍來重建。偏偏就在這時候，倖存的硬碟做得最久最狠。硬碟越大越多，重建越久——有時要好幾天——中途再壞一顆，陣列就完了。大陣列裡寧可用 RAID 6 或 10 而不是 5，原因就在這裡。',
  ),

  backupTitle: T('RAID는 백업이 아닙니다', 'RAID is not a backup', 'RAID no es una copia de seguridad', 'RAID não é backup', 'RAIDはバックアップではありません', 'RAID ist kein Backup', 'Le RAID n’est pas une sauvegarde', 'RAID बैकअप नहीं है', 'RAID 不是备份', 'RAID 不是備份'),
  backupNote: T(
    'RAID가 막아 주는 것은 디스크 고장 하나뿐입니다. 실수로 지운 파일, 덮어쓴 파일, 랜섬웨어, 컨트롤러 고장, 불이나 도난은 그대로 전부에 옮습니다 — 미러는 지운 것도 똑같이 지웁니다. 백업은 다른 장치에 따로 두는 사본이고, RAID는 그것과 다른 일을 합니다.',
    'RAID protects against exactly one thing: a disk dying. A file deleted by mistake, a file overwritten, ransomware, a failed controller, fire or theft all propagate to every disk at once — a mirror deletes just as faithfully as it writes. A backup is a separate copy on separate hardware, and RAID is not doing that job.',
    'El RAID protege de una sola cosa: que muera un disco. Un archivo borrado por error, uno sobrescrito, un ransomware, una controladora rota, un incendio o un robo se propagan a todos los discos a la vez: un espejo borra con la misma fidelidad con que escribe. Una copia de seguridad es un duplicado en otro equipo, y el RAID no hace ese trabajo.',
    'O RAID protege de uma coisa só: um disco morrer. Um arquivo apagado por engano, um sobrescrito, ransomware, uma controladora com defeito, incêndio ou roubo se propagam a todos os discos de uma vez — um espelho apaga com a mesma fidelidade com que grava. Backup é uma cópia separada em outro equipamento, e o RAID não faz esse trabalho.',
    'RAIDが守ってくれるのはディスクの故障ひとつだけです。誤って消したファイル、上書きしたファイル、ランサムウェア、コントローラの故障、火事や盗難は、そのまま全台に及びます — ミラーは消したことも忠実に写します。バックアップは別の機械に置く別の写しであり、RAIDはその仕事をしていません。',
    'RAID schützt vor genau einem: dem Ausfall einer Platte. Eine versehentlich gelöschte Datei, eine überschriebene Datei, Ransomware, ein defekter Controller, Feuer oder Diebstahl schlagen sofort auf alle Platten durch — ein Spiegel löscht ebenso getreu, wie er schreibt. Ein Backup ist eine getrennte Kopie auf getrennter Hardware, und diese Aufgabe erfüllt RAID nicht.',
    'Le RAID protège d’une seule chose : la mort d’un disque. Un fichier effacé par erreur, un fichier écrasé, un rançongiciel, un contrôleur en panne, un incendie ou un vol se propagent à tous les disques d’un coup — un miroir efface aussi fidèlement qu’il écrit. Une sauvegarde est une copie séparée sur du matériel séparé, et le RAID ne fait pas ce travail.',
    'RAID केवल एक चीज़ से बचाता है: डिस्क का मरना। ग़लती से मिटी फ़ाइल, ऊपर लिख दी गई फ़ाइल, रैनसमवेयर, ख़राब कंट्रोलर, आग या चोरी — ये सब एक साथ सभी डिस्कों तक पहुँच जाते हैं; मिरर मिटाने की भी उतनी ही ईमानदारी से नक़ल करता है। बैकअप अलग हार्डवेयर पर रखी अलग प्रति है, और RAID वह काम नहीं करता।',
    'RAID 只挡一件事：硬盘坏掉。误删的文件、被覆盖的文件、勒索软件、控制器故障、火灾或失窃，全都会一次性传到每块盘上——镜像抄写删除的动作，和抄写数据一样忠实。备份是放在另一套设备上的另一份副本，RAID 干的不是这个活。',
    'RAID 只擋一件事：硬碟壞掉。誤刪的檔案、被覆寫的檔案、勒索軟體、控制器故障、火災或失竊，全都會一次傳到每顆硬碟上——鏡像抄寫刪除的動作，和抄寫資料一樣忠實。備份是放在另一套設備上的另一份副本，RAID 做的不是這件事。',
  ),

  levelRowTitle: T('같은 레벨의 다른 장수', 'Same level, other disk counts', 'Mismo nivel, otros recuentos', 'Mesmo nível, outras contagens', '同じレベルの他の台数', 'Gleiche Stufe, andere Plattenzahl', 'Même niveau, autres effectifs', 'वही स्तर, अन्य संख्याएँ', '同一级别的其他盘数', '同一級別的其他顆數'),
  diskRowTitle: T('같은 장수의 다른 레벨', 'Same disk count, other levels', 'Mismo recuento, otros niveles', 'Mesma contagem, outros níveis', '同じ台数の他のレベル', 'Gleiche Plattenzahl, andere Stufen', 'Même effectif, autres niveaux', 'वही संख्या, अन्य स्तर', '同样盘数的其他级别', '同樣顆數的其他級別'),

  desc: T<(f: RaidFacts) => string>(
    f => f.possible
      ? `디스크 ${f.disks}장으로 ${f.levelText}을 만들면 ${f.usable}장분을 쓰고 ${f.lost}장분이 패리티·미러로 나갑니다. 용량 효율은 ${f.efficiency}%이고, 고장은 ${f.best!.tolerates}장까지 반드시 견딥니다.`
      : `디스크 ${f.disks}장으로는 ${f.levelText}을 만들 수 없습니다 — ${wKo[f.reason!]}. 이 레벨은 최소 ${f.minDisks}장이 필요합니다.`,
    f => f.possible
      ? `${f.disks} disks in ${f.levelText} give you ${f.usable} disks’ worth, with ${f.lost} spent on parity or mirroring. That is ${f.efficiency}% efficiency, and it always survives ${f.best!.tolerates} failure${f.best!.tolerates === 1 ? '' : 's'}.`
      : `${f.disks} disks cannot make a ${f.levelText} — ${wEn[f.reason!]}. This level needs at least ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks} discos en ${f.levelText} dan ${f.usable} discos utilizables y ${f.lost} en paridad o espejo. Eficiencia del ${f.efficiency}%, y tolera siempre ${f.best!.tolerates} fallo${f.best!.tolerates === 1 ? '' : 's'}.`
      : `Con ${f.disks} discos no se puede hacer ${f.levelText}: ${wEs[f.reason!]}. Este nivel necesita al menos ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks} discos em ${f.levelText} dão ${f.usable} discos utilizáveis e ${f.lost} em paridade ou espelho. Eficiência de ${f.efficiency}%, e tolera sempre ${f.best!.tolerates} falha${f.best!.tolerates === 1 ? '' : 's'}.`
      : `Com ${f.disks} discos não dá para fazer ${f.levelText}: ${wPt[f.reason!]}. Este nível precisa de pelo menos ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks}台で${f.levelText}を組むと${f.usable}台分が使え、${f.lost}台分がパリティ・ミラーに出ます。容量効率は${f.efficiency}%で、故障は${f.best!.tolerates}台まで必ず耐えます。`
      : `${f.disks}台では${f.levelText}を組めません — ${wJa[f.reason!]}。このレベルには最低${f.minDisks}台が必要です。`,
    f => f.possible
      ? `${f.disks} Platten im ${f.levelText} ergeben ${f.usable} nutzbare Platten, ${f.lost} gehen an Parität oder Spiegel. Das sind ${f.efficiency}% Effizienz, und ${f.best!.tolerates} Ausfall${f.best!.tolerates === 1 ? '' : 'e'} werden immer überstanden.`
      : `Mit ${f.disks} Platten lässt sich kein ${f.levelText} bauen — ${wDe[f.reason!]}. Diese Stufe braucht mindestens ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks} disques en ${f.levelText} donnent ${f.usable} disques utilisables, ${f.lost} partant en parité ou miroir. Soit ${f.efficiency}% de rendement, et ${f.best!.tolerates} panne${f.best!.tolerates === 1 ? '' : 's'} toujours encaissée${f.best!.tolerates === 1 ? '' : 's'}.`
      : `${f.disks} disques ne font pas un ${f.levelText} — ${wFr[f.reason!]}. Ce niveau demande au moins ${f.minDisks} disques.`,
    f => f.possible
      ? `${f.disks} डिस्कों से ${f.levelText} बनाने पर ${f.usable} डिस्कें काम आती हैं और ${f.lost} पैरिटी या मिरर में जाती हैं। दक्षता ${f.efficiency}%, और ${f.best!.tolerates} खराबी हमेशा सही जाती है।`
      : `${f.disks} डिस्कों से ${f.levelText} नहीं बनता — ${wHi[f.reason!]}। इस स्तर के लिए कम से कम ${f.minDisks} चाहिए।`,
    f => f.possible
      ? `${f.disks} 块盘做 ${f.levelText}，能用 ${f.usable} 块的量，${f.lost} 块用在校验或镜像上。容量利用率 ${f.efficiency}%，必定能扛 ${f.best!.tolerates} 块故障。`
      : `${f.disks} 块盘做不了 ${f.levelText}——${wZh[f.reason!]}。这一级至少需要 ${f.minDisks} 块。`,
    f => f.possible
      ? `${f.disks} 顆做 ${f.levelText}，能用 ${f.usable} 顆的量，${f.lost} 顆用在同位檢查或鏡像上。容量利用率 ${f.efficiency}%，必定能扛 ${f.best!.tolerates} 顆故障。`
      : `${f.disks} 顆做不了 ${f.levelText}——${wTw[f.reason!]}。這一級至少需要 ${f.minDisks} 顆。`,
  ),

  howTitle: T('읽는 법', 'How to read it', 'Cómo se lee', 'Como ler', '読み方', 'So liest man es', 'Comment le lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T<string[]>(
    [
      '쓸 수 있는 장수 = 전체 − 패리티 장수 × 그룹 수. 모든 레벨이 이 한 줄입니다.',
      'RAID 5는 그룹 하나에 패리티 한 장이라 n−1, RAID 6은 두 장이라 n−2입니다.',
      'RAID 50·60은 그 그룹을 여럿 두고 이어 붙인 것이라 그룹 수만큼 곱해집니다.',
      'RAID 1은 모두가 같은 자료라 한 장분, RAID 10은 두 장씩 짝지어 절반입니다.',
      '그룹은 모두 같은 크기여야 하므로 그룹 수는 전체 장수의 약수뿐입니다.',
      '겉면의 TB와 화면의 TiB는 다른 단위입니다 — 약 9% 작게 보입니다.',
    ],
    [
      'Usable = total − parity × groups. Every level is that one line.',
      'RAID 5 spends one parity disk in a single group, so n−1; RAID 6 spends two, so n−2.',
      'RAID 50 and 60 run several such groups striped together, so the parity is multiplied by the group count.',
      'RAID 1 holds one copy on every disk, so one disk’s worth; RAID 10 mirrors in pairs, so half.',
      'Groups must be equal in size, so the group count can only be a divisor of the disk count.',
      'TB on the box and TiB on the screen are different units — about 9% apart.',
    ],
    [
      'Utilizable = total − paridad × grupos. Todos los niveles caben en esa línea.',
      'RAID 5 gasta un disco de paridad en un solo grupo, o sea n−1; RAID 6 gasta dos, n−2.',
      'RAID 50 y 60 llevan varios grupos así unidos, por lo que la paridad se multiplica por el número de grupos.',
      'RAID 1 guarda una copia en cada disco, o sea uno; RAID 10 espeja por parejas, o sea la mitad.',
      'Los grupos deben ser iguales, así que su número solo puede ser un divisor del total.',
      'Los TB de la caja y los TiB de la pantalla son unidades distintas: un 9% de diferencia.',
    ],
    [
      'Utilizável = total − paridade × grupos. Todos os níveis cabem nessa linha.',
      'O RAID 5 gasta um disco de paridade num único grupo, ou seja n−1; o RAID 6 gasta dois, n−2.',
      'RAID 50 e 60 levam vários desses grupos unidos, então a paridade é multiplicada pelo número de grupos.',
      'O RAID 1 guarda uma cópia em cada disco, ou seja um; o RAID 10 espelha aos pares, ou seja metade.',
      'Os grupos devem ter o mesmo tamanho, então o número de grupos só pode ser um divisor do total.',
      'Os TB da caixa e os TiB da tela são unidades diferentes: cerca de 9% de diferença.',
    ],
    [
      '使える台数 = 全体 − パリティ台数 × グループ数。どのレベルもこの一行です。',
      'RAID 5はグループ一つにパリティ一台なのでn−1、RAID 6は二台なのでn−2です。',
      'RAID 50・60はそのグループを複数つなぐので、パリティにグループ数が掛かります。',
      'RAID 1は全台が同じ写しなので一台分、RAID 10は二台ずつ組にするので半分です。',
      'グループは全て同じ大きさでなければならず、グループ数は台数の約数だけです。',
      '箱のTBと画面のTiBは別の単位です — 約9%小さく見えます。',
    ],
    [
      'Nutzbar = gesamt − Parität × Gruppen. Jede Stufe steckt in dieser Zeile.',
      'RAID 5 opfert eine Paritätsplatte in einer Gruppe, also n−1; RAID 6 opfert zwei, also n−2.',
      'RAID 50 und 60 schalten mehrere solcher Gruppen zusammen, die Parität wird also mit der Gruppenzahl multipliziert.',
      'RAID 1 hält auf jeder Platte dieselbe Kopie, also eine Platte; RAID 10 spiegelt paarweise, also die Hälfte.',
      'Gruppen müssen gleich groß sein, die Gruppenzahl kann daher nur ein Teiler der Plattenzahl sein.',
      'TB auf der Verpackung und TiB auf dem Bildschirm sind verschiedene Einheiten — rund 9 % Unterschied.',
    ],
    [
      'Utilisable = total − parité × groupes. Tous les niveaux tiennent dans cette ligne.',
      'Le RAID 5 consacre un disque de parité dans un seul groupe, donc n−1 ; le RAID 6 en consacre deux, n−2.',
      'Les RAID 50 et 60 agrègent plusieurs de ces groupes : la parité est multipliée par le nombre de groupes.',
      'Le RAID 1 garde la même copie sur chaque disque, donc un disque ; le RAID 10 met en miroir par paires, donc la moitié.',
      'Les groupes doivent être de taille égale : leur nombre ne peut être qu’un diviseur du total.',
      'Les To de la boîte et les Tio de l’écran sont des unités différentes — environ 9 % d’écart.',
    ],
    [
      'उपयोगी = कुल − पैरिटी × समूह। हर स्तर इसी एक पंक्ति में है।',
      'RAID 5 एक समूह में एक पैरिटी डिस्क लगाता है, यानी n−1; RAID 6 दो लगाता है, n−2।',
      'RAID 50 और 60 ऐसे कई समूह जोड़ते हैं, इसलिए पैरिटी समूह-संख्या से गुणा हो जाती है।',
      'RAID 1 हर डिस्क पर वही प्रति रखता है, यानी एक डिस्क; RAID 10 जोड़ों में मिरर करता है, यानी आधा।',
      'समूह बराबर आकार के होने चाहिए, इसलिए समूह-संख्या कुल डिस्कों का भाजक ही हो सकती है।',
      'डिब्बे के TB और स्क्रीन के TiB अलग इकाइयाँ हैं — क़रीब 9% का अंतर।',
    ],
    [
      '可用 = 总数 − 校验盘 × 组数。所有级别都在这一行里。',
      'RAID 5 一组花一块校验盘，所以是 n−1；RAID 6 花两块，是 n−2。',
      'RAID 50、60 把好几组这样的组拼起来，校验就要乘上组数。',
      'RAID 1 每块盘都存同一份，所以只有一块的量；RAID 10 两块一组做镜像，所以是一半。',
      '各组必须一样大，所以组数只能是盘数的约数。',
      '盒子上的 TB 和屏幕上的 TiB 是不同单位——差约 9%。',
    ],
    [
      '可用 = 總數 − 同位檢查 × 組數。所有級別都在這一行裡。',
      'RAID 5 一組花一顆同位檢查，所以是 n−1；RAID 6 花兩顆，是 n−2。',
      'RAID 50、60 把好幾組這樣的組拼起來，同位檢查就要乘上組數。',
      'RAID 1 每顆都存同一份，所以只有一顆的量；RAID 10 兩顆一組做鏡像，所以是一半。',
      '各組必須一樣大，所以組數只能是顆數的約數。',
      '盒子上的 TB 和螢幕上的 TiB 是不同單位——差約 9%。',
    ],
  ),

  faqTitle: T('자주 묻는 것', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    'RAID 용량표 — 레벨 여덟 × 디스크 2~25장',
    'RAID capacity chart — eight levels × 2 to 25 disks',
    'Tabla de capacidad RAID — ocho niveles × 2 a 25 discos',
    'Tabela de capacidade RAID — oito níveis × 2 a 25 discos',
    'RAID容量表 — レベル8 × 2~25台',
    'RAID-Kapazitätstabelle — acht Stufen × 2 bis 25 Platten',
    'Tableau de capacité RAID — huit niveaux × 2 à 25 disques',
    'RAID क्षमता तालिका — आठ स्तर × 2 से 25 डिस्कें',
    'RAID 容量表 — 八个级别 × 2~25 块盘',
    'RAID 容量表 — 八個級別 × 2~25 顆',
  ),
  hubMetaDesc: T(
    '쓸 수 있는 장수 = 전체 − 패리티 장수 × 그룹 수. 레벨별 공식을 따로 외우지 않아도 됩니다. 안 되는 조합 38개와 TB·TiB 차이도 함께 적었습니다.',
    'Usable = total − parity × groups. No need for a separate formula per level. With the 38 impossible combinations and the TB-versus-TiB gap.',
    'Utilizable = total − paridad × grupos. Sin fórmulas por nivel. Con las 38 combinaciones imposibles y la diferencia entre TB y TiB.',
    'Utilizável = total − paridade × grupos. Sem fórmulas por nível. Com as 38 combinações impossíveis e a diferença entre TB e TiB.',
    '使える台数 = 全体 − パリティ台数 × グループ数。レベルごとの公式を覚える必要はありません。できない組み合わせ38個とTB・TiBの差も載せました。',
    'Nutzbar = gesamt − Parität × Gruppen. Keine Formel je Stufe nötig. Mit den 38 unmöglichen Kombinationen und dem Unterschied zwischen TB und TiB.',
    'Utilisable = total − parité × groupes. Pas de formule par niveau. Avec les 38 combinaisons impossibles et l’écart entre To et Tio.',
    'उपयोगी = कुल − पैरिटी × समूह। हर स्तर का अलग सूत्र नहीं चाहिए। 38 असंभव संयोजन और TB बनाम TiB का अंतर भी।',
    '可用 = 总数 − 校验盘 × 组数。不必每级都背公式。附 38 个做不出来的组合，以及 TB 与 TiB 的差别。',
    '可用 = 總數 − 同位檢查 × 組數。不必每級都背公式。附 38 個做不出來的組合，以及 TB 與 TiB 的差別。',
  ),

  metaTitle: T<(f: RaidFacts) => string>(
    f => `${f.levelText} 디스크 ${f.disks}장 — ${f.possible ? `${f.usable}장분` : '만들 수 없음'}`,
    f => `${f.levelText} with ${f.disks} disks — ${f.possible ? `${f.usable} usable` : 'not possible'}`,
    f => `${f.levelText} con ${f.disks} discos — ${f.possible ? `${f.usable} utilizables` : 'no posible'}`,
    f => `${f.levelText} com ${f.disks} discos — ${f.possible ? `${f.usable} utilizáveis` : 'não é possível'}`,
    f => `${f.levelText} ${f.disks}台 — ${f.possible ? `${f.usable}台分` : '作れない'}`,
    f => `${f.levelText} mit ${f.disks} Platten — ${f.possible ? `${f.usable} nutzbar` : 'nicht möglich'}`,
    f => `${f.levelText} avec ${f.disks} disques — ${f.possible ? `${f.usable} utilisables` : 'impossible'}`,
    f => `${f.levelText} ${f.disks} डिस्कें — ${f.possible ? `${f.usable} उपयोगी` : 'संभव नहीं'}`,
    f => `${f.levelText} ${f.disks} 块盘 — ${f.possible ? `可用 ${f.usable} 块` : '做不了'}`,
    f => `${f.levelText} ${f.disks} 顆 — ${f.possible ? `可用 ${f.usable} 顆` : '做不了'}`,
  ),

  metaDesc: T<(f: RaidFacts) => string>(
    f => f.possible
      ? `디스크 ${f.disks}장으로 ${f.levelText}을 만들면 ${f.usable}장분을 씁니다(효율 ${f.efficiency}%). 고장 ${f.best!.tolerates}장까지 견디고, 4TB짜리라면 ${f.sizes.find(s => s.size === 4)!.tb}TB · ${f.sizes.find(s => s.size === 4)!.tib}TiB입니다.`
      : `디스크 ${f.disks}장으로는 ${f.levelText}을 만들 수 없습니다 — ${wKo[f.reason!]}. 최소 ${f.minDisks}장이 필요합니다.`,
    f => f.possible
      ? `${f.disks} disks in ${f.levelText} give ${f.usable} usable (${f.efficiency}% efficiency), survive ${f.best!.tolerates} failure${f.best!.tolerates === 1 ? '' : 's'}, and with 4 TB disks come to ${f.sizes.find(s => s.size === 4)!.tb} TB — ${f.sizes.find(s => s.size === 4)!.tib} TiB on screen.`
      : `${f.disks} disks cannot make a ${f.levelText} — ${wEn[f.reason!]}. At least ${f.minDisks} are needed.`,
    f => f.possible
      ? `${f.disks} discos en ${f.levelText} dan ${f.usable} utilizables (${f.efficiency}%), toleran ${f.best!.tolerates} fallo${f.best!.tolerates === 1 ? '' : 's'} y con discos de 4 TB suman ${f.sizes.find(s => s.size === 4)!.tb} TB, o ${f.sizes.find(s => s.size === 4)!.tib} TiB en pantalla.`
      : `Con ${f.disks} discos no se puede hacer ${f.levelText}: ${wEs[f.reason!]}. Hacen falta al menos ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks} discos em ${f.levelText} dão ${f.usable} utilizáveis (${f.efficiency}%), toleram ${f.best!.tolerates} falha${f.best!.tolerates === 1 ? '' : 's'} e com discos de 4 TB somam ${f.sizes.find(s => s.size === 4)!.tb} TB, ou ${f.sizes.find(s => s.size === 4)!.tib} TiB na tela.`
      : `Com ${f.disks} discos não dá para fazer ${f.levelText}: ${wPt[f.reason!]}. São precisos pelo menos ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks}台で${f.levelText}を組むと${f.usable}台分(効率${f.efficiency}%)、故障は${f.best!.tolerates}台まで耐えます。4TBなら${f.sizes.find(s => s.size === 4)!.tb}TB・画面では${f.sizes.find(s => s.size === 4)!.tib}TiBです。`
      : `${f.disks}台では${f.levelText}を組めません — ${wJa[f.reason!]}。最低${f.minDisks}台が必要です。`,
    f => f.possible
      ? `${f.disks} Platten im ${f.levelText} ergeben ${f.usable} nutzbare (${f.efficiency}%), überstehen ${f.best!.tolerates} Ausfall${f.best!.tolerates === 1 ? '' : 'e'} und kommen mit 4-TB-Platten auf ${f.sizes.find(s => s.size === 4)!.tb} TB — auf dem Bildschirm ${f.sizes.find(s => s.size === 4)!.tib} TiB.`
      : `Mit ${f.disks} Platten lässt sich kein ${f.levelText} bauen — ${wDe[f.reason!]}. Mindestens ${f.minDisks} sind nötig.`,
    f => f.possible
      ? `${f.disks} disques en ${f.levelText} donnent ${f.usable} utilisables (${f.efficiency}%), encaissent ${f.best!.tolerates} panne${f.best!.tolerates === 1 ? '' : 's'} et, avec des disques de 4 To, totalisent ${f.sizes.find(s => s.size === 4)!.tb} To — soit ${f.sizes.find(s => s.size === 4)!.tib} Tio à l’écran.`
      : `${f.disks} disques ne font pas un ${f.levelText} — ${wFr[f.reason!]}. Il en faut au moins ${f.minDisks}.`,
    f => f.possible
      ? `${f.disks} डिस्कों से ${f.levelText} में ${f.usable} उपयोगी (${f.efficiency}%), ${f.best!.tolerates} खराबी सही जाती है, और 4 TB डिस्कों पर ${f.sizes.find(s => s.size === 4)!.tb} TB यानी स्क्रीन पर ${f.sizes.find(s => s.size === 4)!.tib} TiB।`
      : `${f.disks} डिस्कों से ${f.levelText} नहीं बनता — ${wHi[f.reason!]}। कम से कम ${f.minDisks} चाहिए।`,
    f => f.possible
      ? `${f.disks} 块盘做 ${f.levelText}，可用 ${f.usable} 块（利用率 ${f.efficiency}%），能扛 ${f.best!.tolerates} 块故障；换成 4TB 的盘是 ${f.sizes.find(s => s.size === 4)!.tb}TB，屏幕上 ${f.sizes.find(s => s.size === 4)!.tib}TiB。`
      : `${f.disks} 块盘做不了 ${f.levelText}——${wZh[f.reason!]}。至少需要 ${f.minDisks} 块。`,
    f => f.possible
      ? `${f.disks} 顆做 ${f.levelText}，可用 ${f.usable} 顆（利用率 ${f.efficiency}%），能扛 ${f.best!.tolerates} 顆故障；換成 4TB 的硬碟是 ${f.sizes.find(s => s.size === 4)!.tb}TB，螢幕上 ${f.sizes.find(s => s.size === 4)!.tib}TiB。`
      : `${f.disks} 顆做不了 ${f.levelText}——${wTw[f.reason!]}。至少需要 ${f.minDisks} 顆。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'RAID 5와 RAID 6 중 무엇을 골라야 하나요?', a: '디스크가 크고 많을수록 RAID 6 쪽입니다. RAID 5는 한 장이 죽으면 복구하는 동안 나머지 전부를 처음부터 끝까지 읽는데, 요즘 디스크는 그게 며칠씩 걸립니다. 그 사이에 또 한 장이 죽으면 배열이 끝나고, RAID 6은 바로 그 경우를 견딥니다.' },
      { q: '디스크 크기가 서로 다르면 어떻게 되나요?', a: '가장 작은 장에 맞춰집니다. 4TB 세 장에 8TB 한 장을 넣으면 8TB 장도 4TB로만 쓰이고 나머지 4TB는 놀게 됩니다. 이 표는 모든 장이 같은 크기라고 보고 계산합니다.' },
      { q: '왜 겉면보다 용량이 적게 나오나요?', a: '겉면의 1TB는 10의 12제곱 바이트인데 운영체제는 2의 40제곱 바이트를 한 단위로 세기 때문입니다. 이름이 비슷할 뿐 다른 단위라 약 9% 작게 보입니다. 여기에 파일 시스템이 쓰는 자리가 더 빠집니다.' },
      { q: 'RAID를 걸어 두면 백업은 안 해도 되나요?', a: '아닙니다. RAID가 막아 주는 것은 디스크 고장 하나뿐입니다. 실수로 지운 파일, 랜섬웨어, 불이나 도난은 모든 장에 똑같이 옮습니다 — 미러는 지운 것도 그대로 따라 지웁니다.' },
    ],
    [
      { q: 'RAID 5 or RAID 6?', a: 'The bigger and more numerous the disks, the more it points to RAID 6. When RAID 5 loses a disk, rebuilding reads every remaining disk end to end, which on modern drives takes days. A second failure during that window ends the array — and RAID 6 is exactly what survives it.' },
      { q: 'What if the disks are different sizes?', a: 'Everything is levelled down to the smallest one. Put an 8 TB disk alongside three 4 TB disks and only 4 TB of it is used; the other 4 TB sits idle. This chart assumes all disks are the same size.' },
      { q: 'Why is the capacity less than the label says?', a: 'The label’s 1 TB is 10¹² bytes, while the operating system counts in units of 2⁴⁰ bytes. Similar names, different units — about 9% apart. Filesystem overhead takes a little more on top of that.' },
      { q: 'If I have RAID, do I still need backups?', a: 'Yes. RAID protects against exactly one thing: a disk dying. A file deleted by mistake, ransomware, fire or theft reach every disk equally — a mirror copies the deletion just as faithfully as the data.' },
    ],
    [
      { q: '¿RAID 5 o RAID 6?', a: 'Cuanto más grandes y numerosos los discos, más apunta a RAID 6. Cuando un RAID 5 pierde un disco, la reconstrucción lee de punta a punta todos los demás, lo que en discos actuales lleva días. Un segundo fallo en esa ventana acaba con el arreglo, y RAID 6 es justo lo que lo sobrevive.' },
      { q: '¿Y si los discos son de distinto tamaño?', a: 'Todo se nivela al más pequeño. Si pone un disco de 8 TB junto a tres de 4 TB, solo se usan 4 TB del grande y los otros 4 TB quedan ociosos. Esta tabla supone que todos los discos son iguales.' },
      { q: '¿Por qué la capacidad es menor que la de la caja?', a: 'El 1 TB de la caja son 10¹² bytes, mientras el sistema cuenta en unidades de 2⁴⁰ bytes. Nombres parecidos, unidades distintas: un 9% de diferencia. El sistema de archivos se lleva algo más encima.' },
      { q: 'Si tengo RAID, ¿necesito copias de seguridad?', a: 'Sí. El RAID protege de una sola cosa: que muera un disco. Un archivo borrado por error, un ransomware, un incendio o un robo llegan igual a todos los discos: el espejo copia el borrado con la misma fidelidad que los datos.' },
    ],
    [
      { q: 'RAID 5 ou RAID 6?', a: 'Quanto maiores e mais numerosos os discos, mais aponta para o RAID 6. Quando um RAID 5 perde um disco, a reconstrução lê de ponta a ponta todos os demais, o que em discos atuais leva dias. Uma segunda falha nessa janela encerra o arranjo — e o RAID 6 é justamente o que sobrevive a ela.' },
      { q: 'E se os discos forem de tamanhos diferentes?', a: 'Tudo se nivela pelo menor. Coloque um disco de 8 TB ao lado de três de 4 TB e só 4 TB dele são usados; os outros 4 TB ficam ociosos. Esta tabela supõe todos os discos iguais.' },
      { q: 'Por que a capacidade é menor que a da caixa?', a: 'O 1 TB da caixa são 10¹² bytes, enquanto o sistema conta em unidades de 2⁴⁰ bytes. Nomes parecidos, unidades diferentes: cerca de 9% de diferença. O sistema de arquivos leva mais um pouco.' },
      { q: 'Com RAID, ainda preciso de backup?', a: 'Precisa. O RAID protege de uma coisa só: um disco morrer. Um arquivo apagado por engano, ransomware, incêndio ou roubo chegam igualmente a todos os discos — o espelho copia o apagamento tão fielmente quanto os dados.' },
    ],
    [
      { q: 'RAID 5とRAID 6のどちらを選ぶべきですか。', a: 'ディスクが大きく多いほどRAID 6です。RAID 5は一台壊れると復旧中に残り全部を端から端まで読みますが、いまのディスクではそれに何日もかかります。その間にもう一台壊れれば構成は終わりで、RAID 6はまさにその場合に耐えます。' },
      { q: 'ディスクの大きさが違うとどうなりますか。', a: 'いちばん小さい台に合わせられます。4TB三台に8TB一台を足しても8TBの台は4TB分しか使われず、残り4TBは遊びます。この表は全台が同じ大きさとして計算します。' },
      { q: 'なぜ箱より容量が少なく出るのですか。', a: '箱の1TBは10の12乗バイトですが、OSは2の40乗バイトを一単位として数えるからです。名前が似ているだけの別単位で、約9%小さく見えます。さらにファイルシステムが使う分が引かれます。' },
      { q: 'RAIDを組めばバックアップは要りませんか。', a: '要ります。RAIDが守るのはディスクの故障ひとつだけです。誤って消したファイル、ランサムウェア、火事や盗難はすべての台に等しく及びます — ミラーは消したことも忠実に写します。' },
    ],
    [
      { q: 'RAID 5 oder RAID 6?', a: 'Je größer und zahlreicher die Platten, desto eher RAID 6. Verliert ein RAID 5 eine Platte, liest der Rebuild alle übrigen von vorn bis hinten — bei heutigen Platten dauert das Tage. Ein zweiter Ausfall in diesem Fenster beendet das Array, und genau das übersteht RAID 6.' },
      { q: 'Was, wenn die Platten unterschiedlich groß sind?', a: 'Alles richtet sich nach der kleinsten. Steckt eine 8-TB-Platte neben drei 4-TB-Platten, werden nur 4 TB davon genutzt, die anderen 4 TB liegen brach. Diese Tabelle nimmt gleich große Platten an.' },
      { q: 'Warum ist die Kapazität kleiner als aufgedruckt?', a: 'Das 1 TB der Verpackung sind 10¹² Byte, das Betriebssystem zählt in Einheiten von 2⁴⁰ Byte. Ähnliche Namen, andere Einheiten — rund 9 % Unterschied. Das Dateisystem nimmt sich noch etwas dazu.' },
      { q: 'Brauche ich mit RAID noch ein Backup?', a: 'Ja. RAID schützt vor genau einem: dem Ausfall einer Platte. Versehentlich gelöschte Dateien, Ransomware, Feuer oder Diebstahl erreichen alle Platten gleichermaßen — der Spiegel kopiert das Löschen so getreu wie die Daten.' },
    ],
    [
      { q: 'RAID 5 ou RAID 6 ?', a: 'Plus les disques sont gros et nombreux, plus cela penche vers le RAID 6. Quand un RAID 5 perd un disque, la reconstruction lit tous les autres d’un bout à l’autre, ce qui prend des jours sur les disques actuels. Une seconde panne dans cette fenêtre met fin à la grappe, et c’est exactement ce que le RAID 6 encaisse.' },
      { q: 'Et si les disques sont de tailles différentes ?', a: 'Tout s’aligne sur le plus petit. Mettez un disque de 8 To à côté de trois de 4 To et seuls 4 To en seront utilisés, les 4 autres dormiront. Ce tableau suppose des disques identiques.' },
      { q: 'Pourquoi la capacité est-elle inférieure à l’étiquette ?', a: 'Le 1 To de l’étiquette vaut 10¹² octets, alors que le système compte par unités de 2⁴⁰ octets. Noms voisins, unités différentes : environ 9 % d’écart. Le système de fichiers en prend encore un peu.' },
      { q: 'Avec du RAID, faut-il encore sauvegarder ?', a: 'Oui. Le RAID protège d’une seule chose : la mort d’un disque. Un fichier effacé par erreur, un rançongiciel, un incendie ou un vol atteignent tous les disques de la même façon — le miroir copie l’effacement aussi fidèlement que les données.' },
    ],
    [
      { q: 'RAID 5 लें या RAID 6?', a: 'डिस्कें जितनी बड़ी और ज़्यादा, उतना RAID 6 की ओर। RAID 5 में एक डिस्क जाने पर रीबिल्ड बाकी सबको शुरू से अंत तक पढ़ता है, जो आज की डिस्कों पर कई दिन लेता है। उसी दौरान दूसरी खराबी सरणी ख़त्म कर देती है — और RAID 6 ठीक उसी को सह लेता है।' },
      { q: 'अगर डिस्कें अलग-अलग आकार की हों?', a: 'सब सबसे छोटी के बराबर हो जाता है। तीन 4 TB के साथ एक 8 TB डालिए तो उसका भी केवल 4 TB काम आएगा, बाक़ी 4 TB बेकार पड़ा रहेगा। यह तालिका सभी डिस्कें बराबर मानकर चलती है।' },
      { q: 'लेबल से कम क्षमता क्यों दिखती है?', a: 'लेबल का 1 TB यानी 10¹² बाइट, जबकि सिस्टम 2⁴⁰ बाइट की इकाई में गिनता है। नाम मिलते हैं, इकाइयाँ नहीं — क़रीब 9% अंतर। ऊपर से फ़ाइल सिस्टम भी कुछ लेता है।' },
      { q: 'RAID है तो क्या बैकअप चाहिए?', a: 'चाहिए। RAID केवल एक चीज़ से बचाता है: डिस्क का मरना। ग़लती से मिटी फ़ाइल, रैनसमवेयर, आग या चोरी सभी डिस्कों तक बराबर पहुँचते हैं — मिरर मिटाने की नक़ल भी उतनी ही ईमानदारी से करता है।' },
    ],
    [
      { q: '该选 RAID 5 还是 RAID 6？', a: '盘越大越多，越该选 RAID 6。RAID 5 坏一块之后，重建要把其余的盘从头到尾读一遍，如今的盘往往要好几天。这段时间里再坏一块，阵列就完了——RAID 6 扛的正是这种情况。' },
      { q: '盘的容量不一样会怎样？', a: '按最小的那块对齐。三块 4TB 里插一块 8TB，那块也只能用 4TB，剩下 4TB 闲着。本表按所有盘一样大来算。' },
      { q: '为什么容量比标称的少？', a: '标称的 1TB 是 10¹² 字节，而系统按 2⁴⁰ 字节一个单位数。名字像，单位不同，差约 9%。文件系统还要再占一点。' },
      { q: '做了 RAID 还要备份吗？', a: '要。RAID 只挡一件事：硬盘坏掉。误删的文件、勒索软件、火灾或失窃对每块盘都一视同仁——镜像抄写删除，和抄写数据一样忠实。' },
    ],
    [
      { q: '該選 RAID 5 還是 RAID 6？', a: '硬碟越大越多，越該選 RAID 6。RAID 5 壞一顆之後，重建要把其餘的從頭到尾讀一遍，如今的硬碟往往要好幾天。這段時間裡再壞一顆，陣列就完了——RAID 6 扛的正是這種情況。' },
      { q: '硬碟容量不一樣會怎樣？', a: '按最小的那顆對齊。三顆 4TB 裡插一顆 8TB，那顆也只能用 4TB，剩下 4TB 閒著。本表按所有硬碟一樣大來算。' },
      { q: '為什麼容量比標示的少？', a: '標示的 1TB 是 10¹² 位元組，而系統按 2⁴⁰ 位元組一個單位數。名字像，單位不同，差約 9%。檔案系統還要再佔一點。' },
      { q: '做了 RAID 還要備份嗎？', a: '要。RAID 只擋一件事：硬碟壞掉。誤刪的檔案、勒索軟體、火災或失竊對每顆都一視同仁——鏡像抄寫刪除，和抄寫資料一樣忠實。' },
    ],
  ),

  cellFaq: T<(f: RaidFacts) => FaqItem[]>(
    f => [
      { q: `디스크 ${f.disks}장으로 ${f.levelText}을 만들면 얼마를 쓰나요?`, a: f.possible ? `${f.usable}장분입니다. ${f.lost}장분이 패리티·미러로 나가고 효율은 ${f.efficiency}%입니다.` : `만들 수 없습니다 — ${wKo[f.reason!]}. 최소 ${f.minDisks}장이 필요합니다.` },
      { q: `고장은 몇 장까지 견디나요?`, a: f.possible ? `${f.best!.tolerates}장까지 반드시 견디고, 죽는 자리가 좋으면 ${f.best!.bestCase}장까지 견딥니다.` : `만들 수 없는 조합이라 답할 것이 없습니다.` },
      { q: `4TB짜리로 채우면 몇 TB인가요?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb}TB입니다. 운영체제에는 ${f.sizes.find(s => s.size === 4)!.tib}TiB로 보입니다 — 단위가 달라서입니다.` : `만들 수 없는 조합입니다.` },
      { q: `이 레벨은 어떤 것인가요?`, a: dKo[f.cell.level] },
    ],
    f => [
      { q: `How much do ${f.disks} disks give in ${f.levelText}?`, a: f.possible ? `${f.usable} disks’ worth. ${f.lost} go to parity or mirroring, for ${f.efficiency}% efficiency.` : `It cannot be built — ${wEn[f.reason!]}. At least ${f.minDisks} disks are needed.` },
      { q: `How many failures does it survive?`, a: f.possible ? `${f.best!.tolerates} always, and up to ${f.best!.bestCase} if they land in the right places.` : `There is nothing to answer — this combination cannot be built.` },
      { q: `How many TB with 4 TB disks?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} TB, which the operating system shows as ${f.sizes.find(s => s.size === 4)!.tib} TiB — different units, same bytes.` : `This combination cannot be built.` },
      { q: `What is this level?`, a: dEn[f.cell.level] },
    ],
    f => [
      { q: `¿Cuánto dan ${f.disks} discos en ${f.levelText}?`, a: f.possible ? `${f.usable} discos utilizables. ${f.lost} van a paridad o espejo, con un ${f.efficiency}% de eficiencia.` : `No se puede montar: ${wEs[f.reason!]}. Hacen falta al menos ${f.minDisks} discos.` },
      { q: `¿Cuántos fallos tolera?`, a: f.possible ? `${f.best!.tolerates} siempre, y hasta ${f.best!.bestCase} si caen en los sitios adecuados.` : `No hay nada que responder: esta combinación no se puede montar.` },
      { q: `¿Cuántos TB con discos de 4 TB?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} TB, que el sistema muestra como ${f.sizes.find(s => s.size === 4)!.tib} TiB: unidades distintas, los mismos bytes.` : `Esta combinación no se puede montar.` },
      { q: `¿Qué es este nivel?`, a: dEs[f.cell.level] },
    ],
    f => [
      { q: `Quanto dão ${f.disks} discos em ${f.levelText}?`, a: f.possible ? `${f.usable} discos utilizáveis. ${f.lost} vão para paridade ou espelho, com ${f.efficiency}% de eficiência.` : `Não dá para montar: ${wPt[f.reason!]}. São precisos pelo menos ${f.minDisks} discos.` },
      { q: `Quantas falhas tolera?`, a: f.possible ? `${f.best!.tolerates} sempre, e até ${f.best!.bestCase} se caírem nos lugares certos.` : `Não há o que responder: esta combinação não pode ser montada.` },
      { q: `Quantos TB com discos de 4 TB?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} TB, que o sistema mostra como ${f.sizes.find(s => s.size === 4)!.tib} TiB — unidades diferentes, os mesmos bytes.` : `Esta combinação não pode ser montada.` },
      { q: `O que é este nível?`, a: dPt[f.cell.level] },
    ],
    f => [
      { q: `${f.disks}台で${f.levelText}を組むとどれだけ使えますか。`, a: f.possible ? `${f.usable}台分です。${f.lost}台分がパリティ・ミラーに出て、効率は${f.efficiency}%です。` : `組めません — ${wJa[f.reason!]}。最低${f.minDisks}台が必要です。` },
      { q: `故障は何台まで耐えますか。`, a: f.possible ? `${f.best!.tolerates}台までは必ず、壊れる場所が良ければ${f.best!.bestCase}台まで耐えます。` : `組めない組み合わせなので答えるものがありません。` },
      { q: `4TBで埋めると何TBですか。`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb}TBです。OSには${f.sizes.find(s => s.size === 4)!.tib}TiBと出ます — 単位が違うからです。` : `組めない組み合わせです。` },
      { q: `このレベルはどういうものですか。`, a: dJa[f.cell.level] },
    ],
    f => [
      { q: `Wie viel ergeben ${f.disks} Platten im ${f.levelText}?`, a: f.possible ? `${f.usable} nutzbare Platten. ${f.lost} gehen an Parität oder Spiegel, macht ${f.efficiency}% Effizienz.` : `Es lässt sich nicht bauen — ${wDe[f.reason!]}. Mindestens ${f.minDisks} Platten sind nötig.` },
      { q: `Wie viele Ausfälle übersteht es?`, a: f.possible ? `${f.best!.tolerates} immer, und bis zu ${f.best!.bestCase}, wenn sie günstig fallen.` : `Es gibt nichts zu beantworten — diese Kombination lässt sich nicht bauen.` },
      { q: `Wie viel TB mit 4-TB-Platten?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} TB, was das Betriebssystem als ${f.sizes.find(s => s.size === 4)!.tib} TiB anzeigt — andere Einheit, gleiche Bytes.` : `Diese Kombination lässt sich nicht bauen.` },
      { q: `Was ist diese Stufe?`, a: dDe[f.cell.level] },
    ],
    f => [
      { q: `Que donnent ${f.disks} disques en ${f.levelText} ?`, a: f.possible ? `${f.usable} disques utilisables. ${f.lost} partent en parité ou miroir, soit ${f.efficiency}% de rendement.` : `Impossible à monter — ${wFr[f.reason!]}. Il faut au moins ${f.minDisks} disques.` },
      { q: `Combien de pannes encaisse-t-il ?`, a: f.possible ? `${f.best!.tolerates} toujours, et jusqu’à ${f.best!.bestCase} si elles tombent aux bons endroits.` : `Rien à répondre : cette combinaison ne peut pas être montée.` },
      { q: `Combien de To avec des disques de 4 To ?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} To, que le système affiche en ${f.sizes.find(s => s.size === 4)!.tib} Tio — unités différentes, mêmes octets.` : `Cette combinaison ne peut pas être montée.` },
      { q: `Qu’est-ce que ce niveau ?`, a: dFr[f.cell.level] },
    ],
    f => [
      { q: `${f.disks} डिस्कों से ${f.levelText} में कितना मिलता है?`, a: f.possible ? `${f.usable} डिस्कें काम आती हैं। ${f.lost} पैरिटी या मिरर में जाती हैं, दक्षता ${f.efficiency}%।` : `बन नहीं सकता — ${wHi[f.reason!]}। कम से कम ${f.minDisks} डिस्कें चाहिए।` },
      { q: `कितनी खराबियाँ सह लेता है?`, a: f.possible ? `${f.best!.tolerates} हमेशा, और सही जगह गिरें तो ${f.best!.bestCase} तक।` : `उत्तर देने को कुछ नहीं — यह संयोजन बन ही नहीं सकता।` },
      { q: `4 TB की डिस्कों से कितने TB?`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb} TB, जो सिस्टम पर ${f.sizes.find(s => s.size === 4)!.tib} TiB दिखता है — इकाई अलग, बाइट वही।` : `यह संयोजन बन नहीं सकता।` },
      { q: `यह स्तर क्या है?`, a: dHi[f.cell.level] },
    ],
    f => [
      { q: `${f.disks} 块盘做 ${f.levelText} 能用多少？`, a: f.possible ? `${f.usable} 块的量。${f.lost} 块用在校验或镜像上，利用率 ${f.efficiency}%。` : `做不了——${wZh[f.reason!]}。至少需要 ${f.minDisks} 块。` },
      { q: `能扛几块盘的故障？`, a: f.possible ? `必定能扛 ${f.best!.tolerates} 块，位置凑巧的话最多 ${f.best!.bestCase} 块。` : `这个组合根本做不了，没有可答的。` },
      { q: `用 4TB 的盘装满是多少 TB？`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb}TB，系统里显示成 ${f.sizes.find(s => s.size === 4)!.tib}TiB——单位不同，字节一样。` : `这个组合做不了。` },
      { q: `这一级是什么？`, a: dZh[f.cell.level] },
    ],
    f => [
      { q: `${f.disks} 顆做 ${f.levelText} 能用多少？`, a: f.possible ? `${f.usable} 顆的量。${f.lost} 顆用在同位檢查或鏡像上，利用率 ${f.efficiency}%。` : `做不了——${wTw[f.reason!]}。至少需要 ${f.minDisks} 顆。` },
      { q: `能扛幾顆的故障？`, a: f.possible ? `必定能扛 ${f.best!.tolerates} 顆，位置湊巧的話最多 ${f.best!.bestCase} 顆。` : `這個組合根本做不了，沒有可答的。` },
      { q: `用 4TB 的硬碟裝滿是多少 TB？`, a: f.possible ? `${f.sizes.find(s => s.size === 4)!.tb}TB，系統裡顯示成 ${f.sizes.find(s => s.size === 4)!.tib}TiB——單位不同，位元組一樣。` : `這個組合做不了。` },
      { q: `這一級是什麼？`, a: dTw[f.cell.level] },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const RAID_UI: L<RaidUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<RaidUI>;
