import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FretPage from '@/components/fret/FretPage';
import { spotOf } from '@/lib/fret/list';
import { detailMetadata, fretParams } from '@/lib/fret/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return fretParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function FretDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!spotOf(slug)) notFound();
  return <FretPage slug={slug} lang="hi" />;
}
