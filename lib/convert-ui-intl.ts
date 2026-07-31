// node에서 직접 로드할 수 있게 확장자를 명시한다 (allowImportingTsExtensions)
import {
  ALL_LOCALES10, alternateLanguages, localeHref, localeTag, openGraphFor,
  type AnyLocale10,
} from './locales.ts';
import { CONVERT_MAP } from './convert-tools.ts';
import { convertL10n } from './convert-i18n.ts';

/**
 * 단위 변환 화면의 여덟 언어 문구.
 *
 * lib/time-ui-intl.ts와 같은 방식이다 — 컴포넌트는 lang을 받아 사전에서 문구를
 * 꺼내 쓰고, 계산 로직은 언어와 무관하게 하나만 둔다.
 *
 * FAQ 문장은 단위 이름을 끼워 넣는 함수다. 언어마다 어순이 다르므로 문장 틀을
 * 그대로 옮기지 않고 그 언어에서 자연스러운 순서로 다시 쓴다.
 */
export type ConvertLang = AnyLocale10;

export const CONVERT_UI = {
  ko: {
    langLabel: '한국어',
    section: '단위 변환',
    home: '홈',
    quickTitle: '자주 찾는 값',
    formula: '계산식',
    copy: (l: string, f: string, r: string, t: string) => `${l}${f} = ${r}${t} 복사`,
    copied: '✅ 복사했습니다',
    related: '다른 단위 변환',
    hubTitle: '단위 변환',
    hubLead: '평·근·돈처럼 아직 쓰는 우리 단위부터 인치·파운드까지',
    hubNotice: '🔢 양방향으로 계산됩니다. 어느 칸에 넣어도 반대쪽이 바뀝니다.',
    footNote: '전통 단위(근·되·마지기 등)는 지역과 품목에 따라 값이 다를 수 있습니다.',
    suffix: '변환',
    faq1: (f: string, t: string) => `1${f}는 몇 ${t}인가요?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1${f}는 ${one}${t}입니다. 10${f}는 ${ten}${t}이고, 위 입력칸에 원하는 값을 넣으면 바로 계산됩니다.`,
    faq2: (f: string, t: string) => `반대로 1${t}는 몇 ${f}인가요?`,
    faq2a: (f: string, t: string, one: string) =>
      `1${t}는 ${one}${f}입니다. 이 페이지는 양방향이라 오른쪽 칸에 값을 넣으면 왼쪽이 자동으로 바뀝니다.`,
    faq3: '이 단위는 어디에 쓰나요?',
  },
  en: {
    langLabel: 'English',
    section: 'Unit Converter',
    home: 'Home',
    quickTitle: 'Common values',
    formula: 'Formula',
    copy: (l: string, f: string, r: string, t: string) => `Copy ${l} ${f} = ${r} ${t}`,
    copied: '✅ Copied',
    related: 'Other converters',
    hubTitle: 'Unit Converter',
    hubLead: 'From inches and pounds to Korean units like pyeong and geun',
    hubNotice: '🔢 Works both ways — type in either box and the other updates.',
    footNote: 'Traditional units (geun, doe, majigi and so on) vary by region and product.',
    suffix: 'Converter',
    faq1: (f: string, t: string) => `How many ${t} is 1 ${f}?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} is ${one} ${t}, and 10 ${f} is ${ten} ${t}. Type any value in the box above to convert instantly.`,
    faq2: (f: string, t: string) => `And how many ${f} is 1 ${t}?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} is ${one} ${f}. This converter works both ways, so typing in the right box updates the left one.`,
    faq3: 'Where is this unit used?',
  },
  es: {
    langLabel: 'Español',
    section: 'Conversor de unidades',
    home: 'Inicio',
    quickTitle: 'Valores habituales',
    formula: 'Fórmula',
    copy: (l: string, f: string, r: string, t: string) => `Copiar ${l} ${f} = ${r} ${t}`,
    copied: '✅ Copiado',
    related: 'Otros conversores',
    hubTitle: 'Conversor de unidades',
    hubLead: 'De pulgadas y libras a unidades coreanas como el pyeong y el geun',
    hubNotice: '🔢 Funciona en los dos sentidos — escribe en cualquiera de las casillas y la otra se actualiza.',
    footNote: 'Las unidades tradicionales (geun, doe, majigi y demás) varían según la región y el producto.',
    suffix: 'Conversor',
    faq1: (f: string, t: string) => `¿Cuántos ${t} son 1 ${f}?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} son ${one} ${t}, y 10 ${f} son ${ten} ${t}. Escribe cualquier valor en la casilla de arriba y se convierte al instante.`,
    faq2: (f: string, t: string) => `¿Y cuántos ${f} es 1 ${t}?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} son ${one} ${f}. Este conversor funciona en los dos sentidos, así que si escribes en la casilla derecha se actualiza la izquierda.`,
    faq3: '¿Dónde se usa esta unidad?',
  },
  'pt-br': {
    langLabel: 'Português',
    section: 'Conversor de unidades',
    home: 'Início',
    quickTitle: 'Valores comuns',
    formula: 'Fórmula',
    copy: (l: string, f: string, r: string, t: string) => `Copiar ${l} ${f} = ${r} ${t}`,
    copied: '✅ Copiado',
    related: 'Outros conversores',
    hubTitle: 'Conversor de unidades',
    hubLead: 'De polegadas e libras a unidades coreanas como pyeong e geun',
    hubNotice: '🔢 Funciona nos dois sentidos — digite em qualquer campo e o outro se atualiza.',
    footNote: 'As unidades tradicionais (geun, doe, majigi e outras) variam conforme a região e o produto.',
    suffix: 'Conversor',
    faq1: (f: string, t: string) => `Quantos ${t} são 1 ${f}?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} são ${one} ${t}, e 10 ${f} são ${ten} ${t}. Digite qualquer valor no campo acima e a conversão sai na hora.`,
    faq2: (f: string, t: string) => `E quantos ${f} é 1 ${t}?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} são ${one} ${f}. Este conversor funciona nos dois sentidos, então digitar no campo da direita atualiza o da esquerda.`,
    faq3: 'Onde esta unidade é usada?',
  },
  ja: {
    langLabel: '日本語',
    section: '単位変換',
    home: 'ホーム',
    quickTitle: 'よく調べる値',
    formula: '計算式',
    copy: (l: string, f: string, r: string, t: string) => `${l}${f} = ${r}${t} をコピー`,
    copied: '✅ コピーしました',
    related: 'ほかの単位変換',
    hubTitle: '単位変換',
    hubLead: 'インチ・ポンドから、尺・寸・匁のような日本の単位まで',
    hubNotice: '🔢 双方向に計算します。どちらの欄に入れても反対側が変わります。',
    footNote: '伝統的な単位（斤・升・匁など）は地域や品目によって値が違うことがあります。',
    suffix: '変換',
    faq1: (f: string, t: string) => `1${f}は何${t}ですか？`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1${f}は${one}${t}です。10${f}なら${ten}${t}で、上の入力欄に好きな値を入れればすぐ計算されます。`,
    faq2: (f: string, t: string) => `逆に1${t}は何${f}ですか？`,
    faq2a: (f: string, t: string, one: string) =>
      `1${t}は${one}${f}です。このページは双方向なので、右の欄に入れると左が自動で変わります。`,
    faq3: 'この単位はどこで使われますか？',
  },
  de: {
    langLabel: 'Deutsch',
    section: 'Einheitenrechner',
    home: 'Start',
    quickTitle: 'Häufige Werte',
    formula: 'Formel',
    copy: (l: string, f: string, r: string, t: string) => `${l} ${f} = ${r} ${t} kopieren`,
    copied: '✅ Kopiert',
    related: 'Weitere Umrechner',
    hubTitle: 'Einheitenrechner',
    hubLead: 'Von Zoll und Pfund bis zu koreanischen Einheiten wie Pyeong und Geun',
    hubNotice: '🔢 Funktioniert in beide Richtungen — tipp in ein Feld und das andere folgt.',
    footNote: 'Traditionelle Einheiten (Geun, Doe, Majigi und ähnliche) unterscheiden sich je Region und Ware.',
    suffix: 'Umrechner',
    faq1: (f: string, t: string) => `Wie viele ${t} sind 1 ${f}?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} sind ${one} ${t}, und 10 ${f} sind ${ten} ${t}. Tipp einen beliebigen Wert oben ein und es rechnet sofort.`,
    faq2: (f: string, t: string) => `Und wie viele ${f} ist 1 ${t}?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} sind ${one} ${f}. Der Rechner läuft in beide Richtungen — tippst du rechts, ändert sich links.`,
    faq3: 'Wo wird diese Einheit benutzt?',
  },
  fr: {
    langLabel: 'Français',
    section: 'Convertisseur d’unités',
    home: 'Accueil',
    quickTitle: 'Valeurs courantes',
    formula: 'Formule',
    copy: (l: string, f: string, r: string, t: string) => `Copier ${l} ${f} = ${r} ${t}`,
    copied: '✅ Copié',
    related: 'Autres convertisseurs',
    hubTitle: 'Convertisseur d’unités',
    hubLead: 'Des pouces et des livres aux unités coréennes comme le pyeong et le geun',
    hubNotice: '🔢 Fonctionne dans les deux sens — tape dans une case et l’autre suit.',
    footNote: 'Les unités traditionnelles (geun, doe, majigi et autres) varient selon la région et le produit.',
    suffix: 'Convertisseur',
    faq1: (f: string, t: string) => `Combien de ${t} font 1 ${f} ?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} fait ${one} ${t}, et 10 ${f} font ${ten} ${t}. Tape n’importe quelle valeur dans la case ci-dessus et la conversion est immédiate.`,
    faq2: (f: string, t: string) => `Et combien de ${f} fait 1 ${t} ?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} fait ${one} ${f}. Le convertisseur marche dans les deux sens : si tu tapes à droite, la gauche se met à jour.`,
    faq3: 'Où cette unité est-elle utilisée ?',
  },
  hi: {
    langLabel: 'हिन्दी',
    section: 'इकाई कनवर्टर',
    home: 'होम',
    quickTitle: 'आम मान',
    formula: 'सूत्र',
    copy: (l: string, f: string, r: string, t: string) => `${l} ${f} = ${r} ${t} कॉपी करें`,
    copied: '✅ कॉपी हो गया',
    related: 'अन्य कनवर्टर',
    hubTitle: 'इकाई कनवर्टर',
    hubLead: 'इंच और पाउंड से लेकर प्योंग और गुन जैसी कोरियाई इकाइयों तक',
    hubNotice: '🔢 दोनों दिशाओं में चलता है — किसी भी खाने में लिखें, दूसरा अपने आप बदल जाएगा।',
    footNote: 'पारंपरिक इकाइयाँ (गुन, दोए, माजिगी आदि) क्षेत्र और वस्तु के हिसाब से बदलती हैं।',
    suffix: 'कनवर्टर',
    faq1: (f: string, t: string) => `1 ${f} में कितने ${t} होते हैं?`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1 ${f} = ${one} ${t}, और 10 ${f} = ${ten} ${t}। ऊपर के खाने में कोई भी मान लिखें, गणना तुरंत हो जाती है।`,
    faq2: (f: string, t: string) => `उलटा — 1 ${t} में कितने ${f} होते हैं?`,
    faq2a: (f: string, t: string, one: string) =>
      `1 ${t} = ${one} ${f}। यह पन्ना दोनों दिशाओं में चलता है, इसलिए दाएँ खाने में लिखने पर बायाँ अपने आप बदल जाता है।`,
    faq3: 'यह इकाई कहाँ इस्तेमाल होती है?',
  },
  'zh-hans': {
    langLabel: '简体中文',
    section: '单位换算',
    home: '首页',
    quickTitle: '常用数值',
    formula: '算式',
    copy: (l: string, f: string, r: string, t: string) => `复制 ${l}${f} = ${r}${t}`,
    copied: '✅ 已复制',
    related: '其他单位换算',
    hubTitle: '单位换算',
    hubLead: '从英寸、磅，到市斤、市尺、亩这些还在用的传统单位',
    hubNotice: '🔢 双向计算。填哪一边，另一边都会跟着变。',
    footNote: '传统单位（斤·되·마지기等）会因国家、地区和品项而取值不同。',
    suffix: '换算',
    faq1: (f: string, t: string) => `1${f}是多少${t}？`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1${f}是${one}${t}。10${f}是${ten}${t}，在上面的框里填任何值都会立刻算出来。`,
    faq2: (f: string, t: string) => `反过来，1${t}是多少${f}？`,
    faq2a: (f: string, t: string, one: string) =>
      `1${t}是${one}${f}。这一页是双向的，在右边框里填值，左边会自动跟着变。`,
    faq3: '这个单位用在哪里？',
  },
  'zh-hant': {
    langLabel: '繁體中文',
    section: '單位換算',
    home: '首頁',
    quickTitle: '常用數值',
    formula: '算式',
    copy: (l: string, f: string, r: string, t: string) => `複製 ${l}${f} = ${r}${t}`,
    copied: '✅ 已複製',
    related: '其他單位換算',
    hubTitle: '單位換算',
    hubLead: '從英吋、磅，到坪、台斤、市尺這些還在用的傳統單位',
    hubNotice: '🔢 雙向計算。填哪一邊，另一邊都會跟著變。',
    footNote: '傳統單位（斤·되·마지기等）會因國家、地區和品項而取值不同。',
    suffix: '換算',
    faq1: (f: string, t: string) => `1${f}是多少${t}？`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1${f}是${one}${t}。10${f}是${ten}${t}，在上面的框裡填任何值都會立刻算出來。`,
    faq2: (f: string, t: string) => `反過來，1${t}是多少${f}？`,
    faq2a: (f: string, t: string, one: string) =>
      `1${t}是${one}${f}。這一頁是雙向的，在右邊框裡填值，左邊會自動跟著變。`,
    faq3: '這個單位用在哪裡？',
  },
} as const;

/**
 * 언어 전환 링크 — 어느 언어에서든 나머지 아홉으로 갈 수 있게.
 *
 * tag를 따로 담는다. hreflang은 BCP 47 표기여서 경로(/pt-br)와 다르다(pt-BR).
 * 경로를 그대로 hreflang에 넣으면 브라질 대상 선언이 조용히 무효가 된다.
 */
export const LANG_LINKS: { lang: ConvertLang; tag: string; label: string; prefix: string }[] =
  ALL_LOCALES10.map(l => ({
    lang: l,
    tag: localeTag(l),
    label: CONVERT_UI[l].langLabel,
    prefix: localeHref(l, '/') === '/' ? '' : localeHref(l, '/'),
  }));

/**
 * 허브 FAQ.
 *
 * 도구 페이지 FAQ는 계수에서 만들지만(lib/convert-faq.ts) 허브는 "어느 칸에
 * 넣나요"처럼 사이트 사용법을 묻는 문항이라 손으로 쓴다. 한국어는
 * lib/section-faq.ts에 이미 있어서 여기에는 나머지 아홉만 둔다.
 */
export const CONVERT_HUB_FAQ: Record<Exclude<AnyLocale10, 'ko'>, { q: string; a: string }[]> = {
  en: [
    { q: 'Which box do I type in?', a: 'Either one. Typing on the left updates the right, and typing on the right updates the left, so it works whichever direction you came from.' },
    { q: 'Why do Korean traditional units differ from what I know?', a: 'Units like geun, doe and majigi vary by region and product — a geun of meat is 600 g but a geun of vegetables is 375 g. Each page notes where the value splits.' },
    { q: 'Are these numbers exact?', a: 'Defined values such as 1 inch = 2.54 cm are exact. Values that depend on conditions, like Mach or traditional units, list the assumption on the page.' },
    { q: 'Why does my drive show less capacity?', a: 'This site uses 1 GB = 1,024 MB (binary). Drive makers count 1 GB as 1,000 MB, which is why a 1 TB SSD appears as 931 GB.' },
  ],
  es: [
    { q: '¿En qué casilla escribo?', a: 'En cualquiera. Si escribes en la izquierda se actualiza la derecha, y al contrario, así que funciona en el sentido que necesites.' },
    { q: '¿Por qué el galón no me cuadra?', a: 'El galón estadounidense mide 3,785 L y el imperial británico 4,546 L: un 20 % de diferencia. Estas páginas usan el estadounidense y lo dicen en la nota.' },
    { q: '¿Los números son exactos?', a: 'Los valores definidos, como 1 pulgada = 2,54 cm, son exactos. Los que dependen de las condiciones, como el Mach o las unidades tradicionales, llevan el supuesto escrito en la página.' },
    { q: '¿Por qué mi disco muestra menos capacidad?', a: 'Este sitio usa 1 GB = 1.024 MB (binario). Los fabricantes cuentan 1 GB como 1.000 MB, y por eso un SSD de 1 TB aparece como 931 GB.' },
  ],
  'pt-br': [
    { q: 'Em qual campo eu digito?', a: 'Em qualquer um. Digitar à esquerda atualiza a direita, e digitar à direita atualiza a esquerda, então funciona no sentido que você precisar.' },
    { q: 'Por que o galão não fecha com a minha conta?', a: 'O galão americano tem 3,785 L e o imperial britânico 4,546 L — 20 % de diferença. Estas páginas usam o americano e dizem isso na nota.' },
    { q: 'Os números são exatos?', a: 'Valores definidos, como 1 polegada = 2,54 cm, são exatos. Os que dependem das condições, como Mach e as unidades tradicionais, trazem a premissa escrita na página.' },
    { q: 'Por que meu disco mostra menos espaço?', a: 'Este site usa 1 GB = 1.024 MB (binário). Os fabricantes contam 1 GB como 1.000 MB, e é por isso que um SSD de 1 TB aparece como 931 GB.' },
  ],
  ja: [
    { q: 'どちらの欄に入れますか？', a: 'どちらでも構いません。左に入れれば右が、右に入れれば左が変わるので、来た向きのまま使えます。' },
    { q: '尺・寸・匁と韓国の単位はどう違いますか？', a: '尺と寸は日本と韓国でほぼ同じ（約30.3cm・3.03cm）ですが、中国の尺は33.3cmです。斤は中国が500g、韓国のクンは肉なら600g。同じ字でも値が違うので、各ページの注意書きに書いてあります。' },
    { q: '数値は正確ですか？', a: '1インチ=2.54cmのように定義された値は厳密です。マッハや伝統的な単位のように条件で変わるものは、前提をページに書いています。' },
    { q: 'ドライブの容量が表示より少ないのはなぜ？', a: 'このサイトは1GB=1,024MB（2進）で計算します。メーカーは1GB=1,000MBで数えるため、1TBのSSDが931GBと表示されます。' },
  ],
  de: [
    { q: 'In welches Feld tippe ich?', a: 'In beide. Tippst du links, ändert sich rechts, und umgekehrt — es funktioniert in der Richtung, aus der du kommst.' },
    { q: 'Warum passt die Gallone nicht zu meiner Rechnung?', a: 'Die US-Gallone hat 3,785 L, die britische imperiale 4,546 L — 20 % Unterschied. Diese Seiten rechnen mit der US-Gallone und sagen das im Hinweis.' },
    { q: 'Sind die Zahlen exakt?', a: 'Festgelegte Werte wie 1 Zoll = 2,54 cm sind exakt. Was von Bedingungen abhängt, etwa Mach oder traditionelle Einheiten, nennt seine Annahme auf der Seite.' },
    { q: 'Warum zeigt meine Platte weniger Kapazität?', a: 'Diese Seite rechnet mit 1 GB = 1.024 MB (binär). Hersteller zählen 1 GB als 1.000 MB, deshalb erscheint eine 1-TB-SSD als 931 GB.' },
  ],
  fr: [
    { q: 'Dans quelle case faut-il taper ?', a: 'Dans l’une ou l’autre. Si tu tapes à gauche, la droite se met à jour, et inversement — ça marche dans le sens où tu arrives.' },
    { q: 'Pourquoi le gallon ne colle pas avec mon calcul ?', a: 'Le gallon américain fait 3,785 L et le gallon impérial britannique 4,546 L, soit 20 % d’écart. Ces pages utilisent l’américain et le précisent dans la note.' },
    { q: 'Les chiffres sont-ils exacts ?', a: 'Les valeurs définies, comme 1 pouce = 2,54 cm, sont exactes. Celles qui dépendent des conditions, comme le Mach ou les unités traditionnelles, indiquent leur hypothèse sur la page.' },
    { q: 'Pourquoi mon disque affiche moins de capacité ?', a: 'Ce site compte 1 Go = 1 024 Mo (binaire). Les fabricants comptent 1 Go = 1 000 Mo, d’où un SSD de 1 To affiché à 931 Go.' },
  ],
  hi: [
    { q: 'किस खाने में लिखना है?', a: 'किसी में भी। बाएँ लिखने पर दायाँ बदलता है और दाएँ लिखने पर बायाँ, इसलिए जिस दिशा से आए हैं उसी में काम चल जाता है।' },
    { q: 'गैलन मेरे हिसाब से मेल नहीं खाता, क्यों?', a: 'अमेरिकी गैलन 3.785 L का है और ब्रिटिश इंपीरियल 4.546 L का — 20% का अंतर। ये पन्ने अमेरिकी गैलन लेते हैं और नोट में यह लिखा रहता है।' },
    { q: 'ये अंक कितने सटीक हैं?', a: '1 इंच = 2.54 सेमी जैसे तय मान बिलकुल सटीक हैं। जो हालात पर निर्भर हैं — मैक या पारंपरिक इकाइयाँ — उनकी शर्त पन्ने पर लिखी है।' },
    { q: 'मेरी डिस्क कम क्षमता क्यों दिखाती है?', a: 'यह साइट 1 GB = 1,024 MB (द्विआधारी) लेती है। बनाने वाली कंपनियाँ 1 GB को 1,000 MB गिनती हैं, इसलिए 1 TB का SSD 931 GB दिखता है।' },
  ],
'zh-hans': [
    { q: '该填在哪个框里？', a: '哪个都行。填左边右边就变，填右边左边就变，所以从哪个方向来都能直接用。' },
    { q: '加仑怎么和我算的对不上？', a: '美制加仑是3.785 L，英制加仑是4.546 L，差了两成。这些页面用的是美制加仑，注意事项里都写明了。' },
    { q: '这些数字有多准？', a: '像1英寸 = 2.54厘米这种定义值是完全精确的。看情况而定的——马赫和传统单位——页面上都写清了条件。' },
    { q: '我的硬盘怎么显示的容量偏少？', a: '本站按1 GB = 1,024 MB（二进制）算。制造商把1 GB当成1,000 MB，所以1 TB的SSD显示成931 GB。' },
  ],
  'zh-hant': [
    { q: '該填在哪個框裡？', a: '哪個都行。填左邊右邊就變，填右邊左邊就變，所以從哪個方向來都能直接用。' },
    { q: '加侖怎麼和我算的對不上？', a: '美制加侖是3.785 L，英制加侖是4.546 L，差了兩成。這些頁面用的是美制加侖，注意事項裡都寫明了。' },
    { q: '這些數字有多準？', a: '像1英吋 = 2.54公分這種定義值是完全精確的。看情況而定的——馬赫和傳統單位——頁面上都寫清了條件。' },
    { q: '我的硬碟怎麼顯示的容量偏少？', a: '本站按1 GB = 1,024 MB（二進位）算。製造商把1 GB當成1,000 MB，所以1 TB的SSD顯示成931 GB。' },
  ],
};

/** hreflang 묶음 — 열 언어가 모두 같은 slug를 쓰므로 레지스트리에서 만든다 */
export function convertAlternates(slug?: string) {
  return alternateLanguages(slug ? `/convert/${slug}` : '/convert');
}

/**
 * 허브의 검색 결과용 제목·설명.
 *
 * 화면에 보이는 hubTitle과 달리 여기에는 대표 단위 이름을 늘어놓는다 — 사람들이
 * 검색창에 치는 말이 "단위 변환"보다 "cm 인치"인 경우가 훨씬 많다.
 */
const HUB_META: Record<AnyLocale10, { title: string; desc: string }> = {
  ko: {
    title: '단위 변환 — 평·근·돈부터 인치·파운드까지 100종',
    desc: '평↔㎡, 근↔g, 돈↔g, cm↔인치, kg↔파운드, 섭씨↔화씨, Mbps↔MB/s에 트로이온스·중국 근·KiB↔KB·달리기 페이스까지 100가지 단위 변환을 한 곳에서. 자주 찾는 값 표와 계산식까지 함께 봅니다.',
  },
  en: {
    title: 'Unit Converter — 100 conversions incl. Korean units',
    desc: 'cm to inches, kg to pounds, Celsius to Fahrenheit, troy ounces, KiB versus KB, running pace and Korean units like pyeong, geun and don — 100 converters with common-value tables. Free, no sign-up.',
  },
  es: {
    title: 'Conversor de unidades — 100 conversiones',
    desc: 'cm a pulgadas, kg a libras, Celsius a Fahrenheit, onzas troy, KiB frente a KB, ritmo de carrera y unidades coreanas como pyeong, geun y don: 100 conversores con tablas de valores habituales. Gratis y sin registro.',
  },
  'pt-br': {
    title: 'Conversor de unidades — 100 conversões',
    desc: 'cm para polegadas, kg para libras, Celsius para Fahrenheit, onças troy, KiB versus KB, ritmo de corrida e unidades coreanas como pyeong, geun e don: 100 conversores com tabelas de valores comuns. Grátis, sem cadastro.',
  },
  ja: {
    title: '単位変換 — 尺・寸・匁からインチ・ポンドまで100種',
    desc: 'cm↔インチ、kg↔ポンド、摂氏↔華氏、トロイオンス、KiB↔KB、ランニングのペースに、尺・寸・匁・升・坪や韓国のドン・クンまで100種類の単位変換。よく調べる値の表と計算式も一緒に見られます。無料・登録不要。',
  },
  de: {
    title: 'Einheitenrechner — 100 Umrechnungen',
    desc: 'cm in Zoll, kg in Pfund, Celsius in Fahrenheit, Feinunzen, KiB gegen KB, Laufpace und koreanische Einheiten wie Pyeong, Geun und Don — 100 Umrechner mit Tabellen häufiger Werte. Kostenlos, ohne Anmeldung.',
  },
  fr: {
    title: 'Convertisseur d’unités — 100 conversions',
    desc: 'cm en pouces, kg en livres, Celsius en Fahrenheit, onces troy, Kio contre Ko, allure de course et unités coréennes comme le pyeong, le geun et le don : 100 convertisseurs avec des tableaux de valeurs courantes. Gratuit, sans inscription.',
  },
  hi: {
    title: 'इकाई कनवर्टर — 100 रूपांतरण',
    desc: 'सेमी से इंच, किग्रा से पाउंड, सेल्सियस से फ़ारेनहाइट, ट्रॉय औंस, KiB और KB, दौड़ का पेस और प्योंग, गुन, दोन जैसी कोरियाई इकाइयाँ — आम मानों की सारणी के साथ 100 कनवर्टर। मुफ़्त, बिना खाता।',
  },
  'zh-hans': {
    title: '单位换算 — 从市斤·市尺到英寸·磅共100种',
    desc: '厘米到英寸、千克到磅、摄氏到华氏、金衡盎司、KiB和KB、跑步配速，还有市斤·市尺·亩和韩国的坪·돈这些传统单位 — 100种换算，都带常用数值表。免费，不用注册。',
  },
  'zh-hant': {
    title: '單位換算 — 從坪·台斤到英吋·磅共100種',
    desc: '公分到英吋、公斤到磅、攝氏到華氏、金衡盎司、KiB和KB、跑步配速，還有坪·台斤·市尺和韓國的돈·되這些傳統單位 — 100種換算，都帶常用數值表。免費，不用註冊。',
  },
};

/** 허브 라우트의 metadata */
export function convertHubMetaIntl(lang: ConvertLang) {
  const m = HUB_META[lang];
  return {
    title: m.title,
    description: m.desc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/convert'), languages: convertAlternates() },
  };
}

/**
 * 도구 라우트의 metadata.
 *
 * 한국어는 데이터의 metaTitle을 그대로 쓴다(검색어에 맞춰 손으로 쓴 제목이다).
 * 나머지 언어는 사전의 제목 뒤에 그 언어의 '변환' 낱말을 붙인다.
 */
export function convertMetaIntl(lang: ConvertLang, slug: string) {
  const tool = CONVERT_MAP[slug];
  if (!tool) throw new Error(`convert-ui-intl: 도구가 없다 — ${slug}`);
  const l = convertL10n(slug, lang);
  return {
    title: lang === 'ko' ? tool.metaTitle : `${l?.title ?? tool.title} — ${CONVERT_UI[lang].suffix}`,
    description: l?.long ?? tool.long,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, `/convert/${slug}`), languages: convertAlternates(slug) },
  };
}
