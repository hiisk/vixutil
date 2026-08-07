import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HeredityPage from '@/components/heredity/HeredityPage';
import { cellOf } from '@/lib/heredity/list';
import { detailMetadata, heredityParams } from '@/lib/heredity/route';

export function generateStaticParams() {
  return heredityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function HeredityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <HeredityPage slug={slug} lang="pt" />;
}
