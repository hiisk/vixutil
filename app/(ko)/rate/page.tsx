import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { RATE_LANGS } from '@/lib/rate-section';
import { openGraphFor } from '@/lib/locales';

const meta = RATE_SECTION.meta['ko'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('ko'),
  alternates: { canonical: '/rate', languages: sectionAlternates('rate', undefined, RATE_LANGS) },
};

export default function RateHubKO() {
  return <FormulaHub lang="ko" section={RATE_SECTION} />;
}
