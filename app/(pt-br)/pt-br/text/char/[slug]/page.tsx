import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GlyphPage from '@/components/glyph/GlyphPage';
import { glyphOf } from '@/lib/glyph/list';
import { detailMetadata, glyphParams } from '@/lib/glyph/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return glyphParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function GlyphDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!glyphOf(slug)) notFound();
  return <GlyphPage slug={slug} lang="pt" />;
}
