import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/CountryHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = COUNTRY_UI['es'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('es'),
  alternates: { canonical: localeHref('es', '/country'), languages: countryAlternates() },
});

export default function CountryHubPageEs() {
  return <CountryHub lang="es" />;
}
