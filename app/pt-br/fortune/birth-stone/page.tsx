import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BirthStone from '@/components/fortune/BirthStone';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('pt-br', 'birth-stone');

export default function PtBrBirthStonePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: fortuneHubCopy('pt-br').title, path: '/pt-br/fortune' },
        { name: fortuneToolCopy('pt-br', 'birth-stone').title, path: '/pt-br/fortune/birth-stone' },
      ])} />
      <BirthStone lang="pt-br" />
    </>
  );
}
