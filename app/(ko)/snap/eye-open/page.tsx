import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('ko', 'eye-open');

export default function EyeOpenKoPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/' },
        { name: newSnapHubTitle('ko'), path: '/snap' },
        { name: TOOL_TEXT['ko'].tools['eye-open'].title, path: '/snap/eye-open' },
      ])} />
      <MeasuredTest lang="ko" slug="eye-open" />
    </>
  );
}
