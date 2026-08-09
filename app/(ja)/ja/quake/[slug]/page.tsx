import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import QuakePage from '@/components/quake/QuakePage';
import { magnitudeOf } from '@/lib/quake/list';
import { detailMetadata, quakeParams } from '@/lib/quake/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return quakeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function QuakeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (magnitudeOf(slug) === undefined) notFound();
  return <QuakePage slug={slug} lang="ja" />;
}
