import { build } from '@/lib/fold/pages/holidays__slug';

/* 아홉 언어가 lib/fold/pages/holidays__slug.tsx 하나를 같이 쓴다 — 접기 이행(2026-08-10).
   허브(/holidays)는 app/(hi)/hi/[[...path]]가 굽고, 낱장은 여기서 요청 때 그린다.
   ISR 쓰기와 캐시의 근거는 lib/prerender.ts. */
export const revalidate = false;

const { generateMetadata, generateStaticParams, Page } = build('hi');
export { generateMetadata, generateStaticParams };
export default Page;
