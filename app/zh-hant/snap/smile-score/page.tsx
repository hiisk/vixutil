import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SmileScore from '@/components/snap/SmileScore';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hant', 'smile-score');

export default function ZhHantSmileScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: snapHubCopy('zh-hant').title, path: '/zh-hant/snap' },
        { name: snapToolCopy('zh-hant', 'smile-score').title, path: '/zh-hant/snap/smile-score' },
      ])} />
      <SmileScore lang="zh-hant" />
    </>
  );
}
