import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PetFoodPage from '@/components/petfood/PetFoodPage';
import { cellOf } from '@/lib/petfood/list';
import { detailMetadata, petfoodParams } from '@/lib/petfood/route';

export function generateStaticParams() {
  return petfoodParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function PetFoodDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <PetFoodPage slug={slug} lang="tw" />;
}
