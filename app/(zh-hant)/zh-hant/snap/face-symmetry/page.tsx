import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceSymmetry from '@/components/snap/FaceSymmetry';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hant', 'face-symmetry');

export default function ZhHantFaceSymmetryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: snapHubCopy('zh-hant').title, path: '/zh-hant/snap' },
        { name: snapToolCopy('zh-hant', 'face-symmetry').title, path: '/zh-hant/snap/face-symmetry' },
      ])} />
      <FaceSymmetry lang="zh-hant" />
    </>
  );
}
