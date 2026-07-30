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
    faqInputs: '어떤 값을 넣어야 하나요?',
    faqInputsLead: (list: string) => `${list}을 넣습니다. 값을 고치면 결과가 바로 다시 계산되고, 빈칸은 0으로 봅니다.`,
    faqAnother: '값을 바꾸면 결과가 어떻게 달라지나요?',
    faqAnotherLead: (pivot: string, a: string, b: string) => `${pivot}만 바꿔 보면 ${a}, ${b}로 달라집니다. 아래 표에 다섯 단계로 정리해 두었습니다.`,
    faqRounding: '결과는 어디까지 반올림하나요?',
    faqRoundingLead: '금액은 1원 단위, 비율은 소수점 한 자리, 그 밖의 값은 소수점 두 자리까지 보여 줍니다. 화면에 보이는 값은 반올림한 것이고 계산은 반올림 전 값으로 이어집니다.',
    articleInputs: '무엇을 넣나요',
    articleSteps: '계산 과정',
    articleTable: '값에 따른 결과',
    articleOutputs: '결과 항목의 뜻',
    articleGlossary: '용어 정리',
    articleCaution: '자주 틀리는 곳',
    articleAbout: '이 계산은 어디에 쓰나요',
    colInput: '입력 항목',
    colDefault: '기본값',
    colRange: '넣을 수 있는 범위',
    colOutput: '결과 항목',
    colValue: '기본값일 때',
    colMeaning: '뜻',
    stepFormula: '공식',
    stepSubstitute: '기본값 대입',
    stepAnswer: '답',
    tableLead: (pivot: string) => `다른 값은 그대로 두고 ${pivot}만 바꿨을 때의 결과입니다.`,
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
    faqInputs: 'What do I need to enter?',
    faqInputsLead: (list: string) => `Enter ${list}. The result recalculates as you type, and an empty box counts as zero.`,
    faqAnother: 'How much does the answer move if I change a number?',
    faqAnotherLead: (pivot: string, a: string, b: string) => `Changing only ${pivot} moves the answer to ${a} and ${b}. The table below lays out five steps.`,
    faqRounding: 'How are the numbers rounded?',
    faqRoundingLead: 'Money is shown to the nearest whole unit, percentages to one decimal place and everything else to two. What you see is rounded; the calculation itself carries the unrounded value forward.',
    articleInputs: 'What to enter',
    articleSteps: 'Step by step',
    articleTable: 'Quick reference table',
    articleOutputs: 'What each result means',
    articleGlossary: 'Glossary',
    articleCaution: 'Common mistakes',
    articleAbout: 'When you would use this',
    colInput: 'Input',
    colDefault: 'Default',
    colRange: 'Accepted range',
    colOutput: 'Result',
    colValue: 'At default values',
    colMeaning: 'Meaning',
    stepFormula: 'Formula',
    stepSubstitute: 'With the default numbers',
    stepAnswer: 'Answer',
    tableLead: (pivot: string) => `Results when only ${pivot} changes and everything else stays put.`,
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
    faqInputs: '需要输入哪些数值？',
    faqInputsLead: (list: string) => `需要输入${list}。修改后结果会立即重算，留空按0处理。`,
    faqAnother: '改动数值后结果会差多少？',
    faqAnotherLead: (pivot: string, a: string, b: string) => `只改${pivot}时，结果分别变成${a}和${b}。下方表格列出了五档。`,
    faqRounding: '结果保留几位小数？',
    faqRoundingLead: '金额取整到最小货币单位，百分比保留一位小数，其余保留两位。显示值是四舍五入后的结果，计算过程使用未舍入的数值。',
    articleInputs: '需要输入什么',
    articleSteps: '计算步骤',
    articleTable: '不同数值下的结果',
    articleOutputs: '各项结果的含义',
    articleGlossary: '术语说明',
    articleCaution: '常见错误',
    articleAbout: '什么时候用得上',
    colInput: '输入项',
    colDefault: '默认值',
    colRange: '可填范围',
    colOutput: '结果项',
    colValue: '默认值下的结果',
    colMeaning: '含义',
    stepFormula: '公式',
    stepSubstitute: '代入默认值',
    stepAnswer: '答案',
    tableLead: (pivot: string) => `其他数值保持不变，只改动${pivot}时的结果。`,
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
