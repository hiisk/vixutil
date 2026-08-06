import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hant', 'lighting');

export default function LightingZhhantPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: newSnapHubTitle('zh-hant'), path: '/zh-hant/snap' },
        { name: TOOL_TEXT['zh-hant'].tools['lighting'].title, path: '/zh-hant/snap/lighting' },
      ])} />
      <MeasuredTest lang="zh-hant" slug="lighting" />
    </>
  );
}
