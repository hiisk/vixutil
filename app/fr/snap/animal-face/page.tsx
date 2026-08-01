import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AnimalFace from '@/components/snap/AnimalFace';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('fr', 'animal-face');

export default function FrAnimalFacePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: snapHubCopy('fr').title, path: '/fr/snap' },
        { name: snapToolCopy('fr', 'animal-face').title, path: '/fr/snap/animal-face' },
      ])} />
      <AnimalFace lang="fr" />
    </>
  );
}
