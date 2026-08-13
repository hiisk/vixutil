/**
 * 공유 카드를 그리는 단 하나의 라우트.
 *
 * 전에는 이 자리가 app 곳곳의 opengraph-image.tsx 1,799장이었다. 왜 하나로
 * 접었는지는 lib/og-cards/index.ts 머리말에 적었다.
 *
 * 주소는 `/og/<언어>/<경로>`다 — `/og/ko`, `/og/en/color/name`.
 * 메타데이터에 이 주소를 넣는 것은 lib/og-cards의 withCard가 한다.
 */
import { ogImage } from '@/lib/og-image';
import { allCardParams } from '@/lib/og-cards';
import { cardAt } from '@/lib/og-cards/render';
import { prerender } from '@/lib/prerender';

/*
 * GET은 Next 15부터 기본이 동적이다. 그냥 두면 카드를 요청마다 다시 그린다 —
 * 한 장에 45~240ms고 폰트를 매번 올린다. 그래서 캐시가 꼭 필요하다.
 *
 * ── 캐시를 ISR에서 CDN으로 옮겼다 (2026-08-13) ─────────────────
 * 낱장과 같은 이유로 옮겼다(셈은 lib/prerender.ts). 여기만 다른 점은 **다시 그리는
 * 값이 훨씬 비싸다**는 것이다 — 낱장이 23.5ms인데 카드는 45~240ms다. 대신 카드는
 * 2,659장뿐이고(허브 단위) 사람이 공유할 때나 불린다. 전부 다시 그려도 활성 CPU
 * 10분 남짓, 한도 4시간의 4%다. 그래서 낱장과 같은 방식으로 통일한다 —
 * 캐시 규칙이 두 벌이면 한쪽만 고쳐지는 자리가 생긴다.
 *
 * 캐시는 next.config의 headers()가 붙이는 s-maxage로 CDN이 든다. 그 줄이 사라지면
 * 요청마다 카드를 새로 그리게 되므로 여기가 사이트에서 가장 먼저 아파진다.
 */
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

/*
 * 빌드에서 몇 장이나 미리 구울지는 lib/prerender.ts가 정한다.
 * PRERENDER_PER_ROUTE가 0이면 한 장도 안 굽고 전부 요청 때 만든다.
 */
export function generateStaticParams() {
  return prerender(allCardParams());
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await ctx.params;
  const card = cardAt(slug);
  if (!card) return new Response('Not Found', { status: 404 });
  return ogImage(card);
}
