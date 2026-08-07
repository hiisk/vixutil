import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DrinkPage from '@/components/drink/DrinkPage';
import { cellOf } from '@/lib/drink/list';
import { detailMetadata, drinkParams } from '@/lib/drink/route';

export function generateStaticParams() {
  return drinkParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function DrinkDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <DrinkPage slug={slug} lang="zh" />;
}
