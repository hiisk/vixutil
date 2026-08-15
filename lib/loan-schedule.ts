/**
 * 대출 상환방식 — 같은 돈을 빌려도 방식에 따라 이자가 다르다.
 *
 * 세 가지가 흔하다.
 *   원리금균등  매달 내는 돈이 같다. 처음에는 대부분 이자고 뒤로 갈수록 원금이 는다.
 *   원금균등    매달 갚는 원금이 같다. 처음이 가장 무겁고 점점 가벼워진다.
 *   만기일시    이자만 내다가 만기에 원금을 한 번에 갚는다.
 *
 * **총이자는 원금이 얼마나 빨리 줄어드느냐로 정해진다.** 원금균등이 가장 적고,
 * 만기일시가 가장 많다. 대신 원금균등은 첫 달 부담이 가장 크다 — 그 맞바꿈을
 * 눈으로 보라고 세 가지를 나란히 낸다.
 */

export type Method = 'equal-payment' | 'equal-principal' | 'bullet';

export interface Loan {
  /** 원금(원) */
  principal: number;
  /** 연이율(%) — 5.5%면 5.5 */
  annualRate: number;
  /** 기간(개월) */
  months: number;
}

export interface Schedule {
  method: Method;
  /** 첫 달에 내는 돈(원) */
  firstPayment: number;
  /** 마지막 달에 내는 돈(원) */
  lastPayment: number;
  /** 이자 합계(원) */
  totalInterest: number;
  /** 원금과 이자를 합한 총 상환액(원) */
  totalPaid: number;
}

/** 월이율 — 연이율을 12로 나눈다 */
export const monthlyRate = (annualRate: number): number => annualRate / 100 / 12;

/**
 * 원리금균등의 월 상환액.
 *
 *   A = P × i ÷ (1 − (1+i)^−n)
 *
 * 이율이 0이면 이 식이 0으로 나뉘므로 원금을 개월로 나눈다.
 */
export function equalPayment(principal: number, annualRate: number, months: number): number {
  const i = monthlyRate(annualRate);
  if (months <= 0) return 0;
  if (i === 0) return principal / months;
  return (principal * i) / (1 - (1 + i) ** -months);
}

/**
 * equalPayment의 역함수 — 월 상환액에서 빌릴 수 있는 원금을 푼다.
 *
 *   P = A × (1 − (1+i)^−n) ÷ i
 *
 * 대출한도(DTI·DSR)와 은퇴 후 정액인출이 같은 식을 쓴다. 세 곳에 따로 적혀
 * 있었고 그중 하나는 이율 0에서 0으로 나눴다.
 */
export function principalFor(payment: number, annualRate: number, months: number): number {
  const i = monthlyRate(annualRate);
  if (months <= 0) return 0;
  if (i === 0) return payment * months;
  return (payment * (1 - (1 + i) ** -months)) / i;
}

export function schedule(loan: Loan, method: Method): Schedule {
  const { principal, annualRate, months } = loan;
  const i = monthlyRate(annualRate);
  if (months <= 0 || principal <= 0) {
    return { method, firstPayment: 0, lastPayment: 0, totalInterest: 0, totalPaid: principal };
  }

  if (method === 'bullet') {
    const monthly = principal * i;
    return {
      method,
      firstPayment: monthly,
      lastPayment: monthly + principal,
      totalInterest: monthly * months,
      totalPaid: principal + monthly * months,
    };
  }

  if (method === 'equal-payment') {
    const a = equalPayment(principal, annualRate, months);
    return {
      method,
      firstPayment: a,
      lastPayment: a,
      totalInterest: a * months - principal,
      totalPaid: a * months,
    };
  }

  // 원금균등 — 매달 같은 원금에, 남은 원금에 붙는 이자를 더한다
  const part = principal / months;
  let interest = 0;
  for (let m = 0; m < months; m++) interest += (principal - part * m) * i;
  return {
    method,
    firstPayment: part + principal * i,
    lastPayment: part + part * i,
    totalInterest: interest,
    totalPaid: principal + interest,
  };
}

export const ALL_METHODS: { key: Method; label: string }[] = [
  { key: 'equal-payment', label: '원리금균등' },
  { key: 'equal-principal', label: '원금균등' },
  { key: 'bullet', label: '만기일시' },
];

export const compareAll = (loan: Loan): Schedule[] => ALL_METHODS.map(m => schedule(loan, m.key));
