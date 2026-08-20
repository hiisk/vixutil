/**
 * 나라를 안 타는 계산 다섯 — BMI, 팁, 수면 사이클, 나이, 할인.
 *
 * 다 아홉 언어로 낸다. 한국어판이 이미 있지만 **그대로 번역하면 틀린다**:
 *  - BMI: 한국어판은 아시아·태평양 기준(25 이상 비만)을 쓴다. 세계 기준은 30이다.
 *    번역판에 25를 그대로 두면 유럽·미주 사용자에게 잘못된 판정을 내보낸다.
 *  - 팁: 한국에는 팁 문화가 없어 한국어판이 없다. 여기가 원본이다.
 *  - 수면: 90분 사이클은 어디서나 같다.
 *  - 나이: 한국어판은 만 나이·세는 나이·연 나이를 나란히 낸다. 셋 다 한국
 *    밖에서는 뜻이 없다 — 바깥에서 막히는 것은 2월 29일생과 «몇 년 몇 개월
 *    며칠»이다.
 *  - 할인: 계산 자체는 어디서나 같지만 한국어판에 없는 연속 할인을 넣었다.
 */
import { span, addMonths, daysBetween } from './date-calc.ts';

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

/* ── 나이 ────────────────────────────────────────────────────── */

/**
 * 'YYYY-MM-DD' → 그 지역 자정. 없는 날짜면 null.
 *
 * new Date('2026-02-31')은 던지지 않고 3월 3일로 조용히 넘어간다. 되짚어
 * 확인하지 않으면 «2월 31일생»이 나이 계산에 그대로 들어간다.
 */
function parseDate(s: string): Date | null {
  const m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(s.trim());
  if (!m) return null;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const dt = new Date(y, mo - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
  return dt;
}

export interface AgeResult {
  /** 채운 나이 — 생일이 안 지났으면 해 차이보다 하나 적다 */
  years: number;
  months: number;
  days: number;
  totalMonths: number;
  totalWeeks: number;
  totalDays: number;
  totalHours: number;
  /** 다음 생일까지 남은 날. 오늘이 생일이면 다음 해까지 센다 */
  toNextBirthday: number;
  nextAge: number;
  /** 태어난 날의 요일 (0=일요일) — 이름은 화면에서 그 언어로 짓는다 */
  bornWeekday: number;
  /** 2월 29일생인가 — 평년에 생일이 없어 화면에서 한 줄 덧붙인다 */
  leapling: boolean;
}

/**
 * 두 날짜 사이의 나이.
 *
 * 한국어판(app/(ko)/calculator/age)을 옮긴 것이 **아니다**. 저쪽은 만 나이·세는
 * 나이·연 나이 셋을 나란히 내는데 그 셋은 한국 밖에서 뜻이 없다. 밖에서
 * «age calculator»를 치는 사람이 막히는 자리는 다른 둘이다.
 *
 *  - 2월 29일생: 평년에 생일이 없다. addMonths가 2월 28일로 눌러 주는 규칙을
 *    나이와 다음 생일 **양쪽에 같이** 쓴다. 한쪽만 다르게 잡으면 «생일이
 *    지났는데 남은 날이 365»처럼 어긋난다.
 *  - «몇 년 몇 개월 며칠»: 개월은 길이가 달라 일수를 나눠서는 못 구한다.
 *    lib/date-calc.ts의 span이 그 자리를 이미 풀어 놓았으므로 그대로 쓴다.
 */
export function calcAge(birth: string, on: string): AgeResult | null {
  const b = parseDate(birth);
  const d = parseDate(on);
  if (!b || !d || b > d) return null;

  const s = span(b, d);
  const next = addMonths(b, (s.years + 1) * 12);

  return {
    years: s.years,
    months: s.months,
    days: s.days,
    totalMonths: s.years * 12 + s.months,
    totalWeeks: s.weeks,
    totalDays: s.totalDays,
    totalHours: s.totalHours,
    toNextBirthday: daysBetween(d, next),
    nextAge: s.years + 1,
    bornWeekday: b.getDay(),
    leapling: b.getMonth() === 1 && b.getDate() === 29,
  };
}

/* ── 할인 ────────────────────────────────────────────────────── */

/**
 * 정가·할인가·할인율 셋 중 둘을 알면 나머지가 나온다.
 *
 * 한국어판과 갈리는 곳은 연속 할인이다. «30% 뒤에 쿠폰 20%»는 50%가 아니라
 * 44%인데, 그 자리를 계산기가 안 잡아 주면 사람이 더해 버린다. 통화 기호는
 * 붙이지 않는다 — 나라마다 다르고, 하나를 고르면 나머지가 틀린다.
 */
export interface DiscountResult {
  original: number;
  final: number;
  saved: number;
  /** 실질 할인율(%) — 연속 할인이면 합이 아니라 곱의 결과가 온다 */
  rate: number;
}

/* 금액도 비율도 소수 둘째 자리까지 — calcTip의 매개변수 pct와 헷갈리지 않게 이름을 나눈다 */
const round2 = (n: number) => Math.round(n * 100) / 100;

/** 연속 할인의 실질 할인율. 30% 뒤의 20%는 이미 깎인 값에 걸려 44%가 된다 */
export function stackedRate(rates: number[]): number {
  return round2((1 - rates.reduce((k, r) => k * (1 - r / 100), 1)) * 100);
}

/** 정가 + 할인율(연속이면 여럿) → 할인가 */
export function discountFromRate(original: number, rates: number[]): DiscountResult | null {
  if (!(original > 0) || !rates.length) return null;
  if (rates.some(r => !(r >= 0) || r > 100)) return null;
  /* 곱한 비율에서 바로 값을 낸다 — 실질 할인율을 먼저 반올림하면 금액이 어긋난다 */
  const factor = rates.reduce((k, r) => k * (1 - r / 100), 1);
  const final = original * factor;
  return { original: round2(original), final: round2(final), saved: round2(original - final), rate: round2((1 - factor) * 100) };
}

/** 정가 + 할인가 → 할인율 */
export function discountFromPrices(original: number, final: number): DiscountResult | null {
  if (!(original > 0) || !(final >= 0) || final > original) return null;
  return {
    original: round2(original), final: round2(final),
    saved: round2(original - final), rate: round2((1 - final / original) * 100),
  };
}

/** 할인가 + 할인율 → 정가 역산. 100% 할인은 되짚을 수 없다(0으로 나눈다) */
export function originalFromDiscount(final: number, rate: number): DiscountResult | null {
  if (!(final > 0) || !(rate >= 0) || rate >= 100) return null;
  const original = final / (1 - rate / 100);
  return { original: round2(original), final: round2(final), saved: round2(original - final), rate: round2(rate) };
}
