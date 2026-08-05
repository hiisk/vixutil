import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FirstImpression from '@/components/snap/FirstImpression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hans', 'first-impression');

export default function ZhHansFirstImpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: snapHubCopy('zh-hans').title, path: '/zh-hans/snap' },
        { name: snapToolCopy('zh-hans', 'first-impression').title, path: '/zh-hans/snap/first-impression' },
      ])} />
      <FirstImpression lang="zh-hans" />
    </>
  );
}
