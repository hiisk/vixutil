import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SmileScore from '@/components/snap/SmileScore';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'smile-score');

export default function EsSmileScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'smile-score').title, path: '/es/snap/smile-score' },
      ])} />
      <SmileScore lang="es" />
    </>
  );
}
