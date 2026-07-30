import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DicePage from '@/components/dice/DicePage';
import { rollOf } from '@/lib/dice/list';
import { detailMetadata, rollParams } from '@/lib/dice/route';

export function generateStaticParams() {
  return rollParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function DiceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!rollOf(slug)) notFound();
  return <DicePage slug={slug} lang="ko" />;
}
