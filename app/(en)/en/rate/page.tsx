import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { RATE_SECTION } from '@/lib/rate-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { RATE_LANGS } from '@/lib/rate-section';
import { openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

const meta = RATE_SECTION.meta['en'];

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/rate', languages: sectionAlternates('rate', undefined, RATE_LANGS) },
});

export default function RateHubEN() {
  return <FormulaHub lang="en" section={RATE_SECTION} />;
}
