import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';

const ui = HANJA_UI['zh'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  alternates: { canonical: '/zh/hanja', languages: hanjaAlternates() },
};

export default function HanjaHubPageZH() {
  return <HanjaHub lang="zh" />;
}
