/**
 * 키 × 몸무게 격자 — `/body/bmi/170-70` 4,131칸(언어마다).
 *
 * ── 왜 격자인가 ──────────────────────────────────────────────
 * 사람은 "BMI 계산기"가 아니라 **"키 170 몸무게 70"**이라고 친다. 계산기 페이지는
 * 그 질문에 답하지만 제목이 그 말을 안 담아서 검색에 안 걸린다.
 *
 * 키 145~195(1cm, 51) × 몸무게 40~120(1kg, 81) = 4,131. 범위 밖은 안 낸다 —
 * 아무 숫자나 열리면 무한한 주소가 생기고, 극단값은 BMI 해석 자체가 뜻을 잃는다.
 *
 * ── 기준선은 두 벌이다 ──────────────────────────────────────
 * 아시아·태평양(23·25)과 WHO 국제(25·30)가 다르다. **하나만 적으면 다른 표를 본
 * 사람에게 틀린 값이 된다.** 둘 다 내고 어느 쪽인지 밝힌다 — 이 저장소가 자료가
 * 갈릴 때 쓰는 방식이다(범위로 낸다).
 *
 * 끊는 자리는 lib/body/shape.ts의 BMI 계산기와 **같은 수**를 쓴다. 두 곳이
 * 어긋나면 같은 사이트가 같은 사람에게 다른 판정을 내린다 — 검사가 그것을 본다.
 */

/** 키(cm) — 1cm 눈금 */
export const HEIGHTS: readonly number[] = Array.from({ length: 51 }, (_, i) => 145 + i);
/** 몸무게(kg) — 1kg 눈금 */
export const WEIGHTS: readonly number[] = Array.from({ length: 81 }, (_, i) => 40 + i);

/** 아시아·태평양 기준 끊는 자리 — lib/body/shape.ts와 같아야 한다 */
export const AP_CUTS: readonly number[] = [18.5, 23, 25, 30];
/** WHO 국제 기준 끊는 자리 */
export const WHO_CUTS: readonly number[] = [18.5, 25, 30, 35];

export type Band = 0 | 1 | 2 | 3 | 4;

/** 끊는 자리에서 몇 번째 구간인가 */
export const bandOf = (bmi: number, cuts: readonly number[]): Band =>
  cuts.reduce<number>((b, c) => (bmi >= c ? b + 1 : b), 0) as Band;

export const bmiOf = (kg: number, cm: number): number => kg / (cm / 100) ** 2;

const r1 = (n: number): number => Math.round(n * 10) / 10;

export interface BmiCell {
  height: number;
  weight: number;
  /** 소수 한 자리 */
  bmi: number;
  /** 아시아·태평양 구간 */
  ap: Band;
  /** WHO 국제 구간 */
  who: Band;
  /** BMI 22일 때의 몸무게 — 흔히 말하는 '표준 체중' */
  ideal: number;
  /** 아시아·태평양 정상 범위(18.5~22.9)의 몸무게 */
  healthy: [number, number];
  /** 정상 범위까지 몇 kg — 안에 있으면 0 */
  toHealthy: number;
}

export function bmiCell(height: number, weight: number): BmiCell {
  const bmi = r1(bmiOf(weight, height));
  const m2 = (height / 100) ** 2;
  const healthy: [number, number] = [r1(18.5 * m2), r1(22.9 * m2)];
  const toHealthy = weight < healthy[0] ? r1(healthy[0] - weight)
    : weight > healthy[1] ? r1(weight - healthy[1]) : 0;
  return {
    height, weight, bmi,
    ap: bandOf(bmi, AP_CUTS),
    who: bandOf(bmi, WHO_CUTS),
    ideal: r1(22 * m2),
    healthy,
    toHealthy,
  };
}

/** 주소 조각 — `170-70` */
export const cellSlug = (h: number, w: number): string => `${h}-${w}`;

/** 주소 조각 → 칸. 범위 밖이거나 꼴이 다르면 null이라 404가 된다 */
export function parseCellSlug(s: string): { height: number; weight: number } | null {
  const m = /^(\d{2,3})-(\d{2,3})$/.exec(s);
  if (!m) return null;
  const height = Number(m[1]), weight = Number(m[2]);
  if (!HEIGHTS.includes(height) || !WEIGHTS.includes(weight)) return null;
  return { height, weight };
}

/**
 * 이웃 칸 — 키 ±1, 몸무게 ±1, 그리고 대각선 둘.
 *
 * **서로 가리키므로 고아가 생기지 않는다** — 격자에서 앞의 여섯 개만 뽑으면
 * 나머지 4,100칸이 들어오는 링크 0이 되는데(이 저장소가 여러 번 겪은 병),
 * 상하좌우는 반드시 상대도 나를 가리킨다.
 */
export function neighborCells(height: number, weight: number): { height: number; weight: number }[] {
  const out: { height: number; weight: number }[] = [];
  const push = (h: number, w: number) => {
    if (HEIGHTS.includes(h) && WEIGHTS.includes(w)) out.push({ height: h, weight: w });
  };
  push(height - 1, weight); push(height + 1, weight);
  push(height, weight - 1); push(height, weight + 1);
  push(height - 1, weight - 1); push(height + 1, weight + 1);
  return out;
}

/**
 * 같은 BMI가 되는 다른 조합 — "나와 같은 BMI인 사람은 키가 몇이면 몇 kg인가".
 *
 * 격자 안에서 BMI가 소수 한 자리까지 같은 칸을 찾는다. 이 목록이 값마다 다르므로
 * 본문이 칸마다 달라지는 자리이기도 하다.
 */
export function sameBmiCells(height: number, weight: number, limit = 6): { height: number; weight: number }[] {
  const target = r1(bmiOf(weight, height));
  const out: { height: number; weight: number }[] = [];
  for (const h of HEIGHTS) {
    if (h === height) continue;
    /* 그 키에서 같은 BMI가 되는 몸무게 — 반올림해서 격자에 있으면 담는다 */
    const w = Math.round(target * (h / 100) ** 2);
    if (WEIGHTS.includes(w) && r1(bmiOf(w, h)) === target) out.push({ height: h, weight: w });
    if (out.length >= limit) break;
  }
  return out;
}

/** 격자 전체 — 사이트맵과 굽는 목록이 쓴다 */
export const allCells = (): { height: number; weight: number }[] =>
  HEIGHTS.flatMap(h => WEIGHTS.map(w => ({ height: h, weight: w })));

/** 4,131칸 — 셈에 쓰는 수 */
export const CELL_COUNT = HEIGHTS.length * WEIGHTS.length;
