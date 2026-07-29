import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = RATE_SECTION.meta['en'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/en/rate', languages: sectionAlternates('rate') },
};

export default function RateHubEN() {
  return <FormulaHub lang="en" section={RATE_SECTION} />;
}
