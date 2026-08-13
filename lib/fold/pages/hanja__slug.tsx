import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HanjaPage from '@/components/HanjaPage';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_UI, hanjaAlternates, idiomHeading } from '@/lib/hanja-ui';
import { idiomText } from '@/lib/hanja/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';
import type { FoldLang } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/hanja/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const i = idiomBySlug(slug);
    if (!i) return {};
    const t = idiomText(i, lang);
    const ui = HANJA_UI[lang];
    // 일본어 표제는 한자를 포함하므로 정자와 겹칠 수 있다 — 겹치면 한 번만 적는다
    const heading = idiomHeading(i, lang);
    return withCard({
      // 표제가 한자와 같으면 한 번만 적는다. 중국어 간체는 표제가 简体라
      // 번체 원자와 글자가 달라, 둘을 함께 견줘야 "鷄卵有骨 鸡卵有骨"처럼 겹쳐 나오지 않는다.
      title: heading === i.hanja || heading === i.simplified
        ? `${i.hanja} — ${ui.section}`
        : `${i.hanja} ${heading} — ${ui.section}`,
      description: `${t.meaning} ${t.origin}`,
      openGraph: openGraphFor(lang),
      alternates: { canonical: localeHref(lang, `/hanja/${slug}`), languages: hanjaAlternates(slug) },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const i = idiomBySlug(slug);
    if (!i) notFound();
    return <HanjaPage idiom={i} lang={lang} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender(IDIOMS.map(i => ({ slug: i.slug })));

  return { generateMetadata, generateStaticParams, Page };
}
