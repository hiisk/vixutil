import type { Quiz } from './types';
import { QUIZZES_A } from './quiz-data-a';
import { QUIZZES_B } from './quiz-data-b';
import { QUIZZES_C } from './quiz-data-c';
import { QUIZZES_D } from './quiz-data-d';
import { QUIZZES_E } from './quiz-data-e';
import { QUIZZES_F } from './quiz-data-f';
import { QUIZZES_G } from './quiz-data-g';
import { QUIZZES_H } from './quiz-data-h';
import { QUIZZES_I } from './quiz-data-i';
import { QUIZZES_J } from './quiz-data-j';
import { QUIZZES_K } from './quiz-data-k';
import { QUIZZES_L } from './quiz-data-l';
import { QUIZZES_M } from './quiz-data-m';
import { QUIZZES_N } from './quiz-data-n';

export const QUIZZES: Quiz[] = [
  ...QUIZZES_A,
  ...QUIZZES_B,
  ...QUIZZES_C,
  ...QUIZZES_D,
  ...QUIZZES_E,
  ...QUIZZES_F,
  ...QUIZZES_G,
  ...QUIZZES_H,
  ...QUIZZES_I,
  ...QUIZZES_J,
  ...QUIZZES_K,
  ...QUIZZES_L,
  ...QUIZZES_M,
  ...QUIZZES_N,
];

export const QUIZ_MAP: Record<string, Quiz> = Object.fromEntries(
  QUIZZES.map(item => [item.slug, item])
);
