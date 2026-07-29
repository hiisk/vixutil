import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { BODY_SECTION } from '@/lib/body-section';
import { sectionAlternates } from '@/lib/formula/ui';

const meta = BODY_SECTION.meta['zh'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/zh/body', languages: sectionAlternates('body') },
};

export default function BodyHubZH() {
  return <FormulaHub lang="zh" section={BODY_SECTION} />;
}
