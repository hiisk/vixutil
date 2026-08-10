/**
 * 도형·수학 50종 — 카테고리별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * /rate·/body와 같은 엔진을 쓴다. 도형은 결과가 여러 개인 경우가 많아서
 * (면적과 둘레, 부피와 표면적) 한 페이지에서 관련 값을 함께 보여준다.
 */
import type { FormulaTool } from './formula/types.ts';
import { PLANE_TOOLS } from './geo/plane.ts';
import { PLANE2_TOOLS } from './geo/plane2.ts';
import { SOLID_TOOLS } from './geo/solid.ts';
import { SOLID2_TOOLS } from './geo/solid2.ts';
import { TRIG_TOOLS } from './geo/trig.ts';
import { TRIG2_TOOLS } from './geo/trig2.ts';
import { CIRCLE_TOOLS } from './geo/circle.ts';
import { CIRCLE2_TOOLS } from './geo/circle2.ts';
import { PRACTICAL_TOOLS } from './geo/practical.ts';
import { PRACTICAL2_TOOLS } from './geo/practical2.ts';
import { EXTRA_TOOLS } from './geo/extra.ts';
import { MATERIAL_TOOLS } from './geo/material.ts';

export const GEO_TOOLS: FormulaTool[] = [
  ...PLANE_TOOLS, ...PLANE2_TOOLS,
  ...SOLID_TOOLS, ...SOLID2_TOOLS,
  ...TRIG_TOOLS, ...TRIG2_TOOLS,
  ...CIRCLE_TOOLS, ...CIRCLE2_TOOLS,
  ...PRACTICAL_TOOLS, ...PRACTICAL2_TOOLS,
  ...EXTRA_TOOLS,
  ...MATERIAL_TOOLS,
];

export const GEO_CATEGORIES = ['평면 도형', '입체 부피', '삼각비·각', '원·호', '생활 계산'] as const;

export const geoTool = (slug: string): FormulaTool | undefined => GEO_TOOLS.find(t => t.slug === slug);
