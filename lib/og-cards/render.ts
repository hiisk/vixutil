/**
 * 카드를 실제로 그린다 — app/og/[...slug]/route.tsx만 부른다.
 *
 * 여기서 열 언어의 대응표(.tsx)를 끌어오고, 그것들은 og-template.tsx의 JSX를
 * 끌어온다. 그래서 이 파일은 검사가 부르는 사슬에 들어가면 안 된다.
 * 주소를 푸는 쪽(cardUrl·withCard)은 ./index.ts에 JSX 없이 따로 있다.
 */
import type { ReactElement } from 'react';

import type { Lang } from '../i18n/lang.ts';
import { parseCardSlug } from './index.ts';

import { CARDS as ko } from './ko.tsx';
import { CARDS as en } from './en.tsx';
import { CARDS as es } from './es.tsx';
import { CARDS as pt } from './pt.tsx';
import { CARDS as ja } from './ja.tsx';
import { CARDS as de } from './de.tsx';
import { CARDS as fr } from './fr.tsx';
import { CARDS as hi } from './hi.tsx';
import { CARDS as zh } from './zh.tsx';
import { CARDS as tw } from './tw.tsx';

export const CARD_SETS: Record<Lang, Record<string, () => ReactElement>> = {
  ko, en, es, pt, ja, de, fr, hi, zh, tw,
};

/** `/og/<언어>/<키>`의 칸들 → 카드. 그런 카드가 없으면 null. */
export function cardAt(slug: string[]): ReactElement | null {
  const at = parseCardSlug(slug);
  if (!at) return null;
  const make = CARD_SETS[at.lang][at.key];
  return make ? make() : null;
}
