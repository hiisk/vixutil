import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PacePage from '@/components/pace/PacePage';
import { paceOf } from '@/lib/pace/list';
import { detailMetadata, paceParams } from '@/lib/pace/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return paceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function PaceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (paceOf(slug) === undefined) notFound();
  return <PacePage slug={slug} lang="pt" />;
}
