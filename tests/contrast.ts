/**
 * WCAG 대비비 — 결과판에 쓰는 색이 두 테마에서 다 읽히는지 재는 데 쓴다.
 *
 * 이 계산을 검사 파일마다 베껴 두면 한쪽만 고쳐진 채로 남는다. 실제로 이
 * 사이트에서 대비를 두 번 잘못 쟀다 — 5% 투명도를 불투명으로 봤고, 크롬이
 * 내주는 lab()을 RGB로 읽었다. 계산은 한 곳에만 둔다.
 */

/** 결과판(.result-card)의 바탕 — 라이트는 흰색, 다크는 slate-900 */
export const CARD_GROUNDS: Record<string, [number, number, number]> = {
  라이트: [255, 255, 255],
  다크: [15, 23, 42],
};

/** WCAG 대형 글자(18.66px 굵게 / 24px 이상) 기준 */
export const AA_LARGE = 3;
/** WCAG 본문 기준 */
export const AA_BODY = 4.5;

const hex = (h: string): [number, number, number] =>
  [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16)) as [number, number, number];

const luminance = (c: number[]) => {
  const [r, g, b] = c.map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** 두 색의 대비비 — 1(같은 색)에서 21(검정과 흰색)까지 */
export function contrast(fg: string | number[], bg: string | number[]): number {
  const [hi, lo] = [
    luminance(typeof fg === 'string' ? hex(fg) : fg),
    luminance(typeof bg === 'string' ? hex(bg) : bg),
  ].sort((a, b) => b - a);
  return (hi + 0.05) / (lo + 0.05);
}
