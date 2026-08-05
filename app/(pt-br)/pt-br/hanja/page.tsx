import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';

/* 화면은 components/HanjaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = HANJA_UI['pt-br'];

export const metadata: Metadata = {
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('pt-br'),
  alternates: { canonical: localeHref('pt-br', '/hanja'), languages: hanjaAlternates() },
};

export default function HanjaHubPagePtBr() {
  return <HanjaHub lang="pt-br" />;
}
