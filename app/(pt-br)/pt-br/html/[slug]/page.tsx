import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TagPage from '@/components/html/TagPage';
import { tagOf } from '@/lib/html/tags';
import { detailMetadata, tagParams } from '@/lib/html/route';

export function generateStaticParams() {
  return tagParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function TagDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!tagOf(slug)) notFound();
  return <TagPage slug={slug} lang="pt" />;
}
