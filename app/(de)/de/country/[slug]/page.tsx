import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CountryPage from '@/components/CountryPage';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryAlternates, gapText } from '@/lib/country-ui';
import { countryText } from '@/lib/country/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

export function generateStaticParams() {
  return prerender(COUNTRIES.map(c => ({ slug: c.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) return {};
  const t = countryText(c, 'de');
  const ui = COUNTRY_UI['de'];
  return withCard({
    title: `${t.name} — ${ui.section}`,
    description: `${t.name}: ${gapText(c, 'de')}, ${ui.volt} ${c.volt}, ${ui.plug} ${c.plug}, ${ui.dial} ${c.dial}. ${t.intro}`,
    openGraph: openGraphFor('de'),
    alternates: { canonical: localeHref('de', `/country/${slug}`), languages: countryAlternates(slug) },
  });
}

export default async function CountryDetailDe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = countryBySlug(slug);
  if (!c) notFound();
  return <CountryPage country={c} lang="de" />;
}
