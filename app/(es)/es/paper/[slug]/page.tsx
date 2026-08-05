import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PaperPage from '@/components/paper/PaperPage';
import { cellOf } from '@/lib/paper/list';
import { detailMetadata, paperParams } from '@/lib/paper/route';

export function generateStaticParams() {
  return paperParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function PaperDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <PaperPage slug={slug} lang="es" />;
}
