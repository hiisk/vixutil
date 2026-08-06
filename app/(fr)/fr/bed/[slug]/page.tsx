import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BedPage from '@/components/bed/BedPage';
import { cellOf } from '@/lib/bed/list';
import { bedParams, detailMetadata } from '@/lib/bed/route';

export function generateStaticParams() {
  return bedParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function BedDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BedPage slug={slug} lang="fr" />;
}
