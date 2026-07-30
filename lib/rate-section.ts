/**
 * /rate 섹션 설정 — 카탈로그·카테고리 이름·색을 한곳에 모은다.
 *
 * 몸 수치(/body)와 도형(/geometry)도 같은 엔진을 쓰므로, 섹션마다 다른 것만
 * 이 파일에 두고 화면 코드는 이 설정을 받아 그린다.
 */
import { RATE_TOOLS, RATE_CATEGORIES } from './rate-tools.ts';
import type { Lang } from './formula/terms.ts';
import type { SectionConfig } from './formula/section.ts';

export const RATE_META = {
  ko: {
    section: '비율 계산',
    hubTitle: '비율·환산 계산기',
    hubLead: '할인율·부가세·이자·농도까지 공식 하나로 끝나는 계산 100가지',
    hubNotice: '📐 값을 넣으면 바로 계산됩니다. 계산식도 함께 보여줍니다.',
    footNote: '세율과 이자 계산 방식은 나라와 상품에 따라 다릅니다. 실제 거래는 계약 조건을 확인하세요.',
    metaTitle: '비율 계산기 — 할인율·부가세·이자·농도 100종',
    metaDesc:
      '할인율, 삼중 할인, N+1 실질 할인, 부가세, 관세, 실효세율, 증감률, 퍼센트포인트, 백분위, 복리, 대출 한도, 중도상환, 농도와 희석까지 100가지 비율 계산을 한 곳에서. 계산식·입력 설명·값별 결과 표를 함께 봅니다.',
  },
  en: {
    section: 'Rate Calculators',
    hubTitle: 'Percentage & Rate Calculators',
    hubLead: 'A hundred one-formula calculators — discounts, tax, interest, concentration',
    hubNotice: '📐 Results update as you type, and every page shows the formula.',
    footNote: 'Tax rates and interest conventions differ by country and product — check your contract for real transactions.',
    metaTitle: 'Percentage Calculators — 100 Rate & Ratio Tools',
    metaDesc:
      'Discounts, stacked discounts, buy-one-get-one, VAT, import duty, effective tax rate, percent change, percentage points, percentiles, compound interest, borrowing limits, dilution and blending — 100 rate calculators, each with the formula, an input guide and a reference table.',
  },
} as const;

/** 카테고리 이름의 3언어 — 카탈로그는 한국어 키를 쓰고 화면에서만 갈아 끼운다 */
export const RATE_CATEGORY_LABEL: Record<Lang, Record<string, string>> = {
  ko: {
    '할인·가격': '할인·가격', '세금·정산': '세금·정산', '비율·증감': '비율·증감',
    '금융·이자': '금융·이자', '농도·배합': '농도·배합', '점수·달성': '점수·달성',
  },
  en: {
    '할인·가격': 'Price & Discount', '세금·정산': 'Tax & Payout', '비율·증감': 'Percentage & Change',
    '금융·이자': 'Interest & Return', '농도·배합': 'Concentration', '점수·달성': 'Scores & Targets',
  },
};

export const RATE_SECTION: SectionConfig = {
  key: 'rate',
  tools: RATE_TOOLS,
  categories: RATE_CATEGORIES,
  meta: RATE_META,
  categoryLabel: RATE_CATEGORY_LABEL,
  accent: 'emerald',
  grad: 'from-emerald-500 to-teal-600',
  gradBar: 'from-emerald-500 to-teal-600',
  hoverBorder: 'hover:border-emerald-300',
  textAccent: 'text-emerald-600',
  focusBorder: 'focus:border-emerald-400',
  hoverText: 'group-hover:text-emerald-700',
  linkHover: 'hover:text-emerald-600',
  ogFrom: '#10b981',
  ogTo: '#0d9488',
};
