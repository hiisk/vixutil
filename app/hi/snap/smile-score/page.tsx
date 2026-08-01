import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SmileScore from '@/components/snap/SmileScore';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'smile-score');

export default function HiSmileScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'smile-score').title, path: '/hi/snap/smile-score' },
      ])} />
      <SmileScore lang="hi" />
    </>
  );
}
