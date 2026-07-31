import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PokerHandPage from '@/components/poker/PokerHandPage';
import { handOf } from '@/lib/poker/list';
import { detailMetadata, handParams } from '@/lib/poker/route';

export function generateStaticParams() {
  return handParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function PokerHand({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!handOf(slug)) notFound();
  return <PokerHandPage slug={slug} lang="tw" />;
}
