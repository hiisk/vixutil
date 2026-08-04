import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DartsPage from '@/components/darts/DartsPage';
import { scoreOf } from '@/lib/darts/list';
import { detailMetadata, dartsParams } from '@/lib/darts/route';

export function generateStaticParams() {
  return dartsParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function DartsDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!scoreOf(slug)) notFound();
  return <DartsPage slug={slug} lang="tw" />;
}
