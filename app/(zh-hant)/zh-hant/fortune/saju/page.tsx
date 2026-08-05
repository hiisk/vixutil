import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuIntl from '@/components/fortune/SajuIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hant', 'saju');

export default function ZhHantSajuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: fortuneHubCopy('zh-hant').title, path: '/zh-hant/fortune' },
        { name: fortuneToolCopy('zh-hant', 'saju').title, path: '/zh-hant/fortune/saju' },
      ])} />
      <SajuIntl lang="zh-hant" />
    </>
  );
}
