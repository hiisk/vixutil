import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GengoPage from '@/components/gengo/GengoPage';
import { cellOf } from '@/lib/gengo/list';
import { detailMetadata, gengoParams } from '@/lib/gengo/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return gengoParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function GengoDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <GengoPage slug={slug} lang="hi" />;
}
