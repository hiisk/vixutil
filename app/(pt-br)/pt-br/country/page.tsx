import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates, countryHubMeta } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/CountryHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = COUNTRY_UI['pt-br'];
const meta = countryHubMeta('pt-br');

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('pt-br'),
  alternates: { canonical: localeHref('pt-br', '/country'), languages: countryAlternates() },
});

export default function CountryHubPagePtBr() {
  return <CountryHub lang="pt-br" />;
}
