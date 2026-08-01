import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('pt-br', 'lucky-numbers');

export default function PtBrLuckyNumbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: fortuneHubCopy('pt-br').title, path: '/pt-br/fortune' },
        { name: fortuneToolCopy('pt-br', 'lucky-numbers').title, path: '/pt-br/fortune/lucky-numbers' },
      ])} />
      <LuckyNumbers lang="pt-br" />
    </>
  );
}
