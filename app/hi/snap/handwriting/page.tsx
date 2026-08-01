import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Handwriting from '@/components/snap/Handwriting';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'handwriting');

export default function HiHandwritingPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'handwriting').title, path: '/hi/snap/handwriting' },
      ])} />
      <Handwriting lang="hi" />
    </>
  );
}
