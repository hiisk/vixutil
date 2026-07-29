/**
 * 최근 추가된 콘텐츠의 slug 목록 — 목록 페이지에서 "NEW" 배지 표시에 사용.
 * 최신 1~2개 배치만 유지한다 (너무 쌓이면 배지 의미가 퇴색되므로,
 * 새 배치를 추가할 때마다 이 목록을 최신 것으로 교체).
 */
export const NEW_RANDOM_SLUGS = new Set([
  'secret-santa',
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
  'fruit-veggie',
  'dog-breeds',
  'board-games',
  'emoji-quiz',
  'myth-monsters',
  'constellation',
  'world-rivers',
  'world-heritage',
  'norse-myth',
  'robots',
  'spices',
  'nutrition',
]);

export const NEW_CHECKLIST_SLUGS = new Set([
  'first-flight',
  'driving-test',
  'saving-challenge',
  'winter-car',
  'flu-prevention',
  'blackout',
  'solo-living',
  'earthquake',
  'puppy-arrival',
  'new-semester',
  'exam-day',
  'first-day-job',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'spaceship-name',
  'robot-name',
  'magic-spell',
  'mocktail-name',
  'dragon-name',
  'sword-name',
  'idol-group',
  'island-name',
  'tavern-name',
  'dungeon-name',
  'perfume-name',
  'flower-shop',
]);
