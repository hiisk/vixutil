import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GoldenRatio from '@/components/snap/GoldenRatio';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'golden-ratio');

export default function HiGoldenRatioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'golden-ratio').title, path: '/hi/snap/golden-ratio' },
      ])} />
      <GoldenRatio lang="hi" />
    </>
  );
}
