import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FreqPage from '@/components/sound/FreqPage';
import { freqOf } from '@/lib/sound/freqs';
import { detailMetadata, freqParams } from '@/lib/sound/route';

export function generateStaticParams() {
  return freqParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function FreqDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!freqOf(slug)) notFound();
  return <FreqPage slug={slug} lang="ko" />;
}
