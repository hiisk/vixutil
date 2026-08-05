import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import AnimalFace from '@/components/snap/AnimalFace';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hans', 'animal-face');

export default function ZhHansAnimalFacePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: snapHubCopy('zh-hans').title, path: '/zh-hans/snap' },
        { name: snapToolCopy('zh-hans', 'animal-face').title, path: '/zh-hans/snap/animal-face' },
      ])} />
      <AnimalFace lang="zh-hans" />
    </>
  );
}
