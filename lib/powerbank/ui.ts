/**
 * 보조배터리 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PowerFacts, Verdict } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PowerUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  voltName: (key: string) => string;
  verdictName: (v: Verdict) => string;
  mahLabel: string;
  voltLabel: string;
  whLabel: string;
  usbLabel: string;
  verdictLabel: string;
  headroomLabel: string;
  maxFreeLabel: string;
  whyTitle: string;
  whyNote: string;
  ruleTitle: string;
  ruleNote: string;
  usbTitle: string;
  usbNote: string;
  packTitle: string;
  packNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  voltRowTitle: string;
  capRowTitle: string;
  desc: (f: PowerFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PowerFacts) => string;
  metaDesc: (f: PowerFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: PowerFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 전압 이름은 숫자라 어느 언어에서나 같다 */
const VOLT: Record<string, string> = {
  '3v6': '3.6 V', '3v7': '3.7 V', '3v85': '3.85 V', '5v': '5 V (USB)', '11v1': '11.1 V',
};
const voltName = (k: string) => VOLT[k] ?? k;

const verd = (free: string, approval: string, banned: string) => (v: Verdict) =>
  ({ free, approval, banned })[v];

type Spec = { [K in keyof PowerUI]: L<PowerUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('보조배터리 반입', 'Power banks on planes', 'Baterías externas en avión', 'Baterias externas em voo', 'モバイルバッテリーの持ち込み', 'Powerbanks im Flugzeug', 'Batteries externes en avion', 'विमान में पावर बैंक', '登机充电宝', '登機行動電源'),

  hubTitle: T(
    '보조배터리 100칸 — 기내 반입은 mAh가 아니라 Wh로 정해집니다',
    '100 power bank cells — planes count watt-hours, not milliamp-hours',
    '100 baterías externas — en el avión cuentan los vatios-hora, no los mAh',
    '100 baterias externas — no avião contam os watts-hora, não os mAh',
    'モバイルバッテリー100マス — 機内持ち込みはmAhではなくWhで決まります',
    '100 Powerbank-Felder — im Flugzeug zählen Wattstunden, nicht Milliamperestunden',
    '100 batteries externes — en avion, ce sont les wattheures qui comptent',
    '100 पावर बैंक खाने — विमान में mAh नहीं, वाट-घंटा गिना जाता है',
    '100 格充电宝 — 登机看的是瓦时，不是毫安时',
    '100 格行動電源 — 登機看的是瓦時，不是毫安時',
  ),

  hubLead: T(
    '제품에 크게 적힌 것은 mAh인데 규정은 Wh를 봅니다. 같은 20,000mAh라도 3.7V 팩이면 74Wh로 자유롭게 타지만, 11.1V 팩이면 222Wh라 아예 못 탑니다. 용량 스무 가지와 전압 다섯 가지가 만나는 칸마다 계산해 두었습니다.',
    'The number printed on the case is milliamp-hours; the rule is written in watt-hours. The same 20,000 mAh is 74 Wh in a 3.7 V pack and flies freely, but 222 Wh in an 11.1 V pack and cannot board at all. Every meeting of 20 capacities and 5 voltages is worked out here.',
    'En la carcasa va escrito el mAh; la norma habla de vatios-hora. Los mismos 20.000 mAh son 74 Wh en un pack de 3,7 V y vuelan sin trámite, pero 222 Wh en uno de 11,1 V y no embarcan. Cada cruce de 20 capacidades y 5 tensiones está calculado.',
    'Na carcaça vem escrito o mAh; a norma fala em watts-hora. Os mesmos 20.000 mAh são 74 Wh num pacote de 3,7 V e voam sem trâmite, mas 222 Wh num de 11,1 V e não embarcam. Cada cruzamento de 20 capacidades e 5 tensões está calculado.',
    '製品に大きく書いてあるのはmAhですが、規定はWhを見ます。同じ20,000mAhでも3.7Vのパックなら74Whで自由に持ち込め、11.1Vのパックなら222Whでまったく乗せられません。容量20通りと電圧5通りが出会う各マスを計算しました。',
    'Auf dem Gehäuse steht Milliamperestunden, in der Vorschrift stehen Wattstunden. Dieselben 20.000 mAh sind 74 Wh in einem 3,7-V-Pack und dürfen frei mit, aber 222 Wh in einem 11,1-V-Pack und dürfen gar nicht an Bord. Jede Begegnung von 20 Kapazitäten und 5 Spannungen ist gerechnet.',
    'Sur le boîtier figurent des milliampères-heures ; la règle parle en wattheures. Les mêmes 20 000 mAh font 74 Wh dans un pack 3,7 V et passent librement, mais 222 Wh dans un pack 11,1 V et ne montent pas du tout. Chaque croisement de 20 capacités et 5 tensions est calculé.',
    'डिब्बे पर mAh लिखा होता है, पर नियम वाट-घंटा देखता है। वही 20,000 mAh 3.7 V पैक में 74 Wh है और बिना रोक-टोक उड़ता है, पर 11.1 V पैक में 222 Wh होकर बिल्कुल नहीं जा सकता। 20 क्षमताओं और 5 वोल्टेजों के हर मेल की गणना यहाँ है।',
    '机身上印的是毫安时，规定看的却是瓦时。同样 20,000mAh，3.7V 的是 74Wh 可以随便带，11.1V 的就是 222Wh，根本不能上机。20 种容量与 5 种电压交汇的每一格都算好了。',
    '機身上印的是毫安時，規定看的卻是瓦時。同樣 20,000mAh，3.7V 的是 74Wh 可以隨便帶，11.1V 的就是 222Wh，根本不能上機。20 種容量與 5 種電壓交匯的每一格都算好了。',
  ),

  voltName: T<(k: string) => string>(voltName, voltName, voltName, voltName, voltName, voltName, voltName, voltName, voltName, voltName),

  verdictName: T<(v: Verdict) => string>(
    verd('그냥 반입', '항공사 승인', '반입 불가'),
    verd('carry on freely', 'airline approval', 'not allowed'),
    verd('sin trámite', 'con aprobación', 'no permitida'),
    verd('sem trâmite', 'com aprovação', 'não permitida'),
    verd('そのまま持ち込み', '航空会社の承認', '持ち込み不可'),
    verd('frei mitnehmen', 'Genehmigung nötig', 'nicht erlaubt'),
    verd('emport libre', 'accord de la compagnie', 'interdit'),
    verd('बिना अनुमति', 'एयरलाइन अनुमति', 'अनुमति नहीं'),
    verd('可直接带', '需航司批准', '禁止携带'),
    verd('可直接帶', '需航司批准', '禁止攜帶'),
  ),

  mahLabel: T('표기 용량', 'Printed capacity', 'Capacidad impresa', 'Capacidade impressa', '表記容量', 'Aufgedruckte Kapazität', 'Capacité affichée', 'अंकित क्षमता', '标称容量', '標稱容量'),
  voltLabel: T('셀 전압', 'Cell voltage', 'Tensión de celda', 'Tensão da célula', 'セル電圧', 'Zellspannung', 'Tension de cellule', 'सेल वोल्टेज', '电芯电压', '電芯電壓'),
  whLabel: T('와트시', 'Watt-hours', 'Vatios-hora', 'Watts-hora', 'ワット時', 'Wattstunden', 'Wattheures', 'वाट-घंटा', '瓦时', '瓦時'),
  usbLabel: T('5V 기준 용량', 'Capacity at 5 V', 'Capacidad a 5 V', 'Capacidade a 5 V', '5V換算の容量', 'Kapazität bei 5 V', 'Capacité à 5 V', '5V पर क्षमता', '按 5V 折算', '按 5V 折算'),
  verdictLabel: T('기내 반입', 'On board', 'A bordo', 'A bordo', '機内持ち込み', 'An Bord', 'À bord', 'विमान में', '登机', '登機'),
  headroomLabel: T('100Wh까지 남은 여유', 'Headroom to 100 Wh', 'Margen hasta 100 Wh', 'Margem até 100 Wh', '100Whまでの余裕', 'Spielraum bis 100 Wh', 'Marge jusqu’à 100 Wh', '100 Wh तक बची गुंजाइश', '距 100Wh 还剩', '距 100Wh 還剩'),
  maxFreeLabel: T('이 전압에서 자유로운 최대 용량', 'Largest free capacity at this voltage', 'Capacidad máxima libre a esta tensión', 'Capacidade máxima livre nesta tensão', 'この電圧で自由な最大容量', 'Größte freie Kapazität bei dieser Spannung', 'Capacité libre maximale à cette tension', 'इस वोल्टेज पर अधिकतम मुक्त क्षमता', '该电压下可直接带的最大容量', '該電壓下可直接帶的最大容量'),

  whyTitle: T('왜 Wh로 정하나', 'Why the rule is in watt-hours', 'Por qué la norma va en vatios-hora', 'Por que a norma é em watts-hora', 'なぜWhで決めるのか', 'Warum die Regel in Wattstunden gilt', 'Pourquoi la règle est en wattheures', 'नियम वाट-घंटा में क्यों', '为什么按瓦时定规', '為什麼按瓦時定規'),

  whyNote: T(
    '불이 났을 때 얼마나 큰 불이 되느냐는 담긴 **에너지**가 정합니다. mAh는 전하량일 뿐이라 전압을 곱해야 에너지가 되고, 그 단위가 와트시입니다. 그래서 같은 mAh라도 셀을 직렬로 여러 장 이어 전압을 올린 팩은 위험이 그만큼 커집니다 — 규정이 mAh가 아니라 Wh를 보는 이유입니다.',
    'How big a fire can get is set by the energy inside, not the charge. Milliamp-hours measure charge alone; multiply by voltage and you get energy, measured in watt-hours. A pack that stacks cells in series to raise voltage carries proportionally more energy at the same mAh — which is exactly why the rule reads in watt-hours.',
    'El tamaño de un incendio lo fija la energía almacenada, no la carga. El mAh mide solo carga; al multiplicarlo por la tensión se obtiene energía, medida en vatios-hora. Un pack que apila celdas en serie para subir la tensión lleva proporcionalmente más energía con los mismos mAh: por eso la norma habla de vatios-hora.',
    'O tamanho de um incêndio é definido pela energia armazenada, não pela carga. O mAh mede só carga; multiplicado pela tensão vira energia, medida em watts-hora. Um pacote que empilha células em série para subir a tensão carrega proporcionalmente mais energia com os mesmos mAh — daí a norma falar em watts-hora.',
    '火が出たときにどれだけ大きくなるかは、入っている**エネルギー**が決めます。mAhは電荷量にすぎず、電圧を掛けて初めてエネルギーになり、その単位がワット時です。だから同じmAhでもセルを直列につないで電圧を上げたパックはそれだけ危険が大きくなります — 規定がmAhではなくWhを見る理由です。',
    'Wie groß ein Brand werden kann, bestimmt die gespeicherte Energie, nicht die Ladung. Milliamperestunden messen nur Ladung; erst mal Spannung ergibt sich Energie in Wattstunden. Ein Pack, das Zellen in Reihe schaltet, trägt bei gleichen mAh entsprechend mehr Energie — genau darum steht die Vorschrift in Wattstunden.',
    'L’ampleur d’un incendie dépend de l’énergie contenue, pas de la charge. Le mAh ne mesure que la charge ; multiplié par la tension, il donne l’énergie, en wattheures. Un pack qui empile des cellules en série pour monter en tension transporte d’autant plus d’énergie à mAh égal — d’où une règle exprimée en wattheures.',
    'आग कितनी बड़ी हो सकती है, यह भीतर की **ऊर्जा** तय करती है, आवेश नहीं। mAh केवल आवेश मापता है; वोल्टेज से गुणा करने पर ऊर्जा मिलती है, जिसकी इकाई वाट-घंटा है। श्रेणी में सेल जोड़कर वोल्टेज बढ़ाया पैक उसी mAh पर अधिक ऊर्जा रखता है — इसीलिए नियम वाट-घंटा में लिखा है।',
    '起火后能烧多大，取决于里面装的**能量**，而不是电荷。毫安时只量电荷，乘上电压才是能量，单位就是瓦时。所以同样毫安时，把电芯串联抬高电压的电池组，能量就成比例地更大——这正是规定按瓦时来定的原因。',
    '起火後能燒多大，取決於裡面裝的**能量**，而不是電荷。毫安時只量電荷，乘上電壓才是能量，單位就是瓦時。所以同樣毫安時，把電芯串聯抬高電壓的電池組，能量就成比例地更大——這正是規定按瓦時來定的原因。',
  ),

  ruleTitle: T('경계는 100Wh와 160Wh입니다', 'The thresholds are 100 Wh and 160 Wh', 'Los umbrales son 100 Wh y 160 Wh', 'Os limites são 100 Wh e 160 Wh', '境目は100Whと160Whです', 'Die Grenzen liegen bei 100 Wh und 160 Wh', 'Les seuils sont 100 Wh et 160 Wh', 'सीमाएँ 100 Wh और 160 Wh हैं', '分界线是 100Wh 和 160Wh', '分界線是 100Wh 和 160Wh'),

  ruleNote: T(
    '100Wh까지는 그냥 들고 탈 수 있고, 100에서 160Wh는 항공사 승인을 받으면 되며, 160Wh를 넘으면 여객기에 실을 수 없습니다. 어느 경우든 부치는 짐이 아니라 **기내 수하물**로만 가져가야 합니다 — 화물칸에서는 불이 나도 사람이 끌 수 없기 때문입니다. 항공사에 따라 더 엄한 규정을 두기도 합니다.',
    'Up to 100 Wh you carry it on without asking; from 100 to 160 Wh you need the airline’s approval; above 160 Wh it may not travel on a passenger aircraft at all. In every case it must ride in the **cabin**, never in checked baggage — a fire in the hold is one nobody can reach. Individual airlines may set stricter limits.',
    'Hasta 100 Wh se lleva sin pedir permiso; de 100 a 160 Wh hace falta la aprobación de la aerolínea; por encima de 160 Wh no puede viajar en avión de pasajeros. En todos los casos debe ir en **cabina**, nunca facturada: un fuego en la bodega no lo alcanza nadie. Cada aerolínea puede ser más estricta.',
    'Até 100 Wh leva-se sem pedir; de 100 a 160 Wh é preciso aprovação da companhia; acima de 160 Wh não pode viajar em avião de passageiros. Em todos os casos deve ir na **cabine**, nunca despachada — um incêndio no porão ninguém alcança. Cada companhia pode ser mais rígida.',
    '100Whまではそのまま持ち込め、100から160Whは航空会社の承認を受ければよく、160Whを超えると旅客機には載せられません。どの場合も預け荷物ではなく**機内持ち込み**に限ります — 貨物室で火が出ても人が消せないからです。航空会社によってはさらに厳しい規定を置きます。',
    'Bis 100 Wh nimmt man sie ohne Rückfrage mit, von 100 bis 160 Wh braucht es die Zustimmung der Airline, über 160 Wh darf sie gar nicht in ein Passagierflugzeug. In jedem Fall gehört sie in die **Kabine**, nie ins Aufgabegepäck — ein Feuer im Frachtraum erreicht niemand. Einzelne Airlines sind strenger.',
    'Jusqu’à 100 Wh, emport libre ; de 100 à 160 Wh, accord de la compagnie ; au-delà de 160 Wh, interdiction en avion de ligne. Dans tous les cas, elle voyage en **cabine**, jamais en soute : un feu en soute, personne ne peut l’atteindre. Certaines compagnies sont plus strictes.',
    '100 Wh तक बिना पूछे ले जा सकते हैं; 100 से 160 Wh तक एयरलाइन की अनुमति चाहिए; 160 Wh से ऊपर यात्री विमान में बिल्कुल नहीं। हर हाल में यह **केबिन** में जाए, चेक-इन बैग में कभी नहीं — कार्गो में लगी आग तक कोई नहीं पहुँच सकता। कुछ एयरलाइनें और सख़्त हैं।',
    '100Wh 以内可以直接带；100 到 160Wh 需要航空公司批准；超过 160Wh 客机根本不能带。任何情况下都只能放**随身行李**，不能托运——货舱起火没人够得着。个别航司还会更严。',
    '100Wh 以內可以直接帶；100 到 160Wh 需要航空公司批准；超過 160Wh 客機根本不能帶。任何情況下都只能放**隨身行李**，不能託運——貨艙起火沒人搆得著。個別航司還會更嚴。',
  ),

  usbTitle: T('5V로 세면 수가 줄어듭니다', 'Counted at 5 V, the number shrinks', 'Contado a 5 V, el número baja', 'Contado a 5 V, o número cai', '5Vで数えると数が減ります', 'Bei 5 V gezählt schrumpft die Zahl', 'Compté à 5 V, le chiffre baisse', '5V पर गिनें तो संख्या घटती है', '按 5V 折算，数字会变小', '按 5V 折算，數字會變小'),

  usbNote: T(
    'mAh 표기는 셀 전압을 기준으로 합니다. 그런데 USB로 나올 때는 5V이므로, 같은 에너지를 5V 기준으로 다시 세면 수가 줄어듭니다 — 20,000mAh(3.7V)는 5V로 14,800mAh입니다. "표기보다 덜 채워 준다"고 느끼는 몫의 상당 부분이 이 환산에서 나오고, 나머지는 승압할 때 생기는 변환 손실입니다.',
    'The printed mAh is measured at the cell’s voltage. Output comes out at 5 V, so counting the same energy at 5 V gives a smaller number: 20,000 mAh at 3.7 V is 14,800 mAh at 5 V. Much of the feeling that a bank “delivers less than the label” comes from this conversion; the rest is the loss in stepping the voltage up.',
    'El mAh impreso se mide a la tensión de la celda. La salida sale a 5 V, así que contar la misma energía a 5 V da un número menor: 20.000 mAh a 3,7 V son 14.800 mAh a 5 V. Buena parte de la sensación de que “carga menos de lo que dice” viene de esta conversión; el resto son pérdidas al elevar la tensión.',
    'O mAh impresso é medido na tensão da célula. A saída sai a 5 V, então contar a mesma energia a 5 V dá um número menor: 20.000 mAh a 3,7 V são 14.800 mAh a 5 V. Boa parte da sensação de que “carrega menos que o rótulo” vem dessa conversão; o resto são perdas ao elevar a tensão.',
    'mAh表記はセル電圧を基準にしています。ところがUSBで出るときは5Vなので、同じエネルギーを5V基準で数え直すと数が減ります — 20,000mAh(3.7V)は5Vで14,800mAhです。「表記より少ない」と感じる分のかなりがこの換算から来ており、残りは昇圧時の変換損失です。',
    'Die aufgedruckten mAh gelten bei Zellspannung. Ausgegeben wird bei 5 V — dieselbe Energie bei 5 V gezählt ergibt eine kleinere Zahl: 20.000 mAh bei 3,7 V sind 14.800 mAh bei 5 V. Ein Großteil des Eindrucks, eine Bank „lade weniger als angegeben“, stammt aus dieser Umrechnung; der Rest sind Wandlerverluste beim Hochsetzen.',
    'Les mAh imprimés se mesurent à la tension de la cellule. La sortie se fait à 5 V : compter la même énergie à 5 V donne un chiffre plus petit — 20 000 mAh à 3,7 V font 14 800 mAh à 5 V. C’est de là que vient l’essentiel de l’impression qu’une batterie « recharge moins que promis » ; le reste vient des pertes de conversion.',
    'अंकित mAh सेल वोल्टेज पर मापा जाता है। पर आउटपुट 5 V पर आता है, इसलिए उसी ऊर्जा को 5 V पर गिनें तो संख्या घट जाती है — 3.7 V पर 20,000 mAh 5 V पर 14,800 mAh है। «लेबल से कम चार्ज करता है» की भावना का बड़ा हिस्सा इसी रूपांतरण से आता है; बाक़ी वोल्टेज बढ़ाने में होने वाला नुक़सान है।',
    '标称的毫安时是按电芯电压算的，而 USB 输出是 5V。把同样的能量按 5V 重新折算，数字就变小了——3.7V 的 20,000mAh 折成 5V 只有 14,800mAh。"充得比标称少"的感觉，很大一部分来自这个折算，其余是升压时的转换损耗。',
    '標稱的毫安時是按電芯電壓算的，而 USB 輸出是 5V。把同樣的能量按 5V 重新折算，數字就變小了——3.7V 的 20,000mAh 折成 5V 只有 14,800mAh。「充得比標稱少」的感覺，很大一部分來自這個折算，其餘是升壓時的轉換損耗。',
  ),

  packTitle: T('전압이 높은 팩일수록 빨리 걸립니다', 'Higher-voltage packs hit the limit sooner', 'Los packs de más tensión chocan antes con el límite', 'Pacotes de tensão maior batem no limite antes', '電圧が高いパックほど早く引っかかります', 'Packs mit höherer Spannung stoßen früher an', 'Les packs à tension élevée butent plus vite', 'ऊँचे वोल्टेज वाले पैक जल्दी सीमा छूते हैं', '电压越高的电池组越早触线', '電壓越高的電池組越早觸線'),

  packNote: T(
    '3.7V라면 27,000mAh까지 100Wh 안쪽이지만, 11.1V 팩은 9,000mAh만 넘어도 걸립니다. 노트북용·카메라용 대형 팩이 여기 해당합니다. 제품에 Wh가 적혀 있으면 그 값을 쓰고, 없으면 mAh와 전압을 곱해 직접 계산하십시오 — 공항에서 물어보면 Wh를 답해야 합니다.',
    'At 3.7 V you stay under 100 Wh up to 27,000 mAh; an 11.1 V pack crosses the line past about 9,000 mAh. Large laptop and camera packs sit in that range. If the case prints a Wh figure, use it; if not, multiply mAh by voltage yourself — at the gate the answer they want is in watt-hours.',
    'A 3,7 V te mantienes por debajo de 100 Wh hasta 27.000 mAh; un pack de 11,1 V cruza la línea pasados unos 9.000 mAh. Ahí entran los packs grandes de portátil y de cámara. Si la carcasa indica los Wh, úsalos; si no, multiplica mAh por tensión — en la puerta te preguntarán en vatios-hora.',
    'A 3,7 V você fica abaixo de 100 Wh até 27.000 mAh; um pacote de 11,1 V cruza a linha passando de cerca de 9.000 mAh. É aí que ficam os pacotes grandes de notebook e câmera. Se a carcaça trouxer os Wh, use-os; se não, multiplique mAh por tensão — no portão a resposta esperada é em watts-hora.',
    '3.7Vなら27,000mAhまで100Wh以内ですが、11.1Vのパックは9,000mAhを超えるだけで引っかかります。ノートPC用・カメラ用の大型パックがここに当たります。製品にWhが書いてあればその値を使い、なければmAhと電圧を掛けて自分で計算してください — 空港で聞かれたらWhで答える必要があります。',
    'Bei 3,7 V bleibt man bis 27.000 mAh unter 100 Wh; ein 11,1-V-Pack überschreitet die Linie schon ab rund 9.000 mAh. Große Laptop- und Kamerapacks liegen genau dort. Steht eine Wh-Zahl auf dem Gehäuse, gilt die; sonst mAh mal Spannung selbst rechnen — am Gate will man die Wattstunden hören.',
    'À 3,7 V, on reste sous 100 Wh jusqu’à 27 000 mAh ; un pack 11,1 V franchit la ligne dès environ 9 000 mAh. C’est là que se trouvent les gros packs pour portables et caméras. Si le boîtier affiche des Wh, prenez-les ; sinon, multipliez les mAh par la tension — à l’embarquement, la réponse attendue est en wattheures.',
    '3.7 V पर 27,000 mAh तक 100 Wh के भीतर रहते हैं; 11.1 V का पैक लगभग 9,000 mAh से ऊपर ही सीमा पार कर जाता है। लैपटॉप और कैमरे के बड़े पैक यहीं आते हैं। डिब्बे पर Wh लिखा हो तो वही लें; न हो तो mAh × वोल्टेज ख़ुद गिनें — गेट पर उत्तर वाट-घंटा में चाहिए।',
    '3.7V 时到 27,000mAh 都还在 100Wh 以内；11.1V 的电池组超过约 9,000mAh 就触线了。笔记本和相机用的大电池组正落在这一段。机身上标了 Wh 就用它，没标就自己用毫安时乘电压——登机口要的答案是瓦时。',
    '3.7V 時到 27,000mAh 都還在 100Wh 以內；11.1V 的電池組超過約 9,000mAh 就觸線了。筆電和相機用的大電池組正落在這一段。機身上標了 Wh 就用它，沒標就自己用毫安時乘電壓——登機口要的答案是瓦時。',
  ),

  careTitle: T('이 값은 표기 기준입니다', 'These figures follow the label', 'Estas cifras siguen la etiqueta', 'Estes números seguem o rótulo', 'この値は表記基準です', 'Diese Werte folgen dem Aufdruck', 'Ces valeurs suivent l’étiquette', 'ये आँकड़े लेबल पर आधारित हैं', '这些数值以标称为准', '這些數值以標稱為準'),

  careNote: T(
    '실제 셀 전압은 충전 상태에 따라 3.0V에서 4.2V 사이를 오갑니다. 공칭 전압은 그 가운데를 대표하는 값일 뿐입니다. 또 제품에 적힌 mAh가 실제 셀 용량보다 넉넉하게 적힌 경우도 있으므로, 규정에 가까운 용량이라면 제조사가 표기한 Wh를 따르는 편이 안전합니다.',
    'A cell’s real voltage swings between about 3.0 and 4.2 V as it charges and drains; the nominal figure just stands for the middle. Printed mAh is also sometimes generous relative to the cells inside. If your pack sits near a threshold, go by the manufacturer’s own Wh marking.',
    'La tensión real de una celda oscila entre unos 3,0 y 4,2 V según la carga; el valor nominal solo representa el punto medio. Además, el mAh impreso a veces es generoso frente a las celdas reales. Si tu batería queda cerca de un umbral, hazle caso a los Wh que marca el fabricante.',
    'A tensão real de uma célula oscila entre cerca de 3,0 e 4,2 V conforme carrega e descarrega; o valor nominal representa só o meio. E o mAh impresso às vezes é generoso frente às células reais. Se a sua bateria fica perto de um limite, siga os Wh marcados pelo fabricante.',
    '実際のセル電圧は充電状態によって3.0Vから4.2Vの間を動きます。公称電圧はその真ん中を代表する値にすぎません。また製品に書かれたmAhが実際のセル容量より多めのこともあるので、規定に近い容量なら製造元が表記したWhに従うほうが安全です。',
    'Die reale Zellspannung schwankt beim Laden und Entladen zwischen etwa 3,0 und 4,2 V; die Nennspannung steht nur für die Mitte. Auch sind aufgedruckte mAh mitunter großzügig gerechnet. Liegt der Akku nahe an einer Grenze, richten Sie sich nach der Wh-Angabe des Herstellers.',
    'La tension réelle d’une cellule oscille entre environ 3,0 et 4,2 V au fil de la charge ; la valeur nominale n’en représente que le milieu. Les mAh imprimés sont parfois généreux par rapport aux cellules réelles. Si votre batterie frôle un seuil, fiez-vous aux Wh indiqués par le fabricant.',
    'सेल का असली वोल्टेज चार्ज की स्थिति के साथ लगभग 3.0 से 4.2 V के बीच घूमता है; नाममात्र मान बस बीच का प्रतिनिधि है। और अंकित mAh कभी-कभी असली सेलों से उदार होता है। यदि आपका पैक किसी सीमा के पास है, तो निर्माता द्वारा अंकित Wh पर भरोसा करें।',
    '电芯的实际电压随充放电在约 3.0 到 4.2V 之间变化，标称电压只是代表中间值。而且标称毫安时有时比真实电芯更宽松。如果容量接近分界线，以厂家标注的 Wh 为准更稳妥。',
    '電芯的實際電壓隨充放電在約 3.0 到 4.2V 之間變化，標稱電壓只是代表中間值。而且標稱毫安時有時比真實電芯更寬鬆。如果容量接近分界線，以廠家標註的 Wh 為準更穩妥。',
  ),

  tableTitle: T('용량과 전압으로 찾기', 'Find it by capacity and voltage', 'Búscalo por capacidad y tensión', 'Ache por capacidade e tensão', '容量と電圧から探す', 'Nach Kapazität und Spannung suchen', 'Chercher par capacité et tension', 'क्षमता और वोल्टेज से देखें', '按容量和电压查找', '按容量和電壓查找'),
  neighbourTitle: T('가까운 용량', 'Nearby capacities', 'Capacidades cercanas', 'Capacidades próximas', '近い容量', 'Kapazitäten daneben', 'Capacités voisines', 'पास की क्षमताएँ', '相邻容量', '相鄰容量'),
  voltRowTitle: T('같은 전압, 다른 용량', 'Same voltage, other capacities', 'Misma tensión, otras capacidades', 'Mesma tensão, outras capacidades', '同じ電圧、別の容量', 'Gleiche Spannung, andere Kapazitäten', 'Même tension, autres capacités', 'वही वोल्टेज, दूसरी क्षमताएँ', '同一电压，不同容量', '同一電壓，不同容量'),
  capRowTitle: T('같은 용량, 다른 전압', 'Same capacity, other voltages', 'Misma capacidad, otras tensiones', 'Mesma capacidade, outras tensões', '同じ容量、別の電圧', 'Gleiche Kapazität, andere Spannungen', 'Même capacité, autres tensions', 'वही क्षमता, दूसरे वोल्टेज', '同一容量，不同电压', '同一容量，不同電壓'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '와트시 = mAh × 전압 ÷ 1000. 20,000mAh × 3.7V = 74Wh입니다.',
      '100Wh까지 자유, 100~160Wh는 항공사 승인, 160Wh 넘으면 불가입니다.',
      '어느 경우든 부치지 말고 기내 수하물로 가져갑니다.',
      '5V 기준으로 다시 세면 표기보다 작아집니다.',
    ],
    [
      'Watt-hours = mAh × volts ÷ 1000. 20,000 mAh × 3.7 V = 74 Wh.',
      'Up to 100 Wh is free, 100–160 Wh needs airline approval, above 160 Wh is barred.',
      'Either way it goes in the cabin, never in checked baggage.',
      'Counted at 5 V the figure comes out smaller than the label.',
    ],
    [
      'Vatios-hora = mAh × voltios ÷ 1000. 20.000 mAh × 3,7 V = 74 Wh.',
      'Hasta 100 Wh libre, de 100 a 160 Wh con aprobación, por encima de 160 Wh prohibida.',
      'En todo caso va en cabina, nunca facturada.',
      'Contada a 5 V, la cifra sale menor que la etiqueta.',
    ],
    [
      'Watts-hora = mAh × volts ÷ 1000. 20.000 mAh × 3,7 V = 74 Wh.',
      'Até 100 Wh livre, de 100 a 160 Wh com aprovação, acima de 160 Wh proibida.',
      'De todo modo vai na cabine, nunca despachada.',
      'Contada a 5 V, a cifra sai menor que a do rótulo.',
    ],
    [
      'ワット時 = mAh × 電圧 ÷ 1000。20,000mAh × 3.7V = 74Whです。',
      '100Whまで自由、100〜160Whは航空会社の承認、160Wh超は不可です。',
      'どの場合も預けずに機内持ち込みにします。',
      '5V基準で数え直すと表記より小さくなります。',
    ],
    [
      'Wattstunden = mAh × Volt ÷ 1000. 20.000 mAh × 3,7 V = 74 Wh.',
      'Bis 100 Wh frei, 100–160 Wh mit Genehmigung, über 160 Wh verboten.',
      'In jedem Fall in die Kabine, nie ins Aufgabegepäck.',
      'Bei 5 V gezählt fällt die Zahl kleiner aus als auf dem Etikett.',
    ],
    [
      'Wattheures = mAh × volts ÷ 1000. 20 000 mAh × 3,7 V = 74 Wh.',
      'Jusqu’à 100 Wh libre, 100–160 Wh sur accord, au-delà de 160 Wh interdit.',
      'Dans tous les cas en cabine, jamais en soute.',
      'Comptée à 5 V, la valeur ressort plus petite que l’étiquette.',
    ],
    [
      'वाट-घंटा = mAh × वोल्ट ÷ 1000। 20,000 mAh × 3.7 V = 74 Wh।',
      '100 Wh तक मुक्त, 100–160 Wh पर एयरलाइन अनुमति, 160 Wh से ऊपर मना।',
      'हर हाल में केबिन में, चेक-इन बैग में कभी नहीं।',
      '5 V पर गिनने पर संख्या लेबल से छोटी निकलती है।',
    ],
    [
      '瓦时 = 毫安时 × 电压 ÷ 1000。20,000mAh × 3.7V = 74Wh。',
      '100Wh 以内自由，100~160Wh 需航司批准，超过 160Wh 禁止。',
      '不论哪种，都只能随身带，不能托运。',
      '按 5V 折算，数字会比标称小。',
    ],
    [
      '瓦時 = 毫安時 × 電壓 ÷ 1000。20,000mAh × 3.7V = 74Wh。',
      '100Wh 以內自由，100~160Wh 需航司批准，超過 160Wh 禁止。',
      '不論哪種，都只能隨身帶，不能託運。',
      '按 5V 折算，數字會比標稱小。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '보조배터리 기내 반입 계산 — mAh를 Wh로',
    'Power bank on a plane — turning mAh into watt-hours',
    'Batería externa en avión — de mAh a vatios-hora',
    'Bateria externa em voo — de mAh a watts-hora',
    'モバイルバッテリーの機内持ち込み計算 — mAhをWhに',
    'Powerbank im Flugzeug — von mAh zu Wattstunden',
    'Batterie externe en avion — des mAh aux wattheures',
    'विमान में पावर बैंक — mAh से वाट-घंटा',
    '充电宝登机计算 — 毫安时换算瓦时',
    '行動電源登機計算 — 毫安時換算瓦時',
  ),

  hubMetaDesc: T(
    '20,000mAh는 3.7V에서 74Wh라 그냥 들고 탈 수 있습니다. 100Wh까지 자유, 160Wh까지는 항공사 승인, 그 위는 불가입니다. 용량 20가지 × 전압 5가지 100칸의 와트시와 판정.',
    '20,000 mAh at 3.7 V is 74 Wh and boards without asking. Up to 100 Wh is free, up to 160 Wh needs approval, above that is barred. Watt-hours and a verdict for 20 capacities × 5 voltages.',
    '20.000 mAh a 3,7 V son 74 Wh y embarcan sin pedir permiso. Hasta 100 Wh libre, hasta 160 Wh con aprobación, por encima prohibido. Vatios-hora y veredicto para 20 capacidades × 5 tensiones.',
    '20.000 mAh a 3,7 V são 74 Wh e embarcam sem pedir. Até 100 Wh livre, até 160 Wh com aprovação, acima disso proibido. Watts-hora e veredito para 20 capacidades × 5 tensões.',
    '20,000mAhは3.7Vで74Whなのでそのまま持ち込めます。100Whまで自由、160Whまでは航空会社の承認、それ以上は不可です。容量20通り×電圧5通り100マスのワット時と判定。',
    '20.000 mAh bei 3,7 V sind 74 Wh und dürfen ohne Rückfrage mit. Bis 100 Wh frei, bis 160 Wh mit Genehmigung, darüber verboten. Wattstunden und Urteil für 20 Kapazitäten × 5 Spannungen.',
    '20 000 mAh à 3,7 V font 74 Wh et passent sans formalité. Libre jusqu’à 100 Wh, sur accord jusqu’à 160 Wh, interdit au-delà. Wattheures et verdict pour 20 capacités × 5 tensions.',
    '3.7 V पर 20,000 mAh = 74 Wh, बिना पूछे ले जा सकते हैं। 100 Wh तक मुक्त, 160 Wh तक अनुमति से, उससे ऊपर मना। 20 क्षमताओं × 5 वोल्टेजों के वाट-घंटा और फ़ैसला।',
    '20,000mAh 在 3.7V 下是 74Wh，可以直接带上飞机。100Wh 以内自由，160Wh 以内需批准，再往上禁止。20 种容量 × 5 种电压的瓦时与判定。',
    '20,000mAh 在 3.7V 下是 74Wh，可以直接帶上飛機。100Wh 以內自由，160Wh 以內需批准，再往上禁止。20 種容量 × 5 種電壓的瓦時與判定。',
  ),

  desc: T<(f: PowerFacts) => string>(
    f => `${f.cell.mah.toLocaleString()}mAh를 ${f.volts}V로 세면 ${f.wh}Wh입니다. 5V 기준으로는 ${f.usbMah.toLocaleString()}mAh에 해당합니다.`,
    f => `${f.cell.mah.toLocaleString()} mAh at ${f.volts} V comes to ${f.wh} Wh, which is ${f.usbMah.toLocaleString()} mAh counted at 5 V.`,
    f => `${f.cell.mah.toLocaleString()} mAh a ${f.volts} V son ${f.wh} Wh, es decir ${f.usbMah.toLocaleString()} mAh contados a 5 V.`,
    f => `${f.cell.mah.toLocaleString()} mAh a ${f.volts} V dão ${f.wh} Wh, ou seja ${f.usbMah.toLocaleString()} mAh contados a 5 V.`,
    f => `${f.cell.mah.toLocaleString()}mAhを${f.volts}Vで数えると${f.wh}Whです。5V基準では${f.usbMah.toLocaleString()}mAhに当たります。`,
    f => `${f.cell.mah.toLocaleString()} mAh bei ${f.volts} V ergeben ${f.wh} Wh, also ${f.usbMah.toLocaleString()} mAh bei 5 V gezählt.`,
    f => `${f.cell.mah.toLocaleString()} mAh à ${f.volts} V font ${f.wh} Wh, soit ${f.usbMah.toLocaleString()} mAh comptés à 5 V.`,
    f => `${f.volts} V पर ${f.cell.mah.toLocaleString()} mAh = ${f.wh} Wh, यानी 5 V पर ${f.usbMah.toLocaleString()} mAh।`,
    f => `${f.cell.mah.toLocaleString()}mAh 按 ${f.volts}V 计为 ${f.wh}Wh，折成 5V 相当于 ${f.usbMah.toLocaleString()}mAh。`,
    f => `${f.cell.mah.toLocaleString()}mAh 按 ${f.volts}V 計為 ${f.wh}Wh，折成 5V 相當於 ${f.usbMah.toLocaleString()}mAh。`,
  ),

  metaTitle: T<(f: PowerFacts) => string>(
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V — ${f.wh}Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh at ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh a ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh a ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V — ${f.wh}Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh bei ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh à ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()} mAh, ${f.volts} V — ${f.wh} Wh`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V — ${f.wh}Wh`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V — ${f.wh}Wh`,
  ),

  metaDesc: T<(f: PowerFacts) => string>(
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V 보조배터리는 ${f.wh}Wh입니다. 이 전압에서 그냥 들고 탈 수 있는 최대 용량은 ${f.maxFree.toLocaleString()}mAh이고, 5V 기준 용량은 ${f.usbMah.toLocaleString()}mAh입니다.`,
    f => `A ${f.cell.mah.toLocaleString()} mAh pack at ${f.volts} V holds ${f.wh} Wh. At this voltage the largest freely carried capacity is ${f.maxFree.toLocaleString()} mAh, and the same energy counted at 5 V is ${f.usbMah.toLocaleString()} mAh.`,
    f => `Una batería de ${f.cell.mah.toLocaleString()} mAh a ${f.volts} V guarda ${f.wh} Wh. A esta tensión la mayor capacidad de emport libre es ${f.maxFree.toLocaleString()} mAh, y la misma energía a 5 V son ${f.usbMah.toLocaleString()} mAh.`,
    f => `Uma bateria de ${f.cell.mah.toLocaleString()} mAh a ${f.volts} V guarda ${f.wh} Wh. Nesta tensão a maior capacidade livre é ${f.maxFree.toLocaleString()} mAh, e a mesma energia a 5 V são ${f.usbMah.toLocaleString()} mAh.`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}Vのモバイルバッテリーは${f.wh}Whです。この電圧でそのまま持ち込める最大容量は${f.maxFree.toLocaleString()}mAh、5V基準の容量は${f.usbMah.toLocaleString()}mAhです。`,
    f => `Ein ${f.cell.mah.toLocaleString()}-mAh-Pack bei ${f.volts} V fasst ${f.wh} Wh. Bei dieser Spannung liegt die größte frei mitführbare Kapazität bei ${f.maxFree.toLocaleString()} mAh; dieselbe Energie bei 5 V sind ${f.usbMah.toLocaleString()} mAh.`,
    f => `Une batterie de ${f.cell.mah.toLocaleString()} mAh à ${f.volts} V contient ${f.wh} Wh. À cette tension, la plus grande capacité en emport libre est ${f.maxFree.toLocaleString()} mAh, et la même énergie à 5 V fait ${f.usbMah.toLocaleString()} mAh.`,
    f => `${f.volts} V पर ${f.cell.mah.toLocaleString()} mAh का पैक ${f.wh} Wh रखता है। इस वोल्टेज पर बिना अनुमति ले जाने योग्य अधिकतम क्षमता ${f.maxFree.toLocaleString()} mAh है, और वही ऊर्जा 5 V पर ${f.usbMah.toLocaleString()} mAh है।`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V 的充电宝是 ${f.wh}Wh。该电压下可直接带上机的最大容量是 ${f.maxFree.toLocaleString()}mAh，同样能量按 5V 折算为 ${f.usbMah.toLocaleString()}mAh。`,
    f => `${f.cell.mah.toLocaleString()}mAh ${f.volts}V 的行動電源是 ${f.wh}Wh。該電壓下可直接帶上機的最大容量是 ${f.maxFree.toLocaleString()}mAh，同樣能量按 5V 折算為 ${f.usbMah.toLocaleString()}mAh。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '20,000mAh 보조배터리는 비행기에 들고 탈 수 있나요?', a: '3.7V 기준 74Wh라 그냥 들고 탈 수 있습니다. 100Wh까지가 자유입니다.' },
      { q: 'mAh를 Wh로 어떻게 바꾸나요?', a: 'mAh에 전압을 곱하고 1000으로 나눕니다. 20,000 × 3.7 ÷ 1000 = 74Wh입니다.' },
      { q: '몇 mAh부터 못 타나요?', a: '전압에 달렸습니다. 3.7V라면 27,000mAh까지 자유고, 11.1V 팩이면 9,000mAh만 넘어도 승인이 필요합니다.' },
      { q: '부치는 짐에 넣어도 되나요?', a: '안 됩니다. 보조배터리와 여분 배터리는 기내 수하물로만 가져가야 합니다.' },
      { q: '왜 표기보다 덜 충전되나요?', a: 'mAh 표기는 셀 전압 기준인데 USB로는 5V로 나옵니다. 20,000mAh(3.7V)는 5V로 14,800mAh이고, 여기에 승압 손실이 더해집니다.' },
    ],
    [
      { q: 'Can I fly with a 20,000 mAh power bank?', a: 'Yes — at 3.7 V that is 74 Wh, and anything up to 100 Wh boards without asking.' },
      { q: 'How do I convert mAh to Wh?', a: 'Multiply by the voltage and divide by 1000: 20,000 × 3.7 ÷ 1000 = 74 Wh.' },
      { q: 'At how many mAh does it become a problem?', a: 'It depends on voltage. At 3.7 V you are free up to 27,000 mAh; an 11.1 V pack needs approval past about 9,000 mAh.' },
      { q: 'Can it go in checked baggage?', a: 'No. Power banks and spare batteries may travel in the cabin only.' },
      { q: 'Why does it charge less than the label says?', a: 'The mAh is measured at cell voltage while USB delivers 5 V: 20,000 mAh at 3.7 V is 14,800 mAh at 5 V, and conversion losses come on top.' },
    ],
    [
      { q: '¿Puedo volar con una batería de 20.000 mAh?', a: 'Sí: a 3,7 V son 74 Wh, y hasta 100 Wh se embarca sin pedir permiso.' },
      { q: '¿Cómo paso de mAh a Wh?', a: 'Multiplica por la tensión y divide entre 1000: 20.000 × 3,7 ÷ 1000 = 74 Wh.' },
      { q: '¿A partir de cuántos mAh hay problema?', a: 'Depende de la tensión. A 3,7 V vas libre hasta 27.000 mAh; un pack de 11,1 V ya necesita aprobación pasados unos 9.000 mAh.' },
      { q: '¿Puede ir facturada?', a: 'No. Las baterías externas y de repuesto solo pueden viajar en cabina.' },
      { q: '¿Por qué carga menos de lo que dice?', a: 'El mAh se mide a la tensión de celda y el USB entrega 5 V: 20.000 mAh a 3,7 V son 14.800 mAh a 5 V, más las pérdidas de conversión.' },
    ],
    [
      { q: 'Posso voar com uma bateria de 20.000 mAh?', a: 'Sim: a 3,7 V são 74 Wh, e até 100 Wh embarca sem pedir.' },
      { q: 'Como converto mAh em Wh?', a: 'Multiplique pela tensão e divida por 1000: 20.000 × 3,7 ÷ 1000 = 74 Wh.' },
      { q: 'A partir de quantos mAh dá problema?', a: 'Depende da tensão. A 3,7 V você vai livre até 27.000 mAh; um pacote de 11,1 V já pede aprovação passando de cerca de 9.000 mAh.' },
      { q: 'Pode ir despachada?', a: 'Não. Baterias externas e sobressalentes só viajam na cabine.' },
      { q: 'Por que carrega menos do que diz?', a: 'O mAh é medido na tensão da célula e o USB entrega 5 V: 20.000 mAh a 3,7 V são 14.800 mAh a 5 V, mais as perdas de conversão.' },
    ],
    [
      { q: '20,000mAhのモバイルバッテリーは飛行機に持ち込めますか？', a: '3.7V基準で74Whなのでそのまま持ち込めます。100Whまでが自由です。' },
      { q: 'mAhをWhにどう直しますか？', a: 'mAhに電圧を掛けて1000で割ります。20,000 × 3.7 ÷ 1000 = 74Whです。' },
      { q: '何mAhから引っかかりますか？', a: '電圧によります。3.7Vなら27,000mAhまで自由で、11.1Vのパックなら9,000mAhを超えるだけで承認が要ります。' },
      { q: '預け荷物に入れてもよいですか？', a: 'いけません。モバイルバッテリーと予備電池は機内持ち込みに限ります。' },
      { q: 'なぜ表記より充電できないのですか？', a: 'mAh表記はセル電圧基準ですが、USBでは5Vで出ます。20,000mAh(3.7V)は5Vで14,800mAhで、さらに昇圧の損失が乗ります。' },
    ],
    [
      { q: 'Darf ich eine 20.000-mAh-Powerbank mitnehmen?', a: 'Ja — bei 3,7 V sind das 74 Wh, und bis 100 Wh geht es ohne Rückfrage.' },
      { q: 'Wie rechne ich mAh in Wh um?', a: 'Mal Spannung, geteilt durch 1000: 20.000 × 3,7 ÷ 1000 = 74 Wh.' },
      { q: 'Ab wie viel mAh wird es kritisch?', a: 'Je nach Spannung. Bei 3,7 V bis 27.000 mAh frei; ein 11,1-V-Pack braucht schon ab rund 9.000 mAh eine Genehmigung.' },
      { q: 'Darf sie ins Aufgabegepäck?', a: 'Nein. Powerbanks und Ersatzakkus dürfen nur in die Kabine.' },
      { q: 'Warum lädt sie weniger als angegeben?', a: 'Die mAh gelten bei Zellspannung, USB liefert 5 V: 20.000 mAh bei 3,7 V sind 14.800 mAh bei 5 V — dazu kommen Wandlerverluste.' },
    ],
    [
      { q: 'Puis-je prendre l’avion avec une batterie de 20 000 mAh ?', a: 'Oui : à 3,7 V cela fait 74 Wh, et jusqu’à 100 Wh l’emport est libre.' },
      { q: 'Comment convertir des mAh en Wh ?', a: 'Multipliez par la tension et divisez par 1000 : 20 000 × 3,7 ÷ 1000 = 74 Wh.' },
      { q: 'À partir de combien de mAh cela coince ?', a: 'Cela dépend de la tension. À 3,7 V, libre jusqu’à 27 000 mAh ; un pack 11,1 V demande un accord dès environ 9 000 mAh.' },
      { q: 'Peut-elle aller en soute ?', a: 'Non. Batteries externes et batteries de rechange voyagent uniquement en cabine.' },
      { q: 'Pourquoi recharge-t-elle moins qu’annoncé ?', a: 'Les mAh sont mesurés à la tension de cellule alors que l’USB sort en 5 V : 20 000 mAh à 3,7 V font 14 800 mAh à 5 V, auxquels s’ajoutent les pertes.' },
    ],
    [
      { q: 'क्या 20,000 mAh पावर बैंक विमान में ले जा सकते हैं?', a: 'हाँ — 3.7 V पर वह 74 Wh है, और 100 Wh तक बिना पूछे जा सकता है।' },
      { q: 'mAh को Wh में कैसे बदलें?', a: 'वोल्टेज से गुणा कर 1000 से भाग दें: 20,000 × 3.7 ÷ 1000 = 74 Wh।' },
      { q: 'कितने mAh से दिक़्क़त शुरू होती है?', a: 'वोल्टेज पर निर्भर। 3.7 V पर 27,000 mAh तक मुक्त; 11.1 V पैक लगभग 9,000 mAh के बाद ही अनुमति माँगता है।' },
      { q: 'क्या चेक-इन बैग में रख सकते हैं?', a: 'नहीं। पावर बैंक और अतिरिक्त बैटरियाँ केवल केबिन में जा सकती हैं।' },
      { q: 'लेबल से कम चार्ज क्यों करता है?', a: 'mAh सेल वोल्टेज पर मापा जाता है जबकि USB 5 V देता है: 3.7 V पर 20,000 mAh 5 V पर 14,800 mAh है, ऊपर से रूपांतरण हानि।' },
    ],
    [
      { q: '20,000mAh 的充电宝能带上飞机吗？', a: '能。按 3.7V 算是 74Wh，100Wh 以内可以直接带。' },
      { q: '毫安时怎么换算成瓦时？', a: '乘以电压再除以 1000：20,000 × 3.7 ÷ 1000 = 74Wh。' },
      { q: '多少毫安时开始有问题？', a: '看电压。3.7V 时到 27,000mAh 都自由；11.1V 的电池组超过约 9,000mAh 就要批准了。' },
      { q: '可以托运吗？', a: '不可以。充电宝和备用电池只能随身带进客舱。' },
      { q: '为什么充得比标称少？', a: '毫安时是按电芯电压标的，而 USB 输出 5V：3.7V 的 20,000mAh 折成 5V 只有 14,800mAh，再加上升压损耗。' },
    ],
    [
      { q: '20,000mAh 的行動電源能帶上飛機嗎？', a: '能。按 3.7V 算是 74Wh，100Wh 以內可以直接帶。' },
      { q: '毫安時怎麼換算成瓦時？', a: '乘以電壓再除以 1000：20,000 × 3.7 ÷ 1000 = 74Wh。' },
      { q: '多少毫安時開始有問題？', a: '看電壓。3.7V 時到 27,000mAh 都自由；11.1V 的電池組超過約 9,000mAh 就要批准了。' },
      { q: '可以託運嗎？', a: '不可以。行動電源和備用電池只能隨身帶進客艙。' },
      { q: '為什麼充得比標稱少？', a: '毫安時是按電芯電壓標的，而 USB 輸出 5V：3.7V 的 20,000mAh 折成 5V 只有 14,800mAh，再加上升壓損耗。' },
    ],
  ),

  cellFaq: T<(f: PowerFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.mah.toLocaleString()}mAh는 몇 Wh인가요?`, a: `${f.volts}V 기준 ${f.wh}Wh입니다. ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000으로 계산합니다.` },
      { q: `비행기에 들고 탈 수 있나요?`, a: f.verdict === 'free' ? `네, 100Wh 안쪽이라 그냥 들고 탈 수 있습니다. 다만 부치지 말고 기내로 가져가십시오.` : f.verdict === 'approval' ? `100Wh를 넘어 항공사 승인이 필요합니다. 160Wh까지는 승인을 받으면 됩니다.` : `160Wh를 넘어 여객기에는 실을 수 없습니다.` },
      { q: `이 전압에서 자유로운 최대 용량은요?`, a: `${f.maxFree.toLocaleString()}mAh입니다. 그 위부터는 승인이 필요합니다.` },
      { q: `5V 기준으로는 얼마인가요?`, a: `${f.usbMah.toLocaleString()}mAh입니다. 에너지는 그대로이고 기준 전압만 바꾼 값입니다.` },
    ],
    f => [
      { q: `How many watt-hours is ${f.cell.mah.toLocaleString()} mAh?`, a: `${f.wh} Wh at ${f.volts} V — that is ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000.` },
      { q: `Can it fly?`, a: f.verdict === 'free' ? `Yes, it is under 100 Wh and boards without asking — but carry it in the cabin, never checked.` : f.verdict === 'approval' ? `It is over 100 Wh, so the airline has to approve it. Up to 160 Wh that approval is possible.` : `It is over 160 Wh and may not travel on a passenger aircraft.` },
      { q: `What is the free limit at this voltage?`, a: `${f.maxFree.toLocaleString()} mAh. Anything larger needs approval.` },
      { q: `What is it at 5 V?`, a: `${f.usbMah.toLocaleString()} mAh — the same energy, counted against a different voltage.` },
    ],
    f => [
      { q: `¿Cuántos vatios-hora son ${f.cell.mah.toLocaleString()} mAh?`, a: `${f.wh} Wh a ${f.volts} V: ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000.` },
      { q: `¿Puede volar?`, a: f.verdict === 'free' ? `Sí, está por debajo de 100 Wh y embarca sin permiso, pero siempre en cabina.` : f.verdict === 'approval' ? `Supera los 100 Wh, así que la aerolínea debe aprobarla. Hasta 160 Wh es posible.` : `Supera los 160 Wh y no puede viajar en avión de pasajeros.` },
      { q: `¿Cuál es el límite libre a esta tensión?`, a: `${f.maxFree.toLocaleString()} mAh. Por encima hace falta aprobación.` },
      { q: `¿Cuánto es a 5 V?`, a: `${f.usbMah.toLocaleString()} mAh: la misma energía, contada a otra tensión.` },
    ],
    f => [
      { q: `Quantos watts-hora são ${f.cell.mah.toLocaleString()} mAh?`, a: `${f.wh} Wh a ${f.volts} V: ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000.` },
      { q: `Pode voar?`, a: f.verdict === 'free' ? `Sim, está abaixo de 100 Wh e embarca sem pedir — mas sempre na cabine.` : f.verdict === 'approval' ? `Passa de 100 Wh, então a companhia precisa aprovar. Até 160 Wh isso é possível.` : `Passa de 160 Wh e não pode viajar em avião de passageiros.` },
      { q: `Qual o limite livre nesta tensão?`, a: `${f.maxFree.toLocaleString()} mAh. Acima disso é preciso aprovação.` },
      { q: `Quanto é a 5 V?`, a: `${f.usbMah.toLocaleString()} mAh: a mesma energia, contada em outra tensão.` },
    ],
    f => [
      { q: `${f.cell.mah.toLocaleString()}mAhは何Whですか？`, a: `${f.volts}V基準で${f.wh}Whです。${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000で計算します。` },
      { q: `飛行機に持ち込めますか？`, a: f.verdict === 'free' ? `はい、100Wh以内なのでそのまま持ち込めます。ただし預けずに機内へ。` : f.verdict === 'approval' ? `100Whを超えるので航空会社の承認が要ります。160Whまでは承認を受ければ可能です。` : `160Whを超えるので旅客機には載せられません。` },
      { q: `この電圧で自由な最大容量は？`, a: `${f.maxFree.toLocaleString()}mAhです。それより大きいと承認が要ります。` },
      { q: `5V基準ではいくつですか？`, a: `${f.usbMah.toLocaleString()}mAhです。エネルギーはそのままで基準の電圧だけ変えた値です。` },
    ],
    f => [
      { q: `Wie viele Wattstunden sind ${f.cell.mah.toLocaleString()} mAh?`, a: `${f.wh} Wh bei ${f.volts} V — also ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000.` },
      { q: `Darf sie ins Flugzeug?`, a: f.verdict === 'free' ? `Ja, unter 100 Wh und ohne Rückfrage — aber in die Kabine, nie ins Aufgabegepäck.` : f.verdict === 'approval' ? `Über 100 Wh, die Airline muss zustimmen. Bis 160 Wh ist das möglich.` : `Über 160 Wh — im Passagierflugzeug nicht erlaubt.` },
      { q: `Wie hoch ist die freie Grenze bei dieser Spannung?`, a: `${f.maxFree.toLocaleString()} mAh. Darüber braucht es eine Genehmigung.` },
      { q: `Wie viel ist das bei 5 V?`, a: `${f.usbMah.toLocaleString()} mAh — dieselbe Energie, nur an anderer Spannung gezählt.` },
    ],
    f => [
      { q: `Combien de wattheures font ${f.cell.mah.toLocaleString()} mAh ?`, a: `${f.wh} Wh à ${f.volts} V, soit ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000.` },
      { q: `Peut-elle voyager en avion ?`, a: f.verdict === 'free' ? `Oui, sous 100 Wh et sans formalité — mais en cabine, jamais en soute.` : f.verdict === 'approval' ? `Au-delà de 100 Wh : accord de la compagnie nécessaire, possible jusqu’à 160 Wh.` : `Au-delà de 160 Wh : interdite en avion de ligne.` },
      { q: `Quelle est la limite libre à cette tension ?`, a: `${f.maxFree.toLocaleString()} mAh. Au-dessus, il faut un accord.` },
      { q: `Combien cela fait-il à 5 V ?`, a: `${f.usbMah.toLocaleString()} mAh : la même énergie, comptée à une autre tension.` },
    ],
    f => [
      { q: `${f.cell.mah.toLocaleString()} mAh कितने वाट-घंटा हैं?`, a: `${f.volts} V पर ${f.wh} Wh — यानी ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000।` },
      { q: `क्या यह विमान में जा सकता है?`, a: f.verdict === 'free' ? `हाँ, 100 Wh से कम है और बिना पूछे जा सकता है — पर केबिन में, चेक-इन में नहीं।` : f.verdict === 'approval' ? `100 Wh से ऊपर है, एयरलाइन की अनुमति चाहिए। 160 Wh तक यह संभव है।` : `160 Wh से ऊपर है, यात्री विमान में नहीं जा सकता।` },
      { q: `इस वोल्टेज पर मुक्त सीमा क्या है?`, a: `${f.maxFree.toLocaleString()} mAh। इससे बड़ा हो तो अनुमति चाहिए।` },
      { q: `5 V पर यह कितना है?`, a: `${f.usbMah.toLocaleString()} mAh — वही ऊर्जा, बस दूसरे वोल्टेज पर गिनी गई।` },
    ],
    f => [
      { q: `${f.cell.mah.toLocaleString()}mAh 是多少瓦时？`, a: `按 ${f.volts}V 计为 ${f.wh}Wh，即 ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000。` },
      { q: `能带上飞机吗？`, a: f.verdict === 'free' ? `能。不到 100Wh，可以直接带，但要随身别托运。` : f.verdict === 'approval' ? `超过 100Wh，需要航空公司批准。160Wh 以内批准后可带。` : `超过 160Wh，客机不能携带。` },
      { q: `该电压下可直接带的最大容量？`, a: `${f.maxFree.toLocaleString()}mAh，再大就要批准。` },
      { q: `按 5V 折算是多少？`, a: `${f.usbMah.toLocaleString()}mAh。能量没变，只是换了折算电压。` },
    ],
    f => [
      { q: `${f.cell.mah.toLocaleString()}mAh 是多少瓦時？`, a: `按 ${f.volts}V 計為 ${f.wh}Wh，即 ${f.cell.mah.toLocaleString()} × ${f.volts} ÷ 1000。` },
      { q: `能帶上飛機嗎？`, a: f.verdict === 'free' ? `能。不到 100Wh，可以直接帶，但要隨身別託運。` : f.verdict === 'approval' ? `超過 100Wh，需要航空公司批准。160Wh 以內批准後可帶。` : `超過 160Wh，客機不能攜帶。` },
      { q: `該電壓下可直接帶的最大容量？`, a: `${f.maxFree.toLocaleString()}mAh，再大就要批准。` },
      { q: `按 5V 折算是多少？`, a: `${f.usbMah.toLocaleString()}mAh。能量沒變，只是換了折算電壓。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const POWERBANK_UI: L<PowerUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PowerUI>;
