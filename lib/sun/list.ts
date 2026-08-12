/**
 * 태양 224칸 — 위도 14가지 × 날짜 16가지.
 *
 * 태양의 위치는 표를 옮겨 적을 것이 아니라 계산되는 값이다. 그 해의 몇 번째
 * 날(N)에서 적위가 나오고, 적위와 위도만 있으면 정오의 고도·낮 길이·일출 시각·
 * 그림자 길이가 모두 따라 나온다(facts.ts). 그래서 이 파일이 적는 것은 **축
 * 둘뿐이다** — 위도 목록과 날짜 목록.
 *
 * ── 위도를 −60°에서 70°까지 10° 눈금으로 (14가지) ──────────
 * 사람이 사는 위도가 거의 다 이 안이다. 북위 70°는 트롬쇠·무르만스크가 있는 줄로
 * **백야와 극야가 실제로 생기는 자리**이고, 남위 60°는 남극권 바로 앞이다. 남위
 * 70° 아래를 넣지 않은 것은 그 위도에 사는 사람이 기지 말고는 없기 때문이다 —
 * 축은 사람 쪽으로 기울여 두고, 위도 대칭(춘분에 φ와 −φ의 낮 길이가 같다)은 축이
 * 아니라 함수로 검사한다.
 *
 * 10° 눈금인 까닭은 정오 고도가 위도 1°에 1°씩 움직이기 때문이다. 10°면 그림자
 * 길이가 눈에 보이게 달라진다 — 하지의 정오 그림자는 북위 30°에서 키의 0.19배,
 * 40°에서 0.30배다.
 *
 * ── 날짜는 절기 넷 + 매달 15일 (16가지) ────────────────────
 * 절기 넷(춘분·하지·추분·동지)은 적위가 극단에 닿거나 0을 지나는 날이라 계산을
 * 되짚기에 가장 좋은 자리다. 매달 15일은 그 사이를 고르게 채운다 — 1일이 아니라
 * 15일인 것은 달의 가운데라서 그 달을 대표하기 때문이다.
 *
 * ── 오늘을 읽지 않는다 ─────────────────────────────────────
 * `Date.now()`나 `new Date()`로 오늘 날짜를 읽으면 페이지 내용이 날마다 바뀐다.
 * 그러면 검사가 붙들 값이 없고, 한 번 그려 캐시된 낱장은 다음 날 거짓이 된다.
 * 날짜를 셀의 **축**으로 두면 주소마다 답이 하나로 못 박힌다 — /sun/lat37-jun21은
 * 언제 열어도 같은 값을 말한다.
 */

/** 위도 축 — 값은 도(°), 남반구는 음수다 */
export const LAT_MIN = -60;
export const LAT_MAX = 70;
export const LAT_STEP = 10;

export const LATITUDES: number[] = Array.from(
  { length: (LAT_MAX - LAT_MIN) / LAT_STEP + 1 },
  (_, i) => LAT_MIN + i * LAT_STEP,
);

/** 절기 열쇠 — 화면 문구가 이 이름으로 절기를 부른다 */
export type TurnKey = 'marEquinox' | 'junSolstice' | 'sepEquinox' | 'decSolstice';

export interface SunDate {
  /** 달(1~12) */
  month: number;
  /** 날 */
  day: number;
  /** 주소에 쓰는 이름 — 'jun21'. 언어를 가리지 않는다 */
  key: string;
  /** 절기면 그 이름 */
  turn?: TurnKey;
}

/**
 * 절기 네 날.
 *
 * 절기는 궤도가 타원이라 해마다 하루쯤 흔들린다(춘분은 3월 19~21일 사이다).
 * 이 표는 흔히 쓰는 날짜로 못 박아 두고, 흔들린다는 것은 화면이 밝힌다.
 */
export const TURNS: { month: number; day: number; turn: TurnKey }[] = [
  { month: 3, day: 20, turn: 'marEquinox' },
  { month: 6, day: 21, turn: 'junSolstice' },
  { month: 9, day: 23, turn: 'sepEquinox' },
  { month: 12, day: 21, turn: 'decSolstice' },
];

/** 매달 골라 두는 날 — 달의 가운데다 */
export const MID_DAY = 15;

/** 주소에 쓰는 달 이름 셋 글자 — 어느 언어에서도 같은 주소가 되게 영어로 둔다 */
export const MONTH_KEYS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

const dateKey = (month: number, day: number): string => `${MONTH_KEYS[month - 1]}${day}`;

/**
 * 날짜 축 — 매달 15일 열두 개와 절기 넷을 달·날 차례로 늘어놓는다.
 *
 * 차례가 곧 화면의 차례이고 이웃을 감는 원형의 차례다. 절기가 그 달 15일 뒤에
 * 오도록 정렬하므로 3월은 15일 → 20일(춘분) 순서가 된다.
 */
export const DATES: SunDate[] = [
  ...Array.from({ length: 12 }, (_, i) => ({ month: i + 1, day: MID_DAY, key: dateKey(i + 1, MID_DAY) })),
  ...TURNS.map(t => ({ month: t.month, day: t.day, key: dateKey(t.month, t.day), turn: t.turn })),
].sort((a, b) => a.month - b.month || a.day - b.day);

export interface Cell {
  /** 위도(°) */
  lat: number;
  /** 날짜 열쇠 — 'jun21' */
  date: string;
}

export const CELLS: Cell[] = LATITUDES.flatMap(lat => DATES.map(d => ({ lat, date: d.key })));

/** 북위 37° 6월 21일 → lat37-jun21. 남반구는 lat-30-jun21이다 */
export const slugOf = (c: Cell): string => `lat${c.lat}-${c.date}`;

export const SUN_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(c => [slugOf(c), c]));

export const cellOf = (slug: string): Cell | undefined => BY_SLUG.get(slug);

export const dateOf = (key: string): SunDate | undefined => DATES.find(d => d.key === key);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const SUN_ICON = '🌅';
