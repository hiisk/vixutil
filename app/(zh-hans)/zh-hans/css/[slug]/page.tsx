import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PropPage from '@/components/css/PropPage';
import { cssPropOf } from '@/lib/css/props';
import { detailMetadata, propParams } from '@/lib/css/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return propParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('zh', slug);
}

export default async function PropDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cssPropOf(slug)) notFound();
  return <PropPage slug={slug} lang="zh" />;
}
