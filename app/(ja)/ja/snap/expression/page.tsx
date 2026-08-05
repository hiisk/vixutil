import type { Metadata } from 'next';
import JsonLd, { breadcrumbJsonLd } from '@/components/JsonLd';
import Expression from '@/components/snap/Expression';
import { snapHubCopy, snapToolCopy, snapToolMetadata } from '@/lib/snap-tools-intl';

export const metadata: Metadata = snapToolMetadata('ja', 'expression');

export default function JaExpressionPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([
        { name: 'vixutil', path: '/ja' },
        { name: snapHubCopy('ja').title, path: '/ja/snap' },
        { name: snapToolCopy('ja', 'expression').title, path: '/ja/snap/expression' },
      ])} />
      <Expression lang="ja" />
    </>
  );
}
