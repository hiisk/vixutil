import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BirthStone from '@/components/fortune/BirthStone';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('ja', 'birth-stone');

export default function JaBirthStonePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: fortuneHubCopy('ja').title, path: '/ja/fortune' },
        { name: fortuneToolCopy('ja', 'birth-stone').title, path: '/ja/fortune/birth-stone' },
      ])} />
      <BirthStone lang="ja" />
    </>
  );
}
