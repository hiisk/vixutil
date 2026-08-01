import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('ja', 'zodiac');

export default function JaZodiacPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: fortuneHubCopy('ja').title, path: '/ja/fortune' },
        { name: fortuneToolCopy('ja', 'zodiac').title, path: '/ja/fortune/zodiac' },
      ])} />
      <SubjectFortune kind="zodiac" lang="ja" />
    </>
  );
}
