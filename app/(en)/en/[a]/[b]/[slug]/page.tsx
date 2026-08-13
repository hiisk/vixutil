import { build } from '@/lib/fold/pages/deep__slug';

/* 세 칸 낱장(game/chess/[slug] 등)을 언어마다 라우트 하나로 접었다.
   Vercel 라우팅 표가 2,048개까지라 아홉 언어 × 열한 갈래가 표를 채우고 있었다.
   까닭과 부딪히지 않는 근거는 lib/fold/pages/deep__slug.tsx에 적어 뒀다. */
/*
 * ── ISR을 버리고 CDN 캐시만 쓴다 (2026-08-13, 두 번째 고침) ────
 * ISR은 크롤 한 바퀴에 쓰기 48만~69만 단위가 든다 — 무료 한도 20만의 240~343%다.
 * 배포마다 캐시가 새로 생기므로 그 값이 배포할 때마다 다시 든다. 그래서 캐시를
 * ISR 저장소가 아니라 **CDN**에 둔다(「CDN cache reads and writes are free」).
 * 동적으로 그리되 next.config의 headers()가 s-maxage를 붙인다 — 2026-08-10의
 * force-dynamic과 다른 점이 그 헤더 하나다. 셈은 lib/prerender.ts.
 */
export const dynamic = 'force-dynamic';

const { generateMetadata, generateStaticParams, Page } = build('en');
export { generateMetadata, generateStaticParams };
export default Page;
