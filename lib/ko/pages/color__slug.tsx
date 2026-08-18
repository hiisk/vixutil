/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColorNamePage from '@/components/ColorNamePage';
import { NAMED_COLORS_8, namedColor } from '@/lib/color/named8';
import { detailMetadata } from '@/lib/color/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender([
    ...NAMED_COLORS_8.map(c => ({ slug: c.slug })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function ColorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const color = namedColor(slug);
  if (!color) notFound();
  return <ColorNamePage color={color} lang="ko" />;
}
