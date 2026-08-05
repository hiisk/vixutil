import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HikePage from '@/components/hike/HikePage';
import { cellOf } from '@/lib/hike/list';
import { detailMetadata, hikeParams } from '@/lib/hike/route';

export function generateStaticParams() {
  return hikeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function HikeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <HikePage slug={slug} lang="en" />;
}
