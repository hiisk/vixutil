/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChessPage from '@/components/chess/ChessPage';
import { openingOf } from '@/lib/chess/list';
import { detailMetadata, openingParams } from '@/lib/chess/route';


export function generateStaticParams() {
  return openingParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function ChessOpening({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!openingOf(slug)) notFound();
  return <ChessPage slug={slug} lang="ko" />;
}
