import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import QuakePage from '@/components/quake/QuakePage';
import { magnitudeOf } from '@/lib/quake/list';
import { detailMetadata, quakeParams } from '@/lib/quake/route';

export function generateStaticParams() {
  return quakeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function QuakeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (magnitudeOf(slug) === undefined) notFound();
  return <QuakePage slug={slug} lang="hi" />;
}
