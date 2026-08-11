import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EmojiPage from '@/components/emoji/EmojiPage';
import { emojiItem } from '@/lib/emoji/list';
import { detailMetadata, emojiParams } from '@/lib/emoji/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return emojiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function EmojiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!emojiItem(slug)) notFound();
  return <EmojiPage slug={slug} lang="ko" />;
}
