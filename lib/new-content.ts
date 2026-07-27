/**
 * 최근 추가된 콘텐츠의 slug 목록 — 목록 페이지에서 "NEW" 배지 표시에 사용.
 * 최신 1~2개 배치만 유지한다 (너무 쌓이면 배지 의미가 퇴색되므로,
 * 새 배치를 추가할 때마다 이 목록을 최신 것으로 교체).
 */
export const NEW_TEST_SLUGS = new Set([
  'taste-independence',
  'result-vs-process',
  'trust-level',
  'appearance-care',
  'time-vs-money',
  'crisis-calm',
  'social-circle',
  'chronotype',
  'assertiveness',
  'gratitude-level',
  'solo-play',
  'adaptability',
  'personal-space',
]);

export const NEW_QUIZ_SLUGS = new Set([
  'zodiac-animals',
  'korea-symbols',
  'world-orgs',
  'continents',
  'folk-customs',
  'taste-science',
  'traditional-games',
  'appliances',
  'hanja',
  'seasons',
  'etiquette',
  'kitchen',
  'energy',
  'time',
]);

export const NEW_CHECKLIST_SLUGS = new Set([
  'first-salary',
  'retirement-prep',
  'hospitalization',
  'proposal',
  'blind-date',
  'daycare',
  'business-trip',
  'first-credit-card',
  'newborn-care',
  'driver-license',
  'first-parttime',
  'winter-prep',
  'parent-hospital',
]);

export const NEW_GENERATOR_SLUGS = new Set([
  'scent-mood',
  'first-message',
  'home-date',
  'study-break',
  'mindfulness',
  'sleep-routine',
  'world-cuisine',
  'parents-question',
  'new-year-resolution',
  'emotion-word',
  'magic-answer',
  'kids-question',
  'deep-question',
  'stretch',
]);
