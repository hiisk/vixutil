/**
 * 카드 썸네일의 그라데이션.
 *
 * 예전엔 OG 이미지(1200×630 PNG, 개당 ~90KB)를 썸네일로 썼다. 200px로 줄여
 * 보여주니 이미지 속 글씨는 어차피 안 읽혔고, 목록 하나에 17MB를 받고 있었다.
 * 그래서 이미지를 걷어내고 그라데이션 + 이모지로 대체했는데 — 섹션의 모든
 * 카드가 같은 색이라 밋밋해졌다. 194개가 전부 똑같이 생기면 아무것도 안 누른다.
 *
 * slug를 시드로 팔레트에서 색을 골라 카드마다 다르게 만든다. 결정론적이라
 * 같은 콘텐츠는 항상 같은 색이고(빌드마다 안 바뀐다), 네트워크 요청은 여전히 0이다.
 */

/** 섹션 톤에 맞춰 고른 그라데이션. 이모지가 흰 글씨처럼 얹히므로 충분히 진하게 잡는다. */
const PALETTES = {
  test: [
    'from-violet-500 to-fuchsia-500',
    'from-purple-500 to-pink-500',
    'from-indigo-500 to-violet-600',
    'from-fuchsia-500 to-rose-500',
    'from-violet-600 to-indigo-500',
    'from-pink-500 to-rose-500',
    'from-purple-600 to-violet-500',
    'from-rose-500 to-purple-500',
  ],
  quiz: [
    'from-amber-500 to-orange-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-amber-600',
    'from-amber-600 to-rose-500',
    'from-orange-400 to-amber-600',
    'from-red-500 to-orange-500',
    'from-amber-500 to-yellow-600',
    'from-orange-600 to-amber-500',
  ],
  generator: [
    'from-emerald-500 to-teal-500',
    'from-teal-500 to-cyan-500',
    'from-green-500 to-emerald-600',
    'from-emerald-600 to-green-500',
    'from-cyan-500 to-teal-600',
    'from-teal-600 to-emerald-500',
    'from-lime-500 to-emerald-600',
    'from-emerald-500 to-cyan-600',
  ],
  checklist: [
    'from-sky-500 to-blue-500',
    'from-blue-500 to-indigo-500',
    'from-cyan-500 to-sky-600',
    'from-sky-600 to-cyan-500',
    'from-indigo-500 to-sky-500',
    'from-blue-600 to-sky-500',
    'from-sky-500 to-teal-500',
    'from-cyan-600 to-blue-500',
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

export function thumbGradient(slug: string, section: ThumbSection): string {
  const palette = PALETTES[section];
  return palette[hash(slug) % palette.length];
}
