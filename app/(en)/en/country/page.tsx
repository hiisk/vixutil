import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates, countryHubMeta } from '@/lib/country-ui';
import { openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

const ui = COUNTRY_UI['en'];
const meta = countryHubMeta('en');

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/country', languages: countryAlternates() },
});

export default function CountryHubPageEN() {
  return <CountryHub lang="en" />;
}
