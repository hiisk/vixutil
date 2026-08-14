/**
 * 퍼센트 화면의 문구 — 열 언어.
 *
 * 숫자가 답이라 문장은 짧다. 대신 **자리 구분과 소수점 기호가 언어마다 다르다** —
 * 1,234.5(한국·영어)와 1.234,5(독일·스페인)와 1 234,5(프랑스)는 같은 수인데
 * 잘못 적으면 천 배 틀린 것처럼 읽힌다. 돈을 다루는 화면이라 그냥 넘길 수 없다.
 *
 * toLocaleString에 기대지 않는다. 서버(Node)와 브라우저의 ICU가 다르면 같은
 * 페이지가 다른 숫자를 그려 하이드레이션이 깨진다 — 이 저장소가 날짜에서 이미
 * 겪은 함정이라 여기서는 구분자를 직접 끼운다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { PercentFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface PercentUI {
  home: string;
  section: string;
  /** 1234.5 → "1,234.5" / "1.234,5" / "1 234,5" */
  num: (v: number) => string;
  hubTitle: string;
  hubLead: string;
  headline: (f: PercentFacts) => string;
  workingTitle: string;
  working: (f: PercentFacts) => string;
  offTitle: string;
  offLabel: string;
  addLabel: string;
  offNote: (f: PercentFacts) => string;
  ratioTitle: string;
  ratioNote: (f: PercentFacts) => string;
  roundedTag: string;
  wholeLabel: string;
  byPercentTitle: (f: PercentFacts) => string;
  byBaseTitle: (f: PercentFacts) => string;
  neighbourTitle: string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: PercentFacts) => string;
  metaDesc: (f: PercentFacts) => string;
  hubFaq: FaqItem[];
  itemFaq: (f: PercentFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

/** 세 자리마다 group, 소수점은 point */
const fmt = (group: string, point: string) => (v: number): string => {
  const [i, d] = String(v).split('.');
  const grouped = i.replace(/\B(?=(\d{3})+(?!\d))/g, group);
  return d ? `${grouped}${point}${d}` : grouped;
};

const NUM: L<(v: number) => string> = {
  ko: fmt(',', '.'), en: fmt(',', '.'), ja: fmt(',', '.'), hi: fmt(',', '.'),
  zh: fmt(',', '.'), tw: fmt(',', '.'),
  es: fmt('.', ','), pt: fmt('.', ','), de: fmt('.', ','),
  fr: fmt(' ', ','),
};

const n = (lang: Lang) => NUM[lang];

type Spec = { [K in keyof PercentUI]: L<PercentUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('퍼센트', 'Percentages', 'Porcentajes', 'Porcentagens', 'パーセント', 'Prozentrechnung', 'Pourcentages', 'प्रतिशत', '百分比', '百分比'),
  num: NUM,

  hubTitle: T(
    '퍼센트 계산 1,200가지',
    'Percentage answers, 1,200 of them',
    '1.200 cálculos de porcentaje',
    '1.200 cálculos de porcentagem',
    'パーセント計算1,200通り',
    '1.200 Prozentrechnungen',
    '1 200 calculs de pourcentage',
    '1,200 प्रतिशत गणनाएँ',
    '1,200 种百分比计算',
    '1,200 種百分比計算',
  ),

  hubLead: T(
    '200의 15%는 얼마인지, 15% 깎으면 얼마가 되는지, 15는 200의 몇 퍼센트인지를 한 화면에서 봅니다.',
    'What 15% of 200 is, what 15% off leaves you with, and what percent 15 is of 200 — all on one page.',
    'Cuánto es el 15 % de 200, cuánto queda al quitar el 15 % y qué porcentaje es 15 de 200, todo en una página.',
    'Quanto é 15% de 200, quanto sobra tirando 15% e que porcentagem 15 é de 200 — tudo numa página.',
    '200の15%はいくらか、15%引くといくらになるか、15は200の何パーセントか——一つの画面で見られます。',
    'Wie viel 15 % von 200 sind, was nach 15 % Rabatt bleibt und wie viel Prozent 15 von 200 ist — auf einer Seite.',
    'Combien font 15 % de 200, ce qu’il reste après 15 % de remise, et quel pourcentage 15 représente de 200 — sur une seule page.',
    '200 का 15% कितना है, 15% घटाने पर क्या बचता है, और 15 दो सौ का कितने प्रतिशत है — सब एक ही पन्ने पर।',
    '200 的 15% 是多少、打折 15% 后剩多少、15 是 200 的百分之几——一个页面全都有。',
    '200 的 15% 是多少、折扣 15% 後剩多少、15 是 200 的百分之幾——一個頁面全都有。',
  ),

  headline: T(
    f => `${n('ko')(f.base)}의 ${f.percent}%는 ${n('ko')(f.value)}입니다.`,
    f => `${f.percent}% of ${n('en')(f.base)} is ${n('en')(f.value)}.`,
    f => `El ${f.percent} % de ${n('es')(f.base)} es ${n('es')(f.value)}.`,
    f => `${f.percent}% de ${n('pt')(f.base)} é ${n('pt')(f.value)}.`,
    f => `${n('ja')(f.base)}の${f.percent}%は${n('ja')(f.value)}です。`,
    f => `${f.percent} % von ${n('de')(f.base)} sind ${n('de')(f.value)}.`,
    f => `${f.percent} % de ${n('fr')(f.base)} font ${n('fr')(f.value)}.`,
    f => `${n('hi')(f.base)} का ${f.percent}% ${n('hi')(f.value)} है।`,
    f => `${n('zh')(f.base)} 的 ${f.percent}% 是 ${n('zh')(f.value)}。`,
    f => `${n('tw')(f.base)} 的 ${f.percent}% 是 ${n('tw')(f.value)}。`,
  ),

  workingTitle: T('셈', 'The working', 'El cálculo', 'A conta', '計算', 'Der Rechenweg', 'Le calcul', 'गणना', '算式', '算式'),

  working: T(
    f => `${n('ko')(f.base)} × ${n('ko')(f.fraction)} = ${n('ko')(f.value)}`,
    f => `${n('en')(f.base)} × ${n('en')(f.fraction)} = ${n('en')(f.value)}`,
    f => `${n('es')(f.base)} × ${n('es')(f.fraction)} = ${n('es')(f.value)}`,
    f => `${n('pt')(f.base)} × ${n('pt')(f.fraction)} = ${n('pt')(f.value)}`,
    f => `${n('ja')(f.base)} × ${n('ja')(f.fraction)} = ${n('ja')(f.value)}`,
    f => `${n('de')(f.base)} × ${n('de')(f.fraction)} = ${n('de')(f.value)}`,
    f => `${n('fr')(f.base)} × ${n('fr')(f.fraction)} = ${n('fr')(f.value)}`,
    f => `${n('hi')(f.base)} × ${n('hi')(f.fraction)} = ${n('hi')(f.value)}`,
    f => `${n('zh')(f.base)} × ${n('zh')(f.fraction)} = ${n('zh')(f.value)}`,
    f => `${n('tw')(f.base)} × ${n('tw')(f.fraction)} = ${n('tw')(f.value)}`,
  ),

  offTitle: T('깎거나 붙이면', 'Off and on', 'Quitar o añadir', 'Tirar ou somar', '引くと・足すと', 'Abzug und Aufschlag', 'Remise et majoration', 'घटाने और जोड़ने पर', '减价与加价', '減價與加價'),
  offLabel: T('깎은 값', 'After the discount', 'Con el descuento', 'Com o desconto', '引いた値', 'Nach Abzug', 'Après remise', 'छूट के बाद', '打折后', '折扣後'),
  addLabel: T('붙인 값', 'With it added', 'Con el recargo', 'Com o acréscimo', '足した値', 'Mit Aufschlag', 'Avec majoration', 'जोड़ने पर', '加价后', '加價後'),

  offNote: T(
    f => `${f.percent}% 할인이면 ${n('ko')(f.value)}을 깎아 ${n('ko')(f.decreased)}을 냅니다. 세금이나 팁으로 ${f.percent}%를 붙이면 ${n('ko')(f.increased)}이 됩니다.`,
    f => `A ${f.percent}% discount takes off ${n('en')(f.value)}, leaving ${n('en')(f.decreased)}. Adding ${f.percent}% as tax or tip brings it to ${n('en')(f.increased)}.`,
    f => `Un descuento del ${f.percent} % quita ${n('es')(f.value)} y deja ${n('es')(f.decreased)}. Sumar el ${f.percent} % de impuesto o propina lo lleva a ${n('es')(f.increased)}.`,
    f => `Um desconto de ${f.percent}% tira ${n('pt')(f.value)} e deixa ${n('pt')(f.decreased)}. Somar ${f.percent}% de imposto ou gorjeta leva a ${n('pt')(f.increased)}.`,
    f => `${f.percent}%引きなら${n('ja')(f.value)}を引いて${n('ja')(f.decreased)}を払います。税やチップとして${f.percent}%足すと${n('ja')(f.increased)}になります。`,
    f => `${f.percent} % Rabatt zieht ${n('de')(f.value)} ab, es bleiben ${n('de')(f.decreased)}. Mit ${f.percent} % Steuer oder Trinkgeld sind es ${n('de')(f.increased)}.`,
    f => `Une remise de ${f.percent} % retire ${n('fr')(f.value)}, il reste ${n('fr')(f.decreased)}. En ajoutant ${f.percent} % de taxe ou de pourboire, on arrive à ${n('fr')(f.increased)}.`,
    f => `${f.percent}% छूट ${n('hi')(f.value)} घटाती है और ${n('hi')(f.decreased)} बचता है। कर या टिप के रूप में ${f.percent}% जोड़ने पर ${n('hi')(f.increased)} हो जाता है।`,
    f => `打 ${f.percent}% 的折扣要减去 ${n('zh')(f.value)}，付 ${n('zh')(f.decreased)}。作为税或小费加上 ${f.percent}%，则是 ${n('zh')(f.increased)}。`,
    f => `折扣 ${f.percent}% 要減去 ${n('tw')(f.value)}，付 ${n('tw')(f.decreased)}。作為稅或小費加上 ${f.percent}%，則是 ${n('tw')(f.increased)}。`,
  ),

  ratioTitle: T('거꾸로', 'The other way round', 'Al revés', 'Ao contrário', '逆から', 'Umgekehrt', 'Dans l’autre sens', 'उलटा', '反过来', '反過來'),

  ratioNote: T(
    f => `${n('ko')(f.percent)}은 ${n('ko')(f.base)}의 ${n('ko')(f.reverseRatio)}%입니다. 거꾸로 ${n('ko')(f.value)}이 ${f.percent}%라면 원래 수는 ${n('ko')(f.wholeFromValue)}입니다.`,
    f => `${n('en')(f.percent)} is ${n('en')(f.reverseRatio)}% of ${n('en')(f.base)}. And if ${n('en')(f.value)} is the ${f.percent}%, the whole was ${n('en')(f.wholeFromValue)}.`,
    f => `${n('es')(f.percent)} es el ${n('es')(f.reverseRatio)} % de ${n('es')(f.base)}. Y si ${n('es')(f.value)} es ese ${f.percent} %, el total era ${n('es')(f.wholeFromValue)}.`,
    f => `${n('pt')(f.percent)} é ${n('pt')(f.reverseRatio)}% de ${n('pt')(f.base)}. E se ${n('pt')(f.value)} é esse ${f.percent}%, o total era ${n('pt')(f.wholeFromValue)}.`,
    f => `${n('ja')(f.percent)}は${n('ja')(f.base)}の${n('ja')(f.reverseRatio)}%です。逆に${n('ja')(f.value)}が${f.percent}%なら、もとの数は${n('ja')(f.wholeFromValue)}です。`,
    f => `${n('de')(f.percent)} sind ${n('de')(f.reverseRatio)} % von ${n('de')(f.base)}. Und wenn ${n('de')(f.value)} die ${f.percent} % sind, war das Ganze ${n('de')(f.wholeFromValue)}.`,
    f => `${n('fr')(f.percent)} représente ${n('fr')(f.reverseRatio)} % de ${n('fr')(f.base)}. Et si ${n('fr')(f.value)} correspond à ces ${f.percent} %, le total était ${n('fr')(f.wholeFromValue)}.`,
    f => `${n('hi')(f.percent)}, ${n('hi')(f.base)} का ${n('hi')(f.reverseRatio)}% है। और अगर ${n('hi')(f.value)} ही वह ${f.percent}% है, तो पूरा ${n('hi')(f.wholeFromValue)} था।`,
    f => `${n('zh')(f.percent)} 是 ${n('zh')(f.base)} 的 ${n('zh')(f.reverseRatio)}%。反过来，若 ${n('zh')(f.value)} 就是那 ${f.percent}%，原数是 ${n('zh')(f.wholeFromValue)}。`,
    f => `${n('tw')(f.percent)} 是 ${n('tw')(f.base)} 的 ${n('tw')(f.reverseRatio)}%。反過來，若 ${n('tw')(f.value)} 就是那 ${f.percent}%，原數是 ${n('tw')(f.wholeFromValue)}。`,
  ),

  roundedTag: T('반올림한 값', 'rounded', 'redondeado', 'arredondado', '四捨五入', 'gerundet', 'arrondi', 'गोल किया', '四舍五入', '四捨五入'),
  wholeLabel: T('원래 수', 'The whole', 'El total', 'O total', 'もとの数', 'Das Ganze', 'Le total', 'पूरा', '原数', '原數'),

  byPercentTitle: T(
    f => `${n('ko')(f.base)}의 다른 퍼센트`,
    f => `Other percentages of ${n('en')(f.base)}`,
    f => `Otros porcentajes de ${n('es')(f.base)}`,
    f => `Outras porcentagens de ${n('pt')(f.base)}`,
    f => `${n('ja')(f.base)}の他のパーセント`,
    f => `Andere Prozentsätze von ${n('de')(f.base)}`,
    f => `Autres pourcentages de ${n('fr')(f.base)}`,
    f => `${n('hi')(f.base)} के अन्य प्रतिशत`,
    f => `${n('zh')(f.base)} 的其他百分比`,
    f => `${n('tw')(f.base)} 的其他百分比`,
  ),

  byBaseTitle: T(
    f => `다른 수의 ${f.percent}%`,
    f => `${f.percent}% of other numbers`,
    f => `El ${f.percent} % de otros números`,
    f => `${f.percent}% de outros números`,
    f => `他の数の${f.percent}%`,
    f => `${f.percent} % von anderen Zahlen`,
    f => `${f.percent} % d’autres nombres`,
    f => `दूसरी संख्याओं का ${f.percent}%`,
    f => `其他数的 ${f.percent}%`,
    f => `其他數的 ${f.percent}%`,
  ),

  neighbourTitle: T('가까운 계산', 'Nearby', 'Cerca de aquí', 'Por perto', '近い計算', 'In der Nähe', 'À côté', 'आसपास', '相近的计算', '相近的計算'),

  howTitle: T('읽는 방법', 'How to read it', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man es', 'Comment lire', 'कैसे पढ़ें', '怎么读', '怎麼讀'),

  how: T(
    [
      '퍼센트는 100분의 몇이라는 뜻입니다. 15%는 0.15이므로, 기준수에 0.15를 곱하면 답이 나옵니다.',
      '할인은 빼기이고 세금·팁은 더하기입니다. 같은 15%라도 깎은 값과 붙인 값의 차이는 값의 두 배가 됩니다.',
      '"몇 퍼센트인가"는 나누기입니다. 15 ÷ 200 × 100이 답이고, 딱 떨어지지 않으면 반올림한 값입니다.',
    ],
    [
      'Percent means hundredths. 15% is 0.15, so multiplying the base by 0.15 gives the answer.',
      'A discount subtracts, tax or tip adds. For the same 15%, the gap between the two results is twice the value.',
      '"What percent" is a division: 15 ÷ 200 × 100. When it does not come out even, the figure shown is rounded.',
    ],
    [
      'Por ciento significa centésimas. El 15 % es 0,15, así que multiplicar la base por 0,15 da la respuesta.',
      'Un descuento resta; el impuesto o la propina suman. Con el mismo 15 %, la diferencia entre ambos resultados es el doble del valor.',
      '«Qué porcentaje» es una división: 15 ÷ 200 × 100. Si no da exacto, la cifra mostrada está redondeada.',
    ],
    [
      'Por cento quer dizer centésimos. 15% é 0,15, então multiplicar a base por 0,15 dá a resposta.',
      'Desconto subtrai; imposto ou gorjeta somam. Com os mesmos 15%, a diferença entre os dois resultados é o dobro do valor.',
      '"Que porcentagem" é uma divisão: 15 ÷ 200 × 100. Quando não dá exato, o número mostrado está arredondado.',
    ],
    [
      'パーセントは100分のいくつという意味です。15%は0.15なので、基準の数に0.15を掛ければ答えが出ます。',
      '割引は引き算、税やチップは足し算です。同じ15%でも、引いた値と足した値の差は値の二倍になります。',
      '「何パーセントか」は割り算です。15 ÷ 200 × 100が答えで、割り切れないときは四捨五入した値です。',
    ],
    [
      'Prozent heißt Hundertstel. 15 % sind 0,15 — die Grundzahl mal 0,15 ergibt die Antwort.',
      'Ein Rabatt zieht ab, Steuer oder Trinkgeld kommen dazu. Bei denselben 15 % ist der Abstand zwischen beiden Ergebnissen doppelt so groß wie der Wert.',
      '„Wie viel Prozent“ ist eine Division: 15 ÷ 200 × 100. Geht es nicht auf, ist der gezeigte Wert gerundet.',
    ],
    [
      'Pour cent veut dire centièmes. 15 %, c’est 0,15 : multipliez la base par 0,15 et vous avez la réponse.',
      'Une remise soustrait, une taxe ou un pourboire ajoutent. Pour les mêmes 15 %, l’écart entre les deux résultats vaut le double de la valeur.',
      '« Quel pourcentage » est une division : 15 ÷ 200 × 100. Si cela ne tombe pas juste, le chiffre affiché est arrondi.',
    ],
    [
      'प्रतिशत का अर्थ है सौवाँ भाग। 15% यानी 0.15, इसलिए आधार संख्या को 0.15 से गुणा करने पर उत्तर मिलता है।',
      'छूट घटाती है, कर या टिप जोड़ते हैं। उसी 15% पर दोनों नतीजों का अंतर मान का दोगुना होता है।',
      '"कितने प्रतिशत" एक भाग है: 15 ÷ 200 × 100। ठीक न बँटे तो दिखाया गया अंक गोल किया हुआ है।',
    ],
    [
      '百分比就是百分之几。15% 即 0.15，把基数乘以 0.15 就得到答案。',
      '打折是减，税或小费是加。同样是 15%，两个结果之间的差恰好是该值的两倍。',
      '"是百分之几"是除法：15 ÷ 200 × 100。除不尽时，显示的是四舍五入后的值。',
    ],
    [
      '百分比就是百分之幾。15% 即 0.15，把基數乘以 0.15 就得到答案。',
      '折扣是減，稅或小費是加。同樣是 15%，兩個結果之間的差恰好是該值的兩倍。',
      '「是百分之幾」是除法：15 ÷ 200 × 100。除不盡時，顯示的是四捨五入後的值。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Common questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'सामान्य प्रश्न', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '퍼센트 계산 — 15%가 얼마인지, 15% 할인이면 얼마인지',
    'Percentage calculator — what X% of Y is, and what X% off leaves',
    'Calculadora de porcentajes — cuánto es el X % de Y y cuánto queda con X % de descuento',
    'Calculadora de porcentagem — quanto é X% de Y e quanto sobra com X% de desconto',
    'パーセント計算 — XのY%はいくらか、X%引きならいくらか',
    'Prozentrechner — wie viel X % von Y sind und was X % Rabatt übrig lassen',
    'Calculatrice de pourcentage — combien font X % de Y et ce que laisse X % de remise',
    'प्रतिशत कैलकुलेटर — Y का X% कितना और X% छूट पर कितना बचता है',
    '百分比计算 — Y 的 X% 是多少，打 X% 折后剩多少',
    '百分比計算 — Y 的 X% 是多少，折扣 X% 後剩多少',
  ),

  hubMetaDesc: T(
    '퍼센트 30가지와 기준수 40가지를 엮은 1,200장입니다. 값·할인·세금·비율을 한 장에서 함께 봅니다.',
    '1,200 pages pairing 30 percentages with 40 base numbers. The value, the discount, the tax and the ratio all on one page.',
    '1.200 páginas que combinan 30 porcentajes con 40 números base. El valor, el descuento, el impuesto y la proporción en una sola página.',
    '1.200 páginas que combinam 30 porcentagens com 40 números base. O valor, o desconto, o imposto e a proporção numa página só.',
    'パーセント30種と基準の数40種を組み合わせた1,200ページです。値・割引・税・比率を一つの画面で見られます。',
    '1.200 Seiten aus 30 Prozentsätzen und 40 Grundzahlen. Wert, Rabatt, Steuer und Verhältnis auf einer Seite.',
    '1 200 pages croisant 30 pourcentages et 40 nombres de base. La valeur, la remise, la taxe et le rapport sur une seule page.',
    '30 प्रतिशत और 40 आधार संख्याओं को जोड़कर बने 1,200 पन्ने। मान, छूट, कर और अनुपात एक ही पन्ने पर।',
    '由 30 种百分比与 40 个基数组成的 1,200 个页面。数值、折扣、税额与比例都在一页。',
    '由 30 種百分比與 40 個基數組成的 1,200 個頁面。數值、折扣、稅額與比例都在一頁。',
  ),

  metaTitle: T(
    f => `${n('ko')(f.base)}의 ${f.percent}% = ${n('ko')(f.value)}`,
    f => `${f.percent}% of ${n('en')(f.base)} = ${n('en')(f.value)}`,
    f => `${f.percent} % de ${n('es')(f.base)} = ${n('es')(f.value)}`,
    f => `${f.percent}% de ${n('pt')(f.base)} = ${n('pt')(f.value)}`,
    f => `${n('ja')(f.base)}の${f.percent}% = ${n('ja')(f.value)}`,
    f => `${f.percent} % von ${n('de')(f.base)} = ${n('de')(f.value)}`,
    f => `${f.percent} % de ${n('fr')(f.base)} = ${n('fr')(f.value)}`,
    f => `${n('hi')(f.base)} का ${f.percent}% = ${n('hi')(f.value)}`,
    f => `${n('zh')(f.base)} 的 ${f.percent}% = ${n('zh')(f.value)}`,
    f => `${n('tw')(f.base)} 的 ${f.percent}% = ${n('tw')(f.value)}`,
  ),

  metaDesc: T(
    f => `${n('ko')(f.base)}의 ${f.percent}%는 ${n('ko')(f.value)}입니다. ${f.percent}% 깎으면 ${n('ko')(f.decreased)}, 붙이면 ${n('ko')(f.increased)}이고, ${n('ko')(f.percent)}은 ${n('ko')(f.base)}의 ${n('ko')(f.reverseRatio)}%입니다.`,
    f => `${f.percent}% of ${n('en')(f.base)} is ${n('en')(f.value)}. Take ${f.percent}% off and you get ${n('en')(f.decreased)}; add it and you get ${n('en')(f.increased)}. And ${n('en')(f.percent)} is ${n('en')(f.reverseRatio)}% of ${n('en')(f.base)}.`,
    f => `El ${f.percent} % de ${n('es')(f.base)} es ${n('es')(f.value)}. Con el ${f.percent} % de descuento quedan ${n('es')(f.decreased)}; sumándolo, ${n('es')(f.increased)}. Y ${n('es')(f.percent)} es el ${n('es')(f.reverseRatio)} % de ${n('es')(f.base)}.`,
    f => `${f.percent}% de ${n('pt')(f.base)} é ${n('pt')(f.value)}. Tirando ${f.percent}% sobram ${n('pt')(f.decreased)}; somando, ${n('pt')(f.increased)}. E ${n('pt')(f.percent)} é ${n('pt')(f.reverseRatio)}% de ${n('pt')(f.base)}.`,
    f => `${n('ja')(f.base)}の${f.percent}%は${n('ja')(f.value)}です。${f.percent}%引くと${n('ja')(f.decreased)}、足すと${n('ja')(f.increased)}。${n('ja')(f.percent)}は${n('ja')(f.base)}の${n('ja')(f.reverseRatio)}%です。`,
    f => `${f.percent} % von ${n('de')(f.base)} sind ${n('de')(f.value)}. Mit ${f.percent} % Rabatt bleiben ${n('de')(f.decreased)}, mit Aufschlag ${n('de')(f.increased)}. Und ${n('de')(f.percent)} sind ${n('de')(f.reverseRatio)} % von ${n('de')(f.base)}.`,
    f => `${f.percent} % de ${n('fr')(f.base)} font ${n('fr')(f.value)}. Avec ${f.percent} % de remise il reste ${n('fr')(f.decreased)} ; avec majoration ${n('fr')(f.increased)}. Et ${n('fr')(f.percent)} représente ${n('fr')(f.reverseRatio)} % de ${n('fr')(f.base)}.`,
    f => `${n('hi')(f.base)} का ${f.percent}% ${n('hi')(f.value)} है। ${f.percent}% घटाने पर ${n('hi')(f.decreased)}, जोड़ने पर ${n('hi')(f.increased)}। और ${n('hi')(f.percent)}, ${n('hi')(f.base)} का ${n('hi')(f.reverseRatio)}% है।`,
    f => `${n('zh')(f.base)} 的 ${f.percent}% 是 ${n('zh')(f.value)}。减去 ${f.percent}% 剩 ${n('zh')(f.decreased)}，加上则是 ${n('zh')(f.increased)}。而 ${n('zh')(f.percent)} 是 ${n('zh')(f.base)} 的 ${n('zh')(f.reverseRatio)}%。`,
    f => `${n('tw')(f.base)} 的 ${f.percent}% 是 ${n('tw')(f.value)}。減去 ${f.percent}% 剩 ${n('tw')(f.decreased)}，加上則是 ${n('tw')(f.increased)}。而 ${n('tw')(f.percent)} 是 ${n('tw')(f.base)} 的 ${n('tw')(f.reverseRatio)}%。`,
  ),

  hubFaq: T(
    [
      { q: '퍼센트는 어떻게 계산하나요?', a: '기준수에 퍼센트를 100으로 나눈 값을 곱합니다. 200의 15%라면 200 × 0.15 = 30입니다.' },
      { q: '15% 할인이면 얼마를 내나요?', a: '깎이는 금액이 아니라 남는 금액을 냅니다. 200에서 15%를 깎으면 30이 빠져 170을 냅니다.' },
      { q: '30은 200의 몇 퍼센트인가요?', a: '30 ÷ 200 × 100 = 15%입니다. 나눗셈이 딱 떨어지지 않으면 소수 넷째 자리에서 끊습니다.' },
      { q: '20% 올렸다가 20% 내리면 원래대로 돌아오나요?', a: '안 돌아옵니다. 올릴 때와 내릴 때의 기준이 달라서, 100 → 120 → 96이 됩니다.' },
    ],
    [
      { q: 'How do you work out a percentage?', a: 'Multiply the base by the percentage divided by 100. For 15% of 200: 200 × 0.15 = 30.' },
      { q: 'What do I pay with 15% off?', a: 'You pay what is left, not what comes off. 15% of 200 is 30, so you pay 170.' },
      { q: 'What percent is 30 of 200?', a: '30 ÷ 200 × 100 = 15%. When the division does not come out even, the figure is cut at four decimal places.' },
      { q: 'Does a 20% rise then a 20% fall get you back?', a: 'No. The two are taken from different bases: 100 → 120 → 96.' },
    ],
    [
      { q: '¿Cómo se calcula un porcentaje?', a: 'Se multiplica la base por el porcentaje dividido entre 100. El 15 % de 200: 200 × 0,15 = 30.' },
      { q: '¿Cuánto pago con un 15 % de descuento?', a: 'Se paga lo que queda, no lo que se quita. El 15 % de 200 es 30, así que pagas 170.' },
      { q: '¿Qué porcentaje es 30 de 200?', a: '30 ÷ 200 × 100 = 15 %. Si la división no da exacta, la cifra se corta en el cuarto decimal.' },
      { q: '¿Subir un 20 % y bajar un 20 % deja igual?', a: 'No. Las dos se toman sobre bases distintas: 100 → 120 → 96.' },
    ],
    [
      { q: 'Como se calcula uma porcentagem?', a: 'Multiplica-se a base pela porcentagem dividida por 100. 15% de 200: 200 × 0,15 = 30.' },
      { q: 'Quanto pago com 15% de desconto?', a: 'Paga-se o que sobra, não o que sai. 15% de 200 é 30, então você paga 170.' },
      { q: 'Que porcentagem 30 é de 200?', a: '30 ÷ 200 × 100 = 15%. Quando a divisão não dá exata, o número é cortado na quarta casa decimal.' },
      { q: 'Subir 20% e depois cair 20% volta ao mesmo?', a: 'Não. As duas partem de bases diferentes: 100 → 120 → 96.' },
    ],
    [
      { q: 'パーセントはどう計算しますか？', a: '基準の数に、パーセントを100で割った値を掛けます。200の15%なら 200 × 0.15 = 30 です。' },
      { q: '15%引きならいくら払いますか？', a: '引かれる額ではなく残る額を払います。200の15%は30なので、170を払います。' },
      { q: '30は200の何パーセントですか？', a: '30 ÷ 200 × 100 = 15% です。割り切れないときは小数第4位で切ります。' },
      { q: '20%上げて20%下げると元に戻りますか？', a: '戻りません。上げるときと下げるときで基準が違うため、100 → 120 → 96 になります。' },
    ],
    [
      { q: 'Wie rechnet man Prozent aus?', a: 'Grundzahl mal Prozentsatz geteilt durch 100. Für 15 % von 200: 200 × 0,15 = 30.' },
      { q: 'Was zahle ich bei 15 % Rabatt?', a: 'Man zahlt den Rest, nicht den Abzug. 15 % von 200 sind 30, also zahlt man 170.' },
      { q: 'Wie viel Prozent sind 30 von 200?', a: '30 ÷ 200 × 100 = 15 %. Geht die Division nicht auf, wird bei vier Nachkommastellen abgeschnitten.' },
      { q: 'Bringt 20 % rauf und 20 % runter denselben Wert?', a: 'Nein. Beide gehen von verschiedenen Grundzahlen aus: 100 → 120 → 96.' },
    ],
    [
      { q: 'Comment calculer un pourcentage ?', a: 'On multiplie la base par le pourcentage divisé par 100. Pour 15 % de 200 : 200 × 0,15 = 30.' },
      { q: 'Combien je paie avec 15 % de remise ?', a: 'On paie ce qui reste, pas ce qui part. 15 % de 200 font 30, donc on paie 170.' },
      { q: 'Quel pourcentage 30 représente-t-il de 200 ?', a: '30 ÷ 200 × 100 = 15 %. Si la division ne tombe pas juste, le chiffre est coupé à la quatrième décimale.' },
      { q: 'Une hausse de 20 % puis une baisse de 20 % ramènent-elles au départ ?', a: 'Non. Les deux portent sur des bases différentes : 100 → 120 → 96.' },
    ],
    [
      { q: 'प्रतिशत कैसे निकालते हैं?', a: 'आधार संख्या को प्रतिशत ÷ 100 से गुणा करें। 200 का 15%: 200 × 0.15 = 30।' },
      { q: '15% छूट पर कितना देना होगा?', a: 'जो घटता है वह नहीं, जो बचता है वह देते हैं। 200 का 15% यानी 30, तो 170 देना होगा।' },
      { q: '30, 200 का कितने प्रतिशत है?', a: '30 ÷ 200 × 100 = 15%। ठीक न बँटे तो चौथे दशमलव पर काट दिया जाता है।' },
      { q: '20% बढ़ाकर 20% घटाने पर वही आता है?', a: 'नहीं। दोनों का आधार अलग होता है: 100 → 120 → 96।' },
    ],
    [
      { q: '百分比怎么算？', a: '把基数乘以百分比除以 100。200 的 15%：200 × 0.15 = 30。' },
      { q: '打 15% 的折扣要付多少？', a: '付的是剩下的，不是减掉的。200 的 15% 是 30，所以付 170。' },
      { q: '30 是 200 的百分之几？', a: '30 ÷ 200 × 100 = 15%。除不尽时在小数第四位截断。' },
      { q: '先涨 20% 再降 20% 会回到原点吗？', a: '不会。两次的基数不同：100 → 120 → 96。' },
    ],
    [
      { q: '百分比怎麼算？', a: '把基數乘以百分比除以 100。200 的 15%：200 × 0.15 = 30。' },
      { q: '折扣 15% 要付多少？', a: '付的是剩下的，不是減掉的。200 的 15% 是 30，所以付 170。' },
      { q: '30 是 200 的百分之幾？', a: '30 ÷ 200 × 100 = 15%。除不盡時在小數第四位截斷。' },
      { q: '先漲 20% 再降 20% 會回到原點嗎？', a: '不會。兩次的基數不同：100 → 120 → 96。' },
    ],
  ),

  itemFaq: T(
    f => [
      { q: `${n('ko')(f.base)}의 ${f.percent}%는 얼마인가요?`, a: `${n('ko')(f.value)}입니다. ${n('ko')(f.base)} × ${n('ko')(f.fraction)}으로 나온 값입니다.` },
      { q: `${n('ko')(f.base)}에서 ${f.percent}%를 깎으면 얼마인가요?`, a: `${n('ko')(f.decreased)}입니다. ${n('ko')(f.value)}이 빠집니다.` },
      { q: `${n('ko')(f.base)}에 ${f.percent}%를 붙이면 얼마인가요?`, a: `${n('ko')(f.increased)}입니다. 세금이나 팁을 얹을 때의 값입니다.` },
      { q: `${n('ko')(f.value)}이 ${f.percent}%라면 원래 수는 얼마인가요?`, a: `${n('ko')(f.wholeFromValue)}입니다.` },
    ],
    f => [
      { q: `What is ${f.percent}% of ${n('en')(f.base)}?`, a: `${n('en')(f.value)}. That is ${n('en')(f.base)} × ${n('en')(f.fraction)}.` },
      { q: `What is ${n('en')(f.base)} minus ${f.percent}%?`, a: `${n('en')(f.decreased)} — you take off ${n('en')(f.value)}.` },
      { q: `What is ${n('en')(f.base)} plus ${f.percent}%?`, a: `${n('en')(f.increased)}, the figure with tax or a tip on top.` },
      { q: `If ${n('en')(f.value)} is ${f.percent}%, what is the whole?`, a: `${n('en')(f.wholeFromValue)}.` },
    ],
    f => [
      { q: `¿Cuánto es el ${f.percent} % de ${n('es')(f.base)}?`, a: `${n('es')(f.value)}. Es ${n('es')(f.base)} × ${n('es')(f.fraction)}.` },
      { q: `¿Cuánto es ${n('es')(f.base)} menos el ${f.percent} %?`, a: `${n('es')(f.decreased)}: se quitan ${n('es')(f.value)}.` },
      { q: `¿Cuánto es ${n('es')(f.base)} más el ${f.percent} %?`, a: `${n('es')(f.increased)}, la cifra con impuesto o propina.` },
      { q: `Si ${n('es')(f.value)} es el ${f.percent} %, ¿cuál es el total?`, a: `${n('es')(f.wholeFromValue)}.` },
    ],
    f => [
      { q: `Quanto é ${f.percent}% de ${n('pt')(f.base)}?`, a: `${n('pt')(f.value)}. É ${n('pt')(f.base)} × ${n('pt')(f.fraction)}.` },
      { q: `Quanto é ${n('pt')(f.base)} menos ${f.percent}%?`, a: `${n('pt')(f.decreased)} — saem ${n('pt')(f.value)}.` },
      { q: `Quanto é ${n('pt')(f.base)} mais ${f.percent}%?`, a: `${n('pt')(f.increased)}, o valor com imposto ou gorjeta.` },
      { q: `Se ${n('pt')(f.value)} é ${f.percent}%, qual é o total?`, a: `${n('pt')(f.wholeFromValue)}.` },
    ],
    f => [
      { q: `${n('ja')(f.base)}の${f.percent}%はいくらですか？`, a: `${n('ja')(f.value)}です。${n('ja')(f.base)} × ${n('ja')(f.fraction)}で出ます。` },
      { q: `${n('ja')(f.base)}から${f.percent}%引くといくらですか？`, a: `${n('ja')(f.decreased)}です。${n('ja')(f.value)}が引かれます。` },
      { q: `${n('ja')(f.base)}に${f.percent}%足すといくらですか？`, a: `${n('ja')(f.increased)}です。税やチップを乗せたときの値です。` },
      { q: `${n('ja')(f.value)}が${f.percent}%なら、もとの数は？`, a: `${n('ja')(f.wholeFromValue)}です。` },
    ],
    f => [
      { q: `Wie viel sind ${f.percent} % von ${n('de')(f.base)}?`, a: `${n('de')(f.value)} — also ${n('de')(f.base)} × ${n('de')(f.fraction)}.` },
      { q: `Wie viel ist ${n('de')(f.base)} minus ${f.percent} %?`, a: `${n('de')(f.decreased)}; abgezogen werden ${n('de')(f.value)}.` },
      { q: `Wie viel ist ${n('de')(f.base)} plus ${f.percent} %?`, a: `${n('de')(f.increased)}, der Betrag mit Steuer oder Trinkgeld.` },
      { q: `Wenn ${n('de')(f.value)} die ${f.percent} % sind — wie groß ist das Ganze?`, a: `${n('de')(f.wholeFromValue)}.` },
    ],
    f => [
      { q: `Combien font ${f.percent} % de ${n('fr')(f.base)} ?`, a: `${n('fr')(f.value)}, soit ${n('fr')(f.base)} × ${n('fr')(f.fraction)}.` },
      { q: `Combien fait ${n('fr')(f.base)} moins ${f.percent} % ?`, a: `${n('fr')(f.decreased)} : on retire ${n('fr')(f.value)}.` },
      { q: `Combien fait ${n('fr')(f.base)} plus ${f.percent} % ?`, a: `${n('fr')(f.increased)}, le montant avec taxe ou pourboire.` },
      { q: `Si ${n('fr')(f.value)} représente ${f.percent} %, quel est le total ?`, a: `${n('fr')(f.wholeFromValue)}.` },
    ],
    f => [
      { q: `${n('hi')(f.base)} का ${f.percent}% कितना है?`, a: `${n('hi')(f.value)}। यह ${n('hi')(f.base)} × ${n('hi')(f.fraction)} है।` },
      { q: `${n('hi')(f.base)} में से ${f.percent}% घटाने पर?`, a: `${n('hi')(f.decreased)} — ${n('hi')(f.value)} घटता है।` },
      { q: `${n('hi')(f.base)} में ${f.percent}% जोड़ने पर?`, a: `${n('hi')(f.increased)}, कर या टिप जोड़ने पर यही बनता है।` },
      { q: `अगर ${n('hi')(f.value)} ही ${f.percent}% है, तो पूरा कितना?`, a: `${n('hi')(f.wholeFromValue)}।` },
    ],
    f => [
      { q: `${n('zh')(f.base)} 的 ${f.percent}% 是多少？`, a: `${n('zh')(f.value)}，即 ${n('zh')(f.base)} × ${n('zh')(f.fraction)}。` },
      { q: `${n('zh')(f.base)} 减去 ${f.percent}% 是多少？`, a: `${n('zh')(f.decreased)}，减掉了 ${n('zh')(f.value)}。` },
      { q: `${n('zh')(f.base)} 加上 ${f.percent}% 是多少？`, a: `${n('zh')(f.increased)}，加税或小费后的数。` },
      { q: `若 ${n('zh')(f.value)} 就是 ${f.percent}%，原数是多少？`, a: `${n('zh')(f.wholeFromValue)}。` },
    ],
    f => [
      { q: `${n('tw')(f.base)} 的 ${f.percent}% 是多少？`, a: `${n('tw')(f.value)}，即 ${n('tw')(f.base)} × ${n('tw')(f.fraction)}。` },
      { q: `${n('tw')(f.base)} 減去 ${f.percent}% 是多少？`, a: `${n('tw')(f.decreased)}，減掉了 ${n('tw')(f.value)}。` },
      { q: `${n('tw')(f.base)} 加上 ${f.percent}% 是多少？`, a: `${n('tw')(f.increased)}，加稅或小費後的數。` },
      { q: `若 ${n('tw')(f.value)} 就是 ${f.percent}%，原數是多少？`, a: `${n('tw')(f.wholeFromValue)}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const PERCENT_UI: L<PercentUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<PercentUI>;
