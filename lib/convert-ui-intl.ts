/**
 * 단위 변환 화면의 3언어 문구.
 *
 * 다른 세션이 시간 도구에 쓴 lib/time-ui-intl.ts와 같은 방식이다 — 컴포넌트는
 * lang을 받아 사전에서 문구를 꺼내 쓰고, 계산 로직은 언어와 무관하게 하나만 둔다.
 */
export type ConvertLang = 'ko' | 'en' | 'zh';

export const CONVERT_UI = {
  ko: {
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
  zh: {
    section: '单位换算',
    home: '首页',
    quickTitle: '常用数值',
    formula: '计算公式',
    copy: (l: string, f: string, r: string, t: string) => `复制 ${l}${f} = ${r}${t}`,
    copied: '✅ 已复制',
    related: '其他单位换算',
    hubTitle: '单位换算',
    hubLead: '从英寸、磅到韩国的평(坪)、근(斤)等传统单位',
    hubNotice: '🔢 双向换算 — 在任意一栏输入，另一栏自动变化。',
    footNote: '传统单位(근、되、마지기等)的数值因地区和品类而异。',
    suffix: '换算',
    faq1: (f: string, t: string) => `1${f}等于多少${t}？`,
    faq1a: (f: string, t: string, one: string, ten: string) =>
      `1${f}等于${one}${t}，10${f}等于${ten}${t}。在上方输入框填入任意数值即可立即换算。`,
    faq2: (f: string, t: string) => `反过来，1${t}等于多少${f}？`,
    faq2a: (f: string, t: string, one: string) =>
      `1${t}等于${one}${f}。本页为双向换算，在右栏输入数值时左栏会自动变化。`,
    faq3: '这个单位用在哪里？',
  },
} as const;

/** 언어 전환 링크 — 세 언어 어디서든 나머지 둘로 갈 수 있게 */
export const LANG_LINKS: { lang: ConvertLang; label: string; prefix: string }[] = [
  { lang: 'ko', label: '한국어', prefix: '' },
  { lang: 'en', label: 'EN', prefix: '/en' },
  { lang: 'zh', label: '中文', prefix: '/zh' },
];

/** hreflang 묶음 — 세 언어가 모두 같은 slug를 쓰므로 기계적으로 만든다 */
export function convertAlternates(slug?: string) {
  const path = slug ? `/convert/${slug}` : '/convert';
  return {
    'ko': path,
    'en': `/en${path}`,
    'zh': `/zh${path}`,
    'x-default': `/en${path}`,
  };
}
