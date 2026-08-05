import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CoupleMatch from '@/components/snap/CoupleMatch';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'couple-match');

export default function EsCoupleMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'couple-match').title, path: '/es/snap/couple-match' },
      ])} />
      <CoupleMatch lang="es" />
    </>
  );
}
