import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ExtPage from '@/components/ext/ExtPage';
import { extOf } from '@/lib/ext/list';
import { detailMetadata, extParams } from '@/lib/ext/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return extParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function ExtDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!extOf(slug)) notFound();
  return <ExtPage slug={slug} lang="de" />;
}
