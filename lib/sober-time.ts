/**
 * 음주 후 혈중알코올농도(BAC)와 분해 시간 — 위드마크(Widmark) 공식.
 *
 * 이 계산기의 목적은 "지금 운전해도 되는지" 허락하는 게 아니라, 술이 생각보다
 * 늦게 깬다는 걸 보여주는 것이다. 특히 다음 날 아침 숙취운전이 여전히 단속 기준을
 * 넘는 경우가 많다. 그래서 결과는 "안전하다"가 아니라 "이 시각까지도 기준을
 * 넘는다"로 읽히도록 설계한다.
 *
 * 개인차가 매우 크다 — 위 상태, 체질, 약물, 수면은 반영되지 않는다. 위드마크는
 * 평균적 추정일 뿐이다. 운전 전 안전한 음주량은 0이며, 이 값은 참고용이다.
 *
 * 공식:
 *   섭취 알코올량 A(g) = 마신 양(mL) × 도수/100 × 0.789(에탄올 밀도)
 *   최고 혈중농도(%) = A / (체중kg × 성별계수 r × 10)
 *   경과 t시간 후 = 최고농도 − 0.015 × t   (시간당 약 0.015%씩 분해)
 */

/** 성별 위드마크 계수 (체내 수분 분포 비율) */
export const WIDMARK_R = { male: 0.7, female: 0.6 } as const;
export type Sex = keyof typeof WIDMARK_R;

/** 시간당 알코올 분해율 (%/h) — 개인차가 있어 평균값을 쓴다 */
export const ELIMINATION_PER_HOUR = 0.015;

/** 에탄올 밀도 (g/mL) */
export const ETHANOL_DENSITY = 0.789;

/** 도로교통법 기준 혈중알코올농도(%) */
export const BAC_LIMITS = {
  /** 면허정지 */
  suspend: 0.03,
  /** 면허취소 */
  revoke: 0.08,
} as const;

export interface Drink {
  /** 마신 양 (mL) */
  volumeMl: number;
  /** 도수 (%) */
  abv: number;
}

/** 흔한 술의 1잔/1병 기준값 — UI 편의용 프리셋 */
export const DRINK_PRESETS: { id: string; label: string; volumeMl: number; abv: number }[] = [
  { id: 'soju-glass',  label: '소주 1잔',   volumeMl: 50,  abv: 17 },
  { id: 'soju-bottle', label: '소주 1병',   volumeMl: 360, abv: 17 },
  { id: 'beer-glass',  label: '맥주 1잔',   volumeMl: 200, abv: 4.5 },
  { id: 'beer-can',    label: '맥주 1캔',   volumeMl: 355, abv: 4.5 },
  { id: 'beer-bottle', label: '맥주 500cc', volumeMl: 500, abv: 4.5 },
  { id: 'wine-glass',  label: '와인 1잔',   volumeMl: 150, abv: 12 },
  { id: 'makgeolli',   label: '막걸리 1사발', volumeMl: 300, abv: 6 },
  { id: 'whisky-shot', label: '위스키 1샷', volumeMl: 30,  abv: 40 },
];

export interface SoberInput {
  drinks: Drink[];
  /** 체중 (kg) */
  weightKg: number;
  sex: Sex;
  /** 음주를 마친 뒤 경과 시간 (h) */
  hoursSince: number;
}

export interface SoberResult {
  /** 순수 알코올 총량 (g) */
  alcoholGrams: number;
  /** 최고 혈중알코올농도 (%) */
  peakBac: number;
  /** 현재(경과 t시간 후) 혈중알코올농도 (%) — 0 미만이면 0 */
  currentBac: number;
  /** 완전 분해(0%)까지 음주 종료 시점 기준 필요 시간 (h) */
  hoursToZero: number;
  /** 면허정지 기준(0.03%) 아래로 내려가는 데 필요한 시간 (h). 이미 아래면 0 */
  hoursToSuspendLimit: number;
  /** 지금 면허정지 기준 이상인가 */
  overSuspendNow: boolean;
  /** 지금 면허취소 기준 이상인가 */
  overRevokeNow: boolean;
}

function alcoholGrams(drinks: Drink[]): number {
  return drinks.reduce((sum, d) => {
    const v = Math.max(0, d.volumeMl);
    const abv = Math.max(0, d.abv);
    return sum + v * (abv / 100) * ETHANOL_DENSITY;
  }, 0);
}

export function calcSoberTime({ drinks, weightKg, sex, hoursSince }: SoberInput): SoberResult {
  const grams = alcoholGrams(drinks);
  const weight = Math.max(0, weightKg);
  const t = Math.max(0, hoursSince);
  const r = WIDMARK_R[sex];

  // 체중이 0이면 나눗셈이 불가능하다. 모두 0으로 돌려 화면이 깨지지 않게 한다.
  if (weight <= 0 || grams <= 0) {
    return {
      alcoholGrams: grams, peakBac: 0, currentBac: 0,
      hoursToZero: 0, hoursToSuspendLimit: 0,
      overSuspendNow: false, overRevokeNow: false,
    };
  }

  const peakBac = grams / (weight * r * 10);
  const currentBac = Math.max(0, peakBac - ELIMINATION_PER_HOUR * t);

  // 음주 종료 시점 기준, 각 기준까지 필요한 총 시간.
  const hoursToZero = peakBac / ELIMINATION_PER_HOUR;
  const hoursToSuspendLimit = Math.max(0, (peakBac - BAC_LIMITS.suspend) / ELIMINATION_PER_HOUR);

  return {
    alcoholGrams: grams,
    peakBac,
    currentBac,
    hoursToZero,
    hoursToSuspendLimit,
    overSuspendNow: currentBac >= BAC_LIMITS.suspend,
    overRevokeNow: currentBac >= BAC_LIMITS.revoke,
  };
}
