import { build } from '@/lib/fold/pages/rate__slug';

/* 아홉 언어가 lib/fold/pages/rate__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 십육만 장이라 못 굽는다. 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로
   둔다 — 근거는 lib/prerender.ts. 허브는 app/(de)/de/[[...path]]가 굽는다. */
/*
 * ── ISR을 버리고 CDN 캐시만 쓴다 (2026-08-13, 두 번째 고침) ────
 * ISR은 크롤 한 바퀴에 쓰기 48만~69만 단위가 든다 — 무료 한도 20만의 240~343%다.
 * 배포마다 캐시가 새로 생기므로 그 값이 배포할 때마다 다시 든다. 그래서 캐시를
 * ISR 저장소가 아니라 **CDN**에 둔다(「CDN cache reads and writes are free」).
 * 동적으로 그리되 next.config의 headers()가 s-maxage를 붙인다 — 2026-08-10의
 * force-dynamic과 다른 점이 그 헤더 하나다. 셈은 lib/prerender.ts.
 */
export const dynamic = 'force-dynamic';

const { generateMetadata, generateStaticParams, Page } = build('de');
export { generateMetadata, generateStaticParams };
export default Page;
