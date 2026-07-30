import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';

const ui = COUNTRY_UI['zh'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/zh/country', languages: countryAlternates() },
};

export default function CountryHubPageZH() {
  return <CountryHub lang="zh" />;
}
