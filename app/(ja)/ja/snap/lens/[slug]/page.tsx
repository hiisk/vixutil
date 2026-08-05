import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LensPage from '@/components/lens/LensPage';
import { lensOf } from '@/lib/lens/list';
import { detailMetadata, lensParams } from '@/lib/lens/route';

export function generateStaticParams() {
  return lensParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function LensDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!lensOf(slug)) notFound();
  return <LensPage slug={slug} lang="ja" />;
}
