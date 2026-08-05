import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import FormulaPage from '@/components/FormulaPage';
import BodyEngine from '@/components/body/BodyEngine';
import { BODY_SECTION, BODY_LANGS } from '@/lib/body-section';
import { bodyTool, BODY_TOOLS } from '@/lib/body-tools';
import { sectionAlternates } from '@/lib/formula/ui';
import { textOf } from '@/lib/formula/types';
import { localeHref, openGraphFor } from '@/lib/locales';
import { prerender } from '@/lib/prerender';
import { withCard } from '@/lib/og-cards';

export function generateStaticParams() {
  return prerender(BODY_TOOLS.map(t => ({ slug: t.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) return {};
  const text = textOf(tool, 'de');
  return withCard({
    title: text.title,
    description: text.long,
    openGraph: openGraphFor('de'),
    alternates: {
      canonical: localeHref('de', `/body/${slug}`),
      languages: sectionAlternates('body', slug, BODY_LANGS),
    },
  });
}

export default async function BodyDetailDe({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = bodyTool(slug);
  if (!tool) notFound();
  return <FormulaPage tool={tool} lang="de" section={BODY_SECTION} Engine={BodyEngine} />;
}
