import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('en', 'lips');

export default function LipsEnPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: newSnapHubTitle('en'), path: '/en/snap' },
        { name: TOOL_TEXT['en'].tools['lips'].title, path: '/en/snap/lips' },
      ])} />
      <MeasuredTest lang="en" slug="lips" />
    </>
  );
}
