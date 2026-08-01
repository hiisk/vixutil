import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PhotoMood from '@/components/snap/PhotoMood';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('fr', 'photo-mood');

export default function FrPhotoMoodPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: snapHubCopy('fr').title, path: '/fr/snap' },
        { name: snapToolCopy('fr', 'photo-mood').title, path: '/fr/snap/photo-mood' },
      ])} />
      <PhotoMood lang="fr" />
    </>
  );
}
