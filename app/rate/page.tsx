import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = RATE_SECTION.meta['ko'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/rate', languages: sectionAlternates('rate') },
};

export default function RateHubKO() {
  return <FormulaHub lang="ko" section={RATE_SECTION} />;
}
