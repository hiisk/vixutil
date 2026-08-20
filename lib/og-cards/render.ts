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
import { setCardSection } from '../og-template.tsx';

import { openingCard } from '../chess/route.ts';
import { itemCard as cmdCard } from '../cmd/route.ts';
import { calcCard } from '../calculator/route.ts';
import { colorCard } from '../color/route.ts';
import { algCard } from '../cube/route.ts';
import { screenCard } from '../device/route.ts';
import { extCard } from '../ext/route.ts';
import { ingredientCard } from '../food/route.ts';
import { itemCard as httpCard } from '../http/route.ts';
import { sizeCard } from '../imgsize/route.ts';
import { lensCard } from '../lens/route.ts';
import { handCard } from '../poker/route.ts';
import { patternCard } from '../regex/route.ts';
import { freqCard } from '../sound/route.ts';
import { tarotCard } from '../tarot/route.ts';
import { cityCard } from '../time/route.ts';

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

/**
 * 낱장마다 제 카드를 그리는 섹션 — 이름은 ./index.ts의 DETAIL_SECTIONS에 따로 있다.
 *
 * 여기 있는 함수들은 파일 규약(opengraph-image.tsx)을 접을 때 살아남았지만
 * 아무도 안 불러 죽어 있던 것이다. 왜 이 목록만 켜는지는 DETAIL_SECTIONS 머리말에
 * 적었다. 둘이 어긋나면 tests/og-cards.test.ts가 잡는다.
 */
const DETAIL: Record<string, (lang: Lang, slug: string) => ReactElement> = {
  'calculator': calcCard,
  'cmd': cmdCard,
  'color': colorCard,
  'device/screen': screenCard,
  'ext': extCard,
  'food': ingredientCard,
  'fortune/card': tarotCard,
  'game/chess': openingCard,
  'game/cube': algCard,
  'game/poker': handCard,
  'http': httpCard,
  'image/size': sizeCard,
  'snap/lens': lensCard,
  'sound/hz': freqCard,
  'text/regex': patternCard,
  'time': cityCard,
};

/** `/og/<언어>/<키>`의 칸들 → 카드. 그런 카드가 없으면 null. */
export function cardAt(slug: string[]): ReactElement | null {
  const at = parseCardSlug(slug);
  if (!at) return null;
  /*
    그리기 직전에 갈래를 넘긴다 — 카드 함수는 열쇠를 안 받고, 2,013곳을 고칠
    수는 없다. make()는 JSX를 짓기만 하는 동기 함수라 넣고 읽는 사이에 다른
    요청이 끼어들 틈이 없다(lib/og-template.tsx의 setCardSection 참고).
  */
  setCardSection(at.key);
  const make = CARD_SETS[at.lang][at.key];
  if (make) return make();
  /*
   * 낱장 카드 — `<섹션 키>/<슬러그>`. 섹션 카드가 없을 때만 여기로 온다.
   * 슬러그를 못 알아보면 각 함수가 알아서 제 섹션 카드로 되돌린다.
   */
  const i = at.key.lastIndexOf('/');
  const detail = i > 0 ? DETAIL[at.key.slice(0, i)] : undefined;
  return detail ? detail(at.lang, at.key.slice(i + 1)) : null;
}
