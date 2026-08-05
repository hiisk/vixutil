import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AnimalFace from '@/components/snap/AnimalFace';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('ja', 'animal-face');

export default function JaAnimalFacePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: snapHubCopy('ja').title, path: '/ja/snap' },
        { name: snapToolCopy('ja', 'animal-face').title, path: '/ja/snap/animal-face' },
      ])} />
      <AnimalFace lang="ja" />
    </>
  );
}
