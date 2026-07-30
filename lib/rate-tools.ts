/**
 * 비율·환산 100종 — 카테고리별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * 도구마다 컴포넌트를 만들지 않는다. 스펙(입력·공식·계산·해석)만 쓰고
 * FormulaEngine이 그리며, formula 문자열의 {키}는 TERMS에서 언어별 라벨로
 * 치환되므로 공식까지 3언어가 자동이다.
 *
 * 카테고리마다 파일이 둘이다 — 첫 파일이 기본, 뒤 파일(*2)이 한 겹 더 들어간
 * 것들. 한 파일에 스무 개를 넣으면 무엇이 있는지 목록으로 안 보인다.
 */
import type { FormulaTool } from './formula/types.ts';
import { PRICE_TOOLS } from './rate/price.ts';
import { PRICE2_TOOLS } from './rate/price2.ts';
import { TAX_TOOLS } from './rate/tax.ts';
import { TAX2_TOOLS } from './rate/tax2.ts';
import { PERCENT_TOOLS } from './rate/percent.ts';
import { PERCENT2_TOOLS } from './rate/percent2.ts';
import { FINANCE_TOOLS } from './rate/finance.ts';
import { FINANCE2_TOOLS } from './rate/finance2.ts';
import { MIX_TOOLS } from './rate/mix.ts';
import { MIX2_TOOLS } from './rate/mix2.ts';
import { SCORE_TOOLS } from './rate/score.ts';
import { SCORE2_TOOLS } from './rate/score2.ts';

export const RATE_TOOLS: FormulaTool[] = [
  ...PRICE_TOOLS, ...PRICE2_TOOLS,
  ...TAX_TOOLS, ...TAX2_TOOLS,
  ...PERCENT_TOOLS, ...PERCENT2_TOOLS,
  ...FINANCE_TOOLS, ...FINANCE2_TOOLS,
  ...MIX_TOOLS, ...MIX2_TOOLS,
  ...SCORE_TOOLS, ...SCORE2_TOOLS,
];

export const RATE_CATEGORIES = ['할인·가격', '세금·정산', '비율·증감', '금융·이자', '농도·배합', '점수·달성'] as const;

export const rateTool = (slug: string): FormulaTool | undefined => RATE_TOOLS.find(t => t.slug === slug);
export const RATE_SLUGS = RATE_TOOLS.map(t => t.slug);
