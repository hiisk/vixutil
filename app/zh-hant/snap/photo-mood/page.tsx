import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PhotoMood from '@/components/snap/PhotoMood';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('zh-hant', 'photo-mood');

export default function ZhHantPhotoMoodPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: snapHubCopy('zh-hant').title, path: '/zh-hant/snap' },
        { name: snapToolCopy('zh-hant', 'photo-mood').title, path: '/zh-hant/snap/photo-mood' },
      ])} />
      <PhotoMood lang="zh-hant" />
    </>
  );
}
