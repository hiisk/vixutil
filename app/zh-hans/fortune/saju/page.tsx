import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SajuIntl from '@/components/fortune/SajuIntl';
import { fortuneHubCopy, fortuneToolCopy, fortuneToolMetadata } from '@/lib/fortune-tools-intl';

export const metadata: Metadata = fortuneToolMetadata('zh-hans', 'saju');

export default function ZhHansSajuPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: fortuneHubCopy('zh-hans').title, path: '/zh-hans/fortune' },
        { name: fortuneToolCopy('zh-hans', 'saju').title, path: '/zh-hans/fortune/saju' },
      ])} />
      <SajuIntl lang="zh-hans" />
    </>
  );
}
