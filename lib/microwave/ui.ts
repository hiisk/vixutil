/**
 * 전자레인지 와트 환산 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { MicrowaveFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface MicrowaveUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  fromLabel: string;
  toLabel: string;
  ratioLabel: string;
  changeLabel: string;
  sampleLabel: (seconds: number) => string;
  reverseLabel: string;
  ruleTitle: string;
  ruleNote: string;
  sameTitle: string;
  sameNote: string;
  evenTitle: string;
  evenNote: string;
  levelTitle: string;
  levelNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  fromRowTitle: string;
  toRowTitle: string;
  desc: (f: MicrowaveFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: MicrowaveFacts) => string;
  metaDesc: (f: MicrowaveFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: MicrowaveFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 초를 분으로 읽어 주는 이름표 */
const sample = (unit: (n: number) => string) => (seconds: number) => unit(seconds / 60);

type Spec = { [K in keyof MicrowaveUI]: L<MicrowaveUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('전자레인지 와트 환산', 'Microwave wattage', 'Vatios del microondas', 'Watts do micro-ondas', '電子レンジのワット換算', 'Mikrowellen-Wattzahl', 'Puissance du micro-ondes', 'माइक्रोवेव वॉट', '微波炉功率换算', '微波爐功率換算'),

  hubTitle: T(
    '전자레인지 144칸 — 700W 3분은 1000W에서 2분 6초입니다',
    '144 microwave cells — three minutes at 700 W is 2:06 at 1000 W',
    '144 casillas de microondas — tres minutos a 700 W son 2:06 a 1000 W',
    '144 células de micro-ondas — três minutos a 700 W são 2:06 a 1000 W',
    '電子レンジ144マス — 700Wで3分は1000Wで2分6秒です',
    '144 Mikrowellenfelder — drei Minuten bei 700 W sind 2:06 bei 1000 W',
    '144 cases de micro-ondes — trois minutes à 700 W font 2:06 à 1000 W',
    '144 माइक्रोवेव खाने — 700 W पर तीन मिनट = 1000 W पर 2:06',
    '144 格微波炉 — 700W 三分钟，在 1000W 是 2 分 6 秒',
    '144 格微波爐 — 700W 三分鐘，在 1000W 是 2 分 6 秒',
  ),

  hubLead: T(
    '포장지에 적힌 출력과 내 전자레인지의 출력이 다르면 시간을 고쳐야 합니다. 음식이 받는 에너지는 출력 × 시간이라, 출력이 커진 만큼 시간을 줄이면 같은 양이 들어갑니다. 출력 열두 가지끼리 서로 옮긴 144칸입니다.',
    'When the wattage on the packet differs from your own oven, the time has to change. The energy that reaches the food is power × time, so raising the power and cutting the time in proportion delivers the same amount. Here are all 144 pairings of twelve common wattages.',
    'Cuando los vatios del envase no coinciden con los de tu horno, hay que ajustar el tiempo. La energía que recibe la comida es potencia × tiempo, así que subir la potencia y recortar el tiempo en la misma proporción entrega lo mismo. Aquí están los 144 cruces de doce potencias.',
    'Quando os watts da embalagem não batem com os do seu forno, o tempo precisa mudar. A energia que chega ao alimento é potência × tempo, então subir a potência e cortar o tempo na mesma proporção entrega o mesmo. Aqui estão os 144 cruzamentos de doze potências.',
    'パッケージに書かれた出力と自分の電子レンジの出力が違えば時間を直す必要があります。食品が受けるエネルギーは出力 × 時間なので、出力が上がった分だけ時間を減らせば同じ量が入ります。出力12通りを互いに移した144マスです。',
    'Weicht die Wattzahl auf der Packung von der eigenen Mikrowelle ab, muss die Zeit angepasst werden. Die Energie im Essen ist Leistung × Zeit — mehr Leistung bei entsprechend kürzerer Zeit liefert dieselbe Menge. Hier alle 144 Paarungen von zwölf gängigen Wattzahlen.',
    'Quand la puissance indiquée sur l’emballage diffère de celle de votre four, il faut corriger le temps. L’énergie reçue par l’aliment vaut puissance × temps : monter la puissance en réduisant le temps d’autant délivre la même quantité. Voici les 144 croisements de douze puissances.',
    'पैकेट पर लिखी वॉट और आपके ओवन की वॉट अलग हों तो समय बदलना पड़ता है। भोजन को मिलने वाली ऊर्जा = शक्ति × समय, इसलिए शक्ति बढ़ाकर उसी अनुपात में समय घटाने पर उतनी ही ऊर्जा जाती है। बारह सामान्य वॉट के सभी 144 मेल यहाँ हैं।',
    '包装上标的功率和你家微波炉不同时，时间就得改。食物吸收的能量是功率 × 时间，功率提高多少、时间就减多少，进去的能量一样。这里是十二种常见功率两两相配的 144 格。',
    '包裝上標的功率和你家微波爐不同時，時間就得改。食物吸收的能量是功率 × 時間，功率提高多少、時間就減多少，進去的能量一樣。這裡是十二種常見功率兩兩相配的 144 格。',
  ),

  fromLabel: T('포장지의 출력', 'Wattage on the packet', 'Vatios del envase', 'Watts da embalagem', 'パッケージの出力', 'Wattzahl auf der Packung', 'Puissance de l’emballage', 'पैकेट की वॉट', '包装标注功率', '包裝標註功率'),
  toLabel: T('내 전자레인지', 'My microwave', 'Mi microondas', 'Meu micro-ondas', '自分の電子レンジ', 'Meine Mikrowelle', 'Mon micro-ondes', 'मेरा माइक्रोवेव', '我的微波炉', '我的微波爐'),
  ratioLabel: T('시간에 곱할 값', 'Multiply the time by', 'Multiplica el tiempo por', 'Multiplique o tempo por', '時間に掛ける値', 'Zeit multiplizieren mit', 'Multiplier le temps par', 'समय को गुणा करें', '时间乘以', '時間乘以'),
  changeLabel: T('시간 변화', 'Change in time', 'Cambio de tiempo', 'Mudança de tempo', '時間の変化', 'Zeitänderung', 'Variation du temps', 'समय में बदलाव', '时间变化', '時間變化'),
  sampleLabel: T<(s: number) => string>(
    sample(n => `${n}분이면`), sample(n => `${n} min becomes`), sample(n => `${n} min pasa a`), sample(n => `${n} min vira`),
    sample(n => `${n}分なら`), sample(n => `${n} min werden`), sample(n => `${n} min deviennent`), sample(n => `${n} मिनट बनते हैं`),
    sample(n => `${n} 分钟变成`), sample(n => `${n} 分鐘變成`),
  ),
  reverseLabel: T('반대로 옮기면', 'The other way round', 'A la inversa', 'No sentido inverso', '逆に移すと', 'Umgekehrt', 'Dans l’autre sens', 'उल्टी दिशा में', '反过来换算', '反過來換算'),

  ruleTitle: T('반비례입니다', 'It is an inverse proportion', 'Es una proporción inversa', 'É uma proporção inversa', '反比例です', 'Es ist eine umgekehrte Proportion', 'C’est une proportion inverse', 'यह व्युत्क्रम अनुपात है', '这是反比', '這是反比'),

  ruleNote: T(
    '새 시간 = 원래 시간 × (원래 출력 ÷ 새 출력)입니다. 700W에서 3분이면 1000W에서는 3 × 700 ÷ 1000 = 2분 6초입니다. 출력이 커질수록 시간이 짧아지고, 두 출력이 같으면 곱하는 값이 1이 되어 시간이 그대로입니다.',
    'New time = old time × (old wattage ÷ new wattage). Three minutes at 700 W becomes 3 × 700 ÷ 1000 = 2:06 at 1000 W. More power means less time, and when the two wattages match the multiplier is one and nothing changes.',
    'Tiempo nuevo = tiempo antiguo × (vatios antiguos ÷ vatios nuevos). Tres minutos a 700 W pasan a 3 × 700 ÷ 1000 = 2:06 a 1000 W. Más potencia, menos tiempo; y si las potencias coinciden el multiplicador vale uno y nada cambia.',
    'Tempo novo = tempo antigo × (watts antigos ÷ watts novos). Três minutos a 700 W viram 3 × 700 ÷ 1000 = 2:06 a 1000 W. Mais potência, menos tempo; e se as potências coincidem o multiplicador vale um e nada muda.',
    '新しい時間 = 元の時間 × (元の出力 ÷ 新しい出力)です。700Wで3分なら1000Wでは3 × 700 ÷ 1000 = 2分6秒です。出力が上がるほど時間は短くなり、2つの出力が同じなら掛ける値が1になって時間はそのままです。',
    'Neue Zeit = alte Zeit × (alte Wattzahl ÷ neue Wattzahl). Drei Minuten bei 700 W werden zu 3 × 700 ÷ 1000 = 2:06 bei 1000 W. Mehr Leistung heißt weniger Zeit; stimmen beide Wattzahlen überein, ist der Faktor eins und nichts ändert sich.',
    'Nouveau temps = ancien temps × (ancienne puissance ÷ nouvelle puissance). Trois minutes à 700 W deviennent 3 × 700 ÷ 1000 = 2:06 à 1000 W. Plus de puissance, moins de temps ; et si les deux puissances coïncident, le facteur vaut un et rien ne change.',
    'नया समय = पुराना समय × (पुरानी वॉट ÷ नई वॉट)। 700 W पर तीन मिनट, 1000 W पर 3 × 700 ÷ 1000 = 2:06 हो जाते हैं। शक्ति बढ़े तो समय घटे; और दोनों वॉट समान हों तो गुणक एक होता है और कुछ नहीं बदलता।',
    '新时间 = 原时间 ×（原功率 ÷ 新功率）。700W 三分钟，到 1000W 就是 3 × 700 ÷ 1000 = 2 分 6 秒。功率越大时间越短；两个功率相同时乘数为 1，时间不变。',
    '新時間 = 原時間 ×（原功率 ÷ 新功率）。700W 三分鐘，到 1000W 就是 3 × 700 ÷ 1000 = 2 分 6 秒。功率越大時間越短；兩個功率相同時乘數為 1，時間不變。',
  ),

  sameTitle: T('내 전자레인지의 출력은 어디에 적혀 있나', 'Where to find your own wattage', 'Dónde ver los vatios de tu horno', 'Onde ver os watts do seu forno', '自分の電子レンジの出力はどこに', 'Wo die eigene Wattzahl steht', 'Où trouver la puissance de son four', 'अपने ओवन की वॉट कहाँ मिलेगी', '自家微波炉的功率写在哪', '自家微波爐的功率寫在哪'),

  sameNote: T(
    '문 안쪽이나 뒷면의 명판에 적혀 있습니다. 다만 거기 적힌 값이 두 가지일 수 있으니 주의해야 합니다 — 소비 전력(입력)과 조리 출력이 다르고, 환산에 써야 하는 것은 **조리 출력**입니다. 소비 전력이 1400W인 제품의 조리 출력이 900W인 식으로, 보통 입력이 더 큽니다.',
    'Look at the plate inside the door or on the back. Careful, though: two numbers may be printed there. Input power and cooking output are different, and the one to use is the **cooking output**. A unit drawing 1400 W often cooks at 900 W — the input figure is usually the larger one.',
    'Mira la placa del interior de la puerta o de la parte trasera. Ojo: pueden figurar dos números. La potencia consumida y la de cocción no son lo mismo, y aquí hace falta la **potencia de cocción**. Un aparato que consume 1400 W suele cocinar a 900 W: el consumo es el número mayor.',
    'Veja a placa dentro da porta ou na traseira. Cuidado: pode haver dois números. A potência consumida e a de cocção são diferentes, e aqui vale a **potência de cocção**. Um aparelho que consome 1400 W costuma cozinhar a 900 W — o consumo é o número maior.',
    'ドアの内側か背面の銘板に書いてあります。ただしそこに二つの値があることがあるので注意が必要です — 消費電力(入力)と調理出力は違い、換算に使うのは**調理出力**です。消費電力1400Wの製品の調理出力が900Wという具合に、たいてい入力のほうが大きいです。',
    'Auf dem Schild in der Tür oder auf der Rückseite. Achtung: dort können zwei Zahlen stehen. Anschlussleistung und Garleistung sind verschieden — gebraucht wird die **Garleistung**. Ein Gerät mit 1400 W Aufnahme gart oft mit 900 W; die Aufnahme ist meist die größere Zahl.',
    'Sur la plaque à l’intérieur de la porte ou au dos. Attention : deux nombres peuvent y figurer. La puissance absorbée et la puissance de cuisson diffèrent, et c’est la **puissance de cuisson** qu’il faut. Un appareil qui consomme 1400 W cuit souvent à 900 W : l’absorbée est la plus grande.',
    'दरवाज़े के अंदर या पीछे की प्लेट पर लिखा होता है। सावधानी: वहाँ दो संख्याएँ हो सकती हैं। खपत शक्ति और पकाने की शक्ति अलग हैं, और यहाँ **पकाने की शक्ति** चाहिए। 1400 W खपत वाला उपकरण अक्सर 900 W पर पकाता है — खपत बड़ी संख्या होती है।',
    '看门内侧或背面的铭牌。要注意那里可能有两个数字：输入功率和加热输出功率不是一回事，换算要用**加热输出功率**。输入 1400W 的机器，输出常常是 900W——输入通常更大。',
    '看門內側或背面的銘牌。要注意那裡可能有兩個數字：輸入功率和加熱輸出功率不是一回事，換算要用**加熱輸出功率**。輸入 1400W 的機器，輸出常常是 900W——輸入通常更大。',
  ),

  evenTitle: T('에너지는 맞아도 고루 익지는 않습니다', 'The energy matches, the evenness may not', 'La energía coincide, la uniformidad no', 'A energia bate, a uniformidade não', 'エネルギーは合っても均一には温まりません', 'Die Energie stimmt, die Gleichmäßigkeit nicht', 'L’énergie correspond, l’uniformité non', 'ऊर्जा मिलती है, समान गर्माहट नहीं', '能量对得上，受热未必均匀', '能量對得上，受熱未必均勻'),

  evenNote: T(
    '이 환산은 넣은 에너지를 맞추는 것일 뿐입니다. 출력이 높으면 짧은 시간에 몰아넣게 되어 겉이 먼저 뜨거워지고 속은 덜 데워집니다. 그래서 옮긴 시간을 반으로 나눠 두 번 돌리거나 중간에 한 번 저어 주는 편이 낫습니다 — 특히 국물이 있는 음식과 두꺼운 덩어리가 그렇습니다.',
    'This conversion only matches the energy delivered. Higher power packs that energy into a shorter burst, so the outside heats first while the middle lags. Splitting the converted time in half and stirring between the two runs works better — especially for liquids and thick pieces.',
    'La conversión solo iguala la energía entregada. Más potencia la concentra en menos tiempo, así que el exterior se calienta primero y el centro se queda atrás. Conviene partir el tiempo convertido en dos y remover entre medias, sobre todo con líquidos y piezas gruesas.',
    'A conversão só iguala a energia entregue. Mais potência concentra essa energia em menos tempo, então a parte de fora esquenta primeiro e o miolo fica para trás. Vale dividir o tempo convertido em dois e mexer no meio — sobretudo com líquidos e peças grossas.',
    'この換算は入れたエネルギーを合わせるだけです。出力が高いと短い時間に集中して入るので、外側が先に熱くなり中は温まりきりません。だから移した時間を半分に分けて二回回すか、途中で一度かき混ぜるほうがよいです — とくに汁気のある食品と厚い塊がそうです。',
    'Diese Umrechnung gleicht nur die zugeführte Energie an. Höhere Leistung drückt sie in einen kürzeren Stoß, außen wird es zuerst heiß, innen bleibt es zurück. Besser ist, die umgerechnete Zeit zu halbieren und zwischendurch umzurühren — vor allem bei Flüssigem und dicken Stücken.',
    'Cette conversion n’égalise que l’énergie fournie. Une puissance plus élevée la concentre sur un temps plus court : l’extérieur chauffe d’abord, le cœur suit mal. Mieux vaut couper le temps converti en deux et remuer entre les deux passages — surtout pour les liquides et les pièces épaisses.',
    'यह रूपांतरण केवल दी गई ऊर्जा मिलाता है। अधिक शक्ति उसे कम समय में ठूँस देती है, तो बाहर पहले गरम होता है और भीतर पिछड़ जाता है। बेहतर है कि बदले हुए समय को आधा-आधा कर दो बार चलाएँ और बीच में चला दें — ख़ासकर तरल और मोटे टुकड़ों के लिए।',
    '这个换算只让进入的能量一致。功率高就是把能量压进更短的时间，外面先热、里面跟不上。把换算后的时间分成两段、中间搅一下更好——尤其是带汤汁的和厚块的食物。',
    '這個換算只讓進入的能量一致。功率高就是把能量壓進更短的時間，外面先熱、裡面跟不上。把換算後的時間分成兩段、中間攪一下更好——尤其是帶湯汁的和厚塊的食物。',
  ),

  levelTitle: T('출력 단계를 낮추는 것과는 다릅니다', 'Not the same as turning the power level down', 'No es lo mismo que bajar el nivel', 'Não é o mesmo que baixar o nível', '出力レベルを下げるのとは違います', 'Nicht dasselbe wie eine niedrigere Stufe', 'Ce n’est pas baisser le niveau de puissance', 'पावर लेवल घटाने से अलग है', '和调低火力档不是一回事', '和調低火力檔不是一回事'),

  levelNote: T(
    '가정용 전자레인지는 출력을 실제로 낮추지 못하고, 최대 출력으로 켰다 껐다 하며 평균을 맞춥니다. 그래서 "50% 출력 4분"과 "100% 출력 2분"은 들어간 에너지가 같아도 결과가 다릅니다 — 앞쪽은 켜고 끄는 사이에 열이 안쪽으로 퍼질 시간이 있습니다. 이 표는 기기끼리의 환산이지 단계 환산이 아닙니다.',
    'A household microwave cannot really dial its power down; it switches full power on and off to average it out. So “50 % for four minutes” and “100 % for two” deliver the same energy but not the same result — the first leaves time between bursts for heat to spread inward. This table converts between ovens, not between power levels.',
    'Un microondas doméstico no baja realmente su potencia: enciende y apaga a plena potencia para promediar. Por eso «50 % durante cuatro minutos» y «100 % durante dos» entregan la misma energía pero no el mismo resultado: el primero deja tiempo entre pulsos para que el calor entre. Esta tabla convierte entre aparatos, no entre niveles.',
    'Um micro-ondas doméstico não baixa a potência de verdade: liga e desliga em potência plena para tirar a média. Por isso «50 % por quatro minutos» e «100 % por dois» entregam a mesma energia mas não o mesmo resultado — o primeiro dá tempo entre os pulsos para o calor entrar. Esta tabela converte entre aparelhos, não entre níveis.',
    '家庭用電子レンジは出力を実際に下げられず、最大出力で入切しながら平均を合わせます。だから「50%出力で4分」と「100%出力で2分」は入ったエネルギーが同じでも結果が違います — 前者は入切の間に熱が内側へ広がる時間があります。この表は機器どうしの換算であって、レベルの換算ではありません。',
    'Eine Haushaltsmikrowelle regelt die Leistung nicht wirklich herunter; sie schaltet volle Leistung getaktet ein und aus. Darum liefern „50 % für vier Minuten“ und „100 % für zwei“ dieselbe Energie, aber nicht dasselbe Ergebnis — beim ersten hat die Wärme zwischen den Takten Zeit, nach innen zu wandern. Diese Tabelle rechnet zwischen Geräten um, nicht zwischen Stufen.',
    'Un micro-ondes domestique ne réduit pas vraiment sa puissance : il enclenche et coupe la pleine puissance pour en faire la moyenne. Ainsi « 50 % pendant quatre minutes » et « 100 % pendant deux » délivrent la même énergie sans donner le même résultat — le premier laisse à la chaleur le temps de gagner le cœur. Ce tableau convertit entre appareils, pas entre niveaux.',
    'घरेलू माइक्रोवेव सचमुच शक्ति नहीं घटाता; वह पूरी शक्ति पर चालू-बंद करके औसत बनाता है। इसलिए «50% पर चार मिनट» और «100% पर दो मिनट» समान ऊर्जा देते हैं पर परिणाम अलग — पहले में दालों के बीच गर्मी को भीतर फैलने का समय मिलता है। यह तालिका उपकरणों के बीच बदलती है, स्तरों के बीच नहीं।',
    '家用微波炉并不能真的降低功率，而是以满功率通断来取平均。所以"50% 火力四分钟"和"100% 火力两分钟"进入的能量一样，结果却不同——前者在通断间隙给了热量向内扩散的时间。本表换算的是机器之间，不是火力档之间。',
    '家用微波爐並不能真的降低功率，而是以滿功率通斷來取平均。所以「50% 火力四分鐘」和「100% 火力兩分鐘」進入的能量一樣，結果卻不同——前者在通斷間隙給了熱量向內擴散的時間。本表換算的是機器之間，不是火力檔之間。',
  ),

  careTitle: T('짧게 여러 번 확인하십시오', 'Check in short bursts', 'Comprueba en tandas cortas', 'Confira em intervalos curtos', '短く何度も確かめてください', 'Lieber in kurzen Schüben prüfen', 'Vérifiez par courtes reprises', 'छोटे-छोटे अंतराल में देखें', '分几次短时间确认', '分幾次短時間確認'),

  careNote: T(
    '옮긴 시간은 출발점입니다. 음식의 양과 처음 온도, 그릇에 따라 실제로 필요한 시간이 달라지므로, 계산한 시간의 8할쯤에서 한 번 열어 보고 모자라면 짧게 더 돌리는 편이 안전합니다. 지나치게 익힌 것은 되돌릴 수 없습니다.',
    'The converted time is a starting point. The amount of food, its starting temperature and the dish all shift what is actually needed, so stop at about eighty per cent of the calculated time, check, and add short bursts if it needs them. Overcooking cannot be undone.',
    'El tiempo convertido es un punto de partida. La cantidad, la temperatura inicial y el recipiente cambian lo que hace falta de verdad: para en torno al ochenta por ciento del tiempo calculado, comprueba y añade tandas cortas si hace falta. Lo pasado de punto no se arregla.',
    'O tempo convertido é um ponto de partida. A quantidade, a temperatura inicial e o recipiente mudam o que é preciso de fato: pare em torno de oitenta por cento do tempo calculado, confira e acrescente intervalos curtos se faltar. O que passou do ponto não volta.',
    '移した時間は出発点です。food の量や最初の温度、器によって実際に必要な時間が変わるので、計算した時間の8割ほどで一度開けて見て、足りなければ短く足すほうが安全です。加熱しすぎたものは戻せません。',
    'Die umgerechnete Zeit ist ein Ausgangspunkt. Menge, Ausgangstemperatur und Geschirr verschieben den tatsächlichen Bedarf — bei rund achtzig Prozent der berechneten Zeit nachsehen und bei Bedarf kurz nachlegen. Übergartes lässt sich nicht zurückholen.',
    'Le temps converti est un point de départ. La quantité, la température de départ et le plat modifient le besoin réel : arrêtez vers quatre-vingts pour cent du temps calculé, vérifiez, puis relancez par courtes reprises. Un aliment trop cuit ne se rattrape pas.',
    'बदला हुआ समय शुरुआती बिंदु है। मात्रा, प्रारंभिक तापमान और बर्तन से असली ज़रूरत बदलती है — गणना किए समय के लगभग अस्सी प्रतिशत पर रोककर देखें और कमी हो तो छोटे-छोटे अंतराल जोड़ें। ज़्यादा पक गया तो वापस नहीं आता।',
    '换算出来的时间只是起点。分量、初始温度和容器都会改变真正需要的时间，所以在算得时间的八成左右先停下看看，不够再短时间加热。过火了就没法挽回。',
    '換算出來的時間只是起點。分量、初始溫度和容器都會改變真正需要的時間，所以在算得時間的八成左右先停下看看，不夠再短時間加熱。過火了就沒法挽回。',
  ),

  tableTitle: T('두 출력으로 찾기', 'Find it by the two wattages', 'Búscalo por las dos potencias', 'Ache pelas duas potências', '2つの出力から探す', 'Nach den beiden Wattzahlen suchen', 'Chercher par les deux puissances', 'दोनों वॉट से देखें', '按两个功率查找', '按兩個功率查找'),
  neighbourTitle: T('가까운 출력', 'Nearby wattages', 'Potencias cercanas', 'Potências próximas', '近い出力', 'Wattzahlen daneben', 'Puissances voisines', 'पास की वॉट', '相邻功率', '相鄰功率'),
  fromRowTitle: T('같은 포장지 출력', 'Same packet wattage', 'Mismos vatios de envase', 'Mesmos watts de embalagem', '同じパッケージ出力', 'Gleiche Packungswattzahl', 'Même puissance d’emballage', 'वही पैकेट वॉट', '同一包装功率', '同一包裝功率'),
  toRowTitle: T('같은 내 전자레인지', 'Same oven', 'Mismo microondas', 'Mesmo micro-ondas', '同じ電子レンジ', 'Gleiche Mikrowelle', 'Même four', 'वही ओवन', '同一台微波炉', '同一台微波爐'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '새 시간 = 원래 시간 × (원래 출력 ÷ 새 출력)',
      '두 출력이 같으면 곱하는 값이 1이라 시간이 그대로입니다.',
      '명판의 소비 전력이 아니라 조리 출력을 씁니다.',
      '계산한 시간의 8할에서 한 번 확인하고 짧게 더 돌리십시오.',
    ],
    [
      'New time = old time × (old wattage ÷ new wattage).',
      'When the two wattages match, the multiplier is one and the time stands.',
      'Use the cooking output on the plate, not the input power.',
      'Check at about eighty per cent of the calculated time and add short bursts.',
    ],
    [
      'Tiempo nuevo = tiempo antiguo × (vatios antiguos ÷ vatios nuevos).',
      'Si las potencias coinciden, el multiplicador vale uno y el tiempo no cambia.',
      'Usa la potencia de cocción de la placa, no la consumida.',
      'Comprueba al ochenta por ciento del tiempo calculado y añade tandas cortas.',
    ],
    [
      'Tempo novo = tempo antigo × (watts antigos ÷ watts novos).',
      'Se as potências coincidem, o multiplicador vale um e o tempo fica.',
      'Use a potência de cocção da placa, não a consumida.',
      'Confira aos oitenta por cento do tempo calculado e acrescente intervalos curtos.',
    ],
    [
      '新しい時間 = 元の時間 × (元の出力 ÷ 新しい出力)',
      '2つの出力が同じなら掛ける値が1で時間はそのままです。',
      '銘板の消費電力ではなく調理出力を使います。',
      '計算した時間の8割で一度確かめ、足りなければ短く足します。',
    ],
    [
      'Neue Zeit = alte Zeit × (alte Wattzahl ÷ neue Wattzahl).',
      'Stimmen beide Wattzahlen überein, ist der Faktor eins und die Zeit bleibt.',
      'Die Garleistung vom Schild nehmen, nicht die Anschlussleistung.',
      'Bei achtzig Prozent der berechneten Zeit prüfen und kurz nachlegen.',
    ],
    [
      'Nouveau temps = ancien temps × (ancienne puissance ÷ nouvelle puissance).',
      'Si les deux puissances coïncident, le facteur vaut un et le temps ne bouge pas.',
      'Prendre la puissance de cuisson de la plaque, pas la puissance absorbée.',
      'Vérifier à quatre-vingts pour cent du temps calculé, puis relancer brièvement.',
    ],
    [
      'नया समय = पुराना समय × (पुरानी वॉट ÷ नई वॉट)।',
      'दोनों वॉट समान हों तो गुणक एक होता है और समय वही रहता है।',
      'प्लेट पर लिखी पकाने की शक्ति लें, खपत शक्ति नहीं।',
      'गणना किए समय के अस्सी प्रतिशत पर देखें और छोटे अंतराल जोड़ें।',
    ],
    [
      '新时间 = 原时间 ×（原功率 ÷ 新功率）。',
      '两个功率相同时乘数为 1，时间不变。',
      '用铭牌上的加热输出功率，不是输入功率。',
      '在算得时间的八成先看一次，不够再短时间加热。',
    ],
    [
      '新時間 = 原時間 ×（原功率 ÷ 新功率）。',
      '兩個功率相同時乘數為 1，時間不變。',
      '用銘牌上的加熱輸出功率，不是輸入功率。',
      '在算得時間的八成先看一次，不夠再短時間加熱。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '전자레인지 와트 환산 — 700W 조리 시간을 내 출력으로',
    'Microwave wattage conversion — moving a cooking time to your own oven',
    'Conversión de vatios del microondas — el tiempo a tu potencia',
    'Conversão de watts do micro-ondas — o tempo para a sua potência',
    '電子レンジのワット換算 — 700Wの調理時間を自分の出力に',
    'Mikrowellen-Wattumrechnung — Garzeit auf die eigene Leistung',
    'Conversion de puissance micro-ondes — le temps à votre puissance',
    'माइक्रोवेव वॉट रूपांतरण — समय को अपनी वॉट पर',
    '微波炉功率换算 — 把加热时间换成你家的功率',
    '微波爐功率換算 — 把加熱時間換成你家的功率',
  ),

  hubMetaDesc: T(
    '700W에서 3분이면 1000W에서는 2분 6초, 500W에서는 4분 12초입니다. 새 시간 = 원래 시간 × (원래 출력 ÷ 새 출력)입니다. 출력 열두 가지끼리 서로 옮긴 144칸.',
    'Three minutes at 700 W is 2:06 at 1000 W and 4:12 at 500 W. New time = old time × (old wattage ÷ new wattage). All 144 pairings of twelve common wattages.',
    'Tres minutos a 700 W son 2:06 a 1000 W y 4:12 a 500 W. Tiempo nuevo = tiempo antiguo × (vatios antiguos ÷ vatios nuevos). Los 144 cruces de doce potencias.',
    'Três minutos a 700 W são 2:06 a 1000 W e 4:12 a 500 W. Tempo novo = tempo antigo × (watts antigos ÷ watts novos). Os 144 cruzamentos de doze potências.',
    '700Wで3分なら1000Wでは2分6秒、500Wでは4分12秒です。新しい時間 = 元の時間 × (元の出力 ÷ 新しい出力)。出力12通りを互いに移した144マス。',
    'Drei Minuten bei 700 W sind 2:06 bei 1000 W und 4:12 bei 500 W. Neue Zeit = alte Zeit × (alte Wattzahl ÷ neue Wattzahl). Alle 144 Paarungen von zwölf Wattzahlen.',
    'Trois minutes à 700 W font 2:06 à 1000 W et 4:12 à 500 W. Nouveau temps = ancien temps × (ancienne puissance ÷ nouvelle puissance). Les 144 croisements de douze puissances.',
    '700 W पर तीन मिनट = 1000 W पर 2:06 और 500 W पर 4:12। नया समय = पुराना समय × (पुरानी वॉट ÷ नई वॉट)। बारह वॉट के सभी 144 मेल।',
    '700W 三分钟，在 1000W 是 2 分 6 秒，在 500W 是 4 分 12 秒。新时间 = 原时间 ×（原功率 ÷ 新功率）。十二种功率两两相配共 144 格。',
    '700W 三分鐘，在 1000W 是 2 分 6 秒，在 500W 是 4 分 12 秒。新時間 = 原時間 ×（原功率 ÷ 新功率）。十二種功率兩兩相配共 144 格。',
  ),

  desc: T<(f: MicrowaveFacts) => string>(
    f => f.same ? `출력이 같으므로 시간을 고칠 것이 없습니다.` : `시간에 ${f.ratio}을 곱하면 됩니다. ${f.longer ? `${f.changePct}% 길어집니다.` : `${-f.changePct}% 짧아집니다.`}`,
    f => f.same ? `The wattages match, so the time needs no change.` : `Multiply the time by ${f.ratio} — ${f.longer ? `${f.changePct} % longer.` : `${-f.changePct} % shorter.`}`,
    f => f.same ? `Las potencias coinciden: el tiempo no cambia.` : `Multiplica el tiempo por ${f.ratio}: ${f.longer ? `un ${f.changePct} % más.` : `un ${-f.changePct} % menos.`}`,
    f => f.same ? `As potências coincidem: o tempo não muda.` : `Multiplique o tempo por ${f.ratio}: ${f.longer ? `${f.changePct} % a mais.` : `${-f.changePct} % a menos.`}`,
    f => f.same ? `出力が同じなので時間を直す必要はありません。` : `時間に${f.ratio}を掛けます。${f.longer ? `${f.changePct}%長くなります。` : `${-f.changePct}%短くなります。`}`,
    f => f.same ? `Die Wattzahlen stimmen überein, die Zeit bleibt.` : `Die Zeit mit ${f.ratio} multiplizieren — ${f.longer ? `${f.changePct} % länger.` : `${-f.changePct} % kürzer.`}`,
    f => f.same ? `Les puissances coïncident : le temps ne change pas.` : `Multipliez le temps par ${f.ratio} — ${f.longer ? `${f.changePct} % de plus.` : `${-f.changePct} % de moins.`}`,
    f => f.same ? `वॉट समान हैं, समय बदलने की ज़रूरत नहीं।` : `समय को ${f.ratio} से गुणा करें — ${f.longer ? `${f.changePct}% अधिक।` : `${-f.changePct}% कम।`}`,
    f => f.same ? `功率相同，时间不用改。` : `把时间乘以 ${f.ratio}，${f.longer ? `延长 ${f.changePct}%。` : `缩短 ${-f.changePct}%。`}`,
    f => f.same ? `功率相同，時間不用改。` : `把時間乘以 ${f.ratio}，${f.longer ? `延長 ${f.changePct}%。` : `縮短 ${-f.changePct}%。`}`,
  ),

  metaTitle: T<(f: MicrowaveFacts) => string>(
    f => `${f.cell.from}W → ${f.cell.to}W — 시간 ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — time ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — tiempo ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — tempo ×${f.ratio}`,
    f => `${f.cell.from}W → ${f.cell.to}W — 時間 ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — Zeit ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — temps ×${f.ratio}`,
    f => `${f.cell.from} W → ${f.cell.to} W — समय ×${f.ratio}`,
    f => `${f.cell.from}W → ${f.cell.to}W — 时间 ×${f.ratio}`,
    f => `${f.cell.from}W → ${f.cell.to}W — 時間 ×${f.ratio}`,
  ),

  metaDesc: T<(f: MicrowaveFacts) => string>(
    f => `포장지의 ${f.cell.from}W 기준 시간을 ${f.cell.to}W 전자레인지로 옮기려면 ${f.ratio}을 곱합니다. 1분은 ${f.samples[0].converted}초, 3분은 ${f.samples[1].minutes}분 ${f.samples[1].rest}초, 5분은 ${f.samples[2].minutes}분 ${f.samples[2].rest}초입니다.`,
    f => `To move a time given for ${f.cell.from} W onto a ${f.cell.to} W oven, multiply by ${f.ratio}. One minute becomes ${f.samples[0].converted} s, three minutes ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}, five minutes ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.`,
    f => `Para pasar un tiempo dado a ${f.cell.from} W a un microondas de ${f.cell.to} W, multiplica por ${f.ratio}. Un minuto son ${f.samples[0].converted} s; tres minutos, ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}; cinco minutos, ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.`,
    f => `Para levar um tempo dado a ${f.cell.from} W para um micro-ondas de ${f.cell.to} W, multiplique por ${f.ratio}. Um minuto vira ${f.samples[0].converted} s; três minutos, ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}; cinco minutos, ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.`,
    f => `パッケージの${f.cell.from}W基準の時間を${f.cell.to}Wの電子レンジに移すには${f.ratio}を掛けます。1分は${f.samples[0].converted}秒、3分は${f.samples[1].minutes}分${f.samples[1].rest}秒、5分は${f.samples[2].minutes}分${f.samples[2].rest}秒です。`,
    f => `Um eine für ${f.cell.from} W angegebene Zeit auf eine ${f.cell.to}-W-Mikrowelle zu übertragen, mit ${f.ratio} multiplizieren. Eine Minute wird zu ${f.samples[0].converted} s, drei Minuten zu ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}, fünf Minuten zu ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.`,
    f => `Pour porter un temps donné à ${f.cell.from} W sur un four de ${f.cell.to} W, multipliez par ${f.ratio}. Une minute devient ${f.samples[0].converted} s, trois minutes ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}, cinq minutes ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.`,
    f => `${f.cell.from} W के लिए दिए समय को ${f.cell.to} W ओवन पर लाने के लिए ${f.ratio} से गुणा करें। एक मिनट = ${f.samples[0].converted} से, तीन मिनट = ${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}, पाँच मिनट = ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}।`,
    f => `要把按 ${f.cell.from}W 给的时间换到 ${f.cell.to}W 的微波炉，乘以 ${f.ratio}。1 分钟变 ${f.samples[0].converted} 秒，3 分钟变 ${f.samples[1].minutes} 分 ${f.samples[1].rest} 秒，5 分钟变 ${f.samples[2].minutes} 分 ${f.samples[2].rest} 秒。`,
    f => `要把按 ${f.cell.from}W 給的時間換到 ${f.cell.to}W 的微波爐，乘以 ${f.ratio}。1 分鐘變 ${f.samples[0].converted} 秒，3 分鐘變 ${f.samples[1].minutes} 分 ${f.samples[1].rest} 秒，5 分鐘變 ${f.samples[2].minutes} 分 ${f.samples[2].rest} 秒。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '700W 3분을 1000W로 옮기면 몇 분인가요?', a: '2분 6초입니다. 3분 × 700 ÷ 1000으로 계산합니다.' },
      { q: '반대로 1000W 3분을 700W로 옮기면요?', a: '4분 17초입니다. 출력이 낮아지면 그만큼 시간이 길어집니다.' },
      { q: '내 전자레인지 출력은 어디서 보나요?', a: '문 안쪽이나 뒷면 명판에 있습니다. 소비 전력이 아니라 조리 출력을 보십시오.' },
      { q: '50% 출력으로 두 배 돌리는 것과 같나요?', a: '들어간 에너지는 같지만 결과는 다릅니다. 가정용은 최대 출력을 켰다 껐다 하므로 그 사이에 열이 안쪽으로 퍼집니다.' },
      { q: '계산한 시간을 그대로 돌려도 되나요?', a: '8할쯤에서 한 번 확인하는 편이 안전합니다. 음식의 양과 처음 온도에 따라 달라집니다.' },
    ],
    [
      { q: 'What is three minutes at 700 W on a 1000 W oven?', a: '2:06 — three minutes × 700 ÷ 1000.' },
      { q: 'And the other way, 1000 W three minutes on a 700 W oven?', a: '4:17. Lower power means proportionally longer.' },
      { q: 'Where do I find my oven’s wattage?', a: 'On the plate inside the door or on the back. Read the cooking output, not the input power.' },
      { q: 'Is that the same as running at 50 % for twice as long?', a: 'The energy matches but the result differs. Household ovens pulse full power on and off, letting heat spread inward between bursts.' },
      { q: 'Can I just run the calculated time?', a: 'Safer to check at about eighty per cent of it. The amount of food and its starting temperature both shift the answer.' },
    ],
    [
      { q: '¿Tres minutos a 700 W cuánto son en 1000 W?', a: '2:06 — tres minutos × 700 ÷ 1000.' },
      { q: '¿Y al revés, 1000 W tres minutos en 700 W?', a: '4:17. Menos potencia, tiempo proporcionalmente mayor.' },
      { q: '¿Dónde veo los vatios de mi microondas?', a: 'En la placa del interior de la puerta o de la trasera. Lee la potencia de cocción, no la consumida.' },
      { q: '¿Es lo mismo que ponerlo al 50 % el doble de tiempo?', a: 'La energía coincide, el resultado no. Los aparatos domésticos pulsan la potencia máxima, y entre pulsos el calor entra.' },
      { q: '¿Puedo poner directamente el tiempo calculado?', a: 'Mejor comprobar al ochenta por ciento. La cantidad y la temperatura inicial cambian el resultado.' },
    ],
    [
      { q: 'Três minutos a 700 W dão quanto em 1000 W?', a: '2:06 — três minutos × 700 ÷ 1000.' },
      { q: 'E ao contrário, 1000 W três minutos em 700 W?', a: '4:17. Menos potência, tempo proporcionalmente maior.' },
      { q: 'Onde vejo os watts do meu micro-ondas?', a: 'Na placa dentro da porta ou na traseira. Leia a potência de cocção, não a consumida.' },
      { q: 'É o mesmo que usar 50 % pelo dobro do tempo?', a: 'A energia bate, o resultado não. Aparelhos domésticos pulsam a potência máxima, e entre pulsos o calor entra.' },
      { q: 'Posso usar direto o tempo calculado?', a: 'Melhor conferir aos oitenta por cento. Quantidade e temperatura inicial mudam o resultado.' },
    ],
    [
      { q: '700Wで3分を1000Wに移すと何分ですか？', a: '2分6秒です。3分 × 700 ÷ 1000で計算します。' },
      { q: '逆に1000Wで3分を700Wに移すと？', a: '4分17秒です。出力が下がればその分だけ時間が長くなります。' },
      { q: '自分の電子レンジの出力はどこで見ますか？', a: 'ドアの内側か背面の銘板にあります。消費電力ではなく調理出力を見てください。' },
      { q: '50%出力で倍の時間回すのと同じですか？', a: '入ったエネルギーは同じでも結果は違います。家庭用は最大出力を入切するので、その間に熱が内側へ広がります。' },
      { q: '計算した時間をそのまま回してよいですか？', a: '8割ほどで一度確かめるほうが安全です。食品の量や最初の温度で変わります。' },
    ],
    [
      { q: 'Was sind drei Minuten bei 700 W auf einem 1000-W-Gerät?', a: '2:06 — drei Minuten × 700 ÷ 1000.' },
      { q: 'Und umgekehrt, 1000 W drei Minuten auf 700 W?', a: '4:17. Weniger Leistung heißt entsprechend länger.' },
      { q: 'Wo finde ich die Wattzahl meines Geräts?', a: 'Auf dem Schild in der Tür oder auf der Rückseite. Die Garleistung lesen, nicht die Anschlussleistung.' },
      { q: 'Ist das dasselbe wie 50 % doppelt so lang?', a: 'Die Energie stimmt, das Ergebnis nicht. Haushaltsgeräte takten volle Leistung, dazwischen wandert Wärme nach innen.' },
      { q: 'Kann ich die berechnete Zeit einfach durchlaufen lassen?', a: 'Sicherer ist ein Blick bei achtzig Prozent. Menge und Ausgangstemperatur verschieben das Ergebnis.' },
    ],
    [
      { q: 'Trois minutes à 700 W, cela fait combien à 1000 W ?', a: '2:06 — trois minutes × 700 ÷ 1000.' },
      { q: 'Et l’inverse, 1000 W trois minutes sur un 700 W ?', a: '4:17. Moins de puissance, temps proportionnellement plus long.' },
      { q: 'Où lire la puissance de mon four ?', a: 'Sur la plaque à l’intérieur de la porte ou au dos. Prenez la puissance de cuisson, pas l’absorbée.' },
      { q: 'Est-ce pareil que 50 % deux fois plus longtemps ?', a: 'L’énergie correspond, le résultat non. Les fours domestiques pulsent la pleine puissance, et la chaleur gagne le cœur entre les impulsions.' },
      { q: 'Puis-je lancer directement le temps calculé ?', a: 'Mieux vaut vérifier à quatre-vingts pour cent. La quantité et la température de départ changent la donne.' },
    ],
    [
      { q: '700 W पर तीन मिनट, 1000 W पर कितना?', a: '2:06 — तीन मिनट × 700 ÷ 1000।' },
      { q: 'और उल्टा, 1000 W के तीन मिनट 700 W पर?', a: '4:17। शक्ति घटे तो समय उसी अनुपात में बढ़ता है।' },
      { q: 'अपने ओवन की वॉट कहाँ देखूँ?', a: 'दरवाज़े के अंदर या पीछे की प्लेट पर। खपत नहीं, पकाने की शक्ति पढ़ें।' },
      { q: 'क्या यह 50% पर दुगुने समय जैसा ही है?', a: 'ऊर्जा वही, पर परिणाम अलग। घरेलू ओवन पूरी शक्ति को चालू-बंद करते हैं, और बीच में गर्मी भीतर फैलती है।' },
      { q: 'क्या गणना किया समय सीधे चला दूँ?', a: 'अस्सी प्रतिशत पर देख लेना सुरक्षित है। मात्रा और प्रारंभिक तापमान असर डालते हैं।' },
    ],
    [
      { q: '700W 三分钟，换到 1000W 是几分？', a: '2 分 6 秒，即 3 分钟 × 700 ÷ 1000。' },
      { q: '反过来，1000W 三分钟换到 700W 呢？', a: '4 分 17 秒。功率降低，时间就按比例变长。' },
      { q: '我家微波炉的功率在哪看？', a: '门内侧或背面的铭牌上。要看加热输出功率，不是输入功率。' },
      { q: '和用 50% 火力加热两倍时间一样吗？', a: '能量一样，结果不同。家用微波炉是把满功率通断，通断间隙里热量会往里扩散。' },
      { q: '可以直接按算出的时间加热吗？', a: '建议在八成时先看一次。分量和初始温度都会影响。' },
    ],
    [
      { q: '700W 三分鐘，換到 1000W 是幾分？', a: '2 分 6 秒，即 3 分鐘 × 700 ÷ 1000。' },
      { q: '反過來，1000W 三分鐘換到 700W 呢？', a: '4 分 17 秒。功率降低，時間就按比例變長。' },
      { q: '我家微波爐的功率在哪看？', a: '門內側或背面的銘牌上。要看加熱輸出功率，不是輸入功率。' },
      { q: '和用 50% 火力加熱兩倍時間一樣嗎？', a: '能量一樣，結果不同。家用微波爐是把滿功率通斷，通斷間隙裡熱量會往裡擴散。' },
      { q: '可以直接按算出的時間加熱嗎？', a: '建議在八成時先看一次。分量和初始溫度都會影響。' },
    ],
  ),

  cellFaq: T<(f: MicrowaveFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.from}W 기준 시간을 ${f.cell.to}W로 어떻게 옮기나요?`, a: f.same ? `출력이 같으므로 그대로 두면 됩니다.` : `${f.ratio}을 곱합니다. ${f.cell.from} ÷ ${f.cell.to}로 나온 값입니다.` },
      { q: `3분은 몇 분이 되나요?`, a: `${f.samples[1].minutes}분 ${f.samples[1].rest}초입니다. 1분은 ${f.samples[0].converted}초, 5분은 ${f.samples[2].minutes}분 ${f.samples[2].rest}초입니다.` },
      { q: `시간이 늘어나나요, 줄어드나요?`, a: f.same ? `그대로입니다.` : f.longer ? `${f.changePct}% 길어집니다. 출력이 낮아졌기 때문입니다.` : `${-f.changePct}% 짧아집니다. 출력이 높아졌기 때문입니다.` },
      { q: `반대 방향은요?`, a: `${f.cell.to}W 기준 시간을 ${f.cell.from}W로 옮기려면 그 역수를 곱합니다.` },
    ],
    f => [
      { q: `How do I move a ${f.cell.from} W time onto ${f.cell.to} W?`, a: f.same ? `The wattages match, so leave the time as it is.` : `Multiply by ${f.ratio}, which is ${f.cell.from} ÷ ${f.cell.to}.` },
      { q: `What does three minutes become?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}. One minute becomes ${f.samples[0].converted} s and five minutes ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.` },
      { q: `Does the time grow or shrink?`, a: f.same ? `It stays the same.` : f.longer ? `${f.changePct} % longer, because the power went down.` : `${-f.changePct} % shorter, because the power went up.` },
      { q: `And the reverse direction?`, a: `To take a ${f.cell.to} W time to ${f.cell.from} W, multiply by the reciprocal instead.` },
    ],
    f => [
      { q: `¿Cómo paso un tiempo de ${f.cell.from} W a ${f.cell.to} W?`, a: f.same ? `Las potencias coinciden: déjalo igual.` : `Multiplica por ${f.ratio}, que es ${f.cell.from} ÷ ${f.cell.to}.` },
      { q: `¿En qué se convierten tres minutos?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}. Un minuto pasa a ${f.samples[0].converted} s y cinco minutos a ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.` },
      { q: `¿El tiempo sube o baja?`, a: f.same ? `Se queda igual.` : f.longer ? `Un ${f.changePct} % más, porque baja la potencia.` : `Un ${-f.changePct} % menos, porque sube la potencia.` },
      { q: `¿Y en sentido inverso?`, a: `Para llevar un tiempo de ${f.cell.to} W a ${f.cell.from} W, multiplica por el inverso.` },
    ],
    f => [
      { q: `Como levo um tempo de ${f.cell.from} W para ${f.cell.to} W?`, a: f.same ? `As potências coincidem: deixe como está.` : `Multiplique por ${f.ratio}, que é ${f.cell.from} ÷ ${f.cell.to}.` },
      { q: `Três minutos viram quanto?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}. Um minuto vira ${f.samples[0].converted} s e cinco minutos ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.` },
      { q: `O tempo aumenta ou diminui?`, a: f.same ? `Fica igual.` : f.longer ? `${f.changePct} % a mais, porque a potência caiu.` : `${-f.changePct} % a menos, porque a potência subiu.` },
      { q: `E no sentido inverso?`, a: `Para levar um tempo de ${f.cell.to} W a ${f.cell.from} W, multiplique pelo inverso.` },
    ],
    f => [
      { q: `${f.cell.from}W基準の時間を${f.cell.to}Wにどう移しますか？`, a: f.same ? `出力が同じなのでそのままで結構です。` : `${f.ratio}を掛けます。${f.cell.from} ÷ ${f.cell.to}で出た値です。` },
      { q: `3分は何分になりますか？`, a: `${f.samples[1].minutes}分${f.samples[1].rest}秒です。1分は${f.samples[0].converted}秒、5分は${f.samples[2].minutes}分${f.samples[2].rest}秒です。` },
      { q: `時間は長くなりますか、短くなりますか？`, a: f.same ? `そのままです。` : f.longer ? `${f.changePct}%長くなります。出力が下がったからです。` : `${-f.changePct}%短くなります。出力が上がったからです。` },
      { q: `逆方向は？`, a: `${f.cell.to}W基準の時間を${f.cell.from}Wに移すには、その逆数を掛けます。` },
    ],
    f => [
      { q: `Wie übertrage ich eine ${f.cell.from}-W-Zeit auf ${f.cell.to} W?`, a: f.same ? `Die Wattzahlen stimmen überein — die Zeit bleibt.` : `Mit ${f.ratio} multiplizieren, also ${f.cell.from} ÷ ${f.cell.to}.` },
      { q: `Was werden aus drei Minuten?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}. Eine Minute wird zu ${f.samples[0].converted} s, fünf Minuten zu ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.` },
      { q: `Wird die Zeit länger oder kürzer?`, a: f.same ? `Sie bleibt gleich.` : f.longer ? `${f.changePct} % länger, weil die Leistung sinkt.` : `${-f.changePct} % kürzer, weil die Leistung steigt.` },
      { q: `Und die Gegenrichtung?`, a: `Für eine ${f.cell.to}-W-Zeit auf ${f.cell.from} W mit dem Kehrwert multiplizieren.` },
    ],
    f => [
      { q: `Comment porter un temps de ${f.cell.from} W à ${f.cell.to} W ?`, a: f.same ? `Les puissances coïncident : laissez tel quel.` : `Multipliez par ${f.ratio}, soit ${f.cell.from} ÷ ${f.cell.to}.` },
      { q: `Que deviennent trois minutes ?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}. Une minute devient ${f.samples[0].converted} s et cinq minutes ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}.` },
      { q: `Le temps augmente-t-il ou diminue-t-il ?`, a: f.same ? `Il reste identique.` : f.longer ? `${f.changePct} % de plus, la puissance ayant baissé.` : `${-f.changePct} % de moins, la puissance ayant augmenté.` },
      { q: `Et dans l’autre sens ?`, a: `Pour porter un temps de ${f.cell.to} W à ${f.cell.from} W, multipliez par l’inverse.` },
    ],
    f => [
      { q: `${f.cell.from} W का समय ${f.cell.to} W पर कैसे लाऊँ?`, a: f.same ? `वॉट समान हैं, वैसे ही रहने दें।` : `${f.ratio} से गुणा करें, यानी ${f.cell.from} ÷ ${f.cell.to}।` },
      { q: `तीन मिनट क्या बनते हैं?`, a: `${f.samples[1].minutes}:${String(f.samples[1].rest).padStart(2, '0')}। एक मिनट ${f.samples[0].converted} सेकंड और पाँच मिनट ${f.samples[2].minutes}:${String(f.samples[2].rest).padStart(2, '0')}।` },
      { q: `समय बढ़ेगा या घटेगा?`, a: f.same ? `वही रहेगा।` : f.longer ? `${f.changePct}% अधिक, क्योंकि शक्ति घटी।` : `${-f.changePct}% कम, क्योंकि शक्ति बढ़ी।` },
      { q: `उल्टी दिशा में?`, a: `${f.cell.to} W का समय ${f.cell.from} W पर लाने के लिए व्युत्क्रम से गुणा करें।` },
    ],
    f => [
      { q: `${f.cell.from}W 的时间怎么换到 ${f.cell.to}W？`, a: f.same ? `功率相同，保持原样即可。` : `乘以 ${f.ratio}，也就是 ${f.cell.from} ÷ ${f.cell.to}。` },
      { q: `3 分钟变成多久？`, a: `${f.samples[1].minutes} 分 ${f.samples[1].rest} 秒。1 分钟变 ${f.samples[0].converted} 秒，5 分钟变 ${f.samples[2].minutes} 分 ${f.samples[2].rest} 秒。` },
      { q: `时间是变长还是变短？`, a: f.same ? `不变。` : f.longer ? `延长 ${f.changePct}%，因为功率降低了。` : `缩短 ${-f.changePct}%，因为功率提高了。` },
      { q: `反方向呢？`, a: `要把 ${f.cell.to}W 的时间换到 ${f.cell.from}W，乘以它的倒数。` },
    ],
    f => [
      { q: `${f.cell.from}W 的時間怎麼換到 ${f.cell.to}W？`, a: f.same ? `功率相同，保持原樣即可。` : `乘以 ${f.ratio}，也就是 ${f.cell.from} ÷ ${f.cell.to}。` },
      { q: `3 分鐘變成多久？`, a: `${f.samples[1].minutes} 分 ${f.samples[1].rest} 秒。1 分鐘變 ${f.samples[0].converted} 秒，5 分鐘變 ${f.samples[2].minutes} 分 ${f.samples[2].rest} 秒。` },
      { q: `時間是變長還是變短？`, a: f.same ? `不變。` : f.longer ? `延長 ${f.changePct}%，因為功率降低了。` : `縮短 ${-f.changePct}%，因為功率提高了。` },
      { q: `反方向呢？`, a: `要把 ${f.cell.to}W 的時間換到 ${f.cell.from}W，乘以它的倒數。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const MICROWAVE_UI: L<MicrowaveUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<MicrowaveUI>;
