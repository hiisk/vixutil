import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hans', 'mirror');

export default function MirrorZhhansPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: newSnapHubTitle('zh-hans'), path: '/zh-hans/snap' },
        { name: TOOL_TEXT['zh-hans'].tools['mirror'].title, path: '/zh-hans/snap/mirror' },
      ])} />
      <MeasuredTest lang="zh-hans" slug="mirror" />
    </>
  );
}
