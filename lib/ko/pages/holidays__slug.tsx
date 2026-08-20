/* 한국어 낱장 — 라우트가 아니라 모듈이다. app/(ko)/[section]/[slug]가 부른다.
   까닭은 lib/ko/registry.ts. */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HolidayCountryPage from '@/components/holidays/HolidayCountryPage';
import HolidayOverviewPage from '@/components/holidays/HolidayOverviewPage';
import { parseSlug } from '@/lib/holidays/countries';
import { detailMetadata, holidayParams } from '@/lib/holidays/route';

export function generateStaticParams() {
  return holidayParams();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return detailMetadata('ko', slug);
}

export default async function HolidayDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();
  return parsed.year === null
    ? <HolidayOverviewPage lang="ko" country={parsed.country} now={new Date().getFullYear()} />
    : <HolidayCountryPage lang="ko" country={parsed.country} year={parsed.year} />;
}
