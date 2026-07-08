import type { Generator } from './types';
import { GENERATORS_A } from './generator-data-a';
import { GENERATORS_B } from './generator-data-b';
import { GENERATORS_C } from './generator-data-c';
import { GENERATORS_D } from './generator-data-d';
import { GENERATORS_E } from './generator-data-e';
import { GENERATORS_F } from './generator-data-f';
import { GENERATORS_G } from './generator-data-g';

export const GENERATORS: Generator[] = [
  ...GENERATORS_A,
  ...GENERATORS_B,
  ...GENERATORS_C,
  ...GENERATORS_D,
  ...GENERATORS_E,
  ...GENERATORS_F,
  ...GENERATORS_G,
];

export const GENERATOR_MAP: Record<string, Generator> = Object.fromEntries(GENERATORS.map(item => [item.slug, item]));
