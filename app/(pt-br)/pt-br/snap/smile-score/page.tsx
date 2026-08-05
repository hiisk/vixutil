import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import SmileScore from '@/components/snap/SmileScore';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('pt-br', 'smile-score');

export default function PtBrSmileScorePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: snapHubCopy('pt-br').title, path: '/pt-br/snap' },
        { name: snapToolCopy('pt-br', 'smile-score').title, path: '/pt-br/snap/smile-score' },
      ])} />
      <SmileScore lang="pt-br" />
    </>
  );
}
