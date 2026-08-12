/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   까닭은 lib/ko/registry.ts(Vercel 라우팅 표 2,048 한도). */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HardnessPage from '@/components/hardness/HardnessPage';
import { ppmOf } from '@/lib/hardness/list';
import { detailMetadata, hardnessParams } from '@/lib/hardness/route';


export function generateStaticParams() {
  return hardnessParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function HardnessDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (ppmOf(slug) === undefined) notFound();
  return <HardnessPage slug={slug} lang="ko" />;
}
