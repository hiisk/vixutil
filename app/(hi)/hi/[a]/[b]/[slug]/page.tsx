import { build } from '@/lib/fold/pages/deep__slug';

/* 세 칸 낱장(game/chess/[slug] 등)을 언어마다 라우트 하나로 접었다.
   Vercel 라우팅 표가 2,048개까지라 아홉 언어 × 열한 갈래가 표를 채우고 있었다.
   까닭과 부딪히지 않는 근거는 lib/fold/pages/deep__slug.tsx에 적어 뒀다. */
/*
 * ── force-dynamic을 걷고 ISR로 되돌렸다 (2026-08-13) ──────────
 * 세 칸 낱장이 20,709장(주소의 10%)이다. 요청마다 원본 전송이던 것을 캐시로 돌렸다.
 */
export const revalidate = false;

const { generateMetadata, generateStaticParams, Page } = build('hi');
export { generateMetadata, generateStaticParams };
export default Page;
