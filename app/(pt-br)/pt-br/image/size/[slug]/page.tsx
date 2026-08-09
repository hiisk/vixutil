import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SizePage from '@/components/imgsize/SizePage';
import { imgSizeOf } from '@/lib/imgsize/list';
import { detailMetadata, sizeParams } from '@/lib/imgsize/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return sizeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function SizeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!imgSizeOf(slug)) notFound();
  return <SizePage slug={slug} lang="pt" />;
}
