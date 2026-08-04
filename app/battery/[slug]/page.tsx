import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BatteryPage from '@/components/battery/BatteryPage';
import { cellOf } from '@/lib/battery/list';
import { batteryParams, detailMetadata } from '@/lib/battery/route';

export function generateStaticParams() {
  return batteryParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function BatteryDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BatteryPage slug={slug} lang="ko" />;
}
