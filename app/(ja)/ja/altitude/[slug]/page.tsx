import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import AltitudePage from '@/components/altitude/AltitudePage';
import { altitudeOf } from '@/lib/altitude/list';
import { altitudeParams, detailMetadata } from '@/lib/altitude/route';

export function generateStaticParams() {
  return altitudeParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ja', slug);
}

export default async function AltitudeDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (altitudeOf(slug) === undefined) notFound();
  return <AltitudePage slug={slug} lang="ja" />;
}
