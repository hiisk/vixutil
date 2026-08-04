import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import TorquePage from '@/components/torque/TorquePage';
import { cellOf } from '@/lib/torque/list';
import { detailMetadata, torqueParams } from '@/lib/torque/route';

export function generateStaticParams() {
  return torqueParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('es', slug);
}

export default async function TorqueDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!cellOf(slug)) notFound();
  return <TorquePage slug={slug} lang="es" />;
}
