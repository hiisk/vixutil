import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('ja', 'face-shape');

export default function FaceShapeJaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: newSnapHubTitle('ja'), path: '/ja/snap' },
        { name: TOOL_TEXT['ja'].tools['face-shape'].title, path: '/ja/snap/face-shape' },
      ])} />
      <MeasuredTest lang="ja" slug="face-shape" />
    </>
  );
}
