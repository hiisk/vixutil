import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FreqPage from '@/components/sound/FreqPage';
import { freqOf } from '@/lib/sound/freqs';
import { detailMetadata, freqParams } from '@/lib/sound/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

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
