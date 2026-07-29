/**
 * 공식 도구 화면의 3언어 문구 — 비율·몸 수치·도형이 함께 쓴다.
 *
 * 섹션 이름과 소개만 섹션별로 다르고 나머지 라벨("계산식", "결과" 같은 것들)은
 * 전부 같다. 섹션마다 사전을 복사하면 세 벌이 서로 어긋나기 시작하므로
 * 공통 문구는 여기 한 벌만 둔다.
 */
import type { Lang } from './terms.ts';

export const FORMULA_UI = {
  ko: {
    home: '홈',
    inputs: '값 입력',
    result: '결과',
    formula: '계산식',
    interpret: '해석',
    related: '함께 쓰는 계산',
    reset: '기본값으로',
    copy: '결과 복사',
    copied: '✅ 복사했습니다',
    categoryAll: '전체',
    faqHow: (t: string) => `${t}는 어떻게 계산하나요?`,
    faqExample: '예를 들어 계산해 주세요.',
    faqCaution: '주의할 점이 있나요?',
    exampleLead: (input: string, out: string) => `${input}일 때 ${out}입니다.`,
  },
  en: {
    home: 'Home',
    inputs: 'Your numbers',
    result: 'Result',
    formula: 'Formula',
    interpret: 'What it means',
    related: 'Related calculators',
    reset: 'Reset to defaults',
    copy: 'Copy result',
    copied: '✅ Copied',
    categoryAll: 'All',
    faqHow: (t: string) => `How is ${t} calculated?`,
    faqExample: 'Can you walk through an example?',
    faqCaution: 'Anything to watch out for?',
    exampleLead: (input: string, out: string) => `With ${input}, the answer is ${out}.`,
  },
  zh: {
    home: '首页',
    inputs: '输入数值',
    result: '结果',
    formula: '计算公式',
    interpret: '结果解读',
    related: '相关计算器',
    reset: '恢复默认值',
    copy: '复制结果',
    copied: '✅ 已复制',
    categoryAll: '全部',
    faqHow: (t: string) => `${t}是怎么计算的？`,
    faqExample: '能举个例子吗？',
    faqCaution: '有什么需要注意的？',
    exampleLead: (input: string, out: string) => `当${input}时，结果是${out}。`,
  },
} as const;

/** 언어 전환 링크 — 세 언어가 같은 slug를 쓴다 */
export const FORMULA_LANGS: { lang: Lang; label: string; prefix: string }[] = [
  { lang: 'ko', label: '한국어', prefix: '' },
  { lang: 'en', label: 'EN', prefix: '/en' },
  { lang: 'zh', label: '中文', prefix: '/zh' },
];

/** hreflang 묶음 — 섹션과 slug만 넣으면 네 줄이 기계적으로 나온다 */
export function sectionAlternates(section: string, slug?: string) {
  const path = slug ? `/${section}/${slug}` : `/${section}`;
  return { 'ko': path, 'en': `/en${path}`, 'zh': `/zh${path}`, 'x-default': `/en${path}` };
}

/** 1,200,000처럼 세 자리마다 끊는다. 세 언어 모두 쉼표를 쓴다 */
export const groupNum = (n: number, digits: number): string => {
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(n);
};
