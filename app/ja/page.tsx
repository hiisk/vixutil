import type { Metadata } from 'next';
import LocaleHome from '@/components/LocaleHome';
import { HOME_UI } from '@/lib/locale-home';
import { alternateLanguages } from '@/lib/locales';

/* 화면은 components/LocaleHome.tsx 하나를 일곱 언어가 같이 쓴다 */
export const metadata: Metadata = {
  title: HOME_UI['ja'].metaTitle,
  description: HOME_UI['ja'].metaDesc,
  alternates: { canonical: '/ja', languages: alternateLanguages('/') },
};

export default function JaHome() {
  return <LocaleHome lang="ja" />;
}
