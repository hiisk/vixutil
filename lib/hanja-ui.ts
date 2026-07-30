/** 사자성어 화면의 3언어 문구와 섹션 설정 */
import type { Lang } from './formula/terms.ts';
import { IDIOMS, HANJA_CATEGORIES } from './hanja-tools.ts';
import type { Idiom } from './hanja/types.ts';

export const HANJA_UI = {
  ko: {
    home: '홈',
    section: '사자성어',
    hubTitle: '사자성어 사전',
    hubLead: '뜻과 유래, 실제로 쓰는 예까지 한 장에 담은 사자성어 50개',
    hubNotice: '📖 글자마다 새김을 붙여 네 글자가 어떻게 한 뜻이 되는지 보여줍니다.',
    footNote: '한국에서 쓰는 사자성어에는 중국 고전에서 온 것과 한국에서 만들어진 것이 섞여 있습니다. 중국에서 쓰이지 않는 표현은 설명에 그 사실을 적었습니다.',
    metaTitle: '사자성어 사전 — 뜻·유래·쓰임 50개',
    metaDesc:
      '사면초가, 새옹지마, 우공이산, 청출어람 등 자주 쓰는 사자성어 50개의 뜻과 유래, 글자별 새김, 실제 쓰는 예를 한자·독음·병음과 함께 정리했습니다.',
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
    hubLead: 'Fifty sajaseong-eo with meaning, origin and how they are actually used',
    hubNotice: '📖 Each character is glossed so you can see how four of them make one meaning.',
    footNote: 'The idioms used in Korea mix phrases from the Chinese classics with ones coined in Korea. Where an expression is not used in China, the entry says so.',
    metaTitle: 'Korean Four-Character Idioms — Meaning, Origin & Usage (50)',
    metaDesc:
      'Fifty common Korean four-character idioms — sa-myeon-cho-ga, sae-ong-ji-ma, u-gong-i-san, cheong-chul-eo-ram and more — with meanings, classical origins, character-by-character glosses, hanja, romanisation and pinyin.',
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
  zh: {
    home: '首页',
    section: '四字成语',
    hubTitle: '韩国四字成语词典',
    hubLead: '50个四字成语的含义、出处和实际用法',
    hubNotice: '📖 逐字注释，让你看清四个字如何组成一个意思。',
    footNote: '韩国使用的四字成语中，既有源自中国古籍的，也有在韩国自行形成的。凡在中文里不通用的说法，条目中均已注明。',
    metaTitle: '韩国四字成语词典 — 含义、出处与用法50则',
    metaDesc:
      '四面楚歌、塞翁之马、愚公移山、青出于蓝等50个韩国常用四字成语，附含义、古籍出处、逐字注释、韩文读音与拼音。',
    reading: '韩文读音',
    hanjaLabel: '正体',
    simplified: '简体',
    pinyin: '拼音',
    charsTitle: '逐字与韩文读音',
    meaningTitle: '含义',
    originTitle: '出处',
    usageTitle: '用法',
    related: '同类成语',
    faq1: (r: string) => `${r}是什么意思？`,
    faq2: (r: string) => `${r}出自哪里？`,
    faq3: (r: string) => `${r}怎么用？`,
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
  zh: {
    '처세·태도': '处世与态度', '노력·인내': '努力与忍耐', '관계·사람': '人际与情谊',
    '상황·형세': '情势与处境', '배움·지혜': '学习与智慧', '말·글': '言语与文辞',
  },
};

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

/** 표제 — 언어마다 무엇을 앞에 둘지 다르다 */
export function idiomHeading(i: Idiom, lang: Lang): string {
  return lang === 'zh' ? i.simplified : lang === 'en' ? i[lang].title : i.reading;
}

export function hanjaFaq(i: Idiom, lang: Lang) {
  const ui = HANJA_UI[lang];
  const t = i[lang];
  const key = lang === 'ko' ? i.reading : lang === 'zh' ? i.simplified : t.title;
  return [
    { q: ui.faq1(key), a: `${i.hanja} · ${t.meaning}` },
    { q: ui.faq2(key), a: t.origin },
    { q: ui.faq3(key), a: t.usage },
  ];
}

export function hanjaAlternates(slug?: string) {
  const path = slug ? `/hanja/${slug}` : '/hanja';
  return { 'ko': path, 'en': `/en${path}`, 'zh': `/zh${path}`, 'x-default': `/en${path}` };
}
