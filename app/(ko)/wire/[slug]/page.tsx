import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WirePage from '@/components/wire/WirePage';
import { cellOf } from '@/lib/wire/list';
import { detailMetadata, wireParams } from '@/lib/wire/route';

export function generateStaticParams() {
  return wireParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function WireDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <WirePage slug={slug} lang="ko" />;
}
