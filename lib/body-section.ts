/** /body 섹션 설정 — 카탈로그·카테고리 이름·색을 한곳에 모은다 */
import { BODY_TOOLS, BODY_CATEGORIES } from './body-tools.ts';
import type { Lang } from './formula/terms.ts';
import type { SectionConfig } from './formula/section.ts';

export const BODY_META = {
  ko: {
    section: '몸 수치',
    hubTitle: '몸 수치 계산기',
    hubLead: 'BMI·기초대사량·심박수·혈압 지표까지 몸으로 재는 수치 50가지',
    hubNotice: '🩺 참고용 계산입니다. 진단과 치료는 의료진의 판단을 따르세요.',
    footNote: '이 계산기는 건강 정보를 이해하기 위한 참고 도구이며 진단·처방을 대신하지 않습니다. 증상이 있으면 의료기관을 찾으세요.',
    metaTitle: '몸 수치 계산기 — BMI·기초대사량·심박수·혈압 50종',
    metaDesc:
      'BMI, 표준 체중, 체지방률, 기초대사량과 TDEE, 목표 심박수, 1RM, 달리기 페이스, 평균 동맥압, LDL과 HOMA-IR까지 몸으로 재는 수치 50가지를 계산식과 함께 봅니다.',
  },
  en: {
    section: 'Body Metrics',
    hubTitle: 'Body Metric Calculators',
    hubLead: 'Fifty body numbers — BMI, BMR, heart rate zones, blood pressure markers',
    hubNotice: '🩺 For reference only — diagnosis and treatment belong to your clinician.',
    footNote: 'These calculators help you understand health figures; they do not replace diagnosis or prescription. See a clinician if you have symptoms.',
    metaTitle: 'Body Metric Calculators — BMI, BMR, Heart Rate & 47 More',
    metaDesc:
      'BMI, ideal weight, body fat, BMR and TDEE, target heart rate, one-rep max, running pace, mean arterial pressure, LDL and HOMA-IR — 50 body metrics with the formula behind each one.',
  },
  zh: {
    section: '身体数值',
    hubTitle: '身体数值计算器',
    hubLead: 'BMI、基础代谢、心率区间、血压指标 — 50种身体数值',
    hubNotice: '🩺 仅供参考 — 诊断与治疗请遵医嘱。',
    footNote: '这些计算器用于帮助理解健康数值，不能替代诊断或处方。出现症状请就医。',
    metaTitle: '身体数值计算器 — BMI、基础代谢、心率等50种',
    metaDesc:
      'BMI、标准体重、体脂率、基础代谢与每日总消耗、目标心率、1RM、跑步配速、平均动脉压、LDL和HOMA-IR — 50种身体数值，附计算公式。',
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
  zh: {
    '체중·체형': '体重与体型', '대사·칼로리': '代谢与热量', '심장·운동': '心脏与运动',
    '아이·성장': '儿童与成长', '건강 지표': '健康指标', '생활 대사': '日常代谢',
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
