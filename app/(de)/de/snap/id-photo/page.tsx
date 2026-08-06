import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('de', 'id-photo');

export default function IdPhotoDePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: newSnapHubTitle('de'), path: '/de/snap' },
        { name: TOOL_TEXT['de'].tools['id-photo'].title, path: '/de/snap/id-photo' },
      ])} />
      <MeasuredTest lang="de" slug="id-photo" />
    </>
  );
}
