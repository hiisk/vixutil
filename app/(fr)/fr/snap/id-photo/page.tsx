import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('fr', 'id-photo');

export default function IdPhotoFrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: newSnapHubTitle('fr'), path: '/fr/snap' },
        { name: TOOL_TEXT['fr'].tools['id-photo'].title, path: '/fr/snap/id-photo' },
      ])} />
      <MeasuredTest lang="fr" slug="id-photo" />
    </>
  );
}
