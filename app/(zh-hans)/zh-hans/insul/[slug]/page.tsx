import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import InsulPage from '@/components/insul/InsulPage';
import { cellOf } from '@/lib/insul/list';
import { detailMetadata, insulParams } from '@/lib/insul/route';

export function generateStaticParams() {
  return insulParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function InsulDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <InsulPage slug={slug} lang="zh" />;
}
