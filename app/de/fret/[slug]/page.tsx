import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FretPage from '@/components/fret/FretPage';
import { spotOf } from '@/lib/fret/list';
import { detailMetadata, fretParams } from '@/lib/fret/route';

export function generateStaticParams() {
  return fretParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function FretDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!spotOf(slug)) notFound();
  return <FretPage slug={slug} lang="de" />;
}
