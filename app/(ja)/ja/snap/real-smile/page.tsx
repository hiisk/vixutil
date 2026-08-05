import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import MeasuredTest from '@/components/snap/MeasuredTest';
import { TOOL_TEXT } from '@/lib/snap/tool-text';
import { newSnapMetadata, newSnapHubTitle } from '@/lib/snap/route';

export const metadata: Metadata = newSnapMetadata('ja', 'real-smile');

export default function RealSmileJaPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: newSnapHubTitle('ja'), path: '/ja/snap' },
        { name: TOOL_TEXT['ja'].tools['real-smile'].title, path: '/ja/snap/real-smile' },
      ])} />
      <MeasuredTest lang="ja" slug="real-smile" />
    </>
  );
}
