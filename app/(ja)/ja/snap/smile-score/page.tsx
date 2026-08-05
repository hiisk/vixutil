import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SmileScore from '@/components/snap/SmileScore';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('ja', 'smile-score');

export default function JaSmileScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: snapHubCopy('ja').title, path: '/ja/snap' },
        { name: snapToolCopy('ja', 'smile-score').title, path: '/ja/snap/smile-score' },
      ])} />
      <SmileScore lang="ja" />
    </>
  );
}
