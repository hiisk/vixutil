import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RomanPage from '@/components/roman/RomanPage';
import { yearOf } from '@/lib/roman/list';
import { detailMetadata, romanParams } from '@/lib/roman/route';

export function generateStaticParams() {
  return romanParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function RomanDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (yearOf(slug) === undefined) notFound();
  return <RomanPage slug={slug} lang="en" />;
}
