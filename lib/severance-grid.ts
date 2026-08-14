/**
 * 퇴직금 값 낱장 — `/calculator/severance/300-5` (월급 300만원 · 근속 5년).
 *
 * ── 왜 이 격자인가 ──────────────────────────────────────────
 * 사람은 "퇴직금 계산법"이 아니라 **자기 숫자**로 검색한다("월급 300 3년 퇴직금").
 * 계산기는 이미 있고 식도 검증돼 있으니 여기서는 **계산을 다시 쓰지 않는다** —
 * lib/severance.ts의 calcSeverance를 그대로 부른다. 검사가 그것을 본다.
 *
 * ── 퇴직월이 답을 바꾼다 ────────────────────────────────────
 * 흔히 "퇴직금 = 월급 × 근속연수"라고 하지만 틀린다. 평균임금이 **퇴직 전 3개월의
 * 실제 일수**로 나뉘는데 그 일수가 달마다 다르기 때문이다. 3·4월 말에 그만두면
 * 그 3개월이 90일, 나머지 달은 92일이라 같은 월급·같은 근속인데 퇴직금이 2%
 * 달라진다. 이 낱장이 실제로 알려주는 것이 그 차이다.
 *
 * 월급 × 근속이 같은 칸은 퇴직금도 같다(280만·3년 = 210만·4년). 그래서 낱장마다
 * **근속별 표**를 함께 낸다 — 그 표는 월급이 다르면 다르다. 검사가 그것을 본다.
 *
 * 대표값은 **2026-12-31 퇴직**으로 못 박는다. `new Date()`를 쓰면 여는 날마다
 * 답이 달라져 ISR 캐시를 매번 다시 쓰고 하이드레이션도 깨진다.
 */
import { calcSeverance } from './severance.ts';

/** 대표 퇴직일 — 해가 바뀌면 이 한 줄을 고친다 */
export const REF_YEAR = 2026;

/** 월 급여(만원) — 200만~600만, 10만원 단위 */
export const WAGES: readonly number[] = Array.from({ length: 41 }, (_, i) => 200 + i * 10);

/** 근속 연수 — 사람이 실제로 검색하는 해 */
export const YEARS: readonly number[] = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20];

export const severanceSlug = (wage: number, years: number): string => `${wage}-${years}`;

/**
 * 주소 조각 → (월급, 근속). 목록 밖이면 null이라 404가 된다.
 *
 * 앞자리 0을 막는다 — '0300-5'가 300으로 읽히면 같은 장이 두 주소가 된다.
 */
export function parseSeveranceSlug(s: string): { wage: number; years: number } | null {
  const m = /^([1-9]\d{2,3})-([1-9]\d?)$/.exec(s);
  if (!m) return null;
  const wage = Number(m[1]), years = Number(m[2]);
  if (!WAGES.includes(wage) || !YEARS.includes(years)) return null;
  return { wage, years };
}

/** 격자 전부 */
export function allSeveranceCells(): { wage: number; years: number }[] {
  return WAGES.flatMap(w => YEARS.map(y => ({ wage: w, years: y })));
}

/** 월(1~12) 말일 퇴직으로 계산한다 — 근속은 정확히 365 × 연수일로 본다 */
function payAtMonth(wageWon: number, years: number, month: number): { pay: number; days3m: number } {
  /* 지역 시간으로 만든다 — UTC로 만들면 시차가 음수인 곳에서 하루 앞 날짜가 되어
     서버와 브라우저가 다른 답을 그린다(이 저장소가 겪은 하이드레이션 함정). */
  const end = new Date(REF_YEAR, month, 0);                      // 그 달의 마지막 날
  const start = new Date(end.getTime() - years * 365 * 86400000);
  const r = calcSeverance({
    startDate: start, endDate: end,
    wage1: wageWon, wage2: wageWon, wage3: wageWon,
    annualBonus: 0, annualLeavePay: 0, monthlyStdWage: 0,
  });
  return { pay: r.severancePay, days3m: r.threeMonthDays };
}

export interface SeveranceFacts {
  wage: number;
  years: number;
  /** 대표값 — 12월 31일 퇴직 */
  pay: number;
  dailyAvgWage: number;
  totalDays: number;
  threeMonthDays: number;
  /** 퇴직월에 따른 최소·최대와 그 달 */
  min: { month: number; pay: number; days: number };
  max: { month: number; pay: number; days: number };
  /** 흔히 쓰는 어림값 "월급 × 근속연수"와의 차이(원) */
  naiveGap: number;
  /** 같은 월급으로 근속만 달리했을 때 — 낱장의 본문이자 같은 월급 칸끼리의 연결 */
  yearsTable: { years: number; pay: number }[];
}

export function severanceFacts(wage: number, years: number): SeveranceFacts {
  const won = wage * 10_000;
  const ref = payAtMonth(won, years, 12);

  const byMonth = Array.from({ length: 12 }, (_, i) => {
    const { pay, days3m } = payAtMonth(won, years, i + 1);
    return { month: i + 1, pay, days: days3m };
  });
  const sorted = [...byMonth].sort((a, b) => a.pay - b.pay);

  return {
    wage, years,
    pay: ref.pay,
    dailyAvgWage: (won * 3) / ref.days3m,
    totalDays: years * 365,
    threeMonthDays: ref.days3m,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    naiveGap: ref.pay - won * years,
    yearsTable: YEARS.map(y => ({ years: y, pay: payAtMonth(won, y, 12).pay })),
  };
}

/**
 * 이웃 — 월급 앞뒤 한 칸, 근속 앞뒤 한 칸.
 *
 * 끝값은 반대쪽으로 감는다. 앞에서 N개만 뽑으면 목록 뒤쪽이 통째로 고아가 되는데,
 * 이 저장소가 174곳에서 겪은 병이다.
 */
export function neighborCells(wage: number, years: number): { wage: number; years: number }[] {
  const wi = WAGES.indexOf(wage), yi = YEARS.indexOf(years);
  const w = (k: number) => WAGES[(wi + k + WAGES.length) % WAGES.length];
  const y = (k: number) => YEARS[(yi + k + YEARS.length) % YEARS.length];
  return [
    { wage: w(-1), years }, { wage: w(1), years },
    { wage, years: y(-1) }, { wage, years: y(1) },
    { wage: w(5), years }, { wage: w(-5), years },
  ];
}
