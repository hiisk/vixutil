import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DrillPage from '@/components/drill/DrillPage';
import { bitOf } from '@/lib/drill/list';
import { detailMetadata, drillParams } from '@/lib/drill/route';

export function generateStaticParams() {
  return drillParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function DrillDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!bitOf(slug)) notFound();
  return <DrillPage slug={slug} lang="en" />;
}
