import { build } from '@/lib/fold/pages/paper__slug';

/* 아홉 언어가 lib/fold/pages/paper__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 십육만 장이라 못 굽는다. 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로
   둔다 — 근거는 lib/prerender.ts. 허브는 app/(pt-br)/pt-br/[[...path]]가 굽는다. */
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

const { generateMetadata, generateStaticParams, Page } = build('pt-br');
export { generateMetadata, generateStaticParams };
export default Page;
