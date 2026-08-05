import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { withCard } from '@/lib/og-cards';

const ui = HANJA_UI['ko'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/hanja', languages: hanjaAlternates() },
});

export default function HanjaHubPageKO() {
  return <HanjaHub lang="ko" />;
}
