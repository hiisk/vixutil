import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CoupleMatch from '@/components/snap/CoupleMatch';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hant', 'couple-match');

export default function ZhHantCoupleMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: snapHubCopy('zh-hant').title, path: '/zh-hant/snap' },
        { name: snapToolCopy('zh-hant', 'couple-match').title, path: '/zh-hant/snap/couple-match' },
      ])} />
      <CoupleMatch lang="zh-hant" />
    </>
  );
}
