import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Handwriting from '@/components/snap/Handwriting';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hans', 'handwriting');

export default function ZhHansHandwritingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: snapHubCopy('zh-hans').title, path: '/zh-hans/snap' },
        { name: snapToolCopy('zh-hans', 'handwriting').title, path: '/zh-hans/snap/handwriting' },
      ])} />
      <Handwriting lang="zh-hans" />
    </>
  );
}
