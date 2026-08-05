import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FractionPage from '@/components/fraction/FractionPage';
import { fractionOf } from '@/lib/fraction/list';
import { detailMetadata, fractionParams } from '@/lib/fraction/route';

export function generateStaticParams() {
  return fractionParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function FractionDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!fractionOf(slug)) notFound();
  return <FractionPage slug={slug} lang="pt" />;
}
