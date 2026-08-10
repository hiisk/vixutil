import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import BodyEngine from '@/components/body/BodyEngine';
import { BODY_SECTION, BODY_LANGS } from '@/lib/body-section';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/body/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const tool = bodyTool(slug);
    if (!tool) return {};
    const text = textOf(tool, lang);
    return withCard({
      title: text.title,
      description: text.long,
      openGraph: openGraphFor(lang),
      alternates: {
        canonical: localeHref(lang, `/body/${slug}`),
        languages: sectionAlternates('body', slug, BODY_LANGS),
      },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const tool = bodyTool(slug);
    if (!tool) notFound();
    return <FormulaPage tool={tool} lang={lang} section={BODY_SECTION} Engine={BodyEngine} />;
  }

  return { generateMetadata, Page };
}
