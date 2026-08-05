import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PortPage from '@/components/port/PortPage';
import { portOf } from '@/lib/port/list';
import { detailMetadata, portParams } from '@/lib/port/route';

export function generateStaticParams() {
  return portParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function PortDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!portOf(slug)) notFound();
  return <PortPage slug={slug} lang="zh" />;
}
