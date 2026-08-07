import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('de', 'face-shape');

export default function FaceShapeDePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/de' },
        { name: newSnapHubTitle('de'), path: '/de/snap' },
        { name: TOOL_TEXT['de'].tools['face-shape'].title, path: '/de/snap/face-shape' },
      ])} />
      <MeasuredTest lang="de" slug="face-shape" />
    </>
  );
}
