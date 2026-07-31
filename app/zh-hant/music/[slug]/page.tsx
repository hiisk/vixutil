import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MusicPage from '@/components/MusicPage';
import { MUSIC_ITEMS, musicItem } from '@/lib/music/catalog';
import { detailMetadata } from '@/lib/music/route';

export function generateStaticParams() {
  return MUSIC_ITEMS.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function MusicDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = musicItem(slug);
  if (!item) notFound();
  return <MusicPage item={item} lang="tw" />;
}
