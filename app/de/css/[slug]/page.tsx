import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PropPage from '@/components/css/PropPage';
import { cssPropOf } from '@/lib/css/props';
import { detailMetadata, propParams } from '@/lib/css/route';

export function generateStaticParams() {
  return propParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('de', slug);
}

export default async function PropDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cssPropOf(slug)) notFound();
  return <PropPage slug={slug} lang="de" />;
}
