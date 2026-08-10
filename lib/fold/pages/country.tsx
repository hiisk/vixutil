import type { Metadata } from 'next';
import CountryHub from '@/components/CountryHub';
import { COUNTRY_UI, countryAlternates, countryHubMeta } from '@/lib/country-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/country/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/CountryHub.tsx 하나를 열 언어가 같이 쓴다 */
  const ui = COUNTRY_UI[lang];
  const meta = countryHubMeta(lang);

  const metadata: Metadata = withCard({
    title: meta.metaTitle,
    description: meta.metaDesc,
    openGraph: openGraphFor(lang),
    alternates: { canonical: localeHref(lang, '/country'), languages: countryAlternates() },
  });

  function Page() {
    return <CountryHub lang={lang} />;
  }

  return { metadata, Page };
}
