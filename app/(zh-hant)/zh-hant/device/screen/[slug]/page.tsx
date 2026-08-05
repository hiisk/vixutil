import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ScreenSpecPage from '@/components/device/ScreenSpecPage';
import { screen } from '@/lib/device/screens';
import { detailMetadata, screenParams } from '@/lib/device/route';

export function generateStaticParams() {
  return screenParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function ScreenDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!screen(slug)) notFound();
  return <ScreenSpecPage slug={slug} lang="tw" />;
}
