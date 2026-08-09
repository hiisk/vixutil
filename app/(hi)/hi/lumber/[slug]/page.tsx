import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LumberPage from '@/components/lumber/LumberPage';
import { cellOf } from '@/lib/lumber/list';
import { detailMetadata, lumberParams } from '@/lib/lumber/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return lumberParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function LumberDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <LumberPage slug={slug} lang="hi" />;
}
