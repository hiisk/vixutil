import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RaidPage from '@/components/raid/RaidPage';
import { cellOf } from '@/lib/raid/list';
import { detailMetadata, raidParams } from '@/lib/raid/route';

export function generateStaticParams() {
  return raidParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function RaidDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <RaidPage slug={slug} lang="hi" />;
}
