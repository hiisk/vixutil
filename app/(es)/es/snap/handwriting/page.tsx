import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Handwriting from '@/components/snap/Handwriting';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'handwriting');

export default function EsHandwritingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'handwriting').title, path: '/es/snap/handwriting' },
      ])} />
      <Handwriting lang="es" />
    </>
  );
}
