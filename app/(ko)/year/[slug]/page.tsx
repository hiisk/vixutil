import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import YearPage from '@/components/year/YearPage';
import { yearOf } from '@/lib/year/list';
import { detailMetadata, yearParams } from '@/lib/year/route';

export function generateStaticParams() {
  return yearParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function YearDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (yearOf(slug) === undefined) notFound();
  return <YearPage slug={slug} lang="ko" />;
}
