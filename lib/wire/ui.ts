/**
 * 전선 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 둘이다. AWG는 외울 표가 아니라 계산되는 수열이라는
 * 것, 그리고 굵기만으로는 아무 말도 못 한다는 것 — 같은 선도 흘리는 전류와
 * 보내는 거리에 따라 쓸 수 있는지가 갈린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { WireFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface WireUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  gaugeLabel: string;
  ampLabel: string;
  diaLabel: string;
  areaLabel: string;
  ohmLabel: string;
  safeLabel: string;
  dropLabel: string;
  heatLabel: string;
  reachLabel: string;
  twinLabel: string;
  fitsYes: string;
  fitsNo: string;
  knownName: (key: string) => string;
  systemName: (key: string) => string;
  awgTitle: string;
  awgNote: string;
  roundTitle: string;
  roundNote: string;
  heatTitle: string;
  heatNote: string;
  dropTitle: string;
  dropNote: string;
  twinTitle: string;
  twinNote: string;
  tableTitle: string;
  neighbourTitle: string;
  ampTitle: string;
  sizeTitle: string;
  desc: (f: WireFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: WireFacts) => string;
  metaDesc: (f: WireFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: WireFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** key → 이름 표를 함수로 — 모르는 열쇠는 그대로 돌려준다 */
const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

type Spec = { [K in keyof WireUI]: L<WireUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('전선 굵기', 'Wire gauge', 'Calibre de cable', 'Bitola de fio', '電線の太さ', 'Leitungsquerschnitt', 'Section de câble', 'तार की मोटाई', '导线线径', '導線線徑'),

  knownName: T<(key: string) => string>(
    pick({ signal: '신호선', lamp: '전등 배선', outlet: '일반 콘센트', kitchen: '주방·에어컨', lighting: '조명 회로', socket: '콘센트 회로' }),
    pick({ signal: 'signal wire', lamp: 'lamp cord', outlet: 'general outlets', kitchen: 'kitchen and air conditioning', lighting: 'lighting circuits', socket: 'socket circuits' }),
    pick({ signal: 'cable de señal', lamp: 'cable de lámpara', outlet: 'enchufes generales', kitchen: 'cocina y aire acondicionado', lighting: 'circuitos de luz', socket: 'circuitos de enchufes' }),
    pick({ signal: 'fio de sinal', lamp: 'fio de luminária', outlet: 'tomadas gerais', kitchen: 'cozinha e ar-condicionado', lighting: 'circuitos de iluminação', socket: 'circuitos de tomadas' }),
    pick({ signal: '信号線', lamp: '照明の配線', outlet: '一般コンセント', kitchen: '台所・エアコン', lighting: '照明回路', socket: 'コンセント回路' }),
    pick({ signal: 'Signalader', lamp: 'Lampenkabel', outlet: 'allgemeine Steckdosen', kitchen: 'Küche und Klimagerät', lighting: 'Lichtstromkreise', socket: 'Steckdosenkreise' }),
    pick({ signal: 'fil de signal', lamp: 'câble de lampe', outlet: 'prises générales', kitchen: 'cuisine et climatisation', lighting: 'circuits d’éclairage', socket: 'circuits de prises' }),
    pick({ signal: 'सिग्नल तार', lamp: 'लैंप तार', outlet: 'सामान्य सॉकेट', kitchen: 'रसोई और एसी', lighting: 'लाइटिंग सर्किट', socket: 'सॉकेट सर्किट' }),
    pick({ signal: '信号线', lamp: '灯具接线', outlet: '普通插座', kitchen: '厨房与空调', lighting: '照明回路', socket: '插座回路' }),
    pick({ signal: '訊號線', lamp: '燈具接線', outlet: '一般插座', kitchen: '廚房與冷氣', lighting: '照明迴路', socket: '插座迴路' }),
  ),

  systemName: T<(key: string) => string>(
    pick({ car: '자동차 12V', truck: '트럭 24V', us: '북미 120V', eu: '한국·유럽 230V' }),
    pick({ car: 'car 12 V', truck: 'truck 24 V', us: 'North America 120 V', eu: 'Europe 230 V' }),
    pick({ car: 'coche 12 V', truck: 'camión 24 V', us: 'Norteamérica 120 V', eu: 'Europa 230 V' }),
    pick({ car: 'carro 12 V', truck: 'caminhão 24 V', us: 'América do Norte 120 V', eu: 'Europa 230 V' }),
    pick({ car: '自動車 12V', truck: 'トラック 24V', us: '北米 120V', eu: '欧州 230V' }),
    pick({ car: 'Auto 12 V', truck: 'Lkw 24 V', us: 'Nordamerika 120 V', eu: 'Europa 230 V' }),
    pick({ car: 'voiture 12 V', truck: 'camion 24 V', us: 'Amérique du Nord 120 V', eu: 'Europe 230 V' }),
    pick({ car: 'कार 12 V', truck: 'ट्रक 24 V', us: 'उत्तर अमेरिका 120 V', eu: 'यूरोप 230 V' }),
    pick({ car: '汽车 12V', truck: '卡车 24V', us: '北美 120V', eu: '欧洲 230V' }),
    pick({ car: '汽車 12V', truck: '卡車 24V', us: '北美 120V', eu: '歐洲 230V' }),
  ),

  hubTitle: T(
    '전선 200칸 — AWG 12로 15A를 몇 미터까지',
    '200 wire runs — how far AWG 12 carries 15 A',
    '200 tramos de cable — hasta dónde lleva 15 A un AWG 12',
    '200 trechos de fio — até onde um AWG 12 leva 15 A',
    '電線200マス — AWG 12で15Aを何メートルまで',
    '200 Leitungen — wie weit AWG 12 15 A trägt',
    '200 tronçons de câble — jusqu’où un AWG 12 porte 15 A',
    '200 तार — AWG 12 पर 15 A कितनी दूर',
    '200 段导线 — AWG 12 能把 15A 送多远',
    '200 段導線 — AWG 12 能把 15A 送多遠',
  ),

  hubLead: T(
    '굵기 20가지와 전류 10가지가 만나는 칸마다 저항과 전압 강하, 3% 안에 드는 길이를 계산했습니다. AWG 번호는 외울 표가 아니라 지름이 계산되는 수열입니다.',
    'For every meeting of 20 gauges and 10 currents: the resistance, the voltage drop, and how far you can run before losing 3%. AWG numbers are not a table to memorise but a sequence whose diameter is calculated.',
    'Para cada cruce de 20 calibres y 10 corrientes: la resistencia, la caída de tensión y hasta dónde llega antes de perder el 3%. Los números AWG no son una tabla que memorizar sino una sucesión cuyo diámetro se calcula.',
    'Para cada cruzamento de 20 bitolas e 10 correntes: a resistência, a queda de tensão e até onde vai antes de perder 3%. Os números AWG não são uma tabela a decorar, mas uma sequência cujo diâmetro se calcula.',
    '太さ20通りと電流10通りが出会う各マスの抵抗、電圧降下、3%以内で届く長さを計算しました。AWG番号は覚える表ではなく、直径が計算で出る数列です。',
    'Für jede Begegnung von 20 Querschnitten und 10 Strömen: Widerstand, Spannungsfall und wie weit es reicht, bevor 3 % verloren gehen. AWG-Nummern sind keine Tabelle zum Auswendiglernen, sondern eine Folge, deren Durchmesser sich berechnet.',
    'Pour chaque croisement de 20 sections et 10 courants : la résistance, la chute de tension et la distance atteinte avant de perdre 3 %. Les numéros AWG ne sont pas un tableau à retenir mais une suite dont le diamètre se calcule.',
    '20 मोटाइयों और 10 धाराओं के हर मेल का प्रतिरोध, वोल्टेज ड्रॉप और 3% के भीतर कितनी दूर। AWG संख्याएँ रटने की तालिका नहीं, एक अनुक्रम हैं जिससे व्यास निकलता है।',
    '20 种线径与 10 种电流交汇的每一格都算出电阻、压降，以及在 3% 之内能走多远。AWG 编号不是要背的表，而是可以算出直径的数列。',
    '20 種線徑與 10 種電流交匯的每一格都算出電阻、壓降，以及在 3% 之內能走多遠。AWG 編號不是要背的表，而是可以算出直徑的數列。',
  ),

  gaugeLabel: T('굵기', 'Gauge', 'Calibre', 'Bitola', '太さ', 'Querschnitt', 'Section', 'मोटाई', '线径', '線徑'),
  ampLabel: T('흘리는 전류', 'Current carried', 'Corriente que circula', 'Corrente que passa', '流す電流', 'Fließender Strom', 'Courant transporté', 'बहने वाली धारा', '通过的电流', '通過的電流'),
  diaLabel: T('지름', 'Diameter', 'Diámetro', 'Diâmetro', '直径', 'Durchmesser', 'Diamètre', 'व्यास', '直径', '直徑'),
  areaLabel: T('단면적', 'Cross-section', 'Sección', 'Seção', '断面積', 'Querschnittsfläche', 'Section transversale', 'अनुप्रस्थ काट', '截面积', '截面積'),
  ohmLabel: T('1미터 저항', 'Resistance per metre', 'Resistencia por metro', 'Resistência por metro', '1メートルの抵抗', 'Widerstand je Meter', 'Résistance par mètre', 'प्रति मीटर प्रतिरोध', '每米电阻', '每米電阻'),
  safeLabel: T('무리 없는 전류', 'Current it handles', 'Corriente que aguanta', 'Corrente que suporta', '無理のない電流', 'Belastbarer Strom', 'Courant admissible', 'सुरक्षित धारा', '可承受电流', '可承受電流'),
  dropLabel: T('10미터 강하', 'Drop over 10 m', 'Caída en 10 m', 'Queda em 10 m', '10メートルの降下', 'Abfall auf 10 m', 'Chute sur 10 m', '10 मीटर पर ड्रॉप', '10 米压降', '10 公尺壓降'),
  heatLabel: T('1미터마다 열', 'Heat per metre', 'Calor por metro', 'Calor por metro', '1メートルあたりの熱', 'Wärme je Meter', 'Chaleur par mètre', 'प्रति मीटर गर्मी', '每米发热', '每米發熱'),
  reachLabel: T('3% 안에 드는 길이', 'Length within 3%', 'Longitud dentro del 3%', 'Comprimento dentro de 3%', '3%以内で届く長さ', 'Länge innerhalb 3 %', 'Longueur sous 3 %', '3% के भीतर लंबाई', '3% 之内的长度', '3% 之內的長度'),
  twinLabel: T('다른 계열의 짝', 'The match in the other family', 'El equivalente en la otra serie', 'O equivalente na outra série', 'もう一方の系列の相当品', 'Entsprechung in der anderen Reihe', 'Équivalent dans l’autre série', 'दूसरी श्रेणी में समकक्ष', '另一系列的对应', '另一系列的對應'),

  fitsYes: T('이 굵기로 됩니다', 'This gauge handles it', 'Este calibre lo aguanta', 'Esta bitola dá conta', 'この太さで足ります', 'Dieser Querschnitt trägt es', 'Cette section suffit', 'यह मोटाई पर्याप्त है', '这个线径够用', '這個線徑夠用'),
  fitsNo: T('더 굵은 선이 필요합니다', 'You need thicker wire', 'Hace falta un cable más grueso', 'É preciso um fio mais grosso', 'もっと太い線が要ります', 'Es braucht eine dickere Leitung', 'Il faut un câble plus gros', 'मोटा तार चाहिए', '需要更粗的线', '需要更粗的線'),

  awgTitle: T('AWG는 표가 아니라 수열입니다', 'AWG is a sequence, not a table', 'El AWG es una sucesión, no una tabla', 'AWG é uma sequência, não uma tabela', 'AWGは表ではなく数列です', 'AWG ist eine Folge, keine Tabelle', 'L’AWG est une suite, pas un tableau', 'AWG तालिका नहीं, अनुक्रम है', 'AWG 是数列，不是表', 'AWG 是數列，不是表'),

  awgNote: T(
    '36번을 0.127mm로 두고 0번까지 서른아홉 단계를 같은 비율로 늘린 것이 AWG입니다. 그래서 한 단계마다 지름이 92의 39제곱근배씩 굵어지고, 여섯 단계를 건너면 단면적이 네 배(정확히는 4.02배)가 됩니다. 번호가 커질수록 가늘어지는 것도 거꾸로 세었기 때문입니다.',
    'AWG pins number 36 at 0.127 mm and stretches thirty-nine equal steps up to number 0. Each step multiplies the diameter by the 39th root of 92, so jumping six steps quadruples the cross-section — 4.02 times, to be exact. The numbers shrink as the wire thickens because the count runs backwards.',
    'El AWG fija el número 36 en 0,127 mm y sube treinta y nueve pasos iguales hasta el 0. Cada paso multiplica el diámetro por la raíz 39 de 92, así que saltar seis pasos cuadruplica la sección: 4,02 veces exactamente. Los números bajan al engrosar el cable porque la cuenta va al revés.',
    'O AWG fixa o número 36 em 0,127 mm e sobe trinta e nove passos iguais até o 0. Cada passo multiplica o diâmetro pela raiz 39 de 92, então pular seis passos quadruplica a seção — 4,02 vezes, para ser exato. Os números caem conforme o fio engrossa porque a contagem corre ao contrário.',
    'AWGは36番を0.127mmと決め、0番まで39段階を同じ比率で伸ばしたものです。1段階ごとに直径が92の39乗根倍になるので、6段階飛ぶと断面積は4倍(正確には4.02倍)になります。番号が大きいほど細いのは逆から数えているからです。',
    'AWG legt Nummer 36 auf 0,127 mm fest und dehnt sie in neununddreißig gleichen Schritten bis Nummer 0. Jeder Schritt multipliziert den Durchmesser mit der 39. Wurzel aus 92, sechs Schritte vervierfachen also den Querschnitt — genau genommen um das 4,02-Fache. Die Zahlen sinken mit steigender Dicke, weil rückwärts gezählt wird.',
    'L’AWG fixe le numéro 36 à 0,127 mm et l’étire en trente-neuf pas égaux jusqu’au numéro 0. Chaque pas multiplie le diamètre par la racine 39e de 92 : sauter six pas quadruple donc la section — 4,02 fois exactement. Les numéros diminuent quand le fil grossit parce que le compte va à rebours.',
    'AWG संख्या 36 को 0.127 mm पर रखता है और 0 तक उनतालीस बराबर चरणों में फैलाता है। हर चरण व्यास को 92 के 39वें मूल से गुणा करता है, इसलिए छह चरण कूदने पर अनुप्रस्थ काट चार गुना (ठीक-ठीक 4.02 गुना) हो जाती है। तार मोटा होने पर संख्या घटती है क्योंकि गिनती उल्टी चलती है।',
    'AWG 把 36 号定为 0.127mm，再以相同比例分三十九级放大到 0 号。每一级直径乘以 92 的 39 次方根，所以跨六级截面积正好变四倍（准确说是 4.02 倍）。编号越大越细，是因为这个数是倒着数的。',
    'AWG 把 36 號定為 0.127mm，再以相同比例分三十九級放大到 0 號。每一級直徑乘以 92 的 39 次方根，所以跨六級截面積正好變四倍（準確說是 4.02 倍）。編號越大越細，是因為這個數是倒著數的。',
  ),

  roundTitle: T('전기는 갔다 돌아옵니다', 'Current goes out and comes back', 'La corriente va y vuelve', 'A corrente vai e volta', '電気は行って戻ります', 'Strom fließt hin und zurück', 'Le courant part et revient', 'बिजली जाती है और लौटती है', '电流去了还要回来', '電流去了還要回來'),

  roundNote: T(
    '전압 강하를 셀 때 선의 길이는 두 번 셉니다. 배터리에서 전구까지 10미터라면 전기가 지나는 구리는 20미터입니다. 이 한 가지를 빠뜨리면 답이 정확히 절반이 되고, 그만큼 가는 선을 골라도 된다고 잘못 판단하게 됩니다.',
    'When you count voltage drop, the run counts twice. Ten metres from battery to lamp means twenty metres of copper for the current to cross. Miss this and your answer is exactly half of the truth — and you will happily pick a wire half as thick as you need.',
    'Al contar la caída de tensión, el tramo cuenta dos veces. Diez metros de la batería a la lámpara son veinte metros de cobre que recorre la corriente. Si lo olvidas, tu resultado es exactamente la mitad y elegirás un cable la mitad de grueso de lo necesario.',
    'Ao contar a queda de tensão, o trecho conta duas vezes. Dez metros da bateria à lâmpada são vinte metros de cobre para a corrente atravessar. Esquecer isso deixa a resposta exatamente pela metade — e você escolherá um fio com metade da grossura necessária.',
    '電圧降下を数えるとき、線の長さは2回数えます。バッテリーから電球まで10メートルなら、電気が通る銅は20メートルです。これを落とすと答えはちょうど半分になり、半分の太さでよいと誤って判断してしまいます。',
    'Beim Spannungsfall zählt die Strecke doppelt. Zehn Meter von der Batterie zur Lampe bedeuten zwanzig Meter Kupfer für den Strom. Wer das vergisst, erhält genau die Hälfte — und wählt eine halb so dicke Leitung, wie er bräuchte.',
    'Pour la chute de tension, la longueur compte deux fois. Dix mètres de la batterie à la lampe, ce sont vingt mètres de cuivre à traverser. L’oublier donne exactement la moitié du résultat — et fait choisir un câble deux fois trop fin.',
    'वोल्टेज ड्रॉप गिनते समय लंबाई दो बार गिनी जाती है। बैटरी से बल्ब तक दस मीटर का मतलब है बीस मीटर तांबा। इसे भूलने पर उत्तर ठीक आधा आता है और आप ज़रूरत से आधी मोटाई का तार चुन बैठते हैं।',
    '算压降时，线长要数两遍。电池到灯泡十米，电流要走的铜就是二十米。漏掉这一点，答案正好只有一半，于是会挑一根细了一半的线。',
    '算壓降時，線長要數兩遍。電池到燈泡十公尺，電流要走的銅就是二十公尺。漏掉這一點，答案正好只有一半，於是會挑一根細了一半的線。',
  ),

  heatTitle: T('굵을수록 속이 식기 어렵습니다', 'Thicker wire cools worse inside', 'Cuanto más grueso, peor se enfría por dentro', 'Quanto mais grosso, pior esfria por dentro', '太いほど中は冷えにくい', 'Dicker heißt innen schlechter kühlen', 'Plus gros, plus difficile à refroidir', 'जितना मोटा, अंदर उतना कम ठंडा', '越粗，里面越难散热', '越粗，裡面越難散熱'),

  heatNote: T(
    '열은 단면적에 비례해 나지만 그 열을 버리는 것은 겉넓이입니다. 두 배 굵은 선이 두 배를 흘리지 못하는 것이 그래서입니다. 이 표의 "무리 없는 전류"는 단면적의 0.65제곱에 비례하는 어림으로, 절연이 60도까지 견디는 흔한 전선에 맞췄습니다 — 여유 있게 잡은 쪽이라 규정표보다 낮게 나옵니다.',
    'Heat is made in proportion to the cross-section, but it escapes through the surface. That is why a wire twice as thick does not carry twice the current. The figure here scales with area to the power 0.65, fitted to ordinary wire whose insulation tolerates 60 °C — a deliberately cautious basis, so it reads lower than published tables.',
    'El calor se genera en proporción a la sección, pero escapa por la superficie. Por eso un cable el doble de grueso no lleva el doble de corriente. La cifra de aquí crece con la sección elevada a 0,65, ajustada a cable común con aislamiento para 60 °C: una base prudente, así que queda por debajo de las tablas oficiales.',
    'O calor surge em proporção à seção, mas escapa pela superfície. Por isso um fio duas vezes mais grosso não leva o dobro da corrente. O número aqui cresce com a seção elevada a 0,65, ajustado a fio comum com isolação para 60 °C: uma base cautelosa, então fica abaixo das tabelas oficiais.',
    '熱は断面積に比例して出ますが、それを捨てるのは表面です。太さが2倍でも電流が2倍にならないのはそのためです。ここでの「無理のない電流」は断面積の0.65乗に比例する目安で、絶縁が60度まで耐える一般的な電線に合わせています。余裕を見た側なので規定表より低く出ます。',
    'Wärme entsteht proportional zum Querschnitt, abgegeben wird sie über die Oberfläche. Deshalb trägt eine doppelt so dicke Leitung nicht den doppelten Strom. Der Wert hier wächst mit der Fläche hoch 0,65 und ist auf übliche Leitungen mit 60-°C-Isolierung abgestimmt — bewusst vorsichtig, also niedriger als in Normtabellen.',
    'La chaleur naît proportionnellement à la section, mais s’évacue par la surface. C’est pourquoi un câble deux fois plus gros ne porte pas deux fois plus de courant. Le chiffre ici croît avec la section puissance 0,65, calé sur des câbles ordinaires dont l’isolant tient 60 °C — une base volontairement prudente, donc plus basse que les tableaux officiels.',
    'गर्मी अनुप्रस्थ काट के अनुपात में बनती है, पर निकलती सतह से है। इसीलिए दोगुना मोटा तार दोगुनी धारा नहीं ले जाता। यहाँ का आँकड़ा क्षेत्रफल की 0.65 घात के अनुपात में बढ़ता है और 60 °C तक सहने वाले सामान्य तार पर आधारित है — जान-बूझकर सुरक्षित, इसलिए मानक तालिकाओं से कम।',
    '发热与截面积成正比，散热却靠表面。所以粗一倍的线并不能过一倍的电流。这里的"可承受电流"按截面积的 0.65 次方增长，对应绝缘耐 60 度的普通导线——取的是保守一侧，因此低于规范表。',
    '發熱與截面積成正比，散熱卻靠表面。所以粗一倍的線並不能過一倍的電流。這裡的「可承受電流」按截面積的 0.65 次方增長，對應絕緣耐 60 度的普通導線——取的是保守一側，因此低於規範表。',
  ),

  dropTitle: T('전압이 낮을수록 아픕니다', 'The lower the voltage, the worse it hurts', 'Cuanto menor el voltaje, más duele', 'Quanto menor a tensão, mais dói', '電圧が低いほど痛い', 'Je niedriger die Spannung, desto schmerzhafter', 'Plus la tension est basse, plus ça fait mal', 'वोल्टेज जितना कम, उतना भारी', '电压越低越吃亏', '電壓越低越吃虧'),

  dropNote: T(
    '같은 0.36V가 사라져도 12V에서는 3%지만 230V에서는 0.16%입니다. 자동차 배선이 유난히 굵은 것도, 12V 조명을 길게 끌면 끝이 어두워지는 것도 이 때문입니다. 이 표에서는 3%를 넘지 않는 길이를 전압마다 따로 계산했습니다.',
    'Lose the same 0.36 V and it is 3% of a 12 V system but 0.16% of a 230 V one. That is why car wiring looks so thick, and why a long 12 V light run dims at the far end. This page works out the length that stays under 3% for each voltage separately.',
    'Perder los mismos 0,36 V es el 3% en un sistema de 12 V y el 0,16% en uno de 230 V. Por eso el cableado de coche es tan grueso y por eso una tirada larga de luz de 12 V se apaga al final. Aquí se calcula por separado la longitud que se mantiene bajo el 3% en cada voltaje.',
    'Perder os mesmos 0,36 V é 3% num sistema de 12 V e 0,16% num de 230 V. É por isso que a fiação de carro é tão grossa e que um trecho longo de luz 12 V escurece na ponta. Aqui se calcula separadamente o comprimento que fica abaixo de 3% em cada tensão.',
    '同じ0.36Vが失われても、12Vでは3%、230Vでは0.16%です。自動車の配線がやたら太いのも、12V照明を長く引くと先が暗くなるのもこのためです。この表では3%を超えない長さを電圧ごとに計算しています。',
    'Derselbe Verlust von 0,36 V sind 3 % bei 12 V, aber 0,16 % bei 230 V. Deshalb wirkt Autoverkabelung so dick und deshalb wird eine lange 12-V-Lichtleitung am Ende dunkel. Hier wird die Länge unter 3 % für jede Spannung getrennt berechnet.',
    'Perdre les mêmes 0,36 V, c’est 3 % en 12 V mais 0,16 % en 230 V. D’où des câbles de voiture si gros, et une longue ligne d’éclairage 12 V qui faiblit au bout. Cette page calcule séparément la longueur restant sous 3 % pour chaque tension.',
    'वही 0.36 V का नुकसान 12 V में 3% है पर 230 V में 0.16%। इसीलिए कार की वायरिंग इतनी मोटी होती है और लंबी 12 V लाइट लाइन का सिरा मंद पड़ जाता है। यहाँ हर वोल्टेज के लिए 3% के भीतर रहने वाली लंबाई अलग-अलग निकाली गई है।',
    '同样丢掉 0.36V，在 12V 系统里是 3%，在 230V 里只有 0.16%。汽车线束特别粗、12V 灯带拉长后末端会暗，都是这个道理。本页按每种电压分别算出不超过 3% 的长度。',
    '同樣丟掉 0.36V，在 12V 系統裡是 3%，在 230V 裡只有 0.16%。汽車線束特別粗、12V 燈帶拉長後末端會暗，都是這個道理。本頁按每種電壓分別算出不超過 3% 的長度。',
  ),

  twinTitle: T('두 계열이 섞여 쓰입니다', 'Two families in circulation', 'Dos series en circulación', 'Duas séries em circulação', '2つの系列が混ざっています', 'Zwei Reihen im Umlauf', 'Deux séries en circulation', 'दो श्रेणियाँ चलन में', '两种系列混着用', '兩種系列混著用'),

  twinNote: T(
    '미국은 AWG 번호로, 나머지는 단면적(mm²)으로 부릅니다. 서로 딱 맞는 짝은 없어서, 단면적이 가장 가까운 것을 함께 두었습니다. 갈아 끼울 때는 가는 쪽이 아니라 굵은 쪽으로 고르는 편이 안전합니다.',
    'The United States names wire by AWG number; most of the world names it by cross-section in mm². The two never line up exactly, so each page shows the nearest match by area. When substituting, err toward the thicker one.',
    'Estados Unidos nombra el cable por número AWG; casi todo el resto lo hace por sección en mm². Nunca coinciden exactamente, así que cada página muestra el más cercano por sección. Al sustituir, conviene inclinarse por el más grueso.',
    'Os Estados Unidos nomeiam o fio por número AWG; quase todo o resto usa a seção em mm². Nunca coincidem exatamente, então cada página mostra o mais próximo por área. Ao substituir, prefira o mais grosso.',
    'アメリカはAWG番号で、それ以外は断面積(mm²)で呼びます。ぴったり合う組は無いので、断面積が最も近いものを並べています。取り替えるときは細い方ではなく太い方を選ぶのが安全です。',
    'Die USA benennen Leitungen nach AWG-Nummer, der Rest der Welt nach Querschnitt in mm². Beide passen nie genau zusammen, daher zeigt jede Seite die nächstliegende Fläche. Beim Ersetzen lieber zur dickeren greifen.',
    'Les États-Unis désignent le fil par numéro AWG ; ailleurs, on parle de section en mm². Les deux ne coïncident jamais exactement : chaque page indique donc l’équivalent le plus proche en section. En cas de substitution, mieux vaut pencher vers le plus gros.',
    'अमेरिका तार को AWG संख्या से बुलाता है, बाकी दुनिया अनुप्रस्थ काट (mm²) से। दोनों कभी ठीक-ठीक मेल नहीं खाते, इसलिए हर पन्ना क्षेत्रफल में सबसे नज़दीकी दिखाता है। बदलते समय पतले नहीं, मोटे की ओर झुकें।',
    '美国按 AWG 编号称呼导线，其他地方按截面积（mm²）。两者从不完全对齐，所以每页都给出截面积最接近的一个。替换时宁可选粗的那一边。',
    '美國按 AWG 編號稱呼導線，其他地方按截面積（mm²）。兩者從不完全對齊，所以每頁都給出截面積最接近的一個。替換時寧可選粗的那一邊。',
  ),

  tableTitle: T('굵기와 전류로 찾기', 'Find it by gauge and current', 'Búscalo por calibre y corriente', 'Ache por bitola e corrente', '太さと電流から探す', 'Nach Querschnitt und Strom suchen', 'Chercher par section et courant', 'मोटाई और धारा से देखें', '按线径和电流查找', '按線徑和電流查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  ampTitle: T('같은 굵기, 다른 전류', 'Same gauge, other currents', 'Mismo calibre, otras corrientes', 'Mesma bitola, outras correntes', '同じ太さ、別の電流', 'Gleicher Querschnitt, andere Ströme', 'Même section, autres courants', 'वही मोटाई, दूसरी धाराएँ', '同一线径，不同电流', '同一線徑，不同電流'),
  sizeTitle: T('같은 전류, 다른 굵기', 'Same current, other gauges', 'Misma corriente, otros calibres', 'Mesma corrente, outras bitolas', '同じ電流、別の太さ', 'Gleicher Strom, andere Querschnitte', 'Même courant, autres sections', 'वही धारा, दूसरी मोटाइयाँ', '同一电流，不同线径', '同一電流，不同線徑'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '길이는 배터리에서 기기까지의 거리입니다. 갔다 오는 두 배는 이미 셈에 넣었습니다.',
      '구리 기준입니다. 알루미늄은 같은 굵기로 저항이 1.6배쯤 커집니다.',
      '"무리 없는 전류"는 여유를 둔 어림입니다. 실제 시공은 그 나라 규정표를 따릅니다.',
      '전선이 뜨거워지는 것과 끝이 어두워지는 것은 다른 문제입니다. 굵기는 둘 다 보고 고릅니다.',
    ],
    [
      'The length is the distance from source to device. The return trip is already counted.',
      'Figures are for copper. Aluminium of the same size has about 1.6 times the resistance.',
      'The "current it handles" is a cautious estimate. Real installations follow the local code table.',
      'A wire running hot and a lamp dimming at the far end are two different problems. Pick a gauge that answers both.',
    ],
    [
      'La longitud es la distancia de la fuente al aparato. El trayecto de vuelta ya está contado.',
      'Las cifras son para cobre. El aluminio del mismo grosor tiene alrededor de 1,6 veces la resistencia.',
      'La "corriente que aguanta" es una estimación prudente. Las instalaciones reales siguen la tabla normativa del país.',
      'Que el cable se caliente y que la lámpara se apague al final son problemas distintos. Elige un calibre que responda a ambos.',
    ],
    [
      'O comprimento é a distância da fonte ao aparelho. A volta já está contada.',
      'Os números são para cobre. O alumínio da mesma bitola tem cerca de 1,6 vez a resistência.',
      'A "corrente que suporta" é uma estimativa cautelosa. Instalações reais seguem a tabela normativa local.',
      'Fio esquentando e lâmpada escurecendo na ponta são problemas diferentes. Escolha uma bitola que resolva os dois.',
    ],
    [
      '長さは電源から機器までの距離です。行って戻る2倍はすでに計算に入っています。',
      '銅が前提です。アルミは同じ太さで抵抗が1.6倍ほどになります。',
      '「無理のない電流」は余裕を見た目安です。実際の施工はその国の規定表に従います。',
      '電線が熱くなることと先が暗くなることは別の問題です。太さは両方を見て選びます。',
    ],
    [
      'Die Länge ist der Weg von der Quelle zum Gerät. Der Rückweg steckt bereits in der Rechnung.',
      'Die Werte gelten für Kupfer. Aluminium gleichen Querschnitts hat etwa den 1,6-fachen Widerstand.',
      'Der "belastbare Strom" ist eine vorsichtige Schätzung. Reale Installationen folgen der Normtabelle des Landes.',
      'Eine heiße Leitung und eine am Ende dunkle Lampe sind zwei verschiedene Probleme. Der Querschnitt muss beide lösen.',
    ],
    [
      'La longueur est la distance de la source à l’appareil. Le trajet retour est déjà compté.',
      'Les chiffres valent pour le cuivre. L’aluminium de même section a environ 1,6 fois la résistance.',
      'Le "courant admissible" est une estimation prudente. Les installations réelles suivent la table normative du pays.',
      'Un câble qui chauffe et une lampe qui faiblit au bout sont deux problèmes distincts. La section doit répondre aux deux.',
    ],
    [
      'लंबाई स्रोत से उपकरण तक की दूरी है। वापसी का रास्ता पहले ही गिना जा चुका है।',
      'आँकड़े तांबे के लिए हैं। उसी मोटाई का एल्युमिनियम लगभग 1.6 गुना प्रतिरोध देता है।',
      '"सुरक्षित धारा" एक सतर्क अनुमान है। असली इंस्टॉलेशन देश की मानक तालिका मानती है।',
      'तार का गर्म होना और सिरे पर बल्ब का मंद पड़ना अलग समस्याएँ हैं। मोटाई दोनों देखकर चुनें।',
    ],
    [
      '长度是电源到设备的距离，来回的两倍已经算进去了。',
      '数值按铜计。同样粗细的铝，电阻大约是它的 1.6 倍。',
      '"可承受电流"是留有余量的估算，实际施工按所在地规范表来。',
      '线发烫和末端变暗是两回事，选线径要同时看这两点。',
    ],
    [
      '長度是電源到裝置的距離，來回的兩倍已經算進去了。',
      '數值按銅計。同樣粗細的鋁，電阻大約是它的 1.6 倍。',
      '「可承受電流」是留有餘量的估算，實際施工按當地規範表來。',
      '線發燙和末端變暗是兩回事，選線徑要同時看這兩點。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '전선 굵기 계산 — AWG·mm² 20가지 × 전류 10가지',
    'Wire gauge calculator — 20 sizes in AWG and mm² across 10 currents',
    'Calculadora de calibre — 20 tamaños en AWG y mm² con 10 corrientes',
    'Calculadora de bitola — 20 tamanhos em AWG e mm² com 10 correntes',
    '電線の太さ計算 — AWG・mm² 20通り×電流10通り',
    'Querschnitt berechnen — 20 Größen in AWG und mm², 10 Ströme',
    'Calcul de section — 20 tailles en AWG et mm², 10 courants',
    'तार मोटाई कैलकुलेटर — AWG और mm² में 20 आकार, 10 धाराएँ',
    '导线线径计算 — AWG 与 mm² 共 20 种 × 10 种电流',
    '導線線徑計算 — AWG 與 mm² 共 20 種 × 10 種電流',
  ),

  hubMetaDesc: T(
    'AWG 12로 15A를 보내면 10미터에 1.56V가 사라집니다. 굵기와 전류가 만나는 200칸마다 저항·강하·발열과 12V부터 230V까지 3% 안에 드는 길이를 계산했습니다.',
    'AWG 12 carrying 15 A loses 1.56 V over ten metres. For all 200 pairings of gauge and current: resistance, drop, heat, and how far you can run at 12 V through 230 V while staying under 3%.',
    'Un AWG 12 con 15 A pierde 1,56 V en diez metros. Para los 200 cruces de calibre y corriente: resistencia, caída, calor y hasta dónde llega de 12 V a 230 V sin pasar del 3%.',
    'Um AWG 12 com 15 A perde 1,56 V em dez metros. Para os 200 cruzamentos de bitola e corrente: resistência, queda, calor e até onde vai de 12 V a 230 V sem passar de 3%.',
    'AWG 12で15Aを流すと10メートルで1.56Vが失われます。太さと電流が出会う200マスごとの抵抗・降下・発熱と、12Vから230Vまで3%以内で届く長さを計算しました。',
    'AWG 12 mit 15 A verliert auf zehn Metern 1,56 V. Für alle 200 Kombinationen aus Querschnitt und Strom: Widerstand, Abfall, Wärme und die Reichweite von 12 V bis 230 V unter 3 %.',
    'Un AWG 12 parcouru par 15 A perd 1,56 V sur dix mètres. Pour les 200 croisements section × courant : résistance, chute, chaleur et portée de 12 V à 230 V en restant sous 3 %.',
    'AWG 12 पर 15 A दस मीटर में 1.56 V खो देता है। मोटाई और धारा के सभी 200 मेलों का प्रतिरोध, ड्रॉप, गर्मी और 12 V से 230 V तक 3% के भीतर दूरी।',
    'AWG 12 通 15A，十米就丢掉 1.56V。线径与电流交汇的 200 格，每格的电阻、压降、发热，以及 12V 到 230V 在 3% 之内能走多远。',
    'AWG 12 通 15A，十公尺就丟掉 1.56V。線徑與電流交匯的 200 格，每格的電阻、壓降、發熱，以及 12V 到 230V 在 3% 之內能走多遠。',
  ),

  desc: T<(f: WireFacts) => string>(
    f => `단면적 ${f.area}mm², 1미터에 ${f.ohmPerM}Ω입니다. ${f.cell.amp}A를 흘리면 10미터 왕복에 ${f.dropPer10m}V가 사라집니다.`,
    f => `${f.area} mm² of copper, ${f.ohmPerM} Ω per metre. Carrying ${f.cell.amp} A, a ten-metre run there and back loses ${f.dropPer10m} V.`,
    f => `${f.area} mm² de cobre, ${f.ohmPerM} Ω por metro. Con ${f.cell.amp} A, un tramo de diez metros ida y vuelta pierde ${f.dropPer10m} V.`,
    f => `${f.area} mm² de cobre, ${f.ohmPerM} Ω por metro. Com ${f.cell.amp} A, um trecho de dez metros ida e volta perde ${f.dropPer10m} V.`,
    f => `断面積${f.area}mm²、1メートルあたり${f.ohmPerM}Ωです。${f.cell.amp}Aを流すと10メートルの往復で${f.dropPer10m}Vが失われます。`,
    f => `${f.area} mm² Kupfer, ${f.ohmPerM} Ω je Meter. Bei ${f.cell.amp} A gehen auf zehn Metern hin und zurück ${f.dropPer10m} V verloren.`,
    f => `${f.area} mm² de cuivre, ${f.ohmPerM} Ω par mètre. Avec ${f.cell.amp} A, dix mètres aller-retour coûtent ${f.dropPer10m} V.`,
    f => `${f.area} mm² तांबा, ${f.ohmPerM} Ω प्रति मीटर। ${f.cell.amp} A बहने पर दस मीटर आने-जाने में ${f.dropPer10m} V चला जाता है।`,
    f => `截面积 ${f.area}mm²，每米 ${f.ohmPerM}Ω。通 ${f.cell.amp}A 时，十米来回丢掉 ${f.dropPer10m}V。`,
    f => `截面積 ${f.area}mm²，每公尺 ${f.ohmPerM}Ω。通 ${f.cell.amp}A 時，十公尺來回丟掉 ${f.dropPer10m}V。`,
  ),

  metaTitle: T<(f: WireFacts) => string>(
    f => `${f.label}로 ${f.cell.amp}A — 10미터에 ${f.dropPer10m}V`,
    f => `${f.label} carrying ${f.cell.amp} A — ${f.dropPer10m} V over 10 m`,
    f => `${f.label} con ${f.cell.amp} A — ${f.dropPer10m} V en 10 m`,
    f => `${f.label} com ${f.cell.amp} A — ${f.dropPer10m} V em 10 m`,
    f => `${f.label}で${f.cell.amp}A — 10メートルで${f.dropPer10m}V`,
    f => `${f.label} mit ${f.cell.amp} A — ${f.dropPer10m} V auf 10 m`,
    f => `${f.label} avec ${f.cell.amp} A — ${f.dropPer10m} V sur 10 m`,
    f => `${f.label} पर ${f.cell.amp} A — 10 मीटर में ${f.dropPer10m} V`,
    f => `${f.label} 通 ${f.cell.amp}A — 10 米 ${f.dropPer10m}V`,
    f => `${f.label} 通 ${f.cell.amp}A — 10 公尺 ${f.dropPer10m}V`,
  ),

  metaDesc: T<(f: WireFacts) => string>(
    f => `${f.label}(${f.area}mm²)로 ${f.cell.amp}A를 흘릴 때의 저항과 전압 강하입니다. 230V에서는 ${f.reach[3].metres}미터, 12V에서는 ${f.reach[0].metres}미터까지 3% 안에 듭니다.`,
    f => `Resistance and voltage drop for ${f.label} (${f.area} mm²) carrying ${f.cell.amp} A. It stays under 3% for ${f.reach[3].metres} m at 230 V, or ${f.reach[0].metres} m at 12 V.`,
    f => `Resistencia y caída de tensión de ${f.label} (${f.area} mm²) con ${f.cell.amp} A. Se mantiene bajo el 3% hasta ${f.reach[3].metres} m a 230 V, o ${f.reach[0].metres} m a 12 V.`,
    f => `Resistência e queda de tensão de ${f.label} (${f.area} mm²) com ${f.cell.amp} A. Fica abaixo de 3% até ${f.reach[3].metres} m a 230 V, ou ${f.reach[0].metres} m a 12 V.`,
    f => `${f.label}(${f.area}mm²)に${f.cell.amp}Aを流したときの抵抗と電圧降下です。230Vなら${f.reach[3].metres}メートル、12Vなら${f.reach[0].metres}メートルまで3%以内です。`,
    f => `Widerstand und Spannungsfall für ${f.label} (${f.area} mm²) bei ${f.cell.amp} A. Unter 3 % bleibt es bis ${f.reach[3].metres} m bei 230 V oder ${f.reach[0].metres} m bei 12 V.`,
    f => `Résistance et chute de tension pour ${f.label} (${f.area} mm²) avec ${f.cell.amp} A. On reste sous 3 % jusqu’à ${f.reach[3].metres} m en 230 V, ou ${f.reach[0].metres} m en 12 V.`,
    f => `${f.label} (${f.area} mm²) पर ${f.cell.amp} A का प्रतिरोध और वोल्टेज ड्रॉप। 230 V पर ${f.reach[3].metres} मीटर और 12 V पर ${f.reach[0].metres} मीटर तक 3% के भीतर रहता है।`,
    f => `${f.label}（${f.area}mm²）通 ${f.cell.amp}A 时的电阻与压降。230V 下可走 ${f.reach[3].metres} 米，12V 下 ${f.reach[0].metres} 米，都在 3% 之内。`,
    f => `${f.label}（${f.area}mm²）通 ${f.cell.amp}A 時的電阻與壓降。230V 下可走 ${f.reach[3].metres} 公尺，12V 下 ${f.reach[0].metres} 公尺，都在 3% 之內。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: 'AWG 번호는 왜 커질수록 가늘어지나요?', a: '가는 쪽에서부터 세었기 때문입니다. 36번 0.127mm를 시작으로 0번까지 서른아홉 단계를 같은 비율로 굵혀 갑니다.' },
      { q: 'AWG 12는 몇 mm²인가요?', a: '3.31mm²입니다. 지름은 2.053mm이고, 표를 찾지 않아도 0.127×92^((36−12)/39)로 나옵니다.' },
      { q: '전압 강하를 계산할 때 길이를 두 배로 하나요?', a: '그렇습니다. 전기는 갔다 돌아오므로 10미터 떨어진 기기까지 구리는 20미터입니다. 이걸 빠뜨리면 답이 절반이 됩니다.' },
      { q: '3%는 어디서 나온 기준인가요?', a: '널리 쓰이는 설계 관행입니다. 그 안이면 전등이 눈에 띄게 어두워지거나 모터가 힘을 잃지 않습니다.' },
      { q: '왜 자동차 배선은 그렇게 굵나요?', a: '12V라서 그렇습니다. 같은 0.36V가 사라져도 230V에서는 0.16%지만 12V에서는 3%입니다.' },
    ],
    [
      { q: 'Why do bigger AWG numbers mean thinner wire?', a: 'Because the count starts at the thin end. Number 36 is 0.127 mm, and thirty-nine equal steps thicken it up to number 0.' },
      { q: 'How many mm² is AWG 12?', a: '3.31 mm², from a diameter of 2.053 mm. No table needed: 0.127 × 92^((36−12)/39) gives it.' },
      { q: 'Do I double the length when computing voltage drop?', a: 'Yes. Current goes out and comes back, so a device ten metres away sits at the end of twenty metres of copper. Skip this and your answer is half.' },
      { q: 'Where does the 3% figure come from?', a: 'It is common design practice. Stay under it and lamps do not visibly dim and motors do not lose their pull.' },
      { q: 'Why is car wiring so thick?', a: 'Because it is 12 V. Losing the same 0.36 V is 0.16% at 230 V but a full 3% at 12 V.' },
    ],
    [
      { q: '¿Por qué un número AWG mayor significa cable más fino?', a: 'Porque la cuenta empieza por el extremo fino. El número 36 mide 0,127 mm y treinta y nueve pasos iguales lo engrosan hasta el 0.' },
      { q: '¿Cuántos mm² son un AWG 12?', a: '3,31 mm², con 2,053 mm de diámetro. No hace falta tabla: 0,127 × 92^((36−12)/39) lo da.' },
      { q: '¿Hay que duplicar la longitud al calcular la caída?', a: 'Sí. La corriente va y vuelve, así que un aparato a diez metros está al final de veinte metros de cobre. Si lo omites, el resultado es la mitad.' },
      { q: '¿De dónde sale el 3%?', a: 'Es una práctica de diseño extendida. Por debajo de ese valor las lámparas no se apagan a ojo y los motores no pierden fuerza.' },
      { q: '¿Por qué el cableado de coche es tan grueso?', a: 'Porque son 12 V. Perder los mismos 0,36 V es el 0,16% a 230 V pero un 3% entero a 12 V.' },
    ],
    [
      { q: 'Por que um número AWG maior significa fio mais fino?', a: 'Porque a contagem começa pela ponta fina. O número 36 mede 0,127 mm e trinta e nove passos iguais o engrossam até o 0.' },
      { q: 'Quantos mm² tem um AWG 12?', a: '3,31 mm², com 2,053 mm de diâmetro. Sem tabela: 0,127 × 92^((36−12)/39) já dá.' },
      { q: 'Preciso dobrar o comprimento ao calcular a queda?', a: 'Sim. A corrente vai e volta, então um aparelho a dez metros está no fim de vinte metros de cobre. Sem isso, o resultado fica pela metade.' },
      { q: 'De onde vem o número 3%?', a: 'É prática de projeto difundida. Abaixo disso, lâmpadas não escurecem visivelmente e motores não perdem força.' },
      { q: 'Por que a fiação de carro é tão grossa?', a: 'Porque é 12 V. Perder os mesmos 0,36 V é 0,16% em 230 V mas 3% inteiros em 12 V.' },
    ],
    [
      { q: 'AWG番号はなぜ大きいほど細いのですか？', a: '細い側から数えているからです。36番の0.127mmを起点に、0番まで39段階を同じ比率で太くしていきます。' },
      { q: 'AWG 12は何mm²ですか？', a: '3.31mm²です。直径は2.053mmで、表を引かなくても0.127×92^((36−12)/39)で出ます。' },
      { q: '電圧降下の計算で長さを2倍にしますか？', a: 'します。電気は行って戻るので、10メートル先の機器までは銅が20メートルです。落とすと答えが半分になります。' },
      { q: '3%という基準はどこから来ましたか？', a: '広く使われる設計の慣行です。この中なら照明が目に見えて暗くなったり、モーターが力を失ったりしません。' },
      { q: '自動車の配線はなぜあんなに太いのですか？', a: '12Vだからです。同じ0.36Vが失われても230Vでは0.16%、12Vでは3%になります。' },
    ],
    [
      { q: 'Warum bedeutet eine höhere AWG-Nummer dünneren Draht?', a: 'Weil vom dünnen Ende gezählt wird. Nummer 36 misst 0,127 mm, und neununddreißig gleiche Schritte machen daraus Nummer 0.' },
      { q: 'Wie viel mm² hat AWG 12?', a: '3,31 mm² bei 2,053 mm Durchmesser. Ohne Tabelle: 0,127 × 92^((36−12)/39).' },
      { q: 'Muss ich die Länge beim Spannungsfall verdoppeln?', a: 'Ja. Der Strom fließt hin und zurück, ein Gerät in zehn Metern hängt am Ende von zwanzig Metern Kupfer. Ohne das ist die Antwort halb so groß.' },
      { q: 'Woher kommen die 3 %?', a: 'Aus verbreiteter Planungspraxis. Darunter werden Lampen nicht sichtbar dunkler und Motoren verlieren keine Kraft.' },
      { q: 'Warum ist Autoverkabelung so dick?', a: 'Weil es 12 V sind. Derselbe Verlust von 0,36 V macht bei 230 V 0,16 % aus, bei 12 V volle 3 %.' },
    ],
    [
      { q: 'Pourquoi un numéro AWG plus grand désigne-t-il un fil plus fin ?', a: 'Parce que le compte part du côté fin. Le numéro 36 fait 0,127 mm, et trente-neuf pas égaux l’épaississent jusqu’au numéro 0.' },
      { q: 'Combien de mm² fait un AWG 12 ?', a: '3,31 mm², pour un diamètre de 2,053 mm. Sans tableau : 0,127 × 92^((36−12)/39).' },
      { q: 'Faut-il doubler la longueur pour la chute de tension ?', a: 'Oui. Le courant part et revient : un appareil à dix mètres est au bout de vingt mètres de cuivre. Sans cela, le résultat est divisé par deux.' },
      { q: 'D’où vient le seuil de 3 % ?', a: 'D’une pratique de conception répandue. En dessous, les lampes ne faiblissent pas visiblement et les moteurs gardent leur force.' },
      { q: 'Pourquoi les câbles de voiture sont-ils si gros ?', a: 'Parce qu’on est en 12 V. Perdre les mêmes 0,36 V représente 0,16 % en 230 V mais 3 % pleins en 12 V.' },
    ],
    [
      { q: 'AWG संख्या बड़ी होने पर तार पतला क्यों?', a: 'क्योंकि गिनती पतले सिरे से शुरू होती है। संख्या 36 यानी 0.127 mm, और उनतालीस बराबर चरणों में यह 0 तक मोटा होता है।' },
      { q: 'AWG 12 कितने mm² का है?', a: '3.31 mm², व्यास 2.053 mm। तालिका की ज़रूरत नहीं: 0.127 × 92^((36−12)/39) से निकल आता है।' },
      { q: 'क्या वोल्टेज ड्रॉप में लंबाई दोगुनी करनी होती है?', a: 'हाँ। बिजली जाती है और लौटती है, इसलिए दस मीटर दूर का उपकरण बीस मीटर तांबे के छोर पर है। इसे छोड़ने पर उत्तर आधा रह जाता है।' },
      { q: '3% का पैमाना कहाँ से आया?', a: 'यह प्रचलित डिज़ाइन प्रथा है। इसके भीतर रहने पर बल्ब साफ़ तौर पर मंद नहीं पड़ते और मोटर की ताक़त नहीं घटती।' },
      { q: 'कार की वायरिंग इतनी मोटी क्यों होती है?', a: 'क्योंकि वह 12 V है। वही 0.36 V का नुकसान 230 V पर 0.16% है पर 12 V पर पूरे 3%।' },
    ],
    [
      { q: 'AWG 号数越大为什么线越细？', a: '因为是从细的一端开始数的。36 号是 0.127mm，再以相同比例分三十九级加粗到 0 号。' },
      { q: 'AWG 12 是多少 mm²？', a: '3.31mm²，直径 2.053mm。不用查表：0.127 × 92^((36−12)/39) 就能算出。' },
      { q: '算压降时要把长度乘二吗？', a: '要。电流去了还要回来，十米外的设备其实挂在二十米铜线的末端。漏掉这一步，答案就只有一半。' },
      { q: '3% 这个门槛是哪来的？', a: '是通行的设计惯例。在这个范围内，灯不会明显变暗，电机也不会掉力。' },
      { q: '汽车线束为什么那么粗？', a: '因为是 12V。同样丢掉 0.36V，在 230V 只占 0.16%，在 12V 却是整整 3%。' },
    ],
    [
      { q: 'AWG 號數越大為什麼線越細？', a: '因為是從細的一端開始數的。36 號是 0.127mm，再以相同比例分三十九級加粗到 0 號。' },
      { q: 'AWG 12 是多少 mm²？', a: '3.31mm²，直徑 2.053mm。不用查表：0.127 × 92^((36−12)/39) 就能算出。' },
      { q: '算壓降時要把長度乘二嗎？', a: '要。電流去了還要回來，十公尺外的裝置其實掛在二十公尺銅線的末端。漏掉這一步，答案就只有一半。' },
      { q: '3% 這個門檻是哪來的？', a: '是通行的設計慣例。在這個範圍內，燈不會明顯變暗，馬達也不會掉力。' },
      { q: '汽車線束為什麼那麼粗？', a: '因為是 12V。同樣丟掉 0.36V，在 230V 只佔 0.16%，在 12V 卻是整整 3%。' },
    ],
  ),

  cellFaq: T<(f: WireFacts) => FaqItem[]>(
    f => [
      { q: `${f.label}로 ${f.cell.amp}A를 흘려도 되나요?`, a: `${f.fits ? `됩니다. 이 굵기는 ${f.safeAmp}A까지 무리 없습니다.` : `무리입니다. 이 굵기는 ${f.safeAmp}A까지이므로 더 굵은 선을 쓰십시오.`}` },
      { q: `몇 미터까지 끌 수 있나요?`, a: `230V에서는 ${f.reach[3].metres}미터, 120V에서는 ${f.reach[2].metres}미터, 12V에서는 ${f.reach[0].metres}미터까지 강하가 3% 안에 듭니다.` },
      { q: `${f.label}는 몇 mm²인가요?`, a: `${f.area}mm²이고 지름은 ${f.dia}mm입니다. 다른 계열에서 가장 가까운 것은 ${f.twin?.label}입니다.` },
      { q: `전선이 얼마나 뜨거워지나요?`, a: `1미터마다 ${f.heatPerM}W가 열이 됩니다. 10미터면 ${(f.heatPerM * 10).toFixed(1)}W짜리 난방을 켠 셈입니다.` },
    ],
    f => [
      { q: `Can ${f.label} carry ${f.cell.amp} A?`, a: `${f.fits ? `Yes. This gauge is comfortable up to ${f.safeAmp} A.` : `No. This gauge tops out around ${f.safeAmp} A, so step up to something thicker.`}` },
      { q: `How far can I run it?`, a: `The drop stays under 3% for ${f.reach[3].metres} m at 230 V, ${f.reach[2].metres} m at 120 V, or ${f.reach[0].metres} m at 12 V.` },
      { q: `How many mm² is ${f.label}?`, a: `${f.area} mm², from a diameter of ${f.dia} mm. The nearest size in the other family is ${f.twin?.label}.` },
      { q: `How hot does the wire get?`, a: `Every metre turns ${f.heatPerM} W into heat. Over ten metres that is a ${(f.heatPerM * 10).toFixed(1)} W heater left running.` },
    ],
    f => [
      { q: `¿Puede ${f.label} llevar ${f.cell.amp} A?`, a: `${f.fits ? `Sí. Este calibre va cómodo hasta ${f.safeAmp} A.` : `No. Este calibre llega a unos ${f.safeAmp} A, así que usa uno más grueso.`}` },
      { q: `¿Hasta cuántos metros puedo tirarlo?`, a: `La caída se mantiene bajo el 3% hasta ${f.reach[3].metres} m a 230 V, ${f.reach[2].metres} m a 120 V o ${f.reach[0].metres} m a 12 V.` },
      { q: `¿Cuántos mm² son ${f.label}?`, a: `${f.area} mm², con ${f.dia} mm de diámetro. Lo más cercano en la otra serie es ${f.twin?.label}.` },
      { q: `¿Cuánto se calienta el cable?`, a: `Cada metro convierte ${f.heatPerM} W en calor. En diez metros es como dejar encendida una estufa de ${(f.heatPerM * 10).toFixed(1)} W.` },
    ],
    f => [
      { q: `${f.label} pode levar ${f.cell.amp} A?`, a: `${f.fits ? `Pode. Esta bitola fica confortável até ${f.safeAmp} A.` : `Não. Esta bitola vai até cerca de ${f.safeAmp} A, então use uma mais grossa.`}` },
      { q: `Até quantos metros posso puxar?`, a: `A queda fica abaixo de 3% até ${f.reach[3].metres} m a 230 V, ${f.reach[2].metres} m a 120 V ou ${f.reach[0].metres} m a 12 V.` },
      { q: `Quantos mm² tem ${f.label}?`, a: `${f.area} mm², com ${f.dia} mm de diâmetro. O mais próximo na outra série é ${f.twin?.label}.` },
      { q: `Quanto o fio esquenta?`, a: `Cada metro transforma ${f.heatPerM} W em calor. Em dez metros é como deixar ligado um aquecedor de ${(f.heatPerM * 10).toFixed(1)} W.` },
    ],
    f => [
      { q: `${f.label}に${f.cell.amp}Aを流してもよいですか？`, a: `${f.fits ? `大丈夫です。この太さは${f.safeAmp}Aまで無理がありません。` : `無理です。この太さは${f.safeAmp}Aまでなので、もっと太い線を使ってください。`}` },
      { q: `何メートルまで引けますか？`, a: `230Vなら${f.reach[3].metres}メートル、120Vなら${f.reach[2].metres}メートル、12Vなら${f.reach[0].metres}メートルまで降下が3%以内です。` },
      { q: `${f.label}は何mm²ですか？`, a: `${f.area}mm²、直径は${f.dia}mmです。もう一方の系列で最も近いのは${f.twin?.label}です。` },
      { q: `電線はどれくらい熱くなりますか？`, a: `1メートルごとに${f.heatPerM}Wが熱になります。10メートルなら${(f.heatPerM * 10).toFixed(1)}Wの暖房をつけっぱなしにしているのと同じです。` },
    ],
    f => [
      { q: `Darf ${f.label} ${f.cell.amp} A führen?`, a: `${f.fits ? `Ja. Dieser Querschnitt ist bis ${f.safeAmp} A entspannt.` : `Nein. Dieser Querschnitt endet bei etwa ${f.safeAmp} A — nimm eine dickere Leitung.`}` },
      { q: `Wie weit darf die Leitung sein?`, a: `Unter 3 % bleibt der Abfall bis ${f.reach[3].metres} m bei 230 V, ${f.reach[2].metres} m bei 120 V oder ${f.reach[0].metres} m bei 12 V.` },
      { q: `Wie viel mm² hat ${f.label}?`, a: `${f.area} mm² bei ${f.dia} mm Durchmesser. Am nächsten liegt in der anderen Reihe ${f.twin?.label}.` },
      { q: `Wie warm wird die Leitung?`, a: `Jeder Meter macht ${f.heatPerM} W zu Wärme. Auf zehn Metern läuft damit ein ${(f.heatPerM * 10).toFixed(1)}-W-Heizkörper mit.` },
    ],
    f => [
      { q: `${f.label} peut-il porter ${f.cell.amp} A ?`, a: `${f.fits ? `Oui. Cette section est à l’aise jusqu’à ${f.safeAmp} A.` : `Non. Cette section plafonne vers ${f.safeAmp} A : prenez plus gros.`}` },
      { q: `Sur quelle longueur puis-je tirer ?`, a: `La chute reste sous 3 % jusqu’à ${f.reach[3].metres} m en 230 V, ${f.reach[2].metres} m en 120 V ou ${f.reach[0].metres} m en 12 V.` },
      { q: `Combien de mm² fait ${f.label} ?`, a: `${f.area} mm², pour un diamètre de ${f.dia} mm. Le plus proche dans l’autre série est ${f.twin?.label}.` },
      { q: `À quel point le câble chauffe-t-il ?`, a: `Chaque mètre transforme ${f.heatPerM} W en chaleur. Sur dix mètres, cela revient à laisser tourner un radiateur de ${(f.heatPerM * 10).toFixed(1)} W.` },
    ],
    f => [
      { q: `क्या ${f.label} पर ${f.cell.amp} A चल सकता है?`, a: `${f.fits ? `हाँ। यह मोटाई ${f.safeAmp} A तक आराम से चलती है।` : `नहीं। यह मोटाई लगभग ${f.safeAmp} A तक ही है, मोटा तार लें।`}` },
      { q: `कितनी दूर तक ले जा सकते हैं?`, a: `230 V पर ${f.reach[3].metres} मीटर, 120 V पर ${f.reach[2].metres} मीटर और 12 V पर ${f.reach[0].metres} मीटर तक ड्रॉप 3% के भीतर रहता है।` },
      { q: `${f.label} कितने mm² का है?`, a: `${f.area} mm², व्यास ${f.dia} mm। दूसरी श्रेणी में सबसे नज़दीक ${f.twin?.label} है।` },
      { q: `तार कितना गर्म होता है?`, a: `हर मीटर ${f.heatPerM} W को गर्मी में बदलता है। दस मीटर में यह ${(f.heatPerM * 10).toFixed(1)} W का हीटर चालू रखने जैसा है।` },
    ],
    f => [
      { q: `${f.label} 能通 ${f.cell.amp}A 吗？`, a: `${f.fits ? `可以。这个线径到 ${f.safeAmp}A 都不吃力。` : `不行。这个线径大约到 ${f.safeAmp}A 为止，请换更粗的线。`}` },
      { q: `能拉多远？`, a: `230V 下 ${f.reach[3].metres} 米、120V 下 ${f.reach[2].metres} 米、12V 下 ${f.reach[0].metres} 米，压降都在 3% 之内。` },
      { q: `${f.label} 是多少 mm²？`, a: `${f.area}mm²，直径 ${f.dia}mm。另一系列里最接近的是 ${f.twin?.label}。` },
      { q: `线会烫到什么程度？`, a: `每米有 ${f.heatPerM}W 变成热。十米就相当于开着一台 ${(f.heatPerM * 10).toFixed(1)}W 的取暖器。` },
    ],
    f => [
      { q: `${f.label} 能通 ${f.cell.amp}A 嗎？`, a: `${f.fits ? `可以。這個線徑到 ${f.safeAmp}A 都不吃力。` : `不行。這個線徑大約到 ${f.safeAmp}A 為止，請換更粗的線。`}` },
      { q: `能拉多遠？`, a: `230V 下 ${f.reach[3].metres} 公尺、120V 下 ${f.reach[2].metres} 公尺、12V 下 ${f.reach[0].metres} 公尺，壓降都在 3% 之內。` },
      { q: `${f.label} 是多少 mm²？`, a: `${f.area}mm²，直徑 ${f.dia}mm。另一系列裡最接近的是 ${f.twin?.label}。` },
      { q: `線會燙到什麼程度？`, a: `每公尺有 ${f.heatPerM}W 變成熱。十公尺就相當於開著一台 ${(f.heatPerM * 10).toFixed(1)}W 的暖爐。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const WIRE_UI: L<WireUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<WireUI>;
