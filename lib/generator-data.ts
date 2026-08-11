import type { Generator } from './types.ts';
import { GENERATORS_A } from './generator-data-a.ts';
import { GENERATORS_B } from './generator-data-b.ts';
import { GENERATORS_C } from './generator-data-c.ts';
import { GENERATORS_D } from './generator-data-d.ts';
import { GENERATORS_E } from './generator-data-e.ts';
import { GENERATORS_F } from './generator-data-f.ts';
import { GENERATORS_G } from './generator-data-g.ts';
import { GENERATORS_H } from './generator-data-h.ts';
import { GENERATORS_I } from './generator-data-i.ts';
import { GENERATORS_J } from './generator-data-j.ts';
import { GENERATORS_K } from './generator-data-k.ts';

export const GENERATORS: Generator[] = [
  ...GENERATORS_A,
  ...GENERATORS_B,
  ...GENERATORS_C,
  ...GENERATORS_D,
  ...GENERATORS_E,
  ...GENERATORS_F,
  ...GENERATORS_G,
  ...GENERATORS_H,
  ...GENERATORS_I,
  ...GENERATORS_J,
  ...GENERATORS_K,
];

export const GENERATOR_MAP: Record<string, Generator> = Object.fromEntries(GENERATORS.map(item => [item.slug, item]));
