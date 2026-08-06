import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hant', 'distance');

export default function DistanceZhhantPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hant' },
        { name: newSnapHubTitle('zh-hant'), path: '/zh-hant/snap' },
        { name: TOOL_TEXT['zh-hant'].tools['distance'].title, path: '/zh-hant/snap/distance' },
      ])} />
      <MeasuredTest lang="zh-hant" slug="distance" />
    </>
  );
}
