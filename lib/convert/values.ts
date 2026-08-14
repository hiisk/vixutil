/**
 * 단위 변환 값 낱장이 쓰는 대표값.
 *
 * ── 왜 값마다 낱장을 두는가 ──────────────────────────────────
 * 사람은 "kg를 lb로"가 아니라 **"70kg 파운드"**라고 친다. 변환 도구 페이지는
 * 그 질문에 답하지만 제목이 그 말을 안 담고 있어서 검색에 안 걸린다.
 *
 * 적을 것은 이 파일의 대표값 스물넷뿐이다. 나머지는 lib/convert-tools*.ts의
 * **변환쌍 138개가 곱해 준다** — 138 × 24 × 열 언어 = 33,120장. 식이 고정이라
 * 유지비가 0이고, 표를 새로 적을 일이 없다.
 *
 * ── 쌍마다 스물넷을 지킨다 ───────────────────────────────────
 * 장수를 셈에 쓸 수 있어야 하므로(사이트맵·검사) **어느 쌍이든 정확히 24개**다.
 * 다만 같은 스물넷이 모든 쌍에서 말이 되지는 않는다 —
 *
 *   온도    1,000℃는 가마 온도다. 사람이 찾는 것은 20~200 사이에 몰려 있다
 *   페이스  분/km이 500이면 걷지도 않는 값이다
 *   BPM     500 BPM은 음악이 아니다
 *   연비    1,000 mpg는 없다
 *
 * 그래서 그 계열만 자기 눈금을 갖는다. 나머지 128쌍은 기본값을 쓴다.
 * **값을 고를 때의 기준은 "사람이 그 숫자를 치는가"다** — 1·10·100처럼 둥근 수와
 * 70kg·180cm처럼 몸에 붙은 수를 함께 넣었다.
 */
import type { ConvertTool } from '../convert-tools.ts';

/** 기본 눈금 — 128쌍이 이것을 쓴다 */
export const BASE_VALUES: readonly number[] = [
  1, 2, 3, 5, 10, 15, 20, 25, 30, 40, 50, 60,
  70, 75, 80, 90, 100, 120, 150, 180, 200, 250, 500, 1000,
];

/** 온도 — 사람이 찾는 자리는 체온·실온·오븐이다 */
const TEMPERATURE: readonly number[] = [
  1, 5, 10, 15, 18, 20, 22, 24, 25, 28, 30, 35,
  36, 37, 38, 40, 50, 60, 80, 100, 150, 180, 200, 250,
];

/** 달리기 페이스(분/km, 분/mile) — 3분대가 엘리트, 10분대가 걷기다 */
const PACE: readonly number[] = [
  3, 3.5, 4, 4.5, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75,
  7, 7.25, 7.5, 8, 8.5, 9, 9.5, 10, 11, 12, 14, 16,
];

/** 음악 BPM — 느린 발라드에서 빠른 댄스까지 */
const BPM: readonly number[] = [
  60, 66, 70, 76, 80, 84, 88, 90, 92, 96, 100, 104,
  108, 112, 116, 120, 126, 130, 132, 140, 150, 160, 174, 180,
];

/** 연비 — mpg·L/100km·km/L이 다 같은 자리에서 논다 */
const FUEL: readonly number[] = [
  3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 20, 22, 25, 30, 35, 40, 50, 60,
];

/** 쌍마다 다른 눈금 — 여기 없으면 BASE_VALUES다 */
const OVERRIDE: Record<string, readonly number[]> = {
  'celsius-fahrenheit': TEMPERATURE,
  'celsius-kelvin': TEMPERATURE,
  'fahrenheit-kelvin': TEMPERATURE,
  'celsius-rankine': TEMPERATURE,
  'pace-kmh': PACE,
  'pace-mile-kmh': PACE,
  'bpm-ms': BPM,
  'mpg-l100km': FUEL,
  'l100km-kmpl': FUEL,
};

/** 쌍마다 쓸 값 스물넷 */
export const valuesFor = (slug: string): readonly number[] => OVERRIDE[slug] ?? BASE_VALUES;

/** 어느 쌍이든 같은 개수여야 셈이 선다 — 검사가 이 수를 쓴다 */
export const VALUES_PER_PAIR = BASE_VALUES.length;

/**
 * 값 → 주소 조각.
 *
 * 소수점은 주소에서 점을 그대로 못 쓰는 것이 아니라(쓸 수는 있다) **점이 든 칸을
 * 정적 파일로 오해할 여지**가 있어 하이픈으로 바꾼다 — 5.5 → `5-5`.
 * 되돌리는 것이 parseValueSlug다. 둘이 서로의 역이라는 것을 검사가 본다.
 */
export const valueSlug = (v: number): string => String(v).replace('.', '-');

/** 주소 조각 → 값. 모르는 꼴이면 null이라 낱장이 404가 된다 */
export function parseValueSlug(s: string): number | null {
  if (!/^\d+(-\d+)?$/.test(s)) return null;
  const n = Number(s.replace('-', '.'));
  return Number.isFinite(n) ? n : null;
}

/**
 * 변환 — 도구의 식을 그대로 쓴다.
 *
 * 세 갈래가 있다(lib/convert-tools.ts의 ConvertTool 주석과 같다).
 *   보통     to = from × factor
 *   오프셋   to = from × factor + offset      (섭씨↔화씨)
 *   반비례   to = factor ÷ from                (페이스↔시속)
 */
export function convertValue(tool: ConvertTool, v: number): number {
  if (tool.reciprocal) return tool.factor / v;
  return v * tool.factor + (tool.offset ?? 0);
}

/** 거꾸로 — "그러면 1 lb는 몇 kg인가"에 답한다 */
export function invertValue(tool: ConvertTool, v: number): number {
  if (tool.reciprocal) return tool.factor / v;
  return (v - (tool.offset ?? 0)) / tool.factor;
}

/**
 * 이웃 값 — 그 값의 앞뒤로 눈금을 흘려 준다.
 *
 * 값 낱장이 서로를 가리키게 하는 자리다. 앞에서 N개를 자르면 뒤쪽 값이
 * 아무에게도 안 가리켜지므로(이 저장소가 여러 번 겪은 병) **자기 자리 다음부터
 * 원형으로 감는다** — lib/related-window.ts와 같은 규칙이다.
 */
export function neighborValues(slug: string, v: number, count = 8): number[] {
  const all = valuesFor(slug);
  const at = all.indexOf(v);
  const out: number[] = [];
  for (let k = 1; k <= all.length && out.length < count; k++) {
    const item = all[(((at < 0 ? 0 : at) + k) % all.length + all.length) % all.length];
    if (item !== v) out.push(item);
  }
  return out;
}
