import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AltitudePage from '@/components/altitude/AltitudePage';
import { altitudeOf } from '@/lib/altitude/list';
import { altitudeParams, detailMetadata } from '@/lib/altitude/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return altitudeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function AltitudeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (altitudeOf(slug) === undefined) notFound();
  return <AltitudePage slug={slug} lang="ko" />;
}
