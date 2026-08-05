import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AmperePage from '@/components/ampere/AmperePage';
import { cellOf } from '@/lib/ampere/list';
import { ampereParams, detailMetadata } from '@/lib/ampere/route';

export function generateStaticParams() {
  return ampereParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function AmpereDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <AmperePage slug={slug} lang="zh" />;
}
