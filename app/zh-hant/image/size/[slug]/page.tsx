import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SizePage from '@/components/imgsize/SizePage';
import { imgSizeOf } from '@/lib/imgsize/list';
import { detailMetadata, sizeParams } from '@/lib/imgsize/route';

export function generateStaticParams() {
  return sizeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function SizeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!imgSizeOf(slug)) notFound();
  return <SizePage slug={slug} lang="tw" />;
}
