/**
 * 공휴일 엔진 — 날짜를 «표»가 아니라 «규칙»으로 낸다.
 *
 * ── 왜 규칙인가 ────────────────────────────────────────────
 * 「Feiertage 2027」·「feriados 2027」·「祝日 2027」은 나라마다 해마다 다시
 * 찾는 말이다. 표로 박아 두면 해가 바뀔 때마다 사람이 고쳐야 하고, 안 고치면
 * 조용히 틀린 채로 남는다. 규칙으로 내면 2030년이든 2040년이든 맞는다.
 *
 * ── 어디까지 다루나 ────────────────────────────────────────
 * 태양력으로 정해지는 나라만 한다 — 미국·영국·독일·프랑스·스페인·브라질·일본.
 * 부활절 계열은 계산으로 풀리고(computus), 일본의 춘분·추분은 태양 황경으로
 * 푼다. **음력을 쓰는 나라는 뺐다** — 설·추석·춘절·디왈리는 만세력 표가
 * 있어야 하고, 없는 표를 지어내면 조용히 틀린 날짜를 내보내게 된다.
 *
 * ── 대체공휴일 ─────────────────────────────────────────────
 * 「주말과 겹치면 어떻게 되는가」가 나라마다 다르다. 미국은 토요일이면 금요일,
 * 일요일이면 월요일로 «관측»하고, 영국은 다음 평일로 «대체»하며, 독일은 그냥
 * 사라진다. 규칙을 나라마다 따로 받는다.
 */

export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** 주말과 겹칠 때의 처리 */
export type Observance =
  | 'none'        // 그냥 사라진다 (독일·프랑스 등)
  | 'nearest'     // 토→금, 일→월 (미국)
  | 'next'        // 다음 평일로 민다 (영국)
  | 'sundayNext'; // 일요일일 때만 다음 평일 (일부 주)

export type HolidayRule =
  /** 매년 같은 날짜 */
  | { kind: 'fixed'; month: number; day: number }
  /** 그 달의 n번째 요일. n이 음수면 뒤에서부터(-1 = 마지막) */
  | { kind: 'nth'; month: number; weekday: Weekday; n: number }
  /** 부활절에서 며칠 떨어진 날. 0이면 부활절 당일 */
  | { kind: 'easter'; offset: number }
  /** 춘분·추분 — 태양 황경 0°/180° */
  | { kind: 'equinox'; which: 'spring' | 'autumn' };

export interface HolidayDef {
  /** 주소와 열쇠에 쓰는 로마자 */
  slug: string;
  rule: HolidayRule;
  /** 주말과 겹칠 때 — 나라 기본값을 덮어쓴다 */
  observance?: Observance;
  /** 그 해부터 생긴 날 (없으면 늘 있었다) */
  from?: number;
  /** 그 해까지만 있던 날 */
  until?: number;
}

export interface Holiday {
  slug: string;
  /** 규칙이 정한 원래 날짜 — YYYY-MM-DD */
  date: string;
  /** 실제로 쉬는 날. 대체가 없으면 date와 같다 */
  observed: string;
  weekday: Weekday;
  /** 대체가 일어났는가 */
  moved: boolean;
}

const pad = (n: number) => String(n).padStart(2, '0');
const iso = (y: number, m: number, d: number) => `${y}-${pad(m)}-${pad(d)}`;

/** UTC로 다룬다 — 표준시가 다른 기계에서 하루가 밀리지 않게 */
const utc = (y: number, m: number, d: number) => new Date(Date.UTC(y, m - 1, d));
const dayOf = (d: Date) => d.getUTCDay() as Weekday;
const isoOf = (d: Date) => iso(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * 86400000);

/**
 * 부활절 — 그레고리력 computus(Meeus/Jones/Butcher).
 *
 * 「춘분 다음 보름 다음 첫 일요일」을 산술로 푼 것이다. 서방 교회 기준이라
 * 정교회 부활절과는 다르다(그쪽은 율리우스력으로 센다) — 여기서 다루는
 * 일곱 나라는 전부 서방 기준이다.
 */
export function easter(year: number): Date {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return utc(year, month, day);
}

/** 그 달의 n번째 요일 — n이 음수면 뒤에서부터 */
export function nthWeekday(year: number, month: number, weekday: Weekday, n: number): Date {
  if (n > 0) {
    const first = utc(year, month, 1);
    const shift = (weekday - dayOf(first) + 7) % 7;
    return addDays(first, shift + (n - 1) * 7);
  }
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const last = utc(year, month, lastDay);
  const shift = (dayOf(last) - weekday + 7) % 7;
  return addDays(last, -(shift + (-n - 1) * 7));
}

/**
 * 춘분·추분 — 태양 황경이 0°(춘분)·180°(추분)를 지나는 순간.
 *
 * 일본의 춘분의 날·추분의 날은 이 순간이 드는 «일본 표준시의 날짜»다. 그래서
 * UTC로 계산한 뒤 +9시간을 얹어 날짜를 읽는다. 이 두 날은 관보로 전해에
 * 확정되므로 계산과 관보가 어긋나는 해가 드물게 있다 — 그런 해는 나라 표에서
 * 손으로 덮어쓴다(overrides).
 *
 * 태양 위치는 Meeus 25장의 낮은 정밀도 식이다. 이 저장소가 절기를 그렇게
 * 이미 풀고 있어 같은 근거를 쓴다.
 */
export function equinox(year: number, which: 'spring' | 'autumn', tzOffsetHours = 9): Date {
  const target = which === 'spring' ? 0 : 180;
  /* 대략 3월 20일 / 9월 22일 언저리에서 이분 탐색한다 */
  let lo = Date.UTC(year, which === 'spring' ? 2 : 8, 16);
  let hi = Date.UTC(year, which === 'spring' ? 2 : 8, 26);
  const lon = (t: number) => {
    const jd = t / 86400000 + 2440587.5;
    const T = (jd - 2451545) / 36525;
    const L0 = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
    const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
    const r = (deg: number) => (deg * Math.PI) / 180;
    const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(r(M))
            + (0.019993 - 0.000101 * T) * Math.sin(r(2 * M))
            + 0.000289 * Math.sin(r(3 * M));
    /* 목표 부근에서만 쓰므로 0/180 기준으로 부호가 뒤집히게 정규화한다 */
    let v = (L0 + C - target) % 360;
    if (v > 180) v -= 360;
    if (v < -180) v += 360;
    return v;
  };
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (lon(lo) * lon(mid) <= 0) hi = mid; else lo = mid;
  }
  const at = new Date((lo + hi) / 2 + tzOffsetHours * 3600000);
  return utc(at.getUTCFullYear(), at.getUTCMonth() + 1, at.getUTCDate());
}

function baseDate(year: number, rule: HolidayRule, tzOffsetHours: number): Date {
  switch (rule.kind) {
    case 'fixed': return utc(year, rule.month, rule.day);
    case 'nth': return nthWeekday(year, rule.month, rule.weekday, rule.n);
    case 'easter': return addDays(easter(year), rule.offset);
    case 'equinox': return equinox(year, rule.which, tzOffsetHours);
  }
}

/** 주말과 겹칠 때 실제로 쉬는 날 */
function observe(d: Date, mode: Observance, taken: Set<string>): Date {
  const wd = dayOf(d);
  if (mode === 'none') return d;
  if (mode === 'nearest') {
    if (wd === 6) return addDays(d, -1);
    if (wd === 0) return addDays(d, 1);
    return d;
  }
  if (mode === 'sundayNext') {
    /* 일본 振替休日 — 일요일일 때만, «공휴일이 아닌» 다음 날로 민다.
       그냥 하루 더하면 안 된다. 2026년 헌법기념일(5/3 일)의 다음 날은
       이미 みどりの日라, 실제로는 5/6까지 밀린다. */
    if (wd !== 0) return d;
    let out = addDays(d, 1);
    while (taken.has(isoOf(out))) out = addDays(out, 1);
    return out;
  }
  /* 'next' — 다음 평일로 민다. 이미 다른 공휴일이 찬 날이면 그다음으로 */
  let out = d;
  while (dayOf(out) === 0 || dayOf(out) === 6 || taken.has(isoOf(out))) out = addDays(out, 1);
  return out;
}

export interface CountryDef {
  /** 주소에 쓰는 두 글자 — us·gb·de… */
  code: string;
  /** 기본 대체 규칙 */
  observance: Observance;
  /** 춘분·추분을 쓰는 나라의 표준시 시차 */
  tzOffsetHours?: number;
  holidays: HolidayDef[];
  /**
   * 계산과 관보가 어긋나는 해를 손으로 덮어쓴다.
   * `{ '2026:shunbun': '2026-03-20' }` 꼴.
   */
  overrides?: Record<string, string>;
}

/**
 * 한 나라 한 해의 공휴일 — 날짜순.
 *
 * **두 번 훑는다.** 대체일을 정하려면 «그 날이 이미 공휴일인가»를 알아야 하는데,
 * 한 번에 훑으면 아직 처리 안 한 뒤쪽 공휴일이 안 보인다. 일본 2026년
 * 헌법기념일(5/3 일요일)이 그랬다 — 다음 날 5/4가 이미 みどりの日인데 엔진이
 * 그것을 모르고 5/4로 밀어 두 축일이 같은 날에 겹쳤다. 실제로는 5/6이다.
 */
export function holidaysOf(country: CountryDef, year: number): Holiday[] {
  const inYear = country.holidays.filter(h =>
    (h.from === undefined || year >= h.from) && (h.until === undefined || year <= h.until));

  /* 1차 — 규칙이 정한 날짜만 먼저 다 구한다 */
  const bases = inYear.map(h => {
    const forced = country.overrides?.[`${year}:${h.slug}`];
    return forced
      ? utc(Number(forced.slice(0, 4)), Number(forced.slice(5, 7)), Number(forced.slice(8, 10)))
      : baseDate(year, h.rule, country.tzOffsetHours ?? 0);
  });

  /* 2차 — 다른 공휴일이 찬 날을 피해 대체를 푼다 */
  const baseIso = bases.map(isoOf);
  const taken = new Set<string>();   // 여기까지 확정된 «쉬는 날»
  const out: Holiday[] = [];
  inYear.forEach((h, i) => {
    const base = bases[i];
    /*
      막힌 날 = 이미 확정된 쉬는 날 + «다른» 공휴일의 원래 날짜.
      자기 날짜는 반드시 빼야 한다 — 안 빼면 평일에 멀쩡히 있는 휴일이
      자기 자신을 피해 달아난다(2026년 크리스마스가 금요일인데 12/28로 샜다).
    */
    const blocked = new Set(taken);
    baseIso.forEach((d, j) => { if (j !== i) blocked.add(d); });
    const obs = observe(base, h.observance ?? country.observance, blocked);
    taken.add(isoOf(obs));
    out.push({
      slug: h.slug,
      date: isoOf(base),
      observed: isoOf(obs),
      weekday: dayOf(base),
      moved: isoOf(base) !== isoOf(obs),
    });
  });
  return out.sort((a, b) => a.observed.localeCompare(b.observed));
}

/** 그 해 공휴일의 «쉬는 날» 목록 — workdaysBetween에 그대로 넘길 수 있다 */
export const observedDates = (country: CountryDef, year: number): string[] =>
  holidaysOf(country, year).map(h => h.observed);
