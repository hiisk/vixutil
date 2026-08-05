import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('hi', 'lucky-numbers');

export default function HiLuckyNumbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: fortuneHubCopy('hi').title, path: '/hi/fortune' },
        { name: fortuneToolCopy('hi', 'lucky-numbers').title, path: '/hi/fortune/lucky-numbers' },
      ])} />
      <LuckyNumbers lang="hi" />
    </>
  );
}
