/**
 * 몸 수치 50종 — 카테고리별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * /rate와 같은 엔진을 쓴다. 스펙(입력·공식·계산·해석)만 데이터로 쓰고
 * FormulaEngine이 그리므로 도구마다 컴포넌트를 만들지 않는다.
 */
import type { FormulaTool } from './formula/types.ts';
import { SHAPE_TOOLS } from './body/shape.ts';
import { METABOLISM_TOOLS } from './body/metabolism.ts';
import { CARDIO_TOOLS } from './body/cardio.ts';
import { CHILD_TOOLS } from './body/child.ts';
import { HEALTH_TOOLS } from './body/health.ts';
import { LIFE_TOOLS } from './body/life.ts';

export const BODY_TOOLS: FormulaTool[] = [
  ...SHAPE_TOOLS, ...METABOLISM_TOOLS, ...CARDIO_TOOLS, ...CHILD_TOOLS, ...HEALTH_TOOLS, ...LIFE_TOOLS,
];

export const BODY_CATEGORIES = ['체중·체형', '대사·칼로리', '심장·운동', '아이·성장', '건강 지표', '생활 대사'] as const;

export const bodyTool = (slug: string): FormulaTool | undefined => BODY_TOOLS.find(t => t.slug === slug);
