import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PhotoMood from '@/components/snap/PhotoMood';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('en', 'photo-mood');

export default function EnPhotoMoodPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: snapHubCopy('en').title, path: '/en/snap' },
        { name: snapToolCopy('en', 'photo-mood').title, path: '/en/snap/photo-mood' },
      ])} />
      <PhotoMood lang="en" />
    </>
  );
}
