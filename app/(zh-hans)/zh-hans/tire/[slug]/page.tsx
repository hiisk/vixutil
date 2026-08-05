import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TirePage from '@/components/tire/TirePage';
import { tireOf } from '@/lib/tire/list';
import { detailMetadata, tireParams } from '@/lib/tire/route';

export function generateStaticParams() {
  return tireParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function TireDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!tireOf(slug)) notFound();
  return <TirePage slug={slug} lang="zh" />;
}
