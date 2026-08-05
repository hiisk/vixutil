import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { withCard } from '@/lib/og-cards';

const ui = COUNTRY_UI['ko'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/country', languages: countryAlternates() },
});

export default function CountryHubPageKO() {
  return <CountryHub lang="ko" />;
}
