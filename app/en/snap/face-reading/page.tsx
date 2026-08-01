import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceReading from '@/components/snap/FaceReading';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'face-reading');

export default function EnFaceReadingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'face-reading').title, path: '/en/snap/face-reading' },
      ])} />
      <FaceReading lang="en" />
    </>
  );
}
