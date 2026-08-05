import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Handwriting from '@/components/snap/Handwriting';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('de', 'handwriting');

export default function DeHandwritingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: snapHubCopy('de').title, path: '/de/snap' },
        { name: snapToolCopy('de', 'handwriting').title, path: '/de/snap/handwriting' },
      ])} />
      <Handwriting lang="de" />
    </>
  );
}
