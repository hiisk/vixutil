import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FoodWeightPage from '@/components/FoodWeightPage';
import { INGREDIENTS, ingredient } from '@/lib/food/ingredients8';
import { detailMetadata } from '@/lib/food/route';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(INGREDIENTS.map(i => ({ slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function FoodDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const ing = ingredient(slug);
  if (!ing) notFound();
  return <FoodWeightPage ing={ing} lang="de" />;
}
