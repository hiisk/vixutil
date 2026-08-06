import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GengoPage from '@/components/gengo/GengoPage';
import { cellOf } from '@/lib/gengo/list';
import { detailMetadata, gengoParams } from '@/lib/gengo/route';

export function generateStaticParams() {
  return gengoParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function GengoDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <GengoPage slug={slug} lang="de" />;
}
