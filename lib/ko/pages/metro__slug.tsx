/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MetroPage from '@/components/MetroPage';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { detailMetadata } from '@/lib/metro/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender(METRO_LINES.map(l => ({ slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function MetroDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = metroLine(slug);
  if (!line) notFound();
  return <MetroPage line={line} lang="ko" />;
}
