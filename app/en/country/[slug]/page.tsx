import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CountryPage from '@/components/CountryPage';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryAlternates, gapText } from '@/lib/country-ui';
import { openGraphFor } from '@/lib/locales';

export function generateStaticParams() {
  return COUNTRIES.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  const t = c['en'];
  const ui = COUNTRY_UI['en'];
  return {
    title: `${t.name} — ${ui.section}`,
    description: `${t.name}: ${gapText(c, 'en')}, ${ui.volt} ${c.volt}, ${ui.plug} ${c.plug}, ${ui.dial} ${c.dial}. ${t.intro}`,
    openGraph: openGraphFor('en'),
    alternates: { canonical: '/en/country/' + slug, languages: countryAlternates(slug) },
  };
}

export default async function CountryDetailEN({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) notFound();
  return <CountryPage country={c} lang="en" />;
}
