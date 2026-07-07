import type { Test } from './types';
import { TESTS_A } from './test-data-a';
import { TESTS_B } from './test-data-b';
import { TESTS_C } from './test-data-c';
import { TESTS_D } from './test-data-d';
import { TESTS_E } from './test-data-e';
import { TESTS_F } from './test-data-f';
import { TESTS_G } from './test-data-g';
import { TESTS_H } from './test-data-h';
import { TESTS_I } from './test-data-i';
import { TESTS_J } from './test-data-j';
import { TESTS_K } from './test-data-k';
import { TESTS_L } from './test-data-l';
import { TESTS_M } from './test-data-m';
import { TESTS_N } from './test-data-n';
import { TESTS_O } from './test-data-o';
import { TESTS_P } from './test-data-p';
import { TESTS_Q } from './test-data-q';
import { TESTS_R } from './test-data-r';
import { TESTS_S } from './test-data-s';
import { TESTS_T } from './test-data-t';
import { TESTS_U } from './test-data-u';
import { TESTS_V } from './test-data-v';
import { TESTS_W } from './test-data-w';

export const TESTS: Test[] = [
  ...TESTS_A,
  ...TESTS_B,
  ...TESTS_C,
  ...TESTS_D,
  ...TESTS_E,
  ...TESTS_F,
  ...TESTS_G,
  ...TESTS_H,
  ...TESTS_I,
  ...TESTS_J,
  ...TESTS_K,
  ...TESTS_L,
  ...TESTS_M,
  ...TESTS_N,
  ...TESTS_O,
  ...TESTS_P,
  ...TESTS_Q,
  ...TESTS_R,
  ...TESTS_S,
  ...TESTS_T,
  ...TESTS_U,
  ...TESTS_V,
  ...TESTS_W,
];

export const TEST_MAP: Record<string, Test> = Object.fromEntries(TESTS.map(item => [item.slug, item]));
