import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuTopicPage from '@/components/fortune/SajuTopicPage';
import { TOPIC_SLUGS, isTopicSlug, topicMetadata } from '@/lib/saju-topics';
import { TOPIC_L10N } from '@/lib/saju-topics-l10n/index';
import { fortuneHubCopy, fortuneToolCopy } from '@/lib/fortune-tools-intl';
import type { FoldLang } from '../lang';

/* 사주 주제 낱장 — /<lang>/fortune/saju/<주제>, 아홉 언어.
   라우팅 표를 한 칸도 안 쓴다: lib/fold/registry.ts의 SLUG_ROUTES에 'fortune/saju'
   한 줄을 더하면 이미 있는 [a]/[b]/[slug] 캐치올이 받는다. 한국어는 lib/ko/pages에
   같은 짝이 있다. */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    if (!isTopicSlug(slug)) return {};
    return topicMetadata(lang, slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    if (!isTopicSlug(slug)) notFound();
    return (
      <>
        <JsonLd data={breadcrumbJsonLd([
          { name: 'vixutil', path: `/${lang}` },
          { name: fortuneHubCopy(lang).title, path: `/${lang}/fortune` },
          { name: fortuneToolCopy(lang, 'saju').title, path: `/${lang}/fortune/saju` },
          { name: TOPIC_L10N[lang].title[slug], path: `/${lang}/fortune/saju/${slug}` },
        ])} />
        <SajuTopicPage lang={lang} topic={slug} />
      </>
    );
  }

  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => TOPIC_SLUGS.map(slug => ({ slug }));

  return { generateMetadata, generateStaticParams, Page };
}
