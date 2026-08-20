import type { Test } from './types.ts';
import { TESTS_A } from './test-data-a.ts';
import { TESTS_B } from './test-data-b.ts';
import { TESTS_C } from './test-data-c.ts';
import { TESTS_D } from './test-data-d.ts';
import { TESTS_E } from './test-data-e.ts';
import { TESTS_F } from './test-data-f.ts';
import { TESTS_G } from './test-data-g.ts';
import { TESTS_H } from './test-data-h.ts';
import { TESTS_I } from './test-data-i.ts';
import { TESTS_J } from './test-data-j.ts';
import { TESTS_K } from './test-data-k.ts';
import { TESTS_L } from './test-data-l.ts';
import { TESTS_M } from './test-data-m.ts';
import { TESTS_N } from './test-data-n.ts';
import { TESTS_O } from './test-data-o.ts';
import { TESTS_P } from './test-data-p.ts';
import { TESTS_Q } from './test-data-q.ts';
import { TESTS_R } from './test-data-r.ts';
import { TESTS_S } from './test-data-s.ts';
import { TESTS_T } from './test-data-t.ts';
import { TESTS_U } from './test-data-u.ts';
import { TESTS_V } from './test-data-v.ts';
import { TESTS_W } from './test-data-w.ts';
import { TESTS_X } from './test-data-x.ts';
import { TESTS_Y } from './test-data-y.ts';
import { TESTS_Z } from './test-data-z.ts';
import { TESTS_AA } from './test-data-aa.ts';
import { TESTS_AB } from './test-data-ab.ts';
import { TESTS_AC } from './test-data-ac.ts';
import { TESTS_AD } from './test-data-ad.ts';
import { TESTS_AE } from './test-data-ae.ts';
import { TESTS_AF } from './test-data-af.ts';
import { TESTS_AG } from './test-data-ag.ts';
import { TESTS_AH } from './test-data-ah.ts';
import { TESTS_AI } from './test-data-ai.ts';
import { TESTS_AJ } from './test-data-aj.ts';

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
  ...TESTS_X,
  ...TESTS_Y,
  ...TESTS_Z,
  ...TESTS_AA,
  ...TESTS_AB,
  ...TESTS_AC,
  ...TESTS_AD,
  ...TESTS_AE,
  ...TESTS_AF,
  ...TESTS_AG,
  ...TESTS_AH,
  ...TESTS_AI,
  ...TESTS_AJ,
];

export const TEST_MAP: Record<string, Test> = Object.fromEntries(TESTS.map(item => [item.slug, item]));
