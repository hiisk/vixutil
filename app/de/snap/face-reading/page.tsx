import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceReading from '@/components/snap/FaceReading';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('de', 'face-reading');

export default function DeFaceReadingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: snapHubCopy('de').title, path: '/de/snap' },
        { name: snapToolCopy('de', 'face-reading').title, path: '/de/snap/face-reading' },
      ])} />
      <FaceReading lang="de" />
    </>
  );
}
