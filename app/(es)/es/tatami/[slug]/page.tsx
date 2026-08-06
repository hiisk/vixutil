import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TatamiPage from '@/components/tatami/TatamiPage';
import { cellOf } from '@/lib/tatami/list';
import { detailMetadata, tatamiParams } from '@/lib/tatami/route';

export function generateStaticParams() {
  return tatamiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function TatamiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <TatamiPage slug={slug} lang="es" />;
}
