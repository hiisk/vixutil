import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import NumberPage from '@/components/number/NumberPage';
import { numberOf } from '@/lib/number/list';
import { detailMetadata, numberParams } from '@/lib/number/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return numberParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function NumberDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!numberOf(slug)) notFound();
  return <NumberPage slug={slug} lang="ko" />;
}
