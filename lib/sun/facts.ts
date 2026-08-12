/**
 * 위도 하나와 날짜 하나가 만드는 태양의 자리.
 *
 * 네 줄이면 끝난다. 그 해의 몇 번째 날 N에서 적위 δ가 나오고, δ와 위도 φ만으로
 * 정오 고도·낮 길이·일출 시각·그림자 길이가 따라 나온다.
 *
 *   적위        δ = 23.44° × sin(360° × (284 + N) ÷ 365)
 *   정오 고도   h = 90° − |φ − δ|
 *   반일호      cos H = −tan φ × tan δ          (H는 정오에서 일몰까지의 각)
 *   낮 길이     2H ÷ 15 시간                    (하늘은 한 시간에 15°를 돈다)
 *   일출·일몰   12:00 ∓ H ÷ 15                  (태양시)
 *   그림자      물체 높이 ÷ tan h
 *
 * ── cos H가 ±1을 벗어나는 것이 백야·극야다 ────────────────────
 * −tan φ tan δ의 절댓값이 1을 넘으면 acos에 넣을 수 없다. 계산이 깨진 것이 아니라
 * **해가 뜨지 않거나 지지 않는다는 답**이다. 1보다 크면 극야(하루 종일 밤),
 * −1보다 작으면 백야(하루 종일 낮)다. 이 표에서는 북위 70°의 겨울과 여름에 실제로
 * 나타난다 — 그때는 일출·일몰 시각을 null로 두고 화면도 시각을 적지 않는다.
 * 없는 시각을 12:00 같은 값으로 채우면 계산이 멀쩡해 보이면서 거짓을 말한다.
 *
 * ── 이것은 어림이다 ───────────────────────────────────────────
 * 위 적위 식(쿠퍼 근사식)은 오차가 1.5°쯤 있고, 대기 굴절·태양의 반지름·균시차를
 * 넣지 않았다. 그래서 일출 시각은 실제와 몇 분에서 십몇 분까지 어긋난다. 무엇을
 * 빼 놓았는지는 ui.ts의 approxNote가 열 언어로 밝힌다. 요약하면 이렇다.
 *
 *   · 대기 굴절과 태양의 반지름 — 규약은 태양 중심이 −0.833°일 때를 일출로 본다.
 *     기하학적인 0°로 재는 이 표는 중위도에서 낮을 8~10분쯤 짧게 말한다.
 *   · 균시차(±16분)와 경도·표준시·서머타임 — 이 표의 시각은 진태양시다.
 *     시계 시각으로 옮기려면 그 셋을 더 더해야 한다.
 *   · 관측자 고도와 지형 — 산과 건물이 지평선을 가리면 그만큼 늦게 뜬다.
 *   · 윤년 — N은 365일 해로 센다. 윤년 뒤쪽 날짜는 하루가 밀린다.
 */
import { DATES, LATITUDES, type Cell, type SunDate, dateOf, slugOf } from './list.ts';
import { relatedBySlug } from '../related-window.ts';

const round = (x: number, digits = 2): number => {
  const k = 10 ** digits;
  return Math.round(x * k) / k;
};

/**
 * 유효숫자 자리로 자른다 — 그림자에만 쓴다.
 *
 * 한 표에 0.06m와 66.6m가 같이 있다. 소수 두 자리로 자르면 짧은 쪽이 0.06으로
 * 뭉개져 tan을 곱해도 1m로 돌아오지 않는다(왕복 검사가 그것을 잡는다).
 */
const sig = (x: number, digits: number): number => Number(x.toPrecision(digits));

const rad = (deg: number): number => (deg * Math.PI) / 180;
const deg = (r: number): number => (r * 180) / Math.PI;

/** 지구 자전축의 기울기(°) — 적위가 오르내리는 폭이 이 값이다 */
export const AXIAL_TILT = 23.44;

/** 하늘이 한 시간에 도는 각(°) — 360 ÷ 24 */
export const DEGREES_PER_HOUR = 15;

/** 그림자 길이를 재는 기준 물체의 높이(m) — 사람 키에 가깝게 잡았다 */
export const POLE_HEIGHT = 1;

/**
 * 1월 1일부터 그 달 1일까지 지난 날 수 — 365일 해다.
 *
 * 윤년을 안 보는 것은 하루 밀림이 적위 0.4° 안이고(그 폭은 근사식 자체의 오차보다
 * 작다), 해마다 값이 달라지면 주소가 가리키는 답이 흔들리기 때문이다.
 */
const MONTH_START = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];

/** 그 해의 몇 번째 날 — 1월 1일이 1이다 */
export const dayOfYear = (month: number, day: number): number => MONTH_START[month - 1] + day;

/** 적위(°) — 쿠퍼 근사식 */
export const declinationOf = (n: number): number =>
  AXIAL_TILT * Math.sin(rad((360 * (284 + n)) / 365));

/** 정오의 태양 고도(°). 음수면 정오에도 해가 지평선 아래다 */
export const noonAltitudeOf = (lat: number, dec: number): number => 90 - Math.abs(lat - dec);

/** cos H — 1을 넘으면 극야, −1보다 작으면 백야다 */
export const hourAngleCos = (lat: number, dec: number): number =>
  -Math.tan(rad(lat)) * Math.tan(rad(dec));

/** 반일호 H(°) — 벗어난 자리는 0(극야) 또는 180(백야)으로 잘라 준다 */
export const halfDayAngle = (lat: number, dec: number): number => {
  const c = hourAngleCos(lat, dec);
  if (c >= 1) return 0;
  if (c <= -1) return 180;
  return deg(Math.acos(c));
};

/** 낮 길이(시간) = 2H ÷ 15 */
export const dayHoursOf = (lat: number, dec: number): number =>
  (2 * halfDayAngle(lat, dec)) / DEGREES_PER_HOUR;

export type Polar = 'midnightSun' | 'polarNight';

/** 백야·극야인가 — cos H가 ±1을 벗어난 자리다 */
export const polarOf = (lat: number, dec: number): Polar | null => {
  const c = hourAngleCos(lat, dec);
  if (c <= -1) return 'midnightSun';
  if (c >= 1) return 'polarNight';
  return null;
};

/** 물체 높이를 정오 그림자 길이로 — 고도가 0 이하면 그림자가 없다(해가 안 뜬다) */
export const shadowOf = (height: number, altitude: number): number | null =>
  altitude <= 0 ? null : height / Math.tan(rad(altitude));

/** 시각(시 단위 소수)을 24시간 표기로 — 언어를 가리지 않는 05:12 꼴이다 */
export const clockOf = (hours: number): string => {
  const total = Math.round(hours * 60);
  const h = Math.floor(total / 60) % 24;
  const m = total % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
};

/** 정오에 해가 천정의 어느 쪽인가 — 위도가 적위보다 크면 남쪽이다 */
export type NoonSide = 'north' | 'south' | 'zenith';

/** 천정에 붙었다고 볼 폭(°) — 이보다 가까우면 "머리 위"라고 말한다 */
export const ZENITH_WINDOW = 0.5;

export const noonSideOf = (lat: number, dec: number): NoonSide => {
  if (Math.abs(lat - dec) < ZENITH_WINDOW) return 'zenith';
  return lat > dec ? 'south' : 'north';
};

export interface Neighbour {
  slug: string;
  lat: number;
  date: string;
}

export interface SunFacts {
  cell: Cell;
  slug: string;
  /** 날짜 축의 그 날 */
  day: SunDate;
  /** 그 해의 몇 번째 날 */
  n: number;
  /** 적위(°) */
  declination: number;
  /** 정오의 태양 고도(°) — 음수면 하루 종일 지평선 아래다 */
  noonAltitude: number;
  /** 반일호 H(°) */
  hourAngle: number;
  /** 낮 길이(시간) — 백야는 24, 극야는 0 */
  dayHours: number;
  /** 낮 길이를 시·분으로 가른 것 */
  dayHourPart: number;
  dayMinutePart: number;
  /** 태양시 일출·일몰 — 백야·극야에는 없다(지어낸 시각을 내지 않는다) */
  sunrise: string | null;
  sunset: string | null;
  /** 백야·극야면 그 이름 */
  polar: Polar | null;
  /** 키 1m 막대의 정오 그림자 길이(m) — 해가 안 뜨면 없다 */
  shadow: number | null;
  /** 정오에 해가 천정의 어느 쪽인가 */
  noonSide: NoonSide;
  /** 이웃 칸 — 같은 위도에서 셋, 같은 날짜에서 셋 */
  neighbours: Neighbour[];
}

/** 같은 위도의 한 줄 — 날짜만 다르다 */
export const atLat = (lat: number): Cell[] => DATES.map(d => ({ lat, date: d.key }));

/** 같은 날짜의 한 줄 — 위도만 다르다 */
export const atDate = (date: string): Cell[] => LATITUDES.map(lat => ({ lat, date }));

/** 한 칸에서 뻗는 이웃 수 — 같은 위도 줄에서 셋, 같은 날짜 줄에서 셋 */
const NEAR_EACH = 3;

const withSlug = (cells: Cell[]): Neighbour[] =>
  cells.map(c => ({ slug: slugOf(c), lat: c.lat, date: c.date }));

export function sunFacts(c: Cell): SunFacts {
  const day = dateOf(c.date);
  if (!day) throw new Error(`모르는 날짜: ${c.date}`);
  if (!LATITUDES.includes(c.lat)) throw new Error(`모르는 위도: ${c.lat}`);

  const n = dayOfYear(day.month, day.day);
  const dec = declinationOf(n);
  const altitude = noonAltitudeOf(c.lat, dec);
  const h = halfDayAngle(c.lat, dec);
  const hours = dayHoursOf(c.lat, dec);
  const polar = polarOf(c.lat, dec);
  const slug = slugOf(c);

  /*
   * 시·분으로 가를 때 분이 60으로 올라가면 시를 하나 올린다 — 11.999시간을
   * "11시간 60분"으로 적으면 사람이 읽다 멈춘다.
   */
  const minutes = Math.round(hours * 60);

  /*
   * 이웃은 자기 자리 다음부터 원형으로 감아 고른다(lib/related-window.ts).
   * 앞에서 셋을 잘라 오면 줄의 앞쪽만 서로 가리키고 뒤쪽 칸은 들어오는 링크가
   * 0이 된다. 줄을 둘로 나눠 도는 것은 축마다 고르게 이어 두려는 것이다 —
   * 같은 위도의 다른 날, 같은 날의 다른 위도가 각각 셋씩 들어온다.
   */
  return {
    cell: c,
    slug,
    day,
    n,
    declination: round(dec),
    noonAltitude: round(altitude),
    hourAngle: round(h),
    dayHours: round(hours),
    dayHourPart: Math.floor(minutes / 60),
    dayMinutePart: minutes % 60,
    sunrise: polar ? null : clockOf(12 - h / DEGREES_PER_HOUR),
    sunset: polar ? null : clockOf(12 + h / DEGREES_PER_HOUR),
    polar,
    shadow: shadowOf(POLE_HEIGHT, altitude) === null ? null : sig(shadowOf(POLE_HEIGHT, altitude)!, 3),
    noonSide: noonSideOf(c.lat, dec),
    neighbours: [
      ...relatedBySlug(withSlug(atLat(c.lat)), slug, NEAR_EACH),
      ...relatedBySlug(withSlug(atDate(c.date)), slug, NEAR_EACH),
    ],
  };
}
