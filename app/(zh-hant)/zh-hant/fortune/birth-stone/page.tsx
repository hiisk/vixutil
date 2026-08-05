import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import BirthStone from '@/components/fortune/BirthStone';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'birth-stone');

export default function ZhHantBirthStonePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'birth-stone').title, path: '/zh-hant/fortune/birth-stone' },
      ])} />
      <BirthStone lang="zh-hant" />
    </>
  );
}
