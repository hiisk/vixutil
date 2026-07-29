/** /geometry 섹션 설정 */
import { GEO_TOOLS, GEO_CATEGORIES } from './geo-tools.ts';
import type { Lang } from './formula/terms.ts';
import type { SectionConfig } from './formula/section.ts';

export const GEO_META = {
  ko: {
    section: '도형·수학',
    hubTitle: '도형·수학 계산기',
    hubLead: '면적·부피·삼각비부터 타일 수·페인트 양까지 도형으로 푸는 계산 50가지',
    hubNotice: '📐 값을 넣으면 바로 계산되고 공식도 함께 보여줍니다.',
    footNote: '길이 단위는 입력끼리 맞춰서 넣으세요. cm와 m를 섞으면 결과가 크게 어긋납니다.',
    metaTitle: '도형 계산기 — 면적·부피·삼각비·타일 수 50종',
    metaDesc:
      '원·삼각형·사다리꼴 면적, 원기둥·구·원뿔 부피, 피타고라스 정리와 코사인 법칙, 경사도, 타일 개수와 페인트 소요량까지 도형 계산 50가지를 공식과 함께 봅니다.',
  },
  en: {
    section: 'Geometry',
    hubTitle: 'Geometry Calculators',
    hubLead: 'Fifty geometry tools — areas, volumes, trigonometry, tiles and paint',
    hubNotice: '📐 Results update as you type, and every page shows the formula.',
    footNote: 'Keep your length units consistent across inputs — mixing centimetres and metres throws results far off.',
    metaTitle: 'Geometry Calculators — Area, Volume & Trigonometry (50 Tools)',
    metaDesc:
      'Circle, triangle and trapezoid areas, cylinder, sphere and cone volumes, the Pythagorean theorem and law of cosines, slope grade, tile counts and paint quantities — 50 geometry calculators with formulas.',
  },
  zh: {
    section: '几何计算',
    hubTitle: '几何图形计算器',
    hubLead: '面积、体积、三角函数、瓷砖与涂料 — 50种几何计算',
    hubNotice: '📐 输入即时计算，每页都附上公式。',
    footNote: '各项输入的长度单位要统一 — 厘米和米混用会使结果严重偏差。',
    metaTitle: '几何计算器 — 面积、体积、三角函数等50种',
    metaDesc:
      '圆形、三角形、梯形面积，圆柱、球、圆锥体积，勾股定理与余弦定理，坡度，瓷砖数量与涂料用量 — 50种几何计算器，附计算公式。',
  },
} as const;

export const GEO_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '평면 도형': '평면 도형', '입체 부피': '입체 부피', '삼각비·각': '삼각비·각',
    '원·호': '원·호', '생활 계산': '생활 계산',
  },
  en: {
    '평면 도형': 'Plane Shapes', '입체 부피': 'Solid Volume', '삼각비·각': 'Trigonometry & Angles',
    '원·호': 'Circles & Arcs', '생활 계산': 'Everyday Measuring',
  },
  zh: {
    '평면 도형': '平面图形', '입체 부피': '立体体积', '삼각비·각': '三角与角度',
    '원·호': '圆与弧', '생활 계산': '生活测算',
  },
};

export const GEO_SECTION: SectionConfig = {
  key: 'geometry',
  tools: GEO_TOOLS,
  categories: GEO_CATEGORIES,
  meta: GEO_META,
  categoryLabel: GEO_CATEGORY_LABEL,
  accent: 'indigo',
  grad: 'from-indigo-500 to-violet-600',
  gradBar: 'from-indigo-500 to-violet-600',
  hoverBorder: 'hover:border-indigo-300',
  textAccent: 'text-indigo-600',
  focusBorder: 'focus:border-indigo-400',
  hoverText: 'group-hover:text-indigo-700',
  linkHover: 'hover:text-indigo-600',
  ogFrom: '#6366f1',
  ogTo: '#7c3aed',
};
