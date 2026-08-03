import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NumberPage from '@/components/number/NumberPage';
import { numberOf } from '@/lib/number/list';
import { detailMetadata, numberParams } from '@/lib/number/route';

export function generateStaticParams() {
  return numberParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function NumberDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!numberOf(slug)) notFound();
  return <NumberPage slug={slug} lang="de" />;
}
