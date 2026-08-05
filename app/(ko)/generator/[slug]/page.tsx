import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { GENERATORS, GENERATOR_MAP } from '@/lib/generator-data';
import { EN_GENERATOR_SLUGS } from '@/lib/generator-en';
import { alternateLanguages10 } from '@/lib/locales';
import LangPicker from '@/components/LangPicker';
import { GENERATOR_LANGS } from '@/components/GeneratorIntlPage';
import GeneratorEngine from '@/components/GeneratorEngine';
import GeneratorContent from '@/components/GeneratorContent';
import RelatedContent from '@/components/RelatedContent';
import SiteFooter from '@/components/SiteFooter';
import Faq from '@/components/Faq';
import { contentFaq } from '@/lib/content-faq';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

export function generateStaticParams() {
  return prerender(GENERATORS.map(g => ({ slug: g.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const gen = GENERATOR_MAP[slug];
  if (!gen) return {};
  /*
   * 번역판이 있는 스무 개만 hreflang을 단다 — 나머지 백여든넷은 한국어뿐이라
   * 대안이 없다. EN_GENERATOR_SLUGS가 그 스무 개이고, 아홉 언어가 모두 같은
   * 슬러그를 쓰므로 열 언어를 그대로 선언해도 404가 나지 않는다.
   *
   * 예전에는 여기서 영어만 선언했다. 그래서 독일어판이 한국어를 가리키는데
   * 한국어는 독일어를 안 가리키는 짝짝이가 됐고, 구글은 한쪽만 걸린 hreflang을
   * 짝으로 인정하지 않는다 — 페이지는 멀쩡한데 연결만 끊겨 있었다.
   */
  const translated = EN_GENERATOR_SLUGS.has(slug);
  return withCard({
    title: gen.title,
    description: gen.desc,
    alternates: {
      canonical: `/generator/${slug}`,
      ...(translated ? { languages: alternateLanguages10(`/generator/${slug}`) } : {}),
    },
  });
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
      {/* 스무 개만 번역판이 있다 — 나머지 백여든넷은 한국어뿐이라 버튼을 그리지 않는다 */}
      {EN_GENERATOR_SLUGS.has(slug) && (
        <div className="max-w-lg mx-auto px-4 w-full pt-3 flex justify-end">
          <LangPicker current="ko" route={`/generator/${slug}`} available={GENERATOR_LANGS} />
        </div>
      )}
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
