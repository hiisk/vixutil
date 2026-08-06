/**
 * 옷 사이즈 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "44·55·66이 아무 숫자가 아니다"이다. 1981년 표준이
 * 그때의 평균인 키 155cm·가슴 85cm를 55로 삼았고, 한 호수마다 키 5cm·가슴 3cm를
 * 더한다. 남성은 아예 다른 자를 쓴다 — 상의 호수가 곧 가슴둘레다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { SizeFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface SizeUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  koreaLabel: string;
  intlLabel: string;
  inchLabel: string;
  measureLabel: string;
  assumesLabel: string;
  spanLabel: string;
  groupName: (key: string) => string;
  measureName: (key: string) => string;
  ruleTitle: string;
  ruleNote: string;
  menTitle: string;
  menNote: string;
  inchTitle: string;
  inchNote: string;
  brandTitle: string;
  brandNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  groupRowTitle: string;
  desc: (f: SizeFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: SizeFacts) => string;
  metaDesc: (f: SizeFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: SizeFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

const pick = (table: Record<string, string>) => (key: string): string => table[key] ?? key;

/** 대상 이름은 제목과 질문에서도 같은 것을 쓴다 — SPEC 밖으로 꺼낸다 */
const grpKo = pick({ wtop: '여성 상의', wbottom: '여성 하의', mtop: '남성 상의', mbottom: '남성 하의', kids: '아동복' });
const grpEn = pick({ wtop: 'women’s tops', wbottom: 'women’s bottoms', mtop: 'men’s tops', mbottom: 'men’s bottoms', kids: 'children’s wear' });
const grpEs = pick({ wtop: 'prendas superiores de mujer', wbottom: 'pantalones de mujer', mtop: 'prendas superiores de hombre', mbottom: 'pantalones de hombre', kids: 'ropa infantil' });
const grpPt = pick({ wtop: 'peças de cima femininas', wbottom: 'calças femininas', mtop: 'peças de cima masculinas', mbottom: 'calças masculinas', kids: 'roupa infantil' });
const grpJa = pick({ wtop: 'レディーストップス', wbottom: 'レディースボトムス', mtop: 'メンズトップス', mbottom: 'メンズボトムス', kids: '子ども服' });
const grpDe = pick({ wtop: 'Damenoberteile', wbottom: 'Damenhosen', mtop: 'Herrenoberteile', mbottom: 'Herrenhosen', kids: 'Kinderkleidung' });
const grpFr = pick({ wtop: 'hauts femme', wbottom: 'bas femme', mtop: 'hauts homme', mbottom: 'bas homme', kids: 'vêtements enfant' });
const grpHi = pick({ wtop: 'महिला टॉप', wbottom: 'महिला बॉटम', mtop: 'पुरुष टॉप', mbottom: 'पुरुष बॉटम', kids: 'बच्चों के कपड़े' });
const grpZh = pick({ wtop: '女装上衣', wbottom: '女装下装', mtop: '男装上衣', mbottom: '男装下装', kids: '童装' });
const grpTw = pick({ wtop: '女裝上衣', wbottom: '女裝下著', mtop: '男裝上衣', mbottom: '男裝下著', kids: '童裝' });

type Spec = { [K in keyof SizeUI]: L<SizeUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('옷 사이즈', 'Clothing sizes', 'Tallas de ropa', 'Tamanhos de roupa', '服のサイズ', 'Kleidergrößen', 'Tailles de vêtements', 'कपड़ों के आकार', '服装尺码', '服裝尺碼'),

  groupName: T<(key: string) => string>(grpKo, grpEn, grpEs, grpPt, grpJa, grpDe, grpFr, grpHi, grpZh, grpTw),

  measureName: T<(key: string) => string>(
    pick({ bust: '가슴둘레', waist: '허리둘레', height: '키' }),
    pick({ bust: 'chest', waist: 'waist', height: 'height' }),
    pick({ bust: 'pecho', waist: 'cintura', height: 'estatura' }),
    pick({ bust: 'peito', waist: 'cintura', height: 'altura' }),
    pick({ bust: '胸囲', waist: 'ウエスト', height: '身長' }),
    pick({ bust: 'Brustumfang', waist: 'Taille', height: 'Körpergröße' }),
    pick({ bust: 'poitrine', waist: 'tour de taille', height: 'taille' }),
    pick({ bust: 'छाती', waist: 'कमर', height: 'ऊँचाई' }),
    pick({ bust: '胸围', waist: '腰围', height: '身高' }),
    pick({ bust: '胸圍', waist: '腰圍', height: '身高' }),
  ),

  hubTitle: T(
    '옷 사이즈 100칸 — 55는 키 155cm·가슴 85cm라는 뜻입니다',
    '100 size readings — Korean "55" means 155 cm tall, 85 cm bust',
    '100 tallas — el «55» coreano significa 155 cm de estatura y 85 de pecho',
    '100 tamanhos — o "55" coreano significa 155 cm de altura e 85 de busto',
    '服のサイズ100マス — 韓国の55は身長155cm・胸囲85cmの意味',
    '100 Größenwerte — koreanisch „55“ heißt 155 cm groß, 85 cm Brustumfang',
    '100 tailles — le « 55 » coréen veut dire 155 cm et 85 cm de poitrine',
    '100 आकार — कोरियाई "55" यानी 155 सेमी क़द और 85 सेमी छाती',
    '100 个尺码 — 韩国的 55 意思是身高 155cm、胸围 85cm',
    '100 個尺碼 — 韓國的 55 意思是身高 155cm、胸圍 85cm',
  ),

  hubLead: T(
    '가슴둘레·허리둘레·키를 넣으면 한국 호수와 국제 표기가 나옵니다. 44·55·66은 아무 숫자가 아니라 1981년 표준이 정한 규칙이고, 남성 상의는 아예 다른 자를 씁니다.',
    'Give a chest, waist or height and get the Korean size number and the international letter. The 44/55/66 series is not arbitrary — it comes from a 1981 standard — and men’s tops run on a different ruler entirely.',
    'Da un pecho, una cintura o una estatura y obtén el número coreano y la letra internacional. La serie 44/55/66 no es arbitraria: viene de una norma de 1981, y las prendas de hombre usan otra regla.',
    'Informe peito, cintura ou altura e receba o número coreano e a letra internacional. A série 44/55/66 não é arbitrária — vem de uma norma de 1981 — e as peças masculinas usam outra régua.',
    '胸囲・ウエスト・身長を入れると韓国の号数と国際表記が出ます。44・55・66は適当な数字ではなく1981年の規格が決めた規則で、メンズトップスはまったく別の物差しです。',
    'Brustumfang, Taille oder Körpergröße eingeben und die koreanische Größenzahl samt internationalem Buchstaben erhalten. Die Reihe 44/55/66 ist nicht willkürlich — sie stammt aus einer Norm von 1981 — und Herrenoberteile folgen einem ganz anderen Maß.',
    'Donnez une poitrine, une taille ou une stature et obtenez le numéro coréen et la lettre internationale. La série 44/55/66 n’est pas arbitraire — elle vient d’une norme de 1981 — et les hauts homme suivent une tout autre règle.',
    'छाती, कमर या ऊँचाई दीजिए और कोरियाई नंबर तथा अंतरराष्ट्रीय अक्षर पाइए। 44/55/66 मनमाने नहीं — यह 1981 के मानक से आते हैं — और पुरुष टॉप बिलकुल अलग पैमाने पर चलते हैं।',
    '输入胸围、腰围或身高，就能得到韩国号数和国际字母码。44/55/66 不是随便定的，来自 1981 年的标准；而男装上衣用的是完全不同的一把尺。',
    '輸入胸圍、腰圍或身高，就能得到韓國號數和國際字母碼。44/55/66 不是隨便定的，來自 1981 年的標準；而男裝上衣用的是完全不同的一把尺。',
  ),

  koreaLabel: T('한국 호수', 'Korean size', 'Talla coreana', 'Tamanho coreano', '韓国の号数', 'Koreanische Größe', 'Taille coréenne', 'कोरियाई आकार', '韩国号数', '韓國號數'),
  intlLabel: T('국제 표기', 'International size', 'Talla internacional', 'Tamanho internacional', '国際表記', 'Internationale Größe', 'Taille internationale', 'अंतरराष्ट्रीय आकार', '国际尺码', '國際尺碼'),
  inchLabel: T('인치', 'inches', 'pulgadas', 'polegadas', 'インチ', 'Zoll', 'pouces', 'इंच', '英寸', '英寸'),
  measureLabel: T('재는 곳', 'What is measured', 'Qué se mide', 'O que se mede', '測る場所', 'Was gemessen wird', 'Ce qu’on mesure', 'क्या मापा जाता है', '测量部位', '測量部位'),
  assumesLabel: T('이 호수가 상정한 몸', 'The body this size assumes', 'El cuerpo que supone esta talla', 'O corpo que este tamanho supõe', 'この号数が想定する体', 'Der Körper hinter dieser Größe', 'Le corps supposé par cette taille', 'यह आकार जो शरीर मानता है', '该号数设定的身材', '該號數設定的身材'),
  spanLabel: T('한 호수가 덮는 폭', 'What one size step covers', 'Lo que abarca un paso de talla', 'O que um passo de tamanho cobre', '1号数が覆う幅', 'Spanne einer Größenstufe', 'Écart d’une taille à l’autre', 'एक आकार का दायरा', '一个号数覆盖的范围', '一個號數覆蓋的範圍'),

  ruleTitle: T('44·55·66은 아무 숫자가 아닙니다', 'The 44/55/66 series is not arbitrary', 'La serie 44/55/66 no es arbitraria', 'A série 44/55/66 não é arbitrária', '44・55・66は適当な数字ではありません', 'Die Reihe 44/55/66 ist nicht willkürlich', 'La série 44/55/66 n’a rien d’arbitraire', '44/55/66 मनमाने अंक नहीं हैं', '44/55/66 不是随便定的数字', '44/55/66 不是隨便定的數字'),

  ruleNote: T(
    '1981년 의류 치수 표준이 그때 여성의 평균인 키 155cm·가슴둘레 85cm를 55로 삼았습니다. 거기서 한 호수 올라갈 때마다 키는 5cm, 가슴은 3cm를 더하고 표기는 11씩 늘립니다. 그래서 66은 키 160cm·가슴 88cm, 44는 키 150cm·가슴 82cm를 뜻합니다 — 호수 하나만 알면 그 옷이 상정한 몸이 그대로 나옵니다.',
    'A 1981 clothing standard took what was then the average woman — 155 cm tall with an 85 cm bust — and called it 55. Each step up adds 5 cm of height and 3 cm of bust, while the label itself goes up by 11. So 66 means 160 cm and 88 cm; 44 means 150 cm and 82 cm. One number tells you the whole body the garment was cut for.',
    'Una norma de 1981 tomó a la mujer media de entonces —155 cm de estatura y 85 cm de pecho— y la llamó 55. Cada paso suma 5 cm de estatura y 3 cm de pecho, mientras la etiqueta sube de 11 en 11. Así, 66 son 160 y 88 cm; 44 son 150 y 82. Un solo número describe el cuerpo para el que se cortó la prenda.',
    'Uma norma de 1981 pegou a mulher média da época — 155 cm de altura e 85 cm de busto — e chamou de 55. Cada passo soma 5 cm de altura e 3 cm de busto, enquanto o rótulo sobe de 11 em 11. Assim, 66 são 160 e 88 cm; 44 são 150 e 82. Um número descreve o corpo para o qual a peça foi cortada.',
    '1981年の衣類寸法規格が、当時の女性の平均である身長155cm・胸囲85cmを55としました。そこから1号数上がるごとに身長は5cm、胸囲は3cmを足し、表記は11ずつ増えます。だから66は身長160cm・胸囲88cm、44は身長150cm・胸囲82cmを意味します — 号数ひとつでその服が想定した体がわかります。',
    'Eine Bekleidungsnorm von 1981 nahm die damalige Durchschnittsfrau — 155 cm groß, 85 cm Brustumfang — und nannte sie 55. Jede Stufe legt 5 cm Körpergröße und 3 cm Brustumfang zu, während die Zahl selbst um 11 wächst. 66 heißt also 160 und 88 cm, 44 heißt 150 und 82. Eine Zahl nennt den ganzen Körper, für den geschnitten wurde.',
    'Une norme vestimentaire de 1981 a pris la femme moyenne d’alors — 155 cm pour 85 cm de poitrine — et l’a appelée 55. Chaque échelon ajoute 5 cm de stature et 3 cm de poitrine, tandis que l’étiquette monte de 11. Ainsi 66 vaut 160 et 88 cm ; 44 vaut 150 et 82. Un seul nombre dit le corps pour lequel le vêtement a été coupé.',
    '1981 के वस्त्र माप मानक ने उस समय की औसत महिला — 155 सेमी क़द और 85 सेमी छाती — को 55 कहा। हर सीढ़ी पर क़द में 5 सेमी और छाती में 3 सेमी जुड़ते हैं, जबकि लेबल 11 से बढ़ता है। इसलिए 66 यानी 160 और 88 सेमी; 44 यानी 150 और 82। एक संख्या पूरा शरीर बता देती है।',
    '1981 年的服装尺寸标准把当时女性的平均值——身高 155cm、胸围 85cm——定为 55。往上每一档，身高加 5cm、胸围加 3cm，而标号本身加 11。所以 66 表示 160cm、88cm；44 表示 150cm、82cm。知道号数，就知道这件衣服是按什么身材裁的。',
    '1981 年的服裝尺寸標準把當時女性的平均值——身高 155cm、胸圍 85cm——定為 55。往上每一檔，身高加 5cm、胸圍加 3cm，而標號本身加 11。所以 66 表示 160cm、88cm；44 表示 150cm、82cm。知道號數，就知道這件衣服是按什麼身材裁的。',
  ),

  menTitle: T('남성은 아예 다른 자를 씁니다', 'Men’s sizes use a different ruler', 'Las tallas de hombre usan otra regla', 'Os tamanhos masculinos usam outra régua', 'メンズはまったく別の物差しです', 'Herrengrößen folgen einem anderen Maß', 'Les tailles homme suivent une autre règle', 'पुरुष आकार अलग पैमाने पर चलते हैं', '男装用的是另一把尺', '男裝用的是另一把尺'),

  menNote: T(
    '남성 상의는 호수가 곧 가슴둘레입니다. 100은 가슴 100cm를 뜻하고, 95·100·105는 5cm 눈금입니다. 같은 100이라도 여성 호수 체계에서는 훨씬 큰 몸을 가리키므로, 남녀 옷을 나란히 놓고 숫자만 비교하면 어긋납니다.',
    'A men’s top is labelled with the chest measurement itself: 100 means a 100 cm chest, and 95/100/105 step in fives. The same "100" on the women’s scale points at a far larger body, so comparing the bare numbers across the two ranges will mislead you.',
    'Una prenda de hombre lleva la propia medida de pecho: 100 significa 100 cm de pecho, y 95/100/105 avanzan de cinco en cinco. Ese mismo «100» en la escala femenina apunta a un cuerpo mucho mayor, así que comparar números sueltos entre ambas induce a error.',
    'Uma peça masculina traz a própria medida do peito: 100 significa 100 cm, e 95/100/105 andam de cinco em cinco. Esse mesmo "100" na escala feminina aponta um corpo bem maior, então comparar números soltos entre as duas engana.',
    'メンズトップスは号数がそのまま胸囲です。100は胸囲100cmを意味し、95・100・105は5cm刻みです。同じ100でも女性の号数体系ではずっと大きな体を指すので、男女の服を並べて数字だけ比べるとずれます。',
    'Ein Herrenoberteil trägt das Brustmaß selbst: 100 heißt 100 cm Brustumfang, und 95/100/105 gehen in Fünferschritten. Dieselbe „100“ auf der Damenskala meint einen viel größeren Körper — bloße Zahlenvergleiche zwischen beiden führen in die Irre.',
    'Un haut homme porte directement la mesure de poitrine : 100 signifie 100 cm, et 95/100/105 avancent de cinq en cinq. Ce même « 100 » sur l’échelle femme désigne un corps bien plus grand : comparer les nombres nus d’une gamme à l’autre induit en erreur.',
    'पुरुष टॉप पर छाती का माप ही लिखा होता है: 100 यानी 100 सेमी छाती, और 95/100/105 पाँच-पाँच के अंतर पर। वही "100" महिला पैमाने पर कहीं बड़े शरीर को दर्शाता है, इसलिए दोनों के नंबर सीधे मिलाना भ्रामक है।',
    '男装上衣的号数就是胸围本身：100 表示胸围 100cm，95/100/105 以 5cm 递进。同样的"100"放到女装体系里指的是大得多的身材，所以两套体系的数字不能直接对比。',
    '男裝上衣的號數就是胸圍本身：100 表示胸圍 100cm，95/100/105 以 5cm 遞進。同樣的「100」放到女裝體系裡指的是大得多的身材，所以兩套體系的數字不能直接對比。',
  ),

  inchTitle: T('하의만 인치로 부릅니다', 'Only bottoms are called in inches', 'Solo los pantalones van en pulgadas', 'Só as calças vão em polegadas', '下だけインチで呼びます', 'Nur Hosen laufen in Zoll', 'Seuls les bas se disent en pouces', 'सिर्फ़ बॉटम इंच में', '只有下装按英寸叫', '只有下著按英寸叫'),

  inchNote: T(
    '상의는 센티미터인데 바지는 인치입니다. 허리 80cm면 31인치이고, 매장에서는 30·32처럼 짝수로 갖춰 놓는 곳이 많습니다. 인치는 허리둘레를 2.54로 나눈 값이라 옷의 여유분은 들어 있지 않습니다 — 앉았을 때 편한 쪽을 고르려면 한 치수 위를 봅니다.',
    'Tops are in centimetres but trousers are in inches. An 80 cm waist is 31 inches, and shops usually stock even numbers like 30 and 32. The inch figure is the waist divided by 2.54 with no ease added, so if you want to be comfortable sitting down, look one size up.',
    'Las prendas de arriba van en centímetros y los pantalones en pulgadas. Una cintura de 80 cm son 31 pulgadas, y las tiendas suelen tener pares como 30 y 32. La pulgada es la cintura dividida entre 2,54, sin holgura, así que para estar cómodo sentado conviene subir una talla.',
    'As peças de cima vão em centímetros e as calças em polegadas. Uma cintura de 80 cm são 31 polegadas, e as lojas costumam ter pares como 30 e 32. A polegada é a cintura dividida por 2,54, sem folga — para ficar confortável sentado, suba um tamanho.',
    '上はセンチなのにパンツはインチです。ウエスト80cmなら31インチで、店頭では30・32のように偶数で揃えていることが多いです。インチはウエストを2.54で割った値でゆとりは入っていないので、座って楽なほうを選ぶなら1サイズ上を見ます。',
    'Oberteile in Zentimetern, Hosen in Zoll. Eine Taille von 80 cm sind 31 Zoll, im Laden liegen meist gerade Zahlen wie 30 und 32. Der Zollwert ist die Taille geteilt durch 2,54, ohne Bewegungszugabe — wer im Sitzen bequem sitzen will, greift eine Nummer größer.',
    'Les hauts sont en centimètres, les pantalons en pouces. Une taille de 80 cm fait 31 pouces, et les magasins tiennent surtout des nombres pairs comme 30 et 32. Le pouce, c’est le tour de taille divisé par 2,54, sans aisance : pour être à l’aise assis, prenez une taille au-dessus.',
    'ऊपर के कपड़े सेंटीमीटर में पर पैंट इंच में। 80 सेमी कमर यानी 31 इंच, और दुकानों में अक्सर 30, 32 जैसे सम अंक मिलते हैं। इंच का मान कमर को 2.54 से भाग देकर मिलता है, उसमें ढील नहीं जुड़ी — बैठने में आराम चाहिए तो एक आकार ऊपर देखें।',
    '上衣按厘米，裤子却按英寸。腰围 80cm 就是 31 英寸，店里多半只备 30、32 这样的偶数。英寸是腰围除以 2.54，没有加放松量——想坐着舒服，就往上看一码。',
    '上衣按公分，褲子卻按英寸。腰圍 80cm 就是 31 英寸，店裡多半只備 30、32 這樣的偶數。英寸是腰圍除以 2.54，沒有加放鬆量——想坐著舒服，就往上看一碼。',
  ),

  brandTitle: T('브랜드마다 1~3cm씩 다릅니다', 'Brands differ by a centimetre or three', 'Cada marca varía uno a tres centímetros', 'Cada marca varia de um a três centímetros', 'ブランドごとに1〜3cm違います', 'Marken weichen um ein bis drei Zentimeter ab', 'Les marques varient de un à trois centimètres', 'हर ब्रांड में 1–3 सेमी का फ़र्क़', '不同品牌相差 1~3cm', '不同品牌相差 1~3cm'),

  brandNote: T(
    '여기 값은 표준이 정한 자이고, 실제 옷은 브랜드마다 패턴이 달라 같은 호수라도 1~3cm씩 차이 납니다. 그래서 표는 어느 칸에서 시작할지를 알려 주는 것이지 마지막 답이 아닙니다 — 상품 페이지의 실측표가 있으면 그쪽이 언제나 먼저입니다.',
    'These figures follow the standard; real garments are cut to each brand’s own pattern and the same size number can differ by one to three centimetres. Treat the table as where to start looking, not the final answer — when a product page lists its own flat measurements, those always win.',
    'Estas cifras siguen la norma; la ropa real se corta con el patrón de cada marca y una misma talla puede variar de uno a tres centímetros. Toma la tabla como punto de partida, no como respuesta final: si la ficha del producto trae medidas reales, esas mandan.',
    'Estes números seguem a norma; a roupa real é cortada no molde de cada marca e o mesmo tamanho pode variar de um a três centímetros. Use a tabela como ponto de partida, não como resposta final — se a página do produto traz medidas reais, elas mandam.',
    'ここの値は規格の物差しで、実際の服はブランドごとにパターンが違い、同じ号数でも1〜3cmずれます。表はどこから見始めるかを教えるもので最終的な答えではありません — 商品ページに実寸表があるなら、いつでもそちらが先です。',
    'Diese Werte folgen der Norm; echte Kleidung wird nach dem Schnitt der jeweiligen Marke gefertigt, dieselbe Größe kann ein bis drei Zentimeter abweichen. Die Tabelle sagt, wo man anfängt zu suchen — nicht das letzte Wort. Nennt die Produktseite eigene Maße, gelten diese.',
    'Ces valeurs suivent la norme ; les vêtements réels sont coupés sur le patron de chaque marque et une même taille peut varier de un à trois centimètres. Le tableau indique par où commencer, pas la réponse finale : si la fiche produit donne ses mesures, ce sont elles qui priment.',
    'ये मान मानक के अनुसार हैं; असली कपड़े हर ब्रांड के अपने पैटर्न पर कटते हैं और एक ही आकार में 1–3 सेमी फ़र्क़ आ सकता है। तालिका को शुरुआत मानिए, अंतिम उत्तर नहीं — उत्पाद पृष्ठ पर असली माप हों तो वही ऊपर हैं।',
    '这里的数值按标准来；实际衣服按各品牌的版型裁剪，同一号数可能差 1~3cm。这张表告诉你从哪一档开始看，而不是最终答案——商品页若有实测尺寸表，永远以那个为准。',
    '這裡的數值按標準來；實際衣服按各品牌的版型裁剪，同一號數可能差 1~3cm。這張表告訴你從哪一檔開始看，而不是最終答案——商品頁若有實測尺寸表，永遠以那個為準。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '가슴둘레는 겨드랑이 아래 가장 굵은 곳을, 허리둘레는 배꼽 높이를 잽니다. 줄자를 살에 붙이되 조이지는 않습니다. 44·55 표기는 요즘 S·M·L에 밀려 줄어드는 추세라, 두 가지가 함께 적힌 라벨도 많습니다.',
    'Measure the chest at its fullest point under the arms and the waist at navel height, with the tape snug but not pulled tight. The 44/55 labels are slowly giving way to S/M/L, and many garments now carry both.',
    'Mide el pecho por su punto más ancho bajo las axilas y la cintura a la altura del ombligo, con la cinta ajustada pero sin apretar. Las etiquetas 44/55 van cediendo ante S/M/L y muchas prendas llevan ambas.',
    'Meça o peito no ponto mais largo sob os braços e a cintura na altura do umbigo, com a fita justa mas sem apertar. As etiquetas 44/55 vêm cedendo a S/M/L e muitas peças trazem as duas.',
    '胸囲は脇の下で最も太いところ、ウエストはへその高さで測ります。メジャーは肌に沿わせつつ締めつけません。44・55の表記は近ごろS・M・Lに押されて減る傾向で、両方を併記したラベルも多いです。',
    'Den Brustumfang an der stärksten Stelle unter den Armen messen, die Taille auf Nabelhöhe, das Band anliegend, aber nicht straff. Die Bezeichnungen 44/55 weichen zunehmend S/M/L; viele Teile tragen inzwischen beides.',
    'Mesurez la poitrine à l’endroit le plus fort sous les bras et la taille à hauteur du nombril, le mètre ajusté sans serrer. Les mentions 44/55 cèdent peu à peu la place au S/M/L, et beaucoup de vêtements portent les deux.',
    'छाती को बग़ल के नीचे सबसे चौड़ी जगह पर और कमर को नाभि की ऊँचाई पर मापें; टेप शरीर से लगा हो पर कसा न हो। 44/55 लेबल धीरे-धीरे S/M/L के आगे कम हो रहे हैं और कई कपड़ों पर दोनों लिखे होते हैं।',
    '胸围量腋下最丰满处，腰围量肚脐高度，皮尺贴身但不勒紧。44/55 的标法正逐渐让位给 S/M/L，很多衣服两种都标。',
    '胸圍量腋下最豐滿處，腰圍量肚臍高度，皮尺貼身但不勒緊。44/55 的標法正逐漸讓位給 S/M/L，很多衣服兩種都標。',
  ),

  tableTitle: T('치수로 찾기', 'Find it by measurement', 'Búscalo por medida', 'Ache pela medida', '寸法から探す', 'Nach Maß suchen', 'Chercher par mesure', 'माप से देखें', '按尺寸查找', '按尺寸查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  groupRowTitle: T('같은 대상, 다른 치수', 'Same range, other measurements', 'Misma gama, otras medidas', 'Mesma linha, outras medidas', '同じ対象、別の寸法', 'Gleiche Reihe, andere Maße', 'Même gamme, autres mesures', 'वही श्रेणी, दूसरे माप', '同一类别，不同尺寸', '同一類別，不同尺寸'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '가슴둘레·허리둘레·키는 몸의 치수입니다. 옷의 실측이 아닙니다.',
      '여성 호수는 55(키 155·가슴 85)에서 한 칸마다 키 5cm·가슴 3cm씩 움직입니다.',
      '남성 상의 호수는 곧 가슴둘레이고, 하의는 허리 인치입니다.',
      '브랜드마다 1~3cm씩 다릅니다. 상품 페이지 실측표가 있으면 그쪽이 먼저입니다.',
    ],
    [
      'Chest, waist and height here are body measurements, not the garment laid flat.',
      'Women’s sizes move from 55 (155 cm, 85 cm bust) by 5 cm of height and 3 cm of bust per step.',
      'A men’s top is labelled with the chest itself; men’s bottoms use the waist in inches.',
      'Brands differ by one to three centimetres. A product page’s own measurements always win.',
    ],
    [
      'El pecho, la cintura y la estatura son medidas del cuerpo, no de la prenda extendida.',
      'Las tallas de mujer parten de 55 (155 cm, 85 de pecho) y suben 5 cm de estatura y 3 de pecho por paso.',
      'La prenda de hombre lleva el pecho como número; los pantalones, la cintura en pulgadas.',
      'Las marcas varían de uno a tres centímetros. Las medidas del producto siempre mandan.',
    ],
    [
      'Peito, cintura e altura aqui são medidas do corpo, não da peça estendida.',
      'Os tamanhos femininos partem de 55 (155 cm, 85 de busto) e sobem 5 cm de altura e 3 de busto por passo.',
      'A peça masculina traz o peito como número; as calças, a cintura em polegadas.',
      'As marcas variam de um a três centímetros. As medidas do produto sempre mandam.',
    ],
    [
      '胸囲・ウエスト・身長は体の寸法で、服の実寸ではありません。',
      '女性の号数は55(身長155・胸囲85)から1段ごとに身長5cm・胸囲3cmずつ動きます。',
      'メンズトップスの号数はそのまま胸囲、ボトムスはウエストのインチです。',
      'ブランドごとに1〜3cm違います。商品ページの実寸表があればそちらが先です。',
    ],
    [
      'Brust, Taille und Körpergröße sind hier Körpermaße, nicht das flach gemessene Kleidungsstück.',
      'Damengrößen gehen von 55 (155 cm, 85 cm Brust) je Stufe um 5 cm Größe und 3 cm Brust weiter.',
      'Herrenoberteile tragen das Brustmaß als Zahl, Herrenhosen die Taille in Zoll.',
      'Marken weichen ein bis drei Zentimeter ab. Eigene Maße der Produktseite gehen vor.',
    ],
    [
      'Poitrine, taille et stature sont ici des mesures du corps, pas du vêtement à plat.',
      'Les tailles femme partent de 55 (155 cm, 85 cm de poitrine) et montent de 5 cm et 3 cm par échelon.',
      'Le haut homme porte la poitrine comme numéro ; le bas, le tour de taille en pouces.',
      'Les marques varient de un à trois centimètres. Les mesures de la fiche produit priment.',
    ],
    [
      'यहाँ छाती, कमर और ऊँचाई शरीर के माप हैं, कपड़े के नहीं।',
      'महिला आकार 55 (155 सेमी, 85 सेमी छाती) से हर सीढ़ी पर 5 सेमी क़द और 3 सेमी छाती बढ़ते हैं।',
      'पुरुष टॉप पर छाती ही संख्या है; बॉटम में कमर इंच में।',
      'ब्रांडों में 1–3 सेमी फ़र्क़ रहता है। उत्पाद पृष्ठ के माप हमेशा ऊपर।',
    ],
    [
      '这里的胸围、腰围、身高都是身体尺寸，不是衣服平铺的尺寸。',
      '女装号数从 55（身高 155、胸围 85）起，每档身高加 5cm、胸围加 3cm。',
      '男装上衣的号数就是胸围，下装按腰围英寸。',
      '不同品牌相差 1~3cm，商品页的实测表永远优先。',
    ],
    [
      '這裡的胸圍、腰圍、身高都是身體尺寸，不是衣服平鋪的尺寸。',
      '女裝號數從 55（身高 155、胸圍 85）起，每檔身高加 5cm、胸圍加 3cm。',
      '男裝上衣的號數就是胸圍，下著按腰圍英寸。',
      '不同品牌相差 1~3cm，商品頁的實測表永遠優先。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '옷 사이즈 환산 — 44·55·66과 S·M·L, 남성 95·100·105',
    'Clothing size conversion — Korean 44/55/66 against S/M/L',
    'Conversión de tallas — 44/55/66 coreanas frente a S/M/L',
    'Conversão de tamanhos — 44/55/66 coreanos e S/M/L',
    '服のサイズ変換 — 44・55・66とS・M・L、メンズ95・100・105',
    'Kleidergrößen umrechnen — koreanisch 44/55/66 gegen S/M/L',
    'Conversion des tailles — 44/55/66 coréennes face au S/M/L',
    'कपड़ों के आकार बदलें — कोरियाई 44/55/66 बनाम S/M/L',
    '服装尺码换算 — 韩国 44/55/66 对照 S/M/L',
    '服裝尺碼換算 — 韓國 44/55/66 對照 S/M/L',
  ),

  hubMetaDesc: T(
    '가슴둘레 88cm는 여성 66호, 남성 상의로는 90호입니다. 대상 5가지와 치수가 만나는 100칸마다 한국 호수·국제 표기·인치를 계산했고, 그 호수가 상정한 키와 가슴둘레도 함께 냅니다.',
    'An 88 cm bust is a Korean 66 for women and a 90 on the men’s scale. For all 100 pairings of range and measurement: the Korean number, the international letter, the inch figure, and the height and bust each size assumes.',
    'Un pecho de 88 cm es una 66 coreana en mujer y una 90 en hombre. Para los 100 cruces de gama y medida: el número coreano, la letra internacional, las pulgadas y la estatura y el pecho que supone cada talla.',
    'Um busto de 88 cm é 66 na escala feminina coreana e 90 na masculina. Para os 100 cruzamentos: o número coreano, a letra internacional, as polegadas e a altura e o busto que cada tamanho supõe.',
    '胸囲88cmは女性の66号、メンズトップスでは90号です。対象5種と寸法が出会う100マスの韓国号数・国際表記・インチと、その号数が想定する身長と胸囲を計算しました。',
    'Ein Brustumfang von 88 cm ist koreanisch 66 bei Damen und 90 bei Herren. Für alle 100 Kombinationen: koreanische Zahl, internationaler Buchstabe, Zollwert sowie Größe und Brustumfang, die jede Größe unterstellt.',
    'Une poitrine de 88 cm vaut un 66 coréen en femme et un 90 en homme. Pour les 100 croisements : le numéro coréen, la lettre internationale, les pouces, et la stature et la poitrine supposées par chaque taille.',
    '88 सेमी छाती महिला में कोरियाई 66 और पुरुष में 90 है। सभी 100 मेलों का कोरियाई नंबर, अंतरराष्ट्रीय अक्षर, इंच, और हर आकार जो क़द और छाती मानता है।',
    '胸围 88cm 在女装是韩国 66 号，在男装则是 90 号。5 类与尺寸交汇的 100 格，都算出韩国号数、国际字母码、英寸，以及该号数设定的身高和胸围。',
    '胸圍 88cm 在女裝是韓國 66 號，在男裝則是 90 號。5 類與尺寸交匯的 100 格，都算出韓國號數、國際字母碼、英寸，以及該號數設定的身高和胸圍。',
  ),

  desc: T<(f: SizeFacts) => string>(
    f => `${f.measure === 'bust' ? '가슴둘레' : f.measure === 'waist' ? '허리둘레' : '키'} ${f.cell.cm}cm면 ${grpKo(f.cell.key)} ${f.korea}호, 국제 표기로는 ${f.intl}입니다.${f.assumes ? ` 이 호수는 키 ${f.assumes.height}cm·가슴 ${f.assumes.bust}cm를 상정합니다.` : ''}`,
    f => `A ${f.measure} of ${f.cell.cm} cm puts you at ${f.korea} in ${grpEn(f.cell.key)}, or ${f.intl} internationally.${f.assumes ? ` That size assumes ${f.assumes.height} cm of height and an ${f.assumes.bust} cm bust.` : ''}`,
    f => `Con ${f.cell.cm} cm de ${f.measure === 'bust' ? 'pecho' : f.measure === 'waist' ? 'cintura' : 'estatura'} te corresponde la ${f.korea} en ${grpEs(f.cell.key)}, o ${f.intl} internacional.${f.assumes ? ` Esa talla supone ${f.assumes.height} cm de estatura y ${f.assumes.bust} de pecho.` : ''}`,
    f => `Com ${f.cell.cm} cm de ${f.measure === 'bust' ? 'peito' : f.measure === 'waist' ? 'cintura' : 'altura'}, você fica no ${f.korea} em ${grpPt(f.cell.key)}, ou ${f.intl} internacional.${f.assumes ? ` Esse tamanho supõe ${f.assumes.height} cm de altura e ${f.assumes.bust} de busto.` : ''}`,
    f => `${f.measure === 'bust' ? '胸囲' : f.measure === 'waist' ? 'ウエスト' : '身長'}${f.cell.cm}cmなら${grpJa(f.cell.key)}の${f.korea}号、国際表記では${f.intl}です。${f.assumes ? ` この号数は身長${f.assumes.height}cm・胸囲${f.assumes.bust}cmを想定します。` : ''}`,
    f => `${f.cell.cm} cm ${f.measure === 'bust' ? 'Brustumfang' : f.measure === 'waist' ? 'Taille' : 'Körpergröße'} ergeben bei ${grpDe(f.cell.key)} die ${f.korea}, international ${f.intl}.${f.assumes ? ` Diese Größe unterstellt ${f.assumes.height} cm Körpergröße und ${f.assumes.bust} cm Brustumfang.` : ''}`,
    f => `Avec ${f.cell.cm} cm de ${f.measure === 'bust' ? 'poitrine' : f.measure === 'waist' ? 'tour de taille' : 'stature'}, vous êtes en ${f.korea} pour les ${grpFr(f.cell.key)}, soit ${f.intl} à l’international.${f.assumes ? ` Cette taille suppose ${f.assumes.height} cm et ${f.assumes.bust} cm de poitrine.` : ''}`,
    f => `${f.cell.cm} सेमी ${f.measure === 'bust' ? 'छाती' : f.measure === 'waist' ? 'कमर' : 'ऊँचाई'} पर ${grpHi(f.cell.key)} में ${f.korea} और अंतरराष्ट्रीय स्तर पर ${f.intl}।${f.assumes ? ` यह आकार ${f.assumes.height} सेमी क़द और ${f.assumes.bust} सेमी छाती मानता है।` : ''}`,
    f => `${f.measure === 'bust' ? '胸围' : f.measure === 'waist' ? '腰围' : '身高'} ${f.cell.cm}cm，在${grpZh(f.cell.key)}是 ${f.korea} 号，国际尺码为 ${f.intl}。${f.assumes ? ` 该号数设定身高 ${f.assumes.height}cm、胸围 ${f.assumes.bust}cm。` : ''}`,
    f => `${f.measure === 'bust' ? '胸圍' : f.measure === 'waist' ? '腰圍' : '身高'} ${f.cell.cm}cm，在${grpTw(f.cell.key)}是 ${f.korea} 號，國際尺碼為 ${f.intl}。${f.assumes ? ` 該號數設定身高 ${f.assumes.height}cm、胸圍 ${f.assumes.bust}cm。` : ''}`,
  ),

  metaTitle: T<(f: SizeFacts) => string>(
    f => `${grpKo(f.cell.key)} ${f.cell.cm}cm — ${f.korea}호 · ${f.intl}`,
    f => `${grpEn(f.cell.key)} at ${f.cell.cm} cm — size ${f.korea} · ${f.intl}`,
    f => `${grpEs(f.cell.key)} con ${f.cell.cm} cm — talla ${f.korea} · ${f.intl}`,
    f => `${grpPt(f.cell.key)} com ${f.cell.cm} cm — tamanho ${f.korea} · ${f.intl}`,
    f => `${grpJa(f.cell.key)} ${f.cell.cm}cm — ${f.korea}号 · ${f.intl}`,
    f => `${grpDe(f.cell.key)} bei ${f.cell.cm} cm — Größe ${f.korea} · ${f.intl}`,
    f => `${grpFr(f.cell.key)} à ${f.cell.cm} cm — taille ${f.korea} · ${f.intl}`,
    f => `${grpHi(f.cell.key)} ${f.cell.cm} सेमी — आकार ${f.korea} · ${f.intl}`,
    f => `${grpZh(f.cell.key)} ${f.cell.cm}cm — ${f.korea} 号 · ${f.intl}`,
    f => `${grpTw(f.cell.key)} ${f.cell.cm}cm — ${f.korea} 號 · ${f.intl}`,
  ),

  metaDesc: T<(f: SizeFacts) => string>(
    f => `${grpKo(f.cell.key)}에서 ${f.measure === 'bust' ? '가슴둘레' : f.measure === 'waist' ? '허리둘레' : '키'} ${f.cell.cm}cm는 ${f.korea}호이고 국제 표기로 ${f.intl}, 인치로는 ${f.inch}입니다.${f.assumes ? ` 이 호수가 상정한 몸은 키 ${f.assumes.height}cm·가슴 ${f.assumes.bust}cm입니다.` : ''}`,
    f => `In ${grpEn(f.cell.key)}, a ${f.measure} of ${f.cell.cm} cm is size ${f.korea}, ${f.intl} internationally, ${f.inch} inches.${f.assumes ? ` The size assumes ${f.assumes.height} cm of height and an ${f.assumes.bust} cm bust.` : ''}`,
    f => `En ${grpEs(f.cell.key)}, ${f.cell.cm} cm equivalen a la talla ${f.korea}, ${f.intl} internacional, ${f.inch} pulgadas.${f.assumes ? ` La talla supone ${f.assumes.height} cm y ${f.assumes.bust} de pecho.` : ''}`,
    f => `Em ${grpPt(f.cell.key)}, ${f.cell.cm} cm equivalem ao tamanho ${f.korea}, ${f.intl} internacional, ${f.inch} polegadas.${f.assumes ? ` O tamanho supõe ${f.assumes.height} cm e ${f.assumes.bust} de busto.` : ''}`,
    f => `${grpJa(f.cell.key)}では${f.cell.cm}cmが${f.korea}号、国際表記で${f.intl}、インチでは${f.inch}です。${f.assumes ? ` この号数が想定する体は身長${f.assumes.height}cm・胸囲${f.assumes.bust}cmです。` : ''}`,
    f => `Bei ${grpDe(f.cell.key)} entsprechen ${f.cell.cm} cm der Größe ${f.korea}, international ${f.intl}, ${f.inch} Zoll.${f.assumes ? ` Die Größe unterstellt ${f.assumes.height} cm und ${f.assumes.bust} cm Brustumfang.` : ''}`,
    f => `Pour les ${grpFr(f.cell.key)}, ${f.cell.cm} cm donnent la taille ${f.korea}, ${f.intl} à l’international, ${f.inch} pouces.${f.assumes ? ` Cette taille suppose ${f.assumes.height} cm et ${f.assumes.bust} cm de poitrine.` : ''}`,
    f => `${grpHi(f.cell.key)} में ${f.cell.cm} सेमी का अर्थ है आकार ${f.korea}, अंतरराष्ट्रीय ${f.intl}, ${f.inch} इंच।${f.assumes ? ` यह आकार ${f.assumes.height} सेमी क़द और ${f.assumes.bust} सेमी छाती मानता है।` : ''}`,
    f => `在${grpZh(f.cell.key)}中，${f.cell.cm}cm 对应 ${f.korea} 号，国际尺码 ${f.intl}，合 ${f.inch} 英寸。${f.assumes ? ` 该号数设定身高 ${f.assumes.height}cm、胸围 ${f.assumes.bust}cm。` : ''}`,
    f => `在${grpTw(f.cell.key)}中，${f.cell.cm}cm 對應 ${f.korea} 號，國際尺碼 ${f.intl}，合 ${f.inch} 英寸。${f.assumes ? ` 該號數設定身高 ${f.assumes.height}cm、胸圍 ${f.assumes.bust}cm。` : ''}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '55 사이즈는 무슨 뜻인가요?', a: '키 155cm·가슴둘레 85cm를 상정한 호수입니다. 1981년 표준이 그때의 평균을 55로 삼은 데서 왔습니다.' },
      { q: '66은 55보다 얼마나 큰가요?', a: '키로 5cm, 가슴둘레로 3cm 큽니다. 한 호수가 그만큼씩 움직입니다.' },
      { q: '남성 100 사이즈는 가슴 몇 cm인가요?', a: '100cm입니다. 남성 상의는 호수가 곧 가슴둘레라 숫자를 그대로 읽으면 됩니다.' },
      { q: '허리 80cm는 몇 인치인가요?', a: '31인치입니다. 2.54로 나눈 값이고, 매장에는 30·32처럼 짝수로 갖춰 둔 곳이 많습니다.' },
      { q: '같은 호수인데 옷마다 다른 이유가 뭔가요?', a: '브랜드마다 패턴이 달라 1~3cm씩 차이 나기 때문입니다. 상품 페이지에 실측표가 있으면 그쪽을 먼저 보십시오.' },
    ],
    [
      { q: 'What does Korean size 55 mean?', a: 'It assumes someone 155 cm tall with an 85 cm bust. A 1981 standard took the average woman of the day and called her 55.' },
      { q: 'How much bigger is 66 than 55?', a: 'Five centimetres in height and three in the bust. Every step moves by exactly that much.' },
      { q: 'What chest is a men’s 100?', a: '100 cm. A men’s top is labelled with the chest measurement itself, so the number reads straight off.' },
      { q: 'How many inches is an 80 cm waist?', a: '31 inches — the centimetres divided by 2.54. Shops usually stock even numbers like 30 and 32.' },
      { q: 'Why do garments of the same size fit differently?', a: 'Because each brand cuts to its own pattern, differing by one to three centimetres. If the product page lists real measurements, trust those first.' },
    ],
    [
      { q: '¿Qué significa la talla coreana 55?', a: 'Supone 155 cm de estatura y 85 cm de pecho. Una norma de 1981 tomó a la mujer media de entonces y la llamó 55.' },
      { q: '¿Cuánto más grande es la 66 que la 55?', a: 'Cinco centímetros de estatura y tres de pecho. Cada paso avanza justo eso.' },
      { q: '¿Qué pecho es una 100 de hombre?', a: '100 cm. La prenda de hombre lleva la medida de pecho como número, así que se lee directamente.' },
      { q: '¿Cuántas pulgadas son 80 cm de cintura?', a: '31 pulgadas, los centímetros divididos entre 2,54. Las tiendas suelen tener pares como 30 y 32.' },
      { q: '¿Por qué la misma talla queda distinta según la prenda?', a: 'Porque cada marca corta con su patrón y varía de uno a tres centímetros. Si la ficha del producto trae medidas, esas primero.' },
    ],
    [
      { q: 'O que significa o tamanho coreano 55?', a: 'Supõe 155 cm de altura e 85 cm de busto. Uma norma de 1981 pegou a mulher média da época e chamou de 55.' },
      { q: 'Quanto o 66 é maior que o 55?', a: 'Cinco centímetros de altura e três de busto. Cada passo anda exatamente isso.' },
      { q: 'Que peito é um 100 masculino?', a: '100 cm. A peça masculina traz a medida do peito como número, então lê-se direto.' },
      { q: 'Quantas polegadas são 80 cm de cintura?', a: '31 polegadas — os centímetros divididos por 2,54. As lojas costumam ter pares como 30 e 32.' },
      { q: 'Por que o mesmo tamanho veste diferente?', a: 'Porque cada marca corta no próprio molde, variando de um a três centímetros. Se a página do produto traz medidas, elas vêm primeiro.' },
    ],
    [
      { q: '55サイズはどういう意味ですか？', a: '身長155cm・胸囲85cmを想定した号数です。1981年の規格が当時の平均を55としたことから来ています。' },
      { q: '66は55よりどれくらい大きいですか？', a: '身長で5cm、胸囲で3cm大きいです。1号数がちょうどその分だけ動きます。' },
      { q: 'メンズの100サイズは胸囲何cmですか？', a: '100cmです。メンズトップスは号数がそのまま胸囲なので数字をそのまま読めます。' },
      { q: 'ウエスト80cmは何インチですか？', a: '31インチです。2.54で割った値で、店頭では30・32のような偶数で揃えていることが多いです。' },
      { q: '同じ号数なのに服ごとに違うのはなぜですか？', a: 'ブランドごとにパターンが違い1〜3cmずれるからです。商品ページに実寸表があるならそちらを先に見てください。' },
    ],
    [
      { q: 'Was bedeutet die koreanische Größe 55?', a: 'Sie unterstellt 155 cm Körpergröße und 85 cm Brustumfang. Eine Norm von 1981 nahm die damalige Durchschnittsfrau und nannte sie 55.' },
      { q: 'Wie viel größer ist 66 als 55?', a: 'Fünf Zentimeter in der Körpergröße und drei im Brustumfang. Genau so viel macht jede Stufe aus.' },
      { q: 'Welchen Brustumfang hat eine Herren-100?', a: '100 cm. Herrenoberteile tragen das Brustmaß als Zahl, man liest es direkt ab.' },
      { q: 'Wie viel Zoll sind 80 cm Taille?', a: '31 Zoll — Zentimeter geteilt durch 2,54. Läden führen meist gerade Zahlen wie 30 und 32.' },
      { q: 'Warum sitzt dieselbe Größe unterschiedlich?', a: 'Weil jede Marke nach eigenem Schnitt fertigt, mit ein bis drei Zentimetern Abweichung. Nennt die Produktseite Maße, gelten diese zuerst.' },
    ],
    [
      { q: 'Que signifie la taille coréenne 55 ?', a: 'Elle suppose 155 cm de stature et 85 cm de poitrine. Une norme de 1981 a pris la femme moyenne d’alors et l’a nommée 55.' },
      { q: 'De combien le 66 dépasse-t-il le 55 ?', a: 'De cinq centimètres en stature et trois en poitrine. Chaque échelon vaut exactement cela.' },
      { q: 'Quelle poitrine pour un 100 homme ?', a: '100 cm. Le haut homme porte la mesure de poitrine comme numéro : on le lit directement.' },
      { q: 'Combien de pouces pour 80 cm de tour de taille ?', a: '31 pouces — les centimètres divisés par 2,54. Les magasins tiennent surtout les nombres pairs, 30 et 32.' },
      { q: 'Pourquoi la même taille tombe-t-elle différemment ?', a: 'Parce que chaque marque coupe sur son patron, à un à trois centimètres près. Si la fiche produit donne des mesures, elles priment.' },
    ],
    [
      { q: 'कोरियाई आकार 55 का क्या अर्थ है?', a: 'यह 155 सेमी क़द और 85 सेमी छाती मानता है। 1981 के मानक ने उस समय की औसत महिला को 55 कहा था।' },
      { q: '66, 55 से कितना बड़ा है?', a: 'क़द में पाँच सेंटीमीटर और छाती में तीन। हर सीढ़ी बिलकुल इतनी ही चलती है।' },
      { q: 'पुरुष 100 का सीना कितना है?', a: '100 सेमी। पुरुष टॉप पर छाती का माप ही संख्या है, इसलिए सीधे पढ़ लीजिए।' },
      { q: '80 सेमी कमर कितने इंच है?', a: '31 इंच — सेंटीमीटर को 2.54 से भाग देकर। दुकानों में अक्सर 30, 32 जैसे सम अंक मिलते हैं।' },
      { q: 'एक ही आकार अलग-अलग क्यों फ़िट होता है?', a: 'क्योंकि हर ब्रांड अपने पैटर्न पर काटता है, 1–3 सेमी का अंतर आता है। उत्पाद पृष्ठ पर माप हों तो पहले वही देखें।' },
    ],
    [
      { q: '55 码是什么意思？', a: '它设定的是身高 155cm、胸围 85cm。1981 年的标准把当时女性的平均值定为 55。' },
      { q: '66 比 55 大多少？', a: '身高大 5cm，胸围大 3cm。每往上一档正好就是这么多。' },
      { q: '男装 100 码是胸围多少？', a: '100cm。男装上衣的号数就是胸围，数字可以直接读。' },
      { q: '腰围 80cm 是多少英寸？', a: '31 英寸，也就是厘米除以 2.54。店里多半只备 30、32 这样的偶数。' },
      { q: '为什么同样的号数上身感觉不一样？', a: '因为各品牌版型不同，会差 1~3cm。商品页若有实测尺寸，请以那个为准。' },
    ],
    [
      { q: '55 碼是什麼意思？', a: '它設定的是身高 155cm、胸圍 85cm。1981 年的標準把當時女性的平均值定為 55。' },
      { q: '66 比 55 大多少？', a: '身高大 5cm，胸圍大 3cm。每往上一檔正好就是這麼多。' },
      { q: '男裝 100 碼是胸圍多少？', a: '100cm。男裝上衣的號數就是胸圍，數字可以直接讀。' },
      { q: '腰圍 80cm 是多少英寸？', a: '31 英寸，也就是公分除以 2.54。店裡多半只備 30、32 這樣的偶數。' },
      { q: '為什麼同樣的號數上身感覺不一樣？', a: '因為各品牌版型不同，會差 1~3cm。商品頁若有實測尺寸，請以那個為準。' },
    ],
  ),

  cellFaq: T<(f: SizeFacts) => FaqItem[]>(
    f => [
      { q: `${f.measure === 'bust' ? '가슴둘레' : f.measure === 'waist' ? '허리둘레' : '키'} ${f.cell.cm}cm면 몇 호인가요?`, a: `${grpKo(f.cell.key)} 기준 ${f.korea}호이고, 국제 표기로는 ${f.intl}입니다.` },
      { q: `인치로는 얼마인가요?`, a: `${f.inch}인치입니다. 센티미터를 2.54로 나눈 값입니다.` },
      { q: `${f.assumes ? '이 호수는 어떤 몸을 상정하나요?' : '이 호수는 무엇을 뜻하나요?'}`, a: `${f.assumes ? `키 ${f.assumes.height}cm·가슴둘레 ${f.assumes.bust}cm입니다. 55(키 155·가슴 85)에서 한 호수마다 키 5cm·가슴 3cm씩 움직인 값입니다.` : `${f.cell.key === 'kids' ? '아동복은 호수가 곧 키입니다.' : f.cell.key === 'mtop' ? '남성 상의는 호수가 곧 가슴둘레입니다.' : '남성 하의는 허리 인치를 그대로 호수로 씁니다.'}`}` },
      { q: `한 호수 차이는 얼마나 되나요?`, a: `${f.span}cm입니다. 그 안에 들면 같은 호수로 묶입니다.` },
    ],
    f => [
      { q: `What size is a ${f.measure} of ${f.cell.cm} cm?`, a: `Size ${f.korea} in ${grpEn(f.cell.key)}, or ${f.intl} internationally.` },
      { q: `What is that in inches?`, a: `${f.inch} inches — the centimetres divided by 2.54.` },
      { q: `${f.assumes ? 'What body does this size assume?' : 'What does this number mean?'}`, a: `${f.assumes ? `${f.assumes.height} cm of height and an ${f.assumes.bust} cm bust. It follows from 55 (155 cm, 85 cm) moving 5 cm and 3 cm per step.` : `${f.cell.key === 'kids' ? 'Children’s sizes are labelled with the height itself.' : f.cell.key === 'mtop' ? 'A men’s top is labelled with the chest measurement itself.' : 'Men’s bottoms use the waist in inches as the label.'}`}` },
      { q: `How wide is one size step?`, a: `${f.span} cm. Anything inside that range shares the same size.` },
    ],
    f => [
      { q: `¿Qué talla son ${f.cell.cm} cm?`, a: `La ${f.korea} en ${grpEs(f.cell.key)}, o ${f.intl} internacional.` },
      { q: `¿Cuánto es en pulgadas?`, a: `${f.inch} pulgadas, los centímetros divididos entre 2,54.` },
      { q: `${f.assumes ? '¿Qué cuerpo supone esta talla?' : '¿Qué significa este número?'}`, a: `${f.assumes ? `${f.assumes.height} cm de estatura y ${f.assumes.bust} de pecho, partiendo de la 55 (155 y 85) con pasos de 5 y 3 cm.` : `${f.cell.key === 'kids' ? 'La ropa infantil lleva la estatura como talla.' : f.cell.key === 'mtop' ? 'La prenda de hombre lleva la medida de pecho como número.' : 'Los pantalones de hombre usan la cintura en pulgadas.'}`}` },
      { q: `¿Cuánto abarca un paso de talla?`, a: `${f.span} cm. Todo lo que caiga dentro comparte talla.` },
    ],
    f => [
      { q: `Que tamanho são ${f.cell.cm} cm?`, a: `O ${f.korea} em ${grpPt(f.cell.key)}, ou ${f.intl} internacional.` },
      { q: `Quanto é em polegadas?`, a: `${f.inch} polegadas — os centímetros divididos por 2,54.` },
      { q: `${f.assumes ? 'Que corpo este tamanho supõe?' : 'O que este número significa?'}`, a: `${f.assumes ? `${f.assumes.height} cm de altura e ${f.assumes.bust} de busto, partindo do 55 (155 e 85) com passos de 5 e 3 cm.` : `${f.cell.key === 'kids' ? 'A roupa infantil traz a altura como tamanho.' : f.cell.key === 'mtop' ? 'A peça masculina traz a medida do peito como número.' : 'As calças masculinas usam a cintura em polegadas.'}`}` },
      { q: `Quanto cobre um passo de tamanho?`, a: `${f.span} cm. Tudo dentro dessa faixa divide o mesmo tamanho.` },
    ],
    f => [
      { q: `${f.cell.cm}cmは何号ですか？`, a: `${grpJa(f.cell.key)}では${f.korea}号、国際表記では${f.intl}です。` },
      { q: `インチではいくつですか？`, a: `${f.inch}インチです。センチを2.54で割った値です。` },
      { q: `${f.assumes ? 'この号数はどんな体を想定しますか？' : 'この号数は何を意味しますか？'}`, a: `${f.assumes ? `身長${f.assumes.height}cm・胸囲${f.assumes.bust}cmです。55(身長155・胸囲85)から1号数ごとに5cm・3cm動いた値です。` : `${f.cell.key === 'kids' ? '子ども服は号数がそのまま身長です。' : f.cell.key === 'mtop' ? 'メンズトップスは号数がそのまま胸囲です。' : 'メンズボトムスはウエストのインチをそのまま号数にします。'}`}` },
      { q: `1号数の差はどれくらいですか？`, a: `${f.span}cmです。その中に入れば同じ号数にまとめられます。` },
    ],
    f => [
      { q: `Welche Größe sind ${f.cell.cm} cm?`, a: `Größe ${f.korea} bei ${grpDe(f.cell.key)}, international ${f.intl}.` },
      { q: `Wie viel ist das in Zoll?`, a: `${f.inch} Zoll — Zentimeter geteilt durch 2,54.` },
      { q: `${f.assumes ? 'Welchen Körper unterstellt diese Größe?' : 'Was bedeutet diese Zahl?'}`, a: `${f.assumes ? `${f.assumes.height} cm Körpergröße und ${f.assumes.bust} cm Brustumfang — ausgehend von 55 (155 und 85) in Schritten von 5 und 3 cm.` : `${f.cell.key === 'kids' ? 'Kinderkleidung trägt die Körpergröße als Größenangabe.' : f.cell.key === 'mtop' ? 'Herrenoberteile tragen das Brustmaß als Zahl.' : 'Herrenhosen nutzen die Taille in Zoll als Bezeichnung.'}`}` },
      { q: `Wie breit ist eine Größenstufe?`, a: `${f.span} cm. Alles darin fällt in dieselbe Größe.` },
    ],
    f => [
      { q: `Quelle taille pour ${f.cell.cm} cm ?`, a: `La ${f.korea} en ${grpFr(f.cell.key)}, soit ${f.intl} à l’international.` },
      { q: `Cela fait combien en pouces ?`, a: `${f.inch} pouces — les centimètres divisés par 2,54.` },
      { q: `${f.assumes ? 'Quel corps cette taille suppose-t-elle ?' : 'Que signifie ce nombre ?'}`, a: `${f.assumes ? `${f.assumes.height} cm de stature et ${f.assumes.bust} cm de poitrine, à partir du 55 (155 et 85) par pas de 5 et 3 cm.` : `${f.cell.key === 'kids' ? 'Les vêtements enfant portent la stature comme taille.' : f.cell.key === 'mtop' ? 'Le haut homme porte la mesure de poitrine comme numéro.' : 'Le bas homme utilise le tour de taille en pouces.'}`}` },
      { q: `Quel écart entre deux tailles ?`, a: `${f.span} cm. Tout ce qui tombe dans cet intervalle partage la même taille.` },
    ],
    f => [
      { q: `${f.cell.cm} सेमी कौन सा आकार है?`, a: `${grpHi(f.cell.key)} में ${f.korea}, अंतरराष्ट्रीय स्तर पर ${f.intl}।` },
      { q: `इंच में कितना है?`, a: `${f.inch} इंच — सेंटीमीटर को 2.54 से भाग देकर।` },
      { q: `${f.assumes ? 'यह आकार कौन सा शरीर मानता है?' : 'इस संख्या का क्या अर्थ है?'}`, a: `${f.assumes ? `${f.assumes.height} सेमी क़द और ${f.assumes.bust} सेमी छाती — 55 (155 और 85) से हर सीढ़ी पर 5 और 3 सेमी।` : `${f.cell.key === 'kids' ? 'बच्चों के कपड़ों पर क़द ही आकार होता है।' : f.cell.key === 'mtop' ? 'पुरुष टॉप पर छाती का माप ही संख्या है।' : 'पुरुष बॉटम में कमर की इंच ही लेबल है।'}`}` },
      { q: `एक आकार का अंतर कितना है?`, a: `${f.span} सेमी। इसके भीतर सब एक ही आकार में आते हैं।` },
    ],
    f => [
      { q: `${f.cell.cm}cm 是几号？`, a: `在${grpZh(f.cell.key)}是 ${f.korea} 号，国际尺码为 ${f.intl}。` },
      { q: `换成英寸是多少？`, a: `${f.inch} 英寸，也就是厘米除以 2.54。` },
      { q: `${f.assumes ? '这个号数设定的是什么身材？' : '这个数字是什么意思？'}`, a: `${f.assumes ? `身高 ${f.assumes.height}cm、胸围 ${f.assumes.bust}cm。从 55（155、85）起，每档加 5cm 和 3cm。` : `${f.cell.key === 'kids' ? '童装的号数就是身高。' : f.cell.key === 'mtop' ? '男装上衣的号数就是胸围。' : '男装下装直接用腰围英寸作号数。'}`}` },
      { q: `相邻两个号数差多少？`, a: `${f.span}cm。落在这个范围内的都归同一号。` },
    ],
    f => [
      { q: `${f.cell.cm}cm 是幾號？`, a: `在${grpTw(f.cell.key)}是 ${f.korea} 號，國際尺碼為 ${f.intl}。` },
      { q: `換成英寸是多少？`, a: `${f.inch} 英寸，也就是公分除以 2.54。` },
      { q: `${f.assumes ? '這個號數設定的是什麼身材？' : '這個數字是什麼意思？'}`, a: `${f.assumes ? `身高 ${f.assumes.height}cm、胸圍 ${f.assumes.bust}cm。從 55（155、85）起，每檔加 5cm 和 3cm。` : `${f.cell.key === 'kids' ? '童裝的號數就是身高。' : f.cell.key === 'mtop' ? '男裝上衣的號數就是胸圍。' : '男裝下著直接用腰圍英寸作號數。'}`}` },
      { q: `相鄰兩個號數差多少？`, a: `${f.span}cm。落在這個範圍內的都歸同一號。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const SIZE_UI: L<SizeUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<SizeUI>;
