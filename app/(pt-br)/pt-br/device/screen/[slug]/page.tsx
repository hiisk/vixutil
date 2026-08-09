import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ScreenSpecPage from '@/components/device/ScreenSpecPage';
import { screen } from '@/lib/device/screens';
import { detailMetadata, screenParams } from '@/lib/device/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return screenParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function ScreenDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!screen(slug)) notFound();
  return <ScreenSpecPage slug={slug} lang="pt" />;
}
