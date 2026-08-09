import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BandwidthPage from '@/components/bandwidth/BandwidthPage';
import { cellOf } from '@/lib/bandwidth/list';
import { bandwidthParams, detailMetadata } from '@/lib/bandwidth/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return bandwidthParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function BandwidthDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BandwidthPage slug={slug} lang="hi" />;
}
