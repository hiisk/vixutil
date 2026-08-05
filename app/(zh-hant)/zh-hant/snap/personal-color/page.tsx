import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PersonalColor from '@/components/snap/PersonalColor';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hant', 'personal-color');

export default function ZhHantPersonalColorPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: snapHubCopy('zh-hant').title, path: '/zh-hant/snap' },
        { name: snapToolCopy('zh-hant', 'personal-color').title, path: '/zh-hant/snap/personal-color' },
      ])} />
      <PersonalColor lang="zh-hant" />
    </>
  );
}
