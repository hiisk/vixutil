import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('ko', 'backdrop');

export default function BackdropKoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/' },
        { name: newSnapHubTitle('ko'), path: '/snap' },
        { name: TOOL_TEXT['ko'].tools['backdrop'].title, path: '/snap/backdrop' },
      ])} />
      <MeasuredTest lang="ko" slug="backdrop" />
    </>
  );
}
