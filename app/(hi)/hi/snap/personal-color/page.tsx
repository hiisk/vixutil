import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PersonalColor from '@/components/snap/PersonalColor';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'personal-color');

export default function HiPersonalColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'personal-color').title, path: '/hi/snap/personal-color' },
      ])} />
      <PersonalColor lang="hi" />
    </>
  );
}
