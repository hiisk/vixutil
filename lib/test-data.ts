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
];

export const TEST_MAP: Record<string, Test> = Object.fromEntries(TESTS.map(item => [item.slug, item]));
