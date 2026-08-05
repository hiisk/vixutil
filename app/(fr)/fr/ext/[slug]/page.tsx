import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExtPage from '@/components/ext/ExtPage';
import { extOf } from '@/lib/ext/list';
import { detailMetadata, extParams } from '@/lib/ext/route';

export function generateStaticParams() {
  return extParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function ExtDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!extOf(slug)) notFound();
  return <ExtPage slug={slug} lang="fr" />;
}
