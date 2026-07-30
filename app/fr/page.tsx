import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  title: HOME_UI['fr'].metaTitle,
  description: HOME_UI['fr'].metaDesc,
  alternates: { canonical: '/fr', languages: alternateLanguages('/') },
};

export default function FrHome() {
  return <LocaleHome lang="fr" />;
}
