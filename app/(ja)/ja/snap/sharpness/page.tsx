import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('ja', 'sharpness');

export default function SharpnessJaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: newSnapHubTitle('ja'), path: '/ja/snap' },
        { name: TOOL_TEXT['ja'].tools['sharpness'].title, path: '/ja/snap/sharpness' },
      ])} />
      <MeasuredTest lang="ja" slug="sharpness" />
    </>
  );
}
