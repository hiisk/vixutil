import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceReading from '@/components/snap/FaceReading';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hans', 'face-reading');

export default function ZhHansFaceReadingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: snapHubCopy('zh-hans').title, path: '/zh-hans/snap' },
        { name: snapToolCopy('zh-hans', 'face-reading').title, path: '/zh-hans/snap/face-reading' },
      ])} />
      <FaceReading lang="zh-hans" />
    </>
  );
}
