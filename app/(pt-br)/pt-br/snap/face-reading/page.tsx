import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import FaceReading from '@/components/snap/FaceReading';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('pt-br', 'face-reading');

export default function PtBrFaceReadingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: snapHubCopy('pt-br').title, path: '/pt-br/snap' },
        { name: snapToolCopy('pt-br', 'face-reading').title, path: '/pt-br/snap/face-reading' },
      ])} />
      <FaceReading lang="pt-br" />
    </>
  );
}
