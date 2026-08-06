import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates, countryHubMeta } from '@/lib/country-ui';
import { withCard } from '@/lib/og-cards';

const ui = COUNTRY_UI['ko'];
const meta = countryHubMeta('ko');

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/country', languages: countryAlternates() },
});

export default function CountryHubPageKO() {
  return <CountryHub lang="ko" />;
}
