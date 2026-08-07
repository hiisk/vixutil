import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('pt-br', 'face-thirds');

export default function FaceThirdsPtBrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: newSnapHubTitle('pt-br'), path: '/pt-br/snap' },
        { name: TOOL_TEXT['pt-br'].tools['face-thirds'].title, path: '/pt-br/snap/face-thirds' },
      ])} />
      <MeasuredTest lang="pt-br" slug="face-thirds" />
    </>
  );
}
