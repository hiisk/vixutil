/**
 * 배수와 단위 하나가 만드는 수, 그리고 세 가지로 끊은 자릿점.
 *
 * 값은 배수 × 10^지수다. 지수가 19까지 가므로 배정도 실수로는 정확하지
 * 않다 — 2^53을 넘으면 정수가 성기게 놓이기 때문이다. 그래서 값을 BigInt로
 * 다루고, 자릿점은 문자열을 뒤에서부터 끊어 넣는다.
 *
 * 끊는 자리가 체계마다 다르다.
 *
 *   영어권    셋씩            1,000,000
 *   인도      셋 뒤부터 둘씩   10,00,000
 *   동아시아  넷씩            100,0000
 *
 * 인도 표기가 낯선 것은 자릿점 사이가 고르지 않아서다. 맨 뒤 세 자리만
 * 떼고 그다음부터 두 자리씩 끊는다 — lakh(10만)와 crore(1000만)가 각각
 * 두 자리씩 올라가기 때문이다.
 */
import {
  EAST_GROUP, FACTORS, INDIAN_GROUP, INDIAN_HEAD, UNITS, WESTERN_GROUP,
  type Cell, type System, slugOf, unitOf,
} from './list.ts';

/**
 * 10의 거듭제곱을 만들 때 쓰는 밑.
 *
 * `10n` 꼴의 BigInt 리터럴은 타입 검사의 목표가 ES2017이라 쓸 수 없다.
 * 저장소 설정을 바꾸는 대신 함수 꼴로 만든다.
 */
const TEN = BigInt(10);

/** 10의 거듭제곱 */
export const pow10 = (exp: number): bigint => TEN ** BigInt(exp);

/** 배수와 지수에서 정확한 값 */
export const valueOf = (factor: number, exp: number): bigint => BigInt(factor) * pow10(exp);

/** 뒤에서부터 고른 폭으로 끊는다 — 영어권과 동아시아가 이 꼴이다 */
export function groupEvenly(digits: string, size: number): string {
  const out: string[] = [];
  for (let end = digits.length; end > 0; end -= size) {
    out.unshift(digits.slice(Math.max(0, end - size), end));
  }
  return out.join(',');
}

/** 맨 뒤 셋을 떼고 그다음부터 둘씩 끊는다 — 인도식이다 */
export function groupIndian(digits: string): string {
  if (digits.length <= INDIAN_HEAD) return digits;
  const head = digits.slice(0, -INDIAN_HEAD);
  const tail = digits.slice(-INDIAN_HEAD);
  return `${groupEvenly(head, INDIAN_GROUP)},${tail}`;
}

/**
 * 이 수를 다른 단위로 세면 몇인가 — 정확한 십진 문자열로 낸다.
 *
 * 값이 배수 × 10^지수 꼴이므로, 다른 단위로 옮기는 것은 소수점을 옮기는 일에
 * 지나지 않는다. 나눗셈을 하지 않으니 1 crore가 0.1억이라는 답이 반올림 없이
 * 그대로 나온다.
 */
export function amountIn(factor: number, exp: number, target: number): string {
  const delta = exp - target;
  if (delta >= 0) return (BigInt(factor) * pow10(delta)).toString();
  const digits = String(factor).padStart(-delta + 1, '0');
  const cut = digits.length + delta;
  const whole = digits.slice(0, cut);
  const frac = digits.slice(cut).replace(/0+$/, '');
  return frac ? `${whole}.${frac}` : whole;
}

/** 견주어 보일 단위 — 세 체계에서 널리 쓰는 것만 */
export const REFERENCES = [
  { key: 'lakh', exp: 5 },
  { key: 'crore', exp: 7 },
  { key: 'million', exp: 6 },
  { key: 'billion', exp: 9 },
  { key: 'man', exp: 4 },
  { key: 'eok', exp: 8 },
  { key: 'jo', exp: 12 },
] as const;

export interface Neighbour {
  slug: string;
  unit: string;
  factor: number;
}

export interface Same {
  key: string;
  system: System;
  exp: number;
}

export interface BigNumFacts {
  cell: Cell;
  slug: string;
  system: System;
  /** 단위의 지수 */
  exp: number;
  /** 정확한 값 */
  value: bigint;
  /** 값의 자릿수 */
  digits: number;
  /** 셋씩 끊은 표기 */
  western: string;
  /** 인도식으로 끊은 표기 */
  indian: string;
  /** 넷씩 끊은 표기 */
  east: string;
  /** 같은 값을 가리키는 다른 이름 — arab과 billion처럼 */
  twins: Same[];
  /** 널리 쓰는 단위로 옮겨 센 값 */
  amounts: { key: string; exp: number; amount: string }[];
  smaller: Neighbour | null;
  larger: Neighbour | null;
}

export function bigNumFacts(c: Cell): BigNumFacts {
  const u = unitOf(c.unit);
  if (!u) throw new Error(`단위가 없다: ${c.unit}`);
  const value = valueOf(c.factor, u.exp);
  const digits = value.toString();
  const i = FACTORS.indexOf(c.factor);
  const near = (factor: number): Neighbour => ({ slug: slugOf({ unit: c.unit, factor }), unit: c.unit, factor });

  return {
    cell: c,
    slug: slugOf(c),
    system: u.system,
    exp: u.exp,
    value,
    digits: digits.length,
    western: groupEvenly(digits, WESTERN_GROUP),
    indian: groupIndian(digits),
    east: groupEvenly(digits, EAST_GROUP),
    twins: UNITS.filter(x => x.exp === u.exp && x.key !== u.key).map(x => ({ key: x.key, system: x.system, exp: x.exp })),
    amounts: REFERENCES.map(r => ({ key: r.key, exp: r.exp, amount: amountIn(c.factor, u.exp, r.exp) })),
    smaller: i > 0 ? near(FACTORS[i - 1]) : null,
    larger: i + 1 < FACTORS.length ? near(FACTORS[i + 1]) : null,
  };
}

/** 같은 단위의 한 줄 */
export const atUnit = (unit: string): Cell[] => FACTORS.map(factor => ({ unit, factor }));

/** 같은 배수의 한 줄 */
export const atFactor = (factor: number): Cell[] => UNITS.map(u => ({ unit: u.key, factor }));
