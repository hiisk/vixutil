import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CountryPage from '@/components/CountryPage';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryAlternates, gapText } from '@/lib/country-ui';
import { openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

// 낱장은 요청 때 그리고 캐시에 쓰지 않는다 — ISR 쓰기(월 20만)를 아끼는 자리다. 근거는 lib/prerender.ts
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return prerender(COUNTRIES.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  const t = c['en'];
  const ui = COUNTRY_UI['en'];
  return withCard({
    title: `${t.name} — ${ui.section}`,
    description: `${t.name}: ${gapText(c, 'en')}, ${ui.volt} ${c.volt}, ${ui.plug} ${c.plug}, ${ui.dial} ${c.dial}. ${t.intro}`,
    openGraph: openGraphFor('en'),
    alternates: { canonical: '/en/country/' + slug, languages: countryAlternates(slug) },
  });
}

export default async function CountryDetailEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) notFound();
  return <CountryPage country={c} lang="en" />;
}
