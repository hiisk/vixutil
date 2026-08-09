import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MetroPage from '@/components/MetroPage';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { detailMetadata } from '@/lib/metro/route';
import { prerender } from '@/lib/prerender';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(METRO_LINES.map(l => ({ slug: l.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function MetroDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = metroLine(slug);
  if (!line) notFound();
  return <MetroPage line={line} lang="hi" />;
}
