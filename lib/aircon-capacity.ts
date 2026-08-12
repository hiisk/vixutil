/**
 * 에어컨 용량 — 몇 평에 몇 평형을 달아야 하는가.
 *
 * 셈의 뼈대는 한 줄이다.
 *
 *   필요 냉방능력(W) = 면적(㎡) × 용도별 계수(W/㎡) × 보정계수들 (+ 초과 인원)
 *
 * ── 이 계수들은 어림값이다 ──────────────────────────────────────
 * 제대로 된 냉방부하 계산은 벽·창의 열관류율과 방위별 일사량, 환기량까지
 * 넣어야 한다. 여기 적은 계수는 그 자리에 **흔한 값 하나를 놓아 둔 어림**이고,
 * 값 자체가 답이 아니다. 그래도 방향은 맞다 — 주방이 침실보다 더 크게 나오고,
 * 최상층 서향이 중간층 북향보다 더 크게 나온다.
 *
 * 용도별 계수의 크기는 지어낸 것이 아니라 **국내 제조사의 "○평형" 표기를
 * 뒤집어** 얻었다. 벽걸이 2.0kW를 6평형(19.8㎡), 스탠드 5.6kW를 16평형(52.9㎡),
 * 7.0kW를 20평형으로 적으므로 그 표기에 깔린 값이 ㎡당 105W쯤이다. **거실을 그
 * 자리에 그대로 두었다** — 조건이 나쁘지 않은 거실 16평이면 16평형이 나온다.
 * 나머지 용도는 거실을 기준으로 위아래로 옮긴 값이고, 보정을 켜면 그 위로 올라간다.
 *
 * ── 이미 있는 계산기와 겹치지 않게 ───────────────────────────────
 * 가전 전기요금 계산기(app/(ko)/calculator/appliance-power)는 소비전력을 받아
 * 요금을 낸다. 이쪽은 **용량을 고르는 것**이 물음이고, 요금은 고른 용량에서
 * 따라 나오는 덧붙임이다. 누진 요금표는 여기 다시 적지 않고
 * lib/electricity-tariff.ts 한 벌을 그대로 쓴다 — 표를 두 벌 두면 한쪽만
 * 고쳐져 두 페이지가 다른 답을 낸다.
 */
import { calcElectricity, extraCost, tierOf } from './electricity-tariff.ts';

/** 1평 = 3.305785㎡ (한 평은 6자 × 6자다) */
export const SQM_PER_PYEONG = 400 / 121;

/** 1kW = 3412.142BTU/h — 북미 표기(BTU)와 국내 표기(kW)를 잇는 값 */
export const BTU_PER_KW = 3412.142;

export const pyeongToSqm = (pyeong: number): number => pyeong * SQM_PER_PYEONG;
export const sqmToPyeong = (sqm: number): number => sqm / SQM_PER_PYEONG;
export const kwToBtu = (kw: number): number => kw * BTU_PER_KW;
export const btuToKw = (btu: number): number => btu / BTU_PER_KW;

export type RoomUse = 'bedroom' | 'living' | 'studio' | 'kitchen' | 'office' | 'shop';

/**
 * 용도별 냉방부하 계수(W/㎡) — 모두 어림값이다.
 *
 * 같은 20㎡라도 문 닫고 자는 침실과 문이 자주 열리는 가게는 다른 부하다.
 * 사람·조리기구·컴퓨터가 내는 열과, 밖의 공기가 드나드는 양이 갈리기 때문이다.
 *
 * 거실이 LABEL_W_PER_SQM과 같은 값인 것은 우연이 아니다 — 제조사의 평형 표기를
 * 기준점으로 두어야 "16평 거실에 16평형"이 그대로 나온다.
 */
export const USES: { key: RoomUse; label: string; wPerSqm: number; note: string }[] = [
  { key: 'bedroom', label: '침실', wPerSqm: 90, note: '문을 닫고 쓰고 창이 작다' },
  { key: 'living', label: '거실', wPerSqm: 105, note: '주방·현관과 트여 있고 창이 크다' },
  { key: 'studio', label: '원룸', wPerSqm: 110, note: '조리와 취침이 한 공간이다' },
  { key: 'office', label: '사무실', wPerSqm: 125, note: '사람과 컴퓨터가 내내 열을 낸다' },
  { key: 'kitchen', label: '주방', wPerSqm: 140, note: '조리 열이 그대로 실내로 들어온다' },
  { key: 'shop', label: '상가·카페', wPerSqm: 170, note: '문이 자주 열리고 사람이 드나든다' },
];

export const loadOf = (use: RoomUse): number => USES.find(u => u.key === use)!.wPerSqm;

/* ── 보정계수 — 역시 어림값이다 ── */

/** 최상층 — 지붕이 하루치 햇빛을 그대로 받아 천장에서 열이 내려온다 */
export const TOP_FLOOR = 1.15;
/** 서향·남서향 — 가장 더운 오후 늦게 해가 방으로 들어온다 */
export const WEST_FACING = 1.1;

/** 창 면적이 바닥면적의 몇 할이면 흔한 편인가 */
export const WINDOW_BASE = 0.15;
/** 창 비중이 기준에서 벗어난 만큼 부하도 같은 비율로 움직인다고 본다 */
export const WINDOW_SLOPE = 1;
/** 창만으로 부하가 끝없이 늘거나 줄지는 않으므로 양쪽을 묶는다 */
export const WINDOW_CLAMP: [number, number] = [0.9, 1.35];

/** 흔한 천장 높이(m) — 국내 아파트가 대개 이 안쪽이다 */
export const CEILING_BASE = 2.3;
/** 천장이 높으면 식힐 공기가 늘지만 벽·창 면적은 그대로다 — 절반만 반영한다 */
export const CEILING_SLOPE = 0.5;
export const CEILING_CLAMP: [number, number] = [0.9, 1.5];

/** 사람 한 사람이 내는 열(W) — 앉아 있을 때의 어림 */
export const PERSON_W = 130;
/** 용도별 계수에 이미 들어 있다고 보는 인원 — 이보다 많은 사람만 더한다 */
export const BASE_PEOPLE = 2;

const clamp = (v: number, lo: number, hi: number): number => Math.min(Math.max(v, lo), hi);

export interface Room {
  /** 면적 — 단위는 unit이 정한다 */
  area: number;
  /** 면적을 무슨 단위로 넣었는가 */
  unit: 'sqm' | 'pyeong';
  use: RoomUse;
  /** 최상층인가 */
  topFloor?: boolean;
  /** 서향·남서향인가 */
  westFacing?: boolean;
  /** 창 면적 ÷ 바닥 면적. 비우면 흔한 값 */
  windowRatio?: number;
  /** 재실 인원. 비우면 기준 인원 */
  people?: number;
  /** 천장 높이(m). 비우면 흔한 값 */
  ceiling?: number;
}

export interface Need {
  sqm: number;
  pyeong: number;
  /** 보정 전 부하(W) = ㎡ × 용도별 계수 */
  baseW: number;
  /** 곱한 보정계수들 — 화면에 그대로 늘어놓는다 */
  factors: { label: string; value: number }[];
  /** 보정계수를 모두 곱한 값 */
  factor: number;
  /** 기준 인원을 넘는 사람이 더하는 부하(W) */
  peopleW: number;
  /** 필요 냉방능력 */
  requiredW: number;
  requiredKw: number;
  requiredBtu: number;
}

/**
 * 필요 냉방능력.
 *
 * 인원만 곱이 아니라 **덧셈**으로 붙는다. 사람이 내는 열은 방이 넓든 좁든
 * 한 사람에 130W쯤이라, 면적에 비례해 늘어나는 벽·창의 부하와 성질이 다르다.
 */
export function requiredCapacity(room: Room): Need {
  const sqm = room.unit === 'pyeong' ? pyeongToSqm(room.area) : room.area;
  const baseW = sqm * loadOf(room.use);

  const factors: { label: string; value: number }[] = [];
  if (room.topFloor) factors.push({ label: '최상층', value: TOP_FLOOR });
  if (room.westFacing) factors.push({ label: '서향·남서향', value: WEST_FACING });

  const ratio = room.windowRatio ?? WINDOW_BASE;
  const windowFactor = clamp(1 + (ratio - WINDOW_BASE) * WINDOW_SLOPE, ...WINDOW_CLAMP);
  if (windowFactor !== 1) factors.push({ label: '창 면적 비중', value: windowFactor });

  const height = room.ceiling ?? CEILING_BASE;
  const ceilingFactor = clamp(1 + ((height - CEILING_BASE) / CEILING_BASE) * CEILING_SLOPE, ...CEILING_CLAMP);
  if (ceilingFactor !== 1) factors.push({ label: '천장 높이', value: ceilingFactor });

  const factor = factors.reduce((acc, f) => acc * f.value, 1);
  const peopleW = Math.max((room.people ?? BASE_PEOPLE) - BASE_PEOPLE, 0) * PERSON_W;
  const requiredW = baseW * factor + peopleW;

  return {
    sqm,
    pyeong: sqmToPyeong(sqm),
    baseW,
    factors,
    factor,
    peopleW,
    requiredW,
    requiredKw: requiredW / 1000,
    requiredBtu: kwToBtu(requiredW / 1000),
  };
}

/**
 * 흔히 파는 정격 냉방능력(kW).
 *
 * 에어컨은 필요한 만큼 맞춰 만들어 주는 물건이 아니라 **계단으로 나온다.**
 * 여기 적은 값은 국내에서 흔히 보이는 용량이고, 해마다 모델이 바뀌므로
 * 이 목록이 파는 것을 다 담고 있다는 뜻은 아니다. 사려는 제품의 라벨에 적힌
 * 정격 냉방능력을 보는 것이 언제나 정확하다.
 */
export const GRADES: number[] = [2.0, 2.6, 3.2, 3.6, 4.6, 5.6, 7.0, 8.0, 10.0, 13.0];

/** 이 능력까지는 벽걸이가 나오고, 그 위는 스탠드(또는 천장형)다 */
export const WALL_MAX_KW = 3.6;

/** 제조사가 "○평형"이라 적을 때 뒤에 깔려 있는 값(W/㎡) — 표기를 뒤집어 얻은 어림 */
export const LABEL_W_PER_SQM = 105;

/** 그 능력이 국내 표기로 몇 평형인가 */
export const pyeongLabel = (kw: number): number =>
  Math.round(sqmToPyeong((kw * 1000) / LABEL_W_PER_SQM));

export interface Choice {
  /** 한 대로 덮는 가장 작은 등급(kW). 계단의 맨 위도 못 덮으면 null */
  grade: number | null;
  /** 몇 대로 나눠 달아야 하는가 — 한 대로 덮이면 1 */
  units: number;
  /** 한 대당 등급(kW) */
  perUnit: number;
  /** 다는 것을 모두 합한 능력(kW) */
  totalKw: number;
  /** 여유율 — 필요한 것보다 몇 할 더 큰가 */
  margin: number;
  /** 한 대의 국내 표기 */
  label: string;
  /** 벽걸이인가 스탠드인가 */
  form: '벽걸이' | '스탠드';
  /** 한 대의 BTU/h 표기 */
  btu: number;
}

/**
 * 필요 능력을 덮는 가장 작은 등급.
 *
 * 모자란 쪽으로 반올림하지 않는다 — 부동소수 오차로 경계에 걸리면 한 칸 위를
 * 고른다. 용량이 모자란 에어컨은 아무리 오래 돌려도 설정 온도에 닿지 못한다.
 *
 * 계단의 맨 위(13kW)로도 안 되면 **없는 등급을 지어내지 않고 여러 대로 나눈다.**
 * 넓은 상가나 트인 사무실이 실제로 그렇게 단다.
 */
export function pickGrade(requiredW: number): Choice {
  const kw = requiredW / 1000;
  const top = GRADES[GRADES.length - 1];
  const units = kw <= top ? 1 : Math.ceil(kw / top);
  // 나눈 뒤에는 한 대분이 반드시 계단 안에 든다
  const perUnit = GRADES.find(g => g >= kw / units)!;
  const totalKw = perUnit * units;

  return {
    grade: units === 1 ? perUnit : null,
    units,
    perUnit,
    totalKw,
    margin: kw > 0 ? totalKw / kw - 1 : 0,
    label: `${pyeongLabel(perUnit)}평형`,
    form: perUnit <= WALL_MAX_KW ? '벽걸이' : '스탠드',
    btu: kwToBtu(perUnit),
  };
}

export interface RunInput {
  /** 정격 냉방능력(kW) — 고른 등급을 그대로 넣는다 */
  kw: number;
  /** 냉방 효율(COP 또는 CSPF) — 에너지소비효율 라벨에 적혀 있다 */
  cop: number;
  hoursPerDay: number;
  days: number;
  /** 에어컨을 빼고 원래 쓰던 한 달 사용량(kWh) */
  baseKwh: number;
}

export interface RunCost {
  /** 소비전력(kW) = 냉방능력 ÷ 효율 */
  inputKw: number;
  /** 한 달 사용량(kWh) */
  kwh: number;
  /** 이 에어컨 때문에 더 나오는 금액(원) */
  extra: number;
  beforeTotal: number;
  afterTotal: number;
  /** 누진 구간(1부터) */
  tierBefore: number;
  tierAfter: number;
}

/**
 * 고른 용량으로 한 달 돌리면 요금이 얼마나 늘어나는가.
 *
 * 요금은 lib/electricity-tariff.ts가 낸다. 누진제에서는 "에어컨 요금"이 홀로
 * 정해지지 않으므로 단독 금액이 아니라 **늘어나는 금액**으로 답한다.
 *
 * 소비전력을 정격 ÷ 효율로 잡는 것은 **가장 크게 잡은 값**이다. 인버터 기종은
 * 설정 온도에 닿으면 출력을 낮춰 돌아가므로 실제로는 이보다 적게 든다.
 */
export function runningCost({ kw, cop, hoursPerDay, days, baseKwh }: RunInput): RunCost {
  const inputKw = cop > 0 ? kw / cop : 0;
  const kwh = inputKw * hoursPerDay * days;
  return {
    inputKw,
    kwh,
    extra: extraCost(baseKwh, kwh),
    beforeTotal: calcElectricity(baseKwh).total,
    afterTotal: calcElectricity(baseKwh + kwh).total,
    tierBefore: tierOf(baseKwh) + 1,
    tierAfter: tierOf(baseKwh + kwh) + 1,
  };
}
