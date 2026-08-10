import { build } from '@/lib/fold/pages/element__slug';

/* 아홉 언어가 lib/fold/pages/element__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   낱장은 십육만 장이라 못 굽는다. 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로
   둔다 — 근거는 lib/prerender.ts. 허브는 app/(hi)/hi/[[...path]]가 굽는다. */
export const dynamic = 'force-dynamic';

const { generateMetadata, Page } = build('hi');
export { generateMetadata };
export default Page;
