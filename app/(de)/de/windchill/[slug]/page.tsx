import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WindchillPage from '@/components/windchill/WindchillPage';
import { cellOf } from '@/lib/windchill/list';
import { detailMetadata, windchillParams } from '@/lib/windchill/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return windchillParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function WindchillDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <WindchillPage slug={slug} lang="de" />;
}
