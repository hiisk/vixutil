/**
 * 최근 추가된 콘텐츠의 slug 목록 — 목록 페이지에서 "NEW" 배지 표시에 사용.
 * 최신 1~2개 배치만 유지한다 (너무 쌓이면 배지 의미가 퇴색되므로,
 * 새 배치를 추가할 때마다 이 목록을 최신 것으로 교체).
 */
export const NEW_RANDOM_SLUGS = new Set([
  'roulette',
  'ladder',
  'pick',
  'order',
  'team',
  'number',
  'coin-dice',
]);

export const NEW_TEST_SLUGS = new Set([
  'city-nature',
  'optimist-pessimist',
  'logic-emotion',
  'spender-saver',
  'minimalism',
  'comfort-style',
  'taste-independence',
  'result-vs-process',
  'trust-level',
  'appearance-care',
  'time-vs-money',
  'crisis-calm',
]);

export const NEW_QUIZ_SLUGS = new Set([
  'constellation',
  'world-rivers',
  'world-heritage',
  'norse-myth',
  'robots',
  'spices',
  'nutrition',
  'world-food',
  'physics',
  'traffic-signs',
  'korean-money',
  'zodiac-animals',
]);

export const NEW_CHECKLIST_SLUGS = new Set([
  'puppy-arrival',
  'new-semester',
  'exam-day',
  'first-day-job',
  'empty-house',
  'zero-waste',
  'first-salary',
  'retirement-prep',
  'hospitalization',
  'proposal',
  'blind-date',
  'daycare',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'spy-codename',
  'pirate-name',
  'villain-name',
  'cocktail-name',
  'superhero-name',
  'bakery-name',
  'guild-name',
  'rapper-name',
  'pickup-line',
  'study-goal',
  'diet-menu',
  'compliment-message',
]);
