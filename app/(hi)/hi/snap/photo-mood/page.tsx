import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PhotoMood from '@/components/snap/PhotoMood';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('hi', 'photo-mood');

export default function HiPhotoMoodPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: snapHubCopy('hi').title, path: '/hi/snap' },
        { name: snapToolCopy('hi', 'photo-mood').title, path: '/hi/snap/photo-mood' },
      ])} />
      <PhotoMood lang="hi" />
    </>
  );
}
