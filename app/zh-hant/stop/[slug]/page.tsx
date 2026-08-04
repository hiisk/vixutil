import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import StopPage from '@/components/stop/StopPage';
import { speedOf } from '@/lib/stop/list';
import { detailMetadata, stopParams } from '@/lib/stop/route';

export function generateStaticParams() {
  return stopParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function StopDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (speedOf(slug) === undefined) notFound();
  return <StopPage slug={slug} lang="tw" />;
}
