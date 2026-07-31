import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ChessPage from '@/components/chess/ChessPage';
import { openingOf } from '@/lib/chess/list';
import { detailMetadata, openingParams } from '@/lib/chess/route';

export function generateStaticParams() {
  return openingParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function ChessOpening({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!openingOf(slug)) notFound();
  return <ChessPage slug={slug} lang="pt" />;
}
