import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MusicPage from '@/components/MusicPage';
import { MUSIC_ITEMS, musicItem } from '@/lib/music/catalog';
import { detailMetadata } from '@/lib/music/route';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(MUSIC_ITEMS.map(i => ({ slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function MusicDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = musicItem(slug);
  if (!item) notFound();
  return <MusicPage item={item} lang="zh" />;
}
