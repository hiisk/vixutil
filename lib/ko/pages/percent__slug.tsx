/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PercentPage from '@/components/percent/PercentPage';
import { parsePercentSlug } from '@/lib/percent/list';
import { detailMetadata, percentParams } from '@/lib/percent/route';

export function generateStaticParams() {
  return percentParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function PercentDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!parsePercentSlug(slug)) notFound();
  return <PercentPage slug={slug} lang="ko" />;
}
