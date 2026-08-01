import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import CoupleMatch from '@/components/snap/CoupleMatch';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('pt-br', 'couple-match');

export default function PtBrCoupleMatchPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: snapHubCopy('pt-br').title, path: '/pt-br/snap' },
        { name: snapToolCopy('pt-br', 'couple-match').title, path: '/pt-br/snap/couple-match' },
      ])} />
      <CoupleMatch lang="pt-br" />
    </>
  );
}
