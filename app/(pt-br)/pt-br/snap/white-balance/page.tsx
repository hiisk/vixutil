import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('pt-br', 'white-balance');

export default function WhiteBalancePtbrPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/pt-br' },
        { name: newSnapHubTitle('pt-br'), path: '/pt-br/snap' },
        { name: TOOL_TEXT['pt-br'].tools['white-balance'].title, path: '/pt-br/snap/white-balance' },
      ])} />
      <MeasuredTest lang="pt-br" slug="white-balance" />
    </>
  );
}
