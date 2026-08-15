import type { Metadata } from 'next';
import FormulaHub from '@/components/FormulaHub';
import { CRAFT_SECTION, CRAFT_LANGS } from '@/lib/craft-section';
import { sectionAlternates } from '@/lib/formula/ui';
import { withCard } from '@/lib/og-cards';

const meta = CRAFT_SECTION.meta['ko'];

export const metadata: Metadata = withCard({
  title: meta.metaTitle,
  description: meta.metaDesc,
  alternates: { canonical: '/craft', languages: sectionAlternates('craft', undefined, CRAFT_LANGS) },
});

export default function CraftHubKO() {
  return <FormulaHub lang="ko" section={CRAFT_SECTION} />;
}
