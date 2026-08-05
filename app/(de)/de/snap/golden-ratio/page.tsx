import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GoldenRatio from '@/components/snap/GoldenRatio';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('de', 'golden-ratio');

export default function DeGoldenRatioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: snapHubCopy('de').title, path: '/de/snap' },
        { name: snapToolCopy('de', 'golden-ratio').title, path: '/de/snap/golden-ratio' },
      ])} />
      <GoldenRatio lang="de" />
    </>
  );
}
