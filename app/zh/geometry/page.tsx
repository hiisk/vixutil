import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = GEO_SECTION.meta['zh'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/zh/geometry', languages: sectionAlternates('geometry') },
};

export default function GeoHubZH() {
  return <FormulaHub lang="zh" section={GEO_SECTION} />;
}
