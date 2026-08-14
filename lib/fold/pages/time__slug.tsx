import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import CityTimePage from '@/components/CityTimePage';
import { TIME_CITIES, timeCity } from '@/lib/time/cities8';
import TimePairPage from '@/components/TimePairPage';
import { allCityPairs, pairSlug, parsePairSlug } from '@/lib/time/pair-grid';
import { detailMetadata } from '@/lib/time/route';
import { prerender } from '@/lib/prerender';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 생성됨: scripts가 아니라 접기 이행 — 원본은 옛 app/(zh-hant)/zh-hant/time/[slug]/page.tsx.
   아홉 언어 라우트 파일을 이 모듈 하나로 접었다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    /* 도시 쌍 낱장은 같은 라우트가 받는다 — lib/time/pair-grid.ts 머리말 */
    const pair = parsePairSlug(slug);
    if (pair) return <TimePairPage a={pair.a} b={pair.b} lang={DATA_KEY[lang]} />;
    const city = timeCity(slug);
    if (!city) notFound();
    return <CityTimePage city={city} lang={DATA_KEY[lang]} />;
  }

  
  /* ISR을 켜려면 generateStaticParams가 있어야 한다 — revalidate만으로는 라우트가
     동적으로 잡혀 캐시가 안 걸린다. 목록은 prerender()가 걸러서 지금은 빈 배열이다.
     까닭은 tests/prerender-budget.test.ts 머리말. */
  const generateStaticParams = () => prerender([
    ...TIME_CITIES.map(c => ({ slug: c.slug })),
    ...allCityPairs().map(p => ({ slug: pairSlug(p.a, p.b) })),
  ]);

  return { generateMetadata, generateStaticParams, Page };
}
