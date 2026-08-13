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
 * ── CDN 캐시를 시도했다가 되돌렸다 (2026-08-13) ────────────────
 * ISR 쓰기가 크롤 한 바퀴에 무료 한도의 240~343%라, 캐시를 CDN에만 두는 길
 * (force-dynamic + s-maxage 헤더)을 시도했다. **배포해서 재 보니 안 된다** —
 * 미들웨어가 세운 다른 헤더(X-Cache-Policy)는 그대로 나가는데 Cache-Control만
 * 프레임워크가 붙인 no-store가 이겼다. next.config의 headers()도 정적 라우트에만
 * 먹었다. 즉 App Router 페이지는 **ISR로 캐시되거나 캐시가 아예 없거나 둘뿐이다.**
 *
 * no-store는 요청마다 원본이 페이지 전체를 보내 Origin Transfer를 348%까지 태운
 * 바로 그 상태이므로, ISR로 되돌린다. 쓰기가 한도를 넘을지는 크롤 양에 달렸고
 * 그것은 배포 뒤 Usage로 잰다 — 셈과 실측은 lib/prerender.ts.
 */
export const revalidate = false;
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
