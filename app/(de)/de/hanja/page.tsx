import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/HanjaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = HANJA_UI['de'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('de'),
  alternates: { canonical: localeHref('de', '/hanja'), languages: hanjaAlternates() },
};

export default function HanjaHubPageDe() {
  return <HanjaHub lang="de" />;
}
