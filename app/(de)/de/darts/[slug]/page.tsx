import { build } from '@/lib/fold/pages/darts__slug';

/* 아홉 언어가 lib/fold/pages/darts__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 십육만 장이라 못 굽는다. 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로
   둔다 — 근거는 lib/prerender.ts. 허브는 app/(de)/de/[[...path]]가 굽는다. */
/*
 * ── force-dynamic을 걷고 ISR로 되돌렸다 (2026-08-13) ──────────
 * force-dynamic은 요청마다 원본에서 페이지를 전송한다. Hobby의 Fast Origin
 * Transfer 30일 10GB에서 실제로 348%까지 올라 사이트가 멈췄다. ISR로 돌리면
 * 크롤러 재방문이 304·0바이트가 되고 두 번째 요청은 다시 그리지 않는다.
 * 까닭과 실측은 lib/fold/pages의 해당 모듈과 app/(ko)/[section]/[slug]/page.tsx에 있다.
 */
export const revalidate = 86400;

const { generateMetadata, generateStaticParams, Page } = build('de');
export { generateMetadata, generateStaticParams };
export default Page;
