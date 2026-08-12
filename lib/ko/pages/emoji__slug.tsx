/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import EmojiPage from '@/components/emoji/EmojiPage';
import { emojiItem } from '@/lib/emoji/list';
import { detailMetadata, emojiParams } from '@/lib/emoji/route';


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
