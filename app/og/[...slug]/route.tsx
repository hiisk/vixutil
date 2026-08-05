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
 * 한 장에 45~240ms고 폰트를 매번 올린다. 낱장 페이지와 같은 규칙을 준다:
 * 처음 열릴 때 만들고 그 뒤로는 캐시(revalidate=false)에서 낸다.
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
