/**
 * 몸 수치 50종 — 카테고리별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * /rate와 같은 엔진을 쓴다. 스펙(입력·공식·계산·해석)만 데이터로 쓰고
 * FormulaEngine이 그리므로 도구마다 컴포넌트를 만들지 않는다.
 */
import type { FormulaTool } from './formula/types.ts';
import { SHAPE_TOOLS } from './body/shape.ts';
import { SHAPE2_TOOLS } from './body/shape2.ts';
import { METABOLISM_TOOLS } from './body/metabolism.ts';
import { METABOLISM2_TOOLS } from './body/metabolism2.ts';
import { CARDIO_TOOLS } from './body/cardio.ts';
import { CARDIO2_TOOLS } from './body/cardio2.ts';
import { CHILD_TOOLS } from './body/child.ts';
import { CHILD2_TOOLS } from './body/child2.ts';
import { HEALTH_TOOLS } from './body/health.ts';
import { HEALTH2_TOOLS } from './body/health2.ts';
import { LIFE_TOOLS } from './body/life.ts';
import { LIFE2_TOOLS } from './body/life2.ts';
import { BODY_EXTRA_TOOLS } from './body/extra.ts';
import { BODY_EXTRA2_TOOLS } from './body/extra2.ts';

export const BODY_TOOLS: FormulaTool[] = [
  ...SHAPE_TOOLS, ...SHAPE2_TOOLS,
  ...METABOLISM_TOOLS, ...METABOLISM2_TOOLS,
  ...CARDIO_TOOLS, ...CARDIO2_TOOLS,
  ...CHILD_TOOLS, ...CHILD2_TOOLS,
  ...HEALTH_TOOLS, ...HEALTH2_TOOLS,
  ...LIFE_TOOLS, ...LIFE2_TOOLS,
  ...BODY_EXTRA_TOOLS,
  ...BODY_EXTRA2_TOOLS,
];

export const BODY_CATEGORIES = ['체중·체형', '대사·칼로리', '심장·운동', '아이·성장', '건강 지표', '생활 대사'] as const;

export const bodyTool = (slug: string): FormulaTool | undefined => BODY_TOOLS.find(t => t.slug === slug);
