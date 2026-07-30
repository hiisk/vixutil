import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';

const ui = COUNTRY_UI['en'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/en/country', languages: countryAlternates() },
};

export default function CountryHubPageEN() {
  return <CountryHub lang="en" />;
}
