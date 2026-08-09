import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GravityPage from '@/components/gravity/GravityPage';
import { weightOf } from '@/lib/gravity/list';
import { detailMetadata, gravityParams } from '@/lib/gravity/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return gravityParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function GravityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (weightOf(slug) === undefined) notFound();
  return <GravityPage slug={slug} lang="es" />;
}
