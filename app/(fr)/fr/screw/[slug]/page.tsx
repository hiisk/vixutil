import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ScrewPage from '@/components/screw/ScrewPage';
import { screwOf } from '@/lib/screw/list';
import { detailMetadata, screwParams } from '@/lib/screw/route';

export function generateStaticParams() {
  return screwParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('fr', slug);
}

export default async function ScrewDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!screwOf(slug)) notFound();
  return <ScrewPage slug={slug} lang="fr" />;
}
