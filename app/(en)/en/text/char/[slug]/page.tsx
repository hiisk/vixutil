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
  return detailMetadata('en', slug);
}

export default async function GlyphDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!glyphOf(slug)) notFound();
  return <GlyphPage slug={slug} lang="en" />;
}
