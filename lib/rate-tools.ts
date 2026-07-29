/**
 * 비율·환산 50종 — 카테고리별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * 도구마다 컴포넌트를 만들지 않는다. 스펙(입력·공식·계산·해석)만 쓰고
 * FormulaEngine이 그리며, formula 문자열의 {키}는 TERMS에서 언어별 라벨로
 * 치환되므로 공식까지 3언어가 자동이다.
 */
import type { FormulaTool } from './formula/types.ts';
import { PRICE_TOOLS } from './rate/price.ts';
import { TAX_TOOLS } from './rate/tax.ts';
import { PERCENT_TOOLS } from './rate/percent.ts';
import { FINANCE_TOOLS } from './rate/finance.ts';
import { MIX_TOOLS } from './rate/mix.ts';
import { SCORE_TOOLS } from './rate/score.ts';

export const RATE_TOOLS: FormulaTool[] = [
  ...PRICE_TOOLS, ...TAX_TOOLS, ...PERCENT_TOOLS, ...FINANCE_TOOLS, ...MIX_TOOLS, ...SCORE_TOOLS,
];

export const RATE_CATEGORIES = ['할인·가격', '세금·정산', '비율·증감', '금융·이자', '농도·배합', '점수·달성'] as const;

export const rateTool = (slug: string): FormulaTool | undefined => RATE_TOOLS.find(t => t.slug === slug);
export const RATE_SLUGS = RATE_TOOLS.map(t => t.slug);
