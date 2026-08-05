import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LumenPage from '@/components/lumen/LumenPage';
import { cellOf } from '@/lib/lumen/list';
import { detailMetadata, lumenParams } from '@/lib/lumen/route';

export function generateStaticParams() {
  return lumenParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function LumenDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <LumenPage slug={slug} lang="zh" />;
}
