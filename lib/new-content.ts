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
  'joseon',
  'idiom',
  'pure-korean',
  'korean-movie',
  'nineties',
  'meme',
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
  'used-trade-safety',
  'first-birthday',
  'civil-service-exam',
  'laptop-buying',
  'account-breach',
  'housing-subscription',
  'interview-day',
  'condolence',
  'jeonse-fraud',
  'car-accident',
  'unemployment-claim',
  'military-enlist',
  'freshman',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'lotto',
  'random-pick-number',
  'status-message',
  'insta-caption',
  'wifi-name',
  'outfit-today',
  'ramen-combo',
  'presentation-topic',
  'dinner-place',
  'study-topic',
]);
