import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages, openGraphFor } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  // absolute로 둔다. 문구가 이미 vixutil로 시작하니 템플릿을 붙이면 두 번 나온다
  title: { absolute: HOME_UI['en'].metaTitle },
  description: HOME_UI['en'].metaDesc,
  openGraph: openGraphFor('en'),
  alternates: { canonical: '/en', languages: alternateLanguages('/') },
};

export default function EnHome() {
  return <LocaleHome lang="en" />;
}
