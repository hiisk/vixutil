/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColorNamePage from '@/components/ColorNamePage';
import { NAMED_COLORS_8, namedColor } from '@/lib/color/named8';
import { allHexShorts, hexSlug, parseHexSlug } from '@/lib/color/hex-grid';
import { hexLeafProps } from '@/lib/color/hex-leaf';
import { detailMetadata } from '@/lib/color/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender([
    ...NAMED_COLORS_8.map(c => ({ slug: c.slug })),
    ...allHexShorts().map(h => ({ slug: hexSlug(h) })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function ColorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  /* hex 낱장은 같은 라우트가 받는다 — lib/color/hex-grid.ts 머리말 */
  const short = parseHexSlug(slug);
  if (short) return <ColorNamePage {...hexLeafProps(short, 'ko')} lang="ko" />;
  const color = namedColor(slug);
  if (!color) notFound();
  return <ColorNamePage color={color} lang="ko" />;
}
