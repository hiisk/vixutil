import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FirstImpression from '@/components/snap/FirstImpression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('de', 'first-impression');

export default function DeFirstImpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: snapHubCopy('de').title, path: '/de/snap' },
        { name: snapToolCopy('de', 'first-impression').title, path: '/de/snap/first-impression' },
      ])} />
      <FirstImpression lang="de" />
    </>
  );
}
