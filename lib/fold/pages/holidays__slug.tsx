import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HolidayCountryPage from '@/components/holidays/HolidayCountryPage';
import HolidayOverviewPage from '@/components/holidays/HolidayOverviewPage';
import { parseSlug } from '@/lib/holidays/countries';
import { detailMetadata, holidayParams } from '@/lib/holidays/route';
import type { FoldLang } from '../lang';
import { DATA_KEY } from '../lang';

/* 아홉 언어가 이 모듈 하나를 같이 쓴다. 목록은 lib/fold/registry.ts */
export function build(lang: FoldLang) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    return detailMetadata(DATA_KEY[lang], slug);
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const parsed = parseSlug(slug);
    if (!parsed) notFound();
    return parsed.year === null
      ? <HolidayOverviewPage lang={DATA_KEY[lang]} country={parsed.country} now={new Date().getFullYear()} />
      : <HolidayCountryPage lang={DATA_KEY[lang]} country={parsed.country} year={parsed.year} />;
  }

  /* ISR을 켜려면 목록이 비어도 generateStaticParams가 있어야 한다 — lib/prerender.ts */
  const generateStaticParams = () => holidayParams();

  return { generateMetadata, generateStaticParams, Page };
}
