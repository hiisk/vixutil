import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceSymmetry from '@/components/snap/FaceSymmetry';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'face-symmetry');

export default function EnFaceSymmetryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'face-symmetry').title, path: '/en/snap/face-symmetry' },
      ])} />
      <FaceSymmetry lang="en" />
    </>
  );
}
