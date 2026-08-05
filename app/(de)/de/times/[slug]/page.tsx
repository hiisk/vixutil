import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TimesPage from '@/components/times/TimesPage';
import { productOf } from '@/lib/times/list';
import { detailMetadata, timesParams } from '@/lib/times/route';

export function generateStaticParams() {
  return timesParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function TimesDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!productOf(slug)) notFound();
  return <TimesPage slug={slug} lang="de" />;
}
