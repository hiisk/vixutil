import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import WifiPage from '@/components/wifi/WifiPage';
import { channelOf } from '@/lib/wifi/list';
import { detailMetadata, wifiParams } from '@/lib/wifi/route';

export function generateStaticParams() {
  return wifiParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function WifiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!channelOf(slug)) notFound();
  return <WifiPage slug={slug} lang="en" />;
}
