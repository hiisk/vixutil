import { build } from '@/lib/fold/pages/calculator__xslug';

/* 아홉 언어가 lib/fold/pages/calculator__xslug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 십육만 장이라 못 굽는다. 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로
   둔다 — 근거는 lib/prerender.ts. 허브는 app/(en)/en/[[...path]]가 굽는다. */
/*
 * ── force-dynamic을 걷고 ISR로 되돌렸다 (2026-08-13) ──────────
 * 요청마다 원본에서 페이지를 전송하던 것을 캐시로 돌렸다.
 */
export const revalidate = 86400;

const { generateMetadata, generateStaticParams, Page } = build('en');
export { generateMetadata, generateStaticParams };
export default Page;
