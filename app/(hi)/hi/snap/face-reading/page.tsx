import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceReading from '@/components/snap/FaceReading';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'face-reading');

export default function HiFaceReadingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'face-reading').title, path: '/hi/snap/face-reading' },
      ])} />
      <FaceReading lang="hi" />
    </>
  );
}
