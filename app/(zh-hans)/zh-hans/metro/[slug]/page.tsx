import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MetroPage from '@/components/MetroPage';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { detailMetadata } from '@/lib/metro/route';
import { prerender } from '@/lib/prerender';

export function generateStaticParams() {
  return prerender(METRO_LINES.map(l => ({ slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function MetroDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = metroLine(slug);
  if (!line) notFound();
  return <MetroPage line={line} lang="zh" />;
}
