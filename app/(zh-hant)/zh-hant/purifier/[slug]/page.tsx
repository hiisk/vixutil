import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PurifierPage from '@/components/purifier/PurifierPage';
import { cellOf } from '@/lib/purifier/list';
import { detailMetadata, purifierParams } from '@/lib/purifier/route';

export function generateStaticParams() {
  return purifierParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function PurifierDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <PurifierPage slug={slug} lang="tw" />;
}
