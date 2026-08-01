import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import PhotoMood from '@/components/snap/PhotoMood';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('es', 'photo-mood');

export default function EsPhotoMoodPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: snapHubCopy('es').title, path: '/es/snap' },
        { name: snapToolCopy('es', 'photo-mood').title, path: '/es/snap/photo-mood' },
      ])} />
      <PhotoMood lang="es" />
    </>
  );
}
