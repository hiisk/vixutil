import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import YearPage from '@/components/year/YearPage';
import { yearOf } from '@/lib/year/list';
import { detailMetadata, yearParams } from '@/lib/year/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return yearParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function YearDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (yearOf(slug) === undefined) notFound();
  return <YearPage slug={slug} lang="pt" />;
}
