/**
 * 브래지어 표기 화면의 문구 — 열 언어.
 *
 * 이 화면이 말하려는 것은 "표기는 외울 표가 아니라 두 치수의 결과"다.
 * 앞의 숫자는 밑가슴둘레, 뒤의 알파벳은 윗가슴과의 차이가 몇 칸인지다.
 * 한국·일본은 AA를 7.5cm에 두고 2.5cm마다 한 컵씩 올린다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { BraFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface BraUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  underLabel: string;
  bustLabel: string;
  diffLabel: string;
  labelLabel: string;
  cupLabel: string;
  bandLabel: string;
  inchLabel: string;
  spanLabel: string;
  ruleTitle: string;
  ruleNote: string;
  measureTitle: string;
  measureNote: string;
  intlTitle: string;
  intlNote: string;
  fitTitle: string;
  fitNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  diffRowTitle: string;
  underRowTitle: string;
  desc: (f: BraFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: BraFacts) => string;
  metaDesc: (f: BraFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: BraFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof BraUI]: L<BraUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('브래지어 사이즈', 'Bra sizes', 'Tallas de sujetador', 'Tamanhos de sutiã', 'ブラのサイズ', 'BH-Größen', 'Tailles de soutien-gorge', 'ब्रा साइज़', '文胸尺码', '內衣尺碼'),

  hubTitle: T(
    '브래지어 100칸 — 차이 12.5cm가 B컵입니다',
    '100 bra sizes — a 12.5 cm difference is a B cup',
    '100 tallas de sujetador — 12,5 cm de diferencia son una copa B',
    '100 tamanhos de sutiã — 12,5 cm de diferença são um bojo B',
    'ブラのサイズ100マス — 差12.5cmがBカップ',
    '100 BH-Größen — 12,5 cm Differenz sind Cup B',
    '100 tailles de soutien-gorge — 12,5 cm d’écart font un bonnet B',
    '100 ब्रा साइज़ — 12.5 सेमी का अंतर यानी B कप',
    '100 个文胸尺码 — 相差 12.5cm 就是 B 罩杯',
    '100 個內衣尺碼 — 相差 12.5cm 就是 B 罩杯',
  ),

  hubLead: T(
    '밑가슴둘레 10가지와 가슴 차이 10가지가 만나는 칸마다 표기를 계산했습니다. 앞의 숫자는 밑가슴둘레, 뒤의 알파벳은 윗가슴과의 차이가 몇 칸인지입니다 — 표를 외울 것이 아닙니다.',
    'A label for every meeting of 10 underbust measurements and 10 differences. The number is the underbust; the letter is how many steps the gap to the full bust covers. There is nothing to memorise.',
    'Una talla para cada cruce de 10 contornos bajo el pecho y 10 diferencias. El número es el contorno inferior; la letra, cuántos pasos abarca la diferencia con el contorno de pecho. No hay tabla que memorizar.',
    'Um tamanho para cada cruzamento de 10 medidas sob o busto e 10 diferenças. O número é a medida inferior; a letra, quantos passos a diferença até o busto cobre. Não há tabela para decorar.',
    'アンダーバスト10通りと差10通りが出会う各マスの表記を計算しました。前の数字はアンダーバスト、後ろのアルファベットはトップとの差が何段かです — 表を覚える必要はありません。',
    'Eine Größe für jede Begegnung von 10 Unterbrustmaßen und 10 Differenzen. Die Zahl ist der Unterbrustumfang, der Buchstabe zählt die Stufen bis zum Oberbrustumfang. Nichts zum Auswendiglernen.',
    'Une taille pour chaque croisement de 10 tours de dessous de poitrine et 10 écarts. Le nombre, c’est le dessous de poitrine ; la lettre compte les crans jusqu’au tour de poitrine. Rien à mémoriser.',
    '10 अंडरबस्ट माप और 10 अंतरों के हर मेल का लेबल। संख्या अंडरबस्ट है; अक्षर बताता है कि बस्ट तक का अंतर कितने चरण का है — याद करने के लिए कोई तालिका नहीं।',
    '10 种下胸围与 10 种差值交汇的每一格都算出尺码。数字是下胸围，字母是与上胸围之差跨了几档——没有要背的表。',
    '10 種下胸圍與 10 種差值交匯的每一格都算出尺碼。數字是下胸圍，字母是與上胸圍之差跨了幾檔——沒有要背的表。',
  ),

  underLabel: T('밑가슴둘레', 'Underbust', 'Contorno bajo el pecho', 'Medida sob o busto', 'アンダーバスト', 'Unterbrustumfang', 'Tour de dessous de poitrine', 'अंडरबस्ट', '下胸围', '下胸圍'),
  bustLabel: T('윗가슴둘레', 'Full bust', 'Contorno de pecho', 'Contorno do busto', 'トップバスト', 'Oberbrustumfang', 'Tour de poitrine', 'बस्ट', '上胸围', '上胸圍'),
  diffLabel: T('두 치수의 차이', 'The difference', 'La diferencia', 'A diferença', '2つの差', 'Die Differenz', 'L’écart', 'अंतर', '两者之差', '兩者之差'),
  labelLabel: T('표기', 'Label', 'Talla', 'Tamanho', '表記', 'Größe', 'Taille', 'लेबल', '尺码', '尺碼'),
  cupLabel: T('컵', 'Cup', 'Copa', 'Bojo', 'カップ', 'Cup', 'Bonnet', 'कप', '罩杯', '罩杯'),
  bandLabel: T('표기 앞 숫자', 'Band number', 'Número de banda', 'Número da banda', '表記の数字', 'Bandmaß', 'Numéro de bande', 'बैंड संख्या', '下围数字', '下圍數字'),
  inchLabel: T('인치', 'inches', 'pulgadas', 'polegadas', 'インチ', 'Zoll', 'pouces', 'इंच', '英寸', '英寸'),
  spanLabel: T('한 컵이 덮는 폭', 'What one cup step covers', 'Lo que abarca una copa', 'O que um bojo cobre', '1カップが覆う幅', 'Spanne eines Cups', 'Écart d’un bonnet', 'एक कप का दायरा', '一个罩杯的跨度', '一個罩杯的跨度'),

  ruleTitle: T('컵은 2.5cm마다 한 칸입니다', 'Each cup is 2.5 cm apart', 'Cada copa dista 2,5 cm', 'Cada bojo dista 2,5 cm', 'カップは2.5cmごとに1段です', 'Jeder Cup liegt 2,5 cm auseinander', 'Chaque bonnet vaut 2,5 cm', 'हर कप 2.5 सेमी की दूरी पर', '每个罩杯相差 2.5cm', '每個罩杯相差 2.5cm'),

  ruleNote: T(
    '한국·일본은 윗가슴에서 밑가슴을 뺀 차이가 7.5cm일 때를 AA로 두고, 2.5cm가 늘 때마다 한 컵씩 올립니다. 10cm면 A, 12.5cm면 B, 15cm면 C입니다. 그래서 차이가 12cm로 나왔다면 (12 − 7.5) ÷ 2.5 = 1.8, 반올림해 두 칸이니 B입니다 — 표를 찾을 것 없이 계산으로 나옵니다.',
    'In Korea and Japan the gap between full bust and underbust is called AA at 7.5 cm, and every further 2.5 cm moves up one cup: 10 cm is A, 12.5 cm is B, 15 cm is C. So a measured gap of 12 cm gives (12 − 7.5) ÷ 2.5 = 1.8, which rounds to two steps — a B. No table needed.',
    'En Corea y Japón, la diferencia entre el contorno de pecho y el de bajo pecho se llama AA a los 7,5 cm, y cada 2,5 cm más sube una copa: 10 cm es A, 12,5 cm es B, 15 cm es C. Una diferencia medida de 12 cm da (12 − 7,5) ÷ 2,5 = 1,8, que redondea a dos pasos: una B. Sin tabla.',
    'Na Coreia e no Japão a diferença entre busto e sob o busto chama-se AA aos 7,5 cm, e cada 2,5 cm a mais sobe um bojo: 10 cm é A, 12,5 cm é B, 15 cm é C. Uma diferença medida de 12 cm dá (12 − 7,5) ÷ 2,5 = 1,8, que arredonda para dois passos: um B. Sem tabela.',
    '韓国・日本ではトップからアンダーを引いた差が7.5cmのときをAAとし、2.5cm増えるごとに1カップ上がります。10cmならA、12.5cmならB、15cmならCです。差が12cmと出たら(12 − 7.5) ÷ 2.5 = 1.8、四捨五入して2段なのでBです — 表を引かずに計算で出ます。',
    'In Korea und Japan heißt die Differenz zwischen Ober- und Unterbrustumfang bei 7,5 cm AA, und je weitere 2,5 cm geht es einen Cup hoch: 10 cm ist A, 12,5 cm ist B, 15 cm ist C. Gemessene 12 cm ergeben (12 − 7,5) ÷ 2,5 = 1,8, gerundet zwei Stufen — also B. Ohne Tabelle.',
    'En Corée et au Japon, l’écart entre tour de poitrine et dessous de poitrine s’appelle AA à 7,5 cm, et chaque 2,5 cm de plus monte d’un bonnet : 10 cm font A, 12,5 cm B, 15 cm C. Un écart mesuré de 12 cm donne (12 − 7,5) ÷ 2,5 = 1,8, arrondi à deux crans : un B. Aucune table.',
    'कोरिया और जापान में बस्ट में से अंडरबस्ट घटाने पर 7.5 सेमी को AA कहते हैं, और हर 2.5 सेमी पर एक कप ऊपर: 10 सेमी यानी A, 12.5 यानी B, 15 यानी C। मापा गया 12 सेमी अंतर देता है (12 − 7.5) ÷ 2.5 = 1.8, गोल करके दो चरण — यानी B। तालिका की ज़रूरत नहीं।',
    '在韩国和日本，上胸围减下胸围的差为 7.5cm 时称 AA，此后每多 2.5cm 升一个罩杯：10cm 是 A，12.5cm 是 B，15cm 是 C。若量得差 12cm，则 (12 − 7.5) ÷ 2.5 = 1.8，四舍五入两档，即 B——不用查表，算就有了。',
    '在韓國和日本，上胸圍減下胸圍的差為 7.5cm 時稱 AA，此後每多 2.5cm 升一個罩杯：10cm 是 A，12.5cm 是 B，15cm 是 C。若量得差 12cm，則 (12 − 7.5) ÷ 2.5 = 1.8，四捨五入兩檔，即 B——不用查表，算就有了。',
  ),

  measureTitle: T('두 군데를 잽니다', 'Two measurements, that is all', 'Solo dos medidas', 'Só duas medidas', '測るのは2か所です', 'Zwei Maße genügen', 'Deux mesures, c’est tout', 'सिर्फ़ दो माप', '只量两处', '只量兩處'),

  measureNote: T(
    '밑가슴둘레는 가슴 바로 아래를 수평으로, 윗가슴둘레는 가장 나온 곳을 수평으로 잽니다. 줄자는 몸에 붙이되 조이지 않고, 윗가슴은 눌리지 않게 가볍게 두릅니다. 이 두 값만 있으면 표기가 그대로 나옵니다.',
    'Measure the underbust straight around the body just below the breasts, and the full bust around the fullest point. Keep the tape level and snug but never tight — the fuller measurement should not compress. Those two numbers give you the label.',
    'Mide el contorno bajo el pecho horizontalmente justo debajo, y el de pecho por el punto más saliente. Mantén la cinta nivelada y ajustada sin apretar; la medida superior no debe comprimir. Con esos dos números sale la talla.',
    'Meça sob o busto na horizontal logo abaixo, e o busto no ponto mais saliente. Mantenha a fita nivelada e justa, nunca apertada — a medida do busto não deve comprimir. Esses dois números dão o tamanho.',
    'アンダーバストはバストのすぐ下を水平に、トップバストは最も高いところを水平に測ります。メジャーは体に沿わせつつ締めつけず、トップは押しつぶさないよう軽く回します。この2つがあれば表記はそのまま出ます。',
    'Den Unterbrustumfang waagerecht direkt unter der Brust messen, den Oberbrustumfang an der stärksten Stelle. Das Band bleibt waagerecht und anliegend, aber nie straff — beim Oberbrustmaß nichts eindrücken. Aus diesen zwei Zahlen folgt die Größe.',
    'Mesurez le dessous de poitrine à l’horizontale juste sous la poitrine, et le tour de poitrine au point le plus fort. Gardez le mètre horizontal et ajusté sans serrer : la mesure du haut ne doit rien comprimer. Ces deux nombres donnent la taille.',
    'अंडरबस्ट को छाती के ठीक नीचे क्षैतिज रूप से और बस्ट को सबसे उभरे हिस्से पर मापें। टेप समतल और शरीर से लगा हो पर कसा न हो — बस्ट मापते समय दबाव न पड़े। इन्हीं दो संख्याओं से लेबल निकल आता है।',
    '下胸围在乳房正下方水平量，上胸围在最丰满处水平量。皮尺保持水平、贴身但不勒紧，量上胸围时不要压迫。有这两个数字，尺码就出来了。',
    '下胸圍在乳房正下方水平量，上胸圍在最豐滿處水平量。皮尺保持水平、貼身但不勒緊，量上胸圍時不要壓迫。有這兩個數字，尺碼就出來了。',
  ),

  intlTitle: T('같은 알파벳이 다른 몸을 가리킵니다', 'The same letter means different things', 'La misma letra no significa lo mismo', 'A mesma letra não significa o mesmo', '同じアルファベットが違う体を指します', 'Derselbe Buchstabe meint Verschiedenes', 'La même lettre ne dit pas la même chose', 'वही अक्षर, अलग अर्थ', '同一个字母指的不是同一件事', '同一個字母指的不是同一件事'),

  intlNote: T(
    '미국·영국 표기는 컵을 밑가슴이 아니라 **밴드 치수**에서 빼고, 그 밴드는 밑가슴보다 크게 잡습니다. 재는 자리가 다르니 알파벳끼리 곧바로 옮길 수 없습니다 — 한국 표기의 A와 미국 표기의 A는 같은 몸이 아닙니다. 그래서 이 표는 알파벳을 옮겨 적는 대신 두 치수를 그대로 보입니다. 해외 브랜드를 살 때는 그 브랜드의 cm 표를 보는 편이 확실합니다.',
    'American and British labels subtract the cup from a **band** measurement, not from the underbust, and that band is set larger than the underbust. Because the two systems measure from different places, the letters do not map onto each other — an A here is not an A there. So this table shows the two raw measurements instead of translating letters. When buying from an overseas brand, read that brand’s own centimetre chart.',
    'Las tallas de EE. UU. y Reino Unido restan la copa de una medida de **banda**, no del contorno bajo el pecho, y esa banda se fija mayor. Como parten de sitios distintos, las letras no se corresponden: una A de aquí no es una A de allí. Por eso esta tabla muestra las dos medidas en bruto. Al comprar marca extranjera, mira su propia tabla en centímetros.',
    'Os tamanhos dos EUA e do Reino Unido subtraem o bojo de uma medida de **banda**, não da medida sob o busto, e essa banda é maior. Como partem de lugares diferentes, as letras não se correspondem: um A daqui não é um A de lá. Por isso esta tabela mostra as duas medidas cruas. Ao comprar marca estrangeira, veja a tabela em centímetros dela.',
    '米国・英国の表記はカップをアンダーではなく**バンド寸法**から引き、そのバンドはアンダーより大きく取ります。測る場所が違うのでアルファベット同士をそのまま移せません — 韓国表記のAと米国表記のAは同じ体ではありません。だからこの表は文字を置き換えず、2つの寸法をそのまま見せます。海外ブランドを買うときはそのブランドのcm表を見るのが確実です。',
    'US- und UK-Größen ziehen den Cup von einem **Bandmaß** ab, nicht vom Unterbrustumfang, und dieses Band wird größer angesetzt. Weil unterschiedlich gemessen wird, lassen sich die Buchstaben nicht übertragen — ein A hier ist kein A dort. Diese Tabelle zeigt darum die zwei Rohmaße statt einer Buchstabenübersetzung. Beim Kauf im Ausland gilt die Zentimetertabelle der Marke.',
    'Les tailles américaines et britanniques retranchent le bonnet d’une mesure de **bande**, pas du dessous de poitrine, et cette bande est prise plus large. Les repères diffèrent : les lettres ne se transposent pas — un A ici n’est pas un A là-bas. Ce tableau montre donc les deux mesures brutes plutôt que de traduire des lettres. Pour une marque étrangère, fiez-vous à son tableau en centimètres.',
    'अमेरिकी और ब्रिटिश लेबल कप को अंडरबस्ट से नहीं, **बैंड माप** से घटाते हैं, और वह बैंड अंडरबस्ट से बड़ा लिया जाता है। मापने की जगह अलग होने से अक्षर आपस में नहीं बदले जा सकते — यहाँ का A वहाँ का A नहीं है। इसलिए यह तालिका अक्षर बदलने के बजाय दोनों माप दिखाती है। विदेशी ब्रांड लेते समय उसी ब्रांड की सेंटीमीटर तालिका देखें।',
    '美国和英国的尺码是用**下围数字**减出罩杯，而不是用下胸围，而且那个下围数字取得比下胸围大。量的位置不同，字母就无法直接换算——这里的 A 不是那里的 A。所以本表不去翻译字母，而是直接给出两个原始尺寸。买海外品牌时，看该品牌自己的厘米对照表最可靠。',
    '美國和英國的尺碼是用**下圍數字**減出罩杯，而不是用下胸圍，而且那個下圍數字取得比下胸圍大。量的位置不同，字母就無法直接換算——這裡的 A 不是那裡的 A。所以本表不去翻譯字母，而是直接給出兩個原始尺寸。買海外品牌時，看該品牌自己的公分對照表最可靠。',
  ),

  fitTitle: T('밴드를 바꾸면 컵도 따라 바뀝니다', 'Change the band and the cup follows', 'Si cambias la banda, cambia la copa', 'Se muda a banda, muda o bojo', 'バンドを変えるとカップも変わります', 'Ändert sich das Band, ändert sich der Cup', 'Changez la bande, le bonnet suit', 'बैंड बदलें तो कप भी बदलता है', '换了下围，罩杯也要跟着换', '換了下圍，罩杯也要跟著換'),

  fitNote: T(
    '밑가슴이 헐거워 한 치수 위로 올리면 같은 알파벳이라도 컵이 커집니다. 컵은 차이로 정해지는데 밴드가 5cm 늘면 같은 차이를 담는 컵 부피가 달라지기 때문입니다. 그래서 75B가 헐거우면 80A가 아니라 70C 쪽이 가까울 때가 많습니다 — 매장에서 "형제 사이즈"라고 부르는 자리입니다.',
    'Move the band up one step and the same letter is a bigger cup, because the cup is defined by a difference and a wider band spreads that difference over more fabric. So when a 75B is loose, the closer match is often 70C rather than 80A — the pairs shops call sister sizes.',
    'Sube una talla de banda y la misma letra es una copa mayor, porque la copa se define por una diferencia y una banda más ancha reparte esa diferencia en más tela. Por eso, si una 75B queda holgada, suele acercarse más una 70C que una 80A: son las llamadas tallas hermanas.',
    'Suba um passo de banda e a mesma letra vira um bojo maior, porque o bojo é definido por uma diferença e uma banda mais larga espalha essa diferença. Por isso, quando um 75B fica folgado, o mais próximo costuma ser 70C, não 80A — são os chamados tamanhos irmãos.',
    'アンダーが緩くて1段上げると、同じアルファベットでもカップは大きくなります。カップは差で決まるのに、バンドが5cm伸びれば同じ差を包む容積が変わるからです。だから75Bが緩いときは80Aではなく70Cのほうが近いことが多いです — 店で「姉妹サイズ」と呼ぶ関係です。',
    'Geht das Band eine Stufe hoch, ist derselbe Buchstabe ein größerer Cup — der Cup ergibt sich aus einer Differenz, und ein weiteres Band verteilt diese Differenz auf mehr Stoff. Sitzt eine 75B locker, passt darum oft eher 70C als 80A — im Handel Schwestergrößen genannt.',
    'Montez d’un cran de bande et la même lettre devient un bonnet plus grand : le bonnet naît d’un écart, et une bande plus large étale cet écart. Si un 75B flotte, le plus proche est souvent un 70C plutôt qu’un 80A — ce que les boutiques appellent tailles sœurs.',
    'बैंड एक चरण ऊपर करें तो वही अक्षर बड़ा कप बन जाता है, क्योंकि कप अंतर से तय होता है और चौड़ा बैंड उस अंतर को अधिक कपड़े में फैलाता है। इसलिए 75B ढीला हो तो 80A से ज़्यादा पास अक्सर 70C होता है — दुकानों में इन्हें सिस्टर साइज़ कहते हैं।',
    '把下围往上调一档，同样的字母就是更大的罩杯——罩杯由差值定义，而下围加宽会把这个差摊到更多面料上。所以 75B 松了，更接近的往往是 70C 而不是 80A，也就是店里说的"姐妹尺码"。',
    '把下圍往上調一檔，同樣的字母就是更大的罩杯——罩杯由差值定義，而下圍加寬會把這個差攤到更多布料上。所以 75B 鬆了，更接近的往往是 70C 而不是 80A，也就是店裡說的「姊妹尺碼」。',
  ),

  careTitle: T('이 값은 출발점입니다', 'These figures are a starting point', 'Estas cifras son un punto de partida', 'Estes números são um ponto de partida', 'この値は出発点です', 'Diese Werte sind ein Ausgangspunkt', 'Ces valeurs sont un point de départ', 'ये मान शुरुआती बिंदु हैं', '这些值只是起点', '這些值只是起點'),

  careNote: T(
    '같은 표기라도 브랜드와 형태에 따라 착용감이 다릅니다. 몸도 하루 중에, 달마다 달라집니다. 표기는 어느 칸에서 시작할지를 알려 주는 것이고, 마지막은 입어 보고 정하는 편이 낫습니다.',
    'Even at the same label, fit changes with the brand and the style, and the body itself changes over a day and over a month. The label says where to start looking; the last step is still trying it on.',
    'Con la misma talla, el ajuste cambia según la marca y el modelo, y el cuerpo cambia a lo largo del día y del mes. La talla dice por dónde empezar; el último paso sigue siendo probárselo.',
    'Mesmo no mesmo tamanho, o caimento muda com a marca e o modelo, e o corpo muda ao longo do dia e do mês. O tamanho diz por onde começar; o último passo ainda é experimentar.',
    '同じ表記でもブランドや形で着け心地が変わります。体そのものも1日の中で、月ごとに変わります。表記はどこから見始めるかを教えるもので、最後は試着で決めるほうが確かです。',
    'Auch bei gleicher Größe hängt der Sitz von Marke und Schnitt ab, und der Körper verändert sich im Tages- und Monatsverlauf. Die Größe sagt, wo man anfängt — entschieden wird beim Anprobieren.',
    'À taille égale, le maintien varie selon la marque et le modèle, et le corps lui-même change au fil de la journée et du mois. La taille indique par où commencer ; l’essayage tranche.',
    'एक ही लेबल पर भी ब्रांड और डिज़ाइन से फ़िट बदलता है, और शरीर भी दिन-भर तथा महीने-भर बदलता रहता है। लेबल बताता है कहाँ से शुरू करें; अंतिम फ़ैसला पहनकर ही होता है।',
    '即使尺码相同，不同品牌和款式的穿着感也不一样，身体本身在一天里、一个月里也会变化。尺码告诉你从哪一档开始看，最后还是试穿说了算。',
    '即使尺碼相同，不同品牌和款式的穿著感也不一樣，身體本身在一天裡、一個月裡也會變化。尺碼告訴你從哪一檔開始看，最後還是試穿說了算。',
  ),

  tableTitle: T('밑가슴과 차이로 찾기', 'Find it by underbust and difference', 'Búscalo por contorno y diferencia', 'Ache pela medida e diferença', 'アンダーと差から探す', 'Nach Unterbrust und Differenz suchen', 'Chercher par dessous de poitrine et écart', 'अंडरबस्ट और अंतर से देखें', '按下胸围和差值查找', '按下胸圍和差值查找'),
  neighbourTitle: T('가까운 칸', 'Nearby cells', 'Casillas cercanas', 'Células próximas', '近いマス', 'Felder daneben', 'Cases voisines', 'पास के खाने', '相邻格', '相鄰格'),
  diffRowTitle: T('같은 밑가슴, 다른 차이', 'Same underbust, other differences', 'Mismo contorno, otras diferencias', 'Mesma medida, outras diferenças', '同じアンダー、別の差', 'Gleiche Unterbrust, andere Differenzen', 'Même dessous, autres écarts', 'वही अंडरबस्ट, दूसरे अंतर', '同一下胸围，不同差值', '同一下胸圍，不同差值'),
  underRowTitle: T('같은 차이, 다른 밑가슴', 'Same difference, other underbusts', 'Misma diferencia, otros contornos', 'Mesma diferença, outras medidas', '同じ差、別のアンダー', 'Gleiche Differenz, andere Unterbrust', 'Même écart, autres dessous', 'वही अंतर, दूसरे अंडरबस्ट', '同一差值，不同下胸围', '同一差值，不同下胸圍'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '표기 앞의 숫자는 밑가슴둘레를 5cm 눈금으로 읽은 값입니다.',
      '컵은 윗가슴에서 밑가슴을 뺀 차이로 정해집니다 — AA가 7.5cm, 2.5cm마다 한 칸입니다.',
      '미국·영국 표기는 재는 자리가 달라 알파벳끼리 곧바로 옮길 수 없습니다.',
      '브랜드와 형태에 따라 착용감이 다릅니다. 표기는 출발점입니다.',
    ],
    [
      'The number in the label is the underbust read to the nearest 5 cm.',
      'The cup comes from full bust minus underbust — 7.5 cm is AA, and every 2.5 cm is one step.',
      'US and UK labels measure from a different place, so the letters do not translate directly.',
      'Brand and style change the fit. The label is where you start.',
    ],
    [
      'El número de la talla es el contorno bajo el pecho redondeado a 5 cm.',
      'La copa sale del pecho menos el bajo pecho: 7,5 cm es AA y cada 2,5 cm es un paso.',
      'Las tallas de EE. UU. y Reino Unido parten de otro punto, así que las letras no se traducen.',
      'La marca y el modelo cambian el ajuste. La talla es el punto de partida.',
    ],
    [
      'O número do tamanho é a medida sob o busto arredondada para 5 cm.',
      'O bojo vem do busto menos a medida inferior: 7,5 cm é AA e cada 2,5 cm é um passo.',
      'Tamanhos dos EUA e do Reino Unido partem de outro ponto, então as letras não se traduzem.',
      'Marca e modelo mudam o caimento. O tamanho é o ponto de partida.',
    ],
    [
      '表記の前の数字はアンダーバストを5cm刻みで読んだ値です。',
      'カップはトップからアンダーを引いた差で決まります — 7.5cmがAA、2.5cmごとに1段です。',
      '米国・英国の表記は測る場所が違うのでアルファベットをそのまま移せません。',
      'ブランドと形で着け心地が変わります。表記は出発点です。',
    ],
    [
      'Die Zahl in der Größe ist der Unterbrustumfang auf 5 cm gerundet.',
      'Der Cup folgt aus Oberbrust minus Unterbrust — 7,5 cm sind AA, je 2,5 cm eine Stufe.',
      'US- und UK-Größen messen anders, die Buchstaben lassen sich nicht direkt übertragen.',
      'Marke und Schnitt ändern den Sitz. Die Größe ist der Anfang.',
    ],
    [
      'Le nombre de la taille est le dessous de poitrine arrondi à 5 cm.',
      'Le bonnet vient du tour de poitrine moins le dessous : 7,5 cm font AA, puis un cran tous les 2,5 cm.',
      'Les tailles US et UK partent d’un autre repère : les lettres ne se traduisent pas.',
      'La marque et le modèle changent le maintien. La taille est un point de départ.',
    ],
    [
      'लेबल की संख्या अंडरबस्ट को 5 सेमी के निकटतम पर पढ़ा गया मान है।',
      'कप बस्ट में से अंडरबस्ट घटाकर मिलता है — 7.5 सेमी AA, और हर 2.5 सेमी एक चरण।',
      'अमेरिकी और ब्रिटिश लेबल अलग जगह से मापते हैं, इसलिए अक्षर सीधे नहीं बदलते।',
      'ब्रांड और डिज़ाइन से फ़िट बदलता है। लेबल शुरुआत है।',
    ],
    [
      '尺码里的数字，是把下胸围按 5cm 就近取整得到的。',
      '罩杯来自上胸围减下胸围——7.5cm 是 AA，每 2.5cm 升一档。',
      '美国和英国的尺码量法不同，字母无法直接互换。',
      '品牌和款式会改变穿着感，尺码只是起点。',
    ],
    [
      '尺碼裡的數字，是把下胸圍按 5cm 就近取整得到的。',
      '罩杯來自上胸圍減下胸圍——7.5cm 是 AA，每 2.5cm 升一檔。',
      '美國和英國的尺碼量法不同，字母無法直接互換。',
      '品牌和款式會改變穿著感，尺碼只是起點。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '브래지어 사이즈 계산 — 밑가슴둘레와 차이로 표기 찾기',
    'Bra size calculator — from underbust and the difference',
    'Calculadora de talla de sujetador — contorno y diferencia',
    'Calculadora de tamanho de sutiã — medida e diferença',
    'ブラのサイズ計算 — アンダーバストと差から表記を出す',
    'BH-Größe berechnen — aus Unterbrust und Differenz',
    'Calcul de taille de soutien-gorge — dessous de poitrine et écart',
    'ब्रा साइज़ कैलकुलेटर — अंडरबस्ट और अंतर से',
    '文胸尺码计算 — 由下胸围与差值得出',
    '內衣尺碼計算 — 由下胸圍與差值得出',
  ),

  hubMetaDesc: T(
    '밑가슴 75cm에 차이 12.5cm면 75B입니다. 밑가슴둘레와 차이가 만나는 100칸마다 표기·윗가슴둘레·인치를 계산했고, 한국 컵 눈금이 국제 표기와 왜 다른지도 밝혔습니다.',
    'A 75 cm underbust with a 12.5 cm difference is a 75B. For all 100 pairings of underbust and difference: the label, the full bust, the inch figure, and why the Korean cup steps differ from international ones.',
    'Un contorno bajo el pecho de 75 cm con 12,5 cm de diferencia es una 75B. Para los 100 cruces: la talla, el contorno de pecho, las pulgadas y por qué las copas coreanas difieren de las internacionales.',
    'Uma medida de 75 cm sob o busto com 12,5 cm de diferença é 75B. Para os 100 cruzamentos: o tamanho, o busto, as polegadas e por que os bojos coreanos diferem dos internacionais.',
    'アンダー75cmで差12.5cmなら75Bです。アンダーと差が出会う100マスの表記・トップバスト・インチを計算し、韓国のカップ刻みが国際表記と違う理由も示しました。',
    '75 cm Unterbrust mit 12,5 cm Differenz ergeben 75B. Für alle 100 Kombinationen: Größe, Oberbrustumfang, Zollwert — und warum koreanische Cups anders abgestuft sind.',
    'Un dessous de poitrine de 75 cm avec 12,5 cm d’écart donne un 75B. Pour les 100 croisements : la taille, le tour de poitrine, les pouces, et pourquoi les bonnets coréens diffèrent des internationaux.',
    '75 सेमी अंडरबस्ट और 12.5 सेमी अंतर यानी 75B। सभी 100 मेलों का लेबल, बस्ट, इंच, और कोरियाई कप चरण अंतरराष्ट्रीय से क्यों अलग हैं।',
    '下胸围 75cm、差值 12.5cm 就是 75B。下胸围与差值交汇的 100 格，都算出尺码、上胸围、英寸，并说明韩国罩杯的刻度为何与国际不同。',
    '下胸圍 75cm、差值 12.5cm 就是 75B。下胸圍與差值交匯的 100 格，都算出尺碼、上胸圍、英寸，並說明韓國罩杯的刻度為何與國際不同。',
  ),

  desc: T<(f: BraFacts) => string>(
    f => `밑가슴 ${f.cell.under}cm에 윗가슴 ${f.bust}cm면 차이가 ${f.cell.diff}cm라 ${f.label}입니다. 컵은 AA(7.5cm)에서 2.5cm마다 한 칸씩 올라간 자리입니다.`,
    f => `An underbust of ${f.cell.under} cm with a full bust of ${f.bust} cm leaves ${f.cell.diff} cm, which makes ${f.label}. The cup counts steps of 2.5 cm up from AA at 7.5 cm.`,
    f => `Un contorno bajo el pecho de ${f.cell.under} cm con ${f.bust} cm de pecho deja ${f.cell.diff} cm, o sea ${f.label}. La copa cuenta pasos de 2,5 cm desde AA en 7,5 cm.`,
    f => `Uma medida de ${f.cell.under} cm sob o busto com ${f.bust} cm de busto deixa ${f.cell.diff} cm, ou seja ${f.label}. O bojo conta passos de 2,5 cm a partir de AA em 7,5 cm.`,
    f => `アンダー${f.cell.under}cmでトップ${f.bust}cmなら差は${f.cell.diff}cm、表記は${f.label}です。カップはAA(7.5cm)から2.5cmごとに1段上がった位置です。`,
    f => `${f.cell.under} cm Unterbrust bei ${f.bust} cm Oberbrust lassen ${f.cell.diff} cm — das ergibt ${f.label}. Der Cup zählt 2,5-cm-Schritte ab AA bei 7,5 cm.`,
    f => `Un dessous de ${f.cell.under} cm avec ${f.bust} cm de poitrine laisse ${f.cell.diff} cm, soit ${f.label}. Le bonnet compte des crans de 2,5 cm depuis AA à 7,5 cm.`,
    f => `${f.cell.under} सेमी अंडरबस्ट और ${f.bust} सेमी बस्ट में ${f.cell.diff} सेमी अंतर बचता है, यानी ${f.label}। कप AA (7.5 सेमी) से हर 2.5 सेमी पर एक चरण गिनता है।`,
    f => `下胸围 ${f.cell.under}cm、上胸围 ${f.bust}cm，相差 ${f.cell.diff}cm，即 ${f.label}。罩杯从 AA（7.5cm）起，每 2.5cm 一档。`,
    f => `下胸圍 ${f.cell.under}cm、上胸圍 ${f.bust}cm，相差 ${f.cell.diff}cm，即 ${f.label}。罩杯從 AA（7.5cm）起，每 2.5cm 一檔。`,
  ),

  metaTitle: T<(f: BraFacts) => string>(
    f => `밑가슴 ${f.cell.under}cm·차이 ${f.cell.diff}cm — ${f.label}`,
    f => `${f.cell.under} cm underbust, ${f.cell.diff} cm difference — ${f.label}`,
    f => `${f.cell.under} cm bajo el pecho, ${f.cell.diff} cm de diferencia — ${f.label}`,
    f => `${f.cell.under} cm sob o busto, ${f.cell.diff} cm de diferença — ${f.label}`,
    f => `アンダー${f.cell.under}cm・差${f.cell.diff}cm — ${f.label}`,
    f => `${f.cell.under} cm Unterbrust, ${f.cell.diff} cm Differenz — ${f.label}`,
    f => `${f.cell.under} cm de dessous, ${f.cell.diff} cm d’écart — ${f.label}`,
    f => `${f.cell.under} सेमी अंडरबस्ट, ${f.cell.diff} सेमी अंतर — ${f.label}`,
    f => `下胸围 ${f.cell.under}cm·差 ${f.cell.diff}cm — ${f.label}`,
    f => `下胸圍 ${f.cell.under}cm·差 ${f.cell.diff}cm — ${f.label}`,
  ),

  metaDesc: T<(f: BraFacts) => string>(
    f => `밑가슴둘레 ${f.cell.under}cm, 윗가슴둘레 ${f.bust}cm면 표기는 ${f.label}입니다. 차이 ${f.cell.diff}cm가 ${f.cup}컵에 해당하고, 밑가슴은 ${f.underInch}인치입니다.`,
    f => `With a ${f.cell.under} cm underbust and a ${f.bust} cm full bust, the label is ${f.label}. The ${f.cell.diff} cm gap makes a ${f.cup} cup, and the underbust is ${f.underInch} inches.`,
    f => `Con ${f.cell.under} cm bajo el pecho y ${f.bust} cm de pecho, la talla es ${f.label}. La diferencia de ${f.cell.diff} cm da una copa ${f.cup}, y el contorno inferior son ${f.underInch} pulgadas.`,
    f => `Com ${f.cell.under} cm sob o busto e ${f.bust} cm de busto, o tamanho é ${f.label}. A diferença de ${f.cell.diff} cm dá bojo ${f.cup}, e a medida inferior são ${f.underInch} polegadas.`,
    f => `アンダー${f.cell.under}cm、トップ${f.bust}cmなら表記は${f.label}です。差${f.cell.diff}cmが${f.cup}カップに当たり、アンダーは${f.underInch}インチです。`,
    f => `Bei ${f.cell.under} cm Unterbrust und ${f.bust} cm Oberbrust lautet die Größe ${f.label}. Die Differenz von ${f.cell.diff} cm ergibt Cup ${f.cup}, die Unterbrust misst ${f.underInch} Zoll.`,
    f => `Avec ${f.cell.under} cm de dessous et ${f.bust} cm de poitrine, la taille est ${f.label}. L’écart de ${f.cell.diff} cm donne un bonnet ${f.cup}, et le dessous fait ${f.underInch} pouces.`,
    f => `${f.cell.under} सेमी अंडरबस्ट और ${f.bust} सेमी बस्ट पर लेबल ${f.label} है। ${f.cell.diff} सेमी अंतर ${f.cup} कप बनाता है, और अंडरबस्ट ${f.underInch} इंच है।`,
    f => `下胸围 ${f.cell.under}cm、上胸围 ${f.bust}cm，尺码是 ${f.label}。相差 ${f.cell.diff}cm 对应 ${f.cup} 罩杯，下胸围合 ${f.underInch} 英寸。`,
    f => `下胸圍 ${f.cell.under}cm、上胸圍 ${f.bust}cm，尺碼是 ${f.label}。相差 ${f.cell.diff}cm 對應 ${f.cup} 罩杯，下胸圍合 ${f.underInch} 英寸。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '브래지어 사이즈는 어떻게 재나요?', a: '밑가슴둘레와 윗가슴둘레를 각각 수평으로 잽니다. 앞의 숫자는 밑가슴, 컵은 두 값의 차이에서 나옵니다.' },
      { q: '차이가 12cm면 무슨 컵인가요?', a: 'B컵입니다. AA가 7.5cm이고 2.5cm마다 한 칸이라 (12 − 7.5) ÷ 2.5 = 1.8, 반올림해 두 칸입니다.' },
      { q: '75B는 무슨 뜻인가요?', a: '밑가슴이 약 73~77cm이고 윗가슴과의 차이가 12.5cm 언저리라는 뜻입니다.' },
      { q: '한국 A컵과 미국 A컵이 같은가요?', a: '같지 않습니다. 미국은 컵을 밑가슴이 아니라 밴드 치수에서 빼고 그 밴드를 더 크게 잡습니다. 알파벳끼리 곧바로 옮길 수 없습니다.' },
      { q: '밑가슴이 헐거우면 어떻게 하나요?', a: '한 치수 줄이고 컵을 한 칸 올려 보십시오. 75B가 헐거우면 70C 쪽이 가까울 때가 많습니다.' },
    ],
    [
      { q: 'How do I measure for a bra?', a: 'Take the underbust and the full bust, each level around the body. The number comes from the underbust; the cup comes from the difference.' },
      { q: 'What cup is a 12 cm difference?', a: 'A B. AA sits at 7.5 cm and each cup is 2.5 cm, so (12 − 7.5) ÷ 2.5 = 1.8, which rounds to two steps.' },
      { q: 'What does 75B mean?', a: 'An underbust of roughly 73–77 cm and a gap to the full bust of about 12.5 cm.' },
      { q: 'Is a Korean A the same as an American A?', a: 'No. The US subtracts the cup from a band measurement rather than the underbust, and sets that band larger. The letters do not map across.' },
      { q: 'What if the band feels loose?', a: 'Go one band down and one cup up. When a 75B is loose, a 70C is often the closer fit.' },
    ],
    [
      { q: '¿Cómo se mide un sujetador?', a: 'Toma el contorno bajo el pecho y el de pecho, ambos horizontales. El número sale del inferior; la copa, de la diferencia.' },
      { q: '¿Qué copa son 12 cm de diferencia?', a: 'Una B. AA está en 7,5 cm y cada copa son 2,5 cm: (12 − 7,5) ÷ 2,5 = 1,8, que redondea a dos pasos.' },
      { q: '¿Qué significa 75B?', a: 'Un contorno inferior de unos 73–77 cm y una diferencia con el pecho de alrededor de 12,5 cm.' },
      { q: '¿Una A coreana es una A estadounidense?', a: 'No. EE. UU. resta la copa de una banda, no del contorno inferior, y esa banda se toma mayor. Las letras no se corresponden.' },
      { q: '¿Y si la banda queda holgada?', a: 'Baja una banda y sube una copa. Si una 75B queda holgada, suele quedar mejor una 70C.' },
    ],
    [
      { q: 'Como se mede um sutiã?', a: 'Meça sob o busto e o busto, ambos na horizontal. O número vem da medida inferior; o bojo, da diferença.' },
      { q: 'Que bojo são 12 cm de diferença?', a: 'Um B. AA fica em 7,5 cm e cada bojo são 2,5 cm: (12 − 7,5) ÷ 2,5 = 1,8, que arredonda para dois passos.' },
      { q: 'O que significa 75B?', a: 'Uma medida inferior de cerca de 73–77 cm e uma diferença para o busto de cerca de 12,5 cm.' },
      { q: 'Um A coreano é igual a um A americano?', a: 'Não. Os EUA subtraem o bojo de uma banda, não da medida inferior, e essa banda é maior. As letras não se correspondem.' },
      { q: 'E se a banda ficar folgada?', a: 'Desça uma banda e suba um bojo. Se um 75B fica folgado, um 70C costuma servir melhor.' },
    ],
    [
      { q: 'ブラのサイズはどう測りますか？', a: 'アンダーバストとトップバストをそれぞれ水平に測ります。前の数字はアンダー、カップは2つの差から出ます。' },
      { q: '差が12cmなら何カップですか？', a: 'Bカップです。AAが7.5cmで2.5cmごとに1段なので、(12 − 7.5) ÷ 2.5 = 1.8、四捨五入して2段です。' },
      { q: '75Bはどういう意味ですか？', a: 'アンダーがおよそ73〜77cmで、トップとの差が12.5cm前後という意味です。' },
      { q: '韓国のAカップと米国のAカップは同じですか？', a: '同じではありません。米国はカップをアンダーではなくバンド寸法から引き、そのバンドを大きく取ります。アルファベットをそのまま移せません。' },
      { q: 'アンダーが緩いときは？', a: '1段下げてカップを1段上げてみてください。75Bが緩いなら70Cのほうが近いことが多いです。' },
    ],
    [
      { q: 'Wie messe ich für einen BH?', a: 'Unterbrust- und Oberbrustumfang jeweils waagerecht messen. Die Zahl kommt vom Unterbrustmaß, der Cup aus der Differenz.' },
      { q: 'Welcher Cup sind 12 cm Differenz?', a: 'Ein B. AA liegt bei 7,5 cm, jeder Cup ist 2,5 cm: (12 − 7,5) ÷ 2,5 = 1,8, gerundet zwei Stufen.' },
      { q: 'Was bedeutet 75B?', a: 'Eine Unterbrust von etwa 73–77 cm und eine Differenz zur Oberbrust von rund 12,5 cm.' },
      { q: 'Ist ein koreanisches A ein amerikanisches A?', a: 'Nein. Die USA ziehen den Cup von einem Bandmaß ab, nicht von der Unterbrust, und setzen dieses Band größer an. Die Buchstaben passen nicht aufeinander.' },
      { q: 'Und wenn das Band locker sitzt?', a: 'Ein Band kleiner, ein Cup größer. Sitzt eine 75B locker, passt oft eine 70C besser.' },
    ],
    [
      { q: 'Comment prendre ses mesures ?', a: 'Mesurez le dessous de poitrine et le tour de poitrine, à l’horizontale. Le nombre vient du dessous ; le bonnet, de l’écart.' },
      { q: 'Quel bonnet pour 12 cm d’écart ?', a: 'Un B. AA vaut 7,5 cm et chaque bonnet 2,5 cm : (12 − 7,5) ÷ 2,5 = 1,8, arrondi à deux crans.' },
      { q: 'Que veut dire 75B ?', a: 'Un dessous de poitrine d’environ 73 à 77 cm et un écart au tour de poitrine d’à peu près 12,5 cm.' },
      { q: 'Un A coréen est-il un A américain ?', a: 'Non. Les États-Unis retranchent le bonnet d’une bande, pas du dessous de poitrine, et prennent cette bande plus large. Les lettres ne se transposent pas.' },
      { q: 'Et si la bande flotte ?', a: 'Descendez d’une bande et montez d’un bonnet. Si un 75B flotte, un 70C convient souvent mieux.' },
    ],
    [
      { q: 'ब्रा के लिए माप कैसे लें?', a: 'अंडरबस्ट और बस्ट दोनों को क्षैतिज रूप से मापें। संख्या अंडरबस्ट से आती है; कप अंतर से।' },
      { q: '12 सेमी अंतर कौन सा कप है?', a: 'B कप। AA 7.5 सेमी पर है और हर कप 2.5 सेमी: (12 − 7.5) ÷ 2.5 = 1.8, गोल करके दो चरण।' },
      { q: '75B का क्या अर्थ है?', a: 'अंडरबस्ट लगभग 73–77 सेमी और बस्ट से अंतर लगभग 12.5 सेमी।' },
      { q: 'क्या कोरियाई A और अमेरिकी A एक ही हैं?', a: 'नहीं। अमेरिका कप को बैंड माप से घटाता है, अंडरबस्ट से नहीं, और वह बैंड बड़ा लेता है। अक्षर आपस में नहीं बदले जा सकते।' },
      { q: 'बैंड ढीला लगे तो?', a: 'एक बैंड नीचे और एक कप ऊपर आज़माएँ। 75B ढीला हो तो अक्सर 70C बेहतर बैठता है।' },
    ],
    [
      { q: '文胸尺码怎么量？', a: '分别水平量下胸围和上胸围。数字来自下胸围，罩杯来自两者之差。' },
      { q: '相差 12cm 是什么罩杯？', a: 'B 罩杯。AA 在 7.5cm，每档 2.5cm，(12 − 7.5) ÷ 2.5 = 1.8，四舍五入两档。' },
      { q: '75B 是什么意思？', a: '下胸围约 73~77cm，与上胸围相差 12.5cm 左右。' },
      { q: '韩国的 A 罩杯和美国的一样吗？', a: '不一样。美国是用下围数字减出罩杯，而不是下胸围，而且下围取得更大。字母不能直接对应。' },
      { q: '下围觉得松怎么办？', a: '下围减一档、罩杯升一档试试。75B 松的话，往往 70C 更合适。' },
    ],
    [
      { q: '內衣尺碼怎麼量？', a: '分別水平量下胸圍和上胸圍。數字來自下胸圍，罩杯來自兩者之差。' },
      { q: '相差 12cm 是什麼罩杯？', a: 'B 罩杯。AA 在 7.5cm，每檔 2.5cm，(12 − 7.5) ÷ 2.5 = 1.8，四捨五入兩檔。' },
      { q: '75B 是什麼意思？', a: '下胸圍約 73~77cm，與上胸圍相差 12.5cm 左右。' },
      { q: '韓國的 A 罩杯和美國的一樣嗎？', a: '不一樣。美國是用下圍數字減出罩杯，而不是下胸圍，而且下圍取得更大。字母不能直接對應。' },
      { q: '下圍覺得鬆怎麼辦？', a: '下圍減一檔、罩杯升一檔試試。75B 鬆的話，往往 70C 更合適。' },
    ],
  ),

  cellFaq: T<(f: BraFacts) => FaqItem[]>(
    f => [
      { q: `밑가슴 ${f.cell.under}cm에 차이 ${f.cell.diff}cm면 무슨 사이즈인가요?`, a: `${f.label}입니다. 앞의 ${f.band}은 밑가슴을 5cm 눈금으로 읽은 값이고, ${f.cup}은 차이가 ${f.cupDiff}cm 자리라는 뜻입니다.` },
      { q: `윗가슴둘레는 얼마인가요?`, a: `${f.bust}cm입니다. 밑가슴 ${f.cell.under}cm에 차이 ${f.cell.diff}cm를 더한 값입니다.` },
      { q: `밑가슴은 인치로 얼마인가요?`, a: `${f.underInch}인치입니다. 2.54로 나눈 값입니다.` },
      { q: `한 컵 차이는 얼마나 되나요?`, a: `${f.span}cm입니다. 차이가 그 안에서 움직이면 같은 컵으로 묶입니다.` },
    ],
    f => [
      { q: `What size is a ${f.cell.under} cm underbust with a ${f.cell.diff} cm difference?`, a: `${f.label}. The ${f.band} is the underbust read to the nearest 5 cm, and ${f.cup} marks the ${f.cupDiff} cm step.` },
      { q: `What is the full bust?`, a: `${f.bust} cm — the ${f.cell.under} cm underbust plus the ${f.cell.diff} cm difference.` },
      { q: `What is the underbust in inches?`, a: `${f.underInch} inches, the centimetres divided by 2.54.` },
      { q: `How wide is one cup step?`, a: `${f.span} cm. A difference anywhere inside that range shares the same cup.` },
    ],
    f => [
      { q: `¿Qué talla son ${f.cell.under} cm con ${f.cell.diff} cm de diferencia?`, a: `${f.label}. El ${f.band} es el contorno inferior redondeado a 5 cm, y ${f.cup} marca el paso de ${f.cupDiff} cm.` },
      { q: `¿Cuál es el contorno de pecho?`, a: `${f.bust} cm — los ${f.cell.under} cm de abajo más los ${f.cell.diff} cm de diferencia.` },
      { q: `¿Cuánto es el contorno inferior en pulgadas?`, a: `${f.underInch} pulgadas, los centímetros divididos entre 2,54.` },
      { q: `¿Cuánto abarca una copa?`, a: `${f.span} cm. Cualquier diferencia dentro de ese rango comparte copa.` },
    ],
    f => [
      { q: `Que tamanho são ${f.cell.under} cm com ${f.cell.diff} cm de diferença?`, a: `${f.label}. O ${f.band} é a medida inferior arredondada para 5 cm, e ${f.cup} marca o passo de ${f.cupDiff} cm.` },
      { q: `Qual o contorno do busto?`, a: `${f.bust} cm — os ${f.cell.under} cm de baixo mais os ${f.cell.diff} cm de diferença.` },
      { q: `Quanto é a medida inferior em polegadas?`, a: `${f.underInch} polegadas, os centímetros divididos por 2,54.` },
      { q: `Quanto cobre um bojo?`, a: `${f.span} cm. Qualquer diferença dentro dessa faixa divide o mesmo bojo.` },
    ],
    f => [
      { q: `アンダー${f.cell.under}cmで差${f.cell.diff}cmなら何サイズですか？`, a: `${f.label}です。前の${f.band}はアンダーを5cm刻みで読んだ値、${f.cup}は差が${f.cupDiff}cmの位置という意味です。` },
      { q: `トップバストはいくつですか？`, a: `${f.bust}cmです。アンダー${f.cell.under}cmに差${f.cell.diff}cmを足した値です。` },
      { q: `アンダーはインチでいくつですか？`, a: `${f.underInch}インチです。2.54で割った値です。` },
      { q: `1カップの差はどれくらいですか？`, a: `${f.span}cmです。差がその中で動くなら同じカップにまとめられます。` },
    ],
    f => [
      { q: `Welche Größe sind ${f.cell.under} cm mit ${f.cell.diff} cm Differenz?`, a: `${f.label}. Die ${f.band} ist die auf 5 cm gerundete Unterbrust, ${f.cup} markiert die Stufe bei ${f.cupDiff} cm.` },
      { q: `Wie groß ist der Oberbrustumfang?`, a: `${f.bust} cm — ${f.cell.under} cm Unterbrust plus ${f.cell.diff} cm Differenz.` },
      { q: `Wie viel Zoll misst die Unterbrust?`, a: `${f.underInch} Zoll, die Zentimeter geteilt durch 2,54.` },
      { q: `Wie breit ist eine Cup-Stufe?`, a: `${f.span} cm. Jede Differenz in diesem Bereich teilt denselben Cup.` },
    ],
    f => [
      { q: `Quelle taille pour ${f.cell.under} cm et ${f.cell.diff} cm d’écart ?`, a: `${f.label}. Le ${f.band} est le dessous arrondi à 5 cm, et ${f.cup} marque le cran à ${f.cupDiff} cm.` },
      { q: `Quel est le tour de poitrine ?`, a: `${f.bust} cm — les ${f.cell.under} cm de dessous plus ${f.cell.diff} cm d’écart.` },
      { q: `Combien fait le dessous en pouces ?`, a: `${f.underInch} pouces, les centimètres divisés par 2,54.` },
      { q: `Quel écart entre deux bonnets ?`, a: `${f.span} cm. Tout écart dans cet intervalle partage le même bonnet.` },
    ],
    f => [
      { q: `${f.cell.under} सेमी अंडरबस्ट और ${f.cell.diff} सेमी अंतर पर कौन सा साइज़?`, a: `${f.label}। ${f.band} अंडरबस्ट को 5 सेमी पर गोल किया मान है, और ${f.cup} ${f.cupDiff} सेमी वाले चरण को दर्शाता है।` },
      { q: `बस्ट कितना है?`, a: `${f.bust} सेमी — ${f.cell.under} सेमी अंडरबस्ट में ${f.cell.diff} सेमी जोड़कर।` },
      { q: `अंडरबस्ट इंच में कितना है?`, a: `${f.underInch} इंच, सेंटीमीटर को 2.54 से भाग देकर।` },
      { q: `एक कप का अंतर कितना है?`, a: `${f.span} सेमी। इस दायरे में आने वाला हर अंतर एक ही कप में आता है।` },
    ],
    f => [
      { q: `下胸围 ${f.cell.under}cm、差 ${f.cell.diff}cm 是什么尺码？`, a: `${f.label}。前面的 ${f.band} 是下胸围按 5cm 取整，${f.cup} 表示差值落在 ${f.cupDiff}cm 这一档。` },
      { q: `上胸围是多少？`, a: `${f.bust}cm，即下胸围 ${f.cell.under}cm 加上 ${f.cell.diff}cm 的差。` },
      { q: `下胸围换成英寸是多少？`, a: `${f.underInch} 英寸，也就是厘米除以 2.54。` },
      { q: `一个罩杯差多少？`, a: `${f.span}cm。差值落在这个范围内都算同一罩杯。` },
    ],
    f => [
      { q: `下胸圍 ${f.cell.under}cm、差 ${f.cell.diff}cm 是什麼尺碼？`, a: `${f.label}。前面的 ${f.band} 是下胸圍按 5cm 取整，${f.cup} 表示差值落在 ${f.cupDiff}cm 這一檔。` },
      { q: `上胸圍是多少？`, a: `${f.bust}cm，即下胸圍 ${f.cell.under}cm 加上 ${f.cell.diff}cm 的差。` },
      { q: `下胸圍換成英寸是多少？`, a: `${f.underInch} 英寸，也就是公分除以 2.54。` },
      { q: `一個罩杯差多少？`, a: `${f.span}cm。差值落在這個範圍內都算同一罩杯。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const BRA_UI: L<BraUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<BraUI>;
