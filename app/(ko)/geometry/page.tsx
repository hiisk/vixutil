import type { Metadata } from 'next';
import { GEO_LANGS } from '@/lib/geo-section';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { withCard } from '@/lib/og-cards';

const meta = GEO_SECTION.meta['ko'];

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/geometry', languages: sectionAlternates('geometry', undefined, GEO_LANGS) },
});

export default function GeoHubKO() {
  return <FormulaHub lang="ko" section={GEO_SECTION} />;
}
