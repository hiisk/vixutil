/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CityTimePage from '@/components/CityTimePage';
import { TIME_CITIES, timeCity } from '@/lib/time/cities8';
import { detailMetadata } from '@/lib/time/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender([
    ...TIME_CITIES.map(c => ({ slug: c.slug })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function TimeCityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const city = timeCity(slug);
  if (!city) notFound();
  return <CityTimePage city={city} lang="ko" />;
}
