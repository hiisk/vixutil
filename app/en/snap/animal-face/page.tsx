import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AnimalFace from '@/components/snap/AnimalFace';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'animal-face');

export default function EnAnimalFacePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'animal-face').title, path: '/en/snap/animal-face' },
      ])} />
      <AnimalFace lang="en" />
    </>
  );
}
