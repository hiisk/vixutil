import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('en', 'eye-spacing');

export default function EyeSpacingEnPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/en' },
        { name: newSnapHubTitle('en'), path: '/en/snap' },
        { name: TOOL_TEXT['en'].tools['eye-spacing'].title, path: '/en/snap/eye-spacing' },
      ])} />
      <MeasuredTest lang="en" slug="eye-spacing" />
    </>
  );
}
