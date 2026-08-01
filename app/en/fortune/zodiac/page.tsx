import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SubjectFortune from '@/components/fortune/SubjectFortune';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('en', 'zodiac');

export default function EnZodiacPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: fortuneHubCopy('en').title, path: '/en/fortune' },
        { name: fortuneToolCopy('en', 'zodiac').title, path: '/en/fortune/zodiac' },
      ])} />
      <SubjectFortune kind="zodiac" lang="en" />
    </>
  );
}
