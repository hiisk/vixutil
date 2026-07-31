import type { Metadata } from 'next';
import { BODY_LANGS } from '@/lib/body-section';
import FormulaHub from '@/components/FormulaHub';
import { BODY_SECTION } from '@/lib/body-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { openGraphFor } from '@/lib/locales';

const meta = BODY_SECTION.meta['en'];

export const metadata: Metadata = {
  title: meta.metaTitle,
  description: meta.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/body', languages: sectionAlternates('body', undefined, BODY_LANGS) },
};

export default function BodyHubEN() {
  return <FormulaHub lang="en" section={BODY_SECTION} />;
}
