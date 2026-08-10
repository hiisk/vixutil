/**
 * 공예 48종 — 분류별 파일을 모아 하나의 카탈로그로 낸다.
 *
 * /rate·/body·/geometry와 같은 엔진을 쓴다. 공예 계산은 "얼마나 사야 하나"로
 * 끝나는 것이 많아서(실 몇 볼, 원단 몇 미터, 왁스 몇 g) 결과가 대개 올림이고,
 * 여유를 따로 보여준다 — 모자라면 다시 사야 하는데 염색 로트나 원단 색이
 * 갈리면 같은 것을 못 구한다.
 *
 * 겹치지 않게 두는 선: 부피·면적 자체를 구하는 것은 /geometry에 있고, 희석과
 * 배합 비율은 /rate의 농도·배합에 있다. 여기 오는 것은 그 위에 분야 지식이
 * 한 겹 얹힌 것뿐이다 — 게이지, 시접, 향 허용치, SAP 값처럼.
 */
import type { FormulaTool } from './formula/types.ts';
import { KNIT_TOOLS } from './craft/knit.ts';
import { SEW_TOOLS } from './craft/sew.ts';
import { QUILT_TOOLS } from './craft/quilt.ts';
import { CANDLE_TOOLS } from './craft/candle.ts';
import { SOAP_TOOLS } from './craft/soap.ts';
import { BEAD_TOOLS } from './craft/bead.ts';

export const CRAFT_TOOLS: FormulaTool[] = [
  ...KNIT_TOOLS,
  ...SEW_TOOLS,
  ...QUILT_TOOLS,
  ...CANDLE_TOOLS,
  ...SOAP_TOOLS,
  ...BEAD_TOOLS,
];

export const CRAFT_CATEGORIES = ['뜨개', '재봉', '퀼트·자수', '양초', '비누·수지', '구슬·포장'] as const;

export const craftTool = (slug: string): FormulaTool | undefined => CRAFT_TOOLS.find(t => t.slug === slug);
export const CRAFT_SLUGS = CRAFT_TOOLS.map(t => t.slug);
