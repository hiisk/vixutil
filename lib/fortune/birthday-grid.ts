/**
 * 생일 낱장 — `/fortune/birthday/03-15` 366일 × 열 언어 = 3,660장.
 *
 * ── 왜 366일인가 ────────────────────────────────────────────
 * 2월 29일이 있다. 윤일에 태어난 사람은 실제로 있고, 그 날짜만 "평년에는 없는
 * 날"이라 할 말이 다르다. 365로 두면 그 하루가 통째로 404가 된다.
 *
 * ── 여섯 장이 아니라 한 장인 까닭 ───────────────────────────
 * 작업지시서는 366일 × 6종으로 21,960장을 잡았다. 그런데 한 날짜에서 나오는 사실은
 * 별자리·탄생석·탄생화·통산일·나이표뿐이고, 그것을 여섯 장으로 쪼개면 **한 장이
 * 두세 줄**이 된다. 같은 지시서가 그것을 금하고 있다(P0-6·색인률 게이트: 얇은
 * 페이지는 색인이 안 되고 사이트 전체 평가를 깎는다).
 *
 * 게다가 `/fortune/zodiac`·`/fortune/birth-stone`이 **이미 도구로 있다** — 별자리와
 * 탄생석을 따로 내면 그 둘과 겹친다. 그래서 날짜 한 장에 다 담고, 설명이 필요한
 * 쪽은 기존 도구로 링크한다.
 *
 * ── 날짜에 기대는 값을 쓰지 않는다 ──────────────────────────
 * `new Date()`를 쓰면 같은 페이지가 열 때마다 달라져 ISR 캐시가 매번 다시 쓰인다
 * (이 저장소는 그 함정으로 하이드레이션이 깨진 적이 있다). 나이표는 **기준연도를
 * 못 박고** 그 사실을 화면에 적는다 — 해가 바뀌면 AGE_REF_YEAR 한 줄을 고친다.
 */
import { ZODIAC_SIGNS, ANIMALS } from '../fortune-data.ts';
import { getBirthInfo, type BirthInfo } from '../birth-stone.ts';

/** 나이표의 기준연도 — 해가 바뀌면 이 한 줄을 고치고 다시 배포한다 */
export const AGE_REF_YEAR = 2026;

/** 나이표에 싣는 출생연도 — 기준연도에서 거꾸로 100년 */
export const AGE_SPAN = 100;

const DAYS_IN_MONTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

/** 366일 전부 — [월, 일] */
export function allDays(): { month: number; day: number }[] {
  const out: { month: number; day: number }[] = [];
  for (let m = 1; m <= 12; m++) for (let d = 1; d <= DAYS_IN_MONTH[m - 1]; d++) out.push({ month: m, day: d });
  return out;
}

export const DAY_COUNT = 366;

/** 주소 조각 — `03-15` */
export const daySlug = (month: number, day: number): string =>
  `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

/** 주소 조각 → 날짜. 없는 날(2/30, 4/31)이면 null이라 404가 된다 */
export function parseDaySlug(s: string): { month: number; day: number } | null {
  const m = /^(\d{2})-(\d{2})$/.exec(s);
  if (!m) return null;
  const month = Number(m[1]), day = Number(m[2]);
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > DAYS_IN_MONTH[month - 1]) return null;
  return { month, day };
}

/**
 * 별자리 — 표의 기간에서 계산한다.
 *
 * 날짜마다 손으로 적으면 366줄이 되고 경계 하나만 틀려도 안 보인다.
 * ZODIAC_SIGNS의 `period`("3.21~4.19")를 읽어 구간으로 판정한다 — 표가 원본이고
 * 여기는 그것을 쓰는 쪽이다. 염소자리만 해를 넘긴다(12.22~1.19).
 */
export function zodiacOf(month: number, day: number): (typeof ZODIAC_SIGNS)[number] {
  const key = month * 100 + day;
  for (const s of ZODIAC_SIGNS) {
    const [from, to] = s.period.split('~').map(p => {
      const [mm, dd] = p.split('.').map(Number);
      return mm * 100 + dd;
    });
    if (from <= to ? key >= from && key <= to : key >= from || key <= to) return s;
  }
  /* 표가 366일을 다 덮으므로 여기 오지 않는다 — 검사가 그것을 본다 */
  throw new Error(`별자리를 못 찾았다: ${month}/${day}`);
}

/** 그 해의 몇 번째 날인가 — 평년과 윤년이 다르다 */
export function dayOfYear(month: number, day: number, leap: boolean): number | null {
  if (month === 2 && day === 29 && !leap) return null;   // 평년에는 없는 날
  let n = day;
  for (let m = 1; m < month; m++) n += m === 2 && !leap ? 28 : DAYS_IN_MONTH[m - 1];
  return n;
}

export interface BirthdayFacts {
  month: number;
  day: number;
  zodiac: (typeof ZODIAC_SIGNS)[number];
  birth: BirthInfo;
  /** 평년 기준 통산일 — 윤일은 null */
  dayOfYearCommon: number | null;
  /** 윤년 기준 통산일 */
  dayOfYearLeap: number;
  /** 윤일인가 */
  isLeapDay: boolean;
  /** 그 해의 남은 날 수(윤년 기준) */
  daysLeft: number;
  /** 출생연도 → 만 나이(생일이 지난 뒤) · 띠 */
  ages: { year: number; age: number; animal: (typeof ANIMALS)[number] }[];
}

/**
 * 띠 — 열두 해가 돌아간다. 자료의 years 목록을 기준점으로 삼는다.
 *
 * ── 해가 바뀌는 곳은 1월 1일이 아니다 ───────────────────────
 * 띠의 해는 입춘(立春)에 바뀐다. 사주 쪽도 같은 기준이다. 양력 1월 1일로 세면
 * 1월생과 2월 초생이 통째로 한 해 밀린다 — 1984년 1월 15일생은 쥐띠가 아니라
 * 돼지띠다. 생일 낱장의 나이표는 그렇게 100줄이 다 틀려 있었다(1월 낱장 31장 ×
 * 열 언어).
 *
 * 입춘은 2월 3일에서 5일 사이에만 든다. 그래서 (월, 일)만 알아도 그 사흘 말고는
 * 답이 해와 무관하게 정해진다.
 *
 * ponytail: 2월 3·4·5일은 해마다 갈리는데 여기서는 4일을 경계로 둔다. 1900~2100년
 * 사이 입춘은 대부분 4일이라 대개 맞지만 2021·2025처럼 3일인 해에는 하루 어긋난다.
 * 낱장마다 정확히 하려면 lib/saju-data.ts의 jeolgiUtc(year, 2)를 쓰면 되지만,
 * 이 컴포넌트는 클라이언트라 그 천문 계산을 통째로 번들에 싣게 된다.
 */
export function animalOf(year: number, month: number, day: number): (typeof ANIMALS)[number] {
  const base = ANIMALS[0].years[0];   // 쥐띠 해
  const beforeLichun = month === 1 || (month === 2 && day < 4);
  const y = beforeLichun ? year - 1 : year;
  const i = (((y - base) % 12) + 12) % 12;
  return ANIMALS[i];
}

export function birthdayFacts(month: number, day: number): BirthdayFacts {
  const isLeapDay = month === 2 && day === 29;
  const leapN = dayOfYear(month, day, true)!;
  const ages = Array.from({ length: AGE_SPAN }, (_, i) => AGE_REF_YEAR - i)
    .filter(y => !isLeapDay || (y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0)))
    .map(year => ({ year, age: AGE_REF_YEAR - year, animal: animalOf(year, month, day) }));

  return {
    month, day,
    zodiac: zodiacOf(month, day),
    birth: getBirthInfo(month)!,
    dayOfYearCommon: dayOfYear(month, day, false),
    dayOfYearLeap: leapN,
    isLeapDay,
    daysLeft: 366 - leapN,
    ages,
  };
}

/**
 * 이웃 날짜 — 앞뒤 이틀과 한 달 전후.
 *
 * 앞뒤는 서로를 가리키므로 고리가 끊기지 않고(366일이 한 줄로 이어진다),
 * 한 달 전후가 그 줄을 가로질러 묶는다. 앞에서 N개만 뽑는 방식이면 뒤쪽 날짜가
 * 통째로 고아가 된다 — 이 저장소가 여러 번 겪은 병이다.
 */
export function neighborDays(month: number, day: number): { month: number; day: number }[] {
  const days = allDays();
  const at = days.findIndex(d => d.month === month && d.day === day);
  const pick = (k: number) => days[((at + k) % days.length + days.length) % days.length];
  return [pick(-2), pick(-1), pick(1), pick(2), pick(-30), pick(30)];
}

/** 같은 별자리의 다른 날 — 별자리 안에서 원형으로 감는다 */
export function sameZodiacDays(month: number, day: number, limit = 6): { month: number; day: number }[] {
  const id = zodiacOf(month, day).id;
  const days = allDays().filter(d => zodiacOf(d.month, d.day).id === id);
  const at = days.findIndex(d => d.month === month && d.day === day);
  const out: { month: number; day: number }[] = [];
  for (let k = 1; k <= days.length && out.length < limit; k++) {
    const d = days[(at + k) % days.length];
    if (d.month !== month || d.day !== day) out.push(d);
  }
  return out;
}
