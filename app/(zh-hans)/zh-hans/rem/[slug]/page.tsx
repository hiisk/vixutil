import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PxPage from '@/components/rem/PxPage';
import { pxOf } from '@/lib/rem/list';
import { detailMetadata, pxParams } from '@/lib/rem/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return pxParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function RemDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (pxOf(slug) === undefined) notFound();
  return <PxPage slug={slug} lang="zh" />;
}
