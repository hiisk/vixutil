import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GolfPage from '@/components/golf/GolfPage';
import { cellOf } from '@/lib/golf/list';
import { detailMetadata, golfParams } from '@/lib/golf/route';

export function generateStaticParams() {
  return golfParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function GolfDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <GolfPage slug={slug} lang="zh" />;
}
