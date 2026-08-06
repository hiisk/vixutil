import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PowerBankPage from '@/components/powerbank/PowerBankPage';
import { cellOf } from '@/lib/powerbank/list';
import { detailMetadata, powerbankParams } from '@/lib/powerbank/route';

export function generateStaticParams() {
  return powerbankParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function PowerBankDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <PowerBankPage slug={slug} lang="pt" />;
}
