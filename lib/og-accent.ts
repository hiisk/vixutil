/**
 * 글리프 안쪽을 칠할 색.
 *
 * ── 왜 to를 그대로 못 쓰나 ─────────────────────────────────
 * 카드 바탕은 from에서 to로 가는 그라디언트고, 글리프는 그 to 쪽에 앉는다.
 * 그래서 강조색이 to면 **바탕과 같은 색**이 된다. 갈래 스물여덟이 to로
 * 거의 검정(#0f172a)을 쓰고 있어서, 그 카드들은 글리프 안쪽이 통째로
 * 사라진 채 나가고 있었다 — 타로 카드의 하트가 안 보였고, 사주판·달력도
 * 같은 자리였다. 테두리만 남으니 «덜 그린 그림»으로 읽힌다.
 *
 * to가 볼 만하면 그대로 둔다(대부분의 갈래가 그렇다 — 디자인을 안 건드린다).
 * 어두울 때만 from으로 갈아 끼우고, 그것마저 어두우면 밝힌다.
 */
const lumOf = (hex: string): number => {
  const n = parseInt(hex.slice(1), 16);
  return 0.2126 * ((n >> 16) & 255) + 0.7152 * ((n >> 8) & 255) + 0.0722 * (n & 255);
};

const lighten = (hex: string, t: number): string => {
  const n = parseInt(hex.slice(1), 16);
  const mix = (c: number) => Math.round(c + (255 - c) * t);
  const [r, g, b] = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(mix);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
};

/** 바탕에 묻히지 않는 밝기 — 흰 글자가 얹히는 어두운 카드 기준 */
export const GLYPH_MIN_LUM = 60;

export function glyphAccent(from: string, to: string): string {
  if (lumOf(to) >= GLYPH_MIN_LUM) return to;
  if (lumOf(from) >= GLYPH_MIN_LUM) return from;
  return lighten(from, 0.5);
}
