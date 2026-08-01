import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GoldenRatio from '@/components/snap/GoldenRatio';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'golden-ratio');

export default function EnGoldenRatioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'golden-ratio').title, path: '/en/snap/golden-ratio' },
      ])} />
      <GoldenRatio lang="en" />
    </>
  );
}
