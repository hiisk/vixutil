import type { ReactElement } from 'react';
import { ogCard } from './og-template.tsx';
import type { Lang } from './i18n/lang.ts';
import { ILJU_BY_SLUG, iljuInfo } from './ilju.ts';

/**
 * 일주 낱장의 공유 카드.
 *
 * ── 왜 낱장마다 그리나 ─────────────────────────────────────
 * 사주를 본 사람이 공유하면 글에는 「丙子 (병자 일주)」가 찍히는데 그림은
 * 예순 명이 전부 같은 「일주 60가지」였다. 글과 그림이 어긋나면 받는 쪽에서
 * 「이 사람 것」으로 안 읽힌다 — 공유가 도는 이유가 바로 그 «내 것»인데.
 *
 * 낱장 카드는 라우팅 표를 한 칸도 안 쓴다(/og/[...slug] 캐치올 하나가 받는다).
 * 여는 주소 공간은 예순이고, robots가 /og/*​/*​/*를 막아 크롤러는 못 쓸어 간다 —
 * 그리는 값은 공유 횟수를 따라간다. 근거는 lib/og-cards/index.ts 머리말.
 */

const FROM = '#6366f1';
const TO = '#7c3aed';
const ICON = '🔯';

export function iljuCard(_lang: Lang, slug: string): ReactElement {
  const g = ILJU_BY_SLUG.get(slug);
  const i = g && iljuInfo(g.key);
  /* 슬러그를 못 알아보면 갈래 카드로 되돌린다 — 규약은 다른 낱장 카드와 같다 */
  if (!i) {
    return ogCard({
      icon: ICON, eyebrow: '일주 60가지', title: '일주 60가지',
      desc: '갑자일주부터 계해일주까지 하나씩 풀이', from: FROM, to: TO,
    });
  }
  return ogCard({
    icon: ICON,
    /* 한자를 눈표로 앞세운다 — 예순 장이 서로 다르다는 것이 여기서 먼저 보인다 */
    eyebrow: `${i.hanja} · 일주`,
    title: `${i.key}일주`,
    desc: `일간 ${i.stem.kor}(${i.stem.element}) · 일지 ${i.branch.kor}(${i.branch.element} ${i.branch.animal}) · 십이운성 ${i.unseong}`,
    from: FROM,
    to: TO,
  });
}
