import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('hi', 'eye-spacing');

export default function EyeSpacingHiPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/hi' },
        { name: newSnapHubTitle('hi'), path: '/hi/snap' },
        { name: TOOL_TEXT['hi'].tools['eye-spacing'].title, path: '/hi/snap/eye-spacing' },
      ])} />
      <MeasuredTest lang="hi" slug="eye-spacing" />
    </>
  );
}
