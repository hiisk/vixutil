import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  title: HOME_UI['en'].metaTitle,
  description: HOME_UI['en'].metaDesc,
  alternates: { canonical: '/en', languages: alternateLanguages('/') },
};

export default function EnHome() {
  return <LocaleHome lang="en" />;
}
