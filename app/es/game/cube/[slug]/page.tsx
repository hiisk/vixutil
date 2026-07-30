import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CubePage from '@/components/cube/CubePage';
import { algOf } from '@/lib/cube/list';
import { detailMetadata, algParams } from '@/lib/cube/route';

export function generateStaticParams() {
  return algParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function CubeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!algOf(slug)) notFound();
  return <CubePage slug={slug} lang="es" />;
}
