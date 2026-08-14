/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   옮기기만 했다: 그리는 것도 generateStaticParams도 그대로다. 까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CityTimePage from '@/components/CityTimePage';
import { TIME_CITIES, timeCity } from '@/lib/time/cities8';
import TimePairPage from '@/components/TimePairPage';
import { allCityPairs, pairSlug, parsePairSlug } from '@/lib/time/pair-grid';
import { detailMetadata } from '@/lib/time/route';
import { prerender } from '@/lib/prerender';


export function generateStaticParams() {
  return prerender([
    ...TIME_CITIES.map(c => ({ slug: c.slug })),
    ...allCityPairs().map(p => ({ slug: pairSlug(p.a, p.b) })),
  ]);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function TimeCityDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  /* 도시 쌍 낱장은 같은 라우트가 받는다 — lib/time/pair-grid.ts 머리말 */
  const pair = parsePairSlug(slug);
  if (pair) return <TimePairPage a={pair.a} b={pair.b} lang="ko" />;
  const city = timeCity(slug);
  if (!city) notFound();
  return <CityTimePage city={city} lang="ko" />;
}
