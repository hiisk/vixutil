import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('hi', 'lips');

export default function LipsHiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: newSnapHubTitle('hi'), path: '/hi/snap' },
        { name: TOOL_TEXT['hi'].tools['lips'].title, path: '/hi/snap/lips' },
      ])} />
      <MeasuredTest lang="hi" slug="lips" />
    </>
  );
}
