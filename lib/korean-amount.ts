/**
 * 숫자 → 한글 금액 표기.
 *
 * 계약서·영수증·경조사 봉투에 쓰는 "일금 삼백오십만원정"을 만든다. 이런 표기를
 * 쓰는 이유는 위조를 막기 위해서다 — 아라비아 숫자 3,500,000은 앞에 1을 붙이면
 * 35,000,000이 되지만 한글로 적힌 삼백오십만은 고치기 어렵다. 그래서 정식
 * 표기에서는 십·백·천 앞의 '일'도 생략하지 않는다(일십만 ≠ 십만이 아니라,
 * 빈자리를 남기지 않으려는 것이다).
 *
 * 읽기용(간략)은 반대로 사람이 말하는 대로 — 만, 십만, 백만처럼 앞의 '일'을 뺀다.
 */
const DIGITS = ['영', '일', '이', '삼', '사', '오', '육', '칠', '팔', '구'];
const SMALL = ['', '십', '백', '천'];
const BIG = ['', '만', '억', '조', '경'];

/** 최대 자릿수 — 경 단위를 넘어가면 표기할 단위가 없다 */
export const MAX_DIGITS = BIG.length * 4;

/** 네 자리 이하 묶음 하나를 한글로. */
function chunk(value: number, formal: boolean): string {
  let out = '';
  const digits = String(value).padStart(4, '0').split('').map(Number);
  digits.forEach((d, i) => {
    if (d === 0) return;
    const unit = SMALL[3 - i];
    // 간략 표기에서 '일십' '일백' '일천'은 십·백·천으로 줄인다
    const head = d === 1 && unit && !formal ? '' : DIGITS[d];
    out += head + unit;
  });
  return out;
}

export interface AmountOptions {
  /** 계약서용 정식 표기(일십·일백을 살림) */
  formal?: boolean;
  /** 만·억 사이를 띄어 읽기 쉽게 */
  spaced?: boolean;
}

/** 숫자를 한글 수사로. 12345 → '일만이천삼백사십오' */
export function toKoreanNumber(input: number | string, { formal = true, spaced = false }: AmountOptions = {}): string {
  const digits = String(input).replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '');
  if (digits === '' ) return '';
  if (digits === '0') return '영';
  if (digits.length > MAX_DIGITS) return '';

  // 뒤에서부터 네 자리씩 끊는다 — 만·억·조가 네 자리마다 바뀌기 때문이다
  const groups: number[] = [];
  for (let end = digits.length; end > 0; end -= 4) {
    groups.push(Number(digits.slice(Math.max(0, end - 4), end)));
  }

  const parts: string[] = [];
  groups.forEach((value, i) => {
    if (value === 0) return;
    const body = chunk(value, formal);
    // 간략 표기의 '일만'은 '만'으로 — 사람은 만 원이라고 말하지 일만 원이라 하지 않는다
    const trimmed = !formal && value === 1 && i === 1 ? '' : body;
    parts.push(trimmed + BIG[i]);
  });

  const ordered = parts.reverse();
  return spaced ? ordered.join(' ') : ordered.join('');
}

/** 계약서·봉투용 한 줄. 3500000 → '일금 삼백오십만원정' */
export function toKoreanAmount(input: number | string, options: AmountOptions = {}): string {
  const korean = toKoreanNumber(input, options);
  if (!korean) return '';
  return `일금 ${korean}원정`;
}

/** 1234567 → '1,234,567' */
export function withCommas(input: number | string): string {
  const digits = String(input).replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '');
  if (!digits) return '';
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 사람이 실제로 읽는 방식. 123456789 → '1억 2,345만 6,789'
 *
 * 큰 금액은 한글 수사보다 이 형태가 훨씬 빨리 읽힌다. 계약서에는 못 쓰지만
 * "얼마인지 감이 안 온다"는 문제를 푸는 건 이쪽이다.
 */
export function toReadable(input: number | string): string {
  const digits = String(input).replace(/[^\d]/g, '').replace(/^0+(?=\d)/, '');
  if (!digits) return '';
  if (digits === '0') return '0';
  if (digits.length > MAX_DIGITS) return '';

  const groups: number[] = [];
  for (let end = digits.length; end > 0; end -= 4) {
    groups.push(Number(digits.slice(Math.max(0, end - 4), end)));
  }

  const parts: string[] = [];
  groups.forEach((value, i) => {
    if (value === 0) return;
    parts.push(`${withCommas(value)}${BIG[i]}`);
  });
  return parts.reverse().join(' ');
}
