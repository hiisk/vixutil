import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages10, openGraphFor } from '@/lib/locales';
import { withCard } from '@/lib/og-cards';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = withCard({
  // absolute로 둔다. 문구가 이미 vixutil로 시작하니 템플릿을 붙이면 두 번 나온다
  title: { absolute: HOME_UI['pt-br'].metaTitle },
  description: HOME_UI['pt-br'].metaDesc,
  openGraph: openGraphFor('pt-br'),
  alternates: { canonical: '/pt-br', languages: alternateLanguages10('/') },
});

export default function PtBrHome() {
  return <LocaleHome lang="pt-br" />;
}
