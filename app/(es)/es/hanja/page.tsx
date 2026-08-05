import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/HanjaHub.tsx 하나를 여덟 언어가 같이 쓴다 */
const ui = HANJA_UI['es'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('es'),
  alternates: { canonical: localeHref('es', '/hanja'), languages: hanjaAlternates() },
});

export default function HanjaHubPageEs() {
  return <HanjaHub lang="es" />;
}
