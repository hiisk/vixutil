import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { GEO_SECTION } from '@/lib/geo-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { openGraphFor } from '@/lib/locales';

const meta = GEO_SECTION.meta['en'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/geometry', languages: sectionAlternates('geometry') },
};

export default function GeoHubEN() {
  return <FormulaHub lang="en" section={GEO_SECTION} />;
}
