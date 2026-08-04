import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DewPage from '@/components/dew/DewPage';
import { cellOf } from '@/lib/dew/list';
import { detailMetadata, dewParams } from '@/lib/dew/route';

export function generateStaticParams() {
  return dewParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function DewDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <DewPage slug={slug} lang="tw" />;
}
