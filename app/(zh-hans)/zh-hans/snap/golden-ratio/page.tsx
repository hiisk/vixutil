import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GoldenRatio from '@/components/snap/GoldenRatio';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hans', 'golden-ratio');

export default function ZhHansGoldenRatioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: snapHubCopy('zh-hans').title, path: '/zh-hans/snap' },
        { name: snapToolCopy('zh-hans', 'golden-ratio').title, path: '/zh-hans/snap/golden-ratio' },
      ])} />
      <GoldenRatio lang="zh-hans" />
    </>
  );
}
