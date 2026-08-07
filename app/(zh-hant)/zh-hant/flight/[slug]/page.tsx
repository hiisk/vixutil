import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FlightPage from '@/components/flight/FlightPage';
import { cellOf } from '@/lib/flight/list';
import { detailMetadata, flightParams } from '@/lib/flight/route';

export function generateStaticParams() {
  return flightParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function FlightDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <FlightPage slug={slug} lang="tw" />;
}
