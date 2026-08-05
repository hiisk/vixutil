import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PacePage from '@/components/pace/PacePage';
import { paceOf } from '@/lib/pace/list';
import { detailMetadata, paceParams } from '@/lib/pace/route';

export function generateStaticParams() {
  return paceParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function PaceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (paceOf(slug) === undefined) notFound();
  return <PacePage slug={slug} lang="ko" />;
}
