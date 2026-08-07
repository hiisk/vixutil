import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import BloodPage from '@/components/blood/BloodPage';
import { cellOf } from '@/lib/blood/list';
import { detailMetadata, bloodParams } from '@/lib/blood/route';

export function generateStaticParams() {
  return bloodParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function BloodDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <BloodPage slug={slug} lang="en" />;
}
