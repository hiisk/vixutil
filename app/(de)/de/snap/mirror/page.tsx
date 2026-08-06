import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('de', 'mirror');

export default function MirrorDePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: newSnapHubTitle('de'), path: '/de/snap' },
        { name: TOOL_TEXT['de'].tools['mirror'].title, path: '/de/snap/mirror' },
      ])} />
      <MeasuredTest lang="de" slug="mirror" />
    </>
  );
}
