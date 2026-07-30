import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import MetroPage from '@/components/MetroPage';
import { METRO_LINES, metroLine } from '@/lib/metro-lines';
import { METRO_UI, metroAlternates } from '@/lib/metro/ui';

export function generateStaticParams() {
  return METRO_LINES.map(l => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const line = metroLine(slug);
  if (!line) return {};
  const t = line['ko'];
  const ui = METRO_UI['ko'];
  return {
    title: `${t.city} ${t.line} — ${ui.section}`,
    description: `${t.city} ${t.line}: ${line.stations.length} ${ui.stations}. ${t.intro}`,
    alternates: { canonical: '/metro/' + slug, languages: metroAlternates(slug) },
  };
}

export default async function MetroDetailKO({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const line = metroLine(slug);
  if (!line) notFound();
  return <MetroPage line={line} lang="ko" />;
}
