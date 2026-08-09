import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HttpPage from '@/components/http/HttpPage';
import { httpItemOf } from '@/lib/http/list';
import { detailMetadata, httpParams } from '@/lib/http/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return httpParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function HttpDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!httpItemOf(slug)) notFound();
  return <HttpPage slug={slug} lang="de" />;
}
