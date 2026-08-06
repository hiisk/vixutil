import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('zh-hans', 'white-balance');

export default function WhiteBalanceZhhansPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/zh-hans' },
        { name: newSnapHubTitle('zh-hans'), path: '/zh-hans/snap' },
        { name: TOOL_TEXT['zh-hans'].tools['white-balance'].title, path: '/zh-hans/snap/white-balance' },
      ])} />
      <MeasuredTest lang="zh-hans" slug="white-balance" />
    </>
  );
}
