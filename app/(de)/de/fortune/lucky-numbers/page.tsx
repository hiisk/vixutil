import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('de', 'lucky-numbers');

export default function DeLuckyNumbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: fortuneHubCopy('de').title, path: '/de/fortune' },
        { name: fortuneToolCopy('de', 'lucky-numbers').title, path: '/de/fortune/lucky-numbers' },
      ])} />
      <LuckyNumbers lang="de" />
    </>
  );
}
