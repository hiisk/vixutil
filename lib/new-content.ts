/**
 * 최근 추가된 콘텐츠의 slug 목록 — 목록 페이지에서 "NEW" 배지 표시에 사용.
 * 최신 1~2개 배치만 유지한다 (너무 쌓이면 배지 의미가 퇴색되므로,
 * 새 배치를 추가할 때마다 이 목록을 최신 것으로 교체).
 */
export const NEW_TEST_SLUGS = new Set([
  'leftover-food',
  'plant-parent',
  'karaoke-style',
  'roommate-type',
  'online-shopping',
  'study-cafe',
  'fandom-style',
  'driving-style',
  'late-night-snack',
  'emoji-style',
]);

export const NEW_QUIZ_SLUGS = new Set([
  'wine',
  'greek-myth',
  'proverb',
  'brand-logo',
  'dessert',
  'riddle',
  'spelling-quiz',
  'psychology-quiz',
  'nobel-prize',
]);

export const NEW_CHECKLIST_SLUGS = new Set([
  'jeonse-fraud',
  'car-accident',
  'unemployment-claim',
  'military-enlist',
  'freshman',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'worry-doll',
  'toast-phrase',
  'diary-prompt',
  'question-of-day',
  'reply-message',
  'comfort-message',
  'birthday-message',
  'dad-joke',
  'today-concept',
]);
