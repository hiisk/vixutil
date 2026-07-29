import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { BODY_SECTION } from '@/lib/body-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = BODY_SECTION.meta['en'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/en/body', languages: sectionAlternates('body') },
};

export default function BodyHubEN() {
  return <FormulaHub lang="en" section={BODY_SECTION} />;
}
