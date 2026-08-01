import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import GoldenRatio from '@/components/snap/GoldenRatio';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'golden-ratio');

export default function EsGoldenRatioPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'golden-ratio').title, path: '/es/snap/golden-ratio' },
      ])} />
      <GoldenRatio lang="es" />
    </>
  );
}
