/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   그리는 것도 generateStaticParams도 다른 섹션과 같다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FertilizerPage from '@/components/fertilizer/FertilizerPage';
import { cellOf } from '@/lib/fertilizer/list';
import { detailMetadata, fertilizerParams } from '@/lib/fertilizer/route';


export function generateStaticParams() {
  return fertilizerParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function FertilizerDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <FertilizerPage slug={slug} lang="ko" />;
}
