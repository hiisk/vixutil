import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SizePage from '@/components/size/SizePage';
import { cellOf } from '@/lib/size/list';
import { detailMetadata, sizeParams } from '@/lib/size/route';

export function generateStaticParams() {
  return sizeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function SizeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <SizePage slug={slug} lang="pt" />;
}
