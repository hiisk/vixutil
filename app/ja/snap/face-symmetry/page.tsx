import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceSymmetry from '@/components/snap/FaceSymmetry';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('ja', 'face-symmetry');

export default function JaFaceSymmetryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: snapHubCopy('ja').title, path: '/ja/snap' },
        { name: snapToolCopy('ja', 'face-symmetry').title, path: '/ja/snap/face-symmetry' },
      ])} />
      <FaceSymmetry lang="ja" />
    </>
  );
}
