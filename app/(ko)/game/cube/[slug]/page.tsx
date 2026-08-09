import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CubePage from '@/components/cube/CubePage';
import { algOf } from '@/lib/cube/list';
import { detailMetadata, algParams } from '@/lib/cube/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return algParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function CubeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!algOf(slug)) notFound();
  return <CubePage slug={slug} lang="ko" />;
}
