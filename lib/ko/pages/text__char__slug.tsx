/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GlyphPage from '@/components/glyph/GlyphPage';
import { glyphOf } from '@/lib/glyph/list';
import { detailMetadata, glyphParams } from '@/lib/glyph/route';


export function generateStaticParams() {
  return glyphParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function GlyphDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!glyphOf(slug)) notFound();
  return <GlyphPage slug={slug} lang="ko" />;
}
