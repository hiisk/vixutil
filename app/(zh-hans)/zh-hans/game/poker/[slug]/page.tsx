import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PokerHandPage from '@/components/poker/PokerHandPage';
import { handOf } from '@/lib/poker/list';
import { detailMetadata, handParams } from '@/lib/poker/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return handParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function PokerHand({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!handOf(slug)) notFound();
  return <PokerHandPage slug={slug} lang="zh" />;
}
