/**
 * 사자성어 100개 — 갈래별 파일을 모아 하나의 카탈로그로 낸다.
 */
import type { Idiom } from './hanja/types.ts';
import { ATTITUDE_IDIOMS } from './hanja/attitude.ts';
import { ATTITUDE2_IDIOMS } from './hanja/attitude2.ts';
import { EFFORT_IDIOMS } from './hanja/effort.ts';
import { EFFORT2_IDIOMS } from './hanja/effort2.ts';
import { PEOPLE_IDIOMS } from './hanja/people.ts';
import { PEOPLE2_IDIOMS } from './hanja/people2.ts';
import { SITUATION_IDIOMS } from './hanja/situation.ts';
import { SITUATION2_IDIOMS } from './hanja/situation2.ts';
import { LEARNING_IDIOMS } from './hanja/learning.ts';
import { LEARNING2_IDIOMS } from './hanja/learning2.ts';
import { WORDS_IDIOMS } from './hanja/words.ts';
import { WORDS2_IDIOMS } from './hanja/words2.ts';
import { EXTRA_IDIOMS } from './hanja/extra.ts';

export const IDIOMS: Idiom[] = [
  ...ATTITUDE_IDIOMS, ...ATTITUDE2_IDIOMS,
  ...EFFORT_IDIOMS, ...EFFORT2_IDIOMS,
  ...PEOPLE_IDIOMS, ...PEOPLE2_IDIOMS,
  ...SITUATION_IDIOMS, ...SITUATION2_IDIOMS,
  ...LEARNING_IDIOMS, ...LEARNING2_IDIOMS,
  ...WORDS_IDIOMS, ...WORDS2_IDIOMS,
  ...EXTRA_IDIOMS,
];

export const HANJA_CATEGORIES = ['처세·태도', '노력·인내', '관계·사람', '상황·형세', '배움·지혜', '말·글'] as const;

export const idiomBySlug = (slug: string): Idiom | undefined => IDIOMS.find(i => i.slug === slug);

/** 같은 갈래의 다른 성어 */
export function relatedIdioms(slug: string, limit = 6): Idiom[] {
  const me = idiomBySlug(slug);
  if (!me) return [];
  const same = IDIOMS.filter(i => i.category === me.category && i.slug !== slug);
  const others = IDIOMS.filter(i => i.category !== me.category && i.slug !== slug);
  return [...same, ...others].slice(0, limit);
}
