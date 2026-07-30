import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  title: HOME_UI['pt-br'].metaTitle,
  description: HOME_UI['pt-br'].metaDesc,
  alternates: { canonical: '/pt-br', languages: alternateLanguages('/') },
};

export default function PtBrHome() {
  return <LocaleHome lang="pt-br" />;
}
