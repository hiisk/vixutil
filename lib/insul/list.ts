/**
 * 단열 144칸 — 재료 12가지 × 두께 12가지.
 *
 * 단열은 재료만으로도, 두께만으로도 말할 수 없다. 열이 얼마나 잘 지나가는지는
 * 두께를 열전도율로 나눈 값 하나로 정해지므로, 얇은 좋은 재료와 두꺼운 흔한
 * 재료가 같은 자리에 설 수 있다. 그래서 두 축을 둔다.
 *
 * 적는 것은 재료마다의 열전도율과 두께 목록뿐이고, 열저항도 열관류율도
 * 콘크리트로 치면 몇 미터인지도 거기서 계산된다(facts.ts).
 */

/**
 * 재료와 열전도율(W/m·K).
 *
 * 작을수록 열을 안 지나 보낸다. 진공단열재가 0.007이고 콘크리트가 1.6이니
 * 230배 차이다 — 그래서 콘크리트로 같은 단열을 내려면 두께가 그만큼 는다.
 */
export const MATERIALS: { key: string; lambda: number }[] = [
  { key: 'vacuum', lambda: 0.007 },
  { key: 'phenolic', lambda: 0.020 },
  { key: 'pur', lambda: 0.023 },
  { key: 'xps', lambda: 0.028 },
  { key: 'eps2', lambda: 0.031 },
  { key: 'eps1', lambda: 0.036 },
  { key: 'glasswool', lambda: 0.037 },
  { key: 'mineralwool', lambda: 0.040 },
  { key: 'cellulose', lambda: 0.042 },
  { key: 'wood', lambda: 0.13 },
  { key: 'plaster', lambda: 0.18 },
  { key: 'concrete', lambda: 1.6 },
];

/** 두께(mm) */
export const THICKNESSES: number[] = [10, 20, 30, 50, 70, 100, 120, 150, 200, 250, 300, 400];

/**
 * 벽 양쪽 표면이 붙드는 열저항(m²·K/W).
 *
 * 재료가 아니라 공기가 만드는 값이다. 벽에 아무것도 안 붙여도 이만큼은
 * 있으므로, 열관류율을 낼 때 함께 더한다.
 */
export const R_INSIDE = 0.13;
export const R_OUTSIDE = 0.04;

/** 안팎 온도 차(K) — 열손실을 볼 때의 기준 */
export const DELTA_T = 20;

/**
 * 외벽에 요구되는 열관류율(W/m²·K) — 낮을수록 엄하다.
 */
export const TARGETS: { key: string; u: number }[] = [
  { key: 'passive', u: 0.15 },
  { key: 'korea', u: 0.17 },
  { key: 'basic', u: 0.3 },
];

export interface Cell {
  /** 재료 열쇠 */
  key: string;
  /** 두께(mm) */
  mm: number;
}

export const CELLS: Cell[] = MATERIALS.flatMap(m => THICKNESSES.map(mm => ({ key: m.key, mm })));

/** 압출법 100mm → xps-100 */
export const slugOf = (c: Cell): string => `${c.key}-${c.mm}`;

export const INSUL_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const materialOf = (key: string) => MATERIALS.find(m => m.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const INSUL_ICON = '🧱';
