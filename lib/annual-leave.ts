/**
 * 연차 유급휴가 발생일수 — 근로기준법 제60조.
 *
 *  - 1년간 80% 이상 출근: 15일
 *  - 계속근로 1년 미만(또는 출근율 80% 미만): 1개월 개근할 때마다 1일, 최대 11일
 *  - 3년 이상 계속근로: 최초 1년을 초과하는 매 2년마다 1일 가산
 *  - 총 한도 25일
 *
 * 일수 산정은 법에 명시돼 있어 회사마다 달라지지 않는다. 다만 회계연도 기준으로
 * 운영하는 회사는 부여 시점이 다를 수 있어 실제 부여일수는 취업규칙을 따른다.
 */

export const LEAVE_RULES = {
  /** 1년 이상 근속 시 기본 일수 */
  base: 15,
  /** 1년 미만 근속자의 최대 일수 (매월 개근 1일씩) */
  underOneYearMax: 11,
  /** 법정 상한 */
  cap: 25,
} as const;

export interface AnnualLeaveResult {
  /** 발생 연차 일수 */
  days: number;
  /** 가산 일수 (기본 15일에 더해진 몫) */
  bonus: number;
  /** 법정 상한에 도달했는지 */
  capped: boolean;
  /** 1년 미만 근속자인지 */
  underOneYear: boolean;
  /** 다음으로 일수가 늘어나는 근속연수 (상한 도달 시 null) */
  nextIncreaseYear: number | null;
}

/**
 * @param years 완성된 계속근로 연수 (1년 이상 근무했으면 1, 3년차면 3)
 * @param fullAttendanceMonths 1년 미만일 때 개근한 개월 수
 */
export function calcAnnualLeave(years: number, fullAttendanceMonths = 0): AnnualLeaveResult {
  const { base, underOneYearMax, cap } = LEAVE_RULES;

  const y = Math.floor(Number.isFinite(years) && years > 0 ? years : 0);

  if (y < 1) {
    const months = Math.floor(Number.isFinite(fullAttendanceMonths) && fullAttendanceMonths > 0 ? fullAttendanceMonths : 0);
    const days = Math.min(months, underOneYearMax);
    return {
      days,
      bonus: 0,
      capped: false,
      underOneYear: true,
      nextIncreaseYear: 1,
    };
  }

  // 최초 1년을 초과하는 매 2년마다 1일 — 3년차 16일, 5년차 17일 …
  const rawBonus = Math.floor((y - 1) / 2);
  const days = Math.min(base + rawBonus, cap);
  const capped = base + rawBonus >= cap;
  const bonus = days - base;

  // 다음 가산은 홀수 연차(3, 5, 7 …)에 생긴다.
  const nextIncreaseYear = capped ? null : (y % 2 === 0 ? y + 1 : y + 2);

  return { days, bonus, capped, underOneYear: false, nextIncreaseYear };
}
