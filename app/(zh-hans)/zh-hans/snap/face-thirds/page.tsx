import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hans', 'face-thirds');

export default function FaceThirdsZhHansPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: newSnapHubTitle('zh-hans'), path: '/zh-hans/snap' },
        { name: TOOL_TEXT['zh-hans'].tools['face-thirds'].title, path: '/zh-hans/snap/face-thirds' },
      ])} />
      <MeasuredTest lang="zh-hans" slug="face-thirds" />
    </>
  );
}
