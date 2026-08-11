import { build } from '@/lib/fold/pages/cmd__slug';

/* 아홉 언어가 lib/fold/pages/cmd__slug.tsx 하나를 같이 쓴다.
   낱장은 요청 때 그리고 캐시에 안 써 ISR 쓰기를 0으로 둔다 — 근거는 lib/prerender.ts.
   허브는 app/(hi)/hi/[[...path]]가 굽는다. */
export const dynamic = 'force-dynamic';

const { generateMetadata, Page } = build('hi');
export { generateMetadata };
export default Page;
