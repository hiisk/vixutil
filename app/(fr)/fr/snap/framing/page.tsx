import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('fr', 'framing');

export default function FramingFrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: newSnapHubTitle('fr'), path: '/fr/snap' },
        { name: TOOL_TEXT['fr'].tools['framing'].title, path: '/fr/snap/framing' },
      ])} />
      <MeasuredTest lang="fr" slug="framing" />
    </>
  );
}
