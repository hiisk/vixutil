import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BandwidthPage from '@/components/bandwidth/BandwidthPage';
import { cellOf } from '@/lib/bandwidth/list';
import { bandwidthParams, detailMetadata } from '@/lib/bandwidth/route';

export function generateStaticParams() {
  return bandwidthParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function BandwidthDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BandwidthPage slug={slug} lang="fr" />;
}
