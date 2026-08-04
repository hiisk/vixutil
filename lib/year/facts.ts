/**
 * 연도 하나의 값 — 달력 규칙에서 계산한다.
 *
 * 윤년은 4로 나뉘면 윤년이되 100으로 나뉘면 아니고 400으로 나뉘면 다시 윤년이다.
 * 1900년이 윤년이 아니고 2000년이 윤년인 까닭이 여기 있다.
 *
 * 1월 1일의 요일은 체르(Zeller)의 공식으로 낸다. Date 객체를 쓰지 않는 이유는
 * 그 편이 검사하기 좋아서다 — 요일을 규칙에서 뽑고, 검사는 반대편에서 Date로
 * 되짚어 두 길이 만나는지 본다.
 *
 * 간지는 60년, 띠는 12년 주기다. 1984년이 갑자년이므로 그 해를 원점으로 삼아
 * 나머지로 센다.
 */
import { YEARS } from './list.ts';

/** 4로 나뉘면 윤년, 100으로 나뉘면 아님, 400으로 나뉘면 다시 윤년 */
export const isLeap = (y: number): boolean => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

/** 열두 달의 날 수 */
export const monthDays = (y: number): number[] =>
  [31, isLeap(y) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/**
 * 체르의 공식 — 0이 일요일이다.
 *
 * 1·2월을 앞해의 13·14월로 미루면 윤년이 끝에 붙어 식이 하나로 정리된다.
 */
export const weekdayOf = (y: number, month: number, day: number): number => {
  const m = month < 3 ? month + 12 : month;
  const Y = month < 3 ? y - 1 : y;
  const K = Y % 100;
  const J = Math.floor(Y / 100);
  const h = (day + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) + 5 * J) % 7;
  // 체르는 0이 토요일이라 일요일 기준으로 옮긴다
  return (h + 6) % 7;
};

/** 십간 — 갑을병정무기경신임계 */
export const STEMS = ['갑', '을', '병', '정', '무', '기', '경', '신', '임', '계'];
/** 십이지 — 자축인묘진사오미신유술해 */
export const BRANCHES = ['자', '축', '인', '묘', '진', '사', '오', '미', '신', '유', '술', '해'];

export interface YearFacts {
  year: number;
  leap: boolean;
  /** 윤년 규칙 가운데 어느 갈래로 갈렸는지 */
  rule: 'not4' | 'by4' | 'by100' | 'by400';
  days: number;
  febDays: number;
  months: number[];
  /** 1월 1일의 요일 — 0이 일요일 */
  firstWeekday: number;
  /** 12월 31일의 요일 */
  lastWeekday: number;
  /** ISO 기준 주 수 — 52 아니면 53 */
  isoWeeks: number;
  /** 간지에서 십간의 자리 */
  stem: number;
  /** 간지에서 십이지의 자리 */
  branch: number;
  prevLeap: number | null;
  nextLeap: number | null;
  prev: number | null;
  next: number | null;
}

/**
 * ISO 8601 기준으로 53주짜리 해인지.
 *
 * 1월 1일이 목요일이거나, 윤년이면서 수요일이면 53주다. 목요일이 그 해에 하나
 * 더 들어오기 때문이다 — ISO는 목요일이 든 주를 그 해의 주로 센다.
 */
export const isoWeeksOf = (y: number): number => {
  const first = weekdayOf(y, 1, 1);
  return first === 4 || (isLeap(y) && first === 3) ? 53 : 52;
};

export function yearFacts(year: number): YearFacts {
  const leap = isLeap(year);
  const months = monthDays(year);

  const rule: YearFacts['rule'] =
    year % 400 === 0 ? 'by400' : year % 100 === 0 ? 'by100' : year % 4 === 0 ? 'by4' : 'not4';

  const known = (y: number) => YEARS.includes(y);
  const findLeap = (from: number, step: number): number | null => {
    for (let y = from; known(y); y += step) if (isLeap(y)) return y;
    return null;
  };

  return {
    year,
    leap,
    rule,
    days: leap ? 366 : 365,
    febDays: months[1],
    months,
    firstWeekday: weekdayOf(year, 1, 1),
    lastWeekday: weekdayOf(year, 12, 31),
    isoWeeks: isoWeeksOf(year),
    // 1984년이 갑자년이다 — 십간은 10년, 십이지는 12년 주기다
    stem: ((((year - 1984) % 10) + 10) % 10),
    branch: ((((year - 1984) % 12) + 12) % 12),
    prevLeap: findLeap(year - 1, -1),
    nextLeap: findLeap(year + 1, 1),
    prev: known(year - 1) ? year - 1 : null,
    next: known(year + 1) ? year + 1 : null,
  };
}

/** 윤년만 */
export const leapYears = (): number[] => YEARS.filter(isLeap);

/** 4로 나뉘는데 윤년이 아닌 해 — 이 구간에는 1900과 2100 둘뿐이다 */
export const skipped = (): number[] => YEARS.filter(y => y % 4 === 0 && !isLeap(y));

/** 53주짜리 해 */
export const longYears = (): number[] => YEARS.filter(y => isoWeeksOf(y) === 53);

/** 십 년씩 묶는다 */
export const decades = (): { from: number; years: number[] }[] => {
  const out: { from: number; years: number[] }[] = [];
  for (let from = Math.floor(YEARS[0] / 10) * 10; from <= YEARS[YEARS.length - 1]; from += 10) {
    const years = YEARS.filter(y => y >= from && y < from + 10);
    if (years.length) out.push({ from, years });
  }
  return out;
};

export const neighbours = (year: number, span = 3): number[] =>
  YEARS.filter(y => Math.abs(y - year) <= span && y !== year);
