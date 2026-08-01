import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceSymmetry from '@/components/snap/FaceSymmetry';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'face-symmetry');

export default function EsFaceSymmetryPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'face-symmetry').title, path: '/es/snap/face-symmetry' },
      ])} />
      <FaceSymmetry lang="es" />
    </>
  );
}
