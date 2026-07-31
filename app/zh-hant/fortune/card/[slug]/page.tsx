import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TarotCardPage from '@/components/tarot/TarotCardPage';
import { cardOf } from '@/lib/tarot/deck';
import { cardParams, detailMetadata } from '@/lib/tarot/route';

export function generateStaticParams() {
  return cardParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function TarotCardDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cardOf(slug)) notFound();
  return <TarotCardPage slug={slug} lang="tw" />;
}
