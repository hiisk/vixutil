import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import DayLeaf from '@/components/DayLeaf';
import { allDays, dayFacts, daySlug, parseDaySlug } from '@/lib/date/day-grid';
import { DAY_UI } from '@/lib/date/day-ui';
import { alternateLanguages10, localeHref, type AnyLocale10 } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';
import { prerender } from '@/lib/prerender';

/** 날짜 낱장 — `/date/<MM-DD>` 366일 × 열 언어 = 3,660장 */
export function build(lang: AnyLocale10) {
  async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const hit = parseDaySlug(slug);
    if (!hit) return {};
    const t = DAY_UI[lang];
    const f = dayFacts(hit.month, hit.day);
    const label = t.dateLabel(hit.month, hit.day);
    const route = `/date/${daySlug(hit.month, hit.day)}`;
    return withCard({
      title: t.metaTitle(label),
      description: t.metaDesc(label, String(f.dayOfYearLeap)),
      alternates: { canonical: localeHref(lang, route), languages: alternateLanguages10(route) },
    });
  }

  async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const hit = parseDaySlug(slug);
    if (!hit) notFound();
    return <DayLeaf month={hit.month} day={hit.day} lang={lang} />;
  }

  const generateStaticParams = () => prerender(allDays().map(d => ({ slug: daySlug(d.month, d.day) })));
  return { generateMetadata, generateStaticParams, Page };
}
