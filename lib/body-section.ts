/** /body 섹션 설정 — 카탈로그·카테고리 이름·색을 한곳에 모은다 */
import { BODY_TOOLS, BODY_CATEGORIES } from './body-tools.ts';
import type { Lang } from './formula/terms.ts';
import type { SectionConfig } from './formula/section.ts';

export const BODY_META = {
  ko: {
    section: '몸 수치',
    hubTitle: '몸 수치 계산기',
    hubLead: 'BMI·기초대사량·심박수·혈압 지표까지 몸으로 재는 수치 100가지',
    hubNotice: '🩺 참고용 계산입니다. 진단과 치료는 의료진의 판단을 따르세요.',
    footNote: '이 계산기는 건강 정보를 이해하기 위한 참고 도구이며 진단·처방을 대신하지 않습니다. 증상이 있으면 의료기관을 찾으세요.',
    metaTitle: '몸 수치 계산기 — BMI·기초대사량·심박수·혈압 100종',
    metaDesc:
      'BMI, 표준 체중, 체지방률, 기초대사량과 TDEE, 목표 심박수, 1RM, 달리기 페이스, 평균 동맥압, LDL과 HOMA-IR까지 몸으로 재는 수치 100가지를 계산식과 함께 봅니다.',
  },
  en: {
    section: 'Body Metrics',
    hubTitle: 'Body Metric Calculators',
    hubLead: 'A hundred body numbers — BMI, BMR, heart rate zones, blood pressure markers',
    hubNotice: '🩺 For reference only — diagnosis and treatment belong to your clinician.',
    footNote: 'These calculators help you understand health figures; they do not replace diagnosis or prescription. See a clinician if you have symptoms.',
    metaTitle: 'Body Metric Calculators — BMI, BMR, Heart Rate & 97 More',
    metaDesc:
      'BMI, ideal weight, body fat, BMR and TDEE, target heart rate, one-rep max, running pace, mean arterial pressure, LDL and HOMA-IR — 100 body metrics with the formula behind each one.',
  },
} as const;

export const BODY_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '체중·체형': '체중·체형', '대사·칼로리': '대사·칼로리', '심장·운동': '심장·운동',
    '아이·성장': '아이·성장', '건강 지표': '건강 지표', '생활 대사': '생활 대사',
  },
  en: {
    '체중·체형': 'Weight & Shape', '대사·칼로리': 'Metabolism & Calories', '심장·운동': 'Heart & Exercise',
    '아이·성장': 'Children & Growth', '건강 지표': 'Health Markers', '생활 대사': 'Daily Metabolism',
  },
};

export const BODY_SECTION: SectionConfig = {
  key: 'body',
  tools: BODY_TOOLS,
  categories: BODY_CATEGORIES,
  meta: BODY_META,
  categoryLabel: BODY_CATEGORY_LABEL,
  accent: 'rose',
  grad: 'from-rose-500 to-pink-600',
  gradBar: 'from-rose-500 to-pink-600',
  hoverBorder: 'hover:border-rose-300',
  textAccent: 'text-rose-600',
  focusBorder: 'focus:border-rose-400',
  hoverText: 'group-hover:text-rose-700',
  linkHover: 'hover:text-rose-600',
  ogFrom: '#f43f5e',
  ogTo: '#db2777',
};
