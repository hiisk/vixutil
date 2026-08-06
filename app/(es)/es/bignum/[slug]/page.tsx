import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BigNumPage from '@/components/bignum/BigNumPage';
import { cellOf } from '@/lib/bignum/list';
import { bignumParams, detailMetadata } from '@/lib/bignum/route';

export function generateStaticParams() {
  return bignumParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function BigNumDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BigNumPage slug={slug} lang="es" />;
}
