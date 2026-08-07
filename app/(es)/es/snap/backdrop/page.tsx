import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('es', 'backdrop');

export default function BackdropEsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: newSnapHubTitle('es'), path: '/es/snap' },
        { name: TOOL_TEXT['es'].tools['backdrop'].title, path: '/es/snap/backdrop' },
      ])} />
      <MeasuredTest lang="es" slug="backdrop" />
    </>
  );
}
