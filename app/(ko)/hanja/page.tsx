import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';

const ui = HANJA_UI['ko'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/hanja', languages: hanjaAlternates() },
};

export default function HanjaHubPageKO() {
  return <HanjaHub lang="ko" />;
}
