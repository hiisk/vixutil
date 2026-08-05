import type { Metadata } from 'next';
import HanjaHub from '@/components/HanjaHub';
import { HANJA_UI, hanjaAlternates } from '@/lib/hanja-ui';
import { localeHref, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/HanjaHub.tsx 하나를 열 언어가 같이 쓴다 */
const ui = HANJA_UI['zh-hant'];

export const metadata: Metadata = withCard({
  title: ui.metaTitle,
  description: ui.metaDesc,
  openGraph: openGraphFor('zh-hant'),
  alternates: { canonical: localeHref('zh-hant', '/hanja'), languages: hanjaAlternates() },
});

export default function HanjaHubPageZhHant() {
  return <HanjaHub lang="zh-hant" />;
}
