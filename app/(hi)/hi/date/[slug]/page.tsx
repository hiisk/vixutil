import { build } from '@/lib/fold/pages/date__slug';

/* 아홉 언어가 lib/fold/pages/date__slug.tsx 하나를 같이 쓴다.
   새 섹션은 언어마다 이 라우트 파일이 있어야 열린다 — 허브 캐치올
   (app/(hi)/hi/[[...path]])은 허브만 받고 낱장은 여기로 온다. */
export const revalidate = false;

const { generateMetadata, generateStaticParams, Page } = build('hi');
export { generateMetadata, generateStaticParams };
export default Page;
