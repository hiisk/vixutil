import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION, GEO_LANGS } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { sectionMeta } from '@/lib/formula/section';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/geometry/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  /* 화면은 components/FormulaHub.tsx 하나를 열 언어가 같이 쓴다 */
  const meta = sectionMeta(GEO_SECTION, lang);

  const metadata: Metadata = withCard({
    title: meta.metaTitle,
    description: meta.metaDesc,
    openGraph: openGraphFor(lang),
    alternates: {
      canonical: localeHref(lang, '/geometry'),
      languages: sectionAlternates('geometry', undefined, GEO_LANGS),
    },
  });

  function Page() {
    return <FormulaHub lang={lang} section={GEO_SECTION} />;
  }

  return { metadata, Page };
}
