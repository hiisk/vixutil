/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
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
