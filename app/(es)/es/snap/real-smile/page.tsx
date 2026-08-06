import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('es', 'real-smile');

export default function RealSmileEsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/es' },
        { name: newSnapHubTitle('es'), path: '/es/snap' },
        { name: TOOL_TEXT['es'].tools['real-smile'].title, path: '/es/snap/real-smile' },
      ])} />
      <MeasuredTest lang="es" slug="real-smile" />
    </>
  );
}
