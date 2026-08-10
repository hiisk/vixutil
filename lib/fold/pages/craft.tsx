import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { CRAFT_SECTION, CRAFT_LANGS } from '@/lib/craft-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 허브는 아홉 언어가 이 모듈 하나를 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  const meta = sectionMeta(CRAFT_SECTION, lang);

  const metadata: Metadata = withCard({
    title: meta.metaTitle,
    description: meta.metaDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/craft'),
      languages: sectionAlternates('craft', undefined, CRAFT_LANGS),
    },
  });

  function Page() {
    return <FormulaHub lang={lang} section={CRAFT_SECTION} />;
  }

  return { metadata, Page };
}
