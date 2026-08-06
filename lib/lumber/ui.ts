/**
 * 목재 공칭 대 실측 화면의 문구 — 열 언어.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { LumberFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface LumberUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  nominalLabel: string;
  actualLabel: string;
  mmLabel: string;
  areaLabel: string;
  shareLabel: string;
  lengthLabel: string;
  metreLabel: string;
  bfLabel: string;
  litreLabel: string;
  cutTitle: string;
  cutNote: string;
  whyTitle: string;
  whyNote: string;
  bfTitle: string;
  bfNote: string;
  thinTitle: string;
  thinNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  sizeRowTitle: string;
  lengthRowTitle: string;
  desc: (f: LumberFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: LumberFacts) => string;
  metaDesc: (f: LumberFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: LumberFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Spec = { [K in keyof LumberUI]: L<LumberUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('목재 실측 치수', 'Actual lumber sizes', 'Medidas reales de madera', 'Medidas reais da madeira', '木材の実寸', 'Echte Holzmaße', 'Dimensions réelles du bois', 'लकड़ी के असली माप', '木材实际尺寸', '木材實際尺寸'),

  hubTitle: T(
    '목재 100칸 — 투바이포는 2인치도 4인치도 아닙니다',
    '100 lumber cells — a two-by-four is neither two nor four inches',
    '100 casillas de madera — un dos por cuatro no mide ni dos ni cuatro pulgadas',
    '100 células de madeira — um dois por quatro não tem dois nem quatro polegadas',
    '木材100マス — ツーバイフォーは2インチでも4インチでもありません',
    '100 Holzfelder — ein Zwei-mal-Vier ist weder zwei noch vier Zoll',
    '100 cases de bois — un deux-par-quatre ne fait ni deux ni quatre pouces',
    '100 लकड़ी खाने — टू-बाय-फ़ोर न दो इंच है न चार',
    '100 格木材 — 二乘四既不是二英寸也不是四英寸',
    '100 格木材 — 二乘四既不是二英寸也不是四英寸',
  ),

  hubLead: T(
    '통나무에서 켤 때는 그 치수였지만, 말리면서 줄고 대패질로 또 깎여 38 × 89mm가 됩니다. 깎이는 양에는 규칙이 있어 규격 열 가지와 길이 열 가지가 만나는 칸마다 실측 치수·단면적·재적을 계산했습니다.',
    'It was that size when it came off the saw, but drying shrinks it and planing takes more, leaving 38 × 89 mm. The amount removed follows a rule, so every meeting of 10 sizes and 10 lengths gets its real dimensions, cross-section and board feet.',
    'Esa era su medida al salir de la sierra, pero al secarse encoge y el cepillado quita más, dejando 38 × 89 mm. Lo que se quita sigue una regla, así que cada cruce de 10 escuadrías y 10 longitudes trae medidas reales, sección y pies tabla.',
    'Era esse o tamanho ao sair da serra, mas ao secar encolhe e o aplainamento tira mais, deixando 38 × 89 mm. O que se retira segue uma regra, então cada cruzamento de 10 bitolas e 10 comprimentos traz medidas reais, seção e pés-tábua.',
    '丸太から挽いたときはその寸法でしたが、乾く間に縮み、かんながけでさらに削れて38 × 89mmになります。削れる量には規則があるので、規格10通りと長さ10通りが出会う各マスの実寸・断面積・材積を計算しました。',
    'Beim Sägen hatte es dieses Maß, doch Trocknen lässt es schrumpfen und Hobeln nimmt weiteres weg — übrig bleiben 38 × 89 mm. Der Abtrag folgt einer Regel, also stehen für jede Begegnung von 10 Querschnitten und 10 Längen die echten Maße, der Querschnitt und die Board Feet.',
    'C’était bien la cote à la sortie de la scie, mais le séchage rétracte et le rabotage enlève encore : il reste 38 × 89 mm. Ce qui part suit une règle : chaque croisement de 10 sections et 10 longueurs donne les cotes réelles, la section et les pieds-planche.',
    'आरे से निकलते समय माप वही था, पर सूखने पर सिकुड़न और रंदा चलने से और कटकर 38 × 89 मिमी बचता है। कटने की मात्रा एक नियम से चलती है, इसलिए 10 बितोलों और 10 लंबाइयों के हर मेल के असली माप, अनुप्रस्थ काट और बोर्ड फ़ीट निकाले गए हैं।',
    '从原木锯下来时确实是那个尺寸，但干燥会缩、刨光又削掉一层，最后剩 38 × 89mm。削掉多少是有规则的，所以 10 种规格与 10 种长度交汇的每一格，都算出实际尺寸、截面积和材积。',
    '從原木鋸下來時確實是那個尺寸，但乾燥會縮、刨光又削掉一層，最後剩 38 × 89mm。削掉多少是有規則的，所以 10 種規格與 10 種長度交匯的每一格，都算出實際尺寸、截面積和材積。',
  ),

  nominalLabel: T('공칭 치수', 'Nominal size', 'Medida nominal', 'Medida nominal', '公称寸法', 'Nennmaß', 'Cote nominale', 'नाममात्र माप', '公称尺寸', '公稱尺寸'),
  actualLabel: T('실측 치수', 'Actual size', 'Medida real', 'Medida real', '実寸', 'Istmaß', 'Cote réelle', 'असली माप', '实际尺寸', '實際尺寸'),
  mmLabel: T('밀리미터', 'millimetres', 'milímetros', 'milímetros', 'ミリメートル', 'Millimeter', 'millimètres', 'मिलीमीटर', '毫米', '毫米'),
  areaLabel: T('실측 단면적', 'Actual cross-section', 'Sección real', 'Seção real', '実断面積', 'Echter Querschnitt', 'Section réelle', 'असली अनुप्रस्थ काट', '实际截面积', '實際截面積'),
  shareLabel: T('공칭 대비', 'Share of nominal', 'Respecto al nominal', 'Em relação ao nominal', '公称に対する割合', 'Anteil am Nennmaß', 'Part du nominal', 'नाममात्र का अंश', '占公称比例', '佔公稱比例'),
  lengthLabel: T('길이', 'Length', 'Longitud', 'Comprimento', '長さ', 'Länge', 'Longueur', 'लंबाई', '长度', '長度'),
  metreLabel: T('미터', 'Metres', 'Metros', 'Metros', 'メートル', 'Meter', 'Mètres', 'मीटर', '米', '公尺'),
  bfLabel: T('재적(board feet)', 'Board feet', 'Pies tabla', 'Pés-tábua', '材積(board feet)', 'Board Feet', 'Pieds-planche', 'बोर्ड फ़ीट', '材积（board feet）', '材積（board feet）'),
  litreLabel: T('실제 부피', 'Real volume', 'Volumen real', 'Volume real', '実際の体積', 'Echtes Volumen', 'Volume réel', 'असली आयतन', '实际体积', '實際體積'),

  cutTitle: T('깎이는 양은 세 갈래입니다', 'Three bands of shrinkage', 'Tres tramos de merma', 'Três faixas de perda', '削れる量は三通りです', 'Drei Stufen des Abtrags', 'Trois paliers de rabotage', 'कटौती तीन श्रेणियों में', '削减量分三档', '削減量分三檔'),

  cutNote: T(
    '공칭 1인치까지는 1/4인치, 2에서 7인치는 1/2인치, 8인치부터는 3/4인치를 뺍니다. 그래서 2×4는 1.5 × 3.5인치, 2×10은 1.5 × 9.25인치입니다. 두꺼운 재를 더 많이 깎는 것은 마르면서 줄어드는 양 자체가 크기 때문이고, 얇은 재는 남는 살이 적어 덜 깎습니다.',
    'Up to a nominal inch the loss is a quarter inch; from two to seven inches it is a half; from eight inches up it is three quarters. So a 2×4 is 1.5 × 3.5 inches and a 2×10 is 1.5 × 9.25. Thicker stock loses more because it shrinks more as it dries; thin stock has little to spare, so less is taken.',
    'Hasta una pulgada nominal se pierde un cuarto; de dos a siete pulgadas, media; de ocho en adelante, tres cuartos. Así, un 2×4 mide 1,5 × 3,5 pulgadas y un 2×10, 1,5 × 9,25. Las piezas gruesas pierden más porque encogen más al secarse; las delgadas tienen poco margen y se cepillan menos.',
    'Até uma polegada nominal perde-se um quarto; de duas a sete polegadas, meia; de oito em diante, três quartos. Assim, um 2×4 mede 1,5 × 3,5 polegadas e um 2×10, 1,5 × 9,25. Peças grossas perdem mais porque encolhem mais ao secar; as finas têm pouca folga e são menos aplainadas.',
    '公称1インチまでは1/4インチ、2から7インチは1/2インチ、8インチからは3/4インチを引きます。だから2×4は1.5 × 3.5インチ、2×10は1.5 × 9.25インチです。厚い材を多く削るのは乾く間に縮む量そのものが大きいからで、薄い材は残る肉が少ないので削りが浅いです。',
    'Bis zu einem Nennzoll geht ein Viertelzoll ab, von zwei bis sieben Zoll ein halber, ab acht Zoll drei Viertel. Ein 2×4 misst daher 1,5 × 3,5 Zoll, ein 2×10 misst 1,5 × 9,25. Dickeres Holz verliert mehr, weil es beim Trocknen stärker schwindet; dünnes hat wenig Reserve und wird weniger abgetragen.',
    'Jusqu’à un pouce nominal on retire un quart de pouce ; de deux à sept pouces, un demi ; à partir de huit, trois quarts. Un 2×4 fait donc 1,5 × 3,5 pouces et un 2×10, 1,5 × 9,25. Le bois épais perd davantage car il retrait plus au séchage ; le bois mince a peu de marge et se rabote moins.',
    'नाममात्र एक इंच तक चौथाई इंच कटता है; दो से सात इंच पर आधा; आठ इंच से ऊपर तीन-चौथाई। इसलिए 2×4 का माप 1.5 × 3.5 इंच और 2×10 का 1.5 × 9.25 है। मोटी लकड़ी अधिक खोती है क्योंकि सूखने पर वह अधिक सिकुड़ती है; पतली में गुंजाइश कम होती है, सो कम कटती है।',
    '公称一英寸以内减四分之一英寸，二到七英寸减二分之一，八英寸以上减四分之三。所以 2×4 是 1.5 × 3.5 英寸，2×10 是 1.5 × 9.25 英寸。厚料削得多，是因为干燥时本身缩得多；薄料余量少，就削得浅。',
    '公稱一英寸以內減四分之一英寸，二到七英寸減二分之一，八英寸以上減四分之三。所以 2×4 是 1.5 × 3.5 英寸，2×10 是 1.5 × 9.25 英寸。厚料削得多，是因為乾燥時本身縮得多；薄料餘量少，就削得淺。',
  ),

  whyTitle: T('왜 이름을 그대로 두었나', 'Why the name never changed', 'Por qué el nombre no cambió', 'Por que o nome não mudou', 'なぜ名前をそのままにしたか', 'Warum der Name blieb', 'Pourquoi le nom n’a pas changé', 'नाम क्यों नहीं बदला', '为什么名字没改', '為什麼名字沒改'),

  whyNote: T(
    '처음에는 이름과 치수가 같았습니다. 제재소에서 갓 켠 생재는 정말로 2 × 4인치였고, 건조와 대패질이 표준이 되면서 실측만 줄었습니다. 이름은 이미 목재상·설계·공사 현장에 깊이 박혀 있어서 그대로 두었고, 대신 규격이 실측 치수를 정해 어느 가게에서 사도 같은 크기가 나오도록 했습니다.',
    'At first the name matched the wood. Freshly sawn green lumber really was two by four inches, and only the finished size shrank as drying and planing became standard. The name was already embedded in yards, drawings and job sites, so it stayed — and the standard fixed the actual dimensions instead, so any supplier ships the same thing.',
    'Al principio el nombre coincidía con la madera. La pieza recién aserrada en verde medía de verdad dos por cuatro pulgadas; solo la medida acabada encogió al generalizarse el secado y el cepillado. El nombre ya estaba en almacenes, planos y obras, así que se quedó, y la norma fijó las medidas reales para que cualquier proveedor entregue lo mismo.',
    'No início o nome batia com a madeira. A peça recém-serrada verde media mesmo duas por quatro polegadas; só a medida acabada encolheu quando secagem e aplainamento viraram padrão. O nome já estava em depósitos, projetos e obras, então ficou — e a norma fixou as medidas reais, para qualquer fornecedor entregar o mesmo.',
    '最初は名前と寸法が同じでした。製材所で挽いたばかりの生材は本当に2 × 4インチで、乾燥とかんながけが標準になるにつれて実寸だけが縮みました。名前はすでに材木屋・図面・現場に深く根づいていたのでそのまま残し、代わりに規格が実寸を定めて、どこで買っても同じ大きさが出るようにしました。',
    'Anfangs stimmte der Name mit dem Holz überein. Frisch geschnittenes Grünholz maß tatsächlich zwei mal vier Zoll; erst mit Trocknung und Hobeln als Standard schrumpfte das Fertigmaß. Der Name steckte längst in Lagern, Plänen und Baustellen — also blieb er, und die Norm legte stattdessen die Istmaße fest, damit jeder Händler dasselbe liefert.',
    'Au début, le nom collait au bois. La pièce fraîchement sciée mesurait bien deux sur quatre pouces ; seule la cote finie a diminué quand séchage et rabotage sont devenus la règle. Le nom était déjà ancré dans les négoces, les plans et les chantiers : il est resté, et la norme a fixé les cotes réelles pour que tout fournisseur livre la même chose.',
    'शुरुआत में नाम और माप एक ही थे। ताज़ी चिरी हरी लकड़ी सचमुच दो गुणा चार इंच होती थी; सुखाई और रंदा मानक बनने पर केवल तैयार माप घटा। नाम गोदामों, नक़्शों और साइटों में जम चुका था, सो वही रहा — और मानक ने असली माप तय कर दिए ताकि कोई भी आपूर्तिकर्ता एक ही चीज़ दे।',
    '起初名字和尺寸是一致的。刚锯出的生材确实是二乘四英寸，随着干燥和刨光成为标准，只有成品尺寸缩了。名字早已扎根在木材行、图纸和工地上，于是保留下来，而由规格来固定实际尺寸——不论在哪家买，拿到的都一样。',
    '起初名字和尺寸是一致的。剛鋸出的生材確實是二乘四英寸，隨著乾燥和刨光成為標準，只有成品尺寸縮了。名字早已扎根在木材行、圖紙和工地上，於是保留下來，而由規格來固定實際尺寸——不論在哪家買，拿到的都一樣。',
  ),

  bfTitle: T('재적은 공칭으로 셉니다', 'Board feet are counted on the nominal size', 'Los pies tabla se cuentan por el nominal', 'Os pés-tábua contam-se pelo nominal', '材積は公称で数えます', 'Board Feet zählen nach Nennmaß', 'Les pieds-planche se comptent au nominal', 'बोर्ड फ़ीट नाममात्र से गिने जाते हैं', '材积按公称尺寸计算', '材積按公稱尺寸計算'),

  bfNote: T(
    '재적(board feet)은 공칭 두께 × 공칭 너비 × 길이(피트) ÷ 12로 셉니다. 실측이 아니라 공칭이라, 값을 치른 재적보다 실제 나무는 적습니다. 2×4는 공칭의 66%뿐이고, 2×2는 56%까지 내려갑니다 — 얇을수록 깎이는 몫이 상대적으로 크기 때문입니다.',
    'Board feet are nominal thickness × nominal width × length in feet ÷ 12. Because the count uses the nominal size, you get less wood than the figure you paid for: a 2×4 is only 66 % of nominal, and a 2×2 falls to 56 % — the thinner the stock, the larger the share planed away.',
    'Los pies tabla son grosor nominal × ancho nominal × longitud en pies ÷ 12. Como el cálculo usa el nominal, la madera real es menos de lo que se paga: un 2×4 es solo el 66 % del nominal y un 2×2 baja al 56 %, porque cuanto más fina, mayor la proporción cepillada.',
    'Os pés-tábua são espessura nominal × largura nominal × comprimento em pés ÷ 12. Como a conta usa o nominal, a madeira real é menos do que se paga: um 2×4 é só 66 % do nominal e um 2×2 cai a 56 % — quanto mais fina, maior a fatia aplainada.',
    '材積(board feet)は公称厚 × 公称幅 × 長さ(フィート) ÷ 12で数えます。実寸ではなく公称なので、払った材積より実際の木は少ないです。2×4は公称の66%しかなく、2×2は56%まで下がります — 薄いほど削られる割合が大きいからです。',
    'Board Feet sind Nenndicke × Nennbreite × Länge in Fuß ÷ 12. Da nach Nennmaß gezählt wird, bekommt man weniger Holz als bezahlt: ein 2×4 sind nur 66 % des Nennmaßes, ein 2×2 fällt auf 56 % — je dünner, desto größer der weggehobelte Anteil.',
    'Les pieds-planche valent épaisseur nominale × largeur nominale × longueur en pieds ÷ 12. Le compte se faisant au nominal, on reçoit moins de bois que ce qu’on paie : un 2×4 ne représente que 66 % du nominal, un 2×2 tombe à 56 % — plus la pièce est mince, plus la part rabotée pèse.',
    'बोर्ड फ़ीट = नाममात्र मोटाई × नाममात्र चौड़ाई × लंबाई (फ़ीट) ÷ 12। गिनती नाममात्र से होती है, इसलिए असली लकड़ी भुगतान से कम मिलती है: 2×4 नाममात्र का केवल 66% है और 2×2 गिरकर 56% — जितनी पतली, कटने का हिस्सा उतना बड़ा।',
    '材积 = 公称厚 × 公称宽 × 长度（英尺）÷ 12。因为按公称计算，实际拿到的木头比付钱的材积少：2×4 只有公称的 66%，2×2 更低到 56%——越薄，被刨掉的比例越大。',
    '材積 = 公稱厚 × 公稱寬 × 長度（英尺）÷ 12。因為按公稱計算，實際拿到的木頭比付錢的材積少：2×4 只有公稱的 66%，2×2 更低到 56%——越薄，被刨掉的比例越大。',
  ),

  thinTitle: T('얇을수록 손해가 큽니다', 'The thinner the stock, the worse the deal', 'Cuanto más fina, peor el trato', 'Quanto mais fina, pior o negócio', '薄いほど損が大きいです', 'Je dünner, desto schlechter das Geschäft', 'Plus c’est mince, plus la perte est forte', 'जितनी पतली, उतना बड़ा घाटा', '越薄越吃亏', '越薄越吃虧'),

  thinNote: T(
    '깎이는 양이 절대값으로 정해져 있으니, 원래 얇은 재일수록 비율로는 더 크게 잃습니다. 2×2는 두 변 모두 1/2인치씩 깎여 단면적이 공칭의 56%까지 떨어지지만, 6×6은 같은 1/2인치를 깎아도 84%가 남습니다. 자재비를 견줄 때는 재적이 아니라 실측 단면적으로 보는 편이 정확합니다.',
    'The amount removed is fixed in absolute terms, so thin stock loses more in proportion. A 2×2 loses half an inch on both sides and keeps just 56 % of its nominal cross-section, while a 6×6 loses the same half inch and keeps 84 %. When comparing prices, compare actual cross-sections rather than board feet.',
    'Lo que se quita es una cantidad fija, así que las piezas finas pierden más en proporción. Un 2×2 pierde media pulgada por lado y conserva solo el 56 % de su sección nominal; un 6×6 pierde la misma media pulgada y conserva el 84 %. Para comparar precios, mejor la sección real que los pies tabla.',
    'O que se retira é uma quantidade fixa, então peças finas perdem mais em proporção. Um 2×2 perde meia polegada de cada lado e mantém só 56 % da seção nominal; um 6×6 perde a mesma meia polegada e mantém 84 %. Para comparar preços, use a seção real, não os pés-tábua.',
    '削れる量が絶対値で決まっているので、もともと薄い材ほど割合では大きく失います。2×2は両辺とも1/2インチずつ削られて断面積が公称の56%まで落ちますが、6×6は同じ1/2インチでも84%残ります。材料費を比べるときは材積ではなく実断面積で見るほうが正確です。',
    'Der Abtrag ist absolut festgelegt, dünnes Holz verliert daher anteilig mehr. Ein 2×2 verliert an beiden Seiten je einen halben Zoll und behält nur 56 % des Nennquerschnitts; ein 6×6 verliert denselben halben Zoll und behält 84 %. Preise vergleicht man besser über den echten Querschnitt als über Board Feet.',
    'Le retrait est fixé en valeur absolue : les pièces minces perdent donc proportionnellement plus. Un 2×2 perd un demi-pouce de chaque côté et ne garde que 56 % de sa section nominale, tandis qu’un 6×6, pour le même demi-pouce, en garde 84 %. Pour comparer les prix, prenez la section réelle plutôt que les pieds-planche.',
    'कटौती निरपेक्ष रूप से तय है, इसलिए पतली लकड़ी अनुपात में अधिक खोती है। 2×2 दोनों ओर आधा-आधा इंच खोकर नाममात्र अनुप्रस्थ काट का केवल 56% रखता है, जबकि 6×6 उतना ही आधा इंच खोकर 84% रखता है। दाम मिलाते समय बोर्ड फ़ीट नहीं, असली अनुप्रस्थ काट देखें।',
    '削减量是固定的绝对值，所以本来就薄的料按比例损失更大。2×2 两边各削半英寸，截面积只剩公称的 56%；6×6 同样削半英寸，却还剩 84%。比价时看实际截面积比看材积更准。',
    '削減量是固定的絕對值，所以本來就薄的料按比例損失更大。2×2 兩邊各削半英寸，截面積只剩公稱的 56%；6×6 同樣削半英寸，卻還剩 84%。比價時看實際截面積比看材積更準。',
  ),

  careTitle: T('나라마다 규격이 다릅니다', 'Standards differ by country', 'Los estándares cambian según el país', 'Os padrões mudam conforme o país', '国ごとに規格が違います', 'Normen unterscheiden sich je nach Land', 'Les normes diffèrent selon les pays', 'देश के अनुसार मानक बदलते हैं', '各国规格不同', '各國規格不同'),

  careNote: T(
    '여기 값은 북미 규격(PS 20)을 따른 것입니다. 유럽과 일본은 처음부터 밀리미터로 규격을 정하므로 38 × 89mm를 그대로 표기하고, 공칭이라는 개념 자체가 없는 경우도 많습니다. 또 같은 2×4라도 건조 정도(생재·건조재)와 등급에 따라 허용 오차가 다릅니다.',
    'These figures follow the North American standard, PS 20. Europe and Japan set their sizes in millimetres from the start, printing 38 × 89 mm directly, and often have no notion of a nominal size at all. Even within one 2×4, tolerances differ by moisture content — green versus dry — and by grade.',
    'Estas cifras siguen la norma norteamericana PS 20. Europa y Japón fijan las medidas en milímetros desde el principio, imprimen 38 × 89 mm y a menudo ni manejan la idea de medida nominal. Además, dentro del mismo 2×4 las tolerancias cambian según la humedad —verde o seca— y la clase.',
    'Estes números seguem a norma norte-americana PS 20. Europa e Japão definem as medidas em milímetros desde o início, imprimem 38 × 89 mm e muitas vezes nem têm a noção de medida nominal. E, mesmo num 2×4, as tolerâncias mudam conforme a umidade — verde ou seca — e a classe.',
    'ここの値は北米規格(PS 20)に従ったものです。ヨーロッパや日本は最初からミリで規格を定めるので38 × 89mmとそのまま表記し、公称という考え方自体がない場合も多いです。また同じ2×4でも乾燥の度合い(生材・乾燥材)や等級で許容差が違います。',
    'Diese Werte folgen der nordamerikanischen Norm PS 20. Europa und Japan legen ihre Maße von vornherein in Millimetern fest, drucken 38 × 89 mm direkt und kennen oft gar kein Nennmaß. Und selbst bei einem 2×4 hängen die Toleranzen von Feuchte — grün oder trocken — und Sortierklasse ab.',
    'Ces valeurs suivent la norme nord-américaine PS 20. L’Europe et le Japon fixent leurs cotes en millimètres dès le départ, impriment 38 × 89 mm et ignorent souvent la notion de cote nominale. Et pour un même 2×4, les tolérances varient selon l’humidité — vert ou sec — et la classe.',
    'ये मान उत्तर अमेरिकी मानक PS 20 पर आधारित हैं। यूरोप और जापान शुरू से मिलीमीटर में माप तय करते हैं, 38 × 89 मिमी सीधे छापते हैं, और कई बार नाममात्र माप की धारणा ही नहीं रखते। एक ही 2×4 में भी नमी (हरी या सूखी) और श्रेणी से सहनशीलता बदलती है।',
    '这里的数值依据北美标准 PS 20。欧洲和日本一开始就用毫米定规格，直接标 38 × 89mm，很多时候根本没有"公称"这个概念。而且同为 2×4，湿度（生材还是干材）和等级不同，公差也不同。',
    '這裡的數值依據北美標準 PS 20。歐洲和日本一開始就用公釐定規格，直接標 38 × 89mm，很多時候根本沒有「公稱」這個概念。而且同為 2×4，濕度（生材還是乾材）和等級不同，公差也不同。',
  ),

  tableTitle: T('규격과 길이로 찾기', 'Find it by size and length', 'Búscalo por escuadría y longitud', 'Ache por bitola e comprimento', '規格と長さから探す', 'Nach Querschnitt und Länge suchen', 'Chercher par section et longueur', 'बितोला और लंबाई से देखें', '按规格和长度查找', '按規格和長度查找'),
  neighbourTitle: T('가까운 길이', 'Nearby lengths', 'Longitudes cercanas', 'Comprimentos próximos', '近い長さ', 'Längen daneben', 'Longueurs voisines', 'पास की लंबाइयाँ', '相邻长度', '相鄰長度'),
  sizeRowTitle: T('같은 규격, 다른 길이', 'Same size, other lengths', 'Misma escuadría, otras longitudes', 'Mesma bitola, outros comprimentos', '同じ規格、別の長さ', 'Gleicher Querschnitt, andere Längen', 'Même section, autres longueurs', 'वही बितोला, दूसरी लंबाइयाँ', '同一规格，不同长度', '同一規格，不同長度'),
  lengthRowTitle: T('같은 길이, 다른 규격', 'Same length, other sizes', 'Misma longitud, otras escuadrías', 'Mesmo comprimento, outras bitolas', '同じ長さ、別の規格', 'Gleiche Länge, andere Querschnitte', 'Même longueur, autres sections', 'वही लंबाई, दूसरे बितोले', '同一长度，不同规格', '同一長度，不同規格'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '공칭 1인치까지 1/4, 2~7인치 1/2, 8인치부터 3/4을 뺍니다.',
      '그래서 2×4는 1.5 × 3.5인치, 곧 38 × 89mm입니다.',
      '재적은 실측이 아니라 공칭으로 셉니다.',
      '자재를 견줄 때는 재적보다 실측 단면적이 정확합니다.',
    ],
    [
      'Subtract 1/4 inch up to one nominal inch, 1/2 from two to seven, 3/4 from eight up.',
      'So a 2×4 is 1.5 × 3.5 inches, that is 38 × 89 mm.',
      'Board feet are counted on the nominal size, not the actual one.',
      'To compare stock, compare actual cross-sections rather than board feet.',
    ],
    [
      'Resta 1/4 de pulgada hasta una nominal, 1/2 de dos a siete, 3/4 de ocho en adelante.',
      'Así, un 2×4 mide 1,5 × 3,5 pulgadas, es decir 38 × 89 mm.',
      'Los pies tabla se cuentan por el nominal, no por el real.',
      'Para comparar material, usa la sección real antes que los pies tabla.',
    ],
    [
      'Subtraia 1/4 de polegada até uma nominal, 1/2 de duas a sete, 3/4 de oito em diante.',
      'Assim, um 2×4 mede 1,5 × 3,5 polegadas, ou seja 38 × 89 mm.',
      'Os pés-tábua contam-se pelo nominal, não pelo real.',
      'Para comparar material, use a seção real em vez dos pés-tábua.',
    ],
    [
      '公称1インチまで1/4、2〜7インチ1/2、8インチから3/4を引きます。',
      'だから2×4は1.5 × 3.5インチ、つまり38 × 89mmです。',
      '材積は実寸ではなく公称で数えます。',
      '材料を比べるときは材積より実断面積が正確です。',
    ],
    [
      'Bis ein Nennzoll 1/4 Zoll abziehen, von zwei bis sieben 1/2, ab acht 3/4.',
      'Ein 2×4 misst somit 1,5 × 3,5 Zoll, also 38 × 89 mm.',
      'Board Feet zählen nach Nennmaß, nicht nach Istmaß.',
      'Zum Vergleichen taugt der echte Querschnitt besser als Board Feet.',
    ],
    [
      'Retirez 1/4 de pouce jusqu’à un pouce nominal, 1/2 de deux à sept, 3/4 à partir de huit.',
      'Un 2×4 fait donc 1,5 × 3,5 pouces, soit 38 × 89 mm.',
      'Les pieds-planche se comptent au nominal, pas au réel.',
      'Pour comparer, la section réelle vaut mieux que les pieds-planche.',
    ],
    [
      'एक नाममात्र इंच तक 1/4, दो से सात पर 1/2, आठ से ऊपर 3/4 घटाएँ।',
      'इसलिए 2×4 का माप 1.5 × 3.5 इंच यानी 38 × 89 मिमी है।',
      'बोर्ड फ़ीट असली नहीं, नाममात्र माप से गिने जाते हैं।',
      'तुलना के लिए बोर्ड फ़ीट से बेहतर असली अनुप्रस्थ काट है।',
    ],
    [
      '公称一英寸以内减 1/4，二到七英寸减 1/2，八英寸以上减 3/4。',
      '所以 2×4 是 1.5 × 3.5 英寸，也就是 38 × 89mm。',
      '材积按公称尺寸计算，不是按实际尺寸。',
      '比材料时，看实际截面积比看材积更准。',
    ],
    [
      '公稱一英寸以內減 1/4，二到七英寸減 1/2，八英寸以上減 3/4。',
      '所以 2×4 是 1.5 × 3.5 英寸，也就是 38 × 89mm。',
      '材積按公稱尺寸計算，不是按實際尺寸。',
      '比材料時，看實際截面積比看材積更準。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '2×4 실제 치수 — 공칭과 실측, 그리고 재적',
    'Actual size of a 2×4 — nominal versus real, and board feet',
    'Medida real de un 2×4 — nominal frente a real y pies tabla',
    'Medida real de um 2×4 — nominal contra real e pés-tábua',
    '2×4の実寸 — 公称と実測、そして材積',
    'Echtes Maß eines 2×4 — Nennmaß, Istmaß und Board Feet',
    'Dimensions réelles d’un 2×4 — nominal, réel et pieds-planche',
    '2×4 का असली माप — नाममात्र बनाम असली, और बोर्ड फ़ीट',
    '2×4 的实际尺寸 — 公称与实测，以及材积',
    '2×4 的實際尺寸 — 公稱與實測，以及材積',
  ),

  hubMetaDesc: T(
    '2×4의 실측은 1.5 × 3.5인치, 38 × 89mm입니다. 공칭 1인치까지 1/4, 2~7인치 1/2, 8인치부터 3/4을 뺍니다. 재적은 공칭으로 세므로 실제 나무는 2×4가 66%, 2×2는 56%뿐입니다.',
    'A 2×4 actually measures 1.5 × 3.5 inches, or 38 × 89 mm. Subtract 1/4 inch up to one nominal inch, 1/2 from two to seven, 3/4 from eight up. Board feet count the nominal size, so the real wood is 66 % of it for a 2×4 and 56 % for a 2×2.',
    'Un 2×4 mide en realidad 1,5 × 3,5 pulgadas, o 38 × 89 mm. Se resta 1/4 hasta una pulgada nominal, 1/2 de dos a siete y 3/4 de ocho en adelante. Los pies tabla cuentan el nominal: la madera real es el 66 % en un 2×4 y el 56 % en un 2×2.',
    'Um 2×4 mede na verdade 1,5 × 3,5 polegadas, ou 38 × 89 mm. Subtrai-se 1/4 até uma polegada nominal, 1/2 de duas a sete e 3/4 de oito em diante. Os pés-tábua contam o nominal: a madeira real é 66 % num 2×4 e 56 % num 2×2.',
    '2×4の実寸は1.5 × 3.5インチ、38 × 89mmです。公称1インチまで1/4、2〜7インチ1/2、8インチから3/4を引きます。材積は公称で数えるので、実際の木は2×4で66%、2×2では56%しかありません。',
    'Ein 2×4 misst tatsächlich 1,5 × 3,5 Zoll, also 38 × 89 mm. Bis ein Nennzoll geht 1/4 ab, von zwei bis sieben 1/2, ab acht 3/4. Board Feet zählen nach Nennmaß — real bleiben beim 2×4 66 %, beim 2×2 nur 56 %.',
    'Un 2×4 mesure en réalité 1,5 × 3,5 pouces, soit 38 × 89 mm. On retire 1/4 de pouce jusqu’à un pouce nominal, 1/2 de deux à sept, 3/4 à partir de huit. Les pieds-planche comptent au nominal : le bois réel n’est que 66 % pour un 2×4 et 56 % pour un 2×2.',
    '2×4 का असली माप 1.5 × 3.5 इंच यानी 38 × 89 मिमी है। एक नाममात्र इंच तक 1/4, दो से सात पर 1/2, आठ से ऊपर 3/4 घटता है। बोर्ड फ़ीट नाममात्र गिनते हैं, सो असली लकड़ी 2×4 में 66% और 2×2 में 56% है।',
    '2×4 的实际尺寸是 1.5 × 3.5 英寸，即 38 × 89mm。公称一英寸以内减 1/4，二到七英寸减 1/2，八英寸以上减 3/4。材积按公称算，所以实际木料在 2×4 只有 66%，2×2 只有 56%。',
    '2×4 的實際尺寸是 1.5 × 3.5 英寸，即 38 × 89mm。公稱一英寸以內減 1/4，二到七英寸減 1/2，八英寸以上減 3/4。材積按公稱算，所以實際木料在 2×4 只有 66%，2×2 只有 56%。',
  ),

  desc: T<(f: LumberFacts) => string>(
    f => `공칭 ${f.nomT}×${f.nomW}의 실측은 ${f.actT} × ${f.actW}인치, 곧 ${f.mmT} × ${f.mmW}mm입니다. ${f.cell.feet}피트(${f.metres}m)면 재적 ${f.bf}이고, 실측 단면적은 공칭의 ${f.share}%입니다.`,
    f => `A nominal ${f.nomT}×${f.nomW} really measures ${f.actT} × ${f.actW} inches, or ${f.mmT} × ${f.mmW} mm. At ${f.cell.feet} feet (${f.metres} m) that is ${f.bf} board feet, and the real cross-section is ${f.share} % of nominal.`,
    f => `Un ${f.nomT}×${f.nomW} nominal mide en realidad ${f.actT} × ${f.actW} pulgadas, o ${f.mmT} × ${f.mmW} mm. Con ${f.cell.feet} pies (${f.metres} m) son ${f.bf} pies tabla, y la sección real es el ${f.share} % del nominal.`,
    f => `Um ${f.nomT}×${f.nomW} nominal mede na verdade ${f.actT} × ${f.actW} polegadas, ou ${f.mmT} × ${f.mmW} mm. Com ${f.cell.feet} pés (${f.metres} m) são ${f.bf} pés-tábua, e a seção real é ${f.share} % do nominal.`,
    f => `公称${f.nomT}×${f.nomW}の実寸は${f.actT} × ${f.actW}インチ、つまり${f.mmT} × ${f.mmW}mmです。${f.cell.feet}フィート(${f.metres}m)なら材積${f.bf}で、実断面積は公称の${f.share}%です。`,
    f => `Ein nominelles ${f.nomT}×${f.nomW} misst real ${f.actT} × ${f.actW} Zoll, also ${f.mmT} × ${f.mmW} mm. Bei ${f.cell.feet} Fuß (${f.metres} m) sind das ${f.bf} Board Feet, der echte Querschnitt liegt bei ${f.share} % des Nennmaßes.`,
    f => `Un ${f.nomT}×${f.nomW} nominal mesure en réalité ${f.actT} × ${f.actW} pouces, soit ${f.mmT} × ${f.mmW} mm. Sur ${f.cell.feet} pieds (${f.metres} m), cela fait ${f.bf} pieds-planche, et la section réelle vaut ${f.share} % du nominal.`,
    f => `नाममात्र ${f.nomT}×${f.nomW} का असली माप ${f.actT} × ${f.actW} इंच यानी ${f.mmT} × ${f.mmW} मिमी है। ${f.cell.feet} फ़ीट (${f.metres} मी) पर यह ${f.bf} बोर्ड फ़ीट है, और असली अनुप्रस्थ काट नाममात्र का ${f.share}% है।`,
    f => `公称 ${f.nomT}×${f.nomW} 的实际尺寸是 ${f.actT} × ${f.actW} 英寸，即 ${f.mmT} × ${f.mmW}mm。${f.cell.feet} 英尺（${f.metres}m）合材积 ${f.bf}，实际截面积是公称的 ${f.share}%。`,
    f => `公稱 ${f.nomT}×${f.nomW} 的實際尺寸是 ${f.actT} × ${f.actW} 英寸，即 ${f.mmT} × ${f.mmW}mm。${f.cell.feet} 英尺（${f.metres}m）合材積 ${f.bf}，實際截面積是公稱的 ${f.share}%。`,
  ),

  metaTitle: T<(f: LumberFacts) => string>(
    f => `${f.cell.size} ${f.cell.feet}피트 — 실측 ${f.mmT} × ${f.mmW}mm`,
    f => `${f.cell.size}, ${f.cell.feet} ft — actually ${f.mmT} × ${f.mmW} mm`,
    f => `${f.cell.size}, ${f.cell.feet} pies — en realidad ${f.mmT} × ${f.mmW} mm`,
    f => `${f.cell.size}, ${f.cell.feet} pés — na verdade ${f.mmT} × ${f.mmW} mm`,
    f => `${f.cell.size} ${f.cell.feet}フィート — 実寸 ${f.mmT} × ${f.mmW}mm`,
    f => `${f.cell.size}, ${f.cell.feet} Fuß — real ${f.mmT} × ${f.mmW} mm`,
    f => `${f.cell.size}, ${f.cell.feet} pieds — en réalité ${f.mmT} × ${f.mmW} mm`,
    f => `${f.cell.size}, ${f.cell.feet} फ़ीट — असल में ${f.mmT} × ${f.mmW} मिमी`,
    f => `${f.cell.size} ${f.cell.feet} 英尺 — 实测 ${f.mmT} × ${f.mmW}mm`,
    f => `${f.cell.size} ${f.cell.feet} 英尺 — 實測 ${f.mmT} × ${f.mmW}mm`,
  ),

  metaDesc: T<(f: LumberFacts) => string>(
    f => `${f.cell.size}의 실측은 ${f.actT} × ${f.actW}인치(${f.mmT} × ${f.mmW}mm)입니다. ${f.cell.feet}피트는 ${f.metres}m이고 재적 ${f.bf}, 실제 부피 ${f.litres}리터입니다. 실측 단면적은 공칭의 ${f.share}%입니다.`,
    f => `A ${f.cell.size} really measures ${f.actT} × ${f.actW} inches (${f.mmT} × ${f.mmW} mm). ${f.cell.feet} feet is ${f.metres} m, ${f.bf} board feet and ${f.litres} litres of actual wood — ${f.share} % of the nominal cross-section.`,
    f => `Un ${f.cell.size} mide ${f.actT} × ${f.actW} pulgadas (${f.mmT} × ${f.mmW} mm). ${f.cell.feet} pies son ${f.metres} m, ${f.bf} pies tabla y ${f.litres} litros de madera real: el ${f.share} % de la sección nominal.`,
    f => `Um ${f.cell.size} mede ${f.actT} × ${f.actW} polegadas (${f.mmT} × ${f.mmW} mm). ${f.cell.feet} pés são ${f.metres} m, ${f.bf} pés-tábua e ${f.litres} litros de madeira real: ${f.share} % da seção nominal.`,
    f => `${f.cell.size}の実寸は${f.actT} × ${f.actW}インチ(${f.mmT} × ${f.mmW}mm)です。${f.cell.feet}フィートは${f.metres}mで、材積${f.bf}、実際の体積${f.litres}リットル。実断面積は公称の${f.share}%です。`,
    f => `Ein ${f.cell.size} misst ${f.actT} × ${f.actW} Zoll (${f.mmT} × ${f.mmW} mm). ${f.cell.feet} Fuß sind ${f.metres} m, ${f.bf} Board Feet und ${f.litres} Liter echtes Holz — ${f.share} % des Nennquerschnitts.`,
    f => `Un ${f.cell.size} mesure ${f.actT} × ${f.actW} pouces (${f.mmT} × ${f.mmW} mm). ${f.cell.feet} pieds font ${f.metres} m, ${f.bf} pieds-planche et ${f.litres} litres de bois réel, soit ${f.share} % de la section nominale.`,
    f => `${f.cell.size} का माप ${f.actT} × ${f.actW} इंच (${f.mmT} × ${f.mmW} मिमी) है। ${f.cell.feet} फ़ीट = ${f.metres} मी, ${f.bf} बोर्ड फ़ीट और ${f.litres} लीटर असली लकड़ी — नाममात्र अनुप्रस्थ काट का ${f.share}%।`,
    f => `${f.cell.size} 实测 ${f.actT} × ${f.actW} 英寸（${f.mmT} × ${f.mmW}mm）。${f.cell.feet} 英尺是 ${f.metres}m，材积 ${f.bf}，实际体积 ${f.litres} 升，占公称截面积的 ${f.share}%。`,
    f => `${f.cell.size} 實測 ${f.actT} × ${f.actW} 英寸（${f.mmT} × ${f.mmW}mm）。${f.cell.feet} 英尺是 ${f.metres}m，材積 ${f.bf}，實際體積 ${f.litres} 公升，佔公稱截面積的 ${f.share}%。`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '2×4의 실제 크기는 얼마인가요?', a: '1.5 × 3.5인치, 38 × 89mm입니다. 공칭 2인치와 4인치에서 각각 1/2인치씩 깎인 값입니다.' },
      { q: '왜 이름과 크기가 다른가요?', a: '갓 켠 생재는 그 치수였는데, 말리면서 줄고 대패질로 또 깎였기 때문입니다. 이름은 이미 굳어져 그대로 두었습니다.' },
      { q: '2×10은 왜 1/2이 아니라 3/4이 깎이나요?', a: '공칭 8인치부터는 3/4인치를 빼도록 규격이 정하고 있습니다. 두꺼운 재가 마르면서 더 많이 줄기 때문입니다.' },
      { q: '재적은 실측으로 세나요?', a: '아닙니다. 공칭으로 셉니다. 그래서 2×4는 셈한 재적의 66%, 2×2는 56%만 실제 나무입니다.' },
      { q: '유럽이나 일본도 같나요?', a: '아닙니다. 그쪽은 처음부터 밀리미터로 규격을 정해 38 × 89mm를 그대로 씁니다.' },
    ],
    [
      { q: 'How big is a 2×4 really?', a: '1.5 × 3.5 inches, or 38 × 89 mm — half an inch off each nominal dimension.' },
      { q: 'Why does the name not match?', a: 'Green lumber straight off the saw was that size; drying shrank it and planing took more. The name had already stuck.' },
      { q: 'Why does a 2×10 lose 3/4 rather than 1/2?', a: 'From eight nominal inches up the standard calls for three quarters, because thicker stock shrinks more as it dries.' },
      { q: 'Are board feet counted on the actual size?', a: 'No, on the nominal one. A 2×4 gives you 66 % of the wood you counted, a 2×2 only 56 %.' },
      { q: 'Is it the same in Europe or Japan?', a: 'No. They set sizes in millimetres from the start and simply print 38 × 89 mm.' },
    ],
    [
      { q: '¿Cuánto mide de verdad un 2×4?', a: '1,5 × 3,5 pulgadas, o 38 × 89 mm: media pulgada menos en cada dimensión nominal.' },
      { q: '¿Por qué el nombre no coincide?', a: 'La madera verde recién aserrada sí medía eso; el secado la encogió y el cepillado quitó más. El nombre ya estaba fijado.' },
      { q: '¿Por qué un 2×10 pierde 3/4 y no 1/2?', a: 'Desde ocho pulgadas nominales la norma pide tres cuartos, porque la madera gruesa encoge más al secarse.' },
      { q: '¿Los pies tabla usan la medida real?', a: 'No, la nominal. Un 2×4 entrega el 66 % de lo contado y un 2×2 solo el 56 %.' },
      { q: '¿Ocurre igual en Europa o Japón?', a: 'No. Allí se fijan las medidas en milímetros desde el principio y se escribe 38 × 89 mm.' },
    ],
    [
      { q: 'Quanto mede de verdade um 2×4?', a: '1,5 × 3,5 polegadas, ou 38 × 89 mm: meia polegada a menos em cada dimensão nominal.' },
      { q: 'Por que o nome não bate?', a: 'A madeira verde recém-serrada media isso; a secagem encolheu e o aplainamento tirou mais. O nome já havia pegado.' },
      { q: 'Por que um 2×10 perde 3/4 e não 1/2?', a: 'De oito polegadas nominais para cima a norma pede três quartos, porque a madeira grossa encolhe mais ao secar.' },
      { q: 'Os pés-tábua usam a medida real?', a: 'Não, a nominal. Um 2×4 entrega 66 % do que foi contado; um 2×2, só 56 %.' },
      { q: 'É igual na Europa ou no Japão?', a: 'Não. Lá as medidas são fixadas em milímetros desde o início e escreve-se 38 × 89 mm.' },
    ],
    [
      { q: '2×4の実際の大きさは？', a: '1.5 × 3.5インチ、38 × 89mmです。公称の2インチと4インチからそれぞれ1/2インチずつ削れた値です。' },
      { q: 'なぜ名前と大きさが違うのですか？', a: '挽きたての生材はその寸法でしたが、乾く間に縮み、かんながけでさらに削れたからです。名前はすでに定着していました。' },
      { q: '2×10はなぜ1/2でなく3/4削れますか？', a: '公称8インチからは3/4インチを引くと規格が定めています。厚い材ほど乾く間に縮む量が大きいからです。' },
      { q: '材積は実寸で数えますか？', a: 'いいえ、公称で数えます。だから2×4は数えた材積の66%、2×2は56%しか実際の木がありません。' },
      { q: 'ヨーロッパや日本も同じですか？', a: '違います。あちらは最初からミリで規格を定め、38 × 89mmとそのまま書きます。' },
    ],
    [
      { q: 'Wie groß ist ein 2×4 wirklich?', a: '1,5 × 3,5 Zoll, also 38 × 89 mm — je ein halber Zoll weniger als das Nennmaß.' },
      { q: 'Warum passt der Name nicht?', a: 'Frisch gesägtes Grünholz hatte dieses Maß; Trocknen ließ es schrumpfen, Hobeln nahm mehr weg. Der Name war schon etabliert.' },
      { q: 'Warum verliert ein 2×10 3/4 statt 1/2?', a: 'Ab acht Nennzoll verlangt die Norm drei Viertel, weil dickeres Holz beim Trocknen stärker schwindet.' },
      { q: 'Werden Board Feet nach Istmaß gezählt?', a: 'Nein, nach Nennmaß. Ein 2×4 liefert 66 % des gezählten Holzes, ein 2×2 nur 56 %.' },
      { q: 'Gilt das auch in Europa oder Japan?', a: 'Nein. Dort werden die Maße von Anfang an in Millimetern festgelegt und 38 × 89 mm geschrieben.' },
    ],
    [
      { q: 'Combien mesure vraiment un 2×4 ?', a: '1,5 × 3,5 pouces, soit 38 × 89 mm : un demi-pouce en moins sur chaque cote nominale.' },
      { q: 'Pourquoi le nom ne correspond-il pas ?', a: 'Le bois vert sortant de la scie faisait bien cette cote ; le séchage l’a rétracté et le rabotage a enlevé le reste. Le nom, lui, était déjà installé.' },
      { q: 'Pourquoi un 2×10 perd-il 3/4 et non 1/2 ?', a: 'À partir de huit pouces nominaux, la norme impose trois quarts, le bois épais se rétractant davantage au séchage.' },
      { q: 'Les pieds-planche se comptent-ils au réel ?', a: 'Non, au nominal. Un 2×4 donne 66 % du bois compté, un 2×2 seulement 56 %.' },
      { q: 'Est-ce pareil en Europe ou au Japon ?', a: 'Non. Là-bas les cotes sont fixées en millimètres dès le départ et l’on écrit 38 × 89 mm.' },
    ],
    [
      { q: '2×4 असल में कितना बड़ा है?', a: '1.5 × 3.5 इंच, यानी 38 × 89 मिमी — हर नाममात्र माप से आधा इंच कम।' },
      { q: 'नाम और माप अलग क्यों हैं?', a: 'आरे से निकली हरी लकड़ी वही माप रखती थी; सूखने पर सिकुड़ी और रंदे ने और काटा। नाम तब तक जम चुका था।' },
      { q: '2×10 में 1/2 नहीं, 3/4 क्यों कटता है?', a: 'आठ नाममात्र इंच से ऊपर मानक तीन-चौथाई माँगता है, क्योंकि मोटी लकड़ी सूखने पर अधिक सिकुड़ती है।' },
      { q: 'क्या बोर्ड फ़ीट असली माप से गिने जाते हैं?', a: 'नहीं, नाममात्र से। 2×4 गिनी गई लकड़ी का 66% देता है, 2×2 केवल 56%।' },
      { q: 'क्या यूरोप या जापान में भी ऐसा है?', a: 'नहीं। वहाँ शुरू से मिलीमीटर में माप तय होते हैं और सीधे 38 × 89 मिमी लिखा जाता है।' },
    ],
    [
      { q: '2×4 实际有多大？', a: '1.5 × 3.5 英寸，即 38 × 89mm——公称的两个尺寸各减半英寸。' },
      { q: '为什么名字和尺寸对不上？', a: '刚锯出的生材确实是那个尺寸，干燥缩了、刨光又削了。名字那时已经叫开了。' },
      { q: '2×10 为什么减 3/4 而不是 1/2？', a: '公称八英寸以上，规格要求减四分之三，因为厚料干燥时缩得更多。' },
      { q: '材积是按实际尺寸算的吗？', a: '不是，按公称算。所以 2×4 只拿到所计材积的 66%，2×2 更只有 56%。' },
      { q: '欧洲和日本也一样吗？', a: '不一样。那边一开始就用毫米定规格，直接写 38 × 89mm。' },
    ],
    [
      { q: '2×4 實際有多大？', a: '1.5 × 3.5 英寸，即 38 × 89mm——公稱的兩個尺寸各減半英寸。' },
      { q: '為什麼名字和尺寸對不上？', a: '剛鋸出的生材確實是那個尺寸，乾燥縮了、刨光又削了。名字那時已經叫開了。' },
      { q: '2×10 為什麼減 3/4 而不是 1/2？', a: '公稱八英寸以上，規格要求減四分之三，因為厚料乾燥時縮得更多。' },
      { q: '材積是按實際尺寸算的嗎？', a: '不是，按公稱算。所以 2×4 只拿到所計材積的 66%，2×2 更只有 56%。' },
      { q: '歐洲和日本也一樣嗎？', a: '不一樣。那邊一開始就用公釐定規格，直接寫 38 × 89mm。' },
    ],
  ),

  cellFaq: T<(f: LumberFacts) => FaqItem[]>(
    f => [
      { q: `${f.cell.size}의 실제 치수는 얼마인가요?`, a: `${f.actT} × ${f.actW}인치, ${f.mmT} × ${f.mmW}mm입니다.` },
      { q: `${f.cell.feet}피트는 몇 미터인가요?`, a: `${f.metres}m입니다. 실제 부피는 ${f.litres}리터입니다.` },
      { q: `재적은 얼마인가요?`, a: `${f.bf}입니다. 공칭 ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12로 셉니다.` },
      { q: `실제 나무는 얼마나 되나요?`, a: `실측 단면적이 ${f.area}제곱인치로 공칭 ${f.nomArea}의 ${f.share}%입니다.` },
    ],
    f => [
      { q: `What are the real dimensions of a ${f.cell.size}?`, a: `${f.actT} × ${f.actW} inches, or ${f.mmT} × ${f.mmW} mm.` },
      { q: `How long is ${f.cell.feet} feet in metres?`, a: `${f.metres} m, holding ${f.litres} litres of actual wood.` },
      { q: `How many board feet is it?`, a: `${f.bf} — nominal ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12.` },
      { q: `How much wood is really there?`, a: `The actual cross-section is ${f.area} square inches against a nominal ${f.nomArea}, or ${f.share} %.` },
    ],
    f => [
      { q: `¿Cuáles son las medidas reales de un ${f.cell.size}?`, a: `${f.actT} × ${f.actW} pulgadas, o ${f.mmT} × ${f.mmW} mm.` },
      { q: `¿Cuánto son ${f.cell.feet} pies en metros?`, a: `${f.metres} m, con ${f.litres} litros de madera real.` },
      { q: `¿Cuántos pies tabla son?`, a: `${f.bf}: nominal ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12.` },
      { q: `¿Cuánta madera hay realmente?`, a: `La sección real es ${f.area} pulgadas cuadradas frente a ${f.nomArea} nominales, o sea el ${f.share} %.` },
    ],
    f => [
      { q: `Quais as medidas reais de um ${f.cell.size}?`, a: `${f.actT} × ${f.actW} polegadas, ou ${f.mmT} × ${f.mmW} mm.` },
      { q: `Quanto são ${f.cell.feet} pés em metros?`, a: `${f.metres} m, com ${f.litres} litros de madeira real.` },
      { q: `Quantos pés-tábua são?`, a: `${f.bf}: nominal ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12.` },
      { q: `Quanta madeira há de fato?`, a: `A seção real é ${f.area} polegadas quadradas contra ${f.nomArea} nominais, ou seja ${f.share} %.` },
    ],
    f => [
      { q: `${f.cell.size}の実寸はいくつですか？`, a: `${f.actT} × ${f.actW}インチ、${f.mmT} × ${f.mmW}mmです。` },
      { q: `${f.cell.feet}フィートは何メートルですか？`, a: `${f.metres}mです。実際の体積は${f.litres}リットルです。` },
      { q: `材積はいくつですか？`, a: `${f.bf}です。公称${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12で数えます。` },
      { q: `実際の木はどれくらいですか？`, a: `実断面積が${f.area}平方インチで、公称${f.nomArea}の${f.share}%です。` },
    ],
    f => [
      { q: `Wie sind die echten Maße eines ${f.cell.size}?`, a: `${f.actT} × ${f.actW} Zoll, also ${f.mmT} × ${f.mmW} mm.` },
      { q: `Wie viel sind ${f.cell.feet} Fuß in Metern?`, a: `${f.metres} m, mit ${f.litres} Litern echtem Holz.` },
      { q: `Wie viele Board Feet sind das?`, a: `${f.bf} — nominell ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12.` },
      { q: `Wie viel Holz ist tatsächlich da?`, a: `Der echte Querschnitt misst ${f.area} Quadratzoll gegenüber ${f.nomArea} nominell, also ${f.share} %.` },
    ],
    f => [
      { q: `Quelles sont les cotes réelles d’un ${f.cell.size} ?`, a: `${f.actT} × ${f.actW} pouces, soit ${f.mmT} × ${f.mmW} mm.` },
      { q: `Combien font ${f.cell.feet} pieds en mètres ?`, a: `${f.metres} m, pour ${f.litres} litres de bois réel.` },
      { q: `Cela fait combien de pieds-planche ?`, a: `${f.bf} : nominal ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12.` },
      { q: `Combien de bois y a-t-il vraiment ?`, a: `La section réelle vaut ${f.area} pouces carrés contre ${f.nomArea} nominaux, soit ${f.share} %.` },
    ],
    f => [
      { q: `${f.cell.size} के असली माप क्या हैं?`, a: `${f.actT} × ${f.actW} इंच, यानी ${f.mmT} × ${f.mmW} मिमी।` },
      { q: `${f.cell.feet} फ़ीट कितने मीटर हैं?`, a: `${f.metres} मी, जिसमें ${f.litres} लीटर असली लकड़ी है।` },
      { q: `यह कितने बोर्ड फ़ीट है?`, a: `${f.bf} — नाममात्र ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12।` },
      { q: `असल में कितनी लकड़ी है?`, a: `असली अनुप्रस्थ काट ${f.area} वर्ग इंच है, नाममात्र ${f.nomArea} के मुक़ाबले ${f.share}%।` },
    ],
    f => [
      { q: `${f.cell.size} 的实际尺寸是多少？`, a: `${f.actT} × ${f.actW} 英寸，即 ${f.mmT} × ${f.mmW}mm。` },
      { q: `${f.cell.feet} 英尺是多少米？`, a: `${f.metres}m，实际木料体积 ${f.litres} 升。` },
      { q: `材积是多少？`, a: `${f.bf}。按公称 ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12 计算。` },
      { q: `实际木料有多少？`, a: `实际截面积 ${f.area} 平方英寸，公称是 ${f.nomArea}，占 ${f.share}%。` },
    ],
    f => [
      { q: `${f.cell.size} 的實際尺寸是多少？`, a: `${f.actT} × ${f.actW} 英寸，即 ${f.mmT} × ${f.mmW}mm。` },
      { q: `${f.cell.feet} 英尺是多少公尺？`, a: `${f.metres}m，實際木料體積 ${f.litres} 公升。` },
      { q: `材積是多少？`, a: `${f.bf}。按公稱 ${f.nomT} × ${f.nomW} × ${f.cell.feet} ÷ 12 計算。` },
      { q: `實際木料有多少？`, a: `實際截面積 ${f.area} 平方英寸，公稱是 ${f.nomArea}，佔 ${f.share}%。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const LUMBER_UI: L<LumberUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<LumberUI>;
