import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PersonalColor from '@/components/snap/PersonalColor';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('pt-br', 'personal-color');

export default function PtBrPersonalColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: snapHubCopy('pt-br').title, path: '/pt-br/snap' },
        { name: snapToolCopy('pt-br', 'personal-color').title, path: '/pt-br/snap/personal-color' },
      ])} />
      <PersonalColor lang="pt-br" />
    </>
  );
}
