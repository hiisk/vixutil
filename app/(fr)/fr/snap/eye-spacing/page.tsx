import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('fr', 'eye-spacing');

export default function EyeSpacingFrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/fr' },
        { name: newSnapHubTitle('fr'), path: '/fr/snap' },
        { name: TOOL_TEXT['fr'].tools['eye-spacing'].title, path: '/fr/snap/eye-spacing' },
      ])} />
      <MeasuredTest lang="fr" slug="eye-spacing" />
    </>
  );
}
