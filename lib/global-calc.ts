/**
 * 나라를 안 타는 계산 셋 — BMI, 팁, 수면 사이클.
 *
 * 셋 다 아홉 언어로 낸다. 한국어판이 이미 있지만 **그대로 번역하면 틀린다**:
 *  - BMI: 한국어판은 아시아·태평양 기준(25 이상 비만)을 쓴다. 세계 기준은 30이다.
 *    번역판에 25를 그대로 두면 유럽·미주 사용자에게 잘못된 판정을 내보낸다.
 *  - 팁: 한국에는 팁 문화가 없어 한국어판이 없다. 여기가 원본이다.
 *  - 수면: 90분 사이클은 어디서나 같다.
 */

/* ── BMI ─────────────────────────────────────────────────────── */

/** 세계보건기구 기준. 아시아·태평양 기준은 과체중 23·비만 25로 갈리며 화면에서 함께 낸다. */
export const BMI_WHO = [
  { id: 'under', max: 18.5 },
  { id: 'normal', max: 25 },
  { id: 'over', max: 30 },
  { id: 'obese1', max: 35 },
  { id: 'obese2', max: 40 },
  { id: 'obese3', max: Infinity },
] as const;

/** 같은 값을 아시아·태평양 기준으로 다시 읽는다 */
export const BMI_ASIA = [
  { id: 'under', max: 18.5 },
  { id: 'normal', max: 23 },
  { id: 'over', max: 25 },
  { id: 'obese1', max: 30 },
  { id: 'obese2', max: Infinity },
] as const;

export interface BmiResult {
  bmi: number;
  whoId: string;
  asiaId: string;
  /** 정상 범위(18.5~24.9)에 해당하는 체중 */
  healthyMin: number;
  healthyMax: number;
  /** 정상 상한까지 남은(넘은) 무게 — 음수면 여유가 있다 */
  toHealthy: number;
}

export function calcBmi(heightCm: number, weightKg: number): BmiResult | null {
  if (!(heightCm > 0) || !(weightKg > 0)) return null;
  const m = heightCm / 100;
  const bmi = weightKg / (m * m);
  const healthyMin = Math.round(18.5 * m * m * 10) / 10;
  const healthyMax = Math.round(24.9 * m * m * 10) / 10;
  return {
    bmi: Math.round(bmi * 10) / 10,
    whoId: (BMI_WHO.find(l => bmi < l.max) ?? BMI_WHO[BMI_WHO.length - 1]).id,
    asiaId: (BMI_ASIA.find(l => bmi < l.max) ?? BMI_ASIA[BMI_ASIA.length - 1]).id,
    healthyMin,
    healthyMax,
    toHealthy: Math.round((weightKg - healthyMax) * 10) / 10,
  };
}

/* ── 팁 ──────────────────────────────────────────────────────── */

/** 미국 식당에서 실제로 쓰이는 구간. 나라마다 다르다는 것은 FAQ에서 다룬다. */
export const TIP_PRESETS = [10, 15, 18, 20, 25] as const;

export interface TipResult {
  tip: number;
  total: number;
  perPerson: number;
  tipPerPerson: number;
  /** 1인당 총액을 올림해 떨어뜨린 값 — 현금으로 나눌 때 쓴다 */
  roundedPerPerson: number;
}

export function calcTip(bill: number, pct: number, people: number, roundUp: boolean): TipResult | null {
  if (!(bill > 0) || !(people >= 1)) return null;
  const tip = bill * pct / 100;
  const total = bill + tip;
  const perPerson = total / people;
  return {
    tip: Math.round(tip * 100) / 100,
    total: Math.round(total * 100) / 100,
    perPerson: Math.round(perPerson * 100) / 100,
    tipPerPerson: Math.round((tip / people) * 100) / 100,
    roundedPerPerson: roundUp ? Math.ceil(perPerson) : Math.round(perPerson * 100) / 100,
  };
}

/* ── 수면 사이클 ─────────────────────────────────────────────── */

/** 한 사이클 90분. 잠드는 데 걸리는 시간은 기본 15분으로 잡는다. */
export const CYCLE_MIN = 90;
export const FALL_ASLEEP_MIN = 15;

/** "23:30" → 분. 잘못된 값이면 null */
export function parseHm(s: string): number | null {
  const m = /^(\d{1,2}):(\d{2})$/.exec(s.trim());
  if (!m) return null;
  const h = Number(m[1]), mi = Number(m[2]);
  if (h > 23 || mi > 59) return null;
  return h * 60 + mi;
}

export function fmtHm(min: number): string {
  const t = ((min % 1440) + 1440) % 1440;
  return `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;
}

export interface SleepOption {
  cycles: number;
  /** 결과 시각(분) — 방향에 따라 취침 시각이거나 기상 시각 */
  at: number;
  /** 실제 잠자는 시간(분) — 잠드는 시간은 뺀다 */
  sleepMin: number;
}

/**
 * @param mode 'wake' = 이 시각에 일어나려면 언제 자야 하나
 *             'bed'  = 지금 자면 언제 일어나야 하나
 */
export function sleepOptions(baseMin: number, mode: 'wake' | 'bed'): SleepOption[] {
  return [6, 5, 4, 3].map(cycles => {
    const span = cycles * CYCLE_MIN;
    const at = mode === 'wake'
      ? baseMin - span - FALL_ASLEEP_MIN
      : baseMin + FALL_ASLEEP_MIN + span;
    return { cycles, at: ((at % 1440) + 1440) % 1440, sleepMin: span };
  });
}
