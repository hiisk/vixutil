/**
 * 연봉 실수령액 값 낱장 — `/calculator/salary/5000` (연봉 5,000만원).
 *
 * ── 왜 값 낱장인가 ──────────────────────────────────────────
 * 사람은 "실수령액 계산기"가 아니라 **"연봉 5000 실수령"**이라고 친다.
 * 계산기는 이미 있고(lib/salary.ts) 요율도 거기 하나에만 있다 — 여기서는
 * **계산을 다시 쓰지 않고** 값 목록과 이웃만 정한다.
 *
 * 한국어 전용이다. 4대보험·근로소득세는 한국 제도라 다른 언어로 낼 것이 없다.
 * 라우트도 안 늘린다 — 이미 있는 `[section]/[slug]/[deep]` 디스패처에 얹는다.
 */
import { calcSalary } from './salary.ts';

/** 연봉(만원) — 2,400만부터 1억 2천만까지 100만 단위 */
export const SALARIES: readonly number[] =
  Array.from({ length: 97 }, (_, i) => 2400 + i * 100);

export const SALARY_COUNT = SALARIES.length;

/** 주소 조각은 만원 단위 숫자 그대로 — `/calculator/salary/5000` */
export function parseSalarySlug(s: string): number | null {
  /* 앞자리 0을 막는다 — '05000'이 5000으로 읽히면 같은 장이 두 주소가 된다 */
  if (!/^[1-9]\d{3,4}$/.test(s)) return null;
  const n = Number(s);
  return SALARIES.includes(n) ? n : null;
}

/** 그 연봉의 계산 결과 — 만원을 원으로 바꿔 넘긴다 */
export const resultFor = (manwon: number, dependents = 1) =>
  calcSalary(manwon * 10_000, dependents, true);

/**
 * 이웃 연봉 — 앞뒤 둘과 ±1,000만원.
 * 상하로 서로 가리키므로 고아가 없다(lib/related-window.ts와 같은 규칙).
 */
export function neighborSalaries(manwon: number): number[] {
  const at = SALARIES.indexOf(manwon);
  const pick = (k: number) => SALARIES[Math.min(Math.max(at + k, 0), SALARIES.length - 1)];
  return [...new Set([pick(-2), pick(-1), pick(1), pick(2), pick(-10), pick(10)])].filter(v => v !== manwon);
}
