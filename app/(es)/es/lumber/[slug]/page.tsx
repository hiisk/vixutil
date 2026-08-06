import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LumberPage from '@/components/lumber/LumberPage';
import { cellOf } from '@/lib/lumber/list';
import { detailMetadata, lumberParams } from '@/lib/lumber/route';

export function generateStaticParams() {
  return lumberParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function LumberDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <LumberPage slug={slug} lang="es" />;
}
