import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RaidPage from '@/components/raid/RaidPage';
import { cellOf } from '@/lib/raid/list';
import { detailMetadata, raidParams } from '@/lib/raid/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return raidParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function RaidDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <RaidPage slug={slug} lang="ja" />;
}
