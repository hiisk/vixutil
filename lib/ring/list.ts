/**
 * 반지 사이즈 101칸 — 내주(둘레) 40.0mm부터 90.0mm까지 0.5mm씩.
 *
 * 나라마다 표기가 다르지만 재는 것은 하나다. 손가락에 감기는 **내주** 하나에서
 * 미국 번호·일본·한국 호수·EU(ISO 8653)가 전부 규칙으로 나온다(facts.ts).
 * 그래서 이 파일에는 범위와 눈금만 둔다 — 대응표를 옮겨 적을 것이 없다.
 *
 * ── 왜 0.5mm 눈금인가 ───────────────────────────────────
 * 미국 한 사이즈가 둘레로 2.55mm쯤이라, 0.5mm는 한 사이즈를 다섯 조각으로 나눈
 * 굵기다. 종이띠를 감아 자로 재면 사람이 읽어낼 수 있는 한계가 그쯤이고, 더
 * 촘촘하게 두면 칸만 늘고 답은 같아진다.
 *
 * ── 왜 40에서 90까지인가 ────────────────────────────────
 * 아래끝 40mm는 내경 12.7mm로, 어른 반지로 파는 가장 작은 것(미국 3호 ≈ 44mm)
 * 아래다 — 아동·새끼손가락 쪽이다. 위끝 90mm는 내경 28.6mm로 미국 21에 닿는데,
 * 이쪽은 약손가락이 아니라 **엄지 반지와 확장 규격**의 자리다. 두 끝이 무엇인지는
 * 화면에 밝힌다(ui.ts의 bandNames·isoNote) — 안 밝히면 40mm를 어른 치수로 읽는다.
 *
 * 가장 흔한 구간은 그 사이 46~62mm이고, 칸의 반이 거기에 있다.
 */

/** 내주 범위와 눈금(mm) */
export const RING_MIN = 40;
export const RING_MAX = 90;
export const RING_STEP = 0.5;

/**
 * 칸 = 내주(mm). 0.5는 2의 거듭제곱이라 40 + 0.5×i가 부동소수점에서도 정확하다 —
 * 그래서 만든 값을 다시 자르지 않는다.
 */
export const CELLS: number[] = Array.from(
  { length: Math.round((RING_MAX - RING_MIN) / RING_STEP) + 1 },
  (_, i) => RING_MIN + i * RING_STEP,
);

/**
 * 손가락 자리로 가른 네 구간 — 허브에서 이 순서로 묶어 보여 준다.
 *
 * 경계는 미국 번호의 반듯한 자리에서 끊었다: 45.5mm가 US 3.5, 61.5mm가 US 9.8,
 * 77.5mm가 US 16이다. 이름은 ui.ts의 bandNames가 열 언어로 갖는다.
 */
export const BANDS: { from: number; to: number }[] = [
  { from: 40, to: 45.5 },
  { from: 46, to: 61.5 },
  { from: 62, to: 77.5 },
  { from: 78, to: 90 },
];

/** 이 내주가 든 구간의 번호 */
export const bandOf = (mm: number): number => BANDS.findIndex(b => mm >= b.from && mm <= b.to);

/**
 * 주소는 언어를 가리지 않아야 하므로 **ISO 8653 사이즈를 그대로 쓴다** — 그 규격의
 * 사이즈가 곧 내주 밀리미터라, iso-52는 "내주 52mm"이면서 "EU 52"다. 소수점은
 * 주소에서 붙임표로 바꾼다: 52.5mm → iso-52-5, 52.0mm → iso-52.
 */
export const slugOf = (mm: number): string =>
  `iso-${Number.isInteger(mm) ? mm : String(mm).replace('.', '-')}`;

export const RING_SLUGS = CELLS.map(slugOf);

const BY_SLUG = new Map(CELLS.map(mm => [slugOf(mm), mm]));

/** 없는 주소면 undefined — 0이 칸이 될 수 없으므로 값으로 참거짓을 가려도 된다 */
export const cellOf = (slug: string): number | undefined => BY_SLUG.get(slug);

/** 목록과 공유 카드가 같은 그림을 쓴다 */
export const RING_ICON = '💍';
