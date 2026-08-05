import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ElementPage from '@/components/element/ElementPage';
import { elementOf } from '@/lib/element/list';
import { detailMetadata, elementParams } from '@/lib/element/route';

export function generateStaticParams() {
  return elementParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function ElementDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!elementOf(slug)) notFound();
  return <ElementPage slug={slug} lang="pt" />;
}
