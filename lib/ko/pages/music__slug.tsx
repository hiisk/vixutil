/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MusicPage from '@/components/MusicPage';
import { MUSIC_ITEMS, musicItem } from '@/lib/music/catalog';
import { detailMetadata } from '@/lib/music/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender(MUSIC_ITEMS.map(i => ({ slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function MusicDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = musicItem(slug);
  if (!item) notFound();
  return <MusicPage item={item} lang="ko" />;
}
