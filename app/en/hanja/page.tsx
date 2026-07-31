import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { openGraphFor } from '@/lib/locales';

const ui = HANJA_UI['en'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en/hanja', languages: hanjaAlternates() },
};

export default function HanjaHubPageEN() {
  return <HanjaHub lang="en" />;
}
