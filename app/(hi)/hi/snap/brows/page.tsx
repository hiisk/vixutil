import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('hi', 'brows');

export default function BrowsHiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: newSnapHubTitle('hi'), path: '/hi/snap' },
        { name: TOOL_TEXT['hi'].tools['brows'].title, path: '/hi/snap/brows' },
      ])} />
      <MeasuredTest lang="hi" slug="brows" />
    </>
  );
}
