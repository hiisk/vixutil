/**
 * hex 색 낱장 — `/color/hex-1a2` 4,096색 × 열 언어 = 40,960장.
 *
 * ── 왜 세 자리인가 ──────────────────────────────────────────
 * 여섯 자리 hex는 1,677만 가지다. 그것을 다 낼 수는 없고, 임의로 몇 천 개를
 * 고르면 "왜 이 색만 있나"에 답할 수 없다. **세 자리 줄임 표기**는 CSS가 실제로
 * 정의한 문법이고(`#1a2` = `#11aa22`), 16³ = 4,096으로 **빠짐없이 다 낼 수 있다**.
 * 목록에 규칙이 있으니 구멍도 없고, 사람이 실제로 치는 표기이기도 하다.
 *
 * ── 왜 /color 밑에 붙이나 ───────────────────────────────────
 * `/color/[slug]`는 이미 있다(이름 있는 색 152개). 주소 앞에 `hex-`를 붙이면
 * 그 라우트가 그대로 받는다 — 등록부도, 허브도, 라우팅 표 칸도 안 늘어난다.
 * Vercel 라우팅 표 2,048칸이 이 저장소의 진짜 벽이라 이 셈이 중요하다.
 *
 * ── 적을 것이 하나도 없다 ───────────────────────────────────
 * RGB·HSL·CMYK·밝기·대비·보색·명도단계·색약은 전부 hex 하나에서 계산된다
 * (lib/color/facts.ts). 계열 이름은 색상각에서 정하고 그 말은 COLOR_UI에 이미
 * 열 언어로 있다. 그래서 4,096색에 손으로 적는 값이 0이고 유지비도 0이다.
 */
import { hexToHsl, hexToRgb } from '../color.ts';
import { NAMED_COLORS_8, type ColorFamily, type NamedColor } from './named8.ts';

/** 주소 앞머리 — 이름 있는 색과 섞이지 않게 한다 */
export const HEX_PREFIX = 'hex-';

const DIGITS = '0123456789abcdef';

/** 세 자리 줄임 → 여섯 자리 — `1a2` → `#11aa22` (CSS 규칙 그대로) */
export const expandHex = (short: string): string =>
  `#${[...short].map(ch => ch + ch).join('')}`;

export const hexSlug = (short: string): string => `${HEX_PREFIX}${short}`;

/**
 * 주소 조각 → 세 자리 값.
 *
 * 소문자만 받는다. `hex-1A2`도 통과시키면 같은 색이 두 주소가 되어 정경로가
 * 갈라진다 — 이 저장소가 앞자리 0으로 겪은 것과 같은 병이다.
 */
export function parseHexSlug(slug: string): string | null {
  if (!slug.startsWith(HEX_PREFIX)) return null;
  const short = slug.slice(HEX_PREFIX.length);
  return /^[0-9a-f]{3}$/.test(short) ? short : null;
}

/** 4,096색 전부 */
export function allHexShorts(): string[] {
  const out: string[] = [];
  for (const r of DIGITS) for (const g of DIGITS) for (const b of DIGITS) out.push(r + g + b);
  return out;
}

export const HEX_COUNT = 4096;

/**
 * 계열 — 색상각으로 정한다.
 *
 * 계열 이름은 COLOR_UI.familyLabel에 이미 열 언어로 있으므로, 여기서 정하는 것은
 * 어느 칸인가 하나뿐이다. 채도가 낮으면 색상각이 뜻을 잃으므로 무채색으로 본다.
 */
export function familyOfHex(hex: string): ColorFamily {
  const hsl = hexToHsl(hex);
  if (!hsl) return 'neutral';
  if (hsl.s <= 12 || hsl.l <= 8 || hsl.l >= 95) return 'neutral';
  const h = ((hsl.h % 360) + 360) % 360;
  /* 갈색은 색상각만으로 안 갈린다 — 주황인데 어두우면 갈색으로 읽힌다 */
  if (h >= 15 && h < 45 && hsl.l < 35) return 'brown';
  if (h < 15 || h >= 345) return 'red';
  if (h < 45) return 'orange';
  if (h < 70) return 'yellow';
  if (h < 165) return 'green';
  if (h < 255) return 'blue';
  if (h < 290) return 'purple';
  return 'pink';
}

/** 사람 눈은 초록에 민감하다 — 가중치를 준 거리라야 "가까운 색"이 그럴듯하다 */
function weightedDistance(a: { r: number; g: number; b: number }, hex: string): number {
  const b = hexToRgb(hex);
  if (!b) return Infinity;
  return 2 * (a.r - b.r) ** 2 + 4 * (a.g - b.g) ** 2 + 3 * (a.b - b.b) ** 2;
}

/** 이 hex와 가장 가까운, 이름 있는 색 — 낱장에서 이름 사전으로 건너가는 다리 */
export function nearestNamedColors(short: string, limit = 6): NamedColor[] {
  const rgb = hexToRgb(expandHex(short));
  if (!rgb) return [];
  return NAMED_COLORS_8
    .map(c => ({ c, d: weightedDistance(rgb, c.hex) }))
    .sort((x, y) => x.d - y.d)
    .slice(0, limit)
    .map(x => x.c);
}

/**
 * 이웃 hex — 세 채널을 각각 한 칸씩 올리고 내린다(끝은 반대쪽으로 감는다).
 *
 * 감기 때문에 4,096칸이 하나로 이어지고 **모든 칸에 들어오는 링크가 여섯 개**다.
 * 앞에서 N개만 뽑는 방식이면 뒤쪽이 통째로 고아가 된다 — 이 저장소가 174곳에서
 * 겪은 병이라 여기서는 처음부터 감는다.
 */
export function neighborHexShorts(short: string): string[] {
  const out: string[] = [];
  for (let ch = 0; ch < 3; ch++) {
    for (const step of [-1, 1]) {
      const i = (DIGITS.indexOf(short[ch]) + step + 16) % 16;
      out.push(short.slice(0, ch) + DIGITS[i] + short.slice(ch + 1));
    }
  }
  return out;
}
