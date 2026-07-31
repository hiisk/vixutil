import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/CountryHub.tsx 하나를 열 언어가 같이 쓴다 */
const ui = COUNTRY_UI['zh-hant'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('zh-hant'),
  alternates: { canonical: localeHref('zh-hant', '/country'), languages: countryAlternates() },
};

export default function CountryHubPageZhHant() {
  return <CountryHub lang="zh-hant" />;
}
