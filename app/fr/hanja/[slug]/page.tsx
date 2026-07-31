import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import HanjaPage from '@/components/HanjaPage';
import { IDIOMS, idiomBySlug } from '@/lib/hanja-tools';
import { HANJA_UI, hanjaAlternates, idiomHeading } from '@/lib/hanja-ui';
import { idiomText } from '@/lib/hanja/types';
import { localeHref, openGraphFor } from '@/lib/locales';

export function generateStaticParams() {
  return IDIOMS.map(i => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) return {};
  const t = idiomText(i, 'fr');
  const ui = HANJA_UI['fr'];
  // 일본어 표제는 한자를 포함하므로 정자와 겹칠 수 있다 — 겹치면 한 번만 적는다
  const heading = idiomHeading(i, 'fr');
  return {
    title: heading === i.hanja ? `${i.hanja} — ${ui.section}` : `${i.hanja} ${heading} — ${ui.section}`,
    description: `${t.meaning} ${t.origin}`,
    openGraph: openGraphFor('fr'),
    alternates: { canonical: localeHref('fr', `/hanja/${slug}`), languages: hanjaAlternates(slug) },
  };
}

export default async function HanjaDetailFr({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = idiomBySlug(slug);
  if (!i) notFound();
  return <HanjaPage idiom={i} lang="fr" />;
}
