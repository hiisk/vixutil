import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CablePage from '@/components/cable/CablePage';
import { cellOf } from '@/lib/cable/list';
import { cableParams, detailMetadata } from '@/lib/cable/route';

export function generateStaticParams() {
  return cableParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function CableDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <CablePage slug={slug} lang="es" />;
}
