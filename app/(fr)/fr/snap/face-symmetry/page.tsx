import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceSymmetry from '@/components/snap/FaceSymmetry';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('fr', 'face-symmetry');

export default function FrFaceSymmetryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: snapHubCopy('fr').title, path: '/fr/snap' },
        { name: snapToolCopy('fr', 'face-symmetry').title, path: '/fr/snap/face-symmetry' },
      ])} />
      <FaceSymmetry lang="fr" />
    </>
  );
}
