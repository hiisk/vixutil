import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PxPage from '@/components/rem/PxPage';
import { pxOf } from '@/lib/rem/list';
import { detailMetadata, pxParams } from '@/lib/rem/route';

export function generateStaticParams() {
  return pxParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function RemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (pxOf(slug) === undefined) notFound();
  return <PxPage slug={slug} lang="de" />;
}
