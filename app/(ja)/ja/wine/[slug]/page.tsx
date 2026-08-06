import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WinePage from '@/components/wine/WinePage';
import { cellOf } from '@/lib/wine/list';
import { detailMetadata, wineParams } from '@/lib/wine/route';

export function generateStaticParams() {
  return wineParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function WineDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <WinePage slug={slug} lang="ja" />;
}
