/**
 * 일본 연호 화면의 문구 — 열 언어.
 *
 * 일본에서 쓰는 개념이지만 서류를 받아 든 사람은 어느 나라에도 있다.
 * 그래서 열 언어로 내되, 각 언어에서는 "이것이 무엇인가"부터 적는다.
 */
import { LANG_CODES, type L, type Lang } from '../i18n/lang.ts';
import type { GengoFacts } from './facts.ts';

export interface FaqItem { q: string; a: string }

export interface GengoUI {
  home: string;
  section: string;
  hubTitle: string;
  hubLead: string;
  eraName: (key: string) => string;
  /** 연차를 그 언어에서 적는 꼴 — 원년은 숫자가 아니라 元年이다 */
  yearLabel: (f: GengoFacts) => string;
  gregorianLabel: string;
  eraLabel: string;
  baseLabel: string;
  spanLabel: string;
  overlapLabel: string;
  firstLabel: string;
  ruleTitle: string;
  ruleNote: string;
  firstTitle: string;
  firstNote: string;
  overlapTitle: string;
  overlapNote: string;
  paperTitle: string;
  paperNote: string;
  careTitle: string;
  careNote: string;
  tableTitle: string;
  neighbourTitle: string;
  eraRowTitle: string;
  sameYearTitle: string;
  desc: (f: GengoFacts) => string;
  howTitle: string;
  how: string[];
  faqTitle: string;
  hubMetaTitle: string;
  hubMetaDesc: string;
  metaTitle: (f: GengoFacts) => string;
  metaDesc: (f: GengoFacts) => string;
  hubFaq: FaqItem[];
  cellFaq: (f: GengoFacts) => FaqItem[];
}

/** 열 언어를 한 줄에 — 순서는 ko·en·es·pt·ja·de·fr·hi·zh·tw */
const T = <V,>(ko: V, en: V, es: V, pt: V, ja: V, de: V, fr: V, hi: V, zh: V, tw: V): L<V> =>
  ({ ko, en, es, pt, ja, de, fr, hi, zh, tw });

type Names = Record<string, string>;
const namer = (m: Names) => (key: string) => m[key] ?? key;

const eKo: Names = { meiji: '메이지(明治)', taisho: '다이쇼(大正)', showa: '쇼와(昭和)', heisei: '헤이세이(平成)', reiwa: '레이와(令和)' };
const eEn: Names = { meiji: 'Meiji (明治)', taisho: 'Taishō (大正)', showa: 'Shōwa (昭和)', heisei: 'Heisei (平成)', reiwa: 'Reiwa (令和)' };
const eJa: Names = { meiji: '明治', taisho: '大正', showa: '昭和', heisei: '平成', reiwa: '令和' };
const eZh: Names = { meiji: '明治', taisho: '大正', showa: '昭和', heisei: '平成', reiwa: '令和' };
const eHi: Names = { meiji: 'मेइजी (明治)', taisho: 'ताइशो (大正)', showa: 'शोवा (昭和)', heisei: 'हेइसेइ (平成)', reiwa: 'रेइवा (令和)' };

type Spec = { [K in keyof GengoUI]: L<GengoUI[K]> };

const SPEC: Spec = {
  home: T('홈', 'Home', 'Inicio', 'Início', 'ホーム', 'Start', 'Accueil', 'होम', '首页', '首頁'),
  section: T('일본 연호', 'Japanese era years', 'Eras japonesas', 'Eras japonesas', '和暦と西暦', 'Japanische Ären', 'Ères japonaises', 'जापानी युग वर्ष', '日本年号', '日本年號'),

  hubTitle: T(
    '일본 연호 163칸 — 1989년은 쇼와 64년이면서 헤이세이 원년입니다',
    '163 Japanese era years — 1989 is both Shōwa 64 and Heisei 1',
    '163 años de era japonesa — 1989 es Shōwa 64 y a la vez Heisei 1',
    '163 anos de eras japonesas — 1989 é Shōwa 64 e também Heisei 1',
    '和暦163年分 — 1989年は昭和64年であり平成元年です',
    '163 japanische Ärajahre — 1989 ist Shōwa 64 und zugleich Heisei 1',
    '163 années d’ères japonaises — 1989 est à la fois Shōwa 64 et Heisei 1',
    '163 जापानी युग वर्ष — 1989 शोवा 64 भी है और हेइसेइ 1 भी',
    '163 个日本年号年 — 1989 年既是昭和 64 年，也是平成元年',
    '163 個日本年號年 — 1989 年既是昭和 64 年，也是平成元年',
  ),

  hubLead: T(
    '연호를 서기로 옮기는 것은 더하기 하나입니다. 어려운 것은 연호가 바뀌는 해입니다 — 서기 한 해에 연호가 둘 앉는 자리가 넷 있습니다. 연호 다섯과 실제로 있었던 해 전부를 계산해 두었습니다.',
    'Turning an era year into a Western one is a single addition. The hard part is the year an era changes — there are four years that carry two era names at once. Every year that actually existed under all five eras is worked out here.',
    'Pasar un año de era al calendario occidental es una simple suma. Lo difícil es el año del cambio de era: hay cuatro años que llevan dos nombres a la vez. Aquí están calculados todos los años que existieron bajo las cinco eras.',
    'Converter um ano de era para o calendário ocidental é uma soma só. O difícil é o ano em que a era muda: há quatro anos que carregam dois nomes ao mesmo tempo. Aqui estão todos os anos que existiram sob as cinco eras.',
    '和暦から西暦への変換は足し算ひとつです。難しいのは改元の年で、西暦の一年に元号が二つ載る所が四つあります。元号五つの、実際にあった年すべてを計算しました。',
    'Ein Ärajahr ins westliche Jahr zu übersetzen ist eine einzige Addition. Schwierig ist das Jahr des Ärawechsels — vier Jahre tragen zwei Äranamen zugleich. Hier stehen alle Jahre, die es unter den fünf Ären tatsächlich gab.',
    'Convertir une année d’ère en année occidentale, c’est une simple addition. Le difficile, c’est l’année du changement d’ère : quatre années portent deux noms à la fois. Toutes les années ayant réellement existé sous les cinq ères sont calculées ici.',
    'युग वर्ष को पश्चिमी वर्ष में बदलना बस एक जोड़ है। कठिन है वह वर्ष जब युग बदलता है — चार वर्ष ऐसे हैं जो एक साथ दो युग नाम रखते हैं। पाँचों युगों के सभी वास्तविक वर्ष यहाँ गिने गए हैं।',
    '把年号换算成公元只是一次加法。难的是改元那一年——有四个公元年份同时承载两个年号。这里算出了五个年号下实际存在过的全部年份。',
    '把年號換算成西元只是一次加法。難的是改元那一年——有四個西元年份同時承載兩個年號。這裡算出了五個年號下實際存在過的全部年份。',
  ),

  eraName: T<(k: string) => string>(
    namer(eKo), namer(eEn), namer(eEn), namer(eEn), namer(eJa),
    namer(eEn), namer(eEn), namer(eHi), namer(eZh), namer(eZh),
  ),

  yearLabel: T<(f: GengoFacts) => string>(
    f => (f.first ? '원년' : `${f.cell.year}년`),
    f => (f.first ? 'gannen (first year)' : `year ${f.cell.year}`),
    f => (f.first ? 'gannen (año 1)' : `año ${f.cell.year}`),
    f => (f.first ? 'gannen (ano 1)' : `ano ${f.cell.year}`),
    f => (f.first ? '元年' : `${f.cell.year}年`),
    f => (f.first ? 'Gannen (erstes Jahr)' : `Jahr ${f.cell.year}`),
    f => (f.first ? 'gannen (an 1)' : `an ${f.cell.year}`),
    f => (f.first ? 'गन्नेन (पहला वर्ष)' : `वर्ष ${f.cell.year}`),
    f => (f.first ? '元年' : `${f.cell.year}年`),
    f => (f.first ? '元年' : `${f.cell.year}年`),
  ),

  gregorianLabel: T('서기', 'Western year', 'Año occidental', 'Ano ocidental', '西暦', 'Westliches Jahr', 'Année occidentale', 'पश्चिमी वर्ष', '公元', '西元'),
  eraLabel: T('연호', 'Era', 'Era', 'Era', '元号', 'Ära', 'Ère', 'युग', '年号', '年號'),
  baseLabel: T('더하는 수', 'Number to add', 'Número que se suma', 'Número que se soma', '足す数', 'Additionszahl', 'Nombre à ajouter', 'जोड़ने की संख्या', '相加数', '相加數'),
  spanLabel: T('이어진 기간', 'Span', 'Duración', 'Duração', '続いた期間', 'Zeitraum', 'Durée', 'अवधि', '延续期间', '延續期間'),
  overlapLabel: T('같은 해의 다른 연호', 'The other era in this year', 'La otra era de ese año', 'A outra era desse ano', '同じ年の別の元号', 'Andere Ära im selben Jahr', 'L’autre ère de cette année', 'उसी वर्ष का दूसरा युग', '同年的另一个年号', '同年的另一個年號'),
  firstLabel: T('원년', 'First year', 'Primer año', 'Primeiro ano', '元年', 'Erstes Jahr', 'Première année', 'पहला वर्ष', '元年', '元年'),

  ruleTitle: T('옮기는 것은 더하기 하나입니다', 'Converting is one addition', 'Convertir es una suma', 'Converter é uma soma', '変換は足し算ひとつです', 'Umrechnen ist eine Addition', 'Convertir, c’est une addition', 'रूपांतरण बस एक जोड़ है', '换算只是一次加法', '換算只是一次加法'),

  ruleNote: T(
    '연호마다 더하는 수가 정해져 있습니다. 메이지는 1867, 다이쇼는 1911, 쇼와는 1925, 헤이세이는 1988, 레이와는 2018입니다. 레이와 6년이면 6 + 2018 = 2024년입니다. 더하는 수가 서로 다른 것은 규칙이 달라서가 아니라 개원한 해가 달라서입니다 — 어느 연호든 원년이 개원한 해에 앉습니다.',
    'Each era has a fixed number to add: 1867 for Meiji, 1911 for Taishō, 1925 for Shōwa, 1988 for Heisei, 2018 for Reiwa. Reiwa 6 is 6 + 2018 = 2024. The numbers differ not because the rule differs but because the eras began in different years — in every era, year one sits on the year it began.',
    'Cada era tiene un número fijo que sumar: 1867 para Meiji, 1911 para Taishō, 1925 para Shōwa, 1988 para Heisei y 2018 para Reiwa. Reiwa 6 es 6 + 2018 = 2024. Los números difieren no porque cambie la regla, sino porque las eras empezaron en años distintos: en todas, el año uno cae en el año de inicio.',
    'Cada era tem um número fixo a somar: 1867 para Meiji, 1911 para Taishō, 1925 para Shōwa, 1988 para Heisei e 2018 para Reiwa. Reiwa 6 é 6 + 2018 = 2024. Os números diferem não porque a regra mude, mas porque as eras começaram em anos distintos: em todas, o ano um cai no ano de início.',
    '元号ごとに足す数が決まっています。明治は1867、大正は1911、昭和は1925、平成は1988、令和は2018です。令和6年なら6 + 2018 = 2024年です。足す数が違うのは規則が違うからではなく、改元した年が違うからです — どの元号でも元年は改元した年に載ります。',
    'Jede Ära hat eine feste Additionszahl: 1867 für Meiji, 1911 für Taishō, 1925 für Shōwa, 1988 für Heisei, 2018 für Reiwa. Reiwa 6 ist 6 + 2018 = 2024. Die Zahlen unterscheiden sich nicht wegen anderer Regeln, sondern weil die Ären in verschiedenen Jahren begannen — überall liegt das erste Jahr im Gründungsjahr.',
    'Chaque ère a un nombre fixe à ajouter : 1867 pour Meiji, 1911 pour Taishō, 1925 pour Shōwa, 1988 pour Heisei, 2018 pour Reiwa. Reiwa 6 fait 6 + 2018 = 2024. Les nombres diffèrent non par changement de règle mais parce que les ères ont commencé à des années différentes — partout, l’an un tombe sur l’année de début.',
    'हर युग के लिए जोड़ने की एक निश्चित संख्या है: मेइजी 1867, ताइशो 1911, शोवा 1925, हेइसेइ 1988, रेइवा 2018। रेइवा 6 यानी 6 + 2018 = 2024। संख्याएँ इसलिए अलग हैं कि युग अलग-अलग वर्षों में शुरू हुए, नियम अलग नहीं — हर युग में पहला वर्ष उसी वर्ष पर पड़ता है जब वह शुरू हुआ।',
    '每个年号都有固定的相加数：明治 1867，大正 1911，昭和 1925，平成 1988，令和 2018。令和 6 年就是 6 + 2018 = 2024 年。数字不同不是因为规则不同，而是因为改元的年份不同——任何年号的元年都落在改元那一年。',
    '每個年號都有固定的相加數：明治 1867，大正 1911，昭和 1925，平成 1988，令和 2018。令和 6 年就是 6 + 2018 = 2024 年。數字不同不是因為規則不同，而是因為改元的年份不同——任何年號的元年都落在改元那一年。',
  ),

  firstTitle: T('첫해는 1년이 아니라 원년입니다', 'The first year is not “1”, it is gannen', 'El primer año no es «1», es gannen', 'O primeiro ano não é «1», é gannen', '最初の年は1年ではなく元年です', 'Das erste Jahr heißt nicht „1“, sondern Gannen', 'La première année ne se dit pas « 1 » mais gannen', 'पहला वर्ष «1» नहीं, गन्नेन कहलाता है', '第一年不叫"1年"，叫元年', '第一年不叫「1年」，叫元年'),

  firstNote: T(
    '일본 서류에서는 연호의 첫해를 「元年」이라고 적습니다. 레이와 1년이 아니라 令和元年입니다. 계산할 때는 1로 세지만 적을 때는 다른 말을 쓰므로, 서류를 옮겨 적을 때 이 자리가 자주 어긋납니다.',
    'Japanese documents write the first year of an era as 元年 (gannen), not 1. It is 令和元年, never 令和1年. The value counts as one in arithmetic but is written differently, which is where transcriptions usually go wrong.',
    'Los documentos japoneses escriben el primer año de una era como 元年 (gannen), no 1. Es 令和元年, nunca 令和1年. Cuenta como uno al calcular pero se escribe de otro modo, y ahí es donde fallan las transcripciones.',
    'Documentos japoneses escrevem o primeiro ano de uma era como 元年 (gannen), não 1. É 令和元年, nunca 令和1年. Conta como um no cálculo mas escreve-se de outro modo — é aí que as transcrições erram.',
    '日本の書類では元号の最初の年を「元年」と書きます。令和1年ではなく令和元年です。計算では1と数えるのに書き方が違うので、書き写すときにこの場所がよくずれます。',
    'Japanische Dokumente schreiben das erste Jahr einer Ära als 元年 (gannen), nicht als 1. Es heißt 令和元年, nie 令和1年. Rechnerisch zählt es als eins, geschrieben sieht es anders aus — genau da verrutschen Übertragungen.',
    'Les documents japonais écrivent la première année d’une ère 元年 (gannen), pas 1. On écrit 令和元年, jamais 令和1年. Elle compte pour un dans le calcul mais s’écrit autrement : c’est là que les transcriptions dérapent.',
    'जापानी दस्तावेज़ों में युग का पहला वर्ष 元年 (गन्नेन) लिखा जाता है, 1 नहीं। यह 令和元年 होता है, कभी 令和1年 नहीं। गणना में यह एक गिना जाता है पर लिखा अलग जाता है — नक़ल करते समय यही जगह गड़बड़ाती है।',
    '日本文件把年号的第一年写作「元年」，而不是 1。是令和元年，不会写成令和1年。计算时算作 1，写法却不同，抄录时最容易在这里出错。',
    '日本文件把年號的第一年寫作「元年」，而不是 1。是令和元年，不會寫成令和1年。計算時算作 1，寫法卻不同，抄錄時最容易在這裡出錯。',
  ),

  overlapTitle: T('개원한 해는 두 연호를 함께 답니다', 'The year of a change carries both names', 'El año del cambio lleva ambos nombres', 'O ano da mudança carrega os dois nomes', '改元の年は元号を二つ載せます', 'Das Wechseljahr trägt beide Namen', 'L’année du changement porte les deux noms', 'बदलाव का वर्ष दोनों नाम रखता है', '改元那年同时挂两个年号', '改元那年同時掛兩個年號'),

  overlapNote: T(
    '1912년은 메이지 45년이면서 다이쇼 원년이고, 1926년은 다이쇼 15년이면서 쇼와 원년, 1989년은 쇼와 64년이면서 헤이세이 원년, 2019년은 헤이세이 31년이면서 레이와 원년입니다. 네 자리 모두 어느 쪽으로 적어도 틀린 게 아니므로, 서류의 날짜까지 봐야 어느 연호인지 정해집니다.',
    '1912 is Meiji 45 and Taishō 1; 1926 is Taishō 15 and Shōwa 1; 1989 is Shōwa 64 and Heisei 1; 2019 is Heisei 31 and Reiwa 1. In all four, neither label is wrong — only the date within the year decides which era applies.',
    '1912 es Meiji 45 y Taishō 1; 1926 es Taishō 15 y Shōwa 1; 1989 es Shōwa 64 y Heisei 1; 2019 es Heisei 31 y Reiwa 1. En los cuatro casos ninguna etiqueta es falsa: solo la fecha dentro del año decide qué era corresponde.',
    '1912 é Meiji 45 e Taishō 1; 1926 é Taishō 15 e Shōwa 1; 1989 é Shōwa 64 e Heisei 1; 2019 é Heisei 31 e Reiwa 1. Nos quatro casos nenhum rótulo é falso: só a data dentro do ano decide qual era vale.',
    '1912年は明治45年であり大正元年、1926年は大正15年であり昭和元年、1989年は昭和64年であり平成元年、2019年は平成31年であり令和元年です。四つともどちらで書いても誤りではないので、書類の日付まで見ないとどの元号か決まりません。',
    '1912 ist Meiji 45 und Taishō 1; 1926 ist Taishō 15 und Shōwa 1; 1989 ist Shōwa 64 und Heisei 1; 2019 ist Heisei 31 und Reiwa 1. In allen vier Fällen ist keine Angabe falsch — erst das Datum im Jahr entscheidet, welche Ära gilt.',
    '1912 est Meiji 45 et Taishō 1 ; 1926 est Taishō 15 et Shōwa 1 ; 1989 est Shōwa 64 et Heisei 1 ; 2019 est Heisei 31 et Reiwa 1. Dans les quatre cas aucune étiquette n’est fausse : seule la date dans l’année tranche.',
    '1912 मेइजी 45 भी है और ताइशो 1 भी; 1926 ताइशो 15 और शोवा 1; 1989 शोवा 64 और हेइसेइ 1; 2019 हेइसेइ 31 और रेइवा 1। चारों में कोई भी लेबल ग़लत नहीं — वर्ष के भीतर की तारीख़ ही तय करती है कि कौन सा युग लागू है।',
    '1912 年既是明治 45 年也是大正元年；1926 年既是大正 15 年也是昭和元年；1989 年既是昭和 64 年也是平成元年；2019 年既是平成 31 年也是令和元年。四处都不算写错，要看文件上的具体日期才能定是哪个年号。',
    '1912 年既是明治 45 年也是大正元年；1926 年既是大正 15 年也是昭和元年；1989 年既是昭和 64 年也是平成元年；2019 年既是平成 31 年也是令和元年。四處都不算寫錯，要看文件上的具體日期才能定是哪個年號。',
  ),

  paperTitle: T('즉일이냐 익일이냐로 갈립니다', 'Same day or next day', 'Mismo día o día siguiente', 'No mesmo dia ou no seguinte', '即日か翌日かで分かれます', 'Am selben Tag oder am Folgetag', 'Le jour même ou le lendemain', 'उसी दिन या अगले दिन', '当日改元还是次日改元', '當日改元還是次日改元'),

  paperNote: T(
    '메이지에서 다이쇼로, 다이쇼에서 쇼와로는 **즉일 개원**이라 같은 하루가 두 연호에 함께 듭니다 — 1912년 7월 30일은 메이지 45년 7월 30일이면서 다이쇼 원년 7월 30일입니다. 쇼와에서 헤이세이로, 헤이세이에서 레이와로는 **익일 개원**이라 하루로 갈립니다 — 쇼와 64년은 1월 7일에 끝나고 헤이세이 원년은 1월 8일에 시작합니다.',
    'Meiji to Taishō and Taishō to Shōwa changed **on the same day**, so one calendar day belongs to both eras: 30 July 1912 is Meiji 45-07-30 and Taishō 1-07-30 at once. Shōwa to Heisei and Heisei to Reiwa changed **the next day**, so a single day separates them: Shōwa 64 ends on 7 January and Heisei 1 begins on the 8th.',
    'De Meiji a Taishō y de Taishō a Shōwa el cambio fue **el mismo día**, así que un día pertenece a ambas eras: el 30 de julio de 1912 es Meiji 45-07-30 y Taishō 1-07-30 a la vez. De Shōwa a Heisei y de Heisei a Reiwa fue **al día siguiente**: Shōwa 64 termina el 7 de enero y Heisei 1 empieza el 8.',
    'De Meiji a Taishō e de Taishō a Shōwa a mudança foi **no mesmo dia**, então um dia pertence às duas eras: 30 de julho de 1912 é Meiji 45-07-30 e Taishō 1-07-30 ao mesmo tempo. De Shōwa a Heisei e de Heisei a Reiwa foi **no dia seguinte**: Shōwa 64 termina em 7 de janeiro e Heisei 1 começa no dia 8.',
    '明治から大正へ、大正から昭和へは**即日改元**なので、同じ一日が二つの元号に入ります — 1912年7月30日は明治45年7月30日であり大正元年7月30日です。昭和から平成へ、平成から令和へは**翌日改元**なので一日で分かれます — 昭和64年は1月7日で終わり、平成元年は1月8日に始まります。',
    'Von Meiji zu Taishō und von Taishō zu Shōwa wurde **am selben Tag** gewechselt, ein Kalendertag gehört also beiden Ären: Der 30. Juli 1912 ist zugleich Meiji 45-07-30 und Taishō 1-07-30. Von Shōwa zu Heisei und von Heisei zu Reiwa wurde **am Folgetag** gewechselt: Shōwa 64 endet am 7. Januar, Heisei 1 beginnt am 8.',
    'De Meiji à Taishō et de Taishō à Shōwa, le changement s’est fait **le jour même** : une même journée appartient aux deux ères — le 30 juillet 1912 est à la fois Meiji 45-07-30 et Taishō 1-07-30. De Shōwa à Heisei et de Heisei à Reiwa, ce fut **le lendemain** : Shōwa 64 s’achève le 7 janvier et Heisei 1 commence le 8.',
    'मेइजी से ताइशो और ताइशो से शोवा में **उसी दिन** बदलाव हुआ, इसलिए एक ही दिन दोनों युगों का है — 30 जुलाई 1912 एक साथ मेइजी 45-07-30 और ताइशो 1-07-30 है। शोवा से हेइसेइ और हेइसेइ से रेइवा में **अगले दिन** बदला: शोवा 64 सात जनवरी को ख़त्म होता है और हेइसेइ 1 आठ को शुरू।',
    '明治到大正、大正到昭和是**当日改元**，所以同一天同时属于两个年号——1912 年 7 月 30 日既是明治 45 年 7 月 30 日，也是大正元年 7 月 30 日。昭和到平成、平成到令和是**次日改元**，一天之隔：昭和 64 年止于 1 月 7 日，平成元年从 1 月 8 日开始。',
    '明治到大正、大正到昭和是**當日改元**，所以同一天同時屬於兩個年號——1912 年 7 月 30 日既是明治 45 年 7 月 30 日，也是大正元年 7 月 30 日。昭和到平成、平成到令和是**次日改元**，一天之隔：昭和 64 年止於 1 月 7 日，平成元年從 1 月 8 日開始。',
  ),

  careTitle: T('레이와는 아직 이어지고 있습니다', 'Reiwa is still running', 'Reiwa sigue en curso', 'Reiwa ainda está em curso', '令和はまだ続いています', 'Reiwa läuft noch', 'L’ère Reiwa se poursuit', 'रेइवा अभी चल रहा है', '令和仍在延续', '令和仍在延續'),

  careNote: T(
    '이 표의 레이와는 지금까지 지난 해까지만 담았습니다. 해가 바뀌면 한 칸이 늘어납니다. 앞의 네 연호는 이미 끝났으므로 칸 수가 더 늘지 않습니다 — 메이지 45년, 다이쇼 15년, 쇼와 64년, 헤이세이 31년이 각각 마지막입니다.',
    'The Reiwa rows here run only as far as the years that have already passed; a new one appears each year. The four earlier eras are closed, so their counts will not grow — Meiji ends at 45, Taishō at 15, Shōwa at 64, Heisei at 31.',
    'Las filas de Reiwa llegan solo hasta los años ya transcurridos; cada año aparece una nueva. Las cuatro eras anteriores están cerradas y no crecerán: Meiji acaba en 45, Taishō en 15, Shōwa en 64 y Heisei en 31.',
    'As linhas de Reiwa vão só até os anos já decorridos; a cada ano surge mais uma. As quatro eras anteriores estão encerradas e não crescem: Meiji acaba em 45, Taishō em 15, Shōwa em 64 e Heisei em 31.',
    'この表の令和は、これまでに過ぎた年までしか入れていません。年が変われば一つ増えます。前の四つの元号はすでに終わっているので増えません — 明治45年、大正15年、昭和64年、平成31年がそれぞれ最後です。',
    'Die Reiwa-Zeilen reichen hier nur bis zu den bereits vergangenen Jahren; jedes Jahr kommt eine hinzu. Die vier früheren Ären sind abgeschlossen und wachsen nicht mehr — Meiji endet bei 45, Taishō bei 15, Shōwa bei 64, Heisei bei 31.',
    'Les lignes Reiwa ne vont ici que jusqu’aux années déjà écoulées ; il s’en ajoute une chaque année. Les quatre ères précédentes sont closes et n’augmenteront plus : Meiji s’arrête à 45, Taishō à 15, Shōwa à 64, Heisei à 31.',
    'यहाँ रेइवा की पंक्तियाँ केवल बीत चुके वर्षों तक हैं; हर साल एक और जुड़ती है। पहले के चार युग बंद हो चुके हैं और नहीं बढ़ेंगे — मेइजी 45, ताइशो 15, शोवा 64 और हेइसेइ 31 पर समाप्त।',
    '本表的令和只收到已经过去的年份，每过一年就多一格。前面四个年号已经结束，格数不会再增加——明治止于 45 年，大正 15 年，昭和 64 年，平成 31 年。',
    '本表的令和只收到已經過去的年份，每過一年就多一格。前面四個年號已經結束，格數不會再增加——明治止於 45 年，大正 15 年，昭和 64 年，平成 31 年。',
  ),

  tableTitle: T('연호로 찾기', 'Find it by era', 'Búscalo por era', 'Ache por era', '元号から探す', 'Nach Ära suchen', 'Chercher par ère', 'युग से देखें', '按年号查找', '按年號查找'),
  neighbourTitle: T('앞뒤 해', 'The years either side', 'Los años contiguos', 'Os anos vizinhos', '前後の年', 'Die Jahre daneben', 'Les années voisines', 'आगे-पीछे के वर्ष', '前后年份', '前後年份'),
  eraRowTitle: T('같은 연호의 다른 해', 'Other years of this era', 'Otros años de esta era', 'Outros anos desta era', '同じ元号の別の年', 'Andere Jahre dieser Ära', 'Autres années de cette ère', 'इसी युग के अन्य वर्ष', '同一年号的其他年份', '同一年號的其他年份'),
  sameYearTitle: T('같은 서기 연도', 'The same Western year', 'El mismo año occidental', 'O mesmo ano ocidental', '同じ西暦の年', 'Dasselbe westliche Jahr', 'La même année occidentale', 'वही पश्चिमी वर्ष', '同一公元年份', '同一西元年份'),

  howTitle: T('읽는 방법', 'How to read this', 'Cómo leerlo', 'Como ler', '読み方', 'So liest man das', 'Comment lire', 'कैसे पढ़ें', '怎么看这一页', '怎麼看這一頁'),

  how: T<string[]>(
    [
      '서기 = 연차 + 연호마다 정해진 수(메이지 1867, 다이쇼 1911, 쇼와 1925, 헤이세이 1988, 레이와 2018)',
      '첫해는 1년이 아니라 「元年」이라고 적습니다.',
      '개원한 해는 서기 한 해에 연호가 둘 앉습니다. 날짜까지 봐야 정해집니다.',
      '메이지·다이쇼는 즉일 개원, 쇼와 이후는 익일 개원입니다.',
    ],
    [
      'Western year = era year + a fixed number (Meiji 1867, Taishō 1911, Shōwa 1925, Heisei 1988, Reiwa 2018).',
      'The first year is written 元年 (gannen), not 1.',
      'A year in which the era changed carries two era names; only the date settles it.',
      'Meiji and Taishō began on the same day as the previous era ended; Shōwa onward, the next day.',
    ],
    [
      'Año occidental = año de era + un número fijo (Meiji 1867, Taishō 1911, Shōwa 1925, Heisei 1988, Reiwa 2018).',
      'El primer año se escribe 元年 (gannen), no 1.',
      'El año del cambio lleva dos nombres de era; solo la fecha lo decide.',
      'Meiji y Taishō empezaron el mismo día en que acabó la era anterior; de Shōwa en adelante, al día siguiente.',
    ],
    [
      'Ano ocidental = ano da era + um número fixo (Meiji 1867, Taishō 1911, Shōwa 1925, Heisei 1988, Reiwa 2018).',
      'O primeiro ano escreve-se 元年 (gannen), não 1.',
      'O ano da mudança carrega dois nomes de era; só a data decide.',
      'Meiji e Taishō começaram no mesmo dia em que acabou a era anterior; de Shōwa em diante, no dia seguinte.',
    ],
    [
      '西暦 = 和暦の年数 + 元号ごとに決まった数(明治1867、大正1911、昭和1925、平成1988、令和2018)',
      '最初の年は1年ではなく「元年」と書きます。',
      '改元の年は西暦の一年に元号が二つ載ります。日付まで見て決まります。',
      '明治・大正は即日改元、昭和以降は翌日改元です。',
    ],
    [
      'Westliches Jahr = Ärajahr + feste Zahl (Meiji 1867, Taishō 1911, Shōwa 1925, Heisei 1988, Reiwa 2018).',
      'Das erste Jahr schreibt man 元年 (Gannen), nicht 1.',
      'Im Wechseljahr trägt ein Jahr zwei Äranamen; erst das Datum entscheidet.',
      'Meiji und Taishō begannen am Endtag der Vorära, ab Shōwa am Folgetag.',
    ],
    [
      'Année occidentale = année d’ère + un nombre fixe (Meiji 1867, Taishō 1911, Shōwa 1925, Heisei 1988, Reiwa 2018).',
      'La première année s’écrit 元年 (gannen), pas 1.',
      'L’année d’un changement porte deux noms d’ère ; seule la date tranche.',
      'Meiji et Taishō ont commencé le jour même de la fin précédente ; à partir de Shōwa, le lendemain.',
    ],
    [
      'पश्चिमी वर्ष = युग वर्ष + एक निश्चित संख्या (मेइजी 1867, ताइशो 1911, शोवा 1925, हेइसेइ 1988, रेइवा 2018)।',
      'पहला वर्ष 元年 (गन्नेन) लिखा जाता है, 1 नहीं।',
      'बदलाव वाले वर्ष पर दो युग नाम होते हैं; तारीख़ ही तय करती है।',
      'मेइजी और ताइशो उसी दिन शुरू हुए जिस दिन पिछला युग ख़त्म हुआ; शोवा से आगे अगले दिन।',
    ],
    [
      '公元 = 年号年数 + 固定的相加数（明治 1867，大正 1911，昭和 1925，平成 1988，令和 2018）。',
      '第一年写作「元年」，不是 1。',
      '改元那一年会同时挂两个年号，要看日期才能定。',
      '明治、大正是当日改元，昭和以后是次日改元。',
    ],
    [
      '西元 = 年號年數 + 固定的相加數（明治 1867，大正 1911，昭和 1925，平成 1988，令和 2018）。',
      '第一年寫作「元年」，不是 1。',
      '改元那一年會同時掛兩個年號，要看日期才能定。',
      '明治、大正是當日改元，昭和以後是次日改元。',
    ],
  ),

  faqTitle: T('자주 묻는 질문', 'Frequently asked questions', 'Preguntas frecuentes', 'Perguntas frequentes', 'よくある質問', 'Häufige Fragen', 'Questions fréquentes', 'अक्सर पूछे जाने वाले सवाल', '常见问题', '常見問題'),

  hubMetaTitle: T(
    '일본 연호 ↔ 서기 환산 — 메이지·다이쇼·쇼와·헤이세이·레이와',
    'Japanese era to Western year — Meiji, Taishō, Shōwa, Heisei, Reiwa',
    'Eras japonesas a año occidental — Meiji, Taishō, Shōwa, Heisei, Reiwa',
    'Eras japonesas para ano ocidental — Meiji, Taishō, Shōwa, Heisei, Reiwa',
    '和暦西暦変換 — 明治・大正・昭和・平成・令和',
    'Japanische Ära in westliches Jahr — Meiji, Taishō, Shōwa, Heisei, Reiwa',
    'Ères japonaises et années occidentales — Meiji, Taishō, Shōwa, Heisei, Reiwa',
    'जापानी युग ↔ पश्चिमी वर्ष — मेइजी, ताइशो, शोवा, हेइसेइ, रेइवा',
    '日本年号与公元换算 — 明治·大正·昭和·平成·令和',
    '日本年號與西元換算 — 明治·大正·昭和·平成·令和',
  ),

  hubMetaDesc: T(
    '레이와 6년은 2024년입니다. 연차에 연호마다 정해진 수를 더하면 서기가 나옵니다. 1989년이 쇼와 64년이면서 헤이세이 원년인 것처럼 한 해에 연호가 둘 앉는 자리가 넷이고, 첫해는 1년이 아니라 元年이라고 적습니다.',
    'Reiwa 6 is 2024: add a fixed number to the era year and the Western year appears. Four years carry two era names at once — 1989 is both Shōwa 64 and Heisei 1 — and the first year of an era is written 元年, not 1.',
    'Reiwa 6 es 2024: suma un número fijo al año de era y sale el año occidental. Cuatro años llevan dos nombres a la vez —1989 es Shōwa 64 y Heisei 1— y el primer año se escribe 元年, no 1.',
    'Reiwa 6 é 2024: some um número fixo ao ano da era e sai o ano ocidental. Quatro anos carregam dois nomes de uma vez — 1989 é Shōwa 64 e Heisei 1 — e o primeiro ano escreve-se 元年, não 1.',
    '令和6年は2024年です。和暦の年数に元号ごとの数を足せば西暦が出ます。1989年が昭和64年であり平成元年であるように、一年に元号が二つ載る所が四つあり、最初の年は1年ではなく元年と書きます。',
    'Reiwa 6 ist 2024: Ärajahr plus feste Zahl ergibt das westliche Jahr. Vier Jahre tragen zwei Äranamen zugleich — 1989 ist Shōwa 64 und Heisei 1 — und das erste Jahr schreibt man 元年, nicht 1.',
    'Reiwa 6 correspond à 2024 : ajoutez un nombre fixe à l’année d’ère et vous obtenez l’année occidentale. Quatre années portent deux noms à la fois — 1989 est Shōwa 64 et Heisei 1 — et la première année s’écrit 元年, pas 1.',
    'रेइवा 6 यानी 2024: युग वर्ष में एक निश्चित संख्या जोड़ें और पश्चिमी वर्ष मिल जाता है। चार वर्ष एक साथ दो युग नाम रखते हैं — 1989 शोवा 64 भी है और हेइसेइ 1 भी — और पहला वर्ष 元年 लिखा जाता है, 1 नहीं।',
    '令和 6 年就是 2024 年：年号年数加上固定数就得公元年。有四个年份同时挂两个年号——1989 年既是昭和 64 年也是平成元年——而第一年写作「元年」，不是 1。',
    '令和 6 年就是 2024 年：年號年數加上固定數就得西元年。有四個年份同時掛兩個年號——1989 年既是昭和 64 年也是平成元年——而第一年寫作「元年」，不是 1。',
  ),

  desc: T<(f: GengoFacts) => string>(
    f => `${f.cell.year} + ${f.era.base} = 서기 ${f.gregorian}년입니다.${f.overlap ? ' 이 해에는 연호가 둘 앉습니다.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = ${f.gregorian} in the Western calendar.${f.overlap ? ' This year carries two era names.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = ${f.gregorian} en el calendario occidental.${f.overlap ? ' Este año lleva dos nombres de era.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = ${f.gregorian} no calendário ocidental.${f.overlap ? ' Este ano carrega dois nomes de era.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = 西暦${f.gregorian}年です。${f.overlap ? 'この年は元号が二つ載ります。' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = ${f.gregorian} nach westlicher Zählung.${f.overlap ? ' Dieses Jahr trägt zwei Äranamen.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = ${f.gregorian} dans le calendrier occidental.${f.overlap ? ' Cette année porte deux noms d’ère.' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = पश्चिमी वर्ष ${f.gregorian}।${f.overlap ? ' इस वर्ष पर दो युग नाम हैं।' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = 公元 ${f.gregorian} 年。${f.overlap ? '这一年同时挂两个年号。' : ''}`,
    f => `${f.cell.year} + ${f.era.base} = 西元 ${f.gregorian} 年。${f.overlap ? '這一年同時掛兩個年號。' : ''}`,
  ),

  metaTitle: T<(f: GengoFacts) => string>(
    f => `${eKo[f.cell.era]} ${f.first ? '원년' : `${f.cell.year}년`} — 서기 ${f.gregorian}년`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year} — ${f.gregorian}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year} — ${f.gregorian}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year} — ${f.gregorian}`,
    f => `${eJa[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`} — 西暦${f.gregorian}年`,
    f => `${eEn[f.cell.era]} ${f.first ? 'Gannen' : f.cell.year} — ${f.gregorian}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year} — ${f.gregorian}`,
    f => `${eHi[f.cell.era]} ${f.first ? 'गन्नेन' : f.cell.year} — ${f.gregorian}`,
    f => `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`} — 公元 ${f.gregorian} 年`,
    f => `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`} — 西元 ${f.gregorian} 年`,
  ),

  metaDesc: T<(f: GengoFacts) => string>(
    f => `${eKo[f.cell.era]} ${f.first ? '원년' : `${f.cell.year}년`}은 서기 ${f.gregorian}년입니다. ${f.cell.year}에 ${f.era.base}을 더한 값입니다.${f.overlap ? ` 이 해는 ${eKo[f.overlap.era]} ${f.overlap.year === 1 ? '원년' : `${f.overlap.year}년`}이기도 합니다.` : ''}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen (year 1)' : `year ${f.cell.year}`} is ${f.gregorian} — the era year plus ${f.era.base}.${f.overlap ? ` The same year is also ${eEn[f.overlap.era]} ${f.overlap.year}.` : ''}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen (año 1)' : `año ${f.cell.year}`} es ${f.gregorian}: el año de era más ${f.era.base}.${f.overlap ? ` Ese mismo año es también ${eEn[f.overlap.era]} ${f.overlap.year}.` : ''}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen (ano 1)' : `ano ${f.cell.year}`} é ${f.gregorian}: o ano da era mais ${f.era.base}.${f.overlap ? ` Esse mesmo ano também é ${eEn[f.overlap.era]} ${f.overlap.year}.` : ''}`,
    f => `${eJa[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}は西暦${f.gregorian}年です。${f.cell.year}に${f.era.base}を足した値です。${f.overlap ? `この年は${eJa[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}でもあります。` : ''}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'Gannen (Jahr 1)' : `Jahr ${f.cell.year}`} ist ${f.gregorian} — Ärajahr plus ${f.era.base}.${f.overlap ? ` Dasselbe Jahr ist auch ${eEn[f.overlap.era]} ${f.overlap.year}.` : ''}`,
    f => `${eEn[f.cell.era]} ${f.first ? 'gannen (an 1)' : `an ${f.cell.year}`} correspond à ${f.gregorian} : l’année d’ère plus ${f.era.base}.${f.overlap ? ` Cette même année est aussi ${eEn[f.overlap.era]} ${f.overlap.year}.` : ''}`,
    f => `${eHi[f.cell.era]} ${f.first ? 'गन्नेन (वर्ष 1)' : `वर्ष ${f.cell.year}`} = ${f.gregorian}, यानी युग वर्ष में ${f.era.base} जोड़कर।${f.overlap ? ` यही वर्ष ${eHi[f.overlap.era]} ${f.overlap.year} भी है।` : ''}`,
    f => `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}是公元 ${f.gregorian} 年，即年号年数加 ${f.era.base}。${f.overlap ? `这一年同时也是${eZh[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}。` : ''}`,
    f => `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}是西元 ${f.gregorian} 年，即年號年數加 ${f.era.base}。${f.overlap ? `這一年同時也是${eZh[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}。` : ''}`,
  ),

  hubFaq: T<FaqItem[]>(
    [
      { q: '레이와 6년은 서기 몇 년인가요?', a: '2024년입니다. 레이와는 연차에 2018을 더합니다.' },
      { q: '헤이세이는 몇 년까지 있었나요?', a: '헤이세이 31년까지입니다. 2019년 4월 30일에 끝나고 다음 날부터 레이와가 시작됐습니다.' },
      { q: '쇼와 64년은 며칠뿐이었나요?', a: '1989년 1월 1일부터 7일까지 이레입니다. 1월 8일부터는 헤이세이 원년입니다.' },
      { q: '왜 첫해를 「元年」이라고 적나요?', a: '일본에서 연호의 첫해를 부르는 말입니다. 계산할 때는 1로 세지만 서류에는 元年이라고 씁니다.' },
      { q: '서기에서 연호로 거꾸로 옮기려면요?', a: '서기에서 그 연호의 수를 빼면 됩니다. 2024 − 2018 = 6이라 레이와 6년입니다.' },
    ],
    [
      { q: 'What year is Reiwa 6?', a: '2024. For Reiwa you add 2018 to the era year.' },
      { q: 'How far did Heisei run?', a: 'To Heisei 31. It ended on 30 April 2019 and Reiwa began the next day.' },
      { q: 'How long was Shōwa 64?', a: 'Seven days, from 1 to 7 January 1989. From the 8th it was Heisei 1.' },
      { q: 'Why is the first year written 元年?', a: 'That is the Japanese word for an era’s opening year. It counts as one in arithmetic but documents write 元年.' },
      { q: 'How do I convert the other way?', a: 'Subtract the era’s number from the Western year: 2024 − 2018 = 6, so Reiwa 6.' },
    ],
    [
      { q: '¿A qué año equivale Reiwa 6?', a: 'A 2024. Para Reiwa se suma 2018 al año de era.' },
      { q: '¿Hasta cuándo duró Heisei?', a: 'Hasta Heisei 31. Terminó el 30 de abril de 2019 y Reiwa empezó al día siguiente.' },
      { q: '¿Cuánto duró Shōwa 64?', a: 'Siete días, del 1 al 7 de enero de 1989. Desde el 8 fue Heisei 1.' },
      { q: '¿Por qué el primer año se escribe 元年?', a: 'Es la palabra japonesa para el año inicial de una era. Cuenta como uno, pero los documentos escriben 元年.' },
      { q: '¿Cómo se convierte al revés?', a: 'Resta el número de la era al año occidental: 2024 − 2018 = 6, o sea Reiwa 6.' },
    ],
    [
      { q: 'A que ano corresponde Reiwa 6?', a: 'A 2024. Para Reiwa soma-se 2018 ao ano da era.' },
      { q: 'Até quando foi Heisei?', a: 'Até Heisei 31. Terminou em 30 de abril de 2019 e Reiwa começou no dia seguinte.' },
      { q: 'Quanto durou Shōwa 64?', a: 'Sete dias, de 1 a 7 de janeiro de 1989. A partir do dia 8 foi Heisei 1.' },
      { q: 'Por que o primeiro ano se escreve 元年?', a: 'É a palavra japonesa para o ano inicial de uma era. Conta como um, mas os documentos escrevem 元年.' },
      { q: 'Como converter no sentido inverso?', a: 'Subtraia o número da era do ano ocidental: 2024 − 2018 = 6, ou seja Reiwa 6.' },
    ],
    [
      { q: '令和6年は西暦何年ですか？', a: '2024年です。令和は和暦の年数に2018を足します。' },
      { q: '平成は何年までありましたか？', a: '平成31年までです。2019年4月30日に終わり、翌日から令和が始まりました。' },
      { q: '昭和64年は何日間でしたか？', a: '1989年1月1日から7日までの七日間です。1月8日からは平成元年です。' },
      { q: 'なぜ最初の年を「元年」と書くのですか？', a: '元号の最初の年を指す言い方です。計算では1と数えますが、書類には元年と書きます。' },
      { q: '西暦から和暦に戻すには？', a: '西暦からその元号の数を引きます。2024 − 2018 = 6なので令和6年です。' },
    ],
    [
      { q: 'Welches Jahr ist Reiwa 6?', a: '2024. Bei Reiwa addiert man 2018 zum Ärajahr.' },
      { q: 'Wie lange lief Heisei?', a: 'Bis Heisei 31. Es endete am 30. April 2019, Reiwa begann am Folgetag.' },
      { q: 'Wie lang war Shōwa 64?', a: 'Sieben Tage, vom 1. bis 7. Januar 1989. Ab dem 8. war es Heisei 1.' },
      { q: 'Warum schreibt man das erste Jahr 元年?', a: 'So heißt im Japanischen das Eröffnungsjahr einer Ära. Rechnerisch ist es eins, geschrieben steht 元年.' },
      { q: 'Wie rechnet man zurück?', a: 'Die Zahl der Ära vom westlichen Jahr abziehen: 2024 − 2018 = 6, also Reiwa 6.' },
    ],
    [
      { q: 'À quelle année correspond Reiwa 6 ?', a: 'À 2024. Pour Reiwa, on ajoute 2018 à l’année d’ère.' },
      { q: 'Jusqu’où est allée l’ère Heisei ?', a: 'Jusqu’à Heisei 31. Elle s’est achevée le 30 avril 2019 et Reiwa a commencé le lendemain.' },
      { q: 'Combien de temps a duré Shōwa 64 ?', a: 'Sept jours, du 1er au 7 janvier 1989. À partir du 8, c’était Heisei 1.' },
      { q: 'Pourquoi la première année s’écrit-elle 元年 ?', a: 'C’est le mot japonais pour l’année inaugurale d’une ère. Elle compte pour un, mais les documents écrivent 元年.' },
      { q: 'Comment convertir dans l’autre sens ?', a: 'Soustrayez le nombre de l’ère à l’année occidentale : 2024 − 2018 = 6, donc Reiwa 6.' },
    ],
    [
      { q: 'रेइवा 6 कौन सा वर्ष है?', a: '2024। रेइवा में युग वर्ष में 2018 जोड़ते हैं।' },
      { q: 'हेइसेइ कहाँ तक चला?', a: 'हेइसेइ 31 तक। यह 30 अप्रैल 2019 को समाप्त हुआ और अगले दिन रेइवा शुरू हुआ।' },
      { q: 'शोवा 64 कितने दिन रहा?', a: 'सात दिन, 1 से 7 जनवरी 1989 तक। 8 तारीख़ से हेइसेइ 1 था।' },
      { q: 'पहला वर्ष 元年 क्यों लिखा जाता है?', a: 'यह जापानी में युग के पहले वर्ष का नाम है। गणना में एक गिना जाता है, पर दस्तावेज़ों में 元年 लिखा जाता है।' },
      { q: 'उल्टा रूपांतरण कैसे करें?', a: 'पश्चिमी वर्ष में से युग की संख्या घटाएँ: 2024 − 2018 = 6, यानी रेइवा 6।' },
    ],
    [
      { q: '令和 6 年是公元哪一年？', a: '2024 年。令和是把年号年数加上 2018。' },
      { q: '平成到哪一年为止？', a: '到平成 31 年。2019 年 4 月 30 日结束，次日起进入令和。' },
      { q: '昭和 64 年只有几天？', a: '七天，1989 年 1 月 1 日到 7 日。1 月 8 日起是平成元年。' },
      { q: '第一年为什么写作「元年」？', a: '这是日语里年号首年的说法。计算时算作 1，文件上写元年。' },
      { q: '怎么反过来换算？', a: '用公元年减去该年号的数：2024 − 2018 = 6，即令和 6 年。' },
    ],
    [
      { q: '令和 6 年是西元哪一年？', a: '2024 年。令和是把年號年數加上 2018。' },
      { q: '平成到哪一年為止？', a: '到平成 31 年。2019 年 4 月 30 日結束，次日起進入令和。' },
      { q: '昭和 64 年只有幾天？', a: '七天，1989 年 1 月 1 日到 7 日。1 月 8 日起是平成元年。' },
      { q: '第一年為什麼寫作「元年」？', a: '這是日語裡年號首年的說法。計算時算作 1，文件上寫元年。' },
      { q: '怎麼反過來換算？', a: '用西元年減去該年號的數：2024 − 2018 = 6，即令和 6 年。' },
    ],
  ),

  cellFaq: T<(f: GengoFacts) => FaqItem[]>(
    f => [
      { q: `${eKo[f.cell.era]} ${f.first ? '원년' : `${f.cell.year}년`}은 서기 몇 년인가요?`, a: `${f.gregorian}년입니다. ${f.cell.year}에 ${f.era.base}을 더한 값입니다.` },
      { q: `이 연호는 언제부터 언제까지인가요?`, a: `${f.era.from}에 시작해 ${f.era.until ?? '지금까지 이어집니다'}${f.era.until ? '에 끝났습니다' : ''}. 마지막 해는 ${f.era.last}년입니다.` },
      { q: f.overlap ? `이 해에 다른 연호도 있나요?` : `이 해에 연호가 하나뿐인가요?`, a: f.overlap ? `있습니다. ${f.gregorian}년은 ${eKo[f.overlap.era]} ${f.overlap.year === 1 ? '원년' : `${f.overlap.year}년`}이기도 합니다. ${f.overlap.sameDay ? '즉일 개원이라 같은 날이 두 연호에 함께 듭니다.' : '익일 개원이라 하루로 갈립니다.'}` : `그렇습니다. 개원한 해가 아니라 연호가 하나뿐입니다.` },
      { q: `서기에서 거꾸로 옮기려면요?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}입니다.` },
    ],
    f => [
      { q: `What Western year is ${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year}?`, a: `${f.gregorian} — the era year plus ${f.era.base}.` },
      { q: `When did this era run?`, a: `From ${f.era.from}${f.era.until ? ` to ${f.era.until}` : ' and it is still running'}. Its last year is ${f.era.last}.` },
      { q: f.overlap ? `Does another era share this year?` : `Is there only one era in this year?`, a: f.overlap ? `Yes — ${f.gregorian} is also ${eEn[f.overlap.era]} ${f.overlap.year}. ${f.overlap.sameDay ? 'The change fell on the same day, so one day belongs to both eras.' : 'The change fell the next day, so a single day separates them.'}` : `Yes. This is not a year in which the era changed.` },
      { q: `How do I convert back?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}.` },
    ],
    f => [
      { q: `¿A qué año equivale ${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year}?`, a: `A ${f.gregorian}: el año de era más ${f.era.base}.` },
      { q: `¿Cuándo duró esta era?`, a: `Desde ${f.era.from}${f.era.until ? ` hasta ${f.era.until}` : ' y sigue en curso'}. Su último año es el ${f.era.last}.` },
      { q: f.overlap ? `¿Otra era comparte este año?` : `¿Hay una sola era en este año?`, a: f.overlap ? `Sí: ${f.gregorian} es también ${eEn[f.overlap.era]} ${f.overlap.year}. ${f.overlap.sameDay ? 'El cambio fue el mismo día, así que un día pertenece a ambas.' : 'El cambio fue al día siguiente, así que las separa un día.'}` : `Sí. No es un año de cambio de era.` },
      { q: `¿Cómo se convierte al revés?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}.` },
    ],
    f => [
      { q: `A que ano corresponde ${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year}?`, a: `A ${f.gregorian}: o ano da era mais ${f.era.base}.` },
      { q: `Quando durou esta era?`, a: `De ${f.era.from}${f.era.until ? ` a ${f.era.until}` : ' e continua em curso'}. Seu último ano é ${f.era.last}.` },
      { q: f.overlap ? `Outra era divide este ano?` : `Há uma só era neste ano?`, a: f.overlap ? `Sim: ${f.gregorian} também é ${eEn[f.overlap.era]} ${f.overlap.year}. ${f.overlap.sameDay ? 'A mudança foi no mesmo dia, então um dia pertence às duas.' : 'A mudança foi no dia seguinte, então um dia as separa.'}` : `Sim. Não é um ano de mudança de era.` },
      { q: `Como converter de volta?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}.` },
    ],
    f => [
      { q: `${eJa[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}は西暦何年ですか？`, a: `${f.gregorian}年です。${f.cell.year}に${f.era.base}を足した値です。` },
      { q: `この元号はいつからいつまでですか？`, a: `${f.era.from}に始まり${f.era.until ? `${f.era.until}に終わりました` : '今も続いています'}。最後の年は${f.era.last}年です。` },
      { q: f.overlap ? `この年に別の元号もありますか？` : `この年の元号は一つだけですか？`, a: f.overlap ? `あります。${f.gregorian}年は${eJa[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}でもあります。${f.overlap.sameDay ? '即日改元なので同じ日が二つの元号に入ります。' : '翌日改元なので一日で分かれます。'}` : `はい。改元の年ではないので元号は一つです。` },
      { q: `西暦から戻すには？`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}です。` },
    ],
    f => [
      { q: `Welches Jahr ist ${eEn[f.cell.era]} ${f.first ? 'Gannen' : f.cell.year}?`, a: `${f.gregorian} — Ärajahr plus ${f.era.base}.` },
      { q: `Wann lief diese Ära?`, a: `Von ${f.era.from}${f.era.until ? ` bis ${f.era.until}` : ' und sie läuft noch'}. Ihr letztes Jahr ist ${f.era.last}.` },
      { q: f.overlap ? `Teilt sich eine andere Ära dieses Jahr?` : `Gibt es in diesem Jahr nur eine Ära?`, a: f.overlap ? `Ja — ${f.gregorian} ist auch ${eEn[f.overlap.era]} ${f.overlap.year}. ${f.overlap.sameDay ? 'Der Wechsel fiel auf denselben Tag, ein Tag gehört beiden Ären.' : 'Der Wechsel fiel auf den Folgetag, ein Tag trennt sie.'}` : `Ja. In diesem Jahr wechselte die Ära nicht.` },
      { q: `Wie rechne ich zurück?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}.` },
    ],
    f => [
      { q: `À quelle année correspond ${eEn[f.cell.era]} ${f.first ? 'gannen' : f.cell.year} ?`, a: `À ${f.gregorian} : l’année d’ère plus ${f.era.base}.` },
      { q: `Quand cette ère a-t-elle duré ?`, a: `De ${f.era.from}${f.era.until ? ` à ${f.era.until}` : ' et elle se poursuit'}. Sa dernière année est ${f.era.last}.` },
      { q: f.overlap ? `Une autre ère partage-t-elle cette année ?` : `N’y a-t-il qu’une ère cette année-là ?`, a: f.overlap ? `Oui : ${f.gregorian} est aussi ${eEn[f.overlap.era]} ${f.overlap.year}. ${f.overlap.sameDay ? 'Le changement a eu lieu le jour même : une journée appartient aux deux ères.' : 'Le changement a eu lieu le lendemain : une journée les sépare.'}` : `Oui. Ce n’est pas une année de changement d’ère.` },
      { q: `Comment convertir en sens inverse ?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}.` },
    ],
    f => [
      { q: `${eHi[f.cell.era]} ${f.first ? 'गन्नेन' : f.cell.year} कौन सा पश्चिमी वर्ष है?`, a: `${f.gregorian} — युग वर्ष में ${f.era.base} जोड़कर।` },
      { q: `यह युग कब से कब तक रहा?`, a: `${f.era.from} से${f.era.until ? ` ${f.era.until} तक` : ' और अब भी चल रहा है'}। इसका अंतिम वर्ष ${f.era.last} है।` },
      { q: f.overlap ? `क्या इस वर्ष कोई दूसरा युग भी है?` : `क्या इस वर्ष केवल एक ही युग है?`, a: f.overlap ? `हाँ — ${f.gregorian} ${eHi[f.overlap.era]} ${f.overlap.year} भी है। ${f.overlap.sameDay ? 'बदलाव उसी दिन हुआ, इसलिए एक दिन दोनों युगों का है।' : 'बदलाव अगले दिन हुआ, इसलिए एक दिन उन्हें अलग करता है।'}` : `हाँ। यह युग बदलने का वर्ष नहीं है।` },
      { q: `उल्टा कैसे बदलें?`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}।` },
    ],
    f => [
      { q: `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}是公元哪一年？`, a: `${f.gregorian} 年，即年号年数加 ${f.era.base}。` },
      { q: `这个年号从何时到何时？`, a: `${f.era.from} 开始${f.era.until ? `，${f.era.until} 结束` : '，至今仍在延续'}。最后一年是 ${f.era.last} 年。` },
      { q: f.overlap ? `这一年还有别的年号吗？` : `这一年只有一个年号吗？`, a: f.overlap ? `有。${f.gregorian} 年同时也是${eZh[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}。${f.overlap.sameDay ? '当日改元，所以同一天属于两个年号。' : '次日改元，一天之隔。'}` : `是的，这一年没有改元。` },
      { q: `怎么反过来换算？`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}。` },
    ],
    f => [
      { q: `${eZh[f.cell.era]}${f.first ? '元年' : `${f.cell.year}年`}是西元哪一年？`, a: `${f.gregorian} 年，即年號年數加 ${f.era.base}。` },
      { q: `這個年號從何時到何時？`, a: `${f.era.from} 開始${f.era.until ? `，${f.era.until} 結束` : '，至今仍在延續'}。最後一年是 ${f.era.last} 年。` },
      { q: f.overlap ? `這一年還有別的年號嗎？` : `這一年只有一個年號嗎？`, a: f.overlap ? `有。${f.gregorian} 年同時也是${eZh[f.overlap.era]}${f.overlap.year === 1 ? '元年' : `${f.overlap.year}年`}。${f.overlap.sameDay ? '當日改元，所以同一天屬於兩個年號。' : '次日改元，一天之隔。'}` : `是的，這一年沒有改元。` },
      { q: `怎麼反過來換算？`, a: `${f.gregorian} − ${f.era.base} = ${f.cell.year}。` },
    ],
  ),
};

/** 항목별 열 언어 표를 언어별 한 벌로 뒤집는다 */
export const GENGO_UI: L<GengoUI> = Object.fromEntries(
  LANG_CODES.map(lang => [
    lang,
    Object.fromEntries(Object.entries(SPEC).map(([key, byLang]) => [key, (byLang as L<unknown>)[lang as Lang]])),
  ]),
) as unknown as L<GengoUI>;
