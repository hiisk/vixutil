import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/CountryHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = COUNTRY_UI['pt-br'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('pt-br'),
  alternates: { canonical: localeHref('pt-br', '/country'), languages: countryAlternates() },
};

export default function CountryHubPagePtBr() {
  return <CountryHub lang="pt-br" />;
}
