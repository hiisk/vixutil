import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WifiPage from '@/components/wifi/WifiPage';
import { channelOf } from '@/lib/wifi/list';
import { detailMetadata, wifiParams } from '@/lib/wifi/route';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return wifiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('hi', slug);
}

export default async function WifiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!channelOf(slug)) notFound();
  return <WifiPage slug={slug} lang="hi" />;
}
