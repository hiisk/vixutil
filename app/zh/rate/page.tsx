import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = RATE_SECTION.meta['zh'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/zh/rate', languages: sectionAlternates('rate') },
};

export default function RateHubZH() {
  return <FormulaHub lang="zh" section={RATE_SECTION} />;
}
