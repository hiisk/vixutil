/**
 * 원소 화면의 문구 — 여덟 언어.
 *
 * 원소 이름은 names.ts에 따로 두고, 여기에는 화면 틀과 갈래 이름만 둔다.
 * 항목마다의 설명은 계산한 자리(주기·족·갈래)에서 문장을 만든다.
 */
import { LANG8_CODES, type L8, type Lang8 } from '../i18n/lang8.ts';
import type { Block, Category, ElementFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface ElementUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  categoryLabel: Record<Category, string>;
  categoryNote: Record<Category, string>;
  blockLabel: Record<Block, string>;
  /** 숫자를 글에 끼워 넣을 때 — 독일어는 55,845라고 쓴다 */
  fmt: (v: number) => string;
  symbolLabel: string;
  numberLabel: string;
  massLabel: string;
  periodLabel: string;
  groupLabel: string;
  blockTitle: string;
  configLabel: string;
  valenceLabel: string;
  neutronLabel: string;
  periodValue: (n: number) => string;
  groupValue: (n: number) => string;
  groupNone: string;
  tableTitle: string;
  tableNote: string;
  sameGroupTitle: string;
  neighbourTitle: string;
  desc: (f: ElementFacts, name: string) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (name: string, symbol: string, z: number) => string;
  metaDesc: (f: ElementFacts, name: string, category: string) => string;
  hubFaq: FaqItem[];
  elementFaq: (f: ElementFacts, name: string, category: string) => FaqItem[];
}

/** 여덟 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V): L8<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi });

/** 소수점 기호는 언어마다 다르다 */
const N = (tag: string) => (v: number) => v.toLocaleString(tag, { maximumFractionDigits: 6 });

type Spec = { [K in keyof ElementUI]: L8<ElementUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम'),
  section: T('원소', 'Elements', 'Elementos', 'Elementos', '元素', 'Elemente', 'Éléments', 'तत्व'),

  hubTitle: T(
    '주기율표 원소 118가지',
    'All 118 elements',
    'Los 118 elementos',
    'Os 118 elementos',
    '元素118種',
    'Alle 118 Elemente',
    'Les 118 éléments',
    'सभी 118 तत्व',
  ),

  hubLead: T(
    '원자번호와 기호, 원자량에서 주기와 족, 전자 배치까지 계산해 정리했습니다. 표의 자리도 번호에서 나온 것입니다.',
    'Atomic number, symbol and weight, with the period, group and electron configuration worked out from them. Even the seat in the table comes from the number.',
    'Número atómico, símbolo y peso, con el periodo, el grupo y la configuración electrónica deducidos de ellos. Hasta el sitio en la tabla sale del número.',
    'Número atômico, símbolo e peso, com o período, o grupo e a configuração eletrônica deduzidos deles. Até o lugar na tabela vem do número.',
    '原子番号・記号・原子量から、周期と族、電子配置まで計算してまとめました。表の位置も番号から出しています。',
    'Ordnungszahl, Symbol und Atomgewicht — Periode, Gruppe und Elektronenkonfiguration daraus berechnet. Selbst der Platz im System folgt aus der Zahl.',
    'Numéro atomique, symbole et masse, avec la période, le groupe et la configuration électronique déduits. Même la place dans le tableau vient du numéro.',
    'परमाणु क्रमांक, प्रतीक और द्रव्यमान — इन्हीं से आवर्त, समूह और इलेक्ट्रॉन विन्यास निकाले गए हैं। तालिका में जगह भी क्रमांक से आती है।',
  ),

  categoryLabel: T(
    { nonmetal: '비금속', noble: '비활성 기체', halogen: '할로젠', alkali: '알칼리 금속', alkaline: '알칼리 토금속', transition: '전이 금속', 'post-transition': '전이후 금속', metalloid: '준금속', lanthanide: '란타넘족', actinide: '악티늄족' },
    { nonmetal: 'Nonmetal', noble: 'Noble gas', halogen: 'Halogen', alkali: 'Alkali metal', alkaline: 'Alkaline earth metal', transition: 'Transition metal', 'post-transition': 'Post-transition metal', metalloid: 'Metalloid', lanthanide: 'Lanthanide', actinide: 'Actinide' },
    { nonmetal: 'No metal', noble: 'Gas noble', halogen: 'Halógeno', alkali: 'Metal alcalino', alkaline: 'Metal alcalinotérreo', transition: 'Metal de transición', 'post-transition': 'Metal post-transición', metalloid: 'Metaloide', lanthanide: 'Lantánido', actinide: 'Actínido' },
    { nonmetal: 'Não metal', noble: 'Gás nobre', halogen: 'Halogênio', alkali: 'Metal alcalino', alkaline: 'Metal alcalinoterroso', transition: 'Metal de transição', 'post-transition': 'Metal pós-transição', metalloid: 'Semimetal', lanthanide: 'Lantanídeo', actinide: 'Actinídeo' },
    { nonmetal: '非金属', noble: '希ガス', halogen: 'ハロゲン', alkali: 'アルカリ金属', alkaline: 'アルカリ土類金属', transition: '遷移金属', 'post-transition': '典型金属', metalloid: '半金属', lanthanide: 'ランタノイド', actinide: 'アクチノイド' },
    { nonmetal: 'Nichtmetall', noble: 'Edelgas', halogen: 'Halogen', alkali: 'Alkalimetall', alkaline: 'Erdalkalimetall', transition: 'Übergangsmetall', 'post-transition': 'Metall der p-Gruppe', metalloid: 'Halbmetall', lanthanide: 'Lanthanoid', actinide: 'Actinoid' },
    { nonmetal: 'Non-métal', noble: 'Gaz noble', halogen: 'Halogène', alkali: 'Métal alcalin', alkaline: 'Métal alcalino-terreux', transition: 'Métal de transition', 'post-transition': 'Métal pauvre', metalloid: 'Métalloïde', lanthanide: 'Lanthanide', actinide: 'Actinide' },
    { nonmetal: 'अधातु', noble: 'उत्कृष्ट गैस', halogen: 'हैलोजन', alkali: 'क्षार धातु', alkaline: 'क्षारीय मृदा धातु', transition: 'संक्रमण धातु', 'post-transition': 'संक्रमणोत्तर धातु', metalloid: 'उपधातु', lanthanide: 'लैंथेनाइड', actinide: 'ऐक्टिनाइड' },
  ),

  categoryNote: T(
    {
      nonmetal: '전기를 잘 통하지 않고, 전자를 받아들여 음이온이 되기 쉽습니다.',
      noble: '가장 바깥 껍질이 꽉 차 있어 다른 원소와 잘 반응하지 않습니다.',
      halogen: '전자 하나만 받으면 껍질이 차므로 반응성이 매우 큽니다.',
      alkali: '가장 바깥 전자 하나를 쉽게 내주어 물과도 격렬하게 반응합니다.',
      alkaline: '전자 둘을 내주는 금속으로, 알칼리 금속보다는 덜 격렬합니다.',
      transition: '안쪽 껍질을 채우며 지나가는 금속들로, 여러 산화수를 가지고 색을 냅니다.',
      'post-transition': '전이 금속 오른쪽의 금속으로, 무르고 녹는점이 낮은 편입니다.',
      metalloid: '금속과 비금속의 성질을 함께 가져 반도체로 쓰입니다.',
      lanthanide: '표 아래 첫 줄로 빠진 열넷. 성질이 서로 매우 비슷해 나누기 어렵습니다.',
      actinide: '표 아래 둘째 줄로 빠진 열넷. 모두 방사성이고 대부분 인공 원소입니다.',
    },
    {
      nonmetal: 'Poor conductors that tend to take on electrons and become negative ions.',
      noble: 'Their outer shell is already full, so they barely react with anything.',
      halogen: 'One electron short of a full shell, which makes them highly reactive.',
      alkali: 'They give up their single outer electron so readily that water sets them off.',
      alkaline: 'Metals that give up two electrons — vigorous, but less so than the alkali metals.',
      transition: 'Metals filling an inner shell as they go, giving several oxidation states and colour.',
      'post-transition': 'The metals to the right of the transition block: softer, with lower melting points.',
      metalloid: 'Part metal, part nonmetal — which is what makes semiconductors possible.',
      lanthanide: 'The first of the two rows pulled out below the table. So alike that separating them is hard work.',
      actinide: 'The second row below the table. All radioactive, and most of them made by people.',
    },
    {
      nonmetal: 'Malos conductores que tienden a captar electrones y volverse iones negativos.',
      noble: 'Su capa externa ya está llena, así que apenas reaccionan con nada.',
      halogen: 'Les falta un electrón para completar la capa, de ahí su gran reactividad.',
      alkali: 'Ceden su único electrón externo con tal facilidad que el agua los enciende.',
      alkaline: 'Metales que ceden dos electrones: enérgicos, aunque menos que los alcalinos.',
      transition: 'Metales que van llenando una capa interna, con varios estados de oxidación y color.',
      'post-transition': 'Los metales a la derecha del bloque de transición: más blandos y de menor punto de fusión.',
      metalloid: 'Mitad metal, mitad no metal: eso es lo que hace posibles los semiconductores.',
      lanthanide: 'La primera de las dos filas sacadas bajo la tabla. Tan parecidos que separarlos cuesta.',
      actinide: 'La segunda fila bajo la tabla. Todos radiactivos y casi todos fabricados por el ser humano.',
    },
    {
      nonmetal: 'Maus condutores que tendem a receber elétrons e virar íons negativos.',
      noble: 'A camada externa já está cheia, então quase não reagem com nada.',
      halogen: 'Falta um elétron para completar a camada, daí a alta reatividade.',
      alkali: 'Cedem o único elétron externo com tanta facilidade que a água os acende.',
      alkaline: 'Metais que cedem dois elétrons: enérgicos, mas menos que os alcalinos.',
      transition: 'Metais que preenchem uma camada interna, com vários estados de oxidação e cor.',
      'post-transition': 'Os metais à direita do bloco de transição: mais moles e de fusão mais baixa.',
      metalloid: 'Meio metal, meio não metal — é o que torna possíveis os semicondutores.',
      lanthanide: 'A primeira das duas linhas puxadas para baixo da tabela. Tão parecidos que separá-los dá trabalho.',
      actinide: 'A segunda linha abaixo da tabela. Todos radioativos e quase todos feitos por pessoas.',
    },
    {
      nonmetal: '電気を通しにくく、電子を受け取って陰イオンになりやすい元素です。',
      noble: 'いちばん外の殻が満たされているため、ほとんど反応しません。',
      halogen: '電子を一つ受け取れば殻が満ちるので、反応性がとても高い元素です。',
      alkali: '外側の電子一つを手放しやすく、水とも激しく反応します。',
      alkaline: '電子二つを手放す金属で、アルカリ金属ほど激しくはありません。',
      transition: '内側の殻を埋めながら並ぶ金属で、複数の酸化数を取り、色を持ちます。',
      'post-transition': '遷移金属の右側の金属で、やわらかく融点が低めです。',
      metalloid: '金属と非金属の性質をあわせ持ち、半導体に使われます。',
      lanthanide: '表の下に抜き出した一段目の十四元素。性質がよく似ていて分けるのが難しい仲間です。',
      actinide: '表の下の二段目の十四元素。すべて放射性で、多くは人の手で作られました。',
    },
    {
      nonmetal: 'Schlechte Leiter, die gern Elektronen aufnehmen und zu negativen Ionen werden.',
      noble: 'Ihre äußere Schale ist bereits voll, deshalb reagieren sie kaum.',
      halogen: 'Ihnen fehlt ein Elektron zur vollen Schale — daher die hohe Reaktionsfreude.',
      alkali: 'Sie geben ihr einziges Außenelektron so leicht ab, dass Wasser sie entzündet.',
      alkaline: 'Metalle, die zwei Elektronen abgeben: heftig, aber weniger als die Alkalimetalle.',
      transition: 'Metalle, die eine innere Schale auffüllen — mit mehreren Oxidationsstufen und Farbe.',
      'post-transition': 'Die Metalle rechts vom Übergangsblock: weicher, mit niedrigerem Schmelzpunkt.',
      metalloid: 'Halb Metall, halb Nichtmetall — genau das macht Halbleiter möglich.',
      lanthanide: 'Die erste der beiden Reihen unter dem System. So ähnlich, dass ihre Trennung mühsam ist.',
      actinide: 'Die zweite Reihe unter dem System. Alle radioaktiv, die meisten von Menschen erzeugt.',
    },
    {
      nonmetal: 'Mauvais conducteurs, ils captent volontiers des électrons et deviennent des ions négatifs.',
      noble: 'Leur couche externe est déjà pleine : ils ne réagissent presque pas.',
      halogen: 'Il leur manque un électron pour compléter la couche, d’où leur forte réactivité.',
      alkali: 'Ils cèdent leur unique électron externe si facilement que l’eau les enflamme.',
      alkaline: 'Métaux qui cèdent deux électrons : vifs, mais moins que les alcalins.',
      transition: 'Métaux qui remplissent une couche interne, d’où plusieurs degrés d’oxydation et de la couleur.',
      'post-transition': 'Les métaux à droite du bloc de transition : plus mous, de point de fusion plus bas.',
      metalloid: 'Mi-métal, mi-non-métal — c’est ce qui rend les semi-conducteurs possibles.',
      lanthanide: 'La première des deux lignes sorties sous le tableau. Si semblables que les séparer est un travail.',
      actinide: 'La seconde ligne sous le tableau. Tous radioactifs, et la plupart fabriqués par l’homme.',
    },
    {
      nonmetal: 'बिजली के कमज़ोर चालक, जो इलेक्ट्रॉन लेकर ऋण आयन बन जाते हैं।',
      noble: 'इनका बाहरी कोश पहले से भरा है, इसलिए ये लगभग किसी से क्रिया नहीं करते।',
      halogen: 'कोश पूरा होने में एक इलेक्ट्रॉन कम है, इसीलिए ये बेहद क्रियाशील हैं।',
      alkali: 'ये अपना अकेला बाहरी इलेक्ट्रॉन इतनी आसानी से देते हैं कि पानी से भी भड़क उठते हैं।',
      alkaline: 'दो इलेक्ट्रॉन देने वाली धातुएँ — तेज़, पर क्षार धातुओं जितनी नहीं।',
      transition: 'भीतरी कोश भरती हुई धातुएँ, जिनके कई ऑक्सीकरण अंक होते हैं और जो रंग देती हैं।',
      'post-transition': 'संक्रमण खंड के दाईं ओर की धातुएँ — नरम और कम गलनांक वाली।',
      metalloid: 'आधी धातु, आधी अधातु — यही सेमीकंडक्टर को संभव बनाता है।',
      lanthanide: 'तालिका के नीचे निकाली दो पंक्तियों में पहली। आपस में इतने मिलते-जुलते कि अलग करना कठिन है।',
      actinide: 'तालिका के नीचे दूसरी पंक्ति। सभी रेडियोधर्मी और अधिकतर मानव-निर्मित।',
    },
  ),

  blockLabel: T(
    { s: 's 블록', p: 'p 블록', d: 'd 블록', f: 'f 블록' },
    { s: 's block', p: 'p block', d: 'd block', f: 'f block' },
    { s: 'bloque s', p: 'bloque p', d: 'bloque d', f: 'bloque f' },
    { s: 'bloco s', p: 'bloco p', d: 'bloco d', f: 'bloco f' },
    { s: 's ブロック', p: 'p ブロック', d: 'd ブロック', f: 'f ブロック' },
    { s: 's-Block', p: 'p-Block', d: 'd-Block', f: 'f-Block' },
    { s: 'bloc s', p: 'bloc p', d: 'bloc d', f: 'bloc f' },
    { s: 's खंड', p: 'p खंड', d: 'd खंड', f: 'f खंड' },
  ),

  fmt: T(N('ko'), N('en'), N('es'), N('pt-BR'), N('ja'), N('de'), N('fr'), N('en')),
  symbolLabel: T('기호', 'Symbol', 'Símbolo', 'Símbolo', '元素記号', 'Symbol', 'Symbole', 'प्रतीक'),
  numberLabel: T('원자번호', 'Atomic number', 'Número atómico', 'Número atômico', '原子番号', 'Ordnungszahl', 'Numéro atomique', 'परमाणु क्रमांक'),
  massLabel: T('원자량', 'Atomic weight', 'Peso atómico', 'Peso atômico', '原子量', 'Atomgewicht', 'Masse atomique', 'परमाणु द्रव्यमान'),
  periodLabel: T('주기', 'Period', 'Periodo', 'Período', '周期', 'Periode', 'Période', 'आवर्त'),
  groupLabel: T('족', 'Group', 'Grupo', 'Grupo', '族', 'Gruppe', 'Groupe', 'समूह'),
  blockTitle: T('블록', 'Block', 'Bloque', 'Bloco', 'ブロック', 'Block', 'Bloc', 'खंड'),
  configLabel: T('전자 배치', 'Electron configuration', 'Configuración electrónica', 'Configuração eletrônica', '電子配置', 'Elektronenkonfiguration', 'Configuration électronique', 'इलेक्ट्रॉन विन्यास'),
  valenceLabel: T('최외각 전자', 'Outer-shell electrons', 'Electrones de valencia', 'Elétrons de valência', '最外殻電子', 'Außenelektronen', 'Électrons de valence', 'बाहरी कोश के इलेक्ट्रॉन'),
  neutronLabel: T('중성자 수', 'Neutrons', 'Neutrones', 'Nêutrons', '中性子数', 'Neutronen', 'Neutrons', 'न्यूट्रॉन'),

  periodValue: T(
    (n: number) => `${n}주기`, (n: number) => `Period ${n}`, (n: number) => `Periodo ${n}`, (n: number) => `Período ${n}`,
    (n: number) => `第${n}周期`, (n: number) => `${n}. Periode`, (n: number) => `Période ${n}`, (n: number) => `आवर्त ${n}`,
  ),
  groupValue: T(
    (n: number) => `${n}족`, (n: number) => `Group ${n}`, (n: number) => `Grupo ${n}`, (n: number) => `Grupo ${n}`,
    (n: number) => `第${n}族`, (n: number) => `Gruppe ${n}`, (n: number) => `Groupe ${n}`, (n: number) => `समूह ${n}`,
  ),
  groupNone: T('표 아래로 빠짐', 'set below the table', 'fuera de la tabla', 'fora da tabela', '表の下', 'unter dem System', 'sous le tableau', 'तालिका के नीचे'),

  tableTitle: T('주기율표', 'The periodic table', 'La tabla periódica', 'A tabela periódica', '周期表', 'Das Periodensystem', 'Le tableau périodique', 'आवर्त सारणी'),
  tableNote: T(
    '가로줄이 주기, 세로줄이 족입니다. 눌러서 원소 하나를 펼쳐 보세요.',
    'Rows are periods, columns are groups. Tap any square to open that element.',
    'Las filas son periodos y las columnas grupos. Toca un cuadro para abrir el elemento.',
    'As linhas são períodos e as colunas, grupos. Toque num quadrado para abrir o elemento.',
    '横の行が周期、縦の列が族です。マスを押すとその元素が開きます。',
    'Zeilen sind Perioden, Spalten sind Gruppen. Auf ein Feld tippen, um das Element zu öffnen.',
    'Les lignes sont les périodes, les colonnes les groupes. Touchez une case pour ouvrir l’élément.',
    'पंक्तियाँ आवर्त हैं और स्तंभ समूह। किसी खाने को दबाकर वह तत्व खोलिए।',
  ),
  sameGroupTitle: T('같은 족의 원소', 'Others in the same group', 'Otros del mismo grupo', 'Outros do mesmo grupo', '同じ族の元素', 'Andere derselben Gruppe', 'Autres du même groupe', 'इसी समूह के अन्य'),
  neighbourTitle: T('번호가 이웃한 원소', 'Neighbours by number', 'Vecinos por número', 'Vizinhos por número', '番号が隣の元素', 'Nachbarn nach Zahl', 'Voisins par numéro', 'क्रमांक में पड़ोसी'),

  desc: T(
    (f: ElementFacts, name: string) => `원자번호 ${f.z}번, 기호는 ${f.symbol}입니다. ${f.period}주기 ${f.group ? `${f.group}족` : '표 아래'}에 자리하고, 원자량은 ${N('ko')(f.mass)}입니다.`,
    (f: ElementFacts, name: string) => `${name} is element ${f.z}, symbol ${f.symbol}. It sits in period ${f.period}${f.group ? `, group ${f.group}` : ', in the rows below the table'}, and weighs ${N('en')(f.mass)}.`,
    (f: ElementFacts, name: string) => `${name} es el elemento ${f.z}, símbolo ${f.symbol}. Está en el periodo ${f.period}${f.group ? `, grupo ${f.group}` : ', en las filas bajo la tabla'}, y pesa ${N('es')(f.mass)}.`,
    (f: ElementFacts, name: string) => `${name} é o elemento ${f.z}, símbolo ${f.symbol}. Fica no período ${f.period}${f.group ? `, grupo ${f.group}` : ', nas linhas abaixo da tabela'}, e pesa ${N('pt-BR')(f.mass)}.`,
    (f: ElementFacts, name: string) => `原子番号${f.z}番、記号は${f.symbol}です。第${f.period}周期${f.group ? `第${f.group}族` : '、表の下の段'}にあり、原子量は${N('ja')(f.mass)}です。`,
    (f: ElementFacts, name: string) => `${name} ist Element ${f.z}, Symbol ${f.symbol}. Es steht in Periode ${f.period}${f.group ? `, Gruppe ${f.group}` : ', in den Reihen unter dem System'} und wiegt ${N('de')(f.mass)}.`,
    (f: ElementFacts, name: string) => `${name} est l’élément ${f.z}, symbole ${f.symbol}. Il se place en période ${f.period}${f.group ? `, groupe ${f.group}` : ', dans les lignes sous le tableau'}, et pèse ${N('fr')(f.mass)}.`,
    (f: ElementFacts, name: string) => `${name} तत्व क्रमांक ${f.z} है, प्रतीक ${f.symbol}। यह आवर्त ${f.period}${f.group ? `, समूह ${f.group}` : ', तालिका के नीचे की पंक्तियों'} में है और इसका द्रव्यमान ${N('en')(f.mass)} है।`,
  ),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें'),

  how: T(
    [
      '가로줄(주기)은 전자가 채워지는 껍질의 수입니다. 3주기 원소는 껍질을 세 겹 두르고 있습니다.',
      '세로줄(족)은 가장 바깥 껍질의 전자 수를 뜻합니다. 같은 족이 성질이 비슷한 이유가 여기 있습니다.',
      '원자량은 원자번호의 두 배 언저리입니다. 양성자만큼 중성자가 있다고 보면 대략 맞습니다.',
      '란타넘족과 악티늄족 스물여덟은 표 아래로 뺐습니다. 그대로 끼워 넣으면 표가 서른두 칸으로 넓어지기 때문입니다.',
    ],
    [
      'A row (period) is the number of electron shells. Elements in period 3 carry three of them.',
      'A column (group) tells you how many electrons sit in the outer shell — which is why a group behaves alike.',
      'Atomic weight runs at roughly twice the atomic number: about as many neutrons as protons.',
      'The 28 lanthanides and actinides are drawn below the table. Slotting them in would stretch it to 32 columns.',
    ],
    [
      'Una fila (periodo) es el número de capas de electrones: los del periodo 3 llevan tres.',
      'Una columna (grupo) indica cuántos electrones hay en la capa externa, y por eso un grupo se comporta igual.',
      'El peso atómico ronda el doble del número atómico: hay más o menos tantos neutrones como protones.',
      'Los 28 lantánidos y actínidos van dibujados debajo. Encajarlos dentro estiraría la tabla a 32 columnas.',
    ],
    [
      'Uma linha (período) é o número de camadas de elétrons: os do período 3 têm três.',
      'Uma coluna (grupo) diz quantos elétrons há na camada externa, e por isso um grupo se comporta igual.',
      'O peso atômico fica em torno do dobro do número atômico: há mais ou menos tantos nêutrons quanto prótons.',
      'Os 28 lantanídeos e actinídeos são desenhados abaixo. Encaixá-los esticaria a tabela para 32 colunas.',
    ],
    [
      '横の行（周期）は電子殻の数です。第3周期の元素は殻を三重にまとっています。',
      '縦の列（族）は最外殻の電子の数を表します。同じ族の性質が似ているのはこのためです。',
      '原子量は原子番号のおよそ二倍です。陽子と同じくらい中性子があると見ればだいたい合います。',
      'ランタノイドとアクチノイドの二十八元素は表の下に出しています。そのまま入れると表が三十二列に広がるからです。',
    ],
    [
      'Eine Zeile (Periode) ist die Zahl der Elektronenschalen: Elemente der 3. Periode tragen drei.',
      'Eine Spalte (Gruppe) sagt, wie viele Elektronen außen sitzen — daher das ähnliche Verhalten.',
      'Das Atomgewicht liegt bei rund dem Doppelten der Ordnungszahl: etwa so viele Neutronen wie Protonen.',
      'Die 28 Lanthanoide und Actinoide stehen unter dem System. Eingereiht würde es 32 Spalten breit.',
    ],
    [
      'Une ligne (période) correspond au nombre de couches électroniques : ceux de la période 3 en portent trois.',
      'Une colonne (groupe) indique le nombre d’électrons de la couche externe — d’où la parenté de comportement.',
      'La masse atomique vaut à peu près le double du numéro : autant de neutrons que de protons, en gros.',
      'Les 28 lanthanides et actinides sont dessinés sous le tableau. Les insérer le porterait à 32 colonnes.',
    ],
    [
      'पंक्ति (आवर्त) इलेक्ट्रॉन कोशों की संख्या है: आवर्त 3 के तत्वों पर तीन कोश होते हैं।',
      'स्तंभ (समूह) बताता है कि बाहरी कोश में कितने इलेक्ट्रॉन हैं — इसीलिए एक समूह का व्यवहार मिलता-जुलता है।',
      'परमाणु द्रव्यमान लगभग क्रमांक का दोगुना होता है: प्रोटॉन जितने ही न्यूट्रॉन मान लीजिए।',
      '28 लैंथेनाइड और ऐक्टिनाइड तालिका के नीचे दिखाए जाते हैं। भीतर रखने पर तालिका 32 स्तंभ चौड़ी हो जाती।',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल'),

  hubMetaTitle: T(
    '주기율표 118원소 — 기호·원자량·전자 배치',
    'Periodic table — all 118 elements with symbols and weights',
    'Tabla periódica — los 118 elementos con símbolos y pesos',
    'Tabela periódica — os 118 elementos com símbolos e pesos',
    '周期表118元素 — 記号・原子量・電子配置',
    'Periodensystem — alle 118 Elemente mit Symbol und Gewicht',
    'Tableau périodique — les 118 éléments avec symboles et masses',
    'आवर्त सारणी — प्रतीक और द्रव्यमान सहित सभी 118 तत्व',
  ),
  hubMetaDesc: T(
    '원소 118가지의 기호와 원자량, 주기와 족, 전자 배치를 한자리에 모았습니다. 자리와 갈래는 원자번호에서 계산한 값이라 표와 설명이 어긋나지 않습니다.',
    'Symbols, atomic weights, periods, groups and electron configurations for all 118 elements. Position and category are computed from the atomic number, so the table and the text cannot disagree.',
    'Símbolos, pesos atómicos, periodos, grupos y configuraciones electrónicas de los 118 elementos. La posición y la categoría se calculan del número atómico, así que tabla y texto no pueden discrepar.',
    'Símbolos, pesos atômicos, períodos, grupos e configurações eletrônicas dos 118 elementos. Posição e categoria são calculadas do número atômico, então tabela e texto não divergem.',
    '元素118種の記号と原子量、周期と族、電子配置をまとめました。位置も分類も原子番号から計算しているので、表と説明が食い違いません。',
    'Symbole, Atomgewichte, Perioden, Gruppen und Elektronenkonfigurationen aller 118 Elemente. Platz und Kategorie folgen aus der Ordnungszahl — Tabelle und Text können nicht auseinanderlaufen.',
    'Symboles, masses atomiques, périodes, groupes et configurations électroniques des 118 éléments. Place et catégorie sont calculées à partir du numéro : le tableau et le texte ne peuvent pas diverger.',
    'सभी 118 तत्वों के प्रतीक, परमाणु द्रव्यमान, आवर्त, समूह और इलेक्ट्रॉन विन्यास। स्थान और श्रेणी परमाणु क्रमांक से गणना होती है, इसलिए तालिका और विवरण अलग नहीं हो सकते।',
  ),

  metaTitle: T(
    (name: string, symbol: string, z: number) => `${name}(${symbol}) — 원자번호 ${z}번 원소`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — element number ${z}`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — elemento número ${z}`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — elemento número ${z}`,
    (name: string, symbol: string, z: number) => `${name}（${symbol}）— 原子番号${z}の元素`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — Element Nummer ${z}`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — élément numéro ${z}`,
    (name: string, symbol: string, z: number) => `${name} (${symbol}) — तत्व क्रमांक ${z}`,
  ),

  metaDesc: T(
    (f: ElementFacts, name: string, category: string) => `${name}(${f.symbol})는 원자번호 ${f.z}번, 원자량 ${N('ko')(f.mass)}의 ${category}입니다. ${f.period}주기에 자리하고 전자 배치는 ${f.shortConfig}입니다.`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) is element ${f.z}, a ${category.toLowerCase()} with an atomic weight of ${N('en')(f.mass)}. It sits in period ${f.period}, and its electron configuration is ${f.shortConfig}.`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) es el elemento ${f.z}, un ${category.toLowerCase()} de peso atómico ${N('es')(f.mass)}. Está en el periodo ${f.period} y su configuración electrónica es ${f.shortConfig}.`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) é o elemento ${f.z}, um ${category.toLowerCase()} de peso atômico ${N('pt-BR')(f.mass)}. Fica no período ${f.period} e sua configuração eletrônica é ${f.shortConfig}.`,
    (f: ElementFacts, name: string, category: string) => `${name}（${f.symbol}）は原子番号${f.z}、原子量${N('ja')(f.mass)}の${category}です。第${f.period}周期にあり、電子配置は ${f.shortConfig} です。`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) ist Element ${f.z}, ein ${category} mit dem Atomgewicht ${N('de')(f.mass)}. Es steht in Periode ${f.period}, die Elektronenkonfiguration lautet ${f.shortConfig}.`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) est l’élément ${f.z}, un ${category.toLowerCase()} de masse atomique ${N('fr')(f.mass)}. Il est en période ${f.period} et sa configuration électronique est ${f.shortConfig}.`,
    (f: ElementFacts, name: string, category: string) => `${name} (${f.symbol}) तत्व क्रमांक ${f.z} है — ${category}, परमाणु द्रव्यमान ${N('en')(f.mass)}। यह आवर्त ${f.period} में है और इसका इलेक्ट्रॉन विन्यास ${f.shortConfig} है।`,
  ),

  hubFaq: T(
    [
      { q: '주기율표는 무엇을 기준으로 늘어놓은 표인가요?', a: '원자번호, 곧 양성자 수 순서입니다. 순서대로 늘어놓다가 성질이 되풀이되는 자리에서 줄을 바꾸면 같은 성질끼리 세로로 모입니다. 이 표의 자리도 번호에서 계산한 것입니다.' },
      { q: '족과 주기가 각각 무엇을 뜻하나요?', a: '주기(가로줄)는 전자껍질의 수이고, 족(세로줄)은 가장 바깥 껍질의 전자 수입니다. 같은 족이 비슷하게 반응하는 것은 바깥 전자 수가 같기 때문입니다.' },
      { q: '왜 118개에서 멈추나요?', a: '지금까지 만들어 확인된 원소가 118번까지이기 때문입니다. 119번부터는 만들려는 시도가 이어지고 있지만 아직 확인되지 않았습니다. 93번 넵투늄부터는 대부분 사람이 만든 원소입니다.' },
      { q: '원자량이 왜 정수가 아닌가요?', a: '같은 원소라도 중성자 수가 다른 동위원소가 섞여 있어, 자연에 있는 비율대로 평균 낸 값이기 때문입니다. 안정한 동위원소가 없는 원소는 가장 오래 사는 동위원소의 질량수를 적었습니다.' },
      { q: '이 표의 값은 어디서 왔나요?', a: '적어 둔 것은 원자번호와 기호, 원자량뿐입니다. 주기와 족, 블록과 갈래, 전자 배치는 번호에서 계산합니다. 그래서 표의 자리와 설명이 어긋날 수 없습니다.' },
    ],
    [
      { q: 'What is the table ordered by?', a: 'Atomic number — the count of protons. Lay the elements out in that order and start a new row where the properties begin to repeat, and similar elements line up in columns. The seats on this page are computed from that number.' },
      { q: 'What do the rows and columns mean?', a: 'A row (period) is the number of electron shells; a column (group) is how many electrons sit in the outermost one. Elements in a group react alike because that outer count is the same.' },
      { q: 'Why does it stop at 118?', a: 'Because 118 is as far as confirmed elements go. Attempts at 119 continue but nothing has been confirmed. From neptunium at 93 onwards, almost everything is made by people.' },
      { q: 'Why are atomic weights not whole numbers?', a: 'An element comes as a mixture of isotopes with different neutron counts, and the weight is the average over natural abundance. Where no isotope is stable, the mass number of the longest-lived one is listed instead.' },
      { q: 'Where do these values come from?', a: 'Only the atomic number, the symbol and the weight are stored. Period, group, block, category and electron configuration are all worked out from the number, so the seat in the table cannot disagree with the text.' },
    ],
    [
      { q: '¿Según qué está ordenada la tabla?', a: 'Por número atómico, es decir, el número de protones. Al colocarlos en ese orden y empezar fila donde las propiedades se repiten, los parecidos quedan en la misma columna. Los sitios de esta página se calculan de ese número.' },
      { q: '¿Qué significan filas y columnas?', a: 'Una fila (periodo) es el número de capas de electrones; una columna (grupo), cuántos electrones hay en la más externa. Un grupo reacciona igual porque ese número externo coincide.' },
      { q: '¿Por qué se detiene en 118?', a: 'Porque hasta ahí llegan los elementos confirmados. Se sigue intentando el 119, pero nada está confirmado. Desde el neptunio (93) casi todo es fabricado por el ser humano.' },
      { q: '¿Por qué los pesos atómicos no son enteros?', a: 'Un elemento viene como mezcla de isótopos con distintos neutrones, y el peso es el promedio según su abundancia natural. Si ningún isótopo es estable, se anota el número másico del más longevo.' },
      { q: '¿De dónde salen estos valores?', a: 'Solo se guardan el número atómico, el símbolo y el peso. Periodo, grupo, bloque, categoría y configuración electrónica se calculan del número, así que el sitio en la tabla no puede contradecir al texto.' },
    ],
    [
      { q: 'A tabela é ordenada por quê?', a: 'Pelo número atômico, ou seja, a quantidade de prótons. Dispondo nessa ordem e mudando de linha onde as propriedades se repetem, os semelhantes ficam na mesma coluna. Os lugares desta página são calculados desse número.' },
      { q: 'O que significam linhas e colunas?', a: 'Uma linha (período) é o número de camadas de elétrons; uma coluna (grupo), quantos elétrons há na mais externa. Um grupo reage igual porque essa contagem externa coincide.' },
      { q: 'Por que para em 118?', a: 'Porque é até aí que vão os elementos confirmados. As tentativas com o 119 continuam, mas nada foi confirmado. Do netúnio (93) em diante, quase tudo é feito por pessoas.' },
      { q: 'Por que os pesos atômicos não são inteiros?', a: 'Um elemento vem como mistura de isótopos com números diferentes de nêutrons, e o peso é a média conforme a abundância natural. Sem isótopo estável, anota-se o número de massa do mais duradouro.' },
      { q: 'De onde vêm esses valores?', a: 'Só o número atômico, o símbolo e o peso ficam guardados. Período, grupo, bloco, categoria e configuração eletrônica saem do número, então o lugar na tabela não pode contradizer o texto.' },
    ],
    [
      { q: '周期表は何を基準に並べた表ですか。', a: '原子番号、つまり陽子の数の順です。その順に並べ、性質が繰り返す位置で行を変えると、似た元素が縦にそろいます。このページの位置も番号から計算しています。' },
      { q: '族と周期はそれぞれ何を表しますか。', a: '周期（横の行）は電子殻の数、族（縦の列）は最外殻の電子の数です。同じ族が似た反応を示すのは、外側の電子の数が同じだからです。' },
      { q: 'なぜ118で止まるのですか。', a: '確認されている元素が118番までだからです。119番以降も合成の試みは続いていますが、まだ確認されていません。93番ネプツニウム以降はほとんどが人工元素です。' },
      { q: 'なぜ原子量は整数でないのですか。', a: '同じ元素でも中性子の数が違う同位体が混じっており、自然界の割合で平均した値だからです。安定同位体がない元素は、いちばん長く残る同位体の質量数を記しています。' },
      { q: 'この表の値はどこから来たものですか。', a: '持っているのは原子番号・記号・原子量だけです。周期も族もブロックも分類も電子配置も番号から計算します。だから表の位置と説明が食い違うことはありません。' },
    ],
    [
      { q: 'Wonach ist das System geordnet?', a: 'Nach der Ordnungszahl, also der Protonenzahl. Legt man die Elemente so aus und beginnt dort eine neue Zeile, wo sich die Eigenschaften wiederholen, stehen Ähnliche untereinander. Die Plätze hier folgen aus dieser Zahl.' },
      { q: 'Was bedeuten Zeilen und Spalten?', a: 'Eine Zeile (Periode) ist die Zahl der Elektronenschalen, eine Spalte (Gruppe) die Zahl der Elektronen in der äußersten. Eine Gruppe reagiert ähnlich, weil diese Außenzahl gleich ist.' },
      { q: 'Warum endet es bei 118?', a: 'So weit reichen die bestätigten Elemente. Versuche mit 119 laufen, bestätigt ist nichts. Ab Neptunium (93) ist fast alles von Menschen erzeugt.' },
      { q: 'Warum sind die Atomgewichte keine ganzen Zahlen?', a: 'Ein Element kommt als Gemisch von Isotopen mit verschiedener Neutronenzahl; das Gewicht ist der nach natürlicher Häufigkeit gemittelte Wert. Fehlt ein stabiles Isotop, steht die Massenzahl des langlebigsten.' },
      { q: 'Woher stammen diese Werte?', a: 'Gespeichert sind nur Ordnungszahl, Symbol und Gewicht. Periode, Gruppe, Block, Kategorie und Konfiguration werden aus der Zahl berechnet — Platz und Text können nicht auseinanderlaufen.' },
    ],
    [
      { q: 'Selon quoi le tableau est-il ordonné ?', a: 'Par numéro atomique, c’est-à-dire le nombre de protons. Rangés ainsi, avec un retour à la ligne là où les propriétés se répètent, les éléments semblables s’alignent en colonnes. Les places de cette page sont calculées à partir de ce numéro.' },
      { q: 'Que signifient lignes et colonnes ?', a: 'Une ligne (période) correspond au nombre de couches électroniques ; une colonne (groupe) au nombre d’électrons de la couche externe. Un groupe réagit pareil parce que ce nombre externe est le même.' },
      { q: 'Pourquoi s’arrêter à 118 ?', a: 'Parce que les éléments confirmés s’arrêtent là. Les tentatives sur le 119 continuent, sans confirmation. À partir du neptunium (93), presque tout est fabriqué par l’homme.' },
      { q: 'Pourquoi les masses atomiques ne sont-elles pas entières ?', a: 'Un élément est un mélange d’isotopes aux neutrons différents, et la masse est la moyenne pondérée par l’abondance naturelle. Sans isotope stable, on indique le nombre de masse du plus durable.' },
      { q: 'D’où viennent ces valeurs ?', a: 'Seuls le numéro, le symbole et la masse sont enregistrés. Période, groupe, bloc, catégorie et configuration se calculent à partir du numéro : la place et le texte ne peuvent pas se contredire.' },
    ],
    [
      { q: 'यह सारणी किस क्रम में है?', a: 'परमाणु क्रमांक यानी प्रोटॉनों की संख्या के क्रम में। उसी क्रम में रखते हुए जहाँ गुण दोहराने लगते हैं वहाँ नई पंक्ति शुरू करने पर मिलते-जुलते तत्व एक स्तंभ में आ जाते हैं। इस पन्ने की जगहें भी उसी क्रमांक से गणना होती हैं।' },
      { q: 'पंक्ति और स्तंभ का क्या अर्थ है?', a: 'पंक्ति (आवर्त) इलेक्ट्रॉन कोशों की संख्या है; स्तंभ (समूह) बताता है कि सबसे बाहरी कोश में कितने इलेक्ट्रॉन हैं। एक समूह की क्रिया मिलती-जुलती इसीलिए होती है।' },
      { q: '118 पर ही क्यों रुकता है?', a: 'क्योंकि पुष्ट तत्व वहीं तक हैं। 119 बनाने के प्रयास जारी हैं पर पुष्टि नहीं हुई। नेप्ट्यूनियम (93) से आगे लगभग सब मानव-निर्मित हैं।' },
      { q: 'परमाणु द्रव्यमान पूर्णांक क्यों नहीं होते?', a: 'एक ही तत्व अलग-अलग न्यूट्रॉन वाले समस्थानिकों के मिश्रण में मिलता है, और द्रव्यमान प्राकृतिक अनुपात का औसत होता है। जहाँ कोई स्थायी समस्थानिक नहीं, वहाँ सबसे लंबे समय टिकने वाले की द्रव्यमान संख्या दी गई है।' },
      { q: 'ये मान कहाँ से आए?', a: 'दर्ज सिर्फ़ परमाणु क्रमांक, प्रतीक और द्रव्यमान हैं। आवर्त, समूह, खंड, श्रेणी और इलेक्ट्रॉन विन्यास क्रमांक से गणना होते हैं, इसलिए तालिका की जगह और विवरण अलग नहीं हो सकते।' },
    ],
  ),

  elementFaq: T(
    (f: ElementFacts, name: string, category: string) => [
      { q: `${name}의 원자번호와 기호는?`, a: `원자번호 ${f.z}번이고 기호는 ${f.symbol}입니다. 원자량은 ${N('ko')(f.mass)}입니다.` },
      { q: `주기율표에서 어디에 있나요?`, a: f.group ? `${f.period}주기 ${f.group}족, ${category}입니다.` : `${f.period}주기이고, 표 아래로 빠지는 ${category}입니다.` },
      { q: `전자 배치는 어떻게 되나요?`, a: `${f.config} 입니다. 짧게 적으면 ${f.shortConfig} 입니다.` },
      { q: `중성자는 몇 개인가요?`, a: `원자량을 반올림한 값에서 원자번호를 빼면 ${f.neutrons}개입니다. 동위원소에 따라 달라집니다.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `What are ${name}'s number and symbol?`, a: `Element ${f.z}, symbol ${f.symbol}, atomic weight ${N('en')(f.mass)}.` },
      { q: `Where does it sit in the table?`, a: f.group ? `Period ${f.period}, group ${f.group} — a ${category.toLowerCase()}.` : `Period ${f.period}, among the ${category.toLowerCase()}s drawn below the table.` },
      { q: `What is its electron configuration?`, a: `${f.config}, or ${f.shortConfig} for short.` },
      { q: `How many neutrons does it have?`, a: `Rounding the atomic weight and subtracting the atomic number gives ${f.neutrons}. The exact count depends on the isotope.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `¿Cuál es el número y el símbolo del ${name}?`, a: `Elemento ${f.z}, símbolo ${f.symbol}, peso atómico ${N('es')(f.mass)}.` },
      { q: `¿Dónde está en la tabla?`, a: f.group ? `Periodo ${f.period}, grupo ${f.group}: un ${category.toLowerCase()}.` : `Periodo ${f.period}, entre los ${category.toLowerCase()}s dibujados bajo la tabla.` },
      { q: `¿Cuál es su configuración electrónica?`, a: `${f.config}, o ${f.shortConfig} en forma abreviada.` },
      { q: `¿Cuántos neutrones tiene?`, a: `Redondeando el peso atómico y restando el número atómico salen ${f.neutrons}. El valor exacto depende del isótopo.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `Qual é o número e o símbolo do ${name}?`, a: `Elemento ${f.z}, símbolo ${f.symbol}, peso atômico ${N('pt-BR')(f.mass)}.` },
      { q: `Onde fica na tabela?`, a: f.group ? `Período ${f.period}, grupo ${f.group}: um ${category.toLowerCase()}.` : `Período ${f.period}, entre os ${category.toLowerCase()}s desenhados abaixo da tabela.` },
      { q: `Qual é a sua configuração eletrônica?`, a: `${f.config}, ou ${f.shortConfig} na forma curta.` },
      { q: `Quantos nêutrons tem?`, a: `Arredondando o peso atômico e subtraindo o número atômico dá ${f.neutrons}. O valor exato depende do isótopo.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `${name}の原子番号と記号は。`, a: `原子番号${f.z}番、記号は${f.symbol}、原子量は${N('ja')(f.mass)}です。` },
      { q: `周期表のどこにありますか。`, a: f.group ? `第${f.period}周期第${f.group}族、${category}です。` : `第${f.period}周期で、表の下に出される${category}です。` },
      { q: `電子配置はどうなりますか。`, a: `${f.config} です。短く書くと ${f.shortConfig} です。` },
      { q: `中性子はいくつですか。`, a: `原子量を四捨五入して原子番号を引くと${f.neutrons}個です。同位体によって変わります。` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `Wie lauten Zahl und Symbol von ${name}?`, a: `Element ${f.z}, Symbol ${f.symbol}, Atomgewicht ${N('de')(f.mass)}.` },
      { q: `Wo steht es im System?`, a: f.group ? `Periode ${f.period}, Gruppe ${f.group} — ein ${category}.` : `Periode ${f.period}, unter den ${category}en unterhalb des Systems.` },
      { q: `Wie ist die Elektronenkonfiguration?`, a: `${f.config}, kurz ${f.shortConfig}.` },
      { q: `Wie viele Neutronen hat es?`, a: `Atomgewicht runden, Ordnungszahl abziehen: ${f.neutrons}. Genau hängt es vom Isotop ab.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `Quels sont le numéro et le symbole du ${name} ?`, a: `Élément ${f.z}, symbole ${f.symbol}, masse atomique ${N('fr')(f.mass)}.` },
      { q: `Où se place-t-il dans le tableau ?`, a: f.group ? `Période ${f.period}, groupe ${f.group} : un ${category.toLowerCase()}.` : `Période ${f.period}, parmi les ${category.toLowerCase()}s tracés sous le tableau.` },
      { q: `Quelle est sa configuration électronique ?`, a: `${f.config}, ou ${f.shortConfig} en abrégé.` },
      { q: `Combien de neutrons compte-t-il ?`, a: `En arrondissant la masse et en retirant le numéro, on obtient ${f.neutrons}. Le compte exact dépend de l’isotope.` },
    ],
    (f: ElementFacts, name: string, category: string) => [
      { q: `${name} का क्रमांक और प्रतीक क्या है?`, a: `तत्व क्रमांक ${f.z}, प्रतीक ${f.symbol}, परमाणु द्रव्यमान ${N('en')(f.mass)}।` },
      { q: `यह सारणी में कहाँ है?`, a: f.group ? `आवर्त ${f.period}, समूह ${f.group} — ${category}।` : `आवर्त ${f.period}, तालिका के नीचे दिखाए ${category} में।` },
      { q: `इसका इलेक्ट्रॉन विन्यास क्या है?`, a: `${f.config}, संक्षेप में ${f.shortConfig}।` },
      { q: `इसमें कितने न्यूट्रॉन हैं?`, a: `परमाणु द्रव्यमान को पूर्णांकित कर क्रमांक घटाने पर ${f.neutrons} मिलते हैं। सटीक संख्या समस्थानिक पर निर्भर है।` },
    ],
  ),
};

/** 항목별 여덟 언어 표를 언어별 한 벌로 뒤집는다 */
export const ELEMENT_UI: L8<ElementUI> = Object.fromEntries(
  LANG8_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L8<unknown>)[lang as Lang8]])),
  ]),
) as unknown as L8<ElementUI>;
