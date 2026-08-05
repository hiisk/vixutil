import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { openGraphFor } from '@/lib/locales';

const ui = COUNTRY_UI['en'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/country', languages: countryAlternates() },
};

export default function CountryHubPageEN() {
  return <CountryHub lang="en" />;
}
