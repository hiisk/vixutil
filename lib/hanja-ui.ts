/** 사자성어 화면의 여덟 언어 문구와 섹션 설정 */
import type { Lang, FormulaLang } from './formula/terms.ts';
import { IDIOMS, HANJA_CATEGORIES } from './hanja-tools.ts';
import type { Idiom } from './hanja/types.ts';
import { idiomText } from './hanja/types.ts';
import { ALL_LOCALES, alternateLanguagesFor } from './locales.ts';

export const HANJA_UI = {
  ko: {
    home: '홈',
    section: '사자성어',
    hubTitle: '사자성어 사전',
    hubLead: '뜻과 유래, 실제로 쓰는 예까지 한 장에 담은 사자성어 100개',
    hubNotice: '📖 글자마다 새김을 붙여 네 글자가 어떻게 한 뜻이 되는지 보여줍니다.',
    footNote: '한국에서 쓰는 사자성어에는 중국 고전에서 온 것과 한국에서 만들어진 것이 섞여 있습니다. 중국에서 쓰이지 않는 표현은 설명에 그 사실을 적었습니다.',
    metaTitle: '사자성어 사전 — 뜻·유래·쓰임 100개',
    metaDesc:
      '사면초가, 새옹지마, 우공이산, 청출어람 등 자주 쓰는 사자성어 100개의 뜻과 유래, 글자별 새김, 실제 쓰는 예를 한자·독음·병음과 함께 정리했습니다.',
    reading: '독음',
    hanjaLabel: '한자',
    simplified: '간체',
    pinyin: '병음',
    charsTitle: '글자마다 새김',
    meaningTitle: '뜻',
    originTitle: '유래',
    usageTitle: '이렇게 씁니다',
    related: '같은 갈래의 성어',
    faq1: (r: string) => `${r}는 무슨 뜻인가요?`,
    faq2: (r: string) => `${r}는 어디서 나온 말인가요?`,
    faq3: (r: string) => `${r}는 어떻게 쓰나요?`,
  },
  en: {
    home: 'Home',
    section: 'Korean Idioms',
    hubTitle: 'Four-Character Idiom Dictionary',
    hubLead: 'A hundred sajaseong-eo with meaning, origin and how they are actually used',
    hubNotice: '📖 Each character is glossed so you can see how four of them make one meaning.',
    footNote: 'The idioms used in Korea mix phrases from the Chinese classics with ones coined in Korea. Where an expression is not used in China, the entry says so.',
    metaTitle: 'Korean Four-Character Idioms — Meaning, Origin & Usage (100)',
    metaDesc:
      'A hundred common Korean four-character idioms — sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram and more — with meanings, classical origins, character-by-character glosses, hanja, romanisation and pinyin.',
    reading: 'Korean reading',
    hanjaLabel: 'Hanja',
    simplified: 'Simplified',
    pinyin: 'Pinyin',
    charsTitle: 'Character by character',
    meaningTitle: 'Meaning',
    originTitle: 'Origin',
    usageTitle: 'How it is used',
    related: 'Idioms in the same group',
    faq1: (r: string) => `What does ${r} mean?`,
    faq2: (r: string) => `Where does ${r} come from?`,
    faq3: (r: string) => `How is ${r} used?`,
  },
  es: {
    home: 'Inicio',
    section: 'Modismos coreanos',
    hubTitle: 'Diccionario de modismos de cuatro caracteres',
    hubLead: 'Cien sajaseong-eo con su sentido, su origen y cómo se usan de verdad',
    hubNotice: '📖 Cada carácter lleva su glosa, para que se vea cómo cuatro de ellos forman un solo sentido.',
    footNote: 'Los modismos que se usan en Corea mezclan expresiones de los clásicos chinos con otras acuñadas en Corea. Cuando una expresión no se usa en China, la entrada lo dice.',
    metaTitle: 'Modismos coreanos de cuatro caracteres — sentido, origen y uso (100)',
    metaDesc: 'Cien modismos coreanos de cuatro caracteres —sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram y más— con su sentido, su origen clásico, la glosa carácter por carácter, el hanja, la romanización y el pinyin.',
    reading: 'Lectura coreana',
    hanjaLabel: 'Hanja',
    simplified: 'Simplificado',
    pinyin: 'Pinyin',
    charsTitle: 'Carácter por carácter',
    meaningTitle: 'Sentido',
    originTitle: 'Origen',
    usageTitle: 'Cómo se usa',
    related: 'Modismos del mismo grupo',
    faq1: (r: string) => `¿Qué significa ${r}?`,
    faq2: (r: string) => `¿De dónde viene ${r}?`,
    faq3: (r: string) => `¿Cómo se usa ${r}?`,
  },
  'pt-br': {
    home: 'Início',
    section: 'Expressões coreanas',
    hubTitle: 'Dicionário de expressões de quatro caracteres',
    hubLead: 'Cem sajaseong-eo com sentido, origem e como são de fato usadas',
    hubNotice: '📖 Cada caractere vem glosado, para você ver como quatro deles formam um sentido só.',
    footNote: 'As expressões usadas na Coreia misturam frases dos clássicos chineses com outras cunhadas na Coreia. Quando uma expressão não é usada na China, o verbete diz isso.',
    metaTitle: 'Expressões coreanas de quatro caracteres — sentido, origem e uso (100)',
    metaDesc: 'Cem expressões coreanas de quatro caracteres — sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram e outras — com sentido, origem clássica, glosa caractere por caractere, hanja, romanização e pinyin.',
    reading: 'Leitura coreana',
    hanjaLabel: 'Hanja',
    simplified: 'Simplificado',
    pinyin: 'Pinyin',
    charsTitle: 'Caractere por caractere',
    meaningTitle: 'Sentido',
    originTitle: 'Origem',
    usageTitle: 'Como se usa',
    related: 'Expressões do mesmo grupo',
    faq1: (r: string) => `O que significa ${r}?`,
    faq2: (r: string) => `De onde vem ${r}?`,
    faq3: (r: string) => `Como se usa ${r}?`,
  },
  ja: {
    home: 'ホーム',
    section: '四字熟語',
    hubTitle: '韓国の四字熟語辞典',
    hubLead: '意味・由来・実際の使い方まで一枚にまとめた四字熟語100',
    hubNotice: '📖 一字ずつ意味を添えて、四字がどう一つの意味になるかを見せます。',
    footNote: '韓国で使われる四字熟語には、中国の古典から来たものと韓国で作られたものが混ざっています。日本で使わない言い方は、その旨を各項に記しました。',
    metaTitle: '韓国の四字熟語100 — 意味・由来・使い方',
    metaDesc: '四面楚歌、塞翁之馬、愚公移山、青出於藍など、韓国でよく使う四字熟語100語の意味と由来、一字ずつの読み解き、実際の使い方を、漢字・韓国語の読み・ピンインとともにまとめました。',
    reading: '韓国語の読み',
    hanjaLabel: '漢字',
    simplified: '簡体字',
    pinyin: 'ピンイン',
    charsTitle: '一字ずつ',
    meaningTitle: '意味',
    originTitle: '由来',
    usageTitle: 'こう使います',
    related: '同じ分類の熟語',
    faq1: (r: string) => `${r}はどういう意味ですか。`,
    faq2: (r: string) => `${r}はどこから来た言葉ですか。`,
    faq3: (r: string) => `${r}はどう使いますか。`,
  },
  de: {
    home: 'Start',
    section: 'Koreanische Redewendungen',
    hubTitle: 'Wörterbuch der Vier-Zeichen-Redewendungen',
    hubLead: 'Hundert Sajaseong-eo mit Bedeutung, Herkunft und tatsächlichem Gebrauch',
    hubNotice: '📖 Jedes Zeichen ist glossiert, damit sichtbar wird, wie vier davon eine Bedeutung ergeben.',
    footNote: 'Die in Korea gebräuchlichen Redewendungen mischen Wendungen aus den chinesischen Klassikern mit in Korea geprägten. Wo ein Ausdruck in China nicht gebraucht wird, sagt der Eintrag es.',
    metaTitle: 'Koreanische Vier-Zeichen-Redewendungen — Bedeutung, Herkunft, Gebrauch (100)',
    metaDesc: 'Hundert gebräuchliche koreanische Vier-Zeichen-Redewendungen — sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram und mehr — mit Bedeutung, klassischer Herkunft, Glosse Zeichen für Zeichen, Hanja, Umschrift und Pinyin.',
    reading: 'Koreanische Lesung',
    hanjaLabel: 'Hanja',
    simplified: 'Kurzzeichen',
    pinyin: 'Pinyin',
    charsTitle: 'Zeichen für Zeichen',
    meaningTitle: 'Bedeutung',
    originTitle: 'Herkunft',
    usageTitle: 'So wird es gebraucht',
    related: 'Redewendungen derselben Gruppe',
    faq1: (r: string) => `Was bedeutet ${r}?`,
    faq2: (r: string) => `Woher kommt ${r}?`,
    faq3: (r: string) => `Wie wird ${r} gebraucht?`,
  },
  fr: {
    home: 'Accueil',
    section: 'Expressions coréennes',
    hubTitle: 'Dictionnaire des expressions à quatre caractères',
    hubLead: 'Cent sajaseong-eo avec leur sens, leur origine et leur usage réel',
    hubNotice: '📖 Chaque caractère est glosé, pour voir comment quatre d’entre eux font un seul sens.',
    footNote: 'Les expressions employées en Corée mêlent des formules des classiques chinois et d’autres forgées en Corée. Quand une expression ne s’emploie pas en Chine, la notice le précise.',
    metaTitle: 'Expressions coréennes à quatre caractères — sens, origine et usage (100)',
    metaDesc: 'Cent expressions coréennes à quatre caractères — sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram et d’autres — avec leur sens, leur origine classique, la glose caractère par caractère, le hanja, la romanisation et le pinyin.',
    reading: 'Lecture coréenne',
    hanjaLabel: 'Hanja',
    simplified: 'Simplifié',
    pinyin: 'Pinyin',
    charsTitle: 'Caractère par caractère',
    meaningTitle: 'Sens',
    originTitle: 'Origine',
    usageTitle: 'Comment on l’emploie',
    related: 'Expressions du même groupe',
    faq1: (r: string) => `Que veut dire ${r} ?`,
    faq2: (r: string) => `D’où vient ${r} ?`,
    faq3: (r: string) => `Comment emploie-t-on ${r} ?`,
  },
  hi: {
    home: 'होम',
    section: 'कोरियाई मुहावरे',
    hubTitle: 'चार-अक्षरी मुहावरों का शब्दकोश',
    hubLead: 'सौ साजासोंग-ओ — अर्थ, उद्गम और असल इस्तेमाल के साथ',
    hubNotice: '📖 हर अक्षर का अर्थ अलग से दिया है, ताकि दिखे कि चार अक्षर मिलकर एक अर्थ कैसे बनाते हैं।',
    footNote: 'कोरिया में चलने वाले मुहावरों में चीनी ग्रंथों से आए और कोरिया में ही गढ़े गए, दोनों तरह के हैं। जो चीन में नहीं चलता, वह हर प्रविष्टि में बता दिया गया है।',
    metaTitle: 'कोरियाई चार-अक्षरी मुहावरे — अर्थ, उद्गम और प्रयोग (100)',
    metaDesc: 'सा-म्योन-चो-गा, से-ओंग-जी-मा, उ-गोंग-इ-सान, चोंग-चुल-ओ-राम जैसे सौ कोरियाई चार-अक्षरी मुहावरे — अर्थ, शास्त्रीय उद्गम, अक्षर-दर-अक्षर व्याख्या, हांजा, रोमन लिप्यंतरण और पिनयिन के साथ।',
    reading: 'कोरियाई उच्चारण',
    hanjaLabel: 'हांजा',
    simplified: 'सरलीकृत',
    pinyin: 'पिनयिन',
    charsTitle: 'अक्षर दर अक्षर',
    meaningTitle: 'अर्थ',
    originTitle: 'उद्गम',
    usageTitle: 'ऐसे इस्तेमाल होता है',
    related: 'इसी वर्ग के मुहावरे',
    faq1: (r: string) => `${r} का क्या अर्थ है?`,
    faq2: (r: string) => `${r} कहाँ से आया है?`,
    faq3: (r: string) => `${r} का इस्तेमाल कैसे होता है?`,
  },
} as const;

export const HANJA_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '처세·태도': '처세·태도', '노력·인내': '노력·인내', '관계·사람': '관계·사람',
    '상황·형세': '상황·형세', '배움·지혜': '배움·지혜', '말·글': '말·글',
  },
  en: {
    '처세·태도': 'Conduct & Attitude', '노력·인내': 'Effort & Endurance', '관계·사람': 'People & Bonds',
    '상황·형세': 'Situations', '배움·지혜': 'Learning & Wisdom', '말·글': 'Words & Speech',
  },
};

export const HANJA_CATEGORY_INTL: Partial<Record<FormulaLang, Record<string, string>>> = {
  es: {
    '처세·태도': 'Conducta y actitud', '노력·인내': 'Esfuerzo y constancia', '관계·사람': 'Vínculos y personas',
    '상황·형세': 'Situaciones', '배움·지혜': 'Aprender y saber', '말·글': 'Palabra y escritura',
  },
  'pt-br': {
    '처세·태도': 'Conduta e atitude', '노력·인내': 'Esforço e persistência', '관계·사람': 'Vínculos e pessoas',
    '상황·형세': 'Situações', '배움·지혜': 'Aprender e saber', '말·글': 'Palavra e escrita',
  },
  ja: {
    '처세·태도': '処世・態度', '노력·인내': '努力・忍耐', '관계·사람': '関係・人',
    '상황·형세': '状況・形勢', '배움·지혜': '学び・知恵', '말·글': '言葉・文章',
  },
  de: {
    '처세·태도': 'Haltung und Umgang', '노력·인내': 'Mühe und Ausdauer', '관계·사람': 'Bindungen und Menschen',
    '상황·형세': 'Lagen', '배움·지혜': 'Lernen und Weisheit', '말·글': 'Wort und Schrift',
  },
  fr: {
    '처세·태도': 'Conduite et attitude', '노력·인내': 'Effort et endurance', '관계·사람': 'Liens et personnes',
    '상황·형세': 'Situations', '배움·지혜': 'Apprendre et savoir', '말·글': 'Parole et écrit',
  },
  hi: {
    '처세·태도': 'आचरण और रवैया', '노력·인내': 'मेहनत और धैर्य', '관계·사람': 'रिश्ते और लोग',
    '상황·형세': 'परिस्थितियाँ', '배움·지혜': 'सीख और समझ', '말·글': 'बोली और लेखन',
  },
};

/** 여덟 언어가 다 열려 있다 */
export const HANJA_LANGS: FormulaLang[] = ['ko', 'en', 'es', 'pt-br', 'ja', 'de', 'fr', 'hi'];

/** 갈래 이름 — 번역이 없으면 영어로 떨어뜨린다 */
export const hanjaCategories = (lang: FormulaLang): Record<string, string> =>
  lang === 'ko' || lang === 'en'
    ? HANJA_CATEGORY_LABEL[lang]
    : HANJA_CATEGORY_INTL[lang] ?? HANJA_CATEGORY_LABEL.en;

export const HANJA_SECTION = {
  key: 'hanja',
  idioms: IDIOMS,
  categories: HANJA_CATEGORIES,
  accent: 'amber' as const,
  grad: 'from-amber-500 to-orange-600',
  hoverBorder: 'hover:border-amber-300',
  textAccent: 'text-amber-600',
  hoverText: 'group-hover:text-amber-700',
  linkHover: 'hover:text-amber-600',
  ogFrom: '#f59e0b',
  ogTo: '#ea580c',
};

/**
 * 표제 — 언어마다 무엇을 앞에 둘지 다르다.
 *
 * 한국어는 독음을 그대로 쓰고, 일본어는 일본 음독을 붙인 표제를 쓴다.
 * 나머지 언어는 로마자 표기라야 읽을 수 있다.
 */
export function idiomHeading(i: Idiom, lang: FormulaLang): string {
  return lang === 'ko' ? i.reading : idiomText(i, lang).title;
}

export function hanjaFaq(i: Idiom, lang: FormulaLang) {
  const ui = HANJA_UI[lang];
  const t = idiomText(i, lang);
  const key = lang === 'ko' ? i.reading : t.title;
  return [
    { q: ui.faq1(key), a: `${i.hanja} · ${t.meaning}` },
    { q: ui.faq2(key), a: t.origin },
    { q: ui.faq3(key), a: t.usage },
  ];
}

export function hanjaAlternates(slug?: string) {
  const path = slug ? `/hanja/${slug}` : '/hanja';
  return alternateLanguagesFor(path, [...ALL_LOCALES]);
}
