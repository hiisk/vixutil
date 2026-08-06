import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ViewingPage from '@/components/viewing/ViewingPage';
import { cellOf } from '@/lib/viewing/list';
import { detailMetadata, viewingParams } from '@/lib/viewing/route';

export function generateStaticParams() {
  return viewingParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function ViewingDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <ViewingPage slug={slug} lang="fr" />;
}
