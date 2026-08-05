import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CoupleMatch from '@/components/snap/CoupleMatch';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('ja', 'couple-match');

export default function JaCoupleMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: snapHubCopy('ja').title, path: '/ja/snap' },
        { name: snapToolCopy('ja', 'couple-match').title, path: '/ja/snap/couple-match' },
      ])} />
      <CoupleMatch lang="ja" />
    </>
  );
}
