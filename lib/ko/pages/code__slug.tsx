/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CodePage from '@/components/code/CodePage';
import { cellOf, charOf } from '@/lib/code/list';
import { detailMetadata, codeParams } from '@/lib/code/route';


export function generateStaticParams() {
  return codeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function CodeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!charOf(slug) && cellOf(slug) === undefined) notFound();
  return <CodePage slug={slug} lang="ko" />;
}
