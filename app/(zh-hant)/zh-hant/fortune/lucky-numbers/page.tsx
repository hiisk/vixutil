import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import LuckyNumbers from '@/components/fortune/LuckyNumbers';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'lucky-numbers');

export default function ZhHantLuckyNumbersPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'lucky-numbers').title, path: '/zh-hant/fortune/lucky-numbers' },
      ])} />
      <LuckyNumbers lang="zh-hant" />
    </>
  );
}
