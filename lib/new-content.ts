/**
 * 최근 추가된 콘텐츠의 slug 목록 — 목록 페이지에서 "NEW" 배지 표시에 사용.
 * 최신 1~2개 배치만 유지한다 (너무 쌓이면 배지 의미가 퇴색되므로,
 * 새 배치를 추가할 때마다 이 목록을 최신 것으로 교체).
 */
export const NEW_TEST_SLUGS = new Set([
  'apology-style',
  'nostalgia',
  'caffeine-dependency',
  'generosity',
  'confidence-index',
  'planning-style',
  'leftover-food',
  'plant-parent',
  'karaoke-style',
  'roommate-type',
  'online-shopping',
  'study-cafe',
]);

export const NEW_QUIZ_SLUGS = new Set([
  'wine',
  'greek-myth',
  'proverb',
  'brand-logo',
  'dessert',
  'riddle',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'worry-doll',
  'toast-phrase',
  'diary-prompt',
  'question-of-day',
  'reply-message',
  'comfort-message',
]);
