import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DartsPage from '@/components/darts/DartsPage';
import { scoreOf } from '@/lib/darts/list';
import { detailMetadata, dartsParams } from '@/lib/darts/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return dartsParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function DartsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!scoreOf(slug)) notFound();
  return <DartsPage slug={slug} lang="ko" />;
}
