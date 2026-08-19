/**
 * 카드 썸네일의 판 색.
 *
 * 예전엔 OG 이미지(1200×630 PNG, 개당 ~90KB)를 썸네일로 썼다. 200px로 줄여
 * 보여주니 이미지 속 글씨는 어차피 안 읽혔고, 목록 하나에 17MB를 받고 있었다.
 * 그래서 이미지를 걷어내고 색 + 이모지로 대체했는데 — 섹션의 모든 카드가 같은
 * 색이라 밋밋해졌다. 194개가 전부 똑같이 생기면 아무것도 안 누른다.
 *
 * slug를 시드로 팔레트에서 색을 골라 카드마다 다르게 만든다. 결정론적이라
 * 같은 콘텐츠는 항상 같은 색이고(빌드마다 안 바뀐다), 네트워크 요청은 여전히 0이다.
 *
 * ── 진한 그라디언트를 옅은 단색으로 바꿨다 (2026-08-19) ──────────
 * 카드마다 색을 다르게 한다는 판단은 그대로 두고 **채도만 죽였다.** 264장이
 * 진한 보라·자홍 그라디언트로 깔리면 격자가 네온 벽이 되어, 카드가 서로
 * 달라도 결국 하나로 뭉쳐 보인다. 이모지를 흰 글씨처럼 얹으려고 진하게 잡은
 * 것이었는데, 아이콘을 같은 계열 진한 색으로 두면 옅은 판에서 더 잘 읽힌다.
 *
 * 값은 판·글자·다크까지 한 줄에 담는다 — 부르는 쪽이 색을 조합하지 않게 한다.
 */

const PALETTES = {
  test: [
    'bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-200',
    'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-200',
    'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200',
    'bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-950/40 dark:text-fuchsia-200',
    'bg-violet-50 text-violet-800 dark:bg-violet-950/40 dark:text-violet-200',
    'bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-200',
    'bg-purple-50 text-purple-800 dark:bg-purple-950/40 dark:text-purple-200',
    'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200',
  ],
  quiz: [
    'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
    'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200',
    'bg-yellow-50 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200',
    'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
    'bg-orange-50 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200',
    'bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-200',
    'bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-200',
    'bg-orange-100 text-orange-800 dark:bg-orange-950/40 dark:text-orange-200',
  ],
  generator: [
    'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-200',
    'bg-green-50 text-green-800 dark:bg-green-950/40 dark:text-green-200',
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
    'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200',
    'bg-teal-100 text-teal-800 dark:bg-teal-950/40 dark:text-teal-200',
    'bg-lime-50 text-lime-800 dark:bg-lime-950/40 dark:text-lime-200',
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200',
  ],
  checklist: [
    'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
    'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200',
    'bg-cyan-50 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200',
    'bg-sky-100 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
    'bg-indigo-50 text-indigo-800 dark:bg-indigo-950/40 dark:text-indigo-200',
    'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-200',
    'bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200',
    'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/40 dark:text-cyan-200',
  ],
} as const;

export type ThumbSection = keyof typeof PALETTES;

/** slug → 안정적인 해시. 같은 콘텐츠는 늘 같은 색을 갖는다. */
function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

/** 판 색 + 글자색 + 다크 짝을 한 벌로 낸다 */
export function thumbSurface(slug: string, section: ThumbSection): string {
  const palette = PALETTES[section];
  return palette[hash(slug) % palette.length];
}
