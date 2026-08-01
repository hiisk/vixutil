import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Handwriting from '@/components/snap/Handwriting';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('fr', 'handwriting');

export default function FrHandwritingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: snapHubCopy('fr').title, path: '/fr/snap' },
        { name: snapToolCopy('fr', 'handwriting').title, path: '/fr/snap/handwriting' },
      ])} />
      <Handwriting lang="fr" />
    </>
  );
}
