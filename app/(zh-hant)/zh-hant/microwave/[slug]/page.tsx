import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MicrowavePage from '@/components/microwave/MicrowavePage';
import { cellOf } from '@/lib/microwave/list';
import { detailMetadata, microwaveParams } from '@/lib/microwave/route';

export function generateStaticParams() {
  return microwaveParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('tw', slug);
}

export default async function MicrowaveDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <MicrowavePage slug={slug} lang="tw" />;
}
