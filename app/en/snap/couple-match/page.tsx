import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CoupleMatch from '@/components/snap/CoupleMatch';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'couple-match');

export default function EnCoupleMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'couple-match').title, path: '/en/snap/couple-match' },
      ])} />
      <CoupleMatch lang="en" />
    </>
  );
}
