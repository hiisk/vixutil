import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('fr', 'lucky-numbers');

export default function FrLuckyNumbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: fortuneHubCopy('fr').title, path: '/fr/fortune' },
        { name: fortuneToolCopy('fr', 'lucky-numbers').title, path: '/fr/fortune/lucky-numbers' },
      ])} />
      <LuckyNumbers lang="fr" />
    </>
  );
}
