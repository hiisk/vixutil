import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FirstImpression from '@/components/snap/FirstImpression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('fr', 'first-impression');

export default function FrFirstImpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: snapHubCopy('fr').title, path: '/fr/snap' },
        { name: snapToolCopy('fr', 'first-impression').title, path: '/fr/snap/first-impression' },
      ])} />
      <FirstImpression lang="fr" />
    </>
  );
}
