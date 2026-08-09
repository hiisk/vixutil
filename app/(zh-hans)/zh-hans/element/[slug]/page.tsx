import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ElementPage from '@/components/element/ElementPage';
import { elementOf } from '@/lib/element/list';
import { detailMetadata, elementParams } from '@/lib/element/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return elementParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function ElementDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!elementOf(slug)) notFound();
  return <ElementPage slug={slug} lang="zh" />;
}
