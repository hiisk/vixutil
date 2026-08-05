import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/HanjaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = HANJA_UI['fr'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('fr'),
  alternates: { canonical: localeHref('fr', '/hanja'), languages: hanjaAlternates() },
};

export default function HanjaHubPageFr() {
  return <HanjaHub lang="fr" />;
}
