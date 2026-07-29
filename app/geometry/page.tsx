import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = GEO_SECTION.meta['ko'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/geometry', languages: sectionAlternates('geometry') },
};

export default function GeoHubKO() {
  return <FormulaHub lang="ko" section={GEO_SECTION} />;
}
