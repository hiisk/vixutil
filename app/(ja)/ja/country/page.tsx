import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/CountryHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = COUNTRY_UI['ja'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('ja'),
  alternates: { canonical: localeHref('ja', '/country'), languages: countryAlternates() },
});

export default function CountryHubPageJa() {
  return <CountryHub lang="ja" />;
}
