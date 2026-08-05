import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HanjaPage from '@/components/HanjaPage';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_UI, hanjaAlternates, idiomHeading } from '@/lib/hanja-ui';
import { idiomText } from '@/lib/hanja/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

export function generateStaticParams() {
  return prerender(IDIOMS.map(i => ({ slug: i.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) return {};
  const t = idiomText(i, 'hi');
  const ui = HANJA_UI['hi'];
  // 일본어 표제는 한자를 포함하므로 정자와 겹칠 수 있다 — 겹치면 한 번만 적는다
  const heading = idiomHeading(i, 'hi');
  return withCard({
    // 표제가 한자와 같으면 한 번만 적는다. 중국어 간체는 표제가 简体라
    // 번체 원자와 글자가 달라, 둘을 함께 견줘야 "鷄卵有骨 鸡卵有骨"처럼 겹쳐 나오지 않는다.
    title: heading === i.hanja || heading === i.simplified
      ? `${i.hanja} — ${ui.section}`
      : `${i.hanja} ${heading} — ${ui.section}`,
    description: `${t.meaning} ${t.origin}`,
    openGraph: openGraphFor('hi'),
    alternates: { canonical: localeHref('hi', `/hanja/${slug}`), languages: hanjaAlternates(slug) },
  });
}

export default async function HanjaDetailHi({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) notFound();
  return <HanjaPage idiom={i} lang="hi" />;
}
