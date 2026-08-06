import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AirPage from '@/components/air/AirPage';
import { cellOf } from '@/lib/air/list';
import { airParams, detailMetadata } from '@/lib/air/route';

export function generateStaticParams() {
  return airParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function AirDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <AirPage slug={slug} lang="zh" />;
}
