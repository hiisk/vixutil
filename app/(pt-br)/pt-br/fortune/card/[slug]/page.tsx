import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TarotCardPage from '@/components/tarot/TarotCardPage';
import { cardOf } from '@/lib/tarot/deck';
import { cardParams, detailMetadata } from '@/lib/tarot/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return cardParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function TarotCardDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cardOf(slug)) notFound();
  return <TarotCardPage slug={slug} lang="pt" />;
}
