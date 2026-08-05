import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ResistorPage from '@/components/resistor/ResistorPage';
import { valueOf } from '@/lib/resistor/list';
import { detailMetadata, resistorParams } from '@/lib/resistor/route';

export function generateStaticParams() {
  return resistorParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('en', slug);
}

export default async function ResistorDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!valueOf(slug)) notFound();
  return <ResistorPage slug={slug} lang="en" />;
}
