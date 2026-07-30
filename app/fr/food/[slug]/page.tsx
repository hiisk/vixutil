import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FoodWeightPage from '@/components/FoodWeightPage';
import { INGREDIENTS, ingredient } from '@/lib/food/ingredients8';
import { detailMetadata } from '@/lib/food/route';

export function generateStaticParams() {
  return INGREDIENTS.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function FoodDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ing = ingredient(slug);
  if (!ing) notFound();
  return <FoodWeightPage ing={ing} lang="fr" />;
}
