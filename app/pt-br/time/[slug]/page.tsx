import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CityTimePage from '@/components/CityTimePage';
import { TIME_CITIES, timeCity } from '@/lib/time/cities8';
import { detailMetadata } from '@/lib/time/route';

export function generateStaticParams() {
  return TIME_CITIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('pt', slug);
}

export default async function TimeCityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = timeCity(slug);
  if (!city) notFound();
  return <CityTimePage city={city} lang="pt" />;
}
