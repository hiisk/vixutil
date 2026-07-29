import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { BODY_SECTION } from '@/lib/body-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = BODY_SECTION.meta['ko'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/body', languages: sectionAlternates('body') },
};

export default function BodyHubKO() {
  return <FormulaHub lang="ko" section={BODY_SECTION} />;
}
