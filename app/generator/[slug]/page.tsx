import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';
import { EN_GENERATOR_SLUGS } from '@/lib/generator-en';
import { ZH_GENERATOR_SLUGS } from '@/lib/generator-zh';
import GeneratorEngine from '@/components/GeneratorEngine';
import GeneratorContent from '@/components/GeneratorContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { contentFaq } from '@/lib/content-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';

export function generateStaticParams() {
  return GENERATORS.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) return {};
  // 영어·중국어판이 있는 생성기는 hreflang으로 언어별 대체 URL을 연결 —
  // 해당 언어로 검색해 들어오면 그 언어 페이지로 간다.
  const languages: Record<string, string> = { 'ko': `/generator/${slug}` };
  if (EN_GENERATOR_SLUGS.has(slug)) { languages['en'] = `/en/generator/${slug}`; languages['x-default'] = `/en/generator/${slug}`; }
  if (ZH_GENERATOR_SLUGS.has(slug)) languages['zh'] = `/zh/generator/${slug}`;
  const hasAlt = Object.keys(languages).length > 1;
  return {
    title: gen.title,
    description: gen.desc,
    alternates: { canonical: `/generator/${slug}`, ...(hasAlt ? { languages } : {}) },
  };
}

export default async function GeneratorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) notFound();
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: '홈', path: '/' },
          { name: '생성기', path: '/generator' },
          { name: gen.title, path: `/generator/${slug}` },
        ])}
      />
      <GeneratorEngine gen={gen} />
      <GeneratorContent gen={gen} />
      <div className="bg-white dark:bg-slate-900">
        <div className="max-w-lg mx-auto px-4 pb-10 w-full">
          <Faq items={contentFaq('generator', slug, gen)} className="" />
        </div>
      </div>
      <RelatedContent items={GENERATORS} currentSlug={slug} basePath="/generator" accent="emerald" bg="bg-slate-50 dark:bg-slate-950" />
      <SiteFooter />
    </>
  );
}
