import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BraPage from '@/components/bra/BraPage';
import { cellOf } from '@/lib/bra/list';
import { braParams, detailMetadata } from '@/lib/bra/route';

export function generateStaticParams() {
  return braParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function BraDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BraPage slug={slug} lang="tw" />;
}
