import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AnimalFace from '@/components/snap/AnimalFace';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'animal-face');

export default function EsAnimalFacePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'animal-face').title, path: '/es/snap/animal-face' },
      ])} />
      <AnimalFace lang="es" />
    </>
  );
}
