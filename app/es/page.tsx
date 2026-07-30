import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  title: HOME_UI['es'].metaTitle,
  description: HOME_UI['es'].metaDesc,
  alternates: { canonical: '/es', languages: alternateLanguages('/') },
};

export default function EsHome() {
  return <LocaleHome lang="es" />;
}
