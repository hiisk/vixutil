import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CountryPage from '@/components/CountryPage';
import { COUNTRIES, countryBySlug } from '@/lib/country-tools';
import { COUNTRY_UI, countryAlternates, gapText } from '@/lib/country-ui';
import { countryText } from '@/lib/country/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/country/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const c = countryBySlug(slug);
    if (!c) return {};
    const t = countryText(c, lang);
    const ui = COUNTRY_UI[lang];
    return withCard({
      title: `${t.name} — ${ui.section}`,
      description: `${t.name}: ${gapText(c, lang)}, ${ui.volt} ${c.volt}, ${ui.plug} ${c.plug}, ${ui.dial} ${c.dial}. ${t.intro}`,
      openGraph: openGraphFor(lang),
      alternates: { canonical: localeHref(lang, `/country/${slug}`), languages: countryAlternates(slug) },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const c = countryBySlug(slug);
    if (!c) notFound();
    return <CountryPage country={c} lang={lang} />;
  }

  return { generateMetadata, Page };
}
