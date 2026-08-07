import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('es', 'face-shape');

export default function FaceShapeEsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: newSnapHubTitle('es'), path: '/es/snap' },
        { name: TOOL_TEXT['es'].tools['face-shape'].title, path: '/es/snap/face-shape' },
      ])} />
      <MeasuredTest lang="es" slug="face-shape" />
    </>
  );
}
