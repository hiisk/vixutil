import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExposurePage from '@/components/exposure/ExposurePage';
import { cellOf } from '@/lib/exposure/list';
import { detailMetadata, exposureParams } from '@/lib/exposure/route';

export function generateStaticParams() {
  return exposureParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function ExposureDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <ExposurePage slug={slug} lang="ja" />;
}
